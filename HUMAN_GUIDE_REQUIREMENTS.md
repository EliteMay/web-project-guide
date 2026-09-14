# Human Guide Requirements

この文書は `EliteMay/web-project-guide` の**人間向けWeb版（Human Guide）のCurrent Product Contract**です。

Common Rule本文の正本は `docs/` の各Owner Doc、Machine-readable Routingの正本は `maintenance/rule-router.json` です。Human Guideは、それらの正本を人間へ安全に投影するためのSummary / Router / Search / Status Surfaceであり、第二のRule本文を作りません。

## 0. Status / Scope

- Status: **Current Product Contract**
- Target: Repository root public entry + `site/` canonical Human Guide surfaces
- Primary users: Repository owner / collaborators / Human Guideを使ってRuleを探す利用者
- Deployment: Current GitHub Pages static modelを維持
- Authority: Human GuideはSummary / Router / Search / Status projection。Normative Ruleではない
- Private `EliteMay/web-project-data` の内容をPublic Human Guideへ直接公開しない

## 1. 目的

Human Guideは、利用者がOwner番号やRepository構造を暗記しなくても、次を短時間で判断できる状態を提供します。

1. 今回どこから始めればよいか
2. どのRule / Requirementが正本か
3. Navigation / Search / Task Routerの複数経路から目的の情報へ到達できるか
4. 現在見ている情報がHuman Summary / Current Contract / Owner / Evidence / Catalogのどれか
5. 長いPage内で現在地と主要Sectionを把握できるか
6. 誤りを見つけたとき、Source確認・編集・Issue報告へ進めるか
7. 表示されているGuide Version / freshness情報が何を意味するか

Searchを壊れたIAの唯一のFallbackにはせず、Navigation / Page TOC / Task Router / Searchを相互補完として扱います。

## 2. Non-goals

Current Human Guideでは次を追加しません。

- Login / Account system
- Cloud bookmark / Favorite sync
- Learning progress tracking
- Historical Guide Version Picker
- Hosted / server-backed search service
- `web-project-data` のPrivate Research / Evidence公開
- Human Guide専用の第二Rule本文
- Human Guideのためだけの大規模Framework移行
- 大規模Recommendation Engine
- Helpfulness analyticsを収集するだけのUI
- `llms.txt` / Docs専用MCP / Agent専用API

これらはCurrent evidenceで必要性が上がった場合だけ再評価します。

## 3. Human Guide Surface Registry / Manifest

### MUST: Public Surface metadataを1つのRegistryへ集約する

`site/data/human-guide-manifest.json` をHuman Guide presentation metadataのSingle Sourceとします。ManifestはNormative Ruleの正本ではなく、表示・経路・検索・Page補助UI用metadataだけを所有します。

各canonical surfaceは最低限次を持ちます。

- stable `id`
- 日本語のpublic `label`
- canonical public `canonicalPath`
- `compatibilityPaths[]`
- `surfaceType`
- `authority`
- `nav.visible` / `nav.order`
- `searchable`
- `sourceLinks[]`
- 必要な`keywords[]`
- 長いPageでPage TOCを出す場合は `toc: true`

Human Guide自身を`normative-owner`として登録しません。

## 4. Global Navigation / Accessibility Contract

### MUST: Canonical Human Guide SurfaceでGlobal Navigationを一致させる

- Manifestで`nav.visible: true`のSurfaceを共通Navigationの基準とする
- Current pageには`aria-current="page"`等で現在地を示す
- Homeへ常に戻れる
- Pageごとに別のGlobal Nav setを手書きしてdriftさせない
- Local navigation / Page TOCはGlobal Navigationと分離する

### MUST: Narrow viewportで主要Navigationを失わせない

小さい画面でも主要destinationがclippingで到達不能にならないこと。Current designではhorizontal scroll等の最小で安全な方法を選べます。

### MUST: Repeated navigationを飛ばせる

Canonical Human Guide pageはmain contentへ移動できるskip mechanismを持ち、Keyboard focusを視認できること。

## 5. Site-wide Search Contract

### MUST: Current Public Guide資産を横断検索できる

