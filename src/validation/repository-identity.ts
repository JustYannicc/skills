import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { z } from "zod";

import { listFiles } from "./filesystem.ts";

const execFileAsync = promisify(execFile);
const excludedDirectories = new Set([
  ".git",
  ".pnpm-store",
  ".scratch",
  "evaluations",
  "node_modules",
]);
const packageSchema = z.object({ version: z.string().trim().min(1) });

export interface CandidateIdentity {
  revision: string;
  version: string;
}

const relevantStatusPaths = (status: string): string[] =>
  status
    .split("\n")
    .filter(Boolean)
    .map((line) => line.slice(3).split(" -> ").at(-1) ?? "")
    .filter(
      (filePath) =>
        filePath !== "" &&
        !filePath.startsWith(".pnpm-store/") &&
        !filePath.startsWith(".scratch/") &&
        !filePath.startsWith("evaluations/") &&
        !filePath.startsWith("node_modules/")
    );

const contentRevision = async (root: string): Promise<string> => {
  const files = await listFiles(root, {
    excludeDirectories: excludedDirectories,
  });
  const records = await Promise.all(
    files.map(async (filePath) => {
      const contents = await readFile(filePath);
      return `${path.relative(root, filePath)}\0${createHash("sha256").update(contents).digest("hex")}`;
    })
  );
  return createHash("sha256").update(records.join("\n")).digest("hex");
};

export const resolveCandidateIdentity = async (
  root: string
): Promise<CandidateIdentity> => {
  const packageContents = await readFile(
    path.join(root, "package.json"),
    "utf-8"
  );
  const { version } = packageSchema.parse(JSON.parse(packageContents));
  try {
    const [{ stdout: candidateCommit }, { stdout: status }] = await Promise.all(
      [
        execFileAsync(
          "git",
          [
            "log",
            "--first-parent",
            "-1",
            "--format=%H",
            "--",
            ".",
            ":(exclude)evaluations/**",
          ],
          { cwd: root }
        ),
        execFileAsync(
          "git",
          ["status", "--porcelain=v1", "--untracked-files=all"],
          {
            cwd: root,
          }
        ),
      ]
    );
    const revision = candidateCommit.trim();
    if (
      /^[a-f0-9]{40}$/u.test(revision) &&
      relevantStatusPaths(status).length === 0
    ) {
      return { revision: `git:${revision}`, version };
    }
  } catch {
    // A non-Git authoring environment uses the same deterministic content identity.
  }

  return {
    revision: `working-tree:${await contentRevision(root)}`,
    version,
  };
};
