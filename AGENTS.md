# Public skills repository

This repository publishes universal agent skills. Before changing a skill, read `CONTEXT.md`, `docs/source/README.md`, `docs/requirements/REQUIREMENTS_LEDGER.md`, `docs/source/THINKING_IN_SYSTEMS_STANDARD.md`, `docs/DECISIONS.md`, `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, and the newest file under `docs/handoffs/`.

## Skill work

- Before skill work, verify `writing-for-agents` is installed as described in `docs/DEVELOPMENT.md`; read its `SKILL.md` and `SKILL-MECHANICS.md` completely, then apply both for every skill creation, edit, or review. `writing-for-agents` is the sole authoring method for this repository.
- Give each skill one recognizable job. Split by independent invocation or by a sequence boundary that prevents premature completion—not by topic count or file length.
- Preserve one source of truth per meaning. Keep immediate steps in `SKILL.md`; disclose branch-specific rules, examples, templates, and sources behind precise context pointers.
- Treat cross-skill references as capability relationships, not package dependencies. State the missing capability honestly when a companion is unavailable.
- Add `agents/openai.yaml` to every implemented skill. Choose `allow_implicit_invocation` deliberately and verify its UI metadata and activation behavior.

## Public boundary

- Universalize examples and rules. Exclude named personal assistants, personal task or knowledge platforms, private agent configuration, employer material, credentials, local paths, and personal operating policy from published skills.
- Preserve complete universalized sources and public-safe evidence. Keep exact private originals outside the public repository and retain their fingerprints for provenance. Do not add credentials, private keys, access tokens, employer-confidential material, private configuration, or local paths.
- Record upstream source, inspected revision, license, and adapted behavior. Preserve useful behavior where compatible, but do not retain an engineering assumption merely by renaming it.
- Do not modify private agent configuration or global instructions from this repository. Those changes require a separate governed task after public-skill proof.

## Verification

- Test direct, indirect, incomplete, negative, and edge-case prompts for every model-invoked skill.
- Verify all links, frontmatter, `agents/openai.yaml`, public-data boundaries, skills.sh discovery, and clean installation before publication.
- Run one independent adversarial review and one resolution check. Do not publish from an unreviewed working tree.
