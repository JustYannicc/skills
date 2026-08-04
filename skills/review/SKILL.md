---
name: review
description: Verify any exact result against its accepted Specification and governing standards at the agreed proof seam, including code, prose, decisions, designs, configurations, communications, and real-world work. Use when a submitted result needs an independent, risk-scaled verdict, when configured Supplemental findings must be integrated, or when a changed revision, missing evidence, or effect claim needs a truthful Review outcome.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Review

Review is independent verification of one exact result. It owns the verdict
for that result; it does not own implementation, effect execution, or the
parent Outcome. Code is one execution medium among many. Apply the same
contract to a code change, a policy, a message, a physical arrangement, an
organizational decision, an agent configuration, or a plan.

Join the active `'Workflow'` context when one exists. Workflow supplies the
parent Outcome, phase, responsibility, authority, and return route. An
Inline request may carry those fields in the conversation. A Durable request
must name the canonical records and their revisions.

## Entry contract

Accept these inputs before forming a verdict:

- the accepted **Specification revision**, including Outcome, scope, required
  behavior, constraints, authority, and proof seam;
- the submitted **result revision**, identified immutably rather than as
  “latest” or an unbound working copy;
- the **governing standards** and exact versions that apply;
- available **effect evidence**, with an explicit record when an effect has
  not happened or cannot yet be observed; and
- configured **Supplemental findings**, each naming its Extension point,
  source, exact result revision, status (`advisory` or `required`), and
  evidence.

Record the Reviewer, Work owner, Outcome owner, and Approver when applicable.
One actor may hold more than one role for low-risk Inline work, while each
role's decision remains visible. If a material input or identity is absent,
preserve the submitted state and return **Inconclusive** with the missing
item, its owner, and the exact next check. Do not infer a Specification,
revision, authority, or effect.

## Exactness and the proof seam

Bind every observation and finding to the tuple
`(Specification revision, result revision, standards revisions, proof seam)`.
Recheck that tuple before returning the verdict. A material result or
Specification change creates a new review target and invalidates evidence,
approval, or verdicts bound to the prior revision. Re-review the new revision;
do not carry a prior approval forward by recency or similarity.

The proof seam is the human-visible boundary where the accepted behavior and
effect can be evaluated independently of implementation details. Inspect the
result there and trace each material requirement to evidence. Keep these
claims separate:

- the result was prepared or submitted;
- the result satisfies the Specification and standards;
- an Approver authorized the exact revision and effect; and
- the real effect occurred and produced the intended Outcome.

An approved draft, a passing static check, or a child Review is evidence for a
claim, not a substitute for the remaining claims.

## Review procedure

1. **Frame the target.** Load the governing standards named by the caller.
   Restate the accepted Outcome, boundary, non-Outcomes, assumptions,
   authority, proof seam, and exact revision tuple. Surface ambiguity or a
   changed identity before inspecting behavior.

2. **Set proportional depth.** Classify the target from its authority,
   reversibility, external effect, scope, uncertainty, legacy impact, and
   parent-completion consequence:

   - **Inline:** bounded and reversible with an obvious seam. The same actor
     may review after an independent pass over the accepted criteria and
     returns the visible proof in the response.
   - **Standard:** durable, delegated, changed, or materially uncertain work.
     Use a separate Reviewer where available and inspect each requirement,
     assumption, dependency, and recovery path.
   - **High:** consequential, irreversible, broad, rights- or safety-sensitive,
     or authority-changing work. Require an independent Reviewer plus the
     deterministic, specialist, or human evidence needed by the governing
     contract. Approval and effect verification remain separate gates.

   Independence is a risk control, not ceremony. A configured Supplemental
   reviewer can strengthen evidence, but it never becomes the core Reviewer
   or final verdict owner.

3. **Verify the result.** Compare the exact result to every applicable
   Specification requirement and governing standard at the proof seam. Check
   assumptions, boundaries, inputs, outputs, state transitions, permissions,
   interfaces, incentives, degradation, recovery, legacy propagation, and
   measurable Outcome evidence when they are material. Record evidence for
   each claim and classify findings:

   - **Critical:** unsafe authority or effect, private-data exposure, lost
     responsibility or state, or false completion;
   - **Major:** wrong route or behavior, broken contract, unusable result,
     missing required capability, or failed installation/rollback; and
   - **Minor:** a non-blocking clarity or presentation defect.

   Pair each finding with the violated requirement, exact evidence, impact,
   and the smallest corrective action. Failure is evidence about system fit,
   incentives, information, capability, or authority; describe conditions
   without blame.

