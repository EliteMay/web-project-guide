# LLM Self-Review / Self-Critique Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- Related prior AI research:
  - `references/llm-long-context-instruction-following-research.md`
  - `references/llm-multi-constraint-instruction-following-research.md`
  - `references/llm-conflicting-hierarchical-instruction-research.md`
- This file is **non-normative research evidence**.
- Adoption status for all mechanisms below: **not decided**, unless explicitly stated otherwise.
- Research is high-recall first. Findings are preserved even when they require external tools, trained verifiers, multiple models, formal or executable oracles, expensive repeated inference, model fine-tuning, or capabilities unavailable to the current project.

## Research Question

How reliable is LLM self-review / self-critique as a mechanism for detecting and repairing the model's own errors, omissions, reasoning failures, tool-use mistakes, and code defects?

The immediate project-relevant question is not merely whether iterative prompting can sometimes improve an answer. It is whether a workflow can safely use the same model that produced an artifact as an assurance barrier for that artifact.

A useful failure chain is:

```text
model produces output
→ model is asked to review itself
→ review must detect a defect
→ localize / classify the defect
→ propose a correct repair
→ execute the repair without breaking correct parts
→ verify that the repaired state is actually better
```

Any stage can fail independently.

This pass focuses on:

- intrinsic same-model self-correction,
- same-model critique / review,
- error detection vs repair,
- correct-answer regression during review,
- self-confirmation / self-attribution bias,
- critique of own output vs third-party output,
- external tool / oracle feedback as a contrast condition,
- iterative reflection in agents,
- coding / tool-use examples,
- measurement and experiment-design pitfalls,
- current positive and negative evidence.

This pass does **not** yet complete the separate research topics of:

- independent verifier / judge reliability,
- cross-model evaluator reliability,
- multi-agent verification,
- deterministic validator design for `web-project-guide`,
- evidence receipts / proof-of-checking,
- repository-level coding-agent rule adherence,
- final architecture or adoption.

---

# 1. "Self-correction" is an overloaded term and must be separated by information source

## Evidence / observed practice

The TACL critical survey `When Can LLMs Actually Correct Their Own Mistakes?` argues that self-correction research often mixes materially different settings under one label.

The survey distinguishes questions such as:

- whether a model can improve its best initial response using only the same information it already had,
- whether a model can improve after receiving new external information,
- whether a whole correction system outperforms strong non-correction baselines.

It also distinguishes:

- same-model correction,
- cross-model correction,
- external-tool / external-knowledge correction,
- fine-tuned feedback or refinement models,
- post-hoc correction,
- generation-time / step-level correction,
- generate-and-rank systems.

Source:

- Kamoi et al., `When Can LLMs Actually Correct Their Own Mistakes? A Critical Survey of Self-Correction of LLMs`, TACL 2024
  - https://aclanthology.org/2024.tacl-1.78/
  - https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00713/125177/When-Can-LLMs-Actually-Correct-Their-Own-Mistakes

## Knowledge captured

These are not equivalent claims:

```text
"the same model can inspect its own answer and improve it without new information"
```

```text
"an LLM can use compiler/test/search feedback to repair an answer"
```

```text
"a multi-stage correction pipeline beats one-shot generation"
```

A research result in one category should not automatically be generalized to the others.

**Adoption status:** not decided.

---

# 2. Experiment design can make self-correction look stronger than it is

## Evidence / observed practice

The TACL survey identifies two recurring evaluation problems in prior work.

### A. Sub-optimal initial responses

A correction system can appear to produce a large gain if the initial answer is generated with a weaker prompt / weaker setup than the correction module is allowed to use.

For the strict question "can the model improve its own best effort using the same information?", the initial answer should itself be generated with the best available prompting / information that the correction stage can access.

### B. Unrealistic / oracle information

Some frameworks use information that would not be available in a real deployment, such as ground-truth labels or oracle signals. Such results can demonstrate repair capability but cannot directly establish autonomous intrinsic self-correction.

Source:

- Kamoi et al., TACL 2024

## Knowledge captured

A future self-review experiment should distinguish at least:

```text
initial quality
new information introduced during review
review model identity
verifier / oracle availability
final strong baseline
```

Without these controls, a reported improvement can be attributed to new information or a weaker initial baseline rather than genuine self-review ability.

**Adoption status:** not decided.

---

# 3. Strong positive evidence exists for same-model iterative refinement on some tasks

## Evidence / observed practice

Self-Refine, published at NeurIPS 2023, uses one LLM as:

- initial generator,
- feedback provider,
- refiner.

The process is iterative and requires no additional training or separate reward model.

The paper evaluates seven tasks spanning dialog generation, code readability, structured generation, sentiment rewriting, and mathematical reasoning using GPT-3.5 / ChatGPT / GPT-4-era models. It reports roughly 20 percentage points average absolute improvement across its evaluated tasks relative to conventional one-shot generation.

Source:

- Madaan et al., `Self-Refine: Iterative Refinement with Self-Feedback`, NeurIPS 2023
  - https://proceedings.neurips.cc/paper_files/paper/2023/hash/91edff07232fb1b55a505a9e9f6c0ff3-Abstract-Conference.html

## Knowledge captured

Same-model feedback is not universally useless.

There are task regimes where the model can:

```text
produce a draft
→ identify improvable aspects
→ rewrite the draft
→ obtain better judged quality
```

This is especially plausible for tasks where improvement criteria are visible in the response and can be revised locally, such as style, formatting, readability, or decomposable quality criteria.

## Important interpretation boundary

The existence of Self-Refine's positive results does not establish that the same model is a reliable **independent correctness verifier** for hidden logical, semantic, repository, or behavioral errors.

