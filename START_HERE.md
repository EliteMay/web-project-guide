# START HERE

このページは、`web-project-guide` を毎回すべて読むためのページではなく、**今回の作業に必要なルールへ最短で移動する入口**です。

## まず作業種類を選ぶ

### 新しいWebサイトを作る

1. [ルールの優先順位と強さ](docs/00-governance.md)
2. [要件定義](docs/01-requirements.md)
3. [Project Profile](docs/12-project-profiles.md)
4. Interactive Projectなら[Development Observability / Project Memory](docs/15-development-observability.md)で診断方式を決める
5. Visual Qualityが重要なら[UI / UX / Accessibility](docs/04-ui-ux-accessibility.md)でSubject / Design Direction / Signatureを決める
6. 継続的にCoding Agentで編集するなら[Project Management](docs/10-project-management.md)を確認し、必要なら[`AGENTS.md` Template](templates/AGENTS_TEMPLATE.md)を使う
7. 必要な設計章だけ確認
8. [要件定義テンプレート](templates/REQUIREMENTS_TEMPLATE.md)を使う
9. `PROJECT_LEARNINGS.md` を [Template](templates/PROJECT_LEARNINGS_TEMPLATE.md) から作る
10. 完成前に[Quality Checklist](templates/QUALITY_CHECKLIST.md)を使う

### 既存サイトのバグを直す

1. 現在のGitHubリポジトリを確認
2. README / `AGENTS.md` / 仕様 / Project Rule / 作業報告 / `PROJECT_LEARNINGS.md` を必要範囲だけ確認
3. [GitHub中心のプロジェクト管理](docs/10-project-management.md)の影響確認を行う
4. [Failure Catalog](catalog/failures.md)に類似事故がないか確認
5. Diagnostics / Error ID / Breadcrumbがある場合は、ユーザー説明より先にそのEvidenceを確認
6. 変更経路を選ぶ
   - 小規模で変更箇所が明確 → GitHub上の対象ファイルを直接更新
   - 複数ファイル・高リスク・設計変更 → Branch / Pull Requestを優先
   - GitHub Actions → 継続的な自動化そのものが目的の場合に使い、単発のファイル書換え手段として安易に増やさない
7. AIが大きく生成した変更は、[Testing / Quality](docs/07-testing-quality.md)の独立Review Gateを通す
8. 実装後、一時Script / 一時Workflow / Debug資産が残っていないか確認
9. 高コストBugなら `PROJECT_LEARNINGS.md` とRegression Guardを更新
10. **最終Commitの状態**で該当範囲のRegression / CI / Pages確認を行う

小規模修正でフル要件定義をやり直す必要はありません。

### 「こうなった」と説明する前に診断データを使う

- [Development Observability / Project Memory](docs/15-development-observability.md)
- App Version / Build / Schemaを確認
- Recent Breadcrumbを確認
- JavaScript Error / Unhandled Rejectionを確認
- Fetch / Storage / Migration failureを確認
- 必要なら`diagnostics.json`またはDiagnostic PackageをExport
- Error IDが表示されている場合は同じIDをログから検索

診断機能の目的は、ユーザーが毎回状況を長文で再説明しなくても、直前状態から調査を開始できるようにすることです。

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

- [UI / UX / Accessibility](docs/04-ui-ux-accessibility.md)
- [Testing / Quality](docs/07-testing-quality.md)
- fixed / sticky / overflow / zoom / small viewportを重点確認
- 大規模UI変更なら実装後のVisual Design Review Gateも実施

### Visual Designを決める / AI Template感を減らす

1. [UI / UX / Accessibility](docs/04-ui-ux-accessibility.md) のVisual Design Qualityを正本として確認
2. Purpose / User / Page Job / 題材固有のData・Workflowを先に決める
3. 色・Gradient・ShadowなしのContent outline / Wireframe / Structureを考える
4. Visual Qualityが重要なら、色違いではなく構造的に異なる2〜3 Design Directionを比較
5. 必要なら [DesignShelf](https://github.com/EliteMay/DesignShelf) でDesign Axes / Layout骨格を探索する
6. DesignShelfのLayoutを完成Templateとしてコピーせず、Project固有のNavigation / Density / Typography / Visual Emphasis / Signatureへ変形する
7. AIへ渡すときはFixed ConstraintsとCreative Axesを分ける
8. Structure決定後にTypography / Spacing / Color / Effectを詰める
9. 実装後、実画面でVisual Design Review Gateを通す
10. [Anti-Pattern Catalog](catalog/anti-patterns.md) の `AP-026`〜`AP-030` を確認する

Gradient / Card / Rounded Corner等は全面禁止ではありません。目的・情報関係・Brandに必要なら使用できます。

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

### 外部API・CDN・Supabase等を導入する

- [Performance / Reliability](docs/05-performance-reliability.md)
- [Security](docs/06-security.md)
- [Dependencies / Assets](docs/13-dependencies-assets.md)
- [Development Observability / Project Memory](docs/15-development-observability.md)
- 本当にGitHub Pagesだけでは不足するかを先に確認する
- Network failureを診断できるようにする

### Guide自体を定期的に改善する

- [Continuous Improvement](docs/14-continuous-improvement.md)
- [`maintenance/review-policy.json`](maintenance/review-policy.json) に従ってProjectと公式Web情報を確認する
- 他Projectは調査対象としてRead-only、定期更新先は `web-project-guide` のみ
- 最近変更されたProjectを先に見て、必要な場合だけ深掘りする
- `PROJECT_LEARNINGS.md` があるProjectでは最優先Evidenceの1つとして確認する
- W3C / MDN / web.dev / OWASP / GitHub / Anthropic / Microsoft / Electron / WHATWG等を優先する
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
2. README / 仕様 / 作業報告を更新
3. 高コストBug / 重要成功があれば `PROJECT_LEARNINGS.md` を更新
4. Visual Qualityが重要ならVisual Review結果を確認
5. AI生成量が多い変更は独立Test / Review結果を確認
6. 未確認を未確認のまま記録
7. 一時Script / 一時Workflow / Debug資産が本番Repoへ残っていないことを確認
8. Cleanup後の**最終Commit**でCI / Pages / Regression結果を確認
9. 重大な既知バグが残る場合は完成扱いにしない
