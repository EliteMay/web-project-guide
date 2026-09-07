# 13 Dependencies / Assets

この章は**Dependency選定・更新、Assetの権利・配布元・Repository管理**の正本です。

Security risk / Secret / Third-party code trust boundaryは [06 Security](06-security.md)、GitHub Actions / reusable workflowのpinning・permissionは [16 Cross-Repository GitHub](16-cross-repository-github-infrastructure.md)、AssetのInitial Transfer / First View / Lazy Load等は [05 Performance / Reliability](05-performance-reliability.md) を正本とします。

## 依存ライブラリ

### MUST

- 依存を追加する前に、標準Web APIや既存コードで十分でないか確認する。
- 公開フロントエンドへ秘密情報を埋め込まない。
- 依存更新と大規模機能変更を同時に大量実施しない。
- Package名だけで正規Packageだと決めず、Publisher / Repository /公式Documentation等から取得元を確認する。

### SHOULD

- 依存Versionは可能なら固定または管理可能な範囲へ制約する。
- package managerを使う場合はlock fileを管理し、実際に解決されたVersionを追跡できるようにする。
- 直接依存だけでなく、重大Riskがある場合はtransitive dependencyの影響も確認する。
- 使っていない依存を残さない。
- CDNが落ちた場合の影響を確認する。
- 重要機能が1つの第三者CDNだけに依存しない構成を検討する。
- 重いLibraryを追加する場合、初期表示へ本当に必要かを [05 Performance / Reliability](05-performance-reliability.md) で確認する。
- Security-sensitive / release-critical dependencyでは、Maintenance状態、Release note、重大Issue / Advisory、権限範囲を確認する。

### MAY

小規模な1機能のために巨大Libraryを追加するより、小さな自前実装の方が保守しやすい場合は自前実装を選べます。

ただし暗号、認証、sanitize、OAuth、署名検証等のSecurity-sensitive処理を安易に自作しません。

## Supply-chain Review

Dependency / CDN / Build Tool等は自Projectの権限・Data・Releaseへ影響し得ます。

追加・更新時はRiskに応じて次を確認します。

- 正規Package / Repository / Publisherか
- Release / Versionが意図したものか
- lock file / integrity情報が更新内容と一致するか
- install / postinstall / build script等が不要な権限を要求しないか
- Browser Bundleへ不要なSecret / Server-only codeを含めないか
- Package compromise / abandon時のReplacement cost
- License / redistribution条件

Scanner / Dependabot / audit結果は有用ですが、**Greenだから安全、Alertがあるから即危険**と単純化しません。実際の利用Path、Runtime / dev-only、Reachability、Severity、Fixed version、Breaking impact、Mitigationを確認します。

## 依存更新

依存更新では次を分離して考えます。

1. Security修正
2. Bug fix
3. Feature追加
4. Major upgrade

Major upgradeではBreaking Changesを確認します。

### Security Update

重大Vulnerabilityでは次を確認します。

- Current Projectで影響するCode Pathか
- Runtime dependencyかdev-onlyか
- Fix Version / Mitigationがあるか
- UpdateによるCompatibility / Build / Release impact
- 直ちにUpdateできない場合の一時Mitigation

深刻なApplicable Vulnerabilityを「自動Scannerだから誤検知かも」で放置しません。一方でPackage名だけ一致するAlertをProjectへの実害確認なしにCritical扱いもしません。

### Major / Toolchain Update

Electron / bundler / framework / updater等では必要に応じて:

- Migration guide
- Deprecated API
- Build output
- Browser / OS support
- Installer / release artifact
- Existing config
- Lockfile

を確認します。

更新後は主要FlowとBuild / Pagesを確認し、Electron / Installer等は必要なら [11](11-electron-distribution.md) の実機ValidationへRoutingします。

## Update Automation / Dependabot

Dependabot等は**更新候補を見つける仕組み**であり、安全なAuto Mergeの証明ではありません。

- Security / Major / Toolchain updateを無条件Auto Mergeしない。
- PR noiseが多い場合はSchedule / grouping / open PR上限等を調整する。
- Groupingは同時Reviewして安全な範囲へ限定する。
- stale update PRはmerge前にBase / newer release / advisoryを再確認する。
- 使っていないDependencyはUpdateし続けるより削除を優先する。

