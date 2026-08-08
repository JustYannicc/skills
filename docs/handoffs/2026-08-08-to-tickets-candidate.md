# To Tickets candidate handoff

Date: 2026-08-08.

> **HUMAN REVIEW REQUIRED** — Issue #23 remains open. Do not close the
> decomposition Ticket or publish this skill until the maintainer accepts the
> universal candidate and its evidence.

## Candidate

`to-tickets` is a model-invoked universal successor based on the pinned
Matt Pocock source. It turns one accepted Specification into either one
implicit Inline Ticket or one accepted Durable Ticket set. Each bounded Ticket
declares its Result, owner, Authority, Proof seam, containment, requirements,
related context, exact revisions, and return route. The candidate proves
collective Specification coverage, keeps the accepted Work frontier distinct
from blocked and Recovery work, and returns material gaps without editing
accepted intent.

The candidate preserves the upstream tracer-bullet and expand-migrate-contract
patterns while removing codebase, tracker, setup, labels, and local-file
assumptions. Durable writes use the selected Adapter; missing capabilities
remain visible. Delegation retains parent Ownership, external dependencies use
Continuation records, and concurrency is conditional on the Adapter's declared
coordination guarantees. Configured Supplemental skills run only at the
`workflow.decomposition` decomposition-enrichment Extension point.

## Review surfaces

1. [`skills/to-tickets/SKILL.md`](../../skills/to-tickets/SKILL.md) — one-job
   boundary, Inline/Durable threshold, collective coverage, Ticket graph,
   frontier, gap, Supplemental, and return gates.
2. [`skills/to-tickets/references/ticket-contract-template.md`](../../skills/to-tickets/references/ticket-contract-template.md) — canonical Ticket fields, coverage map, frontier/Recovery view, Supplemental evidence, and Specification-gap record.
3. [`README.md`](../../README.md#to-tickets) — public skill description and
   human-review status.
4. [`validation/repository.yaml`](../../validation/repository.yaml) and
   [`docs/SOURCES.md`](../SOURCES.md) — pinned upstream provenance, license,
   retained behavior, and universalized assumptions.
5. [`evaluations/fixtures/to-tickets/`](../../evaluations/fixtures/to-tickets/)
   — direct, indirect, incomplete, negative, edge, cross-domain,
   delegation/concurrency, and Supplemental proof cases.

## Deliberate boundary

To Tickets decomposes and returns evidence. Workflow owns the parent Outcome,
acceptance coordination, execution routing, effects, Review integration,
recovery, and terminal proof. The candidate does not publish to a particular
tracker, claim or execute Tickets, mutate accepted intent, or infer parent
completion from child work.

## Checklist for the coordinator

- [ ] Confirm universal fields and relationship meanings against the Universal
      Work and Ownership contracts.
- [ ] Inspect cross-domain and edge observations for truthful frontier,
      continuation, and gap behavior.
- [ ] Resolve the recorded adversarial findings and resolution check.
- [ ] Approve or return the candidate before closing issue #23.
