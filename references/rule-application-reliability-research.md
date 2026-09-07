# Rule Application Reliability Research

## Status

- Research phase: active
- Research started: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- General research method owner: `docs/20-evidence-first-research.md`
- This file is **non-normative research evidence**. Nothing here becomes a Common Rule until the research and requirements discussion justify promotion.

## Research Question

How should a development guide / rule system make it difficult for a human or AI agent to miss applicable rules, while remaining maintainable as the number of project types, domains, risks, and completion checks grows?

## Research Persistence Rule for This Work

Research capture for this requirements effort is intentionally **high-recall rather than aggressively filtered**.

When a source is reviewed, record as much of the useful knowledge learned from it as reasonably possible, even when its eventual importance to `web-project-guide` is not yet clear. Do not keep only the points that currently look important.

Preserve, where available:

- what the source actually requires, recommends, distinguishes, or does,
- terminology and classification concepts,
- workflow / lifecycle steps,
- roles and independent review mechanisms,
- applicability rules and escalation logic,
- exception / waiver / tailoring behavior,
- verification / audit behavior,
- examples and edge cases,
- limitations, caveats, scope boundaries, and conditions,
- mechanisms that appear too heavyweight as well as those that appear useful,
- open questions raised by the source,
- source links and enough context to revisit the evidence later.

Research capture and adoption are separate stages. A finding does **not** need to look useful before it is recorded. Later synthesis will decide what is relevant, redundant, too costly, conflicting, accepted, or rejected.

For structured findings, keep these distinct when practical:

1. **Evidence / observed practice** — what the external source actually says or does.
2. **Finding / interpretation** — what we learned from it.
3. **Possible implication** — how it might help or affect `web-project-guide`.
4. **Adoption status** — `not decided`, `candidate`, `accepted`, or `rejected`.

This prevents two opposite failures:

- losing potentially useful knowledge because it looked unimportant too early,
- allowing an interesting external practice to silently become a Common Rule before comparison and discussion.

---

# Source Family 1 — NASA Software Engineering Requirements

## Scope of this pass

This first pass is intentionally limited to NASA's approach to:

- software classification,
- determining which requirements apply,
- independent classification / review,
- requirements mapping / compliance matrices,
- changes in classification during the lifecycle.

NASA is only one evidence family. Final requirements for `web-project-guide` must not be based on NASA alone.

## N-01 — Classification is used to determine requirement applicability

### Evidence

NASA SWE-020 requires each system and subsystem containing software to be classified using the **highest applicable** software classification. The handbook states that expected requirement applicability is determined using the software class together with the Requirements Mapping Matrix.

The classification definitions consider several dimensions, including:

- how the software is used with or within a NASA system,
- criticality to major programs/projects,
- the extent to which humans depend on it,
- development and operational complexity,
- the extent of NASA investment.

Source:

- NASA Software Engineering Handbook, `SWE-020 - Software Classification`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695405/SWE-020%2B-%2BSoftware%2BClassification

### Finding

NASA does not rely on a single label such as product type. Classification includes use, criticality, dependency, complexity, and impact/investment.

### Possible implication for this Guide

A future routing system may need more than `STATIC / GAME / LEARNING / ELECTRON`-style project labels. Persistent project type and risk/criticality characteristics may need to be distinguished.

**Adoption status:** not decided.

## N-02 — Use the highest applicable classification rather than the easiest match

### Evidence

SWE-020 explicitly uses the **highest applicable software classification** when multiple definitions could apply.

Source:

- NASA Software Engineering Handbook, `SWE-020 - Software Classification`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695405/SWE-020%2B-%2BSoftware%2BClassification

### Finding

The classification process is biased against under-classifying a component just because it also fits a lower-impact category.

### Possible implication for this Guide

When several project/risk characteristics apply, the system should avoid choosing only the least demanding route. Applicable rule sets may need to be combined or escalated by the strongest relevant condition.

**Adoption status:** not decided.

## N-03 — A project can contain differently classified components

### Evidence

NASA classification is performed for systems and subsystems, and the handbook notes that one project can contain multiple software classes. Requirements matrices can therefore contain component-specific applicability or separate matrices.

Sources:

- NASA Software Engineering Handbook, `SWE-020 - Software Classification`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695405/SWE-020%2B-%2BSoftware%2BClassification
- NASA Software Engineering Handbook, `SWE-125 - Requirements Compliance Matrix`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix

### Finding

One repository/project does not have to be forced into exactly one classification when materially different components exist.

### Possible implication for this Guide

A site containing, for example, a normal public UI, authentication, cloud storage, and an Electron wrapper may need component/domain applicability rather than one mutually exclusive project category.

**Adoption status:** not decided.

## N-04 — Classification has an independent review path

### Evidence

NASA states that Software Assurance may perform an independent software classification or concur with Engineering's classification. Engineering and Software Assurance technical authorities are expected to agree on classification; disagreement has an escalation/dissent path.

Source:

- NASA Software Engineering Handbook, `SWE-020 - Software Classification`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695405/SWE-020%2B-%2BSoftware%2BClassification

### Finding

NASA does not make the entire applicability system depend on one unchecked initial classification decision.

### Possible implication for this Guide

This directly relates to the current failure mode: if the first routing/classification misses `GitHub Pages`, the Pages owner may never be read. A second independent applicability check or completion-stage reclassification is a serious candidate for reducing this blind spot.

**Adoption status:** candidate for later comparison, not accepted.

## N-05 — Requirements Mapping Matrix is a persistent traceability mechanism

### Evidence

SWE-125 requires projects with software components to maintain one or more Requirements Mapping Matrices against the applicable NASA software requirements. NASA describes the matrix as a centralized mechanism for tracking:

- requirement coverage / applicability,
- planned compliance method,
- tailoring / waiver / deviation decisions,
- rationale and risk where requirements are relieved,
- evidence or project-document references demonstrating compliance.

NASA also describes the matrix as something maintained through the software lifecycle rather than a one-time planning artifact.

Source:

- NASA Software Engineering Handbook, `SWE-125 - Requirements Compliance Matrix`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix

### Finding

Routing alone is not the whole control mechanism. NASA first derives applicable requirements, then keeps a durable list showing whether and how each one is addressed.

### Possible implication for this Guide

A future `web-project-guide` design may benefit from separating:

1. **Applicability discovery** — which rules might apply,
2. **Applicability record** — the actual applicable set for the current project/change,
3. **Compliance / completion evidence** — how each applicable requirement was satisfied or explicitly excluded.

This could be more reliable than simply reading routed documents and trusting that nothing was forgotten afterward.

**Adoption status:** candidate for later comparison, not accepted.

## N-06 — `Not applicable` / tailoring must be explicit rather than silently omitted

### Evidence

NASA's mapping/compliance guidance records relief/tailoring and its rationale. Related tailoring guidance includes checking that requirements marked `Not-Applicable` are genuinely irrelevant or incapable of application.

Sources:

- NASA Software Engineering Handbook, `SWE-125 - Requirements Compliance Matrix`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix
- NASA Software Engineering Handbook, Appendix C — Requirements Mapping and Compliance Matrix
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695651/7.16%2B-%2BAppendix%2BC.%2BRequirements%2BMapping%2Band%2BCompliance%2BMatrix

### Finding

There is a meaningful difference between:

- a requirement being considered and judged not applicable, and
- a requirement never being considered because classification/routing missed it.

### Possible implication for this Guide

For zero-miss-oriented audits, explicit `Applicable / Not Applicable / Exception / Unresolved` states may be substantially safer than absence from a routed list.

**Adoption status:** candidate for later comparison, not accepted.

## N-07 — Classification and applicability are revisited when the project changes

### Evidence

NASA guidance notes that architectural/functional changes, movement from research to operational use, and scope changes can warrant re-evaluation of classification. When classification changes, the Requirements Mapping Matrix is updated so revised requirements are addressed.

Source:

- NASA Software Engineering Handbook, `SWE-020 - Software Classification`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695405/SWE-020%2B-%2BSoftware%2BClassification

### Finding

The applicability decision has a lifecycle. An initial correct classification can become stale after meaningful changes.

### Possible implication for this Guide

After a material change, previous routing/completion evidence should not automatically remain valid. Reclassification / re-routing triggers may need to invalidate or refresh affected applicability checks.

**Adoption status:** candidate for later comparison, not accepted.

