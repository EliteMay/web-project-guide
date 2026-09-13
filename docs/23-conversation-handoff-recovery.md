# 23 Conversation Handoff / Recovery

この章はChatGPT Project等で、**会話を分ける・要件定義や実装を引き継ぐ・古い会話や重複Active会話から安全に復旧する**ためのNormative Ownerです。

GitHub上の変更手順・Branch / PR / final-state管理は [10 Project Management](10-project-management.md)、Requirements Persistence / Draftは [01 Requirements](01-requirements.md)、Project Data Authority / Conflict / Recoveryは [03 Data / Storage](03-data-storage.md) を正本とします。

Conversation / Workstream / Persistenceの**保存Schema、File path、Branch / Ref名、書込みAlgorithm、Receipt field、Settlement判定の実装詳細**は `EliteMay/web-project-data` のCurrent Contractを正本とします。このGuideへCurrent implementationを複製しません。

## 基本原則

- Conversation historyをProject Source of Truthにしない。
- Current Repository / Requirements / Work Report / Current work refからCurrent Stateを復元する。
- Conversation / Interaction / Workstream / Live GuardはRecovery Evidenceであり、Project Stateの第二Source of Truthにしない。
- Message数・経過日数だけで会話を分けない。
- 同じ未完了作業を複数Conversation / Agentから無調整で並行書込みしない。
- Handoffのためだけに新しい仕様正本を増やさない。
- Conversationの境界をUserの作業上の負担にしない。利用可能なRecovery Capabilityがある場合は、UserへHandoff説明を要求する前にAutomatic Resumeを試みる。
- Current User Instructionは保存済みContextより優先する。

## Preflightとの境界

この章は全開発Taskの作業開始時に読むUniversal Preflight Ownerではありません。

- 会話移行 / stale checkpoint / duplicate active conversation / Automatic Resume / Current work ref recovery自体が今回のTaskに関係する → `CONVERSATION_HANDOFF` DomainまたはRecovery SignalからPreflightで読む。
- 通常のImplementation / Bug Fix / Research等でConversation Recoveryが今回のDomainではない → 作業開始時の必読にはしない。
- Guide対象の開発InteractionでPersistence capabilityが利用できる → 作業完了前にMachine Routerの`interactionLifecycle.completionDocs`からこの章へ戻り、必要なCompletion Contractを確認する。

Preflight RoutingとInteraction Completion LifecycleのMachine-readable境界は [21 Rule Routing / Preflight](21-rule-routing-preflight.md) を正本とします。

## Development Conversation Persistence

### CONDITIONAL MUST: Guide対象の開発Interactionを保存する

このGuideを適用して進めるProject関連の開発会話で、`EliteMay/web-project-data`へ安全に書き込めるCapabilityがある場合、各完了InteractionをCurrent Data Contractへ従って保存します。

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

### 保存のBehavioral Contract

Guide側が要求するのはBehaviorです。具体的な保存構造はData側へ委譲します。

最低限:

1. 1回のUser要求と、それに対するAssistant処理を1 logical Interactionとして扱う。
2. 必要なCurrent State / Workstream AssociationをCurrent Data Contractに従って整合させる。
3. raw system / developer prompt、unrestricted raw tool payload、credential、token、cookie、secret、private key等を保存しない。
4. `sensitive` / `secret-never-store`として扱うべきInteractionは保存しない。
5. Retryで同一logical Interactionの重複を無制限に作らない。
6. 保存後もCurrent Repository / Requirements / Spec / Branch / PR / Commit等をProject Current Stateの正本として扱う。
7. Historical evidenceを追加しただけでCurrent intent / lifecycle / next action等を古い状態へ巻き戻さない。
8. Current Data ContractがTime Integrity guardを持つ場合は通し、不自然なfuture timestamp等でrecencyを乗っ取らせない。

### MUST: Persistence成功をReceiptなしで推測しない

「1 Fileを書いた」「APIが200を返した」等の部分成功だけをConversation Persistence完了とみなしません。

Current Data Contractが要求するCanonical State / Derived State / Association / Consistencyを満たした**Persistence Receipt相当の成功Evidence**を確認してから保存済み扱いにします。

- 保存成功を確認できないInteractionを「保存済み」と報告しない。
- 部分FailureをFull Successとして扱わない。
- 別WriterとのConflictをforce overwriteで消さない。
- Exact Receipt fieldやValidation手順はData repositoryを正本とする。

### MUST: Public RepositoryへFallbackしない

`web-project-data`へ保存できない場合、会話本文を`web-project-guide`や対象ProjectのPublic Repositoryへ代替保存しません。

