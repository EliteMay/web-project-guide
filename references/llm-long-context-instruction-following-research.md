# LLM Long-Context Instruction Following Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**.
- Adoption status for all mechanisms below: **not decided**, unless explicitly stated otherwise.
- Research policy for this file is high-recall first: mechanisms are preserved even when they require model retraining, model internals, expensive inference, multiple agents, dedicated evaluators, or capabilities not currently available in this project.

## Research Question

Why do LLMs and LLM-based agents miss, forget, or violate instructions and rules as context becomes longer?

This first research pass intentionally focuses on **long-context instruction following and context-length-related failure**. It does not yet attempt to complete the separate research topics of conflicting instructions, hierarchy resolution, same-model self-review, independent judges, multi-agent verification, repository-level coding-agent compliance, or final rule-system design.

The project-relevant failure class is broader than ordinary factual retrieval:

```text
A rule exists somewhere in the available context
+ the model is technically able to accept that context
≠ the model will reliably find, preserve, reason over, and obey that rule
```

---

# 1. Advertised context-window size is not the same as effective usable context

## Evidence / observed practice

The 2024 RULER benchmark was created because vanilla Needle-in-a-Haystack tests mainly measure a relatively simple retrieval capability. RULER expands evaluation to multiple needles, multi-hop tracing, aggregation, and other tasks whose complexity can be varied together with sequence length.

The paper evaluates 17 long-context models across 13 representative tasks. Despite near-perfect vanilla NIAH results, almost all models suffer substantial degradation as context length increases. The paper reports that although all tested long-context models claimed at least 32K context, only about half maintained satisfactory performance at 32K under the broader RULER evaluation.

The maintained NVIDIA RULER repository continues to describe the benchmark as measuring **effective context length** rather than simply repeating a vendor-declared context limit, and its current result table includes later models as well.

Sources:

- RULER paper, `RULER: What's the Real Context Size of Your Long-Context Language Models?`
  - https://arxiv.org/abs/2404.06654
- NVIDIA RULER repository
  - https://github.com/NVIDIA/RULER

## Knowledge captured

A context-window declaration answers approximately:

> How many tokens can be accepted?

It does **not** by itself answer:

> How much context can be used reliably for the actual reasoning, aggregation, instruction-following, and multi-constraint task?

A simple successful lookup from a large prompt therefore cannot be generalized into evidence that all rules in that prompt are reliably usable.

**Possible implication for `web-project-guide`:** a future design should not assume that “the model received every Owner Doc” is equivalent to “the model can reliably apply every relevant rule.” This is only a research implication, not an adopted Rule.

**Adoption status:** not decided.

---

# 2. Relevant information can become position-sensitive: Lost in the Middle

## Evidence / observed practice

Liu et al. (`Lost in the Middle`, TACL 2024) evaluate multi-document question answering and key-value retrieval while changing where relevant information appears in a long input.

They find that model performance can change substantially based only on the location of the relevant information. Performance is often strongest near the beginning or end of the context and weaker when the relevant information appears in the middle. The effect also appears in models explicitly designed for long context.

Hsieh et al. (`Found in the middle`, Findings ACL 2024) provide a mechanistic interpretation: models display a U-shaped positional attention bias in which tokens near the beginning and end receive greater attention regardless of relevance. Their calibration method attempts to compensate for that positional bias and improves long-context retrieval / RAG performance in their experiments.

Sources:

- Liu et al., `Lost in the Middle: How Language Models Use Long Contexts`, TACL 2024
  - https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00638/119630/Lost-in-the-Middle-How-Language-Models-Use-Long
  - https://transacl.org/index.php/tacl/article/view/5757
- Hsieh et al., `Found in the middle: Calibrating Positional Attention Bias Improves Long Context Utilization`, Findings ACL 2024
  - https://aclanthology.org/2024.findings-acl.890/
  - Google Research summary: https://research.google/pubs/found-in-the-middle-calibrating-positional-attention-bias-improves-long-context-utilization/

## Knowledge captured

“Available in context” is not position-neutral.

A long rule document can therefore create at least this failure path:

```text
Rule is present
→ Rule is buried in a weakly used position
→ Retrieval / attention to the rule is degraded
→ downstream reasoning never receives a strong representation of the rule
→ apparent rule omission
```

This is especially relevant to any future scheme that simply concatenates many rule files into one large prompt.

