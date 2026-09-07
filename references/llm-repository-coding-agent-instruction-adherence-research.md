# LLM Repository-Level Coding-Agent Instruction Adherence Research

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
- This file is **non-normative research evidence**.
- Adoption status for all mechanisms below: **not decided**, unless explicitly stated otherwise.
- Research is high-recall first. Mechanisms are preserved even when they require agent-harness modifications, instruction-loader instrumentation, multi-agent adapters, large-scale benchmark suites, hooks, signed read receipts, semantic rule routing, or capabilities unavailable to the current project.

## Research Question

Can repository-level coding agents reliably discover, load, scope, interpret, and obey the correct current instructions from sources such as:

- `AGENTS.md`,
- nested `AGENTS.md`,
- `CLAUDE.md`,
- `GEMINI.md`,
- `.github/copilot-instructions.md`,
- path-scoped instruction files,
- `README.md`,
- Requirements / Specs,
- Project Rules,
- referenced documentation,
- current repository state,

and does successful instruction loading / adherence actually improve repository-level task success?

The project-relevant chain is better modeled as:

```text
current repository exists
→ agent / harness supports the relevant instruction format
→ instruction files are discovered
→ correct current revisions are loaded
→ scope / inheritance / precedence are resolved
→ referenced secondary documents are actually fetched when required
→ applicable obligations are identified for the files / task
→ model maintains them while exploring / editing / using tools
→ new paths or scope changes trigger re-routing if needed
→ required checks are executed after the final changes
→ final artifact satisfies the rules
→ evidence is tied to the current artifact
```

Failure at any stage can look superficially like "the model ignored AGENTS.md" even when the underlying cause is different.

This pass focuses on repository instruction discovery / loading / applicability / adherence and repository exploration. It does **not** yet select a final `web-project-guide` instruction-file architecture, Rule adapter strategy, receipt schema, or validator design.

---

# 1. First distinction: file existence, loading, adherence, and task success are separate states

## Evidence / observed practice

Current coding-agent products have explicit instruction-loading mechanisms, but the mechanisms differ by product and surface. Current research also shows that agents can follow context-file instructions behaviorally without obtaining higher task-resolution rates.

A useful separation is:

```text
A. instruction file exists
B. current agent surface supports that file type
C. loader discovers the file
D. file contents enter model context
E. model understands scope / precedence
F. relevant rules are selected
G. rules are followed during work
H. task implementation is technically correct
I. required validation is run
J. final current artifact is compliant
```

These should not be collapsed into one `instructions loaded: true` flag.

Sources:

- OpenAI, `Unrolling the Codex agent loop`
  - https://openai.com/index/unrolling-the-codex-agent-loop/
- Anthropic, `How Claude remembers your project`
  - https://code.claude.com/docs/en/memory
- Google Gemini CLI, `Provide Context with GEMINI.md Files`
  - https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html
- GitHub Copilot custom instruction documentation
  - https://docs.github.com/en/copilot/reference/custom-instructions-support
- Gloaguen et al., `Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?`
  - https://arxiv.org/abs/2602.11988

## Knowledge captured

A future assurance system should not infer:

```text
repository contains AGENTS.md
→ agent must have used it
```

or:

```text
agent demonstrably followed a tooling instruction
→ implementation must be correct
```

**Adoption status:** not decided.

---

# 2. There is no universal repository-instruction loader contract across coding agents

## Evidence / observed practice

### OpenAI Codex

OpenAI's current Codex agent-loop documentation says user instructions are aggregated from multiple locations. Codex reads:

- `AGENTS.override.md` / `AGENTS.md` under `$CODEX_HOME`,
- then, subject to a default combined 32 KiB limit, instruction files from the Git / project root through the current working directory,
- with additional fallback filenames configurable in `config.toml`.

More specific instructions generally appear later in the aggregated instruction message.

Source:

- https://openai.com/index/unrolling-the-codex-agent-loop/

### Claude Code

Current Claude Code documentation states explicitly that Claude Code reads `CLAUDE.md`, **not `AGENTS.md` directly**. Repositories that want one common source can use a `CLAUDE.md` that imports `@AGENTS.md`, or a symlink where suitable.

Source:

- https://code.claude.com/docs/en/memory

### Gemini CLI

Gemini CLI uses hierarchical `GEMINI.md` files by default and allows the filename / filename list to be customized in settings, including examples with `AGENTS.md`, `CONTEXT.md`, and `GEMINI.md`.

Source:

- https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html

### GitHub Copilot / VS Code

GitHub Copilot supports several formats, but support varies across GitHub.com, cloud agent, code review, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, and Copilot CLI.

Source:

- https://docs.github.com/en/copilot/reference/custom-instructions-support

VS Code also has feature settings that can enable / disable instruction discovery, including nested AGENTS support.

Source:

- https://code.visualstudio.com/docs/agent-customization/custom-instructions

## Knowledge captured

The repository cannot assume that one filename is a universal instruction entrypoint for every coding-agent product or every surface within the same product.

A portable repository can therefore face a **loader compatibility problem before the LLM's instruction-following ability is even tested**.

**Adoption status:** not decided.

---

# 3. AGENTS.md is an open convention, not deterministic enforcement

## Evidence / observed practice

The AGENTS.md project describes a simple open format for agent instructions. For large monorepos it recommends nested `AGENTS.md` files; the nearest file in the directory tree takes precedence.

The format is now stewarded by the Agentic AI Foundation under the Linux Foundation.

Source:

- https://agents.md/

OpenAI's Codex documentation similarly describes directory-tree scope and requires final-patch files to comply with every applicable AGENTS.md, with deeper nested instructions taking precedence in conflicts and direct system / developer / user prompts taking precedence over repository instructions.

Source:

- https://openai.com/index/introducing-codex/

## Knowledge captured

A documented precedence convention expresses **intended harness / model behavior**. It is not equivalent to a formal access-control or policy-engine guarantee.

Previous instruction-hierarchy research already shows that a model can fail even when authority / precedence rules are defined.

**Adoption status:** not decided.

---

# 4. Nested instruction files create an applicability and routing problem

## Evidence / observed practice

Several systems use directory / path scope:

