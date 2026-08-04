# Independent LLM round-trip evidence

Date: 2026-08-04. Exact input revision:
`dbabaabd9aa59d739becc174ee44bcf73844b6a6`.

The isolated trial used `gpt-5.6-luna` with max reasoning and fresh context
`fresh-issue-35-llm-round-trip-1`. It received the same edit for every candidate:

1. change only `owner.label` from `System owner` to `Recovery owner`;
2. add `Recovery preserves the canonical source and blocks effects until
   validation passes.` as a new paragraph immediately after the existing
   Rationale paragraph; and
3. preserve every other identity, record version/revision, lifecycle and
   eligibility state, Authority field, relationship identity/version/boundary,
   provenance value, approval field, link, comment, syntax, and whitespace as
   much as the edit permits.

The LLM wrote isolated raw outputs under `llm-round-trip/`. `trial.json` records
the exact input/output paths and SHA-256 values. The parent runner independently
reparses every output and requires all of these assertions before exiting zero:

| Candidate | Reparsed | Exact intended semantic delta only | Link and both source comments retained | Input/output hashes bound |
| --- | --- | --- | --- | --- |
| Markdown + YAML envelope | yes | yes | yes | yes |
| Markdown + TOML envelope | yes | yes | yes | yes |
| TOML-only | yes | yes | yes | yes |
| Canonical Markdown + generated projections | canonical edit: yes | yes | yes | yes |

The generated projections are not writable LLM-edit targets; the runner
separately regenerates/parses JSON and TOML, compares their full normalized
semantics with the corpus, and rejects source-revision, source-hash,
payload-hash, or writable-seam violations.

This is one bounded behavioral trial, not a deterministic guarantee or a human
readability decision. The associated ready PR remains **HUMAN REVIEW REQUIRED**.
