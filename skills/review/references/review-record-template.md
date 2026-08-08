# Review record template

Use this template for every Review record. Preserve the named fields, but compress the form for Inline work and omit conditional sections that have no content. Keep exact Evidence references rather than copying large evidence bodies.

# Review — [result label]

**Verdict:** [Verified | Changes required | Inconclusive]

**Reason:** [One sentence naming the decisive evidence or gap.]

**Target:** Specification `[identity@revision]` · result `[identity@revision]` · standards `[identities@revisions]` · Proof seam `[boundary]` · effect evidence `[identity, pending, or not required]`

**Coverage:** Specification `[complete | gaps]` · Standards `[complete | gaps]` · Supplemental `[integrated | advisory unavailable | required blocked | not configured]` · effect `[verified | pending | outside this seam]`

**Review controls:** depth `[Inline | Standard | High]` · Reviewer/independence `[Actor and relationship]` · evidence matrix `[Material paths and stopping rationale]` · sources `[identities]` · capability gaps `[none or exact unavailable capability]`

## How the result works

[Explain the Material path in a few sentences: trigger or input → decisive behavior or state transition → visible output or effect. Include the Material degraded or recovery path. For a UI or other human–System interaction, describe the experienced flow and feedback, not merely its implementation.]

## Evidence

### Specification

| Requirement | Observation at the Proof seam | Exact Evidence reference | Status |
| --- | --- | --- | --- |
| [accepted behavior or boundary] | [what actually happened] | [condition, method, result, observer, time, location, exact revision; use `unknown—not supplied` for absent provenance] | [pass | fail | unknown] |

### Standards

| Governing rule | Observation at the Proof seam | Exact Evidence reference | Status |
| --- | --- | --- | --- |
| [standard and exact version] | [including interaction quality, maintainability, or System fit when Material] | [condition, method, result, observer, time, location, exact revision; use `unknown—not supplied` for absent provenance] | [pass | fail | unknown] |

## Findings

### [Critical | Major | Minor] — [short finding]

- **Rule:** [violated requirement or standard]
- **Evidence:** [exact observation and reference]
- **Consequence:** [effect on Outcome, Actor, System, or proof]
- **Correction:** [smallest action that resolves the finding]

When no finding exists, state `No findings.` rather than inventing reassurance.

## Supplemental reviewers

Include this section only when a mapping is configured.

| Mapping | Scope and status | Exact result binding | Evidence or limitation | Disposition |
| --- | --- | --- | --- | --- |
| [skill, source, version, Extension point] | [scope; advisory or required] | [result revision] | [evidence reference or capability gap] | [integrated | advisory limitation | required waiting] |

## Transition and Responsibility

- **Transition:** `[state → state]`
- **Reviewer:** [Actor reference and independence]
- **Work owner:** [current Responsibility and next action]
- **Outcome owner:** [remaining parent integration and completion Responsibility]
- **Approver:** [Actor reference, exact approval status, or not required]

## Pending effects, limitations, and next check

[State what has not happened, unresolved Fog of war, an Informed exception, affected legacy state, or no remaining limitation. For Changes required or Inconclusive, name the owner, unblock condition, exact next check, retry or escalation rule, and resumption action.]
