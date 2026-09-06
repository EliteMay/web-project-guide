# 00 Guide Governance

この章は、`web-project-guide`内のルールが衝突した場合の扱い、ルール強度、Source of Truth、**共通ルールを増やしすぎないための管理方法**を定義する正本です。

## ルールの強さ

### MUST / 必須

原則として守ります。外すとデータ破損・互換性破壊・公開事故・重大な操作不良につながりやすいルールです。

外す場合は理由・影響・代替策をREADME、仕様書、ADR、作業報告等の適切な場所に残します。

### SHOULD / 原則

通常は守ります。ただしProject規模や目的に対して過剰になる場合は省略できます。

### MAY / 推奨

効果が見込める場合に採用します。全Projectへ機械的に追加しません。

### CONDITIONAL / 条件付き

特定条件に該当した場合のみ適用します。

例:

- 永続データがある → Migration / Backupを検討
- Mediaを保存する → IndexedDBを優先
- Electron → Electron専用ルールを適用
- 一般公開 → Asset License / Security確認を強化

## Rule Budget

### MUST: 新しいCommon Ruleを追加する前に既存の置き場所を確認する

```text
新しい知見
↓
既存Ownerで表現できる？
├─ YES → 既存Ruleへ統合・補強
└─ NO
   ↓
   Project固有？ → Project Learnings / Project Rules
   実例・Evidence？ → Catalog / Reference
   実行確認？ → Checklist / Template
   本当に複数Projectへ必要？ → Common Ownerへ追加
```

Common Guideへ新規Ruleを追加する条件は原則として次のいずれかです。

- 複数Projectで再利用価値がある
- 1回でもData loss / Security / Release事故等の重大Riskを防ぐ
- 同じ失敗が繰り返されている
- 既存Guideを守っても防げない明確なGapがある

「役に立ちそう」「忘れたくない」だけではCommon Ruleへ昇格させません。

### SHOULD: Rule追加と整理をセットで考える

意味のあるRule追加では同時に次を確認します。

- 既存Ruleへ統合できないか
- 同じ説明をLinkへ置き換えられないか
- 古いRule / Example / Checklistを削除できないか
- Project固有内容をProject側へ戻せないか
- Current ContractとHistoryが混在していないか
- 新章を作らず既存Ownerへ置けないか

文字数や章数の固定上限は設けません。目的は短文化ではなく、**必要Ruleへ確実に到達できる構造**を維持することです。

## Single Normative Owner

### MUST: 同じ判断ルールを複数の正本へ持たない

- **Owner Doc:** 詳細と判断基準を書く唯一の正本
- **Router / Summary:** 短い要約 + Owner Link
- **Catalog / Reference:** Evidence / 実例 / Working Hypothesis
- **Checklist / Template:** 実行時の確認 /入力欄

Cross-cutting Topicでは各専門章にその分野固有の制約だけを置けます。同じWorkflow全文を複製しません。

### 現在の主要Owner

| Topic | Normative owner | 他の場所の役割 |
|---|---|---|
| Rule strength / Source of Truth / Rule Budget | `docs/00-governance.md` | README / START_HEREはSummary |
| Requirements | `docs/01-requirements.md` | Templateは記入用 |
| Architecture | `docs/02-architecture.md` | CatalogはEvidence |
| Data / Storage | `docs/03-data-storage.md` | Checklistは確認用 |
| UI / UX / Accessibility | `docs/04-ui-ux-accessibility.md` | 17は最低Visual Gate |
| Performance / Reliability | `docs/05-performance-reliability.md` | Data / Assets / Pagesは専門制約 |
| Security | `docs/06-security.md` | 各Ownerは専門境界だけ |
| Testing strategy | `docs/07-testing-quality.md` | Quality Checklistは実行用 |
| GitHub Pages | `docs/08-github-pages.md` | Performance等は専門Ownerへ委譲 |
| Version / Maintenance | `docs/09-maintenance.md` | CHANGELOGは履歴 |
| Existing project change workflow | `docs/10-project-management.md` | START_HEREはRouter |
| Electron distribution | `docs/11-electron-distribution.md` | Checklistは確認用 |
| Project Profiles | `docs/12-project-profiles.md` | Routingの補助情報 |
| Dependencies / Assets | `docs/13-dependencies-assets.md` | Performance / Securityは専門Owner |
| Guide improvement / review | `docs/14-continuous-improvement.md` | review-policyは設定 |
| Runtime diagnostics / Remote handoff | `docs/15-development-observability.md` | Data / Securityは専門制約 |
| Cross-repository GitHub infrastructure | `docs/16-cross-repository-github-infrastructure.md` | `EliteMay/.github`は実装側 |
| Visual minimum quality | `docs/17-visual-quality-baseline.md` | Checklistは実行確認 |
| Visual Research / Redesign workflow | `docs/18-domain-first-visual-research.md` | Visual CatalogはEvidence |
| Game-specific development / completion / playtest | `docs/19-game-development.md` | 一般Ruleは既存Ownerを維持 |
| Evidence-first Research | `docs/20-evidence-first-research.md` | Topic固有判断は各Owner |
| Rule Routing / Preflight Behavior | `docs/21-rule-routing-preflight.md` | `rule-router.json`はMachine Route、START_HEREはHuman Summary |

