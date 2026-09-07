# 05 Performance / Reliability

この章は、**Page Load Performance、Primary Task readiness、Runtime responsiveness、Loading / Failure / Recovery、外部依存を含むPerformance / Reliability判断のNormative Owner**です。

Data / Storage構造は [03 Data / Storage](03-data-storage.md)、Testing戦略とVerification Stateは [07 Testing / Quality](07-testing-quality.md)、GitHub Pages固有のCache Busting / Service Worker更新は [08 GitHub Pages](08-github-pages.md)、Dependency / AssetのLicense・配布元・Repository管理は [13 Dependencies / Assets](13-dependencies-assets.md) を正本とします。

## 目的

「軽い」をRepository容量、First Paint、Lighthouse Scoreだけで判断せず、**UserがPrimary Taskを開始・継続・回復できるまでに実際に負担するCost**で設計・確認します。

Performance / Reliability Costには少なくとも次を含めます。

- Network Transfer / Request wait
- HTML / CSS / JavaScriptのParse
- JavaScript Execution / Main Thread Blocking
- 画像・動画・Font等のDecode
- DOM生成 / Layout / Rendering
- API / CDN / Supabase / Analytics / Embed等の外部通信
- Loading中の操作不能 /不明瞭なSystem State
- Timeout / Retry / Partial Failure / Provider Failure
- Slow Device / Memory pressure / Long-running Session

Repository総容量はGit管理・配布設計では意味がありますが、Page Load Performanceとは別の指標です。

## 適用範囲 / Over-optimization Guard

原則としてUser-facing Web Site / Web Appを対象とします。ElectronでもRendererがWeb UIとして同じCostを持つ範囲では適用します。

ただし、**小規模な`STATIC` Siteへ複雑な最適化Architectureを機械的に追加しません。** 数KBの削減や測定Scoreの改善より、可読性・修正容易性・安定性を大きく損なう場合は過剰最適化です。

`DATA` / `MEDIA` / `CLOUD`、大規模SPA、Canvas / Animation、重い外部依存、長時間利用するTool / Editor / Dashboard等では確認強度を上げます。

Profile名だけで必要対策を固定せず、Current Runtime / User Task / Risk Signalで判断します。

## User-centric Performance Model

Performanceは次を分けて考えます。

1. **Visible** — 何かが画面へ出た
2. **Usable** — Main Contentが理解できる
3. **Primary Task Ready** — 主要操作が実際に反応する
4. **Background Complete** — Secondary Data / Analytics / optional media等まで完了した
5. **Runtime Stable** — 操作を続けてもresponsiveで、memory / resourceが破綻しない

### MUST: 表示済みと操作可能を混同しない

Shell / Skeleton / contentが見えていても、Primary Actionが長時間反応しないならPerformance issueとして扱います。

Perceived Performance改善を、実際の操作不能、stale state、data riskを隠す理由にしません。

## 基本原則

1. **Repository SizeとPage Load Costを分ける。** Repositoryが小さいことだけで軽いと判断しない。
2. **Critical Pathを優先する。** First ViewとPrimary Actionに必要なResourceを先にする。
3. **Load What You Need。** 将来使う可能性だけで初期Resourceへ含めない。
4. **Networkだけを見ない。** Parse / Decode / Execution / DOM / RenderingもCostとして扱う。
5. **External Resourceも例外にしない。** CDNや外部APIもInitial Cost / Failure Riskへ含める。
6. **Cold Loadを確認する。** Cache済みの開発PCだけで初期性能を判断しない。
7. **Slow Network / Slow DeviceをRiskに応じて考慮する。** 高性能PC + 高速回線だけで完成判定しない。
8. **FailureをHappy Pathの外に置かない。** Primary Taskへ影響する外部通信はFailure / Recoveryまで見る。
9. **保守性を壊す過剰最適化を避ける。** Performance改善のComplexity自体もCostとして扱う。

