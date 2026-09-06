# web-project-guide 要件定義

この文書は `EliteMay/web-project-guide` 自身の**Current Project Contract**です。

Common Rule本文は`docs/`の各Owner Docを正本とし、このFileへ詳細Ruleを複製しません。Version履歴は`CHANGELOG.md`、直近作業は`作業報告書.md`、再発防止知識は`PROJECT_LEARNINGS.md`、詳細差分はGit history / PRを参照します。

## 0. Guide / Profile

- Guide Versionの正本: `guide-version.json`
- Primary Profile: `TOOL`
- User-facing UI: No
- Visual Quality Baseline: Not applicable

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

## 2. 使用者 / 利用環境

Primary:

- Repository owner
- ChatGPT / Codex / Claude / Copilot等のCoding Agent

Secondary:

- collaborators
- future repository review

主入口はGitHub Repositoryです。Current GitHub状態をold conversation / ZIP / memoryより優先します。

## 3. Repository Scope

### 担当する

- Governance / Rule Budget
- Requirements / Decision / Persistence
- Architecture / Data / UI / Performance / Security / Testing
- GitHub Pages / Electron / Game / Research
- Project Management / Conversation Handoff
- Routing / Preflight
- Templates / Checklist
- Catalog / References
- Project Feedback / Continuous Improvement / Deep Audit
- Validator / Guide version / release history

### 原則担当しない

- individual projectの詳細仕様
- site-specific screen list / storage key / data schema
- individual game design
- learning content本文
- project-specific visual direction
- project-specific bug history
- all repositoriesのautomatic rewrite / continuous monitoring
- fixed visual styleの全Project強制

Project固有情報はTarget RepositoryをSource of Truthとします。

## 4. Current Structure

| Surface | Responsibility |
|---|---|
| `README.md` | shortest guide entry / owner map |
| `START_HERE.md` | Human Router |
| `docs/00-22` | Common Normative Owners |
| `maintenance/rule-router.json` | Machine-readable routing |
| `maintenance/review-policy.json` | Review metadata |
| `maintenance/DEEP_SYSTEM_AUDIT.md` | Deep audit execution checklist |
| `maintenance/audits/` | Non-normative audit result history |
| `templates/` | Project input / handoff / execution templates |
| `catalog/` | Failure / Success / Anti-pattern / visual evidence |
| `references/` | Non-normative research / project-specific evidence |
| `tests/` | Guide validator |
| `guide-version.json` | Current Guide Version |
| `CHANGELOG.md` | Release history |
| `作業報告書.md` | Current / recent work state |
| `PROJECT_LEARNINGS.md` | Accumulated recurrence knowledge |
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
5. old conversation / ZIP / Work Report / memory

Current RequestがExisting Data / important compatibility / irreversible behaviorへ影響する場合も、単にUserへ投げ返すのではなくCurrent Contract / Evidence / safe alternativeを先に確認します。

## 7. Agent Autonomy Contract

Decision behaviorの正本は`docs/01-requirements.md`です。

- Best Reasonable DecisionをDefaultにする
- Repository / Requirements / Existing User Intent / Researchで解けることを再質問しない
- Core / High-costというLabelだけで回答待ちにしない
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

## 9. Rule Preservation / Information Architecture

Rule整理で意味を失いません。

削除 /移動は少なくとも次のどれかに根拠を持ちます。

- same meaningのNormative Ownerへ統合
- HistoryをCHANGELOG / Work Report / Gitへ移動
- project-specific evidenceをReference / Project Learningsへ移動
- duplicate / obsolete / incorrect / overdesigned ruleを理由付きで退役

Rule moveはDestination + Source cleanupを1つのCompletion Conditionにします。

単なる文字数ではなく**複数Normative responsibility**がある場合にOwner splitを検討します。

## 10. Routing Contract

- Meaningful / Systemic workはPreflight
- Current RevisionのRequired Ownerを実際に読む
- Human / Machine Routerの重要RouteをParity確認
- Registered Ownerをunreachableにしない
- Scope / Risk変化でRe-route
- local bugへFull Guide / Deep Researchを強制しない
- conversation handoff / stale checkpointは`docs/22`へRouting

Router infrastructureは必要以上に巨大化しません。

## 11. Templates / Checklist

