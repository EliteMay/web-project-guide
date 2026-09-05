# web-project-guide 要件定義

この文書は `EliteMay/web-project-guide` 自身の目的・責任範囲・主要利用フロー・崩してはいけない仕様・完成条件を定義するProject固有の要件正本です。

Web / Electron制作の共通ルールそのものは `docs/` 配下の各Owner Docを正本とし、この文書へ詳細ルールを複製しません。

## 0. Guide / Project Profile

- Adopted Guide Version: `1.15.0`
- Primary Profile: `TOOL`
- User-facing UI: No
- Visual Quality Baseline: Not applicable
- Visual Ambition: Not applicable

## 1. 目的

`web-project-guide` は、個人向けWebサイト / Webアプリ / Electronアプリの制作で、毎回ゼロから判断したり、同じ失敗を繰り返したりしないための共通Guide + 制作運用基盤とする。

主目的は次のとおり。

- Web / Electron制作の共通判断基準を1か所へ集約する
- 作業種類から必要なRuleだけへ短く辿れるようにする
- 過去の失敗・成功をEvidenceとして再利用する
- ChatGPT / Codex / Claude / Copilot等のCoding AgentがCurrent Repositoryを基準に安全に作業できるようにする
- 各Project固有の仕様とCommon Guideを混在させない
- Guide自体が増えすぎたり重複したりしないよう継続的に整理する
- 「実装した」だけでなく、最終状態のValidationまで含めて完成を判断できるようにする

## 2. 使用者・公開範囲

### Primary

- Repository owner
- ChatGPT / Codex等のCoding Agent

### Secondary

- 共同開発者
- 将来Projectを見返すRepository owner

### 公開範囲

- GitHub Repository上で参照するCommon Guide
- 各Projectから必要な箇所だけ参照する

### 利用環境

- 主な入口: GitHub Repository
- 主な閲覧: GitHub Web UI / Repository clone / Coding AgentからのRepository read
- Offline利用: clone済みRepositoryでDocumentationを読める範囲は可

## 3. Repositoryの責任範囲

### 担当する

- Web / Electron制作の共通ルール
- Source of Truth / Rule強度 / Rule Budget等のGovernance
- 作業種類別Router
- Architecture / Data / UI / Performance / Security / Testing等の判断基準
- GitHub Pages / Electron / AI-assisted development等の共通Workflow
- Templates / Checklist
- Failure / Success / Anti-Pattern / Visual Evidence Catalog
- Validator
- Guide Version / CHANGELOG
- Continuous Improvement
- Coding Agentが必要な正本へ辿るための入口

### 原則として担当しない

- 個別ゲームのゲーム仕様
- 個別学習サイトの教材内容
- Site固有の画面一覧
- Site固有の保存Schema / Storage Key
- Project固有の色・Layout・Visual Direction
- Project固有のBug履歴
- 特定Repositoryだけに必要なRule
- 各Projectの自動書換え
- 全Repositoryの常時監視
- 特定Visual Styleの全Projectへの強制

Project固有情報は対象Repository側をSource of Truthとする。

## 4. MVP

最低限、次が成立すること。

1. `README.md` と `START_HERE.md` から作業種類に応じた正本へ辿れる
2. Web / Electron制作に必要な主要Owner Docが存在する
3. 同じ判断のNormative Ownerが原則1つに整理されている
4. 各Projectで利用できるTemplates / Quality Checklistがある
5. Guide構造を検証するValidatorがある
6. Failure / Success / Anti-Pattern等の経験をGuide改善へ戻せる
7. Guide Version / CHANGELOG / 作業記録を管理できる
8. Current Repositoryを基準に既存Projectを安全に変更するWorkflowがある

## 5. 後回し / 非MVP

必要性が明確になるまで、次をMVPへ含めない。

- 各Repositoryの完全自動監査・自動修正
- 専用Web管理画面
- 独自CLI
- 大規模なProject自動生成ツール
- AIによる完全自動Code Review System
- Guide全文の各Projectへのコピー
- 全Project共通の固定Visual Theme

