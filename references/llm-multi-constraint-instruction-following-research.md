# LLM Multi-Constraint Instruction Following Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- Related prior AI research: `references/llm-long-context-instruction-following-research.md`
- This file is **non-normative research evidence**.
- Adoption status for all mechanisms below: **not decided**, unless explicitly stated otherwise.
- Research is high-recall first. Findings are preserved even when they require model training, multiple models, model internals, expensive inference, executable validators, or capabilities unavailable to the current project.

## Research Question

How does LLM instruction adherence change as the number of simultaneously applicable rules / constraints increases, and what mechanisms, task structures, metrics, mitigations, and failure modes have been observed?

The immediate project-relevant failure class is:

```text
Each individual rule may be understandable and often followed in isolation
+
many rules become simultaneously applicable
→
one or more rules are omitted, partially satisfied, or violated
```

This pass intentionally focuses on **constraint count, simultaneous composition, composition structure, and constraint-level verification**.

It does **not** yet attempt to complete the separate research topics of:

- conflicting instructions / contradictory authority,
- instruction hierarchy / precedence,
- system-vs-user instruction conflict,
- same-model review reliability in general,
- independent judge reliability in general,
- multi-agent verification in general,
- stale rule versions,
- repository-level coding-agent instruction files,
- final `web-project-guide` architecture or adoption.

---

# 1. Multi-constraint reliability needs at least two different metrics

## Evidence / observed practice

FollowBench distinguishes between:

- **Hard Satisfaction Rate (HSR)** — whether an instruction satisfies **all** required constraints,
- **Soft Satisfaction Rate (SSR)** — average satisfaction of individual constraints,
- **Consistent Satisfaction Levels (CSL)** — how many progressively harder constraint levels are satisfied consecutively from the beginning.

The newer Constraint Saturation Evaluation (CSE) makes a closely related distinction:

- **marginal / per-constraint success** — how often each constraint is passed,
- **strict / all-k success** — whether all `k` simultaneous constraints are passed in one output.

Sources:

- Jiang et al., `FollowBench: A Multi-level Fine-grained Constraints Following Benchmark for Large Language Models`, ACL 2024
  - https://aclanthology.org/2024.acl-long.257/
  - https://github.com/YJiangcm/FollowBench
- Vasileva, `Large Language Models Can Follow Instructions, But Not Many at Once: Phase Transitions in Compositional Constraint Satisfaction`, arXiv:2608.12426, 2026
  - https://arxiv.org/abs/2608.12426

## Knowledge captured

A high average per-rule success rate can hide a low probability that **every required rule is satisfied together**.

For a rule-heavy development workflow, the following are not equivalent:

```text
"most rules were followed"
```

and

```text
"all applicable MUST-level rules were followed"
```

This is a measurement distinction only. No metric is adopted for `web-project-guide` here.

**Adoption status:** not decided.

---

# 2. Direct 2026 evidence: all-constraint success can collapse much faster than individual-constraint success

## Evidence / observed practice

CSE is the most direct source found in this pass for systematically varying simultaneous constraint count.

Its reported setup includes:

- 15 models,
- 36 constraint types,
- 369,753 individual checks,
- `k = 1 ... 12` simultaneous constraints,
- deterministic rule-based verification,
- zero LLM-judge involvement in constraint scoring.

The paper reports two different trends:

1. individual / marginal constraint success declines gradually as more constraints are added;
2. the probability of satisfying **all** simultaneous constraints declines much more sharply.

A reported example at `k = 8` has approximately 41% individual-constraint pass rate while strict success on all eight constraints is only 5.7%.

The paper also reports that the strongest tested model falls below 50% probe-level strict success at seven simultaneous constraints, while 12 of the 15 tested models cross that threshold at three or fewer.

Source:

- https://arxiv.org/abs/2608.12426

## Important evidence status

This is a very recent 2026 arXiv v1 paper. The arXiv metadata notes that it was reviewed in the ARR May 2026 cycle, but the source checked in this pass is still an arXiv preprint rather than a finalized archival conference publication.

Therefore the exact numerical threshold should be treated as **strong emerging evidence**, not as a universal law.

## Knowledge captured

There are at least two reasons strict success can deteriorate as rule count grows:

### A. Each individual rule can become slightly harder to maintain under load

```text
more simultaneous constraints
→
per-constraint reliability decreases
```

### B. The task requires a conjunction of all successes

Even if individual constraint reliability stayed constant, requiring all constraints to pass multiplies the opportunities for failure.

The CSE authors report failures as nearly independent on average, making the accumulation approximately multiplicative. Residual coupling is associated especially with constraints sharing an output property; for example, one incorrect sentence count can make several checks fail together.

This means a system can look relatively healthy under per-rule averages while strict end-to-end completion is poor.

**Adoption status:** not decided.

---

# 3. Do not turn the CSE 5–6 constraint result into a universal Guide limit

## Evidence / observed limitations

CSE is deliberately controlled and does not represent every kind of real-world rule composition.

Important scope limitations captured from the paper include:

- composition is primarily conjunctive: all selected constraints must hold together;
- sequential, conditional, hierarchical, and deeply nested rule structures may behave differently;
- the benchmark strongly favors deterministically verifiable constraints;
- qualitative requirements such as factuality, usefulness, coherence, nuanced tone, and pragmatic correctness are underrepresented because they are difficult to verify deterministically;
- `k = 12` is a stress-test regime and does not imply every real prompt contains 12 equivalent independent requirements;
- model families, training, inference strategy, and future versions can shift thresholds;
- benchmark constraints are output-generation constraints and are not identical to a repository rule system with retrieval, tools, state, tests, and staged execution.

