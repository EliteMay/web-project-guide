# 17 Visual Quality Baseline

この章は、**ユーザーが見るUIの見た目を「重要ならやる追加要素」ではなく、完成に必要な最低品質として扱うBaseline**です。

詳細なDesign Direction / Typography / Spacing / Component / Accessibilityは [04 UI / UX / Accessibility](04-ui-ux-accessibility.md)、大規模Visual変更前の調査・Redesign・Foundation Resetは [18 Domain-first Visual Research](18-domain-first-visual-research.md) を正本とします。

この章では、それらの手順を複製せず**最低限の完成Gate**だけを定義します。

## 基本原則

### MUST: User-facing UIはVisual Quality Baselineを満たす

Webサイト、Web App、Electron renderer等でユーザーが直接見る画面がある場合、Visual Qualityを完成条件から外しません。

Guideの基本優先順位で「見た目」が6番目なのは、安定性・保存互換性・操作性等と衝突したときのTrade-off順です。

次の意味ではありません。

- 見た目は最後なので未調整でよい
- 機能が動けばPrototype感が残っていても完成
- AIが生成した初期CSSをそのまま完成扱いする
- Static Validationが通ればVisual確認を省略できる

## Visual AmbitionとBaselineを分ける

### Baseline — MUST

すべてのUser-facing UIで必要です。

目的は派手にすることではなく、**雑・未完成・不統一・操作しにくい見た目を完成品として残さないこと**です。

### High / Flagship — CONDITIONAL

Landing Page、Portfolio、Showcase、Media、一般公開Product、Visual自体が価値になるTool等では、Baselineに加えて次を検討します。

- Domain / Genre Research
- 構造的に異なるDesign Direction比較
- Project固有Signature
- より強いTypography / Artwork / Motion設計
- 独立Visual Design Review

詳細は [18 Domain-first Visual Research](18-domain-first-visual-research.md) → [04 UI / UX / Accessibility](04-ui-ux-accessibility.md) の順で確認します。

## Domain Research Gate

### MUST: 意味のあるVisual Direction変更ではDomain Researchを先に行う

Page Composition、Navigation、Theme、Workspace構造、Visual Direction等を大きく変える場合は、[18 Domain-first Visual Research](18-domain-first-visual-research.md) を先に確認します。

この章へResearch手順を再掲しません。

局所的なAlignment / overflow / clipping / Contrast等、原因と正解が明確なBugでは毎回Web Researchを要求しません。

## Minimum Visual Quality Gate

User-facing UIでは、完成前に少なくとも次を確認します。

### 1. Hierarchy

- Primary Action / Main Content / Secondary Informationの強弱が分かる
- 重要度が全部同じ見た目になっていない
- 色を外しても主要な構造を理解できる
- 見出しを大きくするだけでHierarchyを作っていない

### 2. Typography

- Font size / Weight / Line-height / Colorが同じ役割で一貫している
- 小さすぎる補助文字、詰まりすぎた行間、長すぎるLine lengthを放置していない
- 日本語 / 英語 / 数字が混ざっても極端に崩れない

### 3. Spacing / Alignment

- 同じGroupは近く、別Groupは明確に離れている
- Margin / Paddingが場当たり的に揺れていない
- Baseline / Edge / GridのAlignmentが明らかに崩れていない
- 空きを埋めるだけ、詰められるだけでDensityを決めていない

### 4. Component Consistency

- Button / Input / Dialog / Tab / List等の同じ役割が同じVisual languageを使う
- Radius / Border / Shadow / Background / Icon sizeが理由なくバラバラでない
- Browser defaultとCustom UIが未完成な形で混在していない
- hover / focus-visible / active / selected / disabled等、実際に存在する主要Stateが見分けられる

### 5. Responsive Visual Quality

- Desktop Layoutを単純に縮小して潰していない
- 主要Action / Navigationが小画面で消えない
- Text clipping / unintended overflow / broken alignmentを放置していない
- 低い縦解像度やZoomでfixed / sticky UIが重要操作を隠さない

