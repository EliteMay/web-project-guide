# Quality Checklist

すべての項目を毎回実施するための表ではありません。Project Profileと変更内容に合わせて、**Minimum → Standard → Extended**の順で必要範囲を選びます。

未確認項目はチェックせず、作業報告へ残します。

## Minimum — 原則すべての制作・修正

### 構成

- [ ] README / 仕様が現在実装と致命的に矛盾していない
- [ ] `PROJECT_LEARNINGS.md` が存在する
- [ ] 同じ機能の旧Runtimeが本番で重複していない
- [ ] 正式RuntimeがVersion別Folder / Patch Fileの増殖構造になっていない
- [ ] 変更対象と影響範囲を確認した
- [ ] 一時Script / 一時Workflow / Debug資産が本番Repoへ残っていない

### HTML / CSS / JS

- [ ] JavaScript構文・起動時エラーなし
- [ ] 必須CSS / JS / Asset参照切れなし
- [ ] 変更した主要Button / Linkが反応
- [ ] UIが画面外へ致命的にはみ出さない

### Data / Storage

- [ ] JSON構文正常
- [ ] 変更で既存保存データを意図せず消さない
- [ ] Storage Key / Schema変更がある場合、互換性を確認

### GitHub Pages

- [ ] Pages対応プロジェクトでは相対Path / fetch先が正常
- [ ] localhost / PC固有絶対Pathに依存していない
- [ ] 公開Artifactへ秘密情報を入れていない
- [ ] Pagesを確認した場合、その結果がユーザーへ渡す最終Commitに対応している

### 完了記録

- [ ] 必要なREADME / 作業報告を更新
- [ ] 高コストBug / 重要な成功パターンを `PROJECT_LEARNINGS.md` へ反映
- [ ] 確認できなかったことを未確認として記録
- [ ] CIがある場合、Cleanup後の最終Commit / Merge Commitに対する結果を確認

## Standard — 通常のWebアプリで推奨

### Data / State

- [ ] Single Source of Truthが明確
- [ ] Version / Build / Schema / 件数等の重複hardcodeがない
- [ ] ID重複なし
- [ ] Import前Validation
- [ ] Migrationが必要なら実装または方針明記
- [ ] 大容量MediaをlocalStorageへ入れていない
- [ ] 重要データにBackup / Export / Recoveryを必要に応じて用意
- [ ] 保存失敗時に無言で成功扱いしない
- [ ] 編集サイトでは未保存状態を必要に応じて扱う

### Development Diagnostics

Interactive Projectでは必要範囲を確認します。

- [ ] App Version / Build / Schemaを診断情報から確認できる
- [ ] JavaScript Errorを捕捉できる
- [ ] Unhandled Promise Rejectionを捕捉できる
- [ ] Fetch / API Failureを必要に応じて記録できる
- [ ] Storage read / write Failureを必要に応じて記録できる
- [ ] 重要操作のBreadcrumbが残る
- [ ] Breadcrumbが無制限に増えない
- [ ] Diagnostic LogのClear / Rotation方法がある
- [ ] Token / Password / Secret / User入力全文をLogへ残さない
- [ ] Diagnostic Dataを公開Repositoryへ誤Commitしない
- [ ] 問題発生時にDiagnostic Export / Copy Reportできる（中規模以上）

### UI / UX

- [ ] Loading State
- [ ] Empty State + 復帰導線
- [ ] Error State + Retry / Fallback
- [ ] Success State
- [ ] ページ全体の不要な横overflowなし
- [ ] fixed / stickyが主要操作を隠さない
- [ ] 小画面・低い縦解像度で致命的に崩れない
- [ ] 自前DOMを別ModuleのMutationObserverで恒久的に完成させていない
- [ ] Interactive Componentに必要なhover / focus / disabled / loading / error状態がある

### Visual Design

Visual Qualityが重要なProjectでは確認します。

- [ ] Accent Color / Gradient変更だけで別Design扱いしていない
- [ ] 色・Shadow・Gradientを外しても主要なInformation Hierarchyが読める
- [ ] Header / Navigation / Content Width / Density / Grid / Primary ActionがProject目的に合っている
- [ ] Designが題材固有のData / Workflow / Product UI / Contentから導かれている
- [ ] 別ProductのScreenshotやCopyへ差し替えても同じに見えるGeneric Shellになっていない
- [ ] TypographyのSize / Weight / Line-height / Spacingに一貫したHierarchyがある
- [ ] Spacingが情報Groupingを表し、ランダムなmargin値の寄せ集めになっていない
- [ ] すべてのContentを理由なくCard化していない
- [ ] Gradient / Glass / Glow / Shadow / Rounded Cornerを使う場合、役割を説明できる
- [ ] 巨大Hero → 3 Feature Cards → CTAをAIのDefaultだけで採用していない
- [ ] 長い本文や高密度UIまで機械的に中央揃えしていない
- [ ] 意味のない`01 / 02 / 03`、Eyebrow、Badgeを装飾だけで量産していない
- [ ] Project内のComponentは一貫しつつ、他ProjectとPage Compositionまで同じにしていない
- [ ] 必要ならProject固有のSignatureを1つ説明できる

### Accessibility

- [ ] 適切なbutton / label / nav / mainを使用
- [ ] キーボードで主要操作可能
- [ ] focus-visibleが見える
- [ ] 色だけで状態を表現していない
- [ ] 通常文字のコントラストを確認
- [ ] 操作対象が極端に小さくない
- [ ] reduced-motionを必要に応じて尊重

### Performance / Reliability

