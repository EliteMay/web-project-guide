# Assurance Case / Safety Case Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**.
- Capture is intentionally high-recall. Mechanisms are recorded even if they are too expensive, too formal, or currently impossible to reproduce in this project.

## Research Question

How do assurance-case / safety-case approaches make a system's completion, safety, reliability, security, or other quality claim auditable by explicitly connecting claims to arguments, assumptions, context, and evidence?

A secondary question is how these approaches detect weak arguments, missing evidence, stale evidence, invalid assumptions, and changes that invalidate earlier conclusions.

---

# 1. Assurance is not the same thing as checklist completion

## Evidence / observed practice

NIST defines assurance as grounds for justified confidence that a claim has been or will be achieved. NIST definitions based on ISO/IEC 15026 describe assurance as being obtained relative to specific claims and through techniques/methods that generate credible evidence.

NIST defines an assurance case as a reasoned, auditable artifact that supports a top-level claim using systematic argumentation, evidence, and explicit assumptions.

Sources:

- NIST CSRC Glossary, `assurance`
  - https://csrc.nist.gov/glossary/term/assurance
- NIST CSRC Glossary, `assurance case`
  - https://csrc.nist.gov/glossary/term/assurance_case
- NIST CSRC Glossary, `assurance evidence`
  - https://csrc.nist.gov/glossary/term/assurance_evidence

## Knowledge captured

A checklist answers questions such as `did we perform X?`.

An assurance case asks a stronger question:

```text
What are we claiming?
↓
Why should that claim follow?
↓
What assumptions/context does that reasoning depend on?
↓
What concrete evidence supports it?
↓
Can another reviewer audit the chain?
```

This is a different failure barrier from routing or compliance matrices.

**Adoption status:** not decided.

---

# 2. ISO/IEC/IEEE 15026-2 standardizes the structure of assurance cases

## Evidence / observed practice

ISO/IEC/IEEE 15026-2:2022 is the current international standard for assurance-case structure terminology. It applies to developing and maintaining assurance cases.

The standard describes an assurance case as an auditable artifact that gives a convincing and sound argument for a claim based on tangible evidence under a given context.

The earlier 2011 edition explicitly described the common shape as:

- top-level claim or claims,
- systematic argumentation,
- subordinate claims,
- evidence,
- explicit assumptions.

The 2022 edition deliberately standardizes structure and meaning without requiring a specific graphical notation or physical storage format.

Sources:

- ISO/IEC/IEEE 15026-2:2022
  - https://www.iso.org/standard/80625.html
- ISO Online Browsing Platform, ISO/IEC/IEEE 15026-2:2022
  - https://www.iso.org/obp/ui?_escaped_fragment_=iso%3Astd%3Aiso-iec-ieee%3A15026%3A-2%3Aed-2%3Av1%3Aen
- ISO/IEC 15026-2:2011 historical abstract
  - https://www.iso.org/standard/52926.html

## Knowledge captured

The assurance-case concept is not limited to safety. ISO notes use for properties such as:

- safety,
- reliability,
- maintainability,
- human factors,
- operability,
- security.

Therefore the same argument structure can, in principle, be applied to a software-development completion claim such as `this project satisfies its applicable guide requirements`.

**Adoption status:** not decided.

---

# 3. A well-formed argument does not prove the argument is true

## Evidence / observed practice

ISO/IEC/IEEE 15026-2:2022 explicitly focuses on structure terminology and does not impose requirements on the quality of assurance-case content.

NASA-linked Systems Engineering and Assurance Modeling documentation similarly warns that assurance cases document arguments but do not ensure the truth of those arguments; faulty reasoning or premises can still create a convincing-looking but invalid case.

Sources:

- ISO/IEC/IEEE 15026-2:2022, Introduction
  - https://www.iso.org/obp/ui?_escaped_fragment_=iso%3Astd%3Aiso-iec-ieee%3A15026%3A-2%3Aed-2%3Av1%3Aen
- Systems Engineering and Assurance Modeling, GSN models
  - https://modelbasedassurance.org/seamdoc/docs/chapter5/

## Knowledge captured

This is a major limitation:

```text
structured argument
≠
correct argument
```

A system can have perfect-looking traceability and still fail if:

- the top-level claim is wrong or too broad,
- the decomposition misses a relevant subclaim,
- an assumption is false,
- evidence does not actually support the claim,
- evidence is stale,
- the reasoning step is invalid,
- contradictory evidence is ignored.

This means an assurance-case layer cannot replace independent review, reference-universe checks, testing, or evidence-quality review.

**Adoption status:** not decided.

---

# 4. Goal Structuring Notation (GSN) makes argument structure visible

## Evidence / observed practice

The Safety-Critical Systems Club Assurance Cases Working Group maintains the Goal Structuring Notation Community Standard. Version 3 was published in 2021.

The Working Group explicitly covers construction, review, and maintenance of assurance cases and is considering proportionality, risk, confidence, conformance, counterargument/evidence, and bias.

GSN commonly represents:

- Goal — a claim to establish,
- Strategy — explanation of how a claim is decomposed or argued,
- Solution — evidence supporting a claim,
- Context — relevant contextual information,
- Assumption — something taken as true without further substantiation in that branch,
- Justification — rationale for the argument or decomposition,
- undeveloped elements — places where the argument is intentionally not yet completed,
- modular / away elements — references to argument content maintained elsewhere.

Sources:

- SCSC Assurance Cases Working Group
  - https://scsc.uk/acwg
- SCSC Goal Structuring Notation area
  - https://scsc.uk/gsn
- GSN Community Standard Version 3 citation page
  - https://scsc.uk/resources/citation_r1386.html

## Knowledge captured

A useful property of GSN is that hidden reasoning can be made explicit.

Instead of:

```text
All requirements are satisfied.
```

an argument must expose something closer to:

```text
Goal: all applicable requirements are satisfied
│
├─ Strategy: argue by applicable rule domain
│  ├─ Goal: deployment requirements satisfied
│  │  └─ Solution: deployment validation evidence
│  ├─ Goal: documentation requirements satisfied
│  │  └─ Solution: README / requirements consistency evidence
│  └─ Goal: testing requirements satisfied
│     └─ Solution: test run evidence
│
├─ Context: project is public GitHub Pages site
├─ Assumption: applicable-rule resolution is complete
└─ Justification: domain decomposition covers the resolved applicable set
```

This exposes exactly where a hidden bad assumption can sit.

**Adoption status:** not decided.

---

# 5. Explicit assumptions are a first-class element

## Evidence / observed practice

GSN contains explicit assumption elements. ISO assurance-case definitions also explicitly include underlying assumptions.

Sources:

- ISO/IEC/IEEE 15026-2:2022
  - https://www.iso.org/obp/ui?_escaped_fragment_=iso%3Astd%3Aiso-iec-ieee%3A15026%3A-2%3Aed-2%3Av1%3Aen
- SCSC GSN resources
  - https://scsc.uk/gsn

## Knowledge captured

This is relevant because many completion failures are not caused by a missing test; they are caused by an unstated premise.

Examples relevant to this Guide could include assumptions such as:

- `the router returned the complete set of relevant Owner Docs`,
- `the project is still STATIC-only`,
- `this change cannot affect deployment`,
- `the existing README metadata is still accurate`,
- `validator success means all relevant guide obligations were exercised`.

Once the assumption is explicit, a reviewer can challenge it directly.

An unstated assumption is much harder to audit.

**Adoption status:** strong research candidate, not accepted.

---

# 6. Context is part of the argument, not background decoration

## Evidence / observed practice

GSN includes context elements, and ISO describes claims/evidence as operating under a given context.

Safety cases are therefore not universal proofs detached from operating conditions.

Sources:

- SCSC GSN resources
  - https://scsc.uk/gsn
- ISO/IEC/IEEE 15026-2:2022
  - https://www.iso.org/obp/ui?_escaped_fragment_=iso%3Astd%3Aiso-iec-ieee%3A15026%3A-2%3Aed-2%3Av1%3Aen

## Knowledge captured

The same evidence can support a claim in one context and fail in another.

For software-development governance, potentially relevant context includes:

- runtime,
- public/private deployment,
- browser/Electron/server environment,
- persistence/storage model,
- user-facing/non-user-facing status,
- safety/security/financial impact,
- repository state,
- supported devices,
- current guide version.

