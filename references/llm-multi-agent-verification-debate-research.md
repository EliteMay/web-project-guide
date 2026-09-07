# LLM Multi-Agent Verification / Debate Research

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
- This file is **non-normative research evidence**.
- Adoption status for all mechanisms below: **not decided**, unless explicitly stated otherwise.
- Research is high-recall first. Findings are preserved even when they require multiple model providers, expensive parallel inference, model internals, external tools, full execution traces, specialized orchestration, human escalation, or capabilities unavailable to the current project.

## Research Question

Does using multiple LLM agents for independent review, critique, debate, voting, role-specialized verification, or collaborative adjudication actually reduce omissions and errors compared with a strong single-agent workflow?

The project-relevant reliability question is not simply:

```text
more agents
→ more reliable
```

A more realistic chain is:

```text
artifact / answer / plan exists
→ multiple agents inspect or reason about it
→ agents must contribute genuinely different evidence / hypotheses / checks
→ interaction protocol must preserve correct minority information
→ aggregation must select or synthesize correctly
→ final output must remain consistent with original obligations
→ failures must be attributable and observable
```

Any stage can fail.

This pass focuses on:

- multi-agent debate (MAD),
- independent parallel reviewers / ensembles,
- heterogeneous vs homogeneous agents,
- role specialization,
- majority vote / consensus / judge aggregation,
- conformity / sycophancy / groupthink,
- correct-minority suppression,
- communication topology,
- number of agents / debate rounds / compute scaling,
- selective escalation,
- multi-agent code-review evidence,
- trace observability and failure attribution,
- negative results and security failure modes.

This pass does **not** yet complete the separate research topics of:

- deterministic / symbolic verification,
- tool-assisted verification in general,
- evidence receipts / proof-of-checking,
- retrieval / routing and external memory,
- stale repository rules / versioning,
- repository-level coding-agent instruction adherence,
- final `web-project-guide` architecture or adoption.

---

# 1. “Multi-agent verification” is not one mechanism

## Evidence / observed practice

The literature uses several materially different architectures under multi-agent terminology.

### A. Independent parallel sampling / ensemble

Several agents solve or review independently, then a separate aggregation method chooses among outputs.

```text
Agent A ─┐
Agent B ─┼→ vote / rank / judge
Agent C ─┘
```

### B. Multi-round debate

Agents see one another's arguments, update their answers, and continue for one or more rounds.

```text
independent answers
→ exchange arguments
→ update
→ exchange again
→ aggregate
```

### C. Heterogeneous round-table collaboration

Different model families / domain models are deliberately combined to exploit complementary capabilities.

Example: ReConcile.

### D. Role-specialized review

Agents receive different responsibilities such as generator, critic, auditor, vulnerability reviewer, style reviewer, QA checker, or final supervisor.

Example: CodeAgent.

### E. Jury / judge systems

Multiple evaluators score or compare candidate outputs, with an aggregation or meta-judge layer.

This overlaps with `llm-independent-verifier-judge-research.md` but becomes a multi-agent coordination question once judges interact or are aggregated.

### F. Selective / cascaded multi-agent escalation

A single agent handles easy cases; a router invokes multi-agent deliberation only when uncertainty or difficulty crosses a threshold.

Example: CascadeDebate.

## Knowledge captured

A statement such as:

> “We use three reviewers.”

is underspecified.

Reliability can differ dramatically depending on:

- whether reviewers are independent before seeing others,
- whether they share the same model family,
- whether they share context / prompt / tools,
- whether they debate or only vote,
- whether one agent has a supervisory role,
- whether aggregation is majority, unanimity, confidence-weighted, trajectory-scored, or judge-selected,
- whether an external oracle is available.

**Adoption status:** not decided.

---

# 2. Strong positive evidence exists: multi-agent debate can improve reasoning and factuality

## Evidence / observed practice

Du et al., published at ICML 2024, use multiple model instances that independently propose answers, exchange reasoning over multiple rounds, and converge on a final answer.

The paper reports significant gains in mathematical / strategic reasoning and improved factual validity compared with the evaluated baselines.

Source:

- Du et al., `Improving Factuality and Reasoning in Language Models through Multiagent Debate`, ICML 2024
  - https://proceedings.mlr.press/v235/du24e.html

## Knowledge captured

Multi-agent interaction is not universally useless. Multiple independently initialized reasoning paths can expose alternatives that one trajectory may miss.

However, this is evidence about **task accuracy / factuality**, not direct proof that MAD is a high-assurance rule-compliance verifier.

A reasoning benchmark can improve even if the architecture remains vulnerable to correlated omissions, hierarchy failures, or untested software constraints.

**Adoption status:** not decided.

---

# 3. Diverse-model round tables can outperform both single-agent and earlier multi-agent baselines

## Evidence / observed practice

ReConcile, ACL 2024, organizes a round-table discussion among diverse LLM agents. Its mechanism includes:

- multiple model agents,
- multiple rounds,
- grouped answers and explanations,
- confidence scores,
- demonstrations of answer-rectifying human explanations,
- confidence-weighted voting.

Across seven benchmarks, the paper reports improvements of up to 11.4% over prior single- and multi-agent baselines and reports outperforming GPT-4 on three datasets. It also reports an 8% MATH improvement from flexibly combining API-based, open-source, and domain-specific models.

Source:

- Chen et al., `ReConcile: Round-Table Conference Improves Reasoning via Consensus among Diverse LLMs`, ACL 2024
  - https://aclanthology.org/2024.acl-long.381/

## Knowledge captured

One plausible benefit of multi-agent systems is access to **complementary error distributions** rather than merely repeating one model several times.

Potential diversity dimensions observed across the literature include:

- model family,
- model size,
- training / alignment history,
- prompt,
- role,
- tool access,
- retrieved evidence,
- domain specialization,
- decoding / reasoning strategy.

The value of each type of diversity is not uniform and remains task-dependent.

**Adoption status:** not decided.

---

# 4. Important negative result: multi-agent debate is not reliably better than strong simpler baselines

## Evidence / observed practice

Smit et al., ICML 2024, benchmark multiple MAD protocols against alternative prompting / inference strategies.

