# Universal Thinking in Systems skill suite Specification

**Status:** accepted
**Outcome owner:** repository maintainer
**Decision map:** [Wayfinder Outcome](https://github.com/JustYannicc/skills/issues/1)

## Problem statement

Agents often treat systems thinking as optional ceremony, treat delivery phases
as software-only, and stop at intermediate artifacts such as drafts, delegated
work, pull requests, schedules, or approvals. Users must remember which skills
to invoke, work loses responsibility across delegation and waiting, existing
projects lack compatible state, and installation assumptions break when Git,
GitHub, a particular harness, or a hosted coordination service is absent.

The repository currently contains the complete public-safe method and accepted
design contracts, but no implemented, installable skill suite. The intended
Outcome is therefore unavailable at its user-visible boundary.

## Outcome

Publish one skills.sh-installable suite of single-job universal skills that:

- applies Thinking in Systems and Workflow automatically to every request;
- scales representation without disabling method, responsibility, or Review;
- works across software, communication, everyday life, organizations, physical
  environments, and agent work;
- carries accepted intent through discovery, Specification, Tickets,
  implementation, Review, effects, recovery, and verified parent completion;
- adopts existing scopes by mapping their real current state through the same
  Workflow;
- remains useful without Git, GitHub, hosted accounts, scheduling, or
  Supplemental skills;
- permits project/global, harness-native, Adapter, provider, and Supplemental
  configuration without editing core skills; and
- proves installation and behavior at one immutable public revision before any
  separately governed private activation.

The Outcome is complete only when all accepted skills are implemented and
reviewed, the full validation and clean-install gates pass, skills.sh discovers
the immutable public revision, and a final clean installation succeeds.

## Governing contracts

The Specification incorporates these accepted authorities without duplicating
their detailed meanings:

- [Skill suite roster](../SUITE_ROSTER.md) — names, one-job boundaries, and
  source strategies.
- [Universal work and coordination contract](../UNIVERSAL_WORK_CONTRACT.md) —
  Outcome, Ticket, state, responsibility, evidence, continuation, and Adapter
  semantics.
- [Workflow routing contract](../WORKFLOW_ROUTING.md) — automatic entry,
  proportional routing, phase selection, migration, waiting, and degradation.
- [Ownership and completion lifecycle](../OWNERSHIP_LIFECYCLE.md) — phase
  responsibility, revision control, Review, effect gates, recovery, and parent
  terminal proof.
- [Setup System Thinking contract](../SETUP_CONTRACT.md) — scoped installation,
  harness instruction surfaces, layered configuration, verification, rollback,
  maintenance, and self-removal.
- [Validation and release contract](../VALIDATION_AND_RELEASE.md) — behavioral,
  deterministic, clean-install, publication, and private-activation gates.
- [Thinking in Systems standard](../source/THINKING_IN_SYSTEMS_STANDARD.md) —
  complete governing knowledge and system-design method.

If this synthesis conflicts with one of those contracts, the narrower governing
contract owns its meaning until an explicit change revises both.

## Solution

### Suite

Implement the accepted 17-skill roster:

1. `thinking-in-systems`
2. `workflow`
3. `ask-yannic`
4. `migrate-system`
5. `domain-modeling`
6. `grill-with-docs`
7. `grilling`
8. `wayfinder`
9. `research`
10. `prototype`
11. `to-questionnaire`
12. `to-spec`
13. `to-tickets`
14. `implement`
15. `review`
16. `handoff`
17. `setup-system-thinking`

Thinking in Systems supplies governing knowledge. Workflow coordinates the
parent Outcome. Every other runtime skill owns one bounded phase or guidance
result and returns responsibility and evidence to Workflow.

### Source strategy

Author suite-owned skills and universal successors in this repository. Begin
every successor from Matt Pocock's corresponding skill at the accepted pinned
revision, preserve useful compatible behavior, and rewrite assumptions that
make it repository-, tracker-, actor-, or software-specific. Record revision,
license, retained behavior, and changed assumptions per skill.

Install `research`, `grill-with-docs`, `grilling`, and `to-questionnaire`
directly from the pinned upstream source with deterministic verified overlays.
Offer `writing-for-agents`, including `SKILL-MECHANICS.md`, unchanged only
through the optional authoring profile. Keep upstream behavior linked through
capability relationships and retain only the declared patches locally.

### Automatic operation

Setup writes a small managed standing entry to each selected harness's effective
instruction surface at the selected project or global scope. Every request
loads Thinking in Systems and then Workflow. Workflow selects the smallest
truthful Inline or Durable route and invokes phase skills automatically.

Simple bounded work may keep its Outcome, Specification, Ticket, history, and
Review implicit in the conversation. Persistence, assignment, waiting,
approval, multiple phases, or meaningful risk materializes canonical records
through the selected Adapter.

### Existing systems

Workflow invokes `migrate-system` automatically when Durable work depends on an
existing scope without a current verified map. Migration uses ordinary Outcome,
Ticket, responsibility, Review, and evidence rules. It may delegate independent
mapping, invokes Wayfinder only for persistent fog, and sends discovered system
changes back through normal Workflow.

### Responsibility and completion

Every accepted Outcome and Ticket has one owner. Delegation creates nested
responsibility without releasing the parent owner. Review, approval, execution,
effects, waiting, scheduling, handoff, correction, cancellation, and recovery
remain distinct transitions with exact evidence. Child completion never
completes the parent.

### Configuration and extension

Core skills remain complete without Supplemental skills. Setup stores Adapter
providers and Supplemental Extension-point mappings outside core, defaults
Supplemental behavior to advisory, and permits an explicit required setting.
Project configuration may override declared global keys, including selecting a
project-specific conforming Adapter such as Todoist.

### Installation and release

Use skills.sh as the sole publication and installation channel. Setup installs
and pins the complete core, applies overlays, configures the selected scope,
teaches the operating model, proves fresh-context activation, supports rollback
and maintenance, and removes itself through `skills remove` as its final action.

## User stories

1. As a user, I want systems thinking applied to every request so that quality
   does not depend on remembering a skill name.
2. As a user making a trivial correction, I want the full method compressed
   into a quick interaction so that good process does not create needless
   ceremony.
3. As a user starting consequential work, I want durable intent, ownership,
   authority, state, and proof so that the work survives interruption.
4. As a user without Git, I want a readable Local Markdown workflow so that the
   suite remains fully usable.
5. As a user in a Git repository without GitHub, I want Git-backed local state
   without being pushed toward an irrelevant hosted tracker.
6. As a user in a GitHub-connected repository, I want GitHub available as a
   conforming Adapter when I choose it.
7. As a user with project-specific preferences, I want to configure an external
   Adapter such as Todoist for that project without changing global behavior.
8. As a user with specialist skills, I want to attach them at declared
   Extension points without forking or weakening core skills.
9. As a user beginning an existing project, I want its current reality mapped
   automatically so that Workflow does not operate from invented assumptions.
10. As a user facing unclear language, I want Domain Modeling to establish
    shared meanings before decisions harden.
11. As a user sharpening a documented plan or design, I want Grill With Docs to
    compose Grilling and Domain Modeling so shared understanding and current
    records advance together through the selected Adapter.
12. As a user holding several independent decisions, I want Grilling to cover
    the current frontier efficiently while dependent questions wait and every
    decision remains mine.
13. As a user facing persistent uncertainty, I want Wayfinder to create an
    operating strategy rather than pretend all fog can disappear.
14. As a user missing external facts, I want Research to establish them from
    high-trust primary evidence.
15. As a user unsure whether a design works, I want one reversible Prototype to
    answer the material question before commitment.
16. As a user needing another person's knowledge, I want a complete asynchronous
    Questionnaire whose answers return to a clear decision.
17. As a user with accepted intent, I want a universal Specification that does
    not assume software or invent missing decisions.
18. As a user coordinating work, I want bounded universal Tickets with explicit
    dependencies, owners, authority, and proof seams.
19. As a Work owner, I want Implementation to carry my Ticket through a usable
    exact result and evidence without falsely completing Review or the parent.
20. As a user reviewing any result, including code, I want one universal verdict
    against the Specification and governing standards.
21. As an Outcome owner delegating a simple task, I want the child owner to be
    responsible for its usable result while I remain responsible for integration.
22. As an Outcome owner waiting on an external event, I want a real continuation
    and resumption mechanism rather than a false claim of monitoring.
23. As an outgoing owner, I want Handoff to preserve exact continuation and end
    my responsibility only when the successor accepts it.
24. As an Approver, I want approval bound to the exact revision and rechecked
    before the effect so that later changes cannot inherit stale authority.
25. As a user asking for an external effect, I want completion proven at the
    real effect boundary rather than at draft, submission, or scheduling.
26. As a user operating a recurring system, I want responsibility governed by
    a horizon, cadence, transfer rule, or cancellation condition.
27. As a user discovering false completion later, I want history preserved and
    responsibility reopened rather than the evidence silently rewritten.
28. As an installer, I want Setup to inspect, preview, apply, teach, verify, and
    roll back changes at exactly the scope I selected.
29. As a user of different agent harnesses, I want Setup to edit the verified
    native instruction surface instead of assuming one filename universally.
30. As a maintainer, I want every skill attributable to its exact source and
    revision so that upstream behavior and adaptations remain auditable.
31. As a maintainer, I want repeatable deterministic and behavioral gates so
    that publication reflects observed behavior rather than confidence.
32. As a maintainer, I want one immutable reviewed release identity so that
    installation, evidence, and rollback refer to the same suite.
33. As a private user, I want global activation performed only after public
    proof, with private preferences preserved outside the public core.

## Implementation decisions

- Each skill has one recognizable job and an explicit completion boundary.
- Every implemented skill includes deliberately authored `agents/openai.yaml`.
- Runtime skills are model-reachable; `ask-yannic` and
  `setup-system-thinking` are user-invoked.
- Shared meanings live in the governing contracts or disclosed references, not
  repeated across skill bodies.
- Immediate steps remain in each `SKILL.md`; branch-specific rules, templates,
  examples, sources, and Adapter details use precise context pointers.
- The runtime workflow uses adapter-neutral meanings. Conversation, Local
  Markdown, GitHub, and external systems are representations, not competing
  domain models.
- One canonical Adapter is writable per Coordination space. Migrations are
  explicit; equal bidirectional live synchronization is excluded.
- Models own bounded interpretation and composition. Deterministic mechanisms
  own schemas, fingerprints, markers, overlays, lifecycle invariants, claims,
  validation, and effect gates where available.
- Setup configuration is human-readable Markdown with a small deterministic
  frontmatter block and non-secret credential binding references.
- Publication uses skills.sh only; historical alternative-channel research is
  retained as rejected-alternative evidence.
- Private/global instruction changes occur only in a separate post-publication
  Outcome.

## Proof decisions

The highest proof seam is a fresh-context composed request observing automatic
Thinking in Systems, proportional Workflow routing, correct responsibility,
real effects, Review, and parent completion. The deployment seam is a clean
skills.sh installation followed by Setup activation, maintenance, rollback,
removal, and self-disposal. Individual skill and deterministic repository checks
diagnose failures beneath those seams.

Behavioral fixtures cover direct, indirect, incomplete, negative, and edge
invocation; at least two domains per universal skill; the accepted composition
matrix; and capability environments with and without Git, GitHub, scheduling,
Supplemental skills, and delegation. Critical routing fixtures run three times
in fresh contexts. Publication requires zero unresolved Critical or Major
findings, one independent adversarial review, one resolution check, skills.sh
discovery, and one final clean public-source installation.

## Out of scope

- Bundling a domain-specific code-review or software-testing workflow.
- Requiring Git, GitHub, a hosted account, a scheduler, or a specific harness.
- Shipping or claiming a Todoist provider in the core first release.
- Replacing user judgment or hiding informed exceptions.
- Building the future coworker-facing representation of Yannic's judgment
  beyond the version-one route guide.
- Publishing private configuration, employer material, credentials, personal
  platform policy, or local paths.
- Editing private/global configuration before the reviewed public release is
  available and pinned.
- Publishing through any channel other than skills.sh.

## Acceptance criteria

1. All 17 roster skills satisfy their one-job and source-strategy contracts.
2. Automatic entry applies Thinking in Systems then Workflow on every request
   after Setup, including trivial Inline work.
3. Universal discovery, Specification, Tickets, implementation, Review,
   handoff, migration, responsibility, and completion work in non-software and
   software scenarios.
4. No-Git, Git-without-GitHub, GitHub, external-Adapter fixture, scheduler,
   Supplemental, and delegation capability scenarios pass.
5. Setup passes scoped installation, configuration, instruction preservation,
   onboarding, fresh-context activation, rollback, maintenance, removal, and
   self-disposal proof.
6. Direct upstream sources, overlays, universal successors, licenses, and
   provenance are pinned and verified.
7. Deterministic repository validation and every required behavioral and
   composition fixture pass with zero unresolved Critical or Major findings.
8. One independent adversarial review and one resolution check pass against the
   exact candidate revision.
9. The clean reviewed immutable revision is discoverable through skills.sh and
   installs successfully from its public source.
10. Private activation remains a separately governed, reversible post-release
    Outcome.
