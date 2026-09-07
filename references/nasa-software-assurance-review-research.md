# NASA Software Assurance / Independent Review Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Parent research question: `references/rule-application-reliability-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**.
- Purpose of this file: preserve as much of the reviewed NASA material as practical before deciding what to adopt, simplify, reject, or defer.

## Scope of this pass

This pass focuses on NASA mechanisms that provide a second or third line of review after the development team has made its own decisions:

- Software Assurance (SA)
- periodic Requirements Mapping Matrix (RMM) review
- independent software classification / concurrence
- Independent Verification & Validation (IV&V)
- IV&V Surveillance
- assessment checklists / PAT assets
- audits, findings, corrective actions, and issue closure
- objective evidence
- Software Assurance Plan structure
- review cadence, lifecycle alignment, and historical records
- small-project scaling guidance

This is still only one source family. No practice below is accepted as a `web-project-guide` rule merely because NASA uses it.

---

# Source / revision note

NASA's public Software Engineering Handbook contains current Ver D material together with older Ver C / Ver B pages and historical requirement versions.

This matters because some mechanisms changed in wording over time.

Example:

- Older `SWE-132 - Independent Software Classification Assessment` explicitly required the project's Software Assurance organization to perform an independent classification assessment.
- Current Ver D `SWE-020` states that Software Assurance **can perform an independent classification or concur with Engineering's classification**, while Engineering and Software Assurance Technical Authorities must agree on the classification; disagreements use a dissent process.

Therefore historical NASA practices are recorded here when informative, but they must not be represented as current mandatory NASA requirements unless the current source supports that statement.

Sources:

- Current Ver D `SWE-020 - Software Classification`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695405/SWE-020%2B-%2BSoftware%2BClassification
- Historical `SWE-132 - Independent Software Classification Assessment`
  - https://swehb.nasa.gov/spaces/7150/pages/16450567/SWE-132%2B-%2BIndependent%2BSoftware%2BClassification%2BAssessment

---

# A-01 — Software Assurance is a distinct assurance function, not merely ordinary development testing

## Evidence / observed practice

NASA-STD-8739.8B defines Software Assurance and Software Safety as a systematic set of activities intended to assess whether processes, procedures, and products conform to requirements and whether the resulting software has suitable quality, safety, and security characteristics.

The standard explicitly includes independent assessment of critical products and processes using rigorous analysis and testing methods that produce objective evidence and conclusions.

NASA also states that Software Assurance / Software Safety / IV&V require management support, skilled people, equipment, knowledge, methods, facilities, and tools.

Source:

- `NASA-STD-8739.8B`
  - https://swehb.nasa.gov/spaces/SITE/pages/119242809/NASA-STD-8739.8B

## Knowledge captured

- Assurance is broader than "run tests at the end."
- Assurance looks at both **process** and **product**.
- Assurance can ask whether a process is adequate, not merely whether it was followed.
- Assurance produces objective evidence rather than relying on developer confidence.
- Assurance is treated as work that needs resources and planning, not a free side effect of development.

**Adoption status:** not decided.

---

# A-02 — Periodic review of the Requirements Mapping Matrix is itself a formal control

## Evidence / observed practice

Current Ver D `SWE-152` requires NASA's Office of the Chief Engineer (OCE) to periodically review project Requirements Mapping Matrices.

NASA describes several purposes for these reviews:

- verify requirement alignment and completeness,
- identify gaps or inconsistencies,
- identify risk from inadequate / obsolete / misaligned requirements,
- confirm adherence to engineering, safety, and programmatic standards,
- ensure matrices change when technology, mission priorities, or operational constraints change,
- maintain stakeholder alignment,
- support lessons learned and continuous improvement,
- provide accountability and central oversight.

The OCE also looks across matrices for **patterns and trends** in waivers, deviations, and tailoring. Repeated patterns may indicate that a Center/project needs help or that the NASA-wide requirement itself needs clarification or revision.