Source:

- https://arxiv.org/abs/2608.12426

## Knowledge captured

The current evidence supports:

> simultaneous constraint load is a real reliability variable.

It does **not** justify:

> `web-project-guide` must contain no more than five or six rules.

A Guide can have many total rules while only a small relevant subset is active for a task. Conversely, one high-level rule can contain many hidden subconditions.

Therefore `total rule count`, `retrieved rule count`, `simultaneously active constraint count`, and `number of independently verifiable obligations` are different quantities.

**Adoption status:** not decided.

---

# 4. Earlier peer-reviewed FollowBench independently shows degradation as constraints are added

## Evidence / observed practice

FollowBench, published at ACL 2024, was designed specifically to add constraints incrementally.

It contains:

- 820 curated instructions,
- more than 50 NLP tasks,
- five constraint categories:
  - Content,
  - Situation,
  - Style,
  - Format,
  - Example,
- progressive levels where one additional constraint is added at each level, up to five levels,
- evaluation across 13 open and closed models.

The paper reports substantial performance decline as difficulty / constraint level rises. Its authors report that GPT-4 and GPT-3.5, in the evaluated versions, could consecutively satisfy only around three constraint levels on average.

Sources:

- https://aclanthology.org/2024.acl-long.257/
- https://github.com/YJiangcm/FollowBench

## Knowledge captured

The 2026 CSE finding is not isolated from prior literature. Earlier peer-reviewed work already observed a monotonic multi-constraint difficulty effect with a different dataset and evaluation design.

However, FollowBench has a maximum of five progressively added constraints, uses older model generations, and combines rule-based and LLM-based evaluation. It should therefore support the general phenomenon, not define a current numerical ceiling.

**Adoption status:** not decided.

---

# 5. Raw constraint count is not enough: composition topology changes difficulty

## Evidence / observed practice

ComplexBench, published in the NeurIPS 2024 Datasets and Benchmarks Track, explicitly models not only the individual constraints but how they are composed.

Its taxonomy includes:

- four constraint types,
- 19 constraint dimensions,
- four major composition types:
  - `Single`,
  - `And`,
  - `Chain`,
  - `Selection`,
- nested composition depth.

Across tested models, performance declines as composition becomes more complex. Chain and Selection structures are particularly difficult, and deeper nesting further reduces performance.

The reported GPT-4-1106 dependency-aware fine-grained result, for example, is much stronger on simple `And` composition than on combined `Selection + Chain`, with deeper structures showing additional degradation.

Sources:

- `Benchmarking Complex Instruction-Following with Multiple Constraints Composition`, NeurIPS 2024
  - https://proceedings.neurips.cc/paper_files/paper/2024/hash/f8c24b08b96a08ec7a7a975feea7777e-Abstract-Datasets_and_Benchmarks_Track.html
  - https://github.com/thu-coai/ComplexBench

## Knowledge captured

Two tasks with the same raw number of constraints can have materially different difficulty.

Compare:

```text
A AND B AND C
```

with:

```text
IF X:
  apply A
ELSE:
  apply B
THEN use the result to decide C
```

Both may contain three named rules, but the second requires applicability decisions, state, and dependency tracking.

This is directly relevant to rule systems because many development rules are conditional or hierarchical rather than flat formatting requirements.

A future research model may therefore need to distinguish:

- count,
- dependency,
- conditionals,
- nesting,
- sequencing,
- shared state,
- interaction between obligations.

No such taxonomy is adopted yet.

**Adoption status:** not decided.

---

# 6. Constraint categories degrade differently

## Evidence / observed practice

CSE reports that structural constraints lose approximately twice as much baseline capability per added constraint as lexical constraints.

The paper describes this through a **comprehension-maintenance gap**:

- some constraints are closer to one-time or binary decisions;
- others require the model to keep tracking an invariant throughout generation.

FollowBench and ComplexBench likewise find category-dependent differences rather than uniform degradation.

MultiCodeIF, a 2025 code-generation preprint, reports that explicit constraints are easier than implicit / abstract ones.

Sources:

- https://arxiv.org/abs/2608.12426
- https://aclanthology.org/2024.acl-long.257/
- NeurIPS 2024 ComplexBench source above
- MultiCodeIF: https://arxiv.org/abs/2507.00699

## Knowledge captured

A development rule can impose very different cognitive burden depending on what it asks the model to do.

Examples of potentially different burden classes include:

- one-time output-format decision,
- negative prohibition,
- continuously maintained invariant,
- conditional applicability check,
- cross-file consistency requirement,
- state transition requirement,
- semantic quality requirement,
- requirement that depends on external evidence.

Therefore "10 rules" is not a complete description of load.

**Adoption status:** not decided.

---

# 7. Constraint compatibility becomes its own problem as count grows

## Evidence / observed practice

CSE does not simply choose arbitrary random sets of constraints. It uses a compatibility checker to reject contradictory / unsatisfiable combinations before evaluation.

The reported rejection rate rises sharply at high `k`; the paper reports approximately 32% rejection around `k = 4` and approximately 98% around `k = 12` under its generation procedure.

Source:

- https://arxiv.org/abs/2608.12426

RECAST approaches the same problem differently when constructing training data: constraints are derived from real instruction-response data, candidate subsets are selected for relevance / mutual consistency, and generated instruction-response candidates are filtered / voted to maintain coherence and satisfiability.

