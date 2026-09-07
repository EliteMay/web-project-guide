# LLM Conflicting / Hierarchical Instruction Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- Related prior AI research:
  - `references/llm-long-context-instruction-following-research.md`
  - `references/llm-multi-constraint-instruction-following-research.md`
- This file is **non-normative research evidence**.
- Adoption status for all mechanisms below: **not decided**, unless explicitly stated otherwise.
- Research is high-recall first. Findings are preserved even when they require model training, model-internal changes, multiple monitors, explicit privilege metadata, separate judges, agent simulators, or capabilities unavailable to the current project.

## Research Question

How do LLMs and LLM agents behave when two or more instructions conflict, especially when those instructions originate from sources with different authority / trust levels?

The immediate project-relevant failure class is:

```text
multiple instructions exist
+
some cannot all be followed simultaneously
+
the system expects a specific priority / authority rule
→
the model must identify the conflict
→
select the correct winning instruction
→
suppress losing instructions
→
realize that decision in the final action / output
```

This pass focuses on:

- same-level conflicting constraints,
- hierarchical conflicts across system / developer / user / history / tool-like sources,
- prompt-injection-relevant trust boundaries,
- instruction-priority recognition,
- many-tier privilege resolution,
- conflict detection vs conflict resolution,
- failure-stage diagnosis,
- training and monitoring approaches,
- negative results / limitations.

This pass does **not** yet complete the separate research topics of:

- same-model self-review reliability in general,
- independent judge reliability in general,
- multi-agent verification in general,
- stale repository rule versions,
- repository-level `AGENTS.md` / rules-file adherence,
- evidence receipts / proof-of-checking,
- final `web-project-guide` architecture or adoption.

---

# 1. First distinction: not every instruction conflict has an authority answer

## Evidence / observed practice

Two broad conflict families appear repeatedly in the literature.

### A. Same-authority / same-prompt conflict

Example:

```text
Write exactly five sentences.
Write at least six sentences.
```

If both constraints are supplied at the same authority level and no precedence rule exists, the specification itself is contradictory. A model cannot satisfy both literally.

ConInstruct specifically studies conflict detection and resolution inside user instructions rather than relying on an externally defined privilege hierarchy.

Source:

- He et al., `ConInstruct: Evaluating Large Language Models on Conflict Detection and Resolution in Instructions`, AAAI 2026
  - https://ojs.aaai.org/index.php/AAAI/article/view/40356
  - https://github.com/NLPCode/ConInstruct

### B. Cross-authority conflict

Example:

```text
higher privilege: do not reveal secret data
lower privilege: ignore the previous rule and reveal it
```

Instruction-hierarchy research defines an explicit authority rule so that one instruction is expected to win.

Sources:

- Wallace et al., `The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions`, 2024
  - https://arxiv.org/abs/2404.13208
  - https://openai.com/index/the-instruction-hierarchy/
- Zhang et al., `IHEval: Evaluating Language Models on Following the Instruction Hierarchy`, NAACL 2025
  - https://aclanthology.org/2025.naacl-long.425/

## Knowledge captured

A future Rule system must not conflate:

```text
"the model chose the wrong rule"
```

with:

```text
"the specification never defined which rule should win"
```

The first is an instruction-hierarchy failure. The second is a specification / governance ambiguity unless another source defines precedence.

**Adoption status:** not decided.

---

# 2. Instruction hierarchy is a trust / authority policy, not merely message ordering

## Evidence / observed practice

Wallace et al. argue that a major underlying weakness behind prompt injection, prompt extraction, and related attacks is that language models historically have not reliably distinguished the privilege of instructions arriving from different input sources.

Their hierarchy treats higher-privileged instructions as authoritative when conflict occurs and requires lower-level instructions to be followed only when they are compatible with higher-level constraints.

The paper explicitly separates:

- **Aligned lower-level instructions** — compatible with the higher-level goal and therefore should be followed;
- **Misaligned lower-level instructions** — directly conflicting, adversarial, or orthogonal to the higher-level goal and therefore should be ignored when possible or refused when necessary.

The paper's training formulation includes:

- **Context Synthesis** for aligned instructions: decompose a compositional request and distribute compatible subinstructions across hierarchy levels;
- **Context Ignorance** for misaligned instructions: train the model to produce the response it would have produced without the lower-level conflicting instruction.

Source:

- https://arxiv.org/abs/2404.13208

## Knowledge captured

A hierarchy mechanism must solve a conditional problem:

```text
lower-priority instruction
→ compatible? follow it
→ conflicting? suppress it
```

A degenerate system that simply ignores all lower-priority input can appear secure while destroying useful instruction following.

The paper explicitly identifies over-refusal / over-ignoring as a risk.

**Adoption status:** not decided.

---

# 3. IHEval: conflict causes a sharp drop even when the intended hierarchy is defined

## Evidence / observed practice

IHEval, published at NAACL 2025, defines the hierarchy:

```text
system message
>
user message
>
conversation history
>
tool output
```

The benchmark contains:

- 3,538 examples,
- nine tasks,
- four broad scenarios:
  - rule following,
  - NLP task execution,
  - safety defense,
  - tool use,
- aligned and conflicting variants,
- a reference setting to separate ordinary task ability from hierarchy-following ability,
- rule-based automatic evaluation.

All evaluated models show a sharp performance decline when lower-priority instructions conflict with higher-priority instructions relative to their original / aligned task performance. The paper reports that the strongest evaluated open-source model reaches only 48% accuracy on resolving such conflicts.

