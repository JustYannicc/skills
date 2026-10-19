import { loadFont } from "@remotion/fonts";
import geist from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2";
import geistMono from "@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { Tone } from "./types";

loadFont({ family: "Geist", url: geist, weight: "100 900" });
loadFont({ family: "Geist Mono", url: geistMono, weight: "100 900" });

export const C = {
  ink: "#08080a",
  panel: "#0f0f12",
  rule: "rgba(236,235,230,.14)",
  line: "rgba(236,235,230,.4)",
  bone: "#ecebe6",
  soft: "#b3b2ac",
  quiet: "#8d8c87",
  amber: "#e8a948",
  rust: "#e0775f",
  ok: "#9cc48a",
};
export const SANS = "Geist, 'Helvetica Neue', sans-serif";
export const MONO = "'Geist Mono', 'SF Mono', Menlo, monospace";

const WORDS: Record<string, { then: string; or: string }> = {
  en: { then: "then", or: "or" },
  de: { then: "dann", or: "oder" },
  fr: { then: "puis", or: "ou" },
  es: { then: "luego", or: "o" },
};
/** The only fixed words the renderer draws itself. */
export const uiWords = (language: string | undefined) => WORDS[(language ?? "en").split(/[-_]/)[0]] ?? WORDS.en;

export const toneColor = (tone: Tone | undefined) =>
  tone === "warn" ? C.rust : tone === "good" ? C.ok : tone === "quiet" ? C.soft : C.amber;

const EASE = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0→1 between `start` and `start + dur` seconds, ease-out. */
export const prog = (t: number, start: number, dur = 0.6) => interpolate(t, [start, start + dur], [0, 1], { ...clamp, easing: EASE });

/** Global seconds for a component inside a sequence that starts at `startFrame`. */
export const useGlobalTime = (startFrame = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (frame + startFrame) / fps;
};

/** Font size that keeps a phrase readable at one idea per screen. */
export const fitSize = (text: string, sizes: [number, number, number, number, number] = [132, 112, 94, 76, 62]) => {
  const n = text.length;
  return n <= 18 ? sizes[0] : n <= 32 ? sizes[1] : n <= 56 ? sizes[2] : n <= 90 ? sizes[3] : sizes[4];
};
