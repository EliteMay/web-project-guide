# START HERE

このページは、`web-project-guide` を毎回すべて読むためのページではなく、**今回の作業に必要な正本へ最短で移動するRouter**です。

詳細ルールをここへ複製しません。判断に迷う場合は最初に [Guide Governance](docs/00-governance.md) を確認します。

## 新しいWebサイトを作る

1. [Guide Governance](docs/00-governance.md)
2. [要件定義](docs/01-requirements.md)
3. [Project Profiles](docs/12-project-profiles.md)
4. 必要な専門章だけ確認
   - Architecture → [02](docs/02-architecture.md)
   - Data / Storage → [03](docs/03-data-storage.md)
   - UI / UX → [04](docs/04-ui-ux-accessibility.md)
   - Performance → [05](docs/05-performance-reliability.md)
   - Security → [06](docs/06-security.md)
   - GitHub Pages → [08](docs/08-github-pages.md)
   - Electron → [11](docs/11-electron-distribution.md)
5. User-facing UIは [Visual Quality Baseline](docs/17-visual-quality-baseline.md)
6. Visual Directionが重要なら [Domain-first Visual Research](docs/18-domain-first-visual-research.md) → [UI / UX / Accessibility](docs/04-ui-ux-accessibility.md)
7. Interactive Projectなら [Development Observability / Project Memory](docs/15-development-observability.md)
8. 必要なTemplateを作成
9. 完成前に [Testing / Quality](docs/07-testing-quality.md) と [Quality Checklist](templates/QUALITY_CHECKLIST.md)

## 学習・解説サイトを作る / 直す