Source:

- `SWE-152 - Review Requirements Mapping Matrices`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695508/SWE-152%2B-%2BReview%2BRequirements%2BMapping%2BMatrices

## Knowledge captured

There are at least two levels of use for the same matrix:

1. project-level compliance / traceability,
2. organization-level pattern detection and rule-system improvement.

The second use is particularly notable: the compliance data feeds improvement of the rules themselves.

**Adoption status:** candidate for later comparison, not accepted.

---

# A-03 — NASA reviews the matrix with dedicated assessment checklists

## Evidence / observed practice

NASA publishes Process Asset Template (PAT) assessment checklists, including:

- `PAT-052 - Software Assurance Reqts Mapping Matrix Assessment`
- `PAT-057 - Software Engineering Reqts Mapping Matrix Assessment`

`PAT-052` is described as a checklist for assessing the content of the Software Assurance Requirements Mapping Matrix and is linked to requirements such as SWE-039, SWE-121, SWE-125, SWE-126, SWE-152, SWE-176, and SWE-212.

`PAT-057` is a corresponding assessment for the Software Engineering Requirements Mapping Matrix.

Sources:

- NASA Software Assurance Tasking / PAT database
  - https://swehb.nasa.gov/spaces/SITE/pages/204079229/Software%2BAssurance%2BTasking%2BFull%2BDetail
  - https://swehb.nasa.gov/display/SITE/PAT%2BDatabase
- Assessment checklist catalog
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/204079325/8.27%2B-%2BSoftware%2BEngineering%2Band%2BSoftware%2BAssurance%2BChecklists

## Knowledge captured

NASA does not only define the artifact; it also provides a **separate artifact for checking the artifact**.

This is a different control from the matrix itself:

```text
requirements
→ mapping matrix
→ assessment checklist for the mapping matrix
```

The exact checklist contents were not fully deep-read in this pass, but the existence and role of the assessment assets are confirmed.

**Adoption status:** not decided.

---

# A-04 — Current classification requires agreement between Engineering and Software Assurance

## Evidence / observed practice

Current Ver D `SWE-020` states:

- each system/subsystem containing software is classified using the highest applicable class,
- Software Assurance may independently classify or concur with Engineering's classification,
- Engineering and Software Assurance Technical Authorities need to agree,
- disagreement uses the Center dissenting-opinion process.

The classification is not only a product label; it determines applicability and rigor across engineering, safety, assurance, and related requirements.

Source:

- `SWE-020 - Software Classification`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695405/SWE-020%2B-%2BSoftware%2BClassification

## Knowledge captured

The current NASA mechanism is not necessarily "two people must independently recompute every classification." It can be:

1. Engineering makes the classification,
2. Software Assurance independently evaluates it and either concurs or challenges it,
3. Technical Authorities must reach agreement or use a dissent path.

This still prevents silent dependence on one unchecked classification decision.

**Adoption status:** candidate for later comparison, not accepted.

---

# A-05 — NASA preserves classification and assessment records for the project lifetime

## Evidence / observed practice

NASA-STD-8739.8B mapping material includes a requirement for records of:

- software classification determinations,
- Requirements Mapping Matrices,
- independent classification assessment results,

to be maintained for the life of the project.

Source:

- `8739.8B-T1-Requirements Mapping Matrix`
  - https://swehb.nasa.gov/spaces/SITE/pages/121340655/8739.8B-T1-Requirements%2BMapping%2BMatrix

## Knowledge captured

Classification is treated as traceable project evidence, not a temporary conversational decision.

It is possible to look back and determine:

- what classification was chosen,
- what matrix followed from it,
- what independent assessment occurred,
- how those decisions changed later.

**Adoption status:** not decided.

---

# A-06 — IV&V exists because teams are not fully objective when reviewing their own work

## Evidence / observed practice

