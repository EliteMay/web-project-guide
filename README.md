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

この順番はTrade-off時の優先順位です。**User-facing UIの見た目を未調整のまま完成扱いしてよい、という意味ではありません。** User-facing UIは [Visual Quality Baseline](docs/17-visual-quality-baseline.md) を最低品質として満たします。

MUST / SHOULD / MAY / CONDITIONAL、仕様衝突、Source of Truth、Rule Budgetは [Guide Governance](docs/00-governance.md) を正本とします。

## 主な入口

- [START HERE](START_HERE.md) — 作業種類別の最短ルート
- [00 Guide Governance](docs/00-governance.md) — ルール強度・優先順位・Rule Budget・正本管理
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
- [15 Development Observability / Project Memory](docs/15-development-observability.md) — 失敗・成功・診断ログを次回修正へ引き継ぐ
- [16 Cross-Repository GitHub Infrastructure](docs/16-cross-repository-github-infrastructure.md) — `.github` / Reusable Workflow / Ruleset / Dependabot / Projectsの役割分担
- [17 Visual Quality Baseline](docs/17-visual-quality-baseline.md) — User-facing UIで必須の見た目の最低品質
- [18 Domain-first Visual Research](docs/18-domain-first-visual-research.md) — 大きな見た目変更前に同種Site / Appを調査するWorkflow

## 過去事例から学ぶ

Catalogは**Ruleの正本ではなくEvidence / Reference**です。

- [Failure Catalog](catalog/failures.md) — 実際に発生した高コスト失敗
- [Success Pattern Catalog](catalog/success-patterns.md) — 再利用価値の高い設計
- [Anti-Pattern Catalog](catalog/anti-patterns.md) — 原則避ける実装
- [Validated Visual Direction Catalog](catalog/validated-visual-directions.md) — 評価Evidence付きのVisual Reference

Visual Referenceは [Domain-first Visual Research](docs/18-domain-first-visual-research.md) の代わりに使いません。

## Templates

- [Requirements](templates/REQUIREMENTS_TEMPLATE.md)
- [README](templates/README_TEMPLATE.md)
- [Specification](templates/SPEC_TEMPLATE.md)
- [Project Rules](templates/PROJECT_RULES_TEMPLATE.md)
- [AGENTS](templates/AGENTS_TEMPLATE.md) — Coding Agent向けの薄い入口 / Router
- [ADR](templates/ADR_TEMPLATE.md)
- [Work Report](templates/WORK_REPORT_TEMPLATE.md)
- [Project Learnings](templates/PROJECT_LEARNINGS_TEMPLATE.md)
- [Diagnostics Schema](templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json)
- [Quality Checklist](templates/QUALITY_CHECKLIST.md)
- [CHANGELOG](templates/CHANGELOG_TEMPLATE.md)

## 最低限の共通原則

READMEでは詳細ルールを再掲せず、特に重要な入口だけを要約します。

- 同じ情報・判断のSource of Truthを複数作らない。
- 保存データを壊す変更はMigration / Backup / Rollbackを考える。
- 公開GitHub / GitHub Pagesへ秘密情報を置かない。
- 未実装・未確認を完成済み / 確認済みとして扱わない。
- User-facing UIはVisual Quality Baselineを満たす。
- 大きなVisual変更はDomain-first Visual Researchを先に行い、過去成功例を最初の答えにしない。
- 各Projectは再発防止価値の高い失敗・成功を `PROJECT_LEARNINGS.md` に残す。
- AI生成Codeも既存仕様・Test・最終状態のValidationを通す。
- 新しい共通Ruleを追加する前に、既存Ruleへの統合・Catalog / Checklist / Project側への配置を確認する。

詳細は各Owner Docを正本とします。

## Project Profile

全サイトへ同じルールを機械的に適用しません。必要に応じて次のProfileを組み合わせます。

`STATIC` / `DATA` / `LEARNING` / `MEDIA` / `AI-HANDOFF` / `CLOUD` / `ELECTRON` / `TOOL` / `PUBLIC-CONTENT`

学習・解説・資格対策等で「理解してもらうこと」が主要価値なら`LEARNING`を選びます。Data量が多い場合は`DATA + LEARNING`のように併用します。

詳細は [Project Profiles](docs/12-project-profiles.md) を参照してください。

## Continuous Improvement

Guideは固定された完成品として扱わず、実ProjectとWeb標準から継続改善します。

- GitHub上でアクセス可能なProjectの最近の差分・Project Learnings・高コスト修正を確認
- 一般Web Ruleは一次・公式情報を優先
- 他Projectは原則Read-only
- Rule追加時は重複・Orphan Rule・Project固有Ruleの混入を同時に確認
- 新しい知見がなければ変更しない
- MUST / Governance等の高影響変更はBranch / Pull Requestを優先

運用ルールは [Continuous Improvement](docs/14-continuous-improvement.md)、機械可読設定は [`maintenance/review-policy.json`](maintenance/review-policy.json) を正本とします。

## Guide自身の品質確認

このRepoはpush / pull request時に [`tests/validate-guide.mjs`](tests/validate-guide.mjs) を実行します。

主な確認:

- 必須Docs / Catalog / Templateの存在
- READMEから番号付きDocsへ辿れること
- START HEREの主要Route
- Guide Version / CHANGELOG整合
- Markdown相対リンク
- H1
- Catalog ID整合
- Governanceの重要Contract

Workflow: [Validate Guide](.github/workflows/validate-guide.yml)

Account共通GitHub実装は [`EliteMay/.github`](https://github.com/EliteMay/.github) が担当し、`web-project-guide`は判断基準を担当します。

## 完成の考え方

「コードを書いた」「CIが通った」だけでは完成扱いにしません。

要求された主要機能が通常利用でき、重大な既知バグがなく、保存互換性を壊さず、必要な文書が現行実装と一致し、未確認事項が明記されている状態を完成の基準とします。

User-facing UIがある場合はVisual Quality Baselineも完成条件に含めます。

具体的な確認項目は [Quality Checklist](templates/QUALITY_CHECKLIST.md) を利用してください。

## 由来

VReview / English Worksheet Lab / LyricTube / ASMRTube / Lineup Lab / AP Study Notes / DesignShelf / osu! Hub等で実際に発生した問題と、W3C・MDN・web.dev・OWASP等の一般的なWebベストプラクティスを統合しています。
