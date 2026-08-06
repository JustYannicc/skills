import { readFile } from "node:fs/promises";
import path from "node:path";

import { parse as parseYaml } from "yaml";
import { z } from "zod";

import { pathExists } from "./filesystem.ts";
import type { RepositoryFinding } from "./repository-contracts.ts";
import { relativePathSchema, skillNameSchema } from "./repository-schemas.ts";
import type { PinnedTargetResolver } from "./source-inventory.ts";

interface RepositoryProvenanceInput {
  root: string;
  skillNames: readonly string[];
  resolvePinnedTarget: PinnedTargetResolver;
}

const originalProvenanceSchema = z
  .object({ strategy: z.literal("original") })
  .strict();
const adaptedProvenanceSchema = z
  .object({
    adaptationMode: z.string().trim().min(1),
    changedAssumptions: z.array(z.string().trim().min(1)).min(1),
    retainedBehavior: z.array(z.string().trim().min(1)).min(1),
    sources: z
      .array(
        z.object({
          sourceId: z.string().trim().min(1),
          targets: z.array(relativePathSchema).min(1),
        })
      )
      .min(1),
    strategy: z.literal("adapted"),
  })
  .strict();
const provenanceSchema = z.discriminatedUnion("strategy", [
  originalProvenanceSchema,
  adaptedProvenanceSchema,
]);

const repositoryConfigSchema = z.object({
  schemaVersion: z.literal(2),
  skills: z.array(
    z.object({
      name: skillNameSchema,
      provenance: z.unknown(),
    })
  ),
});

const findInstalledProvenance = async (
  root: string,
  skillNames: readonly string[]
): Promise<RepositoryFinding[]> => {
  const results = await Promise.all(
    skillNames.map(async (skillName): Promise<RepositoryFinding | null> => {
      const provenancePath = path.join(
        root,
        "skills",
        skillName,
        "provenance.yaml"
      );
      if (!(await pathExists(provenancePath))) {
        return null;
      }
      return {
        check: "skill-provenance",
        file: path.relative(root, provenancePath),
        message:
          "Provenance is repository evidence and must live in validation/repository.yaml, not installed skill runtime files.",
        severity: "Major" as const,
      };
    })
  );
  return results.flatMap((finding) => (finding === null ? [] : [finding]));
};

export const validateRepositoryProvenance = async (
  input: RepositoryProvenanceInput
): Promise<RepositoryFinding[]> => {
  const configPath = path.join(input.root, "validation", "repository.yaml");
  const configFile = path.relative(input.root, configPath);
  const skillsRoot = path.join(input.root, "skills");
  const findings = await findInstalledProvenance(input.root, input.skillNames);

  try {
    const config = repositoryConfigSchema.parse(
      parseYaml(await readFile(configPath, "utf-8"))
    );
    const configuredNames = config.skills.map((skill) => skill.name);
    if (new Set(configuredNames).size !== configuredNames.length) {
      findings.push({
        check: "skill-structure",
        file: configFile,
        message: "Skill provenance records must have unique names.",
        severity: "Major",
      });
    }
    const expected = new Set(configuredNames);
    const actual = new Set(input.skillNames);
    for (const skillName of configuredNames.filter(
      (name) => !actual.has(name)
    )) {
      findings.push({
        check: "skill-structure",
        file: path.relative(input.root, skillsRoot),
        message: `Expected skill directory is missing: ${skillName}.`,
        severity: "Major",
      });
    }
    for (const skillName of input.skillNames.filter(
      (name) => !expected.has(name)
    )) {
      findings.push({
        check: "skill-structure",
        file: path.relative(input.root, path.join(skillsRoot, skillName)),
        message: `Skill directory is absent from validation/repository.yaml: ${skillName}.`,
        severity: "Major",
      });
    }
    const provenanceFindings = await Promise.all(
      config.skills.map(async (skill): Promise<RepositoryFinding[]> => {
        const result = provenanceSchema.safeParse(skill.provenance);
        if (!result.success) {
          return [
            {
              check: "skill-provenance",
              file: configFile,
              message: `Invalid provenance for skill "${skill.name}": ${result.error.message}`,
              severity: "Major",
            },
          ];
        }
        if (result.data.strategy === "original") {
          return [];
        }
        const sourceFindings = await Promise.all(
          result.data.sources.map(
            async (sourceReference): Promise<RepositoryFinding[]> => {
              const resolutions = await Promise.all(
                sourceReference.targets.map(async (target) => ({
                  resolution: await input.resolvePinnedTarget(
                    sourceReference.sourceId,
                    target
                  ),
                  target,
                }))
              );
              if (
                resolutions.some(
                  ({ resolution }) => resolution.status === "source-unknown"
                )
              ) {
                return [
                  {
                    check: "skill-provenance",
                    file: configFile,
                    message: `Provenance for skill "${skill.name}" references unknown source "${sourceReference.sourceId}".`,
                    severity: "Major",
                  },
                ];
              }
              return resolutions
                .filter(
                  ({ resolution }) => resolution.status === "target-missing"
                )
                .map(({ target }) => ({
                  check: "skill-provenance",
                  file: configFile,
                  message: `Provenance for skill "${skill.name}" target "${target}" does not exist at the pinned source revision.`,
                  severity: "Major",
                }));
            }
          )
        );
        return sourceFindings.flat();
      })
    );
    findings.push(...provenanceFindings.flat());
  } catch (error) {
    findings.push({
      check: "skill-structure",
      file: configFile,
      message:
        error instanceof Error
          ? error.message
          : "Invalid repository validation config.",
      severity: "Major",
    });
  }

  return findings;
};
