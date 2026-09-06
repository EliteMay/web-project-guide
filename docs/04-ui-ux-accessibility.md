# 04 UI / UX / Accessibility

この章は一般的なUI / UX / Accessibility / Visual Design principleの正本です。Meaningful Visual ChangeのResearch / Candidate比較 / Foundation Resetは [18 Domain-first Visual Research](18-domain-first-visual-research.md)、最低完成Gateは [17 Visual Quality Baseline](17-visual-quality-baseline.md) を正本とします。

## UIの基本

- 主要操作を最短で見つけられる構成にする。
- 情報を増やすことと常時表示することを分ける。
- 未実装機能は通常導線から外すか、開発中と明示する。
- Loading / Empty / Error / Success等、実際に必要なStateを考える。
- 0件画面には復帰操作を置く。

## Visual Design Quality

Visual Designの目的は装飾量を増やすことではなく、**情報の関係・優先度・操作方法を視覚的に理解しやすくし、そのProjectらしい構造を作ること**です。

公式Design System等のLayout、Hierarchy、Typography、Spacing、Navigation、Purposeを判断材料として使えますが、特定企業の見た目をTemplateとしてコピーしません。

### SHOULD: 色より構造で差別化する

複数ProjectのVisual差分をAccent Color / Gradient / Background変更だけで済ませません。

Projectの目的に応じて次を設計対象として扱います。

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

似た機能でShellを再利用しても構いませんが、**再利用ComponentとProject固有Page Compositionを分けます。**

### Visual Qualityの優先順

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

Gradient / Glass / Glow / Shadow / Rounded Corner等を追加しただけで高品質と扱いません。

余白、Type、境界、背景差、密度、Alignmentだけで十分なHierarchyが作れるならEffectを足さない選択も正解です。

## Design Direction

### CONDITIONAL: Visual Designが重要なProjectではCSSより先に方向を決める

Landing Page、Portfolio / Showcase、Media、一般公開Product、Visual Qualityを重視するTool等では実装前に最低限次を整理します。

- Design Concept
- Reference Direction
- Layout Type
- Navigation Type
- Content Density
- Typography Direction
- Color Rule
- Component Rule
- Decorative Effect Policy

結果へ大きく影響する場合は、**2〜3種類の構造的に異なるDesign Directionを比較**してから選びます。

色違いだけを別Directionと数えません。Navigation、Density、Content Width、Grid、Typography、Primary Action等が実際に異なる案にします。

実在Serviceは方向を説明する語彙として参照できますが、そのLayoutをコピーする意味ではありません。

### SHOULD: 題材からDesignを導く

`modern` / `premium` / `clean`等の抽象語だけでVisualを決めません。

先に見る材料:

- Userが普段使う語彙
- Content / Data / Mediaの形
- 一番繰り返すTask
- 題材固有のDiagram / Screenshot / Artwork / Map / Timeline等
- 比較・探索・編集・閲覧等のTask性質
- 利用頻度と情報密度

Referenceからは色・角丸・Heroではなく、Audience / Job / Content Model / Navigation / Density / Proof / Component choice / Effectの理由を抽象化します。

### SHOULD: Signatureは1つを明確にする

Visualが重要なProjectでは必要に応じて「このProjectらしさを一番表す要素」を1つ決めます。

例:

- 実Dataを主役にしたVisualization
- 題材に合うNavigation / Timeline
- 固有Artwork / Screenshot treatment
- 読みやすい特徴的Typography
- Taskに直結したWorkspace composition

複数箇所を同時に奇抜にせず、1つのSignatureを規律あるDesign Systemで支える方針を基本とします。

### AI Promptでは固定するものと探索させるものを分ける

先に固定しやすいもの:

- Purpose / User / Required Content
- 必須機能 / Workflow
- Technology / Deployment制約
- Accessibility / Performance / Security
- 崩してはいけない仕様
- 既存Design SystemのToken / Component契約

Visual決定前に固定しすぎないもの:

- Heroの有無 / 高さ
- Card Grid列数
- Alignment
- Navigation Type
- Density
- Typography personality
- Image emphasis
- Gradient / Glass / Glow / Shadow
- CTA数と配置

完成形をPromptで固定してから「独自Design」にする矛盾を避けます。

## Wireframe Before Visual Polish

### SHOULD: 色とEffectを外しても成立する構造を先に作る