The later literature below identifies important task and evaluation boundaries.

**Adoption status:** not decided.

---

# 4. Intrinsic reasoning self-correction can make answers worse

## Evidence / observed practice

Huang et al., published at ICLR 2024, specifically study **intrinsic self-correction**: the LLM attempts to correct an answer using only its own capabilities, without external feedback.

For reasoning tasks, the paper reports that LLMs struggle to self-correct reliably and that self-correction can sometimes reduce performance rather than improve it.

Source:

- Huang et al., `Large Language Models Cannot Self-Correct Reasoning Yet`, ICLR 2024
  - https://proceedings.iclr.cc/paper_files/paper/2024/hash/8b4add8b0aa8749d80a34ca5d941c355-Abstract-Conference.html
  - https://openreview.net/forum?id=IkmD3fKBPQ

## Knowledge captured

A review loop introduces a new failure channel:

```text
initial answer is correct
→ model doubts / reinterprets it
→ "correction" changes a correct answer into an incorrect one
```

Therefore the number of review rounds cannot be treated as monotonically increasing assurance.

A self-review mechanism needs to measure both:

- wrong → correct repair,
- correct → wrong regression.

**Adoption status:** not decided.

---

# 5. Error detection can be the bottleneck even when correction is strong

## Evidence / observed practice

Tyen et al., Findings ACL 2024, separate two capabilities that are often combined:

1. finding the logical mistake,
2. correcting the mistake once its location is known.

Across five reasoning tasks, tested LLMs generally struggle to locate reasoning mistakes even in objective / unambiguous cases.

When the ground-truth mistake location is supplied through a backtracking setup, correction performance improves across all five tasks.

The paper also trains a small classifier using out-of-domain data that locates mistakes better than prompting a much larger model in the tested setup.

Source:

- Tyen et al., `LLMs cannot find reasoning errors, but can correct them given the error location`, Findings ACL 2024
  - https://aclanthology.org/2024.findings-acl.826/

## Knowledge captured

Self-review failure can occur even when the model possesses the knowledge needed to repair the defect.

The chain is better modeled as:

```text
error exists
↓
detection
↓
localization
↓
repair
```

and a failure at `detection` means the repair capability is never activated.

This distinction is highly relevant to rule omission: a model may know a rule and know how to fix a violation after it is pointed out while still failing to notice that it violated the rule in the first place.

**Adoption status:** not decided.

---

# 6. ICLR 2025: self-critique can collapse while sound external verification helps substantially

## Evidence / observed practice

Stechly, Valmeekam, and Kambhampati study GPT-4 on:

- Game of 24,
- Graph Coloring,
- STRIPS planning.

They compare iterative self-critique with a setup where a sound external reasoner verifies candidate solutions.

The paper reports:

- significant performance collapse with self-critique,
- significant performance gains with sound external verification,
- much of the external-verifier gain remains even when the more elaborate critique machinery is ablated and the model is simply re-prompted using the verifier result.

Source:

- Stechly et al., `On the Self-Verification Limitations of Large Language Models on Reasoning and Planning Tasks`, ICLR 2025
  - https://mlanthology.org/iclr/2025/stechly2025iclr-selfverification/

## Knowledge captured

The causal value can come from the **correctness signal**, not necessarily from eloquent natural-language self-critique.

This suggests an important distinction:

```text
reflection text
≠
correct verification evidence
```

A sophisticated critique paragraph can add little if its verdict is wrong, while a small trusted verifier signal can be highly useful.

**Adoption status:** not decided.

---

# 7. Self-correction can waver and introduce prompt / cognitive bias

## Evidence / observed practice

`Understanding the Dark Side of LLMs' Intrinsic Self-Correction`, ACL 2025, examines one simple task and three complex tasks with models including ChatGPT, Llama, and DeepSeek.

The authors report that intrinsic self-correction can:

- make models waver between intermediate and final answers,
- introduce prompt bias on simple factual questions,
- introduce human-like cognitive biases on complex tasks.

They also report two mitigation directions in their experiments:

- repeating the original question,
- supervised fine-tuning with a small number of examples.

Source:

- Zhang et al., `Understanding the Dark Side of LLMs' Intrinsic Self-Correction`, ACL 2025
  - https://aclanthology.org/2025.acl-long.1314/

## Knowledge captured

A review prompt is not a neutral observation request. It changes the model's inference context and can itself bias the answer.

For example, a generic prompt such as:

```text
"Are you sure? Check for mistakes."
```

can implicitly suggest that a mistake exists even when the initial answer was correct.

This creates a review-induced instability channel.

**Adoption status:** not decided.

---

# 8. Self-correction has two opposing capabilities: preserve correct answers and repair wrong ones

## Evidence / observed practice

Yang et al., ACL 2025, decompose self-correction into:

- **confidence capability** — preserving / staying with correct answers,
- **critique capability** — changing wrong answers into correct ones.

They report that models differ substantially: some are more confident, others more critical. Prompting or in-context learning can create a trade-off where improving one capability reduces the other.

Source:

- Yang et al., `Confidence v.s. Critique: A Decomposition of Self-Correction Capability for LLMs`, ACL 2025
  - https://aclanthology.org/2025.acl-long.203/

## Knowledge captured

A self-review system should not optimize only:

```text
number of detected / changed answers
```

because an aggressive reviewer can score highly on changing mistakes while also corrupting correct work.

A more complete quality view requires both:

```text
wrong → correct
correct → correct
```

and should expose:

```text
correct → wrong
wrong → wrong
```

as separate failure states.

**Adoption status:** not decided.

---

# 9. The strongest 2024 critical survey identifies feedback generation as the central bottleneck

## Evidence / observed practice

