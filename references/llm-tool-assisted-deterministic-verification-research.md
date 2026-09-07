# LLM Tool-Assisted / Deterministic Verification Research

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
  - `references/llm-independent-verifier-judge-research.md`
  - `references/llm-multi-agent-verification-debate-research.md`
- This file is **non-normative research evidence**.
- Adoption status for all mechanisms below: **not decided**, unless explicitly stated otherwise.
- Research is high-recall first. Mechanisms are preserved even when they require proof assistants, SMT/SAT solvers, symbolic execution, mutation testing, specialized CI, model training, expensive test generation, human-authored formal specifications, or capabilities unavailable to the current project.

## Research Question

How much more reliable can LLM / coding-agent verification become when the verifier is not another natural-language opinion, but an external executable or deterministic mechanism such as:

- compiler / parser,
- type checker,
- unit / integration / regression test,
- property-based test,
- fuzzing,
- mutation testing,
- static analyzer / SAST,
- schema / grammar / structural validator,
- policy engine,
- SAT / SMT / CSP solver,
- theorem prover / proof assistant,
- formal verification tool,
- simulator,
- executable environment state check?

The immediate project-relevant reliability chain is:

```text
Rule / Requirement exists
→ it is converted into a machine-checkable property
→ verifier is executed on the actual artifact / state
→ verifier produces evidence
→ evidence is interpreted correctly
→ failed obligations are repaired
→ all affected evidence is rerun after change
```

Any stage can fail independently.

This pass focuses on **external machine-checkable evidence and its limits**. It does not yet complete the separate topics of:

- evidence receipts / false claims that a check was run,
- stale evidence / evidence invalidation after later edits,
- repository-level coding-agent instruction-file adherence,
- final `web-project-guide` validation architecture,
- adoption / Rule promotion.

---

# 1. First distinction: deterministic verification checks a property, not “correctness in general”

## Evidence / observed practice

Across testing, static analysis, formal verification, and symbolic reasoning research, a tool verdict is always relative to a defined property / oracle / specification.

Examples:

```text
compiler PASS
→ syntax / typing / build constraints checked

unit tests PASS
→ observed test oracles passed on exercised cases

static analyzer PASS
→ no finding in the analyzer's modeled rule universe

SMT solver SAT / UNSAT
→ result for the supplied formal encoding

proof assistant accepts proof
→ theorem follows from supplied formal definitions / assumptions
```

None of these statements logically implies:

```text
“the entire user intent is correct”
```

## Knowledge captured

The strongest conceptual boundary for this theme is:

```text
verification strength
=
strength of checker
× correctness of specification/oracle
× coverage of relevant behavior
× correctness of translation into checker input
× validity of execution environment
```

A deterministic checker can be perfect for its own formal question while the formal question itself is wrong or incomplete.

**Adoption status:** not decided.

---

# 2. Compiler feedback gives an independent signal unavailable to natural-language self-review

## Evidence / observed practice

CoCoGen, Findings ACL 2024, targets project-level code generation where generated code can use wrong APIs, classes, data structures, or repository context.

Its pipeline:

```text
LLM-generated code
→ static analysis identifies project-context mismatch
→ compiler / static feedback
→ retrieve relevant repository information
→ iterative repair
```

With GPT-3.5-Turbo and Code Llama 13B, the authors report improvements of more than 80% over vanilla LLMs on their project-context-dependent code generation setup and outperform retrieval-only baselines.

Source:

- Bi et al., `Iterative Refinement of Project-Level Code Context for Precise Code Generation with Compiler Feedback`, Findings ACL 2024
  - https://aclanthology.org/2024.findings-acl.138/

## Knowledge captured

Compiler / static feedback is materially different from asking:

```text
“Does this code look correct?”
```

because it queries the actual language / project environment and can reveal evidence the model did not notice from context alone.

For repository-level work, this is especially relevant to:

- undefined names,
- signature mismatch,
- wrong types,
- incompatible API use,
- missing imports,
- project-context mismatch.

**Boundary:** compilation does not establish behavioral correctness.

**Adoption status:** not decided.

---

# 3. Interactive compiler/test feedback can drive targeted repair

## Evidence / observed practice

INTERVENOR, Findings ACL 2024, explicitly uses compiler feedback in an interactive Chain of Repair. The paper reports approximately 18% improvement over GPT-3.5 on code generation and 4.3% on code translation in the tested setup. The compiler feedback enables more precise diagnosis of syntax and assertion failures.

RePair, Findings ACL 2024, likewise targets automated program repair with process feedback and explicitly identifies compiler and test-case feedback as signals that ordinary prompt-only interaction does not expose automatically.

Sources:

- Wang et al., `INTERVENOR: Prompting the Coding Ability of Large Language Models with the Interactive Chain of Repair`, Findings ACL 2024
  - https://aclanthology.org/2024.findings-acl.124/
- Zhao et al., `RePair: Automated Program Repair with Process-based Feedback`, Findings ACL 2024
  - https://aclanthology.org/2024.findings-acl.973/

## Knowledge captured

An external failure message can do two things at once:

1. prove that some property is currently violated;
2. localize the failure enough to activate the LLM's repair capability.

This matches prior self-review research where error localization was often weaker than repair after localization.

**Adoption status:** not decided.

---

# 4. Tests provide objective execution evidence, but only over their oracle and exercised behavior

## Evidence / observed practice

SWE-bench evaluates repository patches by running hidden tests:

- `FAIL_TO_PASS` tests must begin failing and then pass after the patch,
- `PASS_TO_PASS` tests must remain passing to guard against regression.

This creates a reproducible external signal tied to actual repository execution rather than an LLM's textual judgment.

Sources:

- SWE-bench, ICLR 2024
  - https://www.swebench.com/
- OpenAI, `Introducing SWE-bench Verified`, 2024
  - https://openai.com/index/introducing-swe-bench-verified/

## Knowledge captured

Tests are particularly useful as an independent barrier because the producer model does not need to know or agree with the outcome. The environment executes the artifact.

A test failure can therefore falsify a claimed completion even when:

- the model is confident,
- the code looks plausible,
- a second LLM approves it,
- the reasoning trace claims the issue is fixed.

**Adoption status:** not decided.

---

# 5. 2026 SWE-bench audit: deterministic tests can reject correct solutions when the oracle is wrong

## Evidence / observed practice

OpenAI re-audited SWE-bench Verified in 2026 after frontier systems approached saturation.

Among 138 problems that OpenAI o3 did not consistently solve, at least 59.4% were judged to contain material problems in tests and/or problem descriptions.

Reported categories:

- 35.5% had **narrow tests** that enforced unnecessary implementation details and rejected functionally correct solutions;
- 18.8% had **wide tests** that checked additional functionality not specified in the task;
- 5.1% had other material issues.

Each audited case was independently reviewed by at least six experienced software engineers, with additional re-verification for flagged cases.

Source:

- OpenAI, `Why SWE-bench Verified no longer measures frontier coding capabilities`, 2026-02-23
  - https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/

## Knowledge captured

