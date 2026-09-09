# AI-generated UI Homogenization Research

Status: **non-normative research evidence / working hypothesis**

This file records external evidence gathered to understand why AI-generated websites and applications can remain visually competent while converging toward similar compositions. It is not a Common Rule. Current normative behavior remains in `docs/04-ui-ux-accessibility.md`, `docs/17-visual-quality-baseline.md`, `docs/18-domain-first-visual-research.md`, `docs/20-evidence-first-research.md`, and `docs/22-task-first-structure-flow-research.md`.

## Research question

How can an AI-assisted Web / App design workflow reduce cross-project visual and structural homogenization without sacrificing task fit, usability, feasibility, or completion quality?

## Current evidence map

### Strongly reinforced findings

1. **The Web was already becoming more homogeneous before generative AI.**
   - CHI 2021 research on Web design from 2003–2019 reported increasing similarity in visual and layout characteristics. AI therefore amplifies an existing ecosystem tendency rather than creating homogenization from nothing.

2. **Examples can improve quality while narrowing exploration.**
   - A Design Studies meta-analysis covering dozens of fixation studies found that examples can reduce category exploration and variety while sometimes improving novelty or quality.
   - Reference count alone is therefore not a monotonic quality control.

3. **Early polished examples can create fixation.**
   - CHI 2024 work on generative AI and divergent thinking found stronger fixation and reduced variety / originality in an AI-supported ideation condition.
   - Partial or abstract examples and low-fidelity representations have separate historical evidence for preserving exploration better than complete examples in some design tasks.

4. **Parallel exploration can outperform serial refinement.**
   - CHI 2010 Parallel Prototyping found that producing alternatives in parallel before feedback improved final quality and divergence compared with serially refining one direction.
   - This directly challenges the common AI workflow of `first draft → local critique → local edit → repeat`.

5. **Meaningful structural constraints can increase layout diversity.**
   - Scout (CHI 2020) explored UI alternatives through high-level structure, grouping, order, emphasis, and arrangement constraints while preserving design quality.
   - This suggests that divergence axes should focus on task / information relationships rather than color, radius, shadow, or other surface values.

6. **LLMs silently fill unresolved design decisions.**
   - Pail (CHI 2025) explicitly surfaces goals, requirements, implicit decisions, and abstractions instead of allowing generated code to hide those decisions.
   - Aporia (2026) similarly treats decisions as explicit, editable objects shared between the human and the agent.
   - This supports a failure chain in which an AI default becomes the first rendered UI and then becomes an anchor for all later revisions.

7. **Generated UI rationale is not reliable implementation evidence.**
   - Design Theater (2026) found that a meaningful portion of user-facing design rationales were not fully implemented and that layout / visual organization converged more than color.
   - Planned design differences therefore need rendered evidence.

8. **Human-perceived interface difference is strongly structural.**
   - CHI 2026 Interface Dis/Similarities research found clustering, modularity, feature recognition, reading flow, and spatialization to be more influential to perceived GUI difference than color scheme.
   - A different palette is not strong evidence of a different design direction.

9. **Task-flow evidence is separable from screenshot evidence.**
   - FlowEval (2026) evaluates UI behavior through task-navigation traces rather than screenshots alone.
   - Candidate diversity therefore can exist at decision, rendered structure, visual treatment, and interaction-flow levels.

10. **Designer-aligned feedback is richer than preference ranking alone.**
    - Apple / CHI 2026 work using designer comments, sketches, and direct manipulation outperformed simpler ranking-style feedback in tested UI generation settings.
    - UIST 2024 automatic UI feedback research also found value in AI critique, but its usefulness decreased over repeated iterations; AI critique should not become an infinite self-evaluation loop.

### Moderately reinforced findings

- Different personas, functional constraints, vendors, or knowledge partitions can improve collective idea diversity, but the evidence is mainly from general creative ideation rather than Web UI.
- Multi-agent systems do not automatically produce diversity; strong coupling and early communication can cause premature convergence.
- Cross-model candidate pools can be more diverse than repeated sampling from one model, but this should remain experimental for Web UI until directly validated.
- Fidelity should be treated as multidimensional. High visual fidelity can help communicate a direction while reducing flexibility if it becomes an early commitment.
- Just-in-time reference retrieval and component / pattern-level remixing appear promising for avoiding both reference overload and one-example fixation.

### Experimental / watchlist ideas

- Visual-saliency models for hierarchy verification.
- Automated UI-quality models as secondary evidence.
- Cross-vendor candidate generation as a standard process.
- Long-term "creative scar" effects after repeated AI-assisted ideation.
- Formal DPP / MAP-Elites algorithms for production UI candidate selection.

These are not ready for Common MUST / SHOULD promotion without project-specific validation.

## Failure chain currently supported by the evidence

```text
Pre-existing Web homogenization
↓
LLM learns dominant conventions
↓
Unresolved project decisions are silently defaulted
↓
A polished first render creates an anchor
↓
Serial local revision stays near that anchor
↓
Quality-only selection rewards safe / familiar outputs
↓
Rationale can claim differences not present in the render
↓
Different projects converge on similar clustering / modularity / reading flow
```

## Candidate intervention chain

