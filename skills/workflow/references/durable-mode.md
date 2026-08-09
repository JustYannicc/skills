# Durable mode

Read this branch when a request crosses a Persistence boundary. The
[Universal work and coordination contract](../../../docs/UNIVERSAL_WORK_CONTRACT.md)
owns the meanings and lifecycle states below; this reference tells Workflow
how to materialize, resume, and integrate them through one selected Adapter.

## Enter Durable mode

Use Durable mode when an Outcome must survive a session, actor, waiting period,
approval, assignment, multiple independently finishable units, or meaningful
risk. Keep the accepted Inline contract and result history. Durable mode
changes representation, not the method, Responsibility, Authority, Review, or
parent terminal condition.

Before creating a record, make the following boundary explicit:

| Input | Record the decision |
| --- | --- |
| Coordination space | The one scope in which identities, relationships, claims, and transitions are authoritative. |
| Adapter | The host-specific canonical implementation and its exact provider/revision. |
| Capability level | `Baseline`, `Coordination`, and `Continuation`, each marked `available`, `unavailable`, or `unknown`. |
| Parent context | One Outcome identity, owner, current phase, Authority, Specification revision, result revision, and return route. |
| Proof seam | The observable condition that will prove the parent Outcome, each child result, and any real effect. |

`Baseline` is required to claim Durable state. `Coordination` and
`Continuation` are optional. Git, GitHub, atomic claims, schedulers, and
monitoring are never inferred from a name or a repository connection.

## Materialize one canonical state

Create or update the following records through the selected Adapter. Each
record has one immutable identity within the Coordination space, one current
revision, one owner when responsibility applies, and append-only transition
history. A Map, dashboard, projection, or activity view points to these records
and never becomes a writable authority.

1. **Outcome record.** Store the accepted Outcome, scope and exclusions,
   Constraints, owner, Specification reference and revision, parent proof seam,
   terminal conditions, current phase/state, canonical child relationships,
   Adapter and capability declaration, and current Map locator.
2. **Ticket records.** Materialize one record for every independently owned,
   delegated, dependent, concurrent, cross-session, or otherwise persistent
   unit. Store kind, parent `contains` relationship, work owner, bounded result
   and proof seam, `requires` and `related` relationships, Authority, Reviewer
   or Approver when needed, state, result revision, and current Claim,
   Continuation, and Evidence references when applicable.
3. **Claims.** Store claimant, start time, and staleness/expiry rule separately
   from ownership. A stale Claim releases coordination, not Responsibility;
   stale active work enters Recovery and does not silently return to the
   Work frontier.
4. **Evidence references.** Bind each observation to the condition evaluated,
   method, result, observer, time, location, and exact result revision when the
   result can change. A link or child completion count alone is not proof.
5. **Continuation records.** For waiting or interruption, store the external
   dependency, observable unblock condition, last observation, next check and
   responsible Actor, retry/escalation/expiry rules, scheduler or monitor
   reference when actually accepted, exact pickup point, first resumption
   action, and proof still required.
6. **Transition history.** Append actor, time, Authority, rationale, prior and
   next state, affected revision, and Evidence for each material transition.
7. **Change and Legacy Record.** For a material system change, add the
   canonical packet described below. Ordinary Inline changes remain in their
   accepted conversation representation; do not create a parallel change
   lifecycle.
8. **Proof bundle.** At a parent terminal transition, bind the current
   Specification and result revisions, parent and child owners, Review verdict,
   approvals, real-effect evidence, exceptions, current and legacy propagation,
   and the exact terminal transition.

Materialize the Outcome before a child action or external effect can cross the
boundary. If a single synchronous unit can remain entirely inside the current
conversation, keep the Inline representation instead.

## Record and transition guards

Use deterministic Adapter operations for identity, revision, state, claims,
relationships, approvals, stale-write protection, queues, and effects. LLM
judgment may interpret, synthesize, classify, or propose; it cannot invent an
identity, claim, state transition, approval, or effect.

