# CHANGELOG

Guide Versionの正本は [`guide-version.json`](guide-version.json) です。

## Unreleased

### Added

- Meaningful UI requirementsでも候補案を固定する前にDomain / Genre Researchへ到達するRouteを明確化し、Game UIを含むVisual Research適用漏れを補強
- 既知のGame interaction / collider regressionを実装前に再利用するKnown Failure preflightとActual Playtest補強
- Manual conversation / scheduled workerが同じ未完了作業へ書き得る場合のexclusive work lease coordinationをConversation Handoff / Recoveryへ追加
- Human-facing AI Workflow / Work Dashboard / Rule Finder、repository-specific project dashboards、sanitized Work Queue表示とguarded worker start handoffを追加
- Dashboard V2とautomatic Requirements-to-Work-Queue handoffのRequirementsを追加
- Guide-scoped development conversation persistenceと専用Regression Guardを追加
- AI-generated UI homogenization等のnon-normative Research assetsを追加
- Release baseline / Current unreleased stateを検証する`tests/validate-release-integrity.mjs`を追加

### Changed

- Human Guideを`site/`配下へ責務別に整理し、既存Root URLはCompatibility Adapterとして維持
- Human Guideのmobile usability、dashboard freshness、isolated worker status、current routing parityを改善
- Work Queue contractを現在のruntime / Claim Gate / public projectionへ同期
- Conversation Persistenceの通常Entryを`web-project-data/tools/conversations/persist-interaction.mjs`へ合わせ、Current Repository再取得境界を明確化
- Conversation PersistenceをGuide-scoped InteractionのCompletion Gateへ接続
- `docs/10-project-management.md`へRoot-Cause-first Failure / Bug Workflowを追加
- `guide-version.json`は最後のReleased baseline `1.22.0`を保持しつつ、`releaseCommit`と`status: unreleased-changes`でCurrent mainとの差分を明示
- `docs/09-maintenance.md`へReleased baseline / Unreleased current stateの分離Contractを追加
- `Validate Guide`をfull git historyで実行し、Release-affecting変更があるPR / pushではCHANGELOG更新を要求するGateを追加

### Fixed

- Persistence Ruleが存在していても通常Interactionの終了経路から適用されず、保存漏れが起こり得たCompletion Routing failureを修正
- `guide-version.json`とCHANGELOGが両方同時に古い場合、Current GuideがRelease baselineより進んでいてもCIが検出できなかったRelease metadata driftを修正

### Compatibility

- 新しい正式Releaseはまだ切らず、Released baselineは`1.22.0 / 2026-09-07`のまま維持
- Product RepositoryのRuntime / Storage / Schema / Deploymentを自動変更しない
- non-normative Research / Work Report / Project Learningだけの変更まで機械的に新Releaseへ昇格させない

## 1.22.0 - 2026-09-07

### Added

- 40-point Content Depth Auditをpoint-in-time auditとして完了し、DefectとContent-depth reinforcementを分離したCurrent backlogを整備
- General Web Deployment / Runtime EnvironmentsのDecision Systemを既存`docs/10` / `07`へ追加し、Static / managed / serverless / backend、Local / Preview / Staging / Production、configuration authority、URL / origin、background runtime、hosting migrationを整理
- Learning / Explanation ProductのDecision / Verification depthを`docs/01` / `07` / `12` / `22`へ統合し、Learning Objective、Prerequisite、activity選定、Understanding / Mastery、Assessment alignment、Review / Retrieval、Freshnessを補強
- Browser / Web Platform Support Contractを`docs/01`へ、Compatibility Verificationを`docs/07`へ、Polyfill / transpilation等のCompatibility dependency判断を`docs/13`へ追加
- `references/web-deployment-runtime-research.md`、`learning-product-decision-research.md`、`github-pages-static-delivery-research.md`、`web-platform-compatibility-research.md`へCurrent non-normative evidenceを保存
- 人間向けGuide入口`index.html`を追加し、機能 / 作業内容からOwner Docへ到達できるWeb版をGitHub Pagesで公開

