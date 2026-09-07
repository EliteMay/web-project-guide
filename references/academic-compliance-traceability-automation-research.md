# Academic Research — Compliance Checking, Requirements Traceability, and Automation

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**. It intentionally records successful approaches, unresolved problems, weak evidence, implementation barriers, and techniques that may not be usable by this project today.

## Research Question

What does academic research say about whether software-compliance checking, requirements traceability, and policy/compliance automation actually reduce omission risk in practice, and which parts remain unresolved?

This pass is intentionally broader than a single paper. It records multiple systematic reviews, mapping studies, and empirical studies so that later design decisions are not based only on standards or vendor documentation.

---

# 1. Automated software-process compliance checking is a real research field, but there is no mature universal solution

## Evidence / observed practice

A 2022 systematic literature review by Castellanos Ardila, Gallina, and Muram reviewed automated compliance checking of software processes against normative frameworks such as standards and regulations.

The review:

- searched major software-engineering research libraries,
- started from 2,034 candidate studies,
- selected 41 primary studies,
- focused specifically on automated compliance/conformance checking of software-development processes,
- found approaches based on ontologies, metamodels, formal/logical languages, process models, and other representations,
- found that normative frameworks vary substantially in structure, concepts, variability, tailoring rules, and change behavior.

The review defines compliance checking as verifying whether a software-development process adheres to a selected set of normative requirements. It notes that compliance may be shown either by satisfying the requirements directly or by applying allowed tailoring within the boundaries of the norm.

A key architectural observation is that automated checking needs at least two analyzable specifications:

1. a specification/model of the process actually being executed;
2. a specification/model of the normative requirements regulating that process.

Source:

- Castellanos Ardila, Gallina, Muram, `Compliance checking of software processes: A systematic literature review`, Journal of Software: Evolution and Process, 2022
  - https://onlinelibrary.wiley.com/doi/10.1002/smr.2440

## Knowledge captured

The academic literature independently reaches the same basic decomposition seen in NASA/NIST:

```text
What the system/process actually is
+
What rules are supposed to apply
↓
Reason over both
↓
Compliance result
```

This means a rule engine cannot determine reliable compliance from the rule text alone. It needs a sufficiently accurate representation of the project/process state as input.

**Adoption status:** not decided.

---

# 2. Manual compliance checking is difficult because the rule universe is large, heterogeneous, and changing

## Evidence / observed practice

The 2022 compliance-checking SLR describes manual compliance checking as difficult because:

- organizations may face numerous normative frameworks,
- frameworks contain many requirements,
- requirements have different purposes and structures,
- norms can change,
- frameworks may permit multiple compliant implementation paths,
- tailoring introduces context-dependent applicability,
- agile processes and variability make fixed mappings harder.

The review notes that standards can prescribe not only the existence of tasks but also ordering, personnel, work products, tools, methods, and properties of those artifacts.

Source:

- https://onlinelibrary.wiley.com/doi/10.1002/smr.2440

## Knowledge captured

A large rule system naturally creates omission pressure even before human error is considered. The problem is structural: the number of rules, heterogeneity of their applicability, permitted alternatives, and change over time make a single manual pass fragile.

**Adoption status:** not decided.

---

# 3. Automation can make checking more repeatable, but only if the checker and its inputs are correct

## Evidence / observed practice

The 2022 SLR argues that automated checking can be more objective/repeatable than manual checking because a correctly designed deterministic algorithm can return the same result for the same parameters and inputs.

However, the same review reports that most published approaches still require human intervention, especially when constructing or formalizing the inputs used for reasoning.

Most solutions are described as:

- conceptual models,
- proof-of-concept prototypes,
- ad hoc approaches targeting particular norms or scenarios.

The review calls for improvements in:

- automation level,
- real tool support,
- usability,
- diagnostics,
- traceability,
- data provenance,
- rule formalization,
- handling of normative diversity,
- handling of change.

Source:

- https://onlinelibrary.wiley.com/doi/10.1002/smr.2440

