# the standard — NASA / systems-engineering source findings

All links below are first-party NASA sources. **Claim** records what the
source directly supports; **Inference** is an application to a governed
personal system and is not a NASA requirement.

## Scope, stakeholders, boundaries, and lifecycle

- **Claim:** NASA defines systems engineering as a multidisciplinary approach
  across design, realization, technical management, operations, and
  retirement. It assigns the systems engineer a role in ConOps, architecture,
  system boundaries, requirements, interfaces, technical risk, and V&V.
  [NASA Systems Engineering Handbook — Fundamentals](https://www.nasa.gov/reference/2-0-fundamentals-of-systems-engineering/)
- **Claim:** Stakeholder expectations form the foundation for later systems
  engineering work; their constraints can include cost, delivery time,
  life-cycle support, operational constraints, training, and organizational
  needs. NASA’s example stakeholder set evolves by lifecycle phase.
  [NASA Systems Engineering Handbook (PDF), pp. 55–57](https://www.nasa.gov/wp-content/uploads/2018/09/nasa_systems_engineering_handbook_0.pdf)
- **Claim:** NASA’s illustrated project lifecycle covers concept studies,
  concept/technology development, preliminary design, final design/fabrication,
  assembly/integration/test, operations/sustainment, and closeout.
  [NASA Systems Engineering Handbook (PDF), p. 27](https://www.nasa.gov/wp-content/uploads/2018/09/nasa_systems_engineering_handbook_0.pdf)
- **Inference:** An OpenClaw system specification should explicitly name its
  purpose, boundary, stakeholders, operating constraints, phases, and
  retirement/closeout—not only its current tools and prompts.

## Interfaces and architecture

- **Claim:** NASA requires interface management to document internal and
  external interfaces, record origin/destination/stimulus/special
  characteristics, retain traceability, validate ICDs with both interface
  parties, and control/communicate approved interface changes.
  [NPR 7123.1B, interface management requirements](https://nodis3.gsfc.nasa.gov/displayAll.cfm?Internal_ID=N_PR_7123_001B_&page_name=ALL)
- **Claim:** Product integration engineers interactions between subsystems and
  their environments, checks for proper integrated behavior and adverse
  emergent behavior, and begins at concept definition rather than only during
  final assembly.
  [NASA Product Integration](https://www.nasa.gov/reference/5-2-product-integration/)
- **Inference:** Treat each external connection (e.g., the task system, the knowledge system,
  messaging) as a controlled interface with explicit allowed operations,
  owner, data direction, failure behavior, and change approval.

## Verification, validation, hazards, and recovery

- **Claim:** Verification proves compliance with requirements; validation
  shows the product achieves its intended purpose in its intended environment
  and meets customer/stakeholder expectations. Validation relates to ConOps and
  may use realistic or simulated conditions.
  [NASA Systems Engineering Handbook — distinctions between V&V](https://www.nasa.gov/reference/2-0-fundamentals-of-systems-engineering/)
- **Claim:** Early ConOps must cover significant operational situations,
  including malfunctions and degraded modes. NASA also defines recovery as
  restoring functions needed to achieve existing or redefined goals after a
  fault/failure.
  [NASA Systems Engineering Handbook — Fundamentals](https://www.nasa.gov/reference/2-0-fundamentals-of-systems-engineering/)
  [NASA Systems Engineering Handbook — Appendix](https://www.nasa.gov/reference/system-engineering-handbook-appendix/)
- **Claim:** NASA fault-management guidance identifies FMEA and fault
  detection, isolation, and recovery as architecture concerns and calls for
  analysis of nominal-control interactions, concurrent faults/responses, and
  diagnostic support.
  [NASA Software Architecture Description — Fault Management](https://swehb.nasa.gov/spaces/7150/pages/16450571/7.07%2B-%2BSoftware%2BArchitecture%2BDescription)
- **Inference:** Test “the system follows the stated rule” separately from
  “the intended person can safely accomplish their real workflow.” Define
  fault/degraded paths (lost connection, bad input, stale context, duplicate
  action) and a recovery state that does not falsely claim completion.

## Configuration, change, migration, and retirement

- **Claim:** Configuration management provides visibility and control across a
  product’s life cycle; NASA describes five elements: planning/management,
  identification, change management, status accounting, and configuration
  verification. Baselines establish known configurations to which changes are
  addressed.
  [NASA Configuration Management](https://www.nasa.gov/reference/6-5-configuration-management/)
- **Claim:** Product transition occurs throughout the lifecycle, bridges a
  system level to the next level/end user, and includes preapproved installation,
  acceptance/functional testing, documentation, training, capture of anomalies
  and corrective actions, and supporting/legacy operational products.
  [NASA Product Transition](https://www.nasa.gov/reference/5-5-product-transition/)
- **Claim:** NASA says de-integration/disposal must be engineered from concept
  definition; closeout includes safe disposal or repurposing and captures and
  archives system data for future analysis.
  [NASA Product Integration](https://www.nasa.gov/reference/5-2-product-integration/)
- **Inference:** Connection migrations should have a baseline, explicit
  approval, compatibility and rollback/degraded path, acceptance evidence, and
  a retention/disposal decision for credentials, data, documentation, and the
  retired integration.

## Supplementary INCOSE/SEBoK sources

- **Claim:** SEBoK’s ISO-backed lifecycle guidance describes a lifecycle from
  conception through retirement, with stages including development, production,
  utilization, and support. Its stakeholder guidance includes users, operators,
  maintainers, regulators, integrators, and retirement/disposal parties.
  [SEBoK — Life Cycle Stages](https://sebokwiki.org/wiki/Life_Cycle_Stages)
  [SEBoK — Stakeholder Needs and Requirements](https://sebokwiki.org/wiki/Stakeholder_Needs_and_Requirements)
- **Claim:** SEBoK describes configuration management as lifecycle-wide;
  baselines are approved snapshots and changes generally proceed through a
  formal change procedure. It also says replacement/retirement can require
  phased transition and parallel operation to protect user functionality.
  [SEBoK — Configuration Management](https://sebokwiki.org/wiki/Configuration_Management)
  [SEBoK — Disposal and Retirement](https://sebokwiki.org/wiki/Disposal_and_Retirement)
- **Claim:** SEBoK defines resilience, drawing on INCOSE work, as delivering
  required capability in adversity, with means including avoidance,
  withstanding, and recovery.
  [SEBoK — System Resilience](https://sebokwiki.org/wiki/System_Resilience)
