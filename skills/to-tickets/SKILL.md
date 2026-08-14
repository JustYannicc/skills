---
name: to-tickets
description: Use when turning a plan, specification, or the current conversation into executable tickets, or revising an existing ticket graph.
license: MIT
disable-model-invocation: false
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# To Tickets

Break a plan, specification, or conversation into a set of **tickets** — tracer-bullet vertical slices, each declaring the tickets that **block** it. Preserve its established goal throughout. Call this source the decomposition input.

Apply `thinking-in-systems` to preserve the goal and use the language in its `references/CONTEXT.md`. Let the other focused systems skills load when their descriptions match the work. Keep their guidance in its owning skill; the tickets record the resulting work.

If decomposition exposes a material decision the input did not settle, return the exact gap to planning instead of inventing an answer.

## Process

### 1. Gather context

Work from the decomposition input and whatever is already in the conversation context. If the user passes a reference, fetch it and read its full body and comments.

Continue when one exact decomposition input and every source needed to interpret it have been read, or a material gap has been returned to planning.

### 2. Explore the current system (optional)

If you have not already explored the current system, do so to understand its state. For software, explore the codebase. Ticket titles and descriptions should use the project's domain vocabulary and respect accepted decision records in the affected area.

Look for opportunities to prefactor the existing system or make an equivalent preparatory intervention. "Make the change easy, then make the easy change."

Continue when the current state and any necessary preparation are clear enough to bound the work.

### 3. Draft vertical slices

Break the work into **tracer bullet** tickets.

<vertical-slice-rules>

- Each slice cuts a narrow but COMPLETE path through the components and relationships needed to produce observable behavior. In software, that path may cross schema, API, UI, and tests — vertical, NOT a horizontal slice of one layer
- A completed slice changes the system in a way that is demoable or verifiable on its own
- Each slice is sized to fit in a single fresh context window or bounded work session
- Any necessary prefactoring or system preparation is done first

</vertical-slice-rules>

Check the set against the decomposition input. Every material in-scope item must be covered by a ticket or identified as a material gap. Exclusions remain out of scope.

Give each ticket its **blocking relationships** — the other tickets that must complete before it can start. A ticket with no blockers can start immediately.

**Wide refactors are the exception to vertical slicing.** A **wide refactor** is one mechanical intervention whose **blast radius** fans across the system, so applying it at once breaks working behavior and no vertical slice can land green. Renaming a database column or retyping a shared symbol are software examples; replacing an organization-wide rule has the same shape. Don't force it into a tracer bullet; sequence it as **expand–contract**. First expand: add the new form beside the old so existing behavior remains valid. Then migrate affected components in batches sized by blast radius — for software, per package or directory — each batch its own ticket blocked by the expansion, keeping validation green because the old form still exists. Finally contract: remove the old form after every migration is verified, in a ticket blocked by every migration batch. When even the batches cannot stay green alone, keep the sequence but let them share an integration branch or equivalent boundary that all block a final integrate-and-verify ticket — green is promised only there.

The draft is complete when every in-scope item from the input is covered and every exclusion remains outside the ticket set. Each ticket must be independently verifiable, and each blocker must genuinely gate its dependent ticket.

### 4. Quiz the user

Present the proposed breakdown as a numbered list. For each ticket, show:

- **Title**: short descriptive name
- **Blocked by**: which other tickets (if any) must complete first
- **What it changes**: the end-to-end behavior or state this ticket makes observable

Ask the user:

- Does the granularity feel right? (too coarse / too fine)
- Are the blocking relationships correct — does each ticket only depend on tickets that genuinely gate it?
- Should any tickets be merged or split further?

Iterate until the user approves the exact breakdown.

### 5. Publish the tickets to the work tracker

Publish the approved tickets to the effort's existing work tracker. If no tracker is available, use local Markdown. The tickets are the same either way; only the representation of their blocking relationships changes:

- **Local files** → write one file per ticket under `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` in dependency order (blockers first). Each file's "Blocked by" lists the numbers and titles it depends on. Use the per-ticket file template below — one ticket per file, never a single combined file.
- **A real issue tracker (GitHub, Linear, …)** → publish one issue per ticket in dependency order (blockers first) so each ticket's blocking relationships can reference real identifiers. Use the platform's native blocking or sub-issue relationship where it has one; otherwise set each ticket's "Blocked by" to the blocking issues. Apply the `ready-for-agent` triage label unless instructed otherwise — the tickets are agent-grabbable by construction.

Work the **frontier**: any ticket whose blockers are all done. For a purely linear chain that means top to bottom.

Do NOT close or modify any parent issue.

<local-ticket-template>

# <NN> — <Ticket title>

**What to change:** the end-to-end behavior or state this ticket makes observable from the affected actors' perspective — not a layer-by-layer implementation list.

**Blocked by:** the numbers/titles of the tickets that gate this one, or "None — can start immediately".

**Status:** ready-for-agent

- [ ] Acceptance criterion 1
- [ ] Acceptance criterion 2

</local-ticket-template>

<issue-template>

## Parent

A reference to the parent issue on the tracker (if the source was an existing issue, otherwise omit this section).

## What to change

The end-to-end behavior or state this ticket makes observable from the affected actors' perspective — not layer-by-layer implementation.

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Blocked by

- A reference to each blocking ticket, or "None — can start immediately".

</issue-template>

In either form, avoid specific file paths or implementation snippets — they go stale fast. Exception: if a prototype produced a snippet or artifact that encodes an accepted decision more precisely than prose can, include it and identify its source. Trim it to the decision-rich parts — not a working implementation, just the important parts.

This process is complete when every approved ticket and blocking relationship has been written, reread from the tracker, and found to match the accepted breakdown.
