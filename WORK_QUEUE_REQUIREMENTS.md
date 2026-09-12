# Work Queue Orchestration 要件定義

Status: Requirements complete / core orchestration implemented / Dashboard V2 tasks generated; task execution not started
Target: `EliteMay/web-project-guide` parallel-work orchestration
Related UI contract: `DASHBOARD_REQUIREMENTS.md`

この文書は、要件定義が正式に完了した後、実装すべき内容をRepository単位の作業Queueへ自動登録し、A/B/C/D等のWorker枠へ安全に割り当てるためのCurrent Product Contractです。

DashboardはQueueとWorker状態を人間向けに表示しますが、QueueそのものをRequirementsの第二Source of Truthにはしません。実装意図の正本はTarget RepositoryのCurrent Requirementsです。

## Current Runtime Status

2026-09-11時点で、以下の共通基盤は実装済みです。

- Requirements revisionに紐づくRepository専用Queue生成 / idempotent sync
- Queue schema / dependency / lane整合Validation
- sanitize済みPublic Queue ProjectionとRepository Dashboard表示
- guarded formal assignment (`queued → assigned`)
- conversation Claim Gate (`assigned → working`)
- verified completion後のHistory確定とsame-lane advance
- Dashboardのassigned Laneに対する開始文handoff

2026-09-13時点のDashboard V2用Current Queue Evidenceでは、Queueは`synced`ですが`activeRunId`は`null`、Worker Laneはidle、先頭Taskはqueuedです。したがってDashboard V2は**実装Task生成済み / task execution未開始**として扱います。

実装済みであっても、Public DashboardはAuthorityではありません。Current AssignmentとClaimのAuthorityは`EliteMay/web-project-data/work-queues/`のCurrent Queueです。

ChatGPTから新しい別会話を自動生成することはこのContractの実装済み機能に含めません。assigned LaneはDashboardの開始文を新しい会話へ渡し、その会話がCurrent Queueを再取得してClaimに成功した後に作業を始めます。

## 1. Product Goal

Repository ownerが毎回「次の実装Taskを作ってQueueへ入れて」と指示しなくても、正式な要件定義完了を起点に次の実装作業へ移れること。

標準Flow:

```text
要件定義
↓
Current Requirementsへ正式保存
↓
Persistence Verification
↓
Requirements Complete / Ready for implementation
↓
実装Taskへ分解
↓
Repository専用Work Queueへ自動登録
↓
依存関係を満たすTaskを空きWorkerへ正式割当
↓
新しいWorker会話がCurrent AssignmentをClaim
↓
Claim後の再取得 / holder一致確認
↓
Worker作業
↓
成果物 / Validation / Completion確定
↓
完了履歴へ保存
↓
次のeligible Taskを同じWorker枠へ割当
```

## 2. Queue投入Trigger

Queueへの自動登録は、単に会話内で「要件が決まった」時点では行いません。

最低条件:

- Target Repositoryが一意
- Current Requirementsへの正式保存が成功
- 保存後の再取得 / Persistence Verificationが成功
- Implementation Handoffが`Ready for implementation`
- 実装を止めるBlocking Decisionがない
- Queueが対象Repositoryに対して有効

この条件を満たした時点を`requirements_ready`イベントとして扱える構造にします。

Requirements保存に失敗した状態、Draftのみの状態、Blocking Decisionが残る状態から実行可能Taskを自動投入しません。

## 3. Requirements Revisionとの紐付け

Queue Itemは、どのRequirementsから生成されたかを追跡できなければなりません。

最低限、次のIdentityを保持できること。

- repository
- source requirements path
- source requirements revision / commit / blob identityのいずれか適切なimmutable reference
- queue generation revision

Dashboard上の文章やConversation履歴をRequirements revisionの代用にしません。

## 4. Task Generation

Requirements全文を1件の巨大TaskとしてそのままQueueへ入れません。実装担当が大きな判断なしで開始・完了判定できる単位へ分解します。

各Queue Itemは最低限以下の意味を持ちます。

- `taskId`
- `repository`
- `sourceRequirementsRevision`
- `title`
- `scope`
- `dependencies`
- `completionCriteria`
- `status`
- `createdAt`

必要に応じて以下を持てます。

- priority
- required owner / role
- affected paths / semantic area
- validation requirement
- integration requirement
- safe parallelism / exclusivity information

Taskは「何を変えるか」だけでなく「何を満たせば終わりか」を持ちます。

## 5. Task分割原則

Taskは次を目標にします。

- 1 Task = 1つの明確なOutcome
- Validation条件が説明可能
- 依存関係が明示可能
- 別Workerと安全に並行できるか判断可能
- 不必要に巨大でも極端に細切れでもない

Requirementsから安全なTask分解ができない場合、内容を推測して実行可能Taskを量産しません。`needs_planning` / `needs_review`相当として止め、何が不足しているかを明示します。

