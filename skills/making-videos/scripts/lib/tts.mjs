// Turns narration lines into audio clips. The engine order per language lives in ROUTES and
// nowhere else: moving English to Narrateify is a one-line change.
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFileSync, createWriteStream, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import { pruneNewest, which } from "./sys.mjs";

const SCRIPTS = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export const ROUTES = {
  en: ["kokoro", "narrateify", "say"],
  default: ["narrateify", "say"],
};

// ---- Kokoro v1.0 via kokoro-onnx (voice af_heart), run with uv --------------------------------

const KOKORO_FILES = {
  "kokoro-v1.0.onnx": "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx",
  "voices-v1.0.bin": "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin",
};

async function kokoroModels(cacheDir, log) {
  const has = (dir) => Object.keys(KOKORO_FILES).every((f) => existsSync(path.join(dir, f)));
  for (const dir of [process.env.KOKORO_MODELS, path.join(cacheDir, "kokoro"), path.join(homedir(), ".cache", "kokoro-models")]) {
    if (dir && has(dir)) return dir;
  }
  const dir = path.join(cacheDir, "kokoro");
  mkdirSync(dir, { recursive: true });
  for (const [file, url] of Object.entries(KOKORO_FILES)) {
    const target = path.join(dir, file);
    if (existsSync(target)) continue;
    log(`Downloading ${file} (first run only)…`);
    const res = await fetch(url);
    if (!res.ok || !res.body) throw new Error(`download failed: ${url} (${res.status})`);
    await pipeline(Readable.fromWeb(res.body), createWriteStream(`${target}.part`));
    renameSync(`${target}.part`, target);
  }
  return dir;
}

