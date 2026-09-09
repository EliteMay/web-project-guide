# AI UI Diversity Benchmark v0.1

Status: **experimental validation protocol / non-normative**

This benchmark tests whether the research-enhanced AI UI workflow reduces structural homogenization without sacrificing task fit, functional correctness, visual quality, or practical efficiency.

Evidence background: [`../../../references/ai-generated-ui-homogenization-research.md`](../../../references/ai-generated-ui-homogenization-research.md)

Task specifications: [`tasks.md`](tasks.md)

Evaluation protocol: [`evaluation.md`](evaluation.md)

Result schema: [`result-schema.json`](result-schema.json)

## Why this benchmark exists

The current Guide already contains Structure-first, Domain-first Visual Research, Visual Quality, Testing, and Evidence-first Research. This experiment therefore does **not** compare the enhanced workflow against an unstructured "just ask an AI to make a site" baseline.

The question is narrower:

> Does adding explicit decision-space exploration, distinct candidate selection, and rendered distinctness verification improve the current Guide enough to justify Common Rule promotion?

## Frozen pilot hypotheses

### H1 — Task / function non-regression

The enhanced workflow must not materially reduce primary-task fit or functional correctness compared with the Current Guide.

### H2 — Structural diversity

The enhanced workflow should increase structural diversity within a task and across different project types.

### H3 — Project identity

The enhanced workflow should reduce cross-project composition reuse that remains recognizable after brand color, copy, and project name are removed.

### H4 — Plan → render fidelity

When a workflow explicitly selects high-impact design decisions, those decisions should be visible in the rendered artifact rather than remaining only in rationale text.

### H5 — Efficiency

Any quality / diversity gain must be considered together with generation, research, revision, and evaluation cost.

## Pilot conditions

The pilot uses four conditions so that process benefit can be separated from simply spending more AI effort.

### A — Natural Baseline

Use the frozen Current Guide as normally routed for the task.

- Do not add the experimental mechanisms from this benchmark.
- Use the amount of research / generation / revision the Current Guide naturally calls for.

### B — Compute Baseline

Use the same Current Guide behavior as A, but allow approximately the same candidate / critique / revision budget used by Condition C.

Purpose: estimate how much improvement comes from additional generation opportunity alone.

### C — Budget-matched Enhanced

Use the experimental workflow while staying within approximately the same observable work budget as B.

Experimental mechanisms may include:

1. surface implicit high-impact decisions;
2. Question Lift;
3. Design Decision Triage;
4. decision-space structural divergence;
5. quality floor before diversity selection;
6. distinct candidate selection;
7. decision / structure / flow distinctness verification;
8. plan → render fidelity verification.

### D — Adaptive Enhanced

Use the experimental workflow with Minimum Sufficient Design Process logic.

- Escalate only when meaningful uncertainty remains.
- Increase fidelity only for the uncertainty being tested.
- Re-diverge when candidate collapse or revision stagnation is detected.
- Stop when decision-relevant evidence is sufficient.

Purpose: estimate the practical ceiling of the candidate workflow rather than only its budget-matched effect.

## Observable work budget

Internal model reasoning cannot always be controlled in product-level runs. For the pilot, record observable work units instead of claiming exact compute parity.

Record at minimum:

- research actions;
- candidate generations;
- candidate count;
- critique passes;
- revision cycles;
- browser / screenshot validation passes;
- tool actions where available;
- elapsed wall-clock effort where reliably observable.

If a later API-based replication is performed, add token, latency, and monetary cost.

## Pilot task matrix

Pilot tasks intentionally cover different structural demands:

1. `L` — Learning / Reference product
2. `W` — Dense data workspace
3. `G` — Game management interface

See [`tasks.md`](tasks.md).

## Run count

Initial pilot:

```text
3 tasks
× 4 conditions
× 3 independent runs
= 36 final artifacts
```

Each run is independent.

- Do not show Run 01 output to Run 02 / 03.
- Do not reuse an earlier candidate as a hidden seed.
- Keep the task specification, frozen Guide revision, model family, asset set, viewport, and access policy consistent across conditions unless the benchmark record explicitly marks a deviation.

## Freeze record

Before generation begins, record:

- benchmark version;
- baseline Guide commit;
- workflow-spec revision;
- task-spec revision;
- model and configuration;
- run date;
- viewport / device target;
- allowed assets;
- web / reference access policy;
- implementation constraints;
- completion criteria;
- observable budget policy.