Sources:

- `RECAST: Expanding the Boundaries of LLMs' Complex Instruction Following with Multi-Constraint Data`, ICLR 2026
  - https://proceedings.iclr.cc/paper_files/paper/2026/hash/69f00d007e2447997120b1c41dea741b-Abstract-Conference.html
  - https://github.com/Thekey756/RECAST

## Knowledge captured

Increasing rule count increases not only model execution load but also the chance that the **rule set itself** contains:

- direct contradictions,
- impossible combinations,
- hidden incompatibilities,
- overlapping definitions,
- mutually impossible output conditions.

A model failure can therefore be caused by at least two fundamentally different states:

```text
A. valid rule set, model omitted a rule
B. rule set itself cannot all be satisfied
```

Those should not be conflated in future research.

The exact CSE rejection percentages are benchmark-generator-specific and must not be generalized to `web-project-guide`.

**Adoption status:** not decided.

---

# 8. Simple task decomposition is not automatically a solution

## Negative result / observed practice

ComplexBench tested a straightforward strategy that manually decomposes complex instructions and executes them step-by-step through multi-round interaction.

Instead of improving performance, this method made GPT-3.5 worse on the benchmark overall. The degradation was especially visible on Chain / Selection structures with greater depth.

The authors attribute the result to cumulative error across multiple turns / substeps.

Source:

- ComplexBench, NeurIPS 2024
  - https://proceedings.neurips.cc/paper_files/paper/2024/hash/f8c24b08b96a08ec7a7a975feea7777e-Abstract-Datasets_and_Benchmarks_Track.html

## Knowledge captured

The intuitive mitigation:

```text
many constraints
→ split into many smaller calls
```

can create new failure channels:

- state is lost between calls,
- an early error becomes input to later stages,
- later steps optimize a locally correct but globally wrong intermediate state,
- original constraints are not rechecked after later mutation,
- dependencies between subproblems are broken.

Therefore decomposition itself is a mechanism, not proof of reliability.

**Adoption status:** not decided.

---

# 9. Decomposition + explicit critique + targeted refinement can help

## Evidence / observed practice

DeCRIM, published in Findings of EMNLP 2024, evaluates real-world multi-constrained instructions through its RealInstruct benchmark.

The paper reports that even GPT-4 fails at least one constraint on more than 21% of tested real-world multi-constraint instructions.

DeCRIM uses a more structured recovery process than simple decomposition:

```text
initial response
→ decompose instruction into granular constraints
→ critic checks each constraint
→ identify unsatisfied constraints
→ targeted refinement
→ repeat until satisfied or iteration limit
```

The paper reports that DeCRIM improves Mistral by 7.3% on RealInstruct and 8.0% on IFEval even with weak feedback; stronger critic feedback can yield larger gains.

Source:

- Ferraz et al., `LLM Self-Correction with DeCRIM: Decompose, Critique, and Refine for Enhanced Following of Instructions with Multiple Constraints`, Findings EMNLP 2024
  - https://aclanthology.org/2024.findings-emnlp.458/

## Knowledge captured

The difference from the negative ComplexBench result is important.

```text
simple decomposition
```

is not equivalent to:

```text
constraint extraction
+ per-constraint verification
+ explicit defect identification
+ targeted repair
```

The latter provides a feedback loop tied to specific obligations.

This does not prove that DeCRIM solves rule omission universally. Critic quality becomes another dependency, and qualitative constraint evaluation can itself be wrong.

**Adoption status:** not decided.

---

# 10. Pre-generation planning and generic retries appear bounded in the newest direct study

## Evidence / observed practice

CSE includes intervention experiments rather than only measuring failure.

Methods examined include:

- pre-generation planning / scaffolding,
- post-hoc self-correction,
- best-of-5 sampling.

The reported results do not remove the saturation pattern:

- planning does not materially shift the aggregate per-constraint decay and does not reliably move the compositional threshold;
- self-correction yields limited threshold improvement;
- best-of-5 gives roughly one to two additional constraints in some settings, substantially less than an idealized independent-retry gain because failures often recur across samples.

Source:

- https://arxiv.org/abs/2608.12426

## Evidence caution

These intervention results belong to the same recent arXiv study and should be treated as emerging evidence pending broader replication.

## Knowledge captured

A generic strategy such as:

```text
"think carefully first"
```

or

```text
"try again five times"
```

should not be assumed to remove multi-constraint failure.

They may improve success probability without changing the underlying failure class.

**Adoption status:** not decided.

---

# 11. Tool-using agents show the problem outside pure text-generation benchmarks

## Evidence / observed practice

CCTU (`A Benchmark for Tool Use under Complex Constraints`, 2026 preprint) evaluates tool use under explicit operational constraints.

Its benchmark contains:

- 200 curated test cases,
- 12 constraint categories,
- four dimensions:
  - resource,
  - behavior,
  - toolset,
  - response,
- an average of seven constraint types per case,
- average prompt length above 4,700 tokens,
- multi-turn model-environment interaction,
- an executable constraint validation module performing step-level checks.

Across nine tested state-of-the-art models, no model reaches above 20% task completion under strict all-constraint adherence. More than 50% of cases contain constraint violations, especially in resource and response constraints. Detailed violation feedback produces limited self-refinement.

Sources:

- https://arxiv.org/abs/2603.15309
- https://github.com/Junjie-Ye/CCTU

## Evidence strength / limitation

