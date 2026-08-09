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

## Primary activation choice

An initial Install or explicit Reconfigure prepares the exact marked block that would activate the suite from the effective `AGENTS.md` in the selected scope. Recommend adding it, show the complete file path and diff, and ask the user to approve or decline that write. Use the project instruction surface for a project run and the selected harness's user-level instruction surface for a global run. Use a harness-specific equivalent such as `CLAUDE.md` only when that harness does not consume an `AGENTS.md` surface. Other maintenance branches inherit, inspect, preserve, restore, or remove the recorded activation state without reopening this choice.

Approval produces an **active installation** and requires fresh-context activation proof. Declining produces an **install-only installation**: write no instruction block, record `activation: inactive`, explain that the scope has no standing guarantee to load Thinking in Systems before Workflow for every request, and verify explicit skill invocation. Installed model-invoked skills may still be selected when their descriptions match; never describe install-only as configured, active, or guaranteed inactive.

The suite roster and installation order come from `suite.installationOrder` in `overlays/manifest.yaml`; its `managedOverlaps` and `source` sections govern reconciliation and upstream overlays. The canonical manifest is in the public source repository. Bind the running Setup package to one matching immutable release tag and commit, fetch the manifest and its declared overlay patches from that exact revision over public HTTPS, and use the revision for the whole run. Installation requires access to the two public source repositories; it does not require a local Git repository, GitHub account, or GitHub Adapter. A missing, unreadable, or internally inconsistent manifest is a blocker before any write.

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

For an initial Install or explicit Reconfigure, ask whether to add the prepared activation block to the effective scoped `AGENTS.md`. Recommend yes. For project scope, start with `<project-root>/AGENTS.md`; for global scope, inspect the selected harness's user-level `AGENTS.md` path. If the target does not consume `AGENTS.md`, show its documented native instruction surface and explain why. If the selected file is absent, show the proposed new file before asking to create it. For Status, Repair, Update, Rollback, or Remove, bind the activation state recorded for that branch instead.

**Done when:** one scope, selected targets, active or install-only mode, the user's write Authority, and the rollback boundary are explicit.

### 2. Inspect without changing state

Inspect the selected scope and all effective layers that can affect it:

- `npx skills@<bootstrap-cli-version> list --json` for the project and `npx skills@<bootstrap-cli-version> list --global --json` for global state, including each name, path, source, source URL, source type, target, and fingerprint where available; record that CLI version and require it to equal the later manifest pin;
- the selected harnesses' instruction precedence and effective files (`AGENTS.md`, `CLAUDE.md`, or the harness's documented equivalent), resolving symlinks without replacing them;
- the repository root, Git status and remote when present, and whether the target has Git, GitHub access, or neither;
- existing suite configuration, rollback snapshots, managed markers, permissions, and unexpected duplicates;
- available Adapters, provider authentication, scheduling, and Supplemental skills. Record `available`, `unavailable`, or `unknown` from evidence; never infer a capability from the host alone.

Map every logical agent skill path—selected and unselected—to its resolved physical directory. Classify the impact of creating, installing, removing, or replacing each candidate. If an unselected target shares a physical directory that would change, the only safe dispositions are to include every affected target, preserve the existing package, or abort.

Build a conflict ledger keyed by the CLI-resolved destination basename and physical root; also record the exact case-sensitive frontmatter `name`. The `skills` CLI installs by flat name and can overwrite a same-destination skill from another source. For each candidate record the source identity and fingerprint. Use the manifest's `managedOverlaps` lists as the source of truth; a mismatch between those lists and `suite.installationOrder` is source drift. Classify in this order so each collision has one disposition:

- **compatible match** — accepted source identity, final package fingerprint, and overlay provenance all match; this includes already-correct managed names and can be reused;
- **managed Matt overlap** — a non-compatible name in `managedOverlaps.replaceWithLocal` or `managedOverlaps.replaceWithPatchedUpstream` whose installed source identity is `mattpocock/skills`; the matching manifest branch selects the local successor or pinned patched upstream package;
- **unrelated collision** — the same destination from any other source or an unverified fingerprint, which requires an explicit replacement or abort. Preserving it is allowed, but the suite remains incomplete and Setup must not report success.