Sources:

- https://aclanthology.org/2025.naacl-long.425/
- https://github.com/ytyz1307zzh/IHEval

## Additional negative result

The public IHEval repository states that models are highly sensitive to superficial factors such as instruction strictness and **do not reliably improve merely because the desired priority order is explicitly stated in the prompt**.

Source:

- https://github.com/ytyz1307zzh/IHEval

## Knowledge captured

This is important because it rejects a simple assumption:

```text
write "system > user > tool" clearly
→ hierarchy problem solved
```

At least for the evaluated model generations and benchmark tasks, explicit textual priority guidance alone is not a reliable substitute for learned / enforced hierarchy behavior.

**Adoption status:** not decided.

---

# 4. System/user role separation by itself is not a reliable behavioral hierarchy

## Evidence / observed practice

`Control Illusion: The Failure of Instruction Hierarchies in Large Language Models`, published at AAAI 2026, evaluates six state-of-the-art models using mutually exclusive, programmatically verifiable constraint pairs including:

- language,
- capitalization,
- word length,
- sentence count,
- keyword usage,
- keyword frequency.

The study reports that models struggle to consistently prioritize system-level over user-level instructions even for these simple formatting conflicts.

More surprisingly, the authors report strong inherent preferences for some constraint types regardless of which one is placed at higher priority.

They also find that social / societal hierarchy framing — authority, expertise, consensus — can influence model behavior more strongly than the formal system/user role distinction.

Source:

- Geng et al., `Control Illusion: The Failure of Instruction Hierarchies in Large Language Models`, AAAI 2026
  - https://ojs.aaai.org/index.php/AAAI/article/view/40339
  - DOI: https://doi.org/10.1609/aaai.v40i36.40339

## Knowledge captured

A message role is not necessarily a hard runtime access-control boundary inside the model.

Possible failure path:

```text
formal hierarchy says A > B
+
model has learned a stronger content / social / formatting prior favoring B
→
model follows B anyway
```

This suggests a distinction between:

- **declared authority**, and
- **effective behavioral influence**.

The exact relative strength of social framing vs role labels is model- and experiment-dependent, but the existence of this latent-prior effect is important to preserve.

**Adoption status:** not decided.

---

# 5. Conflict type itself can matter as much as or more than model scale

## Supporting evidence / observed practice

PRIME (`Prompt Resolution under Incompatible Meta-Instructions Evaluation`) is a 2026 preprint that constructs calibrated incompatible instructions across response length, output format, and reasoning conditions.

The authors report that conflict type has a stronger relationship with model behavior than model scale in their five evaluated instruction-tuned open-weight models.

Source:

- Javed et al., `PRIME: Evaluating Prompt Resolution Under Incompatible Instructions in LLMs`, 2026 preprint
  - https://arxiv.org/abs/2606.22470

## Evidence strength / limitation

This is currently a preprint and covers a narrower model set than the major hierarchy benchmarks.

## Knowledge captured

Conflict handling should not be modeled as one global scalar ability.

Examples of potentially different conflict classes:

- format vs format,
- safety vs user task,
- tool instruction vs user goal,
- factual distortion vs trusted instruction,
- action authorization vs third-party injection,
- developer preference vs user preference.

**Adoption status:** not decided.

---

# 6. Detecting a conflict does not mean the model resolves or communicates it correctly

## Evidence / observed practice

ConInstruct evaluates both conflict detection and conflict-resolution behavior within complex user instructions.

AAAI 2026 results report strong conflict-detection performance for several proprietary models. The highest average F1 values reported include:

- DeepSeek-R1: 91.5%,
- Claude-4.5-Sonnet: 87.3%.

However, despite high detection ability, models **rarely explicitly notify the user that the instructions conflict or request clarification**.

Sources:

- https://ojs.aaai.org/index.php/AAAI/article/view/40356
- https://github.com/NLPCode/ConInstruct

## Knowledge captured

At least these capabilities are separable:

```text
1. detect that a conflict exists
2. determine whether an authority rule resolves it
3. choose the winning instruction
4. suppress losing instructions
5. decide whether clarification / escalation is needed
6. communicate that state
7. produce an output consistent with the decision
```

A model can succeed at Step 1 while silently making an arbitrary or undesirable decision later.

**Adoption status:** not decided.

---

# 7. Conflict density is itself a research variable

## Evidence / observed practice

The public ConInstruct implementation contains separate experiments for conflict detection under different numbers of conflicts (`conflict_detection_density`) and conflict resolution behavior as conflict density changes.

Source:

- https://github.com/NLPCode/ConInstruct

This connects to the separate multi-constraint research already captured in:

- `references/llm-multi-constraint-instruction-following-research.md`

## Knowledge captured

Hierarchy difficulty can interact with multi-constraint load:

```text
more instructions
+
more conflict pairs
+
authority decisions
→
more than ordinary constraint-following load
```

Conflict count and privilege-tier count should therefore remain distinguishable variables.

**Adoption status:** not decided.

---

# 8. Two-tier success does not generalize reliably to many-tier hierarchy

## Evidence / observed practice

ManyIH (`Many-Tier Instruction Hierarchy in LLM Agents`, 2026 preprint) argues that the common small fixed hierarchy — often only a few role labels — is insufficient for realistic agentic settings where instructions may come from:

- system prompts,
- developer configuration,
- skill files,
- users,
- tools,
- other agents,
- participants with different organizational privileges.