This is unusually direct current evidence for the **test-oracle problem** in AI coding evaluation.

A test suite can be:

```text
perfectly deterministic
+
perfectly reproducible
+
wrongly scoped
```

and therefore produce a confidently wrong acceptance / rejection decision.

This means:

```text
machine-verifiable
≠
semantically valid
```

**Adoption status:** not decided.

---

# 6. Test environments can create false failures even when the test logic is reasonable

## Evidence / observed practice

The 2024 SWE-bench Verified work explicitly identified development-environment setup as a failure source: Linux / Windows, Python version, dependency setup, and other environment conditions can cause tests to fail regardless of patch correctness.

Containerized Docker evaluation was introduced to make the environment more reproducible.

Source:

- https://openai.com/index/introducing-swe-bench-verified/

## Knowledge captured

Verification evidence depends on more than the checker definition:

```text
test result
=
code
+ test oracle
+ test data
+ dependency versions
+ OS/runtime
+ environment state
+ execution order
```

Therefore a future evidence record may eventually need environment identity / version as part of provenance. This is a research implication only.

**Adoption status:** not decided.

---

# 7. Flaky tests violate the assumption that repeated execution yields a stable verdict

## Evidence / observed practice

Flaky tests can pass and fail without a code change.

ICSE-SEIP 2026 examines LLM-generated tests for SAP HANA, DuckDB, MySQL, and SQLite. LLM-generated tests had a slightly higher proportion of flakiness than existing tests. Manual analysis found reliance on an unordered collection in 72 of 115 flaky tests (63%).

Other 2025 empirical work reports systemic flakiness where test failures co-occur because of shared causes such as networking or external dependencies.

Sources:

- Berndt et al., `On the Flakiness of LLM-Generated Tests for Industrial and Open-Source Database Management Systems`, ICSE-SEIP 2026
  - https://doi.org/10.1145/3786583.3786919
- Parry et al., `Systemic flakiness: An empirical analysis of co-occurring flaky test failures`, EASE 2025
  - https://arxiv.org/abs/2504.16777

## Knowledge captured

A binary `test: failed` receipt is not always sufficient evidence that the implementation is wrong.

Potential distinct states include:

```text
implementation failure
oracle failure
setup failure
flaky / nondeterministic failure
external dependency failure
```

**Adoption status:** not decided.

---

# 8. Coverage is not equivalent to assertion strength

## Evidence / observed practice

`Where tests fall short`, ESEM 2025, studies **oracle gaps**: program statements may be executed by tests but not actually checked by meaningful assertions.

The work emphasizes that statement coverage alone can provide weak fault detection and studies methods for detecting covered code that is insufficiently observed by test oracles.

Source:

- Maton, Kapfhammer, McMinn, `Where tests fall short: Empirically analyzing oracle gaps in covered code`, ESEM 2025
  - https://gregorykapfhammer.com/research/papers/maton2025/

## Knowledge captured

This separates:

```text
code executed
```

from

```text
behavior meaningfully asserted
```

A future verification record based only on line / branch coverage can therefore overstate assurance.

**Adoption status:** not decided.

---

# 9. Mutation testing evaluates the verifier/test suite, not only the implementation

## Evidence / observed practice

Mutation testing deliberately changes code to simulate defects and checks whether the test suite detects them.

The core question changes from:

```text
“Does the current implementation pass?”
```

to:

```text
“Would these tests notice plausible wrong implementations?”
```

LLMLOOP, ICSME 2025, uses multiple iterative loops including:

- compilation repair,
- static-analysis repair,
- test-failure repair,
- mutation analysis to improve generated test quality.

LLMorpheus, IEEE TSE 2025, uses LLMs to generate semantically richer mutants and reports that some resemble historical bugs not produced by conventional mutation operators.

Sources:

- `LLMLOOP: Improving LLM-Generated Code and Tests Through Automated Iterative Feedback Loops`, ICSME 2025
  - DOI: 10.1109/ICSME64153.2025.00109
- `LLMorpheus: Mutation Testing Using Large Language Models`, IEEE TSE 2025
  - DOI: 10.1109/TSE.2025.3562025

## Knowledge captured

Mutation testing is a **second-order assurance mechanism**:

```text
artifact is checked by tests
+
tests themselves are challenged by mutants
```

This is important because deterministic verifiers also need verification / adequacy evidence.

**Boundary:** mutation score is still only a proxy for defect-detection ability and has issues such as equivalent mutants and operator representativeness.

**Adoption status:** not decided.

---

# 10. Property-based testing can search a broader input space than example tests

## Evidence / observed practice

Property-based testing (PBT) defines invariants / properties and automatically generates many inputs to search for counterexamples.

FSE Companion 2025 reports that PBT exposes correctness gaps missed by conventional pass@k / example-based evaluation for generated code. In the study, a substantial portion of solutions only partially satisfy extracted correctness properties; property extraction itself also misses constraints in a reported 9–13% range.

A 2025 preprint, `Use Property-Based Testing to Bridge LLM Code Generation and Validation`, reports 23.1–37.3% relative pass@1 gains over tested TDD approaches through a Generator / Tester loop centered on PBT.

Anthropic's 2026 property-based testing research similarly frames PBT as a way to search automatically for counterexamples rather than manually enumerate all edge cases.

Sources:

- Bose, `From Prompts to Properties: Rethinking LLM Code Generation with Property-Based Testing`, FSE Companion 2025
  - https://doi.org/10.1145/3696630.3728702
- He et al., `Use Property-Based Testing to Bridge LLM Code Generation and Validation`, 2025 preprint
  - https://arxiv.org/abs/2506.18315
- Anthropic, `Finding bugs with Claude and property-based testing`, 2026
  - https://www.anthropic.com/research/property-based-testing

## Knowledge captured

PBT adds a different barrier from fixed unit tests:

```text
fixed examples
→ finite known points

properties + generated inputs
→ search for counterexample over a broader domain
```

But property extraction is itself a specification-generation problem. If a required invariant is never extracted, the PBT engine cannot discover that omission.

**Adoption status:** not decided.

---

# 11. Fuzzing / generated-input search is strong for counterexamples but usually weak as proof of absence

## Evidence synthesis

Property-based testing and fuzzing-style systems are designed to discover counterexamples efficiently.

The asymmetry is important:

```text
one valid counterexample
→ strong proof that a property is violated

no counterexample found in finite search
→ not a mathematical proof that none exists
```

## Knowledge captured

This makes tool evidence direction-sensitive.

Some validator outputs provide strong falsification evidence but weaker universal assurance.

A future evidence taxonomy may need to distinguish:

- proof,
- exhaustive decision procedure,
- bounded search,
- sampled execution,
- heuristic warning.

No taxonomy is adopted here.

---

# 12. Static analysis can detect important non-runtime properties earlier than tests

## Evidence / observed practice

A 2025 industrial safety-critical automotive study evaluates ten LLMs on three C modules and combines:

- functional verification,
- industrial static analysis for non-functional requirements,
- human evaluation.

