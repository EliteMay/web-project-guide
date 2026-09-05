# 00 Guide Governance

この章は、`web-project-guide`内のルールが衝突した場合の扱い、ルールの強さ、**共通ルールを増やしすぎないための管理方法**を定義する正本です。

## ルールの強さ

### MUST / 必須

原則として守ります。外すとデータ破損・互換性破壊・公開事故・重大な操作不良につながりやすいルールです。

外す場合は理由・影響・代替策をREADME、仕様書、ADR、作業報告のいずれか適切な場所に残します。

### SHOULD / 原則

通常は守ります。ただしプロジェクト規模や目的に対して過剰になる場合は省略できます。

### MAY / 推奨

効果が見込める場合に採用します。全サイトへ機械的に追加しません。

### CONDITIONAL / 条件付き

特定条件に該当した場合のみ適用します。

例:
- 永続データがある → Migration / Backupを検討
- Mediaを保存する → IndexedDBを優先
- Electron → Electron専用ルールを適用
- 一般公開 → Asset LicenseやSecurity確認を強化

## Rule Budget / 共通ルールを増やしすぎない

### MUST: 新しい共通ルールを追加する前に、既存の置き場所を確認する

新しい知見が出たとき、最初から新しい章・新しいMUST・新しいChecklist項目を作りません。

次の順に分類します。

```text
新しい知見
↓
既存の正本で表現できる？
├─ YES → 既存Ruleへ統合・補強
└─ NO
   ↓
   Project固有？ → 対象ProjectのPROJECT_LEARNINGS / Project Rules
   実例・Evidence？ → Failure / Success / Anti-Pattern / Visual Catalog
   確認手順？ → Quality Checklist / Template
   本当に複数Projectへ必要？ → Common Docsへ追加
```

共通Guideへ新規Ruleを追加する条件は、原則として次のいずれかです。

- 複数Projectで再利用価値がある
- 1回でもデータ消失・Security・Release事故等の重大Riskを防ぐ
- 同じ失敗が繰り返されている
- 既存Guideを守っても防げない明確なGapがある

「役に立ちそう」「忘れたくない」だけでは、Common Ruleへ昇格させません。

### SHOULD: Rule追加時はNet Complexityを増やしすぎない

意味のあるRule追加では、同時に次を確認します。

- 既存Ruleへ統合できないか
- 同じ説明をしている箇所を短いLinkへ置き換えられないか
- 古くなったRule / Example / Checklistを削除できないか
- Project固有だった内容をProject側へ戻せないか
- 新しい章を作らず既存Owner Docへ置けないか

数値で「最大N個」と固定しませんが、**Ruleを増やす作業とRuleを減らす・統合する作業をセットで考えます。**

## Single Normative Owner / 同じ判断の正本を1つにする

### MUST: 同じ判断ルールを複数の正本へ持たない

同じ判断・Workflow・Checklistを複数ファイルへ全文複製しません。

- **Owner Doc:** 詳細と判断基準を書く唯一の正本
- **Router / Summary:** 1〜数行の要約 + Owner DocへのLink
- **Catalog:** 実例・Evidence・再利用条件
- **Checklist / Template:** 実行時の確認項目

Cross-cuttingなTopicでは、各専門章にその分野固有の制約だけを置けます。

例:

```text
Remote Diagnostic Handoff全体
→ docs/15 がWorkflowの正本

保存先としての扱い
→ docs/03 はStorage固有の注意だけ

Security
→ docs/06 はKey / RLS / Grant等だけ
```

他章へ同じWorkflow全文を再掲しません。

### 現在の主要Owner

| Topic | Normative owner | 他の場所の役割 |
|---|---|---|
| Rule strength / Source of Truth / Rule Budget | `docs/00-governance.md` | README / START_HEREは要約のみ |
| Requirements | `docs/01-requirements.md` | Requirements Templateは記入用 |
| Architecture | `docs/02-architecture.md` | Catalogは実例 |
| Data / Storage | `docs/03-data-storage.md` | Checklistは確認用 |
| UI / UX / Accessibility原則 | `docs/04-ui-ux-accessibility.md` | Visual Baselineは最低品質だけ |
| Page Load Performance / Runtime responsiveness / Reliability | `docs/05-performance-reliability.md` | Data / Assets / Pagesは専門制約、Checklistは実行確認 |
| Testing strategy | `docs/07-testing-quality.md` | `templates/QUALITY_CHECKLIST.md`は実行Checklist |
| Existing project change workflow | `docs/10-project-management.md` | START_HEREはRouter |
| Electron distribution | `docs/11-electron-distribution.md` | Checklistは確認用 |
| Guide improvement / review operation | `docs/14-continuous-improvement.md` | `maintenance/review-policy.json`は機械可読設定 |
| Runtime diagnostics / Remote handoff workflow | `docs/15-development-observability.md` | Data / Security章は専門制約だけ |
| Cross-repository GitHub infrastructure | `docs/16-cross-repository-github-infrastructure.md` | `EliteMay/.github`は実装側 |
| Visual minimum quality | `docs/17-visual-quality-baseline.md` | Checklistは実行確認 |
| Domain research / 大規模Visual Redesign workflow | `docs/18-domain-first-visual-research.md` | Visual CatalogはEvidence / Reference |
| Game-specific development / completion / playtest | `docs/19-game-development.md` | Data / Performance / Testing / UI等は既存専門Ownerを維持 |

