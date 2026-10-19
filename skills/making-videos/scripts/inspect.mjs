#!/usr/bin/env node
// Look at a rendered video the way a viewer would: one frame per spoken line, levels, and sync.
//
//   node inspect.mjs video.mp4 [--timeline timeline.json] [--sheet out.jpg]
//
// With a timeline: one frame 1.2 s into every line (when its visual has settled) plus the last
// frame, and a sync check that each line's audio onset lands where the visuals expect it.
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { parseArgs } from "node:util";
import { TRIM_MARGIN } from "./lib/audio.mjs";

const { values: opt, positionals } = parseArgs({ allowPositionals: true, options: { timeline: { type: "string" }, sheet: { type: "string" } } });
const video = positionals[0];
if (!video) {
  console.error("Usage: node inspect.mjs video.mp4 [--timeline timeline.json] [--sheet out.jpg]");
  process.exit(64);
}
const ff = (args) => spawnSync("ffmpeg", ["-hide_banner", "-nostats", ...args], { encoding: "utf8", maxBuffer: 1 << 26 });
const duration = Number(spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", video], { encoding: "utf8" }).stdout);
const timeline = opt.timeline ? JSON.parse(readFileSync(opt.timeline, "utf8")) : null;
const lines = timeline ? timeline.scenes.flatMap((s) => s.lines) : [];

// Levels
const vol = ff(["-i", video, "-af", "volumedetect", "-vn", "-f", "null", "-"]).stderr;
const level = (k) => Number(vol.match(new RegExp(`${k}: (-?[\\d.]+) dB`))?.[1]);

// Sync: audio onsets (silence ends) vs. line starts. Each clip keeps TRIM_MARGIN of lead-in
// before its first sound, so that is where the onset belongs.
let sync = null;
if (timeline) {
  const sd = ff(["-i", video, "-af", "silencedetect=noise=-42dB:d=0.18", "-vn", "-f", "null", "-"]).stderr;
  const onsets = [...sd.matchAll(/silence_end: ([\d.]+)/g)].map((m) => Number(m[1]));
  const offsets = lines.map((l) => {
    const expected = l.start + TRIM_MARGIN;
    const nearest = onsets.reduce((b, o) => (Math.abs(o - expected) < Math.abs(b - expected) ? o : b), Infinity);
    return nearest - expected;
  });
  const abs = offsets.map(Math.abs).sort((a, b) => a - b);
  sync = { lines: lines.length, medianMs: Math.round(abs[Math.floor(abs.length / 2)] * 1000), maxMs: Math.round(abs[abs.length - 1] * 1000) };
}

// Contact sheet
const times = timeline ? [...lines.map((l) => Math.min(l.start + 1.2, l.end)), duration - 0.1] : Array.from({ length: 12 }, (_, i) => ((i + 0.5) * duration) / 12);
const dir = path.join(tmpdir(), `inspect-${process.pid}`);
mkdirSync(dir, { recursive: true });
times.forEach((t, i) => ff(["-y", "-v", "error", "-ss", t.toFixed(2), "-i", video, "-frames:v", "1", "-vf", "scale=480:-2", path.join(dir, `f${String(i).padStart(3, "0")}.jpg`)]));
const cols = 4;
const sheet = path.resolve(opt.sheet ?? path.join(tmpdir(), `${path.basename(video, path.extname(video))}-sheet.jpg`));
ff(["-y", "-v", "error", "-framerate", "1", "-i", path.join(dir, "f%03d.jpg"), "-vf", `tile=${cols}x${Math.ceil(times.length / cols)}:padding=6:color=0x222222`, "-frames:v", "1", sheet]);
rmSync(dir, { recursive: true, force: true });

console.log(JSON.stringify({ video, durationSeconds: Number(duration.toFixed(2)), peakDb: level("max_volume"), meanDb: level("mean_volume"), sync, sheet, frames: times.map((t) => Number(t.toFixed(2))) }, null, 2));
