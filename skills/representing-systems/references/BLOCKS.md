# Block grammar

A block is a component shown as a node. Its kind describes how flow meets the component; its internals remain outside the representation.

The grammar instantiates the [shared systems language](../../thinking-in-systems/references/CONTEXT.md):

| Record element | System term |
| --- | --- |
| Record | System of interest |
| Block | Component |
| Port | Port |
| Connection | Relationship carrying flow |
| Control | Rule |
| System link | System context |

| Kind | Flow rule |
| --- | --- |
| `trigger` | Starts flow when its named condition occurs. |
| `component` | Receives inputs and produces outputs. |
| `control` | Routes or synchronizes flow without hiding the rule. |
| `system` | Crosses into another system record through a versioned link. |
| `outcome` | Terminates the represented path at an observable result. |

Use `data-control` to state a control block's rule:

| Control | Contract |
| --- | --- |
| `decision` | Each outgoing port has a guard; one may use `otherwise`. |
| `loop` | A guarded output repeats through an explicit back-edge; another exits. |
| `wait` | Flow resumes when a named dependency or condition resolves. |
| `merge` | Multiple inputs synchronize under a stated policy such as `all` or `any`. |

Add a new kind only when none of these flow rules can express the behavior. A domain label changes what a block means, not how the grammar works.

## HTML markers

A block uses `data-component`, `data-id`, `data-label`, `data-kind`, and `data-lifecycle`. A control block also uses `data-control`. A system block contains an exact `data-system-link` to the target record and opens it in a new tab.

A connection binds `data-source-port` to `data-target-port`. Put `data-guard` on the connection that it controls. Mark a loop's back-edge with `data-loop`.

Ports are named points on the interface. Each material input or output contains its proof seam so the representation shows what can be observed at that boundary.

This grammar represents behavior. It does not execute it.