## 6. 主要利用フロー

### 通常のWeb / Electron制作

```text
依頼を受ける
↓
今回の作業種類を判定
↓
README → START_HERE
↓
必要なOwner Docだけ確認
↓
対象Project RepositoryのCurrent Stateを確認
↓
README / Spec / Project Rules / Learnings等を必要範囲だけ確認
↓
変更対象・影響範囲・確認が必要な仕様を特定
↓
実装 / 修正
↓
Testing / Validation / Visual Review等を必要範囲で実施
↓
必要なDocumentationを更新
↓
再利用価値のある失敗・成功だけProject Learnings / Catalog等へ記録
↓
Cleanup後の最終状態を確認
```

### Guide改善

```text
新しい知見 / 問題
↓
既存Owner Docで表現できるか確認
↓
Project固有 / Catalog / Checklist / Templateで扱うべきか確認
↓
本当にCommon Ruleが必要な場合だけ追加・補強
↓
重複 / Orphan / 古いRuleも同時に確認
↓
Validator / Documentation整合を確認
```

## 7. Source of Truth

仕様・指示が衝突した場合の基本優先順位は、`docs/00-governance.md` を正本とする。

Project運用上は次を基本とする。

1. 現在の明示的なUser要求
2. 対象Projectの崩してはいけない仕様
3. 対象ProjectのCurrent Repository / Runtime / Data / 現行仕様
4. `web-project-guide` のCommon Rule
5. 過去の会話・古いZIP・古い作業報告・参考資料

この文書はCommon Ruleの詳細正本を置き換えない。

## 8. ファイル / データ構成

| 対象 | 役割 | 正本 |
|---|---|---|
| `README.md` | Guide概要・主要入口 | README |
| `START_HERE.md` | 作業種類別Router | START_HERE |
| `docs/` | Common Rule / Owner Doc | 各番号付きOwner Doc |
| `templates/` | Projectで使う雛形・実行Checklist | 各Template |
| `catalog/` | Failure / Success / Anti-Pattern等のEvidence | 各Catalog |
| `references/` | 外部標準・参考情報 | 各Reference |
| `maintenance/` | Guide Review / Maintenance設定 | 該当Maintenance file |
| `tests/` | Guide Validator / Static Validation | Test implementation |
| `.github/` | CI等 | GitHub Workflow |
| `guide-version.json` | Guide Version | `guide-version.json` |
| `CHANGELOG.md` | Version変更履歴 | CHANGELOG |
| `作業報告書.md` | Guide自身の作業記録 | Work Report |
| `REQUIREMENTS.md` | Guide自身のProject要件 | この文書 |

### 構造原則

- `docs = Rule`
- `catalog = Evidence / Example`
- `templates = 実際に使う型 / Checklist`
- `README / START_HERE = Router / Summary`

役割を混ぜない。

## 9. 保存方法

このRepository自身にはUser data保存機能を持たない。

- 正式な保存先: GitHub Repository
- Version管理: Git
- Guide Version: `guide-version.json`
- 変更履歴: `CHANGELOG.md`
- 作業記録: `作業報告書.md`
- Runtime Database: なし
- localStorage / IndexedDB: なし

## 10. External Dependencies

### 必須

- GitHub Repository

### 条件付き

- GitHub Actions: Validator / CI等の継続的自動化
- 一般Web標準やPlatform仕様の確認: 必要なGuide改善時のみ

Common Guideを読むだけで外部APIや有料Serviceを必須にしない。

## 11. 崩してはいけない仕様

1. `README → START_HERE → 必要なOwner Doc` の短い導線を維持する
2. 同じ判断ルールのNormative Ownerを複数作らない
3. 各Project固有仕様をCommon Guideへ無制限に混入させない
4. Project Profile等を使い、全Projectへ同じRuleを機械的に強制しない
5. 既存Projectでは古い会話やZIPよりCurrent Repositoryを優先する
6. Rule追加時は追加だけでなく統合・削除・Scope縮小を検討する
7. Validator / Router / 相対Linkを壊した状態を完成扱いしない
8. 未確認・未実装を確認済み・完成済みとして扱わない
9. Guide更新を理由に他Projectを勝手に書き換えない
10. Project固有RequirementとCommon Ruleの正本を混同しない

