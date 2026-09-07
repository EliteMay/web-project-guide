# LLM Retrieval / Routing / Structured External Memory Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Routing owner relevant to this question: `docs/21-rule-routing-preflight.md`
- Capture policy: `references/research-capture-policy.md`
- Related prior AI research:
  - `references/llm-long-context-instruction-following-research.md`
  - `references/llm-multi-constraint-instruction-following-research.md`
  - `references/llm-conflicting-hierarchical-instruction-research.md`
  - `references/llm-self-review-self-critique-research.md`
  - `references/llm-independent-verifier-judge-research.md`
  - `references/llm-multi-agent-verification-debate-research.md`
  - `references/llm-tool-assisted-deterministic-verification-research.md`
  - `references/llm-evidence-receipts-false-completion-stale-evidence-research.md`
  - `references/llm-repository-coding-agent-instruction-adherence-research.md`
- This file is **non-normative research evidence**.
- Adoption status for all mechanisms below: **not decided**, unless explicitly stated otherwise.
- Research is high-recall first. Mechanisms are preserved even when they require vector databases, graph stores, learned routers, active-learning loops, independent relevance labeling, statistical recall estimation, multiple retrievers, specialized memory systems, model training, large benchmark suites, or capabilities unavailable to the current project.

## Research Question

How can an LLM / coding-agent system select the **complete applicable subset** of instructions from a large, versioned Rule universe without either:

1. silently omitting a Rule that should have applied, or
2. flooding the model with so much context that instruction-following degrades?

The project-relevant pipeline is better modeled as:

```text
canonical Rule universe exists
→ Rule universe is indexed / structured
→ current task / repository state is represented as retrieval input
→ candidate Rule domains are routed
→ candidate Rules / Owner Docs are retrieved
→ scope / dependency / exception / authority / version relations are expanded
→ retrieval coverage is assessed
→ source text is read and interpreted
→ Rules are applied during action
→ task scope changes trigger new retrieval / routing
→ final validation checks current obligations
```

Every stage can fail independently.

This pass focuses on:

- retrieval recall vs precision,
- sparse / lexical retrieval,
- dense / semantic retrieval,
- mixtures / hybrid retrieval,
- hierarchical retrieval,
- graph / relational retrieval,
- temporal / version-aware retrieval,
- active / iterative retrieval,
- routing among retrieval strategies,
- structured external memory,
- file-based agentic memory,
- retrieval evaluation and confidence,
- high-recall search / stopping criteria,
- methods for detecting possibly missed applicable Rules,
- failure modes where retrieval succeeds but enforcement still fails.

This pass does **not** select a final Router, vector database, graph schema, memory backend, recall threshold, top-k, or Rule metadata schema for `web-project-guide`.

---

# 1. First distinction: retrieval quality is not one variable

## Evidence / observed practice

Modern RAG and memory evaluation repeatedly decomposes end-to-end performance into separate stages.

LongMemEval, ICLR 2025, explicitly decomposes long-term memory into:

```text
indexing
→ retrieval
→ reading
```

RAGChecker, NeurIPS 2024, evaluates the retriever and generator separately instead of treating final answer quality as a sufficient diagnostic.

HANDBOOK.md, a 2026 long-context agentic instruction-following benchmark, demonstrates another downstream stage: agents can retrieve the facts necessary for a correct decision and still violate the standing policy when acting.

Sources:

- Wu et al., `LongMemEval: Benchmarking Chat Assistants on Long-Term Interactive Memory`, ICLR 2025
  - https://proceedings.iclr.cc/paper_files/paper/2025/hash/d813d324dbf0598bbdc9c8e79740ed01-Abstract-Conference.html
- Ru et al., `RAGChecker: A Fine-grained Framework for Diagnosing Retrieval-Augmented Generation`, NeurIPS 2024
  - https://proceedings.neurips.cc/paper_files/paper/2024/hash/27245589131d17368cccdfa990cbf16e-Abstract-Datasets_and_Benchmarks_Track.html
- Panavas et al., `HANDBOOK.md: A Benchmark for Long-Context Agentic Instruction Following`, 2026 preprint
  - https://arxiv.org/abs/2607.25398

## Knowledge captured

For Rule systems, at least these should remain conceptually separate during later synthesis:

```text
Rule indexed?
Rule retrieved?
Correct Rule version retrieved?
Rule considered applicable?
Rule interpreted correctly?
Rule obeyed?
Rule validated?
```

A failure in any one can appear to a user as the same symptom: `the agent missed a rule`.

**Adoption status:** not decided.

---

# 2. Retrieval precision and Rule recall are different objectives

## Evidence / observed practice

Information retrieval distinguishes:

- **precision**: how much retrieved material is relevant,
- **recall**: how much of all relevant material was retrieved.

RAG evaluation frameworks such as RAGChecker use fine-grained retriever diagnostics rather than relying only on the final answer.

High-recall fields such as legal e-discovery and systematic-review screening treat missing relevant material as a first-class risk and therefore emphasize recall estimation and stopping logic.

Sources:

- RAGChecker, NeurIPS 2024
- Grossman & Cormack, `Technology-Assisted Review in E-Discovery Can Be More Effective and More Efficient Than Exhaustive Manual Review`, 2011
  - https://grossman.uwaterloo.ca/grossman-publications/jolt-2011/
- Callaghan & Müller-Hansen, `Statistical stopping criteria for automated screening in systematic reviews`, Systematic Reviews 2020
  - https://doi.org/10.1186/s13643-020-01521-4

## Knowledge captured

A router can have high precision while still being unsafe for omission-sensitive Rule selection.

Example:

```text
Router returns 4 Rules
all 4 are relevant
→ precision = excellent

but 2 other applicable Rules were omitted
→ recall is incomplete
```

For a Rule universe, `few irrelevant docs retrieved` and `no applicable Rules missed` are distinct quality claims.

**Adoption status:** not decided.

---

# 3. The denominator problem makes missed-Rule detection intrinsically difficult

## Evidence / observed practice

Recall is:

```text
retrieved relevant items / all relevant items
```

The denominator is unknown in a live retrieval problem unless the complete relevant set is already known or estimated.

Systematic-review automation research explicitly treats this as a stopping problem: reviewers do not know whether all or a target fraction of relevant documents have been found until the unseen tail has somehow been assessed.

Callaghan & Müller-Hansen introduce a statistical stopping workflow that samples from unseen records and tests whether a target recall has likely been achieved at a specified confidence level.

A 2024 methodological commentary similarly emphasizes that true recall remains uncertain until all records are screened and that stopping rules exist to manage that uncertainty.

Sources:

- Callaghan & Müller-Hansen, Systematic Reviews 2020
- `Computer-assisted screening in systematic evidence synthesis requires robust and well-evaluated stopping criteria`, 2024
  - https://pmc.ncbi.nlm.nih.gov/articles/PMC11583672/

## Knowledge captured

A future Rule Router cannot prove `nothing applicable was missed` merely because its returned set looks plausible.

To measure retrieval recall directly, some independent representation of the applicable Rule set is required, for example in a benchmark / audited sample / deterministic catalog / independently labeled control set.

No such mechanism is adopted here.

**Adoption status:** not decided.

---

# 4. Human-created gold applicability sets can themselves be incomplete

## Evidence / observed practice

The 2026 CSLAW paper `Benchmarking Legal RAG: The Promise and Limits of AI Statutory Surveys` evaluates statutory retrieval / reasoning against LaborBench, whose apparent ground truth originated from a multi-month manual compilation by U.S. Department of Labor attorneys.

The authors report:

- standard RAG had previously achieved about 70% Boolean-task accuracy,
- STARA achieved 83% in the new evaluation,
- error analysis found both reasoning failures and retrieval failures where relevant statutory provisions were not captured,
- importantly, several apparent model errors were actually omissions in the attorney-created ground truth; after correction the authors report STARA at 92% accuracy.

Sources:

- Afane et al., `Benchmarking Legal RAG: The Promise and Limits of AI Statutory Surveys`, CSLAW 2026
  - https://reglab.stanford.edu/publications/benchmarking-legal-rag-the-promise-and-limits-of-ai-statutory-surveys/
  - https://arxiv.org/abs/2603.03300

## Knowledge captured

Even an expensive expert-created applicability universe can omit items.

Therefore a future retrieval benchmark for Guide Rules could itself create false confidence if the expected Rule set is incomplete.

This is a second-order verification problem:

```text
Router is evaluated against gold Rule set
→ gold Rule set is incomplete
→ Router is penalized for discovering a real Rule or rewarded despite missing another real Rule
```

**Adoption status:** not decided.

---

# 5. Exact lexical retrieval and semantic retrieval supply different signals

## Evidence / observed practice

MoR, EMNLP 2025, directly compares heterogeneous retrievers and states:

- BM25 captures lexical matches,
- dense retrievers capture semantic similarity,
- the signals are complementary,
- fixing one retriever does not generalize across diverse information needs.

Its zero-shot mixture totaling 0.8B parameters outperformed every individual retriever by 10.8% on average and larger 7B retrievers by 3.9% on average in the authors' evaluated tasks.

Source:

- Kalra et al., `MoR: Better Handling Diverse Queries with a Mixture of Sparse, Dense, and Human Retrievers`, EMNLP 2025
  - https://aclanthology.org/2025.emnlp-main.601/

## Knowledge captured

Rule retrieval can contain both kinds of need:

```text
exact Rule ID / filename / gate name
→ lexical signal is strong

"add login" implies authentication / security obligations
→ semantic applicability may matter even if wording differs
```

A single retrieval channel can therefore have systematic blind spots.

**Adoption status:** not decided.

---

# 6. Low lexical overlap is a real long-context retrieval difficulty

## Evidence / observed practice

NoLiMa, ICML 2025, modifies needle-in-a-haystack evaluation so that queries and relevant evidence have minimal lexical overlap and latent associations must be inferred.

The paper reports substantial degradation as context grows compared with literal-match settings.

Source:

- Modarressi et al., `NoLiMa: Long-Context Evaluation Beyond Literal Matching`, ICML 2025
  - https://proceedings.mlr.press/v267/modarressi25a.html

## Knowledge captured

A Rule Router based only on literal tokens can miss semantically implied applicability.

Examples of possible Rule-retrieval mismatch include:

```text
user says "keep existing user data"
Rule vocabulary says "migration / schema compatibility"

user says "publish this"
Rule vocabulary says "deployment / public release / security"
```

This is an analogy to the benchmark result, not an adopted taxonomy.

**Adoption status:** not decided.

---

# 7. Retrieving more material indiscriminately is not a universal solution

## Evidence / observed practice

Self-RAG, ICLR 2024, argues that indiscriminately retrieving a fixed number of passages regardless of need or relevance can reduce model versatility or lead to unhelpful generation.

Prior long-context research in this repository already records distractor, many-constraint, and long-context degradation.

Source:

- Asai et al., `Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection`, ICLR 2024
  - https://proceedings.iclr.cc/paper_files/paper/2024/hash/25f7be9694d7b32d5cc670927b8091e1-Abstract-Conference.html

## Knowledge captured

The high-recall goal creates a real trade-off:

```text
retrieve too little
→ missed applicable Rules

retrieve too much
→ context noise / constraint load / attention dilution / cost
```

This means `just inject the full Guide` and `retrieve only top-1` occupy opposite failure risks.

No optimal point is selected here.

**Adoption status:** not decided.

---

# 8. Active retrieval shows that routing need not happen only once at task start

## Evidence / observed practice

FLARE, EMNLP 2023, critiques the standard retrieve-once-then-generate setup for long generation tasks and retrieves repeatedly based on predicted upcoming content / low-confidence tokens.

Source:

- Jiang et al., `Active Retrieval Augmented Generation`, EMNLP 2023
  - https://aclanthology.org/2023.emnlp-main.495/

## Knowledge captured

A development task can reveal new Rule applicability after work begins:

```text
initial request appears local
→ investigation discovers schema change
→ migration Rule becomes applicable

UI tweak
→ implementation expands into navigation redesign
→ structure / flow Rule becomes applicable
```

Therefore research supports keeping **dynamic / iterative retrieval** as a distinct design family from a one-shot preflight router.

This does not establish which trigger mechanism is reliable enough for `web-project-guide`.

**Adoption status:** not decided.

---

# 9. Adaptive retrieval has an uncertainty / cost trade-off

## Evidence / observed practice

ACL 2025's `Adaptive Retrieval Without Self-Knowledge?` compares 35 adaptive retrieval methods, including 8 recent retrieval approaches and 27 uncertainty-estimation techniques, across six datasets and multiple performance / efficiency metrics.

The paper reports that uncertainty-estimation techniques often outperform more complex pipelines on efficiency and self-knowledge while retaining comparable QA performance in the evaluated settings.

Source:

- Moskvoretskii et al., ACL 2025
  - https://aclanthology.org/2025.acl-long.319/

## Knowledge captured

The existence of many adaptive methods means `LLM feels uncertain → retrieve` should not be treated as a uniquely validated routing rule.

A retrieval trigger can fail because:

- model confidence is miscalibrated,
- the model does not know which Rule family it is missing,
- the model can be confidently wrong,
- cost control changes retrieval frequency.

Prior self-review / judge research in this repository strengthens this caution.

**Adoption status:** not decided.

---

# 10. Query-side routing alone may be insufficient; corpus structure matters

## Evidence / observed practice

RAGRouter-Bench, a 2026 preprint, evaluates five RAG paradigms across 7,727 queries and 21,460 documents and explicitly studies **query-corpus compatibility**.

The authors report:

- no single RAG paradigm is universally optimal,
- effectiveness depends strongly on query-corpus interactions,
- more sophisticated mechanisms do not automatically yield better effectiveness-efficiency trade-offs.

Source:

- Wang et al., `RAGRouter-Bench: A Dataset and Benchmark for Adaptive RAG Routing`, 2026 preprint
  - https://arxiv.org/abs/2602.00296

## Knowledge captured

For a Rule Router, classifying only the user request may be insufficient.

Applicability can also depend on corpus / repository facts such as:

- project type,
- files actually touched,
- current architecture,
- whether storage already exists,
- nested scope,
- version / branch,
- rule relationships.

This remains a research inference, not a Router redesign.

**Adoption status:** not decided.

---

# 11. Hierarchical retrieval addresses local-chunk vs whole-document tension

## Evidence / observed practice

RAPTOR, ICLR 2024, recursively embeds, clusters, and summarizes chunks into a tree and retrieves at different levels of abstraction.

Its motivation is that retrieving only short contiguous chunks can prevent holistic understanding of long documents. The authors report improvements across multiple QA tasks, including a 20 percentage-point absolute improvement on QuALITY in one GPT-4 setup over the prior best result cited by the paper.

Source:

- Sarthi et al., `RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval`, ICLR 2024
  - https://proceedings.iclr.cc/paper_files/paper/2024/hash/8a2acd174940dbca361a6398a4f9df91-Abstract-Conference.html

## Knowledge captured

Hierarchical Rule retrieval can preserve two different forms of information:

```text
high level
→ which domain / Owner / concept matters

leaf level
→ exact exception / condition / MUST text
```

