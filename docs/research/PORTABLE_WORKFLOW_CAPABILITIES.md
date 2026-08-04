# Portable workflow capabilities

**Research date:** 2026-08-02
**Status:** resolved research for [Wayfinder ticket #4](https://github.com/JustYannicc/skills/issues/4)

## Question

Across the supported skill runtimes and distribution channels, what official
capabilities exist for installing skills, configuring standing instructions,
persisting workflow state, scheduling continuation, and operating without Git
or a hosted issue tracker?

## Result

The suite can be universal, but its runtime services cannot be. The portable
core is a set of self-contained Agent Skills plus human-readable workflow
artifacts. Installation, standing instructions, durable state, and scheduled
continuation require explicit host adapters.

Git and a hosted tracker are optional adapters, not prerequisites. A user with
neither can install from a downloaded archive or local directory, keep the map,
specifications, tickets, evidence, and waiting records in ordinary files, and
resume them in a later session. A runtime scheduler can improve continuity but
cannot be assumed.

## Capability matrix

| Surface | Install skills | Standing instructions | Durable workflow state | Scheduled continuation | Works without Git or a hosted tracker? |
| --- | --- | --- | --- | --- | --- |
| Agent Skills standard | Defines a portable skill directory with `SKILL.md` and optional resources/scripts | None standardized | None standardized | None standardized | Yes; the format is files |
| Vercel `skills` CLI / skills.sh | Git providers, arbitrary Git URLs, local paths, direct `SKILL.md` URLs, and archives; project or global; copy or symlink | No lifecycle hook | Install metadata only, not workflow state | None | Yes; local paths and direct downloads do not require a Git account |
| Codex | Discovers repository, user, admin, and bundled skills; plugins may bundle related skills | Global and layered project `AGENTS.md` files | Files in the working directory or an available connected system | Desktop/web Scheduled tasks; same-chat resumption is supported | Yes; current-directory instructions and local scheduled tasks work in non-version-controlled directories |
| OpenClaw | Workspace, project, personal, managed, registry, Git, or local skill sources | The selected agent workspace's `AGENTS.md` is loaded each session | Plain Markdown memory plus on-disk sessions/tasks/queues | Persistent automations and cron jobs | Yes; workspace files and local installs do not require Git or a tracker |

The first row's omissions are an inference from the specification's complete
directory and frontmatter schema: it defines skill content, not a package
manager, instruction-file convention, mutable state store, or scheduler.
[Agent Skills specification](https://agentskills.io/specification),
[client implementation guide](https://agentskills.io/client-implementation/adding-skills-support)

## Findings

### 1. Skills carry method, not runtime infrastructure

The Agent Skills standard makes one skill a directory containing `SKILL.md`
and optional `scripts/`, `references/`, and `assets`. It supports progressive
disclosure and self-contained resources, but it defines no transitive skill
dependency, installation transaction, mutable workflow store, standing
instruction location, or scheduling contract.
[Agent Skills specification](https://agentskills.io/specification)

Consequently, every skill in this suite must remain truthful when a companion
skill or runtime service is unavailable. Cross-skill references describe a
capability relationship. Setup must install every required skill explicitly;
it cannot rely on a dependency resolver.

OpenAI's current skill format follows the same progressive-disclosure model.
Codex can invoke skills explicitly or select them from their descriptions, and
`agents/openai.yaml` can allow or prohibit implicit invocation. Description
matching is routing behavior, not a guarantee that an always-applicable method
will load. A standing instruction must establish that guarantee.
[OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills.md)

### 2. Installation has a portable no-Git path

Vercel's official `skills` CLI can install from GitHub, GitLab, an arbitrary
Git URL, a local directory, a direct `SKILL.md` URL, or a downloaded archive.
It can target a project or user scope and either copy or symlink the files. It
can also install several explicitly selected skills from one repository.
[Vercel skills CLI](https://github.com/vercel-labs/skills)

This yields three installation paths, in descending order of convenience:

1. install the suite from its published catalog or repository;
2. install it from a downloaded archive or extracted local directory; or
3. manually copy the canonical skill directories into a host's documented
   skill location.

Only the first path may need a Git host, account, network connection, or Node
tooling. The installed skills themselves must not require any of those.

Codex discovers user skills under `$HOME/.agents/skills` and project skills
under `.agents/skills`. If there is no project root, it can still discover
project instructions from the current directory. OpenClaw similarly supports
workspace, project, personal, managed, registry, Git, and local skill sources.
[OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills.md),
[OpenClaw skills](https://docs.openclaw.ai/skills)

OpenAI plugins are an additional way to distribute a related bundle to
supported ChatGPT and Codex surfaces. They are not the portable installation
baseline because the Agent Skills format is broader and local standalone
skills remain supported.
[OpenAI: Build skills](https://developers.openai.com/plugins/build/skills)

### 3. Always-on application requires a host-specific instruction adapter

Codex reads a user-level `AGENTS.md` or `AGENTS.override.md` from its home
directory, then layers applicable project instructions from project root to
the current working directory. OpenClaw instead loads `AGENTS.md` from the
selected agent workspace on every session. There is no universal global
instruction path in the Agent Skills standard.
[OpenAI: Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md),
[OpenClaw agent workspace](https://docs.openclaw.ai/agent-workspace)

Therefore the run-once setup skill must detect the host and target, show the
effective instruction chain, and propose a small marker-delimited block. It
must preview and receive authority before writing, preserve everything outside
its owned region, record the written block's hash, detect human edits, verify
the result, and support clean removal. Installing files must not silently edit
global instructions.

This approach follows established public precedents for small managed regions
while adding conflict protection for human-edited content.
[Trigger.dev skill installation](https://trigger.dev/docs/skills#installation),
[Convex AI-files commands](https://docs.convex.dev/cli/reference/ai-files)

### 4. Durable state needs an adapter-neutral artifact contract

The portable baseline is ordinary, human-readable files. The workflow must
define the meanings and minimum fields of a map, specification, ticket,
evidence record, approval, handoff, and waiting record independently of where
they are stored. A local-file adapter can then work without Git or an account;
a GitHub, GitLab, task-system, document, or database adapter can preserve the
same meanings in its native objects.

OpenClaw explicitly treats workspace memory as plain Markdown and persists its
session and task machinery on disk. Codex Scheduled tasks can work directly in
a non-version-controlled project directory. These are evidence that useful
durability does not require a repository, although their exact storage models
are host-specific.
[OpenClaw memory](https://docs.openclaw.ai/concepts/memory),
[OpenClaw restart recovery](https://docs.openclaw.ai/gateway/restart-recovery),
[OpenAI: Scheduled tasks](https://learn.chatgpt.com/docs/automations.md)

The workflow must never equate “not in GitHub” with “not a ticket.” A ticket is
a bounded unit of work with an outcome, owner, state, dependencies, acceptance
evidence, and return path. A Markdown section can satisfy that contract.

### 5. Continuation is a capability, not a promise

Codex Scheduled tasks can return to the same chat, run against local projects,
and use skills. Non-version-controlled projects run directly in their project
directory; local-file work requires the machine and desktop app to remain
available. The CLI and IDE extension do not provide the scheduling management
surface.
[OpenAI: Scheduled tasks](https://learn.chatgpt.com/docs/automations.md)

OpenClaw provides persistent automations/cron jobs and on-disk recovery for
scheduled work. Its workspace and queue are host concepts rather than Agent
Skills guarantees.
[OpenClaw cron](https://docs.openclaw.ai/cron),
[OpenClaw automation jobs](https://docs.openclaw.ai/automation/cron-jobs),
[OpenClaw restart recovery](https://docs.openclaw.ai/gateway/restart-recovery)

The universal responsibility rule is therefore:

- if an authorized scheduler exists, the owner may create a continuation and
  must verify that it was accepted;
- if it does not, the owner must write a durable waiting record containing the
  outcome owner, dependency, unblock condition, next check, escalation or
  expiry rule, and exact resumption instructions; and
- in either case, scheduling or writing the record does not complete the
  outcome.

The suite must not claim it is monitoring work when no execution mechanism can
actually resume it.

## Constraints carried into design

1. Define one semantic workflow contract and multiple storage/execution
   adapters. The initial adapters are local Markdown and GitHub; neither
   defines the domain model.
2. Make setup a one-run, removable skill. It detects capabilities, installs
   every selected skill explicitly, previews any standing-instruction patch,
   records enough state to update or remove only its own block, and proves
   activation.
3. Keep workflow artifacts readable and recoverable outside any one agent
   session. Hosted-native relationships may enrich them but must not change
   their meanings.
4. Treat schedulers and background execution as optional capabilities. Expose
   a truthful durable-resumption mode when they are absent.
5. Require Git only inside a Git adapter and a hosted account only inside that
   host's adapter.
6. Do not invent transitive skill dependencies. Setup installs the suite;
   individual skills disclose a missing companion and use their defined
   fallback where possible.

## Evidence boundary

This first-release decision covers the open Agent Skills format, Vercel's
`skills` CLI/skills.sh distribution path, Codex, and OpenClaw as inspected on
2026-08-02. It does not assert that every current or future agent host uses
`AGENTS.md`, exposes a scheduler, or implements the same skill locations.
Additional hosts should be integrated by proving a new adapter against their
official behavior, not by weakening the portable contract.