For a Ticket `t`, use the contract's queues:

```text
blocked(t) = any unwaived requires target is not complete

frontier(t) = state(t) is accepted
  and not blocked(t)
  and the Adapter has explicitly validated that no live Claim exists

An explicit claim-free result is represented by `liveClaim: null` at this
validation seam. Missing or unavailable Claim data is unverified, stays off the
frontier, and enters Degraded or Recovery rather than permitting a concurrent
claim attempt.

recovery(t) = state(t) is active, waiting, or in_review
  and its claim, continuation, owner, review, or deadline needs intervention
```

Apply these invariants at every Adapter:

- `active` requires a live Claim; a Claim never assigns or transfers ownership.
- Submission, delegation, approval, scheduling, and child completion are
  non-terminal.
- A failed attempt is an event with a recovery disposition; it does not make a
  Ticket complete, cancelled, or ownerless.
- `requires` blocks until the target is complete or the dependent owner
  explicitly replaces, waives, or cancels it. Cancellation alone is not a
  prerequisite completion.
- A material revision invalidates affected Evidence, Review, approval, child
  contracts, and completion only; unaffected ownership and evidence persist.
- A resumed process rereads the canonical current record and rejects stale
  continuation or scheduler context before acting.

## Adapter capability matrix

Every canonical Adapter declares actual support for the semantic operation
groups in the Universal work contract: record CRUD and relationships, guarded
transitions and Claims, Evidence/Continuation/history, Map/frontier/Recovery,
and current-state or Canonical migration.

| Adapter | Canonical state | Capability expectations | Truthful fallback |
| --- | --- | --- | --- |
| Transient Conversation | Implicit Outcome, Ticket, history, and Evidence only until a Persistence boundary | No durable capabilities claimed | At the boundary, materialize through a Baseline Adapter or preserve a Degraded continuation. |
| Local Markdown, no Git | One visible `workflow/<outcome-id>/` authority with Outcome, Ticket, Claim, and Evidence records | Baseline through atomic file writes; Coordination only when Claim creation is atomic; Continuation only when a real scheduler/monitor accepts it | Human-readable records remain available; unavailable parser, atomicity, or scheduler blocks the corresponding machine action and enters Recovery or waiting. |
| Git-backed Local Markdown | Same canonical Markdown records with Git as one exact revision source | Git supplies provenance/revision, not safe Claims, hosted review, or scheduling; declare each separately | Conflicts, stale revisions, or missing lock semantics enter Recovery; do not shadow-write a second source. |
| GitHub or another hosted Adapter | One native Outcome/Ticket space mapped to the universal fields and native human-readable body | Claim, dependency, history, Evidence, and Continuation levels are declared from verified host behavior; assignee is a Claim only if the host defines it that way | Unsupported fields remain visible gaps; keep the native record authoritative and do not create an unsanctioned local mirror. |
| External Adapter provider | One provider-native canonical record after the conformance suite passes | Provider must preserve identity, state, relationships, ownership, Authority, Evidence, waiting, Recovery, and readable status; optional levels are explicit | Fall back to Local Markdown or remain incomplete when Baseline semantics cannot be preserved. |

### Accepted System Record boundary from #35

When Durable coordination represents a Durable System, use the accepted
adapter-neutral System Record representation:

- one human-readable Markdown authority with a constrained YAML envelope for
  formal identity, version, exact revision, locator, states, owner, scoped
  Authority, provenance, and conditional approval;
- the Section 2 relationship table as the single semantic relationship index;
- native hosted fields may map the same logical envelope without requiring YAML;
- JSON/TOML are optional read-only generated projections for a named consumer,
  never a second writable authority; and
- any Adapter that authorizes lifecycle transitions, projections, or effects
  proves both the `System Record structural validator` and `System Record action
  guard`. A malformed, stale, unverified, unavailable, non-normal, ineligible,
  or wrong-revision record remains human-readable but cannot authorize a
  machine action.

