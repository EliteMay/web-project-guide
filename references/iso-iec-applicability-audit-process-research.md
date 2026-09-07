# ISO / IEC Applicability, Audit, Process Assessment, and Continual Improvement Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**. It intentionally captures mechanisms broadly, including mechanisms that may be too heavy, too expensive, or not yet implementable in the current project.

## Research Question

How do ISO / IEC software, information-security, quality-management, audit, and process-assessment standards reduce omission, distinguish justified non-applicability from accidental non-consideration, verify implementation, detect systemic failures, and improve the governing process itself?

This pass focuses on the following source families:

- ISO/IEC 27001 / ISO/IEC 27002 / related ISO/IEC 27001 Auditing Practices guidance
- ISO/IEC/IEEE 12207 software life-cycle processes
- ISO 19011 management-system auditing
- ISO 9001 process approach / nonconformity / corrective action guidance
- ISO/IEC 330xx process-assessment family

Where an Auditing Practices Group paper is used, it is recorded as **practitioner / audit guidance hosted by an ISO committee site, not as a normative ISO requirement** unless the underlying standard itself is the source of the requirement.

---

# 1. ISO/IEC 27001 uses a reference set specifically to catch omitted necessary controls

## Evidence / observed practice

ISO/IEC 27001 requires an organization to determine the information-security controls it actually needs through risk treatment. These are referred to in the Auditing Practices guidance as **necessary controls**.

The organization then compares those necessary controls against Annex A, which functions as a common reference set. The stated purpose of this comparison is to reduce the chance that a necessary control was accidentally omitted.

The ISO/IEC 27001 Auditing Practices guidance explains the failure mode directly: if a necessary control is omitted during risk treatment, the organization can believe itself protected while remaining exposed. The comparison against Annex A exists as a deliberate omission-detection barrier.

Sources:

- ISO/IEC 27001:2022 official standard page
  - https://www.iso.org/standard/27001
- ISO/IEC JTC 1/SC 27/WG 1, `Auditing Practices Note - Statement of Applicability (SoA)`
  - https://committee.iso.org/files/live/sites/jtc1sc27/files/resources/ISO-IECJTC1-SC27-WG1_N3298_Auditing%20Practices%20Note%20-%20SoA.pdf

## Knowledge captured

This model is not simply:

```text
choose controls
→ implement controls
```

It is closer to:

```text
independently determine what is needed
→ compare that result against a broader reference universe
→ investigate anything left unmatched
→ document the resolution
```

The second pass is intentionally generated from a different source than the first pass. This is a direct structural answer to the problem where one routing/classification mistake can hide the very rule that would have exposed the mistake.

**Adoption status:** not decided.

---

# 2. The reference set is not automatically the final applicable set

## Evidence / observed practice

Annex A is not treated as a list where every listed control automatically becomes necessary. The organization first determines what it needs from its own context, risk, legal, contractual, and other obligations.

The Auditing Practices guidance says Annex A supports decision-making rather than replacing it. It can remind the organization that it has missed something, but necessity still has to be justified from the organization's real context.

The guidance also notes that necessary controls can come from other standards, sector requirements, NIST, contractual requirements, internally designed controls, or other sources.

Source:

- ISO/IEC JTC 1/SC 27/WG 1, `Auditing Practices Note - Statement of Applicability (SoA)`
  - https://committee.iso.org/files/live/sites/jtc1sc27/files/resources/ISO-IECJTC1-SC27-WG1_N3298_Auditing%20Practices%20Note%20-%20SoA.pdf

## Knowledge captured

A reference universe can be used as a **coverage cross-check** without pretending it is itself the exact project-specific rule set.

This avoids two opposite errors:

1. blindly applying every possible rule to every project;
2. trusting the project's first-pass route so much that omitted rules are never reconsidered.

**Adoption status:** not decided.

---

# 3. Statement of Applicability turns omission, inclusion, exclusion, and implementation into explicit states

## Evidence / observed practice

ISO/IEC 27001 Clause 6.1.3 requires documented information commonly called the **Statement of Applicability (SoA)**.

The Auditing Practices guidance describes the SoA as containing:

- the organization's necessary controls,
- justification for why those controls are included,
- whether they are implemented or not,
- justification for Annex A controls determined to be unnecessary.

