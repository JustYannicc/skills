---
name: to-spec
description: Synthesize accepted knowledge and decisions into an Outcome Specification before downstream work, or revise one after a material change.
---

# To Spec

`to-spec` turns accepted context into one universal Outcome Specification at
the highest stable proof seam.

Join the active context supplied by `'Workflow'`. The Outcome owner keeps
parent responsibility; this skill owns only the Specification result. A direct
phase request without that context returns its minimum prerequisite gap to the
caller. An accepted Inline context supplied by the caller remains a valid
semantic Specification; no parent Outcome or second workflow is created.

Do not interview the user or turn this phase into decomposition, implementation,
Review, effect execution, or parent completion. Use accepted knowledge and
decisions already present. A material gap is a routing result, not an invitation
to guess.

## Process

### 1. Join and bound the Outcome

Read the active Outcome, prior discovery findings, accepted decisions,
authority, current Specification revision, and requested proof seam. Keep the
project, organization, routine, communication, physical setting, or agent
environment in its own vocabulary; do not translate it into software forms.

Classify each input as an accepted fact, assumption, inference, decision,
unknown, or exception. Record source and confidence; missing material
provenance remains an unresolved gap.
Distinguish an optional preference from a constraint, and an execution request
from authority to create an effect.

**Done when:** one Outcome context and one bounded Specification result are
explicit, with no recursive parent workflow and no unlabelled input.

### 2. Check the contract before writing

Use the [Outcome Specification contract](references/outcome-specification-contract.md)
and its **Required fields** table as the sole checklist. It defines the Outcome,
scope, exclusions, Constraints, responsibility, Authority, accepted decisions,
unresolved exceptions, proof seam, and terminal condition without choosing a
serialization.

Add an observation horizon, review cadence, transfer rule, or cancellation
condition when the Outcome preserves a condition or recurs. Treat required
remediation, propagation, and recovery as in scope; an explicitly out-of-scope
improvement can be returned to `'Workflow'` as a related Outcome.

Prefer one existing high seam over several new seams. A seam may be a visible
conversation result, a decision record, a physical or organizational effect, or
a technical interface. “Run tests” is not a universal proof seam.

**Done when:** every required field has an accepted value or a named unresolved
item, and the proposed proof and terminal conditions are observable without
inventing authority, scope, or implementation.

### 3. Synthesize one revision

Render one complete semantic Specification in the contract's field order. Keep
accepted decisions separate from assumptions and inferences, and preserve the
domain's own vocabulary. The contract is the source for field detail; this phase
adds no software-only form unless the accepted context explicitly needs it.

If a prior Specification exists, compare the accepted context with its exact
revision. A material change creates a new Specification revision and an impact
note naming affected Tickets, dependencies, completed work, approvals, evidence,
effects, current-state records, or legacy state; unaffected work remains valid. Never
attach a verdict or approval to “the latest” without an exact revision.

**Done when:** one current Specification revision is synthesized or identified,
its fields are complete or visibly unresolved, and any change impact is
recorded against the prior revision without erasing revision history.

### 4. Route material gaps instead of inventing decisions

Use the uncertainty, not the topic, to select the next discovery capability:

| Missing material item | Route |
| --- | --- |
| Conflicting or undefined terminology | `'domain-modeling'` skill |
| A decision held by the current user | `'batch-grill-me'` skill |
| Knowledge held by another person | `'to-questionnaire'` skill |
| Missing approval or effect authority | active `'Workflow'` approval/waiting route |
| Persistent, multi-session, or irreducible fog | `'wayfinder'` skill |
| An external fact or source | `'research'` skill |
| An empirical design question | `'prototype'` skill |

Use the contract's **Discovery return contract** for every gap: preserve the
missing fact or decision, impact and whether it blocks acceptance, selected
capability, smallest question or evidence request, responsible owner and
Approver, and exact resumption action.
Return the route to the active `'Workflow'` context or direct caller. `'Workflow'`
may invoke a companion only when that host confirms the capability. Otherwise
enter visible Degraded mode and
preserve the gap for waiting, installation, recovery, or an accepted handoff.
Irreducible fog may continue only as an explicit operating rule accepted by the
proper Approver, with the contract's threshold, safe mode, feedback, and
recovery fields recorded.

**Done when:** every material unresolved item is routed to the correct
capability, returned to Workflow for approval or external waiting with a
Continuation, preserved in a Degraded continuation, or governed by an accepted
operating rule; none is silently filled with an assumption.

### 5. Honor proportional representation

Use the Inline or Durable mode selected by `'Workflow'` or the active host. In
Inline mode before a Persistence boundary, when the accepted request itself is
a sufficient semantic Specification, keep it in the conversation; do not create
a file or tracker record merely to make the phase look durable.

In Durable mode after a session, actor, waiting period, approval, assignment,
multi-phase, or meaningful-risk boundary—or on explicit request—write through
the selected canonical Adapter, retain one writable source, and record the
Adapter's locator and exact revision when it provides them. Do not choose a
serialization, tracker, database, TOML shape, or other System representation;
that representation belongs to the selected Adapter and its governing design.

If the selected Adapter is unavailable, state the capability gap and preserve
the Specification for a safe equivalent or accepted handoff only when that
alternative satisfies the same contract. Never claim durable persistence that
did not occur.

**Done when:** the selected Inline or Durable mode is honored, one canonical
representation or the transient conversation carries the Specification, or an
explicit Degraded/Waiting continuation preserves it; no representation decision
is smuggled into the phase.

### 6. Return for acceptance and downstream work

Return the exact Specification revision to the Outcome owner with its
representation mode, unresolved exceptions, revision impact, and the contract's
responsibility, Authority, proof, and terminal fields. An identifiable Approver
accepts intent and material trade-offs; low-risk Inline detail may be accepted
within delegated Authority. Keep a pending approval in Proposed; use Waiting
for discovery for an assigned gap or external dependency with its Continuation.
An accepted fog rule uses Operating under fog.

The active `'Workflow'` context or direct caller receives the result for
downstream decomposition, execution, and Review. This phase's return boundary
is explicit; the parent Outcome's terminal condition remains with that caller.

**Done when:** the return package has one Specification in its canonical state
and every remaining responsibility and next route is explicit; terminal status
still follows the Completion criterion below.

## Completion

This skill is complete only when the Specification is accepted by its proper
Approver, or every material unresolved item has been returned to its owning
discovery, approval, or external-dependency route, or governed by a Degraded
continuation with responsibility and resumption state preserved. A draft,
persistence attempt, delegation, approval request, or downstream Ticket is not
completion.
