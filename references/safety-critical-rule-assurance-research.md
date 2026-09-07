# Safety-Critical Rule Assurance Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**. It intentionally records heavyweight, domain-specific, and currently impractical mechanisms as well as immediately usable ones.

## Research Question

How do safety-critical engineering domains reduce the chance that a required rule, verification activity, or safety obligation is missed, and how do they detect failures even when the original implementation or review process was wrong?

This pass covers civil aviation software assurance, general functional safety, automotive functional safety, and U.S. nuclear quality assurance.

---

# 1. Civil aviation — DO-178C / FAA development assurance

## 1.1 Rigor is scaled by safety consequence

### Evidence / observed practice

FAA guidance treats DO-178C / ED-12C as an accepted development-assurance means for airborne software. The assurance rigor is associated with the risk/safety level of the aircraft function. Higher consequence levels require more objectives and, for some objectives, independent verification.

FAA research and guidance explicitly describe Level A as requiring additional independent verification and modified condition/decision coverage (MC/DC), while lower software levels have fewer or less stringent objectives.

Sources:

- FAA AC 20-115D, `Airborne Software Development Assurance Using EUROCAE ED-12( ) and RTCA DO-178( )`
  - https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentID/1032046
- FAA, `Abstraction Layer Information`
  - https://www.faa.gov/aircraft/air_cert/design_approvals/air_software/abstraction_layer
- FAA, `Explicate '78: Assurance Case Applicability to Digital Systems`
  - https://www.faa.gov/sites/faa.gov/files/aircraft/air_cert/design_approvals/air_software/TC-17-67.pdf

### Knowledge captured

Safety-critical assurance does not use one uniform review depth. The verification burden is explicitly escalated as consequence/risk rises.

This is structurally different from a single binary `important/not important` flag. A safety level changes which verification objectives exist and whether independence is required.

**Adoption status:** not decided.

---

## 1.2 Development and verification are separated conceptually

### Evidence / observed practice

DO-178C's public FAA representations separate software development processes from the software verification process. Verification includes reviews/analyses, requirements-based testing, test coverage analysis, structural coverage analysis, and traceability.

FAA's DO-178B/C Differences Tool says DO-178C clarified verification independence and notes that, for applicable cases, the same individual who produced certain development data cannot also perform the corresponding independent verification activity. The tool specifically notes low-level-requirement test cases as an example where independence matters.

Sources:

- FAA, `DO-178B/C Differences Tool`
  - https://www.faa.gov/sites/faa.gov/files/aircraft/air_cert/design_approvals/air_software/differences_tool.pdf
- FAA, `Final Report for Software Service History and Airborne Electronic Hardware Service Experience in Airborne Systems`
  - https://www.faa.gov/sites/faa.gov/files/aircraft/air_cert/design_approvals/air_software/TC_16_18.pdf

### Knowledge captured

The design assumes that a developer's own confirmation is not always enough evidence. At higher assurance levels, selected verification activities must come from a sufficiently independent path.

Independence is applied selectively rather than universally to every action.

**Adoption status:** not decided.

---

## 1.3 Bidirectional traceability is treated as a verification mechanism

### Evidence / observed practice

FAA's DO-178B/C Differences Tool explains that bidirectional traceability existed in DO-178B but was clarified and made more explicit in DO-178C. Public FAA process representations show traceability objectives from system requirements to high-level requirements, low-level requirements, source code, tests, and verification results.

Requirements-based test coverage is checked separately from structural coverage.

Sources:

- FAA, `DO-178B/C Differences Tool`
  - https://www.faa.gov/sites/faa.gov/files/aircraft/air_cert/design_approvals/air_software/differences_tool.pdf
- FAA, `Final Report for Software Service History and Airborne Electronic Hardware Service Experience in Airborne Systems`
  - https://www.faa.gov/sites/faa.gov/files/aircraft/air_cert/design_approvals/air_software/TC_16_18.pdf

### Knowledge captured

Traceability serves more than documentation. It can expose at least two different defect classes:

- requirement exists but no implementation/test/evidence is connected to it;
- implementation/code exists but no requirement justifies it.

