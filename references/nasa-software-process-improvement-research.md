# NASA Software Process Improvement / Rule-System Improvement Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**. It records practices and mechanisms broadly, including ones that may be too expensive or impossible for the current project to reproduce today.

## Research Question

How does NASA improve the software-engineering rules, guidance, assurance practices, and organizational processes themselves after observing project results, audits, exceptions, measurements, failures, and lessons learned?

This file intentionally focuses on the feedback loop around the rule system, not only project-level compliance.

---

# 1. Normative requirements and fast-moving guidance are separated

## Evidence / observed practice

NASA distinguishes between formal requirements and implementation guidance.

- `NPR 7150.2` is the software engineering requirements document and uses formal `shall` statements.
- The NASA Software Engineering and Software Assurance Handbook (`NASA-HDBK-2203`) is explicitly guidance, not a requirements document.
- The Handbook contains rationale, implementation guidance, resources, references, tools, software assurance guidance, and lessons learned.
- The Handbook was deliberately implemented as an electronic wiki so guidance can be published promptly, searched easily, updated more easily, and contributed to by the software community.
- The Handbook's guidance, topics, objectives, and lessons learned can be updated continuously, while the formal NPR evolves through controlled revisions.

Sources:

- NASA Software Engineering and Software Assurance Handbook, Introduction
  - https://swehb.nasa.gov/
- `7.01 - History and Overview of the Software Process Improvement (SPI) Effort`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695611/7.01%2B-%2BHistory%2Band%2BOverview%2Bof%2Bthe%2BSoftware%2BProcess%2BImprovement%2BSPI%2BEffort

## Knowledge captured

NASA intentionally avoids putting every explanation and lesson into the normative requirements document. Stable normative rules and evolvable operational knowledge have different change velocities and are stored differently.

This is not merely a documentation convenience: it allows the organization to update guidance more frequently without silently changing the formal obligations projects are required to satisfy.

**Adoption status:** not decided.

---

# 2. Improvement itself is an explicit institutional responsibility

## Evidence / observed practice

NPR 7150.2D assigns explicit organizational responsibilities for continuous improvement.

- `SWE-002`: NASA Office of the Chief Engineer (OCE) leads and maintains a NASA Software Engineering Initiative to advance software engineering practices.
- `SWE-208`: NASA Chief, Safety and Mission Assurance (SMA) leads and maintains a Software Assurance and Software Safety Initiative to advance assurance and safety practices.
- These are not merely project obligations; NASA assigns ownership for improving the engineering/assurance system itself.

The Software Engineering Initiative includes or has included goals such as:

- standardizing and improving engineering processes,
- infusing advanced tools and technologies,
- improving assurance alongside engineering,
- workforce development,
- objective capability benchmarking,
- collecting and analyzing software metrics,
- reducing duplicate effort across projects,
- improving risk/issue/defect reporting,
- applying industry and government best practices,
- adapting to evolving technologies,
- maintaining requirements, policies, standards, and knowledge resources.

Sources:

- `SWE-002 - Software Engineering Initiative`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695392/SWE-002%2B-%2BSoftware%2BEngineering%2BInitiative
- `SWE-208 - Advancing Software Assurance and Software Safety Practices`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695328/SWE-208%2B-%2BAdvancing%2BSoftware%2BAssurance%2Band%2BSoftware%2BSafety%2BPractices
- `7.01 - History and Overview of the Software Process Improvement (SPI) Effort`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695611/7.01%2B-%2BHistory%2Band%2BOverview%2Bof%2Bthe%2BSoftware%2BProcess%2BImprovement%2BSPI%2BEffort

## Knowledge captured

A rule system can stagnate if nobody owns improvement of the rule system itself. NASA makes that responsibility explicit at the institutional level instead of assuming project teams will collectively improve the process on their own.

**Adoption status:** not decided.

---

# 3. Local organizations maintain explicit improvement plans

## Evidence / observed practice

`SWE-003` requires each NASA Center to maintain, staff, and implement a plan to continually advance its in-house software engineering capability and to monitor contractor capability.

Current guidance notes that the exact artifact can be pragmatic: a written formal Center Software Engineering Improvement Plan is encouraged, but the important part is a documented improvement approach that is reviewed, updated, and shared with stakeholders.

