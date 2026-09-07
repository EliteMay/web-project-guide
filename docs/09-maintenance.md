# 09 Version / Maintenance

この章は**Version / Release / Legacy / Maintenance / Rollback / Recovery**の正本です。

GitHub上の変更経路・Branch / PRは [10 Project Management](10-project-management.md)、Data Schema / Migrationは [03 Data / Storage](03-data-storage.md)、Dependency update mechanicsは [13 Dependencies / Assets](13-dependencies-assets.md)、Electron Installer / Auto Updateは [11 Electron / Distribution](11-electron-distribution.md) を正本とします。

## Versionを一元化する

表示Version・Build・Schemaを必要に応じて分離します。

例:

```js
export const VERSION = {
  app: "0.1.0",
  build: "20260830-1",
  schema: 1
};
```

サイト内の各ページへVersionを手入力しません。

Version / Build / Schemaを複数箇所へ置く必要がある場合も、**正本を1か所に決め、他は正本から参照・生成・検証**します。

特に次の値は古いhardcodeが残りやすいため注意します。

- 画面に表示するVersion
- Session / Exportへ記録するApp Version
- Cache Busting用文字列
- `package.json` Version
- Schema Version
- Build ID
- Release Tag / Installer / Update Metadata

Static Validatorで一致を確認できる場合は自動化を優先します。

## App / Build / Schema Versionを混同しない

- **App Version** — User-facing release / compatibility
- **Build** — 同じApp Version内でも区別が必要なArtifact / pipeline output
- **Schema Version** — Persistent Data structureのmigration boundary

同じ値にする必要はありません。Schema変更がないUI ReleaseでSchema Versionを上げたり、Build番号だけ変わったことをMajor Release扱いしたりしません。

## Runtime名はVersionと分離する

Versionを持つことと、**RuntimeのPathへVersionを埋め込むことは別**です。

継続運用する正式Runtimeは、特別な理由がなければ安定したPathを優先します。

```text
推奨:
js/app/app.js
css/app.css

避けたい恒久構造:
js/v060/app.js
js/v061/app.js
css/app-v060.css
```

`js/v060/`の中身が整理されていても、次回修正時に`v061/`をコピーして増やす運用へ戻ると、Versioned Patchと同じ問題を再発しやすくなります。

Versionは`meta.js` / `version.js` / manifest等の**Metadata**で表し、実行Pathはできるだけ安定させます。

例外:

- Migration検証用に旧Runtimeを明示的に隔離する
- 複数Major Versionを同時配信する明確な要件がある
- Release Artifact自体をVersion付きDirectoryへ固定する必要がある

例外時も、どれが現在の正式Runtimeかを明記します。

## Cache Busting

`?v=123`や`?b=20260830-1`を使う場合、HTMLへ別のVersion文字列を手入力し続けません。

- Build stepから生成する
- manifestから参照する
- 必要な時だけ使う
- Service WorkerやHTTP Cacheの更新戦略と整合させる

単純なGitHub Pagesサイトでは、手動Cache Bustingを増やすより安定Path + 通常の再読み込みで十分かを先に確認します。

## SemVer / Release Meaning

目安:

- PATCH: バグ修正・小改善
- MINOR: 後方互換な機能追加
- MAJOR: 互換性を壊す大変更

個人用では厳密なSemVerに縛られすぎず、変更規模を判断しやすくするために使います。

MeaningfulなReleaseでは必要に応じて次を一致させます。

```text
Version Source of Truth
↓
Build / Artifact
↓
Release Tag / Metadata
↓
CHANGELOG / Release Note
↓
Deployment / Installer
```

Release NoteやCHANGELOGへ実装履歴を全部書かず、User / maintainerがCompatibility・Migration・主要変更を判断できる粒度を優先します。

## Release Artifactの追跡性

Release Artifactは、どのSource / Commitから生成されたか追えることを優先します。

- Stable Releaseを未確認の別Build Artifactへ差し替えない。
- 同VersionのArtifactを後から静かに置き換えて修正済み扱いにしない。
- 壊れたReleaseを配布した場合は、可能なら追跡可能な新Version / new buildで修正版を出す。
- Build / deploy / installer生成を別経路で行う場合も、どのSourceに対応するか分かるようにする。

Electron固有Artifact / Auto Updateは [11](11-electron-distribution.md) を確認します。

## 変更前に確認

既存Projectを変更するときの**何を読むか /どこまで読むか**は [21 Rule Routing / Preflight](21-rule-routing-preflight.md) と [10 Project Management](10-project-management.md) を正本とします。

この章では一覧を第二正本として固定せず、Version / Runtime Path / Legacy / Patch / Release / Recoveryに関係する変更で特に次のMaintenance-specific Evidenceを追加確認します。

- Current RuntimeがどのPath / Entry Pointか
- App / Build / Schema Versionの正本がどこか
- Cache Busting / Service Worker / Release MetadataとのVersion整合
- 旧Runtime / Legacy / Migrationが意図的に残っているか
- Version付きCopy / Patch ScriptがCurrent Runtimeへ重複していないか
- Current Release / Deploy / ArtifactのSource Commit
- Rollback / Recovery時にData / Config / external stateへ影響するか