const kokoro = {
  available: (lang) => lang === "en" && Boolean(which("uv")),
  async run(lines, { voice = "af_heart", workDir, cacheDir, log }) {
    const models = await kokoroModels(cacheDir, log);
    const manifest = path.join(workDir, "kokoro-clips.json");
    const outDir = path.join(workDir, "clips");
    writeFileSync(manifest, JSON.stringify(lines.map(({ id, text }) => ({ id, text }))));
    const r = spawnSync("uv", ["run", "--quiet", "--script", path.join(SCRIPTS, "kokoro.py"), "--manifest", manifest, "--out-dir", outDir, "--models", models, "--voice", voice, "--lang", "en-us"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    if (r.status !== 0) throw new Error((r.stderr || r.error?.message || "kokoro failed").trim().split("\n").slice(-4).join("\n"));
    return { voice, model: "Kokoro v1.0 (kokoro-onnx)", clips: lines.map(({ id }) => ({ id, file: path.join(outDir, `${id}.wav`) })) };
  },
};

// ---- Narrateify CLI (macOS app): per-call engine/model, exact word timings --------------------

const narrateifyBin = () => which("narrateify") ?? (existsSync(path.join(homedir(), ".local/bin/narrateify")) ? path.join(homedir(), ".local/bin/narrateify") : null);

const narrateify = {
  available: () => Boolean(narrateifyBin()),
  async run(lines, { lang, voice, workDir }) {
    const clipsFile = path.join(workDir, "narrateify-clips.json");
    const outDir = path.join(workDir, "clips");
    writeFileSync(clipsFile, JSON.stringify(lines.map(({ id, text }) => ({ id, text }))));
    const args = ["batch", clipsFile, "--out-dir", outDir, "--language", lang, "--format", "wav", "--words"];
    // English through Narrateify should still be Kokoro af_heart.
    if (lang === "en") args.push("--model", "kokoro", "--voice", voice ?? "af_heart", "--fallback");
    else if (voice) args.push("--voice", voice);
    const r = spawnSync(narrateifyBin(), args, { encoding: "utf8", maxBuffer: 64 << 20 });
    if (r.status !== 0) throw new Error((r.stderr || "narrateify failed").trim());
    const manifest = JSON.parse(r.stdout);
    const first = manifest[0]?.sections?.[0] ?? {};
    return {
      voice: first.voice ?? voice ?? "default",
      model: `Narrateify ${first.engine ?? ""}`.trim(),
      clips: manifest.map((c) => ({ id: c.id, file: c.path, words: c.words })),
    };
  },
};

// ---- macOS say: last resort ------------------------------------------------------------------

const SAY_VOICES = { de: "Anna", en: "Samantha", fr: "Thomas", es: "Monica", it: "Alice" };

const say = {
  available: (lang) => process.platform === "darwin" && Boolean(SAY_VOICES[lang]),
  async run(lines, { lang, voice, workDir }) {
    const v = voice ?? SAY_VOICES[lang];
    const outDir = path.join(workDir, "clips");
    mkdirSync(outDir, { recursive: true });
    const clips = lines.map(({ id, text }) => {
      const file = path.join(outDir, `${id}.aiff`);
      const r = spawnSync("say", ["-v", v, "-o", file, "--", text], { encoding: "utf8" });
      if (r.status !== 0) throw new Error(`say failed: ${r.stderr}`);
      return { id, file };
    });
    return { voice: v, model: "macOS say", clips };
  },
};

const BACKENDS = { kokoro, narrateify, say };

export const baseLanguage = (language = "en") => String(language).toLowerCase().split(/[-_]/)[0];

/**
 * lines: [{ id, text }] → { engine, model, voice, cached, clips: [{ id, file, words? }] }
 * Clips are cached by language, requested engine and voice, and text, so a rerun after a
 * visual fix doesn't voice anything again.
 */
export async function synthesize(lines, options) {
  const { language, engine, voice, cacheDir } = options;
  const dir = path.join(cacheDir, "clips");
  mkdirSync(dir, { recursive: true });
  const key = (text) => createHash("sha256").update(JSON.stringify([baseLanguage(language), engine ?? "", voice ?? "", text])).digest("hex").slice(0, 24);
  const hits = [];
  const misses = [];
  for (const line of lines) {
    const meta = path.join(dir, `${key(line.text)}.json`);
    if (existsSync(meta)) {
      const m = JSON.parse(readFileSync(meta, "utf8"));
      if (existsSync(m.file)) hits.push({ line, m });
      else misses.push(line);
    } else misses.push(line);
  }
  const fresh = misses.length ? await synthesizeUncached(misses, options) : null;
  for (const c of fresh?.clips ?? []) {
    const line = misses.find((l) => l.id === c.id);
    const file = path.join(dir, `${key(line.text)}${path.extname(c.file)}`);
    copyFileSync(c.file, file);
    const m = { file, words: c.words, engine: fresh.engine, model: fresh.model, voice: fresh.voice };
    writeFileSync(path.join(dir, `${key(line.text)}.json`), JSON.stringify(m));
    hits.push({ line, m });
  }
  pruneNewest(dir, 1200);
  const byId = new Map(hits.map((h) => [h.line.id, h.m]));
  const about = fresh ?? byId.get(lines[0].id);
  return {
    engine: about.engine,
    model: about.model,
    voice: about.voice,
    cached: lines.length - misses.length,
    clips: lines.map(({ id }) => ({ id, file: byId.get(id).file, words: byId.get(id).words })),
  };
}

/** `engine` puts one backend first; the language's route follows as fallback. */
async function synthesizeUncached(lines, { language = "en", engine, voice, workDir, cacheDir, log = console.error }) {
  const lang = baseLanguage(language);
  const base = ROUTES[lang] ?? ROUTES.default;
  const route = engine ? [engine, ...base.filter((e) => e !== engine)] : base;
  const errors = [];
  for (const name of route) {
    const backend = BACKENDS[name];
    if (!backend) throw new Error(`unknown voice engine: ${name}`);
    if (!backend.available(lang)) {
      errors.push(`${name}: not available for "${lang}" here`);
      continue;
    }
    try {
      return { engine: name, ...(await backend.run(lines, { lang, voice: name === route[0] ? voice : undefined, workDir, cacheDir, log })) };
    } catch (error) {
      errors.push(`${name}: ${error.message}`);
      log(`Voice engine ${name} failed, trying the next one.\n${error.message}`);
    }
  }
  throw new Error(`No voice engine worked:\n${errors.join("\n")}`);
}
