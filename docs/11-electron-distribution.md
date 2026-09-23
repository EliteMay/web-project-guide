# 11 Electron / 配布 / ZIP

この章はElectron固有のRuntime Security、Windows統合、Installer / Update / Release Contract、Desktop配布の正本です。Web共通Securityは [06 Security](06-security.md) を確認します。

## Electron指定時

Electron指定のProjectを勝手にWeb版へ変更しません。

Web版へ変更した方がよい理由がある場合も、Current Requirements / User Intent / Compatibilityを先に確認し、Best Reasonable Decisionで進めます。Productの主要体験や配布Contractが変わり、Current Contextから一意に判断できない場合だけUser Decisionを求めます。

## 基本構成

必要に応じて以下を用意します。

- `package.json`
- `main.js` / main process modules
- `preload.js`
- renderer側HTML / CSS / JS
- 必要な起動 / setup script
- Version管理
- App Icon
- 設定保存
- Log
- user data保存場所

ScriptやFileを増やすこと自体を完成条件にしません。

## Electron共通基盤

Electron Appは個別機能だけでなく、更新・保存・復旧・診断・OS統合等のDesktop共通責務を持ちやすいため、MeaningfulなElectron Projectでは**共通基盤（Desktop Foundation）を先に評価**します。

目的は全Appへ同じ機能を機械的に積むことではありません。App固有機能と共通責務を分離し、同じ失敗を複数Appで繰り返さないことを優先します。

### SHOULD: 基礎Capabilityを共通責務として整理する

Projectの性質に応じて、最低限次を共通基盤候補として評価します。

- **設定管理** — Theme、保存先、Update設定、Window設定等を一元化し、Schema / Version / Default /破損時Fallbackを持つ。
- **Log** — 起動、終了、Update、IPC、外部Process、保存失敗等の原因追跡に必要なLogを残し、Retention / Sizeを制御する。
- **診断画面 / 診断情報** — App / Electron / OS Version、主要Path、Update Channel、保存先、直近Error等を確認できるようにし、Secretや不要なPersonal Dataは含めない。
- **Window State** — Size / Position / Maximized等を必要に応じて保存し、Display構成変更後に画面外へ復元しない。
- **単一起動** — 複数起動がData競合・重複Task・Port競合等を起こし得るAppではSingle Instanceを使い、2回目の起動では既存WindowをRestore / Focusする。
- **Recovery** — Renderer / Child Process異常終了や設定破損を検出し、Dataを守った再読込・再起動・Fallbackを用意する。無限Restart Loopを作らない。
- **最近使った対象 / Path記憶** — Folder / Project等を繰り返し選ぶAppでは、前回選択や最近使った項目を安全に保存し、毎回同じ選択を要求しない。Clear / Change手段も残す。
- **Theme連携** — App要件に合う場合はElectronのNative Theme / OS preferenceと連携し、ProjectのTheme Ruleは [04 UI / UX / Accessibility](04-ui-ux-accessibility.md) を正本とする。
- **Network状態** — Network依存機能がある場合、Offline / Provider failureを単なる不明Errorにせず、利用可能なLocal機能と分離する。

設定・Log・診断・Window State等を別々のComponentが独自形式で保存し、同じ情報の第二Source of Truthを増やさないようにします。

ElectronにはSingle Instance、app-specific data / logs path、Native Theme、Notification、Crash Report等のPlatform APIがあります。採用時はCurrent Electron公式仕様を確認し、古いAPI挙動を固定知識として扱いません。

### SHOULD: Userが変更する設定は専用のSettings Tab / Screenへ集約する

複数のUser-configurable設定を持つElectron Appでは、各Feature画面へToggleやPath選択を散らすだけで済ませず、**設定タブ / 設定画面**を共通Surfaceとして用意します。

対象例:

- Theme / 表示
- 保存先 / Work Folder /最近使ったPath
- Update確認 / Update Channel
- 起動時動作 / Auto Start / Tray
- Notification
- Download / Cache / Logの保存・Cleanup
- Model / Provider /外部Runtime設定
- Shortcut
- Diagnostics / Log folder
- Backup / Restore
- About / App Version

