# CMMI Process Capability / Appraisal Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**. It intentionally records mechanisms broadly, including practices that may be too expensive, organizationally heavy, licensed, or impossible to reproduce in the current project today.

## Research Question

How does CMMI reduce process inconsistency, omission, and dependence on individual memory by defining capability/maturity, institutionalizing practices, appraising persistence, sampling implementation evidence, and separating lightweight improvement reviews from formal benchmark appraisals?

This source family is being compared with NASA and NIST. Final `web-project-guide` requirements are not decided here.

---

# 1. CMMI evaluates process implementation, not just existence of documented rules

## Evidence / observed practice

The current CMMI Appraisal Method is the official ISACA-defined method for evaluating organizational processes relative to the CMMI model. Its stated purposes include identifying implementation strengths and weaknesses, examining process persistence and habit, and linking demonstrated business performance with model adoption.

The appraisal method explicitly focuses on **process implementation rather than personnel assessment**.

Sources:

- CMMI Institute, `Appraisal Method`
  - https://cmmiinstitute.com/learning/appraisals/method
- CMMI Institute, `What is an Appraisal?`
  - https://cmmiinstitute.com/learning/appraisal

## Knowledge captured

A written process or checklist is not treated as sufficient evidence that the process exists in practice. CMMI asks whether the organization actually implements the process, whether it persists, and whether it contributes to business/performance outcomes.

This distinction matters for rule systems because a guide can contain correct rules while actual work repeatedly ignores them.

**Adoption status:** not decided.

---

# 2. Capability is staged from incomplete/inconsistent to defined organizational practice

## Evidence / observed practice

Current CMMI capability levels apply to individual Practice Areas. Public CMMI material describes levels including:

- **Capability Level 0 — Incomplete:** the intent of the Practice Area is not completely met and performance may be inconsistent.
- **Capability Level 1 — Initial:** an initial approach exists but is not a complete set of practices for the full intent.
- **Capability Level 2 — Managed:** a simple but complete practice set addresses the full intent and progress toward project performance objectives is managed.
- **Capability Level 3 — Defined:** organizational standards/assets are used and tailored to project/work characteristics, projects contribute back to organizational assets, and both project and organizational objectives are addressed.

Sources:

- CMMI Institute, `CMMI Levels of Capability and Performance`
  - https://cmmiinstitute.com/learning/appraisals/levels
- CMMI Institute public appraisal guidance / enablement material
  - https://cmmiinstitute.com/getattachment/f7834795-02b9-496c-a00f-fab4847d4891/Partner-Enablement-CMMI-Appaisals.pdf

## Knowledge captured

CMMI does not treat process quality as binary. A process can exist in a weak or inconsistent state and be distinguished from a process that is complete, managed, standardized, tailored, and reused.

A useful conceptual distinction for future rule-system analysis is therefore:

```text
Rule documented
!= Rule routinely executed
!= Rule routinely executed and monitored
!= Rule standardized, tailored, measured, and improved
```

**Adoption status:** not decided.

---

# 3. Maturity levels assess organization-wide process behavior

## Evidence / observed practice

CMMI maturity levels provide an evolutionary path across predefined sets of Practice Areas.

Public current/near-current CMMI material describes:

- **ML1 Initial:** work is comparatively unpredictable/reactive; completion may occur but with inconsistency.
- **ML2 Managed:** work is planned, performed, measured, and controlled at project level.
- **ML3 Defined:** organization-wide standards guide projects; projects tailor organizational processes to their context and use organizational assets.
- **ML4 Quantitatively Managed:** statistical/quantitative techniques are used to understand and manage process variation against quality/process-performance objectives.
- **ML5 Optimizing:** stable/capable processes are quantitatively optimized to improve achievement of quality/process-performance objectives.

Sources:

- CMMI Institute, `CMMI Technical Report: Performance Results`, 2025
  - https://cmmiinstitute.com/getattachment/738104c0-a6f0-4e1c-8bbe-35076b75f36e/CMMI-Technical-Report-Performance-Results_May-2025.pdf
- CMMI Institute, `CMMI Levels of Capability and Performance`
  - https://cmmiinstitute.com/learning/appraisals/levels

## Knowledge captured

The maturity concept is not merely “more rules”. Higher maturity increasingly emphasizes organizational standardization, contextual tailoring, measurement, process stability, causal understanding, and optimization.

The model therefore treats reproducibility and improvement capability as separate quality dimensions from merely having instructions.

**Adoption status:** not decided.

---

# 4. CMMI explicitly distinguishes organizational standards from project-specific tailoring

## Evidence / observed practice

Capability/Maturity Level 3 descriptions state that projects use organizational standards/assets but tailor them for project/work characteristics. Projects also feed process information/assets back into the organization.

Sources:

- CMMI Institute, `CMMI Levels of Capability and Performance`
  - https://cmmiinstitute.com/learning/appraisals/levels
- CMMI Technical Report 2025
  - https://cmmiinstitute.com/getattachment/738104c0-a6f0-4e1c-8bbe-35076b75f36e/CMMI-Technical-Report-Performance-Results_May-2025.pdf

## Knowledge captured

CMMI uses a bidirectional relationship:

```text
Organization standard / asset
→ project tailoring / use
→ project execution evidence / learning
→ contribution back to organizational assets
```

This differs from a purely top-down rule repository where projects only consume rules and never improve the shared system.

**Adoption status:** not decided.

---

# 5. Sustaining Habit & Persistence is a first-class concern

## Evidence / observed practice

CMMI public guidance explains that many organizations can implement an improvement temporarily but fail to sustain it. CMMI introduced the `Sustaining Habit & Persistence` capability area to address whether important processes become persistently and habitually used rather than relying on continuous conscious effort by particular people.

Two related Practice Areas are repeatedly highlighted:

- **Governance (GOV)** — senior management sponsorship/oversight of performance, processes, and related activities.
- **Implementation Infrastructure (II)** — ensuring processes/assets important to organizational performance are persistently and habitually followed, used, maintained, and improved.

Sources:

- CMMI Institute, `Applying CMMI`
  - https://www.cmmiinstitute.com/store/applying-cmmi
- CMMI Adoption Guidance
  - https://cmmiinstitute.com/getattachment/5868888b-5f37-4715-bc8b-c43250ec0abc/CMMI-Adoption-Guidance.pdf
- CMMI Institute article, `Building an Enterprise Culture that Sustains Innovation`
  - https://www.cmmiinstitute.com/getattachment/455059e9-7e1b-483c-81df-4e265079adf8/Building_Enterprise_Culture.pdf

## Knowledge captured

CMMI explicitly attacks the failure mode where a good process exists but disappears when attention, personnel, or temporary improvement pressure changes.

This suggests an important distinction for rule-system reliability:

- knowledge existence,
- one-time compliance,
- repeatable compliance,
- habitual/persistent compliance.

A process can pass a one-time audit and still be weak if it is not sustained.

**Adoption status:** not decided.

---

# 6. Implementation Infrastructure includes resources, training, maintenance, verification, and feedback

## Evidence / observed practice

Public CMMI guidance describes implementation infrastructure activities such as:

- providing sufficient resources, funding, and training,
- developing and implementing the process,
- keeping the process current,
- verifying adherence,
- using organizational process assets to plan/manage/perform work,
- evaluating process adherence and effectiveness,
- providing process-related information/assets back to the organization.

The adoption guidance also describes infrastructure resources including roles, time, budget, tools, training, process-asset repositories, and measurement systems/repositories.

Sources:

- CMMI Adoption Guidance
  - https://cmmiinstitute.com/getattachment/5868888b-5f37-4715-bc8b-c43250ec0abc/CMMI-Adoption-Guidance.pdf
