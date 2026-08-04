import { createHash } from "node:crypto";
import { readFile, readdir, realpath, stat } from "node:fs/promises";
import path from "node:path";

import { parse as parseYaml } from "yaml";
import { z } from "zod";

import type { FindingSeverity } from "./evaluation-contracts.ts";
import { listFiles } from "./filesystem.ts";
import { findPublicBoundaryViolations } from "./public-boundary.ts";
import {
  loadSourceInventory,
  verifyPinnedSource,
  verifyPinnedTarget,
} from "./source-inventory.ts";
import type {
  SourceInventory,
  SourceTargetVerifier,
  SourceVerifier,
} from "./source-inventory.ts";

export interface RepositoryFinding {
  check: string;
  severity: FindingSeverity;
  message: string;
  file?: string;
}

export interface RepositoryValidation {
  findings: RepositoryFinding[];
  checkedFiles: number;
  checkedSkills: number;
}

const excludedDirectories = new Set([
  ".git",
  ".pnpm-store",
  ".scratch",
  "node_modules",
]);
const textExtensions = new Set([
  ".json",
  ".jsonc",
  ".md",
  ".mts",
  ".ts",
  ".txt",
  ".yaml",
  ".yml",
]);
const skillNameSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u);
const relativePathSchema = z
  .string()
  .trim()
  .min(1)
  .refine(
    (value) => !path.isAbsolute(value) && !value.split("/").includes(".."),
    "Path must stay relative to its declared root."
  );

const exists = async (filePath: string): Promise<boolean> => {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
};

const localMarkdownTargets = (contents: string): string[] => {
  const targets: string[] = [];
  const expression = /!?(?:\[[^\]]*\])\((?<target>[^)]+)\)/gu;

  for (const match of contents.matchAll(expression)) {
    const rawTarget = match.groups?.target?.trim();
    if (!rawTarget) {
      continue;
    }
    const target =
      rawTarget.startsWith("<") && rawTarget.endsWith(">")
        ? rawTarget.slice(1, -1)
        : rawTarget.split(/\s+['"]/u, 1)[0];
    if (
      target &&
      !target.startsWith("#") &&
      !/^[a-z][a-z0-9+.-]*:/iu.test(target)
    ) {
      targets.push(decodeURIComponent(target.split("#", 1)[0] ?? ""));
    }
  }

  return targets.filter(Boolean);
};

const frontmatterSchema = z.object({
  description: z.string().trim().min(1),
  "disable-model-invocation": z.boolean().optional(),
  name: skillNameSchema,
});

const openAiMetadataSchema = z.object({
  interface: z.object({
    display_name: z.string().trim().min(1),
    short_description: z.string().trim().min(1),
  }),
  policy: z.object({
    allow_implicit_invocation: z.boolean(),
  }),
});

const provenanceSchema = z
  .object({
    changedAssumptions: z.array(z.string().trim().min(1)),
    retainedBehavior: z.array(z.string().trim().min(1)),
    schemaVersion: z.literal(1),
    sources: z.array(z.object({ id: z.string().trim().min(1) })),
    strategy: z.enum(["original", "adapted", "upstream-overlay"]),
  })
  .superRefine((provenance, context) => {
    if (provenance.strategy !== "original" && provenance.sources.length === 0) {
      context.addIssue({
        code: "custom",
        message:
          "Adapted and upstream-overlay skills require a source reference.",
        path: ["sources"],
      });
    }
  });

const repositoryConfigSchema = z.object({
  expectedSkills: z.array(skillNameSchema),
  schemaVersion: z.literal(1),
});

const overlayInventorySchema = z.object({
  overlays: z.array(
    z.object({
      id: z.string().trim().min(1),
      patchFile: relativePathSchema,
      sha256: z.string().regex(/^[a-f0-9]{64}$/u),
      skill: skillNameSchema,
      sourceId: z.string().trim().min(1),
      target: relativePathSchema,
    })
  ),
  schemaVersion: z.literal(1),
});

const parseFrontmatter = (contents: string): unknown => {
  const match = contents.match(
    /^---\r?\n(?<frontmatter>[\s\S]*?)\r?\n---(?:\r?\n|$)/u
  );
  if (!match?.groups?.frontmatter) {
    throw new Error("SKILL.md must begin with YAML frontmatter.");
  }
  return parseYaml(match.groups.frontmatter);
};

const skillBody = (contents: string): string =>
  contents.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/u, "").trim();