小規模Appで設定項目がほぼ存在しない場合まで空のSettings Tabを強制しません。ただし、Userが継続的に変更できる設定が複数ある場合はPrimary Navigation、App Menu、Gear button等から予測可能な経路で到達できるようにします。

Settings UIでは次を守ります。

- 現在値が分かる
- 変更が即時反映か、保存Buttonが必要かを曖昧にしない
- Restartが必要な設定は変更前後で明示する
- 危険なReset / Delete / Cache clear等は通常設定とVisual / Interaction上で区別する
- Secretは通常設定値と同じように平文表示・Exportしない
- 未対応 / 使用不能な設定を操作可能に見せない
- App再起動後も保存対象の設定が復元する
- Defaultへ戻す場合、何がResetされるか分かる
- 設定Schema変更時はMigration / fallbackを持つ

設定画面自体が第二の保存先にならないよう、UI stateとCanonical Settings Storeを分離します。

App内にSidebar / Tab navigationがある場合は、意味のある設定量があるAppでは`設定`を独立Navigation itemとして検討します。英語だけの`Settings`表記を強制せず、対象Userが理解できる名称を使います。

### CONDITIONAL SHOULD: 長時間処理はTask Managerで状態を統一する

Download、AI処理、Repository監査、Build、外部Tool実行等、Userが待つ長時間処理を持つAppでは、処理ごとに独自Spinnerや独自Stateを増やすよりTask Managerとして共通化します。

最低限、実際に対応するStateだけを明示します。

```text
queued
→ running
→ completed

running
├─ cancelling → cancelled
├─ interrupted → retry / resume
└─ failed → retry / diagnostics
```

Pause / Resumeを実装していない処理へ見せかけのButtonを出しません。

Task UIでは必要に応じて次を扱います。

- 現在何をしているか
- determinate / indeterminate progress
- 経過時間
- 実測可能な場合だけ残り時間
- Cancel / Retry / Resume
- Task-specific Log / Error
- App再起動後のInterrupted state recovery

進捗率や残り時間を計測できない場合、架空のPercent / ETAを表示しません。Task完了前に100%表示へ進めません。

重いNode.js処理をMain / Rendererへ長時間Blockingさせないよう、用途に応じてWorker / Child Process / Electron `utilityProcess`等の隔離を検討します。

### CONDITIONAL SHOULD: 外部ProcessはProcess Manager / Supervisorで管理する

Local Server、LLM Runtime、CLI、Encoder、Game Tool等の外部Processを起動するAppでは、起動処理だけを各Featureへ散らさず共通Process Managerを検討します。

必要に応じて次を持ちます。

- Start / Stop / Restart
- PID / instance identity
- stdout / stderrのbounded Log
- Health Check
- 起動中 / 正常 / degraded / stopped / crashed等の状態
- Graceful shutdown → timeout後の明示的Fallback
- App終了時のorphan cleanup
- bounded automatic restart
- Crash Loop検出

Process停止で実行File名だけを広く検索して無関係なProcessまでKillしません。自分が起動したinstance identityを優先して追跡します。

自動Restartは無制限に行わず、短時間に同じFailureを繰り返す場合は停止して原因・Log・Recovery ActionをUserへ示します。

### CONDITIONAL SHOULD: Crash LoopへSafe Mode / Repair Pathを持つ

Plugin、外部Process、Window State、設定、GPU / optional integration等が起動Failureを起こし得るAppでは、通常起動だけに依存しません。

必要に応じて:

- 起動開始 / 正常起動完了のmarkerを使ってCrash Loopを検出する
- 自動Restart回数へ上限を持つ
- Safe Modeでoptional integrationや前回Session復元を一時無効化する
- Cacheのみ削除、設定だけReset、Backup Restore等を破壊範囲別に分ける
- Repair後に通常起動へ戻れる
- Repair前に重要Dataを不用意に削除しない

「問題が起きたら全Data削除」を標準Recoveryにしません。