The second direction matters because it helps detect unintended or unexplained functionality, not only missing implementation.

**Adoption status:** strong research candidate, not accepted.

---

## 1.4 Requirements-based testing and structural coverage answer different questions

### Evidence / observed practice

FAA material separates:

- requirements-based test coverage — whether requirements are exercised by tests;
- structural coverage — which code structure was actually exercised.

For higher-assurance software, structural coverage requirements become stronger; Level A includes MC/DC. FAA research describes structural coverage analysis as an objective way to measure completeness of requirements-based tests and support detection of unintended functionality.

Sources:

- FAA, `DO-178B/C Differences Tool`
- FAA, `Phase II Handbook` on structural coverage
  - https://www.faa.gov/sites/faa.gov/files/aircraft/air_cert/design_approvals/air_software/AR-07-17.pdf

### Knowledge captured

A single completeness mechanism is insufficient. Requirements coverage can miss unexpected implementation behavior; code coverage can pass while the wrong requirements were implemented.

Safety-critical assurance therefore cross-checks the system from more than one representation.

**Adoption status:** strong research candidate, not accepted.

---

## 1.5 Verification is expected to detect unintended functionality, not only known defects

### Evidence / observed practice

FAA material repeatedly distinguishes satisfying requirements from demonstrating the absence of unintended behavior/functionality. Structural coverage, source-code review, architecture review, robustness requirements/tests, and design-level error handling contribute different evidence.

FAA AC 00-69 recommends identifying foreseeable error sources and defining mitigations/protection mechanisms at the design/requirements level rather than relying only on later code review.

Examples listed by FAA include arithmetic overflow, stack/heap overflow, divide-by-zero, timing/counter overruns, memory corruption, resource contention, partitioning problems, interrupt/cache issues, and unpredictable execution behavior.

Source:

- FAA AC 00-69, `Best Practices for Airborne Software Development Assurance Using EUROCAE ED-12( ) and RTCA DO-178( )`
  - https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_00-69.pdf

### Knowledge captured

The system does not only ask `Did we implement every stated requirement?`. It also asks `Did we accidentally create behavior that was never intended?`.

That is a distinct failure mode from omission.

**Adoption status:** not decided.

---

## 1.6 Change impact analysis is systematic and broader than the edited files

### Evidence / observed practice

FAA AC 00-69 recommends Software Change Impact Analysis (CIA) that identifies the released baseline, summarizes requested changes/problem reports/new functions, and evaluates impacts on, where applicable:

- software level;
- development/verification environment;
- software processes;
- tools and tool versions/use;
- processor/hardware/interfaces;
- configuration data;
- interface and input/output requirements;
- requirements, design, architecture, and code.

The AC explicitly says impact should not be limited to modified lifecycle data; affected related data must also be considered. For each applicable category, the CIA identifies the resulting impact and the activities required to continue satisfying the assurance objectives.

Source:

- FAA AC 00-69
  - https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_00-69.pdf

### Knowledge captured

Change review is based on affected obligations, not only `files changed`.

A tiny code diff can invalidate previous assurance evidence if it changes toolchain, runtime, architecture, interface assumptions, safety level, or surrounding requirements.

**Adoption status:** strong research candidate, not accepted.

---

## 1.7 Verification tools themselves may require qualification

### Evidence / observed practice

FAA AC 20-115D recognizes DO-330 for software tool qualification. FAA research describes assigning a Tool Qualification Level (TQL) according to how failure of the tool's particular use could affect safety or allow an error to escape detection. More consequential tool uses receive more rigorous qualification.

Qualification can apply to a particular use/feature of a tool rather than necessarily every feature of the entire tool.

Sources:

- FAA AC 20-115D
- FAA, `DOT/FAA/TC-23/06`
  - https://www.faa.gov/aircraft/air_cert/design_approvals/air_software/research/TC2306
- FAA, `Explicate '78`

### Knowledge captured

A validator, static analyzer, generator, compiler, or audit automation is itself a possible source of false confidence.

Safety-critical systems therefore do not assume `automated = trustworthy`. The trust placed in the tool is related to its consequence if wrong and to whether independent verification would otherwise detect the tool's failure.

