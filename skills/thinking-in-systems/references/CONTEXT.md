# Thinking in Systems

Shared language for thinking in systems.

## Language

**System**:
A set of components whose relationships and interactions produce the behavior of the whole. Systems differ in scale and substance, not in kind.

**System of interest**:
The system selected as the primary subject of the current question. Its boundary is chosen for that purpose rather than assumed to be permanent.

**System context**:
The surrounding whole that can materially affect or be affected by the system of interest.

**Containing system (parent system)**:
A larger system whose boundary contains the system of interest and whose conditions or behavior can affect it.

**Subsystem (child system)**:
A system contained within another system and treated as a component at the containing system's level of abstraction.

**Peer system (sibling system)**:
A system at the same relevant level of abstraction that shares a containing system with the system of interest. Peerhood alone creates no dependency, interface, ownership, or authority.

**Upstream system**:
A system that supplies a dependency of the system of interest.

**Dependent system**:
A system that relies on the system of interest.

**Dependency**:
A relationship in which one component requires something supplied by another.

**Component**:
A distinguishable part of a system that is relevant to its structure or behavior. A component can be active or passive.

**Material**:
Capable of changing a decision or the truth of a system claim.

**Actor**:
A component that can initiate or choose actions within a system.

**Authority**:
Permission for an actor to make a decision or perform an effect within a defined boundary.

**Responsibility**:
An actor's duty to carry a bounded result through completion within its authority.

**Ownership**:
Continuing responsibility for the behavior and outcomes of the system as a whole. Delegation does not transfer ownership unless a successor explicitly accepts it.

**Relationship**:
A persistent connection through which components influence one another.

**Interaction**:
An occurrence in which components affect one another through a relationship.

**Flow**:
Movement through a relationship that can change system state or behavior.

**Coupling**:
The degree to which a change in one component can propagate to another through their relationship.

**Boundary**:
The separation between a system and its environment. It determines which components and relationships belong to the system.

**Interface**:
The part of a boundary that exposes observable interaction while hiding internals.

**Port**:
A named point on an interface where flow enters or leaves a component.

**Interface contract**:
The observable agreement that lets each side of an interface act without knowing the other's internals.

**Reliance**:
Behavior another component may assume from an accepted contract without inspecting its implementation.

**Proof seam**:
An interface where the behavior relevant to a claim becomes observable. Evidence at the proof seam can establish the contract without depending on hidden implementation details.

**Environment**:
Everything outside the system boundary that can affect the system or be affected by it.

**Operating condition**:
A condition under which system behavior or an interface contract may change.

**Operating envelope**:
The range of operating conditions within which a system or interface contract may be relied on.

**Failure mode**:
A way a system or interface contract can cease to produce its required behavior.

**Input**:
Something received by a system or component that can affect its state, behavior, or output.

**Output**:
Something produced or emitted by a system or component as a result of its state, processing, or interactions.

**State**:
The current condition of a system or component, represented by the values of the properties that matter for its behavior.

**Behavior**:
What a system or component does in response to its state, inputs, and interactions.

**Emergent behavior**:
Behavior of the system as a whole that arises from interactions among its components and is not the behavior of any single component. Emergent behavior may be predictable.

**Structure**:
The arrangement that determines how a system can behave.

**Rule**:
A condition that governs system behavior.

**Deterministic mechanism**:
A component that enforces a rule without relying on judgment or memory.

**Constraint**:
A limitation that narrows the feasible set.

**Governing standard**:
A versioned rule set used to judge a system or result.

**Feasible set**:
The alternatives available within the current constraints and authority.

**Preference**:
An actor's evidence-backed ordering of feasible alternatives under stated conditions.

**Informed exception**:
An authorized departure from a standard after its consequence and recovery condition are visible.

**Trigger**:
A condition that initiates behavior.

**Guard**:
A condition that permits flow through a connection.

**Action**:
A discrete act that can change system state.

**Decision point**:
A point in a process where an actor must choose an action before the process can continue, adding friction and another opportunity for behavior to diverge from the actor's goal or intent. For a person, even an obvious choice consumes attention.