NASA's IV&V Surveillance guidance explicitly states that software development teams cannot be completely objective when reviewing their own work. It notes that even strong teams and major programs have had issues discovered later when different analysis approaches, tools, and perspectives were introduced.

An IV&V agent independently assesses software and can challenge development artifacts from a different perspective.

Source:

- `8.06 - IV&V Surveillance`
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/72024974/8.06%2B-%2BIV%2BV%2BSurveillance

## Knowledge captured

NASA treats reviewer independence as a direct response to cognitive / organizational blind spots, not merely a bureaucratic separation of roles.

The underlying idea is relevant even before deciding whether a single-person project can reproduce organizational independence.

**Adoption status:** candidate for later comparison, not accepted.

---

# A-07 — IV&V independence is explicitly multi-dimensional

## Evidence / observed practice

NASA defines IV&V independence using three parameters:

### Technical independence

The IV&V personnel are not involved in development. They independently understand the problem and the system, which allows a different technical perspective and can expose subtle errors missed by developers.

### Managerial independence

The IV&V personnel are not in the same organization as development/program management. They choose:

- which system/software segments to analyze,
- which analysis methods to use,
- their own analysis schedule.

Findings should reach management without requiring approval by the development organization.

### Financial independence

Control of the IV&V budget is outside the development organization so the IV&V effort cannot be suppressed through financial pressure.

Source:

- NASA-STD-8739.8 IV&V material reproduced in `8.06 - IV&V Surveillance`
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/72024974/8.06%2B-%2BIV%2BV%2BSurveillance

## Knowledge captured

"Independent review" is not one binary property. NASA separates at least:

- independence of technical thinking,
- independence of management/control,
- independence of funding/incentives.

A future small-project equivalent might only reproduce some of these dimensions; that decision comes later.

**Adoption status:** not decided.

---

# A-08 — Independent review begins early, not only at final acceptance

## Evidence / observed practice

NASA says IV&V starts early in the software development lifecycle so feedback can be given while changes are cheaper and more useful.

IV&V may analyze the lifecycle from concept through:

- requirements,
- architecture/design,
- code/data,
- testing.

The exact scope depends partly on risk and available resources.

Source:

- `8.06 - IV&V Surveillance`
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/72024974/8.06%2B-%2BIV%2BV%2BSurveillance

## Knowledge captured

NASA does not treat independence as a final ceremonial sign-off. It is intended to detect problems while the project can still react.

**Adoption status:** not decided.

---

# A-09 — IV&V is risk-driven because it cannot inspect everything equally

## Evidence / observed practice

NASA's IV&V guidance notes that IV&V teams can be much smaller than development teams and therefore cannot analyze every aspect of large software equally.

The IV&V agent performs a risk assessment, creates a prioritized list of software capabilities/entities, and concentrates analysis on the riskiest parts.

The rigor of IV&V analysis is also described as driven by software risk.

Source:

- `8.06 - IV&V Surveillance`
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/72024974/8.06%2B-%2BIV%2BV%2BSurveillance

## Knowledge captured

Even a high-assurance organization does not necessarily mean every artifact receives equal independent analysis depth.

The mechanism is:

```text
independence
+ risk assessment
+ prioritized analysis
```

rather than "review absolutely everything at maximum depth."

This fact should be preserved even though our later goal may define a special zero-miss mode differently.

**Adoption status:** not decided.

---

# A-10 — IV&V verifies traceability and completeness across lifecycle artifacts

## Evidence / observed practice

NASA IV&V requirements include checks that relationships are correct, consistent, complete, and traceable across levels such as:

- system requirements ↔ software requirements,
- requirements ↔ architecture,
- requirements ↔ detailed design,
- architecture/design ↔ code and data,
- requirements/design/code ↔ tests.

IV&V also analyzes properties such as safety and security risk mitigations and whether software is suitable for nominal and off-nominal conditions.

Sources:

