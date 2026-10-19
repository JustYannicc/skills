// Keeps the Remotion project's dependencies and bundle in a cache outside the skill, then renders.
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { availableParallelism } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { pruneNewest, which } from "./sys.mjs";

const DEP_FILES = ["package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml"];

function files(dir, base = dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (name === "node_modules") return [];
    return statSync(full).isDirectory() ? files(full, base) : [path.relative(base, full)];
  });
}

const digest = (root, list) => {
  const h = createHash("sha256");
  for (const f of list.sort()) h.update(f).update(readFileSync(path.join(root, f)));
  return h.digest("hex").slice(0, 16);
};

/** Copy the renderer source into the cache, install deps when they changed, and return a bundle directory. */
export async function prepare({ rendererSource, cacheDir, log, builtIn = true }) {
  // the built-in renderer gets a stable work dir; a copied one gets its own, keyed by its path
  const work = path.join(cacheDir, builtIn ? "renderer" : `renderer-${createHash("sha256").update(rendererSource).digest("hex").slice(0, 10)}`);
  mkdirSync(work, { recursive: true });
  const all = files(rendererSource);
  rmSync(path.join(work, "src"), { recursive: true, force: true });
  for (const f of all) cpSync(path.join(rendererSource, f), path.join(work, f));

  const depsHash = digest(rendererSource, all.filter((f) => DEP_FILES.includes(f)));
  const stamp = path.join(work, ".deps-hash");
  if (!existsSync(path.join(work, "node_modules")) || !existsSync(stamp) || readFileSync(stamp, "utf8") !== depsHash) {
    log("Installing the video renderer (first run, or its dependencies changed)…");
    const [cmd, args] = which("pnpm") ? ["pnpm", ["install", "--frozen-lockfile"]] : ["npm", ["install", "--no-audit", "--no-fund"]];
    const r = spawnSync(cmd, args, { cwd: work, stdio: ["ignore", "inherit", "inherit"] });
    if (r.status !== 0) throw new Error(`${cmd} install failed in ${work}`);
    writeFileSync(stamp, depsHash);
  }

  const require = createRequire(path.join(work, "package.json"));
  const load = (name) => import(pathToFileURL(require.resolve(name)).href);
  const [bundler, renderer] = await Promise.all([load("@remotion/bundler"), load("@remotion/renderer")]);

  const bundles = path.join(cacheDir, "bundles");
  const serveUrl = path.join(bundles, digest(rendererSource, all));
  if (!existsSync(path.join(serveUrl, "index.html"))) {
    log("Bundling the composition…");
    await bundler.bundle({ entryPoint: path.join(work, "src", "index.ts"), outDir: serveUrl, enableCaching: true });
    pruneNewest(bundles, 3);
  }
  await renderer.ensureBrowser();
  return { renderer, serveUrl };
}

/**
 * Render the composition without audio; the narration is muxed in afterwards with ffmpeg.
 * One headless Chrome tops out well below what the machine can do, so the frames are split
 * across a few browsers and the parts joined without re-encoding.
 */
export async function renderSilent({ renderer, serveUrl, timeline, outFile, log }) {
  const inputProps = { timeline };
  const composition = await renderer.selectComposition({ serveUrl, id: "Video", inputProps });
  const cores = availableParallelism();
  const parts = Math.max(1, Math.min(3, Math.floor(cores / 4), Math.floor(composition.durationInFrames / 300)));
  const size = Math.ceil(composition.durationInFrames / parts);
  const ranges = Array.from({ length: parts }, (_, k) => [k * size, Math.min(composition.durationInFrames, (k + 1) * size) - 1]);
  const done = new Array(parts).fill(0);
  let last = -1;
  const files = await Promise.all(
    ranges.map(async (frameRange, k) => {
      const file = parts === 1 ? outFile : outFile.replace(/\.mp4$/, `.part${k}.mp4`);
      const browser = await renderer.openBrowser("chrome");
      try {
        await renderer.renderMedia({
          serveUrl,
          composition,
          inputProps,
          codec: "h264",
          crf: 18,
          muted: true,
          frameRange,
          puppeteerInstance: browser,
          outputLocation: file,
          concurrency: Math.max(2, Math.floor((cores * 0.75) / parts)),
          onProgress: ({ progress }) => {
            done[k] = progress;
            const step = Math.floor((done.reduce((a, b) => a + b, 0) / parts) * 10);
            if (step !== last) {
              last = step;
              log(`Rendering frames… ${step * 10}%`);
            }
          },
        });
      } finally {
        await browser.close({ silent: true });
      }
      return file;
    }),
  );
  if (parts === 1) return;
  const list = `${outFile}.parts.txt`;
  writeFileSync(list, files.map((f) => `file '${f.replaceAll("'", "'\\''")}'`).join("\n"));
  const r = spawnSync("ffmpeg", ["-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", list, "-c", "copy", outFile], { encoding: "utf8" });
  if (r.status !== 0) throw new Error(`ffmpeg could not join the rendered parts: ${r.stderr}`);
  for (const f of [list, ...files]) rmSync(f, { force: true });
}
