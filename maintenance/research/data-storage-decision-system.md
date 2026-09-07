# Data / Storage Decision System — Phase 4 Research Contract

Status: pending research / current project requirement
Source of Truth for priority/status: [`../../REQUIREMENTS.md`](../../REQUIREMENTS.md)

このFileはCommon Rule本文ではありません。Schema Version、Migration、Rollback、IndexedDB、Backup / Restore等の既存Ruleを土台にしつつ、**User Dataを安全に保存・変更・同期・復旧するためのEnd-to-EndなData / Storage Decision System**を研究・設計するための、`web-project-guide`自身のCurrent Research Contractです。

後から変更するとMigration、Data Loss、互換性、Cloud Cost、Sync Conflict等の修正Costが非常に高いため、Phase 4ではData / Storageを主要なHigh-cost / Risk Decisionとして扱います。

主なNormative Owner候補は [`docs/03-data-storage.md`](../../docs/03-data-storage.md) とします。Cross-owner責務は次の通り分離します。

- Data構造 / Source of Truth / 保存 / Sync / Conflict / Migration / Recovery → `docs/03-data-storage.md`
- 大量Data / Search / CacheのRuntime性能 → `docs/05-performance-reliability.md`
- Cloud / Auth / Remote write / Backup secret等のSecurity → `docs/06-security.md`
- Save / Offline / Sync / Restore / Failure Injection等のVerification → `docs/07-testing-quality.md`
- Schema Compatibility / Version維持 → `docs/09-maintenance.md`

同じWorkflow全文を複数Ownerへ複製しません。

## Goal

最終的にProjectごとに次のFlowを一貫して判断できる状態を目標とします。

```text
扱うDataを分類
↓
Canonical / Derived / Cache / Index / History / Backupを分離
↓
Source of Truth / Authorityを決定
↓
Local / Remote / Hybridを決定
↓
Save / Autosave方式を決定
↓
Offline Capabilityを決定
↓
Cloud Sync / Reconnectを決定
↓
Conflict Resolutionを決定
↓
History / Undo / Recoveryを決定
↓
Scale / Search / Cacheを決定
↓
Backup / Restoreを設計
↓
Failure CaseをValidation
```

Storage技術を先に固定せず、Dataの性質・重要度・利用Flow・Failure CostからArchitectureを決めます。

## Research Domain 1 — Data Ownership / Source of Truth

最低限次を区別できるようにします。

- Canonical Data — 失うと困る正本Data
- Derived Data — Canonicalから再生成できるData
- Search Index — 検索高速化用Data
- Cache — 一時的な高速化用Data
- History / Snapshot — 過去状態
- Backup — 障害復旧用の独立Copy
- Session / Presence / Temporary Data — 永続正本ではないData

LocalとCloudの双方を使う場合も、無条件に両方を同時の正本とせず、どちらがAuthorityか、またはどのData単位でAuthorityを分けるか明示できることを要求します。

Search Index / Cache / Derived Dataの消失・破損だけでCanonical User Dataを失わない設計を基本候補とします。

### Decision Candidate

- Local Canonical + Cloud Sync Replica
- Cloud Canonical + Local Offline Replica / Cache
- Local-only Canonical
- Data categoryごとにAuthorityを分離

DataごとのAuthorityが不明なままSync / Conflict実装へ進まないことを目標とします。

## Research Domain 2 — Local-first Decision

Local-firstを全Projectへ強制せず、Local-first / Cloud-first / Local-onlyをData特性から選べるようにします。

### Local-firstの主な候補条件

- Userが自分で作るDataが中心
- Offlineでも主要操作を継続したい
- Network障害で作業を失わせたくない
- 個人利用中心
- Cloudは同期 / Backupの役割で十分

### Cloud-firstの主な候補条件

- Server Authorityが必須
- 複数User共有・権限管理が重要
- Remoteの最新状態が正本
- ClientをAuthorityとして信頼できない

### Local-onlyの主な候補条件

- 単一Device中心
- Sync不要
- Export / Backupで十分
- 外部Serviceを増やす価値が低い

Local-first + Cloud Syncでは `Local Saved` と `Synced` を別状態として扱います。

## Research Domain 3 — Offline Capability

Offlineを単純なON / OFFではなくCapabilityとして判断します。

候補Level:

- No Offline
- Offline Read
- Offline Edit
- Offline Create
- Offline Full

Level名・番号自体を固定Frameworkとして必須化するかはResearch結果で判断します。

Offline中に可能な操作 / 不可能な操作、Local保存、Pending Write、Reload後の保持、Reconnect後のConflict Check / Syncまでを一つのFlowとして設計します。

```text
Online
↓
Network切断
↓
Offline状態
↓
許可操作はLocal保存
↓
Remote mutationはPending
↓
Reconnect
↓
Current Remote State確認
↓
Conflict Check
↓
Sync
```

Service Worker / Cache StorageによるApp AssetのOffline利用と、IndexedDB等によるUser Data / Pending Write保存を別Requirementとして扱います。

## Research Domain 4 — Cloud Sync

Cloud Syncを保存そのものではなく、Replica間を整合させる仕組みとして扱います。

```text
Local save
≠
Cloud sync
```

Cloud Syncは、複数Device利用、Login後の復元、Device故障への保険、共有、Remote処理等に意味がある場合だけ追加します。

Sync対象 / 非対象Dataを分離し、Cache / Search Index / Temporary State / Device-specific Setting等は、再生成可能または共有不要なら原則Sync対象から外します。

Cloud Syncでは少なくとも次を判断します。

- Full / Incremental Sync
- Push / Pull
- Pending Queue
- Retry / Backoff
- Duplicate prevention
- Partial failure
- Delete Sync
- Tombstone必要性
- Offline → Online reconciliation
- Remote unavailable時のBehavior

Remote障害だけで既に保存済みLocal Dataを失わない構造を優先します。

## Research Domain 5 — Conflict Resolution

Conflict ResolutionはData種類ごとに選択します。

対象Scenario:

- 同Recordを複数Device / Tabから編集
- Offline中に両方で編集
- Edit vs Delete
- 古いRevisionからのSave
- 同Field / 別Fieldの同時変更

候補方式:

- Last Write Wins — 軽いPreference等、Loss許容Data
- Record-level Merge
- Field-level Merge
- Manual Resolution
- Append-only / Event-based Model

重要Dataへ無条件のLast Write Winsを適用しません。

`updatedAt`だけに依存せず、`revision`等の論理Versionを基本候補とし、古いRevisionが新しいDataを黙って上書きしない構造を要求します。

```text
read revision = 8
remote revision = 8
→ save候補

read revision = 8
remote revision = 9
→ conflict
```

Delete vs Editでは、古いOffline Dataで削除済みRecordが意図せず復活しないよう、必要に応じてTombstone等を検討します。

CRDT / OT等はReal-time共同編集等が本当に必要な場合だけ検討します。

## Research Domain 6 — Autosave / Save Lifecycle

Autosaveを単なるTimerではなく、変更から永続化・同期までのLifecycleとして扱います。

```text
Dirty
↓
Pending
↓
Saving
↓
Local Saved
↓
Sync Pending
↓
Syncing
↓
Synced
```

Failureでは `Save Failed / Sync Failed / Conflict` を成功状態から分離します。

判断対象:

- Debounce / Throttle
- Explicit Save
- Important Action Checkpoint
- Navigation / Data switch
- App / Page lifecycle
- Concurrent Save
- Save Queue
- Retry
- Offline Save

古い非同期Saveが新しいStateを上書きしないよう、Revision / Save Sequence / Serialized Queue等を利用できる構造を検討します。

State保存とEvent保存は同じQueue最適化を無条件に適用せず、Event自体に意味がある場合は中間Eventを潰しません。

Reset / Delete後にはwrite barrierやPending Autosave取消等を通し、古いRuntime StateからDataが復活しないことを要求します。

## Research Domain 7 — Data Integrity / Corruption Recovery

永続Dataの利用Flowは原則として次を基本候補とします。

```text
Read
↓
Parse
↓
Version
↓
Migration
↓
Normalize
↓
Validate
↓
Integrity Check
↓
利用
```

想定対象:

- Invalid JSON
- 必須Field欠落 / 型不正
- Duplicate ID
- Broken Reference
- Missing Blob
- Unknown / Future Schema
- Migration途中Failure
- IndexedDB Transaction Failure
- Partial Cloud Sync
- Restore途中Failure
- Quota不足
- Storage Eviction