ManyIH-Bench contains:

- 853 agentic tasks,
- 427 coding tasks,
- 426 instruction-following tasks,
- 46 real-world agent domains,
- up to 12 distinct privilege levels.

The benchmark reports that the best evaluated frontier model reaches only 42.7% overall accuracy.

One particularly important comparison on the project page is that GPT 5.4 reports above 99% on some standard two-tier hierarchy evaluations but reaches only 39.4% on ManyIH-Bench.

Sources:

- https://arxiv.org/abs/2604.09443
- https://jhu-clsp.github.io/ManyIH/
- https://github.com/JHU-CLSP/ManyIH

## Evidence strength / limitation

ManyIH is a 2026 preprint in the sources checked during this pass. The project page provides detailed benchmark results and the benchmark is publicly released, but the result should be treated as emerging evidence pending archival publication / independent replication.

## Knowledge captured

Hierarchy is not one binary feature:

```text
can distinguish system from user
≠
can resolve arbitrary many-tier privilege graphs
```

This matters for systems where several repository / organization / project / task / tool sources each carry different authority.

**Adoption status:** not decided.

---

# 9. More privilege tiers cause measurable degradation even when task structure is held fixed

## Evidence / observed practice

ManyIH creates Coding variants with 6, 8, and 12 privilege tiers while holding the number of style groups and winning instructions fixed.

Across 12 model-transition pairs, 11 show a strict accuracy decrease as privilege tiers increase, with reported drops ranging from 6.8 to 24.1 percentage points.

Source:

- https://jhu-clsp.github.io/ManyIH/

## Knowledge captured

This isolates **hierarchy depth / tier count** as a separate load variable from ordinary task complexity.

Potential failure form:

```text
same underlying obligations
+
more possible authority levels
→
more conflict-resolution errors
```

This is distinct from the multi-constraint phenomenon where the number of obligations itself grows.

**Adoption status:** not decided.

---

# 10. Hierarchy representation is brittle: equivalent privilege orderings can produce different outcomes

## Evidence / observed practice

ManyIH tests two privilege encodings:

- **Ordinal** — e.g. `[[Privilege 2]]`, lower number means higher privilege;
- **Scalar** — e.g. `[[z=82]]`, larger value means higher privilege.

Only the relative order is supposed to matter.

However, changing from ordinal to scalar encoding causes accuracy drops up to 8.4 percentage points for GPT 5.4 and 8.0 for Opus 4.6 in the reported results.

More strikingly, small scalar perturbations of ±3 that preserve the relative ordering flip 8–17% of per-sample outcomes.

Source:

- https://jhu-clsp.github.io/ManyIH/

## Knowledge captured

A model can attend to **absolute representation details that are semantically irrelevant to the authority rule**.

Therefore:

```text
logical hierarchy unchanged
≠
behavior guaranteed unchanged
```

This is evidence against assuming that a natural-language or numeric priority annotation functions like a deterministic comparator.

**Adoption status:** not decided.

---

# 11. Correct task execution can remain high while hierarchy compliance fails

## Evidence / observed practice

On the ManyIH Coding subset, frontier models maintain high functional unit-test correctness (>86% for the leading models reported on the project page), while style accuracy requiring privilege resolution is substantially lower.

Source:

- https://jhu-clsp.github.io/ManyIH/

## Knowledge captured

A coding agent can therefore produce functionally correct code while violating the governing instruction hierarchy.

This creates a dangerous evaluation distinction:

```text
"tests pass"
```

is not equivalent to:

```text
"tests pass + the correct authority-resolved rules were followed"
```

This observation is especially relevant to repository-level agent research later, but no Guide rule is adopted here.

**Adoption status:** not decided.

---

# 12. Conflict surface matters: system-user robustness does not predict user-tool robustness

## Evidence / observed practice

IH-Benchmark (`A Conflict-Centered Benchmark for Instruction-Hierarchy Robustness in LLM Applications`, July 2026 preprint) evaluates two important hierarchy edges:

- direct system-over-user conflicts (`S > U`),
- tool-mediated user-over-tool conflicts (`U > T`).

It uses:

- 44 human-authored constraint families,
- generic, health, finance, retail, and coding settings,
- 37 evaluated models,
- predicate-based checks plus category-scoped LLM judges.

Reported hierarchy compliance ranges from 98.2% to 20.5% across models.

The key result is that strong `S > U` performance does **not** reliably predict `U > T` robustness. Several models preserve system constraints under direct user conflict but degrade sharply when conflicting instructions occur inside tool outputs.

Source:

- McCauley et al., `IH-Benchmark: A Conflict-Centered Benchmark for Instruction-Hierarchy Robustness in LLM Applications`, 2026 preprint
  - https://arxiv.org/abs/2607.25987

## Knowledge captured

Instruction hierarchy is better represented as a set of trust-boundary behaviors than as one global score.

Possible hierarchy edges include:

```text
system > developer
developer > user
user > tool
trusted repository rule > untrusted retrieved content
```

Success on one edge cannot be assumed to prove another edge.

**Adoption status:** not decided.

---

# 13. Obvious dangerous conflicts can be easier than subtle low-salience conflicts

## Evidence / observed practice

IH-Benchmark reports that models can resist overt high-stakes instructions such as unauthorized purchases or bulk ticket closure more reliably than subtle injected changes such as:

- unwanted disclaimers,
- small factual distortions.

Source:

