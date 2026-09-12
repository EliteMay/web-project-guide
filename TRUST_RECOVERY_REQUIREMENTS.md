# Trusted Recovery Capsule Requirements

> Status: **Ready for implementation / not yet implemented**
>
> This document is the current subsystem requirements contract for the Phase 1 Trusted Recovery Capsule used by `EliteMay/web-project-guide` and `EliteMay/web-project-data`. It does not by itself mean the generator, validator, export workflow, recovery drill, or normative completion gate already exist.
>
> Common behavioral rules remain owned by the existing `docs/` Owner Docs. This file defines the product / subsystem contract that a later implementation must satisfy without duplicating those rules.

## 1. Purpose

The Trusted Recovery Capsule provides an independently retained **known-good trust baseline** for the Guide / Data system when normal GitHub-hosted state is suspected to be compromised, rewritten, rolled back, deleted, or otherwise untrustworthy.

The Capsule exists to answer:

- Which exact repositories were trusted?
- Which exact commits were trusted?
- Which trust epoch and Capsule sequence were current?
- Which trust-critical policy / validation / persistence files were known-good?
- What previous Capsule did this Capsule continue from?
- What procedure should be followed before any current GitHub state is trusted again?

The Capsule is **recovery evidence**, not a second live Source of Truth and not a replacement for normal GitHub operation.

## 2. Current topology / design basis

Current topology:

- One actual human owner / operator.
- `EliteMay/web-project-guide` is public.
- `EliteMay/web-project-data` is private.
- GitHub is the normal operating plane.
- No current requirement exists for multi-party consensus or mandatory external witness availability.

Phase 1 therefore uses:

```text
Normal GitHub operation
        |
        v
Trust-affecting milestone
        |
        v
Generate Trusted Recovery Capsule
        |
        v
Verify generated package
        |
        v
Export to independent out-of-band location
        |
        v
Read back / verify destination
```

A passive witness or detached offline signature can be added later without changing the base Capsule object.

## 3. Goals

Phase 1 MUST:

1. Record a small, explicit, machine-readable known-good trust state.
2. Bind the state to immutable GitHub repository IDs and exact commits.
3. Detect accidental or malicious modification of Capsule package files with SHA-256.
4. Maintain monotonic continuity between successive Capsules.
5. Remain usable when GitHub is unavailable or under suspicion.
6. Avoid requiring a live quorum, witness service, or extra network dependency for normal development.
7. Avoid storing credentials, tokens, private keys, unrestricted conversation contents, or other secrets in the Capsule.
8. Provide a recovery procedure that can be followed without executing code from a currently suspicious repository.
9. Support an actual Recovery Drill, not only generation of files.
10. Preserve an upgrade path to optional passive witnessing or detached offline signatures later.

## 4. Non-goals

Phase 1 does NOT claim to:

- recover a lost GitHub account by repository code alone;
- prevent the current live owner credential from making a malicious write before compromise is detected;
- provide real-time fork detection;
- provide multi-party authorization;
- defend against simultaneous compromise of GitHub and every independent offline copy;
- defend against physical theft / tampering of every offline medium;
- replace repository backup, account recovery, credential rotation, or provider recovery procedures;
- make every normal commit require a Capsule;
- introduce a full TUF-style metadata hierarchy or distributed consensus system.

## 5. Threat model

### In scope

The Capsule is designed to help recover from or investigate:

- GitHub account compromise;
- repository control compromise;
- force-push / history rewrite;
- branch / tag rollback;
- malicious or accidental policy rollback;
- replacement of validators / routers / persistence logic before a false `success` result is produced;
- repository deletion or loss where a companion backup artifact exists;
- uncertainty about which pre-compromise revision was last trusted.

### Out of scope for Phase 1

- physical compromise of all out-of-band storage;
- malware with persistent control of every machine and offline medium used for recovery;
- independent-authority Byzantine consensus;
- compromise before the first trusted Capsule is created;
- proving that post-Capsule changes are malicious solely because they are newer.

Any state after the Capsule's trusted checkpoint is **suspect pending review**, not automatically malicious.

## 6. Trust model

### 6.1 Primary anchor

The primary trust anchor for each repository is:

- immutable GitHub repository ID;
- exact trusted commit SHA;
- exact Git tree SHA where available.

The repository commit is the primary whole-repository binding. Individual file hashes are defense-in-depth for trust-critical files and must not become a second complete repository manifest.

### 6.2 Out-of-band trust

A Capsule is not considered operationally ready merely because it exists in a GitHub repository or normal working tree.

At least one trusted copy MUST be stored in a location that:

- does not depend on the same GitHub repository for discovery or retrieval;
- is not the normal mutable working directory;
- remains retrievable when GitHub is unavailable or under suspicion.

Recommended Phase 1 baseline:

- removable storage that is disconnected when not being updated.

A second copy in a different failure domain SHOULD be kept when practical.

A cloud copy MAY be used as a secondary copy, but a copy controlled by the same GitHub account or same normal working tree is not sufficient as the sole out-of-band anchor.

## 7. Capsule artifact set

The minimum export package MUST contain:

```text
trust-recovery-capsule.json
manifest.sha256
RECOVERY.md
```

Optional companion artifacts MAY include:

```text
web-project-guide.bundle
web-project-data.bundle.enc
```

Companion Git bundles are backup artifacts, not part of the logical trust record. Capsule validity MUST NOT depend on a bundle being present.

## 8. `trust-recovery-capsule.json` schema requirements

The schema MUST be versioned.

Required top-level fields:

- `schemaVersion`
- `capsuleId`
- `trustEpoch`
- `sequence`
- `createdAt`
- `trigger`
- `previousCapsuleSha256`
- `repositories`
- `trustCriticalFiles`
- `generator`
- `verification`
- `recovery`

### 8.1 `schemaVersion`

- Positive integer.
- Increment only for incompatible Capsule format changes.
- Validator MUST reject unsupported future schema versions instead of silently guessing.

### 8.2 `capsuleId`

- Must be unique for a logical Capsule.
- Recommended format: `trc-e<epoch>-s<sequence>-<digest-prefix>`.
- ID is metadata; SHA-256 verification remains the integrity mechanism.

### 8.3 `trustEpoch`

- Positive integer.
- Starts at `1` for the first accepted Capsule.
- Does NOT increase for every Capsule.
- Increases only when trust authority is deliberately reset after compromise / recovery, or another explicitly defined trust-root transition occurs.
- A new epoch MUST record which previously accepted Capsule it recovered from or superseded.

### 8.4 `sequence`

- Positive integer within an epoch.
- Must increase monotonically for newly accepted Capsules in the same epoch.
- Duplicate sequence is valid only when the Capsule bytes / digest are identical.
- Lower sequence within the same epoch MUST be treated as rollback evidence.

### 8.5 `createdAt`

- ISO 8601 timestamp with offset or UTC `Z`.
- Represents the capture time of the trusted state.
- MUST NOT be used alone as an ordering authority; epoch / sequence and digests are authoritative for continuity.

### 8.6 `trigger`

Must identify why the Capsule was created.

Initial allowed categories:

- `initial-baseline`
- `guide-release`
- `trust-policy-change`
- `validator-or-router-change`
- `persistence-or-recovery-change`
- `authority-or-credential-rotation`
- `pre-risky-maintenance`
- `post-recovery`
- `manual`

The implementation MAY extend the list through schema-compatible values, but must not generate a Capsule for every trivial edit by default.

### 8.7 `previousCapsuleSha256`

- `null` only for the first accepted Capsule.
- Otherwise SHA-256 of the exact bytes of the immediately previous accepted `trust-recovery-capsule.json`.
- Used to establish continuity independent of current GitHub history.
- A missing / mismatching previous digest MUST fail continuity validation.

### 8.8 `repositories`

Must contain entries for at least:

- `EliteMay/web-project-guide`
- `EliteMay/web-project-data`

Each repository entry MUST contain:

- immutable `repositoryId`;
- `fullName` at capture time;
- `visibility` at capture time;
- `defaultBranch`;
- `capturedRef`;
- exact `trustedCommit` SHA;
- exact `treeSha` where available;
- validation evidence for the trusted commit;
- capture status indicating that the repository identity matched the expected repository.

Repository name alone MUST NOT be sufficient identity because repositories can be renamed or recreated.

### 8.9 `trustCriticalFiles`

Each entry MUST contain:

- repository ID or unambiguous repository reference;
- repository-relative path;
- SHA-256 of exact file bytes;
- Git blob SHA when available;
- file size where practical.

The list must be explicit and version-controlled by the implementation configuration.

Minimum categories to cover:

#### Guide

- Current project requirements / trust recovery requirements;
- rule router / trust-affecting routing configuration;
- Guide validation workflow;
- primary Guide validator;
- release-integrity validator;
- Security / Maintenance / Rule Routing / Conversation Recovery owner documents that define trust / recovery behavior.

#### Data

