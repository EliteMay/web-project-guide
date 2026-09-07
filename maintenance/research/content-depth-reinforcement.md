# Content Depth Reinforcement Candidates

Status: **current non-normative reinforcement backlog**

このFileは、`web-project-guide`のうち**壊れている / 修正が必要という意味ではないが、他Ownerと比べて内容が薄く、今後の要件定義・Researchで厚くする価値がある領域**を残すためのProject Research Assetです。

Common Rule本文ではありません。現在の正本は各`docs/*` Ownerです。次回のGuide要件定義 / 補強時にはCurrent Revisionを再確認し、この一覧をそのまま正解として扱いません。

2026-09-07の「現在を40点と仮定して不足を探す」Content Depth Auditを完了し、Current Guide 1.21.0のOwner構成を基準に候補を再分類しました。40点は不足を見つけるためのAudit stanceであり、Completion scoreではありません。

## DefectとContent Depth Gapを分ける

```text
Defect / contradiction / broken routing
→ 今直すべきFinding

Content depth gap
→ 現在利用できるが、判断基準・例外・Validation等を将来もっと厚くできる領域
```

「まだ修正が必要か」だけを答えると、Guideの**内容が薄い場所を育てる視点**が抜けます。

また、Fileが短いこと自体をContent Depth Gapとは扱いません。Router / Checklist / Minimum Gate等、短いことが責務に合うSurfaceもあります。

詳細なpoint-in-time判定は [`../audits/2026-09-07-40-point-content-depth-audit.md`](../audits/2026-09-07-40-point-content-depth-audit.md) を参照します。

## Recently reinforced — re-audit before reopening

### 1. Requirements Decision System — `docs/01-requirements.md`

Status: **reinforced in Phase 1 / guide 1.21.0**

Phase 1で次のGapをCurrent OwnerへPromotion済みです。

- Problem → Outcome → Solutionの分離
- Now / Later / RejectによるScope判断
- Core Outcome基準のMVP boundary
- Prototype / Cheap Testを先に行うTrigger
- Clarification / Extension / Replacement / Removal / Breaking Changeの分類とImpact
- Observable Completionへのproportionate traceability

Agent Autonomy / Requirements Persistence / Evidence-first Researchは既存Ownerを再利用し、第二Copyを作っていません。今後この領域を再要件化する場合は、実利用で新しいGapが確認できた場合だけCurrent `docs/01`を再監査します。

### 2. External Integration / API Contract Evolution — `docs/02` / `03` / `05` / `07` / `13` / `15`

Status: **reinforced in Phase 19 / guide 1.21.0**

Phase 19で次を既存専門OwnerへPromotion済みです。

- Request / Response Contract、Integration boundary、Data Authority
- Webhook / Event delivery、Retry、Idempotency、Ordering
- API / SDK / Webhook Versioning、Backward Compatibility、Deprecation
- Reconciliation / Polling / Eventual Consistency / External State Drift
- Mock / Contract / Sandbox / Production-safe validation boundary
- Operational diagnostics / Integration-specific Completion

Security boundaryは`docs/06`を維持し、新Owner / 新Gate / 新Profile / 新Risk Signalは追加していません。今後はProvider固有要件や実運用Evidenceで不足が判明した場合のみ再監査します。

### 3. Public Content / Discoverability — `docs/22` / `07` / `01` / `08`

Status: **current coverage is sufficient / remove from active reinforcement backlog**

40-point再監査では、以前の候補よりCurrent GuideのCoverageが進んでいることを確認しました。

現在は主に`docs/22-task-first-structure-flow-research.md`と`docs/07-testing-quality.md`で次を扱っています。

- IA maintenance / findability / orphan prevention
- Taxonomy / duplicate / overlap
- Content lifecycle / stale / supersede / archive / freshness
- Search scope / match / ranking / filter / no-result recovery
- Canonical / robots / noindex
- Sitemap / Structured Data
- Social metadata
- JavaScript-heavy route / direct-open
- URL migration
- Public discoverability verification

SEO専用の巨大Ownerを追加する根拠は現在ありません。実Projectで新しいFailure / Requirementが出た場合だけ再度Gapとして開きます。

### 4. General Web Deployment / Runtime Environments — `docs/10` / `09` / `07`

Status: **reinforced after the 40-point audit / re-audit before reopening**

Current main `7c2eb0bef500b9de6cd773f0438b1ca591c07a89`を基準に再監査し、新しいDeployment Ownerを作らず既存OwnerへPromotionしました。

主な補強:

- Static / Managed App / Serverless / Edge / Backendを必要Runtime capabilityから選ぶDecision
- Local / Preview / Staging / Productionの役割とOver-environment防止
- Environment-specific configuration AuthorityとSecret / Public境界
- URL / Origin / OAuth redirect / CORS / Webhook callback整合
- Preview / temporary environment lifecycle / cleanup
- Background / scheduled runtime deployment boundary
- Hosting migration trigger
- Deployed revision / runtime smoke / health / startup verification
- Code / Schema / Config deploy時のold-new compatibility
- Deploy failureとBroken Productionの区別

Normative ownership:

- Deployment shape / Environment orchestration → `docs/10`
- Release / Rollback / Recovery → `docs/09`
- Deployment / Environment Verification → `docs/07`
- Reliability / Security / Diagnosticsは既存`05 / 06 / 15`を再利用

Machine Routerでは`DEPLOYMENT`を一般Web Deploymentへ修正し、GitHub Pages固有の`docs/08`は`GITHUB_PAGES` DomainからConditionalに到達させます。新Owner / 新Domain / 新Risk Signal / 新Stable Gateは追加していません。

External evidenceは [`../../references/web-deployment-runtime-research.md`](../../references/web-deployment-runtime-research.md) に保存します。

### 5. Learning / Explanation Product Decision Depth — `docs/01` / `07` / `12` / `22`

Status: **reinforced after the 40-point audit / re-audit before reopening**

「教材が存在する」から「学習Objectiveを達成できる」へCompletionの深度を上げ、既存OwnerへPromotionしました。

主な補強:

- Learning Objective / Observable Learning Outcome
- Concept dependency / Prerequisite path
- Learner差が大きい場合だけDiagnostic / Placementを検討
- Explanation / worked example / comparison / misconception / guided practice / independent practiceの使い分け
- Long-term retentionがOutcomeに含まれる場合のRetrieval / Review / Spacing
- Completion / Understanding / Application / Masteryの分離
- AssessmentとLearning ObjectiveのAlignment
- Feedback → Retry / Review / Next Step
- Freshness / version applicability / superseded lesson
- Beginner learning pathとQuick Referenceの境界

Normative ownership:

- Learning Requirement / Outcome / Activity Contract → `docs/01`
- Learning Profile applicability → `docs/12`
- Structure / Learning Flow → `docs/22`を既存のまま再利用
- Assessment / Learning Verification → `docs/07`

`LEARNING_CONTENT` DomainをこのOwner集合へRoutingし、Golden Caseを追加しました。新Learning Owner / 新Profile / 新Stable Gateは追加していません。

External evidenceは [`../../references/learning-product-decision-research.md`](../../references/learning-product-decision-research.md) に保存します。

## Active reinforcement candidates

以下は**今すぐRule追加を確定する項目ではありません**。Current Guideでは利用可能ですが、他の成熟Ownerと比べてDecision Framework / Failure Boundary / Validationが相対的に薄いため、次回要件定義・Researchで優先して再監査します。

### 6. GitHub Pages / Static Delivery Decision Depth — `docs/08-github-pages.md`

Priority: **Medium**

Relative Path / Public URL / Cache / Service Worker / 404等の基本はありますが、Deployment Ownerとしては他の主要OwnerよりDecision depthが軽めです。

再監査候補:

- Custom Domain / DNS / HTTPSのCurrent operational boundary
- SPA / Client-side RoutingとDirect Link / 404 fallback
- Branch deploy / GitHub Actions deployの選定Criteria
- Build ArtifactとSource Commit / deployed revisionの対応
- Pages configuration / response headers等のHosting limitation
- Pagesで要件を満たせなくなった場合の他Hostingへの移行Trigger
- Broken deploy / stale cache / Service Worker failureからのRecovery
- Preview / pull-request確認が必要な変更の扱い

Pages固有でないRelease / Rollback / Security Ruleは`docs/09` / `06`へ重複させません。

### 7. Browser / Web Platform Compatibility Decision Depth

Priority: **Medium**

Related owners: `docs/01` / `02` / `05` / `07` / `13`

Current GuideにはBrowser / Runtime / DeviceをNon-functional Requirementとして扱う入口や、Browser Validation stateはあります。しかし、**どこまでのWeb Platform互換性をProduct Contractにするか**を決めるFrameworkは相対的に薄いです。

再監査候補:

- Supported Browser / Runtime baselineをAudience / Usage / Deploymentから決めるCriteria
- Feature DetectionとUA sniffingの境界
- Progressive Enhancement / graceful unsupported-feature behavior
- Polyfill / transpilation / compatibility dependencyを導入するCriteria
- 新しいWeb APIを採用するときのfallback / unsupported message
- Desktop / Mobile / Browser engine差のRepresentative Matrix
- Real browser / real deviceが必要な条件
- 古いBrowser supportを終了するTrigger / migration communication
- Current Web Platform supportをどのEvidenceで再確認するか

