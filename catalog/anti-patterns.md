# Anti-Pattern Catalog

以下は原則として避けます。ただし、**技術そのものを禁止するのではなく「なぜ危険か」「例外は何か」「代替は何か」**を確認します。

## AP-001 Versioned Patch Runtime

`feature-v2.js`, `feature-v3.js`, `fix-final.js`のように旧実装を残したまま上書きを重ねる。

- **なぜ危険:** 読み込み順依存、責務不明、修正同士の打ち消し。
- **例外:** 短期的な緊急patchとして一時利用する場合。
- **代替:** 正式Module / Pipeline / Controllerへ統合。
- **Related:** [F-001](failures.md) / [S-003](success-patterns.md)

## AP-002 Global Function Override

別ファイルから`window.someFunction = ...`で本体を恒久的に差し替える。

- **なぜ危険:** どこが最終実装か分からなくなる。
- **例外:** Legacy bridge等で明確に隔離・期限設定されている場合。
- **代替:** Hook / Event / Explicit interface。

## AP-003 MutationObserver UI Patch

正式なrender処理を直せるのにObserverで後からDOMを修正する。

- **なぜ危険:** Render後の再patch、Timing依存、DOM変更への脆弱性。
- **例外:** 第三者Widgetなど自分でrender処理を変更できないDOMを監視する場合。
- **代替:** 本体render / state更新へ統合。

## AP-004 Duplicated Source Data

同じ配色・教材・設定・VersionをJSONとJSの両方へ手入力する。

- **なぜ危険:** 片方だけ更新される。
- **代替:** Single Source of Truth。
- **Related:** [F-004](failures.md) / [S-001](success-patterns.md)

## AP-005 Large Data in localStorage

画像、Base64、動画、手書き、大量診断をlocalStorageへ入れる。

- **なぜ危険:** 容量・同期書き込み・Migration負荷。
- **例外:** 小さなThumbnailや数KBの軽量データなら規模を見て判断。
- **代替:** IndexedDB。
- **Related:** [F-002](failures.md) / [S-004](success-patterns.md)

## AP-006 Absolute Screen Coordinates

永続データをページ全体のpx座標だけで保存する。

- **なぜ危険:** Layout変更で意味がずれる。
- **例外:** 固定解像度Canvas等、座標系自体が不変の用途。
- **代替:** Object-local / normalized coordinates + Snapshot。
- **Related:** [F-003](failures.md) / [S-006](success-patterns.md)

## AP-007 Magic Counts

`14セット`, `188問`等の件数を複数箇所へhardcodeする。

- **代替:** Manifest / Dataから算出。
- **Related:** [F-013](failures.md) / [S-002](success-patterns.md)

## AP-008 UI Directly Controls Every Backend

UIがYouTube API、Local Media、Cloud、Storageへそれぞれ直接アクセスし、同じ操作の経路が複数になる。

- **なぜ危険:** 同じ操作を複数箇所で修正することになる。
- **例外:** 極小規模でBackendが1つだけのPrototype。
- **代替:** Controller / Adapter。
- **Related:** [F-008](failures.md) / [S-003](success-patterns.md)

## AP-009 Fixed UI Everywhere

便利だからという理由でHeader/Footer/目次/操作Dockを大量にfixed/sticky化する。

- **例外:** 常時表示価値が高く、Small viewport / Zoomでも操作を隠さない場合。
- **代替:** Normal flow / Drawer / local sticky。
- **Related:** [F-006](failures.md)

## AP-010 Feature List Homepage

Homeへ全機能・全説明・全数値を並べ、今やるべき操作が分からなくなる。

- **代替:** 現在の目的・次の行動を優先し、詳細は別画面/Helpへ。
- **Related:** [F-015](failures.md)

## AP-011 Fake Completion

未実装ページ、ダミーScore、まだ使えないボタンを完成済みのように表示する。

- **代替:** Development表示 / Feature Flag / 通常導線外。
- **Related:** [F-005](failures.md)

## AP-012 No Error State

正常時しか設計せず、API失敗・0件・壊れたJSONで真っ白になる。

- **代替:** Loading / Empty / Error / Successを設計。

## AP-013 Destructive Auto Repair

壊れたデータを確認なしで自動修正し、元データを消す。

- **代替:** Diagnose → Backup → Repair → Validate。

## AP-014 One External Provider Assumption

1つのCDN/APIが常に利用可能だと仮定する。

- **例外:** 代替不能なサービスで、停止時に明確なErrorを表示できる場合。
- **代替:** Fallback / Progressive Enhancement / Manual route。
- **Related:** [F-014](failures.md) / [S-015](success-patterns.md)

## AP-015 Full Rewrite Without Migration Plan

巨大な既存サイトを一括Rewriteし、保存互換・主要フロー・回帰確認を同時に壊す。

- **例外:** 保存互換が不要な捨てPrototype。
- **代替:** 段階移行 / Adapter / Migration / Regression Test。

## AP-016 README as History Dump

READMEへ過去Versionの詳細を延々追記し、現在仕様が分からなくなる。

