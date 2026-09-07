# LLM Independent Verifier / Judge Reliability Research

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
  - `references/llm-self-review-self-critique-research.md`
- This file is **non-normative research evidence**.
- Adoption status for all mechanisms below: **not decided**, unless explicitly stated otherwise.
- Research is high-recall first. Findings are preserved even when they require human calibration sets, multiple model families, model internals, robust statistics, formal or executable oracles, expensive repeated inference, adversarial testing, or capabilities unavailable to the current project.

## Research Question

How reliable is an **independent LLM verifier / LLM-as-a-Judge** as a second-check mechanism for another model's output, and when does independence actually reduce correlated error rather than merely add another fallible model?

The immediate project-relevant chain is:

```text
producer model creates artifact
→ independent judge receives artifact + criteria / evidence
→ judge must understand the task and criteria
→ judge must identify relevant defects
→ judge must resist presentation / model-family / position / verbosity / authority bias
→ judge must not be manipulated by the candidate output
→ judge emits a correct verdict with calibrated uncertainty
→ system decides whether to accept, repair, escalate, or gather stronger evidence
```

This pass focuses on:

- single independent LLM judges,
- judge-vs-human and judge-vs-objective correctness,
- judging difficulty vs solving difficulty,
- position / verbosity / style / authority / self-preference bias,
- adversarial manipulation of judges,
- panels / juries / multi-agent evaluators,
- correlated errors between judges,
- judge uncertainty / calibration,
- reference / oracle assistance,
- domain / criterion dependence,
- current positive and negative evidence.

This pass does **not** yet complete:

- multi-agent verification as a full agent architecture,
- deterministic validator design for `web-project-guide`,
- symbolic / SAT / SMT verification,
- evidence receipts / proof-of-checking,
- repository-level coding-agent rule adherence,
- final Guide design or adoption.

---

# 1. An independent judge is a different barrier from same-model self-review, but it is still a model

## Knowledge distinction

A same-model reviewer shares at least the producing model's:

- architecture / training distribution,
- likely blind spots,
- style preferences,
- possibly the same conversation trajectory.

A different judge model can add diversity and may reduce some correlated errors.

However:

```text
independent model identity
≠
independent correctness evidence
```

A second LLM can still share the same training conventions, superficial heuristics, unknown factual gaps, prompt sensitivity, or systematic evaluator biases.

This file therefore distinguishes:

1. **different-model judge** — another LLM evaluates the output;
2. **judge panel / jury** — multiple LLMs are aggregated;
3. **human-anchored judge** — judge behavior is calibrated against human labels;
4. **reference-grounded judge** — judge receives trusted reference evidence;
5. **deterministic / executable verifier** — correctness is decided by code, test, compiler, simulator, solver, etc.;
6. **formal oracle** — a logically trusted specification or solver determines correctness.

These are not equivalent assurance levels.

**Adoption status:** not decided.

---

# 2. Foundational positive evidence: strong LLM judges can approximate human preferences on open-ended chat tasks

## Evidence / observed practice

`Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena`, NeurIPS 2023, helped establish the modern LLM-judge paradigm.

The paper reports strong GPT-4 judge agreement with controlled and crowdsourced human preferences at over 80%, approximately the level of human-human agreement in its evaluated setting.

The same paper already documents important limitations:

- position bias,
- verbosity bias,
- self-enhancement / self-preference-like bias,
- limited reasoning ability.

Source:

- Zheng et al., `Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena`, NeurIPS 2023
  - https://proceedings.neurips.cc/paper_files/paper/2023/hash/91f18a1287b398d378ef22505bf41832-Abstract-Datasets_and_Benchmarks.html
  - https://arxiv.org/abs/2306.05685

## Knowledge captured

LLM judges can be very useful when the target variable is something close to **human preference over open-ended responses**.

This positive result should not automatically be generalized to:

- objective code correctness,
- hidden logical flaws,
- security compliance,
- repository rule adherence,
- exact semantic preservation.

**Adoption status:** not decided.

---

# 3. ICLR 2025 JudgeBench: objective correctness is much harder than preference matching

## Evidence / observed practice

JudgeBench, ICLR 2025, builds difficult response pairs with objectively grounded correctness labels across:

- knowledge,
- reasoning,
- mathematics,
- coding.

It evaluates prompted judges, fine-tuned judges, reward models, and multi-agent judges.

Reported examples:

- Vanilla GPT-4o judge: **50.86% overall**,
- Arena-Hard-prompted GPT-4o: **56.57% overall**,
- Claude-3.5-Sonnet: **64.29% overall**,
- o3-mini high reasoning setting: **80.86% overall**,
- ChatEval multi-agent judge: **34.00% overall**.

The paper explicitly notes that GPT-4o with a vanilla judge prompt performs around random guessing on this harder benchmark.

Source:

- Tan et al., `JudgeBench: A Benchmark for Evaluating LLM-Based Judges`, ICLR 2025
  - https://proceedings.iclr.cc/paper_files/paper/2025/file/9e720fce64f91114c49cfd640d821da3-Paper-Conference.pdf
  - https://mlanthology.org/iclr/2025/tan2025iclr-judgebench/

## Knowledge captured

A judge that looks excellent on human-preference benchmarks can be weak on objective fact / reasoning / code discrimination.

The relevant question is therefore not:

```text
"Is model X a good judge?"
```

but:

```text
"Is model X a good judge for this criterion, domain, candidate distribution, and difficulty?"
```

**Adoption status:** not decided.

---

# 4. Verification is not automatically easier than solving

## Evidence / observed practice

JudgeBench directly compares each model's ability to:

- solve a problem,
- judge candidate solutions to the same problem.

The paper reports that judge accuracy closely tracks solver accuracy overall.

