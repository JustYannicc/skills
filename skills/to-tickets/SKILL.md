---
name: to-tickets
description: Decompose an accepted Specification into bounded, independently finishable, owned, dependency-aware Tickets when Workflow needs durable coordination; expose the Work frontier, integrate configured decomposition evidence, or return Specification gaps without changing accepted intent.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# To Tickets

Decompose one accepted Specification into one collectively complete set of
bounded work contracts. Each Ticket owns a verifiable **Result**, one Work
owner, its **Authority**, a **Proof seam**, and explicit relationships. Return
the set to the active `'Workflow'` skill; do not implement, review, or complete
the parent Outcome.

Join the active Workflow context. The Outcome owner retains parent
Responsibility, the acceptance decision, and terminal proof. This skill owns
only the decomposition result, coverage evidence, and recording that decision.

## Process

### 1. Bind the accepted Specification

Inspect the Specification status, identity, and revision before broad context.
For an accepted revision, read the parent Outcome identity and owner,
Specification Work owner, Approver, Authority, current phase, selected Adapter
and capabilities, current Ticket-set revision, and return route. Then read the
accepted behavior, scope and exclusions, Constraints, required
remediation/propagation/recovery, dependencies, Proof seam, terminal condition,
and any relevant current-state or legacy records. Preserve source locators and
revisions; do not replace accepted terms with implementation vocabulary.

