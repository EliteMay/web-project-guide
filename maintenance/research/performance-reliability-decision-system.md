# Performance / Reliability Decision System — Phase 5 Research Contract

Status: current / research pending
Normative status: non-normative research contract

Phase 5では、単なる高速化Technique集ではなく、**何を・どこまでPerformance / Reliabilityとして要求し、どの条件で追加最適化を止めるか**を判断できるDecision Systemを研究します。

Current Common Ruleは [`../../docs/05-performance-reliability.md`](../../docs/05-performance-reliability.md) を正本とします。このFileは研究中のQuestion / Scope / Completion Contractであり、Current Rule本文ではありません。

一般Research Methodは [`../../docs/20-evidence-first-research.md`](../../docs/20-evidence-first-research.md)、Common Rule Promotionは [`../../docs/14-continuous-improvement.md`](../../docs/14-continuous-improvement.md) を正本とします。

## 1. Research Goal

研究の最終目的は、Projectごとに次を説明可能にすることです。

```text
User Task / Criticality / Runtime / Device / Network / Data / External Dependency
↓
どのPerformance / Reliability Riskが実際に重要か
↓
どのLevelまで対策するか
↓
何を測るか
↓
どこで十分と判断して止めるか
```

特に次を避けます。

- Budget数値だけでPerformanceをPass / Failする
- Lighthouse Scoreだけで完成扱いする
- 全Projectへ同じSkeleton / Retry / Offline / Service Workerを入れる
- 数KB削減のために保守性や安定性を大きく壊す
- 高性能PC / 高速回線だけで良好と判断する
- Loading中 / Failure時 / Long-running sessionをHappy Pathの外として放置する

## 2. Core Research Question

**Userが実際に感じる待ち時間・操作不能・失敗・劣化・長時間利用のCostを基準に、どのProjectでどこまでPerformance / Reliability対策を要求すべきか。**

研究では、絶対的な最速化ではなく次のBalanceを扱います。

- Operability
- Clarity / feedback
- Reliability / recovery
- Runtime cost
- Implementation complexity
- Maintainability
- Device / network variability
- Project criticality

## 3. Decision Model to Produce

最終的なCommon Rule候補は、Technique名の羅列ではなく原則として次の形へ落とします。

```text
Trigger
↓
User-facing Risk / Cost
↓
Decision Criteria
↓
Default Action
↓
Escalation条件
↓
Exception / Trade-off
↓
Validation
↓
Stop Condition
```

既存の `Minimum / Standard / Extended` Performance確認強度を維持・改善できるかも検証します。必要なら別名へ変えられますが、複雑なScore Systemを目的にしません。

## 4. Research Axes

### A. Perceived Performance / Interaction Readiness

研究Question:

- Actual load timeとPerceived waitをどのように分けて判断するか。
- First content、usable content、primary action ready、background completionを分離すべきか。
- 速く見せることが、実際の操作不能や誤解を隠すだけになる条件は何か。
- Optimistic UI、stale content、instant shell等はどのCriticalityなら許容されるか。
- Userが待ち時間を予測できることはどの程度重要か。

目標Output:

- 「表示された」と「使える」を分ける判断基準
- Primary Task readinessを中心にしたPerformance判断
- Perceived improvementを実Performance悪化の言い訳にしない境界

### B. Loading UX / Progress Feedback

研究Question:

- 何も表示しない / Spinner / Progress / Existing content維持 / Skeletonをどう使い分けるか。
- 短すぎるLoadingでIndicatorを出すことでFlickerや遅く感じる問題をどう扱うか。
- Determinate progressが可能な処理と、不可能な処理をどう分けるか。
- Loading中にPrimary actionをBlockすべき条件は何か。
- Background refreshをForeground loadingとして見せる必要がある条件は何か。

目標Output:

- Loading state選択のDecision Tree
- Blocking / non-blocking loadingの判断基準
- Long operationでProgress / Cancelを要求する条件

### C. Skeleton / Progressive Rendering

研究Question:

- Skeletonが有効なContent type / duration / layoutは何か。
- Skeletonが誤解・layout mismatch・flickerを増やす条件は何か。
- Progressive rendering / chunk rendering / streaming的表示はどの規模で価値があるか。
- Partial contentを先に見せてもTaskが成立しない場合はどうするか。
- Layout stabilityとprogressive displayをどう両立するか。

目標Output:

- SkeletonをDefaultにしない採用条件
- Progressive renderingのTrigger / Stop Condition
- Placeholder fidelity / layout stabilityの要求範囲

### D. Network Failure / Partial Failure

研究Question:

- Initial load、background fetch、save、sync、media、third-party failureを同じError UXで扱うべきか。
- Offline、timeout、DNS、HTTP error、rate limit、partial response等をUser-facingにどこまで区別するか。
- 一部Dataだけ失敗した場合、画面全体をErrorへ落とすべき条件は何か。
- Last known good data / cached dataを表示してよい条件は何か。
- Failure時にPrimary taskを残すProgressive Degradationをどこまで要求するか。

目標Output:

- Critical / non-critical dependencyのFailure isolation基準
- Full-page error / inline error / stale fallbackの使い分け
- Partial failureを全体Failureに拡大しない判断基準

### E. Retry / Backoff / Duplicate Prevention

研究Question:

- 自動Retryしてよい操作と、User確認が必要な操作をどう区別するか。
- ReadとWrite、idempotent / non-idempotent operationでRetry policyをどう変えるか。
- Retry回数やbackoffを固定Universal値にするべきか。
- Retry storm、重複送信、二重保存、二重購入等のRiskをどう抑えるか。
- Retry UIでUserへ何を伝える必要があるか。

目標Output:

- Auto retry / manual retry / no retryのDecision Matrix
- Backoff / jitter / idempotencyとの境界
- Data / Storage Ownerとの責務分離

### F. Timeout / Cancel / Long Operation

研究Question:

- Timeoutを全Requestへ同じ秒数で設定するべきか。
- User-facing wait timeoutとnetwork transport timeoutを分けるべきか。
- 解析 / export / import / media処理等の長時間TaskでCancelを要求する条件は何か。
- Timeout後もserver側処理が継続する可能性をどう扱うか。
- Late response / stale responseがCurrent UIやDataを上書きしないために何が必要か。

目標Output:

- Timeout / Cancelabilityの判断基準
- Long task state model候補
- Late result / stale request guardの要求範囲

### G. Offline Degradation / Connectivity Change

研究Question:

- Offline対応を「完全Offline対応」の二択にしないためのLevel分けはどうするか。
- Read-only、cached view、local edit queue、feature unavailableをどう使い分けるか。
- Connectivity復帰時に何を自動再開してよいか。
- Offline表示が実際の通信可否と食い違う場合をどう扱うか。
- Offline capabilityにService Workerを必須とすべきか。

目標Output:

- Offline degradation ladder
- Feature単位のoffline capability判断
- Data / Storage Phase 4で確定したOffline write / Syncとの境界整理

### H. Slow Device / Constrained Runtime

研究Question:

- Slow CPU、low-memory mobile、battery / thermal throttling等をどこまで想定すべきか。
- CPU throttling等のLab条件をProject規模ごとにどこまで要求するか。
- Animation / blur / canvas / heavy JS / large DOMをどう評価するか。
- Low-end条件で機能を減らすAdaptive degradationは必要か。
- User device差を理由に無制限対応を要求しないStop Conditionは何か。

目標Output:

- Slow-device validation trigger
- Feature degradation候補の判断基準
- High-end-only optimization / assumptionを許容する条件

### I. Memory Leak / Long-running Session

研究Question:

- 何分・何時間をLong-running sessionとして扱うかを固定値にすべきか。
- SPA、Editor、Player、Dashboard、Game等でmemory growthをどう評価するか。
- Listener、Timer、Observer、Blob URL、Canvas / WebGL resource、large array、cache等のcleanupをどこまでRule化するか。
- Memoryが一時的に増える正常動作とLeakをどう区別するか。
- Route change / open-close repetition / reconnect repetition等のrepetition testをどこまで要求するか。

