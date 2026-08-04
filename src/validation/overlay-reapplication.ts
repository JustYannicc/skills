import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface OverlayReapplicationInput {
  patchFile: string;
  target: string;
  targetContents: Buffer;
}

export type OverlayReapplicationVerifier = (
  input: OverlayReapplicationInput
) => Promise<boolean>;

const listedTargets = (numstat: string): string[] =>
  numstat
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("\t").at(-1))
    .filter((target): target is string => target !== undefined);

export const verifyOverlayReapplication: OverlayReapplicationVerifier = async (
  input
) => {
  const temporaryRoot = await mkdtemp(
    path.join(tmpdir(), "skills-overlay-reapplication-")
  );
  try {
    const targetPath = path.join(temporaryRoot, input.target);
    await mkdir(path.dirname(targetPath), { recursive: true });
    await writeFile(targetPath, input.targetContents);
    const { stdout } = await execFileAsync(
      "git",
      ["apply", "--check", "--numstat", input.patchFile],
      { cwd: temporaryRoot }
    );
    const targets = listedTargets(stdout);
    if (targets.length !== 1 || targets[0] !== input.target) {
      return false;
    }
    return true;
  } catch {
    return false;
  } finally {
    await rm(temporaryRoot, { force: true, recursive: true });
  }
};
