# Thinking in Systems — source design

Status: design input; no skill has been implemented.

## Purpose

Thinking in Systems is a system for designing systems. It should help an agent and a human apply an engineer's mindset to almost any non-trivial request without treating life, organizations, or physical environments as if they were merely software.

The method is the maintainer's distilled way of thinking: begin from intent, define the system rather than patching a visible symptom, make every interface clear, use each kind of mechanism where it is strongest, prove the actual outcome, and improve the system when reality disagrees.

## Constitutional principles

1. **Intent before requested form.** Discover the underlying problem, opportunity, value, or constraint. Treat the requested tool or artifact as a hypothesis.
2. **Outcome before tool.** Consider doing nothing, waiting, changing the environment or process, configuring a maintained solution, and custom construction. Use satisficing, 80/20 leverage, opportunity cost, reversibility, maintenance cost, and option value.
3. **Every handoff is a contract.** Inputs, outputs, ownership, authority, state, failure behavior, and proof must be unambiguous enough that two competent readers reach the same operative interpretation.
4. **Use each mechanism where strongest.** Models interpret and synthesize bounded ambiguity. Deterministic mechanisms own durable state, clocks, schemas, approvals, retries, invariants, and effect gates.
5. **Design for the lowest common denominator.** The system must work for the least-resourced realistic operating condition, including low energy, missed briefings, interruptions, and a month without response.
6. **Everyone will not just.** Repeated remembering, noticing, caring, checking, or willpower is a design dependency to reduce when possible. Align incentives and friction with the intended outcome.
7. **Every little action can move the line forward.** Tiny or incidental actions should accumulate into outcome progress, preserved state, reusable evidence, or an easier next action. Intentional productivity and incidental progress remain distinct.
8. **Failure is evidence.** Begin with empathetic, blameless analysis of fit, incentives, information, environment, capability, interface, and authority. Responsibility may still matter, but blame is not a substitute for diagnosis.
9. **Operate in fog.** Reduce uncertainty when information is worth its cost, then stop sharpening and act. When uncertainty cannot be eliminated, define strategy, feedback, safe modes, thresholds, reversibility, escalation, and recovery.
10. **Proof precedes effect.** Testing composes the same decisions and artifacts as live operation without performing external effects. Approval and effect boundaries remain deterministic and inspectable.
11. **Change includes legacy state.** A changed rule, schema, expectation, interface, or source is incomplete until existing affected items are discovered, migrated, explicitly exempted, or retired.
12. **Systems decay.** Define health, evidence, reset, recovery, review cadence, retirement, and how a human can inspect current state without asking a model.

## Proportional branches

| Branch | Trigger | Required result |
| --- | --- | --- |
| Direct operation | Bounded, reversible request with obvious proof | Lightweight execution contract and visible result |
| Existing contract | An accepted system already governs the work | Governing version, material assumptions, authority, and result |
| New durable system | Recurrence, durable state, automation, or repeated failure | Complete system record and proof plan |
| Material change | Scope, interface, authority, rule, environment, evidence, or legacy population changes | Successor design and legacy disposition |
| Recovery or remediation | System is degraded, stale, blocked, inherited, or failing | Truthful status, preserved value, safe mode, bounded repair, and reset path |

The systems lens remains present on every branch; artifact burden scales with consequence and persistence.

## Universal entry check

Before proposing or acting, establish proportionately:

- original request and underlying intent;
- outcome, non-outcomes, scope, and good-enough threshold;
- authority, effects, privacy, reversibility, and approval boundary;
- stated facts, source-backed context, inferences, assumptions, and unknowns;
- implied systems, actors, sources, or constraints not yet made explicit;
- incentives, friction, physical and digital environment, and likely failure modes;
- lowest-common-denominator operation, degraded mode, recovery, and no-response behavior;
- proof seam, baseline, expected change, burden measure, review point, and stop rule.

Ask the smallest discriminating question when an unresolved answer could materially change the result. Improve the durable source after correction so the same ambiguity does not recur indefinitely.

## Strategy and plans

A plan says what will be done under current assumptions. A strategy says how choices will be made as conditions change. Systems must contain both where appropriate.

When fog is irreducible, a complete strategy can still specify:

- what observations matter;
- which decision rules apply;
- acceptable operating envelope and thresholds;
- which actions are reversible or pre-authorized;
- when to pause, degrade, escalate, or recover;
- how state and rationale remain visible;
- what would justify revising the strategy.

This is why Wayfinder must not require every unknown to become a fully resolved ticket.