CCTU is a 2026 arXiv / CoRR preprint rather than peer-reviewed conference evidence in the sources checked during this pass.

Its value here is that it tests a materially different regime:

```text
instruction following
+ tool calls
+ resource limits
+ behavioral rules
+ multi-turn state
+ executable validation
```

## Knowledge captured

Multi-constraint omission is not confined to decorative output formatting. It appears in agent-like tool-use tasks where violations can occur at intermediate steps.

This creates a distinction between:

- final-output compliance,
- step-level process compliance,
- tool-selection compliance,
- resource-budget compliance.

**Adoption status:** not decided.

---

# 12. Coding-specific evidence also shows strong multi-level degradation

## Evidence / observed practice

MultiCodeIF is a 2025 code-generation preprint specifically aimed at fine-grained code instruction adherence.

It contains:

- 2,021 code tasks,
- 14 programming languages,
- nine constraint categories,
- 27 constraint types,
- single-level and multi-level hierarchical constraints,
- multi-turn feedback / self-repair variants.

The paper reports:

- Claude-3-7-Sonnet at 63.0% average constraint satisfaction in its evaluated setup,
- Qwen3-1.7B at 44.8%,
- explicit constraints above 70% vs implicit / abstract constraints below 40% in the reported analysis,
- hard success falling from 54.5% in single-level tasks to 18.8% in multi-level scenarios,
- structured feedback raising average constraint satisfaction from 63.0% to 83.4% over four refinement rounds.

Sources:

- https://arxiv.org/abs/2507.00699
- https://github.com/SYSUSELab/MultiCodeIF

## Evidence strength / limitations

This is currently a preprint in the sources checked during this pass.

The benchmark is automatically constructed, and evaluation mixes deterministic techniques with GPT-4-Turbo judgment for subjective constraints. Its exact numbers should not be treated as direct measurements of repository-level coding-agent reliability.

## Knowledge captured

The result is still relevant because it introduces failure dimensions closer to software development:

- functional constraints,
- non-functional constraints,
- hierarchical requirements,
- language-specific code output,
- iterative correction.

It also supplies counterevidence to the idea that feedback cannot help: structured feedback can produce substantial repair, even though the initial multi-level failure remains severe.

**Adoption status:** not decided.

---

# 13. Multi-constraint failure is trainable to some degree; it is not necessarily a fixed architecture ceiling

## Evidence / observed practice

RECAST is an ICLR 2026 conference paper targeting complex instruction following with many constraints.

The framework constructs `RECAST-30K`:

- 30,000 training instances,
- 19 constraint types in the final ICLR version,
- training examples with substantially more simultaneous constraints than earlier benchmarks,
- test sets at 5, 10, 15, and all available constraints,
- rule-based validators for quantitative / machine-checkable constraints,
- model-based validators for qualitative constraints.

The authors report that models fine-tuned on RECAST-30K improve complex instruction following without observed degradation of tested general capabilities. They further use per-constraint verifiability as reinforcement-learning reward signals (`RLVC`).

In the ICLR paper's reported RECAST-Test averages:

- Gemini-2.5-Pro: 39.75%,
- Qwen2.5-7B RECAST-30K-SFT: 31.25%,
- Qwen2.5-7B RECAST-30K-RLVC: 32.33%.

The absolute values remain low, especially at high difficulty, but specialized training improves the capability and RL gains are particularly visible on higher-complexity levels.

Sources:

- ICLR 2026 proceedings
  - https://proceedings.iclr.cc/paper_files/paper/2026/hash/69f00d007e2447997120b1c41dea741b-Abstract-Conference.html
- OpenReview paper
  - https://openreview.net/forum?id=90tCp2KszA
- Official repository
  - https://github.com/Thekey756/RECAST

## Knowledge captured

The observed constraint saturation should not be interpreted as a permanent universal hard limit of transformer models.

Model capability can be shifted by:

- multi-constraint supervised fine-tuning,
- constraint-dense training data,
- fine-grained per-constraint rewards,
- reinforcement learning with verifiable constraints.

However, even the strongest reported systems remain far from perfect strict multi-constraint success.

**Adoption status:** not decided.

---

# 14. Fine-grained reward / verification is a recurring mechanism across improvement work

## Evidence / observed practice

Several independent lines of work decompose a complex instruction into individually checkable obligations:

- FollowBench — per-constraint evaluation plus hard all-constraint evaluation,
- DeCRIM — constraint decomposition, critic, targeted repair,
- RECAST — each constraint carries a validator used for data filtering and RL reward,
- CCTU — executable step-level validation in an interactive environment,
- MultiCodeIF — constraint-specific evaluators plus feedback-driven repair.

Sources: listed in the corresponding sections above.

## Knowledge captured

A recurring pattern is:

```text
one opaque holistic score
→ difficult to know which obligation failed
```

versus

```text
constraint set
→ individual checks
→ explicit failed subset
→ targeted repair / reward
```

This is research evidence for observability of obligations, not an adopted design for the Guide.

The approach also has a hard boundary: many important software rules are not currently reducible to reliable deterministic booleans.

**Adoption status:** not decided.

---

# 15. Deterministic verification has both major strengths and specification-gap risks

## Evidence / observed practice

CSE deliberately uses deterministic verifiers to avoid LLM-judge ambiguity. This gives unusually clean measurements for checkable constraints.

However, the paper also reports examples of models satisfying literal verifier conditions through mechanically valid but semantically poor outputs, including pathological formatting or other specification-gap exploitation under high load.

