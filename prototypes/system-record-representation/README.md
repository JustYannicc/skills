# PROTOTYPE — System Record representation

Question: over one shared System Record fixture, which candidate representation
best preserves human meaning while giving deterministic consumers a fail-closed
action boundary without creating a second writable authority?

This is disposable evidence for issue #35, not a runtime Adapter or an accepted
storage contract. `fixture.json` is the comparison-corpus authority. The
candidate files are alternative renderings used only for comparison. Their
envelopes deliberately omit relationships: the Markdown Section 2 table is the
one relationship authority in every option, including inside TOML-only's
narrative string.

Run:

```sh
pnpm prototype:system-record-representation
```

The command prints a JSON measurement report. It:

- parses every candidate into one semantic shape;
- exercises parse/serialize/parse and a deterministic manual-edit simulation;
- rejects duplicate source keys and unknown nested fields for YAML and TOML;
- restricts YAML aliases, anchors, directives, and explicit tags;
- parses the production-shaped relationship table and rejects duplicate,
  missing-version, unknown-kind, malformed-link, and wrong-column cases;
- checks distinct design, operational, eligibility, and operating-mode states;
- requires a named action, explicit boundary, and contract to match an exact
  Authority grant, record revision, approval result, and current Authority
  revision, including expiry and revocation;
- compares generated JSON and TOML projection semantics with the shared corpus,
  rejects direct writes, and checks the source and projected payload against an
  independently parsed canonical-source semantic hash, including forged
  payload-plus-hash and reordered-object cases; and
- writes each raw fixture outside a Git worktree, then launches a Node process
  that imports no YAML/TOML parser and recovers the narrative by plain-text
  boundaries.

The scripted edit is a repeatable proxy for a simple manual edit, not evidence
that a human judged the result. The independent LLM trial is added only after
these exact inputs are committed and is recorded separately in
`llm-round-trip-evidence.md`; the associated PR remains the required human
readability and representation decision boundary.

The fixture's all-`a` provenance SHA-256 tests schema shape only. The projection
tests compute actual hashes of their canonical source and normalized payload.
Whether an external provenance source is authoritative remains semantic or
Adapter-specific judgment, outside this syntax proof.
