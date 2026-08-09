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
updatedAt: <ISO-8601 timestamp>
---
```

## Required sections

### Targets

For each selected harness, record its CLI identifier, skill paths, instruction surfaces, logical and resolved paths, installation method, and verification state.

### Packages

For every suite-owned and upstream package, record name, role, source URL, immutable revision, source path, installed path, content fingerprint, target harnesses, prior disposition, and current disposition.

### Overlays

Record the manifest revision and, for each patch, its target, declared hash, observed hash, application result, and installed-package fingerprint.

### Effective configuration

Record the selected Adapter, capability evidence, project keys that override global keys, inherited keys, provider bindings, Supplemental mappings and extension points, and visible degraded capabilities. Store no secrets.

### Managed instructions

For every block, record marker version, logical and resolved file paths, complete-file pre-write hash, block hash, surrounding-file post-write hash, and drift status.

### Activation evidence

Record each fresh-context probe, target, exact suite revision, observed public behavior, result, timestamp, and any finding.

### Recovery

Record the current and last-known-good revision, sufficient package and file state to restore each, objects introduced by the last run, exact targeted recovery commands, and the last rollback proof.

### History

Append one compact entry per Install, Repair, Update, Reconfigure, Rollback, or Remove transaction. Bind the operation, approved plan, changed-object set, proof, result, and Setup self-removal outcome.

## Layering

A project record overrides only keys it declares. All other keys inherit from the global record. Always show the effective merge before mutation and record the origin of every effective key. A project-local skill copy or instruction block needs an accepted reason: isolation, a distinct pinned version or harness, or a missing inherited capability.

## Atomicity and privacy

Write a candidate beside the current file, verify it, then replace atomically. Preserve permissions. Redact secrets from commands and evidence. A record with `status: applying` or `status: failed` is incomplete and must route the next Setup run to inspection and recovery before ordinary maintenance.
