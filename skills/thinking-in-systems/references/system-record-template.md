---
schema_version: 1
record_id: "[opaque logical id in the governing Coordination Space]"
record_version: 0.1.0-draft
record_revision: "[exact Adapter revision or content identity]"
canonical_locator: "[one writable record locator]"
design_status: candidate
operational_status: unbuilt
catalog_eligibility: not_eligible
owner:
  id: "[stable Actor id or unambiguous local label]"
  label: "[System owner]"
authority:
  decision_owner: "[who may accept, change, or activate it]"
  allowed_effects:
    - compose_without_effect
governed_by: Thinking in Systems standard
provenance:
  source: "[original request or governing source]"
  revision: "[source revision or date]"
  sha256: "[64 lowercase hexadecimal characters]"
approval:
  required: true
  status: pending
  approver_id: "[stable Actor id]"
  authority_revision: "[exact authority grant revision]"
  result_revision: "[exact proposed result revision]"
---

# [System name] — System Record

Use this template only for a Durable system or material System change. Complete the mandatory meaning from the full standard; include a conditional field only for a named consumer or material risk. Link to facts owned elsewhere instead of copying them.

For the Local Markdown Adapter, this Markdown file is the one writable human authority. Its constrained YAML envelope owns the formal identity, version and exact record revision, canonical locator, distinct design/operational/eligibility states, owner, action Authority, source provenance, and exact approval binding. The body explains their meaning and rationale by reference rather than copying those formal values. Add `supersedes` only when a predecessor exists. Delete the optional `approval` object when no named approval consumer or material risk requires it. Treat envelope comments, style, and key order as non-authoritative presentation.

An Adapter that permits machine-authorized lifecycle transitions, projections, or external effects must implement the proposed `System Record structural validator` and `System Record action guard`. The validator parses the complete envelope; rejects YAML directives, aliases, anchors, explicit tags, duplicate keys, and unknown fields; validates the constrained schema; and validates the Section 2 relationship table's required columns, unique kind/identity/version rows, material-boundary text, and contract-link shape. The guard consumes only validated output and binds eligible lifecycle state, Authority, approval, and action to the exact record revision. Until both production seams exist and pass conformance proof, the Adapter cannot authorize those actions. A malformed, unsupported, or unavailable record remains readable and editable by a human but `unverified` and blocked for machine action. JSON or TOML projections are optional generated read-only views; they identify this canonical locator and record revision, bind source and normalized-payload SHA-256 values, record generation time, reject stale or direct edits, and never become a second authority. Adapter-native records may map the same logical fields without requiring YAML or TOML universally. See the [HUMAN REVIEW REQUIRED representation decision](../../../docs/SYSTEM_RECORD_REPRESENTATION.md).

## 1. Frame

- **Original request or problem:**
- **Intent:**
- **Accepted Outcome:**
- **Satisficing / good-enough threshold and trigger for further search:**
- **Non-Outcomes:**
- **Hard and soft Constraints:**
- **Feasible set under current Authority, resources, capabilities, and operating conditions:**
- **Affected Actor Preferences, conflicts, evidence, and conditions under which they may change:**
- **Matched truthful Decision frames, when the decision is materially frame-sensitive:** reference points, gain/loss and absolute/relative formulations, probability formats, denominators, time horizons, stable judgment, and any frame-sensitive reversal; keep alternatives, outcomes, Constraints, and material omissions constant.
- **Rationale and constraints for the envelope owner, bounded Responsibilities, and decision Authority:**
- **Material domain terms:**
- **Intentionality and progress classification, when relevant:** intended productive use, rest or leisure, intentional or incidental progress, or unresolved Intent; never a moral score.

## 2. Boundary and support

- **Owned responsibilities:**

Add one row for each known material relationship and delete unused placeholder rows. This is the single semantic relationship index, not an exhaustive-discovery requirement or a duplicate interface contract. Use `unknown` only when the uncertainty is itself material. Link to the Section 6 interface or handoff contract instead of repeating its inputs, outputs, Authority, timing, failure behavior, or proof.

| Relationship | Related System identity and version | This System's role and material boundary | Interface or handoff contract reference, if material |
| --- | --- | --- | --- |
| Containing System |  |  |  |
| Subsystem |  |  |  |
| Upstream System |  |  |  |
| Dependent System |  |  |  |
| Peer System |  |  |  |
| Other material relationship |  |  |  |

- **Affected but not controlled:**
- **Included and excluded:**
- **Supported Actors, cases, operating conditions, interfaces, states, and scale:**
- **Construction class:** disposable experiment, bounded temporary tool, or maintained System.
- **Evidence claim:** demonstrated seams and cases, operating conditions, artifact, revision or date, freshness, and evidence still missing.
- **Material differences from the nearest proven case:**

