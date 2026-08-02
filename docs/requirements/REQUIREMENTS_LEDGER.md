# Requirements ledger

Status: authoritative design input for the public skill suite.

This ledger records the maintainer's operative requirements from the complete design conversation. It exists so a new task can verify coverage instead of trusting a summary or conversation memory. The complete method is in [the universalized S01 standard](../source/THINKING_IN_SYSTEMS_STANDARD.md); this file owns repository- and skill-suite-specific requirements added around it.

## Identity, purpose, and public outcome

| Requirement | Durable owner |
| --- | --- |
| Public anchor name is **Thinking in Systems**; slug `thinking-in-systems`. | Skill frontmatter and README |
| The method is the maintainer's “secret sauce”: roughly 1.5 years of learning how to think, work, and design almost anything, credited by the maintainer for rapid progress. | README |
| Publishing the skill should help other people develop an engineer's mindset; installing it does not replace reading, understanding, practicing, and improving the method. | README and skill introduction |
| The method applies across technical, personal, organizational, physical, and agent environments. It must not become coding-specific or life-specific. | Complete standard and evaluations |
| The public repository uses the `JustYannicc` identity, MIT on GitHub, and accepted MIT-0 distribution on ClawHub. | License and distribution docs |
| Public skills must not expose personal assistant names, private operating policy, task/knowledge tool preferences, employer material, credentials, or local paths. | Root instructions and public-boundary checks |

## Systems worldview

| Requirement | Durable owner |
| --- | --- |
| Design systems rather than one-off solutions; every non-trivial agent interpretation, decision, preparation, or action is a proportionate system interaction. | Complete standard §§2–4 |
| Discover intent and root cause before accepting the requested role, tool, or artifact. Treat the request as a proposed means. | Universal entry check |
| Outcome before tool: compare doing nothing, waiting, environment/process change, configuration, maintained solutions, and custom work. | Economic guardrails |
| Use 80/20, satisficing, opportunity cost, option value, sunk-cost separation, loss aversion, and reference classes without turning them into slogans or rigid laws. | Decision patterns and sources |
| Incentives are a primary design material. Align low-energy incentives and friction with the accepted outcome; expose rather than exploit loss aversion. | Constitutional rules and examples |
| “Everyone will not just”: repeated remembering, noticing, caring, checking, or willpower is a compliance dependency to remove where possible. | Constitutional rule 22 |
| The best systems allow ambient progress: tiny and sometimes incidental actions move the line forward while material authority and state remain inspectable. | Intentionality/ambient-progress sections |
| Intentional productivity is intentional use toward an accepted end, including rest or leisure. Incidental progress remains useful but is not retroactively relabeled as intentional. | Complete standard §1 |
| Empathy is mandatory in system failure: investigate fit, incentives, information, environment, capability, interfaces, and authority before blame. Failure is evidence, not a reason for shame. | Constitutional rules, remediation, examples |
| “How you do anything is how you do everything” becomes an informed-exception protocol. A user may bypass safeguards after consequences, scope, and recovery are explicit. | Informed-exception reference and evaluations |

## Operation under reality

| Requirement | Durable owner |
| --- | --- |
| Design for the lowest common denominator, including low energy, reduced initiation, interruption, missing services, ambiguity, and a month without response. The minimum path is a floor, not a ceiling. | Constitutional rule 2 and mode contract |
| Graceful degradation is normal operation. Define Normal, Degraded, Paused, and Recovery where applicable; preserve state and prevent cascades. | Standard §§6 and 9 |
| Systems must be recoverable after prolonged non-use without reconstructing context or punishing the user with an unbounded backlog. | Recovery proof cases |
| Systems decay immediately. Define healthy baseline, decay signals, meaningful reset, reset proof, replacement, and retirement. | Anti-decay lifecycle |
| A reset restores the accepted healthy baseline and restarts the decay clock without erasing history. | Anti-decay lifecycle |
| Changes apply to legacy items. Every changed expectation, process, schema, interface, or rule discovers affected existing state and records migration, conflicts, exemptions, unknown coverage, and rollback. | Change and Legacy Record |
| One-off outliers matter less than trend and direction of travel, except catastrophic, safety-critical, rights-violating, or irreversible outliers. | Measurement reference and evaluations |
| Quantitative, low-burden evidence is preferred where possible because human vibes are vulnerable to recency and state bias. | Measurement plan |
| Before/after behavior must be measurable and tied to the actual outcome, with process and burden/harm counter-signals. | Measurement plan |
| A roughly three-week check may be an early feasibility observation only when evidence can exist; it is not a universal habit rule. | Measurement reference |