- AGENTS.md convention: nearest nested file wins for its subtree.
- Codex: instructions are gathered along the project-root → current-working-directory path.
- Claude Code: ancestor CLAUDE.md files load at launch; subdirectory CLAUDE.md files load lazily when Claude reads files there.
- GitHub Copilot: nearest AGENTS.md takes precedence for agent instructions; `*.instructions.md` can use `applyTo` path patterns.
- Cursor: nested AGENTS.md files are combined with parent instructions, with more specific instructions taking precedence.
- VS Code: nested AGENTS support exists but is currently marked experimental and disabled by default in current settings.

Sources:

- https://agents.md/
- https://openai.com/index/unrolling-the-codex-agent-loop/
- https://code.claude.com/docs/en/memory
- https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
- https://cursor.com/docs/rules
- https://code.visualstudio.com/docs/agent-customization/custom-instructions

## Knowledge captured

A repository agent can begin with one rule set and later enter a subtree where additional / overriding rules become applicable.

That creates runtime transitions such as:

```text
initial plan based on root rules
→ exploration discovers file under package B
→ package B rules become applicable
→ existing plan / intended edits may need re-evaluation
```

A one-time startup read does not necessarily solve this class.

**Adoption status:** not decided.

---

# 5. Surface / IDE support differences can make valid repository files invisible

## Evidence / observed practice

GitHub's current support matrix shows that custom instruction support differs substantially by Copilot feature and environment. For example, some surfaces support repository-wide instructions but not agent instruction files; others support AGENTS / CLAUDE / GEMINI files.

Source:

- https://docs.github.com/en/copilot/reference/custom-instructions-support

VS Code currently documents nested AGENTS support as experimental and controlled by `chat.useNestedAgentsMdFiles`, which is disabled by default. Parent-repository customization discovery in monorepo scenarios is also opt-in through `chat.useCustomizationsInParentRepositories`.

Sources:

- https://code.visualstudio.com/docs/agent-customization/custom-instructions
- https://code.visualstudio.com/docs/agents/reference/ai-settings
- https://code.visualstudio.com/docs/agent-customization/overview

## Knowledge captured

This gives a concrete failure class:

```text
instruction file is valid
+
repository is correct
+
model would follow the instruction if shown
+
current surface never loads it
→ rule is missed
```

This is not an LLM reasoning failure.

**Adoption status:** not decided.

---

# 6. Some current products expose instruction-loader observability

## Evidence / observed practice

Current products increasingly expose ways to inspect which instructions were discovered / loaded.

Examples:

- Claude Code `/memory` shows CLAUDE.md / rules files loaded in the current session.
- Claude Code provides an `InstructionsLoaded` hook to log which instruction files load, when, and why.
- Copilot CLI `/instructions` shows discovered instruction files and lets users enable / disable them.
- VS Code can show instruction References and has customization diagnostics / Agent Debug Logs.
- Gemini CLI `/memory show` displays concatenated hierarchical memory and `/memory refresh` rescans it.

Sources:

- https://code.claude.com/docs/en/memory
- https://code.claude.com/docs/en/debug-your-config
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions
- https://code.visualstudio.com/docs/agent-customization/custom-instructions
- https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html

## Knowledge captured

Loader observability is materially stronger than asking the LLM:

```text
"Did you read the rules?"
```

because it can expose whether the harness actually inserted the file.

However, a loader trace still proves **delivery**, not semantic compliance.

**Adoption status:** not decided.

---

# 7. Claude Code explicitly treats project instruction files as guidance, not enforcement

## Evidence / observed practice

Anthropic's current documentation states that CLAUDE.md content is delivered as user-message context, not system configuration, and strict compliance is not guaranteed, especially for vague or conflicting instructions.

It also recommends permissions / hooks for boundaries that require guarantees rather than relying on CLAUDE.md alone.

Source:

- https://code.claude.com/docs/en/memory
- https://code.claude.com/docs/en/debug-your-config

## Knowledge captured

This provider documentation itself separates:

```text
persistent natural-language guidance
```

from:

```text
mechanism that enforces a hard boundary
```

This is consistent with the earlier deterministic-verification / policy-as-code research.

**Adoption status:** not decided.

---

# 8. Instruction-loading limits and context management can silently change effective coverage

## Evidence / observed practice

Codex documents a default 32 KiB combined limit for repository instruction aggregation.

Claude Code states that long CLAUDE.md files can reduce adherence and that nested / path-scoped instructions can be summarized away during context compaction; they reload when relevant files are read again. Root CLAUDE.md is re-read after compaction.

Sources:

- https://openai.com/index/unrolling-the-codex-agent-loop/
- https://code.claude.com/docs/en/memory
- https://code.claude.com/docs/en/context-window

## Knowledge captured

Instruction coverage is not simply a property of repository contents. It can depend on:

- context limits,
- loader truncation policy,
- compaction,
- current working directory,
- lazy-load triggers,
- file-read sequence,
- settings.

A file can exist and even have loaded earlier while no longer being actively represented in the current reasoning context.

**Adoption status:** not decided.

---

# 9. Direct 2026 evidence: context files can be followed without increasing task success

## Evidence / observed practice

Gloaguen et al. evaluate repository context files using:

- SWE-bench Lite: 300 tasks from 11 popular Python repositories,
- CTXbench: 138 unique bug-fix / feature tasks from 12 recent or niche repositories containing developer-committed context files,
- Claude Code + Sonnet 4.5,
- Codex + GPT-5.2,
- Codex + GPT-5.1 mini,
- Qwen Code + Qwen3-30B-Coder.

They compare:

- no context file,
- LLM-generated context file using recommended initialization workflows,
- developer-provided context file where available.

LLM-generated context files reduce mean resolution by approximately 0.5 percentage points on SWE-bench and 2 points on CTXbench, neither statistically significant. They also raise average cost by roughly 20% / 23% and increase steps.

Developer-written files improve performance by 2.4 percentage points on average versus no file in CTXbench, but this result is not statistically significant (`p=0.21`); they do significantly outperform LLM-generated files in the paper's comparison, while also increasing steps / cost.

Source:

- Gloaguen et al., 2026
  - https://arxiv.org/abs/2602.11988
  - https://www.sri.inf.ethz.ch/publications/gloaguen2026agentsmd

## Knowledge captured

Repository context files are not demonstrated as a universal correctness booster.

More important for the present question: the paper reports strong behavioral evidence that agents **do respond to the instructions** even where task success does not improve.

This separates:

```text
instruction adherence
```