### Changed

- `docs/08-github-pages.md`をBranch vs Actions Publishing、Artifact / deployed revision traceability、SPA direct-open / 404、Custom Domain / DNS / HTTPS、Pages limitation、Service Worker / stale cache recoveryで補強
- `docs/12-project-profiles.md`をProfile選定 / 非選定、複数Profile併用、over-routing防止、Profile lifecycle / drift、追加 / 変更 / 削除ImpactのDecision Frameworkへ拡張
- `maintenance/rule-router.json` / `START_HERE.md` / `templates/QUALITY_CHECKLIST.md`をDeployment、Learning、Pages、Browser compatibilityのCurrent Ownerへ同期。Project Profileは第二Routerにせず、`docs/21`とMachine RouterをRoutingの正本として維持
- `templates/requirements/LEARNING.md`と`REQUIREMENTS_TEMPLATE.md`をCurrent Learning / Project Profile Contractへ同期
- `maintenance/research/content-depth-reinforcement.md`を更新し、40-point Auditで確認したActive reinforcement candidateをすべて`reinforced`または`current coverage sufficient`へ移行。Active backlogを`None`へ閉じた
- READMEへ人間向け公開Guide URLを追加し、正式Rule本文のSource of TruthがRepository `docs/`である境界を維持

### Concurrent Research Preservation

- reinforcement closure後にmainへ追加された `references/research-capture-policy.md` と `references/rule-application-reliability-research.md` を、active / non-normative research evidenceとして保持
- High-recall Research CaptureとRule Application Reliabilityの調査は本ReleaseでCommon RuleへPromotionせず、adoption / rejectionは今後のRequirements discussionとEvidenceで決める
- このactive researchは40-point Content Depth backlogの再オープンを意味せず、Current Routing / Owner / Gate / Profileを変更しない

### Validation / Integration

- Reinforcement PR #61 / #62 / #63とclosure PR #64をmainへ統合し、各PR Headの`Validate Guide`成功を確認
- substantive reinforcement completion merge `345211dbb86be6d5903eac1bda94f59d5c28d1c0`後、`Validate Guide #230`とPages build / deploy #154が成功
- backlog closure merge `7c2a1245b9a745069f22a9d96ce4afda21cce253`後、`Validate Guide #233`とPages build / deploy #156が成功
- 並行main変更として入った人間向け`index.html`とREADME公開URLを差分確認し、reinforcement branchから上書きしなかった
- Temporary patch workflow / scriptは各final diffから削除後にValidator / `git diff --check`を実行

### Rule Hygiene / Compatibility

- 新Normative Owner / 新Stable Gate / 新Project Profile / 新Risk Signalを追加しない
- Project Profileを第二Routerにせず、Work Type / Domain / Risk SignalによるCurrent routingを維持
- Small Static SiteへStaging / Canary / Blue-Green等を一律要求しない
- Learning SiteへQuiz / Spaced Repetition / Placement Test / universal mastery scoreを一律要求しない
- Universal browser-version matrixを固定せず、Target User / Runtime / Current EvidenceからSupport Contractを決める
- GitHub Pages / Browser / Providerの変化し得る数値・仕様はCurrent official evidenceを必要時に再確認し、Common Ruleへ固定値で複製しない

## 1.21.0 - 2026-09-07

### Added

- Phase 1 Requirements Decision Systemを`docs/01-requirements.md`へPromotionし、Problem → Outcome → Solution separation、`Now / Later / Reject`、MVP Boundary、Prototype / Cheap Test Trigger、Requirement Change Classification、Observable Completion / proportionate traceabilityを追加
- `references/requirements-decision-system-research.md`へPhase 1のnon-normative Evidence Map / Promotion rationaleを保存
- Phase 19 External Integration rulesを既存OwnerへPromotionし、Integration boundary、External authority / reconciliation、Webhook reliability、Integration validation、API / SDK / Webhook lifecycle、Diagnosticsを追加
- `external-api-integration` Golden Routing Caseを追加

