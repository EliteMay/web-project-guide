# Parallel Work Dashboard V2 要件定義

Status: Requirements complete / implementation not started
Target: `EliteMay/web-project-guide`
Scope: Public human-facing parallel-work dashboard / repository-specific dashboards
Research evidence: `references/parallel-dashboard-v2-domain-research.md`

この文書は、Parallel Work Dashboardを「Git内部状態を見る画面」ではなく、Repository ownerが現在状況と次の行動を短時間で判断するためのHuman-facing control surfaceとして再設計するためのCurrent Requirementsです。

## 1. Product Goal

Dashboardを開いた人が、内部status名やBranch構成を理解していなくても、数秒で次を判断できること。

1. どこまで終わっているか
2. 問題があるか
3. 自分の操作が必要か
4. 次に誰・何を動かすべきか
5. 表示している情報がCurrentかfallbackか

DashboardはPrivate DataやGitのRaw Stateをそのまま見せるDebug Viewerではありません。Raw情報は必要時にDetailsから確認できるようにし、Primary UIは人間向けの意味へ翻訳します。

## 2. Primary User / Context

Primary UserはRepository ownerです。Desktopだけでなく、スマートフォンから短時間で状況確認する利用を正式に含めます。

主な利用:

- 複数Workerを別会話で並列実行した後の進捗確認
- PCを触れない時のMobile確認
- Worker完了後にIntegration Worker Iを開始してよいか確認
- 100%なのに次工程へ進めない理由の確認
- stale / fallback表示をCurrentと誤認しない確認
- RepositoryごとのRunを混同しない確認

## 3. Core Information Model

### 3.1 Progress / Operational State / Handoffを分離する

最低限、以下を別の意味として扱います。

- **Work Progress** — 担当作業が何件終わったか
- **Operational State** — 未開始 / 作業中 / 待機 / 一時停止 / 要対応 / 復旧確認など
- **Handoff State** — 次工程へ渡せるか
- **Freshness State** — Current sourceを取得できているか、fallbackか

`26 / 26 = 100%` は「担当作業数が100%」という意味だけです。

100%であってもBlockerが残る場合があります。逆にRun全体が一時停止でも、Worker成果物自体は完成・handoff可能な場合があります。

UIでは単なる`100%`ではなく、`担当作業 26 / 26`のように意味をLabelします。

### 3.2 Run-levelとWorker-levelを分離する

Run全体の状態を各Workerへ上書きしません。

例:

- D: 27/27、handoff ready、Runがuser pause → Workerは「作業完了・反映可能」、Page上部で「Run一時停止中」
- C: 26/26、handoff not ready、blockerあり → Workerは「要対応」

両者を同じ赤い「停止中」にしません。

### 3.3 Integration Gateをready countと分離する

`Iへ渡せるWorker数`と`Iを開始してよいか`は別情報です。

I開始可否はDashboard独自の推測で決めず、Current Run ContractのTriggerに従います。

Current parallel-run modelでは、Preparation Workerが`ready_for_apply`、またはRun Contract上の`blocked / rejected / superseded`等として明示的にresolvedであることをIntegration Gateで評価できる必要があります。

最低限のRun-level field候補:

- `integrationGate`: `waiting / ready / integrating / blocked / complete`
- `integrationGateSummary`

`3 / 4 ready`でもIntegration Gateがreadyの場合があり、`4 / 4 progress complete`でもGateがblockedの場合があります。

## 4. Human-facing Status

Raw statusを1対1でBadge表示しません。

Human-facing statusは、progress / operational state / handoff / issue / run contextを合わせて決めます。

| Human-facing status | 意味 | 基本Tone |
|---|---|---|
| 未開始 | 担当作業開始前 | Neutral |
| 開始準備済み | claim等は済み、実作業開始前 | Blue |
| 作業中 | 担当作業進行中 | Blue |
| 作業完了・反映待ち | 担当作業完了、handoff ready | Green |
| 待機中 | 問題ではなく他工程待ち | Neutral / Yellow |
| 一時停止 | 未完了の作業を意図的に停止 | Yellow |
| 作業完了・Run一時停止 | Workerは完了済みだがRun全体を停止 | Green + pause context |
| 要対応 | 作業数は完了していてもBlocker等でhandoff不可 | Red |
| 復旧確認が必要 | drift / stale checkpoint等で安全な継続前にRecoveryが必要 | Red |
| 反映中 | Iが正式統合中 | Blue |
| 反映済み | Apply済み、最終検証待ち | Green / Blue |
| 完了 | 最終検証まで終了 | Green |
| 状態取得失敗 | Current public statusを取得できない | Red / Warning |

色だけで意味を伝えず、必ずTextと組み合わせます。

## 5. Page Information Architecture

Primary information orderは次とします。

### 5.1 Project Identity