RECAST similarly separates rule-verifiable quantitative constraints from model-verifiable qualitative constraints, implicitly acknowledging that not all requirements can be decided by code.

Sources:

- https://arxiv.org/abs/2608.12426
- ICLR 2026 RECAST sources above

## Knowledge captured

There are at least three states:

```text
1. output violates the written machine rule
2. output satisfies the machine rule and the intended requirement
3. output satisfies the machine rule but defeats the intended purpose
```

A validator can therefore increase evidence quality while still leaving a specification problem.

This is especially relevant to software quality because tests can pass while implementation intent is still wrong.

**Adoption status:** not decided.

---

# 16. LLM judges increase semantic coverage but create another reliability layer

## Evidence / observed practice

FollowBench, ComplexBench, RECAST, DeCRIM, and MultiCodeIF use LLM-based evaluation for at least some open-ended or semantic constraints.

ComplexBench attempts to improve this by augmenting LLM evaluation with explicit rules and dependency-aware aggregation. Its paper reports better agreement with human labels when rule information is supplied than when a direct holistic LLM score is used.

RECAST deliberately uses a dual system:

- rule-based verification for quantitative constraints,
- model-based verification for qualitative constraints.

Sources:

- FollowBench, ACL 2024
- ComplexBench, NeurIPS 2024
- DeCRIM, Findings EMNLP 2024
- RECAST, ICLR 2026
- MultiCodeIF preprint

## Knowledge captured

Semantic coverage and evaluation determinism trade off against each other.

```text
Deterministic verifier
+ repeatable
+ cheap / precise for formal properties
- limited semantic coverage
- vulnerable to incomplete specifications

LLM / model verifier
+ broader qualitative coverage
- judge error
- bias / preference leakage
- cost
- non-determinism
```

The reliability of independent judges / same-model judges is a dedicated later research topic and is not resolved here.

**Adoption status:** not decided.

---

# 17. Attention allocation is an active mitigation research direction

## Evidence / observed practice

PASTA, accepted at ICLR 2024, modifies model attention at inference time to emphasize user-selected instruction spans. It requires model-level access but does not retrain model weights. The paper reports substantial instruction-following improvements on tested Llama-family settings, including an average accuracy improvement of 22% for Llama-7B across the paper's evaluated tasks.

SpotLight, published as an EACL 2026 long paper, develops a dynamic attention-steering method. Instead of applying a fixed bias, it monitors the share of attention directed to designated instruction tokens and intervenes when attention falls below a target. The authors report improvement across multiple-instruction tasks and across model scales without measured degradation in their evaluated tasks.

Sources:

- Zhang et al., `Tell Your Model Where to Attend: Post-hoc Attention Steering for LLMs`, ICLR 2024
  - https://proceedings.iclr.cc/paper_files/paper/2024/hash/b99d6cc40b05809c3d84b57a165448cd-Abstract-Conference.html
- Venkateswaran & Contractor, `Spotlight Your Instructions: Instruction-following with Dynamic Attention Steering`, EACL 2026
  - https://aclanthology.org/2026.eacl-long.174/

## Knowledge captured

Multi-constraint failure is not researched only at the prompt level. There are model-internal approaches that explicitly change how much attention instructions receive.

These mechanisms are currently difficult or impossible to reproduce when using closed hosted models because they require access to internal attention computations.

The existence of such work should still be preserved under the Research Capture Policy.

**Adoption status:** not decided.

---

# 18. More attention is not necessarily monotonically better

## Evidence / observed practice

The attention-steering literature does not imply that arbitrarily maximizing attention to instruction tokens is always beneficial.

SpotLight is designed as a dynamic / proportional intervention specifically because static or excessive steering can harm output behavior. The method aims to reach a controlled target rather than apply unlimited emphasis.

Earlier long-context research captured in `llm-long-context-instruction-following-research.md` also contains model-dependent examples where combining multiple corrective interventions worsened some instruction classes.

Sources:

- https://aclanthology.org/2026.eacl-long.174/
- `references/llm-long-context-instruction-following-research.md`

## Knowledge captured

A future rule system should not assume a simple monotonic relationship:

```text
more repetition / more emphasis / more attention
=
more reliability
```

Interventions can interact with model behavior and other constraints.

**Adoption status:** not decided.

---

# 19. Same nominal constraint set can hide different numbers of real obligations

## Evidence synthesis

The reviewed benchmarks use different units:

- FollowBench counts progressively added explicit constraints,
- CSE counts independently generated deterministic constraints,
- ComplexBench represents dependencies and nesting,
- RECAST contains many extracted explicit constraints,
- MultiCodeIF distinguishes hierarchical code requirements,
- CCTU counts constraint types across tool-use dimensions.

## Knowledge captured

A sentence that looks like one rule can encode several obligations.

Example:

```text
"When saved data schema changes, migrate old data, preserve compatibility, provide rollback, and verify recovery."
```

This is one prose sentence but at least several distinct obligations.

Conversely, five closely related formatting bullets may be easier than one conditional cross-system requirement.

Therefore future research / measurement should be careful about which unit is being counted:

- prose bullets,
- explicit constraints,
- atomic obligations,
- conditional branches,
- validation checks,
- state transitions,
- independent failure opportunities.

No canonical counting scheme is adopted here.

---

# 20. Constraint omission is not fully explained by one mechanism

## Evidence synthesis

The literature reviewed in this pass supports separating several mechanisms.

