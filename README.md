# Web Project Guide

個人向けWebサイト / Webアプリ / Electronアプリを、**毎回同じ失敗を繰り返さず、安全に設計・実装・検証するための共通Guide**です。

毎回全章を読みません。最初に **[START HERE](START_HERE.md)** で今回の作業Routeを選び、必要なOwner Docだけ確認します。

- Guide Versionの正本: [`guide-version.json`](guide-version.json)
- Guide自身のCurrent Requirements: [`REQUIREMENTS.md`](REQUIREMENTS.md)
- Release履歴: [`CHANGELOG.md`](CHANGELOG.md)
- 直近作業: [`作業報告書.md`](作業報告書.md)
- Guide自身の長期Learning: [`PROJECT_LEARNINGS.md`](PROJECT_LEARNINGS.md)

## 基本優先順位

1. 操作性
2. 分かりやすさ
3. 安定性
4. 軽量化
5. 保守・修正しやすさ
6. 見た目

これはTrade-off順です。User-facing UIは見た目も完成条件から外さず、[Visual Quality Baseline](docs/17-visual-quality-baseline.md)を満たします。

MUST / SHOULD / MAY / CONDITIONAL、Source of Truth、Rule Budget、Single Normative Ownerは [00 Guide Governance](docs/00-governance.md) が正本です。

## 作業開始

1. [START HERE](START_HERE.md) で作業種類を確認
2. 必要なら [21 Rule Routing / Preflight](docs/21-rule-routing-preflight.md) と [`maintenance/rule-router.json`](maintenance/rule-router.json) でRequired Owner / Gateを解決
3. 対象ProjectのCurrent Repository / Requirements / Spec / Rules / Learningsを必要範囲で確認
4. 必要なOwner Docだけ実読込
5. 実装・調査・要件整理
6. 最終状態で [07 Testing / Quality](docs/07-testing-quality.md) と [Quality Checklist](templates/QUALITY_CHECKLIST.md) を必要範囲で確認

Machine-readable Routingは`maintenance/rule-router.json`、Routing Behaviorは`docs/21`が正本です。`START_HERE.md`は人間 / Tool制約環境向けSummaryとして保ちます。

## Owner Docs

| # | Owner |
|---|---|
| 00 | [Guide Governance](docs/00-governance.md) |
| 01 | [要件定義](docs/01-requirements.md) |
| 02 | [Architecture](docs/02-architecture.md) |
| 03 | [Data / Storage](docs/03-data-storage.md) |
| 04 | [UI / UX / Accessibility](docs/04-ui-ux-accessibility.md) |
| 05 | [Performance / Reliability](docs/05-performance-reliability.md) |
| 06 | [Security](docs/06-security.md) |
| 07 | [Testing / Quality](docs/07-testing-quality.md) |
| 08 | [GitHub Pages](docs/08-github-pages.md) |
| 09 | [Version / Maintenance](docs/09-maintenance.md) |
| 10 | [GitHub中心のProject Management](docs/10-project-management.md) |
| 11 | [Electron / Distribution](docs/11-electron-distribution.md) |
| 12 | [Project Profiles](docs/12-project-profiles.md) |
| 13 | [Dependencies / Assets](docs/13-dependencies-assets.md) |
| 14 | [Continuous Improvement](docs/14-continuous-improvement.md) |
| 15 | [Development Observability / Project Memory](docs/15-development-observability.md) |
| 16 | [Cross-Repository GitHub Infrastructure](docs/16-cross-repository-github-infrastructure.md) |
| 17 | [Visual Quality Baseline](docs/17-visual-quality-baseline.md) |
| 18 | [Domain-first Visual Research](docs/18-domain-first-visual-research.md) |
| 19 | [Game Development](docs/19-game-development.md) |
| 20 | [Evidence-first Research](docs/20-evidence-first-research.md) |
| 21 | [Rule Routing / Preflight](docs/21-rule-routing-preflight.md) |