The TACL 2024 critical survey synthesizes prior work and concludes, for the literature it reviewed, that:

- general reliable intrinsic self-correction using only prompted LLM feedback had not been convincingly demonstrated under fair conditions,
- tasks with special self-correctable structure can be exceptions,
- self-correction works well when reliable external feedback is available,
- large-scale fine-tuning can enable stronger correction.

The survey identifies **feedback generation** as the main bottleneck.

Source:

- Kamoi et al., TACL 2024

## Important temporal qualification

This survey evaluates literature available through its 2024 review period. Later work such as NeurIPS 2025 CorrectBench reports broader positive gains from several correction methods.

Therefore the survey should not be interpreted as a permanent theorem that prompted self-correction can never work.

The durable lesson is the need to identify **where the corrective information comes from** and whether the evaluator can reliably identify the actual defect.

**Adoption status:** not decided.

---

# 10. NeurIPS 2025 CorrectBench gives a more current mixed picture

## Evidence / observed practice

`Can LLMs Correct Themselves? A Benchmark of Self-Correction in LLMs`, NeurIPS 2025 Datasets and Benchmarks Track, systematically compares:

- intrinsic correction,
- external correction,
- fine-tuned correction,
- mixtures of correction strategies,
- strong baselines such as Chain-of-Thought.

The benchmark covers:

- commonsense reasoning,
- mathematical reasoning,
- code generation,
- 7 subdatasets,
- 3,825 question-answer pairs in its base collection,
- 11 representative correction methods,
- instruction-following and reasoning models.

The project reports that self-correction can improve accuracy, especially on complex mathematical reasoning, including about a 5.2% gain on MATH in the highlighted result.

However:

- gains are inconsistent across tasks,
- mixtures of correction strategies have substantial runtime cost (reported around 40% slower in the highlighted comparison),
- a comparatively simple CoT baseline remains competitive in accuracy / efficiency,
- reasoning models such as DeepSeek-family reasoning models have limited additional optimization from added correction layers and high time cost.

Sources:

- Tie et al., `Can LLMs Correct Themselves? A Benchmark of Self-Correction in LLMs`, NeurIPS 2025
  - https://proceedings.nips.cc/paper_files/paper/2025/hash/ec07904adc847a45f53dceb44078f8f0-Abstract-Datasets_and_Benchmarks_Track.html
  - https://correctbench.github.io/

## Knowledge captured

The modern evidence does not support either extreme:

```text
"self-review never helps"
```

or

```text
"self-review is a dependable general verifier"
```

Instead, gains depend on:

- model type,
- task,
- correction strategy,
- available feedback,
- compute budget,
- baseline quality.

**Adoption status:** not decided.

---

# 11. 2026 tool-agent evidence: models are worse at reflecting on their own tool-use mistakes than critiquing dialogues externally

## Evidence / observed practice

ReflecTool-Bench, Findings ACL 2026, evaluates self-reflection in tool-augmented multi-turn dialogues.

The benchmark contains:

- 10 domains,
- 88 APIs,
- 968 annotated dialogues,
- multiple injected error types from users and assistants,
- 12 state-of-the-art open and closed models.

It explicitly separates:

- **Critique task** — diagnose errors in a third-party dialogue,
- **Self-Reflection task** — detect and repair the model's own prior tool-use mistakes.

The authors report:

- models are relatively reliable at identifying user-originated errors,
- assistant-originated errors are substantially harder,
- performance drops sharply when moving from external critique to self-reflection.

Source:

- Liu et al., `Do LLMs Catch Their Own Mistakes? A Comprehensive Benchmark for Reflective Tool Use LLMs`, Findings ACL 2026
  - https://aclanthology.org/2026.findings-acl.86/

## Knowledge captured

The identity / provenance of the error matters.

The same general reasoning machinery can behave differently when the candidate being reviewed is perceived as:

```text
someone else's dialogue
```

versus

```text
my own previous action
```

This weakens the assumption that a model instance reviewing its own trajectory is equivalent to an independent review of that trajectory.

**Adoption status:** not decided.

---

# 12. A self-correction blind spot has been directly measured in controlled experiments

## Evidence / observed practice

`Self-Correction Bench: Uncovering and Addressing the Self-Correction Blind Spot in Large Language Models` is a 2025 preprint that tests the same injected error under two attribution conditions:

- the error is presented as external input,
- the identical error appears in the model's own output.

Across 14 open-source non-reasoning models, the paper reports an average 64.5% self-correction blind-spot rate.

It reports a simple correction marker / trigger using `Wait` that reduces the measured blind spot by 89.3% in its setup, suggesting that at least part of the capability can be latent but not naturally activated during self-evaluation.

Source:

- Tsui, `Self-Correction Bench: Uncovering and Addressing the Self-Correction Blind Spot in Large Language Models`, arXiv 2025
  - https://arxiv.org/abs/2507.02778

## Evidence strength / limitations

This is a preprint, not an archival peer-reviewed conference source in the evidence checked during this pass.

Important limitations include:

- 14 open-source non-reasoning models,
- controlled injected-error tasks,
- the exact 64.5% / 89.3% figures are benchmark-specific,
- later reasoning-model behavior may differ.

## Knowledge captured

The result supports a distinct possible failure class:

```text
model has enough capability to recognize the error externally
+
model previously generated the error
→
self-attribution suppresses / fails to trigger correction
```

This is not simply lack of knowledge.

**Adoption status:** not decided.

---

# 13. 2026 coding preprint directly finds same-model self-review silently endorsing semantic drift

## Evidence / observed practice

`Articulate but Wrong: Self-Review Failures in LLM-Based Code Modernization` is a May 2026 software-engineering preprint.

