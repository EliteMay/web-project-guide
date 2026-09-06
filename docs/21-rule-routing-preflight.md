# 21 Rule Routing / Preflight

この章は、ChatGPT / Coding Agent / Humanが今回の作業に必要なGuide Ruleへ確実に到達するための **Rule Routing / PreflightのSingle Normative Owner** です。

目的はGuide全文を毎回読むことではありません。**今回のTaskを分類し、必要なOwner DocとGateだけを決め、実際に読んでから判断・実装へ進むこと**です。

機械可読Routingの正本は [`maintenance/rule-router.json`](../maintenance/rule-router.json)、構造契約は [`maintenance/rule-router.schema.json`](../maintenance/rule-router.schema.json) です。人間向け入口の [`START_HERE.md`](../START_HERE.md) はSummary / Fallbackであり、詳細Routingの第二正本にしません。

一般Ruleの内容は各Owner Docを正本とし、この章へArchitecture / Storage / Visual / Game等の詳細Ruleを複製しません。

## Core Contract

### MUST: 作業開始前に必要Ruleを解決する

意味のある制作・修正では原則として次の順で進めます。

```text
Current Repository / User Intent
↓
Task Classification
↓
Rule Resolution
↓
Required Docs / Required Gates
↓
Required DocsをCurrent Guide Revisionから実読込
↓
Preflight PASS
↓
Research / Requirements / Recommendation / Implementation
↓
必要時Re-route
↓
Final Validation
```

Required Doc / Gateが未処理のまま、そのRuleへ依存する重要判断を確定しません。

次はRequired Doc実読込の代用になりません。

- 過去Conversation
- Memory
- 古いZIP / Export
- 以前読んだ別Revision
- START_HEREだけを読んだこと

同じGuide Commit / blob SHAであることを確認できる場合は、同一Task Session内で既読情報を再利用できます。

### MUST: UserへGuide適用判断を丸投げしない

UserがGuideのOwner DocやGateを覚えていることを前提にしません。

Agent / Router側で判断するもの:

- どのOwner Docが必要か
- Visual Researchが必要か
- Evidence-first Researchが必要か
- Storage / Migration / Security等のGateが必要か
- GAME / DATA / CLOUD等のProfileが関係するか

Userへ確認するのは、Product Intent、Core Decision、破壊的変更、保存互換性を壊すか等、Userにしか決められない事項を中心とします。

## Task Classification

Routing用の主要軸はStableな値を使います。詳細Enumは`rule-router.json`を正本とします。

### Project Profiles — Multi

既存 [Project Profiles](12-project-profiles.md) を利用します。

- STATIC
- DATA
- LEARNING
- GAME
- MEDIA
- AI-HANDOFF
- CLOUD
- ELECTRON
- TOOL
- PUBLIC-CONTENT

### Work Type — 原則Single

- REQUIREMENTS
- RESEARCH
- IMPLEMENTATION
- BUG_FIX
- REVIEW
- DATA_CONTENT
- DEPLOYMENT
- MAINTENANCE

主要目的が変わった場合は、同じ分類へ無理に詰めずRe-route / New Task Sessionとします。

### Domain — Multi

- ARCHITECTURE
- DATA_STORAGE
- UI_UX
- VISUAL
- PERFORMANCE_RELIABILITY
- SECURITY
- TESTING_QUALITY
- GITHUB_PAGES
- PROJECT_MANAGEMENT
- ELECTRON
- DISTRIBUTION
- DEPENDENCIES_ASSETS
- OBSERVABILITY
- GAME_DESIGN
- LEARNING_CONTENT
- CLOUD
- MEDIA
- RESEARCH
- GOVERNANCE_ROUTING

### Change Scope — Single

- LOCAL
- MODERATE
- MEANINGFUL
- SYSTEMIC

### Risk — Single

- LOW
- MEDIUM
- HIGH
- CRITICAL

複数Risk Signalがある場合、Product Intentを変えずに安全側へ倒せる範囲では高い方を使います。

### Researchability — Single

- NOT_REQUIRED
- POSSIBLE
- REQUIRED

### Special Conditions — Multi

代表例:

- EXISTING_SAVE
- SCHEMA_CHANGE
- MIGRATION
- AUTH_REQUIRED
- EXTERNAL_API
- PUBLIC_RELEASE
- REAL_DEVICE_REQUIRED
- LEGACY_PROJECT
- MANAGED_ROUTING

## Hybrid Classification

Task ClassificationはAI自由判断だけにしません。

### Deterministic Evidenceを先に使う

機械的に確認できるSignalを優先します。

- Userが明示した作業種類
- Current Repository metadata / file structure
- `REQUIREMENTS.md` / Spec
- `project-meta.json`（存在する場合）
- package / dependency
- Runtime / Data / Storage
- 変更対象File / Directory

### AIは自然言語とContext差だけを補完する

AI判断が主に必要になる例:

- LOCALかMEANINGFULか
- Researchable Questionか
- 複数Domainへ波及するか
- User Requestの意図

