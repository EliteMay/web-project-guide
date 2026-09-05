# CHANGELOG

Guide Versionの正本は [`guide-version.json`](guide-version.json) です。

## 1.16.0 - 2026-09-05

### Added

- `docs/05-performance-reliability.md`を **Page Load Performance全体のNormative Owner** として拡張
  - Repository総容量とInitial Page Load Costを分離し、Network Transfer / Parse / Decode / JavaScript Execution / DOM / Rendering / External Waitを実利用Costとして扱う
  - Resourceを `Critical / Deferred / On Demand` へ分類し、First View / Primary Actionに必要なものを優先
  - 画像・動画・JSON・JavaScript・DOM・外部通信・Cacheを初期表示Performanceの観点で統合
  - Cold Load / Repeat Load、Mobile / Slow Network、Main Thread / Long Taskを確認対象へ追加
- **Default Soft Budget / Review Trigger** を追加
  - Initial Transfer: Target ～1MB / Review Trigger 2MB超
  - Initial JavaScript: ～200KB / 350KB超
  - First View画像1枚: ～300KB / 500KB超
  - First View画像合計: ～700KB / 1MB超
  - 初期JSON 1 Request: ～250KB / 500KB超
  - 初期JSON合計: ～500KB / 1MB超
  - 初期DOM: ～1,000 nodes / 1,500 nodes超
  - Review Trigger超過は自動Failにせず、必要性・遅延・分割・圧縮・Cache・代替をReviewして判断
- `catalog/anti-patterns.md`へ `AP-032 Eager Initial Everything` を追加
- Guide ValidatorへPerformance Owner / Soft Budget / Small Site例外 / 03・07・08・13責務分離 / Checklist導線のRegression Guardを追加

### Consolidated

- `docs/03-data-storage.md`
  - JSON / Dataの意味単位・Schema / Manifest等のData構造だけを担当
  - Initial Load Timing / Transfer / Soft Budgetは`docs/05`へ委譲
- `docs/07-testing-quality.md`
  - Testing Strategy / Verification Stateを維持
  - Performance固有のMinimum / Standard / Extended確認深度は`docs/05`へRoute
- `docs/08-github-pages.md`
  - GitHub Pages固有のCache Busting / Service Worker更新だけを担当
  - Page Load Performance全体は`docs/05`へ委譲
- `docs/13-dependencies-assets.md`
  - Dependency選定・Asset権利・配布元・Repository管理へ責務を限定
  - 配信用Media / Font / External ResourceのPerformance詳細は`docs/05`へ委譲
- `templates/QUALITY_CHECKLIST.md`
  - 詳細Ruleを複製せず、Cold Load / Eager Load / Timing / Review Trigger / 大量DOM / Slow Network等の短い実行確認だけへ整理
- `docs/00-governance.md`
  - PerformanceのSingle Normative Ownerとして`docs/05`をOwner表へ登録

### Rule Hygiene

- 新しい番号付きOwner Docは追加せず、既存`docs/05`へ統合
- `README.md` / `START_HERE.md`は既存のPerformance Routeで十分なため変更せず、Router責務を維持
- Performance Rule本文をCatalog / Checklistへ全文複製せず、Catalogは代表的な再発防止1件、Checklistは実行項目だけに限定
- Repository Size、File数、Request数、動画総容量、Font File数を固定上限にしない

### Compatibility

- Soft BudgetはWeb標準の絶対上限ではなくDefault Target / Review Triggerとして扱う
- Review Trigger超過だけを理由にFail扱いしない
- 小規模`STATIC` SiteへService Worker / Virtualization / Performance CI / 複雑な分割Architectureを機械的に強制しない
- 数KB削減のために可読性・保守性を大きく壊さない
- 既存ProjectのRuntime / Storage / Schema / Deployment Defaultを変更しない

## 1.15.0 - 2026-09-04

### Added

- 学習・解説・資格対策・知識集向けの **`LEARNING` Project Profile** を追加
  - Data構造を扱う`DATA`と、教材・説明品質を扱う`LEARNING`を分離し、必要なら併用
  - Starting Knowledge / Prerequisite Path / Primary Learning Surface / Language Policy / Understanding Signal / Review Pathを要件化
- `docs/01-requirements.md`へ **Learning / Explanation Content** を追加
  - 主要LessonのContent Depth Contractとして「何か → なぜ必要か → どう動くか / どう考えるか → 具体例 → 比較・よくある勘違い → 理解確認」を定義
  - Glossaryの短い定義と、理解させるLessonを同じ深さにしないことを明記
  - 初心者向けでは製品固有語より前にWeb / Server / Network / DNS / Database / API等の必要な一般概念を教える順序を追加
  - 学習者向け画面へ内部状態名・英語Content Type・監査用Copyをそのまま露出しない方針を追加
- `START_HERE.md`へ「学習・解説サイトを作る / 直す」専用Routeを追加
- `templates/REQUIREMENTS_TEMPLATE.md`へLearning Content記入欄とLearning完成条件を追加
- `README.md`のProject Profile一覧へ`LEARNING`を追加

### Evidence

- `EliteMay/aws-study-guide` Project Learnings
  - 初心者はAWS固有Serviceより前に一般IT概念を必要とする
  - DashboardとPrimary Learning Surfaceは役割が異なる
  - CompletionとUnderstandingは別に扱う価値がある
- `EliteMay/ap-study-guide` Project Learnings
  - 教材件数Coverageと学習導線Coverageは別に検証する必要がある
  - Learner-facing UIへ内部 / 英語Labelが露出した実例がある
- 2026-09-04 AP Study Notes実利用Feedback
  - 英語表記が多く、Lesson説明が短すぎて単語紹介に留まる箇所があった
  - 「簡潔」と「説明不足」を分ける必要があった

### Rule Hygiene

