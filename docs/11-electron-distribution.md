# 11 Electron / 配布 / ZIP

## Electron指定時

Electron指定のプロジェクトを勝手にWeb版へ変更しません。

Web版へ変更した方がよい理由がある場合も、先に影響・メリット・デメリットを整理します。

## 基本構成

必要に応じて以下を用意します。

- `package.json`
- `main.js`
- `preload.js`
- renderer側HTML / CSS / JS
- `start.bat`
- 必要なら `install.bat`
- 必要なら `setup.bat`
- Version管理
- App Icon
- 設定保存
- Log
- ユーザーデータ保存場所

## ユーザーデータ

更新時にユーザーデータが消えない構成を優先します。

保存先は原則としてElectronの`userData`等、アプリ更新で上書きされにくい場所を使います。

以下をアプリ本体フォルダへ直接固定保存しすぎないようにします。

- ユーザー設定
- 履歴
- キャッシュ以外の重要データ
- 個人データ

保存形式変更時はMigration / Backup / Rollback可能性を確認します。

## preload / IPC

RendererへNode.js権限を無制限に渡さず、必要な機能だけpreload / IPC経由で公開する構成を優先します。

OSコマンドやファイル操作など危険性の高い処理は、入力値を検証し、Rendererから任意コマンドを直接実行できる構成を避けます。

## Windows固有機能

以下は静的コード確認だけで「確認済み」にしません。

- 音声デバイス切替
- Global Shortcut
- 最前面制御
- ファイル関連付け
- Tray
- Auto Start
- Setup.exe
- 外部exe起動
- OS固有Path

失敗時には可能な限りログを残し、手動確認・Fallback方法を用意します。

## Setup.exe / Installer配布

Setup.exe化する場合は`electron-builder`等を検討します。

可能なら以下へ対応します。

- デスクトップショートカット
- スタートメニュー
- アプリアイコン
- アンインストール
- バージョン表示
- 更新時のユーザーデータ維持

配布方法としてGitHub Releasesも検討します。

### SHOULD: Installer配布を「Setup.exe 1個」ではなくRelease Contractとして設計する

継続配布するElectronアプリでは、Installer生成だけを配布設計の完成としません。最低限、次を1つのRelease Contractとして整理します。

- Versionの正本
- Installer / Portable等の配布形式
- Update Provider / Release Channel
- Auto Update用Metadata / Blockmap等の必要Artifact
- Updaterを搭載した最初のVersion
- それ以前のVersionからの移行方法
- `userData`等の永続データ保存場所
- Code Signingの有無
- 更新失敗時の手動Download導線
- どのVersionからどのVersionへの実機更新を確認したか

`Setup.exeが生成できた`、`CIが通った`、`GitHub Releaseが存在する`のどれか1つだけで配布成功扱いにしません。

## 更新

アプリ内のVersion表示と更新確認を用意します。

### CONDITIONAL SHOULD: 継続配布するインストール型ElectronアプリはOne-click Updateを優先する

次の条件に当てはまる場合、毎回Setup.exeを手動で探して再実行させるより、**アプリ起動時の更新確認 → 更新通知 → 1回の明示操作でDownload / Install / Restart**できる導線を原則として優先します。

- ElectronアプリをSetup.exe等で継続配布している
- GitHub Releases等の安定したRelease Channelがある
- 更新MetadataとInstallerを同じVersion単位で管理できる
- 更新後も`userData`等のユーザーデータを維持できる

一方、単発Tool、Portable配布、更新頻度が極端に低いアプリ、Update Providerを安全に維持できない環境では必須にしません。

### One-click Updateの基本UX

推奨フロー:

```text
App起動
↓
Backgroundで更新確認
↓
新Versionあり
↓
「vX.Y.Zがあります / 今すぐ更新 / あとで」
↓
今すぐ更新
↓
Download + 検証
↓
Appを終了してInstall
↓
新Versionで再起動
```

