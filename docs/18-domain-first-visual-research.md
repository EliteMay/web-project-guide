# 18 Domain-first Visual Research

この章は、既存サイトの見た目を大きく修正するときに、**過去の成功例やAIの好みを先に当てはめず、そのサイトと同じ用途・ジャンルのVisual Designを一度調査してから方向を決めるためのWorkflow**です。

Visual Designの詳細原則は [04 UI / UX / Accessibility](04-ui-ux-accessibility.md)、最低品質は [17 Visual Quality Baseline](17-visual-quality-baseline.md) を正本とします。

## 目的

同じ「良いDesign」でも、Project Type / User Task / Content / Audience /利用頻度 / 画面密度によって適否が変わります。

例:

- Music Playerに合う3 Pane Workspaceが、学習サイトに合うとは限らない
- Knowledge Manual向けのSidebar / TOCが、Canvas中心Toolに合うとは限らない
- Landing Pageの大きなHeroが、毎日使うDashboardに合うとは限らない
- Game Guideの濃いThemeが、買い物比較Toolに合うとは限らない

そのため、**「過去に成功したから使う」ではなく、「今回の種類に合うことを先に確認する」**ことを優先します。

---

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

---

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

例:

```text
悪い分類:
学習サイト

良い分類:
初心者が毎日10〜20分使う、進捗付きの技術学習Dashboard + Reference
```

```text
悪い分類:
音楽サイト

良い分類:
Libraryから曲を選び、Playerと同期歌詞を同時に見るDesktop中心Media Workspace
```

---

## Referenceの優先順位

Visual Referenceは次の順で探します。

1. **同じPrimary TaskのSite / App**
2. **同じContent ModelのSite / App**
3. **同じAudience / Usage FrequencyのSite / App**
4. **隣接Domainで構造が近いもの**
5. **自分の過去Validated Direction**
6. **一般Design System / Showcase**

つまり、過去の成功例は最初ではなく**補助資料**です。

### 過去成功例を使ってよい条件

過去のValidated Directionを使う場合は、最低限次を説明できることを条件にします。

- Primary Taskが何と共通するか
- Content Modelが何と共通するか
- Densityが近いか
- Navigationの目的が同じか
- どの構造原理だけTransferするか
- Target固有に何をRebuildするか

「以前高評価だったから」は採用理由にしません。

---

## Web Researchのやり方

### 1. 同種Referenceを2〜5件見る

可能なら2〜5件程度を比較します。

1件だけを見ると、そのSite固有のBrand表現をCategory標準だと誤認しやすいためです。

ただしニッチな分野では、1件の強いReference + 隣接Task + Design System等でも構いません。

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
- Hover / selected / loading / empty等のState
- Mobile / narrow viewportで何を残し何を畳むか

### 3. 共通点だけでなく差も見る

複数Referenceに共通するものは、そのCategoryで機能している可能性があります。

一方で違いがある場合は、どちらが正しいかを決めつけず、**なぜ違うか**を考えます。

例:

- 同じMusic ServiceでもDiscovery中心とLibrary中心ではHome構造が違う
- 同じLearning AppでもLesson中心とReference中心ではNavigationが違う
- 同じDashboardでも監視用途と編集用途ではDensityが違う

---

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

---

## Current SiteもReferenceの1つとして扱う

既存Siteでは外部Referenceを見る前後に、現在UIを確認します。

```text
KEEP   = 今のSiteで残す価値がある
FIX    = 役割は必要だが改善が必要
REMOVE = 不要 / 邪魔 / 明確に低評価
```

外部Siteの方が洗練されていても、Target Project固有の良い部分を消しません。

特に次はKEEP候補です。

- Userが既に褒めた要素
- 慣れているNavigation
- Content固有のArtwork / Screenshot / Map
- クリック対象として分かりやすい表現
- ProjectのIdentityになっている色 / Type / Surface

---

## Validated Visual Directionの位置づけ

[Validated Visual Direction Catalog](../catalog/validated-visual-directions.md) は、**Domain Researchの代わりではありません。**

使う順番は次です。

```text
Current Project理解
→ Domain / Genre Research
→ KEEP / FIX / REMOVE
→ Design Direction候補
→ 必要なら過去Validated Directionを補助Referenceとして確認
→ Candidate
→ Visual Review
```

### 禁止する使い方

- LyricTubeが高評価だったからMedia以外にも3 Paneを使う
- Tarkov Field Manualが高評価だったからKnowledge Site全部を暗色Sidebar型にする
- 過去のA評価を「正解Template」として最初から当てはめる
- Domain Researchを省略して、自分の過去ProjectだけをReferenceにする

### 許可する使い方

- 今回もLibrary + Current Item + Detailを頻繁に行き来するため、LyricTubeのWorkspace原理だけ参考にする
- 今回も長文ReferenceをSection単位で学ぶため、TarkovのRail + Manual compositionを比較候補に入れる

重要なのは**見た目の類似ではなくTask / Content Modelの類似**です。

---

## AIへVisual修正を任せる場合

AIへ「見た目を良くして」と依頼された場合、いきなりCSSを変更しません。

原則順序:

```text
1. Current Repo / Screenshot / Requirementsを確認
2. Target Typeを定義
3. Webで同種Site / Appを調査
4. Domain Research Briefを作る
5. Current UIをKEEP / FIX / REMOVEへ分ける
6. 2〜3 Directionを必要に応じて比較
7. Candidateを実装
8. Current vs Candidateを確認
9. Visual Review
10. User feedbackをEvidenceへ残す
```

AI自身が過去に作った成功例を最初の答えとして使わないことを基本とします。

---

## Completion Check

大きなVisual変更で次を説明できない場合、Design Directionの検討不足と扱います。

- このProjectは何種類のSite / Appか
- どんな同種Referenceを調べたか
- そのCategoryで共通していた構造は何か
- Reference間で違っていた部分は何か
- 今回どれを採用し、どれを採用しなかったか
- 過去成功例を使った場合、なぜ今回にも適合するのか

最終的な目標は「成功例に似せること」ではなく、**今回のProject種類を理解し、その種類に合ったVisual Designを選べること**です。
