# 2026-09-07 Exhaustive Guide Audit

このReportは `web-project-guide` を「既知の改善点が残る限り未完成」と仮定し、全Current OwnerとSecondary Surfaceを同じ基準で棚卸ししたPhase 0 Auditです。

Normative Rule本文ではありません。監査方法の正本は `docs/14-continuous-improvement.md`、実行手順は `maintenance/DEEP_SYSTEM_AUDIT.md` です。

## Audit Baseline

- Repository: `EliteMay/web-project-guide`
- Baseline commit: `31c2f87a2f149db36634df30d6c48c1e732c5918`
- Guide version: `1.18.0`
- Audit date: 2026-09-07
- Current owner count: 22 (`docs/00`〜`docs/21`)
- Secondary surfaces: README / START_HERE / REQUIREMENTS / templates / catalog / references / maintenance JSON / validator / workflow / repository metadata

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

Overallは点数だけでなく重大Gapを優先して `A / B / C / D` で付けます。

## Owner Audit Matrix — Baseline

| Owner | Coverage | Gap | Dup | R/R Sep | Decision | Failure | Overall | Main finding |
|---|---:|---:|---:|---:|---:|---:|---|---|
| 00 Governance | 3 | 3 | 3 | 3 | 3 | 2 | A | 基本構造は強い。Agent autonomyの停止条件だけCurrent pending requirementと未同期。 |
| 01 Requirements | 3 | 2 | 2 | 3 | 1 | 2 | C | Core / High-costをUser回答待ちにする旧ContractがCurrent autonomy requirementと競合。Requirements Persistenceも詳細がRequirements側へ逆流。 |
| 02 Architecture | 3 | 2 | 3 | 3 | 3 | 3 | A | 現時点でBlocking Gapなし。 |
| 03 Data / Storage | 3 | 3 | 3 | 3 | 3 | 3 | A | Migration / destructive import / resetまで強い。 |
| 04 UI / UX / Accessibility | 3 | 2 | 2 | 2 | 3 | 3 | B | Common Owner本文へNamed `DesignShelf`運用が混入。WCAG 2.2の新しい操作条件に補強余地。 |
| 05 Performance / Reliability | 3 | 3 | 3 | 3 | 3 | 2 | A | Soft budget / measurement / exceptionsが明確。 |
| 06 Security | 2 | 1 | 3 | 3 | 1 | 1 | D | AuthN/AuthZ/session/CSRF/CSP/upload/public endpoint abuseが薄い。Electron securityも不足。P0補強対象。 |
| 07 Testing / Quality | 3 | 3 | 3 | 3 | 3 | 3 | A | Static / E2E / oracle / final-state / verification stateが整理済み。 |
| 08 GitHub Pages | 3 | 2 | 3 | 3 | 3 | 2 | A | Pages固有責務へ整理済み。重大Gapなし。 |
| 09 Version / Maintenance | 3 | 3 | 3 | 3 | 3 | 3 | A | Preflight重複解消済み。 |
| 10 Project Management | 3 | 2 | 2 | 3 | 1 | 3 | C | `確認が必要な変更`とParallel conflictでUser停止をDefaultにする旧Contractがautonomy requirementと競合。Conversation運用が巨大化しているが現時点では単なる長さだけで分割しない。 |
| 11 Electron / Distribution | 3 | 1 | 3 | 3 | 2 | 2 | C | Release/Updaterは強いがElectron公式Security Checklistの重要項目が不足。 |
| 12 Project Profiles | 2 | 2 | 3 | 3 | 2 | 1 | B | 補助分類として有効。ProfileだけでRoutingしないBoundaryも明確。 |
| 13 Dependencies / Assets | 3 | 2 | 3 | 3 | 2 | 2 | B | Package/assetは十分。GitHub Actions supply-chain pinningをCross-repo Ownerと連携して補強余地。 |
| 14 Continuous Improvement | 3 | 2 | 3 | 3 | 2 | 3 | B | Deep Auditはあるが、新Phase 0の6軸/Gaps/停止条件がRequirements側へ詳細逆流。Ownerへ回収が必要。 |
| 15 Observability / Project Memory | 3 | 2 | 2 | 3 | 3 | 3 | B | Diagnosticsは強い。PROJECT_LEARNINGSの継続蓄積・昇格後も履歴を失わない方針を明文化する。 |
| 16 Cross-Repository GitHub | 3 | 2 | 3 | 3 | 3 | 2 | B | Named Pilot分離済み。ただしGuide自身のActionsがmutable tag参照でself-application違反。 |
| 17 Visual Baseline | 3 | 3 | 3 | 3 | 3 | 2 | A | Minimum Gateへ責務限定済み。 |
| 18 Visual Research | 3 | 3 | 3 | 3 | 3 | 2 | A | Domain research / candidate / foundation resetが明確。 |
| 19 Game Development | 3 | 3 | 3 | 3 | 3 | 3 | A | 長いがGame-specific responsibilityとして一貫。長さだけで分割しない。 |
| 20 Evidence-first Research | 3 | 2 | 3 | 3 | 2 | 2 | B | `100件規模`という数値目安がQualityよりCountを目的化させるRisk。Saturation / coverage中心へ修正。Decision後のUser停止もautonomyと整合が必要。 |
| 21 Rule Routing / Preflight | 3 | 2 | 3 | 3 | 2 | 3 | B | Router parityは強い。Userへ聞く条件が旧Core/High-cost Contractを参照しておりautonomyと未同期。 |

