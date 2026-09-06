# 01 要件定義

新規制作では、実装前に最低限以下を整理します。

## 必須項目

- 目的: 何を解決するサイト / アプリか
- 利用者: 自分だけ / 友人共有 / 一般公開
- 必要機能: MVPと後回し機能を分ける
- 画面構成: 各画面の役割と主要導線
- データ構成: 何をJSON / 保存データにするか
- 保存方法: localStorage / IndexedDB / GitHub JSON / 外部DB / Electron userData等
- 崩してはいけない仕様
- 完成条件

結果を大きく左右しない不明点は、仮定を明記したうえで進めます。
重要な仕様でも、Current Repository / Current Requirements / Existing User Intent / Evidenceから合理的に決められる内容はUser回答待ちにしません。

## 対話型要件定義 Workflow

ChatGPT / Coding Agentと会話しながら要件定義する場合は、**Userにしか決められないMaterial Decisionだけ確認し、それ以外はBest Reasonable Decisionで進める**ことを基本とします。

目的は、質問を増やしてDecisionをUserへ戻すことではなく、UserがProjectの核を保持しながら、Repository / Requirements / Evidenceを使って必要十分な要件を継続的に確定することです。

### Decision Class

要件定義中の判断を次の3種類へ分けます。

この分類は**影響度・検証深度・Rollbackの必要性を判断するためのもの**であり、User回答待ちにするかどうかを直接決める分類ではありません。

#### Core Decision — Productの核へ大きく影響

変更すると「別のSite / App / Game」と言えるほど、目的・主要体験・主要利用者・主要機能の意味が変わる判断です。

例:

- Site / Appの一番の目的
- Gameで何をして楽しむか
- 学習Siteで何をどう学べるようにするか
- 戦闘中心 / 自動化中心 / 探索中心等の主要体験
- Single / Multi、閲覧中心 / 編集中心等の大きな機能方針
- 利用者が変わることで内容自体が大きく変わる場合のTarget Audience

### MUST: Core DecisionをUser回答待ちの自動Triggerにしない

Core Decisionでも、最初に次を確認します。

```text
Current Repository
+ Current Requirements
+ Existing User Intent
+ Research / Evidence
↓
Best Reasonable Decisionを選べる？
```

合理的な最善案を選べる場合は、その案を採用し、必要ならAssumption / Riskを短く記録して進めます。

Userへ確認するのは、意味のある複数案が残り、既存User IntentからPreferenceを合理的に推定できず、選択によってProductの主要体験が大きく変わる場合等、**Userにしか決められないMaterial Intent**が残るときです。

#### High-cost / Risk Decision — 検証と影響確認を強める

Productの核そのものではなくても、後から変えると大きな手戻り・費用・データ互換性問題・公開事故につながる判断です。

例:

- 保存Schema / 既存データ互換性の大変更
- Web / Electron等Platformの大変更
- 外部DB / Auth / API / Provider導入
- 有料Service導入
- 公開範囲変更
- Login必須化
- 主要URL / Deployment方式変更
- 主要機能削除
- Framework / Architectureの全面変更
- 大規模なPage Structure / Navigation変更
- Migrationが必要な変更
- Security上の重要変更

### MUST: High-cost / Risk Decisionも重要度だけで停止しない

高Cost / 高Riskであることは、Impact Analysis、Research、Migration、Backup、Rollback、Validation等を強める理由です。**Userへ判断を返す理由そのものではありません。**

Current Repository / Requirements / Evidenceから安全なBest Reasonable Decisionを選べる場合は、そのまま進めます。

User確認を優先するのは、外部System / Account / 課金 / 公開範囲 / 破壊的・不可逆Operation等で明示Approvalが必要、必要Credential / PermissionをUserだけが提供できる、または重大なRequirement衝突をEvidenceでも解けない場合です。

#### Default Decision — Agentがおすすめを決める

結果を大きく左右しない技術・実装・細部の判断です。

例:

- File分割
- JSON構造の細部
- CSS / Component構成
- Naming
- Error handlingの一般的な方法
- Testの具体的方法
- Accessibility / Performanceの標準対策
- 細かなUI配置

### SHOULD: Default Decisionは確認待ちにしない

可能なら候補と採用理由を短く示して、そのままおすすめ案を採用します。

例:

```text
A / Bがありますが、今回はBの方が安全なのでBを採用します。
```

「どれがいい？」を細部ごとに繰り返しません。

### Evidence-first Decision Classification

Decision Classとは別に、**その判断をResearchで先に絞るべきか**を次の観点で分類します。

- **User Preference** — Existing User Intentから合理的に推定できず、Userにしか決められないPreferenceだけ確認対象にする
- **Researchable Question** — 既存Evidenceがあり得るため [20 Evidence-first Research](20-evidence-first-research.md) を先に使う
- **Project-specific Decision** — Research結果とProject固有条件を見てBest Reasonable Decisionを選び、必要なAssumption / Riskを記録する
- **Confirmed Requirement** — 決定した内容を正式な`REQUIREMENTS.md`へ反映する

Core DecisionでもResearchableな部分はResearchできます。Research結果だけでUser Intentを捏造しませんが、既存User IntentとEvidenceから合理的に決められる内容を毎回Userへ戻しません。

## Recommendation-by-default — 標準動作

要件定義は、Userが毎回`おすすめで`と指定しなくても、原則として**Recommendation-by-default + Best Reasonable Decision**で進めます。

- Default DecisionはAgentがおすすめを選んで進める
- Core / High-cost Decisionでも、Current Contextから合理的な最善案を選べるなら採用して進める
- Researchで絞れる重要QuestionはUserへ投げ返す前にResearchする
- 明らかに安全・妥当な推奨案がある場合は、承認待ちにせず採用する
- 同じ種類の判断で毎回`ok` / `OK`等の承認を求めない
- Userにしか決められないMaterial Preference、明示Approvalが必要なOperation、必要Credential / Permission等だけ確認する
- Userが`ここは考えたい`、`毎回確認して`等で明示的に確認中心を求めた範囲だけ、そのPreferenceを優先する

通常は判断の大半をAgent側で進め、Userへの質問は例外にします。質問数や自動決定率をQuotaにはしません。**「質問しないこと」自体ではなく、合理的に解けるDecisionをUserへ返さないこと**を重視します。

`ok` / `OK` / `それで` / `そのまま` / 選択肢記号等が直前案への承認として文脈上明確な場合、同じ確認を繰り返しません。

### MUST: 質問は最終手段にする

Userへの確認を優先するのは、原則として次のいずれかです。

1. **Userにしか決められないMaterial Intent** — 意味のある複数案が残り、Existing User IntentからPreferenceを合理的に推定できず、結果が主要体験を大きく変える
2. **明示Approvalが必要** — 外部System / Account / 課金 / 公開範囲 / 破壊的・不可逆Operation等でUser承認なしに進めるべきでない
3. **Userだけが必要情報を持つ** — Credential / Secret / Permission /物理操作 /未共有の必須情報等が必要
4. **重大なSource of Truth衝突を解けない** — Current User Request、正式Requirements、保存互換性等が衝突し、既存優先順位やEvidenceでも安全に解決できない
5. **Safety / Legal / Security上の明示確認が必要** — 誤判断Costが高く、標準RuleやEvidenceだけでは進めるべきでない

実用上の最終判定は次を使います。

> Current Repository / Requirements / Existing User Intent / Research / Evidenceを確認しても、合理的なBest Reasonable Decisionを選べないか？

YESなら必要な1〜3問だけ確認します。NOなら、Assumption / Riskを必要範囲で示して進めます。

逆に、次は原則として質問しません。

