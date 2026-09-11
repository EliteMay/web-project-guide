# web-project-guide 要件定義

この文書は `EliteMay/web-project-guide` 自身の**Current Project Contract**です。

Common Rule本文は`docs/`の各Owner Docを正本とし、このFileへ詳細Ruleを複製しません。Version履歴は`CHANGELOG.md`、直近作業は`作業報告書.md`、再発防止知識は`PROJECT_LEARNINGS.md`、point-in-time Audit / Project-specific Evidence / Historical Researchは書込み可能なら`EliteMay/web-project-data`、詳細差分はGit history / PRを参照します。

## 0. Guide / Profile

- Guide Versionの正本: `guide-version.json`
- Primary Profile: `TOOL`
- User-facing UI: Yes
- Visual Quality Baseline: Applicable to the public human-facing Guide surfaces

Current Guide VersionをこのFileへ固定値で重複記録しません。

## 1. 目的

`web-project-guide`は個人向けWeb Site / Web App / Electron App / Browser Game等の制作で、毎回同じ判断や失敗を繰り返さないためのCommon Guide + production workflow基盤です。

主目的:

- Common decision criteriaをOwner単位で整理する
- Agentが今回必要なRuleだけへ確実に到達する
- Project-specific contractとCommon Guideを混在させない
- same decisionのSource of Truthを複数作らない
- failure / success / research evidenceを次回へ活かす
- Human Router / Machine Router / Template / Validatorを整合させる
- implementationだけでなくrequired validationまで完成条件に含める
- Current Repository / Evidenceで解ける判断を不必要にUserへ返さない
- 会話が変わってもGitHubからCurrent Stateを復元できる
- 人間向けWeb版からCurrent Ruleの主要Routeへ分かりやすく到達できる
- Current Ruleと保存データを分離し、Public Guideを履歴Repository化しない

## 2. 使用者 / 利用環境

Primary:

- Repository owner
- ChatGPT / Codex / Claude / Copilot等のCoding Agent

Secondary:

- collaborators
- future repository review

Rule本文・Machine Routing・Current ContractのSource of TruthはGitHub Repositoryです。人間が作業内容からRuleを探す入口として公開Web版を利用できます。Current GitHub状態をold conversation / ZIP / memoryより優先します。

## 3. Repository Scope

### 担当する

- Governance / Rule Budget
- Requirements / Decision / Persistence
- Architecture / Data / UI / Performance / Security / Testing
- GitHub Pages / Electron / Game / Research Method
- Task-first Structure / Flow Research
- Project Management / Conversation Handoff
- Routing / Preflight
- Templates / Checklist
- Catalog / Curated Public References
- Project Feedback / Continuous Improvement / Deep Audit Method
- Validator / Guide version / release history
- 人間向けWeb Guide / Rule Finder
- 公開可能な最小Statusだけを扱うParallel Work Dashboard

### 原則担当しない

- individual projectの詳細仕様
- site-specific screen list / storage key / data schema
- individual game design
- learning content本文
- project-specific visual direction
- project-specific Sitemap / Navigation / User Flow / State Matrix
- project-specific bug history
- point-in-time Audit Result / Snapshotの本体
- Project-specific / time-specific Evidenceの本体
- Promotion済みHistorical Research Record / detailed research working stateの本体
- all repositoriesのautomatic rewrite / continuous monitoring
- fixed visual style / fixed Navigation Patternの全Project強制
- Private `web-project-data`の内容を公開Webへ直接露出すること

Project固有情報はTarget RepositoryをSource of Truthとします。保存データは必要に応じて`EliteMay/web-project-data`へ置きますが、Data RepositoryをCurrent Guide / Project Contractの第二Source of Truthにはしません。

## 4. Current Structure

