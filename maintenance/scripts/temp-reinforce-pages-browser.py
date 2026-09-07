from pathlib import Path
import json


def read(path):
    return Path(path).read_text(encoding="utf-8")


def write(path, text):
    Path(path).write_text(text, encoding="utf-8")


def replace_once(path, old, new):
    text = read(path)
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected one anchor, found {count}: {old[:80]!r}")
    write(path, text.replace(old, new, 1))


pages_ref = '''# GitHub Pages Static Delivery Research

Status: **current non-normative evidence**

Checked: **2026-09-07**

Purpose: Support the current `docs/08-github-pages.md` decision framework without turning provider-specific details into a second normative owner.

## Current official evidence reviewed

### Publishing source

GitHub currently supports publishing a Pages site from a branch or with a custom GitHub Actions workflow. GitHub's documentation recommends branch publishing when no special build-process control is needed; custom Actions is appropriate when a custom build / artifact pipeline is required.

Source:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

### Actions artifact / entry point

For custom Actions publishing, the deployed artifact must contain the public site output and its entry file at the artifact root. Build success and deploy success are not substitutes for checking the resulting public site.

Source:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites

### Custom domain / takeover protection

GitHub recommends verifying a custom domain before attaching it to a Pages site. Verification restricts use of the verified domain / immediate subdomains to repositories owned by that account or organization and reduces domain-takeover risk. GitHub also warns against wildcard DNS records for Pages because they can create takeover risk.

Source:
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages

### Branch vs Actions custom-domain behavior

For branch publishing, a configured custom domain is represented by a `CNAME` file in the publishing source. For custom GitHub Actions publishing, a repository `CNAME` file is not the authority for custom-domain configuration; the Pages configuration remains the authority.

Source:
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

### HTTPS / DNS

HTTPS certificate availability depends on correct DNS configuration. Mixed HTTP assets can still undermine the HTTPS result even when the site itself is served over HTTPS.

Source:
- https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

### 404 behavior

GitHub Pages supports custom `404.html` / `404.md` pages. A missing / mis-cased `index.html`, incorrect artifact root, DNS issue, custom-domain issue, or path problem can also produce 404 behavior and should not be confused with a normal missing-route case.

Source:
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites

### Hosting suitability / limits

GitHub describes Pages as a static hosting service primarily intended for project / personal / organizational pages and explicitly states that it is not intended as free hosting for an online business, e-commerce site, or commercial SaaS, nor for sensitive transactions such as sending passwords or credit-card numbers. Current numerical usage limits and terms can change and should be rechecked before relying on them as a Product Contract.

Source:
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features

## Promotion decision

Promote only durable decision boundaries into `docs/08`:

- Branch vs Actions based on actual build / artifact needs
- Source Commit → Artifact → Deployment → Public URL traceability
- Project-site subpath / direct-open / 404 semantics
- Custom-domain verification / DNS / HTTPS operational boundary
- Pages hosting limitations and hosting-migration trigger
- cache / Service Worker recovery

Do not freeze current plan limits, DNS IP values, or other provider values that can change into Common Rules. Re-check current official GitHub documentation when those values become material.
'''
write("references/github-pages-static-delivery-research.md", pages_ref)

browser_ref = '''# Web Platform Compatibility Research

Status: **current non-normative evidence**

Checked: **2026-09-07**

Purpose: Support browser / Web Platform compatibility decisions in the existing Requirements, Testing, and Dependency owners.

## Current external evidence reviewed

### MDN Baseline

MDN Baseline summarizes Web Platform feature availability across a defined set of popular browsers. Current Baseline coverage includes Safari on iOS/macOS, Chrome on Android/desktop, Edge desktop, and Firefox on Android/desktop. Baseline explicitly does not replace testing and does not necessarily cover older browser versions, OS WebViews, assistive technology, or every user environment.

Source:
- https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility

### Feature detection

MDN recommends checking for the capability actually needed and providing an appropriate fallback rather than assuming a browser name implies feature support. CSS provides `@supports` / `CSS.supports()`, while JavaScript APIs can often be detected through the relevant object / method boundary.

Source:
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Feature_detection

### UA sniffing

MDN warns that User-Agent parsing is difficult to do reliably and commonly creates bugs. Browser identity is usually not the real requirement; feature detection is normally the safer boundary. UA-dependent behavior can still be justified in rare cases where an actual browser-specific behavior cannot be detected another way, but it should be narrow and documented.

Source:
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Browser_detection_using_the_user_agent

## Promotion decision

Promote durable principles only:

- Supported Browser / Runtime is a Product Contract derived from audience, usage, deployment, and risk—not an arbitrary universal browser list.
- Baseline / compatibility tables are planning evidence, not proof of runtime correctness for the Project's users.
- Prefer Feature Detection and progressive fallback over browser-name branching.
- New Web APIs need a defined unsupported / degraded behavior when the support contract requires it.
- Polyfill / transpilation decisions belong to the Dependency owner and should be justified by the actual support contract.
- Representative real-browser / real-device testing is selected by risk and target environment.
- Support retirement is an explicit Requirement / Maintenance decision when it can materially affect users.

Do not freeze a universal browser-version matrix into the Common Guide. Re-check current Web Platform evidence when adopting new APIs or changing support targets.
'''
write("references/web-platform-compatibility-research.md", browser_ref)

