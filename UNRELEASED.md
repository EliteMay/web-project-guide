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
- Dashboard V2とautomatic Requirements-to-Work-Queue handoffのRequirements
- Guide-scoped development conversation persistenceと専用Regression Guard
- Conversation境界を越えて同じ作業系列を復旧するAutomatic Conversation Resume / Workstream Contract
- AI-generated UI homogenization等のnon-normative Research assets
- Release baseline / Current unreleased stateを検証する`tests/validate-release-integrity.mjs`
- 正式Release状態を自己参照なしで構築できることを検証する`tests/test-release-integrity.mjs`

## Changed

- Human Guideを`site/`配下へ責務別に整理し、既存Root URLはCompatibility Adapterとして維持
- Human Guideのmobile usability、dashboard freshness、isolated worker status、current routing parityを改善
- Work Queue contractを現在のruntime / Claim Gate / public projectionへ同期
- Conversation Persistenceの通常Entryを`web-project-data/tools/conversations/persist-interaction.mjs`へ合わせ、Current Repository再取得境界を明確化
- Conversation PersistenceをGuide-scoped InteractionのCompletion Gateへ接続
- Conversation Handoff / Recovery OwnerをWorkstream候補解決、High / Medium / Low Candidate Resolution、one-time Resume Confirmation Gate、User Override、Write Target分離へ拡張
- Automatic Resume候補をUserが否定した場合、別候補へ即切替せずRoot Cause / Failure Mechanism確認と必要な再発防止を先に行うFlowへ変更
- `docs/10-project-management.md`へRoot-Cause-first Failure / Bug Workflowを追加
- `guide-version.json`へReleased baseline commitとCurrent release stateを追加
- `docs/09-maintenance.md`へReleased baseline / Unreleased current stateの分離Contractを追加
- `Validate Guide`をfull git historyで実行し、Release-affecting変更とUnreleased recordの整合を検証
- `releaseCommit`以後の差分判定からVersion / CHANGELOG / Unreleased / Work Report等のRelease bookkeepingを除外し、Release内容Commitの後にMetadata commitを安全に置けるよう修正

## Fixed

- Persistence Ruleが存在していても通常Interactionの終了経路から適用されず、保存漏れが起こり得たCompletion Routing failure
- Automatic ResumeのHigh Confidence候補をUser確認なしでResume可能としていた誤復帰経路と、User否定後にRoot Cause確認なしで別候補へ進めたFailure path
- `guide-version.json`とCHANGELOGが両方同時に古い場合、Current GuideがRelease baselineより進んでいてもCIが検出できなかったRelease metadata drift
- `releaseCommit`を`guide-version.json`自身へ記録する設計で、Metadata変更自体をRelease-affecting差分として数えると`status: released`へ戻せない自己参照問題

## Compatibility

- 新しい正式Releaseはまだ切らず、Released baselineは`1.22.0 / 2026-09-07`のまま維持
- Product RepositoryのRuntime / Storage / Schema / Deploymentを自動変更しない
- Automatic Resume Capabilityがない通常ChatGPT環境へPlatform-level new-Conversation hookが存在すると仮定しない
- non-normative Research / Work Report / Project Learning / Release bookkeepingだけの変更まで機械的に新Releaseへ昇格させない
