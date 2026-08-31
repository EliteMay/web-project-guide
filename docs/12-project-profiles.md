# 12 Project Profiles

すべてのサイトへ同じチェックを強制しないため、制作開始時にProject Profileを選びます。複数選択可能です。

## STATIC

GitHub Pages中心の通常Webサイト。

主な確認:
- 相対パス
- Pages公開
- Responsive
- Accessibility
- 外部依存最小化

## DATA

大量JSON、学習サイト、検索・一覧などデータ量が多いサイト。

主な確認:
- Manifest / Index
- Schema / ID
- Lazy Load
- 件数hardcode禁止
- Import / Export / Validation

## MEDIA

画像・音声・動画・Canvas・手書きを扱うサイト。

主な確認:
- IndexedDB
- Blob / Object URL cleanup
- Media codec
- 大容量データ
- Thumbnail / lazy loading
- Responsive image / dimensions（該当時）
- 実ブラウザ確認

## AI-HANDOFF

ChatGPT等へZIP / JSON /画像を渡して分析結果を戻すサイト。

主な確認:
- 固定Schema
- manifest
- 入出力Version
- Human correction
- AI結果を未検証の事実として扱わない

## CLOUD

Supabase等の外部DB・認証・同期を使うサイト。

主な確認:
- 秘密情報
- Guest / Cloud境界
- Offline / Failure State
- Sync競合
- サービス停止時の挙動
- 無料枠 / 維持費
- 個人Data / Privacy（扱う場合）

## ELECTRON

Windows等のDesktop機能を使うElectronアプリ。

主な確認:
- main / preload / renderer責務
- IPC
- userData
- ログ
- start.bat
- Setup.exe / Release
- 実Windows確認

## TOOL / EDITOR

ユーザーが編集・保存を繰り返すツール型サイト。

主な確認:
- 未保存状態
- Undo / Backup
- destructive action
- autosaveの可否
- 複数タブ競合
- 編集→保存→再読込のE2E

## PUBLIC-CONTENT

一般公開する情報・コンテンツサイト。

主な確認:
- Asset License / 出典
- Metadata / title
- Accessibility
- Privacy
- 公開してはいけない個人データ
- 必要ならSEO

### CONDITIONAL: 多言語公開

複数言語・地域を正式対応する場合だけ追加確認します。

- `lang` / text direction
- TranslationによるText expansion
- Locale-aware date / number / currency
- RTL Layout（該当時）
- Locale切替とURL / SEO方針（必要時）
- Image / Icon / Exampleの文化依存

単一言語Projectへi18n frameworkを機械的に導入しません。

### CONDITIONAL: Analytics / Form / Account / Tracking

User DataやTrackingを扱う場合だけ追加確認します。

- 収集Dataの必要性
- 外部送信先
- Retention
- Consent / Opt-outの要否
- Diagnostic Dataとの分離

詳細は [Security](06-security.md) を参照します。

## Project Profileの記録例

```text
Profiles: STATIC + DATA + TOOL
```

またはプロジェクトメタデータへ保存します。

```json
{
  "guideVersion": "1.1.0",
  "profiles": ["STATIC", "DATA", "TOOL"]
}
```

Guide VersionをJSONへ重複コピーする場合は、それは「そのプロジェクトが採用したVersionの記録」であり、Guide本体のVersion正本ではありません。
