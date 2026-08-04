import { createHash } from "node:crypto";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { validateRepository } from "../src/validation/repository-validator.ts";

const createRepository = async (): Promise<string> => {
  const root = await mkdtemp(path.join(tmpdir(), "skills-validation-"));
  await mkdir(path.join(root, "skills"), { recursive: true });
  await writeFile(path.join(root, "README.md"), "# Fixture repository\n");
  return root;
};

const pinnedRevision = "a".repeat(40);

const writeValidationFiles = async (root: string): Promise<void> => {
  await mkdir(path.join(root, "validation"), { recursive: true });
  await writeFile(
    path.join(root, "validation", "repository.yaml"),
    "schemaVersion: 1\nexpectedSkills: []\n"
  );
  await writeFile(
    path.join(root, "validation", "sources.yaml"),
    `schemaVersion: 1
sources:
  - id: upstream
    url: https://github.com/example/source
    revision: ${pinnedRevision}
    commitUrl: https://github.com/example/source/commit/${pinnedRevision}
    license: MIT
`
  );
  await writeFile(
    path.join(root, "validation", "overlays.yaml"),
    "schemaVersion: 1\noverlays: []\n"
  );
};

interface OverlayFixtureOptions {
  patch: string;
  sha256?: string;
  target?: string;
}

const writeOverlayFixture = async (
  root: string,
  options: OverlayFixtureOptions
): Promise<void> => {
  await mkdir(path.join(root, "overlays"), { recursive: true });
  await writeFile(path.join(root, "overlays", "upstream.patch"), options.patch);
  const hash =
    options.sha256 ?? createHash("sha256").update(options.patch).digest("hex");
  await writeFile(
    path.join(root, "validation", "overlays.yaml"),
    `schemaVersion: 1
overlays:
  - id: upstream-overlay
    skill: adapted-skill
    sourceId: upstream
    target: ${options.target ?? "SKILL.md"}
    patchFile: overlays/upstream.patch
    sha256: ${hash}
`
  );
};

