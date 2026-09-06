# 01 要件定義

この章はProject Requirements Workflow、Decision Classification、Requirements Persistence / Handoffの正本です。

## 必須項目

新規制作では実装前に最低限次を整理します。

- 目的: 何を解決するSite / App / Gameか
- 利用者: 自分 / 友人共有 / 一般公開等
- 必要機能: MVPとLaterを分ける
- 主要利用Flow
- 画面 / Surfaceと役割
- Data / Storage
- External dependency / Deployment
- 崩してはいけない仕様
- 重要な非機能要件
- 観測可能な完成条件
- 未確認事項

結果を大きく左右しない不明点は、Current Repository / Existing User Intent / Evidenceから合理的な仮定を置き、記録して進めます。

## Agent Autonomy / Decision Contract

### MUST: Best Reasonable DecisionをDefaultにする

要件定義は「質問して承認を待つ」ことを標準Flowにしません。

```text
Current Repository
+ Current Requirements
+ Existing User Intent
+ Project Learnings / Evidence
+ Compatibility / Risk
↓
Best Reasonable Decision
↓
必要なAssumption / Riskを記録
↓
作業継続
```

Repository確認やResearchで解決できる内容をUserへ投げ返しません。

### Decision Class

判断の**影響度**を次へ分類します。Classは「必ずUserへ聞く」という意味ではありません。

#### Core Decision

変更すると別Productと言えるほど、目的・主要体験・主要利用者・主要機能の意味が変わる判断です。

例:

- Site / Appの主要目的
- GameのCore Experience
- 学習Siteで何をどこまで学べるようにするか
- 閲覧中心 / 編集中心等の大きなProduct方針

Core Decisionでも、Current Requirements・明示済みUser Intent・既存Project Contractから答えが一意に近い場合はそのまま進めます。

#### High-cost / Risk Decision

後から変えると大きな手戻り、Data互換、費用、公開事故、Security Riskにつながる判断です。

例:

- Storage Schema / Migration
- Web / Electron等Platform変更
- External DB / Auth / API / paid provider
- 公開範囲 / Login requirement
- URL / Deployment方式
- 主要機能削除
- Framework / Architecture全面変更
- 大規模Navigation / IA変更

High-costだから自動的に停止するのではなく、まず影響・Rollback・safe alternativeを評価します。

#### Default Decision

File分割、Naming、一般的Error handling、Test方法、標準的Accessibility / Performance対策、既存方針から自然に決まる細かなUI等です。

Default Decisionは原則Agentが決めて進めます。

## User Decisionが本当に必要な条件

Userへの質問は例外です。次のどれかが成立するときだけ優先します。

1. **Non-inferable preference** — EvidenceやCurrent Contextでは決められず、選択でUser体験が大きく変わる。
2. **Equal viable product directions** — 主要体験が異なる複数案が同程度に妥当で、既存Intentから選べない。
3. **Irreversible destructive decision** — Data消去、主要機能廃止、公開範囲変更等で、安全な可逆案もCurrent Contract上の答えもない。
4. **External permission / legal / billing / account confirmation** — User本人の権限・購入・公開・契約等、Agentが推測してはいけない外部Decision。
5. **Material contract conflict** — 現在の明示User要求とNon-breakable Contractが競合し、どちらを優先すべきかEvidenceから解決できない。

質問前に必ず次を試します。

- Current Repository / Requirements / Project Rulesを確認
- 過去に明示済みのUser Intentを確認
- Researchable Questionなら [20 Evidence-first Research](20-evidence-first-research.md)
- reversible / smallest-safe alternativeを検討

安全な可逆案があり、後から変更可能ならそれを採用して進めることを優先します。

### 質問するとき

必要な質問だけをまとめます。

- 今何を決めるか
- 2〜3の意味ある選択肢
- 推奨案
- 推奨理由 / Risk

同じ種類の`ok`確認を繰り返しません。

## Evidence-first Decision Classification

Decision Classとは別に、Researchが必要かを分類します。

- **User Preference** — User固有の好み。既に分かっていれば再質問しない。
- **Researchable Question** — 外部Evidenceで絞れる。`docs/20`へRouting。
- **Project-specific Decision** — Evidence + Project条件でBest Reasonable Decisionを選ぶ。
- **Confirmed Requirement** — 正式`REQUIREMENTS.md`へ反映可能。

