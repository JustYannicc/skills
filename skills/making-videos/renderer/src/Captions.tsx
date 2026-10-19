import React from "react";
import { AbsoluteFill } from "remotion";
import { C, SANS, prog, useGlobalTime } from "./theme";
import type { Timeline } from "./types";

/** The sentence being spoken, quiet at the bottom of the frame. Runs on the global clock so it never jumps at scene cuts. */
export const Captions: React.FC<{ timeline: Timeline }> = ({ timeline }) => {
  const t = useGlobalTime();
  const lines = timeline.scenes.flatMap((s) => s.lines);
  const i = lines.findIndex((l, k) => t >= l.start - 0.12 && (k === lines.length - 1 || t < lines[k + 1].start - 0.12));
  if (i < 0) return null;
  const l = lines[i];
  const next = lines[i + 1]?.start ?? Infinity;
  const hide = Math.min(next - 0.12, l.end + 0.9);
  const o = prog(t, l.start - 0.12, 0.25) * (1 - prog(t, hide - 0.25, 0.25));
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 220, right: 220, bottom: 64, textAlign: "center", fontFamily: SANS, fontSize: 38, lineHeight: 1.35,
        color: C.soft, opacity: o * 0.92, translate: `0px ${(1 - o) * 6}px`, textWrap: "balance" }}>
        {l.say}
      </div>
    </AbsoluteFill>
  );
};