However, generated summaries are compression layers. A later design would need to test whether important exceptions survive summarization and whether source-leaf traceability is retained.

That limitation is a synthesis concern here, not a claim that RAPTOR itself fails this project.

**Adoption status:** not decided.

---

# 12. Graph retrieval targets relationships that flat similarity can miss

## Evidence / observed practice

Microsoft's GraphRAG work argues that conventional RAG is weak on global questions over whole corpora and constructs a knowledge graph plus community summaries to support global sensemaking.

A 2026 ACM TOIS survey describes graph RAG as a family motivated by relational structures that are difficult to represent with isolated chunk retrieval.

Sources:

- Edge et al., `From Local to Global: A Graph RAG Approach to Query-Focused Summarization`, 2024 preprint / Microsoft Research
  - https://www.microsoft.com/en-us/research/publication/from-local-to-global-a-graph-rag-approach-to-query-focused-summarization/
- Peng et al., `Graph Retrieval-Augmented Generation: A Survey`, ACM Transactions on Information Systems, 2026
  - https://doi.org/10.1145/3777378

## Knowledge captured

A Rule universe contains explicit relationships that similarity alone may not encode safely:

```text
Rule A owned by Owner X
Rule B overrides A under condition C
Rule D is an exception to B
Rule E applies when Gate G fires
Rule F supersedes old Rule F0
Rule H depends on touched path P
```

Graph / relational retrieval therefore remains relevant even if a semantic vector index exists.

**Adoption status:** not decided.

---

# 13. Compliance research directly combines semantic retrieval with structured rule representation

## Evidence / observed practice

COLING 2025's `A Compliance Checking Framework Based on Retrieval Augmented Generation` contrasts:

- logic-based methods: precise / reliable reasoning but inflexible,
- semantic embedding methods: more generalizable but can lose structured information / logical coherence.

The framework combines static factual knowledge, dynamic regulatory / business-process knowledge, and computational retrieval / reasoning. It uses an **eventic graph** because regulatory knowledge centers on actions and states rather than only entities.

Source:

- Sun, Luo & Li, COLING 2025
  - https://aclanthology.org/2025.coling-main.178/

## Knowledge captured

This is directly relevant to development Rules because applicability is often triggered by events / state transitions rather than topic similarity alone.

Examples of the transferable concept include:

```text
schema changed
public release requested
new external API introduced
existing save touched
scope expanded into navigation redesign
```

The specific eventic-graph design is not adopted.

**Adoption status:** not decided.

---

# 14. Temporal retrieval shows version/freshness should be part of search semantics

## Evidence / observed practice

TimeR4, EMNLP 2024, performs time-aware retrieve-rewrite-retrieve-rerank over temporal knowledge graphs and reports large gains on its evaluated temporal QA datasets.

Its architecture explicitly extracts time constraints and reranks evidence using temporal relevance rather than semantic similarity alone.

Source:

- Qian et al., `TimeR4: Time-aware Retrieval-Augmented Large Language Models for Temporal Knowledge Graph Question Answering`, EMNLP 2024
  - https://aclanthology.org/2024.emnlp-main.394/

## Knowledge captured

For a versioned Guide, relevance has at least two dimensions:

```text
semantically relevant?
current / valid for this revision?
```

A stale but semantically perfect Rule can be worse than a less similar current Rule.

This connects directly to prior stale-evidence / current-revision research.

**Adoption status:** not decided.

---

# 15. Imperfect retrieval is common and can actively harm downstream reasoning

## Evidence / observed practice

Astute RAG, ACL 2025, studies imperfect retrieval containing irrelevant, misleading, or malicious information and concludes that such imperfections are common and harmful under its evaluated conditions.

The paper highlights conflict between internal model knowledge and externally retrieved knowledge as a major post-retrieval bottleneck.

Source:

- Wang et al., `Astute RAG: Overcoming Imperfect Retrieval Augmentation and Knowledge Conflicts for Large Language Models`, ACL 2025
  - https://aclanthology.org/2025.acl-long.1476/

## Knowledge captured

Retrieval systems must consider not only omission but contamination:

```text
missed Rule
wrong Rule
stale Rule
conflicting Rule
malicious / untrusted retrieved text
```

A high-recall retrieval system that adds many misleading items can introduce a different failure class.

**Adoption status:** not decided.

---

# 16. Retrieval evaluation should separate context relevance from answer faithfulness

## Evidence / observed practice

ARES, NAACL 2024, evaluates RAG along three dimensions:

- context relevance,
- answer faithfulness,
- answer relevance.

It uses lightweight LM judges plus a small human-annotated set with prediction-powered inference to reduce evaluator error.

RAGTruth, ACL 2024, contains nearly 18,000 naturally generated RAG responses and shows that retrieved context does not prevent models from generating unsupported or contradictory claims.

Sources:

- Saad-Falcon et al., `ARES`, NAACL 2024
  - https://aclanthology.org/2024.naacl-long.20/
- Niu et al., `RAGTruth`, ACL 2024
  - https://aclanthology.org/2024.acl-long.585/

## Knowledge captured

A Rule system can retrieve the correct Rule but still fail at **faithful use**.

Therefore a retrieval benchmark alone cannot establish instruction adherence.

**Adoption status:** not decided.

---

# 17. HANDBOOK.md directly demonstrates retrieval-without-enforcement failure

## Evidence / observed practice

HANDBOOK.md evaluates 65 tool-using agent tasks governed by expert-written SOPs of 20–124 pages, with 824 deterministic criteria.

The best of 30 model configurations passes 36.2% under strict all-criteria grading; most frontier configurations remain below 25% in the reported evaluation.

The paper's failure analysis includes cases where the agent:

- lets an immediate request override standing policy,
- performs a required check but acts against its result,
- loses Rule details over a long horizon,
- reports compliance that was not achieved.

Critically, the paper includes a failure where the model itself had retrieved every fact required for the correct decision but still acted incorrectly.

Source:

- Panavas et al., 2026
  - https://arxiv.org/abs/2607.25398

## Knowledge captured

This places a hard boundary around this theme:

```text
perfect retrieval coverage
≠
perfect Rule enforcement
```

Improving Router recall is necessary for one failure class but cannot replace downstream barriers.

**Adoption status:** not decided.

---

# 18. Long-term memory research supports typed / structured memory rather than one flat store

## Evidence / observed practice

LongMemEval-V2, a 2026 work-in-progress preprint, evaluates web-agent experience using 451 questions over histories as large as 500 trajectories / 115M tokens.

It proposes:

- `AgentRunbook-R`: an RAG memory with separate pools for raw state observations, state-transition events, and high-level strategy notes,
- `AgentRunbook-C`: raw trajectories stored as files plus workflow documents, manifests, helper scripts, and a coding agent that gathers compact evidence.

The abstract reports average accuracy of:

- 48.5% for the strongest RAG baseline,
- 69.3% for an off-the-shelf coding-agent baseline,
- 72.5% for AgentRunbook-C,

with substantial latency cost for coding-agent approaches.

Source:

- Wu et al., `LongMemEval-V2: Evaluating Long-Term Agent Memory Toward Experienced Colleagues`, 2026 preprint / work in progress
  - https://arxiv.org/abs/2605.12493

## Knowledge captured

External memory need not mean `one vector database`.

Research architectures include typed stores such as:

```text
raw observations
state transitions / events
procedures / strategy
source files
manifests / indices
helper tools
```

This is relevant to Rule systems where exact normative text, routing metadata, history, evidence, and learned operational knowledge have different semantics.

**Adoption status:** not decided.

---

# 19. File-based agentic evidence gathering can outperform simple state-slice RAG in one modern benchmark

## Evidence / observed practice

