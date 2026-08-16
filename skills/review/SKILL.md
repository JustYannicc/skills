---
name: review
description: Use when reviewing completed or work-in-progress work against its originating input or governing standards.
license: MIT
disable-model-invocation: false
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Review

Review one exact target along two independent axes:

- **Standards**: does the target follow the rules and constraints that govern it?
- **Input**: does the target match its originating input and serve the established goal?

Call the exact work under review the target. Pin its state or revision before reviewing it so every claim refers to the same thing.

Apply `thinking-in-systems` to preserve the goal and use the language in its `references/CONTEXT.md`. Let the other focused systems skills load when their descriptions match the target. Keep their guidance in its owning skill; Review records the resulting evidence.

When the target exposes an interface, apply `designing-interfaces` and bind the proof seam. Review observable behavior there; review internal quality only through the Standards axis or when the originating input makes it part of the contract.

Run both axes as **parallel sub-agents** when available so their findings do not anchor one another. Otherwise, run them as separate passes and keep the first pass out of context until the second is complete.

## Review the pinned target

### 1. Pin the target

Use the target the user supplied. If it is unclear and cannot be inferred safely, ask for it.

Bind the target's exact state and the available evidence. When the target is a system or component, identify the boundary where its behavior becomes observable. When the target can change over time, bind a revision or timestamp.

Confirm that the target exists and is reviewable before either axis begins.

Continue when every review claim can be tied to the same target state and evidence, or when the absence of a reviewable target has been reported.

### 2. Identify the originating input

Look for the input that established what the target should do, in this order:

1. A reference the user supplied.
2. A linked item in the effort's work tracker or authoritative records.
3. Established decisions in the current conversation.
4. If nothing is found, ask the user. If no originating input exists, skip the **Input** axis and report `no originating input available`.

Read the full source and its relevant discussion. Bind its goal and the scope of accepted work, including any rules and constraints it establishes.

Continue when the exact originating input is bound or its absence is explicit.

### 3. Identify the standards sources

Bind the project's governing standards and their versions. Project instructions choose their location and precedence. Never invent a standard from preference.

If no governing standards exist, skip the **Standards** axis and report `no governing standards available`. If neither axis has a source, report that no review basis exists and stop.

Continue when every applicable standards source is bound and any precedence conflict is resolved or recorded.

### 4. Run both axes independently

Give both reviewers the exact target state, available evidence, and applicable system boundary. Give each reviewer only the material for its axis.

**Standards reviewer prompt** includes:

- The governing standards.
- The brief: “Report every rule or constraint the target violates. Cite the exact standard and the observation that demonstrates the violation. Distinguish explicit violations from judgment calls needed to interpret a standard. Use only the bound standards. Stay under 400 words.”

**Input reviewer prompt** includes:

- The originating input and its established goal.
- The brief: “Report anything the input requires that is missing or partial, anything outside the accepted scope, and anything present that does not produce the expected output or outcome. Cite the originating input for each finding. When reviewing a system or component, observe its contract at the proof seam; internal evidence cannot substitute for behavior there. Stay under 400 words.”

Skip an axis whose source is unavailable and preserve that limitation in the report.

Continue when every applicable reviewer has returned findings tied to exact evidence.

### 5. Aggregate

Present the reports under `## Standards` and `## Input`, verbatim or lightly cleaned. Do **not** merge or rerank findings. The axes remain separate so success on one cannot hide failure on the other.

For every finding, preserve the violated rule or unmet input requirement, exact observation, consequence, and smallest corrective action. End with a one-line summary giving the finding count and worst issue within each axis. Do not choose one winner across axes.

Review is complete when every finding points to exact evidence, both axes have an explicit status, and the report remains bound to the pinned target.

A passing review verifies the target revision. It does not promote a system version or prove adoption.

Return the findings to the responsible actor. Correction is separate work.

## Why two axes

A target can pass one axis and fail the other:

- Work that follows every standard but produces the wrong behavior → **Standards pass, Input fail.**
- Work that does exactly what was requested but violates a governing standard → **Input pass, Standards fail.**

Reporting them separately stops one axis from masking the other.