1. [Project Profiles](docs/12-project-profiles.md) で `LEARNING` を選ぶ
2. [要件定義](docs/01-requirements.md#learning--explanation-content) でStarting Knowledge / 学習順 / Content Depth Contract / 理解確認を決める
3. 教材がJSON等で大量にある場合は `DATA` Profileも併用し、[Data / Storage](docs/03-data-storage.md) を確認
4. 学習画面の読みやすさ・Navigationは [UI / UX / Accessibility](docs/04-ui-ux-accessibility.md)
5. 見た目を大きく変える場合は [Domain-first Visual Research](docs/18-domain-first-visual-research.md)
6. 完成前に「教材が存在する」だけでなく、初心者が前提から理解できるか、主要Lessonから次の学習・確認へ進めるかを確認
7. [Testing / Quality](docs/07-testing-quality.md) と [Quality Checklist](templates/QUALITY_CHECKLIST.md) で最終状態を確認

学習サイトではDashboardや教材件数が揃っていても、説明が用語紹介だけで終わる場合は完成扱いにしません。詳細基準は要件定義のLearning節を正本とします。

## 既存サイトのバグを直す

1. 現在のGitHub Repositoryを確認
2. README / Spec / Project Rules / `PROJECT_LEARNINGS.md` を必要範囲だけ確認
3. [GitHub中心のプロジェクト管理](docs/10-project-management.md)
4. Diagnostics採用Projectなら [Development Observability / Project Memory](docs/15-development-observability.md) のEvidenceを先に確認
5. 症状に関係する専門章 / [Failure Catalog](catalog/failures.md) を確認
6. Smallest Safe Changeを選び実装
7. 最終Commitで [Testing / Quality](docs/07-testing-quality.md) と必要なChecklistを確認

小規模Bugでフル要件定義や無関係な章を読み直す必要はありません。

## UIだけ直す

### 局所的なUI Bug

Alignment、overflow、clipping、既存ComponentのState等、原因と正解が明確な修正:

- [Visual Quality Baseline](docs/17-visual-quality-baseline.md)
- [UI / UX / Accessibility](docs/04-ui-ux-accessibility.md)
- [Testing / Quality](docs/07-testing-quality.md)

### 見た目・Layout・Theme・Navigationを意味のある範囲で変える

1. 現在UI / Screenshot / User feedbackを確認
2. [Domain-first Visual Research](docs/18-domain-first-visual-research.md)
3. [UI / UX / Accessibility](docs/04-ui-ux-accessibility.md)
4. [Visual Quality Baseline](docs/17-visual-quality-baseline.md)
5. 必要なら [Validated Visual Direction Catalog](catalog/validated-visual-directions.md) を**補助Referenceとして**確認
6. 最終状態をBrowser / Screenshotで確認

過去の成功例をDomain Researchより先に当てはめません。

## 見た目を何度直しても微妙

[Domain-first Visual Research](docs/18-domain-first-visual-research.md) の **Visual Foundation Reset** を確認します。

局所Patchを続けるか、Purpose / IA / Layoutから再設計するかを先に判断します。

## Visual Designを完成Reviewする

- [Visual Quality Baseline](docs/17-visual-quality-baseline.md)
- [Visual Design Review Gate](docs/04-ui-ux-accessibility.md#visual-design-review-gate)
- [Testing / Quality](docs/07-testing-quality.md)
- [Quality Checklist](templates/QUALITY_CHECKLIST.md) のVISUAL REVIEW

## ChatGPT / Codex / Claude等へ大きく実装を任せる

- [GitHub中心のプロジェクト管理](docs/10-project-management.md) のAI Coding Agent方針
- Agent向け入口が必要なら [AGENTS Template](templates/AGENTS_TEMPLATE.md)
- AI生成Codeも [Testing / Quality](docs/07-testing-quality.md) と通常のSecurity / Storage / Visual基準を通す
- Visual変更が大きい場合は [Domain-first Visual Research](docs/18-domain-first-visual-research.md) を先に行う

## 「こうなった」と説明する前に診断データを使う

- [Development Observability / Project Memory](docs/15-development-observability.md)
- `PROJECT_LEARNINGS.md`
- Remote Diagnostic Handoff採用時は最新のSanitized Snapshot

ユーザーへ同じ症状を再説明してもらう前に、既にあるEvidenceを確認します。

## ZIPを毎回作らずChatGPTへ診断を渡す

[Development Observability / Project Memory](docs/15-development-observability.md) のRemote Diagnostic Handoffを正本として確認します。

Storage固有の判断は [Data / Storage](docs/03-data-storage.md)、Security固有の判断は [Security](docs/06-security.md) を追加で確認します。

## 保存形式・JSON・データ構造を変える

- [Data / Storage](docs/03-data-storage.md)
- [Version / Maintenance](docs/09-maintenance.md)
- 高リスク判断は [ADR Template](templates/ADR_TEMPLATE.md)
- 完成前は [Quality Checklist](templates/QUALITY_CHECKLIST.md) のDATA / TOOL

## Backup / Import / Restoreを作る・直す

- [Data / Storage](docs/03-data-storage.md) のImport / Restore
- [Quality Checklist](templates/QUALITY_CHECKLIST.md) のDATA / TOOL

## 既存サイトの構造を整理する / Patchを統合する

- [Architecture](docs/02-architecture.md)
- [Version / Maintenance](docs/09-maintenance.md)
- [GitHub中心のプロジェクト管理](docs/10-project-management.md)
- Runtime / hardcode / DOM patch系の [Failure Catalog](catalog/failures.md)

## GitHub Pagesで動かない

- [GitHub Pages](docs/08-github-pages.md)
- [Testing / Quality](docs/07-testing-quality.md)

## Electronを作る・直す

- [Electron / Distribution](docs/11-electron-distribution.md)
- [Security](docs/06-security.md)
- [Development Observability / Project Memory](docs/15-development-observability.md)
- [Testing / Quality](docs/07-testing-quality.md)

Setup.exe / Auto Update / Release Contractの詳細はElectron章を正本とし、このRouterへ複製しません。

## 外部API・CDN・Supabase等を導入する

- [Performance / Reliability](docs/05-performance-reliability.md)
- [Security](docs/06-security.md)
- [Dependencies / Assets](docs/13-dependencies-assets.md)
- Data保存を伴う場合は [Data / Storage](docs/03-data-storage.md)
- Runtime診断を伴う場合は [Development Observability](docs/15-development-observability.md)

## 複数RepositoryのGitHub運用を共通化する

[Cross-Repository GitHub Infrastructure](docs/16-cross-repository-github-infrastructure.md) を正本として確認します。

実装側のAccount共通Defaultは `EliteMay/.github`、Project固有仕様は各Repositoryへ残します。

## Guide自体を改善する

1. [Guide Governance](docs/00-governance.md) のRule Budget / Single Normative Ownerを確認
2. [Continuous Improvement](docs/14-continuous-improvement.md)
3. [`maintenance/review-policy.json`](maintenance/review-policy.json)
4. 新しいRuleを追加する前に、既存Rule・Catalog・Checklist・Project側へ統合できないか確認
5. Owner Docを決め、README / START HEREから辿れることを確認
6. 高影響変更はBranch / Pull Request
7. 最終CommitでGuide Validatorを確認

## ルールの読み方

- **MUST / 必須** — 原則守る
- **SHOULD / 原則** — 通常守るが明確な理由で外せる
- **MAY / 推奨** — 条件に合う場合に採用
- **CONDITIONAL / 条件付き** — 指定条件のときだけ適用

詳細は [Guide Governance](docs/00-governance.md) を正本とします。

## 完成前

1. [Quality Checklist](templates/QUALITY_CHECKLIST.md) をProject Profile / 変更内容に合わせて実施
2. User-facing UIは [Visual Quality Baseline](docs/17-visual-quality-baseline.md)
3. README / Spec / Work Report / Project Learningsを必要範囲だけ更新
4. 未確認事項を明記
5. 一時Script / Workflow / Debug資産をCleanup
6. **Cleanup後の最終Commit**でCI / Pages / Regressionを確認
7. 重大な既知Bugが残る場合は完成扱いにしない
