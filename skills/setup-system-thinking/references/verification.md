# Installation verification

Bind every check to the exact installed suite revision, Installation scope, target harness, and effective configuration. Critical or Major findings block success.

## Deterministic checks

- Every selected package exists at the intended logical and resolved paths, has the recorded fingerprint and provenance, and is reachable by each selected target.
- The skills CLI list and lock state agree with the filesystem. No approved Matt overlap remains at a candidate name; every non-overlapping Matt package and every unrelated package is unchanged.
- Every overlay file matches its manifest hash, applied cleanly to the pinned upstream file, and produced the recorded installed fingerprint.
- In active mode, managed markers are unique, well formed, at the approved documented native instruction surfaces (`AGENTS.md` or equivalent), and discoverable through the actual instruction precedence chain. In install-only mode, instruction files are unchanged, the record says activation is inactive, and no standing loading-order guarantee is claimed. Model-invoked packages may still trigger from their descriptions.
- The project-over-global merge names the origin of every effective key. Adapter, provider, credential binding, and Supplemental mappings match the approved plan without storing secrets.
- The last-known-good state and targeted rollback steps are complete and readable.

## Fresh-context probes

Run the applicable probes in a new context for every selected harness. Probes 1–6 apply to active mode; install-only mode instead records observed implicit behavior without claiming activation and proves one explicit skill invocation. Probe 7 applies to either mode when `ask-yannic` is installed because it is always an explicit invocation.

1. **Ordinary bounded request:** `thinking-in-systems` loads before `workflow`; Workflow keeps the request Inline and reaches a verified result without durable ceremony.
2. **Durability boundary:** Workflow resolves the configured Adapter and persists the minimum required Outcome and continuation state.
3. **Existing unmapped scope:** work routes to `migrate-system` for current-state adoption rather than pretending the scope is already represented.
4. **Direct phase request:** a requested phase performs its bounded job while Workflow retains parent Outcome responsibility.
5. **Supplemental seam:** a configured Supplemental skill runs only at its declared extension point and returns evidence to the owning core skill.
6. **Missing optional capability:** behavior degrades visibly and preserves the completion standard.
7. **Route advice:** explicit `/ask-yannic` recommends the matching route without executing it or causing effects.

Use a harmless, disposable scenario. Do not create external issues, messages, repositories, credentials, or other live effects solely for a probe without separate authority. When the host cannot create a fresh context automatically, ask the user to open one, provide the exact harmless prompt, and record the observed loading order and result; a user-observed probe is valid evidence when the prompt, target, revision, and observation are recorded.

## Release-certification transaction checks

Before publishing an immutable suite release, exercise in disposable isolated homes and projects:

- project and global scope;
- multiple target harnesses;
- source-to-installed package inventory equality under the recorded fingerprint algorithm for every supported target and link/copy mode claimed by the release;
- no Git, Git without GitHub, and a GitHub-connected repository;
- matching package reuse, all expected Matt overlaps, an unrelated same-name conflict, missing provenance, and marker drift;
- apply failure with exact restoration;
- maintenance reinstall, status, repair, update, reconfigure, rollback, suite removal, and failed final self-removal;
- preservation of unrelated skills, instructions, Outcome records, and user data.

The real personal installation is a separate proof after the public immutable candidate passes disposable checks.

## Branch-specific proof

- **Install:** prove the complete roster, accepted active or install-only state, configuration, recovery data, and applicable fresh-context behavior from the selected scope.
- **Status:** prove the inspection made no filesystem, lock, instruction, configuration, provider, or external-state change; report drift against current and last-known-good records.
- **Repair:** prove every accepted fingerprint, overlay, managed instruction, configuration key, and recovery entry is restored and unrelated state is unchanged.
- **Update:** prove the candidate pins and overlays, preserve the prior last-known-good state, and advance the effective revision only after all applicable checks pass.
- **Reconfigure:** prove only the accepted targets, managed surfaces, Adapter, provider bindings, and Supplemental mappings changed; remove obsolete suite-owned state without touching unrelated state.
- **Rollback:** prove the complete last-known-good packages, instructions, configuration, and behavior are restored from the recorded checkpoint.
- **Remove:** while the disposable Setup package is still running, prove every runtime package path recorded as owned by this installation, managed block, suite-created binding, and the selected scope's effective `installation.md` are absent; prove the non-effective removal receipt is readable; prove unrelated skills, shared paths, providers, instructions, configuration-directory contents, Outcome records, and user data are unchanged; prove a fresh context has no suite activation. Removed runtime packages are not required to remain invokable. Step 7 separately proves Setup's absence and finalizes the receipt.

## Publication and personal activation proof

Execute these gates in order for a release:

1. Choose the candidate tag and skills CLI version. Bind every tagged Setup install, reinstall, and generated transaction command in `README.md` to that tag and to `suite.skillsCliVersion`; then bind all disposable release-certification evidence to the resulting candidate commit.
2. Publish that commit under the chosen immutable tag and GitHub release; never rewrite the tag.
3. Execute the exact published README command from the public tagged URL in a disposable isolated scope, run the complete accepted Setup transaction, and prove activation plus Setup self-removal.
4. In a separate disposable isolated scope, emit indexing telemetry with `npx skills@<manifest-cli-version> add JustYannicc/skills --skill setup-system-thinking`, then verify the repository and Setup package are discoverable on skills.sh at the published revision.
5. Only after gates 1–4 pass, treat a personal global installation as a separate transaction with its own preview, approval, checkpoint, activation proof, rollback, and Setup self-removal.
