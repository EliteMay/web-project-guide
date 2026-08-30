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

データ量が多い場合は用途別に分けます。

```text
data/
├─ manifest.json
├─ items/
├─ settings.json
└─ schema.json
```

Manifestで実行時に読むファイル一覧や期待件数を管理すると、JSへのhardcodeを減らせます。

小さなデータまで過剰に分割せず、読み込み速度・Git差分・破損時の影響・将来拡張のバランスを取ります。

## Schema Version

永続データには可能な限りVersionを持たせます。

```json
{
  "schemaVersion": 1,
  "items": []
}
```

継続編集・Backup・複数タブ競合を扱うTOOLでは、必要に応じてEnvelope形式を使います。

```json
{
  "schema": "project-storage",
  "schemaVersion": 1,
  "revision": 12,
  "updatedAt": "2026-08-30T09:00:00Z",
  "data": {}
}
```

- `schemaVersion`: Data構造の互換性判定
- `revision`: 同じDataの更新順・競合検出
- `updatedAt`: 診断・競合表示・Backup選択の補助
- `data`: 実データ

Theme設定等の小さい安定DataまでEnvelope化する必要はありません。Migration・Backup・競合確認の価値がある場合に使います。

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
- 高リスク変更ではRollback可能性を検討

旧形式が単純で安全にnormalizeできるなら、一定期間Backward Compatibilityを持たせることを検討します。旧Dataを読んだ瞬間に元Keyを削除する設計は避けます。

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

## 保存状態を設計する

編集を伴うサイトでは、必要に応じて以下を区別します。

- 保存済み
- 保存中
- 未保存変更あり
- 保存失敗

保存失敗を成功扱いしたり、エラーを黙って無視しません。

重要な編集では、画面移動・タブ閉じ・データ切替で未保存内容を失う可能性を考慮します。

## Storage失敗

CONDITIONAL: ユーザーデータが重要な場合、次を想定します。

- localStorage quota / write failure
- IndexedDB open / transaction failure
- Browser storage制限
- Import途中の失敗
- Migration途中の失敗

失敗時に元データを消してから再試行する設計は避けます。

## 複数タブ競合

CONDITIONAL: 同じデータを複数タブから編集でき、上書きが問題になる場合は競合を考慮します。

例:

```text
Tab A: revision 5を読込
Tab B: revision 5を読込 → revision 6として保存
Tab A: 古い状態をそのまま保存
```

必要に応じて以下を使います。

- updatedAt / revision比較
- BroadcastChannel
- storage event
- 保存前の競合警告

単純な閲覧サイトでは過剰実装しません。

## Backup / Restore

ユーザーデータを保存するサイトでは、重要度に応じて以下を用意します。

- JSON Export
- Import時Validation
- Snapshot
- Reset前Backup
- Restore
- Data Diagnostics

Importデータは信頼せずSchema検証します。

### 新規開始 / Reset

同じ対象へ新規作業を始めるとき、既存データがユーザー作業の成果なら、単純な`remove()`より次を優先します。

```text
現在Data
↓
Backup / Snapshot
↓
新規Dataを開始
```

Backupが存在する場合は、復元導線や保存日時を必要に応じて表示します。

### 破壊的Import / Restoreの順序

CONDITIONAL: Importが既存のlocalStorage / IndexedDB / Cloud stateを**置き換える**場合、単に`schema`文字列を確認するだけでは不十分です。

原則として次の順序を使います。

```text
1. Fileをparse
2. Top-level Schema / Version確認
3. 全Store / RecordをValidation
4. 現在データをBackup / Recovery Snapshot
5. Import用データをnormalize
6. 置換を実行
7. 読み戻してValidation
8. 成功なら完了
9. 途中失敗ならBackupからRollback
```

重要なのは、**既存StoreをclearしてからImportデータの不正に気付かないこと**です。

複数Storeを扱う場合、ブラウザStorage全体を1 Transactionにできないことがあります。その場合はアプリ側でRollback用Snapshotを持ちます。

最低限Validationする例:

- Schema / Version
- 必須Top-level key
- Array / Object等の型
- Record ID
- 参照先ID
- Store名
- 数値範囲
- 想定外の巨大Data URL / Blob相当
- 現在Versionで扱えない将来Schema

Import失敗時は「一部だけ新データ、一部だけ旧データ」の状態を残さないことを優先します。

### Import Regression Test

重要データを置き換えるImportでは、少なくとも次をTest候補にします。

- 正常Backup → Restore → 再読込
- 不正JSONを渡しても現在データが変わらない
- Schema違いで現在データが変わらない
- IndexedDB書き込み途中を失敗させてもRollbackできる
- Restore後に主要画面が読める

## AI-HANDOFFとの境界

AIへ渡すPackageやAI返却JSONは「保存済みだから信頼できるData」とは扱いません。

Package / Return DataのVersion・Manifest・Archive制限・Import Validationは [14 AI Handoff / Package Contract](14-ai-handoff.md) を参照します。

## 関連Catalog

- Failure: [F-002 / F-003 / F-018](../catalog/failures.md)
- Success: [S-004 / S-005 / S-006 / S-007 / S-022 / S-024](../catalog/success-patterns.md)
- Anti-pattern: [AP-005 / AP-006 / AP-025 / AP-026](../catalog/anti-patterns.md)
