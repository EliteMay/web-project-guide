# 03 データ・保存設計

この章は**Data Authority / 保存先 / Save Lifecycle / Offline / Sync / Conflict / Schema / Migration / History / Cache / Index / Backup / Recovery / User Generated Content**のNormative Ownerです。

Page Load Timing / Initial Transfer / Runtime Costは [05 Performance / Reliability](05-performance-reliability.md)、Testing戦略は [07 Testing / Quality](07-testing-quality.md)、Schema Compatibility / Version維持は [09 Version / Maintenance](09-maintenance.md)、Runtime Diagnostics / Remote Diagnostic Handoff全体は [15 Development Observability / Project Memory](15-development-observability.md)、Remote書込Securityは [06 Security](06-security.md) を正本とします。

Storage技術を先に固定せず、Dataの性質・重要度・利用Flow・Failure Costから設計します。

## Data / Storage Decision Flow

Meaningfulな保存設計では、原則として次の順で判断します。

```text
扱うDataを分類
↓
Canonical / Derived / Index / Cache / History / Backupを分離
↓
Authority / Source of Truthを決定
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

小規模な閲覧Siteへこの全要素を実装するという意味ではありません。該当するData Riskだけ適用します。

## Data Role / Canonical Authority

### MUST: 重要Dataは役割を分ける

少なくとも次を混同しません。

| Role | 意味 |
|---|---|
| Canonical Data | 失うと困る正本Data |
| Derived Data | Canonicalから再生成できるData |
| Search Index | 検索高速化用の再生成可能Data |
| Cache | 一時的な高速化 / 再取得用Data |
| History / Snapshot | 過去状態 / 復旧候補 |
| Backup | 障害復旧用の独立Copy |
| Session / Presence / Temporary | 永続正本ではない一時Data |

### MUST: 同じDataに無条件で複数の正本を作らない

LocalとCloudの双方を使う場合でも、DataごとにAuthorityを明示します。

代表Pattern:

- Local Canonical + Cloud Sync Replica
- Cloud Canonical + Local Offline Replica / Cache
- Local-only Canonical
- Data categoryごとにAuthorityを分離

Local / Cloudを両方同時に「正本」と呼び、どちらが優先されるか不明なままSync / Conflict実装へ進みません。

Derived / Search Index / Cache / Backupの消失や破損だけでCanonical User Dataを失わない構造を原則とします。

## Local-first / Cloud-first / Local-only

Local-firstを全Projectへ強制しません。Data特性から選びます。

### Local-firstを優先検討する条件

- Userが自分で作るDataが中心
- Offlineでも主要操作を継続したい
- Network障害で作業を失わせたくない
- 個人利用中心
- Cloudは同期 / Backupの役割で十分

### Cloud-firstを優先検討する条件

- Server Authorityが必須
- 複数User共有・権限管理が重要
- Remoteの最新状態が正本
- ClientをAuthorityとして信頼できない

### Local-onlyを優先検討する条件

- 単一Device中心
- Sync不要
- Export / Backupで十分
- 外部Serviceを増やす価値が低い

### MUST: Local保存成功とCloud同期成功を分ける

Local-first + Cloud Syncでは少なくとも次を同じ成功状態にまとめません。

- Local Saved
- Sync Pending
- Syncing
- Synced
- Sync Failed
- Conflict

Remote障害だけで、既にLocalへ保存済みのCanonical Dataを失わせません。

## Offline Capability

Offlineは単純なON / OFFではなく、**Offline中に何ができるか**をContract化します。

判断用の候補Level:

- No Offline
- Offline Read
- Offline Edit
- Offline Create
- Offline Full

Level名を全Projectへ固定する必要はありませんが、少なくともOffline時の許可操作 / 禁止操作 / 保存先 / 再接続時Behaviorを明示します。

Offline writeを許可する場合の基本Flow:

```text
Online
↓
Network切断
↓
Offline
↓
許可操作はLocalへ保存
↓
Remote mutationはPending Queueへ保持
↓
Reconnect
↓
Current Remote Stateを確認
↓
Conflict Check
↓
Sync
```

重要なPending Writeは、必要に応じてReload / App restart後も保持します。

Reconnect時に古いQueueを無条件送信せず、該当する場合は次を再確認します。

- Remote revision
- Tombstone / Delete state
- Auth / Permission
- Schema compatibility
- Queue validity
- Operation dependency

Service Worker / Cache StorageによるApp AssetのOffline利用と、IndexedDB等によるUser Data / Pending Write保存を同じRequirementとして扱いません。

Browser / OSのBackground executionが必ず動く前提にせず、App起動時 / Online復帰時にもPending Queueを再確認できる構造を優先します。

## Cloud Sync

Cloud Syncは保存そのものではなく、Replica間を整合させる仕組みです。

```text
Local save
≠
Cloud sync
```

Cloud Syncは、複数Device利用、Login後の復元、Device故障への保険、共有、Remote処理等に意味がある場合だけ追加します。

### Sync対象を絞る

再生成可能または共有不要なら、原則として次をSync対象から外します。

- Cache
- Local Search Index
- Temporary State
- Device-specific Setting
- 再生成可能なDerived Data

Cloud Syncでは該当する範囲で次を判断します。

- Full / Incremental Sync
- Push / Pull
- Pending Queue
- Retry / Backoff
- Duplicate prevention
- Partial failure
- Delete Sync
- Tombstone
- Offline → Online reconciliation
- Remote unavailable時のBehavior
- Partial / Selective Sync

大量Data / Mediaでは全Data Syncを前提にせず、Record / Category / Project / Date Range / Active-Archived / Metadata-Blob等の単位を検討します。

Metadataは広く同期し、大きなBlobはOn-demand取得する構造を選べるようにします。

Partial Syncでは `未同期 / Remote-only / Available / Deleted / Unavailable` 等を必要に応じて区別し、未同期Dataを削除済みと誤認しません。

Sync Filterから外れただけでCanonical Dataを勝手に削除しません。

### Long-term Pending / Retry

何度試しても同期できないOperationを無限Retryしません。

Failureを必要に応じて次へ分類します。

- Transient — Network / Timeout等
- Recoverable — Auth / Conflict / Migration待ち等
- Permanent — Remoteで永続的に受け付けられないData等

1件の壊れたOperationが無関係なQueue全体を永久停止させないよう、必要に応じてQuarantine / Dead-letter相当へ隔離します。

ただしCreate → Edit → Delete等の依存関係があるOperationでは、順序を無視して後続だけ適用しません。

Sync不能を理由にLocal Canonical Dataを削除しません。

QuarantineしたOperationを再投入する場合は、再ValidationとCurrent Remote State / Conflict Checkを行います。

## Conflict Resolution

### MUST: 全Dataへ同じ競合Ruleを適用しない

Conflict ResolutionはDataのLoss許容度・意味・同時編集Patternから選びます。

対象Scenario:

- 同Recordを複数Device / Tabから編集
- Offline中に両方で編集
- Edit vs Delete
- 古いRevisionからのSave
- 同Field / 別Fieldの同時変更

候補方式:

- Last Write Wins
- Record-level Merge
- Field-level Merge
- Manual Resolution
- Append-only / Event-based Model

軽いPreference等、Loss許容DataではLWWを使えます。

重要UGC、長文、金額、Progress等、失うCostが高いDataへ無条件LWWを適用しません。Data特性に応じてMerge / Manual Resolution / Domain-specific Policyを定義します。

### MUST: `updatedAt`だけに依存しない

競合検知では`revision`等の論理Versionを基本候補とし、古いRevisionが新しいDataを黙って上書きしない構造を優先します。

```text
read revision = 8
remote revision = 8
→ save候補

