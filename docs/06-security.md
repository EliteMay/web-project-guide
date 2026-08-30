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
- localStorage
- IndexedDB
- 外部API Response
- Supabase Response

保存済みデータでも破損・旧形式・書き換えを想定します。

## DOMへの文字列挿入

文字列表示は原則`textContent`を優先します。

外部入力をそのまま`innerHTML`へ入れません。HTMLとして挿入する必要がある場合は、信頼できる生成元または適切にsanitizeされた内容だけを扱います。

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