## Important limitation / negative evidence

The exact classic U-shaped Lost-in-the-Middle curve is **not universal**.

Veseli et al. (`Positional Biases Shift as Inputs Approach Context Window Limits`, COLM 2025) explicitly note that later long-context studies have not always reproduced the same positional pattern. Their experiments normalize input length relative to each model's context limit and report that Lost-in-the-Middle is strongest when inputs use up to roughly half of the available context. As the input approaches the full context limit, primacy weakens while recency remains more stable, yielding more of a distance-from-the-end bias than a clean U-shape.

Source:

- Veseli et al., `Positional Biases Shift as Inputs Approach Context Window Limits`
  - https://arxiv.org/abs/2508.07479
  - https://github.com/bveseli/positional-bias-shift

## Knowledge captured from the disagreement

The safe research conclusion is not:

> “The middle is always bad.”

It is:

> **Long-context use is position-sensitive, the shape depends on model and relative context occupancy, and a fixed positional heuristic is unlikely to be universally reliable.**

Therefore a future system that always places “important rules at the beginning” may still be incomplete; the positional failure mode itself changes with context conditions.

**Adoption status:** not decided.

---

# 3. Long-context instruction following itself degrades, not only factual retrieval

## Evidence / observed practice

LIFBench (`Evaluating the Instruction Following Performance and Stability of Large Language Models in Long-Context Scenarios`, ACL 2025) directly evaluates long-context instruction following rather than only retrieval.

LIFBench contains:

- 3 long-context scenarios,
- 11 tasks,
- 2,766 instructions,
- controlled expansion along length, expression, and variables,
- evaluation across 20 prominent LLMs,
- input lengths of 4K, 8K, 16K, 32K, 64K, and 128K tokens.

The paper reports that most models' overall instruction-following performance declines as input length increases, with particularly visible degradation beyond roughly 16K or 32K in many models. Stability also generally worsens in longer contexts.

The degradation is capability-dependent rather than uniform. Formatting-related requirements are relatively stable for many tested models, while recognition-related requirements show sharper decline. Different models also have materially different sensitivity profiles.

Source:

- Wu et al., `LIFBench: Evaluating the Instruction Following Performance and Stability of Large Language Models in Long-Context Scenarios`, ACL 2025
  - https://aclanthology.org/2025.acl-long.803/

## Knowledge captured

Instruction adherence cannot be represented as a single stable model capability independent of:

- input length,
- instruction type,
- expression form,
- variables,
- model family,
- evaluation scenario.

This matters for a development Rule system because different classes of Rules may fail at different rates. A model that reliably obeys formatting instructions in a long prompt may still miss semantic applicability, recognition, numerical, spatial, or logic constraints.

**Possible implication:** future validation may need to distinguish rule classes rather than using one global “instruction following passed” signal.

**Adoption status:** not decided.

---

# 4. Instruction complexity and context length can compound each other

## Evidence / observed practice

LIFBench separates tasks into easier and harder groups using its scoring-weight scheme and compares them across increasing context lengths.

For several models, easy and hard tasks are relatively close at short lengths but diverge as context grows. The paper concludes that harder tasks generally degrade more strongly with increasing context length, suggesting a compounded negative effect between task complexity and context length.

Source:

- LIFBench, Section 5.4 / Figure 6
  - https://aclanthology.org/2025.acl-long.803/

## Knowledge captured

The risk is not merely proportional to token count.

A more realistic failure model is closer to:

```text
longer context
× more instructions / variables / conditions
× harder applicability or reasoning
→ disproportionate degradation
```

For rule systems, “how many tokens are loaded?” and “how difficult is it to decide which constraints jointly apply?” are separate variables that may interact.

This is important because a development guide can be relatively short in raw tokens while still being cognitively difficult if many conditional rules must be composed.

**Adoption status:** not decided.

---

# 5. Retrieval failure is not a complete explanation: context length alone can hurt downstream performance

## Evidence / observed practice

Du et al. (`Context Length Alone Hurts LLM Performance Despite Perfect Retrieval`, Findings EMNLP 2025) directly test the common assumption that long-context degradation is mainly caused by failing to retrieve the relevant evidence.

Across five open- and closed-source models and math, QA, and coding tasks, they report performance degradation of 13.9%–85% as input length grows while remaining within the models' claimed context limits.

