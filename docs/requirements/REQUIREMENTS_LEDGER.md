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
| The public repository uses the `JustYannicc` identity and MIT license and publishes through skills.sh only. | License and distribution docs |
| Public skills must not expose personal assistant names, private operating policy, task/knowledge tool preferences, employer material, credentials, or local paths. | Root instructions and public-boundary checks |

## Systems worldview

| Requirement | Durable owner |
| --- | --- |
| Apply systems thinking to every interpretation, decision, preparation, or action. A one-time handoff or bounded operation may be a System; recurrence changes persistence and lifecycle obligations, not applicability. | Complete standard §§1–4 |
| Discover intent and root cause before accepting the requested role, tool, or artifact. Treat the request as a proposed means. | Universal entry check |
| Outcome before tool: compare doing nothing, waiting, environment/process change, configuration, maintained solutions, and custom work. | Economic guardrails |
| Use the Pareto principle / 80–20 to prioritize search, Satisficing / good enough to define adequacy, and Marginal analysis to decide whether further search, preparation, scope, or capacity is worthwhile. Keep these distinct from Pareto improvements, Opportunity cost, option value, sunk-cost separation, loss aversion, and reference classes. | Standard §3 and concept sources |
| Treat hard and soft Constraints, the feasible set, and evidence-backed Actor Preferences as first-class design inputs. Inspect substitution effects when relative cost, friction, access, delay, or availability changes; a Preference is not a Requirement or Authority grant. | Standard §§2–4 and concept sources |
| Model fixed, variable, Marginal, and average total cost when recurrence, capacity, or scale can change the decision. Minimum efficient scale applies only to comparable repeated Outcome units with a credible long-run cost relationship; monetary conversion needs evidence and must not hide non-monetary burdens. | Standard §3 and System Record template |
| Identify Externalities crossing the selected decision boundary. A local improvement that exports material cost, burden, risk, or benefit must be represented in the decision, assigned to an accountable owner, or explicitly accepted within Authority. | Standard §§3–4 and System Record template |
| Prefer reversible interventions when they can satisfy the Outcome without an unacceptable trade-off. When an irreversible or costly-to-reverse effect is necessary, require exact Authority, tested assumptions, stronger pre-effect proof, accepted consequences, the least-irreversible feasible scope, and honest mitigation or recovery without inventing rollback. | Standard §3 and System Record template |
| Incentive structures are a primary design material and first-line failure diagnostic. When behavior diverges from intent, inspect actual rewards, costs, constraints, defaults, information, consequences, and alternatives before blaming an Actor. Omitting a material incentive is a System-design failure; expose rather than exploit loss aversion. | Standard §4 and concept sources |
| “Everyone will not just”: repeated remembering, noticing, caring, checking, or willpower is a compliance dependency to remove where possible. | Constitutional rule 22 |
| The best systems allow ambient progress: tiny and sometimes incidental actions move the line forward while material authority and state remain inspectable. | Intentionality/ambient-progress sections |
| Intentional productivity is intentional use toward an accepted end, including rest or leisure. Incidental progress remains useful but is not retroactively relabeled as intentional. | Complete standard §1 |
| Empathy is mandatory in system failure: investigate fit, incentives, information, environment, capability, interfaces, and authority before blame. Failure is evidence, not a reason for shame. | Constitutional rules, remediation, examples |
| “How you do anything is how you do everything” becomes an informed-exception protocol. A user may bypass safeguards after consequences, scope, and recovery are explicit. | Informed-exception reference and evaluations |

## Operation under reality

