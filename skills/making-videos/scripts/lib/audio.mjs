// Decode clips to one sample rate, trim their edges, lay them on one track, and level it.
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";

export const RATE = 48000;
/** Lead-in kept before each clip's first sound; inspect.mjs expects the onset here. */
export const TRIM_MARGIN = 0.04;

export function decode(file) {
  const r = spawnSync("ffmpeg", ["-v", "error", "-i", file, "-f", "f32le", "-ac", "1", "-ar", String(RATE), "-"], { maxBuffer: 1 << 30 });
  if (r.status !== 0) throw new Error(`ffmpeg could not decode ${file}: ${r.stderr}`);
  const bytes = new Uint8Array(r.stdout);
  return new Float32Array(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
}

/** Cut leading and trailing near-silence so gaps between lines are ours, not the engine's. Returns seconds cut at the front. */
export function trim(samples, margin = TRIM_MARGIN) {
  let peak = 0;
  for (const s of samples) peak = Math.max(peak, Math.abs(s));
  const floor = Math.max(peak * 0.02, 1e-4);
  let a = 0;
  while (a < samples.length && Math.abs(samples[a]) < floor) a++;
  let b = samples.length - 1;
  while (b > a && Math.abs(samples[b]) < floor) b--;
  const pad = Math.round(margin * RATE);
  const start = Math.max(0, a - pad);
  const end = Math.min(samples.length, b + 1 + pad);
  return { samples: samples.subarray(start, end), cut: start / RATE };
}

/** Place clips at their start times on a silent track of `seconds`, then scale so the peak sits at `peakDb`. */
export function mixdown(placements, seconds, peakDb = -1) {
  const track = new Float32Array(Math.ceil(seconds * RATE));
  for (const { samples, at } of placements) track.set(samples.subarray(0, track.length - Math.round(at * RATE)), Math.round(at * RATE));
  let peak = 0;
  for (const s of track) peak = Math.max(peak, Math.abs(s));
  const gain = peak > 0 ? 10 ** (peakDb / 20) / peak : 1;
  for (let i = 0; i < track.length; i++) track[i] *= gain;
  return track;
}

/**
 * Bring any engine's narration to the same loudness: measure integrated loudness (EBU R128),
 * apply the gain to reach `lufs`, and let a limiter hold the peaks at about -1.2 dBFS.
 */
export function level(input, output, lufs = -18) {
  const probe = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", input, "-af", "ebur128", "-f", "null", "-"], { encoding: "utf8" });
  const measured = Number(probe.stderr.match(/I:\s+(-?[\d.]+) LUFS\s*\n\s*Threshold/)?.[1] ?? NaN);
  if (!Number.isFinite(measured)) console.error("Could not measure loudness; leaving the narration at its peak-normalised level.");
  const gain = Number.isFinite(measured) ? Math.max(-12, Math.min(12, lufs - measured)) : 0;
  const r = spawnSync("ffmpeg", ["-y", "-v", "error", "-i", input, "-af", `volume=${gain.toFixed(2)}dB,alimiter=limit=0.87:attack=3:release=60:level=disabled`, "-ar", String(RATE), "-c:a", "pcm_s16le", output], { encoding: "utf8" });
  if (r.status !== 0) throw new Error(`ffmpeg levelling failed: ${r.stderr}`);
  return { measuredLufs: measured, gainDb: gain };
}

export function writeWav(file, samples) {
  const data = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i++) data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, samples[i])) * 32767), i * 2);
  const head = Buffer.alloc(44);
  head.write("RIFF", 0);
  head.writeUInt32LE(36 + data.length, 4);
  head.write("WAVEfmt ", 8);
  head.writeUInt32LE(16, 16);
  head.writeUInt16LE(1, 20);
  head.writeUInt16LE(1, 22);
  head.writeUInt32LE(RATE, 24);
  head.writeUInt32LE(RATE * 2, 28);
  head.writeUInt16LE(2, 32);
  head.writeUInt16LE(16, 34);
  head.write("data", 36);
  head.writeUInt32LE(data.length, 40);
  writeFileSync(file, Buffer.concat([head, data]));
}
