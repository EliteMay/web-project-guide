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
重要な仕様だけ確認します。

## 対話型要件定義 Workflow

ChatGPT / Coding Agentと会話しながら要件定義する場合は、**重要な判断だけUserへ確認し、それ以外はおすすめ案を採用して進める**ことを基本とします。

目的は、質問を増やしすぎずにUserがProjectの核を保持し、実装前に必要な大きな判断だけ確実に決めることです。

### Decision Class

要件定義中の判断を次の3種類へ分けます。

#### Core Decision — Userが決める

変更すると「別のSite / App / Game」と言えるほど、目的・主要体験・主要利用者・主要機能の意味が変わる判断です。

例:

- Site / Appの一番の目的
- Gameで何をして楽しむか
- 学習Siteで何をどう学べるようにするか
- 戦闘中心 / 自動化中心 / 探索中心等の主要体験
- Single / Multi、閲覧中心 / 編集中心等の大きな機能方針
- 利用者が変わることで内容自体が大きく変わる場合のTarget Audience

### MUST: Core Decisionは勝手に確定しない

Agentはおすすめ案を示してよいですが、Core DecisionはUserの回答を待ちます。

判断に迷う場合は次を基準にします。

> ここを変えると、Userが想像していたProductとは別物になるか？

YESならCore Decisionとして扱います。

#### High-cost / Risk Decision — 原則Userへ確認

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

ただし、実質的に安全な選択肢が1つしかない場合は、理由を短く説明してAgentが進めて構いません。

Userが選ぶ意味のある選択肢が2つ以上ある場合に確認を優先します。

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

- **User Preference** — Userが決める。ResearchはPreferenceそのものを上書きしない
- **Researchable Question** — 既存Evidenceがあり得るため [20 Evidence-first Research](20-evidence-first-research.md) を先に使う
- **Project-specific Decision** — Research結果とProject固有条件を見てUser + AIでDiscussionする
- **Confirmed Requirement** — 決定した内容を正式な`REQUIREMENTS.md`へ反映する

Core DecisionでもResearchableな部分はResearchできますが、Research結果だけでUser Intentを自動確定しません。

## Recommendation-by-default — 標準動作

要件定義は、Userが毎回`おすすめで`と指定しなくても、原則として**Recommendation-by-default**で進めます。

- Default DecisionはAgentがおすすめを選んで進める
- 明らかに安全・妥当な推奨案がある場合は、承認待ちにせず採用する
- 同じ種類の判断で毎回`ok` / `OK`等の承認を求めない
- Core DecisionはUserへ確認する
- High-cost / Risk Decisionは、意味のある選択肢が複数ある場合に確認する
- Userの好みだけで決まり、見た目・体験・主要挙動へ明確な差が出るうえ、既存Contextから好みを推定できない場合は確認する
- Userが`ここは考えたい`、`毎回確認して`等で自動決定を止めた範囲だけ、確認中心へ切り替える

通常は判断の大半をAgent側で進め、Userへの質問は例外にします。目安として8〜9割程度をAgent側で決めても構いませんが、**質問数や自動決定率をQuotaにはしません**。Decisionの影響度を優先します。

`ok` / `OK` / `それで` / `そのまま` / 選択肢記号等が直前案への承認として文脈上明確な場合、同じ確認を繰り返しません。

### MUST: 質問する閾値を高く保つ

次のいずれかに該当する場合だけ、Userへの確認を優先します。

1. **Productの核が変わる** — 目的、主要体験、主要利用者、主要機能の意味が変わるCore Decision
2. **後戻りCostまたはRiskが高い** — 大規模な作り直し、データ互換性、費用、公開範囲、Security、Migration等へ影響し、意味のある選択肢が複数ある
3. **User Preferenceが決定要因** — 技術・Evidenceでは絞れず、選択によってUserが直接感じる体験差が大きい
4. **既存の明示要件と衝突する** — 現在のUser要求、崩してはいけない仕様、正式Requirementsのどれを優先すべきか自動判断すると破壊的になり得る
5. **不可逆または破壊的** — 主要機能削除、保存Data破棄、公開状態変更等で、誤判断した場合の復旧Costが高い

実用上の最終判定は次を使います。