### CONDITIONAL MUST: Secretを保存する場合は通常設定と分離する

API Key、Access Token、Password、private credential等を扱う場合、通常の`settings.json`やRenderer storageへ平文保存しません。

Electronの`safeStorage`等、Current OS / Electronで利用可能な保護機構を検討し、最低限次を守ります。

- Secret valueをLog / Diagnostics / Crash reportへ出さない
- RendererへSecret一覧や復号APIを広く公開しない
- Secret identifierとSecret valueを通常設定上で分離する
- Encryption unavailable / temporary failure時に安全側へ倒す
- Backup / ExportへSecretを無条件に含めない
- Secret削除 /再設定手段を持つ

OS暗号化は万能なVaultとは扱いません。PlatformごとのProtection BoundaryをCurrent公式仕様で確認します。

### CONDITIONAL SHOULD: 大容量・長時間DownloadはDownload Managerへ統合する

Model、Asset、Tool、Installer以外の大型File等をApp内Downloadする場合、必要に応じて共通Download Managerを使います。

扱うState例:

- queued
- downloading
- paused
- interrupted
- verifying
- completed
- failed
- cancelled

必要に応じて:

- Bytes / Speed / Progress
- Pause / Resume / Cancel
- Network interruptionからのRecovery
- 一時File → 完了後の確定
- 空きDisk容量の確認
- Expected Hash / Signature / Sizeの検証
- 重複Download防止
- 古い一時FileのCleanup

ProviderやServerがResumeを保証しない場合、見せかけのResumeを実装しません。Download完了だけでTrusted Artifact扱いにせず、必要なIntegrity確認を分離します。

### SHOULD: Support可能なDiagnostic Exportを用意する

原因調査が必要なDesktop Appでは、Userが手動で共有できるDiagnostic Exportを検討します。

例:

- App / Electron / OS Version
- Update Channel
- relevant settingsのsanitized subset
- Process / Task state
- bounded recent logs
- Crash / failure summary
- Storage / cache pathの種別
- Network provider status

Export前にSecret、Token、Password、不要なPersonal Data、User File本文等を除外します。Diagnostic bundleを作れることと、外部へ自動送信してよいことは別です。

### CONDITIONAL SHOULD: Disk / Cache lifecycleを管理する

Model、Download、一時File、Cache、Log等でDisk使用量が増えるAppでは、User Dataと再生成可能Dataを区別して管理します。

- category別の使用量を必要に応じて表示する
- Cache / temp / old downloadへbounded cleanupを持つ
- 重要Dataを「Cache削除」で巻き込まない
- 自動Cleanupの対象 / retentionを明示する
- Disk fullを謎の保存Failureとして扱わない

### CONDITIONAL SHOULD: Suspend / Resume等のPower lifecycleを扱う

長時間Task、外部Process、Server接続、Download等を持つAppでは、Sleep / Resume後も開始前と同じ状態だと仮定しません。

ElectronのPower monitoring等を使う場合、必要に応じて:

- suspend前に安全に中断可能な処理を整理する
- resume後にNetwork / Process / File handle / Device stateを再確認する
- Battery / AC状態で高負荷Taskを調整する場合はUser intentを優先する
- Lock / UnlockがSecurityやSessionへ影響する場合だけ扱う
- Taskが失われた場合は成功扱いにせずInterruptedへ遷移する

### SHOULD: Appごとに識別可能な固有Icon / Identityを持つ

独立して配布するElectron Appは、理由がない限りElectron既定Iconや他の無関係な自作Appと同一Iconのままにせず、**Appごとに見分けられる固有Icon**を持たせます。

同じSuiteのAppではVisual familyを共有して構いませんが、Taskbar / Start Menu / Desktop等で個々のAppを識別できる差を残します。

Iconを設定する場合、必要なSurfaceを同じApp identityへ揃えます。

- Packaged executable
- BrowserWindow / Taskbar
- Desktop Shortcut
- Start Menu
- Installer / Uninstaller
- Notification等、Icon表示があるOS Surface

