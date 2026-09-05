# 10 GitHub中心のプロジェクト管理

この章は、**既存ProjectをGitHub中心で安全に変更するWorkflow**を定義する正本です。

Testing戦略は [07 Testing / Quality](07-testing-quality.md)、Runtime Diagnostics / Remote Handoffは [15 Development Observability / Project Memory](15-development-observability.md) を正本とします。

## 基本方針

Web制作ではGitHub Repositoryを基本の保存・管理先とします。

既存Projectでは、特別な理由がない限り古いZIPや過去の会話より**現在のGitHub Repositoryを最新状態の基準**とします。

## 変更前に確認するもの

変更内容に応じて必要範囲だけ確認します。

- README / Spec / Project Rules
- Work Report / CHANGELOG
- `PROJECT_LEARNINGS.md`
- `AGENTS.md`（存在する場合）
- package.json等のProject metadata
- Runtime / Data / Schema / Storage Key
- Tests / GitHub Actions / Deployment
- Remote Diagnostic Handoff採用時の最新Evidence

すべてを毎回読む必要はありません。

## 既存Projectの変更手順

```text
Current Repository確認
→ README / Spec / Project Rules / Learnings確認
→ 必要ならRuntime Diagnostics確認
→ 変更対象と影響範囲を特定
→ 変更経路を選択
→ 実装
→ 関連Contractを確認
→ 一時資産をCleanup
→ 最終CommitでValidation
→ 必要な文書 / Learningを更新
→ 未確認事項を記録
```

Remote Diagnosticsの具体的な読取順・件数・Fallbackは [15 Development Observability / Project Memory](15-development-observability.md) を正本とし、この章へ再掲しません。

## GitHubへの変更経路を選ぶ

変更内容に対して最も小さく安全な経路を選びます。

### SHOULD: 小規模で変更箇所が明確

GitHub上の対象Fileを直接更新して構いません。

例:

- 文言修正
- 1〜数Fileの明確なBug fix
- README / JSON / CSSの局所変更
- 既存Testで十分に回帰確認できる変更

**単発のFile書換えのためだけにGitHub Actionsや補助Scriptを新設しません。**

### SHOULD: 複数File・高Risk・設計変更

Branch / Pull Requestを優先します。

例:

- 保存形式 / Schema変更
- 共通Runtime変更
- 大規模UI変更
- 複数主要機能へ影響
- Guide / CI / Deployment等の運用変更

PRではDiffとCIを確認してからMergeします。

### CONDITIONAL: GitHub Actions

GitHub Actionsは**継続的な自動化そのもの**が目的の場合に使います。

例:

- Static Validation
- Test
- Build
- Deploy
- Release
- 定期処理

単発修正のPatch EngineとしてWorkflowを増やしません。

やむを得ず一時Workflow / Scriptを使った場合は、作業終了前にCleanupし、Cleanup後の最終状態を再検証します。

## Final Stateを基準にする

途中CommitのCI / Pages成功は最終状態の品質保証ではありません。

最終Commit / Merge Commitに対するValidationを完成判定に使います。

