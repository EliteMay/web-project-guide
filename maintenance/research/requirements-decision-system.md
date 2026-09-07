# Requirements Decision System — Phase 1 Research Contract

Status: historical non-normative research contract / promoted 2026-09-07
Source of Truth for priority/status: [`../../REQUIREMENTS.md`](../../REQUIREMENTS.md)

このFileはCommon Rule本文ではありません。曖昧なUser Requestから必要十分で検証可能なRequirementへ変換するEnd-to-End判断体系を研究・設計するための、`web-project-guide`自身のCurrent Research Contractです。

主なNormative Owner候補は [`docs/01-requirements.md`](../../docs/01-requirements.md) とし、一般Research Methodは [`docs/20-evidence-first-research.md`](../../docs/20-evidence-first-research.md)、GuideへのRule配置・Promotion / Hygieneは [`docs/14-continuous-improvement.md`](../../docs/14-continuous-improvement.md) を維持します。新しいOwner Docは、既存Ownerへ自然に統合できない責務がResearchで確認された場合のみ検討します。

## Goal

最終的に少なくとも次のFlowを一貫して判断できるRequirements Decision Systemを目標とします。

```text
Raw User Request
↓
Underlying Problem
↓
Desired Outcome
↓
Solution / Feature Candidate
↓
Scope / Priority Decision
↓
Research / Prototype / Validation
↓
Confirmed Requirement
↓
Current Contract / Change Management
↓
Observable Completion
```

## Research Domain 1 — Problem Discovery

次を研究対象とします。

- User自身も欲しいものが曖昧な場合の具体化
- Request / Underlying Problem / Solution Ideaの分離
- Need / Want / Solution Ideaの区別
- Problemを掘る深さと停止条件
- Userの説明だけで不足する場合のContext / Behavior / Friction / Desired OutcomeからのProblem Hypothesis
- 複数Problemが混ざったRequestのDecision単位への分解
- Problem Importanceの判断軸
- Problem理解からSolution検討へ移る条件

Userへ機械的に`なぜ？`を繰り返す方式を標準にはしません。

## Research Domain 2 — Scope & Prioritization

次を研究対象とします。

- Featureを追加する条件
- Featureを捨てる条件
- `便利そう`とMeaningful Valueの分離
- Core Outcomeを成立・検証できるMVP Boundary
- MVPへ含めるべきFoundation / Risk検証要素
- `Now / Later / Reject`等のScope分類
- Feature Dependency / Sequence
- Implementation CostだけでなくMaintenance / Testing / UI・Data Complexity / Migration / Failure Risk / Cognitive Loadを含むCost評価
- RICE / MoSCoW / Kano等のPrioritization Frameworkの適用条件と限界
- 必要な具体化とScope Creepの分離

MVPを単なる最小Feature数とは扱いません。

## Research Domain 3 — Evidence & Validation

次を研究対象とします。

- Researchだけで十分に絞れるDecision
- Prototype / Testが必要なProject-specific Decision
- Research ResultをRequirementへ変換する条件
- `Confirmed / Provisional / Open`等のDecision Status運用
- Sketch / Wireframe / Clickable Prototype / Technical Spike / Minimal Implementation / Data Prototype等の使い分け
- Prototypeを本実装並みに重くしない停止条件
- Hypothesis → Observable Signal → Pass / Fail Criteriaの関係
- Prototype / Validation ResultをRequirementへ戻すFeedback Loop
- User Test / Actual Useが必要な条件
- Evidence不足時に無限Researchを続けずUnknown → Hypothesis → Cheap Testへ移る条件

ResearchとPrototypeは競合する手段ではなく、必要に応じて `Research → Uncertainty Reduction → Prototype / Test` と接続します。

## Research Domain 4 — Requirement Management

次を研究対象とします。

- Requirements肥大化の原因と整理方法
- Current Contract / Decision History / Research Evidence / Implementation Detailの分離
- 実装担当が重要判断をやり直さずに済むRequirement粒度
- Requirement変更の `Clarification / Extension / Replacement / Removal / Breaking Change` 等の分類価値
- Requirement変更時のImpact Analysis
- Obsolete RequirementをCurrent Contractから外しつつ変更理由を追跡する方法
- Requirement Conflictの発見と解決
- Requirement Statusの有効性と管理Cost
- Problem → Outcome → Requirement → ValidationのTraceabilityをどこまで持つべきか
- Requirements Cleanupを実行するTrigger

Requirementsは追記型の日記ではなく、常にCurrent Contractとして更新します。

## Research Domain 5 — Completion / Observable Done

次を研究対象とします。

- 曖昧なCompletion ConditionをObservableな条件へ変換する方法
- RequirementとAcceptance / Verification Criteriaの責務分離
- Quantitative / Qualitative Criteriaの使い分け
- Automated Test / Static Inspection / Browser Test / User Test / Actual Playtest / Real Device / Production確認の適用条件
- Happy Path以外のFailure / Empty / Invalid / Reload / Restore / RecoveryをCompletionへ含める基準
- Performance / Accessibility / Reliability / Security / Responsive / Compatibility等の非機能Requirementを観測可能にする方法
- `Pass / Fail / Not Verified / Not Applicable`等の状態分離
- Feature Complete / Release Ready / Requirements Complete等の部分完成の扱い
- Risk / Importanceに応じたVerification Depth
- Requirement変更時にCompletion Criteriaを再評価する仕組み

