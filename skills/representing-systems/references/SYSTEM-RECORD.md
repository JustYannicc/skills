# System record standard

A system record is the canonical, versioned Hypertext Markup Language (HTML) representation of one durable system. The document remains readable without enhancement and may contain the code needed for its purpose.

## Scope and location

Use `.agents/systems/` for project records and `~/.agents/systems/` for global records. An explicit project instruction may replace either default.

Each registry contains:

```text
index.html
records/<system_id>/<version>.html
```

`index.html` links to the version used at that scope. Established versions are immutable. A change creates a new HTML file that links to its predecessor.

The index is the overview for its scope. Each record links back to that index. A system block may link to another exact record with `target="_blank"`; moving either file requires updating the affected links.

## HTML contract

The record root uses `data-system-record`, `data-id`, `data-version`, and `data-lifecycle`. It states the purpose, boundary, provenance, change, and material unknowns in semantic HTML. Mark those facts with `data-purpose`, `data-boundary`, `data-provenance`, `data-change`, and `data-material-unknowns`.

A component instantiates the [block grammar](BLOCKS.md). An embedded interface contract exposes the ports and observable reliance defined by `designing-interfaces`.

Encode an [interface contract](../../designing-interfaces/SKILL.md#interface-contract-elements) with these markers:

| Marker | Contract element |
| --- | --- |
| `data-interface-contract` | Contract root |
| `data-id` | Identity |
| `data-version` | Revision |
| `data-authority` | Authority |
| `data-purpose` | Purpose |
| `data-input` and `data-port` | Input |
| `data-output` and `data-port` | Output |
| `data-behavior` | Behavior |
| `data-failure` | Failure |
| `data-operating-envelope` | Operating envelope |
| `data-proof-seam` | Proof seam nested in its input or output |

A connection uses `data-connection`, `data-source`, and `data-target`. Name its ports when they matter. Add `data-guard` when flow is conditional.

The containing system and its components may have different lifecycle states. An adopted routine can contain a pilot component without making the rest of the routine a pilot.

The default lifecycle values are `proposed`, `candidate`, `pilot`, `adopted`, `retiring`, and `retired`. A project may add values when it preserves their reliance semantics.

HTML is the extension mechanism. Add semantic elements, `data-*` attributes, styles, scripts, or linked artifacts when the purpose requires them. Preserve the core attributes so another model or local tool can still inspect the record.

An HTML record can execute code. Open an untrusted record in a boundary appropriate to that risk.

## Control flow

A guard belongs on the connection it controls. Use the block grammar's control modes for branching, looping, waiting, and dependency joins. Compose them until the relevant behavior is traceable.

## Existing formats

Prefer an established format when it already answers the record's purpose. Embed or link it from the HTML record and identify its authority. Mermaid is the default graph projection because it already represents nodes, decisions, and labeled edges.

A projection may be written by hand or generated from the record's DOM. Keep one authority: derived code does not become a second system record.

Copy the [registry template](../templates/registry/index.html) and [record template](../templates/registry/records/system/1.html) to start a new scope.

Stop when the record answers its stated question, every material interface is inspectable, and additional detail would not change reliance or proof.
