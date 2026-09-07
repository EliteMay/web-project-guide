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
4. **External permission / legal / billing / account confirmation** — User本人の権限・購入・契約・Account操作等、Agentが推測してはいけない外部Decision。
5. **Explicit safety / security / legal consent** — 実行前にUser本人の明示同意が必要な安全・Security・法的操作で、Agentが代わりに同意できない。
6. **Material contract conflict** — 現在の明示User要求とNon-breakable Contractが競合し、どちらを優先すべきかEvidenceから解決できない。
7. **Truly missing required value** — 作業に必須のRepository / recipient / credential-free identifier等がCurrent Repository・connected source・既存Contextから取得できず、推測すると別対象へ作用し得る。

質問前に必ず次を試します。

- Current Repository / Requirements / Project Rulesを確認
- 過去に明示済みのUser Intentを確認
- connected source / toolで解決可能な値を先に読む
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

## General Content Quality

CONDITIONAL: ContentがPrimary Taskや意思決定へ影響するProjectでは、件数・文字数・Field充足だけでContent完成を決めません。

Contentは必要に応じて次の観点でContractを持ちます。

- **Correctness** — 重大な事実誤認やCurrent Contractとの矛盾がない
- **Sufficiency** — Userの目的に必要な前提・制約・例外が不足していない
- **Relevance** — Page / Taskの目的に関係する内容へ絞られている
- **Clarity** — 対象Audienceが用語・説明・次の判断を理解できる
- **Consistency** — 別Page / Data / Documentationと重要Factが理由なく食い違わない
- **Freshness** — 時期で変わる情報は必要なCurrent Evidenceで確認されている
- **Actionability** — 手順・判断・Recoveryが必要なContentでは次に何をすべきか分かる

### Content RoleでDepthを変える

すべてのContentを同じ長さ・同じ構造へ強制しません。

```text
Quick Reference
→ 短くてよい

How-to
→ 前提 → 手順 → 成功状態 → 失敗時の対応

Explanation
→ What → Why → Mechanism → Example

Warning
→ 条件 → Risk / Impact → Avoidance / Recovery
```

Layoutを埋めるためだけの文章、内容のないFeature紹介、`Lorem ipsum`、未処理Placeholder / TODOを完成Contentとして扱いません。

### Evidence / Canonical Content Boundary

価格・制度・API・Security・Software仕様等、鮮度が重要なFactは必要に応じて [20 Evidence-first Research](20-evidence-first-research.md) でCurrent Evidenceを確認します。

同じ重要Fact / Policyを複数Pageへ独立Hardcodeし、片方だけ古くなる構造を避けます。Canonical Dataから導出できる場合はそちらを優先し、Data authority / schema詳細は [03 Data / Storage](03-data-storage.md) を正本とします。

Fact / Assumption / Recommendation / AI synthesisの区別がUserの判断へ影響する場合は、根拠のない断定や偽の精密さを避けます。

AI生成Contentも`生成できた = 品質確認済み`としません。大量Contentでは全件手作業Reviewを機械的に要求せず、Schema / structural validation、代表Sample、High-risk Content重点Review等を組み合わせられます。Validation詳細は [07 Testing / Quality](07-testing-quality.md) を正本とします。

CMS / Editorial approval system / Headless CMS等はContentがあるという理由だけで導入せず、Project規模・更新頻度・権限・運用Costに必要な場合だけ採用します。

## Product Outcome / Measurement Contract

CONDITIONAL: Productの価値や改善効果を継続的に判断する必要があるProjectでは、Analytics Toolや取得可能な数字を先に選ばず、Product GoalからUser OutcomeとObservable Signalを定義します。

```text
Product Goal
↓
User Outcome
↓
Observable Signal
↓
必要ならMetric
↓
必要ならInstrumentation
```

Page View、Click数、Session時間、登録者数等は用途によって有用ですが、数字が増えたこと自体をProduct改善とは扱いません。Primary Task Successへどれだけ近いSignalかを確認し、OutcomeとProxyを区別します。

重要Metricでは必要に応じて、何を数えるか、母数、期間、対象User / Session、Data Sourceを説明できるようにします。単一Metricへ最適化せず、Error、Performance、Accessibility、Privacy、Support burden等のGuardrailも変更Riskに応じて確認します。

「改善した」と判断する場合は可能ならBaseline / previous state / comparison conditionを持ち、Baselineがない絶対値や相関だけから因果を断定しません。