### Changed

- `START_HERE.md`のExternal API routeを`docs/02 / 05 / 06 / 07 / 13`中心へ更新し、保存 / Syncは`docs/03`、Diagnosticsは`docs/15`へConditional Routing
- `maintenance/rule-router.json`の既存`EXTERNAL_API` SignalをArchitecture / Reliability / Security / Testing / Dependency Ownerへ拡張。新Signal / Gate / Profileは追加しない
- `templates/QUALITY_CHECKLIST.md`へExternal API / SDK / Webhookの短いConditional checkを追加
- `maintenance/research/requirements-decision-system.md`と`maintenance/research/external-integration-decision-system.md`をPromotion後のhistorical non-normative evidenceへ変更
- Root `REQUIREMENTS.md`のResearch Promotion StateをCurrent Owner構成へ同期

### Rule Hygiene

- Phase 1で既存Agent Autonomy / Requirements Persistence / Evidence-first Researchを重複Copyしない
- Phase 19のAuth / signature / secret / replay Securityは既存`docs/06`を再利用し、一般Retryは`docs/05`、Sync / Conflictは`docs/03`を維持
- 新Owner / 新Stable Gate / 新Profile / 新Risk Signalを追加しない
- Mock / Sandbox / Production、MVP / Prototype、Traceability / scoringを全Projectへ機械的に要求しない

### Compatibility

- Existing Product RepositoryのAPI provider、Storage authority、poll interval、Queue、Retry数、Versioning方式をCommon固定値で変更しない
- Existing Save / Consumer / URL / Integration ContractのBreaking Changeは各ProjectのCurrent Contract / Migration判断を維持
- Prototype codeをProduction-readyとみなさず、Productionへ採用する場合は通常のSecurity / Reliability / Testing Contractを適用

## 1.20.0 - 2026-09-07

### Added

- `docs/23-conversation-handoff-recovery.md`をConversation Handoff / stale checkpoint / duplicate active conversation / Current work ref RecoveryのSingle Normative Ownerとして追加
- Machine Routerへ`CONVERSATION_HANDOFF` Domain、`CONVERSATION_STATE_RECOVERY` Signal、`conversation-handoff-recovery` Golden Caseを追加
- `maintenance/audits/`へDeep AuditのBaseline / Finding / Resolution / External Admin Follow-upを保存する履歴Surfaceを追加
- `maintenance/research/requirements-decision-system.md`へ未完了Requirements Decision System ResearchをRoot Requirementsから分離保存
- `tests/validate-audit-contract.mjs`を追加し、今回実際に発生したOwner衝突・Router drift・Research quota・Security・Learning accumulation・Action pinning等をRegression Guard化

### Changed

- `REQUIREMENTS.md`をCurrent Project Contractへ戻し、監査手順・Research手順・履歴をOwner / maintenance / Gitへ分離
- Agent Autonomyを`Best Reasonable Decision`中心へ統一し、Core / High-costというLabelだけでUser回答待ちにしないContractへ整理
- `docs/06-security.md`をAuthN/AuthZ、Session、CSRF、CSP、File Upload / Import、Public Endpoint abuse等で補強
- `docs/11-electron-distribution.md`をcontextIsolation、sandbox、IPC sender / payload、Navigation / New Window、`shell.openExternal`、Permission Handler、CSP等で補強
- `docs/04-ui-ux-accessibility.md`へWCAG 2.2のFocus Not Obscured、Target Size、Dragging Movements、Redundant Entry、Accessible Authenticationを追加し、Named Companion Tool固有EvidenceをReferenceへ分離
- `docs/20-evidence-first-research.md`の固定Source件数目安を撤去し、`Decision Coverage + Research Saturation`を終了条件へ変更
- `PROJECT_LEARNINGS.md` / Templateへ継続蓄積Contractを追加し、今回のFailure / Root Cause / Fix / Regression GuardをPL-F-008〜014として保存
- `.github/workflows/validate-guide.yml`のexternal Actionsをfull Commit SHA固定へ変更
- `docs/10-project-management.md`へBranch lifecycleとUser-facing Completion Statusを統合し、Conversation Recovery詳細は`docs/23`へ分離