> Userが後から知ったときに「そこは勝手に決めるべきではなかった」と合理的に感じる可能性が高いか？

YESなら確認します。NOなら、原則としておすすめ案を採用して進めます。

逆に、次は原則として質問しません。

- 一方が明らかに安全・妥当・低Costで、Userが選ぶ実質的な意味がない
- 後から容易に変更できる
- File構成、Naming、標準的なError handling、Test方法等の実装詳細
- 細かなSpacing、配置、文言等で、既存方針から自然に決められる
- ResearchやCurrent Repository確認で先に答えを絞れる重要Question

Researchで解決できる内容を、最初からUser Preferenceとして投げ返しません。

## 質問の出し方

### SHOULD: 質問は必要なものだけに絞り、無駄なTurnを増やさない

質問が必要な場合も、独立している重要判断は最大2〜3件まで同じTurnにまとめて構いません。

前の回答によって次の選択肢自体が変わる場合だけ、1件ずつ順番に確認します。

質問する場合は原則として:

1. 今何を決めるか
2. 2〜3個の意味のある選択肢
3. おすすめ案
4. おすすめ理由を短く説明

の順にします。

例:

```text
今決めること: Gameの中心

A. 探索中心
B. 自動化中心 ← おすすめ
C. 戦闘中心

おすすめ: B
理由: 工場・効率化要素を主要体験として活かしやすいため。
```

選択肢の差が小さく、Userが選ぶ価値が低い場合は質問せずDefault Decisionとして進めます。

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
→ Project固有条件を含めDiscussion
→ Confirmed RequirementをREQUIREMENTS.mdへ反映
```

細かなDefault Decisionや原因と正解が明確な局所修正のために、Researchを機械的に重くしません。

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

未解決のCore Decision / High-cost Decisionがある場合は、完成扱いせず明示します。

完了時は全体を短く要約し、Projectの正式な`REQUIREMENTS.md`へ反映します。

## 要件定義完了 → GitHub保存 → 実装会話 Handoff

### MUST: 正式要件をGitHubへ保存してから実装へ進む

ChatGPT Project等で要件定義と実装を別会話へ分ける場合、会話履歴そのものを引き継ぎの正本にしません。

原則として次の流れを使います。

```text
Repository名（相談・調査）
→ 要件定義
→ Userが「要件定義終わり」等、完了を明示
→ 完了条件 / 未解決Decisionを確認
→ 対象Repositoryの正式なREQUIREMENTS.mdへ統合
→ GitHubへの保存成功を確認
→ Implementation HandoffをReadyにする
→ 置換済みの実装会話開始Promptを出す
→ Repository名（実装）の新しい会話
→ 最新Guide + Current Repository + REQUIREMENTS.mdを確認
→ 実装開始
```

要件定義中の各Turnを毎回GitHubへCommitする必要はありません。正式版へ反映する標準の合図は、Userが`要件定義終わり`等で完了を明示した時点とします。

### MUST: `REQUIREMENTS.md`を正式な要件のSource of Truthにする

要件定義完了時は、対象Repositoryの既存`REQUIREMENTS.md`を確認し、今回確定した内容を統合します。

- 既存要件を理由なく丸ごと作り直さない
- 現在も有効な過去要件を消さない
- 今回変更した要件、必要な変更理由、未確認事項を残す
- README / SPEC等と重大な矛盾がある場合は、破壊的に上書きせず確認する
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
- Unresolved Core Decisions: None / ...
- Unresolved High-cost Decisions: None / ...
- Implementation conversation: Repository名（実装）
```

`Ready for implementation`は、GitHubへの正式保存が成功し、実装開始を妨げる未解決Decisionがない場合だけ使います。

### Implementation Conversation Prompt

要件定義完了後、新しい実装会話へ移る場合は [Implementation Conversation Handoff Template](../templates/IMPLEMENTATION_CONVERSATION_TEMPLATE.md) を使います。

可能ならAgentがRepository URL / Full Name / Repository Nameを置換した完成済みPromptをそのまま出します。Userへ長い会話Summaryをコピーさせる必要はありません。

実装会話では、Prompt自体ではなく次を確認してから作業を始めます。