Windows配布ではPackaging ToolのIcon設定とRuntime Window Iconが別経路になる場合があるため、片方だけ変えて完成扱いにしません。

Icon Assetは可能な限り1つのSource Asset / generation pathから派生させ、複数の古いIcon Fileが独立して残る状態を避けます。Windowsでは必要なSizeを含む適切な`.ico`等、Target Platformに合う形式を使います。

Icon変更と同時にApp identity自体を毎Version変更しません。`productName`、App ID、Windows AppUserModelID等の安定した識別子はUpdate、Shortcut、Taskbar grouping、userData等へ影響し得るため、既存AppではCompatibilityを確認します。

実Windows確認では必要に応じて:

- Taskbar
- Desktop Shortcut
- Start Menu
- Installer / Setup.exe
- 実行中Window
- Update後の既存Shortcut

を確認します。Windows Icon Cacheにより旧Iconが残る場合があるため、実機で未確認ならその状態を明記します。

### CONDITIONAL SHOULD: First Run / Repairを共通化する

初回起動時にFolder、外部Runtime、権限、Model、Dependency等の準備が必要なAppでは、Feature画面ごとに初期化処理を散らさずFirst Run / Repair flowを検討します。

- 必須 / 任意Dependencyを分ける
- Detection結果を表示する
- 再実行しても壊れないidempotentなSetupを優先する
- 一度選んだFolder等を理由なく毎回聞かない
- 失敗項目だけRetryできるようにする
- Current settings / dataを壊さずRepairできる範囲を明示する

### CONDITIONAL SHOULD: 重要なLocal DataにはBackup / Restoreを持つ

Userが再作成しにくいLocal Dataを持つ場合は、[03 Data / Storage](03-data-storage.md) のRuleに従って次を検討します。

- 明示的なExport / Backup
- Restore前Validation
- boundedな自動Backup /世代管理
- Last-known-good設定へのRecovery
- Backup → Restore → ReloadのRound-trip確認

Cacheや再生成可能Dataまで無条件にBackup対象へ含めません。Backupが存在するだけでRestore可能とは扱いません。

### CONDITIONAL: OS統合機能は用途がある場合だけ有効化する

以下は便利でも全Electron Appへ標準搭載しません。

- **Auto Start** — Background常駐等の明確な価値があり、UserがON/OFFできる場合。
- **Tray** — Windowを閉じても処理継続するProduct behaviorが必要な場合。`×`、最小化、終了の意味を曖昧にしない。
- **System Notification** — Background完了・Update・MaterialなError等、Appを見ていないUserへ知らせる価値がある場合。通知過多にしない。
- **Global Shortcut** — Appが非Activeでも操作する必要がある場合。競合、登録失敗、解除を扱う。
- **File Association / Custom Protocol** — File / LinkからAppを開くPrimary Flowがある場合。入力を信頼せずValidationする。
- **GitHub Integration** — Release / Issue / Repository等がProduct機能に直接必要な場合。Token / permission / offline failureをSecurity Boundaryとして扱う。
- **Cache Clear / DevTools / Log Folder Open** — 診断やRecoveryに有効な場合。通常Userへ破壊的Resetを誤操作させない。

OS統合は「実装できるから追加する」のではなく、User Task / Background behavior / Recoveryに必要かで決めます。

### SHOULD: 共通基盤を再利用可能にする

複数Electron Appで同じ責務を使う場合、copy-pasteを増やすより次のいずれかを検討します。

```text
Electron App
├─ Product-specific Feature
└─ Desktop Foundation
   ├─ App Identity / Icon
   ├─ Settings Store / Settings UI / Secret Storage
   ├─ Logging / Diagnostics
   ├─ Window State / Recovery / Safe Mode
   ├─ Task Manager / Process Manager
   ├─ Download / Disk lifecycle
   ├─ Update
   └─ Conditional OS / Power Integration
```

再利用方法はTemplateでも内部Packageでも構いません。

