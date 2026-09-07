# Large Software Organization Development Controls Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**. It intentionally records mechanisms broadly, including practices that may be too large, expensive, organization-specific, or impossible for the current project to reproduce today.

## Research Question

How do large software organizations operationalize code review, ownership, CI quality gates, regression detection, compliance work distribution, exceptions, evidence, and process improvement so that important requirements and quality checks are less likely to be missed?

This pass focuses on public material from Google, Microsoft, Meta, and GitHub. It does **not** assume that every public platform feature represents the internal engineering process of the company that ships it.

---

# 1. Google — Code review is a mandatory quality mechanism, not an optional style pass

## Evidence / observed practice

Google's public Engineering Practices documentation describes code review as a process where someone other than the author examines a change and says the purpose is to maintain the quality of Google's code and products.

Google's reviewer guidance expects review to cover materially different dimensions, including:

- design,
- functionality,
- complexity,
- automated tests,
- naming,
- comments,
- style,
- documentation,
- user-facing behavior,
- concurrency risks,
- maintainability and readability.

The guidance explicitly says a reviewer should consider whether the change belongs in the codebase at all, whether it integrates with the surrounding system, and whether it is the right time to add the functionality.

Google also says reviewers should look at every line they have been assigned to review unless a scoped exception is explicit. If one reviewer is only responsible for a subset such as security, privacy, accessibility, or certain files, that scope should be made explicit and other qualified reviewers should cover the remaining parts.

Sources:

- Google Engineering Practices, Code Review introduction
  - https://google.github.io/eng-practices/review/
- Google Engineering Practices, What to look for in a code review
  - https://google.github.io/eng-practices/review/reviewer/looking-for.html

## Knowledge captured

Google's code review model treats a change as a multi-dimensional object. There is no single "code correctness" question that subsumes design, user behavior, documentation, testing, maintainability, and specialist risk domains.

This matters for omission prevention: if a review system collapses all concerns into one generic reviewer/check, some categories can be silently missed. Google's guidance instead encourages explicit specialist coverage when one reviewer is not qualified for every dimension.

The guidance also distinguishes review of the change's **purpose and fit** from review of the implementation details. A mechanically correct implementation can still be rejected if the change itself should not exist or is going in the wrong architectural direction.

**Adoption status:** not decided.

---

# 2. Google — Review quality is judged against long-term code health, not perfection

## Evidence / observed practice

Google's standard of code review says the primary purpose is for the overall health of the codebase to improve over time. Reviewers are expected to approve a change when it definitely improves code health, even if it is not perfect.

The same guidance warns against small, repeated decreases in code quality that accumulate over time, particularly under deadline pressure.

Google distinguishes blocking issues from minor suggestions. Reviewers can mark comments as optional / nits / informational rather than making every observation a merge blocker.

Source:

- Google Engineering Practices, The Standard of Code Review
  - https://google.github.io/eng-practices/review/reviewer/standard.html

## Knowledge captured

The interesting mechanism is not only "review everything". It is also **severity separation**:

- some findings block the change,
- some findings are optional improvements,
- some comments are educational only.

This is operationally similar to MUST / SHOULD / MAY or hard / soft policy enforcement, but expressed within review workflow.

Google is also explicit that process quality can fail through cumulative small degradations. That creates a different failure mode from catastrophic one-time mistakes: repeated acceptance of locally tolerable shortcuts can make the overall system worse.

**Adoption status:** not decided.

---

# 3. Google — Reviewer selection tries to match expertise to the changed area

## Evidence / observed practice

Google's public review documentation says the best reviewer is usually the person capable of the most thorough and correct review for the specific code, often the owner(s) of that code. Different reviewers may be needed for different parts of a change.

Google also says that if the assigned reviewer is not qualified for a specialized area such as privacy, security, concurrency, accessibility, or internationalization, a qualified reviewer should be added.

Source:

- Google Engineering Practices, Code Review introduction and reviewer guidance
  - https://google.github.io/eng-practices/review/
  - https://google.github.io/eng-practices/review/reviewer/looking-for.html

## Knowledge captured

This is a concrete form of **risk-to-reviewer routing**.

The review system does not assume that one generic approval is evidence that every important concern has been checked. Instead, expertise can be decomposed across the change.

The mechanism is highly relevant to a rule router: a single "implementation" reviewer or validator may be insufficient if security, storage, deployment, accessibility, and other domains require different knowledge or evidence.

**Adoption status:** strong research candidate, not accepted.

---