pages_insert = '''## Product / Usage Suitability

GitHub Pagesで技術的に配信できることと、ProviderのCurrent Terms / intended useに適合することを分けます。

Current GitHub guidanceではPagesはStatic HostingとしてProject / personal / organizational page等を主用途とし、無料Hostingとしてのonline business / e-commerce / commercial SaaSや、Password / Credit Card等を送るSensitive Transaction用途には適さない境界があります。

そのため次に該当する場合は、公開前にCurrent GitHub Pages limits / termsを再確認し、必要ならHostingを再選定します。

- Productの主要価値がCommercial SaaS / transaction processingへ変わった
- Sensitive credential / payment情報をPages上で扱う設計になった
- Current Provider limit / policyがPrimary Taskや運用へMaterialに影響する
- Required server behaviorをClient-side workaroundで無理に再現している

Current numerical limitsやProvider termsをCommon Guideへ固定値として複製しません。変化し得る値が判断を左右する場合は [20 Evidence-first Research](20-evidence-first-research.md) で公式情報を再確認します。

'''
if "## Product / Usage Suitability" not in read("docs/08-github-pages.md"):
    replace_once("docs/08-github-pages.md", "## file://との違い\n", pages_insert + "## file://との違い\n")

browser_req = '''## Browser / Web Platform Support Contract

CONDITIONAL: Browser上のPrimary Taskや新しいWeb API / CSS / JavaScript featureがProduct behaviorへ影響する場合、`Chromeで動いた`や`Baseline対応`だけでSupport Contractを決めません。Current compatibility research evidenceは [Web Platform Compatibility Research](../references/web-platform-compatibility-research.md) に保存します。

### Support TargetをAudienceから決める

Supported Browser / Runtime / Deviceは必要に応じて次から決めます。

- Target User / actual usage environment
- Public Site / internal Tool / managed device等の利用Context
- Desktop / Mobile / WebView / installed PWA等のRuntime
- Primary Taskで必要なWeb Platform capability
- Accessibility / input / media / permission要件
- Security update可能性 / provider constraint
- Compatibility implementation / testing / maintenance cost

`主要Browserの最新2Version`等をUniversal Ruleにしません。Audienceが限定されたinternal Toolと一般公開Siteでは合理的なSupport Matrixが異なります。

必要なら次を分けます。

```text
Supported
= Primary TaskをContractどおり完了できる

Enhanced
= 追加Featureは使えるがCore Taskは必須でない

Unsupported / Degraded
= 明示Fallback / limitation / upgrade guidanceが必要
```

### Baseline / Compatibility Dataの役割

MDN BaselineやBrowser Compatibility Dataは**採用候補を判断するEvidence**として使えますが、ProjectのSupport Contractそのものではありません。Baseline対象外の古いBrowser、OS WebView、Assistive Technology、Provider固有Runtime等は別確認が必要な場合があります。

Current support状況でDecisionが変わる場合は [20 Evidence-first Research](20-evidence-first-research.md) でCurrent Evidenceを確認します。

### Feature Detection / Progressive Behavior

Browser名を見て挙動を分ける前に、必要なCapabilityを検出できるか確認します。

- CSS feature → `@supports` / `CSS.supports()`等
- JavaScript API → relevant object / method / capabilityの存在確認
- Permission / media / device capability → 実際のAPI result / state確認

UA sniffing / Browser-name branchingは、実際のBrowser-specific behaviorをFeature Detection等で安全に判定できない場合だけ狭く使います。

Progressive Enhancementを使う場合、Unsupported FeatureでCore Taskまで壊さず、必要に応じてBasic fallback、read-only、manual alternative、clear unsupported message等へdegradeします。

### New Web API Adoption

Primary Taskへ新しいWeb API / syntax / CSS featureを採用する場合は必要範囲で次を決めます。

- Required capability
- Current support evidence
- Support TargetとのGap
- Feature Detection可否
- Fallback / unsupported behavior
- Polyfill / transpilationの必要性
- Real browser / real device確認の必要性

Polyfill / transpilation / compatibility dependencyは [13 Dependencies / Assets](13-dependencies-assets.md) を正本とします。

### Support終了

古いBrowser / Runtime supportを終了する場合、単にTestを削除して完了としません。MaterialなUser impactがある場合は、actual usage、Security / provider constraint、maintenance cost、alternative availabilityを確認し、Requirements / Help / Release information等を必要範囲で更新します。

少数Userがいるという理由だけで永久Supportを固定せず、Support終了がPrimary Taskを突然壊す場合はsilent breaking changeにしません。

'''
if "## Browser / Web Platform Support Contract" not in read("docs/01-requirements.md"):
    replace_once("docs/01-requirements.md", "## Completion Conditionの書き方\n", browser_req + "## Completion Conditionの書き方\n")