The analyzers check constraints such as single-read / single-write access and minimal variable scope that ordinary output correctness tests may not expose.

Source:

- Sevenhuijsen et al., `Generating Safety-Critical Automotive C-programs using LLMs with Formal Verification`, NeSy 2025 / PMLR
  - https://proceedings.mlr.press/v284/sevenhuijsen25a.html

## Knowledge captured

Different tools can observe different Rule classes:

```text
runtime functional behavior
→ tests / simulation

code-pattern / dataflow / security / style constraints
→ static analysis

mathematical invariant
→ formal verifier
```

This supports a layered view of external evidence rather than choosing one universal validator.

**Adoption status:** not decided.

---

# 13. Static analyzers have real false positives and false negatives

## Evidence / observed practice

A 2024 empirical study examines 350 confirmed historical false-negative / false-positive issues in PMD, SpotBugs, and SonarQube and additionally reports newly discovered issues through metamorphic testing.

An ISSTA 2025 experience report applies CodeQL to 258 open-source embedded-software projects:

- 709 true defects were reported,
- 535 were likely security vulnerabilities,
- the reported false-positive rate was 34%,
- hundreds of findings were confirmed by maintainers, including accepted fixes.

Sources:

- Cui et al., `An Empirical Study of False Negatives and Positives of Static Code Analyzers From the Perspective of Historical Issues`, 2024 preprint
  - https://arxiv.org/abs/2408.13855
- Shen et al., `Finding 709 Defects in 258 Projects: An Experience Report on Applying CodeQL to Open-Source Embedded Software`, ISSTA 2025
  - https://doi.org/10.1145/3728923

## Knowledge captured

A static analyzer is deterministic in execution but not omniscient in semantics.

Two different weaknesses matter:

```text
false positive
→ tool says violation, artifact may be acceptable

false negative
→ tool says nothing, violation may still exist
```

This means “no warnings” is not equivalent to “no defects.”

**Adoption status:** not decided.

---

# 14. Static analysis feedback can improve generated code beyond functional correctness

## Evidence / observed practice

Recent work uses static analysis not only as a final gate but as feedback for iterative generation.

A 2025 preprint using Bandit and Pylint with GPT-4o reports large reductions in security, readability, and reliability warnings over ten refinement iterations.

CoCoGen likewise uses static analysis to recover project-level context mismatches.

Source:

- Blyth et al., `Static Analysis as a Feedback Loop: Enhancing LLM-Generated Code Beyond Correctness`, 2025 preprint
  - https://arxiv.org/abs/2508.14419

## Knowledge captured

External tools can serve two separate roles:

1. **Gate:** accept / reject current artifact.
2. **Diagnostic sensor:** produce structured defects that an LLM can repair.

A tool can be valuable even if it cannot certify the whole artifact.

**Adoption status:** not decided.

---

# 15. Formal verification is qualitatively stronger than sampled testing for specified properties

## Evidence / observed practice

Formal verification attempts to establish mathematically that software satisfies a given formal property across all modeled executions, rather than checking selected test inputs.

AlphaVerus, ICML 2025, combines LLM code generation with the Verus formal verifier. Candidate programs are iteratively refined from verifier feedback until the supplied specification verifies.

Other 2025 work integrates proof assistants such as Lean / Isabelle into neural theorem proving, where the proof assistant validates formal proof terms rather than trusting natural-language reasoning.

Sources:

- Aggarwal, Parno, Welleck, `AlphaVerus: Bootstrapping Formally Verified Code Generation through Self-Improving Translation and Treefinement`, ICML 2025
  - https://proceedings.mlr.press/v267/aggarwal25a.html
- Dong & Ma, `STP: Self-play LLM Theorem Provers with Iterative Conjecturing and Proving`, ICML 2025
  - https://proceedings.mlr.press/v267/dong25h.html
- Song, Yang, Anandkumar, `Lean Copilot`, 2025
  - https://proceedings.mlr.press/v288/song25a.html

## Knowledge captured

For a property encoded faithfully in a sound formal system, proof checking can give a much stronger assurance class than:

- LLM judgment,
- finite test sampling,
- stylistic review.

But this stronger guarantee is **conditional on the formal statement being the right statement**.

**Adoption status:** not decided.

---

# 16. AlphaVerus directly demonstrates specification gaming under formal verification

## Evidence / observed practice

AlphaVerus does not rely on verifier acceptance alone.

Its pipeline includes a dedicated filtering / critique phase for **misaligned specifications and reward hacking**.

Reported exploit patterns include ideas such as:

- impossible preconditions (`requires false`),
- trivially true postconditions (`ensures true`),
- assumptions that make proof obligations vacuous,
- unimplemented functionality that still verifies under a weakened specification.

Sources:

- ICML 2025 paper
  - https://proceedings.mlr.press/v267/aggarwal25a.html
- project documentation
  - https://alphaverus.github.io/

## Knowledge captured

This is a crucial negative result:

```text
formal verifier PASS
+
weak / manipulated specification
→ formally verified wrong intent
```

The stronger the optimization pressure on a measurable verifier, the more important specification-gap / reward-hacking analysis becomes.

**Adoption status:** not decided.

---

# 17. 2026 RLVR research shows verifier gaming can become a learned strategy

## Evidence / observed practice

`LLMs Gaming Verifiers: RLVR can Lead to Reward Hacking` studies inductive reasoning tasks where verifiers check extensional correctness.

The authors report RLVR-trained models can stop inducing the intended general rule and instead enumerate instance-level labels that pass the verifier. The shortcut satisfies what the verifier measures without representing the intended reasoning abstraction.

They introduce Isomorphic Perturbation Testing (IPT): if a strategy represents the genuine rule, it should remain correct under logically isomorphic transformations; shortcut enumeration fails this test.

Source:

- Helff et al., `LLMs Gaming Verifiers: RLVR can Lead to Reward Hacking`, 2026 preprint
  - https://arxiv.org/abs/2604.15149

## Knowledge captured

Verifier gaming is not limited to overt tricks such as changing a test file.

A model can exploit **semantic gaps in what the verifier observes** while technically respecting the verifier interface.

This provides a strong reason to preserve:

- alternative checks,
- perturbation tests,
- holdout properties,
- adversarial verifier review,

as research mechanisms even if no such design is adopted yet.

**Adoption status:** not decided.

---

# 18. Verifiable rewards work extremely well in domains with cheap objective outcomes

## Evidence / observed practice

ICLR 2026 work on Reinforcement Learning with Verifiable Rewards (RLVR) reports that outcome verifiers can improve mathematical and coding reasoning and extend reasoning capability boundaries in the evaluated models.

Math and code are especially suitable because some outcomes can be checked cheaply through exact answers, symbolic equivalence, compilers, and tests.

Source:

- Wen et al., `Reinforcement Learning with Verifiable Rewards Implicitly Incentivizes Correct Reasoning in Base LLMs`, ICLR 2026
  - https://proceedings.iclr.cc/paper_files/paper/2026/hash/517f9b9c227b9dd51dba4560f37165ed-Abstract-Conference.html

