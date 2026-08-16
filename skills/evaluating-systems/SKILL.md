---
name: evaluating-systems
description: Use when determining whether a system works or should change.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Evaluating systems

Evaluate a system by what it produces. A system can operate exactly as designed and still fail its intended outcome.

## State what should happen

Express the intervention as a causal hypothesis:

> **Changing X should improve Y under Z conditions because of M.**

Establish what happens before the intervention. Choose an observation window long enough for its proposed mechanism to produce evidence.

## Separate operation from outcome

Verification determines whether the system behaves as designed. Validation determines whether that behavior improves the intended outcome.

An apparent improvement can still fail when its cost is unacceptable or it cannot be sustained. Treat those as distinct claims rather than folding them into a single success metric.

## Observe at the proof seam

Apply `designing-interfaces` to choose the highest interface where the affected actor or dependent system can observe the claimed behavior. Verify the interface contract there. Internal state, logs, or implementation tests may explain the result, but they do not replace evidence at the proof seam.

Evaluate internal quality separately when it can change reliability, cost, safety, maintainability, or another accepted outcome or standard.

## Keep metrics subordinate to outcomes

Ask how a metric could improve while the underlying outcome worsens. Use a counter-signal to expose that failure mode.

A proxy can inform a decision. It cannot become the goal.

## Decide from the evidence

Set the decision rule before interpreting the result. The evidence should determine what happens to the intervention next.

Return the evidence to the lifecycle decision. Evaluation does not promote a system version.

Re-evaluate when the system that produced the evidence has materially changed.

Stop when the evidence supports a decision or when the next observation and the decision it could change are clear.