## Knowledge captured

Automation shifts some failure modes rather than eliminating them.

Manual checking risks:

- forgetting a rule,
- inconsistent interpretation,
- fatigue,
- non-repeatable decisions.

Automated checking additionally risks:

- incomplete or wrong formalization,
- incorrect project-state input,
- bugs in the checker,
- unsupported norm constructs,
- stale rules,
- false confidence in deterministic output.

The research therefore supports the safety-critical observation that the **checker itself becomes an assurance target**.

**Adoption status:** strong research candidate, not accepted.

---

# 4. There is no accepted norm-agnostic language/model that solves compliance checking generically

## Evidence / observed practice

The 2022 SLR found many different representations and languages for:

- software processes,
- tasks,
- roles,
- artifacts,
- normative requirements,
- variability and tailoring,
- logic/reasoning.

The authors identify a need for a generic, normative-agnostic solution, but explicitly present this as future work rather than a solved problem.

They also note a need to compare and reuse existing process-modeling languages instead of repeatedly inventing new representations.

Source:

- https://onlinelibrary.wiley.com/doi/10.1002/smr.2440

## Knowledge captured

There is no academic evidence here for one universal schema that can faithfully encode every kind of software-development rule.

This cautions against designing an enormous internal DSL and assuming it can represent every Common Rule from security to UI/UX, deployment, storage, visual quality, learning content, and Electron behavior.

A practical system may need a mixed model:

- machine-checkable rules where semantics are crisp,
- structured-but-human-reviewed rules where semantics are contextual,
- explicit evidence/exception states for the remainder.

This is an interpretation, not a requirement.

**Adoption status:** not decided.

---

# 5. Software-compliance research says organizational and human factors remain important even with technical controls

## Evidence / observed practice

A 2023 systematic literature review on software compliance requirements, factors, and policies:

- retrieved 4,772 candidate studies,
- reduced them to 77 primary studies,
- identified 14 compliance-requirement categories,
- identified 19 policies,
- identified 55 factors influencing compliance behavior.

Frequently discussed policies included:

- security education, training, and awareness,
- compliance automation,
- organizational climate.

The review identifies a recurring gap between domain/compliance experts and software engineers.

It also identifies `policy as code` as an evolving topic, but describes it as still immature and notes missing mechanisms/tools for enforcement and visibility to stakeholders.

Source:

- Mubarkoot et al., `Software Compliance Requirements, Factors, and Policies: A Systematic Literature Review`, Computers & Security 124, 2023
  - https://doi.org/10.1016/j.cose.2022.102985

## Knowledge captured

Academic evidence does not support treating compliance purely as a tooling problem.

Even with automation, correct interpretation, responsibility, communication, and organizational integration matter. For AI-driven development, an analogous problem may occur when:

- the human knows project intent but not every guide rule,
- the agent knows the guide but misreads project context,
- a machine checker can evaluate only the parts formalized into code.

**Adoption status:** not decided.

---

# 6. Policy as Code is promising, but academic literature still treats it as an emerging area

## Evidence / observed practice

The 2023 software-compliance SLR states that policy-as-code can help reduce misinterpretation across stakeholders by representing policies in code and enabling automation/enforcement. However, it characterizes the area as emerging and underdeveloped.

A 2026 empirical study of Policy-as-Code adoption in open-source software projects analyzed 399 GitHub repositories using nine Policy-as-Code tools. The study reports that:

- adoption is concentrated around a relatively small set of policy engines,
- security/compliance use cases dominate,
- advanced automation use remains comparatively uncommon,
- most projects use one Policy-as-Code tool rather than interoperable multi-tool systems,
- adoption often follows the underlying DevOps stack.

At the time of this research pass (2026-09-07), the Journal of Systems and Software result is listed for Volume 242, December 2026; treat it as current/forthcoming publication metadata rather than a long-established result.

Sources:

- https://doi.org/10.1016/j.cose.2022.102985
- Foalem et al., `An Empirical Study of Policy-as-Code Adoption in Open-Source Software Projects`
  - https://arxiv.org/abs/2601.05555
  - journal page: https://www.sciencedirect.com/science/article/pii/S016412122600261X

## Knowledge captured

Policy as Code is not merely theoretical, but research does not show that most real projects have reached fully automated governance.

This matters because vendor documentation can make mature PaC workflows look more universal than they actually are in practice.

**Adoption status:** not decided.

---

# 7. Requirements traceability is valuable because it links intent through the lifecycle

## Evidence / observed practice

Requirements traceability is broadly defined as maintaining links between requirements and related software artifacts across the lifecycle.

A 2025 systematic review describes traceability as a way to ensure each requirement is tracked through the software-development lifecycle and linked to the final product.

A 2024 SLR on pre-requirements-specification traceability distinguishes:

- **pre-RS / upstream traceability** — linking a requirement back to sources such as stakeholder interviews, meeting protocols, decisions, legacy systems, and other origin evidence;
- **post-RS traceability** — linking requirements forward to design, code, tests, and other implementation artifacts;
- forward and backward tracing;
- inter-requirement dependencies;
- extra-requirement links to other artifacts.

Sources:

- Koboyatshwene & Ayalew, `Requirements Traceability: A Systematic Literature Review`, ACM SAC 2025
  - https://doi.org/10.1145/3672608.3707952
- Mucha, Kaufmann, Riehle, `A systematic literature review of pre-requirements specification traceability`, Requirements Engineering 29, 2024
  - https://link.springer.com/article/10.1007/s00766-023-00412-z

## Knowledge captured

Traceability is not only `Requirement → Code`.

A richer chain can include:

```text
User need / source / rationale
↓
Requirement
↓
Design / decision
↓
Implementation
↓
Test / validation
↓
Release / runtime evidence
```

For `web-project-guide`, the analogous chain might eventually include rule applicability and completion evidence, but that remains an adoption question.

**Adoption status:** not decided.

---

# 8. Traceability improves maintenance and change work in empirical studies

## Evidence / observed practice

The 2023 practitioner study `Why don’t we trace?` summarizes prior controlled experimental evidence showing that trace navigation can improve the performance, quality, and workflow of maintenance/change tasks.

The same paper reports that practitioners use traceability for scenarios such as:

- finding the origin and rationale of requirements,
- understanding history,
- tracking implementation/task state,
- impact analysis during change.

Source:

- Rempel et al., `Why don’t we trace? A study on the barriers to software traceability in practice`, Requirements Engineering, 2023
  - https://link.springer.com/article/10.1007/s00766-023-00408-9

## Knowledge captured

Traceability has practical value beyond regulatory paperwork. It can make changes safer because the engineer can see what a changed artifact depends on and what depends on it.

This supports the change-impact-analysis ideas previously found in FAA/safety-critical sources.

**Adoption status:** not decided.

---

# 9. The biggest practical traceability failure is maintenance cost and staleness

## Evidence / observed practice

Multiple academic sources report that manual traceability is expensive and that trace links quickly become stale.

The 2024 pre-RS SLR reports:

- perceived trace effort/workload is often too high,
- maintenance is time-consuming,
- stale/obsolete trace links are difficult to detect,
- poor maintenance is strongly associated with people-related problems,
- traceability can be treated as regulatory overhead instead of useful engineering infrastructure.

The SLR's coded problem set includes:

- too much work versus visible benefit,
- lack of trust in traces,
- unclear responsibility,
- tacit knowledge / unnoticed links,
- ad hoc trace effort,
- lack of documentation for verbal communication,
- insufficient verification of correctness/completeness,
- poor maintenance,
- path/link ephemerality,
- missing standards/generalization,
- low organizational priority,
- tooling integration problems,
- poor identification of artifacts,
- insufficient automation,
- poor presentation/access,
- unstructured information,
- missing usage goals,
- inadequate support for large/distributed datasets.

Sources:

- https://link.springer.com/article/10.1007/s00766-023-00412-z
- https://link.springer.com/article/10.1007/s00766-023-00408-9

## Knowledge captured

A trace system can become another stale documentation system if link maintenance is not cheap or automatically supported.

For later design work, any proposed rule-evidence matrix or trace graph should be evaluated not only on theoretical coverage but on:

- maintenance effort,
- staleness detection,
- update triggers,
- who/what owns updates,
- whether traces are generated as a by-product rather than manual paperwork.

**Adoption status:** strong design constraint candidate, not accepted.

---

# 10. The ideal trace system is generated as a by-product, but research says that goal is not yet achieved

## Evidence / observed practice

The 2024 pre-RS SLR identifies two broad recording strategies:

1. record all available source/trace data;
2. selectively record predefined artifacts.

Both have costs:

- record-everything creates data volume/management problems;
- selective tracing requires deciding in advance what matters and risks omission.

The review states that an ideal but still unattained solution is correct trace information produced as a by-product of normal work, minimizing extra manual effort and loss of source information.

Source:

- https://link.springer.com/article/10.1007/s00766-023-00412-z

## Knowledge captured

This is directly relevant to future AI/GitHub workflows.

A stronger system would derive evidence automatically from artifacts that already exist—commits, tests, files, CI results, deployment state—rather than asking the user/agent to manually fill a large matrix after every change.

The literature does **not** show this is fully solved.

**Adoption status:** strong research candidate, not accepted.

---

# 11. Traceability strategy must be context-specific

## Evidence / observed practice

The 2024 pre-RS SLR repeatedly notes that trace strategy depends on:

- project size,
- project longevity,
- process/development style,
- organization,
- user roles,
- intended use of the trace links,
- environment.

It identifies poor adaptability to project-specific needs as an unsolved problem.

Earlier small-project work cited in the review also found that company/project characteristics should influence how trace information is documented.

Source:

- https://link.springer.com/article/10.1007/s00766-023-00412-z

## Knowledge captured

A maximum-traceability design applied equally to every one-line CSS fix and every storage migration would likely be impractical.

This agrees with CMMI/NASA/NIST evidence favoring risk/context-based scaling.

The exact scaling rule remains undecided.

**Adoption status:** not decided.

---

# 12. Traceability has a trust problem: incorrect links can be worse than missing automation

## Evidence / observed practice

The 2024 pre-RS SLR identifies `no trust in traces` and incorrectly created links as unsolved problems.

The 2023 practitioner study reports strong demand for automation but also states that participants expected a human to review automatically generated trace links for correctness.

Practitioners specifically cited false positives and imperfect precision/recall as reasons why fully automatic trace creation was not trustworthy enough for their context.

Source:

- https://link.springer.com/article/10.1007/s00766-023-00408-9

## Knowledge captured

For omission prevention, false negatives and false positives matter differently:

- **false negative** — a relevant rule/link is missed; directly recreates the omission problem;
- **false positive** — irrelevant rules/links are produced; increases noise and may train users/agents to ignore warnings.

A zero-miss-oriented system therefore cannot optimize only for recall while allowing unlimited noise, because warning fatigue can indirectly reintroduce misses.

This is an interpretation to evaluate later.

**Adoption status:** not decided.

---

# 13. 2025 systematic review: full-lifecycle traceability support is still missing

## Evidence / observed practice

The ACM 2025 SLR reviewed requirements-traceability methods and tool support covering 2013–2024.

Its headline findings include:

- methods/tools spanning the full software-development lifecycle are missing,
- industrial case-study evaluations are sparse,
- this limits confidence in practical applicability,
- more support is needed for Agile and DevOps contexts.

Source:

- https://doi.org/10.1145/3672608.3707952

## Knowledge captured

There is no strong academic basis for assuming an off-the-shelf academic technique can maintain complete traceability from user intent through modern GitHub/CI/DevOps workflows.

This strengthens the case for layered safeguards rather than betting everything on one trace engine.