Conversation PersistenceはRecovery Evidenceであり、公開Code / Requirements / Rule本文へ会話ログを混ぜる理由にはなりません。

## Live Interaction Guard

### CONDITIONAL MUST: 重要Interactionではauthoritative mutation前にDurable Guardを確立する

利用RuntimeからData側のLive Recovery capabilityへ安全に書き込める場合、次のInteractionでは完了後のPersistenceだけに依存せず、authoritative mutation前にDurable Guard / Claimを確立します。

対象:

- Meaningful / Checkpoint相当のInteraction
- Automatic Resume Confirmation成立によりWorkstreamを再開するInteraction
- Authoritative Repository / Requirements / Dataへmutationを行うInteraction

Routineな挨拶や単なるAcknowledgementだけのためにGuard churnを増やしません。ただし短い`ok`でもResume Confirmation等の重要State Transitionなら対象になり得ます。

### Authority Boundary

Live GuardはCoordination / Recovery Evidenceであり、Canonical Project Stateではありません。

```text
Current Project Repository / Requirements
= Project Current StateのAuthority

web-project-data Canonical State
= Conversation / Interaction / Workstream Recovery Evidence

Live Guard
= in-flight coordination evidence
```

Current implementationで使うBranch / Ref / File path / Schema / storage layoutはData repositoryのCurrent Contractを正本とし、このGuideへ固定しません。

### MUST: GuardとCanonical Stateを分離する

Live coordination churnをProject `main`やCanonical Data historyへ無意味に積み続けません。Current Data Contractが提供するCoordination Surfaceを使用します。

GuardへProject Requirements本文やProject State全体を複製しません。

### MUST: Unsettled Guardを上書きしない

既存Guard / ClaimがCurrent Canonical Stateへsettleしていない場合、新しいGuardで上書きして過去Recovery baselineを失わせません。

先に前Interactionを必要範囲で分類します。

- authoritative mutation前に中断した可能性
- Repositoryは進んだがCanonical Persistenceが未完了の可能性
- Persistenceが部分成功している可能性
- ownership / attributionが曖昧な可能性

RecoveryをCurrent Stateへ収束させてから新しいWrite Claimへ進みます。

Settlementの具体的なfield / index / association判定はData repositoryを正本とします。

### Current Repository Evidenceを優先する

Guard assertionよりCurrent Repository / Branch / PR / Commit / Requirements Evidenceを優先します。

- Guard時点のbaselineとCurrent Stateが同じ → mutation前中断の有力Evidenceになり得る。
- Current Stateが進んでいる → 自分の変更と決めつけずattributionを確認する。
- Target ref / repository / permissionがCurrent Stateと一致しない → 自動Write authorityを与えない。

### MUST: TTL切れだけでTakeoverしない

古いTimestampや期限切れは「古い」Evidenceであって、安全なownership移譲の証明ではありません。

前WriterのBranch / PR / Commit / Diff / Canonical Persistenceを必要範囲で確認し、Current Stateへ収束させてからClaimします。

### Privacy

Live Guardも保存Evidenceになり得るため最小化します。

保存しないもの:

- raw user message / assistant response
- credential / token / cookie / secret / private key
- unrestricted raw tool payload
- caller assertionだけで成立する`safeToWrite`相当の値
- Requirements本文やProject stateの複製

Recoveryに必要な最小限のsanitized intent / baselineだけをCurrent Data Contractに従って保持します。

### Degraded Mode

Live coordination layerを読めない / safeに更新できない場合:

- Read-only research / consultation / requirements整理 → Current Repositoryから安全に継続できる範囲は継続可能
- Authoritative Repository / Requirements / Data mutation → 必要なGuardを確立できるまで開始しない

Guard unavailableを理由に「保存済み」「Write安全」と偽りません。

## Platform boundary

通常のChatGPT Conversation自体にはRepository側から強制できるpre-response / post-response / new-Conversation hookがないため、Platform全体で100%自動保存・自動復帰されるとは表現しません。

