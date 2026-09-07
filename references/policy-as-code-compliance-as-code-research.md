# Policy as Code / Compliance as Code Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**. It intentionally records mechanisms even when they may be too complex, expensive, or currently impractical for a one-person project.

## Research Question

How do modern policy-as-code and compliance-as-code systems convert rules into executable logic, enforce them in development/runtime workflows, handle exceptions, preserve evidence, and reduce the risk that a human or AI agent silently misses applicable rules?

This research pass focuses on Open Policy Agent (OPA), Conftest, Kyverno, Gatekeeper, HashiCorp Sentinel, and GitHub Rulesets / rule evaluation.

---

# 1. Policy as Code treats policy as software, not as static prose

## Evidence / observed practice

HashiCorp Sentinel describes policy as code as representing policy in high-level code stored as text files so that normal software-development practices can be applied to policy itself. Its documented benefits include:

- version control,
- diffs and pull requests,
- automated testing,
- automated deployment,
- repeatability,
- reuse,
- codifying logic that would otherwise live in oral tradition or GUI settings.

OPA similarly provides a declarative policy language and a policy engine that evaluates structured input and returns policy decisions.

Sources:

- HashiCorp Sentinel, `Policy as Code`
  - https://developer.hashicorp.com/sentinel/docs/concepts/policy-as-code
- Open Policy Agent documentation
  - https://www.openpolicyagent.org/docs

## Knowledge captured

The key change is not merely converting a checklist into code. Policy itself becomes a versioned, testable, deployable artifact with its own lifecycle.

This creates the possibility of reviewing policy changes using the same mechanisms as code changes:

```text
Policy change
→ diff / pull request
→ policy tests
→ review
→ deploy / activate
→ observe policy decisions
→ revise
```

This also introduces a new failure class: policy code can itself be wrong.

**Adoption status:** not decided.

---

# 2. Policy decision-making can be separated from enforcement

## Evidence / observed practice

OPA explicitly separates policy decision-making from the system that enforces the decision.

A caller sends structured input to OPA, OPA evaluates policy plus data, and returns a decision. OPA can be embedded or queried through APIs, Go, WebAssembly, and other integration paths.

OPA is domain-agnostic and can be used in microservices, Kubernetes, CI/CD, API gateways, and other systems.

Sources:

- OPA documentation
  - https://www.openpolicyagent.org/docs
- OPA integration documentation
  - https://www.openpolicyagent.org/docs/integration

## Knowledge captured

This separation allows one policy engine to be reused across multiple enforcement points.

It also means there are at least two independently fallible components:

1. the **decision engine** can return the wrong decision because the policy/input/data is wrong;
2. the **enforcement point** can fail to ask the engine, ignore the answer, or apply it incorrectly.

Therefore policy-as-code does not eliminate the need to verify that enforcement coverage is complete.

**Adoption status:** not decided.

---

# 3. Policy code is itself unit-tested

## Evidence / observed practice

OPA provides a dedicated policy testing framework. `opa test` discovers rules prefixed with `test_` and evaluates them. Failed policy tests produce failure results; runtime errors are separately identified.

OPA also provides `--fail-on-empty` because running zero tests by mistake would otherwise succeed. The option exists specifically so CI can ensure tests were actually executed.

Sentinel likewise provides a test framework and local CLI intended for automated policy testing before policy deployment.

Sources:

- OPA, `Policy Testing`
  - https://www.openpolicyagent.org/docs/policy-testing
- Sentinel, `Policy as Code`
  - https://developer.hashicorp.com/sentinel/docs/concepts/policy-as-code

## Knowledge captured

The validator / policy engine is not assumed correct simply because it runs.

Policy rules require tests such as:

- should pass,
- should fail,
- boundary cases,
- exception cases,
- malformed input,
- missing fields,
- conflicting conditions,
- no-test-discovered failure.

This is directly relevant to a guide validator: a validator that has no failing test for a known failure mode can still return green while the intended rule is unenforced.

**Adoption status:** strong research candidate, not accepted.

---

# 4. Enforcement strength is often separate from policy logic

## Evidence / observed practice

Sentinel has first-class enforcement levels:

- `advisory` — failure is reported but allowed;
- `soft-mandatory` — failure blocks unless an explicit override is made;
- `hard-mandatory` — failure blocks and cannot be overridden without removing/changing the policy.

The enforcement level is configured separately from the policy body, so the same logical policy can be advisory in one environment and mandatory in another.

Gatekeeper similarly supports `deny`, `warn`, and `dryrun` enforcement actions.

