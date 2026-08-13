# Language record template

Use this template only when the selected Adapter has no native language-record structure. Place the adapted body inside the Adapter's ordinary record; record identity, owner, canonical locator, transition history, Authority, and exact source and result revisions remain Adapter-managed metadata rather than duplicate template fields.

```md
# {Context name}

{One or two sentences defining the scope in which this language applies.}

## Language

**{Canonical term}**:
{One or two sentences defining what the term is, its boundary, and its exclusions.}

- **Scope:** {where the meaning applies}
- **Aliases:** {labels with the same referent; omit when none}
- **Avoid:** {noncanonical labels in this scope; omit when none}
- **Conflicts:** {competing meaning, source, and discriminating question; omit when none}
- **Relationships:** {typed links to authoritative terms or records; omit when none}
- **Status:** resolved | conflicted | unresolved
- **Accepted by:** {Actor with semantic decision Authority and exact accepted proposal revision; omit while unresolved}
- **Evidence:** {authoritative source or observation; include the exact revision for every mutable source}
- **Unresolved:** {smallest remaining question and owner; omit when none}
```

Status describes the terminology entry, not a Ticket lifecycle state.

Keep one canonical entry per scope. When several contexts exist, use an Adapter-native index that links to each context and records their relationships without copying definitions.
