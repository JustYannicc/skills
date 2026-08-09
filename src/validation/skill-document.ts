import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

const skillFrontmatterPattern =
  /^---\r?\n(?<frontmatter>[\s\S]*?)\r?\n---(?:\r?\n|$)/u;

export interface SkillDocument {
  body: string;
  frontmatter: unknown;
}

export const parseSkillDocument = (contents: string): SkillDocument => {
  const match = contents.match(skillFrontmatterPattern);
  if (!match?.groups?.frontmatter) {
    throw new Error("SKILL.md must begin with YAML frontmatter.");
  }
  return {
    body: contents.slice(match[0].length),
    frontmatter: parseYaml(match.groups.frontmatter),
  };
};

export const projectSkillFrontmatter = (
  contents: string,
  omittedKeys: string[]
): string => {
  const match = contents.match(skillFrontmatterPattern);
  if (!match?.groups?.frontmatter) {
    return contents;
  }
  const parsed = parseYaml(match.groups.frontmatter);
  if (!(parsed && typeof parsed === "object") || Array.isArray(parsed)) {
    return contents;
  }
  const omitted = new Set(omittedKeys);
  const projected = Object.fromEntries(
    Object.entries(parsed).filter(([key]) => !omitted.has(key))
  );
  const newline = match[0].includes("\r\n") ? "\r\n" : "\n";
  const serialized = stringifyYaml(projected, { lineWidth: 0 })
    .trimEnd()
    .replaceAll("\n", newline);
  const closingBreak = match[0].endsWith(newline) ? newline : "";
  return `---${newline}${serialized}${newline}---${closingBreak}${contents.slice(match[0].length)}`;
};