詳細なFinal-state Validationは [07 Testing / Quality](07-testing-quality.md#final-state-validation) を正本とします。

## ChatGPT Projectの会話を分けるタイミング

### SHOULD: メッセージ数や経過日数だけでは会話を分けない

`何往復したら新しい会話`、`何日空いたら新しい会話`のような固定Thresholdは設けません。

同じ作業区分・同じ目的で、Current Repository / 正式文書 / Current work refを安定して把握できているなら、会話が長くても既存会話を続けて構いません。

逆に、短い会話でも作業区分や目的が変わるなら、Projectで定義された対応会話へ移します。

### SHOULD: 次の場合に新しい会話へ移る

次のいずれかに当てはまる場合は、必要なCheckpointをGitHubへ残したうえで新しい会話へ移すことを優先します。

1. **Userが新しい会話へ移りたいと明示した**
2. **作業区分が変わる**
   - 例: `Repository名（相談・調査）` → `Repository名（実装）`
   - 例: 実装中に大きな仕様変更が必要になり、`Repository名（相談・調査）`へ戻る
   - Projectで定義されていない独自カテゴリは作らない
3. **会話が長くなり、現在状態の把握が不安定になっている**
   - Current work refや完了 / 未完了の区別を繰り返し確認している
   - 既にGitHubへ保存済みの決定を会話履歴だけから再構成し始めている
   - 同じ仕様や作業位置について矛盾した理解が出ている
4. **大きな作業の区切りに到達した**
   - 要件定義完了後に実装へ移る
   - 大きな実装Phaseが完了し、次の独立したPhaseへ進む
   - 完了済みの変更をValidation / Mergeまで終え、次の目的へ切り替える

単にTopicが少し変わった、別日になった、メッセージ数が増えたという理由だけで新しい会話を増やしません。

### MUST: 会話移行前に作業状態をGitHubへ復元可能にする

会話を分ける場合は、作業種類に応じた既存Handoff Ruleを使います。

- 要件定義途中 → [01 要件定義](01-requirements.md) の`REQUIREMENTS_DRAFT.md` Workflow
- 要件定義完了 → 正式`REQUIREMENTS.md`保存 + Implementation Handoff
- 実装途中 → この章のImplementation Checkpoint / Current work ref Workflow
- 完了済み作業 → 必要なValidation / Documentation / Mergeを終えてから次の目的へ移る

会話移行のために新しいSource of Truthを増やしたり、会話Summaryだけを保存先にしません。

同じ作業区分の既存会話がまだ安定して使える場合は、無理に新しい会話を作らず既存会話を継続します。新しい会話へ移した場合は、旧会話と新会話で同じ変更を並行して進めないことを基本とします。

### SHOULD: ChatGPTが状態把握の不安定化を検知したら会話移行を提案する

Userから会話移行の依頼がなくても、ChatGPTが次のような状態を検知した場合は、新しい対応会話へ移すことを短く提案します。

- Current work refや現在の作業位置を会話履歴だけでは安定して特定できなくなっている
- 完了 / 未完了、正式要件 / Draft、確認済み / 未確認の区別に矛盾が出始めている
- GitHubへ保存済みの状態より古い会話内容を再構成して判断しそうになっている
- 長い会話履歴を追うこと自体が、誤った変更や重複作業のRiskになっている

提案時は、**勝手に会話移行済みとして扱いません。** 「なぜ移した方が安全か」と「移行先の固定会話名」を簡潔に示し、Userの了承を待ちます。

Userが了承した場合は、保存のためだけの重複確認を増やさず、作業種類に応じて次まで自動で進めます。

```text
Userが移行を了承
→ 現在状態を確認
→ 必要なRequirements Draft / Implementation CheckpointをGitHubへ保存
→ 保存成功を確認
→ Current work ref / 未確定事項を特定
→ 対応するHandoff / Resume Promptを置換して生成
→ 新しい固定会話名を案内
```

Userが移行しない選択をした場合でも、Current Repositoryと正式文書から安全に状態を確認できる限り、現在の会話を継続して構いません。ただし、作業位置や正式状態を一意に確認できず破壊的変更のRiskがある場合は、会話を続けること自体を理由に推測でCode変更や正式文書更新を行いません。

### MUST: 移行後に旧会話で再開した場合は最新Checkpointを確認する

新しい会話へHandoffした後、同じ未完了作業を旧会話で再開しようとした場合、旧会話に残っている会話履歴や当時のCurrent work refをそのまま現在状態として扱いません。

Code変更・正式要件更新・Merge等の書き込みを行う前に、対象Repositoryの現在状態を確認し、少なくとも次を必要範囲で比較します。

- 現在のdefault branch / 作業Branch / Pull Request
- 最新のCurrent work ref
- Work Reportの完了 / 未完了 / 次の作業
- 正式`REQUIREMENTS.md`、要件定義途中なら`REQUIREMENTS_DRAFT.md`
- 旧会話が最後に把握していたCommit / Branch / PRとの関係

旧会話の把握状態より新しいCheckpointがGitHub上に存在する場合は、**旧会話の古い状態からそのまま作業を続けません。** 原則として、Handoff後に使っている最新の対応会話へ戻るよう案内します。

```text
旧会話で再開要求
→ Current Repository / 正式文書 / Current work ref確認
→ 旧会話の把握状態と最新Checkpointを比較
→ 同じ状態 → 安全なら継続可能
→ より新しいCheckpointあり → 旧状態からは変更せず、最新の対応会話へ戻す
→ Checkpointを一意に確認できない → unresolvedとして変更を止める
```

旧会話を再びActive Conversationとして使いたいとUserが明示した場合は、新しい会話側との並行作業を止めたうえで、**最新Checkpointを旧会話へ読み直してから**再開して構いません。古い会話履歴へRollbackすることはしません。

すでに新しい会話側の変更がMerge済み / 完了済みの場合も、旧会話から過去の未完了状態を復活させません。新しい目的として追加変更する場合は、現在のGitHub状態から新しい作業として開始します。

### MUST: 同じ固定会話が複数Activeになった場合はCheckpoint系列を比較して一本化する

同じRepository・同じ作業区分（例: `Repository名（実装）`）の会話を誤って複数作り、両方で同じ未完了作業を進めてしまった場合、**会話を作った日時、最後に発言した時刻、メッセージ数だけで正しい会話を決めません。**

まず各会話が最後に把握しているGitHub上の作業位置を集め、必要範囲で次を比較します。

- Branch名 / Pull Request番号 / Commit SHA
- 各Checkpoint間のCommit ancestry
- Pull RequestのDiff / changed files / Merge状態
- 現在のdefault branchへ取り込まれている変更
- Work Reportの完了 / 未完了 / 次の作業
- 正式`REQUIREMENTS.md`と現在の変更が一致しているか

### SHOULD: 一方が他方を包含している場合は、より進んだ正しい系列をActiveにする

次のようにGitHub Evidenceで一方が他方を包含していると確認できる場合、より進んだ系列をActive Conversationとして扱います。

- Conversation AのCheckpointがConversation Bの祖先Commitで、BがAの変更を含んでいる
- A側のPRがMerge済みで、その変更を含む現在のdefault branchからBが継続している
- B側のDiffがA側の有効な変更をすべて含み、さらに後続の変更が追加されている

Active Conversationを決めた後は、もう一方の会話では同じ未完了作業への書き込みを止めます。古い系列から新しいCommitや正式文書更新を追加しません。

```text
同じ固定会話が2つActive
→ 両方のCurrent work refを確認
→ Commit / PR / Diff / Work Reportを比較
→ 一方が他方を包含 → より進んだ正しい系列をActiveにする
→ もう一方では同じ作業を停止
```

### MUST: 系列が分岐して双方に固有変更がある場合は、単純に「進んでいる方」を選ばない

両会話が別Branch / PRへ進み、双方に未Mergeの固有変更がある場合は、Commit数や新しさだけで片方を捨てません。

この場合はParallel Work Conflictとして扱い、次を行います。

1. 両系列のDiffと正式要件を比較する
2. 片方にしかない有効な変更を確認する
3. 非競合なら、採用するActive系列へ安全に統合できるか確認する
4. 同じ仕様・同じFileで競合し、どちらを採用すべきか要件だけでは判断できない場合はUser Decisionとする
5. 統合後にCurrent work refを1つへ確定し、もう一方の系列では書き込みを止める

統合前に片方のBranch / PRを削除したり、古い会話の変更を無条件で破棄しません。どちらの系列が正しいか一意に確認できない状態では、`Active Conversation: unresolved`として破壊的な変更やMergeを止めます。

会話名は同じ固定形式のままで構いません。重要なのはChatGPT上の会話作成日時ではなく、**GitHub上で1つのCurrent work refと1つのActive作業系列へ収束していること**です。

## 実装会話をGitHub中心で引き継ぐ

### SHOULD: 実装途中で会話を変える場合も、会話履歴ではなくGitHubを引き継ぎ元にする

ChatGPT Project等で`Repository名（実装）`の会話が長くなった、別日に再開する、または新しい実装会話へ整理したい場合、過去会話の長いSummaryをSource of Truthにしません。

原則として次の流れを使います。

```text
Repository名（実装）
→ 現在の変更状態を確認
→ GitHub上に復元可能なCheckpointを残す
→ 必要なWork Report / Project Learningsを更新
→ 保存成功を確認
→ Current work refを特定
→ Implementation Conversation Handoff Templateを置換
→ 新しいRepository名（実装）
→ 最新Guide + Current Repository + Requirements + Work refを確認
→ 続きから実装
```

Userが`新しい実装会話へ移りたい`等と明示した場合、重大な矛盾やGitHub書き込み失敗がなければ、追加の保存確認質問を増やさず、この引き継ぎ処理まで進めて構いません。

### MUST: 未完成の作業を完成済みに見せない

会話移行はProject完成とは別です。

- 完了済みの変更 → 通常のValidationを行い、変更経路上必要ならMergeまで終える
- 未完成の変更 → 無理にdefault branchへ入れず、Branch / Pull Request等へCheckpointを保存する
- Testが未実施 / 失敗中 → Work Report等へ明示する
- 未確認のUI / 実機 / OS依存項目 → 未確認のまま記録する
- 会話移行のためだけに品質基準を下げたり、壊れたmainを作らない

Checkpointは「次の会話が同じ状態を取得できること」が目的です。途中状態をRelease / 完成版として扱いません。

### Current work ref

新しい実装会話がどこから続きを始めるか特定できるよう、必要に応じて次のいずれかを残します。

- default branch上の最新Commit
- 作業Branch名
- Pull Request番号 / URL
- 特定Commit SHA

通常の軽微変更がすでにmainへ安全に反映済みなら`main`で十分です。未完成の複数File変更やReview前変更ではBranch / Pull Requestを優先します。

### MUST: Current work refが見つからない場合はGitHub Evidenceから復元する

引き継ぎPromptやWork Reportに記録されたBranch / Pull Request / Commitが削除・Close・Merge等でそのまま参照できない場合、**推測で`main`を現在位置として扱いません。**

次のEvidenceを必要範囲で確認し、同じCheckpointを特定できるか復元します。

1. 記録されているPull Request番号 / URLと、そのMerge / Close状態
2. Pull Requestのhead SHA / merge commit SHA / changed files
3. RepositoryのCommit履歴とMerge履歴
4. 同じ作業を示すBranch / Commit / Work Report
5. 現在のdefault branchに対象変更がすでに取り込まれているか

Branchが削除済みでも、対応するPRやCommit SHAがGitHub上で確認できる場合は、そのEvidenceから復元して構いません。Merge済みで対象変更が現在のdefault branchへ含まれていることを確認できた場合は、現在のdefault branchを新しいCurrent work refとして使えます。

復元時は、**「最も新しいから」「名前が似ているから」だけで候補を選びません。** Diff、Commit、PR、Work Report等で同じ作業状態だと確認できることを優先します。

### MUST: 復元できない場合は実装を止める

Current work refを一意に確認できない場合は、次を行います。

- `Current work ref: unresolved` として扱う
- 確認できた候補RefやEvidenceを短く示す
- 未確認状態をWork Report等へ必要に応じて残す
- 古い会話だけを根拠に続きのCode変更を始めない
- `main`から「たぶんこの続き」と実装を再開しない

この状態は引き継ぎ失敗として扱い、正しいCheckpointを確認できるまで実装を進めません。

### Documentation

会話引き継ぎのためだけに新しい`HANDOFF.md`等を毎回作りません。

必要な状態は既存Ownerへ残します。

- 現行仕様 → README / SPEC / `REQUIREMENTS.md`
- 今回の変更結果 / 未完了 / 未確認 / 次の作業 → Work Report
- 再利用価値の高い失敗・成功 → `PROJECT_LEARNINGS.md`
- 実装中の具体的なDiff / Checkpoint → Branch / Pull Request / Commit

Work Reportを更新する場合も、会話ログ全文ではなく、次の会話が作業を再開するために必要な状態だけを残します。

### Handoff Prompt

新しい実装会話へ移る場合は [Implementation Conversation Handoff Template](../templates/IMPLEMENTATION_CONVERSATION_TEMPLATE.md) を再利用します。

要件定義完了直後だけでなく、実装途中の会話移行にも同じTemplateを使います。実装途中では`Current work ref`へBranch / Pull Request / Commit等を埋めます。

GitHubへのCheckpoint保存が失敗した場合は、引き継ぎ保存完了として扱わず、古い会話だけを根拠に新しい会話で実装を続けません。

### SHOULD: 引き継ぎPromptを貼り忘れてもRepositoryを一意に特定できるなら復旧する

Implementation / Requirements Conversation Templateは、正本へ安全に到達しやすくするためのRouterであり、**新しい会話を再開するための必須条件ではありません。**

新しいChatGPT会話で引き継ぎPromptがない場合でも、次の情報から対象Repositoryを一意に特定できるならGitHub中心で復旧します。

- Userがその会話で明示したRepository URL / `owner/repository`
- ChatGPT Project側で対象Repositoryが1つに固定されている場合のProject設定 / 開始情報
- 現在の依頼文とProject内の既存情報から、対象Repositoryが他候補なく特定できる場合

過去会話の曖昧なMemoryや、名前が似ているRepositoryだけを根拠に特定しません。

対象Repositoryを特定できたら、Promptの有無に関係なく次を行います。

1. 最新の`web-project-guide`の`README.md` / `START_HERE.md`を確認
2. 対象RepositoryのCurrent Repositoryを確認
3. 作業種類に応じて正式文書を確認
   - 要件定義の再開 → `REQUIREMENTS.md`を正本とし、`REQUIREMENTS_DRAFT.md`があれば未確定差分として扱う
   - 実装の再開 → 正式`REQUIREMENTS.md`のReady状態、README / SPEC / Project Learnings / Work Report等を確認する
4. 実装途中ならCurrent work refを確認し、見つからない場合は上記Recovery RuleでGitHub Evidenceから復元
5. 一意に復旧できた地点から続ける

### MUST: Repository自体を一意に特定できない場合は作業を始めない

複数Repositoryが候補になる、Project設定から対象Repositoryを確認できない、またはRepository名だけでは同名候補を除外できない場合は、推測で選びません。

この場合はUserへ**Repository URLまたは`owner/repository`だけ**確認し、確認前にCode変更・正式要件更新・Checkpoint復旧を始めません。

Repositoryは特定できても実装途中のCurrent work refだけが一意に復旧できない場合は、前述の`Current work ref: unresolved`ルールを適用します。

引き継ぎPromptが存在しないこと自体は、Repositoryと必要なGitHub Evidenceを一意に確認できる限り、引き継ぎ失敗理由にしません。

## AI Coding Agentを使う場合

ChatGPT / Codex / Claude / Copilot等が生成したCodeも通常変更と同じ品質基準を通します。

### SHOULD: AI出力を「提案 + 実装候補」として扱う

- Current Repo / Runtime / Dataを先に確認する
- Project Rules / 保存互換性 / Architectureを守る
- Runtime Evidenceがある場合は原因推測より先に確認する
- AI提案のFramework / Library / Storage / Rewriteを理由なく採用しない
- 高Cost判断はADR / 影響確認を省略しない
- 未経験TechnologyではArchitecture / Security / Deployment / Persistenceを追加Reviewする
- 既存Projectでは「全部Rewrite」よりSmallest Safe Changeを基本とする

ただしVisualの土台自体が失敗している場合は、[Domain-first Visual Research](18-domain-first-visual-research.md#visual-foundation-reset) のFoundation Resetを使い、**正常なDomain Logicを残したままUI Shellを再設計**できます。

## Specification / Oracle-driven AI Development

AIへ大規模な実装・移植・自動生成を任せる場合、実装前にObservable Acceptance CriteriaやOracleを用意できるか検討します。

Oracleの種類・Testing方法は [07 Testing / Quality](07-testing-quality.md#specification--oracle-test) を正本とします。

Visual等、機械的Oracleが作りにくい領域は明示的なReview Gateで補います。

## AGENTS.md

`AGENTS.md` はCoding AgentへProjectの入口を渡すRouterとして利用できます。

### SHOULD: Source of Truthを増やさない

`AGENTS.md`へREADME / Spec / Project Rulesの全文を複製しません。

役割:

- 最初に読むべき正本を案内
- Build / Test / Validation command
- 崩してはいけない仕様へのLink
- Architecture上の重要責務 / File ownership
- Storage / Security / Deploymentの高Risk箇所
- Remote Diagnostic Handoffの有無と安全な読取入口
- 作業後のCompletion Check

Project固有Ruleの正本はSpec / `PROJECT_RULES.md`等へ残します。

### Nested AGENTS.md

Subdirectoryだけ異なるRule / Test / Technologyを持つ場合のみ必要に応じて使います。

Directoryごとに大量作成せず、Root / Nestedへ同じ内容を複製しません。

Template: [AGENTS_TEMPLATE.md](../templates/AGENTS_TEMPLATE.md)

## 原則としてそのまま改善してよい範囲

既存仕様や保存互換性を壊さない場合、次は原則そのまま改善できます。

- 明確なBug fix
- 軽微なUI改善
- Code整理 / 重複Code削減
- 読み込み速度改善
- Accessibility改善
- 分かりにくい文言改善
- Path miss修正
- JSON整理
- READMEの不足情報追加

「軽微」に見えても保存形式・共通Runtime・主要導線へ影響する場合は影響確認を優先します。

## 確認が必要な変更

次は勝手に確定しません。

- 主要機能の削除
- 大幅なUI変更
- 保存形式 / Data互換性変更
- 既存URL変更
- 外部Service移行 / 有料Service導入
- 公開範囲変更
- GitHub Pages非対応化
- Web版 / Electron版の切替

必要に応じて、変更理由 / 影響 / メリット / デメリット / 代替案 / Rollback可否を整理します。

## 関連機能への影響確認

変更時は必要に応じて次を確認します。

- HTMLとJSのID / class
- CSS変更の他画面への影響
- JSON / Schema Version
- localStorage / IndexedDB Store / Key
- 既存保存Data
- URL / File path / GitHub Pages相対Path
- Event Listener / import / fetch
- 共通Component
- Service Worker / Cache
- Version / Build
- GitHub Actions / Deployment trigger
- Remote Diagnostic Schema（採用時）

## Repository discoverability / 公開サイトへの導線

### CONDITIONAL MUST: 公開して使えるWebサイトURLがあるRepositoryは、Repository画面からすぐ開けるようにする

GitHub Pages、独自Domain、Vercel等で**現在利用できる代表URL**があるWeb Projectでは、Repositoryを開いた人がREADMEを探し回らなくてもSiteへ移動できる状態を必須とします。

公開URLを新規作成・変更した作業では、同じ作業内でRepositoryのSite導線も更新します。

優先順位:

1. **GitHub RepositoryのAbout欄にある `Website` / homepageへ代表URLを設定する**
2. README上部のProject名・短い説明の近くにも `Open site` / `Live Site` 等の分かりやすいLinkを置く
3. 詳細な公開方法・代替URL・注意事項はREADMEのGitHub Pages / Deployment節へ置く

Repository Description本文へ長いURLを無理に詰め込むより、GitHubが用意しているWebsite欄を第一候補にします。

### 代表URLの選び方

複数URLがある場合は、通常利用者が使う**1つのCanonical / Stable URL**をWebsite欄へ置きます。

例:

- GitHub Pagesの本番URL
- 独自Domainがあるなら独自Domain
- PreviewではなくStable Deployment

開発用localhost、期限付きPreview、秘密URL、認証情報を含むURLはWebsite欄へ置きません。

### 例外

次では無理にSite Linkを設定しません。

- まだ公開していないProject
- Electron専用でWeb版が存在しない
- Repository自体がLibrary / Guide / Backend等で、直接利用するSiteがない
- 公開URLを広く見せるべきでないPrivate / Internal Project

Website欄を更新できない作業環境では、**少なくともREADME上部へLive Site Linkを置くことを必須**とし、Website欄は未設定事項として残します。Website欄を更新できる環境になった時点で代表URLを設定します。

## Documentation ownership

### README

READMEは**現在仕様**を中心にします。

最低限必要な内容は [README Template](../templates/README_TEMPLATE.md) を使えます。

長い変更履歴はCHANGELOG / Work Reportへ分離します。

### Work Report

今回の変更結果・未確認・既知Issue等は必要に応じてWork Reportへ残します。

Template: [Work Report](../templates/WORK_REPORT_TEMPLATE.md)

### Project Learnings

高Cost Bug / 再利用価値の高い成功は `PROJECT_LEARNINGS.md` へ残します。

詳細は [15 Development Observability / Project Memory](15-development-observability.md) を確認します。

## GitHub Pages

GitHub Pages固有の構成・Path・Secrets・公開確認は [08 GitHub Pages](08-github-pages.md) を正本とします。

この章では「HTML / CSS / JSだけで成立するSiteは、特別な理由がなければGitHub Pagesで直接利用できる構成を優先する」というProject管理上の方針だけを扱います。
