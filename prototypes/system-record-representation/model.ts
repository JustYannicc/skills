import { createHash } from "node:crypto";

import { parse as parseToml, stringify as stringifyToml } from "smol-toml";
import { parseDocument, stringify as stringifyYaml } from "yaml";
import { z } from "zod";

const actorSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
});

const envelopeSchema = z
  .object({
    approval: z
      .object({
        required: z.boolean(),
        result_revision: z.string().min(1),
        status: z.enum(["pending", "approved", "rejected"]),
      })
      .optional(),
    authority: z.object({
      allowed_effects: z.array(z.string().min(1)),
      decision_owner: z.string().min(1),
    }),
    owner: actorSchema,
    provenance: z.object({
      revision: z.string().min(1),
      sha256: z.string().regex(/^[a-f0-9]{64}$/u),
      source: z.string().min(1),
    }),
    record_id: z.string().regex(/^SYS-[0-9]+$/u),
    record_version: z.string().min(1),
    relationships: z.array(
      z.object({
        contract: z.string().min(1),
        kind: z.enum([
          "containing",
          "subsystem",
          "upstream",
          "dependent",
          "peer",
          "related",
        ]),
        record_id: z.string().min(1),
      })
    ),
    schema_version: z.literal(1),
    state: z.enum(["candidate", "designing", "design_complete", "retired"]),
  })
  .strict();

export type Envelope = z.infer<typeof envelopeSchema>;

export interface CandidateRecord {
  envelope: Envelope;
  narrative: string;
}

export interface Projection {
  projection: {
    writable: false;
    source_locator: string;
    source_revision: string;
    source_sha256: string;
    generated_at: string;
  };
  record: Envelope;
  narrative: string;
}

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

export const parseMarkdownYaml = (source: string): CandidateRecord => {
  const { metadata, narrative } = splitEnvelope(source, "---");
  const document = parseDocument(metadata, { strict: true, uniqueKeys: true });
  if (document.errors.length > 0) {
    throw document.errors[0];
  }
  return { envelope: envelopeSchema.parse(document.toJS()), narrative };
};

export const parseMarkdownToml = (source: string): CandidateRecord => {
  const { metadata, narrative } = splitEnvelope(source, "+++");
  return { envelope: envelopeSchema.parse(parseToml(metadata)), narrative };
};

export const parseTomlOnly = (source: string): CandidateRecord => {
  const parsed = z
    .object({ narrative: z.string() })
    .and(envelopeSchema)
    .parse(parseToml(source));
  const { narrative, ...envelope } = parsed;
  return { envelope, narrative };
};

export const semanticRecord = (record: CandidateRecord) => ({
  ...record.envelope,
  narrative: `${record.narrative.trimEnd()}\n`,
});

export const serializeMarkdownYaml = (record: CandidateRecord) =>
  `---\n${stringifyYaml(record.envelope).trimEnd()}\n---\n${record.narrative}`;

export const serializeMarkdownToml = (record: CandidateRecord) =>
  `+++\n${stringifyToml(record.envelope).trimEnd()}\n+++\n${record.narrative}`;

export const serializeTomlOnly = (record: CandidateRecord) =>
  stringifyToml({ ...record.envelope, narrative: record.narrative });

export const sha256 = (source: string) =>
  createHash("sha256").update(source).digest("hex");

export const generateProjection = (
  source: string,
  sourceLocator: string,
  record: CandidateRecord
): Projection => ({
  narrative: record.narrative,
  projection: {
    generated_at: "2026-08-04T00:00:00Z",
    source_locator: sourceLocator,
    source_revision: record.envelope.record_version,
    source_sha256: sha256(source),
    writable: false,
  },
  record: record.envelope,
});

export const projectionIsFresh = (projection: Projection, source: string) =>
  projection.projection.source_sha256 === sha256(source);

export const acceptWritableRecord = (input: unknown): Envelope => {
  const projectionMarker = z
    .object({ projection: z.object({ writable: z.literal(false) }) })
    .safeParse(input);
  if (projectionMarker.success) {
    throw new Error(
      "derived projection is read-only; edit its canonical source"
    );
  }
  return envelopeSchema.parse(input);
};

export const canPerformExternalEffect = (input: unknown) => {
  const envelope = acceptWritableRecord(input);
  return (
    envelope.authority.allowed_effects.includes("external_effect") &&
    envelope.approval?.required === true &&
    envelope.approval.status === "approved"
  );
};