### Concurrent Main Preservation

- v1.19.0で追加された`docs/22-task-first-structure-flow-research.md`をCurrent Ownerとして保持し、Conversation Handoff側を`docs/23`へ移番
- 監査中にmainへ入ったPhase 3 Architecture Decision Systemの`docs/02-architecture.md`と`references/architecture-decision-system-research.md`を保持
- Final integration前にCurrent mainとのancestry / owner collisionを再確認し、並行作業を覆い戻さない手順をProject Learningへ追加

### Audit Result

- Source-levelのCritical / High / Medium actionable findingは解消
- Repository Admin権限を要するhistorical branch cleanup、`delete_branch_on_merge`、description / homepage / topics / license等は推測変更せずExternal Follow-upへ分離
- Scoreを終了条件にせず、known actionable finding、Final PR validation、merged-main validationをCompletion Gateとして採用

### Compatibility

- Product RepositoryのRuntime / Storage / Schema / Deployment Defaultを自動変更しない
- Deep Researchや固定Source件数を全作業へ強制しない
- Existing Save / URL /主要機能の破壊をAgent Autonomyの名目で自動確定しない
- Current mainの並行Owner / Architecture変更を監査Branchの旧状態で上書きしない

## 1.19.0 - 2026-09-07

### Added

- `docs/22-task-first-structure-flow-research.md`を **Task-first Structure / Flow ResearchのSingle Normative Owner** として追加
  - `User Goal / Need → Whole Problem / Context → Task / Subtask → Information / Function → IA → Navigation → Flow → State / Feedback → Recovery / Resume → Page / View` を基本Flowとして定義
  - Goal / Task / Featureの分離、Whole Problem、Task評価軸、Information Architecture、Navigation、User / Task Flowを整理
  - Search / Browse、CRUD / Editing、State / Feedback / Recovery、First-time / Returning User、Progressive Disclosure、Context Preservationを研究対象として整理
  - Card Sorting / Tree Testing等を必要時のIA検証手段として扱い、全Projectへ機械的に強制しない
  - Project固有のSitemap / Navigation / Flow / State Matrixは対象Projectへ保存し、Common Guideへ混在させない境界を明記
- Machine Routerへ `STRUCTURE_FLOW` Domainを追加
- `meaningful-structure-flow-requirements` Golden Routing Caseを追加

### Consolidated

- `docs/04-ui-ux-accessibility.md`
  - UI / UX / Accessibilityの一般原則を維持
  - Page / Featureより先にUser Goal / Taskを見るTask-first原則を短く追加
  - Structure / Flow固有Research Workflowは`docs/22`へ委譲
- `docs/18-domain-first-visual-research.md`
  - Navigationの分類・階層・到達経路等の構造変更を`docs/22`へ委譲
  - Navigation UIのPlacement / Density / Typography / Color等のVisual変更は`docs/18 + docs/04`で扱う境界を明確化
  - IA / Navigation / Task FlowとVisualを両方変える場合、Structure判断を先に行うFlowへ整理
- `README.md` / `START_HERE.md` / `docs/00-governance.md`
  - 新OwnerをHuman Router / Owner Registryへ接続
- `docs/21-rule-routing-preflight.md`
  - `STRUCTURE_FLOW` DomainとVisualとの分類境界を追加
  - Structure / Flow専用Stable Gateは追加せず、通常Domain Routeとして運用