describe("repository validator", () => {
  it("excludes ignored pnpm store content from repository validation", async () => {
    const root = await createRepository();
    await writeValidationFiles(root);
    await mkdir(path.join(root, ".pnpm-store", "cache"), { recursive: true });
    await writeFile(
      path.join(root, ".pnpm-store", "cache", "ignored.md"),
      `[missing](missing.md)\n\n\`/${"Users"}/private/.agents\`\n`
    );

    const result = await validateRepository(root, {
      sourceVerifier: () => Promise.resolve(true),
    });

    expect(result.checkedFiles).toBe(4);
    expect(result.findings).toStrictEqual([]);
  });

  it("reports broken local links and private local paths", async () => {
    const root = await createRepository();
    await writeFile(
      path.join(root, "README.md"),
      [
        "# Fixture",
        "",
        "[missing](docs/missing.md)",
        "",
        `\`/${"Users"}/private/.agents\``,
        "",
      ].join("\n")
    );

    const result = await validateRepository(root);

    expect(result.findings).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({ check: "markdown-links", severity: "Major" }),
        expect.objectContaining({
          check: "public-boundary",
          severity: "Critical",
        }),
      ])
    );
  });

  it("validates skill metadata and invocation-policy agreement", async () => {
    const root = await createRepository();
    const skill = path.join(root, "skills", "explicit-skill");
    await mkdir(path.join(skill, "agents"), { recursive: true });
    await writeFile(
      path.join(skill, "SKILL.md"),
      [
        "---",
        "name: wrong-name",
        "description: Explicit test skill.",
        "disable-model-invocation: true",
        "---",
        "",
        "# Explicit skill",
        "",
      ].join("\n")
    );
    await writeFile(
      path.join(skill, "agents", "openai.yaml"),
      [
        "interface:",
        '  display_name: "Explicit skill"',
        '  short_description: "Explicit test skill"',
        "policy:",
        "  allow_implicit_invocation: true",
        "",
      ].join("\n")
    );

    const result = await validateRepository(root);
    const skillFindings = result.findings.filter((finding) =>
      finding.check.startsWith("skill-")
    );

    expect(skillFindings.map((finding) => finding.message)).toStrictEqual(
      expect.arrayContaining([
        expect.stringContaining("must match its directory"),
        expect.stringContaining("invocation policies disagree"),
        expect.stringContaining("provenance.yaml"),
      ])
    );
  });

  it("accepts a source pin only when its revision is immutable", async () => {
    const root = await createRepository();
    await mkdir(path.join(root, "validation"), { recursive: true });
    await writeFile(
      path.join(root, "validation", "sources.yaml"),
      [
        "schemaVersion: 1",
        "sources:",
        "  - id: mutable-source",
        "    url: https://github.com/example/source",
        "    revision: main",
        "    license: MIT",
        "",
      ].join("\n")
    );

    const result = await validateRepository(root);

    expect(result.findings).toContainEqual(
      expect.objectContaining({
        check: "source-pins",
        message: expect.stringContaining("40-character Git revision"),
        severity: "Major",
      })
    );
  });

  it("rejects a syntactically valid pin that its source cannot verify", async () => {
    const root = await createRepository();
    await writeValidationFiles(root);

    const result = await validateRepository(root, {
      sourceVerifier: () => Promise.resolve(false),
    });

    expect(result.findings).toContainEqual(
      expect.objectContaining({
        check: "source-pins",
        message: expect.stringContaining("could not be verified"),
        severity: "Major",
      })
    );
  });

  it("rejects provenance sources absent from the central inventory", async () => {
    const root = await createRepository();
    await writeValidationFiles(root);
    const skill = path.join(root, "skills", "adapted-skill");
    await mkdir(path.join(skill, "agents"), { recursive: true });
    await writeFile(
      path.join(skill, "SKILL.md"),
      "---\nname: adapted-skill\ndescription: Adapted test skill.\n---\n\n# Adapted skill\n\nApply the complete accepted procedure and return evidence.\n"
    );
    await writeFile(
      path.join(skill, "agents", "openai.yaml"),
      "interface:\n  display_name: Adapted skill\n  short_description: Adapted test skill\npolicy:\n  allow_implicit_invocation: true\n"
    );
    await writeFile(
      path.join(skill, "provenance.yaml"),
      "schemaVersion: 1\nstrategy: adapted\nsources: [{ id: missing-source }]\nretainedBehavior: [bounded result]\nchangedAssumptions: [universal scope]\n"
    );
    await writeFile(
      path.join(root, "validation", "repository.yaml"),
      "schemaVersion: 1\nexpectedSkills: [adapted-skill]\n"
    );

    const result = await validateRepository(root, {
      sourceVerifier: () => Promise.resolve(true),
    });

    expect(result.findings).toContainEqual(
      expect.objectContaining({
        check: "skill-provenance",
        message: expect.stringContaining("unknown source"),
        severity: "Major",
      })
    );
  });

  it("rejects an overlay whose declared hash does not match its patch", async () => {
    const root = await createRepository();
    await writeValidationFiles(root);
    await writeOverlayFixture(root, {
      patch: "patch\n",
      sha256: "b".repeat(64),
    });

    const result = await validateRepository(root, {
      sourceVerifier: () => Promise.resolve(true),
    });

    expect(result.findings).toContainEqual(
      expect.objectContaining({
        check: "overlay-integrity",
        message: expect.stringContaining("hash does not match"),
        severity: "Major",
      })
    );
  });

  it("rejects an overlay target absent from its pinned source", async () => {
    const root = await createRepository();
    await writeValidationFiles(root);
    const patch = "patch\n";
    await writeOverlayFixture(root, { patch, target: "missing/SKILL.md" });

    const result = await validateRepository(root, {
      sourceTargetLoader: () => Promise.resolve(null),
      sourceVerifier: () => Promise.resolve(true),
    });

    expect(result.findings).toContainEqual(
      expect.objectContaining({
        check: "overlay-integrity",
        message: expect.stringContaining(
          "does not exist at the pinned source revision"
        ),
        severity: "Major",
      })
    );
  });

  it("rejects a hash-valid overlay that does not reapply to its pinned target", async () => {
    const root = await createRepository();
    await writeValidationFiles(root);
    const patch = [
      "diff --git a/SKILL.md b/SKILL.md",
      "--- a/SKILL.md",
      "+++ b/SKILL.md",
      "@@ -1 +1 @@",
      "-stale upstream content",
      "+adapted content",
      "",
    ].join("\n");
    await writeOverlayFixture(root, { patch });

    const result = await validateRepository(root, {
      sourceTargetLoader: () =>
        Promise.resolve(Buffer.from("pinned content\n")),
      sourceVerifier: () => Promise.resolve(true),
    });

    expect(result.findings).toContainEqual(
      expect.objectContaining({
        check: "overlay-reapplication",
        message: expect.stringContaining(
          "does not apply cleanly to its pinned target"
        ),
        severity: "Major",
      })
    );
  });

  it("accepts a hash-valid overlay that reapplies to exactly its pinned target", async () => {
    const root = await createRepository();
    await writeValidationFiles(root);
    const patch = [
      "diff --git a/SKILL.md b/SKILL.md",
      "--- a/SKILL.md",
      "+++ b/SKILL.md",
      "@@ -1 +1 @@",
      "-pinned content",
      "+adapted content",
      "",
    ].join("\n");
    await writeOverlayFixture(root, { patch });

    const result = await validateRepository(root, {
      sourceTargetLoader: () =>
        Promise.resolve(Buffer.from("pinned content\n")),
      sourceVerifier: () => Promise.resolve(true),
    });

    expect(
      result.findings.filter(
        (finding) => finding.check === "overlay-reapplication"
      )
    ).toStrictEqual([]);
  });

  it("rejects a patch that changes more than its declared target", async () => {
    const root = await createRepository();
    await writeValidationFiles(root);
    const patch = [
      "diff --git a/SKILL.md b/SKILL.md",
      "--- a/SKILL.md",
      "+++ b/SKILL.md",
      "@@ -1 +1 @@",
      "-pinned content",
      "+adapted content",
      "diff --git a/extra.md b/extra.md",
      "new file mode 100644",
      "--- /dev/null",
      "+++ b/extra.md",
      "@@ -0,0 +1 @@",
      "+unexpected",
      "",
    ].join("\n");
    await writeOverlayFixture(root, { patch });

    const result = await validateRepository(root, {
      sourceTargetLoader: () =>
        Promise.resolve(Buffer.from("pinned content\n")),
      sourceVerifier: () => Promise.resolve(true),
    });

    expect(result.findings).toContainEqual(
      expect.objectContaining({
        check: "overlay-reapplication",
        severity: "Major",
      })
    );
  });

  it("rejects an overlay target that traverses with a Windows separator", async () => {
    const root = await createRepository();
    await writeValidationFiles(root);
    await writeOverlayFixture(root, {
      patch: "patch\n",
      target: String.raw`..\outside`,
    });

    const result = await validateRepository(root, {
      sourceTargetLoader: () =>
        Promise.resolve(Buffer.from("pinned content\n")),
      sourceVerifier: () => Promise.resolve(true),
    });

    expect(result.findings).toContainEqual(
      expect.objectContaining({
        check: "overlay-integrity",
        message: expect.stringContaining("Path must stay relative"),
        severity: "Major",
      })
    );
  });
});