## 12. 高コスト設計判断

後から大きく変えるとGuide全体へ影響するため、次は慎重に扱う。

- Source of Truth優先順位
- MUST / SHOULD / MAY / CONDITIONALの意味
- Rule Budget
- Single Normative Owner
- `README / START_HERE / docs / catalog / templates` の責務分離
- Owner Doc番号体系
- Project Profile体系
- Validatorが保証するContract
- GitHub中心の既存Project変更Workflow
- Testing / CompletionのVerification State
- Storage / Deployment等のDefault方針

大きな変更では理由・Compatibility・移行影響を明確にする。

## 13. 変更可能範囲

### 原則として改善してよい

- 誤記修正
- 説明の明確化
- Reference更新
- 既存Owner Docへの適切な補足
- 重複説明の削減
- Router Link改善
- Catalog Evidence追加
- Template / Checklistの明確化
- Validatorの安全な補強

### 高影響として慎重に扱う

- MUSTの追加・削除
- Governance変更
- Source of Truth変更
- Rule Budget変更
- 制作優先順位変更
- Storage / Deployment Default変更
- 既存ProjectへMigrationを強制する変更
- 全Projectへ固定Visual Styleを強制する変更
- Owner Doc責務の大規模再編

## 14. 非機能要件

### 情報到達性

- Guide全文を毎回読む必要がない
- 作業種類から必要Docへ短く辿れる
- Routerは詳細Ruleを大量複製しない
- Coding Agentへ不要なContextを増やしすぎない

### 安定性

- 必須Docや内部Linkを壊さない
- Validatorが機能する
- Version / CHANGELOG / Documentationが重大に食い違わない
- 新Ruleで既存Workflowを意図せず破壊しない

### 保守性

- Rule数を増やすこと自体を成果にしない
- 既存Ownerへ統合できる場合は新Docを増やさない
- Orphan Ruleを作らない
- Project固有知識をCommon Ruleへ昇格させる場合は再利用価値を確認する

### 可読性

- 初見でもFile roleを理解できる
- Section / Headingを使い、巨大な無構造Documentにしない
- 同じ内容の全文コピーを避ける

## 15. Development Diagnostics / Project Memory

このRepository自身はRuntime ApplicationではないためRuntime Diagnosticsは不要。

- Runtime Diagnostics: No
- Error ID体系: Not applicable
- One-click Diagnostic Export: Not applicable
- `PROJECT_LEARNINGS.md`: Common Project ruleとの整合上、存在・役割を確認対象とする
- Guide自身の変更記録: `CHANGELOG.md` / `作業報告書.md`
- Common化できるEvidence: `catalog/`

## 16. 品質・Verification State

Guide変更でも「変更した」と「完成した」を分ける。

利用するVerification Stateは `docs/07-testing-quality.md` を正本とする。

主に次を区別する。

- Implemented
- Static Validated
- Unverified
- Known Issue

Browser / Visual / Real Device等は、Guide自身のDocumentation変更では通常Not applicableだが、対象Projectの作業では必要に応じて適用する。

## 17. 完成条件

`web-project-guide` のProject要件として、次を基本の完成条件とする。

### Guideとして

- [ ] 目的と責任範囲が明確
- [ ] `README → START_HERE → Owner Doc` の主要導線が成立
- [ ] Web / Electron制作の主要判断基準が存在
- [ ] Project Profile等により必要Ruleを選択できる
- [ ] Template / Checklistを実Projectで利用できる
- [ ] Current Repository基準の既存Project変更Workflowがある

### 構造として