- `Core Decision` / `High-cost Decision`という分類だけを理由にする
- 一方が明らかに安全・妥当・低Costで、Userが選ぶ実質的な意味がない
- Repository確認やResearchで答えを絞れる
- 後から容易に変更できる
- File構成、Naming、標準的なError handling、Test方法等の実装詳細
- 細かなSpacing、配置、文言等で、既存方針から自然に決められる
- Existing User IntentからPreference / Directionが既に明確
- 合理的なBest Reasonable Decisionを選び、Assumption / Riskを記録して継続できる

Researchで解決できる内容を、最初からUser Preferenceとして投げ返しません。

## 質問の出し方

### SHOULD: 質問は必要なものだけに絞り、無駄なTurnを増やさない

質問が本当に必要な場合も、独立している重要判断は最大2〜3件まで同じTurnにまとめて構いません。

前の回答によって次の選択肢自体が変わる場合だけ、1件ずつ順番に確認します。

質問する場合は原則として:

1. 今何を決めるか
2. 2〜3個の意味のある選択肢
3. おすすめ案が残るならその案
4. なぜUser回答が必要なのかを短く説明

の順にします。

User回答なしでも合理的に決められるなら、このQuestion Formatを使うためだけに質問を作りません。

## 会話の長さとSummary

### MUST: 要件定義の各Turn末尾で今回の決定を短く要約する

説明が長くなっても、最後だけで今回何が決まったか分かるようにします。

原則としてTurn末尾に次を短く示します。

```text
今回決まったこと
- 今回新しく確定した内容
- 必要なら次に決める内容
```

毎回過去の全決定を再掲しません。

- 各Turn: 今回新しく決まったことだけ
- 大きな区切り: ここまでの主要確定事項を短く整理
- 要件定義完了時: 全体Summary + 正式な`REQUIREMENTS.md`へ反映

長い理由説明より、**決定内容が見失われないこと**を優先します。

## 標準の進行順

Projectに合わない項目は省略できますが、原則として後から変えるCostが高い順に進めます。

1. Productの核 / 目的
2. 主な利用者（内容へ大きく影響する場合）
3. MVP / 主要機能
4. 主要利用フロー
5. High-cost / Risk Decision
6. 主要画面 / Navigation
7. 主要Data / 保存
8. Visual Directionの大枠
9. 崩してはいけない仕様
10. 重要な非機能要件
11. 観測可能な完成条件
12. 未確認事項

要件定義では「何を作るか / 何を守るか」を決め、CSS値・関数名・内部変数等の「どうCodeにするか」まで決めすぎません。

## Requirements Research

### Existing Project

既存Projectでは、要件定義を始める前にCurrent Repositoryを確認します。

必要範囲だけ次を確認します。

- README / Requirements / Spec / Project Rules
- `PROJECT_LEARNINGS.md`
- 現在の主要実装
- Storage / Schema / Deployment等、今回の判断に関係する部分

過去会話や古いZIPだけを現在仕様として扱いません。

### Researchable Question

外部情報、既存研究、実Product / Game、User Evidence等によって答えが変わり得る重要Questionは、最初からSolution案だけを比較せず [20 Evidence-first Research](20-evidence-first-research.md) へRoutingします。

一般Research Methodの正本は`docs/20`です。この章ではQuick / Standard / Deepの探索方法、Source Quality、Opposing Evidence、Bias、Saturation、Evidence Map等を重複定義しません。

例:

- Browser / Platform / API / Providerの現在仕様
- Security / License / 法令
- Architecture / 技術選定
- UI / UX / Tutorial / Onboarding
- Game Design / Progression / Difficulty
- 学習方法・教材構成
- 正解が明確でない重要な改善判断

Visual固有のReference framing / KEEP・FIX・REMOVE / Candidate比較は [18 Domain-first Visual Research](18-domain-first-visual-research.md)、Game固有設計 / Actual Playtestは [19 Game Development](19-game-development.md) の責務を維持します。

```text
Current Repository / Project Context
→ User PreferenceかResearchable Questionか分類
→ Researchable QuestionならEvidence-first Research
→ Project固有条件を含めBest Reasonable Decision
→ Confirmed RequirementをREQUIREMENTS.mdへ反映
```

