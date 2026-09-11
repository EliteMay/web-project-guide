# Web Project Guide

個人向けWebサイト / Webアプリ / Electronアプリ / Browser Game制作で、**毎回同じ失敗を繰り返さず、必要な判断基準だけを確実に読むためのSource of Truth**です。

## 人間向けWeb版

機能や作業内容からルールを分かりやすく探したい場合は、まずWeb版を使います。

- 公開サイト: <https://elitemay.github.io/web-project-guide/>
- Human Guideの実体は `site/` にまとめ、Repository rootの `index.html` は公開Entryとして維持します。
- Rootの `ai-workflow.html` / `rules.html` / `work-dashboard.html` は既存URL互換のAdapterで、実ページは `site/pages/` が正本です。
- 正式なRule本文の正本は、引き続きこのRepositoryの `docs/` と各Owner Docです。

最初から全章を読む必要はありません。

1. [START HERE](START_HERE.md) で今回の作業Routeを確認
2. Meaningful / Systemicな作業では [Rule Routing / Preflight](docs/21-rule-routing-preflight.md) で必要Ownerを解決
3. 今回必要なOwner Docだけ読む
4. 対象ProjectのCurrent Repository / Requirements / Spec / Rules / Learningsを必要範囲で確認
5. Current Repository / Evidenceで解ける判断はBest Reasonable Decisionで進める
6. 実装・調査・要件整理後、必要なValidationを行う
7. Guide対象の開発InteractionでConversation Persistenceの書込み経路がある場合、最終応答を完了する前に保存と必要なCheckpoint更新を実行し、成功を確認する

Guide Versionの正本は [`guide-version.json`](guide-version.json)、変更履歴は [`CHANGELOG.md`](CHANGELOG.md) です。`guideVersion` / `updated` は最後にReleaseしたBaselineを表し、`status: unreleased-changes` の場合はCurrent `main`にそのRelease以後の未Release変更があることを表します。Current Ruleを判断するときはVersion番号だけでなくRepositoryの現在状態を優先します。

## 主要ファイル・フォルダの意味

英語のFile名・Folder名はそのまま使いますが、何のためのものか分かりやすいようにREADMEで日本語説明します。**Codeや各File本文の中まで日本語説明を追加する必要はありません。**

| File / Folder | 日本語での役割 |
|---|---|
| `README.md` | このRepository全体の入口・概要 |
| `START_HERE.md` | 今回の作業でどのRuleを読むか決める人間向け入口 |
| `REQUIREMENTS.md` | 現在のGuideで守る要件・Contract |
| `REQUIREMENTS_DRAFT.md` | まだ正式確定していない要件案 |
| `PROJECT_LEARNINGS.md` | 今後も再利用する長期的な学び・失敗/成功知識 |
| `CHANGELOG.md` | 正式Releaseごとの変更履歴 |
| `UNRELEASED.md` | 次の正式Release前に入っている未Release変更の要約 |
| `DASHBOARD_REQUIREMENTS.md` | Dashboard機能の要件 |
| `WORK_QUEUE_REQUIREMENTS.md` | Work Queue機能の要件 |
| `guide-version.json` | Guide VersionとRelease状態の機械可読情報 |
| `project-dashboard.json` | このRepository用Dashboardの設定情報 |
| `docs/` | 正式なRule本文を置く場所 |
| `templates/` | 新しいProjectや文書を作るときのひな形 |
| `catalog/` | 失敗例・成功例・Anti-pattern等の再利用Catalog |
| `references/` | Common Guideを支えるPublicで再利用可能なCurated Research / Reference |
| `maintenance/` | Router / Review設定 / Audit Checklist / Current Research Protocol / 旧Path互換Pointer |
| `tests/` | Guide構造や整合性を確認するValidation / Test |
| `site/` | 人間向けWeb版Guideの実ページ |
| `project-dashboards/` | Project別Dashboard設定 |
| `.github/` | GitHub ActionsなどGitHub側の設定 |
| `index.html` | GitHub Pages公開サイトの入口 |
| `ai-workflow.html` / `rules.html` / `work-dashboard.html` | 旧URL互換用の入口。実ページは`site/`側が正本 |
| `作業報告書.md` | 直近作業・Validation・未確認事項の記録 |