## N-08 — Compliance is verified against the completed mapping, not merely against the routing decision

### Evidence

NPR 7150.2D states that implementation means implementing all identified processes, activities, and requirements according to software classification and approved tailoring. It then states that compliance is verified through submission of the completed Requirements Mapping Matrix, including approved tailoring, together with internal/external controls such as audits and reviews.

Appendix C further says that every requirement marked applicable for the project's software class should be addressed in the Requirements Mapping Matrix. Requirements judged not applicable are tailored out with justification rather than silently disappearing from consideration.

Sources:

- NASA, `NPR 7150.2D`, P.5 Measurement/Verification
  - https://swehb.nasa.gov/spaces/SITE/pages/123601159/NPR%2B7150.2D
- NASA Software Engineering Handbook, Appendix C — Requirements Mapping and Compliance Matrix
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695651/7.16%2B-%2BAppendix%2BC.%2BRequirements%2BMapping%2Band%2BCompliance%2BMatrix

### Finding

NASA separates two controls:

1. classification/mapping determines the expected requirement set;
2. completion/audit verifies that the resulting set was actually addressed.

This means a correct router is not treated as sufficient evidence of compliance.

### Possible implication for this Guide

`web-project-guide` may need an independent final completeness check against the **resolved applicable-rule set**, rather than treating "the correct Owner Docs were routed/read" as completion. This is directly relevant to the recent GitHub Pages/README miss: routing and final compliance verification should be separate failure barriers.

**Adoption status:** candidate for later comparison, not accepted.

## N-09 — `Not Applicable` is a reviewed conclusion, not an empty state

### Evidence

NASA technical-authority guidance explicitly includes confirming that requirements marked `Not-Applicable` in a project's compliance matrix are genuinely not relevant or are not capable of being applied. NASA's compliance-matrix guidance also notes that technical authorities routinely review whether `Not Applicable` entries are sufficiently justified.

Sources:

- NASA Software Engineering Handbook, `SWE-126 - Waiver and Deviation Considerations`
  - https://swehb.nasa.gov/spaces/7150/pages/16450524/SWE-126%2B-%2BWaiver%2Band%2BDeviation%2BConsiderations
- NASA Software Engineering Handbook, `SWE-125 - Requirements Compliance Matrix`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix

### Finding

NASA treats `Not Applicable` as an affirmative decision that can itself be wrong and therefore deserves review. It is not equivalent to an omitted row or an unchecked rule.

### Possible implication for this Guide

A zero-miss audit should probably make these states distinguishable:

- `Applicable`
- `Not Applicable — justified`
- `Exception / Override — applicable but intentionally not followed`
- `Unresolved`
- `Not considered` / missing

The last state should never silently pass as `Not Applicable`.

**Adoption status:** candidate for later comparison, not accepted.

## N-10 — Exception from an applicable requirement carries risk, rationale, mitigation, and approval

### Evidence

NASA distinguishes relief from an applicable requirement from simple non-applicability. For an applicable requirement that is entirely or partially relieved, the Requirements Mapping Matrix records risk and rationale, related mitigations/risk acceptance, and approval by the designated Technical Authority. NASA separately defines waiver/deviation processes rather than allowing an applicable requirement to be silently dropped.

Sources:

- NASA Software Engineering Handbook, `SWE-125 - Requirements Compliance Matrix`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix
- NASA Software Engineering Handbook, `SWE-126 - Waiver and Deviation Considerations`
  - https://swehb.nasa.gov/spaces/7150/pages/16450524/SWE-126%2B-%2BWaiver%2Band%2BDeviation%2BConsiderations

### Finding

`Not Applicable` and `Exception` are materially different states:

- `Not Applicable` means the requirement does not apply.
- `Exception / relief` means it does apply, but there is an explicit decision not to satisfy it in the normal way.

### Possible implication for this Guide

The Guide should avoid a single generic `skip` state. If a MUST/required rule applies but is intentionally overridden, that should remain visible as an exception with reason, impact/risk, and mitigation rather than disappearing from completion evidence.

**Adoption status:** candidate for later comparison, not accepted.

## N-11 — The matrix begins during planning, before implementation is mature

### Evidence