## Knowledge captured

Machine-verifiable properties are valuable not only at inference / CI time. They can be used as:

- training rewards,
- search scores,
- repair-loop signals,
- candidate filters,
- regression gates.

This makes machine-checkable Rule representation strategically important even when only a subset of a larger semantic Rule universe is formalizable.

**Adoption status:** not decided.

---

# 19. Binary verifiers can lose useful information about partial / graded correctness

## Evidence / observed practice

Many verifiable systems use binary rewards:

```text
compiles / does not compile
tests pass / fail
proof verifies / fails
```

A 2026 preprint on Reinforcement Learning with Verifiable Physics argues this is inadequate for scientific solver generation because two programs can both execute while differing by orders of magnitude in numerical accuracy. It uses hard execution-validity checks plus continuous physics-based accuracy and residual rewards.

Source:

- Cai et al., `Reinforcement Learning with Verifiable Physics: Post-training LLMs with Continuous Rewards`, 2026 preprint
  - https://arxiv.org/abs/2607.10474

## Knowledge captured

The verification state space may need more than Boolean PASS / FAIL where quality is naturally continuous.

Possible distinct states include:

- structurally invalid,
- executable but wrong,
- partially correct,
- within tolerance,
- robust under perturbation,
- formally proven property.

No state model is adopted here.

---

# 20. Open-ended semantic quality remains difficult to verify deterministically

## Evidence / observed practice

ICLR 2026 `From Verifiable Dot to Reward Chain` explicitly notes that RLVR succeeds most naturally on math / code where an unambiguous verifiable answer exists, but open-ended generation lacks a single deterministic ground truth.

Its proposed method therefore combines deterministic / reference-based content signals with model-based checks for stylistic properties.

Source:

- Jiang et al., `From Verifiable Dot to Reward Chain: Harnessing Verifiable Reference-based Rewards for Reinforcement Learning of Open-ended Generation`, ICLR 2026
  - https://proceedings.iclr.cc/paper_files/paper/2026/hash/1be5bc25d50895ee656b8c2d9eb89d6a-Abstract-Conference.html

## Knowledge captured

Some software-development Rules are naturally machine-verifiable:

- file exists,
- schema valid,
- tests pass,
- import succeeds,
- no forbidden dependency,
- version is pinned,
- branch setting present,
- link resolves,
- constraint is satisfiable.

Others are not naturally reducible to deterministic truth values:

- UX is understandable,
- architecture matches intent,
- explanation is pedagogically sufficient,
- design feels coherent,
- requirement interpretation is correct under ambiguity.

A future system may therefore require mixed evidence types rather than forcing every Rule into code.

**Adoption status:** not decided.

---

# 21. Symbolic solvers can move exact logical search out of the LLM

## Evidence / observed practice

Logic-LM, Findings EMNLP 2023, uses an LLM to translate a natural-language problem into a symbolic representation and then delegates inference to a deterministic symbolic solver. It reports average gains of 39.2% over standard prompting and 18.4% over chain-of-thought across five logical-reasoning datasets.

A 2024 LREC-COLING method similarly uses a logical inference engine for CSP-style reasoning and reports a 40% improvement over its baselines.

The SAT 2025 MCP Solver exposes MiniZinc, PySAT, MaxSAT, and Z3-based SMT solving through an agent interface, demonstrating direct integration between language-model agents and mature symbolic solving engines.

Sources:

- Pan et al., `Logic-LM: Empowering Large Language Models with Symbolic Solvers for Faithful Logical Reasoning`, Findings EMNLP 2023
  - https://aclanthology.org/2023.findings-emnlp.248/
- Raheja et al., LREC-COLING 2024
  - https://aclanthology.org/2024.lrec-main.532/
- `Bridging Language Models and Symbolic Solvers via the Model Context Protocol`, SAT 2025
  - https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.SAT.2025.30

## Knowledge captured

This architecture changes the LLM's job from:

```text
understand + search + prove
```

to:

```text
translate / construct formal problem
→ deterministic solver searches / decides
```

For exact satisfiability / consistency subproblems, this can remove a major reasoning burden from the model.

**Adoption status:** not decided.

---

# 22. The natural-language → symbolic translation boundary becomes the new weak link

## Evidence / observed practice

Solver-augmented systems repeatedly identify formalization accuracy as a key bottleneck.

`Language Models can be Deductive Solvers`, Findings NAACL 2024, notes that parsing errors in the natural-language-to-symbolic stage can cause downstream solver failure.

`Harnessing the Power of Large Language Models for Natural Language to First-Order Logic Translation`, ACL 2024, specifically studies this translation problem and builds a 28K NL-FOL dataset because fine-grained translation reliability remained insufficiently understood.

`The Choice of Tool Matters`, 2024, further notes that different symbolic solvers require different representation languages and can shift end-to-end difficulty.

Sources:

- https://aclanthology.org/2024.findings-naacl.254/
- https://aclanthology.org/2024.acl-long.375/
- https://aclanthology.org/2024.alta-1.4/

## Knowledge captured

A deterministic solver cannot repair a mistranslated requirement automatically.

Failure chain:

```text
Requirement R
→ LLM incorrectly formalizes R as R'
→ solver correctly proves R'
→ system reports success
→ original R may still be violated
```

This is structurally analogous to a wrong unit-test oracle or weak formal specification.

**Adoption status:** not decided.

---

# 23. Grammar / schema constraints can eliminate whole classes of structural failure before validation

## Evidence / observed practice

ACL Industry 2025 work on grammar-constrained decoding reports consistent improvements in syntactic correctness and semantic accuracy for logical parsing when LLM output is restricted to a valid grammar expected by a symbolic reasoner.

Source:

- Raspanti et al., `Grammar-Constrained Decoding Makes Large Language Models Better Logical Parsers`, ACL Industry 2025
  - https://aclanthology.org/2025.acl-industry.34/

## Knowledge captured

Some failures can be prevented rather than detected after generation.

Examples:

```text
JSON Schema
CFG / grammar-constrained decoding
typed function signatures
allowed-enum values
machine-readable rule IDs
```

These mechanisms guarantee structural properties inside their declared grammar, but not semantic truth of the contained values.

**Adoption status:** not decided.

---

# 24. Step-wise verification can identify the first failing obligation instead of only final failure

## Evidence / observed practice

Research in formal math / theorem proving increasingly combines LLM generation with verifier-in-the-loop feedback at intermediate steps.

`Local Look-Ahead Guidance via Verifier-in-the-Loop`, Findings ACL 2025, uses verifier feedback during proof search rather than only after a complete proof.

`Step-Wise Formal Verification for LLM-Based Mathematical Problem Solving`, 2025 preprint, formalizes individual reasoning statements and uses external tools including computer algebra and SMT to evaluate them.

Sources:

- https://aclanthology.org/2025.findings-acl.825/
- https://arxiv.org/abs/2505.20869

## Knowledge captured

This introduces a useful distinction:

```text
final-state verification
vs
step / transition verification
```

