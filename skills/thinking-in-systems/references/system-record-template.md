---
system_id: SXX
title: "[System name]"
version: 0.1.0-draft
design_status: candidate
operational_status: unbuilt
catalog_eligibility: not_eligible
owner: "[System owner]"
decision_authority: "[who may accept, change, or activate it]"
governed_by: Thinking in Systems standard
supersedes: null
---

# System Record

Use this template only for a Durable system or material System change. Complete the mandatory meaning from the full standard; include a conditional field only for a named consumer or material risk. Link to facts owned elsewhere instead of copying them.

## 1. Frame

- **Original request or problem:**
- **Intent:**
- **Accepted Outcome:**
- **Satisficing / good-enough threshold and trigger for further search:**
- **Non-Outcomes:**
- **Owner, bounded Responsibilities, and decision Authority:**
- **Material domain terms:**
- **Intentionality and progress classification, when relevant:** intended productive use, rest or leisure, intentional or incidental progress, or unresolved Intent; never a moral score.

## 2. Boundary and support

- **Owned responsibilities:**
- **Containing System and this System's role within it:**
- **Internal Subsystems and bounded contributory Outcomes:**
- **Upstream Systems this System relies on:**
- **Dependent Systems that rely on this System:**
- **Relationship interfaces, failure propagation, and change-notification obligations:**
- **Affected but not controlled:**
- **Included and excluded:**
- **Supported Actors, cases, operating conditions, interfaces, states, and scale:**
- **Construction class:** disposable experiment, bounded temporary tool, or maintained System.
- **Evidence claim:** demonstrated seams and cases, operating conditions, artifact, revision or date, freshness, and evidence still missing.
- **Material differences from the nearest proven case:**

## 3. Sources, assumptions, ambiguity, and gaps

- **Authoritative facts, decisions, and links:**
- **Material assumptions, status, source, and affected result revision:**
- **Correction propagation:** governing cause, affected similar work, and replay before restored autonomy.
- **Potentially ambiguous Intent, meaning, boundary, Authority, cost, or effect:**
- **Smallest discriminating question for each unresolved ambiguity:**
- **Unknown-case behavior:**
- **Capability or dependency gap:** original request, blocked condition, preserved state, allowed safe work, proof needed, and resumption condition.

## 4. Intervention, satisficing, Pareto, and Opportunity cost

- **Feasible alternatives:** do nothing; wait with a recheck trigger; change process or operating conditions; configure an existing System; adopt a maintained solution; build a custom solution.
- **Selected intervention and threshold evidence:**
- **Materially distinct alternatives, known trade-offs, and condition for further search:**
- **Pareto / 80-20 concentration hypothesis, evidence, and protected useful-many obligations:**
- **Possible Pareto improvement and per-Actor/System impact:**
- **If trade-offs create losers:** Authority, mitigation, compensation, reversal, or informed exception.
- **Best feasible alternative forgone:**
- **Displaced resources, transition cost, maintenance cost, and cost of delay:**
- **Reversibility, option value, and sunk investment excluded from prospective value:**
- **Reference class and material differences:**

## 5. Mise en place and stopping rule

- **Required inputs, context, materials, capabilities, permissions, and operating conditions:**
- **Required versus optional readiness conditions and clearing evidence:**
- **Proof seam, fallback, and resumption state:**
- **Preparation stopping rule:**
- **Disposition:** smallest safe execution or experiment; gap and pause; reduced scope; named deferral trigger; or cancellation.

## 6. Actors, Ownership, Responsibility, Authority, state, and handoffs

| Producer | Consumer | Input and precondition | Output | Authority and effect boundary | Timing | Failure or degraded behavior | Completion evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |

- **Integrated Outcome owner and terminal proof duty:**
- **Bounded Responsibilities and accepting Actors:**
- **Nested Responsibility and retained parent Ownership:**
- **Explicit Ownership transfers and accepted continuation state:**
- **Writable authority per information type:**
- **Derived System representations, source revision, and freshness rule:**
- **Stable identities and version binding:**
- **Approval binding and revocation:**
- **Named deterministic validators or effect guards for formalizable material rules:**

## 7. LLM and deterministic boundary

- **LLM judgments:** interpretation, uncertainty, evidence synthesis, bounded comparison, or proposal composition.
- **Inputs and governing sources for each material judgment:**
- **Decision rubric and permitted output:**
- **Uncertainty behavior:** proceed, compose without effect, clarify, or pause.
- **Correction path:**
- **Human or deterministic Authority gate for effects:**
- **Deterministic mechanisms:** timing, state, validation, transitions, retries, approvals, reconciliation, invariants, and effect gates.
- **Shared simulation/live path:**
- **Named effector boundary:**

