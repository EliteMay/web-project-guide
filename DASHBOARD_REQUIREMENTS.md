# Parallel Work Dashboard V2 要件定義

Status: Draft for requirements review
Target: `EliteMay/web-project-guide`
Scope: Public human-facing parallel work dashboard / repository-specific dashboards

この文書は、Parallel Work Dashboardを「Git内部状態を見るための画面」ではなく、Repository ownerが現在状況と次の行動を短時間で判断するためのHuman-facing control surfaceとして再設計するための要件です。実装詳細やConversation履歴ではなく、今後も守るCurrent Product Contract候補だけを記録します。

## 1. 目的

Dashboardを開いた人が、内部status名やBranch構成を理解していなくても、数秒で次を判断できることを目的とします。

1. どこまで終わっているか
2. 問題があるか
3. 自分の操作が必要か
4. 次に誰・何を動かすべきか
5. 表示している情報が最新か

DashboardはPrivate DataやGitのRaw Stateをそのまま表示するDebug Viewerではありません。内部状態は必要に応じて詳細表示へ退避し、Primary UIは人間向けの意味へ翻訳します。

## 2. Primary User / Usage Context

Primary UserはRepository ownerです。PCだけでなくスマートフォンから状況確認する利用を正式に含めます。

代表的な利用状況:

- A/B/C/D等を複数会話で並列実行した後、どこまで進んだか確認する
- 移動中やPCを触れない時にスマートフォンから状況だけ確認する
- Workerが完了した後、Iを開始してよいか確認する
- 100%なのに次工程へ進めないWorkerの理由を理解する
- Worker状態の取得失敗や古いSnapshotを最新状態と誤認しない
- Repositoryごとの作業状態を混同せず確認する

## 3. Product Principle

### 3.1 Human meaning first

Primary UIでは内部用語より人間が判断に使う意味を優先します。

例:

- `ready_for_apply` をそのまま見せるのではなく「作業完了・反映待ち」
- `blocked` を一律「停止中」にしない
- `currentTask` の英語Raw TextをPrimary説明にしない

内部status / Branch / Run metadataは削除せず、詳細表示で確認可能にします。

### 3.2 Progress と State と Handoff Readiness を分離する

1つのstatus Badgeへ複数の意味を押し込みません。最低限、次の3軸を別々に扱います。

- Work Progress: 担当作業が何件完了したか
- Operational State: 現在作業中・待機・一時停止・要対応など、今どういう状態か
- Handoff Readiness: 次工程、特にIntegration Worker Iへ渡せるか

`26 / 26 = 100%` は「担当作業数が100%」という意味であり、「問題なし」「Run完了」「Iへ渡せる」を意味しません。UIでも必ず「担当作業」等のLabelを付けて誤解を防ぎます。

## 4. Status Model

### 4.1 Raw statusを1対1で表示しない

Human-facing statusはRaw statusだけで決めず、少なくとも以下を合わせて評価します。

- raw status
- completed / total
- readyForApply
- blocker / pause reason category
- integration state
- freshness / fetch result

### 4.2 Human-facing status候補

| Human Status | 意味 | 基本Tone |
|---|---|---|
| 未開始 | まだ担当作業を始めていない | Neutral |
| 開始準備済み | claim等は済み、実作業開始前 | Blue |
| 作業中 | 担当作業を進行中 | Blue |
| 作業完了・反映待ち | 担当作業完了かつIへ渡せる | Green |
| 待機中 | 問題ではなく他工程待ち | Yellow / Neutral |
| 一時停止 | 意図的にRunまたはWorkerを止めている | Yellow |
| 完了・一時停止 | 担当作業とhandoff準備は完了しているがRunが意図的に停止中 | Green + pause context |
| 要対応 | 担当作業数は完了していてもBlockerにより次工程へ進めない | Red / Attention |
| 復旧確認が必要 | State drift等により安全な継続前にRecoveryが必要 | Red |
| 反映中 | Iが正式統合中 | Blue |
| 反映済み | Apply済み、最終検証待ち | Green / Blue |
| 完了 | 最終検証まで終了 | Green |
| 状態取得失敗 | Live statusを取得できない | Red / Warning |

色だけで意味を伝えず、必ずText Labelと説明を併用します。

### 4.3 Run-level と Worker-level を混同しない

UserがRun全体を一時停止した場合、Run-levelの「一時停止」はPage上部に1回明示します。

Workerが担当作業を完了している場合、そのWorker Cardを一律赤い「停止中」に上書きしません。

例:

- D: 27/27、readyForApply=true、Runがuser pause → 「作業完了・反映可能」+「Run一時停止中」
- C: 26/26、readyForApply=false、blockerあり → 「要対応」

この2つは同じ`blocked`系Raw Stateであっても、Human-facing表示を分けます。

## 5. Information Architecture

DashboardのPrimary information orderは次とします。

### 5.1 Project Identity

Run IDより先にProject / Repository identityを認識できること。

表示候補:

- Project name
- Repository name
- Current active Run ID
- Run-level state
- latest fetch / freshness state

Repository固有Dashboardでは別RepositoryのRun / Worker statusを混在させません。

### 5.2 Next Action

First Viewで最も重要な情報として「次にやること」を表示します。

最低限:

- 次のActionを1文で表示
- 誰のActionかを表示: `あなた` / `Worker` / `Integration Worker` / `待つだけ`
- User操作が必要な場合だけPrimary Buttonを出す
- User操作不要なら「操作不要」「待機中」と明示

例:

- 「Cの問題を解消する必要があります」
- 「A/B/C/Dの準備が完了しました。Iを開始できます」
- 「Iが統合中です。現在あなたの操作は不要です」
- 「Runは完了しています」

### 5.3 Overall Summary

数字だけを並べず、結論とセットで表示します。

最低表示候補:

- 担当作業: `105 / 105`
- 反映準備: `3 / 4 Worker`
- 要対応: `1件`
- 作業中: `0件`
- Run state

`105 / 105`だけで全Run完了と誤解させません。

### 5.4 Worker Overview

各Worker CardのPrimary情報は以下に絞ります。

- Worker ID / short title
- Human-facing status
- 担当作業 `completed / total`
- handoff readiness
- 人間向けSummary
- 次のAction

Branch名、Raw status、更新元、technical blocker detail、start promptはSecondary / Detailsへ移動します。

### 5.5 Integration Worker

IはPreparation Workerと役割が違うため別Sectionにします。

Preparation Workerが全員readyになるまで、Iの開始可否を明示します。Dashboard表示だけをCanonical EvidenceとしてIを開始・適用してはいけません。IはPrivate Dataの正式state/outputを再確認します。

### 5.6 Technical Details

必要な人だけ開けるProgressive Disclosureとします。

詳細候補:

- raw status
- worker branch
- public status branch
- exact updatedAt
- validation / evidenceへの安全な参照
- start prompt

Primary UIに常時出しません。

## 6. Worker Card Action Rules

ActionはWorker stateに応じて変えます。

| 状態 | Primary Action |
|---|---|
| 未開始 | 「Aを開始」または「開始文をコピー」 |
| 作業中 | 原則Primary Actionなし。必要なら詳細から開始文確認 |
| 作業完了・反映待ち | Start buttonをPrimaryから削除。I待ちを表示 |
| 要対応 | 「問題の詳細を見る」 |
| 一時停止・未完了 | 「再開条件を見る」 |
| 完了 | Primary Actionなし |

完了済みWorkerに「新しい会話へ貼る開始文」を常時大きく表示しません。

## 7. Human-facing Copy Contract

Primary copyは日本語のPlain Languageを基本とします。

### 7.1 Summary

1〜2文で以下を説明します。

- 何が終わっているか
- 問題があるか
- 次工程へ進めるか

悪い例:

`Preparation complete; awaiting Coordinator/Integration Worker apply`

良い例:

`担当作業はすべて完了しています。Iによる正式反映を待っています。`

### 7.2 Blocker

Raw error / SHA /内部File PathをPrimary文章へそのまま出しません。

Primary:

`元データの確認が必要なため、Iへはまだ渡せません。`

Details:

必要なtechnical reasonを表示。

### 7.3 Next Action

曖昧な「停止中」で終わらせず、可能な限り次の行動まで書きます。

- 誰が
- 何を
- なぜ

を短く示します。

## 8. Freshness / Fallback Contract

今回発生した「GitHubでは更新済みだが、Dashboardが古いSnapshotを正常表示していた」問題を再発させません。

### 8.1 Freshnessは状態の一部

Dashboardは最低限以下を区別します。

- Live / current public statusの取得成功
- fallback snapshot表示
- status取得失敗
- base dashboard data取得失敗

### 8.2 Silent fallback禁止

Live status取得に失敗してSnapshotへfallbackした場合、通常表示と同じ見た目で黙って表示しません。

例:

`Aの最新状態を取得できません。15:18時点の保存済み情報を表示しています。`