It runs:

- 1,980 modernization calls,
- 11 production LLMs,
- 7 model families,
- 60 legacy Python 2 snippets,
- a type-strict behavioral oracle.

The task modernizes Python 2 code to Python 3 while preserving observable behavior.

Reported results include:

- semantic-trap drift in 39.7% of attempts vs 7.0% on benign controls,
- 262 detected semantic-drift cases,
- the producing model silently endorses 83 / 262 of its own drift cases as behavior-preserving: **31.7%**,
- per-model self-miss behavior is highly bimodal, from effectively 0% for several models to 100% for one tested model,
- some models explicitly describe the exact Python 2 / Python 3 semantic distinction that caused the bug and then still conclude that behavior was preserved.

Sources:

- Reddy, Lolla, Sanku, `Articulate but Wrong: Self-Review Failures in LLM-Based Code Modernization`, arXiv 2026
  - https://arxiv.org/abs/2605.21537
- reproducibility package
  - https://zenodo.org/records/20300861

## Evidence strength / limitations

This is a recent preprint and a narrowly defined modernization task.

Its relevance is high for software-development assurance because the final correctness label is supplied by an executable behavioral oracle rather than by the model's prose explanation.

## Knowledge captured

A particularly important failure is:

```text
model can articulate the relevant rule / semantic distinction
→ model nevertheless gives the wrong final review verdict
```

Therefore:

```text
"the reviewer mentioned the right concern"
≠
"the reviewer correctly judged the artifact"
```

Natural-language sophistication is not reliable evidence of correctness.

**Adoption status:** not decided.

---

# 14. 2026 RiddleBench reports self-confirmation bias and hallucination cascades

## Evidence / observed practice

RiddleBench, Findings EACL 2026, evaluates 1,737 challenging generative reasoning puzzles.

The authors report:

- poor self-correction associated with strong self-confirmation bias,
- hallucination cascades where models accept flawed peer reasoning,
- fragility under constraint reordering and irrelevant information.

Source:

- Halder et al., `RiddleBench: A New Generative Reasoning Benchmark for LLMs`, Findings EACL 2026
  - https://aclanthology.org/2026.findings-eacl.228/

## Knowledge captured

Review / reflection can inherit the original reasoning trajectory instead of independently reassessing it.

This suggests a correlated-error mechanism:

```text
initial reasoning contains a wrong premise
→ later reflection conditions on that premise
→ review elaborates / defends the same path
→ confidence grows without independent evidence
```

**Adoption status:** not decided.

---

# 15. External tool feedback repeatedly improves correction reliability

## Evidence / observed practice

CRITIC, ICLR 2024, explicitly lets an LLM use external tools to validate and revise outputs.

Examples include:

- search / knowledge tools for factual checking,
- code execution / program feedback,
- task-specific external checks.

The paper reports consistent improvements on its evaluated free-form QA, mathematical program synthesis, and toxicity-reduction settings, and emphasizes the importance of external feedback.

Source:

- Gou et al., `CRITIC: Large Language Models Can Self-Correct with Tool-Interactive Critiquing`, ICLR 2024
  - https://proceedings.iclr.cc/paper_files/paper/2024/hash/fef126561bbf9d4467dbb8d27334b8fe-Abstract-Conference.html

## Knowledge captured

The phrase `self-correct` can describe a pipeline where the **LLM performs the repair but an external system supplies evidence**.

That is materially stronger than asking the LLM to create both the claim and the evidence for the claim.

A useful distinction is:

```text
same-model review with no new evidence
```

versus

```text
same-model repair driven by independent evidence
```

**Adoption status:** not decided.

---

# 16. Agent reflection is much stronger when tied to environment feedback

## Evidence / observed practice

Reflexion, NeurIPS 2023, lets language agents reflect in natural language on task feedback and preserve reflective text in episodic memory for later attempts.

It supports feedback from different sources, including external task signals and internally simulated feedback.

The paper reports substantial improvements across sequential decision-making, coding, and reasoning tasks. One highlighted result is 91% pass@1 on HumanEval in its setup compared with an 80% GPT-4 baseline cited by the paper.

Source:

- Shinn et al., `Reflexion: Language Agents with Verbal Reinforcement Learning`, NeurIPS 2023
  - https://papers.nips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html

## Knowledge captured

Reflection can be useful as a **memory / learning interface for external outcome signals**.

The result should not be simplified into:

> "An agent can always detect its own mistake by thinking about it again."

A central part of Reflexion is the existence of task feedback that the reflection can explain and convert into a future policy / memory update.

**Adoption status:** not decided.

---

# 17. Software / hardware case study: executable functional validation can power effective LLM repair

## Evidence / observed practice

A different paper also named CorrectBench, published at DATE 2025, generates hardware testbenches and validates them through functional simulation.

The framework reports:

- functional validation correctness around 88.85%,
- an LLM corrector that receives bug information from the validation step,
- 70.13% final pass ratio across evaluated tasks,
- compared with 52.18% for the previous LLM-based testbench framework and 33.33% for direct generation.

Source:

- Qiu et al., `CorrectBench: Automatic Testbench Generation with Functional Self-Correction using LLMs for HDL Design`, DATE 2025
  - DOI: 10.23919/DATE64628.2025.10992873
  - https://portal.fis.tum.de/en/publications/correctbench-automatic-testbench-generation-with-functional-self-/
  - https://github.com/AutoBench/CorrectBench

## Knowledge captured

This is another example where the reliable component is not free-form introspection alone.

The pipeline is closer to:

```text
LLM generates artifact
→ executable simulator produces evidence
→ defect information is fed back
→ LLM repairs artifact
```

