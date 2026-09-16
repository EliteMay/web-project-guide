# Loop Engineering Foundation 要件定義

Status: Requirements complete / Guide-side foundation implemented / Runtime Phase A implemented / Phase B not implemented
Target: `EliteMay/web-project-guide`
Companion runtime/data target: `EliteMay/web-project-data`（Phase A Runtime implementation / validation evidenceのCurrent Owner）

この文書は、Coding Agentへ単発Taskを渡すだけでなく、**Goal → Work → Verification → State → Next Decision** を安全に反復できるLoop Engineering機能を `web-project-guide` のProduct機能として導入するためのCurrent Product Contractです。

Common Rule本文のNormative Ownerは既存の `docs/` を維持します。この文書はLoop機能のProduct Contractであり、Testing / Security / Project Management / Observability / Conversation Recovery / Work Queueの第二Normative Ownerにはしません。

---

## 1. Product Goal

Repository ownerが毎回Agentへ「次をやって」と指示しなくても、明示されたGoalと境界の中でSystemが次を安全に繰り返せること。

```text
Goal / Current Requirements
↓
Current Repository / Evidence
↓
Eligible Task
↓
Worker execution
↓
Independent verification
↓
Progress / Failure classification
↓
Receipt / State persistence
↓
Continue / Retry / Escalate / Stop
```

目標は「AIを止まらず動かす」ことではありません。

> **長時間・反復して動いても、進捗を外部Evidenceから判断でき、進んでいなければ止まり、権限とCostを制限し、中断後も安全に復旧できること。**

---

## 2. Non-breakable Boundaries

以下を壊しません。

- Current Project Requirements / Code / DataのSource of TruthはTarget Repository。
- Common RuleのSource of Truthは`web-project-guide`のCurrent Owner Docs。
- Work QueueはExecution PlanでありRequirementsの第二Source of Truthにしない。
- Conversation / Loop State / Receipt / DashboardはProject Current Stateの第二Source of Truthにしない。
- Current Repository / Requirements / Evidenceで解ける判断はBest Reasonable Decisionで進める。
- Workerの自己申告だけをCompletion Oracleにしない。
- `UNKNOWN` / `NOT_RUN` / fetch failureを`PASS`へ変換しない。
- LoopのためにDefault Branch / Production / Secret accessを無条件に広げない。
- Runtime implementation detail、private holder identity、raw interaction、secret等をPublic Guideへ保存しない。
- Agentが評価機構を書き換えて成功扱いできる構造をDefaultにしない。

関連Owner:

- Requirements / User Decision: `docs/01-requirements.md`
- Security / permission boundary: `docs/06-security.md`
- Testing / verification: `docs/07-testing-quality.md`
- Existing project change / branch / PR: `docs/10-project-management.md`
- Continuous Improvement: `docs/14-continuous-improvement.md`
- Observability / diagnostics: `docs/15-development-observability.md`
- Rule Routing / Preflight: `docs/21-rule-routing-preflight.md`
- Conversation / Workstream Recovery: `docs/23-conversation-handoff-recovery.md`
- Task orchestration: `WORK_QUEUE_REQUIREMENTS.md`

---

## 3. Architecture: Outer Loop / Inner Loop

Loopを1つの巨大Agent promptへしません。

```text
                 Outer Loop Controller
       ┌────────────────────────────────┐
       │ Goal / Scope / Trigger         │
       │ Budget / Permission            │
       │ Task selection                 │
       │ Stop / Escalation              │
       └──────────────┬─────────────────┘
                      │
                      ▼
                 Work Queue
                      │
                      ▼
               Inner Worker Loop
       ┌────────────────────────────────┐
       │ Current State                  │
       │ Plan → Act → Observe           │
       │ Local Verify → Diagnose        │
       │ Retry / Strategy change        │
       └──────────────┬─────────────────┘
                      │
                      ▼
             Independent Verifier
                      │
          ┌───────────┼────────────┐
          ▼           ▼            ▼
        PASS         FAIL        UNCERTAIN
          │           │            │
          ▼           ▼            ▼
       Receipt     Retry path   Escalation
          │
          ▼
     Queue advance / Stop
```

