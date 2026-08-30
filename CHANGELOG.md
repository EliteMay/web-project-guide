# CHANGELOG

Guide Versionの正本は [`guide-version.json`](guide-version.json) です。

## 1.2.0 - 2026-08-30

### Added

- 既存サイトの構造整理 / Patch統合ルートを`START_HERE.md`へ追加
- Backup / Import / Restore専用ルートを`START_HERE.md`へ追加
- 正式Runtime PathとVersion Metadataを分離するルールを追加
- 破壊的Importの `validate → backup → replace → verify → rollback` 手順を追加
- `Renderer owns its DOM` 原則をArchitectureへ追加
- Failure CatalogへF-017〜F-019を追加
- Success Pattern CatalogへS-021〜S-023を追加
- Anti-Pattern CatalogへAP-024〜AP-025を追加

### Changed

- Quality ChecklistへStable Runtime、Import Rollback、MutationObserver後付け、Version整合性検証を追加
- Guide自身のValidatorを強化し、正本ファイル全件、H1、Guide VersionとCHANGELOG一致、Catalog ID重複、未定義Catalog ID参照を検査
- READMEの最低限原則と自己検証内容を現在のGuide仕様へ更新

### Source

English Worksheet Lab v0.6.2の実運用で見つかった以下の問題をGuideへ還元した。

- Versioned Patchを統合した後も`js/v060/`等のVersion付き正式Runtimeが残る
- Session等へ古いApp Version hardcodeが残る
- Backup ImportがTop-level schema確認後にStoreをclearし、途中失敗時に既存データを失える
- 自前RendererのDOMを別ModuleがMutationObserverで後付けしていた

## 1.1.1 - 2026-08-30

### Added

- GitHub変更経路の選択基準を追加
  - 小規模変更は対象ファイルを直接更新
  - 複数ファイル・高リスク変更はBranch / Pull Requestを優先
  - GitHub Actionsは継続的自動化を目的とする場合に使用
- Cleanup後の最終Commit / Merge Commitを完成判定の基準とするFinal-state Validationを追加
- 一時Script / 一時Workflow / Debug資産のCleanup確認をQuality Checklistへ追加
- Failure Catalogへ `F-016 一時Workflow / Scriptが修正経路になる` を追加
- Anti-Pattern Catalogへ `AP-023 Workflow as Patch Engine` を追加
- Success Pattern Catalogへ `S-020 Smallest Safe Change Path + Final-state Verification` を追加

### Changed

- `START_HERE.md` の既存サイト修正ルートへ変更経路選択と最終Commit確認を追加
- `docs/10-project-management.md` の既存プロジェクト変更手順をFinal State基準へ更新
- `docs/07-testing-quality.md` にFinal-state Validationと最終Commit用Checklistを追加

## 1.1.0 - 2026-08-30

### Added

- `START_HERE.md` を追加し、作業種類別の入口を用意
- `docs/00-governance.md` を追加し、MUST / SHOULD / MAY / CONDITIONALと指示衝突時の優先順位を定義
- Guide VersionのSingle Source of Truthとして`guide-version.json`を追加
- Project Profileルールを追加
- Dependency / Assetルールを追加
- ADR / README / SPEC / PROJECT_RULES / CHANGELOGテンプレートを追加
- Guide自身を検証するGitHub Actions / Validatorを追加

### Changed

- READMEを入口中心へ簡素化し、詳細ルールの重複を削減
- Quality ChecklistをMinimum / Standard / Extendedへ分割
- 要件定義テンプレートへProject Profile・想定データ量・公開範囲等を追加
- Failure / Success / Anti-Pattern Catalogへ相互参照・適用条件を追加

## 1.0.0 - 2026-08-30

### Added

- 要件定義、Architecture、Data/Storage、UI/UX、Performance、Security、Testing、GitHub Pages、Maintenance、Project Management、Electronの共通ガイド
- Failure / Success / Anti-Pattern Catalog
- Requirements / Work Report / Quality Checklist templates
- Web標準Reference
