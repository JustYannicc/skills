# Skill packages

`thinking-in-systems` is approved. `workflow` implements the approved Inline
route and the Durable coordination candidate as a human-review-required issue
#14 result. `to-spec`, `domain-modeling`, `review`, and `prototype` are approved;
`to-tickets` has an implementation candidate. Suite
publication remains gated by the composed-suite and clean-install proof in #31
and the immutable-release review in #32.

Each package uses `skills/<skill-name>/SKILL.md` with supporting `references/`, `assets/`, `scripts/`, and `agents/openai.yaml` only where they serve that skill's single job.

Do not add a placeholder `SKILL.md`: skills.sh and Codex would discover it as if it were usable.

## `domain-modeling`

Establishes shared terminology through the selected Adapter. Use it when words
or boundaries block shared understanding; see the [suite roster](../docs/SUITE_ROSTER.md)
for its completion boundary and Workflow handoff.
