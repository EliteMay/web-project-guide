# External Integration Decision System — Phase 19 Promotion Checkpoint

Status: historical non-normative promotion checkpoint / promoted 2026-09-07
Current work branch: `guide/phase-1-19-integration`

このFileはCommon Rule本文ではありません。Phase 19で確定したExternal API / Webhook / Contract Evolution / Reconciliation / Integration TestingのDecisionを、会話移行で失わず既存OwnerへPromotionするためのCheckpointです。

Normative promotion先:

- Integration architecture / mapping → `docs/02-architecture.md`
- Data authority / external state / reconciliation → `docs/03-data-storage.md`
- Webhook delivery / retry / idempotency / degradation → `docs/05-performance-reliability.md`
- Signature / auth / secret / replay security → `docs/06-security.md`（既存Ruleを再利用し重複しない）
- Integration testing / completion → `docs/07-testing-quality.md`
- API / SDK / webhook lifecycle → `docs/13-dependencies-assets.md`
- Diagnostics → `docs/15-development-observability.md`
- Short execution checks → `templates/QUALITY_CHECKLIST.md`

新Owner / 新Gate / 新Profile / 新Risk Signalは追加しない。

---

## 19.1 External Integration Contract / Data Authority / Request-Response Semantics

基本Flow:

```text
Product Task
↓
Integration Purpose
↓
External Authority / Ownership
↓
Request / Response Contract
↓
Validation / Translation
↓
Internal Domain State
↓
User-facing Outcome
```

確定Decision:

- Integration purposeを`read / write / command / sync / event receive`等に分ける。
- External / LocalのどちらがCanonical Authorityか、必要ならField単位でOwnershipを決める。
- External providerのRaw Data ModelをProduct全体へ直接拡散させず、必要範囲でAdapter / Mapper境界を置く。
- ただし小規模Integrationへ意味のない多層Adapterを強制しない。
- External IDはProvider namespaceを必要に応じて保持し、Internal IDと無条件に同一視しない。
- Official API ResponseもUntrusted InputとしてRequired field / Type / Enum / ID / URL / Date / Nullable等を必要範囲でValidateする。
- Unknown enum / future fieldでApp全体を壊さず、未知値を勝手に既知Categoryへ誤変換しない。
- Missing / Null / EmptyをProvider Contract上必要なら区別する。
- `Not Found`と`Integration Failure`を分け、Failureを空配列や0件へ潰さない。
- HTTP / transport successとbusiness operation successを分ける。
- Responseは`receive → normalize → validate → map → commit`のBoundaryを必要に応じて持つ。
- `create / update / replace / delete / archive`等のCommand semanticsを曖昧にしない。
- PATCH的partial updateとwhole-resource replaceを混同しない。
- `created_at / updated_at / received_at / synced_at`等の時刻意味を区別する。
- External authoritative fieldをLocalで編集できるか`read-only / local override / two-way sync`等として決める。
- Raw Provider Payloadの保存をDefaultにせず、Canonicalに必要なFieldだけ保存する選択を許容する。
- Provider ErrorをそのままUser-facing Copyへ露出せず、Product Error Modelへ変換する。
- Integration Boundaryの目的は「1行でProvider交換」ではなく、Provider固有変更の波及を限定すること。

Completion:

```text
Integration Purpose
+
Data Authority
+
Request / Response Semantics
+
Validation / Mapping
+
External ID Boundary
+
Not Found / Failure distinction
+
Internal Commit Boundary
+
Provider-specific details isolation
```

---

## 19.2 Webhook / Event Delivery / Retry / Idempotency / Ordering

基本Flow:

```text
Delivery
↓
Authenticate / Verify
↓
Parse / Validate
↓
Deduplicate
↓
Accept
↓
Durable processing if needed
↓
Apply to Current State
↓
Record result
↓
Acknowledge / Recover
```

確定Decision:

- Webhook DeliveryとBusiness Eventを分け、Request countをBusiness event countとみなさない。
- 同じEventが複数回届く前提でDuplicate-safeにする。
- ProviderがStable Event / Delivery IDを提供する場合はProvider namespace込みでDedup候補にする。
- ID保存だけでExactly-onceを保証したとみなさず、重要MutationではDedupe記録とBusiness MutationのTransaction Boundaryを考える。
- Business Operation自体を可能ならIdempotentにする。`set state`と`increment`のDuplicate Riskを分ける。
- Delivery順序を保証されていると仮定せず、Arrival TimeをVersionとして使わない。
- 必要ならProvider revision / sequence / event created time / canonical API fetchからCurrent Stateを決める。
- Webhook Payloadだけで安全なら毎回Provider APIを再Fetchすることは強制しない。
- Provider signature mechanismがある場合はCurrent official guidanceに従い検証する。
- Raw body署名ならVerification前にParse / reserializeでPayloadを変えない。
- Webhook SecretをFrontendへ置かずtrusted backend / functionで扱う。
- 必要EventだけSubscribe / Processし、Unknown Event TypeでApp全体を壊さない。
- Webhook Payload / API VersionのcompatibilityをMigration時に確認する。
- Heavy ProcessingでWebhook ACKを塞ぐ場合は`verify → durable enqueue/record → ack → async processing`を検討するが、Queueを全Webhookへ強制しない。
- ACKとBusiness Processing Completionを分ける。
- 重要EventではACK前に必要なDurabilityが確保されたかを判断する。
- Provider delivery retry / internal queue retry / downstream retryの責任を理解し、重複Retryを増幅させない。
- ProviderごとのRetry / Redelivery仕様を推測せずCurrent official docsを確認する。
- Manual RedeliveryもDuplicateとして扱う。
- Replay riskがある場合はtimestamp / nonce / delivery ID等をProvider guidanceに従い扱う。
- Retryable / Non-retryable failureを必要に応じて分け、無限Retryしない。
- 重要EventではRepeated failureをDead Letter / Quarantine相当へ隔離できるが、全ProjectへQueue基盤を要求しない。
- Primary Canonical StateとEmail / Analytics等Secondary Side Effectを分け、Secondary failureだけでCanonical successを無条件Rollbackしない。
- Canonical Mutation Ownerを明確にし、複数Handlerが競合更新しないようにする。
- Full webhook payloadを恒久Logへ無条件保存せず、Event ID / Type / Target / Status / Failure reason等へData Minimizationする。

Representative Validation候補:

- Valid event
- Duplicate event
- Out-of-order event
- Invalid signature
- Unknown event type
- Malformed payload
- Provider retry / manual redelivery
- Handler crash / downstream failure
- Old / new payload schema

Completion:

```text
Authentic Delivery
+
Validated Event
+
Duplicate-safe Processing
+
Ordering-independent State handling
+
Explicit ACK Boundary
+
Retry / Redelivery Contract
+
Partial Failure Recovery
+
Observable Processing State
+
Representative Failure Test
```

---

## 19.3 API Versioning / Contract Evolution / Backward Compatibility / Deprecation

基本Flow:

```text
Current Contract
↓
Proposed / Provider Change
↓
Compatibility Classification
↓
Affected Consumers / Data / Events
↓
Migration Strategy
↓
Dual Compatibility if needed
↓
Validation
↓
Cutover
↓
Old Contract Removal
```

確定Decision:

- API ContractはEndpointだけでなくRequest / Response field、Type、Nullable、Enum、Error semantics、Auth、Pagination、Rate Limit、Ordering、Idempotency、Webhook payload、Timing semantics等を含み得る。
- Schema compatibilityとBehavioral compatibilityを分け、意味やDefault変更もBreakingになり得る。
- Unknown fieldを過度に拒否せず、同時に未知FieldをCanonical Dataへ無条件保存しない。
- Enum追加へ安全に対応し、Unknownを既知状態へ勝手にMappingしない。
- 新Required Fieldは旧Consumerを壊し得るため段階移行を検討する。
- Nullability / Type / ID表現 / Pagination / Error Contractの変更をCompatibility対象にする。
- Human-readable Error Message本文へBusiness Logicを依存させず、stable code / statusがあれば優先する。
- Authentication / Scope変更もToken・Reconnect・Background jobへ影響するMigration Eventとして扱う。
- Versioning方式をURLへ固定せず、ProviderのCurrent Contractに従う。
- SDK Version / API Version / Webhook Versionを別Boundaryとして確認する。
- ConsumerをFrontendだけと決めつけず、Electron / CLI / Job / Actions / Other Repository / Webhook Processor等も必要範囲で洗い出す。
- Internal APIでもFrontend / BackendのDeploy順がずれるならCompatibilityが必要になり得る。
- 必要なら`Expand → Migrate → Contract`で段階移行する。
- Compatibility Layer / Dual SupportはMigration完了後にCleanupし、永久Patch Layer化しない。
- Dual Write / Dual ReadはAuthority、Partial failure、reconciliationを明確にする。
- `Deprecated`と`Removed`を分け、Removal deadlineがあるCritical IntegrationはMaintenance対象にする。
- Changelogを毎日監視することは要求せず、Dependency update / Maintenance / Provider notice / behavior drift時にCurrent docsを確認する。
- OpenAPI / JSON Schema / GraphQL Schema等は使える場合にContract Evidenceとして利用できるが導入必須にしない。
- Generated Client成功だけでSemantic compatibilityを証明しない。
- Mockだけでなく必要ならSandbox / real integrationでContractを確認する。
- Saved provider dataがある場合はLocal Schema Migrationも連動して確認する。
- Rollback可能性を確認し、ProviderがOld Versionを廃止済みならForward-fixを前提にする。
- API migrationと大規模Feature / UI / Data rewriteを同時に混ぜすぎない。
- Prototype / internal-only APIへ永久Backward Compatibilityを強制せず、Consumer / Data / Release model / Breaking impactから判断する。