from:

```text
software-task competence
```

**Adoption status:** not decided.

---

# 10. Context files measurably alter agent behavior

## Evidence / observed practice

In Gloaguen et al.'s trace analysis, context-file presence causes agents to:

- run more tests,
- grep / read / write more files,
- explore more,
- use more repository-specific tooling.

When `uv` is mentioned, agents use it approximately 1.6 times per instance versus fewer than 0.01 when absent. Repository-specific tools are used about 2.5 times per instance when mentioned versus fewer than 0.05 otherwise.

Source:

- https://arxiv.org/html/2602.11988v2

## Knowledge captured

The paper's null task-success result is not well explained by simply saying "the model ignored AGENTS.md."

It supports a more subtle chain:

```text
instruction delivered
→ behavior changed
→ more work / more exploration
→ implementation bottleneck or extra obligations remain
→ task still fails
```

**Adoption status:** not decided.

---

# 11. Repository overviews can add work without improving localization

## Evidence / observed practice

Gloaguen et al. measure how quickly agents first touch a file modified in the reference patch. Context files do not meaningfully reduce this localization metric.

In a manual GPT-5.1-mini trace analysis, the authors observe the agent issuing commands to find and read context files multiple times **even though those files were already injected into context**.

Source:

- https://arxiv.org/html/2602.11988v2

## Knowledge captured

A repository overview is not necessarily a substitute for active repository exploration.

The instruction system itself can create redundant retrieval behavior and extra steps.

**Adoption status:** not decided.

---

# 12. Independent 2026 ablation also finds no measurable correctness effect

## Evidence / observed practice

Khatri evaluates context injection using:

- Claude Code,
- Codex,
- 17 real-world tasks across 3 repositories,
- 291 agent runs, 288 evaluated,
- gold-test evaluation,
- three context strategies.

Observed strategy differences are approximately zero; descriptive TOST analysis bounds effects to below 10 percentage points for Claude and 15 for Codex, but the author explicitly notes that the sample is too small for a powered equivalence claim.

A targeted 36-cell near-miss probe also finds that real, unmodified AGENTS.md files do not convert the selected near-misses into passes.

Source:

- Khatri, `Do Context Files Help Coding Agents? A Two-Agent Ablation Study on Real Repositories`, 2026 preprint
  - https://arxiv.org/abs/2607.27250

## Limitation

The study uses only 15–17 task clusters and three Python repositories. The reported minimum detectable effect is large, so small real effects could remain undetected.

**Adoption status:** not decided.

---

# 13. Opposing evidence: AGENTS.md can improve operational efficiency

## Evidence / observed practice

Lulla et al. study 10 repositories / 124 pull requests with agents run with and without AGENTS.md.

They report AGENTS.md presence is associated with:

- 28.64% lower median runtime,
- 16.58% lower output-token consumption,
- comparable task-completion behavior.

Source:

- Lulla et al., `On the Impact of AGENTS.md Files on the Efficiency of AI Coding Agents`, 2026, ICSE JAWs
  - https://arxiv.org/abs/2601.20404

## Knowledge captured

The current literature is **not converged** on one operational effect of context files.

Differences in:

- task distribution,
- agent harness,
- file content,
- measurement method,
- model,
- repository,
- context loading strategy

can produce different efficiency outcomes.

No universal claim such as "AGENTS.md always costs 20%" or "AGENTS.md always saves 28%" is supported.

**Adoption status:** not decided.

---

# 14. Guidance-production method can be a first-order variable

## Evidence / observed practice

Shepard & Albrecht introduce **probe-and-refine tuning**. Synthetic repository bug-fix probes are used to diagnose weaknesses in a static repository knowledge base and iteratively revise the guidance.

On SWE-bench Verified with Qwen3.5-35B-A3B at a 200-step budget across four independent trials:

- no context: 25.5% mean resolve,
- static knowledge base: 28.3%,
- probe-refined guidance: 33.0%,
- both probe-refined contrasts reported `p < 0.001`.

The gain comes mainly from **coverage / localization**: refined guidance yields evaluable patches for 14.5 percentage points more instances, while per-patch precision stays around 59% and is not statistically different (`p=0.119`).

The same guidance does not generalize uniformly to another model: in a Nemotron single-trial result, no-context is 28.4%, static KB 24.6%, and probe-refined 27.0%.

Source:

- Shepard & Albrecht, `Probe-and-Refine Tuning of Repository Guidance for Coding Agents`, 2026 preprint
  - https://arxiv.org/abs/2606.20512

## Knowledge captured

The question is not only:

```text
context file or no context file?
```

but also:

```text
how was the context produced?
what failure modes was it optimized against?
which model / harness consumes it?
```

Failure-informed guidance can help a particular system while harming or failing to help another.

**Adoption status:** not decided.

---

# 15. Repository exploration is an independently measurable capability

## Evidence / observed practice

SWE-Explore isolates repository exploration from final patch generation.

It contains:

- 848 issues,
- 203 open-source repositories,
- 10 programming languages,
- fixed line budgets,
- ranked relevant code regions,
- coverage / ranking / context-efficiency metrics.

The authors report that exploration metrics strongly track downstream repair behavior. Modern agentic explorers are strong at file-level localization, while line-level coverage and efficient ranking remain major differentiators.

Source:

- Zhang et al., `SWE-Explore: Benchmarking How Coding Agents Explore Repositories`, 2026 preprint
  - https://arxiv.org/abs/2606.07297

## Knowledge captured

Repository instruction use sits upstream of a broader exploration problem.

An agent can know the root guidance yet still fail to find:

- the relevant implementation,
- the relevant tests,
- a nested rule file,
- a local specification,
- the actual runtime path.

Therefore final patch failure should not be attributed directly to rule non-adherence without exploration evidence.

**Adoption status:** not decided.

---

# 16. Static context files are not complete representations of repository obligations

## Evidence / observed practice

`Agent READMEs`, using 2,303 context files from 1,925 repositories across Claude Code, Codex, and Copilot ecosystems, finds the most common contents are:

- testing procedures: 75.9%,
- implementation details: 70.8%,
- architecture: 68.1%.

Non-functional concerns are much less common:

- security: 14.8%,
- performance: 14.5%,
- UI/UX: 8.7%.

Source:

