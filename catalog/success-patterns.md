# Success Pattern Catalog

過去プロジェクトで効果が高かった設計を再利用するための一覧です。

成功パターンも万能ではありません。各項目の **Use when / Avoid when / Trade-off** を確認し、機械的に全サイトへ載せません。

## S-001 Single Source of Truth

**Pattern:** Version、Schema、件数、教材ルール、データ本体を1か所へ集約する。

- **Use when:** 同じ情報を複数画面・処理から参照する。
- **Avoid when:** 単発の局所値まで無理に中央管理する必要はない。
- **効果:** 表示ズレ減少、旧hardcode減少、Validatorを書きやすい。
- **Related:** [F-004](failures.md) / [AP-004](anti-patterns.md)

## S-002 JSON Manifest / Index

**Pattern:** 大量データを用途別JSONへ分割し、Manifest / Indexだけを入口にする。

- **Use when:** DATA Profile、大量教材・Item・Map等。
- **Avoid when:** 数件の固定データしかない小規模サイト。
- **Trade-off:** File数とfetch数が増えるためLazy LoadやBundle方針が必要。
- **Related:** [F-004 / F-013](failures.md) / [AP-007](anti-patterns.md)

## S-003 Controller / Adapter

**Pattern:** 複数実装を1つの契約へ統合する。

例: YouTube / Local Media → Player Controller。

- **Use when:** 同じ操作を複数Provider / Backendが担当する。
- **Avoid when:** 実装が1種類だけで将来分岐の可能性も低い場合は過剰設計に注意。
- **Trade-off:** 初期構造は少し増えるが、分岐増加時の修正コストを下げる。
- **Related:** [F-001 / F-008](failures.md) / [AP-008](anti-patterns.md)

## S-004 IndexedDB Media Store

**Pattern:** 画像・音声・動画・手書き等をIndexedDBへ保存し、localStorageには軽い参照だけを持つ。

- **Use when:** MEDIA / TOOL Profile、大容量・Blob系。
- **Avoid when:** テーマ設定や小さなIDなど数KB程度の軽い設定。
- **Trade-off:** 非同期処理・Migration・cleanup設計が必要。
- **Related:** [F-002](failures.md) / [AP-005](anti-patterns.md)

## S-005 Schema + Migration

**Pattern:** 保存データをVersion付きで読み、旧形式をnormalizeしてから利用する。

- **Use when:** 永続データを将来更新する可能性がある。
- **Avoid when:** 保存データ自体が存在しない純閲覧サイト。
- **Trade-off:** Migration Testが必要。

## S-006 Snapshot

**Pattern:** 更新後も過去記録の意味を変えたくないデータは開始時点のSnapshotを保存する。

- **Use when:** 問題用紙、分析入力、設定等が後から変わる。
- **Avoid when:** 常に最新値を見ること自体が目的の場合。
- **Trade-off:** 保存容量が増える。
- **Related:** [F-003](failures.md)

## S-007 Undo / Snapshot / Recovery

**Pattern:** 削除後Undo、復元直前Snapshot、破損JSON退避など「戻れる」設計を持つ。

- **Use when:** ユーザーが手間をかけて作ったデータを変更・削除する。
- **Avoid when:** 完全に再生成可能な一時UI状態。

## S-008 Data Diagnostics

**Pattern:** 自動修正する前に、重複・壊れた参照・不正値を確認できる診断を持つ。

- **Use when:** DATA / TOOL / CLOUDで蓄積データが重要。
- **Avoid when:** データが固定JSONでValidatorだけで十分な場合。

## S-009 Human-in-the-loop

**Pattern:** 自動検出・AI判定には手動修正とConfidence / 要確認を用意する。

- **Use when:** 自動結果が100%確実でなく、誤判定コストがある。
- **Avoid when:** 完全に決定的な変換処理。

## S-010 Feedback Package

**Pattern:** AIへ渡すデータを固定Schema / ZIPで書き出す。

```text
manifest.json
input-data.json
notes.txt
images/
return.schema.json
```

- **Use when:** AI-HANDOFF Profile。
- **Trade-off:** Schema Version管理が必要。

## S-011 Regression Dataset

**Pattern:** Parser / Detector / 自動分類は実例を集めて同じCaseで比較する。

- **Use when:** アルゴリズム精度を改善し続ける。
- **Trade-off:** Test dataの整理コストがある。

## S-012 GitHub Actions Validation

**Pattern:** JS / JSON / 参照切れ等をpush時に自動検証する。

- **Use when:** GitHub管理するほぼすべての継続プロジェクト。
- **Avoid when:** 使い捨て単一ファイルでCI導入コストが上回る場合。
- **Related:** [F-012](failures.md)

## S-013 Browser E2E

**Pattern:** Canvas、2Pane、主要導線等をFirefox / Chromiumで実際に通す。

- **Use when:** UI geometry、保存復元、複数Stepの主要フローが重要。
- **Avoid when:** Static validatorで十分な単純ページ。
- **Trade-off:** Test maintenanceコスト。
- **Related:** [F-006 / F-007 / F-012](failures.md)

## S-014 Product Shell