重要User Dataでは、破損検知直後の即削除を標準にせず、Recovery Copy、隔離、Partial Repair、Backup Restore等を優先します。

一部Recordだけ壊れている場合は、参照整合性を壊さない範囲で正常Dataを利用し、問題Recordだけ隔離できる構造を検討します。

未対応Future Schemaを既知Schemaとして勝手に上書きしません。

Recovery優先順位は概ね次を候補とします。

```text
現Data保護
↓
Backup / Snapshot確認
↓
Migration / Repair
↓
Partial Recovery
↓
Safe Fallback
↓
最終手段としてReset
```

## Research Domain 8 — Backup / Restore Strategy

次を別概念として扱います。

- Autosave — 最新状態の保存
- Undo — 直前操作の取消
- History — 過去Revision
- Snapshot — 特定時点の固定状態
- Backup — 障害復旧用の独立Copy
- Export — UserによるData持ち出し

重要Dataでは、Backupが存在することではなく、**Backupから実際にRestoreできること**をCompletionの中心とします。

Backup Trigger候補:

- Manual Export
- Migration前
- Import / Restore前
- Reset / 全削除前
- 大規模Schema変更前
- Automatic Checkpoint
- Cloud Versioned Backup

Restoreは原則として次を候補とします。

```text
Backup Parse
↓
Backup Format / Schema確認
↓
全Data Validation
↓
必要ならMigration
↓
Current Data Recovery Snapshot
↓
Restore
↓
再読込
↓
Integrity Validation
↓
成功確定
```

途中失敗では中途半端な状態をCanonicalとして残さず、Restore前SnapshotからRollback可能な構造を優先します。

Backup Format VersionとData Schema Versionは別概念として持てるようにします。

Cloud SyncをBackupと同一視しません。

## Research Domain 9 — History / Undo

Undo / History / Snapshot / Backupの責務を分離します。

Undo方式はState Snapshot / Inverse Operation等をProjectに応じて選びます。

Historyは長期Revisionとして扱い、無制限RetentionをDefaultにしません。

Multi-device環境ではUndo / Restoreを時間そのものの巻き戻しではなく、過去内容を新しいRevisionとして再適用する方式を基本候補とします。

```text
rev 10
rev 11
rev 12
Undo
↓
rev 13 = rev 11相当の内容
```

Delete等の高Cost操作ではUndo / Trash / Soft Delete等のRecovery可能性を必要に応じて検討します。

## Research Domain 10 — Optimistic Update

Optimistic UpdateはRemote完了前のUI仮反映として扱い、全操作へ適用しません。

向いている主な操作:

- Like / Favorite
- 軽いSetting
- 並び替え
- Rollbackしやすい状態変更

慎重にする主な操作:

- 重要UGC
- 大規模Delete
- 課金 / 権限変更
- 一度しか実行できない操作
- Server Validationが複雑な操作

内部Stateでは `pending / confirmed / failed / conflict`等を区別し、Remote Failure時のRollback / Retry / Recoveryを定義します。

古いOperationのRollbackで、その後の新しいUser変更まで消さない構造を要求します。

Retryによる二重登録を避けるため、必要に応じてIdempotency Key / Stable Operation ID等を検討します。

Local-firstでは、UIだけの仮更新より、Local CanonicalへCommitした後にRemote Sync Pendingとする構造を優先候補にします。

## Research Domain 11 — Large Data

大量Dataは固定件数 / 固定MBだけで判定せず、次を合わせて判断します。

- Data量
- Growth Rate
- Read Pattern
- Write Pattern
- Search Pattern
- Update Frequency
- Device Capability
- Failure Impact

巨大な1 File / 1 Recordへの集約も、`1 Record = 1 File`の過剰分割もDefaultにしません。

Userが使う意味単位 + 更新単位 + 破損時の影響範囲でPartition / Chunkを判断します。

大量Dataでは必要に応じて次を検討します。

- Pagination / Cursor
- Lazy / Chunk Load
- Indexed lookup
- Virtualization
- Partial Update
- Incremental Index / Sync / Backup
- Blob / Metadata分離
- Archive / Retention
- Garbage Collection
- Quota handling
- Chunk Migration

Data件数とDOM件数を同一視しません。

Quota不足時には、既存正常User Dataを勝手に削除せず、Temporary / Cache / Derived / Rebuildable Index等を優先Cleanup候補にします。

