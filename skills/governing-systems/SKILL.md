---
name: governing-systems
description: Use when authority or responsibility within a system must be assigned.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Governing systems

Make authority and responsibility match the system's real behavior. Governance exists to remove consequential ambiguity, not to create ceremony.

## Separate authority from responsibility

Ask:

> **Who has authority, and who remains responsible for the outcome?**

Authority permits a decision or effect. Responsibility binds an actor to a bounded result. Ownership retains responsibility for the whole system. Capability does not create any of them.

Delegation assigns responsibility without transferring ownership. Ownership transfers only when a successor explicitly accepts it.

## Make boundaries transferable

A handoff succeeds only when the recipient knows what it is accepting and can tell when its responsibility ends. Preserve the state needed to continue when the transfer fails or must be resumed.

An actor may propose a change to its own authority. It may approve that change only through authority granted independently.

An informed exception shows the authorized decision-maker what protection is being given up and what consequence may follow. It also defines when the exception must be reconsidered.

## Govern only as deeply as consequence warrants

Stop when consequential decisions have clear authority and responsibility. Keep bounded reversible actions free of governance that cannot change their result.
