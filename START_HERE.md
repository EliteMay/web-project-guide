# START HERE

このページは、`web-project-guide` を毎回すべて読むためのページではなく、**今回の作業に必要なルールへ最短で移動する入口**です。

## まず作業種類を選ぶ

### 新しいWebサイトを作る

1. [ルールの優先順位と強さ](docs/00-governance.md)
2. [要件定義](docs/01-requirements.md)
3. [Project Profile](docs/12-project-profiles.md)
4. Interactive Projectなら[Development Observability / Project Memory](docs/15-development-observability.md)で診断方式を決める
5. User-facing UIがあるなら[Visual Quality Baseline](docs/17-visual-quality-baseline.md)を必須品質として確認する
6. Visual Ambitionがhigh / flagshipなら[UI / UX / Accessibility](docs/04-ui-ux-accessibility.md)でDesign Directionを決める
7. 必要な設計章だけ確認
8. [要件定義テンプレート](templates/REQUIREMENTS_TEMPLATE.md)を使う
9. `PROJECT_LEARNINGS.md` を [Template](templates/PROJECT_LEARNINGS_TEMPLATE.md) から作る
10. AI Coding Agentを継続利用するなら必要に応じて[AGENTS Template](templates/AGENTS_TEMPLATE.md)を使う
11. 完成前に[Quality Checklist](templates/QUALITY_CHECKLIST.md)を使う

### 既存サイトのバグを直す

1. 現在のGitHubリポジトリを確認
2. README / 仕様 / Project Rules / 作業報告 / `PROJECT_LEARNINGS.md` を必要範囲だけ確認
3. `AGENTS.md`がある場合はAgent向け入口として確認する
4. Remote Diagnostic Handoffが設定されている場合は最新Error Snapshotを先に確認する
5. [GitHub中心のプロジェクト管理](docs/10-project-management.md)の影響確認を行う
6. [Failure Catalog](catalog/failures.md)に類似事故がないか確認
7. Diagnostics / Error ID / Breadcrumbがある場合は、ユーザー説明より先にそのEvidenceを確認
8. 変更経路を選ぶ
   - 小規模で変更箇所が明確 → GitHub上の対象ファイルを直接更新
   - 複数ファイル・高リスク・設計変更 → Branch / Pull Requestを優先
   - GitHub Actions → 継続的な自動化そのものが目的の場合に使い、単発のファイル書換え手段として安易に増やさない
9. 実装後、一時Script / 一時Workflow / Debug資産が残っていないか確認
10. 高コストBugなら `PROJECT_LEARNINGS.md` とRegression Guardを更新
11. UIへ触れた場合は変更箇所が[Visual Quality Baseline](docs/17-visual-quality-baseline.md)を悪化させていないか確認
12. **最終Commitの状態**で該当範囲のRegression / CI / Pages確認を行う

小規模修正でフル要件定義をやり直す必要はありません。

### ChatGPT / Codex / Claude等へ大きく実装を任せる

1. [GitHub中心のプロジェクト管理](docs/10-project-management.md) のAI Coding Agent / Specification・Oracle方針を確認
2. Agentへ渡す入口が必要なら[AGENTS Template](templates/AGENTS_TEMPLATE.md)を利用
3. `AGENTS.md`へ仕様全文を複製せず、README / Spec / Project Rules / Guideへ案内する
4. Remote Diagnostic Handoff採用時は、Providerへ接続できるなら最新Runtime Evidenceを読む
5. Technology / Architecture / Storage等の高コスト判断はAI提案でも影響確認する
6. 移植・大量生成・互換性重視ではGolden Output / Reference / Contract / Regression Dataset等のOracleを先に用意できるか検討
7. AI生成Codeも通常のStatic / Browser / Regression / Security基準を通す
8. User-facing UIはAI生成でも[Visual Quality Baseline](docs/17-visual-quality-baseline.md)を必ず通す
9. Visual Ambitionがhigh / flagshipならAI Promptで完成Layoutを先に固定しすぎず、Design Directionを比較する

AIの利用量ではなく、**正しい状態を定義し、最終結果を検証できること**を品質基準にします。

### 「こうなった」と説明する前に診断データを使う

- [Development Observability / Project Memory](docs/15-development-observability.md)
- App Version / Build / Schemaを確認
- Recent Breadcrumbを確認
- JavaScript Error / Unhandled Rejectionを確認
- Fetch / Storage / Migration failureを確認
- Remote Diagnostic Handoffがある場合は最新Error Snapshotを確認
- 必要なら`diagnostics.json`またはDiagnostic PackageをExport
- Error IDが表示されている場合は同じIDをログから検索

診断機能の目的は、ユーザーが毎回状況を長文で再説明しなくても、直前状態から調査を開始できるようにすることです。

### ZIPを毎回作らずChatGPTへ診断を渡す

