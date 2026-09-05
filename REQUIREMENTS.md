# web-project-guide 要件定義

この文書は `EliteMay/web-project-guide` 自身の目的・責任範囲・主要利用フロー・崩してはいけない仕様・完成条件を定義するProject固有の要件正本です。

Web / Electron制作の共通ルールそのものは `docs/` 配下の各Owner Docを正本とし、この文書へ詳細ルールを複製しません。

## 0. Guide / Project Profile

- Adopted Guide Version: `1.15.0`
- Primary Profile: `TOOL`
- User-facing UI: No
- Visual Quality Baseline: Not applicable
- Visual Ambition: Not applicable

## 1. 目的

`web-project-guide` は、個人向けWebサイト / Webアプリ / Electronアプリの制作で、毎回ゼロから判断したり、同じ失敗を繰り返したりしないための共通Guide + 制作運用基盤とする。

主目的は次のとおり。

- Web / Electron制作の共通判断基準を1か所へ集約する
- 作業種類から必要なRuleだけへ短く辿れるようにする
- 過去の失敗・成功をEvidenceとして再利用する
- ChatGPT / Codex / Claude / Copilot等のCoding AgentがCurrent Repositoryを基準に安全に作業できるようにする
- 各Project固有の仕様とCommon Guideを混在させない
- Guide自体が増えすぎたり重複したりしないよう継続的に整理する
- 「実装した」だけでなく、最終状態のValidationまで含めて完成を判断できるようにする

## 2. 使用者・公開範囲

### Primary

- Repository owner
- ChatGPT / Codex等のCoding Agent

### Secondary

- 共同開発者
- 将来Projectを見返すRepository owner

### 公開範囲

- GitHub Repository上で参照するCommon Guide
- 各Projectから必要な箇所だけ参照する

### 利用環境

- 主な入口: GitHub Repository
- 主な閲覧: GitHub Web UI / Repository clone / Coding AgentからのRepository read
- Offline利用: clone済みRepositoryでDocumentationを読める範囲は可

## 3. Repositoryの責任範囲

### 担当する

- Web / Electron制作の共通ルール
- Source of Truth / Rule強度 / Rule Budget等のGovernance
- 作業種類別Router
- Architecture / Data / UI / Performance / Security / Testing等の判断基準
- GitHub Pages / Electron / AI-assisted development等の共通Workflow
- Templates / Checklist
- Failure / Success / Anti-Pattern / Visual Evidence Catalog
- Validator
- Guide Version / CHANGELOG
- Continuous Improvement
- Coding Agentが必要な正本へ辿るための入口

### 原則として担当しない

- 個別ゲームのゲーム仕様
- 個別学習サイトの教材内容
- Site固有の画面一覧
- Site固有の保存Schema / Storage Key
- Project固有の色・Layout・Visual Direction
- Project固有のBug履歴
- 特定Repositoryだけに必要なRule
- 各Projectの自動書換え
- 全Repositoryの常時監視
- 特定Visual Styleの全Projectへの強制

Project固有情報は対象Repository側をSource of Truthとする。

## 4. MVP

最低限、次が成立すること。

1. `README.md` と `START_HERE.md` から作業種類に応じた正本へ辿れる
2. Web / Electron制作に必要な主要Owner Docが存在する
3. 同じ判断のNormative Ownerが原則1つに整理されている
4. 各Projectで利用できるTemplates / Quality Checklistがある
5. Guide構造を検証するValidatorがある
6. Failure / Success / Anti-Pattern等の経験をGuide改善へ戻せる
7. Guide Version / CHANGELOG / 作業記録を管理できる
8. Current Repositoryを基準に既存Projectを安全に変更するWorkflowがある

## 5. 後回し / 非MVP

必要性が明確になるまで、次をMVPへ含めない。

- 各Repositoryの完全自動監査・自動修正
- 専用Web管理画面
- 独自CLI
- 大規模なProject自動生成ツール
- AIによる完全自動Code Review System
- Guide全文の各Projectへのコピー
- 全Project共通の固定Visual Theme

## 6. 主要利用フロー

### 通常のWeb / Electron制作

