# Systems thinking skills

This repository teaches agents how to think about systems. It recruits knowledge through generative terms and reasoning moves instead of trying to contain every relevant fact.

## What matters here

### Teach judgment

One skill closes one behavioral gap. Prefer a leading term that activates the right prior knowledge over an inventory of everything the agent might inspect.

### Stay proportional

Let the decision govern the depth. Flexible reasoning is the default. Stable contracts are welcome where shared reliance needs them.

### Transfer across domains

The method applies across domains. Software is one example, not the default model.

### Keep standards adaptable

Put stable semantics in a standard. Put project-specific choices in a disclosed reference that can override the default without redefining the semantics.

## Shared language

The [Thinking in Systems skill](skills/thinking-in-systems/SKILL.md) and its [context](skills/thinking-in-systems/references/CONTEXT.md) govern every skill in this repository. Read both before creating, editing, or reviewing a skill.

Reuse the glossary's terms instead of restating their definitions. Add a cross-cutting term to the glossary before introducing a synonym. A focused skill may narrow a term for its branch, but it must preserve the shared meaning.

## Authoring

Apply `writing-for-agents` and `writing-guidelines` to every agent-consumed document. For skill work, also apply `creating-skills` and read `writing-for-agents/SKILL-MECHANICS.md`.

Follow the information hierarchy and single-source rule from `writing-for-agents`. Show the target behavior with a concrete case when prose leaves room for imitation without understanding.

Keep shared sources in [SOURCES.md](SOURCES.md). Focused skills point to it instead of owning source catalogs.

`SKILL.md` is the source of truth for `agents/openai.yaml`. After editing a skill, run `node scripts/generate-openai-yaml.mjs`, then verify with `node scripts/generate-openai-yaml.mjs --check`.

Edit the personal opening of `README.md` and the “Note from Yannic” only with Yannic in the loop.
