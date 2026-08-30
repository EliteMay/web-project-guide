# Failure Catalog

過去の自作サイトで実際に発生した、再発防止価値の高い失敗です。

各項目は `症状 → Root Cause → 最終対応 → 予防 → 検出方法 → 関連ルール` の順で確認します。

## F-001 Versioned Patchの積み重ね

- **Category:** Architecture / Runtime
- **発生:** English / VReview / LyricTube
- **Severity / Cost:** Critical / 非常に高い
- **症状:** 後続JSが既存関数やGlobalを上書きし、読み込み順依存・修正同士の打ち消し・旧Runtime混在が発生。
- **Root Cause:** 実験的修正を正式構造へ統合せずVersion別JSとして積層。
- **最終対応:** 単一Pipeline / Module / Controller / Hookへ統合。
- **予防:** Versionごとの上書きJSを恒久化しない。
- **検出:** Code review / Static validation / Runtime smoke。
- **Related:** [AP-001 / AP-002](anti-patterns.md) / [S-003](success-patterns.md) / [Architecture](../docs/02-architecture.md)

## F-002 localStorageへ大容量データ

- **Category:** Storage
- **発生:** English / Lineup Lab
- **Severity / Cost:** High / 高い
- **症状:** 手書きやData URL画像で容量・保存時間が悪化。
- **Root Cause:** Prototype時の簡単な保存方式をデータ量増加後も継続。
- **最終対応:** IndexedDBへ移行。
- **予防:** 要件定義で想定最大データ量を決め、Media / Stroke / BlobはIndexedDBを優先。
- **検出:** Data量レビュー / 実データ長期利用。
- **Related:** [AP-005](anti-patterns.md) / [S-004](success-patterns.md) / [Data / Storage](../docs/03-data-storage.md)

## F-003 保存データが現在UI geometryに依存

- **Category:** Storage / Geometry
- **発生:** English
- **Severity / Cost:** Critical / 非常に高い
- **症状:** 上の問題の高さ変更で後続問題の手書き位置がずれる。
- **Root Cause:** 永続データをページ全体の絶対座標へ保存。
- **最終対応:** 問題単位の0〜1相対座標 + Paper Snapshot。
- **予防:** 永続座標をページ絶対位置で保存しない。
- **検出:** Browser E2E / Geometry test / Human visual。Staticのみでは困難。
- **Related:** [AP-006](anti-patterns.md) / [S-006](success-patterns.md) / [Data / Storage](../docs/03-data-storage.md)

## F-004 Single Source of Truth不在

- **Category:** Data / Maintenance
- **発生:** VReview / LyricTube / DesignShelf / AP Study Notes
- **Severity / Cost:** High / 中〜高
- **症状:** Version、件数、配色、教材ルール等が複数箇所でずれる。
- **Root Cause:** 同一情報をREADME / JS / JSON / UIへ別々に手入力。
- **最終対応:** version.js / manifest / JSON / schemaへ一本化。
- **予防:** 要件定義時に正本を明記する。
- **検出:** Static validator / Diff review。
- **Related:** [AP-004 / AP-007](anti-patterns.md) / [S-001 / S-002](success-patterns.md)

## F-005 未実装機能が完成済みに見える

- **Category:** Product / UX
- **発生:** VReview
- **Severity / Cost:** Medium / 中
- **症状:** Dashboardや通常Navigationに未実装ページ・ダミー数値が表示される。
- **Root Cause:** 画面を先に増やし、実装状態をUIで区別しなかった。
- **最終対応:** 通常Navigationから外しDEVELOPMENT明示。
- **予防:** 未実装はFeature Flagまたは通常導線外。
- **検出:** Human review / E2E。
- **Related:** [AP-011](anti-patterns.md) / [Project Management](../docs/10-project-management.md)

## F-006 fixed / sticky UIが操作を阻害

