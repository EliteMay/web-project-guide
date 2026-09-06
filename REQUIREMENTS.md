# web-project-guide 要件定義

この文書は `EliteMay/web-project-guide` 自身の**現在のProject Contract**です。

Common Rule本文は `docs/` の各Owner Docを正本とし、この文書へ詳細ルールを複製しません。実装済み改善の履歴は `CHANGELOG.md`、直近作業は `作業報告書.md`、詳細差分はGit履歴を参照します。

過去にこのファイルへ蓄積されていた「確定済みGuide改善要件」は、実装済みのものについては現在のOwner Doc / CHANGELOG / Git履歴へ役割を戻しました。Ruleそのものを削除したわけではありません。

## 0. Guide / Project Profile

- Guide Versionの正本: `guide-version.json`
- Primary Profile: `TOOL`
- User-facing UI: No
- Visual Quality Baseline: Not applicable

このRepository自身の採用Versionを固定値として重複記録しません。現在Versionは `guide-version.json` だけを正本とします。

## 1. 目的

`web-project-guide` は、個人向けWebサイト / Webアプリ / Electronアプリ / Browser Game等の制作で、毎回ゼロから判断したり同じ失敗を繰り返したりしないための共通Guide + 制作運用基盤とします。

主目的:

- Web / Electron / Game制作の共通判断基準を1か所へ整理する
- ChatGPT / Coding Agentが今回必要なRuleだけを確実に読めるようにする
- Project固有仕様とCommon Guideを混在させない
- 同じ判断のSource of Truthを複数作らない
- Rule / Template / Checklist / Catalogを増やしすぎない
- 過去の失敗・成功・ResearchをEvidenceとして再利用する
- Human Router / Machine Router / Owner Doc / Template / Validatorを1つのSystemとして整合させる
- 「実装した」だけでなく必要なValidationまで含めて完成を判断する

## 2. 使用者・公開範囲

### Primary

- Repository owner
- ChatGPT / Codex / Claude / Copilot等のCoding Agent

### Secondary

- 共同開発者
- 将来Projectを見返すRepository owner

### 利用環境

- 主入口: GitHub Repository
- 閲覧: GitHub Web UI / clone / Coding AgentからのRepository read
- Offline: clone済みDocumentationの範囲で利用可能

## 3. Repositoryの責任範囲

### 担当する

- Governance / Source of Truth / Rule Budget
- 作業種類・Risk Signalから必要Owner Docへ到達するRouting
- Architecture / Data / UI / Performance / Security / Testing等の共通判断
- GitHub Pages / Electron / Game / AI-assisted development等の共通Workflow
- Templates / Checklist
- Failure / Success / Anti-Pattern / Visual Evidence Catalog
- Evidence-first Researchの共通Method
- Guide自身のDeep System Audit / Rule Hygiene
- Validator
- Guide Version / CHANGELOG /直近作業報告
- Coding AgentがCurrent Repositoryを基準に安全に作業するための入口

### 原則として担当しない

- 個別GameのGame Design
- 個別学習サイトの教材本文
- Site固有画面一覧
- Site固有Storage Schema / Key
- Project固有Visual Direction
- Project固有Bug履歴
- 特定Repositoryだけに必要なRule
- 各Projectの自動書換え
- 全Repositoryの常時監視
- 特定Visual Styleの全Projectへの強制

Project固有情報は対象RepositoryをSource of Truthとします。

## 4. Core Structure

| 対象 | 役割 | 正本 |
|---|---|---|
| `README.md` | Guide概要 / 最短入口 | README |
| `START_HERE.md` | 人間向け作業Router | START_HERE |
| `docs/00-21` | Common Rule / Behavioral Owner | 各Owner Doc |
| `maintenance/rule-router.json` | Machine-readable Routing | Router JSON |
| `maintenance/review-policy.json` | Review / Deep Audit機械設定 | Review metadata |
| `maintenance/DEEP_SYSTEM_AUDIT.md` | Deep Audit実行Checklist | `docs/14`の実行補助 |
| `templates/` | Projectで使う雛形 / 実行Checklist | 各Template |
| `catalog/` | Failure / Success / Anti-Pattern等のEvidence | 各Catalog |
| `references/` | Research / Pilot / Standards /非Normative Evidence | 各Reference |
| `tests/` | Guide Validator | Test implementation |
| `guide-version.json` | Guide Version | Version metadata |
| `CHANGELOG.md` | Release単位の長期変更履歴 | CHANGELOG |
| `作業報告書.md` | 直近作業・未確認事項 | Work Report |
| Git history | 詳細な変更履歴 | Git |

`maintenance/DEEP_SYSTEM_AUDIT.md`はNormative Ownerではありません。Deep AuditのBehavioral Ruleは`docs/14-continuous-improvement.md`を正本とします。

## 5. 主要利用フロー

### 通常のWeb / Electron / Game制作

