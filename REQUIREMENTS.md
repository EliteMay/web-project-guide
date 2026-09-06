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
- User Goal / TaskからIA / Navigation / Flow / Stateへ落とすStructure / Flow Research Workflow
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
- Site固有Sitemap / Navigation / User Flow / State Matrix
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
| `docs/00-22` | Common Rule / Behavioral Owner | 各Owner Doc |
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
- MeaningfulなIA / Navigation / Task Flowは`STRUCTURE_FLOW` Domainで`docs/22`へRouteし、専用Stable Gateを機械的に増やさない
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
- Task-first Structure / Flow Research owner: Implemented
- Unresolved Core Decisions: None
- Unresolved High-cost Decisions: None

今後新しい大規模Guide改善要件が生じた場合、Current Contractへ履歴として混ぜ込まず、必要ならIssue / ADR /一時Draftで検討し、確定・実装後にCurrent Contractへ必要な恒久Ruleだけ反映します。

## 17. Phase 0 — Guide全体棚卸し Contract

ResearchやCommon Ruleをさらに増やす前に、Current Guide全体のCoverage / Gap / Duplication / Decision Quality / Failure Evidenceを体系的に棚卸しできる状態を持ちます。

目的は文章量を増やすことではなく、**どこが弱く、なぜ弱く、どう直し、何をResearchすべきかをGuide全体として把握すること**です。

### Primary Audit

Current RepositoryでOwnerとして登録されている全Owner Docを対象とします。現在の番号範囲やOwner数を固定値として盲信せず、README / Governance / Machine Router等のCurrent Stateから対象を解決します。

### Secondary Audit

以下はOwnerと同一採点にはしませんが、Normative duplication / role drift / routing不整合の監査対象とします。

- `README.md`
- `START_HERE.md`
- `maintenance/rule-router.json`
- `catalog/`
- `references/`
- `templates/`
- Quality Checklist
- Validator
- その他Machine-readable設定

### Owner Audit Axes

各Ownerを最低限次の6軸で評価できることを要求します。

1. `Coverage`
2. `Gap Coverage`
3. `Duplication`
4. `Rule / Research Separation`
5. `Decision Quality`
6. `Failure Evidence`

Coverageは文書量ではなく、そのOwnerが担当する主要Decisionを実際に判断できるかで評価します。

### Score / Overall

各評価軸は原則0〜3で記録します。

- `3` — Strong
- `2` — Mostly sufficient
- `1` — Weak
- `0` — Major problem

単純合計だけで品質を決めません。重大なSecurity / Data / Migration / Release / Accessibility / Operability GapやRule Conflictを平均点より優先します。

Owner全体のOverallは以下を使用できます。

- `A — Healthy`
- `B — Minor Improvement`
- `C — Improvement Needed`
- `D — Structural Problem`

### Decision Quality

重要なRuleについて、必要に応じて次が判断可能か確認します。

```text
Trigger
↓
Decision Criteria
↓
Action
↓
Exception / Trade-off
↓
Validation
```

全Ruleを同一Templateへ変換することは目的にしません。「このケースではどちらを選ぶべきか」を合理的に判断できることを基準にします。

### Failure Evidence

Failure Evidenceは次のLevelで整理できます。

- `F0` — Failure Evidenceなし
- `F1` — 想定Failureのみ
- `F2` — 実Project / Postmortem / 外部実例あり
- `F3` — Failure → Root Cause → Rule → Regression Guardまで追跡可能

すべてのRuleをF3にすることは要求しません。SecurityやData loss等では強い公式Evidenceを利用できます。

### Gap Classification

Findingは最低限以下へ分類します。

- `Rule Gap` — 判断方法は分かっているがGuideへ十分書かれていない
- `Research Gap` — 正しい判断方法自体がまだ不明確
- `Evidence Gap` — Ruleはあるが根拠 / Failure / Applicabilityが弱い
- `Structural Gap` — Owner責務 / Routing / 配置 / 重複等の構造問題

Rule不足をResearch不足として扱わず、Research GapだけをResearch Backlogへ送ります。

### Finding Action / Severity / Research Priority

Findingには必要に応じて次のActionを付けます。

- `KEEP`
- `CLARIFY`
- `EXPAND`
- `MOVE`
- `MERGE`
- `SPLIT`
- `REMOVE`
- `RESEARCH`
- `ADD EVIDENCE`
- `ROUTE FIX`

