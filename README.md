# Skills for Systems That Need to Work

[![skills.sh](https://skills.sh/b/JustYannicc/skills)](https://skills.sh/JustYannicc/skills)

Systems thinking changes the question from “How do I complete this task?” to “What has to be true for this to work?” That shift can make a huge difference almost anywhere. It reveals the conditions a task depends on, helping you solve the right problem and produce a result that holds up in real life rather than a fix that only works in isolation. This suite makes that thinking available when the work calls for it. Bounded work stays bounded. Work with real consequences gets the depth it deserves.

This project came from a need to formalize a way of thinking that had lived mostly in my head. I realized a while ago that many of the fundamentals I learned in programming also applied to life. Designing software systems that work and designing systems for life rely on many of the same principles. The terminology is different, but the underlying thinking has a lot in common.

**[Thinking in Systems](skills/thinking-in-systems) is my secret sauce.** It grew out of roughly a year and a half of learning what helps me create things that actually work. As someone with ADHD, I need to design systems for my life as much as I need to design them for software. Before I wrote the method down, I had to remember and apply it as I went. Formalizing it helps me use what I know more consistently and gives agents a method they can follow too. By sharing it, I hope to help other people develop systems that work.

That shared method lets me treat agents less like autocomplete and more like employees. It gives them enough clarity to take on broader work without losing sight of the outcome.

I used [Matt Pocock](https://x.com/mattpocockuk)'s [agent skills](https://github.com/mattpocock/skills) every day for development. They fundamentally changed how much I can do with agents. His workflow is excellent, but it was designed specifically for software development. I wanted to make it universal and use my systems-thinking approach everywhere.

Thinking in Systems is my method. Matt's skills showed me how focused agent skills can carry a workflow. This suite turns that idea into a pull-based set of systems skills that load as the work calls for them.

## Installation

Install Setup by itself. It inspects the selected scope before proposing package and instruction changes.

For one project:

```bash
npx skills add JustYannicc/skills --skill setup-system-thinking
```

For global use:

```bash
npx skills add JustYannicc/skills --skill setup-system-thinking --global
```

Invoke `/setup-system-thinking` inside your agent. One run manages one scope. Setup presents the exact package plan and the always-loaded systems-thinking primer before writing.

The standard profile installs 17 local runtime skills and two upstream dependencies. It preserves unrelated packages and replaces a same-name package only with approval.

## How the suite works

The primer in `AGENTS.md` or `CLAUDE.md` teaches the foundational systems-thinking lens. Model-invoked skills load when their leading terms match the work, and each skill owns its detailed methods, records, templates, and completion criteria. The suite has no mandatory universal route. User-invoked skills run only when called.

[Thinking in Systems](skills/thinking-in-systems) supplies the governing method. Its [shared context](skills/thinking-in-systems/references/CONTEXT.md) defines the language used across the suite. Focused skills own the reasoning attached to each term.

Stable semantics live in standards. A project can extend or relocate those standards without changing their shared meaning.

## System records

[Representing Systems](skills/representing-systems) defines a versioned Hypertext Markup Language (HTML) system record that works across domains. The record models components through their relationships and interface contracts. Component internals stay hidden unless they become material.

Project records default to `.agents/systems/`. Global records default to `~/.agents/systems/`. An explicit project instruction can override either location.

The [system record standard](skills/representing-systems/references/SYSTEM-RECORD.md) uses semantic HTML as both record and inspectable view. Each scope has one registry overview and versioned records that link back to it. The [block grammar](skills/representing-systems/references/BLOCKS.md) represents flow without executing it.

Lifecycle state remains separate from implementation. A candidate may be simulated or piloted before adoption. Promotion requires evidence at its proof seams.

Shared source material lives in [SOURCES.md](SOURCES.md), outside the individual skills.

## Skill guide

### Plan

- **[Wayfinder](skills/wayfinder)**: resolves decisions that block a route to the goal
- **[Prototype](skills/prototype)**: runs a reversible experiment to answer one question
- **[To Spec](skills/to-spec)**: turns accepted decisions into a specification and system map
- **[To Tickets](skills/to-tickets)**: decomposes accepted work into verifiable slices

### Think in systems

- **[Thinking in Systems](skills/thinking-in-systems)**: finds the system producing the observed behavior
- **[Domain Modeling](skills/domain-modeling)**: resolves operative language
- **[Framing Decisions](skills/framing-decisions)**: separates a decision from its presentation
- **[Choosing Interventions](skills/choosing-interventions)**: compares interventions and establishes mise en place
- **[Representing Systems](skills/representing-systems)**: creates versioned system records and projections
- **[Designing Interfaces](skills/designing-interfaces)**: defines interface contracts and proof seams
- **[Implementing Systems](skills/implementing-systems)**: carries an accepted change into reality
- **[Automating Systems](skills/automating-systems)**: places deterministic enforcement and model judgment
- **[Operating a System](skills/operating-a-system)**: governs degraded operation and recovery
- **[Evaluating Systems](skills/evaluating-systems)**: separates verification from validation
- **[Changing Systems](skills/changing-systems)**: governs pilots, rollout, adoption, and retirement
- **[Governing Systems](skills/governing-systems)**: assigns authority, responsibility, and ownership

### Verify

- **[Review](skills/review)**: checks an exact target against its input and governing standards

### Maintain the suite

- **[Setup System Thinking](skills/setup-system-thinking)**: installs, updates, repairs, and reconfigures one scope
- **[Creating Skills](skills/creating-skills)**: teaches this repository's skill-authoring method

## Upstream dependencies

Setup installs these packages from [Matt Pocock's skills repository](https://github.com/mattpocock/skills):

- `grilling`
- `research`

The local suite replaces Matt's same-name packages where its cross-domain behavior differs. Setup leaves unrelated upstream packages unchanged.

## Develop and verify

Enable live development links:

```bash
./scripts/skills-mode dev
```

Check the current mode:

```bash
./scripts/skills-mode status
```

Regenerate Codex metadata after editing a skill:

```bash
node scripts/generate-openai-yaml.mjs
node scripts/generate-openai-yaml.mjs --check
```

Run the installation-mode fixture:

```bash
./scripts/test-skills-mode.sh
```

Use `./test-env/open.sh dev` for an isolated console with the checkout mounted read-only. Use `./test-env/open.sh consumer` to test the public Setup flow without inheriting host skills or instructions.

## Distribution

GitHub is the public source of truth. `skills.sh.json` controls repository-page grouping. The install commands track the default branch. The `v2.0.0` tag marks the major overhaul, and later release tags preserve reviewed corrections.

## Credits

Thinking in Systems is Yannic's original method. The suite uses the skill-design approach established by [Matt Pocock](https://github.com/mattpocock/skills), and several planning skills began as cross-domain adaptations of his work.

The Setup pattern and this README also draw from Matt's public skills. His upstream authorship does not imply endorsement of this suite.