The exact table format is not prescribed. A common implementation is a table with control, applicability/necessity, justification, and implementation status, but organizations can structure it differently so long as the required information is present and the mapping can be demonstrated.

Sources:

- ISO/IEC 27001:2022
  - https://www.iso.org/standard/27001
- ISO/IEC JTC 1/SC 27/WG 1, SoA Auditing Practices Note
  - https://committee.iso.org/files/live/sites/jtc1sc27/files/resources/ISO-IECJTC1-SC27-WG1_N3298_Auditing%20Practices%20Note%20-%20SoA.pdf

## Knowledge captured

This creates separate states that are easy to collapse incorrectly in lightweight systems:

- **needed and implemented**
- **needed but not yet implemented**
- **reference control examined and judged unnecessary**
- **custom necessary control outside the reference set**

A missing row/state is therefore materially different from a justified exclusion.

**Adoption status:** not decided.

---

# 4. Exclusion is an affirmative, justified conclusion

## Evidence / observed practice

After mapping necessary controls against Annex A, any remaining Annex A control types have to be considered. If they are unnecessary, that conclusion is documented and justified in the SoA.

The Auditing Practices guidance explicitly frames this as a cross-check against accidental omission. A control does not disappear merely because it was not initially selected.

Source:

- ISO/IEC JTC 1/SC 27/WG 1, SoA Auditing Practices Note
  - https://committee.iso.org/files/live/sites/jtc1sc27/files/resources/ISO-IECJTC1-SC27-WG1_N3298_Auditing%20Practices%20Note%20-%20SoA.pdf

## Knowledge captured

This reinforces the NASA finding that:

```text
not applicable
!=
not considered
```

The two systems arrived at a similar omission-control pattern independently.

**Adoption status:** strong comparison candidate, not accepted.

---

# 5. Custom controls outside the reference set are first-class

## Evidence / observed practice

The SoA guidance notes that organizations can have necessary controls that do not appear in Annex A. ISO/IEC 27003 terminology refers to these as custom controls; a custom control can also replace the need for an Annex A control in some circumstances.

If a necessary control is outside Annex A, it still belongs in the SoA.

Source:

- ISO/IEC JTC 1/SC 27/WG 1, SoA Auditing Practices Note
  - https://committee.iso.org/files/live/sites/jtc1sc27/files/resources/ISO-IECJTC1-SC27-WG1_N3298_Auditing%20Practices%20Note%20-%20SoA.pdf

## Knowledge captured

A stable common rule catalogue does not have to contain every future or project-specific rule to remain useful.

The applicable set can be:

```text
common reference set
+ project/context-derived controls
+ legal/contractual/technical requirements
+ custom controls
```

This is relevant to any future system that must support unusual project needs without continuously bloating the global rule catalogue.

**Adoption status:** not decided.

---

# 6. The mapping can be structurally flexible while the required semantics remain fixed

## Evidence / observed practice

The SoA guidance says ISO/IEC 27001 specifies what the SoA must contain but does not require one exact structure.

Organizations can use an Annex-A-like table, grouped exclusions, additional attributes, custom wording, or other structures as long as they can demonstrate the required mapping and information.

Source:

- ISO/IEC JTC 1/SC 27/WG 1, SoA Auditing Practices Note
  - https://committee.iso.org/files/live/sites/jtc1sc27/files/resources/ISO-IECJTC1-SC27-WG1_N3298_Auditing%20Practices%20Note%20-%20SoA.pdf

## Knowledge captured

This is a useful separation between:

- **semantic contract** — what information must exist;
- **artifact format** — how it is represented.

A future implementation could therefore move from Markdown to JSON, a database, generated UI, or automation without changing the underlying governance model.

**Adoption status:** not decided.

---

# 7. The version of the applicability record itself can be part of assurance evidence

## Evidence / observed practice

The SoA Auditing Practices guidance notes that ISO/IEC 27006 certification documents reference the version of the SoA used for certification.

Source:

- ISO/IEC JTC 1/SC 27/WG 1, SoA Auditing Practices Note
  - https://committee.iso.org/files/live/sites/jtc1sc27/files/resources/ISO-IECJTC1-SC27-WG1_N3298_Auditing%20Practices%20Note%20-%20SoA.pdf

## Knowledge captured

Applicability evidence can be versioned independently enough that a later change can invalidate or supersede an earlier audit context.