Crucially, degradation remains under controls designed to remove ordinary retrieval/distraction explanations:

- irrelevant tokens replaced with minimally distracting whitespace,
- irrelevant tokens masked so models are forced to attend only to relevant tokens,
- relevant evidence moved immediately before the question.

The authors therefore identify a limitation in which **the sheer length of the input can harm performance even when retrieval is effectively perfect and ordinary distraction is removed**.

Their model-agnostic mitigation asks the model to recite the retrieved evidence before solving the task, converting the effective reasoning step into a shorter-context problem. On RULER they report GPT-4o improvements up to 4% on an already strong baseline.

Source:

- Du et al., `Context Length Alone Hurts LLM Performance Despite Perfect Retrieval`, Findings EMNLP 2025
  - https://aclanthology.org/2025.findings-emnlp.1264/

## Knowledge captured

This creates a second failure path distinct from Lost-in-the-Middle:

```text
relevant rule is retrieved correctly
→ long total input still changes model processing / reasoning quality
→ model fails to combine or apply the retrieved rule
```

This is especially important for future Rule Router research.

A perfect router or retriever could reduce one class of failure while leaving another class untouched. Therefore:

```text
perfect routing / retrieval
≠ proven rule adherence
```

This is an **AI synthesis from the evidence**, not a direct claim by the paper about `web-project-guide`.

**Adoption status:** not decided.

---

# 6. Literal keyword matching can make long-context performance look better than semantic applicability really is

## Evidence / observed practice

NoLiMa (`Long-Context Evaluation Beyond Literal Matching`, ICML 2025) modifies the classic needle-in-a-haystack setup by minimizing lexical overlap between the question and the relevant information. Models must use latent semantic associations rather than obvious shared words to find the needle.

The ICML report evaluates 13 models claiming at least 128K context. Models are strong at short contexts, but most degrade substantially as context increases. At 32K, 11 models fall below 50% of their strong short-context baselines. GPT-4o falls from 99.3% in the short setting to 69.7% at 32K in the reported evaluation.

Sources:

- Modarressi et al., `NoLiMa: Long-Context Evaluation Beyond Literal Matching`, ICML 2025 / PMLR
  - https://proceedings.mlr.press/v267/modarressi25a.html
  - https://icml.cc/virtual/2025/poster/46685

## Knowledge captured

Repository rule routing often requires semantic applicability rather than exact keyword lookup.

Example:

```text
Task says: "change how existing saved data is represented"
Applicable concept may be: migration / compatibility
But task may never contain the literal word "migration"
```

A future retrieval mechanism that scores well only when task wording shares exact terms with rule documents could overstate actual routing reliability.

**Adoption status:** not decided.

---

# 7. Single-turn long-context instruction exams also reveal early degradation

## Evidence / observed practice

LongIns (`A Challenging Long-context Instruction-based Exam for LLMs`, 2024 preprint) was designed to test reasoning under long instruction-based inputs rather than ordinary information retrieval.

It introduces three settings:

- `GIST` — Global Instruction & Single Task,
- `LIST` — Local Instruction & Single Task,
- `LIMT` — Local Instruction & Multiple Tasks.

The authors report that GPT-4, despite a 128K advertised context at the time, performs poorly at a 16K evaluation context on LongIns. They also report that many models still struggle with multi-hop reasoning at contexts below 4K.

Source:

- Gavin et al., `LongIns: A Challenging Long-context Instruction-based Exam for LLMs`
  - https://arxiv.org/abs/2406.17588

## Evidence strength / limitation

This source is an arXiv preprint rather than a peer-reviewed ACL/ICML paper in the source checked during this pass. Its exact quantitative results should therefore be treated as supporting evidence, not as stronger evidence than the later peer-reviewed LIFBench work.

## Knowledge captured

Long-context difficulty is not purely a “near maximum context-window” problem. Reasoning and instruction composition can fail at much shorter lengths than the advertised maximum.

**Adoption status:** not decided.

---

# 8. Multi-turn history creates a separate failure mechanism: models learn from the pattern of prior assistant behavior

## Evidence / observed practice

Robinette et al. (`We Are What We Repeatedly Do: Improving Long Context Instruction Following`, Findings EACL 2026) introduce VerIFY, a benchmark for verifiable instruction following over multi-turn conversations.

