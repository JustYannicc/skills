# Installation record

Maintain one human-readable Markdown record per Installation scope with a small YAML frontmatter block. The record is both the effective configuration source and the durable rollback index; it is not a credential store.

## Default locations

- Project: `.agents/system-thinking/installation.md` at the project root, unless the selected harness requires another project-native configuration location.
- Global: `${XDG_CONFIG_HOME}/system-thinking/installation.md` when `XDG_CONFIG_HOME` is set, otherwise `~/.config/system-thinking/installation.md`.

Show and approve a non-default location before writing it. Resolve symlinks and record both the logical path and physical target.

## Required frontmatter

```yaml
---
schemaVersion: 1
suiteSource: https://github.com/JustYannicc/skills
suiteRef: <immutable release tag>
suiteRevision: <immutable commit>
scope: project | global
status: applying | current | failed | removed
activation: active | inactive
updatedAt: <ISO-8601 timestamp>
---
```

## Required sections

### Targets

For each selected harness, record its CLI identifier, skill paths, instruction surfaces, logical and resolved paths, installation method, and verification state.

### Packages

For every suite-owned and upstream package, record name, role, source URL, immutable revision, source path, installed path, content fingerprint, target harnesses, prior disposition, and current disposition.

The package fingerprint is lowercase SHA-256 of one deterministic byte stream over every regular file and symbolic link below the resolved package root; exclude nothing. Sort entries by their UTF-8 relative path bytes with `/` separators. For each entry append its type (`file` or `symlink`), a NUL byte, relative path, a NUL byte, byte length in decimal, a NUL byte, exact file bytes or symlink-target bytes, and a final NUL byte. Hash the resulting concatenation. Compare source and installed roots using the same relative inventory; an added, missing, transformed, or unreadable entry is a mismatch.

The suite assumes the pinned skills CLI installs the package subtree verbatim; CLI lock and provenance files live outside the resolved package root. Release certification proves this inventory equality for every supported target and link/copy mode claimed by the release. If a selected target or mode transforms the package, mark it unsupported for that release and either use a certified mode such as `--copy` after preview or abort without mutation; never normalize away an unexplained difference.

### Overlays

Record the manifest revision and, for each patch, its target, declared hash, observed hash, application result, and installed-package fingerprint.

### Effective configuration

Record the selected Adapter, capability evidence, project keys that override global keys, inherited keys, provider bindings, Supplemental mappings and extension points, and visible degraded capabilities. Store no secrets.

### Managed instructions

For active mode, record every block's marker version, logical and resolved file paths, complete-file pre-write hash, block hash, surrounding-file post-write hash, and drift status. For install-only mode, record the declined activation choice and verified preservation hash for each inspected instruction file.

The marker fingerprint is lowercase SHA-256 of the exact UTF-8 bytes between the begin and end marker lines, including the final newline before the end marker and excluding both marker lines. Preserve the instruction file's existing line endings outside the block; generate the managed block with LF line endings.

### Activation evidence

Record each fresh-context probe, target, exact suite revision, observed public behavior, result, timestamp, and any finding.

### Recovery

Record the current and last-known-good revision, sufficient package and file state to restore each, objects introduced by the last run, exact targeted recovery commands, and the last rollback proof.

### History

Append one compact entry per Install, Repair, Update, Reconfigure, or Rollback transaction. Bind the operation, approved plan, changed-object set, proof, result, and Setup self-removal outcome.

Remove is the exception because the effective `installation.md` must be absent when removal succeeds. Before removing it, write a non-effective receipt at `.agents/system-thinking/history/removed-<timestamp>.md` for project scope or beside the global record under `history/removed-<timestamp>.md`. The receipt uses the required frontmatter and sections needed to bind the removed installation, approved plan, removed and preserved objects, proof, recovery commands, and Setup disposal. Start it with `status: applying`; set `status: removed` only after Setup is absent, or `status: failed` when Setup disposal fails. A subsequent Setup inspection checks incomplete receipts before offering a new Install or maintenance branch. A receipt is history and recovery evidence, never effective configuration.

## Layering

A project record overrides only keys it declares. All other keys inherit from the global record. Always show the effective merge before mutation and record the origin of every effective key. A project-local skill copy or instruction block needs an accepted reason: isolation, a distinct pinned version or harness, or a missing inherited capability.

## Atomicity and privacy

Write a candidate beside the current file, verify it, then replace atomically. Preserve permissions. Redact secrets from commands and evidence. Remove only the recorded `installation.md` file, never its containing directory. A record or removal receipt with `status: applying` or `status: failed` is incomplete and must route the next Setup run to inspection and recovery before ordinary maintenance.
