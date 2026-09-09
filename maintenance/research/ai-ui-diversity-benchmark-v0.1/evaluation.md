# AI UI Diversity Benchmark — Evaluation Protocol v0.1

Status: **experimental evaluation protocol / non-normative**

This protocol separates correctness, task fit, design quality, structural diversity, project identity, and cost. It intentionally avoids a single "overall UI score" as the primary evidence.

## Evaluation authority by claim

Use the evidence source best suited to the claim.

| Claim | Primary authority | Secondary evidence |
|---|---|---|
| Required behavior works | browser / automated validation | human observation |
| Primary task is understandable / usable | representative user or task evaluator | UX expert / LLM review |
| Structural / UX quality | relevant UX / UI evaluator | characteristic-based LLM review |
| Visual finish | relevant design evaluator | screenshot-based LLM review |
| Project identity | project owner / domain-aware evaluator | expert / LLM explanation |
| Cross-project diversity | blinded human portfolio comparison | structural metrics / LLM panel |
| Plan → render fidelity | artifact evidence against recorded decision | LLM extraction |
| Effort / cost | recorded benchmark log | none |

No single evaluator is the final authority for every dimension.

## Blind artifact IDs

Before subjective evaluation:

- replace condition / run labels with anonymous IDs;
- do not expose `Baseline`, `Enhanced`, workflow name, prompt history, or generated rationale unless the specific metric requires rationale;
- randomize left / right order in pairwise comparisons;
- where LLM pairwise judges are used, evaluate both `A vs B` and `B vs A` order.

## Layer 1 — Functional / browser gate

A final artifact is not eligible for visual-preference promotion if the primary task is materially broken.

For each task, run the completion checks defined in [`tasks.md`](tasks.md).

Record:

- `pass` — required behavior completed;
- `partial` — meaningful portion works but at least one required primary behavior is missing / misleading;
- `fail` — primary task cannot be completed or the artifact is materially broken;
- `not_tested` — evidence unavailable; never convert to pass.

Also record where applicable:

- console / runtime errors;
- broken controls;
- overflow / clipping;
- state persistence problems;
- narrow-viewport failures;
- accessibility-critical interaction failure.

A visually stronger artifact that fails the primary flow must be reported as a functional regression, not a design win.

## Layer 2 — Primary blind pairwise adoption preference

Primary human question:

> **Which version would you be more willing to adopt as the finished product for this project?**

Allowed answers:

- Left
- Right
- Tie / no meaningful preference
- Cannot judge because one or both artifacts are functionally invalid

Evaluators should inspect the whole artifact rather than only the first screen / hero area.

## Layer 3 — Dimension-specific rubric

Use separate ratings rather than a single creativity / quality score.

Suggested ordinal scale:

- `1` — clearly weak / mismatched
- `2` — below acceptable
- `3` — acceptable / mixed
- `4` — strong
- `5` — clearly strong

The scale is diagnostic; arithmetic averages are not automatic promotion thresholds.

### A. Task Fit

Question:

> Does the information / interaction structure fit the user's repeated primary task and usage context?

Look for:

- fast access to the primary action;
- correct emphasis for beginner vs expert / repeated use;
- sensible task sequence;
- context preservation;
- no marketing-style or dashboard-style structure that fights the actual work.

### B. Information / Structural Quality

Question:

> Are information relationships expressed clearly and coherently?

Look for:

- meaningful clustering;
- hierarchy;
- modularity;
- primary vs secondary information;
- reading / scanning flow;
- navigation and view boundaries;
- progressive disclosure where appropriate;
- state / recovery clarity.

### C. Visual Quality

Question:

> Is the rendered interface visually finished enough for the intended product?

Look for:

- typography hierarchy;
- spacing rhythm;
- alignment;
- component consistency;
- contrast / legibility;
- visual hierarchy;
- responsive treatment;
- state finish;
- avoidance of accidental clutter or unfinished placeholder treatment.

Do not reward novelty by itself.

### D. Category Familiarity

Question:

> Can the target user understand what kind of product this is and how to begin without decoding an unnecessarily novel interaction language?

High distinctness with poor category comprehension is not a success.

### E. Project Identity

Question:

> If the project name, logo, copy, and accent color were removed, would the remaining composition and interaction still feel specifically derived from this project's task / content rather than transferable unchanged to an unrelated project?

Indicators of weak identity:

- same generic hero / KPI / three-card / CTA composition across unrelated tasks;
- generic sidebar + card grid despite different task structure;
- project-specific content appears only as labels inside a reusable shell.

### F. Plan → Render Fidelity

Only evaluate when the condition records explicit design decisions.

For each selected high-impact decision:

- `implemented` — clearly visible in artifact / flow;
- `partial` — present but weaker / inconsistent with the recorded decision;
- `missing` — rationale claims it but the artifact does not implement it;
- `not_applicable`.

Examples:

- `Search-first` should make search a primary discovery path, not a decorative top-bar field.
- `Master-detail` should preserve collection context while inspecting an item.
- `Progressive disclosure` should materially change what is persistent vs contextual.