LongMemEval-V2's strongest reported method stores trajectories in ordinary files and gives a coding agent tools / manifests to actively gather evidence instead of relying only on a fixed top-k vector retrieval pipeline.

The method improves accuracy in the authors' benchmark but incurs higher latency than lightweight RAG.

## Knowledge captured

A future Rule-memory design may have several architectural families:

```text
flat RAG
structured RAG
hierarchical / graph retrieval
agentic file search
hybrid of deterministic routing + agentic source reads
```

The strongest method may depend on the workload and latency budget.

**Adoption status:** not decided.

---

# 20. Memory recall benchmarks can overstate usefulness for action

## Evidence / observed practice

MemoryArena, a 2026 agent-memory benchmark, argues that memorization and action are often evaluated separately even though real agents must use memory to guide future actions.

It reports that systems with near-saturated performance on existing long-context memory benchmarks can perform poorly on interdependent multi-session agentic tasks.

Source:

- He et al., `MemoryArena: Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks`, 2026
  - https://arxiv.org/abs/2602.16313
  - project repository states accepted at ICML 2026: https://github.com/ZexueHe/MemoryArena

## Knowledge captured

For Rule memory, successful retrieval QA should not be the only target.

A stronger evaluation eventually needs to ask:

```text
Did the retrieved Rule change the correct future action?
```

This connects to HANDBOOK.md's policy-action gap.

**Adoption status:** not decided.

---

# 21. High-recall legal review treats stopping as a validation problem

## Evidence / observed practice

Technology-Assisted Review (TAR) / Continuous Active Learning in e-discovery is designed for high-recall document discovery where missed relevant documents have legal consequences.

Grossman & Cormack's work shows that human + machine prioritization can outperform exhaustive manual review on measured recall / precision in studied TREC legal tasks.

Later CAL work emphasizes reliability across topics, not only average ranking quality.

A 2024 SIGIR paper on unbiased validation emphasizes that recall estimates require **independent relevance assessments**; using the same judgments for training and validation can bias the estimate.

Sources:

- Grossman & Cormack, 2011
- Cormack & Grossman, `Autonomy and Reliability of Continuous Active Learning for Technology-Assisted Review`, 2015
  - https://arxiv.org/abs/1504.06868
- Cormack et al., `Unbiased Validation of Technology-Assisted Review for eDiscovery`, SIGIR 2024
  - https://doi.org/10.1145/3626772.3657903

## Knowledge captured

Several mature high-recall mechanisms exist outside LLM RAG:

- iterative relevance feedback,
- independent validation samples,
- measured recall rather than intuition,
- explicit stopping rules,
- auditability / reproducibility.

These are retained as transferable concepts, not requirements.

**Adoption status:** not decided.

---

# 22. Sampling the unseen tail is one way to estimate whether important items remain

## Evidence / observed practice

The 2020 Systematic Reviews paper on statistical stopping interrupts active-learning screening and draws a random sample from unseen documents to test whether a target recall is likely to have been reached at a specified confidence level.

The authors report reliable recall with average work reductions of about 17% across their tested datasets and show that some previously proposed stopping methods have inconsistent recall.

Source:

- Callaghan & Müller-Hansen, 2020
  - https://pmc.ncbi.nlm.nih.gov/articles/PMC7700715/

## Knowledge captured

The important transferable concept is **negative-space checking**:

```text
retrieved set looks complete
→ inspect / sample what was NOT retrieved
→ estimate whether important material remains
```

For a small finite Rule catalog, later analogues could theoretically be deterministic rather than statistical; for very large external corpora, sampling methods may remain relevant.

No stopping rule or confidence target is adopted.

**Adoption status:** not decided.

---

# 23. Stopping heuristics can be conservative and multi-signal rather than one threshold

## Evidence / observed practice

The SAFE procedure, Systematic Reviews 2024, combines several conditions for deciding when active-learning screening may stop instead of relying on one score.

The paper emphasizes that the acceptable stopping point depends on the cost of missed records, dataset characteristics, and review context.

Source:

- Boetje & van de Schoot, `The SAFE procedure`, Systematic Reviews 2024
  - https://doi.org/10.1186/s13643-024-02502-7

A 2026 health-technology simulation also finds that a fixed 7% heuristic achieved high average recall but failed to reach 95% recall until much later on one low-prevalence dataset.

Source:

- `Optimising screening efficiency in evidence synthesis on health Technology`, International Journal of Medical Informatics 2026
  - https://doi.org/10.1016/j.ijmedinf.2026.106516

## Knowledge captured

A fixed `top-k`, fixed confidence threshold, or fixed percentage can perform well on average while failing badly on a rare / sparse applicability class.

This is directly relevant to rare but severe development Rules.

**Adoption status:** not decided.

---

# 24. Routing / retrieval validation must be independent enough to catch the same blind spot

## Evidence / observed practice

SIGIR 2024 e-discovery validation work states that recall estimates are valid only when relevance assessments are sufficiently independent from the process being evaluated.

Prior repository research already shows same-model self-review and homogeneous multi-agent checks can share blind spots.

## Knowledge captured

Potentially weak pattern:

```text
LLM router selects Rules
→ same LLM says "nothing missing"
```

The second step may preserve the same semantic blind spot.

Independent validation could mean a different mechanism, data source, rule catalog scan, human label, alternate retriever, or deterministic applicability check, depending on future design.

**Adoption status:** not decided.

---

# 25. Retrieval disagreement can be informative even when no retriever is authoritative

## Evidence synthesis

MoR shows heterogeneous retrievers supply complementary signals. High-recall review uses alternative sampling / validation to estimate what the primary ranking missed.

## Knowledge captured

If two retrieval channels disagree materially, that disagreement may be a useful uncertainty signal:

```text
lexical retriever finds Security Rule
semantic retriever does not

or

semantic retriever finds Migration Rule
metadata router does not
```

Disagreement itself is not proof that either result is correct, but it can expose a blind spot hidden by one system's confidence.

**Adoption status:** not decided.

---

# 26. Relational closure is a distinct retrieval obligation

## Evidence synthesis

GraphRAG / graph-RAG literature and compliance eventic-graph work show that related evidence can be connected structurally rather than by local similarity.

## Knowledge captured

After one Rule is retrieved, a system may need to follow relations such as:

- owner,
- prerequisite,
- exception,
- override,
- gate,
- dependent validation,
- supersedes / superseded-by,
- path scope,
- affected evidence.

This is **relational closure** rather than ordinary top-k retrieval.

Example:

```text
retrieve STORAGE-MIGRATION-GATE
→ also retrieve the gate Owner
→ retrieve migration validation obligations
→ retrieve exception / rollback conditions
```

No relation schema is adopted here.

**Adoption status:** not decided.

---

# 27. Version selection is distinct from semantic relevance

## Evidence synthesis

Time-aware retrieval research, prior stale-evidence research, and repository instruction-loader research all show that currentness matters separately from topic match.

## Knowledge captured

A future Rule retrieval result may need identities such as:

```text
Rule ID
Owner Doc
blob / commit / Guide version
effective / superseded status
```

without which a retriever can return the right concept from the wrong revision.

No metadata requirement is adopted.

**Adoption status:** not decided.

---

# 28. Retrieval source authority cannot be flattened into similarity score

## Evidence synthesis

Prior conflicting-instruction research shows instructions have authority / precedence. Astute RAG shows conflicting retrieved information can be harmful. Legal retrieval depends on primary statutory authority and current jurisdiction.

## Knowledge captured

Two chunks can be equally semantically similar but not equally authoritative:

```text
current Owner Doc
old Work Report
research hypothesis
conversation summary
```

A pure similarity ranking can therefore select the wrong source class even if the text is topically correct.