| Surface | Responsibility |
|---|---|
| `README.md` | shortest guide entry / owner map |
| `START_HERE.md` | Human Router |
| `docs/00-23` | Common Normative Owners |
| `maintenance/rule-router.json` | Machine-readable routing |
| `maintenance/review-policy.json` | Review metadata |
| `maintenance/DEEP_SYSTEM_AUDIT.md` | Deep audit execution procedure |
| `maintenance/audits/` | Audit result本体ではなく旧Path互換Pointer / index |
| `maintenance/research/` | Current research execution asset + historical path compatibility pointer |
| `templates/` | Project input / handoff / execution templates |
| `catalog/` | Failure / Success / Anti-pattern / reusable visual evidence |
| `references/` | Common Guideを支えるPublic Curated Research / Reference |
| `index.html` / `rules.html` / `ai-workflow.html` | Public human-facing Guide entry / Rule summary / AI workflow explanation |
| `work-dashboard.html` / `project-dashboards/` / `dashboard-data.json` | Public-safe parallel work status UI / repository-specific dashboard surfaces |
| `DASHBOARD_REQUIREMENTS.md` | Parallel Work DashboardのHuman-facing Current Product Contract |
| `human-guide.css` / `mobile-fixes.css` | Human-facing Guide presentation / responsive support |
| `tests/` | Guide validators |
| `guide-version.json` | Current Guide Version |
| `CHANGELOG.md` | Release history |
| `作業報告書.md` | Current / recent work state |
| `PROJECT_LEARNINGS.md` | Accumulated recurrence knowledge |
| `EliteMay/web-project-data/evidence/` | Audit / Project-specific / time-specific point-in-time evidence |
| `EliteMay/web-project-data/research/` | Historical / working research data |
| Git / PR | Detailed change archive |

## 5. Main Workflow

```text
User Request
↓
Current Repository / User Intent
↓
Rule Routing / Preflight
↓
Required Owner only
↓
Project Source of Truth / Evidence
↓
Research / Decision / Implementation
↓
Required Validation
↓
Documentation / Learning update
↓
Cleanup後のFinal State
```

Routing behaviorは`docs/21-rule-routing-preflight.md`、Machine Routeは`maintenance/rule-router.json`を正本とします。

## 6. Source of Truth / Conflict

共通優先原則は`docs/00-governance.md`を正本とします。

概ね:

1. Current explicit User Request
2. Non-breakable Project Contract / Current Requirements
3. Current Runtime / Code / Data / formal Spec
4. Common Guide
5. old conversation / ZIP / Work Report / Data-side historical evidence / memory

Current RequestがExisting Data / important compatibility / irreversible behaviorへ影響する場合も、単にUserへ投げ返すのではなくCurrent Contract / Evidence / safe alternativeを先に確認します。

## 7. Agent Autonomy Contract

Decision behaviorの正本は`docs/01-requirements.md`です。

- Best Reasonable DecisionをDefaultにする
- Repository / Requirements / Existing User Intent / Researchで解けることを再質問しない
- Core / High-costというLabelだけでUser回答待ちにしない
- Safe / reversible decisionはAssumption / Riskを記録して進められる
- User Decisionはnon-inferable preference、external permission / billing / account action、safe alternativeのないirreversible destructive choice、Evidenceでも解けないmaterial conflict等へ絞る

Template / Project Management / RoutingはこのContractと競合してはいけません。

## 8. Requirements Persistence Contract

Behavioral Ownerは`docs/01-requirements.md`です。

Target Repositoryが一意で書込み可能なRequirements workでは:

- Decisionをformal `REQUIREMENTS.md`へCurrent Contractとして統合する
- old valid contractを理由なく消さない
- conversation historyをRequirementsへ積まない
- write successを確認する
- Current Repositoryから再取得して主要Contract / rule preservationを確認する
- save failureを`Requirements complete`と扱わない

Userが毎回「保存して」と言うことを前提にしません。

## 9. Task-first Structure / Flow Contract

Structure / Flow Researchの正本は`docs/22-task-first-structure-flow-research.md`です。

MeaningfulなIA / Navigation / Task Flowでは:

- Page / Sidebar / Featureを先にTemplate化せずUser Goal / Taskから導く
- Information / Function → IA → Navigation / Flow / State → Page / Viewの関係を考える
- Visual stylingとStructure decisionを分ける
- Project固有のSitemap / Flow / State Matrixは対象Projectへ保存する
- `STRUCTURE_FLOW`だけを理由にVisual Researchを自動要求しない