## Research Domain 12 — Search Index

Search Indexは原則として再生成可能なDerived Dataとして扱います。

```text
Canonical Data
↓
Index Build
↓
Search Index
↓
Result ID
↓
Canonical Detail
```

Index消失 / 破損だけでCanonical Dataを失わない構造を要求します。

Canonical Schemaとは別にIndex Versionを持てる構造を候補とし、検索仕様変更を無条件にCanonical Data Migrationへ結び付けません。

通常変更ではIncremental Update、大きなTokenizer / Index Schema変更ではFull Rebuildを検討します。

IndexとCanonical Dataが不整合になった場合は、Indexを無効化してCanonicalからRebuildできることを優先します。

再生成可能なLocal Indexは原則Cloud Sync対象から外します。Server-side Searchが必要な場合でもRemote IndexをCanonical Dataとは扱いません。

## Research Domain 13 — Cache

Cacheは消失してもCanonical Dataから復元 / 再取得できる高速化用Dataとして扱います。

対象例:

- Memory Cache
- HTTP Cache
- Cache Storage
- IndexedDB Cache
- Application-level Cache
- Remote Cache

最低限、Cache Invalidation条件を定義します。

候補Trigger:

- Canonical Data変更
- Schema / Format / Version変更
- TTL超過
- Logout / User切替
- Delete
- Permission変更

TTLは固定時間ではなく、DataのFreshness Requirementから判断します。

Stale-while-revalidateは古さを許容できる公開Content等で検討し、権限・金額・Conflict判定用Revision等へ無条件に適用しません。

Account / Permissionが関係するCacheではUser境界を守ります。

Cache write failureとCanonical save failureを混同しません。

## Research Domain 14 — User Generated Content

User Generated Contentは再生成不能または再作成Costが高いDataとして、軽いSetting等よりRecovery要求を強めます。

対象例:

- Notes / Text
- Drawing
- Image / Audio / Video
- Uploaded File
- User-created Item / Template
- Game Save / Build

Stable IDを基本候補とし、Rename / MoveでIdentityが変わらない構造を優先します。

大きなContentではMetadata / Blob / Referenceを分離し、一覧表示やSyncで巨大Binaryを毎回読む必要を減らします。

UGC Lifecycleとして少なくともCreate / Edit / Save / Sync / History / Rename / Move / Delete / Recovery / Cleanupを考慮します。

Orphan Blob / Broken Referenceの双方を想定し、Cleanup時には本当に未参照か確認してから削除します。

重要UGCではExport / Backup / Restore / Conflict Recoveryを強く検討し、無条件LWWによるData Lossを避けます。

## Research Domain 15 — Real-time Collaboration / CRDT / Advanced Sync

CRDT / OT等は通常SyncのDefaultにせず、次のような条件でのみ検討します。

- 複数Userが同一Documentを同時編集
- Real-time共同編集
- Offline編集同士を大量にMerge
- 高頻度MutationでManual Conflict Resolutionが成立しない

Sync方式は次のように、より単純な方式から必要性を確認します。

```text
Revision + Conflict Detection
↓
Field-level Merge
↓
Operation-based Merge
↓
CRDT / OT
↓
Real-time Collaboration
```

Operation-based SyncではOperation ID / Ordering / Replay / Duplicate Prevention / Compaction / Snapshot等を考慮します。

Presence / Cursor / Selection等の一時DataはCanonical User Dataと分離します。

Real-time接続断でも、可能な範囲ではLocal Edit / Pending Operationを保持し、Reconnect時にReconciliationできる設計を検討します。

## Research Domain 16 — Partial / Selective Sync

大量Data / Media / Device差があるProjectでは、全Data Syncを前提にしません。

Sync単位候補:

- Record
- Category
- Project / Folder
- Date Range
- Active / Archived
- Metadata / Blob

Metadataは広く同期し、大きなBlobはOn-demand取得する構造を有力候補とします。

Partial Syncでは `未同期 / Remote-only / Available / Deleted / Unavailable`等の状態を区別し、未同期Dataを削除済みと誤認しないことを要求します。

Sync Filter変更時にLocal Dataをどう扱うかもContract化し、Sync対象外になっただけでCanonical Dataを勝手に削除しません。

## Research Domain 17 — Background Sync / Reconnect

