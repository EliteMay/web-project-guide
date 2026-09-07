# Quality Checklist

このChecklistはRule本文の正本ではありません。**Preflightで今回必要なOwner Docを決めた後、Core + 該当するConditional Sectionだけ**使います。

詳細条件・例外・判断基準は各Owner Docを正本とします。未確認項目はチェックせず、作業報告へ残します。

## Core — 原則すべての制作・修正

- [ ] Current Repository / Requirements / Spec等のSource of Truthを必要範囲で確認した
- [ ] 変更対象と影響範囲を確認した
- [ ] 同じ機能の旧Runtime / Patch / Version別実装を本番へ重複させていない
- [ ] Syntax / 起動時Error / 必須Asset・Link参照切れがない
- [ ] 変更した主要Flow / Button / Linkが実際に動く
- [ ] Existing Data / Save / URL /公開Contractを意図せず壊していない
- [ ] Secret / Token / Password /不要な個人情報を公開ArtifactやLogへ入れていない
- [ ] High-risk変更ではRollback / Recovery / Forward-fixのどれが使えるか必要範囲で確認した
- [ ] Temporary Script / Debug UI / Placeholder /不要Artifactを完成状態へ残していない
- [ ] 重大Bugに必要なRegression Guardを追加した
- [ ] README / Spec / Work Report等、変更で陳腐化したDocumentationを更新した
- [ ] 高コストBug / 再発しやすい知見を必要に応じて`PROJECT_LEARNINGS.md`へ残した
- [ ] Cleanup後の最終Commit / Merge Commitに対するCI・Validation結果を確認した
- [ ] 確認できなかった項目を「未確認」として明示した

## Conditional Routing

| 条件 | 追加確認 | Owner |
|---|---|---|
| User-facing UI | UI / Visual / Accessibility | [04](../docs/04-ui-ux-accessibility.md) / [17](../docs/17-visual-quality-baseline.md) |
| Meaningful Visual Change | Visual Research / Direction | [18](../docs/18-domain-first-visual-research.md) |
| Data / Save / Import / Migration | Data safety | [03](../docs/03-data-storage.md) |
| Page Load / 重いRuntime | Performance / Reliability | [05](../docs/05-performance-reliability.md) |
| Runtime Diagnostics / Remote Handoff | Observability | [15](../docs/15-development-observability.md) |
| Content / IA / Search / Discoverability | Content quality / Findability / Public discovery | [01](../docs/01-requirements.md) / [22](../docs/22-task-first-structure-flow-research.md) / [07](../docs/07-testing-quality.md) |
| Measurement / Analytics / Experimentation | Outcome / Evidence / Rollout validation | [01](../docs/01-requirements.md) / [20](../docs/20-evidence-first-research.md) / [09](../docs/09-maintenance.md) / [07](../docs/07-testing-quality.md) |
| AI Feature / RAG / Agent / Model change | Output / Eval / Grounding / Agent / Model lifecycle | [01](../docs/01-requirements.md) / [07](../docs/07-testing-quality.md) / [20](../docs/20-evidence-first-research.md) / [13](../docs/13-dependencies-assets.md) / [06](../docs/06-security.md) |
| General Web Deployment / Managed Hosting / Serverless / Backend | Runtime / Environment / Release / Validation | [10](../docs/10-project-management.md) / [09](../docs/09-maintenance.md) / [07](../docs/07-testing-quality.md) |
| GitHub Pages / 公開Site | Pages / Public URL / Repository discoverability | [08](../docs/08-github-pages.md) / [10](../docs/10-project-management.md) |
| Browser / Web Platform compatibility | Support Target / Feature fallback / Browser verification / Compatibility dependency | [01](../docs/01-requirements.md) / [07](../docs/07-testing-quality.md) / [13](../docs/13-dependencies-assets.md) |
| Public / Auth / OAuth / API / Cloud / AI | Security / Privacy / Dependency | [06](../docs/06-security.md) / [13](../docs/13-dependencies-assets.md) |
| External API / SDK / Webhook | Contract / Reliability / Security / Validation / Lifecycle | [02](../docs/02-architecture.md) / [05](../docs/05-performance-reliability.md) / [06](../docs/06-security.md) / [07](../docs/07-testing-quality.md) / [13](../docs/13-dependencies-assets.md) |
| Release / Rollback / Legacy | Version / Maintenance | [09](../docs/09-maintenance.md) |
| `LEARNING` | Learning Outcome / Flow / Verification | [01](../docs/01-requirements.md) / [12](../docs/12-project-profiles.md) / [22](../docs/22-task-first-structure-flow-research.md) / [07](../docs/07-testing-quality.md) |
| `GAME` | Game / Playtest | [19](../docs/19-game-development.md) |
| `ELECTRON` | Distribution / Update | [11](../docs/11-electron-distribution.md) |