# 4. Google — Small changes improve reviewability and reduce hidden risk

## Evidence / observed practice

Google recommends small changelists. Its review-speed guidance says very large changes should usually be split into smaller changes that build on each other.

The change author guidance also treats a changelist as one self-contained change and asks authors to write descriptions that explain what the change does and why.

Sources:

- Google Engineering Practices, Speed of Code Reviews
  - https://google.github.io/eng-practices/review/reviewer/speed.html
- Google Engineering Practices, Writing good CL descriptions
  - https://google.github.io/eng-practices/review/developer/cl-descriptions.html

## Knowledge captured

Small changes are not only a productivity preference. They improve the probability that a reviewer can actually understand the change and notice omissions.

Large changes can make review completeness harder because reviewers must hold more context at once, which increases the risk of scanning rather than understanding.

A strong omission-prevention system may therefore need to consider **change size / change complexity as a review-risk signal**, not just project type.

**Adoption status:** not decided.

---

# 5. Google — Review itself is a heavily measured industrial process

## Evidence / observed practice

Google Research published a large case study of modern code review based on 12 interviews, a survey of 44 respondents, and review logs for 9 million reviewed changes.

Google has also published work on:

- industrial code coverage computed and surfaced at changeset/code-review level,
- continuous testing at very large repository scale,
- automated identification of culprit changes that introduced failures,
- automatically reverting breaking changes when the CI evidence is strong enough,
- ML-assisted resolution of code review comments,
- AI-assisted assessment of coding practices during review.

Examples:

- `Modern Code Review: A Case Study at Google`
  - https://research.google/pubs/modern-code-review-a-case-study-at-google/
- `Code coverage at Google`
  - https://research.google/pubs/code-coverage-at-google/
- `Taming Google-Scale Continuous Testing`
  - https://research.google/pubs/taming-google-scale-continuous-testing/
- `Who Broke the Build?`
  - https://research.google/pubs/who-broke-the-build-automatically-identifying-changes-that-induce-test-failures-in-continuous-integration-at-google-scale/
- `SafeRevert`
  - https://research.google/pubs/saferevert-when-can-breaking-changes-be-automatically-reverted/
- `AI-assisted Assessment of Coding Practices in Industrial Code Review`
  - https://research.google/pubs/ai-assisted-assessment-of-coding-practices-in-industrial-code-review/

## Knowledge captured

Google does not appear to treat code review as an unmeasured social ritual. The surrounding system is instrumented and studied at scale.

Several mechanisms are especially relevant:

1. **Coverage information near the change** rather than only in a distant final report.
2. **Pre-submit and post-submit testing** instead of assuming all useful tests can run before merge.
3. **Culprit attribution** so a failure can be connected back to the change that likely caused it.
4. **Safe automatic rollback** when evidence reaches a sufficient confidence threshold.
5. **AI/ML as a review aid**, not as the sole authority.

Google's testing research also explicitly acknowledges a scale trade-off: it is not feasible to run every potentially impacted test before every change, so later-stage broader testing remains necessary. This is another example of multiple failure barriers rather than a single perfect pre-merge gate.

**Adoption status:** not decided.

---

# 6. Google — Code quality itself is treated as a productivity factor

## Evidence / observed practice

A 2022 Google Research study examined 39 developer-productivity factors and reported evidence that perceived code quality, technical debt, infrastructure/tool support, communication, goals/priorities, and organizational process are linked to developer productivity. The study also found that increases in perceived code quality tended to precede increases in perceived productivity.

Source:

- `What Improves Developer Productivity at Google? Code Quality.`
  - https://research.google/pubs/what-improves-developer-productivity-at-google-code-quality/

## Knowledge captured

Quality controls are not necessarily pure overhead. A process that prevents degradation can increase later development speed by reducing confusion, rework, breakages, and technical debt.

This matters when evaluating whether a new control is "too heavy": the comparison should include downstream maintenance/rework cost, not just the immediate time needed to run the control.

**Adoption status:** not decided.

---

# 7. Microsoft — The Playbook is itself an explicit mechanism for reducing repeated mistakes

## Evidence / observed practice

Microsoft's public ISE Engineering Fundamentals Playbook says engineers should know and follow their playbook, fix it if it is broken, copy a better playbook if they find one, and share their own if others can benefit.

The stated reasons for having the playbook include increasing team efficiency, reducing mistakes, avoiding common pitfalls, and learning from shared experience.

Source:

- Microsoft Engineering Fundamentals Playbook
  - https://microsoft.github.io/code-with-engineering-playbook/

## Knowledge captured

This is unusually close to the intended role of `web-project-guide`: the guide is not only documentation but a shared error-prevention system that is expected to evolve when reality reveals flaws.

The important point is that Microsoft explicitly gives practitioners permission/responsibility to **repair the process artifact itself** when it is broken, rather than treating the playbook as immutable policy.

**Adoption status:** strong research candidate, not accepted.

---

# 8. Microsoft — A single engineering checklist spans many quality domains

## Evidence / observed practice

Microsoft's Engineering Fundamentals Checklist covers areas including:

- code review process,
- minimum reviewers,
- linters / code analyzers,
- unit tests,
- successful builds,
- review turnaround,
- retrospectives,
- improvement experiments,
- engineering feedback,
- developer environment readiness,
- CI/CD,
- testing,
- security,
- observability,
- accessibility,
- documentation and other engineering fundamentals.

The checklist recommends a minimum number of reviewers, generally two, for PR merges and says this should be enforced by policy.

It also says teams should conduct retrospectives and identify a small number of improvement experiments with owners/backlog tracking.

Source:

- Microsoft Engineering Fundamentals Checklist
  - https://microsoft.github.io/code-with-engineering-playbook/engineering-fundamentals-checklist/

## Knowledge captured

Microsoft combines two layers:

1. **per-change enforcement**, such as reviews, builds, tests, and linters;
2. **process-level improvement**, such as retrospectives and improvement experiments.

That is consistent with NASA/CMMI: a project can pass today's gate while the process itself still needs improvement.

The checklist also shows an approach where common engineering domains are visible in one top-level cross-domain view rather than only hidden inside specialist documents.

**Adoption status:** not decided.

---

# 9. Microsoft — Pull requests are the enforced qualification boundary

## Evidence / observed practice

Microsoft's Playbook states that changes to a main codebase should be made via pull requests.

Before a PR, the author is expected to:

- follow coding conventions,
- compile/run without errors or warnings,
- write/update tests,
- make new and existing tests pass,
- update documentation.

PRs then enable code review and automated qualification such as:

- linting,
- compilation,
- unit tests,
- integration tests.

The Playbook says these requirements can and should be enforced by repository/work-item policies.

Source:

- Microsoft Engineering Fundamentals Playbook, Pull Requests
  - https://microsoft.github.io/code-with-engineering-playbook/code-reviews/pull-requests/

## Knowledge captured

This is an **enforcement-point architecture**: the important controls are tied to a change boundary (PR / shared branch entry) rather than relying on people to remember to execute them ad hoc.

This reinforces a lesson from Policy as Code research: a good rule is not enough if there is an unguarded path around the rule.

**Adoption status:** strong research candidate, not accepted.

---

# 10. Microsoft — Evidence and measures are part of code-review governance

## Evidence / observed practice

Microsoft's Playbook has a dedicated `Evidence and Measures` section for code review.

It suggests evidence including:

- main branches have branch policies,
- builds include appropriate linters and unit tests,
- bug work items link back to the PR that introduced them after diagnosis,
- bug work items record whether the bug could have been caught during code review,
- review checklists are updated from recurring issues,
- leads sample PRs/co-review to improve reviewer skill.

It also recommends review-process metrics such as defect removal efficiency and review time.

Source:

- Microsoft Engineering Fundamentals Playbook, Evidence and Measures
  - https://microsoft.github.io/code-with-engineering-playbook/code-reviews/evidence-and-measures/

## Knowledge captured

This is a direct feedback loop:

```text
Bug
→ identify introducing PR
→ ask whether review could have caught it
→ improve review checklist/process
→ sample future reviews
```

The defect is therefore not only fixed at the code level. It becomes evidence about whether the review system itself is missing a class of problem.

This is strongly aligned with the current `web-project-guide` research question.

**Adoption status:** strong research candidate, not accepted.

---

# 11. Microsoft — "Won't fix" is explicit and reasoned, not silent omission

## Evidence / observed practice

