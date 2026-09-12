# Unreleased Guide Changes

このファイルは、最後にReleaseしたGuide VersionとCurrent `main`の間にある**未Release変更**の短い要約です。

- Released baseline: `1.22.0` / 2026-09-07
- Release commit: `fd9cc77ff5284906784ca827d4c21caa2950d08d`
- Current state: `unreleased-changes`

正式Release時は、この内容を`CHANGELOG.md`の新しいVersion entryへ統合し、`guide-version.json`のVersion / date / releaseCommit / statusを同時更新します。

## Added

- Meaningful UI requirementsでも候補案を固定する前にDomain / Genre Researchへ到達するRouteを明確化
- 既知Game interaction / collider regressionを再利用するKnown Failure preflightとActual Playtest補強
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

## Changed

- Development System IntegrityのCurrent ContractをPhase 0-1実装済み / Phase 2 Development Traceability次工程へ同期し、`web-project-data`側Persistence Gap Detector V1の最終Validation済み状態を記録
- Dashboard V2のWork Queue状態表記をCurrent Queue Evidenceへ合わせ、Task生成済みだが`activeRunId: null`・idle lanes・queued tasksでtask execution未開始であることを明確化
- Guide / Dataの責任境界を整理し、point-in-time Audit、Project-specific / time-specific Evidence、Promotion済みHistorical Research、Research working stateの本体を`EliteMay/web-project-data`へ保存するContractへ変更
- `maintenance/audits/`、移動対象`maintenance/research/*`、Project-specific `references/*`の旧Pathを削除せずCompatibility Pointer化し、過去Linkを維持
- Publicで複数Projectへ直接再利用するCurated Research / ReferenceとCurrent Research execution protocolはGuide側へ残す境界を明文化
- Root `REQUIREMENTS.md`からPhase単位のResearch履歴本文を外し、Current Contract + Guide/Data storage boundaryへ整理
- 人が見るサイトUI、README、Dashboard、操作説明、作業報告、AIからUserへの説明は対象利用者が理解できる言語を優先し、Project Owner / 日本語利用者向けSurfaceでは日本語を基本にするRuleを追加
- 内部のFile名・変数名・関数名等は英語のまま維持でき、User-facingな英語専門用語には必要に応じて日本語の意味を添える方針をREADME Templateへ反映
- Human Guideを`site/`配下へ責務別に整理し、既存Root URLはCompatibility Adapterとして維持
- Human Guideのmobile usability、dashboard freshness、isolated worker status、current routing parityを改善
- Work Queue contractを現在のruntime / Claim Gate / public projectionへ同期
- Conversation Persistenceの通常Entryを`web-project-data/tools/conversations/persist-interaction.mjs`へ合わせ、Current Repository再取得境界を明確化
- Conversation PersistenceをGuide-scoped InteractionのCompletion Gateへ接続
- 全Development Work TypeをConversation Persistence OwnerへRoutingし、通常の実装・調査・公開作業でも保存確認がCompletion経路から外れないように強化
- Conversation Handoff / Recovery OwnerをWorkstream候補解決、semantic candidate interpretation、one-time Resume Confirmation Gate、User Override、Write Target / Live Guard分離へ拡張
- Automatic Resume候補をUserが否定した場合、別候補へ即切替せずRoot Cause / Failure Mechanism確認と必要な再発防止を先に行うFlowへ変更
- Live coordination churnをCanonical `main`から分離し、dedicated `recovery-live` coordination branchとCAS / fast-forward-only publicationを使うContractへ変更
- Persistence成功条件をInteraction file存在だけでなくConversation checkpoint / Workstream association / Correction / generated indexの整合へ強化
- `docs/10-project-management.md`へRoot-Cause-first Failure / Bug Workflowを追加
- `guide-version.json`へReleased baseline commitとCurrent release stateを追加
- `docs/09-maintenance.md`へReleased baseline / Unreleased current stateの分離Contractを追加
- `Validate Guide`をfull git historyで実行し、Release-affecting変更とUnreleased recordの整合を検証
- `releaseCommit`以後の差分判定からVersion / CHANGELOG / Unreleased / Work Report等のRelease bookkeepingを除外し、Release内容Commitの後にMetadata commitを安全に置けるよう修正

## Fixed

- Current Rule / Procedureとpoint-in-time Research / Evidenceの保存場所がGuide内で重複し、Public Guideが作業履歴Repository化し得た責任境界の曖昧さ
- Persistence Ruleが存在していても通常Interactionの終了経路から適用されず、保存漏れが起こり得たCompletion Routing failure
- Persistenceの文章Validatorは通っていてもMachine Routerの通常Work Typeが`docs/23`へ到達せず、実際のConversation保存が再度抜けたRule Application failure
- Automatic ResumeのHigh Confidence候補をUser確認なしでResume可能としていた誤復帰経路と、User否定後にRoot Cause確認なしで別候補へ進めたFailure path
- Caller-supplied Confirmation / write-safety assertion、historical backfill、future timestamp、stale topic accumulationがRecovery Current Stateを誤らせ得る経路
- Correction Interactionのsource Workstreamで新Interaction IDを直接参照しない正当なContractをPersistence Receiptがfailure扱いするRegression
- `guide-version.json`とCHANGELOGが両方同時に古い場合、Current GuideがRelease baselineより進んでいてもCIが検出できなかったRelease metadata drift
- `releaseCommit`を`guide-version.json`自身へ記録する設計で、Metadata変更自体をRelease-affecting差分として数えると`status: released`へ戻せない自己参照問題

## Compatibility

- 移動したGuideの旧Research / Evidence / Audit PathはCompatibility Pointerとして維持し、既存の相対Linkを壊さない
- Data側RecordはCurrent Guide / Project Stateの第二Source of Truthとして扱わない
- Private Data内容をPublic Guideへ直接露出しない
- 新しい正式Releaseはまだ切らず、Released baselineは`1.22.0 / 2026-09-07`のまま維持
- Product RepositoryのRuntime / Storage / Schema / Deploymentを自動変更しない
- Automatic Resume Capabilityがない通常ChatGPT環境へPlatform-level lifecycle hookが存在すると仮定しない
- Existing Interaction / Workstream recordsは`stateEffect`未指定をCurrent-compatibleとして扱い、破壊的rewritingを要求しない
- non-normative Research / Work Report / Project Learning / Release bookkeepingだけの変更まで機械的に新Releaseへ昇格させない
