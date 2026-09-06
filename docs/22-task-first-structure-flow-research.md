# 22 Task-first Structure / Flow Research

この章は、Site / App / Electron / Browser Game等で、**User Goal / TaskからInformation Architecture、Navigation、Flow、State、Page / Viewを導くためのStructure / Function / Flow固有Research Workflow**の正本です。

この章はVisual Styleの正本ではありません。

- UI / UX / Accessibilityの一般原則 → [04 UI / UX / Accessibility](04-ui-ux-accessibility.md)
- 一般Research Method / Evidence Quality / Bias / Saturation → [20 Evidence-first Research](20-evidence-first-research.md)
- Visual Direction / Reference比較 / Visual Foundation Reset → [18 Domain-first Visual Research](18-domain-first-visual-research.md)
- Project固有の最終IA / Sitemap / Flow / State Matrix → 対象ProjectのRequirements / Spec / Design docs

## 目的

PageやFeature一覧を先に作ってから導線を後付けするのではなく、次の順で構造を導きます。

```text
User Goal / Need
↓
Whole Problem / Usage Context
↓
Task / Subtask
↓
Required Information / Function
↓
Information Architecture
↓
Navigation
↓
Task Flow / User Flow
↓
State / Feedback
↓
Recovery / Resume
↓
Page / View
↓
Wireframe / Visual Design
```

最終的なPage数やNavigation Typeを最初からTemplateとして固定しません。

## この章を使う条件

### SHOULD: Meaningfulな構造・Flow判断で使う

次のような変更では、この章を候補Ownerとして確認します。

- 新規Site / Appの主要画面・機能・導線を決める
- Information Architectureを新規設計または大きく組み替える
- Sidebar / Top Nav / Tabs / Hub等のNavigation構造を変える
- 主要Taskの開始から完了までのFlowを変える
- Search / Browse / Filter / Sortの役割を再設計する
- Create / Edit / Save / Delete / Restore等の編集Flowを変える
- Loading / Empty / Error / Successだけでなく状態遷移全体を見直す
- First-time / Returning Userの入口・Resumeを設計する
- Progressive Disclosure / Advanced機能の出し方を決める
- Back / Cancel / Undo / Retry / ResumeでContextを保持する必要がある

### 通常この章を要求しない

- 1px〜数pxのAlignment修正
- 色 / Typography / Shadow等だけの局所Visual修正
- 既存IA / Flowを変えないComponent追加
- 原因と正解が明確な小規模Bug
- Copyだけの修正

局所修正からMajor Navigation / Flow変更へ広がった場合はRe-routeします。

## Responsibility Boundary

### StructureとVisualを分ける

Navigationという単語だけでVisual Research扱いにしません。

```text
Navigationの分類・階層・到達経路を変える
→ この章

Navigation barの見た目・Spacing・Color・Typographyを変える
→ docs/18 + docs/04

構造と見た目を両方変える
→ この章でTask / IA / Flowを先に整理し、その後docs/18へ進む
```

Page Compositionも、Primary Task / Information relationship自体を変える場合はStructure判断を先に行います。

### 一般Research Methodを複製しない

重要かつ不確実なResearchable Questionでは [20 Evidence-first Research](20-evidence-first-research.md) を使います。

この章では、Structure / Flow固有のResearch Question、観察軸、Projectへの変換方法だけを扱います。

## 1. User Goal / Needから始める

### SHOULD: Goal / Task / Featureを分ける

```text
Goal / Need
= Userが得たい結果

Task
= その結果のために行う活動

Feature
= Taskを支えるProduct capability
```

`検索画面が欲しい`、`Dashboardが欲しい`、`フォームを置く`等のSolution表現を、そのままUnderlying Goalとして扱いません。

例:

```text
Goal
必要な曲をすぐ再生したい
↓
Task
曲を探す → 候補を確認する → 再生する
↓
Function Candidate
Search / Recent / Browse / Player
```

Feature CandidateはGoal / Taskへ戻して必要性を確認します。

## 2. Whole Problem / Usage Context

Product内のクリック列だけにScopeを閉じません。

必要に応じて次を確認します。

- UserがProductを開くTrigger
- Product利用前に既に持っている情報 / Data / Intent
- Product外で行っている前工程
- Product利用中のInterrupt / Device / Input context
- Task完了後にUserが行うこと
- 外部Link / Deep Link / Notification等からのEntry
- 一度で終わるTaskか、後日ResumeするTaskか

既存組織・Database・File構成を、そのままUser-facing Task sequenceへ露出しません。

## 3. Task Inventory / Evaluation

主要Taskは必要に応じて次の軸で評価します。

- **Importance** — Goal達成への重要度
- **Frequency** — どれくらい繰り返すか
- **Expertise** — Beginner / Returning / Expertで差があるか
- **Complexity** — 判断・入力・依存Stepの多さ
- **Risk** — 誤操作時のImpact
- **Reversibility** — Undo / Restore可能か
- **Context dependency** — 前画面 / Filter / Selection等へ依存するか
- **Interruptibility** — 中断可能か
- **Resume requirement** — 後で続きから再開する必要があるか

