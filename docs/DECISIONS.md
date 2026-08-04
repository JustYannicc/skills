# Decisions

## Accepted

### Repository and publication

- Repository: `JustYannicc/skills`.
- GitHub license and copyright identity: MIT, `JustYannicc`.
- Publication and installation channel: skills.sh only.
- The public repository is separate from private agent configuration.

### Skill architecture

- Public anchor name: **Thinking in Systems**; slug: `thinking-in-systems`.
- The existing private predecessor is obsolete. Remove it only after the public replacement is proven and the private migration is separately reviewed.
- Each skill has one job. Thinking in Systems is not a mega-skill.
- Cross-skill relationships are explicit capability references; there are no fictional package dependencies.
- Each implemented skill includes deliberately authored `agents/openai.yaml` metadata.
- Loop and graph engineering are emergent properties of clear systems, not separate mandatory phases or skills.
- “Subway orchestration” meant subagent orchestration.
- Both previously proposed Thinking in Systems descriptions are rejected; invocation wording will be authored and evaluated with the skill.

### Universalization direction

- Wayfinder should preserve as much useful behavior as possible while removing repository/ticket assumptions and treating persistent fog as a normal operating condition.
- Research should work across technical, personal, organizational, physical, and agent questions.
- Prototype should support reversible system/life experiments while delegating software prototypes to the existing code-focused procedure.
- Handoff should cover humans, agents, sessions, and operational systems.
- Batch Grilling is preferred over single-question Grill Me for the independent decision frontier, while later questions still wait when answers are dependent.
- Domain Modeling preserves the useful upstream method but becomes a universal successor because the upstream storage and code-reference contract is repository-specific.
- Universal proof-at-seams principles belong in Thinking in Systems; the public suite does not add a software-specific testing workflow.
- Universal Review applies to code as one possible execution medium. No code-review skill is bundled; Matt Pocock's version is design inspiration only. Setup may configure user-selected Supplemental reviewers whose findings enrich rather than replace the universal Review.
- Every core workflow skill may expose governed Extension points for user-selected Supplemental skills. Configuration lives outside the core so users can customize the suite without editing it; each core skill retains its job, responsibility, and completion criterion.
- To Questionnaire remains a universal discovery skill. Workflow may invoke it when another person holds the missing knowledge. The suite retains the upstream behavior and changes model invocation only, then Setup installs it explicitly from the configured source.
- The automatic coordinator is `workflow`, the user-invoked guide is `ask-yannic`, and the run-once installer/configurator is `setup-system-thinking`.
- `migrate-system` owns Conformance migration. Workflow detects a nonconforming system or workspace and invokes it automatically; invocation is automatic, while migration effects remain governed by scope, authority, reversibility, and approval.
- Setup installs `to-questionnaire`, `research`, and `batch-grill-me` directly from Matt Pocock's pinned source and applies only declared, hashed overlays for model invocation or capability-aware portability. The repository does not retain full copies of those skills.
- `domain-modeling` and `handoff` require universal successors under their existing names because their current storage, actor, and continuation contracts are narrower than the suite. `writing-great-skills` remains an unchanged upstream authoring prerequisite offered through an optional authoring profile.
- The 16-skill runtime roster and every one-job boundary are owned by [`SUITE_ROSTER.md`](SUITE_ROSTER.md).
- `setup-system-thinking` must explain the lifecycle, responsibility model, automatic migration, and Extension/Supplemental configuration while installing and verifying them.
- `ask-yannic` version one is a route guide. A later separately designed expansion may help coworkers query a governed representation of Yannic's judgment; it requires explicit source, authority, uncertainty, privacy, update, and correction boundaries.

### Invocation and routing

