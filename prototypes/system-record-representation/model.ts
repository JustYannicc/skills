import { createHash } from "node:crypto";

import { parse as parseToml, stringify as stringifyToml } from "smol-toml";
import {
  isAlias,
  isNode,
  parseDocument,
  stringify as stringifyYaml,
  visit,
} from "yaml";
import { z } from "zod";

import { parseRelationshipTable } from "./relationship-table.ts";

const opaqueId = z
  .string()
  .regex(/^[A-Za-z0-9][A-Za-z0-9:._/-]*$/u, "expected an opaque logical id");
const exactRevision = z
  .string()
  .regex(/^[A-Za-z0-9][A-Za-z0-9:._/-]*$/u, "expected an exact revision id");

const actorSchema = z
  .object({
    id: opaqueId,
    label: z.string().min(1),
  })
  .strict();

const effectGrantSchema = z
  .object({
    action: opaqueId,
    boundary: z.string().min(1),
    contract: z.string().min(1),
    kind: z.enum(["compose_without_effect", "external_effect"]),
  })
  .strict();

export type EffectGrant = z.infer<typeof effectGrantSchema>;

const authoritySchema = z
  .object({
    allowed_effects: z
      .array(effectGrantSchema)
      .min(1)
      .refine(
        (values) =>
          new Set(
            values.map(
              (value) =>
                `${value.kind}\0${value.action}\0${value.boundary}\0${value.contract}`
            )
          ).size === values.length,
        { message: "effect grants must be unique" }
      ),
    decision_owner: opaqueId,
    revision: exactRevision,
  })
  .strict();

const approvalSchema = z
  .object({
    approver_id: opaqueId,
    authority_revision: exactRevision,
    required: z.boolean(),
    result_revision: exactRevision,
    revoked_at: z.iso.datetime().optional(),
    status: z.enum(["pending", "approved", "rejected"]),
    valid_until: z.iso.datetime(),
  })
  .strict();

export const envelopeSchema = z
  .object({
    approval: approvalSchema.optional(),
    authority: authoritySchema,
    canonical_locator: z.string().min(1),
    catalog_eligibility: z.enum(["not_eligible", "eligible", "suspended"]),
    design_status: z.enum([
      "candidate",
      "designing",
      "design_complete",
      "superseded",
    ]),
    governed_by: z.string().min(1),
    operating_mode: z.enum(["normal", "degraded", "paused", "recovery"]),
    operational_status: z.enum([
      "unbuilt",
      "inactive",
      "active",
      "retiring",
      "retired",
    ]),
    owner: actorSchema,
    provenance: z
      .object({
        revision: exactRevision,
        sha256: z.string().regex(/^[a-f0-9]{64}$/u),
        source: z.string().min(1),
      })
      .strict(),
    record_id: opaqueId,
    record_revision: exactRevision,
    record_version: z.string().min(1),
    schema_version: z.literal(1),
    supersedes: exactRevision.optional(),
  })
  .strict();

export type Envelope = z.infer<typeof envelopeSchema>;

export interface CandidateRecord {
  envelope: Envelope;
  narrative: string;
}

const projectionMetadataSchema = z
  .object({
    generated_at: z.iso.datetime(),
    semantic_sha256: z.string().regex(/^[a-f0-9]{64}$/u),
    source_locator: z.string().min(1),
    source_revision: exactRevision,
    source_sha256: z.string().regex(/^[a-f0-9]{64}$/u),
    writable: z.literal(false),
  })
  .strict();

export const projectionSchema = z
  .object({
    narrative: z.string(),
    projection: projectionMetadataSchema,
    record: envelopeSchema,
  })
  .strict();

export type Projection = z.infer<typeof projectionSchema>;

const tomlRecordSchema = envelopeSchema
  .extend({ narrative: z.string() })
  .strict();

const splitEnvelope = (source: string, delimiter: "---" | "+++") => {
  const lines = source.split("\n");
  if (lines[0] !== delimiter) {
    throw new Error(`missing opening ${delimiter} delimiter`);
  }
  const end = lines.indexOf(delimiter, 1);
  if (end === -1) {
    throw new Error(`missing closing ${delimiter} delimiter`);
  }
  return {
    metadata: lines.slice(1, end).join("\n"),
    narrative: lines.slice(end + 1).join("\n"),
  };
};

const assertConstrainedYaml = (metadata: string) => {
  if (/^%/mu.test(metadata)) {
    throw new Error("YAML directives are outside the constrained envelope");
  }
  const document = parseDocument(metadata, {
    resolveKnownTags: false,
    schema: "core",
    strict: true,
    uniqueKeys: true,
  });
  if (document.errors.length > 0) {
    throw document.errors[0];
  }
  let unsupportedNode = false;
  visit(document, (_key, node) => {
    if (
      isAlias(node) ||
      (isNode(node) &&
        (("anchor" in node && Boolean(node.anchor)) ||
          ("tag" in node && Boolean(node.tag))))
    ) {
      unsupportedNode = true;
    }
  });
  if (unsupportedNode) {
    throw new Error(
      "YAML aliases, anchors, and explicit tags are outside the constrained envelope"
    );
  }
  return document;
};

