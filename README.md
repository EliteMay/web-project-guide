# Web Project Guide

個人向けWebサイト / Webアプリ / Electronアプリ / Browser Game制作で、**毎回同じ失敗を繰り返さず、必要な判断基準だけを確実に読むためのSource of Truth**です。

最初から全章を読む必要はありません。

1. [START HERE](START_HERE.md) で今回の作業Routeを確認
2. Meaningful / Systemicな作業では [Rule Routing / Preflight](docs/21-rule-routing-preflight.md) で必要Ownerを解決
3. 今回必要なOwner Docだけ読む
4. 対象ProjectのCurrent Repository / Requirements / Spec / Rules / Learningsを必要範囲で確認
5. 実装・調査・要件整理後、必要なValidationを行う

Guide Versionの正本は [`guide-version.json`](guide-version.json)、変更履歴は [`CHANGELOG.md`](CHANGELOG.md) です。

## 基本優先順位

Trade-off時は原則として次を優先します。

1. 操作性
2. 分かりやすさ
3. 安定性
4. 軽量化
5. 保守・修正しやすさ
6. 見た目

見た目が6番目でも、User-facing UIを未調整のまま完成扱いしません。最低品質は [Visual Quality Baseline](docs/17-visual-quality-baseline.md) を参照します。

MUST / SHOULD / MAY / CONDITIONAL、Source of Truth、Rule Budgetは [Guide Governance](docs/00-governance.md) が正本です。

## Owner Docs

| Topic | Owner |
|---|---|
| Governance / Rule Budget | [00](docs/00-governance.md) |
| Requirements | [01](docs/01-requirements.md) |
| Architecture | [02](docs/02-architecture.md) |
| Data / Storage / Migration | [03](docs/03-data-storage.md) |
| UI / UX / Accessibility | [04](docs/04-ui-ux-accessibility.md) |
| Performance / Reliability | [05](docs/05-performance-reliability.md) |
| Security | [06](docs/06-security.md) |
| Testing / Verification | [07](docs/07-testing-quality.md) |
| GitHub Pages | [08](docs/08-github-pages.md) |
| Version / Maintenance | [09](docs/09-maintenance.md) |
| Project Management | [10](docs/10-project-management.md) |
| Electron / Distribution | [11](docs/11-electron-distribution.md) |
| Project Profiles | [12](docs/12-project-profiles.md) |
| Dependencies / Assets | [13](docs/13-dependencies-assets.md) |
| Continuous Improvement | [14](docs/14-continuous-improvement.md) |
| Observability / Project Memory | [15](docs/15-development-observability.md) |
| Cross-Repository GitHub | [16](docs/16-cross-repository-github-infrastructure.md) |
| Visual minimum quality | [17](docs/17-visual-quality-baseline.md) |
| Visual Research / Redesign | [18](docs/18-domain-first-visual-research.md) |
| Game Development | [19](docs/19-game-development.md) |
| Evidence-first Research | [20](docs/20-evidence-first-research.md) |
| Rule Routing / Preflight | [21](docs/21-rule-routing-preflight.md) |
| Task-first Structure / Flow Research | [22](docs/22-task-first-structure-flow-research.md) |

Machine-readable Routingは [`maintenance/rule-router.json`](maintenance/rule-router.json) を正本とします。

## 重要な共通原則

- 同じ判断のNormative Ownerを複数作らない。
- Project固有仕様は対象Projectへ置き、Common Guideへ混ぜない。
- 保存データを壊す変更ではMigration / Backup / Rollbackを考える。
- 公開GitHub / Pagesへ秘密情報を置かない。
- 未実装・未確認を完成済み / 確認済みとして扱わない。
- User-facing UIはVisual Quality Baselineを満たす。
- Meaningful Visual Changeは必要なResearchを先に行う。
- MeaningfulなIA / Navigation / Task Flow変更ではTask-first Structure / Flow Researchを使う。
- AI生成Codeも既存仕様・Test・最終状態のValidationを通す。
- 新しいCommon Ruleを追加する前に、既存Owner / Catalog / Checklist / Project側へ統合できないか確認する。
- Requirementsへ実装済み改善履歴を積み続けない。

