---
name: implement
description: Execute one accepted Ticket to an exact usable result and submit it with available effect evidence to Review. Use when Workflow has unblocked work ready to claim, a prior Review returned changes, delegated Executors must be integrated, or execution must pause or recover without losing Work-owner responsibility.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Implement

Carry one accepted Ticket through authorized execution to an exact usable
result. The Ticket's Work owner retains Responsibility for the bounded Result,
delegated work, effects, recovery, integration, and findings through verified
Ticket completion. Return a revision-bound submission to the active
`'Workflow'` skill for Review; do not produce the verdict or complete the
Ticket or parent Outcome.

## Procedure

### 1. Admit one executable Ticket

Join the active Workflow context and read the canonical Ticket before broader
implementation material. Bind its identity and exact revision, state, Result,
scope and exclusions, Work owner, Executors, Authority, accepted Specification
revision, Ticket-set revision, `requires` relationships, inputs and
preconditions, Proof seam, acceptance criteria, Reviewer, current Claim,
current Result revision, selected Adapter capabilities, effective
configuration, any Supplemental skill mapped to `workflow.implementation`, and
the return route.

An executable Ticket is `accepted`, unblocked, and owned. It may instead be a
`waiting` Ticket whose exact Continuation is current and whose observable
unblock condition has been verified, or the same Work owner's `active` Ticket
with a matching live Claim and pickup point. A `changes required` verdict
returns its target to `accepted`; bind the finding set and the previously
reviewed result revision before changing it.

Treat the following as admission gaps:

- a Proposed, In review, Complete, or Cancelled Ticket;
- an incomplete or unaccepted Specification or Ticket revision;
- an unwaived `requires` target that is not Complete;
- an absent or ambiguous Work owner, Authority, Result, scope, Proof seam,
  acceptance criterion, Reviewer route, or required input;
- a conflicting live Claim, stale Continuation, or revision mismatch; or
- a required execution or proof capability with no conforming available path.

Preserve the Ticket and current state. Return each gap with its owner, smallest
evidence request, safe allowed work, unblock condition, and exact resumption
action. When persistence crosses a session, Actor, wait, interruption, or
approval boundary, use Workflow's canonical
[Continuation template](../workflow/references/continuation-template.md).
Missing Authority is never an invitation to infer permission.

**Done when:** exactly one current executable Ticket revision and its complete
execution contract are bound, or every material admission gap has an owned
continuation.

### 2. Take responsibility and define the execution slice

Reread the canonical Ticket immediately before claiming it. In Durable mode,
when resuming an unblocked `waiting` Ticket, validate its exact Continuation and
append the authorized `waiting → accepted` transition first. Then acquire a
live Claim through the selected Adapter before transitioning `accepted →
active`; record claimant, time, expiry or staleness rule, Authority, and Ticket
revision. Use atomic claiming when concurrent workers are possible.
When safe claiming is unavailable, serialize execution or enter visible
Degraded mode instead of describing a read-then-write sequence as safe.

In Inline mode, do not create a Claim, Ticket record, state-transition record,
or Work frontier. Keep one conversational Work owner responsible for the
accepted inline contract, execute it within the current session, and preserve
the same Authority, revision, effect, proof, and Review boundaries in compact
form. If the work must survive an interruption, wait, transfer, or other
Persistence boundary, return to Workflow to enter Durable mode before acting
further.

Plan the smallest coherent execution slice that can produce the Ticket's whole
Result at its Proof seam. Name the current baseline Result revision, affected
writable sources or physical state, inputs, ordered actions, required
capabilities, effect boundaries, evidence collection, abort condition, and
recovery or reversal path. Preserve established domain tools, materials,
instructions, and conventions unless the Ticket authorizes changing them.

Classify every planned external effect:

- **Authorized execution:** the accepted Ticket already grants the exact
  effect; recheck Authority, validity, approval, target, scope, and current
  revision immediately before performing it.
- **Pre-effect Review:** the effect requires Review or approval first; prepare
  the exact proposed result, exercise or simulate it without the effect, and
  submit with effect status `pending`.
- **Outside Authority:** preserve the proposed action and route it to its
  Approver or Workflow without performing it.

**Done when:** the Durable Ticket is active under one valid Claim, or the Inline
contract has one current conversational Work owner, and its bounded path to
Result, proof, effects, and recovery is executable within current Authority—or
the exact blocked state has an owned continuation.

The normal path is `1 → 2 → 3 → 4 → 6`. An admission gap, failure, or wait
goes directly to step 5 and returns Implementation incomplete; resumption
re-enters at step 1.

### 3. Execute directly or through bounded Executors

Perform the accepted slice through the domain-appropriate capability. In
Durable mode, recheck that the Claim is live immediately before every material
effect; expired, stale, or mismatched Claim state enters Recovery without the
effect. In either mode, make each effect only after its immediate Authority and
contract guard passes. Preserve original inputs,
intermediate state needed for recovery, and actual observations; do not replace
an unavailable required capability with a weaker one merely because it can
produce a similar artifact.

The Work owner may delegate bounded actions. Give each Executor an immutable
child contract naming the input and Ticket revisions, Result or action,
included and excluded scope, writable sources, Authority, dependencies, Proof
seam, evidence return, failure behavior, and return route. Run children in
parallel only when their Authority, dependencies, writable state, and proof
seams are independent. Delegation transfers execution, not the Work owner's
Responsibility for the Ticket Result.

Validate each child return against its contract and exact revision. Integrate
the usable Result and evidence rather than forwarding child activity reports.
A stale, conflicting, partial, failed, or unreachable child is a failure event;
the Work owner retains integration and chooses an authorized retry, correction,
rescope, reassignment, wait, escalation, transfer, or cancellation route.