最低限:

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
→ Design Plan Critique
→ Typography / Spacing / Color
→ Decorative Effects
→ Build
→ Visual Design Review
```

[AP-020 Design Before Workflow](../catalog/anti-patterns.md) と同じく、Visual重視でもWorkflow / Data / Structureを飛ばしません。

### Design Plan Critique

CSS本格実装前に必要に応じて確認します。

- 別の無関係Projectへほぼそのまま使えるPlanになっていないか
- Content / Task / Audience固有の理由がLayoutに出ているか
- Primary Actionと重要情報が装飾なしでも分かるか
- 抽象語をEffectで埋めていないか
- Companion tool / ReferenceのSkeletonを完成Templateとしてコピーしていないか

Genericなら実装量を増やす前にDirectionを修正します。

## AI Template Lookを避ける

次を**理由なく束で使わない**ようにします。

- Gradient背景
- Glassmorphism
- Glow / Neon
- 大量の角丸
- 大量のShadow
- ほぼすべてをCard化
- 不必要に巨大なHero
- Hero直下の等幅3 Feature Cards
- 全文Center alignment
- 不必要に巨大なHeading
- EmojiをUI Iconとして大量利用
- Sectionごとの同一Card Grid反復
- 最後に必ず巨大CTA

AI DefaultはModel / 時期で変わります。特定Effectを永久禁止するのではなく、Project理由が薄い流行Patternの束をReviewします。

### 禁止ではない

使う場合は役割を説明できることを目安にします。

- Card: 独立して比較 / 選択 / 移動できる情報単位
- Shadow: Elevation / temporary overlay
- Rounded Corner: 一貫したshape language
- Gradient: Brand / Data / focal point
- Hero: First viewを1 Message / Product visualへ集中

Section / List / Table / Divider / Background differenceの方が関係を正しく表すならそちらを優先します。

## Typography / Spacing / Hierarchy

### Typography

- Headingを大きくするだけで階層を作らない。
- Size / Weight / Line-height / Color / Spacingを組み合わせる。
- Type scaleをむやみに増やさない。
- 長文は読みやすいAlignment / Line lengthを優先する。
- Center alignmentを長文・高密度UIへ機械適用しない。
- HTML heading hierarchyをVisual都合だけで壊さない。
- Display Fontで長文 / 高密度UIの可読性を犠牲にしない。

### Spacing

- 余白をGrouping / Hierarchyの手段として扱う。
- 同じ関係は近く、別Groupはより離す。
- Spacing scale / CSS variables等を使い、ランダム値を増やさない。
- Sectionへ同じ上下余白を機械適用せずRhythmを見る。

### Visual Hierarchy

Heading size / Accent / Bold / Shadow / Border / Glow / Animationを同時に全部強調しません。最重要要素を決め、他を意図的に弱めます。

## Copy / ContentもDesign Materialとして扱う

- Userが認識する語彙を優先する。
- Action labelは具体的な動詞を優先する。
- 同じActionを画面ごとに別名で呼ばない。
- Empty / Errorで次Actionを示す。
- PlaceholderだけでResponsiveを判断せず、短文・長文・実言語で確認する。
- Contentを埋めるためだけのMarketing Sectionを捏造しない。

## Component Design

- Button / Input / Dialog / Tabs等、同じ役割は一貫させる。
- 全Contentを同じCardへ押し込まない。
- Card / List / Table / Tabs / Detail Pane / Inline sectionを情報性質で選ぶ。
- Component再利用とPage Composition再利用を同一視しない。
- Decorative VariantよりSemantic Variantを先に整理する。

### Interactive State

実際に取り得るStateだけ明示します。

- default
- hover（pointerがある場合）
- focus-visible
- active / pressed / selected
- disabled
- loading
- error / invalid
- empty / no result

## ProjectごとにVisual Structureを変える

| Project | 検討しやすい構造例 |
|---|---|
| Documentation | Sidebar / TOC / readable main column / search |
| Dashboard | Dense grid / table / filters / persistent context |
| Media | Large visual / player / queue / browsing structure |
| Tool | Task-first workspace / controls near output / minimal marketing |
| Landing Page | Narrative sections / product evidence / focused action |
| Data-heavy App | Search / filters / table / master-detail / comparison |
| Portfolio / Showcase | Editorial rhythm / project imagery / asymmetric composition |

Template指定ではありません。同じTypeでも内容・利用頻度・主要操作で変わります。

## Companion Tool / Visual Catalogの扱い

Design direction比較Tool、過去Layout Catalog、Skeleton集等を使う場合も、それをCommon Ruleの正本や完成Templateにしません。

- Structure比較の語彙として使う。
- 2〜3のcoherent directionを比較する。
- Palette変更だけを新Directionとしない。
- Layout ID / Skeletonを正解一覧としない。
- Target ProjectのNavigation / Density / Content / Primary ActionへRebuildする。

過去に利用した特定Companion ToolのEvidenceは [DesignShelf Companion Tool Evidence](../references/designshelf-companion-tool-evidence.md) に非Normative Referenceとして保存します。Current Tool実装は利用時にCurrent Repositoryを再確認します。

## Visual Design Review Gate

### CONDITIONAL: Visual Qualityが重要ならBuild後に別工程でReviewする

1. Purpose / User Task
2. Information Hierarchy
3. Navigation / Primary Action
4. Layout / Responsive
5. Typography / Spacing
6. Component Semantics
7. Design System Consistency
8. Accessibility
9. Copy / Content
10. AI Template Regression

Finding:

- **Blocking:** 主要Task不能、重大Accessibility、内容と構造の不一致等
- **Major:** Hierarchy / Navigation / Responsive / Genericness等
- **Minor:** Spacing / State / Polish等

`Pass` / `Needs work`を明示し、Blockingが残る場合はVisual完成扱いにしません。

## Responsive

端末名ではなく**内容が崩れる地点**をbreakpointにします。

- Page全体の横scrollを避ける。
- Table / Timeline /大型Editor等は必要部分だけ局所scrollを許可する。
- 320 CSS px相当でも主要情報 / 操作を失わないことを目標にする。
- PC専用UIでも低い縦解像度・Zoom 125〜150%を確認する。
- 列数削減だけでなくNavigation / Secondary / Action priorityを再構成する。

## fixed / sticky

- 小画面で主要Buttonを隠さない。
- Keyboard focus中の要素を覆わない。WCAG 2.2のFocus Not Obscuredも意識する。
- Modalと競合しない。
- Bottom fixed UIがContentへ重ならない。
- Scroll areaを不必要に増やさない。

## Accessibility

WCAG 2.2 AAを参考に、Projectへ該当する実用上重要項目を標準にします。

### Semantics / Keyboard / Focus

- `button`, `nav`, `main`, `header`, `label`等の適切なHTML要素を使う。
- 主要操作をKeyboardでも可能にする。
- `:focus-visible`を消さない。
- Focused controlがsticky / overlay等で完全に隠れないようにする。
- Dialog / menu等ではFocus順と復帰先を壊さない。

### Contrast / State / Target

- 色だけで状態を表さない。
- 通常文字は可能な限り4.5:1以上のcontrastを確保する。
- 小さすぎる操作Targetを避け、WCAG 2.2の24×24 CSS px相当のMinimumを意識する。
- 主要操作ではより大きいTargetも検討する。
- `aria-pressed`, `aria-expanded`, `aria-live`等は必要な場所だけ正しく使う。

### Motion / Drag / Alternative

- `prefers-reduced-motion`を尊重する。
- Draggingが主要操作の場合、Pointerでのdrag以外にClick / Button / Keyboard等の代替を用意できるか確認する。ただしfreehand drawing等、dragging自体が本質の操作はContextで判断する。

### Form / Repeated Entry / Authentication

CONDITIONAL:

- 同じProcessで既に入力した情報を理由なく再入力させない。再利用 / selection / autofill等を検討する。
- Authenticationがある場合、Password manager / pasteを理由なく禁止しない。
- CAPTCHAや認知Taskだけに依存せず、利用者が認証を完了できるAlternativeを検討する。

## Button / Input

- `div onclick`をButton代わりに多用しない。
- Disabled理由を必要に応じて分かるようにする。
- Errorは修正方法を示す。
- Destructive actionはRiskに応じてUndo /確認 / Backup等を持つ。

## 自動処理

AI / Detector / Parser等の自動結果は必要に応じて次を持たせます。

- Confidence
- 要確認状態
- Manual correction
- 元Dataへ戻れる導線

自動判定を絶対正解として扱いません。