old_browser_test = '''## 対応ブラウザ

最低でも主要用途に合わせてFirefox / Chromiumを意識します。

新しいWeb API / CSSはMDN Baseline等で対応状況を確認し、ブラウザ名判定よりFeature Detectionを優先します。
'''
new_browser_test = '''## Browser / Web Platform Compatibility Verification

Browser対応は[01 Browser / Web Platform Support Contract](01-requirements.md#browser--web-platform-support-contract)に対して確認します。全Browser × 全OS × 全Deviceを機械的にTestせず、Target User / Runtime / Feature RiskからRepresentative Matrixを選びます。

### Planning EvidenceとRuntime Evidenceを分ける

MDN Baseline / compatibility table等はFeature採用前のEvidenceとして有用ですが、`Supportedと記載されている = ProjectのPrimary Taskが検証済み`とは扱いません。

特に次はCompatibility Dataだけで完了しにくいです。

- WebView / embedded browser
- Mobile input / software keyboard
- Media codec / autoplay / capture
- Permission / clipboard / file / device API
- PWA / Service Worker / install behavior
- Touch / pointer / drag
- Browser extension / privacy setting影響
- Assistive Technologyとの組み合わせ

### Representative Matrix

必要に応じて次から差が出る軸を選びます。

- Browser engine / major Browser family
- Desktop / Mobile
- OS WebView / embedded Runtime
- Stable current version / actual managed old version
- Touch / Keyboard / Pointer
- Required permission / media / device capability

Audienceが広いPublic Webでは複数Browser engineを確認する価値が高く、Managed internal Toolでは実配布Environmentへ絞る方が正確な場合があります。固定Browser数をCommon Ruleにしません。

### Unsupported PathもTestする

Feature Detection / fallbackを実装した場合、Supported pathだけでなくFeatureが無い状態も必要範囲で確認します。

- Core TaskがBasic fallbackで継続できる
- Unsupported messageが行き止まりにならない
- Missing APIを`undefined is not a function`等のRuntime crashへしない
- Optional enhancement failureでCanonical Dataを壊さない
- UA条件分岐を使う例外では、誤判定時のFailure blast radiusを確認する

### Polyfill / Transpilation Verification

Polyfill / transpilationを採用する場合、Build成功だけで互換性完了としません。Target Runtimeで必要なsyntax / APIが実際に成立すること、Bundle / Performance / Securityへの副作用、不要になったLegacy layerが残っていないことを必要範囲で確認します。Dependency判断は [13](13-dependencies-assets.md#web-platform-compatibility-dependencies) を使います。

### Real Browser / Real Device

Simulator / headless browserで再現できない入力・Media・Permission・WebView・PWA・OS integration等がPrimary Taskへ影響する場合はReal Browser / Real Device確認へ上げます。確認できなければ`Real Device Validated`へ昇格させません。

Browser supportを終了した変更では、除外したTargetがCurrent Requirementsと一致すること、Supported environmentのRegressionがないこと、必要なUser-facing limitation / migration guidanceが更新されていることを確認します。
'''
replace_once("docs/07-testing-quality.md", old_browser_test, new_browser_test)