Never use `remove --all`, install a wildcard, or let a same-name install decide the winner. Unrelated Matt packages remain installed. A managed overlap is removed only in the selected scope and targets, only after the preview is accepted, and only by its exact name.

**Done when:** every planned name has one source decision, every collision has a disposition, every physical skill directory has an explicit consumer impact, and a byte-level rollback snapshot can restore all selected surfaces and lock/configuration files.

### 3. Establish the release and manifest

Find the newest immutable release of `https://github.com/JustYannicc/skills` whose `skills/setup-system-thinking` package fingerprint matches the running package under the installation-record algorithm. Verify that its tag resolves to the recorded commit before installing anything. A main-branch package without a matching immutable release is not a candidate. Fetch `overlays/manifest.yaml` from `https://raw.githubusercontent.com/JustYannicc/skills/<suite-revision>/overlays/manifest.yaml`, then fetch every declared patch from the same raw revision into the checkpoint workspace. Validate the schema, pinned skills CLI version, upstream URL, upstream tag, upstream commit, target paths, patch files, patch hashes, final package fingerprints, license, and installation order before use.

Verify that the manifest's upstream tag resolves to its recorded commit. The current skills CLI cannot install a raw commit SHA as a Git tree ref, so prepare the manifest-pinned skills CLI command for the verified tag and explicit `--skill` names, but do not run it before the accepted plan and checkpoint in step 5. Never obtain Matt packages with a GitHub connector, bespoke downloader, or manual repository copy. Treat a changed patch target, missing file, license mismatch, or hash mismatch as a source-drift blocker.

**Done when:** the local suite release and every upstream overlay are bound to verified tag-and-commit pairs with a recorded provenance packet.

### 4. Present the plan and teach the operating model

Show a compact before/after ledger:

- preserved skills and files;
- exact managed overlaps to replace, their sources, and the targeted remove/install operations;
- proposed suite names, source revisions, overlay hashes, install order, and target paths;
- for an initial Install or explicit Reconfigure, the exact instruction block for every selected native instruction surface, including the resolved path when a symlink is involved; for other branches, the recorded activation disposition;
- the scope configuration path, effective global/project precedence, Adapter recommendation, provider and Supplemental choices, verification checks, and rollback action;
- the duplicate-name, missing-access, patch-drift, and self-removal failure paths.

Teach the user the short runtime model: Thinking in Systems governs judgment; Workflow owns the parent Outcome; Inline work stays in the conversation; Durable work uses one selected Adapter; delegation creates nested child Responsibility and waiting remains owned; `Migrate System` maps existing reality; Review proves exact results; Supplemental skills run only at declared Extension points. Explain that a local Git repository, GitHub account or Adapter, scheduling, and providers are optional capabilities; public HTTPS source access is required for installation.

Ask for confirmation of every mutating plan, including any prepared `AGENTS.md` change and Adapter, provider, Supplemental, target, or conflict choice. Status remains read-only and needs no mutation approval. A changed answer returns to this presentation step. Preserve a declined instruction write as a separate install-only disposition: approval of the wider installation plan or a CLI `--yes` flag cannot reinterpret it as permission to edit instructions. Do not write from an implicit default when the choice changes Authority, data location, or source ownership.

**Done when:** every mutation is distinguishable from preserved state and the user has accepted the exact plan.

### 5. Checkpoint and apply atomically

Create a checkpoint containing original bytes, permissions, ownership where readable, symlink targets, selected lock files, existing configuration, and managed-surface fingerprints. Record the list of objects this run is allowed to create or remove. Refuse to proceed if a selected file or lock changed after inspection.

Derive `upstream-names` from `source.skills[*].name`. Derive `local-runtime-names` from `suite.installationOrder` minus `setup-system-thinking` and minus `upstream-names`. A duplicate, missing entry, or unclassified roster name is source drift.

