# 2026-09-07 Exhaustive Guide Audit

このReportは `web-project-guide` を「既知の改善点が残る限り未完成」と仮定し、全Current OwnerとSecondary Surfaceを同じ基準で棚卸ししたPhase 0 Auditです。

Normative Rule本文ではありません。監査方法の正本は `docs/14-continuous-improvement.md`、実行手順は `maintenance/DEEP_SYSTEM_AUDIT.md` です。

## Audit Baseline

- Repository: `EliteMay/web-project-guide`
- Baseline commit: `31c2f87a2f149db36634df30d6c48c1e732c5918`
- Baseline Guide version: `1.18.0`
- Audit date: 2026-09-07
- Baseline owner count: 22 (`docs/00`〜`docs/21`)
- Secondary surfaces: README / START_HERE / REQUIREMENTS / templates / catalog / references / maintenance JSON / validator / workflow / repository metadata

このBaselineは監査開始時のPoint-in-time Evidenceです。監査中にCurrent mainへv1.19.0 `docs/22-task-first-structure-flow-research.md`が追加されたため、最終Candidateは`docs/00〜23`の24 Owner構成です。

## Scoring

各軸は 0〜3。

- 3: strong
- 2: mostly sufficient
- 1: weak
- 0: major problem

軸:

1. Coverage
2. Gap Coverage
3. Duplication
4. Rule / Research Separation
5. Decision Quality
6. Failure Evidence

Overallは点数だけでなく重大Gapを優先して `A / B / C / D` で付けました。**Scoreは監査停止条件ではありません。**

## Owner Audit Matrix — Baseline

| Owner | Coverage | Gap | Dup | R/R Sep | Decision | Failure | Overall | Baseline finding |
|---|---:|---:|---:|---:|---:|---:|---|---|
| 00 Governance | 3 | 3 | 3 | 3 | 3 | 2 | A | Agent autonomyの停止条件がCurrent requirementと未同期。 |
| 01 Requirements | 3 | 2 | 2 | 3 | 1 | 2 | C | Core / High-costをUser回答待ちにする旧Contract、Persistence責務重複。 |
| 02 Architecture | 3 | 2 | 3 | 3 | 3 | 3 | A | Blocking Gapなし。 |
| 03 Data / Storage | 3 | 3 | 3 | 3 | 3 | 3 | A | Migration / destructive import / resetまで強い。 |
| 04 UI / UX / Accessibility | 3 | 2 | 2 | 2 | 3 | 3 | B | Named Companion Tool運用混入、WCAG 2.2 interaction coverage不足。 |
| 05 Performance / Reliability | 3 | 3 | 3 | 3 | 3 | 2 | A | Soft budget / measurement / exceptionsが明確。 |
| 06 Security | 2 | 1 | 3 | 3 | 1 | 1 | D | AuthN/AuthZ/session/CSRF/CSP/upload/public endpoint abuseが薄い。 |
| 07 Testing / Quality | 3 | 3 | 3 | 3 | 3 | 3 | A | Static / E2E / oracle / final-state / verification stateが整理済み。 |
| 08 GitHub Pages | 3 | 2 | 3 | 3 | 3 | 2 | A | Pages固有責務へ整理済み。 |
| 09 Version / Maintenance | 3 | 3 | 3 | 3 | 3 | 3 | A | Preflight重複解消済み。 |
| 10 Project Management | 3 | 2 | 2 | 3 | 1 | 3 | C | User停止DefaultとConversation Recovery責務の肥大化。 |
| 11 Electron / Distribution | 3 | 1 | 3 | 3 | 2 | 2 | C | Release/Updaterは強いがElectron Security Checklist不足。 |
| 12 Project Profiles | 2 | 2 | 3 | 3 | 2 | 1 | B | 補助分類として有効。 |
| 13 Dependencies / Assets | 3 | 2 | 3 | 3 | 2 | 2 | B | Actions supply-chain pinning補強余地。 |
| 14 Continuous Improvement | 3 | 2 | 3 | 3 | 2 | 3 | B | Deep Audit詳細がRoot Requirementsへ逆流。 |
| 15 Observability / Project Memory | 3 | 2 | 2 | 3 | 3 | 3 | B | PROJECT_LEARNINGSの継続蓄積Contract不足。 |
| 16 Cross-Repository GitHub | 3 | 2 | 3 | 3 | 3 | 2 | B | Guide自身のActionsがmutable tag参照。 |
| 17 Visual Baseline | 3 | 3 | 3 | 3 | 3 | 2 | A | Minimum Gateへ責務限定済み。 |
| 18 Visual Research | 3 | 3 | 3 | 3 | 3 | 2 | A | Domain research / candidate / foundation resetが明確。 |
| 19 Game Development | 3 | 3 | 3 | 3 | 3 | 3 | A | Game-specific responsibilityとして一貫。 |
| 20 Evidence-first Research | 3 | 2 | 3 | 3 | 2 | 2 | B | `100件規模`目安がCount目的化Risk。 |
| 21 Rule Routing / Preflight | 3 | 2 | 3 | 3 | 2 | 3 | B | User確認条件が旧Core / High-cost Contractと未同期。 |

