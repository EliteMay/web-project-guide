# Phase 3 — Architecture Decision System Research

## Status

- Research phase: completed for decision-model design
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Baseline `main`: `013d2031db3023a1de68e9b074beeca45cc28735`
- Working contract: GitHub Issue #49
- Primary normative owner candidate: `docs/02-architecture.md`
- General research method owner: `docs/20-evidence-first-research.md`
- Promotion / rule-hygiene owner: `docs/14-continuous-improvement.md`

This file is **non-normative research evidence**. It does not itself create Common MUST/SHOULD rules. Promotion decisions must be made against the current Guide, owner boundaries, rule budget, and validation requirements.

---

## 1. Research Question

How should a small-team / individual Web, Web App, Electron, or Browser Game project choose, maintain, and revise its architecture so that:

- it avoids unnecessary complexity,
- it does not remain artificially simple after the codebase has outgrown that structure,
- changes stay local and understandable,
- state and dependencies have clear ownership,
- refactoring / technical-debt work is economically justified,
- rewrites are neither the default nor forbidden when truly necessary,
- and AI coding agents do not gradually fragment the architecture through repeated local patches?

The research intentionally asks for **decision criteria**, not a universal framework, folder tree, architecture style, or line-count threshold.

---

## 2. Research Method / Coverage

Research followed the current `docs/20-evidence-first-research.md` approach: broad discovery, original / official sources where available, supporting and opposing evidence, context / applicability checks, and synthesis into an Evidence Map.

### Research count transparency

Approximate counts for this phase:

- **Discovered:** 100+ raw search candidates across multiple query batches, including duplicates and secondary references
- **Reviewed:** 45+ distinct source pages / abstracts / official guidance pages at page or abstract level
- **Deep-read:** no full academic-paper cover-to-cover read was required for the current decision model; multiple official / practitioner long-form pages were reviewed in detail, while most academic evidence was reviewed at abstract / results / discussion excerpt level
- **Core evidence:** roughly 20–25 sources materially influenced the synthesis below

These counts are not quality scores. Search saturation was judged by whether new searches produced materially new decision principles rather than repeated formulations of already identified trade-offs.

### Evidence classes used here

- **Strong / established:** multiple strong sources or official + empirical support; suitable for Common Rule consideration
- **Moderate / contextual:** useful principle with material context dependence; usually SHOULD / CONDITIONAL candidate rather than universal MUST
- **Weak / working hypothesis:** useful as a diagnostic or experiment candidate but not ready for strong Common Rule promotion

---

## 3. Evidence Map

## Established / Strong

### E-01 — A framework is a means of buying conventions and solved UI coordination problems, not a default quality upgrade

MDN explicitly treats framework choice as project- and team-dependent, warns that a framework may be unnecessary for low-interactivity sites, and highlights learning, runtime, abstraction, accessibility, and performance costs. Frameworks can provide predictable conventions and reduce repeated UI coordination work, especially in highly dynamic applications.

**Implication:** decide `framework needed?` before `which framework?`.

**Evidence strength:** Strong for the general trade-off; exact break-even point is context-dependent.

### E-02 — SPA / MPA / hybrid is a rendering and navigation trade-off, not a maturity ladder

web.dev distinguishes browser-native MPA navigation from SPA client-side rendering and documents different loading / interactivity trade-offs. It also explicitly supports hybrid approaches where different pages or routes use different rendering strategies.

**Implication:** `Web App = SPA` is not a defensible default. Content-first / low-interactivity paths can stay browser-native while interaction-heavy paths use richer client rendering.

**Evidence strength:** Strong.

### E-03 — Single Source of Truth means one owner per fact, not one global store for the whole application

React's current documentation states that each unique piece of state should have an owner and explicitly says this does not mean all state must live in one place. React also recommends avoiding redundant and duplicated state. Redux's official guidance likewise says local state should generally remain local and that not every application needs Redux.

**Implication:** state should be classified and owned locally unless sharing / synchronization cost justifies promotion.

**Evidence strength:** Strong as a state-ownership principle; framework-specific APIs are not generalized.