GitHub Rulesets support `Active`, `Evaluate`, and `Disabled` modes. `Evaluate` records what would have passed or failed without enforcing the rule.

Sources:

- Sentinel, `Enforcement Levels`
  - https://developer.hashicorp.com/sentinel/docs/concepts/enforcement-levels
- Gatekeeper, `Handling Constraint Violations`
  - https://open-policy-agent.github.io/gatekeeper/website/docs/next/violations/
- GitHub Docs, ruleset enforcement statuses
  - https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository

## Knowledge captured

A useful recurring structure is:

```text
Policy logic
≠
Enforcement strength
```

A rule can first be observed in a non-blocking mode, then promoted to blocking enforcement after enough real-world evidence exists.

This reduces the risk that an incorrectly written new policy immediately blocks legitimate work.

**Adoption status:** not decided.

---

# 5. Shadow / evaluate / dry-run modes allow policy testing against real behavior

## Evidence / observed practice

GitHub Rulesets in `Evaluate` mode do not block actions but record whether those actions would have passed or failed. Rule Insights exposes these results.

Gatekeeper `dryrun` allows a constraint to be deployed and evaluated without blocking resources. Violations still appear in status / audit results.

Gatekeeper `warn` similarly avoids blocking while giving immediate feedback.

Kyverno `Audit` behavior records failures in PolicyReports without necessarily blocking creation, while `Enforce` blocks policy violations.

Sources:

- GitHub Rulesets, `Evaluate` mode and Rule Insights
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/managing-rulesets-for-a-repository
- Gatekeeper, `Handling Constraint Violations`
  - https://open-policy-agent.github.io/gatekeeper/website/docs/next/violations/
- Kyverno, `Policy Reports`
  - https://kyverno.io/docs/guides/reports/

## Knowledge captured

Policy systems often have a staged rollout model:

```text
Author policy
→ Test with fixtures
→ Evaluate against real activity without blocking
→ inspect false positives / false negatives
→ refine
→ enforce
```

This is a form of validation of the rule system itself before making it authoritative.

**Adoption status:** strong research candidate, not accepted.

---

# 6. Policy decisions are logged with traceability metadata

## Evidence / observed practice

OPA Decision Logs can include:

- `decision_id`,
- trace/span identifiers,
- which policy path was queried,
- the input,
- the result,
- policy bundle metadata and revision,
- timestamp,
- other labels.

OPA can send these logs to remote services, custom plugins, or local console output. Sensitive fields can be masked before upload.

Sources:

- OPA, `Decision Logs`
  - https://www.openpolicyagent.org/docs/management-decision-logs

## Knowledge captured

A machine-made policy decision can be made auditable by preserving:

```text
what was checked
+ with which input
+ using which policy revision
+ what result was produced
+ when
+ decision identifier
```

This is much stronger evidence than a generic `validator passed` message.

It also makes it possible to reproduce or debug a decision after the policy has changed.

**Adoption status:** strong research candidate, not accepted.

---

# 7. Policy versions can be centrally distributed while enforcement stays distributed

## Evidence / observed practice

OPA supports policy/data `Bundles`. OPA instances can periodically download updated bundles and activate them without restarting.

The management architecture separates:

- policy distribution (`Bundles`),
- policy decision telemetry (`Decision Logs`),
- agent status/health,
- dynamic configuration (`Discovery`).

OPA itself does not provide a full central control-plane service out of the box, but provides APIs needed to build one.

Sources:

- OPA, `Bundles`
  - https://www.openpolicyagent.org/docs/management-bundles
- OPA, `Management APIs and Architecture`
  - https://www.openpolicyagent.org/docs/management-introduction

## Knowledge captured

One architecture pattern is:

```text
Central policy source
→ signed/versioned bundle
→ many local enforcement agents
→ decision/status telemetry back to central system
```

This allows policies to remain centrally governed while decisions occur close to the system being controlled.

This is far heavier than the current guide needs, but the mechanism is relevant if rule enforcement ever spans many repositories or agents.

**Adoption status:** not decided.

---

# 8. The policy package itself can be cryptographically verified

## Evidence / observed practice

OPA supports signed policy bundles. Signed bundles include `.signatures.json`, file hashes, and cryptographic signatures.

When signature verification is configured, OPA verifies:

- the signing key / JWT signature,
- that the expected file set matches,
- hashes for policy/data files,
- optional scope.

If verification fails, the new bundle is not activated and OPA continues using the previous valid bundle while reporting an activation failure.

