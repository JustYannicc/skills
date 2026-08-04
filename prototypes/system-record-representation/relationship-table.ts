import { z } from "zod";

const opaqueId = z
  .string()
  .regex(/^[A-Za-z0-9][A-Za-z0-9:._/-]*$/u, "expected an opaque logical id");

const relationshipSchema = z
  .object({
    contract: z.string().min(1),
    kind: z.enum([
      "containing",
      "subsystem",
      "upstream",
      "dependent",
      "peer",
      "related",
    ]),
    material_boundary: z.string().min(1),
    record_id: opaqueId,
    record_version: z.string().min(1),
  })
  .strict();

export type Relationship = z.infer<typeof relationshipSchema>;

const relationshipListSchema = z
  .array(relationshipSchema)
  .min(1)
  .refine(
    (items) =>
      new Set(
        items.map(
          (item) => `${item.kind}\0${item.record_id}\0${item.record_version}`
        )
      ).size === items.length,
    { message: "relationships must be unique by kind, id, and version" }
  );

const relationshipKinds = {
  "Containing System": "containing",
  "Dependent System": "dependent",
  "Other material relationship": "related",
  "Peer System": "peer",
  Subsystem: "subsystem",
  "Upstream System": "upstream",
} as const;

const expectedHeader = [
  "Relationship",
  "Related System identity and version",
  "This System's role and material boundary",
  "Interface or handoff contract reference, if material",
];

const cells = (line: string) => {
  const trimmed = line.trim();
  if (!(trimmed.startsWith("|") && trimmed.endsWith("|"))) {
    throw new Error("relationship table rows must start and end with a pipe");
  }
  return trimmed
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
};

const parseRelationshipRow = (row: string[]): Relationship => {
  if (row.length !== expectedHeader.length) {
    throw new Error("relationship rows must contain exactly four cells");
  }
  const [label = "", identityAndVersion = "", boundary = "", contract = ""] =
    row;
  const kind = relationshipKinds[label as keyof typeof relationshipKinds];
  if (!kind) {
    throw new Error(`unsupported relationship kind: ${label}`);
  }
  const separator = identityAndVersion.lastIndexOf(" @ ");
  if (separator <= 0 || separator === identityAndVersion.length - 3) {
    throw new Error(
      "relationship identity/version must use '<id> @ <version>'"
    );
  }
  const link = /^\[[^\]]+\]\((?<locator>[^)]+)\)$/u.exec(contract);
  if (!link?.groups?.locator) {
    throw new Error("relationship contract must be one Markdown link");
  }
  return relationshipSchema.parse({
    contract: link.groups.locator,
    kind,
    material_boundary: boundary,
    record_id: identityAndVersion.slice(0, separator),
    record_version: identityAndVersion.slice(separator + 3),
  });
};

export const parseRelationshipTable = (narrative: string): Relationship[] => {
  const lines = narrative.split("\n");
  const section = lines.indexOf("## 2. Boundary and support");
  if (section === -1) {
    throw new Error("missing Section 2 relationship authority");
  }
  const header = lines.findIndex(
    (line, index) =>
      index > section && line.trim().startsWith("| Relationship |")
  );
  if (header === -1 || header + 2 >= lines.length) {
    throw new Error("missing relationship table header or rows");
  }
  if (
    JSON.stringify(cells(lines[header] ?? "")) !==
    JSON.stringify(expectedHeader)
  ) {
    throw new Error("unexpected relationship table columns");
  }
  if (!cells(lines[header + 1] ?? "").every((cell) => /^-{3,}$/u.test(cell))) {
    throw new Error("invalid relationship table divider");
  }

  const rows: Relationship[] = [];
  for (const line of lines.slice(header + 2)) {
    if (!line.trim().startsWith("|")) {
      break;
    }
    rows.push(parseRelationshipRow(cells(line)));
  }
  return relationshipListSchema.parse(rows);
};
