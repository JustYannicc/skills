---
name: setup-system-thinking
description: Install, configure, verify, maintain, or remove the Thinking in Systems suite for one explicit project or global scope.
disable-model-invocation: true
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Setup System Thinking

Run one scoped installation transaction for the Thinking in Systems suite. This is a user-invoked bootstrap and maintenance skill: the user starts it explicitly, it owns installation state only, and it removes itself after a successful run. `Workflow` owns ordinary work after activation; `Migrate System` owns adoption of an existing operating scope.

The suite contains the twelve local packages in this repository, four pinned upstream packages with the overlays in `overlays/manifest.yaml`, and this disposable package. The canonical manifest is in the public source repository. Bind the running Setup package to one matching immutable release tag and commit, read the manifest at that revision, and use the pair for the whole run. A missing, unreadable, or internally inconsistent manifest is a blocker before any write.

Before writing or verifying a scope, read [the installation-record reference](references/installation-record.md) and [the verification reference](references/verification.md) completely. They define the record schema and exhaustive proof checklist for this package.

## Operating contract

Use these meanings throughout the run:

- **Scope** — exactly one `project` or `global` installation boundary. A run that manages both is two runs.
- **Target** — one or more explicitly selected agent harnesses inside that scope. Scope and target are separate decisions.
- **Source identity** — repository URL, source revision, skill path, and content fingerprint. A name alone is never identity.
- **Managed surface** — one native instruction file or one suite configuration record that this run owns through a marked block or recorded schema.
- **Last-known-good** — the complete pre-update installation and activation state that can be restored without touching unrelated state.

Preserve user data, credentials, unrelated skills, surrounding instructions, file modes, symlink identity, and active work. Store only non-secret credential bindings. Every mutation must be previewed, authorized, checkpointed, and reversible.

## Choose the transaction

### 1. Bind scope and authority

Ask for the missing choice before inspecting mutable state:

1. `project` — install under the current project and edit only selected project instruction surfaces.
2. `global` — install for the user and edit only selected user-level instruction surfaces.

Ask which agent targets should activate the suite. Discover available targets, but do not write every discovered harness by default. A shared symlink or one physical file counts as one managed surface; show every logical path that reaches it.

**Done when:** one scope, selected targets, the user's write Authority, and the rollback boundary are explicit.

### 2. Inspect without changing state

Inspect the selected scope and all effective layers that can affect it:

- `skills list --json` for the project and `skills list --global --json` for global state, including each name, path, source, source URL, source type, target, and fingerprint where available;
- the selected harnesses' instruction precedence and effective files (`AGENTS.md`, `CLAUDE.md`, or the harness's documented equivalent), resolving symlinks without replacing them;
- the repository root, Git status and remote when present, and whether the target has Git, GitHub access, or neither;
- existing suite configuration, rollback snapshots, managed markers, permissions, and unexpected duplicates;
- available Adapters, provider authentication, scheduling, and Supplemental skills. Record `available`, `unavailable`, or `unknown` from evidence; never infer a capability from the host alone.

Build a conflict ledger keyed by normalized skill name. The `skills` CLI installs by flat name and can overwrite a same-named skill from another source. For each candidate record the source identity and fingerprint. Use the manifest's `managedOverlaps` lists as the source of truth; a mismatch between those lists and this package's expected roster is source drift. Classify a collision as:

- **managed Matt overlap** — `domain-modeling`, `handoff`, `implement`, `prototype`, `to-spec`, `to-tickets`, or `wayfinder`, replaced by this suite's local package; or `grill-with-docs`, `grilling`, `research`, or `to-questionnaire`, replaced by this suite's pinned and patched upstream package;
- **compatible match** — same source identity and fingerprint, which can be reused;
- **unrelated collision** — same name from any other source or an unverified fingerprint, which requires an explicit choice and an exact replacement or skip plan.

Never use `remove --all`, install a wildcard, or let a same-name install decide the winner. Unrelated Matt packages remain installed. A managed overlap is removed only in the selected scope and targets, only after the preview is accepted, and only by its exact name.

**Done when:** every planned name has one source decision, every collision has a disposition, and a byte-level rollback snapshot can restore all selected surfaces and lock/configuration files.

