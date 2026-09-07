# NASA Rule Defect vs Execution Defect Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**.

## Research Question

When repeated non-compliance, confusion, tailoring, defects, or exceptions appear, what evidence does NASA use to distinguish between:

1. a good requirement/process that is being executed poorly, and
2. a requirement/process whose wording, applicability, guidance, tooling, or design itself needs improvement?

NASA does not expose one single universal decision formula for this distinction in the public materials reviewed so far. The evidence instead shows multiple diagnostic mechanisms that together help make the distinction.

---

# 1. NASA has a documented example where ambiguity in the rule itself caused inconsistent interpretation

## Evidence / observed practice

`SWE-139 - Shall Statements` documents a concrete historical failure mode.

Earlier versions of NPR 7150.2 relied on the assumption that projects would understand that requirements marked with `X` in the applicability matrix were mandatory. NASA's experience with the baseline NPR showed that this assumption was **not universally confirmed**.

NASA therefore added an explicit requirement stating that the project manager shall comply with requirements marked `X` for the applicable software classification.

The rationale explains that the explicit statement was introduced to clarify intent and preclude alternate interpretation.

Sources:

- Current Ver D `SWE-139 - Shall Statements`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695497/SWE-139%2B-%2BShall%2BStatements
- Historical `SWE-139 - Shall Statements`
  - https://swehb.nasa.gov/spaces/7150/pages/16450449/SWE-139%2B-%2BShall%2BStatements

## Knowledge captured

This is direct evidence that NASA does **not** always classify a compliance problem as user/project error.

A repeated misunderstanding can reveal that the normative system relied on an implicit assumption that was not reliably understood. In that case NASA changed the rule text to make the obligation explicit.

This produces a useful diagnostic distinction:

```text
People repeatedly fail to do X
≠ automatically "people need to try harder"

Possible cause:
- rule not explicit enough,
- applicability unclear,
- terminology ambiguous,
- routing signal too weak,
- hidden assumption in the rule system.
```

**Adoption status:** strong research candidate, not accepted.

---

# 2. NASA reviews patterns in waivers/deviations/tailoring to decide whether the rule system needs revision

## Evidence / observed practice

`SWE-152 - Review Requirements Mapping Matrices` states that NASA OCE reviews project RMMs for patterns and trends in waivers, deviations, and tailoring.

NASA explicitly identifies at least two possible interpretations of recurring patterns:

- projects or Centers may need assistance meeting specific requirements, or
- the requirements themselves may need to be addressed in a later update to clarify intent, purpose, or means of fulfillment.

Sources:

- `SWE-152 - Review Requirements Mapping Matrices`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695508/SWE-152%2B-%2BReview%2BRequirements%2BMapping%2BMatrices
- Alternate current page view
  - https://swehb.nasa.gov/pages/viewpage.action?pageId=152764516

## Knowledge captured

NASA does not treat a waiver/deviation as an isolated exception only. Aggregated exception data is diagnostic evidence about the rule system.

A recurring pattern can indicate different root causes:

- execution/capability gap,
- missing training,
- insufficient tools/support,
- wrong applicability classification,
- unclear requirement wording,
- unrealistic fulfillment method,
- requirement that no longer matches current technology/workflow,
- genuinely necessary rule that is difficult but still correct.

The public guidance does not give a fixed numeric threshold for when one interpretation wins. Context and review remain necessary.

**Adoption status:** strong research candidate, not accepted.

---

# 3. Requirement quality is judged separately from compliance

## Evidence / observed practice

NASA requirements-writing guidance describes desired properties for requirements such as:

- complete,
- correct,
- consistent,
- traceable,
- independent,
- unambiguous,
- modifiable,
- understandable,
- necessary,
- measurable,
- quantitative where appropriate,
- finite/bounded,
- testable,
- maintainable,
- feasible.

NASA also recommends stakeholder review to identify ambiguous, conflicting, or incomplete requirements; refining/removing duplicates and unnecessary requirements; and defining a testing strategy for each requirement.

Source:

- NASA Software Engineering Handbook requirements guidance / `SWE-050 - Software Requirements`
  - https://swehb.nasa.gov/spaces/7150/pages/16449651/SWE-050%2B-%2BSoftware%2BRequirements

## Knowledge captured

