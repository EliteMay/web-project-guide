# Unreleased Guide Changes

このファイルは、最後にReleaseしたGuide VersionとCurrent `main`の間にある**未Release変更**の短い要約です。

- Released baseline: `1.22.0` / 2026-09-07
- Release commit: `fd9cc77ff5284906784ca827d4c21caa2950d08d`
- Current state: `unreleased-changes`

正式Release時は、この内容を`CHANGELOG.md`の新しいVersion entryへ統合し、`guide-version.json`のVersion / date / releaseCommit / statusを同時更新します。

## Added

- `docs/11`のElectron共通基盤へSettings Tab / Settings Screen Contractを追加。複数のUser-configurable設定があるAppではTheme・保存先・Update・起動時動作・通知・Cache / Log・Backup等を予測可能な設定Surfaceへ集約し、現在値・保存方法・Restart要否・Reset範囲・危険操作・未対応状態を明示するRuleとChecklistを追加
- `docs/11`のElectron共通基盤を拡張し、Task Manager、Process Manager / Crash Supervisor、Safe Mode / Repair、Secret Storage、Download Manager、Diagnostic Export、Disk / Cache lifecycle、Power / Sleep lifecycle、First Run / Repairを追加。独立配布するElectron Appはアプリごとに識別可能な固有Iconを持ち、Packaged executable / Taskbar / Shortcut / Start Menu / Installer等の必要Surfaceで確認するContractも追加
- `docs/11`へElectron共通基盤（Desktop Foundation）Ruleを追加し、設定・Log・Diagnostics・Window State・Single Instance・Recovery・Path記憶・Theme / Network状態を共通責務候補として整理。Backup / RestoreとAuto Start / Tray / Notification / Global Shortcut / GitHub Integration等を条件付きCapabilityへ分離し、shared Template / Package利用時の責務境界とRegression確認を追加
- Loop EngineeringをGuideのProduct機能として扱う`LOOP_ENGINEERING_REQUIREMENTS.md`を追加し、Outer / Inner Loop、Verifier Integrity、Progress / Stuck、Budget、Permission、Recovery、Parallelism、Autonomy LevelをCurrent Contract化
- `maintenance/loop-policy.schema.json` / safe example / focused validatorを追加し、Default Branch direct-write・merge・deploy・secret access・WorkerによるVerifier改変をSafe Exampleで禁止してCI検証
- `web-project-data`へLoop Engineering Runtime Phase AのRead-only / Dry Run Controllerを実装し、Current Repository / Queue / Requirements blob SHA照合、mechanical candidate、Verifier requirement、blocker / next-action simulationをMutationなしで行う経路を追加
- `web-project-data`へLoop Engineering Runtime Phase BのIsolated Worker Loopを実装し、formal assignment / claim、Repository writer coordination、isolated Worker Branch / worktree、protected verification、success-only Queue completion、Machine-readable Receiptを追加
- `web-project-data`へLoop Engineering Runtime Phase CのResume / Stuck / Budget / Control Outer Loopを実装し、Current Evidence reconciliation、same-failure detection、retry strategy guard、iteration / wall-clock / model token / external cost budget、pause / cancel Kill Switch、`needs_reconcile` fail-closedを追加
- `web-project-data`へLoop Engineering Runtime Phase DのParallel Worker Orchestrationを実装し、explicit path / semantic scope isolation、atomic multi-task assignment、per-worker isolated branch / worktree、実並列implementation、protected worker verification、deterministic Integration Branch、cross-worker Integration Verification、aggregate budget / global Kill Switchを追加
- Human GuideにManifest-drivenな「次に見る」Related / Next Steps導線と、関連ID整合を検証する専用Regression Guardを追加
- Human Guideの長いPageへManifest opt-inのAuto TOCと、Source / Owner / Edit / Reportを共通化するSource Footerを追加
- Human GuideのCurrent Product Contract、Surface Manifest、正本種別を区別するサイト全体検索、Current Machine Routerを投影する作業ルート診断を追加
- Human Guide Manifest / compatibility adapter / Public Search境界を検証するRegression Guardと、narrow viewportでもGlobal Navigationへ到達できる共通Shell / responsive基盤を追加
- Meaningful UI requirementsでも候補案を固定する前にDomain / Genre Researchへ到達するRouteを明確化
- 既知Game interaction / collider regressionを再利用するKnown Failure preflightとActual Playtest補強
- Known Failure preflightのRule / Checklist / AGENTS / Work Report接続を検証する専用Regression Guardと、作業報告へPreflight evidenceを残す欄を追加
- Manual conversation / scheduled workerが同じ未完了作業へ書き得る場合のexclusive work lease coordination
- Human-facing AI Workflow / Work Dashboard / Rule Finder、repository-specific project dashboards、sanitized Work Queue表示、guarded worker start handoff
- Human Guideに現在のCommon Ruleを短い箇条書きで横断確認できる「全ルール短縮版」ページ
- Human GuideにResearch / Evidenceが残る分野と深く要件定義・Contract化した分野を横断確認できる「研究・要件定義」ページ
- Dashboard V2とautomatic Requirements-to-Work-Queue handoffのRequirements
- Guide-scoped development conversation persistenceと専用Regression Guard
- Conversation境界を越えて同じ作業系列を復旧するAutomatic Conversation Resume / Workstream Contract
- Meaningful / checkpoint / repository mutation前に未完了Interactionを保護するLive Interaction Guard Contract
- Typed Resume Proposal / Confirmation / Rejection / Failure Review evidenceとconversation-scoped Confirmation Contract
- Historical BackfillがCurrent Stateを巻き戻さない`stateEffect` ContractとFuture timestamp integrity rule
- AI-generated UI homogenization等のnon-normative Research assets
- Release baseline / Current unreleased stateを検証する`tests/validate-release-integrity.mjs`
- 正式Release状態を自己参照なしで構築できることを検証する`tests/test-release-integrity.mjs`
- Machine RouterへPreflightとは独立した`interactionLifecycle.completionDocs` Layerを追加
- `docs/18`へVisual Direction候補の判断軸を一元化する`Design Direction Contract`を追加
- `docs/07`へ現実的・非誘導なTaskを使い、Unassisted / Assisted / False Success / Blocked / Abandonedを区別するTask-based Usability Validationを追加
- `docs/06` / `docs/07`へSecure Context・Permissions Policy・User permission・User activation・Device / OS availabilityを分離するBrowser Powerful Feature Permission LifecycleとVerificationを追加
- GOV.UK / MDNのCurrent official evidenceを整理したUsability / Browser Permissionのcurated non-normative Referenceを追加
- Managed Backend / Serverless / Worker等へ比例適用するProduction Runtime Observability / Operational Readiness Contractを`docs/15`へ追加
- OpenTelemetry / Google SREのCurrent public evidenceから、User-visible health・Telemetry correlation・Actionable Alert・Incident learningの境界を整理したcurated non-normative Referenceを追加
- Round 2 Deep Auditで追加したProduction Observability / write-probe safety Contractを守るfocused validatorを追加

