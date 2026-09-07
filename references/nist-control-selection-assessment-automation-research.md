# NIST Control Selection / Assessment / Automation Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**. It intentionally records mechanisms even when they are currently too heavy, expensive, security-specific, or technically unavailable to reproduce in this project.

## Research Question

How does NIST structure the selection, tailoring, implementation, assessment, monitoring, machine-readable representation, and remediation of large control sets so that organizations can reduce missed applicability and compliance obligations?

This is not limited to security-specific conclusions. The purpose is to capture reusable system-design mechanisms for a general rule-application reliability problem.

---

# 1. RMF separates the lifecycle into explicit stages

## Evidence / observed practice

NIST Risk Management Framework (RMF) uses these major stages:

1. Prepare
2. Categorize
3. Select
4. Implement
5. Assess
6. Authorize
7. Monitor

The steps intentionally separate:

- determining system characteristics and impact,
- selecting/tailoring controls,
- implementing them,
- assessing whether they are actually implemented and effective,
- making a risk-based approval decision,
- monitoring afterward.

Source:

- NIST Risk Management Framework overview
  - https://csrc.nist.gov/projects/risk-management/about-rmf

## Knowledge captured

NIST, like NASA, does not treat routing/selection as proof of completion. Selection, implementation, assessment, and ongoing monitoring are distinct control barriers.

A system can therefore fail at multiple distinct places:

- incorrect categorization,
- wrong baseline selection,
- bad tailoring,
- missing implementation,
- ineffective implementation,
- failed assessment,
- stale post-authorization state.

**Adoption status:** not decided.

---

# 2. Categorization is based on impact, not merely product type

## Evidence / observed practice

In the RMF Categorize step, NIST determines impact associated with loss of confidentiality, integrity, and availability. The categorization process documents system characteristics, establishes the security category, and includes review/approval of the categorization decision.

FIPS 199 and SP 800-60 support mapping information/system types to low, moderate, or high impact levels.

Source:

- NIST RMF Categorize Step
  - https://csrc.nist.gov/projects/risk-management/about-rmf/categorize-step

## Knowledge captured

Like NASA, NIST separates persistent/system characteristics from the eventual control set. Product labels alone are insufficient to determine applicability.

The decision is also a recorded and reviewed artifact rather than an invisible classifier output.

**Adoption status:** not decided.

---

# 3. Categorization establishes the initial baseline rather than the final rule set

## Evidence / observed practice

NIST SP 800-53B defines three security control baselines for low-, moderate-, and high-impact systems, plus a privacy baseline.

The initial baseline is selected based on system impact level. It is explicitly a starting point, not the final project-specific control set.

Sources:

- NIST SP 800-53B
  - https://csrc.nist.gov/pubs/sp/800/53/b/upd1/final
- NIST RMF Select Step
  - https://csrc.nist.gov/projects/risk-management/about-rmf/select-step

## Knowledge captured

A baseline can reduce omission risk because a class/impact decision resolves to a known complete starting set rather than requiring users to rediscover applicable controls one-by-one.

But NIST does not assume the baseline alone is sufficient. Tailoring follows.

**Adoption status:** not decided.

---

# 4. Tailoring is a first-class process with defined operations

## Evidence / observed practice

NIST tailoring is not an informal "remove whatever seems unnecessary" step. SP 800-53/53B and RMF guidance identify structured tailoring actions such as:

- identifying common controls,
- applying scoping considerations,
- selecting compensating controls when needed,
- assigning organization-defined control parameters,
- supplementing the baseline with additional controls/control enhancements,
- providing additional implementation information.

Tailoring can occur organization-wide, system-specifically, or through a combination of both.

Sources:

- NIST RMF Select Step
  - https://csrc.nist.gov/projects/risk-management/about-rmf/select-step
- NIST tailoring glossary entry
  - https://csrc.nist.gov/glossary/term/tailoring
- NIST SP 800-53 Rev. 5 controls PL-10 / PL-11
  - https://csrc.nist.gov/projects/risk-management/sp800-53-controls/downloads

## Knowledge captured

NIST models applicability customization as a controlled transformation of a known baseline.

Conceptually:

```text
Catalog
→ baseline
→ structured tailoring
→ final project/system profile
```