初期index対象:

- canonical Human Guide pages
- `docs/` Owner Docs
- root Current Requirements / Human Guide Requirements
- Public entry / router docs
- `catalog/` のPublic Catalog
- 必要に応じて `references/` のPublic Curated Reference

`EliteMay/web-project-data` はindex対象にしません。

### MUST: Search resultでAuthorityとContent Typeを区別する

Search resultは最低限次を表示または識別可能にします。

- title
- short summary / matching context
- authority
- content type
- canonical destination

`authority`は「どの程度正本か」、`contentType`は「何の種類のDocument / Surfaceか」を表し、同じ概念として潰しません。

Current content type vocabulary:

- `requirements`
- `entry-doc`
- `human-page`
- `owner-doc`
- `catalog`

新しいtypeはSearch上の探索差が実際にある場合だけ追加します。

### SHOULD: Filterは少数の意味ある軸に限定する

初期Filterは次の2軸を標準とします。

- Authority
- Content Type

Product / Role / Level等の多軸FilterをCurrent規模へ機械的に追加しません。

### SHOULD: KeyboardからSearchへ直接移動できる

Search pageでは `/` と `Ctrl/Cmd + K` を検索欄Focus shortcutとして利用できます。

- Input / textarea / select等へ入力中は`/`を奪わない
- `Ctrl/Cmd + K`を使用する場合はSearch page内でのみ明示的に扱う
- Shortcutが動かなくても通常のTab操作でSearchへ到達できる

### Search behavior

- 日本語QueryをPrimary use caseとして扱う
- KeyboardだけでSearch input / filters / resultsへ到達できる
- 0件時にQuery変更・Task Router等の次Actionを示す
- SearchをGlobal Navigationの代替にしない
- Query / Filter stateはURLへ反映し、Reload / share時に復元できる
- Current GitHub Pages運用ではServer backendを前提にしない

## 6. Human Task Router Contract

### MUST: Human RouterのDecision logicをMachine Routerと二重管理しない

人間向け「作業ルート診断」は `maintenance/rule-router.json` のCurrent dataをSourceとしてprojectionします。

Router resultは最低限次を示します。

- 今回読むOwner Doc
- applicable Gate
- なぜそのRouteになったかを理解できる短い説明
- Canonical OwnerへのLink

Machine Router dataの読込に失敗してもHuman Guide全体を壊さず、`START_HERE.md` / Rule FinderへのFallbackを残します。

## 7. Page TOC Contract

### SHOULD: Long / reference-oriented PageはAuto TOCを使う

Manifestで`toc: true`のcanonical HTML surfaceは、`main`内の`h2` / `h3`からPage TOCを自動生成します。

- HTML本文へTOC Linkを手作業で重複管理しない
- Anchor IDが無いHeadingにはRuntimeで重複しないIDを付ける
- TOC自身やSource FooterのHeadingをIndexへ含めない
- 現在Sectionを`aria-current="location"`等で示せる場合は示す
- Desktopでは読み進めながら再利用しやすいsticky / persistent patternを使える
- Mobileでは本文を押し下げ続けないcompact / collapsible patternを優先する
- Heading数が少なくNavigation価値が低いPageへ機械的に出さない

TOCはGlobal Navigationの代替ではありません。

## 8. Source / Edit / Report Contract

### MUST: Shared shellを使うcanonical Human GuideはSource境界へ到達できる

Human Guide page下部に、Manifestの`sourceLinks[]`から生成する共通Source Footerを提供します。

最低限:

- Current Human surfaceを支えるSource / Owner / RequirementへのLink
- Current HTML pageをGitHubで編集するLink
- 誤りをIssueとして報告するLink

FooterはHuman Guideの要約を正本と誤認させず、Source確認・Correctionへ進むための導線です。

- Source LinkはManifestから投影し、Pageごとに別の一覧を手書きしない
- Directory sourceはGitHub tree、File sourceはGitHub blobへ到達できる
- Edit Linkはcurrent canonical HTML sourceを対象にする
- Report Linkはcurrent surfaceを識別できる情報を含める
- Private `web-project-data` をSource Footerへ露出しない

