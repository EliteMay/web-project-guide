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

## CONDITIONAL SHOULD: Remote Diagnostic HandoffでZIP依存を減らす

ChatGPT / Codex / Claude等へ診断ZIPを繰り返し渡しているInteractive Projectでは、必要に応じて**Sanitize済みの小さなDiagnostic SnapshotだけをRemote Storeへ保存し、次回の更新・不具合調査時にAIが先に読める構成**を使えます。

これは本番Analyticsや全操作Telemetryではありません。目的は、毎回ZIPを作ったり、同じ症状を長文で説明し直したりする負担を減らすことです。

### 推奨する3層

```text
Level 1: Local detailed diagnostics
IndexedDB / localStorage等
↓
直近の詳細Breadcrumb / Error / State

Level 2: Remote compact handoff snapshot
Supabase等の無料Remote Store
↓
AIが次回修正時に読む小さいSanitized JSON

Level 3: Durable project memory
GitHub PROJECT_LEARNINGS.md
↓
高コスト失敗 / 成功 / 再発防止だけを長期保存
```

Remote Storeを`PROJECT_LEARNINGS.md`の代替にしません。Remote Snapshotは短期的なRuntime Evidence、Project Learningsは長期知識です。

### MUST: Free-only条件を壊さない

「無料で使えること」がProject要件の場合、Remote Diagnostic Handoffのために有料Planを必須化しません。

- Providerの**現在の無料枠を導入時に確認**する
- 無料枠が足りない / 利用できない場合はRemote保存を無効化できる
- Remote停止時もLocal Diagnostics / One-click Exportを使える
- Providerの有料化・枠変更を理由にCore機能が止まらない
- Diagnostics専用Backendをサイトごとに量産しない

Supabase Free等はActive Project数・Database・Egress・Storage・Function呼出し等に上限があり、条件は将来変わり得ます。数値をGuideへ恒久hardcodeせず、導入時に公式Pricing / Billingを再確認します。

複数の小規模ProjectでDiagnosticsだけを保存する場合、**1 Site = 1 Backend**をDefaultにせず、1つのShared Diagnostics Storeへ`projectKey`で分離する方式を優先的に検討します。

`projectKey`はRouting /分類用であり、認証情報として扱いません。

### SHOULD: Remoteへ送るのはCompact Snapshotだけ

Remoteへ保存する基本対象:

- Project key / Project name
- App Version / Build / Schema
- capturedAt
- capture reason
- severity / Error ID
- current route / screen
- Browser / viewportの最小Summary
- Recent Breadcrumb
- Sanitized Error
- Sanitized Network Failure
- Storage件数 / 利用可否 / 容量Summary
- Feature Flag

Remoteへ送らないもの:

- 画像 / 動画 / 音声本体
- Screenshotの自動常時保存
- File body
- IndexedDB全Dump
- localStorage全Dump
- API Response全文
- Token / Secret / Cookie
- User入力全文
- mousemove / scroll等の高頻度Event

開始時の目安として、1 Snapshotを**数KB〜数十KB程度**へ収めます。実装上の上限を設ける場合は、例えば64 KiB前後から始め、実際の必要性を確認して調整します。

### SHOULD: Remote保存のTriggerを絞る

Defaultで全Session・全操作をRemoteへ送りません。

優先順の例:

1. `Save for ChatGPT` / `Save diagnostic snapshot` の明示操作
2. Blocking / Major Error発生時の自動Snapshot（安全な書込経路がある場合）
3. 開発ModeのSession終了時Summary（必要な場合のみ）

通常操作ごとのRemote書込、heartbeat、mousemove、scroll等は避けます。

### MUST: Remote retention / quota guardを持つ

Remote Diagnostics自身が無料枠を圧迫しないようにします。

- 正常Sessionは短期間で削除
- Error Snapshotは必要な期間だけ残す
- Projectごとの最大件数を持つ
- 最大Payload sizeを持つ
- 古いRecordを削除できる
- 容量 / 件数をDiagnostics Viewで確認できるとよい

開始時の例:

```text
normal snapshots: 14〜30日
error snapshots: 30〜90日
max rows/project: 100〜200
```

これは固定Ruleではなく、無料枠と実運用を見て調整します。

### MUST: 公開Frontendへ秘密Keyを置かない

Remote StoreがSupabase等の場合:

- `service_role` / Secret KeyをFrontendへ置かない
- 公開SchemaのTableはRLSとGrantを確認する
- `projectKey`だけでSelect / Delete / Updateを許可しない
- 無制限の匿名InsertをDefaultにしない
- Browserから書く場合は、認証済みDeveloper session等の安全な書込主体を使う
- Server / Edge Functionを使う場合も認証・Payload size・Schema・RateをValidationする
- AIが読む場合は、可能ならユーザーの接続済みProvider権限を使い、公開APIへ管理権限を埋め込まない

Public Siteから誰でも無制限にInsertできる設計は、第三者Spamで無料Quotaを消費される可能性があります。安全なRemote write pathを用意できない場合、**Remote auto-uploadを行わずLocal ExportへFallback**します。

### SHOULD: AIが更新前にRemote Evidenceを読む

ProjectがRemote Diagnostic Handoffを採用しており、AIからそのProviderへ接続できる場合、既存Projectの更新・不具合調査では、ユーザーへ同じ状況を再質問する前に次を確認します。

```text
GitHub current repository / AGENTS / Spec
↓
PROJECT_LEARNINGS.md
↓
最新のRemote Error Snapshot
↓
最近のNormal / Success Snapshot
↓
対象Code / Test
```

必要以上の全履歴を読みません。例えば「最新Error 5〜10件 + 最近のNormal 1〜3件」程度から始め、必要な場合だけ範囲を広げます。

ProviderがPause / Offline / 未接続の場合は調査を止めず、GitHubとLocal Exportで進めます。

### Remote Handoffの識別情報

Projectの`AGENTS.md`またはProject Rulesへ、秘密情報を含まない範囲で次を記録できます。

- Remote handoff: enabled / disabled
- Provider: Supabase / Other
- Shared Store名 / Project ref
- `projectKey`
- Table / collection名
- Retention概要
- AIが読む最初の範囲
- Fallback: local export / diagnostics.json

API Secretや`service_role`は書きません。

### ZIPを残すケース

Remote Diagnostic Handoffを導入してもZIPを全面禁止しません。

ZIP / File handoffが適する例:

- Screenshot比較が本質的
- 動画 / 音声 / Canvas等のBinaryが必要
- Import Fileそのものが再現条件
- Remote Providerが利用できない
- ユーザーが明示的に完全Packageを渡したい

通常のError / Version / Breadcrumb / Storage Summaryだけなら、Remote Snapshotを優先できます。

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
- Remote handoff status / last sync（採用時）
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
- Remote compact handoff（安全な書込経路がある場合）

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
Local / Remote Snapshot
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
