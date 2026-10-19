import React from "react";
import { C, MONO, prog, useGlobalTime } from "../theme";
import { Stage, Words, shown } from "../ui";
import type { ItemState } from "../types";
import type { SceneProps } from "./text";

const GLYPH: Record<ItemState | "none", [string, string]> = {
  "ruled-out": ["✗", C.rust],
  live: ["●", C.amber],
  done: ["✓", C.ok],
  open: ["?", C.quiet],
  none: ["–", C.quiet],
};

/** Keywords that build up as they are said. The newest is bright; ruled-out items get struck through. */
export const ListScene: React.FC<SceneProps> = ({ scene, startFrame }) => {
  const t = useGlobalTime(startFrame);
  const items = shown(scene.lines);
  const fs = items.length <= 4 ? 64 : items.length <= 6 ? 52 : 44;
  return (
    <Stage t={t} from={scene.from} label={scene.label}>
      <div style={{ display: "flex", flexDirection: "column", gap: fs * 0.5 }}>
        {items.map((l, i) => {
          const p = prog(t, l.start - 0.12, 0.55);
          const next = items[i + 1]?.start;
          const dim = next === undefined ? 0 : prog(t, next - 0.1, 0.5);
          const out = l.state === "ruled-out";
          const strike = out ? prog(t, Math.max(l.markAt, l.start + 0.6), 0.6) : 0;
          const [glyph, color] = GLYPH[l.state ?? "none"] ?? GLYPH.none;
          return (
            <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 34, opacity: p * (1 - dim * 0.42), translate: `${(1 - p) * -30}px 0px` }}>
              <span style={{ fontFamily: MONO, fontSize: fs * 0.75, color, width: fs * 0.9, flex: "none" }}>{glyph}</span>
              <div>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <Words text={l.show} t={t} at={l.start - 0.12} stagger={0.03} mark={l.mark} markAt={l.markAt} tone={l.tone}
                    style={{ fontSize: fs, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.12, color: strike > 0.6 ? C.quiet : C.bone, maxWidth: 1400 }} />
                  {out ? <div style={{ position: "absolute", left: 0, top: "52%", height: Math.max(4, fs * 0.07), width: `${strike * 100}%`, background: C.rust, borderRadius: 2 }} /> : null}
                </div>
                {l.sub ? <div style={{ fontSize: fs * 0.55, color: C.soft, marginTop: 8, opacity: prog(t, l.start + 0.5, 0.5) }}>{l.sub}</div> : null}
              </div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};
