# Deep System Audit Checklist

このChecklistは `web-project-guide` 自身を「まだ40点」と仮定して、**単一Fileの読みやすさだけでなくGuide全体を1つのSystemとして点検するための実行手順**です。

Normative Ownerは [`docs/14-continuous-improvement.md`](../docs/14-continuous-improvement.md) です。このFileはRule本文の第二正本ではなく、Deep Reviewを毎回同じ粒度で実行するためのChecklistです。

## 0. Audit stance

- [ ] 「前回直したから正しい」と仮定せずCurrent `main` /対象Refを確認した
- [ ] README / START_HERE / docs14 / docs21をCurrent Revisionから読んだ
- [ ] 以前の会話・要約・MemoryをCurrent Repository確認の代用にしていない
- [ ] 文字数の多さではなく、責務・到達性・矛盾・運用Failureを主に評価した
- [ ] 有用なRuleを短縮目的だけで削除しない方針を固定した

## 1. Entry / Source-of-Truth integrity

- [ ] READMEは概要と入口に留まり、詳細Ruleの第二正本になっていない
- [ ] START_HEREはHuman Routerに留まり、Machine Routerと別の詳細Routing体系を持っていない
- [ ] REQUIREMENTSはCurrent Contractで、実装済み改善Historyを蓄積していない
- [ ] CHANGELOG / Work Report / Git historyの役割が混ざっていない
- [ ] Guide VersionのCurrent値を複数Fileへ手入力していない

## 2. Normative owner topology

各判断Domainについて、`docs/00-governance.md`のOwner表と実際の本文を照合します。

- [ ] 同じBehaviorを2つ以上のOwner Docが詳細定義していない
- [ ] Ruleを別Ownerへ移した後、旧Ownerに詳細Copyが残っていない
- [ ] 1章が複数の独立したNormative responsibilityを抱えていない
- [ ] 章が長いだけを理由に分割していない
- [ ] Project固有Evidence / Pilot / Repository名がCommon Rule本文へ混入していない
- [ ] Catalog / ReferenceのEvidenceをCommon MUSTとして再定義していない

## 3. Human / Machine routing parity

同じ代表Taskを `START_HERE.md` と `maintenance/rule-router.json` の両方で解決し、結果を比較します。

最低代表Case:

- [ ] Guide自身のDeep Review /改善
- [ ] Local UI Bug
- [ ] Meaningful Visual Change
- [ ] Existing Save + Schema Migration
- [ ] Game主要Flow / Completion変更
- [ ] Cross-repository GitHub infrastructure変更
- [ ] Researchable Question

確認項目:

- [ ] Human Routerが必須とするOwnerへMachine Routerからも到達できる
- [ ] Router Owners Registryにある重要Ownerが実質到達不能になっていない
- [ ] Work Type / Domain / Signal名がdocs21とJSONで一致する
- [ ] Golden Caseが実際の高Risk /誤RoutingしやすいCaseを覆っている
- [ ] 小さい作業へVisual Research / Deep Research等を過剰Routingしていない

## 4. Template / Checklist drift

- [ ] TemplateはProject固有Input / Decision field中心でRule本文を再掲していない
- [ ] Quality ChecklistはPass / Failできる短い実行確認中心
- [ ] AGENTS / README TemplateはRouterとして正本へLinkしている
- [ ] Spec TemplateはTechnical Contract、Project Rules TemplateはOverride / Exceptionに責務限定されている
- [ ] Conditional PackがCore Templateへ逆流していない
- [ ] Owner変更後にTemplate / Checklistが古いOwnerを指していない

## 5. Semantic duplication sweep

単純な同一文字列検索だけでなく、**意味が同じRuleの言い換え**を探します。

重点Keyword / Concept例:

- Source of Truth / Current State
- public URL / Repository discoverability
- Save / Migration / Import / Reset
- Security / Secret / RLS / Remote diagnostics
- Visual completion / Visual research
- Final commit / CI / Verification state
- Project-specific vs Common
- Version / Runtime path / Cache busting

各Candidateで:

- [ ] Normative Ownerを1つ決めた
- [ ] 他FileはLink /短いBoundary説明にした
- [ ] Context固有の安全Reminderまで誤って削っていない

## 6. Machine-readable contract audit

- [ ] JSONはparse可能
- [ ] Schemaが空Route /空Signal等の明らかな構造欠陥を許しすぎていない
- [ ] ValidatorがRouterの未知Work Type / Domain / Signal / Gate参照を検出する
- [ ] Routerが参照するDoc / Gateは実在する
- [ ] Owner RegistryのDocがRouting上どう到達するか説明できる
- [ ] Required Fileを追加したときValidator / Router / READMEの必要箇所が同期する
- [ ] ValidatorがProse Snapshotへ戻りすぎていない

## 7. History / evidence leakage

- [ ] Named Project Pilot /一時的な導入状況をCommon Rule本文へ置いていない
- [ ] Project-specific EvidenceはReference / Catalog / Project Learnings等へ分離した
- [ ] Referenceは非Normativeであることが明確
- [ ] 古いVersion固有説明がCurrent Ruleとして読めない形になっている
- [ ] Rejected / Failed approachの再発防止Evidenceを必要範囲で残している

## 8. Repository surface / operations

- [ ] WorkflowがFinal CommitでValidatorを実行する
- [ ] PR Diffで意図しないRule消失・大量Rewriteを確認する
- [ ] main Merge後のValidationを確認する
- [ ] Repository description / topics / homepage / license / rulesets等のPublic metadataを確認し、未整備ならWork Reportへ記録する
- [ ] 不要な一時Branch / Debug Artifact / Draftを残していない

Repository settingsを現在の接続権限から変更できない場合は、未修正を隠さずManual follow-upとして残します。

## 9. Change classification

Findingごとに次へ分類します。

- **Blocking contradiction** — 同じBehaviorの正本が競合 / Routing漏れで高Risk Ruleへ到達不能
- **Structural debt** — 現在は動くが責務混在・将来Driftしやすい
- **Documentation polish** — 意味は正しいが読みづらい /表現不統一
- **Deferred by evidence** — 問題候補だが、今変更するとCost / Riskが上回る
- **Repository metadata** — Code/Guide本文外の運用品質

重大度だけでなく、**修正によるRule loss Risk**も見て変更順を決めます。

## 10. Completion gate

- [ ] Blocking contradictionを解消した、または未解決理由を明記した
- [ ] Rule移動で意味が失われていないことをOwner側で確認した
- [ ] Human / Machine Router parityを代表Caseで確認した
- [ ] Validatorへ再発防止可能な構造Guardを追加した
- [ ] PROJECT_LEARNINGSへ再発価値の高いFindingだけ保存した
- [ ] Work Reportへ変更・未確認・Deferred itemを記録した
- [ ] Branch / PRの最終Diffを確認した
- [ ] PR HeadのGuide Validation成功を確認した
- [ ] Merge後mainのGuide Validation成功を確認した

## Audit output

Deep Auditの結果は、単なる「読んだFile一覧」ではなく次を残します。

```text
Scope:
High-impact findings:
Structural findings:
Fixed now:
Deferred intentionally:
Rule preservation notes:
Router parity cases:
Validator guards added:
Repository metadata findings:
Validation:
Unverified:
```

同じAuditを次回行うときはこのChecklistをCurrent Revisionから使い、必要なら `maintenance/review-policy.json` の `deepSystemAudit` と照合します。