| Requirement | Durable owner |
| --- | --- |
| Design for the weakest realistic condition supported by the System's context, including reduced human or machine capacity, interruption, missing services, ambiguity, or delayed response when relevant. The minimum path is a floor, not a ceiling. | Mode contract |
| Graceful degradation is normal operation. Define Normal, Degraded, Paused, and Recovery where applicable; preserve state and prevent cascades. | Standard §§6 and 9 |
| Systems must be recoverable after prolonged non-use without reconstructing context or punishing the user with an unbounded backlog. | Recovery proof cases |
| Systems decay immediately. Define healthy baseline, decay signals, meaningful reset, reset proof, replacement, and retirement. | Anti-decay lifecycle |
| A reset restores the accepted healthy baseline and restarts the decay clock without erasing history. | Anti-decay lifecycle |
| Changes apply to legacy items. Every changed expectation, process, schema, interface, or rule discovers affected existing state and records migration, conflicts, exemptions, unknown coverage, and rollback. | Change and Legacy Record |
| One-off outliers matter less than trend and direction of travel, except catastrophic, safety-critical, rights-violating, or irreversible outliers. | Measurement reference and evaluations |
| Quantitative, low-burden evidence is preferred where possible because human vibes are vulnerable to recency and state bias. | Measurement plan |
| Before/after behavior must be measurable and tied to the actual outcome, with process and burden/harm counter-signals. | Measurement plan |
| Choose every observation window from the mechanism's expected evidence delay and the decision it must inform; no fixed duration transfers across Systems by default. | Measurement reference |

## Contracts, judgment, and representation

