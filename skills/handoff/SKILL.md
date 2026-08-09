---
name: handoff
description: Materialize exact continuation state when work crosses to an identifiable actor, later session, service, waiting period, or operating context, or when a transfer offer is rejected or stale; require exact acceptance for Responsibility Transfer and preserve parent state.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Handoff

Handoff preserves enough exact state for work to continue safely across a
boundary. It owns one revision-bound Handoff result and its acceptance evidence.
It does not perform the continued work, Review the result, or complete the
parent Outcome.

Join the active `'Workflow'` context when one exists. The outgoing owner remains
responsible until an identifiable successor accepts the exact transfer. A
session or operating-context change may preserve the same owner without
transferring Responsibility.

## Process

### 1. Bind the work that must survive

Identify the exact Outcome or Ticket, current canonical state and revision,
outgoing owner, parent owner, accepted Responsibility, scoped Authority,
rationale, Evidence references, uncertainty, dependencies, Continuation, next
frontier, and Workflow/caller return route. Read authoritative records before the
conversation summary; preserve original wording where later correction may
depend on it. Mark facts, accepted decisions, assumptions, and unknowns
distinctly.

Bind mutable evidence, approvals, claims, Specifications, results, and records
to their exact revisions. Treat a delivered artifact, stale prompt, summary,
schedule, service acknowledgment, or claim as evidence only for its own seam.
None proves acceptance, ownership transfer, or parent completion.

When no active Workflow context exists, bind only the supplied canonical
sources and name the caller as the Workflow/caller return route. If a material identity,
Responsibility, Authority, or source revision is missing, preserve the
available state and return the smallest owned gap instead of inventing it.

**Done when:** the work identity, current canonical revision, and current owner
are bound, or the first discovered material gap names its owner, unblock
condition, and resumption action.

### 2. Classify the boundary and successor

Choose one Handoff kind:

- **Continuity:** the same owner continues in another session, process, tool,
  location, or operating context. Responsibility does not transfer.
- **Transfer:** one identifiable human, agent, team, or other Actor is proposed
  as successor for the exact bounded Responsibility.
- **Dispatch:** a service or executor receives an input or performs an action
  while the current owner retains Responsibility. Dispatch becomes Transfer
  only when a governing contract makes that service an identifiable responsible
  Actor able to accept the exact contract.

Identify the successor by an unambiguous Actor reference and verify the
recipient response route that can carry the exact offer and response. Capability, delivery,
silence, prior collaboration, assignment, or a new session does not constitute
acceptance. A broad team label is insufficient unless its accepted operating
contract identifies the responsible role and response mechanism.

If there is no identifiable successor or recipient response route, enter visible Degraded
mode. Materialize a portable proposed Handoff when a safe persistence or inline
path exists, keep the outgoing owner responsible, and state who must identify
the recipient or route before Transfer can occur. If no reliable return route
exists for Continuity, expose the package inline and state that resumption is
manual and unverified.

**Done when:** the Handoff kind, exact boundary, proposed successor or same
owner, recipient response route, acceptance requirement, and degraded behavior are
explicit.

### 3. Materialize one exact Handoff revision

Read and use the [core Handoff contract](references/handoff-contract-template.md),
compressed only when every material field remains explicit. After classifying
the kind, read only its branch in the
[Handoff dispositions](references/handoff-dispositions.md). Store the result through
the selected canonical Adapter after a Persistence boundary. A bounded Inline
continuation may remain in the response when no material state must survive it.

Reference canonical Specifications, plans, decisions, records, messages,
results, and evidence by locator and exact revision. Summarize only the minimum
pickup context that a successor needs; the Handoff is an interface contract,
not a second writable authority. Include only suggested companion capabilities
that the continuation actually needs, and describe an unavailable capability
as a gap rather than implying it is installed.

Preserve necessary Actor references while minimizing sensitive data. Remove
credentials, secrets, access tokens, and personal data that the successor does
not need. Point to an authorized protected source instead of copying sensitive
content into a broader channel.

Create a new Handoff revision after any material change to state,
Responsibility, Authority, assumptions, dependencies, evidence, Continuation,
or frontier. Earlier delivery or acceptance cannot authorize the changed
revision.

**Done when:** the contract has one exact revision and locator or Inline
identity, every canonical reference names its revision, uncertainty is marked,
and the first safe next action is explicit.

### 4. Deliver or preserve the continuation

Before an external delivery, verify Authority for the recipient, channel,
content, privacy boundary, and effect. Send or expose the exact Handoff revision
through the verified recipient response route and record delivery evidence separately from
acceptance. If delivery is not authorized, return the ready offer and its exact
send action to the current owner.

For waiting work, retain the current owner and bind the complete canonical
Continuation record. When the companion `'Workflow'` skill is installed, use
its [Continuation contract](../workflow/references/continuation-template.md).
Otherwise preserve the equivalent standalone projection in the core Handoff
contract. A scheduled action or service receipt is an execution result, not
Responsibility or completion.

If durable persistence, communication, scheduling, or another required
capability is unavailable, preserve the exact package and allowed safe work in
the best authorized medium, name the missing guarantee, and record the unblock
condition and resumption action. Do not claim a write, delivery, monitor, or
future wake-up that the environment cannot verify.

**Done when:** the exact locator or Inline package is present, delivery evidence
or an explicit `not delivered` state is recorded, and the resumption mechanism
is verified or its missing capability and manual trigger are named.

### 5. Gate Transfer on exact acceptance

Transfer requires the proposed successor to accept the exact Handoff revision,
bounded Responsibility, available Authority, known uncertainty, dependencies,
Continuation, and first next action. Verify that the response comes from the
identified successor or its authorized mechanism and that any conditions fit
the offered contract. Acceptance cannot create or widen Authority.

Immediately before recording Transfer, reread the canonical work and compare
its current revisions, state, owner, approvals, evidence, dependencies,
Continuation, and frontier with the offered Handoff. A mismatch makes the offer
stale. Preserve the response as evidence, refresh the Handoff, and request
acceptance of the successor revision.

Apply the Transfer, rejection, stale, and Degraded rules in the
[Handoff dispositions](references/handoff-dispositions.md). Record an accepted
Transfer as an append-only Responsibility transition. Record an Outcome
ownership transition only when the exact accepted scope is the parent Outcome.
Rejection, silence, unreachable recipient, conditional acceptance that changes
the contract, or stale context leaves the outgoing owner responsible.

Continuity does not use a Responsibility transition. On pickup, the same owner
rereads the canonical work, checks the Handoff for staleness, records the
resumption evidence when Durable, and continues only from the current state.

**Done when:** Transfer has exact accepted-transition evidence or a named
non-transfer disposition with current owner and next action; Continuity has a
verified current pickup point; Dispatch has exact delivery evidence and its
retained owner.

### 6. Return Handoff state to Workflow

Return the Handoff identity, exact revision and locator, kind, delivery state,
acceptance or pickup evidence, current responsible owner, operational mode,
staleness result, unresolved gaps, and exact next action. Return only bounded
Handoff evidence; Workflow owns integration, Review routing, recovery,
continued execution, and parent terminal proof.

This invocation returns when one exact Handoff revision, its current
kind-specific disposition, current responsible owner, unresolved gap, and next
action are recorded and returned to Workflow or the caller. Accepted Transfer
ends the outgoing owner's Responsibility for the accepted scope without
completing the Outcome. Every other Transfer disposition retains that
Responsibility. The parent Outcome stays open in every Handoff disposition.
