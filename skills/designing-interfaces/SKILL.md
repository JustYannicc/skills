---
name: designing-interfaces
description: Use when defining or proving an observable interface contract or proof seam across systems.
license: MIT
disable-model-invocation: false
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Designing interfaces

Design what another component may rely on at a boundary.

Apply `thinking-in-systems` and use the language in its `references/CONTEXT.md`.

## Design from the outside in

Start with the actor or component on each side of the boundary and the outcome their interaction must produce.

Ask:

> **What must each side be able to rely on without knowing the other's internals?**

Prefer the smallest interface that exposes the required capability. Keep internal choices behind the boundary unless they become material.

## Define the contract at the seam

Record only what another component may rely on at a boundary.

### Interface contract elements

| Element | Meaning |
| --- | --- |
| Identity | Stable name and revision |
| Authority | Actor permitted to accept or change the contract |
| Purpose | Outcome the interaction serves |
| Input | What another component may supply |
| Output | What another component may rely on |
| Behavior | Observable state transition and timing |
| Failure | Observable failure and recovery |
| Operating envelope | Conditions under which reliance holds |
| Proof seam | Observation that proves the promised behavior at an input or output |

Name only the elements material to the interaction. Put each proof seam at the input or output where the behavior becomes observable.

Include the operating envelope whenever reliance changes with conditions. Preserve the same contract semantics across domains.

Create a new durable contract revision when its observable meaning changes. An internal change that preserves the contract does not create a new revision.

The named authority must accept a contract before another component relies on it.

## Place the proof seam

Attach proof to the input or output where the affected actor or dependent system can observe the required behavior. Evidence from inside a component can explain a failure; it does not substitute for evidence at the interface.

Review internal design separately when a governing standard makes it material. Interface proof and internal review establish different claims.

Stop when each side can act without inventing behavior, failures are observable and recoverable to the required degree, and the proof seam can distinguish a working contract from a broken one.
