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

## 20. 確定済みGuide改善要件 — Game Development共通ルール

### 20.1 目的

Web / Electron上でGameを制作するProjectについて、Gameを単なる機能の集合ではなく、**Playerが開始からPrimary Completion Conditionまで継続して遊べる体験**として設計・実装・検証するための共通判断基準を追加する。

今回の要件は、`EliteMay/game` の `Scrap Factory` で実際に発生した設計・実装・検証上の課題を主要Evidenceとして整理し、他のGame Projectへ再利用できる形へ一般化する。

特に次の再発を防ぐ。

- Feature / Map / Enemy / Item等を増やし続けてもMain Goalが完成しない
- 「起動する」「操作できる」だけでPlayable / Completeと判定する
- Core Loopと関係の薄い機能が増え、Gameの中心体験が曖昧になる
- Progressionを数値膨張・Grindだけで作る
- UI / Visual / AnimationをGame Stateの正本として扱う
- Visual DirectionとRuntime Ruleが分離して矛盾する
- Systemが安定する前にContentを大量生産する
- Save互換性やFailure Stateを後回しにしてProgressionを壊す
- Static Testや平均FPSだけでGame完成・性能を判断する
- Placeholder Visualを残したまま完成扱いする
- 小規模Gameへ大規模ArchitectureやSave / LOD等を機械的に強制する

### 20.2 Guideへの統合方式

Game-specificな判断は既存Owner Docへ分散させすぎず、**新しいGame Development Normative Ownerを1つ追加する**。

実装時の第一候補は `docs/19-game-development.md` とする。ただし、実装開始時に最新版Repositoryの番号体系・Validator・Routerを再確認し、番号競合がある場合は同じ責務を維持した適切なPathへ調整する。

同時に `docs/12-project-profiles.md` へ `GAME` Profileを追加する。

詳細RuleはGame Development Ownerへ置き、README / START_HERE / Project Profiles / Requirements / Checklistへ全文複製しない。

### 20.3 Game完成の基本モデル

Game完成はFeature数やRank / Level数ではなく、中心体験が実際に通るかで判断する。

最低限、次を区別する。

1. **Prototype** — Core Ideaを検証できる。PlaceholderやSaveなしを許容できる。
2. **Playable MVP** — 少なくとも1本の中心Gameplay Loopが実際にEnd-to-Endで成立する。継続型Gameでは必要に応じてSave / Reloadも含める。
3. **Main Game Complete** — Fresh Startから主要Progressionを通り、Main Goal / Primary Completion Conditionまで主要Game Experienceが成立し、必要なSave / UX / Visual / Performance / Regression確認が完了している。

`Main Clear` はGame固有語として固定せず、共通Guideでは **Main Goal / Primary Completion Condition** を正式概念とする。

Campaign Completion、Final Boss、Target Score、Puzzle Completion、Scenario Completion等、そのGameに合う完了条件へ置き換えられる。

### 20.4 Core Experience / Core Loop

Game Requirementsでは、最低限次を明確にする。

- **Core Experience** — Playerに最も楽しませたい中心体験
- **Supporting Systems** — Core Experienceを強化するSystem
- **Non-goals** — このGameを何にしないか

Gameplay Loopは必要に応じて次の3段階で考える。

1. **Moment-to-Moment Loop** — 秒〜数分単位の直接操作
2. **Core Gameplay Loop** — 数分〜数十分単位のGameを代表するLoop
3. **Progression Loop** — 数十分〜時間単位でCore LoopがUnlock / Upgrade /新Content /新Decisionへ接続するLoop

3つを機械的に全Gameへ要求せず、Progressionを持たない短時間Gameでは該当部分を省略できる。

主要ActionはResource、Knowledge、Unlock、Positioning、Risk reduction、Efficiency、Story / Objective progress等、Main Gameへ意味のある貢献を持つことを優先する。

意味の薄い反復だけが続くDead Loopを避ける。

### 20.5 Playable MVP / Vertical Slice

Game制作は原則として **Vertical Slice First** を採用する。

```text
開始
↓
Player Action
↓
Game Rule
↓
Result / Reward
↓
Feedback
↓
次の変化 / 次のAction
```

短くても一本のFlowを完成させてからContent量を増やす。

Playable MVPはGameに応じて次を含む。

- 基本Controls
- Core Gameplay
- 少なくとも1つのGoal
- Success Feedback
- FailureがあるGameではFailure Flow
- 最低限のProgression
- 継続型GameではSave / Reload
- 初見Playerが主要操作を理解できる導線
- 最低限のUI / Gameplay Readability
- Major Known Bugがない状態

大量Map、全Enemy、全Final Asset、巨大Skill Tree等はPlayable MVPの必須条件にしない。

**System → Representative Content → Real Play → Fix → Stabilize → Content Expansion** の順を優先し、System完成前の横方向Content量産を避ける。

### 20.6 Progression Design

Progressionは **Unlock + Mastery + Efficiency** を基本モデルとして利用できる。

- Unlock — 新Content / System / Actionを開く
- Mastery — 既存Systemをより深く使う
- Efficiency — Playerが既に理解した反復作業・Frictionを軽減する

Major Progressionは単なる数値増加だけでなく、Playerの判断や行動を変えることを優先する。

Progressionは必要に応じて次を分離する。

- Major Progression — Chapter / Rank / Act等
- System Progression — Weapon / Factory / Skill / Research等
- Content Progression — Map / Boss / Quest / Biome等

すべてを1つのLevel値へ集約することを必須にしない。

進行GateはCore Experienceを実際に経験することで進む設計を優先し、単一のMoney / XP等だけへ無条件に依存させない。

Pacingは原則として、`Introduce → Try → Understand → Combine → Next` の順でSystemを増やし、複数Systemを理解前に一度に投入しすぎない。

AutomationやFast Travel等で理解済みの反復作業を短縮してよいが、**Progressionの結果としてCore ExperienceそのものをPlayerから取り上げない**。

Main ProgressionはEarly → Mid → Late → FinalをPrimary Completion Conditionへ収束させる。

### 20.7 Game State / Save / Failure Contract

Game側のStateは必要に応じて次へ分類する。

1. **Persistent State** — Progression、Unlock、Inventory、Player-built objects、重要World Change等
2. **Session State** — 現在のMission、Expedition loot、位置、HP、Temporary buff等
3. **Derived State** — Machine count、Total generation、Completion %等、再計算可能なSummary

容易に再計算できるDerived Stateを第二のPersistent Source of Truthにしない。

Persistent IDはDisplay Name、Array Index、Visual Asset Pathへ依存させない。

Game Development Ownerは「何を保存するか」「Failure時に何を失うか」「どこから再開するか」等のGame Contractを担当する。

Save Schema、Migration、Normalize、Validation、Backup / Restore等の技術的正本は引き続き `docs/03-data-storage.md` とする。

継続型Gameでは、Save / Reloadを主要FlowのTest対象に含める。

重要な複数Resource消費やTransactionは、原則として `prerequisite check → mutation → save` を一貫させ、途中状態やItem lossを残しにくい構造を優先する。

Failure / Death等がある場合、次を明確にする。

- 何を失うか
- 何を維持するか
- どこからRetryするか
- Retryまでの時間
- Failureが次のFailureを過度に誘発しないRecovery手段

### 20.8 Game Content / World

Contentは量ではなくGameplay Roleを持つことを重視する。

Area / Enemy / Item / Objective等の重要Contentでは、必要に応じて次を説明できる状態を目指す。

- なぜ存在するか
- Playerが何をするか
- 何を教える / Testするか
- Rewardは何か
- Progressionとどう接続するか

AreaではGameplay Identity、Resource Identity、Risk Identity、Visual Identity、Progression Role等を必要範囲で持たせる。

EnemyはCount / HP / Skinだけでなく、Playerに異なるDecision / Executionを要求できるかで差別化する。

Boss / Major Encounterは原則として、それまで学んだMechanicを組み合わせて試す方向を優先する。

Main Progression上の必須Itemを極端な低確率Randomだけへ依存させない。RandomはDecision variationを作る用途を優先する。

Procedural GenerationはDefaultにせず、採用時のみNavigation、Difficulty、Objective reachability、重要Item availability、Save、Reproducibility、Testingを確認する。

World Size自体を品質Goalにせず、Gameplay Densityを重視する。

### 20.9 Difficulty / Balance

Difficultyを数字の増加だけで作らない。

Gameに応じて主に次の3軸を使う。

1. **Decision Difficulty** — Routing、Resource allocation、Build layout、Target priority、Risk / Reward等
2. **Execution Difficulty** — Aim、Dodge、Timing、Movement、Positioning等
3. **Resource Pressure** — Ammo、HP、Energy、Time、Inventory、Money、Production capacity等

Core Experienceに合うDifficultyを増やす。Factory / Automation Gameであれば物流・Power・Bottleneck・Space等のDecision Pressureを優先でき、Action GameではExecution Difficultyを重視できる。

Requirementsでは原則として「何を難しくするか」「何を難易度として使わないか」「Mode間の意味」を固定し、HP / Damage / Drop Rate /秒数等の具体値はAdjustable Parameterとして後からPlaytestで調整可能にする。

Difficulty ModeでGameを別の単純Grindへ変えない。

Failure後は学習内容が残っている間にRetryできることを優先し、意味のない長距離Walkback等を避ける。

**Grinding ≠ Difficulty** として、時間消費と意味のある難しさを分離評価する。

Balance Testでは必要に応じてNew Player / Intended Player / Experienced Player、Early / Mid / Late / Endgame等の観点を使う。

### 20.10 Game Architecture / Simulation

Game ArchitectureはFile数を増やすことを目的にせず、**Gameplay Domain + Responsibility** で分離する。

Core State、Progression、Economy、Combat、Exploration、Production、Logistics、Save、Rendering、UI等、実際のGame規模に合う責務単位を使う。

重要原則:

- Game RuleのSource of Truthを1つへ寄せる
- UIをGame Stateの正本にしない
- Rendering / AnimationをSimulation Stateの正本にしない
- SimulationとRenderingを分離する
- Game結果をFrame Rateへ依存させない
- Rank / Damage / Cost / Route / Capacity等、純粋計算にできるRuleはTestしやすい形へ分離する
- Randomが必要な場所だけRandomにする
- Runtime Stateを複数箇所へ無目的に複製しない
- Cacheを持つ場合も正本を明確にする
- Event / State Mutationの境界をGame規模に応じて整理する
- Legacy Compatibility Layerは段階移行に利用できるが永続的なVersion積層を放置しない
- 重要SystemではState / Reason / Transition / Error等をDebugできる構造を優先する

ECS、Event Bus、Dependency Injection等をGameだからという理由だけで導入しない。

### 20.11 Runtime Performance / Scale

Game Performanceは平均FPSだけで判断しない。

必要に応じて次を確認する。

- FPS / Frame Time
- Stutter / Frame Spike
- Input responsiveness
- Simulation Cost
- Rendering Cost
- Memory / Long-session degradation
- Entity Scale
- Physics
- Particle / VFX
- Light / Shadow
- Asset Loading

60 FPS等の数値はGame / Target DeviceごとのSoft Targetとして扱い、全Game共通のHard Limitにしない。

大量Entity Gameでは全Entityを毎FrameFull Updateする前提を避け、Near / Active、Mid、Far / Inactive等でUpdate frequencyやSimulation方法を分けられる構造を検討する。