- Data validation workflow;
- Conversation Persistence entrypoint;
- Checkpoint derivation / validation logic;
- Persistence receipt regression test;
- Trusted Recovery Capsule generator / validator once implemented;
- any machine-readable trust-recovery configuration used to select critical paths.

The trusted commit still binds the entire repository. The critical-file list exists to make verifier / policy replacement obvious during recovery.

### 8.10 `generator`

Must record enough information to identify the implementation that produced the Capsule:

- owner repository ID;
- source repository / full name;
- source commit;
- generator path;
- SHA-256 of generator bytes;
- generator format / tool version if one exists.

Recovery MUST NOT require executing the generator from a currently suspicious repository.

### 8.11 `verification`

Must include:

- hash algorithm: `sha256`;
- manifest filename;
- whether all required repository validations were successful at capture time;
- validation run identifiers / commit binding where available;
- whether destination read-back verification was completed.

A Capsule whose required capture-time validation failed or was unknown MUST NOT be labelled trusted-ready.

### 8.12 `recovery`

Must include:

- `trustedThrough` description / timestamp;
- platform boundary statement;
- optional compromise / revocation cutoff if one already exists;
- previous accepted Capsule / recovery lineage when applicable;
- explicit statement that newer state is `unreviewed / suspect`, not automatically malicious.

## 9. Determinism / hashing

The generator MUST produce stable field ordering and stable formatting for the same explicit inputs.

Integrity is defined over exact file bytes.

Requirements:

- UTF-8;
- LF line endings;
- final newline;
- stable key order / array order determined by the generator;
- SHA-256 for package integrity;
- `previousCapsuleSha256` hashes the exact previous Capsule file bytes.

The project does not need to introduce a separate canonical-JSON standard or dependency if stable byte serialization is sufficient and covered by tests.

## 10. Manifest requirements

`manifest.sha256` MUST contain SHA-256 digests for all files that are part of the exported Capsule package except the manifest itself.

At minimum:

- `trust-recovery-capsule.json`
- `RECOVERY.md`

If companion bundle artifacts are included, their hashes MUST also be present in the manifest.

A changed / missing / additional required file MUST cause verification failure.

## 11. Hard expiry is prohibited in Phase 1

Phase 1 Capsule MUST NOT become invalid solely because a date has passed.

Reason:

- an old independently trusted baseline can still be the safest recovery starting point;
- hard expiration can create self-lockout exactly when the live trust plane is unavailable;
- freshness and authenticity are different properties.

The implementation MAY emit a **staleness warning** based on project-specific policy, but stale must not mean cryptographically / structurally invalid.

## 12. Capture preconditions

The generator MUST refuse to label a Capsule `trusted-ready` unless all required preconditions are satisfied.

Required preconditions:

1. Expected Guide repository ID matches current repository identity.
2. Expected Data repository ID matches current repository identity.
3. Captured commit exists for each repository.
4. Captured commit is the intended current trusted baseline.
5. Required validation for each captured state has succeeded and is bound to the captured commit.
6. Trust-critical file paths exist and are hashed successfully.
7. Previous Capsule continuity is valid unless this is the first Capsule or an explicit new trust epoch.
8. No active compromise / incident state is unresolved.
9. Secret scanning / field allowlist confirms the Capsule contains no prohibited secret material.

If a precondition fails, the tool MUST fail closed for Capsule trust status. It may still emit diagnostic output, but it must not label the result trusted-ready.

## 13. Generation triggers

A new Capsule SHOULD be created for meaningful trust-state transitions, including:

- first Phase 1 deployment;
- formal Guide release;
- trust / recovery policy change;
- major router / validator change affecting trust semantics;
- Conversation Persistence / checkpoint / receipt change affecting recovery semantics;
- authority / credential rotation that changes trust assumptions;
- pre-risky maintenance when an independently pinned baseline is useful;
- completion of post-compromise recovery.

A new Capsule SHOULD NOT be required for:

- typo-only edits;
- normal content additions unrelated to trust semantics;
- ordinary small project work that does not change the Guide/Data trust baseline.

Trigger classification should be explicit and testable rather than based only on elapsed time.

## 14. Export / storage workflow

The generator MUST distinguish at least these states:

- `generated`
- `verified-locally`
- `exported`
- `destination-verified`

`generated` alone is not equivalent to out-of-band protection.

### 14.1 Destination requirements

The primary destination MUST:

- be outside the GitHub repository;
- be outside the normal working tree;
- be retrievable without GitHub;
- support read-back verification.

Recommended baseline is removable storage kept disconnected when not in use.

### 14.2 Destination verification

After export, the workflow MUST re-read the files from the destination and verify the manifest there.