## High-impact Gap Register

| ID | Area | Gap type | Severity | Action | Research priority | Status |
|---|---|---|---|---|---|---|
| G-001 | Agent autonomy | Structural / Rule Gap | High | EXPAND + MERGE | None | open |
| G-002 | Requirements Phase 0 detail | Structural Gap | High | MOVE | None | open |
| G-003 | Requirements Persistence detail | Structural Gap | Medium | MOVE | None | open |
| G-004 | Security | Research + Rule Gap | Critical | RESEARCH + EXPAND | P0 | open |
| G-005 | Electron Security | Research + Rule Gap | Critical | RESEARCH + EXPAND | P0 | open |
| G-006 | docs04 DesignShelf named content | Structural Gap | High | MOVE | None | open |
| G-007 | Research 100-source heuristic | Rule Gap | Medium | CLARIFY / REMOVE | None | open |
| G-008 | GitHub Actions SHA pinning | Evidence / Rule Gap | High | EXPAND + FIX SELF | None | open |
| G-009 | PROJECT_LEARNINGS accumulation | Rule Gap | Medium | CLARIFY | None | open |
| G-010 | Branch lifecycle debt | Repository metadata / Structural debt | High | CLEANUP / SETTING | None | open |
| G-011 | Repository metadata | Repository metadata | Low | CLARIFY / MANUAL | None | open |
| G-012 | Audit stopping condition | Structural Gap | High | EXPAND | None | open |
| G-013 | WCAG 2.2 interaction details | Research + Rule Gap | Medium | RESEARCH + CLARIFY | P1 | open |

## Duplication / Conflict Map

### D-001 Requirements vs Continuous Improvement

`REQUIREMENTS.md` Section 17 contains the detailed six-axis Phase 0 Audit mechanics. This is useful behavior but belongs to `docs/14` + `maintenance/DEEP_SYSTEM_AUDIT.md`; Requirements should only require that the audit exists and is completed.

### D-002 Requirements vs Requirements Owner

Requirements Persistence details are partly in Root `REQUIREMENTS.md` and partly in `docs/01`. Behavioral owner should be `docs/01` with Root Requirements retaining only this guide project's current contract.

### D-003 Agent autonomy conflict cluster

Current pending requirement says Best Reasonable Decision should be default, while `docs/01`, `docs/10`, `docs/21`, Requirements/Implementation/AGENTS templates still contain user-wait semantics for Core / High-cost decisions.

### D-004 Visual common-owner leakage

`docs/04` embeds a named DesignShelf workflow. The generic design-direction comparison principle is common; the named companion tool is project-specific/reference evidence.

### D-005 Supply-chain self-application

Cross-repository guidance favors immutable reusable workflow references, but this repository's own `validate-guide.yml` uses `actions/checkout@v4` and `actions/setup-node@v4` mutable tags.

## External Evidence Used for P0/P1 Gaps

- Electron official Security Checklist: context isolation, sandbox, permission handlers, CSP, navigation/new-window restriction, untrusted `shell.openExternal` avoidance, current Electron, IPC sender validation, custom protocol/fuses where relevant.
- OWASP Authorization: least privilege, deny by default, permission checks on every request.
- OWASP CSRF: state-changing cookie-authenticated requests need an explicit CSRF strategy; SameSite is defense in depth in many deployments.
- OWASP CSP: CSP is defense in depth against XSS/clickjacking/cross-site leaks.
- OWASP File Upload: allowlisted extensions, content validation, safe names, size limits, authorization, safe storage.
- GitHub Secure Use: full-length commit SHA is the immutable way to pin Actions; repository policy can require it.
- WCAG 2.2: Focus Not Obscured, Dragging Movements, Target Size, Redundant Entry, Accessible Authentication add relevant UI conditions.

## Repository Surface Baseline

Observed at audit start:

- description: unset
- homepage: unset
- topics: empty
- license: unset
- rulesets: none
- `delete_branch_on_merge`: false
- `has_pages`: true
- many historical branches remain, including merged feature/refactor/audit branches and `tmp-ignore`
- current guide validation workflow uses mutable `@v4` Action refs

Repository settings / license decisions are not silently invented. Safe source changes are fixed in the audit PR; settings not exposed by the current connector are tracked as explicit manual/external follow-up.

## Research Priority Map

### P0

1. Web security decision coverage (`docs/06`)
2. Electron application security (`docs/11`)

### P1

1. WCAG 2.2 interaction/accessibility deltas relevant to the existing UI owner

### P2

None currently. Do not create research work merely to fill a tier.

## Stopping Condition

This audit does **not** stop because an average score reaches a target number.

It stops only when:

1. all Critical / High actionable findings are resolved or externally blocked with a precise reason;
2. all Medium actionable in-scope findings are resolved unless changing them would reduce correctness or rule preservation;
3. remaining Low findings are either fixed, not applicable, external/manual-only, or explicitly evidence-deferred;
4. no known contradiction is being relabeled as “good enough”;
5. final PR diff, validation, and merged-main validation are green.

## Phase 0 Status

- All 22 current owners: audited at baseline
- Secondary structure: audited
- Repository surface: audited
- P0 research: in progress
- Structural cleanup: in progress
- Final scores: pending fixes
- Completion: **not complete**
