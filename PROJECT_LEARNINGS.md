# PROJECT LEARNINGS

このファイルは`web-project-guide`自身の**再発防止価値が高い失敗と成功パターン**だけを残します。

Common Rule本文は`docs/`、Version履歴は`CHANGELOG.md`、直近作業は`作業報告書.md`を正本とし、ここへ複製しません。

## Failure

### PL-F-001 Requirementsが改善履歴帳になった

- Date: 2026-09-06
- Status: resolved
- Severity: high
- Symptom: `REQUIREMENTS.md`が約120KBまで増え、現在Project Contractと実装済みGuide改善要件が混在した。
- Root Cause: Guide改善ごとの詳細設計を実装後もRequirementsへ残し続けた。
- Final Fix: RequirementsをCurrent Contract中心へ戻し、実装済みRuleはOwner Doc、変更履歴はCHANGELOG / Git historyへ委譲する。
- Regression Guard: RequirementsをActive TODO / History Dumpとして使わない。完了した改善要件のRule本文をRequirementsへ残さない。
- Guide candidate: no — Guide自身の自己適用改善として処理済み。

### PL-F-002 Routerが長文化し、Routing判断そのものが自由判断になった

- Date: 2026-09-06
- Status: resolved
- Severity: high
- Symptom: `START_HERE.md`へRouteを追加し続け、AgentがTaskを誤分類すると必要Ownerへ到達しない。
- Root Cause: Human RouterだけにTask ClassificationとRule Applicabilityを依存した。
- Final Fix: `docs/21-rule-routing-preflight.md` + `maintenance/rule-router.json` + Resolver / Golden Casesへ分離した。
- Regression Guard: Meaningful Visual / Researchable / Migration / Game / Securityの代表CaseをRouting testで確認する。
- Guide candidate: no — Common Guideへ直接反映済み。

### PL-F-003 Prose Snapshot型Validatorは内容品質を保証しにくい

- Date: 2026-09-06
- Status: monitoring
- Severity: medium
- Symptom: 特定Phraseが残っていることを大量に検証し、意味が正しくても表現変更で壊れ、逆にPhraseだけ残ればPASSできる箇所がある。
- Root Cause: Semantic Contractを安くGuardするため、文字列一致を積み上げた。
- Current Direction: 既存Validatorは急に全面Rewriteせず、Machine-readable Router / Golden Routing Caseのように構造化できる領域からSemantic寄りのTestへ移行する。
- Regression Guard: 新しいCross-cutting Contractでは可能な限りJSON / Schema / Resolver / Golden Caseを利用する。
- Guide candidate: yes — Testing / Guide Maintenance改善時に継続確認。

## Success

### PL-S-001 Owner本文を残し、入口と履歴だけを整理する

- Date: 2026-09-06
- Goal / Problem: Guide肥大化を直しつつ、過去に考えたRuleを失わない。
- Adopted Pattern: Normative RuleはOwner Docへ残し、README / START_HERE / Requirements / Work Reportから重複説明と履歴を減らす。
- Why it worked: Rule削除ではなく責務移動として整理でき、Coding Agentが読む量も減らせる。
- Trade-off: Git historyやOwner境界を正しく保つ必要がある。
- Reuse when: Documentation中心のSource of Truthが履歴・Router・Checklistの重複で膨張したとき。
- Avoid when: 旧文書にしか存在しない未移行Requirementを確認せず削る場合。
- Guide candidate: yes — Governance / Continuous Improvementの既存Ruleで表現済み。

## Guide Feedback Queue

| ID | Type | Summary | Evidence | Next action |
|---|---|---|---|---|
| GF-001 | improvement | `QUALITY_CHECKLIST.md`のProfile別fragment化が本当に実運用を軽くするか | Checklistが大きい一方、現行Validator・Owner Linkは安定 | 実ProjectでChecklist運用Costが問題化した時に分割を検討 |
| GF-002 | improvement | Project Profileを複数の直交Axisへ再設計すべきか | 現ProfileはPurpose / Runtime / Data / Infrastructure等が混在 | Routing Golden Casesを運用し、組合せ爆発が実害になればRequirements化 |