## Changed

- Owner本人向けの管理画面・Dashboard・Tool・学習サイト等では、明示的な別要件がない場合Dark / Night Modeを初期Themeの標準候補とし、Theme選択の保存、OS preference、Dark Theme時のContrast、初回描画のWhite Flash回避を`docs/04`へ追加
- `LOOP_ENGINEERING_REQUIREMENTS.md`のCurrent StatusをRuntime Phase A–E実装済みへ同期し、再利用可能Runtime / Schema / Regression / generic Queue helperのCurrent OwnerをPublic `EliteMay/web-project-runtime`へ分離。Private `web-project-data`はConversation / Work Queue state / Loop run evidence / Recovery data等のPrivate State Ownerとして維持。Public Runtime main `f9875625c5f023d391cdfbd79b536d4f3d293ac3`でPhase A–E × Ubuntu / Windowsの10 Job PASSを確認
- Human GuideのSource FooterでRelease Baseline / unreleased stateとHuman Summary本文の同期保証を明確に分離し、Release表示だけで最新本文と誤認しないよう変更
- Site-wide SearchをAuthority + Content Typeの2軸Filter、URL state復元、`/`・`Ctrl/Cmd+K` shortcut対応へ拡張
- Human GuideのNavigation / Search / compatibility route metadataを`site/data/human-guide-manifest.json`へ集約し、Release baseline表示とHuman Summaryの同期状態を同一視しないContractへ変更
- Development System IntegrityのCurrent ContractをPhase 0-4実装済み / Phase 5 Data Retention・Archive次工程へ同期し、`web-project-data`側Persistence Gap Detector V1、Development Traceability V1、Development System Health V1、Trusted Recovery Phase 2の最終Validation済み状態を記録
- Trusted Recovery Phase 2の検証済みBaselineとして`web-project-data` PR #134 / merge `740c2fcdacaeda77e1b48430fab681bc0bf89e1f`、merge後`Validate Data` / Windows PowerShell Compatibility PASSをCurrent Contractへ反映
- Dashboard V2のWork Queue状態表記をCurrent Queue Evidenceへ合わせ、Task生成済みだが`activeRunId: null`・idle lanes・queued tasksでtask execution未開始であることを明確化
- Guide / Dataの責任境界を整理し、point-in-time Audit、Project-specific / time-specific Evidence、Promotion済みHistorical Research、Research working stateの本体を`EliteMay/web-project-data`へ保存するContractへ変更
- Deep System AuditのExecution Checklist / review policyもData側Audit保存先へ合わせ、Guide側`maintenance/audits/`をCompatibility Pointer / Indexへ限定
- `maintenance/audits/`、移動対象`maintenance/research/*`、Project-specific `references/*`の旧Pathを削除せずCompatibility Pointer化し、過去Linkを維持
- Publicで複数Projectへ直接再利用するCurated Research / ReferenceとCurrent Research execution protocolはGuide側へ残す境界を明文化
- Root `REQUIREMENTS.md`からPhase単位のResearch履歴本文を外し、Current Contract + Guide/Data storage boundaryへ整理
- 人が見るサイトUI、README、Dashboard、操作説明、作業報告、AIからUserへの説明は対象利用者が理解できる言語を優先し、Project Owner / 日本語利用者向けSurfaceでは日本語を基本にするRuleを追加
- 内部のFile名・変数名・関数名等は英語のまま維持でき、User-facingな英語専門用語には必要に応じて日本語の意味を添える方針をREADME Templateへ反映
- Human Guideを`site/`配下へ責務別に整理し、既存Root URLはCompatibility Adapterとして維持
- Human Guideのmobile usability、dashboard freshness、isolated worker status、current routing parityを改善
- Work Queue contractを現在のruntime / Claim Gate / public projectionへ同期
- Conversation PersistenceをGuide-scoped InteractionのCompletion Gateへ接続
- Conversation Persistence Ownerを全Development Work TypeのPreflight Required Docから外し、`interactionLifecycle.completionDocs`でCompletion時に到達する構造へ変更。Conversation Recovery自体がTaskの場合は従来どおりDomain / SignalからPreflightで`docs/23`へ到達
- Conversation Handoff / Recovery OwnerをWorkstream候補解決、semantic candidate interpretation、one-time Resume Confirmation Gate、User Override、Write Target / Live Guard分離へ拡張
- Automatic Resume候補をUserが否定した場合、別候補へ即切替せずRoot Cause / Failure Mechanism確認と必要な再発防止を先に行うFlowへ変更
- `docs/23`はRecovery / PersistenceのBehavioral Contractへ限定し、Data側のBranch / Ref名、File path、Schema、書込みAlgorithm、Receipt field、Settlement implementationを`EliteMay/web-project-data` Current Contractへ委譲
- Persistence成功条件はGuide側で特定Fieldを複製せず、Current Data Contractが要求するCanonical / Derived state整合とPersistence Receipt相当のEvidenceを確認するContractへ整理
- `docs/10-project-management.md`へRoot-Cause-first Failure / Bug Workflowを追加
- `guide-version.json`へReleased baseline commitとCurrent release stateを追加
- `docs/09-maintenance.md`へReleased baseline / Unreleased current stateの分離Contractを追加
- `Validate Guide`をfull git historyで実行し、Release-affecting変更とUnreleased recordの整合を検証
- `releaseCommit`以後の差分判定からVersion / CHANGELOG / Unreleased / Work Report等のRelease bookkeepingを除外し、Release内容Commitの後にMetadata commitを安全に置けるよう修正
- Visual Owner境界を整理し、`docs/04`はUI / UX / AccessibilityとVisual Quality原則、`docs/18`はDomain Research / Design Direction Contract / Candidate比較・採否Workflowを正本とする構造へ変更
- Quality ChecklistへTask-based UsabilityとBrowser Powerful Feature PermissionのConditional Routing /実行確認を追加し、新しいOwner・Profile・Stable Gateを増やさず既存Ownerへ接続
- GitHub Tool / ConnectorのCapability discoveryではRead-only確認を先に行い、Default / Authoritative BranchをWrite Probeへ使わないRuleを`docs/10`とCore Checklistへ追加
- Quality ChecklistへProduction Runtime ObservabilityのConditional Routing /実行確認を追加し、Static Siteへ不要なObservability stackを強制しない構造へ変更

