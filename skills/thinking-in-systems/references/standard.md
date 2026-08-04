Read and apply every section before returning a systems judgment. Scale the depth, output, and durable artifacts to consequence. A small request changes how much work is visible; it does not make any part of the method disappear.

## Use these terms consistently

- **Thinking in Systems:** the method in this standard for governing arrangements so they advance an intended Outcome under real operating conditions.
- **System:** a repeatable arrangement of Actors, information, rules, state, mechanisms, and operating conditions that produces or protects an Outcome over time.
- **System interaction:** a request, event, or observation interpreted or acted on through a System. Every agent request is one System interaction, even when it needs only an inline result.
- **Durable system:** a System whose rules, state, Authority, or effects must persist beyond the current interaction.
- **Actor:** a person, agent, team, service, or other party that performs, decides, approves, supplies, or receives something within a System.
- **Intent:** the problem, opportunity, value, or avoided loss that gives direction to an Outcome and constrains acceptable means.
- **Outcome:** the externally meaningful condition that the work is responsible for producing or preserving.
- **Material:** capable of changing the accepted Outcome, scope, Authority, external effect, risk, burden, proof, or treatment of existing state.
- **Authority:** explicit permission for an Actor or mechanism to interpret, decide, prepare, approve, or perform a named effect within a defined boundary.
- **LLM:** a probabilistic language model used for interpreting unstructured context, identifying uncertainty, comparing bounded options, or composing proposals. Do not use _model_ when this is the intended meaning.
- **Deterministic mechanism:** a rule-governed component that owns enforceable state, timing, validation, transitions, retries, approvals, or effects without relying on an LLM to remember or improvise the rule.
- **System representation:** a description, diagram, record, simulation, or other view of a System; it may guide or report on the System but is not the System itself.
- **System Record:** the canonical human-readable contract for one version of a Durable system, including its Outcome, boundary, Authority, behavior, proof, operation, and retirement conditions.
- **Change and Legacy Record:** the versioned contract for moving from one Durable system version to another, including affected existing state, compatibility, rollout, rollback, verification, and predecessor retirement.
- **Opportunity cost:** the value of the best feasible alternative forgone by a decision, considered with displaced resources, delay, transition, maintenance, and reversibility.
- **Strategy:** a rule for making decisions as conditions and information change. A **Plan** is a proposed sequence under current assumptions.
- **Fog of war:** material uncertainty that limits what can currently be known.
- **Proof seam:** the human-visible boundary where intended behavior and effects can be evaluated independently of internal implementation.
- **Informed exception:** an authorized choice to bypass a safeguard after the skipped protection, plausible consequence, affected scope, and recovery trigger are visible.
- **Design Complete:** another competent person or agent can implement and simulate one System version without inventing a material rule.

## 1. Apply systems thinking proportionately

Every request to interpret, decide, prepare, or act is a **System interaction**. Classify it as one of these branches:

- a bounded direct operation;
- an instance of an accepted System contract;
- a new Durable system;
- a material change, recovery, or retirement of an existing System; or
- an unknown case whose governing contract is missing or ambiguous.

The whole method applies to every branch. The branch controls persistence and depth:

- A local, reversible operation with an obvious completion check can keep its contract and proof in the response.
- An accepted-contract instance binds the exact governing version and stays within its Authority.
- A new Durable system needs a visible draft System Record.
- A material change needs a proposed successor System Record and a linked Change and Legacy Record.
- An unknown case preserves the request and exposes the smallest gap that blocks a safe interpretation.

A request has durable or change consequences when it can recur; creates or changes lasting state, rules, structure, or Authority; crosses a handoff; produces an external effect or meaningful commitment; creates continuing ownership or recovery work; or changes how existing items must be handled.

For a spelling correction, preserve the source, make only the correction, and show the exact result. For a request to govern future corrections, design or change the repeatable System. Both apply systems thinking; only the second needs durable structure.

## 2. Frame the Outcome and decision

Start from the original request. Preserve its exact wording or source whenever later interpretation, correction, audit, or migration may depend on it.

Resolve these questions proportionately:

1. **Requested operation:** What was literally requested, and what role is the agent being asked to perform?
2. **Intent:** What problem, opportunity, value, or avoided loss motivates the request? Is the requested operation the Outcome or one proposed means?
3. **Outcome and good-enough threshold:** What should become true, under which conditions, and what observable result is sufficient now?
4. **Boundary:** What is included, excluded, supported, affected, and explicitly not owned?
5. **Actors and Authority:** Who or what may interpret, decide, prepare, approve, and perform each effect?
6. **Facts, assumptions, and unknowns:** Which sources support the interpretation? Which propositions remain unconfirmed, including material privacy, retention, safety, or legal conditions?
7. **Proof:** What human-visible observation would show that the result is correct and useful?

When two reasonable interpretations differ materially, preserve both and ask the smallest question that distinguishes them. Safe preparatory work may continue only inside the accepted Authority boundary.

Every material assumption is source-linked, reviewable, correctable, and marked as a supported proposal, confirmed, unresolved, rejected, or superseded. Before an effect, it must be supported within accepted Authority or confirmed by approval bound to the exact result revision; confidence alone is not resolution. When an assumption proves materially wrong, trace it to the governing source, rule, interface, or missing fact; correct that cause; find affected similar work; and replay the case before restoring the same autonomy.

An execution contract makes the following visible in proportion to consequence:

- the request and accepted interpretation;
- the Outcome, boundary, and material assumptions;
- the governing sources and Authority;
- what is proposed, what has happened, and what has not happened;
- any approval required for an effect; and
- the completion proof.

The response itself is enough for a bounded reversible operation. Consequential or cross-session work persists the contract and binds approvals and evidence to the exact result revision.

### Intentionality and progress

Intentional action and progress are different facts. **Intentional productivity** is chosen use of time or energy toward an accepted end; the accepted end may be work, maintenance, rest, leisure, learning, preservation, or another legitimate Outcome. **Progress** is observable movement toward an accepted Outcome whether intentional or incidental.

Useful incidental progress may be recorded without rewriting the prior intent. Unplanned activity is not automatically failure, and intended rest or leisure is not disguised work. The System preserves the actor's stated intent instead of assigning a moral score.

Every accepted action moves the line forward by delivering part of the Outcome, reducing material uncertainty, preserving or restoring state, producing reusable evidence, or making the next action genuinely easier. Activity that only improves a proxy does not qualify.

## 3. Choose an intervention

Choose the least costly reversible intervention that credibly clears the good-enough threshold. For a material decision, compare the feasible classes that could satisfy the Outcome:

- do nothing;
- wait for named information or conditions, with a recheck trigger;
- change the surrounding process or operating conditions;
- configure an existing System;
- adopt a maintained existing solution; or
- build a custom solution.

### Opportunity cost and decision economics

Evaluate the alternatives together, once:

- the best feasible alternative forgone;
- time, attention, money, capacity, or other resources displaced;
- transition and switching cost;
- ongoing ownership and maintenance cost;
- cost of delay;
- reversibility and option value;
- prospective benefit and remaining cost, excluding sunk investment; and
- the evidence that the selected option clears the threshold.

Show a credible downside of delay beside the expected benefit and uncertainty. Do not manufacture fear, shame, artificial loss or scarcity, streak penalties, or irreversible commitment merely to push a decision.

A leverage claim is a hypothesis that a small set of causes or actions produces most of the relevant value. Test it, but keep the remaining work when it protects safety, trust, accessibility, recovery, legal duties, rare catastrophic cases, or an explicit requirement.

Waiting is an explicit alternative within this comparison. It preserves option value only when it names what may change, what evidence is expected, what happens meanwhile, and the trigger for deciding again. It is not an unowned pause.

Avoid false numerical precision. Use an outside view when comparable work exists: compare the current case with actual prior outcomes and explain the differences in actors, conditions, interfaces, responsibility, and evidence. When material architecture or operating assumptions remain unresolved, estimate a bounded evidence-producing experiment rather than delivery.

### Preparation and stopping rule

Prepare the inputs, context, capabilities, permissions, operating conditions, proof seam, fallback, and resumption state that the next action actually requires. Classify each readiness condition as required or optional.

Continue preparation while a required condition is missing, an irreversible or high-consequence assumption is untested, or another information step is likely to change the decision more than it costs. Stop preparing when required readiness passes and execution or a bounded experiment now has greater expected Outcome or information value.

A bounded experiment names the learning question and the decision its evidence will change, and preserves the critical Proof seam. “Build more to learn” is not a reason unless those are explicit.

