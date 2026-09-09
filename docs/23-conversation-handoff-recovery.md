# 23 Conversation Handoff / Recovery

この章はChatGPT Project等で、**会話を分ける・要件定義や実装を引き継ぐ・古い会話や重複Active会話から安全に復旧する**ためのNormative Ownerです。

GitHub上の変更手順・Branch / PR / final-state管理は [10 Project Management](10-project-management.md)、Requirements Persistence / Draftは [01 Requirements](01-requirements.md) を正本とします。

## 基本原則

- Conversation historyをProject Source of Truthにしない。
- Current Repository / Requirements / Work Report / Current work refから復元する。
- Message数・経過日数だけで会話を分けない。
- 同じ未完了作業を複数Conversationから並行書込みしない。
- Handoffのためだけに新しい仕様正本を増やさない。

## 会話を分けるタイミング

### SHOULD: 固定Thresholdを使わない

`何往復` / `何日`で自動的に分けません。

次では新しい対応会話を優先できます。

1. Userが移行を明示した
2. 作業区分が変わる
3. Current work ref / 完了状態の把握がConversation historyだけでは不安定
4. 大きなPhaseが完了し、次の独立目的へ進む

同じ目的・同じ作業区分でCurrent Stateを安定して取得できるなら、長い会話でも継続できます。

## 会話名

Project設定で固定形式がある場合はそれを優先します。

基本区分:

- `Repository名（実装）`
- `Repository名（UI・見た目）`
- `Repository名（不具合・改善）`
- `Repository名（相談・調査）`

必要な場合だけProject定義済みの追加区分を使います。独自カテゴリを無制限に増やしません。

## MUST: 移行前にGitHubから復元可能にする

- Requirements途中 → `REQUIREMENTS_DRAFT.md`（必要時）
- Requirements完了 → 正式`REQUIREMENTS.md` + Handoff
- Implementation途中 → Branch / PR / Commit +必要なWork Report
- 完了作業 → Validation /必要なMergeを終えて次へ

Conversation Summaryだけを唯一のCheckpointにしません。

## Implementation Handoff

実装途中の移行ではCurrent work refを残します。

候補:

- current default branch commit
- work branch
- Pull Request
- exact commit SHA

未完成の複数File変更は無理にmainへ入れずBranch / PRへCheckpointします。

Template: [Implementation Conversation Handoff](../templates/IMPLEMENTATION_CONVERSATION_TEMPLATE.md)

## Requirements Handoff

