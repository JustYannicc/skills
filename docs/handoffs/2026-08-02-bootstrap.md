# Repository bootstrap handoff

Date: 2026-08-02.

## Current state

The public repository foundation exists. The complete universalized S01 standard, reusable template, full skill-design record, public-safe supporting research, private-source fingerprints, and cross-conversation requirements ledger are included. Exact private inputs remain outside the public repository. No skill has been implemented, no `SKILL.md` placeholder exists, and no private/global agent configuration has been changed.

Read in this order:

1. [`AGENTS.md`](../../AGENTS.md)
2. [`CONTEXT.md`](../../CONTEXT.md)
3. [`source/README.md`](../source/README.md)
4. [`REQUIREMENTS_LEDGER.md`](../requirements/REQUIREMENTS_LEDGER.md)
5. [`THINKING_IN_SYSTEMS_STANDARD.md`](../source/THINKING_IN_SYSTEMS_STANDARD.md)
6. [`SYSTEM_DESIGN_TEMPLATE.md`](../source/SYSTEM_DESIGN_TEMPLATE.md)
7. [`THINKING_IN_SYSTEMS_SKILL_DESIGN.md`](../source/THINKING_IN_SYSTEMS_SKILL_DESIGN.md)
8. [`DECISIONS.md`](../DECISIONS.md)
9. [`ARCHITECTURE.md`](../ARCHITECTURE.md)
10. [`UPSTREAM_SKILLS.md`](../research/UPSTREAM_SKILLS.md)
11. [`DEVELOPMENT.md`](../DEVELOPMENT.md)
12. [`ROADMAP.md`](../ROADMAP.md)

Consult the supporting research when authoring would otherwise lose nuance, provenance, rejected alternatives, or examples. Prefer retaining public-safe evidence now and trimming later. When an exact private source is genuinely needed, verify it against the fingerprint in [`source/README.md`](../source/README.md) through an authorized private copy; never move it into the public repository by default.

## User intent

Create a public family of universal agent skills derived from the maintainer's systems-thinking method and the strongest parts of Matt Pocock's skill workflow. Preserve each skill's one-job boundary. Remove accidental engineering focus rather than building a single giant universal skill.

Thinking in Systems is the maintainer's core philosophy and eventual anchor. Wayfinder is the immediate focus because its destination-first map and decision frontier are valuable, but it currently assumes engineering repositories, trackers, and eventually removable fog. The universal successor must operate under persistent or irreducible uncertainty through strategy, feedback, safe modes, and recovery.

## Immediate next task

Design and implement **one skill only**, beginning with the universal Wayfinder unless the user explicitly selects a different first skill.

Before editing:

- read the pinned upstream Wayfinder and its referenced skills completely;
- use `writing-great-skills` and preserve predictable behavior, information hierarchy, and one-job granularity;
- classify each upstream line as preserve, universalize, disclose, delegate to a companion, or remove;
- present the proposed invocation boundary, retained behavior, changed assumptions, references, `agents/openai.yaml`, and evaluation cases before finalizing;
- keep the code-prototype branch delegated to the existing software skill while defining a cross-domain system-prototype capability separately;
- do not edit private agent configuration, global instructions, or the obsolete private predecessor.

## Facts already verified

- Vercel `skills init` creates only `SKILL.md`.
- `agents/openai.yaml` is optional Codex metadata but mandatory by this repository's convention; it is authored separately.
- No supported channel resolves skill-to-skill dependencies.
- A setup workflow may install an explicit suite but cannot call that transitive dependency resolution.
- ClawHub MIT-0 publication is accepted; the GitHub repository remains MIT.
- Both earlier Thinking in Systems invocation descriptions were rejected.
- “Subway orchestration” meant subagent orchestration.
- Loop and graph engineering should emerge from good system design, not become mandatory named phases.

## Completion boundary for the next task

The first skill is complete only when its direct, indirect, incomplete, negative, edge, persistent-fog, and cross-domain prompts have been tested; `agents/openai.yaml` matches its invocation policy; links and public boundaries pass; and one independent adversarial review plus one resolution check is complete.