At the stopping point, choose one disposition: run the smallest safe execution or experiment; expose a capability or knowledge gap and pause with a resumption condition; reduce scope; defer to a named trigger; or cancel. No fixed preparation ratio or fixed elapsed time applies across Systems.

When decision burden is material, present the smallest safe next action and either a safe default or a bounded set of materially distinct choices. Do not replace a decision with an unbounded option list.

Exploration reduces uncertainty; exploitation uses an established path to produce the Outcome. State which one the next action serves and what evidence permits commitment or a return to execution. Enthusiasm can justify a bounded experiment, but evidence and accepted priorities govern a commitment.

## 4. Design the System

Inspect each material seam. A seam has a governing rule or remains a visible gap.

### Actors, responsibility, Authority, and handoffs

Identify every Actor that supplies, decides, approves, performs, receives, operates, supports, or recovers something. For each handoff, define:

- producer and consumer;
- input and preconditions;
- output and completion evidence;
- timing or service expectation;
- Authority and effect boundary; and
- failure, degraded, retry, and resumption behavior.

Capability, confidence, and ownership do not create Authority. Authority is explicitly granted for a named effect and boundary. An agent or LLM may propose a wider action but cannot authorize it.

Keep every handoff contract human-readable. When a material handoff rule is formalizable, bind it to a named deterministic validator or effect guard. The validator implements the accepted rule; it does not become a competing policy authority.

### State, identity, and representations

Assign one writable authority to each material information type. Preserve original inputs, edits, decisions, history, and provenance through interpretation, simulation, failure, migration, reset, and retirement.

A **System representation**—a record, diagram, dashboard, index, cache, or generated view—is not the System itself. A derived representation names its authoritative source, revision, and freshness and cannot silently become a second editable authority. Human-readable contracts own meaning and rationale; machine-enforced contracts own only formal rules that a runtime consumer needs.

Material state, assumptions, gaps, proposed or actual effects, health signals, changes, and legacy Outcomes need a browsable human-readable representation with canonical links and explicit freshness, stale, or failure state. For a material attention or delivery representation, keep both the authoritative item and its delivery or freshness state independently discoverable if the representation fails; it cannot be the only route to a required human judgment.

Every durable System publishes enough identity and applicability information to determine whether it may govern an interaction: stable identity, purpose, supported operations and conditions, version, design and operational state, dependencies, Authority, precedence, owner, and canonical record. An ineligible, unbuilt, superseded, retired, or incompatible contract cannot govern execution.

Bind an interaction only to an eligible contract whose applicability, version, and precedence match visible evidence. An LLM or semantic retrieval may find and interpret candidates, but it cannot create eligibility or Authority. No match enters the unknown-case path; conflicting matches enter the ambiguity path.

### LLM judgment and deterministic mechanisms

Use an **LLM** for probabilistic language work: interpreting unstructured context, identifying ambiguity, retrieving and synthesizing evidence, comparing bounded options, and composing proposals.

Each material LLM judgment boundary names its inputs, governing sources, decision rubric, permitted output, uncertainty behavior, correction path, and the human or deterministic Authority gate for effects. Uncertainty behavior selects among proceeding, composing without effect, clarifying, or pausing; it never silently widens Authority.

Use **deterministic mechanisms** for enforceable rules: clocks, schedules, stable IDs, durable state, schemas, transitions, locks, retries, version binding, approvals, reconciliation, invariants, and effect gates. A deterministic trigger can start an operation, durable state can select eligible work, an LLM can interpret or compose, and deterministic validation can bind the exact approved effect. The LLM is not the clock, ledger, policy engine, or sole memory.

Simulation and live operation share the same retrieval, interpretation, decision, and composition path. Only the named effector boundary changes.

### Incentives, friction, and operating conditions

Inspect what the arrangement makes easy, rewarding, costly, avoidable, gameable, or invisible for every Actor. The intended path should be easier than harmful or irrelevant alternatives without using shame, hidden manipulation, artificial scarcity, proxy rewards, or coercion.

Repeated remembering, checking, searching, noticing, understanding, or exerting willpower is a real System dependency. Remove avoidable compliance dependencies with clear defaults, deterministic triggers, preserved state, prepared choices, and exception-based attention. Keep irreducible human judgment explicit.

