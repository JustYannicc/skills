---
name: implementing-systems
description: Use when carrying an accepted system change into reality.
license: MIT
disable-model-invocation: false
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Implementing systems

Turn an accepted change into a real state change while preserving the outcome, interfaces, and ability to recover.

Apply `thinking-in-systems`, `choosing-interventions`, and `designing-interfaces`. Apply `changing-systems` when an existing system, actor, or installed state must transition.

## Bind the outside before the inside

Bind the accepted outcome, current state, system context, interface contracts, and proof seams.

Inspect the actual state and effect authority before changing it. Preserve material uncertainty instead of redesigning during implementation.

## Prepare the effect

Establish mise en place through `choosing-interventions`.

Choose the smallest coherent slice that produces truthful observable progress. Cross internal boundaries when the interface contract requires it.

## Change through the seam

Implement internal behavior behind the accepted interface. Preserve established mechanisms and conventions unless changing them is part of the accepted intervention.

After each material effect, observe the actual state and propagate relevant change through dependencies. Stop before the next effect when authority, assumptions, conditions, or recoverability no longer match the bound change.

Exercise the result at the proof seam. Internal inspection may diagnose a failure or assess maintainability, efficiency, and safety; it does not substitute for observable behavior at the interface.

## Return a truthful state

Return the truthful implementation state and its proof. If work stops partway, preserve the recovery state and resumption condition.

Implementation is complete when the interface contract works at the proof seam and the system state is consistent. Completion does not promote the version's lifecycle state.