A copy operation returning success is not sufficient evidence.

### 14.3 Location privacy

Exact physical location, drive letter, password, encryption key, or other sensitive storage metadata MUST NOT be committed to the public Guide.

A local-only or private operator note MAY record where the medium is stored.

## 15. Companion repository backup

The Capsule and repository backup are separate concepts.

Phase 1 implementation SHOULD support self-contained Git bundles as companion artifacts because Git supports offline full-repository transfer / backup.

Requirements:

- Full bundle should contain the trusted commit and enough history to restore into an empty repository.
- Bundle creation must not change Capsule trust semantics.
- Bundle digest must be added to `manifest.sha256` when included.
- `git bundle verify` and/or clone-from-bundle must be part of the Recovery Drill.
- Public Guide bundle may be stored without additional repository-content confidentiality protection.
- Private Data bundle MUST be protected at rest when placed on removable / external storage; storage-level or archive-level encryption is acceptable.
- If a secure private-Data bundle destination is not available, the Capsule may still be valid, but full Data repository availability recovery remains explicitly unverified.

## 16. Secret / sensitive-data boundary

The Capsule JSON MUST NOT contain:

- access tokens;
- refresh tokens;
- cookies;
- passwords;
- private keys;
- secret environment values;
- Authorization headers;
- raw unrestricted tool payloads;
- raw conversation history;
- sensitive user content that is not needed for trust recovery.

Allowed examples:

- repository numeric IDs;
- repository names;
- commit / tree / blob SHAs;
- SHA-256 digests;
- public workflow run IDs;
- schema / tool versions;
- non-secret recovery instructions.

The implementation SHOULD use an allowlist-oriented schema rather than serializing arbitrary repository metadata objects.

## 17. Recovery procedure requirements

`RECOVERY.md` MUST be sufficient to perform first-stage recovery without trusting code from the current suspicious repositories.

Minimum procedure:

1. Stop trust-affecting writes and stop creating new trusted Capsules.
2. Retrieve the latest accepted out-of-band Capsule.
3. Verify `manifest.sha256` using a standard trusted local hashing tool.
4. Read the Capsule and identify repository IDs, trusted commits, epoch, sequence, and previous digest.
5. Treat live GitHub state after the trusted checkpoint as unreviewed / suspect.
6. If companion bundles exist, restore / clone them into a clean temporary location.
7. Confirm the trusted commits and tree IDs exist in the restored state.
8. Recompute SHA-256 for trust-critical files and compare against the Capsule.
9. Recover GitHub account / repository access separately if needed.
10. Review post-checkpoint changes before salvaging them into the recovered repository.
11. Rotate compromised credentials / authorities as required.
12. Re-run trusted validation from a recovered known-good source.
13. Reconcile any external side effects that Git restore cannot undo.
14. Establish a new trust epoch after compromise recovery.
15. Generate and export a new Capsule for the recovered epoch.

The procedure MUST NOT instruct the operator to run an unverified validator from the suspicious current branch before the trusted baseline is re-established.

## 18. Trust epoch transition / post-compromise recovery

After a confirmed compromise recovery:

- increment `trustEpoch`;
- reset `sequence` to `1`;
- retain the SHA-256 of the last accepted pre-recovery Capsule as recovery lineage;
- record the compromise / revocation cutoff if known;
- record newly trusted repository commits;
- record rotated trust-critical credentials / authority state only as non-secret identifiers / fingerprints if needed;
- export and verify the new Capsule before the recovery is declared trust-baseline complete.

A compromised live repository must not be allowed to force the offline operator into an arbitrarily high sequence / version deadlock. New-epoch recovery is the explicit trusted reset mechanism.

## 19. Recovery Drill requirements

Phase 1 is not complete until a Recovery Drill proves the Capsule can be found, interpreted, and used.

### 19.1 Required drill timing

A drill MUST occur:

- after initial Phase 1 implementation;
- after incompatible Capsule schema changes;
- after material recovery-procedure changes.

Periodic drills SHOULD be performed later, but Phase 1 must not introduce one universal hard day-count as a Common Guide rule.

### 19.2 Drill procedure

The drill MUST be non-destructive and use a temporary location.

Minimum checks:

1. Retrieve Capsule without relying on the normal GitHub working tree.
2. Verify manifest from the exported destination.
3. Parse required Capsule fields.
4. Verify repository identities / trusted commits.
5. Verify trust-critical file hashes.
6. If bundles exist, verify and clone / restore them into temporary directories.
7. Confirm the restored repository contains the Capsule's trusted commit.
8. Confirm no production branch, release, provider, or external state was modified.
9. Record pass / fail and any recovery ambiguity.