```text
依頼を受ける
↓
今回の作業種類を判定
↓
README → START_HERE
↓
必要なOwner Docだけ確認
↓
対象Project RepositoryのCurrent Stateを確認
↓
README / Spec / Project Rules / Learnings等を必要範囲だけ確認
↓
変更対象・影響範囲・確認が必要な仕様を特定
↓
実装 / 修正
↓
Testing / Validation / Visual Review等を必要範囲で実施
↓
必要なDocumentationを更新
↓
再利用価値のある失敗・成功だけProject Learnings / Catalog等へ記録
↓
Cleanup後の最終状態を確認
```

### Guide改善

```text
新しい知見 / 問題
↓
既存Owner Docで表現できるか確認
↓
Project固有 / Catalog / Checklist / Templateで扱うべきか確認
↓
本当にCommon Ruleが必要な場合だけ追加・補強
↓
重複 / Orphan / 古いRuleも同時に確認
↓
Validator / Documentation整合を確認
```

## 7. Source of Truth

仕様・指示が衝突した場合の基本優先順位は、`docs/00-governance.md` を正本とする。

Project運用上は次を基本とする。

1. 現在の明示的なUser要求
2. 対象Projectの崩してはいけない仕様
3. 対象ProjectのCurrent Repository / Runtime / Data / 現行仕様
4. `web-project-guide` のCommon Rule
5. 過去の会話・古いZIP・古い作業報告・参考資料

この文書はCommon Ruleの詳細正本を置き換えない。

## 8. ファイル / データ構成

| 対象 | 役割 | 正本 |
|---|---|---|
| `README.md` | Guide概要・主要入口 | README |
| `START_HERE.md` | 作業種類別Router | START_HERE |
| `docs/` | Common Rule / Owner Doc | 各番号付きOwner Doc |
| `templates/` | Projectで使う雛形・実行Checklist | 各Template |
| `catalog/` | Failure / Success / Anti-Pattern等のEvidence | 各Catalog |
| `references/` | 外部標準・参考情報 | 各Reference |
| `maintenance/` | Guide Review / Maintenance設定 | 該当Maintenance file |
| `tests/` | Guide Validator / Static Validation | Test implementation |
| `.github/` | CI等 | GitHub Workflow |
| `guide-version.json` | Guide Version | `guide-version.json` |
| `CHANGELOG.md` | Version変更履歴 | CHANGELOG |
| `作業報告書.md` | Guide自身の作業記録 | Work Report |
| `REQUIREMENTS.md` | Guide自身のProject要件 | この文書 |

### 構造原則

- `docs = Rule`
- `catalog = Evidence / Example`
- `templates = 実際に使う型 / Checklist`
- `README / START_HERE = Router / Summary`

役割を混ぜない。

## 9. 保存方法

このRepository自身にはUser data保存機能を持たない。

- 正式な保存先: GitHub Repository
- Version管理: Git
- Guide Version: `guide-version.json`
- 変更履歴: `CHANGELOG.md`
- 作業記録: `作業報告書.md`
- Runtime Database: なし
- localStorage / IndexedDB: なし

## 10. External Dependencies

### 必須

- GitHub Repository

### 条件付き

- GitHub Actions: Validator / CI等の継続的自動化
- 一般Web標準やPlatform仕様の確認: 必要なGuide改善時のみ

Common Guideを読むだけで外部APIや有料Serviceを必須にしない。

## 11. 崩してはいけない仕様

1. `README → START_HERE → 必要なOwner Doc` の短い導線を維持する
2. 同じ判断ルールのNormative Ownerを複数作らない
3. 各Project固有仕様をCommon Guideへ無制限に混入させない
4. Project Profile等を使い、全Projectへ同じRuleを機械的に強制しない
5. 既存Projectでは古い会話やZIPよりCurrent Repositoryを優先する
6. Rule追加時は追加だけでなく統合・削除・Scope縮小を検討する
7. Validator / Router / 相対Linkを壊した状態を完成扱いしない
8. 未確認・未実装を確認済み・完成済みとして扱わない
9. Guide更新を理由に他Projectを勝手に書き換えない
10. Project固有RequirementとCommon Ruleの正本を混同しない

## 12. 高コスト設計判断

後から大きく変えるとGuide全体へ影響するため、次は慎重に扱う。

- Source of Truth優先順位
- MUST / SHOULD / MAY / CONDITIONALの意味
- Rule Budget
- Single Normative Owner
- `README / START_HERE / docs / catalog / templates` の責務分離
- Owner Doc番号体系
- Project Profile体系
- Validatorが保証するContract
- GitHub中心の既存Project変更Workflow
- Testing / CompletionのVerification State
- Storage / Deployment等のDefault方針