SeverityはFinding自体の重大度として `Critical / High / Medium / Low` を使います。

Research PriorityはResearch Gapだけに付け、`P0 / P1 / P2 / None`を使用します。SeverityとResearch Priorityを混同しません。

### Cross-Owner Audit

個別Owner監査後は少なくとも次を横断確認します。

- Normative Rule重複
- Rule Conflict
- Owner不在Topic
- 責務が広すぎる / 実質責務がないOwner
- Router不整合
- README / START_HEREでのRule再定義
- Checklist-only / Template-only / Reference-only Rule
- ResearchのNormative Rule化
- Owner本文へのResearch過剰混入
- Catalog Failure未反映
- History / Current Contract混在
- Project固有Rule混入
- 古いPlatform / Version固有情報
- 不要Rule
- MUST / SHOULD / CONDITIONAL強度の不適切さ

### Audit Baseline / Finding Evidence

Audit開始時は最低限次を記録し、原則としてそのRevisionをAudit Baselineとして最後まで評価します。

- Repository
- Commit SHA
- Guide Version
- Audit Date
- Owner Count

Findingは点数だけでなく、最低限次を追跡可能にします。

- Finding
- 対象File / Section
- 問題内容
- なぜ問題か
- Gap分類
- Severity
- Action
- Research Priority（Research Gapのみ）

同一Root Causeによる複数Fileの重複は、件数を水増しせずDuplication Clusterとしてまとめられます。

### Audit Result / Research Flow

Audit結果はCurrent `REQUIREMENTS.md`へ履歴として積みません。`maintenance/audits/`等のCurrent Guide構造に適した場所へAudit Reportを保存し、最低限次を含めます。

- Audit Snapshot
- Owner Audit Matrix
- Gap Register
- Duplication / Conflict Map
- Action Backlog
- Research Priority Map
- Phase 0 Summary

External Deep ResearchはPhase 0の主目的にしません。分類に必要な最小限の事実確認を除き、Research Gapを特定してからPhase 1以降へ送ります。

### Phase 0 Non-goals

- Ownerを同じ文章量へ揃える
- 不足をすべてCommon Rule追加で解決する
- 新Ownerを安易に増やす
- Failureを数合わせで追加する
- Score改善のためだけに追記する
- Audit中に無計画な全面Rewriteを行う
- Research件数を増やすこと自体を成果にする

### Phase 0 Completion

少なくとも以下を満たす状態をPhase 0完了とします。

- 全Current Owner監査済み
- 全Ownerの6軸評価とScore理由あり
- Cross-Owner / Secondary Structure Audit済み
- Findingに根拠がある
- Gapが4分類されている
- FindingにSeverity / Actionがある
- Research GapだけにP0 / P1 / P2が設定されている
- Audit Baselineが記録されている
- Guide全体の強い領域 / 弱い領域 / 偏りを説明できる
- 次のStructural CleanupとResearch順序をAudit結果から決定できる

## 18. Requirements Persistence Contract

対象Repositoryが存在する要件定義では、**会話上でDecisionがまとまっただけではRequirements Completeと扱いません。**

### Requirements Persistence Gate

標準Flowは次とします。

```text
Requirements discussion / decision
↓
Target Repositoryを解決
↓
Current REQUIREMENTS.mdを取得
↓
確定内容をCurrent Contractとして統合
↓
Repositoryへ保存
↓
Current Repositoryから再取得して保存結果を確認
↓
Requirements Complete
↓
Implementation Handoff
```

`Decision complete ≠ Requirements complete` とします。

GitHub等のCurrent Source of Truthへ書き込み可能であり、対象RepositoryとRequirements Source of Truthが明確な場合、Userが毎回「保存して」と指示することを前提にしません。Requirements保存は要件定義Workflowの一部です。

要件定義の個別決定・一時Discussionをそのまま履歴として`REQUIREMENTS.md`へ積み上げず、Current Contractとして必要な恒久内容だけ統合します。

### Implementation Handoff

RequirementsがRepositoryへ保存済みの場合、次の実装会話へ要件全文を巨大Promptとして再掲することを標準にしません。

Implementation側はCurrent Repositoryを確認し、Current `REQUIREMENTS.md`を正式なSource of Truthとして読むことを基本とします。過去Conversationや手作業で再構成したPromptを第二のRequirements正本にしません。

### Persistence Verification

