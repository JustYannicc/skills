---
name: setup-system-thinking
description: Install, update, repair, or reconfigure the systems-thinking skill suite.
disable-model-invocation: true
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Setup System Thinking

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

## Configure the selected scope

### 1. Explore

Establish whether this run manages the project or global scope. One run manages one scope.

Inspect `npx skills list --json`, adding `--global` for global scope. Resolve where Setup is installed, which agent targets consume it, and any symlinks involved. Record the installed source of every suite skill and each same-name overlap.

Read the effective `AGENTS.md` and `CLAUDE.md` files. Find current `systems-thinking-suite` markers, earlier `thinking-in-systems-suite` markers, and released v1 markers beginning `<!-- setup-system-thinking:begin version=1`. Inspect surrounding instructions for conflicts with the suite.

Inspect the selected scope for authoritative or established homes for:

- The work tracker used by Wayfinder, To Spec, and To Tickets
- Language records and any context map used by Domain Modeling
- Architecture decision records (ADRs)
- The system registry used by Representing Systems
- Governing standards and authoritative sources
- Explicit project authority or responsibility boundaries

Treat the installed skill descriptions as the suite's invocation mechanism. Project instructions need only choices that differ from skill defaults or cannot be discovered from the environment.

Apply `writing-for-agents` and `writing-guidelines` before drafting or editing an instruction file. If either is unavailable, offer its normal installation as a separate authoring helper and preserve a package-only route when the user declines it.

**Done when:** the scope, agent targets, package sources, overlaps, instruction files, artifact homes, and proposed changes are known.

### 2. Present

Show what is present, missing, or sourced incorrectly. Present the artifact homes, governing sources, and authority boundaries that were discovered. Present the exact removals and installations, preserving packages that already match. Reuse the agent selection that installed Setup and add `--global` only for global scope.

Remove an overlap only after verifying its installed source and receiving approval for that exact replacement. Recommend replacement when a local skill supersedes the same skill from `mattpocock/skills`. Present every other same-name source as a conflict without defaulting to replacement:

```bash
npx skills remove --skill approved_overlap_names --yes
```

Use the package commands above, omitting skills that already match the approved source, every preserved same-name package, and every declined overlap. Add the accepted scope and agent flags.

Present the package plan and one of these instruction plans:

- No instruction change when the environment or skill defaults already determine every artifact home
- Removal of an earlier activation block that duplicates skill behavior
- A minimal configuration change for accepted project-specific facts

When configuration is required, edit an existing effective instruction file. Ask which file should own it only when several files have equal authority. Create an instruction file only when the accepted configuration must persist and no effective file exists.

Use this marked block as the shape. Omit every line that repeats a skill default or an authoritative project convention:

```markdown
<!-- systems-thinking-suite:begin -->
## Systems-thinking configuration

- Use `accepted_work_tracker` as the work tracker.
- Store language records and the context map in `accepted_language_location`.
- Store ADRs in `accepted_adr_location`.
- Store system records in `accepted_system_record_location`.
- Treat `accepted_source` as authoritative for `accepted_scope`.
- `accepted_actor` has authority over `accepted_decision_or_effect`.
<!-- systems-thinking-suite:end -->
```

The block records project configuration. It does not restate skill triggers, methods, contracts, or templates. Let the user edit it before approval. Preserve unrelated instructions and propose the smallest change for any conflict.

**Done when:** the package plan and complete instruction plan are visible and approved.

### 3. Write

Recheck every approved target before changing it. Stop and present a revised plan if its state changed after confirmation.

Apply the approved package plan. Remove only approved overlaps, install the local suite without overwriting preserved or declined same-name packages, then install both upstream dependencies without modifying them.

Apply the approved instruction plan. Remove obsolete current or earlier marked blocks when no configuration remains. Otherwise replace every obsolete or duplicate marked block with one accepted current block after the file's title or opening instructions. Stop and report malformed or overlapping markers instead of guessing their boundary. Preserve the rest of the file and its symlinks.

**Done when:** the approved packages and instruction state are present and unrelated state is unchanged.

### 4. Verify

Run `npx skills list --json` for the selected scope. Confirm that every approved skill is installed from its approved source and no unapproved package was replaced. Confirm that each selected instruction file matches the accepted instruction plan and contains at most one current marker pair.

Report the configured scope, installed sources, instruction state, artifact homes, preserved packages, and any verification that remains unresolved.

**Done when:** the installed packages and instruction files match the approved plan.
