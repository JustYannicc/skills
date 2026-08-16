---
name: to-spec
description: Use when an established goal and its accepted decisions need to become a specification.
license: MIT
disable-model-invocation: false
metadata:
  homepage: https://github.com/JustYannicc/skills
---

Synthesize established decisions from the current context and any completed Wayfinder map into a specification. A specification is a system representation: it describes the intended system but does not make it real. Work from established decisions. Ask only to confirm proposed proof seams; return every other material gap to planning.

Apply `thinking-in-systems` to preserve the accepted goal and use the language in its `references/CONTEXT.md`. Let the other focused systems skills load when their descriptions match the work. Keep their guidance in its owning skill; the specification records the resulting decisions.

When a material decision is missing, return the exact gap to planning instead of inventing an answer.

## Turn decisions into a specification

1. Explore the current system and its authoritative records to understand its state. For software, inspect the repository. Use the established domain vocabulary throughout the specification and respect accepted decision records.

Continue when the current state and every authoritative decision in scope are known.

2. Apply `representing-systems` to make the intended system traceable, then apply `designing-interfaces` and sketch the proof seams where the required behavior will be evaluated. Prefer existing seams to new ones and use the highest system boundary possible. If a new seam is needed, propose it at the highest point that exposes the behavior. Fewer seams are better; the ideal is one when one can prove the required behavior.

Check with the user that these seams match their expectations. If the answer exposes a material undecided seam, return that gap to planning.

Continue when the proof seams are accepted or the exact gap has returned to planning.

3. Write the specification using the template below, then publish it to the effort's work tracker. If no tracker is available, use local Markdown. Mark it `ready-for-agent` only when another actor can act from it without inventing a material decision. No additional triage is needed.

<spec-template>

## Problem Statement

The problem from the affected actors' perspective. Include the current state of the relevant system and the trigger that made change necessary.

## Goal

The desired state or result the accepted intervention is meant to bring about.

## Solution

The accepted intervention from the affected actors' perspective.

## System Map

The purpose-bound system record returned by `representing-systems`. Include only material traceability.

## User Stories

A numbered list covering every materially distinct actor-visible behavior. Each user story should be in the format of:

1. As an <actor>, I want <behavior or capability>, so that <goal>

<user-story-example>
1. As a mobile banking customer, I want to see my account balances, so that I can make informed decisions about my spending.
</user-story-example>

Cover the complete accepted behavior without repeating the same interaction in different words.

## Constraints

The limitations that restrict a valid implementation or operation of the system.

## Interfaces and Proof Seams

The accepted observable contracts and proof seams returned by `designing-interfaces`. Preserve what each side may rely on without prescribing hidden internals.

## Implementation Decisions

The accepted decisions that constrain implementation. Use the shared language and disclose informed exceptions. Do not restate the system map or interface contracts.

Keep implementation decisions durable. Omit specific file paths and implementation snippets by default because they may change without changing the accepted decision.

Exception: if a prototype produced a snippet or artifact that encodes an accepted decision more precisely than prose can, include it within the relevant decision and identify its source. Trim it to the decision-rich parts. Preserve the decision, not a working implementation.

## Testing and Evaluation Decisions

The accepted assurance strategy. Bind each claim to its proof seam and decision rule. Keep verification, validation, and sustainment distinct.

## Out of Scope

What lies outside the specification's boundary.

## Further Notes

Any further context needed to interpret the specification.

</spec-template>

Complete when the published specification has been reread from the tracker and another actor can use it without inventing a material decision.
