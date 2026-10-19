# Script format

`render.mjs` reads one JSON file. Every line is voiced separately; its measured length sets when its visual appears.

```json
{
  "title": "Stripe retries vanish after attempt two",
  "language": "en",
  "voice": "af_heart",
  "captions": true,
  "notes": "Appended to the transcript, for example the source material.",
  "scenes": [
    {
      "kind": "flow",
      "label": "your theory",
      "lines": [
        { "say": "An attempt fails,", "show": "attempt fails" },
        { "say": "the worker acks the job first,", "show": "ack()", "sub": "job marked done" },
        { "say": "and only then schedules the retry, in memory.", "show": "scheduleRetry()", "sub": "in memory" },
        { "say": "So a restart takes the retry with it.", "focus": "scheduleRetry()", "note": "the retry dies with the worker", "mark": "dies", "tone": "warn" }
      ]
    }
  ]
}
```

Only `scenes`, each scene's `kind` and `lines`, and each line's `say` are required. `language` defaults to `en`. `title` names the output file and the transcript.

## Line fields

| Field | Meaning |
| --- | --- |
| `say` | What the voice says. Write it the way it should sound. |
| `show` | Short on-screen text for this moment, at most about eight words. |
| `mark` | Words in `show` to accent. The underline lands when they are spoken, so the words should also appear in `say`. |
| `sub` | A smaller supporting line under `show`. |
| `tone` | `accent` (default amber), `warn` (rust), `good` (green), `quiet` (grey). |

## Scene kinds

| Kind | Scene fields | How lines draw |
| --- | --- | --- |
| `title` | `title` | The title lands big with the first line. Later `show`s swap in underneath. |
| `say` | | Each `show` replaces the last one, with its `sub` below. |
| `list` | | Each `show` adds an item. `state`: `ruled-out` (struck through when the `mark` words are spoken; they may appear in `say` only), `live`, `done`, `open`. Use two to six items. |
| `flow` | | Each `show` adds a node left to right, up to five, with `sub` under its label. `focus` names a node (its exact label, or the one label containing it), lights it, sends a packet along the path to it, and shows `note` under it. A `show` line with `note` or `tone` focuses its own new node. |
| `code` | `file`, `code` | Real code, up to 14 lines, types in at the start. `highlight: "6-7"` lights those lines. `show` is the note under the panel. |
| `question` | | The first `show` is the question. Later `show`s are candidate answers. |
| `close` | | The first `show` is the takeaway or first action, held about 4.5 seconds after the voice ends. Later `show`s are listed as "then" steps. |

Put `close` last when the video should end on something to remember or do.

## Timing

Visuals land at the start of their line. Lines in a scene are 0.32 seconds apart, 0.5 after a line ending in `?` or `:`. Scenes are about a second apart, which leaves room for the transition. Marks are timed from the word position in `say`, or from exact word timings when the voice engine provides them (Narrateify does).