## Optimization Escalation Ladder

### Baseline

原則すべてのUser-facing Webで、変更内容に関係する範囲を確認します。

- Primary ActionまでのCritical Path
- Critical / Deferred / On Demand
- Loading / Errorが必要な箇所のsilent failure防止
- 不要なInitial JS / JSON / Media / External Resource
- HTTP errorの必要な判定
- 明らかなLong Task / UI freeze

### Standard Escalation

Interactive Web App、`DATA` / `CLOUD`、External API、Save / Sync等のfailure impactがある場合に追加候補とします。

- Mobile / Slow Network / 必要に応じたCPU Throttling
- Loading / stale / partial / timeout / retry / failed / recovered state
- bounded retry / cancellation / stale response guard
- external dependency failure isolation
- Cold / Repeat Load比較

### Extended Escalation

Long-running Tool / Editor / Dashboard、`MEDIA`、Huge Data、大規模SPA、Canvas / WebGL / Game、重いthird-party、Performance改善が主要目的の場合に追加候補とします。

- Performance Trace / Main Thread
- Memory / repeated action / route cycle
- Large-data bottleneck separation
- Third-party blocking / SPOF simulation
- Long-session / reconnect repetition
- Representative low-end deviceまたは強めのCPU / Network条件
- 一般公開かつ十分なtrafficがある場合のField / RUM

Level名だけで全項目を強制せず、実際のRiskへ対応する項目だけ使います。

## Resourceの読み込みTiming

Resourceは必要に応じて次の3区分で考えます。

- **Critical** — First View / Primary Actionに必要で、初期Loadする
- **Deferred** — 初期表示後に読み込んでも主要UXを妨げない
- **On Demand** — User操作、対象Route、対象Featureの利用時に初めて必要

基本判断:

- First View外の画像・MediaはLazy Load候補
- LCP候補画像を機械的にLazy Loadしない
- Heavy Library、別Route用JS、別Category Data、Video Player等はDeferred / On Demandを検討
- Lazy LoadしすぎてPrimary Action直前に長い待ち時間を作らない
- Prefetch / Preloadは、次に使う可能性が高くCostが妥当なResourceだけ検討
- Non-critical API / Analytics等の完了をPrimary UI表示の前提にしない

## Default Soft Budget / Review Trigger

次はWeb標準の絶対上限ではなく、Guideの**Default Target / Review Trigger**です。

| 対象 | Target | Review Trigger |
|---|---:|---:|
| Initial Transfer合計 | ～1MB | 2MB超 |
| Initial JavaScript | ～200KB | 350KB超 |
| First View画像 1枚 | ～300KB | 500KB超 |
| First View画像 合計 | ～700KB | 1MB超 |
| 初期JSON 1 Request | ～250KB | 500KB超 |
| 初期JSON 合計 | ～500KB | 1MB超 |
| 初期DOM | ～1,000 nodes | 1,500 nodes超 |

**Review Trigger超過は自動Failではありません。** 超過した場合は次を確認します。

```text
初期表示に本当に必要か
↓
Deferred / On Demandへ移せるか
↓
利用単位で分割できるか
↓
圧縮 / 縮小できるか
↓
CacheでRepeat Costを下げられるか
↓
より軽い代替があるか
↓
目的上必要なら理由付きで許容
```

逆にSoft Budget内でもPrimary Task readiness / Runtime UXが悪ければ改善対象です。

固定上限を原則設けないもの:

- Repository総容量
- CSS / JS / JSONのFile数
- API Request数
- 動画Fileの総容量
- Font File数そのもの
- 全Request共通Timeout秒数
- 全Project共通Retry回数
- Long-running sessionの固定時間
- Virtualizationを要求する固定Record件数
- MemoryのUniversal MB上限

これらは用途、Load Timing、Failure Risk、Runtime Cost、Cacheability、保守性で判断します。

## Loading UX / Progress Feedback

