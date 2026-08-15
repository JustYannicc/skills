---
name: prototype
description: Use when a proposed change has not demonstrated its behavior or outcome, or when the cause of a problem remains uncertain.
license: MIT
disable-model-invocation: false
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Prototype

A prototype is one reversible experiment that answers one question. The question decides its shape.

The question need not arrive fully formed. Derive it from the hypothesis the current diagnosis or proposed change depends on.

Apply `thinking-in-systems` and read its `references/CONTEXT.md` before prototyping. Use its language throughout.

Prototype is responsible for the experiment through its verdict. The actor with authority over the resulting decision remains responsible for what happens next.

## Find the question

Start with the system behavior to explain or test. Identify one causal assumption whose answer could change what should happen next.

Apply `evaluating-systems` to express that assumption as a hypothesis and determine what evidence would answer it. Use existing evidence when it is sufficient; a prototype earns its cost by producing evidence that does not yet exist.

Proceed when a bounded experiment can produce decision-relevant evidence at acceptable cost. Otherwise return the question to the caller.

A large change may contain many prototype questions. When several qualify, apply `choosing-interventions` to decide which experiment is worth running first. Keep the rest visible and run one experiment at a time.

> “My laptop prevents me from studying” is a hypothesis. Test whether removing access changes study behavior while the rest of the system stays comparable. If it does not, the failed hypothesis is evidence to investigate another cause, such as repeated decision points.

## Build the smallest experiment

Read [Experiment patterns](references/experiment-patterns.md) and choose the least costly shape capable of answering the question. Before running it, make the evidence and reversible boundary explicit, including the stopping condition and disposition of any temporary state or artifact.

Low-cost experimentation helps only when it produces evidence. Generating more candidates without validating them creates output, not an answer.

Confine the intervention to the prototype boundary. Any effect beyond that boundary requires authority and a safe way to stop or recover.

Make the prototype trivial for its intended actor to exercise. Expose the relevant change in state and resulting outcome. Build only what makes the evidence trustworthy; the prototype is throwaway, not an early implementation.

## Return the answer

Run until the question is answered, the evidence proves insufficient, the reversible boundary is threatened, or another increment is not worthwhile.

Return one verdict: answered, inconclusive, or blocked. Bind it to the observed evidence and its limits. Record the resulting state and what happened to the prototype.

Return the answer to the actor with authority over the resulting decision. Preserve the prototype as a primary source only when it is needed to inspect or reproduce that evidence.