A vague statement such as "we checked the rules before" is weaker than:

```text
applicability set version X
was used for review Y
against repository/revision Z
```

**Adoption status:** not decided.

---

# 8. Outsourced execution does not automatically remove applicability

## Evidence / observed practice

The SoA Auditing Practices guidance explains that an organization can rely on external providers to perform processes or controls. If a control is still necessary to the organization's risk treatment, it remains in the SoA even when execution is performed externally.

Source:

- ISO/IEC JTC 1/SC 27/WG 1, SoA Auditing Practices Note
  - https://committee.iso.org/files/live/sites/jtc1sc27/files/resources/ISO-IECJTC1-SC27-WG1_N3298_Auditing%20Practices%20Note%20-%20SoA.pdf

## Knowledge captured

Delegating work and removing responsibility are different concepts.

In a software-guide context, this suggests a rule should not disappear merely because:

- GitHub Actions performs the check,
- a hosting provider handles the runtime,
- a library implements a security mechanism,
- an AI agent or another tool performs the task.

The obligation/evidence may still need to exist even when implementation responsibility is delegated.

**Adoption status:** not decided.

---

# 9. Audit responsibility and implementation authority are separated

## Evidence / observed practice

The SoA guidance states that the organization has responsibility for how it implements its ISMS and SoA. Auditors do not design the organization's controls for it, but they evaluate evidence of conformity and can identify the SoA as nonconforming when required information or justification is inadequate.

Source:

- ISO/IEC JTC 1/SC 27/WG 1, SoA Auditing Practices Note
  - https://committee.iso.org/files/live/sites/jtc1sc27/files/resources/ISO-IECJTC1-SC27-WG1_N3298_Auditing%20Practices%20Note%20-%20SoA.pdf

## Knowledge captured

This separates:

- **decision ownership**
- **independent conformity checking**

An independent checker can challenge the reasoning without becoming the original author of that reasoning.

**Adoption status:** not decided.

---

# 10. ISO 19011 treats auditing as its own managed process

## Evidence / observed practice

ISO 19011:2026 provides a framework for management-system auditing and includes separate sections for:

- audit principles,
- audit-program objectives,
- audit-program risks and opportunities,
- establishing the audit program,
- implementing the audit program,
- monitoring the audit program,
- reviewing and improving the audit program,
- conducting individual audits,
- auditor competence and evaluation.

Its listed audit principles include:

- integrity,
- fair presentation,
- due professional care,
- confidentiality,
- independence,
- evidence-based approach,
- risk-based approach.

Sources:

- ISO 19011:2026
  - https://www.iso.org/standard/19011
- ISO Online Browsing Platform preview
  - https://www.iso.org/obp/ui?_escaped_fragment_=iso%3Astd%3Aiso%3A19011%3Aed-4%3Av1%3Aen

## Knowledge captured

Audit is itself subject to lifecycle management and improvement. The system does not assume that "having an auditor" guarantees useful audits.

This independently supports the NASA/CMMI pattern that the assurance mechanism itself needs governance.

**Adoption status:** not decided.

---

# 11. Audit programs are risk-based rather than mechanically identical every time

## Evidence / observed practice

ISO 19011 includes a risk-based approach among its audit principles and requires attention to audit-program risks/opportunities, objectives, monitoring, and improvement.

Source:

- ISO 19011:2026
  - https://www.iso.org/standard/19011

## Knowledge captured

This supports differentiated review depth rather than a false binary between:

- no audit,
- exhaustive audit of everything.

An audit system can preserve independence/evidence requirements while changing depth according to risk, history, scope, or unresolved issues.

**Adoption status:** not decided.

---

# 12. ISO 9001's process approach makes the process itself observable

## Evidence / observed practice

ISO 9001 process-approach guidance describes practical process management around:

- determining intended outputs and required inputs,
- defining responsibilities and authorities,
- understanding sequence and interactions,
- identifying risk of unintended outputs,
- defining activities and controls,
- defining monitoring/measurement,
- reviewing performance,
- retaining results where necessary.

The guidance explicitly says documentation need is contextual rather than a mandatory catalogue. Factors include organization size, process complexity, process interactions, criticality, and accountability needs.

Sources:

- ISO 9001:2015 implementation guidance page
  - https://committee.iso.org/sites/tc176sc2/home/projects/published/iso-9001-2015.html