const validateMarkdown = async (
  root: string,
  files: string[]
): Promise<RepositoryFinding[]> => {
  const markdownFiles = files.filter(
    (filePath) => path.extname(filePath) === ".md"
  );
  const nested = await Promise.all(
    markdownFiles.map(async (filePath): Promise<RepositoryFinding[]> => {
      const contents = await readFile(filePath, "utf-8");
      const displayPath = path.relative(root, filePath);
      const findings: RepositoryFinding[] = [];
      const fenceCount = contents
        .split(/\r?\n/u)
        .filter((line) => /^\s*(?:```|~~~)/u.test(line)).length;
      if (fenceCount % 2 !== 0) {
        findings.push({
          check: "markdown-fences",
          file: displayPath,
          message: "Markdown contains an unclosed fenced block.",
          severity: "Major",
        });
      }

      const targets = await Promise.all(
        localMarkdownTargets(contents).map(async (target) => ({
          exists: await exists(path.resolve(path.dirname(filePath), target)),
          target,
        }))
      );
      for (const target of targets) {
        const absoluteTarget = path.resolve(
          path.dirname(filePath),
          target.target
        );
        const insideRoot =
          absoluteTarget === path.resolve(root) ||
          absoluteTarget.startsWith(`${path.resolve(root)}${path.sep}`);
        if (!insideRoot || !target.exists) {
          findings.push({
            check: "markdown-links",
            file: displayPath,
            message: `Local link target does not exist: ${target.target}`,
            severity: "Major",
          });
        }
      }
      return findings;
    })
  );
  return nested.flat();
};

const validatePublicBoundary = async (
  root: string,
  files: string[]
): Promise<RepositoryFinding[]> => {
  const textFiles = files.filter((filePath) =>
    textExtensions.has(path.extname(filePath))
  );
  const nested = await Promise.all(
    textFiles.map(async (filePath): Promise<RepositoryFinding[]> => {
      const contents = await readFile(filePath, "utf-8");
      return findPublicBoundaryViolations(contents).map((violation) => ({
        check: "public-boundary",
        file: path.relative(root, filePath),
        message: `Public content contains ${violation}.`,
        severity: "Critical",
      }));
    })
  );
  return nested.flat();
};

const validateSkill = async (
  root: string,
  skillsRoot: string,
  skillName: string,
  sourceIds: ReadonlySet<string>
): Promise<RepositoryFinding[]> => {
  const skillRoot = path.join(skillsRoot, skillName);
  const skillPath = path.join(skillRoot, "SKILL.md");
  const metadataPath = path.join(skillRoot, "agents", "openai.yaml");
  const provenancePath = path.join(skillRoot, "provenance.yaml");
  const findings: RepositoryFinding[] = [];
  let frontmatter: z.infer<typeof frontmatterSchema> | undefined;
  let metadata: z.infer<typeof openAiMetadataSchema> | undefined;

  try {
    const contents = await readFile(skillPath, "utf-8");
    frontmatter = frontmatterSchema.parse(parseFrontmatter(contents));
    if (frontmatter.name !== skillName) {
      findings.push({
        check: "skill-metadata",
        file: path.relative(root, skillPath),
        message: `Skill name "${frontmatter.name}" must match its directory "${skillName}".`,
        severity: "Major",
      });
    }
    const body = skillBody(contents);
    if (body.length < 40 || /\b(?:placeholder|tbd|todo)\b/iu.test(body)) {
      findings.push({
        check: "skill-structure",
        file: path.relative(root, skillPath),
        message: "SKILL.md appears to be a placeholder.",
        severity: "Major",
      });
    }
  } catch (error) {
    findings.push({
      check: "skill-metadata",
      file: path.relative(root, skillPath),
      message:
        error instanceof Error
          ? error.message
          : "Invalid SKILL.md frontmatter.",
      severity: "Major",
    });
  }

  try {
    metadata = openAiMetadataSchema.parse(
      parseYaml(await readFile(metadataPath, "utf-8"))
    );
  } catch (error) {
    findings.push({
      check: "skill-metadata",
      file: path.relative(root, metadataPath),
      message:
        error instanceof Error ? error.message : "Invalid agents/openai.yaml.",
      severity: "Major",
    });
  }

  if (frontmatter && metadata) {
    const modelInvocationEnabled =
      frontmatter["disable-model-invocation"] !== true;
    if (metadata.policy.allow_implicit_invocation !== modelInvocationEnabled) {
      findings.push({
        check: "skill-metadata",
        file: path.relative(root, metadataPath),
        message:
          "SKILL.md and agents/openai.yaml invocation policies disagree.",
        severity: "Major",
      });
    }
  }

  try {
    const provenance = provenanceSchema.parse(
      parseYaml(await readFile(provenancePath, "utf-8"))
    );
    for (const source of provenance.sources) {
      if (!sourceIds.has(source.id)) {
        findings.push({
          check: "skill-provenance",
          file: path.relative(root, provenancePath),
          message: `Provenance references unknown source "${source.id}".`,
          severity: "Major",
        });
      }
    }
  } catch (error) {
    findings.push({
      check: "skill-provenance",
      file: path.relative(root, provenancePath),
      message: `Invalid provenance.yaml: ${error instanceof Error ? error.message : "unknown schema error"}`,
      severity: "Major",
    });
  }

  return findings;
};

const validateSkills = async (
  root: string,
  sourceIds: ReadonlySet<string>
): Promise<{ findings: RepositoryFinding[]; checkedSkills: number }> => {
  const skillsRoot = path.join(root, "skills");
  const entries = await readdir(skillsRoot, { withFileTypes: true }).catch(
    () => []
  );
  const skillNames = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted();
  const nested = await Promise.all(
    skillNames.map((skillName) =>
      validateSkill(root, skillsRoot, skillName, sourceIds)
    )
  );
  const findings = nested.flat();
  const configPath = path.join(root, "validation", "repository.yaml");

  try {
    const config = repositoryConfigSchema.parse(
      parseYaml(await readFile(configPath, "utf-8"))
    );
    const expected = new Set(config.expectedSkills);
    const actual = new Set(skillNames);
    for (const skillName of config.expectedSkills.filter(
      (name) => !actual.has(name)
    )) {
      findings.push({
        check: "skill-structure",
        file: path.relative(root, skillsRoot),
        message: `Expected skill directory is missing: ${skillName}.`,
        severity: "Major",
      });
    }
    for (const skillName of skillNames.filter((name) => !expected.has(name))) {
      findings.push({
        check: "skill-structure",
        file: path.relative(root, path.join(skillsRoot, skillName)),
        message: `Skill directory is absent from validation/repository.yaml: ${skillName}.`,
        severity: "Major",
      });
    }
  } catch (error) {
    findings.push({
      check: "skill-structure",
      file: path.relative(root, configPath),
      message:
        error instanceof Error
          ? error.message
          : "Invalid repository validation config.",
      severity: "Major",
    });
  }

  return { checkedSkills: skillNames.length, findings };
};

interface SourceValidation {
  findings: RepositoryFinding[];
  inventory: SourceInventory;
}

const validateSourcePins = async (
  root: string,
  verifySource: SourceVerifier
): Promise<SourceValidation> => {
  const sourcePath = path.join(root, "validation", "sources.yaml");
  try {
    const inventory = await loadSourceInventory(root);
    const results = await Promise.all(
      inventory.sources.map(async (source) => ({
        source,
        verified: await verifySource(source),
      }))
    );
    const findings = results.flatMap((result): RepositoryFinding[] =>
      result.verified
        ? []
        : [
            {
              check: "source-pins",
              file: path.relative(root, sourcePath),
              message: `Pinned revision could not be verified for source "${result.source.id}".`,
              severity: "Major",
            },
          ]
    );
    return { findings, inventory };
  } catch (error) {
    return {
      findings: [
        {
          check: "source-pins",
          file: path.relative(root, sourcePath),
          message: `Invalid source inventory: ${error instanceof Error ? error.message : "unknown schema error"}`,
          severity: "Major",
        },
      ],
      inventory: { schemaVersion: 1, sources: [] },
    };
  }
};

const validateOverlays = async (
  root: string,
  sourceInventory: SourceInventory,
  verifyTarget: SourceTargetVerifier
): Promise<RepositoryFinding[]> => {
  const inventoryPath = path.join(root, "validation", "overlays.yaml");
  try {
    const inventory = overlayInventorySchema.parse(
      parseYaml(await readFile(inventoryPath, "utf-8"))
    );
    const ids = inventory.overlays.map((overlay) => overlay.id);
    const duplicateFindings: RepositoryFinding[] =
      new Set(ids).size === ids.length
        ? []
        : [
            {
              check: "overlay-integrity",
              file: path.relative(root, inventoryPath),
              message: "Overlay ids must be unique.",
              severity: "Major",
            },
          ];
    const absoluteRoot = await realpath(root);
    const sources = new Map(
      sourceInventory.sources.map((source) => [source.id, source])
    );
    const nested = await Promise.all(
      inventory.overlays.map(async (overlay): Promise<RepositoryFinding[]> => {
        const findings: RepositoryFinding[] = [];
        const source = sources.get(overlay.sourceId);
        if (!source) {
          findings.push({
            check: "overlay-integrity",
            file: path.relative(root, inventoryPath),
            message: `Overlay "${overlay.id}" references unknown source "${overlay.sourceId}".`,
            severity: "Major",
          });
        } else if (!(await verifyTarget(source, overlay.target))) {
          findings.push({
            check: "overlay-integrity",
            file: path.relative(root, inventoryPath),
            message: `Overlay "${overlay.id}" target "${overlay.target}" does not exist at the pinned source revision.`,
            severity: "Major",
          });
        }
        const patchPath = path.resolve(root, overlay.patchFile);
        try {
          const resolvedPatchPath = await realpath(patchPath);
          if (!resolvedPatchPath.startsWith(`${absoluteRoot}${path.sep}`)) {
            findings.push({
              check: "overlay-integrity",
              file: overlay.patchFile,
              message: `Overlay "${overlay.id}" patch escapes the repository.`,
              severity: "Critical",
            });
            return findings;
          }
          const contents = await readFile(resolvedPatchPath);
          const actualHash = createHash("sha256")
            .update(contents)
            .digest("hex");
          if (actualHash !== overlay.sha256) {
            findings.push({
              check: "overlay-integrity",
              file: overlay.patchFile,
              message: `Overlay "${overlay.id}" hash does not match its patch file.`,
              severity: "Major",
            });
          }
        } catch {
          findings.push({
            check: "overlay-integrity",
            file: overlay.patchFile,
            message: `Overlay "${overlay.id}" patch file is missing.`,
            severity: "Major",
          });
        }
        return findings;
      })
    );
    return [...duplicateFindings, ...nested.flat()];
  } catch (error) {
    return [
      {
        check: "overlay-integrity",
        file: path.relative(root, inventoryPath),
        message: `Invalid overlay inventory: ${error instanceof Error ? error.message : "unknown schema error"}`,
        severity: "Major",
      },
    ];
  }
};

interface RepositoryValidationOptions {
  sourceTargetVerifier?: SourceTargetVerifier;
  sourceVerifier?: SourceVerifier;
}

export const validateRepository = async (
  root: string,
  options: RepositoryValidationOptions = {}
): Promise<RepositoryValidation> => {
  const sourceValidation = await validateSourcePins(
    root,
    options.sourceVerifier ?? verifyPinnedSource
  );
  const sourceIds = new Set(
    sourceValidation.inventory.sources.map((source) => source.id)
  );
  const files = await listFiles(root, {
    excludeDirectories: excludedDirectories,
  });
  const skillValidation = await validateSkills(root, sourceIds);
  const findings = [
    ...(await validateMarkdown(root, files)),
    ...(await validatePublicBoundary(root, files)),
    ...sourceValidation.findings,
    ...skillValidation.findings,
    ...(await validateOverlays(
      root,
      sourceValidation.inventory,
      options.sourceTargetVerifier ?? verifyPinnedTarget
    )),
  ];

  return {
    checkedFiles: files.length,
    checkedSkills: skillValidation.checkedSkills,
    findings,
  };
};