This problem is separate from ordinary relevance.

**Adoption status:** not decided.

---

# 29. Structured external memory can preserve provenance better than free-form summaries

## Evidence synthesis

LongMemEval-V2 uses typed pools and file-backed memory. Graph / temporal retrieval systems retain explicit structure. Prior evidence-receipt research emphasizes source / version binding.

## Knowledge captured

Potential memory records in research could preserve fields such as:

```text
source identity
Rule / fact type
version
scope
relation edges
raw evidence pointer
summary / embedding
last validated state
```

rather than replacing the source with one unconstrained natural-language memory summary.

No memory schema is adopted here.

**Adoption status:** not decided.

---

# 30. Summaries are useful routing artifacts but should not automatically become new normative sources

## Evidence synthesis

RAPTOR demonstrates the utility of hierarchical summaries for retrieval. Current `web-project-guide` governance already distinguishes router / summary documents from normative Owner Docs.

## Knowledge captured

A future hierarchy could theoretically use summaries to answer:

```text
where should I look?
```

while source Owners answer:

```text
what is the exact Rule?
```

This preserves compression utility without automatically treating summary text as the full authority.

This is only a research hypothesis.

**Adoption status:** not decided.

---

# 31. Context assembly is itself a resource-allocation problem

## Evidence synthesis

Self-RAG shows unnecessary retrieval can hurt. Prior long-context research shows more context and more simultaneous constraints can reduce adherence. LongMemEval-V2 shows stronger agentic evidence gathering can be much slower.

## Knowledge captured

A retrieval system must allocate limited context across:

- core instructions,
- task-specific Rules,
- project Source of Truth,
- code / data,
- tool observations,
- evidence,
- conversation state.

Therefore `retrieval recall` cannot be optimized independently from context budget and task execution cost.

**Adoption status:** not decided.

---

# 32. Rare high-severity Rules create a class-imbalance problem

## Evidence synthesis

Systematic-review stopping research shows low-prevalence relevant records can defeat fixed stopping heuristics. Development Rule systems likewise contain conditions that occur rarely but matter greatly, such as destructive migration, credential exposure, or release-specific hazards.

## Knowledge captured

An average retrieval metric can hide severe class-specific misses.

Later evaluation may need to preserve per-domain / severity / rare-trigger performance rather than only global recall.

No severity weighting is adopted.

**Adoption status:** not decided.

---

# 33. End-to-end Rule routing needs coverage tests, not only classification accuracy

## Evidence synthesis

RAGRouter-Bench evaluates routing of RAG paradigms, while RAGChecker evaluates downstream retrieval/generation components. Legal and high-recall review research separately evaluates whether relevant material was actually found.

## Knowledge captured

A Work-Type / Domain classifier can be highly accurate while still missing an applicable cross-cutting Rule.

Therefore these future metrics would answer different questions:

```text
Task classification accuracy
Rule-domain recall
Rule-level recall
Owner-doc recall
Final obligation compliance
```

No metric suite is adopted.

**Adoption status:** not decided.

---

# 34. Golden routing cases can only test known failure surfaces

## Evidence synthesis

High-recall search and LaborBench both show that benchmark ground truth can miss relevant items. A finite golden-case suite therefore gives regression protection for known cases but cannot prove exhaustive coverage of unseen combinations.

## Knowledge captured

Golden cases are useful for:

- known trigger combinations,
- regression after Router edits,
- expected Owner resolution,
- versioned behavior.

They are not a proof that every future task maps to the complete Rule set.

**Adoption status:** not decided.

---

# 35. Mutation / adversarial retrieval tests could expose silent Rule omission

## Research mechanism synthesis

Previous deterministic-verifier research preserved mutation testing as a way to test the checker itself. The same conceptual technique can be applied to routing / retrieval experiments.

Possible research tests include:

- remove one expected metadata signal and see whether another channel still finds the Rule,
- paraphrase task language to eliminate exact keywords,
- add distractor Rules with stronger lexical overlap,
- insert stale/superseded versions,
- introduce a nested exception,
- expand touched-file scope mid-task,
- create conflicting applicability signals,
- hide a rare high-severity Rule among many irrelevant Rules.

## Knowledge captured

A Router may need adversarial / mutation evaluation to expose brittle keyword or metadata shortcuts.

No test suite is adopted here.

**Adoption status:** not decided.

---

# 36. Possible mechanisms observed in research — not recommendations

Per the Research Capture Policy, mechanisms are preserved before feasibility / adoption filtering.

## Indexing / representation

- lexical inverted index / BM25,
- dense embeddings,
- hybrid sparse+dense index,
- learned retrievers,
- hierarchical trees,
- knowledge graphs,
- event / state graphs,
- temporal / versioned graphs,
- typed memory pools,
- file-based stores with manifests,
- source / blob identity metadata,
- path / project / environment scope metadata.

## Query / routing

- Work Type / Domain / Risk classification,
- query expansion,
- multi-query retrieval,
- decomposition into atomic information needs,
- lexical exact-ID lookup,
- semantic applicability search,
- query-corpus-aware routing,
- learned retriever selection,
- zero-shot mixture of retrievers,
- rank fusion,
- specialized domain retrievers.

## Active / dynamic retrieval

- retrieve once at preflight,
- retrieve when uncertainty rises,
- retrieve when new artifact / directory is touched,
- retrieve when a new risk signal appears,
- retrieve before irreversible tool actions,
- retrieve after scope expansion,
- retrieve again after context compaction,
- iterative retrieve-rewrite-retrieve-rerank.

## Relational expansion

- owner expansion,
- prerequisite expansion,
- exception expansion,
- override expansion,
- gate expansion,
- supersession expansion,
- path-scope expansion,
- validation / evidence dependency expansion.

## Retrieval quality / miss detection

- Rule-level recall on audited golden tasks,
- precision / noise metrics,
- top-k recall,
- claim / obligation coverage,
- independent second retriever,
- heterogeneous retriever disagreement,
- independent human / expert sample,
- random sampling of the non-retrieved tail,
- statistical stopping criteria,
- control sets kept separate from retriever tuning,
- explicit `UNKNOWN / POSSIBLY INCOMPLETE` state,
- rare-trigger / severity-specific recall,
- adversarial paraphrase tests,
- routing mutation tests.

## Context assembly

- summary-first / source-on-demand,
- hierarchical summary + exact leaf source,
- context deduplication,
- relevance reranking,
- scope filtering,
- authority filtering,
- current-version filtering,
- context-budget-aware selection,
- keep exact source citations / IDs with summaries.

## External memory lifecycle

- versioned index rebuild,
- invalidation when Rule source changes,
- incremental reindexing,
- stale-entry flags,
- supersession edges,
- provenance / source pointer preservation,
- memory compaction with raw-source retention,
- history separated from current normative state.

All remain research mechanisms.

---

# 37. Current failure taxonomy for Rule retrieval / routing / external memory

## A. Indexing omission

```text
Rule exists
→ never enters retrieval index
→ impossible to retrieve
```

## B. Wrong granularity

```text
Rule split away from prerequisite / exception
or
large chunk contains too much unrelated text
```

## C. Lexical mismatch

```text
task implies concept
→ wording differs from Rule
→ sparse retrieval misses
```

## D. Semantic overreach

```text
embedding similarity retrieves topically related but non-applicable Rule
```

## E. Retriever-selection failure

```text
router chooses wrong retrieval paradigm
```

## F. Top-k truncation

```text
applicable Rule ranks k+1
→ excluded despite relevance
```

## G. Relation-closure miss

```text
main Rule retrieved
→ exception / override / dependent Gate not retrieved
```

## H. Version / stale-source failure

```text
correct topic
→ obsolete revision retrieved
```

