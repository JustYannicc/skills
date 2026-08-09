# Roadmap

The accepted suite Outcome is specified in the
[Universal Thinking in Systems skill suite Specification](specs/UNIVERSAL_SKILL_SUITE.md).

## Phase 0 — repository foundation

Status: complete when the bootstrap commit and public remote are verified.

- Public/private boundary and license.
- Repository instructions and vocabulary.
- Architecture, decisions, research, and new-session handoff.
- No discoverable placeholder skills.

## Phase 1 — governing and coordination skills

- Implement the accepted [Workflow routing contract](WORKFLOW_ROUTING.md).
- Author `thinking-in-systems` from the complete standard.
- Author `workflow` against the accepted work contract.
- Author `migrate-system` for automatic current-state adoption.
- Evaluate each skill independently before composing them.

Current state: `thinking-in-systems` and both Workflow routes are approved.
Issue #14's Durable coordination route extends the same Workflow skill through
the accepted adapter-neutral work contract and #35 System Record
representation; PR #45 merged it into `main`. `migrate-system` remains to be
implemented.

## Phase 2 — discovery skills

- Author the universal `domain-modeling`, `wayfinder`, and `prototype` successors. Domain Modeling and Prototype are approved; Wayfinder remains to be implemented.
- Define and verify the pinned overlays for `research`, `grill-with-docs`, `grilling`, and `to-questionnaire` without copying their full upstream source. The overlay foundation is implemented.
- Test discovery across technical, personal, organizational, physical, communicative, and agent cases.

## Phase 3 — delivery and continuity skills

- Implement the accepted [Ownership and completion lifecycle](OWNERSHIP_LIFECYCLE.md).
- Author the universal `to-spec`, `to-tickets`, `implement`, and `handoff`
  successors. To Spec and To Tickets are approved; Implement has a
  human-review candidate; Handoff remains to be implemented.
- Author universal `review`, including code and configured Supplemental evidence. Review is approved.
- Prove the lifecycle:

```text
wayfind or grill with docs → specify → decompose → execute → review → learn/change the system
```

## Phase 4 — setup, guidance, and composition

- Author `ask-yannic` as the route guide.
- Author `setup-system-thinking` against the accepted [Setup System Thinking contract](SETUP_CONTRACT.md).
- Prove source pinning, overlays, standing instructions, Extension points, clean removal, and no-Git operation.
- Verify the accepted README Mermaid workflow and complete end-to-end evaluation matrix.

## Phase 5 — publication and private migration

- Execute the accepted [validation and release contract](VALIDATION_AND_RELEASE.md).
- Validate skills.sh discovery, clean installation, update, rollback, and removal.
- Publish the accepted skill folders through skills.sh from the reviewed public revision.
- Pin the tested public revision.
- In a separate task, update private agent configuration and global standing triggers.
- Remove the obsolete private predecessor only after equivalent behavior is proven.