- **代替:** README=current spec、CHANGELOG=history。

## AP-017 CI Equals Real Device Verification

Static Check成功をYouTube再生・Codec・ペンタブ・スマホ・Windows機能まで確認済みと扱う。

- **代替:** Verification Stateを分ける。
- **Related:** [F-012](failures.md) / [S-017](success-patterns.md)

## AP-018 Security by Obscurity

公開JS内のAPI Keyが見つかりにくいから安全だと考える。

- **代替:** Secret / backend / environment設計。

## AP-019 Raw innerHTML for External Data

外部入力・Import JSON・API文字列をそのまま`innerHTML`へ入れる。

- **例外:** 完全に信頼できる固定HTML、または適切にsanitizeされたHTML。
- **代替:** `textContent` / Safe DOM construction / trusted sanitizer。

## AP-020 Design Before Workflow

画面の見た目を先に完成させ、保存・編集・復元・Error Stateが後回しになる。

- **代替:** 主要利用フロー → Data/Storage → UI structure → Visual polish。
- **Related:** [F-015](failures.md)

## AP-021 Checklist Everything Everywhere

全プロジェクトへすべてのTest・機能・品質項目を適用し、確認が儀式化する。

- **代替:** Project Profile + Minimum / Standard / Extended Checklist。
- **Related:** [S-019](success-patterns.md) / [Project Profiles](../docs/12-project-profiles.md)

## AP-022 Success Pattern Cargo Cult

過去に成功したという理由だけでIndexedDB、Dashboard、Controller、E2E等を毎回導入する。

- **なぜ危険:** 小規模サイトを不必要に複雑化する。
- **代替:** Success PatternのUse when / Avoid when / Trade-offを確認する。

## AP-023 Workflow as Patch Engine

対象ファイルを直接更新できるのに、単発の修正を適用するためだけのGitHub Actions / Patch ScriptをRepoへ追加する。

- **なぜ危険:** 作業用Commit・Cleanup Commit・余分なDeployが増え、途中CIと最終mainの状態が分離する。Workflow自体の失敗が本来の修正とは無関係なノイズになる。
- **例外:** 継続的な自動化が最終成果物である場合、または直接更新できない明確な技術制約がある場合。
- **代替:** 小規模変更は対象ファイルを直接更新。高リスク・複数ファイル変更はBranch / PR。Workflowを使った場合もCleanup後の最終Commitを再検証する。
- **Related:** [F-016](failures.md) / [S-020](success-patterns.md) / [Project Management](../docs/10-project-management.md)

## AP-024 Permanent Versioned Runtime Path

正式Runtimeを`js/v060/`, `js/v061/`, `app-v060.css`のようなVersion付きPathへ置き、更新ごとにコピーして増やす。

- **なぜ危険:** 中身がModule化されていても「次VersionのFolderを複製する」運用になり、旧Runtime混在・Metadata重複・Patch積層へ戻りやすい。
- **例外:** 複数Major Versionを同時配信する、またはRelease Artifact自体をVersion付きDirectoryで固定する要件がある場合。
- **代替:** `js/app/app.js` / `css/app.css`等の安定Path + `meta.js` / manifestでVersion管理。
- **Related:** [F-017](failures.md) / [S-021](success-patterns.md) / [Maintenance](../docs/09-maintenance.md)

## AP-025 Clear Before Full Import Validation

Backup / Import時に、Import payload全体のValidationが終わる前に既存localStorage / IndexedDBをclear・上書きする。

- **なぜ危険:** 後半のRecord不正やIndexedDB書き込み失敗で、既存データだけ失われる可能性がある。
- **例外:** 既存データへ影響しない一時Storeや、完全に再生成可能なCache。
- **代替:** parse → 全体validate → current backup → replace → read-back verify → rollback on failure。
- **Related:** [F-018](failures.md) / [S-022](success-patterns.md) / [Data / Storage](../docs/03-data-storage.md)

## AP-026 Palette-Swap Clone

複数ProjectでHeader / Hero / Section / Card / CTA等の構造をほぼ同じにしたまま、Accent ColorやBackgroundだけを変えて別Designとして扱う。

- **なぜ危険:** Project固有の情報構造や操作に合わず、同じ制作者・同じAIのTemplate感が強くなる。
- **例外:** 同一Product familyや社内Tool群で意図的にShellを共通化する場合。
- **代替:** 再利用ComponentとPage Compositionを分離し、Navigation / Content Width / Density / Grid / Typography / Primary Action等をProject目的から設計する。
- **Related:** [S-024](success-patterns.md) / [Visual Design Quality](../docs/04-ui-ux-accessibility.md)

## AP-027 Decorative Cardification

Gradient / Glassmorphism / Glow / Shadow / Rounded Cornerを重ね、ほぼすべての情報をCardへ入れることで完成度を出そうとする。

