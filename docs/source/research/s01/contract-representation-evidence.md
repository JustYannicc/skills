---
title: "the standard research — human and agent contract representation"
status: evidence and recommendation; not a storage or implementation decision
scope: the standard system-design governance
---

# Contract representation for human–agent systems

## Recommendation

Adopt **one writable authority per information type**, rather than one universal file format. A system boundary should have two deliberately linked layers:

1. A short, versioned **Markdown Boundary Contract** is the normative human-review surface for purpose, meaning, authority, assumptions, approval, failure/degraded behavior, and completion evidence.
2. A versioned **machine contract** is the normative executable surface only for facts a program can decide or validate: record shape, stable identifiers, enumerated states, required evidence/approval references, command and receipt envelopes, and compatibility rules. Use JSON Schema for JSON-shaped exchanges; use OpenAPI only when the boundary is actually an HTTP API. Generate TypeScript types and human-facing reference views from that machine contract where useful.

The two layers must not restate the same rule independently. Markdown owns meaning and rationale; the schema owns formal fields and constraints. Each has stable identifiers and links to the other. Where a rule needs both prose and a deterministic check, Markdown states the rule and points to its named check (a "fitness function"); the executable check is the implementation of that rule, not a second policy document.

This makes the user's OpenAPI analogy precise: every person, agent, tool, and deterministic service receives a clear request/response contract, but neither a model nor a schema silently invents intent or permission.

## Evidence and interpretation

