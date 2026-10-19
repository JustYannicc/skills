import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { Background } from "./Background";
import { Captions } from "./Captions";
import { rise } from "./rise";
import { C } from "./theme";
import { CodeScene } from "./scenes/code";
import { FlowScene } from "./scenes/flow";
import { ListScene } from "./scenes/list";
import { CloseScene, QuestionScene, SayScene, TitleScene, type SceneProps } from "./scenes/text";
import type { SceneKind, Timeline } from "./types";

const SCENES: Record<SceneKind, React.FC<SceneProps>> = {
  title: TitleScene,
  say: SayScene,
  list: ListScene,
  flow: FlowScene,
  code: CodeScene,
  question: QuestionScene,
  close: CloseScene,
};

/**
 * Scenes sit in a TransitionSeries over one persistent background. Each scene's
 * sequence starts at `t0`, so the entering transition finishes just before its
 * first sentence; every element inside is timed against the global clock.
 */
export const Video: React.FC<{ timeline: Timeline }> = ({ timeline }) => {
  const { fps } = useVideoConfig();
  const T = timeline.transition;
  const starts = timeline.scenes.map((s) => Math.round(s.t0 * fps));
  const last = timeline.scenes.length - 1;
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <Background timeline={timeline} />
      <TransitionSeries>
        {timeline.scenes.flatMap((scene, i) => {
          const Scene = SCENES[scene.kind];
          const duration = (i < last ? starts[i + 1] + T : timeline.frames) - starts[i];
          return [
            i > 0 ? <TransitionSeries.Transition key={`cut-${i}`} presentation={rise()} timing={linearTiming({ durationInFrames: T })} /> : null,
            <TransitionSeries.Sequence key={`scene-${i}`} name={`${i + 1} ${scene.kind}${scene.label ? ` · ${scene.label}` : ""}`} durationInFrames={duration} premountFor={fps}>
              <Scene scene={scene} startFrame={starts[i]} language={timeline.language} />
            </TransitionSeries.Sequence>,
          ].filter(Boolean);
        })}
      </TransitionSeries>
      {timeline.captions ? <Captions timeline={timeline} /> : null}
    </AbsoluteFill>
  );
};