An artifact that is Proposed, Waiting for discovery, or missing a material
Result, owner, Authority, scope, dependency rule, Proof seam, required
Approver (or an explicit no-approval disposition), or terminal condition is not
an accepted Specification for decomposition. Read only the available owner and
return route, preserve the artifact, and return a
[Specification gap](references/ticket-contract-template.md#specification-gap)
to Workflow. Missing Authority is a gap, not permission to infer an owner or
effect.

**Done when:** exactly one accepted Specification revision, parent context,
decomposition responsibility, required approval Authority or explicit
no-approval disposition, terminal condition, and return route are bound, or
every blocking input has an owned gap and resumption action.

### 2. Choose Inline or Durable representation

Use **Inline mode** when one bounded unit can finish synchronously before a
Persistence boundary: no delegation, handoff, wait, approval, concurrent
claim, multi-phase coordination, or meaningful risk needs to survive the
interaction. Return one implicit Ticket in the conversation with its Result,
owner, Authority, Proof seam, scope, and terminal condition. Workflow performs
the immediate execution and Review; do not create records, claims, a Work
frontier, or tracker-specific output.

Use **Durable mode** when the work has multiple independently finishable units,
delegation, dependencies, concurrency, cross-session execution, waiting,
approval, multi-phase coordination, meaningful risk, or another Persistence
boundary. Durable mode stores one canonical Ticket per accepted unit through
the selected Adapter. Git, a hosted tracker, and executable scheduling are
optional capabilities, not Ticket meanings.

If Durable mode is required but the Adapter or a required capability is
unavailable, preserve the complete proposed decomposition, exact revisions,
safe allowed work, missing capability, owner, unblock condition, and exact
resumption action. Return Proposed or Waiting state with visible Degraded mode;
never claim that Tickets were persisted.

**Done when:** the representation decision names its trigger and boundary, or
the capability gap preserves a truthful continuation contract.

### 3. Build the collective coverage map

Reference each material requirement from the accepted Specification by its
stable identifier, source locator, and exact revision in a coverage map:
accepted behavior, scope and exclusions, Constraint or Authority gate,
dependency, required remediation/propagation/recovery, Proof seam, and parent
terminal condition. Summarize only the disposition, Ticket identity, Result,
and evidence that satisfy it; keep the full requirement in the canonical
Specification. A requirement with no bounded owner, Authority, Result, or proof
is a Specification gap returned to Workflow; the accepted Specification is
never edited to hide the gap.

Shape Tickets as narrow complete paths through the layers or Actors that make
their Result observable. A non-software Ticket still names the externally
meaningful condition it makes true. A broad mechanical change that cannot stay
independently verifiable as one slice uses an explicit **expand → migrate →
contract** sequence:
introduce the compatible form, migrate bounded cohorts, then remove the old
form after every migration Result is verified. Keep optional improvements as
related Outcomes rather than smuggling them into required coverage.

When a material Specification revision arrives, bind the prior and successor
revisions, trace the affected Ticket and dependency closure, and invalidate or
reconcile every affected Ticket, claim, approval, Review, effect, evidence,
coverage row, and current-state reference. Preserve unaffected accepted work.
Return the successor decomposition for re-approval; do not mutate the prior
revision in place.

**Done when:** the coverage map has one accepted disposition for every material
Specification item and every proposed Ticket is independently finishable and
verifiable at its own seam, or each uncovered item is a named blocking gap.

### 4. Shape ownership, containment, and requirements

Use the [Ticket contract template](references/ticket-contract-template.md) for
each unit. Every Ticket declares its bounded **Result**, parent `contains`
relationship, `requires` blockers, `related` context, scope and exclusions,
inputs and preconditions, Work owner, Executors, Authority, Reviewer or
Approver when applicable, Proof seam, terminal condition, exact source and
Result revisions, and return route. Render the collective coverage map,
frontier and Recovery view, Supplemental evidence, and Specification-gap table
once per Ticket set; individual Tickets point to their stable rows rather than
copying those global views.

Keep relationships distinct:

- `contains` organizes nested Responsibility and navigation; it does not order
  execution.
- `requires` blocks a dependent Ticket until the prerequisite completes or the
  dependent owner explicitly replaces, waives, or cancels that requirement.
  Cancellation alone never satisfies a requirement.
- `related` supplies context without changing state or frontier calculations.
- An external event or ungoverned party is recorded in a waiting Ticket's
  Continuation record, not invented as a Ticket without a valid Work owner.

When the companion Workflow skill is available, hand continuation state through
its shared [Continuation contract](../workflow/references/continuation-template.md);
when it is not installed, the Ticket contract below is the standalone
projection and must preserve the same unblock, resumption, retry, and recovery
fields.

Give each Ticket one unambiguous Work owner able to fulfill its Authority.
Delegation creates nested Responsibility: a child owner returns its Result and
evidence while the Outcome owner retains integration and parent completion.
Independent Tickets may run concurrently only when their requirements,
Authority, writable sources, and proof seams do not conflict. Shared state,
ordering, or integration creates an explicit requirement or integration Ticket;
do not assume concurrency safety from a read-then-write Adapter. If the
selected Adapter does not declare atomic-claim coordination, disable parallel
claiming, state that safe coordination cannot be guaranteed, and use
sequential claiming or an explicit handoff/recovery path.

**Done when:** every Ticket has one owner and a feasible Authority, the
`contains` and `requires` relationships are typed and acyclic, and delegation,
concurrency, external dependencies, waiting, and recovery behavior are
explicit. `related` remains non-blocking context and may form cycles.

### 5. Expose the Work frontier

Keep proposed Tickets distinguishable from accepted Tickets. After the Outcome
owner accepts the decomposition, compute the Work frontier deterministically.
Before that decision, a draft may include a clearly labeled preview frontier,
but it is not executable or accepted. Complete Supplemental integration in
Step 6 before publishing the accepted view in Step 7:

```text
frontier(t) =
  state(t) is accepted
  and every unwaived `requires` target is complete
  and no live Claim exists
```

Report accepted frontier Tickets, blocked Tickets with their requirements,
waiting or in-review Tickets, and the Recovery queue separately. Stale claims,
expired Continuations, missed checks, unreachable owners, and overdue Reviews
remain Recovery work; they never silently return to the frontier. This phase
does not claim Tickets, start execution, or infer parent completion from a
frontier or child result.

**Done when:** the accepted set has an exact decomposition revision and a
readable frontier, blocked set, and recovery disposition, or the missing
acceptance/capability is returned with responsibility and next action.

### 6. Use configured decomposition evidence

At the `workflow.decomposition` Extension point (the decomposition-enrichment
seam), request each configured Supplemental skill only after a complete draft
coverage map and Ticket set revision exist and before acceptance. Supply the
accepted Specification revision, dependency context, draft Ticket-set
revision, requested concern, and proof obligations. Dispatch independent
mappings concurrently against that immutable draft; serialize only declared
evidence dependencies. A Supplemental skill may return specialist constraints,
risks, or decomposition evidence; it does not own Ticket acceptance,
execution, Review, or parent completion.

Record the skill identity, source and version, exact input revision, evidence,
limitations, and disposition. Integrate accepted evidence and rerun collective
coverage. An unavailable advisory mapping is visible and non-blocking. An
unavailable, stale, invalid, or conflicting required mapping becomes a named
gap with an owner, unblock condition, and exact resumption action. No mapping is
invoked merely because an installed skill has a similar name. When the
companion Workflow skill is available, hand the mapping through its shared
[Extension-point contract](../workflow/references/extension-point-template.md);
when it is not installed, retain the equivalent Ticket-set revision and
evidence fields here.

**Done when:** every configured mapping is integrated, advisory-unavailable,
required-blocked, or not configured; the core decomposition still owns the
coverage and shape criterion; and the Outcome owner, through Workflow, retains
the acceptance decision.

### 7. Present, persist, and return the bounded result

Present the proposed breakdown to the Outcome owner through Workflow with
Ticket names, Results, owners, `requires` relationships, and the Work frontier.
The Outcome owner decides acceptance; To Tickets records that explicit decision
against the exact Ticket-set revision. Granularity or dependency uncertainty
that changes coverage returns to Workflow rather than being guessed. If the
owner requests a merge, split, or changed edge, revise the draft and rerun
collective coverage before presenting it again.

In Durable mode, after the Outcome owner's acceptance, write the canonical
Ticket records and relationships through the selected Adapter and bind its
locator and exact revision. Before writing, verify the Adapter's atomic or
transactional capability for the complete set and parent relationship. If a
write partially succeeds or reconciliation finds a conflicting revision,
preserve every canonical locator and partial state, mark the set Degraded or
Recovery, create a Continuation with an owner, next check, and exact
reconciliation action, and do not claim acceptance or persistence until the
canonical records and edges are reread and verified. Updating the parent with
`contains` edges is an explicit relationship transition that preserves accepted
parent intent while advancing the parent record revision; it is not a silent
Specification edit.
In Inline mode, return the one implicit Ticket and its immediate Review route
in the conversation.

Return the exact Ticket-set revision, representation mode and state, coverage
map, Ticket contracts, accepted frontier and blocked/recovery sets, Supplemental
evidence, unresolved gaps, responsibility and Authority, and the next route to
Workflow. Bind acceptance to the named Outcome owner or Approver's Authority;
never infer it from a parent label alone. A proposed or persisted Ticket set is
not implementation, Review, an effect, or parent completion.

**Done when:** the decomposition is accepted and truthfully represented, or
every material gap has returned to its owning Specification, discovery,
approval, Adapter, or external-dependency route with continuation state.

## Completion

This invocation completes only when one of these boundaries is true:

- one bounded Inline unit is returned as an implicit Ticket with its Result,
  owner, Authority, Proof seam, terminal condition, and immediate Workflow
  route;
- an accepted Durable Ticket set collectively covers the Specification, each
  Ticket has its own bounded contract and relationships, and the Work frontier
  is exposed at an exact revision; or
- every blocking Specification or capability gap is returned with its owner,
  smallest evidence request, unblock condition, and exact resumption action.

No decomposition return completes the parent Outcome. Parent integration,
execution, Review, effects, recovery, and terminal proof remain with Workflow
and their owning phase skills.
