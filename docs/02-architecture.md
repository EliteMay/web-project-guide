# 02 アーキテクチャ

この章は、Web / Web App / Electron / Browser Game等で、**責務・State・Module・Dependencyをどう分け、いつ構造を増やし、いつRefactor / Incremental Replacement / Rewriteを選ぶか**を判断するためのNormative Ownerです。

Package / CDN / Assetの追加・Version管理は [13 Dependencies / Assets](13-dependencies-assets.md)、保存・Schema / Migrationは [03 Data / Storage](03-data-storage.md)、Verificationは [07 Testing / Quality](07-testing-quality.md)、Versioned Runtime / Legacy / Patch整理は [09 Version / Maintenance](09-maintenance.md) を正本とします。

Research Evidenceは [Phase 3 Architecture Decision System Research](../references/architecture-decision-system-research.md) に分離し、この章へSource一覧を複製しません。

## 基本原則

- 1機能1責務を意識する。
- 同じ機能の実装を複数残さない。
- UIから保存・外部API・再生エンジンへ直接依存しすぎない。
- 後付け上書きではなく、Controller / Adapter / Hook / Event / Module等の明示された接続点を使う。
- Architectureの複雑さ自体を品質とみなさない。
- 小さく保つこと自体も目的にせず、実際のChange Cost / Failure / Couplingから必要な構造を判断する。

## Architecture Decision Flow

意味のあるArchitecture判断では、原則として次の順で考えます。

```text
Project Context / Constraints
↓
Smallest Sufficient Architecture
↓
State / Responsibility Ownership
↓
Component / Module Boundary
↓
Dependency / Collaboration Style
↓
Change Cost / Architecture Signalを観測
↓
Keep / Local Repair / Refactor / Incremental Replacement / Rewrite
↓
必要なValidation
```

最初にFramework名、Folder構成、Design Patternを決めてからProjectを合わせません。

## Smallest Sufficient Architecture

### SHOULD: 解決するProblemを説明できない抽象化を先に増やさない

Framework、Global Store、Event Bus、DI、汎用Service Layer等を追加する前に、最低限次を説明できることを優先します。

- 今どのProblemが繰り返し起きているか
- 現行構造では何が難しいか
- 新しい構造が何を単純化するか
- 新しく増えるLearning / Build / Dependency / Debug / Migration Costは何か

標準Web API、Native Module、既存責務分離で十分なら、それだけで低品質とは扱いません。

逆に、単純な構造へ固執した結果、同じState同期・DOM更新・Routing・Feature跨ぎ変更を何度も手作業している場合は、より強い構造へ移すSignalです。

固定LOC、File数、Page数だけでArchitecture段階を決めません。

## Vanilla JS / Framework

Frameworkを使うかと、どのFrameworkを使うかは別Decisionです。

### Vanilla / Web Platformが有力な条件

- Content / Document中心でInteractionが限定的
- Stateが局所的で、複雑な同期が少ない
- Browser Navigation /通常のPage遷移で主要Flowが成立する
- 標準Web API + ES Modulesで責務を明確に分けられる
- Framework導入で解決する具体的ProblemよりTooling / Dependency Costの方が大きい

### Frameworkを検討するSignal

- 多数の動的Componentで同じUI更新Patternを繰り返す
- 離れたUI間のState coordinationが増えている
- Lifecycle / Render / Routing / Form等の独自基盤を自前で再実装し続けている
- 複数Contributor / Agentが同じConventionで変更する価値が大きい
- FrameworkのConventionにより、現在の重複・同期・変更範囲を実際に減らせる

「Web Appだから」「流行しているから」「AIが書きやすいから」だけを導入理由にしません。

既存ProjectのFramework全面移行はHigh-costなArchitecture変更として扱い、Current Runtime / Compatibility / Save / Deployment / Testを確認します。

## SPA / MPA / Hybrid

`SPA → MPA`や`MPA → SPA`を進化段階とは扱いません。

### MPA / Browser-native Navigationが有力な条件

- Content / Public Pageが主要価値
- View間で保持すべきIn-memory Stateが少ない
- Deep Link / Reload / Back / ForwardをBrowser標準で自然に扱える
- Static Hosting /小さいJavaScript Costを維持したい

### SPAが有力な条件

- PersistentなApp Shell / Workspace内で連続作業する
- View間で共有する一時Stateが多い
- Page全体のReloadを挟まないInteractionが主要体験
- Client-side Routing / Transitionの価値が、その追加Complexityを上回る

### Hybrid

Page / Routeごとに性質が違う場合、Static / Server-rendered / MPAとInteraction-heavyなClient Viewを混在させて構いません。

