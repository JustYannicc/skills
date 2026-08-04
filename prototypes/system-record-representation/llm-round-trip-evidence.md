# Independent LLM round-trip evidence

Date: 2026-08-04. Candidate: prototype commit `238f6f9` plus the parent
runner correction that followed the independent trial.

An independent fresh-context LLM received the same edit for every candidate:

1. change the owner label to `Recovery owner`;
2. add `Recovery preserves the canonical source and blocks effects until
   validation passes.` under `## Rationale`; and
3. preserve every ID, version, state, authority field, relationship,
   provenance value, approval, link, and comment.

The LLM edited isolated copies and reparsed them through the prototype's
candidate parsers. It did not edit tracked repository files.

| Candidate | Reparsed | Required semantics retained | Link and narrative comment retained | Accidental changes | Qualitative edit ambiguity |
| --- | --- | --- | --- | --- | --- |
| Markdown + YAML envelope | yes | yes | yes | none | low |
| Markdown + TOML envelope | yes | yes | yes | none | low |
| TOML-only | yes | yes | yes | none | high: narrative is inside a TOML multiline-string boundary |
| Canonical Markdown + generated projections | canonical edit: yes; projections regenerated separately | yes | yes in canonical source | none | low at source; projections require read-only routing |

The independent trial also falsified the action gate with missing or malformed
authority and with pending, absent, or non-required approval. Every negative
case blocked; an explicitly approved `external_effect` was the positive
control. Generated JSON and TOML both carried `writable = false`; the writable
ingestion seam rejected them, and a canonical narrative edit changed the source
hash and made both projections stale.

This is behavioral evidence from one LLM trial, not a deterministic guarantee.
The deterministic runner separately validates parsing, normalized semantics,
malformed-source blocking, projection read-only routing, and source-hash
freshness.