## 人が見る文章の言語

Project Ownerや日本語利用者が直接見る場所は、**日本語を基本**にします。

- サイトの画面、管理画面、Dashboard、README、操作説明、作業報告、AIからUserへの説明は、日本語だけでも意味を理解できる文章を優先します。
- File名、Folder名、変数名、関数名、Schema名、API名など、技術上英語が自然な内部識別子は英語のままで構いません。
- 人が見る場所で英語の専門用語が必要な場合は、`Work Queue（作業待ち一覧）` のように日本語の意味を添えるか、周囲の日本語だけで役割が理解できるようにします。
- 英語の専門語を短い文の中へ連続して並べ、英語を理解しないと機能や状態が分からない表現を避けます。
- End User向け画面はProjectの対象利用者と言語要件を優先します。海外向け・英語学習向けなど、英語表示自体が目的に合う場合まで日本語へ固定しません。
- Owner向け画面とEnd User向け画面の対象言語が異なる場合は、Owner向け説明を日本語、Product本体を対象利用者の言語に分けられます。

## 開発会話の保存

このGuideを適用して進めるProject関連の開発会話は、`EliteMay/web-project-data`へ書き込めるCapabilityがある場合、Interaction単位でConversation Persistence対象にします。雑談・買い物・健康相談・一般知識等の非開発会話は対象外です。

Conversation Persistenceは「あとでまとめて保存する任意作業」ではなく、**各完了InteractionのCompletion Gate**です。書込み可能な経路がある場合は、最終応答を完了する前に現在のInteractionを正式Persistence経路へ通し、保存と必要なCheckpoint更新の成功を確認してから完了扱いにします。