AnalyticsをすべてのProjectへ要求しません。小規模・個人ToolではManual observation、Direct feedback、既存Canonical Dataから導けるLocal Signal等で十分な場合があります。外部Tracking SDKを導入しないことも正常なDecisionです。

### Analytics / Instrumentation Contract

Measurementが必要な場合は、取得可能なEventを先に増やすのではなく、必要なEvidenceからEventを逆算します。

- UI位置や色に依存する`button_click`等より、`search_submitted`、`workout_saved`、`lesson_completed`等のProduct上の意味を優先する。
- Attempt / Success / Failure / Cancelを混同せず、成功Eventは実際の成功Boundaryに近い場所で記録する。
- 主要Metricへ使うEventほどTrigger、Property、意味、収集しないDataを説明できるContractを持つ。
- Eventの意味を大きく変える場合は新Event / version等で時系列の意味境界を作る。
- Retry、double action、re-render、offline resend等で重要Outcomeが二重計上されないかをRiskに応じて確認する。
- User identityをAnalyticsのDefault要件にせず、Session / anonymous / authenticated userのどの粒度が必要かをMetricから決める。
- Propertyを「使うかもしれない」で増やさず、必要ならbucket / category等で十分な粒度へ落とす。
- Missing telemetryをObserved zeroと同義にしない。
- Analytics Provider / SDK失敗でPrimary Taskを壊さない。
- Product AnalyticsとDevelopment Diagnosticsを目的・Payload・Retention上で区別する。Diagnosticsは [15 Development Observability](15-development-observability.md) を正本とする。
- Analytics SDKのPerformance / Provider failureは [05](05-performance-reliability.md)、Privacy / Tracking / Consent / Retentionは [06](06-security.md)、Dependency選定は [13](13-dependencies-assets.md) を正本とする。

Raw Eventは観測Evidenceであり、Product Truthそのものではありません。例えば`lesson_completed`が記録されたことだけで理解成立を断定せず、定義したOutcomeとの距離を保ちます。

## AI Feature / Output Contract

CONDITIONAL: AI / LLM / RAG / Tool Calling / AgentがPrimary Taskや重要なProduct behaviorへ影響する場合、`Modelから文字列が返った`ことをSuccessとせず、User TaskからAIの役割・期待Output・許容できるUncertainty / Failure・後段Validationを定義します。

```text
User Task
↓
AI Role
↓
Expected Output / Allowed Uncertainty
↓
Deterministic Validation where possible
↓
Userへ提示 / 保存 / Action
```

AIの役割はSuggestion、Transformation、Extraction、Classification、Generation、Decision Support、Agent Action等でRiskが異なります。同じ`AI Feature`というLabelだけでReview強度を固定しません。

- Fluentな文章をCorrectnessの証明にせず、Fact correctnessが重要ならCanonical Data / Current Evidence / Sourceとの照合Boundaryを持つ。
- Structured Outputは通常Dataと同じくParse / Schema / Type / Enum / ID / URL等を検証し、malformed outputをCanonical Dataへ自動昇格させない。
- Source不足・Context不足では`unknown / insufficient evidence / clarification needed`へFallbackできる設計を優先し、必ず答えさせてFabricationを増やさない。
- ID照合、権限判定、計算、Schema validation、固定Rule等、deterministicに解ける処理を理由なくLLMへ委譲しない。
- Grounded / source-bound FeatureではSource ScopeとAI Synthesisの境界を [20 Evidence-first Research](20-evidence-first-research.md) で維持する。
- Provider timeout / rate limit / refusal / malformed output等は通常のFailure Caseとして [05 Performance / Reliability](05-performance-reliability.md) へRoutingする。
- Model / Provider / Prompt / Tool definition / Retrieval strategy等、AI behaviorを変え得る変更は [07 Testing / Quality](07-testing-quality.md) のRepresentative Evaluation対象とする。

AI Outputを保存する場合のAuthority / Schema / Migrationは [03 Data / Storage](03-data-storage.md)、Prompt Injection / Authorization / Tool Security / Provider Data Policyは [06 Security](06-security.md)、Model / Provider lifecycleは [13 Dependencies / Assets](13-dependencies-assets.md) を正本とします。

### Agent / Tool Action Behavior

Tool-using Agentは`Tool call成功 = Task完了`とせず、User IntentからAuthorized Scopeを保ったまま外部Stateを変更します。