- Setup manages the standing entry in each selected harness's effective instruction file at the chosen Installation scope. Codex-style targets may use `AGENTS.md`; Claude-style targets may use `CLAUDE.md`. Setup discovers verified precedence, edits the narrowest active source, previews every target, and does not mutate another scope implicitly.
- Every request loads `thinking-in-systems` before `workflow`. Description matching supports discovery but is not the activation guarantee.
- Runtime phase skills are model-invoked; `ask-yannic` and `setup-system-thinking` are user-invoked.
- Bounded synchronous work uses Inline mode; a Persistence boundary switches to Durable mode. The method, responsibility, and Review remain active in both.
- Workflow owns the canonical routing model. `ask-yannic` explains that model and Yannic-specific rationale without executing the route.
- Workflow routes discovery by the uncertainty to remove: terminology to Domain Modeling, user-held decisions to Batch Grilling, persistent or multi-session fog to Wayfinder, external facts to Research, empirical design questions to Prototype, and another person's knowledge to Questionnaire. Wayfinder begins with Domain Modeling and Batch Grilling, then invokes other discovery capabilities as needed.
- Every Outcome has a semantic Specification. `to-spec` materializes it durably only across a persistence, approval, assignment, multi-phase, or meaningful-risk boundary, or on explicit request; bounded Inline work may use the accepted request as its Specification.
- Every executable unit is semantically a Ticket. `to-tickets` materializes Tickets for independently completable units, delegation, dependencies, concurrency, cross-session work, or another persistence requirement; one bounded Inline unit may remain implicit.
- Universal Review always runs at the accepted proof seam. Its depth and independence scale with risk, but conversation, plans, prose, code, and real-world effects all remain reviewable results. Workflow then verifies the actual effect and the parent Outcome's terminal condition.
- Universal successor skills use Matt Pocock's corresponding skills at the inspected pinned revision as attributed starting points, preserving useful behavior before replacing non-universal assumptions.
- `migrate-system` is a bounded current-state mapping capability inside Workflow, not a separate migration lifecycle or responsibility system. Migration uses the same Outcomes, Specifications, Tickets, execution, Review, ownership, and evidence rules, and invokes Wayfinder only when persistent fog appears.
- Workflow resumes a matching open Outcome instead of duplicating it. When the relationship is uncertain, it distinguishes resuming, replacing, and creating a related Outcome explicitly.
- A direct phase request still enters through Workflow. Workflow checks the minimum prerequisites, invokes the requested phase, and retains parent Outcome responsibility afterward.
- Independent discovery may run concurrently or through delegated workers; dependent discovery remains sequential. Workflow integrates the findings and remains responsible for their quality and use.
- A user may explicitly skip or compress artifacts and phases when prerequisites are already satisfied or the informed exception is understood. Systems thinking, responsibility, and verification scale but do not switch off.
- An active Workflow context prevents recursive parent workflows. Phase skills and migration workers join the existing Outcome, own their bounded child result, and return evidence to the coordinator.
- When a companion skill or host capability is unavailable, Workflow enters visible Degraded mode. It may use a safe equivalent only when the same contract remains satisfiable; otherwise it records the gap and routes to waiting, installation, or an accepted handoff without pretending the capability ran.
- Supplemental skills run only at configured Extension points. The core phase supplies their inputs, integrates their evidence, and retains its completion criterion under the accepted advisory-versus-required failure rules.
- Waiting work remains actively owned. Workflow waits directly for short dependencies, arranges durable resumption or monitoring for longer ones when supported, and verifies the result on resumption. Without automatic resumption, it requires an accepted handoff with the exact next check and cannot claim completion.
- A related request updates or extends the active Outcome. Before switching to unrelated work, Workflow preserves the active Outcome's continuation state so it is not silently abandoned.
- Workflow selects the smallest route that can satisfy the Outcome contract. Explicit user constraints and requested phases take precedence without permitting invented prerequisites or false completion.
- The accepted request defines effect authority. Clear authority permits execution without redundant confirmation; drafts, ambiguity, changed revisions, and consequential effects outside granted authority create an approval gate.
- Durable work in an existing scope without a current verified map invokes proportionate migration of the materially affected scope; unrelated exhaustive inventory does not block trivial work.
- Completion includes learning and propagation: changed current state and affected legacy state are recorded, with required follow-up work or informed exceptions visible before the Outcome becomes terminal.
- The canonical route is owned by [`WORKFLOW_ROUTING.md`](WORKFLOW_ROUTING.md). Setup's managed instruction and Ask Yannic point to it instead of duplicating it.
- A future coworker-facing representation of Yannic's judgment remains a separate design from the version-one route guide; Setup remains its own run-once installation job.