Project全体を1つのRendering方式へ無理に統一しません。

RenderingのPerformance判断は [05 Performance / Reliability](05-performance-reliability.md) を併用します。

## State Ownership

### SHOULD: Stateは「全部1か所」ではなく、FactごとにOwnerを1つ決める

少なくとも次を分けて考えます。

- Local UI State
- Shared Application State
- Derived State
- URL / Navigation State
- Persistent State
- External / Server State
- Loading / Error / Async State

原則:

1. 同じFactを複数箇所が独立して正本として持たない。
2. 計算で導出できる値を別Stateとして重複保持しすぎない。
3. Stateは必要な最小責務の近くへ置く。
4. 複数の離れたConsumerが本当に共有・更新する場合だけOwnerを上へ移す。
5. 永続StorageとRuntime Stateを同一責務とみなさない。
6. DOMとApplication Stateを同じFactの二重正本にしない。

Global Storeは全StateのDefault保存先ではありません。

State Libraryは、共有範囲・更新頻度・更新Logic・Debug / Async orchestration等のComplexityが既存手段を上回ったときに検討します。

### 状態更新

元stateを直接壊してから検証しません。

```text
コピー
↓
変更
↓
normalize
↓
validate
↓
成功時だけcommit
```

不正入力でも元データが壊れないようにします。

保存Transaction / Migrationの詳細は [03 Data / Storage](03-data-storage.md) を正本とします。

## Component / Module Boundary

### SHOULD: 固定行数ではなくResponsibility / Ownership / Change Localityで分ける

良いBoundaryを考えるときは次を確認します。

- このModule / Componentは何をOwnするか
- 他Moduleへ隠したいImplementation Decisionは何か
- 何が一緒に変更されるか
- 何を変更しても他Featureへ波及させたくないか
- Consumerへ公開するInterfaceを小さくできるか
- State / DOM / Lifecycle / External IntegrationのOwnerが明確か

巨大FileはInspection Signalにはなりますが、長いからという理由だけで分割しません。

小さいFileを大量に作り、1変更で多くのFileを往復する構造も避けます。

### Public Surface

Module外から内部実装へ直接依存させず、必要なInterfaceだけ公開することを優先します。

`utils.js` / `common.js`へ関係の薄い処理を無制限に集約しません。共有化は、複数Featureで責務とContractが実際に安定して共通化できる場合に行います。

## Feature-based / Layer-based

Folder PatternをUniversal Templateにしません。

### Feature / Domain Boundaryが有力

- Requirement / Bug /変更がFeature単位で入る
- Feature内部でUI / State / Use Case等が密接に一緒に変わる
- Feature間の内部実装を隠したい

### Technical Layerが有力

- 複数Featureで本当に同じInfrastructure責務を共有する
- Storage / External Adapter等を横断的に交換・管理する必要がある
- Layer Boundary自体が安定したDependency Contractになっている

### Hybridを許容する

例えば次のような構造は有効な選択肢です。

```text
features/
  search/
    ui/
    state/
    use-case/
  practice/
    ui/
    state/
    use-case/
core/
infrastructure/
```

ただしDirectory名そのものをRuleにせず、Dependency DirectionとOwnershipが明確かを判断します。

## Dependency Direction

Dependency Graphは可能な範囲で理解可能・一方向に保つことを優先します。

- UIから外部Service実装へ直接依存しすぎない
- Feature AからFeature Bの内部Fileへ無秩序に到達しない
- External API / CDN / Supabase / YouTube等はAdapter境界へ閉じ込める
- Cyclic Import / Cyclic DependencyはArchitecture ReviewのSignalとして扱う

Cycleを検出しただけで即Rewriteしません。Callback / Notification等、意図された構造である可能性も含め、実際のResponsibility、Change Propagation、Bug / Test Evidenceを確認します。

Package自体の追加・Version / CDN管理は [13 Dependencies / Assets](13-dependencies-assets.md) を正本とします。

## Direct Call / Event-driven

### SHOULD: 追跡しやすいLocal FlowではDirectなCollaborationを優先する

Callerが特定のCollaboratorへ明示的にCommand / Queryしたい場合は、Function Call / Method / Controller経由等の明示Flowを優先できます。

Eventを使う価値が高いのは、例えば次です。

- ProducerがConsumer一覧を知るべきでない
- 同じ出来事へ複数の独立Consumerが反応する
- Consumer追加時にProducerを変更しない価値がある
- Async / eventualな反応を許容できる