This supports the research distinction between **self-repair** and **self-verification**.

An LLM may be a useful repair engine while an external execution environment provides the trusted defect signal.

**Adoption status:** not decided.

---

# 18. Same-model review should not be assumed independent from the original generation

## Evidence synthesis

Several sources point toward correlated failure rather than independent second-check behavior:

- ReflecTool-Bench: critique of third-party dialogues is easier than self-reflection on own mistakes.
- Self-Correction Blind Spot: identical errors are harder to correct when attributed to the model's own output.
- RiddleBench: self-confirmation bias and continuation of flawed reasoning.
- Articulate but Wrong: same producing model silently endorses a substantial fraction of behavior-changing code defects.
- Huang / Stechly: repeated intrinsic critique can reduce reasoning performance.

## Knowledge captured

If two checks share the same model, same context, same representation, and same reasoning trajectory, their errors may be correlated.

Therefore the simple reliability intuition:

```text
first pass misses with probability p
second self-review also misses with probability p
therefore combined miss probability ≈ p²
```

is not justified without evidence of independence.

The second pass can inherit:

- the same blind spot,
- the same false premise,
- the same model prior,
- the same interpretation of the requirement,
- the same semantic misunderstanding,
- commitment to the model's previous output.

No quantitative independence model is adopted here.

**Adoption status:** not decided.

---

# 19. Review quality needs stage-level measurement rather than one "self-review passed" flag

## Evidence synthesis

Across Tyen et al., ReflecTool-Bench, Confidence-vs-Critique, DeCRIM from prior multi-constraint research, and coding examples, the self-review pipeline can be decomposed into at least:

1. **Defect existence detection** — is anything wrong?
2. **Localization** — where is it wrong?
3. **Classification** — what kind of rule / error is involved?
4. **Diagnosis** — why is it wrong?
5. **Repair proposal** — what should change?
6. **Repair realization** — did the model actually make the intended change?
7. **Regression preservation** — did it keep previously correct properties?
8. **Post-repair verification** — is the final state genuinely correct?

## Knowledge captured

A fluent review can fail in many combinations:

```text
detects problem + wrong diagnosis
correct diagnosis + wrong repair
correct repair + breaks another constraint
mentions correct rule + wrong final verdict
fixes wrong answer + corrupts another correct answer
```

One aggregate `reviewed: true` field can hide these states.

**Adoption status:** not decided.

---

# 20. Natural-language critique quality is not equivalent to assurance evidence

## Evidence / observed practice

The strongest direct example in this pass is `Articulate but Wrong`, where models can explicitly articulate the semantic distinction that invalidates their migration and still return a false "behavior preserved" judgment.

Stechly et al. similarly report that the content of self-criticism is not sufficient to produce reliable bottom-line reasoning gains, while a sound verifier materially improves outcomes.

Sources:

- Reddy et al., arXiv 2026
- Stechly et al., ICLR 2025

## Knowledge captured

The following signals are weak by themselves:

- long critique,
- technical vocabulary,
- explicit mention of relevant rules,
- confident conclusion,
- structured checklist prose,
- explanation of possible failure modes.

A review can sound like an audit while still producing the wrong verdict.

This is directly relevant to the later `LLM checked it / thinks it checked it` research question.

**Adoption status:** not decided.

---

# 21. Repeated review has cost and diminishing / non-monotonic benefit

## Evidence / observed practice

CorrectBench 2025 emphasizes that combining correction strategies can improve accuracy while increasing execution cost substantially. It reports competitive accuracy / efficiency from a simpler CoT baseline in several comparisons and limited additional optimization for reasoning models.

Other negative-result papers show that repeated intrinsic critique can also regress correct answers.

Sources:

- Tie et al., NeurIPS 2025
- Huang et al., ICLR 2024
- Zhang et al., ACL 2025 Dark Side

## Knowledge captured

A future reliability system should not assume:

```text
more review rounds
→ monotonically higher correctness
```

Potential costs include:

- latency,
- token / inference cost,
- extra opportunities for regression,
- context growth,
- self-confirmation loops,
- reviewer fatigue analogues at the agent level,
- increasing difficulty determining which version has valid evidence.

**Adoption status:** not decided.

---

# 22. Different tasks have very different self-review affordances

## Evidence synthesis

Positive self-refinement results are common in tasks where quality can be inspected / modified directly in the generated artifact, such as:

- tone,
- style,
- readability,
- formatting,
- decomposable response criteria.

Harder negative results cluster around hidden or externally grounded correctness properties such as:

- mathematical / logical validity,
- planning validity,
- semantic preservation,
- tool-call state correctness,
- behavioral equivalence,
- factual correctness requiring external evidence.

This distinction is reflected across:

- Self-Refine,
- TACL critical survey,
- Huang et al.,
- Tyen et al.,
- Stechly et al.,
- CRITIC,
- ReflecTool-Bench,
- Articulate but Wrong.

## Knowledge captured

Self-review reliability is likely property-dependent.

A model may be a useful reviewer for:

```text
"this paragraph is too verbose"
```

while being an unreliable verifier for:

```text
"this migration preserves every observable behavior"
```

or:

```text
"every applicable repository rule was actually applied"
```

No rule-class mapping is adopted yet.

---

# 23. Current failure taxonomy for self-review

## A. Detection blindness

```text
defect exists
→ reviewer does not notice it
```

Evidence:

- Tyen et al.
- ReflecTool-Bench
- Self-Correction Blind Spot

## B. Self-attribution / ownership bias

```text
same defect is detectable externally
→ harder when it is the model's own output
```

Evidence:

- ReflecTool-Bench
- Self-Correction Blind Spot

## C. Self-confirmation / trajectory lock-in

