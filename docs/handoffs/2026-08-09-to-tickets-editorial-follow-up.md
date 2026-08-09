# To Tickets editorial follow-up

Date: 2026-08-09.

This follow-up preserves the To Tickets behavior approved through issue #23 and merged in PR #45. It improves the installed skill's information hierarchy and source Markdown formatting; it does not renew human approval or change publication state.

## Checklist

- [x] Re-author the installed skill and directly affected reference with clearer steps, co-located rules, leading words, and progressive disclosure.
- [x] Preserve routing, responsibility, frontier and Recovery, gap, delegation and concurrency, Supplemental, revision, and completion behavior.
- [x] Refresh behavioral evidence for the editorial revision and pass focused deterministic checks.
- [x] Run Simplify once, then exactly one independent Sol High adversarial review and one separate Sol High resolution check.
- [x] Audit every touched authored text against `writing-for-agents` and `SKILL-MECHANICS.md`: hierarchy, pointers, co-location, completion criteria, leading words, disclosure, single sources, relevance, and no-ops.
- [ ] Rebind evaluations to the audited candidate, pass `pnpm validate`, and update draft PR #48 at the verified revision.

## Candidate proof

- **Editorial result:** `skills/to-tickets/SKILL.md` now exposes the operating contract before a seven-step Bind–Return procedure; the directly affected Ticket contract reference removes duplicated guidance. Ordinary prose and logical single-line list items are single physical lines on both runtime surfaces.
- **Scope inspection:** `agents/openai.yaml`, the README description, provenance, historical handoff, fixtures, observations, and repository metadata were inspected. Only the runtime reference, four prompts that now state already-required acceptance or persistence facts, refreshed evidence, and this follow-up record require changes.
- **Focused proof:** `pnpm check`, all eight focused test files (41 tests), and `git diff --check` pass for the editorial candidate.
- **Simplify:** completed exactly once. The result gates incomplete Specifications before broad reads, ends Inline work at its own completion boundary, prevents required-capability and required-Supplemental gaps from reaching acceptance, keeps non-atomic Coordination limits visible, and removes duplicated template guidance.
- **Adversarial review:** the single Sol High review found three Major issues and no Critical issues. The candidate now requires explicit exact-revision acceptance, canonical Durable write/readback/revision verification, and mandatory Baseline persistence with sequential fallback when atomic claims are unavailable.
- **Resolution check:** the separate Sol High check passed with no remaining Critical or Major findings after correcting Supplemental transaction and acceptance evidence.
- **Writing audit:** the Sol High acceptance audit applied the complete `writing-for-agents` method to all 441 non-generated touched text paths, the commit subjects, and draft PR #48. It found no material defect; the final candidate rebind remains open.

## Terminal condition

A draft PR from `codex/to-tickets-editorial-follow-up` is pushed with deterministic and behavioral proof for its exact revision. Issue #23 remains historically complete; this follow-up does not merge, close, or claim renewed human approval.
