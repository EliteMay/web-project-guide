# 04 UI / UX / Accessibility

## UIの基本

- 主要操作を最短で見つけられる構成にする。
- 情報を増やすことと常時表示することを分ける。
- 未実装機能は通常導線から外すか、開発中と明示する。
- Loading / Empty / Error / Success の4状態を考える。
- 0件画面には復帰操作を置く。

## Visual Design Quality

Visual Designの目的は、装飾量を増やすことではなく、**情報の関係・優先度・操作方法を視覚的に理解しやすくし、そのProjectらしい構造を作ること**です。

GitHub Primer / Microsoft Fluent / Apple Human Interface Guidelines等の公式Design Systemでも、Layout、Hierarchy、Typography、Spacing、Navigation、Purposeを基盤として扱っています。特定企業の見た目をコピーするのではなく、これらの考え方を判断材料として利用します。

### SHOULD: 色より構造で差別化する

複数ProjectのVisual差分を、Accent Color / Gradient / Backgroundの変更だけで済ませません。

Projectの目的に応じて、少なくとも次を設計対象として扱います。

- Header / Navigation
- Sidebar / Railの有無
- Content Width
- Grid / Columns
- Section構成
- 情報密度
- Typography hierarchy
- Spacing rhythm
- Card / List / Table / Panelの使い分け
- Image / Screenshot / Diagramの扱い
- Primary Actionの位置
- Secondary Informationの見せ方

似た機能のProjectでShellを再利用すること自体は問題ありません。ただし、**再利用できるComponentと、Project固有のPage Compositionを分けます。**

### Visual Qualityの優先順

Visual Qualityを高めるときは、原則として次の順で考えます。

1. Information Architecture
2. Workflow / Page Structure
3. Layout / Grid
4. Typography
5. Spacing
6. Visual Hierarchy
7. Component Consistency
8. Navigation / Responsive behavior
9. Color
10. Decorative Effects

`Gradient`, `Glassmorphism`, `Glow`, `Shadow`, `Rounded Corner`等を追加しただけで「高品質」と扱いません。

余白、文字サイズ・Weight、境界線、背景差、密度、Alignmentだけで十分な階層が作れるなら、Effectを追加しない選択も正解です。

## Design Direction

### CONDITIONAL: Visual Designが重要なProjectではCSSより先に方向を決める

Landing Page、Portfolio / Showcase、Media、一般公開Product、Visual Qualityを重視するTool等では、実装前に最低限次を整理します。

- **Design Concept:** 何を感じてほしいか / 何を最優先で見せるか
- **Reference Direction:** 実在SiteやDesign Systemから何を参考にするか。ただしコピー元にはしない
- **Layout Type:** single-column / split / sidebar / master-detail / editorial / dashboard等
- **Navigation Type:** top nav / sidebar / tabs / command bar等
- **Content Density:** low / medium / high
- **Typography Direction:** compact / editorial / product UI / display-heavy等
- **Color Rule:** neutral中心 / brand accent / semantic color等
- **Component Rule:** card中心にするのか、list / table / border / sectionを使い分けるのか
- **Decorative Effect Policy:** shadow / blur / gradient / motionを何のために使うか

結果へ大きく影響する場合は、**2〜3種類の構造的に異なるDesign Directionを比較してから1つを選びます。**

比較案は「青版 / 緑版 / 紫版」のような色違いではなく、Navigation、Density、Content Width、Grid、Typography、Primary Action等が実際に異なる案にします。

実在サービスは方向性を説明する語彙として参照できます。

例:

- GitHub / dense product UI方向: 高密度、明確なNavigation、List / Table / Panel中心
- Apple / visual showcase方向: 広い余白、強いVisual hierarchy、少ない同時情報
- Discord / Spotify等のservice UI方向: Product / Media / actual UIを前面に出す

これは「その企業のLayoutをコピーする」という意味ではありません。

## Subject-grounded Design

### SHOULD: Designの出発点を流行ではなく題材・利用者・実際のContentに置く