固定Scoreを全Taskへ強制しません。構造判断で差が出る軸だけ使います。

## 4. Information Architecture

Information Architectureでは、内部実装ではなくUserが情報・機能をどう認識し、どこにあると期待するかを中心にします。

研究対象例:

- Grouping / Category
- Hierarchy / Flat structure
- Parent / Child
- Hub / Detail
- Collection / Item
- Master / Detail
- Workspace / Inspector
- Global / Local / Contextual information
- Page / View boundary

### SHOULD: IA Candidateを検証可能にする

重要なIAでは必要に応じて次を利用します。

- Content inventory
- Open / Closed Card Sorting
- Tree Testing
- First-click / Findability Test
- Current analytics / Search logs / Support issue
- Real Product comparison

手法名を使うこと自体を成果にせず、**Userが目的の情報・機能へ合理的に到達できるか**を確認します。

## 5. Navigation

NavigationはIAそのものではなく、UserがIA内を移動し現在地を理解する仕組みとして設計します。

対象例:

- Global Navigation
- Local Navigation
- Sidebar / Rail
- Top Navigation
- Tabs
- Breadcrumb
- Bottom Navigation
- Contextual Navigation
- Search-driven Navigation
- Back / History
- Deep Link

### Navigation Typeを固定Defaultにしない

Sidebar / Top Nav / Tabs等をProject Typeだけで自動選択しません。

最低限次を見ます。

- Top-level destination数
- Hierarchy depth
- Task frequency
- Current location awareness
- Cross-section移動頻度
- Content density
- Desktop / Mobile / Keyboard等のInput context
- Deep Link / Back expectation

## 6. User Flow / Task Flow

Happy Pathだけで完成扱いにしません。

```text
Entry
↓
Discovery / Selection
↓
Action
↓
Feedback
↓
Completion
```

に加え、該当する場合は次を含めます。

- Alternate Path
- Error Path
- Cancel
- Back
- Retry
- Undo
- Edit
- Abandon
- Resume
- Deep Link Entry
- Permission / Offline / Conflict

### Step Countだけで最適化しない

少ないStepは重要ですが絶対目標ではありません。

高Risk / Irreversibleな操作では、確認やReview Stepを意図的に増やす方が安全な場合があります。

Flowは少なくともFrequency / Risk / Reversibility / Cognitive Load / Expertiseと合わせて判断します。

## 7. Search / Browse / Discovery

SearchとBrowseを競合する単一選択として扱いません。

### Searchが強い場面

- Userが探す対象を比較的具体的に知っている
- Data量が多い
- Name / ID / Keyword等で直接到達できる

### Browse / Discoveryが強い場面

- Userが何が存在するか知らない
- Category / Related / Recommendationから探索する価値がある
- 比較しながら選ぶ

必要に応じて次を組み合わせます。

- Category
- Filter / Facet
- Sort
- Tags
- Recent
- Favorites
- Related
- Pagination / Infinite Scroll
- Search scope
- No Result recovery

Searchを、壊れたIAの唯一のFallbackとして置きません。

## 8. CRUD / Editing Flow

BackendのCRUDだけでなくUserが作業を失わず、戻せるかまで扱います。

```text
Create
Read / Preview / Compare
Edit
Save / Autosave
Draft
Delete / Archive
Restore
Undo
Conflict
```

### Destructive Action

```text
Reversible + Frequent
→ Undo / Restoreを優先検討

Irreversible + High Impact
→ Confirmation / Backup / Explicit Reviewを優先検討
```

すべてのDeleteへ同じConfirmationを機械的に付けません。

Storage lifecycle / Backup / Migrationの実装Contractは [03 Data / Storage](03-data-storage.md) を正本とします。

## 9. State / Feedback / Recovery

完成ScreenshotのNormal Stateだけを設計しません。

代表State:

- Initial
- Loading
- Empty
- No Result
- Normal
- Partial Data
- Editing
- Unsaved
- Saving
- Saved / Success
- Error / Invalid
- Offline
- Permission Denied
- Conflict
- Disabled
- Retry / Recovery

すべての画面に全Stateを強制せず、実際に取り得るStateだけ明示します。

重要Stateでは次が分かることを目標にします。

```text
何が起きたか
↓
現在どういう状態か
↓
次に何ができるか
```

## 10. First-time / Returning User

初回利用と再訪を同じ入口として機械的に扱いません。

### First-time

目的は**早く最初の意味あるTaskを開始できること**です。

候補:

- Useful Empty State
- Minimal Setup
- Sample Data
- Guided first action
- Contextual Help
- Optional Tutorial

Tutorialを必須Defaultにしません。

### Returning User

目的は**前回の作業へ早く復帰できること**です。

候補:

- Recent items
- Continue working
- Last position
- Saved filters
- Active task
- Draft
- User preference

First-time向け説明が毎回Returning Userを塞がないようにします。

