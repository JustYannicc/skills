import React from "react";
import { C, MONO, fitSize, prog, toneColor, uiWords, useGlobalTime } from "../theme";
import { Stage, Swap, Words, appear, latest, shown } from "../ui";
import type { Scene } from "../types";

export type SceneProps = { scene: Scene; startFrame: number; language: string };

/** Opening: the topic lands big, then each line's `show` swaps in underneath. */
export const TitleScene: React.FC<SceneProps> = ({ scene, startFrame }) => {
  const t = useGlobalTime(startFrame);
  const first = scene.lines[0];
  const title = scene.title ?? first.show ?? "";
  const subs = shown(scene.lines).filter((l) => scene.title || l !== first);
  return (
    <Stage t={t} from={scene.from} label={scene.label}>
      <Words text={title} t={t} at={first.start - 0.35} stagger={0.07} mark={first.mark} markAt={first.markAt} tone={first.tone}
        style={{ fontSize: fitSize(title, [156, 132, 108, 88, 72]), fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.98, maxWidth: 1560 }} />
      <div style={{ marginTop: 48, minHeight: 70 }}>
        <Swap t={t} items={subs} render={(l) => (
          <Words text={l.show} t={t} at={l.start - 0.05} mark={scene.title ? l.mark : undefined} markAt={l.markAt} tone={l.tone} stagger={0.035}
            style={{ fontSize: 54, color: C.soft, lineHeight: 1.2, maxWidth: 1400 }} />
        )} />
      </div>
    </Stage>
  );
};

/** One idea at a time: each line's `show` replaces the last, with an optional smaller `sub`. */
export const SayScene: React.FC<SceneProps> = ({ scene, startFrame }) => {
  const t = useGlobalTime(startFrame);
  return (
    <Stage t={t} from={scene.from} label={scene.label} tone={scene.lines[0].tone}>
      <Swap t={t} items={shown(scene.lines)} render={(l) => (
        <div>
          <Words text={l.show} t={t} at={l.start - 0.08} mark={l.mark} markAt={l.markAt} tone={l.tone}
            style={{ fontSize: fitSize(l.show), fontWeight: 650, letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 1580 }} />
          {l.sub ? (
            <Words text={l.sub} t={t} at={l.start + 0.55} stagger={0.03} style={{ fontSize: 46, color: C.soft, marginTop: 36, maxWidth: 1400, lineHeight: 1.25 }} />
          ) : null}
        </div>
      )} />
    </Stage>
  );
};

/** An open question in quotes; later lines add the candidate answers as pills. */
export const QuestionScene: React.FC<SceneProps> = ({ scene, startFrame, language }) => {
  const t = useGlobalTime(startFrame);
  const [q, ...options] = shown(scene.lines);
  if (!q) return null;
  const current = latest(options, t);
  return (
    <Stage t={t} from={scene.from} label={scene.label}>
      <Words text={`“${q.show}”`} t={t} at={q.start - 0.1} mark={q.mark} markAt={q.markAt} tone={q.tone}
        style={{ fontSize: fitSize(q.show, [112, 96, 82, 68, 58]), fontWeight: 650, letterSpacing: "-0.025em", lineHeight: 1.08, maxWidth: 1560 }} />
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 26, marginTop: 64 }}>
        {options.map((o, i) => (
          <React.Fragment key={i}>
            {i > 0 ? <span style={{ fontFamily: MONO, fontSize: 32, color: C.quiet, ...appear(prog(t, o.start - 0.1, 0.4), 10) }}>{uiWords(language).or}</span> : null}
            <div style={{ fontSize: 46, fontWeight: 600, padding: "18px 30px", borderRadius: 10, background: C.panel,
              border: `2px solid ${o === current ? toneColor(o.tone) : C.rule}`, color: o === current ? C.bone : C.soft, ...appear(prog(t, o.start - 0.1, 0.5), 18) }}>
              {o.show}
            </div>
          </React.Fragment>
        ))}
      </div>
    </Stage>
  );
};

/** The last shot: one action, big, held after the voice ends with a blinking cursor. */
export const CloseScene: React.FC<SceneProps> = ({ scene, startFrame, language }) => {
  const t = useGlobalTime(startFrame);
  const [action, ...then] = shown(scene.lines);
  if (!action) return null;
  const blink = t > scene.to + 0.2 ? (Math.floor((t - scene.to) * 1.7) % 2 === 0 ? 1 : 0.15) : 0;
  return (
    <Stage t={t} from={scene.from} label={scene.label} tone={action.tone}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 40 }}>
        <span style={{ fontFamily: MONO, fontSize: 84, color: toneColor(action.tone), ...appear(prog(t, action.start - 0.3, 0.5), 0) }}>→</span>
        <Words text={action.show} t={t} at={action.start - 0.1} stagger={0.06} mark={action.mark} markAt={action.markAt} tone={action.tone}
          style={{ fontSize: fitSize(action.show, [128, 108, 92, 76, 64]), fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.04, maxWidth: 1450 }}
          suffix={<span style={{ display: "inline-block", width: "0.42em", height: "0.8em", marginLeft: "0.14em", background: C.amber, opacity: blink, translate: "0px 0.08em" }} />} />
      </div>
      {then.length ? (
        <div style={{ marginTop: 64, marginLeft: 124, display: "flex", flexDirection: "column", gap: 16 }}>
          {then.map((l, i) => (
            <div key={i} style={{ display: "flex", gap: 24, alignItems: "baseline", fontSize: 42, color: C.soft, ...appear(prog(t, l.start - 0.1, 0.5), 14) }}>
              <span style={{ fontFamily: MONO, fontSize: 30, color: C.quiet, width: 90, flex: "none" }}>{uiWords(language).then}</span>
              {l.show}
            </div>
          ))}
        </div>
      ) : null}
    </Stage>
  );
};