Background SyncはOffline edit / Long-lived Pending Queue等で必要なProjectだけに採用します。

Reconnect時には古いQueueを無条件送信せず、必要に応じてRemote Revision / Tombstone / Auth / Schema / Queue Validityを再確認します。

FailureはRetryable / Non-retryable / Conflict / Validation等へ分類し、Temporary failureではBackoff付きRetryを検討します。

重要Pending Operationは必要に応じてReload / App restart後も保持します。

State Syncでは不要な中間変更を圧縮できる場合がありますが、Operation自体が意味を持つEvent Syncでは順序を壊しません。

Browser / OSのBackground executionが必ず動く前提にせず、App起動時 / Online復帰時にもPending Queueを再確認できる構造を要求します。

## Research Domain 18 — Sync Recovery / Long-term Pending / Dead-letter

何度試しても同期できないOperationを無限Retryしません。

Failureを少なくとも次のように分類できることを目標とします。

- Transient — Network / Timeout等
- Recoverable — Auth / Conflict / Migration待ち等
- Permanent — 永続的にRemoteで受け付けられないData等

長期Pendingは、いつから / なぜ同期できていないかを判断可能にします。

1件の壊れたOperationが無関係なQueue全体を永久停止させないよう、必要に応じてQuarantine / Dead-letter相当へ隔離します。

ただしCreate → Edit → Delete等の依存関係があるOperationでは、順序を無視して後続だけ適用しません。

Sync不能を理由にLocal Canonical Dataを削除しません。

QuarantineしたOperationを再投入する場合は、再ValidationとCurrent Remote State / Conflict Checkを行います。

## Storage Capability Level

全Projectへ同じStorage機能を要求しないため、Projectに必要な保存能力を段階で考える方法を研究します。

候補:

- Level 0 — Stateless
- Level 1 — Simple Local
- Level 2 — Important Local / Backup / History
- Level 3 — Synced / Multi-device
- Level 4 — Collaborative / Concurrent Editing

Level名・番号の固定を目的にせず、Level 1 ProjectへLevel 4相当のComplexityを強制しないための判断補助として評価します。

## Research Priority

### P0 — 最優先

- Data Source of Truth
- Local-first
- Offline
- Cloud Sync
- Conflict Resolution
- Autosave / Save Lifecycle
- Data Integrity / Corruption
- Backup / Restore

### P1 — 高

- History / Undo
- Optimistic Update
- Large Data
- Search Index
- Cache
- User Generated Content

### P2 — 必要時

- Real-time Collaboration / CRDT / OT
- Advanced Partial / Selective Sync
- Background Sync高度化
- Long-term Pending / Dead-letter

P2を通常の個人Projectへ標準搭載しません。

## Validation Contract

Data / StorageではHappy Pathだけで完成扱いにせず、Projectに該当する範囲で少なくとも次を確認できるDecision Systemを目標とします。

### Save / Autosave

- 新規保存 → Reload後も保持
- Autosave待ち中のNavigation / Data切替
- Save中の追加編集
- 古い非同期Saveによる上書き防止
- Storage write failureをSaved表示しない
- Reset後のlate AutosaveでDataが復活しない

### Offline / Reconnect

```text
Online
↓
Offline
↓
Create / Edit
↓
Reload
↓
Online復帰
↓
Conflict Check
↓
Sync
```

Pending QueueのReload後保持、Retry、Duplicate preventionも必要に応じて確認します。

### Cloud Sync / Conflict

- Device A変更 → Device Bへ反映
- Edit vs Edit
- Edit vs Delete
- Delete vs Offline Edit
- 古いRevisionからSave
- RetryによるDuplicate
- Partial Sync Failure

重要Dataでは、Conflict時に片方が黙って消えないことを確認します。

### Corruption

意図的に次を壊したCaseを検討します。

- Invalid JSON
- Missing Required Field
- Wrong Type
- Duplicate ID
- Missing Blob
- Broken Reference
- Future Schema
- Partial Migration

期待結果は、Corruption検知 → 正常Data保護 → 必要なら隔離 / Recoveryであり、全Resetを最初の動作にしません。

### Migration

- 旧Version → Migration → 新Version → Reload → Validation
- Migration途中Failure
- 再実行Safety
- Future Schema
- 大量Data Migration
- Migration前Backup

### Backup / Restore