- `8739.8B 4.4.2 IV&V Requirements`
  - https://swehb.nasa.gov/spaces/SITE/pages/122388487/8739.8B%2B4.4.2%2BIV%2BV%2BRequirements
- `SWE-141 - Software Independent Verification and Validation` historical/current handbook material
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/50888971/SWE-141%2B-%2BSoftware%2BIndependent%2BVerification%2Band%2BValidation

## Knowledge captured

NASA's assurance model checks not only whether an item exists, but whether the **relationships** between artifacts remain complete and correct.

This is closer to a graph / traceability model than a flat checklist.

**Adoption status:** not decided.

---

# A-11 — NASA can monitor the independent reviewer itself

## Evidence / observed practice

NASA describes an `IV&V Surveillance` function that monitors the IV&V relationship and execution.

The Surveillance team can:

- attend status / working discussions,
- review the IV&V plan,
- compare actual IV&V execution with the plan,
- obtain IV&V products,
- analyze whether IV&V execution is reasonable,
- verify that findings reach the appropriate stakeholders,
- raise management/process risks,
- in some cases identify systemic technical-analysis problems and perform additional analysis.

Sources:

- `8.06 - IV&V Surveillance`
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/72024974/8.06%2B-%2BIV%2BV%2BSurveillance

## Knowledge captured

NASA does not assume that an independent reviewer is automatically correct or effective just because it is independent.

There can be another layer that asks:

```text
Is the independent review actually happening?
Is it following its plan?
Are its outputs reaching decision makers?
Is its analysis itself drifting or weak?
```

This is a distinct concept from merely doing a second review.

**Adoption status:** not decided.

---

# A-12 — IV&V Surveillance produces risks, reports, and sometimes issues

## Evidence / observed practice

NASA describes primary/secondary outputs of IV&V Surveillance:

### Risks

Risks identify a potential problem and include closure criteria. Surveillance risks often focus on management/process concerns but should connect to safety/mission assurance consequences.

### Reports

Reports record objective, approach, results, and conclusions, and can act as an information bridge when other stakeholders cannot directly consume IV&V products.

### Issues

If the Surveillance team finds systemic problems in IV&V technical analysis, it can under some arrangements perform technical analysis itself and raise issues; such issues can also be used to steer the IV&V agent back on track.

Source:

- `8.06 - IV&V Surveillance`
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/72024974/8.06%2B-%2BIV%2BV%2BSurveillance

## Knowledge captured

Review findings are not just comments. NASA commonly turns them into trackable objects with closure conditions.

**Adoption status:** not decided.

---

# A-13 — Findings / risks / concerns are tracked to closure

## Evidence / observed practice

NASA assurance tasking includes expectations to maintain lists of review discrepancies, risks, issues, findings, and concerns and to confirm that project management responds and tracks them to closure.

NASA schedule/status requirements also include regular reviews with stakeholders and closure of identified issues.

Source:

- `8739.8B-T1-Requirements Mapping Matrix`
  - https://swehb.nasa.gov/spaces/SITE/pages/121340655/8739.8B-T1-Requirements%2BMapping%2BMatrix

## Knowledge captured

The review loop is not:

```text
find problem → mention problem → review finished
```

It is closer to:

```text
finding
→ owner / response
→ corrective action
→ tracked status
→ closure criteria
→ closure evidence
```

**Adoption status:** candidate for later comparison, not accepted.

---

# A-14 — Objective evidence is a first-class concept

## Evidence / observed practice

NASA defines objective evidence as an unbiased, documented fact showing that an assurance/safety activity was confirmed or performed.

Evidence can take multiple forms depending on the task, including observations, findings, issues, risks, audit/checklist records, messages/memos, and entries in tracking systems.

NASA also exposes assurance products such as process audit reports and audit results containing findings and corrective-action plans.

Sources:

- `Objective Evidence`
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/100598322/Objective%2BEvidence
- `SWE-022 - Software Assurance`
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/50888879/SWE-022%2B-%2BSoftware%2BAssurance