Loading UIは「速く見せる装飾」ではなく、**現在Stateと次に可能な行動を伝えるFeedback**として扱います。

### State選択

- 非常に短く完了し、UIが安定する処理 → indicatorなしでもよい
- 完了時刻が不明でUserが待つ必要がある → Spinner / status text等を候補
- 進捗率や処理段階を正しく計測できる → Determinate progressを優先候補
- Existing contentを安全に保持できるbackground refresh → blankへ戻さず既存表示 + refresh stateを優先検討
- 長時間処理 → Progress / status / CancelをRiskに応じて追加

Universalな「何msからSpinner」閾値は設けません。Flicker、通常Duration、Task Criticalityを実測して決めます。

### Skeleton / Progressive Rendering

SkeletonはDefault Componentにしません。

採用候補:

- layout / content shapeを高い確度で予測できる
- placeholderから実Contentへの差が小さい
- layout stabilityを保てる
- partial structureを早く見せることがUserのorientationに役立つ

避ける候補:

- 実Layoutと大きく違う
- 短いLoadingでflickerを増やす
- contentが見えたように見えるがPrimary Actionは使えない
- false progress / misinformationになる

Progressive Rendering / Chunk Renderingは、**先に出たPartial Contentが実際に利用可能**な場合に優先価値があります。

## Network Failure / Partial Failure

Dependencyを少なくとも次へ分けます。

- **Critical** — 失敗するとPrimary Task自体が成立しない
- **Important but degradable** — 一部機能は失うがPrimary Taskを残せる
- **Non-critical** — Analytics / optional embed等、Primary Taskから外せる

### SHOULD: Failure blast radiusをCriticalityへ合わせる

Non-critical dependency failureをFull-page Errorへ拡大しません。

候補:

- Full-page error — Page / Primary Task成立に必須のDataが取得不能
- Inline error — Component / secondary featureだけ失敗
- Stale / last-known-good — Freshness RiskをUserが理解でき、古いDataでも安全な場合
- Partial rendering — 成功した独立部分だけでもTask価値がある場合

`fetch()`は4xx / 5xxでも自動的にrejectされないため、必要な通信では`response.ok` / `status`等で失敗を判定します。

## Retry / Backoff / Duplicate Prevention

Retryは「通信が失敗したら自動再送」ではなく、**Operation Safety + Failure Type + User Cost**で決めます。

### Auto Retry候補

- GET等のread
- idempotent operation
- application側でidempotency / duplicate preventionが保証されるoperation
- transient failureで再試行価値が高い

### Manual Retry / Confirmation候補

- non-idempotent write
- duplicateでUser Data / Payment / Submission等へ重大影響がある
- original operationがserverへ適用済みか不明

### MUST: unsafe non-idempotent writeを無条件Auto Retryしない

Automatic Retryする場合は必要に応じて:

- retry回数 / durationの上限
- exponential backoff
- jitter
- `Retry-After`等server guidance
- idempotency key / revision / operation ID
- user-visible retry state

を組み合わせます。

同じ失敗を無限loopで隠しません。Retry / duplicate preventionのData Contractは [03 Data / Storage](03-data-storage.md) を正本とします。

## Timeout / Cancel / Late Result

Universal timeout秒数を作りません。

Timeoutは少なくとも次を分けます。

- **User-facing wait feedback** — Userへ「まだ処理中」と知らせるTiming
- **Request / operation timeout** — 実際に処理を中断・失敗扱いにする境界

Timeoutが短すぎるとfalse failure / retry trafficを増やし、長すぎるとresourceを保持するため、Dependencyの通常Latency、Task Criticality、Retry Cost等で調整します。

`AbortController` / `AbortSignal`等はCancel手段の候補です。

Cancel価値が高い例:

- 長時間解析
- export / import
- media処理
- 大量Data処理
- Userが別Taskへ移る可能性が高いRequest

