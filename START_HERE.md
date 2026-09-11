# START HERE

このページは `web-project-guide` の**人間向けRouter**です。詳細Ruleをここへ複製しません。

Meaningful / Systemicな作業では、最初に [Rule Routing / Preflight](docs/21-rule-routing-preflight.md) を確認し、今回必要なOwner Docを決めてから進めます。Machine-readable Routingは [`maintenance/rule-router.json`](maintenance/rule-router.json) が正本です。

Current Repository / Requirements / Existing User Intent / Evidenceから合理的に判断できる内容は、細かな承認待ちを作らずBest Reasonable Decisionで進めます。User Decisionの例外条件は [01 Requirements](docs/01-requirements.md) を正本とします。

## 新しいサイト / アプリ / ゲームを作る

1. [00 Governance](docs/00-governance.md)
2. [01 Requirements](docs/01-requirements.md)
3. [12 Project Profiles](docs/12-project-profiles.md)
4. [21 Rule Routing / Preflight](docs/21-rule-routing-preflight.md)
5. 今回必要な専門Ownerだけ読む
6. 完成前に [07 Testing / Quality](docs/07-testing-quality.md) と [Quality Checklist](templates/QUALITY_CHECKLIST.md)

User-facing UIがある場合は [17 Visual Quality Baseline](docs/17-visual-quality-baseline.md) も確認します。主要なIA / Navigation / Task Flowを新規設計する場合は [22 Task-first Structure / Flow Research](docs/22-task-first-structure-flow-research.md) を使います。

## 学習・解説サイト

- Requirements / Learning Outcome / Content → [01](docs/01-requirements.md)
- Project Profile → [12](docs/12-project-profiles.md)
- Structure / Learning Flow → [22](docs/22-task-first-structure-flow-research.md)
- Learning / Assessment Verification → [07](docs/07-testing-quality.md)
- UI / 読みやすさ → [04](docs/04-ui-ux-accessibility.md)
- 大きなVisual変更 → [18](docs/18-domain-first-visual-research.md)
- 大量Data → [03](docs/03-data-storage.md)

教材が存在するだけで完成扱いせず、Starting Knowledge、Learning Objective、前提Concept、説明 / Practiceの深さ、Understanding / Application evidence、Feedback、Next Stepを確認します。

## ゲーム

- Requirements入口 → [01](docs/01-requirements.md)
- GAME Profile → [12](docs/12-project-profiles.md)
- Game-specific設計 / Completion / Playtest → [19](docs/19-game-development.md)
- Menu / Information Architecture / Task Flow → [22](docs/22-task-first-structure-flow-research.md)
- Save → [03](docs/03-data-storage.md)
- Performance → [05](docs/05-performance-reliability.md)
- UI / Visual → [04](docs/04-ui-ux-accessibility.md) / [17](docs/17-visual-quality-baseline.md)
- HUD / Inventory / Build UI / Management UI / Menu等のMeaningfulなUI要件・Visual Directionを決める → **候補案を固定する前に** [18](docs/18-domain-first-visual-research.md)

主要Flow / Completionへ影響する変更ではActual PlaytestをStatic Testで置き換えません。既存ThemeやVisual Directionがあっても、今回のGameplay Taskに合うUI構成・情報密度が未検証ならVisual Researchを省略しません。

## 調査して方針を決める

重要かつ不確実なResearchable Question:

1. [20 Evidence-first Research](docs/20-evidence-first-research.md)
2. Topic-specific Owner
3. Evidence Map / Discussion
4. Project-specific Decision
5. Requirements / Prototype / Validation

単純な事実確認や原因が明確な局所BugへDeep Researchを強制しません。

## サイト構造 / 機能 / Flow

User GoalからIA / Navigation / Flow / State / Pageを組み立てる場合:

1. Current Requirements / User Goal /主要Taskを確認
2. [22 Task-first Structure / Flow Research](docs/22-task-first-structure-flow-research.md)
3. 一般UX原則は [04 UI / UX / Accessibility](docs/04-ui-ux-accessibility.md)
4. 重要かつ不確実なら [20 Evidence-first Research](docs/20-evidence-first-research.md)
5. Project固有のIA / FlowをRequirements / Spec等へ保存
6. Wireframe後、Meaningful Visual Changeを伴う場合だけ [18 Domain-first Visual Research](docs/18-domain-first-visual-research.md)