### A. Multiplicative accumulation

```text
several imperfect individual success probabilities
→ strict all-pass probability becomes much smaller
```

Strongest direct evidence:

- CSE 2026.

### B. Load-sensitive per-constraint degradation

```text
more simultaneous constraints
→ individual constraints themselves become less reliably maintained
```

Evidence:

- CSE,
- FollowBench.

### C. Structural / maintenance burden

```text
rule requires continuous tracking
→ degrades faster than one-time lexical/binary decisions
```

Evidence:

- CSE.

### D. Composition / dependency burden

```text
same count
+ chain / branch / nesting / hierarchy
→ harder than flat conjunction
```

Evidence:

- ComplexBench,
- MultiCodeIF.

### E. Unsatisfiable or incompatible rule sets

```text
more constraints
→ greater chance the specification itself cannot be jointly satisfied
```

Evidence:

- CSE compatibility filtering,
- RECAST consistency-selection pipeline.

### F. Evaluation blindness

```text
holistic response appears good
→ one or more atomic constraints fail
```

Evidence:

- FollowBench / InFoBench-style decomposed evaluation,
- DeCRIM,
- RECAST,
- CCTU.

### G. Repair-loop failure

```text
split / retry / self-correct
→ new cumulative errors or repeated failure pattern
```

Evidence:

- ComplexBench decomposition negative result,
- CSE bounded planning / retry results,
- CCTU limited self-refinement.

### H. Trainability / controllability

```text
constraint-focused data / reward / attention steering
→ measurable improvement
```

Evidence:

- RECAST,
- DeCRIM,
- PASTA,
- SpotLight,
- MultiCodeIF feedback.

## Knowledge captured

No single mechanism currently explains every multi-rule omission failure.

Accordingly, no single mitigation can be assumed to solve all of them.

This is an AI synthesis, not a Common Rule.

---

# 21. Relevant adjacent benchmark: InFoBench makes hidden omissions visible by decomposing instructions

## Evidence / observed practice

InFoBench, published in Findings of ACL 2024, contains 500 instructions decomposed into 2,250 fine-grained evaluation questions. Its Decomposed Requirements Following Ratio (DRFR) evaluates requirements individually rather than relying on one holistic response score.

Source:

- `InFoBench: Evaluating Instruction Following Ability in Large Language Models`, Findings ACL 2024
  - https://aclanthology.org/2024.findings-acl.772/

## Knowledge captured

A central measurement problem is that fluent completion can mask omitted subrequirements.

Instruction decomposition can therefore be useful **for evaluation**, even when decomposition during **execution** is not always beneficial.

These are different uses of decomposition:

```text
Execution decomposition
→ can introduce cumulative errors

Evaluation decomposition
→ can expose which obligations failed
```

That distinction appears important enough to preserve for later verifier research.

**Adoption status:** not decided.

---

# 22. Safety and security rules can be drowned in a larger constraint set

## Evidence / observed concern

CSE explicitly raises an adversarial implication: if many simultaneous constraints reduce reliable maintenance, an attacker or accidental specification can potentially swamp safety-related constraints with additional obligations.

Source:

- https://arxiv.org/abs/2608.12426

## Knowledge captured

Not all constraints have equal severity.

A strict all-pass metric treats:

```text
missed heading format
```

and

```text
missed safety boundary
```

as one failed constraint each, but the consequences are very different.

Future research will need to separate:

- compliance probability,
- constraint criticality,
- independence / redundancy,
- priority / authority,
- acceptable exception behavior.

That moves directly into the later `conflicting instructions / hierarchy` research topic, so it is not resolved here.

**Adoption status:** not decided.

---

# 23. Current possible mitigations and their prerequisites

Per the Research Capture Policy, mechanisms are retained even when unavailable today.

## Application / orchestration layer

Potentially reproducible without training foundation models:

- extract explicit constraints into structured records,
- verify constraints individually where machine-checkable,
- report both per-constraint and strict all-pass status,
- perform targeted repair only for failed constraints,
- preserve global constraints during repair rather than checking only the local defect,
- detect contradictory / unsatisfiable combinations before execution,
- use external constrained generation for formal output schemas,
- use step-level validators during agent tool use,
- run staged workflows with state and revalidation rather than naive independent decomposition,
- use multiple candidate generations / best-of-N where cost permits,
- keep evidence of which specific obligations were checked.

These are **research mechanisms**, not recommendations yet.

## Training-time / model-level

Requires capabilities outside the current project / normal hosted-model interface:

- constraint-dense supervised fine-tuning,
- multi-constraint synthetic or extracted training data,
- reinforcement learning using per-constraint rewards,
- attention steering such as PASTA / SpotLight,
- custom constrained decoding,
- activation / attention-level interventions,
- model architecture changes designed for persistent constraint maintenance.

## Organizational / infrastructure prerequisites

Some future systems could require:

- deterministic rule engines,
- semantic validators,
- compatibility / satisfiability checking,
- separate verifier models,
- model-weight access,
- GPU training infrastructure,
- long-running benchmark suites,
- versioned rule-to-verifier mappings,
- reproducible agent environments.

Current inability to reproduce these is not grounds for removing them from the research record.

---

# 24. Negative results and cautions captured in this pass

The following should remain visible rather than being lost during later synthesis.

1. **Simple decomposition can make performance worse.**
   - ComplexBench multi-round decomposition on GPT-3.5 degraded overall results.

2. **Planning is not a demonstrated universal fix.**
   - CSE planning experiments do not remove the saturation pattern.

