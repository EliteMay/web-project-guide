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

## Documentation

READMEには「現在仕様」を書き、過去履歴を延々追加しません。

長い変更履歴はCHANGELOG / 作業報告へ分離します。

## 未確認

実機・外部通信・長期利用など確認できなかった項目は必ず明記します。

「コード上は問題なさそう」と「確認済み」を区別します。
