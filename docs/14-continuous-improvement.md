# 14 Continuous Improvement / Guide Audit

`web-project-guide`を一度作って終わりにせず、実Projectの経験、Web標準の変化、**Guide自身の複雑化・矛盾**から継続改善するためのNormative Ownerです。

- Machine-readable review policy: [`maintenance/review-policy.json`](../maintenance/review-policy.json)
- Deep Audit execution checklist: [`maintenance/DEEP_SYSTEM_AUDIT.md`](../maintenance/DEEP_SYSTEM_AUDIT.md)
- Audit result data: `EliteMay/web-project-data/evidence/YYYY/web-project-guide/audits/`（書込みCapabilityがある場合）
- Guide-side audit compatibility index: [`maintenance/audits/`](../maintenance/audits/)
- General research method: [20 Evidence-first Research](20-evidence-first-research.md)
- Rule ownership / budget: [00 Governance](00-governance.md)

Checklist / Audit Reportは実行記録であり、この章の第二Normative Ownerではありません。

## Improvement Loops

1. **Project Feedback Loop** — Failure / Success / costly fixを抽出
2. **External Evidence Loop** — current official / primary evidenceで陳腐化を確認
3. **Rule Hygiene Loop** — duplicate / orphan / project-specific leakageを整理
4. **System Integrity Loop** — Owner / Router / Template / Validator / History / Repository operationを横断監査

Rule数やCommit数を増やすことを成果にしません。

## MUST: 他Projectは定期ReviewではRead-only

定期Reviewが自動で書き換える対象は原則`EliteMay/web-project-guide`だけです。他RepositoryをEvidenceとして読む場合も、修正は別作業として扱います。

## Repository Review

固定された古いRepo一覧ではなくCurrent accessible repositoriesを確認します。

優先Evidence:

- `PROJECT_LEARNINGS.md`
- recent commits / changed files
- README / Requirements / Spec / Project Rules / AGENTS
- Work Report / CHANGELOG
- User feedback / rejected candidate
- Runtime diagnostics / Root Cause / Regression Guard
- Storage / Migration
- Tests / Actions
- duplicate runtime / hardcode / repeated fixes

通常はdelta-first、定期的にDeep Reviewを行います。

## Project Learningsを継続蓄積する

### MUST: 再発価値のあるLearningを「今回だけ」で捨てない

Project内で次回の修正判断に役立つFailure / Successは`PROJECT_LEARNINGS.md`へ**追記・統合して継続蓄積**します。

最低限:

- What happened / Symptom
- Root Cause
- Final Fix
- Detection / Regression Guard
- Prevention / next-time hint
- Related PR / Commit（分かる場合）

すべての小変更を記録しません。再発価値、Cost、Severity、Guide改善価値があるものに絞ります。

一般化してCatalog / Common Ruleへ昇格した後も、Project側Learningを「存在しなかったこと」にせず、resolved / promoted等のStatusと参照を残せます。長い作業履歴はWork Report / Gitへ分離します。

## Visual Evidence Harvest

Visualはlatest mainやAI self-assessmentだけをSuccess Evidenceにしません。

必要に応じて:

- before / after direction
- explicit user feedback / rating
- relative feedback
- visual success / failure learning
- candidate / rejected reason
- reuse boundary

を確認します。

Domain transfer前は [18 Domain-first Visual Research](18-domain-first-visual-research.md) を使います。

## External Evidence / Standards

一般Rule追加・変更にcurrent external evidenceが必要なら [20](20-evidence-first-research.md) を使います。

特にfast-changingなSecurity / Browser / Cloud / Electron / GitHub Actions等ではCurrent official sourceを優先します。

Research結果を自動的にMUSTへ変換せず、Applicability / Severity / Reversibility / Project variabilityを見ます。

## Research / Evidence Storage Boundary

### MUST: Current Ruleと保存データを分離する

`web-project-guide`はCurrent Common Rule / Procedure / Routing / Validationを担当します。`EliteMay/web-project-data`へ書込みCapabilityがある場合、次の保存データ本体はData側へ置きます。