Examples from its Table 4:

- GPT-4o solver 54.57% vs judge 56.57%,
- Claude-3.5-Sonnet solver 64.57% vs judge 64.29%,
- Llama-3.1-405B solver 57.71% vs judge 56.86%,
- Gemini-1.5-Pro solver 40.29% vs judge 47.14%.

The domain split matters strongly. In coding, the solver consistently outperforms the judge across the models reported, while math often shows the opposite pattern.

Source:

- JudgeBench, Section 4.4 / Table 4
  - https://proceedings.iclr.cc/paper_files/paper/2025/file/9e720fce64f91114c49cfd640d821da3-Paper-Conference.pdf

## Knowledge captured

The intuition:

```text
"the answer already exists, so verifying it must be easier than generating it"
```

is not generally true.

For some domains the judge needs enough competence to reconstruct or validate the underlying solution, especially when the defect is subtle.

Possible project implication to preserve:

- an independent LLM reviewer may be useful only when its capability on the relevant rule class is known;
- a weaker judge cannot be assumed to certify a stronger producer simply because the task is called `review`.

**Adoption status:** not decided.

---

# 5. Position bias is systematic, task-dependent, and not random noise

## Evidence / observed practice

`Judging the Judges: A Systematic Study of Position Bias in LLM-as-a-Judge`, IJCNLP-AACL 2025, evaluates:

- 15 LLM judges,
- MTBench and DevBench,
- 22 tasks,
- roughly 40 solution-generating models,
- more than 150,000 evaluation instances.

The study introduces:

- repetition stability,
- position consistency,
- preference fairness.

It finds position bias is systematic rather than random and varies by judge, candidate pair, and task. Bias is strongly affected by how close the candidates are in quality.

Source:

- Shi et al., `Judging the Judges: A Systematic Study of Position Bias in LLM-as-a-Judge`, 2025
  - https://aclanthology.org/2025.ijcnlp-long.18/

## Knowledge captured

A judge can be correct on obvious pairs yet unreliable exactly where a release / ranking decision is hardest: **near ties**.

Position-swap testing can reveal one bias class, but passing a swap test does not prove factual or semantic correctness.

**Adoption status:** not decided.

---

# 6. Judge bias is broader than answer order

## Evidence / observed practice

`Humans or LLMs as the Judge? A Study on Judgement Bias`, EMNLP 2024, tests both humans and LLM judges for several perturbation-based biases, including:

- Misinformation Oversight Bias,
- Gender Bias,
- Authority Bias,
- Beauty Bias.

The authors find both human and LLM judges vulnerable to perturbations to varying degrees and demonstrate attacks exploiting those biases.

Source:

- Chen et al., `Humans or LLMs as the Judge? A Study on Judgement Bias`, EMNLP 2024
  - https://aclanthology.org/2024.emnlp-main.474/

A separate ACL 2025 safety-evaluator study tests 11 LLM judges for self-consistency, human alignment, and artifacts such as apologetic / verbose phrasing. It reports that apologetic-language artifacts can shift safety preference by up to 98% in some evaluated conditions.

Source:

- Chen & Goldfarb-Tarrant, `Safer or Luckier? LLMs as Safety Evaluators Are Not Robust to Artifacts`, ACL 2025
  - https://aclanthology.org/2025.acl-long.970/

## Knowledge captured

A judge may respond to **presentation artifacts unrelated to the target criterion**.

Potential bias dimensions include:

- order,
- verbosity,
- formatting,
- polished style,
- authority framing,
- apologetic wording,
- demographic / social cues,
- model-family writing style.

A single accuracy aggregate can hide these.

**Adoption status:** not decided.

---

# 7. Self-preference remains a risk even when the judge is nominally separate from the current call

## Evidence / observed practice

`Self-Preference Bias in LLM-as-a-Judge`, NeurIPS 2024 workshop, reports significant GPT-4 self-preference and links the effect to lower perplexity / greater familiarity with text resembling the judge's own generation distribution.

Source:

- Wataoka et al., `Self-Preference Bias in LLM-as-a-Judge`
  - https://arxiv.org/abs/2410.21819

`Beyond the Surface: Measuring Self-Preference in LLM Judgments`, EMNLP 2025, argues that naive self-preference metrics can confound response quality with bias. It introduces gold judgments to control for true response quality and still finds measurable self-preference patterns across models, versions, sizes, and reasoning capabilities.

Source:

- Chen et al., `Beyond the Surface: Measuring Self-Preference in LLM Judgments`, EMNLP 2025
  - https://aclanthology.org/2025.emnlp-main.86/

## Knowledge captured

Using a different API call is not enough to ensure independence if the judge and producer are from the same model / training family.

Even cross-family judges can still share broader language-model conventions and biases.

**Adoption status:** not decided.

---

# 8. Candidate outputs are untrusted input to an LLM judge

## Evidence / observed practice

JudgeDeceiver, ACM CCS 2024, develops an optimization-based prompt-injection attack that appends an adversarial sequence to a candidate response so that an LLM judge selects the attacker-controlled answer.

The attack is demonstrated in:

- LLM-powered search,
- RLAIF,
- tool selection.

The paper also evaluates defenses such as known-answer and perplexity-based detection and finds them insufficient in the tested conditions.

Sources:

- Shi et al., `Optimization-based Prompt Injection Attack to LLM-as-a-Judge`, CCS 2024
  - https://arxiv.org/abs/2403.17710
  - https://github.com/ShiJiawenwen/JudgeDeceiver

`Is LLM-as-a-Judge Robust?`, EMNLP 2024, similarly shows short universal adversarial phrases can inflate zero-shot assessment scores and transfer to unseen judges; absolute scoring is reported as more vulnerable than comparative assessment in its experiments.

Source:

