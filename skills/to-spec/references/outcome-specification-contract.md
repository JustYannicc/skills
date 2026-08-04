# Outcome Specification contract

This is a semantic contract, not a serialization template. A host may carry it
in a conversation, Local Markdown, a tracker, a database, or another conforming
Adapter. The phase must not select a representation that belongs to another
governing design.

## Required fields

| Field | Meaning and proof rule |
| --- | --- |
| Outcome | The externally meaningful condition to produce or preserve. State who benefits or is affected and how the condition can be observed. |
| Scope | The people, systems, environments, time horizon, and boundaries included. State the smallest sufficient scope. |
| Exclusions | Improvements deliberately outside this Outcome. Required remediation, propagation, and recovery cannot be hidden here. |
| Constraints | Hard limits and soft preferences, each with its source, confidence, and effect on feasible choices. A preference is not authority. |
| Responsibility | One identifiable Outcome owner, the Specification Work owner, and any known Executor, Reviewer, or successor route. Delegation never transfers the parent owner's integration duty. |
| Authority | The Approver for intent and material trade-offs, plus the separately identified effect authority, scope, limits, validity, and any missing authorization. Do not infer permission from a role label. |
| Accepted decisions | Decisions already authorized for this Outcome, with rationale, source, and exact revision where the host supplies one. Keep facts, assumptions, and inferences distinguishable. |
| Unresolved exceptions | Material unknowns, contradictions, accepted deviations, or irreducible fog. Each names its impact, owner, next check, and whether it blocks acceptance. |
| Proof seam | The highest stable observable boundary that can show whether the Specification is satisfied. Include evidence, observer, timing, and relevant limits. |
| Terminal condition | The condition that permits this Outcome to end, plus any required effect verification, propagation, recovery, horizon, cadence, transfer, or cancellation rule. |

## Acceptance states

- **Accepted:** the Approver has accepted the exact revision, all blocking gaps
  are resolved, and the proof seam and terminal condition are usable.
- **Proposed:** the fields are synthesized but acceptance has not occurred.
- **Waiting for discovery:** a material gap is assigned to a capability or
  external dependency with a continuation and resumption condition.
- **Operating under fog:** the Approver accepted an explicit rule for
  irreducible uncertainty, including threshold, safe mode, feedback, and
  recovery.

Do not turn an unresolved item into an accepted decision merely because it is
convenient to write a complete-looking document.

## Revision discipline

The exact host revision is authoritative when the Adapter supplies one. If the
Specification changes materially, create a new revision and inspect only the
affected Tickets, completed work, approvals, evidence, effects, dependencies,
current-state records, and legacy state.
Invalidate stale approval or Review evidence at the affected seam; preserve
unaffected accepted work. Inline conversations still have semantic revisions
when a material change occurs, even when no durable artifact is created.

## Discovery return contract

For every material gap, return:

1. the missing fact or decision;
2. why it changes scope, authority, proof, safety, or the terminal condition;
3. the one capability that owns the uncertainty;
4. the smallest useful question, evidence request, or experiment;
5. the current responsible owner and any Approver; and
6. the exact condition and action that resume Specification work.

If the capability is absent, preserve the same contract in Degraded mode. A
capability reference is a request, not a fictional dependency or a claim that
the companion ran.

## Cross-domain examples

### Technical (illustrative excerpt)

Outcome: a service's public behavior remains backward-compatible for the named
consumer group during a stated migration window. Scope, authority, proof at the
consumer boundary, and terminal observation are explicit; implementation and
test-module choices remain downstream decisions unless accepted.

### Nontechnical (illustrative excerpt)

Outcome: a community event has an accessible registration and welcome process
for the named participants by the event date. Scope includes the venue and
responsible hosts, exclusions separate unrelated outreach improvements,
constraints include accessibility commitments, proof is an observed rehearsal
or event check, and the terminal condition includes the agreed follow-up.

Each excerpt is illustrative; a real result still carries every required field
above and leaves representation to its host.