The benchmark uses a binary verifier and Certified Compliance Accuracy (CCA) to check whether outputs satisfy measurable instructions.

The study evaluates three conversation-history behavior patterns:

- `base` — ordinary filler responses,
- `rogue` — assistant responses in the history do not follow the instruction,
- `follows` — assistant responses in the history follow the instruction.

Across the four tested open models, the `follows` pattern outperforms the other patterns. `rogue` history significantly degrades compliance. The authors report that the longer the conversation becomes, the more important this behavioral pattern is.

This means the model is not merely searching for the latest written instruction. Prior **assistant behavior itself** becomes in-context evidence about what behavior should continue.

Source:

- Robinette et al., `We Are What We Repeatedly Do: Improving Long Context Instruction Following`, Findings EACL 2026
  - https://aclanthology.org/2026.findings-eacl.254/
  - DOI: https://doi.org/10.18653/v1/2026.findings-eacl.254

## Important scope detail

Although this is called long-context instruction following, the tested context is long mainly in **turn count**, not near-million-token document length.

For QA filler, average token lengths for 10 / 25 / 50 turns are approximately:

- base: 915 / 2,331 / 4,693,
- rogue: 946 / 2,411 / 4,865,
- follows: 923 / 2,351 / 4,745.

Dialog filler is shorter, roughly 568–2,994 tokens depending on pattern and turn count.

Therefore this study is especially strong evidence for **instruction persistence and behavioral contamination across conversation history**, but should not be used alone to claim behavior at 100K+ repository contexts.

## Knowledge captured

This creates a qualitatively different failure mode:

```text
Rule exists
→ agent violates it once
→ violating response remains in history
→ history now demonstrates the wrong behavioral pattern
→ model is more likely to continue the wrong pattern
```

The problem is therefore not always “forgotten rule text.” It can be **contextual reinforcement of prior non-compliance**.

This may be highly relevant to long coding conversations where an agent makes an incorrect architectural choice, later messages continue from it, and the conversation itself becomes evidence that the incorrect choice is normal.

That relevance is an interpretation, not an adopted Guide rule.

**Adoption status:** not decided.

---

# 9. Repeating the instruction is not always the dominant variable

## Evidence / observed practice

The same VerIFY study compares instruction frequency:

- `none` — instruction absent from the conversation,
- `start` — instruction only in the first user turn,
- `all` — instruction repeated in every user turn.

Across the tested models, the **behavioral filler pattern** (`base` / `rogue` / `follows`) has more effect on compliance than the location/frequency of the written instruction in the tested conditions.

For the smaller tested models, a history containing consistently compliant assistant behavior can induce compliant behavior even in the `none` condition, where the instruction itself is not explicitly present in the conversation. The authors interpret this as in-context learning from behavior.

For larger tested models, explicit instruction location matters more than for the smaller models, but behavioral pattern remains important. The strongest result is generally `follows-all`: compliant behavior in history plus instruction repeated at every turn.

Source:

- VerIFY paper, Section 5.2 / Figure 5
  - https://aclanthology.org/2026.findings-eacl.254/

## Knowledge captured

A future long-running agent system should not assume that simply repeating a Rule more frequently is sufficient to repair a contaminated execution history.

Possible dimensions are at least:

```text
written instruction presence / frequency
+ history of compliant or non-compliant behavior
+ context length
+ model size / architecture
```

**Adoption status:** not decided.

---

# 10. Recovery after non-compliance can work, but “more mitigation” is not monotonically better

## Evidence / observed practice

VerIFY evaluates six recovery mechanisms after injecting a rogue response five turns before evaluation.

### Prompt-based methods

1. **Reinstruct**
   - After detected non-compliance, repeat the instruction in the next turn.

2. **Teach**
   - Explain why the previous response failed and repeat the instruction.

3. **Rewrite and Replace**
   - Use an LM to rewrite the rogue response into a compliant one and replace the bad response in conversation history.

4. **Summarize**
   - Summarize the conversation and provide the summary as a new first turn, followed by the instruction and next prompt.

5. **Combine**
   - Teach + rewrite + reinstruct.

### Model-based method

6. **Instruction Guided Attention (IGA)**
   - Split instruction tokens and context tokens into separate attention pathways, then combine them using a tunable weighting parameter.
   - This requires model-level / attention-level intervention and is not a simple prompt technique.

Source:

