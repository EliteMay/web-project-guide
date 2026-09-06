# 14 Continuous Improvement / 定期レビュー

`web-project-guide` を一度作って終わりにせず、実Projectの経験、Web標準の変化、**Guide自身の複雑化**から継続的に改善するための運用ルールです。

機械可読なReview設定の正本は [`maintenance/review-policy.json`](../maintenance/review-policy.json) とします。

Deep System Auditの実行Checklistは [`maintenance/DEEP_SYSTEM_AUDIT.md`](../maintenance/DEEP_SYSTEM_AUDIT.md) を使います。Checklistはこの章の実行補助であり、Normative Rule本文の第二正本ではありません。

Rule追加・正本管理の判断は [Guide Governance](00-governance.md) のRule Budget / Single Normative Ownerを正本とします。

External Research Method、Source Quality、Opposing Evidence、Bias、Applicability、Research Saturation、Evidence Map等の一般Research Workflowは [Evidence-first Research](20-evidence-first-research.md) を正本とします。この章は **Project Feedback Loop / Rule Hygiene / Common Rule Promotion operation / Guide自身のSystem Audit** を担当します。

## 目的

定期Reviewでは次の4つを行います。

1. **Project Feedback Loop** — 実Projectから失敗・高コスト修正・再利用価値のある設計を抽出
2. **External Evidence / Standards Loop** — 一次・公式資料や必要な外部Evidenceから不足・陳腐化を確認
3. **Rule Hygiene Loop** — 重複・Orphan Rule・過剰なChecklist化・Project固有Rule混入を整理
4. **System Integrity Loop** — Owner / Human Router / Machine Router / Template / Validator / History / Repository運用が一体として矛盾していないか確認

新しいRuleを増やすこと自体を成果にしません。

## MUST: 他Projectは原則Read-only

定期Reviewが自動で書き換える対象は `EliteMay/web-project-guide` のみとします。

他のWeb / Electron RepositoryはGuide改善のための調査対象として読みますが、定期Reviewだけを理由に自動修正しません。

対象Projectの修正は別作業として扱います。

## Repository Review

毎回、固定された古いRepo一覧だけを使わず、GitHub上でアクセス可能な `EliteMay` Repositoryを再取得します。

優先して見るもの:

- `PROJECT_LEARNINGS.md`
- 前回Review以降のCommit / 変更ファイル
- README / Spec / Project Rules / AGENTS / Work Report / CHANGELOG
- User feedback / Rating / Rejected visual candidate
- Diagnostics / Error ID / Root Cause / Regression Guard
- Storage Schema / Migration
- Test / GitHub Actions
- Versioned Patch / Duplicate Runtime / hardcode
- 修正回数が多い箇所
- 複数Projectへ再利用できそうな成功Pattern

毎週すべてのCodeをゼロから精読せず、**差分を先に見て必要なProjectだけ深掘り**します。

月1回程度は差分だけでは見つけにくい長期的な構造問題をDeep Reviewします。

## Visual Evidence Harvest

Visual Designは「最新main」ではなく評価Evidence付きでReviewします。

Evidence Level、登録条件、Rejected retentionの正本は [Validated Visual Direction Catalog](../catalog/validated-visual-directions.md) です。

定期Reviewでは最近Visual変更があったProjectについて、最低限次を確認します。

- 変更前 / 変更後のDirection
- Userが何を良い・悪いと評価したか
- Ratingや「旧版の方が良い」等の相対比較
- `PROJECT_LEARNINGS.md` のVisual success / failure
- User-facing EvidenceがないCandidateを成功扱いしていないか
- 他Projectへ再利用可能な構造原理があるか

Domain固有の成功例を他Projectへ横展開する前には [Domain-first Visual Research](18-domain-first-visual-research.md) を優先します。重要で不確実なResearchable Questionがある場合の一般Research Methodは [Evidence-first Research](20-evidence-first-research.md) を併用します。

## External Evidence / Web Standards Review

