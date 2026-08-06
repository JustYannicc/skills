---
name: review
description: Review an exact result against its accepted Specification and governing standards at the Proof seam. Use when submitted work needs a revision-bound verdict, changed or missing evidence could invalidate completion, or configured Supplemental reviewers must contribute specialist evidence.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Review

Review independently verifies one exact result and returns one integrated verdict. The Reviewer owns that verdict; the Work owner owns correction and effect work; the Outcome owner owns parent integration and completion.

Join the active `'Workflow'` context when one exists. Inline work may keep its exact contract in the conversation. Durable work names its canonical records and revisions.

## Procedure

1. **Admit and pin the target.** Require an accepted Specification and a submitted result. A rough idea without either belongs in Workflow discovery or Specification, so preserve it and return without a Review verdict. Once a target is admitted, bind every observation to `(Specification revision, result revision, governing-standards revisions, Proof seam)`, plus the effect-evidence identity and effective Supplemental configuration. Record the Reviewer, Work owner, Outcome owner, and Approver when applicable. Complete this step when the target is immutable and every missing Material input has an owner; an admitted target with an unresolved identity or input is **Inconclusive**.

2. **Set proportional depth, independence, and evidence bounds.** Classify the target from its Authority, reversibility, external effects, scope, uncertainty, legacy impact, and parent-completion consequence:

   - **Inline:** bounded, reversible work with an obvious Proof seam; one Actor may hold several explicit roles after a fresh pass over the accepted criteria.
   - **Standard:** Durable, delegated, changed, or Materially uncertain work; use a separate Reviewer where available and inspect every requirement, dependency, and recovery path.
   - **High:** consequential, irreversible, broad, rights- or safety-sensitive, or Authority-changing work; require an independent Reviewer and the deterministic, human, or specialist evidence named by the governing contract.

   Declare a risk-based evidence matrix covering each Materially distinct requirement, standard, interaction, operating condition, and recovery path. Include representative normal and degraded paths at minimum; add combinations only when they change behavior, risk, Authority, or evidence, or when a finding exposes another Material boundary. Stop when every Material item has exact evidence and further combinations would be equivalent, and record that rationale. Inline and one-time work omit lenses that are not Material.

   Preflight every effective Supplemental mapping before expensive core inspection. If a required mapping is unavailable or invalid, record the owned dependency and return Inconclusive without discretionary review work. When a mapped review and core inspection are independent, dispatch them concurrently and join their evidence in step 5. Complete this step when the chosen depth, independence, evidence matrix, stopping rationale, sources, mapping status, and unavailable capabilities are visible.