Run IDより先にProject / Repository identityを認識できること。

表示候補:

- Project name
- Repository name
- active Run ID
- Run-level state
- Current / fallback state

### 5.2 Next Action

First Viewで最重要のSurfaceとして「次にやること」を出します。

最低限:

- 次Actionを1文で表示
- Action ownerを表示: `あなた / Worker / Integration Worker / 操作不要`
- User操作が必要な場合だけPrimary Buttonを表示
- User操作不要なら「現在あなたの操作は不要です」と明示

例:

- `Cの問題を確認する必要があります。`
- `Integration Gateを満たしました。Iを開始できます。`
- `Iが統合中です。現在あなたの操作は不要です。`
- `このRunは完了しています。`

### 5.3 Overall Summary

数字だけでなく意味を併記します。

最低表示候補:

- 担当作業: `105 / 105`
- handoff ready: `3 / 4 Worker`
- Integration Gate: `開始可能 / 待機 / 要対応`
- 要対応: `1件`
- 作業中: `0件`

`105 / 105`だけでRun完了と誤認させません。

### 5.4 Worker Overview

WorkerのPrimary情報:

- Worker ID / short title
- Human-facing status
- `担当作業 completed / total`
- handoff state
- 人間向けSummary
- 必要な場合だけNext Action

Secondaryへ退避:

- Raw status
- Worker Branch
- Public Status Branch
- exact timestamp
- validation / technical reason
- Start Prompt

### 5.5 Integration Worker

IはPreparation Workerと責務が違うため別Sectionにします。

I Cardには少なくとも以下を表示できること。

- Integration Gate
- Iの状態
- I開始可否
- I開始後の進行状態
- 完了 / verification状態

Dashboard表示だけをCanonical EvidenceとしてApplyしません。IはPrivate Dataの正式state/output/validationを再確認します。

### 5.6 Technical Details

Raw Git informationはProgressive Disclosureにします。

普段の状況確認でBranch名や長いPromptを読まなくてもよい構造にします。

## 6. Action Rules

| 状態 | Primary Action |
|---|---|
| 未開始 | `Aを開始` / `開始文をコピー` |
| 作業中 | 原則Primary Actionなし |
| 作業完了・反映待ち | Start actionをPrimaryから消す |
| 要対応 | `問題の詳細を見る` |
| 一時停止・未完了 | `再開条件を見る` |
| Integration Gate ready | Page上部で`Iを開始` |
| I統合中 | `操作不要` |
| 完了 | Primary Actionなし |

完了済みWorkerに「新しい会話へ貼る開始文」を常時大きく残しません。

## 7. Human Copy Contract

Primary UIは日本語Plain Languageを基本とします。

### 7.1 Summary

1〜2文で次を説明します。

- 何が終わっているか
- 問題があるか
- 次工程へ進めるか

悪い例:

`Preparation complete; awaiting Coordinator/Integration Worker apply`

良い例:

`担当作業はすべて完了しています。Iによる正式反映を待っています。`

### 7.2 Controlled Vocabulary

Workerごとの自由文だけでPrimary statusを作りません。

Human Status labelはcontrolled enumからRendererが統一して日本語表示します。

自由文はSpecific contextが必要な以下へ限定候補とします。

- `issueSummary`
- `nextActionDetail`

### 7.3 Blocker Copy

Raw error / SHA / private pathをPrimary文章へそのまま出しません。

Primary:

`元データの確認が必要なため、次工程へはまだ進めません。`

Technical Details:

必要なRaw reasonをPrivate/public boundaryの範囲で表示します。

## 8. Run-level Public Control

Page上部のRun状態やNext ActionはA/B/C/D個別JSONの多数決で決めません。

Repository単位のPublic Controlに最低限以下を持てる構造とします。

- repository
- projectName
- activeRunId
- runState
- integrationGate
- overallSummary
- nextAction
- actionOwner
- updatedAt

A/B/C/Dは自分のWorker statusだけをself-publishし、Run-level controlを書き換えるAuthorityを持たせません。

## 9. Worker Public Status V2

V2のSemantic model候補:

```json
{
  "schemaVersion": 2,
  "runId": "RUN-...",
  "worker": "A",
  "role": "preparation",
  "assignmentRevision": 1,
  "progress": {"completed": 26, "total": 26},
  "workState": "complete",
  "handoffState": "ready",
  "issueState": "none",
  "issueSummary": null,
  "nextActionDetail": "Iによる正式反映を待っています。",
  "updatedAt": "..."
}
```

Field名はSchema実装時にCurrent Data contractと突合して確定します。

### 9.1 Assignment Revision

Worker public statusはCurrent assignment scopeと照合可能であること。

Worker revisionとRun Control revisionが不一致の場合、旧`26 / 26 = 100%`をCurrent completionとして表示せず`要再確認`扱いにします。

