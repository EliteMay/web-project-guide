# 10 GitHub中心のプロジェクト管理

この章は、**既存ProjectをGitHub中心で安全に変更するWorkflow**を定義する正本です。

Testing戦略は [07 Testing / Quality](07-testing-quality.md)、Runtime Diagnostics / Remote Handoffは [15 Development Observability / Project Memory](15-development-observability.md) を正本とします。

## 基本方針

Web制作ではGitHub Repositoryを基本の保存・管理先とします。

既存Projectでは、特別な理由がない限り古いZIPや過去の会話より**現在のGitHub Repositoryを最新状態の基準**とします。

## 変更前に確認するもの

変更内容に応じて必要範囲だけ確認します。

- README / Spec / Project Rules
- Work Report / CHANGELOG
- `PROJECT_LEARNINGS.md`
- `AGENTS.md`（存在する場合）
- package.json等のProject metadata
- Runtime / Data / Schema / Storage Key
- Tests / GitHub Actions / Deployment
- Remote Diagnostic Handoff採用時の最新Evidence

すべてを毎回読む必要はありません。

## 既存Projectの変更手順

```text
Current Repository確認
→ README / Spec / Project Rules / Learnings確認
→ 必要ならRuntime Diagnostics確認
→ 変更対象と影響範囲を特定
→ 変更経路を選択
→ 実装
→ 関連Contractを確認
→ 一時資産をCleanup
→ 最終CommitでValidation
→ 必要な文書 / Learningを更新
→ 未確認事項を記録
```

Remote Diagnosticsの具体的な読取順・件数・Fallbackは [15 Development Observability / Project Memory](15-development-observability.md) を正本とし、この章へ再掲しません。

## GitHubへの変更経路を選ぶ

変更内容に対して最も小さく安全な経路を選びます。

### SHOULD: 小規模で変更箇所が明確

GitHub上の対象Fileを直接更新して構いません。

例:

- 文言修正
- 1〜数Fileの明確なBug fix
- README / JSON / CSSの局所変更
- 既存Testで十分に回帰確認できる変更

**単発のFile書換えのためだけにGitHub Actionsや補助Scriptを新設しません。**

### SHOULD: 複数File・高Risk・設計変更

Branch / Pull Requestを優先します。

例:

- 保存形式 / Schema変更
- 共通Runtime変更
- 大規模UI変更
- 複数主要機能へ影響
- Guide / CI / Deployment等の運用変更

PRではDiffとCIを確認してからMergeします。

### CONDITIONAL: GitHub Actions

GitHub Actionsは**継続的な自動化そのもの**が目的の場合に使います。

例:

- Static Validation
- Test
- Build
- Deploy
- Release
- 定期処理

単発修正のPatch EngineとしてWorkflowを増やしません。

やむを得ず一時Workflow / Scriptを使った場合は、作業終了前にCleanupし、Cleanup後の最終状態を再検証します。

## Final Stateを基準にする

途中CommitのCI / Pages成功は最終状態の品質保証ではありません。

最終Commit / Merge Commitに対するValidationを完成判定に使います。

