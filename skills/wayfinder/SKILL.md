---
name: wayfinder
description: Use for persistent or across-interaction Fog of war, irreducible uncertainty that needs operating rules, or persistent fog returned by another skill.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Wayfinder

Navigate persistent Fog of war without pretending that a Plan can predict it away. Wayfinder owns one durable decision Map and operating Strategy; it does not execute the destination.

Join the active `'Workflow'` context when one exists. The Outcome owner retains parent responsibility. Wayfinder owns only the bounded wayfinding result and returns the next route or governed fog to `'Workflow'` or the caller.

## Orient and bind the Map

1. **Name the destination.** Bind the active Outcome identity, accepted destination, scope and exclusions, Outcome owner, Wayfinder Work owner, Authority, current proof need, and return route. Distinguish the destination from a proposed Plan for reaching it. When no candidate destination or active context exists, ask the smallest discriminating destination question, preserve the exact resumption condition as explicitly non-durable when no Adapter is available, and return before continuing. Route a candidate destination that still needs a user-held choice under the uncertainty step below. Complete when the destination is stable enough to judge whether each uncertainty points toward it, or the incomplete result has returned with its exact blocker and owner.

2. **Bind durable state.** Read the canonical Outcome, decision, Ticket, Evidence, and Continuation records through the selected Adapter and bind their exact source revisions. Treat the Map as a navigational view over those records, never a second writable store. Use the Adapter's native representation; no Git repository, hosted tracker, remote, or scheduler is required. If no Baseline Adapter is available after this Persistence boundary, preserve the complete proposed Map in visible Degraded mode and return the exact persistence or accepted-handoff condition without claiming durability. Complete when the canonical sources, Adapter capabilities, and source revisions are known, or the persistence gap is explicit.

3. **Load or chart the Map.** Read [Map and Strategy contract](references/map-and-strategy.md) and populate every core field from canonical state. Preserve accepted decisions as named context pointers to their authoritative records, exact revisions, and one-line relevance; preserve full reasoning only at its canonical source. A precise unanswered question becomes a decision, research, prototype, questionnaire, or prerequisite Ticket. A suspected in-scope area that cannot yet be phrased precisely remains fog. Work beyond the destination is out of scope rather than fog. Complete when destination, decisions, Strategy, frontier, blockers, evidence, fog, ownership, and Continuation are visible without duplicating canonical detail.

## Route only present uncertainty

4. **Classify the current frontier.** For every materially relevant uncertainty, identify what answer or observation could change, whether it is currently precise, its blockers, responsible Actor, Authority, evidence need, and the capability that owns it. Keep dependent items waiting. Independent items may proceed concurrently only when their Work owners and the selected Adapter's Coordination guarantees prevent duplicate execution. Complete when every current item is accepted frontier work, blocked work, governed fog, or out of scope, with none silently ownerless.

5. **Invoke the owning capability only when its uncertainty is present.** Use this routing order without manufacturing prerequisites:

   - documented plan or design decisions → `'Grill With Docs'`, which composes Grilling with Domain Modeling through the selected Adapter;
   - unclear or conflicting terminology without that documented-plan need → `'Domain Modeling'`;
   - decisions the user can answer now → `'Grilling'`;
   - missing external facts → `'Research'`;
   - one empirical design question → `'Prototype'`;
   - knowledge held by another person → `'To Questionnaire'`;
   - a prerequisite action needed only to expose a later decision → return a bounded action Ticket to `'Workflow'`.

   A missing companion enters visible Degraded mode. Use a safe equivalent only when it satisfies the same result contract; otherwise preserve the frontier item, capability gap, owner, and exact resumption condition. Never imply that an unavailable capability ran. Complete when the selected capability has returned revision-bound evidence, or its unavailable result and continuation are truthfully recorded.

6. **Advance one decision seam.** Select the smallest unblocked frontier question whose answer can materially sharpen the route. When an accepted Ticket represents that question on the Work frontier, acquire and record its Claim through the selected Adapter before activating work. Without verified Coordination, disable parallel execution and use the Adapter's serialized claim operation; one explicit Work owner remains distinct from that Claim. If the Adapter cannot record a truthful Claim, preserve a capability gap rather than starting the work. Resolve only that bounded seam, then return its result to the Map; separately owned independent investigations may run in parallel only when verified Coordination protects their Claims and they return evidence for integration. Wayfinder does not perform destination execution, create a downstream Specification, or infer parent completion. Complete when the seam has one accepted decision, evidence result, governed unknown, or visible waiting disposition.

## Integrate and choose the next route

7. **Update the Strategy and frontier.** Integrate the new decision or evidence at its canonical source, append its Evidence reference and transition, graduate newly precise fog into owned frontier items, remove invalidated items, and recompute blockers. Update Strategy rules when observations, thresholds, safe modes, feedback, recovery, or decision Authority changed; keep the current Plan as a revisable consequence of that Strategy. Guard every durable write with the exact source revision or the Adapter's equivalent stale-write protection, then reread the committed result. On conflict or partial write, preserve committed and uncommitted state separately and return the exact recovery action. Complete when one exact result revision renders a coherent Map or the incomplete aggregate change is visible.

8. **Apply the completion gate.** Wayfinding is complete only when one of these is true:

   - **Truthfully specifiable:** the next route can state its accepted inputs, Material decisions, Constraints, Authority, Proof seam, remaining non-blocking uncertainty, and responsible owner without inventing a Material rule; or
   - **Governed remaining fog:** operating-delay or irreducible uncertainty has accepted observation triggers, thresholds, decision rules, safe Degraded or Paused behavior, feedback and Evidence, recovery, ownership, Authority, and review conditions sufficient for the System to operate truthfully. Operating-delay fog also names its observation horizon, permitted operating route during that horizon, and the trigger that returns it to the decision frontier.

   Creating a Map, invoking a companion, scheduling a check, listing fog, or resolving every current frontier item is not completion by itself. If neither gate passes, write or update the Continuation record with the dependency, unblock condition, last observation, next check, retry or escalation rule, exact resumption action, context, owner, and scheduled action only when a real scheduler accepted it. Complete when the gate result and continuation claim are independently inspectable.

9. **Return the wayfinding result.** Return the Map locator and exact revision; destination; accepted decisions; Strategy; current frontier and blockers; Evidence references; reducible and irreducible fog; ownership and Authority; Continuation; completion-gate result; and exact next route. Return a truthfully specifiable route to `'Workflow'` for Specification or the applicable next phase. Return governed fog as an accepted operating rule, not as false certainty. Complete when the receiver can continue without reconstructing context and no parent completion is claimed.

## Boundary

Wayfinder navigates persistent fog through a decision Map and Strategy. It does not own shared terminology, the user-decision interview, external research, experiments, questionnaires, Specification, decomposition, destination execution, Review, handoff acceptance, Adapter setup, or parent completion. Those capabilities retain their own results; Wayfinder integrates only the evidence needed to keep the route truthful.
