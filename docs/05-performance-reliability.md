# 05 Performance / Reliability

この章は、**Page Load Performance全体、Runtime responsiveness、外部依存を含むPerformance / Reliability判断のNormative Owner**です。

Data / Storage構造は [03 Data / Storage](03-data-storage.md)、Testing戦略とVerification Stateは [07 Testing / Quality](07-testing-quality.md)、GitHub Pages固有のCache Busting / Service Worker更新は [08 GitHub Pages](08-github-pages.md)、Dependency / AssetのLicense・配布元・Repository管理は [13 Dependencies / Assets](13-dependencies-assets.md) を正本とします。

## 目的

「軽い」をRepository容量やLighthouse Scoreだけで判断せず、**1 Page / Routeを開いたときにUserが実際に負担するCost**で設計・確認します。

Performance Costには少なくとも次を含めます。

- Network Transfer / Request wait
- HTML / CSS / JavaScriptのParse
- JavaScript Execution / Main Thread Blocking
- 画像・動画・Font等のDecode
- DOM生成 / Layout / Rendering
- API / CDN / Supabase / Analytics / Embed等の外部通信

Repository総容量はGit管理・配布設計では意味がありますが、Page Load Performanceとは別の指標です。

## 適用範囲

原則としてUser-facing Web Site / Web Appを対象とします。ElectronでもRendererがWeb UIとして同じCostを持つ範囲では適用します。

ただし、**小規模な`STATIC` Siteへ複雑な最適化Architectureを機械的に追加しません。** 数KBの削減より、可読性・修正容易性・安定性を大きく損なう場合は過剰最適化です。

`DATA` / `MEDIA` / `CLOUD`、大規模SPA、Canvas / Animation、重い外部依存等では確認強度を上げます。

## 基本原則

1. **Repository SizeとPage Load Costを分ける。** Repositoryが小さいことだけで軽いと判断しない。
2. **Critical Pathを優先する。** First ViewとPrimary Actionに必要なResourceを先にする。
3. **Load What You Need。** 将来使う可能性だけで初期Resourceへ含めない。
4. **Networkだけを見ない。** Parse / Decode / Execution / DOM / RenderingもCostとして扱う。
5. **External Resourceも例外にしない。** CDNや外部APIもInitial Costへ含める。
6. **Cold Loadを確認する。** Cache済みの開発PCだけで初期性能を判断しない。
7. **Mobile / Slow Networkを考慮する。** 高性能PC + 高速回線だけで完成判定しない。
8. **保守性を壊す過剰最適化を避ける。** Performance改善のComplexity自体もCostとして扱う。

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

逆にSoft Budget内でも実測UXが悪ければ改善対象です。

固定上限を原則設けないもの:

- Repository総容量
- CSS / JS / JSONのFile数
- API Request数
- 動画Fileの総容量
- Font File数そのもの

これらは用途、Load Timing、Network Cost、Execution Cost、Cacheability、保守性で判断します。

## 画像・動画

- 実際の表示寸法に合う画像を配信し、Desktop向け巨大画像をそのままMobileへ送らない
- 必要に応じてWebP / AVIF、SVG、`srcset` / `sizes`、Thumbnail、圧縮を使い分ける
- `width` / `height`またはAspect Ratioを確保しLayout Shiftを抑える
- First View外のMediaはLazy Load候補とする
- User再生まで不要な動画本体を理由なく初期Downloadしない
- YouTube等の複数EmbedではThumbnail / PosterからClick-to-loadする方式を優先検討する
- Background Videoは条件付きとし、目的、Poster / Fallback、Mobile / Slow Network、Reduced Motion、実測影響を確認する
- 音付きAutoplayを前提にしない

動画は単純な総MB上限より、**いつDownloadされるか**を重視します。

## JSON / DataのLoad Performance

JSONのSchema、Storage、Manifest等のData設計は [03 Data / Storage](03-data-storage.md) を正本とします。この章ではLoad TimingとRuntime Costを扱います。

- Page / Route / Category / Feature等、Userがその時点で使う意味のある単位で読む
- Top Page表示だけで全Category DataをEager Loadしない
- 検索では軽量Indexを先に使い、Detail本文をOn Demand取得する構成を優先検討する
- 巨大JSON取得直後に全件DOM化することを前提にしない
- Pagination / Load More / Chunk Rendering / Virtualizationは必要な規模で検討する
- 1 Record = 1 File等、意味のない極端な細分化でRequest / 管理Costを増やさない

固定KBだけでData構造を決めず、**利用単位 + Load Timing**を主基準にします。

## JavaScript / DOM / Main Thread

JavaScriptはFile Sizeだけでなく、Load Timing、Execution Cost、Main Thread Blockingを合わせて確認します。

- 特定Page / Feature専用の重いJavaScriptを理由なく全Pageで読み込まない
- Page / Feature単位のCode Splitting / Dynamic Importを必要に応じて使う
- `type="module"` / `defer`等、初期HTML Parsingを不必要にBlockしない構成を選ぶ
- Page Load直後に大量の同期計算を一括実行しない
- Data件数とDOM件数を同一視せず、大量Listは必要に応じてPagination / Chunk / Virtualizationを使う
- DOM更新を必要以上に細かく繰り返さない
- 不要Node / Listener / Timer / Blob URL等をCleanupする
- 常時Animation / Particle / Canvas / Scroll Effect等もMain Thread Costとして確認する

