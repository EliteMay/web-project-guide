# 17 Visual Quality Baseline

この章は、**ユーザーが見るUIの見た目を「重要ならやる追加要素」ではなく、完成に必要な最低品質として扱うためのBaseline**です。

詳細なDesign Direction、Typography、Spacing、AI Template Look、Visual Reviewの考え方は [04 UI / UX / Accessibility](04-ui-ux-accessibility.md) を正本とします。

この章はそれらを重複させず、**何が最低限MUSTか**だけを定義します。

## 基本原則

### MUST: User-facing UIはVisual Quality Baselineを満たす

Webサイト、Web App、Electron renderer等でユーザーが直接見る画面がある場合、Visual Qualityを完成条件から外しません。

Guideの基本優先順位で「見た目」が6番目なのは、**安定性・保存互換性・操作性等と衝突したときのTrade-off順**を示すものです。

次の意味ではありません。

- 見た目は最後なので未調整でよい
- 機能が動けばPrototype感が残っていても完成
- Visual ReviewはLanding Pageだけの作業
- AIが生成した初期CSSをそのまま完成扱いする

## Visual AmbitionとBaselineを分ける

Visual Qualityには2段階あります。

### Baseline — MUST

すべてのUser-facing UIで必要です。

目的は「派手にする」ことではなく、**雑・未完成・不統一に見えない状態を保証すること**です。

### High / Flagship — CONDITIONAL

Landing Page、Portfolio、Showcase、Media、一般公開Product、Visual自体が価値になるTool等で適用します。

- 構造的に異なるDesign Direction比較
- Project固有Signature
- Reference Site分析
- より強いTypography / Artwork / Motion設計
- 独立したVisual Design Review

等は [04 UI / UX / Accessibility](04-ui-ux-accessibility.md) の詳細Ruleへ進みます。

**HighでないからVisualを省略する、とは扱いません。**

## Validated Visual Directions

### SHOULD: 実Projectで良かったVisualを「複数の正解候補」として蓄積する

Userから見た目について明確な肯定的Feedbackがあり、実Project上でも再利用価値を説明できる場合、そのDesignを**万能TemplateではなくValidated Visual Direction**として記録できます。

正本は [Validated Visual Direction Catalog](../catalog/validated-visual-directions.md) です。

重要なのは、1つの成功例を全Projectの標準Layoutへしないことです。

- Purpose / Workflow / Content model / Densityが近いProjectだけで参考にする。
- Accent Colorや具体的なCSS値ではなく、成功した構造・Hierarchy・Navigation・Component semanticsを抽出する。
- 別のProjectで別の良いDirectionが見つかったら、既存Directionへ無理に寄せず新しい候補を増やす。
- User validationがあっても、Responsive / Accessibility / Stability等の共通Baselineは別途満たす。
- 色違いだけは新しいDirectionとして数えない。
- 最新main / CI成功 / Assistant自己評価だけではValidated Directionへ昇格しない。
- 低評価Candidateも削除して忘れず、Rejected Evidenceとして「なぜ失敗したか」を残す。

Guideの目標は「正解の見た目を1つ決めること」ではなく、**用途別に複数の強いVisual Directionと失敗Evidenceを持ち、Projectごとに正しく選べること**です。

### SHOULD: 既存SiteのRedesign前にKEEP / FIX / REMOVEを決める

既に使われているSiteを大きくRedesignする場合、現在のUIを全部「古いもの」として捨てません。

```text
KEEP   = Userが価値を感じている / Task上すでに機能している
FIX    = 役割は必要だがHierarchy / Spacing / Consistency等に問題がある
REMOVE = Task / Contentに不要、または明確に邪魔
```

特に、過去にUserが褒めたColor identity、分かりやすいAction、Artwork / Screenshot、慣れたNavigation、親しみやすさ等は`KEEP`候補として先に明示します。

