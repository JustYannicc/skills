# Setup System Thinking contract

**Status:** accepted design
**Decision source:** [Design the disposable setup skill](https://github.com/JustYannicc/skills/issues/8)

## Job

`setup-system-thinking` manages one installation of the universal skill suite:
inspect, install, configure, teach, verify, and dispose of Setup itself. It is a
user-invoked, run-once skill. A user may reinstall it later to inspect, repair,
update, reconfigure, remove, or roll back that same installation.

Setup owns installation state. Workflow owns runtime work. `migrate-system`
owns current-state mapping through the ordinary Workflow. Setup does not become
a second coordinator, migration lifecycle, or permanent runtime dependency.

## Scope and targets

One run manages exactly one explicit Installation scope:

- **Project** — configuration and instructions apply to one project or bounded
  operating space.
- **Global** — configuration and instructions apply to the selected harness's
  global user environment.

Managing both scopes requires two explicit runs. Installation scope is separate
from agent target: one run may configure one or more explicitly selected
harness targets inside that scope. Setup discovers supported targets,
recommends the invoking harness, previews each target independently, and
verifies each selected target.

Configuration layers by scope. Project configuration overrides only the keys it
declares and inherits the rest from global configuration. Setup always displays
the effective merged configuration. It reuses compatible global skills and
activation; it creates a project-local copy or instruction block only when the
project requests isolation, needs a different version or target harness, or
lacks an inherited capability.

## Source manifest

The standard profile installs the complete core suite from the accepted pinned
sources in the [skill suite roster](SUITE_ROSTER.md). Setup records separately:

- suite-owned skills and universal successors from this repository;
- direct upstream skills and their deterministic overlays;
- user-approved Adapter providers;
- user-selected Supplemental skills; and
- the optional authoring profile.

Matching installed fingerprints are reused. A different source, version, or
overlay produces a visible reconciliation plan before replacement. Core,
upstream, overlay, provider, and Supplemental versions remain pinned. Updates
are explicit maintenance runs: preview the change, preserve the last-known-good
manifest, reapply overlays, verify behavior, then advance the pin.

## Configuration authority

Each Installation scope has one human-readable Markdown configuration record
outside core skill files. A small frontmatter block supplies deterministic
fields; the Markdown body explains their meaning and user choices. Together
they are one source of truth, not parallel machine and human configurations.

The record includes:

- schema and suite version;
- scope, selected harness targets, sources, pins, and fingerprints;
- direct-upstream overlay hashes;
- effective and overridden configuration;
- canonical Adapter and declared capabilities;
- non-secret credential binding references;
- Adapter providers and Supplemental Extension-point mappings;
- managed-instruction locations, versions, and fingerprints;
- last-known-good manifest and rollback reference; and
- activation evidence and verification time.

The selected harness adapter resolves a deterministic scope-local location. Its
managed instruction points to the record so Workflow can find it without a
hard-coded private path. Credentials remain in the host's credential mechanism;
the record never contains secrets.

## Instruction surfaces

Setup maps each selected harness's complete effective instruction chain,
including precedence, aliases, overrides, fallbacks, and shared files. It edits
the narrowest active native surface for the chosen scope. Depending on the
harness, that may be project/global `AGENTS.md`, `CLAUDE.md`, or another
verified instruction file.

Setup owns one clearly marked block in each required surface. A shared file
receives one block. The block contains only the standing entry:

1. load `thinking-in-systems` for every request;
2. then load `workflow` and follow its canonical route; and
3. resolve the effective scope configuration through the recorded pointer.

Every block carries a format version and content fingerprint. Setup previews
creation and changes, preserves all surrounding human content, and keeps the
prior state for rollback. Missing markers are normal only during initial
creation. Duplicate, malformed, or unexpectedly changed managed content causes
Setup to stop and offer explicit merge, adoption, or restoration choices.
Instruction conflicts are surfaced rather than hidden through duplication.

## Adapter selection

Setup recommends a canonical Adapter from the actual environment and the
user's preference:

- In an existing Git repository, recommend Git-backed Local Markdown unless
  the user prefers another conforming Adapter.
- Offer GitHub only when the scope is actually connected to a GitHub
  repository.
- Outside a repository, offer plain Local Markdown, explicitly authorized local
  Git initialization, or another configured Adapter.
- Permit project-specific external systems, including Todoist, when their
  provider satisfies the universal Adapter contract.

Git, GitHub, hosted accounts, and scheduling are optional capabilities. An
external integration qualifies as canonical only when it can preserve the
required identity, state, relationships, responsibility, evidence, and
continuation meanings. A narrower integration remains a derived view or
Supplemental capability.

Setup may install a user-approved pinned Adapter provider and configure or
verify its tools and authentication within granted authority. Missing access
produces a portable fallback or an incomplete Setup—not a false success.

Reinstalling Setup at project scope is the normal way to select a project-only
Adapter such as Todoist. If canonical records already exist, changing the
Adapter invokes ordinary Workflow's Canonical migration before authority moves:
freeze the old source, transfer and verify state, record predecessor and
successor references, then activate the new Adapter.

## Supplemental configuration

Setup offers user-selected skills only at declared Extension points. It may
identify plausible installed capabilities, but name similarity alone never
creates a mapping. Every proposed mapping shows the core phase, input, expected
evidence, source, version, and failure behavior.

Supplemental mappings are advisory by default. Required status is an explicit
choice. Adapter providers, Supplemental skills, and core skills remain distinct
in the manifest even when one package supplies more than one capability.

## Process

### 1. Inspect

Identify the requested branch, scope, targets, authority, effective instruction
chain, installed skills, sources and fingerprints, existing suite
configuration, Git/repository/remotes, available tools, candidate Adapters,
authentication state, coordination capabilities, and conflicts.

**Complete when:** every active source and affected object is accounted for and
the current state can be restored exactly.

### 2. Present

Show findings, effective inherited configuration, recommended Adapter, reuse
and reconciliation decisions, proposed instruction diffs, exact install and
remove effects, provider and Supplemental mappings, verification plan, and
rollback plan.

**Complete when:** the user can distinguish every proposed mutation from every
preserved object.

### 3. Teach and customize

Explain automatic Thinking in Systems and Workflow, Inline and Durable modes,
responsibility through delegation and waiting, migration, Review, Adapters,
Supplemental skills, updates, rollback, and removal. Ask what the user wants to
add or change. Any change returns to Present with a new exact plan.

**Complete when:** the operating model is visible and the user has accepted the
final configuration and effects.

### 4. Checkpoint and apply

Record the pre-run manifest, contents, permissions, and fingerprints. Install
or reconcile skills and providers, apply overlays, write configuration, update
managed instruction blocks, and configure authorized Adapter access.

**Complete when:** every planned object matches the accepted manifest and no
unplanned object changed.

### 5. Verify

Verify installed fingerprints, overlay hashes, effective configuration,
instruction discovery and precedence, Adapter operations, credential bindings,
Supplemental mappings, rollback data, and fresh-context behavior for every
selected harness target.

Fresh-context proof must observe that:

- an ordinary request loads Thinking in Systems before Workflow;
- bounded work remains proportional in Inline mode;
- Durable work resolves the correct scope-specific Adapter;
- an unmapped existing scope routes to ordinary `migrate-system`;
- a direct phase request returns to Workflow responsibility;
- configured Supplemental skills run only at their Extension points; and
- missing optional capabilities degrade honestly.

Where the host cannot automate a fresh context, Setup runs a guided
user-observed activation test. Presence of files alone is not activation proof.

**Complete when:** every selected target has evidence at its user-visible
boundary and the last-known-good state is recoverable.

### 6. Dispose

After every prior criterion succeeds, remove `setup-system-thinking` with the
skills.sh removal operation and the explicit scope and agent targets. The
current CLI form is:

```text
skills remove setup-system-thinking --agent <targets> --yes
skills remove setup-system-thinking --global --agent <targets> --yes
```

Use the first form for project scope and the second for global scope. Verify
that Setup is absent and the runtime suite remains present. Self-removal is the
final successful action.

**Complete when:** Setup is absent from every selected target and the verified
runtime behavior remains available.

## Failure and rollback

Before the verified installation is committed, any failure restores every
prior instruction file and configuration record and removes only skills or
providers newly installed by this run. Pre-existing skills, unrelated
configuration, credentials, and user data remain untouched.

Self-removal happens after the verified installation becomes the
last-known-good state. If removal alone fails, preserve that working state,
report the exact retry command and rollback choices, and keep Setup incomplete.
Do not dismantle a verified runtime merely because its disposable installer
could not delete itself.

## Maintenance branches

Setup may be reinstalled for:

- **status** — compare installed and effective state with the manifest;
- **repair** — restore the accepted manifest and activation behavior;
- **update** — advance reviewed pins and overlays after proof;
- **reconfigure** — change targets, Adapter, providers, or Supplemental maps;
- **remove** — remove only manifest-owned skills, providers selected for
  removal, managed blocks, and suite configuration at the chosen scope; or
- **rollback** — restore the last-known-good manifest and behavior.

Removal preserves Outcome records and user data by default. Export or deletion
requires a separate explicit choice. Every successful maintenance run verifies
its resulting behavior and removes Setup again.

## Completion criterion

Setup is complete only when the accepted suite and scope configuration are
installed, understandable, reversible, active from fresh contexts, verified at
every selected harness boundary, and `setup-system-thinking` has removed itself
through skills.sh. A partial installation, inaccessible Adapter, unverified
activation, corrupt managed block, failed rollback, or failed self-removal is
not complete.
