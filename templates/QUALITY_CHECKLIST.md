# Quality Checklist

すべての項目を毎回実施するための表ではありません。Project Profileと変更内容に合わせて、**Minimum → Standard → Extended**の順で必要範囲を選びます。

未確認項目はチェックせず、作業報告へ残します。

## Minimum — 原則すべての制作・修正

### 構成

- [ ] README / 仕様が現在実装と致命的に矛盾していない
- [ ] `PROJECT_LEARNINGS.md` が存在する
- [ ] 同じ機能の旧Runtimeが本番で重複していない
- [ ] 正式RuntimeがVersion別Folder / Patch Fileの増殖構造になっていない
- [ ] 変更対象と影響範囲を確認した
- [ ] 一時Script / 一時Workflow / Debug資産が本番Repoへ残っていない

### HTML / CSS / JS

- [ ] JavaScript構文・起動時エラーなし
- [ ] 必須CSS / JS / Asset参照切れなし
- [ ] 変更した主要Button / Linkが反応
- [ ] UIが画面外へ致命的にはみ出さない

### Visual Quality Baseline — User-facing UIでは必須

詳細は [Visual Quality Baseline](../docs/17-visual-quality-baseline.md) を正本とします。

- [ ] Primary Action / Main Content / Secondary InformationのVisual Hierarchyが分かる
- [ ] TypographyのSize / Weight / Line-height / Colorが同じ役割で一貫している
- [ ] Spacing / Alignmentが場当たり的でなく、Group関係を表している
- [ ] Button / Input / Dialog / Tab等の同じ役割が一貫したVisual languageを使う
- [ ] Browser defaultとCustom UIが無計画に混在した未完成状態になっていない
- [ ] 明らかなText clipping / unintended overflow / broken alignmentがない
- [ ] Focus / selected / disabled等、実際に存在する主要Stateが見分けられる
- [ ] Contrastや操作Targetを見た目のために犠牲にしていない
- [ ] Temporary label / placeholder / Debug UI / Prototype感が通常画面に残っていない
- [ ] UIを変更した場合、最終状態をBrowser / Screenshot等で確認した、またはVisual未確認と記録した

### Data / Storage

- [ ] JSON構文正常
- [ ] 変更で既存保存データを意図せず消さない
- [ ] Storage Key / Schema変更がある場合、互換性を確認

### GitHub Pages

- [ ] Pages対応プロジェクトでは相対Path / fetch先が正常
- [ ] localhost / PC固有絶対Pathに依存していない
- [ ] 公開Artifactへ秘密情報を入れていない
- [ ] Pagesを確認した場合、その結果がユーザーへ渡す最終Commitに対応している
- [ ] 公開して使えるSite URLがある場合、Repository Aboutの`Website`へ代表URLを設定し、README上部からもSiteを開ける

### 完了記録

- [ ] 必要なREADME / 作業報告を更新
- [ ] 高コストBug / 重要な成功パターンを `PROJECT_LEARNINGS.md` へ反映
- [ ] 確認できなかったことを未確認として記録
- [ ] CIがある場合、Cleanup後の最終Commit / Merge Commitに対する結果を確認

## Standard — 通常のWebアプリで推奨

### Data / State

- [ ] Single Source of Truthが明確
- [ ] Version / Build / Schema / 件数等の重複hardcodeがない
- [ ] ID重複なし
- [ ] Import前Validation
- [ ] Migrationが必要なら実装または方針明記
- [ ] 大容量MediaをlocalStorageへ入れていない
- [ ] 重要データにBackup / Export / Recoveryを必要に応じて用意
- [ ] 保存失敗時に無言で成功扱いしない
- [ ] 編集サイトでは未保存状態を必要に応じて扱う

### Development Diagnostics

Interactive Projectでは必要範囲を確認します。

- [ ] App Version / Build / Schemaを診断情報から確認できる
- [ ] JavaScript Errorを捕捉できる
- [ ] Unhandled Promise Rejectionを捕捉できる
- [ ] Fetch / API Failureを必要に応じて記録できる
- [ ] Storage read / write Failureを必要に応じて記録できる
- [ ] 重要操作のBreadcrumbが残る
- [ ] Breadcrumbが無制限に増えない
- [ ] Diagnostic LogのClear / Rotation方法がある
- [ ] Token / Password / Secret / User入力全文をLogへ残さない
- [ ] Diagnostic Dataを公開Repositoryへ誤Commitしない
- [ ] 問題発生時にDiagnostic Export / Copy Reportできる（中規模以上）
- [ ] Remote Handoff採用時もLocal Diagnostics / ExportがFallbackとして残る

