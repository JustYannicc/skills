import { execFile } from "node:child_process";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { isDeepStrictEqual, promisify } from "node:util";

import { stringify as stringifyToml } from "smol-toml";

import {
  acceptWritableRecord,
  canPerformExternalEffect,
  generateProjection,
  parseJsonProjection,
  parseMarkdownToml,
  parseMarkdownYaml,
  parseTomlOnly,
  parseTomlProjection,
  projectionIsFresh,
  semanticRecord,
  semanticSha256,
  serializeMarkdownToml,
  serializeMarkdownYaml,
  serializeTomlOnly,
} from "./model.ts";

const execFileAsync = promisify(execFile);
const root = import.meta.dirname;
const load = (relativePath: string) =>
  readFile(`${root}/${relativePath}`, "utf-8");

const expected = JSON.parse(await load("fixture.json")) as unknown;
const yamlSource = await load("fixtures/markdown-yaml.md");
const tomlMarkdownSource = await load("fixtures/markdown-toml.md");
const tomlOnlySource = await load("fixtures/toml-only.toml");
const projectionSource = await load("fixtures/projection-canonical.md");

const options = [
  {
    id: "markdown-generated-projections",
    parse: parseMarkdownYaml,
    parserlessKind: "markdown",
    serialize: serializeMarkdownYaml,
    source: projectionSource,
  },
  {
    id: "markdown-yaml",
    parse: parseMarkdownYaml,
    parserlessKind: "markdown",
    serialize: serializeMarkdownYaml,
    source: yamlSource,
  },
  {
    id: "markdown-toml",
    parse: parseMarkdownToml,
    parserlessKind: "markdown",
    serialize: serializeMarkdownToml,
    source: tomlMarkdownSource,
  },
  {
    id: "toml-only",
    parse: parseTomlOnly,
    parserlessKind: "toml-only",
    serialize: serializeTomlOnly,
    source: tomlOnlySource,
  },
] as const;

const malformedSourceFor = (option: (typeof options)[number]) =>
  option.id === "markdown-yaml" ||
  option.id === "markdown-generated-projections"
    ? option.source.replace(
        "record_id: coord:skills/system-record/024",
        "record_id: coord:skills/system-record/024\nrecord_id: duplicate"
      )
    : option.source.replace(
        'record_id = "coord:skills/system-record/024"',
        'record_id = "coord:skills/system-record/024"\nrecord_id = "duplicate"'
      );

const nestedUnknownSourceFor = (option: (typeof options)[number]) =>
  option.id === "markdown-yaml" ||
  option.id === "markdown-generated-projections"
    ? option.source.replace(
        "  decision_owner: actor:system-owner",
        "  decision_owner: actor:system-owner\n  unexpected_action_boundary: true"
      )
    : option.source.replace(
        '[authority]\ndecision_owner = "actor:system-owner"',
        '[authority]\ndecision_owner = "actor:system-owner"\nunexpected_action_boundary = true'
      );

const duplicateRelationshipSourceFor = (option: (typeof options)[number]) =>
  option.source.replace(
    "| Upstream System | coord:skills/system-record/005 @ 1.2.0 | Provides the adapter-neutral work contract without transferring effect Authority. | [Adapter contract](../../../docs/UNIVERSAL_WORK_CONTRACT.md) |",
    "| Upstream System | coord:skills/system-record/005 @ 1.2.0 | Provides the adapter-neutral work contract without transferring effect Authority. | [Adapter contract](../../../docs/UNIVERSAL_WORK_CONTRACT.md) |\n| Upstream System | coord:skills/system-record/005 @ 1.2.0 | Duplicate relationship row. | [Adapter contract](../../../docs/UNIVERSAL_WORK_CONTRACT.md) |"
  );

const missingRelationshipVersionSourceFor = (
  option: (typeof options)[number]
) =>
  option.source.replace(
    "coord:skills/system-record/005 @ 1.2.0",
    "coord:skills/system-record/005"
  );

const malformedRelationshipLinkSourceFor = (option: (typeof options)[number]) =>
  option.source.replace(
    "[Adapter contract](../../../docs/UNIVERSAL_WORK_CONTRACT.md)",
    "../../../docs/UNIVERSAL_WORK_CONTRACT.md"
  );

