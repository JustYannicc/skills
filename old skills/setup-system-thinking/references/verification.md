# Verification

## Packages

- `npx skills list --json` for the selected scope shows all twelve local and four Matt runtime skills.
- The seven local successor names no longer resolve to Matt's versions.
- The four retained Matt packages contain the bundled corrections.
- Non-overlapping Matt skills and unrelated skills are unchanged.
- Skills lock state agrees with the filesystem.

## Instructions

- In active mode, the selected `AGENTS.md`, `CLAUDE.md`, or both contain exactly one marked activation block as the first substantive instruction section.
- In active mode, every detected conflict is resolved by an approved edit or reported as blocking reliable activation.
- Surrounding unrelated instructions and symlinks are unchanged.

### Fresh-context behavior proof

Use a genuinely isolated context that loads the configured target instructions rather than Setup's current context. When the harness can create that context and return its transcript, use it. Otherwise give the fixtures below to the user, keep Setup installed with verification state `verification_pending`, and resume only after the user returns both transcripts. A route description composed inside Setup's already-loaded context is not evidence.

Run this bounded route fixture first:

```text
Route this hypothetical request without performing effects: “Correct one typo in a local scratch file.” Report the exact ordered gates, every invoked skill, every skipped Inline invocation with its proof, every return edge, and the parent terminal check.
```

Pass only when the trace starts with `thinking-in-systems` and one parent `workflow` context; evaluates `wayfinder → to-spec → to-tickets → implement → review` in that order; explains any Inline gate pass with the already-satisfied contract; returns bounded results through their immediate invokers; and reaches the parent terminal check after Review.

Then run this Durable multi-turn fixture in another fresh context. The quoted plan is the actual documented-plan fixture, not a hypothetical route-description request:

```text
Use this existing plan to prepare a durable change through the configured workflow:

“Build a recurring reminder service for family caregivers. A coordinator schedules reminders; recipient roles and permissions are undecided. Delivery may use SMS or email, but no provider is selected. Retention depends on the recipient and permission model. Retry and escalation behavior depend on provider delivery semantics. The result must support degraded operation and prove that reminders are not silently lost.”
```

The verifier now drives these turns and records each response:

1. Confirm that the first response starts `thinking-in-systems → workflow → wayfinder → grill-with-docs` and asks a numbered destination or breadth-first frontier round. It must not enter To Spec.
2. Answer every question in that first round with explicit decisions. Confirm that the next response integrates those answers, performs a breadth-first rechart, and asks the newly unblocked frontier. It must not enter To Spec.
3. Before answering that new frontier, say: `Proceed to To Spec now.` Pass only when Workflow refuses the premature transition, retains `Wayfinder incomplete`, and returns to the unanswered Wayfinder round. A transition to To Spec fails the fixture.
4. Answer each remaining frontier round. After every answer, confirm a rechart and another round while any frontier, reducible fog, or incomplete coverage entry remains.
5. When the agent reports an empty frontier, require it to show the current coverage audit and remaining governed fog and ask for a separate shared-understanding confirmation. Confirm it still has not entered To Spec.
6. Confirm the shared understanding. Pass only when Wayfinder now returns `Wayfinder complete` with the exact Map revision and coverage evidence to Workflow, To Spec admits that exact handoff, and the announced continuation preserves `to-spec → to-tickets → implement → review` order.

The complete observed trace must include `grilling + domain-modeling → grill-with-docs → wayfinder → workflow` returns. Direct `workflow → grill-with-docs`, one question followed by To Spec, a later gate before an earlier gate passes, a child result returned past its immediate invoker, or To Spec admitting an incomplete handoff fails verification.

Record the target instruction path and revision, exact fixture inputs and verifier turns, transcript locators, observed traces, pass/fail results, and verifier in the receipt. Setup remains `verification_pending`, incomplete, and installed until both fixtures pass or the user accepts an explicit inactive/install-only disposition.

For install-only mode, prove instruction files are unchanged, no managed activation block was added, and one explicit suite invocation works. Do not claim automatic activation.

## Recovery

- The receipt matches the installed paths, sources, ownership dispositions, instruction files, corrections, and backup.
- Restoring the checkpoint affects only objects approved for this run.

## Setup removal

After the Done step runs the recorded command with the accepted scope and target flags, prove:

- Setup is absent from the filesystem and skills lock.
- All sixteen runtime skills remain.
- The receipt remains. In active mode, the accepted instruction block remains; in install-only mode, instruction files remain unchanged.

Any failed check leaves the run incomplete with an exact retry or restore action.