At the `workflow.implementation` Extension point, invoke only a Supplemental
skill selected by effective configuration. Use Workflow's
[Extension-point template](../workflow/references/extension-point-template.md)
to bind its pinned identity, advisory or required status, supported conditions,
inputs, Authority, expected Result and evidence, failure behavior, and return
route. Validate its exact child Result and evidence like any other Executor.
Implement retains the whole Ticket Result and completion boundary. An
unavailable advisory mapping stays visible while core execution continues only
when the Ticket contract remains satisfiable; an unavailable required mapping
is an admission gap with an owned Continuation. Installed capability or name
similarity never creates a mapping.

**Done when:** every accepted action has a validated direct or child Result;
delegated work, material effects, and recovery-critical state have evidence;
every partial effect is accounted for; and the Work owner has one integrated
candidate Result—or execution has a truthful recovery disposition.

### 4. Prove the exact Result at the Ticket seam

Exercise or observe the integrated Result at the accepted Proof seam. Inspect
the human-visible or System-visible behavior, not only the internal artifact.
Cover every acceptance criterion, governing Constraint, authorized effect,
material degraded or recovery path, and Ticket-scoped current-state or legacy
obligation. For a pre-effect Review, prove the exact proposal through the
accepted simulation or inspection seam and keep the unperformed effect visible.

Create an immutable Result identity and exact revision using the selected
Adapter or result medium. Record each Evidence reference with the condition,
method or observation, result, observer, time, location, exact Result revision,
and limitation. Distinguish preparation evidence, verification at the Result
seam, approval state, real-effect evidence, and parent-Outcome evidence; none
substitutes for another.

If the Result changes materially after evidence is collected, create a new
revision and replace the affected evidence. If a criterion fails, keep the
Ticket active only for an authorized immediate correction; otherwise record
recovery or waiting rather than submitting an unusable Result.

**Done when:** one exact usable Result revision satisfies every criterion
applicable before Review, its complete evidence is traceable, and every pending
effect or limitation is explicit.

### 5. Preserve failure, waiting, and recovery

Failure never ends Responsibility. Record the failed action, contributing
conditions, partial Results and effects, current revisions, evidence, and the
chosen recovery disposition. Keep the live Claim only for a bounded immediate
retry within its validity; otherwise release it and transition according to
the authorized recovery route.

When an external event, approval, capability, input, or observation must arrive
before execution can continue, preserve a complete record with Workflow's
canonical
[Continuation template](../workflow/references/continuation-template.md). Add
the partial Results and effects, safe allowed work, and preserved recovery state
needed by this Ticket. Transition an `active` Ticket to `waiting` only through
the authorized Adapter; an admission gap leaves an unclaimed `accepted` Ticket
in place. Without an executable scheduler, name the human or next-session
trigger and never claim active monitoring.

On resumption, reread the canonical Ticket, Specification, Continuation,
Authority, requirements, Claim state, and current revisions before acting.
Stale or conflicting state enters Recovery; it never silently returns to the
Work frontier.

**Done when:** execution can continue from current verified state, or every
blocked or failed path preserves enough owned state to resume without
reconstructing material context.

### 6. Submit the Result to Review

Before submission, reread the canonical Ticket and accepted Specification.
Confirm their revisions still match the execution contract, every requirement
remains satisfied or explicitly pending beyond this seam, child evidence is
integrated, the exact Result revision is immutable, and effect evidence and
approval status are current. In Durable mode, also recheck the live Claim. A
material contract change or invalid Claim returns to Workflow
for impact analysis through Workflow's
[Material-change template](../workflow/references/material-change-template.md);
it never inherits stale evidence or approval.

Read and complete the [Review submission template](references/review-submission-template.md).
Submit that exact package to the configured `'Review'` skill through Workflow.
In Durable mode, use one atomic Adapter operation to accept the exact Review
submission, release the execution Claim, and append the authorized `active →
in_review` transition. When the Adapter cannot provide that atomic boundary,
serialize the operation with one immutable idempotency key and verify all three
postconditions; any partial success, timeout, expiry, or mismatch enters
Recovery with the intake receipt, Claim state, transition state, safe allowed
work, and exact retry action so execution cannot duplicate. In Inline mode,
submit the exact compact package directly to Review without creating a Claim or
durable transition record and state conversationally that the result is In
review. If Review or its required handoff capability is unavailable, preserve
the ready Result and submission, enter waiting or Recovery with an exact
resumption action, and do not claim that submission occurred.

Return the Result revision, Evidence references, actual and pending effects,
child integration, limitations, transition evidence, current Work owner, and
Review route to Workflow. Submission does not transfer the Work owner's duty
to resolve requested changes, perform later authorized effects, recover, and
carry the Ticket through verified completion. It does not produce a Review
verdict or complete this Ticket or its parent Outcome.

**Done when:** Review has accepted one exact submission and either the Durable
Ticket is In review at the matching revision or the Inline result is explicitly
In review in the conversation, or Implementation remains visibly incomplete
with an owned continuation that names the exact missing submission capability.

## Completion boundary

Implementation completes only when Review accepts one exact usable Result
revision and its available effect evidence: through a verified Durable `active
→ in_review` transition or an explicit claim-free Inline Review handoff. A
governed wait or recovery return preserves progress but leaves Implementation
incomplete. Drafts, delegated activity, commits, tests, approvals, schedules,
partial effects, and a ready-but-unsubmitted Result are non-terminal.

Review owns the verdict and target completion transition. Workflow coordinates
later gates, parent integration, parent Review, current and legacy propagation,
and the parent Outcome's terminal proof; the Ticket Work owner retains effect
execution, recovery, and Ticket-result Responsibility.
