# Development System Integrity 要件定義

Status: Requirements complete / Phase 0-1 implemented / Phase 2 next
Target: `EliteMay/web-project-guide` + companion runtime/data changes in `EliteMay/web-project-data`
Scope: Conversation Persistence integrity / Development Traceability / System Health / Trusted Recovery Phase 2 / Data Retention

この文書は、`web-project-guide` と `web-project-data` を使った開発基盤を、単に「保存・Queue・Recovery機能が存在する」状態から、**漏れを検出でき、由来を追跡でき、基盤自体の健全性を判断でき、長期運用・障害復旧まで安全に続けられる状態**へ進めるためのCurrent Product Contractです。

Common Rule本文のNormative Ownerは既存の `docs/` を維持します。この文書は5つの関連Product機能の要求・依存関係・実装順をまとめるProject Contractであり、Common Ruleの第二Ownerにはしません。

---

## 1. Product Goal

開発基盤が長期間動作しても、Repository ownerが次を確認できること。

1. Conversation Persistenceに漏れや部分失敗がないか
2. RequirementからQueue / Workstream / Interaction / Commit / Validationまで追跡できるか
3. Guide / Data / Queue / Recovery等の基盤自体が現在正常か
4. GitHub側の信頼性事故時に既知のTrusted Stateへ戻れるか
5. Dataが増え続けてもCurrent RecoveryとHistorical Evidenceを壊さず整理できるか

目標は「絶対に失敗しない」と表現することではありません。

```text
prevent where practical
↓
detect when prevention fails
↓
trace why it happened
↓
recover safely
↓
retain enough evidence to prevent recurrence
```

を成立させます。

---

## 2. Existing Contracts / Non-breakable Boundary

以下を壊しません。

- Current Project Requirements / Code / DataのSource of TruthはTarget Repository
- Common RuleのSource of Truthは`web-project-guide`
- Historical development evidence / recovery state / work coordinationは`web-project-data`
- Conversation history / Workstream checkpoint / DashboardはCurrent Project Stateの第二Source of Truthにしない
- Interactionはappend-oriented / immutableを維持する
- Workstream identityはstableに維持する
- Generated Indexは再生成可能であり、Canonical Authorityにしない
- Public surfaceへPrivate Data本文、credential、claim holder等を出さない
- `NOT_RUN` / `UNKNOWN` / fetch failureを`PASS` / `healthy`として扱わない
- normal ChatGPTにRepository-controlled global lifecycle hookが存在すると偽らない

---

## 3. Current State Baseline

2026-09-13時点のCurrent Evidenceでは、Dashboard V2はRequirementsとQueue Itemが存在しますが、Queue controlは`activeRunId: null`、Worker Laneはidle、先頭Taskもqueuedです。

したがってCurrent Stateは次です。

> Dashboard V2: Requirements complete / implementation tasks generated / task execution not started

Development System Integrity側は、Phase 0のShared Integrity primitivesとPhase 1のPersistence Gap Detector V1が`EliteMay/web-project-data`の`main`へ実装済みです。最終Merge Commitは`d84e701d9ed12c3584b2448d4b4111588cb2069d`で、Merge後の`Validate Data`とWindows PowerShell Compatibility validationはいずれもPASSしています。次の実装対象はPhase 2 Development Traceabilityです。

`WORK_QUEUE_REQUIREMENTS.md`等に「task execution in progress」と読める古い状態表記が残る場合は、Current Queue Evidenceへ同期します。

---

# 4. Feature A — Persistence Gap Detector

## 4.1 Goal

Conversation Persistenceが呼ばれなかった、または途中失敗した場合でも、後から不整合を発見できるようにします。

主な検出対象:

- GitHub変更はあるが対応Interaction / `repositoryChanges[]`が確認できない
- InteractionがCompleted Repository Changeを主張しているがCommit / PR Evidenceが解決できない
- Immutable Interaction保存後にCheckpoint / Workstream / Index更新が失敗した
- Correction / Workstream関連付けがCurrent Recovery上で矛盾している

## 4.2 State Model

最低限:

- `healthy`
- `suspected_gap`
- `expected_external_change`
- `partial_failure`
- `needs_reconcile`
- `reconciled`

GitHub Commitがあるだけで保存漏れと断定しません。Manual edit、GitHub Actions、Dependabot等のConversation Persistence外変更を区別します。

## 4.3 Safety

- Gapを見つけても過去Conversation内容を推測して自動Backfillしない
- reconstructする場合はGit Evidenceから確認できる事実だけを使い、historical reconstructionであることを明示する
- Historical gapだけで全Repository writeを停止しない
- Current write target / Current Workstream / Queue authorityへ直接影響するGapだけHigh / Critical gate候補にする

## 4.4 Incremental Check