## Knowledge captured

The assurance system distinguishes:

- "someone says this was checked"
- from
- "there is retrievable evidence showing what was checked and what was found."

Evidence format is flexible; the requirement is not tied to one document type.

**Adoption status:** candidate for later comparison, not accepted.

---

# A-15 — Software Assurance itself is planned as a lifecycle activity

## Evidence / observed practice

NASA's Software Assurance Plan minimum-content guidance includes, among other things:

- purpose / scope,
- planned assurance activities,
- assurance methods,
- audits and assessments,
- status reporting,
- analysis activities,
- standing meetings,
- milestone / peer reviews,
- product/process reviews,
- test witnessing / result review,
- defect/non-conformance/risk reporting,
- stakeholder management,
- required personnel and tools,
- access requirements to repositories/databases/websites,
- roles and responsibilities,
- organization structure,
- assurance-product storage and retention,
- acceptance criteria for assurance products,
- safety-critical assessment,
- software classification results/concurrence,
- risk management,
- project-specific training,
- communication plan,
- assurance Requirements Mapping Matrix,
- metrics and analysis/reporting procedures,
- issue tracking / corrective action,
- document change procedure/history,
- assurance schedule aligned to project milestones/lifecycle products.

If a plan section does not apply, NASA guidance says to explicitly state `Not Applicable`.

Source:

- `5.17 - Software Assurance Plan Minimum Content`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/138707548/5.17%2B-%2BSoftware%2BAssurance%2BPlan%2BMinimum%2BContent

## Knowledge captured

Assurance has its own planned work, schedule, evidence locations, roles, acceptance criteria, and change history.

This is much more than a final checklist.

**Adoption status:** not decided.

---

# A-16 — Audits are aligned with project milestones and lifecycle products

## Evidence / observed practice

NASA Software Assurance planning guidance explicitly aligns assurance activities and audits with the project schedule, milestones, and lifecycle products.

Requirements mapping review guidance suggests milestone-based reviews such as PDR, CDR, and acceptance testing, while allowing cadence to scale with project risk/complexity.

Sources:

- `5.17 - Software Assurance Plan Minimum Content`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/138707548/5.17%2B-%2BSoftware%2BAssurance%2BPlan%2BMinimum%2BContent
- `SWE-152 - Review Requirements Mapping Matrices`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695508/SWE-152%2B-%2BReview%2BRequirements%2BMapping%2BMatrices

## Knowledge captured

The review cadence can be event-driven, periodic, or both.

The concept of "major change / milestone invalidates prior confidence" fits naturally with this lifecycle approach, but no adoption decision is made yet.

**Adoption status:** not decided.

---

# A-17 — NASA recommends automation for traceability analysis and change detection

## Evidence / observed practice

Current SWE-152 guidance discusses tools and automation for:

- generating traceability reports,
- highlighting incomplete mappings,
- identifying missing links,
- showing changes to matrices since the previous review,
- notifying stakeholders when requirements, mappings, or downstream dependencies change.

Examples of enterprise tools mentioned include IBM DOORS and Jama Connect; Jira with traceability plugins is also mentioned.

Source:

- `SWE-152 - Review Requirements Mapping Matrices`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695508/SWE-152%2B-%2BReview%2BRequirements%2BMapping%2BMatrices

## Knowledge captured

NASA guidance explicitly considers machine assistance for detecting incompleteness and stale traceability.

The existence of these techniques is worth preserving even if our current tooling cannot implement equivalent automation immediately.

**Adoption status:** not decided.

---

# A-18 — Requirements baselines and change alerts are separate controls

## Evidence / observed practice

NASA SWE-152 guidance recommends:

- establishing a requirements baseline,
- defining a change-management process,
- performing impact analysis,
- propagating changes through mapping matrices,
- using alerts for changes to requirements / mappings / downstream dependencies.