Derive `approved-overlap-names` from non-compatible managed Matt overlaps whose installed source identity is verified as `mattpocock/skills`, whose physical paths are owned by the selected transaction, and whose replacement the user accepted. Use fingerprints to distinguish compatible reuse from replacement, not to prove source identity. Derive `approved-unrelated-replacement-names` from unrelated collisions whose exact replacement the user accepted. Set `removal-names` to the union of those sets. Derive `local-install-names` and `upstream-install-names` from missing roster entries plus entries whose destination is in `removal-names`; reuse only exact compatible matches at the accepted final fingerprint and provenance. Remove `removal-names` through the CLI's explicit `--skill` selector before either add command. Never remove an entry merely because its flat name matches.

Install `local-install-names` with `npx skills@<manifest-cli-version> add` from the verified suite release tag and explicit `--skill` names. Install `upstream-install-names` with the same pinned skills command from the verified upstream tag, then apply only the manifest-listed patches in order. Immediately resolve both tags again and verify every installed source fingerprint before patching; a moved tag or mismatch restores the checkpoint. Re-read every installed `SKILL.md` and metadata file, calculate final fingerprints, and record the source plus overlay provenance. Preserve unrelated Matt skills and all unrelated same-name sources after an explicit resolution.

Construct the commands directly from the manifest and the accepted scope and targets:

```text
npx skills@<manifest-cli-version> remove --skill <each removal-names entry> <scope-and-verified-target-flags> --yes
npx skills@<manifest-cli-version> add https://github.com/JustYannicc/skills/tree/<suite-tag> --skill <each local-install-names entry> <scope-and-target-flags>
npx skills@<manifest-cli-version> add https://github.com/mattpocock/skills/tree/<upstream-tag> --skill <each upstream-install-names entry> <scope-and-target-flags>
```

Apply these command rules:

- Use the pinned CLI's documented `--global` and `--agent <agents>` flags only after accounting for every consumer of each physical target directory.
- In CLI `1.5.22`, `remove --agent codex` can report success without deleting a package from the shared universal `.agents/skills` root. For that root, omit `--agent` only after every physical consumer is included in the accepted plan. Use target flags for isolated agent-specific roots.
- Issue separate exact commands when physical roots require different dispositions, then verify filesystem and lock state instead of trusting the success summary.
- Pass every install name explicitly to `add`, batching each source into one command. Omit any remove or add command whose derived name set is empty.
- The complete local roster excludes disposable Setup; the complete Matt roster contains all four pinned packages. Every selected target ends with every roster entry at its accepted final fingerprint.
- Use the same pinned CLI version for rollback and self-removal.

For each overlay, map its repository path relative to the manifest entry's `sourceTarget` onto every physical installed root and copy-mode duplicate selected for the transaction. Dry-run the rebased patch, apply it once to each mapped file in manifest order, then verify the declared patch hash and manifest-declared final package fingerprint. A path outside the mapped installed root is an unplanned mutation and triggers rollback.

Write one human-readable configuration record per scope using the locations, frontmatter, sections, layering, and privacy rules in [the installation-record reference](references/installation-record.md). Keep narrative decisions below the frontmatter and store no secrets.

For active mode, write the managed instruction block only after showing it exactly and receiving approval. Own one block per effective physical surface. For install-only mode, preserve every instruction file and record that activation was declined.

```markdown
<!-- setup-system-thinking:begin version=1 fingerprint=sha256:<block-hash> -->
Load `thinking-in-systems` before `workflow` for every request. Resolve the effective Setup configuration at `<configuration-path>`. Keep the parent Outcome owned through verified completion, accepted transfer, or authoritative cancellation.
<!-- setup-system-thinking:end -->
```

Preserve all surrounding text. If a surface has duplicate, malformed, missing-during-maintenance, or unexpectedly edited markers, stop and offer `merge`, `adopt`, or `restore`; never overwrite the surrounding file or create a second activation block. Resolve an existing symlink's target and preserve the link itself.

For a global run, inspect the harness-native user file before choosing a write: for example, `~/.agents/AGENTS.md` or `~/.codex/AGENTS.md` for an `AGENTS.md` surface and `~/.claude/CLAUDE.md` only when Claude Code does not consume the selected `AGENTS.md`. Existing symlinks are part of the user's configuration. Show the logical path, resolved target, permissions, complete proposed block, and every other logical path that reads that target. Edit the writable target only after confirmation; preserve the symlink and never create a parallel global instruction file merely because another harness uses a different name. If no selected surface exists, show the proposed documented native instruction surface before asking to create it.