細かなDefault Decisionや原因と正解が明確な局所修正のために、Researchを機械的に重くしません。

## Repository-backed Requirements Checkpoint

### MUST: 要件定義を会話だけに保持しない

対象Repositoryを一意に特定でき、GitHubへ書き込める状態では、要件定義中の現在状態をRepository rootの`REQUIREMENTS_DRAFT.md`へ**意味のある区切りごとにCheckpoint保存**します。

`REQUIREMENTS_DRAFT.md`は進行中の要件差分を復元するためのCheckpointであり、正式な要件のSource of Truthではありません。正式要件の正本は引き続き`REQUIREMENTS.md`です。

### Checkpoint Timing

次のいずれかでは、追加の「保存する？」確認を挟まず、現在状態をDraftへ作成または統合更新します。

- Core / High-cost / 主要MVP / 主要Flow等、**意味のある決定群が確定した区切り**
- Userが保存を明示したとき
- 別の相談・調査会話へ移る前
- 要件定義以外の長い作業へ移る前など、会話Contextだけでは復元Riskが高くなるとき
- Userが`要件定義終わり`等で完了を明示した直後、正式化処理へ入る前

各Turnを機械的にCommitしません。短い間隔で連続して確定したDecisionはまとめて1つのCheckpointにして構いません。

重要なのはCommit数を増やすことではなく、**会話が失われてもRepositoryから直近の要件状態を復元できること**です。

### Draftへ残す内容

- ここまでで確定した新しいDecision
- まだ未確定のCore Decision / High-cost Decision
- 既存正式要件から変更しようとしている項目
- 重要な変更理由 / 衝突
- 次に決めるべき項目
- 最終更新日または現在Checkpointを識別できる情報

会話ログ全文や長い議論は保存しません。

既存`REQUIREMENTS_DRAFT.md`がある場合は、現在状態を統合更新し、古いDraftを無条件で上書き・消去しません。

### MUST: Checkpoint保存成功を確認する

GitHubへのDraft書き込みが失敗した場合は、保存済みとして扱いません。

- 失敗理由を明示する
- 会話移行や正式化の前なら、復元不能な状態を隠さない
- 書き込み権限・Repository特定等、解決できる問題はUserへ同じ情報を聞き返す前に利用可能なEvidenceで解決する

### MUST: 再開時はRepositoryから復元する

要件定義を再開するときは、古い会話SummaryやMemoryを正本にせず、原則として次を確認します。

1. 最新Guideの必要Rule
2. 対象Repositoryの正式`REQUIREMENTS.md`
3. `REQUIREMENTS_DRAFT.md`が存在する場合はその未確定差分
4. README / SPEC / Project Rules / `PROJECT_LEARNINGS.md` / 現在実装等、今回の判断に必要なCurrent Repository Evidence

GitHubへ保存済みの確定Decisionを最初から聞き直しません。質問は、Repository / Requirements / Existing User Intent / Evidenceでも合理的に解けないUser-only Material Decisionへ絞ります。

## 要件定義の完了ライン

要件定義は、**実装担当が大きな判断で迷わず作業を開始できる状態**になれば完了とします。

最低限、Projectに該当する次が決まっていることを確認します。

- Productの核
- 主な利用者
- MVP
- 主要利用フロー
- High-cost / Risk Decision
- 主要画面
- 主要Data / 保存
- 崩してはいけない仕様
- 重要な非機能要件
- 完成条件

CSS値、class名、Function名、Componentの細分化等の実装詳細は、特別な理由がなければ実装段階へ回します。

未解決のBlocking Decisionがある場合は、完成扱いせず明示します。Core / High-cost分類だけを理由に未解決扱いしません。

完了時は全体を短く要約し、Projectの正式な`REQUIREMENTS.md`へ反映します。

## 要件定義完了 → GitHub保存 → 実装会話 Handoff

### MUST: 正式要件をGitHubへ保存してから実装へ進む

ChatGPT Project等で要件定義と実装を別会話へ分ける場合、会話履歴そのものを引き継ぎの正本にしません。

