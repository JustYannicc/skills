---
schema_version: 1
record_id: coord:skills/system-record/024
record_version: 0.3.0-draft
record_revision: fixture-revision-1
canonical_locator: record://system-record-fixture
design_status: designing
operational_status: unbuilt
operating_mode: normal
catalog_eligibility: not_eligible
owner:
  id: actor:system-owner
  label: Recovery owner
authority:
  decision_owner: actor:system-owner
  revision: authority-revision-1
  allowed_effects:
    - kind: compose_without_effect
      action: record.compose
      boundary: canonical System Record draft only; no external write
      contract: record://system-record-fixture#compose
governed_by: Thinking in Systems standard
provenance:
  source: https://github.com/JustYannicc/skills/issues/35
  revision: 455541e255b5482235faa65a82bffc2b21415b94
  sha256: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
approval:
  required: true
  status: pending
  approver_id: actor:repository-maintainer
  authority_revision: issue-35-human-review
  result_revision: fixture-revision-1
  valid_until: 2026-08-05T00:00:00Z
# envelope-comment: presentation only; parser serialization may drop it
---
# System Record fixture

The decision owner must review the [adapter-neutral contract](../../../docs/UNIVERSAL_WORK_CONTRACT.md) before any external effect.

<!-- rationale-comment: preserve this human note -->

## 2. Boundary and support

| Relationship | Related System identity and version | This System's role and material boundary | Interface or handoff contract reference, if material |
| --- | --- | --- | --- |
| Upstream System | coord:skills/system-record/005 @ 1.2.0 | Provides the adapter-neutral work contract without transferring effect Authority. | [Adapter contract](../../../docs/UNIVERSAL_WORK_CONTRACT.md) |
| Dependent System | coord:skills/system-record/013 @ issue-13-candidate | Consumes the representation decision while retaining Workflow behavior ownership. | [Issue #13](https://github.com/JustYannicc/skills/issues/13) |

## Rationale

Keep narrative meaning, trade-offs, and recovery guidance readable without Git, a parser, or an LLM. A malformed action envelope blocks effects while this rationale remains recoverable.

Recovery preserves the canonical source and blocks effects until validation passes.
