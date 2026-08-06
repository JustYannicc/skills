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
export type SourceTargetLoader = (
  source: SourceRecord,
  target: string
) => Promise<Buffer | null>;
export type PinnedTargetResolution =
  | { status: "resolved"; contents: Buffer }
  | { status: "source-unknown" }
  | { status: "target-missing" };
export type PinnedTargetResolver = (
  sourceId: string,
  target: string
) => Promise<PinnedTargetResolution>;

export const createPinnedTargetResolver = (
  inventory: SourceInventory,
  loadTarget: SourceTargetLoader
): PinnedTargetResolver => {
  const sources = new Map(
    inventory.sources.map((source) => [source.id, source])
  );
  const resolutions = new Map<string, Promise<PinnedTargetResolution>>();

  return (sourceId, target) => {
    const key = JSON.stringify([sourceId, target]);
    const existing = resolutions.get(key);
    if (existing) {
      return existing;
    }
    const resolution = (async (): Promise<PinnedTargetResolution> => {
      const source = sources.get(sourceId);
      if (!source) {
        return { status: "source-unknown" };
      }
      const contents = await loadTarget(source, target);
      return contents === null
        ? { status: "target-missing" }
        : { contents, status: "resolved" };
    })();
    resolutions.set(key, resolution);
    return resolution;
  };
};

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

const pinnedTargetUrl = (
  source: SourceRecord,
  target: string
): string | null => {
  const repository = new URL(source.url);
  if (repository.hostname !== "github.com") {
    return null;
  }
  const [owner, rawName, ...remainder] = repository.pathname
    .split("/")
    .filter(Boolean);
  if (!(owner && rawName) || remainder.length > 0) {
    return null;
  }
  const name = rawName.replace(/\.git$/u, "");
  const encodedTarget = target
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(name)}/${source.revision}/${encodedTarget}`;
};

export const loadPinnedTarget: SourceTargetLoader = async (source, target) => {
  try {
    const targetUrl = pinnedTargetUrl(source, target);
    if (!targetUrl) {
      return null;
    }
    const response = await fetch(targetUrl, {
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    return response.ok ? Buffer.from(await response.arrayBuffer()) : null;
  } catch {
    return null;
  }
};
