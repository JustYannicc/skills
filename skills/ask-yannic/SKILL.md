---
name: ask-yannic
description: Explain the smallest applicable Workflow route and its trade-offs without executing it.
disable-model-invocation: true
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Ask Yannic

Give one source-derived route recommendation. This skill is guidance only: the user decides whether to invoke the route, and no recommended skill, tool, write, message, schedule, installation, or other effect runs during this invocation.

## Bind the routing authority

Read the current [canonical Workflow routing source](../../docs/WORKFLOW_ROUTING.md) completely from the same pinned suite revision as the active `'Workflow'` skill. Use the installation manifest, source checkout, or exact-revision public locator to establish the source locator and freshness. Treat summaries, prior answers, copied route lists, skill descriptions, and memory as non-authoritative candidates.

If the canonical source is unavailable, its revision cannot be matched to the active Workflow revision, or available copies conflict, stop route selection. Report the missing or stale source, the evidence needed to establish the current revision, and the exact source-access or update condition that would resume guidance. A remembered route is not a safe equivalent.

Complete this step only when one exact current routing source governs the recommendation or the source gap is visible and no recommendation is claimed.

## Recommend the smallest applicable route

1. Preserve the user's request and identify the Outcome, material Constraints, requested phase, blocking uncertainty, Persistence boundaries, and available skills or host capabilities that can change the route. Do not begin the work itself.
2. Apply the canonical source to this request. Compare only the materially plausible routes it supplies, then recommend the smallest route that can satisfy the stated Outcome and proof obligation.
3. When a missing fact changes the route, present the fewest materially distinct branches and ask the smallest discriminating question. Do not hide the uncertainty behind a confident recommendation.
4. Explain the trade-off: why a lighter route cannot satisfy the contract, what cost or ceremony a heavier route adds, and what evidence would justify changing the recommendation.
5. Check every capability the recommendation requires. Mark each as available, missing, or unverified, and explain the canonical source's consequence and resumption condition for a gap. Do not pretend a companion capability is installed or runnable.

Return a compact guide with:

- **Recommendation:** the route to invoke next, or the question/source/capability gap blocking a truthful recommendation.
- **Why:** the request facts and exact canonical-source sections that determine it.
- **Trade-off:** the nearest lighter and heavier alternatives that materially matter.
- **Capabilities:** required availability, verified status, and consequence of each gap.
- **Next choice:** the invocation or answer the user may supply next.
- **Boundary:** state that guidance is complete and nothing in the route has executed.

## Keep version one at its public boundary

Explain the public Workflow contract only. Requests to predict Yannic's personal decision, represent undocumented preferences, or answer on his behalf require the separately governed coworker-facing capability and are outside this version. Expose that missing capability without inventing its judgment, sources, Authority, privacy rules, or correction policy.

Complete this skill when the user has an actionable source-derived recommendation and trade-off, or an exact condition for obtaining one, while all execution and parent Outcome responsibility remain outside this invocation.