最終的に `Requirement → Expected Outcome → Observable Evidence → Verification Method → Pass / Fail Criteria → Actual Result` が追えることを目標とします。

## Research Method / Scope

Phase 1はRequirements Engineeringだけでなく必要に応じて以下のEvidenceを横断比較します。

- Requirements Engineering
- Product Discovery / Product Management
- HCI / UX Research
- Lean / MVP
- Agile
- Systems Engineering
- Software Testing / Acceptance Criteria
- Real Product / Project Postmortem
- Individual / Small-team Development
- AI-assisted Development

有名Frameworkを知名度だけで採用しません。各Framework / Practiceについて、何を解決するか、Evidence、Failure / Limitation、Applicability、個人開発 + AI-assisted developmentへの適合性を確認し、Guideへは必要な原理だけを取り込みます。

Research Depthは原則Deep Researchとし、Source件数そのものではなくDecision Coverage / Research Saturation / Decision Qualityで終了を判断します。

## Research Output

Phase 1では最低限次を成果物候補とします。

1. **Evidence Map** — Established / Context-dependent / Disputed / Unknown / Failure / Limitation
2. **Requirements Decision Model** — ProblemからObservable CompletionまでのEnd-to-End Flow
3. **Decision Rules** — Feature、MVP、Research / Prototype、Requirement Change、Completion等を実際に判断できるRule
4. **Execution Support** — 必要な場合のみQuestion Pattern、Feature Decision Matrix、MVP判断、Prototype Trigger、Change Impact Check、Completion Criteria形式等

Findingは内容に応じて次へ配置します。

- Common Requirement Principle → `docs/01`候補
- General Research Method → `docs/20`
- Guide Promotion / Rule Hygiene → `docs/14`
- Execution Aid → Template / Checklist
- Evidence / Failure / Working Hypothesis → Catalog / Reference
- Project-specific Finding → Common Guideへ入れない

## Agent Autonomy Integration

Phase 1はCurrent Agent Autonomy Contractと整合させます。

```text
AIがCurrent Contextから合理的に決められる
→ Best Reasonable Decisionで進む

Researchで解決できる
→ Researchする

Project固有UnknownをCheap Testで解決できる
→ Prototype / Testする

User Intentなしでは合理的に決められない
→ User Decision条件を確認する
```

Requirements精度向上を理由にUserへの質問数を増やすことを目的にしません。

## Success Criteria

Phase 1完了時は少なくとも次を満たします。

- 5 Domainすべてで実用的なDecision Criteriaがある
- Problem → Outcome → Requirement → CompletionがEnd-to-Endで接続されている
- Featureを `Now / Later / Reject` 等へ根拠付きで分類できる
- MVP BoundaryをCore Outcome基準で判断できる
- Research / Prototype / User Decisionの使い分けを判断できる
- Research / Prototypeを適切に終了しDecisionへ進める
- Requirement変更をImpact込みでCurrent Contractへ反映できる
- Observable Completion / Verification Methodを作成できる
- Current Agent Autonomy方針と矛盾しない
- Guide全体を過剰Process化しない
- 代表CaseでDecision Modelを通し、合理的な結果になることをValidationする
- Common Rule化すべきFindingだけを選別し、既存Owner責務を壊さない

代表Validation Caseには少なくとも、新規Site、既存SiteへのFeature追加、曖昧な`使いやすくしたい`要求、Feature過多、途中Requirement変更、Completionが曖昧なCaseを含めます。

## Failure Criteria / Non-goals

次の状態はPhase 1の失敗または再検討対象とします。

- Framework名を列挙するだけでDecision Criteriaになっていない
- 小規模Projectにも大量Document / Score / Traceability / Prototype / User Testを機械的に要求する
- AIの判断精度向上ではなくUserへの質問増加で解決する
- `Reject`が実質存在せずFeatureがLaterへ蓄積し続ける
- Completion Criteriaが`使いやすい`、`高品質`、`正常に動く`等の非観測的表現だけになる
- Requirements OwnerへResearch Method / Evidence / Execution Checklistを過剰に混在させる
- Product Management全体へScopeを無制限に拡大する
- 全Requirementへ固定Score、重いTraceability ID、Prototypeを強制する

Phase 1はResearch量やRule数を増やすことではなく、**少ないRuleでRequirements Decision Qualityを上げること**を完成基準とします。

## Promotion Result — 2026-09-07

Phase 1 Research was completed and promoted without creating a new Owner, Gate, Profile, or mandatory scoring framework.

- Normative Requirements decisions → `docs/01-requirements.md`
- General research method remains → `docs/20-evidence-first-research.md`
- Evidence synthesis → `references/requirements-decision-system-research.md`
- Current project status → Root `REQUIREMENTS.md`

Promoted gaps: Problem → Outcome → Solution separation, `Now / Later / Reject`, MVP boundary, Prototype / Cheap Test trigger, Requirement Change classification / impact, and observable completion with proportionate traceability.

Existing Agent Autonomy and Requirements Persistence rules were reused rather than duplicated. This file is retained as historical non-normative evidence only.