## Gap Resolution Register

| ID | Area | Severity | Final action | Status |
|---|---|---|---|---|
| G-001 | Agent autonomy | High | `docs/01` / `docs/10` / `docs/21` / TemplatesをBest Reasonable Decisionへ統一 | **resolved** |
| G-002 | Requirements Phase 0 detail | High | Audit procedureを`docs/14` + `maintenance/DEEP_SYSTEM_AUDIT.md`へ戻しRoot RequirementsをCurrent Contract化 | **resolved** |
| G-003 | Requirements Persistence detail | Medium | Behavioral ownerを`docs/01`へ統合 | **resolved** |
| G-004 | Web Security | Critical | AuthN/AuthZ / session / CSRF / CSP / file import / abuse / security verificationを`docs/06`へ補強 | **resolved** |
| G-005 | Electron Security | Critical | contextIsolation / sandbox / IPC / navigation / external URL / permission / CSP等を`docs/11`へ補強 | **resolved** |
| G-006 | docs04 named Companion content | High | Generic ruleだけ`docs/04`、named tool EvidenceはReferenceへ分離 | **resolved** |
| G-007 | Research source-count heuristic | Medium | 固定件数を撤去し`Decision Coverage + Research Saturation`へ変更 | **resolved** |
| G-008 | GitHub Actions SHA pinning | High | Guide workflowをfull Commit SHA固定、`docs/16`へself-application可能なContract追加 | **resolved** |
| G-009 | PROJECT_LEARNINGS accumulation | Medium | 長期蓄積・Promotion後もProject Evidenceを保持するContractをOwner / Templateへ追加 | **resolved** |
| G-010 | Branch lifecycle debt | High | Branch lifecycle Ruleを`docs/10`へ追加。既存Branch削除 / repo settingは管理API外としてExternal Follow-upへ分離 | **externally blocked portion only** |
| G-011 | Repository metadata | Low | 推測設定せずExternal Follow-upへ分離 | **external/manual** |
| G-012 | Audit stopping condition | High | Score-only completionを禁止し、known actionable finding + final PR/main validation基準へ変更 | **resolved** |
| G-013 | WCAG 2.2 interaction details | Medium | Focus Not Obscured / Target Size / Dragging / Redundant Entry / Accessible Authenticationを`docs/04`へ追加 | **resolved** |

Current Guide source内に意図的に残しているCritical / High / Medium actionable findingはありません。Repository Admin権限を必要とする項目だけ別Reportで追跡します。

## Responsibility / Conflict Resolution

### Root Requirements

BaselineではPhase 0の採点・Gap分類・Research手順、Phase 1 Research Contract等がRoot `REQUIREMENTS.md`へ逆流していました。

Final Candidateでは:

- Root `REQUIREMENTS.md` = Current Project Contract
- `docs/14` + `maintenance/DEEP_SYSTEM_AUDIT.md` = Deep Audit behavior / procedure
- `maintenance/audits/` = point-in-time finding / score / resolution
- `maintenance/research/requirements-decision-system.md` = 未完了Requirements Decision System Research Asset

へ分離しました。

### Agent Autonomy

Core / High-costというLabelだけでUser回答待ちにせず、Current Repository / Requirements / User Intent / Evidence / Compatibility / RiskからBest Reasonable Decisionを作るContractへ統一しました。

User Decisionはnon-inferable preference、safe alternativeのないirreversible destructive choice、external permission / billing / account action、Evidenceでも解消不能なmaterial contract conflict等へ限定します。

### UI / Visual / Structure

Named Companion ToolのCurrent運用はCommon Owner本文からReferenceへ分離しました。

監査中に別PRでv1.19.0 `docs/22-task-first-structure-flow-research.md`がCurrent mainへ追加されたため、Current Candidateでは:

- `docs/22` = Task-first Structure / Flow Research
- `docs/23` = Conversation Handoff / Recovery

とし、Owner番号衝突を回避しました。

