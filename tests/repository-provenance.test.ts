import { createHash } from "node:crypto";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { validateRepository } from "../src/validation/repository-validator.ts";

const pinnedRevision = "a".repeat(40);

const createRepository = async (
  skillName = "adapted-skill",
  includeOverlay = false
): Promise<string> => {
  const root = await mkdtemp(path.join(tmpdir(), "provenance-validation-"));
  const skill = path.join(root, "skills", skillName);
  await mkdir(path.join(skill, "agents"), { recursive: true });
  await mkdir(path.join(root, "overlays"), { recursive: true });
  await mkdir(path.join(root, "validation"), { recursive: true });
  await writeFile(path.join(root, "README.md"), "# Fixture repository\n");
  await writeFile(
    path.join(skill, "SKILL.md"),
    `---\nname: ${skillName}\ndescription: Valid test skill.\n---\n\n# Valid skill\n\nApply the complete accepted procedure and return evidence.\n`
  );
  await writeFile(
    path.join(skill, "agents", "openai.yaml"),
    "interface:\n  display_name: Valid skill\n  short_description: Valid test skill\npolicy:\n  allow_implicit_invocation: true\n"
  );
  await writeFile(
    path.join(root, "validation", "repository.yaml"),
    `schemaVersion: 2
skills:
  - name: ${skillName}
    provenance:
      strategy: adapted
      adaptationMode: universal-successor
      sources:
        - sourceId: upstream
          targets: [SKILL.md]
      retainedBehavior: [bounded result]
      changedAssumptions: [universal scope]
`
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
  if (includeOverlay) {
    const patch = "patch\n";
    await writeFile(path.join(root, "overlays", "upstream.patch"), patch);
    await writeFile(
      path.join(root, "validation", "overlays.yaml"),
      `schemaVersion: 1
overlays:
  - id: upstream-overlay
    skill: ${skillName}
    sourceId: upstream
    target: SKILL.md
    patchFile: overlays/upstream.patch
    sha256: ${createHash("sha256").update(patch).digest("hex")}
`
    );
  } else {
    await writeFile(
      path.join(root, "validation", "overlays.yaml"),
      "schemaVersion: 1\noverlays: []\n"
    );
  }
  return root;
};

describe("repository provenance", () => {
  it("rejects provenance sources absent from the central inventory", async () => {
    const root = await createRepository();
    await writeFile(
      path.join(root, "validation", "repository.yaml"),
      `schemaVersion: 2
skills:
  - name: adapted-skill
    provenance:
      strategy: adapted
      adaptationMode: universal-successor
      sources:
        - sourceId: missing-source
          targets: [SKILL.md]
      retainedBehavior: [bounded result]
      changedAssumptions: [universal scope]
`
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

  it("accepts minimal original provenance in the central repository record", async () => {
    const root = await createRepository("original-skill");
    await writeFile(
      path.join(root, "validation", "repository.yaml"),
      "schemaVersion: 2\nskills:\n  - name: original-skill\n    provenance:\n      strategy: original\n"
    );

    const result = await validateRepository(root, {
      sourceVerifier: () => Promise.resolve(true),
    });

    expect(
      result.findings.filter(
        (finding) =>
          finding.check === "skill-provenance" ||
          finding.check === "skill-structure"
      )
    ).toStrictEqual([]);
  });

  it("rejects installed provenance files as runtime baggage", async () => {
    const root = await createRepository("original-skill");
    await writeFile(
      path.join(root, "skills", "original-skill", "provenance.yaml"),
      "schemaVersion: 1\n"
    );
    await writeFile(
      path.join(root, "validation", "repository.yaml"),
      "schemaVersion: 2\nskills:\n  - name: original-skill\n    provenance:\n      strategy: original\n"
    );

    const result = await validateRepository(root, {
      sourceVerifier: () => Promise.resolve(true),
    });

    expect(result.findings).toContainEqual(
      expect.objectContaining({
        check: "skill-provenance",
        file: "skills/original-skill/provenance.yaml",
        message: expect.stringContaining("repository evidence"),
        severity: "Major",
      })
    );
  });

  it("requires adapted provenance fields and an exact record for every skill directory", async () => {
    const root = await createRepository();
    await writeFile(
      path.join(root, "validation", "repository.yaml"),
      "schemaVersion: 2\nskills:\n  - name: absent-skill\n    provenance:\n      strategy: adapted\n      sources: []\n"
    );

    const result = await validateRepository(root, {
      sourceVerifier: () => Promise.resolve(true),
    });

    expect(result.findings).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          check: "skill-structure",
          message: expect.stringContaining("missing: absent-skill"),
        }),
        expect.objectContaining({
          check: "skill-structure",
          message: expect.stringContaining(
            "absent from validation/repository.yaml: adapted-skill"
          ),
        }),
        expect.objectContaining({
          check: "skill-provenance",
          message: expect.stringContaining("adaptationMode"),
        }),
      ])
    );
  });

  it("rejects an adapted provenance target absent from the pinned source", async () => {
    const root = await createRepository();
    await writeFile(
      path.join(root, "validation", "repository.yaml"),
      `schemaVersion: 2
skills:
  - name: adapted-skill
    provenance:
      strategy: adapted
      adaptationMode: universal-successor
      sources:
        - sourceId: upstream
          targets: [missing/SKILL.md]
      retainedBehavior: [bounded result]
      changedAssumptions: [universal scope]
`
    );

    const result = await validateRepository(root, {
      sourceTargetLoader: () => Promise.resolve(null),
      sourceVerifier: () => Promise.resolve(true),
    });

    expect(result.findings).toContainEqual(
      expect.objectContaining({
        check: "skill-provenance",
        message: expect.stringContaining(
          'target "missing/SKILL.md" does not exist at the pinned source revision'
        ),
        severity: "Major",
      })
    );
  });

  it("shares one pinned-target resolution with overlay validation", async () => {
    const root = await createRepository("adapted-skill", true);
    let targetLoads = 0;

    const result = await validateRepository(root, {
      overlayReapplicationVerifier: () => Promise.resolve(true),
      sourceTargetLoader: () => {
        targetLoads += 1;
        return Promise.resolve(Buffer.from("pinned content\n"));
      },
      sourceVerifier: () => Promise.resolve(true),
    });

    expect(result.findings).toStrictEqual([]);
    expect(targetLoads).toBe(1);
  });
});