For long-running agents, an invalid intermediate action may be irreversible even if the final text looks correct. Step-level guards can block earlier.

**Adoption status:** not decided.

---

# 25. Formal proof checking and formal proof generation have very different reliability roles

## Evidence / observed practice

Neural theorem-proving systems may use probabilistic LLMs to propose proofs, while Lean / Isabelle / Verus checks whether the formal proof is accepted.

The LLM may fail repeatedly to generate a proof, but an accepted proof has a qualitatively different evidence basis from an LLM saying “this theorem is proven.”

Sources:

- AlphaVerus, ICML 2025
- STP, ICML 2025
- Lean Copilot, 2025
- `Neural Theorem Proving: Generating and Structuring Proofs for Formal Verification`, 2025
  - https://proceedings.mlr.press/v284/rao25a.html

## Knowledge captured

The verifier and generator need not have the same competence.

A weak / probabilistic generator can still search against a strong formal checker.

This is one of the clearest examples where **independent verification is not another equally fallible language model**.

**Adoption status:** not decided.

---

# 26. Tool diversity can cover orthogonal failure classes

## Evidence synthesis

The reviewed literature suggests different deterministic / executable tools cover different failure surfaces:

| Tool / evidence type | Strongest natural coverage | Important blind spot |
|---|---|---|
| Parser / schema / grammar | structure, syntax | semantic intent |
| Compiler / type checker | language / type / API consistency | runtime behavior / UX |
| Unit / integration tests | specified examples / flows | untested behaviors / oracle gaps |
| Property-based testing | invariants across generated inputs | wrong / missing properties |
| Fuzzing | counterexample discovery | no proof after finite search |
| Mutation testing | test-suite defect sensitivity | mutant representativeness / equivalent mutants |
| Static analysis / SAST | modeled code/dataflow/security patterns | false positives / false negatives / business semantics |
| Simulator | modeled runtime behavior | model fidelity / unmodeled reality |
| SAT / SMT / CSP | exact satisfiability / logical constraints | translation / formalization correctness |
| Proof assistant / formal verifier | theorem relative to spec | wrong / weak / manipulated spec |
| Policy-as-code engine | encoded policy rules | policies not encoded / policy interpretation |

## Knowledge captured

The strongest machine-verification strategy in the literature is usually **composition of orthogonal checks**, not one universal checker.

This observation is consistent with previous cross-domain research on multiple failure barriers, but remains synthesis only.

---

# 27. Deterministic checks are especially strong for negative evidence

## Evidence synthesis

Many external tools produce highly actionable falsification:

```text
compiler error exists
failed assertion exists
counterexample exists
SAT solver found violating model
formal proof obligation failed
schema invalid
forbidden pattern found
```

These observations are often stronger than an LLM saying “I think this may be wrong.”

## Knowledge captured

The asymmetry is:

```text
concrete failure witness
→ often strong evidence of a problem

no failure witness
→ assurance depends on checker completeness / coverage
```

This suggests future evidence systems should avoid treating PASS and FAIL as equally informative without context.

**Adoption status:** not decided.

---

# 28. Deterministic checkers can themselves require qualification, versioning, and validation

## Evidence synthesis

Prior safety-critical research already captured tool qualification and independent validation concepts. Current software-testing evidence adds a practical version of the same issue:

- static analyzers have historical false positives / negatives,
- tests can be too narrow / wide,
- CI environments can be wrong,
- scorer bugs can change benchmark results,
- test suites can be flaky,
- generated properties can omit requirements,
- formal specifications can be vacuous.

## Knowledge captured

A validator should not automatically be outside the assurance system.

The following are all possible verifier defects:

```text
bug in checker implementation
wrong configuration
wrong rule mapping
outdated version
wrong environment
incomplete test oracle
mistranslated specification
incorrect threshold
non-deterministic dependency
```

No validator-qualification process is adopted here.

---

# 29. Verification must be rerun after repair because evidence is state-specific

## Evidence synthesis

Compiler-driven repair, test-driven repair, AlphaVerus Treefinement, and theorem-prover search all operate by repeatedly checking the **new artifact** after a modification.

This is structurally important:

```text
Artifact A passes check X
→ modify A into B
→ X(A) is not evidence about X(B)
```

A repair can:

- fix one issue,
- introduce a regression,
- invalidate an earlier proof / test result,
- change applicability of another rule.

## Knowledge captured

External evidence has an artifact / version scope.

This directly motivates the later dedicated research topic on **evidence invalidation / stale verification**, but no mechanism is adopted here.

---

# 30. Policy-as-code belongs to the same mechanism family but is already covered separately

## Evidence / repository relationship

Previous research already captured mechanisms such as:

- OPA / Rego,
- Conftest,
- Kyverno,
- Gatekeeper,
- Sentinel,
- GitHub Rulesets,
- evaluate / dry-run,
- exception / decision logs.

This file does not duplicate that full body of research.

## Knowledge captured

Policy-as-code is one instance of the broader pattern:

```text
human rule
→ machine-readable representation
→ deterministic evaluation against artifact/state
→ explicit pass/fail/violation evidence
```

The same specification-gap concern applies: only encoded policy can be checked.

**Adoption status:** not decided.

---

# 31. Current failure taxonomy for tool-assisted / deterministic verification

## A. Coverage gap

```text
Rule exists
→ no checker covers it
→ PASS from other tools creates false confidence
```

Examples:

- semantic UX rule not represented by unit tests,
- architecture requirement not represented by compiler.

## B. Oracle gap

```text
behavior executes
→ test does not assert the important result
```

Evidence:

- ESEM oracle-gap research.

## C. Narrow oracle

```text
valid implementation
→ checker enforces unnecessary implementation detail
→ false reject
```

Evidence:

- SWE-bench Verified 2026 audit.

## D. Wide oracle

```text
checker requires behavior not present in stated Requirement
→ false reject / Requirement-test mismatch
```

Evidence:

- SWE-bench Verified 2026 audit.

## E. Weak specification / vacuous proof

```text
formal checker is correct
→ spec is too weak
→ wrong intent verifies
```

Evidence:

- AlphaVerus reward-hacking filters.

## F. Translation error

```text
natural language Rule R
→ LLM translates into formal R'
→ solver proves R'
→ R still unverified
```

Evidence:

- NL→FOL / solver-augmented reasoning research.

## G. Checker false positive / false negative

```text
analyzer output != true defect state
```

Evidence:

- PMD / SpotBugs / SonarQube historical issue study,
- CodeQL experience report.

## H. Environment failure

```text
artifact valid
→ runtime/dependency/OS setup wrong
→ test fails
```

Evidence:

- SWE-bench environment findings.

## I. Flakiness / nondeterminism

```text
same artifact
→ same test
→ different verdict
```

Evidence:

- ICSE-SEIP 2026 LLM-generated test study,
- EASE 2025 systemic flakiness.

## J. Bounded-search blind spot

```text
fuzzer/PBT finds no counterexample in search budget
→ property is incorrectly treated as proven
```

