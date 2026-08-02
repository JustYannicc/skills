# Change-management evidence for the standard

## Decision-useful conclusion

For the agent, a change is not complete when an agent, prompt, integration, or rule has
been **installed**. It is complete only when the intended behaviour is adopted at
the relevant human and system interfaces, works reliably under ordinary and
low-resource conditions, is inspectable, can be recovered or rolled back safely,
and has an owner and evidence for continued operation. This is a transfer from
organisational and implementation-science evidence to a personal socio-technical
system; it is not a claim that the agent is an organisation.

The high-leverage unit is therefore a governed **change packet**, rather than a
launch checklist: rationale and assumptions; affected actors and handoffs;
baseline; readiness/capacity; rollout and abort rules; support and feedback;
leading and lagging measures; a sustainment/decay-reset owner; and an explicit
legacy disposition. The packet should be proportional to consequence, not
ceremony for its own sake.

## Evidence and limits

| Question | What the source supports | Careful the standard transfer |
| --- | --- | --- |
| Should readiness be checked? | A 2025 systematic review of 47 quantitative healthcare studies finds organisational readiness conceptually and operationally varied, commonly measured only once, and calls for clearer, repeated longitudinal measurement. It is relevant context, not a universal causal score or release gate. [Caci et al., 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12084713/) | Check readiness/capacity before a material change and again after rollout: available time/energy, access, skills, dependencies, authority, environmental constraints, and support capacity. Record uncertainty; do not use a single readiness score to declare success. |
| Does installation equal success? | Proctor et al.'s implementation-outcomes taxonomy separates acceptability, adoption/uptake, appropriateness, feasibility, fidelity, cost, penetration, and sustainability from ultimate service outcomes. [Proctor et al., 2011](https://pubmed.ncbi.nlm.nih.gov/20957426/) | Explicitly distinguish `installed`, `available`, `first used`, `adopted`, `reliably operated`, and `sustained`. A working integration is not evidence that it improves the operator's outcome. |
| What support is justified? | A 2024 comprehensive systematic review/meta-analysis of 204 nursing studies reports positive clinical-practice effects from single and multi-component implementation strategies, but substantial strategy variation. Common elements included education, reminders, audit/feedback, opinion leaders, and tailoring. [O'Brien et al., 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11443951/) | Diagnose the obstacle and tailor a small support bundle (clear interface, quick guide, reminder, feedback, environmental change) rather than impose a universal ritual. Healthcare findings do not identify a single best bundle for personal systems. |
| How should resistance and communication be treated? | A systematic review reports that ongoing communication and feedback supported engagement, compliance, barrier identification, and sustainability in practice-change roles, with heterogeneous underlying studies. [Baker et al., 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9210184/) A review of reactions to organisational change includes cognitive, emotional, behavioural, and organisational responses, including voice and resistance. [Oreg et al. review, 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9006211/) | Treat avoidance, correction, workarounds, and resistance as diagnostic signals about fit, burden, incentives, unclear authority, or a faulty assumption—not as non-compliance to suppress. Maintain an explicit feedback/clarification route that changes the governing specification when warranted. |
| What enables sustainment? | A systematic review maps reported sustainment facilitators including training/education and stakeholder support; reported hindrances include resource loss, competing demands, insufficient leadership/support, and lack of trained people. It maps associations, not their causal ranking. [Lennox et al., 2018](https://pmc.ncbi.nlm.nih.gov/articles/PMC6554955/) | Every activated system needs: a named maintenance owner; a minimal support/recovery path; routine use or a deliberate review cadence; resource/dependency assumptions; and a decay signal plus a reset action. Do not close the change at launch. |
| How should a rollout be governed? | AHRQ's implementation guide (authoritative practical guidance, not experimental evidence) recommends a cross-workflow team of technical implementers, operators, managers and end users; a progress/data communication plan; multiple feedback routes; and recurring adjustment. [AHRQ guide](https://www.ahrq.gov/sites/default/files/wysiwyg/takeheart/training/getting-started-implementation-guide.pdf) | For a material the agent change, name the human, the agent, connection/tool owner, source-of-truth owner, and any affected counterpart. Each handoff has a readable contract: input, output, authority, timing, completion evidence, failure/degraded behaviour, and escalation target. |
| How should rollback and legacy be handled? | NIST IR 8183r2 initial public draft (2025; authoritative configuration-management guidance, not behavioural adoption evidence) calls for baselines; review, authorisation, test, validation, documentation; retained prior baselines for rollback; and predefined fail-to-known-state procedures. [NIST IR 8183r2](https://nvlpubs.nist.gov/nistpubs/ir/2025/NIST.IR.8183r2.ipd.pdf) | Use versioned contracts and reversible pilots where possible. Define pre-launch success, abort, rollback, and degraded-path conditions. For every legacy object affected by a changed rule/schema/process, record a disposition: compatible, migrate, retain-as-historical, retire, or needs-review—never silently orphan it. |

### Local course evidence: BWL II, Organisation und Wandel

The following is course material rather than an independent empirical review. It
is valuable here because it gives the agent a coherent change lifecycle and directly
emphasises stakeholder assessment, resistance, rollout, institutionalisation, and
organisational learning.

An operator-supplied university course deck on organization and change was inspected as contextual material. It is not included in this public repository; the public sources below support the transferable claims.

| Slides | Course claim | the standard implication |
| --- | --- | --- |
| 9–11 | Treating change solely as planning followed by a start signal misses resistance; sources include individual pre-orientations/frustration and organisational culture, not-invented-here effects, and threat rigidity. | Do not diagnose failure merely as a bad plan or user failure. Capture the observed friction, originating assumption/rule/interface, and the smallest experiment or correction. |
| 13–17 | Lewin's food-aversion experiment contrasts lecture and discussion groups; the course derives lower resistance where an idea comes from within, effects are positive, there is shared problem understanding, changes are jointly decided, and opponents are understood/discussed with. It names active participation, group support, cooperation, and cyclical change. | Before a behaviour-changing rule, surface the problem and alternatives, assumptions, incentives/costs, and user approval. Build a two-way correction route; do not rely on one-way agent instruction. |
| 21–26 | Extended change phases: preparation, entry, rollout, institutionalisation (*Verstetigung*), consolidation. Preparation includes early debate, stakeholder assessment, and a rough concept; entry establishes benefit and project organisation; rollout actively addresses resistance and moves change into units; institutionalisation adds responsibility, goals, continued training and celebration; consolidation systematically processes experience, dissolves temporary structures, reintegrates responsibility, and stabilises. | Use a lifecycle, not a binary "not launched/launched" state. In the agent: `prepare → activate pilot → roll out → sustain → consolidate/learn`, with review/rollback transitions available at each stage. |

## Concrete the standard additions

### 1. Add a change lifecycle beside the system-design lifecycle

For any change with an external effect, recurring behavioural demand, material
legacy impact, or increased autonomy, use these states:

1. **Prepare** — state the outcome, problem/root driver, assumptions, constraints,
   affected actors/interfaces, incentives/friction, current baseline, and
   readiness/capacity. Preserve the old state.
2. **Propose and approve** — expose the change packet in human-readable form;
   obtain required authority. No effect is applied merely because the model found
   a plausible interpretation.
3. **Pilot** — exercise the narrowest realistic slice, with predeclared leading
   signals, outcome signal, abort/rollback/degraded path, support route, and
   review date. Technical test success is necessary but insufficient.
4. **Roll out** — expand only after pilot evidence; watch assumptions, handoffs,
   friction, support demand, avoidance/workarounds, and harm. Treat these as
   information and adjust the contract or environment.
5. **Sustain and consolidate** — make ownership, support, measures, and decay
   reset explicit; compare baseline with outcome over the stated window; retain,
   adapt, scale, retire, or roll back. Record reasoning, evidence, what changed,
   and the legacy disposition.

### 2. Define adoption separately from delivery

Add these change-status fields to the human-readable control plane:

| Field | Meaning |
| --- | --- |
| Technical availability | Capability/connection and deterministic schedule or mechanism work at their seam. |
| Adoption | the operator/affected operator has actually used the intended workflow enough to assess fit. |
| Fidelity and burden | The workflow follows its contract without unacceptable cognitive, time, financial, privacy, or support cost. |
| Outcome | The target condition improved against its baseline; proxy movement alone is insufficient. |
| Sustainment / decay | The system remains operable, supported and recoverable; state the next reset/review trigger. |

Measure a small quantitative set wherever practical: a baseline and outcome
measure (lagging), plus leading measures such as successful handoffs, timely
approval, use, clarification rate, error/retry rate, support burden, and
workaround/avoidance frequency. State the expected delay and protect against
Goodhart: none of these process counts is the objective.

### 3. Require an interface and change packet, not a dashboard-only process

For every material handoff or change, make a human-readable record containing:

- purpose/root driver and non-goals; decision rationale and source evidence;
- assumptions and ambiguities, their provenance, confidence, and clarification
  owner; an incorrect assumption creates a corrective learning item at its source;
- actors, authority, source of truth, and interface contract; including the
  inputs/outputs, timing, completion evidence, failure and degraded behaviour;
- readiness/capacity, incentives/opportunity costs, friction, and relevant
  physical-environment conditions;
- baseline, leading/lagging measures, expected delay, review date, and
  success/abort criteria;
- pilot/rollout plan, user support, feedback route, rollback route, maintenance
  owner, anti-decay reset condition, and legacy-object disposition.

This is the practical analogue of the user's OpenAPI comparison: it does not
pretend every human situation is machine-specifiable, but it eliminates hidden
responsibility and implicit handoff behaviour where explicit contracts are
possible.

### 4. Apply a legacy and reversal discipline

Before an approved change takes effect, inventory objects and practices governed
by the old version. Generate a zero-effect migration proposal with counts and
per-object disposition; preserve originals and provide compatibility/rollback
until the new path is verified. The post-change review must determine whether the
original rationale still holds, what evidence changed, and whether the change
should be retained, revised, reversed, superseded, or retired.

## Limits and open design choices

- Much of the empirical literature is healthcare implementation science. Its
  categories are portable; its effect sizes and interventions are not direct
  predictions for one person's agent-operated life system.
- Lewin's named model and AHRQ's guide are useful frameworks/practice guidance,
  not proof that a fixed sequence guarantees adoption. Use the lifecycle as a
  checklist for missing conditions, not as bureaucracy.
- "Resistance" is not automatically valid feedback: it is a signal to inspect.
  The response can be a system change, clearer rationale, support, a different
  environment, a scope reduction, or a consciously retained constraint.
- A three-week review can be a sensible default experiment window for a
  habit-like system only when its expected effect is observable in that period.
  The change packet must state its actual expected delay; a premature review can
  cause damaging retuning.
