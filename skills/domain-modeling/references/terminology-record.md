# Terminology record and proof

The selected Adapter is the canonical writer. The following is a terminology
overlay on the Adapter's ordinary record, identity, authority, history, and
evidence contract—not a serialization format or a System Record decision. A
host may store it in any Adapter-native representation.

## Entry contract

The terminology-specific core is:

- **Canonical label** — the one label to use in the recorded scope.
- **Operative meaning** — what the term refers to, its boundary, and explicit
  exclusions; keep it concise and observable.
- **Scope** — the Coordination space, context, or interaction where the meaning
  is valid.
- **Terminology status** — `resolved` when one meaning is operative, or
  `conflicted` / `unresolved` when the boundary remains visible. This is an
  entry-level language status, not a Ticket lifecycle state.

Add these conditionally:

- **Aliases** — labels with the same referent in this scope, including legacy
  labels retained for search or migration; choose one canonical label.
- **Conflicts** — competing labels or meanings that must not be collapsed;
  include each source and the smallest question that would resolve the conflict.
- **Relationships** — links to other terms or records using the canonical
  `contains`, `requires`, or `related` meanings, or the host's explicitly
  mapped Containing, Subsystem, Upstream, Dependent, or Peer relationship.
  Link to the authoritative contract instead of copying it.

Every Durable canonical record carries the Adapter's baseline metadata:
immutable identity, one owner, canonical locator, and transition history.
Mutable terminology results also carry exact source and result revisions in
their evidence. Authority and conditional-write guards follow the Adapter's
declared capability, but a missing exact revision, stale detection, or accepted
write Authority is a capability gap—not permission to overwrite. Report the gap
to Workflow and preserve change rationale in the Adapter's history rather than
inventing a second history field. Inline transient results may omit Durable
metadata only when they are explicitly marked non-durable.

## Scenario probes

Use the smallest set that can distinguish the candidates:

1. **Substitution:** replace the term with its nearest alias. Does ownership,
   authority, state, or outcome change?
2. **Boundary:** move one actor, item, or event just inside and just outside the
   proposed scope. Does the term still apply?
3. **Lifecycle:** apply the term before, during, and after a meaningful state
   transition. Is it the same referent or a different state?
4. **Relationship:** ask whether the term `contains`, `requires`, or is merely
   `related` to another record, or which mapped System relationship applies. Do
   not infer execution order from `contains`.
5. **Low-capacity or missing-source case:** remove a service, actor, response, or
   source. Does the definition remain usable, or should it be unresolved?

Pair a good case with a near-miss. For example, a technical `Account` may be a
customer-facing billing relationship while a non-technical `account` may mean a
person's narrative of an event; the shared spelling is not evidence that the
referents are aliases. A community `member` may be eligible to participate
without being the person currently attending; the relationship and lifecycle
scenario decide whether those labels can be merged.

## Proof bundle returned to Workflow

Return a compact evidence reference containing:

1. the terminology question and accepted scope;
2. entries added or changed, with aliases, conflicts, and relationships;
3. scenarios and sources used to distinguish the meanings;
4. the Adapter, canonical locator, and exact result revision when available;
5. unresolved questions, missing capability, and the exact next check; and
6. a boundary statement that no decision, research, design, or execution was
   completed by this skill.

The proof shows that two competent readers can apply the accepted meaning the
same way, or that the disagreement is visible and owned. It does not claim
that a parent Outcome, Ticket, decision, or effect is complete.