### UI / UX

- [ ] Loading State
- [ ] Empty State + 復帰導線
- [ ] Error State + Retry / Fallback
- [ ] Success State
- [ ] 主要Interactive Componentのfocus / pressed / disabled / loading等、実際に存在するStateを確認
- [ ] ページ全体の不要な横overflowなし
- [ ] fixed / stickyが主要操作を隠さない
- [ ] 小画面・低い縦解像度で致命的に崩れない
- [ ] 自前DOMを別ModuleのMutationObserverで恒久的に完成させていない

### Visual Design — high / flagshipまたは大規模UI変更で追加確認

MinimumのVisual Quality Baselineを満たした上で、Visual Ambitionがhigh / flagship、または新規Page / 大規模UI刷新では確認します。

- [ ] Accent Color / Gradient変更だけで別Design扱いしていない
- [ ] 色・Shadow・Gradientを外しても主要なInformation Hierarchyが読める
- [ ] Header / Navigation / Content Width / Density / Grid / Primary ActionがProject目的に合っている
- [ ] TypographyのSize / Weight / Line-height / Spacingに一貫したHierarchyがある
- [ ] Spacingが情報Groupingを表し、ランダムなmargin値の寄せ集めになっていない
- [ ] すべてのContentを理由なくCard化していない
- [ ] Gradient / Glass / Glow / Shadow / Rounded Cornerを使う場合、役割を説明できる
- [ ] 巨大Hero → 3 Feature Cards → CTAをAIのDefaultだけで採用していない
- [ ] 長い本文や高密度UIまで機械的に中央揃えしていない
- [ ] Project内のComponentは一貫しつつ、他ProjectとPage Compositionまで同じにしていない
- [ ] Generic Marketing CopyをVisualの水増し目的で追加していない

### Accessibility

- [ ] 適切なbutton / label / nav / mainを使用
- [ ] キーボードで主要操作可能
- [ ] focus-visibleが見える
- [ ] 色だけで状態を表現していない
- [ ] 通常文字のコントラストを確認
- [ ] 操作対象が極端に小さくない
- [ ] reduced-motionを必要に応じて尊重

### Performance / Reliability

詳細RuleとSoft Budgetは [05 Performance / Reliability](../docs/05-performance-reliability.md) を正本とします。

- [ ] Cold LoadでInitial Transfer / 初期Requestを確認し、不要なJS / JSON / Media / 外部ResourceをEager Loadしていない
- [ ] ResourceのCritical / Deferred / On DemandがPrimary UXに合い、LCP候補を機械的にLazy Loadしていない
- [ ] Soft BudgetのReview Trigger超過があれば、自動Failにせず必要性・遅延・分割・圧縮・Cache・代替を確認した
- [ ] 大量Dataを無条件に全DOM化せず、長時間同期処理でUIを固めていない
- [ ] `DATA` / `MEDIA` / `CLOUD`等では必要に応じてMobile / Slow Network / Cold vs Repeat Loadまで確認した
- [ ] Blob URL / Timer / Listener等をCleanupし、第三者API / CDN失敗時の影響を確認した
- [ ] Diagnostics自体がStorage / Performanceを大きく悪化させていない

### Browser

- [ ] 主用途ブラウザで主要操作確認
- [ ] Firefox / Chromiumの両方が重要なら両方確認
- [ ] 新しいWeb APIはFeature Detection / Browser Supportを確認

## Extended — 条件付き

Project Profileや高リスク変更に該当する場合のみ実施します。

### VISUAL DIRECTION

新規Project / 大規模UI刷新 / Landing / Showcase / Media等でVisual Directionが重要な場合。

- [ ] CSS実装前にDesign Concept / Navigation / Density / Typography / Component / Effect方針を決めた
- [ ] ProjectのContent / Task / AudienceからDirectionを導いた
- [ ] Wireframe / StructureをVisual Polishより先に確認した
- [ ] 色違いではなく構造的に異なる2〜3案を必要に応じて比較した
- [ ] 1つのSignatureまたはProject固有のVisual理由がある
- [ ] PromptでHero / Card Grid / Effect等を先に固定しすぎて探索余地を消していない
- [ ] 実装前に「別Projectにもそのまま使えるGeneric Planではないか」を自己Reviewした
- [ ] 採用Directionと却下案の理由を要件 / ADR / 作業報告のいずれかへ残した
- [ ] DesignShelfを使った場合、Layoutを完成TemplateとしてコピーせずProject固有構造へ変形した
- [ ] Reference Siteを使った場合、特定企業のLayout / Brand表現をそのままコピーしていない

