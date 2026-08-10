# Instruction standards

Setup supports two standards only.

| Standard | Instruction file | Skill directory |
| --- | --- | --- |
| AGENTS | `AGENTS.md` | Managed by `skills`, commonly under `.agents/skills` or a user-level equivalent |
| Claude | `CLAUDE.md` | Managed by `skills`, commonly under `.claude/skills` or a user-level equivalent |

The instruction file and skill directory are different things. Inspect actual paths and symlinks instead of guessing them.

## Writing skill

Use `writing-for-agents` before reviewing or changing either instruction file.

If it is missing, recommend:

```bash
npx skills add mattpocock/skills --skill writing-for-agents
```

Add the accepted scope and target flags. Install it only after approval. If the user declines, leave instructions unchanged and complete package installation as install-only.

## Selection

- Only `AGENTS.md` exists: recommend it.
- Only `CLAUDE.md` exists: recommend it.
- Both exist: ask whether both should activate the suite.
- Neither exists: ask which standard to create.

For global scope, resolve the effective user-level file and every symlink before showing the diff. Preserve symlinks.

## Activation block

The default block is shown in [the Setup skill](../SKILL.md#what-activation-adds). Treat it as a draft, not fixed text:

- Show the complete draft and let the person running Setup edit it before approval.
- Place the accepted block as the first substantive instruction section, immediately after any YAML frontmatter and document title.
- Update an existing marked block in place; never append a duplicate.
- Preserve the accepted wording on later repair or update runs unless the user approves another change.

Show the full file path, proposed placement, and complete diff before asking to write it.

## Conflicts

Preserve unrelated instructions. Flag instructions that would prevent or weaken the block, including rules that:

- skip Thinking in Systems or Workflow;
- invoke phase capabilities outside one parent Workflow context or omit their return to Workflow;
- force direct implementation before Workflow chooses a route;
- treat delegation, review, or submission as completion;
- forbid installed skill use;
- assign another process exclusive ownership of every request.

For each conflict:

1. quote the smallest relevant section;
2. explain the behavioral conflict in one sentence;
3. show the smallest replacement or qualification;
4. let the user revise either the activation draft or the conflicting instruction;
5. ask for approval of the resulting diff.

If the user keeps a material conflict, do not claim reliable automatic activation. Leave the block unwritten or record the installation as inactive.