通常はlast checked boundary以降の新しいCommit / Interaction / changed Workstreamを確認し、毎回全Historyを走査しません。

Full reconcileは明示的Integrity Checkまたは異常検出時に使用します。

## 4.5 Completion

- normal repository change + valid Interactionをhealthy判定できる
- Commit onlyをsuspected gapへできる
- legitimate external changeを区別できる
- missing commit / PR evidenceを検出できる
- partial persistenceを検出できる
- retryで同じGapを重複生成しない
- Reconcile状態を保持できる
- Public ProjectionへPrivate内容を出さない

---

# 5. Feature B — Development Traceability

## 5.1 Goal

以下をForward / Reverseの両方向で辿れるようにします。

```text
User Request
↓
Requirement / Decision
↓
Requirements Revision
↓
Work Queue Task
↓
Workstream / Worker
↓
Conversation Interaction
↓
Repository Change
↓
Commit / PR
↓
Validation / CI
↓
Outcome
```

逆方向ではCommit / PR / Fileから「なぜこの変更が入ったか」まで辿れることを要求します。

## 5.2 Existing Data First

新しい履歴DBを正本として作りません。

既存の以下を結合します。

- Requirements immutable revision
- Queue Task identity
- Workstream ID
- Conversation / Interaction ID
- `recovery.repositoryChanges[]`
- Decision / Evidence record
- Commit SHA / PR identity
- Validation evidence

## 5.3 Generated Trace Index

高速化のためGenerated Trace Indexを持てます。

条件:

- Canonical recordsから再生成可能
- manual editをAuthorityにしない
- stale contentをValidatorで検出
- index消失時にFull rebuild可能

## 5.4 Trace Completeness

最低限:

- `complete`
- `partial`
- `legacy`
- `external_change`
- `broken`

を区別します。

Legacy Interactionを新Contract導入前という理由だけでInvalidにしません。

## 5.5 Historical Semantics

- Requirements revision Aの実装をrevision Bへ勝手に付け替えない
- Workstream correction後は古いassociationをCurrentとして扱わない
- RevertされたCommitをCurrent implementationとして扱わない
- superseded Task / Decision / Requirementの旧Evidenceを削除しない
- multi-repository InteractionはRepository / Logical Changeごとに分離する

## 5.6 V1 Surface

最低入口:

1. Repository → Recent Changes → Requirement / Workstream / Commit
2. Workstream → Timeline → Interactions → Git Evidence
3. Commit / PR → Why → Request → Requirement → Validation

巨大Graph UIはV1必須にしません。

---

# 6. Feature C — Development System Health Dashboard

## 6.1 Goal

Project Dashboardが「作業の進捗」を示すのに対し、System Health Dashboardは**その開発管理基盤自体を信用してよいか**を示します。

## 6.2 Health Domains

最低限:

- Conversation Persistence
- Automatic Resume / Workstream
- Work Queue
- Dashboard Projection
- Requirements Integrity
- Validation / CI
- Trusted Recovery
- Persistence Gap
- Traceability integrity
- Retention integrity

各Domainは別々に判定し、単一点数へ平均しません。

## 6.3 Overall State

最低限:

- `healthy`
- `degraded`
- `attention_required`
- `recovery_required`
- `unknown`

`unknown`をhealthy扱いしません。

## 6.4 First View

Repository ownerが数秒で以下を判断できること。

- 全体状態
- どのDomainに問題があるか
- Current / stale / unknownのどれか
- 今対応が必要か
- 次に何をすべきか

Raw internal code / private IDs / full logsはPrimary UIへ出しません。

## 6.5 Failure UX

「0件」と「取得失敗」を分けます。

例:

```text
Work Queue
確認不能
Data Repositoryへアクセスできません。
```

と表示し、fetch failureを正常な空Queueへ変換しません。

## 6.6 Public / Private

System Health DashboardはOwner向けを基本とします。

Public GitHub Pagesへ出せるのはsanitize済みの集約状態のみです。Conversation本文、Private Requirements、Task ID、holder ID、internal recovery evidence等は出しません。

---

# 7. Feature D — Trusted Recovery Phase 2

## 7.1 Goal

Phase 1のCapsule生成 / digest verification / external export / current-state comparisonを維持しつつ、Recoveryを「存在する仕組み」から「必要時に使える仕組み」へ強化します。

## 7.2 Capsule Update Trigger

毎CommitではなくTrust-affecting milestoneで更新します。

最低Trigger候補:

- Trust-critical Manifest変更
- Conversation Persistence Contract / Schema変更
- Workstream Recovery変更
- Work Queue Authority変更
- Security / Governance / Source of Truth変更
- Recovery Tool / Recovery Schema変更
- Repository identity / visibility / default branch変更
- Recovery Incident解決 / Trust Epoch変更

状態を分けます。

