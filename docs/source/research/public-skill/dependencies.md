# Skill dependencies: current capability check

**Question.** Can `Thinking in Systems` declare and reliably ship/install other skills as dependencies through Agent Skills, Vercel's `skills` CLI, or skills.sh?

**Answer (2026-08-02).** No. There is no portable, native dependency mechanism today: no standard `requires`/`depends_on` field, package manifest, version solver, transitive installer, or automatic activation of another separately-installed skill. Treat a separately named skill as **optional**, not required, unless the installer command explicitly installs both skills.

## What the standard supports

The [Agent Skills specification](https://agentskills.io/specification) defines a skill as one directory containing `SKILL.md` plus optional `scripts/`, `references/`, and `assets/`. Its complete frontmatter list is `name`, `description`, optional `license`, `compatibility`, arbitrary `metadata`, and experimental `allowed-tools`; it does not define a dependency field or dependency semantics. [Specification: directory structure](https://agentskills.io/specification#directory-structure), [frontmatter](https://agentskills.io/specification#frontmatter)

This does support a **self-contained skill bundle**: `Thinking in Systems` can ship its own references, templates, examples, and self-contained scripts. Relative references are explicitly supported, and the specification recommends progressive disclosure through focused files under `references/`. [Specification: optional directories and progressive disclosure](https://agentskills.io/specification#optional-directories), [file references](https://agentskills.io/specification#file-references)

`metadata` is only an arbitrary client-specific mapping. It could document a dependency for humans or a custom client, but it creates no portable install, version, activation, or compatibility guarantee. [Specification: metadata](https://agentskills.io/specification#metadata)

The standard's own GitHub discussion confirms the gap: a March 2026 **proposal** for `skills.json`/`skills.lock` says the current specification covers authoring but not distribution, composition, or dependencies. It is a proposal, not an adopted specification feature. ["Skill Package Manifest for Dependency Resolution and Distribution"](https://github.com/agentskills/agentskills/discussions/210)

## What Vercel's CLI supports

Vercel's official CLI supports discovering several independent skills in one repository and selecting them explicitly:

- `npx skills add owner/repo --list` lists skills.
- Repeated `--skill <name>` selects named skills.
- `--skill '*'` selects every discovered skill.
- `--all` is exactly shorthand for `--skill '*' --agent '*' -y`—install all discovered skills to all supported agents. It is not a dependency resolver.

Sources: [CLI README: add options and examples](https://github.com/vercel-labs/skills/blob/1164afa5f0e21ebd01e6fc11249759353f494ad1/README.md#L48-L83), [implementation of `--all`](https://github.com/vercel-labs/skills/blob/1164afa5f0e21ebd01e6fc11249759353f494ad1/src/add.ts#L1066-L1071).

The CLI's skill type contains name, description, path, optional plugin name, and arbitrary metadata—no dependency field. Its parser requires `name` and `description`, carries metadata through unchanged, and its discovery routine enumerates skill directories; it has no dependency traversal or resolver. [Skill type](https://github.com/vercel-labs/skills/blob/1164afa5f0e21ebd01e6fc11249759353f494ad1/src/types.ts#L79-L88), [parser](https://github.com/vercel-labs/skills/blob/1164afa5f0e21ebd01e6fc11249759353f494ad1/src/skills.ts#L76-L128), [discovery](https://github.com/vercel-labs/skills/blob/1164afa5f0e21ebd01e6fc11249759353f494ad1/src/skills.ts#L174-L327).

The CLI can discover the ordinary `skills/<name>/SKILL.md` layout and catalog-style `skills/<category>/<name>/SKILL.md`; `--full-depth` broadens discovery. This is repository packaging/discovery, not a relationship between skills. [CLI README: discovery locations](https://github.com/vercel-labs/skills/blob/1164afa5f0e21ebd01e6fc11249759353f494ad1/README.md#L375-L406), [discovery implementation](https://github.com/vercel-labs/skills/blob/1164afa5f0e21ebd01e6fc11249759353f494ad1/src/skills.ts#L237-L327).

## Distinguish the available patterns

| Pattern | Is it supported? | Reliability | Appropriate use |
| --- | --- | --- | --- |
| Native/transitive skill dependency | No | None | Do not design around it. |
| Multiple independent skills from one repository | Yes | User/installer selects them explicitly | A public catalog with `Thinking in Systems`, a future maintainer-query skill, and other skills. |
| `--all` | Yes | Installs every currently discovered skill, not a minimal dependency closure | Initial catalog installation only when the user explicitly wants all skills. |
| Bundled references/assets/scripts inside one skill directory | Yes | High; installed with the skill | The core method, templates, examples, setup guidance, and complete fallback procedures. |
| A Markdown “requires” list or frontmatter `metadata` convention | Technically storable, not standardized | Documentation only | Explain optional complementary skills; never rely on it for execution. |
| A setup script that invokes `npx skills add` for several names | Feasible as ordinary scripting, but outside Agent Skills dependency semantics | Environment- and permission-dependent | A separately invoked convenience installer, with an idempotent check and clear user-visible command; not a requirement for core behavior. |

## Decision for `Thinking in Systems`

`Thinking in Systems` **cannot ship dependencies reliably** in the sense relevant to this project. Its core behavior must therefore be complete when installed alone.

1. Incorporate the indispensable method from other skills as deliberately narrowed, attributed reference material or first-party procedures.
2. List Wayfinder, Grill Me/Batch Grill Me, TDD, and similar skills under **Optional complementary skills**, explaining what they add and providing a complete fallback path when absent.
3. Keep all references, templates, examples, test/benchmark cases, and setup guidance required by the method inside `thinking-in-systems/`.
4. If the public repository later contains companion skills, document an explicit multi-skill install command (or an optional setup script). Do not call this dependency resolution, and do not make `Thinking in Systems` fail or silently skip its method when companions are absent.

This gives users predictable behavior across Codex, OpenClaw, and other Agent Skills clients while preserving a clean future catalog structure.

## Evidence boundary

This conclusion is based on the official Agent Skills specification and the Vercel CLI repository at commit `1164afa5f0e21ebd01e6fc11249759353f494ad1`, inspected on 2026-08-02. It does not rule out a particular proprietary client implementing a private dependency convention; such a convention would not be portable or a skills.sh/Agent Skills guarantee.