### E-04 — Modular boundaries should be based on information hiding / change boundaries, not arbitrary file size

Parnas' classic modularity work argues that modularization quality depends on the criteria used to decompose the system, with information hiding as the central idea. Later empirical work on coupling / co-change shows that dependency structure and actual change propagation both matter when judging evolvability.

**Implication:** module boundaries should hide decisions likely to change and should localize real changes. File length can be a prompt to inspect, but not a universal split rule.

**Evidence strength:** Strong for information-hiding / change-locality principles.

### E-05 — Cycles, hubs, god components, dense structure, and scattered functionality are useful architecture-health signals, but not automatic verdicts

Multiple empirical studies associate architectural smells with maintainability / testability problems, change propagation, and architecture erosion. However, other research and practitioner evidence show that detected smells can be context-sensitive or false positives; callback / notification patterns can intentionally create apparent cycles.

**Implication:** architecture smells should trigger diagnosis. They should be combined with change history, bug history, real dependency / co-change evidence, and project context before refactoring decisions.

**Evidence strength:** Strong for `signal, not verdict`.

### E-06 — Refactoring is incremental, behavior-preserving restructuring with an economic purpose

Fowler defines refactoring as changing internal structure without changing observable behavior, using small transformations that keep the system working. Preparatory refactoring is justified when it makes an upcoming change cheaper / safer. Fowler also explicitly warns against refactoring stable code merely for aesthetic reasons.

**Implication:** `cleaner code` alone is insufficient justification for broad refactoring. Expected reduction in future change cost / risk is the important reason.

**Evidence strength:** Strong practitioner consensus / long-established method.

### E-07 — Technical debt is future change liability, and some debt can be intentional

SEI defines technical debt around expedient design / implementation that makes future work costlier or impossible. SEI also treats intentional debt as potentially useful when the short-term value is explicit and repayment / risk is managed.

**Implication:** `dirty code`, `TODO`, and `technical debt` should not be synonyms. A debt item should identify a future cost / constraint that matters.

**Evidence strength:** Strong.

### E-08 — Incremental replacement is a major risk-reduction option between refactor and full rewrite

Fowler's Strangler Fig and Branch-by-Abstraction patterns, together with current Azure / AWS modernization guidance, provide a middle path where old and new implementations coexist behind a controlled boundary during migration. This preserves service while reducing cutover risk.

**Implication:** decision ladders should include `incremental replacement / restructure` instead of collapsing everything into `patch vs rewrite`.

**Evidence strength:** Strong for large / important systems; exact technique depends on project shape.

### E-09 — Event collaboration buys decoupling but hides control flow

Fowler's event-collaboration writing and current event-driven architecture guidance agree on the central trade-off: producers can become less coupled to specific consumers, while system-wide flow, ordering, debugging, consistency, and recovery become harder to reason about.

**Implication:** direct request / function-call flow should remain available as the simpler option; events are justified when independent reactions / subscriber extensibility are real needs.

**Evidence strength:** Moderate to strong for the trade-off; distributed-system operational concerns must not be copied mechanically into in-browser code.

### E-10 — Passing current tests is not enough evidence that repeated AI-authored changes preserve architecture health

2025–2026 empirical work on coding agents reports that agents can perform useful refactorings, but also that AI-authored code can introduce code smells and persistent maintenance issues. SlopCodeBench specifically evaluates repeated extension and reports progressive verbosity / structural erosion even while checkpoint functionality is tested. A separate large-scale study of verified AI-authored commits reports substantial introduced issues and a non-trivial survival rate at latest revision.

**Implication:** AI-assisted development needs architecture / maintainability checks in addition to current functional correctness. The Guide's existing `read current architecture before changing` direction is supported.

**Evidence strength:** Moderate and emerging. The field is moving quickly and several key studies are preprints / new empirical datasets.

---

## Context-dependent / Moderate

### C-01 — Feature-based vs layer-based structure

