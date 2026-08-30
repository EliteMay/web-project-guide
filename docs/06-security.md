# 06 Security

## 基本方針

個人利用を中心とし、企業向けの過剰な仕組みは避けます。ただし、データ漏れ・秘密情報公開・破壊的操作・XSS・誤送信につながる設計は避けます。

## GitHubへ置かないもの

- API Key
- Password
- Token
- 個人PC固有の秘密情報
- 非公開の個人データ
- アップロード不要な元動画・音声

公開GitHub Pagesではフロントエンドに埋めた秘密情報を隠すことはできません。

## 入力を信用しない

以下はすべてValidation対象です。

- URL Parameter
- User Input
- Import JSON
- Import ZIP / Archive
- localStorage
- IndexedDB
- 外部API Response
- AI Return Data
- Supabase Response

保存済みデータでも破損・旧形式・書き換えを想定します。

## ZIP / Archive Import

CONDITIONAL: ZIP等をImportする場合、Browser内だけの処理でも無制限に信頼しません。

最低限、用途に応じて以下を確認します。

- Archive全体サイズ
- Entry数
- JSON / Textの個別サイズ
- 必須ファイル
- 対応Compression Method
- Pathが想定範囲か
- `../`、絶対Path、異常な重複Entry等がないか
- Schema / Version

集計に不要な大容量画像・動画をすべてMemoryへ展開しないことを優先します。

Import途中で失敗した場合、既存の正式データを先に削除しません。

AI-HANDOFF Packageの詳細は [14 AI Handoff / Package Contract](14-ai-handoff.md) を参照します。

## DOMへの文字列挿入

文字列表示は原則`textContent`を優先します。

外部入力をそのまま`innerHTML`へ入れません。HTMLとして挿入する必要がある場合は、信頼できる生成元または適切にsanitizeされた内容だけを扱います。

## AI返却値

AIがJSON形式で返した場合でも、自サイトが生成した確定データとは扱いません。

- JSON parse
- Schema / Version
- ID
- Enum
- Range
- required field

等を確認してから利用します。

AI出力に含まれる説明文・ファイル名・URL等も外部入力として扱います。

## 外部リンク

新規タブを開く場合は必要に応じて`rel="noopener noreferrer"`を使用します。

## 第三者スクリプト

第三者JSは、その配信元のコードを自サイトで実行することを意味します。

- 必要性を確認する
- 使う数を抑える
- 対応可能ならSRIを使う
- 重要機能にはFallbackを持たせる

## 削除・リセット

大量削除や初期化は誤操作を前提にします。

- Undo
- 事前確認
- Backup
- Snapshot

のいずれか、重要データでは複数を組み合わせます。

## Electron

- rendererから危険なOS操作を直接許可しすぎない
- `contextIsolation`等のElectron標準安全策を優先
- 任意コマンドを自動実行しない
- userDataをアップデート時に消さない
- 個人PCパスを公開configへ書かない