**Adoption status:** strong research candidate, not accepted.

---

## 1.8 Alternative methods are allowed only if equivalent assurance can be shown

### Evidence / observed practice

FAA AC 20-171 allows alternatives to the recognized DO-178 approach, but the applicant must address/document how the alternative provides the same level of assurance.

More recently, the FAA/EASA Abstraction Layer work produced assessment criteria intended to evaluate alternate standards or methodologies without reducing aviation safety assurance.

Sources:

- FAA AC 20-171, `Alternatives to RTCA/DO-178B for Software in Airborne Systems and Equipment`
  - https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentID/698460
- FAA, `Abstraction Layer Information`

### Knowledge captured

A safety system can allow flexibility without reducing the assurance target. The invariant is the confidence/evidence objective, not necessarily one exact ritual.

This provides a way to evolve process without silently weakening it.

**Adoption status:** not decided.

---

## 1.9 Formal plans and final accomplishment evidence are separate artifacts

### Evidence / observed practice

Public FAA representations of DO-178C list planning artifacts (e.g. software development, verification, configuration-management, and quality-assurance plans) separately from lifecycle data and final accomplishment/compliance substantiation artifacts.

The lifecycle includes explicit software configuration management, problem reporting/tracking/corrective action, change control/review, quality assurance, certification liaison, and a Software Accomplishment Summary.

Source:

- FAA, `DO-178B/C Differences Tool`

### Knowledge captured

The assurance process distinguishes:

- what was planned;
- what was actually built;
- what verification produced;
- what changed;
- what problems remain;
- why the final state is considered compliant.

A plan/checklist alone is not the completion evidence.

**Adoption status:** not decided.

---

# 2. IEC 61508 — generic functional safety

## 2.1 Safety is managed as a lifecycle, not a final test phase

### Evidence / observed practice

IEC 61508 defines an overall safety lifecycle and additional E/E/PE system and software safety lifecycles. Public IEC material describes phases including concept, specification, design, installation/commissioning, validation, operation/maintenance, and modification. Each lifecycle phase has associated requirements.

Sources:

- IEC, `IEC 61508 & Functional Safety`
  - https://assets.iec.ch/public/acos/IEC%2061508%20%26%20Functional%20Safety-2022.pdf
- IEC 61508-1:2010
  - https://webstore.iec.ch/en/publication/5515

### Knowledge captured

Safety assurance is intentionally spread across lifecycle stages. A final test cannot compensate for missing hazard analysis, poor requirements, incorrect design, uncontrolled change, or weak maintenance processes.

**Adoption status:** not decided.

---

## 2.2 Safety Integrity Levels grade rigor by required risk reduction

### Evidence / observed practice

IEC 61508 defines four Safety Integrity Levels (SIL 1–4). Public IEC material states that higher SILs correspond to greater required risk reduction. IEC 61508-2 and IEC 61508-3 apply techniques/measures graded by the required safety integrity/systematic capability.

Sources:

- IEC Functional Safety brochure
  - https://assets.iec.ch/public/acos/IEC%20Brochure%20functional_safetyBrochure_2015.pdf
- IEC 61508-2:2010
  - https://webstore.iec.ch/en/publication/5516
- IEC 61508-3:2010
  - https://webstore.iec.ch/en/publication/5517

### Knowledge captured

Like aviation, this model varies the required process/verification rigor by consequence/risk rather than treating all systems identically.

**Adoption status:** not decided.

---

## 2.3 Techniques and measures are graded rather than simply present/absent

### Evidence / observed practice

IEC 61508-2 states that techniques and measures for avoiding and controlling faults/failures are graded against SIL. IEC 61508-3 similarly grades software techniques/measures against systematic capability.

Sources:

- IEC 61508-2:2010
- IEC 61508-3:2010

### Knowledge captured

A rule catalog may need metadata stronger than `required/optional`. A technique can be recommended, highly recommended, required, or otherwise escalated depending on assurance level/context.

**Adoption status:** not decided.

---

## 2.4 Modification is its own lifecycle obligation