Evidence supports cohesion, low coupling, information hiding, and change localization, but does **not** establish one universal folder strategy. Practitioner architecture guidance often favors feature / component packaging when it reduces public surface and keeps related change together. Layering remains useful where layer-wide responsibilities, infrastructure substitution, or clear technical ownership are the dominant change boundary.

**Working conclusion:** prefer the structure that matches the actual change boundary. A practical hybrid is often `feature/domain outer boundary + small internal layers + shared/core/infrastructure only when genuinely cross-cutting`.

### C-02 — Global state library adoption

Official Redux guidance gives clear cases where a central store becomes more useful: state needed in many places, frequent updates, complex update logic, larger codebase / team. This is useful evidence, but exact thresholds are framework- and project-dependent.

**Working conclusion:** adopt a global store only after local ownership and explicit sharing become materially harder to maintain.

### C-03 — Rewrite

Sacrificial Architecture provides an important counterexample to `never rewrite`: early systems built under high uncertainty may rationally be replaced after requirements / scale become clearer. At the same time, legacy-replacement guidance emphasizes hidden behavior, migration risk, and incremental alternatives.

**Working conclusion:** rewrite is a bounded economic / risk decision, not a moral judgment about old code. New-team dislike of existing style is weak evidence; inability of the current architecture / platform to meet required qualities can be strong evidence.

### C-04 — Architecture metrics

Propagation cost, cycle analysis, co-change clustering, smells, size, churn, and complexity can all provide evidence. No single metric reliably decides architecture quality by itself.

**Working conclusion:** use a small set of signals to find where to inspect, then diagnose with real change history and project requirements.

---

## Disputed / Should not become universal rules

- Fixed LOC / file-count thresholds for component or module splitting
- `Use React/Vue once the project has N screens`
- `All Web Apps should be SPA`
- `All state should be global`
- `All cycles are bugs`
- `Feature-based folders are always superior to layers`
- `Event-driven architecture is inherently more decoupled and therefore better`
- `Technical debt must always be repaid immediately`
- `Rewrite is always dangerous` / `Rewrite is cleaner so it is better`
- Architecture-quality score based on one static metric
- Passing functional tests as sufficient validation of long-horizon AI-generated architecture

---

## Unknown / Open Research

- A universal quantitative break-even threshold for Vanilla JS → framework migration
- A universal threshold for local state → shared/global state
- A reliable single-number `Architecture Health Score` that predicts future maintenance cost across small Web / Electron / game projects
- A general quantitative threshold for when repeated patching becomes cheaper to replace than refactor
- The long-term effect of modern autonomous coding agents on architecture across years rather than benchmark checkpoints / short repository histories
- Whether AI-specific architecture metrics should differ materially from ordinary maintainability metrics, beyond increased emphasis on duplication / structural erosion / context loss

These should remain Unknown or project-specific experiments rather than Common numeric rules.

---

# 4. Proposed Architecture Decision Model

The research supports a **progressive decision model** rather than selecting an architecture once at project creation.

```text
Project Context
↓
Smallest Sufficient Baseline
↓
State / Ownership Map
↓
Module / Component Boundaries
↓
Dependency / Collaboration Style
↓
Observe Change Cost + Architecture Signals
↓
Keep / Repair / Refactor / Incrementally Replace / Rewrite
↓
Validate current behavior + future changeability
```

## Step 1 — Project Context

Evaluate concrete forces before choosing a framework / SPA / state library:

- Is the product mostly documents/content or an interaction-heavy workspace?
- Does the user need persistent in-page workflow across many views?
- Does navigation need shareable / reload-safe URLs?
- How much state is local vs shared vs persistent vs external?
- What must work on static hosting / offline / constrained devices?
- Is the app public-content / SEO-sensitive or primarily authenticated / app-like?
- What does the project actually change most often: features, technical layers, data model, integrations, UI shell?
- What compatibility / save / deployment constraints already exist?
- How much architecture context can the human / AI contributor reliably load before changing code?

## Step 2 — Smallest Sufficient Baseline

Start with the least architecture that already satisfies current requirements **without creating known repeated coordination problems**.

This is not `always Vanilla JS`. It means:

- use platform primitives when they already solve the problem clearly,
- use a framework when its conventions remove real repeated UI / state / rendering complexity,
- use browser navigation / MPA where it already matches the information structure,
- use SPA / hybrid where persistent interactive workflow creates real value,
- avoid introducing global stores, event buses, DI containers, or generic service layers without an identified problem they solve.

## Step 3 — State / Ownership Map

For every material piece of state, classify it before deciding storage location:

- Local UI state
- Shared application state
- Derived state
- URL / navigation state
- Persistent state
- External / server state
- Async status / error / loading state

Rules suggested by evidence:

1. Each fact has one authoritative owner.
2. Derived values are computed where practical instead of duplicated as independent state.
3. State stays near the smallest owner that needs to mutate it.
4. Promote state outward only when sharing / coordination is real and repeated.
5. Persistent storage is not the same responsibility as in-memory state ownership.
6. DOM and application state should not both become competing authorities for the same fact.

## Step 4 — Module / Component Boundaries

Choose boundaries by **responsibility + hidden decision + change locality**.

Good boundary questions:

- What can change without forcing unrelated code to change?
- What implementation decision should other modules not know?
- Which code repeatedly changes together?
- Who owns this state / lifecycle / DOM / external integration?
- Can a consumer use a small public interface instead of reaching into internals?

Avoid splitting purely because a file is long. Avoid merging purely because files are small.

### Feature-based / layer-based working rule

- If changes usually arrive as independent user features, feature/domain boundaries deserve priority.
- If the key replacement / ownership boundary is technical infrastructure, a layer can be the useful boundary.
- A hybrid is legitimate: feature/domain outer boundaries, small internal layers, and a deliberately small shared/core surface.

## Step 5 — Dependency / Collaboration Style

Use the most explicit collaboration style that satisfies the need.

### Direct request / function call

Prefer when:

- the caller intentionally needs one known collaborator to act / answer,
- the flow should be easy to trace,
- the collaboration is local and synchronous or naturally awaited,
- subscriber extensibility is not a requirement.

### Event / publish-subscribe

Consider when:

- the publisher should not know which consumers react,
- multiple independent reactions are expected,
- new consumers should be attachable without modifying the producer,
- asynchronous / eventual reactions are acceptable.

When using events, make event contracts explicit. Do not disguise required commands as vague notifications. Traceability / ordering / duplicate-listener / cleanup behavior needs deliberate validation.

## Step 6 — Architecture Health Signals

Treat these as **diagnostic signals**, not pass/fail scores:

### Dependency signals

- cyclic dependencies
- hub-like dependency
- unstable dependency
- feature code reaching across multiple unrelated feature internals
- external integrations leaking directly into many UI modules

### Responsibility signals

- god module / god component
- scattered functionality
- multiple modules claiming ownership of the same state / DOM / rule
- `utils.js` / `common.js` becoming an unbounded dumping ground

### Change-history signals

- one small feature repeatedly requires unrelated files to co-change
- a component is both frequently changed and highly depended on
- the same bug pattern recurs in several implementations
- patches / overrides / observers accumulate around the same responsibility
- initialization order becomes a hidden contract

### State / event signals

- duplicated / mirrored state repeatedly gets out of sync
- duplicate listeners / duplicate events appear
- event-driven flows cannot be reconstructed from code without runtime tracing

### AI-assisted signals

- new implementation appears although an equivalent module already exists
- agents repeatedly create alternate naming / folder / state patterns
- each iteration adds code faster than it consolidates existing responsibilities
- tests pass while complexity concentrates into a few large functions / modules

A signal becomes more urgent when several indicators co-locate **and** real change / bug / test evidence shows cost.

---

# 5. Intervention Ladder

The research supports separating five actions.

## 1. KEEP

Use when:

- required changes remain local,
- architecture signals are low-cost or contextual false positives,
- current structure is understandable enough for future work,
- replacing structure would not recover its cost.

## 2. LOCAL REPAIR

Use when:

- the failure is isolated,
- the responsible owner / boundary is already clear,
- no repeated structural pattern is causing the issue.

Do not turn a local bug into an architecture project.

## 3. REFACTOR

Use when:

- observable behavior is basically correct,
- internal structure makes the current / expected next change unnecessarily expensive or risky,
- behavior can be protected by suitable tests / characterization / verification,
- small transformations can improve the structure without forcing a migration program.

Preparatory refactoring is especially justified when it makes an upcoming feature materially easier.

## 4. RESTRUCTURE / INCREMENTAL REPLACEMENT

Use when:

- the responsibility boundary itself must change,
- a framework / storage / integration / subsystem needs replacement,
- the product must remain operational during migration,
- old and new implementations can coexist behind an abstraction / façade / adapter for a bounded period.

Require an explicit retirement / cutover path so parallel runtime does not become permanent debt.

## 5. REWRITE

Consider only when evidence shows that bounded replacement is economically / technically stronger than continued restructuring.

Positive signals can include:

- core requirements / scale / platform assumptions are fundamentally different from those the current architecture was built for,
- required quality attributes cannot be reached reasonably through local / incremental change,
- architecture constraints are system-wide rather than concentrated at a replaceable boundary,
- the real existing behavior is sufficiently understood and can be validated,
- save / data / URL / external compatibility can be migrated or intentionally retired,
- cutover and rollback can be defined.

Negative signals:

- a new contributor dislikes the style,
- a new framework is fashionable,
- tests / hidden behavior are poorly understood,
- the rewrite duplicates the old runtime indefinitely,
- the only justification is `writing fresh code feels faster`.

A small sacrificial prototype can legitimately be rewritten when its purpose was learning and its constraints changed materially. This does not generalize to rewriting mature systems.

---

# 6. Technical Debt Decision Model

Treat debt as a **specific future-change liability**, not a cleanliness backlog.

A meaningful debt item should answer:

- Where is the debt?
- What short-term decision created / accepted it?
- What future change / quality is made harder?
- What evidence shows actual or plausible interest?
- When should it be repaid?
- What is the smallest repayment / containment option?

### Repay now

Prefer when:

- an imminent feature is directly blocked / made much riskier,
- debt creates security / data / release / severe reliability risk,
- the same debt is already generating recurring repair cost,
- repayment is small relative to the next avoided cost.

### Track / defer

Reasonable when:

- the affected area is stable and unlikely to change,
- debt was intentionally taken to validate uncertain value,
- repayment cost is high and current interest is low,
- there is a clear trigger that will cause reevaluation.

### Do not create a heavy Debt Register by default

For small projects, ordinary Issue / TODO / Work Report mechanisms can be enough if the debt item is explicit. A dedicated register should only exist when debt volume / prioritization complexity justifies the maintenance cost.

---

# 7. AI-assisted Development Implications

The strongest AI-specific research result is **not** `AI needs a special architecture`. It is that iterative AI work increases the value of preserving architecture context and measuring extension quality.

Candidate safeguards:

1. Read current architecture / runtime / owner boundaries before generating a new pattern.
2. Search for existing implementations before adding a new service / store / event / helper.
3. Prefer modifying the formal owner rather than adding a post-hoc patch layer.
4. Keep diffs bounded enough that the architecture impact can be reviewed.
5. Validate not only behavior, but also duplication, concentrated complexity, dependency direction, and responsibility ownership on meaningful iterative changes.
6. Do not infer `tests pass → architecture healthy`.
7. If repeated AI iterations produce alternative implementations / structural erosion, stop patch accumulation and run an architecture-health diagnosis.
8. Framework migration / rewrite remains a high-cost project decision; AI generation speed is not evidence that migration risk disappeared.

This aligns with the existing Guide's emphasis on Current Repository / architecture reads, smallest safe change, and avoiding versioned patch chains.

---

# 8. Proposed Common Rule Candidates

These are **promotion candidates**, not yet normative rules.

## Candidate A — Smallest Sufficient Architecture

Use the smallest architecture that satisfies current requirements and current known change patterns, but re-evaluate when real change cost / architectural signals show that the existing structure is no longer sufficient.

