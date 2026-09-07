# Deep System Audit Checklist

このChecklistは`web-project-guide`自身を**低Confidence / 40点相当から再評価**し、known actionable findingが残らないところまで点検する実行手順です。

Normative Ownerは [`docs/14-continuous-improvement.md`](../docs/14-continuous-improvement.md) です。このFileはExecution Checklistであり第二Rule本文ではありません。

## 0. Audit Baseline

- [ ] Current default branch / target refを取得した
- [ ] Baseline commit SHAを記録した
- [ ] `guide-version.json`を記録した
- [ ] Current RouterからOwner Registryを取得した
- [ ] Owner数を固定値で仮定していない
- [ ] Audit dateを記録した
- [ ] `README` / `START_HERE` / `docs/14` / `docs/21`をCurrent Revisionから読んだ

Audit Reportは`maintenance/audits/YYYY-MM-DD-*.md`等へ保存します。

## 1. Audit Stance

- [ ] 前回直したことをCurrent correctnessのEvidenceにしていない
- [ ] 過去Conversation / Memory /古いZIPをCurrent Repositoryの代用にしていない
- [ ] 文字数ではなく責務・矛盾・到達性・Failure Riskで評価している
- [ ] 短縮目的だけで有用Ruleを削除していない
- [ ] 平均Score / A判定を終了理由にしていない

## 2. Primary Audit — 全Current Owner

Current Routerの全Ownerを1つずつ確認します。

各Ownerを0〜3で採点:

- [ ] Coverage
- [ ] Gap Coverage
- [ ] Duplication
- [ ] Rule / Research Separation
- [ ] Decision Quality
- [ ] Failure Evidence

各Ownerで最低限:

- [ ] 責務を1文で説明できる
- [ ] Trigger / applicabilityが分かる
- [ ] Action / expected behaviorが分かる
- [ ] Exception / trade-offが必要なRuleでは記載がある
- [ ] Validation / completionへ繋がる
- [ ] Project-specific / time-specific evidenceがRule本文へ漏れていない
- [ ] 他Ownerとsame normative decisionを競合していない

## 3. Gap Register

Findingごとに記録します。

### Gap Type

- Rule Gap
- Research Gap
- Evidence Gap
- Structural Gap
- Repository Operation Gap

### Severity

- Critical
- High
- Medium
- Low

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

Research GapだけP0 / P1 / P2を付けます。

- [ ] 全FindingにGap Typeがある
- [ ] Actionable findingにActionがある
- [ ] Severityがある
- [ ] Deferredには具体的理由がある

## 4. Entry / Source-of-Truth Integrity

- [ ] READMEはentry / owner router中心
- [ ] START_HEREはHuman Router中心
- [ ] Root REQUIREMENTSはCurrent Project Contractで、temporary audit table / implementation backlogを積んでいない
- [ ] CHANGELOG / Work Report / Project Learnings / Git historyの役割が分かれている
- [ ] Guide VersionのCurrent値を複数Fileへhardcodeしていない

## 5. Normative Owner Topology

- [ ] Single Normative Ownerを原則維持
- [ ] Rule moveはDestinationだけでなくSource cleanupも確認
- [ ] 1章が複数独立責務を抱える場合はSplit候補として評価
- [ ] 長いだけの章を機械的にSplitしていない
- [ ] Named Project / Pilot / current tool stateをCommon Ownerへ埋め込んでいない
- [ ] Reference / CatalogをRule本文へ昇格させていない

## 6. Human / Machine Router Parity

同じTaskをSTART_HEREと`maintenance/rule-router.json`へ通します。

最低Case:

- [ ] Guide deep review
- [ ] Local UI bug
- [ ] Meaningful visual change
- [ ] Existing save + migration
- [ ] Game primary flow / completion
- [ ] Cross-repository GitHub
- [ ] Conversation handoff / stale recovery
- [ ] Researchable question

確認:

- [ ] Human-required OwnerへMachine Routerから到達
- [ ] Registered Ownerがunreachableでない
- [ ] docs21とJSONのWork Type / Domain / Signal名が一致
- [ ] High-risk / error-prone caseにGolden Caseがある
- [ ] Small taskをover-routeしていない

## 7. Template / Checklist Drift