- ISO/TC 176/SC 2, `The process approach in ISO 9001`
  - https://www.iso.org/iso/iso9001_2015_process_approach.pdf

## Knowledge captured

The important object is not the document itself. Documentation is one possible control used when process risk/complexity/accountability make it useful.

This is relevant to keeping a future anti-omission system from degenerating into paperwork for its own sake.

**Adoption status:** not decided.

---

# 13. PDCA makes checking and improvement separate from execution

## Evidence / observed practice

ISO 9001 process guidance describes PDCA as:

- **Plan** — establish objectives/processes/resources and determine what/how;
- **Do** — implement and control the plan;
- **Check** — monitor and measure results against policies, objectives, requirements, and plans;
- **Act** — improve performance as needed.

The model is explicitly cyclical and combined with risk-based thinking.

Source:

- ISO/TC 176/SC 2, `The process approach in ISO 9001`
  - https://www.iso.org/iso/iso9001_2015_process_approach.pdf

## Knowledge captured

This is another independent source separating:

```text
rule/plan selection
!=
execution
!=
verification
!=
process improvement
```

The same actor can perform several stages in a small project, but collapsing the stages conceptually makes omissions harder to detect.

**Adoption status:** not decided.

---

# 14. Correction and corrective action are intentionally different

## Evidence / observed practice

ISO 9001 Auditing Practices guidance distinguishes:

- **nonconformity** — non-fulfilment of a requirement;
- **correction** — action to eliminate the detected nonconformity;
- **corrective action** — action to eliminate the cause and prevent recurrence.

The guidance says a response to a nonconformity should normally address:

- correction,
- analysis of cause,
- corrective action.

For software, it explicitly warns that implementing a correction before understanding the cause can be unwise in some situations.

Source:

- ISO 9001 Auditing Practices Group, `Nonconformity - review and closing`
  - https://committee.iso.org/files/live/sites/tc176/files/documents/ISO%209001%20Auditing%20Practices%20Group%20docs/Auditing%20General/APG-ReviewNonconformity2015.pdf

## Knowledge captured

A missed README URL can be fixed by adding the URL. That is a **correction**.

A system that allowed a known applicable rule to escape review needs a different action if recurrence is to be reduced. This is the distinction between fixing the observed defect and fixing the process that produced it.

**Adoption status:** strong comparison candidate, not accepted.

---

# 15. Audit guidance explicitly distinguishes accidental one-off failures from systemic failures

## Evidence / observed practice

The ISO 9001 Auditing Practices guidance says auditors should determine whether the cause of a nonconformity is systemic or accidental. Treating a systemic failure as a one-off incident risks recurrence.

It also points out that the management system itself can be absent or insufficient, making the system gap part of the root cause.

Source:

- ISO 9001 Auditing Practices Group, `Nonconformity - review and closing`
  - https://committee.iso.org/files/live/sites/tc176/files/documents/ISO%209001%20Auditing%20Practices%20Group%20docs/Auditing%20General/APG-ReviewNonconformity2015.pdf

## Knowledge captured

This gives a useful diagnostic distinction for future Guide failures:

```text
execution error
vs
routing error
vs
rule-definition error
vs
missing process/control
vs
systemic failure spanning several areas
```

Not every defect should create a new global rule; some defects are isolated execution errors. Conversely, recurring or structurally enabled failures should not be dismissed as isolated mistakes.

**Adoption status:** not decided.

---

# 16. Root-cause analysis can preserve uncertainty instead of forcing an early answer

## Evidence / observed practice

The ISO 9001 Auditing Practices guidance suggests considering multiple possible contributing factors instead of declaring the first observed factor the root cause.

It describes recording candidate factors using categories such as:

- not able to confirm,
- possible,
- confirmed,

and preserving records of the analysis and conclusions.

Source:

- ISO 9001 Auditing Practices Group, `Nonconformity - review and closing`
  - https://committee.iso.org/files/live/sites/tc176/files/documents/ISO%209001%20Auditing%20Practices%20Group%20docs/Auditing%20General/APG-ReviewNonconformity2015.pdf

## Knowledge captured

This is relevant to Guide failures where several layers may contribute simultaneously:

- stale requirements,
- incorrect project classification,
- router coverage gap,
- user-facing completion check missing,
- validator unable to inspect prose semantics,
- review claiming completion too early.

