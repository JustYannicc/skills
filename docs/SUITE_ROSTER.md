# Skill suite roster

**Status:** accepted design
**Decision source:** [Select the suite roster and one-job boundaries](https://github.com/JustYannicc/skills/issues/6)
**Upstream baseline:** [`mattpocock/skills` at `2ab9580`](https://github.com/mattpocock/skills/tree/2ab958093e83e0ec752e6c1c5932da465bf23e0c)

## Roster contract

The first complete runtime suite contains 16 skills. Each has one recognizable
job, one completion boundary, and one source strategy. Thinking in Systems is
the governing knowledge; Workflow owns coordination; phase skills own their
individual results. Every phase skill is complete without Supplemental skills.

All runtime skills except `ask-yannic` and `setup-system-thinking` must be
model-reachable because Workflow may invoke them. The exact automatic-routing
rules are owned by the workflow-routing design, not this roster.

## Human review gates

Every new suite-owned skill and every universal successor requires explicit
human review before its implementation Ticket closes. The tracker marks these
Tickets `human-review-required`; Setup and final publication carry the same
gate. Direct-upstream overlay Tickets are marked `deterministic-overlay` and
may close on pinned-source, overlay-hash, and behavioral proof, but the composed
suite still requires human review before publication.

## One-job boundaries

| Skill | One job | Complete when | Source strategy |
| --- | --- | --- | --- |
| `thinking-in-systems` | Supply the universal systems method and governing invariants. | Reference applied at every relevant judgment seam; it owns no phase result. | New, suite-owned |
| `workflow` | Coordinate work proportionately from request through a verified terminal Outcome. | Outcome is verified, validly transferred, or authoritatively cancelled with state preserved. | New, suite-owned |
| `ask-yannic` | Explain which route, skill, or Supplemental capability fits and why. | The user has an actionable recommendation and trade-off; no route is executed. | New, suite-owned |
| `migrate-system` | Adopt an existing system into the workflow by recording and verifying its actual current state. | The material operating scope is canonically represented well enough for ordinary Workflow to proceed. | New, suite-owned |
| `domain-modeling` | Establish and preserve shared terminology. | Relevant terms have one operative meaning or a visible unresolved conflict. | Universal successor retaining the name |
| `batch-grill-me` | Resolve the currently unblocked user-decision frontier in rounds. | The decision frontier is empty or blocked only by facts or decisions outside the current exchange. | Direct upstream plus overlay |
| `wayfinder` | Navigate persistent, multi-session, or irreducible fog through a durable decision map and operating strategy. | The next route is truthfully specifiable or governed under remaining fog. | Universal successor retaining the name |
| `research` | Establish external facts against high-trust primary evidence. | The research question is answered with cited evidence, uncertainty, and durable state when required. | Direct upstream plus overlay |
| `prototype` | Answer one design question through a reversible experiment. | The question has a verdict and evidence; the experiment has a disposition. | Universal successor retaining the name |
| `to-questionnaire` | Obtain missing knowledge asynchronously from another person. | The questionnaire covers every accepted knowledge gap and has a clear return use. | Direct upstream plus overlay |
| `to-spec` | Synthesize accepted knowledge and decisions into one Outcome Specification. | The Specification is accepted or unresolved decisions are returned to discovery. | Universal successor retaining the name |
| `to-tickets` | Decompose an accepted Specification into bounded, owned, dependency-aware Tickets. | The decomposition and proof conditions are accepted or a Specification gap is returned. | Universal successor retaining the name |
| `implement` | Carry one accepted Ticket through execution and submit its exact result revision with effect evidence. | The result is ready for Review; neither Review nor parent completion occurs here. | Universal successor retaining the name |
| `review` | Verify any result, including code, against its Specification and governing standards. | One integrated verdict is recorded against the exact result revision. | New, suite-owned |
| `handoff` | Materialize enough state for another actor, session, or operating context to continue safely. | Continuation state and responsibility are explicit; transfer occurs only when accepted. | Universal successor retaining the name |
| `setup-system-thinking` | Install, configure, teach, and verify the suite once. | Sources, overlays, standing instructions, Supplemental mappings, behavior, and user understanding are verified; Setup may remove itself. | New, suite-owned |

## Boundary rules

### Knowledge and coordination

`thinking-in-systems` is reference, not a mega-skill. It owns intent, systems
models, seams, incentives, evidence, graceful degradation, recovery, change,
and related governing principles. It does not select phases or produce their
artifacts.

`workflow` owns the parent Outcome and invokes the skills needed for each
phase. It retains integration responsibility across delegation, waiting,
Review, and Supplemental work. Proportionality compresses ceremony, not method
or responsibility.

### Discovery

The discovery skills separate by the uncertainty they remove:

- terminology → `domain-modeling`;
- currently answerable user decisions → `batch-grill-me`;
- persistent or irreducible multi-session fog → `wayfinder`;
- external facts → `research`;
- an empirical design question → `prototype`; and
- knowledge held by another person → `to-questionnaire`.

Each returns its own knowledge, decision, or evidence to Workflow. It does not
silently continue into Specification or execution.

### Specification, decomposition, execution, and review

`to-spec` synthesizes what has been accepted. It returns missing decisions to
discovery rather than inventing them. `to-tickets` decomposes an accepted
Specification and returns a discovered Specification gap rather than editing
the authority silently.

`implement` executes one Ticket and submits evidence. `review` independently
verifies that exact revision. Changes requested return the Ticket to execution;
verified child completion returns evidence to the parent owner. Neither skill
silently completes the parent Outcome.

The accepted role, revision, effect, Review, recovery, and parent completion
gates are owned by the
[Ownership and completion lifecycle](OWNERSHIP_LIFECYCLE.md).

Universal Review includes code. The suite bundles no code-review skill. Users
may configure Supplemental reviewers or other skills at declared Extension
points without editing a core skill.

### Handoff, migration, guidance, and setup

`handoff` preserves continuation across a context boundary. It does not declare
the parent work complete and does not transfer responsibility until acceptance.

`migrate-system` records the actual current system and operating state. It is a
bounded mapping capability inside the ordinary Workflow, not a separate
migration lifecycle, artifact model, or responsibility system. It may delegate
independent mapping areas to subagents, but its owner integrates and verifies
them through the same Outcome, Ticket, Review, and evidence rules. It creates
coordination records and instruction pointers; any change to the represented
system becomes ordinary Workflow work. Persistent fog routes to Wayfinder.

`ask-yannic` explains routes without executing them. `setup-system-thinking`
installs and configures the suite without becoming its runtime coordinator or
the per-system migration mechanism. Its accepted installation, maintenance,
verification, and self-removal behavior is owned by the
[Setup System Thinking contract](SETUP_CONTRACT.md).

## Direct upstream installations and overlays

Setup installs these skills directly from Matt Pocock's pinned source. The
repository does not retain full copies. Setup applies deterministic overlays,
records the upstream revision and overlay hash, and verifies the installed
fingerprint. An upstream update remains unavailable until every overlay
reapplies and behavior passes verification.

| Skill | Preserved behavior | Overlay only |
| --- | --- | --- |
| `to-questionnaire` | Recipient-focused asynchronous discovery questionnaire. | Enable model invocation in both `SKILL.md` and `agents/openai.yaml`. |
| `research` | Primary-source investigation and cited durable findings. | Make delegation capability-aware and write through the selected durable Adapter instead of requiring a repository. |
| `batch-grill-me` | Ask the complete currently unblocked decision frontier in rounds. | Enable model invocation and make factual legwork direct-or-delegated according to available capability. |

## Universal successors

The successor skills retain Matt's useful behavior and public names while
replacing assumptions that narrow the accepted universal job:

- `wayfinder`: tracker/repository assumptions and reducible-fog-only completion;
- `domain-modeling`: repository glossary, ADR-path, and code-only assumptions;
- `prototype`: one-question reversible experiments across supported domains;
- `to-spec`: engineering PRD, user-story, issue-tracker, and test-module assumptions;
- `to-tickets`: codebase, tracer-bullet implementation, and tracker assumptions;
- `implement`: tests, typechecking, code Review, and commit assumptions; and
- `handoff`: agent-only recipient, OS-temporary-file, and incomplete
  responsibility/continuation state.

Each successor begins from Matt's corresponding skill at the pinned revision,
then rewrites the assumptions that violate the accepted universal contract.
It records the upstream revision, license, retained behavior, and changed
assumptions. Matt's skills are attributed source bases, not fictional runtime
dependencies.

## Supplemental skills

Every core skill is complete on its own. A core skill may declare named
Extension points with explicit input and evidence contracts.

Setup stores user-selected Supplemental mappings outside core skill files.
Workflow invokes matching skills and returns their evidence to the core phase
owner, which retains responsibility and its completion criterion.

Supplemental skills are advisory by default. A user may configure one as
required for a stated scope. Advisory failure is recorded and permits the core
to continue; required failure moves the Ticket to waiting or recovery.
Overlapping supplements require explicit selection instead of automatic
duplication.

Setup explains this model and the overall lifecycle while configuring it, so
users can customize behavior without forking or editing core skills.

## Authoring profile

[`writing-great-skills`](https://github.com/mattpocock/skills/tree/2ab958093e83e0ec752e6c1c5932da465bf23e0c/skills/productivity/writing-great-skills)
is installed unchanged from Matt's pinned source only for the optional authoring
profile. It governs every skill creation or edit in this repository but is not
part of the 16-skill runtime suite.

## Deferred Ask Yannic expansion

Version one of `ask-yannic` is a route guide. A later design may let coworkers
query a governed representation of Yannic's judgment and receive answers that
track how he would reason. That expansion requires its own source, authority,
uncertainty, update, privacy, and correction contract. It must not be added as
unbounded prose to the route guide.

## Explicit exclusions

- No code-review skill is bundled. Matt's Code Review informs the separation
  of standards and Specification evidence only.
- No software-specific testing workflow belongs to the suite.
- `writing-great-skills` is authoring infrastructure, not runtime workflow.
- Supplemental skills never replace the core contract implicitly.
