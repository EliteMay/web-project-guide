# L-A01 — Natural Baseline

Status: **generated / local browser-validated / evaluation pending**

## Freeze

- Benchmark: `ai-ui-diversity-benchmark-v0.1`
- Task: `L` — Northstar Learn
- Condition: `A` — Natural Baseline
- Baseline Guide commit: `afdddbb440b18ec4980a3e9e635fc4ae6236bd55`
- Model: GPT-5.6 Sol
- Primary viewport: `1440x900`
- Narrow viewport: `390x844`
- Reference access: current public web references allowed under the Current Guide's Domain-first Visual Research route

## Current-Guide route actually used

1. Latest `README.md` / `START_HERE.md`
2. `docs/22-task-first-structure-flow-research.md`
3. `docs/18-domain-first-visual-research.md`
4. `docs/17-visual-quality-baseline.md`
5. Browser / screenshot validation

No experimental Decision-space Divergence, candidate-pool generation, diversity selection, or Structural Distinctness Gate was used.

## Representative reference evidence used before implementation

- MDN Learn / Getting Started / Core modules: structured beginner progression coexisting with a broad reference ecosystem.
- Codecademy beginner skill path: path metadata, time, projects / quizzes, and explicit learning progression.
- freeCodeCamp curriculum: module / section progression and visible completion state.

The implementation transfers only structural principles. It does not copy exact colors, layout dimensions, component counts, or brand treatment.

## Structure selected by the Natural Baseline

Task analysis exposed two recurring contexts:

1. resume / continue a short learning session;
2. retrieve a known concept quickly as reference.

The artifact therefore uses two top-level modes sharing one content model:

- `Learn`: sectioned curriculum, resume state, prerequisites, lesson completion;
- `Reference`: direct concept search with links back to related lessons.

Lesson ↔ concept relationships preserve context across the two modes.

## Functional validation

Browser automation completed the following checks successfully:

- initial page renders without console / page errors;
- five lesson rows render in the first learning section;
- `Continue lesson` opens the lesson dialog;
- marking the resumed lesson complete updates overall progress from the initial state to `18% complete`;
- switching to Reference and searching `DNS` returns one matching concept card;
- opening the result shows the `DNS` concept dialog;
- a representative `390x844` narrow viewport renders without a blocking runtime error.

Observed console / page errors: **none**.

## Visual verification

Desktop and narrow screenshots were captured from the final local artifact after browser validation.

Initial self-review:

- hierarchy is clear;
- learning progression and reference lookup are visibly separate;
- responsive priority remains usable;
- no major overflow / clipping observed;
- the result still uses a relatively conventional curriculum + content composition, which is useful as a baseline for later structural-diversity comparison.

## Observable effort

- research actions: 1 focused reference-research pass;
- structural candidate generations: 1;
- implemented final candidates: 1;
- critique / browser-validation passes: 1;
- revision cycles after browser validation: 0;

## Pending

- persist final source and screenshots into the run artifact set;
- execute A-02 / A-03 independently;
- execute B / C / D runs;
- blind evaluation only after compared artifacts exist.
