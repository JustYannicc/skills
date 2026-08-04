import { readFile } from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";

import { parse as parseToml, stringify as stringifyToml } from "smol-toml";

import {
  acceptWritableRecord,
  canPerformExternalEffect,
  generateProjection,
  parseMarkdownToml,
  parseMarkdownYaml,
  parseTomlOnly,
  projectionIsFresh,
  semanticRecord,
  sha256,
  serializeMarkdownToml,
  serializeMarkdownYaml,
  serializeTomlOnly,
} from "./model.ts";

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
    serialize: serializeMarkdownYaml,
    source: projectionSource,
  },
  {
    id: "markdown-yaml",
    parse: parseMarkdownYaml,
    serialize: serializeMarkdownYaml,
    source: yamlSource,
  },
  {
    id: "markdown-toml",
    parse: parseMarkdownToml,
    serialize: serializeMarkdownToml,
    source: tomlMarkdownSource,
  },
  {
    id: "toml-only",
    parse: parseTomlOnly,
    serialize: serializeTomlOnly,
    source: tomlOnlySource,
  },
] as const;

const commentMarkers = ["envelope-comment", "rationale-comment"];

const results = options.map((option) => {
  const parsed = option.parse(option.source);
  const serialized = option.serialize(parsed);
  const reparsed = option.parse(serialized);
  const humanEdited = option.source
    .replaceAll("System owner", "Recovery owner")
    .replace(
      "Keep narrative meaning, trade-offs, and recovery guidance",
      "Keep narrative meaning, linked trade-offs, and recovery guidance"
    );
  const humanParsed = option.parse(humanEdited);
  return {
    bounded_human_edit_parses:
      humanParsed.envelope.owner.label === "Recovery owner" &&
      humanParsed.narrative.includes("linked trade-offs"),
    normalized_semantic_sha256: sha256(JSON.stringify(semanticRecord(parsed))),
    option: option.id,
    parse_serialize_parse_semantics_preserved: isDeepStrictEqual(
      semanticRecord(parsed),
      semanticRecord(reparsed)
    ),
    parserless_narrative_surface:
      option.id === "toml-only"
        ? "embedded TOML multiline string"
        : "ordinary Markdown body",
    parserless_recovery_markers_present:
      option.source.includes("# System Record fixture") &&
      option.source.includes("## Rationale") &&
      option.source.includes("../../docs/UNIVERSAL_WORK_CONTRACT.md") &&
      option.source.includes("rationale-comment"),
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

const canonical = parseMarkdownYaml(projectionSource);
const projection = generateProjection(
  projectionSource,
  "fixtures/projection-canonical.md",
  canonical
);
const projectionJson = JSON.stringify(projection, null, 2);
const projectionToml = stringifyToml(projection);
const changedCanonical = projectionSource.replace(
  "Keep narrative meaning",
  "Keep changed narrative meaning"
);

const malformed = {
  ...canonical.envelope,
  authority: undefined,
};
const unexpectedField = {
  ...canonical.envelope,
  unexpected_action_boundary: true,
};
const malformedSource = projectionSource.replace(
  "record_id: SYS-024",
  "record_id: SYS-024\nrecord_id: SYS-999"
);

let malformedBlocked = false;
try {
  canPerformExternalEffect(malformed);
} catch {
  malformedBlocked = true;
}

let malformedSourceBlocked = false;
try {
  canPerformExternalEffect(parseMarkdownYaml(malformedSource).envelope);
} catch {
  malformedSourceBlocked = true;
}

let unexpectedFieldBlocked = false;
try {
  canPerformExternalEffect(unexpectedField);
} catch {
  unexpectedFieldBlocked = true;
}

let projectionWriteBlocked = false;
try {
  acceptWritableRecord(projection);
} catch {
  projectionWriteBlocked = true;
}

const report = {
  fail_closed_action_boundary: {
    malformed_record_blocked: malformedBlocked,
    malformed_source_blocked: malformedSourceBlocked,
    malformed_source_remains_parserless_readable:
      malformedSource.includes("## Rationale") &&
      malformedSource.includes("adapter-neutral contract"),
    unexpected_action_field_blocked: unexpectedFieldBlocked,
    valid_pending_record_cannot_authorize_effect:
      canPerformExternalEffect(canonical.envelope) === false,
  },
  one_way_projection: {
    direct_write_blocked: projectionWriteBlocked,
    fresh_before_source_edit: projectionIsFresh(projection, projectionSource),
    json_parses: JSON.parse(projectionJson).projection.writable === false,
    source_hash: projection.projection.source_sha256,
    stale_after_source_edit: !projectionIsFresh(projection, changedCanonical),
    toml_parses:
      (parseToml(projectionToml) as { projection: { writable: boolean } })
        .projection.writable === false,
  },
  prototype_question:
    "Which representation preserves human meaning and deterministic action boundaries with one writable authority?",
  shared_fixture_options: results,
};

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