```text
User Intent
↓
Authorized Goal
↓
Eligible Tool / Action
↓
Validated Input
↓
Observed Result
↓
Goal達成確認
↓
Continue / Stop / Recover / Escalate
```

- Userの依頼からGoalを勝手に拡張し、不要なRename / Delete / Permission変更等の副作用を増やさない。
- Suggest / Prepare / Executeを必要に応じて分け、Readで足りるTaskへWrite / Admin Toolを使わない。
- Tool availabilityをTool necessityと同義にせず、Task達成へ必要な最小Operationを優先する。
- API成功Responseだけで完了を宣言せず、重要Mutationでは必要に応じてExternal State / operation resultを確認する。
- Bulk / multi-step ActionではSuccess / Failure / Unknown / Partial Stateを区別し、`一部失敗`を完全成功として報告しない。
- Timeout / retryでnon-idempotent Actionを二重実行しない。必要なRetry / operation ID / read-backは [05](05-performance-reliability.md) と [03](03-data-storage.md) を使う。
- Long-running AgentではGoal達成、No new evidence、retry / step / budget上限、Permission boundary、User decision required等のStop Conditionを持てる。
- UserのStop / Cancelは今後のActionを止めるBoundaryとして尊重し、既に完了したExternal Actionまで`Undo済み`と誤表示しない。
- High-impact ActionのApproval / Authorization / least privilege / Prompt Injection対策は [06 Security](06-security.md) のCurrent Contractをそのまま使う。

すべての低Risk操作へConfirmationを追加してConfirmation fatigueを作らず、Impact / Irreversibility / External side effectに応じてHuman Controlを強めます。

## Learning / Explanation Content

CONDITIONAL: `LEARNING` Profileでは教材件数やLesson閲覧だけで完成を決めません。Learning-specific research evidenceは [Learning Product Decision Research](../references/learning-product-decision-research.md) に保存し、この章はRequirements Decisionの正本を維持します。

最低限:

- Target Learner / Starting Knowledge
- Learning Objective / Observable Learning Outcome
- Prerequisite / Concept Dependency
- Primary Learning Surface
- Language / Terminology Policy
- Content Depth / Learning Activity Contract
- Understanding / Application Signal
- Feedback / Next Step / Review Path
- Freshness / Version Applicability（変化する教材で該当時）

### Learning Objective → Evidence

`何を載せるか`より先に、学習後に何ができるようになれば成功かを決めます。

```text
Starting State
↓
Learning Objective
↓
Observable Learner Capability
↓
Learning Activity / Explanation
↓
Evidence / Assessment
↓
Feedback / Next Step
```

Objectiveは必要に応じて次を区別します。

- Recognize / identify
- Recall / explain
- Compare / distinguish
- Apply / solve
- Diagnose / choose
- Create / perform

`読んだ`、`動画を再生した`、`Lessonを最後までスクロールした`等はCompletion evidenceにはなっても、Understanding / Masteryの直接証明とは扱いません。

### Prerequisite / Concept Dependency

学習順はPage番号やDatabase順ではなく、**後のConceptを理解するために本当に必要な前提**から組み立てます。

- Concept Bを理解するためにAが必要なら、AをPrerequisiteとして先に説明または参照できるようにする。
- 独立Topicまで強制Linear Courseへせず、必要なら複数Path / optional branchを許容する。
- 同じ用語を複数Lessonで前提にする場合、Canonicalな説明・Glossary・Concept page等へ戻れるようにする。
- Curriculum / concept graphを作ること自体を目的にせず、内容量や依存関係が小さい場合は単純なOrdered listで十分とする。

LearnerのStarting Knowledgeが大きく異なり、同じ入口が初心者を詰まらせる /経験者へ無駄を強いる場合だけ、Diagnostic / Placement / self-selectionを検討します。全Learning SiteへPlacement Testを強制しません。

### Content Depth / Learning Activity Decision

主要Lessonは内容とObjectiveに応じて、次を必要な組み合わせで使います。

1. What / definition
2. Why / purpose
3. How / mechanism
4. Concrete example / worked example
5. Abstract ↔ concrete connection
6. Comparison / contrast
7. Common misconception / failure example
8. Guided practice
9. Independent practice / retrieval
10. Explanation question / reflection

使い分けの目安:

- **新しい複雑な手順・問題型:** Worked example →一部穴埋め / guided practice → independent practiceを候補にする。
- **似たConceptを混同しやすい:** Comparison / contrast、counterexample、misconceptionを強める。
- **理由や仕組みの理解が重要:** `why / how`を自分の言葉で説明するPromptや原因→結果の確認を使える。
- **実行・問題解決がOutcome:** 読解だけで終わらせず、実際のApply / Solveを含める。
- **Quick Reference:** 毎回Lesson形式へ膨らませず、短い検索・参照Surfaceを維持できる。

すべてのLessonを同じTemplate / 同じ長さへ固定しません。Glossary、Reference、Tutorial、Practice、Reviewは役割が違います。

### Retrieval / Review / Spacing

学習内容を**後日も思い出せること**がProduct Outcomeに含まれる場合、初回理解だけでなくReview / retrieval pathを検討します。

- Important conceptを一定期間後に再び思い出す機会
- Mixed / interleaved reviewが有効な近接Concept
- 前回間違えた / uncertaintyが高い項目の再確認
- Review結果から次のLesson /復習へ戻る導線

Spaced repetition engine、固定間隔、毎日Review、Flashcard化をCommon MUSTにしません。単発How-to / Quick Reference等、長期保持がProduct GoalでないContentでは不要です。

### Completion / Understanding / Masteryを分ける

必要に応じてProgress stateを分けます。

```text
Opened / Viewed
→ Completion evidence

Can recall / explain
→ Understanding evidence候補

Can apply / solve in relevant condition
→ Application evidence候補

Can repeat reliably / after delay / across variants
→ Mastery evidence候補
```

固定の`80% = Mastery`等をCommon Ruleにせず、Objective、Risk、試験 /実務用途、問題数、誤答Costに合うEvidenceを決めます。

### Feedback / Next Step

Feedbackは`正解 / 不正解`やScore表示だけで終えず、重要な学習では必要に応じて次を示します。

- 何ができた /できなかったか
- Learning Objectiveのどこに関係するか
- なぜ間違えやすいか
- どこを見直すか
- 次にRetry / Example / Review / Next Lessonのどれを行うか

LearnerがFeedbackを受けても行動できないUIにしません。Feedback機能を持たないReference Siteへ無理に追加する必要はありません。

### Beginner-first / Reference Boundary

初心者向けでは製品固有名詞の前に必要な一般概念を置きます。一方、Returning / experienced Userが素早く答えだけ探す用途がある場合は、初心者向け長文を毎回通過させません。

同じProductで両方扱う場合は、必要に応じて:

- Beginner learning path
- Quick reference / glossary
- Summary → details
- Example / explanationの折りたたみ
- Search / deep link

等で役割を分けます。Beginner SurfaceとReference Surfaceを分けても、重要Factを独立Hardcodeして矛盾させないようCanonical Contentを保ちます。

### Learning Content Freshness

Software、Security、Cloud、制度、価格、試験範囲等、時間で正解が変わる教材では`正しかった過去教材`をCurrent lessonとして放置しません。

必要に応じて:

- Applies to version / exam range / date
- Last reviewed / evidence checked
- Superseded by
- Archived / historical

を持ちます。Current Evidence確認は [20 Evidence-first Research](20-evidence-first-research.md)、一般Content lifecycle / IAは [22 Task-first Structure / Flow Research](22-task-first-structure-flow-research.md) を正本とします。

### Learner-facing Copy

内部Label / developer terminologyを通常学習UIへそのまま露出しません。学ぶ必要がある英語・略語は意味 /利用場面を添えます。

詳細Inputは [Learning Requirement Pack](../templates/requirements/LEARNING.md)、Verificationは [07 Testing / Quality](07-testing-quality.md) を使います。

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

## Browser / Web Platform Support Contract

CONDITIONAL: Browser上のPrimary Taskや新しいWeb API / CSS / JavaScript featureがProduct behaviorへ影響する場合、`Chromeで動いた`や`Baseline対応`だけでSupport Contractを決めません。Current compatibility research evidenceは [Web Platform Compatibility Research](../references/web-platform-compatibility-research.md) に保存します。

### Support TargetをAudienceから決める

Supported Browser / Runtime / Deviceは必要に応じて次から決めます。

