# 14 AI Handoff / Package Contract

ChatGPT等へZIP / JSON / 画像を渡し、分析結果を戻す `AI-HANDOFF` Profile向けの正本です。

AI自体の性能より、**何を渡したか・どの形式で返すか・壊れた/古いデータをどう扱うか**を安定させることを目的にします。

## 基本方針

AI-HANDOFFでは次を分離します。

```text
元データ
↓
ユーザー確認済み入力
↓
Handoff Package
↓
AI分析
↓
Return Data
↓
Validation
↓
ユーザー確認
↓
正式データへ反映
```

AI返却値を直接Source of Truthへ上書きしません。

## MUST: 固定Contractを持つ

Package / Return Dataには、少なくとも次を持たせます。

- Schema名
- Schema Version
- Package / Format Version
- 作成日時
- 元データを識別するIDまたはSnapshot情報
- 必須ファイル一覧またはManifest
- AIへ渡す入力
- 人間の補足・修正情報
- 返却形式の定義

例:

```json
{
  "schema": "example-review-package",
  "schemaVersion": 1,
  "packageVersion": 2,
  "createdAt": "2026-08-30T09:00:00Z",
  "source": {
    "id": "clip-001"
  }
}
```

Version番号の意味を混ぜません。

- App Version
- Input / Output Schema Version
- Package Format Version
- Detector / Model / Algorithm Version

は必要に応じて別項目にします。

## Manifest

複数ファイルを渡す場合はManifestを入口にすることを優先します。

```text
review-package.zip
├─ manifest.json
├─ input.json
├─ notes.txt
├─ return.schema.json
└─ images/
```

Manifestには必要に応じて以下を含めます。

- Package Schema / Version
- Input file一覧
- 件数
- ID
- 元データ情報
- 生成したApp / Algorithm Version
- 重要な設定Snapshot
- optional / requiredの区別

AIやImporterがファイル名の推測だけで意味を判断する構造は避けます。

## Human Correction

自動検出やAI判定を挟む場合は、AIへ渡す前または正式反映前に人間が修正できるようにします。

必要に応じて以下を持たせます。

- `confidence`
- `needs_review`
- `source`: auto / edited / manual
- 修正前データ
- 修正後データ
- ユーザーメモ

AI結果は「未検証の提案」として扱い、確定値とUI上で区別します。

## Return Data

AIへ自由文だけを返させるより、サイトへ再Importする場合は固定JSON Schemaを優先します。

例:

```json
{
  "schema": "example-review-result",
  "schemaVersion": 1,
  "sourceId": "clip-001",
  "items": []
}
```

### MUST

- Import前にJSON parse
- Schema名確認
- Version確認
- 必須値確認
- ID対応確認
- 数値範囲確認
- Enum確認
- 不明Versionを無言で解釈しない

判断不能な値を無理に埋めるより、仕様で許可する場合は `null` / `unknown` / `not_applicable` を使います。

## ZIP / Archive Import

Archiveは「自分のサイトが出力したZIPだから安全」と仮定しません。

### MUST / CONDITIONAL

Import機能がArchiveを受け取る場合、用途に応じて次を確認します。

- 最大Archiveサイズ
- 最大Entry数
- 各JSON / Textの最大サイズ
- 対応Compression Method
- 必須ファイル
- ファイル名 / Path
- `../` や絶対Path等のPath traversal相当
- 重複Entry名
- Schema / Version
- JSON構文
- 必須値・件数・数値範囲

Browser内で展開する場合でも、巨大Archiveや不要な画像をすべてMemoryへ保持しないようにします。

集計にJSONだけ必要なら、JPEG / Video等まで読み込まない構造を優先します。

### SHOULD

- Importに不要なEntryを無視すべきかRejectすべきか決める
- 未対応Versionには対応Versionを含むErrorを表示
- Import途中失敗で既存データを消さない
- 破損Packageを正式データへ部分反映しない

既存データを置き換えるImportの順序は [03 Data / Storage](03-data-storage.md) の `validate → backup → replace → verify → rollback` を使います。

## 入力をDOMへ表示する場合

Package / AI返却値 / Notesは外部入力として扱います。

- 通常文字列は`textContent`
- `innerHTML`へ直接入れない
- URL等は用途ごとのValidationを行う

Securityの詳細は [06 Security](06-security.md) を参照します。

## Privacy / 元Media

MEDIA + AI-HANDOFFでは、元動画・音声・画像をPackageへ含めるかを明示します。

原則:

- 必要なものだけ含める
- 元Mediaを公開GitHubへ置かない
- ユーザーの明示操作なしに外部送信しない
- Contact Sheet / Crop / Metadataで目的を満たせるなら元動画全体を必須にしない

## Compatibility

Package Versionを変更するときは既存Packageの扱いを決めます。

選択肢:

1. 旧Versionをそのまま読める
2. Migrationして読む
3. 明示的にUnsupportedとしてReject

「たまたま読める」はCompatibility方針にしません。

大きな変更では以下を記録します。

- 旧Version
- 新Version
- Breaking Change
- Migration / Fallback
- Rollback可否

## Progressive Enhancement

AIやZIP生成が失敗しても、可能なら基本作業を残します。

例:

- ZIP生成失敗 → JSON / TXT個別Download
- 自動検出失敗 → 手動追加
- AI返却Import失敗 → raw JSONを保持して修正可能にする

## Test

AI-HANDOFFでは次を優先します。

### Static / Unit

- Manifest Schema
- Return Schema
- Enum / Range Validation
- Version compatibility
- Migration
- invalid JSON
- missing required files
- oversized metadata
- duplicate / invalid path

### Round Trip

可能なら次をTestします。

```text
Export
↓
Download / Package
↓
Import
↓
Validate
↓
同じ意味のデータへ戻る
```

### Fixtures

Importerには少なくとも以下のfixtureがあると強いです。

- 正常な現行Version
- 正常な旧対応Version
- 未対応Version
- 必須ファイル欠落
- 壊れたJSON
- 不正Enum / Range
- 過大件数 / 過大サイズ
- 危険または不正なPath

## 推奨テンプレート

- [AI Handoff Manifest Template](../templates/AI_HANDOFF_MANIFEST_TEMPLATE.json)
- [Quality Checklist](../templates/QUALITY_CHECKLIST.md)

## 関連

- [03 Data / Storage](03-data-storage.md)
- [05 Performance / Reliability](05-performance-reliability.md)
- [06 Security](06-security.md)
- [07 Testing / Quality](07-testing-quality.md)
- [12 Project Profiles](12-project-profiles.md)
- [S-009 Human-in-the-loop / S-010 Feedback Package / S-024 Versioned Handoff Contract](../catalog/success-patterns.md)
- [AP-026 Blind Package Import](../catalog/anti-patterns.md)