Microsoft's author guidance says review comments should be resolved, or explicitly marked `won't fix` with clear reasoning. If an issue is in scope, "I'll do it later" is not an acceptable reason. If it is out of scope, a separate work item should be created.

Source:

- Microsoft Engineering Fundamentals Playbook, Author Guidance
  - https://microsoft.github.io/code-with-engineering-playbook/code-reviews/process-guidance/author-guidance/

## Knowledge captured

This mirrors NASA/NIST/ISO distinctions between:

- satisfied,
- not applicable,
- deferred/out of scope with tracking,
- exception / consciously not satisfied,
- silently missed.

The critical feature is visibility: a consciously rejected finding remains part of the record with rationale.

**Adoption status:** strong research candidate, not accepted.

---

# 12. Microsoft — Automated checks free humans to focus on contextual correctness

## Evidence / observed practice

Microsoft's reviewer guidance explicitly says parts of review can be automated with linters and similar tools so human reviewers can focus on:

- business-logic correctness,
- correctness of tests,
- readability,
- maintainability,
- architecture/design.

Source:

- Microsoft Engineering Fundamentals Playbook, Reviewer Guidance
  - https://microsoft.github.io/code-with-engineering-playbook/code-reviews/process-guidance/reviewer-guidance/

## Knowledge captured

The architecture is not `human OR automation`; it is **automation for deterministic/repetitive checks + humans for context-dependent judgment**.

This matches the academic research finding that full compliance automation still struggles with context-heavy interpretation.

**Adoption status:** not decided.

---

# 13. Microsoft — CI failures are treated as urgent shared-state failures

## Evidence / observed practice

Microsoft's CI/CD guidance says quality pipelines should run on each PR/update of main and that integration/build failures are treated as the highest priority for the team, generally stopping work until repaired.

The same guidance notes that AI-assisted CI/CD authoring should still use human review, safe validation, linting, security/license scans, idempotence checks, rollback planning, and reusable vetted templates.

Source:

- Microsoft Engineering Fundamentals Playbook, CI/CD
  - https://microsoft.github.io/code-with-engineering-playbook/CI-CD/

## Knowledge captured

A shared branch is treated as a **health invariant**. Allowing broken state to persist creates secondary costs for everyone else.

The AI-specific guidance also reinforces a recurring pattern in this research: generated automation is not exempt from review. The automation artifact itself is controlled and validated.

**Adoption status:** not decided.

---

# 14. GitHub — Platform-level branch controls create multiple independent merge barriers

## Evidence / observed practice

GitHub's branch protection/ruleset features can require combinations of:

- pull request review,
- a configured number of approvals,
- Code Owner review,
- successful required status checks,
- up-to-date branch state before merge,
- conversation resolution,
- signed commits,
- linear history,
- successful deployment,
- merge queue,
- restrictions on who can push,
- prohibition of bypass.

GitHub can also dismiss stale approvals when new commits change the reviewed diff. Another option requires the most recent reviewable push to be approved by someone other than the person who pushed it.

Sources:

- GitHub Docs, About protected branches
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
- GitHub Docs, Managing a branch protection rule
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule

## Knowledge captured

GitHub's platform supports a **composed gate**, not a single pass/fail condition.

Important mechanics include:

- an approval is tied to a specific reviewed diff state and can become stale,
- a change can require different independent conditions before merge,
- bypass is itself configurable and can be prohibited,
- deployment success can be a merge condition rather than only a later operational check.

This is highly relevant to evidence invalidation: when the underlying change changes, previous review evidence may no longer be valid.

Note: these are GitHub product capabilities. This research does not infer from them that GitHub internally uses every capability in the same way.

**Adoption status:** strong research candidate, not accepted.

---

# 15. GitHub — CODEOWNERS connects changed paths to responsible expertise

## Evidence / observed practice

GitHub CODEOWNERS can automatically request review from owners when a PR modifies files they own. Branch protection/rulesets can require Code Owner approval.

GitHub documentation also recommends protecting the CODEOWNERS file itself so an attacker/contributor cannot simply change ownership rules and then approve unrelated sensitive changes.

Source:

- GitHub Docs, About code owners
  - https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners

## Knowledge captured

This is another path-based applicability mechanism:

```text
changed artifact
→ ownership mapping
→ required reviewer
```

The protection of the ownership definition itself is especially important. A routing/ownership configuration is a security/quality control surface and therefore may need stronger protection than ordinary content.

**Adoption status:** strong research candidate, not accepted.

---

# 16. GitHub — Merge queue revalidates a change against the real target state

## Evidence / observed practice

GitHub merge queues can require a PR's required checks to pass after the PR is applied to the latest target branch and other queued PRs, instead of trusting only the earlier isolated PR result.

Source:

- GitHub Docs, About protected branches / merge queue
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
- GitHub Docs, Managing a merge queue
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue

## Knowledge captured

A test result can become stale because the environment it was tested against changed.

The merge queue solves a specific stale-evidence problem:

```text
PR passed tests earlier
+ target branch changed
≠ proof that the merged result is still valid
```

The system therefore re-runs the required conditions in a closer approximation of the actual merge state.

This is a concrete example of **evidence validity depending on context/version**, a concept that also appeared in Safety Case research.

**Adoption status:** strong research candidate, not accepted.

---

# 17. Meta — Every diff is reviewed, but the review system is optimized for throughput

## Evidence / observed practice

Meta's engineering blog states that every diff must be reviewed without exception and that code reviews are considered one of the most important parts of the software development process.

Meta also measures review delay and built reviewer recommendation systems using factors such as file ownership and working hours. The recommender supports backtesting and automatic retraining.

Source:

- Meta Engineering, `Move faster, wait less: Improving code review time at Meta`
  - https://engineering.fb.com/2022/11/16/culture/meta-code-review-time-improving/

## Knowledge captured

Mandatory review can become a bottleneck unless reviewer selection and review latency are engineered as first-class system problems.

Meta's use of reviewer recommendation is relevant to future automated routing, but its backtesting/retraining mechanism is equally important: a routing model is not assumed to stay correct forever as files, teams, and responsibilities change.

**Adoption status:** not decided.

---

# 18. Meta — Regression detection is a multi-signal system across the lifecycle

## Evidence / observed practice

Meta's `Fix Fast` work describes regression signals coming from:

- automated tests,
- static analysis,
- performance logs,
- crash dumps,
- bug reports,
- production monitoring alarms,
- other sources.

Signals can appear at IDE time, review time, CI time, after landing, or in production.

Meta observed that defects found later cost much more engineer time to fix, so it invested in moving detection earlier (`shift left`). It also uses heuristics/ML to choose tests appropriate to each stage at scale.

Source:

- Meta Engineering, `Faster, more efficient systems for finding and fixing regressions`
  - https://engineering.fb.com/2021/02/17/developer-tools/fix-fast/

## Knowledge captured

This is another strong real-world example that no single check catches everything.

Meta's model is essentially:

```text
IDE signals
+ review signals
+ CI signals
+ post-merge signals
+ production signals
→ combined regression-control system
```

The organization accepts that later detection layers remain necessary even after earlier layers improve.

**Adoption status:** strong research candidate, not accepted.

---

# 19. Meta — Signal quality matters; too many checks can reduce reliability

## Evidence / observed practice

Meta reports that the volume of automated signals became large enough that important problems could be drowned out by noisy or low-priority signals.

The Fix Fast program therefore measured whether signals produced `meaningful action`, removed unhealthy/noisy bots, deduplicated signals, and tuned detection thresholds.

Meta reports an example where reducing noise improved the meaningful-action ratio for one detector.

Source:

- Meta Engineering, Fix Fast
  - https://engineering.fb.com/2021/02/17/developer-tools/fix-fast/

## Knowledge captured

More checks are not automatically safer.

A zero-miss system can create a paradox:

```text
add many warnings
→ reviewer attention fragments
→ important warning gets ignored
→ effective detection quality decreases
```

Therefore signal precision, deduplication, severity, prioritization, and actionability are themselves part of safety/reliability.

This is a major warning for `web-project-guide`: blindly adding more checklist items or validator warnings can make the system less trustworthy.

**Adoption status:** strong research candidate, not accepted.

---

# 20. Meta — Ownership attribution is treated as a measurable engineering problem

## Evidence / observed practice

Meta's Fix Fast work found that tasks routed to the wrong owner can spend a large portion of their cycle time being reassigned. It introduced ownership prediction and a simple `I'm not the right owner` action that invokes the next-best assignment prediction.

