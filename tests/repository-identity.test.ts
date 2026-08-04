import { execFile } from "node:child_process";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { resolveCandidateIdentity } from "../src/validation/repository-identity.ts";

const execFileAsync = promisify(execFile);

describe("candidate identity", () => {
  it("changes with candidate inputs but not with evaluation artifacts", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "candidate-identity-"));
    await mkdir(path.join(root, "evaluations", "evidence"), {
      recursive: true,
    });
    await writeFile(
      path.join(root, "package.json"),
      '{"name":"identity-fixture","version":"1.2.3"}\n'
    );
    await writeFile(path.join(root, "SKILL.md"), "candidate one\n");
    await writeFile(
      path.join(root, "evaluations", "evidence", "trace.txt"),
      "first trace\n"
    );

    const initial = await resolveCandidateIdentity(root);
    await writeFile(
      path.join(root, "evaluations", "evidence", "trace.txt"),
      "second trace\n"
    );
    const evidenceChanged = await resolveCandidateIdentity(root);
    await writeFile(path.join(root, "SKILL.md"), "candidate two\n");
    const candidateChanged = await resolveCandidateIdentity(root);

    expect(initial.version).toBe("1.2.3");
    expect(evidenceChanged.revision).toBe(initial.revision);
    expect(candidateChanged.revision).not.toBe(initial.revision);
  });

  it("keeps the candidate commit when a later commit contains only evidence", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "candidate-git-identity-"));
    await execFileAsync("git", ["init"], { cwd: root });
    await execFileAsync("git", ["config", "user.name", "Fixture"], {
      cwd: root,
    });
    await execFileAsync(
      "git",
      ["config", "user.email", "fixture@example.test"],
      {
        cwd: root,
      }
    );
    await writeFile(
      path.join(root, "package.json"),
      '{"name":"identity-fixture","version":"1.2.3"}\n'
    );
    await writeFile(path.join(root, "SKILL.md"), "candidate\n");
    await execFileAsync("git", ["add", "package.json", "SKILL.md"], {
      cwd: root,
    });
    await execFileAsync("git", ["commit", "-m", "candidate"], { cwd: root });
    const candidate = await resolveCandidateIdentity(root);

    await mkdir(path.join(root, "evaluations"), { recursive: true });
    await writeFile(path.join(root, "evaluations", "report.json"), "{}\n");
    await execFileAsync("git", ["add", "evaluations/report.json"], {
      cwd: root,
    });
    await execFileAsync("git", ["commit", "-m", "evidence"], { cwd: root });
    const attested = await resolveCandidateIdentity(root);

    expect(candidate.revision).toMatch(/^git:[a-f0-9]{40}$/u);
    expect(attested.revision).toBe(candidate.revision);
  });
});