- `REQUIREMENTS.md`
  - `docs/00-22`をCurrent Owner Structureとして反映
  - Site固有Sitemap / Navigation / User Flow / State MatrixをCommon Guideの非責務として明記

### Validator

- `docs/22-task-first-structure-flow-research.md`をrequired fileへ追加
- README / START_HERE / Governanceから`docs/22`へ到達できることを検証
- `docs/04`と`docs/18`がStructure / Flow Researchを`docs/22`へRouteすることを検証
- `docs/22`が一般UX / Visual Research / Evidence-first Researchの既存Owner境界を維持することを検証
- `meaningful-structure-flow-requirements` Golden Caseで`docs/04 / 20 / 22`へ到達し、Visual scopeなしでは`docs/18`を過剰RouteしないことをRegression Guard化

### Rule Hygiene

- 新Owner `docs/22`は既存`docs/04`へ混在すると責務が肥大化する**Structure / Flow固有Research Workflowだけ**を所有
- 一般Research Methodは引き続き`docs/20`、UI / UX一般原則は`docs/04`、Visual Researchは`docs/18`を正本とする
- 新しいStable Gateは追加しない
- Project固有のIA / Sitemap / Flow / State MatrixをCommon Ownerへ保存しない
- Sidebar / Top Nav / Tabs等の固定Navigation PatternをGuide Defaultにしない

### Compatibility

- 既存ProjectのIA / Navigation / Flowを自動変更しない
- Card Sorting / Tree Testing / Tutorial / Autosave / Wizard等を全Projectへ一律要求しない
- NavigationのVisual修正だけでStructure Researchを機械的に要求しない
- Structure ResearchだけでVisual Researchを自動要求しない
- Runtime / Storage / Schema / Deployment Defaultを変更しない

## 1.18.0 - 2026-09-06

### Added

- `docs/20-evidence-first-research.md`を **一般Research WorkflowのSingle Normative Owner** として追加
  - `Question → Prior Research / Existing Knowledge → Evidence Map → Discussion → Decision → Validation` を基本Flowとして定義
  - Quick / Standard / Deep Researchの強度差を追加
  - Deep Researchでは100件規模のBroad Discoveryを**Quotaではなく探索目安**として扱い、Research Saturationを実際の終了条件に設定
  - Discovered / Reviewed / Deep-read / Core Evidenceを分離
  - Original Source / Claim Verification、Supporting / Opposing Evidence、Failure / Limitation / Bias / Applicabilityを整理
  - Causal / Correlational / Suggestive / Hypothesis / AI Synthesis、Statistical / Practical Significance、Subgroup、Replication / Consensus / Emerging Evidenceを分離
  - Evidence Map、Discussion Gate、Research Status、Research Review Gate、Research Log、Freshness、Delta / Gap Researchを追加
  - Evidence / Interpretation / Project Preference / Decisionを分離し、Researchで解決しない問題をPrototype / Test / Playtest / Measurementへ渡すFlowを定義
  - Project固有Research Resultは対象Projectの`docs/research/`等へ保存し、Common GuideをResearch Result倉庫にしない方針を追加

### Consolidated

- `docs/00-governance.md`
  - Evidence-first ResearchのSingle Normative Ownerとして`docs/20`をOwner表へ登録
- `docs/01-requirements.md`
  - User Preference / Researchable Question / Project-specific Decision / Confirmed Requirementを分離
  - 一般Research Methodは`docs/20`へRoutingし、RequirementsはUser Decision /正式要件化の責務を維持
- `docs/14-continuous-improvement.md`
  - External Research Methodを`docs/20`へ委譲
  - Project Feedback Loop / Rule Hygiene / Common Rule Promotion operationを維持
- `docs/18-domain-first-visual-research.md`
  - Visual固有のTarget Type、KEEP / FIX / REMOVE、Reference Transfer、Candidate比較、Visual Foundation Resetを維持
  - 「2〜5件」をResearch全体の母数ではなく、Broad Research後のRepresentative Visual References重点比較数として整理
