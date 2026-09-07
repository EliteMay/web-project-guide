# Performance / Reliability Decision System — Phase 5 Research Record

Status: completed / promoted on 2026-09-07
Normative status: historical non-normative evidence
Research status: sufficient for current decision scope / Research Review Gate: pass with limitations

Phase 5では、単なる高速化Technique集ではなく、**何を・どこまでPerformance / Reliabilityとして要求し、どの条件で追加最適化を止めるか**を研究しました。

Current behaviorは [`../../docs/05-performance-reliability.md`](../../docs/05-performance-reliability.md) を正本とします。このFileはResearch Evidence / Decision Historyであり、Common Rule本文ではありません。

一般Research Methodは [`../../docs/20-evidence-first-research.md`](../../docs/20-evidence-first-research.md)、Common Rule Promotionは [`../../docs/14-continuous-improvement.md`](../../docs/14-continuous-improvement.md) を正本とします。

## Research Question

**Userが実際に感じる待ち時間・操作不能・失敗・劣化・長時間利用のCostを基準に、どのProjectでどこまでPerformance / Reliability対策を要求すべきか。**

研究対象:

- Perceived Performance / Interaction Readiness
- Loading UX / Progress Feedback
- Skeleton / Progressive Rendering
- Network Failure / Partial Failure
- Retry / Backoff / Duplicate Prevention
- Timeout / Cancel / Long Operation
- Offline Degradation / Connectivity Change
- Slow Device / Constrained Runtime
- Memory Leak / Long-running Session
- Huge Datasets / Heavy Computation
- Image / Video / Fonts / Heavy Media
- Third-party Scripts / External Runtime Dependency
- Measurement / Validation / Stop Condition

## Evidence Map

### Established / High-confidence

1. **Performanceは単一のLoad完了時刻ではない。** Visual load、interaction readiness、runtime responsivenessは別のuser-centric outcomeとして扱う必要がある。
2. **LabとFieldは役割が違う。** Labは再現・診断・release前Regressionに強く、Field / RUMは実Userのdevice / network / interaction variabilityを把握するために強い。
3. **Core Web Vitalsは公開Webの共通Signalとして有用だが、Primary Task固有の性能を置き換えない。** LCP 2.5s、INP 200ms、CLS 0.1を75 percentileで見る現行目安を維持する。
4. **Long Taskは見た目が表示済みでも操作をBlockできる。** 50ms超は診断Signalとして有用だが、50msを全処理の絶対Fail上限にはしない。
5. **FetchはHTTP 4xx / 5xxで自動rejectしない。** 必要なRequestは`response.ok` / status等でapplication failureを判定する必要がある。
6. **Automatic Retryはoperation safetyと分離できない。** HTTP Semanticsではidempotent requestはcommunication failure時にrepeat可能だが、non-idempotent requestのautomatic retryは安全性を確認できない限り避けるべきとされる。
7. **Retryは無制限に行わない。** Serverの`Retry-After`を尊重できる場合は利用し、transient failureではbounded backoff / jitterがretry storm低減の一般的候補になる。
8. **TimeoutにUniversal秒数はない。** 短すぎるtimeoutはretry traffic / false failureを増やし、長すぎるtimeoutはresourceを保持する。Operation / dependency / UX criticalityから決める必要がある。
9. **`navigator.onLine`はnetwork authorityとして信頼できない。** Connectivity hintとしては使えるが、機能可否をこれだけで決めない。
10. **Service WorkerはOffline capabilityの一手段でありCore Featureの前提にしない。** First load / activation / browser support差があるためoptional enhancementとして扱うのが妥当。
11. **Low-end device / slow networkではone-size-fits-allが成立しない場合がある。** ただしNetwork Information / Device Memory等の一部Signalはbrowser supportが限定されるため、これらをCore logicの唯一の判定材料にしない。
12. **Memory問題は時間経過でprogressive slowdownとしてUserへ現れる。** Detached DOM、retained JS reference、listener / timer等は代表的Leak sourceであり、long-running appではrepetition / heap trend確認が有効。
13. **Huge Dataは件数だけで決められない。** Network payload、parse、search / sort、DOM、memory、update frequencyを分離し、bottleneckがrenderingならvirtualization等を候補にする。
14. **Mediaは総File容量よりload timingが重要。** Responsive image、poster、`preload="none"` / `metadata`、lazy / click-to-load等をPrimary Taskとの関係で選ぶ。
15. **Third-partyはNetwork Costだけでなくmain-thread blockingとavailability riskを持つ。** Non-critical third-partyはPrimary TaskのCritical Pathから外し、必要時はdomain block / SPOF simulationでfailure影響を確認できる。

