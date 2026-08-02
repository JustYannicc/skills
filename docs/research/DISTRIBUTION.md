# Distribution research

Research date: 2026-08-02.

## Skill dependencies

The [Agent Skills specification](https://agentskills.io/specification) defines a skill directory, frontmatter, supporting files, and arbitrary metadata. It does not define another skill as a dependency, a version solver, or transitive installation.

The [Vercel skills CLI](https://github.com/vercel-labs/skills) can discover several skills in one repository and install selected names or all discovered skills. That is explicit selection, not dependency resolution. Its initializer currently creates only `SKILL.md`.

ClawHub supports installation metadata for external tools, not another skill. A companion skill must therefore be documented and explicitly installed.

## `agents/openai.yaml`

Codex documents `agents/openai.yaml` as optional per-skill metadata for:

- `interface.display_name`;
- `interface.short_description`;
- optional icons, brand color, and default prompt;
- `policy.allow_implicit_invocation`;
- `dependencies.tools`, such as an MCP server.

It does not provide skill-to-skill dependencies. Vercel's `skills init` does not generate this file. This repository will add it deliberately to every implemented skill and test its invocation policy.

Source: [OpenAI Build skills](https://developers.openai.com/plugins/build/skills).

## skills.sh

- Canonical source: a public GitHub repository.
- Multi-skill layout: `skills/<name>/SKILL.md`.
- Installation selects one or more names explicitly.
- No install hook updates a user's `AGENTS.md`.
- A standing trigger therefore requires a separate, previewed configuration step.

Sources: [skills CLI](https://github.com/vercel-labs/skills), [skills.sh documentation](https://skills.sh/docs).

## ClawHub

- Separate authentication, publication, versions, scans, install state, and updates.
- The same canonical skill folder can be released independently.
- Fixed MIT-0 license for the distributed artifact; accepted for this repository.
- No skill dependency resolver or global instruction setup hook.

Sources: [ClawHub skill format](https://github.com/openclaw/clawhub/blob/main/docs/skill-format.md), [publishing](https://docs.openclaw.ai/clawhub/publishing), [CLI](https://github.com/openclaw/clawhub/blob/main/docs/cli.md).

## OpenAI plugin option

OpenAI recommends plugins when distributing a related group of skills or bundling skills with connectors. That may later improve Codex/ChatGPT installation, but it does not replace the accepted skills.sh and OpenClaw paths and is intentionally outside this bootstrap.

Source: [OpenAI Build skills](https://developers.openai.com/plugins/build/skills).
