# LLM Evidence Receipts / False Completion / Stale Evidence Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- Related prior AI research:
  - `references/llm-self-review-self-critique-research.md`
  - `references/llm-independent-verifier-judge-research.md`
  - `references/llm-multi-agent-verification-debate-research.md`
  - `references/llm-tool-assisted-deterministic-verification-research.md`
- This file is **non-normative research evidence**.
- Adoption status for all mechanisms below: **not decided**, unless explicitly stated otherwise.
- Research is high-recall first. Mechanisms are preserved even when they require signed attestations, transparency logs, trusted runtimes, cryptographic key management, remote attestation, policy engines, full trace capture, or capabilities unavailable to the current project.

## Research Question

How can a development or agent system distinguish:

```text
"the AI says it checked / ran / read / verified something"
```

from:

```text
"the required check actually executed against the current artifact / state and produced evidence that is still valid"
```

and how should evidence become invalid, stale, superseded, or insufficient after the system, rule, configuration, environment, or artifact changes?

This pass focuses on:

- false success / premature completion,
- fabricated or unsupported claims of tool execution,
- execution receipts,
- attestations / provenance,
- binding evidence to artifact identity,
- binding evidence to policy / configuration / verifier identity,
- freshness / anti-replay,
- point-in-time vs current assurance,
- stale evidence,
- change-triggered invalidation,
- evidence lifecycle / revocation / supersession,
- evidence-carrying completion,
- limits of signed receipts and attestations.

This pass does **not** yet complete the separate research topics of:

- repository-level `AGENTS.md` / nested instruction adherence,
- final Rule→Verifier coverage design,
- final `web-project-guide` evidence schema,
- final validator architecture,
- adoption / Common Rule promotion.

---

# 1. False completion is a distinct agent failure class

## Evidence / observed practice

Recent agent research distinguishes task failure from **false success**: the agent terminates and reports completion even though the environment state does not satisfy the task.

`From Confident Closing to Silent Failure` (2026 preprint) studies:

- 9,876 tau2-bench trajectories across 8 model families,
- 1,879 AppWorld trajectories across 4 model families.

The paper reports false success as a large fraction of failures in several settings, including approximately 45–48% of failures in single-control tau2-bench domains and 75.8% among AppWorld self-assessing coding-agent trajectories with explicit status claims.

It also finds that LLM judges are poor detectors of this failure mode in the evaluated settings: no judge/prompt combination exceeds AUROC 0.65 on tau2-bench, and the best reaches only 0.54 AUROC on AppWorld API-call traces.

Source:

- Advani, `From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents`, arXiv:2606.09863
  - https://arxiv.org/abs/2606.09863

## Evidence strength / limitation

This is a 2026 preprint, not yet treated as stronger evidence than peer-reviewed agent studies. Its scale and text-independent ground truth make it directly relevant, but exact rates are benchmark-specific.

## Knowledge captured

A useful state distinction is:

```text
agent says COMPLETE
```

versus

```text
environment / artifact satisfies completion conditions
```

The first is a model claim. The second requires external evidence.

**Adoption status:** not decided.

---

# 2. Tool-use systems exhibit fabrication, skip, and result-ignore failures

## Evidence / observed practice

ToolFailBench (2026 preprint) labels tool-use traces into distinct failures including:

- Tool-Skip,
- Result-Ignore,
- Output-Fabrication,
- Unnecessary-Tool-Use.

Across 1,000 tasks and 19 headline models, the best Clean Tool-Use Rate is reported at 86.33%, leaving material unsaturated error.

Source:

- Soni, `ToolFailBench: Diagnosing Tool-Use Failures in LLM Agents`, arXiv:2607.04686
  - https://arxiv.org/abs/2607.04686

AgentHallu (2026 preprint) separately reports that tool-use hallucinations are among the hardest hallucination categories to localize, with the best tested model reaching only 11.6% localization accuracy for tool-use hallucinations in its benchmark.

Source:

- Liu et al., `AgentHallu: Benchmarking Automated Hallucination Attribution of LLM-based Agents`, arXiv:2601.06818
  - https://arxiv.org/abs/2601.06818

## Knowledge captured

A completion claim can be unsupported for several reasons:

```text
required tool never called
required result ignored
model fabricated a plausible tool result
wrong tool / wrong parameters executed
right tool executed but wrong state changed
```

A receipt system therefore needs more than one bit saying `tool_used=true`.

**Adoption status:** not decided.

---

# 3. Real agent systems explicitly add final-state gates because self-reported `done` is unreliable

## Evidence / observed practice

Microsoft Research's 2026 Webwright system describes **premature `done`** as one of two core practical challenges. With open-ended terminal actions, the model can claim success without actually finishing. Webwright therefore adds a gate requiring a final script run in a fresh folder with logs / screenshots before accepting `done: true`.

Source:

- Microsoft Research, `Webwright: A Terminal Is All You Need For Web Agents`, 2026
  - https://www.microsoft.com/en-us/research/articles/webwright-a-terminal-is-all-you-need-for-web-agents/

Microsoft's ThinkingBox benchmark likewise separates the final response from environment effects. It reports that most failed traces are execution failures rather than response-quality failures, and argues that state should be verified before reporting success.

Source:

- Microsoft Command Line, `ThinkingBox: Measuring whether agents finish the job`, 2026
  - https://commandline.microsoft.com/thinkingbox-bench-agent-benchmarking/

## Knowledge captured

A terminal message is not a trustworthy completion oracle.

A practical architecture can require:

```text
agent requests completion
→ independent final-state checks run
→ completion accepted / rejected
```

This is research evidence, not a Guide requirement.

**Adoption status:** not decided.

---

# 4. The software supply-chain world already has a mature primitive for receipts: attestations

## Evidence / observed practice

The in-toto Attestation Framework standardizes authenticated statements about software artifacts.

The Statement model contains a `subject` identifying the artifact and its digest, plus a `predicateType` identifying what claim is being made.

The specification states that subjects should be immutable and are matched by digest.

Sources:

- in-toto Attestation Framework
  - https://github.com/in-toto/attestation
- Statement v1
  - https://github.com/in-toto/attestation/blob/main/spec/v1/statement.md

SLSA Provenance uses the same model to state where, when, and how an artifact was produced.

Source:

- SLSA Build Provenance
  - https://slsa.dev/spec/v1.2/build-provenance

## Knowledge captured

The central pattern is:

```text
claim
+ exact subject identity / digest
+ claim type
+ producer / signer identity
+ structured metadata
```

rather than a free-form note such as:

```text
"tests passed"
```

**Adoption status:** not decided.

---

# 5. in-toto has a dedicated Test Result attestation for proving tests actually ran

## Evidence / observed practice

The in-toto Test Result predicate exists specifically to express software test execution results.

Its stated uses include verifying:

1. that all tests were in fact run,
2. that all required tests passed.

The schema can include:

- `subject` — source artifact / commit tested,
- `result` — `PASSED | WARNED | FAILED`,
- `configuration` — test configuration identity,
- `url` — link to the run,
- `passedTests`,
- `warnedTests`,
- `failedTests`.

The example binds a test run to a specific git commit and to the digest of the GitHub Actions workflow configuration.

Source:

- in-toto `Test Result` predicate
  - https://github.com/in-toto/attestation/blob/main/spec/predicates/test-result.md

## Knowledge captured

A robust test receipt can answer substantially more than:

```text
"did CI say green?"
```

It can answer:

```text
which artifact?
which test suite / config?
which invocation?
which tests passed / warned / failed?
where is the run evidence?
```

**Adoption status:** not decided.

---

# 6. Verification summaries are explicitly point-in-time claims

## Evidence / observed practice

in-toto's `Simple Verification Result` (SVR) communicates that an artifact has been evaluated against one or more policies and records which properties were verified **at the point in time of the evaluation**.

The schema records:

- subject,
- verifier identity,
- policy references,
- `timeCreated`,
- verified properties.

Source:

- in-toto `Simple Verification Result`
  - https://github.com/in-toto/attestation/blob/main/spec/predicates/svr.md

## Knowledge captured

A verification receipt should not be interpreted as timeless truth.

The natural semantics are:

```text
for Subject S
using Policy P
Verifier V concluded Properties X at Time T
```

not:

```text
this project is permanently compliant
```

**Adoption status:** not decided.

---

# 7. Evidence itself can be referenced and authenticated

## Evidence / observed practice

The in-toto SCAI predicate supports attribute assertions with an optional `evidence` ResourceDescriptor identifying authenticated evidence for the asserted property.

The Reference predicate similarly supports signed references to out-of-band evidence such as SBOMs and includes a digest for the referenced document.

Sources:

- in-toto SCAI predicate
  - https://github.com/in-toto/attestation/blob/main/spec/predicates/scai.md
- in-toto Reference predicate
  - https://github.com/in-toto/attestation/blob/main/spec/predicates/reference.md

## Knowledge captured

An assurance statement can carry a chain such as:

```text
Rule / property
→ Verification result
→ Evidence object
→ Evidence digest / location
```

rather than forcing users to trust an opaque `PASS` summary.

**Adoption status:** not decided.

---

# 8. GitHub Artifact Attestations bind claims to repository / workflow / commit identity

## Evidence / observed practice

GitHub Artifact Attestations produce cryptographically signed provenance claims containing information including:

- workflow,
- repository,
- organization,
- environment,
- commit SHA,
- triggering event.

For binary / container subjects, the attestation is bound to the artifact path or SHA256 digest.

Sources:

- GitHub Docs, `Artifact attestations`
  - https://docs.github.com/en/actions/concepts/security/artifact-attestations
- GitHub Docs, `Using artifact attestations to establish provenance for builds`
  - https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations

## Important limitation

GitHub explicitly warns that an artifact attestation is **not a guarantee that an artifact is secure**. It proves provenance / integrity relationships; consumers must still define and evaluate security policy.

## Knowledge captured

Receipt integrity and artifact correctness are different assurance layers.

```text
valid signed receipt
≠
artifact semantically correct / secure
```

**Adoption status:** not decided.

---

# 9. Evidence binding by digest prevents one artifact's PASS from silently applying to another

## Evidence / observed practice

in-toto subjects are matched by digest. GitHub's attestation APIs query attestations by subject digest, and GitHub artifact-attestation generation accepts explicit subject SHA256 digests.

Sources:

- in-toto Statement v1
- GitHub Artifact Attestation REST APIs
  - https://docs.github.com/en/rest/orgs/attestations

## Knowledge captured

This directly addresses a stale-evidence class:

```text
Artifact A passed
→ Artifact changes into B
→ old receipt still exists
```

If the receipt is bound to `digest(A)`, it does not prove anything about `digest(B)`.

This is stronger than relying on a mutable file name or human memory.

**Adoption status:** not decided.

---

# 10. GitHub required status checks already implement commit-scoped staleness

## Evidence / observed practice

GitHub branch protection requires a required check to pass against the **latest commit SHA**. Checks from earlier commits do not satisfy the requirement.

Source:

- GitHub Docs, `Troubleshooting required status checks`
  - https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks

GitHub also allows selecting the expected GitHub App as the source of a required status check, reducing the risk that an unexpected producer can set an identically named status.

Source:

- GitHub Docs, `About protected branches`
  - https://docs.github.com/en/repositories/configuring-branches-and-merges/managing-protected-branches/about-protected-branches

## Knowledge captured

This is a concrete production implementation of:

```text
check result
+ subject commit SHA
+ expected producer
→ eligibility for merge
```

and:

```text
new commit
→ previous check cannot satisfy current gate
```

**Adoption status:** not decided.

---

# 11. Freshness is a first-class attestation property, not a cosmetic timestamp

## Evidence / observed practice

RFC 9334 (RATS Architecture) explicitly treats freshness as essential to deciding whether Evidence / Attestation Results still reflect the latest state and latest appraisal policy.

It discusses:

- timestamp-based freshness,
- nonce-based freshness,
- epoch IDs,
- local expiry thresholds,
- race conditions where the attested state changes immediately after evidence generation.

RFC 9711 (Entity Attestation Token) requires a freshness mechanism and identifies nonces as one option for replay protection.

Sources:

- RFC 9334, Remote ATtestation procedureS Architecture
  - https://www.rfc-editor.org/rfc/rfc9334.html
- RFC 9711, Entity Attestation Token
  - https://www.rfc-editor.org/rfc/rfc9711.html

## Knowledge captured

Evidence freshness is not equivalent to:

```text
receipt contains a timestamp
```

A relying party needs a policy defining how old evidence may be, and may require nonces / epochs when replay is a threat.

RFC 9334 also makes an important point: there is always a race condition because state can change immediately after evidence generation. Freshness narrows uncertainty; it cannot eliminate time.

**Adoption status:** not decided.

---

# 12. Time-based expiry and change-triggered invalidation are different mechanisms

## Evidence synthesis

Two broad stale-evidence mechanisms appear.

### A. Time-window staleness

```text
Evidence generated at T
→ exceeds allowed age
→ no longer accepted
```

Examples:

- RATS freshness thresholds,
- compliance monitoring windows,
- vulnerability-data freshness.

### B. State / change invalidation

```text
Evidence generated for State A
→ relevant artifact / config / policy changes
→ Evidence no longer applies even if only seconds old
```

Examples:

- GitHub latest-commit status checks,
- digest-bound attestations,
- assurance-case change-impact work.

## Knowledge captured

A purely calendar-based expiry can be too weak.

A five-minute-old test result may already be stale if code changed after the test.