They report that multi-agent debate systems in their tested forms **do not reliably outperform** approaches such as:

- self-consistency,
- ensembles of multiple reasoning paths.

After hyperparameter tuning, some MAD configurations such as Multi-Persona can outperform the alternatives, but the paper emphasizes sensitivity to protocol settings and optimization difficulty.

Source:

- Smit et al., `Should we be going MAD? A Look at Multi-Agent Debate Strategies for LLMs`, ICML 2024
  - https://proceedings.mlr.press/v235/smit24a.html

## Knowledge captured

The performance gain sometimes attributed to “agents debating” can instead come from:

- extra inference compute,
- multiple independent samples,
- better prompting,
- tuned aggregation,
- persona / role changes.

Therefore a valid comparison should control compute and compare against strong single-agent / ensemble baselines.

A three-agent system that beats one cheap one-shot call is not enough evidence that the **interaction** itself added reliability.

**Adoption status:** not decided.

---

# 5. ACL 2024 negative evidence: strong prompting can nearly match the best discussion method

## Evidence / observed practice

`Rethinking the Bounds of LLM Reasoning: Are Multi-Agent Discussions the Key?`, ACL 2024, systematically reevaluates multi-agent discussion.

The authors report that a strong single-agent prompt achieves almost the same best performance as the best evaluated multi-agent discussion method across a range of reasoning tasks and backbone models.

They further report that multi-agent discussion outperforms the single-agent comparison mainly when there is no demonstration in the prompt.

Source:

- Wang et al., ACL 2024
  - https://aclanthology.org/2024.acl-long.331/

## Knowledge captured

Multi-agent benefit can be conditional on how strong the single-agent baseline already is.

This matters for future Guide experiments because comparing against a weak baseline can exaggerate the value of additional agents.

**Adoption status:** not decided.

---

# 6. 2026 theory + experiments: homogeneous vanilla debate can preserve expected correctness rather than improve it

## Evidence / observed practice

`Demystifying Multi-Agent Debate: The Role of Confidence and Diversity`, Findings ACL 2026, starts from the observation that vanilla MAD often underperforms simple majority vote despite using more compute.

The work analyzes homogeneous agents under uniform belief updates and argues that such debate preserves expected correctness rather than reliably pushing the group toward truth.

The authors identify two missing mechanisms:

1. diversity of initial viewpoints,
2. explicit calibrated confidence communication.

Their diversity-aware initialization and confidence-modulated updates outperform vanilla MAD and majority vote across six reasoning-oriented QA benchmarks.

Source:

- Zhu et al., Findings ACL 2026
  - https://aclanthology.org/2026.findings-acl.1694/

## Knowledge captured

Interaction alone does not create new independent evidence.

If all agents begin from highly correlated hypotheses and update symmetrically, conversation can merely reshuffle the same information.

Potential reliability gain therefore depends on whether the system introduces:

- new hypotheses,
- complementary evidence,
- meaningfully different blind spots,
- calibrated uncertainty,
- asymmetry that lets stronger evidence dominate rather than social majority alone.

**Adoption status:** not decided.

---

# 7. Agent count is not the same as effective independent channel count

## Emerging evidence

`Understanding Agent Scaling in LLM-Based Multi-Agent Systems via Diversity` (2026 preprint) studies scaling the number of agents.

The authors report strong diminishing returns for homogeneous agents and substantially larger gains from heterogeneous configurations. Their empirical result includes cases where two diverse agents match or exceed sixteen homogeneous agents.

Source:

- Yang et al., 2026 preprint
  - https://arxiv.org/abs/2602.03794

## Evidence status / limitation

This is a recent preprint, not treated here as a universal law.

Its main conceptual value is the distinction between:

```text
nominal agent count
```

and

```text
effective independent information channels
```

## Knowledge captured

This aligns with the prior independent-judge research: duplicated agents can share correlated errors.

A future multi-agent assurance system should not assume:

```text
3 agents = 3 independent checks
```

without evidence about correlation / diversity.

**Adoption status:** not decided.

---

# 8. Group conformity is empirically observed in multi-agent LLM interactions

## Evidence / observed practice

Choi et al., Findings ACL 2025, simulate more than 2,500 debates over five socially contentious topics.

Initially neutral agents shift their views during interaction. The study reports significant conformity effects:

- numerically dominant groups exert more influence,
- more capable / intelligent agents exert greater influence,
- agents converge in ways resembling human group-conformity behavior.

Source:

- Choi et al., `An Empirical Study of Group Conformity in Multi-Agent Systems`, Findings ACL 2025
  - https://aclanthology.org/2025.findings-acl.265/

## Knowledge captured

Debate destroys some of the independence present at initialization.

```text
independent initial opinions
→ repeated exposure to peers
→ convergence / conformity
→ effective diversity shrinks
```

Consensus is therefore not automatically evidence that independent reviewers arrived at the same conclusion independently.

**Adoption status:** not decided.

---

# 9. Sycophancy creates “mutual approval” rather than critical review

## Evidence / observed practice

CONSENSAGENT, Findings ACL 2025, studies sycophancy in multi-agent reasoning systems: agents reinforce one another's responses rather than critically challenging them.

The paper evaluates six reasoning benchmarks across three models and identifies sycophancy as a reliability and cost problem.

Its prompt-optimization framework reduces sycophancy by reported amounts in the 7–30% range and reaches consensus more quickly. The paper reports roughly 90% of debates reaching consensus after three rounds versus less than 70% for the baseline in the cited analysis.

Sources:

- Pitre et al., `CONSENSAGENT: Towards Efficient and Effective Consensus in Multi-Agent LLM Interactions Through Sycophancy Mitigation`, Findings ACL 2025
  - https://aclanthology.org/2025.findings-acl.1141/

## Knowledge captured

A reviewer role label does not guarantee adversarial / critical behavior.

Agents can respond to one another socially:

```text
Reviewer A proposes conclusion
→ Reviewer B agrees / embellishes
→ Reviewer C treats agreement as evidence
→ apparent consensus grows
```

without a new external correctness signal.

**Adoption status:** not decided.

---

# 10. Correct agents can be converted into incorrect agents during debate

## Evidence / observed practice