- Target User / actual usage environment
- Public Site / internal Tool / managed device等の利用Context
- Desktop / Mobile / WebView / installed PWA等のRuntime
- Primary Taskで必要なWeb Platform capability
- Accessibility / input / media / permission要件
- Security update可能性 / provider constraint
- Compatibility implementation / testing / maintenance cost

`主要Browserの最新2Version`等をUniversal Ruleにしません。Audienceが限定されたinternal Toolと一般公開Siteでは合理的なSupport Matrixが異なります。

必要なら次を分けます。

```text
Supported
= Primary TaskをContractどおり完了できる

Enhanced
= 追加Featureは使えるがCore Taskは必須でない

Unsupported / Degraded
= 明示Fallback / limitation / upgrade guidanceが必要
```

### Baseline / Compatibility Dataの役割

MDN BaselineやBrowser Compatibility Dataは**採用候補を判断するEvidence**として使えますが、ProjectのSupport Contractそのものではありません。Baseline対象外の古いBrowser、OS WebView、Assistive Technology、Provider固有Runtime等は別確認が必要な場合があります。

Current support状況でDecisionが変わる場合は [20 Evidence-first Research](20-evidence-first-research.md) でCurrent Evidenceを確認します。

### Feature Detection / Progressive Behavior

Browser名を見て挙動を分ける前に、必要なCapabilityを検出できるか確認します。

- CSS feature → `@supports` / `CSS.supports()`等
- JavaScript API → relevant object / method / capabilityの存在確認
- Permission / media / device capability → 実際のAPI result / state確認

UA sniffing / Browser-name branchingは、実際のBrowser-specific behaviorをFeature Detection等で安全に判定できない場合だけ狭く使います。

Progressive Enhancementを使う場合、Unsupported FeatureでCore Taskまで壊さず、必要に応じてBasic fallback、read-only、manual alternative、clear unsupported message等へdegradeします。

### New Web API Adoption

Primary Taskへ新しいWeb API / syntax / CSS featureを採用する場合は必要範囲で次を決めます。

- Required capability
- Current support evidence
- Support TargetとのGap
- Feature Detection可否
- Fallback / unsupported behavior
- Polyfill / transpilationの必要性
- Real browser / real device確認の必要性

Polyfill / transpilation / compatibility dependencyは [13 Dependencies / Assets](13-dependencies-assets.md) を正本とします。

### Support終了

古いBrowser / Runtime supportを終了する場合、単にTestを削除して完了としません。MaterialなUser impactがある場合は、actual usage、Security / provider constraint、maintenance cost、alternative availabilityを確認し、Requirements / Help / Release information等を必要範囲で更新します。

少数Userがいるという理由だけで永久Supportを固定せず、Support終了がPrimary Taskを突然壊す場合はsilent breaking changeにしません。

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
- LearningならLearning ObjectiveとContent Depth / Understanding evidence / Next Stepを確認できる
- GameならPlayable MVP / Primary Completion ConditionをRuntimeで確認できる

## Requirements Decision System

Phase 1 research evidence is kept in [Requirements Decision System Research](../references/requirements-decision-system-research.md). General external research method remains owned by [20 Evidence-first Research](20-evidence-first-research.md); this section owns only Requirements-specific decisions.

### Problem → Outcome → Solution separation

Meaningful new requirements and feature requests should be reduced in this order when the distinction matters:

```text
Raw Request / Idea
↓
Underlying Problem / Context
↓
Desired User / Product Outcome
↓
Solution / Feature Candidate
↓
Scope Decision
↓
Confirmed Requirement
```

- A named feature is not automatically a requirement. Separate the need or outcome from one proposed implementation when alternative solutions could satisfy the same need.
- Distinguish `need / meaningful want / solution idea` when that distinction changes scope or priority. Do not interrogate the User mechanically when Current Repository, Existing Intent, or Evidence already makes the underlying outcome clear.
- When one request mixes multiple problems with different dependencies, risks, or completion criteria, split it into separate decision units before prioritizing it.
- Requirements should state the needed behavior, outcome, or constraint. Implementation detail belongs in Requirements only when that implementation choice is itself a real constraint or compatibility contract.

### Scope Decision — Now / Later / Reject

Feature candidates may be classified as `Now / Later / Reject` instead of allowing every useful idea to become current scope.

**Now** is appropriate when the item is necessary to deliver or validly test the Core Outcome, is a prerequisite for another Now item, or is a foundation / risk-control without which the MVP would be misleading or unsafe.

