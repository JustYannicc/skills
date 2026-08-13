---
name: automating-systems
description: Use when turning a process into automation or deciding where AI judgment belongs.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Automating systems

Turn defined behavior into reliable execution. Automation is an intervention, not the outcome it is meant to produce.

## Put each decision in the right place

Ask:

> **What must be enforced, and what requires judgment?**

Use a deterministic mechanism when behavior must be repeatable or enforceable. Use an AI model only when the work genuinely requires interpretation.

Keep human values with the relevant person. A model can exercise delegated judgment, but it cannot create its own authority.

## Bound uncertainty and effects

Define what each model judgment may decide and what happens when it is uncertain. Uncertainty can narrow or pause an action. It cannot widen authority.

Trace each action back to its trigger and forward to its output. Give durable state one writable owner. A failed attempt must preserve enough state to recover without reconstructing what happened.

Test the intended execution path while disabling its real-world effects. A simulation that takes a different path does not prove the automation.

Routine deterministic behavior may recede from attention. Exceptions that require judgment must remain visible.

Stop when the automation behaves reliably without model failure causing an unauthorized effect or destroying recovery state.