- [ ] Single Normative Ownerを維持
- [ ] Project固有仕様がCommon Guideへ無秩序に混入していない
- [ ] 重大な重複Rule / Orphan Ruleが残っていない
- [ ] `docs / catalog / templates / Router` の役割分離が維持されている
- [ ] Rule追加時にRule Budgetを確認できる

### 品質として

- [ ] 必須Fileが存在
- [ ] 内部相対Linkが正常
- [ ] Guide Validatorが最終状態で成功
- [ ] 必要なDocumentationが現行状態と一致
- [ ] Guide Version変更が必要な場合は `guide-version.json` / CHANGELOGを更新
- [ ] 一時Script / Workflow / Debug資産が不要に残っていない
- [ ] 未確認事項が明示されている
- [ ] 重大なKnown Issueが残る場合は完成扱いにしない

## 18. 要件定義時点の非目標

この要件定義だけを理由に、既存Common Rule・Owner Doc・Project Profile・Validator Contractを自動変更しない。

この文書と現行Guideの間に重大な矛盾が見つかった場合は、どちらかを無断で上書きせず、Guide改善作業として別途影響を確認する。

## 19. 確定済みGuide改善要件 — 読み込み速度・軽量化・初期表示性能

### 19.1 目的

今後のWeb Projectで、Repository全体の容量だけを見て「軽い」と判断せず、**1 Page / Routeを開いたときに実際に発生するNetwork Transfer、Parse / Decode、JavaScript実行、DOM生成、Rendering、外部通信を含む実利用Cost**を基準にPerformanceを設計・確認できる共通Ruleへ改善する。

特に次の再発を防ぐ。

- Top Page表示だけで全CategoryのJSONを読み込む
- 数MB〜数十MBの画像・動画を初期表示で大量に読み込む
- 数千件以上のDataを無条件に一度にDOMへ描画する
- 使用しないJavaScriptを全Pageで読み込む
- 1つの巨大JSON / 巨大JSへすべてを詰め込む
- 見た目だけのために重いAnimation / Effectを常時実行する
- Repository容量が小さいことだけを理由にPage Load Performanceを確認しない

### 19.2 対象

- 原則としてすべてのUser-facing Web Site / Web Appを対象とする
- ElectronでもRendererがWeb UIとして同じCostを持つ範囲は対象とする
- `STATIC` の小規模Siteへ過剰な最適化を強制しない
- `DATA` / `MEDIA` / `CLOUD` 等、Data・Media・外部通信が大きいProfileでは確認を強める

### 19.3 基本原則

1. **Repository SizeとPage Load Costを分ける。** Repository総容量だけで軽い / 重いを判定しない。
2. **Critical Pathを優先する。** First ViewとPrimary Actionに必要なResourceを先にし、それ以外はDeferred / On Demandを検討する。
3. **Load What You Need。** 将来使う可能性だけで初期Resourceへ含めない。
4. **Networkだけを見ない。** Download後のParse / Decode / JavaScript実行 / DOM生成 / RenderingもPerformance Costとして扱う。
5. **外部通信もCostへ含める。** API、Supabase、CDN、Google Fonts、YouTube、外部画像、Analytics等を例外扱いしない。
6. **Mobile / Slow Networkを考慮する。** 高性能PC + 高速回線だけで完了判定しない。
7. **保守性を壊す過剰最適化を避ける。** 小さな削減のために可読性・修正容易性を大きく犠牲にしない。
8. **小規模Siteを過剰最適化しない。** Performance問題より最適化Architectureの複雑さが大きくならないようにする。

### 19.4 Resourceの読み込みTiming

Resourceは必要に応じて次の3区分で考える。

- **Critical:** First View / Primary Actionに必要で初期Loadする
- **Deferred:** 初期表示後に読み込んでも主要UXを妨げない
- **On Demand:** User操作や対象Route / Feature利用時に初めて必要

次を基本とする。

- First View外の画像はLazy Load候補とする
- LCP候補画像を機械的にLazy Loadしない
- Heavy Library、別Route用JS、別Category Data、Video Player等は必要時Loadを検討する
- Lazy LoadしすぎてPrimary Action直前に長い待ち時間を発生させない
- 次に使う可能性が高くCostが小さいResourceだけPrefetch / Preloadを検討する

