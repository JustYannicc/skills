import React from "react";
import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const ease = (x: number) => 1 - (1 - x) ** 3;

/** Calm scene change: the old scene drifts up and fades first, then the new one rises in. The background stays put. */
const Rise: React.FC<TransitionPresentationComponentProps<Record<string, never>>> = ({ children, presentationDirection, presentationProgress: p }) => {
  const entering = presentationDirection === "entering";
  const k = entering ? ease(clamp01((p - 0.35) / 0.65)) : ease(clamp01(p / 0.55));
  return (
    <AbsoluteFill style={{ opacity: entering ? k : 1 - k, translate: `0px ${entering ? (1 - k) * 34 : -k * 34}px` }}>{children}</AbsoluteFill>
  );
};

export const rise = (): TransitionPresentation<Record<string, never>> => ({ component: Rise, props: {} });
