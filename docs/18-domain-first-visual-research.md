# 18 Domain-first Visual Research

この章は、既存サイトの見た目を大きく修正するときに、**過去の成功例やAIの好みを先に当てはめず、そのサイトと同じ用途・ジャンルのVisual Designを調査してから方向を決めるためのWorkflow**です。

この章が次の正本です。

- Domain / Genre Research
- 既存UIの`KEEP / FIX / REMOVE`
- Reference選定
- Candidate比較
- Visual Foundation Reset

Visual Design原則は [04 UI / UX / Accessibility](04-ui-ux-accessibility.md)、最低品質は [17 Visual Quality Baseline](17-visual-quality-baseline.md) を正本とします。

## 目的

同じ「良いDesign」でも、Project Type / User Task / Content / Audience / 利用頻度 / 画面密度によって適否が変わります。

例:

- Music Playerに合う3 Pane Workspaceが、学習サイトに合うとは限らない
- Knowledge Manual向けのSidebar / TOCが、Canvas中心Toolに合うとは限らない
- Landing Pageの大きなHeroが、毎日使うDashboardに合うとは限らない
- Game Guideの濃いThemeが、買い物比較Toolに合うとは限らない

そのため、**「過去に成功したから使う」ではなく、「今回の種類に合うことを先に確認する」**ことを優先します。

## MUST: Meaningful Visual Changeの前にDomain / Genre Researchを行う

次のような変更では、CSSを本格修正する前に、そのサイトと同じ用途・ジャンル・Taskに近い現行Site / AppをWebで調査します。

- Page Compositionを大きく変える
- Navigationを変更する
- Theme / Visual Directionを刷新する
- Dashboard / Workspace / Knowledge Site等の構造を組み直す
- 「もっと良い見た目にして」のように方向自体が未確定
- 既存Visualの評価が低く、Foundationから直す
- 新規PageでVisual Directionが完成度へ大きく影響する

### 例外

次は毎回Web調査を必須にしません。

- 1px〜数pxの明確なAlignment bug
- overflow / clipping等の局所不具合
- 既存Design Systemに従うだけの小さなComponent追加
- 色Contrast修正など、原因と正解が明確なAccessibility fix

ただし局所修正に見えても、複数箇所へ広がる場合はDomain Researchへ戻ります。

## Research前にTarget Typeを定義する

検索語を決める前に、今回のProjectを最低限次で整理します。

- **Primary Task:** Userが一番繰り返す操作
- **Content Model:** Article / Media / Table / Map / Card collection / Timeline / Editor / Dashboard等
- **Audience:** 初心者 / 熟練者 / 自分専用 / 一般公開等
- **Usage Frequency:** 一度見る / たまに使う / 毎日使う
- **Density:** low / medium / high
- **Primary Device:** Desktop / Mobile / mixed
- **Visual Material:** Screenshot / Artwork / Map / Chart / Video / Text中心等
- **Tone:** serious / playful / calm / technical / entertainment等

単に「学習サイト」「ゲームサイト」だけで終わらせず、**何をするサイトか**まで落とします。

```text
悪い分類:
学習サイト

良い分類:
初心者が毎日10〜20分使う、進捗付きの技術学習Dashboard + Reference
```

## Referenceの優先順位

Visual Referenceは原則として次の順で探します。

1. **同じPrimary TaskのSite / App**
2. **同じContent ModelのSite / App**
3. **同じAudience / Usage FrequencyのSite / App**
4. **隣接Domainで構造が近いもの**
5. **自分の過去Validated Direction**
6. **一般Design System / Showcase**

過去の成功例は最初ではなく**補助資料**です。

### 過去成功例を使ってよい条件

[Validated Visual Direction Catalog](../catalog/validated-visual-directions.md) を使う場合は、最低限次を説明できることを条件にします。

- Primary Taskが何と共通するか
- Content Modelが何と共通するか
- Densityが近いか
- Navigationの目的が同じか
- どの構造原理だけTransferするか
- Target固有に何をRebuildするか

「以前高評価だったから」は採用理由にしません。

## Web Researchのやり方

### 1. 同種Referenceを2〜5件見る

可能なら2〜5件程度を比較します。

1件だけを見ると、そのSite固有のBrand表現をCategory標準だと誤認しやすいためです。

ニッチな分野では、1件の強いReference + 隣接Task + Design System等でも構いません。

### 2. 見る項目を固定する

各Referenceで最低限次を観察します。

- First Viewで何を見せているか
- Navigation Type
- Main Contentの幅 / Pane構成
- Primary Actionの位置
- Information Density
- Card / List / Table / Tabs / Inspector等の使い分け
- Typography hierarchy
- Image / Artwork / Screenshotの役割
- Background / Border / Shadow / Radiusの強さ
- hover / selected / loading / empty等のState
- narrow viewportで何を残し何を畳むか

### 3. 共通点だけでなく差も見る

複数Referenceに共通するものは、そのCategoryで機能している可能性があります。

一方で違いがある場合は、どちらが正しいかを決めつけず、**なぜ違うか**を考えます。

例:

- 同じMusic ServiceでもDiscovery中心とLibrary中心ではHome構造が違う
- 同じLearning AppでもLesson中心とReference中心ではNavigationが違う
- 同じDashboardでも監視用途と編集用途ではDensityが違う

## Research Output: Domain Research Brief