## Contracts, judgment, and representation

| Requirement | Durable owner |
| --- | --- |
| Every handoff should behave like a clear API contract: input, output, owner, authority, state, timing, failure behavior, and proof. | Standard and Handoff skill |
| If two competent readers derive different operative meanings, the contract is still ambiguous. | Ambiguity rule and completion gate |
| Detect implied systems, sources, actors, constraints, and assumptions—not only explicit ambiguity. Ask the smallest discriminating question and improve the durable source after correction. | Universal entry check and evaluations |
| Assumptions are visible with provenance. When wrong, trace the failed inference to its source, rule, interface, or missing fact and repair the governing cause. | Execution contract and correction loop |
| Use models for bounded interpretation, synthesis, classification, and composition; deterministic mechanisms own clocks, state, schemas, approvals, retries, invariants, reconciliation, and effects. | Constitutional rule 8 |
| Human-readable Markdown owns intent, meaning, rationale, and examples. Schemas, decision tables, pseudocode, or TypeScript-like forms express states, transitions, permissions, invariants, and effect gates where useful. | Human/machine contract layers |
| Every judgment boundary identifies inputs, governing sources, rubric/evidence, output, uncertainty behavior, correction path, and effect authority. | Formalization reference |
| Every material state must be human-readable without asking a model; dashboards and activity views remain projections linked to canonical evidence. | Constitutional rule 15 |
| One writable authority exists per information type; generated views and types carry source version/hash and freshness. | Human/machine contract layers |

## Design and proof process

| Requirement | Durable owner |
| --- | --- |
| Apply proportional mise en place: prepare context, materials, tools, permissions, environment, proof seam, fallback, and resumption state. | Lifecycle and System-Design Template |
| Axe sharpening has a stopping rule. When required readiness passes and action produces more decision value, begin the smallest safe experiment. | Preparation/value-of-information gate |
| Test by composing exactly what live operation would decide and produce while disabling external effects. Testing that merely watches is useless. | Simulation Approved gate |
| Good and bad examples should be paired at the decision seam. Some examples teach; a separate set evaluates whether the model actually follows the method. | Examples/evaluations reference |
| Run one independent risk-proportionate adversarial review plus one separate resolution check. Avoid endless review of absurd cases. | Design Complete gate |
| Record decisions with their original framing, alternatives, assumptions, reasoning, expected consequences, and review conditions. | Decision record |
| Existing systems need a cross-domain remediation path: inventory reality, preserve value, find the highest-leverage broken seam, prove one bounded correction, and migrate legacy state. | Remediation reference |
| Loop and graph engineering should emerge from clear feedback, state, actors, dependencies, and seams. They are not mandatory named phases. | Architecture and evaluations |
| Subagent orchestration should emerge where work has independently acceptable contracts and one integration owner. | Architecture and orchestration examples |

## Skill-suite architecture