- 新しい番号付きOwner Docは作成せず、Normative Ownerを`docs/01-requirements.md`へ統合
- Applicabilityは`docs/12-project-profiles.md`、Routerは`START_HERE.md`、Project記入用は`templates/REQUIREMENTS_TEMPLATE.md`へ分離
- Data / UI / Testingの既存Ownerは変更しない

### Compatibility

- 既存Projectへ`LEARNING`を自動付与しない
- 既存の`DATA` Profileを置き換えない
- 全Glossary項目へ長文説明を強制しない
- Lessonの見た目・色・Layoutを固定しない
- Runtime / Storage / Schema / Deployment Defaultは変更しない

## 1.14.1 - 2026-09-03

### Added

- `docs/10-project-management.md`へ **Repository discoverability / 公開サイトへの導線** を追加
  - 公開して利用できるWebサイトURLがあるRepositoryでは、GitHub RepositoryのAbout欄 `Website` / homepageへ代表URLを設定することを原則化
  - README上部にも`Open site` / `Live Site`等の分かりやすいLinkを置き、RepositoryからSiteへすぐ移動できるようにする
  - 複数URLがある場合はPreviewではなくCanonical / Stable URLをWebsite欄へ置く
  - localhost、期限付きPreview、秘密情報を含むURLは対象外
- `templates/README_TEMPLATE.md`の最上部へLive Site導線を追加
- `templates/QUALITY_CHECKLIST.md`のGitHub Pages項目へRepository Website / README上部のSite導線確認を追加

### Rule Hygiene

- 新しいOwner Docは作成せず、既存のGitHub Project管理Ownerである`docs/10`へ統合
- GitHub Pagesの構成・Path・公開確認は引き続き`docs/08`を正本とし、Site Linkの見つけやすさだけを`docs/10`で扱う

### Compatibility

- 未公開Project、Electron専用、Library / Guide / Backend等の直接利用SiteがないRepositoryには強制しない
- Website欄を変更できない作業環境ではREADME上部のLive Site LinkをFallbackとして残せる
- Runtime / Storage / Schema / Deployment方式は変更しない

## 1.14.0 - 2026-09-03

### Added

- `docs/00-governance.md`へ **Rule Budget** を追加
  - 新しい知見をいきなりCommon Ruleへ追加しない
  - 既存Owner Docへの統合 → Project固有Learning / Rules → Catalog → Checklist / Template → 新規Common Ruleの順で配置を検討
  - Rule追加時に同時に削除・統合・Scope縮小できる既存Ruleがないか確認
- **Single Normative Owner** を追加
  - 同じ判断 / Workflow / Checklistの詳細正本を複数Fileへ持たない
  - Owner Doc = 詳細Rule、Router = 要約 + Link、Catalog = Evidence、Checklist = 実行確認へ役割分離
- **Orphan Rule防止**を追加
  - 新規Owner DocはREADMEと該当START_HERE Routeから辿れることを必須化
- `docs/14-continuous-improvement.md`と`maintenance/review-policy.json`へ **Rule Hygiene Review** を追加
  - Common Rule変更時とMonthly Deep Reviewで重複・Orphan・Project固有Rule混入・Checklist重複・古いRuleを確認

### Consolidated

Guide全体を棚卸しし、重複していた正本を整理しました。

- `README.md`
  - 詳細Ruleの再掲を減らし、Owner DocへのRouterへ戻した
  - `docs/18-domain-first-visual-research.md`を正式な入口一覧へ追加
- `START_HERE.md`
  - Electron / Diagnostics / Visual等の長い詳細説明を削り、作業種類 → Owner DocのRouterへ整理
  - Meaningful Visual Changeを`docs/18`へ直接Route
- `docs/01-requirements.md`
  - Visual Design手順の重複を削除し、Requirementsでは決める項目だけ保持
  - Research Workflowは`docs/18`、Design原則は`docs/04`へ委譲
- `docs/03-data-storage.md`
  - Remote Diagnostic HandoffのWorkflow / Security詳細を削減
  - Storage固有の境界だけ保持し、全体Workflowは`docs/15`、Securityは`docs/06`へ委譲
- `docs/07-testing-quality.md`
  - `templates/QUALITY_CHECKLIST.md`と重複していた巨大な完成Checklistを削除
  - Testing Strategy / Verification State / Final-state ValidationだけをOwnerとして保持
- `docs/10-project-management.md`
  - Remote Diagnostics読取Workflowを`docs/15`へ委譲
  - Oracle / Testing詳細を`docs/07`へ委譲
  - GitHub Pages詳細を`docs/08`へ委譲
- `docs/17-visual-quality-baseline.md`
  - Minimum Visual Completion Gateへ責務を戻した
  - Domain Research / KEEP-FIX-REMOVE / Foundation Resetの詳細を`docs/18`へ移動
  - 旧`#visual-foundation-reset` Link互換のため短いRouter Anchorは維持
- `docs/18-domain-first-visual-research.md`
  - Domain Research / KEEP-FIX-REMOVE / Reference Transfer / Candidate比較 / Visual Foundation Resetの唯一のWorkflow Ownerへ整理
- `catalog/validated-visual-directions.md`
  - Redesign Workflowの重複記述を削除
  - Evidence / Reference Catalogへ責務を限定
- `docs/14-continuous-improvement.md`
  - Rule Strength定義やWeb Source一覧の重複を減らし、Governance / review-policyへ委譲

### Validator

- `docs/18-domain-first-visual-research.md`をrequired fileへ追加
- `catalog/validated-visual-directions.md`をrequired fileへ追加
- `docs/NN-*.md`がREADMEから辿れない場合をValidation Error化
- START_HEREがMeaningful Visual Changeを`docs/18`へRouteすることを検証
- GovernanceにRule Budget / Single Normative Owner / Orphan Rule防止が残ることを検証
- Rule Hygiene Policyが有効であることを検証
- `docs/18`がDomain Research / KEEP-FIX-REMOVE / Foundation ResetのOwnerであることを検証
- `docs/07`がOperational Checklistを`templates/QUALITY_CHECKLIST.md`へ委譲していることを検証

