# 23 Conversation Handoff / Recovery

この章はChatGPT Project等で、**会話を分ける・要件定義や実装を引き継ぐ・古い会話や重複Active会話から安全に復旧する**ためのNormative Ownerです。

GitHub上の変更手順・Branch / PR / final-state管理は [10 Project Management](10-project-management.md)、Requirements Persistence / Draftは [01 Requirements](01-requirements.md) を正本とします。

## 基本原則

- Conversation historyをProject Source of Truthにしない。
- Current Repository / Requirements / Work Report / Current work refから復元する。
- Message数・経過日数だけで会話を分けない。
- 同じ未完了作業を複数Conversationから並行書込みしない。
- Handoffのためだけに新しい仕様正本を増やさない。
- Conversationの境界をUserの作業上の負担にしない。利用可能なRecovery Capabilityがある場合は、UserへHandoff説明を要求する前にAutomatic Resumeを試みる。

## Development Conversation Persistence

### CONDITIONAL MUST: Guide対象の開発会話をInteraction単位で保存する

このGuideを読んで進めるProject関連の開発会話で、`EliteMay/web-project-data`へ書き込めるCapabilityがある場合、各完了Interactionをcompanion data repositoryの`conversations/`へ保存します。

対象には、例えば次を含みます。

- 要件定義 / 仕様整理
- 実装 / Refactor / Architecture変更
- UI / Visual / UX作業
- Bug調査 / 修正
- Project固有の技術調査 / 方針決定
- GitHub / CI / Pages / Release等の開発運用
- Game / Web / Electron等、このGuideを適用して進めるProject作業

次は対象外です。

- 雑談
- 買い物相談
- 健康相談
- 一般知識の質問
- 対象Projectと無関係な非開発会話

同じChatGPT Account / Project内に存在することだけを理由に、非開発会話まで保存しません。

### 保存契約

保存形式・Schema・Secret取扱い・Validationの正本は`EliteMay/web-project-data/conversations/README.md`、Cross-Conversation Workstream保存の正本は`EliteMay/web-project-data/workstreams/README.md`と各Schemaです。

Guide側では保存形式を重複定義しません。基本動作は次です。

1. 1回のUser要求と、それに対するAssistantの完了応答を1 logical Interactionとして扱う
2. 必要に応じてmeaningfulなprogress update、sanitized tool summary、repository effectを含める
3. raw system / developer prompt、unrestricted raw tool payload、credential、token、cookie、secret、private key等は保存しない
4. 明示的に`sensitive` / `secret-never-store`に分類されるInteractionは保存しない
5. 同一Interactionのretryは重複を作らない既存Persistence Contractに従う
6. 保存後もCurrent Repository / Requirements / Spec / Branch / PR / Commit等をCurrent Stateの正本として扱う
7. Workstreamが一意に解決できるInteractionでは、Data側Current Contractに従ってその関連を保存する

通常の正式な実装EntryはData repositoryの`tools/conversations/persist-interaction.mjs`です。これはInteraction保存、metadata ownershipの正規化、conversation-level checkpoint更新、および参照されたWorkstreamのRecovery更新を一つの正式Persistence経路として扱います。`tools/conversations/save-interaction.mjs`はInteractionだけを書き込む低レベルPrimitiveであり、通常のGuide対象会話では単独成功だけをConversation Persistence完了扱いにしません。

Agent / Client / Gateway等が`persist-interaction.mjs`を直接実行できない場合でも、Data repository側のCurrent Schema / Secret Contract / checkpoint consistencyを満たす同等の書込み経路を使用できます。

### MUST: 保存成功を推測しない

Persistenceを実行した場合は、書込み成功を確認してから「保存済み」と扱います。

- write accessがない
- Data repositoryへ到達できない
- Validationが失敗した
- Secret / sensitivity ruleで拒否された
- Conflict / write failureが起きた

場合は保存成功と報告しません。

Persistence失敗だけを理由に、Current Repositoryから安全に継続できる通常の開発作業まで必ず停止する必要はありません。ただし、そのInteractionは未保存として扱い、Recovery上重要なCheckpointが失われる場合はWork Report / Branch / PR等のAuthoritativeなCheckpointを優先して残します。

### MUST: Public RepositoryへFallbackしない

`web-project-data`へ保存できない場合、会話本文を`web-project-guide`や対象ProjectのPublic Repositoryへ代替保存しません。

