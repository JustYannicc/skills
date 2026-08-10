# Installation receipt

Keep one small Markdown receipt for repair and removal:

- Project: `.agents/system-thinking/installation.md`
- Global: `~/.config/system-thinking/installation.md`

Show the path before writing it. Store no credentials.

```markdown
---
suite: thinking-in-systems
scope: project | global
status: applying | current | failed
activation: agents | claude | both | inactive
updatedAt: <ISO-8601 timestamp>
---

## Installed

- Local: <name; source; installed path; added, replaced, or reused; owned yes or no>
- Matt: <name; source; installed path; added, replaced, or reused; owned yes or no>
- Corrections: <applied patch files>

## Instructions

- <logical path -> resolved path, block present or declined>
- Conflicts: <approved edits or unresolved conflicts>
- writing-for-agents: <used, installed with approval, or declined>

## Recovery

- Backup: <location>
- Restore: <exact commands and files>
- Removal guard: <remove only owned entries whose current source still matches; preserve reused or changed entries>
- Setup removal: <exact command and result>
```

Mark only packages added or replaced by Setup as owned. Reused packages remain user-owned. Update the receipt after verification and after Setup removal. A `failed` receipt must name the next safe action.