NASA SWE-125 guidance says the compliance matrix is initially developed during project planning and included in the Software Development Plan (SDP) or Software Management Plan (SMP). The initial process includes determining software classification and safety criticality for each component, then populating the matrix from the applicable NPR requirements.

Older Ver C guidance states that Software Assurance should obtain the matrix before the software management/development plan is approved, confirm signatures, and repeat that check later in the lifecycle.

Sources:

- NASA Software Engineering Handbook, `SWE-125 - Requirements Compliance Matrix`, sections 3.2 and 7.4
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix
- NASA Software Engineering Handbook Ver C, `SWE-125 - Requirements Compliance Matrix`
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/50888960/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix

### Finding

NASA does not wait until a final audit to discover the applicable requirement set. The expected set is established early enough to influence planning.

### Possible implication for this Guide

A future applicability record may need to exist before implementation, not be created only as a completion checklist. That could let implementation know which rule obligations and evidence will eventually be required.

**Adoption status:** not decided.

## N-12 — The matrix is explicitly a dynamic lifecycle tracking tool

### Evidence

SWE-125 describes the RMM as evolving throughout the software lifecycle. It is used as a checklist to identify completed requirements, monitor progress, and highlight compliance gaps or tailored items.

NASA guidance identifies ongoing update categories including:

- adding evidence or references showing how a requirement was fulfilled,
- incorporating revised requirements or later tailoring/deviation/waiver decisions,
- updating risk-mitigation progress,
- maintaining current responsibility/delegation information.

The rationale also says a properly maintained matrix is an indicator of project state and progress, and that periodic comparison of achieved compliance with planned compliance can reveal needed waivers or deviations.

Source:

- NASA Software Engineering Handbook, `SWE-125 - Requirements Compliance Matrix`, rationale and section 3.6
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix

### Finding

NASA's matrix is not merely a static mapping table. It combines expected applicability, planned fulfillment, current status, evidence, exceptions, and risk follow-up over time.

### Possible implication for this Guide

If `web-project-guide` adopts any matrix-like mechanism, there is a design choice between a one-shot generated checklist and a persistent lifecycle record. NASA strongly illustrates the latter, but that may be too heavy for small personal projects and therefore must be compared later.

**Adoption status:** not decided.

## N-13 — Reviews happen at milestones and on event triggers, not only on a fixed schedule

### Evidence

NASA says Technical Authorities, project managers, or independent reviewers use the RMM at key lifecycle milestones such as Preliminary Design Review (PDR), Critical Design Review (CDR), and testing phases. Software Assurance guidance also lists milestone checks such as SDR, PDR, CDR, and TRR.

Separately, the classification itself is revisited during major project reviews or whenever significant changes could alter the appropriate classification. Ver C guidance explicitly says to repeat RMM checks at key milestones **or when an event such as a software-classification change triggers a matrix change**.

Sources:

- NASA Software Engineering Handbook, `SWE-125 - Requirements Compliance Matrix`, sections 3.6.2 and 7.4
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix
- NASA Software Engineering Handbook, `SWE-020 - Software Classification`, section 3.5
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695405/SWE-020%2B-%2BSoftware%2BClassification
- NASA Software Engineering Handbook Ver C, `SWE-125 - Requirements Compliance Matrix`
  - https://swehb.nasa.gov/spaces/SWEHBVC/pages/50888960/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix

### Finding

NASA uses both milestone-based and change-triggered re-evaluation. A previous applicability decision is not assumed valid forever just because the project has not reached a formal final review.

### Possible implication for this Guide

Potential future triggers could include major scope/runtime/profile changes, public release, storage/auth introduction, migration, Electron packaging, or a completion audit. Exact triggers are not decided.

**Adoption status:** candidate for later comparison, not accepted.

## N-14 — Classification changes can force downstream plan and contract changes

### Evidence

NPR 7150.2D SWE-021 says that if a system/subsystem evolves to meet a higher or lower software classification, the project manager updates project plans and initiates modifications to supplier contracts so the applicable Requirements Mapping Matrix obligations are fulfilled with approved tailoring.

SWE-020 guidance also gives the example of research software becoming operational field software; that transition can change classification and therefore increase the required engineering, safety, and assurance rigor.

Sources:

- NASA, `NPR 7150.2D`, SWE-021
  - https://swehb.nasa.gov/spaces/SITE/pages/123601159/NPR%2B7150.2D
