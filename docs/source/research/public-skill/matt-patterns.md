# Matt Pocock Skills: Patterns Relevant to `thinking-in-systems`

**Investigated:** 2026-08-02

**Primary source:** [`mattpocock/skills` at `2ab9580`](https://github.com/mattpocock/skills/tree/2ab958093e83e0ec752e6c1c5932da465bf23e0c)

**Purpose:** establish what Matt's repository actually supports before deciding whether `thinking-in-systems` should depend on, include, or merely interoperate with related skills.

## Bottom line

There is **no package-manager-style dependency feature for individual skills** in this repository or in its documented `skills.sh` usage. Matt expresses a dependency by instructing the agent to invoke another skill in prose (for example, “run `/grilling`”), rather than by importing another skill's files. That only works if the named skill is already installed and model-reachable. Therefore `thinking-in-systems` must retain the universal method it needs to perform correctly; it may list optional companion skills and invoke a model-invoked companion where present, but it cannot rely on transitive installation.

This supports a three-way split for the public skill:

| Need | Recommended treatment |
| --- | --- |
| Universal systems-thinking method and safety/decision rules | Own, independently written reference material inside `thinking-in-systems`. |
| A capability that is genuinely optional (for example, a deep planning interview) | State the capability and offer an optional named companion skill when installed; preserve a native fallback. |
| A capability necessary to complete the method's contract | Include an independently written, scoped version; do not make the public skill silently depend on an external installation. |

## Repository shape and publishing pattern

The repository separates skills into buckets: `engineering`, `productivity`, `misc`, `personal`, `in-progress`, and `deprecated`. Its [root instructions](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/AGENTS.md) define `engineering` and `productivity` as promoted: each must be linked from the top-level README, listed in the Claude plugin manifest, and have a mirrored human documentation page. The other buckets are deliberately not promoted.

It offers two distribution paths: a managed Claude Code plugin, or editable copies installed with `npx skills@latest add mattpocock/skills`; the latter update through `npx skills update`. That is a distribution choice, **not** dependency resolution. See [installation](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/README.md#installation-30-second-setup).

Reusable patterns:

- Keep one public, promoted skill small at the top and disclose detailed material through clear context pointers.
- Make the README a usable catalog, not merely an installation page; its reference section separates user-invoked and model-invoked skills. [README reference](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/README.md#reference)
- Keep published documentation synchronized with the behavior actually shipped.
- Keep drafts, personal material, and deprecated material visibly out of the promoted surface.

## Invocation and dependencies

Matt draws one explicit axis: **who may invoke a skill**.

- A user-invoked skill has `disable-model-invocation: true`; its description is a short human-facing command label.
- A model-invoked skill omits that restriction and has a concise trigger-rich, model-facing description.
- The same distinction is represented for Codex in a sibling `agents/openai.yaml`, including `policy.allow_implicit_invocation: false` for user-invoked skills.

The repository’s own [invocation convention](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/.agents/invocation.md) is unambiguous:

1. Dependencies are prose `/skill` invocations, not deep relative links into another skill’s folder.
2. Shared reference material remains inside the skill that owns it.
3. A user-invoked skill may invoke a model-invoked skill, but cannot invoke another user-invoked skill.

Consequences for `thinking-in-systems`:

- If it needs automatic reach on most non-trivial planning, workflow, life-system, and system-repair requests, it should be **model-invoked**.
- `grill-me`, `wayfinder`, and `handoff` are user-invoked in Matt’s system. The public skill must not make their installation a correctness requirement.
- A future maintainer-query router could be user-invoked and route to `thinking-in-systems` plus other model-invoked skills. That matches Matt's router pattern without duplicating the method.

## Setup and AGENTS/CLAUDE management

[`setup-matt-pocock-skills`](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/skills/engineering/setup-matt-pocock-skills/SKILL.md) is a user-invoked, prompt-driven per-repository setup. It does not blindly create configuration:

1. It inspects the repository, existing instructions, tracker conventions, existing domain docs, and monorepo signals.
2. It asks only unresolved choices, in a defined order.
3. It shows the proposed instruction block and configuration files for confirmation.
4. It updates one existing instruction surface (`CLAUDE.md` first, otherwise `AGENTS.md`); if neither exists, it asks which to create.
5. It places the detailed durable configuration under `docs/agents/` and leaves a small visible pointer in the instruction file.

Its [`explicit setup pointer` ADR](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/.agents/adr/0001-explicit-setup-pointer-only-for-hard-dependencies.md) makes a reusable distinction:

- **Hard dependencies:** a missing configured fact would make the behavior wrong. The affected skill tells the agent explicitly to run setup.
- **Soft dependencies:** missing configuration only makes output less sharp. The skill degrades gracefully and avoids cargo-cult setup pointers.

This is directly reusable for a `thinking-in-systems` setup reference: map the effective AGENTS/CLAUDE precedence first; retain immediate universal triggers in the active global file; put detailed, versioned skill behavior in the installed skill; and use a controlled marker/managed block only after verifying the platform’s merge and replacement semantics. The precise syntax and updater mechanism must be independently verified for each agent harness—Matt’s repository documents a pattern, not a portable standard.

## How the related skills interact

| Skill | Role in Matt’s flow | Reusable idea for the public skill | Dependency status |
| --- | --- | --- | --- |
| [`ask-matt`](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/skills/engineering/ask-matt/SKILL.md) | User-invoked router over the flows. | A future router can keep the user’s cognitive load low while preserving specialized skills. | Not a runtime dependency. |
| [`grilling`](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/skills/productivity/grilling/SKILL.md) / [`grill-me`](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/skills/productivity/grill-me/SKILL.md) | `grill-me` is a thin user-invoked wrapper over model-invoked `grilling`; it resolves decision-tree branches one at a time. | Explicit assumptions, facts discovered rather than asked, and human-owned decisions. `thinking-in-systems` can include a small native clarification protocol or optionally point to an installed grilling skill. | Optional companion; cannot be required transitively. |
| [`batch-grill-me`](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/skills/in-progress/batch-grill-me/SKILL.md) | In-progress only; asks the currently unblocked decision frontier in rounds. It is not promoted in the public README/plugin. | Frontier rounds are useful where decisions are independent; preserve sequential questions when one answer changes the next. | Optional inspiration, not a stable dependency. |
| [`wayfinder`](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/skills/engineering/wayfinder/SKILL.md) | User-invoked multi-session map of decision tickets; plans by default, then hands off to a build flow. | Destination first, canonical index rather than duplicate store, visible blockers/frontier, decisions before delivery, and fog that becomes tickets only when sharp. | Optional companion pattern; its tracker requirement makes it unsuitable as a hidden universal dependency. |
| [`tdd`](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/skills/engineering/tdd/SKILL.md) | Model-invoked red-green work at agreed public seams. | Test at the agreed interface; one vertical slice at a time; independent expected evidence. These map cleanly to simulation/proof at system seams. | Extract the universal proof principle, not coding-specific test mechanics. |
| [`handoff`](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/skills/productivity/handoff/SKILL.md) | User-invoked bridge between fresh context windows; writes a compact temporary document, references existing artifacts, and redacts sensitive data. | Every meaningful handoff has a contract and references canonical artifacts rather than duplicating them. | Optional companion; universal handoff rules belong in the method. |
| [`improve-codebase-architecture`](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/skills/engineering/improve-codebase-architecture/SKILL.md) | A user-invoked remediation flow: survey friction, present candidates, then grill the chosen remediation. | Generalize this into system remediation: inspect current state, surface measurable friction, choose one candidate, clarify it, then make a bounded corrective change. | The closest current analogue to “unfuck”; no generic cross-domain remediation skill exists. |

## “Subway orchestration”, “loop engineering”, and “graph engineering”

An exact case-insensitive repository search found **no occurrences** of any of these three phrases at the investigated commit.

- There is an in-progress [`loop-me`](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/skills/in-progress/loop-me/SKILL.md), but it concerns discovering recurring life workflows; it does not define “loop engineering.”
- Wayfinder does represent decision work as a dependency graph with a visible unblocked frontier, but it does not call that “graph engineering.” See [its map and blocking model](https://github.com/mattpocock/skills/blob/2ab958093e83e0ec752e6c1c5932da465bf23e0c/skills/engineering/wayfinder/SKILL.md#the-map).
- “Subway orchestration” is absent; no definition can be attributed to Matt’s repository.

If those are desired named patterns, define them independently in `thinking-in-systems`, with a plain-language contract and good/bad examples rather than presenting them as Matt terminology.

## Attribution and reuse boundary

Repository structure, invocation taxonomy, router/setup patterns, and high-level design ideas are reusable as ideas. The repository is MIT-licensed, but the public skill should still be independently authored:

- Do not copy Matt’s prose, diagrams, templates, leading-word terminology, or long examples when an independently written formulation will do.
- Cite or credit the repository in a sources/influences section for transparency.
- Preserve the user’s distinct universal method, human empathy, anti-decay, measurable outcomes, and life-system scope as the skill’s own contribution.

This is both clearer for users and safer against confusing derivative text with an independently designed method.

## Design implication to carry forward

Use **capability-based interoperability**, not a dependency chain: `thinking-in-systems` should say what it needs—clarification, research, proof, handoff, long-horizon planning—and use an installed companion only when it is available and model-reachable. The setup reference should configure discovery, instruction ownership, and an optional managed AGENTS/CLAUDE block, but should never make a user-invoked external skill a silent precondition for the universal method.
