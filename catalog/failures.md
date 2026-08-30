# Failure Catalog

過去の自作サイトで実際に発生した、再発防止価値の高い失敗を整理します。

## F-001 Versioned Patchの積み重ね

**発生:** English / VReview / LyricTube  
**症状:** 後続JSが既存関数やGlobalを上書きし、読み込み順依存・修正同士の打ち消し・旧Runtime混在が発生。  
**修正コスト:** 非常に高い  
**最終対応:** 単一Pipeline / Module / Controller / Hookへ統合。  
**予防:** Versionごとの上書きJSを恒久化しない。

## F-002 localStorageへ大容量データ

**発生:** English / Lineup Lab  
**症状:** 手書きやData URL画像で容量・保存時間が悪化。  
**修正コスト:** 高い  
**最終対応:** IndexedDBへ移行。  
**予防:** 画像・動画・音声・手書き・BlobはIndexedDBを優先。

## F-003 保存データが現在UIのgeometryに依存

**発生:** English  
**症状:** 上の問題の高さ変更で後続問題の手書き位置がずれる。  
**修正コスト:** 非常に高い  
**最終対応:** 問題単位の0〜1相対座標 + Paper Snapshot。  
**予防:** 永続座標をページ絶対位置で保存しない。

## F-004 Single Source of Truth不在

**発生:** VReview / LyricTube / DesignShelf / AP Study Notes  
**症状:** Version、件数、配色、教材ルール等が複数箇所でずれる。  
**修正コスト:** 中〜高  
**最終対応:** version.js / manifest / JSON / schemaへ一本化。  
**予防:** 要件定義時に正本を明記する。

## F-005 未実装機能が完成済みに見える

**発生:** VReview  
**症状:** Dashboardや通常Navigationに未実装ページ・ダミー数値が表示される。  
**修正コスト:** 中  
**最終対応:** 通常Navigationから外しDEVELOPMENT明示。  
**予防:** 未実装はFeature Flagまたは通常導線外。

## F-006 fixed / sticky UIが操作を阻害

**発生:** DesignShelf / English / その他旧サイト  
**症状:** 目次・ドック・Footerが常駐し、本文やボタンへ重なる。  
**修正コスト:** 中  
**最終対応:** 固定UI削減、独立Scroll、専用Layout Controller。  
**予防:** 低い縦解像度・狭画面・125〜150%表示倍率で確認。

## F-007 ページ全体の横overflow

**発生:** English  
**症状:** 950px固定紙面が親Paneを押し広げ、左右比較不能。  
**修正コスト:** 高い  
**最終対応:** 紙全体をPane幅に合わせて縮小、左右独立Scroll。  
**予防:** 固定幅コンテンツを2Paneへ入れる場合、縮小/局所Scroll戦略を先に決める。

## F-008 同じ機能を複数経路で実装

**発生:** LyricTube  
**症状:** YouTubeとLocal Mediaでseek/playback/sync処理が別経路になり、片方だけ修正される。  
**修正コスト:** 非常に高い  
**最終対応:** Player Controllerへ統合。  
**予防:** UI→Controller→Adapterの共通契約を作る。

## F-009 外部処理準備前の操作を捨てる

**発生:** ASMRTube / LyricTube系  
**症状:** YouTube API等の準備前にユーザーが押した操作が無効化される。  
**修正コスト:** 中  
**最終対応:** Pending Actionを保持し、準備後に適用。  
**予防:** 非同期初期化にはReady状態と待機Queueを持つ。

## F-010 stateを壊してからValidation

**発生:** VReview  
**症状:** 不正なStart/End入力でValidation失敗しても元stateが変更済みになる可能性。  
**修正コスト:** 中  
**最終対応:** copy→patch→normalize→validate→commit。  
**予防:** 永続stateを直接mutationしてから検証しない。

## F-011 Object URL / Listener / Timerの後始末不足

**発生:** VReview / Media系  
**症状:** 動画切替・長時間利用で不要Resourceが残る。  
**修正コスト:** 中  
**最終対応:** revoke / cleanupをLifecycleへ追加。  
**予防:** Resource取得時にCleanup方法も同時に設計する。

## F-012 Static CheckだけでUIバグを見逃す

**発生:** English  
**症状:** JS構文・JSONは正常でも、実ブラウザでCanvas位置や横overflowが壊れる。  
**修正コスト:** 高い  
**最終対応:** Firefox E2E追加。  
**予防:** Geometry・主要導線が重要ならSmoke/E2Eを持つ。

## F-013 古いhardcodeが残る

**発生:** English / AP Study Notes  
**症状:** 問題数・教材数等の旧値が診断やUIへ残る。  
**修正コスト:** 中  
**最終対応:** Manifest / Loaderへ一元化。  
**予防:** 件数を複数JSへ書かない。

## F-014 外部Providerの失敗が利用不能につながる

**発生:** 歌詞検索系  
**症状:** CORS・Rate Limit・Provider障害・仕様変更で検索不能。  
**修正コスト:** 継続的  
**最終対応:** Provider統合、Fallback、取得元表示。  
**予防:** 外部サービスを1社前提にしない。Failure Stateを設計する。

## F-015 UIを豪華にするほど本来用途が弱くなる

**発生:** English / DesignShelf  
**症状:** バッジ・説明・常駐UI等を増やし、紙として解く/構造を選ぶ目的が見えにくくなる。  
**修正コスト:** 中  
**最終対応:** 本作業画面を簡素化し、説明は別Pane/Helpへ。  
**予防:** 「この画面でユーザーが今やる1つの行動」を優先する。

---

## 修正コストの目安

- **非常に高い:** 保存Schema、座標体系、Runtime構造、複数Player/Provider統合
- **高い:** 大容量保存方式、主要Layout、既存データMigration
- **中:** Navigation、Version一元化、Fixed UI、Error State
- **低い:** 文言、余白、単純な配色・表示調整

高コスト項目ほど要件定義段階で決めます。
