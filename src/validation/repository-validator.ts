import { createHash } from "node:crypto";
import { readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";

import { parse as parseYaml } from "yaml";
import { z } from "zod";

import { listFiles, pathExists } from "./filesystem.ts";
import { verifyOverlayReapplication } from "./overlay-reapplication.ts";
import type { OverlayReapplicationVerifier } from "./overlay-reapplication.ts";
import { findPublicBoundaryViolations } from "./public-boundary.ts";
import type { RepositoryFinding } from "./repository-contracts.ts";
import { validateRepositoryProvenance } from "./repository-provenance.ts";
import { relativePathSchema, skillNameSchema } from "./repository-schemas.ts";
import {
  createPinnedTargetResolver,
  loadPinnedTarget,
  loadSourceInventory,
  verifyPinnedSource,
} from "./source-inventory.ts";
import type {
  PinnedTargetResolver,
  SourceInventory,
  SourceTargetLoader,
  SourceVerifier,
} from "./source-inventory.ts";

export type { RepositoryFinding } from "./repository-contracts.ts";

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
  ".patch",
  ".ts",
  ".txt",
  ".yaml",
  ".yml",
]);
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
          exists: await pathExists(
            path.resolve(path.dirname(filePath), target)
          ),
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
  skillName: string
): Promise<RepositoryFinding[]> => {
  const skillRoot = path.join(skillsRoot, skillName);
  const skillPath = path.join(skillRoot, "SKILL.md");
  const metadataPath = path.join(skillRoot, "agents", "openai.yaml");
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

  return findings;
};

const validateSkills = async (
  root: string
): Promise<{
  findings: RepositoryFinding[];
  skillNames: string[];
}> => {
  const skillsRoot = path.join(root, "skills");
  const entries = await readdir(skillsRoot, { withFileTypes: true }).catch(
    () => []
  );
  const skillNames = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted();
  const nested = await Promise.all(
    skillNames.map((skillName) => validateSkill(root, skillsRoot, skillName))
  );
  return {
    findings: nested.flat(),
    skillNames,
  };
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
  resolvePinnedTarget: PinnedTargetResolver,
  verifyReapplication: OverlayReapplicationVerifier
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
    const nested = await Promise.all(
      inventory.overlays.map(async (overlay): Promise<RepositoryFinding[]> => {
        const findings: RepositoryFinding[] = [];
        const targetResolution = await resolvePinnedTarget(
          overlay.sourceId,
          overlay.target
        );
        if (targetResolution.status === "source-unknown") {
          findings.push({
            check: "overlay-integrity",
            file: path.relative(root, inventoryPath),
            message: `Overlay "${overlay.id}" references unknown source "${overlay.sourceId}".`,
            severity: "Major",
          });
        } else if (targetResolution.status === "target-missing") {
          findings.push({
            check: "overlay-integrity",
            file: path.relative(root, inventoryPath),
            message: `Overlay "${overlay.id}" target "${overlay.target}" does not exist at the pinned source revision.`,
            severity: "Major",
          });
        }
        const targetContents =
          targetResolution.status === "resolved"
            ? targetResolution.contents
            : null;
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
          const patchHashMatches = actualHash === overlay.sha256;
          if (patchHashMatches === false) {
            findings.push({
              check: "overlay-integrity",
              file: overlay.patchFile,
              message: `Overlay "${overlay.id}" hash does not match its patch file.`,
              severity: "Major",
            });
          }
          if (
            targetContents !== null &&
            patchHashMatches &&
            (await verifyReapplication({
              patchFile: resolvedPatchPath,
              target: overlay.target,
              targetContents,
            })) === false
          ) {
            findings.push({
              check: "overlay-reapplication",
              file: overlay.patchFile,
              message: `Overlay "${overlay.id}" does not apply cleanly to its pinned target.`,
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
  overlayReapplicationVerifier?: OverlayReapplicationVerifier;
  sourceTargetLoader?: SourceTargetLoader;
  sourceVerifier?: SourceVerifier;
}

export const validateRepository = async (
  root: string,
  options: RepositoryValidationOptions = {}
): Promise<RepositoryValidation> => {
  const [sourceValidation, files, skillValidation] = await Promise.all([
    validateSourcePins(root, options.sourceVerifier ?? verifyPinnedSource),
    listFiles(root, { excludeDirectories: excludedDirectories }),
    validateSkills(root),
  ]);
  const sourceTargetLoader = options.sourceTargetLoader ?? loadPinnedTarget;
  const resolvePinnedTarget = createPinnedTargetResolver(
    sourceValidation.inventory,
    sourceTargetLoader
  );
  const [
    markdownFindings,
    publicBoundaryFindings,
    provenanceFindings,
    overlays,
  ] = await Promise.all([
    validateMarkdown(root, files),
    validatePublicBoundary(root, files),
    validateRepositoryProvenance({
      resolvePinnedTarget,
      root,
      skillNames: skillValidation.skillNames,
    }),
    validateOverlays(
      root,
      resolvePinnedTarget,
      options.overlayReapplicationVerifier ?? verifyOverlayReapplication
    ),
  ]);
  const findings = [
    ...markdownFindings,
    ...publicBoundaryFindings,
    ...sourceValidation.findings,
    ...skillValidation.findings,
    ...provenanceFindings,
    ...overlays,
  ];

  return {
    checkedFiles: files.length,
    checkedSkills: skillValidation.skillNames.length,
    findings,
  };
};
