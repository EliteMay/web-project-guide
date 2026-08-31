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
- Remote Diagnostic Snapshot

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

## Remote Diagnostic Handoff

CONDITIONAL: Runtime DiagnosticsをSupabase等のRemote Storeへ保存する場合、**診断の便利さのために公開Frontendへ管理権限を埋め込みません**。

### MUST

- `service_role` / Secret Key / private API keyをBrowserへ置かない
- 公開SchemaのTableではRLSとDatabase Grantを確認する
- `projectKey`やProject名をAuthorizationとして使わない
- 無制限の匿名Insert / Select / DeleteをDefaultにしない
- Payload Schema / 最大Size / Content typeを検証する
- Token / Cookie / Authorization Header / User入力全文 / Media bodyをRemoteへ保存しない
- Remote write失敗でLocal Diagnosticsを失わない
- Provider停止時にCore機能まで利用不能にしない

BrowserからRemoteへ書き込む場合は、認証済みDeveloper session等の安全な主体へ限定することを優先します。

Server / Edge Functionを使う場合も、Clientから渡された`projectKey`だけを信用して管理権限を与えず、認証・許可範囲・Payload size・Rateを確認します。

Supabaseの公開Schemaでは、RLSだけでなく`anon` / `authenticated`のTable Grantも実際の利用操作へ絞ります。`service_role`はRLSをBypassできるためFrontendへ公開しません。

安全なRemote write pathを用意できないProjectでは、Remote auto-uploadを無理に導入せず、Local Diagnostics + One-click ExportへFallbackします。

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
