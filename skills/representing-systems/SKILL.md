---
name: representing-systems
description: Use when mapping, versioning, or visualizing a system as a node-and-connection model.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Representing systems

Make the relevant behavior of a system visible. A system representation is a view of the system, not the system itself.

## Represent for a purpose

Ask:

> **What must this representation make understandable?**

Choose a boundary that serves that purpose. Show only what explains the relevant behavior.

Establish the system context at the representation's chosen boundary.

Make material structure and behavior traceable regardless of domain.

Let the question determine the form. Use the representation that makes the relevant behavior easiest to trace.

## Use a node-and-connection contract

When a representation must persist, instantiate the system record standard.

Read the [system record standard](references/SYSTEM-RECORD.md) and [block grammar](references/BLOCKS.md). Keep one Hypertext Markup Language (HTML) record canonical and choose the projection that best serves the question. Prefer an established format when it already expresses the system faithfully.

Register every durable record at its governing scope. A material change creates a new version and updates the registry.

Apply `designing-interfaces` at every material interface. A component may hide its internals when its interface contract remains traceable.

Represent control flow with control blocks and guarded connections. Keep proof seams on the ports where behavior crosses the interface.

## Preserve the truth behind the view

A derived view names its authoritative source and shows when it may be stale. Preserve uncertainty instead of completing the picture with plausible detail.

When mapping an existing system, record observed reality before proposing change. Mapping is not an intervention. A proposed successor is a separate version linked to the observed predecessor.

An executable representation must make the path from trigger to outcome traceable. It remains a proposal until a mechanism implements it.

Stop when another reader can understand the relevant behavior without inventing part of the system and can see what the representation leaves out.
