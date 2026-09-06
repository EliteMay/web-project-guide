# Audit Reports

`web-project-guide`自身のDeep System Audit結果を保存する非Normative Archiveです。

- Audit method / completion ruleの正本: [`docs/14-continuous-improvement.md`](../../docs/14-continuous-improvement.md)
- 実行Checklist: [`maintenance/DEEP_SYSTEM_AUDIT.md`](../DEEP_SYSTEM_AUDIT.md)
- このDirectory: 各時点のAudit Snapshot / Finding /対応結果

## 保存方針

- Audit Reportは開始時のbaseline commit / date / owner countを記録する。
- Findingは`what happened → why → action → final result`を追跡できるようにする。
- 修正後は`resolved / external-blocked / evidence-deferred / not-applicable`等へ更新する。
- Current Common RuleをこのDirectoryへ複製しない。
- 過去ReportをCurrent Guideの代わりに使わず、次回AuditではCurrent Repositoryから再評価する。
- Scoreは弱点発見の補助に使えるが、Completion条件にはしない。