### Audit Finding

今回の棚卸しで、v1.13.0で追加した`docs/18-domain-first-visual-research.md`が、重要RuleにもかかわらずREADMEの番号付きDoc入口とValidatorのrequired fileへ接続されていない状態を確認しました。

これは「Ruleを追加したが通常作業から辿れない」Orphan Ruleの実例として、Router / Validator Ruleを強化する直接の根拠にしました。

### Compatibility

- Product RepositoryのRuntime / Storage / Schema / Deploymentは変更しない
- Rule内容を無差別に削除せず、Ownerを1つに寄せて他箇所をLinkへ変更
- Visual Foundation Resetの考え方自体は維持し、正本を`docs/18`へ移動
- `docs/17#visual-foundation-reset`の既存Linkは互換Anchorとして維持
- Remote Diagnostic Handoff / Testing / Electron等の既存方針を反転しない
- README / START_HEREは今後さらにRule本文を抱え込まずRouterとして維持する

## 1.13.0 - 2026-09-02

### Added

- `docs/18-domain-first-visual-research.md`を追加
  - 意味のあるVisual Direction変更前に、そのProjectと同じ用途・ジャンル・Primary Task / Content Modelに近い現行Site / AppをWebで調査するWorkflowを定義
  - Target TypeをPrimary Task / Content Model / Audience / Usage Frequency / Density / Device / Visual Material / Toneで整理
  - 同種Referenceを原則2〜5件比較し、共通点だけでなく差と理由も確認
  - `Domain Research Brief`でObserved conventions / Meaningful variations / Fit / Avoid / Open axesを短く残す
  - 過去Validated Visual DirectionをDomain Researchの代わりに使わず、補助Referenceへ位置づけ
  - 同種Referenceが少ない場合は、人気や知名度ではなくTask / Content Modelが近い隣接Domainを優先

### Changed

- `docs/17-visual-quality-baseline.md`
  - Page Composition / Navigation / Theme / Workspace構造等の意味のあるVisual変更でDomain-first Visual ResearchをMUST化
  - `Current Project理解 → Target Type → Domain Research → KEEP / FIX / REMOVE → Direction → 過去Validated Direction補助参照 → Candidate → Visual Review`の順序を追加
  - LyricTube / Tarkov等の過去成功例を「高評価だったから」だけで採用しないことを明記
  - 1px Alignment / overflow / 既存Design System内の局所修正等は毎回のWeb Research対象外

### Reason

ユーザーから、最近のVisual修正で「成功例をとりあえず使う」ことがProject種類との不一致を生んでいるため、**サイトの見た目を修正する前に、そのサイトに関連する種類のVisual Designを一度学習してから修正する**よう明示的な要望がありました。

v1.12.0で成功 / 失敗Evidenceの強さは整理しましたが、Reference選択順序がまだ弱く、Validated Directionが最初のDesign答えとして使われる余地がありました。v1.13.0では、Reference Libraryより前にDomain / Genre Research Gateを置きます。

### Compatibility

- すべてのVisual BugでWeb Researchを強制しない
- 過去Validated Directionを削除しない。用途が合う場合の補助Referenceとして維持
- 既存ProjectのRuntime / Storage / Schema / Deploymentを変更しない
- 特定業界の固定LayoutやStyleをGuide標準にしない
- Web Research結果もコピー元ではなく、Task / Content / Density / Navigation等へ抽象化して利用する

## 1.12.0 - 2026-09-02

### Added

- `catalog/validated-visual-directions.md`をEvidence-weighted Catalogへ拡張
  - `A / User Validated`
  - `B / Task Validated`
  - `C / Candidate`
  - `R / Rejected`
  - 最新main / CI成功 / Assistant自己評価だけでは成功扱いしない
- 2026-09-02時点でアクセス可能なUser-facing Project 14件を横断Reviewし、Visual Evidence Matrixを追加
- Validated Directionを明確化
  - `VD-001 LyricTube Media Workspace`
  - `VD-002 Tarkov Field Manual Knowledge Manual`
- Task-validated Referenceを追加
  - VReview Review Workbench
  - Lineup Tactical Map Workspace
- Candidate / Recovery Evidenceを追加
  - AP Friendly Study Dashboard recovery
  - ASMRTube ASMR Media Deck / Sound Map
- Rejected Visual Evidenceを追加
  - ASMRTube v2.4: LyricTubeの装飾削減まで移植し、User評価40/100
  - AP Study Guide r22: Technical Console化で旧r21 40点から30点へ低下
- Anti-Pattern Catalogへ追加
  - `AP-029 Success Factor Misattribution`
  - `AP-030 Minimalism as Quality Metric`
  - `AP-031 Unvalidated Visual Direction Promotion`
- Success Pattern Catalogへ追加
  - `S-026 Preserve → Diagnose → Redesign`
  - `S-027 Evidence-weighted Visual Reference`
  - `S-028 Candidate → Compare → Promote`

### Changed

- `docs/17-visual-quality-baseline.md`
  - 大規模Redesign前の`KEEP / FIX / REMOVE`を追加
  - Userが既に価値を感じているColor identity / Action affordance / Artwork / Navigation等を先に保持対象として確認
  - Referenceは`Transfer / Rebuild / Do not copy`へ分解
  - CandidateがCurrentを明確に上回らない場合はPolish継続よりVisual Foundation Resetを優先
- `docs/14-continuous-improvement.md`
  - 定期ReviewへVisual Evidence Harvestを追加
  - User feedback / Rating / Rejected CandidateをProject Learningと同様のEvidenceとして確認
  - 低評価Candidateも失敗理由付きで保存
