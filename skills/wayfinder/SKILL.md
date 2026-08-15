---
name: wayfinder
description: Use when the route to a goal depends on unresolved decisions whose answers may expose or invalidate later work.
license: MIT
disable-model-invocation: false
metadata:
  homepage: https://github.com/JustYannicc/skills
---

A loose idea has arrived — too big for one agent session, and wrapped in fog: the way from here to the **goal** isn't visible yet. Wayfinding is about finding that way, not charging at the goal. This skill charts the way as a **shared map** in the effort's work tracker, then works its **decision tickets** — questions whose resolution is a decision, not slices of a build to execute — one at a time until the route is clear.

The goal varies per effort, and naming it is the first act of charting — it shapes every ticket. It might be a spec to hand off and iterate on, a decision to lock before planning starts, or a change made in place like a data-structure migration. The map is domain-agnostic — engineering work, course content, whatever fits the shape.

## Plan, don't do

Wayfinder is **planning** by default: each ticket resolves a decision, and the map is done when the way is clear — nothing left to decide before someone goes and does the thing. The pull to just do the work is usually the signal you've reached the edge of the map and it's time to hand off. An effort can override this in its **Notes** — carrying execution into the map itself — but absent that, produce decisions, not deliverables.

## Refer by name

Every map and ticket is a durable record, so it has a **name** — its title. In everything the human reads — narration, the map's Decisions-so-far — refer to it by that name, never by a bare id, number, or slug. A wall of `#42, #43, #44` is illegible; names read at a glance. The id and URL don't vanish — a name wraps its link — but they ride _inside_ the name, never stand in for it.

## The Map

The map is a single record in the effort's work tracker, tagged `wayfinder:map` — the canonical artifact. Its tickets are child records of the map.

The map is an **index**, not a store. It lists the decisions made and points at the tickets that hold their detail; a decision lives in exactly one place — its ticket — so the map never restates it, only gists it and links.

Before working from the map, verify that its state still reflects the records it links. Rechart anything made stale by a changed record.

**Where the map, its child tickets, blocking, and frontier queries physically live is tracker-specific.** Use the effort's existing work tracker and its native operations. If no tracker is available, default to local Markdown.

### The map body

The whole map at low resolution, loaded once per session. Open tickets are **not** listed — they are open child records, found by query.

```markdown
## Map state

<current map revision and the source revisions it reflects>

## Goal

<what reaching the end of this map looks like — the spec, decision, or change this effort is finding its way to. One or two lines; every session orients to it before choosing a ticket.>

## Notes

<standing context, constraints, and authority every session needs>

## Decisions so far

<!-- the index — one line per closed ticket: enough to judge relevance, then zoom the link for the detail the ticket holds -->

- [<closed ticket title>](link) — <one-line gist of the answer>

## Not yet specified

<!-- see "Fog of war": in-scope fog you can't ticket yet; graduates as the frontier advances -->

## Governed uncertainty

<!-- uncertainty that may remain, with its responsible actor and trigger for reconsideration -->

## Out of scope

<!-- see "Out of scope": work ruled beyond the goal; closed, never graduates -->

## Continuation

<!-- when work is interrupted: the responsible actor and exact next action -->
```

### Tickets

Each ticket is a **child record** of the map; the tracker's record id is its identity. Its body is the question, sized to one 100K token agent session:

```markdown
## Question

<the decision or investigation this ticket resolves>
```