### 3. Establish the release and manifest

Find the newest immutable release of `https://github.com/JustYannicc/skills` whose `skills/setup-system-thinking` fingerprint matches the running package. Verify that its tag resolves to the recorded commit before installing anything. A main-branch package without a matching immutable release is not a candidate. Read `overlays/manifest.yaml` at that release and validate its schema, upstream URL, upstream tag, upstream commit, target paths, patch files, patch hashes, license, and installation order.

Verify that the manifest's upstream tag resolves to its recorded commit. Install missing or approved-replacement Matt packages with `npx skills@latest add` from that tagged `mattpocock/skills` source and explicit `--skill` names. Never obtain Matt packages with a GitHub connector, bespoke downloader, or manual repository copy. Verify every installed upstream skill and patch file before applying it. Treat a moved tag, changed patch target, missing file, failed patch, license mismatch, or hash mismatch as a source-drift blocker.

**Done when:** the local suite release and every upstream overlay are bound to verified tag-and-commit pairs with a recorded provenance packet.

### 4. Present the plan and teach the operating model

Show a compact before/after ledger:

- preserved skills and files;
- exact managed overlaps to replace, their sources, and the targeted remove/install operations;
- proposed suite names, source revisions, overlay hashes, install order, and target paths;
- the exact instruction block for every selected surface, including the resolved path when a symlink is involved;
- the scope configuration path, effective global/project precedence, Adapter recommendation, provider and Supplemental choices, verification checks, and rollback action;
- the duplicate-name, missing-access, patch-drift, and self-removal failure paths.

Teach the user the short runtime model: Thinking in Systems governs judgment; Workflow owns the parent Outcome; Inline work stays in the conversation; Durable work uses one selected Adapter; delegation and waiting do not end Responsibility; `Migrate System` maps existing reality; Review proves exact results; Supplemental skills run only at declared Extension points. Explain that Git, GitHub, scheduling, and providers are optional capabilities.

Ask for confirmation of the plan and any Adapter, provider, Supplemental, target, or conflict choice. A changed answer returns to this presentation step. Do not write from an implicit default when the choice changes Authority, data location, or source ownership.

**Done when:** every mutation is distinguishable from preserved state and the user has accepted the exact plan.

### 5. Checkpoint and apply atomically

Create a checkpoint containing original bytes, permissions, ownership where readable, symlink targets, selected lock files, existing configuration, and managed-surface fingerprints. Record the list of objects this run is allowed to create or remove. Refuse to proceed if a selected file or lock changed after inspection.

Install the twelve local packages with `npx skills@latest add` from the verified suite release tag and explicit `--skill` names. Install each missing or approved-replacement upstream package with the same skills command from the verified upstream tag, then apply only the manifest-listed patches in order. Re-read every installed `SKILL.md` and metadata file, calculate fingerprints, and record the source plus overlay provenance. Replace managed Matt overlaps only in the selected scope and targets. Preserve unrelated Matt skills and all unrelated same-name sources after an explicit resolution.

Write one human-readable configuration record per scope. Use `.agents/system-thinking/installation.md` for a project and `${XDG_CONFIG_HOME}/system-thinking/installation.md`, falling back to `~/.config/system-thinking/installation.md`, for global state. Its frontmatter records schema and suite version, scope and targets, source pins and fingerprints, overlay hashes, effective and overridden configuration, Adapter capabilities, non-secret credential bindings, Supplemental mappings, managed-surface paths and fingerprints, the last-known-good snapshot, and activation evidence. Keep narrative decisions below the frontmatter. Do not put secrets in it.

Write the managed instruction block only after showing it exactly. Own one block per effective physical surface:

```markdown
<!-- setup-system-thinking:begin version=1 fingerprint=sha256:<block-hash> -->
Load `thinking-in-systems` before `workflow` for every request. Resolve the effective Setup configuration at `<configuration-path>`. Keep the parent Outcome owned through verified completion, accepted transfer, or authoritative cancellation.
<!-- setup-system-thinking:end -->
```

Preserve all surrounding text. If a surface has duplicate, malformed, missing-during-maintenance, or unexpectedly edited markers, stop and offer `merge`, `adopt`, or `restore`; never overwrite the surrounding file or create a second activation block. Resolve an existing symlink's target and preserve the link itself.

