# Skills

Public agent skills by [JustYannicc](https://github.com/JustYannicc).

Each skill has one job. Together, the suite applies systems thinking across software, personal, organizational, physical, communicative, and agent work without requiring Git, GitHub, or a particular task system.

## Skill packages

| Skill | Job |
| --- | --- |
| [Thinking in Systems](skills/thinking-in-systems) | Govern interpretation, decisions, interventions, proof, operation, and change under real conditions. |
| [Workflow](skills/workflow) | Coordinate one parent Outcome through the smallest truthful route to a verified terminal condition. |
| [Migrate System](skills/migrate-system) | Map an existing scope into the current Workflow contract without repairing it. |
| [Domain Modeling](skills/domain-modeling) | Establish shared operative terminology and preserve its accepted authority. |
| [Wayfinder](skills/wayfinder) | Navigate persistent or irreducible fog with a durable Map and operating Strategy. |
| [Prototype](skills/prototype) | Answer one design question with a reversible experiment. |
| [To Spec](skills/to-spec) | Turn an accepted Outcome into one clear, revision-bound Specification. |
| [To Tickets](skills/to-tickets) | Decompose a Specification into bounded, owned, dependency-aware work. |
| [Implement](skills/implement) | Execute one accepted Ticket and submit an exact Result to Review. |
| [Review](skills/review) | Verify an exact Result against its Specification and governing standards. |
| [Handoff](skills/handoff) | Preserve continuation and transfer responsibility only through explicit acceptance. |
| [Ask Yannic](skills/ask-yannic) | Explain the smallest applicable Workflow route without executing it. |

The planned complete suite will also install pinned upstream `grill-with-docs`, `grilling`, `research`, and `to-questionnaire` packages with deterministic overlays. Their exact source revision, patch targets, and hashes live in [overlays/manifest.yaml](overlays/manifest.yaml). The disposable `setup-system-thinking` skill is tracked in [issue #28](https://github.com/JustYannicc/skills/issues/28).

## Workflow

The [Workflow package](skills/workflow) owns the canonical route, Inline and Durable behavior, phase boundaries, and terminal conditions.

## Repository boundary

This repository contains publishable skill packages and the overlay material required to install the complete suite. Runtime guidance belongs inside the skill that consumes it. Open design, acceptance, and release work belongs in [GitHub issues](https://github.com/JustYannicc/skills/issues).

The repository intentionally has no application runtime, package-manager project, test suite, committed evaluation archive, or separate design-document hierarchy. Skills are reviewed and proven at their installed, user-visible seams; clean installation and release proof are tracked in [issue #31](https://github.com/JustYannicc/skills/issues/31) and [issue #32](https://github.com/JustYannicc/skills/issues/32).

## Authoring

Every implemented package contains `SKILL.md` and `agents/openai.yaml`; supporting references, assets, or scripts stay inside that package only when its runtime job needs them.

## Distribution and license

The suite will be published through [skills.sh](https://skills.sh/) after the open acceptance, clean-install, and immutable-release issues close. This repository is available under the [MIT License](LICENSE).