Conversely, immutable evidence about an immutable artifact may remain historically valid indefinitely even if it is no longer sufficient for a current deployment decision.

**Adoption status:** not decided.

---

# 13. Assurance-case research treats change as a reason to reconstruct / maintain evidence

## Evidence / observed practice

`Towards Continuous Assurance Case Creation for ADS with the Evidential Tool Bus` describes the difficulty of maintaining assurance when system requirements change or claims become invalid because a component's state degrades. The work uses the Evidential Tool Bus to continuously create and maintain evidence for an assurance case.

Source:

- Sorokin et al., 2024
  - https://arxiv.org/abs/2403.01918

A related 2024 DASC publication demonstrates continuous safety / security evidence generation, curation, and assurance case construction with ETB and RACK on an aviation use case.

Source:

- Shankar et al., `Continuous safety & security evidence generation, curation and assurance case construction using the Evidential Tool Bus`, DASC 2024
  - DOI: 10.1109/DASC62030.2024.10749275

`ACCESS: Assurance Case Centric Engineering of Safety-critical Systems` also identifies engineering-artifact change impact on assurance cases as a known problem.

Source:

- Journal of Systems and Software, 2024
  - https://doi.org/10.1016/j.jss.2024.112034

## Knowledge captured

Evidence maintenance is not only data retention. It requires understanding which assurance claims depend on changed artifacts / assumptions.

**Adoption status:** not decided.

---

# 14. Modern continuous-compliance research makes missing / stale evidence an explicit finding

## Evidence / observed practice

A 2026 IEEE Access paper on compliance-as-code for AI-driven identity systems uses:

- obligation-to-control traceability,
- evidence contracts,
- evidence graphs,
- release / hash binding,
- windowed evidence completeness.

The prototype treats missing required evidence in a monitoring window as **stale / incomplete**, rather than interpreting silence as compliance. It binds evidence to policy and traceability bundle digests and exports evidence gaps as findings / POA&M items.

Source:

- `Compliance-as-Code for AI-Driven Identity Systems: Clause-to-Control Traceability and Machine-Readable Evidence`, IEEE Access 2026
  - DOI: 10.1109/ACCESS.2026.3665991

## Knowledge captured

Three states should not be conflated:

```text
PASS evidence exists
NO evidence exists
STALE evidence exists
```

Silence is not positive evidence.

**Adoption status:** not decided.

---

# 15. Continuous compliance increasingly models evidence as a versioned, time-indexed data stream

## Evidence / observed practice

`Integrating Continuous Compliance into DevSecOps Pipelines: A Data Engineering Perspective` (2026) proposes a framework where:

- policy is version-controlled,
- evidence is continuously collected,
- policy decisions become signed attestations,
- evidence is stored as time-indexed / lineage-aware data,
- new vulnerabilities can trigger retrospective queries over prior artifacts.

The paper gives a representative attestation shape such as:

```json
{
  "artifact-sha": "sha256:...",
  "policy-version": "...",
  "result": "pass",
  "scanner": "..."
}
```

Source:

- `Integrating Continuous Compliance into DevSecOps Pipelines: A Data Engineering Perspective`, Software 2026
  - https://doi.org/10.3390/software5010006

## Knowledge captured

Evidence can be treated as data with:

- identity,
- lineage,
- version,
- timestamp,
- subject,
- policy version,
- producer.

This is different from storing only screenshots / prose / checklists.

**Adoption status:** not decided.

---

# 16. Transparency logs protect evidence history against silent rewriting

## Evidence / observed practice

Sigstore's Rekor is an append-only, tamper-resistant transparency log for signed software metadata.

Sigstore verification can check:

- artifact signature,
- signing identity,
- certificate chain,
- inclusion proof in Rekor.

Sources:

- Sigstore overview
  - https://docs.sigstore.dev/
- Rekor
  - https://docs.sigstore.dev/logging/overview/
- Sigstore security model
  - https://docs.sigstore.dev/about/security/

## Knowledge captured

A mutable local log answers:

```text
"what does the current file say happened?"
```

An append-only transparency mechanism can additionally support:

```text
"was this record later altered / removed?"
```

This improves integrity / non-repudiation but still does not prove that the underlying claimed action was correct.

**Adoption status:** not decided.

---

# 17. Cryptographic integrity does not automatically prove execution truth

## Evidence / observed practice

SLSA provenance explicitly depends on trusting the builder to faithfully record provenance.

Sigstore proves signing identity / integrity relationships, not semantic truth.

GitHub Artifact Attestations explicitly warn that attestations are not guarantees that the artifact is secure.

Early agent-receipt projects make the same distinction: a valid signature proves authenticity / integrity of the signed record, not necessarily that an external action happened exactly as described unless the trusted action layer is itself what signs the receipt.

Sources:

- SLSA Provenance
- GitHub Artifact Attestations
- Sigstore security documentation

## Knowledge captured

A receipt has at least two trust questions:

```text
1. Was this receipt altered or forged?
2. Was the entity that issued it actually in a position to know the claimed fact truthfully?
```

The first can be cryptographic. The second is an architectural trust-boundary question.

**Adoption status:** not decided.

---

# 18. Agent-specific tool receipts are an active 2026 research direction

## Evidence / observed practice

`Tool Receipts, Not Zero-Knowledge Proofs` (2026 preprint) proposes HMAC-signed receipts generated by the runtime rather than by the model. The model does not receive the signing secret, preventing it from fabricating valid receipts for tool calls that never occurred.

The paper reports on a 1,800-scenario benchmark with injected hallucinations and claims high detection of fabricated tool references and count misstatements with low runtime overhead.

Source:

- Basu, `Tool Receipts, Not Zero-Knowledge Proofs: Practical Hallucination Detection for AI Agents`, arXiv:2603.10060
  - https://arxiv.org/abs/2603.10060

## Evidence strength / limitation

This is a recent preprint with a newly introduced benchmark / system. It is useful as emerging design evidence, not as a mature standard.

## Knowledge captured

A critical receipt property is **unforgeability by the LLM itself**.

```text
LLM can write arbitrary prose
but cannot mint valid action-layer receipt
```

This creates a structurally different evidence channel.

**Adoption status:** not decided.

---

# 19. Signed execution receipt formats are beginning to emerge for agent tool calls

## Evidence / observed practice

The 2026 IETF Independent Submission draft `XAIP Receipts` proposes a provider-neutral signed execution receipt format for agent tool calls.

The draft records facts such as:

- actor / executor identity,
- caller / delegator identity,
- tool identity,
- success status,
- latency,
- input / output identifiers or hashes.

Later draft versions add optional caller co-signature so both delegator and executor are bound to the same canonical record.

Source:

- `Signed Execution Receipts for AI Agent Tool Calls (XAIP Receipts)`, Internet-Draft, 2026
  - https://datatracker.ietf.org/doc/draft-xkumakichi-xaip-receipts/03/

