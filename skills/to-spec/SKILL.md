---
name: to-spec
description: Use when an established goal and its accepted decisions need to become a specification.
license: MIT
disable-model-invocation: false
metadata:
  homepage: https://github.com/JustYannicc/skills
---

Synthesize established decisions from the current context and any completed Wayfinder map into a specification. A specification is a system representation: it describes the intended system but does not make it real. Do NOT interview the user — just synthesize what is already known.

Apply `thinking-in-systems` to preserve the accepted goal and use its glossary consistently. Let the other focused systems skills load when their descriptions match the work. Keep their guidance in its owning skill; the specification records the resulting decisions.

When a material decision is missing, return the exact gap to planning instead of inventing an answer.

## Process

1. Explore the current system and its authoritative records to understand its state. For software, inspect the repository. Use the established domain vocabulary throughout the specification and respect accepted decision records.

2. Sketch the seams where the required behavior will be evaluated. Prefer existing seams to new ones and use the highest system boundary possible. If a new seam is needed, propose it at the highest point that exposes the behavior. Fewer seams are better; the ideal is one when one can prove the required behavior.

Check with the user that these seams match their expectations. If the answer exposes a material undecided seam, return that gap to planning.

3. Write the specification using the template below, then publish it to the effort's work tracker. If no tracker is available, use local Markdown. Mark it `ready-for-agent` only when another actor can act from it without inventing a material decision. No additional triage is needed.

<spec-template>

## Problem Statement

The problem from the affected actors' perspective. Include the current state of the relevant system and the trigger that made change necessary.

## Goal

The desired state or result the accepted intervention is meant to bring about.

## Solution

The accepted intervention from the affected actors' perspective.

## User Stories

A LONG, numbered list of user stories covering every actor-visible behavior. Each user story should be in the format of:

1. As an <actor>, I want <behavior or capability>, so that <goal>

<user-story-example>
1. As a mobile banking customer, I want to see my account balances, so that I can make informed decisions about my spending.
</user-story-example>

This list of user stories should be extremely extensive and cover all actor-visible aspects of the system. Each distinct behavior should appear once.

## Constraints

The limitations that restrict a valid implementation or operation of the system.

## Implementation Decisions

A list of accepted implementation decisions. This can include:

- The components or software modules that will be created, replaced, or changed
- The relationships, boundaries, and interfaces that will change
- Technical clarifications from the responsible actor or developer
- Structural or architectural decisions
- State or schema changes
- Input, output, or API contracts
- Rules and constraints the system must enforce
- Specific interactions and triggers
- Authority and responsibility where implementation depends on them

Do NOT include specific file paths or implementation snippets by default. They may become outdated without the accepted decision changing.

Exception: if a prototype produced a snippet or artifact that encodes an accepted decision more precisely than prose can, include it within the relevant decision and identify its source. Trim it to the decision-rich parts — not a working implementation, just the important parts.

## Testing and Evaluation Decisions

A list of testing and evaluation decisions that were made. Include:

- A description of what makes a good test or evaluation: observe external behavior, not implementation details
- Which components, modules, relationships, or interactions will be tested
- The system boundary and seams where behavior will be observed
- What evidence will verify the required behavior
- How resulting outcomes will be evaluated against the goal
- Prior art or comparable tests and evaluations from the existing system

## Out of Scope

What lies outside the specification's boundary.

## Further Notes

Any further context needed to interpret the specification.

</spec-template>