### 9.2 Backward Compatibility

Existing schema v1を一斉破壊しません。

- V2 rendererは移行期間中v1 adapterを持てる
- Current Runを壊さない
- New RunからV2をDefault候補にする

## 10. Freshness / Fallback Contract

### 10.1 Silent fallback禁止

Live/current public statusを取得できずSnapshotへfallbackする場合、通常表示と同じ見た目で隠しません。

例:

`Aの最新状態を取得できません。15:18時点の保存済み情報を表示しています。`

### 10.2 UpdateとFetchを分離

- Worker Update Time: Workerがstatusを書いた時刻
- Dashboard Fetch State/Time: BrowserがCurrent sourceを取得できたか

更新時刻が古いだけでstaleとは判定しません。Event-driven statusは変化がなければ時刻が古いまま正常だからです。

### 10.3 Root Causeを要件で固定しない

今回の古い表示原因を「Raw cache」と決め打ちしません。

実装前にBrowser Network / fetch result / fallback pathを再現し、CORS / cache / fetch failure / branch resolution等を確認します。

Completion Conditionは原因名ではなく、**古い情報をCurrentとしてsilent表示しないこと**です。

### 10.4 Refresh Cadence

15秒はCurrent implementation valueであり恒久Requirementにしません。

User-facing requirementは、Worker state変更が実用上短い時間で表示へ反映されることです。

実装時にはvisibility state / rate limit / worker countを考慮し、必要ならManual RefreshをRecovery pathとして持ちます。

## 11. Repository / Run Isolation

- Repositoryごとに専用Dashboard entryを持つ
- 別RepositoryのRun / Worker stateを混在させない
- Repositoryごとに`activeRunId`を明示する
- activeRunId=nullならIdle
- 一番新しいRunを日時だけで勝手にactiveと推測しない
- active Runが曖昧ならConfiguration Errorとして表示する
- 同名Worker `A`が複数Repositoryに存在しても衝突しない
- Worker write targetはRepository + Run + Workerで一意に分離する
- 同一RunのA/B/C/D/Iが同一status file/refへ同時writeしない

Run history UIはV2 Primary Scope外とします。

## 12. Dynamic Worker Count

UIをA/B/C/D/I固定Gridへ依存させません。

Current RunがA/B/C/D/Iでも、Worker collectionから描画できる構造を採用します。

最低限Role:

- preparation
- integration

必要になるまで不要なRole taxonomyは増やしません。

## 13. Privacy / Public Boundary

Public DashboardはPrivate `web-project-data`をBrowserから直接取得しません。

Allowlist outsideのPrivate情報を公開しません。

公開禁止例:

- holderId
- acceptedTaskBlobSha
- Private TASK本文
- change-set / validation / proposed成果物本文
- internal evidence
- conversation data
- secret / token / credential
- private-only path / content

`issueSummary` / `nextActionDetail`等を追加する場合もPublic-safe専用Fieldとし、Raw private reasonの自動コピーを禁止します。

## 14. Visual Direction

Research結果からV2のPrimary Directionは**Operations Console**とします。

Characteristics:

- Medium density
- Project identity + Next Actionを上位
- Workerはcompact row/panel中心
- Issue Workerだけ必要情報を展開
- Integration Workerは別Section
- Technical detailはDisclosure
- Border / spacing / typographyでHierarchyを作る
- Semantic color以外の装飾を増やしすぎない
- Large hero / glow / glass / decorative chartをPrimaryにしない

Current dark shellやProgress自体は再利用可能ですが、現在のCard Gridの情報重複はそのまま維持しません。

## 15. Responsive / Accessibility

### Mobile priority

1. Project identity
2. Run state / freshness
3. Next Action
4. Issue / Integration Gate
5. Worker overview
6. Technical Details

Requirements:

- Primary UIは1 columnで成立
- 長いPrompt / BranchでPageを縦長化しない
- Primary Actionが画面下部へ埋もれない
- 主要tap targetは十分な大きさ
- 横スクロール前提にしない

Accessibility:

- 色だけで状態を伝えない
- ProgressにAccessible Name / Value
- Dynamic refreshで不必要な読み上げを連発しない
- Error / fallback / successをTextでも伝える
- KeyboardでDetails / copy actionへ到達可能

## 16. Loading / Idle / Error / Complete

### Loading

何を取得中かを表示し、旧Snapshotを一瞬Currentとして見せないことを優先します。

### Idle Repository

`このRepositoryでは現在進行中のRunはありません。`

0/0 Workerを並べません。

### Partial Error

1 Workerの取得失敗でPage全体を壊しません。ただし該当Workerがfallbackであることを明示します。

### Complete

Run完了時はWorker Cardを全部読まなくても、Page上部で`このRunは完了しています`と判断できます。