- 共通ModuleはPlatform責務へ限定し、App固有Business Logicを取り込まない。
- Featureごとにopt-in / opt-outできるようにし、巨大な必須Frameworkにしない。
- shared package自体もVersion / Compatibility / Migrationを持つ。
- Rendererへ広いOS権限を渡す共通APIを作らず、Main / PreloadのCapability surfaceを最小化する。
- 共通基盤の変更で複数AppへRegressionが波及するため、代表App / Integration Testを持つ。

既存Appへ導入する場合は、現在のSettings / Window / Update / Storage実装を確認し、二重Runtimeや二重保存を作らず正式責務へ統合します。

### Electron共通基盤のCompletion

共通機能を追加しただけで完成扱いにしません。変更内容に応じて次を確認します。

- Settings Tab / Screenが必要なAppでは主要設定へ予測可能に到達でき、現在値 / 保存 / Restart要否 / Reset範囲が分かる
- Restart後も設定 / Window State /最近使った対象が意図どおり復元する
- Display構成変更後もWindowが到達可能な位置へ開く
- 2重起動時に競合せず、必要なら既存WindowへFocusする
- Corrupt Settings / Renderer crash / Network failure等でDataを失わずRecoveryできる
- 長時間Taskが実Stateと一致するProgress / Cancel / Retry / Interrupted behaviorを持つ
- 外部ProcessがCrash / App終了時にorphan化せず、Restart Loopへ上限がある
- Secretを扱う場合、通常設定・Log・Diagnostic Exportへ平文流出しない
- Download / Disk full / Suspend-Resume等のFailureから安全にRecoverできる
- Diagnostic情報が原因調査に使え、Secret /不要なPersonal Dataを含まない
- App固有IconがPackaged App / Taskbar / Shortcut / Start Menu / Installer等の必要Surfaceで識別できる
- Auto Start / Tray / Notification / Global Shortcut等は実Windows上のBehaviorを必要範囲で確認する
- shared foundation更新で既存Appの主要Flow / Update / Storageを壊していない

OS固有CapabilityはCIやStatic TestだけでReal-device validated扱いにしません。

## ユーザーデータ

更新時にユーザーデータが消えない構成を優先します。

保存先は原則としてElectronの`userData`等、アプリ更新で上書きされにくい場所を使います。

以下をアプリ本体フォルダへ直接固定保存しすぎないようにします。

- ユーザー設定
- 履歴
- キャッシュ以外の重要データ
- 個人データ

保存形式変更時はMigration / Backup / Rollback可能性を確認します。Storage技術詳細は [03 Data / Storage](03-data-storage.md) を正本とします。

## Electron Security Contract

ElectronはRendererからOS / File / Shell等のprivileged capabilityへ到達できるため、通常Webより強いTrust Boundaryを持ちます。

Electron公式Security Checklistを基準に、**該当する項目を理由なく無効化しません。**

### MUST: Rendererをprivileged boundaryにしない

- Remote / untrusted contentで`nodeIntegration`を有効にしない。
- `contextIsolation`を有効に保つ。
- Process sandboxを理由なく無効化しない。
- RendererへElectron / Node API objectを丸ごと公開しない。
- preloadでは必要なoperationだけを`contextBridge`等で細く公開する。
- privileged operationはmain / preload側で入力と権限を再検証する。

`nodeIntegration: false`だけで十分とは扱いません。Context isolation / sandbox / capability surfaceを合わせて確認します。

### MUST: IPC senderとpayloadを検証する

すべてのprivileged IPC handlerで、最低限次を確認します。

- `sender` / `senderFrame`が許可されたRenderer / originか
- channelがそのoperation専用か
- payload schema / type / size / path / URL等が妥当か
- User-controlled文字列をShell commandへ連結していないか
- File access範囲が必要最小限か

Renderer側でButtonを隠すことをAuthorizationにしません。

### Navigation / Window / External URL

- Appが必要としないnavigationを無制限に許可しない。
- `window.open` / new-window creationを用途に応じてdeny / allowlistする。
- `shell.openExternal()`へuntrusted URLをそのまま渡さない。
- Custom protocol / deep linkではscheme / origin / path / argumentを検証する。
- Remote contentを表示する`webview`等を使う場合、`allowpopups`や設定値を無条件に許可しない。

