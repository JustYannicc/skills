// Small process and filesystem helpers shared by the scripts.
import { accessSync, constants, readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";

/** Absolute path of an executable on PATH, or null. */
export function which(cmd) {
  const exts = process.platform === "win32" ? (process.env.PATHEXT ?? ".EXE;.CMD").split(";") : [""];
  for (const dir of (process.env.PATH ?? "").split(path.delimiter)) {
    for (const ext of exts) {
      const candidate = path.join(dir, cmd + ext);
      try {
        accessSync(candidate, constants.X_OK);
        if (statSync(candidate).isFile()) return candidate;
      } catch {}
    }
  }
  return null;
}

/** Delete all but the `keep` most recently modified entries of `dir`. */
export function pruneNewest(dir, keep) {
  const entries = readdirSync(dir).map((d) => path.join(dir, d));
  entries.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs);
  for (const d of entries.slice(keep)) rmSync(d, { recursive: true, force: true });
}
