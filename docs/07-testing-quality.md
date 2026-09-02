# 07 Testing / Quality

この章は**Testing戦略と検証状態の考え方**を定義する正本です。

実際の完成前チェック項目は [Quality Checklist](../templates/QUALITY_CHECKLIST.md) を正本とし、この章へ同じChecklistを複製しません。

## 基本方針

「コードが書けた」と「使える」は別です。

自動Testで防げる問題と、実ブラウザ・実機・Visual Review・User Testでしか確認できない問題を分けます。

## 最低限のStatic Validation

GitHub Actions等で可能なら、変更内容に応じて次を自動確認します。

- JavaScript / MJS構文
- JSON構文
- HTML内のローカル参照切れ
- 必須ファイル存在
- ID重複
- Schema必須値
- Manifest件数
- 廃止Runtimeの再混入
- 公開JSONへのData URL / 秘密情報混入

すべてのProjectへ同じValidatorを強制せず、Project Contractに合うものだけを使います。

## Unit Test

Pure Functionにできる処理はブラウザUIから切り離してTestします。

例:

- Timestamp Parser
- 同期補間
- Score計算
- Migration
- Normalize / Validate
- URL解析
- Detector後処理

## E2E / Smoke Test

主要利用フローは実ブラウザで最後まで通せると強いです。

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

UIが重要なSiteでは、変更内容に応じてNavigation / overflow / fixed UI / Canvas geometry /主要Button visibility等も確認します。

## Specification / Oracle Test

AI生成量が多いProject、既存実装の移植、互換性が重要な処理では、可能なら「正しい出力」を比較できるOracleを作ります。

例:

- Golden Output
- Reference implementationとの同一入力比較
- Regression Dataset
- Schema / Contract Test
- Snapshot / Geometry基準
- 保存→再読込→復元E2E

AIがCodeを書いたか人間が書いたかではなく、**期待結果を再現可能に判定できるか**を重視します。

Oracle自体が誤っている可能性もあるため、Reference更新時は理由と影響を残します。

## Visual Design Review

Visual Qualityが重要なProjectでは、機能Testと別に [Visual Design Review Gate](04-ui-ux-accessibility.md#visual-design-review-gate) を実施します。

自動Testだけでは次を十分に判定できません。

- Project固有の情報構造になっているか
- Primary ActionとHierarchyが自然か
- AI Template Lookへ戻っていないか
- Typography / Spacing / DensityがContentへ合うか
- Card / List / Table等のComponent選択が適切か
- Responsive時にPriorityを再構成できているか

Findingは必要に応じて `Blocking / Major / Minor` で整理します。

Blockingが残る場合はVisual完成扱いにしません。

Visualの最低品質は [Visual Quality Baseline](17-visual-quality-baseline.md)、大規模Redesign前のResearchは [Domain-first Visual Research](18-domain-first-visual-research.md) を確認します。

## 対応ブラウザ

最低でも主要用途に合わせてFirefox / Chromiumを意識します。

新しいWeb API / CSSはMDN Baseline等で対応状況を確認し、ブラウザ名判定よりFeature Detectionを優先します。

## 実機確認

CIで代替できないものがあります。

例:

- ペンタブ筆圧
- Windows固有機能
- 実MP3 / MP4 Codec
- iPhone / Android Media挙動
- 実際の外部API通信
- Setup.exe
- 大量データ長期利用

未確認なら作業報告へ残します。

Static Validation成功をReal Device Validationへ読み替えません。

## Regression Test

一度修正した重大Bugは、可能ならTest / Validator / Guardを追加して再発を防ぎます。

特に優先:

- データ消失
- 保存互換性
- 主要ボタン無反応
- 参照切れ
- 横overflow
- 旧Runtime再混入
- 誤った件数hardcode

Test化しにくいVisual / 実機Bugでは、再現手順・Screenshot比較・確認Checklist等をRegression Guardにできます。

## Final-state Validation

テスト結果は、**ユーザーへ渡す最終Commit / Merge Commit**に対して成立している必要があります。

途中CommitでCIが成功していても、その後に次を変更した場合は最終状態で再確認します。

- 一時Workflow / Scriptの削除
- Cache Revision
- Version / Build
- Asset Path
- 設定 / Deployment
- Cleanup Commit

推奨順序:

```text
最終Commit SHAを確認
→ そのCommitのCI / Testを確認
→ Pages対応時は同じCommitのDeployを確認
→ 一時資産が残っていないことを確認
```

## Verification State

確認状態は可能なら次のように分けます。

- **Implemented** — 実装済み
- **Static Validated** — 構文・参照・Schema等を自動確認済み
- **Browser Validated** — 実ブラウザで主要導線確認済み
- **Visual Reviewed** — Design Review Gateを実施済み
- **Real Device Validated** — 実機 / OS固有機能確認済み
- **User Validated** — 実際の利用者が確認済み
- **Unverified** — 未確認
- **Known Issue** — 既知問題あり

Verification Stateを必要以上に高く表現しません。

## 完成前の実行項目

この章ではChecklist本文を持ちません。

完成前は [Quality Checklist](../templates/QUALITY_CHECKLIST.md) をProject Profile / 変更内容に合わせて使用します。

Checklist側にはHTML / CSS / JS、Visual、Data / Storage、GitHub Pages、Accessibility、Performance、AI-assisted、Electron等の実行項目を集約します。

## 完成条件

「完成」の共通判断は、次を満たすことを基本とします。

- 要求された主要機能が実装済み
- 通常利用に重大な問題がない
- 重大な既知Bugがない
- 必要な文書が現在仕様と一致
- 保存データを意図せず壊さない
- Cleanup後の最終状態で必要なValidationを実施
- User-facing UIはVisual Quality Baselineを満たす
- 未確認事項が明示されている

個別の確認項目は [Quality Checklist](../templates/QUALITY_CHECKLIST.md) を正本とします。