## 10. Conversation Handoff / Recovery Contract

Conversation移行・Recoveryの正本は`docs/23-conversation-handoff-recovery.md`です。

- Conversation historyをProject Source of Truthにしない
- Requirements途中は必要に応じてDraft、実装途中はBranch / PR / Commit等でCheckpointを残す
- PromptなしでもTarget RepositoryとCurrent work refをEvidenceから一意に復元できれば作業を再開できる
- stale / duplicate active conversationは作成日時でなくGitHub Evidenceで収束する
- Current work refを一意に復元できない場合だけ、その変更経路を`unresolved`として止める
- RecoveryでもRepository / Evidenceで解ける内容をUserへ不必要に質問しない

## 11. Rule Preservation / Information Architecture

Rule整理で意味を失いません。

削除 /移動は少なくとも次のどれかに根拠を持ちます。

- same meaningのNormative Ownerへ統合
- HistoryをCHANGELOG / Work Report / Git / companion Dataへ移動
- project-specific / time-specific evidenceをcompanion Dataへ移動
- reusable public evidenceをCurated Referenceへ統合
- duplicate / obsolete / incorrect / overdesigned ruleを理由付きで退役

Rule moveはDestination + Source cleanupを1つのCompletion Conditionにします。

DataへのEvidence / Research移動では、Current RuleやPublic Referenceまで一緒に消さず、必要な旧Path互換Pointerを残せます。

単なる文字数ではなく**複数Normative responsibility**がある場合にOwner splitを検討します。

## 12. Routing Contract

- Meaningful / Systemic workはPreflight
- Current RevisionのRequired Ownerを実際に読む
- Human / Machine Routerの重要RouteをParity確認
- Registered Ownerをunreachableにしない
- Scope / Risk変化でRe-route
- local bugへFull Guide / Deep Researchを強制しない
- Structure / Flowは`docs/22`
- conversation handoff / stale checkpointは`docs/23`
- 公開Human GuideはCurrent `START_HERE.md`の主要Routeを人間向けに要約し、独自の第二Rule本文を作らない

Router infrastructureは必要以上に巨大化しません。

## 13. Templates / Checklist

- TemplateはRule本文の正本にしない
- Requirements = Core + Conditional Packs
- Quality Checklist = Core + Conditional Routing + short pass/fail checks
- README Template = Project entry / SOT Router
- Spec = Current Technical Contract
- Project Rules = project-specific override / exception
- AGENTS = Agent Router
- Conversation templates = Current Repository / formal documentへ到達するRouter

## 14. Catalog / Reference / Learnings

### Catalog

Generalizable Failure / Success / Anti-pattern / reusable visual evidenceを保存します。Normative RuleはOwnerへ置きます。

### Public Curated Reference

`references/`には、Common Guideを支え、Publicで複数Projectへ直接再利用する価値があるResearch / Standards / Working Hypothesisを置けます。

Project-specific / time-specific Evidence、point-in-time Audit、Promotion済みHistorical Research、詳細なworking research stateは、`EliteMay/web-project-data`へ書込み可能な場合はData側へ保存します。

`research` / `evidence`という名前だけで置き場所を決めず、**Current Public Guideとして再利用するか、保存データか**で分けます。

### PROJECT_LEARNINGS

`web-project-guide`自身で起きた再発価値の高いFailure / Successを**継続蓄積**します。

最低限:

- what happened
- root cause
- final fix
- detection / regression guard
- prevention / next-time hint

一般化後もProject側Learningを無条件削除せず、resolved / promoted等の状態を残せます。

## 15. Deep System Audit Contract

Normative Ownerは`docs/14-continuous-improvement.md`、execution procedureは`maintenance/DEEP_SYSTEM_AUDIT.md`です。

