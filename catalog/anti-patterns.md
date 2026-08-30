# Anti-Pattern Catalog

以下は原則として避けます。

## AP-001 Versioned Patch Runtime

`feature-v2.js`, `feature-v3.js`, `fix-final.js`のように旧実装を残したまま上書きを重ねる。

## AP-002 Global Function Override

別ファイルから`window.someFunction = ...`で本体を恒久的に差し替える。

## AP-003 MutationObserver UI Patch

正式なrender処理を直せるのに、Observerで後からDOMを修正する。

## AP-004 Duplicated Source Data

同じ配色・教材・設定・VersionをJSONとJSの両方へ手入力する。

## AP-005 Large Data in localStorage

画像、Base64、動画、手書き、大量診断をlocalStorageへ入れる。

## AP-006 Absolute Screen Coordinates

永続データをページ全体のpx座標だけで保存する。

## AP-007 Magic Counts

`14セット`, `188問`等の件数を複数箇所へhardcodeする。

## AP-008 UI Directly Controls Every Backend

UIがYouTube API、Local Media、Cloud、Storageへそれぞれ直接アクセスし、同じ操作の経路が複数になる。

## AP-009 Fixed UI Everywhere

便利だからという理由でHeader/Footer/目次/操作Dockを大量にfixed/sticky化する。

## AP-010 Feature List Homepage

Homeへ全機能・全説明・全数値を並べ、今やるべき操作が分からなくなる。

## AP-011 Fake Completion

未実装ページ、ダミーScore、まだ使えないボタンを完成済みのように表示する。

## AP-012 No Error State

正常時しか設計せず、API失敗・0件・壊れたJSONで真っ白になる。

## AP-013 Destructive Auto Repair

壊れたデータを確認なしで自動修正し、元データを消す。

## AP-014 One External Provider Assumption

1つのCDN/APIが常に利用可能だと仮定する。

## AP-015 Full Rewrite Without Migration Plan

巨大な既存サイトを一括Rewriteし、保存互換・主要フロー・回帰確認を同時に壊す。

## AP-016 README as History Dump

READMEへ過去Versionの詳細を延々追記し、現在仕様が分からなくなる。

## AP-017 CI Equals Real Device Verification

Static Check成功を、YouTube再生・Codec・ペンタブ・スマホ・Windows機能まで確認済みと扱う。

## AP-018 Security by Obscurity

公開JS内のAPI Keyが見つかりにくいから安全だと考える。

## AP-019 Raw innerHTML for External Data

外部入力・Import JSON・API文字列をそのまま`innerHTML`へ入れる。

## AP-020 Design Before Workflow

画面の見た目を先に完成させ、保存・編集・復元・Error Stateが後回しになる。