新しいTopicが既存Ownerへ自然に収まらない場合だけ、新規Docを検討します。

## Routerを壊さない

### MUST: 新しい正本を追加したら、作業入口から辿れるようにする

新しいDocを作っただけでは完成ではありません。

最低限次を確認します。

- `README.md` の入口一覧から存在を確認できる
- `START_HERE.md` の該当作業Routeから辿れる
- 既存Ownerと責務が重複していない
- Validator / required file listが必要なら更新されている

**Orphan Rule（存在するが通常作業から辿れないRule）を作らない**ことを基本とします。

## 基本優先順位の読み方

Project内で複数の要求が衝突した場合、原則として次の順でTrade-offを判断します。

1. 操作性
2. 分かりやすさ
3. 安定性
4. 軽量化
5. 保守・修正しやすさ
6. 見た目

ここで「見た目」が6番目なのは、**完成条件から外してよいという意味ではありません。**

User-facing UIがあるProjectでは、[Visual Quality Baseline](17-visual-quality-baseline.md)をMUSTとして扱います。

つまり:

- 見た目のために保存互換性を壊さない
- 見た目のために主要操作を分かりにくくしない
- しかし機能が動くだけの未調整UI、Prototype感、崩れたTypography / Spacing / Responsiveを完成扱いにしない

Visual Ambitionの`high / flagship`は条件付きですが、**Baseline自体はUser-facing UIで必須**です。

## 指示・仕様が衝突した場合の優先順位

原則として以下の順に扱います。

1. **現在の明示的なユーザー要求**
2. **プロジェクト固有の「崩してはいけない仕様」**
3. **プロジェクトの現行仕様・保存互換性・実装上の制約**
4. **web-project-guideの共通ルール**
5. **過去の作業報告・古いZIP・古い会話・参考資料**

ただし、1が2や既存データ互換性と重大に衝突する場合は、勝手に破壊せず、変更理由・影響・代替案を整理します。

## Source of Truth

既存プロジェクトでは、特別な理由がない限り現在のGitHubリポジトリを最新状態の基準とします。

ただしGitHub内でも情報が衝突する場合は、次を優先します。

1. 実際に現在読み込まれているRuntime / Data
2. プロジェクト固有の仕様書・崩してはいけない仕様
3. READMEの現在仕様
4. 作業報告・CHANGELOG

実装が仕様書と食い違っている場合は、どちらが正しいかを勝手に決めず、バグなのか仕様変更漏れなのかを確認します。

## 共通Guideと既存プロジェクト

- **新規制作:** 原則として最新Guideを利用する。
- **小規模修正:** 既存設計を尊重し、必要な範囲だけ最新Guideを適用する。
- **大規模改修:** 最新Guideへの移行価値を検討する。
- **保存互換性を壊すGuide変更:** Guideが新しくても自動適用しない。

各プロジェクトは必要に応じて採用Guide VersionをREADMEや`project-meta.json`等へ記録できます。

## ガイドの自己適用

このリポジトリ自身も以下を守ります。

- Guide Versionを一元管理する
- CHANGELOGを残す
- README / START_HEREをRouterとして保ち、詳細ルールを重複させすぎない
- 同じ判断のNormative Ownerを1つにする
- 新規Rule追加時にRule Budgetを確認する
- 相対リンクを壊さない
- 必須ファイルとRouter導線を自動検証する
- 未確認事項を作業報告へ残す

## 例外の扱い

ルールから外れること自体を禁止しません。

重要なのは、理由なしに外れないことです。

大きな例外では以下を残します。

- なぜ標準ルールを使わないか
- 何が良くなるか
- 何が悪くなるか
- データ・互換性への影響
- 将来戻せるか
