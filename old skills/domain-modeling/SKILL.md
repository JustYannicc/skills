---
name: domain-modeling
description: Establish and preserve shared terminology. Use when the operative meaning, classification, or scope of a term is unclear or conflicting, or when another skill encounters a terminology blocker.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Domain Modeling

Establish and preserve shared terminology. Challenge conflicting terms, sharpen fuzzy language, stress-test boundaries with concrete scenarios, cross-reference authoritative reality, and record accepted meanings as they crystallize. Reading an existing language record is ordinary context use; invoke this skill when the language itself must change.

Join the active `'Workflow'` context when one exists. When Grill With Docs invokes this skill, maintain the shared language throughout its interview while Grilling retains the decision frontier. Domain Modeling owns only the bounded language result and never the parent Outcome.

## Establish the language boundary

1. Identify the smallest terminology question. State the intended referent, the scope in which the meaning must hold, the Actors who use it, and the decision or handoff it must support. Name the Actor with semantic decision Authority to accept the operative meaning in that scope; keep that Authority distinct from permission to write the Adapter. An architecture, policy, Specification, or implementation request remains with its owning capability unless terminology is the actual blocker. Complete when the question, scope, Actors, accepting Authority, and blocked use are explicit or the missing Authority is visible.

2. Read the canonical language record through the selected Adapter and bind its exact source revision. Preserve the Adapter's native locator and representation. If several contexts could apply, identify the correct one or ask one discriminating question. If no record exists, wait until the first term is accepted and write Authority is available before creating the smallest useful record. Complete when the applicable authority and revision are known, or the missing source, Adapter, or Authority is visible.

3. Collect candidate meanings from the user's words, authoritative sources and artifacts, relevant Actors, and observed practice. Bind every Material mutable source to its canonical locator and exact inspected revision. In technical work, compare specifications, interfaces, schemas, and observed behavior; in other domains, compare policies, routines, forms, conversations, and observation. Separate facts, decisions, assumptions, and unknowns. A contradiction is evidence to surface, not permission to choose a convenient meaning. Unverifiable or stale decisive evidence leaves the affected meaning proposed or conflicted.

   If the `terminology-evidence` Extension point is configured, give its Supplemental skills the terminology question, scope, candidates, and relevant sources. Each returns source-bound findings and unresolved gaps. Domain Modeling integrates that evidence and remains responsible for the language result. An advisory failure is recorded and the core procedure continues when its completion criterion remains satisfiable; a required failure becomes a visible capability gap and blocks durable completion. Complete when every candidate meaning has its source and evidence status, or a named gap.

## Sharpen and stress-test

4. Propose one canonical label and an operative meaning that says what the term refers to, where its boundary lies, and what it excludes. Keep the meaning to one or two sentences that two competent readers can apply alike. Classify nearby labels as aliases when they share the referent, avoided labels when they should not be used in this scope, or conflicts when their referents or boundaries differ. Preserve a stable accepted meaning unless an authorized correction replaces it. Bind the accepting Actor's decision to the exact proposal revision. Without accepted semantic decision Authority, keep the proposal visible and ask the smallest decision question. Complete when each relevant label has one classification and each meaning is either accepted at an exact proposal revision or visibly unresolved.

5. Start with substitution and a good-case/near-miss boundary scenario. If ambiguity or Material risk remains, vary only the dimension that distinguishes the candidates: lifecycle state, Actor or Authority, relationship direction or containment, or the presence of a relied-on source or capability. Stop when two competent readers converge or the remaining conflict and smallest discriminating question are explicit. Complete when every accepted meaning survives a good case and near miss, or the conflict has a named owner and next question.

Use the authoritative System relationship definitions already loaded from the `'Thinking in Systems'` skill. If that capability is unavailable, leave the System relationship unresolved and report the missing authority. For concepts that are not Systems, record an explicit domain relationship instead of borrowing Workflow's record relationships.

## Record meanings as they crystallize

6. Write each accepted term through the selected Adapter immediately after verifying its semantic acceptance, decisive source revisions, and separate write Authority. Preserve the host's native structure. When the Adapter has no established language-record shape, read the [language record template](references/language-record-template.md) and adapt it to the host.

   Write mutually dependent entries in one Adapter batch or transaction; an Adapter without atomic group writes exposes a capability gap for that change. Independent entries may be written sequentially. Reread the exact language-record guard after every committed entry. If a later write fails, stop and return the committed identities and result revisions, the uncommitted remainder, the incomplete aggregate change, and the exact recovery action.

   For an existing durable record, guard the write with the exact language-record source revision or the Adapter's equivalent stale-write protection. Stale decisive evidence, a stale language-record revision, missing semantic decision or write Authority, or an unavailable guard leaves the candidates and conflict intact and returns an exact resumption action. If the Adapter is unavailable, return the proposed entries as explicitly non-durable and name the capability needed to persist them. A Durable update's proof includes the exact accepted proposal revision and accepting Actor, decisive source locators and revisions, Adapter-managed record identity, owner, canonical locator, transition history, and exact language-record source and result revisions. Complete when the authorized write returns that proof, or the proposal, conflict, partial state, and persistence gap are truthfully preserved.

## Return the language result

7. Return the terminology question and scope; semantic decision Authority and acceptance evidence; entries changed or proposed; aliases, avoided labels, conflicts, and relationships; decisive scenarios and exact source locators and revisions; the Adapter locator and language-record source/result revisions when available; any partial committed state; and every unresolved question, capability gap, and exact next action. Return a qualifying architectural or policy trade-off to `'Workflow'` for its owning decision record rather than deciding it here.

Completion means every relevant term has one operative meaning or a visible unresolved conflict, the persistence claim is truthful, and the parent Outcome remains with `'Workflow'` or the caller.

## Boundary

This skill establishes and preserves shared terminology. It does not own architectural or policy decisions, research, Specifications, Tickets, implementation, Review verdicts, migration, handoffs, the Grilling interview, or parent completion. Return the bounded language evidence and stop.