Choose an Adapter from observed capabilities. Recommend Git-backed Local Markdown inside an existing Git repository, plain Local Markdown without Git, and GitHub only for a connected repository whose required Adapter contract is proven. Do not initialize Git or authorize an external provider without explicit confirmation. A provider that cannot prove identity, state, relationships, Responsibility, evidence, Review, continuation, readable recovery, and credentials enters visible Degraded mode.

**Done when:** all and only planned objects match the accepted manifest, every write is recorded, and no unrelated object changed.

### 6. Verify at the user-visible boundary

Read [the verification reference](references/verification.md) completely and execute its deterministic checks, applicable fresh-context probes, and branch-specific proof for every selected target. The full transaction matrix is a release-certification gate, not work repeated during an ordinary Setup run. When the host cannot create a fresh context automatically, use its guided-observation fallback and record what the user observed. A successful install requires proof at every selected target, not only a matching file hash.

**Done when:** the accepted active or install-only mode is proven from a fresh context, every capability claim is evidence-backed, and the complete rollback path remains usable.

### 7. Dispose Setup last

After every other criterion passes, remove only `setup-system-thinking` from every actual bootstrap consumer discovered in step 2 with the pinned CLI's exact-name `skills remove` command. When no consumer exists, record that Setup was already absent and perform no removal. For Install, Repair, Update, Reconfigure, and Rollback, verify the runtime skills, configuration, and recorded active or install-only state remain intact. For Remove, verify the suite runtime, effective configuration, and activation remain absent while its non-effective removal receipt remains readable. Setup deletion is the final managed-package mutation; finalizing the transaction receipt is the only permitted write afterward.

If self-removal fails after verification, preserve the verified post-branch state, mark its transaction or removal receipt `failed`, report the exact retry command and rollback choice, and leave the maintenance transaction visibly incomplete. If any earlier step fails, restore the checkpoint, remove only objects introduced by this run, and report the first failed seam plus the exact resumption condition.

**Done when:** Setup is absent after a verified run, or a truthful incomplete state names the owner, preserved state, retry, and rollback.

## Maintenance runs

When the scope configuration already exists, inspect it before asking for a branch. Offer:

- **Status** — compare installed/effective state with the recorded manifest and activation fingerprints; make drift visible.
- **Repair** — restore the accepted manifest and activation after the same preview and checkpoint.
- **Update** — fetch and review new source/overlay pins, preserve last-known-good, apply the candidate, verify it, then advance the record.
- **Reconfigure** — change targets, Adapter, providers, or Supplemental mappings through the same transaction.
- **Rollback** — restore the complete last-known-good installation and instruction/configuration state.
- **Remove** — delete only manifest-owned skill paths recorded as owned by this installation, suite-created provider bindings, managed blocks, and this scope's effective configuration file. Preserve the non-effective removal receipt, providers, Outcome records, user data, unrelated configuration-directory contents, and every shared path with an unselected consumer. If ownership cannot be separated, stop for a disposition instead of deleting a broader path.

Project configuration overrides only declared global keys; show the merged effective configuration before every mutation. Reuse matching global fingerprints. Make a project-local copy only for accepted isolation, a distinct version or harness, or a missing inherited capability. Any drift or source collision receives an explicit merge, adoption, replacement, or restoration decision.

Status uses the read-only Status proof in the verification reference. Repair, Update, Reconfigure, and Rollback verify their recorded active or install-only state. Remove uses the branch-specific removal proof instead of requiring removed packages to remain invokable. Every branch then disposes Setup; an earlier failure restores last-known-good state, while a self-removal failure preserves the verified post-branch state and a failed receipt that a reinstalled Setup can recover.

## Completion boundary

Return the exact scope, target list, active or install-only state, source revisions, installed fingerprints, configuration locator, managed surfaces, Adapter/capability status, verification evidence, preserved unrelated state, and Setup disposal result. Stop at installation or maintenance. Do not perform ordinary project work, claim parent Outcome completion, or silently publish, delete, migrate, or authorize external data.
