# Skill packages

`thinking-in-systems`, `workflow`, `to-spec`, `to-tickets`, `domain-modeling`,
`review`, and `prototype` are approved. `handoff` has an implementation
candidate awaiting required human review. The approved Workflow Durable route and
To Tickets implementation merged through PR #45 and closed issues #14 and #23.
`wayfinder` is an implemented candidate awaiting the human review required by
issue #21.
Suite publication remains gated by the composed-suite and clean-install proof
in #31 and the immutable-release review in #32.

Each package uses `skills/<skill-name>/SKILL.md` with supporting `references/`, `assets/`, `scripts/`, and `agents/openai.yaml` only where they serve that skill's single job.

Do not add a placeholder `SKILL.md`: skills.sh and Codex would discover it as if it were usable.

## `domain-modeling`

Establishes shared terminology through the selected Adapter. Use it when words
or boundaries block shared understanding; see the [suite roster](../docs/SUITE_ROSTER.md)
for its completion boundary and Workflow handoff.

## `wayfinder`

Navigates persistent, multi-session, or irreducible fog through a durable
decision Map and operating Strategy. It returns a truthfully specifiable next
route or governed remaining fog without executing the destination or requiring
Git.