**Simulation Entity数 = Render Object数ではない。** Gameplay Stateを正確に保ちながら、遠距離Object、Offscreen Area、VFX、Animation等を簡略化できる構造を優先する。

3D / Large-scale Gameでは必要に応じてLOD、Culling、Instancing、Pooling、Physics Budget等を検討する。ただしGameplay上重要なSilhouette / Direction / Hazard情報を最適化で消さない。

Graphics Quality設定によってGame Rule / Simulation結果を変えないことを基本Contractとする。

Normal / Late Game / Stress等のSoft Scale TargetをProject側で持てるようにし、実測で調整する。

Page Load、一般的Runtime responsiveness、Memory等の横断Performance原則は `docs/05-performance-reliability.md` を正本とする。

### 20.12 Game Visual / Audio

Gameplayが成立していても、主要World / Object / Character / UIがPrototype Placeholder状態のままならMain Game Complete扱いしない。

Game Visualでは原則として次の順で品質を考える。

1. Gameplay Readability
2. Silhouette / Structure
3. Material / Lighting
4. VFX / Decorative Polish

Gameplayに意味を持つVisualはRuntime Ruleと一致させる。

特に次を避ける。

- Arrow等のDirection表示と実際のRoutingが逆
- 見えるWallを通れる / 何もない場所にColliderがある
- Lootに見えるDecoration
- Hazard / Enemy / Objectiveが背景へ埋もれる
- LODで重要Gameplay情報が消える
- 停止中Machineが稼働Animationを続ける等、Animation StateとGame Stateの矛盾

Visual制作をFinal Polishだけへ先送りせず、Gameplay Phaseと並行するVisual Trackを持てる。ただしFinal PolishのためにMain Progression完成を無期限に後回しにしない。

Camera Shake、Head Bob、Motion Blur、FOV Kick等はGameplayを妨げない強度を優先し、必要に応じて調整 / OFF可能にする。

AudioはFeedback、Gameplay Information、Atmosphereに分けて考える。重要情報を音だけへ依存させない。

大量Entity GameではAudio Spamを避け、Distance、Grouping、Priority、Cooldown、Voice limit等を必要に応じて使う。

Asset License、Attribution、Repository管理、External Hotlink等は `docs/13-dependencies-assets.md` を正本とする。

### 20.13 Controls / Tutorial / Accessibility

Tutorialは長い説明を開始時にまとめて読ませるより、必要な操作が発生した時点で短く教えて実際に操作させる **Contextual Tutorial** を基本とする。

TutorialではKeyだけでなく、何をするか、なぜするか、成功すると何が起きるかを必要範囲で伝える。

Tutorial終了後は最初のGoal / Progressionへ自然に接続する。

必要なGameではHelp / Controls / Codex等を後から再確認できるようにする。

HUDは情報を全部常時表示せず、常時必要な情報、状況依存情報、詳細画面へ分ける。

Error / Blocked Stateでは単に「できない」と表示するだけでなく、Resource不足、Storage Full、Power不足、Path Block等、Playerが改善できるReasonを伝える。

InputはResponsivenessを優先し、複雑なDesktop GameではKey Remapを検討する。同じKeyをContextで使う場合もPlayerがActionを予測できることを重視する。

3D / Camera GameではSensitivity、FOV、Invert、Sprint Toggle、Head Bob、Screen Shake、Motion Blur等をGame規模に応じて調整可能にする。

AccessibilityとDifficultyを分離する。字幕、色覚対応、Camera Shake OFF等をEasy Mode扱いしない。

重要情報を色だけ・音だけへ依存させない。

### 20.14 Testing / Playtest / Debugging

Game検証は次の3段階を区別する。

1. **Automated Test** — Rule / Calculation / Save Migration / Inventory / Progression等の機械検証
2. **Runtime / Browser Validation** — Input、Pointer Lock、WebGL / Canvas、Collider、Raycast、Scene Transition、Save / Reload、Audio、FPS等
3. **Actual Playtest** — 分かりやすさ、操作感、Pacing、Difficulty、Reward、退屈、次のGoal等をGameとして確認

**TestとPlaytestを別物として扱う。** Bugがないことだけで面白さ・遊びやすさを保証しない。

各Phaseでは個別機能だけでなく、New Game / Current Save等から主要FlowをEnd-to-Endで確認する。

継続開発GameではNew SaveとExisting Saveを必要範囲で両方確認する。

Happy Pathだけでなく、Resource不足、Inventory Full、Death / Failure、Invalid interaction、Reward重複、Save Reloadによる再取得等、主要Edge Case / basic exploitを確認する。

長時間GameではLong Session Test、大量Entity GameではLate-game / Stress Testを条件付きで実施する。

Bug修正では `reproduce → evidence / state → root cause → smallest safe fix → regression guard → runtime confirmation → related flow` を基本Flowとする。

Testing StrategyとVerification State全体は `docs/07-testing-quality.md` を正本とする。

### 20.15 Phase Planning / Scope Management / Completion Gate

Game Phaseは単なるFeature Listではなく、**完成したGameplay Flow**で定義する。

Gameplay、UI、Save、Visual、Feedback、Test等を縦に含めるVertical Phaseを基本とし、Architecture / Visual Foundation等の横断Trackは必要時のみ並行させる。

各Phaseで最低限次を確認する。

- 主要FlowがEnd-to-Endで成立
- Save / Reloadが必要なGameでは成立
- Major Regressionなし
- Known major item-loss / save-corruption bugなし
- 必要なAutomated Test成功
- Runtimeで主要操作確認
- Actual PlaytestでPhaseのGame Experienceが成立
- User-facing変更ではVisual Readability確認
- 仕様と実装の重要部分が一致
- 未確認事項を正しく記録

新Ideaは原則として次へ分類する。

- **Now** — 現在Phase / Core Loop成立に必要
- **Next / Backlog** — 重要だが現在Phaseには不要
- **Maybe / Cut** — Core Experienceへの貢献が弱い

「せっかくだから」の連鎖でScopeを増やさない。

大きすぎるPhaseはPlay可能な単位へ分割する。

**Core Before Variety** を共通原則とし、Weapon / Enemy / Area / Item等は代表1種類のSystemを安定させてからVariationを増やす。

Main Game Complete後のEndgame、Extra Challenge、Achievement、Cosmetic、New Game+等はPost-game / Expansionとして分離できる。

**未完成の巨大Gameより、中心体験が最後まで成立した小さいGameを優先する。**

### 20.16 Game Requirements Template方針

GAME Profileでは、Requirementsで必要に応じて次を整理する。

1. Game Overview
2. Core Experience / Supporting / Non-goal
3. Core Loops
4. Playable MVP
5. Progression
6. Content / World
7. Player State / Failure
8. Major Game Systems
9. Difficulty / Balance Direction
10. Controls / UX
11. Save / Compatibility
12. Visual / Audio Direction
13. Performance / Scale
14. Development Phases
15. Non-goals / Do Not Break
16. Completion Criteria
17. Adjustable Parameters

ただし、5分程度のMini GameへLong-running Save Game用の巨大Templateを強制しない。

専用 `GAME_REQUIREMENTS_TEMPLATE.md` は現時点で必須新設とせず、まず既存Requirements TemplateへGAME Profileの入口・Section / Linkを追加できるか実装時に確認する。

### 20.17 `GAME` Project Profile

`docs/12-project-profiles.md` に `GAME` Profileを追加する。

対象例:

- Browser Game
- Canvas Game
- WebGL Game
- Electron Game
- 2D / 3D Game
- Single-player Game
- Save型Game
- Mini Game

Animationや簡単なQuizがあるだけで機械的に `GAME` としない。Gameplay Rule / Player Action / Success-Failure / Progression等がProductの主要価値である場合に適用する。

既存Profileと併用可能とする。

例:

- `GAME + STATIC`
- `GAME + MEDIA`
- `GAME + ELECTRON`
- `GAME + TOOL`
- `GAME + PUBLIC-CONTENT`

`GAME-SMALL` / `GAME-LARGE` 等へProfileを細分化せず、Game Complexityに応じてRuleを条件付き適用する。

Project Profile本文は短い確認入口に留め、詳細はGame Development OwnerへLinkする。

### 20.18 Single Normative Owner / 責務分担

Game Development Ownerが主に担当するもの:

- Core Experience / Core Loop
- Playable MVP / Vertical Slice
- Progression Design
- Content / World Design
- Difficulty / Balance Direction
- Game-specific Failure Contract
- Game Architecture / Simulation framing
- Game Runtime ScaleのGame-specific判断
- Game World / Gameplay Visual Readability
- Game-specific Controls / Tutorial
- Actual Playtest
- Development Phase / Phase Gate
- Prototype / Playable MVP / Main Game Complete判定

既存Ownerを維持するもの:

- `docs/01-requirements.md` — Requirements Workflow / Decision Class
- `docs/03-data-storage.md` — Save Schema / Migration / Storage / Backup / Restore
- `docs/04-ui-ux-accessibility.md` — UI / UX / Accessibility一般
- `docs/05-performance-reliability.md` — Page Load / Runtime responsiveness / Performance測定一般
- `docs/07-testing-quality.md` — Testing Strategy / Verification State
- `docs/12-project-profiles.md` — `GAME` Profile定義
- `docs/13-dependencies-assets.md` — Asset / Dependency / License
- `docs/17-visual-quality-baseline.md` — User-facing UI Visual Minimum Quality
- `docs/18-domain-first-visual-research.md` — 大規模Visual Direction変更前のResearch Workflow

README / START_HEREはRouterに留める。

### 20.19 Rule Strength

Game章のRule強度は次を基本とする。

#### MUST候補

- Core Experience /主要Gameplay Loopを定義できる
- 起動・移動だけでPlayable扱いしない
- 主要Gameplay Flowが実際に成立する
- Prototype / Playable MVP / Main Game Completeを混同しない
- Game Rule / UI / Visualの重大な矛盾を残さない
- 同じ重要Game RuleのSource of Truthを複数作らない
- User-facing GameはStatic Testだけで完成判定しない
- 現在PhaseのFlow完成を無視してFeature追加を続けない

#### SHOULD候補

- 3段階Core Loop
- Vertical Slice First
- Core Before Variety
- Contextual Tutorial
- Gameplayを変えるProgression
- Game RuleとRendering / UIの分離
- Balance Parameterを調整可能に保つ

#### CONDITIONAL候補

- 永続Saveがある → Schema / Migration / Existing Save Test等
- Long Progressionがある → Early / Mid / Late / Grind / Main Goal接続
- Large 3D /大量Entity → LOD / Culling / Physics Budget / Stress Test
- Camera Action Game → FOV / Sensitivity / Motion sickness確認
- Random / Procedural → Seed / Reachability / Required content保証
- Economy → Source / Sink / Duplication / dominant strategy確認
- Failure / Death → Loss / Retry / Recovery Contract
- Audio重要 → Gameplay sound / mix / visual fallback

#### MAY候補

- ECS
- Event Bus
- Object Pooling
- Procedural Generation
- Difficulty Modes
- New Game+
- Achievement
- Modding
- Replay
- Developer Console
- Cloud Save
- Multiplayer

Genre固有Mechanicを共通MUSTへしない。

### 20.20 代表Anti-pattern

Game Development Ownerでは少なくとも次を禁止寄りAnti-patternとして扱う。