- `capsuleRequired`
- `capsuleGenerated`
- `capsuleValidated`
- `externalExportVerified`

Capsuleを生成しただけで外部Anchor確立済みとは扱いません。

## 7.3 Freshness

Freshnessを最低2軸で扱います。

- Change Freshness: latest Capsule後にTrust-critical changeがあるか
- Time Freshness: 長期間Recovery確認がないか

時間だけでInvalidにはしません。

## 7.4 Recovery Readiness

最低限:

- `ready`
- `update_required`
- `external_copy_required`
- `drill_due`
- `degraded`
- `broken`
- `unknown`

## 7.5 Recovery Drill

Minimum Drill:

```text
External Capsule取得
→ offline validation
→ digest確認
→ repository identity確認
→ trusted commit確認
→ current-state comparison
```

High-risk change後は必要に応じてFresh checkout / trusted commit / validatorsまで含むFull Drillを行えます。

Result:

- `PASS`
- `PASS_WITH_WARNINGS`
- `FAIL`
- `NOT_RUN`
- `BLOCKED`

`NOT_RUN`をproven recovery扱いしません。

## 7.6 Account Loss Boundary

Recovery CapsuleはGitHub account access / secretsを復元しません。

以下を区別します。

- Repository integrity recovery
- Development state recovery
- GitHub account recovery
- GitHub service outage
- Total repository loss

将来Repository backupを追加する場合も、Backup contentとTrusted Capsuleを別責務として扱います。

## 7.7 Trust Epoch

Continuityが説明不能になった場合は古いChainへ無理に続けず、incident revalidation後に新Trust Epochを開始できること。

---

# 8. Feature E — Data Retention / Archive

## 8.1 Goal

Data量が増えてもCurrent Recovery / Traceability / Trust Evidenceを壊さず整理できること。

Ageだけで自動削除しません。

## 8.2 Archive != Delete

Archive:

- Recordは保持
- Default search / hot index / automatic resume候補から外す
- Historical扱い

Delete:

- Record自体をCurrent treeから削除
- stronger gate / validationが必要

Logical ArchiveをDefaultとし、status変化だけを理由にStable Path / Stable IDを変更しません。

## 8.3 Retention Classes

最低限:

- A `protected`
- B `durable`
- C `archivable`
- D `rebuildable`
- E `temporary`
- F `deletion_candidate`

代表例:

### Protected

Trust Recovery、Security/Data-loss Incident、Migration baseline/ledger、Current Workstream identity、重要Correction、Systemic Change Evidence等。

### Durable

Meaningful Repository Change Interaction、completed Workstream history、important Decision / Evidence等。

### Archivable

古いcompleted Workstream context、resolved investigation、superseded research、古いroutine context等。

### Rebuildable

Workstream index、Trace index、Dashboard projection、search index、derived summary等。

### Temporary

one-time export、transient build/output、重複download等。

## 8.4 Reference-aware Delete

Permanent Delete前に最低限確認します。

- Current Recoveryで不要
- Current Workstream / Queue / Traceabilityから参照されない
- Migration / Recovery / Incident Evidenceではない
- Stable referenceを壊さない
- Backup / Restore上必要ない
- Delete後ValidatorがPASSする

Unknownを自動Deleteしません。

## 8.5 Git History Boundary

Git current treeからFileを削除することと、Git historyから完全削除することを分けます。

Secret事故等のhistory rewriteはRetention CleanupではなくSecurity Incidentとして扱います。

## 8.6 Dry Run

Retention automationは先にDry Runできること。

例:

```text
Protected: 64
Archive eligible: 182
Rebuildable: 7
Deletion candidates: 12
Unknown: 3
```

実Deleteはclassificationとは分離します。

---

# 9. Dependency Graph

実装依存関係は次をDefaultとします。

```text
Phase 0: Shared Integrity Model / stable identity / common read boundary
        ↓
Phase 1: Persistence Gap Detector
        ↓
Phase 2: Development Traceability
        ↓
Phase 3: System Health Dashboard

Phase 0 ───────────────→ Phase 4: Trusted Recovery Phase 2

Phase 2 + Phase 4 ─────→ Phase 5: Data Retention / Archive
```

理由:

- Gap Detectorが「何が欠けているか」を定義する
- Traceabilityが「何と何がつながるか」を定義する
- System Healthはその結果を集約表示する
- Recovery Phase 2は一部独立して進められるが、Healthへ状態提供する
- RetentionはTrace / Recovery Referenceを理解してからでないと安全に削除判定できない

---

# 10. Phase 0 — Shared Integrity Model

5機能を別々に実装する前に、共通概念を確定します。

最低限:

- Stable Entity Identity
- Source / Authority classification
- Current / Historical / Derived distinction
- Evidence resolution result
- Freshness result
- Integrity severity
- Public-safe projection boundary
- Generated Index rules

