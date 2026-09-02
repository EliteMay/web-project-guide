# 03 データ・保存設計

この章は**保存先・Schema・Migration・Import / Restore**の正本です。

Runtime Diagnostics / Remote Diagnostic Handoff全体は [15 Development Observability / Project Memory](15-development-observability.md)、Remote書込Securityは [06 Security](06-security.md) を正本とします。

## 保存先の基本判断

| データ | 第一候補 |
|---|---|
| 小さい設定・ID・軽い履歴 | localStorage |
| 画像・音声・動画・手書き・大量履歴 | IndexedDB |
| 公開共通データ | GitHub上のJSON |
| 一時セッション | sessionStorage / memory |
| 複数端末同期 | Supabase等を必要時のみ |
| AIへ渡す短期Runtime Diagnostics | Local-first + 必要時のみShared Remote Store |
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
- Canvas / ペン履歴
- Snapshot
- 大量履歴
- Local detailed diagnostics

削除時は参照されなくなったBlob等の孤児データも掃除します。

## Remote Diagnostic Snapshot

CONDITIONAL: AIへRuntime診断を繰り返し渡すProjectでは、詳細LogをLocalへ残し、**Sanitize済みCompact Snapshotだけを別のRemote Storeへ置く**構成を選べます。

Storage設計として守る境界:

- Core data syncとRemote Diagnosticsを分離する
- Remote failureでLocal diagnostics / Core保存を失わない
- Binary / Storage全DumpをRemote DiagnosticsのDefaultにしない
- Remote側にもSize / Retention上限を持つ

具体的なPayload / Trigger / Retention / Free-only / AI読取順は [15 Development Observability / Project Memory](15-development-observability.md)、Key / RLS / Grant等は [06 Security](06-security.md) を確認します。

## JSON

データ量が多い場合は用途別に分けます。

```text
data/
├─ manifest.json
├─ items/
├─ settings.json
└─ schema.json
```

Manifestで実行時に読むFile一覧や期待件数を管理すると、JSへのhardcodeを減らせます。

小さなDataまで過剰に分割せず、読み込み速度・Git差分・破損時の影響・将来拡張のBalanceを取ります。

## Schema Version

永続Dataには可能な限りVersionを持たせます。

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

保存KeyやSchemaを変更するときは、旧Dataを勝手に捨てません。

- 旧Keyから読める
- 移行失敗時に元Dataを残す
- 破損JSONは上書き前にRecovery copyを作る
- 大きな変更はSchema / README / Work Reportを同時更新
- 高Risk変更ではRollback可能性を検討

## Snapshot

「現在のJSONを更新すると過去記録の意味が変わる」DataはSnapshotを検討します。

例:

- 問題を解いた当時の問題文
- AI分析時点の入力
- Review対象時点の設定

## 座標保存

UI上の座標は画面絶対座標より、対象要素内の相対座標を優先します。

```text
x: 0.00〜1.00
y: 0.00〜1.00
```

画面Sizeや上部要素の高さ変更でずれにくくなります。

## 保存状態を設計する

編集を伴うSiteでは必要に応じて次を区別します。

- 保存済み
- 保存中
- 未保存変更あり
- 保存失敗

保存失敗を成功扱いしたり、Errorを黙って無視しません。

重要な編集では、画面移動・Tab閉じ・Data切替で未保存内容を失う可能性を考慮します。

## Storage失敗

CONDITIONAL: User dataが重要な場合、次を想定します。

- localStorage quota / write failure
- IndexedDB open / transaction failure
- Browser storage制限
- Import途中の失敗
- Migration途中の失敗
- Remote Diagnostic Store unavailable（採用時）

失敗時に元Dataを消してから再試行する設計は避けます。

Remote Diagnostics保存失敗はCore機能の保存失敗と分離します。

## 複数Tab競合

CONDITIONAL: 同じDataを複数Tabから編集でき、上書きが問題になる場合は競合を考慮します。

例:

```text
Tab A: revision 5を読込
Tab B: revision 5を読込 → revision 6として保存
Tab A: 古い状態をそのまま保存
```

必要に応じて次を使います。

- updatedAt / revision比較
- BroadcastChannel
- storage event
- 保存前の競合警告

単純な閲覧Siteでは過剰実装しません。

## Backup / Restore

User dataを保存するSiteでは、重要度に応じて次を用意します。

- JSON Export
- Import時Validation
- Snapshot
- Reset前Backup
- Restore
- Data Diagnostics

Import dataは信頼せずSchema検証します。

### 破壊的Import / Restoreの順序

CONDITIONAL: Importが既存localStorage / IndexedDB / Cloud stateを**置き換える**場合、単にTop-level schemaを確認するだけでは不十分です。

原則として次の順序を使います。

```text
1. Fileをparse
2. Top-level Schema / Version確認
3. 全Store / RecordをValidation
4. 現在DataをBackup / Recovery Snapshot
5. Import dataをnormalize
6. 置換を実行
7. 読み戻してValidation
8. 成功なら完了
9. 途中失敗ならBackupからRollback
```

重要なのは、**既存StoreをclearしてからImport dataの不正に気付かないこと**です。

複数Storeを扱う場合、Browser Storage全体を1 Transactionにできないことがあります。その場合はApp側でRollback用Snapshotを持ちます。

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

Import失敗時は「一部だけ新Data、一部だけ旧Data」の状態を残さないことを優先します。

### Import Regression Test

重要Dataを置き換えるImportでは、少なくとも次をTest候補にします。

- 正常Backup → Restore → 再読込
- 不正JSONを渡しても現在Dataが変わらない
- Schema違いで現在Dataが変わらない
- IndexedDB書込途中を失敗させてもRollbackできる
- Restore後に主要画面が読める

Testing全体は [07 Testing / Quality](07-testing-quality.md) を確認します。

## 関連Catalog

- Failure: [F-002 / F-003 / F-018](../catalog/failures.md)
- Success: [S-004 / S-005 / S-006 / S-007 / S-022](../catalog/success-patterns.md)
- Anti-pattern: [AP-005 / AP-006 / AP-025](../catalog/anti-patterns.md)