```text
initial wrong reasoning
→ review reuses same premise
→ wrong conclusion is reinforced
```

Evidence:

- RiddleBench
- Dark Side

## D. Correct-answer regression

```text
correct answer
→ review prompt induces doubt / change
→ incorrect revised answer
```

Evidence:

- Huang et al.
- Confidence vs Critique
- Dark Side

## E. Diagnosis–verdict mismatch

```text
review names the correct issue
→ final verdict is still wrong
```

Evidence:

- Articulate but Wrong

## F. Repair failure after correct detection

```text
problem found
→ repair is incomplete / incorrect
```

Evidence:

- general multi-stage findings in ReflecTool-Bench and correction literature

## G. Regression during repair

```text
one defect repaired
→ previously correct property breaks
```

Evidence:

- Confidence vs Critique trade-off
- broader iterative correction negative results

## H. Feedback fabrication / wrong critic signal

```text
same model invents its own feedback
→ feedback itself is incorrect
→ refinement follows wrong signal
```

Evidence:

- TACL survey feedback-generation bottleneck
- Stechly et al.

## I. Context-induced review bias

```text
"check again" prompt
→ suggests error / changes prior
→ unstable answer
```

Evidence:

- Dark Side

## J. Correlated second-check failure

```text
same generator + same reviewer model
→ shared blind spot
→ second check is not independent
```

Evidence synthesis:

- ReflecTool-Bench
- Self-Correction Blind Spot
- Articulate but Wrong
- RiddleBench

## K. Cost / loop saturation

```text
more rounds
→ greater compute
→ limited gain or regression
```

Evidence:

- CorrectBench 2025
- Huang et al.

---

# 24. Possible mechanisms observed in the literature — not recommendations

Per the Research Capture Policy, these are retained before feasibility / adoption filtering.

## Prompt / orchestration layer

- ask for explicit critique before rewrite,
- separate critique and repair prompts,
- require defect localization before modification,
- repeat / re-anchor the original question or specification,
- use correction markers such as `Wait` to activate reconsideration,
- preserve a copy of the pre-review artifact for regression comparison,
- run multiple candidate repairs,
- use external execution / tests / search / compiler feedback,
- feed exact failing checks rather than generic "try again" prompts,
- stop review loops when no new evidence is introduced,
- compare own-output critique with a fresh-context critique,
- separate review of third-party representation from self-attributed representation.

## External verification layer

- executable tests,
- simulators,
- compilers,
- solvers,
- factual search / authoritative references,
- deterministic validators,
- task-specific oracles,
- dedicated error-localization classifiers.

## Training layer

- supervised correction examples,
- fine-tuned critic models,
- fine-tuned refiners,
- outcome-feedback training,
- process / step-level verifier training,
- training data containing explicit mid-stream correction trajectories.

## Agent memory layer

- record environment feedback,
- produce reflection tied to that feedback,
- persist successful failure explanations for future trials,
- invalidate / replace reflections when later evidence proves them wrong.

All remain research mechanisms.

---

# 25. Current feasibility / missing-capability notes

## Currently conceivable at application level

A repository-based development workflow could technically implement some mechanisms today, such as:

- rerunning deterministic tests after model review,
- comparing before / after output,
- asking the model to identify individual failed obligations,
- feeding compiler / test errors back for repair,
- keeping failed checks as structured state,
- requiring revalidation after repair.

This section is not an adoption decision.

## Expensive / unavailable / organizationally heavier

Other research mechanisms may require:

- independent fine-tuned verifier models,
- model weight access,
- dedicated correction training,
- large correction datasets,
- process reward models,
- formal behavioral specifications,
- semantic equivalence oracles,
- expensive multi-sample / multi-agent inference,
- external sandbox environments for every relevant rule.

Current unavailability is not a reason to erase these mechanisms.

---

# 26. Negative results / cautions that should remain visible

1. **Intrinsic self-correction can reduce reasoning accuracy.**
   - Huang et al., ICLR 2024.

2. **Self-critique can collapse on planning / reasoning even when a sound external verifier succeeds.**
   - Stechly et al., ICLR 2025.

3. **Error detection can be much weaker than error repair once the location is supplied.**
   - Tyen et al., Findings ACL 2024.

4. **Asking a model to review itself can cause answer wavering and prompt bias.**
   - Dark Side, ACL 2025.

5. **Increasing critique aggressiveness can trade off against preservation of correct answers.**
   - Confidence vs Critique, ACL 2025.

6. **Own assistant-originated errors can be harder to identify than external / user-originated errors.**
   - ReflecTool-Bench, Findings ACL 2026.

7. **A controlled self-correction blind spot has been reported across 14 open non-reasoning models.**
   - Tsui 2025 preprint.

8. **Same producing model can silently approve semantically wrong code.**
   - Articulate but Wrong, 2026 preprint.

9. **A model can explain the correct semantic issue but still return the wrong review verdict.**
   - Articulate but Wrong.

10. **Reflection can reinforce its initial reasoning rather than independently reassess it.**
    - RiddleBench / self-confirmation evidence.

11. **Multiple review methods can improve results but cost can become large and gains can be inconsistent.**
    - CorrectBench 2025.

12. **A sophisticated critique is not equivalent to an independent correctness signal.**
    - Stechly et al. + coding oracle evidence.

13. **Positive Self-Refine results do not justify treating same-model review as a universal assurance layer.**

14. **External evidence repeatedly changes the picture.**
    - CRITIC, Reflexion, sound verifier experiments, functional simulation.

---

# 27. Current working interpretations for `web-project-guide` — not adoption decisions

These are hypotheses to preserve for later comparison only.

## H1. Same-model self-review should not automatically count as an independent barrier

