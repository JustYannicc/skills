---
name: representing-systems
description: Use when making a system understandable through a representation.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Representing systems

Make the relevant behavior of a system visible. A representation is a view of the system, not the system itself.

## Represent for a purpose

Ask:

> **What must this representation make understandable?**

Choose a boundary that serves that purpose. Show only what explains the relevant behavior.

Let the question determine the form. Relationships may need a map. Change over time may need a flow or state model. Uncertain behavior may need a simulation.

## Preserve the truth behind the view

A derived view names its authoritative source and shows when it may be stale. Preserve uncertainty instead of completing the picture with plausible detail.

An executable representation must make the causal path traceable from its trigger to its effects. It remains a proposal until a mechanism implements it.

Stop when another reader can understand the relevant behavior without inventing part of the system and can see what the representation leaves out.