## K. Reward / verifier gaming

```text
optimizer learns verifier loophole
→ score rises
→ intended behavior does not
```

Evidence:

- AlphaVerus,
- 2026 RLVR verifier gaming.

## L. Binary-signal information loss

```text
PASS/FAIL hides severity / partial progress / numerical quality
```

Evidence:

- RLVP motivation.

## M. Stale evidence

```text
artifact changes after PASS
→ old PASS remains visible
→ no longer proves current state
```

## N. Validator bug / version drift

```text
checker implementation/config changes
→ same artifact may receive different verdict
```

## O. Semantic unformalizability / high formalization cost

```text
important Rule cannot currently be encoded reliably
→ deterministic verification unavailable
```

Examples:

- usability,
- teaching quality,
- nuanced design coherence,
- broad natural-language intent.

---

# 32. Possible mechanisms observed in research — not recommendations

Per the Research Capture Policy, the following are preserved before feasibility / adoption filtering.

## Structural / syntax verification

- parser validation,
- JSON Schema,
- XML Schema,
- grammar-constrained decoding,
- type checking,
- interface / API signature checks,
- required-file / required-key checks,
- link validation.

## Execution verification

- unit tests,
- integration tests,
- regression tests,
- end-to-end tests,
- browser automation,
- executable workflow tests,
- simulator runs,
- environment-state assertions,
- before/after behavioral comparison.

## Test-strength verification

- property-based testing,
- fuzzing,
- metamorphic testing,
- mutation testing,
- oracle-gap analysis,
- test independence / flakiness detection,
- hidden / holdout test sets,
- adversarial test generation.

## Static / semantic program analysis

- linters,
- static analyzers,
- SAST,
- dataflow analysis,
- taint analysis,
- dependency / license scanners,
- secret scanners,
- CodeQL-style semantic queries.

## Symbolic / formal verification

- SAT,
- MaxSAT,
- SMT / Z3,
- constraint programming / MiniZinc,
- model checking,
- symbolic execution,
- theorem proving,
- Lean / Coq / Isabelle,
- Dafny / Verus,
- formal contract verification.

## Verifier-hardening mechanisms

- independent validation of test/spec quality,
- mutation of the checker target,
- adversarial verifier gaming tests,
- isomorphic / metamorphic perturbation,
- multiple orthogonal checkers,
- hidden checks,
- human audit of specification,
- tool version pinning,
- environment pinning,
- reproducibility reruns,
- flakiness classification.

## Feedback / repair integration

- compiler-error-guided repair,
- failing-test-guided repair,
- counterexample-guided repair,
- proof-obligation-guided search,
- static-warning-guided refinement,
- failed-property-only repair,
- re-run all affected validators after mutation.

## Training-time use

- reinforcement learning with verifiable rewards,
- per-constraint rewards,
- formal proof acceptance rewards,
- unit-test rewards,
- executable simulator rewards,
- continuous domain-specific verification rewards.

All remain research mechanisms.

---

# 33. Current feasibility / missing-capability notes

## Relatively accessible today

A solo repository workflow can often run:

- compiler / build,
- existing tests,
- unit / integration tests,
- schema checks,
- linters,
- basic static analysis,
- link checks,
- file / metadata validators,
- policy-as-code checks,
- CI checks,
- selected property-based tests,
- selected mutation testing.

## Requires substantial additional specification work

- comprehensive property-based invariants,
- meaningful mutation models,
- semantic policy encoding,
- formal contracts,
- authoritative test oracles,
- environment simulators,
- exhaustive state invariants.

## Expensive / specialist / currently unrealistic for much of this project

- full formal verification of broad web applications,
- theorem-proving every behavioral Requirement,
- proof-carrying code pipelines,
- model checking large dynamic UI state spaces,
- bespoke SMT encodings for all Guide Rules,
- tool qualification programs comparable to safety-critical organizations,
- independent formal-specification teams,
- large-scale RLVR training.

Current impracticality is not a reason to delete these mechanisms from the research record.

---

# 34. Negative results / cautions that should remain visible

1. **Tests can be deterministic and still be wrong.**
   - SWE-bench Verified 2026 narrow / wide test findings.

2. **A passing test suite is scoped evidence, not proof of all behavior.**
   - oracle-gap / property-testing evidence.

3. **Coverage does not prove assertion quality.**

4. **Generated tests can themselves be flaky.**
   - ICSE-SEIP 2026.

5. **Static analyzers produce false positives and false negatives.**

6. **Formal verification proves the formal specification, not the unstated intent.**

7. **Models can deliberately or accidentally weaken specifications to pass formal checkers.**
   - AlphaVerus reward-hacking defense.

8. **Verifiable rewards can teach models to exploit verifier blind spots.**
   - 2026 RLVR verifier-gaming study.

9. **Natural-language-to-symbolic translation is a major weak boundary.**

10. **Fuzzing / PBT non-discovery is not universal proof.**

11. **Binary signals can hide partial correctness / severity.**

12. **Tool output can become stale immediately after a change.**

13. **The checker implementation, configuration, and environment are themselves assurance dependencies.**

14. **No single deterministic tool covers all software-quality dimensions.**

15. **Many important human-facing Rules are not currently reducible to reliable deterministic checks.**

16. **Optimization against a fixed public checker can create Goodhart / contamination / gaming pressure.**

---

# 35. Current working interpretations for `web-project-guide` — not adoption decisions

These hypotheses are retained for later comparison only.

## H1. External executable evidence is qualitatively different from LLM review text

A compiler error, failed assertion, solver counterexample, or proof-checker rejection is generated by a different mechanism than the producer model's natural-language reasoning.

It can therefore break some correlated LLM error modes.

## H2. “Machine-checkable” should never be conflated with “fully assured”

The evidence repeatedly shows:

```text
strong checker
+
weak specification
=
weak assurance of intent
```

## H3. Future validation may need a Rule→Verifier coverage map

Potential state, not adopted:

```text
Rule R1 → deterministic test
Rule R2 → static analyzer
Rule R3 → schema validator
Rule R4 → semantic LLM review only
Rule R5 → no available verifier
```

This could make blind spots explicit rather than allowing a global `validation: passed` flag to hide uncovered Rules.

## H4. Failed checks and passed checks have asymmetric evidential value

A concrete counterexample often proves a defect strongly. A PASS may only mean the checker failed to find a violation within its scope.

## H5. Tests themselves may need tests

Mutation testing, oracle-gap analysis, flakiness detection, human review, and adversarial test generation all serve as second-order checks of verification quality.

## H6. Formal verification is potentially the strongest barrier for formalizable high-severity properties

But specification correctness / formalization cost remain limiting factors.

## H7. Different Rule classes likely need different checker families

A future system should not assume that a test runner can replace static analysis, formal constraints, visual inspection, or semantic evaluation.

## H8. Natural-language Rule formalization creates a traceability obligation

If Rule text is compiled into executable logic, a future assurance system may need evidence that the machine rule still represents the human rule after either side changes.

## H9. Current artifact identity likely matters to every receipt