### Context-dependent / Moderate-confidence

1. **SkeletonはUniversalに最良ではない。** 実Product caseではperceived performance改善例がある一方、wait indicator研究ではspinner / skeleton / progress形式の優劣がtask / duration / presentationで変わる。
2. **Progress Feedbackは「短く感じさせる」ことよりSystem Statusの明確さに価値がある。** Researchでは情報量・進捗の一貫性がpreference / satisfactionに効くが、perceived durationとの関係は単純ではない。
3. **Progressive Renderingは早いPartial ContentがTaskに利用できる場合に強い。** Partial contentを見せても操作不能なら、見た目だけの高速化になる可能性がある。
4. **Adaptive degradationは有効だが、Feature削減をhardware heuristicだけで自動化するのは危険。** Low-endで実測した問題とsafe fallbackがある場合に使う。

### Unknown / intentionally not universalized

- Spinner / Skeletonを表示し始めるUniversal millisecond threshold
- 全API共通Timeout秒数
- 全Project共通Retry回数
- Long-running sessionを定義する固定分数 / 時間
- Virtualizationを必須にする固定Record件数
- 全Media共通MB上限
- Memory usageのUniversal MB ceiling

これらはEvidence上Project variabilityが大きいため、Common hard limitへ昇格しません。

## Core Evidence

主要Source:

- W3C User Timing / Web Performance Working Group publications
  - https://www.w3.org/TR/user-timing/
  - https://www.w3.org/groups/wg/webperf/publications/
- RFC 9110 HTTP Semantics — Idempotent Methods / Retry-After
  - https://www.rfc-editor.org/rfc/rfc9110.html
- MDN Fetch / Response.ok / AbortSignal.timeout / Navigator.onLine
  - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  - https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  - https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static
  - https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
- web.dev User-centric Performance / Web Vitals / Lab vs Field
  - https://web.dev/articles/user-centric-performance-metrics
  - https://web.dev/articles/vitals
  - https://web.dev/articles/lab-and-field-data-differences
- web.dev Long Tasks / Adaptive Loading / Offline / Third-party / Large List / Video
  - https://web.dev/articles/optimize-long-tasks
  - https://web.dev/articles/adaptive-loading-cds-2019
  - https://web.dev/learn/pwa/service-workers
  - https://web.dev/articles/offline-fallback-page
  - https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript
  - https://web.dev/articles/virtualize-long-lists-react-window
  - https://web.dev/learn/performance/video-performance
- Chrome DevTools Memory / Performance Monitor
  - https://developer.chrome.com/docs/devtools/memory-problems
  - https://developer.chrome.com/docs/devtools/performance-monitor
- AWS reliability guidance used only for general retry / timeout failure mechanics
  - https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_mitigate_interaction_failure_limit_retries.html
  - https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_mitigate_interaction_failure_client_timeouts.html
- HCI wait feedback research
  - Branaghan & Sanchez, *Feedback Preferences and Impressions of Waiting* (2009)
  - Chen & Li, *The effect of visual feedback types on the wait indicator interface of a mobile application* (2019)
  - recent loading-interface studies were reviewed as supporting / conflicting context rather than Universal Rule sources

## Research Limitations

- Skeleton / wait-indicator studies differ in task, duration, sample, and UI presentation; some academic evidence was abstract-only. Therefore visual feedback form is kept CONDITIONAL rather than promoted as Universal MUST.
- Network Information / Device Memory signals have incomplete cross-browser support, so adaptive loading is treated as enhancement rather than Core Contract.
- Vendor reliability guidance is used for generic distributed-system failure mechanics only; provider-specific defaults are not promoted.
- No evidence supported Universal timeout / retry count / long-session duration / dataset count thresholds.