**Adoption status:** not decided.

---

# 14. Older systematic research also found many traceability techniques, but technology transfer remained difficult

## Evidence / observed practice

A 2018 systematic review of requirements-traceability technologies analyzed 114 papers (2006–2016), identified 10 major challenges, categorized techniques into multiple groups/subgroups, and assessed empirical evidence from 83 primary studies.

The existence of many techniques without a universally adopted solution reinforces that the hard part is not merely inventing another trace algorithm.

Source:

- Li & Cleland-Huang et al., `Requirements traceability technologies and technology transfer decision support: A systematic review`, Journal of Systems and Software 146, 2018
  - https://www.sciencedirect.com/science/article/pii/S0164121218301754

## Knowledge captured

Research abundance does not automatically imply industrial maturity.

**Adoption status:** not decided.

---

# 15. Industry evaluations of traceability research remain limited

## Evidence / observed practice

The 2024 pre-RS SLR reports that among published techniques it reviewed:

- many were evaluated only in one case study,
- many were prototypes,
- very few had multiple-case or extensive evaluation,
- there was a large research-to-industry gap,
- several case studies were not representative of real project scale.

The same paper notes that tools used successfully in industry tend either to be:

- highly adaptable/general-purpose tools integrated into many activities, or
- tools customized specifically for the project's existing toolchain.

Source:

- https://link.springer.com/article/10.1007/s00766-023-00412-z

## Knowledge captured

A technically elegant trace/compliance method should not be promoted into Common Rules based only on paper/prototype success. It needs validation inside the actual `web-project-guide` workflow.

**Adoption status:** candidate principle, not accepted.

---

# 16. Regulatory-compliance requirements engineering is fragmented across lifecycle and roles

## Evidence / observed practice

A 2024 systematic mapping study on Requirements Engineering for regulatory compliance of software-intensive products/services:

- retrieved 6,914 studies published from 2017–2023,
- selected 280 relevant primary studies,
- studied RE challenges and principles/practices for regulatory compliance,
- found only about 13.6% of studies considered both software engineers and legal experts,
- found only about 20.7% considered requirements engineering in relation to other process areas,
- found research concentrated in a relatively small set of regulation fields/domains.

The authors conclude that more work is needed on:

- stakeholder roles,
- relationships across lifecycle/process areas,
- domain-specific regulatory challenges.

Source:

- Kosenkov et al., `Systematic Mapping Study on Requirements Engineering for Regulatory Compliance of Software Systems`, 2024
  - https://arxiv.org/abs/2411.01940

## Knowledge captured

Compliance research itself suffers from siloing: requirements work, implementation, verification, legal interpretation, and operation are not always studied as one connected system.

This supports keeping lifecycle handoffs explicit rather than assuming a correct requirement automatically survives into implementation and validation.

**Adoption status:** not decided.

---

# 17. Formal-methods compliance frameworks show strong verification research but weak end-to-end maturity

## Evidence / observed practice

A 2024 systematic review of formal methods in business-process compliance reviewed decades of research and selected 46 primary frameworks.

It reports:

- strong agreement around verification/model-checking as a central technique,
- less agreement/maturity in earlier and later compliance phases,
- many frameworks remaining conceptual/prototype-level,
- limited attention to law changes and compliance professionals such as legal experts,
- need for stronger empirical studies and benchmarking.

Although this is business-process rather than software-development-process compliance, it is relevant as adjacent evidence on formal compliance automation.

Source:

- López & Hildebrandt, `Three Decades of Formal Methods in Business Process Compliance: A Systematic Literature Review`, 2024
  - https://arxiv.org/abs/2410.10906

## Knowledge captured

Verification engines can be mature relative to the surrounding pipeline while the harder problems remain:

- translating natural-language rules correctly,
- detecting applicability,
- updating rules after change,
- integrating expert judgment,
- preserving end-to-end evidence.

**Adoption status:** not decided.

---

# 18. Compliance monitoring still contains manual steps even after systems are instrumented

