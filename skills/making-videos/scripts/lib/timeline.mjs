// Script JSON + measured clip lengths → the timeline the composition is drawn from.
import { baseLanguage } from "./tts.mjs";

export const FPS = 30;
export const TRANSITION_FRAMES = 20;
const LEAD = 0.6; // silence before the first word
const LINE_GAP = 0.32; // between lines in a scene
const BEAT_GAP = 0.5; // after a line that ends in ? or :
const SCENE_GAP = 1.05; // between scenes; leaves room for the transition
const HOLD = 4.5; // the close scene stays up this long after the voice ends
const END = 1.2; // tail after any other last scene

if (SCENE_GAP <= TRANSITION_FRAMES / FPS + 0.1) throw new Error("SCENE_GAP must leave room for the transition");

const KINDS = new Set(["title", "say", "list", "flow", "code", "question", "close"]);
const TONES = new Set(["accent", "warn", "good", "quiet"]);
const STATES = new Set(["ruled-out", "live", "done", "open"]);
const MAX_NODES = 5;
const MAX_CODE_LINES = 14;

/** A flow `focus` names a node: exact label first, else the one label that contains it. */
export function resolveFocus(scene, focus) {
  const labels = scene.lines.filter((l) => l.show).map((l) => l.show.toLowerCase());
  const f = String(focus).toLowerCase();
  const exact = labels.indexOf(f);
  if (exact >= 0) return exact;
  const partial = labels.flatMap((label, i) => (f.length >= 3 && label.includes(f) ? [i] : []));
  return partial.length === 1 ? partial[0] : -1;
}

/** Throws with every problem at once so the author can fix the script in one pass, before any voicing. */
export function validate(script, { customKinds = false } = {}) {
  const problems = [];
  if (!Array.isArray(script.scenes) || script.scenes.length === 0) problems.push("scenes: needs at least one scene");
  (script.scenes ?? []).forEach((scene, i) => {
    const at = `scenes[${i}]`;
    if (!customKinds && !KINDS.has(scene.kind)) problems.push(`${at}.kind: "${scene.kind}" is not one of ${[...KINDS].join(", ")}`);
    if (!Array.isArray(scene.lines) || scene.lines.length === 0) {
      problems.push(`${at}.lines: needs at least one line`);
      return;
    }
    const codeLines = scene.code ? scene.code.replace(/\n+$/, "").split("\n").length : 0;
    scene.lines.forEach((line, j) => {
      const here = `${at}.lines[${j}]`;
      if (!line.say?.trim()) problems.push(`${here}.say: missing`);
      if (line.show && line.show.length > 90) problems.push(`${here}.show: ${line.show.length} chars; keep on-screen text short`);
      if (line.tone && !TONES.has(line.tone)) problems.push(`${here}.tone: "${line.tone}" is not one of ${[...TONES].join(", ")}`);
      if (line.state && !STATES.has(line.state)) problems.push(`${here}.state: "${line.state}" is not one of ${[...STATES].join(", ")}`);
      if (line.focus && scene.kind === "flow" && resolveFocus(scene, line.focus) < 0) problems.push(`${here}.focus: "${line.focus}" matches no single node label`);
      if (line.highlight !== undefined) {
        const m = String(line.highlight).match(/^(\d+)(?:\s*-\s*(\d+))?$/);
        if (!m || Number(m[2] ?? m[1]) > codeLines || Number(m[1]) < 1) problems.push(`${here}.highlight: "${line.highlight}" is not a line or range within the ${codeLines}-line code`);
      }
    });
    if (scene.kind === "title" && !scene.title && !scene.lines[0]?.show) problems.push(`${at}: a title scene needs "title" or a first line with "show"`);
    if (scene.kind === "code" && !scene.code) problems.push(`${at}.code: missing`);
    if (codeLines > MAX_CODE_LINES) problems.push(`${at}.code: ${codeLines} lines; show at most ${MAX_CODE_LINES}`);
    if (scene.kind === "flow" && scene.lines.filter((l) => l.show).length > MAX_NODES) problems.push(`${at}: at most ${MAX_NODES} flow nodes stay readable`);
    if (["close", "question", "say", "list", "flow"].includes(scene.kind) && !scene.lines.some((l) => l.show))
      problems.push(`${at}: a ${scene.kind} scene shows nothing without at least one "show"`);
  });
  if (problems.length) throw new Error(`Script problems:\n- ${problems.join("\n- ")}`);
}

export const lineId = (i, j) => `s${String(i + 1).padStart(2, "0")}l${String(j + 1).padStart(2, "0")}`;

/** When the marked phrase is spoken: exact word timings if the engine gave them, else its position in the sentence. */
function markTime(line, start, duration, words) {
  const i = line.mark ? line.say.toLowerCase().indexOf(line.mark.toLowerCase()) : -1;
  if (i < 0) return start + 0.5;
  const sayWords = line.say.trim().split(/\s+/);
  const before = line.say.slice(0, i).trim().split(/\s+/).filter(Boolean).length;
  if (words?.length === sayWords.length) return start + words[before].start;
  return start + duration * (i / Math.max(1, line.say.length));
}

/** clips: Map lineId → { duration, words? }. Returns { timeline, placements: [{ id, at }] }. */
export function buildTimeline(script, clips, { captions = true } = {}) {
  const placements = [];
  const scenes = [];
  let t = LEAD;
  script.scenes.forEach((scene, i) => {
    const lines = scene.lines.map((line, j) => {
      const id = lineId(i, j);
      const clip = clips.get(id);
      const start = t;
      const end = start + clip.duration;
      placements.push({ id, at: start });
      t = end + (j < scene.lines.length - 1 ? (/[?:]$/.test(line.say.trim()) ? BEAT_GAP : LINE_GAP) : 0);
      const focusNode = scene.kind === "flow" && line.focus ? resolveFocus(scene, line.focus) : undefined;
      return { ...line, start, end, markAt: markTime(line, start, clip.duration, clip.words), ...(focusNode !== undefined ? { focusNode } : {}) };
    });
    const from = lines[0].start;
    const to = lines[lines.length - 1].end;
    const t0 = i === 0 ? 0 : from - TRANSITION_FRAMES / FPS - 0.1;
    scenes.push({ ...scene, lines, from, to, t0 });
    if (i < script.scenes.length - 1) t += SCENE_GAP;
  });
  const lastScene = scenes[scenes.length - 1];
  const seconds = lastScene.to + (lastScene.kind === "close" ? HOLD : END);
  const timeline = {
    title: script.title ?? scenes[0].title ?? "Video",
    language: baseLanguage(script.language),
    fps: FPS,
    width: 1920,
    height: 1080,
    frames: Math.ceil(seconds * FPS),
    transition: TRANSITION_FRAMES,
    captions: script.captions ?? captions,
    scenes,
  };
  return { timeline, placements, seconds: timeline.frames / FPS };
}