The operating environment is part of the System when it changes behavior. Inspect relevant access, availability, timing, location, visibility, resources, social or organizational conditions, competing paths, and transition cost before blaming an Actor or building software. Treat an environmental or process change as a testable intervention with a mechanism, proof, abort rule, and reversal path.

Metrics change incentives. For each material metric, name the Outcome it represents, how it could improve while the Outcome worsens, and a counter-signal. A proxy may inform a decision but cannot replace the Outcome or authorize promotion by itself.

### Ambient progress and attention

Safe, pre-authorized preparation, preservation, maintenance, reconciliation, or recovery may continue without active human attention. Each ambient operation declares its exact Authority and version, inputs, trigger, permitted state change, forbidden effects, health signal, exception route, review or resumption condition, and—when data is involved—purpose, privacy, retention, and data-use limits. No declaration means no Authority.

Healthy routine behavior may recede from attention; exceptions, stale assumptions, decisions, and effects that require judgment remain conspicuous and independently inspectable. Zero attention is not an Outcome when attention protects autonomy, meaning, safety, or correction.

## 5. Operate under real conditions

Design for the weakest realistic condition in which the essential Outcome, state, or future option must survive. Relevant conditions can include interruption, reduced human or machine capacity, missing input or approval, unavailable dependency, stale information, delayed response, overload, or partial connectivity. Use only the conditions credible for the System; do not import a personal routine or arbitrary elapsed-time assumption.

Every applicable Durable system defines these modes:

| Mode | Governing behavior |
| --- | --- |
| Normal | Pursue the full accepted Outcome. |
| Degraded | Perform only pre-authorized work that still advances the Outcome or safely limits damage. Preserve and expose the limitation. |
| Paused | Preserve state and prevent effects because no safe useful action remains. Keep the unblock condition visible. |
| Recovery | Restore an accepted healthy baseline, verify it, and resume in bounded steps. |

For each mode, define its trigger, allowed effects, blocked effects, preserved state, visibility, owner, retry or resumption rule, and exit proof. Degraded operation is a floor, not a hidden permanent downgrade. A partial artifact or attempted action never masquerades as the original Outcome.

When required attention or response may be delayed, define queue growth, retry, reminder, deadline, stale-assumption, and external-effect behavior. Recovery uses preserved state and bounded triage; it must not require context reconstruction or present an unbounded backlog as the first action.

### Capability gaps

When a required capability, connection, permission, operating environment, or proof seam is missing, preserve the exact work and result revision, expose the blocked Outcome, name allowed safe work, and define the proof and condition for resumption. After the capability is restored, revalidate governing sources and the System contract, replay affected simulation cases, and renew approval when the exact proposal or its assumptions became stale.

Interruption behavior follows the work unit. Continuous work may preserve a pickup point and stop midstream; atomic work stops at a boundary when interruption would corrupt the unit. The System declares which behavior applies.

Treat material incidents, ambiguities, capability gaps, and change proposals as linked records rather than replacements for lifecycle state. A material incident records contributing conditions, corrective action, owner, and visible proof.

### Decay, reset, and recovery

Every live System defines:

- the accepted healthy baseline;
- what can decay or become stale;
- evidence that reveals decay;
- the response owner and escalation route;
- the safest useful degraded path;
- a meaningful reset or maintenance action;
- proof that the baseline was restored; and
- conditions for adaptation, pause, replacement, or retirement.

Prefer event-driven decay review when the evidence can surface in time; otherwise set a cadence before delayed discovery would become material. Put the maintenance action on a control surface its responsible Actor can reach, and name the evidence inspected and the decision that follows.

Reset restores and verifies the baseline, records the new baseline revision or date when relevant, and preserves history. It does not hide deterioration. Avoidance, workarounds, overrides, correction rate, queue age, declining use, support cost, and broken assumptions are possible decay signals—not proof of laziness or disobedience.

When a failure recurs, trace the contributing conditions until reaching a controllable condition, external constraint, value trade-off, or testable uncertainty. Correct the governing cause, find affected similar work, and replay the failure class before restoring the same autonomy.

## 6. Prove and learn

Treat every material System change as a hypothesis. Distinguish:

- **verification:** the System behaves according to its accepted contract;
- **validation:** the System improves the intended real Outcome;
- **burden and harm:** the cost, effort, confusion, pressure, privacy loss, displacement, or damage produced; and
- **sustainment:** the System remains operable, trusted, recoverable, and owned.