### VISUAL REVIEW

Visual Ambitionがhigh / flagship、またはVisual完成自体が価値になるProjectではBuild後に確認します。

- [ ] Purpose / User TaskとFirst Viewが一致
- [ ] Primary Action / Hierarchy / Navigationが明確
- [ ] Typography / Spacing / DensityがContentへ合う
- [ ] Card / List / Table / Tabs等の選択が情報の性質へ合う
- [ ] ResponsiveがDesktopの単純縮小ではなくPriorityを再構成している
- [ ] Generic AI Template Lookが再発していない
- [ ] Findingを必要に応じてBlocking / Major / Minorへ分類した
- [ ] Blocking Findingが0件、または未解決理由が明示されている
- [ ] Visual Review結果をPass / Needs workで記録した

### AI-ASSISTED DEVELOPMENT

AIへ大きく実装を任せる場合。

- [ ] AIが提案したArchitecture / Dependency / Storageを理由なく採用していない
- [ ] `AGENTS.md`がある場合はSoTを複製せず、正本とTest commandへのRouterになっている
- [ ] Remote Diagnostic Handoffが有効なら最新Runtime Evidenceを確認してから原因推測した
- [ ] 未経験TechnologyをAIへ任せた場合、Architecture / Security / Deployment / Data persistenceを追加Reviewした
- [ ] 大規模生成 / 移植ではReference / Golden Output / Contract / Regression Dataset等のOracleを利用できるか検討した
- [ ] AI生成Codeにも通常と同じStatic / Browser / Regression基準を適用した

### REMOTE DIAGNOSTIC HANDOFF

ZIPを繰り返しAIへ渡しているInteractive ProjectでRemote Handoffを導入する場合。

- [ ] 無料必須Projectでは現在のProvider無料枠を確認した
- [ ] Remote Handoffのために有料Planを必須化していない
- [ ] 1 Site = 1 Backendを機械的に増やさずShared Store + `projectKey`を検討した
- [ ] Remoteへ保存するのはSanitize済みCompact Snapshotだけ
- [ ] 画像 / 動画 / 音声 / File body / Storage全Dumpを自動Remote保存していない
- [ ] Snapshot最大Sizeを決めた
- [ ] Normal / Error SnapshotのRetentionまたは最大件数を決めた
- [ ] Remote write TriggerをManual / Major Error等へ絞った
- [ ] `service_role` / Secret / private keyを公開Frontendへ置いていない
- [ ] Supabase等の公開TableではRLSとGrantを確認した
- [ ] `projectKey`だけをAuthorizationに使っていない
- [ ] 無制限匿名InsertをDefaultにしていない
- [ ] Remote write失敗時もLocal Diagnosticsが残る
- [ ] Provider Pause / Offline / 未接続でもCore機能を使える
- [ ] `AGENTS.md`等に秘密情報なしでProvider / projectKey / 読取範囲 / Fallbackを記録した
- [ ] AI更新時は最新Error少数 + 最近のNormal少数から読み、全履歴を毎回取得しない
- [ ] 長期価値のある知見はRemote Snapshotだけに残さず`PROJECT_LEARNINGS.md`へ昇格する

### DATA / TOOL

- [ ] Schema Validation
- [ ] Migration Test
- [ ] Backup → Restore Test
- [ ] 破壊的Importは全payload Validation後に既存Dataを変更する
- [ ] Import前Recovery / Backupがある
- [ ] Import途中失敗時にRollbackまたは元Data維持を確認
- [ ] 不正Importで現在Dataが変わらないTestがある
- [ ] 編集→保存→再読込E2E
- [ ] 複数タブ競合を考慮（重要データの場合）
- [ ] Import / Migration / Restore結果がDiagnosticsへ残る

### MEDIA

- [ ] IndexedDBの実保存・復元
- [ ] Media Codec
- [ ] Object URL cleanup
- [ ] 大容量データ時の性能
- [ ] Canvas / Geometry
- [ ] Media本体をDiagnostic Exportへ誤って含めない

### GAME

詳細Ruleは [19 Game Development](../docs/19-game-development.md) を正本とします。Common + Conditionalで確認し、小規模Gameへ不要なSave / LOD / Stress / Long-session項目を強制しません。