- **Category:** UI / Accessibility
- **発生:** DesignShelf / English / その他旧サイト
- **Severity / Cost:** Medium / 中
- **症状:** 目次・ドック・Footerが常駐し、本文やボタンへ重なる。
- **Root Cause:** Desktop広画面だけで設計し、低い高さ・Zoom・Small viewportを未確認。
- **最終対応:** 固定UI削減、独立Scroll、専用Layout制御。
- **予防:** 低い縦解像度・狭画面・125〜150%表示倍率で確認。
- **検出:** Browser E2E / Human visual。
- **Related:** [AP-009](anti-patterns.md) / [UI / UX](../docs/04-ui-ux-accessibility.md)

## F-007 ページ全体の横overflow

- **Category:** Responsive / Layout
- **発生:** English
- **Severity / Cost:** High / 高い
- **症状:** 950px固定紙面が親Paneを押し広げ、左右比較不能。
- **Root Cause:** 固定幅コンテンツと2Paneの縮小・Scroll戦略を後付け。
- **最終対応:** 紙全体をPane幅に合わせて縮小、左右独立Scroll。
- **予防:** 固定幅コンテンツでは縮小/局所Scroll戦略を先に決める。
- **検出:** Browser E2E / overflow assertion。
- **Related:** [UI / UX](../docs/04-ui-ux-accessibility.md) / [Quality Checklist](../templates/QUALITY_CHECKLIST.md)

## F-008 同じ機能を複数経路で実装

- **Category:** Architecture
- **発生:** LyricTube
- **Severity / Cost:** Critical / 非常に高い
- **症状:** YouTubeとLocal Mediaでseek/playback/sync処理が別経路になり、片方だけ修正される。
- **Root Cause:** UIがProviderごとの実装へ直接接続。
- **最終対応:** Player Controllerへ統合。
- **予防:** UI → Controller → Adapterの共通契約を作る。
- **検出:** Architecture review / Integration test。
- **Related:** [AP-008](anti-patterns.md) / [S-003](success-patterns.md) / [Architecture](../docs/02-architecture.md)

## F-009 外部処理準備前の操作を捨てる

- **Category:** Async / Reliability
- **発生:** ASMRTube / LyricTube系
- **Severity / Cost:** Medium / 中
- **症状:** YouTube API等の準備前にユーザーが押した操作が無効化される。
- **Root Cause:** Ready前入力の扱いを未設計。
- **最終対応:** Pending Actionを保持し、準備後に適用。
- **予防:** 非同期初期化にはReady状態と待機Queueを持つ。
- **検出:** Browser integration test。
- **Related:** [Performance / Reliability](../docs/05-performance-reliability.md)

## F-010 stateを壊してからValidation

- **Category:** State / Data Integrity
- **発生:** VReview
- **Severity / Cost:** High / 中
- **症状:** 不正なStart/End入力でValidation失敗しても元stateが変更済みになる可能性。
- **Root Cause:** 永続stateへ先にmutation。
- **最終対応:** copy → patch → normalize → validate → commit。
- **予防:** 検証前に元stateを破壊しない。
- **検出:** Unit test。
- **Related:** [Data / Storage](../docs/03-data-storage.md)

## F-011 Object URL / Listener / Timerの後始末不足

- **Category:** Performance / Lifecycle
- **発生:** VReview / Media系
- **Severity / Cost:** Medium / 中
- **症状:** 動画切替・長時間利用で不要Resourceが残る。
- **Root Cause:** Resource取得とcleanupを別々に考えた。
- **最終対応:** revoke / cleanupをLifecycleへ追加。
- **予防:** Resource取得時にCleanup方法も同時設計。
- **検出:** Long-session test / DevTools。
- **Related:** [Performance / Reliability](../docs/05-performance-reliability.md)

## F-012 Static CheckだけでUIバグを見逃す

- **Category:** Testing
- **発生:** English
- **Severity / Cost:** High / 高い
- **症状:** JS構文・JSONは正常でも実ブラウザでCanvas位置や横overflowが壊れる。
- **Root Cause:** Static Validationを実ブラウザ確認の代替として扱った。
- **最終対応:** Firefox E2E追加。
- **予防:** Geometry・主要導線が重要ならSmoke/E2Eを持つ。
- **検出:** Browser E2E。
- **Related:** [AP-017](anti-patterns.md) / [S-013 / S-017](success-patterns.md) / [Testing](../docs/07-testing-quality.md)

## F-013 古いhardcodeが残る