```text
User Request
↓
Current Repository / User Intent確認
↓
Rule Routing / Preflight
↓
今回必要なOwner Docだけ読む
↓
対象ProjectのRequirements / Spec / Rules / Learnings /実装を必要範囲で確認
↓
Research / Requirements / Implementation
↓
Testing / Browser / Visual / Playtest等を必要範囲で実施
↓
必要なDocumentation更新
↓
Cleanup後の最終状態を確認
```

RoutingのBehavioral Contractは `docs/21-rule-routing-preflight.md`、機械Routeは `maintenance/rule-router.json` を正本とします。

### Guide改善

```text
Current main / User Intent確認
↓
Guide改善としてPreflight
↓
既存Ownerで表現できるか
↓
Project固有 / Catalog / Checklist / Referenceで扱うべきか
↓
本当にCommon Ruleが必要な場合だけOwnerへ統合
↓
重複 / Orphan / 古いRule /旧Copyを同時に整理
↓
Human Router / Machine Routerを代表Caseで比較
↓
Validatorへ機械化可能なRegression Guardを追加
↓
最終Diff / PR Head / Merge後mainを確認
```

大規模なGuide見直しでは `docs/14-continuous-improvement.md` と `maintenance/DEEP_SYSTEM_AUDIT.md` を使い、File単位ではなくSystem単位で点検します。

## 6. Source of Truth

仕様・指示が衝突した場合の共通原則は `docs/00-governance.md` を正本とします。

Project作業では概ね次を優先します。

1. 現在の明示的User要求
2. 対象Projectの崩してはいけない仕様
3. Current Runtime / Code / Data /正式Spec
4. `web-project-guide` のCommon Rule
5. 過去会話 / 古いZIP /古い作業報告 / Memory

Current State確認の詳細は `docs/21-rule-routing-preflight.md` を参照します。

## 7. Rule Preservation / Information Architecture

### MUST: Ruleを整理するとき、意味を失わない

肥大化対策として文章を削る場合、次のいずれかを満たします。

- 同じ意味の正本が別Ownerへ存在し、Linkへ置き換える
- 実装済みRequirementであり、Current RuleがOwner Docへ反映済み
- Historyであり、CHANGELOG / Work Report / Git履歴へ役割を移す
- Project固有Evidenceであり、Project側またはReference / Catalogへ移す
- 既に不要・誤り・過剰設計と判断でき、削除理由が作業記録に残る

Ruleを短くすること自体を目的にしません。ChatGPT / Coding Agentが作業時に必要なRuleへ確実に到達できることを優先します。

Rule移動時は**新Ownerへ存在することだけでなく、旧Ownerの詳細Copyが残っていないこと**まで確認します。

### SHOULD: 大きい文書は責務で分ける

単純な文字数だけで分割しません。次の場合は分割を検討します。

- 1 Fileで複数のNormative responsibilityを持つ
- Current ContractとHistoryが混在する
- Routerと詳細Ruleが混在する
- Common RuleとProject固有Evidenceが混在する
- 全体を読まないと必要箇所へ到達できない

## 8. Router / Preflight Contract

- Meaningful / Systemic作業では `docs/21-rule-routing-preflight.md` を確認する
- UserがGuideの章番号を知らなくてもAgent側で必要Ruleを選ぶ
- `maintenance/rule-router.json` をMachine-readable Routing正本とする
- `START_HERE.md`はHuman Summaryとし、詳細Routingの第二正本にしない
- Required DocはCurrent Guide Revisionから実際に読む
- Meaningful Visual Change / Researchable Question / Storage Migration / Game Completion等のStable Gateを必要時に発火する
- 小さなBugや文言修正へFull Guide / Deep Researchを機械的に要求しない
- 作業途中でScope / Riskが変われば追加OwnerへRe-routeする
- 重要なHuman RouteとMachine Routeは同じ代表TaskでParity確認する
- Owner Registryへ登録した重要Docを実質到達不能にしない

Guide自身のDeep Review、Storage Migration、Meaningful Visual Change、Game主要Flow、Cross-Repository GitHub Infrastructure等、見落としCostが高いCaseはGolden Routing Caseで守ることを優先します。

初期Routing実装は意図的に小さく保ちます。専用Session DB、永続Receipt、複雑なRisk Score、巨大なResolver Frameworkは実運用で必要性が確認されるまで必須にしません。

## 9. History Contract

### `REQUIREMENTS.md`

現在守るProject Contractだけを持ちます。実装済み改善要求を履歴として延々残しません。

### `CHANGELOG.md`

Version単位の変更概要を持ちます。

### `作業報告書.md`

直近作業の目的、変更、Validation、未確認を中心にします。長期Archiveにしません。

### Git history

詳細差分・過去実装の最終Archiveです。

この分離により、過去ルールを失わずCurrent Source of Truthを読みやすく保ちます。

## 10. Templates / Checklist Contract