### 8.3 Update Time と Fetch Timeを分ける

- Worker Update Time: Workerが最後に状態を書いた時刻
- Dashboard Fetch Time: Browserがstatus取得に成功した時刻

更新時刻が古いだけで自動的にstaleとは判定しません。Event-driven statusでは「変化していないため時刻が古い」場合があるためです。

### 8.4 Cache耐性

Branch名のRaw URLだけを無条件にCurrent Sourceとみなさない設計を検討します。少なくともCurrent commit/refの確認、cache-busting、または同等のFreshness Oracleを用意し、古いRaw cacheを最新状態として扱わないことをCompletion条件とします。

## 9. Repository Separation

各Project Repositoryに専用Dashboard entryを持ちます。

Requirements:

- `game` / `lyrictube`等、Repository間でactive RunやWorker statusを混ぜない
- RepositoryごとにCurrent active Runを識別できる
- 同じWorker ID `A` が別Repositoryに存在しても衝突しない
- Worker write targetはRepository + Run + Workerで一意に分離する
- 同一Run内でもA/B/C/D/Iが同じstatus file/refへ同時writeしない

UI Engine / CSS / Componentは共通化可能ですが、Repository stateは分離します。

## 10. Dynamic Worker Count

UIをA/B/C/D/I固定レイアウトへ強く依存させません。

Current RunがA/B/C/D/Iでも、将来Preparation Worker数が増減してもWorker collectionから描画できる構造を目標とします。

Roleにより最低限以下を区別します。

- preparation
- integration

必要になるまで不要なRole taxonomyは増やしません。

## 11. Privacy / Public Data Boundary

Public DashboardはPrivate `web-project-data`を直接Browser fetchしません。

Public statusへ出してよい情報は明示allowlist方式とし、少なくとも以下は公開しません。

- holderId
- acceptedTaskBlobSha
- Private TASK全文
- change-set全文
- validation内部Evidence
- proposed成果物本文
- secret / credential / token
- private-only repository content
- conversation history

Human-facing summary / next actionを追加する場合も、Public-safeにsanitizeされた専用Fieldとして生成し、Raw private reasonの自動コピーを禁止します。

## 12. Data Contract Candidate

V2 Public Worker Statusは、既存Fieldに加えてHuman-facing Fieldを持てる設計を推奨します。

候補:

```json
{
  "worker": "C",
  "status": "blocked",
  "completed": 26,
  "total": 26,
  "readyForApply": false,
  "humanStatus": "needs_attention",
  "humanSummary": "担当作業は完了していますが、元データの確認が必要です。",
  "nextAction": "問題を解消してからIへ渡します。",
  "actionOwner": "integration",
  "issueSummary": "元データの確認が必要です。",
  "updatedAt": "..."
}
```

Field名は実装前にSchemaとの整合を確認して確定します。Private DataのRaw reasonをPublic Fieldへ自動複製しません。

## 13. Responsive / Accessibility

Desktopだけを完成条件にしません。

Mobile Requirements:

- 1 columnでもPrimary情報の順序が崩れない
- Project / Next Action / IssueがFirst View付近で理解できる
- Branch / Prompt等のSecondary情報で縦長になりすぎない
- touch targetは主要操作で十分な大きさを確保
- 横スクロール前提のPrimary UIを避ける

Accessibility:

- 色だけで状態を伝えない
- ProgressにAccessible Name / Valueを持たせる
- Dynamic refreshで不必要な読み上げ連発を避ける
- Error / stale / successをTextでも明示
- KeyboardでDetails / copy actionへ到達可能

## 14. Loading / Empty / Error / Success

最低限4状態を設計します。

### Loading

何を取得中かを示し、古いDataを新しいDataとして一瞬表示しないことを優先します。

### Empty / Idle Repository

`このRepositoryでは現在進行中のRunはありません。`

と明示します。0 / 0のWorker Cardを並べません。

### Error / Partial Error

1 Workerのstatus取得失敗でPage全体を壊しません。ただし該当Workerがfallbackであることを明示します。

### Success / Complete

Run完了時はWorker別Cardを読まなくても、Page上部で`このRunは完了しています`と判断できます。

## 15. Main User Flow

```text
Project Dashboardを開く
↓
Project / Runを確認
↓
Next Actionを見る
↓
全体状況を見る
↓
必要なWorkerだけ確認
↓
必要な場合だけDetailsを開く
↓
開始 / 問題対応 / I開始
↓
Status更新を確認
```

BranchやRaw statusを先に読ませるFlowにしません。

## 16. Completion Contract

