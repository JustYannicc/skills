import React from "react";
import { C, MONO, prog, toneColor, useGlobalTime } from "../theme";
import { Stage, Swap, Words, appear, latest, shown } from "../ui";
import type { Line } from "../types";
import type { SceneProps } from "./text";

const ROW_W = 1600, NODE_H = 190, ROW_Y = 150;

/** A lit node: `travel` when a later line points back at it, so the packet runs to it first. */
type Focus = { start: number; node: number; travel: boolean; line: Line };

/**
 * A left-to-right path. Each line with `show` adds a node as it is said;
 * `focus` lights a node, sends a packet along the path to it, and puts `note` under it.
 */
export const FlowScene: React.FC<SceneProps> = ({ scene, startFrame }) => {
  const t = useGlobalTime(startFrame);
  const nodes = shown(scene.lines);
  const n = Math.max(1, nodes.length);
  const gap = n <= 3 ? 130 : 84;
  const w = Math.min(400, (ROW_W - gap * (n - 1)) / n);
  const left0 = (ROW_W - (n * w + (n - 1) * gap)) / 2;
  const x = (i: number) => left0 + i * (w + gap);
  const focuses: Focus[] = scene.lines.flatMap((l): Focus[] => {
    if (l.focusNode !== undefined && l.focusNode >= 0) return [{ start: l.start, node: l.focusNode, travel: true, line: l }];
    if (l.show && (l.note || l.tone)) return [{ start: l.start, node: nodes.findIndex((n) => n === l), travel: false, line: l }];
    return [];
  });
  const active = latest(focuses, t);
  const cy = ROW_Y + NODE_H / 2;
  // packet: from the first node's centre to the focused node, during the first second of the focus line
  const travel = active?.travel && active.node > 0 ? prog(t, active.start, 1.1) : 0;
  const px = x(0) + w / 2 + (x(active?.node ?? 0) - x(0)) * travel;
  // one line when it fits at a readable size, otherwise two lines
  const labelSize = (s: string) => {
    const one = (w - 44) / (Math.max(6, s.length) * 0.58);
    return Math.round(one >= 34 ? Math.min(46, one) : Math.max(28, Math.min(40, one * 1.9)));
  };
  return (
    <Stage t={t} from={scene.from} label={scene.label}>
      <div style={{ position: "relative", height: 640, width: ROW_W }}>
        <svg style={{ position: "absolute", inset: 0, overflow: "visible" }} width={ROW_W} height={640}>
          {nodes.slice(1).map((l, i) => {
            const p = prog(t, l.start - 0.25, 0.45);
            const x1 = x(i) + w + 10, x2 = x(i + 1) - 14, hx = x1 + (x2 - x1) * p;
            return (
              <g key={i} opacity={p > 0 ? 1 : 0}>
                <line x1={x1} y1={cy} x2={hx} y2={cy} stroke={C.line} strokeWidth={3} />
                {p > 0.97 ? <path d={`M${x2 + 6},${cy} L${x2 - 10},${cy - 9} L${x2 - 10},${cy + 9} Z`} fill={C.line} /> : null}
              </g>
            );
          })}
        </svg>
        {nodes.map((l, i) => {
          const p = prog(t, l.start - 0.1, 0.5);
          const lit = active?.node === i ? prog(t, active.start + (active.travel ? 0.9 : 0), 0.35) : 0;
          const tone = toneColor(active?.node === i ? active.line.tone : undefined);
          return (
            <div key={i} style={{ position: "absolute", left: x(i), top: ROW_Y, width: w, height: NODE_H, ...appear(p, 26),
              scale: String(1 + lit * 0.04) }}>
              <div style={{ height: "100%", boxSizing: "border-box", borderRadius: 10, background: C.panel, padding: "18px 22px",
                border: `${lit > 0 ? 3 : 2}px solid ${lit > 0 ? tone : C.rule}`, boxShadow: lit > 0 ? `0 0 ${40 * lit}px ${tone}55` : undefined,
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                <div style={{ fontSize: labelSize(l.show), fontWeight: 650, lineHeight: 1.1, letterSpacing: "-0.01em" }}>{l.show}</div>
                {l.sub ? <div style={{ fontFamily: MONO, fontSize: 22, color: C.soft, marginTop: 10, lineHeight: 1.2 }}>{l.sub}</div> : null}
              </div>
            </div>
          );
        })}
        {travel > 0 && travel < 1 ? (
          <div style={{ position: "absolute", left: px - 11, top: cy - 11, width: 22, height: 22, background: C.amber, boxShadow: `0 0 24px ${C.amber}` }} />
        ) : null}
        <div style={{ position: "absolute", top: ROW_Y + NODE_H + 70, left: 0, right: 0 }}>
          <Swap t={t} items={focuses.filter((f) => f.line.note)} exitDy={20} render={(f) => {
            const centre = x(f.node) + w / 2;
            const width = 900;
            const left = Math.max(0, Math.min(ROW_W - width, centre - width / 2));
            return (
              <div style={{ marginLeft: left, width, textAlign: "center" }}>
                <Words text={f.line.note!} t={t} at={f.start + (f.travel ? 0.7 : 0.2)} stagger={0.035} mark={f.line.mark} markAt={f.line.markAt} tone={f.line.tone}
                  style={{ fontSize: 50, fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.015em" }} />
              </div>
            );
          }} />
        </div>
      </div>
    </Stage>
  );
};