## I. Authority flattening

```text
research note outranks normative Owner because similarity is higher
```

## J. Conflict omission

```text
one side of a conflicting Rule pair retrieved
→ system never knows conflict exists
```

## K. One-shot routing failure

```text
task scope changes later
→ no reroute
→ newly applicable Rules remain unseen
```

## L. Summary compression loss

```text
hierarchical summary omits rare exception
→ source leaf never opened
```

## M. Context flooding

```text
high-recall retrieval returns too much
→ model adherence drops under noise / constraint load
```

## N. Retrieval evaluator false confidence

```text
same blind spot affects router and review
→ system declares retrieval complete
```

## O. Incomplete gold set

```text
benchmark expected Rule set is missing a real Rule
→ measured recall is misleading
```

## P. Rare-class miss

```text
average recall high
→ rare critical Rule consistently missed
```

## Q. Memory stale-state failure

```text
external memory retains superseded Rule / repository state
```

## R. Provenance loss

```text
memory summary retained
→ source / version identity lost
```

## S. Retrieval-without-reading

```text
Rule chunk delivered
→ model never meaningfully processes it
```

## T. Reading-without-application

```text
Rule correctly understood
→ action still violates it
```

Evidence:

- HANDBOOK.md.

## U. Correct retrieval with unsupported final claims

```text
context supports X
→ generation states unsupported / contradictory Y
```

Evidence:

- RAGTruth.

## V. Adversarial / contaminated retrieval

```text
malicious / misleading document enters retrieved set
→ model follows wrong source
```

Evidence:

- Astute RAG and prior prompt-injection / hierarchy research.

---

# 38. Feasibility / missing-capability notes

## Relatively accessible today

A repository workflow can technically support forms of:

- exact Rule ID / filename lookup,
- machine-readable Router metadata,
- keyword search,
- multiple search queries,
- current-commit file fetch,
- hierarchical Owner routing,
- source links / blob identities,
- golden routing cases,
- changed-file-triggered rerouting,
- structured JSON registries,
- post-route exact Owner reads.

## Additional infrastructure required

- embedding index over canonical Rules,
- hybrid sparse+dense rank fusion,
- per-Rule applicability metadata,
- graph of dependencies / overrides / exceptions,
- version-aware index invalidation,
- Rule-level retrieval benchmark,
- independent applicability labels,
- retrieval recall dashboards,
- negative-tail sampling,
- learned routing models,
- cross-model / cross-retriever comparison.

## Heavy / currently unrealistic at project scale but preserved

- dedicated high-recall active-learning review operation,
- human-independent statistically calibrated applicability labeling at scale,
- graph neural retrieval over all development knowledge,
- fine-tuned query-corpus router,
- trained uncertainty estimator using model internals,
- continuous multi-agent relevance adjudication,
- formal proof of exhaustive semantic Rule applicability,
- large expert control sets with blinded validation,
- custom AgentRunbook-like memory infrastructure across every repository.

Current impracticality is not grounds for removing these mechanisms from the research record.

---

# 39. Negative results / cautions that should remain visible

1. **Retrieval success does not prove Rule adherence.**
   - HANDBOOK.md.

2. **A relevant-looking retrieved set does not prove high recall.**
   - high-recall IR / stopping literature.

3. **Recall cannot be measured exactly without knowing or estimating the relevant universe.**

4. **Human gold sets can themselves omit relevant Rules / provisions.**
   - LaborBench / STARA audit.

5. **One retriever is not universally optimal.**
   - MoR; RAGRouter-Bench.

6. **Lexical-only retrieval can fail on latent semantic associations.**
   - NoLiMa.

7. **Semantic-only retrieval can lose structured / logical relations.**
   - compliance RAG literature.

8. **Retrieving a fixed amount regardless of need can add harmful noise.**
   - Self-RAG.

9. **Router sophistication does not guarantee better cost/effectiveness.**
   - RAGRouter-Bench.

10. **Adaptive retrieval based on model uncertainty inherits calibration / self-knowledge limits.**

11. **Flat chunks can lose global context; summaries can introduce compression risk.**

12. **Graph retrieval is not a universal replacement for local retrieval.**
   - different query classes require different access patterns.

13. **Version / temporal relevance is separate from semantic relevance.**

14. **Retrieved context can be misleading / malicious / conflicting.**
   - Astute RAG.

15. **Retrieved evidence can be correct while final generated claims are unsupported.**
   - RAGTruth.

16. **Long-term memory recall does not establish future action quality.**
   - MemoryArena.

17. **File-based / agentic search can improve accuracy but cost much more latency.**
   - LongMemEval-V2.

18. **Fixed stopping rules can fail badly on low-prevalence relevant classes.**
   - systematic-review simulation evidence.

19. **Validation that shares training / ranking judgments can produce biased recall estimates.**
   - SIGIR 2024 TAR validation.

20. **Golden routing cases protect known cases but cannot prove exhaustive future coverage.**

---

# 40. Current working interpretations for `web-project-guide` — not adoption decisions

These are hypotheses retained for later synthesis only.

## H1. The Router problem is closer to high-recall retrieval than ordinary classification

A classification label such as `SECURITY` may be correct while another applicable domain was omitted. The safety-critical question is often set completeness.

## H2. Router precision and Router recall should remain separate concepts

Too much retrieval harms context; too little retrieval misses Rules. Later design likely needs both metrics / costs.

## H3. Rule applicability may need multiple retrieval universes

Possible channels include exact metadata, lexical match, semantic match, repository state, and relational expansion. No set is selected.

## H4. Owner / gate routing resembles hierarchical retrieval

High-level routing can identify the neighborhood; exact Owner text still needs source-level reading.

## H5. Exceptions / overrides / prerequisites look more like graph relations than embeddings

Similarity can locate a Rule but cannot reliably infer every formal relationship among Rules.

## H6. Current revision should be part of retrieval identity

A semantically correct stale Rule is not acceptable current evidence.

## H7. Routing may need to be re-evaluated as the edit set changes

Initial task classification cannot know every dependency discovered later.

## H8. A retrieval receipt would prove delivery, not use

Prior evidence-receipt research and HANDBOOK.md jointly show that exact Rule delivery still does not prove adherence.

## H9. Miss detection needs an independent universe or sampling process

A router cannot validate its own recall purely by inspecting its returned set.

## H10. Rare high-impact Rules need explicit evaluation attention

Average recall may hide systematic omission of infrequent risk signals.

## H11. Summaries may be best treated as locators, not replacements for normative sources

This is consistent with current Guide governance but remains a research hypothesis for AI retrieval architecture.

## H12. Structured external memory may need multiple typed stores

Current normative Rules, repository state, evidence, history, and learnings have different freshness / authority semantics and should not automatically be flattened into one memory representation.

## H13. Retrieval and enforcement need distinct barriers

Even a theoretically perfect Router would not remove the need for deterministic validation, evidence, conflict handling, and final-state checks.

---

# 41. Evidence map

