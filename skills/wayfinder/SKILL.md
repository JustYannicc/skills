---
name: wayfinder
description: Run Workflow's first planning gate for every Durable or Material Outcome. Chart and repeatedly work the complete decision frontier until the route is collectively specifiable or all remaining fog is governed.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Wayfinder

Navigate persistent Fog of war without pretending that a Plan can predict it away. Wayfinder owns one durable decision Map and operating Strategy; it repeatedly charts, questions, integrates, and recharts until the whole route clears. It does not execute the destination.

Join the active `'Workflow'` context when one exists. The Outcome owner retains parent responsibility. Wayfinder owns only the bounded wayfinding result and returns the next route or governed fog to `'Workflow'` or the caller. When documented plans or design records ground the current frontier, Wayfinder invokes `'Grill With Docs'`; Grill With Docs composes the Grilling interview and Domain Modeling work inside that Wayfinder route.

## Orient and bind the Map

1. **Name the destination.** Bind the active Outcome identity, accepted destination, scope and exclusions, Outcome owner, Wayfinder Work owner, Authority, current proof need, and return route. Distinguish the destination from a proposed Plan for reaching it. When no candidate destination or active context exists, ask the smallest discriminating destination question, preserve the exact resumption condition as explicitly non-durable when no Adapter is available, and return before continuing. Route a candidate destination that still needs a user-held choice under the uncertainty step below. Complete when the destination is stable enough to judge whether each uncertainty points toward it, or the incomplete result has returned with its exact blocker and owner.

2. **Bind durable state.** Read the canonical Outcome, decision, Ticket, Evidence, and Continuation records through the selected Adapter and bind their exact source revisions. Treat the Map as a navigational view over those records, never a second writable store. Use the Adapter's native representation; no Git repository, hosted tracker, remote, or scheduler is required. If no Baseline Adapter is available after this Persistence boundary, preserve the complete proposed Map in visible Degraded mode and return the exact persistence or accepted-handoff condition without claiming durability. Complete when the canonical sources, Adapter capabilities, and source revisions are known, or the persistence gap is explicit.

3. **Load or chart the Map.** Read [Map and Strategy contract](references/map-and-strategy.md) and populate every core field from canonical state. Preserve accepted decisions as named context pointers to their authoritative records, exact revisions, and one-line relevance; preserve full reasoning only at its canonical source. A precise unanswered question becomes a decision, research, prototype, questionnaire, or prerequisite Ticket. A suspected in-scope area that cannot yet be phrased precisely remains fog. Work beyond the destination is out of scope rather than fog. Complete when destination, decisions, Strategy, coverage audit, frontier, blockers, evidence, fog, ownership, and Continuation are visible without duplicating canonical detail.

## Chart breadth before resolving depth

4. **Run two distinct charting passes.** First settle the destination, scope, and Satisficing threshold. Then run a separate breadth-first frontier interview that fans across the whole System rather than following the first interesting branch. When documented plans or design records exist, invoke `'Grill With Docs'` for both passes; it composes Grilling and Domain Modeling and must finish their full multi-round contracts before returning. Otherwise use Grilling with Domain Modeling for user-held decisions. The breadth pass accounts for every Material systems seam: Actors and Authority; terminology; inputs and state; behavior and transitions; interfaces and dependencies; Constraints and operating conditions; incentives and friction; Degraded, Paused, Recovery, and retirement behavior; effects, privacy, and legacy state; proof, burden, sustainment, and change. Mark each seam `settled`, `frontier`, `blocked`, `fog`, or `out of scope` with evidence or a named question. Complete only after both passes and the full coverage audit are recorded; answering the destination question is not completion.

5. **Materialize the whole current frontier.** For every Material uncertainty exposed by the breadth pass, state what answer or observation could change, whether the question is precise, its blockers, responsible Actor, Authority, evidence need, and owning capability. Keep precise questions as owned frontier items even when blocked; keep only questions that cannot yet be phrased as fog. Wire dependencies after all current items exist so the visible frontier is breadth-first rather than a single guessed chain. Complete when every coverage seam and current uncertainty is accepted frontier work, blocked work, governed fog, or out of scope, with none silently ownerless.

## Work the frontier in rounds