原則として次の流れを使います。

```text
Repository名（相談・調査）
→ 要件定義
→ 意味のある区切りごとにREQUIREMENTS_DRAFT.mdへCheckpoint
→ Userが「要件定義終わり」等、完了を明示
→ 最新CheckpointをGitHubへ保存して成功確認
→ 完了条件 / Blocking Decisionを確認
→ 対象Repositoryの正式なREQUIREMENTS.mdへ統合
→ GitHubへの正式保存成功を確認
→ Draftを解消
→ Implementation HandoffをReadyにする
→ 置換済みの実装会話開始Promptを自動で出す
→ Repository名（実装）の新しい会話
→ 最新Guide + Current Repository + REQUIREMENTS.mdを確認
→ 実装開始
```

各Turnを毎回GitHubへCommitする必要はありません。ただし、正式化する瞬間まで一度もRepositoryへ保存しない運用にはしません。要件定義中は前述のCheckpoint Timingに従います。

### MUST: `REQUIREMENTS.md`を正式な要件のSource of Truthにする

要件定義完了時は、対象Repositoryの既存`REQUIREMENTS.md`を確認し、今回確定した内容を統合します。

- 既存要件を理由なく丸ごと作り直さない
- 現在も有効な過去要件を消さない
- 今回変更した要件、必要な変更理由、未確認事項を残す
- README / SPEC等と重大な矛盾がある場合は、既存の優先順位とEvidenceで解決できるか先に確認し、それでも安全に解けない場合だけUser確認を行う
- 仕様変更が確定した場合は、必要な関連文書も現行仕様と一致させる
- 会話ログや長い議論の全文は保存せず、実装に必要な決定を残す

別の`HANDOFF.md`等へ同じ正式要件を複製しません。Implementation PromptはSource of Truthではなく、正式文書へ到達するためのRouterです。

### MUST: 保存成功を確認するまで完了扱いにしない

GitHubへの書き込みが失敗した場合、`保存済み`または`要件定義完了`として扱いません。

- 保存失敗理由を明示する
- 正式要件がGitHubへ反映されていない状態で実装開始を案内しない
- 古い会話やMemoryを代替Source of Truthとして実装を始めない

### Implementation Handoff Status

正式要件には、実装を開始できる状態か判断できる短いHandoff情報を持たせます。

推奨形式:

```md
## Implementation Handoff

- Status: Ready for implementation / Not ready
- Requirements updated: YYYY-MM-DD
- Unresolved Blocking Decisions: None / ...
- Implementation conversation: Repository名（実装）
```

`Ready for implementation`は、GitHubへの正式保存が成功し、実装開始を妨げる未解決Blocking Decisionがない場合だけ使います。

### MUST: 完了Trigger後の保存とHandoffを追加確認待ちにしない

Userが`要件定義終わり`等で完了を明示し、要件定義の完了ラインを満たしている場合は、`保存していい？`、`実装Promptを出す？`等の確認を追加しません。

Agentは同じWorkflow内で次まで進めます。

1. 最新状態を`REQUIREMENTS_DRAFT.md`へCheckpoint保存し、成功を確認
2. 正式`REQUIREMENTS.md`へ今回の確定内容を統合
3. GitHubへの正式保存成功を確認
4. `Implementation Handoff`を`Ready for implementation`へ更新可能か確認
5. 不要になったDraftを解消
6. [Implementation Conversation Handoff Template](../templates/IMPLEMENTATION_CONVERSATION_TEMPLATE.md) を置換した完成済みPromptを出力

Repository / Requirements / Evidenceでも解けないBlocking Decision、重大な文書衝突、GitHub書き込み失敗がある場合だけ、そのBlockerを示してHandoffを止めます。

### Implementation Conversation Prompt

要件定義完了後、新しい実装会話へ移る場合は [Implementation Conversation Handoff Template](../templates/IMPLEMENTATION_CONVERSATION_TEMPLATE.md) を使います。