Deep AuditではCurrent RouterからOwnerを動的取得し、Owner coverage / duplication / research separation / decision quality / failure evidence、Human / Machine parity、Template drift、Security / Platformのcurrent evidence、Repository operation等を必要範囲で確認します。

**Score targetを終了条件にしません。** Current scopeとEvidenceでknown actionable findingを意図的に残さないことをCompletion Conditionとします。

`EliteMay/web-project-data`へ書込み可能な場合、Audit result本体は`evidence/YYYY/web-project-guide/audits/`へ保存します。Guide側`maintenance/audits/`は旧Path互換Pointer / Indexとして維持できます。このRoot Requirementsへ一時Backlog / score tableを積みません。

## 16. Validator / Self-application

Validatorは機械化可能なStructural Contractを優先します。

- required files / links
- JSON / schema
- owner reachability
- router keys / gates / golden cases
- version / changelog
- catalog IDs
- template routing
- clear owner leakage marker
- current workflow self-application（例: external Action SHA pin）
- public Human Guideの主要Route / Surface存在
- moved historical pathがCompatibility Pointerとして壊れていないこと

Prose wordingを大量固定しません。

Guide自身も自分のRuleを可能な範囲でself-applyします。

## 17. Research / Evidence Storage Boundary

Current Common Rule / Contractと、Research / Evidenceの保存履歴を分けます。

### Guide側

- Current Common Rule → `docs/`
- Current Guide Contract → `REQUIREMENTS.md`
- Current routing / validation / execution procedure → `maintenance/` / `tests/`
- Publicで複数Projectへ再利用するCurated Research → `references/`
- Current research execution protocol / benchmark asset → 必要な場合のみ`maintenance/research/`

### Data側

`EliteMay/web-project-data`へ書込み可能な場合:

- Audit result / point-in-time finding → `evidence/`
- Project-specific / time-specific evidence → `evidence/`
- Promotion済みHistorical Research Record → `research/studies/`
- Research backlog / detailed working research state → `research/studies/`

Data側の記録はCurrent Common Rule / Current Project Stateの第二Source of Truthではありません。

過去Link互換のため、次の旧Guide PathはPointerとして残せます。

- `maintenance/research/requirements-decision-system.md`
- `maintenance/research/data-storage-decision-system.md`
- `maintenance/research/performance-reliability-decision-system.md`
- `maintenance/research/external-integration-decision-system.md`
- `maintenance/research/content-depth-reinforcement.md`
- `maintenance/audits/`

Root RequirementsへPhase単位のResearch Domain一覧・調査Notebook・Audit tableを積みません。ResearchがCurrent Common Ruleへ昇格する場合は各専門Owner / `docs/20` / `docs/14`等の既存Owner責務を維持し、Current Contractへ必要な恒久結果だけ反映します。

## 18. History / Data Contract

- Requirements — Current Contract
- CHANGELOG — release history
- Work Report — current/recent work + validation + unverified
- Project Learnings — accumulated recurrence knowledge
- Data `evidence/` — point-in-time Audit / Project-specific / time-specific Evidence
- Data `research/` — Historical / working Research Data
- Guide compatibility pointer — old public Guide pathsを壊さないための最小Pointer
- Git / PR — detailed archive

## 18A. Parallel Work Dashboard Contract

Parallel Work DashboardのHuman-facing Current Product Contractは [`DASHBOARD_REQUIREMENTS.md`](DASHBOARD_REQUIREMENTS.md) を正本とします。

最低限、Dashboardは次を満たします。

- Progress / Operational State / Handoff State / Freshnessを混同しない
- Run-level pauseとWorker-level issueを同じ状態として表示しない
- ready countだけでIntegration Worker開始可否を推測せずCurrent Run ContractのIntegration Gateを表示する
- Repository / active Run / Next Action / issueをHuman-firstな優先順で表示する
- Raw status / Branch / technical detailをPrimary UIへ過剰露出しない
- fallback / stale情報をCurrentとしてsilent表示しない
- Public-safe allowlistを維持しPrivate DataをBrowserへ直接露出しない
- RepositoryごとのDashboard stateを分離し、同名Workerの並列更新で混線しない
- Desktop / Mobile双方でPrimary statusとNext Actionを短時間で理解できる