Meta also uses the resulting feedback to improve the ownership-selection algorithm over time.

Source:

- Meta Engineering, Fix Fast
  - https://engineering.fb.com/2021/02/17/developer-tools/fix-fast/

## Knowledge captured

Routing correctness can be improved through explicit negative feedback.

Instead of forcing the wrong recipient to solve the routing problem manually, the system treats `wrong owner` as training/evaluation data for the router.

This suggests that a future rule-routing system could record `routed but irrelevant` / `missing owner` outcomes and use them to improve mappings.

**Adoption status:** not decided.

---

# 21. Meta — Land-blocking can activate only after an area reaches a clean state

## Evidence / observed practice

Meta's Fix Fast example for Java `NullSafe` uses static analysis and an annotation to mark a class once it is clean. After a class reaches the clean condition, regressions can be blocked from being promoted if new NullSafe issues appear.

Source:

- Meta Engineering, Fix Fast
  - https://engineering.fb.com/2021/02/17/developer-tools/fix-fast/

## Knowledge captured

This is a useful migration pattern:

```text
legacy state may contain known debt
→ clean incrementally
→ once an area is clean, enforce no-regression gate
```

A new strict rule therefore does not necessarily require fixing an entire historical repository before it can become useful. It can establish a **ratchet**: future changes may not make the clean state worse.