更新確認のために起動を長時間Blockしません。

利用者が重要な作業中の場合に、同意なしで突然再起動させないようにします。更新を開始する操作自体をInstall / Restartへの明示的な同意として扱えるUIにします。

必要に応じて次も用意します。

- 起動時自動確認のON / OFF
- 手動の「更新を確認」
- Download進捗
- 「あとで」選択後も現在Versionを通常利用できる状態

### Updater Bootstrap / 旧Versionからの移行

Auto Updateは、**Updaterを持っていない既存Versionへ後から遠隔で生やすことはできません。**

途中VersionからUpdaterを導入する場合は、Updater搭載の最初のVersionをBootstrap Versionとして扱います。

例:

```text
v1.4.0以前: Updaterなし
↓
ユーザーがv1.5.0 Setup.exeを1回手動Install
↓
v1.5.0: Updaterあり
↓
v1.5.1以降: App内One-click Update
```

この場合は次をREADME / Release Notes / App内案内等の適切な場所へ明記します。

- Auto Update対応開始Version
- それ以前のVersionは1回だけ手動Installer更新が必要であること
- Bootstrap後はどのChannelから更新されるか
- 古いVersionを「自動更新対応済み」と誤表示しないこと

継続運用では「最新版へ更新できるか」だけでなく、**サポート対象の最古Auto-update Version → 最新Version**のUpdate Pathを意識します。

### electron-builder / GitHub Releasesを使う場合

WindowsのNSIS配布では、条件に合えば`electron-updater`等の標準的なUpdate機構を優先できます。

GitHub ReleasesをUpdate Providerにする場合は、InstallerだけでなくAuto Updateが参照するMetadataもReleaseへ揃えます。

例:

```text
v1.2.3 Release
├─ app_1.2.3_setup.exe
├─ app_1.2.3_setup.exe.blockmap
└─ latest.yml
```

`package.json#version`、`app.getVersion()`、Release Tag、Installer名、Update Metadataが別Versionを指さないようにします。

CIでReleaseを作る場合は、**Setup.exe生成成功だけでなくUpdate Metadata生成・Uploadまで確認**します。

MetadataとInstallerは可能な限り同じBuild / Release Pipelineから生成し、別BuildのArtifactを混ぜません。Checksum mismatch等が起きたときに、MetadataとInstallerの組み合わせを追跡できる状態にします。

GitHub ProviderではDraft / Pre-release / Stable等のRelease状態がUpdate Channelの挙動へ影響するため、対象利用者から見えるReleaseになっているかを確認します。

### SHOULD: Build PipelineとRelease Pipelineを分ける

継続配布では、Pull Requestの検証Buildと実際の公開Releaseを分ける構成を推奨します。

例:

```text
Pull Request
↓
Syntax / Unit / Regression
↓
Windows Installer Build
↓
Installer + Update Metadata整合確認
↓
Actions Artifact保存
↓
Releaseは作らない

main / approved tag
↓
同じ検証
↓
Installer + Metadata生成
↓
Release作成
↓
同じVersionのArtifactをUpload
```

これにより、未MergeのPRや実験BuildがStable利用者のUpdate Channelへ誤配信されるリスクを下げます。

Release成功条件には、必要に応じて次を含めます。

- Installerが存在する
- Update Metadataが存在する
- Blockmap等の必要Artifactが存在する
- Metadataが現在VersionのInstallerを参照している
- Artifactが空・明らかに異常なサイズではない
- Version正本 / Release Tag / Metadataが一致する
- Upload後のRelease Assetsが揃っている

### 更新の安全性

Auto UpdateはRemoteから実行ファイルを取得して実行するため、通常のDownload Linkより慎重に扱います。