- VerIFY paper, Section 6
  - https://aclanthology.org/2026.findings-eacl.254/

## Results captured

For Gemma 7B-it:

- Reinstruct, Teach, Rewrite, and Summarize improve average recovery over baseline.
- Combine and IGA fail to improve recovery overall.
- Combine particularly hurts Security & Alignment instructions. Repeated exposure to protected words can cause the smaller model to learn the wrong pattern.
- IGA degradation is largely associated with punts / refusals that do not satisfy the instructions.

For Gemma2 27B-it:

- all six tested mitigation methods improve the average result over baseline,
- IGA has the strongest average result in the reported table,
- the authors report improvement up to 79% when IGA avoids the punting behavior.

The table also illustrates how model-specific the result is. Approximate reported average CCA:

| Model | Baseline | Reinstruct | Teach | Rewrite | Combine | Summarize | IGA |
|---|---:|---:|---:|---:|---:|---:|---:|
| Gemma 7B-it | 56.67 | 63.33 | 63.10 | 63.57 | 53.69 | 60.95 | 40.95 |
| Gemma2 27B-it | 46.43 | 77.62 | 77.02 | 52.38 | 73.45 | 79.40 | 83.12 |

## Knowledge captured

Several important ideas exist even if they are currently impractical:

- **bad-history invalidation / replacement** rather than only appending correction,
- **context compaction / summarization after detected failure**,
- **explicit recovery state after a verifier detects non-compliance**,
- **separate model attention channel for instructions**, requiring model internals,
- **model-specific mitigation selection** rather than one universal repair recipe.

Negative result:

> Combining more corrective prompt content can make some instruction classes worse.

Therefore a future system should not assume “more reminders + more explanation + more correction = monotonically safer.”

All of these remain research observations; no Guide design is adopted here.

**Adoption status:** not decided.

---

# 11. Long-context instruction following can be improved through length-matched alignment training

## Evidence / observed practice

LongAlign (`A Recipe for Long Context Alignment of Large Language Models`, Findings EMNLP 2024) argues that extending raw context capacity is not enough: models need instruction fine-tuning on input sequences of similar length.

LongAlign includes:

- long instruction-following data generated using Self-Instruct,
- diverse long-context task sources,
- packing and sorted batching for training efficiency,
- a loss-weighting method for packed sequences,
- LongBench-Chat for evaluating instruction following on 10K–100K queries.

The paper reports that its training recipe improves long-context task performance by up to 30% relative to compared recipes while preserving short generic-task capability.

Source:

- Bai et al., `LongAlign: A Recipe for Long Context Alignment of Large Language Models`, Findings EMNLP 2024
  - https://aclanthology.org/2024.findings-emnlp.74/

## Knowledge captured

Some long-context instruction failure is a **model-training / alignment problem**, not something an application-layer prompt or router can necessarily eliminate.

A complete research inventory must therefore retain mechanisms that a solo project cannot currently implement, including:

- long-context supervised fine-tuning,
- length-matched instruction data,
- training-objective changes,
- model-internal attention interventions.

These should not be discarded just because `web-project-guide` cannot train a foundation model.

**Adoption status:** not decided.

---

# 12. Industry technical reports reproduce broad “context rot” behavior on newer frontier-era models

## Evidence / observed practice

Chroma's 2025 technical report `Context Rot` evaluates 18 models, including GPT-4.1, Claude 4, Gemini 2.5, and Qwen3, while attempting to hold task complexity fixed and vary input length.

The report observes non-uniform and increasingly unreliable performance as input grows. It also compares focused LongMemEval prompts containing only relevant information with full prompts averaging around 113K tokens that require retrieval plus reasoning. Across models, the focused inputs perform materially better.

The report releases code for replication.

Sources:

- Chroma, `Context Rot: How Increasing Input Tokens Impacts LLM Performance`
  - https://www.trychroma.com/research/context-rot
- Replication repository
  - https://github.com/chroma-core/context-rot

## Evidence strength / limitation

This is an industry technical report, not peer-reviewed conference evidence. Its value in this research capture is mainly:

- broader model recency,
- practical task variants,
- open replication code,
- independent support for the general observation that large accepted context does not imply uniform use.

The stronger peer-reviewed evidence for retrieval-independent length degradation is Du et al. 2025, and the stronger direct instruction-following evidence is LIFBench 2025 / VerIFY 2026.

