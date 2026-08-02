# Development setup

The repository has no application runtime, package manager, or build step. Skills are ordinary Agent Skills folders authored and evaluated one at a time.

## Authoring prerequisite

`writing-great-skills` is a development-time prerequisite. It governs invocation, one-job granularity, progressive disclosure, context pointers, completion criteria, and pruning. It is not a runtime dependency of published skills.

Verify or install it explicitly from Matt Pocock's public repository:

```sh
npx skills@latest add mattpocock/skills --skill writing-great-skills
```

The installer does not resolve this transitively. A fresh authoring environment must run this setup deliberately before changing a skill.

## Create a skill only when its design is accepted

Vercel's initializer creates only a placeholder `SKILL.md`:

```sh
npx skills@latest init <skill-name>
```

Do not initialize a skill during planning. A placeholder becomes discoverable by Codex and skills.sh even though it is not usable.

When implementation is authorized, place the package under `skills/<skill-name>/` and add `agents/openai.yaml` manually. The repository requires at least:

```yaml
interface:
  display_name: "Human-facing name"
  short_description: "Short human-facing description"
policy:
  allow_implicit_invocation: true
```

Choose the policy rather than copying the example. Use `false` for a deliberately explicit/user-invoked skill. Add `default_prompt`, icons, brand color, or tool dependencies only when the skill needs them.

## Minimum validation

1. Validate frontmatter, links, and `agents/openai.yaml`.
2. Test direct, indirect, incomplete, negative, and edge-case prompts.
3. Verify missing companions produce honest degraded behavior.
4. Confirm the repository contains no private material or local paths.
5. Run one independent adversarial review and one resolution check before publication.
