# Core Handoff contract

Use one contract per exact Handoff revision. The linked Outcome or Ticket remains the canonical authority for work state; this contract preserves only the interface needed to continue it. After classifying the Handoff kind, use the matching branch in [Handoff dispositions](handoff-dispositions.md).

## Identity and boundary

- **Handoff identity and exact revision:**
- **Kind:** [Continuity | Transfer | Dispatch]
- **Kind-specific disposition:**
- **Operational mode:** [Normal | Degraded | Paused | Recovery]
- **Created and updated:**
- **Canonical locator and Adapter revision, or Inline identity:**
- **Source Outcome or Ticket identity, locator, and exact revision:**
- **Parent Outcome identity, owner, and current state:**
- **Current responsible owner:**
- **Proposed successor or same continuing owner:**
- **Recipient kind and verified recipient response route:**
- **Boundary and explicit non-ownership:**
- **Workflow context and Workflow/caller return route:**

## Continuation spine

- **Canonical current-state reference:** [identity, locator, and exact revision]
- **Failure events and partial effects:** [canonical references when present]
- **Responsibility:** [Outcome, bounded work, execution, Review, approval, and recovery roles before and after any accepted transition]
- **Authority:** [decisions and effects allowed, limits, validity, and approvals]
- **Rationale and accepted decisions:** [canonical references plus only the minimum pickup explanation]
- **Evidence references:** [canonical identities, locators, and exact revisions]
- **Uncertainty:** [assumptions and unknowns, provenance, impact, and resolution or operating rule]
- **Dependencies:** [`requires` work and external dependencies by canonical reference, status, responsible Actor, and unblock condition]
- **Continuation record:** [canonical identity, locator, and exact revision, or none]
- **Decision or Work frontier:** [canonical locator and calculation revision]
- **Recovery queue:** [canonical locator and calculation revision when present]
- **Suggested capabilities:** [only capabilities the next action needs, with available, unavailable, advisory, or required status]
- **Other canonical references:** [Specification, plan, decisions, records, results, messages, or other authorities by locator and revision]
- **Minimal pickup context:** [only what the references do not make quickly discoverable]
- **Sensitive-data disposition:** [redacted, protected reference, or necessary authorized disclosure]

## Delivery, pickup, and return

- **Delivery Authority and approved channel:**
- **Delivered revision, recipient, mechanism, time, and evidence, or not delivered reason:**
- **Pickup, service response, or successor response identity, time, and evidence:**
- **Freshness check:** [current canonical revisions compared with the Handoff]
- **Responsibility transition:** [prior owner, successor, accepted scope, exact revisions, Authority, rationale, evidence, and time; or none]
- **Outcome ownership transition:** [only when explicitly accepted for the parent Outcome; otherwise none]
- **Parent Outcome state after Handoff:** [open state]
- **Gap, unblock condition, and exact next action with responsible Actor:**