A generated Capsule without a successful drill MUST NOT be described as fully proven recovery readiness.

## 20. Validation / regression tests

Implementation MUST include automated tests for at least:

- deterministic serialization for identical explicit inputs;
- manifest success;
- modified Capsule file detection;
- modified `RECOVERY.md` detection;
- missing package file detection;
- previous Capsule digest mismatch;
- same-epoch sequence rollback;
- valid same-epoch sequence advance;
- explicit new-epoch reset;
- repository ID mismatch;
- trusted commit mismatch / missing commit;
- trust-critical file digest mismatch;
- unsupported future schema;
- missing required field;
- required CI / validation not successful;
- stale-but-valid Capsule remains structurally valid while warning;
- prohibited secret-like field rejection;
- destination read-back mismatch;
- companion bundle hash mismatch when bundle support is used.

The implementation SHOULD include an end-to-end temporary-directory drill test for the public Guide bundle path where practical.

## 21. Failure behavior

Capsule tooling MUST prefer explicit failure over silently weakening trust.

Examples:

- GitHub unavailable during capture → do not create a new trusted-ready Capsule from guessed state.
- Validation unavailable / unknown → fail trusted-ready status.
- Critical file missing → fail.
- Previous Capsule unavailable → do not invent continuity.
- Export destination unavailable → retain local generated output but report `not exported`.
- Destination re-read mismatch → fail destination verification.
- Old Capsule → warning, not automatic invalidation.
- Bundle unavailable → report backup availability gap without invalidating the metadata Capsule.

## 22. Implementation ownership / repository boundary

### `EliteMay/web-project-guide`

Owns:

- this subsystem requirements contract;
- future Common Rule integration into existing Owners;
- routing / completion semantics once Phase 1 is actually implemented;
- public explanation that does not expose private recovery data.

### `EliteMay/web-project-data`

Preferred owner for:

- generator / validator implementation;
- Capsule JSON schema;
- trust-critical path configuration;
- automated tests;
- private recovery / drill evidence;
- companion bundle helper logic if implemented.

Data remains an operational companion repository, not the Current Common Rule Source of Truth.

### Out-of-band storage

Owns the actual exported trusted copy. It is not a GitHub repository requirement and its physical details are not published.

## 23. Phase 1 signature decision

Detached offline signatures are **not required in Phase 1**.

Phase 1 authenticity relies on:

- independently retained out-of-band copy;
- physical / operator custody of that copy;
- exact SHA-256 package integrity;
- repository identity + commit binding;
- Capsule continuity chain.

This specifically protects the current primary threat model: normal GitHub trust-plane compromise while the independent recovery medium remains trusted.

A later phase MAY add:

- detached offline signature;
- offline public-key fingerprint retained in a second independent channel;
- passive external witness of Capsule digest.

Adding one later must not invalidate existing unsigned Phase 1 Capsules solely because they lack the later mechanism.

## 24. Passive witness boundary

A future passive witness may store only compact non-secret checkpoint data such as:

- Capsule SHA-256;
- epoch;
- sequence;
- repository IDs;
- trusted commits;
- previous Capsule digest.

Phase 1 MUST NOT require witness liveness for ordinary commits, releases, or Capsule validity.

## 25. Completion contract for implementation

Phase 1 implementation is `Ready / complete` only when all applicable items below are true:

- Capsule schema exists and is validated.
- Generator exists.
- Validator exists.
- Trust-critical path configuration exists.
- Required automated regression tests pass.
- Capture preconditions are enforced.
- Capsule package manifest is generated and verified.
- Recovery instructions are generated / maintained.
- At least one real Capsule is created from trusted Guide/Data state.
- At least one out-of-band export is performed.
- Destination read-back verification succeeds.
- Initial non-destructive Recovery Drill succeeds.
- Relevant Guide Owners / Router / Completion flow are updated only after implementation actually exists.
- Guide and Data CI pass on final merged state.
- Unverified account / physical-storage assumptions are explicitly reported rather than claimed complete.

## 26. Implementation handoff

- Status: **Ready for implementation**
- Blocking Decisions: **None for software implementation**
- External operator action needed for full operational completion: **choose / provide an independent export destination and perform the first real out-of-band export**
- Important assumption: the Phase 1 threat model trusts at least one independently retained offline copy against a GitHub-only compromise.
- Next implementation target: generator + schema + validator + tests in `EliteMay/web-project-data`, followed by minimal Guide Owner / Router integration after the tool is proven.