- **なぜ危険:** 情報の関係性よりSurface装飾が先に立ち、Hierarchyが弱くなる。Card同士の重要度も同じに見えやすい。
- **例外:** 独立して比較・選択・移動するObjectが多数ある場合や、Brand表現としてEffectに明確な役割がある場合。
- **代替:** Section / List / Table / Divider / Background difference / Typography / Spacingを使い分け、Effectごとに役割を説明できる状態にする。
- **Related:** [S-024](success-patterns.md) / [Visual Design Quality](../docs/04-ui-ux-accessibility.md)

## AP-028 AI Landing Page Default

「モダンで高品質」にするだけの理由で、中央揃え巨大Hero → CTA → 等幅3 Feature Cards → 同型Card Grid → 最終CTAを繰り返す。

- **なぜ危険:** 内容に関係なくAIが選びやすい構造へ収束し、情報密度・Navigation・Product UI・実際の利用フローが後回しになる。
- **例外:** 本当に1つのMessageを強く見せるMarketing Pageで、3項目比較やCTA導線が情報構造として適切な場合。
- **代替:** WireframeからProject固有の情報関係を整理し、2〜3個の構造的に異なるDesign Directionを比較する。
- **Related:** [AP-020](anti-patterns.md) / [S-024](success-patterns.md) / [S-025](success-patterns.md) / [Visual Design Quality](../docs/04-ui-ux-accessibility.md)

## AP-029 Success Factor Misattribution

別ProjectのValidated Directionを参考にするとき、**そのProjectで何を減らしたか・どの表層を使ったかを成功要因そのものだと誤認して移植する**。

例:

- SourceでCardを減らした → TargetでもCardを減らせば良くなる
- SourceでGradientを弱めた → TargetでもEffectを弱めれば良くなる
- Sourceが3 Paneだった → Targetも3 Paneにすれば良くなる

- **なぜ危険:** Sourceで成功した本当の理由がWorkflow / Hierarchy / Content modelだった場合、表層だけ移植するとTarget固有のIdentityやAffordanceを失う。
- **実例:** ASMRTube v2.4はLyricTube Media WorkspaceのHierarchyだけでなく「装飾を減らした量」まで強く移植し、User評価40/100でRejectedになった。
- **例外:** 同一Product familyでTask / Content / Brand / Densityまで意図的に共通化する場合。
- **代替:** Referenceごとに `Transfer / Rebuild / Do not copy` を分け、成功した理由だけを移植する。
- **Related:** [AP-022](anti-patterns.md) / [S-027](success-patterns.md) / [Validated Visual Directions](validated-visual-directions.md)

## AP-030 Minimalism as Quality Metric

`simple / clean / minimal`へ寄せるほどVisual Qualityが高くなると考え、Card / Color / Icon / Emoji / Shadow / friendly surface等を**減らした量**で改善を判断する。

- **なぜ危険:** 見た目のNoiseだけでなく、クリック可能性、親しみやすさ、Brand identity、Contentの楽しさまで同時に削ることがある。
- **実例:** AP Study Guide r22はAI Template感を消す目的でTechnical Console方向へ寄せ、旧r21 40点から30点へ低下した。
- **例外:** 本当に低刺激・高密度・長時間作業が主目的で、Content / Typography / StructureだけでIdentityとAffordanceを十分作れる場合。
- **代替:** 削減量ではなく、Task clarity / Hierarchy / Identity / Affordance / Readabilityで比較する。既存Siteでは先に`KEEP / FIX / REMOVE`を作る。
- **Related:** [S-026](success-patterns.md) / [Validated Visual Directions](validated-visual-directions.md)

## AP-031 Unvalidated Visual Direction Promotion

Latest main、CI成功、Assistant自己評価、Design理論上の妥当性だけで、Visual Candidateを「成功例」「正解例」として次Projectへ再利用する。

- **なぜ危険:** Userが低評価したDirectionや、まだ評価されていないCandidateが時間経過で成功扱いされ、誤ったReferenceが増える。
- **例外:** User feedbackを得られない内部Toolで、Task completion / usability /継続利用等の代替Evidenceが十分ある場合。ただしEvidence Levelを明示する。
- **代替:** `User Validated / Task Validated / Candidate / Rejected`を分け、A以外をValidated Directionへ自動昇格しない。
- **Related:** [S-027](success-patterns.md) / [S-028](success-patterns.md) / [Validated Visual Directions](validated-visual-directions.md)

## AP-032 Eager Initial Everything

Top Page / First Routeを開くだけで、全Category JSON、全Feature JS、大量Media、複数Embed、非Critical API等をまとめてEager Loadし、Repository容量や高速PCだけを根拠に軽いと判断する。

- **なぜ危険:** Network TransferだけでなくParse / Decode / JavaScript Execution / DOM / Rendering / External Waitが初期表示へ集中し、MobileやCold LoadでPrimary UXを悪化させる。
- **例外:** Resource全体が十分小さく、実測でも分割Complexityの方が大きい小規模Site。
- **代替:** Critical / Deferred / On Demandへ分類し、Soft BudgetのReview Trigger超過時だけ必要性・遅延・分割・圧縮・Cache・代替をReviewする。
- **Related:** [Performance / Reliability](../docs/05-performance-reliability.md)