- Raina et al., `Is LLM-as-a-Judge Robust? Investigating Universal Adversarial Attacks on Zero-shot LLM Assessment`, EMNLP 2024
  - https://aclanthology.org/2024.emnlp-main.427/

ICLR 2025 `BadJudge` examines evaluator backdoors. In one reported setting, poisoning only 1% of evaluator training data with a single-token trigger triples the adversary's score relative to the legitimate score; weaker web-poisoning assumptions still produce score inflation.

Source:

- Tong et al., `BadJudge: Backdoor Vulnerabilities of LLM-As-A-Judge`, ICLR 2025
  - https://proceedings.iclr.cc/paper_files/paper/2025/hash/2e48f562a2c8f64c7404a6c3a518af74-Abstract-Conference.html

## Knowledge captured

An LLM judge is simultaneously:

```text
evaluator
+
LLM reading attacker / candidate-controlled text
```

Therefore it inherits prompt-injection / data-vs-instruction trust-boundary problems.

A judge cannot be treated like a deterministic parser simply because its prompt says `evaluate only`.

**Adoption status:** not decided.

---

# 9. Safety judges can fail under distribution shift and adversarial pressure

## Evidence / observed practice

`Know Thy Judge`, ICLR 2025 workshop proceedings, studies safety-judge robustness and reports:

- output-style changes causing false-negative-rate jumps up to 0.24 on the same dataset,
- adversarial generations fooling some judges into classifying 100% of harmful outputs as safe in tested attack conditions.

Source:

- Eiras et al., `Know Thy Judge: On the Robustness Meta-Evaluation of LLM Safety Judges`, 2025
  - https://proceedings.mlr.press/v296/eiras25a.html

## Knowledge captured

Judge reliability is a property of at least:

```text
judge model
× prompt / rubric
× input population
× criterion
× adversarial regime
```

A judge validated on one distribution should not automatically be treated as calibrated on a new one.

**Adoption status:** not decided.

---

# 10. Panels / juries can reduce some single-model bias

## Positive evidence / observed practice

`Replacing Judges with Juries: Evaluating LLM Generations with a Panel of Diverse Models` proposes PoLL, a Panel of LLM Evaluators built from different model families.

Across three evaluation settings and six datasets, the authors report that a panel of multiple smaller diverse models:

- outperforms a single large judge in their evaluated settings,
- reduces intra-model bias,
- is more than seven times cheaper than the compared large judge configuration.

Reported examples include high agreement with human annotations / rankings, such as strong Cohen's kappa on QA datasets and strong correlation with Chatbot Arena rankings.

Source:

- Verga et al., `Replacing Judges with Juries: Evaluating LLM Generations with a Panel of Diverse Models`, 2024
  - https://arxiv.org/abs/2404.18796

## Knowledge captured

Diversity can improve evaluation when the members' errors are sufficiently different and the aggregation method is suitable.

This is one reason independent reviewers can provide value beyond same-model review.

**Adoption status:** not decided.

---

# 11. Multi-agent / jury is not automatically better

## Negative evidence / observed practice

JudgeBench evaluates ChatEval, a multi-agent debate judge, and reports **34.00% overall** on JudgeBench — substantially below several single strong judges and below random pairwise guessing.

Source:

- JudgeBench, ICLR 2025

This matters because `multi-agent` describes architecture, not reliability.

A panel can fail if:

- all judges lack the required competence,
- debate amplifies a wrong argument,
- members share correlated blind spots,
- the final aggregation rule is weak,
- one member dominates others,
- candidate / judge prompt injection propagates through the panel.

**Adoption status:** not decided.

---

# 12. 2026 evidence: many judges can provide far fewer independent votes than their count suggests

## Evidence / observed practice

`Nine Judges, Two Effective Votes: Correlated Errors Undermine LLM Evaluation Panels`, May 2026 preprint, evaluates:

- nine frontier LLM judges,
- seven model families,
- three natural-language inference datasets,
- 100 human annotations per item.

The paper estimates that the nine-judge panel provides only about **two independent votes' worth of information** because judges tend to make the same mistakes on the same examples.

Source:

- Kohli, `Nine Judges, Two Effective Votes: Correlated Errors Undermine LLM Evaluation Panels`, 2026 preprint
  - https://doi.org/10.48550/arXiv.2605.29800

## Evidence strength / limitation

This is a recent preprint and should be treated as emerging evidence rather than a universal panel law.

## Knowledge captured

Nominal panel size is not the same as effective independence:

```text
9 models
≠
9 independent error processes
```

Simple majority-vote reliability formulas can be badly optimistic when judge errors are correlated.

**Adoption status:** not decided.

---

# 13. Inter-LLM consensus can reflect shared bias rather than human-aligned signal

## Evidence / observed practice

Microsoft Research's 2026 preprint `The Geometry of LLM-as-Judge` evaluates dozens of judges across community-built Indic datasets and finds that on subjective rubrics:

- LLM judges agree with one another more than they agree with humans,
- judge score variation is narrower than human variation,
- the main judge evaluation axis can be far from the human evaluation axis.

The abstract reports inter-LLM correlation around `r ≈ 0.35` versus LLM-human around `r ≈ 0.27–0.32` in the studied subjective settings.

On a rubric with a verifiable factual answer, the judge-human gap becomes materially smaller.

Source:

- Mukherjee et al., `The Geometry of LLM-as-Judge: Why Inter-LLM Consensus Is Not Human Alignment`, 2026
  - https://arxiv.org/abs/2606.03043
  - https://www.microsoft.com/en-us/research/publication/the-geometry-of-llm-as-judge-why-inter-llm-consensus-is-not-human-alignment/

## Knowledge captured

Consensus is ambiguous:

```text
judges agree because answer is correct
```