Cross-repositoryなDependabot運用は [16](16-cross-repository-github-infrastructure.md) を確認します。

## AI Model / Provider Lifecycle

CONDITIONAL: Hosted AI Model / ProviderがProduct behaviorへ影響する場合、Model名を単なるAPI設定値ではなく、Quality / Cost / Latency / Reliabilityを変えるExternal Dependencyとして扱います。

重要AI Featureでは必要に応じてProvider、Model identifier / snapshot or alias、API version、relevant generation settings、Required Capabilityを追跡できる状態にします。

### Selection / Pinning

- `常に最新Model`をRequirementにせず、[01 Requirements](01-requirements.md) のAI Output Contractを満たすことを優先する。
- Alias / `latest`がProvider側で切り替わり得るか、特定Snapshot / VersionがBehaviorを固定するかを確認する。
- PinningのReproducibilityと、最新Modelへ追従するQuality / Cost / Capability改善をTrade-offとして扱い、`always pin / always latest`のUniversal Ruleを作らない。
- AI Featureが必要とするStructured Output、Tool Calling、Vision、Context size、Language等のCapabilityを必要範囲で説明できるようにする。
- Provider portabilityを全Projectへ要求せず、Vendor risk / availability / migration likelihood / cost sensitivityが高い場合だけAbstractionを強める。
- Provider共通Interfaceを作ってもTool Calling / Vision / Retrieval等のCapability差が消えるとは扱わない。

### Change / Migration

Model / Provider / API versionの変更は、API互換だけで完了とせず [07 Testing / Quality](07-testing-quality.md) のRepresentative AI EvaluationでCurrent ProductionとCandidateを比較します。

Provider変更では必要に応じてTool Calling、Structured Output、Streaming、Rate Limit、Content filtering、Context behavior、Data policy等の差も確認します。

Model migrationとPrompt / Tool / Retrievalの大変更を同時に大量実施せず、可能ならChangeを分離してRegression原因を追跡できるようにします。

DeprecationはMigration Eventとして扱い、Replacement候補 → Required Capability → Representative Eval → Cost / Latency / Reliability → Rolloutの順で確認します。旧Modelへ戻せない場合はRollback可能と誤認せずForward-fix / replacementを準備します。

### Cost / Latency / Fallback

Model選定はToken単価やBenchmark 1指標だけで決めず、必要に応じてQuality、Latency、Total task cost、Retry / Tool call、Reliabilityを合わせます。

- Cheapest Model / strongest Modelを全Taskへ一律適用しない。
- Dynamic routing / multi-provider gatewayをComplexityに見合うProjectだけ採用する。
- Context windowが大きいことを`全部Contextへ入れる`理由にせず、Truncationで重要情報をsilentに失わない。
- Fallback Model / Providerを使う場合もPrimaryと同等だと仮定せず、必要なCapabilityと代表品質を確認する。
- FallbackでVision / Tool / Structured Output等を失う場合はDegraded capabilityをProduct behaviorへ反映する。
- Secondary AI FeatureではProvider停止時にAI unavailableとしてdegradeするだけでも正常で、Fallback ProviderをCompletion prerequisiteにしない。

Rate limit / quota / provider outage / timeout等のRuntime Failure、Retry、Latency、Failure blast radiusは [05 Performance / Reliability](05-performance-reliability.md)、Provider Data Policy / Privacyは [06 Security](06-security.md)、Post-release Evaluationは [09 Version / Maintenance](09-maintenance.md) を正本とします。

Provider lock-inは一律に悪いとは扱わず、Prompt / Tool rewrite、Data export、re-index、Evaluation等のExit Costと、Current development speed / quality / maintenance benefitを比較します。

## CDN

外部CDNを使う場合:

- HTTPS
- Version pinning
- 対応時はSRI
- timeout / failure時の表示
- 本当にCDNが必要か

を検討します。

CDNを利用していること自体を「軽い / 高速」の根拠にはしません。Page Load Costと読み込みTimingは [05 Performance / Reliability](05-performance-reliability.md) で判断します。