- `maintenance/review-policy.json`
  - Visual Evidence Level / Promotion Policy / Rejected retentionを追加
  - 最新main・CI・AI自己評価・装飾削減量をUser validationの代用にしない

### Recent Failure Analysis

最近のVisual修正で正解から遠ざかった主因を、Project Evidenceから次のように整理しました。

1. 別Projectの成功例から「成功した理由」ではなく「減らしたもの」を移植した
2. `simple / clean / minimal`を品質指標として扱った
3. AI Template回避をCard / Gradient / Emoji / Shadow等の禁止として過剰解釈した
4. Redesign前に現在UIの良い部分を`KEEP`として固定しなかった
5. 1案だけを実装し、Directionそのものを比較しなかった
6. 土台が弱いのにColor / Spacing / EffectのPatchを続けた
7. main / CI / Assistant評価をUser Validationと混同した

### Visual Evidence Review

- **A / User Validated:** LyricTube、Tarkov Field Manual
- **B / Task Validated:** VReview Review Workbench、Lineup Tactical Map Workspace
- **C / Candidate:** AP recovery、ASMRTube v3 direction、その他User Visual Validation不足Project
- **R / Rejected:** ASMRTube v2.4、AP r22

Aが少ないことを問題として水増しせず、Evidence不足のDirectionはCandidateのまま維持します。

### Compatibility

- 全Projectへ1つの固定Visual Templateを強制しない
- LyricTube / Tarkovの色・幅・EffectをDefault化しない
- 既存ProjectのRuntime / Storage / Schema / Deploymentを変更しない
- 小規模UI BugへKEEP / FIX / REMOVEや2〜3案比較を機械的に強制しない
- User feedbackを得られない内部ToolではTask usability等を代替Evidenceにできるが、Evidence Levelを明示する

## 1.11.0 - 2026-08-31

### Added

- `docs/17-visual-quality-baseline.md`を追加
  - User-facing UIのVisual Qualityを完成に必要なMUST Baselineとして定義
  - 「見た目は優先順位6位」を「省略可能」ではなくTrade-off順として明確化
  - Hierarchy / Typography / Spacing / Alignment / Component consistency / Responsive / Accessibility / Prototype感をMinimum Gate化
  - UI変更時は最終状態をBrowser / Screenshot等で目視確認し、できなければVisual未確認として記録
- Visual Ambitionを`baseline / high / flagship`へ整理
  - baseline = 全User-facing UIで必須の最低品質
  - high / flagship = Direction比較、Signature、独立Visual Review等を追加する条件付き強化

### Changed

- `docs/00-governance.md`へ基本優先順位の読み方を追加し、Visual Quality BaselineをMUST化
- `START_HERE.md`の新規制作 / AI実装 / UI修正 / Visual Design / 完成前ルートへVisual Quality Baselineを追加
- `README.md`へVisual Quality Baseline入口、最低限原則、完成条件を追加
- `templates/REQUIREMENTS_TEMPLATE.md`でVisual Quality BaselineとVisual Ambitionを分離
- `templates/QUALITY_CHECKLIST.md`のMinimumへVisual Quality Baselineを移動
- `templates/WORK_REPORT_TEMPLATE.md`へVisual Quality / Visual Verification記録欄を追加
- Guide Validatorで`docs/17`、GovernanceのMUST、Requirements / ChecklistのBaseline維持を検証

### Compatibility

- 見た目を理由にStorage / Stability / Performance / Accessibilityを壊す方針へは変更しない
- 小規模Bug Fixで関係ない既存画面の全面Redesignを要求しない
- 既存Projectへhigh / flagship Designを一律強制しない
- 既存のVisual Design詳細ルールは`docs/04-ui-ux-accessibility.md`を正本として維持

## 1.10.0 - 2026-08-31

### Added

- `docs/16-cross-repository-github-infrastructure.md`を追加
  - `.github`共通Repository / Reusable Workflow / Ruleset / Dependabot / Issue Forms / GitHub Projectsの役割分担
  - Account共通GitHub運用とProject固有仕様のSource of Truthを分離
- `.github/workflows/reusable-web-baseline.yml`を追加
  - `workflow_call`対応
  - Node.js Version統一
  - JavaScript / MJS Syntax Check
  - JSON Parse Baseline
  - `contents: read`のみの最小Permission
- Reusable WorkflowのVersion / Blast Radiusルールを追加
  - 外部Repositoryから呼ぶ場合はCommit SHA固定を優先
  - `@main`恒久依存を避ける
  - Pilot 1〜2件 → 段階展開 → Rollback可能な旧SHA保持
- RulesetをProject Risk別に扱う方針を追加
  - 静的SiteとRelease自動公開Electronを同じ強度にしない
  - `osu-hub`のようなSetup.exe / Update Channel連動Projectは高い保護を推奨
- Dependabot運用方針を追加
  - npm / Electron / GitHub Actions等で条件付き導入
  - Dependency PRの無条件Auto Mergeを避ける
  - ElectronではWindows Build / Installer / Update Metadataまで通常の品質Gateを通す
- Issue FormsとRemote Diagnostics Snapshot IDの連携案を追加
- GitHub ProjectsはIssue / PRの横断Viewとし、仕様のSource of Truthにしない方針を追加

### Changed

- `START_HERE.md`へ複数RepositoryのGitHub運用共通化Routeを追加
- READMEへCross-Repository GitHub Infrastructure入口とReusable Web Baselineを追加
- `references/web-standards.md`へGitHub公式のDefault Community Health / Reusable Workflow / Rulesets / Dependabot / Projectsを追加
- Guide Validatorで`docs/16`とReusable Workflowの存在・`workflow_call`・read-only contents permissionを確認

### Current Repository Review

2026-08-31時点で`EliteMay`配下の11 Repositoryを再確認しました。