1. [Development Observability / Project Memory](docs/15-development-observability.md) のRemote Diagnostic Handoffを確認
2. 詳細LogはLocal-firstのまま維持する
3. RemoteへはSanitize済みCompact Snapshotだけを保存する
4. 無料必須Projectでは現在のProvider無料枠を確認し、有料化を必須にしない
5. 複数Siteで1 Site = 1 BackendをDefaultにせず、Shared Diagnostics Store + `projectKey`を検討する
6. Public Frontendへ`service_role` / Secretを置かない
7. 無制限匿名Insertを避け、安全な書込経路がなければLocal ExportへFallbackする
8. Normal Snapshotは短期保持、Error Snapshotも件数 / 保存期間 / Payload sizeへ上限を持つ
9. AI更新時はGitHub / Project Learnings / 最新Remote Snapshotを先に読む
10. Screenshot / Video / Audio / Import File等Binaryが本当に必要な場合だけZIP / File handoffを残す

Remote ProviderがPause / Offline / 未接続でもCore機能と調査を止めないことを優先します。

### 複数RepositoryのGitHub運用を共通化する

1. [Cross-Repository GitHub Infrastructure](docs/16-cross-repository-github-infrastructure.md) を正本として確認
2. `.github`共通RepositoryはIssue / PR / Community Health等のDefaultに限定し、Project仕様の正本にしない
3. Reusable WorkflowはCheckout / Node / Syntax等のCommon Baselineだけを中央化する
4. Project固有Validator / E2E / Releaseは各Repositoryへ残す
5. 別RepositoryのReusable WorkflowはCommit SHA固定を優先する
6. 中央Workflow更新は1〜2 ProjectでPilotしてから横展開する
7. Rulesetは全Repo同一強度にせず、Release Risk / Data Loss Riskで変える
8. Electron / npm等のDependencyを持つProjectではDependabotを検討し、更新PRを無条件Auto Mergeしない
9. GitHub Projectsを使う場合はIssue / PRの横断Viewにし、仕様本文の正本にしない

中央化そのものを目的にせず、**共通部分だけを共有してBlast Radiusを制御する**ことを優先します。

### 既存サイトの構造を整理する / Patchを統合する

- [Architecture](docs/02-architecture.md)
- [Version / Maintenance](docs/09-maintenance.md)
- [GitHub中心のプロジェクト管理](docs/10-project-management.md)
- [Failure Catalog](catalog/failures.md) の Runtime / hardcode / DOM patch系を確認

重点確認:

- 旧Version JS / CSSを新Version Folderへコピーして増やしていないか
- 正式Runtime PathとVersion Metadataが分離されているか
- Version / Build / Schema / 件数の正本が1つか
- 自前DOMをMutationObserverで後から完成させていないか
- 旧Runtimeを消した後もMigration / Legacy互換が必要か

構造整理だけを理由に保存Schemaや主要UIまで同時に壊さないよう、変更単位を分けます。

### UIだけ直す

- [Visual Quality Baseline](docs/17-visual-quality-baseline.md)
- [UI / UX / Accessibility](docs/04-ui-ux-accessibility.md)
- [Testing / Quality](docs/07-testing-quality.md)
- fixed / sticky / overflow / zoom / small viewportを重点確認
- 見た目を変更した場合は最終状態を実ブラウザまたはScreenshotで確認し、できなければVisual未確認と記録する

### Visual Designを決める / AI Template感を減らす