export const parseMarkdownYaml = (source: string): CandidateRecord => {
  const { metadata, narrative } = splitEnvelope(source, "---");
  const document = assertConstrainedYaml(metadata);
  return { envelope: envelopeSchema.parse(document.toJS()), narrative };
};

export const parseMarkdownToml = (source: string): CandidateRecord => {
  const { metadata, narrative } = splitEnvelope(source, "+++");
  return { envelope: envelopeSchema.parse(parseToml(metadata)), narrative };
};

export const parseTomlOnly = (source: string): CandidateRecord => {
  const { narrative, ...envelope } = tomlRecordSchema.parse(parseToml(source));
  return { envelope, narrative };
};

export const semanticRecord = (record: CandidateRecord) => ({
  ...record.envelope,
  narrative: `${record.narrative.trimEnd()}\n`,
  relationships: parseRelationshipTable(record.narrative),
});

export const sha256 = (source: string) =>
  createHash("sha256").update(source).digest("hex");

const canonicalize = (value: unknown): string => {
  if (Array.isArray(value)) {
    return `[${value.map(canonicalize).join(",")}]`;
  }
  if (value !== null && typeof value === "object") {
    return `{${Object.entries(value)
      .toSorted(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => `${JSON.stringify(key)}:${canonicalize(entry)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
};

export const semanticSha256 = (record: CandidateRecord) =>
  sha256(canonicalize(semanticRecord(record)));

export const serializeMarkdownYaml = (record: CandidateRecord) =>
  `---\n${stringifyYaml(record.envelope).trimEnd()}\n---\n${record.narrative}`;

export const serializeMarkdownToml = (record: CandidateRecord) =>
  `+++\n${stringifyToml(record.envelope).trimEnd()}\n+++\n${record.narrative}`;

export const serializeTomlOnly = (record: CandidateRecord) =>
  stringifyToml({ ...record.envelope, narrative: record.narrative });

export const generateProjection = (
  source: string,
  sourceLocator: string,
  sourceRevision: string,
  record: CandidateRecord
): Projection =>
  projectionSchema.parse({
    narrative: record.narrative,
    projection: {
      generated_at: "2026-08-04T00:00:00Z",
      semantic_sha256: semanticSha256(record),
      source_locator: sourceLocator,
      source_revision: sourceRevision,
      source_sha256: sha256(source),
      writable: false,
    },
    record: record.envelope,
  });

export const parseJsonProjection = (source: string) =>
  projectionSchema.parse(JSON.parse(source));

export const parseTomlProjection = (source: string) =>
  projectionSchema.parse(parseToml(source));

export const projectionIsFresh = (
  input: unknown,
  source: string,
  sourceLocator: string,
  sourceRevision: string
) => {
  try {
    const projection = projectionSchema.parse(input);
    const canonical = parseMarkdownYaml(source);
    const canonicalSemanticHash = semanticSha256(canonical);
    const projectedSemanticHash = semanticSha256({
      envelope: projection.record,
      narrative: projection.narrative,
    });
    return (
      projection.projection.writable === false &&
      projection.projection.source_locator === sourceLocator &&
      projection.projection.source_revision === sourceRevision &&
      projection.projection.source_sha256 === sha256(source) &&
      projection.projection.semantic_sha256 === canonicalSemanticHash &&
      projectedSemanticHash === canonicalSemanticHash
    );
  } catch {
    return false;
  }
};

export const acceptWritableRecord = (input: unknown): Envelope => {
  const projectionMarker = z
    .object({ projection: z.object({ writable: z.boolean() }) })
    .safeParse(input);
  if (projectionMarker.success) {
    throw new Error(
      "derived projection is read-only; edit its canonical source"
    );
  }
  return envelopeSchema.parse(input);
};

export interface ActionGuardContext {
  currentAuthorityRevision: string;
  currentRecordRevision: string;
  evaluatedAt: string;
  requestedEffect: EffectGrant;
}

export const canPerformExternalEffect = (
  input: unknown,
  context: ActionGuardContext
) => {
  const envelope = acceptWritableRecord(input);
  const { approval } = envelope;
  const matchingGrant = envelope.authority.allowed_effects.some(
    (grant) =>
      grant.kind === context.requestedEffect.kind &&
      grant.action === context.requestedEffect.action &&
      grant.boundary === context.requestedEffect.boundary &&
      grant.contract === context.requestedEffect.contract
  );
  return (
    context.requestedEffect.kind === "external_effect" &&
    envelope.record_revision === context.currentRecordRevision &&
    envelope.authority.revision === context.currentAuthorityRevision &&
    envelope.design_status === "design_complete" &&
    envelope.operational_status === "active" &&
    envelope.operating_mode === "normal" &&
    envelope.catalog_eligibility === "eligible" &&
    matchingGrant &&
    approval?.required === true &&
    approval.status === "approved" &&
    approval.result_revision === context.currentRecordRevision &&
    approval.authority_revision === context.currentAuthorityRevision &&
    approval.revoked_at === undefined &&
    Date.parse(context.evaluatedAt) <= Date.parse(approval.valid_until)
  );
};