## 9. Human Guide Freshness / Release State Contract

### MUST: Guide release stateとHuman page同期状態を同一視しない

`guide-version.json` の `guideVersion` / `updated` / `status` はRepositoryのRelease Baselineを表します。それを表示しただけで、手書きHuman SummaryがCurrent `main`の全Ruleへ同期済みであると表現しません。

Navigation / Route / Source metadata等、機械的に投影できる情報はManifest / Machine Router / canonical metadataから生成または読込し、Human HTMLへの手動複製を減らします。

## 10. Validator / Regression Guard Contract

ValidatorはManifest / Search RegistryからCurrent SurfaceとSearch corpusを解決し、別Hardcode表の増殖を避けます。

最低限確認するもの:

- Manifest JSONがparse可能
- stable id / canonical pathの重複なし
- canonical file / compatibility adapterの存在とtarget
- nav-visible surfaceがGlobal Navigation contractから欠落していない
- required source / authority metadata
- `toc: true` surfaceがshared TOC runtimeへ接続されている
- shared shellがSource FooterをManifestから生成する
- Search sourceがAuthority / Content Type metadataを持つ
- Search pageがAuthority / Content Type FilterとKeyboard shortcut contractを持つ
- private `web-project-data` path / dataをPublic manifest/search indexへ登録していない
- Rule Finder等の既存主要Content / Feature coverageをPresentation refactorで落としていない

## 11. Accessibility / Responsive Acceptance

少なくとも次を確認します。

- KeyboardのみでGlobal Navigation / Search / filters / Router主要操作へ到達できる
- Current page / current section / selected stateが色だけに依存しない
- Skip linkが機能する
- Narrow viewportでGlobal Navigation destinationが消えない
- Auto TOCがMobile本文を恒常的に遮らない
- Search resultのauthority / content type labelが読み取れる
- Focus styleを消さない
- Search / Router error stateからRecovery pathがある
- Source FooterのLinkにKeyboardで到達できる

## 12. Compatibility / Non-breakable Contract

次は壊しません。

- Repository root `/web-project-guide/` のstable public entry
- Existing root compatibility URLs
- `site/pages/` をcanonical secondary pageとするCurrent boundary
- `docs/` Owner DocsのNormative authority
- `maintenance/rule-router.json` のMachine Routing authority
- Current GitHub Pages static deployment
- Private `web-project-data` とPublic Guideの分離
- Rule Finder等、既存Human-facing feature inventory

URL変更が不要な機能改善のために既存Public URLをRenameしません。

## 13. Completion Contract

Human GuideをCurrent Contractに対してCompletedと呼べるのは、最低限次を満たす場合です。

1. Manifest-driven Global Navigation / current page / skip mechanism / narrow viewport Navigationが機能する
2. Site-wide SearchがPublic corpusを横断し、Authority / Content Typeを区別・Filterできる
3. `/` と `Ctrl/Cmd + K` のSearch shortcutが通常入力を壊さない
4. Human Task RouterがCurrent Machine RouterからRouteを投影する
5. `toc: true`の長いPageでAuto TOCが生成され、Desktop / Mobileで主要本文を阻害しない
6. Shared shell pageでManifest-driven Source / Edit / Report footerへ到達できる
7. Guide release stateをHuman Summary freshnessと誤認させない
8. Existing public URLsと既存Human-facing content coverageを維持する
9. Static Validation / dedicated Regression Guardを通す
10. BrowserでSearch / TOC / Footer / Keyboard flowを確認する
11. Narrow viewportでNavigation / Search / TOC / Footerを確認する
12. Merge後のCurrent Pages URLを確認できる場合、実公開状態まで確認する

CI successだけをBrowser / Public Pages確認済みとは扱いません。

## 14. Research / Evidence Boundary

Current Product Contractを導いた比較Researchの詳細は `EliteMay/web-project-data/research/studies/web-project-guide/` にHistorical / working evidenceとして保存します。Current判断ではこの文書、Current Repository、Current Owner Docsを優先し、Research recordを第二Source of Truthにしません。
