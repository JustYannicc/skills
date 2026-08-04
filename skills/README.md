# Skill packages

`thinking-in-systems` is approved and `review` has an implementation candidate.
Suite publication remains gated by the composed-suite and clean-install proof
in #31 and the immutable-release review in #32.

Each package uses `skills/<skill-name>/SKILL.md` with supporting `references/`, `assets/`, `scripts/`, and `agents/openai.yaml` only where they serve that skill's single job.

Do not add a placeholder `SKILL.md`: skills.sh and Codex would discover it as if it were usable.
