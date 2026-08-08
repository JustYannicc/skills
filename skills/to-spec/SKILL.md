---
name: to-spec
description: Turn an accepted Outcome contract into a clear Specification artifact for downstream work, revise it after a material change, or surface the material gaps blocking a requested Specification.
---

# To Spec

Materialize one accepted Outcome contract as one exact Specification artifact. Preserve the Outcome's vocabulary and accepted meaning.

Join the active context supplied by `'Workflow'`. The Outcome owner retains parent Responsibility; this skill owns only the Specification result.

This phase synthesizes accepted decisions. Discovery owns missing knowledge or decisions, `'Workflow'` owns coordination, and downstream skills own decomposition, Implementation, and Review.

## Process

### 1. Bind the accepted Outcome

Read the exact accepted Outcome contract, discovery results, governing sources, Outcome owner, Work owner, Approver, Authority, current Specification revision, representation mode, and requested Proof seam.

Classify each material input as fact, assumption, inference, decision, unknown, or exception. Preserve its status, source, revision when available, and confidence. Missing Authority is an unknown, not an exception. Keep Constraints distinct from Preferences and effect Authority distinct from an execution request. In the Constraints table, use only Hard Constraint, Soft Constraint, or Preference.

**Done when:** one accepted Outcome source and one bounded Specification result are explicit, every material input is classified, and any missing prerequisite is visible.

### 2. Compose the Specification artifact

Use the [Outcome Specification template](references/outcome-specification-template.md#core-template). Complete every core section from accepted inputs. Keep accepted behavior observable at the Outcome boundary, and prefer one existing highest stable Proof seam that can show the Outcome condition.

Required remediation, propagation, and recovery remain inside the Outcome. Return an accepted optional improvement to `'Workflow'` as a related Outcome.

**Done when:** every core template field contains accepted meaning or a named material gap, and another Actor can use the artifact without inventing scope, Authority, behavior, proof, or a terminal condition.

### 3. Apply only the matching branch

- For an Outcome that preserves a condition or recurs, complete the [Operating Outcome branch](references/outcome-specification-template.md#operating-outcome). Populate every field from accepted inputs; represent any other required field as a named gap returned to `'Workflow'`.
- For a material change, complete the [revision-impact branch](references/outcome-specification-template.md#material-revision). Bind the prior and successor revisions, invalidate only affected Tickets, dependencies, completed work, approvals, evidence, effects, current-state records, and legacy state, and preserve unaffected accepted work.
- For each material gap, complete the [discovery-gap branch](references/outcome-specification-template.md#discovery-gap). Classify the uncertainty, record the smallest evidence request, blocking status, Responsibility, and resumption action, then return it to `'Workflow'` for canonical discovery routing. Discovery remains outside this skill. When the selected capability is unavailable, preserve the same gap and resumption contract in Degraded mode. For accepted irreducible uncertainty, complete the [irreducible-fog branch](references/outcome-specification-template.md#irreducible-fog) with its threshold, safe mode, feedback, and recovery rule.

**Configured Supplemental skills:** At the `specification-enrichment` Extension point, request any configured Supplemental skill through `'Workflow'` after the first complete artifact revision exists and before acceptance. Supply the accepted Outcome source, exact artifact revision, and the configured concern.

Record returned evidence with its exact source and disposition, integrate only accepted meaning, then rerun the core completion check. The Supplemental skill enriches the artifact; this skill retains the Specification result and acceptance boundary.

An unavailable advisory Supplemental skill is visible but non-blocking. An unavailable required Supplemental skill becomes a named gap with Responsibility and an exact resumption action.

**Done when:** every applicable branch is complete and every material gap has one owner, route, smallest evidence request, blocking status, and exact resumption action.

### 4. Bind representation, revision, and acceptance

In Inline mode, keep the artifact in the transient conversation representation. In Durable mode, write through the selected canonical Adapter and record its locator and exact revision. If persistence is unavailable, preserve the complete artifact and continuation without claiming a Durable result.

An exact faithful representation of an accepted semantic contract is **Accepted** when its source revision is bound, it adds no material judgment, and the Approver's Authority covers that representation. Use **Proposed** when the artifact adds a material interpretation or awaits acceptance; the Specification phase then remains active. Use **Waiting for discovery** for an assigned blocking gap and **Operating under fog** only for an exact accepted fog rule.

**Done when:** one canonical or Inline artifact has an exact revision and truthful state, with acceptance evidence or the next acceptance action explicit.

### 5. Return the bounded result

Return the exact Specification revision, representation mode, acceptance state, unresolved exceptions, branch records, Responsibility, Authority, Proof seam, terminal condition, and next route to the Outcome owner. `'Workflow'` coordinates the downstream route; the Outcome owner retains integration and parent terminal-proof Responsibility.

**Done when:** the Outcome owner can identify the exact artifact, its state, every remaining Responsibility, and the next route without reconstructing context.

## Completion

This invocation is complete when the exact Specification artifact is Accepted, or every material gap has returned to its owning discovery, approval, or external-dependency route with Responsibility and resumption state preserved. A Proposed artifact is a valid intermediate return while the Specification phase remains active. No Specification return completes the parent Outcome.
