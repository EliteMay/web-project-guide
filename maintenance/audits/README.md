# Audit Reports Compatibility Index

`web-project-guide`自身のDeep System Auditの**方法と実行ChecklistはGuide**、各時点のAudit Snapshot / Finding /対応結果の**本体はCompanion Data Repository**を保存先とします。

- Audit method / completion ruleの正本: [`docs/14-continuous-improvement.md`](../../docs/14-continuous-improvement.md)
- 実行Checklist: [`maintenance/DEEP_SYSTEM_AUDIT.md`](../DEEP_SYSTEM_AUDIT.md)
- Audit result data: `EliteMay/web-project-data/evidence/YYYY/web-project-guide/audits/`
- このDirectory: 過去Linkを壊さないためのCompatibility Pointer

## 保存方針

- 新しいpoint-in-time Audit Report本体をこのDirectoryへ蓄積しない。
- Data Repositoryへ書ける場合はAudit result / finding / resolutionをData側へ保存する。
- Guide側にはAudit方法・Current Rule・実行Checklist・必要なCompatibility Pointerだけを残す。
- Audit ReportはCurrent Common RuleやCurrent Guide Stateの第二Source of Truthにしない。
- 次回AuditではDataの古いSnapshotよりCurrent `web-project-guide`を先に再評価する。
- Data Repositoryへ書けない環境では、保存済みと偽らず、必要な結果をWork Report / PR等のAuthoritativeなCurrent work evidenceへ残す。