Recovery layerは、呼び出された後の中断・競合・保存漏れへの耐性を上げますが、InvokerがRecovery処理そのものを呼ばなかった事実をRepositoryだけで100%検出する仕組みではありません。

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
Current Repository Verification
```

Conversation checkpoint / Workstream checkpointはRecovery EvidenceでありProject Source of Truthではありません。

### Interaction completionとWorkstream lifecycleを分離する

Interactionのcompletionは1回の要求が完了したことを意味し、Workstream全体の完了を意味しません。

WorkstreamはCurrent Data Contract上のlifecycleを持てます。完了済みでも同じ目的の追加修正なら再開でき、別目的の独立成果物なら新規Workstreamを優先します。

Conversation変更、Requirements → Implementation、Implementation → Bug Fixだけを理由に新規Workstreamへ分けません。

### Automatic Resume Flow

利用可能なCapabilityがある場合、原則として次の順で解決します。

```text
Current User Message
↓
Explicit New / Continuation判定
↓
明示Project / Repository確認
↓
Workstream候補抽出
↓
Hard Ruleで不正候補を除外
↓
必要なCandidate Checkpoint / Evidence確認
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
必要InteractionではDurable Guard
↓
安全ならResume / mutation
```

Data側の検索Index / Score / schema等のCurrent implementationをGuideへ固定しません。

### Candidate Resolution: Semantic理解とDeterministic Gateを分離する

日本語の省略・指示語・短文等の意味解釈を単純Keyword一致だけへ依存させません。一方、Write Safetyへ関わる条件はDeterministic Gateとして扱います。

Hard Rule例:

- Userが別Repositoryを明示 → 旧Repository候補を除外
- Userが「新規」「別件」「前の続きじゃない」と明示 → 自動Continuationを解除
- Current Data Contract上でResume不可のWorkstream → 候補外
- Current Repositoryと明確に矛盾 → 候補外またはRecovery対象
- Userが直前の候補を否定 → その候補を除外し、Failure Reviewを先に行う
- 書込み対象を一意に復元できない → 書込み禁止
- Unsettled Guardが存在 → Recovery完了まで新しいmutation禁止

Scalar ConfidenceだけでWrite permissionを決めません。複数候補、複数Write target、ownership attribution不明等の**構造的Ambiguity**を優先します。

### Confidence / Structural Uncertainty

- **High:** Project / Repository / Workstream / Current Stateが十分一意 → 自動推定ならConfirmation Gateへ進む。
- **Medium:** 有力候補はあるが追加Evidenceが必要 → Current Repository / checkpoint等を追加確認する。
- **Low / Ambiguous:** 複数候補・複数Write target・Evidence不足 → Read-only Investigationで一意化し、それでも解消不能な場合だけ必要最小限Userへ確認する。

### MUST: Automatic Resume前に1回だけUser確認する

新しいConversationで既存WorkstreamをAutomatic Resumeする場合、候補を1つへ絞れてもResume済みとして扱う前にUserへ1回だけ確認します。

Confirmationは単なる`ok`文字列そのものではありません。Current Conversation内で**具体的なResume Proposalと、そのProposalを参照するUser Confirmation**が成立している必要があります。

- Proposalが無い`ok`はResume Confirmationにしない。
- 別ConversationのProposalへ現在の`ok`を流用しない。
- Target Workstreamが変われば過去Confirmationを流用しない。
- Userが候補を否定したらConfirmationを無効化する。
- stale proposal / repository contradiction / Hard Rule違反へ過去Confirmationを流用しない。

UserがCurrent Message内でRepository / Workstreamを明示して直接作業を指定しており、自動推定に依存せずTargetが確定している場合は、自動推定Safety Gateとしての重複Confirmationは不要です。

### MUST: Workstream Resolution / Confirmation / Write Target / Guardを分離する

```text
Workstream候補 High + Confirmation未成立
= Read-only Recovery可 / Resume開始・mutation禁止

Confirmation成立 + Write target unresolved
= Context Resume可 / mutation禁止

Confirmation成立 + Write target resolved + Guard未確立（Guard対象Interaction）
= Read-only処理可 / authoritative mutation禁止
```

High Confidence、User Confirmation、古いCheckpointだけを根拠にCode / Requirementsへ書き込みません。

### Confirmation後の通常継続

Confirmation成立後、同Conversation / 同Workstreamの通常継続で毎Turn確認しません。

異常・競合・重要な状態変更・新しいUser確認が必要な場合だけ通知します。

### User Override

Current User Instructionを常に最優先します。

UserがResume候補を否定した場合、その場で次点候補へ即ジャンプせず、Failure Reviewを行います。

Persisted Interactionが誤Workstreamへ関連した場合、immutable historyを黙って書き換えずCurrent Data ContractのCorrection経路を使います。

### MUST: Resume誤判定はRoot-Cause-firstで処理する

UserからResume先を「違う」と指摘された場合、Candidate Resolution / Confirmation / Recovery PathのFailure Evidenceとして扱います。

最低限:

1. 何を正しい続きだと誤判定したか
2. どのEvidenceが誤候補を上位にしたか
3. なぜHard Rule / Confirmation / Recovery Ruleで防げなかったか
4. 今回だけの候補除外で十分か、Rule / Resolver / Test / Persistenceへ再発防止が必要か
5. 修正または最も狭いFailure Mechanismへ対処したか

原因確認後に候補を再解決し、新しい自動推定候補なら新しいConfirmationを成立させてからResumeします。

### Current State Verification

保存されたBranch / Commit / PR / Requirements / Work Snapshot / Workstream CheckpointはHistorical Recovery Evidenceです。

Automatic Resume時にはCurrent Repositoryを再取得します。古いCheckpointとCurrent GitHubが違うだけで破損扱いにせず、現在位置を再解決します。

### Recovery Failure

```text
Workstream / Conversation Persistenceから復帰不能
↓
Current Recovery Evidenceを確認
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