- https://arxiv.org/abs/2607.25987

## Knowledge captured

Safety alignment can make some obvious violations easy to detect while leaving less dramatic hierarchy violations vulnerable.

For a development guide, the analogous concern is that a model might protect an obvious security boundary while silently accepting a lower-priority formatting, architecture, compatibility, or documentation instruction that still contradicts the governing rule.

That analogy is an AI interpretation, not a direct claim by IH-Benchmark.

**Adoption status:** not decided.

---

# 14. Stronger warning language helps some models but does not solve hierarchy universally

## Evidence / observed practice

IH-Benchmark varies constraint hardening / strictness.

The paper reports a split:

- some models recover substantially when warnings are made stronger;
- other failures persist across strictness levels.

IHEval independently reports sensitivity to instruction strictness.

Sources:

- https://arxiv.org/abs/2607.25987
- https://github.com/ytyz1307zzh/IHEval

## Knowledge captured

Prompt hardening can be a mitigation for some models and conflict types but is not evidence of a hard authority boundary.

```text
more emphatic wording
≠
deterministic privilege enforcement
```

**Adoption status:** not decided.

---

# 15. Hierarchy failure can occur at three different stages

## Evidence / observed practice

`Where Instruction Hierarchy Breaks: Diagnosing and Repairing Failures in Reasoning Language Models` (June 2026 preprint) proposes a white-box diagnostic framework that separates non-compliance into:

1. **Instruction identification failure**
   - the model fails to identify / surface the relevant instruction from the context;
2. **Conflict resolution failure**
   - the model identifies the relevant instructions but selects the wrong winner;
3. **Response realization failure**
   - the model resolves the conflict correctly in reasoning but the final response still violates the selected rule.

The authors evaluate long-context adaptations of IHEval and IHChallenge and report that the dominant failure stage differs across models, tasks, and context length.

Source:

- Kariyappa & Suh, `Where Instruction Hierarchy Breaks: Diagnosing and Repairing Failures in Reasoning Language Models`, 2026 preprint
  - https://arxiv.org/abs/2606.07808

## Knowledge captured

A single final compliance score hides the causal stage.

For rule-application reliability, the following evidence would answer different questions:

```text
Did the model retrieve / identify the rule?
Did it detect the conflict?
Did it select the correct authority winner?
Did it actually implement that decision?
```

This extends the earlier long-context research where retrieval and execution were already shown to be separable.

**Adoption status:** not decided.

---

# 16. A model can apparently know the correct hierarchy and still emit a violating action

## Evidence / observed practice

The response-realization category in Kariyappa & Suh explicitly covers cases where model reasoning resolves the hierarchy correctly but the final answer / action still violates it.

Source:

- https://arxiv.org/abs/2606.07808

## Knowledge captured

This rejects another simple assumption:

```text
"the model correctly explained which rule wins"
→
therefore final behavior is safe
```

A hierarchy explanation is evidence about an intermediate state, not proof of final compliance.

**Adoption status:** not decided.

---

# 17. Training-free input/output monitors can substantially reduce some hierarchy failures

## Evidence / observed practice

Kariyappa & Suh propose two monitoring mechanisms:

- **Parallel input monitor** — detects conflicting instructions before or alongside generation;
- **Sequential output monitor** — reviews the generated response and repairs hierarchy violations.

The paper reports that the strongest monitor configurations reduce rule-following non-compliance by 81–99% across Gemma-4-31B-IT, Claude Sonnet 4.6, and GPT-5.3 in tested settings.

For GPT-5.3, reported non-compliance reduction is:

- 86% under static attacks,
- 45% under adaptive attacks.

Source:

- https://arxiv.org/abs/2606.07808

## Evidence strength / limitation

This is a recent preprint, and the attack / monitor setup is benchmark-specific. Adaptive attackers significantly reduce the gain.

## Knowledge captured

Separate monitors can create additional barriers without retraining the main model.

However:

```text
monitor exists
≠
zero failure
```

and adaptive adversaries can target the monitor itself.

**Adoption status:** not decided.

---

# 18. Hierarchy behavior is trainable and can generalize beyond the exact training conflicts

## Evidence / observed practice

The original 2024 Instruction Hierarchy work trains GPT-3.5 using aligned / misaligned synthetic data and reports substantial robustness improvements, including generalization to attack classes excluded from training such as jailbreaks and some tool-use prompt injections.

The paper reports jailbreak robustness increasing by more than 30% in its experiments while also noting some over-refusal regressions.

Source:

- https://arxiv.org/abs/2404.13208

## Knowledge captured

Instruction hierarchy is not merely a prompt convention; targeted model training can materially alter the behavior.

Therefore current hierarchy failures are not evidence of a permanently fixed transformer limit.

**Adoption status:** not decided.

---

# 19. 2026 IH-Challenge shows large-scale hierarchy training can improve frontier-era models

## Evidence / observed practice

OpenAI's 2026 IH-Challenge work identifies three difficulties in naive hierarchy reinforcement learning:

1. ordinary instruction-following failure can be mistaken for hierarchy failure;
2. nuanced conflicts can require fallible LLM judges;
3. models can learn shortcut behaviors such as over-refusal.

IH-Challenge therefore uses tasks that are:

- intentionally simple in ordinary instruction-following terms,
- objectively gradable using Python,
- designed to avoid trivial high-reward shortcuts.

OpenAI reports fine-tuning GPT-5 Mini into an internal GPT-5 Mini-R model using IH-Challenge with online adversarial example generation.