### Evidence / observed practice

IEC 61508-2 and IEC 61508-3 explicitly include requirements for organizations modifying safety-related hardware/software after initial development.

Sources:

- IEC 61508-2:2010
- IEC 61508-3:2010

### Knowledge captured

Safety evidence is not permanent after release. Changes create new obligations and can invalidate previous assumptions/evidence.

This converges with NASA reclassification/update rules and FAA change-impact analysis.

**Adoption status:** not decided.

---

## 2.5 Support/development tools are part of the safety assurance scope

### Evidence / observed practice

IEC 61508-3 explicitly includes requirements for support tools such as development/design tools, language translators, testing/debugging tools, and configuration-management tools.

Source:

- IEC 61508-3:2010

### Knowledge captured

Toolchain trust is again treated as part of system assurance, independently reinforcing the DO-330 idea.

**Adoption status:** not decided.

---

## 2.6 Generic base standard + sector standards is an explicit architecture

### Evidence / observed practice

IEC 61508 is a generic/basic safety standard designed to support development of sector-specific standards. ISO 26262 is one such domain-specific adaptation for road vehicles.

Sources:

- IEC 61508-1:2010
- ISO 26262-2:2011 introduction
  - https://www.iso.org/obp/ui/?_escaped_fragment_=iso%3Astd%3Aiso%3A26262%3A-2%3Aed-1%3Av1%3Aen

### Knowledge captured

The standards architecture itself uses layered inheritance:

```text
Generic safety principles
+ sector-specific adaptation
+ project-specific application/tailoring
```

This is similar to NIST catalog + profile/overlay and is relevant to maintainability of a large rule system.

**Adoption status:** strong research candidate, not accepted.

---

# 3. ISO 26262 — automotive functional safety

## 3.1 Functional safety is integrated into the organization's normal development framework

### Evidence / observed practice

ISO 26262-2 describes functional-safety management requirements that include both project-independent organizational requirements and project-specific lifecycle-management activities. It is designed to integrate safety activities into a company's existing development framework.

Source:

- ISO 26262-2:2018
  - https://www.iso.org/standard/68384.html

### Knowledge captured

Safety assurance is not necessarily a parallel bureaucracy disconnected from normal engineering. The standard expects integration into the normal process framework.

**Adoption status:** not decided.

---

## 3.2 Existing systems and modifications use lifecycle tailoring

### Evidence / observed practice

ISO 26262-2 and Part 9 state that alterations to existing systems and integration of systems not originally developed under the standard are handled by tailoring the safety lifecycle according to the alteration/integration context.

Sources:

- ISO 26262-2:2018
- ISO 26262-9:2018
  - https://www.iso.org/standard/68391.html

### Knowledge captured

Legacy work is not automatically exempt from safety reasoning, but neither is every modification treated as greenfield redevelopment. Applicability is recomputed around the change.

**Adoption status:** not decided.

---

## 3.3 Hazard-oriented analysis drives safety integrity and decomposition

### Evidence / observed practice

ISO 26262 Part 9 covers ASIL-oriented and safety-oriented analyses, including ASIL decomposition, coexistence criteria, dependent-failure analysis, and safety analyses.

The current published edition is 2018. As of 2026-09-07, a third edition is under development as ISO/DIS 26262-9, which continues to describe these topics.

Sources:

- ISO 26262-9:2018
- ISO/DIS 26262-9, Edition 3 draft
  - https://committee.iso.org/cms/live/live/en/sites/isoorg/contents/data/standard/09/00/90028.html

### Knowledge captured

Risk/criticality is not merely a label. It propagates into how safety requirements can be decomposed, which elements can coexist, how dependent failures are analyzed, and how much assurance is required.

**Adoption status:** not decided.

---

## 3.4 Systematic failures and random hardware failures are treated separately

### Evidence / observed practice

ISO 26262's public introduction explicitly distinguishes risks from systematic failures and random hardware failures, and provides requirements/processes to avoid/control them.

Source:

- ISO 26262-2 public introduction/abstract

### Knowledge captured