### Outer Loopの責務

- Goal / completion criteria保持
- Scope / Source of Truth解決
- Trigger受付
- Current Queue / eligible Task解決
- Permission profile適用
- Budget管理
- independent verification要求
- Progress / Stuck判定
- Terminal State確定
- Escalation

### Inner Loopの責務

- Current Taskに必要なPreflight
- Current Repository / Learning / Evidence確認
- Planning / implementation / local validation
- Failure原因の狭い診断
- 許可範囲内でのRetry / strategy change

Inner Workerが自分でGoal、権限、最終Stop条件を拡張しません。

---

## 4. Loop Contract

Machine-readable Contractは `maintenance/loop-policy.schema.json` をSchemaとし、`maintenance/loop-policy.example.json` をSafe Exampleとします。

最低限次を表現できること。

### Identity

- `policyVersion`
- `loopId`
- `repository`

### Goal

- human-readable statement
- observable completion criteria

「改善する」「いい感じにする」だけをMachine Completion Conditionにしません。

### Scope

- allowed path / semantic area
- protected / denied path
- authoritative branch / working branch policy
- required Source of Truth

### Trigger

最低限:

- `manual`
- `queue`
- `schedule`
- `event`

TriggerされたこととWrite Authorityがあることを同一視しません。

### Verification

- required verifier level
- required commands / checks
- protected verifier boundary
- evidence requirements

### Budget

最低限:

- max loop iterations
- max same-failure count
- optional wall-clock / model / tool / monetary budget
- max parallel workers

固定Budget値を全ProjectへCommon Ruleとして強制しません。

### Permissions

最低限:

- repository read
- worktree / branch write
- commit
- push
- merge
- deploy
- external network
- secret / privileged capability

Permission promptの回数を増やすより、Capability Boundary自体を狭くすることを優先します。

### Stop / Escalation

Success / failure / stuck / blocked / user-decision-requiredを区別します。

---

## 5. State Machine

最低限のState:

- `queued`
- `running`
- `verifying`
- `retrying`
- `paused`
- `passed`
- `failed`
- `stuck`
- `blocked`
- `budget_exhausted`
- `escalated`
- `cancelled`

Terminal State:

- `passed`
- `failed`
- `stuck`
- `blocked`
- `budget_exhausted`
- `escalated`
- `cancelled`

`stopped`の1状態へ全部まとめません。

### MUST: State transitionにEvidenceを持てる

少なくとも重要Transitionでは次を追跡できること。

- previous state
- next state
- reason
- attempt / iteration
- relevant task / verifier result
- timestamp
- evidence reference

実装時の具体Schema / pathはData側Current Contractへ委譲できます。

---

## 6. Verification Contract

### MUST: Worker self-reportを最終Oracleにしない

VerificationはTask Riskに応じて次のEvidenceを組み合わせます。

- Static / syntax / schema
- Unit / deterministic test
- Integration / E2E / browser
- Runtime / real-environment evidence
- Independent review
- protected acceptance verification
- 必要時Human judgment

`docs/07-testing-quality.md`のTesting Strategyを正本とし、Loop側は必要なVerifierを**実行・収集・判定へ接続**します。

### Verifier Level

Loop orchestration用のCapability表示として以下を使えます。

- `V0_SELF` — Worker自己評価のみ。Completion Oracleには原則使わない。
- `V1_STATIC` — syntax / schema / static validator。
- `V2_DETERMINISTIC` — unit / deterministic checks。
- `V3_RUNTIME` — integration / E2E / browser / representative runtime。
- `V4_PROTECTED` — Workerから独立または書換え制限されたacceptance verification。
- `V5_HUMAN` — User judgment / real-device / legal / policy / preference等。