Improvement responsibilities include:

- defining which capabilities to improve,
- monitoring effectiveness/progress,
- aligning improvement activity with Agency requirements,
- involving stakeholders,
- monitoring contractor engineering capability as well as internal capability.

Source:

- `SWE-003 - Center Improvement Plans`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695393/SWE-003%2B-%2BCenter%2BImprovement%2BPlans

## Knowledge captured

Continuous improvement is not treated as a vague cultural aspiration. It has an explicit plan, owner, resourcing/staffing expectation, implementation, monitoring, and revision loop.

**Adoption status:** not decided.

---

# 4. NASA benchmarks the process system itself, not only project outputs

## Evidence / observed practice

`SWE-004` requires the OCE to periodically benchmark each Center's software engineering capability against the requirements in NPR 7150.2.

Current guidance describes several mechanisms:

- OCE project/Center surveys,
- review of CMMI appraisal results,
- participation in program/project reviews,
- examination of software metric usage,
- identification of Center strengths and weaknesses,
- comparison of capability over time,
- identification of practices from high-performing Centers that may be reusable elsewhere.

CMMI-DEV appraisals are described as a preferred objective benchmark for software process improvement capability. Historical NASA material also references CBA-IPI, SCE, and SCAMPI/CMMI-style external or standardized assessments.

Sources:

- `SWE-004 - OCE Benchmarking`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695394/SWE-004%2B-%2BOCE%2BBenchmarking
- NASA Software Engineering Initiative Implementation Plan (historical)
  - https://swehb.nasa.gov/download/attachments/16450391/417063main_NSII_Plan.pdf?api=v2

## Knowledge captured

NASA checks whether the engineering process itself is getting better. Passing individual projects is not considered enough evidence that the process/rule system is effective.

Benchmarking produces a baseline, permits later comparison, identifies systemic weak spots, and can reveal practices worth propagating across the organization.

**Adoption status:** not decided.

---

# 5. Project compliance matrices are aggregated to diagnose the rule system

## Evidence / observed practice

`SWE-152` requires the NASA OCE to periodically review project Requirements Mapping Matrices (RMMs).

The stated reasons include finding patterns and trends that indicate:

- project or Center areas of concern,
- where projects need assistance satisfying specific requirements,
- recurring waiver/deviation/tailoring patterns,
- requirements whose intent is unclear,
- requirements whose fulfillment method may need clarification,
- areas that may need revision in the next update of software engineering, assurance, or safety requirements.

The guidance explicitly says recurring patterns in waivers, deviations, or tailoring can feed into future requirements updates.

Projects also make matrices available for OCE surveys and OSMA Quality Audit, Assessment and Review (QAAR) activity.

Source:

- `SWE-152 - Review Requirements Mapping Matrices`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695508/SWE-152%2B-%2BReview%2BRequirements%2BMapping%2BMatrices

## Knowledge captured

This creates a feedback loop:

```text
Rule set
→ Project applicability / tailoring
→ Project compliance matrices
→ Cross-project review
→ recurring exceptions / gaps / confusion
→ identify systemic problem
→ improve guidance / requirement / support
→ revised rule system
```

A large number of exceptions is therefore not only a project-level problem. It can be evidence that the rule itself, its applicability definition, or its guidance is defective.

**Adoption status:** strong research candidate, not accepted.

---

# 6. Compliance appraisals can target selected requirements

## Evidence / observed practice

NPR 7150.2D includes `SWE-129`: the OCE authorizes appraisals against selected requirements in the NPR to check compliance.

This is separate from relying solely on each project's own compliance declaration.

Sources:

- NPR 7150.2D
  - https://swehb.nasa.gov/spaces/SITE/pages/123601159/NPR%2B7150.2D
- Index of SWEs, `SWE-129 - OCE NPR Appraisals`
  - https://swehb.nasa.gov/spaces/SITE/pages/121340619/Index%2Bof%2BSWEs%2Bby%2BSWE%2BNumber

## Knowledge captured

NASA does not require every independent assessment to retest every rule equally. It can perform focused appraisals of selected requirements, providing another mechanism between lightweight local checking and full exhaustive review.