- Feature Collection Game — Core Loop不明のままFeatureだけ増加
- Horizontal Prototype Expansion — Map / Enemy / Itemを大量追加して全て未完成
- Fake Playable — 起動・移動・Button動作だけでPlayable判定
- Progression = Number Inflation
- Grind as Difficulty
- AutomationがCore Experienceそのものを消す
- UI / Visual / AnimationをGame Stateの正本にする
- Visual RuleとRuntime Ruleの二重Source of Truth
- Derived / Cacheまで無差別にSaveする
- Development都合でExisting SaveをResetさせる
- System安定前にContentを量産する
- Static TestだけでGame Complete判定
- Average FPSだけでPerformance判定
- Simulation Entityを全てFull Render / Full Physicsする
- Prototype Visualを永久に残す
- Decorative VisualがGameplay Readabilityを壊す
- Main Progression必須要素を極端なRandomだけへ依存させる
- Main Goalを完成させずFeature追加を続ける

`catalog/anti-patterns.md` へは全文を複製せず、再発防止価値が高い代表例だけ追加する。

第一候補:

1. System完成前のContent量産
2. Visual StateとRuntime Ruleの二重Source of Truth
3. Static TestだけでPlayable / Complete判定
4. New Progression導入時のLegacy Save破壊
5. Main Goalを完成させずFeature追加を続ける

### 20.21 GAME用Quality Checklist

新しい巨大なGame専用Checklistを原則増やさず、既存 `templates/QUALITY_CHECKLIST.md` へ短い `GAME` Sectionを追加する。

共通候補:

- Core Loopを実際にPlayして成立確認
- 現在PhaseのMain FlowがEnd-to-Endで通る
- Progressionがある場合、Main Goalへ接続する
- Save型GameではNew Save / Save / Reload / Existing Saveを必要範囲で確認
- Failure / Edge Case / basic exploitを必要範囲で確認
- Controls / Tutorial / Game UXをRuntimeで確認
- VisualとCollider / Runtime Ruleが一致
- Prototype Placeholderを完成扱いしていない
- 通常Gameplayと重い代表SceneのRuntime Performanceを確認
- 必要なAutomated Test成功
- Runtime Validation実施
- Actual Playtest実施
- Phase Gateを満たす
- Main Game Complete時はFresh StartからPrimary Completion Conditionまで確認
- 未確認事項をVerified扱いしていない

GAME Checklistは **Common + Conditional** とし、小規模Gameへ不要なSave / LOD / Stress / Long-session確認を強制しない。

### 20.22 Requirements / Implementation / Project Learnings更新

Gameの変更を次の5種類へ分類する。

1. **Balance Adjustment** — HP / Damage / Price / Drop Rate / Craft Time等の数値調整
2. **Game Design / Requirement Change** — Failure Contract、Progression構造、Main Goal等の意味変更
3. **Implementation Fix** — 仕様は正しいがRuntime実装だけが誤っている
4. **Project Learning** — 対象Game内で再発防止価値のある知見
5. **Common Guide Candidate** — 複数Gameで再利用価値がある、または重大Riskを防ぐ知見

Requirementsは履歴帳ではなく**現在正しいGame Contract**を持つ。

Balance AdjustmentのたびにRequirements本文を履歴化しない。履歴が必要ならConfig / Data / CHANGELOG / Work Report / Git historyを使用する。

Adjustable ParameterとGame Contractを区別する。

Player FeedbackはEvidenceとして扱い、そのまま仕様へ変換せず、HP / Telegraph / Hitbox / Camera / Recovery /説明不足等のRoot Causeを確認してから変更する。

複数回同じFeedbackが出る場合は設計問題候補として優先度を上げる。

`PROJECT_LEARNINGS.md` へ軽微なTypo等を何でも保存せず、再発しやすい、高Risk、原因特定Costが高い、後続Phase / 他Projectでも有効な知見を優先する。

Project LearningをすぐCommon Ruleへ昇格させず、Guide GovernanceのRule Budgetに従う。ただしData loss、Save corruption、重大互換破壊等は1件でもCommon候補になり得る。

### 20.23 Router / Template / Catalog統合

実装時には少なくとも次を確認する。

- `README.md` — Game Development Ownerへの短い入口を追加
- `START_HERE.md` — 「ゲームを作る / 直す」Routeを追加
- `docs/01-requirements.md` — GAME Requirementsの最小入口 / Owner Linkを追加
- `docs/12-project-profiles.md` — `GAME` Profileを追加
- Game Development Owner Doc — Game-specific Ruleの詳細正本
- `templates/QUALITY_CHECKLIST.md` — 短いGAME Section
- `templates/REQUIREMENTS_TEMPLATE.md` — GAME Profile用Section / Linkで足りるか確認
- `catalog/anti-patterns.md` — 代表Anti-patternのみ必要範囲で追加
- Validator / required-file list — 新Owner Doc追加で更新が必要か確認

Routerへ詳細Ruleを複製しない。

### 20.24 非目標

- すべてのGameへCombat / Enemy / HP / Quest / Craft等の特定Mechanicを強制しない
- Mini GameへSave Migration、Long Progression、LOD、Stress Test、Difficulty Mode等を機械的に要求しない
- Gameだからという理由でECS / Event Bus等の大規模Architectureを導入しない
- AAA規模の制作工程を個人制作へそのまま強制しない
- Game専用Template / Checklist / Profileを細分化しすぎない
- Scrap Factory固有のRank / Research / Drone / Factory等のGame DesignをCommon Ruleへコピーしない
- Existing Owner DocのSave / Performance / Testing / Asset / UI RuleをGame章へ全文複製しない
- この要件保存だけでGame Development Owner等を実装済み扱いしない

### 20.25 実装完了条件

このGuide改善は少なくとも次を満たして初めて実装完了とする。

- [ ] `GAME` Project Profileが追加されている
- [ ] Game DevelopmentのNormative Ownerが追加されている
- [ ] Core Experience / Core Loop / Playable MVP / Progression / Primary Completion Conditionの共通Ruleが整理されている
- [ ] Game State / Save semanticsと `docs/03` の技術責務が重複せず接続されている
- [ ] Simulation / Rendering / UIのSource of Truth分離が整理されている
- [ ] Game-specific Runtime Performance / Scaleと `docs/05` の責務が重複せず接続されている
- [ ] Actual Playtestと `docs/07` のTesting Strategyが重複せず接続されている
- [ ] Game World / Gameplay Visual Readabilityと `docs/04` / `17` / `18` の責務が整理されている
- [ ] Asset / License詳細を `docs/13` に残している
- [ ] Phase Gate / Core Before Variety / Scope Managementが定義されている
- [ ] Prototype / Playable MVP / Main Game Completeが区別されている
- [ ] Small Gameへ大規模Ruleを過剰適用しないMUST / SHOULD / CONDITIONAL / MAYが明確
- [ ] README / START_HEREからGame Routeへ辿れる
- [ ] Quality Checklistへ短いGAME確認項目が必要範囲で反映されている
- [ ] Catalogへ追加する場合は代表例だけでRule本文を複製していない
- [ ] Requirements Template変更は既存Templateへの統合を先に検討している
- [ ] Validator / required-file listへの影響を確認している
- [ ] 必要なGuide Version / CHANGELOG / Work Reportを更新している
- [ ] 最終CommitでGuide Validatorが成功している
- [ ] 未確認事項 / Known Issueがあれば明示されている

### 20.26 今回の変更理由・Conflict確認

変更理由:

- 現行GuideはWeb / ElectronのArchitecture、Data、UI、Performance、Testing等を持つが、Game固有のCore Loop、Progression、Vertical Slice、Gameplay Completion、Playtest、Phase Gate、Simulation / Rendering境界等をまとめるNormative Ownerが存在しない。
- 現行Project Profilesにも `GAME` がなく、Game Projectでは `STATIC` / `MEDIA` / `TOOL` 等の組み合わせだけではGame-specificな確認事項を表現しづらい。
- `EliteMay/game` / `Scrap Factory` の実装・Requirements・Project Learningsから、Visual / Runtime Rule不一致、Save互換、Progression、Phase Gate、Simulation / Rendering、実Play Validation等に複数Projectへ再利用できる明確なGapが確認できる。

既存仕様との関係:

- `docs/00-governance.md` のRule Budget / Single Normative Ownerに従い、Game-specific Ruleだけを新Ownerへまとめる
- Save / Performance / Testing / Asset / UI等の既存Owner責務は維持する
- README / START_HEREはRouterのままとし、詳細Ruleを複製しない
- `GAME` Profileは既存Profileと併用し、既存Profileを置換しない
- Small Gameへ過剰Ruleを強制しないため、現在のProject Profile方針と整合する
- 個別Game仕様は引き続き各Game RepositoryをSource of Truthとし、Common Guideへ混入させない

### 20.27 未解決事項 / Implementation Handoff

- Unresolved Core Decisions: None
- Unresolved High-cost Decisions: None
- Requirements Status: Ready for implementation
- Owner Doc path: `docs/19-game-development.md` を第一候補とし、実装開始時の最新版番号体系で最終確認する
- Dedicated Game Requirements Template: 現時点では新設しないことを第一候補とし、既存Templateへの統合で不足する場合のみ再検討する
- Implementation conversation: `web-project-guide（実装）`

## 21. 確定済みGuide改善要件 — Evidence-first Research

### 21.1 目的 / Core Principle

重要な調査・判断で、UserとAIが自分たちの思いつきだけから最初の答えを作るのではなく、**既に存在する研究・一次資料・公式情報・実験・実例・失敗例・専門家知見・User Evidenceを先に確認し、人類が既に何を知っているかを整理してから今回固有の問題を考える**共通Workflowを追加する。

基本Flowは次とする。

```text
Question
↓
Existing Knowledge / Prior Research
↓
Evidence Collection
↓
Evidence Map
↓
Known / Disputed / Context-dependent / Unknown
↓
Discussion Questions
↓
User + AI Discussion
↓
Decision
↓
Validation
```

Researchの目的はSource件数を増やすことではなく、既に答えがある部分を再発明せず、まだ答えが決まっていない部分へ思考時間を使うこととする。

### 21.2 適用範囲

Evidence-first ResearchはWeb制作だけへ限定しない。`web-project-guide` 内では少なくとも次のような重要判断から利用できるようにする。

- Requirementsの重要なResearchable Question
- UI / UX
- Game Design
- Tutorial / Onboarding
- 学習方法
- Architecture
- 技術選定
- Performance改善
- Security関連の判断
- 大きな機能設計
- 正解が明確でない重要問題
- Guide自体のCommon Rule改善

単純な事実確認、明確な公式仕様への追従、小さなBug、文言修正、原因が明確な局所修正へDeep Researchを機械的に要求しない。

### 21.3 Research Depth

Researchを原則3段階へ分ける。

#### Quick

単純な事実・仕様・Version・日付・対応有無等を、一次・公式Source中心に必要最小限確認する。

#### Standard

通常の比較・改善判断で、複数の独立Sourceを確認する。検索上位1〜2件だけで結論を作らない。

#### Deep Research

重要かつ不確実性の高い判断へ使用する。

Userが明示的にDeep Researchを指定していなくても、重要度・不確実性・利用可能Evidenceから必要と判断した場合はAgentが自動的にDeepへ上げられる。

Research Depthは重要度、不確実性、利用可能Evidenceに比例させ、調査自体を目的化しない。

### 21.4 Research Brief / Question Definition

