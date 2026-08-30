# START HERE

このページは、`web-project-guide` を毎回すべて読むためのページではなく、**今回の作業に必要なルールへ最短で移動する入口**です。

## まず作業種類を選ぶ

### 新しいWebサイトを作る

1. [ルールの優先順位と強さ](docs/00-governance.md)
2. [要件定義](docs/01-requirements.md)
3. [Project Profile](docs/12-project-profiles.md)
4. 必要な設計章だけ確認
5. [要件定義テンプレート](templates/REQUIREMENTS_TEMPLATE.md)を使う
6. 完成前に[Quality Checklist](templates/QUALITY_CHECKLIST.md)を使う

### 既存サイトのバグを直す

1. 現在のGitHubリポジトリを確認
2. README / 仕様 / 作業報告を必要範囲だけ確認
3. [GitHub中心のプロジェクト管理](docs/10-project-management.md)の影響確認を行う
4. [Failure Catalog](catalog/failures.md)に類似事故がないか確認
5. 変更経路を選ぶ
   - 小規模で変更箇所が明確 → GitHub上の対象ファイルを直接更新
   - 複数ファイル・高リスク・設計変更 → Branch / Pull Requestを優先
   - GitHub Actions → 継続的な自動化そのものが目的の場合に使い、単発のファイル書換え手段として安易に増やさない
6. 実装後、一時Script / 一時Workflow / Debug資産が残っていないか確認
7. **最終Commitの状態**で該当範囲のRegression / CI / Pages確認を行う

小規模修正でフル要件定義をやり直す必要はありません。

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

### 保存形式・JSON・データ構造を変える

- [Data / Storage](docs/03-data-storage.md)
- [Version / Maintenance](docs/09-maintenance.md)
- 既存データがある場合はMigration / Backup / Rollbackを先に決める
- 大きな判断は[ADR](templates/ADR_TEMPLATE.md)へ記録する

### Backup / Import / Restoreを作る・直す

- [Data / Storage](docs/03-data-storage.md) の破壊的Import / Restore順序を確認
- [Quality Checklist](templates/QUALITY_CHECKLIST.md) のDATA / TOOL項目を確認

既存データを置き換える場合は、**parse → 全体Validation → 現在Backup → 置換 → 読み戻し確認 → 失敗時Rollback**を基本とします。

### ChatGPT等へZIP / JSON /画像を渡して結果を戻す

- [AI Handoff / Package Contract](docs/14-ai-handoff.md)
- [Data / Storage](docs/03-data-storage.md)
- [Security](docs/06-security.md)
- [Testing / Quality](docs/07-testing-quality.md)
- Package / Return DataのSchema名・Version・Manifestを先に決める
- ImportデータやAI返却値を信頼せずValidationする
- Human correctionと未検証状態を設計する

### GitHub Pagesで動かない

- [GitHub Pages](docs/08-github-pages.md)
- 相対パス、fetch先、大文字小文字、Service Worker、localhost依存を確認する

### Electronを作る・直す

- [Electron / Distribution](docs/11-electron-distribution.md)
- Web版へ勝手に変更しない
- `userData`、preload / IPC、起動失敗ログ、更新時のデータ維持を確認する

### 外部API・CDN・Supabase等を導入する

- [Performance / Reliability](docs/05-performance-reliability.md)
- [Security](docs/06-security.md)
- [Dependencies / Assets](docs/13-dependencies-assets.md)
- 本当にGitHub Pagesだけでは不足するかを先に確認する

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
3. 未確認を未確認のまま記録
4. 一時Script / 一時Workflow / Debug資産が本番Repoへ残っていないことを確認
5. Cleanup後の**最終Commit**でCI / Pages / Regression結果を確認
6. 重大な既知バグが残る場合は完成扱いにしない