詳細は各Owner Docを正本とします。

## Project Profiles

Projectの性質を補助的に表すため、必要に応じて組み合わせます。

`STATIC` / `DATA` / `LEARNING` / `GAME` / `MEDIA` / `AI-HANDOFF` / `CLOUD` / `ELECTRON` / `TOOL` / `PUBLIC-CONTENT`

Profileだけで今回必要なRuleを決めません。実際の変更内容・Runtime・Risk Signalも見てRoutingします。詳細は [Project Profiles](docs/12-project-profiles.md) を参照してください。

## Catalog / References

CatalogはRule本文ではなく、実例・Evidence・再利用条件です。

- [Failure Catalog](catalog/failures.md)
- [Success Pattern Catalog](catalog/success-patterns.md)
- [Anti-Pattern Catalog](catalog/anti-patterns.md)
- [Validated Visual Direction Catalog](catalog/validated-visual-directions.md)

Research / Standards / Working Hypothesisは `references/` に置きます。Project固有の最終RequirementはCommon Referenceだけに残しません。

## Templates

Project開始時に全部使う必要はありません。必要なものだけ利用します。

- [Requirements Core](templates/REQUIREMENTS_TEMPLATE.md)
  - [Conditional Requirement Packs](templates/requirements/README.md)
- [Requirements Conversation Resume](templates/REQUIREMENTS_CONVERSATION_TEMPLATE.md)
- [Implementation Conversation Handoff](templates/IMPLEMENTATION_CONVERSATION_TEMPLATE.md)
- [README](templates/README_TEMPLATE.md)
- [Specification](templates/SPEC_TEMPLATE.md)
- [Project Rules](templates/PROJECT_RULES_TEMPLATE.md)
- [AGENTS](templates/AGENTS_TEMPLATE.md)
- [ADR](templates/ADR_TEMPLATE.md)
- [Work Report](templates/WORK_REPORT_TEMPLATE.md)
- [Project Learnings](templates/PROJECT_LEARNINGS_TEMPLATE.md)
- [Diagnostics Schema](templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json)
- [Quality Checklist](templates/QUALITY_CHECKLIST.md)
- [CHANGELOG](templates/CHANGELOG_TEMPLATE.md)

## ChatGPT Projectでの会話名

ChatGPT Project側で会話名の固定形式が定義されている場合は、そのProject設定を優先します。

このGuideでは基本区分だけを共通語彙として扱います。

- `Repository名（実装）`
- `Repository名（UI・見た目）`
- `Repository名（不具合・改善）`
- `Repository名（相談・調査）`

必要な場合のみ `データ・コンテンツ` / `GitHub・公開` を使います。ChatGPT UI固有の詳細運用をCommon Web Ruleへ増やしません。

## Guide自身の品質確認

push / pull request時に [`tests/validate-guide.mjs`](tests/validate-guide.mjs) を実行します。

主な確認対象:

- 必須Docs / Templates / Routerの存在
- Markdown相対Link
- Guide Version / CHANGELOG整合
- Catalog ID整合
- Owner / Gate / Router参照整合
- 代表Golden Routing Case

Validator成功は文章品質や実Projectの完成を自動保証するものではありません。

Account共通GitHub実装は [`EliteMay/.github`](https://github.com/EliteMay/.github) が担当し、このRepositoryは判断基準を担当します。

## 履歴の置き場所

- `REQUIREMENTS.md` — 現在のProject Contract
- `CHANGELOG.md` — Version単位の変更概要
- `作業報告書.md` — 直近作業 / Validation / 未確認
- Git history — 詳細差分

Current RequirementsとHistoryを同じファイルへ積み上げません。