### Browser Security Settings

- `webSecurity`を理由なく無効化しない。
- `allowRunningInsecureContent`を有効にしない。
- 不要なexperimental / Blink featuresを有効にしない。
- Remote resourceはHTTPS等のsecure protocolを使う。
- Rendererへ用途に合うrestrictive CSPを設定する。
- Remote contentを扱うSessionではpermission request handlerを明示し、Camera / Mic / Clipboard等を無条件許可しない。

### Protocol / Fuse / Version

CONDITIONAL:

- 継続配布AppはSecurity fixを含むcurrent supported Electronへ計画的に更新する。
- `file://`へprivileged app surfaceを無制限に依存させず、必要に応じてcustom protocolを検討する。
- Electron Fusesで不要CapabilityをBuild時に無効化できる場合は検討する。

これらを小規模Toolへ機械的に全部導入するのではなく、Threat Surfaceと配布範囲で判断します。

### Electron Security Verification

Securityに関係する変更では必要範囲で次を確認します。

- untrusted / unexpected senderからprivileged IPCが通らない
- invalid path / URL / oversized payloadを拒否する
- external navigation / new windowがallowlist外へ出ない
- permission requestがDefault Allowになっていない
- RendererからNode / Electron primitiveへ意図しない直接Accessがない
- CSP / sandbox / contextIsolation等のWindow設定がCurrent Runtimeで有効

Static設定確認だけでOS固有BehaviorをReal-device validatedとは扱いません。

## Windows固有機能

以下は静的Code確認だけで「確認済み」にしません。

- 音声Device切替
- Global Shortcut
- 最前面制御
- File関連付け
- Tray
- Auto Start
- Installer
- 外部exe起動
- OS固有Path / protocol

失敗時には可能な限りLogを残し、手動確認・Fallback方法を用意します。

## Setup.exe / Installer配布

Setup.exe化する場合は`electron-builder`等を検討します。

可能なら以下へ対応します。

- Desktop shortcut
- Start menu
- App icon
- Uninstall
- Version表示
- Update時のuser data維持

配布方法としてGitHub Releasesも検討します。

### SHOULD: Installer配布をRelease Contractとして設計する

継続配布するElectron AppではInstaller生成だけを完成としません。

最低限:

- Versionの正本
- Installer / Portable等の配布形式
- Update Provider / Release Channel
- Auto Update metadata / blockmap等の必要Artifact
- Updaterを搭載した最初のVersion
- それ以前のVersionからの移行方法
- `userData`等の永続Data保存場所
- Code Signingの有無
- Update失敗時のmanual download導線
- どのVersion間を実機Update確認したか

`Installer生成成功`、`CI成功`、`Release存在`の1つだけで配布成功扱いにしません。

## Update

### CONDITIONAL SHOULD: 継続配布するInstall型Electron AppはOne-click Updateを優先する

次が成立する場合、毎回Installerを手動で探させるより、起動時確認 → 通知 → 明示操作 → Download / Install / Restartの導線を優先します。

- 継続配布している
- 安定Release Channelがある
- metadataとInstallerを同Versionで管理できる
- Update後もuser dataを維持できる

単発Tool、Portable、極低頻度Update、安全なProviderを維持できない環境では必須にしません。

### Update UX

```text
App起動
↓
Background update check
↓
新Versionあり
↓
Version / 今すぐ更新 / あとで
↓
Download + 検証
↓
明示されたInstall / Restart
↓
新Version
```

Update確認で起動を長時間Blockしません。重要作業中に同意なしで突然Restartさせません。

必要に応じて:

- 起動時自動確認ON/OFF
- 手動Update check
- Download進捗
- `あとで`後も現Versionを利用可能

### Updater Bootstrap

Updaterを持たない旧Versionへ、後から遠隔でUpdater機能を追加することはできません。