- **Category:** Data / Maintenance
- **発生:** English / AP Study Notes
- **Severity / Cost:** Medium / 中
- **症状:** 問題数・教材数等の旧値が診断やUIへ残る。
- **Root Cause:** 件数をManifestから計算せず複数箇所へ直書き。
- **最終対応:** Manifest / Loaderへ一元化。
- **予防:** 件数を複数JSへ書かない。
- **検出:** Static validator。
- **Related:** [AP-007](anti-patterns.md) / [S-002](success-patterns.md)

## F-014 外部Providerの失敗が利用不能につながる

- **Category:** External Dependency / Reliability
- **発生:** 歌詞検索系
- **Severity / Cost:** High / 継続的
- **症状:** CORS・Rate Limit・Provider障害・仕様変更で検索不能。
- **Root Cause:** 正常系・単一Provider前提。
- **最終対応:** Provider統合、Fallback、取得元表示。
- **予防:** Failure Stateを設計し、重要機能を1社前提にしない。
- **検出:** Failure injection / Browser integration。
- **Related:** [AP-014](anti-patterns.md) / [S-015](success-patterns.md) / [Performance / Reliability](../docs/05-performance-reliability.md)

## F-015 UIを豪華にするほど本来用途が弱くなる

- **Category:** UX / Product
- **発生:** English / DesignShelf
- **Severity / Cost:** Medium / 中
- **症状:** バッジ・説明・常駐UI等を増やし、本来の作業が見えにくくなる。
- **Root Cause:** Feature追加と常時表示を同一視。
- **最終対応:** 本作業画面を簡素化し、説明は別Pane / Helpへ。
- **予防:** 「この画面で今やる1つの行動」を優先。
- **検出:** Human usability review。
- **Related:** [AP-010 / AP-020](anti-patterns.md) / [UI / UX](../docs/04-ui-ux-accessibility.md)

## F-016 一時Workflow / Scriptが修正経路になる

- **Category:** GitHub / Maintenance / Testing
- **発生:** LyricTube
- **Severity / Cost:** Medium / 中
- **症状:** 単発修正のために一時GitHub ActionsやPatch Scriptを追加し、途中CommitのCI成功と最終mainの状態が分離する。Cleanup用Commitも増え、どの状態が完成なのか分かりにくくなる。
- **Root Cause:** 対象ファイルを直接更新できるのに、Workflowをファイル書換えEngineとして利用した。さらに途中Commitの成功結果を最終確認と混同しやすかった。
- **最終対応:** 小規模修正は対象ファイルを直接更新。複数ファイル・高リスク変更はBranch / PR。Workflowは継続的自動化に限定し、最終CommitでCI / Pagesを再確認。
- **予防:** 実装前に変更経路を選び、一時資産には削除条件を持たせる。完成判定はCleanup後の最終Commitを基準にする。
- **検出:** Git diff / Workflow一覧 / Final Commit CI / Pages確認。
- **Related:** [AP-023](anti-patterns.md) / [S-020](success-patterns.md) / [Project Management](../docs/10-project-management.md) / [Testing](../docs/07-testing-quality.md)

---

## 修正コストの目安

- **非常に高い:** 保存Schema、座標体系、Runtime構造、複数Player/Provider統合
- **高い:** 大容量保存方式、主要Layout、既存データMigration
- **中:** Navigation、Version一元化、Fixed UI、Error State、変更経路の整理
- **低い:** 文言、余白、単純な配色・表示調整

高コスト項目ほど要件定義段階で決めます。

## Detection Matrix

| 問題種類 | Static | Unit | Browser E2E | 実機 / Human |
|---|---:|---:|---:|---:|
| Link / JSON / hardcode | 強い | - | 補助 | - |
| Migration / normalize | 補助 | 強い | 補助 | - |
| Geometry / overflow | 弱い | 弱い | 強い | 強い |
| Media / Codec | 弱い | 弱い | 中 | 強い |
| OS固有Electron | 弱い | 補助 | 弱い | 必須 |
| UX過密 / 分かりやすさ | 弱い | - | 補助 | Human必須 |
| 一時Workflow / Final Commit不一致 | 強い | - | - | 補助 |