Likely owner: `docs/02-architecture.md`

Likely strength: SHOULD

## Candidate B — Decision before technology

Before adding a framework, global state library, event bus, or DI abstraction, name the recurring problem it is expected to solve and verify that simpler current mechanisms are no longer sufficient.

Likely owner: `docs/02`; package lifecycle remains `docs/13`.

Likely strength: SHOULD / CONDITIONAL

## Candidate C — State owner per fact

Each material state fact should have one authoritative owner. Local state remains local by default; derived state should not be duplicated without a clear reason; promotion to shared state occurs when multiple consumers genuinely need coordinated mutation / access.

Likely owner: `docs/02` with persistence boundary link to `docs/03`.

Likely strength: SHOULD, with some MUST-level duplicate-authority cases considered only if failure evidence justifies it.

## Candidate D — Boundary by change / information hiding

Component / module boundaries should primarily reflect responsibility, ownership, hidden implementation decisions, and change locality rather than fixed file length / line count.

Likely owner: `docs/02`.

Likely strength: SHOULD.

## Candidate E — Events as conditional collaboration

Prefer explicit direct collaboration for simple known flows. Use event-driven collaboration when producer independence / multiple independent consumers provide real value, and require explicit event contracts / ownership where events materially affect application state.

Likely owner: `docs/02`.

Likely strength: SHOULD / CONDITIONAL.

## Candidate F — Architecture signals require diagnosis

Cycles, hubs, god components, scattered functionality, high co-change, duplicated authority, and patch chains are signals for architecture review. They are not independent proof that a rewrite or refactor is required.

Likely owner: `docs/02`, with Legacy / patch specifics linked to `docs/09`.

Likely strength: SHOULD.

## Candidate G — Economic refactoring trigger

Refactor when internal structure materially increases the cost / risk of an expected change, and prefer small behavior-preserving steps with suitable regression protection.

Likely owner: `docs/02` + testing link to `docs/07`.

Likely strength: SHOULD.

## Candidate H — Five-level intervention ladder

Distinguish `Keep → Local Repair → Refactor → Incremental Restructure / Replacement → Rewrite` and choose the smallest action that resolves the actual structural problem.

Likely owner: `docs/02`, with migration / legacy boundary links to `docs/03`, `docs/09`, `docs/10` as applicable.

Likely strength: SHOULD.

## Candidate I — Technical debt is future-change liability

Do not classify every code smell or cleanup wish as technical debt. Track debt when a current design / implementation decision creates meaningful future change cost / constraint; intentional debt may be accepted with an explicit reevaluation trigger.

Likely owner: architecture debt in `docs/02`; version / legacy-specific items in `docs/09`; project work tracking in `docs/10`.

Likely strength: SHOULD.

## Candidate J — AI long-horizon architecture guard

For meaningful repeated AI-authored changes, functional tests alone are insufficient completion evidence when the diff changes architecture shape. Review duplication, responsibility ownership, dependency direction, and concentrated complexity / patch accumulation as appropriate.

Likely owner: `docs/02` principle + `docs/07` verification specifics + `docs/10` AI workflow.

Likely strength: CONDITIONAL SHOULD. Evidence is emerging and should not be overstated.

---

# 9. Owner Boundary Recommendation

Research does **not** justify a new Architecture Owner at this point.

Keep:

- architecture decisions / responsibility / state ownership / module boundary / collaboration / refactor-vs-rewrite decision → `docs/02`
- persistence / schema / save migration → `docs/03`
- runtime performance / reliability measurement → `docs/05`
- verification / regression / architecture-test methods → `docs/07`
- version / legacy runtime / patch retirement → `docs/09`
- existing-project workflow / branch / PR / AI handoff → `docs/10`
- dependency package / CDN / asset lifecycle → `docs/13`
- rule promotion / hygiene → `docs/14`
- research method → `docs/20`
- routing → `docs/21`

The next implementation should strengthen `docs/02` and add only short cross-owner links where needed.

---

