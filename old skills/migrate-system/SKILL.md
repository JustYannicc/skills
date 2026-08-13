---
name: migrate-system
description: Adopt an existing operating scope into Workflow by recording and verifying its actual current state. Use when the user requests durable adoption or when Durable Workflow work materially depends on an existing scope without a trustworthy current-state representation.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Migrate System

Adopt one existing scope by recording and verifying its actual current state through ordinary `'Workflow'`. This skill owns one bounded mapping result. The Outcome owner retains parent Responsibility, integration, and terminal proof.

When the declared sources, Authority, and Adapter capabilities are sufficient, perform the bounded mapping and Review in this invocation. Do not return a plan or promise to map later. Use waiting only for a real missing input, Authority, capability, or inconclusive proof seam.

Conformance migration changes representation and coordination state. Existing artifacts, work, behavior, policy, environment, ownership, and interfaces remain as observed. Return every proposed repair or redesign to Workflow as separate work.

## Map the current state

### 1. Join Workflow and test admission

Bind the active Workflow context: parent Outcome identity and owner, current phase, accepted scope and Authority, selected Adapter and its `Baseline`, `Coordination`, and `Continuation` capabilities, exact current revisions, Proof seam, and return route.

Record each capability as available, unavailable, or unknown from inspected evidence. An omitted or uninspected capability is unknown, never implicitly available. Do not substitute the current agent host's capabilities for the selected Adapter or declared operating environment.

Run Conformance migration when all of these are true:

- an existing operating scope is material to the accepted Outcome;
- the work is Durable or the user explicitly requests durable adoption; and
- no current verified representation is trustworthy enough for the affected work, Authority, Responsibility, interfaces, or proof.

A current verified map at the applicable revision returns directly to ordinary Workflow. Bounded Inline work does not create migration ceremony. Replacing the canonical Adapter is Canonical migration owned by Workflow, not this skill. Repairing or redesigning an already represented scope is ordinary work.

**Done when:** exactly one active Workflow context and one Conformance-migration need are bound, or the request has returned to the correct non-migration route.

### 2. Bound the material mapping contract

Start with the smallest scope whose current reality can change correctness, Authority, Responsibility, risk, interfaces, waiting, or proof for the parent Outcome. Name the System of interest, included and excluded conditions, Containing System, material Subsystems, Upstream Systems, Dependent Systems, Peer Systems, other relationships, and explicit non-ownership. Broader independent mapping may continue without blocking only when its gaps cannot change the affected result.

Name the migration Work owner, accepted mapping Authority, writable canonical sources, derived views, source-access limits, and visible completion Proof seam.

**Done when:** the affected boundary, exclusions, coverage claim, owner, Authority, Adapter capabilities, and verification seam are explicit enough to prevent accidental exhaustive inventory or represented-System changes.

### 3. Inventory sources and record observed reality

Inspect authoritative records, current operating artifacts, Actor statements, and direct observations. Use the [source and provenance checklist](references/current-state-mapping.md#source-and-provenance-checklist) and [coverage checklist](references/current-state-mapping.md#coverage-checklist) to inspect and update the ordinary canonical records through the selected Adapter. Render only a source-linked derived Map.

Map existing meanings to the universal contract while retaining their original labels and provenance. A real conflict remains a conflict. An ownerless duty, ambiguous Authority, stale source, or unsupported relationship remains visible; mapping never assigns or resolves it by inference.

For a Durable System, preserve the accepted System Record boundary: one human-readable canonical authority, one semantic relationship index, and only read-only generated projections. A missing structural validator or action guard leaves the record readable but blocks machine transitions, projections, and effects.

**Done when:** every material current-state claim is source-bound, every required mapping dimension is represented or visibly unknown, and no derived view or crosswalk has become a second writable authority.

### 4. Delegate independent mapping and integrate it

When delegation is useful, create one bounded child mapping contract per independent area using the [delegated mapping packet](references/current-state-mapping.md#delegated-mapping-packet). Run child work concurrently only when the packet establishes independent boundaries. On return, the migration owner applies the packet's freshness, Review, reconciliation, and Recovery rules before integrating child Evidence.

**Done when:** every delegated area is integrated, waiting, or in Recovery with an owner, and one migration owner can account for the complete affected scope without treating child completion as whole-map proof.

### 5. Route fog, capability gaps, and discovered changes

Send persistent, multi-session, or irreducible Fog of war to the `'Wayfinder'` skill with its exact sources, boundary, blocked decision, owner, risk, and return route. Integrate its operating strategy and current decision frontier; do not guess the fog away. If Wayfinder or another required capability is unavailable, enter visible Degraded mode and preserve the same gap, allowed safe work, unblock condition, next check, and exact resumption or accepted-handoff action.

If `Baseline` persistence is unavailable, use an authorized conforming fallback or preserve the complete proposed state and continuation without claiming a canonical or completed migration. Unsupported scheduling never becomes a claim of monitoring. A short wait may be observed directly. A longer wait requires an accepted scheduler or monitor; when neither is available, invoke the `'Handoff'` skill and require an accepting Actor plus the exact next check. If a handoff is unavailable or unaccepted, preserve visible Degraded waiting without claiming durable resumption. Every waiting route retains its Continuation record and current owner.

Record every discovered change to the represented product, organization, routine, environment, policy, behavior, ownership, or interface as a separate proposal linked to its evidence. Return it to ordinary Workflow for discovery, Specification, decomposition, implementation, Review, effects, and legacy treatment. Creating canonical coordination records and the pointers needed to discover them is migration work; changing what those records describe is not.

**Done when:** each material fog item, capability gap, wait, and discovered change has a truthful owner, state, route, and resumption condition without a hidden effect on the represented scope.

### 6. Verify the integrated revision and return it

Apply the [verification gate](references/current-state-mapping.md#verification-gate) to the exact integrated revision. Validate the recorded delegation reconciliation rather than repeating the child mapping work.

Submit the exact integrated revision to Review through Workflow. Resolve `Changes required`; an `Inconclusive` verdict enters owned waiting with the missing evidence and exact next check. A `Verified` verdict proves the bounded map only when remaining unknowns cannot silently change current correctness, Authority, Responsibility, risk, interface behavior, or proof, or when accepted persistent fog is governed by an explicit operating strategy.

Return the [bounded navigation packet](references/current-state-mapping.md#return-packet) to the Outcome owner.

**Done when:** the materially affected operating scope is canonically represented and verified well enough for ordinary Workflow to proceed.

If a blocker prevents that gate, preserve it in truthful waiting, Recovery, Degraded mode, or accepted handoff and return the non-terminal state to Workflow. Migration remains active.

## Completion

This invocation completes only at the bounded current-state mapping boundary. An owned waiting, Recovery, Degraded, or handoff return may end the current invocation while the migration phase remains active; it does not satisfy the map completion criterion. It does not complete the parent Outcome, approve a discovered change, repair the represented System, redesign it, transfer parent Responsibility, or prove a later real-world effect. Workflow resumes from the returned exact revision and retains the parent terminal condition.