- `.github`共通Repositoryは未作成
- `ap-study-notes` / `english` / `asmrtube` / `DesignShelf`等でNode setup + JavaScript syntax + Project固有Validatorの重複が存在
- `osu-hub`のRulesetは未設定
- `osu-hub`は`electron` / `electron-builder` / `electron-updater`を利用しておりDependabotとの相性が高い

### Compatibility

- 既存Project Workflowを一括で中央化しない
- Project固有Validator / E2E / Release Logicを中央Workflowへ移さない
- 既存のSmallest Safe Change方針を維持し、全RepositoryへPR必須を一律強制しない
- GitHub Projects / `.github` Repositoryを既存仕様の新しいSource of Truthにしない

## 1.9.0 - 2026-08-31

### Added

- `docs/15-development-observability.md`へRemote Diagnostic Handoffを追加
  - 詳細LogはLocal-firstのまま保持
  - AIへ渡すSanitize済みCompact Snapshotだけを必要時にRemote Storeへ保存
  - Runtime Evidenceと長期`PROJECT_LEARNINGS.md`を分離
- 無料必須Project向けのFree-only Guardを追加
  - Remote Diagnosticsのために有料Planを必須化しない
  - 導入時に現在のPricing / Quota / Active Project / Pause条件を再確認
  - Remote停止時はLocal Diagnostics / One-click ExportへFallback
  - 1 Site = 1 BackendをDefaultにせずShared Diagnostics Store + `projectKey`を検討
- Remote Snapshotの容量・Retention Guardを追加
  - Binary / Storage全Dump / User入力全文を自動Remote保存しない
  - Snapshot最大Size / Project最大件数 / Retentionを設定
  - Normalは短期、Errorも必要期間だけ保持
- Remote write Securityを追加
  - Frontendへ`service_role` / Secretを置かない
  - Supabase等の公開TableでRLS + Grantを確認
  - `projectKey`をAuthorizationに使わない
  - 無制限匿名InsertをDefaultにしない
  - 安全なWrite pathがなければRemote auto-uploadを行わない
- AI Project UpdateのEvidence順序を追加
  - Current GitHub / AGENTS / Spec
  - `PROJECT_LEARNINGS.md`
  - 最新Remote Error Snapshot
  - 最近のNormal Snapshot
  - 対象Code / Test
- `templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json`をSchema v2へ更新
  - `projectKey` / `snapshotId` / severity
  - Remote handoff用Sanitized / size / retention / binary / secret metadata

### Changed

- `START_HERE.md`へ「ZIPを毎回作らずChatGPTへ診断を渡す」Routeを追加
- `docs/03-data-storage.md`へLocal detailed diagnostics + Shared Remote compact snapshot方針を追加
- `docs/06-security.md`へRemote Diagnostic HandoffのRLS / Grant / Secret / Abuse対策を追加
- `docs/10-project-management.md`でAIがユーザーへ症状を再質問する前にRemote Runtime Evidenceを読む方針を追加
- `docs/12-project-profiles.md`のAI-HANDOFF / CLOUDをRemote Diagnostics対応へ拡張
- `templates/AGENTS_TEMPLATE.md`へRemote DiagnosticsのProvider / projectKey / read range / Fallback入口を追加
- `templates/QUALITY_CHECKLIST.md`へRemote Diagnostic Handoff専用Checklistを追加
- `references/web-standards.md`へSupabase RLS / Data API Security / Pricing / PausingとGitHub Actions Billingを追加
- `maintenance/review-policy.json`へRemote Diagnostics / Hosted Service free-limit Reviewを追加
- Guide ValidatorをDiagnostics Schema v2とRemote Handoff安全Defaultへ対応

### Current Free-plan Check

2026-08-31時点の公式情報を確認しました。

- Supabase Free: Database 500 MB / Egress 5 GB / File Storage 1 GB / Edge Function 500,000 invocations / Active Project 2、低Activity ProjectはPause対象
- 現在接続されているSupabase Active Projectは `LyricTube` と `osu-hub` の2件で、3個目のDiagnostics専用Projectは無料条件を満たす保証がない
- GitHub public repositoryのstandard GitHub-hosted runnerは無料利用可能

これらの数値は変化するためGuideの恒久仕様とはせず、導入時・定期Review時に公式情報を再確認します。

### Compatibility

- Remote Diagnostic Handoffを全Projectへ強制しない
- 既存Local Diagnostics / ZIP Exportを削除しない
- Binaryが必要なAI HandoffではZIP / File方式を維持可能
- 現在のSupabase ProjectをPause /削除 /移行していない
- 既存Projectへ新しい有料依存を追加していない

## 1.8.0 - 2026-08-31

### Added

- `docs/11-electron-distribution.md`へInstaller Release Contractを追加
  - Setup.exe単体生成ではなく、Version / Installer / Update Metadata / Release Channel / userData / Signing / Fallback /実機更新を1つの配布契約として扱う
  - `Setup.exeが生成できた`、`CIが通った`、`Releaseが存在する`の1条件だけで配布成功扱いにしない
- Updater Bootstrap方針を追加
  - Updater導入前Versionは自力でAuto Updateできないことを明示
  - Updater搭載の最初のVersionをBootstrap Versionとして扱う
  - それ以前の利用者には1回だけ手動Setup.exe更新が必要な場合がある
  - Bootstrap後はApp内One-click Updateへ移行
  - サポート対象の最古Auto-update Version → 最新VersionのUpdate Pathを確認
- Build / Release Pipeline分離方針を追加
  - Pull RequestではInstaller + MetadataをBuild / ValidateしてArtifact保存、Stable Releaseは作らない
  - main / approved tagで同じ検証後にReleaseへInstaller / MetadataをUpload
  - 未Merge BuildをStable Update Channelへ誤配信しない
- Release Artifactの整合確認を拡張
  - Installer / `latest.yml` / `.blockmap`等の必要Artifact存在
  - `package.json#version` / `app.getVersion()` / Release Tag / Metadata / Installer名のVersion一致
  - Metadataが実際のInstallerを参照していること
  - MetadataとInstallerを同一Build / Pipelineから生成し、別BuildのArtifactを混ぜない