Deep Research前に最低限次を整理する。

- Research Question
- Project Context
- Constraints
- Research Axes
- Out of Scope

Research開始前に結論を固定しない。

既存仮説やUserの第一案がある場合は結論ではなく検証対象として扱う。ただしUser Preference / Product IntentはEvidenceで勝手に上書きしない。

Research中に元Question自体がSolution-biased、またはより上流の変数が重要と判明した場合はQuestionをReframeできる。

```text
Original Question
↓
Evidence
↓
Reframed Question
```

Reframe時は元Questionと変更理由を追跡できるようにする。今回の判断を変えない隣接Topicへ無制限にScopeを拡大しない。

### 21.5 Prior Research First / Source Type

Researchable Questionでは、User + AIで新しい答えを考える前に、その問題について既に何が調査・検証・実装されているかを確認する。

Academic Evidenceが存在するTopicでは、可能な範囲で次を優先的に探す。

- Systematic Review
- Meta-analysis
- Peer-reviewed Paper
- Independent Replication
- Experiment

ただし論文だけを唯一のEvidenceとしない。Topicに応じて次を組み合わせる。

- Standards / Official Documentation / 公的機関
- GDC / Conference / Specialist Talk
- Large Survey / Dataset
- Case Study / Postmortem
- Real Product / Real Game
- Expert Discussion
- User Research
- Community / Forum / Reddit等の実利用Evidence
- Blog / Social等のHypothesis / Issue discovery

Source TypeはQuestionに合わせて選び、固定比率を設けない。

### 21.6 Broad Discovery / 100件規模 / Saturation

十分な情報が存在するDeep Researchでは、**100件規模以上のSource Candidate探索を基本目安**とする。

100件はQuotaではなく、少数Sampleだけで判断するBiasを減らすためのBroad Discovery目安とする。

```text
Broad Discovery
↓
Deduplicate
↓
Relevance Filter
↓
Original Evidence
↓
Deep Review
```

実際の終了条件は件数ではなくResearch Saturationとする。

Saturationの目安:

- 新規検索でも既知の主張が多くなる
- 主要な立場を一通り確認した
- Supporting / Opposing Evidenceを確認した
- 主要Original Sourceへ辿れた
- Unknown部分が明確になった

100件未満でもSaturationへ達すれば終了可能とする。100件を超えて重要な新情報が出続ける場合は継続する。

Relevant Sourceが少ない場合は件数を水増ししない。弱いBlog、Duplicate、無関係Sourceを追加して目標件数を満たさない。

### 21.7 Research Count Transparency

Research量を可能な範囲で次へ分ける。

- **Discovered** — Title / Snippet等から存在を確認
- **Reviewed** — Abstract / Page /主要内容を確認
- **Deep-read** — Method / Sample / Result / Limitation / Context等まで重点確認
- **Core Evidence** — 最終Evidence Map / Decisionへ重要なSource

Search EngineのResult総数を「調査した件数」としない。

同一Original Evidenceを紹介する複数記事は独立Evidenceとして水増ししない。

Abstractしか確認できないSourceはAbstract-onlyと明示し、Full textを確認したように扱わない。

### 21.8 Search Strategy / Adaptive Query

単一Query、単一検索Engine、検索上位だけへ依存しない。

必要に応じてSearch Matrixを作り、次を探索する。

- Core Topic
- Synonym
- Academic terminology
- Supporting Evidence
- Opposing Evidence
- Comparison
- Alternative
- Criticism
- Limitation
- Failure
- User perspective
- Expert perspective
- Historic / Current

Research中に良いSourceから専門用語、著者、Keyword、Reference、Cited-by等を取得し、Queryを改善する。

最初の言い方で見つからなかったことをEvidence不存在とは判断しない。

要件定義中の関連Questionは1問ごとに独立Deep Researchせず、Tutorial / HUD / Progression等、Decision Domain単位のResearch Batchへまとめられる。

### 21.9 Original Source / Claim Verification

重要なClaimは可能な限りOriginal Sourceへ遡る。

```text
Secondary Source
↓
Original Paper / Data / Official Source
```

Decision-criticalなEvidenceでは可能な範囲で次を確認する。

- Research Question
- Method
- Sample / Dataset
- Result
- Limitation / Condition

数字を引用する場合はMetric、Baseline、Absolute / Relative difference、Sample、条件等を確認する。

Source自身のClaimとAIのInterpretationを分ける。

### 21.10 Evidence Quality

Source数による単純多数決をしない。

重要Evidenceでは必要に応じて次を評価する。

- Relevance
- Authority
- Method
- Sample / Coverage
- Independence
- Recency
- Replication
- Consistency
- Limitations
- Bias Risk
- Applicability

Evidence Strengthは概ねStrong / Moderate / Weak-context等で整理できる。

多数の弱い二次記事が少数の高品質Independent Evidenceを自動的に上回るとは扱わない。

Community / Forum等のWeak-context Sourceは、User pain、Failure case、Preference、Hypothesis discoveryには価値がある。

### 21.11 Bias / Missing Evidence

Deep Researchでは必要に応じて次を確認する。

#### Confirmation Bias

Researchは仮説を証明するためではなく検証するために行い、Supporting / Opposing Evidence、Alternative、Criticism、Failure、Limitationを意図的に探す。

#### Publication / Survivorship Bias

Published Successや有名Productだけを全体と思わない。可能ならNull Result、Replication Failure、Failed Product、Reverted Design、Postmortem等も探す。

#### Conflict of Interest

Sponsor、メーカー、企業Sourceを自動排除しない。自社仕様等そのSourceしか持たないFactには利用できるが、自身に有利な効果・優位性ClaimはIndependent Evidenceによる確認を優先する。

#### Missing / Hidden Evidence Risk

公開されにくいNegative Result等が重要そうな場合は、見えているEvidenceだけでConfidenceを過大評価しない。

### 21.12 Language / Geographic / Cultural Bias

Deep Researchでは今回の判断にLanguage / Country / Culture / Regulation / Market差が影響するかを評価する。

影響する場合は主要International / English Evidenceだけで終わらず、Target Region / LanguageのEvidenceも意図的に探索する。

固定した言語比率は設けない。

Target Region固有Evidenceが不足する場合は、その不足を明示しApplicabilityまたはConfidenceへ反映する。

### 21.13 Sampling / Real-world Examples

実Product / Game / Site等を多数見る場合、検索上位・人気・AAA・高評価・成功例だけへ偏らない。

必要に応じて次を組み合わせる。

#### Core Sample

今回のTask / Domain / Audienceに近い例を中心にする。

#### Contrast Sample

異なるScale、Popularity、Quality、Age、Platform、Audience、Success / Failure、Design philosophy等を意図的に含める。

Coverageと条件差の理解を生のExample Countより優先する。

### 21.14 Applicability

Evidence StrengthとProject Applicabilityを分離する。

必要に応じて次を比較する。

- Domain / Genre
- Primary Task
- Audience / Expertise
- Platform / Input
- Usage Context
- Complexity / Scale
- Measured Outcome
- Constraints
- Region / Language

ApplicabilityはHigh / Medium / Low等で整理できる。

他DomainのEvidenceでは表面的な具体実装をコピーせず、Transferできる原理と今回固有にRebuildすべき部分を分ける。

有名、人気、過去に成功した、みんな使っている、だけをApplicabilityの根拠にしない。

### 21.15 Evidence Interpretation

Evidenceが実際に示している範囲を超えて断定しない。

最低限次を区別する。

- Causal Evidence
- Correlational / Associational Evidence
- Suggestive Evidence
- Hypothesis / Interpretation
- AI Synthesis

相関だけから因果を断定しない。

複数SourceをAIが組み合わせて得たConclusionはOriginal EvidenceではなくSynthesis / Interpretationとして扱う。

#### Quantitative Evidence

定量研究では可能な場合、Effect Size、Absolute / Relative difference、Confidence Interval、Sample Size等を見る。

Statistical SignificanceとPractical Significanceを分ける。

大SampleでTiny Effectが有意になる場合、小SampleでReal Effectを検出できない場合の両方を考慮する。

#### Subgroup

平均値だけで重要差を消さず、必要に応じてBeginner / Expert、Platform / Device、Accessibility needs、Casual / Heavy等を確認する。

少数UserでもSeverityが重大なAccessibility / Operability / Data-loss harm等は単純な割合だけで無視しない。

### 21.16 Replication / Consensus / Emerging Evidence

単一の派手な研究より、Independent Group / Dataset / Context等で再現されているFindingを強く扱う。

必要に応じてReplication StatusをReplicated / Partially replicated / Conflicting等で考える。

Systematic Review / Meta-analysisもInput StudyのQuality、Publication Bias、Context等を確認し、絶対視しない。

ConsensusやMajorityを自動的な真実としない。新しい少数EvidenceでもMethodが強く、従来研究の弱点を補う場合は **Emerging / Challenging Evidence** として独立評価する。

Repeated implementationはEmpirical Replicationと同義ではなく、単なるConventionのコピーである可能性も確認する。

### 21.17 Evidence Map / Research Output

Deep Research後はSource一覧をそのままUserへ投げず、まずEvidence Mapを作る。

最低限次を整理する。

- Established / Known
- Disputed
- Context-dependent
- Unknown
- Emerging / Challenging Evidence
- Existing Solutions
- Failures / Limitations

重要Findingには必要に応じて次を付ける。

- Evidence Strength
- Applicability
- Confidence: High / Medium / Low / Inconclusive

ConfidenceとRecommendationは同じものとしない。

Evidence Conflictがある場合は単純多数決や平均化をせず、Sample、Method、User、Task、Outcome、Platform、Environment、Date等の条件差を比較する。必要ならConflict Mapを作る。

Research Outputでは、**今回の問題への意味**と、**次にUser + AIで話すべき2〜5個程度のDiscussion Question**を明確にする。

Broad ResearchはBackendで広く行っても、User-facing Outputは要点中心に保つ。Full Source Listは必要時に提供可能とする。

### 21.18 Discussion Gate / Requirement Classification

Deep Research後、主要Evidence・反対Evidence・Known / Disputed / Unknown・Applicability・Project差が整理されるまでは、重要問題について最初からA / B / C Solution Discussionへ飛ばない。

Userが明示的にResearchを止めてDiscussionへ進みたい場合は例外とする。

EstablishedかつHigh Applicabilityの知識は原則としてDiscussionの前提へ置き、理由なく毎回ゼロから再討論しない。

要件定義時の判断はEvidence-firstの観点から次へ分類する。

- **User Preference** — Userが決める。ResearchはPreferenceそのものを上書きしない。
- **Researchable Question** — 既存Evidenceがあり得るためResearchを先に行う。
- **Project-specific Decision** — Evidenceを参考にするがProject固有条件を含めてUser + AIで決める。

ResearchはUser Intentを置換するものではなく、User Intentをより良く実現するために利用する。

### 21.19 Evidence → Interpretation → Decision

次を混同しない。

```text
Evidence
↓
Interpretation
↓
Project Preference / Constraints
↓
Discussion
↓
Decision
```

Evidence上Aが有力でもProject固有理由でBを選べる。その場合は「EvidenceはAを支持するが、Project理由XでBを選択した」のように判断根拠を追跡できるようにする。

Research Consensusを自動的にProject MUSTへ変換しない。

Decision Statusは必要に応じて次へ分ける。