Source:

- `SWE-152 - Review Requirements Mapping Matrices`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695508/SWE-152%2B-%2BReview%2BRequirements%2BMapping%2BMatrices

## Knowledge captured

A matrix can become wrong even if it was once complete. NASA therefore combines:

- initial completeness,
- version/baseline awareness,
- change detection,
- later review.

**Adoption status:** not decided.

---

# A-19 — Matrix completeness can be measured

## Evidence / observed practice

NASA SWE-152 guidance gives example metrics such as:

- percentage of requirements with complete mapping,
- average time to resolve mapping discrepancies,
- number of open versus closed requirements-related issues.

Source:

- `SWE-152 - Review Requirements Mapping Matrices`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695508/SWE-152%2B-%2BReview%2BRequirements%2BMapping%2BMatrices

## Knowledge captured

Completeness and review health can be partially operationalized instead of being described only as "looks complete."

These metrics do not by themselves prove correctness, but they can expose obvious gaps or stagnation.

**Adoption status:** not decided.

---

# A-20 — NASA explicitly provides lighter guidance for small projects

## Evidence / observed practice

SWE-152 contains a small-project section. It suggests that small projects can preserve the core control while using lighter tools and processes, such as:

- Excel / Google Sheets / lightweight project tools instead of enterprise requirements systems,
- minimal traceability columns,
- milestone-based reviews,
- at least a design-phase and pre-testing review for very short projects,
- one designated owner for traceability,
- lightweight change tracking,
- GitHub / GitLab / simple scripts for automatic traceability reports,
- concise review documentation,
- a simple feedback tracker with owner / deadline / status,
- reusable templates,
- updating traceability at sprint/iteration boundaries,
- including traceability updates in Definition of Done.

Source:

- `SWE-152 - Review Requirements Mapping Matrices`, Small Projects section
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695508/SWE-152%2B-%2BReview%2BRequirements%2BMapping%2BMatrices

## Knowledge captured

NASA's own guidance does not imply that rigor must equal enterprise tooling or maximal paperwork.

Important: we are **not** applying this simplification yet. It is recorded because it shows NASA itself distinguishes the control objective from the heavyweight implementation mechanism.

**Adoption status:** not decided.

---

# A-21 — The RMM tracks delegated requirements too

## Evidence / observed practice

Current `SWE-125` requires the matrix to include requirements delegated to other parties or accomplished through contracts / agreements.

NASA guidance says the matrix should identify which party is responsible and keep delegated requirements visible rather than treating outsourced work as outside the compliance picture.

Source:

- `SWE-125 - Requirements Compliance Matrix`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix

## Knowledge captured

Responsibility can move, but the requirement does not disappear.

This is potentially relevant to future work delegated to ChatGPT, another coding agent, an external service, CI, or a third-party provider, though no transfer decision is being made here.

**Adoption status:** not decided.

---

# A-22 — NASA keeps authority, responsibility, evidence, and risk in the same traceability system

## Evidence / observed practice

Current RMM guidance can contain or connect:

- requirement identity,
- applicability,
- responsible party,
- compliance approach,
- tailoring / waiver / deviation,
- rationale,
- risk,
- mitigation,
- formal approval,
- evidence / project-document references.

Source:

- `SWE-125 - Requirements Compliance Matrix`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix
- Appendix C / older compliance-matrix material
  - https://swehb.nasa.gov/spaces/SWEHBVB/pages/32604347/7.16%2B-%2BAppendix%2BC.%2BRequirements%2BMapping%2Band%2BCompliance%2BMatrix

## Knowledge captured

The RMM is closer to a centralized compliance/traceability state model than a plain reading list.

**Adoption status:** not decided.

---

# A-23 — NASA preserves a history suitable for later audit and post-project review

## Evidence / observed practice

NASA RMM guidance describes the matrix as a historical record useful for audits, later reviews, and reuse. Software Assurance planning also specifies product storage, retention, document-change procedures, and change history.