CDN ResourceをSecurity-sensitiveな処理へ使う場合は、配布元変更・Version drift・SRI適用可否を [06](06-security.md) のThird-party trust boundaryとして扱います。

## Assets

一般公開するRepository / Pagesでは、画像・動画・フォント・アイコン等を「入手できたから使える」とは扱いません。

### CONDITIONAL: 一般公開時

確認対象:

- 自作Assetか
- 利用規約上Web掲載できるか
- 再配布可能か
- Attributionが必要か
- 商用/非商用条件
- Logo / Game asset等のブランド利用条件

必要な場合は`CREDITS.md`やREADMEへ出典・Licenseを残します。

## 外部画像Hotlink

外部URLを直接Assetとして使う場合は、URL変更・CORS・Rate Limit・削除の影響があります。

重要UIでは恒久的に使える前提にしません。

外部画像もPerformance上は外部Resourceなので、Initial Costから除外しません。詳細は [05 Performance / Reliability](05-performance-reliability.md) を確認します。

## Font

Web Fontを使う場合は、読み込み失敗時のfallbackを用意します。

Font Family / WeightのPage Load Cost、初期表示への必要性は [05 Performance / Reliability](05-performance-reliability.md) で判断します。

## 大容量Asset / Repository管理

この章では、AssetをRepositoryへ保持するか、権利・更新・配布上どう管理するかを確認します。

- Source AssetとWeb配信用Assetを同一視しない
- 大容量動画・大量MediaをGitへ直接入れる前に、RepositoryとしてVersion管理する必要があるか確認する
- Git履歴の肥大化やclone / maintenance Costを考慮する
- 外部Storage / Release Asset / CDN等へ分ける場合は、可用性・権利・更新方法を確認する

実際の配信用画像寸法、WebP / AVIF、`srcset` / `sizes`、Thumbnail、Lazy Load、First View Budget等の詳細は [05 Performance / Reliability](05-performance-reliability.md) を正本とし、この章へ数値Ruleを複製しません。

## External API / SDK / Webhook Contract Lifecycle

CONDITIONAL: External integrations are dependencies with behavioral contracts, not only package versions. Historical promotion evidence: [Phase 19 External Integration Decision System](../maintenance/research/external-integration-decision-system.md).

- Treat the contract as the Product-dependent subset of endpoint / operation, request and response fields, types, nullability, enums, error semantics, auth / scopes, pagination, rate limits, ordering, idempotency, webhook payload, and timing semantics.
- Distinguish **schema compatibility** from **behavioral compatibility**. A default, meaning, ordering guarantee, auth scope, error code, or timing change can be breaking even when JSON still parses.
- API version, SDK version, and Webhook version are separate boundaries unless the provider explicitly couples them. Do not infer one from another.
- Be tolerant of unknown future fields where safe, but do not automatically persist them into Canonical Data. New enum values should not be silently mapped to an unrelated known state.
- New required fields, nullability changes, ID representation, pagination, auth / scope, and error-contract changes deserve compatibility review when existing consumers or saved provider data can be affected.
- Identify actual consumers beyond the browser when relevant: backend / function, Electron, CLI, job, Actions, another Repository, or Webhook processor.
- For staged breaking changes, `Expand → Migrate → Contract` is a preferred candidate when old and new consumers must coexist. Dual read / dual write require explicit authority and partial-failure behavior, and the compatibility layer should be removed after migration rather than becoming permanent patch code.
- Distinguish `Deprecated` from `Removed`. A removal deadline for a critical integration becomes Maintenance work; do not require daily changelog monitoring when no relevant trigger exists.
- Re-check current official provider documentation when updating the SDK / API, responding to a provider notice, investigating behavior drift, or performing maintenance that can cross the contract boundary.
- OpenAPI / JSON Schema / GraphQL schema can be useful contract evidence when available but are not mandatory. Generated client success does not prove semantic compatibility.
- Review mocks / fixtures when API or Webhook versions change so old assumptions do not become a false compatibility oracle.
- Prototype / internal-only integrations do not require permanent backward compatibility merely because versioning exists. Match compatibility depth to real consumers, saved data, release model, and breaking impact.
- If a provider has already removed the old contract, rollback may be impossible; plan a forward-fix path rather than pretending every external migration is reversible.
