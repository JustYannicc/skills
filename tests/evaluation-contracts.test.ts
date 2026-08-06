import { describe, expect, it } from "vitest";

import {
  evaluationFixtureSchema,
  evaluationObservationSchema,
} from "../src/validation/evaluation-contracts.ts";

const expected = {
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
};

describe("evaluation contracts", () => {
  it("requires three fresh attempts for a Critical routing fixture", () => {
    const parsed = evaluationFixtureSchema.safeParse({
      domains: ["communication"],
      environment: {
        capabilities: { persistence: false },
        id: "conversation-only",
        tools: [],
      },
      expected,
      id: "foundation-direct",
      kind: "routing",
      prompt: "Correct this typo.",
      requiredAttempts: 1,
      schemaVersion: 1,
      severity: "Critical",
      shape: "direct",
      title: "Direct route",
    });

    expect(parsed.success).toBeFalsy();
    expect(parsed.error?.issues[0]?.message).toContain("at least three");
  });

  it("records exact context, revision, effects, and raw evidence", () => {
    const parsed = evaluationObservationSchema.parse({
      attempt: 1,
      contextId: "fresh-context-1",
      environment: {
        capabilities: { persistence: false },
        id: "conversation-only",
        tools: [],
      },
      evaluator: "deterministic-foundation",
      fixtureId: "foundation-direct",
      observed: {
        ...expected,
        forbidden: undefined,
        forbiddenChecks: [
          {
            criterion: "claim completion before review",
            evidence: "completion followed inspection",
            observed: false,
          },
        ],
      },
      rawEvidence: {
        locator: "evaluations/evidence/foundation/direct-1.txt",
        sha256: "a".repeat(64),
      },
      recordedAt: "2026-08-02T12:00:00.000Z",
      schemaVersion: 1,
      suiteRevision: `working-tree:${"a".repeat(64)}`,
    });

    expect(parsed.contextId).toBe("fresh-context-1");
    expect(parsed.observed.effects).toStrictEqual([]);
    expect(
      evaluationObservationSchema.safeParse({
        ...parsed,
        suiteRevision: "foundation-v1",
      }).success
    ).toBeFalsy();
  });

  it("accepts optional runtime bindings only with recognized roles", () => {
    const base = {
      attempt: 1,
      contextId: "fresh-context-1",
      environment: {
        capabilities: { persistence: false },
        id: "conversation-only",
        tools: [],
      },
      evaluator: "deterministic-foundation",
      observed: {
        ...expected,
        forbidden: undefined,
        forbiddenChecks: [
          {
            criterion: "claim completion before review",
            evidence: "completion followed inspection",
            observed: false,
          },
        ],
      },
      rawEvidence: {
        locator: "evaluations/evidence/foundation/direct-1.txt",
        sha256: "a".repeat(64),
      },
      recordedAt: "2026-08-02T12:00:00.000Z",
      schemaVersion: 1 as const,
      suiteRevision: `working-tree:${"a".repeat(64)}`,
    };

    expect(
      evaluationObservationSchema.safeParse({
        ...base,
        fixtureId: "domain-modeling-direct",
      }).success
    ).toBeTruthy();
    expect(
      evaluationObservationSchema.safeParse({
        ...base,
        fixtureId: "domain-modeling-direct",
        runtimeInputs: [
          {
            locator: "skills/domain-modeling/SKILL.md",
            role: "unrecognized",
            sha256: "a".repeat(64),
          },
        ],
      }).success
    ).toBeFalsy();
  });
});