### Conversation Recovery

`docs/10`から独立したConversation Handoff / stale checkpoint / duplicate active conversation / Current work ref Recovery責務を`docs/23`へ分離しました。

Machine Router / START_HERE / AGENTS / Conversation Templatesへ同じRouteを接続し、Prompt / Conversation Summaryを第二Source of Truthにしません。

### Supply-chain Self-application

Guide自身の`actions/checkout` / `actions/setup-node`をfull-length Commit SHAへ固定しました。Focused Audit Validatorでmoving tagへのRegressionを検出します。

## Concurrent Main Integration Finding

監査Branch作業中、Current mainへv1.19.0 Task-first Structure / Flow OwnerがMergeされました。Audit Branchはその時点で独自`docs/22`を使用しており、単純MergeではCurrent mainの新Ownerを覆い戻すRiskがありました。

対応:

1. latest main README / START_HERE / Owner Registry / Versionを再取得
2. main v1.19.0 + final validation commitをAudit Branchへ統合
3. `docs/22-task-first-structure-flow-research.md`をCurrent mainどおり保持
4. 未MergeだったConversation Handoff Ownerを`docs/23`へ移番
5. README / START_HERE / Governance / Router / Templatesを再同期
6. Final PR前の`behind_by = 0`をCompletion Checkへ追加
7. `PL-F-013`として再発防止をProject Learningsへ記録

## External Evidence Used

- Electron official Security Checklist: context isolation, sandbox, permission handlers, CSP, navigation/new-window restriction, untrusted `shell.openExternal` avoidance, current Electron, IPC sender validation, custom protocol/fuses where relevant.
- OWASP Authorization: least privilege, deny by default, permission checks on requests.
- OWASP CSRF: cookie-authenticated state-changing requestでは明示的CSRF strategyを検討し、SameSiteだけへ依存しない。
- OWASP CSP: CSPはXSS等へのDefense in Depthとして扱う。
- OWASP File Upload: allowlist、content validation、安全な名前、size limit、authorization、安全なstorage。
- GitHub secure use guidance: external Actionsはfull-length Commit SHAでimmutable pinning可能。
- WCAG 2.2: Focus Not Obscured, Dragging Movements, Target Size, Redundant Entry, Accessible Authentication。

## Repository Surface Baseline

Audit開始時には次を確認しました。

- description: unset
- homepage: unset
- topics: empty
- license: unset
- rulesets: none
- `delete_branch_on_merge`: false
- `has_pages`: true
- historical branch debtあり
- guide validation workflowがmutable `@v4` Action refを使用

Source内で修正できるWorkflow pinning / Branch lifecycle Ruleは修正済みです。Repository Admin / metadata項目は [`2026-09-07-external-repository-admin.md`](2026-09-07-external-repository-admin.md) を参照します。

## Regression Guard

既存`tests/validate-guide.mjs`はv1.19.0 Task-first Structure / Flowを含む通常のGuide structural contractを維持します。

追加`tests/validate-audit-contract.mjs`では、今回の実Failureに絞って次を確認します。

- `docs/22` Task-first Ownerと`docs/23` Conversation Ownerの共存
- Human / Machine RouterのConversation Recovery route
- old `docs/22-conversation-handoff-recovery.md`参照消失
- Root RequirementsへPhase 0 / Phase 1 procedureが再流入していない
- WCAG 2.2 interaction coverage
- Research fixed-count heuristicの再導入防止
- Web / Electron Security主要Boundary
- PROJECT_LEARNINGS accumulation contract
- GitHub Actions full-SHA pinning

## Stopping Condition

このAuditは平均Scoreでは終了しません。

完了条件:

1. Critical / High actionable findingがresolved、またはExternal block理由が具体的
2. Medium in-scope findingがresolved、またはEvidence上保留が正しい
3. Low findingがfixed / not applicable / external-only / evidence-deferredのいずれか
4. known contradictionを`good enough`として隠していない
5. Final PR diff review済み
6. Final PR Head validation green
7. Squash Merge成功
8. merged `main` validation green

## Current Status

- Baseline 22 Owners: audited
- Current Candidate 24 Owners (`docs/00〜23`): responsibility integration reviewed
- Secondary structure: audited
- P0 / P1 research needed for this audit: completed
- Source-level actionable remediation: **complete**
- External Repository Admin follow-up: explicit / separate
- Release target: `1.20.0`
- PR #46 final validation: **pending**
- Merge / post-merge main validation: **pending**
- Audit Completion: **not complete until final PR + merged-main validation are green**