A stale context can invalidate an otherwise reasonable argument.

**Adoption status:** not decided.

---

# 7. Evidence should be connected to specific claims

## Evidence / observed practice

NIST SP 800-171A Rev. 3 describes an assurance case for compliance as evidence organized into an argument demonstrating the compliance claim. Evidence may come from multiple sources and assessment activities.

Recent health-software assurance-case guidance based on GSN recommends that a solution/evidence reference be specific enough to show how it supports its related goal—for example, a particular test result rather than only citing a large test report.

Sources:

- NIST SP 800-171A Rev. 3, section 2.2 Assurance Cases
  - https://nvlpubs.nist.gov/nistpubs/SpecialPublications/800-171Ar3/NIST.SP.800-171Ar3.html
- ISO/TS 81001-2-1:2025 secondary standards view
  - https://standards.iteh.ai/catalog/standards/iso/a0a207a9-dad0-411d-aa5b-b86e7149f2f9/iso-ts-81001-2-1-2025

## Knowledge captured

Evidence quality has at least two dimensions:

1. Is the evidence credible?
2. Is it actually relevant to this exact claim?

A generic `tests passed` statement can be weak evidence for a specific claim such as `the public Pages URL is documented in README`.

**Adoption status:** not decided.

---

# 8. Evidence can come from multiple independent sources

## Evidence / observed practice

NIST SP 800-171A Rev. 3 says assurance-case evidence may be compiled from different assessment types and sources, including independent third-party assessments when appropriate.

UL 4600 similarly emphasizes a complete safety argument rather than one mandated single development process or one type of artifact.

Sources:

- NIST SP 800-171A Rev. 3
  - https://nvlpubs.nist.gov/nistpubs/SpecialPublications/800-171Ar3/NIST.SP.800-171Ar3.html
- UL 4600 Edition 3 scope
  - https://www.shopulstandards.com/ProductDetail.aspx?productId=UL4600_3_S_20230317

## Knowledge captured

An assurance case can combine evidence such as:

- static validation,
- runtime tests,
- screenshots,
- deployment checks,
- external service state,
- independent review,
- requirements traceability,
- repository metadata,
- audit records,
- user test evidence.

This avoids treating one validator as an all-powerful oracle.

**Adoption status:** not decided.

---

# 9. UL 4600 is claim-based and deliberately does not pretend its checklist is complete

## Evidence / observed practice

ANSI/UL 4600 is a goal-based, technology-agnostic standard for evaluating autonomous products using a safety argument / safety case.

The current Edition 3 scope says its requirements are necessary but possibly not sufficient for an acceptably complete safety case. Prompt-element lists are explicitly non-exhaustive, and design teams are expected to add relevant items for their specific product and operational design domain.

The historical public summary explains that UL 4600 emphasizes a claim-based safety case encompassing essentially the material needed for assurance. It specifies some required activities/work products but does not mandate one overall development process.

Sources:

- UL Standards & Engagement, UL 4600 Edition 3
  - https://www.shopulstandards.com/ProductDetail.aspx?productId=UL4600_3_S_20230317
- ANSI historical summary of UL 4600 Edition 1
  - https://webstore.ansi.org/standards/ul/ul4600ed2020
- UL Solutions overview of Edition 3
  - https://www.ul.com/news/ul-4600-edition-3-updates-incorporate-autonomous-trucking

## Knowledge captured

This is extremely relevant to rule-miss prevention.

UL 4600 does **not** make the claim:

```text
we supplied the official checklist
therefore completeness is guaranteed
```

Instead the standard explicitly expects project-specific additions.

This suggests a mature safety standard treats its own prompt/reference list as a lower bound, not a proof that no missing concern exists.

**Adoption status:** strong research candidate, not accepted.

---

# 10. Safety cases can use templates and reusable argument patterns

## Evidence / observed practice

The assurance-case ecosystem supports reusable structures/patterns. OMG SACM supports structured assurance-case representations and its evolution has included concepts for patterns, reusable subclaims/evidence, libraries, and community conventions.

Safety-case research also recommends reuse of community-endorsed templates rather than every project inventing a completely bespoke argument from scratch.

Sources:

- OMG Structured Assurance Case Metamodel (SACM) 2.3
  - https://www.omg.org/spec/SACM/About-SACM
- OMG SACM 2.1 specification overview
  - https://www.omg.org/spec/SACM/2.1/PDF
- SCSC GSN resources
  - https://scsc.uk/gsn

## Knowledge captured

There is a middle ground between:

- one rigid checklist for every project, and
- writing a completely custom proof for every task.

Reusable argument templates can encode known recurring claim structures while allowing project-specific claims/evidence.

Potential examples in this Guide could someday include argument templates for:

- public GitHub Pages release,
- storage migration,
- Electron release,
- user-facing visual completion,
- security-sensitive integration,
- learning-content completeness.

No adoption decision is made here.

**Adoption status:** candidate, not accepted.

---

# 11. Counterarguments / defeaters are a first-class review concept

## Evidence / observed practice

The SCSC Assurance Cases Working Group explicitly identifies counterargument, counter-evidence, confidence, and potential bias as areas of concern in assurance-case review.

Carnegie Mellon SEI research on assurance-case confidence proposes searching for `defeaters`: reasons for doubting a claim, reasoning step, or evidence connection. Confidence increases when plausible reasons for doubt are identified and successfully eliminated rather than simply ignored.

Sources:

- SCSC Assurance Cases Working Group
  - https://scsc.uk/acwg
- CMU SEI, `Toward a Theory of Assurance Case Confidence`
  - https://www.sei.cmu.edu/library/toward-a-theory-of-assurance-case-confidence/

## Knowledge captured

This turns review from:

```text
Can I find something supporting this claim?
```

into:

```text
What would make this claim false?
What evidence could undermine it?
What assumption could fail?
What alternative explanation exists?
```

For the recent Pages/README miss, a defeater could have been:

> `The project has a public Pages site, but the documentation-completion argument does not contain any evidence that the public URL is represented in README.`

This is a different mindset from ordinary positive checklist checking.

**Adoption status:** strong research candidate, not accepted.

---

# 12. Assurance-case review must consider argument completeness, not only evidence presence

## Evidence / observed practice

UL 4600 emphasizes a reasonably complete and well-formed safety case. Its prompt lists are non-exhaustive, requiring relevant project-specific concerns to be added.

ISO/IEC/IEEE 15026-2 standardizes structure but does not guarantee content quality, which means completeness has to be assessed separately.

Sources:

- UL 4600 Edition 3
  - https://www.shopulstandards.com/ProductDetail.aspx?productId=UL4600_3_S_20230317
- ISO/IEC/IEEE 15026-2:2022
  - https://www.iso.org/obp/ui?_escaped_fragment_=iso%3Astd%3Aiso-iec-ieee%3A15026%3A-2%3Aed-2%3Av1%3Aen

## Knowledge captured

A claim tree can be fully filled with evidence while still omitting an entire branch that nobody thought to create.

Therefore at least two questions exist:

1. Does every declared subclaim have adequate support?
2. Are all necessary subclaims present in the first place?

The second question is directly analogous to rule-applicability completeness.

**Adoption status:** not decided.

---

# 13. Undeveloped claims can be represented explicitly

## Evidence / observed practice

GSN supports marking goals/strategies as undeveloped rather than pretending the argument is complete.

Source:

- SCSC GSN resources
  - https://scsc.uk/gsn

## Knowledge captured

This is useful because `unknown / unresolved` becomes visible in the assurance structure.

A project does not need to collapse these states into a false binary of:

```text
pass / fail
```

It can represent:

```text
supported
unsupported
undeveloped
assumed
not applicable
exception
stale evidence
challenged
```

The exact state model is not yet selected for this Guide.

**Adoption status:** candidate, not accepted.

---

# 14. Assurance cases are lifecycle artifacts and must be maintained

## Evidence / observed practice

ISO/IEC/IEEE 15026-2:2022 explicitly applies to developing **and maintaining** assurance cases.

Safety-case maintenance research from the University of York describes safety arguments as lifecycle artifacts that must be updated when any of the following change:

- regulatory requirements,
- design,
- evidence,
- operational experience,
- assumptions,
- environmental context.

Sources:

- ISO/IEC/IEEE 15026-2:2022
  - https://www.iso.org/standard/80625.html