別Projectの成功例を参照するときは、[Validated Visual Direction Catalog](../catalog/validated-visual-directions.md)のEvidence Levelと`Transfer / Rebuild / Do not copy`を確認します。

**成功Projectで「減らしたもの」を、Targetでも減らすべきものだと決めつけません。**

## Minimum Visual Quality Gate

User-facing UIでは、完成前に少なくとも次を確認します。

### 1. Hierarchy

- Primary Action / Main Content / Secondary Informationの強弱が分かる
- 重要度が全部同じ見た目になっていない
- 色を外しても主要な構造が理解できる
- 見出しを大きくするだけでHierarchyを作っていない

### 2. Typography

- Font size / Weight / Line-height / Colorに役割の一貫性がある
- 同じ役割の文字Styleが画面ごとに無意味に変わらない
- 小さすぎる補助文字、詰まりすぎた行間、長すぎるLine lengthを放置しない
- 日本語 / 英語 / 数字が混ざっても極端に崩れない

### 3. Spacing / Alignment

- 同じGroupは近く、別Groupは明確に離れている
- Margin / Paddingが場当たり的に揺れていない
- Baseline / Edge / GridのAlignmentが明らかに崩れていない
- 「空いているから埋める」「詰められるから詰める」でDensityを決めない

### 4. Component Consistency

- Button / Input / Dialog / Tab / List等の同じ役割は同じVisual languageを使う
- Radius / Border / Shadow / Background / Icon sizeが理由なくバラバラになっていない
- Native Controlを使う場合も意図的に使い、半分だけCustom Styleの未完成状態を残さない
- Hover / focus-visible / active / selected / disabled等、実際に存在する状態が見分けられる

### 5. Responsive Visual Quality

- Desktop Layoutを単純に縮小して潰していない
- 主要ActionやNavigationが小画面で消えない
- Text overflow / clipped control / unintended horizontal scrollを放置しない
- 低い縦解像度やZoomでFixed / Sticky UIが重要操作を隠さない

### 6. AccessibilityをVisualと分離しない

- Contrast不足を「雰囲気」で正当化しない
- Focus indicatorをDesign上の邪魔として消さない
- 色だけで状態を表さない
- 小さすぎる操作Targetを「ミニマル」として残さない

### 7. Prototype / AI Draft感を残さない

次のような状態は、機能が動いていてもVisual完成扱いにしません。

- Browser defaultとCustom UIが無計画に混在
- Temporary label / placeholder / Lorem Ipsumが主要画面に残る
- Debug用Buttonや仮Sectionが通常導線に見える
- Accent Colorだけ変えた既視感の強いTemplate
- 理由なく巨大Hero / 3 Cards / Gradient / Glass / Glow / CTAが並ぶ
- 余白・文字・Icon・Borderの仕上げが画面ごとに違う