## Fixed

- Loop Engineering Product Contractでterminal扱いしている`needs_reconcile`がMachine Policy Schema / Safe Exampleの`terminalStates` enumから漏れていたdriftを修正し、focused validatorでSchema / Example双方を8状態として固定
- Loop Engineering Phase Cの正常なpre-assignment Pause / ResumeをCrash扱いして`needs_reconcile`へ誤分類し得たReconciliation条件。Assignment成立前と成立後を分け、未記録Worker Branch等の曖昧なCrash Evidenceだけをfail closedするRegressionで補強
- Human Guideの全ルール短縮版でVisual Quality Baseline Owner 17が欠落し、Manifestで`searchable: true`のGuide MigrationがSite-wide Searchから抜けていたCoverage drift。Current Ownerとsearchable Surfaceを動的検証するRegression Guardで再発を防止
- Human GuideのGlobal Navigation / compatibility route / validator coverageがページごとにdriftしやすく、narrow viewportでGlobal tabsが到達不能になり得た構造上のGap
- Current Rule / Procedureとpoint-in-time Research / Evidenceの保存場所がGuide内で重複し、Public Guideが作業履歴Repository化し得た責任境界の曖昧さ
- `docs/14`はAudit結果をData側へ保存すると定義しているのに、Deep Audit Checklist / review policyがGuide側`maintenance/audits`を結果本体の保存先としていた矛盾
- Persistence Ruleが存在していても通常Interactionの終了経路から適用されず、保存漏れが起こり得たCompletion Routing failure
- Persistenceの文章Validatorは通っていてもMachine Routerの通常Work Typeが`docs/23`へ到達せず、実際のConversation保存が再度抜けたRule Application failure
- 上記対策として`docs/23`を全Work Typeへ直接入れた結果、Local Bug等までConversation Recovery OwnerをPreflight必読にしていたover-routing
- Guide側`docs/23`とData側Current Contractの両方へCurrent Recovery implementation detailが存在し、第二Source of Truth化し得た責務重複
- `docs/04`と`docs/18`の両方がDesign Direction候補・2〜3案比較・WireframeからDirection確定までのVisual Workflowを持ち、Single Normative Ownerが曖昧になっていた重複
- General User Testの存在だけは認識していたが、現実的Task・非誘導Facilitation・自力成功と補助成功・誤成功・Blocked等を分ける一般Usability Validation Workflowが無かったRule Gap
- Browser PermissionをAuth / Compatibilityの断片として扱い、Secure Context・Permissions Policy・User Permission・Activation・Device stateを横断したCapability Lifecycleが無かったResearch / Rule Gap
- Automatic ResumeのHigh Confidence候補をUser確認なしでResume可能としていた誤復帰経路と、User否定後にRoot Cause確認なしで別候補へ進めたFailure path
- Caller-supplied Confirmation / write-safety assertion、historical backfill、future timestamp、stale topic accumulationがRecovery Current Stateを誤らせ得る経路
- Correction Interactionのsource Workstreamで新Interaction IDを直接参照しない正当なContractをPersistence Receiptがfailure扱いするRegression
- `guide-version.json`とCHANGELOGが両方同時に古い場合、Current GuideがRelease baselineより進んでいてもCIが検出できなかったRelease metadata drift
- `releaseCommit`を`guide-version.json`自身へ記録する設計で、Metadata変更自体をRelease-affecting差分として数えると`status: released`へ戻せない自己参照問題
- Managed Backend / Worker等をGuideが扱う一方、Local Development Diagnostics中心でProduction health・Correlation・Actionable Alert・Incident learningのOperational Readinessが明示されていなかったRule Gap
- Tool write可否の確認目的だけでGuide `main`へtemporary create-delete probeを行い、Contentは戻っても不要Commit / CI / Pages履歴が残ったRepository operation failure

## Compatibility

- 移動したGuideの旧Research / Evidence / Audit PathはCompatibility Pointerとして維持し、既存の相対Linkを壊さない
- Data側RecordはCurrent Guide / Project Stateの第二Source of Truthとして扱わない
- Private Data内容をPublic Guideへ直接露出しない
- 新しい正式Releaseはまだ切らず、Released baselineは`1.22.0 / 2026-09-07`のまま維持
- Product RepositoryのRuntime / Storage / Schema / Deploymentを自動変更しない
- Automatic Resume Capabilityがない通常ChatGPT環境へPlatform-level lifecycle hookが存在すると仮定しない
- Existing Interaction / Workstream recordsはCurrent Data ContractでCompatibilityを扱い、破壊的rewritingをGuide側から要求しない
- non-normative Research / Work Report / Project Learning / Release bookkeepingだけの変更まで機械的に新Releaseへ昇格させない