- Chatlatanagulchai et al., `Agent READMEs: An Empirical Study of Context Files for Agentic Coding`
  - https://arxiv.org/abs/2511.12884

## Knowledge captured

Even perfect compliance with an AGENTS / CLAUDE / Copilot instruction file cannot protect a rule that **was never represented in that file or its referenced sources**.

This is a coverage problem distinct from model adherence.

**Adoption status:** not decided.

---

# 17. Instruction files themselves evolve like software configuration

## Evidence / observed practice

`Agent READMEs` describes context files as long / difficult-to-read artifacts that evolve through frequent small additions rather than static README-like text.

`Evolution Context Gap`, JCSSE 2026, analyzes 80 real-world manifests from five agent types and reports:

- Workflow & Process in 96.2% of manifests,
- 43.5% mean character fraction for that category,
- 73.8% containing no evolution context.

Sources:

- https://arxiv.org/abs/2511.12884
- Chondamrongkul et al., `Evolution Context Gap: An Empirical Study of Agent Manifests`, JCSSE 2026
  - DOI: 10.1109/JCSSE68839.2026.11597070

## Knowledge captured

Instruction systems have their own maintenance lifecycle.

They can become stale with respect to:

- architecture,
- tooling,
- supported runtimes,
- repository layout,
- current requirements,
- migration state,
- release process.

A current-model agent reading an old manifest can comply perfectly with outdated instructions.

**Adoption status:** not decided.

---

# 18. Configuration-smell research identifies common manifest failure modes

## Evidence / observed practice

Dos Santos et al. analyze 100 popular open-source repositories containing AGENTS.md or CLAUDE.md and propose six configuration smells.

Detected counts / heuristic precision where applicable:

- Lint Leakage: 62 detections, 93% precision,
- Context Bloat: 42,
- Skill Leakage: 35 detections, 82% precision,
- Blind Reference: 16 detections, 87% precision,
- Init Fossilization: 24,
- Conflicting Instructions: 28 detections but only 57% precision; 16 manually confirmed.

At least one smell is detected in 91 of the 100 studied files under their definitions / heuristics.

Source:

- dos Santos et al., `Configuration Smells in AGENTS.md Files: Common Mistakes in Configuring Coding Agents`, SCAM 2026 / arXiv
  - https://arxiv.org/abs/2606.15828

## Evidence caution

Some smells use thresholds chosen by the study. For example, Context Bloat uses a line-count heuristic. These thresholds must not become universal `web-project-guide` limits from this research alone.

**Adoption status:** not decided.

---

# 19. Lint Leakage shows that natural-language duplication can waste context without adding enforcement

## Evidence / observed practice

The configuration-smell paper's most common category, Lint Leakage, represents rules copied into context that can already be enforced by linters / formatters.

Source:

- https://arxiv.org/abs/2606.15828

## Knowledge captured

A repository can spend scarce instruction capacity on obligations already checked more reliably by deterministic tools.

Conceptually:

```text
natural-language reminder of machine-checkable style rule
```

may be weaker than:

```text
short pointer / command
+
actual deterministic checker
```

This is a research observation, not a restructuring decision for the Guide.

**Adoption status:** not decided.

---

# 20. Blind references create a second discovery step

## Evidence / observed practice

The configuration-smell study defines Blind Reference around pointers to secondary documents without enough guidance about when / why they are relevant. It finds 16 detections with 87% precision.

Source:

- https://arxiv.org/abs/2606.15828

## Knowledge captured

A rule such as:

```text
"See docs/development.md"
```

creates another dependency:

```text
root instruction loaded
→ reference recognized as applicable
→ target path resolved
→ target file actually retrieved
→ required section found
→ instruction applied
```

Loading the parent file does not prove loading the referenced file.

This is especially relevant to `web-project-guide`, whose design intentionally routes from summary / router documents into Owner Docs.

**Adoption status:** not decided.

---

# 21. Init Fossilization captures stale generated guidance

## Evidence / observed practice

The configuration-smell study's Init Fossilization heuristic marks files created once and never changed since creation. It finds 24 such cases in its 100-repository sample.

Source:

- https://arxiv.org/abs/2606.15828

## Knowledge captured

Generated initialization files can create a false sense that repository context has been "set up" permanently.

A manifest can remain syntactically valid while drifting away from the repository it describes.

This connects directly to prior stale-evidence research:

```text
old instruction content authentic
≠
old instruction content still correct
```

**Adoption status:** not decided.

---

# 22. Conflicting repository instructions are both common enough to matter and hard to detect reliably

## Evidence / observed practice

Dos Santos et al.'s conflict heuristic flags 28 / 100 files, but only 16 are manually confirmed, yielding 57% precision.

Anthropic documentation itself warns that conflicting instructions can be followed unpredictably and recommends removing stale / conflicting guidance.

Sources:

- https://arxiv.org/abs/2606.15828
- https://code.claude.com/docs/en/memory

## Knowledge captured

There are two separate problems:

1. the repository contains inconsistent instructions;
2. the model / tooling must resolve those instructions correctly.

An LLM-based contradiction scanner can itself generate false positives, so repository rule hygiene is not solved merely by adding another LLM check.

**Adoption status:** not decided.

---

# 23. Different products define different precedence semantics

## Evidence / observed practice

Examples:

- AGENTS / Codex: deeper nested AGENTS instruction wins within scope; direct higher-level prompt instructions take precedence.
- GitHub Copilot on GitHub / VS Code: documented hierarchy includes personal > repository > organization, with path-specific repository instructions above repository-wide and agent instructions in current documentation.
- Copilot CLI: combines applicable instruction files but explicitly states that it does **not define a general precedence order** among multiple user / repository instruction files; conflicts should be avoided.
- Cursor: current docs state Team Rules > Project Rules > User Rules; nested AGENTS combine with more specific instructions winning.
- VS Code: says multiple instruction files are combined and for some categories no specific order is guaranteed, while broader instruction-source priority is documented separately.

Sources:

- https://openai.com/index/introducing-codex/
- https://docs.github.com/en/copilot/concepts/prompting/response-customization
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions
- https://cursor.com/docs/rules
- https://code.visualstudio.com/docs/agent-customization/custom-instructions

## Knowledge captured

There is no cross-agent universal precedence graph.

The same repository containing multiple compatibility files can therefore expose different effective rule orders depending on the consuming harness.

**Adoption status:** not decided.

---

