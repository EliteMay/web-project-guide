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
→ Wireframe / UI Structure
→ Design Direction
→ Typography / Spacing / Color
→ Decorative Effects
→ Visual Polish
```

これは [AP-020 Design Before Workflow](../catalog/anti-patterns.md) と同じ考え方です。Visualを重視する場合でも、Workflow / Data / UI Structureを飛ばして見た目から完成させません。

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

## DesignShelfの活用

[DesignShelf](https://github.com/EliteMay/DesignShelf) は、完成サイトのTemplateを選ぶ場所ではなく、**構造と配色を分解して比較するCompanion Tool**として利用できます。

推奨Workflow:

1. 本GuideでPurpose / Workflow / Information Architectureを決める。
2. 色やEffectなしのWireframeを考える。
3. DesignShelfで2〜3個の**構造的に異なるLayout骨格**を比較する。
4. 選んだ骨格をそのままコピーせず、Project固有のNavigation / Density / Primary Action / Contentへ変形する。
5. Structureが決まってからPaletteを選ぶ。
6. 最後にDecorative Effectを必要な範囲だけ追加する。

### DesignShelfを使うときの注意

- `中央Hero + 3 Cards`等の一般的な骨格も候補の1つとして残してよいが、AIのDefaultだから選ばない。
- Random提案は発想の入口として使い、完成判断にはしない。
- Paletteだけ変えて同じLayoutを再利用し続けない。
- 24 Layoutを「正解の一覧」と扱わない。必要なら混合・削除・変形する。
- DesignShelfの現在UIはPalette → Layoutの順でも、Guide運用では**Structure-firstで利用してよい**。

将来的なDesignShelf改善では、Layout-first mode、Design Direction、複数Layout比較、AI Template Risk表示等を検討します。

## レスポンシブ

端末名ではなく、**内容が崩れる地点**をbreakpointにします。

原則:
- ページ全体の横スクロールを避ける。
- 表・タイムライン・大型編集領域など、必要な部分だけ局所スクロールを許可する。
- 320 CSS px相当の狭い画面でも主要情報と操作を失わないことを目標にする。
- PC専用UIでも、低い縦解像度・表示倍率125〜150%を確認する。

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

## 自動処理

AI・Detector・Parserなどの自動結果は、必要に応じて以下を持たせます。

- Confidence
- 要確認状態
- 手動修正
- 元データへ戻れる導線

自動判定を絶対正解として扱わないことを基本とします。