- `docs/19-game-development.md`
  - Game固有設計 / Balance / Runtime Validation / Actual Playtest責務を維持
  - 重要なGame Researchable Questionだけ`docs/20`へRouting
- `README.md` / `START_HERE.md`
  - 詳細Ruleを複製せずOwner / 作業Routeだけ追加
  - `docs/20`を全作業の必読にはせず、重要かつ不確実なResearchable Question用Routeとして追加

### Validator

- `docs/20-evidence-first-research.md`をrequired fileへ追加
- READMEの番号付きDoc RouterとSTART_HEREのResearch Routeを検証
- Governanceが`docs/20`を一般Research Ownerとして登録していることを検証
- `docs/01`がResearchable Questionを`docs/20`へRoutingすることを検証
- `docs/14`がExternal Research Methodを委譲しつつRule Hygiene / Common Rule Promotionを保持することを検証
- `docs/18`が一般Researchを`docs/20`へ委譲し、「2〜5件」をRepresentative Visual comparisonとして扱うことを検証
- `docs/19`がGame固有責務を維持しつつ重要Researchable Questionを`docs/20`へRoutingすることを検証
- `docs/20`のResearch Depth、Saturation、Source Count透明性、Opposing Evidence、Applicability、Evidence Map、Research Review Gate、Delta Research、Project固有Research保存境界をRegression Guard化

### Rule Hygiene

- 新しい番号付きOwner `docs/20`は、既存章へ自然に収まらなかった**一般Research Methodだけ**を所有
- `README.md` / `START_HERE.md`はRouterのまま維持し、Research詳細Ruleを再掲しない
- `docs/18`はVisual Researchの専門Ownerとして残し、一般Research母数 / Bias / Evidence Qualityの正本にはしない
- `docs/19`はGame Design / Playtestの専門Ownerとして残し、一般Research Methodを複製しない
- `docs/04-ui-ux-accessibility.md`、`docs/05-performance-reliability.md`、`templates/QUALITY_CHECKLIST.md`はRouting Gapが確認されなかったため変更しない
- Project固有Research Resultや大量Source ListをCommon Guideへ保存しない

### Compatibility

- すべての作業へDeep Researchを強制しない
- 100件を最低件数 / Quota / 完了条件にしない
- Research ConsensusをUser PreferenceやProject固有Decisionへ自動変換しない
- VisualのKEEP / FIX / REMOVE、Candidate比較、Foundation Resetを削除しない
- GameのActual Playtest / Phase Gate / Completion ContractをResearchへ置き換えない
- Product RepositoryのRuntime / Storage / Schema / Deployment Defaultを変更しない

## 1.17.1 - 2026-09-06

### Added

- `docs/03-data-storage.md`へ **Destructive Reset / Delete** のLifecycle安全Contractを追加
  - Canonical Reset成功後に`reset-pending` / write barrierを有効化
  - `beforeunload` / `visibilitychange` / Autosave / 別Moduleのlate writeによる削除前Data復活を防止
  - Reset後に意図的なstale saveを実行するRegression Testと、必要時のReset → Reload Browser Smokeを追加
- Failure Catalogへ `F-020 Reset直後のLifecycle Saveで削除前Dataが復活する` を追加

### Changed

- `docs/19-game-development.md`をScrap Factoryの実Project Learningで補強
  - 現在Stateから再計算できる条件と、一度達成したHistorical Milestoneの保存責務を分離
  - New GameのDefault Spawn変更とExisting Saveの位置Migrationを分離
  - Tutorial StepはCash増加等の代理指標ではなく、通常Gameplayと同じRule / Event / Analyzerで実成功を判定する方針を追加

### Evidence

- `EliteMay/game` / Scrap Factory `PROJECT_LEARNINGS.md`
  - Reset直後のpage lifecycle saveが古いRuntime stateを再保存し、Resetを取り消した実例
  - New Game Spawn変更時にExisting Save位置をnormalizeで上書きしないMigration方針
  - Tutorial完了を実際の搬送 / 自動販売Eventで判定した実装
  - Post-clear Objectiveの現在条件は導出し、達成履歴だけを最小保存する設計