The paper / official report states average hierarchy robustness across 16 in-distribution, out-of-distribution, and human red-team evaluations improves from 84.1% to 94.1%.

It also reports unsafe behavior on general safety evaluation decreasing from 6.6% to 0.7% while helpfulness improves, and substantial gains on prompt-injection evaluations.

Sources:

- `IH-Challenge: A Training Dataset to Improve Instruction Hierarchy on Frontier LLMs`
  - https://arxiv.org/abs/2603.10521
- OpenAI official research page
  - https://openai.com/index/instruction-hierarchy-challenge/

## Important non-uniformity

On OpenAI's reported internal hierarchy benchmarks:

- System <> User Conflict improves from 0.84 to 0.95;
- Developer <> User Conflict improves from 0.83 to 0.95;
- System <> Developer Conflict remains 0.86 to 0.86 in that table.

This is a useful negative / boundary result: targeted hierarchy training does not necessarily improve every hierarchy edge equally.

## Knowledge captured

Hierarchy robustness can be improved through training, but:

- evaluation must separate ordinary instruction difficulty from hierarchy difficulty;
- reward quality matters;
- shortcut / over-refusal behavior must be measured;
- gains can be edge-specific rather than uniform.

**Adoption status:** not decided.

---

# 20. Over-refusal is a real hierarchy-training failure mode

## Evidence / observed practice

Both 2024 Instruction Hierarchy and 2026 IH-Challenge explicitly discuss the danger that a model can appear robust by simply refusing or ignoring lower-priority instructions too broadly.

The 2024 paper warns that training a model to never follow lower-priority instructions would defeat prompt injection while seriously harming instruction-following capability.

IH-Challenge explicitly designs its reward environment to prevent trivial refusal shortcuts and reports separate over-refusal evaluations.

Sources:

- https://arxiv.org/abs/2404.13208
- https://openai.com/index/instruction-hierarchy-challenge/

## Knowledge captured

A future hierarchy metric must distinguish:

```text
correctly suppress conflicting lower-priority instruction
```

from:

```text
blindly suppress all lower-priority input
```

Security-like robustness achieved through refusal collapse is not equivalent to correct conditional hierarchy reasoning.

**Adoption status:** not decided.

---

# 21. Tool outputs are a particularly important trust boundary

## Evidence / observed practice

Instruction Hierarchy 2024 frames indirect prompt injection as a case where third-party content from browsing or tool outputs contains instructions that conflict with developer / user intent.

IHEval includes tool use in its hierarchy benchmark.

IH-Benchmark finds user-over-tool robustness can differ sharply from system-over-user robustness.

OpenAI's IH-Challenge reports improvement on prompt injections embedded in tool outputs after hierarchy training.

Sources:

- https://arxiv.org/abs/2404.13208
- https://aclanthology.org/2025.naacl-long.425/
- https://arxiv.org/abs/2607.25987
- https://openai.com/index/instruction-hierarchy-challenge/

## Knowledge captured

Retrieved text is not automatically equivalent to an instruction source.

For agent systems, a critical distinction is:

```text
content to reason about
vs
commands authorized to change agent behavior
```

The 2024 Instruction Hierarchy paper also notes that its then-current approach conservatively treated instructions encountered during browsing / tool use as misaligned, while identifying more nuanced handling as future work.

**Adoption status:** not decided.

---

# 22. Model-level hierarchy is complementary to system-level guardrails

## Evidence / observed practice

The 2024 Instruction Hierarchy paper explicitly describes model-based hierarchy as complementary to system-level mechanisms such as requiring human approval before sensitive API actions.

The authors anticipate more complex system-level guardrails for agentic use rather than relying on the model alone.

Source:

- https://arxiv.org/abs/2404.13208

## Knowledge captured

Even the work proposing stronger model-internal hierarchy does not claim that model behavior should be the sole control surface.

Potential independent layers mentioned or implied across the research include:

- model hierarchy training,
- structured source / privilege metadata,
- input monitors,
- output monitors,
- deterministic action authorization,
- human approval for sensitive actions,
- tool-level restrictions.

No combination is adopted for the Guide here.

**Adoption status:** not decided.

---

# 23. Authority metadata and instruction content are separate dimensions

## Evidence synthesis

Across Control Illusion, ManyIH, IHEval, and IH-Benchmark, behavior depends on more than nominal authority.

Observed variables include:

- message role,
- constraint type,
- wording strictness,
- social authority framing,
- privilege encoding format,
- absolute numeric privilege values,
- conflict surface,
- tool-mediated vs direct presentation,
- model family.

## Knowledge captured

A conceptual model of conflict resolution may therefore need at least:

```text
instruction content
+
source identity
+
source trust / authority
+
applicability
+
conflict relation
+
priority relation
```

Current LLMs do not behave as if authority alone deterministically controls the result.

This is an AI synthesis, not an adopted Rule.

---

# 24. Conflict resolution and multi-constraint satisfaction interact but are not the same problem

## Evidence synthesis

Previous research capture established that many simultaneous constraints already reduce strict all-pass reliability even when they are compatible.

This research adds another operation:

```text
compatible multi-constraint problem:
follow A + B + C

hierarchical conflict problem:
follow A + B
explicitly suppress C because C conflicts and loses authority
```

ManyIH combines both:

- several active winning constraints,
- several suppressed losing constraints,
- multiple conflict groups,
- multiple privilege levels.

Sources:

- `references/llm-multi-constraint-instruction-following-research.md`
- https://jhu-clsp.github.io/ManyIH/

## Knowledge captured

A robust evaluator may need to check both:

- whether every winning / active obligation was followed;
- whether losing / suppressed obligations were **not** followed.

A response can fail by omission of the winner or accidental execution of the loser.

**Adoption status:** not decided.

---

# 25. Silence around conflict is itself a visibility problem

## Evidence synthesis

ConInstruct reports that models rarely surface conflicts or request clarification despite often detecting them.

Where Instruction Hierarchy Breaks shows that intermediate reasoning and final output can disagree.

IHEval / Control Illusion show that models may resolve priority incorrectly without an obvious runtime error.

## Knowledge captured

Conflict-handling systems can produce **silent decisions**:

```text
conflict exists
→ model internally chooses one path
→ no visible conflict state
→ user / verifier sees only a fluent answer
```

This creates an observability problem independent of whether the chosen output happens to be correct.

Possible future research questions include explicit conflict receipts, decision logs, or authority-resolution evidence. None are adopted here.

---

# 26. Current failure taxonomy for conflicting / hierarchical instructions

## Evidence synthesis

The literature reviewed in this pass supports separating at least the following failure modes.

### A. Specification conflict without precedence

```text
A and B cannot both hold
+
no authority / precedence rule
→
no uniquely correct winner exists
```

Evidence:

- ConInstruct,
- PRIME.

### B. Conflict non-detection

```text
model treats incompatible instructions as if they can coexist
```

Evidence:

- ConInstruct,
- Where Instruction Hierarchy Breaks.

### C. Instruction identification failure

```text
relevant high-priority instruction is present
→ not surfaced / recognized
```

Evidence:

- Where Instruction Hierarchy Breaks,
- earlier long-context research.

### D. Priority recognition / conflict-resolution failure

```text
both instructions identified
→ wrong authority winner selected
```

Evidence:

- IHEval,
- Control Illusion,
- ManyIH,
- IH-Benchmark.

### E. Constraint-content bias overrides formal authority

```text
formal priority favors A
+
model prior strongly favors B-type constraint
→ B controls output
```

Evidence:

- Control Illusion.

### F. Representation brittleness

```text
same authority order
+
different privilege encoding / values
→ different result
```

Evidence:

- ManyIH.

### G. Conflict-surface failure

```text
model handles system-user conflict
but fails user-tool conflict
```

Evidence:

- IH-Benchmark.

### H. Many-tier scaling failure

```text
correct authority relation becomes harder as privilege tiers increase
```

Evidence:

- ManyIH.

### I. Response-realization failure

```text
model selects correct winner in reasoning
→ final output still violates it
```

Evidence:

- Where Instruction Hierarchy Breaks.

### J. Over-refusal / blanket suppression

```text
avoid hierarchy violation by refusing or ignoring all lower-level input
```

Evidence:

- Instruction Hierarchy 2024,
- IH-Challenge 2026.

### K. Silent resolution / no escalation

```text
model detects conflict
→ silently picks one
→ does not expose unresolved ambiguity
```

Evidence:

- ConInstruct.

### L. Adaptive attack against verifier / monitor

```text
monitor improves static robustness
→ attacker adapts to monitor
→ gain decreases
```

Evidence:

- Where Instruction Hierarchy Breaks.

## Knowledge captured

Instruction conflict cannot be treated as one generic failure class.

No single mitigation is demonstrated to block all categories above.

---

# 27. Possible mechanisms observed in research — not recommendations

Per the Research Capture Policy, mechanisms are preserved whether or not they are currently practical.

## Prompt / application layer

- explicit authority / trust labels,
- explicit conflict detection before execution,
- explicit winning / suppressed constraint representation,
- stronger warning / hardening language,
- structured separation between data and instructions,
- input monitoring,
- output monitoring / repair,
- deterministic authorization checks for sensitive actions,
- human approval for high-impact actions,
- conflict / ambiguity escalation when no precedence exists,
- edge-specific evaluation (`system > user`, `user > tool`, etc.),
- many-tier privilege metadata rather than only fixed role labels.

## Training layer

- aligned / misaligned hierarchy training,
- context synthesis,
- context ignorance,
- adversarial hierarchy training,
- online adversarial example generation,
- objective programmatic hierarchy rewards,
- over-refusal counterexamples,
- hierarchy-specific reinforcement learning.

## Model / infrastructure layer

- model architectures with stronger privilege channels,
- source-aware attention mechanisms,
- external policy engines,
- taint / trust tracking for retrieved content,
- separate conflict-resolution modules,
- secure tool authorization outside the LLM.

Many of these are not currently available or reproducible in a normal hosted-model workflow. Their existence is still preserved.

---

# 28. Negative results and cautions captured in this pass

1. **Explicit role separation is not reliable enforcement by itself.**
   - IHEval and Control Illusion show substantial conflict failures.

2. **Explicitly stating the priority order is not a demonstrated universal fix.**
   - IHEval reports models still struggle when priority guidance is provided.

3. **Stronger warning language is not universally sufficient.**
   - IH-Benchmark finds model-dependent benefits and persistent failures.

4. **Two-tier success does not imply many-tier success.**
   - ManyIH shows a very large gap.

5. **Equivalent authority encodings can produce different outputs.**
   - ManyIH ordinal/scalar and value perturbation results.

6. **Conflict detection does not imply good conflict handling.**
   - ConInstruct models often detect conflicts but do not notify / clarify.