## User-facing UI

- [ ] Loading / Empty / Error / Success等、実際に必要なStateを確認した
- [ ] Primary Action / Main Content / Secondary InformationのHierarchyが分かる
- [ ] Typography / Spacing / Componentの役割が一貫している
- [ ] Text clipping / unintended overflow / broken alignmentがない
- [ ] 小画面・低い縦解像度・Zoomで主要操作が隠れない
- [ ] Keyboard / focus-visible / Contrast /色だけに依存しない状態表現を確認した
- [ ] UIを変更した場合、最終状態をBrowser / Screenshot等で確認した、またはVisual未確認と記録した

- [ ] Keyboardだけで主要Taskへ到達・実行・離脱でき、Focus trap /不自然なFocus order / Focus restore漏れがない
- [ ] Hover / Drag / Touch gesture / Shortcutだけに主要操作や重要情報を依存させていない
- [ ] Zoom /文字拡大 /狭い幅 /低いViewport height / Orientation変更でPrimary Taskを失わない
- [ ] 長いText・実際の日本語/英語等でContent expansionを確認し、固定Height / clippingで重要情報を失わない
- [ ] 複数Locale対応時、Language metadataとDate / Number / Currency等のLocale-sensitive表示を必要範囲で確認した
- [ ] FormでLabel / Instruction / Autofill / Error association /入力保持 / Recovery導線を必要範囲で確認した
- [ ] Motion / Mediaがある場合、Reduced Motion、Pause / Stop、必要なCaption / Transcript等をScopeに応じて確認した

## Meaningful Visual Change

- [ ] CSSを本格変更する前にCurrent UI / User Feedback / Target Typeを確認した
- [ ] 必要なDomain Researchを行い、Representative Referenceの構造を比較した
- [ ] Existing UIを`KEEP / FIX / REMOVE`へ分け、良い部分を無条件に消していない
- [ ] 不確実性が高い場合、色違いではなく構造的に異なるDirectionを比較した
- [ ] Current vs CandidateでMain Task / Hierarchy / Navigation / Densityの改善を確認した
- [ ] High / Flagshipでは独立Visual Reviewを行い、Blocking Findingを残したまま完成扱いしていない

## Data / Storage / Import / Migration

- [ ] Canonical / Derived / Search Index / Cache / History / Backupの役割を必要範囲で分離した
- [ ] Local / Cloudを併用する場合、Data Authority / Source of Truthが明確
- [ ] Data Source of Truth / Schema / ID / Storage Keyが明確
- [ ] Local-first / Cloud-first / Local-onlyをData特性から選び、Storage技術を先に固定していない
- [ ] Offline Edit / Createを許可する場合、許可操作・Local保存・Pending Queue・Reconnect後のConflict Checkを確認した
- [ ] Local Saved / Sync Pending / Synced / Save Failed / Sync Failed / Conflictを必要範囲で区別した
- [ ] Sync対象から再生成可能なCache / Index / Derived Dataを無条件に含めていない
- [ ] Conflict ResolutionをData riskに合わせ、重要Dataへ無条件LWWを適用していない
- [ ] 古いRevision / late Autosaveが新しいStateを上書きしない
- [ ] Edit vs Deleteで必要ならTombstone /同等の削除Contractを確認した
- [ ] Existing Save / Schema変更ではMigration要否を確認した
- [ ] 破壊的Import / Reset / Restore前にValidationとRecovery手段を確認した
- [ ] Import / Migration / Restore失敗時に既存Dataを半端な状態へしない
- [ ] Corrupt / Future Schemaを即削除・上書きせずRecovery / Quarantine手段を確認した
- [ ] Cache削除後の再取得、Index破損後のRebuildが必要な範囲で成立する
- [ ] 重要UGCのStable ID / Blob参照 / Cleanup / Export / Backup / Conflict Recoveryを必要範囲で確認した
- [ ] Save → Reload / Backup → Restore → Reload → Integrity Validation等、変更に必要なRound-tripを確認した
- [ ] BackupをCloud Sync / Autosave / Undoの代用として扱っていない
- [ ] Backup / History / SnapshotのRetentionが無制限Defaultになっていない
- [ ] 大容量Mediaや構造化DataをStorage特性に合わない場所へ無条件保存していない
- [ ] Quota pressure時にCanonical User Dataより先にCache / Derived / Rebuildable IndexをCleanup候補としている

