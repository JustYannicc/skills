---
name: setup-system-thinking
description: Install, activate, repair, or remove the Thinking in Systems suite for one project or global scope.
disable-model-invocation: true
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Setup System Thinking

Set up one `project` or `global` scope. Follow Matt Pocock's prompt-driven shape: explore, present, confirm, write, done.

Read each bundled reference when its step needs it:

- [instructions.md](references/instructions.md) before proposing an instruction change.
- [corrections.md](references/corrections.md) before proposing package changes.
- [receipt.md](references/receipt.md) when inspecting or writing recovery state.
- [verification.md](references/verification.md) after writing.

## What activation adds

Setup supports only two instruction standards:

- `AGENTS.md` for agents that use the AGENTS standard.
- `CLAUDE.md` for Claude.

The skill directory (`.agents/skills`, `.claude/skills`, or a global equivalent) is separate from the instruction file. The `skills` command manages skill directories.

Setup shows this editable default before writing it to either standard:

```markdown
<!-- thinking-in-systems-suite:begin -->
## Thinking in Systems workflow

For every request, before doing anything else:

1. Read and follow the `thinking-in-systems` skill.
2. Read and follow the `workflow` skill.
3. Use Thinking in Systems to decide the approach.
4. Use Workflow to own the request through verified completion, accepted handoff, or authoritative cancellation.

Keep simple work proportional. Create durable workflow records only when the work must survive the current conversation.
<!-- thinking-in-systems-suite:end -->
```

Place the accepted block as the first substantive instruction section, immediately after any YAML frontmatter and document title. The person running Setup may edit any part of the draft before approving it.

## Process

### 1. Explore

Ask for the scope: `project` or `global`. One run manages one scope.

Inspect without changing anything:

- `npx skills list --json`, adding `--global` for global scope;
- where this Setup package is installed and which skill directories consume it;
- existing suite skills, their recorded source, and the eleven managed name overlaps;
- `AGENTS.md`, `CLAUDE.md`, their effective symlink targets, and surrounding instructions;
- an existing installation receipt and backups, using [receipt.md](references/receipt.md);
- whether `writing-for-agents` is installed.

For instructions:

- If one standard exists, recommend updating it.
- If both exist, ask whether both should activate the suite.
- If neither exists, ask which one to create.
- If `writing-for-agents` is absent, recommend its command from [instructions.md](references/instructions.md). Install it only with approval.

**Done when:** scope, instruction standard, physical files, existing skills, overlaps, conflicts, and rollback inputs are known.

### 2. Present findings and ask

Summarize what is present and missing:

- the selected scope and agent targets;
- installed suite skills and their recorded sources;
- exact Matt overlaps and every skill that will be preserved;
- existing instruction standards, conflicts, and the proposed standard to edit;
- whether `writing-for-agents` is available.

Take questions one at a time and lead with the recommended answer. If `writing-for-agents` is missing, recommend its command and ask before installing it. If installation is declined, offer package-only setup and leave instructions unchanged.

Before drafting an instruction change, read [instructions.md](references/instructions.md) and `writing-for-agents`. Then prepare the block, its required placement as the first substantive instruction section, and the smallest suggested edits for any conflicts. An approved `writing-for-agents` installation is a separate helper, not a suite runtime package; preserve it after Setup.

**Done when:** the scope, package dispositions, instruction standard, and editable instruction draft or package-only choice are known.

### 3. Confirm and edit

Read [corrections.md](references/corrections.md), then show one compact before/after plan:

- skills preserved;
- exact `npx skills remove` command for overlaps installed from `mattpocock/skills`;
- the two `npx skills add` commands for the local and Matt runtime rosters in [corrections.md](references/corrections.md);
- bundled corrections to apply;
- the complete editable `AGENTS.md` and/or `CLAUDE.md` diff, with the activation block as the first substantive instruction section;
- each conflicting instruction and its smallest suggested edit;
- backup, receipt, verification, rollback, and final Setup-removal command.

Let the user edit the activation block or conflict resolutions. Preserve unrelated instructions. Confirm instruction edits separately from package installation. If instruction edits are declined, install packages only and report that automatic Thinking in Systems → Workflow activation is not configured.

**Done when:** every removal, installation, correction, instruction edit, and recovery action is visible and approved.

### 4. Write

Back up only the exact skill paths, lock entries, instruction files, symlinks, and receipt entries that the approved plan will change. Stop if any selected object changes before the write.

Apply the accepted plan in this order:

1. Remove only approved overlaps whose recorded installed source is `mattpocock/skills`, using the exact `npx skills remove --skill ... --yes` command from [corrections.md](references/corrections.md). Preserve same-name packages from any other source unless the user separately approves replacing them. Never delete skill directories directly.
2. Install missing or replaced local runtime skills with `npx skills add JustYannicc/skills --skill ...`.
3. Install missing or replaced Matt runtime skills with `npx skills add mattpocock/skills --skill ...`.
4. Dry-run and apply bundled corrections only to newly installed or replaced Matt packages. For a reused Matt package, verify the corrected behavior; if it is missing, preview replacement before changing it.
5. Write the approved instruction block as the first substantive instruction section and apply only approved conflict edits. Preserve the user's accepted block wording on later runs. In package-only mode, leave instructions unchanged.
6. Write the concise ownership and recovery record from [receipt.md](references/receipt.md).

Use `--global` only for global scope. Reuse the same target selection that installed Setup. Omit a remove or add command when its exact name list is empty.

**Done when:** all sixteen runtime skills are present, corrections apply, approved instructions and receipt match the preview, and unrelated state is unchanged.

### 5. Done

Read and run the Packages, Instructions, and Recovery checks in [verification.md](references/verification.md). A successful active setup includes a fresh-context request that uses `thinking-in-systems` before `workflow`. If a check fails, restore the checkpoint and report the failed command or file.

Setup removes itself only through the skills CLI:

```bash
npx skills remove --skill setup-system-thinking --yes
```

Add `--global` for global scope. If Setup was installed for Claude with an explicit target, reuse that target flag. When Setup has more than one recorded consumer, run one exact remove command per consumer.

Never delete the Setup directory directly. Run the Setup removal checks in [verification.md](references/verification.md). If the command reports success but Setup remains, report the incomplete state and the exact retry; leave the verified runtime in place.

Tell the user which skills and instruction files were configured, which conflicts they edited or kept, what was preserved, and that Setup removed itself through the command.

**Done when:** Setup is absent because the remove command succeeded, the sixteen runtime skills and receipt remain, the accepted activation state is unchanged, and the result has been reported.

## Maintenance

Reinstall Setup with the normal install command, then offer:

- **Status** — inspect only.
- **Repair** — restore missing skills, corrections, or the accepted instruction block.
- **Update** — rerun the normal install commands, reapply compatible corrections, and verify.
- **Reconfigure** — change scope instructions or optional configuration after a new preview.
- **Rollback** — restore the recorded backup.
- **Remove** — remove only receipt-owned runtime skills whose current recorded source still matches the receipt, preserve reused or changed packages, remove the marked instruction block after approval, then remove Setup with its command.

Every mutating branch repeats preview, confirmation, checkpoint, verification, and command-based Setup removal.