Event-drivenにするとDependencyが消えるわけではありません。InterfaceがFunctionからEvent Contractへ移ります。

### Event使用時

- Event名 / Payload / Ownerを曖昧にしない
- 必須Commandを「誰かが反応するはず」のEventへ隠さない
- Duplicate Listener / Cleanup / Ordering / Async Errorを必要に応じて確認する
- 主要FlowがEvent連鎖だけで隠れる場合は、Trace / Controller / Mediator等で理解可能性を補う

Event Busの導入自体をDecouplingの証明にしません。

## Architecture Health Signals

次は**診断Trigger**として利用できます。

### Dependency / Responsibility

- Cyclic Dependency
- Hub-like Dependency
- Unstable Dependency
- God Module / God Component
- Scattered Functionality
- 1 Featureから複数Feature内部へのCross-import増加
- 同じ責務 / State / Ruleの複数実装

### Change History

- 小変更で無関係Fileまで頻繁に同時変更する
- 同じComponentが多くの変更の中心になり続ける
- 1 Interface変更が広範囲へRippleする
- 同じBug原因が複数実装で繰り返される
- 変更範囲を事前に読めない状態が増える

### Runtime / Patch

- Override / Monkey Patch / MutationObserver後付けが同じ責務へ積み重なる
- Entry Point / Runtime Pathが増え、どれがCurrentか分かりにくい
- Initialization OrderがHidden Contractになる
- Duplicate Event / Listenerが増える

Versioned Runtime / Patch retirementの正本は [09 Version / Maintenance](09-maintenance.md) です。

### MUST: Signal単体をRewrite判定にしない

Architecture smellやMetricは、次と組み合わせて判断します。

```text
Static Signal
+ Change / Bug History
+ Current Requirements
+ Testability / Regression Risk
+ Migration / Compatibility Cost
↓
Diagnosis
↓
Action
```

固定Architecture Health Scoreだけで自動判定しません。

## Refactoring Decision

Refactoringは**Observable Behaviorを原則維持しながら、理解・変更Costを下げる構造変更**として扱います。

### SHOULD: 経済的な理由を持つ

次のような場合に価値があります。

- 予定Featureを入れる前にStructureを整えた方が全体変更が小さくなる
- 同じAreaでBug /変更が繰り返され、現在構造が毎回Costを増やしている
- Responsibility / State Owner / Dependencyが不明でRegression Riskが高い

「綺麗にしたい」だけで安定したCodeを全面Refactorしません。

### Refactor前

必要なRegression Guardは [07 Testing / Quality](07-testing-quality.md) を確認します。

既存Behaviorが十分にTestされていないLegacyでは、現在BehaviorをCharacterizeしてから構造変更する価値を検討します。

Feature変更と大規模Refactorを無制限に混ぜず、必要に応じてPreparatory Refactor → Feature Changeの順へ分けます。

## Technical Debt

Technical Debtは単なる`汚いCode`やCleanup Wishではなく、**現在のDesign / Implementation Decisionが将来変更を高Cost / 高RiskにするLiability**として扱います。

Debtを記録する価値がある場合は最低限次を説明します。

- どこにあるか
- 何が将来難しくなるか
- どんな変更でCostが発生するか
- 今返すかLaterへ送る理由
- 再評価Trigger

意図的Debtを禁止しません。不確実なFeature検証等で短期的にDebtを受け入れる場合も、将来のInterest / Exitを理解して使います。

変更予定がほぼなくRiskも低いAreaを、Debtという名前だけで最優先Cleanupしません。

小規模Projectへ専用Debt Registerを機械的に要求しません。Issue / Work Report等で十分なら既存Project管理を利用します。

## Keep / Repair / Refactor / Replace / Rewrite

### SHOULD: 最小の有効Actionを選ぶ

```text
KEEP
↓
LOCAL REPAIR
↓
REFACTOR
↓
RESTRUCTURE / INCREMENTAL REPLACEMENT
↓
REWRITE
```

### KEEP

Current Architectureで変更が局所化でき、Signalが実害へ結びついていない場合は維持します。

### LOCAL REPAIR

原因とOwnerが局所的なら、Architecture再設計へ広げずSmallest Safe Changeを優先します。

### REFACTOR

Behaviorは正しいが内部構造が次の変更を不必要に高Cost / 高Riskにしている場合に使います。

### RESTRUCTURE / INCREMENTAL REPLACEMENT

Responsibility Boundary、Framework、Subsystem、External Integration等を交換する必要があるが、全体Cutover Riskが高い場合は、Adapter / Facade / Abstraction等を使って段階移行できるか検討します。