and

```text
judges agree because they share the same evaluative shortcut
```

can look identical if only vote agreement is observed.

A jury needs some external anchor if the target is not inherently machine-verifiable.

**Adoption status:** not decided.

---

# 14. Latest 2026 factuality evidence: unanimous false consensus can be correlated

## Evidence / observed practice

`JuryProbe`, August 2026 preprint, studies reference-free factuality panels and specifically measures false-negative-only error correlation and false-consensus lift.

On its audited FEVER corruptions, the authors report correlated false negatives and false-consensus lifts above the independent-error expectation. When the same judges are given trusted references in the benchmark's best-case diagnostic, unanimous false consensus drops to zero on the tested minimal-pair and non-minimal-pair evidence sets.

The paper explicitly states that JuryProbe provides no formal risk guarantee and does not establish universally reliable stand-down behavior.

Source:

- Zhou & Lin, `JuryProbe: An Empirical Consensus-Risk Diagnostic for Routing Reference-Free Factuality Judge Panels to Grounded Verification`, 2026 preprint
  - https://arxiv.org/abs/2608.20607

## Knowledge captured

This provides a direct mechanism distinction:

```text
reference-free consensus
≠
independent evidence
```

Trusted grounding can change the error structure of the same judges.

**Adoption status:** not decided.

---

# 15. Aggregation method matters when a panel contains biased / corrupted judges

## Evidence / observed practice

`RoPoLL: Robust Panel of LLM Judges`, June 2026 preprint / ICML workshop work, formalizes LLM jury aggregation under a contamination model.

The authors argue ordinary PoLL-style mean aggregation can have unbounded bias under positive biased contamination and propose robust geometric-median aggregation.

Across 13 open-weight judges, three reward-model benchmarks, and several simulated corruption regimes, the proposed robust aggregation outperforms ordinary PoLL on biased corruption settings in the reported experiments.

Source:

- Acharya et al., `RoPoLL: Robust Panel of LLM Judges`, 2026
  - https://arxiv.org/abs/2606.30931
  - https://www.amazon.science/publications/ropoll-robust-panel-of-llm-judges

## Knowledge captured

Even when multiple judges are useful, the final decision rule is itself an assurance component.

Possible aggregation families include:

- simple majority,
- arithmetic mean,
- weighted vote,
- reliability-aware ranking,
- robust estimators,
- disagreement-triggered escalation.

No aggregation method is adopted here.

---

# 16. Judge reliability varies by criterion at least as much as by judge model

## Evidence / observed practice

`Diagnosing LLM Judge Reliability: Conformal Prediction Sets and Transitivity Violations`, 2026 workshop study, evaluates four judges and four criteria on SummEval.

The authors report:

- 33–67% of documents exhibit at least one directed 3-cycle even when aggregate transitivity violation rates look low,
- criterion has a strong effect on reliability,
- relevance is judged much more reliably than fluency / consistency in their setup.

Source:

- Gupta & Kumar, `Diagnosing LLM Judge Reliability: Conformal Prediction Sets and Transitivity Violations`, 2026
  - https://openreview.net/forum?id=FbDuesI6tD

GroUSE, COLING 2025, similarly shows automated RAG judges can overlook specific grounded-QA failure modes even when they correlate strongly with GPT-4 judgments.

Source:

- Muller et al., `GroUSE: A Benchmark to Evaluate Evaluators in Grounded Question Answering`, COLING 2025
  - https://aclanthology.org/2025.coling-main.304/

## Knowledge captured

High correlation with another LLM judge is not sufficient validation.

A judge should be meta-evaluated on the exact failure classes it is expected to detect.

**Adoption status:** not decided.

---

# 17. Test-retest consistency is not the same as validity

## Evidence / observed practice

Recent 2026 large-scale judge audits report a pattern where judges can be highly internally consistent while still carrying systematic bias.

`Reliability without Validity`, June 2026 preprint, evaluates 21 judges across MT-Bench, JudgeBench, and RewardBench under agreement, consistency, and bias protocols. It reports, among other findings:

- judge rankings change substantially across benchmarks,
- very high test-retest reliability can coexist with substantial position bias,
- chance-corrected agreement can be much lower than raw exact-match agreement.

Source:

- Norman et al., `Reliability without Validity: A Systematic, Large-Scale Evaluation of LLM-as-a-Judge Models Across Agreement, Consistency, and Bias`, 2026 preprint
  - https://arxiv.org/abs/2606.19544

## Knowledge captured

These are separate questions:

```text
Does the judge give the same answer repeatedly?
```

```text
Is that answer correct / valid?
```

A consistently wrong judge is reliable in the narrow repeatability sense but invalid as an assurance oracle.

**Adoption status:** not decided.

---

# 18. Judge upgrades can change the measurement itself

## Evidence / observed practice

`When the Judge Changes, So Does the Measurement`, July 2026 preprint, audits evaluator replacement across multiple judge versions and reports that upgrading judge scale / model release does not produce monotonic or interchangeable improvements. It also reports residual position / verbosity bias and limited gains from repeated-sample juries when errors remain correlated.

Source:

- Yang et al., `When the Judge Changes, So Does the Measurement: Auditing LLM-as-Judge Reliability`, 2026 preprint
  - https://arxiv.org/abs/2607.08535

## Knowledge captured

A judge version is part of the measurement instrument.

Changing the judge can invalidate historical comparability even if:

- candidate outputs are unchanged,
- rubric text is unchanged,
- provider claims the newer model is stronger.

This connects directly to later stale-evidence / versioning research.

**Adoption status:** not decided.

---

# 19. Uncertainty should be treated as an output to calibrate, not hidden behind a forced verdict

## Evidence / observed practice