Free-MAD, Findings ACL 2026, explicitly identifies a failure mode of conventional consensus-based MAD:

- agents that initially produce correct answers can be influenced by incorrect peers,
- error propagates through conformity,
- majority voting can degrade reasoning performance.

The authors respond with:

- anti-conformity mechanisms,
- single-round debate,
- a score-based decision mechanism using the entire debate trajectory instead of only the last-round majority.

Across eight benchmark datasets, the paper reports improved reasoning and lower token cost relative to existing MAD approaches in its experiments.

Source:

- Cui et al., `Free-MAD: Consensus-Free Multi-Agent Debate`, Findings ACL 2026
  - https://aclanthology.org/2026.findings-acl.1600/

## Knowledge captured

Communication can create a new failure that did not exist in independent voting:

```text
correct minority exists initially
→ sees confident wrong majority
→ changes to wrong answer
→ final vote loses recoverable correct evidence
```

Therefore preserving initial independent judgments may have forensic / assurance value even if later debate is used.

**Adoption status:** not decided.

---

# 11. Recent emerging evidence: the minority is sometimes right often enough to matter

## Emerging evidence

`Minority Sentinel` (June 2026 preprint) studies debates among three heterogeneous LLM agents on six benchmarks.

The authors report that among divergent cases, roughly one quarter have the minority holding the correct answer, corresponding to an approximately ten-percentage-point theoretical recovery margin in their setup.

They train a non-LLM LightGBM meta-classifier on debate-log features to decide when to overturn majority voting. The paper reports 81.2% flip precision and positive net gain across six datasets / 20 random seeds, while an LLM-as-Judge baseline has negative net gain despite higher recall.

Source:

- He et al., `Minority Sentinel: When to Overturn Majority Voting in Multi-Agent LLM Debates`, 2026 preprint
  - https://arxiv.org/abs/2606.29270

## Evidence status / limitation

This is a recent preprint and should not define a universal minority-correction rate.

## Knowledge captured

Majority vote is only theoretically attractive under assumptions such as sufficiently independent voters with better-than-random individual accuracy.

Correlated LLM errors weaken those assumptions.

A future system might need to retain signals such as:

- who changed their answer,
- original vs final votes,
- confidence trajectory,
- disagreement type,
- evidence each agent used,
- whether one answer was independently machine-verified.

**Adoption status:** not decided.

---

# 12. Decision protocol itself materially changes performance

## Evidence / observed practice

Kaesberg et al., Findings ACL 2025, systematically compare seven decision protocols while holding other debate variables fixed.

The paper reports that the best protocol depends on task type:

- voting protocols improve reasoning-task performance by 13.2% relative to the compared decision protocols in the reported analysis,
- consensus protocols improve knowledge-task performance by 2.8% relative to alternatives.

Source:

- `Voting or Consensus? Decision-Making in Multi-Agent Debate`, Findings ACL 2025
  - https://aclanthology.org/2025.findings-acl.606/

## Knowledge captured

The aggregator is part of the assurance system, not a neutral implementation detail.

Potential aggregation strategies include:

- majority,
- plurality,
- unanimity,
- confidence-weighted vote,
- score-based trajectory evaluation,
- independent judge,
- robust statistical aggregation,
- minority-overturn logic,
- abstention / escalation.

No single choice is demonstrated to dominate every task class.

**Adoption status:** not decided.

---

# 13. Diverse agents help in some studies, but diversity benefit itself is not universal

## Evidence / observed practice

Positive evidence:

- ReConcile reports gains from combining API-based, open-source, and domain-specific models.
- 2026 `Demystifying MAD` shows diversity-aware initialization improves results across six QA benchmarks.
- some preprints report heterogeneous scaling outperforming homogeneous agent scaling.

Contrasting evidence:

`Revisiting Multi-Agent Debate as Test-Time Scaling` (2025 preprint / ICLR-2026 review version) reports:

- for mathematical reasoning, MAD has limited advantage over strong self-agent scaling,
- benefit increases when problems are harder and models are weaker,
- agent diversity provides little benefit in that mathematical setting,
- on safety tasks, collaborative refinement can increase vulnerability,
- heterogeneous configurations can reduce attack success over the refinement process.

Source:

- https://arxiv.org/abs/2505.22960

## Knowledge captured

“Use different models” is not enough as a universal design rule.

Diversity is valuable when it yields complementary useful evidence, not merely different brand names.

Potential diversity can be helpful, neutral, or harmful depending on:

- task,
- model competence,
- information access,
- safety behavior,
- aggregation,
- interaction dynamics.

**Adoption status:** not decided.

---

# 14. Debate can amplify security vulnerabilities instead of reducing them

## Emerging / negative evidence

`Amplified Vulnerabilities: Structured Jailbreak Attacks on LLM-based Multi-Agent Debate` (2025 preprint) evaluates four MAD frameworks built on commercial LLMs.

The authors report MAD systems to be more vulnerable than corresponding single-agent setups under their structured attacks. Their attack methodology increases reported average harmfulness from 28.14% to 80.34%, with attack success reaching 80% in some evaluated scenarios.

Source:

- Qi et al., 2025 preprint
  - https://arxiv.org/abs/2504.16489

## Evidence status / limitation

This is preprint evidence and attack setup matters substantially.

## Knowledge captured

Multi-agent architectures increase the number of:

- prompts,
- communication edges,
- role instructions,
- intermediate outputs,
- aggregation steps,
- trust boundaries.

Each can become another attack / contamination surface.

Security does not automatically improve because another agent is watching.

**Adoption status:** not decided.

---

# 15. More communication is not monotonically better

## Evidence / observed practice

Li et al., Findings EMNLP 2024, systematically study communication topology in MAD.

They find sparse communication topologies can achieve comparable or superior performance to fully connected communication while substantially reducing computational cost.

Source:

- Li et al., `Improving Multi-Agent Debate with Sparse Communication Topology`, Findings EMNLP 2024
  - https://aclanthology.org/2024.findings-emnlp.427/

Free-MAD 2026 similarly argues repeated communication creates token cost and conformity risk and demonstrates a single-round alternative.

## Knowledge captured

Full all-to-all discussion maximizes information sharing but also maximizes:

- token cost,
- correlated context,
- social influence,
- propagation of incorrect reasoning,
- attack propagation surface.

Sparse / staged communication can preserve more independence while still allowing targeted challenge.

**Adoption status:** not decided.

---

# 16. Multi-agent architecture topology affects outcomes

## Evidence / observed practice

MultiAgentBench, ACL 2025, evaluates collaboration and competition across multiple interactive scenarios and compares:

- star,
- chain,
- tree,
- graph

coordination protocols, alongside discussion / cognitive planning strategies.

The paper reports graph topology as best among tested coordination protocols in its research scenario and a 3% milestone-achievement improvement from cognitive planning.

Source:

- Zhu et al., `MultiAgentBench: Evaluating the Collaboration and Competition of LLM agents`, ACL 2025
  - https://aclanthology.org/2025.acl-long.421/

## Knowledge captured

“Multi-agent” should not be evaluated without specifying message topology and state ownership.

Architectural choices determine:

- who can influence whom,
- whether a failure is contained or propagated,
- whether a reviewer sees raw evidence or another agent's summary,
- whether one agent becomes a single point of failure,
- whether global state becomes stale / inconsistent.

**Adoption status:** not decided.

---

# 17. Cost / latency scaling is a first-class reliability constraint

## Evidence / observed practice

MAD commonly multiplies inference cost by both:

- number of agents,
- number of sequential debate rounds.

S2-MAD, NAACL 2025, explicitly identifies token cost as a scaling barrier and proposes sparsification.

A 2026 ACL Student Research Workshop study compares self-consistency, self-refinement, MAD, and mixture-of-agents across 34 configurations / more than 100 evaluations. It reports gains up to +7.1 percentage points over CoT at the highest tested budget, which is 20× the CoT compute budget on MMLU-Pro. At equal budgets, debate and mixture-of-agents outperform self-consistency by 1.3 and 2.7 points respectively in the reported analysis.

Sources:

- Zeng et al., `S2-MAD: Breaking the Token Barrier to Enhance Multi-Agent Debate Efficiency`, NAACL 2025
  - https://aclanthology.org/2025.naacl-long.475/
- Wunderlich et al., `Multi-Agent Reasoning Improves Compute Efficiency: Pareto-Optimal Test-Time Scaling`, ACL SRW 2026
  - https://aclanthology.org/2026.acl-srw.1/

## Knowledge captured

Reliability gain must be compared at a controlled compute budget.

An architecture that reduces misses by 1% while multiplying cost / latency by 20 may still be useful for a critical gate, but it is a different design choice from a default review path.

Research should preserve both:

- absolute quality,
- quality per cost / latency.

**Adoption status:** not decided.

---

# 18. Selective multi-agent escalation can dominate always-on multi-agent use

## Evidence / observed practice

CascadeDebate, ACL Industry 2026, inserts multi-agent deliberation only at uncertainty-driven escalation boundaries in a cascade of model tiers and human experts.

Its architecture alternates:

```text
single-model attempt
→ confidence / uncertainty routing
→ lightweight multi-agent deliberation only if needed
→ larger model / human expert fallback if unresolved
```

Across five science / medicine / general-knowledge benchmarks, the paper reports improvements of up to 26.75% over strong single-model cascades and standalone multi-agent systems in its evaluated configurations.

Source:

- Chang et al., `CascadeDebate: Multi-Agent Deliberation for Cost-Aware LLM Cascades`, ACL Industry 2026
  - https://aclanthology.org/2026.acl-industry.93/

## Knowledge captured

Multi-agent review does not have to be an all-or-nothing system-wide default.

An alternative reliability pattern is:

```text
cheap deterministic / single-agent path
→ uncertainty or disagreement trigger
→ stronger multi-agent review
→ human / stronger oracle escalation
```

No such trigger scheme is adopted here.

**Adoption status:** not decided.

---

# 19. Role-specialized multi-agent code review has direct software-engineering evidence

## Evidence / observed practice

CodeAgent, EMNLP 2024, is a multi-agent code-review system rather than a general QA debate.

It includes multiple communicative agents and a supervisory `QA-Checker` whose role is to ensure agent contributions address the original review question.

The evaluation covers:

1. inconsistency between code changes and commit messages,
2. introduced vulnerabilities,
3. code-style adherence,
4. code-revision suggestion.

The paper reports state-of-the-art results for its evaluated code-review tasks.

Source:

- Tang et al., `CodeAgent: Autonomous Communicative Agents for Code Review`, EMNLP 2024
  - https://aclanthology.org/2024.emnlp-main.632/

## Knowledge captured

Role specialization is a different hypothesis from debate.

```text
one general reviewer asked to check everything
```

versus

```text
security reviewer
+ consistency reviewer
+ style reviewer
+ revision agent
+ QA supervisor
```

may change which defects are surfaced because each role receives a narrower obligation set.

However, a specialized agent can still share the same underlying model blind spots, and supervisor failure can become a single point of false assurance.

**Adoption status:** not decided.

---

# 20. Multi-agent failure diagnosis requires full traces, not only final outputs

## Evidence / observed practice

TraceElephant (`Seeing the Whole Elephant`, ACL 2026) studies failure attribution in LLM multi-agent systems.

The benchmark includes reproducible environments and full execution traces rather than only visible agent outputs.

The paper reports that full traces improve failure-attribution accuracy by up to 76.5% over a partial-observation counterpart.

Source:

- Chen et al., `Seeing the Whole Elephant: A Benchmark for Failure Attribution in LLM-based Multi-Agent Systems`, ACL 2026
  - https://aclanthology.org/2026.acl-long.912/

## Knowledge captured

Adding agents increases causal complexity.

When a final answer is wrong, the cause could be:

- wrong initial proposal,
- reviewer missed defect,
- correct reviewer was ignored,
- communication lost context,
- aggregator chose wrong candidate,
- later agent overwrote correct state,
- tool result was misinterpreted,
- stale intermediate state propagated.

Without complete execution evidence, failures can be impossible to assign correctly.

Possible future observability fields suggested by the research include:

- agent inputs,
- retrieved evidence,
- initial independent verdicts,
- confidence,
- messages / challenges,
- state transitions,
- vote changes,
- aggregator reasoning / score,
- final decision,
- tool / test evidence.