- **Confirmed** — EvidenceとProject Fitが十分で正式Requirement化可能
- **Provisional** — 有力だがPrototype / Playtest / User Test等が必要
- **Open** — Evidence不足または未決定

### 21.20 Research → Validation

ResearchだけでProject固有の正解が確定しない場合、無限に検索を続けずPrototype / A-B Test / Playtest / User Test / Measurement等へ切り替える。

```text
Research
↓
Discussion
↓
Decision
↓
Prototype / Implementation
↓
Validation
↓
Keep / Revise / Reject
```

今回のProjectで得た明確なValidation Evidenceが一般研究と異なる場合は、Project差・条件差を確認したうえでProject Decisionを修正できる。

### 21.21 Research Status / Evidence不足

Deep Research自体の状態は必要に応じて次へ分ける。

- **Complete** — Coverage / Saturationが十分
- **Sufficient** — 理想的件数未満でもDecisionに十分
- **Limited** — Tool / Access / Evidence不足等で重要な穴が残る
- **Inconclusive** — ResearchだけではDecision困難

Tool制限、Paywall、Search Accessの不足をEvidence不存在と同一視しない。

Original SourceへFull Accessできない場合はAbstract、DOI、Author Page、Repository、Preprint / Conference manuscript等を探す。Secondaryしか使えない場合はEvidence Strengthを下げる。

Evidence不足自体を正しいResearch Resultとして認め、必要なら `Unknown → Hypothesis → Prototype / Test` へ進む。

### 21.22 Research Reproducibility / Log

重要なDeep Researchでは、別の人や将来のAgentが調査経路を追える程度のResearch Logを必要範囲で残す。

最低限候補:

- Research Date
- Research Question
- Main Queries
- Main Source Types / Databases
- Inclusion Criteria
- Exclusion Criteria
- Discovered Count
- Reviewed Count
- Deep-read Count
- Core Evidence Count
- Major Limitations
- Research Status

すべてのQueryやSearch Resultを完全保存することは必須にしない。

重要なのは、どの考え方でEvidenceを集め、何を残し、何を除外したかを後から追えることとする。

### 21.23 Research Review Gate

Deep Researchを完了扱いする前に、少なくとも次を必要範囲で確認する。

- 主要先行研究 / Systematic Review等を取りこぼしていないか
- Decision-critical ClaimをOriginal Sourceで確認したか
- Opposing Evidenceを探したか
- Failure / Limitation / Alternativeを確認したか
- Duplicate Evidenceを水増ししていないか
- Source Type / Positionが極端に偏っていないか
- Success / Popularity / Publication Biasが強くないか
- Language / Geographic差が重要なら確認したか
- 相関を因果として扱っていないか
- Statistical SignificanceをPractical Importanceと混同していないか
- Subgroupへの重大な悪影響を平均で隠していないか
- Conflict of Interestへ過度に依存していないか
- Project Applicabilityを確認したか
- Tool / Paywall / Access Limitationを隠していないか
- 100件という数字が目的化していないか
- Research Saturationへ達しているか
- 次にDiscussionすべきQuestionが明確か

Gate結果は次を基本とする。

- Pass
- Pass with limitations
- More research needed
- Inconclusive

### 21.24 Freshness / Research Asset Reuse

過去のDeep ResearchはResearch Assetとして再利用できる。

再利用時は少なくともFreshnessとApplicabilityを確認する。

変化速度の目安:

- **Fast-changing** — AI、Security、Browser、Cloud、Platform、Price、Law、Hardware等
- **Medium-changing** — UI / UX実務、Game事例、Accessibility実装、Framework / Tool等
- **Slow-changing** — 認知心理の基礎、Classic HCI、数学等

古い = 弱い、新しい = 強い、と機械的に判断しない。

再利用可能:

- Source
- Evidence Summary
- Source Evaluation
- Opposing Evidence
- Search terminology / Research path

自動転用しない:

- 過去ProjectのFinal Decision
- User Preference
- Project Constraint
- Implementation Detail

以前のResearchが近い場合は100件を最初からやり直すのではなく、Delta Research / Gap Researchを優先できる。

### 21.25 保存場所

Common GuideはProject固有Research Resultの倉庫にしない。

Project固有Deep Researchで保存価値がある場合は、対象Projectの `docs/research/` 等を第一候補とする。

保存候補:

- Deep Research
- Requirement / Designへ大きく影響する調査
- 大きなSource Poolを扱った調査
- 将来再利用する価値が高いResearch Asset

Quick / Standardの小さな調査を毎回Research File化しない。

Project `REQUIREMENTS.md` には最終Requirementと必要なResearch Referenceを置き、Research全文を詰め込まない。

### 21.26 Common Rule Promotion / Rule Strength

Project Researchや単一研究結果をすぐCommon Ruleへ昇格させない。

Common Rule Candidateでは次を評価する。

- Evidence Strength
- Generalizability
- Counter-evidence
- Project Validation

非常に強いExternal Evidenceや重大なSecurity / Accessibility / Data-loss Risk等はProject Validationが少なくてもCommon Default候補になり得る。

中程度Evidenceでは複数Projectや異なるContextでのValidationを重視する。

「2 Projectで成功した」等の固定件数だけで昇格を判断せず、独立性とContext Diversityを重視する。

Rule StrengthはEvidence Strengthだけで決めない。

次を含めて評価する。

- Evidence Strength
- Applicability
- Risk / Severity
- Reversibility
- Project Variability

最終Rule Strengthは既存Governanceの `MUST / SHOULD / CONDITIONAL / MAY` を利用する。

条件依存Evidenceは無理に一般SHOULDへせず、CONDITIONALとして適用条件を明示することを優先検討する。

### 21.27 Agent / Conversation Behavior

重要なResearchable Questionでは、毎回Userへ「調査してよいか」と確認せずEvidence-first Researchを自動発動できる。

長いResearchでは検索手順を逐次実況せず、方向を大きく変えるFinding等、Userが途中で知る価値が高いものだけ共有する。

Userが「とりあえず意見だけ」「Researchなしで仮説だけ」等を明示した場合は、Evidence-backed ConclusionではなくTentative Hypothesisとして回答できる。

Research後はEvidence Map / Discussionへ進み、User Intentに関わるDecisionをResearchだけで勝手に確定しない。

### 21.28 Single Normative Owner / Guide統合

一般Research Workflowは既存各章へ分散させず、新しいSingle Normative Ownerへ統合する。

実装時の第一候補:

- `docs/20-evidence-first-research.md` — `Research → Evidence → Discussion → Decision → Validation` の一般Workflow正本

現在 `docs/19-game-development.md` まで存在するため、実装開始時に最新Repositoryの番号体系を再確認し、競合がなければ `docs/20-evidence-first-research.md` を採用する。

責務分担:

- `docs/00-governance.md` — Rule Strength / Rule Budget / Single Normative Owner
- `docs/01-requirements.md` — Requirements Workflow / Decision Class。Researchable QuestionからResearch OwnerへRouting
- `docs/04-ui-ux-accessibility.md` — UI / UX / Accessibility固有Rule
- `docs/05-performance-reliability.md` — Performance固有Rule / Measurement
- `docs/14-continuous-improvement.md` — Project Feedback Loop / Rule Hygiene / Guide Promotion operation。External Research MethodはResearch Ownerへ委譲
- `docs/18-domain-first-visual-research.md` — Target Type、KEEP / FIX / REMOVE、Visual Candidate比較、Foundation Reset等のVisual固有Workflow
- `docs/19-game-development.md` — Game固有設計 / Playtest。重要なGame Researchable QuestionはResearch OwnerへRouting

同じ一般Research Methodを各章へ全文複製しない。

### 21.29 Domain-first Visual Researchとの関係

現行 `docs/18-domain-first-visual-research.md` の「同種Referenceを2〜5件見る」は、Evidence-first Research導入後は**Research全体の母数ではなく、Broad Research後に重点比較するRepresentative Visual Referencesの目安**として整理する。

一般ResearchのCoverage、Source Quality、Bias、Original Evidence、100件規模探索等はResearch Ownerへ委譲する。

`docs/18` にはVisual固有の次を残す。

- Target Type
- Primary Task / Content Model等のVisual framing
- Representative Referenceの詳細比較
- KEEP / FIX / REMOVE
- Reference Transfer Rule
- Candidate comparison
- Visual Foundation Reset

Meaningful Visual Changeでは必要なResearch Depthに応じてEvidence-first ResearchとDomain-first Visual Researchを組み合わせる。

### 21.30 README / START_HERE Routing

READMEへResearch Ownerの短い入口を追加する。100件、Bias、Evidence Map等の詳細WorkflowをREADMEへ複製しない。

START_HEREには「調査してから方針を決める / 正解が分からない重要問題」のRouteを追加する。

基本Route候補:

```text
Governance
↓
Evidence-first Research
↓
Topic-specific Owner
↓
Discussion / Decision
↓
Requirement / Prototype / Validation
```

既存Routeでは、重要かつ不確実なResearchable Questionがある場合だけResearch Ownerを差し込む。

Research Ownerを全作業の必読Docにはしない。

要件定義では次を明確にする。

```text
User Preference
→ Userが決める

Researchable Question
→ Evidence-first Research

Project-specific Decision
→ Research結果を見てUser + AIでDiscussion

Confirmed Requirement
→ REQUIREMENTS.md
```

Guide改善でExternal EvidenceからCommon Ruleを追加・変更する場合は、`14 Continuous Improvement → Evidence-first Research → Rule Promotion / Governance → Validation` の流れを利用できるようにする。

### 21.31 Implementation Files

実装時の必須変更候補:

- `docs/20-evidence-first-research.md` — 新しい一般Research Normative Owner
- `README.md` — 短いOwner入口
- `START_HERE.md` — Research Route
- `docs/00-governance.md` — Owner表へ登録
- `docs/01-requirements.md` — Researchable Questionを新OwnerへRouting
- `docs/14-continuous-improvement.md` — External Research Methodを委譲し、Rule Promotion / Hygieneを維持
- `docs/18-domain-first-visual-research.md` — 2〜5件をRepresentative Deep Comparisonへ再定義し一般Researchを委譲
- `docs/19-game-development.md` — Game-specific Researchable Questionの入口を追加
- `tests/validate-guide.mjs` — Required file / Router / Owner / responsibility boundaryのRegression Guard
- `guide-version.json` — 新Owner追加に応じたVersion判断
- `CHANGELOG.md`
- `作業報告書.md`

必要性を確認して最小変更する候補:

- `docs/04-ui-ux-accessibility.md`
- `docs/05-performance-reliability.md`
- `templates/QUALITY_CHECKLIST.md`

`QUALITY_CHECKLIST.md` を変更する場合はResearch Review Gateの短い実行項目だけにし、Owner Docの詳細Checklist全文を複製しない。

### 21.32 Validator Requirements

新Owner追加時には少なくとも次をRegression Guard候補とする。

- `docs/20-evidence-first-research.md` がrequired fileとして存在する
- READMEから番号付きOwnerへ到達できる
- START_HEREにResearch Routeが存在する
- `docs/00-governance.md` がEvidence-first ResearchのSingle Normative Ownerを登録する
- `docs/01` がResearchable QuestionをResearch OwnerへRoutingする
- `docs/14` がExternal Research Methodを委譲しつつRule Hygiene / Promotion責務を保持する
- `docs/18` が一般ResearchをResearch Ownerへ委譲しつつKEEP / FIX / REMOVE、Visual Foundation Reset等を保持する
- `docs/19` がGame固有ResearchからResearch Ownerへ到達できる

