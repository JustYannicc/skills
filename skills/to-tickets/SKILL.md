---
name: to-tickets
description: Decompose an accepted Specification into bounded, independently finishable, owned, dependency-aware Tickets when Workflow needs durable coordination; expose the Work frontier, integrate configured decomposition evidence, or return Specification gaps without changing accepted intent.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# To Tickets

Join the active Workflow context and decompose one accepted Specification into one collectively complete set of bounded work contracts.

## Operating contract

- **Input:** one exact accepted Specification revision and its active Workflow context.
- **Result:** one implicit Inline Ticket, one accepted Durable Ticket set, or an owned gap with an exact resumption action.
- **Ticket invariant:** every Ticket owns one verifiable **Result**, one Work owner, feasible **Authority**, a **Proof seam**, a terminal condition, and explicit relationships.
- **Responsibility:** To Tickets owns the decomposition result, coverage evidence, and recording the decomposition decision. The Outcome owner retains parent Responsibility, acceptance, integration, and terminal proof.

## Decomposition sequence

### 1. Bind the accepted Specification

**Gate first.** Inspect the Specification status, identity, and revision before loading broader context. A Proposed or Waiting artifact is not ready for decomposition. Neither is an artifact missing a material Result, owner, Authority, scope, dependency rule, Proof seam, terminal condition, or required Approver or explicit no-approval disposition. For an unready artifact, read only the available owner and return route, preserve the artifact, record every blocker through the [Specification gap](references/ticket-contract-template.md#specification-gaps) contract, and return it to Workflow at the Gap completion boundary. Missing Authority remains a gap; infer neither ownership nor effect permission.

**Bind accepted context.** Read the parent Outcome identity and owner, Specification Work owner, Approver, Authority, current phase, selected Adapter and capabilities, current Ticket-set revision, and return route. Then read the accepted behavior, scope and exclusions, Constraints, required remediation, propagation, and recovery, dependencies, Proof seam, terminal condition, and relevant current-state or legacy records. Preserve every source locator and revision and retain the Specification's vocabulary.

**Done when:** exactly one accepted Specification revision, parent context, decomposition responsibility, approval Authority or explicit no-approval disposition, terminal condition, and return route are bound, or every blocking input has an owned gap and resumption action.

### 2. Select Inline or Durable representation

| Mode | Select when | Represent as |
| --- | --- | --- |
| **Inline** | One bounded unit can finish synchronously before any Persistence boundary: no delegation, handoff, wait, approval, concurrent claim, multi-phase coordination, or meaningful risk must survive the interaction. | One implicit Ticket in the conversation with its Result, owner, Authority, Proof seam, scope, and terminal condition. Workflow performs immediate execution and Review; create no records, claims, Work frontier, or tracker-specific output. |
| **Durable** | Work has multiple independently finishable units, delegation, dependencies, concurrency, cross-session execution, waiting, approval, multi-phase coordination, meaningful risk, or another Persistence boundary. | One canonical Ticket per unit through the selected Adapter after acceptance. Git, hosted trackers, and executable scheduling are optional capabilities rather than Ticket meanings. |

**Degrade truthfully.** When Durable mode is required but the Adapter is unavailable or another required capability has no contract-preserving fallback, preserve the complete proposed decomposition, exact revisions, safe allowed work, missing capability, owner, unblock condition, and exact resumption action without claiming persistence. Return Proposed state when the requested Result is a reviewable or re-approval draft that can be handed back safely without durable state. Return Waiting state when later coordination, approval, or an effect depends on the unavailable capability.

**Route by mode.** For Inline mode, return the implicit Ticket and immediate Review route to Workflow now, then stop at the Inline completion boundary. For Durable mode, continue through Steps 3–7. When Durable representation is capability-blocked, continue only through the complete proposed draft and configured evidence in Steps 3–5, then skip acceptance and persistence and return the Proposed or Waiting result through Step 7.

**Done when:** the representation decision names its trigger and boundary, or the capability gap preserves a truthful continuation contract.

### 3. Prove collective coverage

**Map requirements.** Reference every material Specification item by stable identifier, source locator, and exact revision: accepted behavior, scope and exclusions, Constraints and Authority gates, dependencies, required remediation, propagation, and recovery, Proof seam, and parent terminal condition. In the coverage map, summarize only the disposition, Ticket identity, Result, and evidence; keep the full requirement in the canonical Specification.

**Shape complete paths.** Prefer narrow Tickets that carry one Result through the layers or Actors needed to make it externally observable. Non-software Tickets follow the same rule. For a broad mechanical change that cannot remain independently verifiable as one slice, use **expand → migrate → contract**: introduce the compatible form, migrate bounded cohorts, then remove the old form after every migration Result is verified. Keep optional improvements as related Outcomes.

**Expose gaps.** Return any requirement without a bounded owner, Authority, Result, or proof to Workflow as a Specification gap. Preserve accepted intent instead of editing the Specification to make coverage appear complete.

**Reconcile revisions.** When a material Specification revision arrives, bind the prior and successor revisions, trace the affected Ticket and dependency closure, and invalidate or reconcile every affected Ticket, Claim, approval, Review, effect, Evidence reference, coverage row, and current-state reference. Preserve unaffected accepted work and return a successor decomposition for re-approval; keep the prior revision immutable.

**Done when:** every material Specification item has one accepted disposition and every proposed Ticket is independently finishable and verifiable at its own seam, or each uncovered item is a named blocking gap.

### 4. Shape the Ticket graph

Use the [Ticket contract template](references/ticket-contract-template.md) for every Durable unit. Individual Tickets point to stable decomposition-envelope rows rather than copying those views.

| Relationship | Meaning |
| --- | --- |
| `contains` | Organizes nested Responsibility and navigation without ordering execution. |
| `requires` | Blocks a dependent Ticket until its prerequisite completes or the dependent owner explicitly replaces, waives, or cancels the requirement. Cancellation alone does not satisfy it. |
| `related` | Supplies non-blocking context without changing state or frontier calculations. It may form cycles. |
| External dependency | Belongs in a waiting Ticket's Continuation record when no governed Work owner can accept it; do not invent an ownerless Ticket. |

**Assign responsibility.** Give every Ticket one unambiguous Work owner able to fulfill its Authority. Delegation creates nested Responsibility: the child owner returns its Result and evidence while the Outcome owner retains integration and parent completion.

**Govern concurrency.** Run independent Tickets concurrently only when their requirements, Authority, writable sources, and Proof seams do not conflict. Shared state, ordering, or integration creates an explicit requirement or integration Ticket. A read-then-write Adapter does not prove concurrency safety. When the Adapter does not declare atomic-claim coordination, disable parallel claiming, state that safe concurrent coordination cannot be guaranteed, and use sequential claiming or an explicit handoff or Recovery path. This contract-preserving fallback keeps Durable representation available.

**Preserve continuation.** When the companion Workflow skill is available, hand waiting state through its shared [Continuation contract](../workflow/references/continuation-template.md). Otherwise use the template's standalone projection with the same dependency, unblock, resumption, retry, and Recovery fields.

**Done when:** every Ticket has one owner and feasible Authority; `contains` and `requires` are typed and acyclic; and delegation, concurrency, external dependencies, waiting, and Recovery behavior are explicit.

### 5. Integrate configured Supplemental evidence

Use only Supplemental skills configured at the `workflow.decomposition` decomposition-enrichment Extension point. Name similarity never creates a mapping.

1. **Draft first:** complete the coverage map and bind an immutable draft Ticket-set revision.
2. **Supply context:** give each mapping the accepted Specification revision, dependency context, draft Ticket-set revision, requested concern, and proof obligations.
3. **Dispatch safely:** run independent mappings concurrently against that immutable draft and serialize declared evidence dependencies.
4. **Record evidence:** retain the skill identity, source and version, exact input revision, evidence, limitations, and disposition.
5. **Integrate:** accept or reject the evidence explicitly, update the draft, and rerun collective coverage. Supplemental skills supply specialist evidence; To Tickets retains decomposition, and the Outcome owner through Workflow retains acceptance.

**Handle absence by status.** An unavailable advisory mapping is visible and non-blocking. An unavailable, stale, invalid, or conflicting required mapping becomes a named gap with an owner, unblock condition, and exact resumption action.

**Stop on required gaps.** When a required mapping is blocked, preserve the complete proposed draft and required-Supplemental gap in Waiting state, return them to Workflow through Step 7, and skip acceptance and persistence until valid evidence returns.

When the companion Workflow skill is available, hand mappings through its shared [Extension-point contract](../workflow/references/extension-point-template.md). Otherwise retain the equivalent Ticket-set revision and evidence fields in the decomposition envelope.

**Done when:** every configured mapping is integrated, advisory-unavailable, required-blocked, or not configured, and the core coverage and Ticket-shape criteria still pass.

### 6. Accept, persist, and expose the Work frontier

Enter this step only when Baseline persistence and required Supplemental evidence are available. Coordination is optional: missing atomic-claim coordination uses Step 4's sequential fallback and does not block Durable acceptance or persistence.

**Separate lifecycle states.** Keep Proposed Tickets distinguishable from Accepted Tickets. A draft may show a clearly labeled preview frontier, but only the accepted frontier is executable.

**Present the draft.** Give the Outcome owner, through Workflow, the Ticket names, Results, owners, `requires` relationships, and preview frontier. The preview remains non-executable until the Outcome owner accepts the exact Ticket-set revision. Bind acceptance only to an explicit decision by the named Outcome owner or Approver acting within Authority, never to earlier component-level acceptance or a parent label. If the owner requests a merge, split, or changed edge, revise the draft and rerun collective coverage. Return granularity or dependency uncertainty that changes coverage to Workflow.

**Persist Durable state.** After acceptance, write canonical Tickets and relationships through the selected Adapter and bind every locator and exact revision. Before writing, verify the Adapter's atomic or transactional capability for the complete set and parent relationship. Treat the parent `contains` update as an explicit relationship transition that advances the parent record revision while preserving accepted intent; it is not a Specification edit.

**Reconcile writes.** If a write partially succeeds or rereading finds a conflicting revision, preserve every canonical locator and partial state, mark the set Degraded or Recovery, and create a Continuation with an owner, next check, and exact reconciliation action. Claim neither acceptance nor persistence until canonical records and edges are reread and verified.

**Compute Durable frontier.** After Supplemental integration, exact-revision acceptance, persistence, and reconciliation, calculate the Work frontier deterministically:

```text
frontier(t) =
  state(t) is accepted
  and every unwaived `requires` target is complete
  and no live Claim exists
```

Report accepted frontier Tickets, blocked Tickets and their requirements, waiting or in-review Tickets, and the Recovery queue separately. Stale Claims, expired Continuations, missed checks, unreachable owners, and overdue Reviews remain Recovery work; none silently return to the frontier. This phase creates no Claim, starts no execution, and infers no parent completion from frontier or child state.

**Done when:** the accepted Durable set and parent relationship are written to canonical locators, reread, and verified at one exact decomposition and Adapter revision with a readable frontier, blocked set, and Recovery disposition, or a missing acceptance or Baseline capability is returned with responsibility and next action.

### 7. Return the bounded result

**Return an accepted Durable result.** Include the exact Ticket-set revision, representation state, coverage map, Ticket contracts, accepted frontier, blocked and Recovery sets, Supplemental evidence, Responsibility and Authority, and next route to Workflow.

**Return a blocked Durable result.** Include the complete proposed Ticket-set revision, coverage map, Ticket contracts, Supplemental evidence and limitations, unresolved gaps, safe allowed work, Responsibility and Authority, unblock condition, exact resumption action, and next route to Workflow. Claim no accepted frontier or persistence.

**Done when:** the decomposition is accepted and truthfully represented, or every material gap has returned to its owning Specification, discovery, approval, Adapter, Supplemental, or external-dependency route with continuation state.

## Completion boundaries

This invocation completes at exactly one boundary:

- **Inline:** one bounded implicit Ticket is returned with its Result, owner, Authority, Proof seam, terminal condition, and immediate Workflow route.
- **Durable:** one accepted Ticket set collectively covers the Specification, every Ticket has its bounded contract and relationships, canonical records and edges are written and reread at an exact revision, and the Work frontier is exposed at that revision.
- **Gap:** every blocking Specification or capability gap is returned with its owner, smallest evidence request, unblock condition, and exact resumption action.

Parent integration, execution, Review, effects, Recovery, and terminal proof remain with Workflow and their owning phase skills. No decomposition return completes the parent Outcome.
