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
  serializeMarkdownToml,
  serializeMarkdownYaml,
  serializeTomlOnly,
  sha256,
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
const llmTrial = JSON.parse(await load("llm-round-trip/trial.json")) as {
  inputRevision: string;
  candidates: {
    inputPath: string;
    inputSha256: string;
    outputPath: string;
    outputSha256: string;
  }[];
};

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
    manual_edit_simulation_parses:
      edited.envelope.owner.label === "Recovery owner" &&
      edited.narrative.includes("linked trade-offs"),
    nested_unknown_field_blocked: isBlocked(() =>
      option.parse(nestedUnknownSourceFor(option))
    ),
    normalized_semantic_sha256: sha256(JSON.stringify(semanticRecord(parsed))),
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
  };
});

const llmOutputs = [
  {
    id: "markdown-generated-projections",
    inputPath:
      "prototypes/system-record-representation/fixtures/projection-canonical.md",
    outputPath:
      "prototypes/system-record-representation/llm-round-trip/projection-canonical.md",
    parse: parseMarkdownYaml,
    source: projectionSource,
  },
  {
    id: "markdown-yaml",
    inputPath:
      "prototypes/system-record-representation/fixtures/markdown-yaml.md",
    outputPath:
      "prototypes/system-record-representation/llm-round-trip/markdown-yaml.md",
    parse: parseMarkdownYaml,
    source: yamlSource,
  },
  {
    id: "markdown-toml",
    inputPath:
      "prototypes/system-record-representation/fixtures/markdown-toml.md",
    outputPath:
      "prototypes/system-record-representation/llm-round-trip/markdown-toml.md",
    parse: parseMarkdownToml,
    source: tomlMarkdownSource,
  },
  {
    id: "toml-only",
    inputPath:
      "prototypes/system-record-representation/fixtures/toml-only.toml",
    outputPath:
      "prototypes/system-record-representation/llm-round-trip/toml-only.toml",
    parse: parseTomlOnly,
    source: tomlOnlySource,
  },
] as const;

const llmRoundTrip = await Promise.all(
  llmOutputs.map(async (candidate) => {
    const output = await readFile(
      `${root}/llm-round-trip/${candidate.outputPath.split("/").at(-1)}`,
      "utf-8"
    );
    const trialCandidate = llmTrial.candidates.find(
      (item) => item.outputPath === candidate.outputPath
    );
    const input = candidate.parse(candidate.source);
    const edited = candidate.parse(output);
    const expectedEdited = {
      ...semanticRecord(input),
      narrative: `${input.narrative.trimEnd()}\n\nRecovery preserves the canonical source and blocks effects until validation passes.\n`,
      owner: { ...input.envelope.owner, label: "Recovery owner" },
    };
    return {
      exact_input_revision_recorded:
        llmTrial.inputRevision === "dbabaabd9aa59d739becc174ee44bcf73844b6a6",
      input_sha256_matches:
        trialCandidate?.inputPath === candidate.inputPath &&
        trialCandidate.inputSha256 === sha256(candidate.source),
      link_and_comments_preserved:
        output.includes("../../../docs/UNIVERSAL_WORK_CONTRACT.md") &&
        output.includes("envelope-comment") &&
        output.includes("rationale-comment"),
      no_unintended_semantic_changes: isDeepStrictEqual(
        semanticRecord(edited),
        expectedEdited
      ),
      option: candidate.id,
      output_sha256_matches: trialCandidate?.outputSha256 === sha256(output),
    };
  })
);

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

const malformedRecord = { ...canonical.envelope, authority: undefined };
const unexpectedNestedField = {
  ...canonical.envelope,
  authority: { ...canonical.envelope.authority, unrecognized_effect: true },
};
const duplicateRelationship = {
  ...canonical.envelope,
  relationships: [
    ...canonical.envelope.relationships,
    canonical.envelope.relationships[0],
  ],
};
const yamlAnchorSource = projectionSource.replace(
  "id: actor:system-owner",
  "id: &owner actor:system-owner"
);
const yamlTagSource = projectionSource.replace(
  "id: actor:system-owner",
  "id: !!str actor:system-owner"
);

const approvedRecord = {
  ...canonical.envelope,
  approval: {
    ...canonical.envelope.approval,
    status: "approved" as const,
  },
  authority: {
    ...canonical.envelope.authority,
    allowed_effects: ["external_effect" as const],
  },
  catalog_eligibility: "eligible" as const,
  design_status: "design_complete" as const,
  operational_status: "active" as const,
};

const report = {
  constrained_yaml: {
    aliases_and_anchors_blocked: isBlocked(() =>
      parseMarkdownYaml(yamlAnchorSource)
    ),
    explicit_tags_blocked: isBlocked(() => parseMarkdownYaml(yamlTagSource)),
  },
  fail_closed_action_boundary: {
    duplicate_relationship_blocked: isBlocked(() =>
      acceptWritableRecord(duplicateRelationship)
    ),
    malformed_record_blocked: isBlocked(() =>
      canPerformExternalEffect(
        malformedRecord,
        canonical.envelope.record_revision
      )
    ),
    nested_unknown_action_field_blocked: isBlocked(() =>
      canPerformExternalEffect(
        unexpectedNestedField,
        canonical.envelope.record_revision
      )
    ),
    positive_control_authorizes_exact_active_revision:
      canPerformExternalEffect(
        approvedRecord,
        canonical.envelope.record_revision
      ) === true,
    stale_approval_revision_cannot_authorize:
      canPerformExternalEffect(
        {
          ...approvedRecord,
          approval: {
            ...approvedRecord.approval,
            result_revision: "superseded-revision",
          },
        },
        canonical.envelope.record_revision
      ) === false,
    stale_record_revision_cannot_authorize:
      canPerformExternalEffect(approvedRecord, "newer-record-revision") ===
      false,
    valid_pending_ineligible_record_cannot_authorize:
      canPerformExternalEffect(
        canonical.envelope,
        canonical.envelope.record_revision
      ) === false,
    wrong_lifecycle_state_cannot_authorize:
      canPerformExternalEffect(
        { ...approvedRecord, operational_status: "retired" },
        canonical.envelope.record_revision
      ) === false,
  },
  independent_llm_round_trip: llmRoundTrip,
  one_way_projection: {
    direct_write_blocked: isBlocked(() => acceptWritableRecord(projection)),
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
    result.manual_edit_simulation_parses,
    result.nested_unknown_field_blocked,
    result.parse_serialize_parse_semantics_preserved,
    result.parserless_recovery_in_no_git_directory,
    result.parses_to_shared_fixture,
  ]),
  ...llmRoundTrip.flatMap((result) => [
    result.exact_input_revision_recorded,
    result.input_sha256_matches,
    result.link_and_comments_preserved,
    result.no_unintended_semantic_changes,
    result.output_sha256_matches,
  ]),
  ...Object.values(report.constrained_yaml),
  ...Object.values(report.fail_closed_action_boundary),
  ...Object.values(report.one_way_projection),
].some((result) => result !== true);

if (proofFailed) {
  throw new Error("representation proof has a failing required assertion");
}

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