## 3. Sources, assumptions, ambiguity, and gaps

- **Authoritative facts, decisions, and links:**
- **Material assumptions, status, source, and affected result revision:**
- **Correction propagation:** governing cause, affected similar work, and replay before restored autonomy.
- **Potentially ambiguous Intent, meaning, boundary, Authority, cost, or effect:**
- **Smallest discriminating question for each unresolved ambiguity:**
- **Unknown-case behavior:**
- **Capability or dependency gap:** original request, blocked condition, preserved state, allowed safe work, proof needed, and resumption condition.

## 4. Intervention, Satisficing, Pareto, Marginal analysis, and cost

- **Feasible alternatives:** do nothing; wait with a recheck trigger; change process or operating conditions; configure an existing System; adopt a maintained solution; build a custom solution.
- **Selected intervention and threshold evidence:**
- **Materially distinct alternatives, known trade-offs, and condition for further search:**
- **How Pareto / 80-20 concentration prioritizes the search toward likely high-value causes or actions:**
- **Marginal increment under consideration, expected incremental Outcome or information value, and incremental total cost:**
- **Why further work is or is not worthwhile at the margin after the Satisficing threshold and protected obligations:**
- **Possible Pareto improvement and per-Actor/System impact:**
- **If trade-offs create losers:** Authority, mitigation, compensation, reversal, or informed exception.
- **Substitution effects:** how relative cost, friction, access, delay, or availability may redirect behavior.
- **Externalities:** costs, burdens, risks, or benefits shifted outside the deciding Actor's or System owner's accountability.
- **Best feasible alternative forgone:**
- **Cost horizon and units, including any evidence-based monetary conversions:**
- **Fixed, variable, Marginal, and average total cost, without double counting:**
- **Minimum efficient scale, only when comparable repeated Outcome units and a credible long-run cost relationship exist:**
- **Displaced resources, transition cost, ownership cost, maintenance cost, and cost of delay:**
- **Reversibility, option value, and sunk investment excluded from prospective value:**
- **Irreversible or costly-to-reverse effect, when necessary:** exact Authority, tested assumptions, stronger pre-effect proof, acknowledged consequences and Externalities, least-irreversible feasible scope, and containment, mitigation, repair, or recovery for surrounding state; never invent rollback.
- **Decision-sensitive unknown values, plausible ranges, provenance, and smallest discriminating questions for the `'Workflow'` skill or caller:**
- **Reference class and material differences:**

## 5. Mise en place and stopping rule

- **Required inputs, context, materials, capabilities, permissions, and operating conditions:**
- **Required versus optional readiness conditions and clearing evidence:**
- **Proof seam, fallback, and resumption state:**
- **Preparation stopping rule:**
- **Disposition:** smallest safe execution or experiment; gap and pause; reduced scope; named deferral trigger; or cancellation.

## 6. Actors, Ownership, Responsibility, Authority, state, and handoffs

| Producer | Consumer | Input and precondition | Output | Authority and effect boundary | Timing | Failure or degraded behavior | Completion evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |

- **Integrated Outcome owner and terminal proof duty:**
- **Bounded Responsibilities and accepting Actors:**
- **Nested Responsibility and retained parent Ownership:**
- **Explicit Ownership transfers and accepted continuation state:**
- **Writable authority per information type:**
- **Derived System representations, source revision, and freshness rule:**
- **Stable identities and version binding beyond the envelope, including related Systems:**
- **Approval rationale, revocation, and authoritative evidence beyond the envelope reference:**
- **Named deterministic validators or effect guards for formalizable material rules:**

## 7. LLM and deterministic boundary

- **LLM judgments:** interpretation, uncertainty, evidence synthesis, bounded comparison, or proposal composition.
- **Inputs and governing sources for each material judgment:**
- **Decision rubric and permitted output:**
- **Uncertainty behavior:** proceed, compose without effect, clarify, or pause.
- **Correction path:**
- **Human or deterministic Authority gate for effects:**
- **Deterministic mechanisms:** timing, state, validation, transitions, retries, approvals, reconciliation, invariants, and effect gates.
- **Shared simulation/live path:**
- **Named effector boundary:**

## 8. Incentives, friction, and operating conditions