### Rule Hygiene

- 新しいOwner Docは追加せず、Storage Lifecycleは`docs/03`、Game-specific state / Tutorial semanticsは`docs/19`へ統合
- Project固有のHome / PC / Factory仕様はCommon Guideへ移植しない
- Failure Catalogは実例Evidenceに限定し、Normative Rule本文は`docs/03`へ保持

### Compatibility

- Existing Saveを新しいSpawn / Initial Stateへ自動移動するルールにはしない
- すべてのReset実装へ複雑なbarrierを一律要求せず、late writeが存在するAppで条件付き適用
- Product RepositoryのRuntime / Save Schema / Gameplay仕様は変更しない

## 1.17.0 - 2026-09-05

### Added

- `docs/19-game-development.md`を追加し、**Game-specificな設計・完成判定・Playtest・Phase管理のNormative Owner**として定義
  - Core Experience / Core Loop / Playable MVP / Vertical Slice / Progression / Primary Completion Conditionを整理
  - Prototype / Playable MVP / Main Game Completeを区別
  - Game State semantics / Failure Contract / Difficulty / Balance / Content / World / Simulation / Controls / TutorialをGame固有責務として整理
  - Automated Test / Runtime Validation / Actual Playtestを分離
  - Phase Gate / Core Before Variety / Scope Managementを追加
  - Small GameへSave / LOD / Stress Test /大規模Architectureを機械的に強制しない条件付き適用を明記
- `GAME` Project Profileを追加
  - Browser / Canvas / WebGL / Electron / 2D / 3D等の実装方式ではなく、Gameplay Rule / Player Action / Success-Failure / Progressionが主要価値かで適用判断
  - `STATIC` / `MEDIA` / `ELECTRON`等の既存Profileと併用可能
- `templates/REQUIREMENTS_TEMPLATE.md`へCompactなGAME Sectionを追加
- `templates/QUALITY_CHECKLIST.md`へCommon + Conditionalの短いGAME確認項目を追加
- Guide ValidatorへGame Owner / Router / Profile / Requirements / ChecklistのRegression Guardを追加

### Changed

- `README.md`へGame Development Ownerと`GAME` Profileの短い入口を追加
- `START_HERE.md`へ「ゲームを作る / 直す」Routeを追加
- `docs/00-governance.md`のOwner表へGame Developmentを登録
- `docs/01-requirements.md`へGAME Requirementsの最小入口を追加し、詳細は`docs/19`へ委譲
- `docs/12-project-profiles.md`へ`GAME`を追加

### Rule Hygiene

- Game固有のCross-cutting Ruleは既存Ownerへ自然に収まらないため、新しい番号付きOwner `docs/19` を追加
- Save Schema / Migration / Backup / Restoreは引き続き`docs/03`
- UI / UX / Accessibility一般は`docs/04`
- Page Load / Runtime responsiveness一般は`docs/05`
- Testing Strategy / Verification Stateは`docs/07`
- Asset / Dependency / Licenseは`docs/13`
- Visual Minimum / Domain Researchは`docs/17` / `docs/18`
- README / START_HEREはRouterのまま保ち、Game詳細Ruleを複製しない
- Game専用巨大Templateや`GAME-SMALL` / `GAME-LARGE`等のProfile分割は追加しない

### Compatibility

- 既存Projectへ`GAME`を自動付与しない
- Mini GameへLong-running Save、LOD、Stress Test、Difficulty Mode等を一律要求しない
- Combat / Craft / Quest / Enemy等のGenre固有Mechanicを共通必須にしない
- ECS / Event Bus等のArchitectureをGameだからという理由だけで導入しない
- Existing SaveのResetや既存ProjectのRuntime / Storage / Schema / Deployment変更を要求しない

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
- `docs/01-requirements.md`へLearning / Explanation Contentを追加
- `START_HERE.md`へ学習・解説サイト専用Routeを追加
- `templates/REQUIREMENTS_TEMPLATE.md`へLearning Content記入欄とLearning完成条件を追加
- `README.md`のProject Profile一覧へ`LEARNING`を追加