- Update Provider / Release URLを固定または許可List化する
- Redirect先や任意URLをRenderer入力からそのまま実行しない
- Update Metadataが持つHash / Integrity情報を利用する
- 対応可能ならCode Signingを利用する
- 公開配布では特にCode Signingを強く推奨する
- 未署名Installerを使う場合は、署名済みと誤認させず制約をREADME / Releaseへ明記する
- Update MetadataとInstallerを同じRelease Pipelineから生成する
- Pre-releaseをStable利用者へ誤配布しない
- Updater / electron-builderの互換範囲を変更した場合は、既存Installed Appからの更新互換を確認する

WindowsでCode Signingを使う場合は、Installerの見た目だけでなくUpdate時の署名検証にも関係するため、証明書更新・Publisher変更時の互換性も確認します。

Code Signingを導入していないことを理由に、Hash検証やRelease整合確認まで省略しません。

### 更新失敗時

Auto Updateが失敗してもアプリ本体を利用不能にしません。

最低限、次を用意します。

- Update Errorを表示またはLogへ記録
- 再試行
- GitHub Releases等の手動Download導線
- 現在Versionの継続利用
- 更新失敗で`userData`を削除しない

更新途中の失敗を「最新版です」と表示しません。

### Broken Release / Rollback

すでに一部利用者へ配信された壊れたReleaseを、同じVersionのArtifact差し替えだけで完全に解決できると考えません。

Auto Update利用者が壊れたVersionへ到達している可能性がある場合は、通常は**より大きい新Versionを発行して修正版へ進ませる**方が追跡しやすく安全です。

必要に応じてRelease Notesへ既知問題と修正版Versionを記載し、利用者が現在どのVersionにいるか判断できるようにします。

### Update導入・変更時の確認

Auto Updateの実装追加またはUpdate方式変更時は、Static Buildだけでなく可能な範囲で次を確認します。

- Installer生成
- Update Metadata生成
- ReleaseへInstaller / Metadataが揃っている
- Update対象Releaseが正しいChannel / 公開状態になっている
- 旧Versionから新Versionを検出できる
- Download完了
- Install / Restart
- 更新後のApp Version
- `userData` / 設定維持
- Update失敗時のFallback
- Updater Bootstrap Versionより古いVersionの手動移行案内
- サポート対象の最古Auto-update Versionから最新Versionへの更新

Windows固有のInstall / Restartは、CI成功だけで実機確認済み扱いにしません。

InstallerのInstall Mode、UAC、既存Version、Windows環境によって挙動が変わる可能性があるため、**実際にInstall済みの旧Versionから更新するTest**を優先します。

## start.bat

`start.bat`は起動失敗時に一瞬で閉じて原因が分からなくならないようにします。

必要に応じて:

- エラーメッセージ表示
- `pause`
- Node / npmの存在確認
- 依存パッケージ不足の案内
- Log出力

を入れます。

文字コードにも注意します。

## GitHub Pagesとの分離

Electron固有機能はGitHub Pagesでは動作しません。

WebとElectronが同居する場合は、Pagesへ公開するファイルとDesktop用ファイルを分けます。

秘密情報、PC固有Path、外部Tool本体などを公開Pagesへ混入させません。

## ZIP方針

GitHub上で管理できるWebサイトでは毎回ZIPを作成しません。

ZIPが必要なのは主に以下です。

- ユーザーが要求した
- GitHubを使わない
- バックアップ目的
- Electron
- ローカル専用アプリ
- GitHubだけでは配布できない成果物

ZIP名は短い英数字 + Versionまたは日付にします。

例:

```text
app_v01.zip
review_0705.zip
lineup_v03.zip
```

## ZIP確認

ZIPを作る場合は最低限以下を確認します。

- 必要ファイルがすべて入っている
- 不要な巨大キャッシュを含まない
- `node_modules`を含める必要が本当にあるか確認
- 起動方法がREADMEにある
- 相対PathがZIP展開後も成立する
- 秘密情報が含まれていない
- Electronの場合は依存導入方法またはビルド済み成果物が分かる
