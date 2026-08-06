import { z } from "zod";

const nonEmptyString = z.string().trim().min(1);
const stringList = z.array(nonEmptyString);
const capabilityValue = z.union([z.boolean(), z.number(), nonEmptyString]);
const evidenceReferenceSchema = z.object({
  locator: nonEmptyString,
  sha256: z.string().regex(/^[a-f0-9]{64}$/u),
});
const runtimeInputSchema = evidenceReferenceSchema.extend({
  role: z.enum([
    "skill",
    "fixture",
    "governing-skill",
    "governing-reference",
    "disclosed-reference",
  ]),
});

export const severitySchema = z.enum(["Critical", "Major", "Minor"]);

export const capabilityEnvironmentSchema = z.object({
  capabilities: z.record(nonEmptyString, capabilityValue),
  id: nonEmptyString,
  tools: stringList,
});

const expectedEvidenceSchema = z.object({
  actions: stringList,
  artifacts: stringList,
  effects: stringList,
  forbidden: stringList,
  invoked: stringList,
  notInvoked: stringList,
  proof: stringList,
  responsibility: stringList,
  route: stringList,
  state: stringList,
});

const observedEvidenceSchema = z.object({
  actions: stringList,
  artifacts: stringList,
  effects: stringList,
  forbiddenChecks: z.array(
    z.object({
      criterion: nonEmptyString,
      evidence: nonEmptyString,
      observed: z.boolean(),
    })
  ),
  invoked: stringList,
  notInvoked: stringList,
  proof: stringList,
  responsibility: stringList,
  route: stringList,
  state: stringList,
});

export const evaluationFixtureSchema = z
  .object({
    domains: stringList.min(1),
    environment: capabilityEnvironmentSchema,
    expected: expectedEvidenceSchema,
    id: nonEmptyString.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u),
    kind: z.enum(["invocation", "routing", "composition", "setup", "adapter"]),
    prompt: nonEmptyString,
    requiredAttempts: z.number().int().positive(),
    runtimeReferences: stringList.optional(),
    schemaVersion: z.literal(1),
    severity: severitySchema,
    shape: z.enum(["direct", "indirect", "incomplete", "negative", "edge"]),
    skill: nonEmptyString.optional(),
    title: nonEmptyString,
  })
  .superRefine((fixture, context) => {
    const requiresRepetition =
      fixture.severity === "Critical" &&
      (fixture.kind === "invocation" || fixture.kind === "routing");

    if (requiresRepetition && fixture.requiredAttempts < 3) {
      context.addIssue({
        code: "custom",
        message:
          "Critical invocation and routing fixtures require at least three fresh attempts.",
        path: ["requiredAttempts"],
      });
    }
  });

export const evaluationObservationSchema = z.object({
  attempt: z.number().int().positive(),
  contextId: nonEmptyString,
  environment: capabilityEnvironmentSchema,
  evaluator: nonEmptyString,
  fixtureId: nonEmptyString,
  observed: observedEvidenceSchema,
  rawEvidence: evidenceReferenceSchema.extend({
    artifacts: z.array(evidenceReferenceSchema).optional(),
  }),
  recordedAt: z.iso.datetime(),
  runtimeInputs: z.array(runtimeInputSchema).min(1).optional(),
  schemaVersion: z.literal(1),
  suiteRevision: z
    .string()
    .regex(/^(?:git:[a-f0-9]{40}|working-tree:[a-f0-9]{64})$/u),
});

export type EvaluationFixture = z.infer<typeof evaluationFixtureSchema>;
export type EvaluationObservation = z.infer<typeof evaluationObservationSchema>;
export type FindingSeverity = z.infer<typeof severitySchema>;
