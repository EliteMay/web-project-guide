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

結果を大きく左右しない不明点は、仮定を明記したうえで進めます。重要な判断でも、Current Repository /正式Requirements /既存User Intent / Evidenceから合理的に決められる場合は、User回答待ちを標準停止条件にしません。

## 対話型要件定義 Workflow

ChatGPT / Coding Agentと会話しながら要件定義する場合は、**Recommendation-by-default + Best Reasonable Decision**を標準とします。

目的は、Userへ細かな承認を何度も返すことではなく、User Intentを守りながら、調査・Repository確認・互換性・Riskを使って合理的に前へ進めることです。

標準Flow:

```text
Current Repository
+ Current Requirements
+ Existing User Intent
+ Evidence
+ Compatibility / Risk
↓
Best Reasonable Decision
↓
必要なAssumption / Riskを記録
↓
作業継続
```

Repository確認やResearchで解決できる内容を、最初からUser Preferenceとして投げ返しません。

## Decision Class

Decision Classは「誰が毎回止めるか」ではなく、判断の影響度を把握するために使います。

### Core Decision — Productの核

変更すると「別のSite / App / Game」と言えるほど、目的・主要体験・主要利用者・主要機能の意味が変わる判断です。

例:

- Site / Appの一番の目的
- Gameで何をして楽しむか
- 学習Siteで何をどう学べるようにするか
- 戦闘中心 / 自動化中心 / 探索中心等の主要体験
- Single / Multi、閲覧中心 / 編集中心等の大きな機能方針
- 利用者が変わることで内容自体が大きく変わる場合のTarget Audience

Core Decisionでも、Current Requirementsや明示済みUser Intentから方向が十分明確なら、そのContextを維持してAgentが決めて進めます。

### High-cost / Risk Decision

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

High-cost / Risk Decisionは自動的にUser確認へ送らず、まずCurrent Repository、既存Contract、Migration / Rollback可能性、Evidenceを確認します。安全で合理的な推奨案がある場合は理由・Assumptionを残して進めます。

### Default Decision — Agentが決める

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

Default Decisionは原則として確認待ちにしません。

## Evidence-first Decision Classification

Decision Classとは別に、その判断をResearchで先に絞るべきかを分類します。

- **User Preference** — Evidenceだけでは決まらず、Userが直接感じる差が大きいPreference
- **Researchable Question** — 既存Evidenceがあり得るため [20 Evidence-first Research](20-evidence-first-research.md) を先に使う
- **Project-specific Decision** — Research結果とProject固有条件を合わせてBest Reasonable Decisionを作る
- **Confirmed Requirement** — 決定した内容を正式な`REQUIREMENTS.md`へ反映する

ResearchはUser Intentを上書きするためではなく、不要な質問を減らして判断精度を上げるために使います。

## Recommendation-by-default — 標準動作

Userが毎回`おすすめで`と指定しなくても、原則として次を行います。

- Current Repositoryと正式Requirementsを先に確認する
- Researchで解決できる重要QuestionはResearchする
- 明らかに安全・妥当な推奨案がある場合は採用して進める
- Core / High-costという分類だけを理由に停止しない
- Userが以前に明示した目的・好み・禁止事項は既存Intentとして利用する
- Assumptionが結果へ影響する場合は短く記録する
- 後から容易に変更できるDecisionは可逆なDefaultを選ぶ
- 同じ種類の判断で毎回`ok` / `OK`等の承認を求めない
- Userが`ここは考えたい`、`毎回確認して`等で明示的に自動決定を止めた範囲だけ、確認中心へ切り替える

`ok` / `OK` / `それで` / `そのまま` / 選択肢記号等が直前案への承認として文脈上明確な場合、同じ確認を繰り返しません。

## User Confirmation Exception

### MUST: 確認を標準停止条件にしない

User確認は例外です。次を順に試しても合理的に決められない場合に限って確認します。

1. Current User Request /過去の明示Intentを確認
2. Current Requirements / Spec / Runtime / Dataを確認
3. Evidence /公式仕様 / Researchで候補を絞る
4. Compatibility / Risk / Rollbackを比較
5. 最も安全で目的に合うBest Reasonable Decisionを選ぶ

### Userへ確認する代表条件

次のいずれかに該当し、かつAgent側で安全に解消できない場合は確認します。

1. **User Preferenceだけが決定要因** — Evidenceでは絞れず、選択で主要体験が大きく変わる
2. **明示要件同士が重大に衝突** — 優先順位を適用してもどちらを捨てるか合理的に決められない
3. **不可逆・破壊的変更** — 主要機能削除、保存Data破棄、復旧困難なMigration等で安全なRollback案がない
4. **外部System / 権限 / 費用** — 購入、契約、公開範囲変更、外部Account権限等で明示的承認が必要
5. **安全・法的・Security上の明示同意が必要**
6. **必要な値が本当に欠落** — Repository / Research / Contextから推定できず、誤ると成果物が成立しない

