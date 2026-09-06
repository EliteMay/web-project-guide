# 21 Rule Routing / Preflight

この章は、ChatGPT / Coding Agentが作業開始前に**今回必要なOwner Docを選び、実際に確認してから判断・実装へ進むための正本**です。

目的はGuide全文を毎回読むことでも、大規模なRule Engineを運用することでもありません。必要Ruleの読み忘れを防ぎながら、作業に不要な章まで機械的に読むことを避けます。

機械可読なRouting表は [`maintenance/rule-router.json`](../maintenance/rule-router.json) を正本とします。この章はBehavior /判断方法の正本です。`START_HERE.md` は人間向けSummaryです。

## Core Contract

### MUST: Meaningfulな作業はPreflightしてから進める

原則として次の順で進めます。

```text
Current Repository / User Intent
↓
Work Type / Domain / Risk Signalを分類
↓
rule-router.jsonからRequired Docs / Gatesを解決
↓
Required DocsをCurrent Guide Revisionから実際に読む
↓
必要なProject側Source of Truthを読む
↓
Research / Best Reasonable Decision / 要件確定 / 実装
↓
必要なValidation
```

`README.md`や`START_HERE.md`を読んだだけで、必要Owner Docを読んだ扱いにはしません。

ただし、Typo修正や原因と正解が明確な局所Bugへ大規模Preflightを要求しません。小規模作業でも関係する専門Ownerだけは必要範囲で確認します。

## User Rule Knowledge Independence

UserがGuideの章番号、Profile、Gate名を覚えていることを前提にしません。

原則としてAgent側で判断します。

- どのOwner Docが必要か
- MeaningfulなIA / Navigation / Task Flow変更か
- Meaningful Visual Changeか
- Researchable Questionか
- Save / Migration / Security等の高Risk条件があるか
- GAME / LEARNING / ELECTRON等の専門Domainが関係するか
- Conversation Handoff / stale checkpoint / duplicate active conversationのRecoveryが必要か
- Current Repository / Requirements / Existing User Intentからどこまで自律的に決められるか

Product Intent、Core Decision、High-cost Decisionであっても、既存Context・正式Requirements・Evidenceから合理的に決められる場合はUser回答待ちを標準停止条件にしません。

Userへ確認するのは、User Preferenceだけが決定要因で主要体験が大きく変わる、重大な明示要件同士の衝突を解消できない、不可逆・破壊的変更に安全なRollbackがない、外部System / 権限 / 費用 /安全上の明示同意が必要、または必要値が本当に欠落している等の例外を中心とします。詳細は [01 Requirements](01-requirements.md) のUser Decision条件を正本とします。

## Best Reasonable Decision

Preflightで必要なSource of Truthを読んだ後は、質問へ逃がす前に次を使います。

```text
Current Repository
+ Current Requirements
+ Existing User Intent
+ Evidence
+ Compatibility / Risk
↓
Best Reasonable Decision
↓
必要なAssumption / Riskを記録
↓
作業継続
```

Repository確認やResearchで解決できる内容を、最初からUserへ投げ返しません。可逆なDecisionでは、安全で目的に合うDefaultを選びます。

## Classification

Routingのための分類は、必要最小限の軸だけ使います。

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
- `STRUCTURE_FLOW`
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

`STRUCTURE_FLOW`はUser Goal / TaskからInformation Architecture、Navigation構造、Task Flow、State、Search / Browse、Recovery等を設計・再設計する場合に使います。Navigation barのColor / Typography等だけを変える場合は`VISUAL` / `UI_UX`を使います。

`CONVERSATION_HANDOFF`は会話移行、stale checkpoint、PromptなしRecovery、同じ固定会話の重複Active、Current work ref復元等に使います。Behavioral Ownerは [23 Conversation Handoff / Recovery](23-conversation-handoff-recovery.md) です。

`MAINTENANCE` Work Typeは「保守作業である」という作業種類を示し、`MAINTENANCE` DomainはVersion / Runtime Path / Legacy / Patch等の保守Ruleが実際に関係する場合に使います。

Guide自身の改善・Deep Reviewでは原則として `MAINTENANCE + GOVERNANCE_ROUTING + CONTINUOUS_IMPROVEMENT` を組み合わせます。Cross-Repository GitHub基盤の変更では必要に応じて `CROSS_REPOSITORY_GITHUB` を追加します。

### Change Scope