7. **Correct internal reasoning does not prove compliant final output.**
   - response-realization failure in Kariyappa & Suh.

8. **Robustness on one hierarchy edge does not prove another edge.**
   - IH-Benchmark `S > U` vs `U > T` split.

9. **Hierarchy training can learn refusal shortcuts.**
   - explicitly treated as a training pitfall in IH-Challenge.

10. **Hierarchy training gains are not uniform across every edge.**
    - OpenAI's reported System <> Developer conflict result does not improve in the cited table.

11. **Monitors do not eliminate adaptive attack risk.**
    - GPT-5.3 monitor gain drops under adaptive attacks in Kariyappa & Suh.

12. **Obvious dangerous instructions may be easier to resist than subtle low-salience manipulation.**
    - IH-Benchmark.

13. **LLM-judge-based hierarchy reward can itself be wrong.**
    - IH-Challenge explicitly treats judge fallibility as a training-design problem.

---

# 29. Current working interpretations for `web-project-guide` — not adoption decisions

These are hypotheses to preserve for later synthesis only.

## H1. A Source of Truth hierarchy must be distinguished from the model's ability to enforce it

A repository can define a perfectly clear precedence order while the LLM still fails to apply it.

Therefore:

```text
governance correctness
≠
runtime hierarchy compliance
```

## H2. Unresolved same-level contradictions are different from lower-priority overrides

If two current normative rules at the same authority level contradict each other, the model should not be expected to infer an invisible winner.

This may eventually connect to contradiction detection / rule hygiene, but no mechanism is adopted here.

## H3. Tool / retrieved content should eventually be researched as a separate trust boundary

Evidence repeatedly shows that tool-mediated conflict is behaviorally distinct from direct user conflict.

## H4. Many-tier rule authority may be relevant to repository ecosystems

A real development agent can receive instructions from platform policy, project guide, repository requirements, nested agent files, current user request, tool results, and generated plans.

ManyIH suggests that simply adding more authority tiers can itself create failure.

## H5. Conflict handling may need observable intermediate state

Possible future state fields suggested by the research include:

- detected conflict set,
- authority winner,
- suppressed instruction IDs,
- unresolved conflicts,
- evidence that final output respects winners.

No state model is adopted yet.

## H6. Hierarchy needs edge-specific validation

A single benchmark saying `instruction hierarchy passed` may hide that:

- system > user is strong,
- developer > user is medium,
- user > tool is weak.

## H7. Priority wording should not be treated like deterministic access control

ManyIH and Control Illusion both show that representation and learned priors can override the intended semantics.

## H8. Conflict-aware validation may need to test both obedience and suppression

A correct result must often prove:

```text
winner followed
+
loser not followed
```

not merely that one desired phrase appears.

## H9. Hierarchy training and external enforcement appear complementary

Even hierarchy-training papers retain a role for external guardrails and approvals.

This fits the broader research pattern of multiple failure barriers, but remains synthesis only.

---

# 30. Evidence map

| Claim | Main evidence | Evidence status | Current confidence | Important limitation |
|---|---|---|---|---|
| Models degrade sharply when instructions at different priority levels conflict | IHEval | NAACL 2025 peer-reviewed | High | model versions / tasks benchmark-specific |
| Explicit prompt priority guidance alone is insufficient | IHEval repo | peer-reviewed benchmark implementation | Moderate–High | exact prompting setup specific to benchmark |
| System/user separation is not reliable hierarchy enforcement | Control Illusion | AAAI 2026 peer-reviewed | High for evaluated models / constraints | six models; mostly simple verifiable constraints |
| Content / social priors can outweigh formal role hierarchy | Control Illusion | AAAI 2026 peer-reviewed | Moderate–High | framing effects may vary by model/training |
| Models can detect conflicts but fail to communicate / escalate them | ConInstruct | AAAI 2026 peer-reviewed | High for benchmark behavior | same-level user-instruction conflict focus |
| Conflict type materially changes behavior | PRIME | 2026 preprint | Moderate supporting | five open-weight models; preprint |
| Many-tier hierarchy is substantially harder than two-tier hierarchy | ManyIH | 2026 preprint + public benchmark | Moderate–High emerging | needs independent replication / archival review |
| More privilege tiers lower accuracy while underlying obligations are held fixed | ManyIH | controlled benchmark variants | Moderate–High emerging | coding-style domain for controlled scaling experiment |
| Equivalent privilege representations can flip outcomes | ManyIH | public benchmark results | Moderate–High emerging | benchmark-specific privilege interface |
| Strong system-user performance does not predict tool-mediated robustness | IH-Benchmark | July 2026 preprint | Moderate–High emerging | very recent preprint; mixed verifier types |
| Subtle hierarchy violations can be harder than overt high-risk actions | IH-Benchmark | July 2026 preprint | Moderate emerging | task categories / safety training influence result |
| Hierarchy failure can be localized into identification, resolution, realization | Where IH Breaks | June 2026 preprint | Moderate–High conceptual / experimental | white-box reasoning-model assumptions; recent preprint |
| Training-free monitors can strongly reduce some hierarchy failures | Where IH Breaks | June 2026 preprint | Moderate emerging | adaptive attacks reduce gain; setup-specific |
| Targeted hierarchy training can improve robustness and generalize | Instruction Hierarchy 2024 | OpenAI research / preprint | Moderate–High | GPT-3.5-era training study; model-provider study |
| Frontier-era hierarchy RL can improve average robustness substantially | IH-Challenge | OpenAI 2026 paper / official report | High for reported internal model experiment | provider-run training; some internal benchmarks unavailable independently |
| Over-refusal is a hierarchy-training shortcut risk | Instruction Hierarchy + IH-Challenge | two OpenAI research generations | High that risk is recognized | prevalence depends on reward/data design |

