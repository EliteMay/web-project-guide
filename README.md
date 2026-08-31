# Web Project Guide

個人向けWebサイト / Electron制作で、**毎回同じ失敗を繰り返さず、設計・実装・保存・検証の判断基準を揃えるためのSource of Truth**です。

最初から全章を読む必要はありません。まず **[START HERE](START_HERE.md)** で今回の作業種類を選んでください。

Guide Versionの正本は [`guide-version.json`](guide-version.json)、変更履歴は [`CHANGELOG.md`](CHANGELOG.md) です。

## 基本優先順位

1. 操作性
2. 分かりやすさ
3. 安定性
4. 軽量化
5. 保守・修正しやすさ
6. 見た目

詳細な優先ルール、MUST / SHOULD / MAY / CONDITIONAL、仕様衝突時の扱いは [Guide Governance](docs/00-governance.md) を正本とします。

## 主な入口

- [START HERE](START_HERE.md) — 作業種類別の最短ルート
- [00 Guide Governance](docs/00-governance.md) — ルール強度・優先順位・例外
- [01 要件定義](docs/01-requirements.md)
- [02 Architecture](docs/02-architecture.md)
- [03 Data / Storage](docs/03-data-storage.md)
- [04 UI / UX / Accessibility](docs/04-ui-ux-accessibility.md)
- [05 Performance / Reliability](docs/05-performance-reliability.md)
- [06 Security](docs/06-security.md)
- [07 Testing / Quality](docs/07-testing-quality.md)
- [08 GitHub Pages](docs/08-github-pages.md)
- [09 Version / Maintenance](docs/09-maintenance.md)
- [10 GitHub中心のプロジェクト管理](docs/10-project-management.md)
- [11 Electron / Distribution](docs/11-electron-distribution.md)
- [12 Project Profiles](docs/12-project-profiles.md)
- [13 Dependencies / Assets](docs/13-dependencies-assets.md)
- [14 Continuous Improvement](docs/14-continuous-improvement.md) — 実ProjectとWeb標準からGuideを定期改善

## 過去事例から学ぶ

- [Failure Catalog](catalog/failures.md) — 実際に発生した高コスト失敗
- [Success Pattern Catalog](catalog/success-patterns.md) — 再利用価値の高い設計
- [Anti-Pattern Catalog](catalog/anti-patterns.md) — 原則避ける実装

## Templates

- [Requirements](templates/REQUIREMENTS_TEMPLATE.md)
- [README](templates/README_TEMPLATE.md)
- [Specification](templates/SPEC_TEMPLATE.md)
- [Project Rules](templates/PROJECT_RULES_TEMPLATE.md)
- [ADR](templates/ADR_TEMPLATE.md)
- [Work Report](templates/WORK_REPORT_TEMPLATE.md)
- [Quality Checklist](templates/QUALITY_CHECKLIST.md)
- [CHANGELOG](templates/CHANGELOG_TEMPLATE.md)

## 最低限の共通原則

- 同じ情報の正本を複数作らない。
- 保存データを壊す変更はMigration / Backup / Rollbackを考える。
- 既存データを置換するImportは、全体Validation前に現在データを消さない。
- 大容量MediaをlocalStorageへ直接保存しない。
- Versioned Patch JSを恒久構造にしない。
- 正式RuntimeのPathとVersion / Build Metadataを必要に応じて分離する。
- GitHub Pagesでは相対パスとサブパスを前提にする。
- 未実装機能を完成済みのように見せない。
- 外部サービス失敗時の状態を設計する。
- 実機未確認を確認済みと扱わない。
- 主要機能・保存形式・公開方式の大変更を勝手に確定しない。
- Electron指定のプロジェクトを勝手にWeb版へ変更しない。
- 公開GitHub / GitHub Pagesへ秘密情報を置かない。

詳細ルールは各docsを正本とし、READMEへ重複して増やし続けません。

## Project Profile

全サイトへ同じルールを機械的に適用しません。必要に応じて次のProfileを組み合わせます。

`STATIC` / `DATA` / `MEDIA` / `AI-HANDOFF` / `CLOUD` / `ELECTRON` / `TOOL` / `PUBLIC-CONTENT`

詳細は [Project Profiles](docs/12-project-profiles.md) を参照してください。

## Continuous Improvement

Guideは固定された完成品として扱わず、実際のProjectとWeb標準の変化から継続改善します。

- GitHub上でアクセス可能な `EliteMay` のProjectを定期的に再発見し、最近の変更・高コスト修正・成功設計を確認
- W3C / MDN / web.dev / OWASP / GitHub / Electron / WHATWG等の公式情報を定期確認
- 他Projectは原則Read-onlyで、定期レビューが自動更新するのは `web-project-guide` のみ
- 根拠の弱い流行や言い換えだけではGuideを変更しない
- MUST / Governance等の高影響変更は直接確定せず、Branch / Proposalを優先
- 新しい知見がなければCommitしない

運用ルールは [Continuous Improvement](docs/14-continuous-improvement.md)、Review Source設定は [`maintenance/review-policy.json`](maintenance/review-policy.json) を正本とします。

## Guide自身の品質確認

このRepoはpush / pull request時に [`tests/validate-guide.mjs`](tests/validate-guide.mjs) を実行し、次を確認します。

- 正本として必要なDocs / Catalog / Template / Workflowの存在
- `guide-version.json`形式とstatus
- `guide-version.json`とCHANGELOG最新Version / 日付の一致
- Markdown相対リンク切れ
- Markdown H1不足
- Failure / Success / Anti-Pattern Catalog IDの重複
- Markdown内の未定義Catalog ID参照
- READMEからSTART HEREへの導線

Workflow: [Validate Guide](.github/workflows/validate-guide.yml)

## 完成の考え方

「コードを書いた」「CIが通った」だけでは完成扱いにしません。

要求された主要機能が通常利用でき、重大な既知バグがなく、保存互換性を壊さず、必要な文書が現行実装と一致し、未確認事項が明記されている状態を完成の基準とします。

具体的な確認項目は [Quality Checklist](templates/QUALITY_CHECKLIST.md) を利用してください。

## 由来

VReview / English Worksheet Lab / LyricTube / ASMRTube / Lineup Lab / AP Study Notes / DesignShelf / osu! Hubなどで実際に発生した問題と、W3C・MDN・web.dev・OWASP等の一般的なWebベストプラクティスを統合しています。