## Performance / Reliability

- [ ] Primary Taskが「表示済み」だけでなく実際に操作可能になるまで確認した
- [ ] Cold Loadで不要なJS / JSON / Media / External ResourceをEager Loadしていない
- [ ] Critical / Deferred / On Demandの分離がPrimary UXと合っている
- [ ] Loading / Error / Partial Failure / Offline等、該当するStateでsilent failureや不必要な全画面Failureにならない
- [ ] Auto Retryする操作はidempotency / duplicate prevention / retry上限を必要範囲で確認した
- [ ] Timeout / Cancel / late responseがCurrent Stateを壊さない
- [ ] 大量Data / Entity /長時間同期処理でUIを不必要に固めていない
- [ ] Long-running / repeated lifecycleがある場合、Memory / Listener / Timer / DOM等が増え続けないか必要範囲で確認した
- [ ] Soft Budget /代表的な重い状態を必要範囲で測定・Reviewした
- [ ] Third-party API / CDN / Provider失敗時の影響とFallbackを確認した
- [ ] 追加最適化のBenefitがComplexity / Regression Riskより小さい場合、過剰最適化を止めた

## General Web Deployment / Environment — 該当時

- [ ] Static / Managed App / Serverless / Edge / Backend等をProvider名ではなく必要Runtime capabilityから選んだ
- [ ] Local / Preview / Staging / Productionを必要なEvidence / Risk isolationに応じて使い分け、不要なEnvironmentを増やしていない
- [ ] Environment-specific configのAuthorityが明確で、同じ論理値をbranch判定や複数Fileへ独立Hardcodeしていない
- [ ] Secret / privileged credentialをClient bundle / public artifactへ入れていない
- [ ] Public URL / API origin / OAuth redirect / CORS / webhook callback等が対象Environmentと整合している
- [ ] Intended final Commit / Buildと実Deploymentのrevision対応を確認した
- [ ] Server / Function / Worker等がある場合、startup / health / readiness相当とPrimary Task smokeを必要範囲で確認した
- [ ] Code + Schema / Config変更ではold/new revision共存やdeploy順序を考慮し、必要なCompatibility / Migration evidenceを確認した
- [ ] Background / scheduled runtimeがある場合、trigger / duplicate / missed / retry / old-new coexistenceを必要範囲で確認した
- [ ] Preview / temporary resourceのCleanupを確認した
- [ ] Deploy failureとBroken Productionを区別し、必要なRollback / Recovery / Forward-fixを確認した
- [ ] Preview / Staging成功を未確認のProduction behaviorへ読み替えていない

## Security / Privacy / AI — 該当時

