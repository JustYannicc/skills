# CONTEXT.md Format

## Structure

```md
# {Context Name}

{One or two sentences describing the context and its scope.}

## Language

**Order**:
An accepted request for specified goods or services.
_Avoid_: Purchase, transaction

**Invoice**:
A request for payment issued after an Order reaches the agreed state.
_Avoid_: Bill, payment request

**Customer**:
The person or organization that places an Order.
_Avoid_: Client, buyer, account
```

## Rules

- **Be opinionated.** When several labels refer to the same concept, pick the best one and list the others under `_Avoid_`.
- **Keep definitions tight.** Use one or two sentences. State the referent and scope, make exclusions explicit, and include behavior only when it distinguishes the concept.
- **Only include terms specific to this context.** Terms already defined by an authoritative `CONTEXT.md` belong there instead of being redefined locally.
- **Group terms under subheadings** when natural clusters emerge. If every term belongs to one cohesive area, a flat list is fine.

## Single vs multi-context projects

**Single context:** One `CONTEXT.md` at the project root.

**Multiple contexts:** A `CONTEXT-MAP.md` at the project root lists the contexts, where they live, and how they relate to each other:

```md
# Context Map

## Contexts

- [Ordering](./src/ordering/CONTEXT.md) — receives and tracks Orders
- [Billing](./src/billing/CONTEXT.md) — issues Invoices and receives Payments
- [Fulfillment](./src/fulfillment/CONTEXT.md) — prepares and dispatches Orders

## Relationships

- **Ordering → Fulfillment**: Ordering provides accepted Orders for fulfillment
- **Fulfillment → Billing**: Fulfillment provides dispatch state used to issue Invoices
- **Ordering ↔ Billing**: Both contexts refer to the same Customer identity
```

The skill infers which structure applies:

- If `CONTEXT-MAP.md` exists, read it to find the contexts.
- If only a root `CONTEXT.md` exists, use the single context.
- If neither exists, create a root `CONTEXT.md` lazily when the first term is resolved.

When several contexts exist, infer which one the current topic belongs to. If unclear, ask one discriminating question.