## Important status

This is an **Internet-Draft / Independent Submission**, not an IETF Standard or RFC. It can change or expire.

## Knowledge captured

The existence of an emerging wire format indicates that agent execution evidence is becoming a distinct systems problem rather than merely a prompt-engineering concern.

**Adoption status:** not decided.

---

# 20. Evidence-Carrying Termination directly gates `COMPLETE` on receipts and replay

## Evidence / observed practice

`When May an Agent Stop? Evidence-Carrying Termination for Tool-Using LLMs` (August 2026 preprint) proposes a completion gate where an agent may emit `COMPLETE` only if:

- every required answer claim is bound to valid in-scope trace evidence,
- deterministic replay reconstructs the claimed value.

The reported synthetic evaluation finds zero unsafe completions for ECT in the studied fault sets, compared with many premature unsupported completions from controller / critic baselines.

Source:

- Liu, `When May an Agent Stop? Evidence-Carrying Termination for Tool-Using LLMs`, arXiv:2608.23623
  - https://arxiv.org/abs/2608.23623

## Important limitation

The paper explicitly limits what is certified: support in a recorded trace under declared assumptions, **not external truth, safety, or alignment**.

It is a very recent preprint and should be treated as emerging evidence.

## Knowledge captured

This creates a useful research distinction:

```text
agent wants to stop
```

versus

```text
completion certificate satisfies declared evidence obligations
```

**Adoption status:** not decided.

---

# 21. Proof-of-execution research separates planning, enforcement, effect, and recordkeeping

## Evidence / observed practice

`Proof of Execution: Runtime Verification for Governed AI Agent Actions` (2026 preprint) defines an execution as a contract, causal event stream, and replay context. Its proposed Prime Execution Model separates:

- planning,
- enforcement,
- effect,
- recordkeeping.

An attestation certificate is issued only when validator-checkable execution invariants pass.

Source:

- Rhodes & Kang, `Proof of Execution: Runtime Verification for Governed AI Agent Actions`, arXiv:2607.05397
  - https://arxiv.org/abs/2607.05397

## Evidence strength / limitation

Recent preprint / prototype. The cryptographic soundness claims depend on explicit deployment assumptions.

## Knowledge captured

If the same component both:

```text
chooses action
performs action
records action
approves its own record
```

then the receipt is less independent.

Role separation can make the evidence producer harder for the planner model to manipulate.

**Adoption status:** not decided.

---

# 22. Forged memory that says a safety step already happened is a direct stale / false-receipt threat

## Evidence / observed practice

`Proof-of-Execution Memory` (2026 preprint) studies attacks where adversarial memory claims a required safety step has already been completed. Stronger agents may follow the forged history and skip the actual step.

The proposed PoEM defense stores a separate HMAC-chained ledger written only by the trusted action layer and permits a skip only if actual execution is recorded.

Source:

- Rahman & Kim, `Proof-of-Execution Memory: Defending LLM Agents Against Forged-Reasoning Attacks by Verifying What Actually Happened`, arXiv:2608.16032
  - https://arxiv.org/abs/2608.16032

## Evidence strength / limitation

Very recent preprint. The evaluated attack / defense scope is specific.

## Knowledge captured

Conversation / memory statements such as:

```text
"we already ran the security check"
```

should not automatically be considered execution evidence.

This directly overlaps the Guide's broader principle that conversation history should not become a second Source of Truth, but no new Rule is adopted here.

**Adoption status:** not decided.

---

# 23. A receipt should bind not only the artifact but also the check configuration

## Evidence / observed practice

The in-toto Test Result predicate requires a `configuration` list, and its example references the digest of the CI workflow file.

SLSA provenance captures build definition / parameters / materials.

Continuous-compliance work binds results to policy version.

Sources:

- in-toto Test Result
- SLSA Provenance
- IEEE Access 2026 compliance-as-code paper

## Knowledge captured

The same artifact can receive different results under different checks.

Therefore:

```text
artifact digest alone
```

may be insufficient to define evidence identity.

Relevant receipt inputs can include:

- rule / policy version,
- test suite version,
- config digest,
- analyzer version,
- environment,
- dependency lock state,
- runtime target.

**Adoption status:** not decided.

---

# 24. Environment identity can be load-bearing evidence context

## Evidence synthesis

Prior deterministic-verification research already showed environment mismatch can create false test failures / false confidence.

SLSA provenance explicitly models build environment / builder identity.

in-toto Link attestations can record materials, command, byproducts, and environment.

Source:

- in-toto Link predicate
  - https://github.com/in-toto/attestation/blob/main/spec/predicates/link.md

## Knowledge captured

A statement like:

```text
"tests passed"
```

may need contextual qualifiers such as:

```text
OS / browser / runtime
dependency versions
feature flags
secrets / permissions
service versions
configuration
```

Evidence can be valid for one environment and insufficient for another.

**Adoption status:** not decided.

---

# 25. Evidence lifecycle includes supersession / deletion / loss of trust

## Evidence / observed practice

GitHub provides lifecycle management for artifact attestations and explicitly notes that attestations may need deletion when:

- created accidentally,
- associated artifacts no longer exist,
- consumers should no longer trust the associated artifact.

Source:

- GitHub Docs, `Managing the lifecycle of artifact attestations`
  - https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/manage-attestations

## Knowledge captured

Evidence should not be modeled only as:

```text
exists / missing
```

Potential lifecycle states include:

- current,
- stale,
- superseded,
- revoked / deleted,
- invalid signature,
- wrong subject,
- wrong policy,
- incomplete,
- unverifiable.

No state model is adopted here.

---

# 26. Fresh evidence can become semantically stale without artifact bytes changing

## Evidence synthesis

Several changes can invalidate the **decision basis** even if the tested artifact hash does not change:

- policy / Rule changes,
- vulnerability database changes,
- threat model changes,
- browser / OS / external API changes,
- dependency service changes,
- permission / credential changes,
- required environment changes,
- new evidence about a known risk.

Continuous-compliance systems therefore use time windows, policy-version binding, and recurring monitoring in addition to artifact hashes.

RFC 9334 likewise states freshness must consider whether the latest appraisal policy / reference values were used.

## Knowledge captured

Two dimensions are distinct:

```text
subject unchanged?
```

and

```text
assurance assumptions unchanged?
```

A receipt can remain authentic yet no longer be sufficient for the current decision.

**Adoption status:** not decided.

---

# 27. Evidence invalidation can be dependency-driven rather than “rerun everything”

## Evidence synthesis

Assurance-case change-impact work and ordinary software dependency systems both support the concept that changes affect only a subset of claims / checks when dependency relationships are known.

A conceptual evidence dependency graph could look like:

```text
Rule / Claim
→ Artifact / State
→ Verifier / Configuration
→ Evidence Receipt
→ Higher-level Assurance Claim
```

A change to any upstream node can invalidate dependent receipts / claims.

## Knowledge captured

There are at least three possible revalidation strategies:

```text
A. rerun nothing unless human remembers
B. rerun everything after every change
C. dependency / impact-based invalidation + rerun affected checks
```

Research in assurance-case maintenance motivates C, but the correctness of the dependency map becomes another assurance problem.

No impact-analysis system is adopted here.

**Adoption status:** not decided.

---

# 28. Evidence should distinguish execution from interpretation

## Evidence synthesis

Consider:

```text
Tool receipt: test command executed and exited 1
LLM summary: "tests passed"
```

The receipt and the LLM interpretation conflict.

Or:

```text
Tool receipt: scanner ran successfully
Scanner output: 4 critical findings
LLM summary: "security scan completed successfully"
```

The word `success` can describe successful execution rather than successful policy outcome.

ToolFailBench, false-success research, and deterministic verifier research all support separating these layers.

## Knowledge captured

Potentially distinct states:

- execution succeeded / failed,
- check outcome passed / failed / warned,
- policy interpretation passed / failed,
- task completion supported / unsupported.

A single `success=true` field can be ambiguous.

**Adoption status:** not decided.

---

# 29. Evidence has asymmetric value: receipts prove execution better than correctness

## Evidence synthesis

A signed tool receipt can strongly support:

```text
this tool call occurred
with these input/output hashes
at this time
under this identity
```

It may not support:

```text
the tool was the right tool
the inputs were semantically correct
the output proves the user's requirement
the tool itself is correct
```

Likewise, a test-result attestation can prove a test suite was run and passed without proving the suite was adequate.

## Knowledge captured

Receipt assurance should be scoped to the claim it actually supports.

**Adoption status:** not decided.

---

# 30. Replay protection is part of evidence validity

## Evidence / observed practice

RFC 9334 treats replay protection and freshness as security requirements and discusses timestamps, nonces, and epoch IDs.

RFC 9711 states that EAT use must provide a freshness mechanism.

Sigstore transparency logs timestamp signing events and allow inclusion verification.

Sources:

- RFC 9334
- RFC 9711
- Sigstore docs

## Knowledge captured

An attacker or buggy system can present a genuine old receipt as if it were current.

A cryptographically valid receipt is therefore not automatically a **fresh** receipt.

**Adoption status:** not decided.

---

# 31. Attestation security depends on the trust root and evidence producer

## Evidence / observed practice

RFC 9334 repeatedly separates:

- Attester,
- Verifier,
- Relying Party,
- Evidence,
- Attestation Result,
- Appraisal Policy.

It also warns that trust-anchor / appraisal-policy compromise undermines the process.

Sigstore verification depends on trust roots, signing identity, certificate validity, and transparency inclusion.

SLSA's model explicitly identifies the builder as part of the transitive trust base.

## Knowledge captured

Evidence architecture needs to ask:

```text
Who is allowed to produce this receipt?
Who verifies it?
Who decides whether the receipt is sufficient?
What root of trust establishes those identities?
```

No trust-root design is adopted here.

---

# 32. Evidence-Coverage is different from Evidence-Integrity

## Evidence synthesis

A system may have perfect signed receipts for 8 checks while 2 required checks were never represented.

That system has:

```text
high integrity for existing receipts
but incomplete coverage
```

This parallels prior multi-constraint research where high per-rule performance can hide strict all-rule failure.

## Knowledge captured

At least two metrics are conceptually distinct:

```text
Receipt integrity / authenticity
Evidence coverage / completeness
```

A cryptographically perfect evidence store can still be incomplete.

**Adoption status:** not decided.

---

# 33. Completion evidence may need to bind atomic obligations rather than one global task label

## Evidence / observed practice

Evidence-Carrying Termination requires each required answer claim to map to supporting trace evidence.

in-toto Test Result can list individual tests.

SCAI can attach evidence to specific attributes.

Prior multi-constraint research found that global success can hide omitted obligations.

## Knowledge captured

A richer completion receipt can conceptually represent:

```text
Obligation R1 → evidence E1
Obligation R2 → evidence E2
Obligation R3 → UNVERIFIED
```

rather than:

```text
task = complete
```

No atomic-obligation model is adopted here.

---

# 34. Evidence systems need an explicit `unknown / unverifiable` state

## Evidence synthesis

Several failure modes cannot honestly map to PASS or FAIL:

- required tool unavailable,
- evidence producer unavailable,
- semantic rule has no reliable verifier,
- receipt signature cannot be checked,
- artifact identity is ambiguous,
- policy version unknown,
- run logs missing,
- evidence expired.

## Knowledge captured

A binary completion model can pressure an agent toward false certainty.

Potential research states include:

- PASS,
- FAIL,
- WARN,
- MISSING,
- STALE,
- INVALID,
- UNVERIFIABLE,
- NOT_APPLICABLE.

No status vocabulary is adopted here.

---

# 35. A useful future receipt would likely need both provenance and outcome fields

## Evidence synthesis

Across in-toto, SLSA, GitHub, RATS, and emerging agent receipts, recurring fields include:

- receipt / statement ID,
- subject artifact / commit / state digest,
- predicate / check type,
- verifier / producer identity,
- rule / policy identity and version,
- config / workflow digest,
- tool / model / scanner version,
- environment identity,
- execution start / completion time,
- result,
- evidence / log / trace reference,
- input / output digests,
- signature / integrity proof,
- freshness / expiry information,
- predecessor / chain relationship.

## Knowledge captured

This is only a research field inventory. It is intentionally preserved before deciding what a solo project should actually store.

**Adoption status:** not decided.

---

# 36. Evidence storage can introduce privacy, retention, and secret-exposure risks

## Evidence synthesis

Full traces, tool inputs / outputs, test logs, screenshots, and environment metadata may contain:

- secrets,
- credentials,
- personal data,
- proprietary source,
- URLs / tokens,
- internal topology,
- user content.

Sigstore public transparency is intentionally public for its use case, while private GitHub attestations use a different model without the public transparency log.

RATS / EAT specifications include explicit privacy considerations around attestation claims.

Sources:

- GitHub Artifact Attestations
- Sigstore docs
- RFC 9334
- RFC 9711

## Knowledge captured

`store more evidence` is not free.

Receipt design eventually needs data-minimization / retention / access-control decisions.

**Adoption status:** not decided.

---

# 37. Current failure taxonomy for evidence receipts / completion evidence

## A. Fabricated completion

```text
agent says COMPLETE
→ required state change never happened
```

Evidence:

- false-success research,
- Webwright,
- ThinkingBox.

## B. Fabricated tool execution

```text
agent reports tool output
→ no valid tool execution exists
```

Evidence:

- ToolFailBench,
- Tool Receipts research.

## C. Real execution / wrong interpretation

```text
tool ran
→ output indicates failure
→ model reports success
```

## D. Wrong subject binding

```text
receipt valid for artifact A
→ presented as evidence for artifact B
```

## E. Stale commit evidence

```text
commit A passed
→ commit B created
→ A's PASS remains displayed / remembered
```

GitHub solves this specific gate by requiring latest SHA.

## F. Stale time-window evidence

```text
state can drift over time
→ old receipt exceeds accepted freshness horizon
```

Evidence:

- RATS,
- continuous compliance.

## G. Policy drift

```text
artifact unchanged
→ rule / policy changed
→ old PASS no longer proves current policy
```

## H. Configuration drift

```text
artifact unchanged
→ test / analyzer config changed
→ result needs reassessment
```

## I. Environment drift

```text
artifact unchanged
→ runtime / service / browser / dependency context changed
→ old test may no longer represent current state
```

## J. Authentic but false attestation

```text
trusted signer signs incorrect statement
→ signature is valid
→ claim is false
```

## K. Compromised evidence producer

```text
attester / builder / action layer compromised
→ valid-looking receipts become untrustworthy
```

## L. Replay

```text
old valid receipt reused as current evidence
```

## M. Coverage gap

```text
all existing receipts valid
→ one required obligation has no receipt
→ dashboard still appears green
```

## N. Missing evidence treated as PASS

```text
no observation
→ interpreted as no problem
```

## O. Receipt integrity without semantic validity

```text
receipt proves test ran
→ test is weak / wrong
→ intended Rule still not proven
```

## P. Evidence invalidation not propagated

```text
upstream artifact changes
→ dependent assurance claims remain marked current
```

## Q. Mutable / deleted log without trace

```text
historical unfavorable evidence removed
→ current record hides past state
```

## R. Evidence privacy leak

```text
full trace collected
→ sensitive data exposed in audit store
```

---

# 38. Possible mechanisms observed in research — not recommendations

Per the Research Capture Policy, these are retained before feasibility / adoption filtering.

## Artifact / state binding

- git commit SHA,
- file / artifact SHA256,
- tree hash,
- container digest,
- database schema version,
- deployment revision,
- environment revision.

## Check identity binding

- Rule / policy ID,
- policy version / digest,
- workflow / test config digest,
- verifier identity,
- tool / scanner version,
- model version where relevant.

## Execution evidence

- test-result attestations,
- tool-call receipts,
- command / exit-code records,
- logs,
- screenshots,
- state snapshots,
- before/after state diffs,
- trace IDs,
- replayable event streams.

## Integrity mechanisms

- digital signatures,
- HMAC receipts,
- hash chains,
- append-only logs,
- transparency logs,
- Merkle inclusion proofs,
- trusted timestamping,
- hardware-rooted attestation,
- remote attestation.

## Freshness mechanisms

- latest-commit binding,
- timestamps + policy windows,
- expiry timestamps,
- verifier-provided nonces,
- epochs,
- recurring collection,
- event-triggered revalidation.

## Invalidation mechanisms

- dependency graph,
- change-impact analysis,
- receipt supersession,
- explicit revoke / delete,
- policy-version mismatch,
- config-digest mismatch,
- environment-digest mismatch,
- automatically mark dependent assurance claims stale.

## Completion gating

- do not accept `COMPLETE` without receipts,
- require every critical obligation to have supporting evidence,
- deterministic final-state assertions,
- replay-based completion certification,
- unsupported claim blocks / downgrades completion,
- explicit `UNVERIFIABLE` state.

## Audit / observability

- complete tool traces,
- evidence provenance,
- initial and final artifact identities,
- receipt chain,
- signer identity,
- reason evidence became stale,
- evidence coverage matrix,
- change-to-invalidation log.

All remain research mechanisms.

---

# 39. Current feasibility / missing-capability notes

## Relatively accessible today

A repository workflow could technically record:

- commit SHA,
- workflow run URL,
- command executed,
- test result / exit code,
- changed-file list,
- config file hash,
- CI status bound to commit,
- timestamps,
- artifact hashes,
- structured verification JSON,
- evidence links.

GitHub already provides several of these primitives.

## Additional infrastructure required

- custom in-toto test-result predicates,
- signed custom attestations,
- systematic Rule→Evidence mapping,
- event-driven evidence invalidation,
- cross-repository evidence graph,
- receipt lifecycle / revocation management,
- policy/version-aware freshness evaluation,
- full trace persistence.

## Heavy / specialist / currently unrealistic for broad use

- hardware-rooted proof of model execution,
- remote attestation of every agent tool call,
- transparency-log infrastructure for all development checks,
- zkVM / zero-knowledge proof of every agent computation,
- cryptographically replayable complete desktop/browser execution,
- formal proof that every receipt producer is trustworthy.

Current infeasibility is not a reason to erase these mechanisms from the research record.

---

# 40. Negative results / cautions that should remain visible

1. **Agent self-reported completion is unreliable.**
   - false-success research, Webwright, ThinkingBox.

2. **LLM judges can also fail badly at detecting false success.**
   - Advani 2026 preprint.

3. **A signed receipt proves integrity of a statement, not automatically truth of the underlying event.**

4. **A provenance attestation is not proof that an artifact is secure or correct.**
   - GitHub explicitly warns this.

5. **A genuine receipt can still be stale.**
   - RATS freshness / replay model.

6. **A receipt bound only to artifact bytes can become insufficient when policy / environment changes.**

7. **An old PASS must not automatically satisfy a changed artifact.**
   - GitHub latest-commit check model.

8. **Evidence coverage and receipt authenticity are separate properties.**

9. **Missing evidence must not silently become PASS.**

10. **A test execution receipt cannot fix a weak / wrong test oracle.**

11. **The attester / builder / signer can be a trust bottleneck.**

12. **Mutable logs can hide deleted / rewritten evidence unless integrity mechanisms exist.**

13. **Transparency / full traces create privacy and retention costs.**

14. **Freshness is policy-relative; there is no universal age threshold.**

15. **State can change immediately after evidence generation, so zero-staleness is impossible in dynamic systems.**
   - RFC 9334 explicitly recognizes this race.

16. **Change-impact dependency maps can themselves omit affected checks.**

17. **Emerging agent execution-receipt standards / papers are still immature.**

18. **Cryptographic proof of execution does not prove that the executed action was the right action.**

19. **Evidence-Carrying Termination certifies support in recorded traces, not external truth.**

20. **A global `verified=true` flag can hide which obligations are actually supported.**

---

# 41. Current working interpretations for `web-project-guide` — not adoption decisions

These are hypotheses preserved for later synthesis only.

## H1. A completion claim should eventually be separable from completion evidence

Potential conceptual split:

```text
Agent claim: COMPLETE
Evidence state: SUPPORTED / PARTIAL / MISSING / STALE / INVALID
```

No status model is adopted.

## H2. Evidence probably needs current-artifact identity

A test result without commit / artifact identity can be accidentally reused after changes.

## H3. Evidence may also need current-rule / current-config identity

Artifact identity alone does not protect against policy or verification-config drift.

## H4. Conversation history is weak evidence of execution

Statements such as:

```text
"we already checked this"
```

are not equivalent to an independently generated execution receipt.

## H5. Future assurance may need Rule→Evidence coverage visibility

A global `all tests green` status can hide rules with no machine evidence at all.

## H6. Evidence invalidation appears as important as evidence generation

A system that creates receipts but never marks them stale can accumulate false assurance.

## H7. Event-triggered invalidation and age-triggered expiry solve different problems

Both may be needed for different evidence classes.

## H8. Receipt producer independence matters

The strongest evidence is likely produced by the action / CI / tool layer, not by the model that benefits from claiming success.

## H9. Signed receipts may be useful even without full cryptographic infrastructure

The underlying concepts — subject identity, verifier identity, timestamp, config, result, provenance — can exist before choosing signatures / transparency logs.

## H10. Evidence should have claim scope

A receipt should ideally state **what property it supports**, not just that a check ran.

## H11. Higher assurance can be built from chains of scoped evidence

Potential future pattern:

```text
Rule claim
→ verifier receipt
→ artifact/config identities
→ supporting raw evidence
→ freshness / validity check
```

This resembles assurance-case and attestation models but remains research synthesis.

## H12. Current evidence strongly supports keeping `unknown` visible

If a required check was not run or cannot be verified, hiding that state behind green completion is a direct false-confidence mechanism.

---

# 42. Evidence map

| Claim | Main evidence | Evidence status | Current confidence | Important limitation |
|---|---|---|---|---|
| Agents can falsely report task completion | Advani 2026; Webwright; ThinkingBox | preprint + Microsoft practical systems | High for phenomenon | exact rates task/model dependent |
| Tool-use hallucination includes skipped calls / fabricated outputs | ToolFailBench; AgentHallu | 2026 preprints | Moderate–High emerging | benchmark / classifier limitations |
| LLM judges are weak false-success detectors in some agent traces | Advani 2026 | recent preprint | Moderate–High emerging | needs independent replication |
| Artifact-bound attestations are a mature software-supply-chain pattern | in-toto / SLSA / GitHub | standards / CNCF / production docs | High | attestation truth depends on producer / policy |
| Test-result attestations can record that required tests ran and passed | in-toto Test Result | vetted predicate spec | High for mechanism | ecosystem/tool adoption varies |
| Verification claims are point-in-time and policy-relative | in-toto SVR; RATS | standards/specs | High | application policy must define acceptance |
| Digest binding prevents receipt reuse across changed artifact identity | in-toto / GitHub | production specification | High | semantic environment/policy may still drift |
| Required checks can be invalidated automatically by new commit | GitHub branch protection | production platform behavior | High | GitHub-specific mechanism |
| Freshness / replay must be explicitly handled | RFC 9334 / RFC 9711 | IETF architecture / standard | High | device-attestation domain; transfer requires care |
| Transparency logs can make signed evidence history append-only / auditable | Sigstore Rekor | production open-source infrastructure | High | does not prove semantic truth |
| Assurance-case maintenance requires change impact / evidence refresh | ETB / ACCESS research | peer-reviewed / research | Moderate–High | safety-critical transfer to web dev is conceptual |
| Missing / stale evidence can be modeled as explicit findings | IEEE Access 2026 compliance-as-code | peer-reviewed implemented prototype | High for studied design | bounded control scope / identity domain |
| HMAC tool receipts can detect fabricated tool references | Tool Receipts 2026 | recent preprint | Moderate emerging | novel benchmark / implementation |
| Evidence-carrying completion gates can reduce unsupported termination | ECT 2026 | very recent preprint | Moderate emerging | synthetic tasks / assumptions |
| Proof-of-execution can separate action from recordkeeping | PoE 2026 | preprint / prototype | Moderate conceptual | deployment assumptions / no broad replication |
| Signed receipt integrity does not guarantee event truth | SLSA/GitHub/Sigstore trust models | strong architectural evidence | High | truth model is system-specific |
| Artifact unchanged does not guarantee evidence remains decision-current | RATS / continuous compliance | standards + applied research | High conceptually | freshness threshold is policy-specific |

---

# 43. Source register

## Agent false completion / tool hallucination

1. Laksh Advani — `From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents`
   - 2026 preprint
   - https://arxiv.org/abs/2606.09863

2. Harsh Soni — `ToolFailBench: Diagnosing Tool-Use Failures in LLM Agents`
   - 2026 preprint
   - https://arxiv.org/abs/2607.04686

3. Xuannan Liu et al. — `AgentHallu: Benchmarking Automated Hallucination Attribution of LLM-based Agents`
   - 2026 preprint
   - https://arxiv.org/abs/2601.06818

4. Microsoft Research — `Webwright: A Terminal Is All You Need For Web Agents`
   - 2026
   - https://www.microsoft.com/en-us/research/articles/webwright-a-terminal-is-all-you-need-for-web-agents/

5. Microsoft Command Line — `ThinkingBox: Measuring whether agents finish the job`
   - 2026
   - https://commandline.microsoft.com/thinkingbox-bench-agent-benchmarking/

## Attestation / provenance / receipt standards

6. in-toto Attestation Framework
   - https://github.com/in-toto/attestation

7. in-toto Statement v1
   - https://github.com/in-toto/attestation/blob/main/spec/v1/statement.md

8. in-toto Test Result predicate
   - https://github.com/in-toto/attestation/blob/main/spec/predicates/test-result.md

9. in-toto Simple Verification Result
   - https://github.com/in-toto/attestation/blob/main/spec/predicates/svr.md

10. in-toto SCAI predicate
    - https://github.com/in-toto/attestation/blob/main/spec/predicates/scai.md

11. in-toto Reference predicate
    - https://github.com/in-toto/attestation/blob/main/spec/predicates/reference.md

12. in-toto Link predicate
    - https://github.com/in-toto/attestation/blob/main/spec/predicates/link.md

13. SLSA Build Provenance
    - https://slsa.dev/spec/v1.2/build-provenance

14. GitHub Artifact Attestations
    - https://docs.github.com/en/actions/concepts/security/artifact-attestations

15. GitHub `Using artifact attestations to establish provenance`
    - https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations

16. GitHub required status checks
    - https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks

17. GitHub artifact attestation lifecycle
    - https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/manage-attestations

18. Sigstore
    - https://docs.sigstore.dev/

19. Sigstore Rekor
    - https://docs.sigstore.dev/logging/overview/