# 10. Representative Validation Cases for the Decision Model

The final normative implementation should be tested against at least these cases.

## Case 1 — Small public study site

- Mostly content pages
- A few filters / quizzes
- Static GitHub Pages
- Little shared state

Expected: Vanilla / native modules + MPA or modest client enhancement remains a valid choice. Framework / SPA not mandatory.

## Case 2 — Interaction-heavy workspace

- Persistent UI shell
- Many dynamic components
- State shared across distant UI areas
- Frequent in-page transitions

Expected: framework + explicit shared-state solution can be justified if it removes repeated coordination complexity.

## Case 3 — Existing Vanilla app with patch chain

- multiple overrides / MutationObservers
- same state duplicated
- a feature requires edits across many unrelated files

Expected: architecture review + refactor / restructure before another patch. Framework rewrite is not automatic.

## Case 4 — Event bus introduced for two local components

Expected: direct call / explicit controller likely simpler unless producer independence or multiple independent reactions are expected.

## Case 5 — Mature app with dependency cycle

Expected: inspect context, co-change, bugs, responsibilities, and callback / event intent. Do not automatically rewrite solely because a cycle is detected.

## Case 6 — Technical debt in stable feature

- ugly but isolated code
- almost never changes
- no current risk

Expected: may remain deferred; cleanup is not automatically higher priority than user value.

## Case 7 — Framework migration

- current framework obsolete
- large app still in active use
- behavior can be captured
- routes can be migrated gradually

Expected: incremental replacement / Branch-by-Abstraction / Strangler-style boundary considered before big-bang rewrite.

## Case 8 — Sacrificial prototype

- initial architecture intentionally optimized for learning
- product requirements changed fundamentally
- small codebase / low compatibility risk

Expected: bounded rewrite may be the economically correct choice.

## Case 9 — AI iterative feature work

- tests remain green
- repeated turns add duplicate helpers and concentrate logic in large modules

Expected: architecture-health failure despite functional pass; stop patching and diagnose / consolidate.

---

# 11. Core Sources

## Web platform / frameworks / rendering

- MDN, **Introduction to client-side frameworks**  
  https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/Introduction
- MDN, **JavaScript frameworks and libraries**  
  https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries
- web.dev, **Rendering on the Web**  
  https://web.dev/articles/rendering-on-the-web
- web.dev, **Client-side rendering of HTML and interactivity**  
  https://web.dev/articles/client-side-rendering-of-html-and-interactivity
- web.dev, **PWA Architecture — SPA versus MPA**  
  https://web.dev/learn/pwa/architecture
- MDN, **JavaScript modules**  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

## State management

- React, **Choosing the State Structure**  
  https://react.dev/learn/choosing-the-state-structure
- React, **Sharing State Between Components**  
  https://react.dev/learn/sharing-state-between-components
- Redux, **Redux Fundamentals — When Should I Use Redux?**  
  https://redux.js.org/tutorials/fundamentals/part-1-overview
- Redux, **Style Guide — Evaluate Where Each Piece of State Should Live**  
  https://redux.js.org/style-guide/

## Modularity / dependencies / architecture smells

- D. L. Parnas, **On the criteria to be used in decomposing systems into modules** (1972)  
  https://doi.org/10.1145/361598.361623
- Geipel & Schweitzer, **The Link between Dependency and Cochange: Empirical Evidence**  
  https://www.sg.ethz.ch/publications/2012/geipel2012the-link-between/
- Silva et al., **Co-change patterns: A large scale empirical study**  
  https://doi.org/10.1016/j.jss.2019.03.014
- Sas et al., **On the evolution and impact of architectural smells—an industrial case study**  
  https://link.springer.com/article/10.1007/s10664-022-10132-7
- **Evolution patterns of software-architecture smells** (JSS, 2024)  
  https://doi.org/10.1016/j.jss.2024.112170
- **An empirical investigation of the impact of architectural smells on software maintainability** (JSS, 2025)  
  https://doi.org/10.1016/j.jss.2025.112382