新旧Runtimeを併存させる場合は、恒久二重運用にせずCutover / Retirement条件を持ちます。Legacy Runtime管理は [09 Version / Maintenance](09-maintenance.md) を確認します。

### REWRITE

Big-bang RewriteをDefaultにしません。一方でRewrite自体を禁止もしません。

検討するには少なくとも次を確認します。

- Current Requirement / Scale / Platform前提が旧Architectureと根本的に変わったか
- Local / Incremental Changeでは必要Qualityを合理的に満たせないか
- 既存Behavior / Hidden Requirementを十分把握できるか
- Save / Data / URL / Integration Compatibilityを扱えるか
- Cutover / Rollbackを定義できるか
- Rewrite CostがIncremental Migrationより合理的か

`新しく書いた方がAIには速い`、`新しいFrameworkにしたい`、`既存Codeが好みでない`だけをRewrite理由にしません。

Prototype / Sacrificial Architecture等、元々Learning優先で小さく作ったものは、Requirementが大きく変わりCompatibility Riskが低い場合にBounded Rewriteが合理的なことがあります。

## DOM後付けについて

`MutationObserver`による既存UIへの後付けは、互換レイヤーなど限定用途にします。

本来のrender処理を変更できるなら、正式なrender pathへ統合します。

### Renderer owns its DOM

アプリ自身が生成しているDOMは、原則として**そのRenderer / Component自身が最終形を生成する**ようにします。

悪い例:

```text
practice.js が回答Headerをrender
↓
review-layout.js がMutationObserverでHeaderを検出
↓
後から保存Buttonを差し込む
```

推奨:

```text
practice.js が回答Header + 保存Buttonを一緒にrender
↓
review-layout.js はサイズ計算だけ担当
```

この分離により、次の問題を減らせます。

- Renderのたびに後付け処理が必要
- Observer timing依存
- DOM構造変更でSelectorが壊れる
- 同じButtonが二重生成される
- 「誰がこのDOMを作ったか」が不明になる

例外:

- 第三者Widget
- Browser Extension
- 自分で変更できない外部DOM
- Legacy互換レイヤー

例外でもObserver側の責務を狭くし、正式Rendererへ移せる処理は残し続けません。

## Single Source of Truth

同じ値やルールを複数箇所に手書きしません。

- Version → 1ファイル
- 問題件数 → manifest
- データ本体 → JSON
- Schema → Schema定義
- Feature Flag → config

Stateについては「全Stateを1か所へ置く」意味ではなく、**FactごとにAuthorityを一意にする**考え方を優先します。

## ID設計

保存・参照に使うIDは表示名と分離します。

- 名前変更でIDを変えない
- IDを再利用しない
- 配列indexを永続IDとして使わない
- 削除済みIDを別データへ安易に再割当しない

永続DataのID / Schema変更は [03 Data / Storage](03-data-storage.md) のCompatibility / Migrationも確認します。

## AI-assisted Development

AI生成Codeも通常Codeと同じArchitecture Contractを通します。

Meaningfulな反復変更では、必要に応じて次を確認します。

- 既存の同責務Moduleを再利用できないか
- 同じFeature / State / Helperの別実装を追加していないか
- 新しいFramework / Store / Event Patternを局所都合だけで増やしていないか
- Diff後にDependency Direction / Ownerが不明になっていないか
- Testが通っていてもDuplicate Code /巨大Module / Patch Chainが増えていないか

AIがCodeを高速生成できることを、Migration / Rewrite Riskが低いEvidenceにはしません。

AI Coding AgentのCurrent Repository確認 / Smallest Safe Change / Handoffは [10 Project Management](10-project-management.md)、Verification方法は [07 Testing / Quality](07-testing-quality.md) を正本とします。

## Architecture Review Output

MeaningfulなArchitecture判断では、必要な範囲で次を残せる状態を目標とします。

- Current Problem / Signal
- Current Owner / Dependency
- Chosen Action: Keep / Repair / Refactor / Incremental Replacement / Rewrite
- なぜそのActionが最小で十分か
- Compatibility / Migration影響
- Validation方法
- 未確認事項

すべての小修正へADRやArchitecture Documentを強制しません。High-cost / long-lived Decisionで記録価値が高い場合は [ADR Template](../templates/ADR_TEMPLATE.md) を利用できます。

## 関連Catalog

- Failure: [F-001 / F-008 / F-010 / F-019](../catalog/failures.md)
- Success: [S-003 / S-023](../catalog/success-patterns.md)
- Anti-pattern: [AP-001 / AP-002 / AP-003](../catalog/anti-patterns.md)