**Friction**:
A condition that increases the cost of an action or transition. Friction can impede the intended path or protect it by making a competing path harder.

**Goal**:
A desired state or result that an actor or goal-directed system is trying to achieve.

**Intent**:
The directed commitment or disposition of an actor to act toward a goal.

**Outcome**:
The result produced by a system's behavior.

**System representation**:
A view of a system that makes some aspect of it understandable. A representation can describe or guide a system, but it is not the system itself.

**Durable system**:
A system that must remain knowable and operable across interactions.

**System record**:
The canonical, versioned representation of a durable system.

**System registry**:
An index that makes system records discoverable within a scope.

**Projection**:
A derived view of a system record that does not become a second authority.

**Lifecycle state**:
The declared degree of reliance permitted for a system version.

**Candidate**:
An implemented system version that is not yet accepted for live reliance.

**Simulation**:
Exercise of a system version without its real-world effects.

**Pilot**:
Bounded live use that gathers validation evidence without granting general reliance.

**Promotion**:
An evidence-based transition to a lifecycle state with broader reliance.

**Rollout**:
The controlled expansion of a system version across its intended scope.

**Adoption**:
Routine reliance on a system by its intended actors under target operating conditions.

**Decision frame**:
The form in which an actor evaluates a decision while the underlying alternatives and outcomes remain fixed.

**Framing effect**:
A change in judgment caused by changing the decision frame rather than the underlying decision.

**Fog of war**:
Material uncertainty that cannot yet be resolved.

**Symptom**:
An observable sign or effect that indicates an underlying condition or problem in a system without necessarily being the underlying cause.

**Root cause**:
An underlying condition that produces or permits a symptom. Changing it prevents the same problem from recurring. A symptom can have multiple root causes.

**Incentive structure**:
The structure that makes some behaviors more attractive than others. A good incentive structure aligns actor and system outcomes.

**Feedback loop**:
A cycle in which the consequences of a system's behavior feed back into the system and influence subsequent behavior. A reinforcing feedback loop amplifies its effect. A balancing feedback loop counteracts its effect.

**Intervention**:
A deliberate change made to a system to influence its behavior or outcomes.

**Satisficing**:
Accepting an alternative that clears an explicit good-enough threshold after a bounded search.

**Pareto principle**:
The hypothesis that a small share of causes or interventions may account for most relevant value.

**Pareto improvement**:
A change that benefits at least one affected actor without materially harming another.

**Opportunity cost**:
The value of the best feasible alternative forgone by choosing an intervention.

**Sunk cost**:
A cost already incurred that cannot be changed by the current decision.

**Option value**:
The value preserved by keeping a future choice available.

**Marginal analysis**:
Comparing the marginal benefit of the next increment with its marginal cost.

**Cost structure**:
How total and marginal costs behave as scale, repetition, and time change.

**Transaction cost**:
The cost of coordinating an interaction across an interface.

**Substitution effect**:
A change in behavior caused when an intervention changes the relative cost, friction, access, or attractiveness of available alternatives.

**Externality**:
An effect imposed outside the decision boundary and not fully represented in the decision that caused it.

**Effect chain**:
The propagation of an intervention through behavior, feedback, and system context.

**Disposition**:
The declared next state of an intervention or affected system.

**Mise en place**:
Proportional readiness for the next action, paired with a stopping rule.

**Strategy**:
A rule for choosing actions as conditions and information change.

**Plan**:
A proposed sequence under current assumptions.

**Assurance cadence**:
The rhythm of verification, validation, and sustainment checks across a system's lifecycle.

**Verification**:
Evidence that a system follows its interface contracts.

**Validation**:
Evidence that a system produces its intended outcome.

**Sustainment**:
Evidence that a system remains useful under its operating conditions.

**Intervention point**:
A place in a system where a change can be introduced to influence its state, behavior, structure, or outcomes.

**Leverage point**:
A part of a system where intervention has unusually high influence over the behavior or outcomes of the whole. Every leverage point is an intervention point, but not every intervention point is a leverage point.