3. **Best-of-N gives bounded gains.**
   - repeated samples can reproduce the same failure rather than behaving like independent retries.

4. **Self-refinement can remain weak in interactive agents.**
   - CCTU reports limited correction even with detailed violation feedback.

5. **Deterministic validators can be gamed.**
   - literal satisfaction can differ from intended semantic compliance.

6. **LLM judges broaden coverage but create evaluator error / bias.**

7. **A universal 5–6 constraint limit is not supported.**
   - the strongest new direct result is benchmark- and model-dependent.

8. **Constraint count alone does not model composition complexity.**
   - dependency, conditionality, hierarchy, and maintenance load matter.

9. **Specialized training can improve multi-constraint capability.**
   - failure is not evidence of an immutable architectural ceiling.

10. **More prompting / more emphasis is not automatically monotonic improvement.**

---

# 25. Current working interpretations for `web-project-guide` — not adoption decisions

These hypotheses are retained for later comparison only.

## H1. Rule count should eventually be measured as active obligations, not document size alone

A Guide may contain hundreds of total rules without requiring the model to maintain hundreds simultaneously.

The likely important quantity is closer to the set of **applicable obligations for the current task**, including hidden subconditions and dependencies.

## H2. Per-rule pass evidence can create false confidence

A system that says "95% of individual rules are usually followed" may still fail strict workflows often if many independent obligations must all hold.

## H3. A future router could reduce simultaneous burden but cannot prove compliance

Routing fewer relevant rules may reduce load, but previous long-context research and current multi-constraint evidence both show that retrieval / routing and actual execution are distinct failure stages.

## H4. Conditional / hierarchical rules may deserve different treatment from flat rules

ComplexBench and MultiCodeIF suggest that raw count is a weak proxy when dependencies / hierarchy differ.

## H5. Verification may need atomic obligations even if normative prose stays human-readable

Research repeatedly benefits from decomposed requirements for measurement, but this does not imply the normative Guide should be rewritten into thousands of tiny prose rules.

## H6. Repair should preserve the global obligation set

The simple-decomposition negative result suggests that correcting one local step without rechecking global constraints can accumulate error.

## H7. Satisfiability is a separate failure barrier from model adherence

A model cannot reliably satisfy an internally contradictory rule set. Compatibility checking may eventually need to be researched independently from instruction following.

## H8. Critical constraints may need stronger barriers than ordinary constraints

Because strict all-pass failure rises with load, safety / data-loss / security obligations may eventually need differentiated assurance rather than being one more bullet in a flat list.

This enters later assurance / hierarchy synthesis and remains undecided.

---

# 26. Evidence map

| Claim | Main evidence | Evidence status | Current confidence | Important limitation |
|---|---|---|---|---|
| Strict all-constraint success falls much faster than individual constraint success as `k` grows | CSE 2026 | recent arXiv / ARR-reviewed preprint | Moderate–High emerging | one recent direct benchmark; deterministic conjunctive tasks |
| Multi-constraint degradation predates CSE and appears under another benchmark | FollowBench | ACL 2024 peer-reviewed | High for general phenomenon | max 5 levels; older model versions; mixed evaluator |
| Constraint topology / nesting changes difficulty beyond raw count | ComplexBench | NeurIPS 2024 peer-reviewed | High | benchmark language/domain and LLM-evaluator limits |
| Structural continuously maintained constraints degrade faster than lexical constraints | CSE 2026 | recent preprint | Moderate emerging | needs independent replication across broader task forms |
| Random high-count constraint sets often become incompatible without filtering | CSE compatibility checker | recent preprint | Moderate for benchmark-generation phenomenon | rejection rate is generator-specific, not a real-world prevalence estimate |
| Simple multi-round decomposition can worsen performance | ComplexBench | NeurIPS 2024 peer-reviewed negative result | Moderate–High | shown in specific GPT-3.5 benchmark setup |
| Constraint-aware critique/refinement can improve compliance | DeCRIM | Findings EMNLP 2024 peer-reviewed | High for tested setup | critic quality and evaluator reliability become dependencies |
| Specialized multi-constraint training improves capability | RECAST | ICLR 2026 peer-reviewed | High for tested models/data | absolute success remains low; synthetic/extracted data distribution |
| Per-constraint RL reward can add further improvement | RECAST | ICLR 2026 peer-reviewed | Moderate–High | dependent on verifier quality and training access |
| Tool-using agents violate many explicit constraints under strict evaluation | CCTU | 2026 arXiv preprint | Moderate supporting | 200 cases; preprint; task distribution specific |
| Hierarchical coding constraints sharply lower success | MultiCodeIF | 2025 arXiv preprint | Moderate supporting | automatically generated benchmark; mixed evaluator |
| Structured coding feedback can repair many violations | MultiCodeIF | 2025 arXiv preprint | Moderate supporting | does not establish repository-level autonomous agent reliability |
| Attention steering can improve instruction adherence | PASTA / SpotLight | ICLR 2024 + EACL 2026 peer-reviewed | High that mechanism can help in tested models | requires model-internal access; not a universal multi-rule solution |
| Deterministic verification can miss intended semantics | CSE specification-gap examples + general dual-verifier designs | mixed | Moderate–High | exact prevalence depends on verifier and task |

---

# 27. Source register

## Core sources deep-reviewed / directly used

