---
name: transition-handoff
description: Use when someone has to stop mid-flow (lunch, a break, leaving, switching tasks) and wants to save their place, by dictating a mind dump, asking for a handoff or to "save my place", or saying they need to stop, go eat, or leave. Not for ordinary summaries or meeting notes.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Transition handoff

People who lose momentum at every break tend to skip the break: lunch, dinner, and sleep get pushed back because getting back in is hard. A handoff lets them stop on time. They dump what is in their head now; when they come back, a short narrated video puts them back where they were within a minute.

The video is for their future self, coming back cold. By its end they should know where things stand, what they were thinking, what to watch out for, and exactly what to do first.

## Take the dump

If they said they have to stop but haven't dumped yet, ask them to talk: where it stands, what they were thinking, what's next. Messy dictation is normal; keep their wording where it carries meaning.

Fill in facts you can find yourself from the conversation and the workspace: file paths, line numbers, branch, the last error, the command they were running. Never ask for those.

## Ask only what blocks re-entry

Check the dump for what someone coming back cold needs:

- the exact next move, concrete enough to start without thinking
- the half-formed idea or live theory, which is the first thing to evaporate
- the trap that would trip them up or waste their first ten minutes
- where the thing is: file, line, document, tab, or command

When one of these is missing or vague and context can't fill it, ask one short round in the `grilling` format: numbered questions, each with your recommended answer, worded so "yes" accepts it. Ask only questions whose answer changes the video, usually one to three. When the dump covers everything, ask nothing. They are about to leave, so one round is the limit; "just go" or no answer means your recommendations stand.

## Tell the story

Write a natural narrative to their future self, in second person and in their words where possible. Let the content decide the shape. It usually runs from where they were, through what they figured out and suspected, to the trap, and lands on the first move. Spend the most time on the live thinking and half-formed ideas; those are the hardest to rebuild. Keep uncertainty as uncertainty ("you think", "you weren't sure yet"). When the first move is your inference, say so in the narration. Aim for 45 to 90 seconds.

BAD
> Topic: webhook retries. Status: attempts one and two fail. Hypothesis: ack ordering. Next steps: one, add log. Two, replay.

GOOD
> You were chasing the Stripe retries that vanish after attempt two. Your theory: the worker acks the job before it schedules the retry, and the retry only lives in memory. So when the worker restarts, it's gone.

Open with when and why they stopped as the first label ("before lunch · 12:40"). End on a `close` scene holding the first move: short, concrete, with the file or command in it. Narrate in the language they dictated in.

## Make the video

Use the `making-videos` skill for the script format, rendering, and checks. If it is missing, install it with `npx skills add JustYannicc/skills --skill making-videos`.

Render to `~/Movies/Handoffs/<YYYY-MM-DD-HHMM>-<slug>.mp4` with `--inspect --open`, and put the original dictation in the script's `notes` so the transcript keeps it. Glance at the contact sheet and fix only what is clearly broken; they are on their way out.

Reply with the video path, its length, and the first move in one line.