**Adoption status:** strong research candidate, not accepted.

---

# 22. Meta — Tests themselves are monitored because validators can deteriorate

## Evidence / observed practice

Meta's flakiness work explicitly says automated regression tests are software and can become unreliable as the codebase evolves. Flaky tests can create false/nondeterministic signals and reduce engineers' trust in the entire test system.

Meta therefore developed automated methods to detect test flakiness rather than assuming a test is permanently trustworthy.

Source:

- Meta Engineering, `How do you test your tests?`
  - https://engineering.fb.com/2020/12/10/developer-tools/probabilistic-flakiness/

## Knowledge captured

This independently confirms the Safety-Critical / Policy-as-Code lesson:

> checker health is part of system health.

A validator that was reliable six months ago may become noisy, stale, or incorrect. Trust should be continuously earned by observed behavior.

**Adoption status:** strong research candidate, not accepted.

---

# 23. Meta — Federation Platform operationalizes compliance as a complete work lifecycle

## Evidence / observed practice

Meta's Federation Platform and Privacy Waves are used to manage large-scale privacy compliance work and are being expanded to areas including security and accessibility.

A workstream can define code/configuration for:

1. **scraping / detection** of potential compliance flags,
2. **scope filters / linters**,
3. **ownership resolution** using a central asset catalog,
4. **grouping** related flags,
5. **actioning** via a task or automated code change,
6. **task content** with rationale, context, documentation, and resolution steps,
7. **distribution** through predictable waves,
8. **resolution logic** that determines whether an issue is actually fixed,
9. **automatic closure** when resolution is verified,
10. **automatic reopening** if a task was closed prematurely.

Meta also describes review committees, workstream health signals, completion rates, deferral rates, developer-friction metrics, developer sentiment, nudges/escalations, and standardized completion evidence.

Source:

- Meta Engineering, `Federation Platform and Privacy Waves: How Meta distributes compliance-related tasks at scale`
  - https://engineering.fb.com/2025/08/11/security/federation-platform-privacy-waves-meta-distributes-compliance-tasks/

## Knowledge captured

This is one of the closest real-world analogues found so far to a possible future `web-project-guide` automated governance system.

The key structure is:

```text
obligation / risk
→ machine-assisted detection
→ resolve applicable asset owner
→ actionable task
→ remediation / automated change
→ verify underlying condition
→ close only when condition is truly fixed
→ reopen if closure was premature
→ retain standardized evidence
→ measure process quality
→ improve task/workstream
```

This goes materially beyond a checklist. It operationalizes the entire compliance lifecycle.

**Adoption status:** strong research candidate, not accepted.

---

# 24. Meta — Compliance task quality is itself reviewed and measured

## Evidence / observed practice

Meta says Privacy Waves workstreams receive review of task quality/content. Workstreams track metrics such as:

- completion rate,
- open tasks,
- deferral rate,
- developer friction,
- broken tooling,
- inadequate support,
- developer sentiment.

Low-quality/low-value work can be filtered by lints before distribution. Teams receive predictable batched work rather than random ad-hoc tasks.

Source:

- Meta Federation Platform / Privacy Waves article
  - https://engineering.fb.com/2025/08/11/security/federation-platform-privacy-waves-meta-distributes-compliance-tasks/

## Knowledge captured

A compliance system can fail even when the underlying requirement is correct if the generated task is confusing, noisy, assigned badly, or operationally expensive.

Therefore the **quality of the control-delivery mechanism** must itself be reviewed.

The use of predictable waves also demonstrates that strict governance does not have to mean constant interrupt-driven work. Scheduling/cadence is part of developer experience.

**Adoption status:** not decided.

---

# 25. Meta — Central automation is preferred before distributing manual remediation

## Evidence / observed practice

Meta describes a hierarchy where privacy teams:

- first translate obligations into product requirements,
- develop platform/infrastructure solutions where possible,
- centrally automate bulk remediation where possible,
- distribute manual product-team tasks only when expert local action is needed.