Timeout / Cancel後もserver側writeが継続し得る場合は、late result、duplicate、stale responseによるCurrent State上書きを防ぎます。

## Offline Degradation / Connectivity Change

Offline対応を「完全対応 / 非対応」の二択にしません。

```text
No offline guarantee
→ clear unavailable state
→ cached / last-known-good read
→ local read-only capability
→ local edit + pending queue
→ richer offline workflow
```

上位Levelほど [03 Data / Storage](03-data-storage.md) のOffline / Pending / Conflict / Sync Contractが必要です。

### MUST: `navigator.onLine`だけで通信可能性を確定しない

`navigator.onLine` / online / offline eventはHintとして利用できますが、実Request成功の代用にはしません。

Service WorkerはOffline / PWA等で価値があるProjectだけ導入候補とし、Core Featureの成立条件へ機械的にしません。

## Slow Device / Constrained Runtime

Low-end deviceでPrimary Taskが破綻するRiskがある場合、NetworkだけでなくCPU / Memory / Render Costを確認します。

確認候補:

- CPU Throttling
- 実Low-end device
- Animation / Blur / Canvas / Particle / heavy JS
- Initial DOM / repeated layout
- background computation

Adaptive degradation候補:

- non-essential animation / visual effectを減らす
- media quality / autoplayを抑える
- non-critical prefetch / background workを減らす
- expensive optional featureを遅延する

Network Information / Device Memory等のlimited-support APIをCore functionalityの唯一の判定材料にしません。

Known high-end-device-only internal Tool等、利用環境が明示的に限定されるProjectではそのConstraintを理由付きで採用できます。

## JavaScript / DOM / Main Thread

JavaScriptはFile Sizeだけでなく、Load Timing、Execution Cost、Main Thread Blockingを合わせて確認します。

- 特定Page / Feature専用の重いJavaScriptを理由なく全Pageで読み込まない
- Page / Feature単位のCode Splitting / Dynamic Importを必要に応じて使う
- `type="module"` / `defer`等、初期HTML Parsingを不必要にBlockしない構成を選ぶ
- Page Load直後に大量の同期計算を一括実行しない
- Data件数とDOM件数を同一視しない
- DOM更新を必要以上に細かく繰り返さない
- 不要Node / Listener / Timer / Observer / Blob URL等をCleanupする
- 常時Animation / Particle / Canvas / Scroll Effect等もMain Thread Costとして確認する

### Long Task

50msを大きく超える同期処理が続く場合は診断・分割を検討します。50msはLong Task Signalであり、すべてのFunctionを50ms未満にするUniversal Completion Ruleではありません。

候補:

- chunk処理
- `requestAnimationFrame`
- `setTimeout` / yield / `scheduler.yield()`等
- Web Worker
- 二段階解析

細かくyieldしすぎてoverheadが増える場合もあるため、実測して調整します。

## Memory Leak / Long-running Session

Long-runningを固定分数で定義しません。Expected Session、repeated lifecycle、Resource sizeで判断します。

Riskが高い例:

- SPA
- Editor
- Player
- Dashboard
- Game / Canvas / WebGL
- 画像 / 動画解析
- 頻繁なRoute / Modal / Tab / Reconnect切替

確認では単一Peakより、同じ操作を繰り返した後に不要Resourceが解放されず増え続けるかを重視します。

代表Signal:

- JS heapがcycleごとに一方向へ増える
- Detached DOMが残る
- DOM node / listener / timer / observerが戻らない
- Blob URL / media / Canvas / WebGL resourceが残る
- GCが頻発しRuntimeが徐々に重くなる

Memoryが一時的に増えるだけでLeakと断定せず、operation完了 / cleanup / GC後にstabilizeするかを確認します。

## JSON / Huge Data / Heavy Computation

JSONのSchema、Storage、Manifest等のData設計は [03 Data / Storage](03-data-storage.md) を正本とします。この章ではLoad TimingとRuntime Costを扱います。

