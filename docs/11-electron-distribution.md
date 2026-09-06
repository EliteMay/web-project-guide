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