- CMMI public quick/reference material (V2-era public detail; current model should be checked where licensed/current details are needed)
  - https://stage.cmmiinstitute.com/getattachment/aca61a3e-2301-4be0-af7c-b9b9f307365d/attachment.aspx

## Knowledge captured

CMMI treats failure to follow a process as potentially an infrastructure problem, not simply an individual error. If a process is difficult to access, stale, unsupported by tools, not trained, or not verified, persistence is structurally weak.

For later synthesis, this is relevant to whether `web-project-guide` should blame routing/agent execution alone or also provide stronger infrastructure that makes correct rule application easier.

**Adoption status:** not decided.

---

# 7. Improvement goals should follow business/project outcomes, not maturity scores for their own sake

## Evidence / observed practice

CMMI guidance warns that organizations benefit from maturity/capability levels when improvement is driven by shared business objectives rather than by chasing the level itself.

The model/appraisal method also links process adoption to demonstrated performance rather than presenting process conformity as the only outcome.

Sources:

- CMMI appraisal introduction / levels guidance
  - https://cmmiinstitute.com/learning/appraisals/levels
- CMMI Institute, `Appraisal Method`
  - https://cmmiinstitute.com/learning/appraisals/method

## Knowledge captured

A mature rule system can become counterproductive if the target becomes “pass every process check” rather than “reduce failures and improve project outcomes”. CMMI explicitly treats process as a means to performance, not the ultimate product.

**Adoption status:** not decided.

---

# 8. Appraisal is not one fixed ceremony; CMMI has multiple appraisal strengths

## Evidence / observed practice

The current CMMI appraisal framework defines four appraisal types:

### Benchmark Appraisal

- rigorous and high-coverage,
- intended for accurate/reliable results,
- produces ratings,
- high commitment of time/people/cost,
- rating validity is time-bounded.

### Sustainment Appraisal

- a reduced-scope check-up after a Benchmark,
- intended to confirm that capability/maturity is being maintained,
- produces ratings,
- can be repeated only a limited number of times before a fresh Benchmark is required.

### Evaluation Appraisal

- flexible/lighter-weight,
- used to find improvement opportunities or prepare for a formal appraisal,
- scope/depth can be tailored,
- no formal rating.

### Action Plan Reappraisal

- a targeted follow-up after a narrow failure to achieve the intended Benchmark/Sustainment level,
- focuses corrective action and re-evaluation rather than requiring the prior work to be discarded.

Source:

- CMMI Institute, `Types of CMMI Appraisals`
  - https://cmmiinstitute.com/learning/appraisals/types

## Knowledge captured

CMMI does not force maximum audit depth for every need. It separates:

```text
lightweight improvement check
vs
formal benchmark
vs
periodic sustainment check
vs
focused corrective reappraisal
```

This creates several confidence levels without making all everyday work pay the cost of a full formal audit.

**Adoption status:** not decided.

---

# 9. A successful historical appraisal expires; persistence must be re-demonstrated

## Evidence / observed practice

CMMI Benchmark appraisal ratings have limited validity (public current guidance states three years). Sustainment Appraisals can extend/maintain confidence using a reduced scope, but only a limited number of consecutive Sustainment Appraisals are allowed before a fresh Benchmark is required.

Source:

- CMMI Institute, `Types of CMMI Appraisals`
  - https://cmmiinstitute.com/learning/appraisals/types

## Knowledge captured

Past evidence is not treated as permanent proof of current process capability.

This is directly relevant to stale project/profile/routing assumptions: a process may have been correct six months ago and be invalid after system, tooling, personnel, requirements, or project changes.

**Adoption status:** not decided.

---

# 10. Appraisals look for persistence/habit, not only point-in-time artifacts

## Evidence / observed practice

The CMMI Appraisal Method states that it identifies implementation strengths/weaknesses and also examines process persistence and habit.

Source:

- CMMI Institute, `Appraisal Method`
  - https://cmmiinstitute.com/learning/appraisals/method

## Knowledge captured

This means an audit should be suspicious of evidence manufactured only for the audit. The relevant question is not simply whether an artifact exists today, but whether normal work demonstrates that the process is routinely followed.

Potential evidence classes therefore include current artifacts, repeated project histories, workflow/tool state, actual behavior, and performance patterns rather than a single manually completed checklist.

**Adoption status:** not decided.

---

# 11. Appraisal scope and evidence use sampling rather than assuming one example proves the organization

## Evidence / observed practice

CMMI maintains explicit appraisal policies and Quality Tips around sampling, including `Sampling Factors` for multi-domain appraisals and a Random Sample Generation Policy. Appraisal methods therefore recognize that organizational claims need representative evidence rather than arbitrary cherry-picked examples.

Sources:

- CMMI Institute, `Quality Tip: Sampling Factors`
  - https://cmmiinstitute.com/resource-files/public/quality/quality-corner/quality-tip-sampling-factors
- CMMI Institute, Policies
  - https://cmmiinstitute.com/policies

## Knowledge captured

When assessing a process used across many projects/components/domains, checking only the easiest or most successful case risks false confidence. A sampling model attempts to cover meaningful variation in the organizational unit/domain.

This might eventually matter if `web-project-guide` claims reliability across many repositories: passing one or two Golden Cases is weaker than sampling representative project types, risk levels, and change types.

**Adoption status:** not decided.

---

# 12. Appraisal evidence can combine documented evidence and interviews/observations

## Evidence / observed practice

Public CMMI/FDA appraisal material describes standardized collection of interview data and documented evidence, with results rolled up into a heat-map representation against Practice Areas under review.

Source:

- CMMI Institute, MDDAP FAQs
  - https://cmmiinstitute.com/products/mddap/mddap-faqs

## Knowledge captured

CMMI-style assessment does not rely only on policy documents. Actual practitioner behavior and documented evidence can be compared.

This guards against the situation where the written process says one thing but normal execution does another.

**Adoption status:** not decided.

---

# 13. Assessment results can be represented as graded/heat-map weakness rather than only pass/fail

## Evidence / observed practice

The CMMI/FDA appraisal example uses a heat-map roll-up against Practice Areas and explicitly states that the exercise is not simply a minimum-score pass/fail test; it is intended to support targeted ongoing improvement.

Source:

- CMMI Institute, MDDAP FAQs
  - https://cmmiinstitute.com/products/mddap/mddap-faqs

## Knowledge captured

A rule/process system can benefit from distinguishing weak, partial, inconsistent, strong, and sustained implementation rather than treating every requirement as only green/red.

This is different from NASA/NIST compliance-oriented mechanisms and may be useful when the issue is process maturity rather than a strict mandatory requirement.

**Adoption status:** not decided.

---

# 14. CMMI appraisals are themselves governed by policy, quality assurance, audit, and corrective action

## Evidence / observed practice

CMMI maintains separate policy families for appraisal delivery, sampling, appraisal system usage, publication, certification, audits, corrective action, and complaints/appeals.

A public CMMI Audit Guide states that authorized auditors review appraisal/course evidence and operations for compliance with policies, program rules, and generally accepted auditing standards.

Sources:

- CMMI Institute, Policies
  - https://cmmiinstitute.com/policies
- CMMI Institute, `CMMI Audit Guide`
  - https://www.cmmiinstitute.com/resource-files/public/quality/quality-corner/cmmi-audit-guide

## Knowledge captured

Like NASA's independent assurance layers, CMMI does not assume the appraisal process is automatically trustworthy. The assessors and appraisal mechanism themselves have rules, oversight, certification, audit, corrective-action, and appeals mechanisms.

This is another example of **verification of the verifier**.

**Adoption status:** not decided.

---

# 15. Appraisers are trained/certified and their proficiency is maintained

## Evidence / observed practice

