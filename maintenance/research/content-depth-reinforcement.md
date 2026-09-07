# Content Depth Reinforcement Candidates

Status: **current non-normative reinforcement backlog**

このFileは、`web-project-guide`のうち**壊れている / 修正が必要という意味ではないが、他Ownerと比べて内容が薄く、今後の要件定義・Researchで厚くする価値がある領域**を残すためのProject Research Assetです。

Common Rule本文ではありません。現在の正本は各`docs/*` Ownerです。次回のGuide要件定義 / 補強時にはCurrent Revisionを再確認し、この一覧をそのまま正解として扱いません。

## なぜこの一覧を分けるか

Auditで次の2つを混同しないためです。

```text
Defect / contradiction / broken routing
→ 今直すべきFinding

Content depth gap
→ 現在利用できるが、判断基準・例外・Validation等を将来もっと厚くできる領域
```

「まだ修正が必要か」だけを答えると、Guideの**内容が薄い場所を育てる視点**が抜けます。

また、Fileが短いこと自体をContent Depth Gapとは扱いません。Router / Checklist / Minimum Gate等、短いことが責務に合うSurfaceもあります。

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

### 2. External Integration / API Contract Evolution — `docs/02` / `03` / `05` / `07` / `13`

Status: **reinforced in Phase 19 / guide 1.21.0**

Phase 19で次を既存専門OwnerへPromotion済みです。

- Request / Response Contract、Integration boundary、Data Authority
- Webhook / Event delivery、Retry、Idempotency、Ordering
- API / SDK / Webhook Versioning、Backward Compatibility、Deprecation
- Reconciliation / Polling / Eventual Consistency / External State Drift
- Mock / Contract / Sandbox / Production-safe validation boundary
- Operational diagnostics / Integration-specific Completion

Security boundaryは`docs/06`を維持し、新Owner / 新Gate / 新Profile / 新Risk Signalは追加していません。今後はProvider固有要件や実運用Evidenceで不足が判明した場合のみ再監査します。

## Future reinforcement candidates

以下は**今すぐRule追加を確定する項目ではありません**。次回要件定義でCurrent Ownerを再監査し、本当に内容が薄いままならResearch / Promotion候補にします。

### 3. Project Profile decision depth — `docs/12-project-profiles.md`

Priority: **Medium**

現状は各Profileの特徴と確認項目が中心で、他の成熟OwnerほどDecision Frameworkが厚くありません。

再監査候補:

- Profileを選ぶ / 選ばないCriteria
- 複数Profile併用時の責務衝突の扱い
- ProfileからRuleをover-routeしない具体的境界
- Projectの成長でProfileが変わるTrigger
- Profile記録とCurrent Runtimeが食い違った場合の扱い

ただしProfileはRoutingの補助情報なので、詳細を増やしすぎて第二Routerにしないことを優先します。

### 4. GitHub Pages / Static deployment depth — `docs/08-github-pages.md`

Priority: **Medium**

Relative Path / Public URL / Cache / Service Worker等の基本はありますが、Deployment Ownerとしては他の主要Ownerより説明深度が軽めです。

再監査候補:

- Custom Domain / DNS / HTTPSのCurrent operational boundary
- SPA / Client-side RoutingとDirect Link / 404 fallback
- Build ArtifactとSource Commitの対応
- Pages configuration / headers等のHosting limitation
- Broken deploy / stale cache / Service Worker failureからのRecovery
- Branch / Actions deploy方式の選定Criteria

Pages固有でないRelease / Rollback / Security Ruleは`docs/09` / `06`へ重複させません。

### 5. Learning / Explanation product depth — `docs/01` / `12` / `22` / `07`

Priority: **Medium, re-audit first**

Learning Site向けにStarting Knowledge、説明深度、Learning Flow等は既にありますが、Data / Security / Game等と比べるとLearning-specificなDecision Systemはまだ分散気味です。

再監査候補:

- Curriculum / concept dependencyの組み立て
- Explanation depthの決め方
- Example / comparison / misconception / practiceの使い分け
- Recall / Review / Spacing / ProgressのProduct Contract
- 「読んだ」と「理解した」を分けるEvaluation
- Content freshness / outdated lessonの扱い

必要性が確認できるまでは新しいLearning Ownerを作らず、既存Ownerへ自然に統合できるかを先に確認します。

### 6. Public content / discoverability depth — `docs/01` / `07` / `12` / `08` / `10`

Priority: **Medium-Low, re-audit first**

Metadata / Sitemap / Canonical / Repository discoverability等は存在しますが、Public Contentを継続運用するContent LifecycleのDecisionは複数Ownerに分散しています。

再監査候補:

- Search intent / page purposeとContent scope
- Internal linking / orphan prevention
- Canonical / duplicate content strategy
- Structured Dataを使う / 使わないCriteria
- Stale content / deprecation / redirect
- Social sharing metadataと実Content整合
- Public contentのFreshness / review cadence

SEO専用の巨大Checklistを作るのではなく、Primary Task / Public Discoverabilityへ本当に影響する範囲だけ補強します。

## Intentionally concise — 薄いと誤判定しない

次は短いこと自体が問題ではありません。

- `README.md` — Guide entry / Owner map
- `START_HERE.md` — Human Router
- `maintenance/rule-router.json` — Machine route
- `templates/QUALITY_CHECKLIST.md` — 実行時の短いPass / Fail check
- `docs/17-visual-quality-baseline.md` — Minimum Completion Gate

これらを「文字量が少ない」という理由だけで厚くしません。詳細判断はNormative Ownerへ置きます。

## Next requirements / reinforcement session

次回このGuideの要件定義・補強を行う場合:

1. Current `README.md` / `START_HERE.md` / Required Ownerを読む
2. このFileを**Content Depth候補**として読む
3. Current Ownerで既に解消済みの項目を除外する
4. `Defect`と`Content Depth Gap`を別Registerで扱う
5. 1回の要件定義で全部を増やさず、優先領域を絞る
6. External Evidenceが必要なら`docs/20`でResearchする
7. Promotion時は既存Ownerへの統合を優先し、新Owner / Gate / Profileを増やす前にRule Budgetを確認する
8. 実装後はこのFileのStatusを更新し、第二Normative Ownerにしない

## Current checkpoint

- Date: 2026-09-07
- Baseline main at reinforcement start: `20e82219d168c75105edec5731397c330473e309`
- Phase 1: reinforced in PR #59 / no longer a current backlog item
- Phase 19: reinforced in PR #59 / no longer a current backlog item
- Current backlog starts from items 3–6 and requires re-audit before promotion
- Existing solved items must not be recreated only because they remain in this historical checkpoint
