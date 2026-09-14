# Human Guide Requirements

この文書は `EliteMay/web-project-guide` の**人間向けWeb版（Human Guide）のCurrent Product Contract**です。

Common Rule本文の正本は引き続き `docs/` の各Owner Doc、Machine-readable Routingの正本は `maintenance/rule-router.json` です。この文書はHuman Guideという公開Surfaceが、それらの正本を人間へどう安全に投影するかを定義します。Human Guideへ第二のRule本文を作りません。

## 0. Status / Scope

- Status: Ready for implementation
- Target: Repository root public entry + `site/` canonical Human Guide surfaces
- Primary users: Repository owner / collaborators / Human Guideを使ってRuleを探す利用者
- Deployment: Current GitHub Pages modelを維持
- Authority: Human GuideはSummary / Router / Search / Status projection。Normative Ruleではない
- Private `EliteMay/web-project-data` の内容をPublic Human Guideへ直接公開しない

このContractは、2026-09-14のComparative Research / Feature Gap MatrixでP0と判定したFindability・Consistency・Freshnessの改善をCurrent Requirementへ昇格したものです。

## 1. 目的

Human Guideは、利用者がOwner番号やRepository構造を暗記しなくても、次を短時間で判断できる状態を提供します。

1. 今回どこから始めればよいか
2. どのRule / Requirementが正本か
3. 目的の情報をNavigation / Search / Task Routerの複数経路から見つけられるか
4. 現在見ているPageがHuman Summaryなのか、Current Contractなのか、Evidenceなのか
5. 表示されているGuide Version / freshness情報が何を意味するか

Searchを壊れたIAの唯一のFallbackにはせず、Navigation / Task Router / Searchを相互補完として扱います。

## 2. Non-goals

P0では次を追加しません。

- Login / Account system
- Cloud bookmark / Favorite sync
- Learning progress tracking
- Historical Guide Version Picker
- Hosted / server-backed search service
- `web-project-data` のPrivate Research / Evidence公開
- Human Guide専用の第二Rule本文
- Human Guideのためだけの大規模Framework移行
- `llms.txt` / Docs専用MCP / Agent専用API

これらは将来のEvidenceで必要性が上がった場合に再評価します。

## 3. Human Guide Surface Registry / Manifest

### MUST: Public Surface metadataを1つのRegistryへ集約する

Human GuideのNavigation / Search / Validator / compatibility routeが別々のHardcode表を持たないよう、`site/data/human-guide-manifest.json` をHuman Guide presentation metadataのSingle Sourceとします。

ManifestはNormative Ruleの正本ではありません。Human Guideの**表示・経路・検索用metadata**だけを所有します。

各canonical surfaceは最低限次を持ちます。

- stable `id`
- 日本語のpublic `label`
- canonical public `path`
- `compatibilityPaths[]`
- `surfaceType`
- `authority`
- `nav.visible`
- `nav.order`
- `searchable`
- `sourceLinks[]`
- 必要な`keywords[]`

### Surface type

初期typeは必要最小限にします。

- `home`
- `router`
- `reference-summary`
- `research-requirements-summary`
- `dashboard`

新しいtypeは実際の役割差がある場合だけ追加します。

### Authority label

Search / UIで最低限次を区別できるmetadataを持ちます。

- `human-summary` — Human Guideの要約
- `normative-owner` — Common Rule正本へのEntry
- `current-contract` — Current Requirements
- `reference-evidence` — Public Reference / Evidence
- `catalog-example` — Failure / Success / Anti-pattern等
- `status` — Dashboard / current status
- `compatibility` — 旧URL等の互換Surface

Human Guide自身を`normative-owner`として登録しません。

## 4. Global Navigation Contract

### MUST: Canonical Human Guide SurfaceでGlobal Navigationを一致させる

Canonical Human Guide page間で、Global Navigationの主要destination・相対順序を理由なく変えません。

- Manifestで`nav.visible: true`のSurfaceを共通Navigationの基準とする
- Current pageには`aria-current="page"`等で現在地を示す
- Homeへ常に戻れる
- Pageごとに別のGlobal Nav setを手書きしてdriftさせない
- Local navigation / Page TOCはGlobal Navigationと分離する

### MUST: Narrow viewportで主要Navigationを失わせない

Global Navigationは小さい画面でも主要destinationがclippingで到達不能にならないこと。

実装はCurrent designに合わせて、wrap / horizontal scroll / compact navigation等から最小で安全な方法を選べます。方式そのものをこのRequirementで固定しません。

### MUST: Repeated navigationを飛ばせる

Canonical Human Guide pageはmain contentへ移動できるskip mechanismを持ち、Keyboard利用時のfocusを視認できること。

## 5. Site-wide Search Contract

### MUST: Human Guide全体からCurrent Public Guide資産を検索できる

Rule Finder page内だけのLocal Filterとは別に、Public Human Guide全体を横断するSearchを提供します。

初期index候補:

- canonical Human Guide pages
- `docs/` Owner Docs
- root Current Requirements / Human Guide Requirements
- `references/` のPublic Curated Reference
- `catalog/` のPublic Catalog

`EliteMay/web-project-data` はindex対象にしません。

### MUST: Search resultでAuthorityを区別する

Search resultは少なくとも次を表示または識別可能にします。

- title
- short summary / matching context
- authority / content type
- canonical destination

Human Summary / Owner Doc / Requirements / Evidenceを同列の正本に見せません。

### SHOULD: Static searchを優先する

Current GitHub Pages運用ではServer backendを前提にしません。

Pagefind等のStatic index、またはGenerated JSON + browser-side searchを候補とし、Current Publishing Source / CI / maintenance costを比較して決めます。

### Search behavior