1. 最新の`EliteMay/web-project-guide`の`README.md` / `START_HERE.md`
2. 対象Repositoryの現在のGitHub状態
3. 正式な`REQUIREMENTS.md`
4. 変更に関係するREADME / SPEC / Project Rules / `PROJECT_LEARNINGS.md` / 実装

### REQUIREMENTSと現在実装が食い違う場合

正式な`REQUIREMENTS.md`は「これから実現する正式な要件」、現在のCode / Runtimeは「現在どうなっているかを確認するEvidence」として扱います。

- 未実装なだけ → 要件に従って実装してよい
- 軽微な古い記述 / Document差 → 現行要件へ合わせて必要な文書を更新してよい
- 保存互換性破壊、主要機能削除、大きな既存挙動変更、どちらが正しいか不明 → User確認を優先

現在Codeが違うという理由だけで、正式要件を無視しません。一方で、要件が新しいという理由だけで既存データや重要仕様を破壊しません。

### Draft要件

要件定義途中で別の`Repository名（相談・調査）`会話へ移る必要がある場合は、必要に応じてRepository rootの`REQUIREMENTS_DRAFT.md`へ途中状態を保存します。

`REQUIREMENTS_DRAFT.md`は**未確定の引き継ぎ用Checkpoint**であり、正式要件のSource of Truthではありません。

原則フロー:

```text
Repository名（相談・調査）
→ 要件定義途中
→ Userが新しい相談・調査会話へ移りたいと明示
→ 現在までの決定 / 未確定事項を整理
→ REQUIREMENTS_DRAFT.mdを作成または統合更新
→ GitHubへのDraft保存成功を確認
→ Requirements Conversation Resume Templateを置換
→ 新しいRepository名（相談・調査）
→ REQUIREMENTS.md + REQUIREMENTS_DRAFT.md + Current Repositoryを確認
→ 未確定事項から再開
```

Draft保存の標準タイミングは**会話移行時のみ**です。同じ会話を続けている間、各TurnごとにDraftをCommitしません。

Draftへ残す内容:

- ここまでで確定した新しい決定
- まだ未確定のCore Decision / High-cost Decision
- 既存正式要件から変更しようとしている項目
- 重要な変更理由 / 衝突
- 次の会話で最初に確認すべき項目

会話ログ全文や長い議論は保存しません。

既存`REQUIREMENTS_DRAFT.md`がある場合は、今回の途中状態を統合更新し、古いDraftを無条件で上書き・消去しません。

### MUST: Draftを実装開始に使わない

- Draftを`Ready for implementation`にしない
- Draftを正式な実装開始Source of Truthとして扱わない
- 新しい要件定義会話では正式`REQUIREMENTS.md`を基準にし、Draftは未確定差分として読む
- Draftだけ残っている状態では実装開始を案内しない

### MUST: 要件定義完了時にDraftを解消する

Userが`要件定義終わり`等で完了を明示した場合、Draftが存在するなら次を行います。

1. 正式`REQUIREMENTS.md`とDraftを確認
2. 今回確定した内容を正式要件へ統合
3. README / SPEC等の重大な矛盾を確認
4. 正式`REQUIREMENTS.md`をGitHubへ保存
5. 正式保存成功を確認
6. Implementation Handoffを`Ready for implementation`へ更新可能か確認
7. 不要になった`REQUIREMENTS_DRAFT.md`を削除
8. 実装会話用Promptを生成

正式`REQUIREMENTS.md`の保存成功前にDraftを削除しません。正式保存またはDraft削除に失敗した場合は、その状態を明示し、完全なHandoff完了として扱いません。

Userが`新しい相談・調査会話へ移りたい`等と明示した場合、重大な矛盾やGitHub書き込み失敗がなければ、追加の保存確認質問を増やさず、Draft保存 → 保存確認 → 再開Prompt生成まで進めて構いません。

### 実装中に大きな仕様変更が必要になった場合

実装中にCore Decision / High-cost Decision相当の大きな仕様変更が必要になった場合は、原則として`Repository名（相談・調査）`側で要件を再整理します。

```text
Repository名（実装）
→ 大きな仕様変更が必要
→ Repository名（相談・調査）
→ 要件更新
→ 正式REQUIREMENTS.mdをGitHubへ保存
→ Ready for implementationを再確認
→ Repository名（実装）へ戻る
```