Level番号を品質ScoreやProject rankingには使いません。Taskに必要なEvidence種別を示すだけです。

### Verifier Integrity Boundary

重要Loopでは原則として:

```text
Worker write boundary
!=
final verifier authority boundary
```

を成立させます。

具体例:

- WorkerがApplication codeを変更できても、protected acceptance fixtureを同じTaskで黙って変更しない。
- Test変更がRequirement上必要な場合は、Application fixとTest contract changeを区別してEvidenceを残す。
- Failing checkの削除、skip化、assertion弱体化だけでPASSにしない。
- Verifierが取得不能 /壊れている場合は`UNKNOWN` / `BLOCKED`等へ上げる。

Held-out testを全Projectへ強制しません。利用できる環境では、特に高Risk /長時間Loopで検討できます。

---

## 7. Progress / Stuck Detection

### MUST: Retry回数だけでなく「進んだか」を確認する

LoopはFailure後に無条件で同じ方法を繰り返しません。

各Attemptで可能な範囲で次を比較します。

- failure signature
- changed files / semantic change
- failing test set
- error category
- verifier delta
- unresolved blocker
- requirement / environment change

### Failure Signature

同一Failureを完全な文字列一致だけで判定しません。Timestamp、temporary ID、line number等のNoiseを除いたNormalized Signatureを使える構造にします。

### STUCK候補

次を組み合わせて判定します。

```text
same / equivalent failure repeated
+
meaningful progress が確認できない
+
strategy changeでも改善しない
```

`maxSameFailure`は機械Guardです。Thresholdへ到達する前でも根本的に解決不能と判断できれば`blocked` / `escalated`へ移せます。

### Retry時に選べるAction

- narrow root-cause investigation
- strategy change
- targeted research
- diagnostic collection
- rollback to known-good checkpoint
- alternate implementation
- verifier repair taskへの分離
- Human escalation

同じPromptの再送だけをRetry Strategyにしません。

---

## 8. Budget Contract

Autonomous Loopは無制限にResourceを消費しません。

Budget候補:

- iterations
- attempts per task
- same-failure repetitions
- wall-clock
- model tokens / inference budget
- external tool / API cost
- monetary spend
- parallel worker count

### MUST: Budget exhaustionをFailureと分離する

Budget上限到達は`budget_exhausted`とし、Product Failure / Verifier Failure / Permission Blockと区別します。

Budgetを増やせば解決するとは限らないため、自動で上限を無限拡張しません。

---

## 9. Permission / Sandbox Contract

### Principle

Human approvalをすべての小Actionへ追加するより、Loopが触れられるCapabilityを最初から限定します。

Safe default example:

```text
Repository read      allowed
Working branch write allowed
Commit               allowed by policy
Push working branch  allowed by policy
Default branch write denied
Merge                denied
Production deploy    denied
Secret access        denied
Verifier authority   read-only / protected
```

Project Contractで明示的に安全性・rollback・verificationが成立している場合のみAutonomyを上げられます。

### Human Gate候補

- non-inferable User preference
- safe alternativeのないirreversible destructive action
- existing save / schema destruction risk
- billing / purchase / external paid resource
- account / external permission
- privileged secret access
- unresolved material Requirements conflict
- production release / merge policyがHumanを要求
- verifier resultがuncertainでTask outcomeを確定できない

User Decisionの詳細条件は`docs/01-requirements.md`を正本とします。

---

## 10. Checkpoint / Resume / Crash Recovery

長時間LoopはConversation memoryだけへ依存しません。

各meaningful iteration / task boundaryで必要に応じて次をDurable Evidenceへ接続します。

- current loop identity
- goal / policy revision
- current task / queue identity
- repository baseline / working ref
- attempt count
- latest verifier result
- latest failure signature
- current state
- next allowed action
- budget usage