### 19.5 画像・動画

- 実際の表示寸法に適した画像を配信し、Desktop用巨大画像をそのままMobileへ送らない
- 必要に応じてWebP / AVIF、SVG、`srcset` / `sizes`、Thumbnail、圧縮を使い分ける
- `width` / `height` またはAspect Ratioを確保しLayout Shiftを抑える
- First View外のMediaはLazy Load候補とする
- 動画は単純な総MB上限よりLoad Timingを重視する
- User再生まで不要な動画本体を理由なく初期Downloadしない
- YouTube等の複数埋め込みではThumbnail / PosterからClick-to-loadする方式を優先検討する
- Background Videoは条件付き許可とし、Project目的上の必要性、Poster / Fallback、Mobile / Slow Network、Reduced Motion、実測影響を確認する
- 音付きAutoplayを前提にしない

### 19.6 JSON / Data分割

JSONは固定Sizeだけで分割せず、**利用単位 + Load Timing**を主基準とする。

- Page / Route / Category / Feature等、Userがその時点で使う意味のある単位で分ける
- 大量DataではManifest / Indexを使い、File一覧の重複Hardcodeを避ける
- 検索では軽量Search Indexを先に使い、Detail本文をOn Demand取得する構成を優先検討する
- 1 Record = 1 File等の過剰分割を避ける
- 巨大JSONを取得した直後に全件DOM化することを前提にしない
- Pagination / Load More / Chunk Rendering / Virtualizationを必要に応じて利用できるData構造を選ぶ

### 19.7 JavaScript / DOM

JavaScriptはSizeだけでなく、Load Timing、Execution Cost、Main Thread Blockingを合わせて確認する。

- 特定Page / Feature専用の重いJavaScriptを理由なく全Pageで読み込まない
- Page / Feature単位のCode Splitting / Dynamic Importを必要に応じて使う
- `type="module"` / `defer` 等、初期HTML Parsingを不必要にBlockしない構成を選ぶ
- Page Load直後に大量の同期計算を一括実行しない
- 50msを大きく超える同期処理が続く場合は既存Long Task Ruleに従い分割を検討する
- Data件数とDOM件数を同一視せず、大量ListはPagination / Chunk / Virtualization等を検討する
- DOM更新を必要以上に細かく繰り返さず、不要Node / Listener / Timer等をCleanupする
- 見た目だけの常時Animation / Particle / Canvas / Scroll Effect等もMain Thread Costとして確認する

### 19.8 外部通信

- 外部ResourceもInitial Transfer / Wait Costへ含める
- 外部通信もCritical / Deferred / On Demandへ分類する
- API / Supabaseは初期表示に必要な最小Dataを優先する
- Non-critical API / Analytics等の完了を理由なくPrimary UI表示の前提にしない
- 同一Dataの重複Fetchを避ける
- Google Fontsは不要なFamily / Weightを大量取得しない
- CDNだから必ず高速とは仮定しない
- 外部Service失敗時はCriticalityに応じてLoading / Error / Retry / Fallback / Progressive Enhancementを考える

外部通信専用の細かなMB上限は増やさず、初期Transfer Budgetへ合算する。

### 19.9 Cache / Lazy Load

Cacheは **変更頻度 × 再利用頻度 × stale Risk** で判断する。

- Browser Cacheを活用しやすい構成を優先する
- Cold LoadとRepeat Loadを分けて確認する
- Cache済みの開発PCだけで初期性能を判断しない
- Service WorkerはOffline / PWA等で価値があるProjectだけ導入候補とし、全Siteへ強制しない
- Cache目的で巨大JSON / 巨大JSへまとめない
- Version付きStatic AssetとFreshnessが重要なAPI / User Dataを同じCache方針で扱わない
- GitHub Pages固有のCache Busting / Service Worker更新戦略は `docs/08-github-pages.md` の責務を維持する