- point-in-time Audit Report / Finding / Resolution
- Project-specific / time-specific Evidence
- Promotion済みHistorical Research Contract / Record
- 詳細なResearch backlog / working state
- Current Ruleへ直接置く必要がない内部Research Evidence

一方、次はGuide側へ残せます。

- 複数Projectで直接再利用するPublic Curated Reference
- Current Common Ruleの理解・検証に長期的に必要な公開Research
- Current Research execution protocol / benchmark設計
- Normative Research Method

`research`や`evidence`という名前だけで機械的にDataへ移しません。**Current Public Guideとして再利用するか、時点・作業・履歴データとして保存するか**で判断します。

Data側のResearch / EvidenceもCurrent Common RuleやProject Stateの第二Source of Truthにはしません。利用時はCurrent Repository / Owner Docs / Requirements / official evidenceを再確認します。

Data Repositoryへ書けない場合、Public GuideへPrivate / raw dataをFallback保存しません。保存不能は保存済みと扱わず、必要なCurrent work checkpointはWork Report / Branch / PR等へ残します。

## Rule Hygiene

### MUST: Rule追加時にConsolidationも探す

- same decisionが別Ownerにないか
- README / START_HEREがRule本文化していないか
- Template / Checklistが第二Rule本文になっていないか
- Catalog evidenceがUniversal MUST化していないか
- Project-specific / time-specific evidenceがCommon Ownerへ混ざっていないか
- new docがRouterからorphanになっていないか
- old rule / example / version-specific proseを移動・統合できないか

### Rule move completion

Ruleを移す場合:

```text
DestinationにCurrent Ruleを置く
+ Sourceから旧Detailed Copyを除去 / boundary linkへ変更
+ Router / Template / Validator参照を更新
+ Rule preservationを確認
```

Destinationだけ確認して終えません。

Research / EvidenceをGuideからDataへ移す場合も、必要なCurrent Rule / Public Reference / Compatibility Pointerが失われていないか確認します。

## Deep System Audit Contract

### MUST: Deep Auditは全Current Ownerを動的に棚卸しする

固定章数をhardcodeせず、Current Router / Owner RegistryからAudit対象を解決します。

Primary:

- all current normative owners

Secondary:

- README / START_HERE / root REQUIREMENTS
- router / schema / review policy
- templates / checklist
- catalog / references
- validator / workflows
- repository metadata / branch lifecycle / rulesets等

### Six-axis Owner Audit

各Ownerを0〜3で評価します。

1. **Coverage** — 責務に必要な主要Ruleがあるか
2. **Gap Coverage** — failure-prone edge / exceptionが抜けていないか
3. **Duplication** — same normative decisionを重複定義していないか
4. **Rule / Research Separation** — current ruleとevidence / project exampleを分けているか
5. **Decision Quality** — Trigger → Criteria → Action → Exception/Trade-off → Validationへ落ちるか
6. **Failure Evidence** — なぜRuleが必要か、再発防止Evidenceへ辿れるか

0〜3の点数は診断用です。平均点をCompletion thresholdにしません。

Overallは必要に応じてA/B/C/Dを付けられますが、Critical / High Findingが1つあれば平均が高くても未完成です。

### Failure Evidence Level

必要に応じて:

- F0 — Evidenceなし /由来不明
- F1 — plausible / theoretical
- F2 — concrete project or authoritative external evidence
- F3 — repeated / high-severity / independently reinforced evidence

を使えます。

Ruleを残すためにF3が必須という意味ではありません。Security / Data-loss等は1件でもSeverityが高ければ強いRuleになり得ます。

### Gap Type

Findingを最低限次へ分類します。

- **Rule Gap** — normative behavior不足
- **Research Gap** — current external evidence確認が必要
- **Evidence Gap** — Rule根拠 / applicabilityが弱い
- **Structural Gap** — owner / routing / duplication / storage location問題
- **Repository Operation Gap** — branch / workflow / metadata / settings等

### Action

- KEEP
- CLARIFY
- EXPAND
- MOVE
- MERGE
- SPLIT
- REMOVE
- RESEARCH
- ADD EVIDENCE
- ROUTE FIX
- REPOSITORY FIX

