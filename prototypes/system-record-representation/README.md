# PROTOTYPE — System Record representation

Question: over one shared System Record fixture, which candidate representation
best preserves human meaning while giving deterministic consumers a fail-closed
envelope without creating a second writable authority?

This is disposable evidence for issue #35, not a runtime Adapter or an accepted
storage contract. `fixture.json` is the fixture corpus authority. The candidate
files are alternative renderings used only for comparison.

Run:

```sh
pnpm prototype:system-record-representation
```

The command prints a JSON measurement report. It parses every candidate into
one semantic shape, exercises parse/serialize/parse and bounded edit round
trips, rejects malformed action-boundary records, and demonstrates projection
freshness and read-only routing.
