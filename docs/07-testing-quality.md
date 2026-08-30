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

## 完成前チェック

- 文字化けなし
- JS読込エラーなし
- JSON読込エラーなし
- リンク切れなし
- 必須ファイル不足なし
- 主要ボタン反応
- 画面外への致命的はみ出しなし
- 保存データを意図せず消さない
- READMEと現行実装が一致