# 24. Imported / referenced rule syntax is also product-specific

## Evidence / observed practice

Examples:

- Claude Code supports `@AGENTS.md` import from CLAUDE.md.
- Copilot CLI supports `@relative/path` references in `.github/copilot-instructions.md`, AGENTS.md, and CLAUDE.md, but current docs say references are not expanded in GEMINI.md or `*.instructions.md`.
- Gemini CLI supports `@file.md` imports and configurable context file names.
- Cursor supports `@filename` references in project rules.

Sources:

- https://code.claude.com/docs/en/memory
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions
- https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html
- https://cursor.com/docs/rules

## Knowledge captured

A cross-tool repository cannot assume that a reference syntax supported in one instruction ecosystem is portable to another.

A compatibility adapter can therefore introduce semantic drift or missing imports.

**Adoption status:** not decided.

---

# 25. Active repository context gathering can outperform static context-only verification

## Evidence / observed practice

`Agentic Rubrics`, ACL 2026, uses an expert agent that actively interacts with the repository to build a codebase-specific rubric before scoring candidate patches.

On SWE-bench Verified in the paper's parallel TTS setting:

- Qwen3-Coder-30B-A3B: 54.2%,
- Qwen3-32B: 40.6%,
- at least +3.5 percentage points over the strongest compared baseline.

The paper reports that ablations show active agentic context gathering is essential for producing unambiguous codebase-specific criteria.

Source:

- Raghavendra et al., `Agentic Rubrics as Contextual Verifiers for SWE Agents`, ACL 2026
  - https://aclanthology.org/2026.acl-long.697/

## Knowledge captured

Repository knowledge may need to be **derived from current code / tests / state**, rather than treated as fully compressible into a static manifest.

This does not establish that an LLM-generated rubric is high-assurance evidence by itself; it shows that active context gathering can materially improve repository-grounded evaluation.

**Adoption status:** not decided.

---

# 26. A static manifest can help localization without improving implementation precision

## Evidence synthesis

Probe-and-refine guidance's gains come largely from reaching evaluable / relevant parts of the repository rather than increasing correctness of each produced patch.

SWE-Explore independently identifies repository localization as an upstream capability strongly linked to downstream repair.

Sources:

- https://arxiv.org/abs/2606.20512
- https://arxiv.org/abs/2606.07297

## Knowledge captured

A useful decomposition is:

```text
manifest / router
→ where should I look?

implementation model
→ what change should I make?

validator
→ is that change correct?
```

One layer can improve while another remains the bottleneck.

**Adoption status:** not decided.

---

# 27. README / Requirements are not automatically agent instructions merely because they exist

## Evidence / observed practice

Current product loading contracts focus on specific manifest / instruction filenames and scopes. None of the reviewed product contracts implies that every README, Requirements file, Spec, or project document is automatically loaded in full simply because it exists in a repository.

Those files may be:

- discovered by repository exploration,
- explicitly referenced by an instruction file,
- provided by a harness,
- manually included by the user,
- ignored if no path leads the agent to them.

Sources:

- current Codex, Claude Code, Gemini CLI, Copilot, Cursor, VS Code documentation listed above.

## Knowledge captured

A repository governance model that relies on:

```text
"the agent will notice REQUIREMENTS.md"
```

without a discovery / routing contract has an unresolved failure mode.

At the same time, automatically injecting every repository document creates long-context and multi-constraint load problems identified in prior research.

**Adoption status:** not decided.

---

# 28. Current repository state and instruction state can drift during the same agent trajectory

## Evidence synthesis

Several current systems lazily load subdirectory instructions, observe file changes, or re-scan memory / rules on commands. Prior stale-evidence research shows that evidence / assumptions can become stale immediately after state changes.

Potential in-run changes include:

- agent creates / enters a new directory,
- agent edits an instruction file,
- branch changes,
- dependency configuration changes,
- another actor updates repository state,
- compaction causes nested guidance to drop until reloaded.

Sources:

- Claude Code memory / context documentation,
- Gemini `/memory refresh`,
- VS Code / Cursor instruction discovery documentation,
- `references/llm-evidence-receipts-false-completion-stale-evidence-research.md`.

## Knowledge captured

Instruction applicability is potentially **stateful over time**, not a one-time static startup property.

No automatic rerouting or invalidation mechanism is adopted here.

---

# 29. Current failure taxonomy for repository instruction adherence

## A. Unsupported-format failure

```text
repo has AGENTS.md
→ current agent surface does not support AGENTS.md
→ no delivery
```

## B. Discovery failure

```text
supported file exists
→ loader / exploration never finds it
```

## C. Scope failure

```text
file loaded
→ agent applies it to wrong subtree / misses correct subtree
```

## D. Precedence failure

```text
multiple rules loaded
→ effective priority differs from repository author's expectation
```

## E. Loader budget / truncation failure

```text
instruction universe too large
→ some instructions omitted / truncated
```

## F. Lazy-load timing failure

```text
nested rule only loads after file read
→ planning happened before rule arrived
```

## G. Compaction loss

```text
path-scoped / nested instruction was loaded
→ context compacts
→ instruction not present until trigger repeats
```

## H. Blind-reference failure

```text
parent says "see X"
→ X never fetched / wrong section read
```

## I. Coverage gap

```text
agent obeys all manifest rules
→ critical requirement absent from manifest
```

## J. Stale-manifest failure

```text
old instruction accurately read
→ current repository has changed
→ agent follows obsolete rule
```

## K. Conflict failure

```text
current instructions disagree
→ agent picks wrong / arbitrary interpretation
```

## L. Context-bloat failure

```text
large always-loaded instruction set
→ extra reasoning / distraction / load
```

## M. Lint / deterministic-rule duplication

```text
machine-checkable rule duplicated as prose
→ context cost increases
→ enforcement still depends on model unless checker runs
```

## N. Skill leakage / always-on specialization

```text
rare workflow is always injected
→ irrelevant obligations compete with current task
```

## O. Repository-overview inefficiency

```text
manifest explains directories
→ agent still explores repeatedly
→ cost rises without faster localization
```

## P. Correct adherence, wrong implementation

```text
agent follows tool / test / style guidance
→ lacks technical skill / makes wrong patch
```

## Q. Correct file, wrong rule interpretation

```text
file delivered
→ ambiguous natural language is misread
```