Conversation PersistenceはRecovery Evidenceであり、公開Code / Requirements / Rule本文へ会話ログを混ぜる理由にはなりません。

### Platform boundary

通常のChatGPT Conversation自体にはRepository側から強制できるpost-response hookやnew-Conversation hookがないため、Platform全体で100%自動保存・自動復帰されるとは表現しません。

このRuleが要求するのは、**Guideを適用しているAgent / Project / Clientが必要な保存・検索Capabilityを持つ場合、その開発Interactionを正式Persistence経路へ通し、新しい開発InteractionではAutomatic Resumeを試みること**です。Capabilityがない環境では、保存済み・自動復帰済みと偽らず、Current GitHubからRecovery可能な状態を維持します。

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

## Automatic Conversation Resume / Workstream

### SHOULD: 利用可能な環境では新しい開発InteractionでAutomatic Resumeを標準動作にする

Guide対象の開発作業でConversationが変わっても、Userへ毎回次のような説明を要求しません。

- 「前の会話の続き」
- 「会話変えた」
- 「前回のCheckpointを読んで」
- 「このRepositoryの続きをやって」

同じChatGPT Project内では、Workstream Persistence / Search Capabilityが利用できる場合、通常の続きのUser Messageから既存WorkstreamのRecoveryを試みます。

Project外の新しいConversationでも、Repository・作業内容・Workstream等から十分高い確信で一意に特定できる場合はAutomatic Resume候補として扱えます。一意に決められない場合は勝手に選択しません。

Automatic Resumeで候補を一意にできても、**候補特定とResume開始は別段階**です。新しいConversationで既存WorkstreamをAutomatic Resumeする場合は、後述のConfirmation Gateを通るまで作業再開済みとして扱いません。

### Workstreamの責務

WorkstreamはConversationとは独立した「同じ作業の系列」です。

```text
Conversation
↓
Interaction
↓
Workstream Reference
↓
Workstream Layer
↓
Current Repository Verification
```

例:

```text
Type Tower / 難易度設定
- Conversation A: 要件定義
- Conversation B: 実装
- Conversation C: Bug修正
```

目的が同じ系列ならConversationが変わっても同一Workstreamとして扱えます。

Conversationの`checkpoint.json`はそのConversationのRecoveryを担当し、Workstream全体のCurrent StateをConversation Checkpointへ無理に統合しません。Workstream保存形式・ID・Index・Correction Schema等の詳細は`web-project-data`を正本とし、Guideへ複製しません。

### Interaction completionとWorkstream lifecycleを分離する

Interactionの`completion: completed`は1回の要求が完了したことを意味し、Workstream全体の完了を意味しません。

Workstream lifecycleは概念上次を持てます。

- `active`
- `paused`
- `blocked`
- `completed`
- `superseded`

代表的な遷移:

- 作業継続 → `active`
- 「一旦保留」 → `paused`
- 外部要因等で進行不能 → `blocked`
- 作業系列全体のCompletion Contractを満たした → `completed`
- 別Workstreamへ正式に置き換え → `superseded`

`completed`でも追加修正が同じ目的の延長なら同じWorkstreamを再開できます。別目的の独立機能なら新規Workstreamを作ります。

### 新しいWorkstreamを作る条件

原則として次では新規Workstreamです。

- 明確な別目的
- 独立して完了可能な機能
- Userが「新規」「別件」と明示
- 既存Workstreamとは別の主要成果物

次だけでは新規Workstreamにしません。

- Conversation変更
- 要件定義 → 実装
- 実装 → Bug修正
- `paused` → 再開

### Automatic Resume Flow

利用可能なCapabilityがある場合、原則として次の順で解決します。

```text
Current User Message
↓
新規作業かContinuationか判定
↓
明示Project / Repository確認
↓
軽量Workstream Indexから候補抽出
↓
Hard Ruleで不正候補を除外
↓
候補順位を計算
↓
Candidate Workstream Checkpoint取得
↓
必要な場合だけConversation Checkpoint / Interactionを追加取得
↓
Current Repository / Requirements / Work Report等を再取得
↓
保存状態とCurrent Stateを照合
↓
Confidence判定
↓
Resume候補を1つへ絞る
↓
Automatic Resume Confirmation Gate
↓
Userが候補を確認
↓
安全ならResume
↓
今回Interactionを正しいWorkstreamへ関連付ける
```