### 6. AccessibilityをVisualと分離しない

- Contrast不足を雰囲気で正当化しない
- Focus indicatorをDesign上の邪魔として消さない
- 色だけで状態を表さない
- 小さすぎる操作Targetを「ミニマル」として残さない

### 7. Prototype / AI Draft感を残さない

次のような状態は、機能が動いていてもVisual完成扱いにしません。

- Temporary label / placeholder / Debug UIが通常導線に残る
- Accent Colorだけ変えた既視感の強いTemplate
- 理由なく巨大Hero / 3 Cards / Gradient / Glass / Glow / CTAが束で並ぶ
- 余白・文字・Icon・Borderの仕上げが画面ごとに揺れる
- 実ContentではなくGeneric Copyで画面を埋めている

AI Template Lookの詳細は [04 UI / UX / Accessibility](04-ui-ux-accessibility.md#ai-template-lookを避ける) を参照します。

## Visual Verification

### MUST: 見た目を変更したら最終状態を目で確認する

新しいUser-facing UIを作成した場合、またはLayout / Typography / Navigation / Component Styleを意味のある範囲で変更した場合、Static ValidationだけでVisual完成扱いにしません。

可能なら最終Commit相当の状態で、主用途Viewportを少なくとも1つ実ブラウザまたはScreenshotで確認します。

最低限確認するもの:

- First View
- Main Task / Primary Action
- Navigation
- Typography
- Spacing / Alignment
- Overflow / clipping
- Interactive State
- Responsive優先順位

Browser / Screenshotを確認できない環境では、**Visual未確認**として作業報告へ残します。

### High / Flagshipでは独立Visual Review

Visual AmbitionがHigh / Flagshipの場合は、[Visual Design Review Gate](04-ui-ux-accessibility.md#visual-design-review-gate)を別工程で実施します。

Blocking Findingが残る場合はVisual完成扱いにしません。

## Validated Visual Directions

過去の高評価Visualは [Validated Visual Direction Catalog](../catalog/validated-visual-directions.md) にEvidenceとして蓄積します。

ただしCatalogはBaselineやDomain Researchの代わりではありません。

使い方の正本は [18 Domain-first Visual Research](18-domain-first-visual-research.md) です。

## Visual Foundation Reset

局所修正を重ねても全体品質が上がらない場合は、Patchを続けるのではなくFoundation Resetを検討します。

**判断基準・戻る順序・保持する機能 / 作り直すUI範囲の正本は [18 Domain-first Visual Research](18-domain-first-visual-research.md#visual-foundation-reset) です。**

このAnchorは既存Catalog / Referenceからの互換Linkとして残しますが、詳細Ruleはここへ複製しません。

## 変更規模ごとの適用

### 小規模Bug Fix

Visualに触れていなければ既存画面全体のRedesignを要求しません。

UIへ触れた場合は変更箇所のAlignment / State / Overflow等が悪化していないか確認します。

### 軽微UI改善

変更したComponent周辺でBaselineを確認します。

### 新規Page / 大規模UI変更

Baseline全項目に加え、[18 Domain-first Visual Research](18-domain-first-visual-research.md) を確認します。

### 既存の見た目が明らかに低品質なProject

別目的のBug修正だけで全面Redesignはしません。

Visual debtを既知Issue / Work Reportへ残し、次の意味あるUI改修時に局所改善かFoundation Resetかを判断します。

## 完成判定

User-facing UIがあるProjectでは、次を満たさない状態を「見た目まで完成」と表現しません。

- 主要Hierarchyが明確
- Typography / Spacing / Componentが一貫
- 明らかな崩れ・未調整・Prototype感がない
- 主ViewportでVisualを確認済み、または未確認を明記
- Accessibility上のBlocking Visual Issueがない

Visual AmbitionがHigh / Flagshipの場合は、これに加えてVisual Design Reviewが`Pass`であることを目標にします。