| Representation | Strength at a the standard boundary | Limit / ownership rule |
| --- | --- | --- |
| Markdown with small YAML frontmatter | Best human-readable record for outcome, non-outcome, contextual rules, decision rationale, examples, assumptions, provenance, and evidence links. The [OKF specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md#1-motivation) demonstrates a portable, diffable human/agent corpus with structured Markdown, frontmatter, provenance, verification, lifecycle, and progressive disclosure. | Do not claim free prose is executable. OKF itself explicitly does **not** replace domain schemas or prescribe runtime/executor packaging ([non-goals](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md#non-goals)). Its permissive conformance is suitable for knowledge, not for allowing an action. |
| JSON Schema | Best portable runtime validator for JSON records. Its validation vocabulary defines structural assertions; annotations can carry titles, descriptions, examples, and UI hints ([JSON Schema Validation](https://json-schema.org/draft/2020-12/json-schema-validation.html#validation-keywords-for-any-instance-type)). It therefore fits request, proposal, approval, receipt, and status record envelopes. | It validates data shape, not whether the agent understood the operator, whether a recipient is correct, or whether an effect is wise/authorized. Custom vocabulary is not a substitute for deterministic policy—an implementation that does not understand a custom keyword cannot enforce its semantics ([JSON Schema Core](https://json-schema.org/draft/2020-12/json-schema-core.html#vocabularies)). |
| OpenAPI | The closest literal analogy for a service-to-service handoff: a language-agnostic interface description that enables humans and computers to discover and use an HTTP service ([OpenAPI Specification](https://spec.openapis.org/oas/latest.html#introduction)). It can specify operations, request/response schemas, authentication, and error responses. | Do not use it to describe an internal human process, a vault note, or non-HTTP scheduler. The specification says an object's field description is normative over its published JSON Schema, a useful warning that generated schema cannot fully capture policy ([OAS §4](https://spec.openapis.org/oas/latest.html#specification)). |
| TypeScript types | Excellent developer ergonomics: typed adapters, command handlers, schema-derived APIs, migrations, and tests. | Types are erased at compile time and do not change runtime behavior ([TypeScript handbook](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html#erased-types)); TypeScript deliberately permits some unsound behavior ([compatibility notes](https://www.typescriptlang.org/docs/handbook/type-compatibility.html#a-note-on-soundness)). It must be generated from, or checked against, a runtime schema—not be the sole action gate. |
| Relational database / event ledger | Appropriate for authoritative operational facts requiring transactions, idempotency, locks, ordering, retries, retention, and audit: runs, approvals, waits, receipts, and current workflow state. It permits deterministic recovery rather than relying on chat or model memory. | It is not a humane place to author a system's purpose or inspect its full reasoning. The ledger emits human-readable projections; it must not duplicate editable knowledge/work objects held by their owner. |
| Generated projections and search indexes | Essential for "human-readable without a model": render pending assumptions/questions, state, approvals, evidence, freshness, and links in the knowledge system/other selected workspace. They can also create indexes, dashboards, and TypeScript types. | They are rebuildable outputs. They carry source ID/version/hash and freshness; direct edits either route to the writable owner or are rejected. They never become a second canonical source. |

The preceding split is consistent with the repository architecture: Markdown is suitable for meaning and evidence; TypeScript/runtime schemas for commands and adapters; a ledger for operational truth; and projections for inspection. The [complete standard](../../THINKING_IN_SYSTEMS_STANDARD.md#7-required-system-record) defines required meaning while later implementation systems decide the concrete storage structure and deterministic schema.

## The minimal boundary contract the standard should require

the standard should require that every material handoff specify the following meaning, regardless of its eventual storage format:

- `boundary_id` and version; named producer, consumer, and authoritative owner;
- intended outcome, non-outcomes, input source/version, expected output, and human-visible completion evidence;
- authority/effect class, whether an approval is required, and the exact approval/expiry/revision semantics;
- assumptions, ambiguities, missing evidence, and the safe disposition of each (`block`, `compose`, or `defer`); no ambiguity may become implicit permission;
- failure signals, degraded result, resumption/retry path, and truthful status wording;
- provenance and decision links: source material, decision/ADR, governing rule version, and correction/replay reference;
- compatibility/change rule and the projection(s) that make the boundary inspectable.

For a machine-enforced boundary, require a companion record schema with: stable IDs; correlation and causation IDs; schema and policy version; lifecycle/status enum; actor/authority fields; input hash/version; assumption and clarification references; approval reference/expiry; result/receipt reference; and structured error/degraded status. Validate it at every owning service boundary, before a consequential command, and on receipt ingestion. Produce field-addressable validation errors for the human/agent correction loop.

Use deterministic code—not an LLM and not JSON Schema alone—for cross-record invariants, state-transition authorization, idempotency, scheduling, retries, conflict handling, and side effects. This mirrors OKF's useful distinction between an agent-produced computation description, a runtime receipt, and a deterministic attester ([OKF §10](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md#10-attested-computations-concept)).

## Single-source rules and validation strategy

1. **Name the owner by fact, not by file.** For example: S02 owns durable knowledge/document content; S12 owns run/approval/receipt state; the task system owns its native task fields; an adapter owns only its mapping/configuration. A workspace ID is a correlation key, never permission to maintain a shadow editable copy.
2. **Choose one authoring direction.** Markdown → published runtime file is a one-way deployment with source version/hash and drift detection. Schema → TypeScript/reference docs/forms is generation. Ledger → dashboard/vault status is projection. Never add an automatic two-way synchronizer.
3. **Validate at the narrowest reliable seam.** Parse/lint Markdown frontmatter and required headings; validate JSON records at ingestion and command boundaries; run deterministic transition/authority checks before effects; test representative end-to-end scenarios with effectors disabled. Schema validity is necessary but never sufficient for a correct human outcome.
4. **Version and preserve.** Do not overwrite the governing version that produced a proposal or receipt. Mark supersession, retain source/approval/evidence links, classify compatibility, and make stale projections visible. The [ADR guidance](https://adr.github.io/) supports recording a decision with context and consequences, while its decision-as-code discussion recommends objective checks to keep decisions enforced ([ADR fitness functions](https://github.com/joelparkerhenderson/architecture-decision-record/blob/main/README.md#fitness-functions-for-decisions-as-code)).
5. **Fail closed for action, gracefully for knowledge.** A malformed or unknown action contract is a visible blocked/degraded case; a knowledge document may remain readable but marked unverified/stale. This preserves capture while preventing a permissive parser from authorizing an effect.

## Scope boundary: the standard now; S02/S12 later

| the standard decides now | Delegate to S02 | Delegate to S12 |
| --- | --- | --- |
| The required semantic components of a boundary, explicit owner/projection rule, source/provenance/decision links, human readability, validation expectation, version/change requirement, and no-hidden-ambiguity rule. | Exact the knowledge system folders, Markdown templates/frontmatter dialect, note IDs and links, retrieval/indexing, publishing source documents to runtime files, and human-facing projections for durable knowledge. | Database/event model, JSON Schema dialect/tooling, command/receipt/event envelopes, state-machine implementation, idempotency, locks, retries, schedules, event retention, replay, and deterministic transition/authority enforcement. |

the standard should therefore **not** choose a database, an event-sourcing pattern, a TypeScript framework, a schema generator, or an OKF adoption. Those are implementation decisions that depend on S02's canonical knowledge design and S12's operational-state design. It should demand that their eventual choices demonstrate the above contract and prove that generated surfaces cannot silently diverge.

## Open decisions for the the standard frontier

1. Should a Markdown Boundary Contract be the canonical System Record itself, or should S02 maintain a system registry that projects individual records into Markdown? the standard can require a single human-readable authority without selecting either layout.
2. Which fields are universally machine-checkable enough to standardize now (for example ID, version, owner, status, links), and which remain process-specific? Start with a small shared envelope; over-standardizing personal workflows would recreate the rigidity the standard is intended to avoid.
3. What is the approval record's canonical owner and exact identity binding (`proposal revision` + `input hash` + `policy version`), given S12 will enforce it but S02 must expose it?
4. Which the standard checks are deterministic lint/fitness functions from day one versus review questions that remain human/agent judgment? Candidate deterministic checks: every material boundary declares an owner, effect class, completion evidence, degraded path, and change disposition; every projection declares its source/freshness.
5. Is OKF-compatible frontmatter valuable for portability/provenance in the vault, or merely inspiration? Its extensibility is attractive, but its intentionally permissive validation must be tightened or separated from any executable action contract.
