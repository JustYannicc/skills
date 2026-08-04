# Public skill language

The shared vocabulary for this repository. The installed [Thinking in Systems standard](skills/thinking-in-systems/references/standard.md#use-these-terms-consistently) is the single authority for its runtime terms; this file defines the repository and `'Workflow'` terms that surround it.

## Language

Terms including Thinking in Systems, System, System of interest, Containing System, Subsystem, Upstream System, Dependent System, Peer System, System interaction, Durable system, Actor, Ownership, Responsibility, Intent, Outcome, Material, Authority, LLM, Deterministic mechanism, System representation, System Record, Change and Legacy Record, Opportunity cost, Constraint, Feasible set, Preference, Decision frame, Framing effect, Satisficing, Pareto principle, Pareto improvement, Marginal analysis, Cost structure, Substitution effect, Externality, Mise en place, Strategy, Plan, Fog of war, Proof seam, Assurance cadence, Informed exception, and Design Complete are defined there and are not redefined here.

**Decision frontier**:
The currently unblocked set of decisions whose answers materially sharpen the next work.
_Avoid_: Backlog, questionnaire, all unknowns

**Work frontier**:
The accepted, unblocked, and unclaimed Tickets currently available to start. Active, waiting, in-review, proposed, complete, and cancelled Tickets are not on this frontier.
_Avoid_: Backlog, recovery queue, every open Ticket

**Recovery queue**:
The active, waiting, or in-review Tickets whose claim, continuation, owner, review, or deadline needs intervention. Stale work enters recovery rather than silently returning to the Work frontier.
_Avoid_: Work frontier, failure state, abandoned work

**Skill suite**:
A deliberately compatible set of single-job skills installed explicitly because current skill distribution does not resolve dependencies.
_Avoid_: Package, transitive dependency, mega-skill

**Companion skill**:
A separately installed skill that owns a distinct capability another skill can request by name when available.
_Avoid_: Dependency, bundled reference

**Handoff contract**:
The minimum durable state, authority, rationale, uncertainty, evidence, and next frontier needed for a human or agent to continue without inventing a material rule.
_Avoid_: Conversation summary, duplicated source of truth

**Line forward**:
Outcome progress, useful evidence, preserved state, or a genuinely easier next action produced by an accepted action.
_Avoid_: Activity, busyness, metric movement

**Universalization**:
Removing accidental domain assumptions while preserving the behavior that makes a method useful across contexts.
_Avoid_: Search-and-replace, abstraction for its own sake, removing concrete examples

**Workflow**:
The universal path that carries work from understanding through specification, decomposition, implementation, review, and verified completion. Its ceremony and durable artifacts scale with the work; its governing method does not disappear for simple cases.
_Avoid_: Software delivery pipeline, optional process for complex work

**Outcome record**:
The canonical contract and current state for one Outcome, including its owner and related Tickets. A host may store it as an issue, document, database record, or conversational state.
_Avoid_: Map, dashboard, copied summary

**Map**:
A navigational view over an Outcome record and its related Tickets, decisions, dependencies, and remaining fog. It points to canonical records instead of duplicating them.
_Avoid_: Second source of truth, backlog dump

**Specification**:
The accepted contract for an outcome, including its scope, governing decisions, responsibility, and visible proof. It may be implicit and lightweight for bounded reversible work or durable for consequential work.
_Avoid_: Software-only PRD, implementation plan

**Ticket**:
A bounded, independently finishable work contract with responsibility, dependencies, a kind, and a verifiable terminal condition. Its representation may be an issue, a local file, another system's record, or an ephemeral unit inside a simple interaction.
_Avoid_: GitHub issue, coding task, activity item

**Ticket kind**:
The kind of bounded uncertainty or work a Ticket owns, such as a decision, research investigation, prototype, action, or review. Kind selects behavior without changing the Ticket contract.
_Avoid_: Workflow state, storage type

**Coordination space**:
The bounded environment in which Outcome and Ticket identities, claims, relationships, and transition rules are authoritative. It may be a conversation, folder, repository, tracker, or another user-selected system.
_Avoid_: Git repository, hosted account, universal database

**Adapter**:
The host-specific implementation that stores and operates the universal workflow contract in a selected Coordination space. One adapter is canonical per space; additional maps and dashboards are explicitly derived views.
_Avoid_: Universal workflow meaning, equal live-synced source

**Record identity**:
An immutable identifier unique within a Coordination space. A record's name and storage location may change without changing its identity; migrations retain earlier identifiers as aliases.
_Avoid_: Mutable title, filename, globally unique identifier requirement

**Containment**:
The `contains` relationship connecting an Outcome or parent Ticket to its child Tickets. Containment organizes responsibility and navigation without implying execution order.
_Avoid_: Dependency, copied child state

**Requirement relationship**:
The `requires` relationship stating that a Ticket cannot proceed until another Ticket completes. Cancellation does not satisfy the relationship unless the dependent owner explicitly replaces, waives, or cancels it.
_Avoid_: Containment, informal association

**External dependency**:
An event or condition outside the workflow's governed Tickets that a waiting Ticket depends on. It belongs in the Continuation record because assigning a fake Ticket cannot make an unaccepting party responsible.
_Avoid_: Requirement relationship, ownerless Ticket

**Related relationship**:
A non-blocking association between records that supplies useful context without affecting state or frontier calculations.
_Avoid_: Requirement, containment

**Actor reference**:
An unambiguous reference to a human, agent, team, service, or other responsible party. It has a human-readable label and may include a host identifier, actor kind, and return route when the Coordination space provides them.
_Avoid_: Ambiguous group label, authority grant

**Ticket state**:
The lifecycle position of a Ticket: proposed, accepted, active, waiting, in review, complete, or cancelled. Blocking and claims are separate relationships; a failed attempt is an event rather than a terminal state.
_Avoid_: Progress percentage, claim, dependency status

**Claim**:
A temporary coordination relationship stating that an actor is actively working a Ticket. A durable claim identifies its claimant, start time, and staleness or expiry rule. Expiration releases coordination—not ownership. A claim prevents duplicate execution but does not assign, transfer, or end responsibility.
_Avoid_: Ownership, assignment, completion

**Transition history**:
The append-only record of meaningful state changes, including actor, time, authority, rationale, evidence, and the affected result revision when applicable. It complements rather than replaces the current state snapshot.
_Avoid_: Mutable status field alone, exhaustive activity log

**Evidence reference**:
A record of the condition evaluated, method or observation, result, observer, and time, plus the location and exact revision when the evaluated result is mutable.
_Avoid_: Link without a claim, activity report, unbound approval

**Result revision**:
The exact version of a result to which evidence, review, or approval applies. A material change creates a different revision and invalidates approval of the prior one.
_Avoid_: Latest version, mutable draft, approval detached from content

**Canonical migration**:
The explicit replacement of one authoritative Adapter with another by freezing the old source, copying and verifying state, recording predecessor and successor references, and making the old source read-only.
_Avoid_: Bidirectional live sync, silent copy, two sources of truth

**Conformance migration**:
The adoption of an existing system, project, or body of work into the universal workflow by recording its actual current state, sources, actors, responsibilities, relationships, active work, evidence, waiting state, and unknowns in a canonical Coordination space. It changes the representation and operating process, not the underlying system.
_Avoid_: System repair, forced rewrite, undocumented assumptions, fixing findings during migration

**Persistence boundary**:
The point at which workflow state must become durable because work crosses a session, actor, waiting period, approval boundary, or meaningful risk boundary.
_Avoid_: Requirement that every trivial interaction create files

**Inline mode**:
The proportional workflow representation for bounded synchronous work. The conversation carries the implicit Specification, Ticket, history, and immediate Review without creating durable artifacts.
_Avoid_: Workflow bypass, reduced method, unverified shortcut

**Durable mode**:
The workflow representation used after a Persistence boundary, with canonical records stored through the selected Adapter.
_Avoid_: Complex-work ceremony, Git requirement, hosted tracker

**Workflow context**:
The active parent Outcome identity, phase, responsibility, authority, Adapter, result revision, and return route that invoked skills join instead of starting a recursive parent workflow.
_Avoid_: New Outcome per skill invocation, hidden global state, responsibility transfer

**Degraded mode**:
A visible operating mode used when a skill, tool, service, or host capability is unavailable. It permits an equivalent only when the same contract remains satisfiable and otherwise preserves state for waiting, installation, recovery, or accepted handoff.
_Avoid_: Pretending a capability ran, silent contract weakening, immediate abandonment

**Installation scope**:
The instruction and skill-discovery boundary selected during Setup, such as one project or the user's global agent environment. Setup manages standing instructions only at the selected scope.
_Avoid_: Current working directory guess, implicit global mutation

**Effective configuration**:
The resolved configuration for one request after the project record overrides its declared keys and inherits the remainder from global scope.
_Avoid_: Copy of global configuration, implicit replacement, uninspected merge

**Managed instruction block**:
A versioned, fingerprinted section owned by Setup inside a harness's effective instruction file. Human-owned content remains outside it, and unexpected drift requires an explicit reconciliation choice.
_Avoid_: Entire instruction file, unmarked generated prose, permission to overwrite surrounding content

**Adapter provider**:
A pinned skill, tool, or integration that implements the universal Adapter contract for a particular storage or coordination system.
_Avoid_: Canonical Adapter meaning, Supplemental skill, credential

**Last-known-good manifest**:
The exact verified installation, configuration, instruction, source, and fingerprint state from which Setup can recover or roll back.
_Avoid_: Latest files, partial backup, credentials archive

**Continuation record**:
The durable state required to resume a waiting Ticket without reconstructing material context. It identifies the dependency and unblock condition, observations and next check, retry/escalation/expiry rules, any scheduled action, and the exact resumption action.
_Avoid_: Reminder without ownership, claim of monitoring without a resumption mechanism

**Transient conversation adapter**:
The non-durable representation used for simple synchronous work before a Persistence boundary is crossed. The conversation carries the implicit Outcome, Ticket, history, and evidence while the same systems method and lifecycle meanings still apply.
_Avoid_: Workflow bypass, durable coordination mechanism

**Implementation**:
Performing the accepted work in any domain, including technical, personal, organizational, physical, communicative, or agent work.
_Avoid_: Writing code, producing an intermediate artifact

**Review**:
Independent verification that completed work, including code, matches its Specification and governing standards at the accepted proof seam.
_Avoid_: Code review, proofreading only, activity report

**Supplemental reviewer**:
A user-selected specialist that inspects one domain or concern and returns findings as evidence to the universal Review. It strengthens rather than replaces the universal verdict.
_Avoid_: Universal Reviewer, automatic replacement, duplicate final verdict

**Supplemental skill**:
A user-selected skill configured at a declared seam to enrich a core skill without editing or replacing it. The core skill retains its job, responsibility, and completion criterion.
_Avoid_: Bundled dependency, fork of the core, arbitrary hook

**Extension point**:
A named input or output seam where Workflow may invoke configured Supplemental skills and return their evidence to the core skill that owns the phase.
_Avoid_: Core customization, unrestricted plugin execution, responsibility transfer

**Questionnaire**:
An asynchronous discovery artifact for obtaining facts or decisions from another person who holds knowledge the current actors lack.
_Avoid_: Interactive grilling, survey without a decision need, Specification

**Responsibility**:
The duty to carry assigned or accepted work through a verified terminal condition within the responsible party's authority. Waiting, delegation, submission, or failure changes the work's state without ending that duty.
_Avoid_: Activity, attempted execution, permission

**Outcome owner**:
The one identifiable party responsible for coordinating an accepted outcome end to end, integrating its child work, and verifying its terminal condition.
_Avoid_: Everyone involved, every contributor

**Work owner**:
The party responsible for one bounded child work contract through its own verified completion. Completing that contract returns evidence to its parent without completing the parent outcome.
_Avoid_: Outcome owner, executor

**Executor**:
The party that performs an action within a work contract. Execution does not by itself confer ownership of the parent outcome.
_Avoid_: Outcome owner, work owner

**Reviewer**:
The party responsible for a verification verdict against the accepted specification and governing standards.
_Avoid_: Approver, outcome owner

**Approver**:
The party responsible for authorizing or rejecting an effect within its decision authority.
_Avoid_: Reviewer, executor

**Nested responsibility**:
The arrangement in which an outcome owner retains responsibility for the parent outcome while each delegated work owner becomes responsible for a bounded child contract.
_Avoid_: Responsibility transfer, shared ownership

**Proof bundle**:
The compact canonical completion evidence binding exact Specification and result revisions, responsible roles, Review, approvals, real effects, exceptions, propagation, and the terminal transition.
_Avoid_: Activity summary, list of links, child completion count

**Correction event**:
An append-only record that later evidence disproved an earlier completion assertion, invalidates affected evidence, and reopens responsibility without rewriting history.
_Avoid_: History edit, new unrelated request, silent status change

**Operating Outcome**:
An Outcome that preserves a condition or recurs under an explicit horizon, review cadence, transfer rule, or cancellation condition.
_Avoid_: Scheduled action, endless ownerless task, permanently complete service
