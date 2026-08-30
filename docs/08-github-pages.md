# 08 GitHub Pages

## 基本方針

HTML / CSS / JavaScriptだけで完結できるサイトは、可能ならGitHub Pagesでそのまま利用できる構成を優先します。

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
- Service Worker scopeが意図した範囲になる
- Asset URLを固定ドメインへhardcodeしすぎない
- GitHub Pages公開対象に不要なDesktop/Electronファイルを含めない

## file://との違い

`fetch()`やES Modules等を使う場合、`file://`直開きでは正常動作しないことがあります。

正式利用方法がGitHub Pagesなら、READMEに明記します。

## Secrets

GitHub Pagesへ公開されるHTML/JS/JSONに秘密情報を置きません。

フロントエンドに書いたAPI Keyはユーザーから見えます。

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
