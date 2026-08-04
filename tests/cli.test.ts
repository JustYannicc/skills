import { describe, expect, it } from "vitest";

import { runCli } from "../src/cli.ts";

describe("validation command", () => {
  it("rejects an unknown command through its public interface", async () => {
    const errors: string[] = [];

    const exitCode = await runCli({
      args: ["unknown"],
      cwd: process.cwd(),
      stderr: (message) => errors.push(message),
      stdout: () => {},
    });

    expect(exitCode).toBe(2);
    expect(errors).toStrictEqual(["Usage: pnpm validate"]);
  });
});