Requirements途中は [01 Requirements](01-requirements.md#requirements-draft--conversation移行) のDraft Contractを使います。

完了後は正式Requirementsの保存 /再取得が成功してから実装会話へ移ります。

Template: [Requirements Conversation Resume](../templates/REQUIREMENTS_CONVERSATION_TEMPLATE.md)

## PromptなしRecovery

Handoff Promptは便利なRouterですが必須条件ではありません。

次からTarget Repositoryを一意に特定できる場合、GitHubから復旧します。

- Userが明示したRepository URL / `owner/repo`
- ChatGPT Project設定でTarget Repositoryが1つに固定
- Current requestとProject情報から他候補なく特定可能

曖昧なMemoryや似たRepository名だけで選びません。

Repositoryを一意に特定できない場合だけ、URLまたは`owner/repo`を確認します。

## Current work ref Recovery

記録されたBranch / PR / Commitが削除・Merge等でそのまま見つからない場合、推測でmainを選びません。

必要範囲で:

1. PR番号 / URLとMerge / Close状態
2. PR head / merge commit / changed files
3. Commit / Merge履歴
4. Work Report
5. current default branchへ対象変更が含まれるか

を照合します。

Merge済みでCurrent default branchに同じ変更が含まれることを確認できれば、Current default branchを新Current work refとして使えます。

### MUST: 復元不能なら変更を止める

`Current work ref: unresolved`として扱い、古いConversationから「たぶんこの続き」でCode / Requirementsを書きません。

停止理由は**User承認待ちではなく、Current Stateを一意に復元できないため**です。

## 旧Conversationで再開された場合

Handoff後に旧Conversationへ戻った場合、旧Conversationが最後に把握したRefをCurrentとみなしません。

Current Repository / Requirements / Work Report / Current work refを再取得します。

- 同じState → 継続可能
- より新しいCheckpointあり → 最新Stateへ同期してから継続
- Current work ref不明 → Recovery Rule

「新しい会話へ戻ってください」と案内するだけで止めるより、Current GitHubから安全に同期できるなら同期を優先します。

## 同じ固定会話が複数Active

作成日時やMessage数ではなくGitHub Evidenceで一本化します。

比較対象:

- Branch / PR / Commit SHA
- ancestry
- changed files / Diff
- merge state
- current default branch
- Work Report
- Current Requirements

### 一方が他方を包含

より進んだ正しいCheckpoint系列をActiveとし、もう一方から同じ未完了作業へ書込みません。

### 両方に固有変更

Parallel Work Conflictとして:

1. 両Diff / Requirementsを比較
2. unique valid changesを特定
3. non-conflictならActive系列へ統合
4. conflictならCurrent Contract / User Intent / Evidence / rollbackでBest Reasonable Decisionを選ぶ
5. それでもProduct preferenceが一意に決まらない場合だけUser Decision
6. Current work refを1つへ確定

統合前に片側を無条件削除しません。

## Autonomous / Scheduled Worker Coordination

同じ未完了作業を、手動ConversationとScheduled Automation、または複数のAutonomous Agentが同時に再開できる構成では、Conversationの注意喚起だけで排他制御したことにしません。

### CONDITIONAL MUST: 同じWrite Pathへ複数Workerが入り得る場合はExclusive Leaseまたは同等のAtomic Coordinationを使う

適用条件:

- 同じRepository / Migration / Branch系列へ複数Workerが書き得る
- User操作なしでScheduled Automationが起動する
- Handoff後の旧Conversationが引き続き書込み可能
- 複数Agentが同じCurrent work refを独立に復元できる

この場合、書込み開始前に**Repository-backed lease / compare-and-swap lock / 同等のAtomic Coordination**でActive writerを1つへ収束させます。

LeaseはProject Source of Truthではなく、**同時書込みを防ぐためのCoordination Evidence**です。Requirements / Migration semantics / Current ContractをLeaseへ保存しません。

最低条件:

- `holderId`はrun / conversationごとに一意
- 対象Scope / work unit / work branchを識別できる
- 無期限Lockではなく期限付きでrenew可能
- acquire / renew / releaseはstale writeを検知できる仕組みを使う
- 他Holderの有効Leaseを確認したWorkerは書込まずyieldする
- read-only inspection / recoveryだけならLeaseを要求しない
- normal completion / safe abort / handoffでreleaseする

GitHub fileをLease stateとして使う場合は、取得時に読んだblob SHAを更新時のpreconditionとして使うなど、**同じ古い状態を読んだ2 Workerが両方取得成功しない**仕組みを使います。単なる`active: true`の上書きだけではAtomic Coordinationとして不十分です。

### MUST: Expiryだけで安全なTakeoverとみなさない

Lease期限切れは「Coordination claimがstale」のEvidenceであって、前Workerの未merge作業が消えた証明ではありません。

Takeover前に必要範囲で:

1. previous work branch / PR
2. unique unmerged commits / Diff
3. current default branch
4. checkpoint / Handoff / current work ref
5. semantic overlap

を確認します。

前Workerのunique unfinished workが残る場合は、新しい競合Branchを作るより既存系列へRecovery / convergenceします。Current work refを一意にできない場合は通常の`unresolved` Recoveryへ戻ります。

### SHOULD: Lease churnをProject historyへ混ぜない

Lock acquire / renew / releaseのたびにProject `main`へ意味のないCommitを積む構成は避けます。

可能なら:

- dedicated coordination branch / ref
- external atomic coordination store
- Project historyと分離できる短期coordination state

を使います。

ただしCoordination store自体が失われてもCurrent Repository / Branch / PR / RequirementsからRecoveryできるようにし、Lease storeを第二Source of Truthへしません。

## 別作業区分のParallel Work

別区分でもScopeが独立していれば並行できます。

同じFile / Component / Feature / Storage / API / Requirements等へ触れる場合はBranch / PRを分離します。

Merge前に:

- 相手PR / changed files
- semantic contract overlap
- current base
- Requirements / save compatibility
- 必要なTest / Visual Review

を確認します。

Git conflictがないこととsemantic conflictがないことを同一視しません。

## ChatGPTが移行を提案する条件

Current work refや正式状態の把握が不安定になり、Conversation historyを追うこと自体が誤変更Riskになった場合は、対応会話への移行を短く提案できます。

ただしUserが移行しなくてもCurrent GitHubから安全に作業できるなら継続できます。

## Agent Autonomy

Conversation移行・Recoveryでも、Repository / Evidenceで解決できる内容をUserへ質問しません。

User Decisionが必要なのは、Current Stateを復元した上でも:

- non-inferable Product preference
- equal viable product directions
- irreversible destructive choice with no safe alternative
- external permission / billing / account action
- unresolved material contract conflict

等が残る場合です。

## Completion

Handoff / Recovery作業は次を満たして完了です。

- Target Repositoryが一意
- Current work refが一意、または`unresolved`を明示
- 正式Requirements / Draftの役割を混同していない
- 未完成を完成扱いしていない
- 必要なCheckpointがGitHubから再取得できる
- Parallel Active write pathを1つへ収束した
- Prompt / Summaryを第二Source of Truthにしていない