Low Confidenceを理由にSafety Ruleを落としません。安全側へ倒すとProductそのものが変わる場合だけUserへ確認します。

## Current State Evidence / Minimum Repository Scan

Desired StateとCurrent Stateを分けます。

- **Desired State** → Current User Requestを優先
- **Current State** → Current Runtime / Code / Dataを強く扱う
- **Safety Classification** → 古いREADME / metadataだけで高Risk Signalを打ち消さない

Current State Evidenceの基本順:

```text
Current Runtime / Code / Data
↓
正式Requirements / Spec
↓
project-meta.json
↓
README / Project Rules / AGENTS
↓
Work Report / CHANGELOG / 過去資料
↓
Conversation / Memory
```

毎回Repository全体を精読せず、最低限次を確認し、Signalに応じて深掘りします。

- Current Repository state
- README
- REQUIREMENTS / Current Spec
- Project Rules / AGENTS（存在時）
- PROJECT_LEARNINGS（存在時）
- package / project metadata（存在時）
- 主要Directory / Runtime

Supabase / Auth / IndexedDB / Save / Canvas / WebGL / Electron /大量Data等を検出した場合、そのDomainだけ追加確認します。

## Machine-readable Router

[`maintenance/rule-router.json`](../maintenance/rule-router.json) は次を保持します。

- Classification Enum
- Owner Doc Registry
- Work Type / Domain / Profile Routing
- Stable Gate Registry
- Re-routing Trigger
- Compatibility情報

Routerは**どのDocを読むか**を決めます。各Doc内のRule本文は持ちません。

Canonical resolverは [`scripts/resolve-rule-route.mjs`](../scripts/resolve-rule-route.mjs) です。Resolverを実行できない環境では、Current Revisionの`rule-router.json`を読み、同じ合成規則を人間 / AgentがDeterministic Fallbackとして適用できます。

MemoryからRoutingを再構成しません。

## Required Docs / Read Set

重要作業では可能な範囲でGuide Revisionを固定します。

最低限候補:

- Guide Repository
- Guide Version
- Guide Commit / Revision
- Required Docs
- Required Gates

**通常の小さなChatGPT作業で永続Receiptを作ることは必須にしません。** 必要なのは「必要RuleをCurrent Revisionから実際に読んだ」という事実です。

High-risk / 大規模PR / 自動Agent運用で追跡性が必要な場合だけ、SanitizedなPreflight Summary / ReceiptをWork Report等へ残せます。

Secret / Token / Cookie / `.env`値 / Personal Data / File本文の大量コピーをReceiptへ保存しません。

## Stable Gates

Gateは、読み飛ばすと重大な失敗へつながりやすいCross-cutting条件だけに使います。Gate ID / Owner / Triggerは`rule-router.json`を正本とします。

Core Gate:

- `RULE-PREFLIGHT-GATE`
- `VISUAL-RESEARCH-GATE`
- `RESEARCHABLE-QUESTION-GATE`
- `STORAGE-MIGRATION-GATE`
- `GAME-PLAYTEST-GATE`
- `SECURITY-EXTERNAL-GATE`

新しいGateを増やす前に、既存Owner / Routing Ruleで表現できないか確認します。

### Visual Research Gate

Meaningful / SystemicなVisual Direction・Navigation・Layout変更では [18 Domain-first Visual Research](18-domain-first-visual-research.md) へRoutingします。

1pxのAlignment、明確なoverflow / clipping、既存Design System内の局所修正へDeep Researchを強制しません。

### Researchable Question Gate

重要かつ不確実で既存Evidenceが判断を改善し得る場合、[20 Evidence-first Research](20-evidence-first-research.md) へRoutingします。

単純な事実確認や原因が明確な小BugへDeep Researchを強制しません。

### Storage / Migration Gate

Existing Save / Schema Change / Migrationが関係する場合、[03 Data / Storage](03-data-storage.md) をRequiredにします。

### Game Playtest Gate

GAME Projectの主要Gameplay変更・Completion Reviewでは [19 Game Development](19-game-development.md) と [07 Testing / Quality](07-testing-quality.md) をRequiredにし、Static Testだけで完成扱いしません。

### Security / External Gate

Auth / Secret / External API / Cloud等でSecurity Riskがある場合、[06 Security](06-security.md) をRequiredにします。

## Fail Closed / Fallback / Override

### MUST: Required Ruleを取得できないScopeだけ止める

Required Doc / Gateが満たされない場合、**そのRuleへ依存するScope**を確定・実装しません。

全Projectを無条件停止する必要はありません。独立して安全に進められるScopeは続行できます。

### Verified Fallback

Current RevisionのOwner Docを通常経路で取得できない場合、同じRevisionであることを検証できる別経路だけFallbackに使います。

Revision不明の古いMemory / ExportはFallbackではありません。

### NOT_APPLICABLEとOVERRIDDENを分ける

- `NOT_APPLICABLE` — 適用条件を満たさない
- `OVERRIDDEN` — 本来適用対象だが、明示的理由で例外にする
- `BLOCKED` — Required条件を満たせず進めない

