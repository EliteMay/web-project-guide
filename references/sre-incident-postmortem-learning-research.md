# SRE / Incident / Postmortem Learning Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**. It intentionally records mechanisms broadly, including organizational practices, tooling, cultural mechanisms, metrics, review patterns, and currently impractical ideas.

## Research Question

How do mature SRE and incident-management organizations turn failures, near-misses, operational surprises, and ineffective controls into durable improvements rather than one-off fixes?

The focus is not only incident response. It includes postmortem triggers, ownership, review, action-item closure, knowledge sharing, trend analysis, readiness checks, process self-evaluation, and prevention of recurrence across other systems.

---

# 1. Google treats incident response as an explicit operating system

## Evidence / observed practice

Google's Incident Management Guide describes IMAG, based on the Incident Command System (ICS). It separates responsibilities into roles such as:

- Incident Commander (IC)
- Communications Lead (CL)
- Operations Lead (OL)

The IC coordinates the overall response, the CL handles stakeholder communication, and the OL focuses on mitigation. Roles are selected by incident context and expertise rather than necessarily following the normal reporting hierarchy. Tasks may be delegated.

Source:

- Google SRE, Incident Management Guide
  - https://sre.google/resources/practices-and-processes/incident-management-guide/

## Knowledge captured

A response process can be designed so that one person is not simultaneously expected to diagnose, fix, communicate, coordinate, and remember every requirement. Separation of responsibilities is itself a reliability mechanism.

This does not directly map to a solo project, but the existence of role separation remains relevant because multiple independent mental modes or automated agents/checks could emulate some of the benefits later.

**Adoption status:** not decided.

---

# 2. Postmortem triggers are defined before the incident

## Evidence / observed practice

Google states that postmortem criteria should be defined before incidents so teams do not decide ad hoc whether an event deserves learning work.

Common triggers include:

- user-visible downtime or degradation beyond a threshold,
- any data loss,
- on-call intervention such as rollback or traffic rerouting,
- resolution time above a threshold,
- monitoring failure/manual discovery,
- stakeholder request.

Source:

- Google SRE Book, Postmortem Culture: Learning from Failure
  - https://sre.google/sre-book/postmortem-culture/

## Knowledge captured

An incident worth systematic learning does not need to be catastrophic. Failure of the detection mechanism itself can trigger a postmortem.

For rule-application reliability, a plausible analogue is that a material rule miss, stale project metadata, false completion claim, validator escape, or discovery of a blind spot could qualify as an improvement incident even when the final user-facing result was repaired quickly.

**Adoption status:** candidate concept, not accepted.

---

# 3. Blamelessness is a mechanism for evidence quality, not only culture

## Evidence / observed practice

Google's postmortem philosophy assumes people acted with good intentions and with the information available to them at the time. The investigation focuses on contributing causes, incomplete/misleading information, system weaknesses, process weaknesses, and training/tooling conditions.

The stated reason is practical: blame discourages people from surfacing problems and therefore reduces the organization's ability to observe and learn from failures.

Atlassian similarly describes blameless postmortems as focusing on circumstances, contributing factors, and system improvement rather than punishment.

Sources:

- Google SRE Book, Postmortem Culture
  - https://sre.google/sre-book/postmortem-culture/
- Atlassian, How to run a blameless postmortem
  - https://www.atlassian.com/incident-management/postmortem/blameless

## Knowledge captured

A learning system can become less reliable if it incentivizes hiding mistakes, minimizing severity, or arguing that an incident was a one-off human error.

For an AI-assisted development guide, the analogous failure would be saying “the AI forgot” and stopping there. A more useful investigation asks which rule, router, evidence source, completion gate, change-detection mechanism, or process design made that omission possible.

**Adoption status:** strong research candidate, not accepted.

---

# 4. Immediate repair and systemic corrective action are separate

## Evidence / observed practice

Google's postmortem model documents:

- impact,
- actions used to mitigate/resolve the incident,
- contributing/root causes,
- follow-up actions intended to reduce recurrence or impact.

AWS Well-Architected likewise distinguishes immediate incident handling from post-incident analysis and preventative action.