4. **Integrate Supplemental evidence.** Invoke a configured Supplemental
   skill only at the declared `supplemental-review` Extension point, with the
   exact Specification, result, standards, proof seam, and available effect
   evidence as input. Validate its revision binding and return shape. Integrate
   its findings into the core comparison:

   - an **advisory** Supplemental failure or unavailable capability is recorded
     as a limitation while core Review continues;
   - a **required** Supplemental failure, stale result, or missing evidence
     leaves the target **Inconclusive** and waiting for the named dependency;
   - a Supplemental result may add evidence or findings, but cannot replace
     the Specification comparison, core Reviewer, or lifecycle transition; and
   - conflicting findings remain visible. Resolve them from the governing
     Specification, standards, and proof seam, or return Inconclusive when a
     material conflict cannot be resolved.

   When no Supplemental skill is configured, perform core Review and state
   that no specialist evidence was requested. Do not invent a companion run.

5. **Check effects and approvals.** Identify what the submitted target claims
   to prove. A result-level proof seam may verify a prepared draft or exact
   proposal before its effect; in that case, record the pending effect and do
   not describe it as sent, adopted, or live. An effect-level or parent proof
   seam must verify the exact approval, validity, authority, effect scope, and
   real-effect evidence immediately before completion. Review cannot turn
   preparation into execution. If the target's accepted seam includes an
   effect and that effect has not occurred, its evidence is delayed, or the
   seam cannot yet distinguish the intended Outcome, return Inconclusive with
   the next check; the Work owner remains responsible. Include real-effect
   evidence only when the target's seam requires it and the evidence matches
   the exact tuple.

6. **Return one verdict and lifecycle transition.** Choose exactly one:

   **Verified** — every applicable Specification and standard requirement
   passes at the accepted proof seam. Include required Supplemental findings,
   approval, and real-effect evidence when that target seam requires them; a
   result-level Review may be Verified before a separately governed effect.
   State any pending effect explicitly. Transition `in_review → complete`
   only for the reviewed work's own proof seam. Return the exact evidence
   bundle to Workflow or the caller; the parent Outcome still needs its own
   integrated Review and terminal proof.

   **Changes required** — the result is reviewable but one or more findings
   require correction. Transition `in_review → accepted`. The Work owner
   owns the correction and next submission; the Outcome owner retains parent
   integration and completion responsibility. Preserve the finding evidence
   and invalidate only the affected approval or prior verdict.

   **Inconclusive** — a material input, exact revision, dependency, approval,
   Supplemental requirement, or effect observation is missing or conflicting.
   Transition `in_review → waiting`. Record the missing evidence, dependency,
   responsible owner, unblock condition, retry/escalation or expiry rule,
   exact next check, and resumption action. Waiting preserves responsibility;
   it is not completion.

## Return bundle and boundary

Return a compact, human-readable Review record containing:

1. the exact Specification, result, standards, proof seam, and effect
   evidence identities;
2. Reviewer and other role actors, independence level, and configured
   Supplemental status;
3. requirement-by-requirement evidence and Critical/Major/Minor findings;
4. exactly one verdict with its lifecycle transition and rationale;
5. responsibility after the transition (Work owner, Outcome owner, or waiting
   owner), including the exact next action when not Verified; and
6. approval, exception, legacy-propagation, and unresolved-fog notes that
   affect the reviewed seam.

Review may read, compare, simulate, and record evidence. It returns findings
to the Work owner and integrated evidence to Workflow. It does not edit the
submitted result, perform a real effect, authorize an effect outside its
Reviewer role, run an undeclared specialist, or complete the parent Outcome.

### Good and bad seams

Good: a code patch, a volunteer rota, and a customer message each name their
Specification and exact result revision; Review checks the same proof seam,
records a verdict, and returns responsibility to the owner.

Bad: “the tests passed, so the feature is approved,” or “the specialist said
it was fine, so Review is complete.” Those statements collapse result proof,
approval, effect evidence, or parent completion into one unbound claim.