## Promoted Decision System

### 1. User-centric Priority

Performance判断の中心を次へ変更する。

```text
Primary Task Ready
+ Interaction Responsiveness
+ Failure / Recovery
+ Runtime Stability
+ Network / Device Cost
```

First paintやLighthouse scoreだけを中心にしない。

### 2. Optimization Escalation Ladder

#### Baseline

原則すべてのUser-facing Web:

- Primary ActionまでのCritical Pathを確認
- Critical / Deferred / On Demandを分離
- Loading / Errorが必要な箇所でsilent failureにしない
- HTTP errorを必要範囲で判定
- obvious long task / unnecessary initial loadを避ける

#### Standard escalation

Interactive App、DATA / CLOUD、外部API、保存・同期等のfailure impactがある場合:

- slow network / CPU条件
- loading / stale / partial / timeout / retry / failed / recovered state
- bounded retry / cancellation / stale response guard
- external dependency failure isolation
- Cold / Repeat比較

#### Extended escalation

Long-running Tool / Editor / Dashboard、MEDIA-heavy、Huge Data、大規模SPA、Canvas / WebGL / Game、重いthird-party、Performanceが主要Riskの場合:

- Performance trace / long task
- memory / repeated action / route cycle
- large-data bottleneck separation
- third-party SPOF / blocking test
- long-session / reconnect repetition
- representative low-end device / stronger throttling
- Field / RUM検討（一般公開で十分なtrafficがある場合）

Profile名だけでLevelを固定せず、Current Runtime / User Task / Risk Signalで上げ下げする。

### 3. Loading / Perceived Performance

- 「何か見えた」と「Primary Taskが使える」を分ける。
- Existing contentを安全に保持できるbackground refreshでは、blank / full-page loadingへ戻さないことを優先検討する。
- Determinate progressが分かる処理ではprogress表示を優先候補にする。
- Skeletonはlayout predictionが安定し、content shapeが分かり、placeholderがflicker / misinformationを増やさない場合だけ候補にする。
- Perceived speed改善を実際の操作不能・stale state・data riskを隠す理由にしない。

### 4. Failure Isolation

Dependencyを少なくとも次へ分ける。

- **Critical** — 失敗するとPrimary Task自体が成立しない
- **Important but degradable** — 一部機能は失うがPrimary Taskを残せる
- **Non-critical** — Analytics / optional embed等、Primary Taskから外せる

Non-critical dependency failureをFull-page failureへ拡大しない。

### 5. Retry

- Read / idempotent operationはtransient failureでbounded auto retry候補。
- Non-idempotent writeはidempotency / duplicate prevention / revision check等で安全性を確保できない限りautomatic retryしない。
- `Retry-After`等server guidanceがあれば尊重する。
- Backoff / jitterはretry storm riskがあるremote dependencyで候補にする。
- Retryは上限とStop Conditionを持ち、失敗を無限loopで隠さない。

### 6. Timeout / Cancel

- Universal timeout秒数を作らない。
- **User-facing wait feedback** と **request / operation timeout** を分離する。
- Timeout後もserver processingが継続し得るwriteでは、late result / duplicate / state reconciliationを考慮する。
- Long computation / export / import / media処理等はCancel価値が高い場合にcancelableにする。

### 7. Offline Degradation

Offlineをbinary featureにしない。

```text
No offline guarantee
→ clear unavailable state
→ cached / last-known-good read
→ local read-only capability
→ local edit + pending queue
→ richer offline workflow
```

上位LevelほどData / Storage contractが必要。`navigator.onLine`のみをauthorityにしない。Service Workerを全Projectへ強制しない。

### 8. Slow Device

- Low-endでPrimary Taskが破綻するRiskがある場合にCPU / device constraint validationを強化する。
- Degrade候補はnon-essential animation、visual effect、media quality、prefetch、background work等を優先する。
- Core functionalityをlimited-support hardware/network APIだけでdisableしない。

### 9. Memory / Long Session

