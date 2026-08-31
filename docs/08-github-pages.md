# 08 GitHub Pages

## 基本方針

HTML / CSS / JavaScriptだけで完結できるサイトは、可能な限りGitHub Pagesでそのまま利用できる構成を優先します。

GitHub Pagesで十分な場合、利用のためだけにローカル環境を要求しません。

できるだけ以下への依存を避けます。

- `start.bat`
- ローカルサーバー
- Node.jsの常時実行
- `localhost`
- PC固有の絶対Path

GitHub Pagesでは実現できない機能が本当に必要な場合だけ、Electron・Backend・外部Service等の別方式を検討します。

## 相対パス

GitHub Pagesは通常リポジトリ名を含むサブパスで公開されます。

```text
https://<user>.github.io/<repo>/
```

そのため、root固定の`/assets/...`より、プロジェクト構成に合った相対Pathを優先します。

## 確認項目

- HTMLからCSS/JSが読める
- JSからJSONが読める
- ページ間リンクがサブパスで壊れない
- `fetch()`先がPages上でも正しい
- ファイル名の大文字小文字が一致する
- Service Worker scopeが意図した範囲になる
- Asset URLを固定ドメインへhardcodeしすぎない
- `localhost`前提コードが残っていない
- PC固有絶対Pathが残っていない
- GitHub Pages公開対象に不要なDesktop/Electronファイルを含めない

## 404 / Recovery

複数Page、外部からのDirect Link、URL共有がある公開Siteでは、必要に応じて`404.html`を用意します。

404画面は装飾だけで終わらせず、少なくとも次のいずれかへ戻れるようにします。

- Home
- Search
- Main navigation
- 主要一覧

単一Pageの極小Siteへ機械的に追加する必要はありません。

## file://との違い

`fetch()`やES Modules等を使う場合、`file://`直開きでは正常動作しないことがあります。

正式利用方法がGitHub Pagesなら、READMEに公開URLまたは利用方法を明記します。

## Secrets

GitHub Pagesへ公開されるHTML/JS/JSONに秘密情報を置きません。

フロントエンドに書いたAPI Keyはユーザーから見えます。

以下を公開ファイルへ入れません。

- APIキー
- パスワード
- アクセストークン
- 秘密鍵
- 認証情報
- 不要な個人情報

必要な場合はGitHub Secrets、環境変数、Backend、ローカル設定等を検討します。

## Cache

更新したのに古いJS/CSSが表示される問題を想定します。

- Version / Buildの一元管理
- 必要時のみCache Busting
- Service Worker更新戦略

を設計します。

クエリ文字列Versionを使う場合、HTML側とVersion情報を不整合にしないようにします。

## Pages専用Workflow

WebとElectronが同居するRepoでは、Pages ArtifactをWebファイルだけに限定する方式を推奨します。

例:

```text
index.html
pages/
css/
js/
data/
assets/
```

## 公開確認

CI成功だけで完成扱いにせず、可能なら公開URLで主要導線を確認します。

確認できない場合は「GitHub Pages実公開は未確認」と明記します。