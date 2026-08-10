# Suite installation and Matt corrections

The Setup package contains the correction files it needs.

## Runtime names

Local runtime:

`thinking-in-systems`, `workflow`, `migrate-system`, `domain-modeling`, `wayfinder`, `prototype`, `to-spec`, `to-tickets`, `implement`, `review`, `handoff`, `ask-yannic`

Matt runtime:

`grill-with-docs`, `grilling`, `research`, `to-questionnaire`

Managed Matt overlaps replaced by local successors:

`domain-modeling`, `handoff`, `implement`, `prototype`, `to-spec`, `to-tickets`, `wayfinder`

Managed Matt overlaps reinstalled and corrected:

`grill-with-docs`, `grilling`, `research`, `to-questionnaire`

Preserve every other Matt skill.

## Commands

Remove only approved overlaps currently installed from `mattpocock/skills`:

```bash
npx skills remove --skill <exact overlap names> --yes
```

Install missing or replaced local runtime:

```bash
npx skills add JustYannicc/skills --skill thinking-in-systems workflow migrate-system domain-modeling wayfinder prototype to-spec to-tickets implement review handoff ask-yannic
```

Install missing or replaced Matt runtime:

```bash
npx skills add mattpocock/skills --skill grill-with-docs grilling research to-questionnaire
```

Add `--global` only for global scope. Reuse the target selection that installed Setup. Omit names that already match the accepted installed package.

## Bundled corrections

The patch files live under `corrections/` inside Setup:

- `grill-with-docs`: make it model-invoked with Wayfinder-owned routing inside Workflow and direct use only when standalone; integrate the full multi-round `grilling` and `domain-modeling` contracts through the selected Adapter; and return a Wayfinder-owned interview to Wayfinder before Workflow resumes.
- `grilling`: inspect facts directly; delegation is optional rather than mandatory.
- `research`: work across domains, use primary evidence, support Inline or Durable results, and return to Workflow when active.
- `to-questionnaire`: make it model-invoked.

For each newly installed or replaced package root:

1. dry-run its bundled patches with `patch --dry-run -p4 -d <installed-package-root> < <patch-file>`;
2. apply them with `patch -p4 -d <installed-package-root> < <patch-file>`;
3. reread the changed files and verify the behavior above.

Apply the two patches for `grill-with-docs`, one for `grilling`, one for `research`, and two for `to-questionnaire`. If a dry-run fails, restore the checkpoint and report that Matt's current package no longer matches the bundled correction. Do not improvise a silent rewrite.

For a reused package, verify the corrected behavior above without applying the patches again. If it is uncorrected, return to the preview and replace it only after approval.