**Adoption status:** not decided.

---

# 13. Long-context failures observed so far are not one failure mode

## Evidence synthesis

The current literature supports separating at least the following mechanisms instead of treating everything as one generic “LLM forgot the rule” event.

### A. Positional retrieval / attention failure

```text
relevant information exists
→ position changes how strongly it is used
→ retrieval weakens
```

Evidence:

- Lost in the Middle
- Found in the middle
- Positional Biases Shift

### B. Semantic retrieval difficulty

```text
relevant information does not share obvious wording with the query
→ semantic association is required
→ long-context retrieval degrades more strongly
```

Evidence:

- NoLiMa

### C. Retrieval-independent length degradation

```text
relevant evidence is available / forced
→ total input is still long
→ reasoning / task performance degrades
```

Evidence:

- Du et al. 2025

### D. Instruction-following degradation

```text
instruction is present
+ input length grows
→ task compliance and stability decline
```

Evidence:

- LIFBench
- LongIns supporting evidence

### E. Complexity × length interaction

```text
more difficult / conditional instruction
× longer context
→ sharper degradation than either factor alone
```

Evidence:

- LIFBench

### F. Behavioral-history contamination

```text
assistant violates instruction
→ violation remains as demonstrated behavior
→ later responses learn / continue the wrong pattern
```

Evidence:

- VerIFY 2026

### G. Model / capability-specific sensitivity

```text
same context
→ different models and instruction classes degrade differently
```

Evidence:

- LIFBench
- VerIFY
- RULER / NoLiMa / Context Rot supporting model variation

## Knowledge captured

A single fix cannot be assumed to block all of these mechanisms.

For example:

- better retrieval can help A/B but cannot by itself prove C is solved,
- repeating instructions may help D but may not repair F,
- summarization may reduce C/F but could lose details and create a new summarization error channel,
- model-internal attention changes may help some models and hurt others,
- deterministic verification can detect certain outputs but cannot guarantee that every semantic rule is machine-verifiable.

This resembles the broader cross-domain research hypothesis already emerging elsewhere in `references/`: different failure barriers may be required for different failure classes. **This sentence is a synthesis only and is not a Common Rule adoption.**

---

# 14. Evidence / verification itself has scope limits

## LIFBench limitation

LIFBench's LIFEVAL uses automated rubric-based validation and avoids using an LLM judge for response scoring, which is valuable for repeatability. However, the paper states several limitations:

- programmatic validation does not comprehensively support semantic constraints,
- very-long-input inference is expensive and limits benchmark scale / reproducibility,
- the benchmark contains fewer than 3,000 examples and only three expansion perspectives,
- formatting and domain-shift stability remain underexplored,
- evaluation reliability depends on careful rubric and program implementation.

Source:

- https://aclanthology.org/2025.acl-long.803/

## VerIFY limitation

VerIFY also intentionally uses verifiable true/false instruction criteria, but the paper notes:

- only 28 unique instructions across 10 formats,
- limited coverage of qualitative instructions such as factuality or conversation quality,
- only four evaluated model families: Gemma 7B-it, Gemma2 27B-it, Llama3 8B, Llama3 70B,
- no system-prompt evaluation,
- results are intended to show patterns, not comprehensive model rankings.

Source:

- https://aclanthology.org/2026.findings-eacl.254/

## Knowledge captured

A verifier can give strong evidence only for the properties it can actually check.

This creates another distinction for future research:

```text
machine-verifiable instruction compliance
≠ all semantic / qualitative rule compliance
```

This becomes especially important when later researching deterministic validators, independent judges, and evidence requirements.

**Adoption status:** not decided.

---

# 15. Current working interpretation for `web-project-guide` — not an adoption decision

The following are hypotheses / interpretations to preserve for later comparison. They are deliberately **not** being promoted into `docs/`.

## H1. Full-context loading is not a zero-miss strategy

Giving an agent the entire Guide may increase nominal availability while still leaving:

- positional miss,
- semantic-routing miss,
- long-input processing degradation,
- complexity interaction,
- history contamination.

## H2. Perfect routing is necessary-looking but not sufficient-looking

Even if a future router selects the exact relevant Owner Doc, Du et al. suggests that long-input processing can still degrade after retrieval.

Therefore router quality and downstream compliance need to be treated as separable future research questions.

## H3. Conversation history can become an active source of wrong behavior

