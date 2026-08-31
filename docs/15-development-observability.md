# 15 Development Observability / Project Memory

この章は、ユーザーが毎回「何をしたら壊れたか」「前にも同じことがあったか」を最初から説明し直さなくても、Project自身の記録から原因調査を始められるようにするための共通ルールです。

## 目的

制作中のサイトは、完成品だけでなく**開発過程から学習できる状態**にします。

次の3つを分けて残します。

1. **Work Report** — 今回何を変更したか
2. **Project Learnings** — 長期的に残す失敗・成功・再発防止知識
3. **Runtime Diagnostics** — 実際の操作・エラー・環境から再現調査するための機械可読データ

この3つを同じファイルへ混ぜません。

---

## MUST: `PROJECT_LEARNINGS.md` を持つ

新規Projectでは原則としてRepository Rootに `PROJECT_LEARNINGS.md` を作成します。

小規模な完全静的サイトでも、重要な失敗・成功が発生した場合はこのファイルへ残します。

Templateは [`PROJECT_LEARNINGS_TEMPLATE.md`](../templates/PROJECT_LEARNINGS_TEMPLATE.md) を使用できます。

### 記録する対象

すべての小変更を書く必要はありません。次のいずれかに該当するものを記録します。

- 修正に時間がかかったBug
- 同じ原因で2回以上問題が起きた
- データ消失・互換破壊・公開事故につながる可能性があった
- 一見正しそうな実装が実ブラウザ / 実機で壊れた
- 将来また同じ設計判断をしそうなもの
- 特に効果が高かった設計・UI・Test・運用方法
- 他Projectにも使えそうな成功パターン
- `web-project-guide`へ還元する価値がありそうな知見

### 失敗記録の最低項目

- ID
- Date
- Symptom / 症状
- Expected / Actual
- Trigger / 再現条件
- Root Cause
- Final Fix
- Affected files / systems
- Cost / Severity
- Detection method
- Regression Guard
- Prevention
- Guideへの還元候補か

### 成功記録の最低項目

- ID
- Date
- Problem / Goal
- Adopted Pattern
- Why it worked
- Trade-off
- Reuse conditions
- Related files / tests
- Guideへの還元候補か

---

## MUST: 高コストBugは「直した」で終わらせない

高コストまたは再発価値の高いBugを修正した場合は、可能な範囲で次の3点をセットにします。

1. `PROJECT_LEARNINGS.md`へ原因と予防を記録
2. Regression Test / Validator / Guardのいずれかを追加
3. 作業報告へ今回の修正結果を記録

Test化できないUI / 実機問題では、再現手順や確認ChecklistをGuardとして残します。

---

## CONDITIONAL MUST: Interactive ProjectにはDevelopment Diagnosticsを持つ

JavaScriptで状態を持つWeb App、DATA / MEDIA / TOOL / CLOUD / ELECTRON Profileでは、開発中に最低限の診断情報を収集できる仕組みを持たせます。

単純な静的説明ページなど、Runtime状態がほぼ存在しないProjectは省略できます。

Diagnosticsは本番Analyticsとは別物です。**原因調査用のローカル診断**を基本とします。

### 最低限記録するもの

- App Version / Build / Schema Version
- Session開始時刻
- Current route / screen
- Viewport size
- Browser / Platformの診断に必要な最小情報
- Feature Detection結果のうち重要なもの
- 主要な初期化Stepの成功 / 失敗
- 重要操作のBreadcrumb
- JavaScript Error
- Unhandled Promise Rejection
- Fetch / API Failure
- Storage read / write Failure
- Import / Migration / Restoreの成功 / 失敗
- Feature Flag / Experimental Flag状態（使用時）

ブラウザの`error`イベントと`unhandledrejection`は、予期しない実行時失敗の捕捉に利用できます。

---

## Breadcrumb / 直前操作履歴

「何をしたら壊れたか」を説明し直さなくてもよいように、重要操作だけをRing Bufferで残します。

例:

```text
12:03:02 page.open library
12:03:08 song.select id=abc
12:03:10 player.play source=local
12:03:14 lyrics.seek 00:42.1
12:03:15 ERROR PLAYER_SEEK_FAILED
```

### 記録しないもの

- mousemove
- scrollの全Event
- keydownの全文
- 入力欄の文字列全文
- Media body

ノイズを大量に保存すると原因調査しにくくなるため、**意味のある状態遷移・操作だけ**を記録します。

---

## MUST: Logを無限保存しない

Diagnostics自身がStorage問題を起こしてはいけません。

原則:

- Event数または容量に上限を持つ
- Ring Buffer方式を優先
- 古いSessionを自動削除できる
- Diagnostic Storage使用量を確認できる
- Clear Diagnosticsを用意する

目安として、通常のWeb Appでは直近50〜200 Breadcrumb程度から始め、必要性を確認して増やします。

大量Mediaや診断BlobをlocalStorageへ保存しません。

---

## MUST: ログへ秘密情報を入れない

次をDiagnosticsへ直接記録しません。