Severity:

- Critical
- High
- Medium
- Low

Research PriorityはResearch GapだけにP0 / P1 / P2を付けます。Tierを埋めるために不要Researchを作りません。

## Deep Audit Stopping Condition

### MUST: 「点数が上がった」で止めない

Deep Auditは次を満たすまで完了扱いにしません。

1. Critical / High actionable findingを解消した、または**Current tool / external permission / legal decision等で本当に外部Block**されている。
2. Medium actionable in-scope findingを解消した。変更するとRule loss / correctness低下が大きい場合だけevidence-deferredにできる。
3. Low findingもfix / not applicable / external-only / evidence-deferredへ分類した。
4. known contradictionを`good enough`へ言い換えて残していない。
5. Rule moveでSource / Destination両方を確認した。
6. Human / Machine Router parityを代表Caseで確認した。
7. Final PR diff / PR-head validation / post-merge main validationが確認できた。

**100点は「絶対に将来改善点が発生しない」という意味ではありません。Current evidenceとscopeで、既知のactionable findingを意図的に残していない状態**として扱います。

## Audit Output

`EliteMay/web-project-data`へ書込みCapabilityがある場合、Deep Auditのpoint-in-time結果本体は `evidence/YYYY/web-project-guide/audits/` へ保存します。Guide側 `maintenance/audits/` はCompatibility Pointer / Indexとして使えますが、Audit result historyの本体を増やし続けません。

最低限:

- Audit baseline: repo / commit / guide version / date / owner count
- Owner audit matrix
- Gap register
- Duplication / conflict map
- Research priority map
- Fixed now
- Deferred / external-only
- Rule preservation notes
- Validation
- Final status

Root `REQUIREMENTS.md`へ監査表や一時Backlogを積みません。

## Human / Machine Router Parity

同じ代表TaskをSTART_HEREとMachine Routerへ通します。

最低代表Case:

- Guide deep review
- local UI bug
- meaningful visual change
- existing save + migration
- game primary flow / completion
- cross-repository GitHub
- conversation handoff / recovery
- researchable question

Router変更時は片側だけ更新しません。

## Validator Strategy

今回見つかった構造Failureは可能ならRegression Guardへ変えます。

優先:

- Required file / link
- router key / owner reachability
- unknown Work Type / Domain / Signal / Gate
- golden case
- action SHA pinning等、明確なmachine-checkable self-application
- owner leakageの明確なmarker

Semantic duplicationを巨大Rule Engineで完全自動判定しません。

## Common Rule Promotion

Project由来Rule候補:

- repeated failure
- one-time but critical / high-cost incident
- data loss / compatibility / publication / security risk
- repeated successful pattern
- Guideを守っても防げなかったgap
- user feedbackからgeneralizable causeを抽出できた

まず既存Owner / Project Learnings / Catalog / Checklist / Public Curated Referenceへ統合できないか確認し、新Common Ownerは最後の選択肢にします。

Project-specific / time-specific EvidenceそのものはData側へ保存し、GuideへPromotionするのは再利用可能なRule / Curated Referenceだけにします。

## Change Path

Low-riskで明確:

- typo
- reference update
- link
- existing rule clarification
- evidence addition
- duplicate prose → owner link

High-impact:

- MUST add/remove
- governance / SOT
- priority
- storage / deployment default
- compatibility policy
- fixed visual style
- major routing / owner split

ではBranch / PRを優先します。

## Release / Documentation

Meaningful common behavior changeでは必要に応じて:

- guide-version
- CHANGELOG
- root REQUIREMENTS current contract
- Owner Docs
- README / START_HERE
- router / schema / review policy
- templates / checklist
- PROJECT_LEARNINGS
- Work Report
- validator

を同期します。

## Validation / No-change

Final CommitでGuide Validatorを通します。

Research / Evidence moveでは、Guide側のCurrent Rule・Public Reference・Compatibility LinkとData側の保存先が両方確認できることもValidationへ含めます。

新しい知見がなければ空Commitを作りません。削除 /統合だけのReviewも有効です。