```text
Goal / Task / Content
↓
Surface implicit high-impact decisions
↓
Lift solution-shaped questions to purpose-level design questions
↓
Triage only decisions that affect task / structure / lock-in
↓
Create meaningfully orthogonal structural options
↓
Generate cheap candidate coverage
↓
Apply a quality floor before diversity selection
↓
Keep distinct high-quality representatives
↓
Verify decision → render fidelity
↓
Compare structure / visual / flow separately
↓
Increase prototype fidelity only where uncertainty requires it
↓
Validate function + visual quality + project identity
```

## Working candidate concepts

The following names are research shorthand, not normative terminology:

- **Question Lift** — rewrite solution-shaped questions toward the user purpose they serve.
- **Design Decision Triage** — classify unresolved decisions by task impact, structural reach, decision sensitivity, lock-in, option diversity, and defaultability.
- **Decision-space Divergence** — create alternatives from meaningfully different high-impact decision combinations rather than styling variants.
- **Quality Floor → Diversity Max** — remove unusable / non-compliant options first, then prefer structurally separated surviving candidates rather than the three highest-quality near-duplicates.
- **Structural Distinctness Check** — compare decision distance, clustering / modularity / reading flow, visual difference, task-flow difference, and plan-to-render fidelity.
- **Fidelity Downshift** — when a polished direction becomes a fixation point, return to a more abstract structural representation before revising.
- **Minimum Sufficient Design Process** — escalate research / prototype fidelity only for the dominant unresolved uncertainty instead of applying the full process to every visual change.

## Explicitly rejected simplifications

Current evidence does **not** support turning the following into universal Common Rules:

- "Add more reference sites."
- "Always use three finished designs."
- "Always start low-fidelity."
- "Use more agents."
- "Use more prompts / longer prompts."
- "Tell the model to be bolder repeatedly."
- "Maximize novelty."
- "Use one universal visual design system for every project."
- "Let an AI quality score select the winner."
- "Run AI critique until it stops finding problems."

## Promotion boundary

Before any candidate mechanism becomes a Common Rule:

1. Freeze the Current Guide baseline.
2. Compare the Current Guide against the candidate workflow on multiple structurally different UI tasks.
3. Control for additional generation / revision budget.
4. Evaluate task fit, functional correctness, visual quality, structural diversity, project identity, plan-to-render fidelity, and effort separately.
5. Include cross-project portfolio evaluation, not only single-site quality.
6. Record failures and negative results.
7. Promote only the smallest mechanism that shows repeatable benefit without disproportionate cost.

The pilot protocol is stored in [`../maintenance/research/ai-ui-diversity-benchmark-v0.1/README.md`](../maintenance/research/ai-ui-diversity-benchmark-v0.1/README.md).

## Core evidence and starting points

- Microsoft Research (2026), *Interrogating Design Homogenization in Web Vibe Coding*: <https://www.microsoft.com/en-us/research/publication/interrogating-design-homogenization-in-web-vibe-coding/>
- CHI 2021, *Investigating the Homogenization of Web Design: A Mixed-Methods Approach*: <https://dl.acm.org/doi/10.1145/3411764.3445476>
- Design Studies (2015), *Fixation or inspiration? A meta-analytic review of the role of examples on design processes*: <https://doi.org/10.1016/j.destud.2015.04.001>
- CHI 2010, *Parallel Prototyping Leads to Better Design Results, More Divergence, and Increased Self-Efficacy*: <https://doi.org/10.1145/1879831.1879836>
- CHI 2020, *Scout: Rapid Exploration of Interface Layout Alternatives through High-Level Design Constraints*: <https://arxiv.org/abs/2001.05424>
- CHI 2024, *The Effects of Generative AI on Design Fixation and Divergent Thinking*: <https://doi.org/10.1145/3613904.3642919>
- CHI 2025, *Beyond Code Generation: Supporting Novices in Solving Coding Problems with LLMs through Design Space Exploration*: <https://arxiv.org/abs/2503.06911>
- 2026, *Decision-Oriented Programming with Aporia*: <https://arxiv.org/abs/2604.05203>
- 2026, *Design Theater: A Benchmark for Generative UI*: <https://arxiv.org/abs/2607.22928>
- Apple / CHI 2026, *Improving User Interface Generation Models from Designer Feedback*: <https://machinelearning.apple.com/research/designer-feedback>
- UIST 2024, *Generating Automatic Feedback on UI Mockups with Large Language Models*: <https://arxiv.org/abs/2403.13139>
- IUI 2026, *UI Remix: Supporting UI Design through Interactive Example Retrieval and Remixing*: <https://research.adobe.com/publication/ui-remix-supporting-ui-design-through-interactive-example-retrieval-and-remixing/>
- 2026, *Maru: Information Architecture as a Shared Language for Generating Aligned and Persistent User Interfaces*: <https://arxiv.org/abs/2608.25565>
- CHI 2026, *Interface Dis/Similarities: Investigating Characteristics Influencing Perceived Differences Between GUIs*: <https://doi.org/10.1145/3772318.3790718>
- Apple 2026, *FlowEval: UI Evaluation through Task-Flow Evidence*: <https://machinelearning.apple.com/research/floweval-ui-evaluation>
- UI-Bench (2025), expert pairwise evaluation of text-to-app tools: <https://arxiv.org/abs/2508.20410>

## Status

- Evidence collection: substantial, still open to contradictory Web-UI-specific evidence.
- Common Rule promotion: **not yet**.
- Next evidence step: run the benchmark pilot and compare the Current Guide with the candidate mechanisms under controlled conditions.