## Current work ref Recovery

Conversation / Workstreamの過去Current work refは、その時点のRecovery EvidenceでありCurrent Live HEADを保証しません。

Recovery時はCurrent Repository / PR / Branch / Commitを再取得します。

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

Current Repository / Requirements / Work Report / Workstream / Guardを再取得します。

- 同じState → 継続可能
- より新しいCheckpointあり → 最新Stateへ同期してから継続
- Unsettled Guardあり → 先にRecovery
- Current work ref不明 → Recovery Rule

安全に同期できる場合は「新しい会話へ戻ってください」と案内するだけで止めずCurrent Stateへ収束させます。

## 同じ固定会話が複数Active

作成日時やMessage数ではなくRepository Evidenceで一本化します。

比較対象:

- Current Guard / claimed Interaction
- Branch / PR / Commit SHA
- ancestry
- changed files / Diff
- Current Requirements / Work Report
- Workstream association / status

一方が他方を包含するなら、より進んだ正しいCheckpoint系列をActiveとします。

両方に固有変更がある場合はParallel Work ConflictとしてDiff / Contract / User Intent / Rollbackを比較し、valid changesを1つのCurrent work refへ収束させます。統合前に片側を無条件削除しません。

## Autonomous / Scheduled Worker Coordination

同じ未完了作業を複数Writerが同時に再開できる構成では、注意喚起だけで排他制御したことにしません。

### CONDITIONAL MUST: 同じWrite Pathへ複数Writerが入り得る場合はAtomic Coordinationを使う

最低条件:

- claim holder / Interactionが一意
- 対象Scopeを識別できる
- stale stateを検知できるAtomic / revision-based coordinationを使う
- 他Holderの未settled claimを確認したWriterは書込まずRecoveryへ回る
- read-only inspectionだけならWrite claimを要求しない
- force overwriteで競合を消さない

具体的なCAS / lease / ref update方式はData / ProjectのCurrent Contractを正本とします。

### MUST: Expiryだけで安全なTakeoverとみなさない

期限切れや古いTimestampは前Writerの未merge作業が消えた証明ではありません。Takeover前にprevious Branch / PR / Commit / Diff / checkpoint等を確認します。

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

## Agent Autonomy

Conversation移行・Recovery・Automatic Resumeでも、Repository / Evidenceで解決できる内容をUserへ質問しません。

ただし**新しいConversationでのAutomatic Resume Confirmation Gateは明示的な例外**です。曖昧なContinuation Messageから自動推定したWorkstreamは最初の1回だけUser確認を通します。

User Decisionが必要なのは、Current Stateを復元した上でもnon-inferable Product preference、equal viable direction、不可逆破壊、external permission / billing、material contract conflict等が残る場合です。

## Completion

Handoff / Recovery / Automatic Resume / Conversation Persistence作業は該当範囲で次を満たして完了です。

- Target Repositoryが一意
- ContinuationではTarget Workstreamが一意、またはAmbiguousとして書込み停止
- Automatic Resumeでは具体的ProposalをUserが1回確認してからResumeしている
- ConfirmationはCurrent Conversation / exact proposalへscopeされ、単独`ok`を誤用していない
- UserがResume候補を否定した場合、別候補へ進む前にRoot Cause / Failure Mechanismを確認している
- Current work refが一意、または`unresolved`を明示
- Workstream Resolution / Confirmation / Write Target / Guardを混同していない
- Guard対象Interactionではauthoritative mutation前にDurable Guardを確認している
- Unsettled Guardを上書きせず、必要なRecoveryを先に閉じている
- Persistence成功をReceiptなしで推測していない
- Historical EvidenceがCurrent Stateを巻き戻していない
- 正式Requirements / Draftの役割を混同していない
- 未完成を完成扱いしていない
- 必要なCheckpointがCurrent Repository / Data repositoryから再取得できる
- Parallel Active write pathを1つへ収束した
- User correctionがある場合、誤Associationを正しい履歴として固定していない
- Conversation / Workstream / GuardをProject Source of Truthにしていない
- Data implementation detailsをGuide側の第二正本として固定していない
- Capabilityがない環境へPlatform-level自動Hookがあると偽っていない