Formal Benchmark Appraisals require certified Lead Appraisers, and CMMI maintains training/certification/renewal policies. Observation pathways and continuing professional-development expectations are used for Lead Appraiser certification/renewal.

Sources:

- CMMI Institute, `Types of CMMI Appraisals`
  - https://cmmiinstitute.com/learning/appraisals/types
- CMMI Institute certification / observation policies
  - https://cmmiinstitute.com/policies

## Knowledge captured

The reliability of a checklist is partly determined by who interprets and applies it. CMMI treats assessor competence as part of the control system instead of assuming the same instructions always yield the same judgment from every reviewer.

For an AI-oriented rule system, the analogous issue may be whether the agent has sufficient context/tools/evidence and whether its classification/assessment can be independently checked.

**Adoption status:** not decided.

---

# 16. CMMI separates process weakness from blame of individuals

## Evidence / observed practice

The current appraisal method explicitly emphasizes evaluation of process implementation rather than personnel assessment and uses a collaborative/confidential approach to identify performance gaps.

Source:

- CMMI Institute, `Appraisal Method`
  - https://cmmiinstitute.com/learning/appraisals/method

## Knowledge captured

Repeated omission is treated as evidence to inspect the process, infrastructure, governance, training, measurement, or institutionalization—not simply proof that a person was careless.

This aligns with the current `web-project-guide` research problem: if an AI/human repeatedly misses a rule, improving instructions alone may be weaker than redesigning routing, machine-readable applicability, evidence requirements, and completion gates.

**Adoption status:** not decided.

---

# 17. CMMI explicitly accommodates different organization/project sizes and technologies

## Evidence / observed practice

The CMMI Product Suite and Appraisal Method state that they are designed to be usable across different markets, organization/project sizes, industry needs, market drivers, and new/changing technologies.

Source:

- CMMI Institute, `Appraisal Method`
  - https://cmmiinstitute.com/learning/appraisals/method

## Knowledge captured

Flexibility/tailoring is a design goal rather than an exception. However, flexibility is still bounded by an official appraisal method and defined tailoring boundaries (the full MDD is a controlled/licensed document).

This is relevant to preserving rigor while avoiding a one-size-fits-all full audit.

**Adoption status:** not decided.

---

# 18. Formal method tailoring has boundaries

## Evidence / observed practice

The current CMMI Method Definition Document (MDD) is described as defining appraisal requirements, **boundaries of tailoring**, and implementation guidance for Benchmark, Sustainment, Action Plan Reappraisal, and Evaluation appraisals.

The complete current MDD is a commercial/licensed resource, so this research does not claim details that were not visible in public material.

Source:

- CMMI Institute, `CMMI Method Definition Document`
  - https://cmmiinstitute.com/store/cmmi-v3-0-method-definition-document

## Knowledge captured

CMMI distinguishes “adapt the process to context” from “change anything you want”. Tailoring has controlled boundaries.

The existence of explicit tailoring boundaries is itself important even where the exact current rules are not publicly available.

**Adoption status:** not decided.

---

# 19. Quality Tips are a separate fast-moving clarification layer

## Evidence / observed practice

CMMI publishes `Quality Tips` intended to answer recurring appraisal questions and confusion. Current examples include sampling, sustainment appraisals, appraisal support-function eligibility, performance reports, and final findings presentations.

The Quality Tips page warns that older tips may not reflect current model versions and some require updating.

Source:

- CMMI Institute, `Quality Tips`
  - https://cmmiinstitute.com/partners/quality/quality-tips

## Knowledge captured

CMMI, like NASA, separates formal model/method requirements from a faster clarification/guidance channel.

It also explicitly acknowledges stale guidance risk across versions. Guidance itself therefore needs version awareness and maintenance.

**Adoption status:** not decided.

---

# 20. The model itself evolves with business/technology changes

## Evidence / observed practice

