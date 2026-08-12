---
name: creating-skills
description: Use when creating or editing agent skills.
license: MIT
disable-model-invocation: false
metadata:
  homepage: https://github.com/JustYannicc/skills
  harness: [claude, codex]
---

# Creating skills

Goal: a skill the model pulls in on its own and acts on. The user expected one thing and the agent did another. That gap is the skill, and one skill closes one gap. This file is the example.

## Descriptions are triggers

Every skill's description sits in context at once, and the model reads it to decide whether to open the file. Trigger wording pulls the skill in when it applies. A line in `AGENTS.md` naming the skill pushes it into every request instead.

BAD
> ❌ description: This skill helps you create and improve agent skills by providing guidance on frontmatter, descriptions, invocation metadata, and good/bad examples.

GOOD
> ✅ description: Use when creating or editing agent skills.

Frontmatter decides who reads that description:

```yaml
disable-model-invocation: false   # the model may load the skill on its own
```

Setting `true` withholds the description from the model, leaving the user as the only caller. Decide it per skill.

## Show the behavior, don't describe it

Prose about quality gives the model nothing to match. A concrete instance does.

- **State the target.** Do not think about an elephant. A prohibition loads the behavior it forbids, so name the wanted behavior and keep the prohibition inside a BAD label.
- **Fewest words that carry the meaning.** When a shorter wording reads the same, the longer one is waste.

```md
## PR titles

Title the effect, not the mechanism.

BAD
> ❌ perf(server): negotiate permessage-deflate on the websocket

GOOD
> ✅ perf(server): cut websocket frame size by 70%+ with gzipping
```

## Test with a real case

Old Codex and Claude Code threads hold real cases of the gap. Replay one in a fresh session with the skill installed. Two results confirm it: the model loads the skill without being told, and the output matches what the user wanted.
