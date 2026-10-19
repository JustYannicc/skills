import React from "react";
import { C, MONO, prog, toneColor, useGlobalTime } from "../theme";
import { Stage, Swap, Words, appear, latest, shown } from "../ui";
import type { SceneProps } from "./text";

const KEYWORDS = /\b(const|let|var|function|return|await|async|if|else|for|while|try|catch|throw|new|class|def|import|from|export|type|interface|fn|pub|match|SELECT|FROM|WHERE|UPDATE|INSERT)\b/g;

/** Light, readable tinting: comments quiet, strings green, keywords amber. */
const tint = (line: string): React.ReactNode[] => {
  const comment = line.search(/(\/\/|#(?!\[)|--\s)/);
  const code = comment >= 0 ? line.slice(0, comment) : line;
  const out: React.ReactNode[] = [];
  code.split(/("[^"]*"|'[^']*'|`[^`]*`)/).forEach((part, i) => {
    if (/^["'`]/.test(part)) out.push(<span key={`s${i}`} style={{ color: C.ok }}>{part}</span>);
    else part.split(KEYWORDS).forEach((p, j) => out.push(j % 2 ? <span key={`k${i}-${j}`} style={{ color: "#d9a35a" }}>{p}</span> : p));
  });
  if (comment >= 0) out.push(<span key="c" style={{ color: C.quiet }}>{line.slice(comment)}</span>);
  return out;
};

const range = (h: string | number | undefined): [number, number] | undefined => {
  if (h === undefined) return undefined;
  const m = String(h).match(/^(\d+)(?:\s*-\s*(\d+))?$/);
  return m ? [Number(m[1]), Number(m[2] ?? m[1])] : undefined;
};

/** A file panel that types in, then lights the lines being talked about. `show` becomes the note under the panel. */
export const CodeScene: React.FC<SceneProps> = ({ scene, startFrame }) => {
  const t = useGlobalTime(startFrame);
  const lines = (scene.code ?? "").replace(/\n+$/, "").split("\n").slice(0, 14);
  const fs = lines.length <= 9 ? 34 : 28;
  const marks = scene.lines.flatMap((l) => {
    const r = range(l.highlight);
    return r ? [{ start: l.start, r, tone: l.tone }] : [];
  });
  const active = latest(marks, t);
  const notes = shown(scene.lines);
  return (
    <Stage t={t} from={scene.from} label={scene.label}>
      <div style={{ background: C.panel, border: `2px solid ${C.rule}`, borderRadius: 12, overflow: "hidden", maxWidth: 1600, ...appear(prog(t, scene.from - 0.5, 0.6), 20) }}>
        {scene.file ? (
          <div style={{ fontFamily: MONO, fontSize: 26, color: C.soft, padding: "16px 28px", borderBottom: `2px solid ${C.rule}`, display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ width: 12, height: 12, background: C.amber, display: "inline-block" }} />
            {scene.file}
          </div>
        ) : null}
        <div style={{ padding: "22px 0", fontFamily: MONO, fontSize: fs, lineHeight: 1.55 }}>
          {lines.map((line, i) => {
            const n = i + 1;
            const on = active && n >= active.r[0] && n <= active.r[1];
            const sweep = on ? prog(t, active.start - 0.05, 0.45) : 0;
            const p = prog(t, scene.from - 0.4 + i * 0.05, 0.35);
            return (
              <div key={i} style={{ position: "relative", display: "flex", whiteSpace: "pre", opacity: p * (active && !on ? 0.42 : 1) }}>
                {on ? <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${sweep * 100}%`, background: `${toneColor(active.tone)}22`, borderLeft: `5px solid ${toneColor(active.tone)}` }} /> : null}
                <span style={{ position: "relative", width: 86, textAlign: "right", paddingRight: 26, color: C.quiet, flex: "none" }}>{n}</span>
                <span style={{ position: "relative", color: C.bone, overflow: "hidden", textOverflow: "ellipsis" }}>{tint(line)}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ marginTop: 40, minHeight: 64 }}>
        <Swap t={t} items={notes} exitDy={18} render={(l) => (
          <Words text={l.show} t={t} at={l.start} stagger={0.035} mark={l.mark} markAt={l.markAt} tone={l.tone}
            style={{ fontSize: 50, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.15, maxWidth: 1500 }} />
        )} />
      </div>
    </Stage>
  );
};