PageやSidebar等を先にTemplateとして決めず、Goal / Task / Information / Functionから構造を導きます。

## 既存サイトのBug Fix

1. Current Repositoryを確認
2. README / Requirements / Spec / Rules / Learningsを必要範囲で確認
3. [10 Project Management](docs/10-project-management.md)
4. 症状に関係する専門Owner
5. Smallest Safe Change
6. [07 Testing / Quality](docs/07-testing-quality.md)

局所BugでFull Guideを読みません。

## UI / 見た目

### 局所Bug

Alignment / overflow / clipping / Component State等:

- [04 UI / UX / Accessibility](docs/04-ui-ux-accessibility.md)
- [17 Visual Quality Baseline](docs/17-visual-quality-baseline.md)
- [07 Testing](docs/07-testing-quality.md)

### MeaningfulなUI要件 / Visual Change

HUD / Inventory / Build UI / Management UI / Menu / Layout / Theme / Visual Composition / 大規模Redesign等:

1. Current UI / Screenshot / Requirements / User Feedback
2. IA / Navigation / Task Flow自体を変えるなら先に [22 Task-first Structure / Flow Research](docs/22-task-first-structure-flow-research.md)
3. **要件定義中でも候補案やおすすめを固定する前に** [18 Domain-first Visual Research](docs/18-domain-first-visual-research.md)
4. [04 UI / UX / Accessibility](docs/04-ui-ux-accessibility.md)
5. [17 Visual Quality Baseline](docs/17-visual-quality-baseline.md)
6. 実装した場合はBrowser / Screenshotで最終確認

既存Theme / Visual Directionが決まっているだけではResearch済み扱いにしません。方向が未確定なMeaningful UIでは、AIの一般知識だけからA / B / C案や「おすすめ」をResearchより先に固定しません。

Navigationの分類・階層・到達経路を変える作業はStructure / Flow、Navigation barの見た目を変える作業はVisualとしてRoutingします。何度直しても改善しない場合は `18` のVisual Foundation Resetを確認します。

## 保存 / JSON / Migration

- Data / Storage / Import / Restore → [03](docs/03-data-storage.md)
- Version / Compatibility → [09](docs/09-maintenance.md)
- Testing → [07](docs/07-testing-quality.md)

既存Save / Schema変更では `STORAGE-MIGRATION-GATE` を適用します。

## Architecture / Patch整理

- [02 Architecture](docs/02-architecture.md)
- [09 Version / Maintenance](docs/09-maintenance.md)
- [10 Project Management](docs/10-project-management.md)

旧Runtime / Patch / Observer後付けを増やすのではなく正式責務へ統合します。

## Web Deployment / Managed Hosting / Serverless / Backend

GitHub Pages以外を含む一般Web Deploymentでは:

- Hosting / Runtime shape、Environment / Config orchestration → [10 Project Management](docs/10-project-management.md)
- Release / Rollback / Recovery → [09 Version / Maintenance](docs/09-maintenance.md)
- Deployment / Environment Verification → [07 Testing / Quality](docs/07-testing-quality.md)
- Runtime failure / degradation → [05 Performance / Reliability](docs/05-performance-reliability.md)
- Secret / permission → [06 Security](docs/06-security.md)
- Runtime diagnostics → [15 Observability](docs/15-development-observability.md)

Static / Managed App / Serverless / Edge / Backend等をProvider名から先に固定せず、必要Runtime capabilityから選びます。Local / Preview / Staging / Productionを全Projectへ機械的に増やしません。

## GitHub Pages / 公開

GitHub Pagesを使う場合は一般Deployment routeに加えて:

- [08 GitHub Pages](docs/08-github-pages.md)
- [10 Project Management](docs/10-project-management.md)
- [07 Testing](docs/07-testing-quality.md)

Publishing Source、SPA direct-open、Custom Domain / HTTPS、Pages hosting limitation、cache / Service Worker recoveryは`08`を正本とします。公開URLを確認できる場合は最終状態と対応するURLを確認します。

## Browser / Web Platform Compatibility

Supported Browser / new Web API / CSS / JavaScript feature / WebView差を判断する場合:

- Support Target / fallback / support終了 → [01 Requirements](docs/01-requirements.md)
- Representative browser / device verification → [07 Testing / Quality](docs/07-testing-quality.md)
- Polyfill / transpilation / compatibility dependency → [13 Dependencies / Assets](docs/13-dependencies-assets.md)
- Current Baseline / Browser support evidence → [20 Evidence-first Research](docs/20-evidence-first-research.md)