## 11. Progressive Disclosure / Complex Feature Staging

Capabilityを減らすことと、常時表示を減らすことを分けます。

```text
頻繁 + 重要
→ Primary / always visible候補

Context依存
→ Contextual control候補

低頻度 + Advanced
→ Progressive Disclosure候補
```

候補Pattern:

- Basic / Advanced
- Expandable details
- More menu
- Contextual controls
- Inspector
- Wizard
- Preset
- Template
- Guided configuration

隠すほど良いとは扱いません。Discoverabilityと熟練者の効率の両方を確認します。

## 12. Context Preservation

画面遷移やBackで、Userが作った作業Contextを不必要に失わせません。

対象例:

- Search query
- Filter
- Sort
- Scroll position
- Selected item
- Open tab / panel
- Draft
- Current step
- Navigation history

保持期間やStorage方式はTask / Privacy / Data size / Reliabilityに応じて判断し、永続保存の詳細は [03 Data / Storage](03-data-storage.md) を参照します。

## Research Brief

MeaningfulなStructure / Flow Researchでは、必要に応じて短く次を整理します。

```text
Primary Goal / Need:
Whole Problem / Context:
Primary Tasks:
Content / Data Model:
Audience / Expertise:
Usage Frequency:
Risk / Reversibility:
Primary Device / Input:

Current Structure:
- ...

Research Questions:
- ...

Open Decisions:
- IA:
- Navigation:
- Search / Browse:
- Flow:
- State / Recovery:
```

一般ResearchのSource Count / Evidence Map / Bias / Saturationは [20 Evidence-first Research](20-evidence-first-research.md) へ委譲します。

## Research Output

Projectへ残す成果は必要なものだけ選びます。

### IA Map

- Main groups
- Hierarchy
- Relationship
- Page / View boundary

### Navigation Model

- Global
- Local
- Contextual
- Current location
- Back / Deep Link

### Core Flow Map

```text
Entry
→ Task
→ Decision
→ Feedback
→ Completion
→ Recovery / Resume
```

### State Matrix

主要Page / Functionに必要なStateだけを整理します。

### Disclosure Plan

- Primary
- Secondary
- Contextual
- Advanced

### Decision Record

重要な構造判断は必要に応じて次を短く残します。

```text
Condition
→ Chosen structure
→ Why
→ Rejected alternative
→ Validation
```

## Project適用Workflow

```text
Purpose / User
↓
Goal / Need / Whole Problem
↓
Task Inventory
↓
Required Information / Function
↓
IA Candidate
↓
Navigation / Flow / State
↓
必要なResearch / Prototype / Test
↓
Project-specific Decision
↓
Requirements / Specへ保存
↓
Wireframe
↓
Visual Direction
↓
Implementation
↓
Validation
```

構造がResearchだけでは決められない場合、無限に検索せずWireframe / Prototype / User Test / Task Test等の安いValidationへ進みます。

## AI / Coding Agentへ任せる場合

AIへ`ページ構成を考えて`、`使いやすくして`等のMeaningfulな依頼をした場合、最初に既存Dashboard / Sidebar / Card Grid等のTemplateを当てはめません。

最低限:

1. Current Repository / Requirementsを確認
2. Primary Goal / Taskを特定
3. Existing IA / Flowを確認
4. 必要なResearchを行う
5. IA / Navigation / Flow候補をTaskへ照らして判断
6. Project-specific Decisionへ落とす
7. Visual変更を伴う場合だけdocs/18へ進む

## Non-goals

- すべてのProjectへSitemap / Journey Map / Card Sortingを強制する
- Sidebar / Top Nav / Tabs等の固定Defaultを決める
- Click数だけでFlow品質を決める
- 全画面へ同じState一覧を強制する
- Onboarding Tutorialを必須化する
- すべての操作をAutosaveにする
- Project固有Sitemap / User FlowをCommon Guideへ保存する
- Visual Style / Typography / Colorの正本になる
- 一般Research Methodを再定義する

## Completion Check

MeaningfulなStructure / Flow設計では、必要範囲で次を説明できることを目標とします。

- Userが何を達成したいか
- 主要TaskとFeature Candidateを区別できているか
- Whole Problem / Entry / CompletionのScopeはどこか
- InformationをなぜそのGroup / Hierarchyへ置いたか
- Navigation Typeをなぜ選んだか
- Primary Flow / Alternate / Recoveryは何か
- Search / Browseをどう使い分けるか
- Edit / Save / Delete / Restoreで作業を失わないか
- Loading / Empty / Error以外に重要Stateがあるか
- First-time / Returningで必要な差は何か
- Advanced機能をいつ見せるか
- Back / Resume時に保持すべきContextは何か
- Research / Prototype / Testで何を確認したか
- 最終IA / Flowが対象ProjectのSource of Truthへ保存されているか

最終目標はPatternを多く適用することではなく、**User Goalから必要な構造を導き、目的達成を妨げないFlowとして検証できること**です。
