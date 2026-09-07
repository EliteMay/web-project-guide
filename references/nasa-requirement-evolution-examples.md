# NASA Requirement Evolution Examples

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**.

## Research Question

Does NASA improve NPR 7150.2 by only adding requirements, or does it also remove, narrow, simplify, split, or reshape requirements over time?

The reviewed requirement histories show that NASA does all of these.

---

# 1. Requirements can be removed from the wording

## SWE-050 — Software Requirements

History shows several substantive rewrites.

- Revision A tied software requirements explicitly to analysis of customer/stakeholder requirements and operational concepts.
- Revision B descoped that source-specific language and added software quality requirements.
- Revision C added explicit coverage for COTS/GOTS/MOTS/OSS/reused components **and removed the explicit software quality requirement from this SWE**.

Source:

- https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695421/SWE-050%2B-%2BSoftware%2BRequirements

### Knowledge captured

NASA is willing to remove part of a requirement rather than accumulating every historical concern into one ever-growing statement. A responsibility can be relocated, reframed, or handled elsewhere rather than permanently duplicated.

---

# 2. Applicability scope can be narrowed

## SWE-092 — Using Measurement Data

History shows:

- Revision B applied to Class A, B, C **and safety-critical** software projects.
- Revision C removed the extra `safety-critical` applicability wording, leaving Class A/B/C.

Source:

- https://swehb.nasa.gov/x/NgIfBg

### Knowledge captured

NASA can reduce applicability when the earlier scope is no longer considered the right formulation. Improvement does not always mean making a rule apply to more projects.

---

# 3. Verification responsibility can be removed from one specific requirement

## SWE-961 — Coding Standards

History shows:

- Revision B required the project manager to select, adhere to, **and verify** coding methods/standards/criteria.
- Revision C removed the explicit `verify` requirement from this SWE.
- Revision D added `define` while keeping `select` and `adhere`.

Source:

- https://swehb.nasa.gov/display/SITE/SWE-961%2BCoding%2BStandards%2B-%2BRequirements

### Knowledge captured

A requirement can be simplified by removing an obligation from that specific normative statement even when verification still exists elsewhere in the overall engineering system.

This is relevant to avoiding duplicated normative ownership.

---

# 4. Redundant wording can be removed

## SWE-034 — Acceptance Criteria

History shows:

- Earlier wording required defining/documenting `acceptance criteria and conditions`.
- Revision C removed `conditions`, leaving `acceptance criteria`.

Source:

- https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695413/SWE-034%2B-%2BAcceptance%2BCriteria

## SWE-062 — Unit Test

History shows:

- Earlier wording required unit testing `per the plans for software testing`.
- Revision C removed that phrase and retained the core obligation: the project manager shall unit test the software code.

Source:

- https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695446/SWE-062%2B-%2BUnit%2BTest

### Knowledge captured

NASA sometimes simplifies normative statements by retaining the core obligation and removing wording that is redundant, unnecessarily prescriptive, or better owned elsewhere.

---

# 5. A required specific document/artifact can be removed while preserving the outcome

## SWE-154 — Identify Security Risks

History shows:

- Revision B required security risks/mitigations to be planned in the **Project Protection Plan** and focused on space-flight software.
- Revision C:
  - changed `security` to `cybersecurity`,
  - changed the responsibility wording,
  - expanded to flight and ground software systems,
  - **removed the requirement for a Project Protection Plan** while preserving the obligation to identify risks and plan mitigations.

Sources:

- https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695510/SWE-154%2B-%2BIdentify%2BSecurity%2BRisks
- https://swehb.nasa.gov/display/SITE/SWE-154%2BHistory

### Knowledge captured

NASA can separate the required **outcome** from a previously mandated **artifact/form**. A specific document is not necessarily permanent if the underlying control can be satisfied more flexibly.

---

# 6. Detailed process-step prescriptions can be removed while preserving control responsibilities

## SWE-082 — Authorizing Changes

Revision A required procedures covering:

- levels of configuration control,
- who can authorize changes,
- who can make changes,
- detailed steps for requesting authorization,
- processing change requests,
- tracking/distributing changes,
- maintaining past versions.

Revision B removed the explicit requirement to identify all those detailed process steps while retaining requirements around control levels and responsible/authorized persons or groups.

Sources:

- https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695463/SWE-082%2B-%2BAuthorizing%2BChanges
- https://swehb.nasa.gov/spaces/SWEHBVC/pages/50888937/SWE-082%2B-%2BAuthorizing%2BChanges

### Knowledge captured

NASA sometimes moves away from over-prescribing exact procedure details while retaining the necessary governance/control boundary.

This suggests a distinction between:

- normative control objective,
- local implementation procedure.

---

# 7. External-standard coupling can be removed

## SWE-086 — Continuous Risk Management

History shows:

- Revision B required risk activities `in accordance with NPR 8000.4` and included explicit `identify` wording.
- Revision C removed the explicit `identify` term and removed the direct `in accordance with NPR 8000.4` coupling, retaining the required lifecycle activities around recorded risks/mitigation plans.

Source:

- https://swehb.nasa.gov/spaces/SWEHBVC/pages/50888941/SWE-086%2B-%2BContinuous%2BRisk%2BManagement

### Knowledge captured

A rule can be decoupled from a specific external reference or redundant action while preserving its operational intent.

---

# 8. Reporting obligations can be reshaped rather than simply expanded

## SWE-094 — Reporting of Measurement Analysis

History shows multiple revisions:

- Revision A required periodic reporting of analysis results and access to measurement information.
- Revision B **removed the periodic reporting requirement**, changed the data/access wording, and specified which authorities could request access.
- Revision C changed the recipient/authority set again.
- Revision D broadened the possible recipient set with `other organizations as appropriate`.

Source:

- https://swehb.nasa.gov/spaces/SWEHBVC/pages/50888953/SWE-094%2B-%2BReporting%2Bof%2BMeasurement%2BAnalysis

### Knowledge captured

NASA changes not just strictness but the shape of governance: push/reporting requirements can become on-request access requirements, ownership can move, and recipient scopes can evolve.

---

# 9. Concerns can be split into separate requirements instead of bloating one requirement

## SWE-027 history

NASA history for off-the-shelf/reused software shows that open-source-specific concerns were removed from one requirement and handled through a separate SWE (`SWE-149`).

Source:

- https://swehb.nasa.gov/spaces/SITE/pages/81690920/SWE-027%2BHistory

### Knowledge captured

Splitting is used when a concern deserves its own independently managed requirement rather than remaining bundled into a compound rule.

However, this is not evidence that every long rule should be split; it is an example of responsibility separation when the topic became distinct enough.

---

# 10. Requirement histories themselves are preserved as first-class documentation

## Evidence / observed practice

NASA Handbook SWE pages commonly preserve a revision table showing:

- requirement text in each NPR revision,
- `Difference between A and B`, `B and C`, `C and D`,
- first use / last use / reserved status.

NASA's Handbook documentation infrastructure explicitly supports `Current Use`, `Retired`, and `Reserved` SWE states and difference tables.

Source:

- `SWEHBDOC Features And Tools`
  - https://swehb.nasa.gov/spaces/SITE/pages/195560152/SWEHBDOC%2BFeatures%2BAnd%2BTools

### Knowledge captured

NASA does not hide rule evolution behind raw version-control diffs only. Human-readable requirement history is part of the knowledge system.

That makes it possible to understand:

- what changed,
- when it changed,
- whether wording was added/removed,
- whether a requirement was retired/reserved,
- how responsibility/applicability evolved.

---

# 11. The evidence so far rejects the model `improvement = keep adding rules`

This is a synthesis from the examples above.

Observed NASA evolution includes:

```text
ADD
REMOVE
NARROW APPLICABILITY
EXPAND APPLICABILITY
SIMPLIFY WORDING
REMOVE SPECIFIC ARTIFACT MANDATE
MOVE RESPONSIBILITY
SPLIT CONCERN INTO ANOTHER REQUIREMENT
DECOUPLE FROM EXTERNAL STANDARD
CHANGE REPORTING MODEL
CLARIFY AMBIGUOUS OBLIGATION
RETIRE / RESERVE REQUIREMENT IDENTIFIERS
```

### Possible implication for later `web-project-guide` synthesis

When a failure occurs, possible fixes should eventually include at least:

- no rule change; fix execution,
- improve guidance/example,
- improve routing/applicability,
- strengthen existing rule,
- simplify existing rule,
- narrow scope,
- remove obsolete wording,
- move detail out of normative rule,
- split responsibility when independently routable,
- merge duplicates,
- retire obsolete rules,
- add a new rule only when genuinely necessary.

**Adoption status:** research evidence only; no Guide change decided.

---

# Limitations / unanswered questions

- Requirement history tables often state **what changed** but not the complete evidence or decision record explaining **why** each individual change was approved.
- A wording removal does not necessarily mean the underlying engineering concern disappeared; it may have moved to another requirement, standard, guidance section, process, or authority.
- More work is needed to trace specific changes to Lessons Learned, waiver trends, audits, or formal change proposals.
- NASA's scale/risk context is very different from a personal Web project; transfer decisions remain intentionally deferred.

No adoption decision has been made yet.