1. Mariya I. Vasileva — `Large Language Models Can Follow Instructions, But Not Many at Once: Phase Transitions in Compositional Constraint Satisfaction`
   - arXiv:2608.12426, 2026
   - https://arxiv.org/abs/2608.12426
   - Direct systematic `k=1..12` constraint-count source.

2. Yuxin Jiang et al. — `FollowBench: A Multi-level Fine-grained Constraints Following Benchmark for Large Language Models`
   - ACL 2024
   - https://aclanthology.org/2024.acl-long.257/

3. `Benchmarking Complex Instruction-Following with Multiple Constraints Composition`
   - NeurIPS 2024 Datasets and Benchmarks Track
   - https://proceedings.neurips.cc/paper_files/paper/2024/hash/f8c24b08b96a08ec7a7a975feea7777e-Abstract-Datasets_and_Benchmarks_Track.html
   - https://github.com/thu-coai/ComplexBench

4. Thomas Palmeira Ferraz et al. — `LLM Self-Correction with DeCRIM: Decompose, Critique, and Refine for Enhanced Following of Instructions with Multiple Constraints`
   - Findings EMNLP 2024
   - https://aclanthology.org/2024.findings-emnlp.458/

5. Zhengkang Guo et al. — `RECAST: Expanding the Boundaries of LLMs' Complex Instruction Following with Multi-Constraint Data`
   - ICLR 2026
   - https://proceedings.iclr.cc/paper_files/paper/2026/hash/69f00d007e2447997120b1c41dea741b-Abstract-Conference.html
   - https://openreview.net/forum?id=90tCp2KszA
   - https://github.com/Thekey756/RECAST

## Supporting / agent / code sources

6. Junjie Ye et al. — `CCTU: A Benchmark for Tool Use under Complex Constraints`
   - arXiv:2603.15309, 2026 preprint
   - https://arxiv.org/abs/2603.15309
   - https://github.com/Junjie-Ye/CCTU

7. Guoliang Duan et al. — `A Hierarchical and Evolvable Benchmark for Fine-Grained Code Instruction Following with Multi-Turn Feedback` / MultiCodeIF
   - arXiv:2507.00699, 2025 preprint
   - https://arxiv.org/abs/2507.00699
   - https://github.com/SYSUSELab/MultiCodeIF

8. `InFoBench: Evaluating Instruction Following Ability in Large Language Models`
   - Findings ACL 2024
   - https://aclanthology.org/2024.findings-acl.772/

## Model-internal mitigation sources

9. Qingru Zhang et al. — `Tell Your Model Where to Attend: Post-hoc Attention Steering for LLMs`
   - ICLR 2024
   - https://proceedings.iclr.cc/paper_files/paper/2024/hash/b99d6cc40b05809c3d84b57a165448cd-Abstract-Conference.html

10. Praveen Venkateswaran, Danish Contractor — `Spotlight Your Instructions: Instruction-following with Dynamic Attention Steering`
    - EACL 2026 Long Papers
    - https://aclanthology.org/2026.eacl-long.174/

---

# 28. Research gaps deliberately left open

This pass is not the complete AI / LLM Agent reliability research program.

High-priority adjacent questions still open:

- direct **conflicting instruction** benchmarks,
- hierarchy / priority / authority resolution,
- whether stronger-priority rules are more or less likely to survive high constraint load,
- constraint ordering / position effects independent of count,
- same-model critic vs independent critic reliability,
- false-positive verifier / false-negative verifier rates,
- judge consistency under many simultaneous evaluation criteria,
- multi-agent verification,
- external symbolic / SAT / SMT / policy-engine assistance,
- repository-level coding-agent compliance with `AGENTS.md`, rules files, READMEs, and nested instructions,
- whether evidence citation / evidence receipts increase rule adherence,
- stale / conflicting repository instruction versions,
- dynamic rule activation / retrieval under large rule universes,
- whether atomic obligation extraction itself introduces omissions or semantic distortion,
- how repaired outputs invalidate earlier evidence,
- how many constraints remain simultaneously active across long agent trajectories,
- adversarial instruction flooding / constraint swamping,
- severity-weighted vs strict all-pass evaluation,
- qualitative constraints that cannot currently be deterministically verified.

---

# 29. Current research stopping point

For this theme, independent evidence now supports several distinct conclusions strongly enough to preserve them as a separate research body:

1. increasing simultaneous constraint count is associated with lower instruction-following reliability;
2. strict all-constraint success can collapse much faster than average per-constraint success;
3. the effect is reproduced in earlier peer-reviewed multi-level benchmarks;
4. raw count is insufficient because constraint type, hierarchy, nesting, conditionals, and dependency structure matter;
5. some constraints require sustained maintenance and degrade more strongly under load;
6. unsatisfiable / contradictory combinations become a separate specification problem;
7. naive decomposition is not guaranteed to help and can create cumulative error;
8. constraint-aware critique and targeted repair can improve adherence;
9. tool-using and coding-oriented tasks exhibit related multi-constraint failures;
10. specialized training and per-constraint reward can improve capability, so current saturation is not a proven immutable ceiling;
11. deterministic and model-based verification each cover different failure classes and have different weaknesses;
12. model-internal attention-steering methods exist and can improve instruction adherence in evaluated settings;
13. no evidence found supports converting the newest `5–6` saturation result into a universal Guide rule-count limit.

This is enough to stop this single theme without moving into final architecture or Common Rule design.

**No Common Rule, Router behavior, Gate, Validator requirement, Rule Budget limit, maximum rule count, or adoption decision is created by this file.**