Dashboard V2は、少なくとも以下を満たすまで完成扱いにしません。

### 16.1 5-second comprehension test

初見のRepository ownerがFirst View〜短いスクロールだけで、約5秒を目安に以下へ答えられること。

- 誰が終わっているか
- 誰に問題があるか
- Iを始めてよいか
- 次に自分が何をするか
- 表示情報がCurrentかfallbackか

厳密な計測秒数をCIで固定するのではなく、Human Reviewの判断基準として使用します。

### 16.2 Conflicting-looking state test

以下のCaseを説明なしで区別できること。

- 100% + ready → 作業完了・反映待ち
- 100% + blocker + not ready → 要対応
- 100% + ready + Run paused → 完了・一時停止
- incomplete + paused → 一時停止
- live fetch failed + snapshot → 保存済み情報表示

特に`100%なのに赤い停止中`だけを表示して意味説明が必要になる状態を不合格とします。

### 16.3 Action correctness

- 完了WorkerへStartをPrimary Actionとして出さない
- Iを開始できない時に開始可能と誤表示しない
- User操作不要なのに操作を要求しない
- Blocker時は「何が問題か」だけでなく「次にどうするか」を表示する

### 16.4 Freshness correctness

- live fetch成功 / fallback / failureを区別
- fallbackをCurrentと誤表示しない
- update timeとfetch resultを確認可能
- cacheにより古いRaw stateが正常な最新statusとして残り続けないことを実Browserで検証

### 16.5 Repository isolation

複数Repository / 同名Worker / 同時更新でstatusが混線しないこと。

### 16.6 Responsive / browser verification

DesktopとMobile幅で実Browser確認し、Primary Action、Status、Issue、Progressがclipping / overflow /順序崩れなく利用できること。

## 17. Non-goals

V2のPrimary Scopeには以下を含めません。

- DashboardをPrivate DataのSource of Truthにする
- DashboardからCanonical Worker stateを直接編集する
- Dashboard表示だけを根拠にIが正式適用する
- Private Repository内容をBrowserへ公開する
- 全Git history / Evidence Viewer化
- Notification systemの全面実装
- Run history analyticsの大規模機能
- 見た目のためだけの複雑なanimation / decoration

## 18. Wireframe Requirement

Visual styling前の構造候補は以下を基準とします。

```text
┌──────────────────────────────────────────┐
│ ← Project Dashboards                    │
│ Scrap Factory                           │
│ EliteMay/game · RUN-XXXX                │
│ Run: 一時停止中     状態取得: 最新      │
├──────────────────────────────────────────┤
│ 次にやること                            │
│ Cの問題を解消する必要があります         │
│ 担当: Integration Worker                │
│                         [問題を見る]     │
├──────────────────────────────────────────┤
│ 担当作業 105/105  反映準備 3/4          │
│ 要対応 1          作業中 0              │
├──────────────────────────────────────────┤
│ A  作業完了・反映待ち                   │
│ 担当作業 26/26 █████████ 100%           │
│ Iへ渡せます。次: 正式反映待ち           │
│                              [詳細]      │
├──────────────────────────────────────────┤
│ C  要対応                               │
│ 担当作業 26/26 █████████ 100%           │
│ 作業数は完了。問題のためIへ渡せません。 │
│ 次: 元データを確認                      │
│                         [問題の詳細]     │
├──────────────────────────────────────────┤
│ D  作業完了                             │
│ 担当作業 27/27 █████████ 100%           │
│ Iへ渡せます。Run全体は一時停止中。       │
│                              [詳細]      │
├──────────────────────────────────────────┤
│ Integration Worker I                    │
│ 現在: Cの解消待ち                       │
└──────────────────────────────────────────┘
```

これはVisual Designの完成形ではありません。情報順序と責務のWireframeです。Visual DirectionはこのStructureが確定した後に別途Research / Reviewします。

## 19. Implementation Gate

このRequirementsを実装へ移す前に以下を行います。

- Current `work-dashboard.html` / repository-specific dashboard engine / public status contractを再確認
- Current Data側self-publish contractとの互換を確認
- V2 Public Status Schema変更の影響を整理
- Raw cache / fallback問題のRoot Causeを実Browserで再現・検証
- Meaningful Visual Changeとして必要なVisual Researchを行う
- Wireframeを崩さずVisual hierarchyを設計
- Static Validation + Browser Test + Mobile ReviewをCompletionへ含める

Requirementsが確定するまでは既存UIを場当たり的にCSS修正して完成扱いにしません。