No trace schema is adopted here.

**Adoption status:** not decided.

---

# 21. Intermediate reasoning quality and final correctness can diverge

## Evidence / observed practice

`The Confident Liar`, ACL SRW 2026, studies a Constructor/Auditor debate system and compares:

- token-level confidence,
- LLM-judge reasoning scores,
- final task correctness.

The paper reports asymmetric relationships between confidence and judged quality across the Constructor and Auditor roles, with critical-failure detection substantially stronger for the Constructor than the Auditor in one studied domain.

Source:

- Keramati et al., ACL SRW 2026
  - https://aclanthology.org/2026.acl-srw.121/

## Knowledge captured

A debate transcript that looks sophisticated is not proof the final result is correct.

Likewise:

```text
high-confidence reviewer
```

and

```text
reviewer with correct defect detection
```

are different states.

This reinforces the need to evaluate both process signals and objective outcomes where possible.

**Adoption status:** not decided.

---

# 22. Consensus is not equivalent to verification

## Evidence synthesis

Across the current literature:

- conformity makes agents align with majority / capable peers,
- sycophancy makes agents reinforce one another,
- correct minority answers can be suppressed,
- vanilla homogeneous debate may not shift expected correctness,
- majority voting can be inferior to other aggregation schemes,
- consensus protocol effectiveness changes by task,
- multiple rounds can add cost without adding independent evidence.

## Knowledge captured

The following states must be distinguished:

```text
all agents independently found the same evidence
```

```text
agents began differently, then debate convinced them using valid evidence
```

```text
agents converged because they copied / deferred to one another
```

```text
aggregator forced a single answer despite unresolved disagreement
```

Only the first two have a plausible interpretation as stronger evidence, and even then correctness is not guaranteed.

**Adoption status:** not decided.

---

# 23. Disagreement is potentially useful evidence, not only a failure to reach consensus

## Evidence synthesis

Several mechanisms explicitly preserve or exploit disagreement:

- ReConcile uses confidence-weighted diverse discussion,
- Free-MAD removes mandatory consensus and uses full-trajectory scoring,
- Minority Sentinel treats correct minority hypotheses as recoverable evidence,
- CascadeDebate uses uncertainty / unresolved cases as escalation signals,
- recent diversity-focused MAD work deliberately increases initial answer diversity.

## Knowledge captured

A system that optimizes only for rapid consensus can destroy useful warning signals.

Potential future states include:

```text
PASS consensus
FAIL consensus
structured disagreement
unresolved / escalate
```

rather than forcing every review into one Boolean output.

**Adoption status:** not decided.

---

# 24. Independence can be reduced by shared source material even across different agents

## Evidence synthesis

Prior `llm-independent-verifier-judge-research.md` documents strongly correlated errors in judge panels.

Multi-agent debate research adds another correlation path: agents may not only share pretraining / model priors, but also **actively exchange their reasoning**, reducing independence further.

## Knowledge captured

Independence has several layers:

- model independence,
- context independence,
- prompt independence,
- retrieval-source independence,
- tool / oracle independence,
- reasoning-trajectory independence,
- organizational role independence.

Two different model families reading the same incorrect summary are not independent evidence sources.

Three same-family agents independently running different tests may sometimes have more evidence diversity than three branded models sharing one stale narrative.

No independence score is adopted yet.

---

# 25. A multi-agent system can create new single points of failure

## Evidence synthesis

Common architecture patterns introduce privileged nodes:

- final judge,
- supervisor,
- orchestrator,
- router,
- shared memory,
- summary agent,
- aggregator.

If every specialist's output is filtered through one fallible supervisor, the effective system can still collapse to that supervisor's blind spots.

CodeAgent's QA-Checker is an example of an explicit supervisory role; many MAD systems similarly delegate the final result to a judge or aggregation protocol.

## Knowledge captured

Role separation can improve coverage while simultaneously creating centralized failure risk.

Future assurance research may need to distinguish:

```text
many agents generated evidence
```

from

```text
one aggregator correctly preserved that evidence
```

**Adoption status:** not decided.

---

# 26. Multi-agent systems need both outcome evaluation and coordination evaluation

## Evidence / observed practice

MultiAgentBench explicitly evaluates not only final task completion but collaboration / competition milestones.

TraceElephant separately evaluates failure attribution.

This reflects a broader need to inspect the internal coordination process rather than treating the system as a black-box final-answer generator.

## Knowledge captured

Potential future measurements include:

- final correctness / compliance,
- initial coverage of correct hypotheses,
- independent defect-detection rate,
- correct-minority preservation,
- false-consensus rate,
- agent answer-change matrix,
- challenge / critique quality,
- evidence diversity,
- aggregation error,
- token / latency cost,
- escalation frequency,
- failure-attribution accuracy.

No metric set is adopted here.

---

# 27. Current failure taxonomy for multi-agent verification

## A. Homogeneous correlated error

```text
same model / same prompt / same evidence
→ multiple agents repeat same blind spot
```

Evidence:

- 2026 diversity / scaling work,
- prior judge-panel correlation research.

## B. Conformity / groupthink

```text
correct independent answer
→ sees wrong majority
→ switches to wrong answer
```

Evidence:

- Group Conformity 2025,
- Free-MAD 2026.

## C. Sycophancy / mutual reinforcement

```text
agent proposes claim
→ peers approve instead of challenge
→ consensus appears stronger without new evidence
```

Evidence:

- CONSENSAGENT.

## D. Majority suppression of correct minority

```text
minority holds correct answer
→ majority vote discards it
```

Evidence:

- Free-MAD,
- Minority Sentinel emerging evidence.

## E. Aggregation failure

```text
useful agent evidence exists
→ final judge / vote / supervisor selects wrong result
```

Evidence:

- voting-vs-consensus results,
- prior judge-reliability research.

## F. Debate-induced regression

```text
correct initial state
→ interaction
→ incorrect final state
```

Evidence:

- Free-MAD,
- conformity research.

## G. Communication propagation failure

```text
one bad premise enters shared conversation
→ multiple agents condition on it
→ error spreads
```

Evidence:

- conformity / sycophancy / security-attack evidence.

## H. Overcommunication / cost saturation

```text
more rounds / edges
→ more tokens + latency
→ limited gain / greater contamination risk
```

Evidence:

- S2-MAD,
- sparse topology,
- Free-MAD,
- compute-scaling studies.

## I. Topology mismatch

```text
wrong communication graph for task
→ relevant information does not reach correct agent or wrong information dominates
```

Evidence:

- MultiAgentBench,
- sparse communication research.

## J. Role-specialization blind spot

```text
issue falls between assigned reviewer scopes
→ each specialist assumes someone else covers it
```

Direct generalizable quantitative evidence remains limited; this is a plausible system-level risk that should be tested rather than assumed solved by roles.

## K. Supervisor / aggregator single-point failure

```text
specialists find issues
→ supervisor ignores / misclassifies them
```

Mechanistically present in supervised multi-agent architectures; dedicated quantitative study remains a research gap.

## L. Security amplification

```text
adversarial content enters one interaction edge
→ iterative dialogue amplifies / normalizes it
```

Evidence:

- structured MAD jailbreak preprint,
- safety-task conditional-effectiveness preprint.

## M. Observability / attribution failure

```text
final output wrong
→ incomplete trace
→ cannot identify responsible agent / step
```

Evidence:

- TraceElephant ACL 2026.

## N. False process confidence

```text
long debate + many agents + apparent consensus
→ humans infer strong assurance
→ underlying correctness signal remains weak
```

Evidence synthesis from negative MAD / conformity / judge work.

---

# 28. Possible mechanisms observed in research — not recommendations

Per the Research Capture Policy, mechanisms are preserved before feasibility / adoption filtering.

## Independent-generation layer

- keep first-pass opinions hidden from peers,
- collect initial verdicts before communication,
- retain original verdicts even after debate,
- generate heterogeneous hypotheses deliberately,
- vary model / prompt / role / tool / evidence source.

## Debate / challenge layer

- structured critic vs defender roles,
- explicit counterexample requests,
- confidence communication,
- require evidence for answer changes,
- anti-conformity prompts / mechanisms,
- one-round challenge rather than unconstrained repeated debate,
- preserve unresolved disagreement.

## Aggregation layer

- majority / plurality voting,
- unanimity,
- confidence-weighted aggregation,
- robust statistics,
- trajectory-based scoring,
- independent meta-judge,
- minority-overturn classifier,
- abstention / escalation,
- human fallback.

## Communication architecture

- all-to-all,
- star,
- chain,
- tree,
- graph,
- sparse topology,
- separate reviewer silos with late aggregation,
- selective information sharing.

## Role-specialized verification

- generator,
- requirements reviewer,
- security reviewer,
- test reviewer,
- code consistency reviewer,
- migration / data reviewer,
- final integration reviewer,
- evidence / trace auditor.

## Observability

- complete agent inputs,
- complete tool results,
- initial and revised verdicts,
- confidence / uncertainty,
- evidence IDs,
- message provenance,
- reason for answer change,
- aggregator decision record,
- full execution trace.

## Cost-aware orchestration

- invoke multi-agent only on high-risk / uncertain cases,
- adaptive stopping,
- sparse communication,
- small-model first tier,
- stronger model / human escalation,
- budget-aware debate.

All remain research mechanisms.

---

# 29. Negative results / cautions that should remain visible

1. **MAD does not reliably outperform strong self-consistency / ensemble baselines.**
   - ICML 2024 `Should we be going MAD?`

2. **Strong single-agent prompting can nearly match best discussion methods in some reasoning settings.**
   - ACL 2024 `Rethinking the Bounds`.

3. **Homogeneous vanilla debate may not improve expected correctness.**
   - Findings ACL 2026 `Demystifying MAD`.

4. **Correct agents can become wrong after seeing incorrect peers.**
   - Free-MAD / conformity evidence.

5. **Consensus can be produced by sycophancy rather than independent verification.**
   - CONSENSAGENT.

6. **Majority vote can suppress a correct minority.**
   - Free-MAD + Minority Sentinel emerging evidence.

7. **More agents do not imply proportionally more independent evidence.**
   - diversity / scaling + prior judge-correlation research.

8. **More debate rounds are not monotonically beneficial and can add token cost / conformity.**

9. **Decision protocol changes final quality substantially.**
   - Voting vs Consensus.

10. **Communication topology matters.**
    - sparse topology / MultiAgentBench.

11. **Multi-agent collaboration can increase safety vulnerability.**
    - safety-scaling / jailbreak preprints.

12. **A final judge / supervisor can remain a single point of failure.**

13. **A debate transcript can look rigorous while final correctness remains weak.**
    - intermediate-reasoning diagnostics.

14. **Multi-agent failure becomes harder to diagnose without complete traces.**
    - TraceElephant.

15. **Diversity is task-dependent and not universally beneficial.**

16. **Multi-agent quality claims must be compute-controlled.**

17. **Positive reasoning results do not automatically transfer to repository-rule compliance.**

---

# 30. Current working interpretations for `web-project-guide` — not adoption decisions

These hypotheses are retained for later synthesis only.

## H1. “Different Agent” should not automatically mean “independent barrier”

Independence depends on model, context, evidence, and communication, not UI labels or separate API calls.

## H2. Initial independent verdicts may be valuable evidence even if debate follows

Because debate can induce conformity, original opinions should potentially remain observable for later analysis.

## H3. Disagreement may be a useful escalation signal

Forcing consensus may erase evidence that a task is uncertain or underspecified.

## H4. Role specialization might reduce simultaneous-constraint load

A focused security reviewer and a focused storage reviewer may each carry fewer active obligations than one reviewer checking the whole Guide.

However, cross-domain interactions can then fall between roles, so integration review remains a separate problem.

## H5. Heterogeneous evidence may matter more than heterogeneous prose

Different agents sharing the same stale summary may remain highly correlated. Different agents checking different external evidence channels may be more useful.

## H6. Multi-agent verification probably needs an aggregation assurance layer

A correct finding is useless if the aggregator drops it.

## H7. Multi-agent assurance probably needs traceability

If a system cannot explain which agent checked which obligation and what evidence caused a verdict, additional agents can increase opacity rather than assurance.