1. まず[Visual Quality Baseline](docs/17-visual-quality-baseline.md)を全User-facing UIの最低品質として確認
2. [UI / UX / Accessibility](docs/04-ui-ux-accessibility.md) のVisual Design Qualityを詳細ルールの正本として確認
3. Purpose / Workflow / Information Architectureを先に決める
4. ProjectのContent / Task / AudienceからDesign Directionを考える
5. 色・Gradient・ShadowなしのWireframe / Structureを考える
6. Visual Ambitionがhigh / flagshipなら、色違いではなく構造的に異なる2〜3 Design Directionを比較
7. 必要なら [DesignShelf](https://github.com/EliteMay/DesignShelf) でDirection候補を探索する
8. DesignShelfのLayoutを完成Templateとしてコピーせず、Project固有のNavigation / Density / Primary Action / Contentへ変形する
9. 実装前にGenericなPlanになっていないかCritiqueする
10. Structure決定後にTypography / Spacing / Color / Effectを詰める
11. [Anti-Pattern Catalog](catalog/anti-patterns.md) の `AP-026`〜`AP-028` を確認する

Gradient / Card / Rounded Corner等は全面禁止ではありません。目的・情報関係・Brandに必要なら使用できます。

### 完成したVisual DesignをReviewする

- [Visual Quality Baseline](docs/17-visual-quality-baseline.md)
- [Visual Design Review Gate](docs/04-ui-ux-accessibility.md#visual-design-review-gate)
- [Testing / Quality](docs/07-testing-quality.md)
- [Quality Checklist](templates/QUALITY_CHECKLIST.md) のVISUAL REVIEW

User-facing UIはBaselineを必ず確認し、high / flagshipでは機能Testとは別にPurpose / Hierarchy / Navigation / Typography / Spacing / Component Semantics / Responsive / Accessibility / AI Template Regressionを確認します。

Findingは必要に応じて`Blocking / Major / Minor`へ分け、Blockingが残る場合はVisual完成扱いにしません。

### 保存形式・JSON・データ構造を変える

- [Data / Storage](docs/03-data-storage.md)
- [Version / Maintenance](docs/09-maintenance.md)
- 既存データがある場合はMigration / Backup / Rollbackを先に決める
- 大きな判断は[ADR](templates/ADR_TEMPLATE.md)へ記録する

### Backup / Import / Restoreを作る・直す

- [Data / Storage](docs/03-data-storage.md) の破壊的Import / Restore順序を確認
- [Quality Checklist](templates/QUALITY_CHECKLIST.md) のDATA / TOOL項目を確認

既存データを置き換える場合は、**parse → 全体Validation → 現在Backup → 置換 → 読み戻し確認 → 失敗時Rollback**を基本とします。

### GitHub Pagesで動かない

- [GitHub Pages](docs/08-github-pages.md)
- 相対パス、fetch先、大文字小文字、Service Worker、localhost依存を確認する

### Electronを作る・直す

- [Electron / Distribution](docs/11-electron-distribution.md)
- [Development Observability / Project Memory](docs/15-development-observability.md)
- Web版へ勝手に変更しない
- `userData`、preload / IPC、起動失敗ログ、更新時のデータ維持を確認する
- Setup.exe等で継続配布する場合は、Installer単体ではなくVersion / Release Channel / Update Metadata / userData / Signing / Fallbackを含むRelease Contractを決める
- 起動時更新確認 + One-click Updateを導入できるか確認する
- Updaterを途中Versionから導入する場合はBootstrap Versionを決め、それ以前のVersionに1回だけ手動Setup.exe更新が必要か明記する
- PR BuildとStable Releaseを分け、未Merge BuildをUpdate Channelへ出さない
- Auto Update導入時はInstallerだけでなくUpdate Metadata / blockmap / Release整合 / 失敗Fallback / 実機更新を確認する
- サポート対象の最古Auto-update Version → 最新VersionのUpdate Pathを確認、または未確認と記録する
- 公開配布ではCode Signingを優先し、未署名ならSmartScreen / Publisher検証の制約を明記する

### 外部API・CDN・Supabase等を導入する

- [Performance / Reliability](docs/05-performance-reliability.md)
- [Security](docs/06-security.md)
- [Dependencies / Assets](docs/13-dependencies-assets.md)
- [Development Observability / Project Memory](docs/15-development-observability.md)
- 本当にGitHub Pagesだけでは不足するかを先に確認する
- 無料必須の場合は現在の無料枠 / Active Project制限 / Pause条件を確認する
- Network failureを診断できるようにする

### Guide自体を定期的に改善する

- [Continuous Improvement](docs/14-continuous-improvement.md)
- [`maintenance/review-policy.json`](maintenance/review-policy.json) に従ってProjectと公式Web情報を確認する
- 他Projectは調査対象としてRead-only、定期更新先は `web-project-guide` のみ
- 最近変更されたProjectを先に見て、必要な場合だけ深掘りする
- `PROJECT_LEARNINGS.md` があるProjectでは最優先Evidenceの1つとして確認する
- W3C / MDN / web.dev / OWASP / GitHub / Anthropic / Microsoft / Google等の一次・公式情報を優先する
- 新しい知見がなければ変更Commitを作らない
- MUST / Governance等の高影響変更は自動確定せずBranch / Proposalを優先する

## ルールの読み方

このガイドではルールを4段階で扱います。

- **MUST / 必須**: 原則として守る。外す場合は理由を残す。
- **SHOULD / 原則**: 通常は守る。明確な理由があれば外せる。
- **MAY / 推奨**: 条件に合う場合に採用する。
- **CONDITIONAL / 条件付き**: 指定条件に該当する場合のみ必須または推奨。

詳細は[docs/00-governance.md](docs/00-governance.md)を参照してください。

## 完成前

1. [Quality Checklist](templates/QUALITY_CHECKLIST.md)をプロジェクト種別に合わせて実施
2. User-facing UIがある場合は[Visual Quality Baseline](docs/17-visual-quality-baseline.md)を確認
3. README / 仕様 / 作業報告を更新
4. 高コストBug / 重要成功があれば `PROJECT_LEARNINGS.md` を更新
5. Visual Ambitionがhigh / flagshipならVisual Design Review結果を確認
6. 未確認を未確認のまま記録
7. 一時Script / 一時Workflow / Debug資産が本番Repoへ残っていないことを確認
8. Cleanup後の**最終Commit**でCI / Pages / Regression結果を確認
9. 重大な既知バグが残る場合は完成扱いにしない