- Broken Release対応を追加
  - 一部利用者へ配信済みの壊れたReleaseは同Version差し替えだけに頼らず、原則としてより大きい修正版Versionを発行
- Windows Code Signing / Update互換性の注意を拡張
  - 公開配布ではCode Signingを強く推奨
  - 未署名配布ではSmartScreen / Publisher検証の制約を明示
  - Updater / electron-builder互換範囲変更時は既存Installed Appからの更新を確認

### Source

- `EliteMay/osu-hub` `osu Setup Launcher v0.18.2`
  - v0.18.1以前はUpdaterなしのためv0.18.2 Setup.exeを1回手動InstallするBootstrap運用
  - PRでInstaller / `latest.yml` / `.blockmap`を検証し、mainだけGitHub Releaseへ公開
  - Auto Update失敗時は現在Version継続 + GitHub Releases手動Fallback
  - Electron `userData`をInstaller更新から分離
- electron-builder Auto Update / Troubleshooting / Security公式Documentation
  - NSIS + `electron-updater`
  - `latest.yml`等のRelease Metadata
  - MetadataとArtifactを同じBuildから生成する重要性
  - Installed Windows AppでのAuto Update実機Test推奨
- Electron Code Signing公式Documentation

### Compatibility

- 既存Electron ProjectへAuto Updateを一律強制しない
- 単発Tool / Portable /更新頻度が低いProjectは条件付き判断を維持
- 既存Storage / Deployment Default変更なし
- `osu-hub`本体Codeは今回変更しない

## 1.7.0 - 2026-08-31

### Added

- Visual DesignへSubject-grounded Directionを追加
  - Purpose / Audience / Content / TaskからDesignを導く
  - 実在Siteは外観ではなくAudience / Job / Content Model / Navigation / Density等へ分解して参照
  - Project固有のSignatureを必要に応じて1つ決める
- AI PromptのConstraint / Open Axes方針を追加
  - Technology / Accessibility / Performance /崩せない仕様は固定可能
  - Hero / Card Grid / Navigation / Density / Effect等をDesign Direction決定前に固定しすぎない
- Design Plan Critiqueを追加し、GenericなPlanはCSS本実装前に修正
- Copy / Empty / Error StateをVisual Designの一部として扱う方針を追加
- Interactive ComponentのState確認を追加
- Build後の独立したVisual Design Review Gateを追加
  - Purpose / Task / Hierarchy / Navigation / Responsive / Typography / Components / Accessibility / Copy / AI Template Regression
  - FindingをBlocking / Major / Minorに分類
  - Visual Review結果をPass / Needs workで記録
- AI Coding Agent運用を追加
  - AI生成Codeも通常の品質Gateを通す
  - AI提案の高コストArchitecture / Storage / Dependencyを無検証で採用しない
  - 未経験TechnologyへAIを使う場合の追加Review
- Specification / Oracle-driven AI Developmentを追加
  - Golden Output / Reference implementation / Contract / Regression Dataset等で大量AI生成を検証
- `templates/AGENTS_TEMPLATE.md`を追加
  - `AGENTS.md`はProject RulesのSource of TruthではなくAgent向けRouterとして利用
  - Build / Test command、正本へのLink、高リスク領域、Completion Checkを記載
- PUBLIC-CONTENT ProfileへLanguage / Metadata / 404 Recovery / i18n / Privacy確認を追加
- GitHub Pagesへ条件付き`404.html` Recovery方針を追加

### Changed

- `docs/04-ui-ux-accessibility.md`へAnthropic / Microsoft AI Frontend Design研究から得た一般化可能なDesign Thinkingを統合
- `docs/07-testing-quality.md`へOracle Test / Visual Design Review / AI-assisted Quality Checkを統合
- `docs/10-project-management.md`へAI Coding Agent / AGENTS.md / Oracle-driven Workflowを統合
- `docs/12-project-profiles.md`のPUBLIC-CONTENTを拡張
- `START_HERE.md`へAI Coding Agent利用と完成後Visual Reviewの専用Routeを追加
- `templates/QUALITY_CHECKLIST.md`へVisual Review / AI-assisted Development / Public Content項目を追加
- `templates/PROJECT_RULES_TEMPLATE.md`でAGENTS.mdとの役割分担を明記
- `references/web-standards.md`へAnthropic / Microsoft / AGENTS.md / Google / W3C i18n / Front-End Checklist系を追加
- `maintenance/review-policy.json`へAI Frontend Design / Agent Instructions / Public Content Review Sourceを追加
- Guide ValidatorへAGENTS Template存在・Router方針検査を追加

### DesignShelf

- DesignShelfをLayout番号選択だけでなく、Navigation / Structure / Density / Typography / Visual Emphasis / Component / Spacing / Color / Effect / Signature等の**Design属性Bundle**でDirectionを探索する将来案へ更新
- 属性をRandomに独立組合せせず、相性のあるCoherent Directionを2〜3案生成し、Projectへの適合理由を付ける方針をIssue #1へ追加
- Layout IDは完成TemplateではなくSkeleton / Exampleとして維持
- DesignShelf本体Code / Storageは今回変更していない

### Research / Classification

