# 23 Conversation Handoff / Recovery

この章はChatGPT Project等で、**会話を分ける・要件定義や実装を引き継ぐ・古い会話や重複Active会話から安全に復旧する**ためのNormative Ownerです。

GitHub上の変更手順・Branch / PR / final-state管理は [10 Project Management](10-project-management.md)、Requirements Persistence / Draftは [01 Requirements](01-requirements.md)、Data Authority / Conflict / Recoveryは [03 Data / Storage](03-data-storage.md) を正本とします。

## 基本原則

- Conversation historyをProject Source of Truthにしない。
- Current Repository / Requirements / Work Report / Current work refからCurrent Stateを復元する。
- Conversation / Interaction / Workstream / Live GuardはRecovery Evidenceであり、Project Stateの第二Source of Truthにしない。
- Message数・経過日数だけで会話を分けない。
- 同じ未完了作業を複数Conversationから無調整で並行書込みしない。
- Handoffのためだけに新しい仕様正本を増やさない。
- Conversationの境界をUserの作業上の負担にしない。利用可能なRecovery Capabilityがある場合は、UserへHandoff説明を要求する前にAutomatic Resumeを試みる。
- Current User Instructionは保存済みContextより優先する。

## Development Conversation Persistence

### CONDITIONAL MUST: Guide対象の開発会話をInteraction単位で保存する

このGuideを読んで進めるProject関連の開発会話で、`EliteMay/web-project-data`へ書き込めるCapabilityがある場合、各完了Interactionをcompanion data repositoryへ保存します。

対象例:

- 要件定義 / 仕様整理
- 実装 / Refactor / Architecture変更
- UI / Visual / UX作業
- Bug調査 / 修正
- Project固有の技術調査 / 方針決定
- GitHub / CI / Pages / Release等の開発運用
- Game / Web / Electron等、このGuideを適用して進めるProject作業

対象外例:

- 雑談
- 買い物相談
- 健康相談
- 一般知識の質問
- 対象Projectと無関係な非開発会話

同じChatGPT Account / Project内に存在することだけを理由に、非開発会話まで保存しません。

### 保存契約

保存形式・Schema・Secret取扱い・Validationの正本は`EliteMay/web-project-data`のCurrent Contractです。Guide側ではSchemaを複製しません。

基本動作:

1. 1回のUser要求と、それに対するAssistant処理を1 logical Interactionとして扱う
2. 必要に応じてmeaningfulなprogress update、sanitized tool summary、repository effectを含める
3. raw system / developer prompt、unrestricted raw tool payload、credential、token、cookie、secret、private key等は保存しない
4. 明示的に`sensitive` / `secret-never-store`に分類されるInteractionは保存しない
5. 同一Interactionのretryは重複を作らないCurrent Persistence Contractに従う
6. 保存後もCurrent Repository / Requirements / Spec / Branch / PR / Commit等をCurrent Stateの正本として扱う
7. Workstreamが解決できるInteractionでは、Current Data Contractに従って関連を保存する

Repository-localの正式EntryはData repositoryの`tools/conversations/persist-interaction.mjs`です。Interaction単独保存だけでは通常のConversation Persistence完了扱いにしません。

Agent / Client / Gateway等がrepository-local entryを直接実行できない場合でも、Data repository側のCurrent Schema / Secret Contract / checkpoint consistency / persistence receiptを満たす同等の書込み経路を使用できます。

### Preferred: Canonical write setを1つのGit commitとして公開する

GitHub Git-data capabilityを利用できるRuntimeでは、1 Interactionに必要なCanonical write setを可能な範囲で一括生成・Validationしてから1 Commitとして公開します。

概念Flow:

```text
Current data main HEAD取得
↓
Interaction / Conversation checkpoint / Workstream checkpoint / Indexを導出
↓
Schema / consistency Validation
↓
Tree / Commit生成
↓
fast-forward-only ref update
```

別Writerが先に`main`を進めた場合はforce overwriteしません。Current `main`を再取得し、予約Interaction IDが既に同内容で保存済みか確認し、未保存なら新Stateから再導出します。

Git-dataの一括公開Capabilityがない場合はrepository-local canonical pathへFallbackできます。この場合、途中FailureをFull Successとして扱いません。

### MUST: Persistence Receiptを確認する

「Interaction fileを書いた」だけを保存成功にしません。

Current Data Contractが要求する範囲で少なくとも:

- immutable Interactionが意図した内容で保存されている
- state-bearing InteractionではConversation checkpointがCurrent historyからcanonicalに導出されている
- Workstreamへ直接関連するInteractionは対象Workstreamの`interactionRefs`へ存在する
- Workstream Correctionでは、source側の誤Associationが除去されCorrection evidenceが残っている
- generated Workstream IndexがCurrent Workstream stateから再生成可能で整合している

ことを確認します。

保存成功を確認できないInteractionを「保存済み」と報告しません。

### `stateEffect`とHistorical Backfill

Interactionの時系列EvidenceとCurrent Stateを混同しません。

Data側Current Contractで概念上次を区別します。

- `current` — Current Conversation / Workstream stateを動かせる
- `historical` — 過去Evidenceを追加するがCurrent intent / outcome / next action / lifecycle等を動かさない
- `correction` — 誤Association等の訂正Evidence。Current intent / outcomeにはしない

Legacy recordで`stateEffect`が無い場合のCompatibility挙動はData側Current Contractに従います。

Historical Backfillを追加しただけで、後から完了したWorkstreamが`active`へ戻る、Current intentが古い内容へ巻き戻る、古いTopicsが永久にCurrent candidate evidenceへ残る、という状態を作りません。

### Time Integrity

Current Data ContractがFuture timestamp guardを提供する場合、それを通します。新しいInteractionの`occurredAt`をTrusted capture時刻より不自然に未来へ置いてCurrent state / recencyを乗っ取らせません。

### MUST: Public RepositoryへFallbackしない

`web-project-data`へ保存できない場合、会話本文を`web-project-guide`や対象ProjectのPublic Repositoryへ代替保存しません。

Conversation PersistenceはRecovery Evidenceであり、公開Code / Requirements / Rule本文へ会話ログを混ぜる理由にはなりません。

## Live Interaction Guard

### CONDITIONAL MUST: 重要Interactionは作業開始側でもRecovery markerを残す

利用Runtimeから`EliteMay/web-project-data`のLive Recovery capabilityへ安全に書き込める場合、次のInteractionでは完了後のPersistenceだけに依存せず、作業開始前にLive Guardを確立します。

対象:

- `importance: meaningful`
- `importance: checkpoint`
- Automatic ResumeのConfirmation成立によりWorkstreamを再開するInteraction
- Authoritative Repository / Requirements / Dataへmutationを行うInteraction

Routineな挨拶や単なるAcknowledgementだけのためにGuard churnを増やしません。ただし短い`ok`でも、その返答がResume Confirmation等の重要State Transitionなら対象です。

### Authority Boundary

Current implementationでは概念上:

```text
web-project-data:main
= Canonical Interaction / Checkpoint / Workstream / Index

web-project-data:recovery-live
= Live Guard coordination only

Target Project Repository
= Project code / data / requirements Source of Truth
```

`recovery-live`をCanonical stateとして扱いません。Current implementation detailはData repositoryの`workstreams/LIVE_RECOVERY.md`とCurrent Schemaを正本とします。

### MUST: GuardはCanonical stateと分離する

Live coordination churnをData `main`やProject `main`へ積み続けません。Dedicated coordination branch / ref等、Canonical historyと責務を分けられる保存先を使います。

Current `recovery-live` branchでは`live/**`だけをLive coordination surfaceとし、Canonical `conversations/` / `workstreams/` / project stateを複製しません。

### Guard Flow

概念Flow:

```text
Workstream候補解決
↓
必要ならUser Confirmation
↓
Current Workstream / Canonical settlement確認
↓
Current target repository / ref / commit確認
↓
Interaction ID予約
↓
Live Guardをsanitizeして保存
↓
CAS / fast-forward-only publish
↓
再取得して自分のInteraction IDがclaim済みか確認
↓
初めてAuthoritative mutation開始
```

複数Workstreamを1 Interactionでmaterially変更する場合は、可能なら同じcoordination transactionで一括Claimします。途中までClaimして残りへ進む構成を標準にしません。

### MUST: Unsettled Guardを上書きしない

既存GuardがCurrent Canonical stateにsettledしていない場合、新しいGuardで上書きして過去のRecovery baselineを失わせません。

先に前Interactionを分類します。

代表分類:

- Canonical Interactionなし + repository baseline unchanged → mutation前中断候補
- Repository advanced + Canonical Interactionなし → partial / completed-but-unpersisted候補
- Interactionあり + derived checkpoint/index不整合 → partial persistence
- Current stateからownershipを一意に帰属できない → ambiguous / write blocked