A project can fail to comply with a requirement even when the requirement is good, but NASA also recognizes that the **requirement itself is an engineering artifact whose quality can be defective**.

Therefore compliance review and rule-quality review are different questions:

```text
Question A: Did the project follow the rule?
Question B: Is the rule itself clear, necessary, feasible, testable, and maintainable?
```

Both can be false at the same time.

**Adoption status:** not decided.

---

# 4. Requirement rationale is preserved to help diagnose whether a rule still makes sense

## Evidence / observed practice

NASA requirements guidance recommends maintaining rationale containing information such as:

- why the requirement exists,
- assumptions behind it,
- links to parent requirements/trade studies,
- relationship to expected operations,
- reasons for design constraints or prescribed implementation approaches.

Source:

- `SWE-050 - Software Requirements`
  - https://swehb.nasa.gov/spaces/7150/pages/16449651/SWE-050%2B-%2BSoftware%2BRequirements

## Knowledge captured

Without rationale, later maintainers can see that a rule exists but not whether the original reason still applies.

Preserved rationale makes several later distinctions possible:

- rule still necessary, execution failed;
- original assumption changed, rule may be obsolete;
- requirement is valid but its implementation constraint is outdated;
- requirement was intended for a narrower risk/context than later readers assume.

**Adoption status:** not decided.

---

# 5. NASA audits the implementation against the resolved requirement set

## Evidence / observed practice

`SWE-139` guidance describes checking compliance by obtaining the approved Requirements Mapping Matrix, verifying that the correct software classification column was used, verifying approval/signatories for tailoring, and then auditing project documentation and activities using checklists.

It notes that checking all requirements completely will generally require audits at different stages of the project. Non-conformances are reported and tracked to closure.

Sources:

- Current / historical `SWE-139 - Shall Statements`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695497/SWE-139%2B-%2BShall%2BStatements
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/50888969/SWE-139%2B-%2BShall%2BStatements

## Knowledge captured

Before blaming the rule, NASA still checks whether the project:

- used the correct classification,
- resolved applicability correctly,
- obtained legitimate exceptions,
- actually performed the required activities,
- supplied evidence,
- closed discovered non-conformances.

This provides execution evidence before deciding a requirement is defective.

**Adoption status:** not decided.

---

# 6. High-severity failures can trigger process assessment / root-cause analysis

## Evidence / observed practice

NASA material for high-severity software non-conformance requires a closed-loop process assessment. The rationale is to understand why the non-conformance/defect occurred and make process changes that prevent recurrence. Root Cause Analysis is identified as an example technique.

Source:

- NASA Software Engineering Handbook source page for high-severity software non-conformance process assessment
  - https://swehb.nasa.gov/plugins/viewsource/viewpagesrc.action?pageId=129991572

## Knowledge captured

A defect is not automatically patched and forgotten. Severe recurrence risk can trigger investigation of the underlying process.

Potential root causes therefore include more than code mistakes:

- inadequate process,
- missing review,
- missing training,
- weak tooling,
- ambiguous/inconsistent requirements,
- failure to propagate changes,
- inadequate ownership/closure.

This supports examining the **system that produced the error**, not just the immediate error.

**Adoption status:** not decided.

---

# 7. Corrective actions are tracked to closure to prevent recurrence/propagation

## Evidence / observed practice

NASA corrective-action guidance explains that inconsistencies/failures can exist among requirements, plans, and software products. Corrective actions address changed requirements as well as defects/failures, require impact analysis, and are tracked through closure to prevent propagation and recurrence.

Source:

- `SWE-054 - Corrective Action for Inconsistencies`
  - https://swehb.nasa.gov/spaces/SWEHBVB/pages/32604511/SWE-054%2B-%2BCorrective%2BAction%2Bfor%2BInconsistencies

## Knowledge captured

The useful unit is not merely `finding exists`; it is a closed loop:

```text
Finding
→ root/impact analysis
→ corrective action
→ implementation
→ verification
→ closure
→ recurrence monitoring
```

If the same failure repeatedly reappears after nominal closure, that itself becomes evidence that the corrective action or governing process/rule was insufficient.

**Adoption status:** not decided.

---

# 8. Defect data is preserved as input to future quality/process improvement

## Evidence / observed practice