| Claim | Main evidence | Evidence status | Current confidence | Important limitation |
|---|---|---|---|---|
| Memory systems benefit from separating indexing, retrieval, and reading | LongMemEval | ICLR 2025 peer-reviewed | High | conversational-memory domain |
| Retrieval and final policy adherence are separate | HANDBOOK.md | 2026 preprint / benchmark | Moderate–High emerging | 65 enterprise-style tasks; recent |
| Sparse and dense retrieval offer complementary signals | MoR | EMNLP 2025 peer-reviewed | High | general IR/RAG tasks, not Rule routing |
| Single fixed retriever fails to generalize across diverse information needs | MoR | EMNLP 2025 peer-reviewed | High | evaluated retrievers / datasets specific |
| Low lexical overlap materially increases retrieval difficulty | NoLiMa | ICML 2025 peer-reviewed | High | long-context needle benchmark |
| Fixed indiscriminate retrieval can be harmful | Self-RAG | ICLR 2024 peer-reviewed | High for evaluated tasks | Self-RAG's reflection solution is model-specific |
| Active retrieval throughout generation can outperform one-shot retrieval | FLARE | EMNLP 2023 peer-reviewed | High for evaluated generation tasks | not a Rule-routing benchmark |
| Adaptive retrieval has major efficiency / uncertainty trade-offs | ACL 2025 adaptive-retrieval study | peer-reviewed | High | QA datasets rather than software rules |
| No single RAG paradigm is universally optimal across query/corpus conditions | RAGRouter-Bench | 2026 preprint | Moderate emerging | preprint; 5 paradigms |
| Hierarchical retrieval can improve holistic long-document reasoning | RAPTOR | ICLR 2024 peer-reviewed | High for evaluated QA tasks | generated summaries can create new dependence |
| Graph retrieval helps model relational/global corpus structure | GraphRAG + ACM survey | preprint + peer-reviewed survey | Moderate–High | application-dependent; graph construction quality |
| Structured event graphs improve compliance retrieval/reasoning | COLING compliance RAG | COLING 2025 peer-reviewed | High for studied datasets | legal/business compliance domain |
| Temporal relevance can materially improve retrieval | TimeR4 | EMNLP 2024 peer-reviewed | High for temporal KGQA | specialized temporal domain |
| Imperfect / conflicting retrieval is common and harmful | Astute RAG | ACL 2025 peer-reviewed | High for studied conditions | response-generation focus |
| Retrieved contents do not prevent unsupported / contradictory generation | RAGTruth | ACL 2024 peer-reviewed | High | hallucination corpus rather than instructions |
| RAG components should be evaluated separately | RAGChecker / ARES | NeurIPS / NAACL 2024 peer-reviewed | High | evaluator validity still conditional |
| Structured / file-based agent memory can outperform simple RAG | LongMemEval-V2 | 2026 preprint / WIP | Moderate emerging | high latency; benchmark-specific |
| Recall ability does not prove action-guiding memory quality | MemoryArena | 2026 benchmark / project states ICML 2026 acceptance | Moderate–High emerging | recent agent benchmark |
| High-recall review can outperform exhaustive manual review in measured tasks | TAR research | legal IR research | High historically | transfer from document review is conceptual |
| Recall stopping requires managing unknown unseen relevant items | Systematic Reviews 2020/2024 | peer-reviewed | High | document-screening domain |
| Independent validation is needed for unbiased retrieval-recall estimates | SIGIR 2024 TAR validation | peer-reviewed | High | legal discovery setting |
| Fixed stopping heuristics can fail on low-prevalence datasets | 2026 health-tech simulation | peer-reviewed | Moderate–High | domain-specific datasets |
| Human expert ground truth can contain omissions | LaborBench/STARA | CSLAW 2026 | High for reported audit | specialized statutory task |

---

# 42. Source register

## Core retrieval / RAG evaluation

1. Di Wu et al. — `LongMemEval: Benchmarking Chat Assistants on Long-Term Interactive Memory`
   - ICLR 2025
   - https://proceedings.iclr.cc/paper_files/paper/2025/hash/d813d324dbf0598bbdc9c8e79740ed01-Abstract-Conference.html

2. Dongyu Ru et al. — `RAGChecker: A Fine-grained Framework for Diagnosing Retrieval-Augmented Generation`
   - NeurIPS 2024 Datasets and Benchmarks
   - https://proceedings.neurips.cc/paper_files/paper/2024/hash/27245589131d17368cccdfa990cbf16e-Abstract-Datasets_and_Benchmarks_Track.html

3. Jon Saad-Falcon et al. — `ARES: An Automated Evaluation Framework for Retrieval-Augmented Generation Systems`
   - NAACL 2024
   - https://aclanthology.org/2024.naacl-long.20/

4. Cheng Niu et al. — `RAGTruth: A Hallucination Corpus for Developing Trustworthy Retrieval-Augmented Language Models`
   - ACL 2024
   - https://aclanthology.org/2024.acl-long.585/

## Retriever diversity / adaptive retrieval

5. Jushaan Kalra et al. — `MoR: Better Handling Diverse Queries with a Mixture of Sparse, Dense, and Human Retrievers`
   - EMNLP 2025
   - https://aclanthology.org/2025.emnlp-main.601/

6. Ali Modarressi et al. — `NoLiMa: Long-Context Evaluation Beyond Literal Matching`
   - ICML 2025
   - https://proceedings.mlr.press/v267/modarressi25a.html

7. Akari Asai et al. — `Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection`
   - ICLR 2024
   - https://proceedings.iclr.cc/paper_files/paper/2024/hash/25f7be9694d7b32d5cc670927b8091e1-Abstract-Conference.html

8. Zhengbao Jiang et al. — `Active Retrieval Augmented Generation`
   - EMNLP 2023
   - https://aclanthology.org/2023.emnlp-main.495/

9. Viktor Moskvoretskii et al. — `Adaptive Retrieval Without Self-Knowledge? Bringing Uncertainty Back Home`
   - ACL 2025
   - https://aclanthology.org/2025.acl-long.319/

10. Ziqi Wang et al. — `RAGRouter-Bench: A Dataset and Benchmark for Adaptive RAG Routing`
    - 2026 preprint
    - https://arxiv.org/abs/2602.00296

## Hierarchical / graph / temporal retrieval

11. Parth Sarthi et al. — `RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval`
    - ICLR 2024
    - https://proceedings.iclr.cc/paper_files/paper/2024/hash/8a2acd174940dbca361a6398a4f9df91-Abstract-Conference.html

12. Darren Edge et al. — `From Local to Global: A Graph RAG Approach to Query-Focused Summarization`
    - Microsoft Research / 2024 preprint
    - https://www.microsoft.com/en-us/research/publication/from-local-to-global-a-graph-rag-approach-to-query-focused-summarization/

13. Boci Peng et al. — `Graph Retrieval-Augmented Generation: A Survey`
    - ACM Transactions on Information Systems, 2026
    - https://doi.org/10.1145/3777378

14. Xinying Qian et al. — `TimeR4: Time-aware Retrieval-Augmented Large Language Models for Temporal Knowledge Graph Question Answering`
    - EMNLP 2024
    - https://aclanthology.org/2024.emnlp-main.394/

## Compliance / regulation retrieval

15. Jingyun Sun, Zhongze Luo, Yang Li — `A Compliance Checking Framework Based on Retrieval Augmented Generation`
    - COLING 2025
    - https://aclanthology.org/2025.coling-main.178/

16. Mohamed Afane et al. — `Benchmarking Legal RAG: The Promise and Limits of AI Statutory Surveys`
    - CSLAW 2026
    - https://reglab.stanford.edu/publications/benchmarking-legal-rag-the-promise-and-limits-of-ai-statutory-surveys/
    - https://arxiv.org/abs/2603.03300

17. Hariri & Ho — `AI for Statutory Simplification: A Comprehensive State Legal Corpus and Labor Benchmark`
    - ICAIL 2025
    - https://reglab.stanford.edu/data/laborbench/

## Imperfect / conflicting retrieval

18. Fei Wang et al. — `Astute RAG: Overcoming Imperfect Retrieval Augmentation and Knowledge Conflicts for Large Language Models`
    - ACL 2025
    - https://aclanthology.org/2025.acl-long.1476/

## Agent instruction / memory

19. Liudas Panavas et al. — `HANDBOOK.md: A Benchmark for Long-Context Agentic Instruction Following`
    - 2026 preprint
    - https://arxiv.org/abs/2607.25398

