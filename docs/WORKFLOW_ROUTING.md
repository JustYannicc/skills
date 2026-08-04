# Workflow routing contract

**Status:** accepted design
**Decision source:** [Define invocation and automatic workflow routing](https://github.com/JustYannicc/skills/issues/7)

## Purpose

Workflow carries every accepted request through the smallest route that can
truthfully produce and verify its Outcome. Thinking in Systems governs every
judgment; Workflow owns routing and parent Outcome responsibility; each invoked
skill owns one bounded result.

Proportionality compresses representation and ceremony. It never disables the
method, responsibility, authority checks, Review, or verified completion.

## Standing entry

Setup manages a short standing instruction at the selected Installation scope
for every selected harness:

1. Load `thinking-in-systems` for every request.
2. Then load `workflow` and follow its canonical route.

A project installation manages the harness's effective project instruction
file; a global installation manages its effective global file. Depending on the
harness, this may be `AGENTS.md`, `CLAUDE.md`, or another verified native
surface. Setup maps precedence, edits the narrowest active source, previews each
target, and never mutates another scope implicitly. Skill-description matching
supports discovery but is not the activation guarantee.

Runtime phase skills are model-invoked. `ask-yannic` and
`setup-system-thinking` are user-invoked. Ask Yannic reads and explains this
contract without executing it or maintaining a second route.

## Route

Workflow is a feedback path, not a rigid linear pipeline:

1. Interpret the request through Thinking in Systems and establish the intended
   Outcome, authority, constraints, proof seam, and current responsibility.
2. Join a matching open Outcome or distinguish explicitly between resuming,
   replacing, and creating related work.
3. Choose Inline or Durable representation.
4. If Durable work enters an existing scope without a current verified system
   map, invoke proportionate current-state migration.
5. Remove only the uncertainty that prevents a truthful Specification.
6. Establish the accepted Specification, durably when its threshold is crossed.
7. Decompose into durable Tickets only when coordination requires it.
8. Execute each accepted Ticket through `implement` or another applicable
   executor and collect effect evidence.
9. Review the exact result revision at the accepted proof seam.
10. Integrate child evidence, verify the real effect and parent Outcome, then
    update current-state records, affected legacy state, and follow-up work.
11. End only in verified completion, accepted transfer, or authoritative
    cancellation. Waiting and submission remain non-terminal.

New evidence may return work to discovery, Specification, decomposition, or
execution. A direct request for a later phase enters at that phase only after
Workflow verifies its minimum prerequisites.

## Proportional representation

### Inline mode

Use Inline mode for bounded synchronous work before a Persistence boundary.
The conversation carries the Outcome, accepted request as Specification,
single implicit Ticket, transition context, evidence, and immediate Review.
A typo correction may pass through the entire method in seconds without
creating files or tracker records.

### Durable mode

Crossing a session, actor, waiting period, approval boundary, assignment,
multi-phase boundary, or meaningful-risk boundary requires Durable mode. The
selected Adapter stores canonical records in the Coordination space. Git and a
hosted tracker are optional; Local Markdown is the portable baseline.

Every Outcome has a semantic Specification. `to-spec` materializes a durable
Specification only in Durable mode or on explicit request. Every executable
unit is semantically a Ticket. `to-tickets` materializes Tickets when work has
multiple independently finishable units, delegation, dependencies,
concurrency, cross-session execution, or another persistence requirement.

## Adoption of existing scopes

An existing project, organization, routine, workspace, or other operating scope
without a current verified map enters `migrate-system` automatically when
Durable work materially depends on that scope.

Migration is not a separate process architecture. It is one bounded
current-state mapping capability executed through this Workflow and the
universal work contract. It uses the same Outcome, Specification, Tickets,
responsibility, Review, evidence, and completion rules. Independent mapping may
run concurrently or through delegated workers; the migration owner integrates
and verifies their results. Persistent fog invokes Wayfinder. Changes to the
represented system enter ordinary Workflow instead of being smuggled into the
mapping task.

Mapping begins with the materially affected scope. Broader independent mapping
may continue concurrently when its gaps cannot affect current correctness,
authority, or responsibility. Trivial work does not wait for an unrelated
exhaustive inventory.

## Discovery routing

Workflow selects discovery by the uncertainty it must remove:

| Uncertainty | Capability | Result returned to Workflow |
| --- | --- | --- |
| Unclear or conflicting terminology | `domain-modeling` | Operative meanings and visible conflicts |
| Decisions the user currently holds | `batch-grill-me` | Accepted decisions and remaining frontier |
| Persistent, multi-session, or irreducible fog | `wayfinder` | Durable decision map and operating strategy |
| Missing external facts | `research` | Cited findings and uncertainty |
| One empirical design question | `prototype` | Reversible experiment verdict and evidence |
| Knowledge held by another person | `to-questionnaire` | Complete asynchronous questionnaire and return use |

Wayfinder begins with Domain Modeling and Batch Grilling, then invokes other
discovery capabilities as needed. Independent discovery may run concurrently;
dependent questions remain sequential. Workflow integrates every result and
retains responsibility for its quality and use.

## Active context and delegation

An active Workflow context carries the parent Outcome identity, current phase,
responsibility, authority, selected Adapter, result revision, and return route.
An invoked phase skill or migration worker joins that context rather than
starting a recursive parent Workflow. It owns its bounded child result and
returns evidence to the coordinator. Delegation never completes the parent.

A related request updates or extends the active Outcome. Before switching to
unrelated work, Workflow preserves enough continuation state to resume the
current Outcome without reconstruction.

## Authority and effects

The accepted request defines effect authority. A clear request to perform an
effect may authorize Workflow to perform and verify it without a redundant
confirmation. A request for a draft, ambiguous authority, a changed result
revision, or a consequential effect outside already granted authority creates
an approval gate.

Approval attaches to an exact Result revision. Material changes invalidate the
prior approval. Preparation, submission, scheduling, delegation, and approval
are not proof that the intended effect occurred.

## Review and terminal responsibility

Universal Review runs at the accepted proof seam for every result: a reply,
decision, plan, document, physical action, organizational change, code change,
or other execution. Its depth, evidence, and independence scale with risk.
Low-risk Inline work may receive immediate Review in the same interaction;
material risk may require independent, deterministic, human, or Supplemental
evidence.

After the phase verdict, Workflow verifies the actual effect, integrates child
evidence, and evaluates the parent Outcome's own terminal condition. If the
result changes the represented system, completion also requires updating the
current-state record, identifying affected legacy state, and recording required
follow-up work or informed exceptions.

## Waiting, resumption, and handoff

Waiting work remains owned. Workflow observes short dependencies directly.
Longer waits receive durable continuation and a scheduled resumption or monitor
when the host supports it. On resumption, Workflow verifies the dependency and
continues from the recorded action.

If automatic resumption is unavailable, Workflow must create an accepted
handoff that names the responsible actor and exact next check. Recording a
reminder without acceptance does not transfer responsibility, and waiting never
justifies a completion claim.

## Extension points and degraded operation

Supplemental skills run only at configured Extension points. The core phase
supplies their inputs, integrates their evidence, and retains its completion
criterion. Advisory failure is recorded and may allow continuation; required
failure routes to waiting or recovery. Overlapping Supplemental skills require
an explicit configured selection.

If a companion skill or host capability is missing, Workflow enters visible
Degraded mode. It may use a safe equivalent only when the same contract remains
satisfiable. Otherwise it records the gap and routes to waiting, installation,
or an accepted handoff. It never claims that an unavailable capability ran.

## Informed exceptions

The user may explicitly skip or compress an artifact or phase when its
prerequisites are already satisfied or the skipped protection, plausible
consequence, affected scope, and recovery trigger are understood. Thinking in
Systems, responsibility, authority, Review, and truthful completion remain
active proportionately; they cannot be switched off.

## Canonical ownership

This document owns routing semantics. `workflow` carries the executable version
through a precise reference to it. Setup's managed instruction and Ask Yannic
point here instead of duplicating the route. The adapter-neutral state and
responsibility meanings remain owned by the
[Universal work and coordination contract](UNIVERSAL_WORK_CONTRACT.md).