### Setup

- One Setup run manages exactly one explicit Installation scope: project or global. Installing both requires two explicit runs, so neither scope changes implicitly.
- Setup follows an inspect, present, confirm, write, and verify sequence. Inspection covers effective instruction precedence, installed skills, available tools and capabilities, coordination options, existing suite configuration, and conflicts.
- Standard Setup installs the complete pinned core suite. Supplemental skills and the optional authoring profile are configured separately.
- Setup writes one human-readable configuration record outside core skill files at the selected scope. It records source versions, overlays, selected Adapter, Supplemental mappings, capabilities, managed-instruction fingerprint, and rollback information.
- Setup owns only a clearly marked block in each selected harness's effective instruction file. It preserves surrounding content, previews the change, retains rollback state, and fails closed on missing, duplicate, or corrupt marker structure during update or removal.
- After all installation, configuration, onboarding, activation, and behavioral verification succeeds, Setup removes itself with the skills.sh `skills remove` operation at the selected scope and verifies its absence. Self-removal is the final successful action.
- Installation scope and agent targets are separate. Within one selected project or global scope, Setup discovers supported agent hosts, recommends the current host, permits explicit multi-host selection, and verifies each selected target separately.
- Setup preserves an existing skill whose fingerprint matches. A conflicting source, version, or overlay requires a visible replacement or update plan and confirmation before any overwrite.
- Setup is transactional: failure restores every prior instruction file and configuration record and removes only skills newly installed by that run, preserving pre-existing skills and unrelated configuration.
- Setup may be reinstalled later for status, repair, update, removal, or rollback. These are maintenance branches of the same installation job; a successful run removes Setup again.
- When a selected harness lacks its scope-correct instruction file, Setup previews and creates it. When it exists, Setup preserves every human-owned region outside its managed block.
- Setup recommends coordination from the actual environment and the user's preference. A repository with Git may use Git-backed Local Markdown; GitHub is offered only for a scope that is actually connected to GitHub. A non-repository may use plain Local Markdown, optionally initialize local Git with authority, or configure another conforming Adapter such as Todoist. Git and hosted services remain optional.
- Setup configures the selected Adapter but leaves Conformance migration to ordinary Workflow after activation.
- Setup previews every Supplemental mapping at a declared Extension point. Name similarity alone never creates a mapping; advisory is the default and required status is explicit.
- Setup teaches the operating model, then opens a customization checkpoint so the user can add or change Adapter and Supplemental preferences before final confirmation.
- Setup verifies fresh-context behavior for every selected target. Where automated testing is unavailable, guided user-observed evidence is required before success and self-removal.
- In an existing Git repository, Setup recommends Git-backed Local Markdown unless the user prefers another Adapter. GitHub is offered only when the scope is actually connected to GitHub. Outside a repository, Setup offers plain Local Markdown, explicitly authorized local Git initialization, or another configured Adapter.
- An external system such as Todoist may be the canonical Adapter for a selected project when its integration satisfies the universal identity, state, relationship, evidence, and continuation contract. An integration that cannot satisfy the contract remains a derived view or Supplemental capability.
- Setup edits only each harness's verified effective instruction surface, writes one managed block to a shared surface, and exposes conflicting instruction chains instead of duplicating instructions.
- Setup may configure and verify required Adapter authentication or tools within granted authority. If access remains unavailable, it offers a portable fallback or remains incomplete rather than claiming the Adapter works.
- Suite removal deletes only manifest-owned skills, managed instruction blocks, and suite configuration at the selected scope. Outcome records and user data are preserved unless the user makes a separate explicit export or deletion choice.
- Reinstalling Setup at a project scope is the supported way to add or change project-specific configuration, such as selecting Todoist for that project. A successful maintenance run verifies the new behavior and removes Setup again.
- Configuration layers by Installation scope. A project record overrides only its declared keys and inherits the rest from global configuration; Setup displays the effective merged configuration before changing it.
- A project maintenance run reuses compatible global skills and standing activation. It creates project-local copies or instruction blocks only for requested isolation, a distinct version or harness target, or a missing global capability.
- Changing a canonical Adapter with existing records invokes ordinary Workflow's Canonical migration before the new Adapter becomes authoritative. Setup never replaces the pointer without freezing, transferring, verifying, and cross-referencing canonical state.
- Setup may install a user-approved, pinned Adapter provider separately from core and Supplemental skills. Credentials remain in the host credential mechanism; configuration stores only a non-secret binding reference.
- Project verification proves that its Adapter override wins while scopes without an override continue to inherit the global configuration.
- Scope configuration is one human-readable Markdown source with a small machine-readable frontmatter block. It owns both agent meaning and deterministic verification.
- Updates are explicit maintenance runs over pinned sources. Setup previews changes, preserves the last-known-good manifest, reapplies overlays, verifies behavior, and only then advances pins.
- Managed instruction blocks carry a format version and fingerprint. Unexpected drift requires an explicit merge, adoption, or restoration decision.
- Onboarding's customization checkpoint loops back through configuration and preview whenever the accepted plan changes.
- Failed self-removal leaves the verified runtime installed, reports the exact skills.sh retry and rollback options, and keeps Setup incomplete.
- The canonical Setup design is owned by [`SETUP_CONTRACT.md`](SETUP_CONTRACT.md).

