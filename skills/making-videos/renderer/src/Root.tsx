import React from "react";
import { Composition } from "remotion";
import sample from "./sample-timeline.json";
import type { Timeline } from "./types";
import { Video } from "./Video";

const defaultTimeline = sample as Timeline;

// The render script passes the real timeline as input props; the sample keeps Studio usable.
export const RemotionRoot: React.FC = () => (
  <Composition
    id="Video"
    component={Video}
    fps={defaultTimeline.fps}
    width={defaultTimeline.width}
    height={defaultTimeline.height}
    durationInFrames={defaultTimeline.frames}
    defaultProps={{ timeline: defaultTimeline }}
    calculateMetadata={({ props }) => ({
      durationInFrames: props.timeline.frames,
      fps: props.timeline.fps,
      width: props.timeline.width,
      height: props.timeline.height,
    })}
  />
);