## Layer 4 — Structural distinctness between candidates

Do not treat color or typography alone as evidence of a different structural direction.

For each candidate pair, compare the following dimensions:

1. **Decision distance** — high-impact design choices differ.
2. **Clustering** — information is grouped differently.
3. **Modularity** — page / pane / region composition differs.
4. **Feature recognition** — primary capabilities are surfaced differently.
5. **Reading flow** — attention / scan order differs.
6. **Spatialization** — major regions have meaningfully different spatial relationships.
7. **Task flow** — discovery / selection / action / completion path differs where the decision implies it.
8. **Surface visual difference** — typography / color / material / shape differs.

Classify each pair:

- `STRUCTURAL_ALTERNATIVE` — at least one high-impact decision differs **and** rendered structure or task flow differs meaningfully.
- `VISUAL_VARIANT` — surface differs but high-impact structure / flow is substantially the same.
- `REDUNDANT` — neither structural nor useful visual separation is meaningful.
- `OVER_DIVERGENT` — structure is different but task fit / category comprehension is materially harmed.

Do not calculate a single diversity score unless a later validation demonstrates that the combined score is useful.

## Layer 5 — Cross-project portfolio test

The original failure mode is cross-project homogenization, so evaluate portfolios in addition to isolated artifacts.

A portfolio contains one artifact from each frozen task.

Blind question:

> **Which portfolio better gives each product a structure that fits its own task while remaining meaningfully distinct from the other products in the same portfolio?**

Follow-up diagnostic questions:

- Do multiple projects reuse the same clustering pattern?
- Do multiple projects reuse the same navigation / content frame without task justification?
- Are differences mostly color / imagery / copy?
- Which project has the weakest task-specific identity?

## Evaluator roles

### Pilot minimum

Use independent evaluation where possible from three perspectives:

1. UI / UX / visual-design perspective;
2. Web implementation + interaction-structure perspective;
3. target-user / product-owner perspective.

The same person may fill more than one role in a small pilot, but the overlap must be recorded rather than presented as independent evidence.

### Larger validation

If the pilot shows a meaningful signal, expand the relevant human panel before Common Rule promotion.

Do not assume a novice or general "design-aware" reviewer is interchangeable with a domain-relevant expert.

## Calibration

Before rating the full set:

1. choose a small calibration subset;
2. independently rate it;
3. compare interpretations of `Task Fit`, `Structural Quality`, `Project Identity`, and `Structural Alternative`;
4. resolve definition ambiguity in this rubric rather than changing artifact outcomes;
5. freeze the clarified rubric before the main rating set.

Record inter-rater disagreement. Low agreement on a subjective dimension may indicate an unstable metric, not only a bad evaluator.

## LLM judge use

LLM judges are secondary evidence and scaling tools.

Recommended use:

- structural explanation;
- obvious requirement-violation screening;
- blind pairwise secondary vote;
- disagreement discovery;
- rationale → render trace extraction.

Do not let an LLM alone reject a functionally valid candidate for subjective visual reasons before human review.

### Position-bias guard

For every LLM pairwise comparison:

1. judge `A vs B`;
2. judge `B vs A` with identical rubric;
3. if the preferred artifact flips with position, record `F7_EVALUATOR_INSTABILITY` and do not treat the pair as stable LLM evidence.

Where multiple model families are used, preserve per-judge results instead of reporting only majority vote.

## Human ↔ LLM disagreement set

Retain cases where:

- human preference and LLM panel disagree;
- structural metric suggests high difference but humans perceive the candidates as similar;
- humans prefer a lower automated-quality candidate;
- owner identity preference conflicts with expert visual preference.

These are high-value research cases, not noise to discard.

For each disagreement, record the apparent reason before changing the workflow or rubric.

## Effort / cost evaluation

Record per run:

- research actions;
- generation passes;
- number of structural candidates;
- critique passes;
- revision cycles;
- validation passes;
- elapsed effort where available.

Report benefit with cost.

A small diversity gain at several times the work is not automatically a Common Rule success.

## Condition comparison report

At minimum report:

### A vs B

Effect of additional Current-Guide effort.

### B vs C

Budget-matched process effect. This is the main experimental comparison.

### C vs D

Value of adaptive escalation beyond the budget-matched experimental workflow.

### A vs D

Practical end-to-end difference.

For each comparison, report:

- functional pass / partial / fail;
- pairwise adoption wins / losses / ties;
- rubric distribution by dimension;
- structural-alternative / visual-variant / redundant counts;
- portfolio preference;
- plan → render fidelity where applicable;
- effort;
- failure taxonomy.

## Promotion interpretation

Do not require the experimental workflow to win every dimension.

A strong promotion signal is:

- task / function is not materially worse;
- structural diversity improves;
- project identity improves;
- cost remains proportionate;
- and at least one of visual preference, revision efficiency, or plan → render fidelity improves.

If only systemic / high-uncertainty tasks benefit, prefer **PROMOTE CONDITIONALLY** over turning the mechanism into a universal step.