再利用価値が高かったUI:

- モバイルドロワー
- コンパクト表示
- Reduced motion
- Help
- Data Management
- Empty State復帰導線
- Dashboard / 数値カード
- Keyboard Shortcut

**注意:** 全サイトへ機械的に載せない。本来タスクを邪魔するなら採用しない。

## S-015 Progressive Enhancement

**Pattern:** 高度機能が失敗しても基本フローを残す。

例: ZIP失敗 → 個別JSON/TXT、自動検出失敗 → 手動追加。

- **Use when:** 外部API、Media API、Browser機能へ依存する。
- **Related:** [F-014](failures.md) / [AP-014](anti-patterns.md)

## S-016 Feature Detection

**Pattern:** Browser名ではなく、そのWeb APIが使えるか判定する。

- **Use when:** 新しいWeb APIやBrowser差がある機能。

## S-017 未確認を明示

**Pattern:** CIで確認したこととWindows実機・スマホ・外部サービスで未確認なことを分離する。

- **Use when:** すべての継続プロジェクト。
- **効果:** 「完成」の誤判定防止。

## S-018 ADR

**Pattern:** 高コストな設計判断について、現在の結論だけでなく「なぜそうしたか」を残す。

- **Use when:** Storage、Deployment、Provider、Architecture、互換性等を選ぶ。
- **Avoid when:** 文言や余白など軽微な判断。
- **Template:** [ADR_TEMPLATE.md](../templates/ADR_TEMPLATE.md)

## S-019 Project Profile

**Pattern:** サイト種類をProfile化し、必要なルール・Testだけ適用する。

- **Use when:** 共通Guideを複数種類のプロジェクトへ使う。
- **効果:** Checklistが儀式化するのを防ぐ。
- **Rule:** [Project Profiles](../docs/12-project-profiles.md)

## S-020 Smallest Safe Change Path + Final-state Verification

**Pattern:** 変更規模に合う最小のGitHub変更経路を選び、Cleanup後の最終CommitでCI / Pages / Regressionを確認する。

- **Use when:** GitHub上の既存プロジェクトを修正するすべての作業。
- **Small change:** 対象ファイルを直接更新し、不要なWorkflowやPatch Scriptを増やさない。
- **Risky / multi-file change:** Branch / Pull RequestでDiffとCIを確認してからMergeする。
- **Trade-off:** 小規模修正でPRを必須化すると遅くなり、大規模修正を直接mainへ積むと追跡性が落ちる。変更規模で使い分ける。
- **Final check:** 途中Commitではなく、ユーザーへ渡す最終Commit / Merge Commitの結果を基準にする。
- **Related:** [F-016](failures.md) / [AP-023](anti-patterns.md) / [Project Management](../docs/10-project-management.md) / [Testing](../docs/07-testing-quality.md)

## S-021 Stable Runtime Path + Version Metadata

**Pattern:** 正式RuntimeのPathは安定させ、Version / Build / SchemaはMetadataの正本へ分離する。

```text
js/app/app.js
css/app.css
js/app/meta.js  ← Version / Build / Schema
```

- **Use when:** 継続的に更新するWeb / Electron Project。
- **Avoid when:** Release ArtifactそのものをVersion別Directoryで同時配信する明確な要件がある。
- **効果:** `v060`をコピーして`v061`を増やすPatch運用への逆戻りを防ぎやすい。
- **Trade-off:** Cache Bustingを使う場合はBuild生成やmanifestとの整合が必要。
- **Related:** [F-001 / F-004 / F-017](failures.md) / [AP-024](anti-patterns.md) / [Maintenance](../docs/09-maintenance.md)

## S-022 Validate → Backup → Replace → Verify → Rollback

**Pattern:** 既存ユーザーデータを置き換えるImport / Restoreは、全体Validation後にBackupし、置換後の読み戻しValidationまで行う。

```text
parse → validate all → backup current → replace → verify → rollback on failure
```

- **Use when:** localStorage / IndexedDB / Cloud dataをImportで置き換える。
- **Avoid when:** 読み取り専用Importや、失敗しても既存データへ影響しない追加Import。
- **効果:** Import途中失敗による「一部だけ新、一部だけ旧」を防ぎやすい。
- **Trade-off:** Backup容量とRollback実装が必要。
- **Related:** [F-018](failures.md) / [AP-025](anti-patterns.md) / [Data / Storage](../docs/03-data-storage.md)

## S-023 Renderer Owns Its DOM

**Pattern:** 自分で生成するDOMの最終形は、そのRenderer / Component自身が生成する。Layout Moduleは測定・配置計算等へ責務を限定する。

- **Use when:** 自前UIをrenderし、その後別ModuleがObserverで要素を差し込んでいる。
- **Avoid when:** 第三者WidgetやBrowser ExtensionなどDOM生成元を変更できない。
- **効果:** Timing依存、二重生成、Selector破損、責務不明を減らす。
- **Trade-off:** Rendererの引数やComponent境界を整理する必要がある。
- **Related:** [F-019](failures.md) / [AP-003](anti-patterns.md) / [Architecture](../docs/02-architecture.md)