- [ ] AuthNとAuthZを分け、UI表示やClient-provided role / user IDだけで権限を決めていない
- [ ] OAuth / OIDC採用時、Current Provider guidanceに従いPKCE / redirect / state / nonce / scope等を必要範囲で確認した
- [ ] BrowserからCloudへ直接Accessする場合、RLS / Grant / operation permissionを必要範囲で確認した
- [ ] `service_role` / secret / bypass credentialをFrontendへ置いていない
- [ ] Upload / Import / User Contentでtype / size / path / archive / stored XSS等のRiskを必要範囲で確認した
- [ ] Public endpoint / paid API / AI proxyでrate / size / count / cost abuseの上限を確認した
- [ ] Analytics / replay / diagnosticsで不要なPersonal Data・Token・form本文等を収集 /送信していない
- [ ] Privacy上必要なData flow / retention / provider behaviorをCurrent条件で確認した
- [ ] AI / RAGへ渡す外部ContentをUntrusted Dataとして扱い、ModelをAuthorization boundaryにしていない
- [ ] AI Toolへ最小権限を与え、高Impact actionは必要なdeterministic validation / confirmationを通す
- [ ] Security Scanner / audit結果だけでSecurity完了扱いしていない

## AI Feature Quality / RAG / Agent — 該当時

- [ ] AIのRole / Expected Output / Unknown・Failure Boundaryを定義し、`Model応答あり`だけをSuccessにしていない
- [ ] Normal / Boundary / Ambiguous / Missing information /過去Failure等のRepresentative CaseをRiskに応じて評価した
- [ ] Average ScoreだけでCritical Failureを隠さず、deterministicに判定できるSchema / ID / URL / Tool Input等をCode側でも確認した
- [ ] Model / Provider / Prompt / Tool / Retrieval変更後に必要なRegression Evaluationを実施した
- [ ] Grounded / RAGではNo Source / stale・deleted source / Citation alignment / Permission boundaryを必要範囲で確認した
- [ ] AgentではCorrect Tool / Target / External Result / Partial・Unknown stateを確認し、Agent自身の`完了`発言をOracleにしていない
- [ ] High-impact Agent ActionでApprove / Reject / Cancel / Retryを必要範囲で通した
- [ ] Provider timeout / rate・quota / refusal等でCore Productを不必要に壊さず、Fallbackがある場合はFallback品質も確認した
- [ ] Model / ProviderのRequired Capability、Cost / Latency / lifecycle / deprecationを変更Riskに応じて確認した
- [ ] Known limitation /未評価Conditionを対応済みとして扱っていない

## Diagnostics / AI Handoff

- [ ] Error / Rejection /重要なFetch・Storage Failureを必要範囲で捕捉できる
- [ ] Breadcrumb / Log / Snapshotが無制限に増えない
- [ ] Diagnostic DataからSecret / Token / User入力全文等を除外した
- [ ] Export / Remote Handoffを使う場合、Sanitize済みCompact Evidenceだけを渡す
- [ ] Remote Provider停止時もLocal Diagnostics / Core機能が残る
- [ ] AIが原因判断するとき、古いZIP / MemoryだけでなくCurrent Runtime Evidenceを確認した

## GitHub Pages / Public Site

- [ ] Branch / GitHub ActionsのPublishing SourceがBuild / Artifact要件に合っている
- [ ] Final Source Commit → Build / Artifact → Pages deploy → Public URLの対応を必要範囲で追跡できる
- [ ] 相対Path / `fetch()` / File名CaseがProject Site subpathでも正常
- [ ] SPA /複数RouteではDirect Open / Refresh / 404 recoveryを実公開条件で確認した
- [ ] `localhost` / PC固有絶対Pathに依存していない
- [ ] 公開ArtifactへSecret /不要なprivate fileを入れていない
- [ ] Custom Domain使用時、Pages設定 / DNS / domain verification / HTTPSを必要範囲で確認した
- [ ] Service Worker / cache採用時、旧Revisionが残るFailureとRecoveryを確認した
- [ ] Current Pages limitation / intended useがProduct要件へMaterialに影響する場合、Current公式情報を再確認した
- [ ] 公開URLで主要導線を確認した、または実公開未確認と明記した
- [ ] 確認した公開URLがユーザーへ渡す最終Commitと対応している
- [ ] 代表Site URLがある場合、README上部とRepository About `Website`から到達できる

## Browser / Web Platform Compatibility — 該当時