Technical availability, adoption, correct use, Outcome improvement, and sustainment are separate evidence claims. Maturity labels such as `Idea`, `Spike`, `Pilot`, and `Production` do not prove any of them.

### Simulation before effects

Simulation uses the production-intended path and renders exact proposed writes, messages, waits, artifacts, and effects while disabling production effectors and durable or user-visible writes. It may write only isolated state explicitly marked as simulation. Approval binds the exact proposal revision and material assumptions.

Representative proof covers the credible support matrix: normal operation, ambiguity, weakest realistic condition, missing capability or dependency, degraded behavior, recovery, incorrect assumptions, affected legacy state, and retirement where applicable. Proof observes public seams and expected visible results, not internal implementation steps.

Correct every rejected material simulation case and replay it successfully before approving activation.

### Measurement and learning record

For a material hypothesis, record:

```text
Hypothesis: [change] should improve [Outcome] in [conditions] because [mechanism].
Baseline: [what happens now and how it was observed].
Intervention: [what changes and what does not].
Observation window and delay: [when evidence can answer the decision].
Outcome signal: [the real condition the System exists to improve].
Operation signal: [whether the System ran as designed].
Burden or harm signal: [cost, effort, confusion, pressure, displacement, or side effect].
Confounders: [material condition changes].
Decision rule: [retain, revise, expand, pause, repeat, or retire].
```

Choose the observation window from the mechanism's expected delay and the decision the evidence must inform. Do not reuse a fixed duration from another domain.

Prefer quantitative operational evidence when it can validly answer the question without disproportionate collection burden. Show denominators, distributions, and trends where they matter. Use qualitative evidence for meaning, harm, exceptions, and changing conditions that counts cannot represent, and name its comparison or rubric. Do not invent precision or infer causality or mental state from sparse telemetry.

When evidence uses sensitive or passively collected personal data, name its purpose, Authority or consent, minimization rule, retention, access and deletion rules, and interpretation limits.

Qualitative reflection supplies context and meaning; deterministic event history supplies operational facts. Neither substitutes for the other.

Do not redesign a System around one ordinary outlier when the distribution and trend still support the accepted rule. A catastrophic, safety-critical, rights-violating, or irreversible event may require immediate action even when the aggregate trend is favorable.

Every metric names its decision, underlying Outcome, gaming route, counter-signal, and retirement condition. This is the practical protection described by Goodhart's law and Campbell's law: a proxy can become misleading when treated as the Outcome or target. Study both Outcome and burden, then retain, revise, expand, pause, or abandon the intervention.

When attention is a material burden, measure the checks, reminders, searches, decisions, corrections, or interventions demanded per meaningful Outcome, and interpret that burden beside Outcome, autonomy, trust, and correction signals. Zero attention is not automatically better.

A recurring monitor names the decision it serves, cadence, threshold, owner, next action, and retirement condition. Do not monitor merely because data exists.

### Review and completion gates

A System version is **Design Complete** only when another competent person or agent can implement and simulate it without inventing a material rule. Open details may remain only when safely reversible, explicitly delegated, and unable to change the contract.

Design progresses through `Candidate` → `Framing` → `Designing` → `Adversarial Review` → `Resolution Check` → `Design Complete`. A candidate may be cancelled or superseded, and a Design Complete version may later be superseded without pretending that its live predecessor has already retired. The `'Workflow'` skill or caller coordinates these phases; Thinking in Systems supplies their governing gates.

Before Design Complete, run one independent, risk-proportionate adversarial review of credible failure modes. The reviewer did not author the reviewed revision. Resolve or explicitly accept each material finding, then have a checker who neither authored the revision nor made the fix verify the resolution evidence. A new full pass is warranted only by materially new evidence or a materially changed boundary.

Operational progression remains distinct from design: `Unbuilt` → `Implementing` → `Simulation Ready` → `Simulation Approved` → bounded `Live Pilot` → `Live`. A live System may enter `Degraded`, `Paused`, `Recovery`, `Retiring`, or `Retired`. A design label never claims implementation, adoption, validation, or operation.

## 7. Govern change, legacy, and retirement

A change is not complete because a rule, instruction, integration, or program was installed. It must address affected existing state and prove the transition.

Reopen the boundary when a change adds or alters an Actor, user group, environment, dependency, permission, interface, state transition, exception, irreversible effect, scale class, support duty, or recovery obligation. Prior estimates, evidence, Authority, and approval do not carry forward automatically.