## Human and formal representations

Markdown owns intent, rationale, definitions, examples, and human-readable contracts. Decision tables, schemas, pseudocode, or TypeScript-like notation express deterministic boundaries where precision helps.

Every model-judgment boundary specifies:

```ts
type JudgmentBoundary<Input, Output> = {
  input: Input
  governingSources: Source[]
  rubric: Criterion[]
  output: Output
  uncertainty: "proceed" | "compose-only" | "clarify" | "pause"
  correctionPath: CorrectionContract
  effectAuthority: HumanOrDeterministicGate
}
```

This notation is illustrative, not an instruction to turn all systems into software.

## Measurement and learning

- Measure the intended outcome, not merely activity. Name Goodhart's and Campbell's laws where relevant.
- Prefer quantitative, low-burden evidence when possible; preserve qualitative evidence when the outcome cannot be reduced honestly.
- Establish a baseline, expected direction, process measure, burden or harm measure, review point, and exit criterion before activation.
- Prefer distributions and trend lines over recency-biased reactions to an ordinary outlier.
- Treat catastrophic, safety-critical, rights-violating, or irreversible outliers immediately even when the aggregate trend is positive.
- Use PDSA: plan the theory, make the smallest credible change, study the outcome and burden, then retain, revise, expand, reset, or retire.

## Informed exceptions

A user with authority may bypass the process. Before proceeding, surface:

1. the safeguard being skipped;
2. the plausible consequence;
3. the affected scope and duration;
4. the review or recovery trigger.

Respect the informed decision without coercion or shame. Record it only in proportion to its consequences.

## System prototype

A prototype answers one material question using the smallest reversible experiment that can produce credible evidence.

Examples across domains:

- software: a throwaway vertical slice against the real debugging seam;
- personal life: rearrange one physical environment and measure friction before buying or building a tool;
- organization: pilot one handoff form with one team before changing the company process;
- agent system: compose proposed effects and approvals without sending or mutating anything;
- policy: simulate representative cases and legacy impact before adoption.

Every prototype declares its question, assumption, scope, time or evidence budget, proof seam, stopping rule, and replacement or rollback path.

## Remediation

For an existing system:

1. Inventory sources, actors, state, behavior, constraints, valuable working parts, failures, and unknowns.
2. Identify the highest-leverage broken seam using outcome evidence rather than disgust or aesthetics.
3. Preserve working behavior and data.
4. Design one bounded correction and its legacy impact.
5. Prove it at the real seam.
6. Promote, revise, restore, or retire based on evidence.

The goal is to bring the system to the accepted standard, not to justify rebuilding it.

## Examples and evaluations

The eventual skill should include paired good/bad examples and separate behavioral evaluations for at least:

- a spelling correction that remains lightweight;
- an ambiguous email request producing an unsent, assumption-linked draft;
- intentional leisure versus incidental progress;
- a low-energy household system that does not rely on remembering;
- a custom-build impulse where waiting or a maintained solution has higher option value;
- an apparently small scope expansion that changes estimate and proof obligations;
- a missing capability that preserves resumption state instead of claiming completion;
- a rule change that discovers and simulates legacy impact;
- a month without response where only pre-authorized ambient work continues;
- an implied existing process that causes one precise clarification and a durable correction;
- an informed exception;
- a positive trend with one harmless outlier versus one severe outlier;
- a judgment-heavy classification with explicit evidence, uncertainty, correction, and effect gates;
- a system operating successfully under irreducible fog.

## Progressive disclosure candidate

The exact file split is decided during authoring. A current candidate is:

```text
skills/thinking-in-systems/
├── SKILL.md
├── agents/openai.yaml
├── references/
│   ├── standard.md
│   ├── decision-patterns.md
│   ├── formalization.md
│   ├── proof-recovery-and-change.md
│   ├── remediation.md
│   ├── examples-and-evals.md
│   ├── sources.md
│   └── setup.md
└── templates/
    ├── system-record.md
    └── remediation-record.md
```

Do not create every file ceremonially. A file earns existence only when a real branch needs its content behind a precise context pointer.

## Public boundary

The public method contains no named personal assistant, personal operating policy, task or knowledge platform preference, employer material, private approval identity, local path, or user-specific source-of-truth rule. It prompts the local operator to supply governing policy instead of prescribing a knowledge system.

The private setup may later add a managed standing trigger so the systems lens is invoked broadly. That configuration is not part of initial public skill implementation and cannot be applied automatically by skills.sh.
