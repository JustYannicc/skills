# Verification

## Packages

- `npx skills list --json` for the selected scope shows all twelve local and four Matt runtime skills.
- The seven local successor names no longer resolve to Matt's versions.
- The four retained Matt packages contain the bundled corrections.
- Non-overlapping Matt skills and unrelated skills are unchanged.
- Skills lock state agrees with the filesystem.

## Instructions

- In active mode, the selected `AGENTS.md`, `CLAUDE.md`, or both contain exactly one marked activation block as the first substantive instruction section.
- In active mode, every detected conflict is resolved by an approved edit or reported as blocking reliable activation, and a fresh ordinary request uses `thinking-in-systems` before `workflow`.
- Surrounding unrelated instructions and symlinks are unchanged.

For install-only mode, prove instruction files are unchanged, no managed activation block was added, and one explicit suite invocation works. Do not claim automatic activation.

## Recovery

- The receipt matches the installed paths, sources, ownership dispositions, instruction files, corrections, and backup.
- Restoring the checkpoint affects only objects approved for this run.

## Setup removal

After the Done step runs the recorded command with the accepted scope and target flags, prove:

- Setup is absent from the filesystem and skills lock.
- All sixteen runtime skills remain.
- The receipt remains. In active mode, the accepted instruction block remains; in install-only mode, instruction files remain unchanged.

Any failed check leaves the run incomplete with an exact retry or restore action.
