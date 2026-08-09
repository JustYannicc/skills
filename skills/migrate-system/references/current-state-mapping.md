# Current-state mapping

Read this branch after the materially affected boundary is explicit. It is a
field and integration checklist over the universal Workflow records. It does
not define a new artifact model or writable authority.

The [Durable mode reference](../../workflow/references/durable-mode.md) owns the
record fields and transition rules. The [Continuation template](../../workflow/references/continuation-template.md)
owns waiting and resumption fields. The checklists below are non-persisted
inspection aids; their results live in those canonical records and may be
rendered only as a source-linked, revision-bound derived Map.

## Place each meaning once

| Meaning | Canonical home | Mapping treatment |
| --- | --- | --- |
| Durable System identity, Outcome, boundary, supported conditions, Actors, Authority, operating state, relationships, and provenance | System Record through the selected Adapter | Update the one canonical record at an exact revision. Keep its relationship index semantic and link interface contracts rather than copying them. |
| Parent work contract, affected scope, Constraints, terminal condition, and proof | Outcome record | Preserve the active Workflow identity and parent owner. Migration is one bounded child result. |
| Active work, owner, state, dependencies, Claim, result revision, and Proof seam | Ticket records | Map existing units without fabricating acceptance, ownership, state, or completion. |
| A condition evaluated, method, result, observer, time, locator, and exact mutable revision | Evidence reference | Bind each current-state claim to evidence; a link alone is not evidence. |
| External dependency, unblock condition, next check, retry or escalation, and resumption action | Continuation record | Preserve waiting Responsibility and claim scheduling only when a mechanism accepted it. |
| Mapping acceptance, correction, conflict, and state changes | Transition history | Append events; retain contradicted or superseded history. |
| Navigation across records, coverage, frontier, Recovery, and fog | Map | Keep it derived, source-linked, revision-bound, and visibly fresh or stale. |
| Proposed repair, redesign, reassignment, policy, environment, or interface change | Related Outcome or Ticket through ordinary Workflow | Link the finding and evidence; do not perform it during migration. |

For Local Markdown, adapt these meanings to the existing Outcome/System Record
and Ticket files. A hosted or external Adapter may use native fields and bodies
only after it preserves the same semantics. Do not shadow-write a local copy of
a native canonical record.

## Source and provenance checklist

Record one row per material source or observation:

| Field | Required meaning |
| --- | --- |
| Source ID and locator | Stable reference to the record, Actor statement, artifact, or observation. |
| Captured revision or time | Exact revision for mutable sources; observation time and conditions for witnessed behavior. |
| Source role | Authoritative contract, current operating record, Actor testimony, direct observation, derived view, or historical evidence. |
| Claims supported | The precise current-state propositions this source can support. |
| Freshness and confidence | Evidence-backed status, not a whole-map vibe. |
| Conflict or limitation | Contrary sources, unavailable slices, access limits, or interpretation bounds. |

The original request is always a source for requested scope and constraints. It
is evidence of operating reality only for claims the requester can support.

## Coverage checklist

For the materially affected scope, account for each dimension:

| Dimension | Record |
| --- | --- |
| Boundary | System of interest, included and excluded conditions, Containing System, Subsystems, Upstream, Dependent, Peer, other relationships, and explicit non-ownership. |
| Actors and Responsibility | Outcome owner, Work owners, Executors, Reviewers, Approvers, operators, support and recovery Actors, accepted duties, return routes, and visible ownerless work. |
| Authority | Who may interpret, decide, write coordination state, approve, or perform each effect; unknown or disputed grants remain gaps. |
| Interfaces | Producer, consumer, input, preconditions, output, timing, failure/degraded behavior, retry/recovery, change notification, and proof. |
| Active work | Stable identity or description, parent, owner, state, Claim, result revision, Proof seam, next action, and return route. |
| Dependencies | `contains`, `requires`, `related`, and external dependencies kept distinct; cancellations and waits retain their true meaning. |
| Evidence | Condition, observation method, result, observer, time, locator, exact revision, limitation, and confidence. |
| Waiting and Recovery | Reason, external dependency, unblock condition, last observation, next check and Actor, retry/escalation/expiry, scheduled action only when accepted, pickup point, and proof remaining. |
| Unknowns and conflicts | Source-bound uncertainty, material effect, current owner, route, and the condition that resolves or governs it. |
| Provenance and legacy coverage | Original labels, artifacts, aliases, historical state, mapped meaning, exceptions, unreachable or unknown coverage, and no rewritten history. |

Preserve the Adapter's canonical lifecycle states and the Evidence reference's
method and source role. Do not collapse evidence basis, confidence, conflict,
and lifecycle disposition into one invented claim-status field. Confidence
never substitutes for Authority, acceptance, or proof.

## Delegated mapping packet

Before dispatch, bind:

- canonical child Ticket identity, parent `contains` relationship, Work owner,
  accepted lifecycle state, Claim rule, boundary, exclusions, and return route;
- immutable source set or read boundary and captured input revisions;
- allowed coordination writes and every source that remains read-only;
- required coverage dimensions and Evidence fields;
- dependency and concurrency assumptions;
- Proof seam, Reviewer, Review dispositions, exact result revision, and
  terminal condition for the bounded child result; and
- failure, stale-source, conflict, and Recovery behavior.

On return, preserve the child's exact result revision and revision-bound Review
verdict. Integrate only `Verified` child Evidence. Integration compares claims
by source and boundary, not by majority vote. Duplicates retain one canonical
meaning with all supporting Evidence references. Contradictions stay visible
until evidence or an authorized decision resolves them. Missing, stale,
`Changes required`, `Inconclusive`, or failed child areas remain owned execution,
waiting, or Recovery work under the ordinary Ticket lifecycle.

## Verification gate

The integrated map is reviewable only when:

1. every included material dimension has current source-bound state or a named
   gap;
2. every exclusion and unknown-coverage claim is explicit;
3. current owners confirm their slices or contrary evidence remains visible;
4. active work, dependencies, waiting, and Recovery are mutually consistent;
5. each material interface has evidence at its meaningful seam;
6. delegated results reconcile to one exact integrated revision;
7. derived views name their canonical sources, revisions, and freshness;
8. machine transitions or effects remain blocked when the System Record
   structural validator or action guard is unavailable or fails; and
9. every discovered change is separate ordinary Workflow work.

A verified partial map states exactly what it covers. It never implies that an
excluded or unknown region was inventoried. Migration can complete under
persistent fog only when Wayfinder returns an accepted operating strategy whose
thresholds, safe mode, feedback, and recovery rule keep that fog from silently
changing current Authority, Responsibility, risk, interfaces, or proof.

## Return packet

Return to Workflow:

- map identity, canonical locators, exact integrated revision, and derived-view
  freshness;
- affected scope, exclusions, coverage, and unknown coverage;
- migration owner, child owners, parent Outcome owner, and current states;
- source/provenance coverage and conflict summary plus the canonical Evidence
  index locator and revision;
- Review verdict and exact revision reviewed;
- Continuations, Recovery items, capability gaps, and resumption actions;
- persistent-fog strategy and decision frontier when applicable; and
- separate discovered-change proposals with evidence and ordinary Workflow
  routes.

The return packet is navigation and evidence for the parent owner. It does not
become another canonical source or a parent completion claim.