This is different from ad-hoc routing where a rule exists only if a router happens to discover it.

**Adoption status:** not decided.

---

# 5. NIST distinguishes common, hybrid, and system-specific controls

## Evidence / observed practice

The RMF Select step includes designation of controls as:

- common,
- hybrid,
- system-specific.

Controls are then allocated to specific system components.

Common controls can serve multiple systems. If a shared/common control is weaker than a higher-impact system requires, the higher-impact system must supplement the deficit.

Sources:

- NIST RMF Select Step
  - https://csrc.nist.gov/projects/risk-management/about-rmf/select-step
- NIST RMF Categorize Step FAQs
  - https://csrc.nist.gov/CSRC/media/Projects/risk-management/documents/02-Categorize%20Step/NIST%20RMF%20Categorize%20Step-FAQs.pdf

## Knowledge captured

NIST separates:

- rules/controls satisfied globally once,
- rules partly satisfied by shared infrastructure and partly locally,
- rules that must be satisfied separately for a specific system.

This is potentially relevant to multi-repository and account-level infrastructure because a shared control can exist without pretending every project independently implements it.

**Adoption status:** not decided.

---

# 6. Overlays provide reusable specialization on top of baselines

## Evidence / observed practice

SP 800-53B supports control overlays for specific communities of interest, technologies, or environments of operation.

An overlay can tailor/customize an existing baseline for a recurring context. NIST also provides a Security Control Overlay Repository for sharing overlays.

Sources:

- NIST SP 800-53B
  - https://csrc.nist.gov/pubs/sp/800/53/b/upd1/final
- NIST announcement on SP 800-53B
  - https://www.nist.gov/news-events/news/2020/10/control-baselines-information-systems-and-organizations-nist-publishes-sp

## Knowledge captured

This resembles reusable project/domain packs, but with an important structural difference: the overlay is applied to a known baseline instead of replacing the baseline.

That helps avoid a recurring context accidentally removing universal obligations.

**Adoption status:** not decided.

---

# 7. NIST has historically built tools specifically to make tailoring safer and machine-readable

## Evidence / observed practice

NIST developed `Baseline Tailor`, a software tool for navigating and tailoring SP 800-53 controls. The published rationale identifies barriers including:

- complexity of tailoring rules,
- differences between frameworks,
- lack of a machine-readable format for tailored controls.

The tool generated XML capturing tailoring choices/profile information.

Sources:

- NISTIR 8130, Baseline Tailor User Guide
  - https://www.nist.gov/publications/baseline-tailor-user-guide
- NIST Journal of Research, Baseline Tailor
  - https://www.nist.gov/publications/baseline-tailor

## Knowledge captured

NIST treated control-selection complexity as a tooling problem, not only a documentation problem.

A human-readable rule book can coexist with a machine-readable representation and a dedicated selection/tailoring interface.

**Adoption status:** not decided.

---

# 8. OSCAL turns control/compliance artifacts into structured data

## Evidence / observed practice

NIST Open Security Controls Assessment Language (OSCAL) represents security/control information in structured machine-readable formats such as JSON, XML, and YAML.

Current OSCAL model families include:

- Catalog
- Profile
- Component Definition
- System Security Plan
- Assessment Plan
- Assessment Results
- Plan of Action and Milestones (POA&M)
- Control Mapping (in newer releases)

Sources:

- OSCAL Layers and Models
  - https://pages.nist.gov/OSCAL/learn/concepts/layer/
- OSCAL reference
  - https://pages.nist.gov/OSCAL-Reference/models/

## Knowledge captured

NIST does not keep everything as prose documents. The control lifecycle is represented as linked machine-readable artifacts.

This opens the possibility of:

- automated validation,
- interoperability between tools,
- consistent IDs,
- automated comparison,
- continuous assessment,
- reuse of control implementation data,
- generation of human-readable reports from structured source data.

**Adoption status:** not decided.

---

# 9. OSCAL Catalog and Profile separate the full rule universe from the applicable tailored set

## Evidence / observed practice

In OSCAL:

- the Catalog model expresses the complete set of controls,
- the Profile model selects, organizes, and tailors controls from one or more catalogs.

A profile may add, change, remove, or parameterize control material. Controls used later in implementation and assessment must first be selected through the control-layer structures.