`Analyzing Uncertainty of LLM-as-a-Judge`, EMNLP 2025, applies conformal prediction to LLM judge scoring and produces prediction intervals with coverage guarantees under the method's assumptions.

Source:

- Sheng et al., `Analyzing Uncertainty of LLM-as-a-Judge: Interval Evaluations with Conformal Prediction`, EMNLP 2025
  - https://aclanthology.org/2025.emnlp-main.569/

`Calibrating LLM Judges`, ACL Industry 2026, reports that common verbalized confidence and multi-generation uncertainty techniques can be poorly calibrated or expensive. The authors train linear probes over judge hidden states using Brier-score objectives and report better calibration / high-confidence accuracy in their evaluated settings, with conservative behavior on easy datasets.

Source:

- Radharapu et al., `Calibrating LLM Judges: Linear Probes for Fast and Reliable Uncertainty Estimation`, ACL Industry 2026
  - https://aclanthology.org/2026.acl-industry.14/

## Knowledge captured

The binary interface:

```text
PASS / FAIL
```

can hide cases where the judge itself has weak evidence.

Research mechanisms include:

- calibrated probabilities,
- prediction intervals / sets,
- abstention,
- disagreement routing,
- high-confidence-only automation.

No confidence threshold is adopted here.

---

# 20. Human calibration can make imperfect judges statistically usable without pretending they are perfect

## Evidence / observed practice

`Noisy but Valid`, ICLR 2026, treats the LLM judge as an imperfect classifier and uses a small human-labeled calibration set to estimate judge true-positive / false-positive rates. It derives a corrected hypothesis test with finite-sample Type-I error control under its framework.

The paper emphasizes a remaining `Oracle Gap`: practical calibration is still weaker than knowing the judge's true error rates perfectly.

Source:

- Feng et al., `Noisy but Valid: Robust Statistical Evaluation of LLMs with Imperfect Judges`, ICLR 2026
  - https://proceedings.iclr.cc/paper_files/paper/2026/hash/08a67eb74bfb9ded9e949dd52973e997-Abstract-Conference.html

## Knowledge captured

An evaluator does not have to be perfect to be useful if its error process is measured and propagated into the final uncertainty.

This is a fundamentally different assurance model from:

```text
"the judge said PASS, therefore the artifact is correct"
```

It is closer to measurement science:

```text
judge has measured sensitivity / specificity
+ calibration uncertainty
+ sampling uncertainty
→ corrected inference
```

**Adoption status:** not decided.

---

# 21. References / oracles can materially improve judging

## Evidence / observed practice

Several independent sources point to the value of trusted grounding:

- JudgeBench constructs objective labels from known benchmark answers / execution-style correctness and finds preference-style judge performance much weaker than on easier preference benchmarks.
- JuryProbe reports large reduction of false consensus when trusted references are supplied in its best-case factuality diagnostic.
- `RevisEval` reports improved NLG evaluation when the judge receives response-adapted references.
- practical judge-design studies report better alignment when references and explicit criteria are supplied.

Source:

- Zhang et al., `RevisEval: Improving LLM-as-a-Judge via Response-Adapted References`
  - https://arxiv.org/abs/2410.05193

## Knowledge captured

The term `independent verifier` should distinguish:

```text
independent opinion
```

from

```text
independent evidence
```

A second model with no new information may add another opinion. A second model with a compiler result, trusted reference, test failure, or formal invariant has access to a different evidence channel.

**Adoption status:** not decided.

---

# 22. Judge reasoning / CoT can improve evaluation but does not itself prove correctness

## Evidence / observed practice

`Crowd Comparative Reasoning`, ACL 2025, argues standard judge CoT can miss important details. It introduces extra comparison responses to expose deeper distinctions and reports an average 6.7% accuracy gain across five benchmarks.

Source:

- Zhang et al., `Crowd Comparative Reasoning: Unlocking Comprehensive Evaluations for LLM-as-a-Judge`, ACL 2025
  - https://aclanthology.org/2025.acl-long.252/

## Knowledge captured

More thorough reasoning can improve a judge, but critique text remains generated evidence rather than an external oracle.

A fluent judge explanation can still support a wrong verdict, just as prior self-review research showed.

**Adoption status:** not decided.

---

# 23. Current failure taxonomy for independent LLM judging

## A. Competence ceiling

```text
judge lacks knowledge / reasoning / code ability needed to detect the defect
```

Evidence:

- JudgeBench.

## B. Position bias

```text
same candidates + swapped order
→ different verdict
```

Evidence:

- MT-Bench literature,
- Shi et al. 2025.

## C. Style / verbosity / artifact bias

```text
irrelevant presentation feature
→ changes score
```

Evidence:

- Safer or Luckier,
- human/LLM bias studies.

## D. Self / family preference

```text
judge favors familiar generation distribution
```

Evidence:

- Wataoka et al.,
- Chen et al. 2025.

## E. Candidate prompt injection

```text
candidate text instructs or adversarially manipulates judge
→ verdict changes
```

Evidence:

- JudgeDeceiver,
- EMNLP adversarial judge work.

## F. Correlated panel error

```text
multiple judges
→ same blind spot
→ consensus looks stronger than effective evidence
```

Evidence:

- Nine Judges, Two Effective Votes,
- Geometry of LLM-as-Judge,
- JuryProbe.

## G. Aggregation failure

```text
one / several biased judges
→ mean / majority gives misleading panel result
```

Evidence:

- RoPoLL research,
- jury literature.

## H. Criterion mismatch

```text
judge is strong on one criterion
→ weak on another
```

Evidence:

- JudgeBench domain split,
- GroUSE,
- conformal / transitivity work.

## I. Repeatability-validity confusion

```text
judge repeats same verdict reliably
→ verdict is still systematically wrong
```

Evidence:

- Reliability without Validity.

## J. Calibration failure

```text
judge confidence / score
→ does not match true error probability
```

Evidence:

- ACL 2026 calibration,
- conformal prediction work.

## K. Version drift

```text
judge model is upgraded
→ measurement changes
```

Evidence:

- When the Judge Changes.

## L. Grounding blindness

```text
judge has no trusted reference / executable evidence
→ shared plausible misconception survives review
```

Evidence synthesis:

- JudgeBench,
- JuryProbe,
- self-review external-verifier literature.

---

# 24. Possible mechanisms observed in research — not recommendations

Per the Research Capture Policy, preserve mechanisms before feasibility filtering.

## Single-judge controls

- pairwise position swapping,
- repeated scoring / stability checks,
- explicit criterion decomposition,
- pointwise vs pairwise evaluation comparison,
- reference-grounded judging,
- criteria / rubric anchoring,
- judge-output schema validation,
- candidate-content isolation / trust labeling,
- injection detection,
- abstention / uncertainty reporting,
- human calibration sets,
- criterion-specific calibration,
- adversarial judge tests,
- judge-version pinning.

## Panel / jury controls

- cross-family judge diversity,
- reliability-weighted votes,
- robust aggregation,
- error-correlation estimation,
- effective-vote estimation,
- disagreement-triggered escalation,
- dynamic jury selection,
- reference acquisition only for high-risk cases,
- leave-one-family-out sensitivity checks.

## Evidence-oriented controls

- compiler / test / simulator results,
- trusted reference answers,
- formal invariants,
- execution traces,
- retrieval from authoritative sources,
- human expert labels,
- calibration probes,
- deterministic unit checks.

## Model-level / expensive mechanisms

- dedicated judge fine-tuning,
- reward models,
- hidden-state uncertainty probes,
- process verifier training,
- multi-judge specialist training,
- robust-statistical aggregation systems,
- adversarially trained evaluators.

All remain research mechanisms.

---

# 25. Negative results / cautions that should remain visible

1. **Human-preference agreement does not prove objective correctness discrimination.**
   - MT-Bench positive results vs JudgeBench difficulty.

2. **Verifying is not always easier than solving.**
   - JudgeBench solver-vs-judge ablation.

3. **Coding can be harder to judge than to solve in tested models.**
   - JudgeBench category results.

4. **Multi-agent judge architecture can perform worse than a single judge.**
   - ChatEval on JudgeBench.

5. **Multiple judges do not imply multiple independent votes.**
   - correlated-error studies.

6. **Inter-LLM consensus does not prove human alignment.**
   - Geometry of LLM-as-Judge.

7. **Reference-free factuality panels can share false negatives.**
   - JuryProbe.

8. **A judge can be stable and biased simultaneously.**
   - Reliability without Validity.

9. **Position bias is systematic and especially relevant on close calls.**

10. **Style / apology / verbosity artifacts can dominate the target property.**

11. **Candidate outputs can attack the judge.**
   - JudgeDeceiver / adversarial assessment.

12. **Naive mean / majority aggregation can be fragile under biased contamination.**
   - RoPoLL.

13. **Self-preference can survive controls for actual response quality.**

14. **Changing judge model/version can change the measurement.**

15. **Judge confidence is not automatically calibrated.**

16. **Fine judge explanations / CoT are not external evidence.**

17. **High agreement with another LLM judge can merely reproduce the same blind spot.**

18. **Calibration itself can become stale under distribution shift.**

---

# 26. Current working interpretations for `web-project-guide` — not adoption decisions

## H1. Different-model review is plausibly more independent than same-model review, but independence must be measured

Changing model family can reduce some self-attribution / family-specific correlation, but the evidence does not justify treating cross-model review as automatically independent.

## H2. The verifier should be evaluated against the exact failure class it is supposed to catch

A judge that is strong on style or general preference may still be poor at:

- migration compatibility,
- code semantics,
- security invariants,
- multi-file repository consistency.

## H3. A judge verdict without evidence is a second opinion, not proof

This is especially important when the judge cannot execute code or inspect authoritative state.

## H4. Panels should eventually be evaluated by effective independence, not nominal judge count

Three models from different providers may still share enough error structure that the panel is much weaker than three independent reviewers.

## H5. Disagreement may be valuable evidence rather than a nuisance

If independent judges disagree, forcing majority acceptance can hide uncertainty. A future system could treat disagreement as an escalation / evidence-acquisition signal.

## H6. Reference / test / executable evidence appears qualitatively stronger than extra free-form judging

This repeats the pattern found in self-review research.

## H7. Judge calibration belongs to a versioned `(judge, rubric, domain, population)` relationship

A calibration result may become invalid after:

- model update,
- prompt change,
- task distribution change,
- rule change,
- candidate-model change.

## H8. A future verifier receipt would need more than `judge: pass`

Possible research-only fields include:

- judge identity / version,
- rubric version,
- criterion IDs checked,
- external evidence used,
- confidence / uncertainty,
- position-swap consistency,
- panel disagreement,
- calibration provenance,
- unresolved defects.

No receipt schema is adopted here.

## H9. Severity may determine how much judge uncertainty is acceptable

A low-risk wording check and a data-loss / security rule should not necessarily rely on the same evidence threshold.

This enters later assurance synthesis and remains undecided.

## H10. Independent LLM judging looks more like a fallible measurement instrument than a binary oracle

The newest calibration / robust-statistics literature strongly supports characterizing judge error rather than pretending it is zero.

---

# 27. Evidence map

