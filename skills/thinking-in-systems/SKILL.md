---
name: thinking-in-systems
description: Apply systems thinking when interpreting, deciding, preparing, or acting; when designing, changing, recovering, or retiring a technical, personal, organizational, physical, or agent system; or when another skill needs governing judgment about intent, boundaries, authority, incentives, friction, evidence, degradation, recovery, or legacy impact.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Thinking in Systems

Supply the universal systems method and governing invariants at each relevant judgment seam. Apply it proportionately: a bounded reversible request stays lightweight, while durable or consequential work receives the clauses its risks require.

This skill owns governing knowledge. Workflow owns phase selection, coordination, parent responsibility, and terminal completion; specialist skills own their phase results. Return a bounded governance assessment to the active Workflow or caller instead of taking over either job.

## Apply the governing lens

1. Classify the interaction as a bounded direct operation, an instance of an accepted contract, a new durable system, a material change, or recovery/remediation. This is complete when the branch and persistence need are explicit.
2. Establish the door: preserve the original request, identify intent and accepted outcome, set the good-enough threshold and boundary, separate facts from assumptions and unknowns, and expose authority and proof. This is complete when materially different interpretations cannot change the authorized result; otherwise return the smallest discriminating question as a gap.
3. Inspect the seams relevant to the branch: actors, authoritative state, inputs and outputs, handoffs, incentives, friction, environment, permissions, effects, evidence, degraded behavior, recovery, and affected legacy state. This is complete when every material seam has a governing rule or a visible unresolved gap.
4. Apply the relevant standard clauses at every material judgment. This is complete when each governing constraint names the clause and evidence that supports it without creating a second authority.
5. Return the governing result: accepted interpretation, applicable invariants, unresolved gaps, permitted authority, proof obligations, and change/legacy consequences. This is complete when the caller can proceed or pause without inventing a material rule.

## Scale the branch

For a bounded, reversible operation with obvious proof, keep the execution contract in the response: preserve the source, state any material interpretation, perform only the accepted operation, and show the exact result. A durable record is unnecessary.

For an accepted-contract instance, bind the governing contract and version, surface material assumptions and authority, apply the relevant clauses, and return evidence to the caller.

For a new durable system, material change, or recovery/remediation case, read the applicable standard sections below before returning the governance assessment. Read the [complete approved standard](references/standard.md) only for whole-design conformance, Design Complete judgment, or a cross-cutting risk that cannot be evaluated from the narrower sections. Use the [System Record template](references/system-record-template.md) only when the caller is creating or changing a durable contract; conditional fields earn inclusion through a named consumer or material risk.

When a needed companion capability is unavailable, apply this method directly where its governing contract remains satisfiable. Otherwise identify the missing capability, preserved state, allowed safe work, and exact resumption condition. Never imply that a companion ran.

## Read the authoritative standard precisely

### Frame the judgment

- For outcome, intentionality, proportional branches, or the universal entry check, read [sections 1–3](references/standard.md#1-outcome).
- For constitutional invariants, intervention economics, incentives, friction, authority, or ambient progress, read [section 4](references/standard.md#4-constitutional-rules).
- For assumptions, ambiguity, approval binding, and correction, read [section 5](references/standard.md#5-execution-contract-assumptions-and-ambiguity).

### Design and operate

- For lifecycle, readiness, proof seams, simulation, or Design Complete, read [section 6](references/standard.md#6-system-design-lifecycle).
- For records, authoritative state, interfaces, discovery, or formal model/deterministic boundaries, read [sections 7–8](references/standard.md#7-required-system-record).
- For low-capacity operation, degradation, friction, environment, and recovery, read [section 9](references/standard.md#9-lowest-common-denominator-operation-friction-and-recovery).
- For measurement, learning, decay, and verified reset, read [sections 10–11](references/standard.md#10-measurement-and-learning).

### Change and audit

- For scope change, evidence maturity, remediation, legacy propagation, migration, or retirement, read [section 12](references/standard.md#12-change-and-legacy-propagation).
- For local source-of-truth policy and standard-level acceptance cases, read [sections 13–14](references/standard.md#13-local-source-of-truth-policy-boundary).
- For evidence classes, provenance, and accepted decisions, read [sections 15–16](references/standard.md#15-evidence-used) and [source provenance](references/sources.md).

The installed reference is the complete current authority. A lightweight branch loads only the sections named by its material judgment.

## Informed exceptions

A user with authority may bypass a safeguard. Before applying the exception, state the skipped safeguard, plausible consequence, affected scope and duration, and review or recovery trigger. Respect the informed decision without coercion or shame; keep systems thinking, responsibility, and verification active proportionately.

## Boundary check

Return governing constraints and evidence, then stop. Phase routing, interviews, research, prototypes, specifications, decomposition, implementation, review verdicts, handoffs, migration execution, and parent completion remain with their owning capabilities. If no such capability is active and the requested outcome needs one, name that capability gap without fabricating its result.