Completion:

```text
Current Contract
+
Compatibility Classification
+
Affected Consumers
+
API / SDK / Webhook version boundary
+
Migration / Deployment order
+
Representative Contract Test
+
Old Contract cleanup
+
Deprecation / Removal awareness
```

---

## 19.4 Reconciliation / Polling / Eventual Consistency / External State Drift

基本Flow:

```text
External Authority
↓
Notification / Poll / API Read
↓
Observed External State
↓
Local Known State
↓
Compare
↓
Drift Classification
↓
Repair / Accept / Escalate
↓
Converged State
```

確定Decision:

- Webhook / API成功だけで永久一致を前提にせず、一時的不一致を許容しつつ再収束できる設計を重視する。
- Eventual ConsistencyをCorruptionと混同せず、同時に永久Driftを正常扱いしない。
- External observed state / Local derived state / Pending operation / Last reconciled stateを必要に応じて分ける。
- `Last attempt / Last successful read / Last successful reconciliation`を必要なら分ける。
- Critical IntegrationではWebhook + on-demand / periodic reconciliationを組み合わせられるが、Pollingを全Integrationへ強制しない。
- Push / Poll / HybridはState urgency、Provider capability、Cost、Rate Limit、User expectationで選ぶ。
- Poll intervalをCommon固定値にせず、許容Stalenessから決める。
- PollingにはTerminal / timeout / maximum attempt等のStop Conditionを持ち、無限Pollingしない。
- 必要ならBackoff / Jitterを使うが小規模Projectへ強制しない。
- Provider APIをFetchしてもProvider内部がEventually Consistentな場合があるためCurrent contractを確認する。
- DriftをExpected lag / missed update / stale cache / conflicting mutation / impossible drift / unknown等へ必要に応じて分類する。
- Drift修復は19.1のAuthorityに従い、`newer timestamp wins`を万能Ruleにしない。
- ReconciliationをBlind overwriteにせずField Ownershipを維持する。
- External deleteとPermission loss / wrong ID / provider failureを混同しない。
- 必要ならTombstoneを使い、404だけでLocal Canonicalを即削除しない。
- 大量ResourceはIncremental sync / cursor / active-only等を検討し、CursorをCanonical Dataと混同しない。
- Cursor expiry / invalid時にFull reconciliationへ戻れるRecovery pathを検討する。
- Full reconciliation中のConcurrent changeはrevision / cursor / snapshot等で必要範囲で扱う。
- Repair OperationもIdempotentを優先し、FailureをTransient / Permission / Conflict / Permanent等へ必要に応じて分類する。
- High-impact ReconciliationはDry run / Diff preview / Batch limit / Backup / Rollback等を検討できるが一律必須にしない。
- Difference countだけでSeverityを決めずData Meaningを重視する。
- Monitoring DashboardをCanonical Stateにせず、Manual repair pathも正当な選択肢とする。
- User-facing UIではProcessing / stale / current unknown等を実際のConsistency Contractに合わせる。
- Scheduled reconciliationだけに永久依存せず、Criticalなら次回起動 / manual trigger / monitoring等のRecoveryを検討する。
- Reconciliation failureを`0件`や`存在しない`へ潰さない。

Representative Validation候補:

- Normal sync
- Missed / duplicate / out-of-order webhook
- Local stale state
- External deletion / permission loss
- Polling failure / cursor expiry
- Partial reconciliation
- Repair retry
- Concurrent provider change
- Full reconciliation recovery

Completion:

```text
Authority
+
Expected Staleness
+
Push / Poll / Hybrid strategy
+
Drift Detection
+
Conflict Classification
+
Safe Repair
+
Incremental / Full Recovery
+
Failure / Unknown State
+
Representative Convergence Test
```

---

## 19.5 Sandbox / Test Environment / Mocking / Contract Test / Production Safety

基本Flow:

```text
Internal Logic
↓
Fixture / Mock
↓
Contract Test
↓
Sandbox / Test Provider
↓
必要ならProduction-safe Verification
↓
Completion
```

確定Decision:

- Fixture / Stub / Mock / Contract Test / Sandbox / Production-safe Checkの役割を分ける。
- MockはProviderの真実ではなく、自分の想定を再現するものとして扱う。
- MockはDeterministic / Fast / CI / Rare failure再現に有効なのでReal Provider Testと併用できる。
- FixtureはOfficial example / Sandbox / sanitized real test payload等へ近づけられるがProduction private payloadをそのままRepoへ保存しない。
- FixtureはTest目的に必要なFieldへMinimizeし、巨大Raw dump化しない。
- SandboxとProductionのData / Permission / Rate / Region / Feature / Timing差を意識する。
- Sandbox未提供ProviderではTest Account / Dedicated Resource / Emulator / Limited production-safe check等を選べる。
- Test credential / Production credentialを分け、Environment labelだけで安全とみなさない。
- Production secretをFixture / Repositoryへ埋め込まない。
- Test Account / Resourceを実Userと分け、Destructive TestをProduction Userへ実行しない。
- Production-safe testが必要ならread-onlyまたはDedicated test entity等でBlast Radiusを限定する。
- Productionを試行錯誤のPrimary Test Environmentにせず、Local/Mock → Sandbox → Production-safe smokeを基本候補にする。
- Production checkが不要なIntegrationも正常とする。
- Test ResourceはCreate → Verify → Cleanupし、Cleanup failureを隠さない。
- Cleanupのためにwildcard destructive operationを使わず対象をStable ID / Prefix等で限定する。
- Test / Production resource namespaceを必要に応じて分ける。
- Contract Testは自Productが依存するRequest / Response / Error部分に絞りProvider全体を再テストしない。
- Timeout / dropped connection / network failure / rate limit等、JSON Error Responseだけでは再現できないFailureも必要に応じてTestする。
- Webhookはhandler unit testだけでなく必要ならHTTP delivery → signature → handler → business stateまで確認する。
- Replay TestはSandbox / disposable data / idempotent handlerを優先する。
- Local tunnel / forwarderは一時的Public exposureとしてSecret / Cleanupを考える。
- Mock / Debug EndpointをProduction Runtimeへ残さない。
- Environment切替を手作業だけに依存しすぎないが、小規模Projectへ過剰Config Platformを導入しない。
- Production DataをSandboxへ安易にCopyせず、Sandbox DataをProduction Canonicalへ混ぜない。
- Mock / Fixture DriftをAPI / Webhook version変更時にReviewする。
- Provider SDK MockだけでActual auth / network / field mappingまでVerified扱いしない。
- External Provider dependent testをfast deterministic CIと分離できる。毎Commit必須にはしない。
- Flaky external testはretry until greenだけで隠さずProduct / Test / Provider原因を分ける。
- Provider unavailableで確認不能なら`Not verified`とする。
- Sandbox validatedとProduction validatedを分ける。
- Provider dashboard delivery成功をBusiness State成功のOracleにしない。

Validation DepthはLow-risk read-only / Stateful / High-impactでRisk-basedに変え、新Profileは作らない。

Completion:

```text
Representative Fixture
+
Deterministic Mock / Contract Test
+
Provider-realistic Validation
+
Test / Production Isolation
+
Failure / Retry Case
+
Webhook Delivery if applicable
+
Safe Test Data / Cleanup
+
Correct Verification State
```

---

## 19.6 External Integration Validation / Operational Readiness / Completion

Integration Completionは`API 200` / `Webhook 200`だけで判定しない。

基本Flow:

```text
Integration Contract
↓
Happy Path
↓
Failure / Retry
↓
Duplicate / Ordering
↓
Current State / Reconciliation
↓
Compatibility
↓
Provider-realistic Validation
↓
Production Safety
↓
Known Limitations
↓
Ready
```

確定Decision:

- Primary User TaskをEnd-to-Endで通し、TransportではなくExpected Product / External StateをOracleにする。
- Read IntegrationではMapping / Missing / Null / Unknown enum / Pagination / Not Found / staleを確認する。
- Important Writeでは必要に応じてRead-backでExpected external stateを確認する。
- Data Authorityと実装が一致していることを確認する。
- Provider-specific detailがProduct全体へ過度に漏れていないかReviewする。
- Representative Failure MatrixをRiskに応じて選び、FailureをEmpty Stateへ潰さない。
- RetryでDuplicate Mutationを起こさない。
- WebhookではDuplicate / Out-of-order / Invalid signature / ACK vs completionを必要範囲で確認する。
- Critical IntegrationでReconciliationを持つならMissed webhook → repair → convergenceを実際にTestする。
- Field ownershipを維持してRepairし、Local-only dataを壊さない。
- Delete / Permission loss / Token expiry / resource unavailableを必要に応じて確認する。
- PollingはTerminal / Failure / Cancel / Timeout / max attemptsで止まることを確認する。
- Provider outageのBlast RadiusをCriticalityに応じてblock / degrade / stale / manual pathへ制御する。
- API / SDK / Webhook / Auth / Error semantics変更後はContract Regressionを再実行する。
- Schema互換だけでなくSemantic compatibilityを確認する。
- Migration共存期間は実在するOld / New combinationを必要に応じてTestし、Migration完了後にLegacy layerをCleanupする。
- Mock / Sandbox / Production validationのEnvironmentを正しくVerification Stateへ記録する。
- Production-safe Smokeが必要かはSandboxで確認できないreal permission / routing / networking等のRiskで決める。
- Test Resource cleanup、Secret / Account boundaryもCompletionへ含める。
- LogsやProvider dashboardだけをSuccess Oracleにしない。
- Production Monitoringは全ProjectのCompletion prerequisiteにせず、Critical IntegrationだけPost-release Reviewを強める。
- Known Provider limitationと未確認条件を明記し、Provider仕様をCommon Guideで推測・Hardcodeしない。

Phase 19 Completion Contract:

```text
Integration Purpose / Authority
+
Request / Response Contract
+
Validation / Mapping
+
Webhook Delivery Safety if applicable
+
Version / Compatibility
+
Reconciliation / Convergence if applicable
+
Sandbox / Provider-realistic Test
+
Failure / Retry / Duplicate handling
+
Security Boundary
+
Known Limitations
```

完成の意味は、**Providerが失敗する・遅れる・重複する・順番が変わる・Versionが変わる・Stateがズレる前提でも、自Productが正しいStateへ安全に収束できること**です。

---

## Promotion / Rule Hygiene

Promotion時は以下を守る。

1. `docs/02 / 03 / 05 / 07 / 13`のCurrent Ruleと重複する部分は既存Ruleを再利用し、Phase番号付きの第二Normative Copyを作らない。
2. Signature / Auth / Secret / Replay Securityは`docs/06`の既存Security Ownerへ委譲する。
3. Retry / Timeout / Backoff等の一般Reliability Ruleは`docs/05`を維持する。
4. Sync / Conflict / Tombstone等の既存Data Ruleは`docs/03`を維持する。
5. API / SDK lifecycleは`docs/13`、Validation / Completionは`docs/07`へ統合する。
6. `maintenance/rule-router.json`の既存`EXTERNAL_API` Signalで必要Ownerへ到達できるかPromotion時に確認し、必要なら既存Signalのdocsだけ拡張する。新Signalは作らない。
7. `START_HERE.md`のExternal API routeとMachine RouterのParityを確認する。
8. `templates/QUALITY_CHECKLIST.md`には短い実行Checkだけ置き、Rule本文を複製しない。
9. Promotion後、このFileはhistorical non-normative evidenceへStatus変更する。
10. 最終PR Headとmerge後mainで`Validate Guide`を確認する。

## Promotion Result — 2026-09-07

Phase 19 Decisions were promoted into the existing Owner model without adding a new Owner, Stable Gate, Profile, or Risk Signal.

- Integration boundary / mapping → `docs/02-architecture.md`
- Data authority / reconciliation → `docs/03-data-storage.md`
- Webhook / delivery / retry → `docs/05-performance-reliability.md`
- Security boundary → existing `docs/06-security.md`
- Integration validation / environment evidence → `docs/07-testing-quality.md`
- API / SDK / Webhook lifecycle → `docs/13-dependencies-assets.md`
- Integration diagnostics → `docs/15-development-observability.md`
- Short execution checks → `templates/QUALITY_CHECKLIST.md`
- Existing `EXTERNAL_API` signal expanded; no new signal was created.

This file is retained as historical non-normative promotion evidence only.
