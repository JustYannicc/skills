---
name: making-videos
description: Use when making a narrated video, such as an explainer, walkthrough, or recap, where a voiceover tells the story and the visuals follow it.
license: MIT
metadata:
  homepage: https://github.com/JustYannicc/skills
---

# Making videos

A good narrated video is a short talk with pictures that move when the words do. The voice carries the story. The screen shows one idea at a time: the keyword, name, path, or line of code being talked about right now. When the idea changes, the picture changes with the sentence. When it doesn't, the picture stays. That is what makes it feel like a video and not a slideshow.

## Write for the ear

Write the narration as speech, the way you would explain it to someone sitting next to you. Use short sentences, contractions, one idea per sentence. If a sentence would trip you up when you say it, rewrite it.

Let the story set the shape. Open with why it matters, build the idea in the order a listener needs it, and end on the one thing to remember or do. A fixed template of sections makes it read like a form.

Speech runs at about 150 words a minute. Most explainers fit in 45 to 120 seconds. Cut repetition before you cut substance.

Write `say` for the voice and `show` for the eye. Say "handle webhook, around line forty". Show `handle-webhook.ts:40`.

## Pair every line with a picture

Each line is one spoken sentence, or two short ones, plus what appears at that moment. Put the compressed meaning on screen: the keyword, the claim, the number. Never put the sentence itself there; the captions already carry it. A line without `show` keeps the current picture.

Group lines into scenes of one to five lines. A new scene is a new beat in the story, and its `label` is the small kicker above it. Pick the scene kind by the shape of the idea:

| Shape of the idea | Kind |
| --- | --- |
| Where we are, what this is about | `title` |
| One claim at a time | `say` |
| Several things being sorted (ruled out, live, done) | `list` |
| A path, a chain of causes, a request moving through a system | `flow` |
| Code the story is about | `code` |
| An open question, maybe with candidate answers | `question` |
| The ending: the takeaway or first action, held on screen | `close` |

Show only real things. Code, file names, numbers, and steps come from the source material. Leave out a diagram that adds nothing.

The script format and every field are in [script format](references/script-format.md).

## Render

Requires Node 20 or later, `uv`, and `ffmpeg`. The first run installs the Remotion renderer and downloads the Kokoro voice model (about 350 MB) into `~/.cache/making-videos`; later runs reuse both.

```bash
node <this skill>/scripts/render.mjs script.json --out ~/Movies/name.mp4 --inspect --open
```

The voice comes first, and its measured timing drives everything on screen. English uses local Kokoro with the voice `af_heart`. Other languages use Narrateify when it is installed, then macOS `say`. `--tts` and `--voice` override that choice; the order per language lives in `scripts/lib/tts.mjs`. A transcript `.md` is written next to the video.

Once the cache is warm, rendering takes well under the video's own length, and a rerun reuses every line already voiced.

## Check it like a viewer

`--inspect` prints the peak and mean level, how far each line's audio onset is from where its visuals expect it, and the path to a contact sheet with one frame per line. Downscale the sheet if it is large, then look at it. Each frame should show one readable idea that matches its caption, with nothing cut off or overlapping, and the last frame should hold the ending. The peak should sit near −1 dB and the sync error under about 50 ms. Fix the script and render again when a frame is wrong.

Report the video path, its length, the render time, and the voice used.

## A visual the kinds can't draw

Copy `renderer/` into the project, add a scene kind under `src/scenes/` following `remotion-best-practices`, and pass `--renderer <copy>`. The copy receives the same timeline props, so the voice, timing, levelling, and checks still apply.
