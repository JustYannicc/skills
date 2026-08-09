# Ticket contract template

Use this representation after the accepted Specification is bound. The
Universal Work Contract remains the canonical meaning of shared Ticket,
relationship, claim, continuation, frontier, and Recovery fields; a selected
Adapter may render them natively. This file is a standalone rendered projection
for the Coordination space. Keep the Specification and Outcome as linked
sources; repeat only the bounded context needed to execute and prove this
Ticket. The decomposition envelope below is rendered once per Ticket set, not
copied into every Ticket.

## Ticket contract

# [Ticket name]

- **Ticket schema version:** [contract version]
- **Ticket identity and aliases:**
- **Ticket state:** [Proposed | Accepted | Active | Waiting | In review | Complete | Cancelled]
- **Ticket kind:** [decision | research | prototype | action | review | integration | named extension kind with identity/version]
- **Parent Outcome and `contains` parent:**
- **Outcome owner:** [Actor retaining parent integration and terminal proof]
- **Decomposition Work owner:** [Actor responsible for this Ticket set]
- **Accepted Specification source and exact revision:**
- **Ticket-set revision:**
- **Representation:** [Inline implicit | Durable]
- **Operational mode:** [Normal | Degraded | Paused | Recovery]
- **Canonical locator and Adapter revision, when Durable:**
- **Created and updated:**
- **Transition history:** [append-only state changes with actor, time, Authority, rationale, evidence, and affected revision]
- **Workflow context and return route:** [Outcome identity, current phase, owner, Authority, Adapter, and next route]

### Result and boundary

- **Result:** [one externally meaningful condition this Ticket makes true]
- **Included scope and Actors:**
- **Exclusions and non-Outcomes:**
- **Inputs and preconditions:**
- **Available Authority:** [Actor, named effect or decision, scope, limits, validity, and approval requirement]

### Ownership and relationships

- **Work owner:** [one unambiguous Actor reference]
- **Executors:** [Actors that perform bounded actions, if distinct]
- **Reviewer and Approver:** [when the Result or effect requires them]
- **`requires`:** [blocking Ticket identities, or None]
- **`related`:** [non-blocking context, or None]
- **Current Claim:** [canonical claim identity/locator, claimant, and staleness or expiry; or None]
- **Continuation identity and canonical locator:** [when Durable]
- **Continuation reason and external dependency:** [why work cannot continue and event/party]
- **Observable unblock condition and last observation:** [condition, observation, and time]
- **Next check and scheduled action:** [responsible Actor, next check, and monitor/scheduler reference when one exists]
- **Retry, escalation, expiry, pickup, and resumption:** [rules, exact pickup point, first resumption action, and required context/proof]

### Proof and lifecycle

- **Proof seam:** [human-visible observation independent of internal implementation]
- **Acceptance criteria:**
  - [ ] Result condition
  - [ ] required behavior and Constraint checks
  - [ ] recovery, propagation, or effect evidence when applicable
- **Terminal condition:** [condition that permits this Ticket to end]
- **Failure, Degraded, Paused, and Recovery behavior:**
- **Result identity and exact revision:**
- **Evidence references:**
- **Parent return:** [evidence returned to the Outcome owner; parent remains open]

## Decomposition envelope (one per Ticket set)

### Collective coverage map

| Specification item ID, source locator, and revision | Covered by Ticket(s) | Result/proof evidence | Status or gap owner |
| --- | --- | --- | --- |
|  |  |  |  |

Every material Specification item has an accepted Ticket disposition or a
linked Specification gap. `contains` rows organize responsibility; `requires`
rows determine blocking and never substitute for coverage evidence.

### Acceptance decision

- **Decision:** [Accepted | Returned for revision | Waiting | Cancelled]
- **Decision actor and Authority:**
- **Exact Ticket-set revision decided:**
- **Decision evidence and time:**

### Work frontier and Recovery

- **Accepted Tickets:**
- **Work frontier:** [accepted, unblocked, and unclaimed Tickets]
- **Blocked Tickets and unwaived requirements:**
- **Waiting or in-review Tickets:**
- **Recovery queue and intervention owner:**
- **Frontier calculation revision and observed time:**

## Supplemental evidence

Complete when a mapping is configured at `workflow.decomposition` (the
decomposition-enrichment seam).

| Supplemental skill | Advisory or required | Source/version | Exact Ticket-set revision inspected | Evidence and limitations | Disposition and impact |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Specification gap

Use one row for every material missing fact, decision, owner, Authority,
dependency, Result, Proof seam, or persistence capability that prevents a
faithful decomposition.

| Missing item | Impact and blocking status | Owning capability or Actor | Smallest question/evidence request | Responsibility and Approver | Unblock condition and exact resumption action |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

Preserve the accepted Specification revision, proposed Ticket-set revision,
safe allowed work, and any partial Adapter state in the canonical continuation
record or this standalone projection.
Do not rewrite accepted intent to make the coverage map appear complete.
