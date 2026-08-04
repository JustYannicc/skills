# HUMAN REVIEW REQUIRED — System Record representation

**Status:** candidate until the repository maintainer approves the exact PR;
approval makes this the decision record at that revision  
**Human decision:** accept, reject, or revise the representation before issue
#35 can close  
**Evidence head:** `455541e255b5482235faa65a82bffc2b21415b94`  
**Disposable proof:** [`a591a7d`](https://github.com/JustYannicc/skills/commit/a591a7d)

> **HUMAN REVIEW REQUIRED:** merging the associated PR accepts the proposed
> representation changes in this package. The proof and recommendation do not
> grant an agent authority to approve the representation, merge the PR, or
> close issue #35.

## Decision

### Proposed representation

1. The adapter-neutral System Record is one human-readable canonical record
   with one writable authority. Its structured envelope owns only fields a
   deterministic consumer must parse or gate; its narrative owns intent,
   rationale, assumptions, trade-offs, links, and recovery guidance.
2. The Local Markdown Adapter serializes that record as CommonMark-compatible
   Markdown with a constrained YAML envelope delimited by `---`. This envelope
   is a suite convention, not part of CommonMark.
3. Deterministic validation parses the complete envelope strictly, rejects
   duplicate or unknown action-boundary fields, validates typed conditional
   objects such as an approval when present, and runs before a machine-authorized
   lifecycle transition, projection, or external effect. Syntax and schema
   validity never assert that the narrative, evidence, ownership, or decision
   is semantically correct.
4. Hosted or external Adapters may map the same logical envelope and narrative
   into native fields and bodies. YAML is not a universal runtime prerequisite.
5. JSON or TOML may be emitted only as an optional one-way generated projection
   for a declared Adapter consumer. Each projection is read-only, identifies
   its canonical source locator, source revision and SHA-256, records its
   generation time or equivalent freshness evidence, and is rejected when
   stale or presented to a writable ingestion seam.
6. **TOML status: optional generated projection only; not canonical.** No core
   skill or baseline Adapter requires a TOML parser.

### Human choice

- **Accept:** approve the exact PR revision; the representation becomes accepted
  only through that human action.
- **Choose another option:** record the selected tested option and decisive
  trade-off before changing the governing template.
- **Request evidence:** name the result that could change the decision and keep
  the candidate unaccepted.

Issue #35 remains open until the maintainer records the decision and verifies
the accepted surfaces. The PR must not be merged by the agent that authored
this package.

## Decision frame

- **Outcome:** preserve one inspectable System Record across human and machine
  use while preventing malformed or stale data from authorizing an effect.
- **Good-enough threshold:** the same fixture meaning survives human, LLM, and
  parser round trips; a person can recover the narrative without Git or a
  parser; action boundaries fail closed; one writable authority remains
  obvious; and an Adapter can validate formal fields without pretending to
  validate judgment.
- **Actors:** record author, human decision owner, Adapter implementation,
  deterministic validator or effect guard, LLM interpreter, and downstream
  projection consumer.
- **Hard constraints:** one source of truth per meaning; no Git, hosted service,
  TOML parser, or LLM prerequisite for human recovery; no second writable
  projection; no change to Workflow's #13 behavior.
- **Non-Outcomes:** choosing a database, implementing a Workflow Adapter,
  creating a change-management skill, or making schemas the authority for
  semantic judgment.
- **Stable judgment across frames:** whether framed as authoring convenience or
  action safety, every option still needs an application schema and effect
  guard. TOML's stricter lexical syntax does not remove semantic judgment.

## Shared fixture corpus

The disposable proof uses one fixture authority rendered through exactly four
options:

1. Markdown with a constrained YAML envelope.
2. Markdown with a TOML envelope.
3. TOML-only, with the narrative inside a multiline literal string.
4. Canonical Markdown with one-way generated JSON and TOML projections.

The corpus contains identity, record and schema versions, lifecycle state, an
Actor reference, effect Authority, two typed relationships, provenance with a
source revision and SHA-256, a conditional approval section, narrative
rationale, a relative Markdown link, an HTML narrative comment, and an envelope
comment. Variants cover a bounded owner/rationale edit, duplicate-key malformed
source, a missing Authority object, pending approval, direct projection writes,
and a canonical edit that makes a projection stale.

The prototype branch is intentionally outside the proposed production tree.
Its [README and fixtures](https://github.com/JustYannicc/skills/tree/a591a7d/prototypes/system-record-representation)
are the primary evidence; this file records the decision-relevant result.

## Measured outcomes

All four options parsed to normalized semantic SHA-256
`99869d6c8efe9d1c49a6f8fbd615f0281fa1256dbe9351656e6acaa32207e5cf`.

| Measure | Markdown + YAML | Markdown + TOML | TOML-only | Canonical Markdown + generated JSON/TOML |
| --- | --- | --- | --- | --- |
| Parsed to the shared fixture | pass | pass | pass | pass |
| Parse → serialize → parse semantics | pass | pass | pass | pass at canonical source; projections parse |
| Bounded human edit reparsed | pass | pass | pass | pass at canonical source |
| Independent LLM edit reparsed without unintended semantic changes | pass | pass | pass | pass at canonical source; regenerate projections |
| Relative link and narrative rationale retained | pass | pass | pass inside TOML string | pass in canonical source |
| Envelope comment retained by parser serialization | no | no | no | no; JSON has no comment syntax |
| Narrative HTML comment retained | pass | pass | pass inside narrative string | pass in canonical source; not promised in projections |
| Parserless narrative surface | ordinary Markdown body | ordinary Markdown body | TOML multiline string boundary | ordinary canonical Markdown body |
| Source bytes in the fixture | 1,192 | 1,231 | 1,242 | 1,192 canonical plus generated copies |
| Malformed action source blocks while narrative remains readable | pass | same schema/effect rule required | same schema/effect rule required | pass; stale or writable projection also blocks |
| Projection freshness and direct-write rejection | not applicable | not applicable | not applicable | pass before edit; stale after edit; direct write rejected |

The independent LLM trial performed the same edit in isolated copies: change
the owner label, add one recovery sentence beneath `## Rationale`, and preserve
every identity, version, state, Authority field, relationship, provenance
value, approval, link, and comment. All candidates passed. The qualitative
difference was edit ambiguity: both Markdown-body options were low; TOML-only
was high because the narrative and its terminator are TOML syntax. One LLM
trial is behavioral evidence, not a deterministic guarantee.

Parser serialization intentionally tests normalized meaning rather than byte
identity. YAML and TOML comments are not semantic data, so a material operator
instruction must live in the narrative or a schema field rather than an
envelope comment.

## Syntactic validation versus semantic judgment

The deterministic seam validates only formal rules needed by a named consumer:

| Deterministic validation | Human or LLM judgment |
| --- | --- |
| supported schema version and complete envelope boundary | whether the original request and Intent are understood |
| immutable record identity and record version shape | whether an owner or decision authority is legitimate |
| enumerated lifecycle state | whether the state claim is true |
| structurally complete Actor and Authority references | whether the granted Authority covers the proposed effect |
| relationship kind, identity, and contract locator shape | whether a relationship is material or correctly classified |
| provenance locator, revision, and hash shape | whether a source is authoritative or evidence is credible |
| shape and exact revision binding of a typed conditional object when present | whether the conditional risk is material |
| projection source locator, source revision/hash, read-only marker, and freshness | whether the narrative projection preserves all useful meaning |
| action-state, exact revision, and approval invariants implemented by an effect guard | whether the effect is wise or satisfies the Outcome |

An invalid or unavailable parser produces visible `unverified` or `blocked`
machine state. The narrative remains available for human reading and editing,
but no machine-authorized lifecycle change, generated projection, or external
effect may proceed from an unvalidated envelope. A parser's recovery mode
cannot authorize an action.

## Adapter capability matrix

| Adapter or condition | Canonical representation | Required parser capability | Derived projection support | Degraded behavior |
| --- | --- | --- | --- | --- |
| Transient Conversation | conversation state; no durable file before a Persistence boundary | none | none | materialize through a Baseline Adapter before durable work |
| Local Markdown, no Git | Markdown + constrained YAML envelope | strict YAML + schema for machine actions | optional; off by default | human reads narrative; machine actions block when parser unavailable |
| Git-backed Local Markdown | same canonical file, with Git revision available as evidence | strict YAML + schema | optional JSON/TOML with source revision/hash | stale or conflicted source enters recovery |
| GitHub or another hosted native Adapter | one native writable record with mapped envelope fields and a human-readable body | host-native field validation plus universal invariants | optional external read-only view | disclose unsupported fields/capabilities; do not shadow-write a local copy |
| External Adapter provider | provider's one canonical native record after conformance proof | provider mapping validates every applicable envelope rule | optional for a declared consumer | fall back or remain incomplete when Baseline semantics cannot be preserved |
| Projection-only consumer | no authority; reads the canonical Adapter's generated output | JSON or TOML parser plus freshness verification | required for that consumer only | reject missing, writable, malformed, or stale projection and route edits to source |
| No parser available | canonical text remains readable | none | unavailable | preserve state and narrative; block machine action until validation returns |

## Decisive trade-offs

### Why Markdown + constrained YAML is recommended

- It ties for semantic round-trip behavior and has the smallest tested source.
- It keeps rationale, links, and recovery guidance in an ordinary Markdown body
  under parser failure or no-Git conditions.
- It matches the repository's current `System Record` template, Setup
  configuration contract, Agent Skills frontmatter convention, and existing
  pinned YAML/Zod validation stack.
- The decisive safety property comes from the constrained schema and action
  guard. It does not depend on YAML's permissiveness.

### Why TOML did not win

TOML rejects duplicate keys and has more explicit lexical types than general
YAML, but the proof did not show a material Outcome advantage. TOML still needs
an application schema, an embedded-envelope convention, and an action guard.
Markdown + TOML was 39 bytes larger in this fixture and adds a baseline parser
ecosystem without improving narrative recovery. TOML-only was 50 bytes larger,
made narrative edits more boundary-sensitive, and removed the ordinary
Markdown body.

### Why universal projections are deferred

Generated JSON/TOML passed read-only and staleness checks, and a declared
consumer may justify them. Making them universal would add generator,
canonicalization, storage, invalidation, and Adapter support obligations even
when no consumer exists. The projection is therefore optional and generated
on demand, never a baseline artifact or writable authority.

## Migration cost

| Choice | Cost from current repository state | Legacy and rollback consequence |
| --- | --- | --- |
| Recommended Markdown + constrained YAML | low: the template and Local Markdown design already use this shape; rename the draft envelope fields and move the relationship index to its single structured authority | source-archive copies remain immutable historical evidence; no published/live suite records are known, while external copies remain unknown and require discovery before claiming zero migration |
| Markdown + TOML | medium: translate frontmatter, add and pin a TOML parser, update every validator/example, and teach a new delimiter convention | retain predecessor locators; rollback translates metadata back to YAML |
| TOML-only | high: transform every narrative section into TOML strings/tables, replace Markdown rendering/link behavior, and add parser capability to every baseline Adapter | highest review burden; parserless recovery changes materially |
| Universal generated projections | medium ongoing cost: build generators, canonical output policy, freshness checks, read-only routing, reconciliation, and failure visibility for every supported Adapter | projections are rebuildable; rollback removes them without changing canonical source only if no consumer treated them as authority |

The repository has not published the suite, so there is no known live System
Record population to migrate. That is evidence about this repository, not a
claim about downloaded or copied drafts outside it.

## Alternatives rejected or deferred

- **Rejected as the universal canonical representation:** Markdown with a TOML
  envelope. It adds a parser without a measured material advantage.
- **Rejected as the universal canonical representation:** TOML-only. It weakens
  narrative authoring and parserless recovery while retaining the same need for
  semantic review and effect guards.
- **Deferred as a universal requirement:** generated JSON/TOML projections.
  Permit one only for a named Adapter consumer with read-only and freshness
  enforcement.
- **Rejected:** equal bidirectional synchronization between Markdown and TOML
  or JSON. It creates two writable authorities and an unresolved conflict path.

## Exact human review surfaces

The human decision owner must inspect these changed and governing surfaces:

1. `docs/SYSTEM_RECORD_REPRESENTATION.md` — decision, evidence, trade-offs,
   migration, and authority boundary.
2. `skills/thinking-in-systems/references/system-record-template.md` — proposed
   constrained envelope and single relationship-index authority.
3. `skills/thinking-in-systems/references/standard.md`, especially Sections 4
   and 8 — unchanged semantic authority against which the proposal is checked.
4. `docs/UNIVERSAL_WORK_CONTRACT.md`, especially Durable records and the Local
   Markdown Adapter — unchanged Adapter contract that the proposal must fit.
5. `docs/DECISIONS.md` and `docs/requirements/REQUIREMENTS_LEDGER.md` — remain
   unchanged until the human decision; propagate only the selected option.
6. Prototype commit [`a591a7d`](https://github.com/JustYannicc/skills/commit/a591a7d)
   — shared fixtures, parser/action proof, and LLM round-trip evidence.

The reviewer should decide whether TOML's explicit syntax creates an
unmeasured material advantage, whether the envelope is small enough, whether
the no-parser fail-closed rule is acceptable, and whether optional projections
are sufficiently bounded. Review approval must bind the exact PR revision.

## Primary research citations and provenance

These are research citations supporting this decision package, not imported
skill sources or runtime dependencies. `validation/sources.yaml` remains the
sole inventory authority for imported upstream skill URLs, revisions, and
licenses.

| Source | Inspected revision/date | Status or license | Decision-relevant claim |
| --- | --- | --- | --- |
| [CommonMark 0.31.2](https://spec.commonmark.org/0.31.2/) | 2024-01-28 | specification, CC BY-SA 4.0 | Markdown is plain text; frontmatter is not a CommonMark construct and `---` is otherwise a thematic break |
| [YAML 1.2.2](https://yaml.org/spec/1.2.2/) and [tag](https://github.com/yaml/yaml-spec/releases/tag/1.2.2) | 1.2.2, commit `80c6bde`, 2021-10-01 | specification; freely copyable unmodified | comments, styles, and mapping order are presentation details; schema resolution and loading behavior require application constraints |
| [TOML 1.1.0](https://toml.io/en/v1.1.0) and [tag](https://github.com/toml-lang/toml/releases/tag/1.1.0) | 1.1.0, commit `bcbbd1c`, published 2025-12-18 | MIT | duplicate keys and structural conflicts are invalid; comments and table order do not create semantic determinism; no embedded stream delimiter is standardized |
| [JSON RFC 8259](https://www.rfc-editor.org/rfc/rfc8259.html) | December 2017 | IETF Standards Track | JSON has no comment syntax; member order and duplicate-name behavior are not an authority model |
| [JSON Canonicalization Scheme RFC 8785](https://www.rfc-editor.org/rfc/rfc8785.html) | June 2020 | Informational RFC | JCS can stabilize constrained JSON bytes, not preserve Markdown source/comments or canonicalize TOML |
| [Jekyll frontmatter](https://jekyllrb.com/docs/front-matter/) | docs 4.4.1 | MIT implementation documentation | YAML frontmatter is an implementation convention |
| [Hugo frontmatter](https://gohugo.io/content-management/front-matter/) | page revision `45ae53c2d`, 2026-07-27 | Apache-2.0 project documentation | YAML/TOML/JSON delimiters vary by implementation |
| [`yaml` 2.9.0](https://github.com/eemeli/yaml) | package 2.9.0 | ISC | parser used for the disposable YAML proof |
| [`smol-toml` 1.7.1](https://github.com/squirrelchat/smol-toml) | package 1.7.1, inspected 2026-08-04 | BSD-3-Clause | parser used only on the disposable prototype branch |

The specifications support syntax and parser claims. They do not predict human
or LLM round-trip quality, semantic correctness, Authority, or migration cost;
those conclusions come from the shared fixture proof and repository context.