| Requirement | Durable owner |
| --- | --- |
| Every skill has one job. Do not solve dependency limitations by creating one mega-skill. | Root instructions and architecture |
| Current skill formats do not support transitive skill dependencies. Cross-skill relationships name capabilities; setup installs the intended suite explicitly; missing companions degrade honestly. | Distribution research and setup |
| Thinking in Systems owns the universal systems thesis and invariants, not the complete interview, research, prototype, wayfinding, handoff, implementation, or review workflow. | Architecture |
| Universal Wayfinder should keep destination-first mapping, blockers, frontiers, durable continuation, and as much useful upstream behavior as possible while removing repository/tracker assumptions. | Wayfinder task brief |
| Wayfinder must support irreducible fog. A strategy defines how decisions are made as reality changes; a plan states current actions. Completion cannot require all fog to disappear. | Wayfinder task brief and architecture |
| Universal Research should remove repository/coding assumptions and work across all supported domains with appropriate evidence standards. | Research task brief |
| Prototype must support reversible real-world, process, policy, environment, organizational, and agent experiments. Software prototypes may continue to use the specialized code skill. | Prototype task brief |
| Handoff must preserve state, authority, rationale, uncertainty, evidence, and frontier across humans, agents, sessions, and operational systems. | Handoff task brief |
| Batch Grilling is preferred for independent frontier questions. Dependent questions remain sequential. Align it with intent and systems without absorbing Wayfinder. | Batch Grilling task brief |
| Domain Modeling should remain unchanged unless a focused audit finds a real universal gap. | Upstream assessment |
| Software TDD remains specialized. Its universal proof-at-seams principles belong in Thinking in Systems unless evidence justifies a separate cross-domain proof skill. | TDD boundary |
| The useful lifecycle is wayfind/grill → specify → decompose → execute → review → learn/change. Its public form must work beyond engineering. | Roadmap |
| A later maintainer-query skill and a setup workflow are separate jobs. | Roadmap |

## Repository, setup, and publication

| Requirement | Durable owner |
| --- | --- |
| The complete approved S01 method and reusable template must live in the repository. A compressed summary or external chat context is insufficient for authoring the skills. | `docs/source/` and mandatory read order |
| Prefer preserving more public-safe source material in the repository and trimming later. Retain the complete universalized authorities, full skill design, relevant supporting research, and source fingerprints. | `docs/source/` archive and preservation rule |
| Exact historical material remains private when it contains personal policy, local paths, or private configuration. Preserve fingerprints and transferable meaning without leaking personal defaults, credentials, or employer-confidential material. | Public boundary and publication verification |
| Every operative correction and skill-suite requirement from the design conversation must be mapped to a durable owner before a handoff can claim completeness. | This ledger and handoff verification |
| README contains a section for every implemented skill and explains what it does and when to use it. | README and contribution checks |
| Matt Pocock's skills are a major inspiration. Record inspected revision, license, retained behavior, and whether each successor is a close adaptation or independently written. | Upstream assessment and per-skill sources |
| Every implemented skill includes `agents/openai.yaml`; its invocation policy is chosen and tested, not copied. | Development setup |
| Vercel `skills init` creates only `SKILL.md`; `agents/openai.yaml` is authored separately. | Distribution research |
| First-release setup guidance documents exact multi-skill installation and standing triggers. skills.sh cannot automatically edit global instructions. | Setup design |
| Any future managed instruction block must preview, preserve human edits, fail closed on corrupt markers, support status/update/remove/rollback, and verify behavior. | Setup reference |
| Private/global agent configuration changes happen only after the public replacement is behaviorally proven and pinned. | Public/private boundary |
| Publish accepted skills through skills.sh and independently through ClawHub; record each release because channels do not synchronize. | Distribution workflow |

## Explicitly deferred

The following are real requirements but belong to later tasks:

- exact names and final roster of companion skills;
- exact invocation descriptions and model/user invocation policy;
- whether each upstream adaptation is a close fork or an independent successor;
- exact universal names replacing engineering-only `to-spec`, `to-tickets`, `implement`, and `code-review` where necessary;
- setup as documentation, a skill, a script, an OpenAI plugin, or a reviewed combination;
- private global standing-trigger migration and removal of the obsolete private predecessor.