A single-cause story can be attractive but wrong.

**Adoption status:** not decided.

---

# 17. Nonconformity records tie evidence to the exact violated requirement

## Evidence / observed practice

ISO 9001 Auditing Practices guidance on documenting nonconformity emphasizes three elements:

- audit evidence,
- the specific requirement that was not met,
- a clear nonconformity statement.

The guidance notes that a nonconformity cannot be raised without identifying an actual requirement source. Requirements can come from the standard, internal system requirements, regulations, customers, and other obligations.

Source:

- ISO 9001 Auditing Practices Group, `Documenting a nonconformity`
  - https://committee.iso.org/files/live/sites/tc176/files/documents/ISO%209001%20Auditing%20Practices%20Group%20docs/Auditing%20General/APG-DocumentNonconformity2015.pdf

## Knowledge captured

This is stronger than generic review comments like "README incomplete" or "quality issue".

The failure record becomes traceable:

```text
observed evidence
→ exact violated rule/source
→ defect statement
→ cause analysis
→ correction
→ corrective action
→ closure evidence
```

**Adoption status:** not decided.

---

# 18. Closure requires evidence that the corrective action was actually completed and effective

## Evidence / observed practice

The ISO 9001 Auditing Practices guidance says auditors reviewing corrective action should confirm objective evidence that actions were completed and effectively implemented, not merely planned.

Different nonconformities can require different closure methods. Some may be closed by documentary evidence; others may need direct examination or another on-site/operational check.

Source:

- ISO 9001 Auditing Practices Group, `Nonconformity - review and closing`
  - https://committee.iso.org/files/live/sites/tc176/files/documents/ISO%209001%20Auditing%20Practices%20Group%20docs/Auditing%20General/APG-ReviewNonconformity2015.pdf

## Knowledge captured

"Added a rule" is not evidence that the failure mode has been fixed. A future validation may need to show that the new mechanism catches the historical failure case and does not create new failures.

**Adoption status:** not decided.

---

# 19. ISO/IEC/IEEE 12207:2026 provides a lifecycle process framework without forcing one methodology

## Evidence / observed practice

ISO/IEC/IEEE 12207:2026 establishes a common framework of software life-cycle processes covering conception, acquisition/supply, development, operation, support, maintenance, and retirement/disposal.

It states that the processes can be applied concurrently, iteratively, recursively, and incrementally. It is applicable to different formal engineering approaches and agile methods.

It also provides processes that can be used to define, control, and improve software lifecycle processes within an organization or project.

The standard explicitly does not mandate one software lifecycle model, development methodology, modeling approach, or implementation technique.

Source:

- ISO/IEC/IEEE 12207:2026
  - https://www.iso.org/standard/90219.html

## Knowledge captured

A strong common process standard can define **required process purposes and outcomes** without forcing every project into one workflow implementation.

This matters for `web-project-guide`, where different sites/games/apps may need different execution shapes while sharing omission-prevention principles.

**Adoption status:** not decided.

---

# 20. Lifecycle processes can apply recursively to subsystems/elements

## Evidence / observed practice

ISO/IEC/IEEE 12207:2026 states that lifecycle processes can be applied recursively to a software system and incrementally to its elements.

Source:

- ISO/IEC/IEEE 12207:2026
  - https://www.iso.org/standard/90219.html

## Knowledge captured

This independently supports the NASA observation that one repository/project does not necessarily need one flat classification or one flat process state.

Different elements can need different process/applicability treatment while remaining part of one larger project.

**Adoption status:** not decided.

---

# 21. ISO/IEC 33002 requires process-assessment results to be objective, consistent, repeatable, and representative

## Evidence / observed practice

ISO/IEC 33002:2015 defines minimum requirements for performing process assessments so that results are:

- objective,
- consistent,
- repeatable,
- representative of the processes being assessed.

The standard supports self-assessment, process improvement, process-risk mitigation, quality-characteristic rating, and objective benchmarking.

Source:

- ISO/IEC 33002:2015
  - https://www.iso.org/standard/54176.html

## Knowledge captured

This addresses a separate failure mode from missing rules: **review results themselves being unreliable or non-repeatable**.

A claim such as "I audited this and found nothing" is weak if a repeat review of the same repository could produce a different answer because the audit method is underspecified.

**Adoption status:** not decided.

---

