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
| GitHub Pages / 公開Site | Pages / Public URL / Repository discoverability | [08](../docs/08-github-pages.md) / [10](../docs/10-project-management.md) |
| Public / Auth / API / Cloud | Security / Dependency | [06](../docs/06-security.md) / [13](../docs/13-dependencies-assets.md) |
| `LEARNING` | Learning Content | [01](../docs/01-requirements.md) |
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

## Diagnostics / AI Handoff

- [ ] Error / Rejection /重要なFetch・Storage Failureを必要範囲で捕捉できる
- [ ] Breadcrumb / Log / Snapshotが無制限に増えない
- [ ] Diagnostic DataからSecret / Token / User入力全文等を除外した
- [ ] Export / Remote Handoffを使う場合、Sanitize済みCompact Evidenceだけを渡す
- [ ] Remote Provider停止時もLocal Diagnostics / Core機能が残る
- [ ] AIが原因判断するとき、古いZIP / MemoryだけでなくCurrent Runtime Evidenceを確認した

## GitHub Pages / Public Site

- [ ] 相対Path / `fetch()` / File名Caseが公開Subpathでも正常
- [ ] `localhost` / PC固有絶対Pathに依存していない
- [ ] 公開ArtifactへSecretを入れていない
- [ ] 公開URLで主要導線を確認した、または実公開未確認と明記した
- [ ] 確認した公開URLがユーザーへ渡す最終Commitと対応している
- [ ] 代表Site URLがある場合、README上部とRepository About `Website`から到達できる

## Learning

- [ ] Starting Knowledge / Learning order / Target learnerが定義されている
- [ ] 主要Lessonが用語紹介だけで終わらず、必要なWhat / Why / How / Exampleを持つ
- [ ] Understanding check / Completionを必要に応じて区別した
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