Do not add a TOML dependency or invent a second System Record format. Bind
Outcome, Ticket, Change and Legacy, and Proof records to the System Record's
exact locator and revision when the represented system is in scope.

## Migration and material change

If Durable work depends on an existing scope without a current verified map,
Workflow invokes `migrate-system` for bounded Conformance migration. Migration
records current sources, Actors, responsibilities, relationships, active work,
Evidence, waiting state, and unknowns; verifies the integrated map; and returns
discovered changes to ordinary Workflow. It does not repair the represented
system or create a second lifecycle.

Changing the canonical Adapter is a Canonical migration, not a configuration
toggle: freeze the old authority, copy and verify records and history, record
predecessor/successor locators and aliases, and make the old source read-only.

Use a Change and Legacy Record only when consequence warrants it (for example,
an affected actor/interface/state, irreversible or high-risk effect, material
legacy population, phased rollout, or changed support/recovery contract). The
packet records:

1. baseline and successor System/Specification revisions, rationale, Authority,
   and expected effect;
2. affected Actors, interfaces, state transitions, dependencies, and legacy
   cohorts, including `unaffected`, `compatible`, `auto-adapt`,
   `review-required`, `conflict`, `exempt`, and `unreachable/unknown` coverage;
3. readiness, support, communication, feedback, and adoption conditions;
4. impact, timetable, pilot/rollout/cutover, abort/rollback or honest repair,
   and verification boundaries;
5. exact legacy disposition, migration evidence, current-state and dependent
   record propagation, and predecessor retirement/preservation; and
6. sustainment, decay signals, assurance cadence, owner, next review, and
   cancellation/retirement condition.

Availability, adoption, correct use/fidelity, acceptability, feasibility,
penetration, Outcome, burden/cost, and sustainment are evidence dimensions in
this packet—not mandatory Ticket states or ceremony. Record only dimensions
that can change the decision.

## Waiting, Degraded, delegation, and effects

- **Waiting:** keep the current owner and state; create the Continuation record.
  A scheduler is an execution mechanism, not an owner. Without accepted
  scheduling or monitoring, require a handoff with an accepting Actor and exact
  next check. Waiting is never completion.
- **Degraded:** name the missing skill, tool, parser, host operation, or
  capability; preserve the complete proposal, current revisions, and exact
  resumption condition; use a safe equivalent only when the same contract
  remains satisfiable. Otherwise route to installation, waiting, Recovery, or
  accepted handoff without fictional execution.
- **Delegation:** create a child Ticket with an accepting Work owner and return
  route. The Outcome owner retains parent Responsibility and integrates the
  child's revision-bound Evidence. Unreachable or failed children enter
  Recovery; they do not transfer or complete the parent.
- **Supplemental:** invoke only a configured Workflow Extension point. The
  core supplies exact parent/Ticket/revision inputs, records the Supplemental
  identity and evidence, integrates advisory or required failure honestly, and
  keeps the core completion criterion.
- **Effects:** Review and approval bind to the exact result and Authority
  revisions. Immediately before a consequential effect, recheck current
  record/Specification/result revision, state and mode, Authority, approval
  validity and revocation, target/scope, and guard contract. Execute through
  the named effector, append real-effect Evidence, then perform parent Review.

## Parent terminal check

Parent Review evaluates one exact integrated state containing the current
Specification, every required child disposition, all required effect Evidence,
unresolved exceptions and informed exceptions, current-state and legacy
propagation, and the parent proof seam. End parent Responsibility only with:

- **verified completion:** the parent proof bundle is complete and the terminal
  condition is evidenced at the real boundary;
- **accepted transfer:** an incoming owner accepts the exact current state,
  Authority, revisions, continuation, and next action; or
- **authoritative cancellation:** the authorized actor records rationale,
  partial effects, child dispositions, dependency consequences, and recovery or
  reversal needs.

Submission, delegation, child completion, approval, scheduling, waiting,
failure, and an unaccepted handoff remain non-terminal.