---

# 31. Source register

## Core peer-reviewed sources

1. Zhihan Zhang et al. — `IHEval: Evaluating Language Models on Following the Instruction Hierarchy`
   - NAACL 2025 Long Papers
   - https://aclanthology.org/2025.naacl-long.425/
   - https://github.com/ytyz1307zzh/IHEval

2. Yilin Geng et al. — `Control Illusion: The Failure of Instruction Hierarchies in Large Language Models`
   - AAAI 2026
   - https://ojs.aaai.org/index.php/AAAI/article/view/40339

3. Xingwei He et al. — `ConInstruct: Evaluating Large Language Models on Conflict Detection and Resolution in Instructions`
   - AAAI 2026
   - https://ojs.aaai.org/index.php/AAAI/article/view/40356
   - https://github.com/NLPCode/ConInstruct

## Core provider / hierarchy-training sources

4. Eric Wallace et al. — `The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions`
   - 2024
   - https://arxiv.org/abs/2404.13208
   - https://openai.com/index/the-instruction-hierarchy/

5. Chuan Guo et al. — `IH-Challenge: A Training Dataset to Improve Instruction Hierarchy on Frontier LLMs`
   - 2026
   - https://arxiv.org/abs/2603.10521
   - https://openai.com/index/instruction-hierarchy-challenge/

## Recent hierarchy / agentic preprints

6. Jingyu Zhang et al. — `Many-Tier Instruction Hierarchy in LLM Agents`
   - 2026 preprint
   - https://arxiv.org/abs/2604.09443
   - https://jhu-clsp.github.io/ManyIH/
   - https://github.com/JHU-CLSP/ManyIH

7. Sanjay Kariyappa, G. Edward Suh — `Where Instruction Hierarchy Breaks: Diagnosing and Repairing Failures in Reasoning Language Models`
   - 2026 preprint
   - https://arxiv.org/abs/2606.07808

8. Conor McCauley, Zeliang Kan, Jason Martin — `IH-Benchmark: A Conflict-Centered Benchmark for Instruction-Hierarchy Robustness in LLM Applications`
   - July 2026 preprint
   - https://arxiv.org/abs/2607.25987

9. Tehreem Javed et al. — `PRIME: Evaluating Prompt Resolution Under Incompatible Instructions in LLMs`
   - 2026 preprint
   - https://arxiv.org/abs/2606.22470

---

# 32. Research gaps deliberately left open

The following remain high-priority adjacent topics:

- same-model review / self-critique reliability after a hierarchy decision,
- independent verifier / judge reliability,
- whether a judge shares the same hierarchy bias as the acting model,
- multi-agent conflict adjudication,
- symbolic contradiction detection,
- SAT / SMT / policy-engine support for logically incompatible constraints,
- formal privilege graphs vs simple total order,
- same-authority conflict resolution policy,
- tie-breaking among equal-priority rules,
- exception / waiver interaction with hierarchy,
- temporary override vs permanent rule authority,
- stale / version-conflicting instruction sources,
- nested repository instruction files and inheritance,
- repository-level coding-agent compliance,
- provenance / trust labels for tool and retrieved content,
- prompt-injection defenses beyond hierarchy training,
- whether explicit evidence receipts improve conflict resolution,
- whether conflict decisions should invalidate previous evidence,
- hierarchy behavior over long multi-step agent trajectories,
- how long context interacts with many-tier hierarchy,
- how multi-constraint load interacts with hierarchy depth,
- how conflict severity should affect validation strength,
- adversarial privilege flooding,
- evaluator specification gaps for subtle semantic conflicts.

---

# 33. Current research stopping point

For this theme, the current evidence is sufficient to preserve several independent conclusions without moving into adoption:

1. conflicting instructions are qualitatively different from merely having many compatible constraints;
2. some conflicts have an explicit authority winner while same-level contradictions may not;
3. modern models still show substantial failures even when a system/user/history/tool hierarchy is explicitly defined;
4. message-role separation is not equivalent to deterministic hierarchy enforcement;
5. models can be influenced by constraint type, social framing, wording strictness, and privilege representation in ways that override intended authority semantics;
6. conflict detection, conflict resolution, communication / escalation, and final response realization are distinct capabilities;
7. two-tier hierarchy competence does not reliably generalize to many-tier hierarchy;
8. increasing privilege tiers creates measurable degradation even when underlying task obligations are held fixed;
9. robustness on direct system-user conflicts does not prove robustness against tool-mediated conflicts;
10. subtle low-salience hierarchy violations can remain even when obvious dangerous actions are blocked;
11. hierarchy training can substantially improve robustness and generalize, but over-refusal / reward shortcuts are real failure modes;
12. input/output monitors can add a separate barrier but do not eliminate adaptive failures;
13. provider research itself treats model hierarchy as complementary to external system guardrails rather than a sole control mechanism.

This is enough to stop this single theme without designing the final Guide architecture.

**No Common Rule, Router behavior, Gate, Validator requirement, authority hierarchy, conflict policy, tool trust policy, or adoption decision is created by this file.**