具体的なStorage path / receipt schema / claim identityは`EliteMay/web-project-data`のCurrent Contractへ委譲します。

### Resume

再開時は保存Stateだけを信じず、Current Repository / Requirements / Queue / Branch / PR / Commitを再取得してreconcileします。

```text
Stored loop state
+
Current repository evidence
+
Current queue authority
↓
resume / needs_reconcile / blocked
```

stale stateをforce overwriteして再開しません。

---

## 11. Queue Integration

`WORK_QUEUE_REQUIREMENTS.md`のQueue Contractを再利用します。

Loop ControllerはWorkerが自分でTaskを発明する仕組みではありません。

原則:

1. Current Requirements / formal queueからeligible Taskを取得
2. dependency / semantic overlap / assignmentを確認
3. formal claim後に作業開始
4. verification / receipt確定後にTask completion
5. 次のeligible Taskへ進む

Loop-specific stateをQueue item本文へ大量複製しません。

---

## 12. Parallelism Policy

V1では**Sequential first**を基本にします。

並列化候補は最低限次を満たす場合だけです。

- dependencyが解決済み
- file / semantic scope overlapがない、または統合方法が明確
- isolated workspace / branchがある
- verifierがTaskごとに独立して評価可能
- merge / integration責務が明確
- parallel cost budget内

Worker数を増やすこと自体を性能改善と扱いません。

---

## 13. Maintenance / Drift Loop

Loop throughputが増えると、local patch、duplicate code、stale docs、dead code、Rule application drift等も高速に蓄積し得ます。

そのため必要に応じてProduction Loopとは別にMaintenance Loopを持てます。

対象例:

- architecture boundary violation
- duplicate / dead code
- dependency drift
- stale generated index
- orphan rule / router drift
- repeated workaround
- temporary asset / branch cleanup

Maintenance Loopも通常と同じPermission / Verification / Budget / Stop Contractへ従います。

`docs/14-continuous-improvement.md`をCommon improvement behaviorの正本とします。

---

## 14. Observability / Loop Receipt

Loopが「何回動いたか」だけでなく、なぜ次Actionを選んだかを追えること。

最低候補:

- loop / task / attempt identity
- start / end / duration
- trigger type
- state transition
- verifier result
- failure category / signature
- strategy change
- budget usage
- permission denial
- escalation reason
- repository / commit / PR evidence

Logへsecret / token / raw private contentを保存しません。詳細は`docs/15-development-observability.md`。

### Receipt

Task / Loop completion時は必要に応じてMachine-readable Receiptを持てる構造にします。

Receiptは「Agentが完成と言った」記録ではなく、最低限:

- goal / task identity
- final state
- verifier result
- evidence references
- final repository ref
- unresolved / unverified items

を追跡できるものとします。

---

## 15. Trigger Policy

### Manual

User / operatorが明示的に開始。

### Queue

formal Requirements / Queue eventから開始。

### Schedule

定期Audit / maintenance等。時間になったことはWrite authorityの証明ではありません。

### Event

CI failure、dependency event、issue等。外部Event payloadはuntrusted inputとして扱い、権限・scope・prompt injection riskを確認します。

V1ではManual / Queueを優先し、Schedule / EventはRuntime foundationの安定後に拡張します。

---

## 16. Autonomy Levels

機能成熟度を段階的に上げます。

- `L0_ASSISTED` — 調査 /提案中心。writeは人間主導。
- `L1_WORKTREE` — isolated worktree / branchで自動変更 + verification。mergeなし。
- `L2_PR` — branch push / PR preparationまで。mergeなし。
- `L3_GUARDED_MERGE` — 明示的に許可された低Risk Taskのみguarded merge。
- `L4_GUARDED_RELEASE` — 明示的Project Contractがある場合だけrelease / deployまで。

Autonomy Levelを「賢さ」の評価や必須成長段階として扱いません。Task Risk / Environment / Verifier capabilityに応じて必要なLevelを選びます。