毎回すべてのConversation / Interactionを全文検索しません。

基本順序は:

```text
Lightweight Workstream Index
↓
Workstream候補
↓
Workstream Checkpoint
↓
Conversation Checkpoint
↓
必要Interaction
↓
Current Repository
```

とし、保存件数増加に比例してRecovery Costが極端に増える構造を避けます。

### Candidate Resolution

候補選定では必要範囲で次を見ます。

- ChatGPT Project
- Repository
- Work Type
- Topics
- Workstream Status
- Primary / Related Workstream
- Last Meaningful Activity
- Current GitHubとの整合性
- User Messageとの意味的関連

単純な「最新Conversation順」だけで決めません。

### MUST: Hard RuleはSoft Scoreより優先する

次は候補Scoreではなく強制Ruleとして扱います。

- Userが別Repositoryを明示 → 旧Repository候補を除外
- Userが「新規」「別件」「前の続きじゃない」と明示 → 自動Continuationを解除
- `superseded` Workstream → 原則Automatic Resume候補外
- Current Repositoryと明確に矛盾 → 候補外またはRecovery対象
- Userが直前のResume候補を「違う」と否定 → その候補を除外し、別候補へ進む前にFailure Reviewを完了
- 書込み対象を一意に復元できない → 書込み禁止

Soft ScoreはHard Rule通過後の候補順位付けにだけ使います。

### Confidence

#### High Confidence

Project / Repository / Workstream / Current Stateが十分一意。

→ **候補として提示可能。High ConfidenceだけではResumeを開始しない。** Automatic Resume Confirmation Gateへ進みます。

#### Medium Confidence

有力候補はあるが追加Evidenceが必要。

→ Workstream Checkpoint / Conversation Checkpoint / Current GitHub等を追加確認します。候補を十分具体的に提示できる状態なら、User確認をIdentity確定Evidenceとして使えます。

#### Low Confidence

複数候補が同程度、またはEvidence不足。

→ 書込みせず、Read-only Investigationで一意化を試み、それでも候補を具体化できない場合だけ必要最小限Userへ確認します。

### MUST: Automatic Resume前に1回だけUser確認する

新しいConversationで既存Workstreamを**Automatic Resume**する場合、Resolver / Recovery Evidenceから候補を1つに絞れても、その候補をResume済みとして扱う前にUserへ1回だけ確認します。

確認は対象が判別できる短い形にします。

例:

> 前回の「Type Tower / 難易度設定」の続きとして復帰します。合ってる？

Userが`ok` / `うん` / `続けて`等で、その直前に提示された具体的候補を承認した場合はConfirmation成立です。

ConfirmationのScopeは**現在のConversation + 確認したWorkstream**です。

- 確認後、同じConversation / 同じWorkstreamの通常継続で毎Turn確認しない
- Target Workstreamが変わった場合は以前のConfirmationを流用しない
- Userが候補を否定した場合はConfirmationを無効化する
- 新しいConversationで再びAutomatic Resumeする場合は新しいConfirmationを要求する
- staleな候補ID / Repository矛盾 / Hard Rule違反へ過去Confirmationを流用しない

UserがCurrent Message内でRepository / Workstreamを明示して直接作業を指定しており、Automatic Resume Resolverに依存せずTargetが確定している場合は、このGateを「自動推定への確認」として重複適用する必要はありません。ただし、曖昧な`続きやろ`等から過去Workstreamを推定した場合はHigh Confidenceでも省略しません。

### MUST: Workstream Resolution Confidence / Confirmation / Write Target Resolutionを分離する

「どのWorkstreamの続きか」をHigh Confidenceで特定できても、User Confirmation前はResume許可ではありません。また、Confirmation済みでも「どのBranch / PR / Commit / write pathへ書くか」が一意とは限りません。

したがって:

```text
Workstream候補 High
+
Confirmation未成立
=
Read-only Recoveryは可
Resume開始 / Repository writeは禁止
```

```text
Workstream Confirmation成立
+
Write target unresolved
=
Context Resume / Read-only Recoveryは可
Repository writeは禁止
```

Workstream ResolverのHigh ConfidenceやUser Confirmationだけを根拠にCode / Requirementsへ書き込みません。書込み前にはCurrent Repository / Branch / PR / Commit / Requirements等を再取得し、既存のCurrent work ref Recovery Ruleを通します。