const unknownRelationshipKindSourceFor = (option: (typeof options)[number]) =>
  option.source.replace("| Upstream System |", "| Unknown System |");

const isBlocked = (operation: () => unknown) => {
  try {
    operation();
    return false;
  } catch {
    return true;
  }
};

const rawReader = String.raw`
const { readFileSync } = require("node:fs");
const [file, kind] = process.argv.slice(1);
const source = readFileSync(file, "utf8");
let narrative;
if (kind === "toml-only") {
  const marker = "narrative = '''";
  const start = source.indexOf(marker);
  const end = source.indexOf("'''", start + marker.length);
  if (start === -1 || end === -1) process.exit(2);
  narrative = source.slice(start + marker.length, end);
} else {
  const delimiter = source.startsWith("---\n") ? "---" : "+++";
  const closing = source.indexOf("\n" + delimiter + "\n", delimiter.length);
  if (closing === -1) process.exit(3);
  narrative = source.slice(closing + delimiter.length + 2);
}
if (!narrative.includes("## Rationale") ||
    !narrative.includes("rationale-comment") ||
    !narrative.includes("../../../docs/UNIVERSAL_WORK_CONTRACT.md")) {
  process.exit(4);
}
process.stdout.write(narrative);
`;

const parserlessRoot = await mkdtemp(
  path.join(tmpdir(), "system-record-no-git-parser-")
);
let noGitDirectory = false;
try {
  await execFileAsync("git", [
    "-C",
    parserlessRoot,
    "rev-parse",
    "--is-inside-work-tree",
  ]);
} catch {
  noGitDirectory = true;
}

const parserlessRecovery = new Map(
  await Promise.all(
    options.map(async (option) => {
      const fixturePath = path.join(parserlessRoot, `${option.id}.txt`);
      await writeFile(fixturePath, option.source);
      const { stdout } = await execFileAsync(process.execPath, [
        "-e",
        rawReader,
        fixturePath,
        option.parserlessKind,
      ]);
      return [
        option.id,
        noGitDirectory && stdout.includes("blocks effects"),
      ] as const;
    })
  )
);

const commentMarkers = ["envelope-comment", "rationale-comment"];
const results = options.map((option) => {
  const parsed = option.parse(option.source);
  const serialized = option.serialize(parsed);
  const reparsed = option.parse(serialized);
  const manualEditSimulation = option.source
    .replaceAll("System owner", "Recovery owner")
    .replace(
      "Keep narrative meaning, trade-offs, and recovery guidance",
      "Keep narrative meaning, linked trade-offs, and recovery guidance"
    );
  const edited = option.parse(manualEditSimulation);
  return {
    duplicate_key_source_blocked: isBlocked(() =>
      option.parse(malformedSourceFor(option))
    ),
    duplicate_relationship_row_blocked: isBlocked(() =>
      semanticRecord(option.parse(duplicateRelationshipSourceFor(option)))
    ),
    malformed_relationship_link_blocked: isBlocked(() =>
      semanticRecord(option.parse(malformedRelationshipLinkSourceFor(option)))
    ),
    manual_edit_simulation_parses:
      edited.envelope.owner.label === "Recovery owner" &&
      edited.narrative.includes("linked trade-offs"),
    missing_relationship_version_blocked: isBlocked(() =>
      semanticRecord(option.parse(missingRelationshipVersionSourceFor(option)))
    ),
    nested_unknown_field_blocked: isBlocked(() =>
      option.parse(nestedUnknownSourceFor(option))
    ),
    normalized_semantic_sha256: semanticSha256(parsed),
    option: option.id,
    parse_serialize_parse_semantics_preserved: isDeepStrictEqual(
      semanticRecord(parsed),
      semanticRecord(reparsed)
    ),
    parserless_narrative_surface:
      option.id === "toml-only"
        ? "embedded TOML multiline string located by raw text boundary"
        : "ordinary Markdown body located by raw delimiter scan",
    parserless_recovery_in_no_git_directory:
      parserlessRecovery.get(option.id) === true,
    parses_to_shared_fixture: isDeepStrictEqual(
      semanticRecord(parsed),
      expected
    ),
    serialized_bytes: Buffer.byteLength(serialized),
    source_bytes: Buffer.byteLength(option.source),
    source_comments_preserved_after_parser_round_trip: Object.fromEntries(
      commentMarkers.map((marker) => [marker, serialized.includes(marker)])
    ),
    unknown_relationship_kind_blocked: isBlocked(() =>
      semanticRecord(option.parse(unknownRelationshipKindSourceFor(option)))
    ),
  };
});