compat_dep = '''## Web Platform Compatibility Dependencies

CONDITIONAL: Polyfill / transpilation / compatibility helperは「古いBrowserでも何となく動かす」ためではなく、[01 Browser / Web Platform Support Contract](01-requirements.md#browser--web-platform-support-contract)で必要なGapを埋めるDependencyとして扱います。

### 導入Criteria

導入前に必要に応じて次を確認します。

- Support Targetで不足する具体的なAPI / syntax / CSS capability
- Feature Detection + simpler fallbackで十分でないか
- Polyfillで再現できるsemanticか
- Transpilationが必要なsyntax-level incompatibilityか
- Bundle size / startup / maintenance cost
- Dependency provenance / license / security / update状態

対象Userがほぼ存在しないLegacy Runtimeのために巨大compatibility bundleを全Userへ常時配信しません。一方、Current RequirementsでSupport必須なら`modern browserでは動く`を理由に削除しません。

### Feature Detectionとの役割差

Feature DetectionはCapabilityの有無を判断しますが、未対応syntaxを古いEngineがparseできない問題までは解決できません。必要ならtranspilation / build targetを使います。

PolyfillもNative implementationと完全同一とは仮定せず、Permission / performance / security / edge behaviorに差があるFeatureはProject Riskに合わせて検証します。

### Configuration Authority

Browserslist / build target / transpiler target等を使う場合、Current RequirementsのSupport Targetから導かれるImplementation Configとして扱います。Configだけを第二Source of Truthにしません。

Support Target変更時は必要に応じて:

- build target
- polyfill set
- automated browser matrix
- documentation / unsupported message

を同期します。

### Removal / Cleanup

Support終了やNative support拡大で不要になったCompatibility Layerは、Representative Browser test後に削除候補にします。古いPolyfill / conditional branch / transpilation settingを理由なく恒久化せず、Performance / Security / maintenance benefitがある場合にcleanupします。

'''
if "## Web Platform Compatibility Dependencies" not in read("docs/13-dependencies-assets.md"):
    replace_once("docs/13-dependencies-assets.md", "## Update Automation / Dependabot\n", compat_dep + "## Update Automation / Dependabot\n")

browser_route = '''## Browser / Web Platform Compatibility

Supported Browser / new Web API / CSS / JavaScript feature / WebView差を判断する場合:

- Support Target / fallback / support終了 → [01 Requirements](docs/01-requirements.md)
- Representative browser / device verification → [07 Testing / Quality](docs/07-testing-quality.md)
- Polyfill / transpilation / compatibility dependency → [13 Dependencies / Assets](docs/13-dependencies-assets.md)
- Current Baseline / Browser support evidence → [20 Evidence-first Research](docs/20-evidence-first-research.md)

Browser名から先に固定せず、Target User / Runtime / Primary TaskからSupport Contractを決めます。MDN Baseline等はPlanning Evidenceとして使い、実ProjectのRuntime確認を置き換えません。

'''
if "## Browser / Web Platform Compatibility" not in read("START_HERE.md"):
    replace_once("START_HERE.md", "## Electron / Windows配布\n", browser_route + "## Electron / Windows配布\n")

pages_route_old = '''公開URLを確認できる場合は最終状態と対応するURLを確認します。

## Browser / Web Platform Compatibility
'''
pages_route_new = '''Publishing Source、SPA direct-open、Custom Domain / HTTPS、Pages hosting limitation、cache / Service Worker recoveryは`08`を正本とします。公開URLを確認できる場合は最終状態と対応するURLを確認します。

## Browser / Web Platform Compatibility
'''
replace_once("START_HERE.md", pages_route_old, pages_route_new)