- TemplateはRule本文の正本にしない
- RequirementsはCore Template + Conditional Requirement Packで構成し、Projectに該当するPackだけ利用する
- Requirements PackはProject固有Decision / Inputを中心にし、Owner Rule本文を再掲しない
- Quality ChecklistはCore + Conditional Routing +短いPass / Fail確認を中心にし、Owner Docの説明を複製しない
- READMEはProject入口 / Source of Truth Routerを中心にする
- SpecはCurrent Technical Contractを中心にし、Requirement Decisionを複製しない
- Project RulesはProject固有Override / Exceptionだけを持つ
- AGENTSはAgent Routerとして使い、Spec / Requirements / Common Rule本文を丸ごと複製しない

新しいProfile固有Sectionが増える場合、Core Templateへ直接積む前にConditional Packへ収められるか確認します。

## 11. Catalog / Reference Contract

### Catalog

Failure / Success / Anti-Pattern / Visual DirectionはEvidenceと再利用条件を持ちます。

Normative Rule本文はOwner Docへ置き、CatalogではRuleを再定義しすぎません。

### References

外部Research、Working Hypothesis、Named Project Pilot、時点依存Snapshot等の非Normative Evidenceを保存できます。

- 個別Project固有の最終RequirementはCommon Referenceだけに残さず対象Projectへ保存する
- Named ProjectのPilot結果や当時のFile一覧をCommon Ownerの恒久Ruleとして固定しない
- 古いReferenceをCurrent Stateの代用にせず、適用時はCurrent Repository /公式Sourceを再確認する
- Common Ownerへ移すのはEvidenceから一般化できたBehaviorだけにする

## 12. Validator Contract

ValidatorはGuide品質の完全な代替ではありません。

優先して自動確認するもの:

- 必須File / JSON構文
- Markdown相対Link
- Owner Doc / Router参照整合
- Owner Registryの実質到達性
- Work Type / Domain / Signal / Gate参照整合
- Gate ID一意性
- Guide Version / CHANGELOG整合
- Catalog ID整合
- 代表Golden Routing Case
- Conditional Template / ChecklistのRouting整合
- Deep System Audit Procedureの到達性
- 明確なProject-specific Evidence leakage Regression Guard

文章の特定フレーズを大量に固定し、自然な書き換えを壊すTestへ寄せすぎません。

Semantic duplicationの完全自動判定を目指して巨大なRule Engineを作らず、機械化できない意味重複はDeep System Auditで確認します。

## 13. Deep System Audit Contract

Guide自身を大きく点検する場合は、Current Repositoryを「まだ低品質かもしれない」という仮説から確認し、過去の修正報告を品質Evidenceの代用にしません。

最低限次を横断照合します。

- Entry / Source of Truth
- Normative Owner topology
- Human / Machine Router parity
- Template / Checklist drift
- Semantic duplication
- Machine-readable Schema / Validator coverage
- History / Project-specific Evidence leakage
- Repository metadata / Workflow / Final-state operations

実行Checklistは `maintenance/DEEP_SYSTEM_AUDIT.md`、Behavioral Ownerは `docs/14-continuous-improvement.md` とします。

## 14. 完成条件

このGuideは少なくとも次を満たす状態を目標とします。

- [ ] README / START_HEREから必要なOwnerへ短く辿れる
- [ ] Meaningful作業ではRule Routing / Preflightが使える
- [ ] Human / Machine Routerの重要Routeが代表Caseで一致する
- [ ] Owner Registryの重要DocがRouting上Orphanになっていない
- [ ] 同じ判断のNormative Ownerが原則1つ
- [ ] Rule移動後に旧Ownerの詳細Copyが残っていない
- [ ] Current RequirementsとHistoryが分離されている
- [ ] Project-specific / time-specific EvidenceがCommon Ownerへ恒久Ruleとして混在していない
- [ ] Templates / ChecklistがRule本文の第二正本になっていない
- [ ] Conditional Templateは必要なProjectだけ読める
- [ ] Guide Versionが一元管理されている
- [ ] Validatorが構造上の重大driftを検出できる
- [ ] Deep System AuditをCurrent Revisionから再実行できる
- [ ] 既存Ruleを整理しても意味が失われていない
- [ ] 重大な既知矛盾がない
- [ ] 未確認事項が作業報告に明示されている

## 15. 非目標

- Guideを短くするためだけに有用Ruleを削除する
- 全作業へ全章を適用する
- 全Projectを同じArchitecture / Visual / Storageへ揃える
- Rule EngineそのものをProduct化する
- Semantic duplicationを完全自動判定する巨大Analyzerを作る
- Common Guideへ各Projectの詳細仕様・作業履歴を集積する
- CI成功だけでGuide品質・Project完成を保証したとみなす

## 16. Implementation Handoff

- Requirements Status: Ready for implementation
- Information Architecture cleanup: Implemented
- Template / Checklist responsibility split: Implemented
- Deep System Audit workflow: Implemented
- Human / Machine routing parity guard: Implemented
- Unresolved Core Decisions: None
- Unresolved High-cost Decisions: None

今後新しい大規模Guide改善要件が生じた場合、Current Contractへ履歴として混ぜ込まず、必要ならIssue / ADR /一時Draftで検討し、確定・実装後にCurrent Contractへ必要な恒久Ruleだけ反映します。