Evaluate three independent axes:

1. **Scope:** supported actors, cases, conditions, states, volumes, and interfaces.
2. **Construction:** disposable experiment, bounded temporary tool, or maintained System others depend on.
3. **Evidence:** what the real operating path has actually demonstrated.

Compare the proposed case with the nearest proven case and expose every material assumption difference. Development evidence does not imply production evidence, and apparent completion does not imply actual usability. Use reference-class evidence to correct the inside view.

Before adopting a material change:

- propose the successor System Record for the new steady-state contract;
- create a linked Change and Legacy Record for transition;
- identify the affected population and truthful unknown coverage;
- classify each discoverable cohort as `unaffected`, `compatible`, `auto-adapt`, `review-required`, `conflict`, `exempt`, or `unreachable/unknown`;
- simulate the transformation without effects;
- define bounded rollout, cutover, rollback or repair, and verification; and
- retire or preserve the predecessor explicitly.

For each affected cohort, record the exact transformation or re-evaluation, make live application bounded and resumable, report coverage counts and unknown coverage, and update monitoring or health evidence needed for the successor.

Historical facts and original captures remain intact. Migration records what changed instead of rewriting history to imply that the new rule always applied.

Retirement stops new intake, disposes of or transfers outstanding work, preserves required history, removes obsolete effects and access, updates discovery state, and leaves a visible retired contract.

An agent may detect, research, draft, simulate, and review a governance change. It cannot approve a change to its own governing method, its own Authority expansion, Design Complete, or activation of a consequential System unless that class of decision was explicitly delegated in advance.

## 8. Record only what must persist

Create durable records when state, responsibility, evidence, Authority, waiting, approval, effects, or recovery must survive the interaction. Do not create a System Record for a bounded reversible result whose source, interpretation, action, and proof fit in the response.

One canonical System Record governs each Durable system version. It contains only fields required by a named consumer or material risk. Its non-optional meaning is:

### Frame

- original request or problem, Intent, accepted Outcome, good-enough threshold, and non-Outcomes;
- System boundary, supported conditions, affected Actors, constraints, and explicit non-ownership;
- owner, decision Authority, and material domain vocabulary;
- authoritative facts, decisions, assumptions, unknowns, and ambiguity behavior; and
- selected intervention, Opportunity cost, rationale, and review conditions.

### Contract

- Actor responsibilities and handoff contracts;
- writable authority for each information type and any derived representations;
- inputs, preconditions, outputs, stable identities, timing, transitions, and completion evidence;
- approval and external-effect boundaries;
- incentives, friction, operating conditions, and proxy-gaming counter-signals;
- Normal, Degraded, Paused, Recovery, reset, and retirement behavior;
- safe ambient operations and irreducible human judgments; and
- applicability, dependencies, version, operational state, precedence, and discovery metadata.

### Proof and operation

- credible acceptance scenarios and exact visible results;
- simulation fixtures and the effector boundary;
- baseline, Outcome, operation, burden, and sustainment evidence;
- decay signals, healthy baseline, reset and recovery proof, and owner;
- material review findings and resolution-check evidence; and
- change, legacy, migration, rollback, and retirement disposition.

Use the [System Record template](system-record-template.md) to instantiate this contract. Omit irrelevant conditional fields or mark a materially expected omission with a short reason. Link to facts owned elsewhere instead of copying them.

The method does not prescribe a task manager, database, document system, schema language, or storage layout. Each implementation defines which information types it owns, which representations are writable, how projections expose freshness, and how reconciliation detects drift.

## 9. Apply informed exceptions

A person with the relevant Authority may choose to bypass a safeguard after seeing:

- the safeguard and protection being skipped;
- the plausible consequence;
- the affected scope and duration; and
- the review, reversal, or recovery trigger.

Record the decision proportionately and respect it without coercion or shame. The exception changes the chosen safeguard; it does not erase systems thinking, responsibility, evidence, or the remaining Authority boundary.

Before returning, account for every section above. Mark a clause inapplicable only after reading it and state the reason when its omission could be material. Return the accepted interpretation, governing constraints, unresolved gaps, permitted Authority, proof obligations, and change or legacy consequences to the active `'Workflow'` skill or caller. Do not take over phase coordination or claim the parent Outcome complete.