V1 foundationのSafe Exampleは`L1_WORKTREE`相当とします。

---

## 17. Current Implementation

### Guide-side Foundation

Current Guide側に実装済み:

- `LOOP_ENGINEERING_REQUIREMENTS.md`
- `maintenance/loop-policy.schema.json`
- `maintenance/loop-policy.example.json`
- `tests/validate-loop-engineering-contract.mjs`
- `Validate Guide` workflowへのLoop Contract validation
- README / START_HEREからのRoute

Guide側Foundation自体はRuntime Agentを起動しません。

### Runtime Phase A — Implemented

`EliteMay/web-project-data`へRead-only / Dry Run Controllerを実装済みです。

Current runtime surfaces:

- `tools/loop-engineering/dry-run-controller.mjs`
- `tools/loop-engineering/json-schema-lite.mjs`
- `tools/loop-engineering/test-dry-run-controller.mjs`
- `tools/loop-engineering/README.md`
- `.github/workflows/validate-loop-engineering.yml`
- `evidence/2026/web-project-guide/loop-engineering-phase-a-runtime-evidence.md`

Phase AはGuide側Current Policy Schemaを正本として読み、Target Repository / Work Queue / Queue Requirements revisionをread-onlyでreconcileし、mechanical task candidate、required verifier、blocker / next-action候補をMachine-readable JSONで返します。

Phase A Outputは`authority: derived-loop-dry-run-only`で、formal assignment authorityを持ちません。Policyが将来Phase向けwrite capabilityを含んでも、Phase Aのeffective permissionではwrite / commit / push / merge / deploy / external network / secret accessを無効化します。

Queueが参照するRequirementsが`blobSha`の場合、Target RepositoryのCurrent `HEAD:<requirements-path>`と比較し、stale revisionやdirty Requirementsを`ready`へ丸めません。

GitHub Evidence:

- Runtime implementation PR: `EliteMay/web-project-data#149`
- Squash merge commit: `cba21d98cd12657e42a93a3f82daaddd23926bf3`
- PR-head: Loop Engineering / Validate Data / Reliability / Windows PowerShell Compatibility PASS
- Post-merge `main`: Loop Engineering validationとRepository observation / reconciliationを含むCurrent workflowsが完了し、failureは確認されていない

Phase AはTaskを実行しません。Formal assignment / claim、isolated worker、implementation、independent verifier execution、Receipt persistence、retry / stuck / budget runtimeはPhase B以降です。

---

## 18. V1 Runtime Implementation Status / Next Candidates

### Phase A — Read-only / Dry Run Controller — Implemented

実装済み:

- policy load / Guide Schema validation
- target repository identity / required source inspection
- current queue inspection
- Queue Requirements blob SHA / Current Repository reconciliation
- eligible task candidate simulation
- required verifier resolution
- blocker / stop / next-action simulation
- Phase A read-only permission override
- temporary Git / Queue fixture regression test
- Current `web-project-guide` + Current Guide Queueを使うreal repository smoke
- no repository / queue / loop-state mutation

Phase Aの目的は、実行前にCurrent Stateを安全に説明できることです。`ready`は「実行してよい正式権限」ではなく、次のCoordinator / Phase B判断に渡せるread-only Evidenceです。

### Phase B — Isolated Worker Loop — Next

候補:

- dedicated branch / worktree
- one task formal claim
- implementation
- local + independent verification
- machine-readable receipt
- no merge

Phase BではPhase Aで成立したCurrent Repository / Queue reconciliationを再利用し、WorkerにDefault Branch / Merge authorityを与えません。

### Phase C — Resume / Stuck / Budget

- crash recovery
- failure signature
- progress detection
- budget enforcement
- pause / cancel / kill switch

### Phase D — Parallel-safe Tasks

- independent task detection
- isolated workers
- integration gate
- no overlapping write authority