| Claim | Main evidence | Evidence status | Current confidence | Important limitation |
|---|---|---|---|---|
| Strong LLM judges can approximate human preference on open-ended chat | MT-Bench / Chatbot Arena | NeurIPS 2023 peer-reviewed | High for studied preference setting | does not imply objective correctness |
| Objective correctness judging can be near random for strong general judges | JudgeBench | ICLR 2025 peer-reviewed | High | 350-pair benchmark; difficult selected pairs |
| Judge ability often tracks solver ability | JudgeBench | ICLR 2025 peer-reviewed | High for evaluated domains | domain/model dependent |
| Coding can be harder to judge than solve | JudgeBench | ICLR 2025 peer-reviewed | Moderate–High | benchmark-specific coding distribution |
| Position bias is systematic and task/judge dependent | Shi et al. | 2025 peer-reviewed | High | pair/list comparison setting |
| Style / safety artifacts can strongly distort judge verdicts | Safer or Luckier | ACL 2025 peer-reviewed | High for tested safety setting | exact effect size is artifact/domain specific |
| Self-preference exists after controlling more carefully for quality | Chen et al. | EMNLP 2025 peer-reviewed | Moderate–High | mechanism / magnitude model dependent |
| LLM judges are vulnerable to candidate-side adversarial manipulation | JudgeDeceiver; EMNLP attack studies | CCS/EMNLP 2024 peer-reviewed | High | attack assumptions vary |
| Diverse judge panels can outperform a single judge | PoLL | 2024 research | Moderate–High positive | not universal; task-specific |
| Multi-agent judge can underperform single judges | JudgeBench ChatEval | ICLR 2025 peer-reviewed | High negative example | one multi-agent architecture |
| Nominal judge count can vastly overstate effective independence | Nine Judges, Two Effective Votes | 2026 preprint | Moderate emerging | NLI domains; needs replication |
| Inter-LLM consensus can reflect shared bias rather than human alignment | Geometry of LLM-as-Judge | 2026 preprint / Microsoft | Moderate–High emerging | Indic subjective datasets; human target itself variable |
| Reference-free panels can have correlated false consensus | JuryProbe | Aug 2026 preprint | Moderate emerging | factuality / FEVER corruption setup |
| Robust aggregation can outperform naive mean under biased panel corruption | RoPoLL | 2026 workshop/preprint | Moderate emerging | modeled / simulated corruption regimes |
| Criterion can matter as much as judge model | GroUSE; transitivity/conformal study | peer-reviewed + workshop | Moderate–High | dataset-specific |
| High repeatability can coexist with systematic bias | Reliability without Validity | 2026 preprint | Moderate emerging | very recent large-scale audit |
| Judge uncertainty can be calibrated / represented rather than forced into a point verdict | EMNLP 2025 conformal; ACL 2026 probes | peer-reviewed | High for studied setups | assumptions / model-internal access differ |
| Human-calibrated imperfect judges can support statistically valid inference | Noisy but Valid | ICLR 2026 peer-reviewed | High for framework conditions | requires calibration labels and stationarity assumptions |
| Judge model/version changes can alter measurement | 2026 audit | recent preprint | Moderate emerging | specific model families / datasets |

---

# 28. Source register

## Foundational / positive judge evidence

1. Zheng et al. — `Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena`
   - NeurIPS 2023
   - https://proceedings.neurips.cc/paper_files/paper/2023/hash/91f18a1287b398d378ef22505bf41832-Abstract-Datasets_and_Benchmarks.html

2. Verga et al. — `Replacing Judges with Juries: Evaluating LLM Generations with a Panel of Diverse Models`
   - 2024
   - https://arxiv.org/abs/2404.18796

## Core meta-evaluation / negative evidence

3. Tan et al. — `JudgeBench: A Benchmark for Evaluating LLM-Based Judges`
   - ICLR 2025
   - https://mlanthology.org/iclr/2025/tan2025iclr-judgebench/

4. Shi et al. — `Judging the Judges: A Systematic Study of Position Bias in LLM-as-a-Judge`
   - 2025
   - https://aclanthology.org/2025.ijcnlp-long.18/

5. Chen et al. — `Humans or LLMs as the Judge? A Study on Judgement Bias`
   - EMNLP 2024
   - https://aclanthology.org/2024.emnlp-main.474/

6. Chen & Goldfarb-Tarrant — `Safer or Luckier? LLMs as Safety Evaluators Are Not Robust to Artifacts`
   - ACL 2025
   - https://aclanthology.org/2025.acl-long.970/

7. Muller et al. — `GroUSE: A Benchmark to Evaluate Evaluators in Grounded Question Answering`
   - COLING 2025
   - https://aclanthology.org/2025.coling-main.304/

## Self-preference / bias

8. Wataoka et al. — `Self-Preference Bias in LLM-as-a-Judge`
   - NeurIPS 2024 Workshop
   - https://arxiv.org/abs/2410.21819

9. Chen et al. — `Beyond the Surface: Measuring Self-Preference in LLM Judgments`
   - EMNLP 2025
   - https://aclanthology.org/2025.emnlp-main.86/

## Adversarial judge evidence

10. Shi et al. — `Optimization-based Prompt Injection Attack to LLM-as-a-Judge`
    - ACM CCS 2024
    - https://arxiv.org/abs/2403.17710

11. Raina et al. — `Is LLM-as-a-Judge Robust? Investigating Universal Adversarial Attacks on Zero-shot LLM Assessment`
    - EMNLP 2024
    - https://aclanthology.org/2024.emnlp-main.427/

12. Tong et al. — `BadJudge: Backdoor Vulnerabilities of LLM-As-A-Judge`
    - ICLR 2025
    - https://proceedings.iclr.cc/paper_files/paper/2025/hash/2e48f562a2c8f64c7404a6c3a518af74-Abstract-Conference.html

13. Eiras et al. — `Know Thy Judge: On the Robustness Meta-Evaluation of LLM Safety Judges`
    - ICLR 2025 Workshop / PMLR
    - https://proceedings.mlr.press/v296/eiras25a.html