大きなVisual変更では、実装前に短く次を整理します。

```text
Target Type:
- Primary Task:
- Content Model:
- Audience:
- Density:
- Device:

References:
1. ...
2. ...
3. ...

Observed conventions:
- ...

Meaningful variations:
- ...

Fit for this Project:
- ...

Avoid for this Project:
- ...

Open axes:
- Navigation:
- Density:
- Typography:
- Visual emphasis:
```

長い調査レポートを毎回作る必要はありません。

重要なのは、**調査結果がDesign Directionへどう影響したかを説明できること**です。

## Current Siteを`KEEP / FIX / REMOVE`へ分ける

既存Siteでは、外部Referenceへ寄せる前に現在UIの価値を固定します。

```text
KEEP   = 今のSiteで残す価値がある
FIX    = 役割は必要だが改善が必要
REMOVE = 不要 / 邪魔 / 明確に低評価
```

特に次はKEEP候補です。

- Userが既に褒めた要素
- 慣れているNavigation
- Content固有のArtwork / Screenshot / Map
- クリック対象として分かりやすい表現
- ProjectのIdentityになっている色 / Type / Surface
- Taskに合っている情報密度や構造

外部Siteの方が洗練されていても、Target Project固有の良い部分を消しません。

## Reference Transfer Rule

別Projectの成功例を使う場合は、次を分けます。

```text
Transfer
→ Workflowに対して成功した構造原理

Rebuild
→ Project固有のIdentity / Content / Density / Visual material

Do not copy
→ 色、幅、Effect量、Card数、装飾削減量などSource固有の表層
```

特に、**Source Projectで「減らしたもの」を成功要因だと決めつけません。**

## Candidate → Compare → Promote / Reject

Visual uncertaintyが高いRedesignでは、最初の1案を完成扱いしません。

推奨順序:

```text
Current baseline
→ Domain Research
→ KEEP / FIX / REMOVE
→ 2〜3 structural directions（必要時）
→ Candidate
→ Current vs Candidate
→ 明確な改善点を説明
→ User / Task validation
→ Promote or Reject
```

比較案は色違いではなく、Navigation / Density / Content Width / Grid / Typography / Primary Action等が実際に異なる案にします。

CandidateがCurrentを明確に上回らない場合は、Polish量を増やす前にDirection自体を見直します。

## Visual Foundation Reset

### SHOULD: 局所修正を重ねても良くならない場合はPatchを止め、基礎から再設計する

小さなCSS修正・余白調整・色変更・Card追加・Effect追加を繰り返しても全体品質が上がらない場合、**既存UIへPatchを足し続けること自体を目的にしません。**

次のような状態ではFoundation Resetを優先して検討します。

- 同じ画面を何度直しても「まだ微妙」が続く
- 問題が1 ComponentではなくIA / Layout / Density / Typography / Hierarchy / Navigationへ広がっている
- 1箇所を直すと別の場所のBalanceが崩れる
- Component単体は整っているのにPage Composition全体として弱い
- Override / 例外CSS / 個別Patchが増え、正しいLayoutが分かりにくい
- Effectを足すほど見た目は変わるが、Task clarityや構造の納得感が上がらない
- Candidateを何度PolishしてもCurrentを明確に上回らない

Foundation Resetでは原則として次へ戻ります。

```text
Purpose / User Task
→ Content / Data / State
→ Target Type / Domain Research
→ Information Architecture
→ Navigation / Main Structure
→ Wireframe
→ Design Direction
→ Typography / Spacing / Hierarchy
→ Color / Effect
→ Rebuild UI
→ Visual Verification
```

### 「一から作り直す」= Project全体を捨てる、ではない

原則として保持するもの:

- 正しく動いている機能
- Data / Storage / Migration Contract
- API / URL / Release Contract
- 検証済みBusiness Logic
- Accessibility / Performance / Security要件
- 再利用価値のあるComponent / Asset

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

小規模な崩れや原因が明確なComponent Bugまで毎回全面Redesignする必要はありません。

目安として、局所修正の追加コスト・例外・複雑さが、Wireframeから再設計するコストを上回り始めたらFoundation Resetへ切り替えます。

## AIへVisual修正を任せる場合

AIへ「見た目を良くして」と依頼された場合、いきなりCSSを変更しません。

原則順序:

```text
1. Current Repo / Screenshot / Requirementsを確認
2. Target Typeを定義
3. Webで同種Site / Appを調査
4. Domain Research Brief
5. KEEP / FIX / REMOVE
6. 必要なら2〜3 Directionを比較
7. Candidateを実装
8. Current vs Candidateを確認
9. Visual Review
10. User feedbackをEvidenceへ残す
```

AI自身が過去に作った成功例を最初の答えとして使わないことを基本とします。

## Completion Check

大きなVisual変更で次を説明できない場合、Design Directionの検討不足と扱います。

- このProjectは何種類のSite / Appか
- どんな同種Referenceを調べたか
- そのCategoryで共通していた構造は何か
- Reference間で違っていた部分は何か
- Current UIの何をKEEP / FIX / REMOVEしたか
- 今回どれを採用し、どれを採用しなかったか
- 過去成功例を使った場合、なぜ今回にも適合するのか
- Foundation Resetをした場合、何を保持し何を作り直したか

最終的な目標は成功例に似せることではなく、**今回のProject種類を理解し、その種類に合ったVisual Designを選べること**です。
