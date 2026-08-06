# Development setup

The skills are ordinary Agent Skills folders. A small TypeScript validation
runtime checks their public repository boundary and evaluation evidence. It is
development infrastructure, not a runtime dependency of installed skills.

## Install and validate

Use Node.js 22 or newer and the exact pnpm version pinned in `package.json`:

```sh
pnpm install
pnpm validate
```

`pnpm validate` is the one repository gate. It runs Ultracite, strict
TypeScript, the test suite, repository validation, the evaluation runner, and
the pinned official Agent Skills reference validator for every implemented
skill. It also verifies each upstream commit URL, so this gate requires network
access. TypeScript 6 is pinned because Ultracite's current parser does not yet
accept TypeScript 7.

The command fails on Critical or Major findings. Minor findings remain visible
without blocking a release unless the accepted contract they affect says
otherwise.

## Authoring prerequisite

`writing-for-agents` is a development-time prerequisite. Its `SKILL.md` governs context pointers, information hierarchy, completion criteria, leading words, and pruning. Its `SKILL-MECHANICS.md` governs skill frontmatter, invocation choice, splitting, and router skills. Read and apply both files completely before creating, editing, or reviewing a skill. It is not a runtime dependency of published skills.

Verify or install it explicitly from Matt Pocock's public repository:

```sh
npx skills@latest add mattpocock/skills --skill writing-for-agents
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

Add each local skill and its provenance to `validation/repository.yaml`, and
provide valid frontmatter and `agents/openai.yaml`. Provenance is repository
evidence rather than installed runtime content, so installed skill directories
do not carry `provenance.yaml`. Add behavioral fixtures under `evaluations/`.
Fixtures and observations are YAML; raw evidence has a checked SHA-256 locator.

After changing fixtures or observations, record the deterministic report:

```sh
pnpm evaluations:record
pnpm validate
```

The report command cannot record schema, evidence, routing, or severity
failures. The validation command rejects a stale report. Critical invocation
or routing fixtures require at least three unique fresh-context attempts; one
failed attempt fails the fixture rather than being averaged away.

Every observation names the candidate identity produced by the validator. A
dirty candidate uses `working-tree:<sha256>` over non-evaluation repository
inputs; a clean candidate uses `git:<sha>`. Reports also record the package
version, per-fixture hash, and every raw-evidence locator and hash. Evaluation
artifacts are excluded from the working-tree identity so recording evidence
does not create a self-referential hash.

`validation/sources.yaml` is the only authority for upstream URLs, revisions,
and licenses. The schema-v2 `validation/repository.yaml` contains exactly one
provenance record for every local skill directory. Original records stay
minimal. Adapted records name their adaptation mode, exact pinned source
targets, retained behavior, and changed assumptions. `validation/overlays.yaml`
binds every overlay to its source, target, patch file, and SHA-256. Every
provenance and overlay target must exist at the pinned source revision; a
missing, escaping, or stale target or patch blocks validation.

Before publication, also prove missing companions degrade honestly, run the
accepted capability and composition scenarios, complete one independent
adversarial review, and run one resolution check.
