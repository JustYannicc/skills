# Independent LLM round-trip evidence

Date: 2026-08-04. Exact input revision:
`a2c3882ed59dd5304d14f8583af4c6a36778a5c6`.

The isolated trial used `gpt-5.6-luna` with max reasoning and fresh context
`fresh-issue-35-llm-round-trip-resolution-1`. It received the same edit for
every candidate:

1. change only `owner.label` from `System owner` to `Recovery owner`;
2. add `Recovery preserves the canonical source and blocks effects until
   validation passes.` as a new paragraph immediately after the existing
   Rationale paragraph; and
3. preserve every other identity/version/revision; design, operational,
   eligibility, and operating-mode state; current Authority revision and every
   allowed-effect kind/action/boundary/contract; Section 2 relationship row,
   identity/version/boundary/link; provenance value; approval validity and
   revocation field; link; comment; syntax; and whitespace as much as the edit
   permits.

The LLM wrote isolated raw outputs under `llm-round-trip/`. `trial.json` records
the exact input/output paths and SHA-256 values. The parent runner independently
reparses every output and requires all of these assertions before exiting zero:

| Candidate | Reparsed | Exact intended semantic delta only | Links, comments, and Section 2 table retained | Input/output hashes bound |
| --- | --- | --- | --- | --- |
| Markdown + YAML envelope | yes | yes | yes | yes |
| Markdown + TOML envelope | yes | yes | yes | yes |
| TOML-only | yes | yes | yes | yes |
| Canonical Markdown + generated projections | canonical edit: yes | yes | yes | yes |

The generated projections are not writable LLM-edit targets. The runner
separately regenerates/parses JSON and TOML, compares their normalized semantics
with the independently parsed canonical source, and rejects source-revision,
source-hash, canonical-payload-hash, forged-payload, or writable-seam violations.

This is one bounded behavioral trial, not a deterministic guarantee or a human
readability decision. The associated ready PR remains **HUMAN REVIEW REQUIRED**.