- NASA Software Engineering Handbook, `SWE-020 - Software Classification`
  - https://swehb.nasa.gov/spaces/7150/pages/16449830/SWE-020%2B-%2BSoftware%2BClassification

### Finding

A classification/applicability change is not treated as metadata-only. It propagates into implementation plans, assurance work, suppliers, and other project obligations.

### Possible implication for this Guide

If a project's nature materially changes, merely editing a Profile label would be insufficient; affected requirements, docs, tests, deployment expectations, and completion evidence may also need refresh. The correct lightweight version for personal projects remains undecided.

**Adoption status:** not decided.

## N-15 — Misclassification to avoid requirements is explicitly rejected

### Evidence

NASA SWE-020 guidance says classification must reflect actual criticality and risk and must not be intentionally lowered merely to reduce requirements. If a high-class project cannot meet a requirement, NASA's intended mechanism is tailoring/waiver through the relevant Technical Authority rather than pretending the requirement does not apply.

The older handbook warns that misclassification causes missed requirements that are often discovered later during reviews or testing, increasing cost or forcing later waiver work.

Sources:

- NASA Software Engineering Handbook, `SWE-020 - Software Classification`, sections 3.4 and 3.5
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695405/SWE-020%2B-%2BSoftware%2BClassification
- NASA Software Engineering Handbook, `SWE-020 - Software Classification` legacy page
  - https://swehb.nasa.gov/spaces/7150/pages/16449830/SWE-020%2B-%2BSoftware%2BClassification

### Finding

NASA treats applicability and exception as separate mechanisms specifically so teams do not make classification itself easier just to reduce process cost.

### Possible implication for this Guide

A lightweight routing system should avoid incentives where choosing a weaker profile/scope automatically removes inconvenient checks. If a rule applies but is intentionally skipped, an explicit override path may be safer than weakening classification.

**Adoption status:** candidate for later comparison, not accepted.

## N-16 — The matrix stores evidence references, not only pass/fail status

### Evidence

NASA's suggested matrix fields include the requirement statement, applicability, compliance method, risk/rationale for tailoring, and references to project documents where compliance is demonstrated. Lifecycle updates add links or references such as test reports and peer-review records.

Quality guidance says entries should use clear/exact requirement text, specific document references (including relevant sections when possible), adequate tailoring justification, recorded approvals, and centralized/searchable storage.

Source:

- NASA Software Engineering Handbook, `SWE-125 - Requirements Compliance Matrix`, sections 3.2.2, 3.6.1, and 3.7
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix

### Finding

NASA distinguishes "marked complete" from "traceable evidence exists that demonstrates completion." The matrix functions partly as an index into the evidence rather than attempting to contain all evidence itself.

### Possible implication for this Guide

A future zero-miss/completion record might need evidence pointers such as commit, test run, screenshot, public URL, file/section, or runtime result instead of only checkboxes.

**Adoption status:** candidate for later comparison, not accepted.

## N-17 — NASA keeps a review/change history for the matrix itself

### Evidence

SWE-125 Software Assurance product guidance describes an `RMM Review and Change Log` containing:

- chronological RMM updates and version history,
- records of formal reviews,
- change triggers such as software-classification or contract changes,
- discussions/decisions on tailored assurance/safety requirements,
- approvals and open issues,
- recurring risk trends for tailored or delegated requirements.

Source:

- NASA Software Engineering Handbook, `SWE-125 - Requirements Compliance Matrix`, section 7.2.2
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix

### Finding

The control artifact itself has history. NASA can therefore distinguish "the current matrix says X" from "why and when X changed."

### Possible implication for this Guide

If an applicability record ever becomes persistent, history may help explain why a rule disappeared or became applicable. However, Git history may already supply much of this for `web-project-guide`; a separate log could be redundant. This should be tested rather than assumed necessary.

**Adoption status:** not decided.

## N-18 — Delegated requirements remain visible and verifiable

### Evidence

SWE-125 applies not only to work performed directly by the project but also requirements delegated to other parties or fulfilled through contracts/agreements. NASA's guidance says delegated requirements should remain explicitly reflected, responsibility should be defined, and mechanisms such as deliverables, audits, or reviews should verify compliance.