```text
Current Data
↓
Backup
↓
Data変更 / 削除
↓
Restore
↓
Reload
↓
Integrity Validation
```

不正Backup、古いSchema、Restore途中Failure、一部Store FailureもRiskに応じてTest候補とします。

### Large Data

実Dataに近い規模で必要に応じて次を測定します。

- Initial Load
- Search
- Save / Autosave
- Sync
- Migration
- Backup / Restore
- Index Rebuild
- Memory Usage

固定性能値をCommon Ruleにせず、Projectごとの実用上のBudgetを決めます。

### Cache / Index

Cache削除後の再取得、Index削除 / 破損後のRebuildを確認し、Derived Data消失だけでCanonical Dataが壊れないことをRegression対象にします。

### UGC

Rename / Move / Duplicate / Delete / Restore / Missing Blob / Orphan Cleanup / Export / Import / Sync Conflictを必要に応じて確認します。

### Failure Injection

重要Storageでは、Transaction途中失敗、複数Storeの一部Failure、Network断等を意図的に発生させ、中間状態をCanonicalとして残さずRollback / Recoveryできるか検証します。

## Success Criteria

Phase 4完了時は少なくとも次を満たします。

- Canonical / Derived / Cache / Index / History / Backupを区別できる
- Local / Cloud / HybridのAuthorityを理由付きで選べる
- Local-firstを採用する条件 / 採用しない条件がある
- Offline CapabilityをProjectごとに決定できる
- Offline → Reconnect → Syncを判断できる
- Cloud Sync対象 / 非対象を決められる
- Multi-tab / Multi-device Conflictに明確なPolicyを選べる
- Autosave失敗 / Pending / Conflictを成功扱いしない
- Undo / History / Snapshot / Backupを区別できる
- Optimistic Update失敗時のRollback / Recoveryを判断できる
- 大量DataのRead / Write / Growth Strategyを判断できる
- Search Index / CacheをCanonical Dataから分離できる
- UGCのLifecycleとRecoveryを扱える
- Corruption時に重要Dataを即破棄しない
- Backupから実際にRestoreできる
- Migration失敗時のRollback / Recoveryを考慮できる
- Retry / Long-term Pending / Quarantineを必要時に扱える
- Data / Performance / Security / Testing / MaintenanceのOwner責務が重複しない
- 小規模ProjectへEnterprise級Storage Architectureを強制しない
- Failure ScenarioをObservableなValidationへ落とせる

代表Validation Caseには少なくとも次を含めます。

1. 設定だけ保存する小規模Site
2. IndexedDBへ大量Progressを保存するApp
3. 画像 / 動画等のUGCを持つApp
4. Offline編集可能なNote App
5. 複数Deviceで同期するApp
6. 同一Recordを2 Deviceから編集
7. Offline編集後にRemote側も変更されているCase
8. Autosave中にTab / App終了
9. Storage quota不足
10. Migration途中Failure
11. Search Indexだけ破損
12. Cacheだけ消失
13. Backupが古いSchema
14. Restore途中Failure
15. User Dataの一部Corruption
16. Delete vs Edit Conflict

## Failure Criteria / Non-goals

次はPhase 4の失敗または過剰設計とします。

- 全ProjectへIndexedDBを強制する
- 全ProjectへCloud Syncを要求する
- Supabase等の特定ProviderをCommon Defaultに固定する
- Local-first / Offline-firstを目的なく強制する
- Last Write Winsだけで全Conflictを済ませる
- 全ProjectへCRDT / OTを導入する
- Cache / Search IndexをCanonical Dataとして扱う
- Search Index破損でUser Dataまで消える
- Autosave / Undo / History / Snapshot / Backupを同じ概念として扱う
- Backup Fileを作れるだけでRestoreを確認しない
- Cloud SyncがあるからBackup不要とする
- 無制限History / Cache / Backup / Operation Logを持つ
- Storage APIの説明書だけになりDecision Criteriaがない
- `03 / 05 / 06 / 07 / 09`へ同じRuleを重複させる
- 小規模ProjectへEnterprise級Data Architectureを要求する

Phase 4はStorage機能を増やすことではなく、**必要なProjectだけに必要な保存能力を選び、User Dataを失わず、競合・Offline・Migration・Corruption・Recoveryまで含めて将来変更に耐えられる判断体系を作ること**を完成基準とします。
