# ADR Format

ADRs live in `docs/adr/` and use sequential numbering: `0001-slug.md`, `0002-slug.md`, and so on.

Create the `docs/adr/` directory lazily — only when the first ADR is needed.

## Template

```md
# {Short title of the decision}

{One to three sentences stating the context, accepted decision, and why it was chosen.}
```

That's it. An ADR can be a single paragraph. The value is in recording *that* a decision was made and *why* — not in filling out sections.

## Optional sections

Only include these when they add genuine value. Most ADRs will not need them.

- **Status** frontmatter (`proposed | accepted | deprecated | superseded by ADR-NNNN`) — useful when decisions are revisited.
- **Considered Options** — only when the rejected alternatives are worth remembering.
- **Consequences** — only when non-obvious downstream effects need to be called out.

## Numbering

Scan `docs/adr/` for the highest existing number and increment it by one.

## When to offer an ADR

All three conditions must be true:

1. **Hard to reverse** — the cost of changing the decision later is meaningful.
2. **Surprising without context** — a future actor would wonder why the system was designed this way.
3. **The result of a real trade-off** — genuine alternatives existed and one was selected for specific reasons.

If a decision is easy to reverse, skip the ADR because the decision can simply be reversed. If it is unsurprising, future actors will not need the explanation. If there was no real alternative, there is nothing to record beyond choosing the obvious path.

### What qualifies

- **Structural shape.** Record consequential choices about how a system is arranged. In software, this includes choices such as a monorepo or an event-sourced write model.
- **Interaction patterns between contexts.** Record how contexts affect or provide things to one another when that relationship constrains future behavior.
- **Technology choices that carry lock-in.** Record databases, message buses, authentication providers, deployment targets, and comparable choices that would be costly to replace.
- **Boundary and scope decisions.** Record where the system boundary lies and which components remain outside the accepted scope.
- **Deliberate deviations from the obvious path.** Record why the system uses an approach a reasonable future actor might otherwise “correct.”
- **Constraints not visible in the system representation.** Record constraints that materially restrict valid behavior but cannot be inferred by inspecting the system.
- **Rejected alternatives when the rejection is non-obvious.** Record the reason when an alternative is likely to be proposed again without it.