| Requirement | Durable owner |
| --- | --- |
| Every handoff should behave like a clear interface contract: input, output, Ownership, bounded Responsibility, Authority, state, timing, failure behavior, and proof. Parent Ownership survives delegation unless explicitly transferred and accepted. | Standard and Handoff skill |
| Durable System Records index every known material Containing, Subsystem, Upstream, Dependent, Peer, or other relationship and link to—rather than duplicate—the relevant interface or handoff contract. Unknown relationships are recorded only when the uncertainty is material. | Standard §4 and System Record template |
| If two competent readers derive different operative meanings, the contract is still ambiguous. | Ambiguity rule and completion gate |
| Detect implied systems, sources, actors, constraints, and assumptions—not only explicit ambiguity. Ask the smallest discriminating question and improve the durable source after correction. | Universal entry check and evaluations |
| Assumptions are visible with provenance. When wrong, trace the failed inference to its source, rule, interface, or missing fact and repair the governing cause. | Execution contract and correction loop |
| Use LLMs for bounded interpretation, synthesis, classification, and composition; deterministic mechanisms own clocks, state, schemas, approvals, retries, invariants, reconciliation, and effects. | Standard LLM and deterministic boundary |
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
| Domain Modeling preserves the useful upstream method in a universal successor because the upstream storage and code-reference contract is repository-specific. | Upstream assessment and Domain Modeling task brief |
| Universal proof-at-seams principles belong in Thinking in Systems; the suite does not require or name a software-specific testing workflow. | Thinking in Systems boundary |
| Universal Review applies to every result, including code. No code-review skill is bundled; Setup may configure user-selected Supplemental reviewers whose specialist findings enrich rather than replace the universal verdict. | Review and Setup task briefs |
| Every core skill may expose governed Extension points for user-selected Supplemental skills. Configuration remains outside the core, and the core retains its responsibility and completion criterion. | Workflow and Setup task briefs |
| To Questionnaire retains its upstream behavior with model invocation enabled so Workflow may invoke it when another person holds required knowledge; Setup installs it explicitly from the configured source. | Questionnaire and Setup task briefs |
| The public names are `workflow`, `ask-yannic`, and `setup-system-thinking`. | Roster and per-skill frontmatter |
| `migrate-system` owns Conformance migration. Workflow automatically invokes it when a material conformance gap is detected; the resulting effects still require appropriate authority and approval. | Workflow and Migration task briefs |
| Setup directly installs `to-questionnaire`, `research`, and `batch-grill-me` from Matt Pocock's pinned source and applies only declared, hashed overlays for invocation and capability-aware portability. | Setup manifest and overlay verification |
| `domain-modeling` and `handoff` are universal successors under their existing names. `writing-great-skills` remains an unchanged upstream authoring prerequisite offered through an optional authoring profile. | Roster, Setup, and per-skill sources |
| The accepted runtime roster contains exactly the 16 skills and one-job boundaries recorded in `docs/SUITE_ROSTER.md`. | `docs/SUITE_ROSTER.md` |
| Setup teaches the lifecycle, responsibility model, automatic migration, and Extension/Supplemental model while configuring them; installation without verified user-visible operating guidance is incomplete. | Setup task brief |
| `ask-yannic` version one explains routes only. A future coworker-facing representation of Yannic's judgment is separately designed with source, authority, uncertainty, privacy, update, and correction boundaries. | Ask Yannic task brief and deferred roadmap |
| Setup writes the standing entry to each selected harness's effective instruction file at the chosen scope: for example `AGENTS.md` for Codex-style targets or `CLAUDE.md` for Claude-style targets. It verifies precedence, edits the narrowest active source, and never mutates another scope implicitly. | Setup task brief and managed-block contract |
| Every request loads `thinking-in-systems` before `workflow`; skill-description matching is discovery support rather than the activation guarantee. | Managed instruction entry and routing evaluations |
| Thinking in Systems and `'Workflow'` are capability instructions the same agent may apply together. Their result boundary does not imply separate agents or transfer parent responsibility. | Thinking in Systems and Workflow runtime instructions |
| Runtime phase skills are model-invoked; `ask-yannic` and `setup-system-thinking` are user-invoked. | Per-skill frontmatter and `agents/openai.yaml` |
| Inline and Durable modes use the same method, responsibility, and Review. Persistence changes representation rather than whether the workflow applies. | Workflow routing contract |
| Workflow owns the canonical route model; Ask Yannic explains it without executing it. | Workflow route reference and Ask Yannic context pointer |
| Workflow routes discovery by uncertainty: terminology to Domain Modeling, user-held decisions to Batch Grilling, persistent fog to Wayfinder, external facts to Research, empirical design questions to Prototype, and another person's knowledge to Questionnaire. Wayfinder starts with Domain Modeling and Batch Grilling. | Workflow routing contract and Wayfinder task brief |
| Every Outcome has a semantic Specification, but `to-spec` creates a durable artifact only after a relevant persistence, approval, assignment, multi-phase, or meaningful-risk boundary, or on explicit request. | Workflow routing contract and Specification task brief |
| Every executable unit is semantically a Ticket, but `to-tickets` creates durable Tickets only when decomposition, delegation, dependency, concurrency, cross-session work, or another persistence requirement warrants them. | Workflow routing contract and Ticket task brief |
| Universal Review always runs at the accepted proof seam; rigor scales with risk, and Workflow remains responsible for effect verification and the parent Outcome's terminal condition. | Workflow routing contract and Review task brief |
| Migration is a bounded mapping capability within the ordinary Workflow, not a parallel lifecycle or responsibility system. It uses the same universal artifacts and may invoke Wayfinder only for persistent fog. | Workflow routing contract and Migration task brief |
| Workflow resumes a matching open Outcome rather than duplicating it, and distinguishes resume, replacement, and related work when the relationship is uncertain. | Workflow routing contract |
| Direct phase requests still pass through Workflow for prerequisite checks and return to Workflow's parent Outcome responsibility. | Workflow routing contract |
| Independent discovery may run concurrently or through delegation; dependent discovery remains sequential, and Workflow integrates all findings. | Workflow routing contract |
| Users may make informed exceptions that skip or compress artifacts and phases, but systems thinking, responsibility, and verification remain active proportionately. | Workflow routing contract and Thinking in Systems informed-exception rule |
| Active Workflow context prevents recursive parent workflows: invoked phases and migration workers join the existing Outcome, own bounded child results, and return evidence to the coordinator. | Workflow routing contract |
| Missing skills or host capabilities produce visible Degraded mode. A safe equivalent is allowed only when it satisfies the same contract; otherwise Workflow records the gap and routes honestly to waiting, installation, or accepted handoff. | Workflow routing contract and degradation evaluations |
| Supplemental skills run only at configured Extension points; the core phase supplies inputs, integrates evidence, and retains its completion criterion. | Workflow routing contract and Extension-point contract |
| Waiting remains actively owned: short waits are observed directly, longer waits receive durable resumption or monitoring when supported, and unsupported automatic resumption requires an accepted handoff with an exact next check. | Workflow routing contract and continuation contract |
| Related requests update or extend the active Outcome; switching to unrelated work first preserves the active Outcome's continuation state. | Workflow routing contract |
| Workflow selects the smallest route that can satisfy the Outcome contract. Explicit constraints and requested phases take precedence without permitting invented prerequisites or false completion. | `docs/WORKFLOW_ROUTING.md` |
| Accepted request authority governs effects: clear authorization avoids redundant confirmation, while drafts, ambiguity, changed revisions, and consequential effects outside granted authority require approval. | `docs/WORKFLOW_ROUTING.md` and effect-gate evaluations |
| Durable work in an existing scope without a current verified map invokes proportionate migration of the materially affected scope; unrelated exhaustive inventory must not block trivial work. | `docs/WORKFLOW_ROUTING.md` and Migration task brief |
| Completion includes learning and propagation into current-state and affected legacy records, with follow-up work or informed exceptions visible before terminal status. | `docs/WORKFLOW_ROUTING.md` and change-propagation evaluations |
| `docs/WORKFLOW_ROUTING.md` owns the canonical route. Setup's managed instruction and Ask Yannic point to it rather than maintaining duplicate routing rules. | Workflow, Setup, and Ask Yannic task briefs |
| The useful lifecycle is wayfind/grill → specify → decompose → execute → review → learn/change. Its public form must work beyond engineering. | Roadmap |
| A future coworker-facing representation of Yannic's judgment is separately designed from the version-one route guide; Setup remains a separate run-once installation job. | Ask Yannic and Setup task briefs |

