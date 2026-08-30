# CHANGELOG

Guide Versionの正本は [`guide-version.json`](guide-version.json) です。

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