AWS explicitly recommends asking why existing testing did not find the issue and adding/adjusting tests when appropriate.

Sources:

- Google SRE Book, Postmortem Culture
  - https://sre.google/sre-book/postmortem-culture/
- AWS Well-Architected, REL12-BP02 Perform post-incident analysis
  - https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_testing_resiliency_rca_resiliency.html

## Knowledge captured

The loop is not closed by correcting the immediate artifact.

A rule miss can therefore produce at least two categories of work:

1. correction of the concrete project defect,
2. corrective action against the mechanism that allowed the miss.

This independently reinforces the same distinction observed in ISO quality-management material.

**Adoption status:** strong research candidate, not accepted.

---

# 5. A postmortem is itself reviewed for completeness and quality

## Evidence / observed practice

Google describes formal review of postmortem drafts by senior engineers. Review questions include whether:

- key incident data was captured,
- impact assessment is complete,
- analysis is deep enough,
- the action plan is appropriate,
- resulting fixes have appropriate priority,
- outcomes were shared with relevant stakeholders.

Google explicitly describes unreviewed postmortems as effectively failing to deliver their value and encourages regular review sessions.

Atlassian tracks postmortems through Jira work items and describes approval/review by engineering leadership for conclusions and mitigations.

Sources:

- Google SRE Book, Postmortem Culture
  - https://sre.google/sre-book/postmortem-culture/
- Atlassian, Incident postmortems
  - https://www.atlassian.com/incident-management/handbook/postmortems

## Knowledge captured

The improvement record is another artifact that can be incomplete, shallow, or wrong. Mature processes therefore review the incident analysis itself.

This mirrors NASA's independent assurance and the Safety-Critical pattern of checking the checker.

**Adoption status:** candidate, not accepted.

---

# 6. Action items require ownership and closure tracking

## Evidence / observed practice

Google's SRE Workbook notes that action items without clear owners are less likely to be completed and recommends a single owner with collaborators.

Google's incident-management guidance states that once completion SLOs for action items are agreed with stakeholders, action items enter the team's backlog and are prioritized against other work using reliability needs.

Google's postmortem tooling files action items into a centralized bug tracker and monitors closure so follow-up work does not disappear.

Atlassian similarly tracks postmortems in Jira.

Sources:

- Google SRE Workbook, Postmortem Culture
  - https://sre.google/workbook/postmortem-culture/
- Google SRE, Incident Management Guide
  - https://sre.google/resources/practices-and-processes/incident-management-guide/
- Atlassian, Incident postmortems
  - https://www.atlassian.com/incident-management/handbook/postmortems

## Knowledge captured

A lesson without an owner, state, and closure condition is not a reliable corrective mechanism.

For guide improvement, this suggests a possible future distinction between:

- lesson captured,
- corrective action created,
- action implemented,
- action validated,
- action closed.

No adoption decision has been made.

---

# 7. Repeated incidents are treated as evidence that action quality may be poor

## Evidence / observed practice

Google's SRE Workbook explicitly recommends deeper investigation when incidents resemble previous failures. Questions include whether:

- action items take too long to close,
- feature work is being prioritized over reliability fixes,
- the right action items were captured,
- the service actually needs deeper refactoring,
- teams are applying temporary band-aids to systemic problems.

Source:

- Google SRE Workbook, Postmortem Culture
  - https://sre.google/workbook/postmortem-culture/

## Knowledge captured

Recurrence is not merely “another incident.” It is evidence that the previous corrective action, prioritization, or causal model may have been insufficient.

For rule-application reliability, a second miss in the same class should potentially increase scrutiny of the previous fix rather than simply generate another identical checklist item.

**Adoption status:** candidate, not accepted.

---

# 8. Knowledge is shared broadly and stored for long-term reuse

## Evidence / observed practice

Google encourages wide internal sharing of postmortems, cross-team reviews, reading clubs, outage reports, and training exercises based on previous incidents.

Google's Requiem system stores thousands of postmortems, extracts metadata, and supports search, analysis, and reporting.

Google also describes machine-readable metadata/tags in mature postmortem cultures.