### Universal work contract

- The [Universal work and coordination contract](UNIVERSAL_WORK_CONTRACT.md) owns the adapter-neutral meanings of Outcomes, Tickets, Maps, relationships, responsibility, claims, state, evidence, continuation, and verified completion.
- GitHub and Local Markdown are adapters; neither defines the workflow's domain model. A Transient Conversation Adapter proportionately applies the same meanings to simple synchronous work.
- Every Coordination space has one canonical Adapter. Maps and dashboards are derived; migration is explicit rather than bidirectional live synchronization.
- Claims coordinate active work but never transfer responsibility. Stale active work enters a Recovery queue instead of silently returning to the Work frontier.
- Baseline durability is required only after a Persistence boundary. Safe concurrent claiming and executable scheduling are separately declared optional capabilities.
- When Workflow encounters an existing system, project, or body of work that does not conform, it automatically invokes `migrate-system`. Migration records and verifies the actual current state in the universal contract, using subagents for independent mapping where useful; it does not repair the underlying system. Discovered changes enter ordinary Workflow.

### Ownership lifecycle

- Outcome responsibility begins when an actor accepts an execution request or starts acting on it. Before acceptance, the Outcome remains proposed. An actor lacking required authority or capability declines, negotiates scope, or arranges an accepted transfer instead of silently accepting impossible responsibility.
- The Outcome owner remains responsible across discovery, Specification, decomposition, implementation, Review, waiting, and effects. Each phase Work owner owns its bounded result; returning it never completes the parent Outcome.
- Every Specification has an identifiable Approver with authority over intent and material trade-offs. Workflow may resolve low-risk Inline details within delegated authority; material assumptions require approval.
- The Outcome owner proves that the Ticket set collectively covers the accepted Specification, dependencies, ownership, authority, and proof seams. Work responsibility attaches when the assigned actor accepts or begins the bounded Ticket.
- Review has an explicit Reviewer who owns the verdict. The Work owner owns requested changes and the Outcome owner integrates final evidence. One actor may hold multiple roles for low-risk work, but the role-specific decisions remain explicit.
- Discovery records facts, assumptions, decisions, unknowns, provenance, and confidence. A material unresolved item either blocks Specification or becomes an explicit operating rule for irreducible fog.
- Accepted Specifications and submitted results are revision-bound. Changing a Specification triggers impact analysis and invalidates only affected Tickets, approvals, evidence, or completed work.
- `implement` submits an exact result revision with available effect evidence and moves the Ticket to Review; submission is not Ticket completion.
- Review produces one integrated verdict: verified permits completion, changes required returns the target to accepted execution, and inconclusive moves it to waiting with missing evidence, owner, and exact next check.
- Consequential effects may require pre-effect Review and approval. Preparation, Review, approval, effect execution, and real-effect verification remain distinct; the Ticket is non-terminal until its accepted proof seam confirms the effect.
- A parent Outcome enters Review only after its owner integrates the current Specification revision, required child dispositions, effect evidence, unresolved exceptions, and system changes into one exact reviewable state. Child Reviews never substitute for parent Review.
- Parent completion requires its own verified terminal condition. Explicitly out-of-scope improvements may become related Outcomes; required remediation, propagation, and recovery remain blocking parts of the current Outcome.
- Accepted transfer ends the outgoing owner's responsibility without completing the Outcome. The incoming owner accepts the exact state and continuation contract, and the Outcome records an auditable ownership transition.
- Authorized cancellation records authority, rationale, partial effects, retained evidence, child dispositions, dependency consequences, and recovery or reversal needs. It is governed termination rather than disguised failure.
- Failure is an event whose responsible owner records retry, rescope, reassignment, waiting, escalation, transfer, or authorized cancellation. A failed or unreachable delegated child returns recovery and integration responsibility to the parent owner.
- Persistent and recurring Outcomes define a horizon, review cadence, transfer rule, or cancellation condition. Scheduling the next occurrence is non-terminal, and indefinite operating Outcomes remain owned.
- Later evidence that disproves completion appends a correction and reopens the affected record; a genuinely new need outside the original scope becomes a related Outcome.
- Approval validity, expiry, revocation, and revision match are rechecked immediately before an effect.
- Completion produces a compact canonical proof bundle containing exact revisions, actors, Review, approvals, effect evidence, exceptions, propagation, and terminal transition.
- Stale Claims, missed checks, overdue Reviews, unreachable owners, and expired Continuations enter Recovery and require an authorized responsibility and next-action decision.
- The canonical phase-responsibility and terminal design is owned by [`OWNERSHIP_LIFECYCLE.md`](OWNERSHIP_LIFECYCLE.md).

