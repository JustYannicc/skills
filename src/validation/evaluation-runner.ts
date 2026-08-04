import { isDeepStrictEqual } from "node:util";

import type {
  EvaluationFixture,
  EvaluationObservation,
  FindingSeverity,
} from "./evaluation-contracts.ts";

export interface EvaluationFinding {
  attempt?: number;
  field: string;
  message: string;
  severity: FindingSeverity;
}

export interface EvaluationReport {
  fixtureId: string;
  suiteRevision: string | null;
  status: "failed" | "passed";
  attempts: number[];
  contextIds: string[];
  findings: EvaluationFinding[];
  evidence: {
    attempt: number;
    artifacts?: { locator: string; sha256: string }[];
    contextId: string;
    locator: string;
    sha256: string;
  }[];
}

type EvidenceField = Exclude<keyof EvaluationFixture["expected"], "forbidden">;

const evidenceFields: EvidenceField[] = [
  "actions",
  "artifacts",
  "effects",
  "invoked",
  "notInvoked",
  "proof",
  "responsibility",
  "route",
  "state",
];

const singularLabel = (field: EvidenceField): string => {
  if (field === "responsibility") {
    return field;
  }
  return field.endsWith("s") ? field.slice(0, -1) : field;
};

const evaluateForbiddenChecks = (
  fixture: EvaluationFixture,
  observation: EvaluationObservation
): EvaluationFinding[] => {
  const findings: EvaluationFinding[] = [];
  for (const criterion of fixture.expected.forbidden) {
    const check = observation.observed.forbiddenChecks.find(
      (candidate) => candidate.criterion === criterion
    );
    if (!check) {
      findings.push({
        attempt: observation.attempt,
        field: "forbidden",
        message: `Missing forbidden-behavior check "${criterion}".`,
        severity: fixture.severity,
      });
    } else if (check.observed) {
      findings.push({
        attempt: observation.attempt,
        field: "forbidden",
        message: `Observed forbidden behavior: ${criterion}. Evidence: ${check.evidence}`,
        severity: fixture.severity,
      });
    }
  }

  for (const check of observation.observed.forbiddenChecks) {
    if (!fixture.expected.forbidden.includes(check.criterion)) {
      findings.push({
        attempt: observation.attempt,
        field: "forbidden",
        message: `Unexpected forbidden-behavior check "${check.criterion}".`,
        severity: fixture.severity,
      });
    }
  }
  return findings;
};

export const evaluateFixture = (
  fixture: EvaluationFixture,
  observations: EvaluationObservation[]
): EvaluationReport => {
  const findings: EvaluationFinding[] = [];
  const relevant = observations.filter(
    (observation) => observation.fixtureId === fixture.id
  );
  const attempts = relevant.map((observation) => observation.attempt);
  const contextIds = relevant.map((observation) => observation.contextId);
  const suiteRevisions = new Set(
    relevant.map((observation) => observation.suiteRevision)
  );

  for (let attempt = 1; attempt <= fixture.requiredAttempts; attempt += 1) {
    if (!attempts.includes(attempt)) {
      findings.push({
        field: "attempts",
        message: `Missing required attempt ${attempt}.`,
        severity: fixture.severity,
      });
    }
  }

  if (new Set(attempts).size !== attempts.length) {
    findings.push({
      field: "attempts",
      message: "Each required attempt must be recorded exactly once.",
      severity: fixture.severity,
    });
  }

  for (const attempt of attempts) {
    if (attempt > fixture.requiredAttempts) {
      findings.push({
        attempt,
        field: "attempts",
        message: `Unexpected attempt ${attempt}; fixture requires ${fixture.requiredAttempts}.`,
        severity: fixture.severity,
      });
    }
  }

  if (new Set(contextIds).size !== contextIds.length) {
    findings.push({
      field: "contextId",
      message: "Repeated evaluations must use unique fresh contexts.",
      severity: fixture.severity,
    });
  }

  if (suiteRevisions.size > 1) {
    findings.push({
      field: "suiteRevision",
      message: "All attempts must evaluate the same suite revision.",
      severity: fixture.severity,
    });
  }

  for (const observation of relevant) {
    if (!isDeepStrictEqual(observation.environment, fixture.environment)) {
      findings.push({
        attempt: observation.attempt,
        field: "environment",
        message: `Expected environment "${fixture.environment.id}".`,
        severity: fixture.severity,
      });
    }

    for (const field of evidenceFields) {
      for (const expected of fixture.expected[field]) {
        if (!observation.observed[field].includes(expected)) {
          findings.push({
            attempt: observation.attempt,
            field,
            message: `Missing expected ${singularLabel(field)} "${expected}".`,
            severity: fixture.severity,
          });
        }
      }
    }

    findings.push(...evaluateForbiddenChecks(fixture, observation));
  }

  return {
    attempts,
    contextIds,
    evidence: relevant.map((observation) => {
      const { artifacts, locator, sha256 } = observation.rawEvidence;
      const evidence = {
        attempt: observation.attempt,
        contextId: observation.contextId,
        locator,
        sha256,
      };
      return artifacts && artifacts.length > 0
        ? { artifacts, ...evidence }
        : evidence;
    }),
    findings,
    fixtureId: fixture.id,
    status: findings.length === 0 ? "passed" : "failed",
    suiteRevision: relevant[0]?.suiteRevision ?? null,
  };
};