「重要だから」「Core Decisionだから」「選択肢が2つあるから」だけでは確認理由にしません。

実用上の判定は次を使います。

> この判断は、Current ContextとEvidenceから合理的に決めて後で修正できるか？

YESなら進めます。NOで、Userにしか決められない場合だけ確認します。

## 質問の出し方

質問が必要な場合も、無駄なTurnを増やしません。

- 独立している重要判断は最大2〜3件までまとめてよい
- 前の回答で次の選択肢自体が変わる場合だけ1件ずつ確認する
- 2〜3個の意味のある選択肢 + おすすめ案 + 理由を短く示す
- Repository確認やResearchで答えられることは質問しない

## 会話の長さとSummary

要件定義の各Turn末尾では、今回新しく決まったことだけを短く要約します。

```text
今回決まったこと
- 今回新しく確定した内容
- 必要なら次に扱う内容
```

毎回過去の全決定を再掲しません。

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
12. 未確認事項 / Assumption

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

外部情報、既存研究、実Product / Game、User Evidence等によって答えが変わり得る重要Questionは [20 Evidence-first Research](20-evidence-first-research.md) へRoutingします。

Visual固有のReference framing / KEEP・FIX・REMOVE / Candidate比較は [18 Domain-first Visual Research](18-domain-first-visual-research.md)、Game固有設計 / Actual Playtestは [19 Game Development](19-game-development.md) の責務を維持します。

```text
Current Repository / Project Context
→ User PreferenceかResearchable Questionか分類
→ Researchable QuestionならEvidence-first Research
→ Project固有条件を含めBest Reasonable Decision
→ Confirmed RequirementをREQUIREMENTS.mdへ反映
```

細かなDefault Decisionや原因と正解が明確な局所修正のためにResearchを機械的に重くしません。

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

未解決事項があっても、Best Reasonable Decisionとして安全に仮定できるものはBlocking Decisionにしません。実装開始を妨げる未解決事項だけをBlockingとして明示します。

## Requirements Persistence Gate

対象Repositoryが存在し、GitHub等のCurrent Source of Truthへ書き込み可能な要件定義では、Userが毎回「保存して」と言うことを前提にしません。正式要件の保存は要件定義Workflowの一部です。

```text
Requirements discussion / decision
↓
Target Repositoryを解決
↓
Current REQUIREMENTS.mdを取得
↓
確定内容をCurrent Contractとして統合
↓
Repositoryへ保存
↓
Current Repositoryから再取得して保存結果を確認
↓
Requirements Complete
↓
Implementation Handoff
```

`Decision complete ≠ Requirements complete` とします。

### REQUIREMENTS.mdを正式なSource of Truthにする

- 既存要件を理由なく丸ごと作り直さない
- 現在も有効な過去要件を消さない
- 会話ログや長い議論ではなくCurrent Contractを残す
- README / SPEC等と重大な矛盾がある場合は破壊的に上書きしない
- 仕様変更が確定した場合は必要な関連文書も現行仕様と一致させる

保存後は再取得し、主要Contractが存在し、既存Current Contractを不必要に失っていないことを確認します。

## Implementation Handoff

RequirementsがRepositoryへ保存済みなら、次の実装会話へ要件全文を巨大Promptとして再掲しません。Implementation側はCurrent Repositoryと正式`REQUIREMENTS.md`を読みます。

推奨形式:

```md
## Implementation Handoff

- Status: Ready for implementation / Not ready
- Requirements updated: YYYY-MM-DD
- Blocking Decisions: None / ...
- Important Assumptions: None / ...
- Implementation conversation: Repository名（実装）
```

`Ready for implementation`は、正式保存が成功し、実装開始を妨げるBlocking Decisionがない場合に使います。

Implementation Conversation Promptは [Implementation Conversation Handoff Template](../templates/IMPLEMENTATION_CONVERSATION_TEMPLATE.md) を使います。Prompt自体をRequirementsの第二正本にしません。

## REQUIREMENTSと現在実装が食い違う場合

正式`REQUIREMENTS.md`はDesired State、Current Code / RuntimeはCurrent StateのEvidenceです。

- 未実装なだけ → 要件に従って実装してよい
- 軽微な古い記述 / Document差 → 現行要件へ合わせて更新してよい
- 保存互換性や主要挙動へ影響 → Migration / Rollback /正式Intentを確認しBest Reasonable Decisionを作る
- それでもどちらを捨てるか決められない重大衝突 → User Confirmation Exceptionへ送る