### Confirmation後の通常継続

Confirmationが成立して安全にResumeした後は、毎回:

- 「Checkpointを読みました」
- 「前回Conversationを復旧しました」
- 「Workstreamを特定しました」

等を表示しません。

通常の会話としてそのまま続行します。異常・競合・重要な状態変更・新しいUser確認が必要な場合だけ通知します。

### User Override

Current User Instructionを常に最優先します。

次のような短い訂正で切替できます。

- 「違う、農場の方」
- 「これは新規」
- 「前の続きじゃない」
- 「○○の続き」
- 「これは一旦保留」

ただし、**誤ったResume候補をUserが否定したときは、その場で次点候補へ即ジャンプしません。** まず下記Failure Reviewを通してから再解決します。

誤ったAutomatic Resumeを正しい履歴として固定しません。

Persisted Interactionが既に誤ったWorkstreamへ関連付いた場合、Interaction immutabilityを壊して書き換えず、Data側Current Contractのappend-only correction経路で関連を訂正します。

### MUST: Resume誤判定はRoot-Cause-firstで処理する

Automatic Resume候補または実際のResume先をUserから「違う」と指摘された場合、それは単なる会話上の言い直しではなく、**Candidate Resolution / Confirmation / Recovery PathのFailure Evidence**として扱います。