**Adoption status:** not decided.

---

# 7. Measurement is a formal input to process improvement

## Evidence / observed practice

NASA's measurement requirements operate at project and organizational levels.

Current Ver D requirements include:

- `SWE-090`: projects establish, record, maintain, report, and use management/technical measurements.
- `SWE-091`: for Class A/B/C projects, Centers maintain a measurement repository including development tracking, functionality achieved, quality, and development effort/cost data.
- `SWE-092`: Centers use measurement data to monitor software engineering capability, improve software quality, and track engineering improvement activities.
- `SWE-093`: project managers analyze collected measurement data using documented analysis procedures.
- `SWE-094`: measurement data, analyses, and development status are made available to relevant higher authorities when requested.
- `SWE-095`: Centers report the status of the software engineering discipline when requested.

NASA guidance states measurement can support future planning/cost estimation, product history, lifecycle process control, evidence that processes were followed, quality indicators, and monitoring/reporting of software engineering improvement programs.

Sources:

- `B. Institutional Requirements`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695220/B.%2BInstitutional%2BRequirements
- `SWE-093 - Analysis of Measurement Data`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695480/SWE-093%2B-%2BAnalysis%2Bof%2BMeasurement%2BData
- `SWE-094 - Reporting of Measurement Analysis`
  - https://swehb.nasa.gov/spaces/7150/pages/16450612/SWE-094%2B-%2BReporting%2Bof%2BMeasurement%2BAnalysis

## Knowledge captured

NASA's improvement system attempts to use observed data rather than only subjective retrospective opinion.

The exact metric set is contextual. Historical guidance warns that metric collection has a cost and metrics should be selected because they help expose project health, risks, quality, or improvement—not because more metrics automatically mean better governance.

**Adoption status:** not decided.

---

# 8. Lessons Learned have an explicit capture → dissemination → application lifecycle

## Evidence / observed practice

NASA maintains an official reviewed Lessons Learned Information System (LLIS), managed by the NASA Lessons Learned Steering Committee with representation across NASA Centers.

NASA's current professional Lessons Learned guidance describes phases including:

- identifying/capturing a lesson,
- documenting it in LLIS or other repositories/reports/case studies/video,
- disseminating it through LLIS, courses, webinars, presentations, briefings, communities of practice, and communications,
- applying the lesson to actual NASA practice.

The application phase can change:

- processes,
- checklists,
- handbooks,
- formal policy.

The public LLIS describes each official lesson as including the driving event and recommendations that feed continual improvement through training, best practices, policies, and procedures.

Sources:

- NASA Lessons Learned
  - https://www.nasa.gov/nasa-lessons-learned/
- APPEL / NASA Lessons Learned guidance
  - https://www.nasa.gov/learning-resources/for-professionals/appel-lessons-learned/
- Public Lessons Learned Information System
  - https://llis.nasa.gov/

## Knowledge captured

NASA distinguishes `a lesson was documented` from `the organization actually learned`. A lesson only closes the loop when it is infused into future work through training, process, checklist, handbook, policy, or equivalent operational changes.

This is a stronger model than merely maintaining a failure log.

**Adoption status:** strong research candidate, not accepted.

---

# 9. Knowledge reuse is institutionalized through Process Asset Libraries

## Evidence / observed practice

`SWE-098` requires the OCE to maintain an Agency-wide Process Asset Library (PAL) containing applicable best practices and process templates for projects of all sizes.

NASA also uses Center-level PALs/Software Processes Across NASA (SPAN) to share items such as:

- processes,
- procedures,
- forms,
- job aids,
- checklists,
- training,
- templates,
- examples,
- other recommended practices.

The Agency PAL is maintained independently of individual project resources, while projects and Centers are expected to use and sometimes contribute assets.

Sources:

- `SWE-098 - Agency Process Asset Library`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695483/SWE-098%2B-%2BAgency%2BProcess%2BAsset%2BLibrary
- `SWE-005 - Software Processes`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695395/SWE-005%2B-%2BSoftware%2BProcesses

## Knowledge captured