### Long Task

50msを大きく超える同期処理が続く場合は分割を検討します。

候補:

- chunk処理
- `requestAnimationFrame`
- `requestIdleCallback`（補助用途）
- `setTimeout` / yield
- Web Worker
- 二段階解析

長い処理には進捗表示とCancelを検討します。

## External Resource / API / CDN

外部ResourceもInitial Transfer / Wait Costへ含め、Critical / Deferred / On Demandへ分類します。

- API / Supabaseは初期表示に必要な最小Dataを優先
- 同一Dataの重複Fetchを避ける
- Google Fontsは不要なFamily / Weightを大量取得しない
- CDNだから必ず高速とは仮定しない
- 第三者JSを理由なく全Pageで読み込まない
- 外部Service失敗時はCriticalityに応じてLoading / Error / Retry / Fallback / Progressive Enhancementを考える

`fetch()`は404/500でも自動的にrejectされないため、必要な通信では`response.ok`等で失敗を判定します。

重要機能を1つの外部配信元だけに依存させないことを優先し、対応可能ならSRI等も検討します。Security固有の判断は [06 Security](06-security.md) を確認します。

## Cache

Cacheは **変更頻度 × 再利用頻度 × stale Risk** で判断します。

- Browser Cacheを活用しやすい構成を優先する
- Cold LoadとRepeat Loadを分けて確認する
- Cache目的で巨大JSON / 巨大JSへまとめない
- Version付きStatic Assetと、Freshnessが重要なAPI / User Dataを同じ方針で扱わない
- Service WorkerはOffline / PWA等で価値があるProjectだけ導入候補とし、全Siteへ強制しない

GitHub Pages固有のCache Busting / Service Worker更新戦略は [08 GitHub Pages](08-github-pages.md) を正本とします。

## Core Web Vitalsの目安

公開Webでは以下を良好目安として使います。

- LCP: 2.5秒以下
- INP: 200ms以下
- CLS: 0.1以下

これらはSoft Budgetと同様、単独で完成判定に使いません。個人用Toolでも操作が明らかに固まる場合は改善対象です。

## Performance確認の強度

Testing全体の戦略とVerification Stateは [07 Testing / Quality](07-testing-quality.md) を正本とします。Performance固有の確認深度は次を目安に選びます。

### Minimum

小規模Siteを含むUser-facing Webで、変更内容に関係する範囲を確認します。

- Cold LoadでDevTools Networkを確認
- Initial Transfer / 初期Requestを確認
- 初期表示に不要なJS / JSON / Media / 外部Resourceがないか確認
- Review Trigger超過Resourceがあれば理由を確認
- Page表示後のPrimary Actionが通常利用できるか確認

### Standard

通常のWeb App、`DATA` / `CLOUD`等では必要に応じてMinimumへ追加します。

- Lighthouse等のLab診断
- Mobile Viewport / Network Throttling
- 必要に応じてCPU Throttling
- Core Web Vitals / Long Task / Initial DOM / External Request
- Cold Load / Repeat Load比較

### Extended

`MEDIA`、大量Data、大規模SPA、Canvas / Animation、大きな外部依存、Performance改善が主要目的の場合に追加します。

- Performance Trace / Main Thread
- Script Execution / Layout / Rendering
- Network Waterfall
- Memory
- Slow Network / CPU条件
- Before / After比較

Lighthouse Score、Request数、File数の1指標だけで性能を判定しません。

## Cancel / Progressive Enhancement / Memory

長時間通信・解析では`AbortController`等でCancel可能にすることを検討します。

高度機能や外部依存が失敗しても、可能なら基本操作を残します。

例:

- ZIPライブラリ失敗 → JSON / TXT個別出力
- Service Worker不可 → 通常Online利用
- 自動解析不可 → 手動入力

Blob URLは不要になったら`URL.revokeObjectURL()`で解放します。長時間利用するPlayer・画像編集・動画解析ではListener、Timer、Object URL、巨大配列が残り続けないか確認します。

## 例外と過剰最適化

Soft Budget / Default Ruleから外れる場合は、少なくとも次を判断材料にします。

- Project目的上そのCostが必要か
- より軽い代替を検討したか
- 実際の読み込み / 操作性能を確認したか
- Mobile / Slow Networkへの影響を把握したか
- Lazy Load / 圧縮 / 分割 / Cache等の適用余地を確認したか
- Primary UXを極端に悪化させていないか

次だけでは十分な例外理由になりません。

- Repositoryが小さい
- 自分の高性能PCでは速い
- CDNだから大丈夫
- 実装が楽
- 後で使うかもしれない
- Lighthouse Scoreが高い

重要な意図的超過はRequirements / SPEC / Work Report等の適切な既存文書へ短く理由を残せます。Performance Exception専用の新しいSource of Truthは作りません。