The pilot must not silently update the baseline Guide midway through the experiment.

## Evidence to retain per artifact

At minimum:

- final source / build revision;
- full-page desktop screenshot;
- representative narrow-viewport screenshot where applicable;
- functional / runtime validation result;
- high-impact design decisions if the condition surfaces them;
- selected candidate rationale where applicable;
- plan → render fidelity result;
- observable work budget;
- known failure / limitation.

Where practical also retain:

- semantic region / DOM evidence;
- task navigation trace;
- rejected structural candidates;
- browser console errors;
- interaction recording or step trace.

## Evaluation layers

Do not collapse all quality into one score.

1. **Functional correctness** — browser / test evidence.
2. **Task fit** — representative-user / product evidence.
3. **Structural quality** — IA, clustering, modularity, reading flow, interaction structure.
4. **Visual quality** — hierarchy, typography, spacing, polish, responsive treatment.
5. **Structural diversity** — candidate and portfolio-level differences.
6. **Project identity** — whether the structure remains project-specific without brand decoration.
7. **Plan → render fidelity** — whether selected decisions exist in the artifact.
8. **Effort / cost** — additional research, generation, revision, and evaluation burden.

See [`evaluation.md`](evaluation.md).

## Primary comparisons

### A vs B

How much improvement comes from simply allowing more Current-Guide generation / revision effort?

### B vs C

At roughly matched observable budget, does the experimental process outperform the Current Guide?

This is the most important process comparison.

### C vs D

Does adaptive escalation add enough value to justify its extra cost?

### A vs D

What is the practical end-to-end effect if the experimental workflow is used normally?

## Pairwise primary outcome

For blind human comparison, the primary question is:

> **Which version would you be more willing to adopt as the finished product for this project?**

Do not expose condition names to evaluators.

Use anonymous IDs and randomize left / right presentation.

## Cross-project portfolio test

Single-artifact quality is insufficient for the original problem.

Create two or more blinded portfolios containing one final artifact from each task and ask:

> Which portfolio better gives each project a structure that fits its task and feels meaningfully distinct from the other projects?

This test targets cross-project homogenization directly.

## Failure taxonomy

Record at least the following when observed:

- `F1_CANDIDATE_COLLAPSE` — alternatives are described differently but have substantially the same structure.
- `F2_OVER_DIVERGENCE` — originality / distinctness damages task fit or category comprehension.
- `F3_REFERENCE_FIXATION` — the result reproduces reference-specific composition rather than transferring a principle.
- `F4_DECISION_THEATER` — planned decisions are not reflected in the render.
- `F5_VISUAL_REGRESSION` — structural exploration improves diversity but final polish degrades materially.
- `F6_COST_EXPLOSION` — benefit is too small relative to additional effort.
- `F7_EVALUATOR_INSTABILITY` — result depends strongly on evaluator or presentation order.
- `F8_FUNCTIONAL_REGRESSION` — the candidate looks stronger but primary functionality breaks or becomes harder to complete.

New failure types may be added during the pilot, but do not redefine success metrics after seeing results.

## Promotion decision

After pilot evidence, classify each experimental mechanism independently where possible:

- **PROMOTE** — repeatable benefit with acceptable cost and applicability.
- **PROMOTE CONDITIONALLY** — beneficial only for meaningful / systemic or high-uncertainty cases.
- **KEEP EXPERIMENTAL** — promising but insufficient evidence or too context-dependent.
- **REJECT** — no meaningful benefit, unacceptable regression, or disproportionate cost.

Do not promote the whole research workflow as one monolithic Rule if only one or two mechanisms are responsible for the observed gain.

## Minimum promotion signal

For a Common Rule candidate, require at least:

- no clear task-fit / functional regression;
- structural diversity improvement;
- project-identity improvement;

and at least one of:

- visual preference improvement;
- revision-effort improvement;
- plan → render fidelity improvement.

Cost must be reported alongside benefit.

## Stopping condition

The pilot is complete when:

1. frozen tasks and conditions were executed or explicitly marked invalid;
2. functional evidence exists for each valid artifact;
3. blind comparison and rubric evidence are complete for the planned sample;
4. cross-project portfolio evidence is complete;
5. observable effort is recorded;
6. failures and disagreement cases are classified;
7. results support a `PROMOTE / PROMOTE CONDITIONALLY / KEEP EXPERIMENTAL / REJECT` decision without changing the metric definitions post hoc.

A benchmark run is evidence for Guide improvement; it is not itself a new normative owner.