OPA documentation notes that some pre-production commands such as `opa eval` and `opa test` do not currently verify bundle signatures.

Sources:

- OPA, `Bundles — Signing`
  - https://www.openpolicyagent.org/docs/management-bundles

## Knowledge captured

A mature policy system can verify not only whether a rule passes, but whether the **rules being evaluated are actually the approved rules**.

This protects against an altered, incomplete, stale, or untrusted policy package replacing the intended policy set.

It introduces a distinction between:

- rule correctness,
- rule provenance/integrity,
- rule activation state.

**Adoption status:** not decided.

---

# 9. Policy evaluation can happen before merge/deployment

## Evidence / observed practice

Conftest evaluates structured configuration files using Rego policies and can be run locally or in CI.

Gatekeeper's `gator` CLI can evaluate manifests/policies outside the live cluster and can return structured YAML/JSON violation output and a CI-relevant exit code.

GitHub Rulesets can require status checks before merge, code scanning results, code quality results, code coverage, pull request approval, path restrictions, and other conditions.

Sources:

- Conftest documentation
  - https://www.conftest.dev/options/
- Gatekeeper `gator`
  - https://open-policy-agent.github.io/gatekeeper/website/docs/gator/
- GitHub Docs, rules available to Rulesets
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets

## Knowledge captured

This is the `shift-left` pattern:

```text
Change proposed
→ machine-readable artifact inspected
→ policy evaluated
→ violations returned
→ merge/deployment blocked or warned
```

This makes enforcement part of the delivery path instead of relying on someone remembering a checklist after implementation.

**Adoption status:** strong research candidate, not accepted.

---

# 10. Runtime / existing-state audit is separate from admission-time enforcement

## Evidence / observed practice

Gatekeeper has a separate Audit function that periodically reevaluates existing resources against constraints and finds pre-existing misconfigurations.

Audit tracks information such as:

- time of last audit,
- violation counts,
- violation severity,
- constraint status,
- audit identifiers,
- audit-start / constraint-audited / audit-finished events.

Kyverno background scans similarly maintain policy results for existing resources.

Sources:

- Gatekeeper, `Audit`
  - https://open-policy-agent.github.io/gatekeeper/website/docs/next/audit/
- Kyverno, `Policy Reports`
  - https://kyverno.io/docs/guides/reports/

## Knowledge captured

A policy passing at creation/merge time is not treated as permanent proof of compliance.

There are two separate controls:

1. **prevent or evaluate new non-compliant changes**;
2. **periodically re-check current state**.

This resembles NASA/CMMI/ISO findings that previously valid evidence can become stale as systems or requirements change.

**Adoption status:** strong research candidate, not accepted.

---

# 11. Policy results use explicit result states instead of a single boolean

## Evidence / observed practice

Kyverno PolicyReports support result states including:

- `pass`,
- `fail`,
- `warn`,
- `error`,
- `skip`.

Kyverno explicitly distinguishes `skip` from `pass`: `skip` means the rule was not evaluated because preconditions were not met or an exception applied; `pass` means the rule was applicable and successfully evaluated.

Conftest also reports exceptions separately from pass/fail/warning counts.

Sources:

- Kyverno, `Policy Reports`
  - https://kyverno.io/docs/guides/reports/
- Conftest, `Exceptions`
  - https://www.conftest.dev/exceptions/

## Knowledge captured

This directly reinforces earlier NASA/ISO findings.

A safe result model should not collapse these states:

```text
PASS
FAIL
WARN
ERROR
SKIP / NOT APPLICABLE / EXCEPTION
NOT EVALUATED
```

A missing evaluation must not silently become `pass`.

**Adoption status:** strong research candidate, not accepted.

---

# 12. Exceptions are first-class, narrow, and observable

## Evidence / observed practice

Kyverno supports `PolicyException` resources that can target specific policies/rules and narrowly scoped resources/conditions. Policy reports can explicitly record that a result was skipped because of a particular exception.

Kyverno also publishes a policy intended to place guardrails around `PolicyException` objects themselves.

Conftest supports exception logic in Rego. Exceptions are reported as their own tally so users can detect that exceptions are occurring.

Sentinel `soft-mandatory` allows explicit overrides while `hard-mandatory` does not.

GitHub Rulesets provide bypass permissions and Rule Insights can show bypass actions.

Sources:

- Kyverno, `Policy Exceptions`
  - https://kyverno.io/docs/guides/exceptions/
- Kyverno, `Policy for PolicyExceptions`
  - https://kyverno.io/policies/other/policy-for-exceptions/policy-for-exceptions/
