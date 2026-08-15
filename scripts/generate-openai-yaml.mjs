#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");
const skillsDirectory = resolve(repositoryRoot, "skills");

const arguments_ = process.argv.slice(2);
const check = arguments_.includes("--check");
const requestedPaths = arguments_.filter((argument) => argument !== "--check");

function unquote(value) {
  const trimmed = value.trim();

  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return JSON.parse(trimmed);
  }

  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replaceAll("''", "'");
  }

  return trimmed;
}

function readFrontmatter(skillPath) {
  const source = readFileSync(skillPath, "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);

  if (!match) {
    throw new Error(`${skillPath}: missing YAML frontmatter`);
  }

  const frontmatter = new Map();

  for (const line of match[1].split("\n")) {
    if (/^\s/.test(line) || !line.includes(":")) continue;
    const separator = line.indexOf(":");
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1);
    frontmatter.set(key, unquote(value));
  }

  return frontmatter;
}

function displayName(name) {
  const preserved = new Map([
    ["adr", "ADR"],
    ["ai", "AI"],
    ["qa", "QA"],
    ["tdd", "TDD"],
    ["ui", "UI"],
  ]);

  const lowercase = new Set(["a", "an", "and", "as", "at", "by", "for", "in", "of", "on", "or", "the", "to", "via"]);

  return name
    .split("-")
    .map((word, index) => {
      if (preserved.has(word)) return preserved.get(word);
      if (index > 0 && lowercase.has(word)) return word;
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function renderOpenAiYaml(frontmatter, skillPath) {
  const name = frontmatter.get("name");
  const description = frontmatter.get("description");

  if (!name || !description) {
    throw new Error(`${skillPath}: frontmatter must define name and description`);
  }

  const lines = [
    "interface:",
    `  display_name: ${JSON.stringify(displayName(name))}`,
    `  short_description: ${JSON.stringify(description)}`,
  ];

  if (frontmatter.get("disable-model-invocation") === "true") {
    lines.push("policy:", "  allow_implicit_invocation: false");
  }

  return `${lines.join("\n")}\n`;
}

function resolveSkillPath(requestedPath) {
  const absolutePath = resolve(repositoryRoot, requestedPath);
  return absolutePath.endsWith("SKILL.md") ? absolutePath : resolve(absolutePath, "SKILL.md");
}

const skillPaths = requestedPaths.length
  ? requestedPaths.map(resolveSkillPath)
  : readdirSync(skillsDirectory, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => resolve(skillsDirectory, entry.name, "SKILL.md"))
      .filter(existsSync)
      .sort();

let stale = false;

for (const skillPath of skillPaths) {
  const outputPath = resolve(dirname(skillPath), "agents", "openai.yaml");
  const rendered = renderOpenAiYaml(readFrontmatter(skillPath), skillPath);
  const current = existsSync(outputPath) ? readFileSync(outputPath, "utf8") : undefined;

  if (current === rendered) continue;

  if (check) {
    console.error(`${outputPath}: generated metadata is stale or missing`);
    stale = true;
    continue;
  }

  await mkdir(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, rendered);
  console.log(outputPath);
}

if (stale) process.exitCode = 1;
