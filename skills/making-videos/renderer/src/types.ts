// The timeline the render script builds from the script JSON and the measured voice clips.
// All times are seconds on the global video clock.

export type Tone = "accent" | "warn" | "good" | "quiet";
export type ItemState = "ruled-out" | "live" | "done" | "open";
export type SceneKind = "title" | "say" | "list" | "flow" | "code" | "question" | "close";

export type Line = {
  say: string;
  show?: string;
  mark?: string;
  sub?: string;
  tone?: Tone;
  state?: ItemState;
  focus?: string;
  note?: string;
  highlight?: string | number;
  /** Flow scenes: index of the node `focus` names, resolved by the render script. */
  focusNode?: number;
  start: number;
  end: number;
  /** When the marked phrase is spoken (estimated from text position unless the engine gave word timings). */
  markAt: number;
};

export type Scene = {
  kind: SceneKind;
  label?: string;
  title?: string;
  file?: string;
  code?: string;
  lines: Line[];
  /** Global second at which this scene's sequence starts (its entering transition begins here). */
  t0: number;
  /** First line start and last line end. */
  from: number;
  to: number;
};

export type Timeline = {
  title: string;
  /** BCP-47 base code; picks the few fixed words drawn on screen. */
  language: string;
  fps: number;
  width: number;
  height: number;
  frames: number;
  /** Scene transition length in frames. */
  transition: number;
  captions: boolean;
  scenes: Scene[];
};
