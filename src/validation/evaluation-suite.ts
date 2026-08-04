import { createHash } from "node:crypto";
import { mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import path from "node:path";

import { parse as parseYaml } from "yaml";

import {
  evaluationFixtureSchema,
  evaluationObservationSchema,
} from "./evaluation-contracts.ts";
import type {
  EvaluationFixture,
  EvaluationObservation,
  FindingSeverity,
} from "./evaluation-contracts.ts";
import { evaluateFixture } from "./evaluation-runner.ts";
import type { EvaluationReport } from "./evaluation-runner.ts";
import { listFiles } from "./filesystem.ts";
import { findPublicBoundaryViolations } from "./public-boundary.ts";
import { resolveCandidateIdentity } from "./repository-identity.ts";
import type { CandidateIdentity } from "./repository-identity.ts";

export interface SuiteFinding {
  check: string;
  severity: FindingSeverity;
  message: string;
  file?: string;
}

export interface EvaluationSuiteReport {
  schemaVersion: 1;
  suiteRevision: string | null;
  suiteVersion: string;
  fixtureSetRevision: string;
  evaluatedAt: string | null;
  summary: {
    fixtures: number;
    passed: number;
    failed: number;
    findings: Record<FindingSeverity, number>;
  };
  fixtures: (EvaluationReport & { fixtureRevision: string })[];
}

export interface EvaluationValidation {
  findings: SuiteFinding[];
  report: EvaluationSuiteReport;
}

interface ValidationOptions {
  candidateIdentity?: CandidateIdentity;
  checkReport?: boolean;
  requireReport?: boolean;
  requireShapeCoverage?: boolean;
}

const sha256 = (contents: string | Buffer): string =>
  createHash("sha256").update(contents).digest("hex");

const loadYamlRecords = async <Value>(
  root: string,
  directory: string,
  suffix: string,
  parse: (value: unknown) => Value,
  kind: string
): Promise<{
  values: Value[];
  findings: SuiteFinding[];
  contents: Map<string, string>;
}> => {
  const paths = await listFiles(directory, { suffix });
  const results = await Promise.all(
    paths.map(async (recordPath) => {
      try {
        const source = await readFile(recordPath, "utf-8");
        return {
          path: recordPath,
          source,
          success: true as const,
          value: parse(parseYaml(source)),
        };
      } catch (error) {
        return { error, path: recordPath, success: false as const };
      }
    })
  );
  const values: Value[] = [];
  const findings: SuiteFinding[] = [];
  const contents = new Map<string, string>();

  for (const result of results) {
    if (result.success) {
      values.push(result.value);
      contents.set(result.path, result.source);
    } else {
      findings.push({
        check: "evaluation-schema",
        file: path.relative(root, result.path),
        message: `Invalid ${kind}: ${result.error instanceof Error ? result.error.message : "unknown schema error"}`,
        severity: "Major",
      });
    }
  }

  return { contents, findings, values };
};

const verifyRawEvidence = async (
  root: string,
  observations: EvaluationObservation[]
): Promise<SuiteFinding[]> => {
  const absoluteRoot = await realpath(root);
  const results = await Promise.all(
    observations.flatMap((observation) => {
      const references = [
        {
          ...observation.rawEvidence,
          kind: "Raw evidence",
        },
        ...(observation.rawEvidence.artifacts ?? []).map((artifact) => ({
          ...artifact,
          kind: "Evidence artifact",
        })),
      ];
      return references.map(async (reference): Promise<SuiteFinding[]> => {
        const evidencePath = path.resolve(root, reference.locator);
        const lexicalContainment = evidencePath.startsWith(
          `${path.resolve(root)}${path.sep}`
        );
        if (!lexicalContainment) {
          return [
            {
              check: "raw-evidence",
              file: reference.locator,
              message: `${reference.kind} for ${observation.fixtureId} escapes the repository.`,
              severity: "Critical",
            },
          ];
        }

        try {
          const resolvedEvidencePath = await realpath(evidencePath);
          if (!resolvedEvidencePath.startsWith(`${absoluteRoot}${path.sep}`)) {
            return [
              {
                check: "raw-evidence",
                file: reference.locator,
                message: `${reference.kind} for ${observation.fixtureId} escapes the repository through a symbolic link.`,
                severity: "Critical",
              },
            ];
          }
          const evidence = await readFile(evidencePath);
          const findings = findPublicBoundaryViolations(
            evidence.toString("utf-8")
          ).map(
            (violation): SuiteFinding => ({
              check: "raw-evidence",
              file: reference.locator,
              message: `${reference.kind} contains ${violation}.`,
              severity: "Critical",
            })
          );
          if (sha256(evidence) !== reference.sha256) {
            findings.push({
              check: "raw-evidence",
              file: reference.locator,
              message: `${reference.kind} hash does not match ${observation.fixtureId} attempt ${observation.attempt}.`,
              severity: "Major",
            });
          }
          return findings;
        } catch {
          return [
            {
              check: "raw-evidence",
              file: reference.locator,
              message: `${reference.kind} file is missing for ${observation.fixtureId} attempt ${observation.attempt}.`,
              severity: "Major",
            },
          ];
        }
      });
    })
  );
  return results.flat();
};

const buildReport = (
  fixtures: EvaluationFixture[],
  fixtureContents: Map<string, string>,
  fixturePaths: string[],
  observations: EvaluationObservation[],
  candidateIdentity: CandidateIdentity
): EvaluationSuiteReport => {
  const revisionById = new Map<string, string>();
  for (const fixturePath of fixturePaths) {
    const source = fixtureContents.get(fixturePath);
    if (!source) {
      continue;
    }
    const parsed = evaluationFixtureSchema.safeParse(parseYaml(source));
    if (parsed.success) {
      revisionById.set(parsed.data.id, sha256(source));
    }
  }

  const reports = fixtures
    .map((fixture) => ({
      ...evaluateFixture(fixture, observations),
      fixtureRevision: revisionById.get(fixture.id) ?? sha256(fixture.id),
    }))
    .toSorted((left, right) => left.fixtureId.localeCompare(right.fixtureId));
  const evaluatedAt =
    observations
      .map((observation) => observation.recordedAt)
      .toSorted()
      .at(-1) ?? null;
  const severityCounts: Record<FindingSeverity, number> = {
    Critical: 0,
    Major: 0,
    Minor: 0,
  };
  for (const report of reports) {
    for (const finding of report.findings) {
      severityCounts[finding.severity] += 1;
    }
  }

  return {
    evaluatedAt,
    fixtureSetRevision: sha256(
      reports
        .map((report) => `${report.fixtureId}:${report.fixtureRevision}`)
        .join("\n")
    ),
    fixtures: reports,
    schemaVersion: 1,
    suiteRevision: candidateIdentity.revision,
    suiteVersion: candidateIdentity.version,
    summary: {
      failed: reports.filter((report) => report.status === "failed").length,
      findings: severityCounts,
      fixtures: reports.length,
      passed: reports.filter((report) => report.status === "passed").length,
    },
  };
};

const validateObservationRevisions = (
  observations: EvaluationObservation[],
  candidateIdentity: CandidateIdentity
): SuiteFinding[] =>
  observations.flatMap((observation): SuiteFinding[] =>
    observation.suiteRevision === candidateIdentity.revision
      ? []
      : [
          {
            check: "evaluation-revision",
            message: `Observation ${observation.fixtureId} attempt ${observation.attempt} targets ${observation.suiteRevision}, not ${candidateIdentity.revision}.`,
            severity: "Major",
          },
        ]
  );

export const validateEvaluations = async (
  root: string,
  options: ValidationOptions = {}
): Promise<EvaluationValidation> => {
  const candidateIdentity =
    options.candidateIdentity ?? (await resolveCandidateIdentity(root));
  const evaluationsRoot = path.join(root, "evaluations");
  const fixtureDirectory = path.join(evaluationsRoot, "fixtures");
  const observationDirectory = path.join(evaluationsRoot, "observations");
  const fixturePaths = await listFiles(fixtureDirectory, {
    suffix: ".fixture.yaml",
  });
  const fixtures = await loadYamlRecords(
    root,
    fixtureDirectory,
    ".fixture.yaml",
    (value) => evaluationFixtureSchema.parse(value),
    "fixture"
  );
  const observations = await loadYamlRecords(
    root,
    observationDirectory,
    ".observation.yaml",
    (value) => evaluationObservationSchema.parse(value),
    "observation"
  );
  const rawEvidenceFindings = await verifyRawEvidence(
    root,
    observations.values
  );
  const findings = [
    ...fixtures.findings,
    ...observations.findings,
    ...rawEvidenceFindings,
    ...validateObservationRevisions(observations.values, candidateIdentity),
  ];
  const fixtureIds = fixtures.values.map((fixture) => fixture.id);
  const knownFixtureIds = new Set(fixtureIds);
  for (const fixtureId of new Set(fixtureIds)) {
    if (fixtureIds.filter((candidate) => candidate === fixtureId).length > 1) {
      findings.push({
        check: "evaluation-integrity",
        message: `Duplicate fixture id: ${fixtureId}.`,
        severity: "Major",
      });
    }
  }
  for (const observation of observations.values) {
    if (!knownFixtureIds.has(observation.fixtureId)) {
      findings.push({
        check: "evaluation-integrity",
        message: `Observation references unknown fixture: ${observation.fixtureId}.`,
        severity: "Major",
      });
    }
  }
  if (
    new Set(observations.values.map((observation) => observation.suiteRevision))
      .size > 1
  ) {
    findings.push({
      check: "evaluation-integrity",
      message:
        "All observations in one report must use the same suite revision.",
      severity: "Major",
    });
  }

  if (options.requireShapeCoverage !== false) {
    const shapes = new Set(fixtures.values.map((fixture) => fixture.shape));
    const missingShapes = [
      "direct",
      "indirect",
      "incomplete",
      "negative",
      "edge",
    ].filter((shape) => !shapes.has(shape as EvaluationFixture["shape"]));
    if (missingShapes.length > 0) {
      findings.push({
        check: "shape-coverage",
        message: `Missing foundation fixture shapes: ${missingShapes.join(", ")}.`,
        severity: "Major",
      });
    }
  }

  const report = buildReport(
    fixtures.values,
    fixtures.contents,
    fixturePaths,
    observations.values,
    candidateIdentity
  );
  for (const fixtureReport of report.fixtures) {
    for (const finding of fixtureReport.findings) {
      findings.push({
        check: "behavioral-evaluation",
        message: `${fixtureReport.fixtureId}: ${finding.message}`,
        severity: finding.severity,
      });
    }
  }

  const reportPath = path.join(
    evaluationsRoot,
    "reports",
    "foundation.report.json"
  );
  const recordedReport =
    options.checkReport === false
      ? null
      : await readFile(reportPath, "utf-8").catch(() => null);
  if (options.checkReport !== false && recordedReport) {
    try {
      if (
        JSON.stringify(JSON.parse(recordedReport)) !== JSON.stringify(report)
      ) {
        findings.push({
          check: "evaluation-report",
          file: path.relative(root, reportPath),
          message:
            "Recorded report is stale for the current fixtures or observations.",
          severity: "Major",
        });
      }
    } catch {
      findings.push({
        check: "evaluation-report",
        file: path.relative(root, reportPath),
        message: "Recorded report is not valid JSON.",
        severity: "Major",
      });
    }
  } else if (options.checkReport !== false && options.requireReport) {
    findings.push({
      check: "evaluation-report",
      file: path.relative(root, reportPath),
      message: "The revision-bound foundation report is missing.",
      severity: "Major",
    });
  }

  return { findings, report };
};

export const writeEvaluationReport = async (
  root: string,
  report: EvaluationSuiteReport
): Promise<void> => {
  const reportDirectory = path.join(root, "evaluations", "reports");
  await mkdir(reportDirectory, { recursive: true });
  await writeFile(
    path.join(reportDirectory, "foundation.report.json"),
    `${JSON.stringify(report, null, 2)}\n`
  );
};