`PASS` without commit / file / config / environment identity can become stale or ambiguous.

## H10. Deterministic evidence appears to fit the broader multiple-barrier hypothesis

It can cover failure classes where same-model review and LLM judges are weak, but it introduces its own specification, coverage, tool, and environment failure modes.

This remains synthesis only.

---

# 36. Evidence map

| Claim | Main evidence | Evidence status | Current confidence | Important limitation |
|---|---|---|---|---|
| Compiler/static feedback materially improves project-context code generation | CoCoGen | Findings ACL 2024 peer-reviewed | High for tested setup | Python / selected models / compiler-visible errors |
| Compiler/test feedback supports iterative repair | INTERVENOR; RePair | Findings ACL 2024 peer-reviewed | High | repair quality remains model/task dependent |
| Unit/regression tests give reproducible execution-based coding-agent evidence | SWE-bench | ICLR 2024 + production benchmark | High | test-oracle / environment / contamination issues |
| Deterministic tests can reject correct solutions due to bad scope | OpenAI SWE-bench audit 2026 | large expert audit / provider research | High for audited subset | focused on difficult SWE-bench subset |
| Test environment can create false failures | SWE-bench Verified | direct benchmark engineering evidence | High | exact prevalence project dependent |
| LLM-generated tests can be flaky | ICSE-SEIP 2026 | peer-reviewed industrial/open-source study | High for studied DBMS setting | four DB systems / two LLMs |
| Coverage can hide assertion/oracle gaps | ESEM 2025 | peer-reviewed empirical study | High for concept | exact metrics/tooling vary |
| Mutation testing can assess and improve verifier/test strength | LLMLOOP; LLMorpheus | ICSME / IEEE TSE 2025 | High that mechanism is useful | equivalent mutants / mutation model limits |
| Property-based testing finds correctness gaps missed by example tests | FSE 2025 | peer-reviewed | Moderate–High | property extraction can omit constraints |
| Static analysis can check non-functional / security properties missed by tests | automotive 2025 + CodeQL ISSTA 2025 | peer-reviewed | High | tool-rule coverage and FP/FN |
| Static analyzers have false-positive and false-negative histories | Cui et al.; CodeQL experience | preprint + ISSTA | High | rates/tool domains vary |
| Formal proof checking provides stronger guarantees for encoded properties | AlphaVerus / Lean / Isabelle work | ICML/PMLR peer-reviewed | High | guarantee conditional on spec / formalization |
| Formal verifier acceptance can be gamed by weakened/misaligned specs | AlphaVerus | ICML 2025 | High for demonstrated mechanism | framework-specific exploit patterns |
| RLVR can induce exploitation of verifier blind spots | Helff et al. 2026 | recent preprint | Moderate–High emerging | inductive-reasoning setup; needs broader replication |
| Verifiable rewards can improve math/code reasoning | Wen et al. | ICLR 2026 | High for tested models/domains | cheap verifier domains only |
| Binary verifier signals can lose graded correctness information | RLVP | 2026 preprint | Moderate emerging | scientific PDE domain |
| Open-ended quality often lacks unambiguous deterministic ground truth | RLVRR | ICLR 2026 | High conceptual / empirical | hybrid reference/model verifier approach |
| Symbolic solvers can substantially outperform pure LLM reasoning when formalization is correct | Logic-LM + CSP studies | ACL/LREC peer-reviewed | High | translation correctness bottleneck |
| NL→symbolic translation is a major failure boundary | MALLS / solver studies | ACL 2024 peer-reviewed | High | datasets/domains differ |
| Grammar-constrained decoding reduces structural parser failures | ACL Industry 2025 | peer-reviewed | High for logical parsing | structure ≠ semantic truth |

---

# 37. Source register

## Compiler / test / repair

1. Bi et al. — `Iterative Refinement of Project-Level Code Context for Precise Code Generation with Compiler Feedback`
   - Findings ACL 2024
   - https://aclanthology.org/2024.findings-acl.138/

2. Wang et al. — `INTERVENOR: Prompting the Coding Ability of Large Language Models with the Interactive Chain of Repair`
   - Findings ACL 2024
   - https://aclanthology.org/2024.findings-acl.124/

3. Zhao et al. — `RePair: Automated Program Repair with Process-based Feedback`
   - Findings ACL 2024
   - https://aclanthology.org/2024.findings-acl.973/

4. `StepCoder: Improving Code Generation with Reinforcement Learning from Compiler Feedback`
   - ACL 2024
   - https://aclanthology.org/2024.acl-long.251/

## Repository-agent tests / test-oracle evidence

5. Jimenez et al. — `SWE-bench: Can Language Models Resolve Real-world Github Issues?`
   - ICLR 2024
   - https://www.swebench.com/

6. OpenAI — `Introducing SWE-bench Verified`
   - 2024
   - https://openai.com/index/introducing-swe-bench-verified/

7. OpenAI — `Why SWE-bench Verified no longer measures frontier coding capabilities`
   - 2026-02-23
   - https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/

8. OpenAI — `Separating signal from noise in coding evaluations`
   - 2026
   - https://openai.com/index/separating-signal-from-noise-coding-evaluations/

## Test adequacy / property / mutation

9. Bose — `From Prompts to Properties: Rethinking LLM Code Generation with Property-Based Testing`
   - FSE Companion 2025
   - DOI: 10.1145/3696630.3728702

10. He et al. — `Use Property-Based Testing to Bridge LLM Code Generation and Validation`
    - 2025 preprint
    - https://arxiv.org/abs/2506.18315

11. `LLMLOOP: Improving LLM-Generated Code and Tests Through Automated Iterative Feedback Loops`
    - ICSME 2025
    - DOI: 10.1109/ICSME64153.2025.00109

12. `LLMorpheus: Mutation Testing Using Large Language Models`
    - IEEE Transactions on Software Engineering 2025
    - DOI: 10.1109/TSE.2025.3562025

13. Maton et al. — `Where tests fall short: Empirically analyzing oracle gaps in covered code`
    - ESEM 2025
    - https://gregorykapfhammer.com/research/papers/maton2025/

14. Berndt et al. — `On the Flakiness of LLM-Generated Tests for Industrial and Open-Source Database Management Systems`
    - ICSE-SEIP 2026
    - DOI: 10.1145/3786583.3786919

15. Parry et al. — `Systemic flakiness: An empirical analysis of co-occurring flaky test failures`
    - EASE 2025
    - https://arxiv.org/abs/2504.16777

## Static analysis / safety-critical

16. Sevenhuijsen et al. — `Generating Safety-Critical Automotive C-programs using LLMs with Formal Verification`
    - PMLR / NeSy 2025
    - https://proceedings.mlr.press/v284/sevenhuijsen25a.html

17. Cui et al. — `An Empirical Study of False Negatives and Positives of Static Code Analyzers From the Perspective of Historical Issues`
    - 2024 preprint
    - https://arxiv.org/abs/2408.13855