read revision = 8
remote revision = 9
→ conflict
```

Delete vs Editでは、古いOffline Dataから削除済みRecordが意図せず復活しないよう、必要に応じてTombstoneを使います。

CRDT / OT等はReal-time共同編集や高頻度同時Mergeが本当に必要な場合だけ検討します。

## Autosave / Save Lifecycle

Autosaveを単なるTimerではなく、変更からCanonical StorageへのCommitと、必要ならRemote SyncまでのLifecycleとして扱います。

### MUST: Save成功はCanonical StorageへのCommitで判断する

UI stateだけ更新した、Memoryへ入った、Remote Requestを開始した、という状態を保存成功にしません。

代表Lifecycle:

```text
Dirty
↓
Pending
↓
Saving
↓
Local Saved / Canonical Saved
↓
Sync Pending
↓
Syncing
↓
Synced
```

Failureは成功状態と分離します。

- Save Failed
- Sync Failed
- Conflict

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

古い非同期Saveが新しいStateを上書きしないよう、Revision / Save Sequence / Serialized Queue等を利用できる構造を優先します。

State保存とEvent保存は同じQueue最適化を無条件に適用しません。Event自体に意味がある場合は中間Eventを潰しません。

Reset / Delete後にはwrite barrierやPending Autosave取消等を通し、古いRuntime StateからDataが復活しないことまでSave Contractへ含めます。

## 保存先の基本判断

Authority / Save / Sync方針を決めた後で、Storage技術を選びます。

| データ | 第一候補 |
|---|---|
| 小さい設定・ID・軽い履歴 | localStorage |
| 画像・音声・動画・手書き・大量履歴 | IndexedDB |
| 公開共通データ | GitHub上のJSON |
| 一時セッション | sessionStorage / memory |
| 複数端末同期 | Supabase等を必要時のみ |
| AIへ渡す短期Runtime Diagnostics | Local-first + 必要時のみShared Remote Store |
| Electronユーザー設定 | Electron `userData` |

### localStorage

localStorageは便利ですが、容量が小さく同期APIです。

原則として以下を直接入れません。

- Data URL画像
- Base64動画
- 大量の手書きStroke
- 巨大な診断データ
- 大量のバイナリ相当データ

localStorageには軽い参照や設定だけを持たせます。

### IndexedDB

以下ではIndexedDBを優先的に検討します。

- Blob
- 画像
- 音声
- 動画
- Canvas / ペン履歴
- Snapshot
- 大量履歴
- Local detailed diagnostics
- Durable Pending Queue

削除時は参照されなくなったBlob等の孤児データも掃除します。

## Remote Diagnostic Snapshot

CONDITIONAL: AIへRuntime診断を繰り返し渡すProjectでは、詳細LogをLocalへ残し、**Sanitize済みCompact Snapshotだけを別のRemote Storeへ置く**構成を選べます。

Storage設計として守る境界:

- Core data syncとRemote Diagnosticsを分離する
- Remote failureでLocal diagnostics / Core保存を失わない
- Binary / Storage全DumpをRemote DiagnosticsのDefaultにしない
- Remote側にもSize / Retention上限を持つ

具体的なPayload / Trigger / Retention / Free-only / AI読取順は [15 Development Observability / Project Memory](15-development-observability.md)、Key / RLS / Grant等は [06 Security](06-security.md) を確認します。

## JSON / Data構造 / Large Data

この節は、**Dataをどの意味単位で構造化し、Schema / Manifestをどう保つか**を扱います。Initial Loadへ何KB載せるか、Critical / Deferred / On DemandのTiming、UI blocking等のRuntime Costは [05 Performance / Reliability](05-performance-reliability.md) を正本とします。

大量Dataは固定件数 / 固定MBだけで判定せず、次を合わせて判断します。

- Data量
- Growth Rate
- Read Pattern
- Write Pattern
- Search Pattern
- Update Frequency
- Device Capability
- Failure Impact

大量DataではPage / Route / Category / Feature等、Userが使う意味のある単位で分けられる構造を優先します。

```text
data/
├─ manifest.json
├─ items/
├─ settings.json
└─ schema.json
```

Manifest / Indexで実行時に読むFile一覧や期待件数を管理すると、JSへのhardcodeを減らせます。

Data構造では次を確認します。

- 巨大な1 File / 1 Recordだけへ無条件に集約しない
- `1 Record = 1 File`等の過剰分割で管理Costを増やさない
- Userが使う意味単位 + 更新単位 + 破損時の影響範囲でPartition / Chunkを判断する
- 検索用の軽量IndexとDetail本文を分けられるか検討する
- Blob / Metadata / Referenceを必要に応じて分離する
- Pagination / Cursor / Lazy / Chunk Load / Virtualization等を必要時に選べる構造にする
- Partial Update / Incremental Sync / Incremental Backup / Chunk Migrationを必要時に選べる構造にする
- Archive / Retention / Garbage Collectionを必要時に設計する
- Data件数とDOM件数を同一視しない
- Git差分・破損時の影響・将来拡張も考慮する

小規模Dataまで機械的に分割しません。固定Sizeだけで分割単位を決めず、**利用単位 + 更新単位 + 保守性 + Failure blast radius**を中心に構造を決めます。

Quota不足時は既存正常Canonical User Dataを勝手に削除せず、Temporary / Cache / Derived / Rebuildable Index等を優先Cleanup候補にします。

## Search Index

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

### MUST

- Index消失 / 破損だけでCanonical Dataを失わせない
- IndexとCanonicalが不整合なら、Indexを無効化してCanonicalからRebuildできるようにする
- 再生成可能なLocal Indexを原則Cloud Sync対象から外す
- Server-side SearchでもRemote IndexをCanonical Data扱いしない

Canonical Schemaとは別にIndex Versionを持てる構造を推奨します。検索仕様変更を無条件にCanonical Data Migrationへ結び付けません。

通常変更ではIncremental Update、大きなTokenizer / Index Schema変更ではFull Rebuildを検討します。

## Cache

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

Service Worker / HTTP Cache等のRuntime Performance判断は [05 Performance / Reliability](05-performance-reliability.md)、GitHub Pages固有のCache Bustingは [08 GitHub Pages](08-github-pages.md) を確認します。

## Schema Version

永続Dataには可能な限りVersionを持たせます。

```json
{
  "schemaVersion": 1,
  "items": []
}
```

読み込みは原則として次の順です。

```text
Read
↓
Parse
↓
Version確認
↓
Migrate
↓
Normalize
↓
Validate
↓
Integrity Check
↓
利用
```

未対応Future Schemaを既知Schemaとして勝手に上書きしません。

## Migration

保存KeyやSchemaを変更するときは、旧Dataを勝手に捨てません。

- 旧Keyから読める
- 移行失敗時に元Dataを残す
- 破損JSONは上書き前にRecovery Copyを作る
- 大きな変更はSchema / README / Work Reportを同時更新
- 高Risk変更ではRollback可能性を検討
- 大量DataではChunk Migration / Resume / Retry Safetyを必要に応じて検討

Schema互換性・Version維持の詳細は [09 Version / Maintenance](09-maintenance.md) を確認します。

## History / Undo / Snapshot / Backup

Undo / Redo、History、Snapshot、Restore Point、Backup、Rollbackを同じ機能として扱いません。

- **Undo / Redo** — 直前操作の取消 / 再適用
- **History** — 過去Revisionの履歴
- **Snapshot** — 特定時点の固定状態
- **Restore Point** — 復旧用に戻せる状態
- **Backup** — 障害復旧用の独立Copy
- **Rollback** — 失敗した変更・Migration・Restore等を元へ戻す手段

Undo方式はState Snapshot / Inverse Operation等をProjectに応じて選びます。

Historyは無制限RetentionをDefaultにせず、Data価値・Storage Cost・Recovery要求からRetention / Rotation / Cleanupを決めます。

Multi-device環境ではUndo / Restoreを時間そのものの巻き戻しではなく、過去内容を**新しいRevisionとして再適用**する方式を基本候補にします。

```text
rev 10
rev 11
rev 12
Undo
↓
rev 13 = rev 11相当の内容
```

Delete等の高Cost操作ではUndo / Trash / Soft Delete等のRecovery可能性を必要に応じて検討します。

「現在のJSONを更新すると過去記録の意味が変わる」DataはSnapshotを検討します。

例:

- 問題を解いた当時の問題文
- AI分析時点の入力
- Review対象時点の設定

## Optimistic Update

Optimistic UpdateはRemote完了前のUI仮反映であり、全操作へ適用しません。

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

内部Stateでは必要に応じて `pending / confirmed / failed / conflict` を区別し、Remote Failure時のRollback / Retry / Recoveryを定義します。

### MUST

- 古いOperationのRollbackで、その後の新しいUser変更まで消さない
- Retryで二重登録が起き得る場合、Idempotency Key / Stable Operation ID等を検討する
- Optimistic UIだけをCanonical Save成功と扱わない

Local-firstでは、UIだけの仮更新より、**Local CanonicalへCommitした後にRemote Sync Pendingとする構造**を優先候補にします。

## User Generated Content

User Generated Contentは再生成不能または再作成Costが高いDataとして、軽いSettingよりRecovery要求を強めます。

対象例:

- Notes / Text
- Drawing
- Image / Audio / Video
- Uploaded File
- User-created Item / Template
- Game Save / Build

### MUST: UGCは明示的なCanonical Dataとして扱う

App update、Cache cleanup、Index rebuild、Sync failure等でUGCを失わせません。

UGC Lifecycleでは該当する範囲で次を設計します。

- Stable ID
- Metadata
- Blob / File Reference
- Create / Edit / Save
- Sync
- History
- Rename / Move
- Delete / Recovery
- Import / Export
- Validation
- Size / Format Limit
- Migration
- Backup / Restore
- Conflict Resolution
- Portability
- Orphan Cleanup

Stable IDを基本候補とし、Rename / MoveでIdentityが変わらない構造を優先します。

大きなContentではMetadata / Blob / Referenceを分離し、一覧表示やSyncで巨大Binaryを毎回読む必要を減らします。

Orphan Blob / Broken Referenceの双方を想定し、Cleanup時には本当に未参照か確認してから削除します。

重要UGCではExport / Backup / Restore / Conflict Recoveryを強く検討し、無条件LWWによるData Lossを避けます。

## 座標保存

UI上の座標は画面絶対座標より、対象要素内の相対座標を優先します。

```text
x: 0.00〜1.00
y: 0.00〜1.00
```

画面Sizeや上部要素の高さ変更でずれにくくなります。

## Data Integrity / Corruption Recovery

重要User Dataでは、破損を「起きないもの」と扱いません。

想定対象:

- Invalid JSON
- 必須Field欠落 / 型不正
- Duplicate / Invalid ID
- Broken Reference
- Missing Blob
- Unknown / Future Schema
- Migration途中Failure
- IndexedDB Transaction Failure
- Partial Cloud Sync
- Restore途中Failure
- Quota不足
- Storage Eviction
- Corrupt Backup

### MUST: 破損Dataを即時上書き・削除しない

破損検知直後のDefaultを全Resetにせず、次を優先します。

- Recovery Copy
- Quarantine / Isolation
- Partial Repair
- Backup / Snapshot Restore
- 正常Recordだけの継続利用

一部Recordだけ壊れている場合は、参照整合性を壊さない範囲で正常Dataを利用し、問題Recordだけ隔離できる構造を優先します。

Recoveryの基本優先順位:

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

## Storage失敗

CONDITIONAL: User dataが重要な場合、次を想定します。

- localStorage quota / write failure
- IndexedDB open / transaction failure
- Browser storage制限 / eviction
- Import途中の失敗
- Migration途中の失敗
- Pending Queue書込失敗
- Remote Sync / Cloud unavailable
- Remote Diagnostic Store unavailable（採用時）

失敗時に元Dataを消してから再試行する設計は避けます。

Remote Diagnostics保存失敗はCore機能の保存失敗と分離します。

## 複数Tab競合

CONDITIONAL: 同じDataを複数Tabから編集でき、上書きが問題になる場合は競合を考慮します。

例:

```text
Tab A: revision 5を読込
Tab B: revision 5を読込 → revision 6として保存
Tab A: 古い状態をそのまま保存
```

必要に応じて次を使います。

- revision比較
- updatedAt補助情報
- BroadcastChannel
- storage event
- 保存前のConflict警告 / Resolution UI

単純な閲覧Siteでは過剰実装しません。

## Backup / Restore Strategy

BackupはCanonical Dataではなく**復旧用の独立Copy**です。

Cloud Sync、Autosave、Undo、HistoryをBackupの代用として扱いません。

### Backup Trigger候補

- Manual Export
- Automatic Snapshot / Checkpoint
- Migration前
- Import / Restore前
- Reset / 全削除前
- 大規模Schema変更前
- Cloud Versioned Backup

Data重要度に応じて次を判断します。

- Local / Off-device / Cloud Backup
- Backup Format Version
- Data Schema Version
- Retention / Rotation
- Backup Size
- Encryption / Access Control
- Partial Restore
- Cross-version Restore

Encryption / secret / access controlの詳細は [06 Security](06-security.md) を正本とします。

無制限BackupをDefaultにしません。Data価値・Storage Cost・Recovery Point要求からRetention / Rotationを決めます。

Backup Format VersionとData Schema Versionは別概念として扱える構造を推奨します。

### MUST: Backup作成だけで完了扱いしない

重要Dataでは、BackupのCompletionを少なくとも次まで含めます。

```text
Backup作成
↓
Backup Parse / Format確認
↓
Restore
↓
再読込
↓
Integrity Validation
↓
復旧確認
```

Backup Fileが存在するだけ、ExportできただけではRestore可能性を確認したことになりません。

### 破壊的Import / Restoreの順序

CONDITIONAL: Importが既存localStorage / IndexedDB / Cloud stateを**置き換える**場合、単にTop-level Schemaを確認するだけでは不十分です。

原則として次の順序を使います。

```text
1. Fileをparse
2. Top-level Schema / Version確認
3. 全Store / RecordをValidation
4. 現在DataをBackup / Recovery Snapshot
5. Import dataをnormalize / 必要ならmigrate
6. 置換を実行
7. 読み戻してValidation
8. 成功なら完了
9. 途中失敗ならBackupからRollback
```

重要なのは、**既存StoreをclearしてからImport dataの不正に気付かないこと**です。

複数Storeを扱う場合、Browser Storage全体を1 Transactionにできないことがあります。その場合はApp側でRollback用Snapshotを持ちます。

最低限Validationする例:

- Schema / Version
- 必須Top-level key
- Array / Object等の型
- Record ID
- 参照先ID
- Store名
- 数値範囲
- 想定外の巨大Data URL / Blob相当
- 現在Versionで扱えないFuture Schema

Import失敗時は「一部だけ新Data、一部だけ旧Data」の状態をCanonicalとして残さないことを優先します。

Testing全体とFailure Injectionは [07 Testing / Quality](07-testing-quality.md) を確認します。

## Destructive Reset / Delete

CONDITIONAL: Reset / Deleteが永続Dataを初期化・削除し、その直後にReload / Navigation / page lifecycle eventが発生するAppでは、**Reset成功後に古いRuntime stateが再保存されないこと**までReset Contractへ含めます。

Resetは「Defaultを書いた / Keyを消した」で完了扱いにせず、必要に応じて次の順序を使います。

```text
1. User confirmation
2. Canonical reset / delete write
3. 成功後にreset-pending / write barrierを有効化
4. Autosave / beforeunload / visibilitychange / 別Moduleのlate writeを拒否
5. Feature-local auxiliary stateをcleanup
6. Reload / Runtime再生成
7. 再読込後にDefault / Empty stateを確認
```

重要点:

- write barrierはButton handlerだけでなく、可能ならStorage layer等の共通保存境界へ置く
- Canonical reset / deleteが失敗した場合、先にauxiliary stateだけを削除しない
- Reset後に古いin-memory objectをAutosaveすると削除前Dataが復活するため、Lifecycle Saveも同じbarrierを通す
- 複数Moduleが独立保存するAppでは、Reset対象のauxiliary storage / timer / pending writeも洗い出す

Regression Testでは最終状態だけでなく、**Reset成功後に意図的に古いstateのsaveを1回実行してもDataが復活しないこと**を確認します。Lifecycle hookが関係する場合はBrowser SmokeでReset → Reload → 再読込まで確認します。

## Storage Capabilityを過剰実装しない

全Projectへ同じStorage Complexityを要求しません。

判断補助として次のような段階を考えられます。

- Stateless
- Simple Local
- Important Local + Backup / History
- Synced / Multi-device
- Collaborative / Concurrent Editing

名称や番号を固定Frameworkとして強制せず、Simple Local ProjectへCRDTやDead-letter Queue等の高度Complexityを持ち込まないために使います。

## Validation Boundary

この章はStorage Contractの正本です。Save / Offline / Sync / Conflict / Corruption / Migration / Backup / Large Data / Cache / Index / UGCの具体的なVerification Strategyは [07 Testing / Quality](07-testing-quality.md) を正本とします。

## 関連Catalog

- Failure: [F-002 / F-003 / F-018](../catalog/failures.md)
- Success: [S-004 / S-005 / S-006 / S-007 / S-022](../catalog/success-patterns.md)
- Anti-pattern: [AP-005 / AP-006 / AP-025](../catalog/anti-patterns.md)

## External Data Authority / Reconciliation

CONDITIONAL: When local state represents or synchronizes external provider state, define authority before sync mechanics. Historical promotion evidence: [Phase 19 External Integration Decision System](../maintenance/research/external-integration-decision-system.md).

- Decide whether External or Local state is Canonical, and when needed define ownership per field (`read-only external / local override / two-way sync`). Do not use last-write-wins as a universal substitute for ownership.
- Raw provider payload storage is not the default. Persist the Canonical fields and identifiers the Product actually needs unless audit / recovery requirements justify more.
- Distinguish states such as `observed external`, `local derived`, `pending operation`, and `last reconciled` when collapsing them would hide uncertainty. `Last attempt`, `last successful read`, and `last successful reconciliation` may also differ.
- Webhook delivery or one successful API call does not prove permanent consistency. Critical state may use push, poll, on-demand reconciliation, or a hybrid based on allowed staleness, provider capability, cost / rate limit, and User expectation.
- Do not set one Common polling interval. Derive it from tolerated staleness and provider limits, and give polling a terminal / timeout / maximum-attempt or equivalent stop condition.
- Classify drift only as deeply as needed: expected lag, missed update, stale cache, conflicting mutation, deletion, permission loss, provider failure, impossible drift, unknown, etc.
- Repair follows the declared authority and field ownership. A newer local timestamp does not automatically override an externally authoritative field.
- External delete, permission loss, wrong ID, and provider outage are different states. Do not interpret every `404`-like response as permission to delete Local Canonical Data when the provider contract is ambiguous.
- Tombstones, cursors, revision / sequence, incremental sync, and full reconciliation are conditional tools. If incremental state can expire or become invalid, provide a bounded recovery path to a trusted full reconciliation when the integration needs it.
- Reconciliation operations should be duplicate-safe where practical. High-impact repair may use dry-run / diff preview / batch limit / backup / rollback when the data risk justifies it; these are not universal requirements.
- Reconciliation failure must remain distinguishable from `0 items`, `not found`, or successful convergence.

Convergence tests are owned by [07 Testing / Quality](07-testing-quality.md); webhook and retry mechanics by [05 Performance / Reliability](05-performance-reliability.md).