- York Research Database, `A systematic approach to safety case maintenance`
  - https://pure.york.ac.uk/portal/en/publications/a-systematic-approach-to-safety-case-maintenance/
- York Research Database, `An Approach to Maintaining Safety Case Evidence After A System Change`
  - https://pure.york.ac.uk/portal/en/publications/an-approach-to-maintaining-safety-case-evidence-after-a-system-ch/

## Knowledge captured

The question after a change is not merely:

```text
Did the edited code pass tests?
```

It is also:

```text
Which earlier claims, assumptions, argument links, and evidence are still valid?
```

This is similar to safety-critical change-impact analysis but focused on the argument/evidence graph itself.

**Adoption status:** strong research candidate, not accepted.

---

# 15. Change can invalidate evidence without changing the evidence file itself

## Evidence / observed practice

Safety-case maintenance literature notes that changes in system design, operation, or environmental context can invalidate previously valid evidence. Assumptions valid under one context can become false in another.

Sources:

- York Research Database, Jaradat/Graydon/Bate 2014
  - https://pure.york.ac.uk/portal/en/publications/an-approach-to-maintaining-safety-case-evidence-after-a-system-ch/
- York Research Database, Kelly/McDermid safety-case maintenance
  - https://pure.york.ac.uk/portal/en/publications/a-systematic-approach-to-safety-case-maintenance/

## Knowledge captured

Evidence freshness is semantic, not just timestamp-based.

Example:

- a browser test from yesterday may be stale if the runtime changed today,
- a README consistency check may be stale if the project changed from non-public to Pages-public,
- a storage migration test may be stale if the schema changed after the test,
- a visual screenshot may be stale if CSS changed later.

A future evidence model could therefore need dependency awareness, not only dates.

**Adoption status:** candidate, not accepted.

---

# 16. Argument dependency graphs support impact analysis

## Evidence / observed practice

Safety-case maintenance research uses the explicit dependencies in goal-structured arguments to identify which claims/evidence may be affected by a change. It describes the `ripple effect` problem where one changed artifact can invalidate multiple dependent parts of the argument.

Source:

- York Research Database, `A systematic approach to safety case maintenance`
  - https://pure.york.ac.uk/portal/en/publications/a-systematic-approach-to-safety-case-maintenance/

## Knowledge captured

This suggests a possible future capability:

```text
changed artifact / project property
↓
trace to dependent evidence
↓
trace to dependent subclaims
↓
trace to completion claim
↓
mark affected proof branches stale / unresolved
```

This is substantially stronger than rerunning every check blindly or assuming unaffected areas remain valid.

**Adoption status:** not decided.

---

# 17. `No impact` is itself an important decision

## Evidence / observed practice

Safety-case change-maintenance literature emphasizes that deciding an item is unaffected can materially determine whether all consequences of a change are recognized. Such `no impact` conclusions should therefore be explicit rather than silently inferred.

Source:

- `A systematic approach to safety case maintenance`
  - https://www.sciencedirect.com/science/article/pii/S095183200000079X

## Knowledge captured

This parallels the NASA/ISO concept of explicit `Not Applicable`.

For change impact, the relevant state distinction may be something like:

```text
impacted
not impacted — reason recorded
unknown
not evaluated
```

Again, the exact Guide design is not decided.

**Adoption status:** candidate, not accepted.

---

# 18. Diverse evidence and argument can improve resilience

## Evidence / observed practice

Safety-case maintenance research identifies diverse evidence/argument as one strategy that can improve the robustness of safety arguments under change.

Source:

- `A systematic approach to safety case maintenance`
  - https://www.sciencedirect.com/science/article/pii/S095183200000079X

## Knowledge captured

This gives a rationale for multiple independent failure barriers.

If one completion claim is supported only by one source, such as a single validator, that source becomes a single point of assurance failure.

A stronger structure may combine different evidence classes whose failure modes differ.

**Adoption status:** not decided.

---

# 19. Machine-readable assurance cases already have a standards ecosystem

## Evidence / observed practice

The Object Management Group Structured Assurance Case Metamodel (SACM) defines a metamodel for structured assurance cases and publishes normative machine-readable model files.