- Conftest, `Exceptions`
  - https://www.conftest.dev/exceptions/
- Sentinel, `Enforcement Levels`
  - https://developer.hashicorp.com/sentinel/docs/concepts/enforcement-levels
- GitHub Ruleset Insights
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/managing-rulesets-for-a-repository

## Knowledge captured

Mature systems do not treat `exception` as simply deleting the rule.

Common characteristics include:

- exception has its own representation,
- exception scope can be narrow,
- exception is visible in reports/logs,
- override capability can be privilege-separated,
- hard rules may intentionally have no override path,
- exception mechanisms themselves may require guardrails.

A recurring governance risk is **exception creep**: too many broad exceptions can effectively disable the policy system while still appearing to exist.

**Adoption status:** strong research candidate, not accepted.

---

# 13. Bypass events are themselves auditable data

## Evidence / observed practice

GitHub Rule Insights record actions that:

- passed,
- failed,
- bypassed rulesets.

For evaluate-mode rules, the system records what would have passed/failed if enforcement were active.

GitHub rule-suite REST APIs expose per-rule evaluation results, enforcement mode, and bypass/evaluation outcomes.

GitHub secret push protection can also use delegated bypass requests where designated reviewers approve or deny a contributor's request rather than allowing unilateral bypass.

Sources:

- GitHub Docs, `Managing rulesets for a repository`
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/managing-rulesets-for-a-repository
- GitHub REST API, `Rule suites`
  - https://docs.github.com/en/rest/repos/rule-suites
- GitHub Docs, bypass requests for push protection
  - https://docs.github.com/en/code-security/concepts/secret-security/bypass-requests

## Knowledge captured

A bypass does not need to disappear into informal history. It can become structured evidence that can later answer:

- which rule was bypassed,
- by whom,
- when,
- whether the underlying rule would have failed,
- whether the bypass pattern is recurring.

This makes exceptions usable as feedback for rule-system improvement rather than isolated one-off events.

**Adoption status:** strong research candidate, not accepted.

---

# 14. Policies can be layered instead of selecting exactly one policy set

## Evidence / observed practice

GitHub Rulesets can have multiple applicable rulesets on the same branch at the same time, and all applicable rules are enforced.

Sentinel policy sets can be scoped to organizations, projects, or workspaces and inherited by contained resources.

OPA can load multiple policy/data bundles with policy ownership scopes.

Sources:

- GitHub Docs, `About rulesets`
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets
- HashiCorp Validated Designs, policy sets
  - https://developer.hashicorp.com/validated-designs/terraform/user-guide/policy-as-code-sentinel
- OPA, `Bundles`
  - https://www.openpolicyagent.org/docs/management-bundles

## Knowledge captured

This supports a set-union / layering approach:

```text
Organization baseline
+ repository baseline
+ project/domain policy
+ change-specific policy
+ risk-specific policy
```

rather than choosing exactly one exclusive policy category.

This independently resembles the overlay/baseline patterns found in NIST and component-specific applicability in NASA.

**Adoption status:** strong research candidate, not accepted.

---

# 15. Structured input is essential to executable policy

## Evidence / observed practice

OPA evaluates arbitrary structured input, commonly JSON. Conftest evaluates configuration files after parsing them into structured data. Gatekeeper/Kyverno evaluate Kubernetes resources with defined schemas.

This means policy engines rely on explicit machine-readable facts rather than natural-language interpretation alone.

Sources:

- OPA documentation
  - https://www.openpolicyagent.org/docs
- Conftest documentation
  - https://www.conftest.dev/
- Gatekeeper Constraint Templates
  - https://open-policy-agent.github.io/gatekeeper/website/docs/constrainttemplates/

## Knowledge captured

For a development guide, executable applicability likely requires a machine-readable representation of project/change facts such as:

- deployment type,
- public/private status,
- presence of UI,
- storage/auth/cloud usage,
- runtime type,
- changed file categories,
- risk signals,
- evidence state.

Natural-language documentation alone cannot reliably drive policy-as-code without an extraction/classification step.

This creates another possible failure barrier: verify the extracted structured facts separately from the policy evaluation.

**Adoption status:** strong research candidate, not accepted.

---

# 16. Policy engines can use external data, but this increases trust and failure dependencies

## Evidence / observed practice

Sentinel can access external information through integrations/plugins. OPA policies can combine policy with structured data. Gatekeeper supports external-data providers for selected use cases.

