import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  projectOfficialSkillFrontmatter,
  validateWithOfficialReference,
} from "../src/validation/official-skill-validator.ts";

describe("official Agent Skills projection", () => {
  it("removes only the local explicit-invocation extension", () => {
    const skill = `---
name: ask-yannic
description: Explain a route.
disable-model-invocation: true
license: MIT
metadata:
  homepage: https://example.com
---

# Ask Yannic

Guidance only.
`;

    expect(projectOfficialSkillFrontmatter(skill)).toBe(`---
name: ask-yannic
description: Explain a route.
license: MIT
metadata:
  homepage: https://example.com
---

# Ask Yannic

Guidance only.
`);
  });

  it("leaves a standard skill unchanged", () => {
    const skill = `---
name: workflow
description: Coordinate work.
license: MIT
---

# Workflow
`;

    expect(projectOfficialSkillFrontmatter(skill)).toBe(skill);
  });

  it("removes an inline-commented extension and preserves CRLF", () => {
    const skill =
      "---\r\nname: explicit\r\ndescription: Explicit.\r\ndisable-model-invocation: true # user only\r\n---\r\n\r\n# Explicit\r\n";
    const projected = projectOfficialSkillFrontmatter(skill);

    expect(projected).not.toContain("disable-model-invocation");
    expect(projected).toContain("---\r\nname: explicit\r\n");
    expect(projected).toContain("\r\n# Explicit\r\n");
  });

  it("returns a structured finding when a skill file cannot be prepared", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "official-skill-test-"));
    await mkdir(path.join(root, "skills", "missing-skill"), {
      recursive: true,
    });
    await mkdir(path.join(root, "validation"), { recursive: true });
    const revision = "a".repeat(40);
    await writeFile(
      path.join(root, "validation", "sources.yaml"),
      `schemaVersion: 1
sources:
  - id: agent-skills-reference-validator
    url: https://github.com/agentskills/agentskills
    revision: ${revision}
    commitUrl: https://github.com/agentskills/agentskills/commit/${revision}
    license: Apache-2.0
`
    );

    const result = await validateWithOfficialReference(root);

    expect(result).toStrictEqual({
      checkedSkills: 1,
      findings: [
        expect.objectContaining({
          check: "agent-skills-reference",
          file: "skills/missing-skill",
          severity: "Major",
        }),
      ],
    });
  });
});