## H8. Selective escalation may be more practical than always-on debate

The strongest cost-aware evidence suggests multi-agent compute can be reserved for uncertain / high-risk cases rather than invoked universally.

## H9. Majority agreement should not be treated as equivalent to independent corroboration

Shared model priors, conformity, sycophancy, and direct communication all weaken independence assumptions.

## H10. A future experiment should separate four conditions

Potential research-only comparison:

```text
A. one strong reviewer
B. N independent same-model reviewers, no communication
C. N heterogeneous independent reviewers, no communication
D. heterogeneous reviewers + structured challenge + external evidence
```

with equal / controlled compute where possible.

No experiment or architecture is adopted here.

---

# 31. Evidence map

| Claim | Main evidence | Evidence status | Current confidence | Important limitation |
|---|---|---|---|---|
| Multi-agent debate can improve reasoning / factuality | Du et al. | ICML 2024 peer-reviewed | High for evaluated tasks | task accuracy, not direct rule-assurance evaluation |
| Diverse round-table agents can yield substantial reasoning gains | ReConcile | ACL 2024 peer-reviewed | High for tested setup | protocol bundles diversity + confidence + demonstrations + voting |
| MAD is not reliably better than simpler compute-matched strategies | Should we be going MAD? | ICML 2024 peer-reviewed | High | protocol / hyperparameter dependent |
| Strong single-agent prompts can nearly match best discussion | Rethinking Bounds | ACL 2024 peer-reviewed | High for evaluated reasoning tasks | benchmark-specific |
| Homogeneous vanilla MAD can underperform majority vote / preserve expected correctness | Demystifying MAD | Findings ACL 2026 peer-reviewed | High for analyzed assumptions / tasks | theoretical model assumptions + QA benchmarks |
| Diversity + calibrated confidence can improve MAD | Demystifying MAD | Findings ACL 2026 peer-reviewed | High for tested setup | does not prove all diversity types help |
| Group conformity occurs in LLM multi-agent interactions | Choi et al. | Findings ACL 2025 peer-reviewed | High for studied debate setting | socially contentious topics, not code review |
| Sycophancy reduces MAD reliability / efficiency | CONSENSAGENT | Findings ACL 2025 peer-reviewed | High for six reasoning datasets | mitigation is prompt-framework specific |
| Correct answers can be lost through conformity; consensus-free trajectory scoring can help | Free-MAD | Findings ACL 2026 peer-reviewed | High for tested benchmarks | reasoning benchmarks; framework-specific |
| Correct minority can be systematically suppressed by majority | Minority Sentinel | 2026 preprint | Moderate emerging | recent, three-agent heterogeneous setup |
| Decision protocol materially affects task results | Voting or Consensus | Findings ACL 2025 peer-reviewed | High | exact best protocol depends on task distribution |
| Sparse communication can match / beat dense communication while reducing cost | Sparse Communication MAD | Findings EMNLP 2024 peer-reviewed | High for tested models/tasks | topology transfer to repository review untested |
| Coordination topology affects multi-agent performance | MultiAgentBench | ACL 2025 peer-reviewed | High | broad agent scenarios, not specifically verification |
| Cost can grow dramatically with MAD; multi-agent gains can persist at high budgets | ACL SRW 2026 compute-scaling study | peer-reviewed workshop | Moderate–High | two reasoning benchmarks |
| Selective debate at uncertainty boundaries can improve cost/quality tradeoff | CascadeDebate | ACL Industry 2026 peer-reviewed | High for tested cascade tasks | knowledge/medicine/science tasks |
| Role-specialized multi-agent code review can outperform prior automation | CodeAgent | EMNLP 2024 peer-reviewed | High for reported code-review tasks | architecture bundle; not repository Rule compliance |
| Full traces greatly improve multi-agent failure attribution | TraceElephant | ACL 2026 peer-reviewed | High | failure attribution benchmark, not prevention itself |
| Multi-agent systems can amplify jailbreak vulnerability | Amplified Vulnerabilities | 2025 preprint | Moderate emerging | adversarial setup / preprint |
| Homogeneous agent count has diminishing returns; heterogeneity can add effective channels | Agent Scaling via Diversity | 2026 preprint | Moderate emerging | recent information-theoretic framing |

---

# 32. Source register

## Foundational / positive MAD sources

1. Yilun Du et al. — `Improving Factuality and Reasoning in Language Models through Multiagent Debate`
   - ICML 2024
   - https://proceedings.mlr.press/v235/du24e.html

2. Justin Chen, Swarnadeep Saha, Mohit Bansal — `ReConcile: Round-Table Conference Improves Reasoning via Consensus among Diverse LLMs`
   - ACL 2024
   - https://aclanthology.org/2024.acl-long.381/

## Controlled / negative comparisons

3. Andries Petrus Smit et al. — `Should we be going MAD? A Look at Multi-Agent Debate Strategies for LLMs`
   - ICML 2024
   - https://proceedings.mlr.press/v235/smit24a.html

4. Qineng Wang et al. — `Rethinking the Bounds of LLM Reasoning: Are Multi-Agent Discussions the Key?`
   - ACL 2024
   - https://aclanthology.org/2024.acl-long.331/

5. Xiaochen Zhu et al. — `Demystifying Multi-Agent Debate: The Role of Confidence and Diversity`
   - Findings ACL 2026
   - https://aclanthology.org/2026.findings-acl.1694/

## Conformity / consensus / decision sources

6. Min Choi et al. — `An Empirical Study of Group Conformity in Multi-Agent Systems`
   - Findings ACL 2025
   - https://aclanthology.org/2025.findings-acl.265/

7. Priya Pitre et al. — `CONSENSAGENT: Towards Efficient and Effective Consensus in Multi-Agent LLM Interactions Through Sycophancy Mitigation`
   - Findings ACL 2025
   - https://aclanthology.org/2025.findings-acl.1141/

8. Yu Cui et al. — `Free-MAD: Consensus-Free Multi-Agent Debate`
   - Findings ACL 2026
   - https://aclanthology.org/2026.findings-acl.1600/