ResearchはUser Intentを勝手に上書きしませんが、Research後に毎回User承認を必須にもしません。

## Requirements Research

### Existing Project

要件判断前にCurrent Repositoryを必要範囲で確認します。

- README / Requirements / Spec / Project Rules
- `PROJECT_LEARNINGS.md`
- Current Runtime / Data
- Storage / Schema / Deployment
- Tests / Work Report / relevant diagnostic evidence

古いConversation / ZIP / MemoryだけをCurrent Stateにしません。

### Researchable Question

Browser / Platform / API / Security / License / Architecture / UI / Game Design / Learning method等、外部Evidenceで答えが変わり得る重要Questionは [20](20-evidence-first-research.md) を使います。

Visual固有Researchは [18](18-domain-first-visual-research.md)、Game固有Design / Playtestは [19](19-game-development.md) の責務を維持します。

## 標準の進行順

後から変えるCostが高い順を基本にします。

1. Productの核 / 目的
2. 主な利用者
3. MVP / Non-goals
4. 主要利用Flow
5. High-cost / Risk Decision
6. 主要Surface / Navigation
7. Data / Storage
8. Visual Directionの大枠（該当時）
9. Non-breakable Contract
10. 非機能要件
11. Completion Contract
12. 未確認 / Assumption

CSS値、Function名、内部変数等の実装詳細まで要件で固定しすぎません。

## Requirements Persistence Gate

### MUST: Decision complete ≠ Requirements complete

Target Repositoryがあり書込み可能な要件定義では、会話でDecisionがまとまっただけでは完了扱いにしません。

```text
Requirements discussion / decision
↓
Target Repository解決
↓
Current REQUIREMENTS.md取得
↓
確定内容をCurrent Contractとして統合
↓
Repositoryへ保存
↓
Current Repositoryから再取得
↓
主要Contract / rule preservation確認
↓
Requirements Complete
```

Userが毎回「保存して」と指示することを前提にしません。TargetとSource of Truthが明確で書込み可能なら、正式保存はWorkflowの一部として実行します。

### Current Contractとして統合する

- 既存の有効Requirementを理由なく消さない。
- 今回確定した恒久Decisionだけ統合する。
- Conversation log / temporary debate /実装履歴を積まない。
- 仕様変更でREADME / Spec等が陳腐化する場合は必要な関連文書も合わせる。
- 大きなConflictは破壊的上書き前にCurrent ContractとEvidenceで解決する。

### Persistence Verification

保存後:

- Current `REQUIREMENTS.md`を再取得できる
- 今回の主要Contractが存在する
- 既存Current Contractを不必要に失っていない
- temporary historyが混入していない

保存失敗を`保存済み`と表現しません。

## 要件定義の完了ライン

実装担当が大きな判断で迷わず開始できる状態を完了とします。

最低限:

- Product core
- User / Scope
- MVP / Flow
- Major high-cost constraints
- Surface
- Data / Storage
- Non-breakable contract
- Non-functional requirements
- Completion conditions

Open Decisionが残っていても、実装を妨げずsafe defaultで進められるものはAssumptionとして記録してReadyにできます。

**本当に実装を止めるOpen Decision**だけ`Blocking Decision`として区別します。

## Implementation Handoff

推奨形式:

```md
## Implementation Handoff

- Status: Ready for implementation / Not ready
- Requirements updated: YYYY-MM-DD
- Blocking Decisions: None / ...
- Important Assumptions: None / ...
- Implementation conversation: Repository名（実装）
```

`Ready`は正式保存が確認でき、実装を止めるBlocking Decisionがない場合に使います。

新しい実装会話ではPrompt本文を第二Source of Truthにせず、Current Repository +正式Requirementsを読みます。

Template: [Implementation Conversation Handoff](../templates/IMPLEMENTATION_CONVERSATION_TEMPLATE.md)

## Requirements Draft / Conversation移行

要件定義途中で会話を移す必要がある場合、必要に応じてRoot `REQUIREMENTS_DRAFT.md`をCheckpointとして使えます。