- [ ] Target User / Runtime / Primary TaskからSupported / Enhanced / Unsupportedの境界を必要範囲で定義した
- [ ] Baseline / compatibility tableだけで実ProjectのBrowser対応を確認済み扱いしていない
- [ ] Browser名分岐よりFeature Detectionを優先し、必要なunsupported / fallback pathを確認した
- [ ] 新Web API / CSS / syntax採用時、Support Targetとの差とfallback / polyfill / transpilation要否を確認した
- [ ] Representative Browser / engine / Desktop-Mobile / WebView等をProject riskに合わせて選んだ
- [ ] Permission / Media / Touch / PWA / WebView等で必要ならReal Browser / Real Deviceを確認した、または未確認と記録した
- [ ] Polyfill / transpilationを使う場合、Target Runtimeで実際に動作し、不要なLegacy layerを残していない
- [ ] Browser support終了時、Current Requirements / test matrix / user-facing limitationを必要範囲で同期した

## Content / IA / Search / Discoverability — 該当時

- [ ] 主要Contentを件数・文字数だけで完成扱いせず、Correctness / Sufficiency / Clarity / Freshness等を必要範囲で確認した
- [ ] 重要ContentがNavigation / Search / Related / Contextual entry等から合理的に到達でき、意図しないOrphanがない
- [ ] Rename / Move / Archive / Delete後にBroken link、Stale relation、Ghost Search Resultを残していない
- [ ] Searchが重要な場合、Exact / Partial / Multiple / No Result / Filter等の代表Queryを実Dataで確認した
- [ ] Search Resultの存在だけでなくRelevance / Ranking / RecoveryがPrimary Taskに合っている
- [ ] Search Index / Sitemap / Structured Data等のDerived DataがCanonical Dataと同期し、必要ならRebuildできる
- [ ] Empty / No Result / Offline / Permission等を混同せず、必要なState explanationと次Actionがある
- [ ] External Search / Sharingが重要なPublic Siteではtitle / description / index control / canonical / sitemap / social metadata等を必要範囲で確認した
- [ ] Metadata / Structured DataがUser-visible Contentと重大に矛盾していない
- [ ] 検索順位・Rich Result・Analyticsの有無だけをCompletion条件にしていない

## Measurement / Analytics / Experimentation — 該当時

- [ ] Primary Outcome / Proxy / Guardrailを必要範囲で区別し、取得できる数字だけをSuccess Metricにしていない
- [ ] 重要EventのTrigger / Success-Failure境界 / Property semanticsが実Product behaviorと一致する
- [ ] Duplicate / Missing telemetry / Analytics provider failureがMetricやPrimary Taskを不自然に壊さない
- [ ] Analytics Payloadへ不要なSecret / Personal Data / User入力全文を含めていない
- [ ] 重要Metricの母数 / eligibility / periodを確認し、Missing DataをObserved zeroと混同していない
- [ ] Experiment時はAssignment / instrumentation parity / Guardrail / sample integrityを必要範囲で確認した
- [ ] User FeedbackをContext付きEvidenceとして扱い、提案SolutionとUnderlying Needを分けた
- [ ] 重要ReleaseではTechnical HealthとProduct Outcomeを必要範囲で分けてReviewした
- [ ] Experiment / rollout終了後にobsolete variant / temporary event /不要Feature Flag等をCleanupした

## Learning

- [ ] Target Learner / Starting Knowledge / Learning Objective / Observable Capabilityが定義されている
- [ ] Learning orderが必要なPrerequisite / Concept dependencyに基づき、Page番号やData順だけで決まっていない
- [ ] 主要Lessonが用語紹介だけで終わらず、Objectiveに必要なWhat / Why / How / Example / Comparison / Practice等を持つ
- [ ] Worked example / guided practice / independent practice / retrieval等を目的に応じて使い分け、全Lessonへ同じTemplateを強制していない
- [ ] Lesson viewed / completionとUnderstanding / Application / Masteryを必要に応じて区別した
- [ ] Assessment / Understanding checkがLearning Objectiveを実際に測り、RecognitionだけでApplicationを証明していない
- [ ] Feedbackが正誤表示だけで終わらず、必要なReason / Review / Retry / Next Stepへ接続している
- [ ] Diagnostic / Placementを使う場合、境界・誤判定・Recovery pathを確認した
- [ ] 長期保持がProduct OutcomeならRetrieval / Review / delayed evidenceを必要範囲で確認した
- [ ] Beginner learning pathとQuick Referenceを両方扱う場合、互いに不要な遠回りを強制していない
- [ ] 時間で正解が変わる教材ではFreshness / version applicability / superseded contentを確認した
- [ ] Lesson後のNext Step / Review導線を確認した