AI Template Lookの詳細は [04 UI / UX / Accessibility](04-ui-ux-accessibility.md#ai-template-lookを避ける) を参照します。

## Visual Verification

### MUST: 見た目を変更したら最終状態を目で確認する

新しいUser-facing UIを作成した場合、またはLayout / Typography / Navigation / Component Styleを意味のある範囲で変更した場合、Static ValidationだけでVisual完成扱いにしません。

可能なら最終Commit相当の状態で、主用途Viewportを少なくとも1つ実ブラウザまたはScreenshotで確認します。

確認対象:

- First View
- Main Task
- Navigation
- Typography
- Spacing
- Alignment
- Overflow
- Interactive State
- Responsive優先順位

Browser / Screenshotを確認できない環境では、**Visual未確認**として作業報告へ残します。

### High / Flagshipでは独立Visual Review

Visual AmbitionがHigh / Flagshipの場合は、[Visual Design Review Gate](04-ui-ux-accessibility.md#visual-design-review-gate)を別工程で実施します。

Blocking Findingが残る場合はVisual完成扱いにしません。

## Visual Foundation Reset

### SHOULD: 局所修正を重ねても良くならない場合はPatchを止め、基礎から再設計する

見た目の問題に対して、小さなCSS修正・余白調整・色変更・Card追加・Effect追加を繰り返しても全体品質が上がらない場合、**既存UIを守りながらPatchを続けること自体を目的にしません。**

次のような状態では、部分修正よりFoundation Resetを優先して検討します。

- 同じ画面を何度直しても「まだ微妙」という状態が続く
- 問題が1 Componentではなく、Information Architecture / Layout / Density / Typography / Hierarchy / Navigationへ広がっている
- 1箇所のSpacingやSizeを直すと別の場所のBalanceが崩れる
- Component単体は整っているのに、Page Composition全体として弱い
- Override / 例外CSS / 個別Patchが増え、何が正しいLayoutか分かりにくくなっている
- Decorative Effectを足すほど見た目は変わるが、使いやすさや構造の納得感が上がらない

Foundation Resetでは、原則として次の順に戻ります。

```text
Purpose / User Task
→ Content / Data / State
→ Information Architecture
→ Navigation / Main Structure
→ Wireframe
→ Design Direction
→ Typography / Spacing / Hierarchy
→ Color / Effect
→ Rebuild UI
→ Visual Verification
```

重要なのは、**「一から作り直す」= Project全体のコードを捨てる、ではない**ことです。

原則として保持するもの:

- 正しく動いている機能
- Data / Storage / Migration Contract
- API / URL / Release Contract
- 検証済みBusiness Logic
- Accessibility / Performance / Security上の既存要件
- 再利用価値のあるComponentやAsset

白紙に戻してよいもの:

- Page Composition
- Header / Navigation構造
- Content Width / Grid / Columns
- Density
- Visual Hierarchy
- Typography direction
- Card / List / Table等の表現方法
- Spacing rhythm
- Color / Decorative Effect

つまり、**安定している中身は残し、失敗している見た目の土台だけを再設計する**ことを基本とします。

小規模な崩れや原因が明確なComponent Bugまで毎回全面Redesignする必要はありません。一方で、基礎構造が原因だと分かっているのに「今まで作ったから」という理由だけでPatch Loopを続けることも避けます。

目安として、局所修正の追加コストと複雑さが、Wireframeから再設計するコストを上回り始めたら、Foundation Resetへ切り替えます。

CandidateがCurrent UIを明確に上回らず、同じ違和感を複数回修正している場合も、Polishを継続するよりFoundation Resetを優先します。

## 変更規模ごとの適用

### 小規模Bug Fix

Visualに触れていなければ、既存画面全体のRedesignを要求しません。

ただし変更箇所のAlignment / State / Overflowが悪化していないか確認します。

### 軽微UI改善

変更したComponent周辺でBaselineを確認します。

### 新規Page / 大規模UI変更

Baseline全項目を確認し、必要に応じてHigh / FlagshipのDesign Directionへ進みます。

### 既存の見た目が明らかに低品質なProject

別目的のBug修正だけで全面Redesignはしません。

ただしVisual debtを既知Issue / Work Reportへ残します。次の意味あるUI改修時には、局所改善で十分か、[Visual Foundation Reset](#visual-foundation-reset)へ切り替えるべきかを先に判断します。

同じ種類のVisual修正を複数回行っても全体評価が改善しない場合は、段階的PatchをDefaultにせず、Purpose / Information Architecture / Layoutからの再設計を優先します。

## 完成判定

User-facing UIがあるProjectでは、次を満たさない状態を「見た目まで完成」と表現しません。

- 主要Hierarchyが明確
- Typography / Spacing / Componentが一貫
- 明らかな崩れ・未調整・Prototype感がない
- 主ViewportでVisualを確認済み、または未確認を明記
- Accessibility上のBlocking Visual Issueがない

Visual AmbitionがHigh / Flagshipの場合は、これに加えてVisual Design Reviewが`Pass`であることを目標にします。
