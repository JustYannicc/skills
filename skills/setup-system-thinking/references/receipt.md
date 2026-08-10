# Installation receipt

Keep one small Markdown receipt for repair and removal:

- Project: `.agents/system-thinking/installation.md`
- Global: `~/.config/system-thinking/installation.md`

Show the path before writing it. Store no credentials.

```markdown
---
suite: thinking-in-systems
scope: project | global
status: applying | verification_pending | current | failed
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

## Verification

- Configured target and revision: <instruction path and exact revision>
- Bounded route fixture: <exact prompt; transcript locator; observed trace; pass/fail; verifier>
- Durable documented-plan fixture: <exact prompt; transcript locator; observed trace; pass/fail; verifier>
- Pending action: <none, or who must run/return which fresh-context fixture>

## Recovery

- Backup: <location>
- Restore: <exact commands and files>
- Removal guard: <remove only owned entries whose current source still matches; preserve reused or changed entries>
- Setup removal: <exact command and result>
```

Mark only packages added or replaced by Setup as owned. Reused packages remain user-owned. Use `verification_pending` while either isolated fresh-context transcript is unavailable or failing; keep Setup installed and name the exact next fixture action. Use `current` only after both active-mode fixtures pass or install-only verification succeeds. Update the receipt after verification and after Setup removal. A `failed` receipt must name the next safe action.