## Universal work and responsibility

| Requirement | Durable owner |
| --- | --- |
| Every accepted Outcome and Ticket has one identifiable owner; delegation creates nested child responsibility while the parent owner retains integration and completion responsibility. | `docs/UNIVERSAL_WORK_CONTRACT.md` |
| Outcomes, Tickets, Maps, dependencies, claims, lifecycle state, evidence, and continuation have adapter-neutral meanings that apply across technical, personal, organizational, physical, communicative, and agent work. | `docs/UNIVERSAL_WORK_CONTRACT.md` |
| Git, GitHub, a hosted tracker, concurrent claiming, and executable scheduling are optional capabilities rather than workflow prerequisites. | `docs/UNIVERSAL_WORK_CONTRACT.md` and portability research |
| Simple synchronous work uses a transient conversation representation; crossing a session, actor, waiting, approval, or meaningful-risk boundary requires durable state. | `docs/UNIVERSAL_WORK_CONTRACT.md` |
| Claims coordinate active work but do not assign or transfer ownership. Stale work enters recovery instead of silently returning to the available frontier. | `docs/UNIVERSAL_WORK_CONTRACT.md` |
| Submission, delegation, approval, scheduling, and intermediate artifacts are non-terminal. Completion requires evidence at the accepted proof seam and exact result revision. | `docs/UNIVERSAL_WORK_CONTRACT.md` |
| Waiting work remains owned and records its dependency, unblock condition, next check, retry/escalation/expiry rules, scheduled action when present, and exact resumption action. | `docs/UNIVERSAL_WORK_CONTRACT.md` |
| Completing child Tickets does not complete their parent. The parent owner integrates evidence and verifies the parent's own terminal condition. | `docs/UNIVERSAL_WORK_CONTRACT.md` |
| Encountering a nonconforming system, project, workspace, or body of work automatically invokes `migrate-system`, which records and verifies actual current state in the universal contract. It may delegate independent mapping to subagents, but its owner integrates the result; discovered changes enter ordinary Workflow rather than being implemented during migration. | `docs/UNIVERSAL_WORK_CONTRACT.md` and migration-skill task brief |
| Outcome responsibility begins on accepted assignment or started execution; an actor lacking authority or capability must decline, negotiate scope, or arrange accepted transfer rather than silently accepting impossible responsibility. | Ownership lifecycle contract |
| The Outcome owner remains responsible across every phase, while each phase Work owner owns only its bounded result and cannot complete the parent by returning it. | Ownership lifecycle contract and phase-skill task briefs |
| Every Specification has an identifiable Approver for intent and material trade-offs; only low-risk Inline detail within delegated authority may be resolved without an approval gate. | Ownership lifecycle and Specification task brief |
| The Outcome owner proves collective Ticket coverage of Specification, dependencies, ownership, authority, and proof seams; Work responsibility attaches on acceptance or start. | Ownership lifecycle and Ticket task brief |
| Review has an explicit Reviewer; the Work owner resolves requested changes, the Outcome owner integrates evidence, and role distinctions remain explicit even when one actor holds several roles. | Ownership lifecycle and Review task brief |
| Discovery records facts, assumptions, decisions, unknowns, provenance, and confidence; material unresolved items block Specification or become explicit irreducible-fog operating rules. | Ownership lifecycle and discovery task briefs |
| Accepted Specifications and submitted results are revision-bound; Specification changes require impact analysis and invalidate only affected Tickets, approvals, evidence, and completed work. | Ownership lifecycle and change-control evaluations |
| `implement` ends by submitting the exact result revision and available effect evidence into Review, not by completing the Ticket or parent Outcome. | Implement and ownership lifecycle contracts |
| Review has integrated verified, changes-required, and inconclusive verdicts; inconclusive work enters waiting with missing evidence, owner, and an exact next check. | Review and ownership lifecycle contracts |
| Consequential effects may require pre-effect Review and approval; preparation, Review, approval, execution, and real-effect verification are distinct, and the Ticket remains non-terminal until effect proof. | Ownership lifecycle and effect-gate evaluations |
| Parent Review evaluates one exact integrated state containing the current Specification revision, required child dispositions, effect evidence, unresolved exceptions, and system changes; child Reviews cannot substitute for it. | Ownership lifecycle and parent-Review evaluations |
| Parent completion requires its own verified terminal condition; optional out-of-scope improvements may become related Outcomes, while required remediation, propagation, and recovery remain blocking. | Ownership lifecycle and completion evaluations |
| Accepted transfer ends the outgoing owner's responsibility without completing the Outcome; the incoming owner accepts exact continuation state and an auditable ownership transition is recorded. | Ownership lifecycle and Handoff task brief |
| Authorized cancellation records authority, rationale, partial effects, evidence, child dispositions, dependency consequences, and recovery or reversal needs. | Ownership lifecycle and cancellation evaluations |
| Failure is an event whose owner records a recovery disposition; failed or unreachable delegated work leaves recovery and integration responsibility with the parent owner. | Ownership lifecycle and recovery evaluations |
| Persistent and recurring Outcomes define a horizon, review cadence, transfer rule, or cancellation condition; scheduling the next occurrence is non-terminal and indefinite operating Outcomes remain owned. | `docs/OWNERSHIP_LIFECYCLE.md` |
| Later evidence that disproves completion appends a correction and reopens the affected record; genuinely new out-of-scope needs become related Outcomes. | `docs/OWNERSHIP_LIFECYCLE.md` and correction evaluations |
| Approval validity, expiry, revocation, and exact revision are rechecked immediately before an effect. | `docs/OWNERSHIP_LIFECYCLE.md` and approval evaluations |
| Completion produces a compact canonical proof bundle with exact revisions, actors, Review, approvals, effect evidence, exceptions, propagation, and terminal transition. | `docs/OWNERSHIP_LIFECYCLE.md` and completion evaluations |
| Stale Claims, missed checks, overdue Reviews, unreachable owners, and expired Continuations enter Recovery and require an authorized responsibility and next-action decision. | `docs/OWNERSHIP_LIFECYCLE.md` and recovery evaluations |