AIへ自由度だけ与えると、学習済みの頻出Patternへ戻りやすいため、Visual DirectionはProjectの中身から導きます。

実装前に次を言語化します。

- このProjectは何を扱うか
- 誰が、どんな状況で使うか
- このPageの単一のJobは何か
- この題材にしかないData / Media / Workflow / Object / Vocabularyは何か
- 何を見せれば「別のProductのScreenshotへ差し替えても成立するSite」ではなくなるか

例えばMedia SiteならArtwork / Player / Queue / Timeline、Data ToolならTable / Filter / Comparison、Game ToolならMap / Match / Loadout等、**題材固有のObjectをPage Compositionの中心へ置けないか**を先に考えます。

BrandやReference Siteから色・形だけを借りるより、実際のProduct UI、Data、Screenshot、Diagram、用語、利用フローをDesign Materialとして使う方を優先します。

### MAY: 1つのSignatureを決める

Visual Qualityが重要なProjectでは、ページ全体を派手にする代わりに、**そのProjectを覚えてもらう1つのSignature**を決める方法を使えます。

例:

- 実Dataを使った特徴的なVisualization
- Product固有のMaster-detail interaction
- 題材固有のTypography / labeling treatment
- 1か所だけ強いAsymmetry / motion / visual transition
- 実際のWorkflowを体験できるInteractive vignette

SignatureはDecorative Effectである必要はありません。Navigation、Content structure、Data representation、CopyのVoiceでも構いません。

「全部をBold」にせず、**大胆さを1〜2か所へ集中させ、残りを静かにする**ことも完成度を上げる方法です。

## Content / CopyもDesign Materialとして扱う

Placeholderの見出しとLorem IpsumでVisualだけを先に固定しすぎません。

- Headingは情報階層とNarrativeを作る。
- Button labelは次に起きるActionを具体的に伝える。
- Eyebrow / Number / Divider / LabelをDecorative fillerとして量産しない。
- `01 / 02 / 03`等の番号は、本当に順序・章・Stepを意味するときに使う。
- Error / Empty Stateは「失敗しました」だけでなく次の行動を示す。
- Product固有の言葉を必要以上にGeneric Marketing Copyへ薄めない。

Visual Reviewでは「文字を別Projectへ入れ替えても同じに見えるか」も確認します。

## AIへDesignを依頼するときのConstraint設計

### SHOULD: Fixed ConstraintsとCreative Axesを分ける

AIへのPromptは長ければ良いわけではありません。技術・互換性・既存仕様など**正確であるべき制約**は強く固定し、Visualとして探索したい軸は必要以上に固定しません。

### Fixed Constraintsの例

- HTML / CSS / JavaScript等のTechnology
- GitHub Pages対応
- 既存URL / Storage / ID互換
- Accessibility / Performance条件
- 必須画面 / 必須Data
- 既存Design System / Component API
- 変更してはいけないWorkflow

### Creative Axesの例

- Layout / Composition
- Typography personality
- Density
- Alignment
- Visual emphasis
- Image / Screenshot usage
- Color relationship
- Motion / Decorative Effect
- Signature element

`Dark mode + Inter + purple accent + centered 100vh Hero + CTA + Card Grid + Glass navbar + cursor glow`のように、目的と無関係なVisual DetailまでPromptで固定すると、AIの品質を上げるのではなくGeneric Templateを固定化する場合があります。

既存ProjectではCreative freedomより既存Design System整合を優先します。Greenfieldでは、Project固有の方向を探索できる余白を残します。

## Wireframe Before Visual Polish

### SHOULD: 色とEffectを外しても成立する構造を先に作る

Visual Design前に、少なくとも次の配置関係を決めます。

- Header
- Navigation
- Main Content
- Secondary Content
- Primary Action
- Detail / Supporting Information
- Footer（必要な場合）

推奨順序:

```text
Purpose / Workflow
→ Data / State
→ Information Architecture
→ Content outline
→ Wireframe / UI Structure
→ Design Direction
→ Typography / Spacing / Color
→ Decorative Effects
→ Visual Polish
```