NASA separates reusable operational assets from the core policy/requirements. Teams do not need to recreate every checklist/template from scratch, and one project's useful solution can become a reusable asset without immediately becoming a universal normative rule.

Revision D expanded the Agency PAL requirement to explicitly include process templates and to support all project sizes.

**Adoption status:** not decided.

---

# 10. Feedback channels exist directly on the guidance system

## Evidence / observed practice

NASA's Handbook pages expose facilities such as page edit history and `Post feedback on this section`. The Handbook introduction also points users to NASA Technical Standards System feedback for suggestions/inputs.

The wiki format was selected partly to support community participation, best-practice sharing, and lessons learned contributions.

Sources:

- NASA Software Engineering and Software Assurance Handbook, Introduction
  - https://swehb.nasa.gov/
- `7.01 - History and Overview of the Software Process Improvement (SPI) Effort`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695611/7.01%2B-%2BHistory%2Band%2BOverview%2Bof%2Bthe%2BSoftware%2BProcess%2BImprovement%2BSPI%2BEffort

## Knowledge captured

The guidance repository is not only a broadcast channel. It exposes a path for practitioners to send problems and suggestions back toward maintainers.

**Adoption status:** not decided.

---

# 11. Formal requirements evolve using accumulated experience

## Evidence / observed practice

NASA's documented revision history shows NPR 7150.2 evolving across major revisions:

- initial common requirements,
- later incorporation of lessons from implementation,
- stronger assurance/safety and IV&V emphasis,
- cybersecurity/model-based engineering/tailoring clarification,
- stronger alignment with systems engineering, assurance standards, continuous improvement, and measurement-driven maturity.

Historical NPR 7150.2A text explicitly stated that successful experiences would be codified into future revisions after gaining implementation experience, collecting project lessons learned, and reviewing Engineering Technical Authority implementation records.

Current SWE-152 guidance still explicitly connects cross-project RMM patterns to future revision of engineering, assurance, and safety requirements.

Sources:

- `7.01 - History and Overview of the Software Process Improvement (SPI) Effort`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695611/7.01%2B-%2BHistory%2Band%2BOverview%2Bof%2Bthe%2BSoftware%2BProcess%2BImprovement%2BSPI%2BEffort
- Historical NPR 7150.2A
  - https://swehb.nasa.gov/download/attachments/16450019/N_PR_7150_002A_.pdf?api=v2
- `SWE-152 - Review Requirements Mapping Matrices`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695508/SWE-152%2B-%2BReview%2BRequirements%2BMapping%2BMatrices

## Knowledge captured

The rule set is treated as versioned engineering infrastructure. Real implementation experience can eventually change the formal rules, but through a controlled revision path rather than ad-hoc per-project mutation.

**Adoption status:** not decided.

---

# 12. Improvement includes training and workforce capability, not only document changes

## Evidence / observed practice

The NASA Software Engineering Initiative and institutional requirements treat workforce capability/training as part of software process improvement. OCE and Center training organizations provide training to advance engineering practices; the initiative also targets retention/development of technical capability.

The Lessons Learned system similarly uses training and knowledge-sharing channels to infuse lessons rather than relying only on policy text.

Sources:

- NPR 7150.2D, institutional responsibilities
  - https://swehb.nasa.gov/spaces/SITE/pages/123601159/NPR%2B7150.2D
- `SWE-002 - Software Engineering Initiative`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695392/SWE-002%2B-%2BSoftware%2BEngineering%2BInitiative
- NASA Lessons Learned
  - https://www.nasa.gov/nasa-lessons-learned/

## Knowledge captured

A better rule document does not guarantee better execution. NASA treats user/practitioner capability, training, examples, and shared knowledge as part of the reliability system.

**Adoption status:** not decided.

---

# 13. Automation is an explicit improvement direction

## Evidence / observed practice

NASA's Software Engineering Initiative and Software Assurance/Safety Initiative explicitly discuss efficient and automated methods, improved risk/issue/finding reporting, standardized tools/methods, and data-driven enhancements.

`SWE-208` guidance specifically describes goals such as:

- streamlining assurance processes,
- developing more efficient/automated methods,
- improving reporting mechanisms,
- standardizing tools/services,
- using analytics and metrics to refine assurance activities.

