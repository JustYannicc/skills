# Workflow Inline candidate handoff

Date: 2026-08-04.

> **HUMAN REVIEW REQUIRED** — issue #13 remains open until the repository
> maintainer approves the candidate. A ready pull request is a review boundary,
> not completion or permission to merge.

## Candidate state

The `workflow` package now implements the complete Inline route for bounded
synchronous work and active mid-work messages. Thinking in Systems remains the
governing method; Workflow retains one parent Outcome, joins existing context
without recursion, checks direct-phase prerequisites, integrates bounded child
results, Reviews exact revisions, verifies effects, and ends only at a verified
terminal transition.

The installed Inline reference owns the executable classifier and interruption
branch. The repository routing contract owns phase selection, representation,
and parent routing. This boundary keeps one source of truth per runtime meaning
while preserving standalone skills.sh installation.

The pull request's human-review package records the exact candidate and
evidence commits, final gates, independent reviewer findings, and resolution
check. Behavioral evidence is stored separately from candidate inputs so it
can bind the clean candidate without changing its identity.

## Behavioral change

Every operative mid-work clause is now classified as clarification, extension
or Constraint change, correction, authorized override or informed exception,
explicit replacement or supersession, or unrelated switch. Material changes
trace their dependency closure, revise exact contracts, invalidate and
propagate only affected evidence, Review, approval, completion, and child work,
and preserve parent and unaffected ownership. Continuous and atomic work retain
different safe interruption boundaries; exact approval is rechecked before an
effect.

Trivial work still runs the whole lifecycle in the conversation and returns the
smallest requested result. Crossing a Persistence boundary without a Durable
capability enters visible Degraded mode with exact continuation; it does not
claim fictional storage, scheduling, monitoring, or completion.

## Review these surfaces

1. [`workflow` steps](../../skills/workflow/SKILL.md): one-job boundary,
   completion criteria, direct-phase prerequisites, and parent terminal gate.
2. [Inline classifier](../../skills/workflow/references/inline-route.md): the
   six classifications, mixed-clause handling, materiality, affected-only
   propagation, cancellation, and safe interruption.
3. [Canonical routing boundary](../WORKFLOW_ROUTING.md): ownership split between
   overall route semantics and the installed Inline executable branch.
4. [Workflow fixtures](../../evaluations/fixtures/workflow): direct, indirect,
   incomplete, negative, edge, classifier, delegated propagation,
   interruption/resume, and exact-approved-revision cases across domains.
5. The pull request package: exact revision binding, three fresh attempts for
   every Critical routing fixture, public-safe raw evidence, simplify findings,
   adversarial review, resolution evidence, and full validation output.

## Deliberate boundaries

- #14 owns Durable Adapter coordination, materialized records, waiting,
  recovery, multi-phase execution, and the full durable lifecycle extension.
- #35 owns the adapter-neutral System Record representation. This candidate
  selects no serialization as canonical.
- #31 and #32 still own composed-suite, clean-install, immutable-release, and
  publication proof. No skill has been published and no private or global
  configuration has changed.

## Approval continuation

The maintainer should review the exact ready-PR head and inspect the surfaces
above. If approved, the parent owner may record approval on #13 and decide its
terminal transition. Until then, preserve `human-review-required`, keep #13
open, and treat #14 as blocked by #13 even if its other prerequisites advance.