Gatekeeper documentation explicitly discusses security and failure-policy concerns when consulting external data.

Sources:

- Sentinel introduction
  - https://developer.hashicorp.com/sentinel/docs/intro
- Gatekeeper External Data
  - https://open-policy-agent.github.io/gatekeeper/website/docs/v3.8.x/externaldata/

## Knowledge captured

External data allows policies to depend on current facts not stored directly in the repository, but creates new failure modes:

- provider unavailable,
- stale external data,
- network failure,
- trust/security boundary expansion,
- unclear fail-open vs fail-closed behavior,
- nondeterministic policy outcomes over time.

A policy system therefore needs explicit failure semantics when required input cannot be obtained.

**Adoption status:** not decided.

---

# 17. Policy reports are often current-state views, not complete historical archives

## Evidence / observed practice

Kyverno notes that PolicyReports represent the current state of resources and do not themselves record complete historical information. Entries can disappear when resources are deleted.

Gatekeeper constraint status similarly focuses on current/recent audit results, although audit logs/events can carry `audit_id` and be exported for historical use.

Sources:

- Kyverno, `Policy Reports`
  - https://kyverno.io/docs/guides/reports/
- Gatekeeper, `Audit`
  - https://open-policy-agent.github.io/gatekeeper/website/docs/next/audit/
- Gatekeeper, `Exporting violations`
  - https://open-policy-agent.github.io/gatekeeper/website/docs/export/

## Knowledge captured

A live compliance dashboard is not automatically an audit history.

If historical evidence matters, results need durable export/storage separate from ephemeral current-state reporting.

**Adoption status:** not decided.

---

# 18. Policy rollout itself can be monitored and promoted gradually

## Evidence / observed practice

GitHub recommends using Evaluate mode to see what a rule would block before changing it to Active. GitHub documentation for license policy rollouts demonstrates separate evaluate/active rollout stages.

Gatekeeper dry-run/warn and Sentinel advisory enforcement support comparable staged adoption.

Sources:

- GitHub, ruleset Evaluate mode
  - https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository
- GitHub, license-policy rollout example
  - https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/manage-your-dependency-security/configure-license-policies
- Gatekeeper violations / dry-run
  - https://open-policy-agent.github.io/gatekeeper/website/docs/next/violations/

## Knowledge captured

A policy change can have its own release lifecycle:

```text
Draft
→ unit test
→ evaluation / dry-run
→ analyze actual impact
→ active enforcement
→ monitor violations / bypasses
→ revise or retire
```

This strongly resembles normal software deployment practices applied to governance logic.

**Adoption status:** not decided.

---

# 19. Machine enforcement still depends on complete enforcement-point coverage

## Evidence / observed practice

OPA can be queried from many enforcement locations, Gatekeeper distinguishes admission-time and audit-time checks, GitHub Rulesets cover selected Git operations, and Conftest evaluates files only when its command/workflow is actually run.

None of these systems automatically guarantees that every relevant action passes through the policy engine merely because policies exist.

## Knowledge captured

This is a critical residual risk:

```text
Perfect policy
+ perfect tests
+ perfect policy engine
+ missing enforcement point
= rule bypass
```

Examples of possible gaps:

- local change path bypasses CI,
- direct push bypass permissions,
- a file type is not included in a policy scan,
- a runtime state appears after merge,
- an agent/classifier fails to mark the relevant domain,
- an external integration is outside the policy hook.

Therefore the architecture needs coverage analysis of **where policy is evaluated**, not just what the policy says.

**Adoption status:** strong research candidate, not accepted.

---

# 20. Automated compliance creates a second-order assurance problem: who checks the checker?

## Evidence / observed practice

OPA provides policy tests, signed bundles, decision logs, status APIs, and health/metrics. Gatekeeper separates live enforcement from periodic audit. GitHub exposes rule evaluation insights and evaluate mode. Sentinel provides a dedicated policy test lifecycle.

These mechanisms collectively show that the policy engine and policy deployment process are themselves objects of verification.

## Knowledge captured

Policy-as-code does not remove the need for assurance; it moves some assurance responsibilities into another layer.

Potential second-order checks include:

- policy unit tests,
- golden failure cases,
- regression tests for known missed-rule incidents,
- fail-on-no-tests-run,
- policy package version/provenance,
- signed policy bundles,
- engine health/status,
- decision logs,
- dry-run/evaluate before activation,
- independent current-state audit,
- periodic comparison of automated output with manually derived expected applicability.

This directly matches the NASA/Safety-Critical finding that verification tooling itself should not be trusted without evidence.

