import type { FindingSeverity } from "./evaluation-contracts.ts";

export interface RepositoryFinding {
  check: string;
  severity: FindingSeverity;
  message: string;
  file?: string;
}
