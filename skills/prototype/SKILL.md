---
name: prototype
description: Prototype one material design question with a reversible experiment. Use when trying, simulating, or rehearsing a candidate could produce evidence that changes a design decision before Specification or implementation.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Prototype

A prototype is one reversible experiment that answers one material design question. The question decides its shape.

This skill owns the learning question, reversible boundary, evidence integration, verdict, and disposition. It returns that bounded result to the active `'Workflow'` skill or caller. Specification, decomposition, implementation, Review, live effects, and parent completion remain with their owning phases.

## Run the prototype

1. **State the learning question and decision.** Name one material question whose answer could change one design decision. State the affected Outcome, System of interest and boundary, Actors, Constraints, assumptions, and live alternatives. If the material question is missing, ask the smallest discriminating question and preserve the exact resumption condition.

   Complete this step when a reader can tell which observation would change which decision and what remains outside the experiment.

2. **Choose the smallest reversible experiment.** Read [Experiment patterns](references/experiment-patterns.md) to choose the least costly setup that exposes the Proof seam. Apply the `technical-prototype` Extension point only when Effective configuration maps a user-selected Supplemental skill to that seam for the current scope. Name the experiment's scope, reset or disposal action, stop Authority, and disabled live effects. Keep the setup throwaway from day one and trivial for its intended observer to exercise.

   Complete this step when the experiment can start, stop, reset, or be disposed of inside its Authority without creating an unaccepted commitment or live effect.

3. **Set the evidence and stopping rules.** Define the Proof seam, baseline or comparison where material, evidence source, signals and counter-signals, and observation window. Choose the window from the expected evidence delay. Stop when the question is answered, the evidence cannot answer it, the reversible boundary is threatened, or another increment is not worthwhile.

   Complete this step when another Actor can distinguish enough evidence, inconclusive evidence, and a mandatory stop.

4. **Run the bounded experiment.** Exercise only the accepted setup and preserve the relevant before-and-after state, evidence source, observer and time, exact Result revision, and evidence limits. Integrate returned Supplemental evidence without accepting a widened question, Authority, effect boundary, or completion claim. Keep live effects disabled.

   When a required capability, fact, Authority, reset, or Proof seam is missing, enter visible Degraded mode. Preserve the experiment and evidence, then return the gap and exact resumption condition to the active `'Workflow'` skill or caller. Use a simulation, rehearsal, mock, or isolated trial when it can answer a question about an irreversible or costly-to-reverse effect; otherwise return a blocked verdict before that effect.

   Complete this step when the Proof seam was exercised or the reversible boundary stopped the run, with every evidence claim bound to its Result revision.

5. **Return one verdict and disposition.** State whether the question was answered, inconclusive, or blocked, and give the answer when available. Choose one disposition: retain, revise, discard, pause, or run one separately authorized bounded follow-up. Return the exact evidence and unresolved decision to the active `'Workflow'` skill or caller.

   Complete an exercised experiment only when every result field below is present, the disposition is explicit, and return responsibility is named. A request stopped before setup returns the compact waiting result defined below instead of inventing experiment fields.

## Use the `technical-prototype` Extension point

Use this seam only when Effective configuration maps the user-selected Supplemental skill to `technical-prototype` for the current scope. Name similarity does not create a mapping, and the core Prototype contract remains complete without a Supplemental skill unless Effective configuration marks that capability required.

Give the configured Supplemental skill the learning question and decision, context and Constraints, reversible boundary and disabled effects, Proof seam and stopping rule, required evidence, and return route. Require it to return the exact artifact or Result revision and how it was exercised, observations with sources and limits, reset or disposal state, and unresolved uncertainty.

The Supplemental skill owns only its bounded technical result. Prototype retains the learning question, reversible boundary, evidence integration, verdict, disposition, and completion criterion. The active `'Workflow'` skill retains parent responsibility.

Record an advisory Supplemental failure and continue with another safe pattern only when the core contract remains satisfiable. When a required Supplemental is unavailable before an attempt, enter waiting with preserved state and its availability as the exact resumption condition. When a required attempt fails and needs intervention, enter Recovery with the failed-attempt evidence, preserved state, responsible Actor, and exact resumption condition. Never imply that an unavailable Supplemental skill ran.

## Return the result

- **Learning question:** the one material design question.
- **Decision informed:** the decision the evidence can change.
- **Context:** Outcome, System of interest and boundary, Actors, Constraints, and assumptions.
- **Reversible experiment:** setup, scope, reset or disposal, stop Authority, and disabled effects.
- **Proof seam:** what was observed or compared and why it answers the question.
- **Evidence:** condition and method, observer and time, source, exact Result revision, limits, and integrated Supplemental evidence when present.
- **Stopping rule:** the threshold, event, or evidence delay that ended the run.
- **Verdict:** answered, inconclusive, or blocked, with the answer when available.
- **Disposition:** retain, revise, discard, pause, or one bounded follow-up, with responsible Actor and next action.
- **Return route:** the exact evidence and unresolved decision returned to the active `'Workflow'` skill or caller.

A request blocked before setup returns the learning question, blocked status, pause disposition, missing safe prerequisite, exact resumption condition, and return responsibility. It does not fabricate a setup, exercised Proof seam, evidence, Result revision, completed experiment, or parent Outcome. A run blocked after setup returns every applicable result field and states which seam or evidence remains unexercised.