Validatorへ文章全文を固定しすぎず、重要ContractだけをRegression Guard化する。

### 21.33 Version方針

要件保存時点ではGuide Versionを変更しない。

実装時に新しいCross-cutting Normative Owner `docs/20-evidence-first-research.md` を正式追加する場合、現在のVersion体系・CHANGELOG履歴を再確認したうえで **`1.18.0` を第一候補**とする。

単なる既存章への小規模統合へScopeが変わった場合はVersionを再判断する。

### 21.34 非目標

- すべての質問でDeep Researchを行わない
- すべてのDeep Researchで必ず100件へ到達することを要求しない
- 100件をすべてDeep-readすることを要求しない
- Userへ全Source Listを毎回表示しない
- 論文だけを唯一の正解としない
- ResearchでUser Preference / Product Intentを上書きしない
- Consensus / Majority / Popular Patternを自動的に正解としない
- ResearchだけでProject Decisionを自動確定しない
- Evidence不足をAIの推測で埋めない
- Common GuideをProject固有Research Resultの倉庫にしない
- Projectごとに同じDeep Researchを無条件に100件からやり直さない
- README / START_HERE /各専門章へResearch Workflow全文を複製しない
- この要件保存だけでEvidence-first Research Ownerを実装済み扱いしない

### 21.35 実装完了条件

このGuide改善は少なくとも次を満たして初めて実装完了とする。

- [ ] Quick / Standard / Deep Researchが定義されている
- [ ] Prior Research Firstが明文化されている
- [ ] Deep ResearchでBroad Candidate Poolを探索する
- [ ] 100件規模がQuotaではなく探索目安として定義されている
- [ ] Research Saturationが実際の終了条件として定義されている
- [ ] Discovered / Reviewed / Deep-read / Core Evidenceを区別できる
- [ ] Original Source / Claim Verificationが定義されている
- [ ] Source Quality / Independence / Diversityを評価できる
- [ ] Confirmation / Publication / Survivorship / Conflict-of-interest等のBiasを扱う
- [ ] Opposing Evidence / Failure / Limitationを意図的に探す
- [ ] Language / Geographic / Cultural Biasを必要時に扱う
- [ ] ApplicabilityをEvidence Strengthと分離して評価する
- [ ] Causal / Correlational / Interpretationを区別する
- [ ] Statistical / Practical SignificanceとSubgroupを必要時に扱う
- [ ] Replication / Consensus / Emerging Evidenceを扱う
- [ ] Known / Disputed / Context-dependent / Unknown等のEvidence Mapがある
- [ ] Research後にDiscussion Gateがある
- [ ] Evidence / Interpretation / Project Preference / Decisionが分離されている
- [ ] Confirmed / Provisional / Open等でDecision状態を扱える
- [ ] Researchで解決しない問題をPrototype / Testへ渡せる
- [ ] Tool / Paywall / Evidence不足を正直に扱う
- [ ] Research StatusとResearch Review Gateがある
- [ ] Deep Researchで必要範囲のResearch Logを残せる
- [ ] Freshness / Research Asset Reuse / Delta Researchが定義されている
- [ ] Common Rule Promotion / Rule StrengthがGovernanceと接続している
- [ ] 一般Research WorkflowのSingle Normative Ownerが1つに整理されている
- [ ] `01` / `14` / `18` / `19` 等との責務重複が整理されている
- [ ] `18` の2〜5 Visual ReferenceがBroad Researchの総母数ではなくRepresentative Comparisonとして整理されている
- [ ] README / START_HEREから必要時にResearch Ownerへ到達できる
- [ ] Research Ownerを全作業へ機械的に強制していない
- [ ] Validator / required-file listが新Owner構造と整合している
- [ ] 必要なGuide Version / CHANGELOG / Work Reportを更新している
- [ ] 最終CommitでGuide Validatorが成功している
- [ ] GitHub上の最終状態を再確認している
- [ ] 未確認事項 / Known Issueがあれば明示されている

### 21.36 今回の変更理由 / Conflict確認

変更理由:

- 現行GuideにはRequirements Research、Continuous Improvement、Domain-first Visual Research等に個別のResearch Guidanceは存在するが、重要判断全般を横断する **Research → Evidence → Discussion → Decision → Validation** の一般Normative Ownerが存在しない。
- 現状では少数のReferenceだけで方向を決める余地があり、Sampling Bias、Confirmation Bias、Secondary Source依存、Evidence Conflict、Applicability差等を一貫して扱うWorkflowが不足している。
- 重要な問題では、既に研究・検証された知識を先に把握し、その後で今回固有のUnknown / Trade-offをUser + AIで考える方が、再発明・思い込み・少数Sample依存を減らせる。

既存仕様との関係:

- `docs/00-governance.md` のRule Budget / Single Normative Ownerと整合する
- `docs/01-requirements.md` のDecision Class / User確認責務は維持し、Research Methodだけ新Ownerへ委譲する
- `docs/14-continuous-improvement.md` のProject Feedback Loop / Rule Hygiene / Common Rule Promotion operationは維持する
- `docs/18-domain-first-visual-research.md` のVisual固有Workflowは維持し、一般Research Methodだけ新Ownerへ委譲する
- `docs/19-game-development.md` のGame-specific Rule / Playtest責務は維持する
- Quick / Standard / Deepにより小さな作業へ過剰Researchを強制しない
- 新しいOwnerをREADME / START_HERE / Validatorから辿れるようにしOrphan Ruleを作らない
- 既存Project固有仕様・Data互換・Runtime behaviorを直接変更しない

### 21.37 未解決事項 / Implementation Handoff

- Unresolved Core Decisions: None
- Unresolved High-cost Decisions: None
- Requirements Status: Ready for implementation
- General Research Normative Owner: `docs/20-evidence-first-research.md` を第一候補とし、実装開始時に最新番号体系を再確認する
- Guide Version candidate after implementation: `1.18.0`
- Implementation conversation: `web-project-guide（実装）`

## 22. 確定済みGuide改善要件 — Rule Routing / Preflight

### 22.1 目的 / Root Cause

Guideに正しいRuleが存在していても、AI / Coding Agentが今回の作業を誤分類し、適用条件を見落として必要Owner Docを読まずに作業開始する問題を防ぐ。

今回確認された代表Incidentは、Game全体のHUD / Inventory / Building UI / Menu等のUI要件定義を「既存Visual Directionの具体化」程度に狭く分類し、Meaningful Visual Change / Researchable Questionとして必要だったDomain-first Visual Research / Evidence-first Researchを、A/B/C案や推奨案を出す前に実施しなかったことである。

この失敗はUI固有ではなく、**条件付きRuleが存在していても、その条件判定自体をAgentが誤ればOwner Docへ到達できない**という全作業共通のRouting問題として扱う。

最終目的は、UserがGuide全文や適用Ruleを覚えていなくても、今回必要なRuleをAgent側で機械的かつ安全側に解決し、Required Docを実際に確認してから作業を始められる状態にすることである。

### 22.2 Core Contract — Rule Application Gate

作業開始前に原則として次のPreflightを通す。

```text
Current Repository / User Intent確認
↓
Task Classification
↓
Rule Resolution
↓
Required Docs / Required Gates確定
↓
Required Docs実読込
↓
Preflight Validation
↓
PASS / canProceed = true
↓
Research / 要件確定 / 推奨案 / 実装
```

Required Doc / Required Gateが満たされていない状態で、そのRuleに依存するScopeについて次へ進まない。

- A/B/C Solution案
- 推奨案の確定
- Research結果を前提にすべきDesign Decision
- Requirements確定
- 実装
- High-risk変更

「START_HEREを読んだ」「過去にOwner Docを読んだ」「Memoryに内容がある」をRequired Doc実読込の代用にしない。

### 22.3 User Rule Knowledge Independence

Userが `web-project-guide` のRule、Owner Doc、Gate、Profile、Routing条件を覚えていることを前提にしない。

次は原則としてAgent / Routerが判断する。

- Domain Researchが必要か
- Evidence-first Researchが必要か
- どのOwner Docを読むか
- GAME / DATA / CLOUD等のProfileが今回関係するか
- Migration / Security / Testing等のGateが発火するか

Userへ「docs/18を読みますか」「Researchは必要ですか」「Migration Ruleを適用しますか」等をRule適用判断として質問しない。

Userへ確認するのは、Product Intent / Core Decision / 破壊的変更 / 保存互換性を壊すか等、Userにしか決められない事項を中心とする。

### 22.4 Single Normative Owner / Source of Truth

Rule Routing / Preflight全体のBehavioral Contractは新しい専用Ownerへまとめる。

実装時第一候補:

- `docs/21-rule-routing-preflight.md`

責務:

- Task Classification
- Rule Applicability
- Preflight Contract
- Read Set
- Receipt
- Fail Closed
- Re-routing
- Task Session
- Override
- Legacy Migration
- Agent Adapter Contract

機械可読Routingの正本は次を第一候補とする。

- `maintenance/rule-router.json`

Schema:

- `maintenance/rule-router.schema.json`

`START_HERE.md`、`AGENTS.md`、Copilot等のAgent Instruction、Validator、Golden TestはRouting Rule本文の第二のSource of Truthにしない。

現行要件の「START_HERE = 作業種類別Routerの正本」という扱いは、この改善実装後は **人間向けRouter / Summary** へ役割を縮小し、機械可読Routing正本を `rule-router.json` に移す。これはSource of Truthに関する高影響変更として明示的に実施する。

### 22.5 Router Data Model

`rule-router.json` は少なくとも次を扱える構造とする。

- `schemaVersion`
- `routerId`
- Classification Axis / Enum
- Deterministic Classification Rules
- Evidence Priority
- Owner Doc Registry
- Stable Gate Registry
- Routing Rules
- Conditional Candidates
- Re-routing Triggers
- Task Session Reset Triggers
- Legacy → Managed Migration Triggers
- Compatibility情報

最初からDomain別に多数JSONへ分割せず、Routing正本は原則1つに保つ。大きくなった場合だけ責務を壊さない分割を再検討する。

### 22.6 Classification Axes

主要軸はStable Enumとし、表記揺れを避ける。

#### Project Profiles — Multi

既存Profileを利用する。

- STATIC
- DATA
- LEARNING
- GAME
- MEDIA
- AI-HANDOFF
- CLOUD
- ELECTRON
- TOOL
- PUBLIC-CONTENT

#### Work Type — 原則Single

第一候補:

- REQUIREMENTS
- RESEARCH
- IMPLEMENTATION
- BUG_FIX
- REVIEW
- DATA_CONTENT
- DEPLOYMENT
- MAINTENANCE

Work Type自体が変わる場合は複数値を併記せずRe-routing / New Task Sessionで扱う。

#### Domain — Multi

第一候補:

- ARCHITECTURE
- DATA_STORAGE
- UI_UX
- VISUAL
- PERFORMANCE_RELIABILITY
- SECURITY
- TESTING_QUALITY
- GITHUB_PAGES
- PROJECT_MANAGEMENT
- ELECTRON
- DISTRIBUTION
- DEPENDENCIES_ASSETS
- OBSERVABILITY
- GAME_DESIGN
- LEARNING_CONTENT
- CLOUD
- MEDIA
- RESEARCH
- GOVERNANCE_ROUTING

