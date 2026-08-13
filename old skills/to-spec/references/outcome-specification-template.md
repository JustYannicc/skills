# Outcome Specification template

Use this template to materialize one accepted Outcome contract. Preserve the Outcome's vocabulary and omit only a conditional branch that does not apply. A conforming Adapter may render the same semantic fields in another shape; its representation remains canonical.

## Core template

# [Outcome name] — Specification

- **Specification state:** [Accepted | Proposed | Waiting for discovery | Operating under fog]
- **Accepted Outcome source and exact revision:**
- **Specification revision:**
- **Representation mode:** [Inline | Durable]
- **Canonical locator and Adapter revision, when Durable:**
- **Approver, Authority, and acceptance evidence:**

## 1. Intent and Outcome

- **Original request:**
- **Intent:**
- **Accepted Outcome:** [externally meaningful condition to produce or preserve, affected Actors, and observable result]
- **Satisficing / good-enough threshold:**

## 2. Scope, exclusions, and Constraints

- **Included Actors, Systems, environments, conditions, time horizon, and boundaries:**
- **Exclusions:** [accepted optional improvements outside this Outcome]
- **Required remediation, propagation, and recovery:**

| Constraint or Preference | Hard Constraint, Soft Constraint, or Preference | Source and confidence | Effect on feasible choices |
| --- | --- | --- | --- |
|  |  |  |  |

Use only `Hard Constraint`, `Soft Constraint`, or `Preference` in the classification column.

## 3. Responsibility and Authority

- **Outcome owner and parent terminal-proof duty:**
- **Specification Work owner:**
- **Known Executors, Reviewers, or successor route:**
- **Approver for Intent and material trade-offs:**
- **Effect Authority:** [Actor, exact effect, scope, limits, validity, and missing authorization]

## 4. Knowledge and decisions

| Kind | Accepted statement or visible gap | Status | Source, exact revision, and confidence | Material consequence |
| --- | --- | --- | --- | --- |
| Fact, assumption, inference, decision, unknown, or exception |  |  |  |  |

## 5. Accepted behavior

| Actor, condition, or event | Required behavior or policy | Expected visible result | Governing decision or Constraint |
| --- | --- | --- | --- |
|  |  |  |  |

## 6. Proof and terminal condition

- **Highest stable Proof seam:**
- **Evidence, observer, timing, and relevant limits:**
- **Terminal condition:** [condition that permits the Outcome to end, including required effect verification, propagation, and recovery]

## 7. Unresolved items and exceptions

| Item | Impact | Owner or Approver | Next check | Blocks acceptance? |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Operating Outcome

Complete this branch when the Outcome preserves a condition or recurs. Each field contains accepted meaning or a named material gap returned to `'Workflow'`.

- **Observation horizon or recurrence boundary:**
- **Review cadence and evidence inspected:**
- **Responsible owner while operating:**
- **Valid transfer rule and acceptance evidence:**
- **Cancellation condition and Authority:**
- **Condition that ends a finite stability window, if any:**

## Material revision

Complete this branch when accepted meaning changes materially.

- **Prior accepted Specification revision:**
- **Successor Specification revision:**
- **Accepted change and rationale:**

| Impact area | Affected exact item or revision | Disposition and required recheck | Unaffected accepted work preserved |
| --- | --- | --- | --- |
| Tickets and dependencies |  |  |  |
| Completed work |  |  |  |
| Approvals and Review evidence |  |  |  |
| Effects and current-state records |  |  |  |
| Legacy state |  |  |  |

## Discovery gap

Complete one row for every material gap that prevents a faithful accepted artifact.

| Missing fact or decision | Material impact and blocking status | Owning capability | Smallest question, evidence request, or experiment | Responsible owner and Approver | Exact resumption condition and action |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

When the capability is unavailable, add the preserved artifact revision, safe allowed work, missing proof, and capability-restoration condition to the Continuation record.

## Irreducible fog

Complete this branch only when the Approver accepts operation under irreducible uncertainty.

- **Uncertainty and why it is currently irreducible:**
- **Accepted threshold for proceeding:**
- **Permitted action and Authority boundary:**
- **Safe mode when the threshold is crossed:**
- **Feedback signal, observer, and cadence:**
- **Recovery or pause trigger and responsible owner:**
- **Approver, exact accepted rule revision, and evidence:**

## Supplemental evidence

Complete this branch when `'Workflow'` invokes a configured Supplemental skill at the `specification-enrichment` Extension point.

| Supplemental skill | Advisory or required | Exact artifact revision inspected | Evidence and exact source | Accepted disposition and artifact impact |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
