---
name: domain-modeling
description: Establish shared terminology when a word, relationship, or boundary is unclear or contested; challenge meanings with concrete scenarios, record the language result through the selected Adapter, and return decisions or other work to Workflow.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Domain Modeling

Use this skill when the words are the problem: a term is vague, overloaded,
used as two different things, or missing a name that people need to coordinate.
It is the active discipline for changing a shared language, not a passive
glossary lookup. Join the active `'Workflow'` context when one exists; do not
start a second Outcome or transfer the parent responsibility.

## Establish the language boundary

1. Identify the smallest terminology question. State the intended referent,
   the context in which it applies, the actors using it, and the decision or
   handoff it is meant to support. Treat a requested artifact, architecture,
   policy, or implementation as outside this skill unless a term boundary is
   the actual blocker. Complete when the terminology question, scope, actors,
   and supporting use are explicit.
2. Read the current canonical language record through the selected Adapter.
   Follow the host's native locator and format; never assume a repository,
   `CONTEXT.md`, an ADR directory, a tracker, or a codebase. If no language
   record exists and the work is durable, create the smallest Adapter-native
   record only after the Adapter's canonical write capability is available.
   When more than one context or language record could apply, identify the
   scope explicitly or ask one discriminating question before writing. Complete
   when the canonical source and its durable metadata are read, or a missing
   capability is visible.
3. Collect candidate meanings from the user's words and the authoritative
   sources, artifacts, observations, and actors that the selected Coordination
   space exposes. Apply the active `'Thinking in Systems'` evidence
   classification when available; terminology work may report a decision gap
   but does not decide it. Complete when candidate sources and evidence labels
   are separated from decisions and unknowns.

## Sharpen and stress-test

4. For each candidate term, propose one operative meaning: what it refers to,
   its scope and boundary, and what it explicitly does not refer to. Preserve a
   stable existing meaning unless an authorized correction changes it. Keep the
   definition short enough for two competent readers to apply it the same way.
   Complete when the candidate meaning and exclusions pass that two-reader test
   or are marked unresolved.
5. Classify nearby labels with the aliases, conflicts, and relationship rules
   in the [entry contract](references/terminology-record.md). Reuse the
   selected Adapter's and Workflow's canonical relationship meanings; do not
   create a second relationship vocabulary. Complete when every nearby label
   is an alias, conflict, or mapped relationship, or is visibly unresolved.

6. Stress-test every proposed meaning with the smallest distinguishing scenario
   first. Start with a substitution or boundary probe; add actor, lifecycle,
   authority, ownership, scope, or source comparisons only while ambiguity or
   material risk remains. For a technical context, compare the language in
   relevant specifications, interfaces, schemas, or observed behavior. For a
   non-technical context, compare policies, routines, conversations, forms, or
   observed practice. Stop when two competent readers converge or the conflict
   is explicit and owned. This is an evidence cross-reference, not a requirement
   to inspect code or change an implementation. Complete when the smallest probe
   resolves the meaning or leaves an owned conflict.
7. If scenarios or sources still disagree, record the visible conflict and ask
   the smallest question that separates the meanings. Do not silently choose a
   convenient interpretation, manufacture consensus, or turn a terminology
   gap into a research, design, or execution task.
   If resolving the words exposes a hard-to-reverse, surprising trade-off,
   flag that an owning Workflow decision record may be warranted; do not create
   or adjudicate that decision here. Complete when the conflict and next
   discriminating question are recorded without a silent decision.

## Record and return

8. Write each resolved change through the selected Adapter immediately only
   with accepted write Authority. Carry the exact revision from the canonical
   read in Step 2 into the Adapter's declared conditional-write mechanism when
   it supports one. If a stale revision is reported or Authority is missing,
   preserve both candidates as a visible conflict/recovery result instead of
   overwriting the language authority. When conditional writes are unavailable,
   use the Adapter's declared baseline transition/history semantics only for a
   new entry; an existing authority without an exact revision or equivalent
   stale-detection mechanism is a capability gap, not permission to overwrite.
   If accepted write Authority is missing while the Adapter is available,
   return the proposed entries and exact next action to `'Workflow'`; do not
   mark the durable terminology result complete. A Durable record must expose
   its immutable identity, owner, canonical locator, transition history, and
   exact mutable-result source/result revisions; if any required metadata is
   unavailable, report the capability gap and do not claim a durable update.
   Do not imply safe concurrent claiming. For several entries in one accepted
   change, use one Adapter batch/transaction when available; otherwise preserve
   each guarded append. The Adapter owns serialization and System Record
   representation; this skill does not choose a host format. Complete when an
   authorized guarded write returns its canonical locator, revisions, history,
   and evidence, or a truthful conflict/capability result is returned.
9. If the selected Adapter is unavailable, report the capability gap and
   proposed entries to `'Workflow'` in its Degraded mode. An Inline interaction
   may return a clearly non-durable terminology result; a Durable result must
   not claim that the canonical language record was updated. Complete when the
   gap and non-durable status are explicit.
10. Return the bounded entry and proof bundle from the reference to `'Workflow'`
    or the caller, including unresolved questions and any capability gap.
    Completion means every relevant term has one operative meaning or a visible
    unresolved conflict, the Adapter write/evidence boundary is truthful, and
    the parent Outcome remains with Workflow.

For the adapter-neutral entry contract and scenario prompts, read
[Terminology record and proof](references/terminology-record.md). The linked
reference defines semantic fields only; it does not prescribe a host format.

## Boundary

This skill owns shared language. It does not own architectural decisions,
research, product or policy choices, specifications, tickets, implementation,
Review verdicts, migration execution, handoffs, or parent completion. When a
term is settled, return its evidence and stop.