- Anthropic Frontend Design: Subject grounding / Copy / Plan Critique / Build後CritiqueをGuideへ拡張反映
- Microsoft Agent Academy Frontend Design: Purpose / Differentiation / Intentional directionを参考。特定Fontや派手さのPreferenceは共通Ruleへ入れない
- Microsoft Frontend Design Review: 完成後Review Gate / Severityを反映
- Front-End Checklist: Language / Public Metadata / Privacy / i18n等の抜け発見に使用。巨大Checklistは移植しない
- Front-End Design Checklist: Component State / Real content / Responsive等を既存Ruleへ拡張
- AGENTS.md: Agent向け入口としてTemplate化。ただしProject SoTを増やさない
- Birthday Quest / ScanPass: AI出力を無Reviewで完成扱いするRiskのCase Studyとして利用
- AI Portfolio Generator: PromptでHero / Card Grid / Effectsを固定しすぎるとTemplate Lookを自ら固定するCase Studyとして利用
- Higher or Lower Card Game: User Goal / Scope / Wireframe / Test / ReflectionのProcess Referenceとして利用
- Lichess Time Tracker: AI draft後の意図的RefactorのCaseとして利用
- Mazes of Menace: AI大量生成でもReference / Golden Test / Oracleが強ければ高い検証可能性を作れるCounterexampleとして利用
- Apple / Microsoft / GitHub / NVIDIA / Discord / Spotify: 同じ大規模公式SiteでもAudience / Content Model / Taskにより構造が大きく異なることを確認

### Compatibility

- 既存Projectへ`AGENTS.md`を強制追加しない
- 既存ProjectへVisual Layout変更を強制しない
- Storage / Schema / Deployment Defaultの変更なし
- DesignShelf本体の既存ID / JSON / Workflow互換性への変更なし

## 1.6.0 - 2026-08-31

### Added

- `docs/11-electron-distribution.md`へ継続配布するインストール型Electronアプリ向けのOne-click Update方針を追加
  - App起動時にBackgroundで更新確認
  - 新Versionがある場合に「今すぐ更新 / あとで」を提示
  - 1回の明示操作でDownload / Install / Restartまで進める導線を原則として優先
  - 更新時も`userData`等のユーザーデータを維持
- GitHub Releases + NSIS配布時のUpdate Artifact整合ルールを追加
  - Setup.exe
  - `.blockmap`
  - `latest.yml`
  - Release Tag / `package.json#version` / MetadataのVersion一致
- Auto Updateの安全性とFallbackを追加
  - Update Provider固定 / Allowlist
  - Hash / Integrity利用
  - 公開配布ではCode Signingを強く推奨
  - 未署名配布では制約を明記
  - Update失敗時は手動Release導線と現Version継続利用を維持
- Auto Update導入・変更時の旧Version → 新Version実機Update確認項目を追加

### Changed

- `START_HERE.md` のElectronルートにOne-click Update / Update Metadata / Release整合確認を追加
- Guide Versionを `1.6.0` へ更新

### Source

- ユーザー要望: Setup.exeを毎回手動実行するのではなく、アプリ起動時に更新通知し1回の操作で更新できる共通方針へしたい
- `EliteMay/osu-hub`: Setup LauncherをGitHub Releases + NSISで継続配布している実Project
- electron-builder公式Auto Update Documentation: `electron-updater`、NSIS、GitHub Provider、`latest.yml`等のUpdate Metadata

## 1.5.0 - 2026-08-31

### Added

- `docs/04-ui-ux-accessibility.md`へVisual Design Qualityを追加
  - Information Architecture / Layout / Typography / SpacingをColor / Effectより優先
  - 色違いだけの同一構造をDesign差分として扱わない
  - Visual重視ProjectではCSS実装前にDesign Directionを決める
  - Wireframe / Structure → Visual Polishの順序を明文化
  - Project TypeごとにVisual Structureを変え、固定Layoutを公式感のDefaultにしない
- AI Template Look回避ルールを追加
  - 巨大Hero + 3 Feature Cards + CTAの機械的採用を避ける
  - Gradient / Glassmorphism / Glow / Shadow / Rounded Corner / Card自体は全面禁止しない
  - Effectごとに役割を説明できることを目安にする
- Anti-Pattern Catalogへ以下を追加
  - `AP-026 Palette-Swap Clone`
  - `AP-027 Decorative Cardification`
  - `AP-028 AI Landing Page Default`
- Success Pattern Catalogへ以下を追加
  - `S-024 Structure-first Visual Design`
  - `S-025 Contrastive Design Direction`
- DesignShelfを完成Template集ではなく、構造探索用Companion Toolとして使うWorkflowを追加
- Visual重視Project向けのDesign Direction比較項目をRequirements / Quality Checklistへ追加

### Changed

- `START_HERE.md`へ「Visual Designを決める / AI Template感を減らす」ルートを追加
- `docs/01-requirements.md`へVisual Design Directionを追加
- `templates/REQUIREMENTS_TEMPLATE.md`へDesign Concept / Layout / Navigation / Density / Typography / Effect Policy等を追加
- `templates/QUALITY_CHECKLIST.md`へVisual Design / Visual Direction検証を追加
- `references/web-standards.md`へGitHub Primer / Microsoft Fluent 2 / Apple HIGを追加
- `maintenance/review-policy.json`へ公式Design System SourceとVisual Pattern Reviewを追加
- `docs/14-continuous-improvement.md`でVisual Designの長期的なTemplate収束もReview対象に追加

### DesignShelf

- 現在のDesignShelfはPalette → Layoutの順だが、Guide運用ではStructure-firstで利用可能と明記
- 24 Layoutを正解一覧や完成Templateとして扱わず、比較・混合・変形する方針を追加
- 将来改善候補としてLayout-first mode / Design Direction / 複数Layout比較 / AI Template Risk表示を整理

### Source

- ユーザー要望: AI生成サイトが色違いでも巨大Hero / Gradient / Glass / Card Grid等の同型Templateへ収束する問題
- GitHub Primer: Layout / Typography / Navigation / Foundations
- Microsoft Fluent 2: Layout / Spacing / Typography / Design Tokens
- Apple Human Interface Guidelines: Purpose / Simplicity / Hierarchy / Craft
- `EliteMay/DesignShelf`: 現在の24 Layout骨格とPalette-first Workflowを実運用候補として確認

## 1.4.0 - 2026-08-31

### Added