The evidence shows correlated and self-attributed error modes. A second pass by the same model may add value, but its independence cannot be assumed.

## H2. The most fragile stage may be detecting the omitted Rule, not fixing it

Tyen et al. strongly supports a detect-vs-repair separation. For a Rule system, this suggests the hard problem can be recognizing that an obligation was missed.

## H3. "Model cited the rule" is weak evidence

A model can articulate the exact relevant technical distinction and still reach an incorrect verdict.

## H4. Review must measure regression as well as repair

Any future experiment should count both wrong→correct and correct→wrong transitions.

## H5. External evidence may be more valuable than additional introspective prose

Compiler/test/solver/search feedback repeatedly provides stronger correction signals than free-form self-critique in objective domains.

## H6. Self-review utility will probably vary by Rule class

Formatting / style / decomposable surface constraints may be easier to self-review than semantic behavior / factual / hidden-state / cross-file / external-system constraints.

## H7. A review receipt saying "checked" would not prove the check was correct

This topic directly motivates the later research question on false-completion and evidence receipts.

## H8. Repair and verification may need separate roles even if both use LLMs

The LLM can be useful for generating repairs after a reliable signal without being trusted as the source of that signal.

## H9. Iterative review creates evidence invalidation problems

If a review changes an artifact, evidence collected before the modification may no longer apply. This connects to the broader research on change-triggered evidence invalidation.

## H10. A future Guide experiment should compare at least three conditions

Potential research-only experiment structure:

```text
A. no review
B. same-model self-review with no new evidence
C. review / repair driven by independent machine-checkable evidence
```

No such experiment is adopted or implemented by this file.

---

# 28. Evidence map

| Claim | Main evidence | Evidence status | Current confidence | Important limitation |
|---|---|---|---|---|
| Same-model iterative refinement can improve some tasks | Self-Refine | NeurIPS 2023 peer-reviewed | High for evaluated tasks | task/evaluator-dependent; not independent correctness verification |
| Intrinsic reasoning self-correction can degrade accuracy | Huang et al. | ICLR 2024 peer-reviewed | High for tested reasoning setups | older model generations / selected tasks |
| Error localization is a major bottleneck; correction improves when location is supplied | Tyen et al. | Findings ACL 2024 peer-reviewed | High | five reasoning tasks; ground-truth localization experiment |
| Reliable external verification can outperform self-critique sharply | Stechly et al. | ICLR 2025 peer-reviewed | High for tested planning/reasoning tasks | GPT-4 + three formal domains |
| Intrinsic review can cause wavering / prompt / cognitive bias | Dark Side | ACL 2025 peer-reviewed | Moderate–High | four task families; mitigation results model-dependent |
| Preserve-correct and repair-wrong are distinct and can trade off | Confidence vs Critique | ACL 2025 peer-reviewed | High | metrics/tasks benchmark-specific |
| Correction methods can yield current-model gains but with inconsistent efficiency | CorrectBench | NeurIPS 2025 peer-reviewed benchmark | High for evaluated benchmark | heterogeneous methods; not specifically repository compliance |
| Models are worse at own tool-error reflection than third-party critique | ReflecTool-Bench | Findings ACL 2026 peer-reviewed | High | 968 dialogues / 88 APIs; benchmarked tool setting |
| Self-attribution blind spot can be large | Self-Correction Bench | 2025 preprint | Moderate emerging | open non-reasoning models; controlled tasks |
| Same producing model can silently endorse behavioral code drift | Articulate but Wrong | 2026 preprint + executable oracle | Moderate–High emerging | narrow Python2→3 modernization task; preprint |
| Self-confirmation can impair correction | RiddleBench | Findings EACL 2026 peer-reviewed | Moderate–High | puzzle reasoning domain |
| Tool-interactive external critique can improve correction | CRITIC | ICLR 2024 peer-reviewed | High for tested tasks | depends on availability / correctness of tools |
| Reflection with task feedback can improve agent retries | Reflexion | NeurIPS 2023 peer-reviewed | High for tested agent tasks | feedback signal quality is a major dependency |
| Executable functional validation can drive effective LLM repair in code-like artifacts | DATE CorrectBench | DATE 2025 peer-reviewed | High for evaluated HDL testbench setting | specialized hardware domain |
| Positive critique prose is not proof of a correct final verdict | Articulate but Wrong + Stechly | mixed peer-reviewed/preprint | Moderate–High | direct strongest coding source is preprint |

---

# 29. Source register

## Core reviews / negative-result sources

1. Ryo Kamoi, Yusen Zhang, Nan Zhang, Jiawei Han, Rui Zhang — `When Can LLMs Actually Correct Their Own Mistakes? A Critical Survey of Self-Correction of LLMs`
   - TACL 2024
   - https://aclanthology.org/2024.tacl-1.78/

2. Jie Huang et al. — `Large Language Models Cannot Self-Correct Reasoning Yet`
   - ICLR 2024
   - https://proceedings.iclr.cc/paper_files/paper/2024/hash/8b4add8b0aa8749d80a34ca5d941c355-Abstract-Conference.html

3. Gladys Tyen et al. — `LLMs cannot find reasoning errors, but can correct them given the error location`
   - Findings ACL 2024
   - https://aclanthology.org/2024.findings-acl.826/

4. Kaya Stechly, Karthik Valmeekam, Subbarao Kambhampati — `On the Self-Verification Limitations of Large Language Models on Reasoning and Planning Tasks`
   - ICLR 2025
   - https://mlanthology.org/iclr/2025/stechly2025iclr-selfverification/

5. Qingjie Zhang et al. — `Understanding the Dark Side of LLMs' Intrinsic Self-Correction`
   - ACL 2025
   - https://aclanthology.org/2025.acl-long.1314/

