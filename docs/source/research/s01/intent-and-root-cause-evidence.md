---
title: "the standard research — intent discovery and root-cause entry check"
status: research input; not a governing specification
date: 2026-08-01
scope: turning a stated request into a safe, outcome-led, solution-neutral the agent work item
---

# the standard research — intent discovery and root-cause entry check

## Decision-useful conclusion

Every request is a **system interaction**, including "draft this email." The user has asked an agent to act; therefore the agent must preserve the original request, distinguish the requested action from the desired progress, make its interpretation inspectable, and obtain the required authority before an external effect.

Do not treat the text of a request as either the whole requirement or as a reason for a long interrogation. The useful intake move is a short **intent ladder**:

| Layer | Question the agent resolves | Example: "Send the organization an email about the results" |
| --- | --- | --- |
| Stated request | What was literally asked? | Send an email to the organization about results. |
| Requested role / operation | What is the agent being asked to do now? | Research context, compose an email, and possibly send it. |
| Proposed solution | Is the requested operation merely one means? | An email may be the means rather than the need. |
| Job / desired progress | What change does the operator want in these circumstances? | The recipient understands the relevant results and the next step is agreed. |
| Success and constraints | How will success be judged; what must not happen? | Correct recipient/results, suitable tone, deadline, privacy, no unintended commitment. |
| Causal issue, if recurring | What condition keeps producing the problem? | Missing result source / recurring handoff gap, rather than a one-off drafting need. |