VerIFY suggests that a previous violating response is not neutral history. It can become in-context behavioral evidence that increases later non-compliance.

A future system may need some concept of invalidating, replacing, isolating, or compacting bad history after verified failure. Whether that is feasible or desirable is not yet decided.

## H4. “Repeat the Rule more” is not a complete strategy

Instruction frequency helps under some conditions, but behavior pattern, context length, and model characteristics can dominate. Repetition can also create adverse interactions for some negative/security-style constraints.

## H5. Effective rule capacity is task-dependent

There is unlikely to be a universal token threshold such as “below 32K is safe.” Effective context depends on:

- model,
- relative context occupancy,
- task complexity,
- semantic matching difficulty,
- instruction type,
- multi-turn history,
- evaluation metric.

## H6. Long-context reliability needs multiple independent measurements

Possible future measurement dimensions suggested by the literature include:

- retrieval success,
- position robustness,
- instruction compliance,
- stability under paraphrase / variable changes,
- semantic rule applicability,
- reasoning after retrieval,
- recovery after non-compliance.

No measurement set is adopted yet.

---

# 16. What currently appears technically possible but unavailable / expensive

Per the Research Capture Policy, these mechanisms are preserved rather than filtered out.

## Application-layer / currently conceivable

- retrieve only relevant evidence before reasoning,
- recite / restate retrieved evidence before task execution,
- summarize / compact context after detected failure,
- rewrite and replace known non-compliant history,
- repeat instructions after a detected miss,
- explain a failure and re-instruct,
- use deterministic verifiers for machine-checkable constraints,
- evaluate rule robustness at several context lengths rather than one prompt length.

## Expensive / model-dependent / not currently under project control

- long-context supervised fine-tuning on length-matched instruction data,
- custom long-context alignment training,
- model-internal positional-attention calibration,
- Instruction Guided Attention or other separate instruction/context attention pathways,
- training-objective changes,
- large-scale benchmark suites across many model families / 100K+ contexts,
- architecture changes specifically designed to preserve instruction channels over long sequences.

## Missing capability questions

To reproduce some research literally, the project would need one or more of:

- access to model weights and attention implementation,
- GPU training infrastructure,
- long-context evaluation budget,
- deterministic semantic validators that do not currently exist for many rules,
- controlled benchmark-generation infrastructure,
- sufficiently broad model access for replication.

None of these limitations are reasons to erase the mechanisms from the research record.

---

# 17. Evidence map

| Claim | Main evidence | Evidence status | Current confidence | Important limitation |
|---|---|---|---|---|
| Advertised context size overstates reliable usable context for harder tasks | RULER | preprint + widely used open benchmark | High for general phenomenon | synthetic benchmark; exact thresholds model/version dependent |
| Relevant position can materially affect long-context use | Lost in the Middle; Found in the middle | peer-reviewed | High | exact positional curve is not universal |
| Lost-in-the-Middle changes near context limits | Positional Biases Shift | COLM 2025 / open code | Moderate–High | needs replication across more model families |
| Long-context instruction following and stability decline with length | LIFBench | ACL 2025 peer-reviewed | High | programmatically verifiable task coverage is incomplete |
| Instruction complexity compounds length degradation | LIFBench | ACL 2025 peer-reviewed | Moderate–High | complexity split is benchmark-specific |
| Long input can hurt even with perfect retrieval | Du et al. | Findings EMNLP 2025 peer-reviewed | High | five tested model families / selected tasks |
| Semantic retrieval without lexical overlap is substantially harder at length | NoLiMa | ICML 2025 peer-reviewed | High | still a benchmarked retrieval setting rather than complete agent workflow |
| Multi-turn assistant behavior pattern can drive later instruction compliance | VerIFY | Findings EACL 2026 peer-reviewed | Moderate–High | only four open model families; contexts mostly under ~5K tokens; no system prompts |
| Repetition alone is not always the dominant determinant | VerIFY | Findings EACL 2026 peer-reviewed | Moderate | benchmark-specific instructions / model set |
| Recovery strategies can help but can also backfire | VerIFY | Findings EACL 2026 peer-reviewed | Moderate | strongly model- and instruction-class-dependent |
| Length-matched instruction alignment can improve long-context IF | LongAlign | Findings EMNLP 2024 peer-reviewed | Moderate–High | training intervention; result depends on model/data recipe |
| Newer frontier-era models also show broad context degradation in practical tests | Chroma Context Rot | industry technical report + code | Moderate supporting evidence | not peer-reviewed |