checklist = read("templates/QUALITY_CHECKLIST.md")
row_anchor = '| GitHub Pages / 公開Site | Pages / Public URL / Repository discoverability | [08](../docs/08-github-pages.md) / [10](../docs/10-project-management.md) |\n'
browser_row = '| Browser / Web Platform compatibility | Support Target / Feature fallback / Browser verification / Compatibility dependency | [01](../docs/01-requirements.md) / [07](../docs/07-testing-quality.md) / [13](../docs/13-dependencies-assets.md) |\n'
if browser_row not in checklist:
    if row_anchor not in checklist:
        raise SystemExit("QUALITY_CHECKLIST conditional row anchor missing")
    checklist = checklist.replace(row_anchor, row_anchor + browser_row, 1)

old_pages_checks = '''## GitHub Pages / Public Site

- [ ] 相対Path / `fetch()` / File名Caseが公開Subpathでも正常
- [ ] `localhost` / PC固有絶対Pathに依存していない
- [ ] 公開ArtifactへSecretを入れていない
- [ ] 公開URLで主要導線を確認した、または実公開未確認と明記した
- [ ] 確認した公開URLがユーザーへ渡す最終Commitと対応している
- [ ] 代表Site URLがある場合、README上部とRepository About `Website`から到達できる

## Content / IA / Search / Discoverability — 該当時
'''
new_pages_checks = '''## GitHub Pages / Public Site

- [ ] Branch / GitHub ActionsのPublishing SourceがBuild / Artifact要件に合っている
- [ ] Final Source Commit → Build / Artifact → Pages deploy → Public URLの対応を必要範囲で追跡できる
- [ ] 相対Path / `fetch()` / File名CaseがProject Site subpathでも正常
- [ ] SPA /複数RouteではDirect Open / Refresh / 404 recoveryを実公開条件で確認した
- [ ] `localhost` / PC固有絶対Pathに依存していない
- [ ] 公開ArtifactへSecret /不要なprivate fileを入れていない
- [ ] Custom Domain使用時、Pages設定 / DNS / domain verification / HTTPSを必要範囲で確認した
- [ ] Service Worker / cache採用時、旧Revisionが残るFailureとRecoveryを確認した
- [ ] Current Pages limitation / intended useがProduct要件へMaterialに影響する場合、Current公式情報を再確認した
- [ ] 公開URLで主要導線を確認した、または実公開未確認と明記した
- [ ] 確認した公開URLがユーザーへ渡す最終Commitと対応している
- [ ] 代表Site URLがある場合、README上部とRepository About `Website`から到達できる

## Browser / Web Platform Compatibility — 該当時

- [ ] Target User / Runtime / Primary TaskからSupported / Enhanced / Unsupportedの境界を必要範囲で定義した
- [ ] Baseline / compatibility tableだけで実ProjectのBrowser対応を確認済み扱いしていない
- [ ] Browser名分岐よりFeature Detectionを優先し、必要なunsupported / fallback pathを確認した
- [ ] 新Web API / CSS / syntax採用時、Support Targetとの差とfallback / polyfill / transpilation要否を確認した
- [ ] Representative Browser / engine / Desktop-Mobile / WebView等をProject riskに合わせて選んだ
- [ ] Permission / Media / Touch / PWA / WebView等で必要ならReal Browser / Real Deviceを確認した、または未確認と記録した
- [ ] Polyfill / transpilationを使う場合、Target Runtimeで実際に動作し、不要なLegacy layerを残していない
- [ ] Browser support終了時、Current Requirements / test matrix / user-facing limitationを必要範囲で同期した

## Content / IA / Search / Discoverability — 該当時
'''
if old_pages_checks not in checklist:
    raise SystemExit("QUALITY_CHECKLIST Pages section anchor missing")
checklist = checklist.replace(old_pages_checks, new_pages_checks, 1)
write("templates/QUALITY_CHECKLIST.md", checklist)

router_path = Path("maintenance/rule-router.json")
router = json.loads(router_path.read_text(encoding="utf-8"))
existing_ids = {case["id"] for case in router.get("goldenCases", [])}
if "github-pages-static-delivery" not in existing_ids:
    router["goldenCases"].append({
        "id": "github-pages-static-delivery",
        "workType": "DEPLOYMENT",
        "domains": ["GITHUB_PAGES"],
        "signals": [],
        "mustInclude": [
            "docs/08-github-pages.md",
            "docs/10-project-management.md",
            "docs/09-maintenance.md",
            "docs/07-testing-quality.md"
        ]
    })