Large DataはRecord件数だけでなく次を分離します。

- Fetch / Transfer
- Parse / Decode
- Search / Sort / Filter / Computation
- DOM / Rendering
- Memory
- Save / Sync / Migration

基本判断:

- Page / Route / Category / Feature等、Userがその時点で使う意味のある単位で読む
- Top Page表示だけで全Category DataをEager Loadしない
- 検索では軽量Indexを先に使い、Detail本文をOn Demand取得する構成を優先検討する
- 巨大JSON取得直後に全件DOM化することを前提にしない
- Pagination / Load More / Chunk Rendering / Virtualizationは**実際のbottleneckに応じて**検討する
- CPU-heavy処理はchunk / Worker等を必要に応じて検討する
- 1 Record = 1 File等、意味のない極端な細分化でRequest / 管理Costを増やさない

全件取得が許容でも全件DOM化が不適切な場合があります。Network / Rendering / Memoryを別問題として測ります。

## Image / Video / Fonts / Heavy Media

Mediaは**役割 + Load Timing + Device / Network Cost**で判断します。

- 実際の表示寸法に合う画像を配信し、Desktop向け巨大画像をそのままMobileへ送らない
- 必要に応じてWebP / AVIF、SVG、`srcset` / `sizes`、Thumbnail、圧縮を使い分ける
- `width` / `height`またはAspect Ratioを確保しLayout Shiftを抑える
- First View外のMediaはLazy Load候補
- LCP候補Mediaは機械的に遅延しない
- User再生まで不要な動画本体は`preload="none"` / `metadata`、poster等を検討する
- YouTube等の複数EmbedではThumbnail / PosterからClick-to-loadを優先検討する
- Background Videoは条件付きとし、目的、Poster / Fallback、Mobile / Slow Network、Reduced Motion、実測影響を確認する
- Google Fonts等は不要なFamily / Weightを大量取得しない
- 音付きAutoplayを前提にしない

動画やMediaは単純な総MB上限より、**いつDownload / Decode / Hold in Memoryされるか**を重視します。

Media qualityを下げる場合はPrimary visual meaning / readabilityを壊さない範囲にします。

## Third-party Scripts / External Runtime Dependency

Third-partyを「CDNだから速い」「asyncだから無料」と扱いません。

Performance / Reliability上は次を確認します。

- Network connection / transfer
- parse / execute / Long Task
- iframe / embed cost
- Criticality
- Provider failure / timeout
- Primary Taskへのfailure blast radius

基本判断:

- API / Supabaseは初期表示に必要な最小Dataを優先
- 同一Dataの重複Fetchを避ける
- 第三者JSを理由なく全Pageで読み込まない
- Non-critical third-partyはDeferred / On Demand / interaction後load候補
- Critical third-partyはfailure / timeout時のPrimary Task impactを確認する
- `async` / `defer`を使ってもExecution Cost自体は消えない
- valueが小さくcost / riskが大きいthird-partyは削除候補

Extended確認では、domain block / SPOF simulation等でProvider unavailable時の挙動を確認できます。

Security固有の判断は [06 Security](06-security.md)、Dependency管理は [13 Dependencies / Assets](13-dependencies-assets.md) を正本とします。

## Cache

Cacheは **変更頻度 × 再利用頻度 × stale Risk** で判断します。

- Browser Cacheを活用しやすい構成を優先する
- Cold LoadとRepeat Loadを分けて確認する
- Cache目的で巨大JSON / 巨大JSへまとめない
- Version付きStatic Assetと、Freshnessが重要なAPI / User Dataを同じ方針で扱わない
- Service WorkerはOffline / PWA等で価値があるProjectだけ導入候補とする

GitHub Pages固有のCache Busting / Service Worker更新戦略は [08 GitHub Pages](08-github-pages.md) を正本とします。

## Core Web Vitals / Task-specific Metrics

