import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    ...(ultracite.ignorePatterns ?? []),
    "**/*.md",
    "evaluations/**/*.json",
    "evaluations/**/*.txt",
    "evaluations/**/*.yaml",
    "pnpm-lock.yaml",
    "pnpm-workspace.yaml",
    "validation/**/*.yaml",
  ],
});
