# Parallel Work Dashboard V2 — Requirements Review

Status: Requirements critique / gap review

このReviewは`DASHBOARD_REQUIREMENTS.md`の欠点を意図的に探し、実装前に修正すべき点を整理します。

## Finding 1 — `readyForApply count`だけではI開始可否を判断できない

Severity: High

Current Integration Contractでは、Iの開始条件は「A/B/C/Dが全員ready_for_apply」だけではありません。各Workerが`ready_for_apply`、または`blocked / rejected / superseded`として明示的にresolvedであることがTriggerです。

Problem:

- `3 / 4 ready`でも4人目が明示的resolved blockerならI開始可能な場合がある
- `4 / 4 100%`でもvalidation / recovery問題があればI開始不可な場合がある
- Dashboardがready countからI開始可否を勝手に推測すると誤操作につながる

Requirement change:

- `反映準備 3/4`と`Iを開始できるか`を別表示にする
- Run-levelに`integrationGate`を持つ
- I開始可否はCurrent Run Contractに従い、Dashboard独自Ruleで決めない
- `integrationGate`候補: `waiting / ready / integrating / complete / blocked`
- Gate reasonはPublic-safeな短いSummaryを持てる

Example:

```text
反映準備: 3 / 4
I開始条件: 満たしています
理由: Cは解決済みBlockerとしてIへ引き継ぎ済み
```

## Finding 2 — Run-level Next ActionをWorker状態だけから推測すると不安定

Severity: High

Problem:

Worker A-Dは自分の状態しかAuthorityを持ちません。Page上部の「次にやること」はRun全体の判断なので、各Worker JSONの多数決や最新時刻から生成すると誤る可能性があります。

Requirement change:

Run-level Public Controlに以下を持てるようにします。

- runState
- integrationGate
- nextAction
- actionOwner
- overallSummary
- activeRunId

このControlはWorker A-Dのself-publish fileとは別責務にします。

## Finding 3 — Human-facing textを各Workerの自由文だけにすると表現がdriftする

Severity: Medium

Problem:

Aが「完了」、Bが「作業終了」、Cが英語、DがTechnical phrase等、Workerごとに表現が揃わなくなる可能性があります。

Requirement change:

- Human Status labelはenum/controlled vocabularyからDashboard rendererが日本語化する
- Worker自由文は`issueSummary`や`nextActionDetail`等、specific contextが必要な箇所だけ
- Primary phrase templateは中央管理する
- Raw `currentTask`をPrimary Summaryとして使用しない

Recommended semantic fields:

- `workState`
- `handoffState`
- `issueState`
- `progress.completed / total`
- `issueSummary` optional
- `nextActionDetail` optional

## Finding 4 — `100%`はScope Revisionが変わると意味が変わる

Severity: Medium

Problem:

26/26完了後にassignmentRevisionが変わり30件へ増えた場合、旧Statusが26/26 100%のまま残ると誤認する。

Requirement change:

- Public worker statusへ`assignmentRevision`または同等のscope identityを含める
- Run ControlとWorker revisionが不一致なら`要再確認`として扱う
- revision mismatch時に100%をCurrent completionとして扱わない

## Finding 5 — Active Runを日時から推測してはいけない

Severity: High

Repositoryごとに複数Run Branchが残るため、「一番新しいRun」をactiveと推測すると古い/別用途Runを表示する可能性があります。

Requirement change:

- Repository Controlが`activeRunId`を明示する
- activeRunId=nullならIdle
- 複数live Runが存在してもControlが一意ならそのRunを表示
- Controlが曖昧なら最新を勝手に選ばず`Run選択状態を確認してください`と表示
- Run history UIはLater scopeでよい

## Finding 6 — Worker self-publish successとCanonical state successは別

Severity: High

Problem:

Public statusが「完了」でもPrivate canonical state/outputが壊れている可能性は理論上残る。

Requirement change:

- DashboardはHuman monitoring surfaceでありCanonical integration oracleではないことを維持
- Iは必ずPrivate Dataのstate/output/validationを再取得する
- Dashboardから直接canonical applyしない
- Public statusに`verifiedForDisplay`のような誤解を招く名前を付けない

## Finding 7 — Freshness問題のRoot Causeを「cache」と断定しない

Severity: Medium

今回の古い表示はRaw cache、CORS、partial fetch failure、fallback条件等の複数原因があり得ます。要件段階でRoot Causeを1つへ固定すると誤修正につながります。

Requirement change:

- 実装前にBrowser Network / fetch resultでRoot Causeを再現する
- Completionは「原因名」ではなく「古い状態をsilent current表示しない」Behaviorで定義
- Live sourceが読めない時は必ずfallback indicatorを出す

## Finding 8 — 15秒Refreshは固定Requirementにしない

Severity: Medium

Problem:

5 Worker × 15秒等の外部fetchは将来Worker数増加、API方式変更、Rate Limit等で不利になる可能性があります。

Requirement change:

- User-facing requirementは「作業完了後、実用上短い時間で反映される」こと
- 15秒はCurrent implementation valueであり恒久Contractにしない
- Browser visible時だけrefresh、hidden時は間隔を延ばす等を実装時に検討
- Manual refreshもRecovery pathとして持つ候補

## Finding 9 — Status色の意味はWorker statusだけでなくLayerで分ける

Severity: Medium

Run pauseがYellow、Worker readyがGreen、Worker issueがRedのように同時に複数Layerの状態が存在します。

Requirement change:

- Page header: Run-level state
- Worker badge: Worker operational/handoff state
- Inline alert: Issue/freshness

1個の赤/黄/緑でPage全体を表現しません。

## Finding 10 — MobileではCard数より情報優先度が問題

Severity: Medium

単純に2列を1列へするだけでは、長いPrompt/Branch/MetadataによりNext Actionが埋もれます。

Requirement change:

Mobile First View priority:

1. Project
2. Run state / freshness
3. Next Action
4. Issue count / integration gate
5. Worker status
6. Technical details

## Revised Architecture Contract Candidate

```text
Repository Control
├─ project / repository
├─ activeRunId
├─ runState
├─ integrationGate
├─ overallSummary
├─ nextAction
└─ actionOwner

Run Worker Status
├─ Worker A public status
├─ Worker B public status
├─ Worker C public status
├─ Worker D public status
└─ Integration Worker public status

Dashboard Renderer
├─ controlled Japanese status labels
├─ progress / state / handoff separation
├─ freshness / fallback detection
└─ progressive technical details
```

## Public Worker Schema V2 Candidate

```json
{
  "schemaVersion": 2,
  "runId": "RUN-...",
  "worker": "A",
  "role": "preparation",
  "assignmentRevision": 1,
  "progress": {
    "completed": 26,
    "total": 26
  },
  "workState": "complete",
  "handoffState": "ready",
  "issueState": "none",
  "issueSummary": null,
  "nextActionDetail": "Iによる正式反映を待っています。",
  "updatedAt": "..."
}
```

Backward compatibility:

- V2 migration中はexisting schema v1をadapterで読み込める
- 全Current Runを一斉破壊Migrationしない
- New RunはV2をDefault候補とする

## Public Repository Control V2 Candidate

```json
{
  "schemaVersion": 2,
  "repository": "EliteMay/game",
  "projectName": "Scrap Factory",
  "activeRunId": "RUN-...",
  "runState": "paused",
  "integrationGate": "ready",
  "overallSummary": "準備作業は完了しています。Runは一時停止中です。",
  "nextAction": "Runを再開してIを開始できます。",
  "actionOwner": "user",
  "updatedAt": "..."
}
```

## Review Conclusion

V2は単なるCard redesignでは不十分です。

必要な変更は主に3層です。

1. Semantic State Modelを整理する
2. Run-level Control / Worker-level Statusの責務を分ける
3. その上でHuman-first UIへ再構成する

Visualだけ先に直すと、`100% + 停止中`のような意味矛盾は再発します。
