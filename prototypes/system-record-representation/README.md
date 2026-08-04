# PROTOTYPE — System Record representation

Question: over one shared System Record fixture, which candidate representation
best preserves human meaning while giving deterministic consumers a fail-closed
action boundary without creating a second writable authority?

This is disposable evidence for issue #35, not a runtime Adapter or an accepted
storage contract. `fixture.json` is the comparison-corpus authority. Its
relationship objects deliberately stress structured syntax across all four
formats; they do not move the skill's existing Section 2 relationship index
into the proposed action envelope. The candidate files are alternative
renderings used only for comparison.

Run:

```sh
pnpm prototype:system-record-representation
```

The command prints a JSON measurement report. It:

- parses every candidate into one semantic shape;
- exercises parse/serialize/parse and a deterministic manual-edit simulation;
- rejects duplicate source keys and unknown nested fields for YAML and TOML;
- restricts YAML aliases, anchors, directives, and explicit tags;
- checks distinct design, operational, and eligibility states plus exact record
  and approval revision binding at the action guard;
- compares generated JSON and TOML projection semantics with the shared corpus,
  rejects direct writes, and checks source and projected-payload freshness; and
- writes each raw fixture outside a Git worktree, then launches a Node process
  that imports no YAML/TOML parser and recovers the narrative by plain-text
  boundaries.

The scripted edit is a repeatable proxy for a simple manual edit, not evidence
that a human judged the result. The independent LLM trial is recorded separately
in `llm-round-trip-evidence.md`; the associated PR remains the required human
readability and representation decision boundary.

The fixture's all-`a` provenance SHA-256 tests schema shape only. The projection
tests compute actual hashes of their canonical source and normalized payload.
Whether an external provenance source is authoritative remains semantic or
Adapter-specific judgment, outside this syntax proof.