- TemplateはRule本文の正本にしない
- Requirements = Core + Conditional Packs
- Quality Checklist = Core + Conditional Routing + short pass/fail checks
- README Template = Project entry / SOT Router
- Spec = Current Technical Contract
- Project Rules = project-specific override / exception
- AGENTS = Agent Router
- Conversation templates = Current Repository / formal documentへ到達するRouter

## 12. Catalog / Reference / Learnings

### Catalog

Generalizable Failure / Success / Anti-pattern / visual evidenceを保存します。Normative RuleはOwnerへ置きます。

### Reference

Research / named project pilot / time-specific snapshot等のnon-normative evidenceを保存できます。Current Project Stateの代用にはしません。

### PROJECT_LEARNINGS

`web-project-guide`自身で起きた再発価値の高いFailure / Successを**継続蓄積**します。

最低限:

- what happened
- root cause
- final fix
- detection / regression guard
- prevention / next-time hint

一般化後もProject側Learningを無条件削除せず、resolved / promoted等の状態を残せます。

## 13. Deep System Audit Contract

Normative Ownerは`docs/14-continuous-improvement.md`、execution checklistは`maintenance/DEEP_SYSTEM_AUDIT.md`です。

Deep Auditでは:

- Current Routerから全Ownerを動的取得
- OwnerをCoverage / Gap / Duplication / Rule-Research separation / Decision quality / Failure evidenceで棚卸し
- Structural / Rule / Research / Evidence / Repository Operation Gapを分類
- Human / Machine parity
- Template / Checklist drift
- Security / Platform等のcurrent external evidence
- Repository workflow / branch lifecycle / metadata

を確認します。

**Score targetを終了条件にしません。** Current scopeとEvidenceでknown actionable findingを意図的に残さないことをCompletion Conditionとします。

Audit resultは`maintenance/audits/`へ保存し、このRoot Requirementsへ一時Backlog / score tableを積みません。

## 14. Validator / Self-application

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

Prose wordingを大量固定しません。

Guide自身も自分のRuleを可能な範囲でself-applyします。

## 15. History Contract

- Requirements — Current Contract
- CHANGELOG — release history
- Work Report — current/recent work + validation + unverified
- Project Learnings — accumulated recurrence knowledge
- Audit Reports — point-in-time audit evidence / gap resolution
- Git / PR — detailed archive

## 16. Completion Contract

このGuideはCurrent scopeで少なくとも次を満たす状態を目標とします。

- [ ] README / START_HEREから必要Ownerへ短く辿れる
- [ ] Machine RouterとHuman Routerの重要Routeが一致
- [ ] Registered Ownerがreachable
- [ ] same normative decisionの競合Ownerがない
- [ ] Root RequirementsがRule本文 / audit backlog化していない
- [ ] Template / Checklistが第二Rule本文でない
- [ ] Requirements persistenceが実行可能
- [ ] Agent autonomyがOwner / Templateで一貫
- [ ] Security / Electron等high-risk Ownerに重大Known Gapがない
- [ ] Project-specific evidenceがCommon Ownerへ混入していない
- [ ] PROJECT_LEARNINGSへrecurrence knowledgeを蓄積できる
- [ ] Guide workflowが自分のsupply-chain ruleを可能な範囲でself-apply
- [ ] Validatorが重大Structural driftを検出
- [ ] Deep Auditでknown Critical / High actionable findingが残らない
- [ ] Medium in-scope findingもfixまたは正当なevidence-deferred理由がある
- [ ] Final PR / merged mainのValidationを確認
- [ ] Tool / permission外の項目は具体的なmanual follow-upとして明示

## 17. Non-goals

- ShortenのためだけにRule削除
- 全作業へ全章適用
- 全Projectをsame architecture / visual / storageへ統一
- Rule Engine自体をProduct化
- Common Guideへindividual project historyを集積
- CI successだけでQuality保証
- 「90点」等のarbitrary scoreだけでDeep Audit終了

## 18. Implementation Handoff

- Requirements Status: Ready for implementation
- Information Architecture cleanup: Implemented
- Template / Checklist responsibility split: Implemented
- Deep System Audit method: Implemented
- Exhaustive owner audit / remediation: In progress until current audit PR is merged and validated
- Blocking Decisions: None

Current auditの一時Finding / score /修正Statusは`maintenance/audits/`を参照します。