Source:

- OSCAL Layers and Models
  - https://pages.nist.gov/OSCAL/learn/concepts/layer/

## Knowledge captured

This creates a clean structural distinction between:

```text
all known rules
vs
resolved applicable rule set
```

That is highly relevant to omission prevention because "not present in the profile" can be investigated relative to an authoritative catalog rather than being indistinguishable from "nobody remembered the rule existed."

**Adoption status:** strong research candidate, not accepted.

---

# 10. Implementation is recorded separately from selection

## Evidence / observed practice

The RMF Implement step requires implementation of selected controls and updating plans to reflect how controls are actually implemented.

OSCAL's implementation layer includes system/component representations that can describe implementation details and reusable control implementation by components/services.

Sources:

- NIST RMF Implement Step
  - https://csrc.nist.gov/projects/risk-management/about-rmf/implement-step
- OSCAL Layers and Models
  - https://pages.nist.gov/OSCAL/learn/concepts/layer/

## Knowledge captured

A selected rule should not be considered satisfied merely because it was routed/read. NIST explicitly preserves a later implementation-state representation.

**Adoption status:** not decided.

---

# 11. Assessment asks whether controls are correct, operating, and producing the intended result

## Evidence / observed practice

The RMF Assess step asks whether controls are:

- implemented correctly,
- operating as intended,
- producing the desired security/privacy outcome.

Assessment produces plans, reports, remediation actions, updates to implementation documentation, and POA&M items.

Source:

- NIST RMF Assess Step
  - https://csrc.nist.gov/projects/risk-management/about-rmf/assess-step

## Knowledge captured

This goes beyond a binary "rule present" check.

It distinguishes at least three failure types:

1. not implemented,
2. implemented incorrectly/not operating,
3. technically operating but failing the intended outcome.

For a general guide, this suggests that structural validator success and behavioral completion evidence may need to remain separate concepts.

**Adoption status:** not decided.

---

# 12. Assessment procedures are decomposed into more testable units

## Evidence / observed practice

SP 800-53A defines assessment procedures corresponding to controls. NIST's RMF assessment material describes controls being decomposed into more granular determination statements and, for automated assessment, defect checks that compare desired versus actual state/behavior.

NIST redesigned SP 800-53A Revision 5 assessment-procedure structure partly to better support automated tools, continuous monitoring, and ongoing authorization.

Sources:

- NIST RMF Assess Step
  - https://csrc.nist.gov/projects/risk-management/about-rmf/assess-step
- NIST announcement for SP 800-53A Rev. 5
  - https://www.nist.gov/news-events/news/2022/01/nist-updates-security-and-privacy-control-assessment-procedures

## Knowledge captured

A prose requirement can have a separately structured assessment definition.

This suggests a general pattern:

```text
Rule statement
→ assessment objective / determination statement
→ concrete test / evidence method
→ actual result
```

This may be more reliable than embedding all verification logic inside prose Rule text.

**Adoption status:** strong research candidate, not accepted.

---

# 13. Assessment can be automated by comparing desired and actual state

## Evidence / observed practice

NIST's RMF assessment guidance explicitly discusses automated assessments in which defined defect checks compare a desired state/behavior with the actual state/behavior.

Source:

- NIST RMF Assess Step
  - https://csrc.nist.gov/projects/risk-management/about-rmf/assess-step

## Knowledge captured

The machine-readable rule/applicability layer can support more than routing. Where a requirement is objectively testable, the same system can potentially generate executable checks or feed automated assessment tools.

Not all requirements are automatable, but NIST deliberately creates structures that allow automation where possible.

**Adoption status:** not decided.

---

# 14. Assessment Plan exists before assessment and fixes scope/method explicitly

## Evidence / observed practice

The OSCAL Assessment Plan model captures information about:

- assessment scope,
- assessment subject/target,
- schedule/milestones,
- assessment activities/procedures,
- assets,
- roles/parties,
- continuous monitoring frequency and method.

Assessment practitioners consume the plan to ensure the intended scope and activities are honored.

Source:

- OSCAL Assessment Plan Model
  - https://pages.nist.gov/OSCAL/learn/concepts/layer/assessment/assessment-plan/