### Compatibility

- 既存Projectへ`LEARNING`を自動付与しない
- 既存の`DATA` Profileを置き換えない
- Runtime / Storage / Schema / Deployment Defaultは変更しない

## 1.14.1 - 2026-09-03

### Added

- `docs/10-project-management.md`へRepository discoverability / 公開サイトへの導線を追加
- `templates/README_TEMPLATE.md`と`templates/QUALITY_CHECKLIST.md`へ公開Site導線確認を追加

## 1.14.0 - 2026-09-03

### Added

- `docs/00-governance.md`へRule Budget / Single Normative Owner / Orphan Rule防止を追加
- `docs/14-continuous-improvement.md`と`maintenance/review-policy.json`へRule Hygiene Reviewを追加

### Consolidated

- README / START_HERE / Owner Doc / Catalog / Checklistの重複責務を整理
- `docs/18-domain-first-visual-research.md`をDomain Research / KEEP-FIX-REMOVE / Candidate比較 / Visual Foundation ResetのOwnerへ統合

## 1.13.0 - 2026-09-02

### Added

- `docs/18-domain-first-visual-research.md`を追加
- Meaningful Visual変更前のDomain-first Visual Researchを正式化

## 1.12.0 - 2026-09-02

### Added

- Evidence-weighted Visual Direction Catalogを拡張
- KEEP / FIX / REMOVE、Reference Transfer、Candidate比較、Visual Foundation Resetを補強

## 1.11.0 - 2026-08-31

### Added

- `docs/17-visual-quality-baseline.md`とVisual Ambitionを追加

## 1.10.0 - 2026-08-31

### Added

- `docs/16-cross-repository-github-infrastructure.md`とReusable Workflow / Ruleset / Dependabot運用方針を追加

## 1.9.0 - 2026-08-31

### Added

- Remote Diagnostic Handoff / Free-only Guard / Remote Snapshot Securityを追加

## 1.8.0 - 2026-08-31

### Added

- Electron Installer Release Contract / Updater Bootstrap / Build-Release Pipeline分離を追加

## 1.7.0 - 2026-08-31

### Added

- Subject-grounded Visual Direction / AI Prompt constraint / Design Plan Critique / Visual Review / AGENTS templateを追加

## 1.6.0 - 2026-08-31

### Added

- Electron One-click Update / Update Metadata / Release整合方針を追加

## 1.5.0 - 2026-08-31

### Added

- Structure-first Visual Design / AI Template Look回避 / DesignShelf連携を追加

## 1.4.0 - 2026-08-31

### Added

- Development Observability / Project Learnings / Diagnostics標準を追加

## 1.3.0 - 2026-08-31

### Added

- Continuous Improvement / Review Policy / Web Standards Loopを追加

## 1.2.0 - 2026-08-30

### Added

- Architecture / Data / Version / Import / Patch統合の追加ルールとGuide Validator強化

## 1.1.1 - 2026-08-30

### Added

- GitHub変更経路 / Final-state Validation / temporary artifact cleanupを追加

## 1.1.0 - 2026-08-30

### Added

- START_HERE / Governance / Guide Version SoT / Project Profiles / Templates / Guide Validatorを追加

## 1.0.0 - 2026-08-30

### Added

- 要件定義、Architecture、Data/Storage、UI/UX、Performance、Security、Testing、GitHub Pages、Maintenance、Project Management、Electronの共通ガイド
- Failure / Success / Anti-Pattern Catalog
- Requirements / Work Report / Quality Checklist templates
- Web標準Reference