目標Output:

- Long-session risk signal
- Memory stabilization / repeated-action validationの判断基準
- Cleanup requirementをProject risk別に調整する方法

### J. Huge Datasets / Heavy Computation

研究Question:

- Data件数だけでなくpayload、DOM、search、sort、filter、parse、memory、update frequencyをどう合わせて判断するか。
- Pagination / Load More / Virtualization / Chunk Rendering / Worker / server-side processingをどう使い分けるか。
- 全件取得は許容できるが全件DOM化は不可、等の分離をどう表現するか。
- Search index / derived cacheのPerformanceとCanonical Data reliabilityをどう分けるか。
- Large data optimizationの複雑化をどこで止めるか。

目標Output:

- Huge dataset escalation matrix
- Network / memory / rendering / computationを分離した判断
- Data / Storage Ownerとの明確なBoundary

### K. Image / Video / Fonts / Heavy Media

研究Question:

- First View / interaction後 / backgroundで必要なMediaをどう分類するか。
- Responsive image、thumbnail、poster、metadata-only、click-to-load等をどの条件で要求するか。
- Video preload / autoplay / multiple embed / background videoのCostをどう評価するか。
- Image decode / layout shift / memoryもnetwork transferと同様に扱うべきか。
- Media qualityを下げる最適化とVisual qualityのTrade-offをどう判断するか。

目標Output:

- Media criticality / load timing decision
- Quality degradationの許容条件
- Multiple embed / video-heavy pageのescalation基準

### L. Third-party Scripts / External Runtime Dependency

研究Question:

- Analytics、ads、chat、embed、font、SDK、API等のthird-partyをPerformance / Reliability上どう分類するか。
- Third-party failureでPrimary Taskを止めてよい条件は何か。
- Deferred / consent後 / interaction後loadをどの条件で使うか。
- Timeout / retry / fallback / isolationをどこまで要求するか。
- Third-party script costをInitial Transferだけでなくmain thread / privacy / availabilityまで横断評価する際、05 / 06 / 13のOwner境界をどう保つか。

目標Output:

- Criticality + load timing + failure isolation matrix
- Third-party dependency追加時のReview Trigger
- Performance / Security / Dependency ownership境界

### M. Measurement / Validation / Stop Condition

研究Question:

- Lab metrics、field data、subjective UX、failure testをどう組み合わせるか。
- Cold / repeat、mobile / desktop、fast / slow network、normal / throttled CPUをどこまで要求するか。
- Core Web VitalsとPrimary Task-specific metricをどう併用するか。
- Performance regressionをどの程度自動検知するべきか。
- 最適化前後の差が実用上意味を持つかをどう判断するか。
- 「まだ速くできる」状態でも終了できるStop Conditionをどう定義するか。

目標Output:

- Project risk別Validation Depth
- Before / After comparison contract
- Optimization stopping rule

## 5. Cross-cutting Classification to Research

各Axisを個別Ruleにするだけでなく、少なくとも次のProject条件との関係を研究します。

- Small static / content site
- Normal interactive web app
- DATA-heavy app
- MEDIA-heavy app
- CLOUD / external API dependent app
- Long-running tool / editor / dashboard
- GAME / Canvas / WebGL
- ELECTRON renderer
- Public general-audience site
- Known high-end-device-only internal tool

固定ProfileだけでRuleを決めず、Current Runtime / User Task / Risk Signalを合わせます。

## 6. Required Decision Outputs

Research完了時は少なくとも次を作ります。

1. **Performance / Reliability Decision Model**
   - Trigger → Risk → Criteria → Action → Exception → Validation → Stop
2. **Optimization Escalation Ladder**
   - 小規模Projectへ過剰対策を要求せず、必要時だけ強化する段階
3. **Loading / Failure State Decision Matrix**
   - loading / stale / partial / offline / timeout / retry / failed / recovered