## Evidence / observed practice

A 2024/2025 systematic review of regulatory compliance monitoring across business processes reports that multiple compliance-monitoring techniques exist but various steps remain manual.

Source:

- Klessascheck & Pufahl, `Reviewing Uses of Regulatory Compliance Monitoring`
  - https://arxiv.org/abs/2501.10362

## Knowledge captured

Runtime/continuous compliance does not automatically mean end-to-end automated compliance.

**Adoption status:** not decided.

---

# 19. Requirements/decision artifacts themselves degrade over time

## Evidence / observed practice

A 2023 Journal of Systems and Software study developed a taxonomy of software-engineering assets using literature and industrial evidence.

It identifies assets beyond code, including:

- product requirements,
- architecture/design representations,
- development artifacts,
- verification/validation artifacts,
- operational data,
- environment/infrastructure,
- development process/ways of working,
- organizational assets.

The study frames reusable software artifacts as assets that can degrade over time.

Source:

- Zabardast et al., `A taxonomy of assets for the development of software-intensive products and services`, Journal of Systems and Software 202, 2023
  - https://doi.org/10.1016/j.jss.2023.111701

## Knowledge captured

`REQUIREMENTS.md`, routing metadata, test plans, compliance records, and trace links can all become stale just like code can become technically obsolete.

This reinforces the concept that evidence should have freshness/change dependencies rather than being trusted indefinitely.

**Adoption status:** not decided.

---

# 20. Machine-learning traceability is advancing, but training/evaluation data quality is a major limit

## Evidence / observed practice

A 2025 systematic literature review on ML-based automated software traceability reviewed 59 studies from 2014 through June 2024 and reported:

- rapidly increasing use of ML/deep learning,
- emerging LLM approaches with strong reported performance,
- around 170+ datasets across natural-language/programming-language artifacts,
- heavy use of classification and supervised learning,
- data scarcity,
- class imbalance,
- limited real-world data,
- missing true links in benchmark datasets,
- lack of standard benchmark datasets,
- limited exploration of LLMs.

Source:

- `Machine learning approaches for automated software traceability: A systematic literature review`, Journal of Systems and Software 230, 2025
  - https://www.sciencedirect.com/science/article/pii/S0164121225002043

## Knowledge captured

Automated traceability accuracy is constrained by the quality of the "ground truth" itself. If benchmark trace links are incomplete or wrong, a model can be trained/evaluated against incorrect truth.

This is highly relevant to AI-assisted rule applicability: a learned system trained on historical routing decisions could learn historical omissions.

**Adoption status:** strong caution, not accepted as a rule.

---

# 21. LLMs can improve trace recovery, but semantic gap and candidate selection remain hard

## Evidence / observed practice

Recent research explores LLM/RAG/GraphRAG approaches for requirements-to-code and general software-artifact trace recovery.

Examples include:

- LLM-assisted data augmentation for traceability,
- RAG-based generic trace-link recovery,
- graph-structured approaches combining semantic and structural information,
- prompt-based LLM link classification.

Reported experiments show significant improvements over some baselines, but papers continue to highlight:

- semantic gap between natural-language requirements and code,
- data scarcity,
- missing/incorrect benchmark links,
- candidate retrieval bottlenecks,
- project/context dependence.

Representative sources:

- `Machine learning approaches for automated software traceability: A systematic literature review`
  - https://www.sciencedirect.com/science/article/pii/S0164121225002043
- `Natural Language-Programming Language Software Traceability Link Recovery Needs More than Textual Similarity`
  - https://arxiv.org/abs/2509.05585
- `Requirements Traceability Link Recovery via Retrieval-Augmented Generation` replication package
  - https://zenodo.org/records/14779458
- LiSSA project/paper reference
  - https://github.com/ardoco/lissa

## Knowledge captured

LLMs are plausible components in an independent applicability/traceability checker, but current evidence does not justify treating an LLM-generated link set as authoritative ground truth.

