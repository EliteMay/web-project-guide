# 07 Testing / Quality

この章は**Testing戦略と検証状態の考え方**を定義する正本です。

実際の完成前チェック項目は [Quality Checklist](../templates/QUALITY_CHECKLIST.md) を正本とし、この章へ同じChecklistを複製しません。Page Load PerformanceのTarget / Review Trigger / Resource Timing / Performance固有の確認深度は [05 Performance / Reliability](05-performance-reliability.md) を正本とします。Data Authority / Storage / Sync / Conflict / RecoveryのBehavioral Contractは [03 Data / Storage](03-data-storage.md) を正本とします。

## 基本方針

「コードが書けた」と「使える」は別です。

自動Testで防げる問題と、実ブラウザ・実機・Visual Review・User Testでしか確認できない問題を分けます。

## 最低限のStatic Validation

GitHub Actions等で可能なら、変更内容に応じて次を自動確認します。

- JavaScript / MJS構文
- JSON構文
- HTML内のローカル参照切れ
- 必須ファイル存在
- ID重複
- Schema必須値
- Manifest件数
- 廃止Runtimeの再混入
- 公開JSONへのData URL / 秘密情報混入

すべてのProjectへ同じValidatorを強制せず、Project Contractに合うものだけを使います。

## Unit Test

Pure Functionにできる処理はブラウザUIから切り離してTestします。

例:

- Timestamp Parser
- 同期補間
- Score計算
- Migration
- Normalize / Validate
- Conflict判定
- Index Builder
- Cache Invalidation条件
- URL解析
- Detector後処理

## E2E / Smoke Test

主要利用フローは実ブラウザで最後まで通せると強いです。

例:

```text
ページを開く
↓
データを選ぶ
↓
編集する
↓
保存する
↓
再読み込み
↓
復元される
```

UIが重要なSiteでは、変更内容に応じてNavigation / overflow / fixed UI / Canvas geometry /主要Button visibility等も確認します。

## Data / Storage Verification

Data / Storage変更ではHappy Pathだけで完成扱いにしません。Projectに該当する範囲で、[03 Data / Storage](03-data-storage.md) のContractをFailure Caseまで検証します。

### Save / Autosave

最低候補:

- 新規保存 → Reload後も保持
- Autosave待ち中のNavigation / Data切替
- Save中の追加編集
- 古い非同期Saveが新しいStateを上書きしない
- Storage write failureをSaved表示しない
- Offline保存を許可する場合、Local保存とRemote Sync状態を混同しない
- Reset後のlate AutosaveでDataが復活しない

Save成功のOracleは、UI表示ではなくCanonical StorageへCommitされた結果を基準にします。

### Offline / Reconnect