## Repository, setup, and publication

| Requirement | Durable owner |
| --- | --- |
| The complete approved S01 method and reusable template must live in the repository. A compressed summary or external chat context is insufficient for authoring the skills. | `docs/source/` and mandatory read order |
| Prefer preserving more public-safe source material in the repository and trimming later. Retain the complete universalized authorities, full skill design, relevant supporting research, and source fingerprints. | `docs/source/` archive and preservation rule |
| Exact historical material remains private when it contains personal policy, local paths, or private configuration. Preserve fingerprints and transferable meaning without leaking personal defaults, credentials, or employer-confidential material. | Public boundary and publication verification |
| The installed Thinking in Systems source guide maps professional concepts to public links for optional deeper reading. The full standard remains governing; private provenance, maintainer history, and evidence debates stay in repository governance records. | `skills/thinking-in-systems/references/sources.md` and source archive |
| Every operative correction and skill-suite requirement from the design conversation must be mapped to a durable owner before a handoff can claim completeness. | This ledger and handoff verification |
| README contains a section for every implemented skill and explains what it does and when to use it. | README and contribution checks |
| Matt Pocock's skills are a major inspiration. Record inspected revision, license, retained behavior, and whether each successor is a close adaptation or independently written. | Upstream assessment and per-skill sources |
| Rewritten successor skills begin from Matt Pocock's corresponding pinned skills and preserve compatible useful behavior before replacing non-universal assumptions. | Suite roster and per-skill provenance |
| Every implemented skill includes `agents/openai.yaml`; its invocation policy is chosen and tested, not copied. | Development setup |
| Vercel `skills init` creates only `SKILL.md`; `agents/openai.yaml` is authored separately. | Distribution research |
| First-release setup guidance documents exact multi-skill installation and standing triggers. skills.sh cannot automatically edit global instructions. | Setup design |
| Any future managed instruction block must preview, preserve human edits, fail closed on corrupt markers, support status/update/remove/rollback, and verify behavior. | Setup reference |
| One Setup run manages exactly one explicit project or global Installation scope; installing both requires separate explicit runs. | Setup task brief |
| Setup inspects the effective instruction chain, installed skills, capabilities, coordination options, existing configuration, and conflicts before presenting and confirming an exact write plan. | Setup task brief and instruction-file verification |
| Standard Setup installs the complete pinned core suite; Supplemental skills and the optional authoring profile are configured separately. | Setup manifest |
| One human-readable, scope-local configuration record outside core skill files owns source versions, overlays, Adapter selection, Supplemental mappings, capabilities, managed-block fingerprint, and rollback information. | Setup configuration contract |
| Setup manages only a marked block in each selected harness's effective instruction file, preserving surrounding content, previewing changes, retaining rollback state, and failing closed on corrupt markers. | Setup managed-block contract |
| After all installation, configuration, teaching, activation, and behavioral verification passes, Setup removes itself using the skills.sh `skills remove` operation at the selected scope and verifies its absence. Self-removal is the final successful action. | Setup completion criterion and removal evaluation |
| Installation scope and agent targets are separate: one run may configure one or more explicitly selected agent hosts within one scope, and each target is verified separately. | Setup target-selection contract |
| Matching installed skill fingerprints are preserved; conflicting sources, versions, or overlays require a visible replacement or update plan and confirmation. | Setup reconciliation contract |
| Setup is transactional: failure restores every prior instruction file and configuration record and removes only skills newly installed by that run, preserving pre-existing state. | Setup rollback contract and failure evaluations |
| Setup may be reinstalled for status, repair, update, removal, or rollback and removes itself again after a successful maintenance run. | Setup maintenance branches |
| Setup previews and creates each harness's scope-correct instruction file when absent and otherwise preserves all human-owned content outside its managed block. | Setup managed-block contract |
| Setup recommends an Adapter from the actual environment and user preference: Git-backed Local Markdown for a Git repository when appropriate, GitHub only for an actual GitHub-connected repository, plain Local Markdown or optional local Git outside a repository, and configurable conforming systems such as Todoist. | Setup Adapter-selection contract |
| Setup configures the Adapter but leaves Conformance migration to ordinary Workflow after activation. | Setup and Migration boundary |
| Supplemental mappings require declared Extension points and preview; name similarity never maps a skill automatically, advisory is the default, and required status is explicit. | Setup Supplemental configuration contract |
| Setup teaches the operating model and then gives the user a customization checkpoint before final confirmation. | Setup onboarding contract |
| Every selected harness target receives fresh-context behavioral verification, automated when supported or guided and user-observed otherwise, before Setup claims success or removes itself. | Setup activation proof matrix |
| In a Git repository, Setup recommends Git-backed Local Markdown unless the user prefers another Adapter; GitHub is offered only for an actual GitHub-connected repository, while non-repositories may use plain Local Markdown, authorized local Git initialization, or another Adapter. | Setup Adapter-selection contract |
| External systems such as Todoist may be canonical project Adapters only when their integration satisfies the universal Adapter contract; otherwise they remain derived views or Supplemental capabilities. | Setup Adapter-validation contract |
| Setup edits only verified effective harness instruction surfaces, writes one block to a shared surface, and exposes instruction conflicts instead of duplicating them. | Setup managed-instruction contract |
| Setup configures and verifies Adapter authentication and tools only within granted authority; unavailable access produces a portable fallback or incomplete Setup, never a false success. | Setup Adapter-authentication contract |
| Suite removal deletes only manifest-owned skills, managed instruction blocks, and suite configuration at the selected scope; Outcome records and user data are preserved absent a separate explicit choice. | Setup removal contract |
| Reinstalling Setup at project scope is the supported maintenance path for project-specific configuration such as a Todoist Adapter; success includes fresh verification and Setup self-removal. | Setup maintenance contract |
| Configuration layers by scope: project records override only declared keys, inherit remaining global settings, and are displayed as an effective merged configuration before change. | Setup configuration-resolution contract |
| Project maintenance reuses compatible global skills and standing activation, creating project-local copies or instruction blocks only for isolation, distinct versions or harnesses, or missing capability. | Setup reconciliation contract |
| Changing a canonical Adapter with existing records invokes ordinary Canonical migration before authority changes; Setup cannot replace the configuration pointer alone. | Setup Adapter-change contract and Workflow migration |
| Adapter providers are user-approved, pinned, and recorded separately from core and Supplemental skills; credentials stay in the host credential mechanism and configuration contains only a non-secret binding reference. | Setup provider and credential contract |
| Project verification proves its Adapter override takes precedence while non-overridden scopes continue inheriting global configuration. | Setup layered-configuration evaluations |
| Scope configuration is one human-readable Markdown source with a small machine-readable frontmatter block, serving agents and deterministic verification without duplicate authorities. | `docs/SETUP_CONTRACT.md` |
| Updates are explicit maintenance runs over pinned sources, preserving a last-known-good manifest, reapplying overlays, verifying behavior, and advancing pins only after proof. | `docs/SETUP_CONTRACT.md` and update evaluations |
| Managed instruction blocks carry a format version and fingerprint; unexpected drift requires explicit merge, adoption, or restoration. | `docs/SETUP_CONTRACT.md` and drift evaluations |
| A customization change loops Setup back through configuration and preview before verification. | `docs/SETUP_CONTRACT.md` and onboarding evaluations |
| Failed self-removal preserves the verified runtime, reports exact skills.sh retry and rollback options, and leaves Setup incomplete. | `docs/SETUP_CONTRACT.md` and disposal evaluations |
| Private/global agent configuration changes happen only after the public replacement is behaviorally proven and pinned. | Public/private boundary |
| Publish the reviewed public skill revision through skills.sh only. | Distribution workflow |
| Behavioral evidence outranks file presence and rule recall; each evaluation records revision, environment and capabilities, prompt, expected route, observed actions and state, proof seam, result, and failure evidence. | Validation contract |
| Model-invoked skills receive direct, indirect, incomplete-context, negative, and edge-case invocation tests; user-invoked skills receive explicit-invocation and default-non-invocation tests, with one-job completion and responsibility return checked in both. | Per-skill evaluation matrix |
| Composition tests cover Inline, communication, personal or organizational, software, migration, delegation, approval and effects, waiting and resumption, failure recovery, recurring Outcomes, Supplemental skills, and parent completion. | Composition evaluation matrix |
| Publication uses skills.sh as the installation boundary rather than maintaining a product-level harness allowlist. Setup discovers and verifies each current harness at runtime and degrades honestly when its instruction surface or capability is unavailable. | Clean-install and Setup evaluations |
| Required environments cover no Git or remote, Git without GitHub, GitHub-connected work, a configurable external Adapter, scheduling available and unavailable, Supplemental skills present and absent, and single-worker and delegated execution. | Validation environment matrix |
| Clean-install proof starts from an empty scope through skills.sh, verifies pins and overlays, runs and disposes Setup, reinstalls it for maintenance, and proves rollback and suite removal. | Clean-install proof matrix |
| Publication requires links, frontmatter, `agents/openai.yaml`, invocation metadata, public-boundary and credential scans, provenance and licenses, skills.sh discovery, clean installation, behavioral evaluations, one adversarial review, one resolution check, and a clean reviewed release revision. | Publication gate |
| External Adapters receive the universal conformance suite only when configured or advertised; Todoist does not block core publication unless the suite ships or claims a Todoist provider. | Adapter validation matrix |
| Behavioral fixtures assert observable invariants, routes, state, responsibility, proof, and forbidden premature completion rather than exact prose; required fixtures run in multiple fresh contexts. | Behavioral evaluation format |
| Every universal skill is evaluated in at least two materially different domains including a non-software case, while composition coverage spans every accepted domain. | Per-skill and composition matrices |
| One deterministic repository command validates layout, frontmatter, `agents/openai.yaml`, invocation policy, links, pins, overlays, provenance, licenses, public boundaries, credentials, skills.sh metadata, and generated freshness. | Repository validation command |
| Public release and private activation are separate gates; private/global migration occurs only afterward in a separately governed task. | Release and private-migration plan |
| Private activation snapshots and maps current configuration, previews changes, installs the pinned public revision, preserves private overrides outside core, proves fresh-context parity, and removes the obsolete predecessor only after equivalent or improved behavior passes. | Private activation proof plan |
| Evaluation fixtures live in one source-controlled tree grouped by skill and composition; release reports bind to exact revisions and retain traceable public-safe raw evidence when needed. | `docs/VALIDATION_AND_RELEASE.md` |
| Critical invocation and routing fixtures run at least three times in fresh contexts and any inconsistent route fails; lower-risk artifact fixtures may use one run plus deterministic checks until variance appears. | `docs/VALIDATION_AND_RELEASE.md` and runner configuration |
| Findings are Critical, Major, or Minor, and publication requires zero unresolved Critical or Major findings. | `docs/VALIDATION_AND_RELEASE.md` and release report |
| A release binds to one immutable Git revision and version, including all upstream and overlay fingerprints; published tags are never rewritten. | Release manifest and Setup pins |
| Public skills.sh discovery and one final clean public-source installation must pass after availability; failure blocks private activation and requires a new reviewed revision. | Publication and private-activation gates |

## Explicitly deferred

The following are real requirements but belong to later tasks:

- exact per-skill descriptions, steps, reference boundaries, metadata wording,
  and behavioral fixtures within the accepted invocation policy;
- exact retained and adapted behavior inside each universal successor;
- clean-install and cross-host proof of the accepted setup skill and managed
  instruction contract; and
- private global standing-trigger migration and removal of the obsolete private
  predecessor after public proof.
