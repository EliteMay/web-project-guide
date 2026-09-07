# 08 GitHub Pages

この章は、**GitHub Pages固有のStatic Delivery / Publishing Source / Custom Domain / Path / Cache / Public URL / Recovery判断**の正本です。

一般Web Hosting / Runtime shape / Environment orchestrationは [10 Project Management](10-project-management.md#general-web-deployment--runtime-environments)、Release / Rollback / Recoveryは [09 Version / Maintenance](09-maintenance.md)、Testing Strategyは [07 Testing / Quality](07-testing-quality.md) を正本とします。

Current GitHub Pages仕様のResearch Evidenceは [GitHub Pages Static Delivery Research](../references/github-pages-static-delivery-research.md) に保存します。

## 基本方針

HTML / CSS / JavaScriptだけで完結できるSiteは、Project要件を満たす限りGitHub Pagesでそのまま利用できる構成を優先できます。

GitHub Pagesで十分な場合、利用のためだけにローカル環境を要求しません。

できるだけ以下への依存を避けます。

- `start.bat`
- ローカルサーバー
- Node.jsの常時実行
- `localhost`
- PC固有の絶対Path

ただし「Staticで公開できる」ことだけを理由にPagesへ固定しません。trusted server execution、秘密情報を使うServer処理、Pagesでは満たせないRouting / Header / Runtime要件等がPrimary Taskへ必要になった場合は、無理なClient-side workaroundを増やす前に [10 Hosting Migration Trigger](10-project-management.md#hosting-migration-trigger) を確認します。

## Pagesを選ぶ / 選ばない境界

Pagesが自然な候補:

- publish artifactがStatic fileだけで成立する
- public Client code / DataだけでPrimary Taskを完了できる
- repository subpath / static route制約をProjectが受け入れられる
- buildが必要でも最終ArtifactはStaticである

Pagesだけでは不十分になりやすい例:

- private secretを使うtrusted server processingが必須
- long-running server / queue / worker / private backendがPrimary Runtime
- server-side rewrite / arbitrary response behavior等をProduct Contractとして必要とする
- Static workaroundのSecurity / Reliability / Maintenance costがHosting移行Costを上回る

Backend / Serverless等と併用する構成自体は可能です。その場合、PagesはFrontend delivery、外部Runtimeは別Authorityとして扱い、API / Auth / Failure boundaryを各専門Ownerで確認します。

## Publishing Source Decision — Branch vs GitHub Actions

GitHub Pagesは現在、**Branch publishing**または**custom GitHub Actions workflow**をPublishing Sourceとして利用できます。どちらかを慣習だけで固定しません。

### Branch publishingが自然な場合

- Repository内のpublish対象がそのままStatic artifactになる
- Jekyll等の既定Buildで十分
- 独自Build pipeline / artifact生成が不要
- SourceとPublished fileを同じBranch / folderへ置くことがProject構造上自然

### GitHub Actions publishingが自然な場合

- Bundler / Static Site Generator / custom buildが必要
- SourceとGenerated Artifactを分けたい
- deploy前にTest / build validationを組み込みたい
- build artifactを明示的にPagesへUpload / Deployしたい
- Branch publishingの前提へRepository構造を無理に合わせたくない

Build output専用Branchを「Pagesだから」という理由だけで必須にしません。逆にBuild不要の小規模Siteへ複雑なActions pipelineを機械的に追加しません。

### Pull Request / Preview

Pull Requestでは必要に応じて同じBuild / Testを実行し、**Production PagesへのDeployとCandidate検証を分けます**。

- PRでartifact build / link / route / visual確認を行うことはできる
- Production Pages URLをPR previewとして上書きし続けない
- PRごとの公開Previewが本当に必要なら、別のPreview mechanism / temporary environmentをProject要件から選ぶ
- Previewで成功してもProduction domain / cache / external integrationを自動的に確認済み扱いにしない

## Build Artifact / Deployed Revision

Pagesの「workflow success」だけで、意図したRevisionが公開されたとは決めません。

必要に応じて:

```text
Final Source Commit
↓
Build
↓
Pages Artifact
↓
Deploy
↓
Public URL
↓
Primary Task Smoke
```

を追跡します。

- Actions deployではPages artifactのrootに公開Entryが存在することを確認する。
- `index.html`等、Pagesが期待するFile名のCaseを一致させる。
- Generated fileだけ変わるBuildではSource Commit / Build / Artifactの対応を追跡できるようにする。
- Cleanup / config変更後は前のDeploy成功をFinal-state evidenceへ使い回さない。

詳細なFinal-state Validationは [07](07-testing-quality.md#final-state-validation) を使います。

## 相対パス / Project Site Subpath

GitHub PagesのProject Siteは通常Repository名を含むSubpathで公開されます。

```text
https://<user>.github.io/<repo>/
```

そのため、root固定の`/assets/...`を無条件に使わず、Project構成 / build base URL / routing方式に合うPathを選びます。

確認候補:

- HTMLからCSS / JSが読める
- JSからJSON / Assetが読める
- Page間Linkがsubpathで壊れない
- `fetch()`先がPages上でも正しい
- File名の大文字小文字が一致する
- Service Worker scopeが意図した範囲になる
- Asset URLをlocalhost / PC path / temporary domainへhardcodeしていない

User / Organization SiteとProject Siteでbase pathが異なるため、localhost rootだけで通ったPathをPages成功の証明にしません。

## SPA / Client-side Routing / Direct Open

CONDITIONAL: SPAやHistory API Routingを使う場合、**Client-side Navigationが動くこと**と**URLを直接開いた / RefreshしたときにHostが正しいResourceを返すこと**を分けて確認します。

PagesはStatic Hostingなので、一般的なApplication Serverのような任意rewriteがある前提にしません。

Project要件に応じて候補を選びます。

- 実Static HTML routeを生成する
- Hash-based routingを使う
- `404.html`等からClient-side recoveryする設計を明示する
- Direct-open / SEO / Status Code / Sharing要件が重要なら、別Hostingを検討する

`404.html` workaroundをServer rewriteと同義に扱いません。URL共有 / External Search / OAuth callback等でDirect-open semanticsが重要なら、実公開URLで確認します。

## 404 / Recovery

複数Page、外部からのDirect Link、URL共有がある公開Siteでは、必要に応じて`404.html`を用意します。

404画面は装飾だけで終わらせず、少なくとも次のいずれかへ戻れるようにします。

- Home
- Search
- Main navigation
- 主要一覧

単一Pageの極小Siteへ機械的に追加する必要はありません。

Actions artifactを使う場合、Entry fileがartifact rootへ正しく入っていない等のBuild / artifact issueと、Userが存在しないURLへ来た通常404を区別します。

## Custom Domain / DNS / HTTPS

CONDITIONAL: Custom Domainを使う場合、DomainはUI decorationではなく**External URL Contract**です。

### Domain setup / verification

- Custom DomainはGitHub Pages側の設定とDNS Provider側の設定を両方確認する。
- DNSだけを先に向けてRepository側へDomainを設定しない状態を避ける。
- 可能ならGitHubのDomain Verificationを使い、takeover riskを下げる。
- Wildcard DNSを安易にPagesへ向けない。Current GitHub guidanceでRiskを確認する。
- Domain verification用DNS recordを、検証後に理由なく消さない。

### Branch / ActionsでのCNAME差

Current GitHub Pagesでは:

- Branch publishingではCustom Domainがpublishing source rootの`CNAME`へ反映される
- Custom GitHub Actions publishingではRepository内の`CNAME` fileはCustom Domain設定のAuthorityではない

という差があります。

Publishing方式を変えるときは、古い`CNAME` fileだけを見てDomain設定済みと判断しません。Repository Settings / Current Pages stateを確認します。

### HTTPS

- HTTPSが利用可能なPages SiteではEnforce HTTPSを優先する。
- DNS変更直後はcertificate provisioningが即時でない場合があるため、設定直後の一時状態と恒久Failureを区別する。
- HTTP Asset / mixed contentを残さない。
- DNS / Certificate / Custom Domain変更後は実Domainで主要Page / Assetを確認する。

Domain / DNS変更が大きなPublic URL変更になる場合、旧URL、Documentation、canonical / social metadata、External callback、Bookmark等の影響を必要範囲で確認します。

## Pages Hosting Limitation

GitHub PagesはStatic Hostingです。Providerが現在提供していないserver behaviorを、Common Guide側で存在する前提にしません。

Projectが次のようなHosting-dependent behaviorを必要とする場合は、Current GitHub Pages capabilityを再確認します。

- arbitrary server-side rewrite / redirect behavior
- response header control
- private server credential / runtime execution
- runtime-generated response
- server-managed session / private filesystem

Workaroundを導入する場合は、Security / URL semantics / Accessibility / SEO / Maintenanceへの副作用を確認します。Primary Contractを満たせない場合はPagesに固執せずHosting再選定を検討します。

## Product / Usage Suitability

GitHub Pagesで技術的に配信できることと、ProviderのCurrent Terms / intended useに適合することを分けます。

Current GitHub guidanceではPagesはStatic HostingとしてProject / personal / organizational page等を主用途とし、無料Hostingとしてのonline business / e-commerce / commercial SaaSや、Password / Credit Card等を送るSensitive Transaction用途には適さない境界があります。

そのため次に該当する場合は、公開前にCurrent GitHub Pages limits / termsを再確認し、必要ならHostingを再選定します。

- Productの主要価値がCommercial SaaS / transaction processingへ変わった
- Sensitive credential / payment情報をPages上で扱う設計になった
- Current Provider limit / policyがPrimary Taskや運用へMaterialに影響する
- Required server behaviorをClient-side workaroundで無理に再現している

Current numerical limitsやProvider termsをCommon Guideへ固定値として複製しません。変化し得る値が判断を左右する場合は [20 Evidence-first Research](20-evidence-first-research.md) で公式情報を再確認します。

## file://との違い

`fetch()`やES Modules等を使う場合、`file://`直開きでは正常動作しないことがあります。

正式利用方法がGitHub Pagesなら、READMEに公開URLまたは利用方法を明記します。

## Secrets / Public Artifact

GitHub Pagesへ公開されるHTML / JS / JSON / source map等に秘密情報を置きません。

フロントエンドに書いたAPI KeyはUserから見える前提で扱います。

以下を公開Fileへ入れません。

- APIキー
- Password
- Access Token
- Private Key
- privileged credential
- 不要な個人情報

Build-time environment variableを使っても、最終Bundleへ埋め込まれればSecretではありません。必要な場合はGitHub Secrets、Backend / Serverless、Local設定等をProject要件に合わせて検討します。

## Cache / Service Worker / Update Recovery

この章は**GitHub Pages固有のCache / Service Worker更新と公開Revision確認**を扱います。Initial Transfer、Cold / Repeat Load、Soft Budget、Resource Timing等は [05 Performance / Reliability](05-performance-reliability.md) を正本とします。

更新したのに古いJS / CSSが表示される場合、いきなり再Deployを繰り返す前に次を分けます。

```text
Source Revision
↓
Build Artifact
↓
Pages Deployment
↓
CDN / Browser Cache
↓
Service Worker Cache（採用時）
↓
Runtime
```

確認候補:

- Public Siteが本当に最新Deploymentを指しているか
- browser cache / hard reloadで差があるか
- Service Workerが旧Assetをserveしていないか
- Version / cache key / asset filenameがCurrent buildと整合するか
- SW update / activate / old cache cleanupが意図どおりか

Query String Versionやhashed assetを使う場合、Version Authorityを複数箇所へ独立hardcodeしません。

Service WorkerはPagesだからという理由だけで導入せず、Offline / PWA等のProduct要件がある場合に検討します。

### Broken Deploy / Recovery

- Build / deploy自体が失敗しprevious productionが残っている状態と、deploy成功後のproduction regressionを分ける。
- Broken Productionでは必要に応じてknown-good revisionを再deployする、forward-fixする、またはService Worker / cache recoveryを行う。
- Data / External Stateを伴う場合はcode rollbackだけで戻ると仮定せず [09](09-maintenance.md) を使う。
- same-version artifactを無言で差し替えるのではなく、Current Source / Artifactとの対応を追跡できるようにする。

## Pages Artifact Scope

WebとElectron等が同居するRepositoryでは、Pages ArtifactをWeb公開対象だけへ限定します。

例:

```text
index.html
pages/
css/
js/
data/
assets/
```

Source map、Test fixture、private draft、Desktop-only file等を公開Artifactへ含める必要がない場合は除外します。

## 公開URL / Repository導線

この章はGitHub Pages上の**実公開確認・Path・Pages固有Contract**を担当します。

README上部やRepository About `Website`等の、Hosting方式を問わないRepository discoverability /公開Siteへの導線は [10 Project Management](10-project-management.md) を正本とします。

公開URLを確認できていない場合に推測で「公開済み」とせず、実際のPages URLと最終Commitの対応を確認します。

## 公開確認

CI / Pages job成功だけで完成扱いにせず、可能なら公開URLで主要導線を確認します。

確認候補:

- Home / Primary Task
- Direct Link / Refresh
- CSS / JS / JSON / Media
- 404 recovery
- Custom Domain / HTTPS（該当時）
- Service Worker / cache update（該当時）

確認できない場合は「GitHub Pages実公開は未確認」と明記します。

確認した公開URLは、Userへ渡す最終Commit / Merge Commitと対応していることを確認します。