Current Web Platform / Baseline / browser supportは変化するため、Promotion前に`docs/20`でCurrent external evidenceを確認します。

### 8. Project Profile Decision Depth — `docs/12-project-profiles.md`

Priority: **Medium-Low**

現状は各Profileの特徴と確認項目が中心で、他の成熟OwnerほどDecision Frameworkは厚くありません。ただしProfileはRoutingの補助情報なので、短いこと自体は問題ではありません。

再監査候補:

- Profileを選ぶ / 選ばないCriteria
- 複数Profile併用時の責務衝突の扱い
- ProfileからRuleをover-routeしない具体的境界
- Projectの成長でProfileが変わるTrigger
- Profile記録とCurrent Runtimeが食い違った場合の扱い
- Profileを削除 / 変更したときにCurrent Requirements / Routingへ何が影響するか

`docs/21`がMachine / Behavioral Routingの正本であるため、Profileを第二Routerへ成長させないことを優先します。

## Intentionally concise — 薄いと誤判定しない

次は短いこと自体が問題ではありません。

- `README.md` — Guide entry / Owner map
- `START_HERE.md` — Human Router
- `maintenance/rule-router.json` — Machine route
- `templates/QUALITY_CHECKLIST.md` — 実行時の短いPass / Fail check
- `docs/17-visual-quality-baseline.md` — Minimum Completion Gate

これらを「文字量が少ない」という理由だけで厚くしません。詳細判断はNormative Ownerへ置きます。

## Current strong areas — backlog化しない

40-point Auditと今回のreinforcementでCurrent Revisionを再確認し、現時点では独立したContent Depth Backlogを作らない領域:

- Governance / Rule Budget / Single Owner — `docs/00`
- Requirements base + Phase 1 + Learning Requirement Decision — `docs/01`
- Architecture base + External Integration boundary — `docs/02`
- Data / Storage / Migration / Sync / Reconciliation — `docs/03`
- UI / UX / Accessibility — `docs/04`
- Performance / Reliability + External delivery — `docs/05`
- Security / Privacy — `docs/06`
- Testing / Verification + External Integration + Deployment + Learning Verification — `docs/07`
- Version / Maintenance / Rollback / Product outcome follow-up — `docs/09`
- GitHub-centered Project Management + General Web Deployment → `docs/10`
- Electron / Distribution / Update / Electron Security — `docs/11`
- Dependencies / Assets / Supply Chain / External contract lifecycle — `docs/13`
- Continuous Improvement / Deep Audit — `docs/14`
- Observability / Project Learnings / External diagnostics — `docs/15`
- Cross-Repository GitHub Infrastructure — `docs/16`
- Visual minimum quality — `docs/17`（意図的に簡潔）
- Domain-first Visual Research — `docs/18`
- Game Development — `docs/19`
- Evidence-first Research — `docs/20`
- Rule Routing / Preflight — `docs/21`
- Task-first Structure / Flow / Search / Discoverability — `docs/22`
- Conversation Handoff / Recovery — `docs/23`

`strong`は将来Gapが出ないという意味ではありません。Current evidenceで、他領域より優先して補強すべき薄さが確認できなかったという意味です。

## Next requirements / reinforcement session

次回このGuideの要件定義・補強を行う場合:

1. Current `README.md` / `START_HERE.md` / Required Ownerを読む
2. このFileを**Content Depth候補**として読む
3. Current Ownerで既に解消済みの項目を除外する
4. `Defect`と`Content Depth Gap`を別Registerで扱う
5. Active candidateをPriority順に再監査する
6. 1回の要件定義で全部を増やさず、優先領域を絞る
7. External Evidenceが必要なら`docs/20`でResearchする
8. Promotion時は既存Ownerへの統合を優先し、新Owner / Gate / Profileを増やす前にRule Budgetを確認する
9. 実装後はこのFileのStatusを更新し、第二Normative Ownerにしない

## Current checkpoint

- Audit date: 2026-09-07
- Guide version: `1.21.0`
- 40-point audit merged-main baseline: `7c2eb0bef500b9de6cd773f0438b1ca591c07a89`
- Current reinforcement branch: `guide/reinforce-deployment-learning`
- Owner count: 24 (`docs/00`〜`docs/23`)
- Phase 1: reinforced / no longer active backlog
- Phase 19: reinforced / no longer active backlog
- Public Content / Discoverability: current coverage sufficient / removed from active backlog
- General Web Deployment: reinforced / no longer active backlog after this branch merges
- Learning / Explanation: reinforced / no longer active backlog after this branch merges
- Active depth backlog after this branch: GitHub Pages / Static Delivery, Browser Compatibility, Project Profiles
- Detailed audit: `maintenance/audits/2026-09-07-40-point-content-depth-audit.md`