6. Zhe Yang et al. — `Confidence v.s. Critique: A Decomposition of Self-Correction Capability for LLMs`
   - ACL 2025
   - https://aclanthology.org/2025.acl-long.203/

## Positive / comparative self-refinement sources

7. Aman Madaan et al. — `Self-Refine: Iterative Refinement with Self-Feedback`
   - NeurIPS 2023
   - https://proceedings.neurips.cc/paper_files/paper/2023/hash/91edff07232fb1b55a505a9e9f6c0ff3-Abstract-Conference.html

8. Noah Shinn et al. — `Reflexion: Language Agents with Verbal Reinforcement Learning`
   - NeurIPS 2023
   - https://papers.nips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html

9. Zhibin Gou et al. — `CRITIC: Large Language Models Can Self-Correct with Tool-Interactive Critiquing`
   - ICLR 2024
   - https://proceedings.iclr.cc/paper_files/paper/2024/hash/fef126561bbf9d4467dbb8d27334b8fe-Abstract-Conference.html

10. Guiyao Tie et al. — `Can LLMs Correct Themselves? A Benchmark of Self-Correction in LLMs`
    - NeurIPS 2025 Datasets and Benchmarks
    - https://proceedings.nips.cc/paper_files/paper/2025/hash/ec07904adc847a45f53dceb44078f8f0-Abstract-Datasets_and_Benchmarks_Track.html
    - https://correctbench.github.io/

## Current self-reflection / ownership-bias sources

11. Zheyuan Liu et al. — `Do LLMs Catch Their Own Mistakes? A Comprehensive Benchmark for Reflective Tool Use LLMs`
    - Findings ACL 2026
    - https://aclanthology.org/2026.findings-acl.86/

12. Deepon Halder et al. — `RiddleBench: A New Generative Reasoning Benchmark for LLMs`
    - Findings EACL 2026
    - https://aclanthology.org/2026.findings-eacl.228/

13. Ken Tsui — `Self-Correction Bench: Uncovering and Addressing the Self-Correction Blind Spot in Large Language Models`
    - 2025 preprint
    - https://arxiv.org/abs/2507.02778

14. Gokul Chandra Purnachandra Reddy, Aditya Lolla, Harsha Sanku — `Articulate but Wrong: Self-Review Failures in LLM-Based Code Modernization`
    - 2026 preprint
    - https://arxiv.org/abs/2605.21537
    - https://zenodo.org/records/20300861

## Executable software-validation case study

15. Ruidi Qiu, Grace Li Zhang, Rolf Drechsler, Ulf Schlichtmann, Bing Li — `CorrectBench: Automatic Testbench Generation with Functional Self-Correction using LLMs for HDL Design`
    - DATE 2025
    - DOI: 10.23919/DATE64628.2025.10992873
    - https://portal.fis.tum.de/en/publications/correctbench-automatic-testbench-generation-with-functional-self-/
    - https://github.com/AutoBench/CorrectBench

---

# 30. Research gaps deliberately left open

This file should not be treated as the complete verification research program.

The next adjacent questions remain open:

- **independent verifier / judge reliability**,
- same-model critic vs cross-model critic under controlled equal-capability conditions,
- whether cross-model diversity actually reduces correlated error,
- LLM-as-a-judge bias / position bias / self-preference,
- evaluator false-positive / false-negative rates,
- deterministic / symbolic verifier limits,
- combining deterministic and semantic verification,
- multi-agent review and debate negative results,
- whether reviewers collude / converge on shared misconceptions,
- evidence receipts and whether requiring citations / artifacts improves detection,
- false claims such as "I checked the file / test / requirement" without evidence,
- stale evidence after repair,
- review of long-context outputs,
- review under many simultaneous constraints,
- review of hierarchical / conflicting rules,
- review of repository-level coding-agent adherence,
- `AGENTS.md` / nested instruction-file compliance,
- whether a fresh-context same model is materially more independent than the same conversation instance,
- whether changing model family is more valuable than changing prompt,
- when human review remains necessary,
- severity-weighted review strategies,
- formal assurance cases for verifier trust.

---

# 31. Current research stopping point

For this theme, the evidence is sufficient to preserve several independent conclusions without moving into adoption:

1. same-model iterative refinement can improve outputs in some task regimes;
2. intrinsic self-correction is not reliably beneficial on reasoning tasks and can cause correct-answer regression;
3. error detection / localization can be much weaker than error repair once the defect is identified;
4. self-critique is not equivalent to sound verification;
5. reliable external feedback from tools, tests, simulators, solvers, or other trusted sources repeatedly improves correction results;
6. preserving correct answers and repairing wrong answers are separate capabilities that can trade off;
7. modern 2025 benchmark evidence shows correction methods still have real gains, but gains are task/model dependent and can be inefficient;
8. 2026 tool-use evidence shows models are substantially worse at reflecting on their own assistant-originated mistakes than critiquing external errors;
9. controlled and applied studies both report self-attribution / self-review blind spots;
10. same-model review errors should not be assumed independent of the original generation errors;
11. fluent critique or correct terminology does not prove a correct final verdict;
12. same-model self-review is therefore not established by current evidence as a standalone high-assurance barrier;
13. this does not imply self-review has no value — it can be a useful improvement / repair mechanism, especially when driven by reliable external evidence;
14. the reliability of an **independent verifier / judge** remains a separate next research question.

This is enough to stop this single theme without selecting a final Guide design.

**No Common Rule, Router behavior, Gate, Validator requirement, mandatory reviewer separation, review-count requirement, verifier architecture, or adoption decision is created by this file.**