## Knowledge captured

A claim such as "full audit" can be made concrete by materializing its intended scope/method before performing it.

This reduces the risk that the evaluator unconsciously narrows the audit while executing it.

**Adoption status:** strong research candidate, not accepted.

---

# 15. Assessment Results are first-class structured artifacts with evidence/findings

## Evidence / observed practice

The OSCAL assessment layer is designed to report assessment findings and supporting evidence for periodic or continuous assessments.

Assessment Results connect back to an assessment plan and system-specific control set.

Source:

- OSCAL Assessment Layer
  - https://pages.nist.gov/OSCAL/learn/concepts/layer/assessment/

## Knowledge captured

NIST preserves the distinction between:

- what was supposed to be assessed,
- what was actually observed,
- what evidence supports that observation,
- what finding resulted.

This helps prevent a generic "checked" status from hiding incomplete evidence.

**Adoption status:** not decided.

---

# 16. POA&M keeps unresolved findings visible after assessment

## Evidence / observed practice

OSCAL's Plan of Action and Milestones (POA&M) model represents known risks, deviations, remediation plans, milestones, and disposition/status.

It supports concepts such as:

- source of discovery,
- risk/weakness description,
- recommendation,
- remediation plan,
- status,
- false positive,
- risk acceptance,
- risk adjustment/deviation.

Sources:

- OSCAL Assessment Layer
  - https://pages.nist.gov/OSCAL/learn/concepts/layer/assessment/
- OSCAL POA&M Model
  - https://pages.nist.gov/OSCAL/learn/concepts/layer/assessment/poam/

## Knowledge captured

A failed check does not disappear merely because the assessment phase ended. The unresolved item becomes a separately tracked object with status and remediation history.

This provides a model for preventing known omissions/defects from being lost between audits or conversations.

**Adoption status:** not decided.

---

# 17. Continuous monitoring treats compliance as time-varying

## Evidence / observed practice

The RMF Monitor step maintains ongoing awareness of system/security/privacy posture.

NIST SP 800-137 defines continuous monitoring around visibility into assets, threats/vulnerabilities, and effectiveness of deployed controls, with ongoing assurance that controls remain aligned with risk tolerance.

Outcomes include ongoing control assessments, analysis of monitoring output, responses to findings, reporting, and ongoing authorization using monitoring results.

Sources:

- NIST RMF Monitor Step
  - https://csrc.nist.gov/projects/risk-management/about-rmf/monitor-step
- NIST SP 800-137
  - https://csrc.nist.gov/pubs/sp/800/137/final

## Knowledge captured

A control that passed once is not permanently compliant.

Changes in implementation, environment, dependencies, threats, or requirements can invalidate earlier evidence.

This reinforces the idea that rule applicability/compliance has a lifecycle and may require re-evaluation triggers or continuous checks.

**Adoption status:** not decided.

---

# 18. The monitoring system itself can be assessed

## Evidence / observed practice

NIST SP 800-137A provides a method to assess an Information Security Continuous Monitoring program itself, including the completeness/effectiveness of monitoring strategies, policies, procedures, operations, and analysis of monitoring data.

Source:

- NIST RMF Monitor Step
  - https://csrc.nist.gov/projects/risk-management/about-rmf/monitor-step

## Knowledge captured

Like NASA's assurance/IV&V surveillance, NIST recognizes that the checking mechanism itself can be incomplete or ineffective and therefore also needs evaluation.

This is a recurring cross-source pattern:

```text
system
→ checker
→ checker-of-checker / monitoring-program assessment
```

**Adoption status:** not decided.

---

# 19. Machine-readable source data supports multiple derived human formats

## Evidence / observed practice

NIST publishes SP 800-53 controls and baselines in multiple derivative formats including XML, CSV, spreadsheets, and OSCAL, while stating that the normative publications remain authoritative if discrepancies exist.

Sources:

- NIST SP 800-53 Downloads
  - https://csrc.nist.gov/projects/risk-management/sp800-53-controls/downloads

## Knowledge captured

A practical architecture can have:

- one authoritative normative source,
- structured machine-readable derivative data,
- generated/searchable/user-friendly views,
- validators that detect divergence.

Machine-readable support does not require making the machine format the only human-readable source of truth.