if "browser-web-platform-compatibility" not in existing_ids:
    router["goldenCases"].append({
        "id": "browser-web-platform-compatibility",
        "workType": "REQUIREMENTS",
        "domains": ["TESTING_QUALITY", "DEPENDENCIES_ASSETS"],
        "signals": ["RESEARCHABLE_QUESTION"],
        "mustInclude": [
            "docs/01-requirements.md",
            "docs/12-project-profiles.md",
            "docs/07-testing-quality.md",
            "docs/13-dependencies-assets.md",
            "docs/20-evidence-first-research.md"
        ]
    })
router_path.write_text(json.dumps(router, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

backlog_path = "maintenance/research/content-depth-reinforcement.md"
backlog = read(backlog_path)
active = backlog.find("## Active reinforcement candidates")
p8 = backlog.find("### 8. Project Profile Decision Depth", active)
if active == -1 or p8 == -1:
    raise SystemExit("backlog active/profile anchors missing")

reinforced_6_7 = '''### 6. GitHub Pages / Static Delivery Decision Depth — `docs/08`

Status: **reinforced after the 40-point audit / re-audit before reopening**

Main reinforcement:

- Pagesを選ぶ /選ばない境界とHosting migration trigger
- Branch vs GitHub Actions Publishing Source decision
- Source Commit → Build Artifact → Deploy → Public URL traceability
- Project Site subpath / SPA direct-open / 404 recovery
- Custom Domain / DNS / verification / HTTPS boundary
- Pages hosting limitation / intended-use recheck trigger
- Service Worker / stale cache / broken deploy recovery
- PR / PreviewとProduction Pages deployの分離

General deployment / rollback / securityは`10 / 09 / 06 / 07`を既存Ownerとして再利用し、Pages固有Decisionだけ`08`へ保持しました。Current external evidenceは [`../../references/github-pages-static-delivery-research.md`](../../references/github-pages-static-delivery-research.md) に保存します。

### 7. Browser / Web Platform Compatibility Decision Depth — `docs/01` / `07` / `13`

Status: **reinforced after the 40-point audit / re-audit before reopening**

Main reinforcement:

- Audience / Usage / RuntimeからSupport Targetを決めるCriteria
- Supported / Enhanced / Unsupported・Degraded boundary
- MDN Baseline / compatibility dataをPlanning Evidenceとして使う境界
- Feature Detection優先、UA sniffing例外化
- Progressive fallback / unsupported behavior
- New Web API adoption contract
- Polyfill / transpilation / build-target dependency criteria
- Representative browser / device matrixとReal-device trigger
- Browser support終了時のRequirement / test / communication同期

新Owner / 新Domain / 新Risk Signal / 新Stable Gateは追加せず、Requirements=`01`、Verification=`07`、Compatibility dependency=`13`、Current external evidence=`20`へ既存責務で分配しました。Evidenceは [`../../references/web-platform-compatibility-research.md`](../../references/web-platform-compatibility-research.md) に保存します。

'''
active_intro = '''## Active reinforcement candidates

以下は**今すぐRule追加を確定する項目ではありません**。Current Guideでは利用可能ですが、他の成熟Ownerと比べてDecision Framework / Failure Boundary / Validationが相対的に薄いため、次回要件定義・Researchで優先して再監査します。

'''
backlog = backlog[:active] + active_intro + backlog[p8:]
insert_at = backlog.find("## Active reinforcement candidates")
backlog = backlog[:insert_at] + reinforced_6_7 + backlog[insert_at:]

backlog = backlog.replace("- Current reinforcement branch: `guide/reinforce-deployment-learning`", "- Current reinforcement branch: `guide/reinforce-pages-browser-compat`")
backlog = backlog.replace("- General Web Deployment: reinforced / no longer active backlog after this branch merges", "- General Web Deployment: reinforced / no longer active backlog")
backlog = backlog.replace("- Learning / Explanation: reinforced / no longer active backlog after this branch merges", "- Learning / Explanation: reinforced / no longer active backlog")
backlog = backlog.replace("- Active depth backlog after this branch: GitHub Pages / Static Delivery, Browser Compatibility, Project Profiles", "- GitHub Pages / Static Delivery: reinforced / no longer active backlog after this branch merges\n- Browser / Web Platform Compatibility: reinforced / no longer active backlog after this branch merges\n- Active depth backlog after this branch: Project Profile Decision Depth")
write(backlog_path, backlog)
