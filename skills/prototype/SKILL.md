---
name: prototype
description: Answer one material design question with a reversible prototype in a technical, personal, organizational, physical, communicative, or agent domain. Use when a design is uncertain and a disposable experiment can produce decision-relevant evidence before specification or implementation.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Prototype

Use one reversible experiment to answer one material design question. The
prototype is a discovery result: it returns a verdict and evidence to the
active `'Workflow'` skill or caller. It does not create the Outcome
Specification, decompose Tickets, implement the selected design, or complete
the parent Outcome.

## Run the experiment

1. **Name the question.** Turn the request into one sentence that could change
   the next design decision. State the affected Outcome, scope, Actors,
   constraints, assumptions, and the one observation seam that can discriminate
   between the live alternatives. If there is no material question, ask one
   smallest discriminating question and stop with the work waiting for that
   answer.

   Complete this step when a reader can tell what answer would change and what
   remains outside the experiment. Do not combine independent questions into a
   feature list.

2. **Choose the smallest reversible setup.** Read the branch guidance in
   [Experiment patterns](references/experiment-patterns.md), then select the
   least costly setup that can expose the seam. Keep it disposable from day
   one: use memory, a scratch adapter, a private rehearsal, a simulator, a
   stub, or a bounded low-risk pilot. Name the reset/disposal action and the
   person with authority to stop it. Reuse the host's conventions when they
   make the experiment runnable; do not create a production integration just
   to learn.

   A prototype may run in a technical, personal, organizational, physical,
   communicative, or agent environment. The domain changes the setup, not the
   contract or the reversible boundary.

   Complete this step when the setup can be started, stopped, and disposed of
   within the stated authority without changing the production system or
   creating an unaccepted commitment.

3. **Set the observation and stopping rules.** Define the baseline or comparison,
   signals and counter-signals, the evidence source, and the observation window
   needed for the mechanism to show a result. Choose the window from the
   expected evidence delay; never import a fixed duration without a reason.
   Stop when the question is answered, the evidence is no longer decision-
   relevant, the safety boundary is threatened, or the setup cannot produce
   trustworthy evidence. A failed or inconclusive run is evidence, not a
   reason to widen scope silently.

   Complete this step when another person can tell what would count as enough,
   what would trigger a pause, and when the run ends.

4. **Run only the bounded experiment.** Exercise the setup at the observation
   seam, record the relevant state before and after each meaningful action, and
   preserve the exact result revision and evidence location. Return the
   disposable artifact and verdict with a pointer to the evidence channel; the
   active `'Workflow'` skill or caller decides whether its Adapter must persist
   that primary source at a persistence boundary. Keep bounded inline work in
   the conversation. Git, a tracker, and a particular host are optional. Keep
   external effects disabled. A pilot must be non-production or an explicitly
   accepted isolated boundary with its own effect gate; never use live
   production execution to learn. If a required
   capability, authority, fact, or safe reset is missing, enter visible
   Degraded mode: preserve the setup and evidence, stop the experiment, and
   return the gap to the active `'Workflow'` skill or caller rather than
   improvising an unsafe equivalent.

   An irreversible or costly-to-reverse production action is not a prototype.
   Do not delete, publish, deploy, contact, change policy, expose a person to
   material risk, or alter live records as part of this skill. If the question
   can be answered by a faithful simulation or rehearsal, use that; otherwise
   return a blocked verdict with the missing authority, stronger pre-effect
   proof, and exact next decision needed by the active `'Workflow'` skill or
   caller.

   Complete this step when the observation seam has been exercised (or the
   safe boundary has stopped it), with evidence tied to the result revision.

5. **Return one verdict and disposition.** Report the contract below, using
   `blocked` or `inconclusive` when the setup did not answer the question.
   Recommend one disposition—retain the validated decision, replace it with a
   named alternative, discard the idea, pause for a named dependency, or run
   one separately authorized follow-up. Return unresolved uncertainty,
   safety/authority gaps, and evidence limits to the active `'Workflow'` skill
   or caller; do not continue into Specification, decomposition,
   implementation, Review, or parent completion.

   The run is complete only when every field is present, the disposition is
   explicit, the evidence is revision-bound, and the return responsibility is
   named.

## Result contract

```text
Question: one material design question.
Context: affected Outcome, scope, Actors, constraints, and assumptions.
Reversible setup: scope, actors, reset/disposal, and stop authority.
Observation seam: what was observed, compared, and why it answers the question.
Evidence: condition and method, observer/time, measurements or observations, source/location, result revision, and limits.
Stopping rule: the threshold, event, or evidence delay that ended the run.
Verdict: retain, reject, inconclusive, or blocked—with the answer to the question.
Disposition: retain/replace/discard/pause/one bounded follow-up, with owner and next action.
Return route: the exact evidence and unresolved decision the active Workflow or caller receives.
```

The result is useful even when no experiment ran: preserve the named question,
missing safe prerequisite, and resumption condition instead of claiming a
verdict or a completed Outcome.
