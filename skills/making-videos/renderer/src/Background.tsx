import React, { useLayoutEffect, useRef } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { Scene, Timeline } from "./types";

// One normalized 4x4 Bayer matrix drives the patterned atmosphere.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const thr = (x: number, y: number) => BAYER[(y & 3) * 4 + (x & 3)];

const P = new Float32Array(256);
for (let i = 0; i < 256; i++) P[i] = Math.abs(Math.sin(i * 127.1 + 311.7) * 43758.5453) % 1;
const hash = (x: number, y: number) => P[(x * 37 + y * 101) & 255];
const sm = (t: number) => t * t * (3 - 2 * t);
const vnoise = (x: number, y: number) => {
  const xi = Math.floor(x), yi = Math.floor(y), xf = sm(x - xi), yf = sm(y - yi);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
};

type Field = { cx: number; cy: number; strength: number };
const SPOTS = [
  { cx: 0.92, cy: 0.88 },
  { cx: 0.06, cy: 0.9 },
  { cx: 0.95, cy: 0.08 },
  { cx: 0.08, cy: 0.1 },
];
const fieldFor = (scene: Scene, i: number): Field =>
  scene.kind === "title"
    ? { cx: 0.76, cy: 0.36, strength: 0.9 }
    : scene.kind === "close"
      ? { cx: 0.8, cy: 0.5, strength: 0.75 }
      : { ...SPOTS[i % SPOTS.length], strength: 0.4 };

/** Full-frame ordered-dither atmosphere whose bright mass drifts from scene to scene. */
export const Background: React.FC<{ timeline: Timeline }> = ({ timeline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ref = useRef<HTMLCanvasElement>(null);
  const t = frame / fps;
  const fields = timeline.scenes.map(fieldFor);
  let i = 0;
  while (i + 1 < timeline.scenes.length && timeline.scenes[i + 1].t0 <= t) i++;
  const prev = fields[Math.max(0, i - 1)];
  const cur = fields[i];
  const k = i === 0 ? 1 : interpolate(t, [timeline.scenes[i].t0, timeline.scenes[i].t0 + 1.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const e = sm(k);
  const cx = prev.cx + (cur.cx - prev.cx) * e;
  const cy = prev.cy + (cur.cy - prev.cy) * e;
  const strength = prev.strength + (cur.strength - prev.strength) * e;
  const W = 192, H = 108;
  useLayoutEffect(() => {
    const ctx = ref.current!.getContext("2d")!;
    const img = ctx.createImageData(W, H);
    const PAL = [[8, 8, 10], [18, 18, 22], [32, 32, 38], [62, 62, 68], [120, 119, 115], [232, 169, 72]];
    const tt = t * 0.05;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const u = x / W, v = y / H;
      const mass = Math.exp(-(((u - cx) / 0.36) ** 2 + ((v - cy) / 0.42) ** 2));
      const wave = 0.5 + 0.5 * Math.sin(u * 7 + v * 3 + tt * 6 + Math.sin(v * 5 - tt * 3) * 1.2);
      const n = vnoise(u * 5 + tt * 2, v * 5 - tt);
      const val = Math.max(0, Math.min(1, (mass * (0.5 * wave + 0.5 * n) + 0.05 * n) * strength));
      const s = val * (PAL.length - 1.4), base = Math.floor(s);
      let c = base + (s - base > thr(x, y) ? 1 : 0);
      if (c >= PAL.length - 1 && !(val > 0.88 && thr(x + 2, y + 1) > 0.55)) c = PAL.length - 2;
      const col = PAL[Math.min(c, PAL.length - 1)], j = (y * W + x) * 4;
      img.data[j] = col[0]; img.data[j + 1] = col[1]; img.data[j + 2] = col[2]; img.data[j + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }, [t, cx, cy, strength]);
  return <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", imageRendering: "pixelated" }} />;
};