Source:

- Meta Federation Platform / Privacy Waves article
  - https://engineering.fb.com/2025/08/11/security/federation-platform-privacy-waves-meta-distributes-compliance-tasks/

## Knowledge captured

This is an important operational principle:

> do not turn every compliance obligation into a manual checklist item if it can be removed or enforced structurally upstream.

The highest-leverage control may be to redesign infrastructure so the bad state becomes impossible or automatically repaired, leaving humans only with genuinely contextual decisions.

**Adoption status:** strong research candidate, not accepted.

---

# 26. Meta — Automated mass changes still retain human review and explanation

## Evidence / observed practice

Meta's CodemodService can generate company-wide code changes. Its dead-code cleanup system has produced hundreds of thousands of change requests and deleted very large amounts of code.

Generated changes include human-readable descriptions explaining why the analysis considers the code removable, and the generated code changes are reviewed.

Source:

- Meta Engineering, `Automating dead code cleanup`
  - https://engineering.fb.com/2023/10/24/data-infrastructure/automating-dead-code-cleanup/

## Knowledge captured

Large-scale automation does not eliminate the need for explainability or review. It can instead generate **review-ready remediation artifacts** with rationale.

This is relevant to future AI-generated fixes from a rule system: automation should carry the evidence/rationale that lets a reviewer understand why the change was generated.

**Adoption status:** not decided.

---

# 27. Cross-organization pattern — Quality control is layered across time

## Observed convergence

Across Google, Microsoft, GitHub's platform controls, and Meta, the following layers recur:

```text
Author self-check / local tooling
↓
Code review
↓
Specialist / owner review where needed
↓
Automated pre-merge qualification
↓
Merge-time / target-state revalidation
↓
Post-merge continuous testing
↓
Production monitoring / regression detection
↓
Incident / bug attribution
↓
Process / checklist / rule improvement
```

No organization studied here publicly claims that a single pre-merge review catches everything.

## Finding

This strongly reinforces the multi-barrier model already observed in NASA, NIST, ISO, Safety-Critical engineering, Policy as Code, and academic traceability research.

**Adoption status:** strong research candidate, not accepted.

---

# 28. Cross-organization pattern — Old evidence becomes stale after relevant change

## Observed convergence

Examples:

- GitHub can dismiss stale approvals when the reviewed diff changes.
- Merge queue revalidates against current target-branch state.
- Meta retrains/re-evaluates reviewer routing as teams/files change.
- Meta monitors tests because they can deteriorate.
- Google performs both pre-submit and later post-submit testing because full validation at one earlier point is infeasible.

## Finding

Evidence is not timeless. An approval/test/router result can become invalid after changes in:

- the diff,
- target branch,
- ownership,
- test reliability,
- runtime/environment,
- system context.

A future `web-project-guide` evidence model may need explicit invalidation/recheck triggers rather than permanent `passed=true` state.

**Adoption status:** strong research candidate, not accepted.

---

# 29. Cross-organization pattern — Ownership/routing configuration is itself critical infrastructure

## Observed convergence

- Google selects reviewers based on expertise/ownership and adds specialist reviewers where needed.
- GitHub CODEOWNERS maps changed paths to reviewers and recommends protecting the CODEOWNERS definition itself.
- Meta uses ownership-resolution algorithms and a central asset catalog.
- Meta measures wrong-owner routing and improves its model from feedback.

## Finding

Rule applicability and ownership mapping are not minor metadata. If they are wrong, the correct reviewer/task/rule may never be invoked.

Therefore the router/ownership definition deserves:

- version control,
- tests,
- protection against casual modification,
- observability,
- error feedback,
- periodic validation.

**Adoption status:** strong research candidate, not accepted.

---

# 30. Cross-organization pattern — Noise reduction is part of safety

## Observed convergence

- Google encourages small changes and distinguishes blocking findings from nits.
- Microsoft distinguishes resolved / won't-fix / out-of-scope work and recommends compact PRs.
- Meta measures signal actionability and removes noisy detectors.
- GitHub allows multiple gate types but does not require every possible gate for every repository.

## Finding

High recall alone is not enough. A reliable system also needs to manage reviewer attention.

Possible future dimensions to research further:

- severity,
- deduplication,
- owner relevance,
- grouping,
- suppressing stale/non-actionable findings,
- explicit `not applicable` without hiding unconsidered rules,
- keeping hard failures rare enough that they retain credibility.

