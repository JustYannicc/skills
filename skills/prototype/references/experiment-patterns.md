# Experiment patterns

Choose one pattern after naming the question. These patterns preserve the
useful shape of Matt Pocock's pinned Prototype skill while removing its
assumption that every experiment is a code change. They are examples of setup
forms, not extra phases or permission to widen the question.

## Technical

- **Logic or state:** keep the decision-bearing reducer, state machine, or pure
  functions separate from a throwaway shell. Use in-memory state, a tiny
  interactive terminal view, one command, and a full state render after each
  meaningful action. The shell is evidence collection; it is not production
  code.
- **UI or interaction:** use an isolated local preview that mirrors the host
  route and data shape; do not alter the live route. Render three structurally
  different variants (maximum five) behind a shareable `?variant=` switcher,
  with a clearly prototype-only control that is gated out of production. Use
  stubs for mutations and record the variant, context, and observation that
  decides the question.
- **Data or API:** use a scratch adapter, fixture, or local simulator with
  production effects disabled. Keep the interface small enough to lift a
  validated decision later without promoting the throwaway shell.

## Personal

Use a voluntary, bounded non-production pilot for one person or a clearly
consented small scope. Keep commitments reversible, measure both the intended
Outcome and burden, and name a reset that restores the prior routine or
environment.

## Organizational

Use a simulation, role-play, or low-stakes non-production pilot with named
Actors and stop authority. Do not silently enact a policy, assign a new
obligation, or export burden to another team; observe incentives, friction, and
handoffs at the chosen seam.

## Physical

Use a safe bench setup, model, mock, or staged low-risk trial. Isolate live
equipment and people from material hazard, write explicit stop triggers, and
require the relevant safety authority before any effect outside the disposable
boundary. A physical action that cannot be safely reset is not a prototype.

## Communicative

Use a private draft, rehearsal, role-play, or red-team read-through. Observe
comprehension, ambiguity, emotional or accessibility burden, and likely
misinterpretation. Do not send, publish, or commit another person without an
authorized Workflow or caller effect gate.

## Agent

Use a sandbox prompt, fixture set, fake tool, or disposable context. Inspect the
trace and user-visible result at the seam; keep credentials, external tools,
and mutations unavailable unless the accepted setup explicitly bounds them.
Compare process and failure behavior, not just a pleasing output.

## Cross-domain choice

If a question crosses domains, keep one shared question and observation seam,
then compose the smallest setup that touches each named boundary. For example,
a communicative rehearsal of an agent-assisted personal routine can use a
private script, a fake agent tool, and a burden check; it must still have one
reset, one stop authority, one evidence record, and one disposition.

## Retained upstream shape

The upstream MIT Prototype at revision `2ab958093e83e0ec752e6c1c5932da465bf23e0c`
uses question-first branch selection, throwaway-by-default setup, no
persistence by default, visible state, a one-command or one-route handoff, and
capture of the verdict. This successor retains those behaviors where they fit
and makes the universal reversible/effect boundary explicit. The canonical
license, URL, revision, and attribution remain in `validation/sources.yaml` and
the skill's `provenance.yaml`.