主なSource設定は [`maintenance/review-policy.json`](../maintenance/review-policy.json) に置き、この章へURL一覧を重複させません。

一般Ruleの追加・変更に外部Evidenceが必要な場合は、Research強度を判断して [Evidence-first Research](20-evidence-first-research.md) を使います。Quick / Standard / Deep、Original Source確認、Supporting / Opposing Evidence、Bias、Saturation等の方法はこの章へ複製しません。

Guide改善としては、Research結果を受けて次を確認します。

- 現行Guideと公式仕様 / 強いEvidenceが矛盾していないか
- Browser / Platform変更で従来Ruleが不要・危険になっていないか
- Security / Accessibility / Performanceの重要変更
- GitHub Pages / Electron等、利用中Platformの仕様変更
- Visual Design System等から一般化可能な知見があるか
- EvidenceがProject固有か、Common Ruleへ一般化できるか

Research結果そのものを自動的にMUSTへ変換しません。Rule Strength / 配置判断はGovernanceとこの章のPromotion / Hygieneを通します。

## Rule Hygiene Review

### MUST: Ruleを追加するReviewでは重複も同時に探す

意味のあるCommon Rule追加時は、最低限次を確認します。

- 同じ判断を別Docが既に持っていないか
- Owner Docが2つ以上になっていないか
- README / START_HEREが詳細Ruleを再掲していないか
- Docs内にQuality Checklistと同じChecklist全文が増えていないか
- Catalogの実例がCommon MUSTへそのまま昇格していないか
- Project固有の事情がCommon Ruleへ残っていないか
- 新しいDocがREADME / START_HEREから辿れないOrphanになっていないか
- 古いRule / Example / Version固有記述を削除・統合できないか

### Monthly Deep Reviewで追加確認

- 内容がほぼ同じ章を統合できないか
- 大きくなった章から別Ownerへ責務を戻せないか
- 同じWorkflowがDocs / Catalog / Checklistへ3重化していないか
- MUSTが増えすぎて実Projectで適用不能になっていないか
- CONDITIONALへ下げるべきRuleがないか
- 過去の一時的な事情を永続Ruleとして残していないか
- Routerが現在の全Owner Docへ正しく案内しているか

Ruleを消すことも改善です。

## Deep System Audit

### MUST: GuideをFile集合ではなくSystemとして照合する

Guide自身を大きく点検するときは、各Fileを個別に「問題なし」と判断するだけで終えません。少なくとも次の横断面を相互照合します。

1. Entry / Source of Truth
2. Normative Owner topology
3. Human Router / Machine Router parity
4. Template / Checklist responsibility
5. Semantic duplication
6. Machine-readable Schema / Validator coverage
7. History / Project-specific Evidence leakage
8. Repository metadata / Workflow / Final-state operations

実行順・代表Case・Finding分類・Completion Gateは [`maintenance/DEEP_SYSTEM_AUDIT.md`](../maintenance/DEEP_SYSTEM_AUDIT.md) を使います。

### MUST: 「前回直した」をEvidenceにしない

前回のPRやWork Reportで「移動済み」「整理済み」と書かれていても、Current `main` に旧Copy・古いRoute・Project固有Exampleが残っていないか再確認します。

特にRule移動後は、**新Ownerに存在すること**だけでなく**旧Ownerから詳細Copyが消えていること**まで確認します。

### MUST: Human / Machine Routerを同じTaskで比較する

`START_HERE.md`のHuman Routeと`maintenance/rule-router.json`を別々に読むだけでなく、同じ代表Taskを両方へ通し、必要Ownerの差を確認します。

Guide自身のDeep Review、Storage Migration、Meaningful Visual Change、Game主要Flow、Cross-Repository GitHub Infrastructure等、見落としCostが高いCaseはGolden Caseで守ることを優先します。

### SHOULD: Validatorは今回見つかった構造Failureを再発防止する

Validatorへ追加するのは、文章の言い回しではなく次のような構造Contractを優先します。