Atlassian recommends inviting cross-functional participants such as security, privacy, legal, risk, or compliance when their perspective may reveal additional contributing factors.

Sources:

- Google SRE Workbook, Postmortem Culture
  - https://sre.google/workbook/postmortem-culture/
- Google SRE Book, Postmortem Culture
  - https://sre.google/sre-book/postmortem-culture/
- Atlassian, How to run a blameless postmortem
  - https://www.atlassian.com/incident-management/postmortem/blameless

## Knowledge captured

The value of incident knowledge increases when it is discoverable outside the team that experienced the failure.

A private note that no later workflow consults does not create organizational learning.

**Adoption status:** candidate, not accepted.

---

# 9. Structured postmortem data enables trend analysis across incidents

## Evidence / observed practice

Google uses a standard postmortem template and consistent metadata to aggregate thousands of incidents and identify recurring trigger/root-cause classes.

Published sample analysis from 2010–2017 grouped incident triggers such as binary pushes, configuration pushes, user behavior changes, pipelines, providers, performance decay, capacity, and hardware, and also categorized contributing root-cause classes.

Google incident tooling analyzes trends such as:

- postmortem count,
- mean duration,
- detection time,
- resolution time,
- blast radius,
- organizational distribution.

Source:

- Google SRE Workbook, Results of Postmortem Analysis
  - https://sre.google/workbook/postmortem-analysis/
- Google SRE Workbook, Postmortem Culture
  - https://sre.google/workbook/postmortem-culture/

## Knowledge captured

A single failure report answers “what happened here.” Structured aggregation can answer “what repeatedly breaks our process.”

This resembles NASA's cross-project review of Requirements Mapping Matrices and Meta's aggregated compliance-task analysis.

**Adoption status:** strong research candidate, not accepted.

---

# 10. The postmortem process itself is continuously reviewed

## Evidence / observed practice

Google describes a cross-functional group that meets periodically to review the postmortem process and template. Google also surveys teams about whether the process creates too much toil, what practices are useful, and what tooling should be developed.

This means postmortems are not only used to improve systems; the postmortem mechanism is itself subject to feedback and redesign.

Source:

- Google SRE Workbook, Postmortem Culture
  - https://sre.google/workbook/postmortem-culture/

## Knowledge captured

A corrective-action process can become ceremonial, too costly, too shallow, or noisy. It therefore needs its own effectiveness review.

This is directly analogous to AWS evaluating whether its readiness review actually would have prevented later incidents.

**Adoption status:** strong research candidate, not accepted.

---

# 11. AWS converts incident lessons into pre-incident readiness controls

## Evidence / observed practice

AWS describes a closed-loop mechanism called Correction of Errors (COE) for significant events, including events with no customer impact.

COE produces workload-specific action items. AWS then uses Operational Readiness Reviews (ORRs) to propagate lessons beyond the workload where the incident occurred.

The ORR program distills lessons from operational incidents into curated checklist questions and best-practice guidance. Different templates can be created for different workload/context outcomes. Reviews are applied across the lifecycle from inception through post-release operations.

Source:

- AWS Operational Readiness Reviews
  - https://docs.aws.amazon.com/wellarchitected/latest/operational-readiness-reviews/wa-operational-readiness-reviews.html

## Knowledge captured

This is an important cross-system feedback loop:

```text
Incident
→ local corrective action
→ identify generalizable failure pattern
→ convert into readiness question / guidance
→ apply to other systems before failure
```

This is very close to converting project-specific failures into reusable guide checks without automatically turning every local defect into a universal normative rule.

**Adoption status:** strong research candidate, not accepted.

---

# 12. AWS readiness questions come from incidents, near-misses, and feared failure modes

## Evidence / observed practice

AWS recommends generating ORR questions from three categories:

- real incidents,
- near-misses,
- failure modes that have not yet occurred but are considered plausible/important.

ORR questions may address architecture, release quality, event management, people, process, technology, dependencies, recovery, blast radius, detection, escalation, and other domains.

Source:

- AWS Operational Readiness Reviews, The ORR Tool
  - https://docs.aws.amazon.com/wellarchitected/latest/operational-readiness-reviews/the-orr-tool.html