Not every failure is handled by the same prevention mechanism. Process/requirements defects and probabilistic hardware failure need different assurance strategies.

For a rule system, the analogous distinction may be between systematic process omissions and random/transient execution failures.

**Adoption status:** interpretation only; not decided.

---

# 4. U.S. nuclear quality assurance — NRC / 10 CFR Part 50 Appendix B

## 4.1 Quality assurance is a closed-loop management-control system

### Evidence / observed practice

NRC material summarizes Appendix B to 10 CFR Part 50 as requiring 18 quality-assurance criteria covering areas including organizational independence, design control, procurement, document control, test control, corrective action, records, and audits.

NRC describes the framework as a closed-loop process in which:

1. planned controls govern safety-related work;
2. inspections/audits verify that controls were effectively performed;
3. deficiencies trigger corrective action;
4. records are retained so after-the-fact inspection remains possible.

Source:

- NRC NUREG-1650 material on Appendix B
  - https://www.nrc.gov/reading-rm/doc-collections/nuregs/staff/sr1650/sr1650.pdf

### Knowledge captured

The system explicitly needs four distinct layers: planned process, verification, corrective action, and retained evidence.

No single layer substitutes for the others.

**Adoption status:** strong research candidate, not accepted.

---

## 4.2 Control depth is proportional to importance to safety

### Evidence / observed practice

NRC material explaining Appendix B Criterion II says the QA program identifies the structures/systems/components covered and provides control over quality-affecting activities to an extent consistent with their importance to safety.

Source:

- NRC, `Task I.F: QUALITY ASSURANCE: Expand QA List`
  - https://www.nrc.gov/sr0933/section-1-tmi-action-plan-items/task-if-quality-assurance-expand-qa-list

### Knowledge captured

Again, assurance depth is risk-weighted rather than flat across all items.

**Adoption status:** not decided.

---

## 4.3 Design control explicitly requires translation of requirements into downstream artifacts

### Evidence / observed practice

NRC's description of Appendix B Criterion III requires measures to assure applicable regulatory requirements/design basis are correctly translated into specifications, drawings, procedures, and instructions; appropriate standards are included; deviations are controlled; and adequacy of design is verified/checked.

Sources:

- NRC, `Task I.F: QUALITY ASSURANCE: Expand QA List`
- NRC enforcement examples under Appendix B Criterion III

### Knowledge captured

The concern is not only whether an upstream requirement exists. The system verifies that it survives translation into downstream design/execution artifacts without being lost or distorted.

**Adoption status:** strong research candidate, not accepted.

---

## 4.4 Interface control is explicitly audited

### Evidence / observed practice

NRC enforcement records show violations where organizations failed to identify/control design interfaces and coordinate participating design organizations, and failed to verify/check design adequacy.

Source:

- NRC enforcement example, Three Mile Island Unit 1, EA-95-238
  - https://www.nrc.gov/reading-rm/doc-collections/enforcement/actions/reactors/ea95238

### Knowledge captured

Safety-critical failures can occur between components/teams/processes even if each local artifact looks acceptable. Interface obligations therefore receive explicit control and verification.

**Adoption status:** not decided.

---

## 4.5 Corrective action is a first-class criterion with public nonconformance history

### Evidence / observed practice

Appendix B Criterion XVI is dedicated to corrective action. NRC publishes notices of nonconformance/violation grouped by QA criterion, including a dedicated corrective-action history and recent software-development/vendor inspections.

Sources:

- NRC Appendix B NON/NOV index
  - https://www.nrc.gov/reactors/new-reactors/how-we-regulate/oversight/quality-assurance/nonconformances-violations
- NRC Criterion XVI, Corrective Action
  - https://www.nrc.gov/reactors/new-reactors/how-we-regulate/oversight/quality-assurance/nonconformances-violations/criterion-xvi

### Knowledge captured

Corrective-action process effectiveness is itself inspected. A system can fail not only because a defect occurred, but because known defects were not dispositioned, tracked, fixed, or prevented from recurring.

**Adoption status:** not decided.

---

## 4.6 Independent audit/inspection extends to suppliers and third parties

### Evidence / observed practice