Sources:

- `SWE-125 - Requirements Compliance Matrix`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix
- `5.17 - Software Assurance Plan Minimum Content`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/138707548/5.17%2B-%2BSoftware%2BAssurance%2BPlan%2BMinimum%2BContent

## Knowledge captured

A future auditor should be able to reconstruct why the project was considered compliant at a given time, not merely inspect the latest state.

**Adoption status:** not decided.

---

# A-24 — NASA separates "the developer verifies" from "assurance confirms the verification is adequate"

## Evidence / observed practice

The NASA assurance tasking matrix includes activities such as:

- monitoring product integration,
- reviewing verification activities to ensure adequacy,
- reviewing trade studies and source data,
- auditing development processes and practices,
- participating in software reviews and technical interchange meetings,
- confirming issue closure.

Source:

- `8739.8B-T1-Requirements Mapping Matrix`
  - https://swehb.nasa.gov/spaces/SITE/pages/121340655/8739.8B-T1-Requirements%2BMapping%2BMatrix

## Knowledge captured

There are two questions:

1. Did the project run a verification activity?
2. Was that verification activity actually adequate?

NASA treats the second as a separate assurance responsibility.

**Adoption status:** candidate for later comparison, not accepted.

---

# A-25 — Automated/generated code is not exempt from ordinary verification expectations

## Evidence / observed practice

NASA requirements for automatic source-code generation include validation/verification of generation tools, configuration management of tools and inputs/outputs, defined limits on use, and verification/validation of generated code using the same software standards/processes as hand-generated code.

Source:

- `8739.8B-T1-Requirements Mapping Matrix`, automatic generation section
  - https://swehb.nasa.gov/spaces/SITE/pages/121340655/8739.8B-T1-Requirements%2BMapping%2BMatrix

## Knowledge captured

Automation changes the production mechanism, not the need for evidence and verification.

This may become relevant to AI-generated code or automated rule-generation systems later, but the analogy is not being promoted to a rule yet.

**Adoption status:** not decided.

---

# A-26 — NASA's assurance model is compatible with multiple lifecycle models

## Evidence / observed practice

NASA-STD-8739.8B says the assurance/safety standard is compatible with all software lifecycle models and does not impose one particular lifecycle model.

Source:

- `NASA-STD-8739.8B`
  - https://swehb.nasa.gov/spaces/SITE/pages/119242809/NASA-STD-8739.8B

## Knowledge captured

The assurance controls are designed to survive differences in development methodology rather than depending on waterfall, agile, or another single process.

**Adoption status:** not decided.

---

# NASA assurance architecture observed in this pass

The reviewed sources collectively show multiple distinct failure barriers:

```text
Development / Engineering
        ↓
Classification + Requirements Mapping
        ↓
Software Assurance review / concurrence
        ↓
Assessment checklists + audits + objective evidence
        ↓
Independent IV&V for selected/risk-relevant projects
        ↓
IV&V Surveillance (checks whether IV&V itself is functioning)
        ↓
Periodic higher-level OCE / SMA review of mapping matrices
        ↓
Findings / risks / deviations tracked to closure
        ↓
Cross-project patterns feed rule/process improvement
```

This diagram is **AI synthesis of the reviewed NASA material**, not a verbatim NASA-defined single workflow.

---

# Concepts that now exist in the evidence base

No adoption decision yet. The research now contains evidence for all of the following concepts:

- independent review of classification,
- concurrence + dissent path,
- multiple dimensions of independence,
- risk-driven review scope,
- lifecycle-long assurance,
- a matrix as persistent compliance state,
- a separate checklist to assess the matrix,
- objective evidence,
- explicit findings / risks / concerns,
- closure criteria and issue closure,
- review of whether testing/verification itself is adequate,
- milestone-based and periodic audits,
- baseline + change management + change alerts,
- automated traceability-gap detection,
- assurance planning and scheduling,
- artifact retention and change history,
- review of the independent reviewer,
- organization-level trend analysis across many projects,
- small-project scaling without discarding the control objective,
- delegated work remaining visible in the requirement system,
- generated/automated code remaining subject to verification.