### 19.10 Default Soft Budget

以下はWeb標準の絶対上限ではなく、Guideの**Default Target / Review Trigger**として扱う。

| 対象 | Target | Review Trigger |
|---|---:|---:|
| Initial Transfer合計 | ～1MB | 2MB超 |
| Initial JavaScript | ～200KB | 350KB超 |
| First View画像 1枚 | ～300KB | 500KB超 |
| First View画像 合計 | ～700KB | 1MB超 |
| 初期JSON 1 Request | ～250KB | 500KB超 |
| 初期JSON 合計 | ～500KB | 1MB超 |
| 初期DOM | ～1,000 nodes | 1,500 nodes超 |

Review Trigger超過は自動Failとしない。超過時は原則として次を確認する。

```text
初期表示に必要か
↓
遅延できるか
↓
分割できるか
↓
圧縮 / 縮小できるか
↓
Cacheできるか
↓
代替方式があるか
↓
目的上必要なら理由付きで許容
```

固定上限を原則設けないもの:

- Repository総容量
- CSS / JS / JSONのFile数
- API Request数
- 動画Fileの総容量
- Font File数そのもの

これらは用途、Load Timing、Network Cost、Execution Cost、Cacheability、保守性で判断する。

### 19.11 User Experience指標

既存 `docs/05-performance-reliability.md` の次の目安は維持する。

- LCP: 2.5秒以下
- INP: 200ms以下
- CLS: 0.1以下
- 50msを大きく超える同期処理が続く場合は分割を検討

Soft Budget内でも実測UXが悪い場合は改善対象とする。逆にReview Triggerを超えていても、Project目的上必要で実測が許容範囲なら例外を認められる。

### 19.12 Performance確認

確認強度はProject / 変更内容に合わせて段階化する。

#### Minimum

- Cold LoadでDevTools Networkを確認
- Initial Transferと初期Requestを確認
- 初期表示に不要なJS / JSON / Media / 外部Resourceがないか確認
- Review Trigger超過Resourceを確認
- Page表示後のPrimary Actionが通常利用できるか確認

#### Standard

通常のWeb App、`DATA` / `CLOUD` 等では必要に応じてMinimumに加えて次を確認する。

- Lighthouse等のLab診断
- Mobile Viewport / Network Throttling
- 必要に応じてCPU Throttling
- Core Web Vitals / Long Task / Initial DOM / External Request
- Cold Load / Repeat Load比較

#### Extended

`MEDIA`、大量Data、大規模SPA、Canvas / Animation、大きな外部依存、Performance改善が主要目的の場合は必要に応じて次を追加する。

- Performance Trace / Main Thread
- Script Execution / Layout / Rendering
- Network Waterfall
- Memory
- Slow Network / CPU条件
- Before / After比較

Lighthouse Score単独を完成判定にしない。Request数やFile数だけでも性能を判定しない。

### 19.13 例外条件

Soft Budget / Default Ruleから外れる場合は、少なくとも次を判断材料にする。

- Project目的上そのCostが必要か
- より軽い代替を検討したか
- 実際の読み込み / 操作性能を確認したか
- Mobile / Slow Networkへの影響を把握したか
- Lazy Load / 圧縮 / 分割 / Cache等の適用余地を確認したか
- Primary UXを極端に悪化させていないか

次は例外理由として不十分とする。

- Repositoryが小さい
- 自分の高性能PCでは速い
- CDNだから大丈夫
- 実装が楽
- 後で使うかもしれない
- Lighthouse Scoreが高い

重要な意図的超過は、既存のRequirements / SPEC / Work Report等の適切な文書へ短く理由を残せる。専用のPerformance Exception正本は新設しない。

### 19.14 禁止寄りAnti-pattern

実装後のCommon Ruleでは、少なくとも次を防げること。

