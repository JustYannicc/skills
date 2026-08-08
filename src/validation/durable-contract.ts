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
  readonly liveClaim?: boolean;
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

export interface SystemRecordActionGuardInput {
  readonly lifecycleEligible: boolean;
  readonly currentRecordRevision: string;
  readonly currentAuthorityRevision: string;
  readonly allowedEffects: readonly {
    readonly action: string;
    readonly boundary: string;
    readonly contract: string;
  }[];
  readonly operatingMode: "normal" | "degraded" | "paused" | "recovery";
  readonly request: SystemRecordActionRequest;
  readonly approvalRequired?: boolean;
  readonly approval?: {
    readonly status: "pending" | "approved" | "revoked";
    readonly resultRevision: string;
    readonly authorityRevision: string;
    readonly validUntil?: string;
  };
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
  ticket.liveClaim !== true;

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
 * Narrative quality, semantic ownership, and decision wisdom remain human or
 * LLM judgment; this guard only checks exact formal bindings.
 */
export const guardSystemRecordAction = (
  input: SystemRecordActionGuardInput
): GuardResult => {
  const { request } = input;
  if (!input.lifecycleEligible) {
    return { allowed: false, reason: "record is not lifecycle-eligible" };
  }
  if (input.operatingMode !== "normal" || request.mode !== "normal") {
    return {
      allowed: false,
      reason: "record or request is not in normal mode",
    };
  }
  if (
    staleOrMissing(request.recordRevision, input.currentRecordRevision) ||
    staleOrMissing(request.authorityRevision, input.currentAuthorityRevision)
  ) {
    return { allowed: false, reason: "record or Authority revision is stale" };
  }

  const effect = input.allowedEffects.find(
    (candidate) =>
      candidate.action === request.action &&
      candidate.boundary === request.target &&
      candidate.contract === request.contract
  );
  if (!effect) {
    return { allowed: false, reason: "requested action is outside Authority" };
  }

  if (input.approvalRequired && !input.approval) {
    return { allowed: false, reason: "required approval is missing" };
  }
  if (input.approval) {
    if (input.approval.status !== "approved") {
      return { allowed: false, reason: "approval is not approved" };
    }
    if (
      input.approval.resultRevision !== request.recordRevision ||
      input.approval.authorityRevision !== request.authorityRevision
    ) {
      return {
        allowed: false,
        reason: "approval is bound to another revision",
      };
    }
    if (
      input.approval.validUntil &&
      input.now &&
      Date.parse(input.approval.validUntil) <= Date.parse(input.now)
    ) {
      return { allowed: false, reason: "approval has expired" };
    }
  }

  return { allowed: true };
};