---

# Open questions created by this pass

These should be answered later, not silently resolved now.

1. Can one person plus AI simulate useful **technical independence** even when true managerial/financial independence is impossible?
2. Would using a fresh conversation/model/context for a final audit materially reduce shared-context bias?
3. Should the applicability/routing engine and the completion auditor be implemented using different logic so the same bug cannot affect both?
4. Should a zero-miss audit assess the **quality of tests/evidence**, not merely their existence?
5. Should every audit finding have explicit closure criteria before it can be marked resolved?
6. How much bidirectional traceability is actually useful for small Web/Electron projects?
7. Can GitHub metadata, code, Pages configuration, dependencies, and project files automatically generate part of an applicability matrix?
8. What evidence should invalidate a prior audit result after a repository change?
9. Should a project's rule-compliance history be retained per release/commit?
10. How should a rule-system audit detect a missing rule that never appeared in the applicability matrix at all?
11. Can a second independently-derived repository scan act as an analogue of Software Assurance concurrence?
12. Should the auditor itself be audited or tested using deliberately seeded omissions / mutation-style tests?
13. Could organization-level trend analysis across our repositories reveal repeatedly missed rule categories and drive updates to `web-project-guide`?
14. Which NASA tools/processes represent essential controls versus implementation conveniences?
15. What should be the analogue of a Technical Authority / dissent path in a single-user project?

---

# Sources reviewed in this pass

Primary / current-oriented:

- NASA Software Engineering Handbook Ver D — `SWE-020 - Software Classification`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695405/SWE-020%2B-%2BSoftware%2BClassification
- NASA Software Engineering Handbook Ver D — `SWE-125 - Requirements Compliance Matrix`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix
- NASA Software Engineering Handbook Ver D — `SWE-152 - Review Requirements Mapping Matrices`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695508/SWE-152%2B-%2BReview%2BRequirements%2BMapping%2BMatrices
- NASA Software Engineering Handbook Ver D — `5.17 - Software Assurance Plan Minimum Content`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/138707548/5.17%2B-%2BSoftware%2BAssurance%2BPlan%2BMinimum%2BContent
- NASA-STD-8739.8B public handbook material
  - https://swehb.nasa.gov/spaces/SITE/pages/119242809/NASA-STD-8739.8B
- NASA-STD-8739.8B Requirements Mapping Matrix / Software Assurance tasking
  - https://swehb.nasa.gov/spaces/SITE/pages/121340655/8739.8B-T1-Requirements%2BMapping%2BMatrix
- NASA-STD-8739.8B IV&V Requirements
  - https://swehb.nasa.gov/spaces/SITE/pages/122388487/8739.8B%2B4.4.2%2BIV%2BV%2BRequirements
- NASA PAT / assessment checklist catalogs
  - https://swehb.nasa.gov/display/SITE/PAT%2BDatabase
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/204079325/8.27%2B-%2BSoftware%2BEngineering%2Band%2BSoftware%2BAssurance%2BChecklists

Historical / supporting:

- `8.06 - IV&V Surveillance` (Ver C handbook topic)
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/72024974/8.06%2B-%2BIV%2BV%2BSurveillance
- historical `SWE-132 - Independent Software Classification Assessment`
  - https://swehb.nasa.gov/spaces/7150/pages/16450567/SWE-132%2B-%2BIndependent%2BSoftware%2BClassification%2BAssessment
- `Objective Evidence` (Ver C topic)
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/100598322/Objective%2BEvidence
- historical `SWE-022 - Software Assurance`
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/50888879/SWE-022%2B-%2BSoftware%2BAssurance