## R. Mid-task applicability change

```text
agent's touched-file set expands
→ new nested rules become relevant
→ plan not re-evaluated
```

## S. Validation-order failure

```text
agent runs required tests
→ edits code afterward
→ does not rerun final checks
```

## T. Read-claim without receipt

```text
agent says "I read Requirements / AGENTS"
→ no loader trace / file-read evidence
```

## U. Cross-agent adapter drift

```text
canonical rule copied into CLAUDE / GEMINI / Copilot / Cursor adapters
→ copies diverge over time
```

## V. Surface-specific hidden state

```text
IDE setting disables / changes discovery
→ repository author cannot infer effective instruction universe from git alone
```

---

# 30. Possible mechanisms observed in current products / research — not recommendations

Per the Research Capture Policy, these are retained before feasibility / adoption filtering.

## Discovery / loader observability

- `/memory` / `/instructions` style listing,
- `InstructionsLoaded` hooks,
- debug / diagnostic panels,
- references showing which instruction files entered context,
- machine-readable discovered-file inventory,
- instruction-file digest / revision recording,
- warnings for unsupported formats / disabled settings,
- explicit instruction-load errors rather than silent ignore.

## Scope / routing

- directory-tree nearest-file inheritance,
- path-glob instructions,
- current-working-directory-based loading,
- lazy subdirectory loading,
- semantic relevance routing,
- work-type / risk-based explicit routers,
- touched-file → applicable-rule recomputation,
- re-routing on path / scope expansion.

## Cross-tool compatibility

- one canonical rule source plus thin tool-specific adapters,
- imports / symlinks where supported,
- generated compatibility files,
- adapter consistency validators,
- agent-capability / surface support matrix,
- fail-visible unsupported-tool state.

## Context-quality control

- remove lint / formatter duplication,
- separate always-on rules from rare skills,
- minimize non-obvious mandatory guidance,
- context-bloat detection,
- contradiction scanning,
- blind-reference scanning,
- stale / fossilized manifest detection,
- generated-guidance evaluation rather than automatic trust.

## Failure-informed refinement

- synthetic repository probes,
- record failure classes caused by missing guidance,
- tune guidance against observed navigation failures,
- model-specific guidance experiments,
- holdout tasks to detect overfitting.

## Repository exploration

- dedicated explorer stage,
- ranked relevant-file / line retrieval,
- active repository-grounded rubric creation,
- test / implementation / spec localization,
- exploration coverage metrics.

## Validation / evidence

- deterministic test / linter / build execution after edits,
- loader receipts separated from compliance receipts,
- per-rule / per-file evidence,
- final-artifact-bound validation,
- explicit `MISSING / NOT_LOADED / UNSUPPORTED / STALE / CONFLICT / UNVERIFIED` states.

All remain research mechanisms.

---

# 31. Current feasibility / missing-capability notes

## Relatively accessible today

A repository workflow can already use some primitives provided by current tools:

- root / nested instruction files,
- path-scoped rules,
- explicit README / Requirements references,
- current blob / commit identity,
- deterministic validation commands,
- instruction diagnostics in some agent products,
- simple duplicate / broken-reference scans,
- rule-file freshness checks against git history,
- cross-file diff checks.

## Additional orchestration needed

- portable cross-agent instruction inventory,
- uniform scope graph across Codex / Claude / Copilot / Gemini / Cursor,
- canonical-source → adapter generation,
- adapter semantic-drift checking,
- mandatory instruction-read receipts,
- dynamic touched-file → rule applicability recomputation,
- failure-informed probe tuning,
- Rule→instruction-file→artifact→evidence graph,
- automatic stale-instruction detection tied to repository change impact.

## Heavy / experimental / currently unrealistic for broad use

- formal verification that every natural-language rule was semantically consumed,
- cryptographically verifiable proof that a closed-model LLM internally used an instruction,
- universal harness-independent instruction protocol with deterministic precedence,
- complete semantic equivalence proof across all tool-specific adapters,
- model-internal tracing that proves which instruction caused each action,
- exhaustive repository-state exploration before every edit.

Current infeasibility is not a reason to remove these mechanisms from the research record.

---

# 32. Negative results / cautions that should remain visible

1. **LLM-generated context files do not reliably improve coding-task success.**
   - Gloaguen et al. report slight non-significant average decreases and >20% cost increases.

2. **Developer-written context is not proven universally beneficial.**
   - Gloaguen et al.'s +2.4pp average vs no-context is not statistically significant.

3. **A second controlled 2026 study also finds no measurable correctness effect.**
   - Khatri; small-sample limitations remain.

4. **Efficiency evidence conflicts across studies.**
   - Lulla et al. find lower runtime / token use; Gloaguen et al. find higher steps / cost.

5. **Guidance quality / production method matters.**
   - probe-and-refine can significantly outperform static / no-context on one model.

6. **The same refined guidance can fail to transfer to another model.**
   - Nemotron result is weaker than no-context in Shepard & Albrecht's single trial.

7. **Agents can follow instructions yet still fail the task.**
   - behavioral adherence does not prove implementation competence.

8. **Repository overviews do not necessarily reduce file-localization work.**

9. **Context files can trigger redundant re-reading / searching.**

10. **Manifest content coverage is highly uneven.**
    - Security / performance / UI-UX are uncommon in Agent READMEs dataset.

11. **Instruction-file ecosystems contain widespread configuration smells.**

12. **Contradiction detection by LLM is itself noisy.**
    - 57% precision in the cited smell detector.

13. **File size / line-count heuristics are not universal safe limits.**

14. **Nested instruction support is not uniform or stable across tools.**
    - e.g. VS Code currently marks it experimental.

15. **Some loaders silently depend on settings / current working directory / parent repo discovery.**

16. **An instruction reference is not proof that the referenced document was read.**

17. **A loaded instruction is not proof that the corresponding rule is represented correctly.**

18. **A manifest can be current in git yet semantically stale relative to runtime / external systems.**

19. **Multiple compatibility manifests can create duplicate or contradictory Sources of Truth.**

20. **No product-level instruction format replaces deterministic validation for enforceable properties.**

---

# 33. Current working interpretations for `web-project-guide` — not adoption decisions

These are hypotheses retained for later synthesis only.

## H1. Repository instruction adherence is a pipeline, not one model capability

Likely stages include:

```text
support
→ discover
→ load
→ scope
→ prioritize
→ retrieve references
→ apply
→ validate
```

A future defect report should ideally identify which stage failed.

## H2. A Rule Router can reduce discovery ambiguity but does not prove execution

The current Guide's router model potentially addresses one upstream failure class, but prior research shows routing and final adherence remain separate.

## H3. Current-revision identity may matter for instruction reads

A read receipt without blob / commit identity can prove only that *some* revision was read.

## H4. Thin entrypoints may be more portable than duplicating the full Guide into every agent format

This is suggested by cross-tool loader differences and duplication / staleness risk, but no adapter architecture is selected.

## H5. Blind references are directly relevant to router-based documentation

A summary / router that points to Owner Docs must eventually distinguish:

```text
route resolved
```

from:

```text
Owner Doc actually loaded to the necessary section
```

## H6. Dynamic re-routing may be necessary when touched-file scope expands

Nested-rule systems make applicability dependent on the eventual edit set, which may not be known at task start.

## H7. Context files may be best for non-obvious repository-specific knowledge, not every enforceable rule

This is supported by Gloaguen / smell research / provider guidance, but is not yet a Common Rule.

## H8. Instruction coverage and task skill should be evaluated separately

A failed patch after correct rule adherence should not automatically trigger adding more rules to the manifest.

## H9. Manifest effectiveness should be benchmarked against actual recurring failures

Probe-and-refine suggests a failure-driven approach can outperform generic generated summaries.

## H10. Loader observability could eventually become part of evidence receipts

Current Claude / Copilot / VS Code / Gemini products expose partial primitives for proving instruction delivery.

Delivery evidence still does not prove semantic use.

---

# 34. Evidence map

| Claim | Main evidence | Evidence status | Current confidence | Important limitation |
|---|---|---|---|---|
| Coding-agent products use materially different repository-instruction loading rules | Current Codex / Claude / Gemini / Copilot / Cursor / VS Code docs | current official product evidence | High | product behavior can change rapidly |
| AGENTS.md presence does not imply every agent / surface will load it | Claude docs + Copilot support matrix + VS Code settings | current official | High | specific to current versions |
| Nested instruction scope is a real supported mechanism in several ecosystems | AGENTS.md, Codex, Claude, Copilot, Cursor | official | High | semantics differ by product |
| Some products expose which instruction files were loaded | Claude / Copilot CLI / VS Code / Gemini | official | High | loader evidence ≠ compliance evidence |
| LLM-generated context files do not significantly improve task success and increase cost in one broad study | Gloaguen et al. | ICLR 2026 MemAgents workshop + arXiv | Moderate–High | Python-heavy benchmarks; current agents/models only |
| Agents can behaviorally follow context-file tooling guidance without higher resolution | Gloaguen trace analysis | same | Moderate–High | adherence measured through selected behavioral proxies |
| Developer context modestly improves mean performance but not significantly vs none | Gloaguen | same | Moderate | limited developer-file sample |
| A separate two-agent ablation finds no measurable correctness effect | Khatri | 2026 preprint | Moderate emerging | 17 tasks / 3 Python repos; low power |
| AGENTS.md can improve runtime / output-token efficiency | Lulla et al. | ICSE JAWs 2026 | Moderate | 10 repos / 124 PRs; conflicts with other efficiency evidence |
| Failure-informed probe-refined guidance can improve resolve rate substantially | Shepard & Albrecht | 2026 preprint | Moderate–High emerging | model / setup dependent; cross-model reversal observed |
| Probe-refined improvement acts mainly through coverage / localization | Shepard & Albrecht | preprint mechanistic result | Moderate–High emerging | implementation precision unchanged |
| Repository exploration can be measured independently and predicts repair behavior | SWE-Explore | 2026 preprint | Moderate–High emerging | benchmark ground truth derived from successful agent trajectories |
| Agent context files emphasize testing / implementation / architecture more than security / performance / UX | Agent READMEs | large 2026 empirical preprint revision | Moderate–High descriptive | descriptive, not causal; three ecosystems |
| Configuration smells are widespread in sampled AGENTS/CLAUDE files | dos Santos et al. | SCAM 2026 / arXiv | High for study definitions | heuristics / sample selection; conflict detector only 57% precision |
| Evolution context is often absent from manifests | Evolution Context Gap | JCSSE 2026 peer-reviewed | Moderate | 80 manifests; classifier-based taxonomy |
| Active repository context gathering can improve contextual verification | Agentic Rubrics | ACL 2026 peer-reviewed | High for evaluated setup | rubric verifier is still model-based; not direct instruction adherence |
| Long / conflicting / compacted instructions can lose adherence | Claude official docs + prior long-context research | official + academic | High for general risk | exact thresholds model/product dependent |

---

# 35. Source register

## Current product / format sources

1. AGENTS.md open format
   - https://agents.md/

2. OpenAI — `Unrolling the Codex agent loop`
   - https://openai.com/index/unrolling-the-codex-agent-loop/

3. OpenAI — `Introducing Codex` / AGENTS.md instruction scope
   - https://openai.com/index/introducing-codex/

4. Anthropic — `How Claude remembers your project`
   - https://code.claude.com/docs/en/memory

5. Anthropic — `Debug your configuration`
   - https://code.claude.com/docs/en/debug-your-config

6. Anthropic — `Explore the context window`
   - https://code.claude.com/docs/en/context-window

7. Gemini CLI — `Provide Context with GEMINI.md Files`
   - https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html

8. GitHub — custom-instruction support matrix
   - https://docs.github.com/en/copilot/reference/custom-instructions-support

9. GitHub — repository custom instructions
   - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions

10. GitHub — Copilot CLI custom instructions
    - https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions

11. GitHub — response customization / precedence
    - https://docs.github.com/en/copilot/concepts/prompting/response-customization

12. VS Code — custom instructions
    - https://code.visualstudio.com/docs/agent-customization/custom-instructions

13. VS Code — AI settings
    - https://code.visualstudio.com/docs/agents/reference/ai-settings

14. Cursor — Rules
    - https://cursor.com/docs/rules

## Context-file effectiveness / repository guidance

15. Thibaud Gloaguen et al. — `Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?`
    - arXiv:2602.11988
    - ICLR 2026 Workshop on Memory for LLM-Based Agentic Systems
    - https://arxiv.org/abs/2602.11988
    - https://www.sri.inf.ethz.ch/publications/gloaguen2026agentsmd