For a global run, inspect the harness-native user file before choosing a write: for example, `~/.agents/AGENTS.md` or `~/.codex/AGENTS.md` for an `AGENTS.md` surface and `~/.claude/CLAUDE.md` for Claude Code. Existing symlinks are part of the user's configuration. Show the logical path, resolved target, permissions, complete proposed block, and every other logical path that reads that target. Edit the writable target only after confirmation; preserve the symlink and never create a parallel global instruction file merely because another harness uses a different name. If no selected surface exists, ask which native file to create.

Choose an Adapter from observed capabilities. Recommend Git-backed Local Markdown inside an existing Git repository, plain Local Markdown without Git, and GitHub only for a connected repository whose required Adapter contract is proven. Do not initialize Git or authorize an external provider without explicit confirmation. A provider that cannot prove identity, state, relationships, Responsibility, evidence, Review, continuation, readable recovery, and credentials enters visible Degraded mode.

**Done when:** all and only planned objects match the accepted manifest, every write is recorded, and no unrelated object changed.

### 6. Verify at the user-visible boundary

Verify, for every selected target:

- source, suite, skill, overlay, and patch fingerprints;
- configuration precedence and the recorded effective values;
- exactly one valid activation block on each effective physical surface;
- Adapter operations, non-secret credential bindings, and Supplemental inputs/return contracts;
- rollback data, file modes, symlink identity, and preservation of unrelated skills and text;
- a fresh agent context with an ordinary request: Thinking in Systems loads first, then Workflow; bounded work remains Inline; Durable work resolves the selected Adapter; existing-scope work routes to Migrate System; direct phase requests return to Workflow; Supplemental skills run only at mapped Extension points; missing optional capabilities degrade honestly.

When the host cannot create a fresh context automatically, guide the user through one and record what they observed. A successful install requires proof at every selected target, not only a matching file hash.

**Done when:** the accepted suite is active from a fresh context, every capability claim is evidence-backed, and the complete rollback path remains usable.

### 7. Dispose Setup last

After every other criterion passes, remove only `setup-system-thinking` from the selected scope and targets with the exact-name `skills remove` command. Verify that Setup is absent and the runtime skills, configuration, and activation remain active. Self-removal is the final successful mutation.

If self-removal fails after verification, preserve the working runtime, report the exact retry command and rollback choice, and leave the maintenance transaction visibly incomplete. If any earlier step fails, restore the checkpoint, remove only objects introduced by this run, and report the first failed seam plus the exact resumption condition.

**Done when:** Setup is absent after a verified run, or a truthful incomplete state names the owner, preserved state, retry, and rollback.

## Maintenance runs

When the scope configuration already exists, inspect it before asking for a branch. Offer:

- **Status** — compare installed/effective state with the recorded manifest and activation fingerprints; make drift visible.
- **Repair** — restore the accepted manifest and activation after the same preview and checkpoint.
- **Update** — fetch and review new source/overlay pins, preserve last-known-good, apply the candidate, verify it, then advance the record.
- **Reconfigure** — change targets, Adapter, providers, or Supplemental mappings through the same transaction.
- **Rollback** — restore the complete last-known-good installation and instruction/configuration state.
- **Remove** — delete only manifest-owned skills, selected providers, managed blocks, and this scope's configuration. Preserve Outcome records and user data unless separately authorized.

Project configuration overrides only declared global keys; show the merged effective configuration before every mutation. Reuse matching global fingerprints. Make a project-local copy only for accepted isolation, a distinct version or harness, or a missing inherited capability. Any drift or source collision receives an explicit merge, adoption, replacement, or restoration decision.

Every successful maintenance branch repeats fresh-context verification and then disposes Setup. A failure restores last-known-good state; a self-removal failure preserves verified runtime and leaves Setup available for repair.

## Completion boundary

Return the exact scope, target list, source revisions, installed fingerprints, configuration locator, managed surfaces, Adapter/capability status, verification evidence, preserved unrelated state, and Setup disposal result. Stop at installation or maintenance. Do not perform ordinary project work, claim parent Outcome completion, or silently publish, delete, migrate, or authorize external data.