- Required File / Link
- Router key /参照整合
- Unknown Work Type / Domain / Signal / Gate参照
- Golden Routing Case
- Audit Procedure到達性
- Project-specific Evidence separationの明確な構造Marker

Semantic duplicationそのものを完全自動判定しようとして巨大なRule Engineを作りません。機械検査できない意味重複はDeep Auditで人間 / AI Reviewします。

## 新しい知見の配置先

配置判断は [Guide Governance](00-governance.md#rule-budget--共通ルールを増やしすぎない) を正本とします。

定期Reviewでは、知見をいきなりCommon Docsへ入れず、次のどこが適切かを判断します。

- 既存Owner Docの補強
- Project側の`PROJECT_LEARNINGS.md`
- Failure / Success / Anti-Pattern / Visual Catalog
- Quality Checklist / Template
- 新しいCommon Rule

新規Common Ruleは最後の選択肢です。

## Common Rule Promotion

Project由来では、次のような場合にGuide化を検討します。

- 複数Projectで同じ失敗が起きた
- 1回でも修正Cost / Severityが非常に高かった
- データ消失・互換破壊・公開事故等の重大Risk
- 同じ成功Patternが複数Projectで効果を示した
- 今のGuideを守っても防げなかったGap
- User feedbackから共通原因へ一般化できた

External EvidenceやProject ResearchからCommon Rule Candidateを評価する一般的なEvidence Strength / Applicability / Counter-evidence / Project Validationの考え方は [Evidence-first Research](20-evidence-first-research.md#common-rule-promotion--rule-strength) を参照します。

この章ではそのEvidenceを受けて、Rule Budget、既存Owner、Catalog / Checklist / Project側のどこへ配置するか、重複削減、Compatibilityを確認します。

Rule Strengthは [Guide Governance](00-governance.md#ルールの強さ) を正本とし、この章へ定義を複製しません。

## 自動更新してよい範囲

低Riskで根拠が明確なGuide変更は、Validation成功を条件に直接更新できます。

例:

- Reference URL更新
- 誤記修正
- Catalog相互Link追加
- 既存Ruleの説明補強
- 実例 / Evidence追加
- Checklistの明確化
- 重複説明をOwner DocへのLinkへ置換

## Branch / Proposalを優先する変更

次は影響が大きいため、Branch / Pull Requestまたは明示的Proposalを優先します。

- MUSTの追加・削除
- Governance / Source of Truth / Rule Budget変更
- 制作優先順位変更
- Storage / Deployment Default変更
- 既存Projectへ大規模Migrationを要求
- GitHub Pages / Electron基本方針の反転
- 全Projectへ固定Visual Styleを強制

## 更新時に同時確認するもの

必要に応じて次を更新します。

- `guide-version.json`
- `CHANGELOG.md`
- `作業報告書.md`
- Owner Doc
- README / START HEREのRouter
- Catalog / Checklist / References
- `maintenance/review-policy.json`
- `maintenance/DEEP_SYSTEM_AUDIT.md`
- Validator

Versionを上げる必要がない軽微な誤字修正等は例外です。

## Validation

変更後はGuide Validatorを**最終Commit**で通します。

Validatorだけで重複内容の意味までは完全に判定できないため、Rule Hygiene / Deep System Auditは人間 / AI Reviewも併用します。

## No Change / No Commit

定期Reviewの目的はCommit数やRule数を増やすことではありません。

- 新しい知見がなければ変更しない
- 同じ内容の言い換えだけでVersionを上げない
- 新Ruleを追加せず、重複削除だけを行うReviewも有効

## Review Result

意味のある変更では最低限次を記録します。

- 何を調べたか
- どのProject / Sourceから得たか
- 追加 / 統合 / 削除したRule
- Owner Docをどこにしたか
- なぜCommon Rule化したか
- Compatibilityへの影響
- Human / Machine Router parityで確認した代表Case
- Validatorへ追加したRegression Guard
- Repository metadata /設定で未修正のもの
- Validation結果

何も変更しなかった場合、空の報告Commitを作る必要はありません。
