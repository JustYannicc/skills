# ClawHub publication research

**Research date:** 2026-08-02

**Scope:** current, first-party ClawHub/OpenClaw documentation and the official ClawHub source repository.

**Question:** how a public `Thinking in Systems` skill can be packaged, published, updated, secured, and related to skills.sh.

## Bottom line

ClawHub can publish a normal portable skill folder: one required `SKILL.md` plus supporting files. It is a separate registry and release channel from skills.sh. A single GitHub repository and the same canonical skill directory can be the source for both, but the registries do **not** share publication, ownership, version, update, or dependency state. Publish each intentionally and retain the repository as the sole editable source of truth.

For this skill, the practical shape is:

```text
JustYannicc/skills                 # canonical public Git repository
└── skills/
    └── thinking-in-systems/
        ├── SKILL.md               # required by ClawHub
        ├── references/            # supporting Markdown and examples
        └── setup.md               # consumer-specific setup guidance
```

The root-level `README.md`, licence, and repository release notes remain GitHub material; ClawHub publishes the selected *skill directory*, not necessarily the whole repository.

## Publish and authentication

- Publishing requires the separate `clawhub` CLI, not `openclaw skills`. Install with `npm i -g clawhub` or `pnpm add -g clawhub`; authenticate interactively with `clawhub login`, or use an API token in a headless environment. [ClawHub quickstart](https://github.com/openclaw/clawhub/blob/main/docs/quickstart.md), [CLI reference](https://github.com/openclaw/clawhub/blob/main/docs/cli.md)
- The normal skill release command is `clawhub skill publish <path>`. It accepts `--slug`, `--name`, `--owner`, `--version`, `--changelog`, `--tags`, `--dry-run`, and `--json`. Publishing validates metadata, version, files, and source information before storing the release; failed validation publishes nothing. [Publishing guide](https://docs.openclaw.ai/clawhub/publishing), [CLI reference](https://github.com/openclaw/clawhub/blob/main/docs/cli.md)
- A new skill defaults to `1.0.0`; a changed bundle defaults to the next patch version. Passing `--version` selects an explicit SemVer version. An identical bundle is treated as already published unless an explicit version is supplied. [CLI reference](https://github.com/openclaw/clawhub/blob/main/docs/cli.md)
- ClawHub also exposes a reusable GitHub Actions workflow for catalog repositories. It publishes each immediate folder beneath `skills/` by default, or one specified `skill_path`; `dry_run: true` previews changed skills. This is suitable only after the manual first release and repository workflow have been verified. [Publishing guide](https://docs.openclaw.ai/clawhub/publishing)

## Package and metadata requirements

- A skill is a directory containing `SKILL.md` (or accepted legacy casing/names). Supporting regular files are permitted; `.clawhubignore` and `.gitignore` are honoured. Symlinks and macOS metadata are ignored. The total published bundle limit is 50 MB. [Skill format](https://github.com/openclaw/clawhub/blob/main/docs/skill-format.md)
- `SKILL.md` is Markdown with YAML frontmatter. `description` becomes the registry UI/search summary. For portable Agent Skills, `name` should match its parent directory and use 1–64 lowercase letters, numbers, or hyphens. The registry keeps routing slug and display name distinct. [Skill format](https://github.com/openclaw/clawhub/blob/main/docs/skill-format.md)
- ClawHub-specific runtime metadata lives at `metadata.openclaw`, including required environment variables, binaries, config paths, OS constraints, a homepage, and a `skillKey`. This skill is documentation/procedure only, so it should declare **no** binaries, credentials, or installer metadata unless later revisions genuinely require them. [Skill format](https://github.com/openclaw/clawhub/blob/main/docs/skill-format.md)
- `metadata.openclaw.install` supports installation of *tool dependencies* only: `brew`, `node`, `go`, and `uv`. It does not document or implement a skill-to-skill dependency resolver. [Skill format](https://github.com/openclaw/clawhub/blob/main/docs/skill-format.md)

## Dependencies and setup hooks

### What is supported

- A skill may describe runtime prerequisites and offer installers for external tools through `metadata.openclaw.install`; the gateway can execute those declared installers subject to the operator's install policy. [Skill format](https://github.com/openclaw/clawhub/blob/main/docs/skill-format.md), [OpenClaw macOS skills documentation](https://docs.openclaw.ai/mac/skills)
- Supporting reference files ship in the skill bundle and are therefore the right way to carry the complete S01 method, examples, sources, and an optional `setup.md` without making every detail immediate prompt context. [Skill format](https://github.com/openclaw/clawhub/blob/main/docs/skill-format.md)

### What is not supported by the documented format

- There is no documented declaration that installs, invokes, pins, or version-resolves another *skill*. The documented `install` field concerns external binaries/packages, not skills. Treat another skill as a **soft, human-visible relationship** in `SKILL.md` (for example, “use this alongside Wayfinder when multi-session uncertainty remains”), not a deployable dependency.
- There is no documented lifecycle/setup hook that may automatically modify a user's global `AGENTS.md`. A `setup.md` can give exact, reviewable instructions; the user or agent must apply them under the relevant host's authority model. This is correct for an instruction-affecting change.

## Installation, updates, and verification

- OpenClaw installs a registry skill with `openclaw skills install @owner/<slug>` and installs it globally with `--global`. It updates registry-managed skills with `openclaw skills update`. ClawHub's own CLI supports equivalent direct installation into `./skills` and records state in `.clawhub/lock.json`. [OpenClaw skills documentation](https://github.com/openclaw/openclaw/blob/main/docs/tools/skills.md), [ClawHub CLI reference](https://github.com/openclaw/clawhub/blob/main/docs/cli.md)
- ClawHub installs track their source/version in `.clawhub/origin.json`. Update compares local content fingerprints with known releases and refuses to overwrite local modifications by default. Pinning prevents normal and forced updates until explicitly unpinned. [ClawHub CLI reference](https://github.com/openclaw/clawhub/blob/main/docs/cli.md)
- `openclaw skills verify @owner/<slug>` obtains the ClawHub trust envelope. Public pages and CLI inspection expose files, versions, changelogs, origin information, and scan status before installation. [OpenClaw skills documentation](https://github.com/openclaw/openclaw/blob/main/docs/tools/skills.md), [ClawHub quickstart](https://github.com/openclaw/clawhub/blob/main/docs/quickstart.md)

## Security, moderation, and licensing

- Publishing is authenticated; ClawHub validates the artifact and runs automated security checks. Releases can remain unavailable to normal catalog/install surfaces while security review runs, and owners can see moderation state in the dashboard. [ClawHub overview](https://docs.openclaw.ai/tools/clawdhub), [Publishing guide](https://docs.openclaw.ai/clawhub/publishing)
- Consumers should treat third-party skills as untrusted code, inspect them before enabling them, and use sandboxing/risk controls where appropriate. For this particular skill, keeping it declarative and free of executable installers or credentials makes the security envelope deliberately small. [OpenClaw skills documentation](https://github.com/openclaw/openclaw/blob/main/docs/tools/skills.md)
- ClawHub publishes skills under the fixed **MIT-0** licence; it does not support per-skill license overrides, paid skills, or attribution requirements. This is a material channel constraint: the GitHub repository may carry a MIT licence, but the ClawHub-distributed skill itself is MIT-0. [Skill format](https://github.com/openclaw/clawhub/blob/main/docs/skill-format.md)

## Can one skill ship through skills.sh and ClawHub?

**Yes, as two independent distributions of the same canonical directory.** The official OpenClaw installer supports both a ClawHub reference and an external skills.sh reference, demonstrating that the two channels coexist for the same host:

```sh
openclaw skills install @justyannicc/thinking-in-systems
openclaw skills install skills-sh:JustYannicc/skills/thinking-in-systems
```

The second syntax and the fact that Git/local installs have their own source rules are documented by OpenClaw. [OpenClaw skills documentation](https://github.com/openclaw/openclaw/blob/main/docs/tools/skills.md)

This is an interoperability inference, not an official cross-publish feature: ClawHub's documentation does **not** claim it imports releases from skills.sh or publishes to it. Therefore:

1. Keep `skills/thinking-in-systems/` in GitHub as the editable canonical source.
2. Publish that exact directory to skills.sh using its own documented workflow.
3. Publish the same directory to ClawHub with `clawhub skill publish`.
4. Record both release identifiers/version dates in the repository release notes or a small release manifest; do not assume tags or updates propagate across registries.

## Recommended decision for Thinking in Systems

Use the portable `SKILL.md` frontmatter (`name: thinking-in-systems`, a broad model-invoked description, and repository homepage) plus a `references/` directory. Do not declare OpenClaw runtime requirements, external installers, or other skills as hard dependencies. State optional companion skills in a compatibility/reference section instead. Publish from the repository's canonical skill folder first with `--dry-run`, then explicitly to each registry.

This preserves a single editable source of truth, avoids pretending that current skills have package-level dependencies, and lets the documentation contain safe, explicit setup instructions for host-specific `AGENTS.md` integration.