A future design could potentially use AI for **candidate discovery** while requiring independent evidence or deterministic checks for high-confidence completion.

This is a hypothesis only.

**Adoption status:** not decided.

---

# 22. Auxiliary artifacts can materially affect trace-link quality

## Evidence / observed practice

A 2025 systematic mapping study on auxiliary artifacts in requirements traceability reviewed 110 studies and identified 49 types of auxiliary artifacts across 13 usage scenarios.

The research argues that trace quality depends not only on the source and target artifacts but also on other information used during the tracing process.

Source:

- Abdeen, Unterkalmsteiner, Wnuk, `Auxiliary Artifacts in Requirements Traceability: A Systematic Mapping Study`, 2025
  - https://arxiv.org/abs/2504.19658

## Knowledge captured

For rule applicability, potentially relevant auxiliary artifacts could include:

- repository metadata,
- deployment configuration,
- package/dependency files,
- project profile,
- changed-file set,
- issue/PR description,
- screenshots/runtime evidence,
- previous audit findings.

Whether/how to use them is undecided, but the academic literature suggests that ignoring contextual artifacts can reduce link quality.

**Adoption status:** not decided.

---

# 23. Trace links need versioning; stale links are a first-class unsolved problem

## Evidence / observed practice

The 2024 pre-RS SLR explicitly identifies inadequate version support for trace links as an unresolved issue and recommends better version support for trace information as projects evolve.

The research connects versioned trace information to:

- evaluation,
- preservation of experience,
- future decision-making,
- knowledge management.

Source:

- https://link.springer.com/article/10.1007/s00766-023-00412-z

## Knowledge captured

A trace/evidence link should ideally carry enough context to know **which project/rule/artifact version it proved**.

A passing check against an earlier revision should not silently satisfy a later changed requirement.

This agrees with NASA RMM lifecycle management, NIST continuous monitoring, and safety-case maintenance.

**Adoption status:** strong research candidate, not accepted.

---

# 24. Tool integration and cross-boundary collaboration are recurring barriers

## Evidence / observed practice

The 2023 practitioner study and 2024 traceability SLR report problems when trace information crosses:

- teams,
- tools,
- organizations,
- roles,
- different data formats.

A multi-case study across 15 industrial projects cited by the practitioner research found difficulties in:

1. collaboration across team/tool boundaries;
2. communicating traceability benefits;
3. maintaining trace links.

Sources:

- https://link.springer.com/article/10.1007/s00766-023-00408-9
- https://link.springer.com/article/10.1007/s00766-023-00412-z

## Knowledge captured

For a one-person AI-assisted workflow, the analogous boundary may be between:

- human conversation,
- ChatGPT reasoning,
- repository files,
- GitHub CI,
- deployment/runtime,
- external services.

Even with one human developer, information can still be fragmented across systems.

**Adoption status:** not decided.

---

# 25. Low perceived value causes traceability systems to decay even when they are technically available

## Evidence / observed practice

The practitioner research reports a long-running `traceability benefit problem`:

- if people cannot see tangible benefits, traceability is treated as overhead,
- management awareness and ROI perception influence adoption,
- practices are more mature when users/management see traceability as engineering infrastructure rather than mandatory paperwork.

The 2023 study found practitioners generally considered traceability important and believed costs did not outweigh benefits, but still requested better embedding in organizational practices, clearer roles, awareness, and managed processes.

Source:

- https://link.springer.com/article/10.1007/s00766-023-00408-9

## Knowledge captured

A future completeness/traceability system that produces large amounts of administrative work without directly helping implementation, debugging, review, or change impact is likely to be abandoned or bypassed.

This is important even in a one-person project because the "user" of the process is the same person who bears its friction.

**Adoption status:** candidate design constraint, not accepted.

---

# 26. Academic literature supports layered assurance more than a single perfect automation mechanism

## Cross-source synthesis

Across the reviewed academic literature:

- automated compliance checking is useful but input formalization remains difficult;
- no generic norm-agnostic solution is mature;
- traceability provides real engineering value;
- manual trace maintenance is expensive and becomes stale;
- automatic links can be wrong and therefore need trust/validation controls;
- tool and project context matter;
- full-lifecycle industrial validation is weak;
- Policy as Code is real but still not universally mature;
- ML/LLM traceability is improving but ground-truth and real-world data remain weak points;
- rule/process/version changes create staleness problems;
- human/organizational integration remains necessary.

## Finding / interpretation

The academic evidence does **not** point to a single technology that makes omission impossible.

It more strongly supports a layered approach where different mechanisms cover different failure modes, for example:

```text
Structured applicability discovery
+
Trace/evidence records
+
Automated deterministic checks where possible
+
AI-assisted candidate discovery where useful
+
Independent/human review for ambiguous or high-risk decisions
+
Version/change invalidation
+
Periodic audit of the process itself
```

This synthesis is a research interpretation only; no architecture has been adopted.

**Adoption status:** candidate synthesis, not accepted.

---

# 27. Important limitations of this academic pass

- Systematic reviews summarize heterogeneous studies; they do not prove one implementation will work for `web-project-guide`.
- Some evidence is from regulated/safety-critical or enterprise settings with different cost structures.
- Business-process compliance studies are adjacent evidence, not direct software-development evidence.
- The 2026 PaC empirical study is very recent and its journal issue metadata is future-dated relative to this research date; treat it cautiously.
- Many automated traceability papers use curated/public datasets rather than live evolving repositories.
- Reported ML/LLM metrics can hide false-negative failure modes that matter disproportionately for zero-miss goals.
- Traceability benefit depends heavily on whether links remain current.
- Academic evidence repeatedly reports limited industrial validation; prototype performance should not be mistaken for production reliability.

---

# Current Academic Working Takeaways

These are **research takeaways, not Common Rules**:

1. Compliance automation needs both a rule model and an accurate project/process-state model.
2. Automation improves repeatability but moves risk into formalization, input quality, and checker correctness.
3. There is no mature universal norm-agnostic compliance language/engine.
4. Requirements traceability has demonstrated engineering value, especially for maintenance/change work.
5. Traceability maintenance/staleness is one of the largest real-world barriers.
6. Correct traces created as a by-product of normal work are an ideal that research has not fully achieved.
7. Trace strategies need to scale to context, risk, project size, longevity, and intended use.
8. Incorrect automatic links create a trust problem; false positives and false negatives both matter.
9. Full lifecycle and industrially validated traceability solutions remain limited.
10. Policy as Code is useful but not equivalent to end-to-end automated compliance.
11. Versioning and invalidation of old trace/evidence links are important unsolved/practical problems.
12. Human/organizational/tool-boundary issues persist even when automation exists.
13. ML/LLM methods can assist trace recovery but should not be assumed to provide authoritative ground truth.
14. Historical training/evaluation data can itself contain missing true links, creating a risk of learning past omissions.
15. Academic evidence currently supports layered failure barriers more strongly than belief in one perfect router/checker.

---

# Open Questions for Later Comparison / Design

- What is the smallest trace/evidence model that provides meaningful omission protection without becoming maintenance debt?
- Which Common Rules can be converted into deterministic machine checks, and which fundamentally require contextual judgment?
- Could a rule-universe comparison independently audit router output without duplicating the router's exact logic?
- Should AI-generated applicability candidates optimize for recall and then be filtered by deterministic/human review?
- How can evidence automatically inherit invalidation when the depended-on file, runtime, deployment, requirement, or guide version changes?
- How should false positives be controlled so that high-recall checking does not create warning fatigue?
- Can trace records be generated from existing GitHub/CI artifacts as a by-product instead of manually maintained?
- What should count as ground truth when training/evaluating an AI applicability checker, given that historical decisions may themselves contain omissions?
- How can the system audit that the enforcement/checking path itself was executed?
- Which research findings remain valid for one-person AI-assisted Web/Electron projects after we later apply cost/complexity filtering?