9. Lars Benedikt Kaesberg et al. — `Voting or Consensus? Decision-Making in Multi-Agent Debate`
   - Findings ACL 2025
   - https://aclanthology.org/2025.findings-acl.606/

10. Chuan He et al. — `Minority Sentinel: When to Overturn Majority Voting in Multi-Agent LLM Debates`
    - 2026 preprint
    - https://arxiv.org/abs/2606.29270

## Architecture / topology / cost sources

11. Yunxuan Li et al. — `Improving Multi-Agent Debate with Sparse Communication Topology`
    - Findings EMNLP 2024
    - https://aclanthology.org/2024.findings-emnlp.427/

12. Kunlun Zhu et al. — `MultiAgentBench: Evaluating the Collaboration and Competition of LLM agents`
    - ACL 2025
    - https://aclanthology.org/2025.acl-long.421/

13. Yuting Zeng et al. — `S2-MAD: Breaking the Token Barrier to Enhance Multi-Agent Debate Efficiency`
    - NAACL 2025
    - https://aclanthology.org/2025.naacl-long.475/

14. Florian Valentin Wunderlich et al. — `Multi-Agent Reasoning Improves Compute Efficiency: Pareto-Optimal Test-Time Scaling`
    - ACL SRW 2026
    - https://aclanthology.org/2026.acl-srw.1/

15. Raeyoung Chang et al. — `CascadeDebate: Multi-Agent Deliberation for Cost-Aware LLM Cascades`
    - ACL Industry 2026
    - https://aclanthology.org/2026.acl-industry.93/

## Software / verification-adjacent sources

16. Xunzhu Tang et al. — `CodeAgent: Autonomous Communicative Agents for Code Review`
    - EMNLP 2024
    - https://aclanthology.org/2024.emnlp-main.632/

17. Mengzhuo Chen et al. — `Seeing the Whole Elephant: A Benchmark for Failure Attribution in LLM-based Multi-Agent Systems`
    - ACL 2026
    - https://aclanthology.org/2026.acl-long.912/

18. Ali Keramati et al. — `The Confident Liar: Diagnosing Multi-Agent Debate with Log-Probabilities and LLM-as-Judge`
    - ACL SRW 2026
    - https://aclanthology.org/2026.acl-srw.121/

## Emerging scaling / safety sources

19. Yingxuan Yang et al. — `Understanding Agent Scaling in LLM-Based Multi-Agent Systems via Diversity`
    - 2026 preprint
    - https://arxiv.org/abs/2602.03794

20. Yongjin Yang et al. — `Revisiting Multi-Agent Debate as Test-Time Scaling: A Systematic Study of Conditional Effectiveness`
    - 2025 preprint / ICLR 2026 review version
    - https://arxiv.org/abs/2505.22960

21. Senmao Qi et al. — `Amplified Vulnerabilities: Structured Jailbreak Attacks on LLM-based Multi-Agent Debate`
    - 2025 preprint
    - https://arxiv.org/abs/2504.16489

---

# 33. Research gaps deliberately left open

The next adjacent questions remain open:

- **tool-assisted verification / deterministic validators**,
- whether external tests produce stronger diversity than additional LLM reviewers,
- SAT / SMT / formal verification integration with agent teams,
- same-family vs cross-family reviewer correlation under controlled equal-compute experiments,
- fresh-context same-model reviewers vs shared-context reviewers,
- role assignment strategies for development Rule universes,
- cross-domain interaction failures between specialist reviewers,
- reviewer coverage matrices,
- evidence requirements before an agent may change its verdict,
- whether preserving initial independent verdicts measurably improves failure detection,
- quorum / abstention / escalation policy,
- severity-weighted consensus rules,
- attacks on one reviewer vs attacks on shared memory / aggregator,
- Byzantine / malicious agent tolerance,
- agent identity / provenance and trust,
- stale intermediate summaries in multi-agent systems,
- change-triggered invalidation of reviewer evidence,
- multi-agent verification under long context and many simultaneous constraints,
- multi-agent handling of conflicting / hierarchical instructions,
- repository-level `AGENTS.md` and nested rule-file compliance,
- false claims of having reviewed files / tests,
- whether an independent human remains necessary for specific high-severity tasks,
- cost models for selectively invoking multiple reviewers,
- reproducible benchmark design for `web-project-guide`-like Rule adherence.

---

# 34. Current research stopping point

For this theme, the current evidence supports preserving the following conclusions without moving into adoption:

1. multi-agent debate can improve reasoning and factuality in some settings;
2. diverse / heterogeneous collaboration can produce gains beyond some single-agent and homogeneous baselines;
3. MAD is not reliably superior to strong self-consistency, ensembles, or well-prompted single-agent baselines;
4. agent count alone is a poor proxy for independent verification strength;
5. homogeneous agents can exhibit strongly correlated errors and diminishing returns;
6. debate can reduce rather than increase independence because agents conform to peers;
7. sycophancy can create false consensus without new correctness evidence;
8. agents that are initially correct can become wrong during debate;
9. majority voting can suppress correct minority evidence;
10. aggregation / decision protocol is a major component of system reliability;
11. diversity and calibrated confidence can improve debate, but diversity benefit is task-dependent;
12. communication topology and number of rounds affect both accuracy and cost;
13. always-on multi-agent debate is not the only architecture; uncertainty-triggered selective escalation has strong positive evidence;
14. role-specialized multi-agent code review has direct software-engineering evidence, but role labels do not prove independence;
15. multi-agent architectures increase observability / failure-attribution demands;
16. complete traces can dramatically improve failure diagnosis;
17. multi-agent systems can introduce new security and contamination surfaces;
18. current evidence does not support treating “N agents agreed” as standalone proof that all applicable development rules were checked;
19. this does not make multi-agent verification useless — it can be a valuable barrier when it adds genuinely different hypotheses, evidence channels, roles, and explicit aggregation / escalation logic;
20. whether deterministic / tool-based evidence should be combined with these agents is the natural next separate research question.

This is enough to stop this single theme without designing the final Guide architecture.

**No Common Rule, Router behavior, Gate, mandatory multi-agent review, reviewer count, debate round count, model-diversity requirement, voting rule, consensus rule, topology, escalation threshold, or adoption decision is created by this file.**