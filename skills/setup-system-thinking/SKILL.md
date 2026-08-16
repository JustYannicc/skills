---
name: setup-system-thinking
description: Install, update, repair, or reconfigure the systems-thinking skill suite.
disable-model-invocation: true
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Set up systems thinking

Set up the systems-thinking skill suite for one project or global scope. Explore, present what you found, confirm with the user, then write.

## Packages

Install the local suite:

```bash
npx skills add JustYannicc/skills --skill thinking-in-systems domain-modeling framing-decisions choosing-interventions representing-systems designing-interfaces implementing-systems automating-systems operating-a-system evaluating-systems changing-systems governing-systems wayfinder prototype to-spec to-tickets review
```

Install the upstream dependencies:

```bash
npx skills add mattpocock/skills --skill grilling research
```

Use the upstream packages unchanged, including their model-invocation choices. The local suite replaces Matt Pocock's `domain-modeling`, `wayfinder`, `prototype`, `to-spec`, and `to-tickets`. Preserve every unrelated installed skill and every same-name skill from another source unless the user approves replacing it.

## Set up the selected scope

### 1. Explore

Establish whether this run manages the project or global scope. One run manages one scope.

Inspect `npx skills list --json`, adding `--global` for global scope. Resolve where Setup is installed, which agent targets consume it, and any symlinks involved. Record the installed source of every suite skill and each same-name overlap.

Read the effective `AGENTS.md` and `CLAUDE.md` files. Find current `systems-thinking-suite` markers, earlier `thinking-in-systems-suite` markers, and released v1 markers beginning `<!-- setup-system-thinking:begin version=1`. Inspect the surrounding instructions for conflicts with the suite-owned block.

The marked block supplies the foundational lens. Installed skill descriptions pull detailed methods when the work calls for them. Each skill owns its records, templates, artifact locations, and completion criteria.

**Done when:** the scope, agent targets, package sources, overlaps, instruction files, and proposed changes are known.

### 2. Present

Show what is present, missing, or sourced incorrectly. Present the exact removals and installations, preserving packages that already match. Reuse the agent selection that installed Setup and add `--global` only for global scope.

Remove an overlap only after verifying its installed source and receiving approval for that exact replacement. Recommend replacement when a local skill supersedes the same skill from `mattpocock/skills`. Present every other same-name source as a conflict without defaulting to replacement:

```bash
npx skills remove --skill approved_overlap_names --yes
```

Use the package commands above, omitting skills that already match the approved source, every preserved same-name package, and every declined overlap. Add the accepted scope and agent flags.

Present the complete instruction diff. Edit an existing effective instruction file. Ask which file should own the block only when several files have equal authority. Create an instruction file only when the primer must persist and no effective file exists.

Use this exact marked block:

```markdown
<!-- systems-thinking-suite:begin -->
## What is systems thinking?

Systems thinking explains outcomes through the system producing them: components, relationships, rules, constraints, incentives, feedback loops, and operating conditions. The same lens applies across personal, organizational, physical, and technical work.

Treat a requested action as a possible intervention. Establish why it matters now, the intended outcome, and the conditions required for that outcome to persist. Follow **Action → Output → Outcome → Goal** only as far as it changes the work. When behavior recurs, changes unexpectedly, or resists a fix, ask:

> **Why is the system producing this?**

Recurrence shows that a system is producing the outcome; it does not identify the cause. Establish what changed and gather evidence before choosing an intervention. Trace only material context: reinforcing feedback loops, path-shaping friction, and dependencies that propagate change. Expand the boundary only while more context could change the decision.

Keep operative language, authority, responsibility, ownership, and uncertainty explicit. Leave consequential choices with the relevant person. Judge alternatives and outcomes rather than the decision frame; consider cost, effects, reversibility, and the behavior encouraged. Seek reversible evidence when decisions remain uncertain.

Design change around observable reliance and proof seams. State accepted outcomes so others can proceed without inventing requirements. Preserve state only when it must outlive the interaction. Use deterministic mechanisms for repeatable rules, bounded model judgment for interpretation, and human authority for values.

Treat implementation as a candidate and change as a transition from the existing system, preferring bounded changes that can be verified independently. Account for existing state and recovery, expanding reliance only as evidence warrants. Verify contracts, validate the outcome in real operating conditions, and review the result against its originating input and governing standards. Prefer root-cause or leverage-point interventions; keep depth proportional and finish when the outcome is verified.
<!-- systems-thinking-suite:end -->
```

The block is a projection of the suite’s foundational language, not a replacement for the skills. Allow edits before approval. Preserve unrelated instructions and propose the smallest change for any conflict.

**Done when:** the package plan and complete instruction plan are visible and approved.

### 3. Write

Recheck every approved target before changing it. Stop and present a revised plan if its state changed after confirmation.

Apply the approved package plan. Remove only approved overlaps, install the local suite without overwriting preserved or declined same-name packages, then install both upstream dependencies without modifying them.

Apply the approved instruction plan. Replace every obsolete or duplicate marked block with one accepted current block after the file’s title or opening instructions. Stop and report malformed or overlapping markers instead of guessing their boundary. Preserve the rest of the file and its symlinks.

**Done when:** the approved packages and instruction state are present and unrelated state is unchanged.

### 4. Verify

Run `npx skills list --json` for the selected scope. Confirm that every approved skill is installed from its approved source and no unapproved package was replaced. Confirm that each selected instruction file contains the accepted block exactly once and no earlier suite marker remains.

In a fresh agent context that sees the installed skills and instruction file, test both recognition and proportionality:

- `Lately, I've been having trouble going to bed on time.` must trigger systems thinking about the recurring outcome, establish what changed, and gather evidence about the producing system before proposing an intervention.
- `What is 2 + 2?` must return exactly `4`.

Confirm which skills the agent loaded and whether its behavior matched each case. When a fresh context is unavailable, report the behavior check as unresolved and return these exact prompts for manual testing.

Report the configured scope, installed sources, instruction state, preserved packages, and any verification that remains unresolved.

**Done when:** the installed packages and instruction files match the approved plan, and both fresh-context cases pass or remain explicitly unresolved.
