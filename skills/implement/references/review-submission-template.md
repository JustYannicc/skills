# Review submission template

Use this record after the integrated Result has passed the Ticket's pre-Review
proof. Keep canonical Ticket and Specification detail linked at exact
revisions; repeat only what Review needs to admit and inspect this submission.
In Inline mode, compress the record without dropping required meaning. Omit an
empty conditional section instead of emitting placeholder rows.

# Review submission — [Result label]

- **Submission identity and revision:**
- **Ticket identity and exact revision:**
- **Ticket state:** [Active until accepted by Review | In review]
- **Accepted Specification identity and exact revision:**
- **Ticket-set and governing-standard revisions:**
- **Workflow context and return route:**
- **Work owner:**
- **Executors and bounded child contracts:**
- **Reviewer and required independence:**
- **Approver and approval status:**
- **Execution Claim and release evidence:**

## Result

- **Result identity and exact revision:**
- **Result location or observable state:**
- **Included scope and exclusions:**
- **Baseline or prior Result revision:**
- **Material changes from the baseline:**
- **Proof seam:**
- **Acceptance criteria disposition:**

## Evidence

| Condition or criterion | Method or observation | Result | Observer and time | Location and exact Result revision | Limitation |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Effects and Authority

| Effect | Status [performed | pending | failed | not required] | Authority and exact approval revision | Real-effect evidence or pre-effect proof | Recovery or next gate |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Delegation and integration

| Executor or child identity | Exact input and Result revision | Authority and boundary | Evidence returned | Validation and integration disposition |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

Record configured `workflow.implementation` Supplemental returns in this table
and identify the governing mapping revision.

## Failures, waiting, and limitations

- **Failure and recovery events:**
- **Partial Results or effects:**
- **Unresolved Fog or limitations:**
- **Pending dependency, owner, next check, and resumption action:**

## Submission transition

- **Review route acceptance evidence:**
- **Transition:** [Durable `active → in_review` after atomic acceptance, Inline
  claim-free Review handoff, or unchanged]
- **Transition actor, Authority, rationale, and time:**
- **Current Work-owner Responsibility:** [resolve findings, perform later
  authorized effects, recover, and carry the Ticket through verified
  completion]
- **Outcome-owner Responsibility:** [integrate child evidence and prove parent]
- **Explicit non-claims:** [no Review verdict; Ticket and parent remain open]

If Review cannot accept this exact package, preserve it as ready state and
record an owned Continuation using Workflow's canonical
[Continuation template](../../workflow/references/continuation-template.md). A
local file, message, queue entry, or label is a submission only when the
configured Review route identifies and accepts the same immutable revision.