同じ判断の詳細RuleをREADMEへ再掲しません。

## Project Profiles

必要なものだけ組み合わせます。

`STATIC` / `DATA` / `LEARNING` / `GAME` / `MEDIA` / `AI-HANDOFF` / `CLOUD` / `ELECTRON` / `TOOL` / `PUBLIC-CONTENT`

Profileの意味と適用条件は [12 Project Profiles](docs/12-project-profiles.md) が正本です。

## Catalog = Evidence / Reference

CatalogはNormative Rule本文の置き場所ではありません。

- [Failure Catalog](catalog/failures.md)
- [Success Pattern Catalog](catalog/success-patterns.md)
- [Anti-Pattern Catalog](catalog/anti-patterns.md)
- [Validated Visual Direction Catalog](catalog/validated-visual-directions.md)

Ruleは各Owner Doc、Catalogは実例・Evidence・再利用条件を担当します。

## Templates

必要なTemplateだけ使います。

- [Requirements](templates/REQUIREMENTS_TEMPLATE.md)
- [README](templates/README_TEMPLATE.md)
- [Specification](templates/SPEC_TEMPLATE.md)
- [Project Rules](templates/PROJECT_RULES_TEMPLATE.md)
- [AGENTS](templates/AGENTS_TEMPLATE.md)
- [ADR](templates/ADR_TEMPLATE.md)
- [Work Report](templates/WORK_REPORT_TEMPLATE.md)
- [Project Learnings](templates/PROJECT_LEARNINGS_TEMPLATE.md)
- [Quality Checklist](templates/QUALITY_CHECKLIST.md)
- [Diagnostics Schema](templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json)
- [CHANGELOG](templates/CHANGELOG_TEMPLATE.md)
- [Requirements Conversation Resume](templates/REQUIREMENTS_CONVERSATION_TEMPLATE.md)
- [Implementation Conversation Handoff](templates/IMPLEMENTATION_CONVERSATION_TEMPLATE.md)

ChatGPT Projectの会話分離・Handoff等の運用詳細は [10 Project Management](docs/10-project-management.md) が正本です。

## 最低限の共通原則

- 同じ情報・判断のSource of Truthを複数作らない
- Current Repositoryを古いConversation / ZIPより優先する
- 保存データを壊す変更はMigration / Backup / Rollbackを確認する
- Public Repository / PagesへSecretを置かない
- 未実装 / 未確認を完成済みとして扱わない
- User-facing UIはVisual Quality Baselineを満たす
- Meaningful Visual ChangeはDomain-first Visual Researchを先に確認する
- 重要なResearchable QuestionはEvidence-first ResearchへRoutingする
- 再発防止価値の高い失敗・成功はProject Learningsへ残す
- 新しいCommon Ruleを増やす前に統合・削減・Scope縮小を確認する

詳細は各Owner Docを正本とします。

## Guide自身の改善

Guide改善は [14 Continuous Improvement](docs/14-continuous-improvement.md) と [00 Governance](docs/00-governance.md) に従います。

- Rule追加と同時に重複を探す
- Requirementsを履歴帳にしない
- README / START_HEREを詳細Ruleの第二正本にしない
- Project固有情報をCommon Ruleへ無制限に入れない
- 高影響変更はBranch / Pull Requestを優先
- 最終CommitでGuide Validator / Routing Regressionを確認

機械可読Review設定: [`maintenance/review-policy.json`](maintenance/review-policy.json)

## Validation

- Guide structure / links: [`tests/validate-guide.mjs`](tests/validate-guide.mjs)
- Rule routing / Golden Cases: [`tests/validate-routing.mjs`](tests/validate-routing.mjs)
- Workflow: [Validate Guide](.github/workflows/validate-guide.yml)

Account共通GitHub実装は [`EliteMay/.github`](https://github.com/EliteMay/.github)、Project固有仕様・Runtime・Testは各Project Repositoryが担当します。
