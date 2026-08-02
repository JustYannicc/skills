# the standard evidence — operational resilience (carefully translated)

## Evidence from official doctrine

| Operational finding | Careful translation to a personal/agent system |
| --- | --- |
| A commander's intent is a short statement of purpose, desired end state, and the boundaries for initiative. It enables action when the plan changes or further orders are unavailable. [ADP 6-0, ¶¶1-45–1-51](https://rdl.train.army.mil/catalog-ws/view/100.ATSC/1FE33715-CFD1-4614-A489-B3E0480C3F80-1428688882108/adp6_0.pdf) | An execution request needs an explicit **intent contract**: underlying outcome, success conditions, constraints/non-goals, authority, and a safe fallback. The model may choose means only inside that contract. |
| Mission command pairs clear intent with delegated, bounded initiative, shared understanding, and prudent risk; it is explicitly designed for uncertainty and disrupted communication. [ADP 6-0, ¶¶1-45–1-51](https://rdl.train.army.mil/catalog-ws/view/100.ATSC/1FE33715-CFD1-4614-A489-B3E0480C3F80-1428688882108/adp6_0.pdf); [FM 2-0, ¶2-82](https://rdl.train.army.mil/catalog-ws/view/100.ATSC/B6B654D9-7553-4B08-9DD6-0891F8F04039-1360339759307/fm2_0.pdf) | Delegate interpretation and planning, not unchecked authority. Each agent/service has an enumerated authority envelope, explicit escalation triggers, and a default of pausing before irreversible or socially consequential action. |
| Risk management is cyclic: identify hazards, assess probability and severity, develop controls and make a risk decision, implement controls, then supervise and evaluate. It includes readiness factors such as staffing, maintenance, supplies, morale, and physical/emotional health. [ATP 5-19, ¶¶1-1, 1-25–1-31](https://www.usarcent.army.mil/Portals/1/Documents/regs/ATP%205-19%20Risk%20Management%20Nov%202021.pdf?ver=G9jIk8io3aHFWoxhdkpp3g%3D%3D) | Treat energy, attention, tool availability, missing context, and time pressure as first-class hazards. Quantify likelihood and impact where defensible; use controls before execution and record residual risk plus the decision owner. |
| Insufficient planning time raises risk; the doctrine protects planning/preparation time for the people closest to execution. [ATP 5-19, ¶1-27](https://www.usarcent.army.mil/Portals/1/Documents/regs/ATP%205-19%20Risk%20Management%20Nov%202021.pdf?ver=G9jIk8io3aHFWoxhdkpp3g%3D%3D) | A request should reserve time for clarification, assumption review, and implementation. Urgency may change the selected tier, but must not silently erase validation or approval requirements. |
| Sustainment doctrine uses anticipation, responsiveness, simplicity, economy, survivability, continuity, and improvisation together—not improvisation alone. [ADP 4-0, pp. 1-3–1-4](https://rdl.train.army.mil/catalog-ws/view/100.ATSC/9F5E759A-A070-4119-A8B2-4EF70EF946C7-1344963267101/adp4_0.pdf) | Design for minimum viable continuity: simple defaults, known resource budgets, alternate paths, and an explicit degraded mode. Use improvisation only inside constraints that preserve safety, privacy, and reversibility. |
| Reconstitution restores an acceptable operating posture by reorganizing available resources and, when necessary, drawing on external resources; it is a planned response to degradation rather than a moral failure. [FM 4-0, ¶5-269](https://rdl.train.army.mil/catalog-ws/view/100.ATSC/0D7107B6-A6B7-445A-B598-253BB85CC28A-1308676390333/fm4_0.pdf); [CALL Handbook 20-01, pp. 2–3](https://api.army.mil/e2/c/downloads/2023/01/31/5bdfe452/20-01.pdf) | Define reset and recovery procedures: preserve state, triage commitments, reduce scope, replenish essential resources, and rebuild only the next reliable capability. A month without response must lead to a recoverable backlog, not silent loss or runaway automation. |
| Doctrine requires adequate shift-change procedures to avoid continuity breaks and explicitly accounts for rest in continuous operations. [FM 6-0, ¶¶9-30–9-32](https://rdl.train.army.mil/catalog-ws/view/100.ATSC/2DDE6089-23E5-4345-8E9E-7BCD5BDF45C8-1399555122246/fm6_0.pdf) | Every human–agent or agent–agent handoff needs a human-readable state packet: current intent, authoritative sources, completed actions, open assumptions/questions, next safe action, deadlines, authority/approval state, and recovery pointer. Do not rely on chat context as the handoff. |
| Training doctrine treats an after-action review as guided analysis to improve future performance, then records lessons and gives failures equal attention to successes; it calls for retraining and re-evaluation. [FM 7-0, ¶¶3-38, K-43–K-44](https://www.first.army.mil/Portals/102/FM%207-0.pdf) | After an incorrect assumption or failed flow, capture: observed outcome, causal chain/evidence, violated expectation, source of the assumption, corrective change, validation case, and owner/review date. Update the source that produced the error, not only the current output. |
| The Army distinguishes lagging outcomes from leading indicators that signal whether preventive controls are present; the measures must have a clear causal link to the outcome and be adjusted as evidence changes. [USACRC, “Using Leading Indicators”](https://safety.army.mil/MEDIA/Risk-Management-Magazine/ArtMID/7428/ArticleID/7752/Using-Leading-Indicators-to-Improve-Safety-A-Primer-for-ASMIS-20) | Instrument controllable precursor signals, not only self-reported impressions: unresolved assumptions, approval latency, queue age, repeated corrections, skipped recovery checks, unmitigated high-risk items, and energy/availability signals when voluntarily collected. Do not infer mental state from surveillance data. |
| In degraded communications, doctrine favors human capability, multiple means, shared intent, and disciplined initiative over dependence on a single technical channel. [ATP 3-21.21, ¶2-2](https://rdl.train.army.mil/catalog-ws/view/100.ATSC/77E8FEDC-49D9-4AF0-BD8E-7D6D18C0D444-1458848167264/ATP3-21x21.pdf) | Store essential system state in durable, inspectable artifacts; provide a manual path and alternate notification channel. When evidence or approval cannot be reached, do only pre-authorized reversible work or pause with a visible escalation item. |

## Non-transfer boundaries

| Do **not** transfer | the standard guardrail |
| --- | --- |
| Command hierarchy, obedience, coercive discipline, surveillance, or treating a person as a resource to optimize. | The human retains consent, revocation, privacy, and final authority. The system may recommend, surface costs, and make pre-approved choices; it must not pressure, shame, punish, or conceal alternatives. |
| Combat urgency, risk normalization, sleep deprivation, or “mission first” at the expense of health and relationships. | Health, legal/safety, dignity, and relationships are hard constraints, not a risk budget to spend. A low-energy mode reduces commitments and escalates support; it never treats exhaustion as a performance defect. |
| Excessive checklists, reporting, or process compliance that consumes the capacity the system is meant to protect. | Every control has a cost and a removal/review criterion. Use automation and passive/opt-in evidence where useful; keep the human-facing surface minimal and proportionate to impact. |
| Transferring military tactics, security assumptions, or adversarial framing to ordinary life. | Borrow only organizational mechanics (clear intent, handoff, recovery, learning). Use cooperative, humane language and preserve flexibility, play, and relationships. |

## Proposed the standard clauses

### the standard-01 — Intent before execution

Every executable request MUST resolve to an intent contract before action: `desired outcome`, `why/underlying driver when material`, `success evidence`, `constraints and non-goals`, `scope`, `authority`, `reversibility`, `deadline`, and `fallback`. If the underlying driver remains uncertain, the system MUST surface a root-intent question rather than execute a plausible symptom treatment.

### the standard-02 — Assumptions are executable state

The system MUST attach every material assumption, ambiguity, and missing fact to the work item, regardless of type. Before an externally consequential action, it MUST present the assumptions, their sources, confidence, and correction path for approval. An assumption resolved from authoritative personal context may be proposed, but is not silently promoted to fact.

### the standard-03 — Bounded delegation

Each agent, automation, and integration MUST have a machine-readable authority envelope: permitted actions, data access, spending/time ceiling, escalation conditions, approval rule, and safe failure behavior. Agents MAY select methods inside the envelope; they MUST NOT extend it by inference.

### the standard-04 — Degraded operation is a designed mode

Each recurring flow MUST specify its normal, degraded, paused, and recovery modes. In degraded mode, it MUST preserve the queue and evidence, avoid irreversible side effects, take only pre-authorized reversible actions, and create a human-readable escalation record. Lack of response for 30 days MUST remain recoverable.

### the standard-05 — Handoff packet and durable state

No component MAY require opaque model memory or a chat transcript to continue safe work. It MUST emit a durable, human-readable handoff packet containing intent, state, source links, completed actions, pending questions/assumptions, approval state, next safe action, and rollback/recovery instructions.

### the standard-06 — Small actions create durable, recoverable progress

An action counts as progress only when it leaves an inspectable artifact, verified state transition, reduced uncertainty, restored capacity, or a reversible preparation that makes a later action easier. The system SHOULD prefer the smallest action that improves future options; it MUST NOT manufacture activity metrics that reward motion without durable value.

### the standard-07 — Risk, cost, and capacity are explicit

Before material work, the system MUST record plausible harms, probability/severity where estimable, mitigations, residual risk, expected value, opportunity cost, and capacity/energy demand. It SHOULD choose a satisficing existing solution when it meets the intent within the approved risk and cost bounds. It MUST identify the decision owner for accepted residual risk.

### the standard-08 — Recovery/reconstitution resets decay

Every system with a backlog, physical environment, recurring input, or aging dependency MUST define observable decay signals and a reset procedure. Reset MUST start with preservation and triage, then restore a minimum reliable baseline before optional optimization. Recovery work is valid progress and MUST be visible in measurement.

### the standard-09 — Learning closes the causal loop

When an approved result is corrected, rejected, or fails, the system MUST run a proportionate after-action review. It MUST trace the failed assumption to its source, change the relevant source/rule/interface, add a regression check where feasible, and retain the decision rationale with conditions under which it should be revisited.

### the standard-10 — Quantitative leading indicators, consent-bound

For each high-value system, define a small set of measurable leading indicators linked to its intended outcome, plus lagging outcome measures. The system MUST review them on a scheduled cadence and trigger a proportionate intervention before failure. Health and behavioral data MUST be voluntary, minimally collected, transparent, and never used for coercion or self-punishment.

### the standard-11 — Interfaces are contracts, not informal favors

Cross-component requests MUST use an explicit contract that defines input schema, required context, output/evidence, service-level expectation, authority, error modes, escalation, and owner. The contract MUST be human-readable and testable. A form, template, or TypeScript schema is preferred where it reduces ambiguity or enables validation.