6. **Invoke the owning capabilities for the complete unblocked round.** Route present items without manufacturing prerequisites:

   - documented plan or design decisions → `'Grill With Docs'`, which composes Grilling with Domain Modeling through the selected Adapter;
   - unclear or conflicting terminology without that documented-plan need → `'Domain Modeling'`;
   - decisions the user can answer now → `'Grilling'`;
   - missing external facts → `'Research'`;
   - one empirical design question → `'Prototype'`;
   - knowledge held by another person → `'To Questionnaire'`;
   - a prerequisite action needed only to expose a later decision → return a bounded action Ticket to `'Workflow'`.

   Ask every currently unblocked user-held decision in one numbered Grilling round with a recommended answer, then wait for the user's answers. Run independent fact, research, and prototype items concurrently only when ownership, Claims, write boundaries, and return routes are safe. Dependent items wait for the next round. A missing companion enters visible Degraded mode with the frontier item, capability gap, owner, and exact resumption condition. Complete this step only when every item in the current unblocked round has returned revision-bound evidence, a user answer, or a truthful waiting disposition.

7. **Integrate, rechart, and ask the next round.** Integrate every answer or companion return at its canonical source. Append Evidence and transition history; graduate newly precise fog into frontier items; add decisions exposed by the answers; recompute dependencies and blockers; invalidate affected items; and refresh the coverage audit. Guard durable writes with exact source revisions and reread the committed result. Then return to step 6 with the entire newly unblocked frontier. After every user round, perform this full rechart before judging completion. One question, one answer, one round, or one resolved Ticket is always a non-terminal Wayfinder increment. When the interaction or session must end with frontier work remaining, keep Workflow at its Wayfinder gate and write an owned Continuation whose first resumption action is the next full frontier round.

## Apply the collective completion gate

8. **Prove collective coverage.** Update Strategy rules when observations, thresholds, safe modes, feedback, recovery, or decision Authority changed; keep the current Plan as a revisable consequence of that Strategy. Wayfinding can complete only after the breadth-first chart and a separate empty-frontier confirmation round. Whenever the user or a companion supplied an answer, perform a post-answer breadth-first rechart before that confirmation. At the confirmation, prove all of the following at one exact Map revision:

   - destination, scope, threshold, Authority, and Proof seam are accepted;
   - every coverage-audit seam is settled, explicitly out of scope, blocked with an owner and observable unblock condition, or governed as remaining fog;
   - no unblocked decision, research, prototype, questionnaire, or prerequisite action remains;
   - no reducible fog has a currently worthwhile evidence action;
   - every accepted decision is integrated and every invalidated assumption, dependency, or record is updated; and
   - the user confirms the shared understanding after seeing the empty frontier and remaining governed fog.

   A route is **truthfully specifiable** only when a downstream author can state accepted inputs, Material decisions, Constraints, interfaces, Authority, Proof seam, remaining non-blocking uncertainty, and responsible owner without inventing a Material rule. Remaining operating-delay or irreducible fog is **governed** only when it has accepted observation triggers, thresholds, decision rules, safe modes, feedback and Evidence, recovery, ownership, Authority, and review conditions. Complete when every condition passes; otherwise return to step 5 or 6 and keep Wayfinder active.

9. **Return an explicit gate result.** Return `Wayfinder complete` only when step 8 passes at one exact Map revision. Include the Map locator and revision; destination; coverage audit; empty-frontier confirmation; user confirmation source; accepted decisions; Strategy; Evidence; remaining governed fog; ownership and Authority; and exact Workflow return route. Return `Wayfinder incomplete` whenever any condition remains open; include the current frontier and blockers, reducible fog, Continuation, next full round or evidence action, owner, and resumption trigger. Workflow may route `Wayfinder complete` to To Spec. It keeps `Wayfinder incomplete` at the Wayfinder gate. Complete when the receiver can distinguish those states without inference and no parent completion is claimed.

## Boundary

Wayfinder navigates persistent fog through a decision Map and Strategy. It does not own shared terminology, the user-decision interview, external research, experiments, questionnaires, Specification, decomposition, destination execution, Review, handoff acceptance, Adapter setup, or parent completion. Those capabilities retain their own results; Wayfinder integrates only the evidence needed to keep the route truthful.