- **Accepted Outcome and desired incentives:**
- **Actual incentive structure—rewards, costs, constraints, defaults, information, consequences, and alternatives:**
- **Actor Preferences and likely substitution effects:**
- **Indirect or unintended incentives and who receives each benefit or bears each cost:**
- **Observed behavior that the incentive structure explains or fails to explain:**
- **Helpful and harmful friction:**
- **Repeated-compliance dependencies and how they are removed:**
- **Relevant routines, access, availability, timing, visibility, resources, organizational conditions, competing paths, and transition cost:**
- **Proxy-gaming routes and counter-signals:**
- **Voluntary exit and correction path:**

### Ambient-operation contract

Every ambient operation has one row. If none is authorized, record `none`.

| Operation | Exact Authority and version | Inputs | Trigger | Permitted state or output | Effect boundary | Data purpose, privacy, retention, and use limits | Health signal | Exception route | Review or resumption condition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |

## 9. Operating modes, decay, and recovery

For each applicable mode, define trigger, permitted effects, blocked effects, preserved state, visibility, owner, retry or resumption rule, and exit proof.

| Mode | Contract |
| --- | --- |
| Normal |  |
| Degraded |  |
| Paused |  |
| Recovery |  |

- **Interruption behavior:** continuous pickup point or atomic boundary.
- **Delayed-attention behavior:** queues, retries, reminders, deadlines, stale assumptions, effects, and bounded recovery triage.
- **Linked incidents, ambiguities, capability gaps, and change proposals:**
- **Accepted healthy baseline:**
- **Decay signals:**
- **Reset or maintenance action and trigger:**
- **Review trigger or cadence, reachable control surface, evidence inspected, and resulting decision:**
- **Reset and recovery proof:**
- **Adaptation, pause, replacement, and retirement conditions:**

## 10. Proof and learning

| Scenario | Initial state or input | Expected visible result | Effect boundary | Evidence |
| --- | --- | --- | --- | --- |
| Normal operation |  |  |  |  |
| Material ambiguity |  |  |  |  |
| Weakest realistic condition |  |  |  |  |
| Missing capability or dependency |  |  |  |  |
| Degraded and recovery |  |  |  |  |
| Incorrect assumption |  |  |  |  |
| Affected legacy state |  |  |  |  |
| Retirement |  |  |  |  |

- **Hypothesis and mechanism:**
- **Baseline:**
- **Outcome signal:**
- **Operation signal:**
- **Burden or harm signal:**
- **Attention-demand signal, when material:** checks, reminders, searches, decisions, corrections, or interventions per meaningful Outcome, interpreted beside autonomy, trust, and correction.
- **Qualitative comparison or rubric:**
- **Sensitive or passive data contract, when used:** purpose, Authority or consent, minimization, retention, access, deletion, and interpretation limits.
- **Observation window, expected delay, and confounders:**
- **Decision rule:** retain, revise, expand, pause, repeat, or retire.
- **Assurance cadence:** initial effect check; post-activation verification and validation after relevant evidence delays; stable-evidence transition to steady operation; incident, drift, assumption, boundary, and source-change triggers; continuous or periodic signals with decision, threshold, owner, next action, collection burden, taper, and retirement condition.
- **Adversarial review:** reviewer who did not author the exact revision, credible-risk scope, and findings.
- **Resolution:** resolver and evidence for each material finding.
- **Resolution check:** checker who neither authored the reviewed revision nor made the fix, and result.

## 11. Discovery and operation

- **Discovery routes for the envelope's stable identity and canonical locator:**
- **Applicability and supported operations:**
- **Relationship conflicts and precedence not expressed by the envelope index:**
- **Applicability, operational eligibility, and freshness rationale beyond the envelope state and version:**
- **Human-readable status and control surface:**
- **Last and next action and authoritative links:** refer to, rather than repeat, the envelope's owner and status fields.
- **Contract-selection evidence and no-match or conflict behavior:**
- **Independent discovery route when an attention or delivery representation fails:**

## 12. Change, legacy, and retirement

- **Decision rationale and review conditions:**
- **Successor System Record:**
- **Affected population and truthful unknown coverage:**
- **Impact on Containing, Subsystem, Upstream, Dependent, and Peer System contracts:**
- **Legacy classification:** `unaffected`, `compatible`, `auto-adapt`, `review-required`, `conflict`, `exempt`, or `unreachable/unknown`.
- **Exact transformation or re-evaluation per cohort:**
- **Bounded resumable application and coverage counts:**
- **Zero-effect transition simulation:**
- **Rollout, cutover, rollback or repair, and verification:**
- **Successor monitoring and health-evidence updates:**
- **Predecessor and retirement disposition:**
- **What changed since the prior decision:**

## 13. Completion gate

- **Every section of the full standard accounted for:**
- **Materially expected omissions and reasons:**
- **Design Complete:** another competent person or agent can implement and simulate this version without inventing a material rule.
- **Approval, result revision, and date:**
