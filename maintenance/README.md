# Maintenance Metadata

このDirectoryは、`web-project-guide`自身の機械可読なMaintenance / Routing設定と、繰り返し使う実行Checklistを置きます。

- `review-policy.json` — Continuous Improvement / Review運用設定
- `rule-router.json` — Work Type / Domain / Risk Signalから必要Owner Doc / Gateへ到達するMachine-readable Routing正本
- `rule-router.schema.json` — Router構造Schema
- `DEEP_SYSTEM_AUDIT.md` — Guide自身を横断点検するDeep Audit実行Checklist
- `audits/` — 過去Link互換Pointer。Audit結果本体は書込み可能なら`EliteMay/web-project-data/evidence/`へ保存
- `research/` — Current Research execution assetと過去Link互換Pointer。Historical / point-in-time Research本体は書込み可能なら`EliteMay/web-project-data/research/`へ保存

Behavioral Rule本文は`docs/`のOwner Docを正本とします。`DEEP_SYSTEM_AUDIT.md`もNormative Ownerではなく、[`docs/14-continuous-improvement.md`](../docs/14-continuous-improvement.md) の手順を再現可能にする実行補助です。

Guideへ残すのはCurrent Rule / Procedure / Routing / Validationと、公開して再利用するCurated Referenceです。時点Audit、Project固有Evidence、Promotion済みResearch履歴などの保存データをMaintenance設定と混在させません。
