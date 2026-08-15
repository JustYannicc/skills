Use the `writing-for-agents` skill for every creation, edit, or review of a skill or agent instruction. Read its `SKILL.md` and, for skill work, `SKILL-MECHANICS.md` completely before writing.

`SKILL.md` is the source of truth for `agents/openai.yaml`. After changing a skill, run `node scripts/generate-openai-yaml.mjs`; use `node scripts/generate-openai-yaml.mjs --check` to verify the generated files without rewriting them.
