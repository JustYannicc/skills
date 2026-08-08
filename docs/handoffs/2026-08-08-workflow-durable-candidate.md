# Workflow Durable candidate checklist

**Scope:** issue #14, extending the accepted Workflow Inline route through
Persistence boundaries with one adapter-neutral Durable contract.

> **HUMAN REVIEW REQUIRED** — the local implementation candidate is validated,
> but this handoff does not approve, merge, or close issue #14.

## Task checklist

- [x] Read project authorities, issue #14, native dependencies, writing-for-agents, systems-first, and proof-driven-development.
- [x] Preserve the accepted Inline route and exact Workflow vocabulary.
- [x] Define the Durable route, canonical record set, responsibility, state, claims, evidence, continuation, recovery, and proof bundle.
- [x] Bind Transient Conversation, Local Markdown, Git-backed, GitHub, and external Adapter capabilities without making Git or scheduling prerequisites.
- [x] Bind the accepted #35 System Record representation and deterministic validator/action-guard seam without adding a second authority.
- [x] Cover migration, Change and Legacy Records, Degraded mode, waiting, delegation, Supplemental Extension points, effects, and parent terminal proof.
- [x] Add fresh behavioral fixtures, observations, evidence, deterministic seam tests, and provenance/registry updates where needed.
- [x] Run focused style, type, test, diff, fixture, evidence, simplify, adversarial, and resolution checks. The combined `pnpm evaluations:record`/`pnpm validate` gate remains pending the required fresh Domain Modeling proof for the combined #14+#23 candidate.
- [x] Commit a coherent local candidate and record the exact candidate identity, evidence counts, unresolved human decisions, and review surfaces.

## Systems-first gates

1. **Outcome and system map:** one adapter-neutral Workflow outcome across
   conversation, files, hosted records, and external providers.
2. **Existing mechanisms:** reuse the accepted Universal Work Contract and
   #35 representation; add only the missing Durable coordination seams.
3. **Residual gap:** Workflow must materialize and resume canonical state while
   honestly declaring optional Coordination and Continuation capabilities.
4. **Simpler path:** one Workflow skill with disclosed references, not a second
   migration or change-management lifecycle.
5. **Hard-to-reverse boundary:** keep one writable authority and fail closed at
   the #35 validator/action-guard seam.

## Handoff

- **Candidate identity:** resolve the latest first-parent non-evaluation commit
  with the repository validator. Evaluation-only commits do not change it.
- **Evidence counts:** 11 Durable fixtures, 19 revision-bound attempts; the
  action-guard Critical fixture has three fresh contexts per final candidate.
  Raw evidence and observation hashes are recorded with the evaluation commit.
- **Unresolved human decisions:** accept, revise, or reject this #14 candidate;
  decide whether the concrete Adapter capability matrix is sufficient for each
  claimed provider; retain downstream Adapter conformance as a separate gate.
- **Coordinator review surfaces:** the resolved candidate commit plus the
  evaluation-only evidence/observation tranche and its final-candidate
  rebind attestation.