Dashboard固有のpoint-in-time Visual Research本体はData側 `research/studies/web-project-guide/parallel-dashboard-v2-domain-research.md`へ保存します。旧 [`references/parallel-dashboard-v2-domain-research.md`](references/parallel-dashboard-v2-domain-research.md) はCompatibility Pointerで、Current Requirementsの第二Copyにしません。

## 19. Completion Contract

このGuideはCurrent scopeで少なくとも次を満たす状態を目標とします。

- [ ] README / START_HEREから必要Ownerへ短く辿れる
- [ ] Machine RouterとHuman Routerの重要Routeが一致
- [ ] Public Human GuideがCurrent Human Routerの主要Routeと矛盾しない
- [ ] Public Human Guideの主要導線・Responsive・AccessibilityにBlocking Issueがない
- [ ] Parallel Work DashboardでProgress / State / Handoff / Freshnessを人間が誤解なく区別できる
- [ ] Parallel Work DashboardでNext Action / Integration Gate / fallback状態を短時間で判断できる
- [ ] Registered Ownerがreachable
- [ ] same normative decisionの競合Ownerがない
- [ ] Root RequirementsがRule本文 / audit backlog / research notebook化していない
- [ ] Template / Checklistが第二Rule本文でない
- [ ] Requirements persistenceが実行可能
- [ ] Agent autonomyがOwner / Templateで一貫
- [ ] Structure / FlowとVisualのOwner境界が一貫
- [ ] Conversation Handoff / RecoveryがProject Managementと分離されている
- [ ] Security / Electron等high-risk Ownerに重大Known Gapがない
- [ ] Project-specific / time-specific evidenceがCommon Ownerへ混入していない
- [ ] Current RuleとHistorical / point-in-time Dataの保存責務が分離されている
- [ ] PROJECT_LEARNINGSへrecurrence knowledgeを蓄積できる
- [ ] Guide workflowが自分のsupply-chain ruleを可能な範囲でself-apply
- [ ] Validatorが重大Structural driftを検出
- [ ] Deep Auditでknown Critical / High actionable findingが残らない
- [ ] Medium in-scope findingもfixまたは正当なevidence-deferred理由がある
- [ ] Final PR / merged mainのValidationを確認
- [ ] Tool / permission外の項目は具体的なmanual follow-upとして明示

## 20. Non-goals

- ShortenのためだけにRule削除
- 全作業へ全章適用
- 全Projectをsame architecture / visual / storage / navigationへ統一
- Rule Engine自体をProduct化
- Common Guideへindividual project history / raw Audit history / research notebookを集積
- CI successだけでQuality保証
- 「90点」等のarbitrary scoreだけでDeep Audit終了

## 21. Implementation Handoff

- Requirements Status: Ready for ongoing implementation
- Information Architecture cleanup: Implemented
- Template / Checklist responsibility split: Implemented
- Task-first Structure / Flow owner: Implemented
- Deep System Audit method: Implemented
- Agent autonomy / User Decision exception: Implemented
- Conversation Handoff / Recovery owner: Implemented
- Exhaustive owner audit / remediation: Historical result archived in companion Data
- Data / Storage Decision System Phase 4: Current decisions implemented in `docs/03` / `docs/07` / Quality Checklist; historical research archived in Data
- Performance / Reliability Decision System Phase 5: Current decisions implemented in `docs/05` / Quality Checklist; historical research archived in Data
- Requirements Decision System: Current decisions implemented in `docs/01`; historical research archived in Data
- Guide / Data research-evidence responsibility split: Implemented in current contract
- Parallel Work Dashboard V2 Human-facing Requirements: Current statusは`DASHBOARD_REQUIREMENTS.md`を再確認
- Blocking Decisions: None known in this contract

Current Auditの一時Finding / score /修正Statusは、Data accessがある場合 `EliteMay/web-project-data/evidence/` を参照し、Current Guide状態は必ずCurrent Repositoryから再確認します。