## 6. Idempotency / Duplicate防止

同じRequirements revisionに対するQueue生成を再実行しても、同一Taskを重複登録しません。

最低要件:

- same repository + same requirements revision + same logical task identityを重複作成しない
- Retryは新規追加ではなくreconcileとして扱える
- Partial failure後の再実行でもTaskが二重化しない

単純なTimestampだけでTask identityを作らず、再実行可能なStable Identityを使います。

## 7. Requirements変更後のReconcile

Queue生成後にRequirementsが変更された場合、既存Taskを黙って別内容へ書き換えません。

状態別の基本方針:

- `queued`で未開始 → 影響Taskをupdate / supersede可能
- `assigned`だが未claim → Current assignmentとの整合を確認して更新可能
- `working` / `ready_for_apply` → Scopeをsilent rewriteしない。`needs_reconcile`等としてCoordinator判断へ上げる
- `completed` → Historyを保持し、必要なら追加Taskを新規生成

変更されていないTaskまで無条件に作り直しません。

## 8. Repository Isolation

QueueはRepository単位で分離します。

- `game`のTaskを`lyrictube`のWorker Queueへ入れない
- 同じ`taskId`候補が別Repositoryにあっても衝突しない
- RepositoryごとにQueue revision / active Runを識別できる
- Public DashboardへPrivate Queue本文を直接露出しない

Repository間の共通基盤Taskが必要な場合も、どのRepositoryがAuthorityを持つか明示します。

## 9. Dependency / Eligibility

Queue順序は単純FIFOだけで決めません。

TaskがWorkerへ割当可能になる条件として最低限確認します。

- dependenciesが完了またはRun Contract上resolved
- Blocking Decisionがない
- 同時作業で危険なsemantic overlapがない
- 必要なRepository / Branch / Source of Truthへ到達可能
- Worker roleがTaskに適合

独立Taskは安全な範囲で並行実行できます。

## 10. Worker Lane Contract

A/B/C/D等は**固定の仕事名ではなく、再利用可能なWorker枠**として扱います。

Worker枠とTaskを分離します。

```text
A = Worker Lane
Task 1 = 今回Aへ割り当てられた仕事
Task 2 = Task 1完了後にAへ割り当て可能な次の仕事
```

Workerは自分で次Taskを発明しません。Queue / Coordinatorが正式に割り当てたTaskだけをCurrent Assignmentとして扱います。

## 11. Worker完了後の自動切替

WorkerがCurrent Taskを完了しただけでは、直ちに前Taskの表示を消しません。

切替条件:

1. Taskの成果物が保存済み
2. 必要Validationが保存済み
3. Completion / Handoff stateが正式に確定
4. Queue Itemをcompleted / resolvedとしてHistoryへ残す
5. 次のeligible Taskが正式に割り当てられる

その後、同じWorker Laneを次Taskへ切り替えます。

例:

```text
A: Dashboard V2 Schema実装  12/12 完了
↓ History確定
A: Dashboard Renderer実装   0/8 未開始
```

前Taskの`100%`、blocker、start prompt等を次Taskへ引き継ぎません。

次Taskが存在しない場合は、Aを`次の割当待ち`として表示します。

## 12. Queue自動投入とWorker開始を分離する

**Requirements Complete → Queue追加は自動**を標準とします。

ただし、**Queueへ追加された = 即座にWorkerが勝手に実行開始する**とは定義しません。

実行開始はCurrent Run / Worker policyに従います。新しいChatへStart Promptを貼る方式では、Dashboardは割当済みTaskの公開Summaryと開始文を表示します。

### Claim Gate

`assigned`はLaneへの正式割当であり、まだ特定会話の作業開始を保証しません。

新しいWorker会話は次を行います。

1. Current Queueの`control.json` / `lanes/<LANE>.json` / Current Itemを再取得
2. Current Requirements / generation / assignment revisionを確認
3. 会話専用の一意なprivate `holderId`を生成
4. Current Item blob SHAをcompare-and-swap境界としてClaim
5. 保存後にItem / Laneを再取得
6. 自分のholderIdで`working`になったことを確認してから実装開始

別holderが既にClaim済み、SHA/revisionがstale、Requirements不一致の場合はTarget Repositoryを編集せず停止します。他holderのClaimを上書きまたは削除して奪いません。

`claimHolderId` / `claimedAt` / private Task IDはPublic Dashboardへ公開しません。

Dashboardに表示する開始文はPrivate Task本文やTask IDを埋め込まず、Repository + Worker Laneを入口としてCurrent Assignmentを再取得させます。

## 13. Integration Worker Iとの関係

Preparation WorkerのTask QueueとIntegration Worker Iの責務を混同しません。