20. Di Wu et al. — `LongMemEval-V2: Evaluating Long-Term Agent Memory Toward Experienced Colleagues`
    - 2026 preprint / work in progress
    - https://arxiv.org/abs/2605.12493

21. Zexue He et al. — `MemoryArena: Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks`
    - 2026 preprint; project repository reports ICML 2026 acceptance
    - https://arxiv.org/abs/2602.16313
    - https://github.com/ZexueHe/MemoryArena

22. MemoryAgentBench — `Evaluating Memory in LLM Agents via Incremental Multi-Turn Interactions`
    - ICLR 2026
    - https://github.com/HUST-AI-HYZ/MemoryAgentBench

## High-recall retrieval / e-discovery / systematic review

23. Maura R. Grossman, Gordon V. Cormack — `Technology-Assisted Review in E-Discovery Can Be More Effective and More Efficient Than Exhaustive Manual Review`
    - Richmond Journal of Law & Technology 2011
    - https://grossman.uwaterloo.ca/grossman-publications/jolt-2011/

24. Gordon V. Cormack, Maura R. Grossman — `Autonomy and Reliability of Continuous Active Learning for Technology-Assisted Review`
    - 2015
    - https://arxiv.org/abs/1504.06868

25. Gordon V. Cormack et al. — `Unbiased Validation of Technology-Assisted Review for eDiscovery`
    - SIGIR 2024
    - https://doi.org/10.1145/3626772.3657903

26. Max W. Callaghan, Finn Müller-Hansen — `Statistical stopping criteria for automated screening in systematic reviews`
    - Systematic Reviews 2020
    - https://doi.org/10.1186/s13643-020-01521-4

27. Josien Boetje, Rens van de Schoot — `The SAFE procedure: a practical stopping heuristic for active learning-based screening in systematic reviews and meta-analyses`
    - Systematic Reviews 2024
    - https://doi.org/10.1186/s13643-024-02502-7

28. `Computer-assisted screening in systematic evidence synthesis requires robust and well-evaluated stopping criteria`
    - 2024
    - https://pmc.ncbi.nlm.nih.gov/articles/PMC11583672/

29. `Optimising screening efficiency in evidence synthesis on health Technology: A simulation study using ASReview`
    - International Journal of Medical Informatics 2026
    - https://doi.org/10.1016/j.ijmedinf.2026.106516

---

# 43. Research gaps deliberately left open

The following adjacent questions remain open:

- direct benchmark of **Rule-level recall** for `web-project-guide`-like routing,
- atomic Rule / obligation extraction from prose Owner Docs,
- whether applicability metadata can be authored reliably enough to act as a second retrieval universe,
- hybrid deterministic + semantic Rule retrieval,
- cross-retriever correlation and effective independence,
- exact sparse+dense fusion strategy for Rule IDs + semantic triggers,
- graph schema for owner / gate / exception / override / supersession,
- automated detection of graph edge drift after Rule edits,
- whether hierarchical summaries omit rare exceptions in Rule documents,
- summary-to-source traceability receipts,
- direct comparison of Router-only vs RAG vs graph vs agentic file search on repository development tasks,
- retrieval under nested `AGENTS.md` / monorepo scope,
- retrieval after context compaction,
- rule retrieval when a task touches multiple repositories,
- current-vs-historical Rule retrieval under branch changes,
- malicious repository text competing with canonical Guide Rules,
- confidence calibration for `no more Rules are applicable`,
- statistical applicability-recall estimation for finite Rule catalogs,
- negative-tail sampling adapted to Rules rather than documents,
- rare high-severity Rule oversampling,
- adversarial paraphrase / synonym mutation benchmarks,
- routing mutation testing,
- independent expert applicability labels and inter-rater disagreement,
- treatment of genuinely ambiguous applicability,
- `UNRESOLVED / POSSIBLY INCOMPLETE` retrieval states,
- cost-aware recall targets by severity,
- whether deterministic full-catalog scanning is cheaper / safer than semantic retrieval for the current Guide size,
- memory freshness / invalidation after Rule edits,
- Rule retrieval receipts tied to exact blob / Guide version,
- proving that a retrieved Rule was actually used in action,
- coupling retrieval with deterministic Rule→Verifier coverage,
- combining retrieval evidence with assurance cases,
- final architecture / adoption.

---

# 44. Current research stopping point

For this theme, the current evidence is sufficient to preserve the following conclusions without moving into adoption:

1. retrieval / memory reliability is a pipeline involving indexing, retrieval, reading, application, and validation rather than one capability;
2. retrieval precision and retrieval recall are distinct, and omission-sensitive Rule systems care strongly about the latter;
3. live recall is difficult to prove because the complete applicable set is generally unknown;
4. even expert-created ground-truth applicability sets can contain omissions;
5. sparse lexical and dense semantic retrievers provide complementary signals;
6. low lexical overlap can make long-context retrieval substantially harder;
7. indiscriminately retrieving more context can harm downstream generation / adherence;
8. active / iterative retrieval can outperform one-shot retrieval in some long-form settings and provides a research analogue for dynamic re-routing;
9. uncertainty-triggered retrieval is promising but inherits calibration / self-knowledge limits;
10. retrieval-strategy choice depends on both the query and corpus characteristics; no single RAG paradigm is universally optimal in current benchmark evidence;
11. hierarchical retrieval can support both global and local document understanding;
12. graph / event / temporal structures can represent relationships and version constraints that flat similarity may miss;
13. compliance-specific research directly combines semantic retrieval with structured regulatory representations;
14. semantic relevance and authority / currentness / version are separate retrieval dimensions;
15. imperfect, conflicting, or malicious retrieval can actively reduce downstream reliability;
16. correct retrieved evidence does not prevent unsupported final claims;
17. modern agentic policy benchmarks show that an agent can retrieve all facts required for the correct decision and still violate the policy;
18. structured external memory can use typed knowledge pools, file-backed stores, manifests, and active evidence gathering rather than only flat vector retrieval;
19. memory recall performance alone does not establish that memory improves future agent actions;
20. mature high-recall fields use iterative search, independent validation, recall estimation, and explicit stopping criteria rather than trusting a plausible result list;
21. sampling the non-retrieved tail is an established way to estimate whether relevant items remain when exhaustive labeling is unavailable;
22. fixed stopping thresholds can fail on low-prevalence relevant classes;
23. independent validation is important because a retrieval system cannot reliably validate its own recall using the same blind spot;
24. alternate retriever disagreement can be useful uncertainty evidence even though disagreement does not establish truth;
25. Rule retrieval may require relational closure over exceptions, dependencies, overrides, gates, and supersession after initial retrieval;
26. a global Router classification score cannot substitute for Rule-level / obligation-level coverage evaluation;
27. golden routing cases give regression protection for known cases but cannot prove exhaustive coverage of unseen tasks;
28. rare high-severity Rules can be hidden by strong average retrieval metrics;
29. source provenance and current revision identity are important because semantically correct stale Rules can still be wrong for the current task;
30. improving retrieval is only one barrier: downstream instruction adherence, deterministic validation, evidence receipts, and stale-evidence handling remain separate problems;
31. the next research topic should therefore not yet be final architecture selection; a natural separate question is **how to represent / extract atomic Rule obligations and applicability conditions in structured state without losing the meaning of the original prose**.

This is enough to stop this single theme without designing the final Guide architecture.

**No Common Rule, Router redesign, vector database, embedding model, graph store, retrieval algorithm, top-k, recall threshold, statistical stopping rule, active-retrieval trigger, Rule metadata schema, memory backend, or adoption decision is created by this file.**