4. **Runtime Degradation Model**
   - slow network / slow device / memory pressure / long session
5. **Heavy Content Decision Matrix**
   - huge data / image / video / third-party
6. **Validation Contract**
   - lab / real runtime / failure / repetition / before-after / stop condition
7. **Owner Promotion Map**
   - `docs/05`を中心に、`03` / `06` / `07` / `08` / `13`へ必要な専門境界だけ昇格

## 7. Evidence Requirements

Researchは [`../../docs/20-evidence-first-research.md`](../../docs/20-evidence-first-research.md) に従います。

Decision-criticalなClaimでは、Questionに応じて次を優先します。

- Web standards / browser vendor documentation
- Current official performance guidance
- Human-computer interaction / perceived wait research
- Browser / framework-neutral measurement evidence
- Production postmortem / real product failure evidence
- Relevant field data / large-scale measurement
- Supporting / opposing evidence

特定Framework blogや単一Lighthouse scoreだけをUniversal Rule根拠にしません。

Fast-changingなBrowser behavior / metric / APIではCurrent official evidenceを確認します。

## 8. Out of Scope

Phase 5では原則として次を目的にしません。

- minify方法一覧、webpack設定一覧等のTechnique catalog
- React / Vue / Next.js等、特定Framework専用optimization cookbook
- 全Project共通のhard KB / ms上限追加
- Backend database tuning全般
- CDN vendor比較そのもの
- Security ruleの再設計
- Data authority / sync / conflict ruleの再研究
- Visual style / animation designそのもの
- Service Worker / PWAを全Projectへ標準導入
- PerformanceのためだけのArchitecture全面変更をDefault化

隣接TopicがDecisionへ必要ならEvidenceとして扱いますが、Owner責務は維持します。

## 9. Promotion Rules

Research結果をそのままCommon MUSTへしません。

昇格時は:

- `docs/05-performance-reliability.md`をPrimary Normative Ownerとして優先
- Data canonicality / sync / conflictは`docs/03`
- Securityは`docs/06`
- Verification strategyは`docs/07`
- GitHub Pages固有Cache / Service Worker updateは`docs/08`
- Dependency / asset distributionは`docs/13`
- Template / ChecklistへRule本文を複製しない
- 新Ownerは既存Ownerで表現不能な独立責務がEvidenceで確認された場合だけ検討

## 10. Completion Contract

Phase 5 Researchは次を満たすまで完了扱いにしません。

- [ ] A〜Mの各AxisでDecision-critical Questionを調査した
- [ ] Supporting / opposing / limitationを必要範囲で確認した
- [ ] Universal ruleとcontext-dependent ruleを分離した
- [ ] 小規模Projectへのover-optimizationを防ぐStop Conditionがある
- [ ] Loading / Failure / Retry / Timeout / Offlineのstate判断が整理されている
- [ ] Slow device / memory / long sessionのescalation条件が整理されている
- [ ] Huge data / media / third-partyの判断基準が整理されている
- [ ] Existing Soft Budgetとの関係を説明できる
- [ ] Project risk別のValidation Depthを決められる
- [ ] Current `docs/05`とのduplicate / contradictionを整理した
- [ ] 必要なRuleを既存OwnerへPromotionした
- [ ] Quality Checklist等は短いverification entryに留めた
- [ ] Research Assetを第二Normative Ownerにしていない
- [ ] Current Root `REQUIREMENTS.md`のPromotion Stateを更新した
- [ ] Final Guide Validator / relevant validationを確認した

## 11. Research Handoff

- Phase: 5
- Status: Ready for research
- Primary Domain: PERFORMANCE_RELIABILITY
- Work Type: RESEARCH
- Change Scope: SYSTEMIC
- Risk Signal: RESEARCHABLE_QUESTION
- Primary Owner: `docs/05-performance-reliability.md`
- Research Method: `docs/20-evidence-first-research.md`
- Promotion / Hygiene: `docs/14-continuous-improvement.md`
- Blocking Decisions: None