正式保存とHandoff Readyの確認に成功したら、AgentがRepository URL / Full Name / Repository Nameを置換した完成済みPromptを**自動で出力**します。Userへ長い会話Summaryをコピーさせたり、Prompt出力の要否を再確認したりしません。

実装会話では、Prompt自体ではなく次を確認してから作業を始めます。

1. 最新の`EliteMay/web-project-guide`の`README.md` / `START_HERE.md`
2. 対象Repositoryの現在のGitHub状態
3. 正式な`REQUIREMENTS.md`
4. 変更に関係するREADME / SPEC / Project Rules / `PROJECT_LEARNINGS.md` / 実装

### REQUIREMENTSと現在実装が食い違う場合

正式な`REQUIREMENTS.md`は「これから実現する正式な要件」、現在のCode / Runtimeは「現在どうなっているかを確認するEvidence」として扱います。

- 未実装なだけ → 要件に従って実装してよい
- 軽微な古い記述 / Document差 → 現行要件へ合わせて必要な文書を更新してよい
- 保存互換性破壊、主要機能削除、大きな既存挙動変更等 → Current Requirements / Existing User Intent / EvidenceからBest Reasonable Decisionを選び、必要なImpact / Rollback / Validationを強める
- 重大な衝突がEvidenceでも解けず、User-only Material Intentが必要 → User確認

現在Codeが違うという理由だけで、正式要件を無視しません。一方で、要件が新しいという理由だけで既存データや重要仕様を破壊しません。

### Draft要件