Offline Edit / Createを許可するProjectでは、必要に応じて次を通します。

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
Current Remote State確認
↓
Conflict Check
↓
Sync
```

確認候補:

- Pending QueueがReload / App restart後も必要な範囲で保持される
- Retryで同じOperationが二重適用されない
- Remote Revision / Tombstone / Auth / Schema不整合を無視してQueueを送らない
- Background executionが動かなかった場合でも次回起動 / Online復帰時にRecoveryできる

### Cloud Sync / Conflict

Multi-device / Cloud Syncでは必要に応じて次を確認します。

- Device A変更 → Device Bへ反映
- Edit vs Edit
- Edit vs Delete
- Delete vs Offline Edit
- 古いRevisionからSave
- 同Field / 別Fieldの同時変更
- RetryによるDuplicate
- Partial Sync Failure
- Long-term Pending / Quarantineからの再投入

重要Dataでは、Conflict時に片方が黙って消えないことを確認します。

### Corruption / Integrity

意図的に壊したDataでFailure behaviorを確認します。

候補:

- Invalid JSON
- Missing Required Field
- Wrong Type
- Duplicate / Invalid ID
- Missing Blob
- Broken Reference
- Future Schema
- Partial Migration
- Partial Sync
- Corrupt Backup

期待結果は、**Corruption検知 → 正常Data保護 → 必要なら隔離 / Recovery**です。全Resetを最初の動作にしません。

### Migration

重要Schema変更では必要に応じて次を確認します。

- 旧Version → Migration → 新Version → Reload → Validation
- Migration途中Failure
- 再実行Safety
- Future Schema
- 大量Data Migration
- Migration前Backup
- Chunk / Resume方式を採用した場合の中断復帰

### Backup / Restore

Backupが重要なProjectでは、Backup File作成だけでなくRestore Round-tripまで確認します。

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

Riskに応じて次もTest候補にします。

- 不正Backup
- 古いSchema
- Restore途中Failure
- 一部Store Failure
- Cross-version Restore
- Partial Restore

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
- Quota pressure / cleanup

固定性能値をCommon Ruleにせず、Projectごとの実用上のBudgetを決めます。

### Cache / Index

Cache削除後の再取得、Index削除 / 破損後のRebuildを確認し、Derived Data消失だけでCanonical Dataが壊れないことをRegression対象にします。

必要に応じて次も確認します。

- Canonical変更後に古いIndex / Cacheが残らない
- User切替 / Logout / Permission変更で別UserのCacheを再利用しない
- Index Version変更後にRebuildできる
- Cache write failureをCanonical Save failureとして扱わない

### User Generated Content

重要UGCでは必要に応じて次を確認します。

- Rename / MoveでStable IDと参照が保たれる
- Duplicate
- Delete / Trash / Restore
- Missing Blob
- Broken Reference
- Orphan Cleanup
- Export / Import
- Backup / Restore
- Sync Conflict
- App update / Migration後の保持

## Performance Verification

Performance変更やUser-facing Webの初期表示を確認するときは、[05 Performance / Reliability](05-performance-reliability.md#performance確認の強度) の **Minimum / Standard / Extended** からProject Profileと変更Riskに合う深度を選びます。

Testing Strategyとして守ること:

- Small SiteへExtended確認やPerformance CIを機械的に強制しない
- `DATA` / `MEDIA` / `CLOUD`、大規模SPA、重い外部依存等では必要に応じて確認を強める
- Cold LoadとCache済みRepeat Loadを混同しない
- Lighthouse Score、Request数、File数の1指標だけをPass / Fail判定にしない
- Soft BudgetのReview Trigger超過を自動Failへ読み替えない
- 実測した条件と未確認条件をVerification Stateへ正しく反映する

実行時の短い確認項目は [Quality Checklist](../templates/QUALITY_CHECKLIST.md) を使用します。

## Web Deployment / Environment Verification

CONDITIONAL: Managed Hosting / Serverless / Edge / Backend、Environment設定、またはDeployment経路をMeaningfulに変更する場合、PipelineのSuccess表示だけでDeployment完成としません。[10 General Web Deployment / Runtime Environments](10-project-management.md#general-web-deployment--runtime-environments) のContractに対して、実際に使うEnvironmentで必要なEvidenceを確認します。Research evidenceは [General Web Deployment / Runtime Research](../references/web-deployment-runtime-research.md) に保存します。

### Environment Evidenceの役割

- **Local** — code / fixture / development behavior。Production networking / permission / domainの証明ではない。
- **Preview** — candidate revisionの共有、UI / integration / route確認。Temporary resourceやProduction差を明示する。
- **Staging** — Production-like integration、migration、permission、routing等を分離確認する価値がある場合。
- **Production-safe Check** — Real domain / real permission / real network等、他Environmentでは確認できない事実に限ってBlast radiusを抑えて確認する。

Environment数を増やすこと自体をQualityとしません。Productionとの差が大きいStagingを`本番同等`と誤表示しないことを優先します。

### Deployment Smoke / Runtime Checks

変更内容に応じて必要なものを選びます。

- Intended final Commit / BuildからArtifactが生成・Deploymentされている。
- Public URL / base path / API origin / static asset / route direct-openが対象Environmentで正しい。
- Authを使う場合、redirect / callback / cookie / origin等が対象Environmentと整合する。
- Runtime configurationが意図したEnvironmentへ入り、Secretやprivileged credentialがClient bundle / public artifactへ漏れていない。
- Server / Function / Workerが必要ならstartup / readiness / health相当の観測とPrimary Task smokeが成立する。
- External API / Storage / Queue等が必要な場合、Environmentごとのtargetを取り違えていない。
- Failed deploy後にprevious known-good Productionが継続しているのか、Production自体が壊れたのかを区別する。
- Preview / temporary resourceを作る場合、不要Resource / test data / scheduled job等を意図どおりcleanupできる。

### Code / Schema / Configuration Compatibility

Code deployとData / Schema / Config変更が同時に関係する場合、Deploy順序を暗黙にしません。

必要に応じて:

- old code + new schema / new code + old schemaのどちらが一時的に起こり得るか
- rolling / partial deployでold/new revisionが共存するか
- migration前後のread / write compatibility
- configuration切替の前後で必須値が欠けないか
- failure途中からRollback / Recovery / Forward-fixできるか

を確認します。Data migrationは [03 Data / Storage](03-data-storage.md)、Rollback / Recoveryの判断は [09 Version / Maintenance](09-maintenance.md) を正本とします。

### Background / Scheduled Runtime

Cron / Queue / Worker / webhook consumer等を変更する場合は、Web画面のSmokeだけで完了扱いにしません。

- Trigger / scheduleが実際に有効か
- duplicate / missed executionへのbehavior
- retry / idempotency
- old/new worker coexistence
- downstream failure / timeout
- diagnostics / manual recovery

をRiskに応じて確認します。

Production-only Evidenceを現在確認できない場合は`Not Verified`とし、Preview成功をProduction確認済みへ読み替えません。Small Static SiteへStaging、synthetic monitoring、automatic rollback等を機械的に要求しません。

## Accessibility / Responsive / i18n Verification

User-facing UIでは、Static HTML inspectionやDesktop screenshotだけでAccessibility / Responsive / i18n完了としません。[04 UI / UX / Accessibility](04-ui-ux-accessibility.md)のBehavioral Contractに対し、変更Riskと対象Userに合うRepresentative Matrixを選びます。

### Minimum

通常のUser-facing UIで変更内容に関係する範囲を確認します。

- Semantic element / Accessible Name / Label等の基本構造
- Keyboardだけで主要Flowへ到達・実行・離脱できる
- Focus-visibleとFocus orderが理解でき、sticky / overlayで完全に隠れない
- Narrow viewport / Zoom /文字拡大で主要情報・操作が失われない
- Error / Empty / Loading等のStateがColorやPointer hoverだけに依存しない

### Conditional Matrix

該当するProjectでは必要に応じて追加します。

- **Touch / Pointer:** Small target、Drag alternative、Hover-only content、誤Tap risk
- **Dialog / Composite Widget:** Focus entry / trap / escape / restore、Keyboard interaction
- **Responsive:** Portrait / Landscape、低いViewport height、software keyboard、content expansion
- **Forms:** Label、Instructions、Autofill、Validation error association、入力保持、Error recovery
- **i18n / l10n:** 日本語 / 英語等の実Content、長い翻訳、Date / Number / Currency format、Language metadata、必要ならRTL / Script差
- **Motion / Media:** Reduced Motion、Pause / Stop、Caption / Transcript等、Project Scope内のAlternative
- **Assistive Technology:** 対象User / Risk上必要ならScreen Reader、Voice input、Switch等の代表環境

### MUST: 未確認の組み合わせを対応済みと扱わない

全Browser × 全Assistive Technology × 全Localeを機械的にTestする必要はありません。ただし、対象Projectで重要な組み合わせを決め、未確認条件をVerification Stateへ反映します。Automated accessibility scannerだけでTask completion、Focus behavior、Error recovery、実際のReading order等をPass扱いにしません。

Regression価値が高い場合は、axe等の自動check、Keyboard E2E、Screenshot / reflow check、locale fixture等をGuardとして追加できます。Tool固有ScoreをAccessibility完成条件そのものにはしません。

## Content / IA / Search / Discoverability Verification

Content、Search、Navigation、Public DiscoverabilityがPrimary Taskへ影響するProjectでは、実装された件数やMetadataの存在だけで完成扱いにしません。[01 Requirements](01-requirements.md#general-content-quality) と [22 Task-first Structure / Flow Research](22-task-first-structure-flow-research.md) のContractに対し、変更規模とRiskに合う確認を選びます。

### Content Quality

大量Contentで全件Human Reviewを機械的に強制せず、必要に応じて次を組み合わせます。

- Schema / structural validation
- Representative sample review
- High-risk / high-traffic Content重点Review
- Current Evidenceが必要なFactの再確認
- Duplicate / stale / contradictory Contentの確認

件数・文字数・Field充足だけをContent completenessのOracleにせず、Primary User Question / Taskを必要なDepthでカバーしているかを確認します。

### IA / Relationship

MeaningfulなIA変更では、Primary Taskから重要Contentへ到達できること、Category / hierarchy / current locationが理解可能であること、Rename / Move / Archive後に主要導線が壊れていないことを確認します。

機械確認できる場合はBroken internal link、Orphan page、Missing parent、Deleted item reference、Stale related link等をValidator候補にできます。すべての意図的Deep Link / Contextual pageをOrphan Bugとして扱いません。

### Search Matrix

Searchが重要なら必要に応じてRepresentative Queryを選びます。

- Exact match
- Partial / multiple match
- No Result + recovery
- Filter / Scope併用
- Rename後
- Delete後のGhost Result確認
- Typo / synonym / locale差（Scopeにある場合）
- Large data / realistic dataset（規模上必要な場合）

`Result count > 0`だけでPassにせず、Relevant resultが合理的な位置にあるか、無関係Resultが多すぎないか、Search後にTaskを継続できるかを見ます。

Search Index / Sitemap / Structured Data等がCanonical Dataから生成される場合、Canonical変更後にDerived Dataも同期し、必要ならRebuildできることを確認します。

### Empty / No Result / Failure

Emptyが起こる主要Surfaceでは、必要な範囲でFirst-use、No Result、Last item removed、Offline / Failure、Permission等を区別します。API / Network failureを`0件`としてPass表示するRegressionを避けます。

### Public Discoverability

External Search / Sharingが重要なPublic Siteでは必要に応じて次を確認します。

- 重要URLをDirect openできる
- Page title / description / social metadataが実Contentと一致する
- 意図しないindex blockがない
- robots / noindexの役割が意図どおり
- SitemapがCurrent Route / Contentと整合する
- CanonicalがCurrent URL strategyと矛盾しない
- Structured DataがVisible Contentと一致する

検索順位やRich Result表示そのものはCommon Pass / Fail条件にしません。

### Static TestとHuman Reviewを分ける

Broken link、Missing metadata、Duplicate ID、Invalid sitemap、Stale index reference等は自動化しやすい一方、Content clarity、IA理解、Search relevance、Empty-state usefulness、Misleading metadata等はHuman / Browser Reviewが必要になりやすいです。

片方だけで全項目を確認済みにしません。Search Analytics / Traffic Dataは改善Evidenceとして利用できますが、Analytics導入自体をCompletion prerequisiteにしません。

Validation depthは小規模Static Site、Content / Search中心Site、大量Content / Public-content Product等でRisk-basedに変えます。新しいStable Gateを増やさず、この章の通常Testing Strategyとして扱います。

## Learning Product Verification

CONDITIONAL: `LEARNING` Profileで理解・適用・保持がProduct価値に含まれる場合、教材の存在やLesson completionだけで品質を判定しません。[01 Learning / Explanation Content](01-requirements.md#learning--explanation-content) のObjective → Activity → Evidence → Feedback ContractをRiskに応じて確認します。

### Objective / Assessment Alignment

主要なLearning Objectiveについて、少なくとも次の対応を確認します。

```text
Learning Objective
↓
Learnerが行うActivity
↓
Assessment / Observable Evidence
↓
Feedback / Next Step
```

- `説明できる`Objectiveを選択肢のRecognitionだけで証明しない。
- `適用できる / 解ける`ObjectiveをLesson閲覧や用語暗記だけでPassにしない。
- `比較できる / 判断できる`Objectiveでは、似た選択肢・条件差・misconceptionをRepresentativeに含める。
- Exact同一問題の反復だけでMasteryを断定せず、必要なら表現・数値・Contextの異なるVariantを見る。
- Fixed score thresholdをCommon Ruleにせず、Objective / Risk /試験・実務用途に合うPass evidenceをProject側で定義する。

### Representative Learner Cases

変更内容に応じて必要なものを選びます。

- Target Starting KnowledgeのLearnerが前提不足で詰まらず開始できる。
- Prerequisiteを飛ばした場合に必要なConceptへ戻れる。
- Normal lesson pathでObjectiveに必要なExplanation / Example / Practiceへ到達できる。
- 混同しやすいConcept / common misconceptionを正しく区別できる。
- Guided example後にindependent apply / solveできる（Objective上必要な場合）。
- Beginner pathとQuick Referenceを両方持つ場合、それぞれが不要な遠回りを強制しない。
- Long-term retentionがRequirementなら、時間を空けたRetrieval / Review evidenceを必要範囲で確認する。

全ProjectへDelayed Testや正式User Studyを要求しません。単発Reference / How-toではTask completion / clarityの確認で十分な場合があります。

### Feedback Verification

Feedbackを持つ場合は正誤表示だけでなく、必要に応じて:

- 正解Reason /誤答ReasonがContentと矛盾しない
- Learnerの誤りに対応するExplanation / Exampleへ戻れる
- Retry / Review / Next LessonのActionが実行できる
- Hint / answer reveal後の再回答をfresh evidenceと同一視しない

ことを確認します。

### Diagnostic / Placement

Diagnostic / Placementを実装するProjectでは、Scoreが出ることではなく**適切なStarting Pathへ分けられるか**を確認します。

- 境界付近のLearner
- prerequisiteの一部だけ欠けるLearner
- false high / false low placementのRecovery
- Learnerが手動で戻る /進む必要がある場合のescape path

Placement mechanismが不要な小規模Siteへ追加しません。

### Freshness / Applicability

時間で正解が変わる教材では、Representative lessonについてCurrent Evidenceと`applies to version / exam range / date`等の表示・Dataが一致し、Superseded / Archived contentがCurrent pathへ誤って混入しないことを確認します。

Static Validatorはmissing prerequisite、broken lesson link、duplicate ID、stale version marker等をGuardできますが、説明の理解しやすさ、Assessment validity、misconception coverage、Feedback usefulnessはHuman Reviewが必要になりやすいです。両方を同じ`Validated`へまとめません。

## Measurement / Analytics / Experimentation Verification

MeasurementやExperimentationがProject Scopeにある場合は、Analytics SDKやDashboardの存在ではなく、**そのDataを信頼してProduct Decisionへ使えるか**を検証します。[01 Requirements](01-requirements.md) のOutcome / Instrumentation Contract、[20 Evidence-first Research](20-evidence-first-research.md) のFeedback / Experimentation Contract、[09 Version / Maintenance](09-maintenance.md) のPost-release Evaluationに対しRisk-basedに確認します。

### Instrumentation Correctness

重要Eventでは必要に応じて次を確認します。

- Event名と実際のTriggerが一致する。
- Attempt / Success / Failure / Cancelを混同しない。
- Double action、Retry、Reload、re-render、offline resend等で重要Outcomeが不自然に二重計上されない。
- Slow network、offline / reconnect、navigation等で必要Eventが欠落する条件を把握する。
- Analytics provider / endpoint失敗でもPrimary Taskが成立する。
- 主要PropertyのType / allowed value / versionがContractと一致する。
- Password、Token、Cookie、Authorization Header、不要なUser入力本文等がPayloadへ混入していない。
- Event semantics変更時に旧Dataと無言で意味を混在させない。

Privacy / Trackingの詳細Ruleは [06 Security](06-security.md) を正本とします。

### Metric / Aggregation

Raw Eventが正しくてもAggregationが壊れる可能性があります。重要Metricでは必要に応じてNumerator、Denominator、Eligibility、Exclusion、Period等を代表Sampleで確認します。

Missing telemetryをObserved zeroへ自動変換せず、Provider outageやMeasurement gapがある場合はConfidenceへ反映します。Dashboard表示だけをOracleにせず、代表的なProduct state / raw event / aggregate resultを照合できます。

### Experiment Integrity

A/B Test等では必要に応じて次を確認します。

- Assignment / eligibilityが意図どおり。
- 必要な範囲で同じ主体が同Variantに留まる。
- Control / VariantでOutcome instrumentationが同等。
- 想定比率から大きく外れるSample ratio mismatchがないか確認し、結果解釈前にAssignment / tracking failureを疑う。
- Primary Outcomeだけでなく重要Guardrailも実際に観測できる。
- Experiment外Userやstale variantが集計へ混入していない。

高度なStatistical AlertやExperiment Platformを全Projectへ要求しません。

### Feedback / Post-release

Feedback機能を実装する場合はSubmit / failure / duplicate / context / privacyを必要範囲で確認します。直接会話やGitHub Issue等で十分なら専用Infrastructureは不要です。

重要RolloutではRelease / BuildとEvaluation Dataの対応を追跡でき、事前に決めたEarly Failure Signalが実際に観測可能であることを確認します。

Experiment / rollout終了後はobsolete variant、temporary event、debug metric、dead dashboard query、不要Feature Flag等のCleanupをCompletionへ含めます。

### AutomatedとHuman Reviewを分ける

Schema、required property、duplicate trigger、assignment logic、aggregation function、sensitive property pattern等は自動化しやすい一方、Event timingとUser Outcomeの意味一致、Feedback usefulness、Causal interpretation、Post-release Decision等はHuman Reviewが必要になりやすいです。

片方だけでMeasurement全体を確認済みにしません。小規模Personal ProjectではAnalytics自体を持たずManual observation / Direct feedbackだけでも正常です。

## AI Feature / Evaluation Verification

AI / LLM / RAG / Tool Calling / AgentがProject Scopeにある場合は、数回触って`それっぽい回答が出た`ことではなく、[01 Requirements](01-requirements.md) のAI Output Contractに対してRepresentative Evaluationを行います。

### Representative Task Set

重要AI Featureでは必要に応じて次を組み合わせます。

- Normal / common task
- Boundary / ambiguous input
- Missing information / insufficient evidence
- Long / noisy / malformed input
- Realistic User wording / relevant language or segment
- Previously failed regression case
- Adversarial / tool / retrieval / permission failure（Risk上必要な場合）

固定件数をCommon Ruleにせず、小規模Projectでは少数のStable CaseでもRegression価値があれば利用します。Productionで見つかった重大Failureは同型CaseをRegression Setへ追加できます。

Evaluation DimensionはAI Roleに合わせます。ExtractionではField correctness / fabrication / schema、Summarizationでは重要情報保持 / unsupported addition、Classificationではcategory / ambiguity / unknown handling、GenerationではRequirement coverage / factuality / clarity、AgentではTask completion / Tool / target / action correctness等を選びます。

### Evaluation Method / Oracle

Binaryに判定できるParse、Schema、ID、URL allowlist、Citation ID存在、Tool input等はDeterministic Checkを優先します。Open-ended QualityはReference requirement、Human rubric、Model judge等をTaskに合わせて使います。

- Exact Matchが意味的に不適切な生成Taskへ文字列一致を強制しない。
- Reference Answerを唯一の文章正解とせず、Required points / forbidden claims / constraints等で表せる場合はそうする。
- Rubricは`良いか 1〜5`だけでなく、重要DimensionのPass / Failure条件を説明できる方を優先する。
- LLM-as-a-Judgeを絶対Oracleにせず、重大CaseではHuman / Deterministic Reviewを併用する。
- Judge / rubric / eval version変更でScore比較条件が変わる場合はその境界を追跡できるようにする。
- AI OutputのVarianceがProduct Riskへ影響する場合は必要に応じて複数RunでStabilityを見る。UniversalなRun回数は設けない。

Average ScoreだけでCritical Failureを隠しません。Unauthorized action、Data loss、Privacy leak、fabricated critical fact、wrong high-impact target等は別途Reviewし、他Caseの高得点で相殺しません。

### Baseline / Regression

Model、Provider、System Prompt、Tool description / schema、Generation setting、Retrieval / chunk / reranking等、AI behaviorを変え得る変更ではRiskに応じてCurrent ProductionとCandidateをRepresentative Setで比較します。

評価Contextとして必要に応じてModel / Provider、Prompt version、Tool definitions、Retrieval strategy、relevant settings、App versionを追跡します。

Eval Setへ過適合しないよう、Stable Regression Setだけでなく新しいRepresentative CaseやReal User Feedbackも利用できます。重要AI Featureでは可能ならPrompt / example調整に使ったDevelopment CaseとEvaluation Caseを一部分けます。

QualityだけでなくTask上重要ならLatency、Cost、Reliability / varianceもTrade-offとして確認します。Eval Scoreが少し上がっただけでCritical regressionやProduct Costを無視して自動Releaseしません。

### Grounded / RAG Verification

[20 Evidence-first Research](20-evidence-first-research.md) のGrounding Contractを採用する場合は、AnswerだけでなくRetrievalとGenerationを分けます。

Representative Case候補:

- Exact known source / semantic query
- No relevant source
- Conflicting / old vs current source
- Deleted / renamed sourceのGhost Retrieval
- Permission-restricted source
- Multiple plausible sources

Correct Sourceを取得できたか、Selected ContextがRelevantか、重要ClaimがSourceにGroundedか、Citationが実際にClaimをsupportするかを必要範囲で確認します。たまたまModelの一般知識で正答したことをSource-bound Retrieval成功とは扱いません。

### Agent / Tool-use Verification

Tool-using Agentでは回答文章だけでなくExternal StateをOracleにします。必要に応じて次を確認します。

- Correct / necessary Tool、target、order
- Read-only Taskで不要なWrite / Admin Operationを使わない
- High-impact ActionのPreview / approvalとReject時の非実行
- Permission denied / ambiguous target時に勝手に別対象へ進まない
- Partial success / Unknown result / retry / duplicate prevention
- User Stop / Cancel後に次のActionが止まり、既完了Actionを誤ってUndo済み表示しない
- Tool / Provider failure時のRecovery / escalation
- External untrusted contentからのPrompt InjectionでPermission boundaryを越えない

Tool callのHTTP successやAgent自身の`完了しました`ではなく、期待するExternal State / Task OutcomeをCompletion Oracleにします。

### Provider Failure / Fallback

AI Providerのtimeout、429 / quota、5xx、refusal等を必要範囲でsimulateし、AI FailureがCore Productへ不必要に拡大しないことを確認します。

Fallback Model / Providerを実装している場合はCapability / Structured Output / Tool Calling / Quality差をRepresentativeに確認します。Fallback未実装でAI unavailableへ明示的にdegradeする設計も正常です。

### AI Feature Completion

AI Featureの完成は`API接続済み`やBenchmark 1指標ではなく、Riskに応じて次が成立することを基準にします。

```text
AI Feature Contract
+
Representative Evaluation
+
Critical Failure Review
+
Unknown / Failure handling
+
Grounding integrity if applicable
+
Agent control if applicable
+
Provider failure handling
+
Model / Prompt change regression
+
Known limitations / Unverified state
```

Low-riskなTitle候補 / Rewrite等へHigh-impact Agent並みのTestを強制せず、Learning explanation / extraction / RAGではGroundingやUnknown handlingを強め、Send / Delete / Publish / Permission変更等ではSecurity / approval / cancellation / partial failureまで確認します。新しいProfile / Stable Gateは作らずRisk-based Verificationとして扱います。

## Specification / Oracle Test

AI生成量が多いProject、既存実装の移植、互換性が重要な処理では、可能なら「正しい出力」を比較できるOracleを作ります。

例:

- Golden Output
- Reference implementationとの同一入力比較
- Regression Dataset
- Schema / Contract Test
- Snapshot / Geometry基準
- 保存→再読込→復元E2E

AIがCodeを書いたか人間が書いたかではなく、**期待結果を再現可能に判定できるか**を重視します。

### Oracleを第二のSource of Truthにしない

Test / Validatorは仕様を守るGuardですが、変更されるProject metadataやData全体を固定値で複製して、新しい正本にしません。

仕様・Dataから導出できる値は、可能ならその正本から取得して検証します。固定値を使う場合は、**その値自体が守るべきContractである理由**を区別します。

例:

```text
弱い: 現在のGuide patch version / build番号 /教材総件数を各Phase Validatorへ毎回複製
強い: metadataの形式・互換範囲を検証し、教材集合は現行Index / Manifestから導出

