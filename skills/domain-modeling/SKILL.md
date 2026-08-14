---
name: domain-modeling
description: Use when building a domain model, resolving unclear or conflicting terminology, or recording accepted language in CONTEXT.md.
license: MIT
disable-model-invocation: false
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Domain Modeling

Actively build and sharpen the domain model as the work develops. This is the *active* discipline — challenging terms, inventing edge-case scenarios, and recording accepted language and qualifying decisions when they crystallize. Merely reading an existing language record is ordinary context use; invoke this skill when the language itself must change.

Apply `thinking-in-systems` and read its `references/CONTEXT.md` before changing language. Use those terms with their established meanings. Let the other focused systems skills load when their descriptions match the work; Domain Modeling is responsible for shared terminology, not the substantive decisions it describes.

## Language records

A single context uses this structure:

```text
/
├── CONTEXT.md
├── docs/
│   └── adr/
└── src/
```

When `CONTEXT-MAP.md` exists at the root, it identifies several contexts and their relationships:

```text
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← system-wide decisions
└── src/
    ├── ordering/
    │   ├── CONTEXT.md
    │   └── docs/adr/                 ← context-specific decisions
    └── billing/
        ├── CONTEXT.md
        └── docs/adr/
```

Create files lazily — only when you have something to write. If no `CONTEXT.md` exists, create one when the first term is resolved. If no `docs/adr/` exists, create it when the first ADR is needed. Use the [CONTEXT.md format](references/context-format.md) when creating a language record.

## During the session

### Challenge against CONTEXT.md

When a term conflicts with the accepted language, surface the conflict immediately:

> `CONTEXT.md` defines “cancellation” as ending an entire Order, but you seem to mean cancelling one item. Which meaning should govern?

Identify the actor with authority to accept the operative meaning. Keep semantic authority separate from write authority.

### Sharpen fuzzy language

When language is vague or overloaded, propose one precise canonical label:

> You are saying “account.” Do you mean the Customer or the User? Those terms have different referents.

Give the term an operative meaning that states its referent and scope, with exclusions made explicit. Keep it short enough that two competent readers can apply it the same way. Treat equivalent labels as aliases and labels that would create ambiguity as avoided terms.

### Discuss concrete scenarios

Stress-test proposed meanings with a clear example and a near miss. When relationships are involved, invent scenarios that make the exact relationship and its effect on each component explicit.

Stop when the meaning survives the scenarios or the remaining conflict can be stated as one exact question.

### Cross-reference with reality

A language record is a system representation, not the system itself. Compare it with authoritative reality, including the language actors use and observed system behavior. In software, inspect the implementation too:

> The language record says only entire Orders can be cancelled, but the implementation cancels individual items. Which meaning should govern?

A contradiction is evidence to surface, not permission to choose the convenient meaning.

### Update the language record inline

When the actor with semantic authority accepts a meaning and write authority exists, record it immediately. Do not batch accepted terms until the end of the session. When write authority is absent, return the exact proposed entry without claiming it was persisted.

`CONTEXT.md` should be totally devoid of implementation details. Do not treat it as a specification, scratch pad, or store for implementation decisions. It is a language record and nothing else.

Treat accepted terminology as a contract. When an accepted meaning changes, preserve the prior meaning and every dependency that still uses it until the change has propagated.

### Offer ADRs sparingly

When terminology work crystallizes a substantive decision, let the responsible decision skill resolve it. After acceptance, offer to create an ADR only when all three are true:

1. **Hard to reverse** — the cost of changing the decision later is meaningful.
2. **Surprising without context** — a future actor would wonder why the system was designed this way.
3. **The result of a real trade-off** — genuine alternatives existed and one was selected for specific reasons.

If any condition is missing, skip the ADR. Use the [ADR format](references/adr-format.md) when one qualifies. Domain Modeling records the language around the decision; it does not make the decision.

## Completion

Domain Modeling is complete when every term in scope has one accepted operative meaning or one explicit unresolved conflict. Every persistence claim must match the language record's actual state, and substantive decisions remain with their responsible actors.