#### Change Scope — Single

- LOCAL
- MODERATE
- MEANINGFUL
- SYSTEMIC

#### Risk — Single

- LOW
- MEDIUM
- HIGH
- CRITICAL

複数Risk Signalがある場合は最も高い値を採用する。

#### Researchability — Single

- NOT_REQUIRED
- POSSIBLE
- REQUIRED

#### Special Conditions — Multi

Registry方式で拡張する。

例:

- EXISTING_SAVE
- SCHEMA_CHANGE
- MIGRATION
- AUTH_REQUIRED
- EXTERNAL_API
- PUBLIC_RELEASE
- REAL_DEVICE_REQUIRED
- LEGACY_PROJECT
- MANAGED_ROUTING

主要軸を自由文字列にしない。

### 22.7 Hybrid Classifier

Task ClassificationはAI自由判断だけにしない。

#### Deterministic Layer

機械的に判定可能なSignalを先に利用する。

- Current Repository metadata
- `project-meta.json`
- REQUIREMENTS / Spec
- package / Dependency
- File / Directory構造
- Runtime / Data
- Userが明示した作業種類
- 変更対象

#### AI補完Layer

自然言語やContext判断が必要な軸だけ補完する。

例:

- LOCALかMEANINGFULか
- Researchable Questionか
- User Requestの意味
- 複数Domainへの波及

AI補完がLow Confidenceの場合、その不確実性をRule削減の根拠にしない。

```text
LOCALかMEANINGFULか不明
→ MEANINGFUL側の必要Ruleも候補に含める
```

安全側RoutingだけでProduct Intentを変えず解決できる場合、UserへRule適用確認を求めず進める。安全側へ倒すとProductそのものが変わる場合だけUserへ確認する。

### 22.8 Evidence Priority / Repository Scan

Current StateとDesired Stateを分ける。

- Desired State / 何を作りたいか → Current User Requestを優先
- Current State / 今何が存在するか → Current Runtime / Code / Dataを強く扱う
- Safety Classification → 高Risk Signalを古いREADME / metadataで打ち消さない

Current State Evidenceは概ね次を基本とする。

```text
Current Runtime / Code / Data
↓
正式Requirements / Spec
↓
project-meta.json
↓
README / Project Rules
↓
Work Report / 過去資料
↓
Conversation / Memory
```

Repository全体を毎回精読せず、固定Minimum Scan + Signal-based Deepeningとする。

Minimum Scan候補:

- Current Repository state
- README
- REQUIREMENTS / 現行Spec
- `project-meta.json`（存在する場合）
- Project Rules / AGENTS（存在する場合）
- PROJECT_LEARNINGS（存在する場合）
- package等Project metadata
- 主要Directory構造

Supabase / Auth / IndexedDB / Save / Canvas / WebGL / Electron /大量Data等のSignalを検出した場合、該当Domainだけ追加確認する。

### 22.9 Canonical Resolver

Guide側に共通Resolverを持つ。

第一候補:

- `scripts/resolve-rule-route.mjs`

入力:

- Classification
- Project metadata
- Special Conditions
- Guide Revision Snapshot

出力:

- Required Docs
- Required Gates
- Conditional Candidates
- Migration requirement
- Preflight Receipt skeleton

AgentがRequired Docsを自由な手作業で選ばない。

Resolverを実行できない環境では、Current Revisionの `rule-router.json` を読み、同じ決定的合成規則による `deterministic-fallback` のみ許可する。MemoryからRoutingを再構成しない。

可能な環境では後からCanonical ResolverでFallback結果を再計算し、不一致をValidation Errorにできる。

### 22.10 Guide Revision Snapshot / Read Set

Preflight開始時にGuide Revisionを固定する。

最低限記録:

- `guideRepository`
- `guideVersion`
- `guideCommit`

Router / Schema / Owner Docs / Gate Registryは原則として同じ `guideCommit` から取得する。

作業途中でGuide mainが更新されても自動的に混在させない。Security / Migration / Routing等の重大修正へ切り替える必要がある場合だけ明示的にRe-preflightする。

Required DocはCurrent Snapshotから実際に取得するまでRead済みと扱わない。

次はReadの代用不可:

- Memory
- 過去Conversation
- 古いZIP
- 古いRevision
- 「以前読んだ」

同じGuide Commit / 同じblob SHAであることを検証できる場合のみRevision-aware Cacheを利用できる。

### 22.11 Preflight Receipt / State

Preflight Receiptは原則として一時データとする。

最低限候補:

- Task Session ID
- Guide Snapshot
- Repository Snapshot
- Classification
- Classification Evidence
- Resolver Mode
- Required Docs
- Required Gates
- Conditional Candidates
- Read Set + Revision / blob SHA
- Conditional除外理由
- Overrides
- Unresolved
- Validation Result
- `canProceed`

ReceiptはSanitized Metadata Onlyとし、Secret / Token / Cookie / `.env`値 / 個人情報 / Sensitive Payload / File本文の大量コピーを保存しない。

Top-level Stateは第一候補として次を固定する。

- PENDING
- PASS
- FAIL
- REVALIDATE
- BLOCKED
- LEGACY_FALLBACK

別Fieldとして必ず `canProceed: true / false` を持つ。

Gate単位では少なくとも次を区別する。

- APPLIED
- NOT_APPLICABLE
- OVERRIDDEN
- BLOCKED

`LEGACY_FALLBACK` や `OVERRIDDEN` を暗黙のPASS扱いにしない。

### 22.12 Fail Closed / Verified Fallback / Override

Required Doc / Gateが満たされなければ、そのRuleに依存するScopeは `canProceed = false` とする。

全Project作業を無条件停止するのではなく、影響Scope単位でFail Closedできる。

Required Doc取得失敗時は、同じCurrent Revisionであることを検証できる別経路だけFallbackとして認める。取得不能なら依存ScopeをBLOCKEDとする。

`NOT_APPLICABLE` と `OVERRIDDEN` を分離する。

- NOT_APPLICABLE — 適用条件そのものを満たさない
- OVERRIDDEN — 本来適用対象だが明示的例外として外す

MUST相当のOverrideでは原則として理由・影響・代替策・承認根拠を記録する。Agentの暗黙Overrideを禁止する。

### 22.13 Stable Gate ID / Rule Registration Contract

通常RoutingはOwner Doc単位とするが、読み飛ばすと重大事故になりやすいRuleだけStable Gate IDを持つ。

第一候補例:

- RULE-PREFLIGHT-GATE
- VISUAL-RESEARCH-GATE
- RESEARCHABLE-QUESTION-GATE
- STORAGE-MIGRATION-GATE
- GAME-PLAYTEST-GATE

Gate IDは一意でSingle Normative Ownerを持つ。

新しいNormative OwnerやRoutingへ影響する重要MUST / CONDITIONAL /作業開始Gateを追加・変更する場合、Routerへの登録要否を確認する。

Validatorは少なくとも次を確認できるようにする。

- Owner Doc → Router登録
- Router参照Docが存在
- Gate ID重複なし
- Gate Ownerが一意
- START_HEREの人間向け導線

新Rule追加を最初の解決策とせず、既存RuleのClassifier / Router / Test不足なら該当箇所を修正する。

### 22.14 Re-routing / Task Session / Cache

初回Preflightを作業終了まで永久に有効とは扱わない。

Re-routing Trigger候補:

- Domain追加
- Change Scope上昇
- Risk上昇
- Researchability変化
- Storage / Migration追加
- Auth / API / 外部依存追加
- Project Profile追加
- User Requirement変更
- 実装中に想定外の影響範囲を発見

追加Requiredが出た場合:

```text
一時停止
→ 追加Doc実読込
→ Receipt更新
→ Re-validation
→ 続行
```

Task SessionはClassification / Routing / Read Set / Cacheの単位とする。

Full Re-preflight / New Session Trigger候補:

- Work Type変更
- 主要目的変更
- Repository変更
- Guide Revision切替
- 主要User Requirement変更
- MeaningfulなScope変化
- Legacy → Managed移行
- 独立Phaseへの移行
- Repositoryが外部で大きく更新

同じConversationであることを同じTask Sessionの根拠にしない。

同一Task Session + 同一Guide Commit + 同一blob SHAならRead Cacheを再利用可能とする。

新ConversationではHandoff情報を参考にできるが、Current Guide / Repository Revisionを再検証し、同一Revisionと確認できたRead Setだけ再利用する。

### 22.15 Project metadata / Legacy Migration

各Projectへ新しいRouting専用metadata Fileを増やすことをDefaultにしない。既存 `project-meta.json` をRouting metadataのProject側正本として拡張することを第一候補とする。

保持候補:

- adopted guideVersion
- routing mode
- Project Profiles
- Project Rule Files
- Special Conditions

Common Rule本文をProject側へ複製しない。

metadataより実装が高Riskを示す場合、実態を今回のRoutingへ追加し、同時にmetadata driftを検出する。古いmetadataにSafety Ruleを無効化する権限を持たせない。

新規ProjectはManaged RoutingをDefault候補とする。

既存Projectは段階移行とし、Legacy Fallbackを許可する。

Legacyではmetadata欠落をWarningとして扱い、Repository Evidenceから安全側へ暫定Routingする。

Managed移行Trigger候補:

- REQUIREMENTS大幅変更
- 主要機能追加
- Meaningful Visual Change
- Navigation大変更
- Architecture変更
- Storage / Schema / Migration変更
- Auth / API / Cloud導入
- Electron / Deployment変更
- Game Core Loop / Progression変更
- 大規模Refactor
- High-risk / 分類不能

一度Managedへ移行したProjectはLegacyへ戻さない。Managed Projectではmetadata欠落 / Schema不正をFail対象とする。

### 22.16 Human Router / Agent Adapter同期

`START_HERE.md` のRouting情報を手動の第二正本にしない。

実装時はRouting領域だけ `rule-router.json` から自動生成する方式を第一候補とする。

例:

```text
<!-- ROUTER:START -->
generated routing summary
<!-- ROUTER:END -->
```

人間向け説明・背景・補足は手書き可能とする。

CIでRouterから再生成した結果と比較しDriftを検出する。

AGENTS / Copilot等のAgent Adapterも詳細Ruleを複製せず、共通Preflight入口だけを自動生成することを第一候補とする。

Project固有Purpose / Commands / High-risk Areas等は手書き領域に残す。

### 22.17 Cross-repository CI責務

共通責務は次のように分ける。

#### `EliteMay/web-project-guide`

- Rule / Owner Doc
- Router
- Schema
- Resolver semantics
- Preflight Contract
- Golden Routing Cases
- Guide側Validator

#### `EliteMay/.github`

- Reusable Workflow等のAccount共通GitHub実装

#### 各Project

- `project-meta.json`
- Project固有Rule
- 必要最小限のWorkflow呼出し

共通Validator本体を各Projectへコピーしない。

`EliteMay/.github` は別Repositoryであるため、本Guide実装だけを理由に無断で他Repositoryへ書き込まず、必要なCross-repository実装はGuide Core完成後の明示的な関連作業として扱う。

### 22.18 Validation / Golden Routing Cases

Validationは少なくとも次の三層を持つ。

1. **Schema Test** — JSON構造
2. **Unit Test** — Classification / ResolverのPure Logic
3. **Golden Routing Case** — 実際の代表依頼に対するRouting結果