- `docs/15-development-observability.md` を追加
- 全Projectで長期的な失敗・成功を残す `PROJECT_LEARNINGS.md` 方針を追加
- `templates/PROJECT_LEARNINGS_TEMPLATE.md` を追加
- `templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json` を追加
- Interactive Project向けにDevelopment Diagnostics標準を追加
  - App Version / Build / Schema
  - JavaScript Error / Unhandled Promise Rejection
  - Fetch / API Failure
  - Storage Failure
  - Import / Migration / Restore結果
  - 重要操作Breadcrumb
  - Feature Flag状態
- One-click Diagnostic Export / Copy Report方針を追加
- Error ID、Health / Diagnostics View、Performance Diagnostics、Experimental Feature Flagの指針を追加
- 高コストBugは Project Learning + Regression Guard + Work Report をセットで残すルールを追加

### Changed

- `START_HERE.md` に「診断データから調査する」ルートを追加
- 新規制作ルートへProject Learnings / Diagnostics設計を追加
- `REQUIREMENTS_TEMPLATE.md` にDevelopment Diagnostics / Project Memory項目を追加
- `README_TEMPLATE.md` にDiagnostics / Project Memory項目を追加
- `QUALITY_CHECKLIST.md` にError capture、Breadcrumb、Log rotation、Secret exclusion、Diagnostic Export等を追加
- Continuous Improvement Reviewで各Projectの `PROJECT_LEARNINGS.md` を重要Evidenceとして確認する方針を追加
- Guide Validatorへ新規Doc / Template / Diagnostics Schemaの存在・構造検査を追加

### Safety / Privacy

- Diagnostic LogはLocal-firstを原則とする
- Token / Password / API Key / Secret / User入力全文 / Media bodyをLogへ直接記録しない
- Breadcrumb / Diagnostic LogはRing Buffer等で保持上限を持たせる
- 実際の個人Diagnostic Logは公開Repositoryへ原則Commitしない

### Source

- ユーザー要望: 毎回状況を説明し直さなくても、Project自身の記録から調査を開始できる共通基盤
- MDN: Window `error` / `unhandledrejection` とPerformance API / PerformanceObserver
- OWASP Logging Cheat Sheet: Application loggingの一貫性とSensitive Data除外

## 1.3.0 - 2026-08-31

### Added

- `docs/14-continuous-improvement.md` を追加
- `maintenance/review-policy.json` を追加し、定期レビュー対象・公式Web Source・変更ポリシーを一元化
- GitHub上でアクセス可能な `EliteMay` Repositoryを毎回再発見し、差分中心でReviewする方針を追加
- W3C / MDN / web.dev / OWASP / GitHub / Electron / WHATWGを中心としたWeb Standards Reviewを追加
- Project Feedback Loop / Web Standards Loopを追加
- No Change / No Commit方針を追加
- 高影響Rule変更は自動確定せずBranch / Proposalを優先するSafety Ruleを追加
- `START_HERE.md` にGuide定期改善ルートを追加

### Changed

- READMEへContinuous Improvement入口を追加
- Guideを固定文書ではなく、実ProjectとWeb標準から継続改善するSource of Truthとして明文化
- 定期レビューによる他Projectの扱いをRead-onlyとし、自動更新先を `web-project-guide` に限定
- Guide Validatorへ `docs/14-continuous-improvement.md` と `maintenance/review-policy.json` の必須存在・Policy JSON整合性検証を追加

### Automation

- ChatGPT側の定期Reviewから `maintenance/review-policy.json` を参照し、Project差分と公式Web情報を確認して、共通化価値がある場合だけGuideを更新する運用を想定
- 一般Web Ruleは公式Source、Project由来Ruleは具体的なProject Evidenceを要求

## 1.2.0 - 2026-08-30

### Added

- 既存サイトの構造整理 / Patch統合ルートを`START_HERE.md`へ追加
- Backup / Import / Restore専用ルートを`START_HERE.md`へ追加
- 正式Runtime PathとVersion Metadataを分離するルールを追加
- 破壊的Importの `validate → backup → replace → verify → rollback` 手順を追加
- `Renderer owns its DOM` 原則をArchitectureへ追加
- Failure CatalogへF-017〜F-019を追加
- Success PatternへS-021〜S-023を追加
- Anti-PatternへAP-024〜AP-025を追加

### Changed

- Quality ChecklistへStable Runtime、Import Rollback、MutationObserver後付け、Version整合性検証を追加
- Guide自身のValidatorを強化し、正本ファイル全件、H1、Guide VersionとCHANGELOG一致、Catalog ID重複、未定義Catalog ID参照を検査
- READMEの最低限原則と自己検証内容を現在のGuide仕様へ更新

### Source

English Worksheet Lab v0.6.2の実運用で見つかった以下の問題をGuideへ還元した。

- Versioned Patchを統合した後も`js/v060/`等のVersion付き正式Runtimeが残る
- Session等へ古いApp Version hardcodeが残る
- Backup ImportがTop-level schema確認後にStoreをclearし、途中失敗時に既存Dataを失える
- 自前RendererのDOMを別ModuleがMutationObserverで後付けしていた

## 1.1.1 - 2026-08-30

### Added

- GitHub変更経路の選択基準を追加
  - 小規模変更は対象ファイルを直接更新
  - 複数ファイル・高リスク変更はBranch / Pull Requestを優先
  - GitHub Actionsは継続的な自動化を目的とする場合に使用
- Cleanup後の最終Commit / Merge Commitを完成判定の基準とするFinal-state Validationを追加
- 一時Script / 一時Workflow / Debug資産のCleanup確認をQuality Checklistへ追加
- Failure Catalogへ `F-016 一時Workflow / Scriptが修正経路になる` を追加
- Anti-Pattern Catalogへ `AP-023 Workflow as Patch Engine` を追加
- Success Patternへ `S-020 Smallest Safe Change Path + Final-state Verification` を追加

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