これは [AP-020 Design Before Workflow](../catalog/anti-patterns.md) と同じ考え方です。Visualを重視する場合でも、Workflow / Data / UI Structureを飛ばして見た目から完成させません。

長いLanding Page / Narrative Pageでは、最初にHeadingと主要ActionだけをMarkdownやPlain Textで並べ、**Sectionの順番とStory rhythmがVisualなしでも成立するか**を見る方法も有効です。

## AI Template Lookを避ける

AIへ自由に「モダンで高品質なサイト」と指示すると、似た構成へ収束しやすいため、次を**理由なくセットで使わない**ようにします。

- Gradient背景
- Glassmorphism
- Glow / Neon
- 大量の角丸
- 大量のShadow
- ほぼすべてをCard化
- 不必要に巨大なHero
- Hero直下の等幅3 Feature Cards
- 全文を中央揃え
- 不必要に巨大なHeading
- EmojiをUI Iconとして大量利用
- Sectionごとに同じ「見出し + Card Grid」を反復
- 最後に必ず巨大CTAを置く
- 題材に関係なく同じ人気Font / Dark Theme / Accent combinationへ戻る
- 意味のないSection番号・Eyebrow・Badgeを「Design感」のために追加する

### 禁止ではない

これらの技術・Pattern自体は使用できます。

使う場合は「何のためか」が説明できることを目安にします。

例:

- Card: 独立して比較・選択・移動できる情報単位だから使う
- Shadow: SurfaceのElevationや一時Overlayを区別するために使う
- Rounded Corner: Design System上の一貫したShape languageとして使う
- Gradient: Brand / Data / Visual focal pointとして意味があるから使う
- Hero: First viewで1つのMessage / Product visualへ集中させる必要があるから使う

CardでなくSection / List / Table / Divider / Background differenceの方が情報関係を正しく表せるなら、そちらを優先します。

## Typography / Spacing / Hierarchy

### Typography

- Headingを大きくするだけで階層を作らない。
- Size / Weight / Line-height / Color / Spacingを組み合わせて役割を分ける。
- 同一Project内でType scaleをむやみに増やさない。
- 長い本文は原則として読みやすいAlignmentとLine lengthを優先する。
- Center alignmentは短い導入や局所的なFocusには使えるが、長文・高密度UIへ機械的に適用しない。
- HTMLのHeading hierarchyをVisual都合だけで壊さない。
- Popular Fontを使うこと自体は禁止しないが、毎Projectで同じFontをDefault採用する場合は理由を確認する。

### Spacing

- 余白は装飾ではなく、情報のGroupingとHierarchyを作る手段として扱う。
- 同じ関係の要素は近く、別Groupはより大きく離す。
- Spacing scale / CSS variables等を使い、毎回ランダムなmargin値にしない。
- すべてのSectionへ同じ上下余白を機械的に当てず、情報関係とRhythmを見る。

### Visual Hierarchy

次を同時に全部強調しません。

- Heading size
- Accent color
- Bold
- Shadow
- Border
- Glow
- Animation

最重要要素を決め、他は意図的に弱めます。

## Component Design

Componentの一貫性とPage構造の多様性を両立します。

- Button、Input、Dialog、Tabs等の同じ役割はProject内で一貫させる。
- すべてのContentを同じCard Componentへ押し込まない。
- Card / List / Table / Tabs / Detail Pane / Inline section等を情報の性質で選ぶ。
- 同じComponentを再利用しても、ページ全体のCompositionまで全Projectで同じにする必要はない。
- Decorative Variantを増やす前に、必要なSemantic Variantを整理する。
- Interactive Componentは必要に応じてdefault / hover / focus / active / disabled / loading / error等の状態を設計する。

## ProjectごとにVisual Structureを変える

「公式感のあるサイト = 1つのLayout」と定義しません。

Project Typeに応じて適切な構造を変えます。