NASA defect-tracking guidance states that recording defects found during testing supports:

- improving the product,
- preventing recurrence,
- collecting data used to measure software quality.

Defects are tracked to closure rather than merely counted.

Source:

- `SWE-069 - Document Defects and Track`
  - https://swehb.nasa.gov/spaces/SWEHBVB/pages/32604543/SWE-069%2B-%2BDocument%2BDefects%2Band%2BTrack

## Knowledge captured

A mature rule system needs failure history that can later be aggregated. Without structured defect/finding history, recurring rule-system failures can look like unrelated one-off mistakes.

**Adoption status:** not decided.

---

# 9. NASA uses independent appraisals/benchmarking to reduce self-diagnosis bias

## Evidence / observed practice

NASA OCE periodically benchmarks Center capability and can authorize appraisals against selected NPR requirements. CMMI-style appraisal is used as an external/standardized reference for process capability.

Sources:

- `SWE-004 - OCE Benchmarking`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695394/SWE-004%2B-%2BOCE%2BBenchmarking
- NPR 7150.2D / `SWE-129 - OCE NPR Appraisals`
  - https://swehb.nasa.gov/spaces/SITE/pages/123601159/NPR%2B7150.2D

## Knowledge captured

A team that created and executed a process can normalize its own weaknesses. Independent or standardized review gives another source of evidence before concluding whether failures are local execution failures or systemic process deficiencies.

**Adoption status:** not decided.

---

# 10. Multiple independent signals can be combined rather than relying on a single threshold

## Evidence / observed practice

Across the reviewed NASA materials, rule/process improvement decisions can draw on:

- project RMMs,
- waiver/deviation/tailoring patterns,
- compliance audits,
- independent appraisal/benchmarking,
- defects/non-conformances,
- root-cause/process assessments,
- metrics,
- lessons learned,
- practitioner feedback,
- requirement quality review,
- current technology/mission context,
- Center/project capability differences.

No public NASA source reviewed so far defines a universal formula like `three waivers = rewrite the requirement`.

## Knowledge captured

The apparent model is evidence convergence rather than a single numeric trigger.

A rough diagnostic synthesis (not a NASA formal algorithm):

```text
Repeated failure
↓
Was the requirement applicable and correctly classified?
↓
Was it explicit, understandable, necessary, feasible and testable?
↓
Did teams have the process/tool/training needed to comply?
↓
Are failures concentrated in one team/Center or widespread?
↓
Do independent audits find the same weakness?
↓
Are waivers/deviations recurring for the same reason?
↓
Did the original rule assumption/context change?
↓
Choose intervention:
- project corrective action,
- training/support/tool improvement,
- applicability/routing clarification,
- guidance improvement,
- process redesign,
- normative requirement revision.
```

This classification remains an AI synthesis for later comparison with other standards/organizations.

**Adoption status:** candidate hypothesis for later comparison, not accepted.

---

# 11. An important anti-pattern emerges: do not repair every failure by adding another rule

## Evidence basis

This is a synthesis from the NASA mechanisms above, not an explicit NASA quote.

NASA has several possible intervention layers:

- corrective action at project level,
- process/training/tool improvement,
- guidance update,
- Process Asset Library addition,
- applicability/tailoring clarification,
- normative requirement revision.

Because multiple intervention layers exist, a defect does not automatically require a new universal normative requirement.

## Knowledge captured

For a growing guide, indiscriminately turning each failure into another Common Rule can create:

- rule bloat,
- more routing complexity,
- new contradictions,
- reduced readability,
- more opportunities to miss rules.

NASA's layered system provides evidence that the fix should be placed at the level matching the root cause.

**Adoption status:** strong research candidate, not accepted.

---

# Open questions

- Can we find a NASA source describing a formal Root Cause Analysis taxonomy for process versus requirement defects?
- Are there examples where NASA removed or relaxed a software requirement because evidence showed it was unnecessary or counterproductive?
- Are there documented cases where repeated waivers directly caused a specific NPR/STD requirement rewrite?
- How does NASA measure whether a rule change actually reduced recurrence after revision?
- How are false positives in audits/applicability decisions handled?
- How do NIST/ISO/CMMI/aviation/medical standards perform equivalent CAPA/root-cause/rule-improvement loops?

No adoption decision has been made yet.
