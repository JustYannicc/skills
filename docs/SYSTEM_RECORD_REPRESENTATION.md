# Accepted — System Record representation

**Status:** accepted at merged PR #41 (`1ef5bfb24ed0d4ffee99d021836acc285cb5be33`).
**Human decision:** the maintainer accepted the Markdown + constrained YAML
representation and its one-writable-authority, structural-validator, and
action-guard boundaries.
**Fixed point:** `455541e255b5482235faa65a82bffc2b21415b94`.
**Disposable proof:**
[`dabfca4956e6d07a0cea18d278e75d8726b07ff1`](https://github.com/JustYannicc/skills/commit/dabfca4956e6d07a0cea18d278e75d8726b07ff1).

> **Decision recorded:** PR #41 merged the reviewed representation and closed
> issue #35. This acceptance does not make an Adapter canonical without the
> declared structural-validator and action-guard seams, and it does not waive
> the repository's separate publication and human-review gates.

## Decision

### Accepted representation

1. The adapter-neutral System Record is one human-readable canonical record
   with one writable authority. Its structured envelope owns only fields a
   deterministic consumer must parse or gate; its narrative owns intent,
   rationale, assumptions, trade-offs, links, and recovery guidance.
2. The Local Markdown Adapter serializes that record as CommonMark-compatible
   Markdown with a constrained YAML envelope delimited by `---`. This envelope
   is a suite convention, not part of CommonMark.
3. The envelope owns an opaque logical record identity, human-facing version,
   exact record revision, canonical locator, distinct design/operational/
   eligibility states and operating mode, owner, exact named/scoped action
   Authority, provenance reference, and an optional approval binding with exact
   result/Authority revisions, validity, and revocation state. The existing
   Section 2 table remains the single semantic relationship index; the envelope
   does not copy it.
4. A production Adapter that authorizes machine lifecycle transitions,
   projections, or effects must implement two named seams: a `System Record
   structural validator` and a `System Record action guard`. The validator
   parses the complete envelope strictly; rejects YAML directives, aliases,
   anchors, explicit tags, duplicate keys, and unknown fields; validates typed
   objects; and validates the canonical relationship table's required columns,
   identity/version/boundary/link shapes, and uniqueness. The guard consumes
   only validated output and matches the requested action, target/scope, and
   contract to an exact current Authority revision. It also binds eligible state
   and `normal` mode, current record revision, approval result/Authority
   revisions, validity, and revocation. Until both seams are implemented and
   proven for an Adapter, the Adapter cannot authorize those actions. Syntax
   and schema validity never assert that the narrative, evidence, ownership,
   relationship classification, or decision is semantically correct.
5. Hosted or external Adapters may map the same logical envelope and narrative
   into native fields and bodies. YAML is not a universal runtime prerequisite.
6. JSON or TOML may be emitted only as an optional one-way generated projection
   for a declared Adapter consumer. Each projection is read-only, identifies
   its canonical source locator, source revision and SHA-256, records its
   generation time and normalized-payload SHA-256, and is rejected when stale,
   forged against the independently parsed canonical source, or presented to a
   writable ingestion seam.
7. **TOML status: optional generated projection only; not canonical.** No core
   skill or baseline Adapter requires a TOML parser.

### Decision record

- **Accepted option:** Markdown with a constrained YAML envelope and the
  canonical Section 2 relationship index.
- **Rejected alternatives:** TOML or JSON as a canonical writable format;
  generated projections remain optional and read-only.
- **Decision boundary:** future representation changes require a new explicit
  decision record and revision-bound proof; this document is not an implicit
  authority for unrelated Adapter behavior.

Issue #35 is closed at the merged PR #41 revision. The representation remains
separate from the implementation and publication decisions of downstream
skills and Adapters.

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

The corpus contains an opaque logical identity, record/schema versions and exact
revision, distinct design/operational/eligibility states and operating mode, a
canonical locator, an Actor reference, a current Authority revision with a
named action/target-scope/contract grant, provenance with a source revision and
SHA-256, an approval/result/Authority revision plus validity binding, narrative
rationale, a working relative Markdown link, an HTML narrative comment, and an
envelope comment. The Section 2 Markdown table is the sole relationship
authority in every option, including TOML-only's narrative string; it contains
two typed/versioned rows with material boundaries and contract links.

Variants cover a deterministic owner/rationale edit simulation, duplicate-key
and unknown-nested-field malformed YAML and TOML, restricted YAML features,
duplicate/missing-version/unknown-kind/malformed-link relationship rows,
missing or stale Authority, wrong action/scope, pending/expired/revoked approval,
ineligible/retiring/non-normal-mode state, direct projection writes, forged
payload-plus-hash, reordered output, and canonical edits/revisions that make a
projection stale. Raw fixtures are also copied outside Git and read by a Node
process that imports no YAML or TOML parser.

The prototype branch is intentionally outside the proposed production tree. Its
[README, production-shaped fixtures, raw LLM outputs, table parser, and runner](https://github.com/JustYannicc/skills/tree/dabfca4956e6d07a0cea18d278e75d8726b07ff1/prototypes/system-record-representation)
are frozen at the exact revision above; this file records the decision-relevant
result.

## Measured outcomes

All four options parsed to normalized semantic SHA-256
`c14a4cb1a0f6dfe0026e262949d21bbd9939c722d42548d995e22b23ce98604d`.

| Measure | Markdown + YAML | Markdown + TOML | TOML-only | Canonical Markdown + generated JSON/TOML |
| --- | --- | --- | --- | --- |
| Parsed to the shared fixture | pass | pass | pass | pass |
| Parse → serialize → parse semantics | pass | pass | pass | pass at canonical source; projections parse |
| Deterministic manual-edit simulation reparsed | pass | pass | pass | pass at canonical source |
| Independent Luna Max edit reparsed without unintended semantic changes | recorded in exact proof revision | recorded in exact proof revision | recorded in exact proof revision | canonical edit recorded; projections remain generated/read-only |
| Human judgment/readability round trip | **HUMAN REVIEW REQUIRED on this PR** | same required decision comparison | same required decision comparison | same required decision comparison |
| Relative link and narrative rationale retained | pass | pass | pass inside TOML string | pass in canonical source |
| Envelope comment retained by parser serialization | no | no | no | no; JSON has no comment syntax |
| Narrative HTML comment retained | pass | pass | pass inside narrative string | pass in canonical source; not promised in projections |
| Parserless narrative surface | ordinary Markdown body | ordinary Markdown body | TOML multiline string boundary | ordinary canonical Markdown body |
| Source bytes in this hand-formatted fixture | 2,203 | 2,250 | 2,261 | 2,203 canonical plus generated copies |
| Duplicate-key and nested-unknown envelope source blocks | pass | pass | pass | pass at canonical source; missing projection also blocks |
| Duplicate/missing-version/unknown-kind/malformed-link relationship table blocks | pass | pass | pass | pass at canonical source |
| Raw narrative recovery outside Git without a YAML/TOML parser | pass | pass | pass, with multiline-string boundary scan | pass at canonical source |
| Exact action/scope/Authority/revision/mode/approval guard | same schema/guard required | same | same | positive control passes; every stale, wrong-scope, non-normal, expired, revoked, pending, ineligible, or retiring case blocks |
| Projection semantic equivalence, freshness, and direct-write rejection | not applicable | not applicable | not applicable | JSON/TOML and reordered objects pass; source edit/revision change, payload mutation, or forged payload+hash fails; direct write rejected |

The independent Luna Max trial performed the same edit in isolated raw copies:
change the owner label, add one recovery sentence beneath `## Rationale`, and
preserve every identity/version/revision; lifecycle, eligibility, and mode
state; Authority revision and action/scope/contract grant; Section 2
relationship identity/version/boundary/link; provenance value; approval
validity/revocation field; link; and comment. The exact input revision, model,
reasoning effort, context ID, raw outputs, and SHA-256 values are retained in the
proof branch. One LLM trial is behavioral evidence, not a deterministic
guarantee. Human readability and representation judgment deliberately remain
the maintainer's PR decision.

Parser serialization intentionally tests normalized meaning rather than byte
identity. YAML and TOML comments are not semantic data, so a material operator
instruction must live in the narrative or a schema field rather than an
envelope comment.

## Syntactic validation versus semantic judgment

The deterministic seam validates only formal rules needed by a named consumer:

| Deterministic validation | Human or LLM judgment |
| --- | --- |
| supported schema version and complete envelope boundary | whether the original request and Intent are understood |
| opaque record identity, human-facing version, exact record revision, and canonical locator shape | whether an owner or decision authority is legitimate |
| distinct enumerated design, operational, eligibility, and operating-mode states | whether any state claim is true |
| structurally complete Actor and current Authority revision plus named action, target/scope, and contract | whether the Actor legitimately holds Authority or the grant should exist |
| canonical relationship-table columns, `<identity> @ <version>` cells, unique kind/identity/version rows, material-boundary text, and contract-link shape | whether a relationship is material, correctly classified, or governed by the linked contract |
| provenance locator, revision, and hash shape | whether a source is authoritative, the declared hash was verified, or evidence is credible |
| typed conditional object shape and approver/Authority/result fields with current Authority/result equality, validity, and revocation when approval is present | whether the approver legitimately holds the cited Authority, whether the condition is material, or whether another narrative conditional section applies |
| projection source locator/revision/hash, independently derived canonical-payload hash, read-only marker, and freshness | whether the projection preserves all useful narrative meaning |
| eligible lifecycle state, normal mode, current record/Authority revisions, exact requested action/scope/contract grant, and valid unrevoked approval | whether the effect is wise or satisfies the Outcome |

An invalid or unavailable parser produces visible `unverified` or `blocked`
machine state. The narrative remains available for human reading and editing,
but no machine-authorized lifecycle change, generated projection, or external
effect may proceed from an unvalidated envelope. A parser's recovery mode
cannot authorize an action. This PR specifies the `System Record structural
validator` and `System Record action guard` contracts and prototypes their
logical schema/action invariants; it does not add a production Adapter or a
Markdown-table extraction implementation. An Adapter without both proven seams
therefore has no machine-effect capability.

## Adapter capability matrix

| Adapter or condition | Canonical representation | Required parser capability | Derived projection support | Degraded behavior |
| --- | --- | --- | --- | --- |
| Transient Conversation | conversation state; no durable file before a Persistence boundary | none | none | materialize through a Baseline Adapter before durable work |
| Local Markdown, no Git | Markdown + constrained YAML envelope and canonical Section 2 table | restricted YAML subset + table/schema structural validator + action guard for machine actions; Adapter revision need not be Git | optional; off by default | human reads/edits narrative; machine actions block when either seam is unavailable |
| Git-backed Local Markdown | same canonical file, with Git revision available as one exact-revision mechanism | restricted YAML/table/schema structural validator + action guard | optional JSON/TOML with source revision/source hash/independently derived canonical-payload hash | stale, forged, or conflicted source enters recovery |
| GitHub or another hosted native Adapter | one native writable record with mapped envelope fields and a human-readable body | host-native field validation plus universal invariants | optional external read-only view | disclose unsupported fields/capabilities; do not shadow-write a local copy |
| External Adapter provider | provider's one canonical native record after conformance proof | provider mapping validates every applicable envelope rule | optional for a declared consumer | fall back or remain incomplete when Baseline semantics cannot be preserved |
| Projection-only consumer | no authority; reads the canonical Adapter's generated output | JSON or TOML parser plus canonical-source semantic/freshness verification | required for that consumer only | reject missing, writable, malformed, stale, or forged projection and route edits to source |
| No parser available | canonical text remains readable | none | unavailable | preserve state and narrative; block machine action until validation returns |

## Decisive trade-offs

### Why Markdown + constrained YAML is recommended

- It ties for semantic round-trip behavior in the shared corpus.
- It keeps rationale, links, and recovery guidance in an ordinary Markdown body
  under parser failure or no-Git conditions.
- It matches the repository's current `System Record` template, Setup
  configuration contract, Agent Skills frontmatter convention, and existing
  pinned YAML/Zod validation stack.
- The decisive safety property comes from the constrained schema, canonical
  table validator, and exact-action guard. It does not depend on YAML's
  permissiveness.

### Why TOML did not win

TOML rejects duplicate keys and has more explicit lexical types than general
YAML, but the proof did not show a material Outcome advantage. TOML still needs
an application schema, an embedded-envelope convention, and an action guard.
Markdown + TOML adds a baseline parser ecosystem without improving narrative
recovery. TOML-only made narrative edits more boundary-sensitive and removed
the ordinary Markdown body. The hand-formatted TOML fixtures were 52–63 bytes
larger than the YAML fixture, but formatting choices dominate such a small
sample, so byte count is descriptive and not a decisive general format claim.

### Why universal projections are deferred

Generated JSON/TOML passed read-only and staleness checks, and a declared
consumer may justify them. Making them universal would add generator,
canonicalization, storage, invalidation, and Adapter support obligations even
when no consumer exists. The projection is therefore optional and generated
on demand, never a baseline artifact or writable authority.

## Migration cost

| Choice | Cost from current repository state | Legacy and rollback consequence |
| --- | --- | --- |
| Recommended Markdown + constrained YAML | low: the template and Local Markdown design already use this container; add schema/revision/locator, operating mode, typed scoped Authority, validity/revocation approval fields, and the machine-validated identity/version convention while keeping the existing Section 2 relationship index | source-archive copies remain immutable historical evidence; no published/live suite records are known, while external copies remain unknown and require discovery before claiming zero migration |
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
6. Prototype commit
   [`dabfca4956e6d07a0cea18d278e75d8726b07ff1`](https://github.com/JustYannicc/skills/commit/dabfca4956e6d07a0cea18d278e75d8726b07ff1)
   — production-shaped shared fixtures, strict envelope/table/action proof,
   forged-projection rejection, raw no-Git recovery, and revision-bound Luna Max
   round-trip evidence.

The reviewer should inspect each raw source/output pair, confirm that rationale
and links remain naturally readable, and decide whether TOML's explicit syntax
creates an unmeasured material advantage, whether the envelope is small enough,
whether the no-parser fail-closed rule is acceptable, and whether optional
projections are sufficiently bounded. Review approval must bind the exact PR
revision.

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