Recovery自体を必要に応じてCanonical persistenceしてから次InteractionをClaimします。

### Settlement

Guardの`interactionId`とWorkstreamの`latestInteractionId`が一致することだけをSettlement条件にしません。後続の正当なInteractionでCurrent stateが進むことがあるためです。

Current Data Contractが要求するCanonical evidenceを確認します。代表例:

- immutable Interactionが存在
- Workstreamの`interactionRefs`またはCorrection contract上のEvidenceが成立
- Conversation checkpointがcanonical
- generated Workstream indexがcanonical

Settlement条件の実装詳細はData repositoryを正本とします。

### Repository Write Baseline

Repository mutationを伴うGuardでは、Current Data Contractに従って対象Repository / ref / commitと、必要ならboundedな`expectedTargets`を記録します。

Guard assertionよりCurrent Repository Evidenceを優先します。

- baseline commitとCurrent commitが同じ → mutation前中断の有力Evidence
- Current commitが進んでいる →自分の変更と決めつけずattribution review
- ref削除 / mismatch / repository unavailable →自動Write authorityを与えない

### MUST: TTL切れだけでGuardを奪わない

「古いから」「一定時間経過したから」だけで未settled Guardを安全にTakeoverできるとはみなしません。

前WriterのBranch / PR / Commit / Diff / Canonical Persistenceを確認し、Current Stateへ収束させてからClaimします。

### Privacy

Live GuardもGit historyへ残り得るRecovery Evidenceです。最小化します。

保存しないもの:

- raw user message / assistant response
- credential / token / cookie / secret / private key
- unrestricted raw tool payload
- `safeToWrite: true`のようなcaller assertion
- Requirements本文やProject stateの複製

短いsanitized intent hintとRecoveryに必要なbaselineだけに絞ります。`sensitive` / `secret-never-store`をLive Guardへ保存しません。

### Degraded Mode

Live coordination layerを読めない / safeに更新できない場合:

- Read-only research / consultation / requirements整理 → Current Repositoryから安全に継続できる範囲は継続可能
- Authoritative Repository / Requirements / Data mutation → Live Guardを確立できるまで開始しない

Guard unavailableを理由に「保存済み」「Write安全」と偽りません。

## Platform boundary

通常のChatGPT Conversation自体にはRepository側から強制できるpre-response / post-response / new-Conversation hookがないため、Platform全体で100%自動保存・自動復帰されるとは表現しません。

Live Guardは「呼ばれた後の中断・競合・保存漏れ」への耐性を上げますが、InvokerがGuard処理そのものを完全に呼ばなかった事実をRepositoryだけで100%検出する仕組みではありません。

このRuleが要求するのは、**Guideを適用しているAgent / Project / Clientが必要Capabilityを持つ場合、その開発InteractionをCurrent Guard / Persistence / Recovery経路へ通すこと**です。Capabilityがない環境では、自動保存・自動復帰済みと偽りません。

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

Guide対象の開発作業でConversationが変わっても、Userへ毎回Handoff説明を要求しません。

同じChatGPT Project内では、Workstream Persistence / Search Capabilityが利用できる場合、通常の続きのUser Messageから既存WorkstreamのRecoveryを試みます。

Automatic Resumeで候補を一意にできても、**候補特定とResume開始は別段階**です。自動推定した既存WorkstreamはConfirmation Gateを通るまでResume済みとして扱いません。

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

Conversation checkpointはConversation内Recovery、Workstream checkpointはConversationを跨ぐRecoveryを担当します。どちらもProject Source of Truthではありません。

### Interaction completionとWorkstream lifecycleを分離する

Interactionの`completion: completed`は1回の要求が完了したことを意味し、Workstream全体の完了を意味しません。

Workstream lifecycleの代表値:

- `active`
- `paused`
- `blocked`
- `completed`
- `superseded`

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

### Retry-stable Bootstrap

新規Workstreamを作るRuntimeでは、Response lossによるduplicate creationを避けるため、Current Data Contractが提供するretry-stable creation key / deterministic identityを利用できる場合はそれを優先します。

同じ論理Creation retryで別Workstreamを無制限に増やしません。

### Automatic Resume Flow

利用可能なCapabilityがある場合、原則として次の順で解決します。