- Password
- API Key
- Access Token / Refresh Token
- Session Token
- Cookie全文
- 秘密鍵
- Authorization Header
- 個人情報の全文
- ユーザー入力本文
- File本文
- Local media body
- URL Query / Fragmentに秘密情報が入り得る場合の全文URL

必要な値はRedact / Mask / Hash / Summary化します。

例:

```text
悪い: Authorization: Bearer eyJ...
良い: authPresent=true

悪い: https://example.com/?token=SECRET
良い: /current-page
```

OWASPもApplication LoggingではToken、Password、暗号鍵、機密個人情報等を直接記録しないことを推奨しています。

---

## SHOULD: DiagnosticsはLocal-first

個人用GitHub Pages / Electron Projectでは、診断データは原則として端末内へ保存します。

外部Serverへ自動送信するTelemetryは、明確な必要性がある場合だけ別途設計します。

公開Repositoryには、**診断機能のCode / Schemaだけ**をCommitし、実際の個人Diagnostic Logは原則Commitしません。

---

## SHOULD: One-click Diagnostic Export

中規模以上のInteractive Projectでは、「診断情報を書き出す」「Copy Diagnostic Report」等を用意します。

目的は、問題が起きたときにユーザーが長文で状況説明しなくても、ChatGPT / 開発者へ機械可読の情報を渡せるようにすることです。

標準イメージ:

```text
diagnostic-package/
├─ manifest.json
├─ environment.json
├─ breadcrumbs.json
├─ errors.json
├─ storage-summary.json
└─ notes.txt              # 任意
```

または小規模なら1つの`diagnostics.json`でも構いません。

Template Schemaは [`DIAGNOSTICS_SCHEMA_TEMPLATE.json`](../templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json) を参照してください。

### Diagnostic Exportに含める

- Project name
- App Version / Build / Schema
- Captured time
- Browser / viewport
- Current route
- Feature support
- Recent breadcrumbs
- Error list
- Failed network requestのSanitized summary
- Storageの種類 / 使用可否 / 件数 / 容量Summary
- Active feature flags

### 原則含めない

- 保存データ本体
- 曲 / 動画 / 画像本体
- 全localStorage dump
- IndexedDB全Record
- Token / Secret
- User入力全文

必要な場合だけ、ユーザーが明示して追加します。

---

## SHOULD: Error IDを付ける

予期しない失敗をユーザーへ表示する場合、可能なら短いError IDを付けます。

例:

```text
動画の読み込みに失敗しました。
Error: MEDIA-LOAD-002
```

Diagnostics側にも同じIDを記録すると、画面上のエラーと内部ログを対応付けやすくなります。

Error IDは原因を完全に表す必要はなく、**同じ失敗経路を検索できること**を優先します。

---

## SHOULD: Health / Diagnostics View

DATA / MEDIA / CLOUD / ELECTRONなど複雑なProjectでは、通常UIとは分離した診断画面を持つと原因調査が速くなります。

表示候補:

- App / Build / Schema
- Runtime module status
- JSON / Data integrity
- Storage status
- IndexedDB Store count
- Service Worker / Cache status
- External Provider状態
- Feature support
- Recent errors
- Diagnostic export
- Clear diagnostics

未実装機能のDashboardと混同しないよう、`Diagnostics` / `Development`等と明示します。

---

## MAY: Performance Diagnostics

性能問題が重要なProjectではPerformance API / PerformanceObserverを使い、次を計測できます。

- Navigation timing
- Resource timing
- Long task / long animation frame
- Custom `performance.mark()` / `performance.measure()`

PerformanceObserverはブラウザのPerformance Timelineへ追加されるEntryを継続監視できます。

ただし、計測自体を大量に行ってPerformanceを悪化させないようにします。

---

## MAY: Experimental Feature Flag + Outcome Log

大きなUI / Algorithm変更ではFeature Flagを使い、旧挙動へ戻せるようにする方法があります。

この場合DiagnosticsへFlag状態を含めます。

さらに重要な実験はADRまたはProject Learningsへ、次を残します。

- Hypothesis / 何が良くなる想定か
- Change
- Result
- Keep / Revert

「なんとなく変更した」を減らします。

---

## DevelopmentからReleaseへ移るとき

Diagnosticsを全部削除するのではなく、次を分類します。

### Release後も残す価値が高い

- Error capture
- Storage failure
- Migration result
- Diagnostic Export
- Data Integrity / Health Check

### Development onlyになりやすい

- 詳細Debug panel
- 過剰なconsole logging
- Internal timing trace
- Experimental state dump

Productionで残す場合も、秘密情報・容量上限・Performanceへの影響を再確認します。

---

## Project Feedback Loop

新しい問題が解決したら次の流れを使います。

```text
Runtime Diagnostic
↓
再現・Root Cause特定
↓
Fix
↓
Regression Guard
↓
PROJECT_LEARNINGS.md
↓
複数Projectへ共通化できるか判断
↓
web-project-guide Failure / Success / Anti-Patternへ還元
```

これによりProjectごとの経験を次のProjectへ持ち越します。
