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

Material findings from this requirements/research effort are written to GitHub as they are discovered instead of being held only in conversation context or memory.

For each important finding, keep these separate:

1. **Evidence** — what the external source actually does or says.
2. **Finding** — what appears important about it.
3. **Possible implication** — how it might help `web-project-guide`.
4. **Adoption status** — `not decided`, `candidate`, `accepted`, or `rejected`.

This prevents an interesting external practice from silently becoming a rule before comparison and discussion.

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

## Open Questions Before Any Adoption

- How do ISO / IEC, NIST, safety-critical engineering, regulated software, large software organizations, and modern policy-as-code systems solve the same problem?
- Which NASA controls are valuable for small personal projects, and which are too heavyweight?
- Can the benefits of a compliance matrix be kept without turning every small code change into paperwork?
- Should high-confidence / `zero-miss` review use a stricter mode than normal implementation work?
- Can applicability be independently derived from repository evidence so that the router is checked by a different mechanism?
