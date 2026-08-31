# 07 Testing / Quality

## 基本方針

「コードが書けた」と「使える」は別です。

自動テストで防げる問題と、実ブラウザ・実機・人間のReviewでしか確認できない問題を分けます。

Testを完成直前だけにまとめず、主要機能を追加した段階で小さく確認し、問題を積み上げない方を優先します。

## Ruleには可能な範囲で確認方法を持たせる

「高速にする」「Accessibleにする」「崩れないようにする」だけでは、完了判定が曖昧です。

測定・確認できるRuleでは、可能な範囲で次を定義します。

- 何を確認するか
- 自動 / Manual / Browser / Real-deviceのどれで確認するか
- 期待結果
- 許容範囲またはFailure条件

全項目へ数値Thresholdを強制する必要はありませんが、**確認方法を書けるものを一般論のまま残さない**ことを優先します。

## 最低限のStatic Validation

GitHub Actions等で可能なら以下を自動確認します。

- JavaScript / MJS構文
- JSON構文
- HTML内のローカル参照切れ
- 必須ファイル存在
- ID重複
- Schema必須値
- Manifest件数
- 廃止Runtimeの再混入
- 公開JSONへのData URL / 秘密情報混入

## Unit Test

Pure Functionにできる処理はブラウザUIから切り離してテストします。

例:
- Timestamp Parser
- 同期補間
- Score計算
- Migration
- Normalize / Validate
- URL解析
- Detector後処理

## E2E / Smoke Test

主要利用フローは実ブラウザで確認できると強いです。

例:

```text
ページを開く
↓
データを選ぶ
↓
編集する
↓
保存する
↓
再読み込み
↓
復元される
```

UIが重要なサイトでは以下も確認します。

- ページ全体の横overflow
- 固定UIの重なり
- Button visibility
- Canvas/対象DOM geometry
- Main navigation

## AI-generated / AI-assisted Code Review Gate

### SHOULD: AIの最初の出力を完成品として無条件に採用しない

ChatGPT / Codex / Claude等を実装に使う場合も、最終判断は現在のRepo・仕様・Test結果を基準にします。

AI生成物は少なくとも変更規模に応じて次を確認します。

- 既存Architecture / Design Systemへ沿っているか
- 同じ機能・CSS・Dataを新しく重複していないか
- File / Function / Componentを不必要に巨大化していないか
- 固定px / inline style / global override等、Prototype向けShortcutが恒久化していないか
- Error / Empty / Loading / Async double-submitを考慮しているか
- Security / Storage / Migration / Secretへ影響していないか
- 既存Testと新しいRegression Testが通るか
- AI自身の「動くはず」を検証結果として扱っていないか

特に初心者が未知のTechnologyをAIだけで実装する場合、ArchitectureやDeployment手順は公式Documentationと実環境で確認します。

推奨Loop:

```text
AI Draft / Implementation
→ Diff / Architecture Review
→ Static / Unit / Browser Test
→ Human or independent Review
→ Adapt / Simplify
→ Final-state Validation
```

## Visual Regression

### CONDITIONAL: UI変更が多いProjectではScreenshot比較を検討する

Visual Regression Testは、機能Testでは拾いにくい次の事故に有効です。

- Layout shift / overflow
- Fixed UI重なり
- Typography / Spacingの意図しない変化
- Component stateの崩れ
- Desktop修正によるMobile回帰

毎回Pixel-perfect比較を必須にしません。Animation、Dynamic content、Font rendering差でNoiseが大きい場合は、主要画面だけScreenshotを残す、Thresholdを持たせる、Manual比較にする等、維持コストに合わせます。

Visual Qualityが重要なProjectでは、[UI / UX / Accessibility](04-ui-ux-accessibility.md) の **Visual Design Review Gate** と組み合わせます。

## 対応ブラウザ

最低でも主要用途に合わせてFirefox / Chromiumを意識します。

新しいWeb API/CSSはMDN Baseline等で対応状況を確認し、ブラウザ名判定よりFeature Detectionを優先します。

## 実機確認

CIで代替できないもの:

- ペンタブ筆圧
- Windows固有機能
- 実MP3/MP4 Codec
- iPhone / Android Media挙動
- 実際の外部API通信
- Setup.exe
- 大量データ長期利用

これらは未確認なら必ず作業報告へ残します。

## Regression Test

一度修正した重大バグは、可能ならテストを追加して再発を防ぎます。

特に優先:
- データ消失
- 保存互換性
- 主要ボタン無反応
- 参照切れ
- 横overflow
- 旧Runtime再混入
- 誤った件数hardcode

