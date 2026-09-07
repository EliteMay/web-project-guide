# 04 UI / UX / Accessibility

## UIの基本

- 主要操作を最短で見つけられる構成にする。
- 情報を増やすことと常時表示することを分ける。
- 未実装機能は通常導線から外すか、開発中と明示する。
- Loading / Empty / Error / Success の4状態を考える。
- 0件画面には復帰操作を置く。

## Task-first Structure / Flow

### SHOULD: Page / Featureより先にUser Goal / Taskを見る

主要なPage、Navigation、機能群をTemplateとして先に固定せず、Userが達成したいGoal / Needと主要Taskから必要Information / Functionを導きます。

```text
User Goal / Need
→ Task
→ Information / Function
→ Information Architecture
→ Navigation / Flow / State
→ Page / View
```

意味のあるIA / Navigation構造 / Task Flow / Search・Browse / Recovery / Returning User等のResearch Workflowは [22 Task-first Structure / Flow Research](22-task-first-structure-flow-research.md) を正本とします。この章ではUI / UX / Accessibilityの一般原則を維持し、Structure Research Workflowを重複定義しません。

Navigationの分類・階層・到達経路を変える場合は`docs/22`、Navigation UIのLayout / Typography / Color等のVisual変更は [18 Domain-first Visual Research](18-domain-first-visual-research.md) とこの章を使います。

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

### SHOULD: 題材からDesignを導く

「modern」「premium」「clean」等の抽象語だけからVisualを決めません。

Design Directionを考えるときは、Project固有の次の材料を先に見ます。

- 利用者が普段使う語彙
- 扱うContent / Data / Mediaの形
- 一番繰り返すTask
- 題材に固有のVisual material、図、Screenshot、Artwork、Map、Timeline等
- 情報の比較・探索・編集・閲覧などの性質
- 利用頻度と必要な情報密度

実在企業を参考にする場合も、色・角丸・Heroを真似るのではなく、**Audience / Job / Content Model / Navigation / Density / Proof / Component choice / Effectの理由**を抽象化します。

### SHOULD: Signatureは1つを明確にする

Visualが重要なProjectでは、必要に応じて「このProjectらしさを一番表す要素」を1つ決めます。

例:

- 実データを主役にした独自Visualization
- 題材に合ったNavigationやTimeline
- Project固有のArtwork / Screenshot treatment
- 特徴的だが読みやすいTypography pairing
- Taskに直結したWorkspace composition

複数箇所を同時に奇抜にする必要はありません。**1つのSignatureへ大胆さを使い、残りを規律あるDesign Systemで支える**方針を基本とします。

### AI Promptでは「固定するもの」と「探索させるもの」を分ける

Promptが長いほど品質が上がるとは限りません。

AIへ先に固定しやすいもの:

- Purpose / User / Required Content
- 必須機能 / Workflow
- Technology / Deployment制約
- Accessibility / Performance / Security
- 崩してはいけない仕様
- 既存Design Systemがある場合のToken / Component契約

Visual Design決定前に固定しすぎないもの:

- Heroの有無と高さ
- Card Gridの列数
- Center / Left Alignment
- Navigation Type
- Content Density
- Typography personality
- Image / Screenshot emphasis
- Gradient / Glass / Glow / Shadow
- CTA Sectionの数と配置

