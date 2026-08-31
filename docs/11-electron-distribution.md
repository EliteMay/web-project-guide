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

## Setup.exe

Setup.exe化する場合は`electron-builder`等を検討します。

可能なら以下へ対応します。

- デスクトップショートカット
- スタートメニュー
- アプリアイコン
- アンインストール
- バージョン表示
- 更新時のユーザーデータ維持

配布方法としてGitHub Releasesも検討します。

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

`package.json#version`、Release Tag、Installer、Update Metadataが別Versionを指さないようにします。

CIでReleaseを作る場合は、**Setup.exe生成成功だけでなくUpdate Metadata生成・Uploadまで確認**します。

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

### Update導入・変更時の確認

Auto Updateの実装追加またはUpdate方式変更時は、Static Buildだけでなく可能な範囲で次を確認します。

- Installer生成
- Update Metadata生成
- ReleaseへInstaller / Metadataが揃っている
- 旧Versionから新Versionを検出できる
- Download完了
- Install / Restart
- 更新後のApp Version
- `userData` / 設定維持
- Update失敗時のFallback

Windows固有のInstall / Restartは、CI成功だけで実機確認済み扱いにしません。

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