## 2026 panel / correlation / consensus evidence

14. Kohli — `Nine Judges, Two Effective Votes: Correlated Errors Undermine LLM Evaluation Panels`
    - 2026 preprint
    - https://arxiv.org/abs/2605.29800

15. Mukherjee et al. — `The Geometry of LLM-as-Judge: Why Inter-LLM Consensus Is Not Human Alignment`
    - 2026 preprint
    - https://arxiv.org/abs/2606.03043

16. Acharya et al. — `RoPoLL: Robust Panel of LLM Judges`
    - 2026
    - https://arxiv.org/abs/2606.30931

17. Zhou & Lin — `JuryProbe: An Empirical Consensus-Risk Diagnostic for Routing Reference-Free Factuality Judge Panels to Grounded Verification`
    - Aug 2026 preprint
    - https://arxiv.org/abs/2608.20607

18. Qian et al. — `Who can we trust? LLM-as-a-jury for Comparative Assessment`
    - 2026 preprint
    - https://arxiv.org/abs/2602.16610

## Calibration / uncertainty / statistical validity

19. Sheng et al. — `Analyzing Uncertainty of LLM-as-a-Judge: Interval Evaluations with Conformal Prediction`
    - EMNLP 2025
    - https://aclanthology.org/2025.emnlp-main.569/

20. Radharapu et al. — `Calibrating LLM Judges: Linear Probes for Fast and Reliable Uncertainty Estimation`
    - ACL Industry 2026
    - https://aclanthology.org/2026.acl-industry.14/

21. Feng et al. — `Noisy but Valid: Robust Statistical Evaluation of LLMs with Imperfect Judges`
    - ICLR 2026
    - https://proceedings.iclr.cc/paper_files/paper/2026/hash/08a67eb74bfb9ded9e949dd52973e997-Abstract-Conference.html

## Recent measurement / version-drift work

22. Norman et al. — `Reliability without Validity: A Systematic, Large-Scale Evaluation of LLM-as-a-Judge Models Across Agreement, Consistency, and Bias`
    - 2026 preprint
    - https://arxiv.org/abs/2606.19544

23. Yang et al. — `When the Judge Changes, So Does the Measurement: Auditing LLM-as-Judge Reliability`
    - 2026 preprint
    - https://arxiv.org/abs/2607.08535

## Judge-improvement / reference work

24. Zhang et al. — `Crowd Comparative Reasoning: Unlocking Comprehensive Evaluations for LLM-as-a-Judge`
    - ACL 2025
    - https://aclanthology.org/2025.acl-long.252/

25. Zhang et al. — `RevisEval: Improving LLM-as-a-Judge via Response-Adapted References`
    - 2024
    - https://arxiv.org/abs/2410.05193

---

# 29. Research gaps deliberately left open

The following remain separate future passes:

- **multi-agent verification** beyond LLM-as-a-judge panels,
- judge specialization vs generalist judges,
- same-model vs cross-model judge under matched capability / cost,
- independent model-family diversity measurement,
- deterministic validator / symbolic verification reliability,
- SAT / SMT / theorem prover integration,
- semantic verifier false-positive / false-negative measurement,
- human-review reliability and inter-rater disagreement,
- expert vs non-expert human ground truth,
- evidence receipts / proof-of-checking,
- false statements such as `I checked the tests` without tool evidence,
- stale / invalidated judge evidence after artifact changes,
- repository-level coding-agent adherence,
- `AGENTS.md` / nested rule-file verification,
- judge handling of long context,
- judge handling of many simultaneous constraints,
- hierarchy-aware judging,
- prompt-injection-resistant judge isolation,
- evaluator model supply-chain trust,
- calibration transfer across repositories / versions,
- severity-weighted judge confidence,
- when a human must remain in the loop,
- formal assurance arguments for trusting a verifier stack.

---

# 30. Current research stopping point

For this theme, the evidence is sufficient to preserve the following conclusions without moving into adoption:

1. independent LLM judges can approximate human preferences well in some open-ended settings;
2. objective correctness judging on difficult knowledge / reasoning / math / coding tasks can be far weaker, including near-random performance for strong general models;
3. verification is not universally easier than solving and can be especially weak in coding;
4. position, style, verbosity, authority, self-preference, and other biases can alter judge verdicts independently of target quality;
5. candidate outputs can adversarially manipulate LLM judges;
6. diverse panels can outperform a single judge in some settings;
7. multi-agent judging is not automatically more reliable and can perform worse than strong single judges;
8. panel members can have strongly correlated errors, making nominal judge count overstate effective independence;
9. inter-LLM consensus can represent shared bias rather than human-aligned truth;
10. trusted references / executable evidence can materially reduce some shared-error modes;
11. aggregation strategy is itself a reliability component;
12. judge reliability depends strongly on criterion / domain / input population, not just model identity;
13. repeatability and validity are separate properties;
14. judge uncertainty can be calibrated, represented, and used for selective escalation rather than hidden behind a forced binary verdict;
15. an imperfect judge can still support statistically valid inference when its error rates are measured and uncertainty is propagated;
16. judge model / prompt / version changes can change the measurement and may invalidate prior calibration;
17. current evidence therefore does not support treating a different LLM's `PASS` verdict as a standalone high-assurance proof of rule compliance;
18. this does not make independent judging useless — it can be a valuable barrier when combined with diversity, calibration, trusted evidence, and explicit uncertainty.

This is enough to stop this single theme without designing the final Guide architecture.

**No Common Rule, Router behavior, Gate, mandatory independent judge, jury size, judge family requirement, confidence threshold, calibration policy, verifier architecture, or adoption decision is created by this file.**