```text
Current User Message
↓
Explicit New / Continuation判定
↓
明示Project / Repository確認
↓
Lightweight Workstream Indexから候補抽出
↓
Hard Ruleで不正候補を除外
↓
少数Candidate Workstream Checkpoint取得
↓
User Message + Current Conversation Context + Candidate checkpointを意味的に解釈
↓
構造的Ambiguity判定
↓
必要なら候補提示
↓
Automatic Resume Confirmation Gate
↓
Current Repository / Requirements / Branch / PR / Commit再取得
↓
未settled Guardがあれば先にRecovery
↓
必要InteractionではLive Guard claim
↓
安全ならResume / mutation
```

毎回すべてのConversation / Interactionを全文検索しません。

基本順序:

```text
Lightweight Workstream Index
↓
少数Workstream候補
↓
Candidate Checkpoints
↓
必要Conversation / Interaction Evidence
↓
Current Repository
```

### Candidate Resolution: Semantic理解とDeterministic Gateを分離する

候補抽出 / Hard FilterはDeterministic layerで行い、日本語の省略・指示語・短文の意味解釈を単純Tokenizerの一致率だけへ依存させません。

Semantic layerが扱う例:

- 「英語の方」
- 「牛追加しよ」
- 「昨日のやつ」
- 「あれの続き」

Deterministic layerが扱う例:

- explicit new intent
- explicit repository mismatch
- `superseded`除外
- rejected candidate除外
- Confirmation provenance
- Current write target existence / uniqueness
- Live Guard settlement / ownership
- repository mutation permission

Scalar ConfidenceだけでWrite permissionを決めません。候補が複数残る、Write targetが複数残る、ownership attributionが曖昧等の**構造的Ambiguity**を優先して扱います。

### MUST: Hard RuleはSoft Scoreより優先する

次は候補Scoreではなく強制Ruleとして扱います。

- Userが別Repositoryを明示 → 旧Repository候補を除外
- Userが「新規」「別件」「前の続きじゃない」と明示 → 自動Continuationを解除
- `superseded` Workstream → 原則Automatic Resume候補外
- Current Repositoryと明確に矛盾 → 候補外またはRecovery対象
- Userが直前のResume候補を「違う」と否定 → その候補を除外し、別候補へ進む前にFailure Reviewを完了
- 書込み対象を一意に復元できない → 書込み禁止
- Unsettled Guardが存在 → Recovery完了まで新しいmutation禁止

Soft ScoreはHard Rule通過後の候補準備 / 順位付けにだけ使います。

### Confidence / Structural Uncertainty

#### High Confidence

Project / Repository / Workstream / Current Stateが十分一意。

→ 候補として提示可能。自動推定WorkstreamならConfirmation Gateへ進みます。

#### Medium Confidence

有力候補はあるが追加Evidenceが必要。

→ Candidate Checkpoint / Current GitHub等を追加確認します。候補を具体的に提示できる状態ならUser確認をIdentity Evidenceとして使えます。

#### Low Confidence / Structural Ambiguity

複数候補、複数Write target、Evidence不足等。

→ 書込みせずRead-only Investigationで一意化を試み、それでも解消できない場合だけ必要最小限Userへ確認します。

### MUST: Automatic Resume前に1回だけUser確認する

新しいConversationで既存WorkstreamをAutomatic Resumeする場合、候補を1つへ絞れてもResume済みとして扱う前にUserへ1回だけ確認します。

例:

> 前回の「Type Tower / 難易度設定」の続きとして復帰します。合ってる？

Confirmationは単なる`ok`文字列そのものではありません。Current Data Contractがtyped Resume Eventを提供する場合、**現在Conversationでpersist済みの具体的Proposal + そのProposalを参照するUser Confirmation evidence**として扱います。

- Proposalが無い`ok`はResume Confirmationにしない
- 別ConversationのProposalへ現在の`ok`を流用しない
- Target Workstreamが変われば過去Confirmationを流用しない
- Userが候補を否定したらConfirmationを無効化する
- stale proposal / repository contradiction / Hard Rule違反へ過去Confirmationを流用しない

UserがCurrent Message内でRepository / Workstreamを明示して直接作業を指定しており、自動推定に依存せずTargetが確定している場合は、自動推定Safety Gateとしての重複Confirmationは不要です。

### MUST: Workstream Resolution / Confirmation / Write Target / Guardを分離する

```text
Workstream候補 High
+ Confirmation未成立
= Read-only Recovery可 / Resume開始・mutation禁止
```