## Game

- [ ] Core Loop / 現在PhaseのMain Flowを実際にPlayしてEnd-to-End確認した
- [ ] ProgressionがPrimary Completion Conditionへ接続している
- [ ] Controls / Tutorial / Game UXをRuntimeで確認した
- [ ] Visual / Animation / Collider等がGame Ruleと重大に矛盾していない
- [ ] 永続Saveがある場合、New Save / Save / Reload / Existing Saveを必要範囲で確認した
- [ ] 必要なAutomated Test / Runtime ValidationとActual Playtestを分けて実施した
- [ ] Main Game Complete時はFresh StartからPrimary Completion Conditionまで主要Flowを確認した

## Electron / Distribution

- [ ] 実Windows起動 / preload / IPCを必要範囲で確認した
- [ ] Installer更新で`userData`等のユーザーデータを失わない
- [ ] App / Package / Release Tag / Installer / Update MetadataのVersionが整合する
- [ ] Release Artifactを同じBuild / Release Pipelineから生成し、別Buildを混ぜていない
- [ ] Auto Update採用時、旧Version → 新Version / Restart / userData維持を必要範囲で確認した
- [ ] Update失敗時に手動Release導線と現Version継続利用ができる
- [ ] 実機未確認・Code Signing等の配布制約を明示した

## Release / Rollback / Maintenance — 該当時

- [ ] Release ArtifactとSource Commit / Version / Tagの対応を追跡できる
- [ ] Broken Releaseを同Version Artifactの無言差し替えだけで解決していない
- [ ] Code / Deploy / Data / Config / External StateのどこまでRollback対象か確認した
- [ ] Schema / Data変更ではRollbackよりForward-fixが安全な場合を含めて判断した
- [ ] Irreversibleな変換前に必要なBackup / Snapshotを確認した
- [ ] Deploy failureとBroken Productionを区別した
- [ ] Hotfix / Legacy / temporary patchを恒久Layerとして残していない

## Public / Cloud / Media — 該当時

- [ ] Asset License / Attribution / Privacyを確認した
- [ ] Auth / Authorization / RLS / Grant等をFrontend-visible Keyだけに頼っていない
- [ ] Offline / Provider outage / quota超過時のFallbackを確認した
- [ ] Media Codec / Object URL cleanup /大容量時Performanceを必要範囲で確認した
- [ ] Public Contentでは`lang` / title / Direct Link recovery / Metadata等を用途に応じて確認した

## Verification State

作業報告では必要に応じて区別します。

- Implemented
- Static validated
- Browser validated
- Visual reviewed
- Playtested
- Real-device validated
- User validated
- Known limitation
- Not verified

## External API / SDK / Webhook — 該当時

- [ ] Integration purpose、Provider boundary、Not Found vs Failure、transport success vs business successを必要範囲で分けた
- [ ] External / Local authorityとID namespaceが明確で、保存 / Sync / Reconciliationがある場合は`docs/03`のData Contractを確認した
- [ ] Retry / Webhookでduplicate mutationを起こさず、ordering / ACK / retry stop / provider outageをRiskに応じて確認した
- [ ] MockだけをProviderの真実とせず、必要なContract / Sandbox / Production-safe evidenceを区別した
- [ ] API / SDK / Webhook / Auth変更時にCompatibilityとDeprecation / Removalを確認した
- [ ] Provider unavailableや未確認Environmentを`Verified`とせず、Known limitationを残した
- [ ] Diagnosticsが必要な場合、Secret / raw payloadを無制限保存せず`docs/15`の最小Evidenceを使った