保存成功を確認できないInteractionを「保存済み」と扱わず、Conversation historyをProjectの第二Source of Truthにも使いません。詳細条件・Secret取扱い・Platform boundaryは [23 Conversation Handoff / Recovery](docs/23-conversation-handoff-recovery.md#development-conversation-persistence) を正本とします。

## Guide / Dataの保存境界

`EliteMay/web-project-data`へ書込み可能な場合、**作業データ・時点記録・履歴Evidence**はData側へ保存し、PublicなCommon Guideへ蓄積しません。

主な境界:

- Current Common Rule / Procedure / Routing / Validation → `web-project-guide`
- Publicで複数Projectへ直接再利用するCurated Research / Reference → `web-project-guide/references/`
- point-in-time Audit Result / Finding / Resolution → `web-project-data/evidence/`
- Project-specific / time-specific Evidence → `web-project-data/evidence/`
- Promotion済みHistorical Research Record / Research backlog / detailed working research → `web-project-data/research/`
- Conversation / Workstream / Work Queue等の開発状態 → `web-project-data`
- Project固有のCurrent Requirements / Code / Data → 対象Project Repository

Data側の記録もCurrent Common RuleやProject Stateの第二Source of Truthにはしません。詳細な境界は [14 Continuous Improvement / Guide Audit](docs/14-continuous-improvement.md#research--evidence-storage-boundary) を参照します。

## 基本優先順位

Trade-off時は原則として次を優先します。

1. 操作性
2. 分かりやすさ
3. 安定性
4. 軽量化
5. 保守・修正しやすさ
6. 見た目

見た目が6番目でもUser-facing UIを未調整のまま完成扱いしません。最低品質は [Visual Quality Baseline](docs/17-visual-quality-baseline.md) を参照します。

MUST / SHOULD / MAY / CONDITIONAL、Source of Truth、Rule Budgetは [Guide Governance](docs/00-governance.md) が正本です。

## Owner Docs

| Topic | Owner |
|---|---|
| Governance / Rule Budget | [00](docs/00-governance.md) |
| Requirements / Decision / Persistence | [01](docs/01-requirements.md) |
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
| Continuous Improvement / Guide Audit | [14](docs/14-continuous-improvement.md) |
| Observability / Project Memory | [15](docs/15-development-observability.md) |
| Cross-Repository GitHub | [16](docs/16-cross-repository-github-infrastructure.md) |
| Visual minimum quality | [17](docs/17-visual-quality-baseline.md) |
| Visual Research / Redesign | [18](docs/18-domain-first-visual-research.md) |
| Game Development | [19](docs/19-game-development.md) |
| Evidence-first Research | [20](docs/20-evidence-first-research.md) |
| Rule Routing / Preflight | [21](docs/21-rule-routing-preflight.md) |
| Task-first Structure / Flow Research | [22](docs/22-task-first-structure-flow-research.md) |
| Conversation Handoff / Recovery | [23](docs/23-conversation-handoff-recovery.md) |

Machine-readable Routingは [`maintenance/rule-router.json`](maintenance/rule-router.json) を正本とします。

## 重要な共通原則

- 同じ判断のNormative Ownerを複数作らない。
- Project固有仕様は対象Projectへ置き、Common Guideへ混ぜない。
- Current Repository / Requirements / Evidenceで合理的に解ける判断をUserへ不必要に返さない。
- 保存データを壊す変更ではMigration / Backup / Rollbackを考える。
- 公開GitHub / Pagesへ秘密情報を置かない。
- 未実装・未確認を完成済み / 確認済みとして扱わない。
- User-facing UIはVisual Quality Baselineを満たす。
- Meaningful Visual Changeは必要なResearchを先に行う。
- MeaningfulなIA / Navigation / Task Flow変更ではTask-first Structure / Flow Researchを使う。
- AI生成Codeも既存仕様・Test・最終状態のValidationを通す。
- 新しいCommon Ruleを追加する前に、既存Owner / Catalog / Checklist / Project側へ統合できないか確認する。
- Requirementsへ実装済み改善履歴を積み続けない。
- Conversation historyをProjectの第二Source of Truthにしない。
- Project-specific / time-specific EvidenceやAudit結果をCommon GuideのCurrent Ruleと混在させない。

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

`references/`には、Common Guideを支え、Publicで複数Projectへ直接再利用する価値があるCurated Research / Standards / Working Hypothesisを置けます。

一方、Project-specific / time-specific Evidence、Audit Snapshot、Promotion済みHistorical Research、詳細なResearch working stateは、`EliteMay/web-project-data`へ書込み可能な場合はData側へ保存します。File名に`research`や`evidence`が付くだけで機械的にどちらかへ固定せず、**Current Public Guideとして再利用するか、保存データか**で分けます。

Project固有の最終RequirementはCommon ReferenceやData Recordだけに残しません。

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

必要な場合のみ `データ・コンテンツ` / `GitHub・公開` を使います。ChatGPT UI固有の詳細運用をCommon Web Ruleへ増やしません。会話移行・復旧のBehaviorは [23 Conversation Handoff / Recovery](docs/23-conversation-handoff-recovery.md) を参照します。

## Guide自身の品質確認

push / pull request時に [`tests/validate-guide.mjs`](tests/validate-guide.mjs) を実行します。

主な確認対象:

- 必須Docs / Templates / Routerの存在
- Markdown相対Link
- Guide Version / CHANGELOG整合
- Release baseline / Current unreleased state整合
- Catalog ID整合
- Owner / Gate / Router参照整合
- 代表Golden Routing Case

Validator成功は文章品質や実Projectの完成を自動保証するものではありません。

Account共通GitHub実装は [`EliteMay/.github`](https://github.com/EliteMay/.github) が担当し、このRepositoryは判断基準を担当します。

## 履歴・データの置き場所

- `REQUIREMENTS.md` — 現在のGuide Project Contract
- `CHANGELOG.md` — Version単位の変更概要
- `作業報告書.md` — 直近作業 / Validation / 未確認
- `PROJECT_LEARNINGS.md` — 再発価値のある長期知識
- `EliteMay/web-project-data/evidence/` — point-in-time Audit / Project-specific / time-specific Evidence
- `EliteMay/web-project-data/research/` — Historical / working Research Data
- `maintenance/audits/` / moved `maintenance/research/*` / moved `references/*` — 必要な旧Path互換Pointer
- Git history / PR — 詳細差分

Current RequirementsとHistory、Current Ruleと保存データを同じ役割へ積み上げません。