Source:

- NASA Software Engineering Handbook, `SWE-125 - Requirements Compliance Matrix`, requirement text and section 7.4
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix

### Finding

Delegating work does not remove the requirement from the completeness model. Responsibility and evidence are tracked even when another party performs the work.

### Possible implication for this Guide

This may be relevant when work is handed to ChatGPT, Codex, CI, GitHub Actions, external services, or another tool: delegation should not automatically equal verified completion. The exact analogy is only a hypothesis at this stage.

**Adoption status:** not decided.

## N-19 — Normative requirement and handbook guidance should be distinguished

### Evidence

The NASA pages mix several layers:

- normative NPR requirement statements such as SWE-020, SWE-021, and SWE-125,
- notes and rationale,
- handbook implementation guidance,
- Software Assurance tasking and suggested products/metrics,
- enhanced explanatory sections that may be more detailed than the base NPR requirement itself.

For example, the normative SWE-125 text requires maintaining an RMM, while the handbook guidance expands this into suggested fields, milestone reviews, evidence practices, centralized storage, change logs, metrics, and assurance actions.

Sources:

- NASA, `NPR 7150.2D`
  - https://swehb.nasa.gov/spaces/SITE/pages/123601159/NPR%2B7150.2D
- NASA Software Engineering Handbook, `SWE-125 - Requirements Compliance Matrix`
  - https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695489/SWE-125%2B-%2BRequirements%2BCompliance%2BMatrix

### Finding

Not every detailed NASA practice found in the handbook has the same authority level. Some are hard requirements, while others are implementation guidance or assurance practice.

### Possible implication for this Guide

When later comparing/adopting NASA ideas, preserve the difference between "NASA requires this" and "NASA's handbook suggests/uses this." That prevents overclaiming evidence strength and helps decide what is too heavyweight for personal projects.

**Adoption status:** accepted as a research-method caution, not as a product rule.

---

## NASA — Current Working Takeaways

These are **research takeaways, not requirements**:

1. Determine applicability from more than product type alone.
2. Do not under-classify when a stronger applicable condition exists.
3. Allow materially different components to carry different applicability.
4. Do not trust one unchecked classification decision for high-confidence work.
5. Keep a durable applicability/compliance record after routing.
6. Make `Not Applicable` explicit rather than equivalent to `not considered`.
7. Re-evaluate classification/applicability after meaningful scope or runtime changes.
8. Verify completion against the resolved requirement set; routing success alone is not completion evidence.
9. Review `Not Applicable` decisions because they are themselves a possible source of omission.
10. Keep `Not Applicable` separate from `Exception / Override`; applicable rules that are intentionally relieved should retain rationale, risk, mitigation, and visible approval/decision evidence.
11. Establish the expected applicability set early enough to influence planning.
12. Treat applicability/compliance state as something that can evolve throughout the lifecycle.
13. Recheck both at milestones and when meaningful change events occur.
14. Propagate material classification changes into affected plans/contracts/obligations rather than treating the label as isolated metadata.
15. Do not weaken classification merely to avoid inconvenient requirements; use an explicit exception path instead.
16. Track evidence references for completion rather than relying only on a checked status.
17. Preserve enough change/review history to explain how applicability decisions evolved, while avoiding duplicate history mechanisms where Git already suffices.
18. Keep delegated work visible in the completeness model until independently verified.
19. Distinguish NASA's normative requirement statements from handbook guidance and assurance practices when weighing evidence.

## Open Questions Before Any Adoption

- How do ISO / IEC, NIST, safety-critical engineering, regulated software, large software organizations, and modern policy-as-code systems solve the same problem?
- Which NASA controls are valuable for small personal projects, and which are too heavyweight?
- Can the benefits of a compliance matrix be kept without turning every small code change into paperwork?
- Should high-confidence / `zero-miss` review use a stricter mode than normal implementation work?
- Can applicability be independently derived from repository evidence so that the router is checked by a different mechanism?
- Should applicability records exist per repository, per change, or in a hybrid baseline + change-specific form?
- Which change events should invalidate previous applicability/completion evidence?
- Can Git history replace a dedicated RMM change log for our scale?
- How should delegated work performed by AI/CI/tools be represented so execution is not confused with verification?
