import { createHash } from "node:crypto";
import { mkdtemp, mkdir, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  validateEvaluations,
  writeEvaluationReport,
} from "../src/validation/evaluation-suite.ts";

const sha256 = (contents: string): string =>
  createHash("sha256").update(contents).digest("hex");

const candidateIdentity = {
  revision: `working-tree:${"a".repeat(64)}`,
  version: "0.0.0",
};

const fixtureYaml = (
  shape: string,
  severity: string,
  requiredAttempts: number
): string => `schemaVersion: 1
id: foundation-${shape}
title: Foundation ${shape}
shape: ${shape}
kind: composition
domains: [foundation]
severity: ${severity}
requiredAttempts: ${requiredAttempts}
prompt: Exercise the ${shape} fixture shape.
environment:
  id: deterministic-foundation
  capabilities:
    persistence: true
  tools: []
expected:
  actions: [load fixture]
  artifacts: []
  effects: []
  invoked: []
  notInvoked: []
  proof: [result inspected]
  responsibility: [runner owns evaluation]
  route: [${shape}]
  state: [complete]
  forbidden: [unproved completion]
`;

const observationYaml = (
  shape: string,
  evidenceHash: string,
  artifactHash?: string
): string => `schemaVersion: 1
fixtureId: foundation-${shape}
attempt: 1
contextId: fresh-${shape}-1
suiteRevision: ${candidateIdentity.revision}
evaluator: deterministic-foundation
recordedAt: 2026-08-02T12:00:00.000Z
environment:
  id: deterministic-foundation
  capabilities:
    persistence: true
  tools: []
observed:
  actions: [load fixture]
  artifacts: []
  effects: []
  forbiddenChecks:
    - criterion: unproved completion
      evidence: completion followed inspection
      observed: false
  invoked: []
  notInvoked: []
  proof: [result inspected]
  responsibility: [runner owns evaluation]
  route: [${shape}]
  state: [complete]
rawEvidence:
  locator: evaluations/evidence/direct.txt
  sha256: ${evidenceHash}
${artifactHash ? `  artifacts:\n    - locator: evaluations/evidence/artifact.md\n      sha256: ${artifactHash}\n` : ""}
`;