「full-height centered hero + 3 cards + glass nav + cursor glow」のように完成形をPromptへ固定してから「独自Designにして」と要求すると、AI自身の探索余地を消します。

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
→ Design Plan Critique
→ Typography / Spacing / Color
→ Decorative Effects
→ Build
→ Visual Design Review
```

これは [AP-020 Design Before Workflow](../catalog/anti-patterns.md) と同じ考え方です。Visualを重視する場合でも、Workflow / Data / UI Structureを飛ばして見た目から完成させません。

### Design Plan Critique

Visual Designが重要なProjectでは、CSSを本格実装する前に一度Directionを自己Reviewします。

確認例:

- このPlanは別の無関係なProjectにもほぼそのまま使えてしまわないか
- Content / Task / Audience固有の理由がLayoutに現れているか
- Primary Actionと重要情報が装飾なしでも分かるか
- 「modern」「premium」等の抽象語をEffectで埋めていないか
- Companion ToolやReferenceのSkeletonをそのまま完成形にしていないか

Genericに見える場合は、実装量を増やす前にDirectionを修正します。

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

AIのDefaultは時期やModelによって変わります。特定の色・Font・Effectだけを「AIっぽい」と固定せず、**Projectとの理由が薄いのに流行Patternが束で出現していないか**をReviewします。

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
- Display Fontや個性的なTypefaceはIdentityへ使えても、長文や高密度UIの可読性を犠牲にしない。

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

## Copy / ContentもDesign Materialとして扱う

AIがVisualだけ整えても、GenericなMarketing Copyが大量に入るとTemplate感が残ります。

- Userが認識する語彙を優先する。
- Action labelは可能な限り具体的な動詞にする。
- 同じActionを画面ごとに別の言葉で呼ばない。
- Empty / Error Stateでは状態説明だけでなく次に取れるActionを示す。
- Placeholder / Lorem IpsumだけでResponsiveを判断せず、短い文・長い文・実際の言語でも確認する。
- Contentが少ないProjectへ、Visualを埋めるためだけのFeature説明やMarketing Sectionを捏造しない。

## Component Design

Componentの一貫性とPage構造の多様性を両立します。

- Button、Input、Dialog、Tabs等の同じ役割はProject内で一貫させる。
- すべてのContentを同じCard Componentへ押し込まない。
- Card / List / Table / Tabs / Detail Pane / Inline section等を情報の性質で選ぶ。
- 同じComponentを再利用しても、ページ全体のCompositionまで全Projectで同じにする必要はない。
- Decorative Variantを増やす前に、必要なSemantic Variantを整理する。

### Interactive Stateを忘れない

該当するComponentでは、完成Screenshotだけでなく状態差を設計します。

- default
- hover（Pointerがある場合）
- focus-visible
- active / pressed / selected
- disabled
- loading
- error / invalid
- empty / no result

すべてのComponentへ全状態を機械的に作るのではなく、そのComponentが実際に取り得る状態を明示します。

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

「CSSを書き終えた」ことと「Visual Designが完成した」ことを分けます。

実装後、機能Testとは別に次をReviewします。

1. **Purpose / User Task** — 最初に何を理解・実行すべきか明確か
2. **Information Hierarchy** — 重要度がSize / Position / Density / Contrastへ正しく反映されているか
3. **Navigation / Primary Action** — 次のActionが自然で、Marketing CTAを機械的に追加していないか
4. **Layout / Responsive** — Desktopを縮小しただけでなく、狭い画面でPriorityが再構成されているか
5. **Typography / Spacing** — 読みやすさ、Line length、Grouping、Rhythmが適切か
6. **Component Semantics** — Card / Table / List / Tabs等の選択理由が情報の性質に合うか
7. **Design System Consistency** — Token / State / Radius / Border / Button等が無意味に揺れていないか
8. **Accessibility** — Focus、Contrast、Keyboard、Motion、Target等を損なっていないか
9. **Copy / Content** — GenericなAI Copyや冗長なSectionがDesignを水増ししていないか
10. **AI Template Regression** — 色を外したとき、別Projectとほぼ同じCompositionへ戻っていないか

Findingは必要に応じて次で分けます。

- **Blocking:** 主要Task不能、重大なAccessibility、内容と構造の不一致など、完成を止める
- **Major:** Hierarchy / Navigation / Responsive / Template感など、Visual Qualityを大きく下げる
- **Minor:** 細かなSpacing / State / Polish等

Visual Reviewの結果は `Pass` / `Needs work` を明示し、Blockingが残る場合はVisual完成扱いにしません。

## レスポンシブ

端末名ではなく、**内容が崩れる地点**をbreakpointにします。

原則:
- ページ全体の横スクロールを避ける。
- 表・タイムライン・大型編集領域など、必要な部分だけ局所スクロールを許可する。
- 320 CSS px相当の狭い画面でも主要情報と操作を失わないことを目標にする。
- PC専用UIでも、低い縦解像度・表示倍率125〜150%を確認する。
- Responsiveでは単純に列数を減らすだけでなく、Navigation / Secondary Content / Action priorityを必要に応じて再構成する。

### Responsive Robustness / Zoom / Reflow

Responsiveは代表ViewportのScreenshotだけで判定せず、**Zoom、文字拡大、Content expansion、Orientation、低いViewport heightでもPrimary Taskを継続できるか**を確認します。

- Browser ZoomやOS / Browserの文字拡大で主要Content / Actionが消えない。
- Reflowが必要な狭い幅では、Page全体の二方向Scrollを避ける。Data table、Timeline、Canvas、Editor等、二次元Layoutが本質の領域は局所Scrollを許可できる。
- Portrait / Landscapeのどちらかを理由なく唯一の操作可能Orientationにしない。特定Orientationが本質の場合だけ例外にする。
- `100vh`前提でMobile browser chrome、software keyboard、低いViewport heightにより主要操作を隠さない。必要に応じてdynamic viewport unitやscroll可能なLayoutを検討する。
- Translation、User-generated text、長いName / Label、Font差でTextが伸びても、固定Heightやellipsisだけで重要情報を失わせない。
- Responsiveで情報を非表示にする場合、単にDesktopの内容を削るのではなく、Primary Task / Action priorityを保つ。

## Internationalization / Localization

Internationalization（i18n）は「後で翻訳する作業」ではなく、**言語・Script・地域差へ適応できるよう実装を硬直させない設計**として扱います。Localization（l10n）は、対象Localeへ実際のContent / Format /表現を適合させる作業です。

CONDITIONAL: 複数言語、Locale切替、日本語・英語併記、海外公開等があるProjectでは次を必要範囲で確認します。単一言語の小規模Projectへ翻訳Infrastructureを機械的に追加しません。

- Document / Contentの実言語を`lang`等で表し、Mixed-language Contentでは必要に応じて部分的なLanguage metadataを持つ。
- UI StringをLayout / Logicへ過度に埋め込み、翻訳時にComponent構造を書き換える前提にしない。
- 日本語と英語の文字数差だけでなく、より長い翻訳、異なるWord break、Font metric、Scriptを想定して固定Width / Height依存を避ける。
- Date / Time / Number / Currency / Percent / Unit等は、User-facing表示でLocale-sensitive formattingが必要なら`Intl`等の標準機構を優先する。保存用Canonical valueと表示Formatを混同しない。
- UserがLocaleを選べる場合、Language preferenceとContent Dataそのものを必要に応じて分離し、Locale変更でCanonical User Dataを壊さない。
- RTLやVertical / complex scriptがScopeに入る場合は、物理方向`left/right`だけに依存したLayoutやIcon意味を見直す。Scope外のScript対応を完成済みと主張しない。
- Locale依存のSort / Search / Case / normalizationが正確性へ影響する場合、単純ASCII前提の比較だけで実装しない。

## fixed / sticky

便利ですが、過去に操作阻害を何度も起こしたため慎重に使います。

確認項目:
- 小さい画面で主要ボタンを隠さない
- フォーカス中の要素を覆わない
- モーダルと競合しない
- 下部固定UIがカード上へ重ならない
- スクロール領域を必要以上に増やさない

WCAG 2.2の **Focus Not Obscured** を踏まえ、Keyboard focus中のComponentがAuthor-created sticky / fixed / overlayで完全に隠れないことを確認します。

## アクセシビリティ

### Accessibility as Task Completion

AccessibilityはChecklist上の属性追加ではなく、**異なる入力方法・知覚方法・補助技術でもPrimary Taskへ実質的に到達できること**を中心に判断します。

- Semantic HTML / ARIAは手段であり、主要Flowを完了できるかをOutcomeとして確認する。
- Visual、Pointer、Audio等の1手段だけで成立する重要情報・操作には、Task上同等のOutcomeへ到達できるAlternativeを必要に応じて用意する。
- Alternativeは必ず同じ見た目・同じ操作手順である必要はないが、重要な情報・権限・結果を失わせない。
- Accessibility対応を理由にPrimary Taskを別の劣化版Flowへ追い出さない。
- 未対応のAssistive Technology / Input Methodを確認済みとして扱わず、必要な利用者・Platformに応じてValidation範囲を明示する。

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

### Input-method Independence / Focus

主要操作をMouse / Touch / Drag / Hover / Shortcut等の単一Input Methodへ理由なく固定しません。

- Keyboardで到達したFocusがComponent、Dialog、Menu、Custom Widget等に閉じ込められず、意図したModal境界を除いて抜けられることを確認する。
- DOM順・Visual順・Focus順を大きく乖離させず、Task理解を壊す不自然な`tabindex`正数指定を避ける。
- Dialog / Popover等を閉じた後、可能なら操作開始元など意味のある位置へFocusを戻す。
- Hoverだけで必須Information / Actionを出さない。Hover contentが必要ならKeyboard / Touchでも取得できる経路を持つ。
- Touch GestureやMulti-pointer、Dragを本質としない操作には、Tap / Button / Keyboard等のAlternativeを検討する。
- Shortcutを使う場合、Text入力との衝突、OS / Browser shortcutとの競合、誤発火を避ける。重要操作をShortcutだけにしない。
- Pointer typeやBrowser名の推測だけで操作経路を決めず、可能ならCapability / actual eventに合わせる。

### WCAG 2.2 Interaction Coverage

#### Focus Not Obscured

Keyboard focusがsticky header、fixed footer、cookie banner、floating toolbar、modal等で完全に隠れないようにします。Focus移動後にUserが現在位置を認識できることを確認します。

#### Target Size (Minimum)

Pointer targetは原則24×24 CSS px相当以上を意識します。例外条件が成立する場合でも、隣接TargetとのSpacingと誤操作Riskを確認します。主要操作ではより大きなTargetも検討します。

#### Dragging Movements

Draggingを主要操作に使う場合、freehand drawing等drag自体が本質の操作を除き、Click / Button / Keyboard等の単純Pointer操作でも同じOutcomeへ到達できるAlternativeを検討します。

#### Redundant Entry

同じProcess内で一度入力した情報を理由なく再入力させません。既存値の再利用、selection、autofill等が使える場合は優先します。Security上の再確認等、必要な再入力は例外として理由を持たせます。

#### Accessible Authentication

Authenticationがある場合、Password managerやpasteを理由なく禁止しません。記憶・転記・Puzzle等の認知Taskだけを唯一の認証経路にせず、利用者が認証を完了できるAlternativeや補助手段を検討します。

## ボタンと入力

- `div onclick`をボタン代わりに多用しない
- 無効状態は理由が分かるようにする
- エラーは「エラー」だけでなく修正方法を表示する
- 破壊操作はUndo / 確認 / Backupのいずれかを持つ

### Forms / Validation / Error Recovery

Formは「値を送信できる」だけでなく、**何を入力すべきか理解でき、Errorから入力を失わず回復できること**を完成条件に含めます。

- Input / Select / Textarea等は、Placeholderだけに依存せずProgrammaticに関連付いたLabelまたは同等のAccessible Nameを持つ。
- 必須 / Format / 制約は、可能ならError後ではなく入力前または入力時に理解できる形で示す。
- Validation ErrorはFieldと関連付け、どこが・なぜ・どう直せるかを伝える。ColorやBorderだけをError表現にしない。
- Submit失敗時にUserが正しく入力した値まで理由なく消さない。最初のErrorへFocusを移す、Error summaryからFieldへ移動できる等、長いFormではRecovery導線を検討する。
- Native input type、`autocomplete`、Password manager等を利用できる場合は理由なく妨げない。Autofill後もLabel / Validation / Contrastが壊れないことを確認する。
- Async validationやSubmit中に二重送信、古いError、late responseでCurrent input stateを壊さない。Network / Reliability固有のRetry判断は[05 Performance / Reliability](05-performance-reliability.md)を正本とする。
- Authentication FormはSecurity強化を理由にAccessibilityを無視せず、Credential / AuthorizationのSecurity判断は[06 Security](06-security.md)を正本とする。

## Motion / Animation / Media

MotionやMediaはDecorative qualityだけでなく、操作可能性・理解可能性・代替手段を合わせて設計します。

- `prefers-reduced-motion`では、非本質的なparallax、large movement、continuous animation等を減らす / 停止する。単にDurationを少し短くするだけで十分とは限らない。
- 自動開始して長く続くAnimation / Carousel / Media等がTaskを妨げる場合、Pause / Stop / Hide等を必要に応じて用意する。
- Animation終了だけをState changeの唯一のSignalにせず、Reduced Motion時も同じ結果を理解できる。
- Audioだけに重要情報を載せず、必要に応じてText / Caption / Transcript等のAlternativeを用意する。Visualだけに重要なNarration / Instructionを載せる場合も同様にAlternativeを検討する。
- User-generated / third-party Mediaでは、提供できるAlternativeのScopeを明示し、存在しないCaption等を対応済みと扱わない。
- Autoplay / Media performance固有のCostは[05 Performance / Reliability](05-performance-reliability.md)を正本とする。

## 自動処理

AI・Detector・Parserなどの自動結果は、必要に応じて以下を持たせます。

- Confidence
- 要確認状態
- 手動修正
- 元データへ戻れる導線

自動判定を絶対正解として扱わないことを基本とします。
