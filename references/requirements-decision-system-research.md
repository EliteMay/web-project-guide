# Phase 1 — Requirements Decision System Research

## Status

- Research phase: completed for Common decision-model promotion
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Working branch: `guide/phase-1-19-integration`
- Primary normative owner: `docs/01-requirements.md`
- General research method owner: `docs/20-evidence-first-research.md`

This file is **non-normative research evidence**. Current behavior is defined by the Owner Docs, not by this research summary.

## Research Question

How should a small-team / individual Web, Web App, Electron, or Browser Game project turn an ambiguous request into a necessary, scoped, changeable, and observably complete Requirement without creating a heavyweight approval process or asking the User questions that Current Repository / Evidence can already answer?

## Core Evidence

### E-01 — Need / outcome should be separable from a proposed implementation

NASA's Systems Engineering guidance says good Requirements should state what is needed rather than unnecessarily prescribing how to provide it, asks why the Requirement is needed, distinguishes needs from wants, and expects traceability to goals / objectives / higher-level needs.

**Implication:** a named feature can be treated as a solution candidate until the underlying problem / outcome is clear enough to decide whether that feature is actually required.

Evidence:

- NASA, *How to Write a Good Requirement*: https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/
- NASA Software Engineering Handbook, *Software Requirements*: https://swehb.nasa.gov/spaces/SWEHBVB/pages/32604503/SWE-050%2B-%2BSoftware%2BRequirements

### E-02 — Requirements should be necessary, manageable, and verifiable

NASA guidance emphasizes necessary / measurable / testable Requirements, refinement of the initial set, removal of unnecessary / duplicate items, keeping must-haves, and dropping some nice-to-haves. NASA's Requirement quality checklist also asks whether each Requirement is needed and whether a method exists to verify it.

**Implication:** Common scope should permit a real `Reject` state and should not define MVP as "all useful ideas with lower priority". Completion criteria should be observable.

Evidence:

- NASA, *How to Write a Good Requirement*: https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/
- NASA Software Engineering Handbook, *Software Requirements Analysis*: https://swehb.nasa.gov/spaces/7150/pages/16450593/SWE-051%2B-%2BSoftware%2BRequirements%2BAnalysis

### E-03 — Acceptance / completion criteria should be defined before declaring the work acceptable

NASA Software Engineering guidance treats acceptance criteria as conditions the software must satisfy for acceptance and connects them to Verification / Validation activities and measurable performance / correctness conditions.

**Implication:** Requirement completion should trace to evidence, method, and pass/fail criteria rather than vague statements such as `works well`.

Evidence:

- NASA Software Engineering Handbook, *Acceptance Criteria*: https://swehb.nasa.gov/spaces/7150/pages/16450634/SWE-034%2B-%2BAcceptance%2BCriteria

### E-04 — Requirement change should be impact-assessed before implementation when the impact is material

NASA Requirements change guidance calls for analyzing proposed changes for technical, schedule, cost, stakeholder, test, safety / reliability, interface, and other downstream impacts, and notes traceability as an important aid.

**Implication:** change classification should expose whether the current Contract is merely clarified, extended, replaced, removed, or broken, followed by proportionate impact analysis rather than treating every text edit equally.

Evidence:

- NASA Software Engineering Handbook, *Manage Requirements Changes*: https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695435/SWE-053%2B-%2BManage%2BRequirements%2BChanges

### E-05 — Prototype the uncertainty, not the whole product

GOV.UK Service Manual guidance uses prototypes to explore and test ideas before committing to production, recommends choosing the prototype type that fits the current question, and explicitly notes that prototype code need not meet production standards. Its Alpha guidance says to focus on the riskiest assumptions and do the minimum needed to test them.

**Implication:** Prototype / Technical Spike should be conditional on meaningful unresolved uncertainty, use the cheapest faithful artifact, and have a stop condition. Prototype success is not production readiness.

Evidence:

- GOV.UK Service Manual, *Making prototypes*: https://www.gov.uk/service-manual/design/making-prototypes
- GOV.UK Service Manual, *How the alpha phase works*: https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works

### E-06 — MVP is a learning / outcome boundary, not simply the fewest features

Eric Ries defines the MVP around collecting validated learning with the least effort and explicitly warns that MVP is not simply about creating a minimal product.

**Implication:** an MVP should be the smallest end-to-end scope that can deliver or truthfully test the Core Outcome, including foundations required for the evidence to be valid.

Evidence:

- Lean Startup Co., Eric Ries, *What Is an MVP?*: https://leanstartup.co/resources/articles/what-is-an-mvp/

### E-07 — Hypothesis / test / metric / success condition is a useful bounded experiment pattern

Strategyzer's Test Card describes a compact sequence of hypothesis, test, metric, and explicit success condition. This is practitioner evidence rather than a universal standard, but it aligns with the Government prototype guidance and observable-completion principle.

**Implication:** before a Project-specific prototype, define the decision question, observable signal, and stop / pass-fail condition so the prototype cannot expand indefinitely.

Evidence:

- Strategyzer, *Good Ideas Are Bad For Innovators*: https://www.strategyzer.com/library/good-ideas-are-bad-for-innovators

## Evidence Map / Promotion Decisions

### Strong enough for Common Rule

- Problem / outcome should remain distinguishable from a solution candidate when the distinction affects the decision.
- Scope must allow exclusion of unnecessary features; `Now / Later / Reject` is a lightweight Common classification, not a claimed industry standard.
- MVP should preserve the smallest valid end-to-end outcome / learning boundary rather than optimize for raw feature count.
- Important unresolved Project-specific uncertainty should move from Research to a bounded cheap test / prototype rather than endless discussion.
- Material Requirement changes need proportionate impact analysis and Current Contract cleanup.
- Completion must be observable and tied to an appropriate verification method.

### Context-dependent / SHOULD, not universal ceremony

- Numeric prioritization frameworks.
- Requirement IDs / traceability matrices.
- Prototype fidelity and whether a prototype is needed at all.
- Exact amount of acceptance criteria / test evidence.
- User test vs technical spike vs data prototype vs direct implementation.

### Rejected as Common mandatory rules

- Fixed RICE / MoSCoW / Kano scoring for every Project.
- Requiring a prototype for every feature.
- Treating every `Later` item as a commitment to implement it eventually.
- Treating MVP as the minimum number of screens / functions.
- Requiring heavyweight bidirectional traceability matrices for every small individual Project.
- Increasing User-question count as the primary way to improve Requirements quality.

## Resulting Decision Model

```text
Raw Request
↓
Problem / Context
↓
Desired Outcome
↓
Solution Candidate
↓
Now / Later / Reject
↓
MVP Boundary
↓
Research / Cheap Test / User Decision only when needed
↓
Confirmed Current Requirement
↓
Change Classification / Impact when revised
↓
Observable Evidence / Verification
↓
Current Contract updated
```

The promoted model intentionally reuses the existing Agent Autonomy, Evidence-first Research, Requirements Persistence, and domain-specific Testing gates rather than creating a second approval workflow.