describe("evaluation suite", () => {
  it("loads schema-checked YAML, verifies raw evidence, and records a bound report", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "evaluation-suite-"));
    const fixtureDirectory = path.join(root, "evaluations", "fixtures");
    const observationDirectory = path.join(root, "evaluations", "observations");
    const evidenceDirectory = path.join(root, "evaluations", "evidence");
    await mkdir(fixtureDirectory, { recursive: true });
    await mkdir(observationDirectory, { recursive: true });
    await mkdir(evidenceDirectory, { recursive: true });
    const evidence = "route=inline\nproof=result inspected\n";
    const artifact = "# Inspected artifact\n";
    await writeFile(path.join(evidenceDirectory, "direct.txt"), evidence);
    await writeFile(path.join(evidenceDirectory, "artifact.md"), artifact);
    await writeFile(
      path.join(fixtureDirectory, "direct.fixture.yaml"),
      fixtureYaml("direct", "Major", 1)
    );
    await writeFile(
      path.join(observationDirectory, "direct.observation.yaml"),
      observationYaml("direct", sha256(evidence), sha256(artifact))
    );

    const first = await validateEvaluations(root, {
      candidateIdentity,
      requireShapeCoverage: false,
    });
    expect(first.findings).toStrictEqual([]);
    expect(first.report.fixtureSetRevision).toMatch(/^[a-f0-9]{64}$/u);
    expect({
      evidence: first.report.fixtures[0]?.evidence[0],
      revision: first.report.suiteRevision,
      version: first.report.suiteVersion,
    }).toStrictEqual({
      evidence: {
        artifacts: [
          {
            locator: "evaluations/evidence/artifact.md",
            sha256: sha256(artifact),
          },
        ],
        attempt: 1,
        contextId: "fresh-direct-1",
        locator: "evaluations/evidence/direct.txt",
        sha256: sha256(evidence),
      },
      revision: candidateIdentity.revision,
      version: "0.0.0",
    });

    await writeEvaluationReport(root, first.report);
    const recorded = await validateEvaluations(root, {
      candidateIdentity,
      requireShapeCoverage: false,
    });
    expect(recorded.findings).toStrictEqual([]);

    await writeFile(
      path.join(evidenceDirectory, "artifact.md"),
      "# Mutated artifact\n"
    );
    const mutated = await validateEvaluations(root, {
      candidateIdentity,
      requireShapeCoverage: false,
    });
    expect(mutated.findings).toContainEqual(
      expect.objectContaining({
        check: "raw-evidence",
        file: "evaluations/evidence/artifact.md",
        message: expect.stringContaining(
          "Evidence artifact hash does not match"
        ),
        severity: "Major",
      })
    );
  });

  it("reports stale raw evidence and missing foundation shapes", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "evaluation-suite-"));
    await mkdir(path.join(root, "evaluations", "fixtures"), {
      recursive: true,
    });
    await mkdir(path.join(root, "evaluations", "observations"), {
      recursive: true,
    });
    await mkdir(path.join(root, "evaluations", "evidence"), {
      recursive: true,
    });
    await writeFile(
      path.join(root, "evaluations", "fixtures", "direct.fixture.yaml"),
      fixtureYaml("direct", "Major", 1)
    );
    await writeFile(
      path.join(root, "evaluations", "observations", "direct.observation.yaml"),
      observationYaml("direct", "a".repeat(64))
    );
    await writeFile(
      path.join(root, "evaluations", "evidence", "direct.txt"),
      "changed evidence\n"
    );

    const result = await validateEvaluations(root, { candidateIdentity });

    expect(result.findings).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({ check: "raw-evidence", severity: "Major" }),
        expect.objectContaining({ check: "shape-coverage", severity: "Major" }),
      ])
    );
  });

  it("rejects duplicate fixture identities and orphan observations", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "evaluation-suite-"));
    const fixtureDirectory = path.join(root, "evaluations", "fixtures");
    const observationDirectory = path.join(root, "evaluations", "observations");
    const evidenceDirectory = path.join(root, "evaluations", "evidence");
    await mkdir(fixtureDirectory, { recursive: true });
    await mkdir(observationDirectory, { recursive: true });
    await mkdir(evidenceDirectory, { recursive: true });
    const evidence = "evidence\n";
    await writeFile(path.join(evidenceDirectory, "direct.txt"), evidence);
    const fixture = fixtureYaml("direct", "Major", 1);
    await writeFile(path.join(fixtureDirectory, "one.fixture.yaml"), fixture);
    await writeFile(path.join(fixtureDirectory, "two.fixture.yaml"), fixture);
    await writeFile(
      path.join(observationDirectory, "orphan.observation.yaml"),
      observationYaml("orphan", sha256(evidence))
    );

    const result = await validateEvaluations(root, {
      candidateIdentity,
      requireShapeCoverage: false,
    });

    expect(result.findings).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          check: "evaluation-integrity",
          message: expect.stringContaining("Duplicate fixture id"),
        }),
        expect.objectContaining({
          check: "evaluation-integrity",
          message: expect.stringContaining("unknown fixture"),
        }),
      ])
    );
  });

  it("rejects raw evidence whose real path escapes the repository", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "evaluation-suite-"));
    const outside = await mkdtemp(path.join(tmpdir(), "outside-evidence-"));
    const fixtureDirectory = path.join(root, "evaluations", "fixtures");
    const observationDirectory = path.join(root, "evaluations", "observations");
    const evidenceDirectory = path.join(root, "evaluations", "evidence");
    await mkdir(fixtureDirectory, { recursive: true });
    await mkdir(observationDirectory, { recursive: true });
    await mkdir(evidenceDirectory, { recursive: true });
    const evidence = "private evidence\n";
    const outsideEvidence = path.join(outside, "private.txt");
    await writeFile(outsideEvidence, evidence);
    await symlink(outsideEvidence, path.join(evidenceDirectory, "direct.txt"));
    await writeFile(
      path.join(fixtureDirectory, "direct.fixture.yaml"),
      fixtureYaml("direct", "Major", 1)
    );
    await writeFile(
      path.join(observationDirectory, "direct.observation.yaml"),
      observationYaml("direct", sha256(evidence))
    );

    const result = await validateEvaluations(root, {
      candidateIdentity,
      requireShapeCoverage: false,
    });

    expect(result.findings).toContainEqual(
      expect.objectContaining({
        check: "raw-evidence",
        message: expect.stringContaining("escapes the repository"),
        severity: "Critical",
      })
    );
  });

  it("rejects Domain Modeling evidence after a bound runtime input changes", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "evaluation-suite-"));
    const fixtureDirectory = path.join(
      root,
      "evaluations",
      "fixtures",
      "domain-modeling"
    );
    const observationDirectory = path.join(
      root,
      "evaluations",
      "observations",
      "domain-modeling"
    );
    const evidenceDirectory = path.join(
      root,
      "evaluations",
      "evidence",
      "domain-modeling"
    );
    const domainSkillDirectory = path.join(root, "skills", "domain-modeling");
    const systemReferenceDirectory = path.join(
      root,
      "skills",
      "thinking-in-systems",
      "references"
    );
    await Promise.all(
      [
        fixtureDirectory,
        observationDirectory,
        evidenceDirectory,
        domainSkillDirectory,
        systemReferenceDirectory,
      ].map((directory) => mkdir(directory, { recursive: true }))
    );
    const evidence = "fresh Domain Modeling response\n";
    const domainSkill = "# Domain Modeling\n\nEstablish shared language.\n";
    const systemSkill = "# Thinking in Systems\n\nRead the standard.\n";
    const systemStandard = "# Standard\n\nDefine System relationships.\n";
    const fixture = fixtureYaml("direct", "Major", 1).replaceAll(
      "foundation-direct",
      "domain-modeling-direct"
    );
    await writeFile(path.join(evidenceDirectory, "direct.txt"), evidence);
    await writeFile(path.join(domainSkillDirectory, "SKILL.md"), domainSkill);
    await mkdir(path.join(root, "skills", "thinking-in-systems"), {
      recursive: true,
    });
    await writeFile(
      path.join(root, "skills", "thinking-in-systems", "SKILL.md"),
      systemSkill
    );
    await writeFile(
      path.join(systemReferenceDirectory, "standard.md"),
      systemStandard
    );
    await writeFile(
      path.join(fixtureDirectory, "direct.fixture.yaml"),
      fixture
    );
    const boundObservation = `${observationYaml("direct", sha256(evidence))
      .replaceAll("foundation-direct", "domain-modeling-direct")
      .replaceAll(
        "evaluations/evidence/direct.txt",
        "evaluations/evidence/domain-modeling/direct.txt"
      )}runtimeInputs:
  - role: skill
    locator: skills/domain-modeling/SKILL.md
    sha256: ${sha256(domainSkill)}
  - role: fixture
    locator: evaluations/fixtures/domain-modeling/direct.fixture.yaml
    sha256: ${sha256(fixture)}
  - role: governing-skill
    locator: skills/thinking-in-systems/SKILL.md
    sha256: ${sha256(systemSkill)}
  - role: governing-reference
    locator: skills/thinking-in-systems/references/standard.md
    sha256: ${sha256(systemStandard)}
`;
    await writeFile(
      path.join(observationDirectory, "direct.observation.yaml"),
      boundObservation
    );

    const bound = await validateEvaluations(root, {
      candidateIdentity,
      requireShapeCoverage: false,
    });
    expect(bound.findings).toStrictEqual([]);
    expect(bound.report.fixtures[0]?.evidence[0]?.runtimeInputs).toHaveLength(
      4
    );

    await writeFile(
      path.join(observationDirectory, "direct.observation.yaml"),
      observationYaml("direct", sha256(evidence))
        .replaceAll("foundation-direct", "domain-modeling-direct")
        .replaceAll(
          "evaluations/evidence/direct.txt",
          "evaluations/evidence/domain-modeling/direct.txt"
        )
    );
    const missing = await validateEvaluations(root, {
      candidateIdentity,
      requireShapeCoverage: false,
    });
    expect(missing.findings).toContainEqual(
      expect.objectContaining({
        check: "runtime-evidence",
        message: expect.stringContaining(
          "requires exactly one skill runtime input"
        ),
        severity: "Critical",
      })
    );
    await writeFile(
      path.join(observationDirectory, "direct.observation.yaml"),
      boundObservation
    );

    await writeFile(
      path.join(domainSkillDirectory, "SKILL.md"),
      "# Domain Modeling\n\nChanged runtime.\n"
    );
    const stale = await validateEvaluations(root, {
      candidateIdentity,
      requireShapeCoverage: false,
    });
    expect(stale.findings).toContainEqual(
      expect.objectContaining({
        check: "runtime-evidence",
        file: "skills/domain-modeling/SKILL.md",
        message: expect.stringContaining("runtime input hash does not match"),
        severity: "Critical",
      })
    );
  });
});