const canonical = parseMarkdownYaml(projectionSource);
const sourceLocator = "fixtures/projection-canonical.md";
const sourceRevision = "prototype-source-revision-2";
const projection = generateProjection(
  projectionSource,
  sourceLocator,
  sourceRevision,
  canonical
);
const projectionJson = JSON.stringify(projection, null, 2);
const projectionToml = stringifyToml(projection);
const parsedJsonProjection = parseJsonProjection(projectionJson);
const parsedTomlProjection = parseTomlProjection(projectionToml);
const changedCanonical = projectionSource.replace(
  "Keep narrative meaning",
  "Keep changed narrative meaning"
);
const tamperedProjection = {
  ...projection,
  narrative: projection.narrative.replace(
    "Keep narrative meaning",
    "Keep tampered narrative meaning"
  ),
};
const forgedProjection = {
  ...tamperedProjection,
  projection: {
    ...tamperedProjection.projection,
    semantic_sha256: semanticSha256({
      envelope: tamperedProjection.record,
      narrative: tamperedProjection.narrative,
    }),
  },
};
const reorderedProjection = {
  narrative: projection.narrative,
  projection: projection.projection,
  record: projection.record,
};

const malformedRecord = { ...canonical.envelope, authority: undefined };
const unexpectedNestedField = {
  ...canonical.envelope,
  authority: { ...canonical.envelope.authority, unrecognized_effect: true },
};
const yamlAnchorSource = projectionSource.replace(
  "id: actor:system-owner",
  "id: &owner actor:system-owner"
);
const yamlTagSource = projectionSource.replace(
  "id: actor:system-owner",
  "id: !!str actor:system-owner"
);

const requestedEffect = {
  action: "record.publish",
  boundary: "GitHub issue #35 decision package only",
  contract: "https://github.com/JustYannicc/skills/issues/35",
  kind: "external_effect" as const,
};
const authorityRevision = "authority-revision-approved";
const approvedRecord = {
  ...canonical.envelope,
  approval: {
    ...canonical.envelope.approval,
    authority_revision: authorityRevision,
    status: "approved" as const,
    valid_until: "2026-08-05T00:00:00Z",
  },
  authority: {
    ...canonical.envelope.authority,
    allowed_effects: [requestedEffect],
    revision: authorityRevision,
  },
  catalog_eligibility: "eligible" as const,
  design_status: "design_complete" as const,
  operating_mode: "normal" as const,
  operational_status: "active" as const,
};
const actionContext = {
  currentAuthorityRevision: authorityRevision,
  currentRecordRevision: canonical.envelope.record_revision,
  evaluatedAt: "2026-08-04T18:00:00Z",
  requestedEffect,
};