## Freshness / remote attestation

20. RFC 9334 — `Remote ATtestation procedureS (RATS) Architecture`
    - https://www.rfc-editor.org/rfc/rfc9334.html

21. RFC 9711 — `The Entity Attestation Token (EAT)`
    - https://www.rfc-editor.org/rfc/rfc9711.html

## Continuous assurance / evidence change

22. Sorokin et al. — `Towards Continuous Assurance Case Creation for ADS with the Evidential Tool Bus`
    - 2024
    - https://arxiv.org/abs/2403.01918

23. Shankar et al. — `Continuous safety & security evidence generation, curation and assurance case construction using the Evidential Tool Bus`
    - DASC 2024
    - DOI: 10.1109/DASC62030.2024.10749275

24. `ACCESS: Assurance Case Centric Engineering of Safety-critical Systems`
    - Journal of Systems and Software, 2024
    - https://doi.org/10.1016/j.jss.2024.112034

25. `Compliance-as-Code for AI-Driven Identity Systems: Clause-to-Control Traceability and Machine-Readable Evidence`
    - IEEE Access 2026
    - DOI: 10.1109/ACCESS.2026.3665991

26. `Integrating Continuous Compliance into DevSecOps Pipelines: A Data Engineering Perspective`
    - Software 2026
    - https://doi.org/10.3390/software5010006

## Emerging agent execution receipts / proof-of-execution

27. Abhinaba Basu — `Tool Receipts, Not Zero-Knowledge Proofs: Practical Hallucination Detection for AI Agents`
    - 2026 preprint
    - https://arxiv.org/abs/2603.10060

28. `Signed Execution Receipts for AI Agent Tool Calls (XAIP Receipts)`
    - 2026 Internet-Draft / Independent Submission
    - https://datatracker.ietf.org/doc/draft-xkumakichi-xaip-receipts/03/

29. Jason Liu — `When May an Agent Stop? Evidence-Carrying Termination for Tool-Using LLMs`
    - August 2026 preprint
    - https://arxiv.org/abs/2608.23623

30. James Rhodes, George Kang — `Proof of Execution: Runtime Verification for Governed AI Agent Actions`
    - 2026 preprint
    - https://arxiv.org/abs/2607.05397

31. Md Habibur Rahman, Jaeho Kim — `Proof-of-Execution Memory: Defending LLM Agents Against Forged-Reasoning Attacks by Verifying What Actually Happened`
    - August 2026 preprint
    - https://arxiv.org/abs/2608.16032

---

# 44. Research gaps deliberately left open

The following adjacent questions remain open:

- **repository-level coding-agent instruction adherence**,
- `AGENTS.md` / nested rule-file inheritance and scope,
- whether agents actually read required files before acting,
- receipts for file reads / document-version reads,
- how to prove a model used evidence rather than merely retrieved it,
- Rule→atomic-obligation extraction correctness,
- final Rule→Verifier→Evidence dependency graph design,
- automatic change-impact analysis for Guide Rules,
- evidence invalidation granularity,
- selective rerun vs full rerun safety,
- verifier qualification / trust scoring,
- signing key / OIDC / trust-root management for solo projects,
- artifact attestation for source-only/static web projects,
- signed browser / screenshot / UI evidence,
- evidence freshness for external APIs / browser behavior / standards,
- visual and UX evidence expiration,
- evidence retention and privacy policy,
- evidence revocation / supersession history,
- cryptographic proof-of-execution feasibility in normal hosted AI systems,
- hardware-rooted attestation of agent execution,
- forged or compromised tool-server receipts,
- whether caller/executor co-signing reduces meaningful attacks,
- evidence receipt standardization for MCP / plugins,
- receipt portability between ChatGPT, Codex, GitHub Actions, and local tools,
- how evidence should survive conversation handoff,
- how to distinguish historical evidence from current completion evidence,
- evidence composition rules for multiple partial validators,
- severity-weighted evidence requirements,
- human evidence / approval receipts,
- exception / waiver receipts and expiry,
- replay protection for local developer workflows,
- whether transparency logs are useful or excessive for solo repositories,
- false-confidence risks from overengineered evidence systems.

---

# 45. Current research stopping point

For this theme, the current evidence is sufficient to preserve the following conclusions without moving into adoption:

1. agents can report completion despite the environment not satisfying the requested task;
2. tool-use failures include skipped calls, ignored results, fabricated outputs, and wrong actions;
3. practical agent systems increasingly use external final-state gates instead of trusting terminal prose;
4. software supply-chain systems already provide mature attestation primitives for binding claims to immutable artifact identities;
5. in-toto explicitly supports test-result attestations recording whether tests ran, what configuration was used, and what passed / failed;
6. verification summaries are naturally point-in-time and policy-relative;
7. digest / commit binding prevents an old artifact's evidence from automatically proving a changed artifact;
8. GitHub required checks provide a production example where only the latest commit SHA's result satisfies the gate;
9. freshness and replay protection are explicit assurance concerns in IETF remote-attestation architecture;
10. time-based expiry and change-triggered invalidation address different stale-evidence mechanisms;
11. assurance-case research treats evidence maintenance / change impact as an ongoing lifecycle problem;
12. modern continuous-compliance systems increasingly make missing / stale evidence explicit rather than interpreting silence as success;
13. transparency logs can improve evidence-history integrity but do not prove semantic truth;
14. cryptographic authenticity of a receipt and truthfulness / adequacy of the claim are distinct properties;
15. emerging 2026 agent research directly explores unforgeable tool receipts, evidence-carrying termination, and proof-of-execution;
16. these emerging mechanisms remain immature and are not yet grounds for project-wide architectural commitment;
17. evidence should likely be scoped to artifact, policy, configuration, verifier, environment, and time rather than stored as a context-free PASS;
18. a current artifact can still require re-evaluation when policy, threat model, environment, or external knowledge changes;
19. evidence coverage is separate from evidence integrity;
20. a global completion flag can hide unsupported atomic obligations;
21. explicit MISSING / STALE / INVALID / UNVERIFIABLE states appear important in the research literature and implementations;
22. evidence generation without evidence invalidation can accumulate false assurance;
23. evidence receipts appear most useful when generated by a trusted execution / tool layer that the LLM cannot forge;
24. receipts are strongest as proof of scoped execution facts and weaker as proof of broad semantic correctness;
25. the natural next separate AI-agent research question is repository-level coding-agent instruction adherence: whether agents actually discover, read, scope, and obey repository instruction files such as `AGENTS.md`, nested rules, README / requirements, and current repository state.

This is enough to stop this single theme without designing the final Guide architecture.

**No Common Rule, Router behavior, Gate, receipt schema, cryptographic-signing requirement, artifact-attestation requirement, freshness window, evidence-expiry policy, change-invalidation algorithm, completion certificate, or adoption decision is created by this file.**