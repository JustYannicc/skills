# Validation and release contract

**Status:** accepted design
**Decision source:** [Specify validation, installation, publication, and migration](https://github.com/JustYannicc/skills/issues/10)

## Purpose

This contract defines the evidence required to publish the suite through
skills.sh and, afterward, activate the pinned public revision in private or
global configuration. It proves behavior at user-visible seams rather than
equating installed files, remembered rules, or model claims with working
behavior.

Public release and private activation are separate gates. Public work never
silently changes private instructions, skills, credentials, or configuration.

## Evidence record

Every behavioral evaluation records:

- suite and fixture revision;
- skill, composed scenario, and attempt identity;
- environment, Installation scope, Adapter, tools, and declared capabilities;
- exact prompt and supplied context;
- expected invocation or non-invocation, route, state changes, responsibility,
  evidence, and completion boundary;
- observed actions, artifacts, state, effects, and proof seam;
- result and finding severity;
- raw-output locator when retained separately; and
- evaluator and time.

Behavioral evidence outranks file presence and rule recall. Fixtures assert
observable invariants and forbidden behavior, not exact prose.

## Evidence layout

Source-controlled fixtures live under one central evaluation tree:

```text
evaluations/
├── skills/<skill-name>/
├── composition/
├── adapters/
├── setup/
└── fixtures/
```

Each reviewed release stores a compact public-safe report tied to its exact Git
revision and version. Large raw outputs may live in a separate traceable
location, but the report retains their identifiers, hashes, results, and the
evidence necessary to review failures. Public-boundary and credential scans
apply to reports and raw artifacts before publication.

During authoring, a dirty candidate is identified as
`working-tree:<content-sha256>` over non-evaluation repository inputs. A clean
candidate is identified as `git:<commit-sha>`. Evaluation artifacts are
excluded from the content identity so an observation can name the candidate it
evaluates without changing that candidate. Publication accepts only the clean
Git identity and package version.

## Finding severity

| Severity | Meaning | Release effect |
| --- | --- | --- |
| Critical | Unsafe authority or effect, private-data exposure, lost responsibility or state, or false completion. | Blocks publication. |
| Major | Wrong invocation or route, broken one-job or work contract, unusable result, failed installation, failed rollback, or required behavior unavailable. | Blocks publication. |
| Minor | Non-blocking clarity, presentation, or ergonomics defect. | Record and disposition; may release when the accepted contract remains satisfied. |

Publication requires zero unresolved Critical or Major findings. A new failure
mode discovered during resolution receives a new fixture before the resolution
check.

## Per-skill evaluation

Every model-invoked skill receives:

1. **direct** — the user explicitly names or clearly requests the capability;
2. **indirect** — Workflow or another accepted route needs the capability;
3. **incomplete context** — required inputs are absent or ambiguous;
4. **negative** — a nearby request should not invoke the skill; and
5. **edge** — a boundary condition challenges its one job, authority, state, or
   completion criterion.

Every user-invoked skill receives explicit-invocation and default
non-invocation cases. Every skill evaluation checks:

- correct invocation behavior;
- one recognizable job and no absorbed neighboring phase;
- completion criterion at its own proof seam;
- return of bounded evidence and responsibility to Workflow; and
- honest behavior when a companion or host capability is absent.

Every universal skill runs in at least two materially different domains,
including one non-software case. Composition coverage spans every accepted
domain without multiplying every skill across every possible domain.

### Skill-specific proof focus

| Skill | Distinct proof focus |
| --- | --- |
| `thinking-in-systems` | Governs trivial and consequential judgment without taking over Workflow. |
| `workflow` | Selects the smallest truthful route and retains parent responsibility through terminal proof. |
| `ask-yannic` | Explains the canonical route when explicitly invoked and performs no route. |
| `migrate-system` | Maps and verifies current state through ordinary Workflow without repairing the represented system. |
| `domain-modeling` | Resolves operative terminology without absorbing decisions or architecture. |
| `grill-with-docs` | Composes Grilling and Domain Modeling through the selected Adapter, preserving one documented-design interview job and honest companion gaps. |
| `grilling` | Exhausts the currently unblocked user-decision frontier while dependent questions wait, user decisions remain user-owned, and shared understanding requires confirmation. |
| `wayfinder` | Begins with language and grilling, persists a map, and governs reducible or irreducible fog. |
| `research` | Establishes external facts with primary evidence and capability-aware direct or delegated legwork. |
| `prototype` | Answers one empirical design question through a reversible cross-domain experiment. |
| `to-questionnaire` | Produces an asynchronous knowledge request for another person and a clear return use. |
| `to-spec` | Materializes one accepted Outcome contract without inventing missing decisions. |
| `to-tickets` | Produces collectively covering, bounded, owned work and returns Specification gaps. |
| `implement` | Executes one Ticket and submits an exact result with evidence without completing Review or parent work. |
| `review` | Integrates core and Supplemental evidence into one exact-revision verdict across domains. |
| `handoff` | Preserves continuation and transfers responsibility only on acceptance. |
| `setup-system-thinking` | Installs, configures, teaches, proves, rolls back, and removes itself without becoming runtime coordination. |

## Repetition and variance

Each Critical invocation or routing fixture runs at least three times in fresh
contexts. One inconsistent route fails the fixture; results are not averaged.
Lower-risk artifact-quality fixtures may run once with deterministic checks
unless observed variance requires repeated evidence.

A fresh context must not inherit the authoring conversation's hidden state. It
loads only the sources and configuration the installed user would receive.

## Composition matrix

The required composed scenarios include:

| Scenario | Required observable behavior |
| --- | --- |
| Trivial Inline correction | Thinking in Systems and Workflow apply proportionately; no durable ceremony; immediate Review verifies the result. |
| Communication effect | Draft, revision, exact approval, send, service acceptance, and parent verification remain distinct. |
| Personal or organizational work | Universal Specification, Tickets, implementation, Review, and responsibility work without software vocabulary assumptions. |
| Software change | General Review evaluates code and configured specialist evidence without a bundled code-review replacement. |
| Existing-scope adoption | Workflow invokes proportionate migration; mapping may delegate; discovered changes return to ordinary work. |
| Delegation | Child owner completes bounded work; parent owner reviews, integrates, and remains responsible. |
| Waiting and resumption | Continuation records and monitoring capabilities are truthful; unsupported scheduling uses accepted handoff. |
| Failure and recovery | Failure becomes an event and Recovery decision; work never becomes ownerless or silently returns to the frontier. |
| Persistent Outcome | Cadence, horizon, transfer, or cancellation governs continuing responsibility; scheduling is non-terminal. |
| Supplemental capability | Configured Extension point runs with correct advisory or required behavior; core owns integration. |
| Parent completion | Child evidence is integrated, parent Review runs, real effect is proven, and a proof bundle binds the terminal transition. |
| Correction after completion | History remains append-only and the affected record reopens only when the original contract was false. |

## Capability environments

Validation is capability-based rather than a product-level harness allowlist.
Required environments cover:

- no Git and no remote;
- an existing Git repository without GitHub;
- a GitHub-connected repository;
- one configurable external-Adapter fixture;
- scheduling or monitoring present and absent;
- Supplemental skills present and absent; and
- single-worker and delegated execution.

skills.sh is the installation boundary. Setup discovers the active harness's
instruction surface and capabilities at runtime, verifies them, and degrades
honestly when a safe integration is unavailable.

An external Adapter receives the conformance suite only when the release ships,
configures, or advertises its provider. Todoist does not block core publication
unless the suite ships or claims a Todoist provider. A user-selected provider
must still pass its project Setup conformance checks before becoming canonical.

## Adapter conformance

A claimed canonical Adapter proves:

1. create, read, update, and immutable identity;
2. containment, requirements, and related relationships;
3. ownership, authority, Claims, and lifecycle transitions;
4. exact-revision evidence, Review, approval, and proof bundles;
5. waiting, Continuation, recovery, and capability declarations;
6. frontier and Recovery queue behavior;
7. current-state and Canonical migration; and
8. readable state without asking a model to reconstruct it.

Coordination and Continuation guarantees are tested only when claimed. Baseline
semantics are mandatory for every canonical Durable Adapter.

## Deterministic repository gate

The repository exposes one documented validation command. It checks at least:

- expected skill directories and absence of placeholders;
- frontmatter, names, descriptions, and invocation policy;
- `agents/openai.yaml` structure and agreement with `SKILL.md`;
- local links, context pointers, and disclosed-file reachability;
- source revisions, licenses, exact central provenance coverage and source
  targets, absence of installed provenance baggage, retained behavior, and
  overlay hashes;
- public/private boundaries, credentials, suspicious local paths, and employer
  material;
- skills.sh discovery metadata and complete suite manifest;
- generated-file source hashes and freshness; and
- evaluation fixture and report schema.

Mechanical validation is necessary and cannot replace behavioral proof.

## Clean-install and Setup gate

Start from an empty project or global scope and use skills.sh against the pinned
public candidate. Prove:

1. Setup and every selected source are discoverable.
2. The complete core suite installs at the accepted fingerprints.
3. Direct upstream overlays apply and verify exactly.
4. Existing unrelated skills and instructions remain unchanged.
5. Setup writes only accepted configuration and managed instruction blocks.
6. Fresh-context activation loads Thinking in Systems then Workflow.
7. The selected Adapter and layered configuration resolve correctly.
8. Setup removes itself through `skills remove` and remains absent.
9. Reinstalling Setup supports status, repair, update, reconfiguration, rollback,
   and removal.
10. Rollback restores exact prior state, and suite removal preserves Outcome
    records and user data by default.

Run the relevant capability environments, including no-Git operation and GitHub
operation. A failed install, activation, self-removal, or rollback is Major.

## Review gate

After focused verification, run one independent adversarial review against the
accepted contracts and task-start fixed point. Resolve every Critical and Major
finding, add regression fixtures for newly discovered failure modes, and run
one separate resolution check. Then rerun affected deterministic and behavioral
checks. Repeat the adversarial pass only for new evidence or explicit request.

The reviewed release tree is clean: every intended change is included, every
unrelated change is excluded, and no publication occurs from an unreviewed
working tree.

## Release identity and publication

One immutable Git revision and version identify the release. Setup pins that
identity plus every upstream, overlay, provider, and Supplemental fingerprint.
Published tags are never rewritten; a defect produces a new reviewed revision.

Publication through skills.sh requires:

1. zero unresolved Critical or Major findings;
2. deterministic, behavioral, composition, Adapter, and clean-install gates
   passing at the candidate revision;
3. complete public-safe validation report and provenance;
4. clean reviewed Git state and immutable version identity;
5. successful skills.sh discovery from the public repository; and
6. one final clean install from that public source.

A failed public discovery or install blocks private activation and requires a
new corrected reviewed revision. It never justifies rewriting the published
tag.

## Private activation gate

Private or global configuration changes happen in a separate governed task
after the public revision is available and pinned. That task:

1. snapshots every affected instruction, skill, configuration, credential
   binding, and rollback path;
2. maps existing responsibility, routes, private overrides, and obsolete
   behavior;
3. previews the exact installation, instruction, and removal diffs;
4. installs the pinned public revision without creating a second editable core;
5. keeps private policy and preferences in private scoped overrides;
6. runs fresh-context parity and improvement fixtures against current behavior;
7. proves rollback; and
8. removes the obsolete predecessor only after equivalent or improved behavior
   passes at the actual private boundary.

Public publication does not depend on a private mutation that must occur only
after publication. Private activation fails closed and leaves the prior
last-known-good configuration recoverable.

## Release completion criterion

The public release is complete only when every required deterministic and
behavioral gate passes at one immutable reviewed revision, skills.sh discovers
it, and a clean public-source installation succeeds. Private activation is a
later Outcome and is complete only after its separate proof and rollback gates
pass; it never retroactively alters the public release evidence.