CMMI states that its model is continuously updated to address new business challenges, technologies, and trends. In 2026, CMMI introduced a new AI Maturity model and reported pilot use with real organizations before general launch.

Sources:

- ISACA, CMMI Performance Solutions
  - https://www.isaca.org/enterprise/cmmi-performance-solutions
- ISACA, 2026 CMMI AIM launch
  - https://www.isaca.org/about-us/newsroom/press-releases/2026/cmmi-institute-launches-new-ai-maturity-aim-model
- ISACA, 2026 AIM pilot announcement
  - https://www.isaca.org/about-us/newsroom/press-releases/2026/cmmi-institute-completes-pilot-for-new-ai-maturity-aim-framework

## Knowledge captured

CMMI does not freeze its process model forever. It can add new domain models, pilot them with real organizations, and integrate lessons from deployment.

This reinforces the broader evidence that mature rule systems need lifecycle/version management rather than permanent assumptions.

**Adoption status:** not decided.

---

# 21. CMMI's strongest distinctive idea for this research: institutionalization

## Synthesis / interpretation

NASA and NIST strongly emphasize identifying applicable requirements/controls, recording compliance, assessing implementation, and monitoring change.

CMMI adds a different emphasis:

> A process is not mature because it is documented or because it passed once. It becomes dependable when it is managed, standardized where appropriate, tailored deliberately, supported by infrastructure, routinely followed, measured, independently assessed, and improved from repeated use.

For the current `web-project-guide` problem, this raises a separate research question from routing:

```text
Can the Guide reliably identify the correct rules?
```

and

```text
Can the working process make correct rule use persistent enough that the same omission does not recur in later conversations/projects?
```

Those are related but not identical problems.

**Adoption status:** synthesis candidate only; no requirement adopted.

---

# 22. Comparison notes: NASA vs NIST vs CMMI so far

These are provisional research notes, not final conclusions.

## NASA emphasis observed so far

- classification / criticality,
- applicable-requirement matrices,
- explicit tailoring/waiver/deviation,
- assurance and IV&V independence,
- verification of completed applicability/compliance,
- lifecycle updates,
- lessons learned and cross-project rule improvement.

## NIST emphasis observed so far

- catalog → baseline/profile → tailored implementation,
- overlays,
- assessment plans/results,
- continuous monitoring,
- machine-readable OSCAL representations,
- automation and structured traceability across control lifecycle.

## CMMI emphasis observed so far

- process capability/maturity rather than only individual rule compliance,
- persistent/habitual process execution,
- organizational standards plus contextual tailoring,
- governance and implementation infrastructure,
- graded capability and process maturity,
- multiple appraisal strengths,
- representative sampling,
- appraisal-system quality/audit,
- explicit re-demonstration of persistence over time.

The overlap across the three source families is already notable:

- do not rely on one person/agent's memory,
- distinguish baseline/standard from contextual tailoring,
- verify actual implementation rather than written intent alone,
- preserve evidence,
- reassess over time,
- independently check assessment/routing mechanisms,
- treat improvement of the process/rule system itself as ongoing work.

The differences are also useful and should not be prematurely collapsed into one model.

---

## Open Questions for later synthesis

- What combination of NASA-style applicability matrices, NIST-style machine-readable profiles, and CMMI-style institutionalization provides the highest omission resistance without unnecessary friction?
- Should `web-project-guide` track not only `Applicable / Not Applicable / Exception` but also implementation maturity such as `documented / used / verified / persistent`?
- Can repeated GitHub work history be used as evidence of process persistence instead of manually completed paperwork?
- Should there be separate normal-work, sustainment, and exhaustive/benchmark audit modes?
- How can representative Golden Cases/sample projects be chosen so the Guide is not validated only on convenient scenarios?
- Can the rule router itself be periodically benchmarked against a larger independently generated applicability set?
- How should guidance/version staleness be detected and surfaced?
- Which elements require future automation/tooling versus process-only changes?
