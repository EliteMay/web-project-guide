# 07 Testing / Quality

## 基本方針

「コードが書けた」と「使える」は別です。

自動テストで防げる問題と、実ブラウザ・実機でしか確認できない問題を分けます。

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
- Real Device Validated: 実機 / OS固有機能確認済み
- User Validated: 実際の利用者が確認済み
- Unverified: 未確認
- Known Issue: 既知問題あり

Static Validation成功だけで「実機動作確認済み」と扱いません。

# 完成条件

以下を満たした場合に完成とします。

- 要求された主要機能が実装済み
- 通常利用に重大な問題がない
- 重大な既知バグがない
- 必要なREADME等が更新済み
- GitHub Pages対応サイトは公開可能な構成になっている
- 保存データを壊さない
- 一時資産をCleanupした最終状態で検証済み
- 未確認事項が明示されている

主要機能が未実装の場合や、重大部分が未確認の場合は完成扱いにしません。