**Later** is appropriate when the item has meaningful value but the Core Outcome remains valid without it, deferral is safe, and postponing it avoids current complexity or uncertainty. `Later` is not a permanent dumping ground; revisit it when new Requirements, Evidence, or actual use changes the decision.

**Reject** is appropriate when the item does not materially improve the intended outcome, duplicates an existing capability, conflicts with Non-goals / Current Contract, or its expected maintenance / testing / UI / data / migration / failure / cognitive cost is not justified by the value.

Prioritization should use the smallest set of factors that changes the decision, such as:

- Outcome importance / task frequency
- Dependency / sequencing
- Risk or uncertainty reduction
- Implementation + maintenance + testing cost
- UI / data / migration complexity
- Failure / compatibility impact

RICE, MoSCoW, Kano, scoring matrices, or fixed numeric weights are optional aids, not Common mandatory process.

### MVP Boundary

MVP is the **smallest end-to-end scope that can deliver or validly test the Core Outcome**, not the smallest number of features.

- Include foundations, safety, reliability, compatibility, or data behavior that are necessary for the MVP to produce truthful evidence or be safely used in its intended context.
- Exclude polish and secondary capability that can be deferred without invalidating the Core Outcome or hiding a material risk.
- If removing an item makes the prototype / MVP incapable of testing the risky assumption or completing the primary flow, the reduced scope is not viable for that purpose.
- `Prototype`, `MVP`, `Feature Complete`, and `Release Ready` are separate states. Domain owners may add stricter completion gates such as Game playtest, real-device testing, storage migration, or security validation.

### Prototype / Cheap Test Trigger

Use a Prototype / Technical Spike / Data Prototype / Minimal Implementation when all of the following are materially true:

1. A Project-specific uncertainty remains after Current Repository review and appropriate Research.
2. A wrong decision would create meaningful rework, risk, or misleading Requirements.
3. A cheaper bounded test can reduce that uncertainty before full implementation.

Choose the **lowest-fidelity artifact that can answer the question faithfully**: sketch, wireframe, clickable prototype, technical spike, data prototype, or minimal working slice.

Before the test, state at least:

```text
Hypothesis / Decision Question
+ Observable Signal
+ Pass / Fail or Keep / Revise / Reject condition
+ Stop Condition
```

Prototype code is not production code by default. If it becomes part of the product, re-evaluate production Security, Reliability, Accessibility, Data, Test, and Maintenance requirements instead of assuming prototype success proves production readiness.

Skip a prototype when the decision is already well-supported, low-risk, reversible, and a prototype would not materially change the decision.

### Requirement Change Classification / Impact

Classify meaningful Requirement changes by semantic effect rather than diff size:

- **Clarification** — meaning is made more explicit without intentionally changing required behavior.
- **Extension** — new behavior or scope is added while the existing Contract remains valid.
- **Replacement** — an existing Requirement is superseded by a different current Requirement.
- **Removal** — previously required behavior is intentionally no longer required.
- **Breaking Change** — the change can invalidate existing data, consumers, URLs, integrations, workflows, compatibility, or another non-breakable contract.

Before implementing a material change, inspect only the affected dimensions, such as Core Outcome, primary flow, Architecture, Data / Migration, external interfaces, Security / Privacy, Performance / Accessibility, Tests, Documentation, Deployment, and backward compatibility.

Approved changes update the Current Contract. Obsolete clauses should not remain as if still active; history belongs in CHANGELOG / Work Report / Git as appropriate. Replacement / Removal should make clear which previous behavior no longer applies.

### Observable Completion / Proportionate Traceability

Material Requirements should be traceable far enough that completion can be observed:

```text
Requirement / Expected Outcome
↓
Observable Evidence
↓
Verification Method
↓
Pass / Fail Criteria
↓
Actual Result
```

- Prefer observable language over vague completion terms such as `easy`, `high quality`, `fast`, or `works well` unless the Project defines what those mean in evidence.
- Use the verification method that matches the Requirement: automated test, static inspection, browser test, user test, actual playtest, real device, production-safe check, or another justified method.
- Record `Pass / Fail / Not Verified / Not Applicable` distinctly when the state matters.
- Requirement IDs, matrices, and bidirectional traceability tools are useful when scale / criticality justify them, but are not mandatory ceremony for every small individual Project.
- When a Requirement changes, re-evaluate its completion criteria and affected verification. `Feature Complete` does not automatically mean `Release Ready`.