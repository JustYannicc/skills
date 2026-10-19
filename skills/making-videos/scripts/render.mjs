#!/usr/bin/env node
// Script JSON → narrated MP4. Voice first (its timings drive everything), then the silent
// Remotion render, then ffmpeg puts the narration under it.
//
//   node render.mjs script.json [--out FILE.mp4] [--open] [--inspect] [--no-captions]
//                               [--tts kokoro|narrateify|say] [--voice NAME] [--renderer DIR]
//
// --renderer points at a copy of renderer/ with extra scene kinds; it gets the same timeline props.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { RATE, decode, level, mixdown, trim, writeWav } from "./lib/audio.mjs";
import { prepare, renderSilent } from "./lib/remotion.mjs";
import { pruneNewest, which } from "./lib/sys.mjs";
import { synthesize } from "./lib/tts.mjs";
import { buildTimeline, lineId, validate } from "./lib/timeline.mjs";

const SKILL = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CACHE = path.join(process.env.XDG_CACHE_HOME || path.join(homedir(), ".cache"), "making-videos");
const log = (...a) => console.error(...a);

const USAGE = "Usage: node render.mjs script.json [--out FILE.mp4] [--open] [--inspect] [--no-captions] [--tts kokoro|narrateify|say] [--voice NAME] [--renderer DIR]";
let args;
try {
  args = parseArgs({
    allowPositionals: true,
    options: {
      out: { type: "string" },
      open: { type: "boolean" },
      inspect: { type: "boolean" },
      "no-captions": { type: "boolean" },
      tts: { type: "string" },
      voice: { type: "string" },
      renderer: { type: "string" },
    },
  });
} catch (error) {
  log(`${error.message}\n${USAGE}`);
  process.exit(64);
}
const { values: opt, positionals } = args;
const input = positionals[0];
if (!input || positionals.length > 1) {
  log(USAGE);
  process.exit(64);
}
for (const tool of ["ffmpeg", "ffprobe"]) {
  if (!which(tool)) {
    log(`${tool} is required (brew install ffmpeg).`);
    process.exit(1);
  }
}

const started = Date.now();
const script = JSON.parse(readFileSync(input, "utf8"));
const customRenderer = opt.renderer ? path.resolve(opt.renderer) : null;
try {
  validate(script, { customKinds: Boolean(customRenderer) });
} catch (error) {
  log(error.message);
  process.exit(65);
}

const slug = (script.title ?? "video").toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 60) || "video";
const scriptDir = path.dirname(path.resolve(input));
const out = opt.out ? path.resolve(opt.out) : path.resolve(scriptDir, script.out?.replace(/^~/, homedir()) ?? `${slug}.mp4`);
const run = path.join(CACHE, "runs", `${new Date().toISOString().replace(/[:.]/g, "-")}-${slug}`);
mkdirSync(run, { recursive: true });
mkdirSync(path.dirname(out), { recursive: true });

// 1. Voice every line. Clip lengths decide when everything on screen happens.
const lines = script.scenes.flatMap((scene, i) => scene.lines.map((line, j) => ({ id: lineId(i, j), text: line.say.trim() })));
log(`Voicing ${lines.length} lines…`);
const voice = await synthesize(lines, { language: script.language ?? "en", engine: opt.tts, voice: opt.voice ?? script.voice, workDir: run, cacheDir: CACHE, log });
const clips = new Map();
const audio = new Map();
for (const c of voice.clips) {
  const { samples, cut } = trim(decode(c.file));
  audio.set(c.id, samples);
  const words = c.words?.map((w) => ({ text: w.text, start: w.start - cut, end: w.end - cut }));
  clips.set(c.id, { duration: samples.length / RATE, words });
}
const voiced = Date.now();

// 2. Timeline and one levelled narration track, padded to the video length.
const { timeline, placements, seconds } = buildTimeline(script, clips, { captions: !opt["no-captions"] });
const track = mixdown(placements.map((p) => ({ samples: audio.get(p.id), at: p.at })), seconds);
writeWav(path.join(run, "narration-raw.wav"), track);
const narration = path.join(run, "narration.wav");
const levelled = level(path.join(run, "narration-raw.wav"), narration);
writeFileSync(path.join(run, "timeline.json"), JSON.stringify(timeline, null, 2));

// 3. Silent render, then mux.
const { renderer, serveUrl } = await prepare({ rendererSource: customRenderer ?? path.join(SKILL, "renderer"), builtIn: !customRenderer, cacheDir: CACHE, log });
const prepared = Date.now();
const silent = path.join(run, "silent.mp4");
await renderSilent({ renderer, serveUrl, timeline, outFile: silent, log });
const rendered = Date.now();
const mux = spawnSync("ffmpeg", ["-y", "-v", "error", "-i", silent, "-i", narration, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", out], { encoding: "utf8" });
if (mux.status !== 0) throw new Error(`ffmpeg mux failed: ${mux.stderr}`);

// 4. Transcript next to the video: the script as spoken, plus any notes the author attached.
const transcript = out.replace(/\.mp4$/i, "") + ".md";
const md = [
  `# ${timeline.title}`,
  "",
  ...script.scenes.flatMap((s) => [...(s.label ? [`## ${s.label}`, ""] : []), s.lines.map((l) => l.say.trim()).join(" "), ""]),
  ...(script.notes ? ["---", "", String(script.notes).trim(), ""] : []),
].join("\n");
writeFileSync(transcript, md);

pruneNewest(path.join(CACHE, "runs"), 8);

const summary = {
  video: out,
  transcript,
  durationSeconds: Number(seconds.toFixed(2)),
  voice: { engine: voice.engine, model: voice.model, voice: voice.voice, cachedLines: voice.cached, sourceLufs: Number.isFinite(levelled.measuredLufs) ? Number(levelled.measuredLufs.toFixed(1)) : null, gainDb: Number(levelled.gainDb.toFixed(1)) },
  seconds: {
    voice: (voiced - started) / 1000,
    setup: (prepared - voiced) / 1000,
    frames: (rendered - prepared) / 1000,
    total: (Date.now() - started) / 1000,
  },
  run,
};
console.log(JSON.stringify(summary, null, 2));

if (opt.inspect) spawnSync(process.execPath, [path.join(SKILL, "scripts", "inspect.mjs"), out, "--timeline", path.join(run, "timeline.json")], { stdio: "inherit" });
if (opt.open && existsSync(out)) spawnSync(process.platform === "darwin" ? "open" : "xdg-open", [out], { stdio: "ignore" });