## Manual Test Evidence

自動化しにくい重要項目を繰り返し確認するProjectでは、必要に応じてWork Report、`testing.md`、Issue等へ次を残します。

| Feature / State | Test | Expected | Result |
|---|---|---|---|
| | | | |

専用`testing.md`を全Projectへ必須にはしません。重要なのは、後から「何をどう確認したか」を再利用できることです。

API Failure、Rapid click、Offline、Orientation、Import失敗など、通常操作だけでは出ないStateも対象にします。

## Final-state Validation

テスト結果は、**ユーザーへ渡す最終Commit / Merge Commit**に対して成立している必要があります。

途中CommitでCIが成功していても、その後に以下を変更した場合は最終状態で再確認します。

- 一時Workflow / Scriptの削除
- Cache Revision
- Version / Build
- Asset Path
- README以外の設定ファイル
- Deployment設定
- Cleanup Commit

特にGitHub Pagesでは、途中のDeploy成功を最終状態のDeploy成功として扱いません。

可能なら次を確認します。

1. 最終Commit SHAを確認
2. そのCommitに対するCI結果を確認
3. GitHub Pages対応時は同じ最終CommitのDeploy結果を確認
4. 一時ファイルが残っていないことを確認

# 完成前チェック

## ファイル

- [ ] 必要ファイルが存在する
- [ ] 不要な重複Runtime / Patchがない
- [ ] 一時Script / 一時Workflow / Debug資産が残っていない
- [ ] ファイルPathが正しい
- [ ] 文字化けがない
- [ ] GitHub Pagesで404にならない構成になっている

## HTML / CSS / JavaScript

- [ ] JavaScript読込・実行エラーがない
- [ ] CSS読込エラーがない
- [ ] 主要ボタンが反応する
- [ ] リンク切れがない
- [ ] UIが致命的に画面外へはみ出さない
- [ ] 小さい画面で主要操作ができる
- [ ] fixed / sticky UIが重要操作を隠さない
- [ ] Consoleへ重大Errorが出ていない

## データ

- [ ] JSON構文が正しい
- [ ] JSONを実際に読み込める
- [ ] Schema / Manifestと実データが整合する
- [ ] 保存データ互換性を壊していない
- [ ] 設定やユーザーデータが意図せず消えない
- [ ] ImportデータをValidationしている

## GitHub Pages

- [ ] 相対Pathが正しい
- [ ] `fetch()`先が正しい
- [ ] ファイル名の大文字小文字が一致する
- [ ] `localhost`依存がない
- [ ] PC固有絶対Pathがない
- [ ] 公開ファイルへ秘密情報が入っていない
- [ ] 最終Commitに対するPages Deploy結果を確認した

## 既存機能

- [ ] 既存機能への影響を確認した
- [ ] localStorage / IndexedDB Keyへの影響を確認した
- [ ] 保存データとの互換性を確認した
- [ ] 共通Component / Event Listenerへの副作用を確認した
- [ ] import / fetch / URLへの影響を確認した

## Documentation

- [ ] READMEが現在仕様と一致する
- [ ] 必要な仕様書を更新した
- [ ] 作業報告書を更新した
- [ ] 既知の問題を記録した
- [ ] 確認できなかった項目を記録した

## Final State

- [ ] 最終Commit / Merge Commitを特定した
- [ ] 最終Commitに対するCI結果を確認した
- [ ] Cleanup後の状態でRegression確認した
- [ ] 途中Commitの成功結果を最終確認として流用していない

# 確認状態

確認状態は可能なら以下のように分けます。

- Implemented: 実装済み
- Static Validated: 構文・参照・Schema等を自動確認済み
- Browser Validated: 実ブラウザで主要導線確認済み
- Visual Reviewed: Design Direction / hierarchy / responsive / polishを画面で確認済み
- Real Device Validated: 実機 / OS固有機能確認済み
- User Validated: 実際の利用者が確認済み
- Unverified: 未確認
- Known Issue: 既知問題あり

Static Validation成功だけで「実機動作確認済み」「Visual Quality確認済み」と扱いません。

# 完成条件

以下を満たした場合に完成とします。

- 要求された主要機能が実装済み
- 通常利用に重大な問題がない
- 重大な既知バグがない
- 必要なREADME等が更新済み
- GitHub Pages対応サイトは公開可能な構成になっている
- 保存データを壊さない
- 一時資産をCleanupした最終状態で検証済み
- Visual Qualityが成果物の重要部分ならVisual Review済み
- 未確認事項が明示されている

主要機能が未実装の場合や、重大部分が未確認の場合は完成扱いにしません。