新Topicが既存Ownerへ自然に収まらない場合だけ新規Docを検討します。

## Routing / Preflight

Meaningful / Systemic作業では [21 Rule Routing / Preflight](21-rule-routing-preflight.md) をBehavioral Ownerとします。

Machine-readable Routingは [`../maintenance/rule-router.json`](../maintenance/rule-router.json) を正本とし、README / START_HERE / AGENTSへ詳細Routingを重複させません。

UserがGuideの章番号を覚えていることを前提にせず、Agent側が今回必要なRuleを解決します。

### MUST: Orphan Ruleを作らない

新しいOwner / Gateを追加した場合は必要範囲で次を確認します。

- Machine Routerへ登録
- README Owner一覧から存在を確認できる
- START_HEREの関連Routeから辿れる
- 既存Ownerと責務が重複していない
- Validatorが必要な構造Contractを確認する

## 基本優先順位

Project内で要求が衝突した場合、原則として次の順でTrade-offを判断します。

1. 操作性
2. 分かりやすさ
3. 安定性
4. 軽量化
5. 保守・修正しやすさ
6. 見た目

「見た目」が6番目でも完成条件から外しません。User-facing UIでは [Visual Quality Baseline](17-visual-quality-baseline.md) をMUSTとして扱います。

## 指示・仕様が衝突した場合

原則として次の順に扱います。

1. **現在の明示的User要求**
2. **Project固有の崩してはいけない仕様**
3. **Projectの現行仕様・保存互換性・実装上の制約**
4. **web-project-guideのCommon Rule**
5. **過去作業報告・古いZIP・古い会話・参考資料**

現在のUser要求が保存互換性や重大Contractを壊す場合は、勝手に破壊せず影響・代替を整理します。

## Agent Autonomy / User Confirmation Boundary

### MUST: 重要度だけを理由にUser回答待ちへしない

Core / High-cost / Systemic等の分類は、Impact Analysis、Research、Rollback、Validationを強めるために使います。分類名だけを理由にUserへ判断を返したり、回答待ちで標準Workflowを止めたりしません。

原則として、Current User Request、Projectの正式Requirements、Current Repository、Existing User Intent、Research / Evidence、Compatibility / Riskから**Best Reasonable Decision**を選び、必要なAssumption / Riskを短く記録して進めます。

User確認を必要とする境界は [21 Rule Routing / Preflight](21-rule-routing-preflight.md) をBehavioral Owner、Requirements固有の判断は [01 Requirements](01-requirements.md) を正本とします。この章では詳細条件を重複定義しません。

明示Approvalが必要な外部・破壊的・不可逆Operation、Userだけが持つCredential / Permission、Evidenceでも解けないMaterial Intent /重大Conflict、Safety / Legal / Security上の明示確認等は例外です。

## Source of Truth

既存Projectでは、特別な理由がない限りCurrent GitHub RepositoryをCurrent Stateの基準とします。

GitHub内で情報が衝突する場合は、単純な固定順位だけで仕様変更かBugかを決めません。Current State確認の詳細は [21 Rule Routing / Preflight](21-rule-routing-preflight.md) を参照し、Runtime / Data /正式Requirements / Spec / metadata / README等を役割に応じて確認します。

実装がSpecと食い違う場合は、どちらが正しいかを推測で確定せず、Bugか仕様変更漏れかを判断します。

## Common Guideと既存Project

- **新規制作:** 原則最新Guideを利用
- **小規模修正:** 既存設計を尊重し、必要範囲だけ最新Guideを適用
- **大規模改修:** 最新Guideへの移行価値を検討
- **保存互換性を壊すGuide変更:** Guideが新しくても自動適用しない

各Projectは採用Guide VersionをREADMEや`project-meta.json`等へ記録できます。Guide自身のCurrent Versionは`guide-version.json`だけを正本とします。

## Current ContractとHistoryを分ける

### MUST

- `REQUIREMENTS.md` — 現在守るProject Contract
- `CHANGELOG.md` — Version単位の長期変更概要
- `作業報告書.md` — 直近作業 / Validation / 未確認
- Git history — 詳細差分

実装済み改善RequirementsをCurrent Requirementsへ履歴として積み続けません。既存RuleがOwner Docへ反映されていることを確認してから履歴役割を移します。

## Guideの自己適用

このRepository自身も以下を守ります。

- Guide Versionを一元管理
- Current RequirementsとHistoryを分離
- README / START_HEREをRouterとして保つ
- 同じ判断のNormative Ownerを1つにする
- Rule追加時にRule Budgetを確認
- Machine Router / Owner / Gateの整合を保つ
- 相対Linkを壊さない
- 未確認事項を作業報告へ残す

`PROJECT_LEARNINGS.md`は通常Projectでは推奨します。このGuide自身ではCatalog / Continuous Improvementと役割が重なるため、持つ場合はGuide固有の運用学習だけに限定し、Common Rule本文やCatalogを複製しません。

## 例外

Ruleから外れること自体を禁止しません。

大きな例外では次を残します。

- なぜ標準Ruleを使わないか
- 何が良くなるか
- 何が悪くなるか
- Data /互換性への影響
- 代替策
- 将来戻せるか