The current OMG SACM lineage includes versions 1.0 through 2.3. SACM 2.3 includes normative XML machine-readable material.

SACM has been motivated by needs including:

- representation of claims, arguments, and evidence,
- model exchange/import/export,
- reusable claim/evidence constructs,
- libraries/templates,
- analytics/validation,
- enforcement of community conventions,
- re-examination of assumptions and evidence appropriateness.

Sources:

- OMG SACM 2.3
  - https://www.omg.org/spec/SACM/About-SACM
- OMG SACM 2.1
  - https://www.omg.org/spec/SACM/2.1/PDF

## Knowledge captured

Assurance cases do not have to remain prose or diagrams manually maintained by humans.

There is already a standards path toward machine-readable graphs that tools can inspect, exchange, query, and validate.

This is useful long-term knowledge even if the current `web-project-guide` does not implement SACM.

**Adoption status:** not decided.

---

# 20. NIST has also researched machine-readable Claims / Arguments / Evidence repositories

## Evidence / observed practice

NIST's Structured Software Assurance work has researched structured assurance-case models for software qualities beyond safety and described a Software Assurance Meta-model concept for machine-readable metadata describing Claims, Arguments, and Evidence.

Source:

- NIST, Measurement, Metrics, and Assurance
  - https://www.nist.gov/programs-projects/measurement-metrics-and-assurance

## Knowledge captured

Machine-readable assurance is not limited to one niche safety-case notation. Similar concepts appear across standards and research organizations.

Potential future system capabilities could include queries such as:

- Which claims depend on this evidence?
- Which evidence was generated before the current implementation revision?
- Which claims contain unresolved assumptions?
- Which top-level completion claims have unsupported branches?
- Which evidence generator produced this result?
- Which rule change invalidated earlier assurance?

**Adoption status:** not decided.

---

# 21. Continuous assurance can connect CI/CD changes to evidence invalidation

## Evidence / observed practice

Recent continuous-assurance research describes systems in which workflow tools track input artifacts and generated artifacts. When an input changes, downstream evidence-generation and assurance steps can be identified as needing refresh.

Research on the Evidential Tool Bus describes integration of evidence generation, curation, and assurance generation into CI/CD/continuous-assurance workflows.

Sources:

- `Towards Continuous Assurance Case Creation for ADS with the Evidential Tool Bus`
  - https://arxiv.org/abs/2403.01918
- SRI research on CI/CD/Continuous Assurance
  - https://www.csl.sri.com/~rushby/papers/sassur24.pdf

## Knowledge captured

A possible mature future architecture is not merely:

```text
commit
→ run validator
```

but:

```text
commit/change
→ determine affected claims/evidence
→ regenerate affected evidence
→ reevaluate affected argument branches
→ top-level assurance status changes automatically
```

This is currently research knowledge, not an implementation requirement.

**Adoption status:** not decided.

---

# 22. Assurance cases support modularity for large systems

## Evidence / observed practice

GSN and SACM support modular / referenced argument structures so a large assurance case does not have to be one giant monolithic diagram/document.

Sources:

- SCSC GSN resources
  - https://scsc.uk/gsn
- OMG SACM
  - https://www.omg.org/spec/SACM/About-SACM

## Knowledge captured

This is relevant if the Guide eventually has claims for many domains.

Possible modular decomposition could be by:

- deployment,
- documentation,
- data/storage,
- security,
- testing,
- visual quality,
- accessibility,
- Electron release,
- research completeness,
- project-specific requirements.

Modules could then be reused/composed while retaining one top-level completion argument.

**Adoption status:** not decided.

---

# 23. Assurance-case completeness and rule-universe completeness are related but not identical

## Knowledge captured from synthesis

Research across NASA, NIST, ISO/IEC, UL 4600, GSN, and assurance-case literature suggests two different completeness problems:

### Applicability completeness

Did we identify all rules/concerns that should be considered?

Mechanisms seen elsewhere include:

- classification,
- baseline + overlays,
- reference-universe comparison,
- explicit not-applicable states,
- independent applicability review.

### Argument completeness

Given the resolved obligations/claims, did we build a complete argument for why they are satisfied?

Mechanisms include:

- claim decomposition,
- explicit assumptions/context,
- evidence links,
- undeveloped-claim markers,
- counterargument/defeater review,
- independent assurance-case assessment.