Draftは正式Requirementsではありません。

保存内容:

- ここまでの新しいDecision
- 未確定 / Blocking候補
- 既存Requirementから変更検討中の項目
- 重要Conflict / Assumption
- 次に確認する内容

Conversation log全文を保存しません。

移行時:

```text
Current Requirements + Draft整理
→ Draft保存
→ 保存確認
→ Resume Prompt
→ 新会話でCurrent Repo + Requirements + Draftを読む
```

要件完了時は正式`REQUIREMENTS.md`へ統合・保存確認後に不要Draftを削除します。正式保存前にDraftを削除しません。

## REQUIREMENTSとCurrent Runtimeが食い違う場合

- 未実装なだけ → Current Requirementへ実装
- 軽微なDocument drift → Current Contractへ同期
- Existing Save / major feature / URL等へ重大影響 → compatibility / rollbackを確認
- それでも一意に決められないProduct preference / destructive conflict → User Decision

Current Runtimeが違うだけで正式Requirementを無視せず、Requirementが新しいだけでExisting Dataを壊しません。

## 小規模修正

毎回Full Requirementsをやり直しません。

最低限:

- 何を直すか
- Scope / impact
- Data / compatibility影響
- Non-breakable contract
- Completion condition

## Visual Requirement

CONDITIONAL: Visual Directionが完成度へ大きく影響する場合、Requirementsでは最低限次を決めます。

- Visual Baseline: required / not applicable
- Ambition: baseline / high / flagship
- Primary Task / Content Model / Audience
- Existing UIの大きなconstraint / keep item
- Meaningful Visual Researchが必要か

詳細は [Visual Requirement Pack](../templates/requirements/VISUAL.md)、Visual Researchは [18](18-domain-first-visual-research.md) を使います。

## Learning / Explanation Content

CONDITIONAL: `LEARNING` Profileでは教材件数だけで完成を決めません。

最低限:

- Starting Knowledge
- Prerequisite Path
- Primary Learning Surface
- Language / Terminology Policy
- Content Depth Contract
- Understanding Signal
- Next Step / Review Path

### Content Depth

主要Lessonは内容に応じて:

1. What
2. Why
3. How / mechanism
4. Example
5. Comparison / misconception
6. Understanding check

を組み合わせます。GlossaryとLessonを同じ深さへ強制しません。

### Beginner-first Ordering

初心者向けでは製品固有名詞の前に必要な一般概念を置きます。

### Learner-facing Copy

内部Label / developer terminologyを通常学習UIへそのまま露出しません。学ぶ必要がある英語・略語は意味 /利用場面を添えます。

詳細Inputは [Learning Requirement Pack](../templates/requirements/LEARNING.md) を使います。

## Game Requirements

CONDITIONAL: `GAME`ではFeature数でなく、開始からPrimary Completion Conditionまでの体験Contractを定義します。

最低限、規模に応じて:

- Core Experience / Intended Player Demand
- Supporting Systems / Non-goals
- Playable MVP
- Primary Completion Condition
- Core / Progression Loop
- Game State / Failure / Recovery
- Save / Compatibility（該当時）
- Difficulty / Balance Direction
- Runtime / Scale
- Development Phase / Gate

Prototype / Playable MVP / Main Game Completeを混同しません。詳細は [19 Game Development](19-game-development.md)、Inputは [Game Requirement Pack](../templates/requirements/GAME.md) を使います。

## Non-functional Requirements

必要に応じて:

- Browser / Runtime / Device
- Offline
- Data / Media scale
- Load / Runtime performance
- Keyboard / Accessibility
- Backup / Restore
- External provider failure
- Deployment
- Security / privacy
- Visual ambition
- Real-device requirement

## Completion Conditionの書き方

観測可能にします。

悪い:

- 使いやすい
- モダン

良い:

- 主要FlowがEnd-to-Endで通る
- Narrow viewportで重大overflowがない
- Save→Reloadが成立
- Required CI / browser / visual / playtest / real-device checkが成功、または未確認明記
- LearningならContent Depth / Next Stepを確認できる
- GameならPlayable MVP / Primary Completion ConditionをRuntimeで確認できる