Source:

- `SWE-208 - Advancing Software Assurance and Software Safety Practices`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695328/SWE-208%2B-%2BAdvancing%2BSoftware%2BAssurance%2Band%2BSoftware%2BSafety%2BPractices

## Knowledge captured

NASA's target state is not necessarily permanent manual paperwork. Automation is treated as a legitimate way to make rigorous assurance scalable, although the publicly visible guidance does not prescribe one universal automation stack.

The existence of an improvement direction is worth preserving even where the current `web-project-guide` toolchain cannot reproduce it.

**Adoption status:** not decided.

---

# 14. Not every improvement area has mature standard metrics yet

## Evidence / observed practice

Although NASA strongly promotes measurement-driven improvement, the current `SWE-208` page states that no standard metrics are currently specified for that particular institutional assurance-improvement requirement.

Source:

- `SWE-208 - Advancing Software Assurance and Software Safety Practices`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695328/SWE-208%2B-%2BAdvancing%2BSoftware%2BAssurance%2Band%2BSoftware%2BSafety%2BPractices

## Knowledge captured

Even a mature organization does not pretend every improvement objective has a perfect universal metric. Some metrics remain project/organization-specific or are still evolving.

This is useful counter-evidence against inventing arbitrary scores solely to make a process look measurable.

**Adoption status:** not decided.

---

# 15. Small-project scaling is considered inside the same guidance system

## Evidence / observed practice

NASA Handbook pages commonly contain a `Small Projects` section. For requirements-mapping reviews, current guidance suggests lighter tools and review cadences for small projects, including spreadsheet-like matrices and milestone-based reviews rather than assuming enterprise requirements-management platforms.

The Agency PAL is also explicitly required to provide process templates for projects of all sizes.

Sources:

- `SWE-152 - Review Requirements Mapping Matrices`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695508/SWE-152%2B-%2BReview%2BRequirements%2BMapping%2BMatrices
- `SWE-098 - Agency Process Asset Library`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695483/SWE-098%2B-%2BAgency%2BProcess%2BAsset%2BLibrary

## Knowledge captured

NASA often preserves the same control objective while scaling the implementation mechanism. The small-project answer is not necessarily to delete the control; it can be to simplify the artifact, tooling, frequency, or ceremony.

**Adoption status:** not decided.

---

# Current NASA improvement-loop model reconstructed from evidence

This is a synthesis, not a NASA diagram:

```text
Formal Requirements / Standards
        ↓
Center Processes + Project Tailoring
        ↓
Projects / RMMs / Assurance / Audits / Metrics
        ↓
Findings + Waivers + Deviations + Exceptions + Lessons Learned
        ↓
Local Improvement Plans / Corrective Actions
        ↓
Cross-Project / Cross-Center Benchmarking and Trend Analysis
        ↓
Process Asset Library / Training / Handbook Guidance Updates
        ↓
When justified, controlled formal Requirement / Standard revision
        ↓
New baseline
        ↺
```

A notable property is that several feedback routes coexist:

- project → local process improvement,
- project → lessons learned repository,
- project matrices → Agency trend analysis,
- metrics → capability/process improvement,
- audits/appraisals → corrective actions,
- high-performing practices → shared process assets,
- practitioner feedback → Handbook improvement,
- accumulated evidence → formal requirement revision.

This redundancy means the improvement system does not depend on one feedback channel succeeding every time.

---

# Open questions to carry forward

- How does NASA decide that a recurring issue means the rule is wrong versus teams are failing to execute a good rule?
- What exact thresholds/cadence are used to promote a lesson into Handbook guidance or a formal requirement revision?
- How are conflicting lessons across Centers resolved?
- How much of the Process Asset Library is curated versus community-contributed?
- How does NASA retire obsolete guidance/assets instead of only adding new material?
- How are automated assurance results combined with human review?
- How does the modern NASA approach compare with NIST, ISO/IEC, CMMI, aviation/medical regulated software, Google/Microsoft/Meta engineering governance, and modern policy-as-code systems?
- Which feedback loops are essential for omission prevention specifically, versus general engineering maturity?

No adoption decision has been made yet.
