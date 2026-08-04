import { execFile } from "node:child_process";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import type { SuiteFinding } from "./evaluation-suite.ts";
import { loadSourceInventory } from "./source-inventory.ts";

const execFileAsync = promisify(execFile);

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
  const results = await Promise.all(
    skillDirectories.map(async (entry): Promise<SuiteFinding | null> => {
      const skillPath = path.join(skillsRoot, entry.name);
      try {
        await execFileAsync(
          "uvx",
          [
            "--from",
            `git+${referenceSource.url}@${referenceSource.revision}#subdirectory=skills-ref`,
            "skills-ref",
            "validate",
            skillPath,
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
};
