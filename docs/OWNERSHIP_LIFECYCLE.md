# Ownership and completion lifecycle

**Status:** accepted design
**Decision source:** [Define the end-to-end ownership and completion lifecycle](https://github.com/JustYannicc/skills/issues/9)

## Purpose

This contract carries intent, responsibility, authority, state, proof, waiting,
and recovery through the universal Workflow. It specifies who owns each phase
result and how that evidence returns to the parent Outcome without turning a
phase, delegation, submission, approval, schedule, or handoff into false
completion.

The [Universal work and coordination contract](UNIVERSAL_WORK_CONTRACT.md) owns
record and state meanings. The [Workflow routing contract](WORKFLOW_ROUTING.md)
owns which capability runs. This document owns responsibility across those
phases and the gate for verified terminal completion.

## Responsibility stack

| Role | Responsibility | Ends when |
| --- | --- | --- |
| Outcome owner | Coordinate the accepted Outcome end to end, integrate child results, and verify its terminal condition. | Verified Outcome completion, accepted transfer, or authorized cancellation. |
| Work owner | Carry one bounded Ticket or phase result through its accepted proof seam. | Verified child completion, accepted transfer, or authorized cancellation. |
| Executor | Perform an authorized action and return effect evidence. | The bounded execution result and evidence are submitted; ownership may continue in another role. |
| Reviewer | Produce one verdict against the exact Specification, governing standards, result revision, and available effect evidence. | The integrated verdict and findings are recorded. |
| Approver | Authorize or reject an exact revision and effect within their authority. | The decision and validity conditions are recorded; authorization may later expire or be revoked. |

One actor may hold several roles when risk permits, but each role's decision
remains explicit. Delegation creates a nested Work owner while the parent owner
retains integration responsibility. A Claim coordinates execution and never
changes this stack.

## Acceptance and authority

An Outcome remains proposed until an actor validly accepts its execution or
starts acting on it. Starting performs acceptance before activation. An actor
that lacks necessary authority or capability must decline, negotiate a smaller
scope, or arrange an accepted transfer instead of accepting responsibility it
cannot fulfill.

Every accepted Specification has an identifiable Approver for intent and
material trade-offs. Workflow may resolve bounded low-risk Inline detail within
delegated authority. A material assumption returns to the Approver rather than
entering execution invisibly.

## Phase contracts

| Phase | Bounded owner | Required return | Phase completion boundary |
| --- | --- | --- | --- |
| Discovery | Owner of the selected discovery Ticket | Facts, assumptions, decisions, unknowns, provenance, and confidence | The blocking uncertainty is resolved, or irreducible fog has an explicit operating rule. |
| Specification | `to-spec` Work owner; intent Approver authorizes | Exact accepted Outcome Specification revision and unresolved exceptions | The Approver accepts the revision, or material gaps return to discovery. |
| Decomposition | `to-tickets` Work owner; Outcome owner integrates | Bounded Tickets with coverage, relationships, owners, authority, and proof seams | The Outcome owner proves collective coverage, or a gap returns to Specification. |
| Implementation | Ticket Work owner; Executors may perform actions | Exact result revision and effect evidence available at submission | The result is submitted to Review; the Ticket is not complete. |
| Review | Reviewer | Integrated verdict and findings bound to exact revisions | The verdict is recorded; target state changes according to the verdict. |
| Approval | Approver | Authorized or rejected revision, effect scope, and validity conditions | The decision is recorded; approval is not execution. |
| Effect | Ticket Work owner; Executor performs | Evidence from the real effect boundary | The intended effect is observed or the Ticket enters recovery or waiting. |
| Parent integration | Outcome owner | Exact integrated Outcome state and proof bundle | The parent is ready for its own Review, not automatically complete. |
| Parent Review | Outcome Reviewer | Verdict against the parent Specification and terminal condition | Verified permits completion; other verdicts return to the applicable phase. |

A material unresolved discovery item either blocks Specification or becomes an
explicit operating rule for irreducible fog. It cannot disappear into prose.
Independent child completion returns evidence upward; it never advances the
parent automatically.

## Revision and change control

Specifications, results, approvals, and Review verdicts bind to exact
revisions. Changing an accepted Specification requires an impact analysis over
affected Tickets, completed work, evidence, Review, approvals, dependencies,
and legacy state. Invalidate only what the change affects; unrelated accepted
work remains valid.

A material result change invalidates its prior Review and approval. Workflow
rechecks approval immediately before a consequential effect. Expired, revoked,
condition-failing, or revision-mismatched approval returns to the approval gate.

## Review verdicts

Universal Review returns one integrated verdict:

| Verdict | Target transition | Required responsibility |
| --- | --- | --- |
| Verified | `in_review` to `complete` when the target's own proof seam is satisfied | Owner records exact verdict and evidence. |
| Changes required | `in_review` to `accepted` | Work owner resolves findings and claims the next attempt. |
| Inconclusive | `in_review` to `waiting` | Owner records missing evidence, dependency, next check, and resumption action. |

Supplemental findings are evidence inside this verdict, not competing final
verdicts. Low-risk Inline work may use the same actor in several explicit roles;
material risk may require independent, deterministic, human, or specialist
evidence.

## Effect gates

The general consequential-effect sequence is:

```text
prepare → review → approve when required → perform effect → verify real effect
```

The exact route may omit a separate approval when the accepted request already
grants sufficient authority. Preparation, Review, approval, execution, and
effect verification remain distinct meanings. An approved email draft is not a
completed reply; the sending mechanism must accept the exact approved revision,
and the Outcome owner must verify that this satisfies the parent request.

## Parent Review and completion

The Outcome owner may submit the parent to Review only after integrating:

- the current Specification revision;
- required child completion, cancellation, waiver, or replacement;
- effect evidence and exact result revisions;
- unresolved exceptions and remaining fog;
- affected current-state and legacy-state propagation; and
- required recovery or follow-up work.

Child Review does not substitute for parent Review. Parent completion requires
one exact integrated state and the Outcome's own verified terminal condition.
Explicitly out-of-scope improvements may become related Outcomes without
blocking completion. Required remediation, propagation, and recovery remain
inside the current Outcome and block it.

Completion records a compact proof bundle:

- exact Specification and result revisions;
- Outcome, Work, execution, Review, and approval actors as applicable;
- integrated Review verdict;
- approvals and their validity conditions;
- real-effect evidence;
- informed exceptions and unresolved non-blocking fog;
- current-state and legacy propagation status; and
- terminal transition, actor, authority, rationale, and time.

Maps may summarize the bundle but link to its canonical evidence.

## Transfer and cancellation

Accepted transfer ends the outgoing owner's responsibility without completing
the Outcome. The incoming owner explicitly accepts the exact canonical state,
authority, evidence, continuation, and next frontier. The ownership transition
is append-only and auditable; until acceptance, the outgoing owner remains
responsible.

Authorized cancellation is a governed terminal state. It records the
authorizer, rationale, partial effects, retained evidence, child dispositions,
dependency consequences, and recovery or reversal needs. Cancellation does not
disguise failure or abandonment and does not satisfy a dependent Ticket unless
that dependent owner explicitly replaces, waives, or cancels the requirement.

## Failure, waiting, and recovery

Failure is an event. The responsible owner chooses and records retry, rescope,
reassignment, waiting, escalation, transfer, or authorized cancellation. A
failed or unreachable delegated child leaves recovery and integration
responsibility with the parent owner.

Stale Claims, missed checks, overdue Reviews, unreachable owners, and expired
Continuation records enter the Recovery queue. Recovery never silently changes
ownership or returns work to the Work frontier. An authorized actor records the
new responsibility, Claim, and exact next action.

Waiting retains ownership and the complete Continuation record. Scheduling the
next check or recurrence is an execution action, not completion proof.

## Persistent and recurring Outcomes

An Outcome intended to preserve a condition or recur defines an observation
horizon, review cadence, valid transfer rule, or cancellation condition. An
indefinite operating Outcome remains owned until accepted transfer or
authorized cancellation. A finite Outcome whose terminal condition includes a
stability window remains open until that window is observed.

Later regression outside an accepted observation horizon creates a related new
Outcome. It does not retroactively falsify evidence that truthfully satisfied
the earlier contract at its accepted seam.

## Corrections and reopening

Later evidence that the original contract was not actually satisfied appends a
correction event; it never rewrites transition history. The affected Outcome or
Ticket reopens at `accepted`, responsibility resumes with its current owner, and
the invalid evidence and downstream impact become explicit. If the evidence
instead reveals a genuinely new need outside the original scope, Workflow
creates a related Outcome.

## Completion criterion

The lifecycle is complete for an Outcome owner only when the parent Outcome is
verified at its own proof seam, responsibility is accepted by a successor with
exact continuation state, or an authorized cancellation records every material
disposition. Child completion, submission, approval, scheduling, waiting,
failure, and unaccepted handoff are non-terminal.