**Adoption status:** strong research candidate, not accepted.

---

# 21. Main failure modes / limitations observed in Policy as Code

These are not reasons to reject policy-as-code; they are risks that remain even with strong automation.

## Policy defect

The encoded rule may misunderstand the real requirement or implement incorrect logic.

## Incomplete input

The engine may receive a structured representation that omits a fact needed to identify an applicable rule.

## Missing enforcement point

The policy may never run for a path that matters.

## Stale policy

A deployed policy bundle may not match the current approved requirement set.

## Stale external data

Policy decisions using external state may be based on old or unavailable information.

## Exception creep

Too many or overly broad exceptions can effectively neutralize enforcement.

## Fail-open behavior

If policy evaluation errors or unavailable data are treated as allow, important controls can silently disappear.

## False positive burden

Overly strict or badly modeled policies can cause users to create broad bypasses or stop trusting the system.

## False confidence from green automation

A green CI/policy result proves only the checks that actually ran on the inputs they actually received.

## Historic evidence loss

Current-state policy reports are not always durable compliance history.

## Policy-language/tool dependency

Adopting Rego, Sentinel, CEL, or another policy language creates maintenance and skill dependencies.

## Performance / scale cost

Continuous audit, large policy sets, external data calls, detailed logs, and retained evidence can consume compute/storage and require operational management.

**Adoption status:** research limitations only.

---

# 22. Cross-source pattern emerging from this research family

Across OPA, Conftest, Kyverno, Gatekeeper, Sentinel, and GitHub, a recurring architecture is visible:

```text
Human / normative requirement
↓
Machine-readable policy
↓
Policy unit tests
↓
Version-controlled review
↓
Structured input
↓
Pre-change / CI evaluation
↓
Warn / evaluate / enforce decision
↓
Explicit pass / fail / skip / error / exception state
↓
Decision log / policy report
↓
Runtime or current-state audit
↓
Bypass / exception monitoring
↓
Policy refinement
```

Policy-as-code therefore appears strongest when treated as a **full policy lifecycle**, not merely as a script that returns `true` or `false`.

**Adoption status:** research synthesis, not accepted.

---

# 23. Comparison with earlier research families

## NASA

Policy-as-code can automate parts of NASA-like applicability/compliance tracking, but NASA adds organizational review, lifecycle responsibility, and independent assurance that code alone does not provide.

## NIST

OSCAL provides structured compliance artifacts; policy-as-code provides executable decision logic. These are complementary rather than identical.

## CMMI

CMMI asks whether a process is sustained and repeatable. Policy-as-code can support repeatability, but a policy engine existing does not prove the surrounding process is mature.

## ISO / IEC

Statement-of-Applicability style explicit inclusion/exclusion maps well to policy result states and exception records.

## Safety-Critical / Assurance Case

Policy-as-code can generate evidence, but a green policy result is still only one piece of an assurance argument. The argument must establish that the policy set, inputs, enforcement points, and toolchain are themselves adequate.

---

# 24. Open questions for later synthesis

- Should `web-project-guide` eventually represent individual rules in machine-readable form rather than only document-level routing?
- Should machine-readable policy be derived from Owner Docs or be a separate Source of Truth?
- How can one avoid creating duplicate normative truth between Markdown rules and executable rules?
- Can a generated policy representation be verified against Owner Docs automatically?
- Should there be `advisory / overrideable / hard` enforcement levels for Guide rules?
- How should `Not Applicable`, `Exception`, `Unresolved`, `Error`, and `Not Evaluated` differ?
- What structured facts about each repository/change are needed for reliable applicability decisions?
- How should those facts be extracted and independently verified?
- Where are the enforcement points in a ChatGPT + GitHub workflow?
- What paths can bypass them?
- Should a policy first run in shadow/evaluate mode before becoming blocking?
- Should known historical misses become mandatory policy regression tests?
- How should bypasses/exceptions expire or be re-reviewed?
- Should rule/validator version be stored with every completion result?
- How much decision logging is useful without creating excessive noise or privacy risk?
- Should current-state auditing run independently from PR/CI checks?
- Could GitHub Rulesets/required status checks enforce a Guide validator for relevant repositories?
- Could OPA/Conftest-style policy engines consume `rule-router.json`, repository metadata, changed files, and project manifests?
- Could the Guide eventually emit an assurance/compliance artifact from automated policy evaluation plus human/AI evidence?
- How should the policy engine itself be tested, versioned, signed, and audited?

No adoption decision has been made in this research file.
