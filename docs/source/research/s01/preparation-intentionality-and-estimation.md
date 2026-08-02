# the standard research: preparation, intentionality, estimation, and review

Status: evidence note for the standard. It does not authorize implementation or live changes.

## User-authored definitions and cases

### Intentional productivity

For this system, **productivity is intentionality, not paid work, output volume, or visible busyness**. An activity is productive when the user consciously chooses it as an accepted use of time or energy. Intentionally watching one of the top 50 movies can therefore be productive. Accidentally watching one while procrastinating may still advance an accepted outcome, but it is **incidental progress**, not productivity under this definition.

This is a normative system definition supplied by the user. Self-Determination Theory supports treating autonomy and volition as meaningful qualities of action, but it does not establish this particular definition of productivity. Research also warns against treating leisure as inherently wasteful: that framing can reduce enjoyment. The governing rule therefore avoids equating productivity with work or maximizing output.

### Axe sharpening and mise en place

Preparation can make execution dramatically easier, but preparation can also become indefinite motion. The “four hours sharpening, one hour chopping” image is a principle, not a fixed ratio. The cooking practice of **mise en place** supplies the useful operational form: assemble the needed inputs, tools, context, permissions, environment, proof seam, fallback, and resumption state before starting.

Preparation needs a stopping rule. Continue preparing while a required readiness condition is missing or the next information/preparation action has greater expected decision or risk-reduction value than execution. Start the smallest credible execution or experiment when readiness passes and further preparation is less informative than action. This follows value-of-information reasoning; it does not require false numerical precision.

James March's exploration/exploitation model supplies another guardrail: systems need both search/learning and use of what is already known. Over-investment in either can be self-defeating. A predeclared readiness threshold, uncertainty budget, and evidence-producing vertical slice keep preparation useful without making it an escape from execution.

### Custom-build reflex and option value

The user is an engineer whose default response to discomfort or imperfect tools is often to build a fix. That creates a predictable failure mode: a custom project begins before the problem, adequacy threshold, opportunity cost, maintenance burden, and option value of waiting have been evaluated. The abandoned attempt to replace OpenClaw is the canonical example: waiting and rechecking the market would have preserved the option to adopt a substantially improved existing tool.

the standard should therefore require, for material custom work: define the outcome; compare doing nothing, waiting until a named review trigger, environmental/process change, configuration, maintained existing solutions, and custom work; identify the cheapest evidence that could reverse the decision; and state why custom work clears the satisficing threshold after opportunity and maintenance cost.

## Estimation and production evidence

The recovered `Stress Escalation Patterns` conversation separates three independent axes:

1. **Scope:** supported actors, cases, devices, environments, states, and workflows.
2. **Construction:** disposable/temporary implementation versus a maintainable system others can depend on.
3. **Evidence:** what has actually been demonstrated through the real operating path.

The terminal updater had narrow scope, temporary construction, and strong production evidence. The return app expanded operational responsibility, retained temporary construction, and lacked production evidence. Its server acquired workflow responsibility, including bidirectional communication, state, recovery, permissions, and operational dependency. The one-day estimate was therefore a system failure based on an inside-view analogy and hidden assumptions. The realistic magnitude was at least one to two weeks.

Required estimation rules:

- use an **assumption-delta sheet** across operator, cadence, environment, permissions, communication, state, recovery, consequence, fallback, ownership, lifetime, and variability;
- label maturity as `Idea`, `Spike`, `Pilot`, or `Production`, while binding every maturity claim to its support matrix, demonstrated real-path evidence, freshness, and remaining gaps;
- distinguish a milestone that is a `Budget`, `Question`, `Checkpoint`, or `Deliverable`;
- when architecture or production assumptions are unresolved, estimate a bounded experiment, not delivery;
- use reference-class forecasting where prior examples exist, recording initial estimate, apparent-completion time, and actually-usable time;
- never let development/debug proof imply production proof;
- good scope reduction preserves critical evidence; bad corner-cutting preserves the promise while removing architecture, recovery, or falsifying tests.

Project capture is an operational failure state. Delayed food, water, or sleep; displacement of required work or an explicitly higher priority; repeated checking; and a continually moving completion claim require stopping execution, meeting the basic need, and resetting expectations or commitments. Enthusiasm may authorize an experiment; only evidence authorizes a commitment.

## Adversarial review

Every durable system and material change should receive one independent adversarial review followed by one resolution check before Design Complete. The review tests credible failure modes within the declared support matrix: assumptions, incentives and proxy gaming, authority, interfaces, low-capacity operation, degraded/recovery behavior, human misuse, missing capabilities, measurement, evidence, legacy, and retirement. Impossible or disproportionate scenarios may be explicitly excluded or accepted as risk; review is not an invitation to invent absurd cases forever.

This matches systems-engineering peer-review practice and the local working rule of one independent pass plus one resolution check. New evidence can reopen targeted review; stylistic disagreement cannot.

## Named concepts used

- **Goodhart's law / Campbell's law:** a measure becomes unreliable when optimized as the target.
- **Satisficing / bounded rationality:** choose an option that clears an explicit adequacy threshold when more search is not worth its cost.
- **Opportunity cost:** show the best feasible alternative displaced by the choice.
- **Sunk-cost fallacy:** past investment does not determine whether future cost is justified.
- **Planning fallacy / inside view:** a detailed current plan can hide the evidence from comparable past work.
- **Reference-class forecasting / outside view:** anchor estimates in comparable actual outcomes.
- **Value of information:** gather more information only while its expected decision improvement justifies its cost.
- **Option value / real options:** delaying an irreversible commitment can be valuable when waiting is cheap and uncertainty may resolve.
- **Exploration versus exploitation:** balance learning/search with using known workable paths.
- **Premortem / prospective hindsight:** imagine a credible future failure to reveal assumptions before commitment.

## Sources

- [March, “Exploration and Exploitation in Organizational Learning”](https://pubsonline.informs.org/doi/abs/10.1287/orsc.2.1.71)
- [Buehler, Griffin, and Ross, planning fallacy](https://doi.org/10.1037/0022-3514.67.3.366)
- [Kahneman and Lovallo, inside and outside views](https://doi.org/10.1287/mnsc.39.1.17)
- [NIST, Value of Information and Decision Pathways](https://www.nist.gov/publications/value-information-and-decision-pathways-concepts-and-case-studies)
- [USGS, introduction to prediction and value of information](https://www.usgs.gov/publications/introduction-prediction-and-value-information)
- [Mitchell, Russo, and Pennington, prospective hindsight](https://doi.org/10.1002/bdm.3960020103)
- [NASA Systems Engineering Handbook](https://www.nasa.gov/wp-content/uploads/2018/09/nasa_systems_engineering_handbook_0.pdf)
- [Ryan and Deci, Self-Determination Theory](https://www.selfdeterminationtheory.org/SDT/documents/2000_RyanDeci_SDT.pdf)
- [Tonietto et al., viewing leisure as wasteful](https://doi.org/10.1016/j.jesp.2021.104198)
- [Institute of Culinary Education, mise en place](https://www.ice.edu/blog/lesson-1-mise-en-place)
