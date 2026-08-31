# Validated Visual Direction Catalog

実Projectで実際に使われ、ユーザーから肯定的な評価を得たVisual Designを、**完成Templateではなく「正解になり得る方向の実例」**として蓄積するCatalogです。

このCatalogの目的は、すべてのProjectを同じ見た目にすることではありません。

- 正解は1つと決めない。
- ProjectのPurpose / Workflow / Content / Densityに合うDirectionだけを参考にする。
- 色やCSS値をコピーするのではなく、なぜその構造が機能したかを抽出する。
- 新しいProjectで別の良いDirectionが見つかったら、既存Directionへ無理に寄せずCatalogを増やす。
- User validationがあってもAccessibility / Responsive / Stability等の共通Baselineを免除しない。

## Directionを登録する条件

Validated Direction候補は、原則として次を満たすものを優先します。

1. 実Project上に動くUIが存在する。
2. Userから見た目について明確な肯定的Feedbackがある、または継続利用で良好と確認されている。
3. 何が良かったかをLayout / Navigation / Density / Typography / Component semantics等へ分解できる。
4. 適するProjectと適さないProjectを説明できる。
5. 参照時点のRepository / Commitを記録できる。
6. 「このDirectionだけが正解」と扱わない。

Visualが良いというFeedbackだけでMUST Ruleへ昇格させません。複数Projectで再利用価値が確認できた原則だけを、必要に応じてVisual Quality / Success Patternへ昇格させます。

---

## VD-001 LyricTube Media Workspace

- **Status:** User Validated
- **Source:** `EliteMay/lyrictube`
- **Reference commit:** `230fd87bf027a6d7351a3e41efa761800b945e43`
- **Project shape:** `MEDIA + TOOL + CLOUD`
- **Direction:** high-density media workspace / master-detail

### 構造

```text
Library rail
→ Player / current media
→ Lyrics / reading surface
```

### 良かった点として保持するもの

- Mediaを主役にし、装飾より実Contentを前面へ出す。
- DesktopではLibrary / Player / Lyricsの役割を同時に把握できる。
- Sidebarは高密度でも、検索・分類・曲一覧・常設ToolsのHierarchyを分ける。
- Player / LyricsをPrimary surfaceとして扱い、補助設定まで全部同じCard強度にしない。
- Typography / spacing / divider / background differenceでHierarchyを作り、Gradient / Glow / Shadowへ依存しない。
- Themeが変わってもPage / Navigation / Surface / Text / Border / Interactive Stateを同じToken契約で切り替える。
- 下部や固定UIがContent量・Zoom・低Viewportで重要操作を押し出さない。

### Use when

- 音楽 / 動画 / 写真等のMediaを選択しながら詳細を見るTool。
- Libraryと現在対象を頻繁に行き来する。
- 情報密度がmedium-high〜highでも、主要Paneの役割を固定できる。

### Avoid when

- 長文記事を順番に読むKnowledge Site。
- Marketing / Landing PageのようにFirst Messageへ集中させる画面。
- Mobile-onlyで3 Pane同時表示が意味を持たないProject。

### コピーしてはいけないもの

紫Accent、具体的なSidebar幅、3 Paneそのものを万能Defaultにしません。再利用対象は**Media Workflowに対するWorkspace compositionとHierarchyの考え方**です。

---

## VD-002 Tarkov Field Manual Knowledge Manual

- **Status:** User Positive Validation
- **Source:** `EliteMay/Tarkov-Field-Manual`
- **Reference commit:** `dbcfa0659b28d22f7fadde4b7d4fd0c2cce7c621`
- **Project shape:** `STATIC + TOOL + PUBLIC-CONTENT`
- **Direction:** dark field manual / structured knowledge reference

### 構造

```text
Sticky topbar / search
→ Left section rail / progress
→ Long-form manual content
→ Table / list / checklist / calloutを内容に応じて使い分ける
```

### 良かった点として保持するもの

- 「初心者が何から覚えるか」という学習順をNavigationとContent hierarchyへ直接反映する。
- 暗色の落ち着いたSurfaceと低彩度Accentで、ゲーム題材の雰囲気を出しつつ本文可読性を維持する。
- 全情報をCard化せず、Section / Border / Table-like row / Checklist / Calloutを情報の意味で使い分ける。
- Sticky railで現在位置・学習進捗・章移動を近くに保つ。
- 大見出しは強くても、その後の本文は比較的コンパクトにして長時間読めるDensityへ戻す。
- Mono系Label / number / priority markerを局所的に使い、「Field Manual」らしいIdentityを作る。
- Background textureやGlowは弱く抑え、Content hierarchyを邪魔しない。

### Use when

- 初心者Guide、攻略Knowledge Base、仕様Manual、Reference Site。
- 長いページをSection単位で読み、途中で検索・ジャンプ・Checklistを使う。
- Content自体が価値で、画像がなくても成立させたい。

### Avoid when

- Player / Editor / Canvas等、画面中央のInteractive workspaceが主役のTool。
- 商品比較のように多数Itemを横並びで比較するUI。
- 明るいEditorial / Lifestyle表現がProjectの価値に直結する場合。

### コピーしてはいけないもの

Olive系Accent、Grid背景、軍用風の語彙をKnowledge Site全般のDefaultにしません。再利用対象は**学習順を可視化するRail + 長文をCard依存せず構造化するManual composition**です。

---

## 次の正解を探す

このCatalogは完成しません。

今後Projectで「これもかなり良い」と確認できたVisualが出た場合は、既存Directionと似ているかを先に確認します。

- 本質的に同じ構造なら、既存VDのEvidence / Variantsを増やす。
- Navigation / Density / Content model / Primary taskが違うなら、新しいVDとして追加する。
- 色だけ違う場合は新しいDirectionにしない。
- User feedbackだけでなく、実ブラウザ / Responsive / Accessibility / Task usabilityも可能な範囲で確認する。

目標は「共通Templateを1個完成させること」ではなく、**用途別に複数の強いVisual Directionを持ち、Projectごとに正しく選べる状態**です。