**Adoption status:** not decided.

---

# 20. OSCAL explicitly tracks content change identity/version metadata

## Evidence / observed practice

OSCAL model guidance requires document-level change metadata. When OSCAL content changes, guidance calls for updating the root UUID and `last-modified` metadata so tools can know content has changed since previously encountered.

Source:

- OSCAL Assessment Plan Model developer notes
  - https://pages.nist.gov/OSCAL/learn/concepts/layer/assessment/assessment-plan/
- OSCAL POA&M Model developer notes
  - https://pages.nist.gov/OSCAL/learn/concepts/layer/assessment/poam/

## Knowledge captured

Assessment evidence can be tied to a specific revision of the structured artifact instead of implicitly trusting stale results after the underlying rules/profile changed.

This is relevant to invalidating old rule-read/compliance evidence when the guide version changes.

**Adoption status:** not decided.

---

# 21. NIST supports public feedback and future control changes

## Evidence / observed practice

NIST operates public-comment mechanisms for SP 800-53 controls/baselines that allow users to:

- suggest new controls/enhancements,
- comment on existing controls/baselines,
- track feedback status,
- participate in comment periods,
- preview future changes.

Source:

- NIST SP 800-53 Controls / Public Comment resources
  - https://csrc.nist.gov/projects/risk-management/sp800-53-controls

## Knowledge captured

Like NASA, the control catalog itself is treated as an evolving product with a feedback mechanism rather than a static final document.

**Adoption status:** not decided.

---

# 22. NIST's architecture is layered rather than one giant branching router

## Evidence / observed practice

Across RMF, SP 800-53B, SP 800-53A, and OSCAL, applicability/compliance is represented through separate layers:

```text
system context / impact
→ baseline
→ tailored profile
→ implementation representation
→ assessment plan
→ assessment results
→ remediation / POA&M
→ continuous monitoring
```

Different artifacts have different owners and purposes.

## Knowledge captured

The overall mechanism is compositional rather than a huge nested decision tree.

This directly addresses a maintenance concern relevant to `web-project-guide`: complexity can be distributed across stable layers and machine-readable transformations rather than encoded in one ever-growing router.

**Adoption status:** strong research candidate, not accepted.

---

# 23. NIST and NASA overlap strongly on several reliability principles

## Cross-source observation

Without deciding adoption yet, both NASA and NIST independently show versions of these ideas:

- categorize/classify before selecting requirements,
- derive a known applicable set rather than relying on memory,
- record tailoring/exceptions explicitly,
- separate selection from implementation,
- assess implementation independently,
- keep evidence/findings durable,
- track unresolved issues through remediation,
- re-evaluate after change,
- assess the assurance/monitoring mechanism itself,
- use machine-readable structures where automation is useful.

## Knowledge captured

The similarity matters because these are not merely NASA-specific organizational habits. NIST independently converges on a layered applicability → implementation → assessment → monitoring design.

**Adoption status:** comparison evidence only; not accepted.

---

## Open Questions for later synthesis

- Which parts of NIST's security-specific categorization can generalize to Web/Electron development rules without copying security semantics?
- Could `rule-router.json` evolve conceptually toward `Catalog + Profile` rather than becoming a larger branching router?
- Should each Common Rule eventually have a stable machine ID independent of its Markdown section/file location?
- Could a Project/Task Profile be materialized as a machine-readable resolved applicability artifact?
- Should completion evidence reference the exact Guide/Profile revision it was evaluated against?
- Could testable rules expose explicit assessment procedures while subjective rules retain manual evidence requirements?
- Could unresolved completion issues be stored as a POA&M-like durable list rather than only Work Report prose?
- Should a "full audit" generate an Assessment Plan before execution to prevent silent scope narrowing?
- Could common/shared account-level GitHub infrastructure be represented as a reusable/common control rather than duplicated across project checklists?
- Could project-type/domain packs become overlays that add to/tailor a common baseline rather than mutually exclusive profiles?
- How much of OSCAL's structured model could eventually be imitated with simple JSON before any sophisticated automation exists?
- How does CMMI, ISO/IEC/IEEE 15288/12207, DO-178C, medical-device quality systems, or large software organizations differ from the NASA/NIST pattern?