MUST相当をOverrideする場合は、理由・影響・代替策・UserまたはProject Contract上の根拠を必要範囲で残します。

## Re-routing / Task Session

最初の分類を作業終了まで固定しません。

Re-route候補:

- Domain追加
- Scope / Risk上昇
- Researchability変化
- Storage / Migration追加
- Auth / API / External Dependency追加
- Project Profile追加
- User Requirement変更
- 実装中に想定外の影響範囲を発見

追加Requiredが出た場合:

```text
該当Scopeを一時停止
→ 追加Docを実読込
→ Routing再計算
→ 必要Gate確認
→ 続行
```

New Task Session候補:

- Repository変更
- Work Type / 主要目的変更
- Guide Revision切替
- 独立Phaseへ移行
- Current Repositoryが外部で大きく更新

同じConversationであることだけを同じTask Sessionの根拠にしません。

## Project Metadata / Legacy Compatibility

Routing専用Metadata Fileを全Projectへ機械的に増やしません。

既に`project-meta.json`等がある場合、必要に応じて次を記録できます。

- adopted guideVersion
- routing mode
- Project Profiles
- Project Rule Files
- Special Conditions

新規ProjectでManaged Routingを採用しても構いませんが、既存Repositoryを一斉Migrationしません。

Legacy Projectではmetadata欠落だけで作業不能にせず、Repository Evidenceから安全側へRoutingします。Meaningful Change時にManagedへ移行する価値を検討します。

metadataよりCurrent Runtimeが高Riskを示す場合、古いmetadataにSafety Ruleを無効化する権限を持たせません。

## Human Router / Agent Adapter

[`START_HERE.md`](../START_HERE.md) は、人間やTool制約のあるAgentが短くRouteを選ぶ入口です。

`AGENTS.md`等のAgent AdapterもCommon Rule全文を複製せず、Current RepositoryとこのPreflight / Owner Docへ案内するRouterにします。

Project固有Purpose / Commands / High-risk Area等はProject側へ残します。

## Validation / Golden Routing Cases

Routing変更では次を確認します。

1. Router JSON / Schemaが構造的に正常
2. Routerが参照するOwner Docが存在
3. Gate IDが一意
4. Representative TaskのGolden Routing Caseが期待Doc / Gateへ到達
5. 過剰Routingを`mustNotRequire`で検出

Golden Caseは [`tests/routing-cases.json`](../tests/routing-cases.json)、実行は [`tests/validate-routing.mjs`](../tests/validate-routing.mjs) を使用します。

必須Regression例:

- GAME + REQUIREMENTS + UI_UX / VISUAL + MEANINGFUL + REQUIRED Research → `docs/18` / `docs/20`へ到達
- 局所UI Bug → `docs/18` / `docs/20`を不要にRequired化しない
- Existing Save + Schema Change / Migration → `docs/03`へ到達
- Electron Release → `docs/11` / Security / Testingへ到達

Routing Incidentが再発した場合、その場のPrompt修正だけで終わらせず、Root CauseをClassifier / Router / Gate / Adapter / Metadataへ分け、再発価値があるものをGolden Caseへ追加します。

## Cross-repository Responsibility

```text
EliteMay/web-project-guide
= Rule / Owner / Router / Schema / Resolver / Golden Cases

EliteMay/.github
= Account共通のReusable Workflow等

各Project Repository
= Project固有Requirements / Runtime / Data / Test / metadata
```

Guide改善だけを理由に他Repositoryを自動変更しません。

## Rule Registration Contract

新しいNormative Owner、重要MUST / CONDITIONAL、作業開始Gateを追加・変更するときは次を確認します。

- Owner Docが既存Ownerと重複しない
- READMEからOwnerへ辿れる
- START_HEREまたはMachine Routerから該当Taskで辿れる
- `rule-router.json`への登録要否を確認した
- Gate追加ならStable ID / Owner / Triggerが一意
- Golden Caseを追加すべき事故Riskか確認した

## Non-goals

- 毎回Guide全文を読むことを要求しない
- 小さなBug / TypoへDeep Researchを強制しない
- RouterがUser Intent / Product Decisionを上書きしない
- 全Projectへ同一Profile / Ruleを機械的に強制しない
- 全Preflight ReceiptをGitHubへ保存しない
- Legacy Repositoryを一斉Migrationしない
- Agent AdapterへCommon Rule全文を複製しない
- Golden TestをRule本文の第二Source of Truthにしない

## Completion

Rule Routing / Preflight変更では少なくとも次を満たします。

- Behavioral Ownerがこの章1つに整理されている
- Machine-readable Router / Schemaが存在する
- Current Owner DocsへRoutingできる
- Required Doc未読を重要判断のPASSとして扱わない
- Local Bugへ過剰Researchを要求しない
- Meaningful Visual / Researchable / Migration / Game Playtest / Security Gateが必要条件で発火する
- Human RouterとMachine Routerが矛盾していない
- Golden Routing Caseが成功する
- 最終CommitでGuide ValidatorとRouting Validatorが成功する
- 未確認事項があれば明示する