### Phase E — Optional guarded PR / Merge / Release

Project-specific risk / verification evidenceが十分な場合だけ検討します。

---

## 19. Completion Criteria

### Guide-side Foundation

Foundationは次を満たしています。

- Product Goal / boundary / state / verifier / stuck / budget / permission / recovery / parallelismがCurrent Contractとして定義されている。
- Product Contractが既存Normative Ownerを複製せず参照している。
- Machine-readable Loop Policy Schemaが存在する。
- Safe Example PolicyがSchemaの主要Contractを満たす。
- ExampleがDefault Branch direct-write / merge / deploy / secret accessを許可しない。
- Verifier integrity boundaryを表現できる。
- same-failure / progress detection guardを表現できる。
- terminal statesを機械的に区別できる。
- focused validatorがSchema / Example / safety invariantsを検証する。
- CIでfocused validatorが実行される。

### Runtime Phase A

Phase Aは次を満たした状態をCurrent completionとします。

- Guide側Current SchemaでPolicyをValidationする。
- Target Repository identityをCurrent Git Evidenceから確認する。
- Queue Requirements revisionをCurrent Target Repositoryと照合する。
- stale / dirty / unverified Requirementsをfail closedする。
- Current Queueからmechanical candidateをread-onlyで導出する。
- candidateをformal assignmentへ読み替えない。
- Verifier requirementをPolicy + Taskから導出する。
- Phase A effective permissionがread-onlyへ固定される。
- Fixture TestでQueue / Target Repository / Git statusが変更されない。
- Current Guide / Current Guide QueueによるSmoke Testを通す。
- Data側point-in-time Evidenceを保存する。
- PR-head / merge後mainの必要ValidationでKnown Failureが残らない。

Phase B以降が存在しない場合、Phase A完了を「自律実装Loop完成」とは表現しません。

---

## 20. Out of Scope

Current Phase Aまででは次を実装しません。

- ChatGPT Platform全体のglobal background loop
- hidden system hookの存在を仮定した自動実行
- Productionへの無条件自動Deploy
- Default Branchへの無条件direct write
- unrestricted network / secret access
- Verifierを書き換えてPassさせる仕組み
- すべてのCoding Taskのparallel multi-agent化
- Task qualityを単一Scoreだけで判定する仕組み
- Cost上限のUniversal fixed value

---

## 21. Research Basis / Validation Hypotheses

Loop Engineering自体は新しい分野であり、他実装の形をそのままUniversal Ruleへしません。導入判断では次の公開Evidence /実装知見を参考にしました。

- OpenAI, Harness engineering: repository-local instruction / feedback / cleanup loops
  - https://openai.com/index/harness-engineering/
- Anthropic, Building effective agents: evaluator-optimizer / workflow simplicity
  - https://www.anthropic.com/engineering/building-effective-agents
- Anthropic, effective harnesses for long-running agents: incremental progress / durable handoff / testing
  - https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Anthropic, multi-agent research system: parallelism benefits and coordination / token cost trade-offs
  - https://www.anthropic.com/engineering/multi-agent-research-system
- Academic / emerging work on loop engineering, long-horizon SWE, verifier robustness, self-correction and reward hacking

Current Projectで検証すべきHypothesis:

1. Sequential Loop + protected verifierで、manual repeated promptingよりreworkが減るか。
2. same-failure / progress detectionで無駄なretryとcostを減らせるか。
3. Work Queue / Persistence / Traceabilityを再利用することで新しいState systemを増やさず実装できるか。
4. L1_WORKTREEで十分な価値を出せるか。価値が確認できるまで自動Merge / Deployへ進まない。
5. Maintenance Loopがautomation由来のdrift / duplicate / temporary artifact蓄積を抑えられるか。

Research結果だけでRuntime成功を保証しません。実装後はpoint-in-time EvidenceをData側へ保存し、Keep / Revise / Rejectを判断します。