`REQUIREMENTS_DRAFT.md`の作成・更新Timingと再開時の読み方は、前述の [Repository-backed Requirements Checkpoint](#repository-backed-requirements-checkpoint) を正本とします。

会話移行時は、移行直前の最新状態までDraftへ反映し、GitHubへの保存成功を確認してから [Requirements Conversation Resume Template](../templates/REQUIREMENTS_CONVERSATION_TEMPLATE.md) を置換したPromptを出します。

```text
Repository名（相談・調査）
→ 要件定義中のMeaningful CheckpointをDraftへ保存
→ 新しい相談・調査会話へ移る直前に最新Checkpointを保存確認
→ Requirements Conversation Resume Templateを置換
→ 新しいRepository名（相談・調査）
→ REQUIREMENTS.md + REQUIREMENTS_DRAFT.md + Current Repositoryを確認
→ 保存済みDecisionを聞き直さず未確定事項から再開
```

### MUST: Draftを実装開始に使わない

- Draftを`Ready for implementation`にしない
- Draftを正式な実装開始Source of Truthとして扱わない
- 新しい要件定義会話では正式`REQUIREMENTS.md`を基準にし、Draftは未確定差分として読む
- Draftだけ残っている状態では実装開始を案内しない

### MUST: 要件定義完了時にDraftを解消する

Userが`要件定義終わり`等で完了を明示した場合は、Draftの有無にかかわらず、正式化の直前に最新状態がRepositoryから復元可能か確認します。

Draftが存在する場合は次を行います。

1. 正式`REQUIREMENTS.md`とDraftを確認
2. 今回確定した内容を正式要件へ統合
3. README / SPEC等の重大な矛盾をCurrent Requirements / Evidenceで解けるか確認
4. 正式`REQUIREMENTS.md`をGitHubへ保存
5. 正式保存成功を確認
6. Implementation Handoffを`Ready for implementation`へ更新可能か確認
7. 不要になった`REQUIREMENTS_DRAFT.md`を削除、または明確にSupersededとして実装Sourceから外す
8. 実装会話用Promptを自動生成

正式`REQUIREMENTS.md`の保存成功前にDraftを削除しません。正式保存またはDraft解消に失敗した場合は、その状態を明示し、完全なHandoff完了として扱いません。

Userが`新しい相談・調査会話へ移りたい`等と明示した場合、重大なBlockerやGitHub書き込み失敗がなければ、追加の保存確認質問を増やさず、最新Draft保存 → 保存確認 → 再開Prompt生成まで進めます。

### 実装中に大きな仕様変更が必要になった場合

実装中にCore Decision / High-cost Decision相当の大きな仕様変更が必要になった場合は、まずCurrent Requirements / Existing User Intent / EvidenceからBest Reasonable Decisionで要件を更新できるか判断します。

要件を再整理する必要がある場合は、`Repository名（相談・調査）`側へ戻して正式Requirementsを更新します。Core / High-costという分類だけを理由にUser回答待ちへしません。

```text
Repository名（実装）
→ 大きな仕様変更が必要
→ 必要ならRepository名（相談・調査）
→ 要件更新 / Best Reasonable Decision
→ 正式REQUIREMENTS.mdをGitHubへ保存
→ Ready for implementationを再確認
→ Repository名（実装）へ戻る
```

細かなUI配置、Naming、File分割、一般的なError Handling等のDefault Decisionまで毎回要件定義へ戻しません。

## 小規模な修正

小さな修正で毎回フルの要件定義をやり直す必要はありません。

最低限、以下だけ確認します。

- 何を直すか
- どこまで影響するか
- 保存データや互換性へ影響するか
- 既存仕様を壊さないか
- 完了条件は何か

## 先に決めるべき高コスト項目

後から変えると修正コストが高い項目は、見た目より先に決めます。

1. 保存データSchema
2. ID体系
3. 座標・時間・単位などの内部表現
4. GitHub Pages対応有無
5. 外部API依存
6. 大容量メディアの保存先
7. 主要画面のレイアウト原則
8. 既存データ互換性
9. 自動処理の評価方法
10. Webだけで完結するか、Electron等が必要か

## Visual Design Direction

### CONDITIONAL: Visual Directionが完成度へ大きく影響するProject

要件定義では、Visualの完成形を細かく決めるのではなく、最低限次だけ記録します。

- Visual Quality Baseline: Required / Not applicable
- Visual Ambition: baseline / high / flagship
- Primary Task / Content Model / Audience
- 現在UIがある場合の大きな制約・残したい要素
- Visual Researchが必要な変更か

意味のある新規Design / 大規模Redesignでは、実装前の調査Workflowを [Domain-first Visual Research](18-domain-first-visual-research.md)、Design原則を [UI / UX / Accessibility](04-ui-ux-accessibility.md) の正本で確認します。

要件定義へReference候補、2〜3案比較、Effect方針等の詳細手順を重複記載しません。

## Learning / Explanation Content

### CONDITIONAL: `LEARNING` Profile

学習・解説・知識集サイトでは、**教材件数や画面数だけで完成条件を決めません。** 実装前に最低限次を決めます。

- **Starting Knowledge:** 利用者が最初から知っている前提 / 知らない前提
- **Prerequisite Path:** 固有用語を教える前に必要な一般概念と学習順
- **Primary Learning Surface:** Dashboard / 一覧ではなく、実際に読む・考える・解く中心画面
- **Language / Terminology Policy:** 学習者へ見せる言語、英語・略語・内部Labelをそのまま露出してよい条件
- **Content Depth Contract:** 主要Lessonをどの深さまで説明すれば「教えた」と扱うか
- **Understanding Signal:** 読了、確認問題、自己理解度等のどれを「進捗」として扱うか
- **Next Step / Review Path:** Lesson後に何をするか、誤答や低理解度をどう復習へ戻すか

### Content Depth Contract

主要Lessonが用語の1行定義だけで終わると、Dataとして存在していても学習教材としては不足しやすくなります。

原則として主要Lessonでは、内容に応じて次を組み合わせます。

1. **何か** — まず短く定義する
2. **なぜ必要か** — 何の問題を解決するか
3. **どう動くか / どう考えるか** — 手順・関係・仕組み
4. **具体例** — 実際の場面へ対応付ける
5. **比較 / よくある勘違い** — 似た概念との差を必要に応じて示す
6. **理解確認** — 1問、説明し直す、判断する等で理解を確認する

すべてのGlossary項目へ同じ長さを強制しません。短い用語辞典と、理解させるためのLessonは役割を分けます。

### Beginner-first Ordering

初心者向けSiteでは、製品名・専門サービス名・試験用語から始める前に、その理解へ必要な一般概念を確認します。

例:

```text
Webの基本
→ Server / Network / DNS / Database / API
→ 製品固有Service
→ 構成例
→ 判断問題
```

前提知識が不足している利用者へ固有名詞だけを増やさないことを重視します。

### Learner-facing Copy

学習者向け画面では、開発者向け状態名・英語Content Type・内部監査用Copy等を通常表示へそのまま出しません。

英語や略語自体を学ぶ必要がある場合は、隠すのではなく日本語説明・読み方・意味・利用場面を添えます。

## Game Requirements

### CONDITIONAL: `GAME` Profile

GameではFeature数やMap数だけで完成条件を決めず、**開始からPrimary Completion Conditionまで中心体験が成立するGame Contract**をRequirementsで整理します。

最低限、Game規模に応じて次を決めます。

- **Core Experience:** Playerに最も楽しませたい中心体験
- **Supporting Systems / Non-goals:** Core Experienceを支えるもの / Gameを何にしないか
- **Playable MVP:** 最初にEnd-to-Endで成立させる中心Gameplay Flow
- **Primary Completion Condition:** Main Game Completeを判定する主要Goal
- **Core Loops / Progression:** Moment-to-Moment / Core Gameplay / Progressionを必要な範囲で整理
- **Game State / Failure:** Persistent / Session / Derivedの意味、Failure時のLoss / Retry / Recovery
- **Save / Compatibility:** 永続Saveがある場合のSave / Reload / Existing Save要件
- **Difficulty / Balance Direction:** 何を難しさとして使うか、Adjustable Parameterの扱い
- **Runtime / Scale:** Entity / Physics / VFX / Scene等、規模に応じた主要Performance条件
- **Development Phases:** Phaseごとの完成Gameplay FlowとPhase Gate

Prototype / Playable MVP / Main Game Completeを混同しません。小規模GameへLong-running Save、LOD、Stress Test等を機械的に追加しません。

Game-specificなProgression、Simulation、Gameplay Readability、Actual Playtest、Phase Gate等の詳細は [19 Game Development](19-game-development.md) を唯一の正本とし、この章へ重複記載しません。

## MVP

初期版では「主要な1本の利用フロー」が最後まで通ることを優先します。

例:

```text
登録 → 保存 → 一覧 → 編集 → 削除 → バックアップ
```

未実装画面を先に大量に作らず、使える導線を完成させます。

## 非機能要件

必要に応じて以下も決めます。

- 対応ブラウザ
- PC / スマホ / ペンタブ
- オフライン可否
- データ量の想定
- 画像/動画最大サイズ
- 初期表示速度
- キーボード操作
- バックアップ
- 外部サービス停止時の挙動
- GitHub Pages公開可否
- 秘密情報の有無
- Visual Qualityの重要度
- Design Direction比較が必要か

## 完成条件の書き方

「見た目が整った」ではなく、観測可能な条件にします。

悪い例:
- 使いやすい
- モダンで高品質に見える

良い例:
- 主要ボタンがすべて反応する
- 320px幅でページ全体の横スクロールが発生しない
- 保存後に再読み込みしてもデータが残る
- GitHub ActionsのStatic Validationが成功する
- 未確認項目が作業報告書へ記録されている
- Visual重視Projectでは採用Directionの理由と、調査した同種Referenceを説明できる
- Accent Colorを外しても、Typography / Spacing / Layoutで主要Hierarchyが読み取れる
- Learning Projectでは、主要LessonがStarting Knowledge / Content Depth Contractを満たす
- Learning Projectでは、学習者が次に何を学ぶか・理解確認をどこでするか説明できる
- Game Projectでは、Playable MVPのCore LoopをRuntimeでEnd-to-End確認できる
- Main Game Completeでは、Fresh StartからPrimary Completion Conditionまで主要Game Experienceを確認できる