- [ ] 初期画面に不要な重いJSを読み込まない
- [ ] 大きな画像を無駄に原寸表示しない
- [ ] 長時間同期LoopでUIを固めない
- [ ] Blob URL / Timer / ListenerをCleanup
- [ ] 第三者API/CDN失敗時の影響を確認
- [ ] Diagnostics自体がStorage / Performanceを大きく悪化させていない

### Browser

- [ ] 主用途ブラウザで主要操作確認
- [ ] Firefox / Chromiumの両方が重要なら両方確認
- [ ] 新しいWeb APIはFeature Detection / Browser Supportを確認

### AI-assisted Development

AIがCode / Design / Architectureを大きく生成した場合。

- [ ] AIの最初のOutputをそのままFinal扱いしていない
- [ ] 既存Repo / Project Rule / ArchitectureとのDiffを確認した
- [ ] 重複File / inline style / global override / fixed geometry / monolith化を確認した
- [ ] AIの説明ではなくTest / Browser /公式Documentationで重要挙動を検証した
- [ ] 継続的にAgentを使うRepoでは`AGENTS.md`の必要性を確認した
- [ ] `AGENTS.md`を使う場合、README / PROJECT_RULESの長文を重複コピーしていない

## Extended — 条件付き

Project Profileや高リスク変更に該当する場合のみ実施します。

### VISUAL DIRECTION

新規Project / 大規模UI刷新 / Landing / Showcase / Media等でVisual Directionが重要な場合。

- [ ] CSS実装前にDesign Concept / Navigation / Density / Typography / Component / Effect方針を決めた
- [ ] Wireframe / Content outline / StructureをVisual Polishより先に確認した
- [ ] 色違いではなく構造的に異なる2〜3案を必要に応じて比較した
- [ ] Fixed ConstraintsとCreative Axesを分けた
- [ ] 採用Directionと却下案の理由を要件 / ADR / 作業報告のいずれかへ残した
- [ ] DesignShelfを使った場合、Layout IDを完成TemplateとしてコピーせずProject固有属性へ変形した
- [ ] Reference Siteを使った場合、特定企業のLayout / Brand表現をそのままコピーしていない
- [ ] Desktop / Mobileの実画面を見てVisual Design Review Gateを実施した
- [ ] Blocking / Major / MinorのVisual issueを必要に応じて修正した
- [ ] 同型Sectionが長く続く場合、Section rhythm / varianceを見直した

### DATA / TOOL

- [ ] Schema Validation
- [ ] Migration Test
- [ ] Backup → Restore Test
- [ ] 破壊的Importは全payload Validation後に既存Dataを変更する
- [ ] Import前Recovery / Backupがある
- [ ] Import途中失敗時にRollbackまたは元Data維持を確認
- [ ] 不正Importで現在Dataが変わらないTestがある
- [ ] 編集→保存→再読込E2E
- [ ] 複数タブ競合を考慮（重要データの場合）
- [ ] Import / Migration / Restore結果がDiagnosticsへ残る

### MEDIA

- [ ] IndexedDBの実保存・復元
- [ ] Media Codec
- [ ] Object URL cleanup
- [ ] 大容量データ時の性能
- [ ] Canvas / Geometry
- [ ] Media本体をDiagnostic Exportへ誤って含めない
- [ ] Responsive imageが必要なら`srcset / sizes`等を検討
- [ ] 画像のwidth / height等で不要なLayout Shiftを減らしている

### CLOUD

- [ ] Auth / Guest境界
- [ ] Sync失敗
- [ ] Offline / Provider outage
- [ ] Secret / Environment設定
- [ ] Authorization Header / TokenをLogへ残さない

### ELECTRON

- [ ] 実Windows起動
- [ ] preload / IPC
- [ ] userData維持
- [ ] start.bat失敗時ログ
- [ ] Setup.exe / install / uninstall（該当時）
- [ ] 起動失敗 / IPC failureを診断できる

### PUBLIC-CONTENT

- [ ] Asset License / Attribution
- [ ] 公開してはいけない個人情報なし
- [ ] 必要ならtitle / metadata / SEO

### I18N — 多言語対応時のみ

- [ ] `<html lang>`が正しい
- [ ] RTLが必要なら`dir` / Layoutを確認
- [ ] TranslationでTextが長くなってもButton / Tab / Layoutが壊れない
- [ ] Date / Number / Currencyをlocale-awareに扱う
- [ ] Locale依存のImage / Icon / Exampleを確認

### PRIVACY — Tracking / Form / Account / Telemetry時のみ

- [ ] 収集Dataと目的を説明できる
- [ ] 不要なDataを収集していない
- [ ] 外部送信先 / Retentionを確認
- [ ] Consent / Opt-outが必要か現行要件を確認
- [ ] Diagnostic DataとAnalytics / User Contentを不必要に混ぜていない

### Test / Learning

- [ ] Static Validation成功
- [ ] Unit Test成功（該当時）
- [ ] Browser Smoke / E2E成功（該当時）
- [ ] Visual Regression / Screenshot比較が有効なProjectでは実施または導入判断済み
- [ ] 一度直した重大BugにRegression Guardあり
- [ ] 高コストBugのRoot Cause / Preventionを `PROJECT_LEARNINGS.md` に記録
- [ ] Version / Build / Schema等の正本と派生値が自動検証される（該当時）
- [ ] Manual重要項目はExpected / Resultを必要に応じて記録した
- [ ] 途中Commitではなく最終Commit / Merge Commitの結果を確認した

## Verification State

作業報告では必要に応じて以下を区別します。

- Implemented
- Static validated
- Browser validated
- Visual reviewed
- Real-device validated
- User validated
- Known limitation
- Not verified
