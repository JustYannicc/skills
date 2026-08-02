# Managed instruction blocks: research and recommended contract

**Status:** research complete — recommendation only. This does not edit an
active `AGENTS.md`, install a skill, or authorize automatic configuration.

## Answer

Yes: a skill's **setup command** can safely manage one small, marker-delimited
block in a shared instruction file. It should not be an install hook, should
not own the whole file, and should never silently replace a block that a human
has edited. The current best public precedent is the combination of
Trigger.dev's small always-on pointer and Convex's managed-section/state
pattern.

`skills.sh`/the Vercel `skills` CLI does **not** currently offer a skill-package
lifecycle hook that can automatically modify `AGENTS.md`. Its supported model is
to copy or symlink a skill directory into an agent's skill location. The
`thinking-in-systems` skill should therefore ship a **human-invoked setup procedure or
CLI command**, which previews a patch and requires explicit confirmation before
it changes an instruction file.

## Primary-source findings

### Trigger.dev: the small owned region pattern

Trigger.dev's current CLI installs each skill in the target agent's native
skills directory and writes a one-line, always-on pointer to the primary
instruction file. Its public documentation says that the pointer makes the
agent aware of the on-demand skills, while the detailed content remains out of
the always-loaded instruction budget. [Trigger.dev Skills — installation](https://trigger.dev/docs/skills#installation)

The implementation distinguishes two ownership modes:

- A **shared** file, such as `AGENTS.md` for Codex, receives a block delimited
  by `<!-- TRIGGER.DEV SKILLS START -->` / `<!-- TRIGGER.DEV SKILLS END -->`.
  Re-running the installer replaces that block or appends it once; it leaves
  the surrounding file intact.
- A **dedicated** Cursor rule file is fully owned and overwritten.

That distinction, the markers, and the idempotent upsert are explicit in
[Trigger's `skills.ts`](https://github.com/triggerdotdev/trigger.dev/blob/14824b09556ac3310643174ec33a405d909bb129/packages/cli-v3/src/commands/skills.ts#L415-L516).
Trigger's current documentation also confirms that its former per-tool rules,
including regions in `CLAUDE.md`, were replaced with Agent Skills and a
one-line pointer. [Agent rules migration](https://trigger.dev/docs/mcp-agent-rules#what-changed)

### Convex: managed section plus state, status, update, disable, remove

Convex uses start/end markers around a generated `AGENTS.md` section. Its
installer either replaces the marked section or appends it, and it writes only
when the contents differ. [Convex managed-section helper](https://github.com/get-convex/convex-js/blob/653e6c1cca294f84a4c70ae8f928fd874afc8aa1/src/cli/lib/aiFiles/utils.ts#L58-L102)

Convex records hashes for its generated section and other AI artifacts in a
state file. Its status command distinguishes missing, stale, and locally
modified generated files. [Convex state schema](https://github.com/get-convex/convex-js/blob/653e6c1cca294f84a4c70ae8f928fd874afc8aa1/src/cli/lib/aiFiles/state.ts#L9-L19),
[status implementation](https://github.com/get-convex/convex-js/blob/653e6c1cca294f84a4c70ae8f928fd874afc8aa1/src/cli/lib/aiFiles/status.ts#L14-L89)

Its official CLI reference exposes separate `install`, `update`, `status`,
`disable`, and `remove` operations. `remove` strips only Convex's marked
sections and removes the file only if it becomes empty; `disable` leaves
existing files untouched. [Convex AI-files reference](https://docs.convex.dev/cli/reference/ai-files)

### Important limitation in both precedents

The current Trigger and Convex implementations replace content between a valid
pair of markers. Convex's public source does not block an update when the
marked block itself was edited; Trigger's upsert similarly replaces a matching
region. That is acceptable for vendor-generated pointers, but is too weak for a
personal global `AGENTS.md`: it can erase a human's local correction. The
recommended contract below deliberately adds hash-based conflict protection.

### Skills.sh: distribution, not arbitrary setup execution

Vercel's current `skills` README documents `add`, `update`, `remove`, `init`,
and `use`. Installation supports copy or symlink into skill directories; its
documented options do not include lifecycle/install hooks. [Vercel skills CLI
README](https://github.com/vercel-labs/skills/blob/1164afa5f0e21ebd01e6fc11249759353f494ad1/README.md#L17-L129)

The source confirms the boundary. The installer cleans/copies/symlinks skill
directories, and the package has no `postinstall` script. [Installer](https://github.com/vercel-labs/skills/blob/1164afa5f0e21ebd01e6fc11249759353f494ad1/src/installer.ts#L265-L412),
[package scripts](https://github.com/vercel-labs/skills/blob/1164afa5f0e21ebd01e6fc11249759353f494ad1/package.json#L16-L31).
The compatibility table also reports no hooks for Codex or OpenClaw. [Supported-agent
feature matrix](https://github.com/vercel-labs/skills/blob/1164afa5f0e21ebd01e6fc11249759353f494ad1/README.md#L456-L482)

**Conclusion:** do not claim that installation automatically patches global
instructions. A skill may document a setup action; a separate trusted setup
tool may perform it only after preview and consent.

## Platform discovery and placement

### Codex

Codex aggregates `$CODEX_HOME` `AGENTS.override.md`/`AGENTS.md`, then scans
from Git/project root through the current working directory, subject to a
default 32 KiB project-instruction limit; more-specific material appears later.
[OpenAI: Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
Its current source defines the scope rule: a nested `AGENTS.md` applies to its
directory tree and more deeply nested instructions take precedence, while
system/developer/user instructions supersede it. [Codex default
instructions](https://github.com/openai/codex/blob/main/codex-rs/protocol/src/prompts/base_instructions/default.md#L78-L91)

**Placement rule:** a personal standing pointer belongs only in the user-owned
global file (`$CODEX_HOME/AGENTS.md`, normally `~/.codex/AGENTS.md`). A project
setup may offer an explicitly separate, repository-local pointer in the root
`AGENTS.md`. It must discover and display all applicable files before it writes
anything; it must not infer that a global pointer is sufficient for a project
where a nested instruction overrides it.

### OpenClaw

OpenClaw does not use Codex's directory-walk `AGENTS.md` layering for its core
workspace context. Each configured agent has one workspace; its workspace
`AGENTS.md` is one of the bootstrap files injected at the first turn of a new
session. [OpenClaw agent runtime](https://docs.openclaw.ai/concepts/agent#bootstrap-files-injected)
The active workspace is configured per agent (`agents.defaults.workspace` or
`agents.entries.*.workspace`); an agent's `AGENTS.md` is loaded every session.
[OpenClaw agent workspace](https://docs.openclaw.ai/concepts/agent-workspace#workspace-file-map)

OpenClaw skill discovery is separate and ordered: workspace `skills/`, project
`.agents/skills/`, personal `~/.agents/skills/`, managed/local
`~/.openclaw/skills/`, bundled skills, then extra folders. [OpenClaw agent
runtime — skills](https://docs.openclaw.ai/concepts/agent#skills)

**Placement rule:** the standing pointer belongs in the selected agent workspace's
`AGENTS.md`, not `~/.openclaw/skills` and not an assumed global `AGENTS.md`.
For multiple OpenClaw agents, discovery must enumerate workspaces and require
the operator to select one or more explicit targets. Never copy a pointer to
every agent by default: each workspace is a persona and authority boundary.

## Recommended managed-block contract

Call the mechanism `thinking-in-systems setup instructions` rather than an install
hook. It has one owner: the released setup implementation and its recorded
state. The skill body only explains when it should be used.

### Block format

Use stable, vendor-neutral markers and a small payload:

```md
<!-- thinking-in-systems:start v1 -->
## Thinking in Systems

For any request beyond a trivial, isolated change, load the `thinking-in-systems`
skill before proposing or acting. Apply its proportional process; preserve the
user's authority to accept risk or bypass steps after the consequences are made
explicit.
<!-- thinking-in-systems:end -->
```

The block is a discovery pointer, not a second copy of the method. It contains
the skill name, the model-invocation threshold, the proportionality clause, and
the authority/bypass clause—nothing else. Versioned markers simplify migration,
but the canonical version is in state and the installed skill manifest, not the
visible marker alone.

### State record

Store a private, machine-local record for each managed target (for example,
inside the setup tool's own configuration directory, never inside the managed
block):

```text
schemaVersion
targetKind                 # codex-global | codex-project | openclaw-workspace
canonicalPath
canonicalRealPath          # symlink-resolved path
blockId                    # thinking-in-systems
installedSkillVersion      # repository commit/tag + skill version
managedBlockHash           # exact block last written
preChangeFileHash          # optional rollback guard
installedAt / updatedAt
```

The state record provides truthful `status`, collision detection, deterministic
updates, and a rollback guard. It contains no source-file contents, credentials,
or private instructions.

### Setup / update algorithm

1. **Discover, do not guess.** Resolve `$CODEX_HOME`, Git/project root, current
   working directory, all applicable Codex instruction paths, or the explicit
   OpenClaw agent workspace(s). Resolve symlinks and show the actual target.
2. **Read and validate.** Count exact start/end markers. Proceed only when both
   are absent or exactly one correctly ordered pair exists. One orphan marker,
   multiple pairs, crossed pairs, or an unknown marker version is a conflict:
   make no change and show a repair plan.
3. **Compose a zero-effect preview.** Present a unified diff, target scope,
   current/next skill version, and the reason the pointer belongs at that
   location. The default is no write.
4. **Protect human edits.** If a managed pair exists and its hash differs from
   the recorded `managedBlockHash`, stop as `modified-by-human`. Offer:
   `adopt` (record the human block as custom and stop automatic updates),
   `show-diff`, `restore-released-block` (explicit force, backup first), or
   `remove`. Never silently replace it.
5. **Write atomically after explicit confirmation.** Preserve all text outside
   the exact marker range byte-for-byte. Append a missing block after two
   newlines. Create a timestamped backup before the first write and before any
   forced replacement. Use a temp-file-plus-rename operation in the same
   directory where supported.
6. **Verify the seam.** Re-read the file, verify exactly one complete pair,
   exact expected hash, unchanged outside-region hash, and installed skill path
   and version. For Codex, run a representative fresh session/discovery check;
   for OpenClaw, verify the selected workspace and run only its configured
   non-destructive validation seam.

### Idempotency, upgrades, conflicts, removal, and rollback

| Operation | Required behavior |
| --- | --- |
| `setup` again | A matching, unmodified block at the requested version is a no-op and reports `already-current`. |
| `status` | Shows target, canonical/real path, discovered scope, installed version, marker validity, managed hash result, and whether a newer pinned release is available. It never writes. |
| `update` | Uses a requested immutable tag/commit or an explicitly accepted latest release. It performs the same preview and human-edit guard as setup. |
| human edit inside block | Treat as a conflict, not a drift to overwrite. Preserve it until an explicit adopt/restore/remove decision. |
| human edit outside block | Preserve it. Verify outside-region hash before and after; a concurrent change aborts/retries from a new preview. |
| marker corruption or duplicate blocks | Fail closed. Do not choose a block heuristically. Explain the exact corruption and offer a dry-run repair. |
| `remove` | Preview removal of exactly the validated managed region. Remove the file only if it is empty afterward. Delete state only after verification. |
| `rollback` | Restore the immediately preceding backup only if the target's current hash matches the setup tool's last-written hash. Otherwise stop and request an explicit merge decision. |

### Version pinning and trust

- The first public setup guide should recommend an immutable Git tag or commit,
  not an unqualified moving branch. Record both source and resolved commit in
  the state record.
- `skills.sh` installation can update the skill directory, but it does not
  establish a reliable hook to update a standing pointer. Pointer upgrades are
  separate, explicit transactions.
- A public skill cannot safely assume authority over a user's global
  instructions. The setup tool is optional and its source/release should be
  inspectable before execution.

## Decision for the public skill repository

Ship **reference-only setup guidance** with the first `thinking-in-systems`
release. It should include:

1. the concise pointer text for Codex and OpenClaw;
2. the discovery/preview/confirmation/verification contract above;
3. a statement that `skills.sh` does not auto-run this setup; and
4. a future setup command interface, marked *not implemented*.

Do **not** ship a mutating setup script in the first release. It has a large
trust boundary, must be evaluated against real global and workspace instruction
files, and should be introduced only after a dedicated design, dry-run test
matrix, and independent review.

## Sources

- [Trigger.dev Skills](https://trigger.dev/docs/skills)
- [Trigger.dev `skills.ts` implementation](https://github.com/triggerdotdev/trigger.dev/blob/14824b09556ac3310643174ec33a405d909bb129/packages/cli-v3/src/commands/skills.ts)
- [Convex AI-files CLI reference](https://docs.convex.dev/cli/reference/ai-files)
- [Convex managed-section utility](https://github.com/get-convex/convex-js/blob/653e6c1cca294f84a4c70ae8f928fd874afc8aa1/src/cli/lib/aiFiles/utils.ts)
- [Vercel skills CLI README](https://github.com/vercel-labs/skills/blob/1164afa5f0e21ebd01e6fc11249759353f494ad1/README.md)
- [Vercel skills installer](https://github.com/vercel-labs/skills/blob/1164afa5f0e21ebd01e6fc11249759353f494ad1/src/installer.ts)
- [OpenAI: Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
- [Codex default `AGENTS.md` instructions](https://github.com/openai/codex/blob/main/codex-rs/protocol/src/prompts/base_instructions/default.md)
- [OpenClaw agent runtime](https://docs.openclaw.ai/concepts/agent)
- [OpenClaw agent workspace](https://docs.openclaw.ai/concepts/agent-workspace)