- 日本語QueryをPrimary use caseとして扱う
- KeyboardだけでSearch input / resultへ到達できる
- 0件時にQuery変更・Rule Router等の次Actionを示す
- SearchをGlobal Navigationの代替にしない
- 初期Filterは`authority` / `content type`等、実際に探索差が出るものへ限定する

## 6. Human Task Router Contract

### MUST: Human RouterのDecision logicをMachine Routerと二重管理しない

人間向け「作業ルート診断」は `maintenance/rule-router.json` のCurrent dataをSourceとしてprojectionします。

利用者はOwner番号を覚えず、最低限次のようなTask情報から必要Owner / Gateへ到達できます。

- Work Type
- Domain
- applicable Risk Signal / Gate

### Result

Router resultは最低限次を示します。

- 今回読むOwner Doc
- applicable Gate
- なぜそのRouteになったかを理解できる短い説明
- Canonical OwnerへのLink

Human Router用にRule decisionを別JSON / HTML本文へ再定義しません。

### Graceful failure

Machine Router dataの読込に失敗しても、Human Guide全体を壊しません。Canonical `START_HERE.md` / Rule FinderへのFallbackを残します。

## 7. Human Guide Freshness / Release State Contract

### MUST: Guide release stateとHuman page同期状態を同一視しない

`guide-version.json` の `guideVersion` / `updated` / `status` はRepositoryのRelease Baselineを表します。

それを表示しただけで、手書きHuman SummaryがそのVersion / Current `main`の全Ruleへ同期済みであると表現しません。

### SHOULD: duplicate Human contentを減らす

Navigation / Route / Source metadata等、機械的に投影できる情報はManifest / Machine Router / canonical metadataから生成または読込し、Human HTMLへの手動複製を減らします。

### MUST: freshnessの意味を明示する

UIにVersion / updated informationを出す場合は、少なくとも次のどれを表すか混同しないこと。

- Guide release baseline
- Current mainにunreleased changesがある状態
- Human surface自身のcontent review / synchronization evidence

P0では大量の手動`lastReviewed` field運用を必須にしません。まずGenerated projectionとValidatorでdrift sourceを減らすことを優先します。

## 8. Validator / Regression Guard Contract

### MUST: ValidatorはManifestからCurrent Human Surfaceを解決する

`tests/validate-human-guide.mjs` はCanonical Surface / compatibility adapter一覧を別Hardcode表として持ち続けず、ManifestをCurrent Surface Registryとして検証します。

最低限確認するもの:

- Manifest JSONがparse可能
- stable id / canonical pathの重複なし
- canonical fileの存在
- compatibility adapterの存在
- compatibility adapterが期待canonical routeへ到達する
- nav-visible surfaceがglobal navigation contractから欠落していない
- canonical surfaceのcurrent-page indicator contract
- required source / authority metadata
- private `web-project-data` path / dataをPublic manifest/search indexへ登録していない
- Search index / Router projectionを生成する場合、source registryとのdriftを検出できる

### MUST: New Surface追加時のValidator更新漏れを減らす

Surface追加は原則としてManifest登録を入口とし、Validatorがそれを動的に検査します。

`requiredFiles` 等を別々の配列へ毎回手動追加する設計は必要最小限へ縮小します。

## 9. Accessibility / Responsive Acceptance

P0機能の実装後、少なくとも次を確認します。

- KeyboardのみでGlobal Navigation / Search / Router主要操作へ到達できる
- Current page / selected stateが色だけに依存しない
- Skip linkが機能する
- Narrow viewportでGlobal Navigation destinationが消えない
- Search resultのauthority labelが読み取れる
- Focus styleを消さない
- Search / Router error stateからRecovery pathがある

## 10. Compatibility / Non-breakable Contract

次は壊しません。

- Repository root `/web-project-guide/` のstable public entry
- Existing root compatibility URLs
- `site/pages/` をcanonical secondary pageとするCurrent boundary
- `docs/` Owner DocsのNormative authority
- `maintenance/rule-router.json` のMachine Routing authority
- Current GitHub Pages static deployment
- Private `web-project-data` とPublic Guideの分離

URL変更が不要な機能改善のために既存Public URLをRenameしません。

## 11. Completion Contract

P0 Human Guide改善をCompletedと呼べるのは、最低限次を満たす場合です。

1. `site/data/human-guide-manifest.json` がCurrent Surface Registryとして存在する
2. Canonical Human GuideのGlobal NavigationがManifest contractと一致する
3. Current page indicator / skip mechanism / narrow viewport Navigationが機能する
4. Public corpusを横断するSite-wide Searchが使える
5. Search resultでAuthority / content typeを区別できる
6. Human Task Routerが`maintenance/rule-router.json`からCurrent Routeを投影する
7. `tests/validate-human-guide.mjs` がManifest / adapters / nav / public-data boundaryを検証する
8. Guide release stateをHuman Summary freshnessと誤認させない
9. Existing public URLsのcompatibilityを維持する
10. Static Validationを通す
11. Browserで主要Flowを確認する
12. Narrow viewportでNavigation / Search / Routerを確認する
13. Merge後のCurrent Pages URLを確認できる場合、実公開状態まで確認する

CI successだけをBrowser / Public Pages確認済みとは扱いません。

## 12. Implementation Handoff

- Status: **Ready for implementation**
- Blocking Decisions: None
- Research record: `EliteMay/web-project-data/research/studies/web-project-guide/human-guide-comparative-research.md`
- Feature gap matrix: `EliteMay/web-project-data/research/studies/web-project-guide/human-guide-feature-gap-matrix.md`
- Implementation target: `EliteMay/web-project-guide`
- Preferred change path: Feature Branch + Pull Request
- Important constraint: Human Guideを第二Normative Rule本文にしない
