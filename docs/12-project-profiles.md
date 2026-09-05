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

## LEARNING

学習・解説・資格対策・知識集など、**利用者に理解してもらうこと自体が主要価値**のサイト。

`DATA`はData構造、`LEARNING`は教材・説明品質を扱うため、必要なら両方を選びます。

主な確認:
- 利用者のStarting Knowledge
- 前提知識 → 本題の学習順
- Dashboard / 一覧とPrimary Learning Surfaceの役割分離
- 主要LessonのContent Depth Contract
- 用語定義だけでLesson完成扱いしていないか
- 具体例 / 比較 / 勘違い / 理解確認の必要性
- 学習者向け言語と英語・略語の説明方針
- 読了と理解度を同一視しない進捗設計
- Lesson後のNext Step / Review Path
- 教材Coverageと実際の学習導線Coverageを別に確認

要件の正本は [01 要件定義](01-requirements.md#learning--explanation-content) を確認します。

## GAME

Browser Game / Canvas Game / WebGL Game / Electron Game / 2D・3D Game等で、**Gameplay Rule / Player Action / Success-Failure / Progression等がProductの主要価値**であるProject。

Animationや簡単なQuizがあるだけでは機械的に`GAME`へ分類しません。

主な確認:
- Core Experience / Supporting Systems / Non-goals
- Core Gameplay LoopとPlayable MVP
- Main Goal / Primary Completion Condition
- Progression / Difficulty / Failure Contract（該当時）
- Game StateとUI / Rendering / AnimationのSource of Truth分離
- Save / Reload / Existing Save（永続Saveがある場合）
- Runtime Performance / Scale（Game規模に応じて）
- Controls / Tutorial / Gameplay Readability
- Automated Test / Runtime Validation / Actual Playtestの区別
- Phase Gate / Core Before Variety / Scope Management

詳細Ruleの正本は [19 Game Development](19-game-development.md) です。Save技術詳細、一般Performance、Testing Strategy、UI / Visual等は各専門Ownerを維持します。

`GAME + STATIC`、`GAME + MEDIA`、`GAME + ELECTRON`、`GAME + TOOL`、`GAME + PUBLIC-CONTENT`等、既存Profileと併用できます。

`GAME-SMALL` / `GAME-LARGE`のようにProfileを細分化せず、Game Development章のCONDITIONAL Ruleで規模差を扱います。

## MEDIA

画像・音声・動画・Canvas・手書きを扱うサイト。

主な確認:
- IndexedDB
- Blob / Object URL cleanup
- Media codec
- 大容量データ
- Thumbnail / lazy loading
- 実ブラウザ確認

## AI-HANDOFF

ChatGPT等へJSON / ZIP /画像 / Remote Diagnostic Snapshotを渡して分析結果を戻すサイト。

主な確認:
- 固定Schema
- manifest
- 入出力Version
- Human correction
- AI結果を未検証の事実として扱わない
- Runtime DiagnosticsをAIへ渡す場合はCompact / Sanitizedな形式を優先
- 同じ症状を繰り返し渡すProjectではRemote Diagnostic Handoffを検討
- Binaryが不要な診断まで毎回ZIP化しない
- Provider未接続時のLocal Export Fallback

## CLOUD

Supabase等の外部DB・認証・同期を使うサイト。

主な確認:
- 秘密情報
- Guest / Cloud境界
- Offline / Failure State
- Sync競合
- サービス停止時の挙動
- 無料枠 / 維持費
- 無料必須の場合は現在のPricing / Active Project / Pause条件を導入時に再確認
- 公開SchemaのRLS / Grant
- Remote Diagnosticsを保存する場合のRetention / Size / Rate / Abuse対策

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
- `<html lang>` と文書言語
- 各主要Pageの意味が分かる`title`
- 検索流入が重要ならMeta description / canonical等の基本Metadata
- Accessibility
- Privacy
- 公開してはいけない個人データ
- GitHub Pagesで迷子になりやすい場合は`404.html`等の復帰導線
- Analytics / Form / Third-party Scriptを使う場合のPrivacy影響
- 必要ならSEO

### CONDITIONAL: 多言語 / Internationalization

複数言語を扱う場合だけ追加確認します。

- Page / SectionのLanguage指定
- 翻訳でText lengthが伸びても致命的に崩れない
- Date / Number / Currency等を文字列連結だけで固定しない
- RTL言語を対象にする場合は`dir`とLayout方向を確認
- Placeholder英語だけでResponsive Designを確定しない

すべての個人用Siteへ多言語対応を強制しません。

## Project Profileの記録例

```text
Profiles: STATIC + DATA + LEARNING + TOOL
```

Gameの場合も同じ形式で、必要なProfileを併用します。

```text
Profiles: GAME + STATIC + DATA
```

またはプロジェクトメタデータへ保存します。

```json
{
  "guideVersion": "1.1.0",
  "profiles": ["STATIC", "DATA", "LEARNING", "TOOL"]
}
```

Guide VersionをJSONへ重複コピーする場合は、それは「そのプロジェクトが採用したVersionの記録」であり、Guide本体のVersion正本ではありません。
