# 03 データ・保存設計

## 保存先の基本判断

| データ | 第一候補 |
|---|---|
| 小さい設定・ID・軽い履歴 | localStorage |
| 画像・音声・動画・手書き・大量履歴 | IndexedDB |
| 公開共通データ | GitHub上のJSON |
| 一時セッション | sessionStorage / memory |
| 複数端末同期 | Supabase等を必要時のみ |
| Electronユーザー設定 | Electron `userData` |

## localStorage

localStorageは便利ですが、容量が小さく同期APIです。

原則として以下を直接入れません。

- Data URL画像
- Base64動画
- 大量の手書きStroke
- 巨大な診断データ
- 大量のバイナリ相当データ

localStorageには軽い参照や設定だけを持たせます。

## IndexedDB

以下ではIndexedDBを優先的に検討します。

- Blob
- 画像
- 音声
- 動画
- Canvas/ペン履歴
- Snapshot
- 大量履歴

削除時は参照されなくなったBlob等の孤児データも掃除します。

## JSON

データは可能な限りHTMLやJavaScriptへ大量に直接記述せず、JSON等へ分離します。

例:

```text
data/
├─ manifest.json
├─ agents.json
├─ maps.json
├─ lineups.json
├─ settings.json
├─ questions.json
└─ schema.json
```

データ量が多い場合は用途ごとに分割します。
ただし、小さなデータまで過剰に細分化しません。

分割時は以下を考慮します。

- 読み込み速度
- 管理しやすさ
- Git差分の見やすさ
- 一部破損時の影響範囲
- 将来の拡張
- 更新単位

Manifestで実行時に読むファイル一覧や期待件数を管理すると、JSへのhardcodeを減らせます。

## Schema Version

永続データには可能な限りVersionを持たせます。

```json
{
  "schemaVersion": 1,
  "items": []
}
```

読み込みは以下の順にします。

```text
parse
↓
version確認
↓
migrate
↓
normalize
↓
validate
↓
利用
```

## Migration

保存KeyやSchemaを変更するときは、旧データを勝手に捨てません。

- 旧Keyから読める
- 移行失敗時に元データを残す
- 破損JSONは上書き前にRecoveryコピーを作る
- 大きな変更はSchema / README / 作業報告を同時更新

保存形式変更はデータ互換性へ直結するため、既存プロジェクトでは原則として確認が必要な変更として扱います。

## Snapshot

「現在のJSONを更新すると過去記録の意味が変わる」データはSnapshotを検討します。

例:
- 問題を解いた当時の問題文
- AI分析時点の入力
- レビュー対象時点の設定

## 座標保存

UI上の座標は画面絶対座標より、対象要素内の相対座標を優先します。

```text
x: 0.00〜1.00
y: 0.00〜1.00
```

画面サイズや上部要素の高さ変更でずれにくくなります。

## Backup / Restore

ユーザーデータを保存するサイトでは、重要度に応じて以下を用意します。

- JSON Export
- Import時Validation
- Snapshot
- Reset前Backup
- Restore
- Data Diagnostics

Importデータは信頼せずSchema検証します。

## 外部サービス導入

GitHub Pagesだけで十分な場合は、不要な外部サービスを追加しません。

以下が必要な場合に限って検討します。

- ログイン
- DB
- サーバー処理
- APIキー秘匿
- 大容量ファイル
- リアルタイム同期
- 複数人共有
- メール
- AI API
- 高度な画像・動画処理

導入前に以下を確認します。

- 無料枠
- 維持費
- GitHub / GitHub Pagesとの相性
- サービス停止リスク
- 移行しやすさ
- Vendor Lock-in
- 本当に必要か
- 外部サービスが落ちた時のFallback

有料サービス導入や外部サービスへの大きな移行は、勝手に確定しません。