**Adoption status:** strong research candidate, not accepted.

---

# 31. Cross-organization pattern — Reviewer/checker capability must be improved over time

## Observed convergence

- Microsoft suggests lead sampling/co-review and updating checklists from recurring defects.
- Meta measures reviewer routing and test signal quality.
- Google studies code review, CI, coverage, and AI review tools at industrial scale.
- Meta tests the tests themselves.

## Finding

A review system is not static infrastructure. Its humans, tools, rules, and routing models can all deteriorate or improve.

A mature system therefore needs improvement loops for:

- reviewers,
- checklists,
- automated validators,
- routing/ownership mapping,
- test quality,
- signal thresholds,
- task quality.

**Adoption status:** strong research candidate, not accepted.

---

# 32. Possible future design implications for `web-project-guide` — NOT adopted

The following are synthesis candidates only and are **not requirements**:

1. Treat each meaningful change as a unit with a clear purpose, affected areas, and expected evidence.
2. Resolve domain ownership/rules from changed artifacts and project/runtime context.
3. Add specialist rule/review paths for domains where a generic review is insufficient.
4. Keep PR/change size and scope as risk inputs because review completeness degrades on large changes.
5. Bind approvals/evidence to a specific change/version and invalidate them when relevant inputs change.
6. Put deterministic checks at an unavoidable enforcement point rather than relying on memory.
7. Keep later post-merge/post-deploy checks because pre-merge validation is never complete.
8. Feed real bugs/omissions back into the checklist/router/rules instead of fixing only the local incident.
9. Measure false positives/noisy rules so zero-miss efforts do not destroy reviewer attention.
10. Protect and test the routing/ownership/validator configuration itself.
11. Record explicit non-application / won't-fix / deferred states rather than losing them.
12. Where possible, redesign infrastructure so classes of error become impossible or centrally fixable instead of generating repetitive manual tasks.
13. Consider a future lifecycle resembling Meta Federation Platform for large-scale rule application:

```text
Detect
→ Determine applicability/owner
→ Create actionable task/change
→ Remediate
→ Verify underlying condition
→ Close/reopen automatically
→ Store evidence
→ Measure task/control health
→ Improve rule/detector/router
```

**Adoption status:** not decided.

---

# 33. Important limitations of this evidence family

- Public engineering documentation is selective and does not expose every internal process.
- Google Engineering Practices documentation reflects public descriptions of practices, but implementation details of internal enforcement/ownership systems are only partially public.
- Microsoft ISE Engineering Fundamentals Playbook is a public engineering playbook for ISE/customer-partner engagements and should not automatically be treated as the single universal Microsoft-wide development process.
- GitHub branch protection/CODEOWNERS/merge queue evidence in this file documents **GitHub product capabilities**. It is useful as an existence proof for enforceable controls, but is not evidence that GitHub internally uses every control in every repository.
- Meta engineering posts describe selected internal systems and successes; they may omit failed experiments, costs, exceptions, or organizational details.
- Large-organization scale changes the economics: a tool saving 1% may be worth substantial investment at Google/Meta but not for one-person projects.
- Conversely, some controls are cheaper for a one-person GitHub workflow because GitHub Actions and machine-readable repositories can automate parts that historically required large organizations.

---

# 34. Open questions raised by this pass

- Can `web-project-guide` automatically infer changed domains from file paths/content in a way analogous to CODEOWNERS / Meta ownership resolution?
- Should a future rule router support both positive routing and explicit `wrong route` feedback to improve mappings?
- How should evidence become stale after a rule, target branch, runtime, deployment, or project profile changes?
- Can the guide adopt a `ratchet` model: once an area meets a new quality baseline, prevent regression without requiring the whole legacy repository to be cleaned immediately?
- Which checks should be hard blockers, which warnings, and which audit-only signals to avoid alert fatigue?
- How can a single developer simulate specialist/independent review without pretending the same AI pass is truly independent?
- Can deterministic validators + separate AI review prompts/models provide sufficiently different failure modes to be useful?
- Should every guide failure create a structured link from defect → missed control → root cause → rule/router/checklist update, similar to Microsoft's evidence practice?
- Could a future compliance/task system automatically reopen a supposedly completed item when repository evidence shows the condition is no longer true, similar to Meta Federation Platform resolution logic?
- How much of Meta's Federation Platform can be approximated using only GitHub Issues/Projects/Actions/Rulesets plus machine-readable guide data?
- How do large organizations formally control and test changes to their own central policy/routing repositories?
