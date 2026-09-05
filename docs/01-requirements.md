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

## Recommendation-by-default Mode

Userが`おすすめで`、`基本おすすめで`等を指定した場合、その要件定義中は**Recommendation-by-default Mode**として扱います。

- Default DecisionはAgentがおすすめを選んで進める
- 同じ種類の判断で毎回承認を求めない
- Core Decisionは引き続きUserへ確認する
- High-cost / Risk Decisionは意味のある選択肢が複数ある場合に確認する
- Userが`ここは考えたい`等と指定した項目は自動確定せず、その項目だけUser決定へ戻す

`ok` / `OK` / `それで` / `そのまま` / 選択肢記号等が直前案への承認として文脈上明確な場合、同じ確認を繰り返しません。

## 質問の出し方

### SHOULD: 1回に1つの重要判断を基本とする

複数の重要質問を一度に並べすぎません。

質問が必要な場合は原則として:

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

### Current / External Information

次のように外部情報で答えが変わる場合は、必要に応じて最新の公式情報を確認します。

- Browser / Platform対応
- GitHub Pages / Electron等の現在仕様
- API / Provider仕様
- 無料枠 / 料金
- Security
- License / 法令

### Domain Research

Site / App / Gameの分野自体を理解しないと良い要件を作れない場合は、同種ProductやDomainを必要範囲で調査します。

ただし、調査結果を理由にCore Decisionを勝手に確定しません。

```text
Existing Repository
→ web-project-guide
→ 必要なら公式情報
→ 必要ならDomain Research
→ Decision Classに従って判断
```

細かなDefault Decisionのために毎回Web調査して進行を重くしません。

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

要件定義途中の内容を保存する必要がある場合は、Draftであることを明示します。

- Draftを`Ready for implementation`にしない
- Draftを正式な実装開始Source of Truthとして扱わない
- 要件定義完了時に正式`REQUIREMENTS.md`へ統合する

原則として、途中の各Turnごとに正式`REQUIREMENTS.md`を確定版として更新し続ける必要はありません。

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