---

# 18. Source register

## Core sources deep-reviewed in this pass

1. Liu et al. — `Lost in the Middle: How Language Models Use Long Contexts`
   - TACL 2024
   - https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00638/119630/Lost-in-the-Middle-How-Language-Models-Use-Long

2. Wu et al. — `LIFBench: Evaluating the Instruction Following Performance and Stability of Large Language Models in Long-Context Scenarios`
   - ACL 2025 Long Papers
   - https://aclanthology.org/2025.acl-long.803/

3. Du et al. — `Context Length Alone Hurts LLM Performance Despite Perfect Retrieval`
   - Findings EMNLP 2025
   - https://aclanthology.org/2025.findings-emnlp.1264/

4. Robinette et al. — `We Are What We Repeatedly Do: Improving Long Context Instruction Following`
   - Findings EACL 2026
   - https://aclanthology.org/2026.findings-eacl.254/

5. Modarressi et al. — `NoLiMa: Long-Context Evaluation Beyond Literal Matching`
   - ICML 2025 / PMLR
   - https://proceedings.mlr.press/v267/modarressi25a.html

6. Hsieh et al. — `RULER: What's the Real Context Size of Your Long-Context Language Models?`
   - https://arxiv.org/abs/2404.06654
   - https://github.com/NVIDIA/RULER

## Supporting / mechanism / mitigation sources

7. Hsieh et al. — `Found in the middle: Calibrating Positional Attention Bias Improves Long Context Utilization`
   - Findings ACL 2024
   - https://aclanthology.org/2024.findings-acl.890/

8. Veseli et al. — `Positional Biases Shift as Inputs Approach Context Window Limits`
   - COLM 2025
   - https://arxiv.org/abs/2508.07479

9. Bai et al. — `LongAlign: A Recipe for Long Context Alignment of Large Language Models`
   - Findings EMNLP 2024
   - https://aclanthology.org/2024.findings-emnlp.74/

10. Gavin et al. — `LongIns: A Challenging Long-context Instruction-based Exam for LLMs`
    - arXiv 2024 preprint
    - https://arxiv.org/abs/2406.17588

11. Hong, Troynikov, Huber — `Context Rot: How Increasing Input Tokens Impacts LLM Performance`
    - Chroma Technical Report, 2025
    - https://www.trychroma.com/research/context-rot
    - https://github.com/chroma-core/context-rot

---

# 19. Research gaps deliberately left open

This file should not be mistaken for the complete AI / LLM Agent research program.

The following requested topics remain separate future passes:

- number of simultaneous rules / constraints and omission rate,
- conflicting instructions,
- instruction hierarchy and precedence,
- prompt / policy conflict resolution,
- stale context / version mismatch,
- structured external state / external memory,
- retrieval and routing design,
- same-model self-review limitations,
- self-critique / reflection negative results,
- independent verifier / judge reliability,
- multi-agent verification,
- tool-assisted / deterministic validation,
- evidence requirements and whether they improve compliance,
- “checked it” / false-completion / fabricated verification behavior,
- agentic coding instruction adherence,
- repository-level coding-agent scaffold / rule compliance,
- negative results in automated compliance systems.

A particularly relevant adjacent source discovered during this research is repository-grounded / scaffold-aware coding-agent benchmarking. That topic is intentionally **not** synthesized into this file yet because the current pass is limited to long-context failure.

---

# 20. Current research stopping point

For this theme, the literature already provides multiple independent lines of evidence that:

1. accepted context length is not equivalent to effective context use,
2. position can change retrieval/use,
3. the exact positional failure pattern is condition-dependent rather than universal,
4. long-context instruction following degrades across many models,
5. instruction complexity can compound length degradation,
6. degradation can persist even when retrieval is controlled to be perfect,
7. semantic applicability is harder than literal lookup,
8. multi-turn non-compliant behavior can contaminate later compliance,
9. recovery techniques exist but are model-dependent and can backfire,
10. some mitigations require model training or internals and are outside current project capability.

This is sufficient to preserve the current theme as a distinct research body without yet moving into Common Rule design.

**No Common Rule, Router behavior, Gate, Validator requirement, or adoption decision is created by this file.**
