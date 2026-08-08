/**
 * Deterministic seams for the adapter-neutral Durable Workflow contract.
 *
 * This module is deliberately a validation/test seam, not a storage Adapter.
 * Adapters remain responsible for persistence, atomicity, and host-specific
 * operations; these pure functions make the queue and System Record action
 * guard invariants executable without introducing a second workflow runtime.
 */

export type DurableTicketState =
  | "proposed"
  | "accepted"
  | "active"
  | "waiting"
  | "in_review"
  | "complete"
  | "cancelled";

export interface DurableRequirement {
  readonly state: DurableTicketState;
  readonly waived?: boolean;
}

export interface DurableTicketSnapshot {
  readonly state: DurableTicketState;
  readonly requirements?: readonly DurableRequirement[];
  /** `null` is the validator's explicit, claim-free result; `undefined` is unverified. */
  readonly liveClaim?: boolean | null;
  readonly continuationNeedsIntervention?: boolean;
  readonly ownerNeedsIntervention?: boolean;
  readonly reviewNeedsIntervention?: boolean;
  readonly deadlineNeedsIntervention?: boolean;
}

export interface SystemRecordActionRequest {
  readonly action: string;
  readonly target: string;
  readonly contract: string;
  readonly recordRevision: string;
  readonly authorityRevision: string;
  readonly mode: "normal" | "degraded" | "paused" | "recovery";
}

export interface ValidatedSystemRecordEnvelope {
  readonly lifecycleEligible: boolean;
  readonly currentRecordRevision: string;
  readonly currentAuthorityRevision: string;
  readonly allowedEffects: readonly {
    readonly action: string;
    readonly boundary: string;
    readonly contract: string;
  }[];
  readonly operatingMode: "normal" | "degraded" | "paused" | "recovery";
  readonly approvalRequired?: boolean;
  readonly approval?: {
    readonly status: "pending" | "approved" | "revoked";
    readonly resultRevision: string;
    readonly authorityRevision: string;
    readonly validUntil: string;
  };
}

/**
 * The accepted #35 structural validator is an Adapter boundary. This result
 * lets the action guard consume only that validator's output, while keeping
 * parsing and host-specific persistence outside this pure seam.
 */
export type SystemRecordStructuralValidation =
  | {
      readonly source: "system-record-structural-validator";
      readonly status: "valid";
      readonly record: ValidatedSystemRecordEnvelope;
    }
  | {
      readonly source: "system-record-structural-validator";
      readonly status: "invalid";
      readonly reason: string;
    };

export interface SystemRecordActionGuardInput {
  readonly validation: SystemRecordStructuralValidation;
  readonly request: SystemRecordActionRequest;
  readonly now?: string;
}

export interface GuardResult {
  readonly allowed: boolean;
  readonly reason?: string;
}

const staleOrMissing = (value: string, expected: string): boolean =>
  value.length === 0 || value !== expected;

/** A Ticket is blocked by any unwaived prerequisite that is not complete. */
export const isDurableTicketBlocked = (
  ticket: DurableTicketSnapshot
): boolean =>
  (ticket.requirements ?? []).some(
    (requirement) => !requirement.waived && requirement.state !== "complete"
  );

/** The Work frontier contains accepted, unblocked, unclaimed Tickets. */
export const isDurableTicketOnFrontier = (
  ticket: DurableTicketSnapshot
): boolean =>
  ticket.state === "accepted" &&
  !isDurableTicketBlocked(ticket) &&
  ticket.liveClaim === null;

/** Stale coordination, continuation, ownership, review, or deadline enters Recovery. */
export const isDurableTicketInRecovery = (
  ticket: DurableTicketSnapshot
): boolean =>
  ["active", "waiting", "in_review"].includes(ticket.state) &&
  (ticket.continuationNeedsIntervention === true ||
    ticket.ownerNeedsIntervention === true ||
    ticket.reviewNeedsIntervention === true ||
    ticket.deadlineNeedsIntervention === true ||
    (ticket.state === "active" && ticket.liveClaim !== true));

/**
 * Prove the deterministic part of the #35 System Record action boundary.
 * The production Adapter must pass the accepted structural validator's
 * `SystemRecordStructuralValidation` result. This pure seam does not parse
 * Markdown or YAML and does not treat formal validation as proof that
 * narrative or semantic fields are valid; those remain human or LLM
 * judgment. It checks only exact formal bindings.
 */
export const guardSystemRecordAction = (
  input: SystemRecordActionGuardInput
): GuardResult => {
  if (input.validation.source !== "system-record-structural-validator") {
    return {
      allowed: false,
      reason: "System Record structural validator source is unrecognized",
    };
  }
  if (input.validation.status !== "valid") {
    return {
      allowed: false,
      reason: `System Record structural validation failed: ${input.validation.reason}`,
    };
  }
  const { record } = input.validation;
  const { request } = input;
  if (!record.lifecycleEligible) {
    return { allowed: false, reason: "record is not lifecycle-eligible" };
  }
  if (record.operatingMode !== "normal" || request.mode !== "normal") {
    return {
      allowed: false,
      reason: "record or request is not in normal mode",
    };
  }
  if (
    staleOrMissing(request.recordRevision, record.currentRecordRevision) ||
    staleOrMissing(request.authorityRevision, record.currentAuthorityRevision)
  ) {
    return { allowed: false, reason: "record or Authority revision is stale" };
  }

  const effect = record.allowedEffects.find(
    (candidate) =>
      candidate.action === request.action &&
      candidate.boundary === request.target &&
      candidate.contract === request.contract
  );
  if (!effect) {
    return { allowed: false, reason: "requested action is outside Authority" };
  }

  if (record.approvalRequired && !record.approval) {
    return { allowed: false, reason: "required approval is missing" };
  }
  if (record.approval) {
    if (record.approval.status !== "approved") {
      return { allowed: false, reason: "approval is not approved" };
    }
    if (
      record.approval.resultRevision !== request.recordRevision ||
      record.approval.authorityRevision !== request.authorityRevision
    ) {
      return {
        allowed: false,
        reason: "approval is bound to another revision",
      };
    }
    if (!record.approval.validUntil || !input.now) {
      return {
        allowed: false,
        reason: "approval validity cannot be checked without timestamps",
      };
    }
    const validUntil = Date.parse(record.approval.validUntil);
    const now = Date.parse(input.now);
    if (Number.isNaN(validUntil) || Number.isNaN(now)) {
      return {
        allowed: false,
        reason: "approval validity timestamp is invalid",
      };
    }
    if (validUntil <= now) {
      return { allowed: false, reason: "approval has expired" };
    }
  }

  return { allowed: true };
};
