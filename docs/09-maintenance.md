# 09 Version / Maintenance

## Versionを一元化する

表示Version・Build・Schemaを必要に応じて分離します。

例:

```js
export const VERSION = {
  app: "0.1.0",
  build: "20260830-1",
  schema: 1
};
```

サイト内の各ページへVersionを手入力しません。

Version / Build / Schemaを複数箇所へ置く必要がある場合も、**正本を1か所に決め、他は正本から参照・生成・検証**します。

特に次の値は古いhardcodeが残りやすいため注意します。

- 画面に表示するVersion
- Session / Exportへ記録するApp Version
- Cache Busting用文字列
- `package.json` Version
- Schema Version
- Build ID

Static Validatorで一致を確認できる場合は自動化を優先します。

## Runtime名はVersionと分離する

Versionを持つことと、**RuntimeのPathへVersionを埋め込むことは別**です。

継続運用する正式Runtimeは、特別な理由がなければ安定したPathを優先します。

```text
推奨:
js/app/app.js
css/app.css

避けたい恒久構造:
js/v060/app.js
js/v061/app.js
css/app-v060.css
```

`js/v060/`の中身が整理されていても、次回修正時に`v061/`をコピーして増やす運用へ戻ると、Versioned Patchと同じ問題を再発しやすくなります。

Versionは`meta.js` / `version.js` / manifest等の**Metadata**で表し、実行Pathはできるだけ安定させます。

例外:

- Migration検証用に旧Runtimeを明示的に隔離する
- 複数Major Versionを同時配信する明確な要件がある
- Release Artifact自体をVersion付きDirectoryへ固定する必要がある

例外時も、どれが現在の正式Runtimeかを明記します。

## Cache Busting

`?v=123`や`?b=20260830-1`を使う場合、HTMLへ別のVersion文字列を手入力し続けません。

- Build stepから生成する
- manifestから参照する
- 必要な時だけ使う
- Service WorkerやHTTP Cacheの更新戦略と整合させる

単純なGitHub Pagesサイトでは、手動Cache Bustingを増やすより安定Path + 通常の再読み込みで十分かを先に確認します。

## SemVer

目安:

- PATCH: バグ修正・小改善
- MINOR: 後方互換な機能追加
- MAJOR: 互換性を壊す大変更

個人用では厳密なSemVerに縛られすぎず、変更規模を判断しやすくするために使います。

## 変更前に確認

既存プロジェクトを変更する場合:

1. README
2. 仕様書
3. 作業報告書 / CHANGELOG
4. File Structure
5. Existing Runtime
6. Data Schema
7. Storage Keys
8. GitHub Actions / Tests

を確認します。

## 大きな変更

大きな変更では最初に以下を明示します。

- なぜ必要か
- 影響する機能
- 影響するファイル
- 保存互換性
- メリット
- デメリット
- Rollbackできるか

## 旧実装

新Runtimeへ切り替えたら、旧Runtimeを本番フォルダへ大量に残さないことを優先します。

Git履歴へ残るため、現在実行されない旧版は必要に応じて削除します。

ただしMigrationやLegacy Compatibilityで必要なものは、役割を明示して隔離します。

```text
legacy/
migrations/
```

## Patchを重ねない

緊急修正を別JSで追加する場合でも、それを恒久構造にしません。

一定段階で正式実装へ統合します。

統合後は「旧Patchを読み込んでいない」だけでなく、**旧Patchを増やしやすいVersion付きRuntime構造そのものが残っていないか**も確認します。

## Documentation

READMEには「現在仕様」を書き、過去履歴を延々追加しません。

長い変更履歴はCHANGELOG / 作業報告へ分離します。

## 未確認

実機・外部通信・長期利用など確認できなかった項目は必ず明記します。

「コード上は問題なさそう」と「確認済み」を区別します。

## 関連Catalog

- Failure: [F-001 / F-004 / F-017](../catalog/failures.md)
- Success: [S-001 / S-021](../catalog/success-patterns.md)
- Anti-pattern: [AP-001 / AP-004 / AP-024](../catalog/anti-patterns.md)