### Public content

- Preserve complete universalized authorities, the full public-safe skill-design record, relevant public-safe research, and private-source fingerprints in the repository. Prefer retaining source material now; trim only through a later explicit editorial decision.
- Exact historical sources remain in the authorized private design workspace because they contain personal and tool-specific context. Their fingerprints preserve provenance without publishing private configuration, local paths, or context-specific policy.
- The repository carries the complete universalized S01 v1.0 standard and reusable System-Design Template. Compact orientation documents cannot replace them.
- A requirements ledger maps every operative public-skill and skill-suite requirement from the design conversation to its durable owner.
- The README describes Thinking in Systems as the maintainer's secret sauce and the way of thinking the maintainer credits for rapid progress.
- The skill must remain useful without users outsourcing their own understanding and judgment.
- Include empathy, blameless failure analysis, incentives, friction, intentionality, assumptions, transparent sources, graceful degradation, low-capacity operation, quantitative evidence where possible, recovery, decay reset, change rationale, and legacy propagation.
- Pair good and bad examples; keep a distinct subset as behavioral evaluations.
- Universal public examples exclude named personal assistants, personal operating policy, task or knowledge platform preferences, maintainer-specific rules, employer material, and private paths.

### Validation and publication

- Behavioral evidence outranks file presence and rule recall. Every evaluation records suite revision, environment and capabilities, prompt, expected route, observed actions and state, proof seam, result, and failure evidence.
- Every model-invoked skill receives direct, indirect, incomplete-context, negative, and edge-case invocation tests. Every user-invoked skill is tested for explicit invocation and non-invocation by default. Each evaluation also checks the one-job completion boundary and responsibility return.
- Composition tests cover trivial Inline work, communication, personal or organizational work, software, existing-scope migration, delegation, approval and effects, waiting and resumption, failure recovery, recurring Outcomes, Supplemental skills, and parent completion.
- Publication has no product-level harness allowlist. skills.sh is the installation boundary; Setup discovers and verifies the current harness's instruction surface and capabilities at runtime. Unknown or unsupported harness behavior degrades honestly without creating a separate core-suite compatibility matrix.
- Required environment tests cover no Git or remote, Git without GitHub, a GitHub-connected repository, a configurable external Adapter, scheduling present and absent, Supplemental skills present and absent, and single-worker and delegated execution.
- Clean-install proof begins from an empty scope and uses skills.sh to install the pinned suite, verifies all fingerprints and overlays, runs and disposes Setup, reinstalls it for maintenance, and proves rollback and suite removal.
- Publication requires valid links, frontmatter, `agents/openai.yaml`, invocation metadata, public-boundary and credential scans, provenance and licenses, skills.sh discovery, clean installation, behavioral evaluations, one independent adversarial review, one resolution check, and a clean reviewed release revision.
- External Adapters receive the conformance suite only when configured or advertised. A Todoist provider does not block the core release unless the suite ships or claims one.
- Behavioral fixtures specify observable invariants, routes, state changes, responsibility, proof, and forbidden premature completion rather than exact response wording. Required fixtures run in multiple fresh contexts.
- Every universal skill is tested in at least two materially different domains including a non-software case; composition coverage spans all accepted domains without multiplying every skill across every domain.
- One deterministic repository command validates skill layout, frontmatter, `agents/openai.yaml`, invocation policy, links, pins, overlay hashes, provenance, licenses, public boundaries, credentials, skills.sh metadata, and generated freshness.
- Public release and private activation are separate gates. Public acceptance permits publication; private/global migration follows in a separately governed task.
- Private activation snapshots current configuration, maps current state, previews changes, installs the pinned public revision, preserves private overrides outside core, proves fresh-context parity, and removes the obsolete predecessor only after equivalent or improved behavior passes.
- Evaluation fixtures live in a central source-controlled tree grouped by skill and composition. Each release stores a compact revision-bound report, with large raw output retained separately only when traceable and public-safe.
- Critical invocation and routing fixtures run at least three times in fresh contexts; any inconsistent route fails. Lower-risk artifact fixtures may run once with deterministic checks unless variance appears.
- Findings are Critical, Major, or Minor. Unsafe authority/effects, private leakage, lost responsibility/state, and false completion are Critical; wrong routes, broken contracts, unusable results, and failed installation or rollback are Major. Publication requires zero unresolved Critical or Major findings.
- Releases bind to one immutable Git revision and version. Setup pins that identity and every upstream and overlay fingerprint; published tags are never rewritten.
- After public availability, skills.sh discovery and one final clean public-source installation must pass. Failure blocks private activation and requires a new reviewed release revision.
- The canonical validation, publication, and private-activation gates are owned by [`VALIDATION_AND_RELEASE.md`](VALIDATION_AND_RELEASE.md).

## Deliberately unresolved

The exact descriptions, instructions, references, metadata, and behavioral
fixtures remain per-skill authoring decisions. The accepted roster, source
strategy, setup form, lifecycle names, and automatic routing are no longer open.
