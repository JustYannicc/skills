import React from "react";
import { AbsoluteFill, interpolateColors } from "remotion";
import { C, MONO, SANS, prog, toneColor } from "./theme";
import type { Line, Tone } from "./types";

/** The lines that put something on screen. */
export const shown = (lines: Line[]) => lines.filter((l): l is Line & { show: string } => Boolean(l.show));

/** The last item that has started by `t` (with a small lead so visuals land on the word). */
export const latest = <T extends { start: number }>(items: T[], t: number, lead = 0.1) =>
  items.reduce<T | undefined>((a, x) => (t >= x.start - lead ? x : a), undefined);

export const appear = (p: number, dy = 24): React.CSSProperties => ({ opacity: p, translate: `0px ${(1 - p) * dy}px` });

/**
 * Scene frame: kicker top-left, content in the safe area above the captions.
 * The content drifts very slowly so a long sentence never sits on a frozen frame.
 */
export const Stage: React.FC<{ t: number; from: number; label?: string; tone?: Tone; children: React.ReactNode }> = ({ t, from, label, tone, children }) => (
  <AbsoluteFill style={{ fontFamily: SANS, color: C.bone }}>
    {label ? (
      <div style={{ position: "absolute", left: 160, top: 96, fontFamily: MONO, fontSize: 30, letterSpacing: "0.01em", color: toneColor(tone), ...appear(prog(t, from - 0.45, 0.6), 10) }}>
        {label}
      </div>
    ) : null}
    <div style={{ position: "absolute", left: 160, right: 160, top: 180, bottom: 210, display: "flex", flexDirection: "column", justifyContent: "center",
      scale: String(1 + Math.min(Math.max(t - from, 0), 40) * 0.0016), transformOrigin: "20% 50%" }}>
      {children}
    </div>
  </AbsoluteFill>
);

const splitMark = (text: string, mark?: string): [string, string, string] => {
  if (!mark) return [text, "", ""];
  const i = text.toLowerCase().indexOf(mark.toLowerCase());
  if (i < 0) return [text, "", ""];
  return [text.slice(0, i), text.slice(i, i + mark.length), text.slice(i + mark.length)];
};

const words = (s: string) => s.split(/(\s+)/).filter((w) => w.length > 0);

/**
 * Kinetic type: words rise in one after another from `at`, the marked phrase
 * turns to the tone colour and gets an underline that sweeps in when it is spoken.
 */
export const Words: React.FC<{
  text: string;
  t: number;
  at: number;
  mark?: string;
  markAt?: number;
  tone?: Tone;
  stagger?: number;
  style?: React.CSSProperties;
  suffix?: React.ReactNode;
}> = ({ text, t, at, mark, markAt, tone, stagger = 0.045, style, suffix }) => {
  const [before, marked, after] = splitMark(text, mark);
  let k = 0;
  const piece = (w: string, key: string) => {
    if (/^\s+$/.test(w)) return <span key={key}>{w}</span>;
    const p = prog(t, at + k++ * stagger, 0.55);
    return (
      <span key={key} style={{ display: "inline-block", opacity: p, translate: `0px ${(1 - p) * 0.28}em`, filter: p < 1 ? `blur(${(1 - p) * 6}px)` : undefined }}>
        {w}
      </span>
    );
  };
  const m = prog(t, Math.max(markAt ?? at + 0.4, at + 0.25), 0.5);
  const color = toneColor(tone);
  return (
    <div style={{ textWrap: "balance", ...style }}>
      {words(before).map((w, i) => piece(w, `b${i}`))}
      {marked ? (
        <span style={{ display: "inline-block", position: "relative", whiteSpace: "nowrap", color: m > 0 ? interpolateColors(m, [0, 1], [C.bone, color]) : undefined }}>
          {words(marked).map((w, i) => piece(w, `m${i}`))}
          <span style={{ position: "absolute", left: 0, bottom: "-0.04em", height: "0.075em", width: `${m * 100}%`, background: color, borderRadius: 2 }} />
        </span>
      ) : null}
      {words(after).map((w, i) => piece(w, `a${i}`))}
      {suffix}
    </div>
  );
};

/**
 * Shows one item at a time: each enters at its start and leaves (up and out)
 * when the next one starts. Every item stays mounted in the same grid cell, so
 * the cell is as tall as the tallest item for the whole scene and nothing jumps.
 */
export function Swap<T extends { start: number }>({ t, items, render, until, exitDy = 36, align = "center" }: {
  t: number;
  items: T[];
  render: (item: T, index: number) => React.ReactNode;
  until?: number;
  exitDy?: number;
  align?: "center" | "start";
}) {
  return (
    <div style={{ position: "relative", display: "grid" }}>
      {items.map((item, i) => {
        const next = i + 1 < items.length ? items[i + 1].start : until;
        const out = next === undefined ? 0 : prog(t, next - 0.22, 0.38);
        const live = t >= item.start - 0.3 && out < 1;
        return (
          <div key={i} style={{ gridArea: "1 / 1", alignSelf: align, visibility: live ? "visible" : "hidden", opacity: 1 - out, translate: `0px ${-out * exitDy}px` }}>
            {render(item, i)}
          </div>
        );
      })}
    </div>
  );
}