- Long-runningかどうかは「何分」ではなくExpected Session / repeated lifecycleで判断する。
- Editor / Player / Dashboard / Game / SPA等では、open-close、route change、reconnect、media replace等のrepetition後にheap / DOM / listener等が一方向に増え続けないかを見る。
- Memory peak自体ではなく、不要Resourceがreleaseされずprogressive degradationするかをLeak判断の中心にする。

### 10. Huge Data

次を別Bottleneckとして測る。

- Fetch / Transfer
- Parse / Decode
- Search / Sort / Filter / Computation
- DOM / Rendering
- Memory
- Save / Sync / Migration

Virtualization / Worker / chunking等はbottleneckが確認されたときに選ぶ。Record countだけで導入しない。

### 11. Media

- Critical View / Deferred / Interaction-triggeredを分ける。
- Responsive image、thumbnail / poster、metadata-only、click-to-load等をcontent roleとnetwork costから選ぶ。
- Media quality degradationはPrimary visual meaningを壊さない範囲で行う。
- Multiple embeds / video-heavy pageではthird-party / decode / memoryも確認する。

### 12. Third-party

- Third-partyをPerformance / Availability上のExternal Dependencyとして扱う。
- Non-critical third-partyはdefer / on-demand / interaction後load候補。
- Critical third-partyはfailure / timeout時のPrimary Task impactを確認する。
- `async` / `defer`だけでCPU costが消えるとは扱わない。

### 13. Measurement

- Public WebではCurrent Core Web Vitalsを共通Signalとして維持する。
- Field dataがある場合はUser impactの優先順位に利用し、Labはdebug / regression / low-end reproductionに利用する。
- Primary Task固有Metricが必要ならUser Timing等で追加測定する。
- Lighthouse score単独をCompletion Oracleにしない。

### 14. Optimization Stop Condition

次を満たす場合、さらに速くできても追加最適化を止めてよい。

- Primary Taskがrepresentative conditionで実用上利用可能
- Review Trigger超過が解消または理由付きで許容されている
- Critical dependency failure / timeout / retry loop等の重大Known Reliability issueがない
- Target Projectに必要なslow network / slow device / memory / long-session / large-data testが通る
- Before / AfterでUser-facing benefitまたはRisk reductionを確認できる
- 次の最適化の期待BenefitがComplexity / Maintainability / Regression Riskに対して小さい

Soft Budget内でもPrimary UXが悪ければ止めない。Soft Budget超過でも目的上必要で実測UXが成立し、代替を検討済みなら自動Failにしない。

## Owner Promotion Map

- Performance / Reliability behavior → [`../../docs/05-performance-reliability.md`](../../docs/05-performance-reliability.md)
- Data authority / Offline write / Sync / Conflict / Duplicate preventionのData Contract → [`../../docs/03-data-storage.md`](../../docs/03-data-storage.md)
- Security → [`../../docs/06-security.md`](../../docs/06-security.md)
- Testing strategy / Verification state → [`../../docs/07-testing-quality.md`](../../docs/07-testing-quality.md)
- GitHub Pages Service Worker update / cache busting → [`../../docs/08-github-pages.md`](../../docs/08-github-pages.md)
- Dependency / Asset governance → [`../../docs/13-dependencies-assets.md`](../../docs/13-dependencies-assets.md)
- Short execution check → [`../../templates/QUALITY_CHECKLIST.md`](../../templates/QUALITY_CHECKLIST.md)

## Completion

Phase 5 current-scope Researchは次を満たしたためPromotion可能と判断しました。

- A〜MのDecision Domainを調査
- Supporting / opposing / limitationを確認
- Universal / Context-dependentを分離
- Existing Soft BudgetをReview Triggerとして維持
- Loading / Failure / Retry / Timeout / OfflineをDecision Model化
- Slow Device / Memory / Long SessionのEscalationを整理
- Huge Data / Media / Third-partyをTrigger-basedに整理
- Validation Depth / Stop Conditionを定義
- 新Owner / Gateを作らず既存Ownerへ統合

詳細な検索履歴は保存せず、Core Evidence / Limitations / Promoted DecisionsをこのHistorical Recordへ残します。
