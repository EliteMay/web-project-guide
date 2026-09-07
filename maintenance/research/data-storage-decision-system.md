# Data / Storage Decision System — Phase 4 Research Record

Status: completed / promoted on 2026-09-07
Normative status: historical non-normative evidence

Phase 4では、User Dataを安全に保存・変更・同期・復旧するためのData / Storage Decision Systemを整理し、確定したCommon Ruleを既存Ownerへ昇格しました。

このFileは現在のRule本文ではありません。Current behaviorは次を正本とします。

- Data Authority / Source of Truth / Local-first / Offline / Cloud Sync / Conflict / Autosave / History / Optimistic Update / Large Data structure / Search Index / Cache / UGC / Corruption / Backup / Restore → [`../../docs/03-data-storage.md`](../../docs/03-data-storage.md)
- Large Data / Search / CacheのRuntime Performance → [`../../docs/05-performance-reliability.md`](../../docs/05-performance-reliability.md)
- Cloud / Auth / Remote write / Backup secret等のSecurity → [`../../docs/06-security.md`](../../docs/06-security.md)
- Save / Offline / Sync / Conflict / Restore / Corruption / Large Data / Cache / Index / UGCのVerification → [`../../docs/07-testing-quality.md`](../../docs/07-testing-quality.md)
- Schema Compatibility / Version維持 → [`../../docs/09-maintenance.md`](../../docs/09-maintenance.md)

## Promoted Decisions

Phase 4で確定し、Ownerへ昇格した主要Decision:

1. DataごとにCanonical Authorityを明示し、Local / Cloudを無条件に同時の正本へしない。
2. Canonical / Derived / Search Index / Cache / History / Backup / Temporary Dataを分離する。
3. Local-firstを全Projectへ強制せず、Local-first / Cloud-first / Local-onlyをData特性で選ぶ。
4. Local保存成功とCloud同期成功を別状態として扱う。
5. Offline capabilityを許可操作単位で定義し、Offline writeはLocal保存 + Pending Queue + Reconnect時Conflict Checkを基本とする。
6. Service Worker / Cache StorageによるApp Asset OfflineとUser Data / Pending Write保存を分離する。
7. Cloud Syncは必要Dataだけを対象とし、Retry / Backoff / Duplicate Prevention / Partial Failure / Delete / Tombstone / Reconciliationを考慮する。
8. Conflict ResolutionはData Risk別に選び、重要Dataへ無条件LWWを適用しない。`revision`等の論理Versionを基本候補とする。
9. AutosaveはTimerではなくCanonical CommitまでのSave Lifecycleとして扱い、古い非同期Save / late writeによる上書きを防ぐ。
10. Undo / Redo / History / Snapshot / Restore Point / Backup / Rollbackを分離し、Retentionを無制限Defaultにしない。
11. Optimistic UpdateはRollback可能な操作へ限定し、pending / confirmed / failed / conflict、Rollback / Retry / Idempotencyを必要に応じて扱う。
12. Large Dataは固定件数だけでなくGrowth / Read / Write / Search / Device / Failure Impactから判断し、意味単位 + 更新単位 + Failure blast radiusでPartitionする。
13. Search Index / Cacheは原則再生成可能Dataとし、消失・破損だけでCanonical Dataを失わせない。
14. UGCは明示的なCanonical Dataとして扱い、Stable ID / Blob Reference / Migration / Backup / Conflict / Portability / CleanupまでLifecycleを考慮する。
15. Corruption検知時は即削除・全Resetを標準にせず、Recovery Copy / Quarantine / Repair / Partial Recovery / Backup Restoreを優先する。
16. BackupはCanonicalではなく独立Recovery Copyとし、Backup作成ではなく Backup → Restore → Reload → Integrity Validation を完了条件の中心にする。
17. Partial Sync / Background Reconnect / Long-term Pending / Dead-letter / CRDT等は必要性があるProjectだけに追加し、通常Projectへ高度Complexityを強制しない。

## Validation Promotion

Phase 4のFailure Validation Caseは [`../../docs/07-testing-quality.md`](../../docs/07-testing-quality.md) と [`../../templates/QUALITY_CHECKLIST.md`](../../templates/QUALITY_CHECKLIST.md) へ昇格しました。

代表Case:

- Save → Reload
- Offline Edit → Reload → Reconnect → Conflict Check → Sync
- Edit vs Edit / Edit vs Delete / Delete vs Offline Edit
- Future Schema / Partial Migration / Corrupt Record
- Backup → Restore → Reload → Integrity Validation
- Cache削除後の再取得 / Index破損後のRebuild
- Large DataのSave / Search / Sync / Migration / Backup / Index Rebuild
- UGCのRename / Move / Delete / Restore / Missing Blob / Orphan Cleanup / Conflict

## History

Phase 4の詳細なResearch Draft / Priority / Decision CandidateはGit historyに残ります。Current Project Contractは [`../../REQUIREMENTS.md`](../../REQUIREMENTS.md)、Current Common Ruleは各Owner Docを参照します。