This applies Jobs-to-Be-Done (JTBD) without pretending that every request is product discovery. JTBD defines a job as progress a person seeks in particular circumstances; its purpose is to look past a product or feature to functional, social, and emotional forces. [Christensen Institute](https://www.christenseninstitute.org/theory/jobs-to-be-done/) Outcome-Driven Innovation (ODI) makes the complementary distinction that a job statement describes what is to be achieved, while desired outcomes state the measurable criteria used to judge success; its desired outcomes are intended to be solution-independent. [Strategyn: template](https://strategyn.com/jobs-to-be-done-template/) [Strategyn: ODI](https://strategyn.com/outcome-driven-innovation/)

The design consequence: the agent should accept a user-chosen means for a one-off when it is clear and authorized, but it must not prematurely custom-build or automate that means. For a system/change request, it should first confirm a solution-neutral outcome, then compare **do nothing, change the environment/process, configure an existing solution, use an existing service, and custom-build** against constraints and opportunity cost.

## Evidence and limits

### Ask about evidence, not hypothetical approval

Rob Fitzpatrick's *The Mom Test* is a practical interview method specifically intended to make conversations yield learning rather than socially flattering validation. The author’s official description frames it as learning from customer conversations even when people give unreliable feedback; the accompanying teacher material explicitly uses exercises that turn bad questions into good ones and scale commitments appropriately. [Official book page](https://www.momtestbook.com/) [Official teacher material](https://www.momtestbook.com/teachers)

For the agent, the transferable rule is not "interview the operator as a customer." It is:

- Prefer concrete context and past/current behaviour: “What result needs to be communicated?” “What has already happened with the recipient?” “What would make this done?”
- Do not ask leading solution-validation questions: “Would an automated email system be useful?” Such questions invite agreement but do not establish a need.
- Where the task is speculative or recurring, ask for the triggering event, currently used workaround, frequency, consequence of inaction, and why the present path is inadequate. These facts test whether a system is warranted.

This squares with the Christensen Institute’s warning that Jobs research is about the story and circumstances underlying a decision, not simply asking someone why they made it. [JTBD theory](https://www.christenseninstitute.org/theory/jobs-to-be-done/)

### Use outcome language before solution selection

ODI’s useful separation is: a job is the objective; desired outcomes are the criteria for doing it well. Strategyn explicitly describes desired outcomes as solution-independent, measurable, controllable, and stable, rather than features. [Outcome-Driven Innovation](https://strategyn.com/outcome-driven-innovation/) This supports a compact the agent test:

> If the proposed tool disappeared, could the agent still state the desired changed condition, the relevant circumstance, and the observable “good enough” criteria?

If not, the request remains solution-bound and the agent should ask one discriminating question before recommending a build, configuration, or automation. The test does **not** invalidate an explicit preference: “I want an email, not a phone call” is a constraint, not an ambiguity to argue away.

### Root-cause analysis is for recurring failures, not a ritual

The Lean Enterprise Institute defines Five Whys as repeated questioning to move beyond an obvious symptom toward an underlying cause; it also says the literal number five is not the point and positions it within a process with problem definition, goals, countermeasures, checks, standards, and follow-up. [Lean Enterprise Institute](https://www.lean.org/lexicon-terms/5-whys/)

the agent should therefore use a **bounded, evidence-linked causal probe** only when the request identifies a repeated failure, a proposed permanent system, or a prior wrong interpretation. It must ask “why/what condition permits this?” only while each answer changes a controllable intervention. A causal branch stops when it reaches one of:

1. a verified, controllable condition to change;
2. an external constraint the agent cannot change but can plan around;
3. an explicitly chosen value/trade-off; or
4. insufficient evidence, which becomes a testable hypothesis rather than a claimed root cause.

Five Whys must not be treated as proof of one ultimate cause. A peer-reviewed critique notes that it can force a single pathway/cause, rely on off-the-cuff deduction instead of observation, and wrongly assume the most distal cause is the best intervention point. [Card, *BMJ Quality & Safety*](https://qualitysafety.bmj.com/content/26/8/671) AHRQ likewise directs incident analysis toward system improvement rather than trying to eliminate human error. [AHRQ investigation guide](https://www.ahrq.gov/patient-safety/settings/hospital/candor/modules/guide4.html) For material or multi-factor failures, the agent should record multiple plausible contributing conditions, evidence for each, and the smallest reversible experiment or corrective action—not an invented single “root cause.”

### Laddering can expose values, but must be gentle and optional

Laddering is a research method associated with means–end theory: it traces how concrete attributes connect to consequences and then personally meaningful values. The canonical article is Reynolds and Gutman, “Laddering Theory, Method, Analysis, and Interpretation” (1988). [Publisher record](https://www.tandfonline.com/doi/abs/10.1080/00218499.1988.12467766) [DOI record](https://doi.org/10.1080/00218499.1988.12467766)

For the agent, use one optional “why does that matter now?” or “what would that enable/protect?” only when a stated goal, priority, or trade-off is unclear and materially changes the choice. Never repeatedly push toward intimate values during an operational request. A user’s stated outcome remains authoritative; a deeper motivation is a proposal to confirm, not a fact the agent has discovered.

## Entry-check contract

### 1. Preserve and classify before interpreting

the agent retains the original text and assigns provisional labels: `stated_request`, `requested_operation`, `proposed_solution`, `outcome/job`, `constraint`, `assumption`, `ambiguity`, and, when applicable, `causal_hypothesis`. Labels are separate from the source text and carry source, timestamp, confidence, and affected work item.

The existing canonical requirement already demands that ambiguous source text, competing interpretations, consequence, smallest discriminating question, owner, status, and affected records remain durable. This entry check gives that rule an intent model rather than an ambiguity taxonomy alone. See the [complete standard](../../THINKING_IN_SYSTEMS_STANDARD.md#5-ambiguity-assumptions-and-correction).

### 2. Infer only inside a pre-authorized, low-consequence envelope

the agent may infer a working intent and proceed to a **proposal** when all of these are true:

- the requested operation is clear enough to compose/retrieve without an irreversible effect;
- a single interpretation is strongly supported by cited durable context or an explicit prior rule;
- competing interpretations do not materially change recipient, commitment, money, privacy, deadline, safety, scope, or external effect;
- it exposes the assumptions in the proposal and links their sources; and
- the workflow’s authority contract permits that proposal stage.

For the email example, the agent may retrieve the likely result source and draft the email if it surfaces: recipient, result set, intended ask/next step, tone, deadline, and source links. **Drafting is not sending.** Approval of the specific draft/effect remains necessary unless an explicit tested authority contract says otherwise.

### 3. Ask when the answer changes the correct action

the agent must create a clarification item and ask the **smallest discriminating question** when any reasonable answer would change:

- the desired outcome or whether the requested means is appropriate;
- an external effect, commitment, recipient, financial/reputational/privacy consequence, deadline, or authority;
- whether to build, buy, configure, change the environment/process, defer, or do nothing;
- the causal intervention for a recurring failure; or
- the confidence or evidence necessary to represent the result truthfully.

It may still do safe preparatory work: preserve capture, retrieve relevant evidence, compose alternatives, identify existing solutions, or state its assumptions. It must not silently choose one material interpretation.

### 4. Cap discovery and preserve unanswered questions

The entry check is complete when the agent has either (a) a solution-neutral outcome plus material constraints, or (b) an explicitly accepted request to perform a bounded operation. It should normally ask **one** smallest discriminating question; it may ask a second only if the answer opens an independent material branch. Then it presents a best-current proposal, marks remaining uncertainty, and defers non-blocking questions to the briefing/clarification queue.

This cap is an operating policy, not a research claim. Its purpose is to avoid converting every request into a burdensome interview while still preventing silent material guesses. It is consistent with clarification-question research: high-quality questions can improve task performance and user satisfaction, whereas low-quality questions can create dissatisfaction. [Clarification-question survey](https://arxiv.org/abs/2305.15933) [TOIS user study](https://piret.info/pubs/2022/TOIS22-CQ) If outcome discovery continues to uncover material uncertainty, the agent should offer a bounded discovery task with its expected value/cost rather than interrogate indefinitely.

## Solution-neutral build/buy/configure/do-nothing check

Run this only for a recurring problem, system change, or custom-build proposal—not for a clear, one-time requested operation. Record:

```text
Outcome/job: [changed condition, circumstance]
Good-enough criteria: [observable success, constraints, deadline]
Evidence: [past/current behaviour, sources, baseline]
Current path and failure/cost: [time, money, attention, risk, maintenance]
Options: do nothing / environment or process change / configure existing / existing service / custom build
Decision: [chosen option] because [criteria and opportunity cost]
Assumptions and ambiguities: [source-linked; blocking or deferrable]
Authority and effect boundary: [what the agent may propose/do; what needs approval]
Review: [measure, date/trigger, rollback or retirement condition]
```

Evaluate options against outcome fit, time-to-useful result, total ongoing burden, reversibility, privacy/security, capability maturity, and displacement of higher-value work. An option that is less perfect but reaches the outcome within constraints is the default candidate; custom work must state the incremental benefit that justifies its build and maintenance cost.

## Proposed the standard language

> **Universal entry check — intent before intervention.** Treat every request as a request for an agent-operated system action. Preserve the original wording. Separate (1) the stated request, (2) requested role/operation, (3) any proposed solution, (4) the desired progress/outcome in its circumstances, (5) success criteria and constraints, and (6) where relevant, evidence-backed causal hypotheses. A stated solution is not automatically the desired outcome; an inferred deeper intent is never a fact until the operator confirms it.
>
> **Assumptions and ambiguity.** Before an external effect, surface every assumption that materially affects recipient, meaning, commitment, authority, scope, deadline, money, privacy, safety, or the choice of intervention. Link each assumption to its source and make it correctable. If multiple material interpretations remain reasonable, preserve them as a clarification item with the smallest discriminating question; do not silently act. Safe composition and research may continue within the authority contract.
>
> **Proportional discovery.** Ask the smallest question needed to select the correct process. Do not run a root-cause interview for a clear one-off. For a recurring failure, wrong assumption, or proposed enduring system, examine evidence-backed contributing conditions until a controllable intervention, external constraint, value trade-off, or testable uncertainty is reached. Do not claim a single root cause merely because a Five Whys chain ends.
>
> **Outcome before tool.** For a recurring/system request, state a solution-neutral outcome and good-enough criteria before choosing an intervention. Compare do nothing, environment/process change, configuration, existing solutions, and custom build—including ongoing maintenance and opportunity cost. Choose the least costly reversible path that credibly meets the outcome; record why a more custom option earns its extra cost.
>
> **Learning from correction.** When an interpretation or assumption is corrected, record what the agent inferred, its source/rule, why it failed, the affected work, and the governing correction. Replay the relevant error class before restoring autonomy. The target state is not “the agent asks forever”; it is “the agent makes correct, inspectable assumptions and the operator only approves the external effect.”

## Worked example: results email

| State | the agent behavior |
| --- | --- |
| Result, recipient, and desired next step are documented | Draft from those sources; list assumptions and source links; request approval to send. |
| “Results” could mean two materially different sets | Preserve task text; create clarification item: “Which result set should the recipient receive: [A] or [B]?” Prepare no-send drafts only if this is useful. |
| The same request recurs because results have no authoritative record | Draft this email after confirmation; separately record a causal hypothesis: “results provenance/handoff is missing.” Compare a source-of-truth/process fix before building an email automation. |
| A previous draft used the wrong result source | Do not merely edit the draft. Record the failed inference and governing-source gap; correct the source/rule, locate affected work, and replay similar draft cases before re-enabling autonomous drafting. |

## Sources

1. Rob Fitzpatrick, *The Mom Test* — [official book page](https://www.momtestbook.com/). Author-owned primary material; use for interview discipline, not clinical or causal claims.
2. Christensen Institute, [Jobs to Be Done Theory](https://www.christenseninstitute.org/theory/jobs-to-be-done/). High-trust theory-owner overview of progress, circumstance, and functional/social/emotional forces.
3. Strategyn / Tony Ulwick, [Outcome-Driven Innovation](https://strategyn.com/outcome-driven-innovation/) and [JTBD template](https://strategyn.com/jobs-to-be-done-template/). Method-owner explanation of solution-independent jobs and desired outcomes; commercial claims such as success rates are intentionally not relied upon here.
4. Lean Enterprise Institute, [5 Whys](https://www.lean.org/lexicon-terms/5-whys/). Lean-method owner explanation of iterative causal questioning, countermeasures, checks, standards, and follow-up.
5. Alan J. Card, [“The problem with ‘5 whys’,” *BMJ Quality & Safety*](https://qualitysafety.bmj.com/content/26/8/671). Peer-reviewed limitation: linear/single-cause oversimplification and ungrounded deduction risk.
6. Thomas J. Reynolds & Jonathan Gutman, [“Laddering Theory, Method, Analysis, and Interpretation”](https://doi.org/10.1080/00218499.1988.12467766), *Journal of Advertising Research*, 1988. Primary scholarly source for means–end laddering.
7. Agency for Healthcare Research and Quality, [Systems Investigation Guide](https://www.ahrq.gov/patient-safety/settings/hospital/candor/modules/guide4.html). High-trust systems-oriented guardrail for incident analysis.