- `LOCAL` — 影響が明確な局所変更
- `MEANINGFUL` — 複数Component / Flow / Design Decisionへ影響
- `SYSTEMIC` — Architecture / Storage / Major Navigation / Common Rule等へ広く影響

`MODERATE`等の中間分類を増やしすぎず、Routing上必要な差だけ持ちます。

### Risk Signal

Riskを独立した巨大Score Systemにせず、該当条件をSignalとして扱います。

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

高Risk Signalは「必ずUserへ質問する」Signalではありません。必要Owner / Gateを読み、Riskを理解したうえでBest Reasonable Decisionを作るためのSignalです。

## Repository Evidence

Current StateとDesired Stateを分けます。

### Desired State

1. Current User Request
2. Current Requirements / Project-specific decisions

### Current State

原則として次を重視します。

```text
Current Runtime / Code / Data
↓
正式Requirements / Spec
↓
Project metadata
↓
README / Project Rules / AGENTS
↓
Project Learnings / Work Report
↓
過去Conversation / Memory
```

Repository全体を毎回全文精読しません。README / Requirements / Spec / Project Rules / Learnings / metadata /主要Directoryを必要範囲で確認し、Save / Supabase / Auth / WebGL / Electron /大量Data等のSignalがあれば該当Domainだけ深掘りします。

## Required Docの扱い

### MUST: Current Revisionを読む

次はRequired Doc読込の代用にしません。

- Memory
- 過去Conversation
- 古いZIP
- 以前読んだGuide
- 古いRevisionの要約

同じGuide Commit / 同じblobであることを確認できる場合は再読込を省略できます。

### MUST: Truncated / Partial Retrievalを読了扱いにしない

Tool出力が途中で切れている、検索Snippetしか取得していない、または取得Line Rangeが今回の判断に必要なSectionを含んでいない場合、そのRequired Docを**読了済みとして扱いません**。

- `truncated`等の表示がある場合は、必要な続きまたは該当Sectionを追加取得する
- Search Result / Summary /冒頭だけから、後半に重要Ruleがないと推測しない
- 今回のTaskに関係するCompletion / Handoff / Exception / Validation等のSectionがある場合は必要範囲で確認する
- 全文取得が不要なTaskでは、関係Sectionを特定してTargeted Readしてよい
- 取得不能なSectionへ依存する判断は、確認済みとして進めない

「Fileを1回取得した」ことではなく、**今回の判断に必要なRuleを実際に確認できたこと**をRequired Doc読込の完了条件とします。

## Stable Gates

読み飛ばすと事故になりやすいCross-cutting判断だけGateを持ちます。

| Gate | Owner | 発火条件 |
|---|---|---|
| `RULE-PREFLIGHT-GATE` | `docs/21-rule-routing-preflight.md` | Meaningful / Systemic作業 |
| `VISUAL-RESEARCH-GATE` | `docs/18-domain-first-visual-research.md` | Meaningful Visual Change |
| `RESEARCHABLE-QUESTION-GATE` | `docs/20-evidence-first-research.md` | 重要かつ不確実なResearchable Question |
| `STORAGE-MIGRATION-GATE` | `docs/03-data-storage.md` | 既存Save / Schema / Storage変更 |
| `GAME-PLAYTEST-GATE` | `docs/19-game-development.md` | GAMEの主要Flow / Completion変更 |

Gateを増やすこと自体を目的にしません。通常のRuleはOwner Doc単位でRoutingします。`STRUCTURE_FLOW`と`CONVERSATION_HANDOFF`も現時点ではDomain Routeとして扱い、専用Stable Gateは設けません。

## Fail / Fallback

Required Docを取得できない場合、そのDocに依存する高Risk判断を確認済みとして進めません。

ただし全作業を無条件停止するのではなく、取得できないRuleに依存しない局所作業だけ安全に続けられるかを判断します。

`Not applicable` と `Override` を混同しません。

- **Not applicable** — そもそも条件に該当しない
- **Override** — 条件には該当するが、明示的な理由で外す

MUST相当のOverrideでは理由・影響・代替策を残します。

Current work ref等、**Current State自体を一意に復元できない**場合の停止はUser承認待ちではありません。[23 Conversation Handoff / Recovery](23-conversation-handoff-recovery.md) に従い、復元できるまでその変更経路だけを`unresolved`として扱います。

## Re-routing

作業中にScopeが変わったらRoutingを更新します。

