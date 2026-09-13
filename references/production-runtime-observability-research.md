# Production Runtime Observability Research

Status: **current non-normative evidence**

Last reviewed: 2026-09-14

このReferenceは、Managed Hosting / Serverless / Edge / Backend / Worker等のProduction Runtimeで、Development Diagnosticsだけでは不足する場合のObservability判断を支えるEvidenceです。

Common Rule本文ではありません。NormativeなBehaviorは `docs/15-development-observability.md` を正本とします。

## Current primary / authoritative evidence

### OpenTelemetry — Observability Primer

Source: <https://opentelemetry.io/docs/concepts/observability-primer/>

Current documentationでは、Observabilityを外部からSystem stateを理解し、未知の問題を調査できる能力として説明し、Telemetry signalとしてtraces / metrics / logsを扱っています。またReliabilityを「Userが期待する動作をServiceが実際に行うか」という観点で説明しています。

Promotion candidate:

- Production healthをprocess up/downだけでなくUser-visible outcomeから見る
- metrics / logs / tracesは目的に応じて使い分ける
- distributed / multi-component systemではrequest / operation correlationが原因調査を助ける

### OpenTelemetry — Logging specification

Source: <https://opentelemetry.io/docs/specs/otel/logs/>

Loggingを他のTelemetry signalと分離された孤立情報にせず、必要な場合はtrace / span等のContextと関連付けられる設計を示しています。

Promotion candidate:

- Multi-component flowではCorrelation ID / Trace context等、同じOperationを横断追跡できる最小Contextを検討する
- Full payload保存ではなく、原因箇所を特定できるbounded structured contextを優先する

### Google SRE — Monitoring Distributed Systems / Practical Alerting

Sources:

- <https://sre.google/sre-book/monitoring-distributed-systems/>
- <https://sre.google/sre-book/practical-alerting/>

Current materialでは、MonitoringをProduction service運用の基礎として扱い、User-visible symptomと内部causeを分けること、Alertをnoiseではなく人のActionが必要なSignalとして扱う考え方を示しています。

Promotion candidate:

- AlertはEventが発生しただけで乱発せず、対応Actionへ接続できるものを優先する
- User impact / symptomを見ず内部component metricだけでProduction healthを判断しない
- Dashboard / diagnostic metric / human action required alertを同じ重要度にしない

### Google SRE — Incident Management Guide / Postmortem practice

Sources:

- <https://sre.google/resources/practices-and-processes/incident-management-guide/>
- <https://sre.google/workbook/postmortem-culture/>

Incident responseでは検知、影響抑制、復旧、学習を分け、重大Incident後はRoot Causeと再発防止Actionへ接続する考え方が示されています。

Promotion candidate:

- Production incidentを単なる一時Errorとして閉じず、Impact / Detection / Recovery / Root Cause / Preventionへ接続する
- AlertやMonitoring改善をIncident learningのAction item候補として扱う

## Applicability / limits

このEvidenceは、すべてのProjectへ企業規模のSRE運用を要求する根拠ではありません。

次はCommon MUSTへPromoteしません。

- OpenTelemetry製品 / SDKの導入そのもの
- 全ProjectでのDistributed Tracing
- 全ProjectでのSLO / Error Budget
- 24時間On-call rotation
- Pager system
- 固定Retention期間や固定Alert threshold
- Static SiteへBackend observability stackを追加すること

Simple static site、Local-only tool、single-user app等では既存のBrowser verification / error capture / deployment evidenceで十分な場合があります。

Production Observabilityは、Server / Function / Worker / Queue / managed backend / external runtime等があり、Runtime failureをLocal reproductionだけで把握しにくい場合に比例して適用します。

## Promotion decision

Current GuideへPromoteするDurable Rule:

1. Production RuntimeがMaterialなProjectでは、User-visible healthを確認できるSignalを必要範囲で持つ。
2. Metrics / Logs / Tracesを全部必須化せず、Failureを説明・分離できる最小Telemetryを選ぶ。
3. Multi-component operationでは、必要ならCorrelation可能なContextを持つ。
4. AlertはActionableな条件へ絞り、単なるEvent streamやDashboard情報と区別する。
5. Production IncidentではDetection / Impact / Recovery / Root Cause / Preventionを必要範囲で追跡し、高Cost failureはProject Learning / Regression Guardへ接続する。
6. Telemetry自身のSecret / Personal Data / Retention / Cost / Performanceを制御する。

Current GuideへPromoteしないもの:

- 特定Vendor / Observability backend
- OpenTelemetry必須化
- 固定SLO / Alert threshold / Retention
- Small static projectへの常時remote telemetry

この境界により、Production runtimeのblind spotを減らしつつ、個人・小規模Projectへ不要な運用Infrastructureを強制しません。
