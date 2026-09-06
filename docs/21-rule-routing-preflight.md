# 21 Rule Routing / Preflight

この章はChatGPT / Coding Agentが作業開始前に**今回必要なOwner Docを選び、Current Revisionから実際に確認してから判断・実装へ進むための正本**です。

目的はGuide全文を毎回読むことでも、巨大Rule Engineを運用することでもありません。必要Ruleの読み忘れと過剰読込の両方を避けます。

Machine-readable Routingは [`maintenance/rule-router.json`](../maintenance/rule-router.json)、Human summaryは `START_HERE.md` です。

## Core Contract

### MUST: Meaningful / Systemic作業はPreflightする

```text
Current Repository / User Intent
↓
Work Type / Domain / Risk Signal
↓
rule-router.jsonからRequired Docs / Gatesを解決
↓
Required DocsをCurrent Revisionから読む
↓
Project側Source of Truthを必要範囲で読む
↓
Research / Decision / Implementation
↓
Validation
```

README / START_HEREだけを読んでRequired Ownerまで読了した扱いにしません。

Typo /明確な局所BugへFull Preflightを強制しませんが、関係する専門Ownerは必要範囲で確認します。

## User Rule Knowledge Independence / Agent Autonomy

UserがGuide章番号、Profile、Gate名を覚えていることを前提にしません。

Agent側で:

- Required Owner
- Meaningful Visual Change
- Researchable Question
- Save / Migration / Security等のRisk
- GAME / LEARNING / ELECTRON等のDomain
- Conversation Handoff / Recoveryの必要性

を分類します。

### MUST: Routerで解けることをUserへ聞かない

次を先に使います。

```text
Current Repository
+ Current Requirements / Rules
+ Existing User Intent
+ Project Learnings / Runtime Evidence
+ Current external evidence（必要時）
↓
Best Reasonable Decision
```