詳細なFinal-state Validationは [07 Testing / Quality](07-testing-quality.md#final-state-validation) を正本とします。

## AI Coding Agentを使う場合

ChatGPT / Codex / Claude / Copilot等が生成したCodeも通常変更と同じ品質基準を通します。

### SHOULD: AI出力を「提案 + 実装候補」として扱う

- Current Repo / Runtime / Dataを先に確認する
- Project Rules / 保存互換性 / Architectureを守る
- Runtime Evidenceがある場合は原因推測より先に確認する
- AI提案のFramework / Library / Storage / Rewriteを理由なく採用しない
- 高Cost判断はADR / 影響確認を省略しない
- 未経験TechnologyではArchitecture / Security / Deployment / Persistenceを追加Reviewする
- 既存Projectでは「全部Rewrite」よりSmallest Safe Changeを基本とする

ただしVisualの土台自体が失敗している場合は、[Domain-first Visual Research](18-domain-first-visual-research.md#visual-foundation-reset) のFoundation Resetを使い、**正常なDomain Logicを残したままUI Shellを再設計**できます。

## Specification / Oracle-driven AI Development

AIへ大規模な実装・移植・自動生成を任せる場合、実装前にObservable Acceptance CriteriaやOracleを用意できるか検討します。

Oracleの種類・Testing方法は [07 Testing / Quality](07-testing-quality.md#specification--oracle-test) を正本とします。

Visual等、機械的Oracleが作りにくい領域は明示的なReview Gateで補います。

## AGENTS.md

`AGENTS.md` はCoding AgentへProjectの入口を渡すRouterとして利用できます。

### SHOULD: Source of Truthを増やさない

`AGENTS.md`へREADME / Spec / Project Rulesの全文を複製しません。

役割:

- 最初に読むべき正本を案内
- Build / Test / Validation command
- 崩してはいけない仕様へのLink
- Architecture上の重要責務 / File ownership
- Storage / Security / Deploymentの高Risk箇所
- Remote Diagnostic Handoffの有無と安全な読取入口
- 作業後のCompletion Check

Project固有Ruleの正本はSpec / `PROJECT_RULES.md`等へ残します。

### Nested AGENTS.md

Subdirectoryだけ異なるRule / Test / Technologyを持つ場合のみ必要に応じて使います。

Directoryごとに大量作成せず、Root / Nestedへ同じ内容を複製しません。

Template: [AGENTS_TEMPLATE.md](../templates/AGENTS_TEMPLATE.md)

## 原則としてそのまま改善してよい範囲

既存仕様や保存互換性を壊さない場合、次は原則そのまま改善できます。

- 明確なBug fix
- 軽微なUI改善
- Code整理 / 重複Code削減
- 読み込み速度改善
- Accessibility改善
- 分かりにくい文言改善
- Path miss修正
- JSON整理
- READMEの不足情報追加

「軽微」に見えても保存形式・共通Runtime・主要導線へ影響する場合は影響確認を優先します。

## 確認が必要な変更

次は勝手に確定しません。

- 主要機能の削除
- 大幅なUI変更
- 保存形式 / Data互換性変更
- 既存URL変更
- 外部Service移行 / 有料Service導入
- 公開範囲変更
- GitHub Pages非対応化
- Web版 / Electron版の切替

必要に応じて、変更理由 / 影響 / メリット / デメリット / 代替案 / Rollback可否を整理します。

## 関連機能への影響確認

変更時は必要に応じて次を確認します。

- HTMLとJSのID / class
- CSS変更の他画面への影響
- JSON / Schema Version
- localStorage / IndexedDB Store / Key
- 既存保存Data
- URL / File path / GitHub Pages相対Path
- Event Listener / import / fetch
- 共通Component
- Service Worker / Cache
- Version / Build
- GitHub Actions / Deployment trigger
- Remote Diagnostic Schema（採用時）

## Documentation ownership

### README

READMEは**現在仕様**を中心にします。

最低限必要な内容は [README Template](../templates/README_TEMPLATE.md) を使えます。

長い変更履歴はCHANGELOG / Work Reportへ分離します。

### Work Report

今回の変更結果・未確認・既知Issue等は必要に応じてWork Reportへ残します。

Template: [Work Report](../templates/WORK_REPORT_TEMPLATE.md)

### Project Learnings

高Cost Bug / 再利用価値の高い成功は `PROJECT_LEARNINGS.md` へ残します。

詳細は [15 Development Observability / Project Memory](15-development-observability.md) を確認します。

## GitHub Pages

GitHub Pages固有の構成・Path・Secrets・公開確認は [08 GitHub Pages](08-github-pages.md) を正本とします。

この章では「HTML / CSS / JSだけで成立するSiteは、特別な理由がなければGitHub Pagesで直接利用できる構成を優先する」というProject管理上の方針だけを扱います。