## 17. Main User Flow

```text
Repository Dashboardを開く
↓
Project / Run / freshnessを確認
↓
Next Actionを見る
↓
Integration Gate / issueを見る
↓
必要なWorkerだけ確認
↓
必要な場合だけDetailsを開く
↓
開始 / 問題対応 / I開始
↓
Status更新を確認
```

BranchやRaw statusを最初に解釈させません。

## 18. Wireframe Contract

```text
┌──────────────────────────────────────────┐
│ ← Project Dashboards                    │
│ Scrap Factory                           │
│ EliteMay/game · RUN-XXXX                │
│ Run: 一時停止中     取得状態: 最新      │
├──────────────────────────────────────────┤
│ 次にやること                            │
│ Cの問題を確認する必要があります         │
│ 担当: Integration Worker                │
│                         [問題を見る]     │
├──────────────────────────────────────────┤
│ 担当作業 105/105   Handoff Ready 3/4    │
│ I開始条件: 満たしている / 待機 / 要対応 │
├──────────────────────────────────────────┤
│ A  作業完了・反映待ち                   │
│ 担当作業 26/26 █████████ 100%           │
│ Iへ渡せます。次: 正式反映待ち           │
│                              [詳細]      │
├──────────────────────────────────────────┤
│ C  要対応                               │
│ 担当作業 26/26 █████████ 100%           │
│ 作業数は完了。問題のためhandoff不可。    │
│ 次: 問題を確認                          │
│                         [問題の詳細]     │
├──────────────────────────────────────────┤
│ D  作業完了                             │
│ 担当作業 27/27 █████████ 100%           │
│ Handoff可能。Run全体は一時停止中。       │
│                              [詳細]      │
├──────────────────────────────────────────┤
│ Integration Worker I                    │
│ Gate: ready / waiting / blocked         │
└──────────────────────────────────────────┘
```

これはVisual完成形ではなくInformation OrderのContractです。

## 19. Completion Contract

### 19.1 5-second comprehension

初見のRepository ownerがFirst View〜短いスクロールで、約5秒を目安に以下へ答えられること。

- 誰が終わっているか
- 誰に問題があるか
- Iを始めてよいか
- 次に自分が何をするか
- Current表示かfallbackか

厳密な秒数をCIで固定せずHuman Review基準とします。

### 19.2 Conflicting-looking state

説明なしで以下を区別できること。

- 100% + handoff ready → 作業完了・反映待ち
- 100% + blocker + handoff not ready → 要対応
- 100% + handoff ready + Run paused → 作業完了・Run一時停止
- incomplete + paused → 一時停止
- live fetch failed + fallback → 保存済み情報表示

`100%なのに赤い停止中`だけを表示して追加説明が必要になる状態は不合格です。

### 19.3 Integration Gate correctness

- ready countだけでI開始可否を決めない
- Current Run Triggerと一致する
- Gate blocked時にI開始可能と表示しない
- resolved blocked/rejected/superseded等をRun Contractに従って扱える

### 19.4 Action correctness

- 完了WorkerへStartをPrimary表示しない
- User操作不要なのに操作を要求しない
- Blockerはreasonだけでなく次Actionも示す
- Next Action ownerが分かる

### 19.5 Freshness correctness

- Current / fallback / failureを区別
- fallbackをCurrentと誤表示しない
- update timeとfetch stateを確認できる
- 古いstateがsilentに残り続けないことを実Browserで確認

### 19.6 Repository isolation

複数Repository / 同名Worker / 同時更新で状態が混線しない。

### 19.7 Responsive / browser verification

Desktop + Mobile幅の実Browserで、Primary status / Next Action / Integration Gate / Progressにclipping・overflow・順序崩れがないこと。

## 20. Non-goals

- DashboardをCanonical Data Sourceにする
- DashboardからPrivate canonical worker stateを直接編集する
- Dashboard表示だけでIが正式Applyする
- Private Repository内容をBrowserへ露出する
- 全Git history / Evidence Viewer化
- Notification system全面実装
- Run history analytics大規模実装
- 見た目のためだけの複雑なanimation / decoration

## 21. Implementation Gate

実装開始前に以下を確認します。

- Current `work-dashboard.html` / repository-specific dashboard engine / public status contract
- Current Data側self-publish contract
- V2 Public Control / Worker Status Schema互換
- Current Runを壊さないv1 adapter方針
- 古いSnapshot表示問題を実Browserで再現しRoot Cause確認
- Current mainとの差分 / existing learnings

実装後はStatic Validationだけでなく、Desktop / Mobile Browser Test、freshness failure test、100% + blocker / 100% + pause等のState Matrixを実画面で確認します。

Requirements complete ≠ Implementation completeです。この文書確定時点ではUI実装は開始済み扱いにしません。
