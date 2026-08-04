---
schemaVersion: 1
recordType: research-result
recordId: research-cross-domain-direct-3
title: Shared quiet-hours pilot — cross-domain primary-record research
adapter: local-markdown
locator: evaluations/evidence/research/cross-domain-direct-3.record.md
fixtureId: research-cross-domain-direct
attempt: 3
sourceRevision: git:d6536d81e10ca550b7483aa4a21d319c7cbf7688
createdAt: 2026-08-04T18:17:29.000Z
updatedAt: 2026-08-04T18:17:29.000Z
resultRevisionAlgorithm: sha256(file-bytes)
durable: true
readBackVerified: true
---

# Research result

## Bounded question

What external evidence in the supplied primary records is relevant to a possible shared quiet-hours pilot at a community workshop? This record reports evidence only. It does not decide whether to adopt a policy, define a specification, or perform execution.

## Primary records

- `workshop-acoustic-survey@rev-2026-07-15` — physical-setting record supplied for this run.
- `workshop-booking-ledger@rev-2026-Q2` — operating record supplied for this run.

These two supplied records are treated as the primary sources for the bounded question. No secondary commentary is used as evidence.

## Observed facts

1. The physical-setting record reports 78–84 dBA at the shared benches from 18:00–20:00 during powered-tool use.
2. The same physical-setting record reports 43–47 dBA in the adjacent quiet room.
3. The operating record reports that 65% of member visits occur after 18:00.
4. The operating record reports that 31% of after-18:00 bookings list instruction or conversation as their primary activity.

## Bounded inferences

- The reported shared-bench readings are higher than the reported adjacent-quiet-room readings over the stated 18:00–20:00 window. The possible endpoint difference is 31–41 dB (78−47 through 84−43); this arithmetic comparison is not a conversion to exposure, dose, or harm.
- After-18:00 use is a substantial part of the supplied visit distribution, and instruction or conversation is a recorded primary activity for a subset of those bookings. The records therefore establish relevance of both the physical and operating conditions to further consideration of a quiet-hours pilot; they do not establish that a pilot would produce a desired outcome or that any policy should be adopted.

## Uncertainty and limits

- The records do not state sampling method, sample count, calibration, measurement locations beyond the named areas, or representativeness across days and users.
- dBA readings are reported as ranges; the records do not provide duration-weighted exposure, dose, or a health/safety threshold comparison.
- The booking percentages do not state the observation window's completeness, rounding method, or whether “primary activity” classifications were independently verified. No combined percentage is inferred from them.
- These records do not report member impact, accessibility effects, causal effects, or results from any pilot. Those questions remain outside this evidence result.

## Adapter return

- Adapter: `local-markdown`
- Canonical locator: `evaluations/evidence/research/cross-domain-direct-3.record.md`
- Result revision: SHA-256 of this record's exact file bytes, returned after creation (the hash is recorded in the run transcript and observation).
- Read-back: successful; the file was read after creation and matched the created canonical record.
- Persistence status: `durable=true`