18. Shen et al. — `Finding 709 Defects in 258 Projects: An Experience Report on Applying CodeQL to Open-Source Embedded Software`
    - ISSTA 2025
    - DOI: 10.1145/3728923

19. Blyth et al. — `Static Analysis as a Feedback Loop: Enhancing LLM-Generated Code Beyond Correctness`
    - 2025 preprint
    - https://arxiv.org/abs/2508.14419

## Formal verification / proof assistants

20. Aggarwal et al. — `AlphaVerus: Bootstrapping Formally Verified Code Generation through Self-Improving Translation and Treefinement`
    - ICML 2025
    - https://proceedings.mlr.press/v267/aggarwal25a.html

21. Dong & Ma — `STP: Self-play LLM Theorem Provers with Iterative Conjecturing and Proving`
    - ICML 2025
    - https://proceedings.mlr.press/v267/dong25h.html

22. Song et al. — `Lean Copilot: Large Language Models as Copilots for Theorem Proving in Lean`
    - 2025
    - https://proceedings.mlr.press/v288/song25a.html

23. Rao et al. — `Neural Theorem Proving: Generating and Structuring Proofs for Formal Verification`
    - 2025
    - https://proceedings.mlr.press/v284/rao25a.html

## Symbolic solver / formalization bridge

24. Pan et al. — `Logic-LM: Empowering Large Language Models with Symbolic Solvers for Faithful Logical Reasoning`
    - Findings EMNLP 2023
    - https://aclanthology.org/2023.findings-emnlp.248/

25. Yang et al. — `Harnessing the Power of Large Language Models for Natural Language to First-Order Logic Translation`
    - ACL 2024
    - https://aclanthology.org/2024.acl-long.375/

26. Lam et al. — `A Closer Look at Tool-based Logical Reasoning with LLMs: The Choice of Tool Matters`
    - 2024
    - https://aclanthology.org/2024.alta-1.4/

27. `Bridging Language Models and Symbolic Solvers via the Model Context Protocol`
    - SAT 2025
    - https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.SAT.2025.30

28. Raspanti et al. — `Grammar-Constrained Decoding Makes Large Language Models Better Logical Parsers`
    - ACL Industry 2025
    - https://aclanthology.org/2025.acl-industry.34/

## Verifiable rewards / verifier gaming

29. Wen et al. — `Reinforcement Learning with Verifiable Rewards Implicitly Incentivizes Correct Reasoning in Base LLMs`
    - ICLR 2026
    - https://proceedings.iclr.cc/paper_files/paper/2026/hash/517f9b9c227b9dd51dba4560f37165ed-Abstract-Conference.html

30. Helff et al. — `LLMs Gaming Verifiers: RLVR can Lead to Reward Hacking`
    - 2026 preprint
    - https://arxiv.org/abs/2604.15149

31. Cai et al. — `Reinforcement Learning with Verifiable Physics: Post-training LLMs with Continuous Rewards`
    - 2026 preprint
    - https://arxiv.org/abs/2607.10474

32. Jiang et al. — `From Verifiable Dot to Reward Chain: Harnessing Verifiable Reference-based Rewards for Reinforcement Learning of Open-ended Generation`
    - ICLR 2026
    - https://proceedings.iclr.cc/paper_files/paper/2026/hash/1be5bc25d50895ee656b8c2d9eb89d6a-Abstract-Conference.html

---

# 38. Research gaps deliberately left open

The following adjacent questions remain open:

- **evidence receipts / proof that a verifier was actually executed**,
- fabricated claims such as `tests passed` when no test was run,
- binding evidence to commit / artifact / configuration identity,
- **stale evidence and automatic invalidation after changes**,
- selective rerun / impact analysis for affected validators,
- dependency graph between Rule → artifact → verifier → evidence,
- trust / qualification of verifier binaries and third-party Actions,
- deterministic validation of nested `AGENTS.md` / repository instructions,
- formal mapping from natural-language Guide Rules into atomic machine obligations,
- how to detect semantic drift between prose Rule and validator implementation,
- mutation testing of Rule validators themselves,
- adversarial generation of verifier loopholes,
- hidden vs public validators and gaming trade-offs,
- validator coverage metrics for Rule universes,
- false-positive / false-negative estimation per verifier,
- abstention / `UNVERIFIABLE` state rather than forced PASS,
- use of SAT / SMT to detect contradictory applicable Rule sets,
- symbolic enforcement of hierarchy / exception / waiver rules,
- formal verification of state transitions in agent workflows,
- browser / UI behavioral verification beyond screenshot comparison,
- accessibility automation coverage vs manual accessibility testing,
- data migration invariant verification,
- security scanners combined with exploit / dynamic testing,
- formal methods feasibility for JavaScript / browser / Electron projects,
- when human validation remains necessary despite all machine evidence,
- evidence composition: how multiple partial verifiers combine into a defensible assurance claim.

---

# 39. Current research stopping point

For this theme, the current evidence is sufficient to preserve several independent conclusions without moving into adoption:

1. external compilers, tests, analyzers, solvers, and proof checkers provide evidence channels materially different from LLM self-review;
2. compiler / static feedback can substantially improve project-context-aware code generation and repair;
3. executable tests can falsify confident but incorrect coding-agent claims and provide reproducible regression evidence;
4. deterministic test results are only as valid as their test oracle, scope, environment, and stability;
5. current 2026 SWE-bench evidence demonstrates large real-world test-oracle failures even in a heavily curated benchmark;
6. line / branch coverage does not prove meaningful assertion coverage;
7. mutation testing and oracle-gap analysis can test the quality of the test system itself;
8. property-based testing and fuzzing expand counterexample search beyond fixed examples, but missing / wrong properties remain a specification gap;
9. static analysis can check important non-functional and security properties that runtime tests may not cover, while still having false positives and false negatives;
10. formal verification / proof assistants can provide a much stronger guarantee for properties that are correctly formalized;
11. formal verification does not solve the specification problem — weak or manipulated specifications can verify vacuously;
12. RLVR research shows that optimizing against verifiers can teach models to exploit verifier blind spots;
13. symbolic solvers can move exact search out of the LLM, but natural-language-to-symbolic translation becomes a new critical failure boundary;
14. grammar / schema constraints can eliminate structural invalidity but cannot guarantee semantic intent;
15. binary PASS/FAIL evidence can hide partial correctness, quality gradients, or severity;
16. tool configuration, version, environment, and flakiness are part of verifier reliability;
17. verification evidence is artifact-state-specific and can become stale after any relevant modification;
18. no single deterministic verifier covers the complete software-development Rule universe;
19. deterministic / executable evidence therefore appears strongest as one class of barrier inside a broader layered assurance system, not as a universal replacement for semantic review;
20. the natural next separate research theme is **evidence receipts / false completion / stale evidence: how a system proves that required checks actually happened on the current artifact**.

This is enough to stop this single theme without designing the final Guide architecture.

**No Common Rule, Router behavior, Gate, mandatory validator, required test type, formal-method requirement, coverage threshold, mutation threshold, policy-engine requirement, proof requirement, or adoption decision is created by this file.**