必要な固定値: 公開Quick Key 1〜5、Schema Version、Migration前後のGolden Output等
```

Requirements / Spec / Metadata / Data Contractを変更するときは、実装だけでなく関連するStatic Validator / E2E / Visual Oracleが**旧仕様を正解として固定していないか**も確認します。

Oracleを緩めることが目的ではありません。変わる値の重複hardcodeを減らし、守るべきInvariant / Compatibility Contractはむしろ明示的に固定します。

Oracle自体が誤っている可能性もあるため、Reference更新時は理由と影響を残します。

## Visual Design Review

Visual Qualityが重要なProjectでは、機能Testと別に [Visual Design Review Gate](04-ui-ux-accessibility.md#visual-design-review-gate) を実施します。

自動Testだけでは次を十分に判定できません。

- Project固有の情報構造になっているか
- Primary ActionとHierarchyが自然か
- AI Template Lookへ戻っていないか
- Typography / Spacing / DensityがContentへ合うか
- Card / List / Table等のComponent選択が適切か
- Responsive時にPriorityを再構成できているか

Findingは必要に応じて `Blocking / Major / Minor` で整理します。

Blockingが残る場合はVisual完成扱いにしません。

Visualの最低品質は [Visual Quality Baseline](17-visual-quality-baseline.md)、大規模Redesign前のResearchは [Domain-first Visual Research](18-domain-first-visual-research.md) を確認します。

## 対応ブラウザ

最低でも主要用途に合わせてFirefox / Chromiumを意識します。

新しいWeb API / CSSはMDN Baseline等で対応状況を確認し、ブラウザ名判定よりFeature Detectionを優先します。

## 実機確認

CIで代替できないものがあります。

例:

- ペンタブ筆圧
- Windows固有機能
- 実MP3 / MP4 Codec
- iPhone / Android Media挙動
- 実際の外部API通信
- Setup.exe
- 大量データ長期利用

未確認なら作業報告へ残します。

Static Validation成功をReal Device Validationへ読み替えません。

## Regression Test

一度修正した重大Bugは、可能ならTest / Validator / Guardを追加して再発を防ぎます。

特に優先:

- データ消失
- 保存互換性
- 主要ボタン無反応
- 参照切れ
- 横overflow
- 旧Runtime再混入
- 誤った件数hardcode

Test化しにくいVisual / 実機Bugでは、再現手順・Screenshot比較・確認Checklist等をRegression Guardにできます。

## Final-state Validation

テスト結果は、**ユーザーへ渡す最終Commit / Merge Commit**に対して成立している必要があります。

途中CommitでCIが成功していても、その後に次を変更した場合は最終状態で再確認します。

- 一時Workflow / Scriptの削除
- Cache Revision
- Version / Build
- Asset Path
- 設定 / Deployment
- Cleanup Commit

推奨順序:

```text
最終Commit SHAを確認
→ そのCommitのCI / Testを確認
→ Pages対応時は同じCommitのDeployを確認
→ 一時資産が残っていないことを確認
```

## Verification State

確認状態は可能なら次のように分けます。

- **Implemented** — 実装済み
- **Static Validated** — 構文・参照・Schema等を自動確認済み
- **Browser Validated** — 実ブラウザで主要導線確認済み
- **Visual Reviewed** — Design Review Gateを実施済み
- **Real Device Validated** — 実機 / OS固有機能確認済み
- **User Validated** — 実際の利用者が確認済み
- **Unverified** — 未確認
- **Known Issue** — 既知問題あり

Verification Stateを必要以上に高く表現しません。

## 完成前の実行項目

この章ではChecklist本文を持ちません。

完成前は [Quality Checklist](../templates/QUALITY_CHECKLIST.md) をProject Profile / 変更内容に合わせて使用します。

Checklist側にはHTML / CSS / JS、Visual、Data / Storage、GitHub Pages、Accessibility、Performance、AI-assisted、Electron等の実行項目を集約します。

## 完成条件

「完成」の共通判断は、次を満たすことを基本とします。

- 要求された主要機能が実装済み
- 通常利用に重大な問題がない
- 重大な既知Bugがない
- 必要な文書が現在仕様と一致
- 保存データを意図せず壊さない
- Cleanup後の最終状態で必要なValidationを実施
- User-facing UIはVisual Quality Baselineを満たす
- 未確認事項が明示されている

個別の確認項目は [Quality Checklist](../templates/QUALITY_CHECKLIST.md) を正本とします。

## External Integration Validation

CONDITIONAL: External integrations are complete only when the Product behavior is verified at the level required by integration risk. `HTTP 200`, SDK success, or provider-dashboard delivery alone is not the success oracle. Historical promotion evidence: [Phase 19 External Integration Decision System](../maintenance/research/external-integration-decision-system.md).

### Test environment roles

Distinguish the evidence each environment can provide:

- **Fixture / Stub / Mock** — deterministic Product logic and rare failure reproduction; primarily proves our assumptions and code behavior.
- **Contract Test** — verifies the request / response / error subset the Product depends on.
- **Sandbox / Test Provider** — verifies provider-realistic auth, schema, timing, routing, and behavior within sandbox limitations.
- **Production-safe Check** — optional evidence for real permission / routing / networking that cannot be established elsewhere; keep blast radius bounded with read-only or dedicated test entities when possible.

Mock success is not proof of provider behavior. Sandbox success is not automatically Production validation.

### Representative integration checks

Select only cases material to the integration:

- Primary User Task end-to-end, using expected Product / external state as the oracle.
- Read mapping for required fields, `missing / null / unknown enum`, pagination, not-found vs failure, and allowed staleness.
- Important writes with read-back or equivalent external-state confirmation when transport success is insufficient.
- Retry without duplicate mutation.
- Webhook valid delivery, duplicate, out-of-order event, invalid signature, unknown / malformed payload, ACK vs processing-complete, handler / downstream failure.
- Reconciliation such as missed event → drift detected → repair → convergence, while preserving Local-only fields.
- Permission loss, token expiry, external deletion, provider outage, cursor expiry, partial reconciliation, or polling stop conditions when in scope.
- API / SDK / Webhook / Auth / Error semantic changes, including real old/new combinations during migration when compatibility matters.
- Schema compatibility **and semantic compatibility**; generated clients and mocks do not prove the latter.

### Test-data / completion safety

- Separate test and production credentials / resources. Do not run destructive experiments against real User data merely because the endpoint is reachable.
- Minimize fixtures and sanitize real examples. Do not commit production secrets or private raw payloads to the Repository.
- Test resources should have bounded Create → Verify → Cleanup behavior; cleanup failure is a test result, not something to hide with wildcard deletion.
- External-provider tests may be separated from fast deterministic CI. They do not need to run on every commit when cost / flakiness / provider limits make that unreasonable.
- A provider outage or unavailable test environment yields `Not Verified`, not an invented Pass.
- Record whether evidence came from Mock, Sandbox, Production-safe check, or another environment when that distinction affects confidence.
