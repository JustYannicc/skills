import { describe, expect, it } from "vitest";

import type {
  EvaluationFixture,
  EvaluationObservation,
} from "../src/validation/evaluation-contracts.ts";
import { evaluateFixture } from "../src/validation/evaluation-runner.ts";

const fixture: EvaluationFixture = {
  domains: ["communication"],
  environment: {
    capabilities: { persistence: false },
    id: "conversation-only",
    tools: [],
  },
  expected: {
    actions: ["apply systems thinking"],
    artifacts: [],
    effects: [],
    forbidden: ["claim completion before review"],
    invoked: ["workflow"],
    notInvoked: [],
    proof: ["result inspected"],
    responsibility: ["parent remains responsible"],
    route: ["inline"],
    state: ["complete"],
  },
  id: "foundation-direct",
  kind: "routing",
  prompt: "Correct this typo.",
  requiredAttempts: 3,
  schemaVersion: 1,
  severity: "Critical",
  shape: "direct",
  title: "Direct route",
};

const observation = (attempt: number): EvaluationObservation => ({
  attempt,
  contextId: `fresh-context-${attempt}`,
  environment: fixture.environment,
  evaluator: "deterministic-foundation",
  fixtureId: fixture.id,
  observed: {
    actions: ["apply systems thinking"],
    artifacts: [],
    effects: [],
    forbiddenChecks: [
      {
        criterion: "claim completion before review",
        evidence: "inspection occurred before completion",
        observed: false,
      },
    ],
    invoked: ["workflow"],
    notInvoked: [],
    proof: ["result inspected"],
    responsibility: ["parent remains responsible"],
    route: ["inline"],
    state: ["complete"],
  },
  rawEvidence: {
    locator: `evaluations/evidence/foundation/direct-${attempt}.txt`,
    sha256: "a".repeat(64),
  },
  recordedAt: `2026-08-02T12:00:0${attempt}.000Z`,
  schemaVersion: 1,
  suiteRevision: `working-tree:${"a".repeat(64)}`,
});

describe("evaluation runner", () => {
  it("passes repeated evidence only when every fresh context satisfies the seam", () => {
    const report = evaluateFixture(fixture, [
      observation(1),
      observation(2),
      observation(3),
    ]);

    expect(report.status).toBe("passed");
    expect(report.findings).toStrictEqual([]);
    expect(report.contextIds).toHaveLength(3);
  });

  it("reports one failed attempt without averaging it away", () => {
    const failed = observation(2);
    failed.observed.proof = [];

    const report = evaluateFixture(fixture, [
      observation(1),
      failed,
      observation(3),
    ]);

    expect(report.status).toBe("failed");
    expect(report.findings).toContainEqual({
      attempt: 2,
      field: "proof",
      message: 'Missing expected proof "result inspected".',
      severity: "Critical",
    });
  });

  it("rejects reused contexts and missing attempts", () => {
    const reused = observation(2);
    reused.contextId = "fresh-context-1";

    const report = evaluateFixture(fixture, [observation(1), reused]);

    expect(report.status).toBe("failed");
    expect(report.findings.map((finding) => finding.field)).toStrictEqual(
      expect.arrayContaining(["attempts", "contextId"])
    );
  });

  it("rejects duplicate attempts and capability drift", () => {
    const duplicate = observation(1);
    duplicate.contextId = "fresh-context-duplicate";
    duplicate.environment = {
      ...duplicate.environment,
      capabilities: { persistence: true },
    };

    const report = evaluateFixture(fixture, [
      observation(1),
      duplicate,
      observation(2),
      observation(3),
    ]);

    expect(report.status).toBe("failed");
    expect(report.findings.map((finding) => finding.field)).toStrictEqual(
      expect.arrayContaining(["attempts", "environment"])
    );
  });

  it("fails an omitted or observed forbidden behavior", () => {
    const omitted = observation(1);
    omitted.observed.forbiddenChecks = [];
    const observed = observation(2);
    observed.observed.forbiddenChecks[0] = {
      criterion: "claim completion before review",
      evidence: "completion was claimed before inspection",
      observed: true,
    };

    const report = evaluateFixture(fixture, [
      omitted,
      observed,
      observation(3),
    ]);

    expect(report.status).toBe("failed");
    expect(report.findings).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attempt: 1,
          message: expect.stringContaining("Missing forbidden-behavior check"),
        }),
        expect.objectContaining({
          attempt: 2,
          message: expect.stringContaining("Observed forbidden behavior"),
        }),
      ])
    );
  });
});
