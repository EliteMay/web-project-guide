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

可能であればアプリ内のVersion表示と更新確認を用意します。

Auto Updateを導入する場合は、更新失敗時・古いVersion利用時・ユーザーデータ互換性も考慮します。

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
