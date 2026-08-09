# Handoff dispositions

Read only the branch selected after classifying the boundary. These dispositions
describe Handoff state, not the linked Outcome or Ticket lifecycle.

## Continuity

| Disposition | Evidence and Responsibility |
| --- | --- |
| `Prepared` | Exact continuation is preserved for the same owner; pickup has not been verified. |
| `Resumed` | The same owner reread the current canonical work, passed the freshness check, and recorded pickup evidence. |
| `Waiting` | A real Continuation record or manual trigger preserves the next check and exact resumption action; the same owner remains responsible. |
| `Stale` | Current canonical state differs materially from the prepared revision; refresh before resumption. |
| `Degraded` | A missing persistence or resumption capability is named with the portable package, current owner, manual trigger, and next action. |

Continuity never creates a Responsibility transition merely because the session,
tool, location, or operating context changed.

## Transfer

| Disposition | Evidence and Responsibility |
| --- | --- |
| `Draft` | Exact transfer package exists but has not been delivered. The outgoing owner remains responsible. |
| `Offered` | Delivery to the identified successor is verified. The outgoing owner remains responsible. |
| `Accepted` | The identified successor explicitly accepted the exact fresh revision, bounded Responsibility, available Authority, uncertainty, dependencies, Continuation, and first action. Record the append-only Responsibility transition. |
| `Rejected` | The successor rejected the exact offer. Preserve the response, current owner, reason or gap, and recovery action. |
| `Stale` | A material canonical change invalidated the offered revision or response. Preserve the response as evidence, refresh the package, and request acceptance of the successor revision. |
| `Withdrawn` | An authorized Actor withdrew an unaccepted offer. Preserve the rationale and current owner. |
| `Degraded` | Recipient identity, response route, persistence, communication, or another required capability is missing. Preserve the proposed package and exact unblock action. |

Transfer requires a response from the identified successor or its authorized
mechanism that binds the exact Handoff revision. Delivery, silence, prior
assignment, capability, a claim, conditional acceptance that changes the
contract, or an acceptance of a stale revision leaves the outgoing owner
responsible. Acceptance creates no Authority.

An accepted Transfer changes only the exact accepted Responsibility. Record an
Outcome ownership transition only when the parent Outcome itself is the accepted
scope. Every Transfer disposition leaves the parent Outcome open.

## Dispatch

| Disposition | Evidence and Responsibility |
| --- | --- |
| `Prepared` | Exact service or executor input is ready but not delivered. The current owner remains responsible. |
| `Delivered` | The service or executor received the exact input. This proves delivery only. |
| `Acknowledged` | The service or executor accepted its contracted duty and returned a verified receipt. The current owner still owns integration and the parent proof seam. |
| `Waiting` | A service result or external event remains outstanding under a complete Continuation record. |
| `Stale` | The source, approval, input, or service contract changed materially; refresh before dispatch or reliance. |
| `Degraded` | Delivery, receipt, persistence, or resumption capability is missing and the current owner and fallback are explicit. |

Dispatch becomes Transfer only when the governing contract identifies the
service as a responsible Actor able to accept the exact transferred scope. A
queue acknowledgment, receipt, or schedule never proves the parent effect or
Outcome.

## Recovery extension

For every `Rejected`, `Stale`, `Waiting`, or `Degraded` disposition, record:

- state and canonical revisions preserved;
- safe allowed work and blocked effects;
- current responsible owner;
- rejection, change, external dependency, or capability gap;
- observable unblock condition;
- retry, revision, escalation, replacement, expiry, or recovery rule; and
- exact next action and responsible Actor.

Recovery never silently transfers Responsibility, returns stale work to a
frontier, or completes or cancels the parent Outcome.

