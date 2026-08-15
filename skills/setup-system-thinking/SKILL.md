---
name: setup-system-thinking
description: Use when installing, updating, repairing, or reconfiguring the systems-thinking skill suite.
disable-model-invocation: true
---

# Setup System Thinking

Set up the systems-thinking skill suite for one project or global scope. This is a prompt-driven skill: explore, present what you found, confirm with the user, then write.

## Packages

Install the local suite:

```bash
npx skills add JustYannicc/skills --skill thinking-in-systems domain-modeling framing-decisions choosing-interventions representing-systems automating-systems operating-a-system evaluating-systems changing-systems governing-systems wayfinder prototype to-spec to-tickets review
```

Install Matt Pocock's dependencies:

```bash
npx skills add mattpocock/skills --skill grill-with-docs grilling research to-questionnaire handoff
```

Use Matt Pocock's packages unchanged, including their model-invocation choices. The local suite replaces Matt's `domain-modeling`, `wayfinder`, `prototype`, `to-spec`, and `to-tickets`; preserve every unrelated installed skill and every same-name skill from another source unless the user approves replacing it.

## Process

### 1. Explore

Establish whether this run manages the project or global scope. One run manages one scope.

Inspect `npx skills list --json`, adding `--global` for global scope. Resolve where Setup is installed, which agent targets consume it, and any symlinks involved. Record the installed source of every suite skill and each same-name overlap.

Read the effective `AGENTS.md` and `CLAUDE.md` files. Find any earlier systems-thinking block and any surrounding instruction that conflicts with the proposed behavior.

**Done when:** the scope, agent targets, package sources, overlaps, instruction files, and proposed changes are known.

### 2. Present

Show what is present, missing, or sourced incorrectly. Present the exact removals and installations, preserving packages that already match. Reuse the agent selection that installed Setup and add `--global` only for global scope.

Remove an overlap only when it came from `mattpocock/skills` and the user approves its replacement:

```bash
npx skills remove --skill <approved-overlap-names> --yes
```

Use the package commands above, omitting skills that already match the approved source and adding the accepted scope and agent flags.

Recommend editing the existing instruction file when only `AGENTS.md` or `CLAUDE.md` exists. When both exist, ask whether to update one or both. When neither exists, ask which one to create.

Show this block as an editable draft:

```markdown
<!-- systems-thinking-suite:begin -->
## Systems thinking

Treat the requested action as the starting point, not automatically as the goal. Let the user's reason govern the work. When a problem recurs, diagnose the system that keeps producing it. When timing matters, establish what changed. Judge success by the resulting behavior and outcome, not by completion of the named action.

Infer when context is clear and a mistake is cheap. Ask when ambiguity changes the path and guessing wrong has meaningful cost.
<!-- systems-thinking-suite:end -->
```

The block supplies behavior worth carrying on every task while leaving focused guidance behind each skill's description. Let the user edit it before approval. Preserve unrelated instructions and propose the smallest change for any conflict.

**Done when:** the package plan and complete instruction diff are visible and approved.

### 3. Write

Recheck every approved target before changing it. Stop and present a revised plan if its state changed after confirmation.

Apply the approved package plan. Remove only approved Matt overlaps, install the local suite, then install all five Matt dependencies without modifying them.

Write the approved block to each selected instruction file. Update the marked block in place when it already exists; otherwise place it after the file's title or opening instructions. Preserve the rest of the file and its symlinks.

**Done when:** the approved packages and instruction block are present and unrelated state is unchanged.

### 4. Verify

Run `npx skills list --json` for the selected scope. Confirm that every approved skill is installed from its approved source and no unapproved package was replaced. Confirm that each selected instruction file contains the accepted block once.

Report the configured scope, installed sources, edited instruction files, preserved packages, and any verification that remains unresolved.

**Done when:** the installed packages and instruction files match the approved plan.