User Decisionの例外条件は [01 Requirements](01-requirements.md#user-decisionが本当に必要な条件) を正本とします。

High-cost / CoreというLabelだけでUser回答待ちにしません。

## Classification

### Work Type — 原則1つ

- `REQUIREMENTS`
- `RESEARCH`
- `IMPLEMENTATION`
- `BUG_FIX`
- `REVIEW`
- `DATA_CONTENT`
- `DEPLOYMENT`
- `MAINTENANCE`

### Domain — 必要なものだけ複数可

- `ARCHITECTURE`
- `DATA_STORAGE`
- `UI_UX`
- `VISUAL`
- `PERFORMANCE_RELIABILITY`
- `SECURITY`
- `TESTING_QUALITY`
- `GITHUB_PAGES`
- `MAINTENANCE`
- `PROJECT_MANAGEMENT`
- `ELECTRON`
- `DISTRIBUTION`
- `DEPENDENCIES_ASSETS`
- `CONTINUOUS_IMPROVEMENT`
- `OBSERVABILITY`
- `CROSS_REPOSITORY_GITHUB`
- `CONVERSATION_HANDOFF`
- `GAME_DESIGN`
- `LEARNING_CONTENT`
- `RESEARCH`
- `GOVERNANCE_ROUTING`

Guide自身のDeep Reviewは原則 `MAINTENANCE + GOVERNANCE_ROUTING + CONTINUOUS_IMPROVEMENT`。

Conversation split / stale checkpoint / duplicate active conversation / promptless recoveryは `CONVERSATION_HANDOFF` を使います。

### Change Scope

- `LOCAL`
- `MEANINGFUL`
- `SYSTEMIC`

単に文字数や変更File数で決めず、Behavior / Contractへの影響で分類します。

### Risk Signal

代表例:

- `EXISTING_SAVE`
- `SCHEMA_CHANGE`
- `MIGRATION`
- `AUTH_REQUIRED`
- `EXTERNAL_API`
- `PUBLIC_RELEASE`
- `REAL_DEVICE_REQUIRED`
- `MEANINGFUL_VISUAL_CHANGE`
- `RESEARCHABLE_QUESTION`
- `CONVERSATION_STATE_RECOVERY`

Riskを巨大Score Systemへしません。

## Repository Evidence

### Desired State

1. Current explicit User Request
2. Current Requirements / Project-specific decisions

### Current State

概ね:

```text
Current Runtime / Code / Data
↓
Formal Requirements / Spec
↓
Project metadata
↓
README / Project Rules / AGENTS
↓
Project Learnings / Work Report / Runtime evidence
↓
Past conversation / memory
```

必要なSignalが見つかったDomainだけ深掘りします。

## Required Doc Read Contract

### MUST: Current Revisionを読む

Memory / old conversation / old ZIP / previously-read guideをCurrent Revisionの代用にしません。

同一Commit / blobと確認できる場合は再取得を省略できます。

### MUST: Partial retrievalを読了扱いにしない

- truncatedなら必要な続き / sectionを取得
- snippetだけで後半Rule不在と推測しない
- Completion / Exception / Validation等、Taskに関係するSectionを確認
- 全文不要ならtargeted readでよい

「Fileを取得した」ではなく、今回の判断に必要なRuleを確認できたことが完了条件です。

## Stable Gates

| Gate | Owner | Trigger |
|---|---|---|
| `RULE-PREFLIGHT-GATE` | `docs/21-rule-routing-preflight.md` | Meaningful / Systemic |
| `VISUAL-RESEARCH-GATE` | `docs/18-domain-first-visual-research.md` | Meaningful Visual Change |
| `RESEARCHABLE-QUESTION-GATE` | `docs/20-evidence-first-research.md` | important uncertain researchable question |
| `STORAGE-MIGRATION-GATE` | `docs/03-data-storage.md` | existing save / schema / storage change |
| `GAME-PLAYTEST-GATE` | `docs/19-game-development.md` | game primary flow / completion change |

Gate数を増やすことを目的にしません。

## Fail / Fallback

Required Ownerを取得できない場合、そのOwnerに依存する高Risk判断を「確認済み」として進めません。

ただし取得不能Ownerに依存しない安全な局所作業まで無条件停止しません。

- **Not applicable** — 条件非該当
- **Override** — 条件該当だが明示理由で外す

MUST Overrideでは理由 / impact / alternativeを残します。

Current work ref等、**Current State自体を一意に復元できない**場合の停止はUser承認待ちではありません。 [22 Conversation Handoff / Recovery](22-conversation-handoff-recovery.md) に従います。

## Re-routing

作業途中でScope / Riskが変わったら追加Ownerへ戻ります。

Trigger例:

- local → meaningful/systemic
- save / migration
- auth / API / cloud
- meaningful visual
- game core/progression
- user requirement change
- common guide / router / validator impact
- cross-repository infrastructure
- conversation state conflict / stale checkpoint

同じConversationだから同じRoutingを永久利用するとは扱いません。

## Project Profiles

Profileは補助情報です。Routingの全判断をProfileだけで行いません。

`GAME + STATIC + DATA`でもREADME typoならPlaytest不要。逆にDATA Profileがなくても実際にMigrationがあればData OwnerへRoutingします。

Profile体系の再設計は実Failure Evidenceが出た場合に行います。

## Machine-readable Router

`maintenance/rule-router.json`は:

- Owner Registry
- Stable Gates
- Work Type route
- Domain route
- Signal route
- Golden Cases

だけを初期責務とします。

Session DB / persistent receipt / complex risk scoring等をEvidenceなしで必須化しません。

## Human Router / Agent Adapter

- README — Guide entry
- START_HERE — Human route
- AGENTS — Project-specific Agent entry

Rule本文を複製しません。

### MUST: Human / Machine Router parity

重要Route変更時はHuman / Machineの両方で同じ代表Taskを解決します。

特に:

- Guide deep review
- Storage migration
- Meaningful visual
- Game primary flow
- Cross-repository GitHub
- Conversation handoff / recovery

はGolden CaseによるRegression Guardを優先します。

## Validation

Validatorで少なくとも:

- Router / Schema parse
- Owner参照存在
- Work Type / Domain / Signal / Gate整合
- Gate ID一意
- Golden Case
- Owner reachability
- START_HERE parity
- Guide deep review → docs14
- Conversation recovery → docs22

を確認します。

文章表現より構造Contractを優先します。

## Non-goals

- 全Guide毎回読込
- small bugへDeep Research
- UserへOwner選択を委ねる
- ProfileだけでRouting
- MemoryだけでCurrent Rule再構成
- 巨大Rule Engine化

## Completion

Agentが必要Ownerへ作業前に到達でき、不要なDocを増やさず、Scope変化時に再Routingでき、Current Repository / Evidenceで解けるDecisionをUserへ不必要に返さない状態を完成基準とします。