- [ ] TemplateはInput / Decision field中心
- [ ] ChecklistはPass / Fail可能なshort check中心
- [ ] AGENTS / README TemplateはRouter
- [ ] SpecはTechnical Contract
- [ ] Project RulesはProject-specific override / exception
- [ ] Conditional PackがCoreへ逆流していない
- [ ] Owner変更後のLinkが古くない
- [ ] obsolete user-confirmation wording等がTemplateへ残っていない

## 8. Semantic Duplication Sweep

重点Concept:

- Source of Truth / Current State
- Requirements persistence / handoff
- User confirmation / agent autonomy
- public URL / discoverability
- save / migration / import / reset
- security / auth / RLS / diagnostics
- Electron security / updater
- visual completion / visual research
- final commit / verification
- project-specific vs common
- version / runtime path / cache
- project learnings / history

各Candidate:

- [ ] Ownerを1つ決めた
- [ ] 他FileはBoundary / Link中心
- [ ] Context-specific safety reminderを削除しすぎていない

## 9. Research Gap Review

Current external evidenceが必要なGapだけResearchします。

- [ ] Fast-changing topicはcurrent official / primary sourceを優先
- [ ] Research countをQuotaにしていない
- [ ] Supportingだけでなく必要なcounter / limitationを確認
- [ ] Project Applicabilityを確認
- [ ] EvidenceからRule Strengthを機械的に決めていない

## 10. Machine-readable / Validator Audit

- [ ] JSON parse
- [ ] Schemaがempty route / invalid structureを許しすぎない
- [ ] unknown Work Type / Domain / Signal / Gateを検出
- [ ] Owner referenceが実在
- [ ] Owner reachability
- [ ] Required file追加時のRouter / README / Validator同期
- [ ] Workflow Action等のmachine-checkable self-securityを必要に応じてGuard
- [ ] Prose Snapshotへ戻りすぎていない

## 11. History / Evidence Leakage

- [ ] Named Pilot / temporary statusをCommon Ownerへ置いていない
- [ ] Project-specific evidenceをReference / Catalog / Project Learningsへ分離
- [ ] Referenceがnon-normativeと明確
- [ ] old version noteをCurrent Ruleと誤読しない
- [ ] Rejected / Failure evidenceを再発防止に必要な範囲で保持
- [ ] PROJECT_LEARNINGSを一回ごとに上書きせずrecurrence knowledgeを継続蓄積

## 12. Repository Surface / Operations

- [ ] WorkflowがFinal CommitでValidator実行
- [ ] External Actions / reusable workflow reference policyをself-apply
- [ ] PR Diffで意図しないRule lossを確認
- [ ] post-merge main validation
- [ ] description / topics / homepage / license / rulesets / branch lifecycleを確認
- [ ] merged stale branch / temporary branch / debug artifactを確認
- [ ] Toolで直せないsettingはexact manual follow-upとして残す

## 13. Learning Capture

今回のAuditで再発価値があるFindingは`PROJECT_LEARNINGS.md`へ残します。

- [ ] What happened
- [ ] Root Cause
- [ ] Final Fix
- [ ] Detection / Regression Guard
- [ ] Prevention / next-time hint
- [ ] Related PR / Commit（分かる場合）

Work ReportとProject Learningsへ同じ履歴全文を重複させません。

## 14. Stopping Gate

**Score targetだけでは止めません。**

- [ ] Critical actionable finding = 0、またはexternal blockerを具体的に記録
- [ ] High actionable finding = 0、またはexternal blockerを具体的に記録
- [ ] Medium in-scope actionable finding = 0、またはrule-loss/correctness理由でevidence-deferred
- [ ] Low findingもfixed / N/A / external-only / deferredへ分類
- [ ] known contradictionを`good enough`で残していない
- [ ] Rule preservation確認
- [ ] Human / Machine parity確認
- [ ] Validator guard追加（機械化可能なFinding）
- [ ] PROJECT_LEARNINGS更新
- [ ] Work Report更新
- [ ] Final PR Diff Review
- [ ] PR Head validation success
- [ ] Merge後main validation success

## Audit Output

```text
Audit baseline:
Owner audit matrix:
Gap register:
Duplication/conflict map:
Research priority map:
Fixed now:
External/manual-only:
Deferred by evidence:
Rule preservation notes:
Learning capture:
Router parity:
Validator guards:
Validation:
Final status:
```

次回はこのChecklistをCurrent Revisionから使い、前回Reportを「正しい」と仮定せずCurrent Repositoryを再監査します。