- Top Pageで全Category Data / Media / Feature JSをEager Loadする
- 全Dataを巨大JSON、全機能を巨大JSへ無条件に集約する
- 逆に意味のない極端な細分化で大量Request / 管理Costを増やす
- 大量Dataを無条件で全DOM化する
- 未圧縮・過大寸法のMediaを大量初期Loadする
- 外部通信をPerformance Costから除外する
- Cache済み環境だけで評価する
- Repository Size / Lighthouse Score / File数だけで軽さを判定する

Anti-Pattern Catalogへは再発価値が高い代表例だけを置き、`docs/05` の詳細Ruleを全文複製しない。

### 19.15 Owner Doc / 統合方針

新しいPerformance章は原則追加せず、既存の責務を維持したまま統合する。

- `docs/05-performance-reliability.md` — Page Load Performance全体のNormative Owner
- `docs/03-data-storage.md` — JSON / Data構造・Storage固有の専門Rule
- `docs/13-dependencies-assets.md` — Asset / Dependency固有の専門Rule
- `docs/08-github-pages.md` — GitHub Pages固有のCache更新Rule
- `docs/07-testing-quality.md` — Testing / Verification Strategy
- `templates/QUALITY_CHECKLIST.md` — 実行時に使う短いPerformance確認項目
- `catalog/anti-patterns.md` — 再発防止価値が高い代表例だけ

README / START_HEREへ詳細本文を複製しない。現在のPerformance Routeで十分ならRouter変更を不要とし、導線上のGapがある場合だけ最小変更する。

### 19.16 非目標

- 小規模SiteへService Worker / Virtualization / Performance CI等を機械的に導入しない
- Soft Budgetを絶対的Web標準として扱わない
- 数KB削減のために可読性・保守性を大きく壊さない
- Performance Ruleのためだけに不必要な新Doc / 新Source of Truthを増やさない
- この要件保存だけでCommon Rule本文を変更したことにはしない

### 19.17 実装完了条件

このGuide改善は、少なくとも次を満たして初めて実装完了とする。

- [ ] `docs/05-performance-reliability.md` に今回のPerformance設計方針が統合されている
- [ ] 既存 `03` / `07` / `08` / `13` と重複する説明を整理し、Single Normative Ownerが維持されている
- [ ] `QUALITY_CHECKLIST.md` に実行可能な短いPerformance確認項目が必要範囲で反映されている
- [ ] Anti-Pattern Catalogへ追加する場合は代表例だけで、Rule本文を複製していない
- [ ] Small Siteへの過剰最適化を強制しないScopeが明確
- [ ] Soft BudgetがTarget / Review Triggerとして記載され、絶対上限と誤解されない
- [ ] External ResourceもPerformance Costへ含まれている
- [ ] Cold Load / Mobile / Slow Network等の確認方法が必要強度ごとに定義されている
- [ ] README / START_HEREのRouter責務を壊していない
- [ ] 必要なGuide Version / CHANGELOG / Work Report更新を実装時に判断している
- [ ] 最終状態でGuide Validatorが成功している
- [ ] 未確認事項・Known Issueがあれば明示されている

### 19.18 今回の変更理由・Conflict確認

変更理由:

- 既存GuideにはLazy Load、画像最適化、Long Task、JSON分割、CDN / API Failure等の個別Ruleが既にあるが、**Repository Sizeではなく実際のInitial Page Load Costを中心に判断する一貫した設計RuleとSoft Budget / Review Workflowが不足している**ため。

既存仕様との関係:

- 既存のPerformance / Data / Asset / Testing / Pages Ruleと基本方向は一致しており、破壊的な仕様変更は要求しない
- `docs/05` を中心Ownerとすることで、現在のRule Budget / Single Normative Owner方針と整合する
- `STATIC` を含む全Siteへ複雑な最適化を機械的に強制しないため、Project Profile方針とも整合する
- `SPEC.md` は現Repositoryに存在せず、今回の要件と衝突するProject Specは確認されていない

### 19.19 未解決事項 / Implementation Handoff

- Unresolved Core Decisions: None
- Unresolved High-cost Decisions: None
- Requirements Status: Ready for implementation
- Implementation conversation: `web-project-guide（実装）`
