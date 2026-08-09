# Handoff dispositions

Read the kind branch selected after classifying the boundary. For `Rejected`,
`Stale`, `Waiting`, or `Degraded`, also read the Recovery extension. These
dispositions describe Handoff state, not the linked Outcome or Ticket lifecycle.

## Continuity

| Disposition | Evidence and Responsibility |
| --- | --- |
| `Prepared` | Exact continuation is preserved for the same owner; pickup has not been verified. |
| `Resumed` | The same owner reread the current canonical work, passed the freshness check, and recorded pickup evidence. |
| `Waiting` | A real Continuation record or manual trigger preserves the next check and exact resumption action; the same owner remains responsible. |
| `Stale` | Current canonical state differs materially from the prepared revision; refresh before resumption. |
| `Degraded` | A missing persistence or resumption capability is named with the portable package, current owner, manual trigger, and next action. |

Continuity retains Responsibility with the same owner across session, tool,
location, and operating-context changes.

## Transfer

| Disposition | Evidence and Responsibility |
| --- | --- |
| `Draft` | Exact transfer package exists but has not been delivered. The outgoing owner remains responsible. |
| `Offered` | Delivery to the identified successor is verified. The outgoing owner remains responsible. |
| `Accepted` | The Step 5 exact-acceptance and freshness gate passed. Record its append-only Responsibility transition evidence. |
| `Rejected` | The successor rejected the exact offer. Preserve the response, current owner, reason or gap, and recovery action. |
| `Stale` | A material canonical change invalidated the offered revision or response. Preserve the response as evidence, refresh the package, and request acceptance of the successor revision. |
| `Withdrawn` | An authorized Actor withdrew an unaccepted offer. Preserve the rationale and current owner. |
| `Degraded` | Recipient identity, response route, persistence, communication, or another required capability is missing. Preserve the proposed package and exact unblock action. |

Use the ordered Transfer gate in `SKILL.md` as the acceptance authority. This
table owns only the resulting branch disposition and evidence. Record an Outcome
ownership transition only when the parent Outcome itself is the accepted scope.

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
queue acknowledgment, receipt, or schedule proves only receipt or scheduling;
the parent effect and Outcome require separate evidence.

## Recovery extension

For every `Rejected`, `Stale`, `Waiting`, or `Degraded` disposition, record:

- state and canonical revisions preserved;
- safe allowed work and blocked effects;
- current responsible owner;
- rejection, change, external dependency, or capability gap;
- observable unblock condition;
- retry, revision, escalation, replacement, expiry, or recovery rule; and
- exact next action and responsible Actor.

For `Waiting`, also record the external dependency, unblock condition, last
observation, next check, verified scheduled action or manual trigger,
retry/escalation/expiry rule, pickup point, and first resumption action.

Recovery retains current Responsibility and returns work to a frontier only
after freshness is re-established.