| Project | 検討しやすい構造例 |
|---|---|
| Documentation | Sidebar / TOC / readable main column / search |
| Dashboard | Dense grid / table / filters / persistent context |
| Media | Large visual / player / queue / browsing structure |
| Tool | Task-first workspace / controls near output / minimal marketing sections |
| Landing Page | Narrative sections / product evidence / focused primary action |
| Data-heavy App | Search / filters / table / master-detail / comparison |
| Portfolio / Showcase | Editorial rhythm / project imagery / asymmetric composition |

これはTemplate指定ではありません。同じProject Typeでも内容・利用頻度・主要操作によって別構造を選べます。

実在サービスもDensityが一様ではありません。Visual Showcase型の余白をData-heavy Toolへ強制したり、NVIDIA / Microsoftのような広いProduct catalogの高密度Navigationを小規模Toolへ持ち込んだりしません。

## DesignShelfの活用

[DesignShelf](https://github.com/EliteMay/DesignShelf) は、完成サイトのTemplateを選ぶ場所ではなく、**Design Directionを構造属性へ分解して比較するCompanion Tool**として利用できます。

推奨Workflow:

1. 本GuideでPurpose / Workflow / Information Architectureを決める。
2. 色やEffectなしのWireframe / Content outlineを考える。
3. DesignShelfで2〜3個の**構造的に異なる候補**を比較する。
4. Layout IDそのものより、なぜその構造が合うかを属性で説明する。
5. 選んだ骨格をそのままコピーせず、Project固有のNavigation / Density / Primary Action / Contentへ変形する。
6. Structureが決まってからPaletteを選ぶ。
7. 最後にDecorative Effectを必要な範囲だけ追加する。

### DesignShelfで扱うと有効なDesign Axes

将来的には単一Layout選択より、次の軸を組み合わせてDirectionを作る方がTemplate固定化を防ぎやすくなります。

- Navigation Type: top / sidebar / rail / tabs / command
- Main Structure: single / split / master-detail / dashboard / editorial / layered
- Content Density: low / medium / high
- Alignment: centered / left / asymmetric / mixed
- Typography Direction: utility / product UI / editorial / display / data
- Visual Emphasis: content / product UI / image / media / data / motion
- Image Usage: none / supporting / dominant / product screenshot
- Component Density / Card reliance
- Spacing Rhythm: compact / balanced / generous
- Color Role: neutral + accent / brand-dominant / content-derived / semantic
- Effects: none / subtle depth / texture / contextual gradient / focused motion
- Signature: このProjectだけの記憶点

すべての組み合わせを総当たり生成するのではなく、Project ProfileとContentに合う組み合わせを2〜3案へ絞ります。

### DesignShelfを使うときの注意

- `中央Hero + 3 Cards`等の一般的な骨格も候補の1つとして残してよいが、AIのDefaultだから選ばない。
- Random提案は発想の入口として使い、完成判断にはしない。
- Paletteだけ変えて同じLayoutを再利用し続けない。
- 24 Layoutを「正解の一覧」と扱わない。必要なら混合・削除・変形する。
- DesignShelfの現在UIはPalette → Layoutの順でも、Guide運用では**Structure-firstで利用してよい**。
- Defaultへ収束しやすい属性CombinationはRiskとして表示してもよいが、自動禁止しない。

DesignShelfの理想的な出力は「Layout 02を使え」ではなく、`Navigation / Structure / Density / Typography / Visual emphasis / Component policy / Effect policy / Signature`を含むProject固有のDesign Direction Briefです。

## Visual Design Review Gate

### CONDITIONAL: Visual Qualityが重要な制作・大規模UI変更では、実装後に独立したVisual Reviewを行う

「要件を満たして動く」ことと「Design Directionが正しく実装され、完成度がある」ことを分けて確認します。

Reviewでは可能なら実際のDesktop / Mobile Screenshotまたは実ブラウザを見て、次を確認します。

### Context

- Purpose: このPageは何を解決するか
- User Task: 最短で何を達成すべきか
- Intended Design Direction: 実装前に決めた方向と一致しているか
- Signature: 記憶点がProject固有か、ただのEffectか

### Review Dimensions

- Information hierarchy
- Navigation / entry / exit / back path
- Primary Actionの明確さ
- Layout / alignment / section rhythm
- Typography hierarchy / line length / density
- Spacing / grouping
- Component semantic fit
- Repetition: 同型Section / Card Gridが続きすぎていないか
- Responsive時に単純縮小ではなく再構成されているか
- Accessibility / focus / contrast / states
- Motion / Gradient / Shadow等がDirectionに必要か
- Copy / LabelがGeneric placeholderのままではないか
- Existing Design System / tokensがある場合は逸脱していないか

### Review Result

Issueは重要度を分けます。

- **Blocking:** Task不能、重大Accessibility、Direction破綻、情報構造の根本問題
- **Major:** Hierarchy / Navigation / Responsive / repeated-template等、完成度を大きく下げる
- **Minor:** Polish、局所Spacing、微細なConsistency

Reviewは「もっとかっこよく」の感想だけで終わらせず、**場所・問題・理由・推奨修正**を具体的に残します。

Visual Reviewで問題が見つかった場合は、装飾を追加する前にStructure / Hierarchy / Typography / Spacingで直せないかを確認します。

## レスポンシブ

端末名ではなく、**内容が崩れる地点**をbreakpointにします。

原則:
- ページ全体の横スクロールを避ける。
- 表・タイムライン・大型編集領域など、必要な部分だけ局所スクロールを許可する。
- 320 CSS px相当の狭い画面でも主要情報と操作を失わないことを目標にする。
- PC専用UIでも、低い縦解像度・表示倍率125〜150%を確認する。
- 多言語化する場合は、翻訳で文字列が長くなっても主要操作が壊れないFlexible layoutを優先する。

## Internationalization / Text Direction

### CONDITIONAL: 多言語・RTL対応が必要なProjectのみ

- Document languageを`<html lang="...">`で明示する。
- Arabic / Hebrew等を扱う場合は`dir`をContentの意味として扱い、必要に応じてrootまたは局所Elementへ設定する。
- 日付・時刻・数値・通貨は可能なら`Intl` API等のlocale-aware formatterを使い、手書き文字列連結を減らす。
- TranslationでTextが長くなることを想定し、Button / Tab / Cardへ固定幅を押し付けすぎない。
- Icon / Image / Exampleに文化依存の意味がある場合は、そのまま全Localeへ流用してよいか確認する。

多言語対応しないProjectへi18n frameworkを機械的に導入する必要はありません。

## fixed / sticky

便利ですが、過去に操作阻害を何度も起こしたため慎重に使います。

確認項目:
- 小さい画面で主要ボタンを隠さない
- フォーカス中の要素を覆わない
- モーダルと競合しない
- 下部固定UIがカード上へ重ならない
- スクロール領域を必要以上に増やさない

## アクセシビリティ

WCAG 2.2 AAを参考に、個人用サイトでも実用上重要な項目を標準にします。

- `button`, `nav`, `main`, `header`, `label`など適切なHTML要素を使う
- 主要操作はキーボードでも可能にする
- `:focus-visible`を消さない
- 色だけで状態を表さない
- 通常文字は可能な限り4.5:1以上のコントラストを確保
- 小さすぎる操作対象を避け、最低24×24 CSS pxを意識する
- 重要操作は44px前後も検討する
- `prefers-reduced-motion`を尊重する
- `aria-pressed`, `aria-expanded`, `aria-live`等は必要な場所だけ正しく使う

## ボタンと入力

- `div onclick`をボタン代わりに多用しない
- 無効状態は理由が分かるようにする
- エラーは「エラー」だけでなく修正方法を表示する
- 破壊操作はUndo / 確認 / Backupのいずれかを持つ
- FormでPaste / Autofill等の標準操作を理由なく妨げない
- Loading中に二重送信が問題になる操作は、Stateを明確にして重複実行を防ぐ

## 自動処理

AI・Detector・Parserなどの自動結果は、必要に応じて以下を持たせます。

- Confidence
- 要確認状態
- 手動修正
- 元データへ戻れる導線

自動判定を絶対正解として扱わないことを基本とします。
