import { readFile } from "node:fs/promises";
import path from "node:path";

import { parse as parseYaml } from "yaml";
import { z } from "zod";

const sourceSchema = z
  .object({
    commitUrl: z.url(),
    id: z.string().trim().min(1),
    license: z.string().trim().min(1),
    revision: z.string().regex(/^[a-f0-9]{40}$/u, {
      message: "revision must be a 40-character Git revision.",
    }),
    url: z.url(),
  })
  .superRefine((source, context) => {
    const repositoryUrl = source.url
      .replace(/\.git\/?$/u, "")
      .replace(/\/$/u, "");
    if (source.commitUrl !== `${repositoryUrl}/commit/${source.revision}`) {
      context.addIssue({
        code: "custom",
        message:
          "commitUrl must identify the pinned revision in the declared source repository.",
        path: ["commitUrl"],
      });
    }
  });

export const sourceInventorySchema = z
  .object({
    schemaVersion: z.literal(1),
    sources: z.array(sourceSchema),
  })
  .superRefine((inventory, context) => {
    const ids = inventory.sources.map((source) => source.id);
    if (new Set(ids).size !== ids.length) {
      context.addIssue({
        code: "custom",
        message: "Source ids must be unique.",
        path: ["sources"],
      });
    }
  });

export type SourceInventory = z.infer<typeof sourceInventorySchema>;
export type SourceRecord = SourceInventory["sources"][number];
export type SourceVerifier = (source: SourceRecord) => Promise<boolean>;
export type SourceTargetVerifier = (
  source: SourceRecord,
  target: string
) => Promise<boolean>;

export const loadSourceInventory = async (
  root: string
): Promise<SourceInventory> =>
  sourceInventorySchema.parse(
    parseYaml(
      await readFile(path.join(root, "validation", "sources.yaml"), "utf-8")
    )
  );

export const verifyPinnedSource: SourceVerifier = async (source) => {
  try {
    const response = await fetch(source.commitUrl, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    return response.ok;
  } catch {
    return false;
  }
};

export const verifyPinnedTarget: SourceTargetVerifier = async (
  source,
  target
) => {
  try {
    const repository = new URL(source.url);
    if (repository.hostname !== "github.com") {
      return false;
    }
    const [owner, rawName, ...remainder] = repository.pathname
      .split("/")
      .filter(Boolean);
    if (!(owner && rawName) || remainder.length > 0) {
      return false;
    }
    const name = rawName.replace(/\.git$/u, "");
    const encodedTarget = target
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    const targetUrl = `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(name)}/${source.revision}/${encodedTarget}`;
    const response = await fetch(targetUrl, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    return response.ok;
  } catch {
    return false;
  }
};