Golden Caseは `mustInclude` だけでなく、過剰Routing防止の `mustNotRequire` も持てるようにする。

今回のIncidentを恒久Regression Caseへ昇格する。

#### 必須Case: GAME UI Requirements

Classification例:

```text
GAME
+ REQUIREMENTS
+ UI_UX / VISUAL / GAME_DESIGN
+ MEANINGFUL
+ RESEARCHABLE
```

Must include:

- `docs/01-requirements.md`
- `docs/04-ui-ux-accessibility.md`
- `docs/17-visual-quality-baseline.md`
- `docs/18-domain-first-visual-research.md`
- `docs/19-game-development.md`
- `docs/20-evidence-first-research.md`
- VISUAL-RESEARCH-GATE
- RESEARCHABLE-QUESTION-GATE

A/B/C案や推奨案を出す前にResearch Gateが発火することを確認する。

#### 必須Case: 局所UI Bug

Must include候補:

- UI / UX
- Visual Baseline
- Testing

Must not require候補:

- Deep Domain Research
- Game Progression
- Storage Migration

その他、Storage Schema変更、Supabase導入、Electron Release、Learning Content再設計、Guide Rule変更等を主要Golden Caseとして追加する。

Router変更はGolden Case PASSをMerge条件へ含めることを第一候補とする。

### 22.19 Routing Incident → Regression Promotion

Rule漏れ / 誤Routingが再発した場合、その場の修正だけで終わらせない。

```text
Routing Incident
↓
Root Cause分類
↓
既存Guideで防げたか確認
↓
Classifier / Router / Read / Re-route / Adapter / metadata / Validatorの欠陥箇所を特定
↓
Golden Regression Case追加
↓
必要箇所を修正
↓
新Case PASS
```

実Project側には `PROJECT_LEARNINGS.md` へ実際のIncident・影響・Project固有原因を必要範囲で残す。

Common Guide側には複数Projectへ一般化できるRegression Case / Rule改善だけを残す。

Project固有事情をそのままCommon Ruleへコピーしない。

### 22.20 Version / Compatibility

Router構造とRule Revisionを分離する。

- `schemaVersion` — Router JSON構造 / Resolver ContractのBreaking Change
- `guideVersion` / `guideCommit` — Rule内容のRevision

単なるRule条件補強やGolden Case追加だけで無意味にschemaVersionを上げない。

Compatibility Matrixを持ち、次を区別する。

- Compatible → 通常実行
- Migration possible → Migration + Validation
- Breaking / Unknown → Fail Closed

未知Schemaを「たぶん同じ」と推測して処理しない。

要件保存時点ではGuide Versionを変更しない。

実装時に新しいCross-cutting Owner / Machine-readable Router / Source-of-Truth変更を正式導入する場合、現在のVersion体系を再確認したうえで **`1.19.0` を第一候補**とする。

### 22.21 User-facing Preflight表示 / 永続化

通常時はPreflight詳細をUserへ大量表示せず、短いSummaryだけにする。

例:

```text
Preflight
- GAME / REQUIREMENTS
- UI / Visual
- Research Gate: Required
- Routing: PASS
```

次の場合は該当部分を明示する。

- FAIL / BLOCKED
- Override
- Low ConfidenceがProduct判断に影響
- metadata drift
- Legacy Fallback
- Guide Revision切替

通常ReceiptはRepositoryへCommitしない。

High-risk / 大規模変更 / PRでは必要に応じてRouting SummaryのみWork Report / PR等へ残す。

Guide自身のRouting変更ではValidation Evidenceを残す。

### 22.22 実装Phase / Exit Gate

最終仕様を削らず、実装だけを段階化する。

#### Phase 1 — Core Routing

- `docs/21-rule-routing-preflight.md`
- `rule-router.json`
- Schema
- Stable Gate Registry
- Resolver
- 基本Golden Cases

Exit Gate:

- Schema / Resolver / 基本Golden Case PASS

#### Phase 2 — Preflight Runtime

- Hybrid Classifier
- Repository Evidence Scan
- Guide Revision Snapshot
- Read Set
- Receipt
- Fail Closed
- Verified Fallback
- Override
- Re-routing
- Task Session
- Revision-aware Cache

Exit Gate:

- Required未読でPASSできない
- Re-routingで追加Ruleが正しく発火する

#### Phase 3 — Drift Prevention

- START_HERE Routing自動同期
- Agent Adapter共通部分同期
- Rule Registration Contract
- Guide Validator強化

Exit Gate:

- Router / Docs / Adapter Driftを検出可能

#### Phase 4 — Project Integration

- `project-meta.json`拡張
- Legacy / Managed
- metadata drift
- Migration Contract
- `EliteMay/.github` Reusable CIの設計・必要な別Repository作業

Exit Gate:

- Legacy / Managed双方のContractを検証

#### Phase 5 — End-to-End Validation

- GAME UI Requirements Incident
- 局所UI Bug
- Storage / Cloud / Electron / Learning等の代表Case
- Fail / Fallback / Override Case

Exit Gate:

- 全Regression Case PASS

主要Contractを満たさないまま次Phaseへ進まない。次Phaseに進まないと検証不能な項目だけ `deferred-to-phase-X` として明示的に持ち越せる。

Phase 5終了まで今回の改善を完成扱いしない。

### 22.23 非目標

- 毎回Guide全文を読むことを要求しない
- 小さなBug / TypoにもDeep Researchを強制しない
- CIだけでAgentがRule本文を理解したことまで完全証明したと主張しない
- RouterがUser Intent / Product Decisionを上書きしない
- 全Projectへ同一Profile / 同一Ruleを機械的に強制しない
- Test / Golden Caseを第二のRule Source of Truthにしない
- 全Preflight ReceiptをGitHubへ保存しない
- Legacy Repositoryを一斉Migrationしない
- 各AgentへCommon Rule全文を複製しない
- 各Projectへ共通Validator本体をコピーしない
- この要件保存だけでRule Routing / Preflightを実装済み扱いしない

### 22.24 実装完了条件

このGuide改善は少なくとも次を満たして初めて実装完了とする。

- [ ] Rule Routing / PreflightのSingle Normative Ownerが存在する
- [ ] Machine-readable `rule-router.json` がRouting正本として存在する
- [ ] Router Schemaが存在する
- [ ] Stable Classification Axis / Enumが定義されている
- [ ] Deterministic + AI補完のHybrid Classifierが成立する
- [ ] Low ConfidenceがRule削減に使われない
- [ ] Evidence Priority / Minimum Repository Scan / Signal-based Deepeningが定義されている
- [ ] Canonical ResolverがRoutingを機械計算できる
- [ ] Resolver不能環境のDeterministic Fallbackが定義されている
- [ ] Guide Revision Snapshotを固定できる
- [ ] Required DocをCurrent Revisionから実読込する
- [ ] Required未読でPreflight PASSできない
- [ ] Sanitized Preflight Receipt / Read Set / `canProceed` が定義されている
- [ ] NOT_APPLICABLE / OVERRIDDEN / BLOCKEDを区別できる
- [ ] Required不足で依存ScopeをFail Closedできる
- [ ] Verified FallbackがCurrent Revision確認を要求する
- [ ] Stable Gate ID / Rule Registration Contractが存在する
- [ ] Re-routing Trigger / Task Session / Session Reset Triggerが定義されている
- [ ] Revision-aware Cacheが同一Revisionでのみ再利用できる
- [ ] New Conversation / HandoffでRevisionを再検証する
- [ ] `project-meta.json`のManaged Routing metadata方針が定義されている
- [ ] metadata driftを安全側へ検出できる
- [ ] Legacy → Managedの段階Migrationが定義されている
- [ ] Managed Projectでmetadata欠落 / Schema不正をFailできる
- [ ] START_HEREのRouting部分がMachine Routerと同期する
- [ ] Agent Adapter共通部分がPreflight Contractと同期する
- [ ] Guide / `.github` / 各Projectの責務が分離されている
- [ ] Schema / Unit / Golden Routing Testの3層がある
- [ ] 今回のGAME UI要件定義CaseでVisual / Evidence Research Gateが必ず発火する
- [ ] 局所UI Bugで不要なDeep Researchを強制しない
- [ ] Routing IncidentをRegression Caseへ昇格するFeedback Loopがある
- [ ] Router schemaVersion / Guide Revision / Compatibilityを区別できる
- [ ] Breaking / Unknown SchemaでFail Closedする
- [ ] Preflight通常表示は簡潔で、異常時だけ必要詳細を示す
- [ ] Phase 1〜5のExit Gateが全て成立する
- [ ] 既存Single Normative Owner / Rule Budgetと矛盾する重複Ruleが残っていない
- [ ] 必要なREADME / Governance / Project Management / Requirements / Template / Validator等の関連文書が現行実装と一致する
- [ ] 必要なGuide Version / CHANGELOG / Work Reportが更新されている
- [ ] Cleanup後の最終CommitでGuide Validator / Routing Regressionが成功している
- [ ] GitHub上の最終状態を確認している
- [ ] 未確認事項 / Known Issueがあれば明示されている

### 22.25 Conflict / Compatibility確認

今回の要件は既存Guideの次のGapを補う。

- `START_HERE.md` はどのOwner Docへ行くかを人間向けに案内できるが、Agentが最初のTask分類を誤ると必要Routeへ入らない
- `AGENTS_TEMPLATE.md` は「関連章を読む」と案内しているが、何が関連章かを選定する工程自体が自由判断に残っている
- ValidatorはOwner Doc / Router Link等の存在を検証できるが、「今回のTask条件 → Required Rule」の対応関係や実読込を検証していない
- `maintenance/review-policy.json` はGuide定期Review用であり、日常Task Routingの正本ではない

高影響な変更点:

- 作業種類別RoutingのMachine-readable Source of Truthを新設する
- `START_HERE.md` を詳細Routing正本からHuman-facing Router / Summaryへ役割変更する
- 新しいCross-cutting Normative Ownerを追加する
- Managed ProjectではRouting metadata / Preflight ContractをValidation対象にする

このため実装時は `docs/00-governance.md` のSource of Truth / Single Normative Owner / Rule Budget、`docs/10-project-management.md`、`docs/01-requirements.md`、`templates/AGENTS_TEMPLATE.md`、`tests/validate-guide.mjs` 等との整合を必ず確認する。

既存Projectへ一斉破壊的Migrationは行わず、Legacy Fallback + Meaningful Change時の段階MigrationでCompatibilityを保つ。

### 22.26 未解決事項 / Implementation Handoff

- Unresolved Core Decisions: None
- Unresolved High-cost Decisions: None
- Requirements Status: Ready for implementation
- Behavioral Owner candidate: `docs/21-rule-routing-preflight.md`
- Machine-readable Router candidate: `maintenance/rule-router.json`
- Router Schema candidate: `maintenance/rule-router.schema.json`
- Resolver candidate: `scripts/resolve-rule-route.mjs`
- Guide Version candidate after full implementation: `1.19.0`
- Required Regression: GAME + REQUIREMENTS + UI_UX / VISUAL + MEANINGFUL + RESEARCHABLE must route to `docs/18` and `docs/20` before solution recommendation
- Implementation phases: Phase 1 Core Routing → Phase 2 Preflight Runtime → Phase 3 Drift Prevention → Phase 4 Project Integration → Phase 5 E2E Validation
- Implementation conversation: `web-project-guide（実装）`