保存後は最低限次を確認します。

- Current `REQUIREMENTS.md`を再取得できる
- 今回確定した主要Contractが存在する
- 既存Current Contractを不必要に失っていない
- History / temporary discussionをCurrent Contractへ混在させていない

Requirements Persistence Gateを通る前に「要件定義完了」「実装準備完了」と確定しません。

## 19. Agent Autonomy / User Confirmation Contract — Pending Implementation

現行Owner Docに存在する、Core Decision / High-cost Decision等でUser回答待ちを標準停止条件とするRuleは見直し対象です。

新しい方向性は、Userへの質問・承認待ちを通常Workflowの標準停止条件にせず、以下を基準にBest Reasonable Decisionで継続することです。

```text
Current Repository
+ Current Requirements
+ Existing User Intent
+ Evidence
+ Compatibility / Risk
↓
Best Reasonable Decision
↓
必要なAssumption / Riskを記録
↓
作業継続
```

Repository確認やResearchで解決できる内容を最初からUserへ投げ返しません。

この変更は`docs/01-requirements.md`だけで完了扱いにせず、`docs/00`、`docs/21`、README、START_HERE、Templates、その他関連参照を確認して矛盾を整理します。

外部System、権限、安全上の要件等で明示的確認が必須な操作は例外です。

このSectionは現時点では**実装待ちのCurrent Requirement**です。Owner Doc側へ反映・Validation後に、恒久RuleをOwnerへ移し、このSectionをCurrent Contractとして必要な最小形へ整理します。

## 20. Phase 1 — Requirements Decision System Research Contract

Phase 1では、個別Frameworkを増やすのではなく、**曖昧なUser Requestから必要十分で検証可能なRequirementへ変換するEnd-to-Endの判断体系**を研究・設計します。

主なNormative Owner候補は `docs/01-requirements.md` とし、一般Research Methodは `docs/20-evidence-first-research.md`、GuideへのRule配置・Promotion / Hygieneは `docs/14-continuous-improvement.md` を維持します。新しいOwner Docは、既存Ownerへ自然に統合できない責務がResearchで確認された場合のみ検討します。

### Phase 1 Goal

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

### Research Domain 1 — Problem Discovery

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

### Research Domain 2 — Scope & Prioritization

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

### Research Domain 3 — Evidence & Validation

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

### Research Domain 4 — Requirement Management

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

### Research Domain 5 — Completion / Observable Done

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

### Research Method / Scope

Phase 1は、Requirements Engineeringだけでなく必要に応じて以下のEvidenceを横断比較します。

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

Research Depthは原則Deep Researchとし、Source件数そのものではなくResearch SaturationとDecision Qualityで終了を判断します。

### Research Output

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

### Agent Autonomy Integration

Phase 1はSection 19のAgent Autonomy / User Confirmation見直しと整合させます。

目標は次のように判断できることです。

```text
AIがCurrent Contextから合理的に決められる
→ Best Reasonable Decisionで進む

Researchで解決できる
→ Researchする

Project固有UnknownをCheap Testで解決できる
→ Prototype / Testする

User Intentなしでは合理的に決められない
→ Userへ確認する
```

Requirements精度向上を理由にUserへの質問数を増やすことを目的にしません。

### Phase 1 Success Criteria

Phase 1完了時は少なくとも次を満たします。

- 5 Domainすべてで実用的なDecision Criteriaがある
- Problem → Outcome → Requirement → CompletionがEnd-to-Endで接続されている
- Featureを `Now / Later / Reject` 等へ根拠付きで分類できる
- MVP BoundaryをCore Outcome基準で判断できる
- Research / Prototype / User確認の使い分けを判断できる
- Research / Prototypeを適切に終了しDecisionへ進める
- Requirement変更をImpact込みでCurrent Contractへ反映できる
- Observable Completion / Verification Methodを作成できる
- Section 19のAgent Autonomy方針と矛盾しない
- Guide全体を過剰Process化しない
- 代表CaseでDecision Modelを通し、合理的な結果になることをValidationする
- Common Rule化すべきFindingだけを選別し、既存Owner責務を壊さない

代表Validation Caseには少なくとも、新規Site、既存SiteへのFeature追加、曖昧な`使いやすくしたい`要求、Feature過多、途中Requirement変更、Completionが曖昧なCaseを含めます。

### Failure Criteria / Non-goals

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