Browser名から先に固定せず、Target User / Runtime / Primary TaskからSupport Contractを決めます。MDN Baseline等はPlanning Evidenceとして使い、実ProjectのRuntime確認を置き換えません。

## Electron / Windows配布

- [11 Electron / Distribution](docs/11-electron-distribution.md)
- [06 Security](docs/06-security.md)
- [07 Testing](docs/07-testing-quality.md)
- [15 Observability](docs/15-development-observability.md)

Setup.exe / Auto Update / Windows固有機能をCIだけで実機確認済み扱いにしません。

## 外部API / Webhook / CDN / Supabase

- Integration contract / mapping / provider boundary → [02 Architecture](docs/02-architecture.md)
- Reliability / Webhook delivery / retry / degradation → [05 Performance / Reliability](docs/05-performance-reliability.md)
- Auth / signature / secret / permission → [06 Security](docs/06-security.md)
- Integration test / Sandbox / completion → [07 Testing / Quality](docs/07-testing-quality.md)
- API / SDK / Webhook lifecycle / deprecation → [13 Dependencies / Assets](docs/13-dependencies-assets.md)
- 保存 / Sync / Reconciliationを伴う場合 → [03 Data / Storage](docs/03-data-storage.md)
- Runtime diagnostics / remote failure analysisが必要な場合 → [15 Observability](docs/15-development-observability.md)

## AI / Coding Agentへ大きく任せる

- [21 Rule Routing / Preflight](docs/21-rule-routing-preflight.md)
- [10 Project Management](docs/10-project-management.md)
- Projectに`AGENTS.md`があればそのRouter
- 通常と同じTesting / Security / Storage / Visual基準
- MeaningfulなUI / Visual要件では [18 Domain-first Visual Research](docs/18-domain-first-visual-research.md) を候補案・実装より先に行う

Memoryや古い会話だけでCurrent Repositoryを推測しません。

## 会話移行 / stale checkpoint / duplicate active conversation

- [23 Conversation Handoff / Recovery](docs/23-conversation-handoff-recovery.md)
- GitHub変更・Branch / PR → [10 Project Management](docs/10-project-management.md)
- Requirements Draft / Persistence → [01 Requirements](docs/01-requirements.md)

Conversation SummaryだけをCheckpointにせず、Current Repository / Requirements / Branch / PR / Commit等から復元します。Current work refが一意に復元できない場合だけ、その変更経路を止めて`unresolved`として扱います。

## 複数RepositoryのGitHub運用

[16 Cross-Repository GitHub Infrastructure](docs/16-cross-repository-github-infrastructure.md) を確認します。

## Guide自体を改善する

1. [00 Governance](docs/00-governance.md)
2. [21 Rule Routing / Preflight](docs/21-rule-routing-preflight.md)
3. [14 Continuous Improvement](docs/14-continuous-improvement.md)
4. 次回の要件定義・補強では [Content Depth Reinforcement Candidates](maintenance/research/content-depth-reinforcement.md) を読み、Defectと「内容が薄い領域」を分けて再評価
5. External Evidenceが必要なら [20 Evidence-first Research](docs/20-evidence-first-research.md)
6. 既存Owner / Catalog / Checklist / Project側へ統合できないか確認
7. Owner / Router / Validatorを整合
8. 最終CommitでGuide Validatorを確認

新Rule追加と同時に、重複・History混在・Orphan Ruleを減らせないか確認します。Content Depth候補もCurrent Ownerで既に解消済みなら再要件化しません。

## 完成前

必要範囲で次を確認します。

- [Quality Checklist](templates/QUALITY_CHECKLIST.md)
- README / Spec / Work Report / Learnings整合
- Cleanup後の最終Commit
- CI / Pages / Regression
- User-facing UIならVisual確認
- 実機が必要ならReal-device確認または未確認明記
- Guide対象の開発会話で`EliteMay/web-project-data`への書込み経路がある場合、そのInteractionを [23 Conversation Handoff / Recovery](docs/23-conversation-handoff-recovery.md#development-conversation-persistence) の正式Persistence経路へ通し、保存と必要なCheckpoint更新の成功を確認する
- 重大Known Issueが残る場合は完成扱いにしない
