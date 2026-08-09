# Map and Strategy contract

Use this contract to create, resume, or update a Wayfinder Map through the selected Adapter. Preserve the Adapter's native representation and one writable authority for every meaning.

## Canonical relationship

The [Universal work and coordination contract](../../../docs/UNIVERSAL_WORK_CONTRACT.md#outcome-ticket-and-map) owns Outcome, Ticket, Map, Evidence, and Continuation meanings. The selected Adapter owns their native serialization.

For Wayfinder, render a low-resolution Map over those canonical sources. Identify their exact revisions and freshness. Carry only a one-line decision gist and named context pointer for navigation; keep full reasoning, Evidence, and Continuation at their authoritative records.

## Core Map

```markdown
# <Outcome name> — Wayfinder Map

- Outcome identity: <immutable identity>
- Outcome source revision: <exact revision>
- Map result revision: <exact Adapter result revision>
- Freshness: <rendered or verified time and stale condition>
- Selected Adapter: <name, Baseline/Coordination/Continuation capabilities>
- Canonical locator: <Outcome record locator>
- Outcome owner: <unambiguous Actor reference and return route>
- Wayfinder Work owner: <unambiguous Actor reference and return route>

## Destination

<The accepted condition this map is navigating toward, its boundary, and its
Satisficing threshold.>

### Out of scope

- <Accepted exclusion, rationale, Authority, and source pointer>

## Accepted decisions

- <Decision name> — locator <canonical decision locator>; <one-line relevance>;
  accepted by <Actor> at <exact decision revision>; review when <condition>.

## Operating Strategy

- Observation: <condition or Evidence that can change the route>
- Decision rule: when <observable condition>, <responsible Actor> decides or
  performs <bounded response> within <Authority>.
- Threshold: <what separates continue, revise, Degraded, Paused, or Recovery>.
- Reversibility: <smallest reversible response or honest mitigation>.
- Safe modes: <allowed and blocked behavior under Degraded, Paused, Recovery>.
- Feedback and Evidence: <source, observer, evidence delay or event trigger>.
- Review condition: <when the Strategy or destination must be reconsidered>.

## Decision frontier

- <Item name> — locator <canonical Ticket locator>; <precise question or
  bounded result>; kind <decision/research/prototype/questionnaire/action>;
  owner <Actor>; Authority <scope>; unblocked because <evidence>.

## Blocked

- <Item name> — locator <canonical Ticket locator>; requires <Ticket or external
  event>; owner <Actor>; unblock condition <observable condition>; next check
  <time/event and responsible Actor>.

## Evidence

- <Condition evaluated>; <method or observation>; <result>; observed by
  <Actor> at <time>; <canonical locator and exact revision>.

## Fog

### Reducible

- <In-scope uncertainty>; reducible by <owning capability or observation>;
  responsible Actor <Actor>; revisit when <trigger>.

### Reducible after operating

- <Uncertainty that can be reduced only through operation>; observation horizon
  <time/event count>; permitted operating route <bounded behavior and safe mode>;
  Evidence <observations and exact sources>; decision trigger <condition that
  returns it to the frontier>; owner and Authority <Actor and scope>; recovery
  and review <conditions>.

### Irreducible uncertainty

- <Uncertainty that cannot presently be eliminated>; governed by <Strategy
  rule and safe mode>; review when <trigger>.

## Continuation

- Canonical Continuation locator: <authoritative record>
- Exact Continuation revision: <revision>
- State: <active/waiting/recovery/ready for next route>
- Exact resumption action: <first action against current canonical state>

The canonical record follows the shared [Continuation contract](../../workflow/references/continuation-template.md); the Map does not copy it.

## Transition history

- <time> — <Actor> changed <state or rule> under <Authority> because <rationale>;
  Evidence <reference>; result revision <exact revision>.
```

## Classification rules

- **Decision frontier:** the question is precise, accepted, unblocked, owned, and capable of materially sharpening the next route. A linked Ticket enters the Work frontier only under its separate state, dependency, and Claim rules.
- **Blocked:** the item is precise but a required Ticket or external condition prevents it from proceeding.
- **Reducible fog:** the uncertainty is material but cannot yet be stated as a precise question; a named capability, observation, or frontier result may sharpen it.
- **Operating-delay fog:** the uncertainty becomes answerable only after bounded real operation. It requires an accepted observation horizon, permitted operating route, Evidence protocol, decision trigger, safe mode, recovery, owner, and Authority; at the trigger it returns to the decision frontier rather than remaining permanently irreducible.
- **Irreducible fog:** the uncertainty cannot be eliminated within the accepted horizon or at worthwhile Marginal cost. It requires Strategy rules rather than speculative Tickets.
- **Out of scope:** the item does not point toward the accepted destination. It returns only through an authorized destination change.

When fog becomes precise, create or update its canonical Ticket before showing it on the frontier. When a decision invalidates a Ticket, dependency, Strategy rule, approval, or Evidence claim, preserve history and mark the affected record superseded, cancelled, or reopened according to the governing contract.
