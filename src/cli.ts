import {
  validateEvaluations,
  writeEvaluationReport,
} from "./validation/evaluation-suite.ts";
import type { SuiteFinding } from "./validation/evaluation-suite.ts";
import { validateWithOfficialReference } from "./validation/official-skill-validator.ts";
import { validateRepository } from "./validation/repository-validator.ts";

interface CliOptions {
  readonly args: readonly string[];
  readonly cwd: string;
  readonly stderr: (message: string) => void;
  readonly stdout: (message: string) => void;
}

const defaultOptions = (): CliOptions => ({
  args: process.argv.slice(2),
  cwd: process.cwd(),
  stderr: (message) => console.error(message),
  stdout: (message) => console.log(message),
});

const printFindings = (
  findings: SuiteFinding[],
  write: (message: string) => void
): void => {
  for (const finding of findings) {
    const location = finding.file ? ` ${finding.file}` : "";
    write(
      `${finding.severity} [${finding.check}]${location}: ${finding.message}`
    );
  }
};

export const runCli = async (
  options: CliOptions = defaultOptions()
): Promise<number> => {
  if (options.args.length !== 1) {
    options.stderr("Usage: pnpm validate");
    return 2;
  }

  if (options.args[0] === "record-evaluations") {
    const evaluations = await validateEvaluations(options.cwd, {
      checkReport: false,
    });
    const blockingFindings = evaluations.findings.filter(
      (finding) => finding.severity !== "Minor"
    );
    if (blockingFindings.length > 0) {
      printFindings(blockingFindings, options.stderr);
      return 1;
    }
    await writeEvaluationReport(options.cwd, evaluations.report);
    options.stdout("Recorded evaluations/reports/foundation.report.json");
    return 0;
  }

  if (options.args[0] !== "validate") {
    options.stderr("Usage: pnpm validate");
    return 2;
  }

  const repository = await validateRepository(options.cwd);
  const evaluations = await validateEvaluations(options.cwd, {
    requireReport: true,
  });
  const official = await validateWithOfficialReference(options.cwd);
  const findings: SuiteFinding[] = [
    ...repository.findings,
    ...evaluations.findings,
    ...official.findings,
  ];
  const blockingFindings = findings.filter(
    (finding) => finding.severity !== "Minor"
  );

  if (blockingFindings.length > 0) {
    printFindings(findings, options.stderr);
    return 1;
  }

  options.stdout(
    `Validated ${repository.checkedFiles} files, ${repository.checkedSkills} skills, and ${evaluations.report.summary.fixtures} evaluation fixtures.`
  );
  if (findings.length > 0) {
    printFindings(findings, options.stdout);
  }
  return 0;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exitCode = await runCli();
}