「Codeが違うから要件を無視する」「要件が新しいから既存Dataを破壊する」のどちらもしません。

## Draft要件

会話移行が必要で、要件がまだ正式化できない場合だけ`REQUIREMENTS_DRAFT.md`をCheckpointとして利用できます。

Draftへ残すもの:

- ここまでで確定した新しい決定
- 未確定のBlocking Decision
- 重要なAssumption
- 既存正式要件から変更しようとしている項目
- 重要な変更理由 / 衝突
- 次の会話で最初に確認すべき項目

Draftは正式要件のSource of Truthではなく、`Ready for implementation`にしません。

要件定義完了時は正式`REQUIREMENTS.md`へ統合・保存・再取得確認してから、不要になったDraftを削除します。

## 実装中に大きな仕様変更が必要になった場合

Core / High-cost相当の変更でも、Current Requirements・Evidence・Compatibilityから安全なBest Reasonable Decisionを作れる場合は、正式Requirementsを更新して実装を継続できます。

User Confirmation Exceptionに該当する変更だけ、User判断待ちにします。細かなUI配置、Naming、File分割、一般的なError Handling等のDefault Decisionまで要件定義へ戻しません。

## 小規模な修正

小さな修正で毎回フル要件定義をやり直す必要はありません。

最低限確認します。

- 何を直すか
- どこまで影響するか
- 保存データや互換性へ影響するか
- 既存仕様を壊さないか
- 完了条件は何か

## 先に決めるべき高コスト項目

後から変えると修正コストが高い項目は見た目より先に決めます。

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

High-costであることは自動停止理由ではありません。先に決め、後戻りCostを下げるための優先順位です。

## Visual Design Direction

### CONDITIONAL: Visual Directionが完成度へ大きく影響するProject

要件定義では最低限次だけ記録します。

- Visual Quality Baseline: Required / Not applicable
- Visual Ambition: baseline / high / flagship
- Primary Task / Content Model / Audience
- 現在UIがある場合の大きな制約・残したい要素
- Visual Researchが必要な変更か

意味のある新規Design / 大規模Redesignでは [Domain-first Visual Research](18-domain-first-visual-research.md) と [UI / UX / Accessibility](04-ui-ux-accessibility.md) を確認します。

## Learning / Explanation Content

### CONDITIONAL: `LEARNING` Profile

学習・解説・知識集サイトでは、教材件数や画面数だけで完成条件を決めません。最低限次を決めます。

- **Starting Knowledge**
- **Prerequisite Path**
- **Primary Learning Surface**
- **Language / Terminology Policy**
- **Content Depth Contract**
- **Understanding Signal**
- **Next Step / Review Path**

主要Lessonでは内容に応じて、何か / なぜ必要か / どう動くか / 具体例 / 比較・勘違い / 理解確認を組み合わせます。短いGlossaryと、理解させるLessonの役割を分けます。

初心者向けSiteでは、製品名・専門サービス名・試験用語の前に必要な一般概念を教えます。学習者向け画面へ開発者向け内部Labelをそのまま露出しません。

## Game Requirements

### CONDITIONAL: `GAME` Profile

GameではFeature数やMap数だけで完成条件を決めず、開始からPrimary Completion Conditionまで中心体験が成立するContractを整理します。

- **Core Experience**
- **Supporting Systems / Non-goals**
- **Playable MVP**
- **Primary Completion Condition**
- **Core Loops / Progression**
- **Game State / Failure**
- **Save / Compatibility**
- **Difficulty / Balance Direction**
- **Runtime / Scale**
- **Development Phases**

Prototype / Playable MVP / Main Game Completeを混同しません。Game固有の詳細は [19 Game Development](19-game-development.md) を正本とします。

## MVP

初期版では「主要な1本の利用フロー」が最後まで通ることを優先します。

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

「見た目が整った」ではなく観測可能な条件にします。

悪い例:
- 使いやすい
- モダンで高品質に見える

良い例:
- 主要ボタンがすべて反応する
- 320px幅でページ全体の横スクロールが発生しない
- 保存後に再読み込みしてもデータが残る
- GitHub ActionsのStatic Validationが成功する
- 未確認項目が作業報告書へ記録されている
- Visual重視Projectでは採用Directionの理由と同種Referenceを説明できる
- Learning Projectでは主要LessonがStarting Knowledge / Content Depth Contractを満たす
- Game ProjectではPlayable MVPのCore LoopをRuntimeでEnd-to-End確認できる
- Main Game CompleteではFresh StartからPrimary Completion Conditionまで主要Game Experienceを確認できる