## Knowledge captured

A mature prevention system does not wait for every failure to happen once before adding defenses.

Near-misses and credible failure modes are explicit evidence sources.

For guide reliability, a near miss could include catching a missing rule before merge/release, discovering stale metadata during manual review, or a validator warning that would have been a real omission under slightly different conditions.

**Adoption status:** candidate, not accepted.

---

# 13. Readiness review results record residual risk and action items

## Evidence / observed practice

AWS describes tooling around ORR checklists that allows teams to:

- perform self-service reviews,
- record results,
- understand residual risk,
- create and track action items into backlog/ticketing systems.

High-criticality findings can be escalated into launch go/no-go decisions.

Sources:

- AWS Operational Readiness Reviews, The ORR Tool
  - https://docs.aws.amazon.com/wellarchitected/latest/operational-readiness-reviews/the-orr-tool.html
- AWS Operational Readiness Reviews, Inspect the Process
  - https://docs.aws.amazon.com/wellarchitected/latest/operational-readiness-reviews/inspect-the-process.html

## Knowledge captured

A readiness checklist is not necessarily a boolean pass/fail form. It can expose unresolved risk and leave explicit tracked work rather than silently treating unknowns as compliant.

This aligns with NASA RMM states, ISO Statement of Applicability concepts, NIST POA&M, and policy-report states.

**Adoption status:** strong cross-source pattern, not accepted.

---

# 14. AWS inspects whether the readiness mechanism actually prevented incidents

## Evidence / observed practice

AWS states that its COE process asks questions such as:

- when the last ORR was performed,
- whether ORR recommendations would have reduced or avoided the event.

This evidence is then used to decide whether ORR questions or the ORR mechanism itself should change.

Source:

- AWS Operational Readiness Reviews, Inspect the Process
  - https://docs.aws.amazon.com/wellarchitected/latest/operational-readiness-reviews/inspect-the-process.html

## Knowledge captured

This is a direct effectiveness test of the preventive control:

```text
Preventive mechanism exists
→ later failure occurs
→ ask whether mechanism should have caught it
→ if yes but it did not, inspect adoption/execution
→ if no, inspect coverage/question quality
→ revise mechanism
```

For the current research question, this is one of the clearest real-world examples of distinguishing execution failure from rule/checklist design failure.

**Adoption status:** very strong research candidate, not accepted.

---

# 15. AWS deliberately limits readiness questions to keep the mechanism usable

## Evidence / observed practice

AWS notes that ORR is most effective when focused on high-priority risks and explicitly warns against overloading the checklist with medium/low risks that reduce agility and adoption.

The guidance recommends adding questions because there is meaningful evidence or concern, not simply because more questions appear safer.

Source:

- AWS Operational Readiness Reviews, The ORR Tool
  - https://docs.aws.amazon.com/wellarchitected/latest/operational-readiness-reviews/the-orr-tool.html

## Knowledge captured

This is an important counterweight to high-recall research capture.

Research can preserve everything; the eventual operational checklist may need strong prioritization so signal is not lost in noise. This matches Meta's experience with excessive detectors and the guide's existing Rule Budget principle.

**Adoption status:** research observation only; filtering/adoption deliberately deferred.

---

# 16. Near-misses count as learning events

## Evidence / observed practice

AWS explicitly states that an incident need not be an outage and may include a near-miss or unexpected system behavior even when business function continued.

Source:

- AWS Well-Architected, REL12-BP02 Perform post-incident analysis
  - https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_testing_resiliency_rca_resiliency.html

## Knowledge captured

Waiting for visible harm creates a weak learning system. Catching a rule omission before it reaches users can still justify recording and investigating the mechanism that allowed it.

**Adoption status:** strong candidate, not accepted.

---

# 17. “Where did we get lucky?” exposes missing defenses

## Evidence / observed practice

Atlassian's postmortem meeting guidance explicitly asks:

- what went well,
- what could have gone better,
- where did we get lucky.

Source:

- Atlassian, Incident postmortems
  - https://www.atlassian.com/incident-management/handbook/postmortems

## Knowledge captured

A system can produce a successful outcome despite weak controls.

