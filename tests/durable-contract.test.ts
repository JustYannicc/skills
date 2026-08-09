import { describe, expect, it } from "vitest";

import {
  guardSystemRecordAction,
  isDurableTicketBlocked,
  isDurableTicketInRecovery,
  isDurableTicketOnFrontier,
} from "../src/validation/durable-contract.ts";

const makeApprovedGuardInput = () => ({
  now: "2026-08-08T09:59:59.000Z",
  request: {
    action: "publish",
    authorityRevision: "authority-r3",
    contract: "contract:publish-r2",
    mode: "normal" as const,
    recordRevision: "record-r7",
    target: "site:public",
  },
  validation: {
    record: {
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
      operatingMode: "normal" as const,
    },
    source: "system-record-structural-validator" as const,
    status: "valid" as const,
  },
});

describe("Durable Workflow deterministic seams", () => {
  it("keeps blocked work off the frontier", () => {
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
        liveClaim: null,
        requirements: [{ state: "cancelled", waived: true }],
        state: "accepted",
      })
    ).toBeTruthy();
    expect(
      isDurableTicketOnFrontier({
        state: "accepted",
      })
    ).toBeFalsy();
  });

  it("puts stale active work in Recovery", () => {
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
      request: {
        action: "publish",
        authorityRevision: "authority-r3",
        contract: "contract:publish-r2",
        mode: "normal" as const,
        recordRevision: "record-r7",
        target: "site:public",
      },
      validation: {
        record: {
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
        },
        source: "system-record-structural-validator" as const,
        status: "valid" as const,
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
      guardSystemRecordAction({
        ...base,
        validation: {
          ...base.validation,
          record: { ...base.validation.record, lifecycleEligible: false },
        },
      })
    ).toMatchObject({ allowed: false });
  });

  it("requires exact approval revision and valid time before a guarded effect", () => {
    const input = makeApprovedGuardInput();

    expect(guardSystemRecordAction(input)).toStrictEqual({ allowed: true });
    const inputWithoutApproval = {
      ...input,
      validation: {
        ...input.validation,
        record: { ...input.validation.record },
      },
    };
    Reflect.deleteProperty(inputWithoutApproval.validation.record, "approval");
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
        validation: {
          ...input.validation,
          record: {
            ...input.validation.record,
            approval: {
              ...input.validation.record.approval,
              resultRevision: "record-r6",
            },
          },
        },
      })
    ).toMatchObject({ allowed: false });
    expect(
      guardSystemRecordAction({
        ...input,
        validation: {
          ...input.validation,
          record: {
            ...input.validation.record,
            approval: {
              ...input.validation.record.approval,
              status: "revoked",
            },
          },
        },
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
        validation: {
          ...input.validation,
          record: {
            ...input.validation.record,
            approval: {
              ...input.validation.record.approval,
              validUntil: "not-a-timestamp",
            },
          },
        },
      })
    ).toMatchObject({ allowed: false });
    expect(
      guardSystemRecordAction({
        ...input,
        now: "not-a-timestamp",
      })
    ).toMatchObject({ allowed: false });
    const inputWithoutValidity = {
      ...input,
      validation: {
        ...input.validation,
        record: { ...input.validation.record },
      },
    };
    Reflect.deleteProperty(
      inputWithoutValidity.validation.record.approval,
      "validUntil"
    );
    expect(guardSystemRecordAction(inputWithoutValidity)).toMatchObject({
      allowed: false,
    });
  });

  it("blocks an action when the #35 structural validator is unavailable or rejects the record", () => {
    const input = makeApprovedGuardInput();
    expect(
      guardSystemRecordAction({
        ...input,
        validation: {
          reason: "duplicate envelope key",
          source: "system-record-structural-validator",
          status: "invalid",
        },
      })
    ).toMatchObject({ allowed: false });
  });
});