A good argument cannot recover a rule that was never identified, while a complete rule list cannot guarantee adequate evidence or reasoning.

**Adoption status:** synthesis only, not accepted.

---

# 24. Potential failure modes of assurance-case approaches

These are important to preserve because assurance cases are not automatically superior.

## Failure modes observed or implied by sources

- **Missing claim branch:** the argument looks complete because the omitted concern never appears.
- **False assumption:** a hidden or explicit premise is wrong.
- **Weak evidence:** evidence exists but has low credibility.
- **Irrelevant evidence:** evidence does not actually substantiate the claim.
- **Stale evidence:** project/context changed after evidence was generated.
- **Invalid inference:** subclaims do not logically justify the parent claim.
- **Confirmation bias:** authors only search for supporting evidence.
- **Argument complexity:** very large cases become difficult to understand and maintain.
- **Tool dependence:** automated assurance tooling can itself be wrong.
- **Template misuse:** copied argument patterns can hide context-specific omissions.
- **Paper compliance:** teams can optimize the argument artifact instead of the actual system.
- **Review weakness:** bespoke arguments may receive less community scrutiny than mature standards/checklists.

Sources contributing to these concerns:

- ISO/IEC/IEEE 15026-2:2022 limitation on content quality
  - https://www.iso.org/obp/ui?_escaped_fragment_=iso%3Astd%3Aiso-iec-ieee%3A15026%3A-2%3Aed-2%3Av1%3Aen
- SCSC ACWG focus on counterargument and bias
  - https://scsc.uk/acwg
- CMU SEI assurance-case confidence research
  - https://www.sei.cmu.edu/library/toward-a-theory-of-assurance-case-confidence/
- York safety-case maintenance research
  - https://pure.york.ac.uk/portal/en/publications/a-systematic-approach-to-safety-case-maintenance/

## Knowledge captured

A mature design would likely need an assurance case **plus** other independent controls rather than replacing everything with a claim graph.

**Adoption status:** not decided.

---

# 25. Strong emerging synthesis across researched systems

This section records current synthesis only. It is **not a requirement decision**.

The external systems studied so far increasingly resemble a layered architecture:

```text
Rule / concern universe
↓
Classification / baseline / tailoring / overlays
↓
Resolved applicable set
↓
Explicit status for each obligation
↓
Implementation
↓
Evidence generation
↓
Claim / argument / evidence structure
↓
Independent challenge / counterargument / audit
↓
Change-impact / evidence freshness
↓
Continuous monitoring / reassessment
↓
Lessons learned feed back into rules/process
```

No single stage proves completion by itself.

A recurring design principle across NASA, NIST, CMMI, ISO, safety-critical standards, and assurance-case literature is the use of **different mechanisms with different failure modes** rather than one perfect router, checklist, validator, or reviewer.

**Adoption status:** synthesis only, not accepted.

---

# Open Questions

- Can a lightweight assurance-case concept be useful for ordinary Web/Electron projects without producing excessive paperwork?
- What should the top-level claim be: `project complete`, `change complete`, `release acceptable`, or something narrower?
- Should assurance cases exist only for Meaningful/Systemic/high-risk work?
- How could a top-level claim be independently checked for missing branches?
- Can the current rule-router produce candidate claims without becoming the sole source of applicability?
- Should completion evidence reference commit SHA, guide version, project requirements revision, and runtime context?
- How should evidence freshness be represented?
- Can changed files automatically invalidate dependent claims/evidence?
- Would a simple JSON graph preserve most SACM/GSN benefits without adopting those standards directly?
- How can defeaters/counterarguments be generated independently from the positive argument?
- How should `Not Applicable`, `Exception`, `Unresolved`, `Undeveloped`, and `Stale` interact?
- Can assertion/evidence relationships be validated automatically while semantic correctness remains human/AI-reviewed?
- When is diverse evidence worth the additional cost?
- How should validator/tool confidence itself be represented?
- Can reusable assurance templates accidentally become another source of blind spots?
- How should the system prevent an AI from producing a superficially convincing but circular assurance argument?
- Would an assurance case be stored per repository, per release, per PR/change, or generated transiently from persistent project state?
