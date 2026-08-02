# Decisions

## Accepted

### Repository and publication

- Repository: `JustYannicc/skills`.
- GitHub license and copyright identity: MIT, `JustYannicc`.
- Intended channels: skills.sh and ClawHub.
- ClawHub's fixed MIT-0 distribution condition is accepted.
- The public repository is separate from private agent configuration.

### Skill architecture

- Public anchor name: **Thinking in Systems**; slug: `thinking-in-systems`.
- The existing private predecessor is obsolete. Remove it only after the public replacement is proven and the private migration is separately reviewed.
- Each skill has one job. Thinking in Systems is not a mega-skill.
- Cross-skill relationships are explicit capability references; there are no fictional package dependencies.
- Each implemented skill includes deliberately authored `agents/openai.yaml` metadata.
- Loop and graph engineering are emergent properties of clear systems, not separate mandatory phases or skills.
- “Subway orchestration” meant subagent orchestration.
- Both previously proposed Thinking in Systems descriptions are rejected; invocation wording will be authored and evaluated with the skill.

### Universalization direction

- Wayfinder should preserve as much useful behavior as possible while removing repository/ticket assumptions and treating persistent fog as a normal operating condition.
- Research should work across technical, personal, organizational, physical, and agent questions.
- Prototype should support reversible system/life experiments while delegating software prototypes to the existing code-focused procedure.
- Handoff should cover humans, agents, sessions, and operational systems.
- Batch Grilling is preferred over single-question Grill Me for the independent decision frontier, while later questions still wait when answers are dependent.
- Domain Modeling remains unchanged unless a focused audit identifies a concrete gap.
- Existing software TDD remains specialized; universal proof-at-seams principles belong in Thinking in Systems unless evidence justifies another skill.
- A maintainer-query workflow and setup are later independent skills.

### Public content

- The README describes Thinking in Systems as the maintainer's secret sauce and the way of thinking the maintainer credits for rapid progress.
- The skill must remain useful without users outsourcing their own understanding and judgment.
- Include empathy, blameless failure analysis, incentives, friction, intentionality, assumptions, transparent sources, graceful degradation, low-capacity operation, quantitative evidence where possible, recovery, decay reset, change rationale, and legacy propagation.
- Pair good and bad examples; keep a distinct subset as behavioral evaluations.
- Universal public examples exclude named personal assistants, personal operating policy, task or knowledge platform preferences, maintainer-specific rules, employer material, and private paths.

## Deliberately unresolved

These are decisions for the dedicated skill-authoring tasks, not repository bootstrap:

1. Final roster and public names of the universal companion skills.
2. Whether each adapted Matt skill is a close licensed fork or an independently written successor preserving selected behavior.
3. Exact invocation mode, description, leading words, steps, references, and completion criteria for each skill.
4. Exact universal lifecycle after Wayfinder—whether the public sequence keeps `to-spec`, `to-tickets`, `implement`, and review names or adopts cross-domain language.
5. Whether the future setup experience is a skill, a script, an OpenAI plugin, or a combination after the documentation-only first release.