代表Trigger:

- 局所修正から大規模変更へ拡大
- IA / Navigation / Task Flowの再設計が必要と判明
- Storage / Migrationが必要と判明
- Auth / API / Cloud追加
- Meaningful Visual Changeへ発展
- Game Core Loop / Progression変更へ発展
- User Requirementが変わった
- Guide改善でCommon Rule / Owner / Router / Validatorへ影響が広がった
- 単一Repository作業からCross-Repository GitHub Infrastructure変更へ発展した
- Conversation state conflict / stale checkpoint / parallel active workが判明した

同じConversationだから同じRoutingを永久に使う、とは扱いません。

Re-routing後も、Core / High-cost Decisionという分類だけでUser確認へ戻しません。新たに必要なOwner / Evidenceを読み、Best Reasonable Decisionで継続できるかを先に判断します。

## Project Profilesとの関係

Project ProfileはProjectの性質を示す補助情報です。Routingの全判断をProfileだけで行いません。

例えば`GAME + STATIC + DATA`でも、今回の作業が単なるREADME文言修正ならGame Playtestを要求しません。逆にProfileに`DATA`が書かれていなくても、実装が大量JSON / Migrationを扱っていればData / Storage Ruleを候補へ追加します。

Profileは現行の分類を維持し、Profile体系そのものの再設計は別の明確な必要性が出たときに行います。

## Machine-readable Router

[`maintenance/rule-router.json`](../maintenance/rule-router.json) は次だけを担当します。

- Owner Doc Registry
- Stable Gate Registry
- Work Typeの基本Route
- Domain → Owner Doc
- Risk Signal → Required Doc / Gate
- 代表Golden Cases

最初からSession Receipt、永続Cache、専用CLI、複雑なRisk Scoreを必須化しません。実運用で不足が確認された機能だけ追加します。

## Human Router / Agent Adapter

- `README.md` — Guide全体の短い入口
- `START_HERE.md` — 人間向け作業Route
- `AGENTS.md` — Project固有Agent入口

これらへRouting Rule本文を複製しません。詳細判断はこの章、機械Routingは`rule-router.json`へ戻します。

### MUST: Human / Machine Routerを代表Caseで一致させる

`START_HERE.md`へ重要Routeを追加・変更した場合、`rule-router.json`のWork Type / Domain / Signalで同じOwnerへ到達できることを確認します。逆にMachine Routerへ重要Domainを追加した場合も、人間向け入口からその作業を発見できるか確認します。

特にGuide自身の改善、Storage Migration、Meaningful Visual Change、Task-first Structure / Flow、Game主要Flow、Cross-Repository GitHub Infrastructure、Conversation Handoff / Recovery等、見落としCostが高いCaseはGolden CaseでRegression Guardを持つことを優先します。

## Validation

Guide Validatorでは少なくとも次を確認します。

- Router JSON / Schemaが存在しJSONとして読める
- Owner Doc参照先が存在する
- Work Type / Domain / Signal / Gateの参照先が有効
- Stable Gate IDが重複しない
- Gate Ownerが一意
- 代表Golden Caseで必要DocがRoutingされる
- Owner Registryの重要DocがRoute / Gateから実質到達不能になっていない
- `START_HERE.md`からこの章へ辿れる
- Guide自身のDeep Reviewで`docs/14`へMachine Routerから到達できる
- Structure / Flowの代表Caseで`docs/22`へ到達できる
- Conversation Recoveryの代表Caseで`docs/23`へ到達できる

文章の特定フレーズを大量固定して品質保証の代わりにしません。文章表現ではなく、Owner / Route / Gate / Link等の構造Contractを優先して検証します。

## 非目標

- Guide全文を毎回読む
- 小さなBugにもResearch / Full Checklistを強制する
- Userへ「どのGuideを読むか」を決めさせる
- Core / High-costという分類だけでUser回答待ちにする
- Profileだけで全Routingを決める
- AgentのMemoryだけで必要Ruleを再構成する
- 最初から大規模なRule Engine / Session DB / Cache Systemを作る

## 完成条件

Rule Routingは、Agentが今回の作業に必要な正本を**作業前に到達・読込でき、不要な章を機械的に増やさず、作業途中のScope変化でも追加Ruleへ戻れ、Repository / Requirements / Evidenceで解けるDecisionを不要なUser確認へ投げ返さず継続できる**状態を完成基準とします。