- Feng et al., **An Empirical Study of Untangling Patterns of Two-Class Dependency Cycles**  
  https://arxiv.org/abs/2306.10599
- Jafari et al., **Dependency Smells in JavaScript Projects**  
  https://arxiv.org/abs/2010.14573
- Simon Brown, **Modular monolith / package by feature, component, ports and adapters discussion**  
  https://simonbrown.je/modular-monolith/

## Events

- Martin Fowler, **What do you mean by Event-Driven?**  
  https://martinfowler.com/articles/201701-event-driven.html
- Martin Fowler, **Event Collaboration**  
  https://martinfowler.com/eaaDev/EventCollaboration.html
- Microsoft Azure Architecture Center, **Event-Driven Architecture Style**  
  https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven
- MDN, **CustomEvent**  
  https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent

## Refactoring / rewrite / modernization

- Martin Fowler, **Refactoring**  
  https://martinfowler.com/books/refactoring.html
- Martin Fowler, **Preparatory Refactoring**  
  https://martinfowler.com/articles/preparatory-refactoring-example.html
- Martin Fowler, **Branch By Abstraction**  
  https://martinfowler.com/bliki/BranchByAbstraction.html
- Martin Fowler, **Original Strangler Fig Application**  
  https://martinfowler.com/bliki/OriginalStranglerFigApplication.html
- Martin Fowler, **Sacrificial Architecture**  
  https://martinfowler.com/bliki/SacrificialArchitecture.html
- Microsoft Azure Architecture Center, **Strangler Fig pattern**  
  https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig
- AWS Prescriptive Guidance, **Strangler fig pattern**  
  https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/strangler-fig.html

## Technical debt

- CMU SEI, **Managing Technical Debt in Complex Software Systems**  
  https://www.sei.cmu.edu/library/managing-technical-debt-in-complex-software-systems/
- CMU SEI, **Architectural Technical Debt Library**  
  https://www.sei.cmu.edu/library/architectural-technical-debt-library/
- CMU SEI, **Developing an Architecture-Focused Measurement Framework for Managing Technical Debt**  
  https://www.sei.cmu.edu/blog/developing-an-architecture-focused-measurement-framework-for-managing-technical-debt/
- CMU SEI, **Data-Driven Management of Technical Debt**  
  https://www.sei.cmu.edu/blog/data-driven-management-of-technical-debt/

## AI-assisted development — emerging evidence

- Orlanski et al., **SlopCodeBench: Benchmarking How Coding Agents Degrade Over Long-Horizon Iterative Tasks** (2026 preprint)  
  https://arxiv.org/abs/2603.24755
- Liu et al., **Debt Behind the AI Boom: A Large-Scale Empirical Study of AI-Generated Code in the Wild** (2026 preprint)  
  https://arxiv.org/abs/2603.28592
- Horikawa et al., **Agentic Refactoring: An Empirical Study of AI Coding Agents** (2025 preprint)  
  https://arxiv.org/abs/2511.04824
- Sawada et al., **To What Extent Does Agent-generated Code Require Maintenance?** (2026 preprint)  
  https://arxiv.org/abs/2605.06464

---

# 12. Research Conclusion

The central result is that Phase 3 should not become a catalog of fashionable architecture patterns. The strongest cross-source principle is:

> **Architecture is a continuously revised set of ownership and dependency decisions whose quality is judged by how safely and locally the system can change.**

For this Guide, the practical default should be:

```text
Smallest Sufficient Architecture
+ clear owner per state / responsibility
+ boundaries based on hidden decisions and change locality
+ explicit collaboration before implicit events
+ architecture smells as diagnostic signals
+ economically justified incremental refactoring
+ incremental replacement before unnecessary big-bang migration
+ bounded rewrite when evidence truly supports it
+ extra long-horizon structure checks for AI-assisted iteration
```

The next Phase 3 step is to convert only the strongest, low-overhead candidates into concise `docs/02-architecture.md` decision rules, while keeping research evidence in this file and avoiding duplicate normative text in `docs/09`, `docs/10`, `docs/13`, or `docs/20`.