# 22. ISO/IEC 33020 defines capability in terms of consistent achievement, not isolated success

## Evidence / observed practice

ISO/IEC 33020:2019 defines a process measurement framework for process capability. It describes process capability as a process-quality characteristic related to the ability of a process to **consistently** meet current or projected business goals.

The framework supports:

- self-assessment,
- process improvement,
- process-quality determination,
- process capability profiles,
- derived process capability levels.

It is designed to apply across application domains and organization sizes.

Source:

- ISO/IEC 33020:2019
  - https://www.iso.org/standard/78526.html

## Knowledge captured

This closely aligns with the CMMI persistence finding: one successful audit/implementation does not prove process capability.

The relevant question becomes:

> Does this process repeatedly produce the intended result under normal use?

**Adoption status:** not decided.

---

# 23. ISO/IEC 33004 separates normative process models from assessment models and measurement frameworks

## Evidence / observed practice

ISO/IEC 33004:2015 defines relationships among:

- process reference models,
- prescriptive/normative process-performance models,
- process assessment models,
- process measurement frameworks,
- assessment indicators,
- maturity models.

It explicitly describes how normative process descriptions such as ISO/IEC 12207/15288 relate to assessment models without treating them as the same artifact.

Source:

- ISO/IEC 33004:2015
  - https://www.iso.org/standard/54178.html

## Knowledge captured

This is a significant architecture pattern:

```text
what good/required process means
!=
how to assess whether it exists
!=
how to measure its capability
!=
how to summarize maturity
```

Combining all of these into one giant rule document can create coupling and maintenance problems.

**Adoption status:** not decided.

---

# 24. ISO/IEC 330xx supports multiple domain-specific assessment models on a common assessment foundation

## Evidence / observed practice

The ISO/IEC 330xx family includes domain-specific or purpose-specific process assessment models while reusing common process-assessment and measurement infrastructure.

Examples visible in the current ISO catalogue include:

- ISO/IEC TS 33060:2025 — system life-cycle process assessment model,
- ISO/IEC TS 33064:2025 — safety-process assessment model,
- ISO/IEC TS 33053:2019 — quality-management process reference model,
- ISO/IEC TR 33022:2024 — application of ISO/IEC/IEEE 12207 processes to the common process-capability measurement scale.

Sources:

- ISO/IEC TS 33060:2025
  - https://www.iso.org/standard/87701.html
- ISO/IEC TS 33064:2025
  - https://www.iso.org/standard/89829.html
- ISO/IEC TS 33053:2019
  - https://www.iso.org/standard/55144.html
- ISO/IEC JTC 1/SC 7 catalogue
  - https://www.iso.org/committee/45086/x/catalogue/

## Knowledge captured

A shared assessment engine/framework can coexist with multiple domain-specific process models. This resembles the idea of common mechanics plus project/domain overlays without forcing the entire rule system into one monolithic checklist.

**Adoption status:** not decided.

---

# 25. Current ISO standards themselves are versioned, reviewed, revised, and retired

## Evidence / observed practice

Current ISO catalogue pages expose lifecycle state and revision history. For example:

- ISO/IEC/IEEE 12207:2017 was withdrawn and replaced by ISO/IEC/IEEE 12207:2026.
- ISO 19011:2018 was replaced by ISO 19011:2026.
- ISO/IEC 33020:2019 was systematically reviewed and confirmed in 2026.
- ISO/IEC 33004:2015 remains published and has been confirmed through ISO's review lifecycle.

Sources:

- https://www.iso.org/standard/90219.html
- https://www.iso.org/standard/19011
- https://www.iso.org/standard/78526.html
- https://www.iso.org/standard/54178.html

## Knowledge captured

A rule framework's current validity is itself a managed state. Historical standards may remain useful evidence, but should not silently remain active merely because they once were authoritative.

**Adoption status:** not decided.

---

# 26. The ISO/IEC 27001 SoA pattern is unusually close to the current `web-project-guide` failure mode

## Comparison synthesis

The recent failure was approximately:

```text
project changed to have a human-facing GitHub Pages site
→ README/public-URL rule became applicable
→ first-pass routing/review did not expose or apply that rule
→ audit claimed near-completion
→ user later found the explicit rule manually
```

The ISO/IEC 27001 pattern addresses an analogous structural problem by requiring both:

1. a context/risk-derived set of necessary controls;
2. a comparison against a broader independent reference set to detect inadvertent omissions.

It does not trust either source alone.

Possible future analogy, **not yet adopted**:

```text
project/repository-derived applicable obligations
        +
Guide reference universe / overlays
        ↓
comparison / mapping
        ↓
explicit applicable / not-applicable / unresolved / exception states
        ↓
implementation status + evidence
```

**Adoption status:** strong research candidate, not accepted.

---

# 27. NASA, NIST, CMMI, and ISO/IEC are converging on several common control patterns

## Current cross-source convergence

These are research observations, not final requirements.

### A. Do not trust one classification/routing pass

- NASA: classification plus Requirements Mapping Matrix plus independent assurance.
- ISO/IEC 27001: context/risk-derived controls plus comparison against Annex A.
- NIST: baseline/profile/tailoring plus structured assessment.

### B. Make non-applicability explicit

- NASA: `Not Applicable` / tailoring requires justification and review.
- ISO/IEC 27001: excluded Annex A controls require justification in the SoA.

### C. Preserve implementation/compliance status after applicability resolution

- NASA: matrix tracks planned/actual compliance and evidence.
- ISO/IEC 27001: SoA includes whether necessary controls are implemented.
- NIST OSCAL: profile/implementation/assessment/results/POA&M are distinct machine-readable layers.

### D. Keep independent assessment separate from execution

- NASA: Software Assurance and IV&V.
- ISO 19011: independence and evidence-based auditing.
- CMMI: formal appraisal requirements and appraisal quality controls.
- ISO/IEC 33002: objective/repeatable/representative assessment requirements.

### E. Treat recurrence as a process problem, not only a local defect

- NASA: cross-project RMM review, lessons learned, SPI.
- ISO 9001: correction vs corrective action; systemic vs accidental causes.
- CMMI / ISO/IEC 33020: process capability and sustained repeatability.

### F. Separate normative rules from assessment models and reusable guidance

- NASA: NPR requirements vs Handbook / PAL / assurance guidance.
- ISO/IEC 33004: process reference/normative models vs assessment/measurement models.
- ISO 9001 ecosystem: standard vs non-normative Auditing Practices guidance.

**Adoption status:** research synthesis only.

---

# 28. Important caveat: several useful ISO-hosted papers are not themselves normative standards

## Evidence / observed practice

The ISO/IEC 27001 Auditing Practices Note and ISO 9001 Auditing Practices Group papers include disclaimers that they are educational/practitioner guidance and have not necessarily been formally endorsed as normative ISO requirements.

Sources:

- ISO/IEC 27001 SoA Auditing Practices Note
  - https://committee.iso.org/files/live/sites/jtc1sc27/files/resources/ISO-IECJTC1-SC27-WG1_N3298_Auditing%20Practices%20Note%20-%20SoA.pdf
- ISO 9001 Auditing Practices Group
  - https://committee.iso.org/home/tc176/iso-9001-auditing-practices-group.html

## Knowledge captured

Useful audit practice should not be mislabeled as a formal requirement.

This distinction is itself relevant to `web-project-guide` governance: evidence/reference guidance and normative Owner rules should remain distinguishable even when both are high quality.

**Adoption status:** not decided.

---

## Open Questions for Later Comparison

- Should `web-project-guide` maintain a complete reference universe against which project-derived applicability is cross-checked, similar to ISO/IEC 27001 Annex A?
- Should the final applicable set be a generated artifact with explicit state and version rather than an implicit list of Owner Docs read during a conversation?
- Can the SoA idea be made lightweight enough that routine small changes do not create paperwork while high-confidence audits still gain omission resistance?
- Which failure classes should require root-cause analysis and corrective action, versus a simple local correction?
- How independent can a second review really be when the same AI performs both passes, and what different data/path/algorithm could make the second pass less correlated with the first?
- Can a machine-readable assessment model be built separately from the normative rule documents, following the ISO/IEC 33004 separation?
- Should historical failure cases become repeatable audit fixtures/golden cases so that corrective actions have closure evidence?
- How should applicability-set versions be invalidated when project scope/runtime changes?
- How should externally delegated responsibilities remain visible without duplicating implementation detail?
- What would an objective/repeatable audit protocol look like for a one-person repository so that two audits of the same state reach approximately the same result?
