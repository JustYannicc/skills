interface PublicBoundaryPattern {
  expression: RegExp;
  label: string;
}

const publicBoundaryPatterns: PublicBoundaryPattern[] = [
  {
    expression: /\/(?:Users|home)\/[^/\s`]+\//u,
    label: "absolute user-local path",
  },
  {
    expression: /[A-Z]:\\Users\\[^\\\s`]+\\/iu,
    label: "Windows user-local path",
  },
  {
    expression: /-----BEGIN [A-Z ]*PRIVATE KEY-----/u,
    label: "private key material",
  },
  {
    expression:
      /\b(?:ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,})\b/u,
    label: "credential-like token",
  },
];

export const findPublicBoundaryViolations = (contents: string): string[] =>
  publicBoundaryPatterns
    .filter((pattern) => pattern.expression.test(contents))
    .map((pattern) => pattern.label);
