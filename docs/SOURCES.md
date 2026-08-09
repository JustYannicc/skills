# Source inventory

This repository-wide inventory routes each source class to its authority. Inclusion does not mean every source supports every rule.

## Skill design and distribution

- [Agent Skills specification](https://agentskills.io/specification)
- [Vercel skills CLI](https://github.com/vercel-labs/skills)
- [skills.sh documentation](https://skills.sh/docs)
- [OpenAI Build skills](https://developers.openai.com/plugins/build/skills)
- [ClawHub skill format](https://github.com/openclaw/clawhub/blob/main/docs/skill-format.md)
- [ClawHub publishing](https://docs.openclaw.ai/clawhub/publishing)
- [Matt Pocock's skills, current pinned revision](https://github.com/mattpocock/skills/tree/6acc160e4e0cd062dbbbd7a1b26ae92855edf07e)
- [Bold Software's `meat`, inspected revision](https://github.com/boldsoftware/meat/tree/f39f41dfe7b5b37a12b35fdfbaecc7e779855bd3) — Apache-2.0 design inspiration for presenting a compact semantic walkthrough beside exact source-derived evidence. Universal Review remains original, preserves complete Evidence references, and has no `meat` runtime dependency.

The universal `to-spec` successor is an adapted public skill based on Matt Pocock's `skills/engineering/to-spec` at the pinned revision above. Its complete retained-behavior and changed-assumption record is [`validation/repository.yaml`](../validation/repository.yaml); representation remains governed by the separate System Record design and the selected Adapter.

The universal `to-tickets` successor is an adapted public skill based on Matt Pocock's `skills/engineering/to-tickets` at the same pinned revision. It retains complete tracer-bullet decomposition, dependency edges, frontier visibility, and owner acceptance while replacing codebase and tracker assumptions with the adapter-neutral Ticket contract; the full provenance record is in [`validation/repository.yaml`](../validation/repository.yaml).

The universal `wayfinder` successor is an adapted public skill based on Matt Pocock's [`skills/engineering/wayfinder`](https://github.com/mattpocock/skills/tree/6acc160e4e0cd062dbbbd7a1b26ae92855edf07e/skills/engineering/wayfinder) at the same MIT-licensed pinned revision. It retains destination-first mapping, a low-resolution decision index, blockers, a visible frontier, fog graduation, and cross-session continuity while replacing repository and tracker assumptions with the selected Adapter and an operating Strategy for reducible, operating-delay, or irreducible fog; the full retained-behavior and changed-assumption record is in [`validation/repository.yaml`](../validation/repository.yaml).

## Workflow Durable coordination

The approved issue #14 implementation extends the original `workflow` skill
through the accepted [Universal work and coordination contract](UNIVERSAL_WORK_CONTRACT.md)
and the [System Record representation decision package](SYSTEM_RECORD_REPRESENTATION.md).
These repository authorities define adapter-neutral meanings and the one
writable System Record boundary; `skills/workflow/references/durable-mode.md`
contains only the operational branch and capability matrix needed by Workflow.

## Thinking in Systems

The installed [Sources and further reading](../skills/thinking-in-systems/references/sources.md) file is the single public concept-to-source map for the standard. It preserves the useful public reference spine—including systems engineering, decision economics, behavioral evidence, resilience, representation, preparation, and evaluation—beside the concepts those sources inform.

Maintainer provenance and evidence classification remain in the [Thinking in Systems source record](source/THINKING_IN_SYSTEMS_SOURCES.md). Private source fingerprints and archival research remain in the [source archive](source/README.md).