途中導入時は最初のUpdater搭載VersionをBootstrap Versionとして扱い、旧Version利用者が1回だけ手動Installer更新を必要とする場合はREADME / Release Notes / App案内へ明記します。

継続運用では、サポート対象の**最古Auto-update Version → current stable**のUpdate Pathを意識します。

### electron-builder / GitHub Releases

GitHub ReleasesをProviderにする場合、InstallerだけでなくUpdaterが参照するmetadataも同Releaseへ揃えます。

例:

```text
v1.2.3
├─ app_1.2.3_setup.exe
├─ app_1.2.3_setup.exe.blockmap
└─ latest.yml
```

`package.json#version`、`app.getVersion()`、Release Tag、Installer名、Update metadataを不整合にしません。

MetadataとInstallerは可能な限り同じBuild / Release Pipelineから生成し、別Build Artifactを混ぜません。

Draft / Pre-release / Stable状態がChannel Behaviorへ影響する場合、対象利用者から見えるRelease状態を確認します。

### SHOULD: Build PipelineとRelease Pipelineを分ける

```text
Pull Request
→ Test / Windows build / Artifact integrity
→ Actions Artifact
→ Stable Releaseは作らない

main / approved tag
→ 同じValidation
→ Installer + Metadata
→ Release
→ 同じVersion ArtifactをUpload
```

Release成功条件には必要に応じて次を含めます。

- Installer / metadata / blockmap等が存在
- metadataがcurrent Installerを参照
- Artifactが空・異常Sizeでない
- Version正本 / Tag / metadata一致
- Upload後Release Assets一致

### Update Security

Auto UpdateはRemote executableを取得・実行するため通常Download Linkより慎重に扱います。

- Provider / Release URLを固定またはallowlist
- Renderer入力の任意URLをUpdaterへ渡さない
- MetadataのHash / Integrityを利用
- 対応可能ならCode Signing
- 未署名なら署名済みと誤認させず制約を明記
- MetadataとInstallerを同Pipelineから生成
- Pre-releaseをStableへ誤配布しない
- Updater / packaging tool変更時はexisting installed appから互換確認

Code Signing未導入を理由にIntegrity / Release整合確認まで省略しません。

### Update Failure / Broken Release

Update失敗時もApp本体を利用不能にしません。

- Error表示 / Log
- Retry
- manual download導線
- current version継続利用
- user data維持

一部利用者へ壊れたReleaseを配信した場合、同Version Artifact差し替えだけで完全解決と考えず、追跡可能な新Versionで修正版へ進ませることを優先します。

### Update導入・変更時の確認

- Installer生成
- metadata生成
- Release asset整合
- correct channel /公開状態
- old → new version検出
- Download
- Install / Restart
- new App Version
- userData / 設定維持
- failure fallback
- Bootstrap以前のmanual migration案内
- oldest supported auto-update version → current

Windows固有Install / RestartはCI成功だけでReal-device validated扱いにしません。

## 起動Script

`start.bat`等を使う場合、起動失敗時に一瞬で閉じて原因が分からない状態を避けます。

必要に応じてError表示、Dependency確認、Log、適切な終了Code等を用意します。`pause`はlocal developer convenienceとして使えますが、Product UXの代替にしません。

## GitHub Pagesとの分離

WebとElectronが同居する場合はPages公開ArtifactとDesktop用Fileを分けます。

Electron固有Code、秘密情報、PC固有Path、外部Tool本体をPublic Pagesへ混入させません。

## ZIP方針

GitHub上で直接管理・配布できるWeb Siteでは毎回ZIPを作成しません。

ZIPが適する例:

- Userが要求した
- GitHubを使わないhandoff
- Backup
- Electron / local-only Artifact
- GitHubだけでは配布できない成果物

ZIP名は短い英数字 + Version / Date等、識別可能な形式にします。

ZIPを作る場合:

- 必要Fileが入っている
- 巨大Cache /不要`node_modules`を理由なく含めない
- 起動方法が分かる
- 相対Pathが展開後も成立
- Secretを含まない
- Electronではdependency導入方法またはbuild済みArtifactが分かる
