# Upstream skill assessment

Primary inspiration: [`mattpocock/skills` at `2ab958093e83e0ec752e6c1c5932da465bf23e0c`](https://github.com/mattpocock/skills/tree/2ab958093e83e0ec752e6c1c5932da465bf23e0c), inspected 2026-08-02. The repository is MIT-licensed.

## Preserve and change

| Upstream skill | Preserve | Change or decide |
| --- | --- | --- |
| Wayfinder | Destination first, durable map, decisions before delivery, blockers, unblocked frontier, session continuity | Remove repo/issue assumptions; support irreducible fog; make it system-strategy compatible; prefer Batch Grilling where decisions are independent |
| Research | Primary sources, evidence written to a durable artifact | Remove repository-only output and code-research assumptions; define evidence standards across domains |
| Prototype | Use a reversible prototype to answer one design question | Keep the code branch; add non-code experiments for life, process, policy, environment, organization, and agent systems |
| Handoff | Reference canonical artifacts, preserve exact continuation state, redact sensitive data | Generalize beyond coding and define authority, rationale, uncertainty, operating mode, and next frontier |
| Batch Grill Me | Ask the current unblocked frontier in rounds | Align questions with intent and system seams; retain sequential questioning when one answer changes the next |
| Domain Modeling | Shared vocabulary, source-backed terms, correction of conflicts | Audit only; do not fork without a concrete gap |
| TDD | Evidence at agreed public seams, vertical slices, independent expectation | Keep specialized for software; absorb only cross-domain proof principles into Thinking in Systems |
| Setup Matt Skills | Inspect first, ask only unresolved choices, preview, keep detailed config behind a small instruction pointer | Design a later suite installer/updater with explicit multi-skill selection and safe standing-trigger management |
| Improve Codebase Architecture | Inventory current state, find friction, choose one bounded remediation | Generalize into repair of any inherited system without reflexive reconstruction |

## Reuse boundary

Preserve behavior where compatible, not accidental engineering vocabulary. Decide licensed close adaptation versus independent rewriting for each skill. Record the upstream revision and attribution in every derived skill. Never imply that a separately installed Matt skill is available unless setup has verified it.

## Process model from the supplied screenshot

Matt's engineering sequence is:

```text
grill-with-docs or wayfinder → to-spec → to-tickets → implement → code-review
```

The reusable structure is valuable. The universal version should preserve the progression from uncertainty to an executable contract, decomposition, action, and independent review while allowing domain-specific execution skills at the implementation step.