Luck is therefore a form of hidden risk: the absence of failure is not proof that the process was reliable.

For development completion, “we happened to notice the missing URL manually before release” should not be treated as evidence that the routing/checking system worked.

**Adoption status:** strong research candidate, not accepted.

---

# 18. Mature incident analysis is moving beyond simplistic single-root-cause models

## Evidence / observed practice

Google has publicly described exploration of STAMP/STPA/CAST approaches for reliability and safety analysis.

- STPA is forward-looking and aims to identify systemic risks, including risks not already being actively sought.
- CAST is retrospective and extends incident/postmortem causal analysis using a systems-theoretic model.

Source:

- Google SRE, STAMP at Google
  - https://sre.google/resources/practices-and-processes/stpa/

## Knowledge captured

Complex failures may not have a single useful root cause. Multiple controls, assumptions, interfaces, incentives, timing conditions, or missing feedback loops can combine.

For rule misses, “router forgot owner 08” may be too shallow if the actual system also lacked reverse validation, metadata invalidation, completion evidence, and a control that ensured the router was invoked.

**Adoption status:** not decided.

---

# 19. Incident metrics can mislead if used without statistical context

## Evidence / observed practice

Google SRE has published guidance showing that simple statistics such as mean time to recovery/mitigation can be poorly suited to trend analysis or process-change evaluation in some incident datasets. They recommend more careful statistical treatment rather than assuming a single aggregate metric proves improvement.

Source:

- Google SRE, Incident Metrics in SRE
  - https://sre.google/resources/practices-and-processes/incident-metrics-in-sre/

## Knowledge captured

A future rule-reliability program should not automatically equate “fewer incidents” with “better system” without accounting for reporting behavior, project volume, severity, detection improvements, and changing scope.

More detection can temporarily increase incident counts while making the system safer.

**Adoption status:** not decided.

---

# 20. Postmortem tooling automates collection, not judgment

## Evidence / observed practice

Google describes automation that prepopulates postmortems with incident roles, timelines, affected services, severity, detection mechanisms, logs, and other metadata. It also automates storage, indexing, action-item creation, and analysis.

However, Google explicitly notes that not every step of postmortem writing can be automated; human effort remains especially important in causal analysis and action planning.

Recent Google SRE material also describes AI-assisted tooling that can create bugs, assign owners, and export postmortems, while relying on structured production-agent interfaces and curated skills.

Sources:

- Google SRE Workbook, Postmortem Culture
  - https://sre.google/workbook/postmortem-culture/
- Google SRE, AI Engineering for Reliable Operations
  - https://sre.google/resources/practices-and-processes/ai-engineering-reliable-operations/

## Knowledge captured

Automation is strongest for collection, routing, linking, state tracking, and repetitive transformation. Causal reasoning and the quality of corrective action remain separate problems.

This is consistent with the academic compliance/traceability literature reviewed elsewhere in this repository.

**Adoption status:** not decided.

---

# Cross-source synthesis — research only

Across Google SRE, AWS, and Atlassian, the incident-learning loop repeatedly looks like:

```text
Unexpected event / near miss / rule miss
↓
Immediate mitigation
↓
Predefined trigger determines whether deeper analysis is required
↓
Blameless reconstruction of timeline / impact / contributing conditions
↓
Independent or senior review of analysis quality
↓
Corrective actions with owner / priority / closure state
↓
Tracked implementation and validation
↓
Postmortem stored and shared
↓
Structured aggregation / trend analysis
↓
Generalizable lessons become readiness checks / guidance / tests
↓
Later incidents test whether those controls actually worked
↓
Incident process / checklist / tooling is itself revised
```

Important recurring ideas:

- repair is not the same as prevention,
- detection failure is itself an incident signal,
- near-misses matter,
- ownership and closure tracking matter,
- postmortems need review,
- repeat incidents question the previous corrective action,
- incident knowledge should become pre-incident controls where justified,
- preventive controls should later be inspected for effectiveness,
- successful outcomes can be lucky rather than reliable,
- too many controls/checks can reduce effectiveness through noise and burden,
- systemic causal analysis is often stronger than a single-root-cause story,
- automation supports but does not remove judgment,
- metrics must be interpreted carefully.

