# Research Capture Policy

## Status

- Purpose: preserve research knowledge before adoption decisions
- Scope: active research / requirements work for `EliteMay/web-project-guide`
- This file is **non-normative research process evidence**. It does not itself create Common Rules.

## Core Principle

Research collection is **high-recall first, filtering later**.

During research, do not discard information merely because it currently appears:

- too complex,
- too expensive,
- too enterprise-oriented,
- too bureaucratic,
- unsupported by the current ChatGPT / GitHub toolset,
- impossible to implement with the current architecture,
- unnecessary for today's project size,
- unlikely to be adopted immediately.

If a mechanism exists and is relevant to the research question, preserve what was learned about it first. Feasibility, cost, simplification, adoption, and rejection are separate later decisions.

## What to Record

When reviewing a source, capture as much of the useful knowledge as reasonably possible, including details whose importance is not yet known.

Where available, record:

- source identity and link,
- source date/version when relevant,
- terminology and definitions,
- classifications and taxonomies,
- triggers and applicability conditions,
- workflow steps and lifecycle stages,
- roles, responsibilities, authorities, and separation of duties,
- independent review / second-check mechanisms,
- matrices, checklists, registries, ledgers, gates, and other control structures,
- required fields or state models,
- evidence / traceability requirements,
- exception, waiver, deviation, tailoring, and escalation behavior,
- review cadence and re-evaluation triggers,
- audit / verification methods,
- automation or tooling used,
- data structures or machine-readable forms,
- approval / signature / attestation models,
- change history / versioning behavior,
- examples and edge cases,
- failure modes the mechanism is intended to prevent,
- limitations and known weaknesses,
- cost, complexity, organizational prerequisites, or staffing needs,
- mechanisms that appear excessive for a solo project,
- mechanisms that cannot currently be reproduced,
- technologies or capabilities that would be needed to reproduce them,
- observations, hypotheses, doubts, and open questions raised during review.

Do not keep only the conclusions that already look useful.

## Separate Knowledge from Adoption

For each meaningful finding, distinguish these when practical:

1. **Observed practice / evidence** — what the source actually does or states.
2. **Interpretation** — what appears to be learned from it.
3. **Possible implication** — how it might relate to `web-project-guide`.
4. **Feasibility** — what would be required to reproduce it, including unavailable technology or organizational capability.
5. **Adoption status** — `not decided`, `candidate`, `accepted`, or `rejected`.

A finding may remain `not decided` even if it is currently impossible to implement.

## Do Not Pre-filter by Current Capability

Current inability is not a reason to erase knowledge.

Examples:

- If NASA uses an independent authority that a one-person project cannot literally reproduce, record the role separation and why it exists.
- If a standard assumes dedicated compliance software, record the software/tooling concept even if no equivalent tool is currently available.
- If a process relies on multiple reviewers, signatures, formal approval boards, or organizational escalation, record those mechanics before later deciding whether a solo-project analogue is possible.
- If a technique requires future automation, policy-as-code, static analysis, repository scanning, or another capability not currently implemented, record both the technique and the missing capability.

Later synthesis may choose to:

- adopt it directly,
- compress it,
- automate it,
- emulate it with a lighter mechanism,
- defer it,
- or reject it.

That decision must happen **after** the knowledge has been preserved.

## Research vs Final Rule

Research files may intentionally contain:

- conflicting approaches,
- heavyweight practices,
- rejected ideas,
- incomplete hypotheses,
- capabilities not currently available.

That is acceptable. Research files are evidence stores, not polished rulebooks.

Common Rules should be created only after comparison, discussion, applicability analysis, and an explicit adoption decision.