3. **Review two axes.** Keep **Specification** and **Standards** evidence separate so success on one cannot hide failure on the other. Apply the [review lenses](#review-lenses) to every applicable requirement and rule. Record each as pass, fail, or unknown and resolve any precedence conflict from the accepted Authority; a Material unresolved conflict is Inconclusive. Complete this step when every applicable item has exact evidence or an owned gap.

4. **Show how the result works.** Exercise or inspect the result at the Proof seam, not only its internal representation. Give a compact walkthrough from trigger or input through the decisive behavior and state changes to the visible output or effect, including a Material degraded or recovery path. Use representative evidence anchors and retain Evidence references to the complete exact record; the walkthrough never substitutes for full evidence. Complete this step when a reader can understand the result and trace every claim without reconstructing the review.

5. **Integrate configured Supplemental reviewers.** Apply the governed [`supplemental-review` Extension point](#supplemental-reviewers). Join any concurrently collected evidence, validate it, and integrate valid findings into the two axes while the Reviewer retains the verdict. Complete this step when every applicable mapping is accounted for as `integrated`, `advisory unavailable`, `required blocked`, or `not configured`.

6. **Separate result, approval, effect, and Outcome.** Record distinctly whether the result was prepared, whether it satisfies its Specification and standards, whether an Approver authorized the exact revision and effect, and whether the real effect occurred and advanced the Outcome. A result-level Proof seam may be Verified before a separately governed effect; an effect-level or parent seam requires matching approval and real-effect evidence. Complete this step when no claim borrows evidence from another boundary.

7. **Return one verdict and Responsibility.** Recheck the exact tuple, choose one [verdict](#verdicts-and-findings), and apply only its target transition. Before returning, read and use the [Review record template](references/review-record-template.md), compressed proportionately for Inline work. Return the record to Workflow or the caller. Complete Review when the verdict, evidence, transition, current owner, and next action or pending effect are understandable and exact.

## Review lenses

### Specification axis

Check the accepted Outcome and good-enough threshold, required behavior, non-Outcomes, scope, assumptions, inputs, outputs, state transitions, permissions, interfaces, expected effects, and recovery. Surface missing or partial behavior, unintended scope, and behavior that appears implemented but does not work at the Proof seam.

### Standards axis

Check every named governing standard at its exact version. Apply the following universal quality lenses proportionately even when the result is not software:

- **Interaction quality and feel:** walk every Material human–System and System–System interaction from trigger through feedback and state to visible effect and recovery. Assess clarity, coherence, control, effort and friction, timeliness, accessibility where applicable, trust, and whether the interaction feels calm and intentional rather than surprising or brittle. Ground feel in observable evidence. For a user interface, inspect the rendered interaction—not code or a static screenshot alone—using the declared credible-support matrix: representative Material states, transitions, supported viewport classes, input methods, errors, and recovery. Expand only for a distinct behavior, risk, or finding.
- **Maintainability:** verify that the future responsible Actor can understand, change, operate, support, and recover the result without reconstructing hidden rules. Inspect its source of truth, boundaries, complexity and change surface, dependencies, rationale, Ownership, operating burden, degradation, recovery, and legacy disposition. Scale this lens for one-time work, but keep correction and provenance possible.
- **System fit:** inspect Authority, Actors and handoffs, incentives and friction, operating conditions, deterministic enforcement where required, degradation, recovery, evidence quality, Externalities, and change or legacy propagation.

Passing a static check, producing a polished artifact, or completing a child result is evidence for a claim, not proof of the other axis or the parent Outcome.

## Supplemental reviewers

Use only the effective user-selected mapping declared for the `supplemental-review` Extension point. An installed skill, suggestive name, or apparent expertise does not create a mapping.

Before invocation, validate the mapped skill identity, source and version, applicable scope, `advisory` or `required` status, input contract, expected evidence, and failure behavior. If overlapping mappings lack explicit selection, preserve the ambiguity and return Inconclusive when it is Material.

Send the exact Specification, result, standards, Proof seam, scoped review question, and available effect evidence. Accept Supplemental evidence only when it names the skill and version, method and limitations, exact result revision, observations, and findings.

- Valid findings enrich the applicable axis; they never replace the Specification comparison, Standards comparison, Reviewer, verdict, lifecycle transition, or Ownership.
- Advisory absence, failure, or stale evidence remains a visible limitation while core Review continues.
- Required absence, failure, stale evidence, or invalid return leaves the target Inconclusive with the dependency, owner, unblock condition, exact next check, and resumption action.
- Material conflict remains visible and is resolved from the Specification, governing standards, Authority, and Proof seam; unresolved conflict is Inconclusive.
- No configured mapping means core Review proceeds and states that no Supplemental reviewer was requested.

## Verdicts and findings

| Verdict | Meaning | Transition and Responsibility |
| --- | --- | --- |
| **Verified** | Every applicable Specification requirement and governing standard passes at the accepted Proof seam. Required Supplemental evidence, approval, and real-effect evidence are present when that seam requires them. | `in_review → complete` only for the reviewed target. Return evidence upward; the Outcome owner still integrates and proves the parent Outcome. |
| **Changes required** | The target is reviewable and one or more findings require correction. | `in_review → accepted`. The Work owner owns correction and resubmission; the Outcome owner retains parent Responsibility. |
| **Inconclusive** | A Material identity, input, dependency, approval, required Supplemental result, conflict, or effect observation is missing. | `in_review → waiting`. Record the owner, unblock condition, retry or escalation rule, exact next check, and resumption action. |

Classify findings using the repository-wide meanings:

| Severity | Meaning |
| --- | --- |
| **Critical** | Unsafe Authority or effect, private-data exposure, lost Responsibility or state, or false completion. |
| **Major** | Wrong behavior or route, broken contract, unusable result, missing required capability, or failed installation, recovery, or rollback. |
| **Minor** | Non-blocking clarity, presentation, interaction, or maintainability defect. |

Pair every finding with the violated requirement or standard, exact observation, consequence, and smallest corrective action. Describe contributing conditions without blame.

## Boundary

Review may read, compare, exercise or simulate only where external effects are prevented, and record evidence. It returns findings to the Work owner and integrated evidence to Workflow. Review never performs or authorizes a real effect, even when the same Actor holds another role; that Actor must leave Review and use the separately governed approval and effect route. Review does not edit the submitted result, invoke an undeclared specialist, or complete the parent Outcome.