NRC maintains inspection procedures for software used in nuclear applications, vendor QA, engineering design verification, reporting of defects/noncompliance, and oversight of third-party organizations implementing QA requirements.

The inspection catalog includes `IP 35710 - Quality Assurance Inspection of Software Used in Nuclear Applications` and `IP 43005 - NRC Oversight of Third-Party Organizations Implementing Quality Assurance Requirements`.

Source:

- NRC, `Inspection Procedures`
  - https://www.nrc.gov/reactors/new-reactors/how-we-regulate/oversight/quality-assurance/vendor-insp/insp-procedures

### Knowledge captured

Delegating work does not delegate assurance responsibility away. Suppliers, vendors, software providers, and even third-party oversight organizations remain part of the audit scope.

**Adoption status:** not decided.

---

## 4.7 Defect/noncompliance reporting can be a separate obligation from local fixing

### Evidence / observed practice

10 CFR Part 21 establishes reporting/evaluation obligations for defects and noncompliance in basic components and related services/programs. NRC provides specific guidance for evaluating and reporting defects.

Source:

- NRC, `Guidance on Implementation of 10 CFR Part 21 Requirements`
  - https://www.nrc.gov/reactors/new-reactors/how-we-regulate/oversight/quality-assurance/part-21-rulemaking

### Knowledge captured

A serious defect is not only something to repair locally. The system may require escalation/notification so the same defect does not remain hidden elsewhere in the ecosystem.

**Adoption status:** not decided.

---

## 4.8 Personnel performing inspection/audit activities have qualification requirements

### Evidence / observed practice

NRC guidance and historical regulatory material address qualification of inspection, examination, testing, and audit personnel under the QA framework.

Source:

- NRC Generic Letter 81-01, `Qualification of Inspection, Examination, Testing and Audit Personnel`
  - https://www.nrc.gov/reading-rm/doc-collections/gen-comm/gen-letters/1981/gl81001

### Knowledge captured

Assurance quality depends partly on reviewer competence, not only checklist content.

A theoretically complete audit may still be unreliable if the person/tool executing it cannot recognize the relevant failure modes.

**Adoption status:** not decided.

---

## 4.9 External inspection history becomes reusable applicability information

### Evidence / observed practice

NRC Information Notices distribute discovered deficiencies to other regulated organizations and explicitly ask recipients to review applicability to their own facilities and consider preventive actions, even when the notice itself is not a new mandatory requirement.

Example: Information Notice 84-54 distributed common findings about design-basis documentation/calculations.

Source:

- NRC Information Notice 84-54
  - https://www.nrc.gov/reading-rm/doc-collections/gen-comm/info-notices/1984/in84054

### Knowledge captured

One project's defect can become a cross-project trigger for self-review without automatically becoming a universal new rule.

This is another knowledge layer between `incident happened` and `new mandatory requirement`.

**Adoption status:** strong research candidate, not accepted.

---

# 5. Cross-domain convergence observed so far

These are observations, not adopted requirements.

## 5.1 Independent failure barriers are intentional

Across NASA, aviation, IEC/ISO functional safety, and nuclear QA, confidence comes from multiple different controls rather than one perfect router/checklist/test.

Common barrier types include:

- classification / risk level;
- requirements/control applicability;
- traceability;
- independent review;
- requirements-based verification;
- alternate representation / coverage checks;
- configuration/change control;
- tool qualification;
- audit;
- corrective action;
- records/evidence;
- lifecycle re-evaluation.

A single missed barrier should not automatically permit a dangerous false-positive completion decision.

---

## 5.2 Risk changes the assurance process itself

NASA classification, DO-178 software levels, IEC SILs, ISO 26262 ASILs, and nuclear importance-to-safety all alter the depth/rigor of required controls.

This strongly suggests a distinction between:

- project/domain classification;
- consequence/criticality/assurance level;
- task/change scope.

They are not interchangeable concepts.

---

## 5.3 `Requirements complete` and `implementation contains no unexplained behavior` are separate claims

Bidirectional traceability and structural coverage illustrate two complementary questions:

1. Did every required obligation reach implementation and verification?
2. Did implementation introduce behavior/artifacts not justified by an obligation?

A rule system focused only on the first question may still miss accidental additions, side effects, stale code, or hidden obligations.

---

## 5.4 Change invalidation is a recurring core concept

NASA reclassification, FAA change impact analysis, IEC/ISO lifecycle modification rules, and NIST continuous monitoring all reject the assumption that prior evidence remains permanently valid after change.

The system needs to know which evidence is invalidated by which changes.

---

## 5.5 Verification automation is itself an assurance dependency

DO-330 and IEC 61508 tool requirements make the same point from different domains: if a tool creates, transforms, checks, or certifies important evidence, the correctness of that tool/use matters.

For a future AI-assisted guide this could include:

- routing engine;
- rule parser;
- compliance matrix generator;
- validator;
- automatic test/evidence collector;
- LLM classification;
- static analysis;
- GitHub workflow checks.

This is recorded even though strong tool qualification is currently far beyond the likely practical scope of the project.

---

## 5.6 Audit competence/independence matters independently of rule completeness

NASA Software Assurance/IV&V, DO-178 verification independence, ISO audit principles, CMMI appraisal governance, and NRC auditor qualification all converge on the idea that `who/what performs the check` affects confidence.

The audit mechanism cannot be modeled as a neutral black box.

---

## 5.7 Corrective action is different from correction

ISO 9001 audit practice and NRC corrective-action criteria reinforce the distinction already observed:

- correct the immediate defect;
- determine whether it represents a systemic cause;
- prevent recurrence;
- verify closure/effectiveness.

A defect discovered during a guide audit can therefore require both a repository fix and a rule/process fix.

---

# 6. Heavyweight mechanisms intentionally preserved for later consideration

The following mechanisms are recorded even if they are currently unrealistic for a one-person Web-development guide:

- formally assigned safety/assurance levels with graded objective tables;
- mandatory independence for selected review activities;
- bidirectional lifecycle traceability down to implementation and verification evidence;
- structural coverage as a separate completeness barrier;
- formal safety case / assurance case arguments;
- qualified verification/development tools based on consequence of tool failure;
- qualified/certified auditors;
- independent external certification authority review;
- supplier and third-party QA audits;
- formal defect/noncompliance escalation/reporting;
- long-term auditable records supporting later forensic inspection;
- controlled baselines and explicit invalidation/reverification after toolchain/runtime/process changes;
- sector-specific overlays derived from a generic safety standard;
- formal alternative-means-of-compliance equivalence arguments;
- safety lifecycle spanning development, deployment, operation, maintenance, and modification.

No decision has been made yet about whether any of these should be implemented, simplified, or rejected.

---

# 7. Research limitations / caveats

- DO-178C, ISO 26262, and major portions of IEC 61508 are copyrighted commercial standards; this research uses public FAA/ISO/IEC regulatory pages, official summaries/previews, and public research material rather than reproducing proprietary standard text.
- FAA research reports are evidence/research and may not themselves be binding FAA policy. AC 20-115D is the primary public FAA means-of-compliance reference used here.
- ISO 26262:2018 remains the current published edition used in this pass; Edition 3 drafts are under development in 2026 and were recorded only as current evolution context.
- NRC sources include both current regulatory/inspection pages and older historical examples; historical material is retained because it demonstrates the origin and behavior of assurance mechanisms, not because every historical detail is current policy.

---

# 8. Open questions for later research

- How do medical-device standards/regulators (IEC 62304, FDA design controls, IEC 60601) handle software traceability, independent review, risk-control verification, and post-market feedback?
- How do railway safety standards (EN 50128 / EN 50716) structure graded software assurance and independence?
- How do formal assurance-case standards such as GSN/SACM structure `claim → evidence → argument → defeater` and could this be useful for final completion decisions?
- How do modern safety-critical organizations automate traceability and evidence collection without allowing automation errors to become a single point of assurance failure?
- What mechanisms are specifically proven to reduce omission errors by human reviewers?
- Which safety-critical controls are orthogonal enough to create genuinely independent barriers, rather than duplicating the same failure mode under different names?
