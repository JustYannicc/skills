---
name: operating-a-system
description: Use when a recurring system must remain useful when normal operation fails.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Operating a system

Design how a system behaves over time. A successful path is not enough if the system cannot preserve what matters and recover.

## Define what must survive

Start with the healthy baseline and ask:

> **What must remain true under the weakest realistic condition?**

Define the limited behavior that remains safe when normal operation is impossible. If no useful action remains, pause without losing the state needed to continue later.

Recovery restores the healthy baseline and proves that restoration before normal operation resumes.

## Make deterioration recoverable

Identify how the system can decay and which evidence would reveal it. Give the responsible actor a practical way to restore the baseline without erasing history.

Delayed attention must not turn a recoverable problem into an unknowable one. Preserve enough context that the system can resume without reconstructing the past.

## Monitor decisions, not activity

Monitor only when a signal can change a named decision. Remove the monitor when that decision no longer needs it.

Stop when the system behaves truthfully when impaired and can recover without losing required state. Operational health does not prove that the system achieves its intended outcome.