公開WebではCurrent Core Web Vitalsを共通Signalとして使います。

- LCP: 2.5秒以下
- INP: 200ms以下
- CLS: 0.1以下

可能な場合は75 percentileを基準にし、Mobile / Desktopの差も確認します。

これらは単独で完成判定に使いません。個人用ToolでもPrimary Actionが明らかに固まる場合は改善対象です。

Project固有のPrimary Task latencyが重要なら、User Timing等で意味のあるmark / measureを追加できます。

## Lab / Field Measurement

### Lab

強み:

- 再現性
- Release前Regression
- Network / CPU Throttling
- Trace / Root Cause診断

### Field / RUM

強み:

- 実UserのDevice / Network / Interaction差
- 実際のslow tail / percentile
- production-specific bottleneck

Field dataがある場合、User impactの優先順位にはFieldを重視します。ただしFieldだけでは原因診断や未到達Userを捉えにくいためLabも維持します。

Field / RUMをtrafficの少ない個人Siteへ機械的に追加しません。

## Performance確認の強度

Testing全体の戦略とVerification Stateは [07 Testing / Quality](07-testing-quality.md) を正本とします。

### Minimum

小規模Siteを含むUser-facing Webで、変更内容に関係する範囲を確認します。

- Cold LoadでDevTools Networkを確認
- Initial Transfer / 初期Requestを確認
- 初期表示に不要なJS / JSON / Media / external resourceがないか確認
- Review Trigger超過Resourceがあれば理由を確認
- Page表示後のPrimary Actionが通常利用できるか確認
- 必須通信が失敗したときsilent failureにならないか確認

### Standard

通常のWeb App、`DATA` / `CLOUD`等では必要に応じてMinimumへ追加します。

- Lighthouse等のLab診断
- Mobile Viewport / Network Throttling
- 必要に応じてCPU Throttling
- Core Web Vitals / Long Task / Initial DOM / External Request
- Cold Load / Repeat Load比較
- Loading / timeout / retry / partial failureの代表State

### Extended

`MEDIA`、大量Data、大規模SPA、Canvas / Animation、Long-running Tool、大きな外部依存、Performance改善が主要目的の場合に追加します。

- Performance Trace / Main Thread
- Script Execution / Layout / Rendering
- Network Waterfall
- Memory / repeated action
- Slow Network / CPU / representative low-end condition
- Third-party unavailable / slow response
- Long-session / reconnect repetition
- Before / After比較
- 必要ならField / RUM

Lighthouse Score、Request数、File数の1指標だけで性能を判定しません。

## Optimization Stop Condition

「まだ速くできる」だけでは作業を続けません。

次を満たす場合、追加最適化を止めてよいです。

- Primary Taskがrepresentative conditionで実用上利用可能
- Review Trigger超過が解消または理由付きで許容されている
- Critical dependency failure / timeout / retry loop等の重大Known Reliability issueがない
- Target Projectに必要なslow network / slow device / memory / long-session / large-data確認が通る
- Before / AfterでUser-facing benefitまたはRisk reductionを確認できる
- 次の最適化の期待BenefitがComplexity / Maintainability / Regression Riskに対して小さい

逆に次では止めません。

- Soft Budget内だから
- Lighthouse Scoreが高いから
- 自分の高性能PCで速いから
- Repositoryが小さいから
- CDN / Cacheがあるから

## 例外

Soft Budget / Default Ruleから外れる場合は、少なくとも次を判断材料にします。

- Project目的上そのCostが必要か
- より軽い代替を検討したか
- 実際の読み込み / 操作性能を確認したか
- Mobile / Slow Networkへの影響を把握したか
- Lazy Load / 圧縮 / 分割 / Cache等の適用余地を確認したか
- Primary UXを極端に悪化させていないか

重要な意図的超過はRequirements / SPEC / Work Report等の適切な既存文書へ短く理由を残せます。Performance Exception専用の新しいSource of Truthは作りません。
