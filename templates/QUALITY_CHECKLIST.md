# Quality Checklist

## 構成

- [ ] READMEが現在仕様と一致
- [ ] 仕様書が現在仕様と一致
- [ ] 作業報告が更新済み
- [ ] 同じ機能の旧Runtimeが本番で重複していない
- [ ] Single Source of Truthが明確

## HTML / CSS / JS

- [ ] JS構文エラーなし
- [ ] ローカルAsset参照切れなし
- [ ] 主要Buttonが反応
- [ ] 入力中の状態を不要に失わない
- [ ] 外部文字列を危険な`innerHTML`へ直接入れていない

## Data / Storage

- [ ] JSON構文正常
- [ ] ID重複なし
- [ ] Schema Validationあり
- [ ] Migrationが必要なら実装済み
- [ ] 大容量MediaをlocalStorageへ入れていない
- [ ] Backup / Restoreを必要に応じて用意
- [ ] Import前にValidation

## UI / UX

- [ ] Loading State
- [ ] Empty State + 復帰導線
- [ ] Error State + Retry/Fallback
- [ ] Success State
- [ ] ページ全体の不要な横overflowなし
- [ ] fixed/stickyが主要操作を隠さない
- [ ] 小画面で致命的に崩れない
- [ ] 低い縦解像度でも主要操作可能

## Accessibility

- [ ] 適切なbutton/label/nav/mainを使用
- [ ] キーボードで主要操作可能
- [ ] focus-visibleが見える
- [ ] 色だけで状態を表現していない
- [ ] 通常文字のコントラストを確認
- [ ] 操作対象が極端に小さくない
- [ ] reduced-motion配慮

## Performance

- [ ] 初期画面に不要な重いJSを読み込まない
- [ ] 大きな画像を無駄に原寸表示しない
- [ ] 長時間同期LoopでUIを固めない
- [ ] 長い処理にProgress/Cancelを必要に応じて用意
- [ ] Blob URL / Timer / ListenerをCleanup
- [ ] 第三者CDN失敗時の影響を確認

## GitHub Pages

- [ ] サブパスで相対Pathが壊れない
- [ ] `fetch()`対象JSONのPath正常
- [ ] Service Worker Scope正常
- [ ] 秘密情報が公開Artifactにない
- [ ] Pages公開対象に不要ファイルを含めていない

## Test

- [ ] Static Validation成功
- [ ] Unit Test成功（該当時）
- [ ] Browser Smoke/E2E成功（該当時）
- [ ] 一度直した重大BugにRegression Guardあり

## 実機・未確認

- [ ] Firefox
- [ ] Chromium
- [ ] Windows固有機能
- [ ] スマホ実機
- [ ] ペンタブ
- [ ] 外部API実通信
- [ ] 長時間利用

未確認項目はチェックせず、作業報告へ残す。