```text
Confirmation成立
+ Write target unresolved
= Context Resume可 / mutation禁止
```

```text
Confirmation成立
+ Write target resolved
+ Live Guard未確立（Guard対象Interaction）
= Read-only処理可 / authoritative mutation禁止
```

Workstream ResolverのHigh Confidence、User Confirmation、古いCheckpointだけを根拠にCode / Requirementsへ書き込みません。

### Confirmation後の通常継続

Confirmation成立後、同Conversation / 同Workstreamの通常継続で毎Turn確認しません。

通常の会話として続行し、異常・競合・重要な状態変更・新しいUser確認が必要な場合だけ通知します。

### User Override

Current User Instructionを常に最優先します。

例:

- 「違う、農場の方」
- 「これは新規」
- 「前の続きじゃない」
- 「○○の続き」
- 「これは一旦保留」

誤ったResume候補をUserが否定したときは、その場で次点候補へ即ジャンプしません。まずFailure Reviewを通します。

Persisted Interactionが既に誤ったWorkstreamへ関連付いた場合、immutable historyを書き換えずData側Current Contractのappend-only correction経路で関連を訂正します。

### MUST: Resume誤判定はRoot-Cause-firstで処理する

Automatic Resume候補または実際のResume先をUserから「違う」と指摘された場合、Candidate Resolution / Confirmation / Recovery PathのFailure Evidenceとして扱います。

最低限:

1. 何を正しい続きだと誤判定したか
2. どのEvidence / Score / recency / Project情報が候補を上位にしたか
3. なぜHard Rule / Confirmation / Recovery Ruleで防げなかったか
4. 今回だけの候補除外で十分か、Resolver / Rule / Test / Persistenceへ再発防止が必要か
5. 修正または最も狭いFailure Mechanismの対処を行ったか

順序:

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

```text
Workstream / Conversation Persistenceから復帰不能
↓
Live Guard / Current Repository Evidenceを確認
↓
Current RepositoryからRecovery
↓
安全なRead-only Investigation
↓
それでも書込み先 / ownershipを特定不能
↓
その変更のみ停止
```

完全に一意化できない場合だけUserへ確認します。

### Security

Automatic Resume / Live GuardのためにSecurity Boundaryを弱めません。

保存しないもの:

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
- 全ChatGPT環境でPlatform-level lifecycle hookを保証する機能ではない

## Current work ref Recovery

Conversation checkpointの`workSnapshotRefs`、Workstream Checkpoint、過去Interactionの`currentWorkRef`は、その時点のRecovery EvidenceでありCurrent Live HEADを保証しません。

Recovery時は必ずCurrent Repository / PR / Branch / Commitを再取得します。

記録されたBranch / PR / Commitが削除・Merge等でそのまま見つからない場合、推測でmainを選びません。

必要範囲で:

1. PR番号 / URLとMerge / Close状態
2. PR head / merge commit / changed files
3. Commit / Merge履歴
4. Work Report
5. current default branchへ対象変更が含まれるか

を照合します。

Merge済みでCurrent default branchに同じ変更が含まれることを確認できれば、そのdefault branchを新Current work refとして使えます。

### MUST: 復元不能なら変更を止める

`Current work ref: unresolved`として扱い、古いConversation / Workstreamから「たぶんこの続き」でCode / Requirementsを書きません。

## 旧Conversationで再開された場合

Handoff後に旧Conversationへ戻った場合、旧Conversationが最後に把握したRefをCurrentとみなしません。

Current Repository / Requirements / Work Report / Workstream / Live Guardを再取得します。

- 同じState → 継続可能
- より新しいCheckpointあり → 最新Stateへ同期してから継続
- Unsettled Guardあり → 先にRecovery
- Current work ref不明 → Recovery Rule

安全に同期できる場合は「新しい会話へ戻ってください」と案内するだけで止めずCurrent stateへ収束させます。

## 同じ固定会話が複数Active

作成日時やMessage数ではなくRepository Evidenceで一本化します。

比較対象:

- Live Guard / claimed Interaction ID
- Branch / PR / Commit SHA
- ancestry
- changed files / Diff
- current default branch
- Work Report / Current Requirements
- Workstream association / status

### 一方が他方を包含

より進んだ正しいCheckpoint系列をActiveとし、もう一方から同じ未完了作業へ書込みません。

### 両方に固有変更

Parallel Work Conflictとして:

1. 両Diff / Requirementsを比較
2. unique valid changesを特定
3. non-conflictならActive系列へ統合
4. conflictならCurrent Contract / User Intent / Evidence / rollbackからBest Reasonable Decision
5. それでもProduct preferenceが一意に決まらない場合だけUser Decision
6. Current work refを1つへ確定

統合前に片側を無条件削除しません。

## Autonomous / Scheduled Worker Coordination

同じ未完了作業を、手動ConversationとScheduled Automation、または複数Agentが同時に再開できる構成では、注意喚起だけで排他制御したことにしません。

### CONDITIONAL MUST: 同じWrite Pathへ複数Writerが入り得る場合はCAS / Lease等のAtomic Coordinationを使う

適用条件例:

- 同じRepository / Migration / Branch系列へ複数Workerが書き得る
- Scheduled Automationが起動する
- Handoff後の旧Conversationが引き続き書込み可能
- 複数Conversationが同じWorkstreamを同時にResumeし同一Scopeへ書込み得る

Live Guardが利用できるGuide対象Interactionでは、Workstream claim自体をCoordination Evidenceとして使用できます。Target Project側に別の長時間Leaseが必要な場合はProjectのCurrent Contractも併用します。

最低条件:

- claim holder / Interaction IDが一意
- 対象Scopeを識別できる
- stale stateを検知するCAS / revision / blob SHA / fast-forward-only ref update等を使う
- 他Holderの未settled claimを確認したWriterは書込まずRecoveryへ回る
- read-only inspectionだけならWrite leaseを要求しない
- force overwriteで競合を消さない

### MUST: Expiryだけで安全なTakeoverとみなさない

期限切れや古いTimestampは「claimが古い」Evidenceであって、前Writerの未merge作業が消えた証明ではありません。

Takeover前に必要範囲でprevious branch / PR / unique commits / Diff / checkpoint / Live Guard / current work refを確認します。

## SHOULD: Coordination churnをProject historyへ混ぜない

Lock acquire / renew / releaseのたびにProject `main`へ意味のないCommitを積む構成は避けます。

可能なら:

- dedicated coordination branch / ref
- external atomic coordination store
- Project historyと分離できる短期coordination state

を使います。

Coordination store自体が失われてもCurrent Repository / Branch / PR / RequirementsからRecoveryできる構造を維持します。

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

Userが移行しなくてもCurrent GitHub / Workstreamから安全に作業できるなら継続できます。

## Agent Autonomy

Conversation移行・Recovery・Automatic Resumeでも、Repository / Evidenceで解決できる内容をUserへ質問しません。

ただし**新しいConversationでのAutomatic Resume Confirmation Gateは明示的な例外**です。曖昧なContinuation Messageから自動推定したWorkstreamは最初の1回だけUser確認を通します。

User Decisionが必要なのは、Current Stateを復元した上でも:

- non-inferable Product preference
- equal viable product directions
- irreversible destructive choice with no safe alternative
- external permission / billing / account action
- unresolved material contract conflict

等が残る場合です。

## Completion

Handoff / Recovery / Automatic Resume / Conversation Persistence作業は該当範囲で次を満たして完了です。

- Target Repositoryが一意
- Continuationの場合はTarget Workstreamが一意、またはAmbiguousとして書込み停止
- Automatic Resumeでは具体的ProposalをUserが1回確認してからResumeしている
- Confirmationは現在Conversation / exact proposalへscopeされ、単独`ok`を誤用していない
- UserがResume候補を否定した場合、別候補へ進む前にRoot Cause / Failure Mechanismを確認している
- Current work refが一意、または`unresolved`を明示
- Workstream Resolution / Confirmation / Write Target / Live Guardを混同していない
- Guard対象Interactionではauthoritative mutation前にdurable Guardを確認している
- Unsettled Guardを上書きせず、必要なRecoveryを先に閉じている
- Persistence成功をReceiptなしで推測していない
- Historical BackfillがCurrent Stateを巻き戻していない
- 正式Requirements / Draftの役割を混同していない
- 未完成を完成扱いしていない
- 必要なCheckpointがGitHub / Data repositoryから再取得できる
- Parallel Active write pathを1つへ収束した
- User correctionがある場合、誤Associationを正しい履歴として固定していない
- Conversation / Workstream / GuardをProject Source of Truthにしていない
- Capabilityがない環境へPlatform-level自動Hookがあると偽っていない