16. Prakhar Khatri — `Do Context Files Help Coding Agents? A Two-Agent Ablation Study on Real Repositories`
    - 2026 preprint
    - https://arxiv.org/abs/2607.27250

17. Jai Lal Lulla et al. — `On the Impact of AGENTS.md Files on the Efficiency of AI Coding Agents`
    - ICSE JAWs 2026
    - https://arxiv.org/abs/2601.20404

18. Asa Shepard, Jeannie Albrecht — `Probe-and-Refine Tuning of Repository Guidance for Coding Agents`
    - 2026 preprint
    - https://arxiv.org/abs/2606.20512

## Manifest structure / maintenance

19. Worawalan Chatlatanagulchai et al. — `Agent READMEs: An Empirical Study of Context Files for Agentic Coding`
    - arXiv:2511.12884, current 2026 revision reviewed
    - https://arxiv.org/abs/2511.12884

20. Hélio Victor F. dos Santos et al. — `Configuration Smells in AGENTS.md Files: Common Mistakes in Configuring Coding Agents`
    - SCAM 2026 / arXiv:2606.15828
    - https://arxiv.org/abs/2606.15828

21. Chondamrongkul et al. — `Evolution Context Gap: An Empirical Study of Agent Manifests`
    - JCSSE 2026
    - DOI: 10.1109/JCSSE68839.2026.11597070

## Repository exploration / context-grounded verification

22. Shaoqiu Zhang et al. — `SWE-Explore: Benchmarking How Coding Agents Explore Repositories`
    - 2026 preprint
    - https://arxiv.org/abs/2606.07297

23. Mohit Raghavendra et al. — `Agentic Rubrics as Contextual Verifiers for SWE Agents`
    - ACL 2026 Long Papers
    - https://aclanthology.org/2026.acl-long.697/

---

# 36. Research gaps deliberately left open

The following adjacent questions remain open:

- whether an agent can produce **verifiable receipts that specific required files / exact blob revisions were read**,
- whether loaded-instruction traces can be standardized across coding-agent products,
- proving that an LLM **used** a loaded instruction rather than merely received it,
- atomic Rule extraction from repository prose,
- direct benchmarks for nested `AGENTS.md` inheritance failures,
- direct benchmarks for README / REQUIREMENTS / SPEC discovery,
- cross-agent comparison using the exact same canonical rule universe,
- current Claude / Codex / Copilot / Gemini / Cursor adherence under conflicting equivalent adapters,
- how context compaction affects repository-rule adherence over long coding trajectories,
- whether changing working directory changes effective rule sets unexpectedly,
- how subagents inherit / omit parent instruction files,
- instruction handling when the agent creates a new package / directory during the task,
- multi-worktree / monorepo instruction discovery,
- branch-switch / checkout behavior during an active agent run,
- stale instruction invalidation after repository changes,
- semantic drift detection between canonical Owner Docs and thin tool-specific manifests,
- automatic Rule→path applicability derivation,
- rule routing when one task touches files governed by multiple local instruction sets,
- conflict handling between repository manifests and current user requests,
- malicious / prompt-injected repository instruction files,
- trust boundaries for untrusted cloned repositories,
- whether instruction manifests can become an attack vector against tool-using agents,
- deterministic enforcement of `must read before edit` rules,
- repository-instruction coverage metrics,
- whether rule-manifest mutation testing can expose missing / weak instructions,
- whether probe-and-refine overfits to synthetic failure distributions,
- cost models for static context vs on-demand routing,
- empirical comparison of router-based Owner Doc loading vs always-injecting a large Guide,
- final integration with evidence receipts / stale evidence / Rule→Verifier coverage.

---

# 37. Current research stopping point

For this theme, the current evidence is sufficient to preserve the following conclusions without moving into adoption:

1. repository instruction adherence is a multi-stage pipeline: support → discovery → loading → scope / precedence → retrieval → application → validation;
2. a repository file's existence does not prove a particular coding-agent product / surface will load it;
3. current major coding agents use materially different filenames, loading rules, scope models, limits, and precedence behavior;
4. nested / path-specific rules can make the applicable instruction set change as the agent explores or edits new parts of a repository;
5. some products expose instruction-loader diagnostics, which can prove delivery more strongly than model self-report;
6. loader evidence still does not prove semantic adherence or final correctness;
7. direct 2026 research shows coding agents can behaviorally follow repository context instructions without materially improving task success;
8. LLM-generated context files can increase exploration / testing / reasoning / cost while producing no significant resolution gain;
9. developer-written context files show modest but non-significant average improvement over no context in one broad study;
10. a separate controlled two-agent study likewise finds no measurable correctness effect, with important power / sample limitations;
11. another study reports meaningful efficiency improvements, so operational effects are not settled;
12. failure-informed probe-refined guidance can substantially improve one model's repository-task resolution, mainly through better coverage / localization rather than better patch precision;
13. the same guidance can transfer poorly across model families, so guidance effectiveness is not model-independent;
14. repository exploration is itself a measurable upstream capability and remains imperfect at fine-grained localization;
15. empirical manifest studies show strong content coverage for testing / implementation / architecture but much weaker coverage for security / performance / UX;
16. instruction manifests are evolving configuration artifacts and can become stale, bloated, contradictory, duplicated, or filled with blind references;
17. LLM-based detection of instruction conflicts is itself imperfect;
18. README / Requirements / Spec files are not guaranteed to enter model context merely because they are present in git;
19. static manifests do not replace active repository inspection or deterministic validation;
20. current evidence therefore does not support treating `AGENTS.md exists` or `agent said it read the rules` as proof that the current task was governed by the complete correct Rule universe;
21. at the same time, repository guidance can be useful for non-obvious operational knowledge, localization, consistency, and efficiency under some conditions;
22. the natural next research step is to investigate **retrieval / routing and structured external memory** more directly: how to select the right small subset from a large Rule universe without silently omitting applicable rules.

This is enough to stop this single theme without designing the final Guide architecture.

**No Common Rule, AGENTS.md requirement, CLAUDE.md adapter, GEMINI.md adapter, Copilot instruction file, nested-instruction hierarchy, maximum file length, Router redesign, read-receipt requirement, instruction coverage threshold, or adoption decision is created by this file.**