Storage Schema / Migration自体の安全Contractは [03 Data / Storage](03-data-storage.md)、最終Validationは [07 Testing / Quality](07-testing-quality.md) を正本とします。

## 大きな変更

大きな変更では最初に以下を明示します。

- なぜ必要か
- 影響する機能
- 影響するファイル
- 保存互換性
- メリット
- デメリット
- Rollbackできるか
- Rollbackできない場合のRecovery / Forward-fix

## Rollback / Recovery

Rollbackを`git revert`だけと同義にしません。

変更によって戻す対象は異なります。

```text
Code
Release Artifact
Deployment
Persistent Data / Schema
Configuration / Secret reference
External Provider state
```

### SHOULD: High-risk変更では回復経路を先に考える

特に次では、実施前にRollback / Recoveryを確認します。

- Existing Save / Schema
- Public Release
- Auth / Permission
- External API / Provider切替
- Electron Installer / Auto Update
- destructive cleanup / bulk delete

### Code / Deploy

CodeやStatic Deployだけなら前Commit / known-good Artifactへ戻せる場合があります。

ただし、同時にData SchemaやExternal Stateを変更した場合、Codeだけ戻すとさらに壊れる可能性があります。

### Data / Schema

Schema Migrationでは「Down Migrationが書ける」ことだけを安全条件にしません。

- 旧Codeが新Dataを読めるか
- Migration後に情報が失われていないか
- Rollbackで二重変換 /破損しないか
- Forward-fixの方が安全か
- Irreversible変換前にBackup / Snapshotが必要か

を確認します。

Data Migration詳細は [03](03-data-storage.md) を正本とします。

### RecoveryはRollbackと別

Provider outage、broken cache、corrupt derived index等では、以前のVersionへ戻すよりRecovery / rebuild / reconnectの方が適切な場合があります。

```text
Rollback
= 以前のknown-good状態へ戻す

Recovery
= Current versionのまま正常状態へ復帰する

Forward-fix
= 新しい修正版へ進める
```

3つを同じものとして扱いません。

## Failed Deployment / Broken Production

Deployment Jobが失敗したことと、Productionが壊れていることを分けます。

- Deploy失敗でも以前のProductionが正常なら、まず正常版を維持する。
- Productionが壊れている場合は、known-good deploy / artifact / forward-fixの最短安全経路を選ぶ。
- Data migration途中ならCodeだけのRollbackを自動選択しない。
- Recovery後はRoot CauseとRegression Guardを必要に応じて [15 Project Learnings](15-development-observability.md) へ残す。

Feature Flag / staged rollout等は必要なProjectでのみ使い、個人用小規模Siteへ企業向けRelease Infrastructureを機械的に導入しません。

## 旧実装

新Runtimeへ切り替えたら、旧Runtimeを本番フォルダへ大量に残さないことを優先します。

Git履歴へ残るため、現在実行されない旧版は必要に応じて削除します。

ただしMigrationやLegacy Compatibilityで必要なものは、役割を明示して隔離します。

```text
legacy/
migrations/
```

## Patchを重ねない

緊急修正を別JSで追加する場合でも、それを恒久構造にしません。

一定段階で正式実装へ統合します。

統合後は「旧Patchを読み込んでいない」だけでなく、**旧Patchを増やしやすいVersion付きRuntime構造そのものが残っていないか**も確認します。

Hotfixはtemporary mitigationとして有効ですが、恒久的な例外Layerにしません。Root Causeを正式責務へ統合できたらcleanupします。

## Dependency / Legacy Maintenance

Dependency updateの選定・Security alert・Major upgradeは [13 Dependencies / Assets](13-dependencies-assets.md) を正本とします。

Maintenanceとしては:

- Deprecatedだからという理由だけで全面Rewriteしない。
- 使われていないLegacy / Dependencyは実利用・dynamic load・configを確認してから削除する。
- 重大Vulnerabilityやbroken provider等、現在影響するRiskは優先して処理する。
- 更新BenefitよりRegression / Migration Costが大きい場合、既知のsafe version維持も選択肢にする。

## Documentation

READMEには「現在仕様」を書き、過去履歴を延々追加しません。

長い変更履歴はCHANGELOG / 作業報告へ分離します。

役割:

- README — Current entry / usage
- Requirements / Spec — Current Contract
- CHANGELOG — Release history
- Work Report — Current work / Validation
- PROJECT_LEARNINGS — durable recurrence knowledge
- Git / PR — detailed diff / discussion

同じ履歴を複数Fileへ完全Copyしません。

## 未確認

実機・外部通信・長期利用など確認できなかった項目は必ず明記します。

「コード上は問題なさそう」と「確認済み」を区別します。

## 関連Catalog

- Failure: [F-001 / F-004 / F-017](../catalog/failures.md)
- Success: [S-001 / S-021](../catalog/success-patterns.md)
- Anti-pattern: [AP-001 / AP-004 / AP-024](../catalog/anti-patterns.md)