Each ticket carries a `wayfinder:<type>` tag — one of `research`, `prototype`, `grilling`, `task` (see [Ticket Types](#ticket-types)).

A session **claims** a ticket before any work by assigning responsibility for resolving it to an actor. That responsible actor _is_ the claim: an open ticket without one is unclaimed.

Blocking uses the tracker's **native** dependency relationship so the frontier remains visible without opening the map. Only a tracker that lacks native blocking falls back to a body convention. A ticket is **unblocked** when every ticket blocking it is closed; the **frontier** is the open, unblocked, unclaimed children — the edge of the known.

The answer isn't part of the body — it's recorded on resolution (see [Work through the map](#work-through-the-map)). Assets created while resolving a ticket are linked from the ticket, not pasted in.

## Ticket Types

Every ticket is either **HITL** — human in the loop, worked _with_ a human who speaks for themselves — or **AFK**, driven by the agent alone. A HITL ticket only resolves through that live exchange; the agent never stands in for the human's side of it (a grilling agent that answers its own questions has broken this).

- **Research** (AFK): Reading documentation, third-party APIs, or local resources like knowledge bases to surface a fact a decision waits on. Resolved by a `research` **subagent**. Use when knowledge outside the current working directory is required.
- **Prototype** (HITL or AFK): Answer one question through a reversible experiment using the `prototype` skill. Use HITL when an actor's behavior or experience is part of the evidence; otherwise it may run AFK. Resolve with the verdict and evidence; link any artifact as an asset.
- **Grilling** (HITL): Conversation. The default case. Always invoke the `grilling` and `domain-modeling` skills.
- **Task** (HITL or AFK): Manual work that must happen before a _decision_ can be made — nothing to decide, prototype, or research, but the discussion is blocked until it's done. Signing up for a service so its API can be judged, provisioning access, moving data so its shape can be seen. This is the one type that _does_ rather than decides — and it earns its place by unblocking a decision, not by delivering the goal. The agent drives it alone where it can (AFK); otherwise it hands the human a precise checklist (HITL). Resolved when the work is done; the answer records what was done and any resulting facts (credentials location, new URLs, row counts) later tickets depend on.

Apply `thinking-in-systems` while naming the goal and mapping the frontier. Let the other focused systems skills load when their descriptions match a ticket. Keep their guidance in its owning skill; the map records the resulting decision.

## Fog of war

The map is _deliberately_ incomplete: don't chart what you can't yet see. Beyond the live tickets lies the **fog of war** — the dim view of decisions and investigations you can tell are coming but can't yet pin down, because they hang on questions still open. Resolving a ticket clears the fog ahead of it, graduating whatever's now specifiable into fresh tickets — one at a time, until the way to the goal is clear and no tickets remain.

The map's **Not yet specified** section is where that dim view is written down: the suspected question, the area to revisit later. It's the undiscovered frontier _toward_ the goal — everything here is in scope, just not sharp enough to ticket. Write as loosely or as fully as the view allows; it doubles as a signpost for collaborators reading where the effort is headed.

**Fog or ticket?** The test is whether you can state the question precisely now — _not_ whether you can answer it now.

- **Ticket when** the question is already sharp — even if it's blocked and you can't act on it yet.
- **Not yet specified when** you can't yet phrase it that sharply. Don't pre-slice the fog into ticket-sized pieces: it's coarser than a ticket, and one patch may graduate into several tickets, or none, once the frontier reaches it.

Apply `choosing-interventions` when the value of further investigation is uncertain. Uncertainty may move to **Governed uncertainty** only with a responsible actor and a trigger that returns it to the frontier.

**Not yet specified** excludes what's already decided, already a live ticket, governed, or out of scope.

## Out of scope

Fog only ever gathers _toward_ the goal. The goal fixes the scope, so work beyond it is **out of scope** — it isn't fog, and it doesn't belong in **Not yet specified**. It gets its own **Out of scope** section on the map: work you've consciously ruled out of _this_ effort. Scope, not sharpness, lands it here.

Out-of-scope work never graduates — the frontier stops at the goal — so it returns only if the goal is redrawn, and then as a fresh effort, not a resumption.

Ruling something out of scope is a scoping act, not a step on the route. When a ticket that already exists turns out to sit past the goal — mis-scoped in while charting, or exposed by a resolution — **close it** (a closed ticket is unambiguously off the frontier) and leave one line in the **Out of scope** section: the gist plus why it's out of scope, linking the closed ticket. It stays out of **Decisions so far**, which records the route actually walked — a scope boundary isn't a step on it.

## Invocation

Two modes. Either way, **never resolve more than one ticket per session** — with the exception of research tickets.

### Chart the map

Begin with a loose idea.

1. **Name the goal.** Establish what this map is finding its way to with the actor who has authority to define it. The goal fixes the scope, so it is settled first.
2. **Map the frontier.** Work **breadth-first** across the whole space rather than deep on any one thread, surfacing the open decisions and the first steps takeable now. **If this surfaces no fog** — the way to the goal is already clear, the whole journey small enough for one session — you don't need a map. Stop and ask the user how they'd like to proceed.
3. **Create the map** (tag `wayfinder:map`): Goal and Notes filled in, Decisions-so-far empty, the fog sketched into **Not yet specified**.
4. **Create the tickets you can specify now** as child records of the map — then wire blocking edges in a **second pass** (records need ids before they can reference each other). Wiring sorts them into the frontier and the blocked; everything you can't yet specify stays in the fog — the **Not yet specified** section.
5. **Fire the research subagents.** For each `research` ticket you just created, spin up a `research` subagent to resolve it in parallel and link its durable findings from the ticket.
6. Stop — charting is one session's work; it hand-resolves nothing.

### Work through the map

Begin with a map reference. A ticket is **optional** — without one, choose the next decision from the frontier.

1. Load the **map** — the low-res view, not every ticket body. Verify its state and rechart before proceeding when it is stale.
2. Choose the ticket. If the user named one, use it. Otherwise take the first frontier ticket in order. **Claim it** before any work by recording yourself as its responsible actor.
3. Resolve it — **zoom as needed**: fetch the full body of any related or closed ticket on demand and apply each skill whose description matches the decision.
4. Record the answer as the ticket's **resolution**, **close** the ticket, and **append a context pointer** to the map's Decisions-so-far.
5. Rechart the whole map breadth-first. Add newly-surfaced tickets (create-then-wire); graduate any fog the answer has made specifiable, clearing each graduated patch from **Not yet specified** so it lives only as its new ticket. If the answer reveals a ticket — this one or another — sits beyond the goal, **rule it out of scope** rather than resolving it on the route. Mark invalidated tickets superseded, preserve their history, and update anything that depended on them.
6. Before a session ends with the map unfinished, write the exact next action and responsible actor under **Continuation**.
7. When the frontier and **Not yet specified** appear empty, run a separate breadth-first confirmation pass. The map clears only when that pass exposes no new ticket or reducible fog. Governed uncertainty does not block completion while its responsible actor and trigger remain current.

The user may run unblocked tickets in parallel, so expect other sessions to be editing the tracker concurrently.
