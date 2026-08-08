import { describe, expect, it } from "vitest";

import {
  guardSystemRecordAction,
  isDurableTicketBlocked,
  isDurableTicketInRecovery,
  isDurableTicketOnFrontier,
} from "../src/validation/durable-contract.ts";

const makeApprovedGuardInput = () => ({
  allowedEffects: [
    {
      action: "publish",
      boundary: "site:public",
      contract: "contract:publish-r2",
    },
  ],
  approval: {
    authorityRevision: "authority-r3",
    resultRevision: "record-r7",
    status: "approved" as const,
    validUntil: "2026-08-08T10:00:00.000Z",
  },
  approvalRequired: true,
  currentAuthorityRevision: "authority-r3",
  currentRecordRevision: "record-r7",
  lifecycleEligible: true,
  now: "2026-08-08T09:59:59.000Z",
  operatingMode: "normal" as const,
  request: {
    action: "publish",
    authorityRevision: "authority-r3",
    contract: "contract:publish-r2",
    mode: "normal" as const,
    recordRevision: "record-r7",
    target: "site:public",
  },
});

describe("Durable Workflow deterministic seams", () => {
  it("keeps blocked work off the frontier and puts stale active work in Recovery", () => {
    expect(
      isDurableTicketBlocked({
        requirements: [{ state: "waiting" }],
        state: "accepted",
      })
    ).toBeTruthy();
    expect(
      isDurableTicketOnFrontier({
        requirements: [{ state: "waiting" }],
        state: "accepted",
      })
    ).toBeFalsy();
    expect(
      isDurableTicketOnFrontier({
        requirements: [{ state: "cancelled", waived: true }],
        state: "accepted",
      })
    ).toBeTruthy();
    expect(
      isDurableTicketInRecovery({
        liveClaim: false,
        state: "active",
      })
    ).toBeTruthy();
    expect(
      isDurableTicketInRecovery({
        liveClaim: true,
        state: "active",
      })
    ).toBeFalsy();
  });

  it("fails the System Record action seam closed for stale, ineligible, or wrong-scope requests", () => {
    const base = {
      allowedEffects: [
        {
          action: "publish",
          boundary: "site:public",
          contract: "contract:publish-r2",
        },
      ],
      currentAuthorityRevision: "authority-r3",
      currentRecordRevision: "record-r7",
      lifecycleEligible: true,
      operatingMode: "normal" as const,
      request: {
        action: "publish",
        authorityRevision: "authority-r3",
        contract: "contract:publish-r2",
        mode: "normal" as const,
        recordRevision: "record-r7",
        target: "site:public",
      },
    };

    expect(guardSystemRecordAction(base)).toStrictEqual({ allowed: true });
    expect(
      guardSystemRecordAction({
        ...base,
        request: { ...base.request, recordRevision: "record-r6" },
      })
    ).toMatchObject({ allowed: false });
    expect(
      guardSystemRecordAction({
        ...base,
        request: { ...base.request, target: "site:private" },
      })
    ).toMatchObject({ allowed: false });
    expect(
      guardSystemRecordAction({ ...base, lifecycleEligible: false })
    ).toMatchObject({ allowed: false });
  });

  it("requires exact approval revision and valid time before a guarded effect", () => {
    const input = makeApprovedGuardInput();

    expect(guardSystemRecordAction(input)).toStrictEqual({ allowed: true });
    const inputWithoutApproval = { ...input };
    Reflect.deleteProperty(inputWithoutApproval, "approval");
    expect(guardSystemRecordAction(inputWithoutApproval)).toMatchObject({
      allowed: false,
    });
    expect(
      guardSystemRecordAction({
        ...input,
        now: "2026-08-08T10:00:00.000Z",
      })
    ).toMatchObject({ allowed: false });
    expect(
      guardSystemRecordAction({
        ...input,
        approval: { ...input.approval, resultRevision: "record-r6" },
      })
    ).toMatchObject({ allowed: false });
    expect(
      guardSystemRecordAction({
        ...input,
        approval: { ...input.approval, status: "revoked" },
      })
    ).toMatchObject({ allowed: false });
  });

  it("fails closed when approval validity cannot be verified", () => {
    const input = makeApprovedGuardInput();
    const inputWithoutCurrentTime = { ...input };
    Reflect.deleteProperty(inputWithoutCurrentTime, "now");
    expect(guardSystemRecordAction(inputWithoutCurrentTime)).toMatchObject({
      allowed: false,
    });
    expect(
      guardSystemRecordAction({
        ...input,
        approval: { ...input.approval, validUntil: "not-a-timestamp" },
      })
    ).toMatchObject({ allowed: false });
    expect(
      guardSystemRecordAction({
        ...input,
        now: "not-a-timestamp",
      })
    ).toMatchObject({ allowed: false });
  });
});