## 8. Incentives, friction, and operating conditions

- **Accepted Outcome and desired incentives:**
- **Actual incentive structure—rewards, costs, constraints, defaults, information, consequences, and alternatives:**
- **Indirect or unintended incentives and who receives each benefit or bears each cost:**
- **Observed behavior that the incentive structure explains or fails to explain:**
- **Helpful and harmful friction:**
- **Repeated-compliance dependencies and how they are removed:**
- **Relevant routines, access, availability, timing, visibility, resources, organizational conditions, competing paths, and transition cost:**
- **Proxy-gaming routes and counter-signals:**
- **Voluntary exit and correction path:**

### Ambient-operation contract

Every ambient operation has one row. If none is authorized, record `none`.

| Operation | Exact Authority and version | Inputs | Trigger | Permitted state or output | Effect boundary | Data purpose, privacy, retention, and use limits | Health signal | Exception route | Review or resumption condition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |

## 9. Operating modes, decay, and recovery

For each applicable mode, define trigger, permitted effects, blocked effects, preserved state, visibility, owner, retry or resumption rule, and exit proof.

| Mode | Contract |
| --- | --- |
| Normal |  |
| Degraded |  |
| Paused |  |
| Recovery |  |

- **Interruption behavior:** continuous pickup point or atomic boundary.
- **Delayed-attention behavior:** queues, retries, reminders, deadlines, stale assumptions, effects, and bounded recovery triage.
- **Linked incidents, ambiguities, capability gaps, and change proposals:**
- **Accepted healthy baseline:**
- **Decay signals:**
- **Reset or maintenance action and trigger:**
- **Review trigger or cadence, reachable control surface, evidence inspected, and resulting decision:**
- **Reset and recovery proof:**
- **Adaptation, pause, replacement, and retirement conditions:**

## 10. Proof and learning

| Scenario | Initial state or input | Expected visible result | Effect boundary | Evidence |
| --- | --- | --- | --- | --- |
| Normal operation |  |  |  |  |
| Material ambiguity |  |  |  |  |
| Weakest realistic condition |  |  |  |  |
| Missing capability or dependency |  |  |  |  |
| Degraded and recovery |  |  |  |  |
| Incorrect assumption |  |  |  |  |
| Affected legacy state |  |  |  |  |
| Retirement |  |  |  |  |

- **Hypothesis and mechanism:**
- **Baseline:**
- **Outcome signal:**
- **Operation signal:**
- **Burden or harm signal:**
- **Attention-demand signal, when material:** checks, reminders, searches, decisions, corrections, or interventions per meaningful Outcome, interpreted beside autonomy, trust, and correction.
- **Qualitative comparison or rubric:**
- **Sensitive or passive data contract, when used:** purpose, Authority or consent, minimization, retention, access, deletion, and interpretation limits.
- **Observation window, expected delay, and confounders:**
- **Decision rule:** retain, revise, expand, pause, repeat, or retire.
- **Recurring monitor, when used:** decision, cadence, threshold, owner, next action, and retirement condition.
- **Adversarial review:** reviewer who did not author the exact revision, credible-risk scope, and findings.
- **Resolution:** resolver and evidence for each material finding.
- **Resolution check:** checker who neither authored the reviewed revision nor made the fix, and result.

## 11. Discovery and operation

- **Stable identity and canonical record:**
- **Applicability and supported operations:**
- **Upstream and Dependent Systems, Subsystems, conflicts, and precedence:**
- **Design status, operational status, eligibility, version, and freshness:**
- **Human-readable status and control surface:**
- **Current state, last and next action, owner, and authoritative links:**
- **Contract-selection evidence and no-match or conflict behavior:**
- **Independent discovery route when an attention or delivery representation fails:**

## 12. Change, legacy, and retirement

- **Decision rationale and review conditions:**
- **Successor System Record:**
- **Affected population and truthful unknown coverage:**
- **Impact on containing, Subsystem, Upstream, and Dependent System contracts:**
- **Legacy classification:** `unaffected`, `compatible`, `auto-adapt`, `review-required`, `conflict`, `exempt`, or `unreachable/unknown`.
- **Exact transformation or re-evaluation per cohort:**
- **Bounded resumable application and coverage counts:**
- **Zero-effect transition simulation:**
- **Rollout, cutover, rollback or repair, and verification:**
- **Successor monitoring and health-evidence updates:**
- **Predecessor and retirement disposition:**
- **What changed since the prior decision:**

## 13. Completion gate

- **Every section of the full standard accounted for:**
- **Materially expected omissions and reasons:**
- **Design Complete:** another competent person or agent can implement and simulate this version without inventing a material rule.
- **Approval, result revision, and date:**