別候補を提示する前に、必要範囲で [10 Project Management - Failure / Bug Root Cause Workflow](10-project-management.md#failure--bug-root-cause-workflow) を適用します。

最低限:

1. 何を正しい続きだと誤判定したか
2. どのEvidence / Score / recency / Project情報がその候補を上位にしたか
3. なぜ既存のHard Rule / Confirmation / Recovery Ruleで防げなかったか
4. 今回だけの候補除外で十分か、Resolver / Rule / Test / Persistenceへ再発防止が必要か
5. 修正または最も狭いFailure Mechanismの対処を行ったか

を確認します。

Candidateを提示しただけでRepository変更等がまだ起きていない場合も、Failure Mechanismを軽量に確認してから次候補へ進みます。実際に誤ったWorkstreamへ書込み・Persistence・仕様判断等を行った場合は、docs/10の通常Root Cause / Recurrence Guard Contractを省略しません。

順序は:

```text
User rejects candidate / resume
↓
その候補のConfirmationを無効化
↓
誤候補を以後の候補から除外
↓
Root Cause / Failure Mechanism確認
↓
必要なRule / Resolver / Test / Recovery Guard修正
↓
候補を再解決
↓
新しい候補をUserへ提示
↓
新しいConfirmation成立後にResume
```

`違う` → `じゃあ次は○○だね` と原因確認なしで候補だけ切り替える挙動をCompletion扱いにしません。

### Current State Verification

保存されたBranch / Commit / PR / Requirements / Work Snapshot / Workstream CheckpointはHistorical Recovery Evidenceです。

Automatic Resume時にはCurrent Repositoryを再取得します。古いCheckpointとCurrent GitHubが違うだけで破損扱いにせず、現在位置を再解決します。

### Recovery Failure

Automatic ResumeのEvidenceが不足する場合:

```text
Workstream Persistence / Conversation Persistenceから復帰不能
↓
Current RepositoryからRecovery
↓
それでも不足
↓
安全なRead-only Investigation
↓
それでも書込み先を特定不能
↓
その変更のみ停止
```

完全に一意化できない場合だけUserへ確認します。

### Concurrent Work

同じRepositoryに複数Active Workstreamが存在すること自体は許可します。

ただし同一Scopeへ複数Conversation / Workerが同時書込みする場合は競合として扱い、下記のRepository-backed Lease / Atomic Coordination等の既存排他Ruleを継承します。

### Security

Automatic ResumeのためにSecurity Boundaryを弱めません。

以下をWorkstream / Interaction / Indexへ保存しません。

- API Key / Token / Cookie / Credential / Private Key
- raw system / developer prompt
- unrestricted raw tool payload
- `secret-never-store` Interaction

権限を失ったRepositoryを過去Checkpointだけを根拠に利用しません。

### Non-goals / Platform Boundary

Automatic Resumeは:

- Conversation historyをProject Source of Truthにする機能ではない
- Userの最新指示を過去履歴で上書きする機能ではない
- 古いCommitをCurrent Stateとみなす機能ではない
- 全ChatGPT環境でPlatform-level new-Conversation hookを保証する機能ではない

Repository側へWorkstream Persistence / Resolverを実装しただけで、通常ChatGPT全体が自動的に新規Conversation開始時に必ずそれを呼ぶとは表現しません。利用できるAgent / Project / ClientではこのContractを実行し、利用できない環境では自動復帰済みと偽りません。

## Current work ref Recovery

Conversation checkpointの`workSnapshotRefs`、Workstream Checkpoint、過去Interactionの`currentWorkRef`は、**そのInteraction / Checkpoint時点のRecovery Evidenceであり、現在のLive HEADを保証する値ではありません。** Conversation Persistence自体が同じData repositoryへ新しいCommitを追加する場合もあるため、Snapshot SHAと現在のBranch HEADが異なることだけで破損扱いにしません。

Recovery時はSnapshotを開始点として使い、必ずCurrent Repository / PR / Branch / Commitを再取得して現在地を確認します。

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

`Current work ref: unresolved`として扱い、古いConversation / Workstreamから「たぶんこの続き」でCode / Requirementsを書きません。

停止理由は**User承認待ちではなく、Current Stateを一意に復元できないため**です。

## 旧Conversationで再開された場合

Handoff後に旧Conversationへ戻った場合、旧Conversationが最後に把握したRefをCurrentとみなしません。

Current Repository / Requirements / Work Report / Current work refを再取得します。

- 同じState → 継続可能
- より新しいCheckpointあり → 最新Stateへ同期してから継続
- Current work ref不明 → Recovery Rule

「新しい会話へ戻ってください」と案内するだけで止めるより、Current GitHub / Workstreamから安全に同期できるなら同期を優先します。

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
- Workstream association / status

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

同じ未完了作業を、手動ConversationとScheduled Automation、または複数のAutonomous Agentが同時に再開できる構成では、Conversation / Workstreamの注意喚起だけで排他制御したことにしません。

### CONDITIONAL MUST: 同じWrite Pathへ複数Workerが入り得る場合はExclusive Leaseまたは同等のAtomic Coordinationを使う

適用条件:

- 同じRepository / Migration / Branch系列へ複数Workerが書き得る
- User操作なしでScheduled Automationが起動する
- Handoff後の旧Conversationが引き続き書込み可能
- 複数Agentが同じCurrent work refを独立に復元できる
- 複数Conversationが同じWorkstreamを同時にResumeし同一Scopeへ書込み得る

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

ただしUserが移行しなくてもCurrent GitHub / Workstreamから安全に作業できるなら継続できます。

## Agent Autonomy

Conversation移行・Recovery・Automatic Resumeでも、Repository / Evidenceで解決できる内容をUserへ質問しません。

ただし**新しいConversationでのAutomatic Resume Confirmation Gateは明示的な例外**です。候補がHigh Confidenceでも、曖昧なContinuation Messageから自動推定したWorkstreamは最初の1回だけUser確認を通します。これはProduct preferenceをUserへ返すためではなく、誤Workstreamへ復帰するCostを抑えるSafety Gateです。

User Decisionが必要なのは、Current Stateを復元した上でも:

- non-inferable Product preference
- equal viable product directions
- irreversible destructive choice with no safe alternative
- external permission / billing / account action
- unresolved material contract conflict

等が残る場合です。

## Completion

Handoff / Recovery / Automatic Resume作業は該当範囲で次を満たして完了です。

- Target Repositoryが一意
- Continuationの場合はTarget Workstreamが一意、またはLow Confidenceとして書込み停止
- Automatic ResumeではTarget Workstream候補をUserが1回確認してからResumeしている
- UserがResume候補を否定した場合、別候補へ進む前にRoot Cause / Failure Mechanismを確認している
- Current work refが一意、または`unresolved`を明示
- Workstream Resolution / Confirmation / Write Target Resolutionを混同していない
- 正式Requirements / Draftの役割を混同していない
- 未完成を完成扱いしていない
- 必要なCheckpointがGitHub / Data repositoryから再取得できる
- Parallel Active write pathを1つへ収束した
- User correctionがある場合、誤Associationを正しい履歴として固定していない
- Prompt / Summary / Conversation history / Workstream checkpointをProjectの第二Source of Truthにしていない