**No Common Guide rule is adopted by this file.**

---

# Possible future implications for `web-project-guide` — not adopted

These are hypotheses to preserve for later comparison, not decisions:

1. A material rule miss or false completion claim could be treated as an explicit process incident.
2. Incident triggers could be predefined rather than decided ad hoc.
3. Every process incident could separate immediate correction from systemic corrective action.
4. Corrective actions could have owner/state/evidence/closure instead of living only in prose.
5. Near-misses could be recorded when a manual reviewer catches something the process should have caught.
6. “Where did we get lucky?” could become a review question.
7. Repeated rule misses could reopen or challenge previous corrective actions.
8. Project-specific failures could be promoted into reusable readiness questions without automatically becoming global normative rules.
9. Later failures could explicitly ask whether existing guide rules/checklists/validators should have prevented them.
10. If an existing control should have caught the failure, investigate invocation/adoption/execution; if not, investigate coverage/design.
11. A rule-miss database with structured metadata could enable trend analysis.
12. The incident-analysis mechanism itself could be periodically audited for burden, noise, closure rate, recurrence, and usefulness.
13. Automated extraction of repository state could prepopulate incident evidence, leaving causal analysis for higher-level reasoning.
14. Completion success should not be treated as proof of process reliability when success depended on luck/manual discovery.
15. Future metrics should avoid simplistic counts and should distinguish severity, exposure, detection rate, project volume, and reporting behavior.

---

# Open questions

- What specific event types should count as a `web-project-guide` process incident?
- How should a solo workflow emulate independent postmortem review without pretending independence exists?
- Can GitHub Issues/Projects provide sufficient action-item closure tracking without creating excessive administration?
- What metadata is useful enough for trend analysis without becoming a burden?
- How should repeated incidents affect confidence in an existing rule/router/validator?
- How can project-specific lessons become readiness checks without uncontrolled Common Rule growth?
- How should we distinguish a rule defect, routing defect, enforcement defect, stale-evidence defect, and execution defect?
- Can “would the current Guide have prevented this?” become a routine counterfactual test after failures?
- What metrics would reflect rule-application reliability without rewarding under-reporting?
- How should near-misses be retained and sampled?

---

# Sources reviewed

## Core

- Google SRE, Incident Management Guide
  - https://sre.google/resources/practices-and-processes/incident-management-guide/
- Google SRE Book, Postmortem Culture: Learning from Failure
  - https://sre.google/sre-book/postmortem-culture/
- Google SRE Workbook, Postmortem Culture: Learning from Failure
  - https://sre.google/workbook/postmortem-culture/
- Google SRE Workbook, Results of Postmortem Analysis
  - https://sre.google/workbook/postmortem-analysis/
- Google SRE, STAMP at Google
  - https://sre.google/resources/practices-and-processes/stpa/
- Google SRE, Incident Metrics in SRE
  - https://sre.google/resources/practices-and-processes/incident-metrics-in-sre/
- AWS Operational Readiness Reviews
  - https://docs.aws.amazon.com/wellarchitected/latest/operational-readiness-reviews/wa-operational-readiness-reviews.html
- AWS ORR, The ORR Tool
  - https://docs.aws.amazon.com/wellarchitected/latest/operational-readiness-reviews/the-orr-tool.html
- AWS ORR, Inspect the Process
  - https://docs.aws.amazon.com/wellarchitected/latest/operational-readiness-reviews/inspect-the-process.html
- AWS Well-Architected, REL12-BP02 Perform post-incident analysis
  - https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_testing_resiliency_rca_resiliency.html
- Atlassian, Incident postmortems
  - https://www.atlassian.com/incident-management/handbook/postmortems
- Atlassian, How to run a blameless postmortem
  - https://www.atlassian.com/incident-management/postmortem/blameless

## Additional surfaced material preserved for later deep-read

- AWS Operational Excellence Pillar, learn/share/improve
- AWS ORR example question catalog
- Google SRE, Anatomy of an Incident
- Google SRE AI-assisted reliable operations material

