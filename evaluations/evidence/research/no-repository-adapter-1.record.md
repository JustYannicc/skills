---
schemaVersion: 1
recordType: research-result
recordId: research-no-repository-adapter-1
title: Maximum daily exposure duration at 92 dBA
fixtureId: research-no-repository-adapter
attempt: 1
sourceRevision: git:d6536d81e10ca550b7483aa4a21d319c7cbf7688
createdAt: 2026-08-04T18:20:00Z
updatedAt: 2026-08-04T18:20:00Z
adapter: local-markdown
locator: evaluations/evidence/research/no-repository-adapter-1.record.md
resultRevisionAlgorithm: sha256(file-bytes)
readBackVerified: true
durable: true
repository: absent
---

# Research result

## Bounded question

What is the maximum daily exposure duration at 92 dBA for the community
workshop, using only the supplied primary record? This record reports the
bounded evidence and its limits. It does not make a workshop schedule,
compliance, health, or safety decision.

## Supplied primary evidence

- **Record locator:** `osha-29-cfr-1910.95-table-g16@2026-07-01`
- **Observed table value:** The supplied record's 92 dBA row states a maximum
  daily exposure duration of **6 hours**.
- **Source boundary:** This row is the available primary record for this run.
  No secondary commentary or unprovided source was substituted.

## Inference and uncertainty

The statement that a community workshop should use **6 hours** as its maximum
daily exposure duration at 92 dBA is an inference from the supplied row, not a
new observed measurement or a site-specific determination. The record does not
provide the workshop's actual exposure pattern, measurement method, occupancy,
controls, jurisdictional applicability, or whether a person's exposure is
continuous. Those conditions remain unresolved; this result does not claim
that the table value alone determines an operational or legal decision.

## Adapter persistence

- **Adapter identity:** `local-markdown`
- **Durable locator:** `evaluations/evidence/research/no-repository-adapter-1.record.md`
- **Result revision:** SHA-256 of the exact bytes of this record, computed after
  create and successful read-back. The concrete digest is returned in the
  evaluation transcript and observation; embedding it here would change the
  bytes being hashed.
- **Read-back:** successful.
- **Durable:** `true`.
- **Repository/remote:** absent; no repository was created or initialized.
- **Effects:** none; no workshop, policy, configuration, or external state was
  changed.
- **Return route:** requesting context; no Workflow context is active.