- [ ] Core Loopを実際にPlayし、現在PhaseのMain FlowがEnd-to-Endで成立する
- [ ] Progressionがある場合、Main Goal / Primary Completion Conditionへ接続する
- [ ] Controls / Tutorial / Game UXをRuntimeで確認した
- [ ] Visual / Animation / Collider等がGame Ruleと重大に矛盾していない
- [ ] Prototype Placeholderを完成扱いしていない
- [ ] 必要なAutomated TestとRuntime Validationを行い、Actual PlaytestをStatic Testと分けて実施した
- [ ] 永続Saveがある場合、New Save / Save / Reload / Existing Saveを必要範囲で確認した
- [ ] Failureがある場合、主要Failure / Edge Case / basic exploitを必要範囲で確認した
- [ ] 大量Entity / 重いScene等がある場合、通常Gameplayと代表的な重い状態のRuntime Performanceを確認した
- [ ] Main Game Complete時はFresh StartからPrimary Completion Conditionまで主要Flowを確認した

### CLOUD

- [ ] Auth / Guest境界
- [ ] Sync失敗
- [ ] Offline / Provider outage
- [ ] Secret / Environment設定
- [ ] Authorization Header / TokenをLogへ残さない
- [ ] 無料必須の場合はPricing / quota / Active Project / Pause条件を導入時点で再確認

### ELECTRON

- [ ] 実Windows起動
- [ ] preload / IPC
- [ ] `userData`等のユーザーデータがInstaller更新で消えない
- [ ] start.bat失敗時ログ
- [ ] Setup.exe / install / uninstall（該当時）
- [ ] 起動失敗 / IPC failureを診断できる
- [ ] 継続配布するインストール型Appでは起動時更新確認 + One-click Updateを導入できるか確認
- [ ] Installer配布のVersion正本 / Release Channel / Update Provider / Fallbackが明確
- [ ] Auto Update使用時、ReleaseにInstaller / Update Metadata / blockmap等の必要Artifactが同Versionで揃っている
- [ ] Metadataが現在Versionの実Installerを参照している
- [ ] Installer / Metadataを同じBuild / Release Pipelineから生成し、別BuildのArtifactを混ぜていない
- [ ] PR BuildはStable Releaseを作らず、main / approved tag等の公開経路と分離されている
- [ ] `package.json#version` / `app.getVersion()` / Release Tag / Installer / MetadataのVersionが整合する
- [ ] Updater導入前Versionがある場合、Updater搭載のBootstrap Versionと1回手動Installの要否を明記した
- [ ] サポート対象の最古Auto-update Version → 最新VersionのUpdate Pathを確認した、または未確認と記録した
- [ ] Auto Update失敗時に手動Release導線と現Version継続利用ができる
- [ ] Auto Update導入・方式変更時、旧Version → 新Versionの実機Update / Restart / userData維持を確認
- [ ] Code Signingの有無を明示し、公開配布で未署名ならSmartScreen / Publisher検証の制約を記録した
- [ ] Broken Releaseを同Version差し替えだけで解決せず、必要ならより大きい修正版Versionを発行する方針がある

### PUBLIC-CONTENT

- [ ] Asset License / Attribution
- [ ] 公開してはいけない個人情報なし
- [ ] `<html lang>`が内容と一致
- [ ] 主要Pageに意味の分かる`title`
- [ ] 検索流入が重要なら必要なMetadata / SEOを確認
- [ ] 複数Page / Direct Linkが重要なら404時の復帰導線がある
- [ ] 多言語時、長い翻訳Text / Language / RTLを必要に応じて確認
- [ ] Analytics / Form / Third-party ScriptのPrivacy影響を確認

### Test / Learning

- [ ] Static Validation成功
- [ ] Unit Test成功（該当時）
- [ ] Browser Smoke / E2E成功（該当時）
- [ ] 一度直した重大BugにRegression Guardあり
- [ ] 高コストBugのRoot Cause / Preventionを `PROJECT_LEARNINGS.md` に記録
- [ ] Version / Build / Schema等の正本と派生値が自動検証される（該当時）
- [ ] 途中Commitではなく最終Commit / Merge Commitの結果を確認した

## Verification State

作業報告では必要に応じて以下を区別します。

- Implemented
- Static validated
- Browser validated
- Visual reviewed
- Real-device validated
- User validated
- Known limitation
- Not verified