同じ`healthy` / `stale` / `unknown`等の意味を各Toolが独自定義しないようにします。

ただし巨大な万能Schemaを先に作りません。共有が実際に必要なFieldだけを共通化します。

---

# 11. Implementation Order

## Step 1 — Current Contract Alignment

- Dashboard V2 status表現をCurrent Queue Evidenceへ合わせる
- このProduct ContractをRoot Requirements / README routingから到達可能にする
- Guide / Dataの責務境界を確認する

## Step 2 — Shared Integrity primitives

- entity/evidence resolver boundary
- result classifications
- generated index contract
- test fixtures

## Step 3 — Persistence Gap Detector

まずCLI / machine-readable resultを完成させ、UIを先に作りません。

## Step 4 — Development Traceability

Gap Detectorと既存Repository Change Recordを利用し、Forward / Reverse resolutionを実装します。

## Step 5 — System Health Dashboard

既存判定結果を表示するProjectionとして実装します。Dashboard独自に判定Logicを複製しません。

## Step 6 — Trusted Recovery Phase 2

Trigger / freshness / drill / readinessを実装し、Healthへsafe summaryを提供します。

## Step 7 — Retention / Archive

最初はclassification + dry-run + logical archiveまでとし、Permanent Delete automationは最後にします。

---

# 12. Cross-feature Invariants

全Featureで以下を共通要求とします。

1. Authorityを複製しない
2. Historical EvidenceをCurrent Stateとして扱わない
3. Generated Indexは再生成可能
4. fetch failureをhealthy / emptyへ変換しない
5. Unknownを安全側に扱う
6. Private dataをPublic projectionへ出さない
7. Retryはidempotent
8. legacy recordを新Contract導入だけで破壊しない
9. correction / supersede / revertを削除ではなく関係として扱う
10. Current Repositoryへwriteする前にCurrent write targetを再確認する

---

# 13. Validation Strategy

最低限3層に分けます。

## Unit / deterministic fixture

- state classification
- relation resolution
- gap detection
- retention classification
- recovery freshness

## Repository integration

- real schema / record layout
- generated index rebuild
- stale index detection
- cross-record reference resolution
- public projection sanitization

## Failure / Recovery scenario

- missing Interaction
- missing Commit evidence
- partial persistence
- stale Workstream index
- Requirements revision mismatch
- rollback/history rewrite suspected
- external Recovery Anchor unavailable
- archived evidence lookup
- broken reference during retention

---

# 14. Public / Private Boundary

Publicに出してよい候補:

- aggregate health state
- sanitized count
- public repository name
- public-safe task/change summary
- freshness label

Privateに保持:

- Conversation本文
- User Message原文（必要なsanitized summaryを除く）
- Private Requirements本文
- internal Task ID / claim holder identity
- credentials / secrets
- unrestricted tool payload
- private recovery evidence detail

---

# 15. Non-goals

このRoadmapでは以下を目的にしません。

- ChatGPT platform全体への強制lifecycle hook
- 全Taskの完全無人実行
- Dashboardからの危険な自動修復
- Gitの代替履歴DB
- Conversation全文Viewer
- Enterprise observability platform
- 毎Commit USB backup
- GitHub account自動復旧
- 全Dataの固定日数自動削除
- Git historyの自動rewrite
- Generated IndexのCanonical化

---

# 16. Completion Contract

このRoadmap全体は、最低限以下が成立した時点でV1完成です。

- Persistence漏れ / partial failureを検出できる
- RequirementからCommit / Validationまで追跡できる
- Commitから変更理由を逆引きできる
- 開発基盤のHealth / stale / unknownを人間向けに判断できる
- Trust-critical change後にRecovery update requirementを判断できる
- 外部Recovery Anchor / Drill状態を誤魔化さず表示できる
- Dataをlogical archiveでき、Current Recoveryから安全に外せる
- Delete CandidateをReference-awareに判定できる
- legacy / correction / supersede / revertを壊さない
- Current / Historical / Derivedの境界を維持する
- Public / Private境界を維持する
- final-state validators / applicable CIがPASSする

---

## Implementation Handoff

- Status: Ready for implementation
- Requirements updated: 2026-09-13
- Current implementation: Phase 0 Shared Integrity primitives + Phase 1 Persistence Gap Detector V1 complete
- Blocking Decisions: None
- Important Assumptions: Permanent Delete automationはRetention V1の最後まで有効化しない
- Next implementation target: Phase 2 Development Traceability
- Related current contracts: `REQUIREMENTS.md`, `DASHBOARD_REQUIREMENTS.md`, `WORK_QUEUE_REQUIREMENTS.md`, `docs/03-data-storage.md`, `docs/09-maintenance.md`, `docs/15-development-observability.md`, `docs/23-conversation-handoff-recovery.md`
