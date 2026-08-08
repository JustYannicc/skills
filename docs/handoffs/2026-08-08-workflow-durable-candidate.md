# Workflow Durable candidate checklist

**Scope:** issue #14, extending the accepted Workflow Inline route through
Persistence boundaries with one adapter-neutral Durable contract.

> **HUMAN REVIEW REQUIRED** — this candidate is locally complete and validated,
> but it does not approve, merge, or close issue #14.

## Task checklist

- [ ] Read project authorities, issue #14, native dependencies, writing-for-agents, systems-first, and proof-driven-development.
- [ ] Preserve the accepted Inline route and exact Workflow vocabulary.
- [ ] Define the Durable route, canonical record set, responsibility, state, claims, evidence, continuation, recovery, and proof bundle.
- [ ] Bind Transient Conversation, Local Markdown, Git-backed, GitHub, and external Adapter capabilities without making Git or scheduling prerequisites.
- [ ] Bind the accepted #35 System Record representation and deterministic validator/action-guard seam without adding a second authority.
- [ ] Cover migration, Change and Legacy Records, Degraded mode, waiting, delegation, Supplemental Extension points, effects, and parent terminal proof.
- [ ] Add fresh behavioral fixtures, observations, evidence, deterministic seam tests, and provenance/registry updates where needed.
- [ ] Run `pnpm evaluations:record`, `pnpm validate`, `git diff --check`, simplify, one adversarial review, one resolution check, and focused reruns.
- [ ] Commit a coherent local candidate and record the exact candidate identity, evidence counts, unresolved human decisions, and review surfaces.

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

- **Candidate identity:** pending final commit.
- **Evidence counts:** pending final `pnpm evaluations:record` report.
- **Unresolved human decisions:** accept, revise, or reject this #14 candidate;
  decide whether the concrete Adapter capability matrix is sufficient for each
  claimed provider; retain any remaining #35 representation review conditions.
- **Coordinator review surfaces:** pending final list of changed files.
