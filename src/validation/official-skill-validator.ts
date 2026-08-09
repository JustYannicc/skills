import { execFile } from "node:child_process";
import {
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import type { SuiteFinding } from "./evaluation-suite.ts";
import { projectSkillFrontmatter } from "./skill-document.ts";
import { loadSourceInventory } from "./source-inventory.ts";

const execFileAsync = promisify(execFile);

export const projectOfficialSkillFrontmatter = (contents: string): string =>
  projectSkillFrontmatter(contents, ["disable-model-invocation"]);

export interface OfficialSkillValidation {
  checkedSkills: number;
  findings: SuiteFinding[];
}

const errorMessage = (error: unknown): string => {
  if (error && typeof error === "object" && "stderr" in error) {
    return String(error.stderr).trim();
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Official Agent Skills validation failed.";
};

export const validateWithOfficialReference = async (
  root: string
): Promise<OfficialSkillValidation> => {
  const skillsRoot = path.join(root, "skills");
  const inventory = await loadSourceInventory(root);
  const referenceSource = inventory.sources.find(
    (source) => source.id === "agent-skills-reference-validator"
  );
  if (!referenceSource) {
    return {
      checkedSkills: 0,
      findings: [
        {
          check: "agent-skills-reference",
          message:
            "Source inventory is missing agent-skills-reference-validator.",
          severity: "Major",
        },
      ],
    };
  }
  const entries = await readdir(skillsRoot, { withFileTypes: true }).catch(
    () => []
  );
  const skillDirectories = entries.filter((entry) => entry.isDirectory());
  const projectionRoot = await mkdtemp(
    path.join(tmpdir(), "agent-skills-reference-")
  );
  try {
    const results = await Promise.all(
      skillDirectories.map(async (entry): Promise<SuiteFinding | null> => {
        const skillPath = path.join(skillsRoot, entry.name);
        try {
          let validationPath = skillPath;
          const skillFile = path.join(skillPath, "SKILL.md");
          const contents = await readFile(skillFile, "utf-8");
          const projected = projectOfficialSkillFrontmatter(contents);
          if (projected !== contents) {
            validationPath = path.join(projectionRoot, entry.name);
            await mkdir(validationPath, { recursive: true });
            await writeFile(path.join(validationPath, "SKILL.md"), projected);
          }
          await execFileAsync(
            "uvx",
            [
              "--from",
              `git+${referenceSource.url}@${referenceSource.revision}#subdirectory=skills-ref`,
              "skills-ref",
              "validate",
              validationPath,
            ],
            { cwd: root, env: { ...process.env, UV_NO_PROGRESS: "1" } }
          );
          return null;
        } catch (error) {
          return {
            check: "agent-skills-reference",
            file: path.relative(root, skillPath),
            message:
              errorMessage(error) || "Official Agent Skills validation failed.",
            severity: "Major",
          };
        }
      })
    );
    const findings = results.filter(
      (finding): finding is SuiteFinding => finding !== null
    );

    return { checkedSkills: skillDirectories.length, findings };
  } finally {
    await rm(projectionRoot, { force: true, recursive: true });
  }
};