- A/B/C/D等はQueueから担当Taskを処理
- IはCurrent Run ContractのIntegration Gateに従って正式統合
- Dashboard上のQueue完了数だけでI開始可否を推測しない
- Iが処理すべきTask / Waveがある場合はRun Contract上で明示

Workerが次Taskへ進んでも、前TaskのIntegration Evidenceを失わないことを要求します。

## 14. Dashboard表示

Repository DashboardではQueueについて最低限以下を人間向けに確認できることを目標とします。

- Queue内の未処理Task数
- 現在実行可能なTask数
- WorkerごとのCurrent Assignment
- assigned Workerを開始するための開始文
- 次の割当待ちかどうか
- Queue生成 / 同期が正常か
- Requirements revisionとの不一致があるか

Queue詳細を全部First Viewへ並べず、Primary UIでは「今の仕事」と「次に何が起きるか」を優先します。

開始文は`assigned`なLaneだけに表示し、`working`へClaim済みなら開始Actionを消します。

## 15. Queue Sync Failure

Requirements保存成功後にQueue生成だけ失敗した場合、Requirementsを未保存へ巻き戻しません。

代わりにQueue同期状態を明示します。

例:

- `queueSyncState: pending`
- `queueSyncState: synced`
- `queueSyncState: failed`
- `queueSyncState: needs_reconcile`

失敗時:

- Dashboardでsilentに`Queue 0件`と正常表示しない
- Retry可能な状態を保持
- Retryでduplicateを作らない
- Userが必要な場合だけ具体的なRecovery Actionを表示

## 16. QueueをRequirementsの第二Source of Truthにしない

Queue Itemは実行計画です。

QueueへRequirements全文を複製し、Queue側だけ更新して正式Requirementsと意味がずれる状態を作りません。

Conflict時はCurrent Requirements / Current Run Contract /正式Assignmentを確認し、Queueを独断で優先しません。

## 17. Privacy / Public Boundary

Public Dashboardに出すQueue情報はsanitize済みの最小項目だけとします。

公開候補:

- Task titleのPublic-safe summary
- queue count
- current assignment summary
- human-facing status
- next action
- Repository + Laneから構築できる汎用Start Prompt

公開禁止候補:

- Private Requirements本文 / immutable revision
- Private TASK全文 / Task ID
- internal evidence / completion criteria / validation detail
- secret / credential / token
- private repository content
- claim holder identity / claimedAt等の内部coordination情報

## 18. Completion Contract

実装完了判定では最低限以下を確認します。

- Requirementsを正式保存するとQueueへTaskが自動生成される
- 同じRequirements revisionで処理を再実行してもTaskが重複しない
- Requirements DraftやBlocking Decision状態から実行Taskを投入しない
- Taskがsource Requirements revisionを追跡できる
- dependencies未完了TaskをWorkerへ誤割当しない
- formal assignmentとconversation Claimを分離する
- 同一Assignmentを別holderが二重Claimできない
- stale generation / assignment revisionからClaimを開始しない
- Claim前のWorkerがTarget Repositoryを編集しない
- A/B/C/Dの完了後、History確定前に次Taskへ上書きしない
- History確定後、次のeligible Taskがある場合は同じWorker Laneへ切替可能
- 次TaskがないWorkerは`次の割当待ち`になる
- Requirements変更時、working Taskをsilent rewriteしない
- Queue同期失敗を正常な空Queueとして表示しない
- 別RepositoryのTaskが混線しない
- Public Dashboardへprivate claim metadataを公開しない
- Queue投入だけでWorker自動実行を開始した扱いにしない

## 19. Non-goals

- Queueを正式Requirementsの代わりにする
- Queueへ入ったTaskを無条件でmainへ直接適用する
- Workerに次Taskの自己生成Authorityを与える
- Current Taskの成果物 / Validation保存前にLaneを再利用する
- すべてのTaskをFIFOだけで割り当てる
- Requirement変更時に進行中Taskを無通知で書き換える
- Public DashboardへPrivate Queue / Claimデータを直接公開する
- DashboardからChatGPTの別会話を自動生成したと偽る

## 20. Runtime References

Current implementationの主な正本:

- Queue contract: `EliteMay/web-project-data/work-queues/README.md`
- Claim contract: `EliteMay/web-project-data/work-queues/CLAIM_CONTRACT.md`
- Queue sync: `tools/sync-work-queue.mjs`
- Formal assignment: `tools/assign-work-queue.mjs`
- Conversation claim: `tools/claim-work-queue.mjs`
- Completion / same-lane advance: `tools/advance-work-queue.mjs`
- Public projection: `tools/build-public-work-queue-projection.mjs`
- Project Dashboard renderer: `project-dashboards/project-dashboard-queue.mjs`

この文書はCurrent Product Contractであり、実装済み範囲を未実装として扱いません。残るDashboard V2本体Taskは`DASHBOARD_REQUIREMENTS.md`に紐づくCurrent Work Queueで追跡します。
