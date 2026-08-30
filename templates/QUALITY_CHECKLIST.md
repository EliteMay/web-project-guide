# Quality Checklist

すべての項目を毎回実施するための表ではありません。Project Profileと変更内容に合わせて、**Minimum → Standard → Extended**の順で必要範囲を選びます。

未確認項目はチェックせず、作業報告へ残します。

## Minimum — 原則すべての制作・修正

### 構成

- [ ] README / 仕様が現在実装と致命的に矛盾していない
- [ ] 同じ機能の旧Runtimeが本番で重複していない
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
- [ ] 確認できなかったことを未確認として記録
- [ ] CIがある場合、Cleanup後の最終Commit / Merge Commitに対する結果を確認

## Standard — 通常のWebアプリで推奨

### Data / State

- [ ] Single Source of Truthが明確
- [ ] ID重複なし
- [ ] Import前Validation
- [ ] Migrationが必要なら実装または方針明記
- [ ] 大容量MediaをlocalStorageへ入れていない
- [ ] 重要データにBackup / Export / Recoveryを必要に応じて用意
- [ ] 保存失敗時に無言で成功扱いしない
- [ ] 編集サイトでは未保存状態を必要に応じて扱う

### UI / UX

- [ ] Loading State
- [ ] Empty State + 復帰導線
- [ ] Error State + Retry / Fallback
- [ ] Success State
- [ ] ページ全体の不要な横overflowなし
- [ ] fixed / stickyが主要操作を隠さない
- [ ] 小画面・低い縦解像度で致命的に崩れない

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

### Browser

- [ ] 主用途ブラウザで主要操作確認
- [ ] Firefox / Chromiumの両方が重要なら両方確認
- [ ] 新しいWeb APIはFeature Detection / Browser Supportを確認

## Extended — 条件付き

Project Profileや高リスク変更に該当する場合のみ実施します。

### DATA / TOOL

- [ ] Schema Validation
- [ ] Migration Test
- [ ] Backup → Restore Test
- [ ] 編集→保存→再読込E2E
- [ ] 複数タブ競合を考慮（重要データの場合）

### MEDIA

- [ ] IndexedDBの実保存・復元
- [ ] Media Codec
- [ ] Object URL cleanup
- [ ] 大容量データ時の性能
- [ ] Canvas / Geometry

### CLOUD

- [ ] Auth / Guest境界
- [ ] Sync失敗
- [ ] Offline / Provider outage
- [ ] Secret / Environment設定

### ELECTRON

- [ ] 実Windows起動
- [ ] preload / IPC
- [ ] userData維持
- [ ] start.bat失敗時ログ
- [ ] Setup.exe / install / uninstall（該当時）

### PUBLIC-CONTENT

- [ ] Asset License / Attribution
- [ ] 公開してはいけない個人情報なし
- [ ] 必要ならtitle / metadata / SEO

### Test

- [ ] Static Validation成功
- [ ] Unit Test成功（該当時）
- [ ] Browser Smoke / E2E成功（該当時）
- [ ] 一度直した重大BugにRegression Guardあり
- [ ] 途中Commitではなく最終Commit / Merge Commitの結果を確認した

## Verification State

作業報告では必要に応じて以下を区別します。

- Implemented
- Static validated
- Browser validated
- Real-device validated
- User validated
- Known limitation
- Not verified
