# Workflow rewrite candidate handoff

Date: 2026-08-06.

> **HUMAN REVIEW REQUIRED** — PR #37 remains a review boundary. Do not merge it until the maintainer approves the rewritten skill and evidence.

## Candidate

The Workflow skill now contains the actual route it coordinates. Its Mermaid diagram and operating steps show Thinking in Systems, proportional current-state migration, Wayfinder, Grill With Docs composed from Grilling and Domain Modeling, To Spec, To Tickets, Implement, Review, effects, parent Review, feedback, and the three valid terminal conditions.

The six active-work message classes and interruption rules now live directly in `SKILL.md`. Branch-specific durable records use templates for continuation, material changes, and Supplemental Extension-point mappings. The removed Inline reference is no longer a hidden prerequisite for handling a new message.

The README diagram starts with Setup System Thinking and shows the same named capability path. Migration remains bounded current-state mapping inside ordinary Workflow. Changes discovered while mapping return to ordinary work instead of creating another lifecycle or responsibility system.

## Review surfaces

1. [`skills/workflow/SKILL.md`](../../skills/workflow/SKILL.md) — one-job boundary, visible route, proportionality, six message classes, nested responsibility, effects, and terminal proof.
2. [`skills/workflow/references/`](../../skills/workflow/references/) — continuation, material-change, and Extension-point templates.
3. [`README.md`](../../README.md#workflow) — Setup-first public workflow diagram.
4. [`docs/WORKFLOW_ROUTING.md`](../WORKFLOW_ROUTING.md) — canonical phase and parent-routing contract.
5. [`evaluations/fixtures/workflow/`](../../evaluations/fixtures/workflow/) — direct, indirect, incomplete, negative, edge, change, delegation, interruption, and revision-bound proof cases.

## Deliberate boundary

Workflow coordinates and integrates. Discovery, Specification, decomposition, implementation, Review verdicts, handoff artifacts, and migration maps remain bounded results of their owning capabilities. Supplemental skills contribute only through configured Extension points; core owners retain their responsibility and completion criteria.

Durable Adapter implementation remains owned by #14. Publication and private/global activation remain separate gates. This public repository task does not modify private or global instructions.