const report = {
  constrained_yaml: {
    aliases_and_anchors_blocked: isBlocked(() =>
      parseMarkdownYaml(yamlAnchorSource)
    ),
    explicit_tags_blocked: isBlocked(() => parseMarkdownYaml(yamlTagSource)),
  },
  fail_closed_action_boundary: {
    expired_approval_cannot_authorize:
      canPerformExternalEffect(approvedRecord, {
        ...actionContext,
        evaluatedAt: "2026-08-06T00:00:00Z",
      }) === false,
    malformed_record_blocked: isBlocked(() =>
      canPerformExternalEffect(malformedRecord, actionContext)
    ),
    nested_unknown_action_field_blocked: isBlocked(() =>
      canPerformExternalEffect(unexpectedNestedField, actionContext)
    ),
    non_normal_modes_cannot_authorize: (
      ["degraded", "paused", "recovery"] as const
    ).every(
      (operatingMode) =>
        canPerformExternalEffect(
          { ...approvedRecord, operating_mode: operatingMode },
          actionContext
        ) === false
    ),
    positive_control_authorizes_exact_active_revision:
      canPerformExternalEffect(approvedRecord, actionContext) === true,
    retiring_status_cannot_authorize:
      canPerformExternalEffect(
        { ...approvedRecord, operational_status: "retiring" },
        actionContext
      ) === false,
    revoked_approval_cannot_authorize:
      canPerformExternalEffect(
        {
          ...approvedRecord,
          approval: {
            ...approvedRecord.approval,
            revoked_at: "2026-08-04T17:00:00Z",
          },
        },
        actionContext
      ) === false,
    stale_approval_revision_cannot_authorize:
      canPerformExternalEffect(
        {
          ...approvedRecord,
          approval: {
            ...approvedRecord.approval,
            result_revision: "superseded-revision",
          },
        },
        actionContext
      ) === false,
    stale_authority_revision_cannot_authorize:
      canPerformExternalEffect(
        {
          ...approvedRecord,
          approval: {
            ...approvedRecord.approval,
            authority_revision: "stale-authority-revision",
          },
        },
        actionContext
      ) === false,
    stale_record_revision_cannot_authorize:
      canPerformExternalEffect(approvedRecord, {
        ...actionContext,
        currentRecordRevision: "newer-record-revision",
      }) === false,
    valid_pending_ineligible_record_cannot_authorize:
      canPerformExternalEffect(canonical.envelope, actionContext) === false,
    wrong_action_or_boundary_cannot_authorize:
      canPerformExternalEffect(approvedRecord, {
        ...actionContext,
        requestedEffect: {
          ...requestedEffect,
          action: "record.delete",
          boundary: "all repository records",
        },
      }) === false,
  },
  one_way_projection: {
    direct_write_blocked: isBlocked(() => acceptWritableRecord(projection)),
    forged_payload_and_hash_rejected_against_canonical: !projectionIsFresh(
      forgedProjection,
      projectionSource,
      sourceLocator,
      sourceRevision
    ),
    fresh_before_source_edit: projectionIsFresh(
      projection,
      projectionSource,
      sourceLocator,
      sourceRevision
    ),
    json_semantics_match_shared_fixture: isDeepStrictEqual(
      semanticRecord({
        envelope: parsedJsonProjection.record,
        narrative: parsedJsonProjection.narrative,
      }),
      expected
    ),
    missing_projection_record_blocked: isBlocked(() =>
      parseJsonProjection(
        JSON.stringify({
          narrative: projection.narrative,
          projection: projection.projection,
        })
      )
    ),
    reordered_projection_remains_fresh: projectionIsFresh(
      reorderedProjection,
      projectionSource,
      sourceLocator,
      sourceRevision
    ),
    stale_after_source_edit: !projectionIsFresh(
      projection,
      changedCanonical,
      sourceLocator,
      "newer-source-revision"
    ),
    tampered_projection_blocked_by_semantic_hash: !projectionIsFresh(
      tamperedProjection,
      projectionSource,
      sourceLocator,
      sourceRevision
    ),
    toml_semantics_match_shared_fixture: isDeepStrictEqual(
      semanticRecord({
        envelope: parsedTomlProjection.record,
        narrative: parsedTomlProjection.narrative,
      }),
      expected
    ),
  },
  prototype_question:
    "Which representation preserves human meaning and deterministic action boundaries with one writable authority?",
  shared_fixture_options: results,
};

const proofFailed = [
  ...results.flatMap((result) => [
    result.duplicate_key_source_blocked,
    result.duplicate_relationship_row_blocked,
    result.malformed_relationship_link_blocked,
    result.manual_edit_simulation_parses,
    result.missing_relationship_version_blocked,
    result.nested_unknown_field_blocked,
    result.parse_serialize_parse_semantics_preserved,
    result.parserless_recovery_in_no_git_directory,
    result.parses_to_shared_fixture,
    result.unknown_relationship_kind_blocked,
  ]),
  ...Object.values(report.constrained_yaml),
  ...Object.values(report.fail_closed_action_boundary),
  ...Object.values(report.one_way_projection),
].some((result) => result !== true);

if (proofFailed) {
  throw new Error("representation proof has a failing required assertion");
}

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