大きな変更では理由・Compatibility・移行影響を明確にする。

## 13. 変更可能範囲

### 原則として改善してよい

- 誤記修正
- 説明の明確化
- Reference更新
- 既存Owner Docへの適切な補足
- 重複説明の削減
- Router Link改善
- Catalog Evidence追加
- Template / Checklistの明確化
- Validatorの安全な補強

### 高影響として慎重に扱う

- MUSTの追加・削除
- Governance変更
- Source of Truth変更
- Rule Budget変更
- 制作優先順位変更
- Storage / Deployment Default変更
- 既存ProjectへMigrationを強制する変更
- 全Projectへ固定Visual Styleを強制する変更
- Owner Doc責務の大規模再編

## 14. 非機能要件

### 情報到達性

- Guide全文を毎回読む必要がない
- 作業種類から必要Docへ短く辿れる
- Routerは詳細Ruleを大量複製しない
- Coding Agentへ不要なContextを増やしすぎない

### 安定性

- 必須Docや内部Linkを壊さない
- Validatorが機能する
- Version / CHANGELOG / Documentationが重大に食い違わない
- 新Ruleで既存Workflowを意図せず破壊しない

### 保守性

- Rule数を増やすこと自体を成果にしない
- 既存Ownerへ統合できる場合は新Docを増やさない
- Orphan Ruleを作らない
- Project固有知識をCommon Ruleへ昇格させる場合は再利用価値を確認する

### 可読性

- 初見でもFile roleを理解できる
- Section / Headingを使い、巨大な無構造Documentにしない
- 同じ内容の全文コピーを避ける

## 15. Development Diagnostics / Project Memory

このRepository自身はRuntime ApplicationではないためRuntime Diagnosticsは不要。

- Runtime Diagnostics: No
- Error ID体系: Not applicable
- One-click Diagnostic Export: Not applicable
- `PROJECT_LEARNINGS.md`: Common Project ruleとの整合上、存在・役割を確認対象とする
- Guide自身の変更記録: `CHANGELOG.md` / `作業報告書.md`
- Common化できるEvidence: `catalog/`

## 16. 品質・Verification State

Guide変更でも「変更した」と「完成した」を分ける。

利用するVerification Stateは `docs/07-testing-quality.md` を正本とする。

主に次を区別する。

- Implemented
- Static Validated
- Unverified
- Known Issue

Browser / Visual / Real Device等は、Guide自身のDocumentation変更では通常Not applicableだが、対象Projectの作業では必要に応じて適用する。

## 17. 完成条件

`web-project-guide` のProject要件として、次を基本の完成条件とする。

### Guideとして

- [ ] 目的と責任範囲が明確
- [ ] `README → START_HERE → Owner Doc` の主要導線が成立
- [ ] Web / Electron制作の主要判断基準が存在
- [ ] Project Profile等により必要Ruleを選択できる
- [ ] Template / Checklistを実Projectで利用できる
- [ ] Current Repository基準の既存Project変更Workflowがある

### 構造として

- [ ] Single Normative Ownerを維持
- [ ] Project固有仕様がCommon Guideへ無秩序に混入していない
- [ ] 重大な重複Rule / Orphan Ruleが残っていない
- [ ] `docs / catalog / templates / Router` の役割分離が維持されている
- [ ] Rule追加時にRule Budgetを確認できる

### 品質として

- [ ] 必須Fileが存在
- [ ] 内部相対Linkが正常
- [ ] Guide Validatorが最終状態で成功
- [ ] 必要なDocumentationが現行状態と一致
- [ ] Guide Version変更が必要な場合は `guide-version.json` / CHANGELOGを更新
- [ ] 一時Script / Workflow / Debug資産が不要に残っていない
- [ ] 未確認事項が明示されている
- [ ] 重大なKnown Issueが残る場合は完成扱いにしない

## 18. 要件定義時点の非目標

この要件定義だけを理由に、既存Common Rule・Owner Doc・Project Profile・Validator Contractを自動変更しない。

この文書と現行Guideの間に重大な矛盾が見つかった場合は、どちらかを無断で上書きせず、Guide改善作業として別途影響を確認する。
