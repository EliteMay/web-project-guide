# Validated Visual Direction Catalog

実Projectで実際に使われたVisual Designを、**完成Templateではなく「正解になり得る方向の実例」**として蓄積するCatalogです。

このCatalogは、良かった見た目だけを都合よく集めません。

- 明確に高評価だったDirection
- Task構造として有効だったがVisual評価がまだ弱いPattern
- まだ検証中のCandidate
- 実際に低評価だったRejected Direction

を分けて記録します。

目的は、AIや制作者が「最近のmainだから成功」「CIが通ったから成功」「別Projectで良かったから成功」と誤認せず、**Evidenceの強さを見ながら次のDirectionを選べる状態**を作ることです。

---

## Evidence Level

| Level | 名前 | 意味 | 扱い |
|---|---|---|---|
| A | User Validated | 実画面に対する明確な肯定Feedback、継続利用、または「正解例」としての承認がある | `VD-xxx`として登録可能 |
| B | Task Validated | Workflow / Layoutとして実用上の成功Evidenceがあるが、見た目全体の明確な高評価まではない | Reference候補。VDへ自動昇格しない |
| C | Candidate | 理屈・実装は存在するが、User Visual Validationが不足している | 比較・検証待ち |
| R | Rejected | 明確な低評価、旧版より悪化、またはProject固有価値を失ったEvidenceがある | 再利用禁止ではなく「なぜ失敗したか」を学ぶ |

### 重要

**最新Version / main / CI成功 / Assistant自己評価だけではAにしません。**

User ValidationのないVisualを「成功例」として次Projectへ横展開すると、低評価だったDirectionが時間経過で正解扱いされるためです。

---

## 2026-09-02 Visual Evidence Review

GitHub上で確認できるUser-facing Projectを横断し、`PROJECT_LEARNINGS.md`、README、最近のVisual変更、ユーザーFeedbackを確認しました。

確認対象:

`lyrictube` / `asmrtube` / `Tarkov-Field-Manual` / `ap-study-guide` / `valorant-review` / `valorant-lineup` / `english-study` / `github-guide` / `home-workout-guide` / `aws-study-guide` / `BuyLens` / `design-shelf` / `osu-hub` / `type-tower`

### 現在のEvidence Matrix

| Project / Direction | Level | 現在の判断 | Evidence |
|---|---:|---|---|
| LyricTube Media Workspace | A | **Validated** | 2026-08-31に「今のところ一番いい」「正解の一つ」としてUser承認。Reference Commitあり |
| Tarkov Field Manual | A | **Validated** | 2026-08-30に「めっちゃいい感じ」と明確なUser肯定。Project Learningでも構造上の成功理由を記録 |
| VReview Review Workbench | B | Useful Reference | 中央の主対象を固定し、右Scene PaneだけScrollする構造がReview Taskで成功。見た目全体の最新User評価は不足 |
| Lineup Tactical Map Workspace | B | Useful Reference | Mapを最大Visualにし、Filter / Detailを弱めるHierarchyがProject Learningで成功Pattern化。明確な最新Visual評価は不足 |
| AP Friendly Study Dashboard recovery | C | Candidate | r22のTechnical Console化は30点まで低下。r23でTeal / Action Card / 親しみやすさを復元したが、新Directionの肯定Validationはまだ不足 |
| ASMRTube ASMR Media Deck / Sound Map | C | Candidate | v2.4はRejected。v3方針はContent固有のMedia Deck / Sound Mapへ再設計したが、成功扱いできるUser Validationはまだ不足 |
| English Study | C | No visual promotion | Paper / 2Pane等のUX成功はあるが、最近の見た目変更をValidated DirectionとするEvidenceは不足 |
| GitHub Guide | C | No visual promotion | 「目的から逆引き」「あれどこ？」構造は有用だが、Visual Directionの明確なUser validationは不足 |
| BuyLens | C | No visual promotion | Data / Snapshot設計の成功Evidenceはあるが、Visual成功Evidenceは不足 |
| AWS Study Guide | C | No visual promotion | 学習Schemaの成功Evidenceはあるが、Visual成功Evidenceは不足 |
| home-workout-guide | C | No visual promotion | 現時点でVisual成功を一般化できるProject Learningがない |
| design-shelf | C | Tool reference only | Design探索Toolとして利用する。DesignShelf自身の見た目を他SiteのValidated Directionにはしない |
| osu-hub | C | No visual promotion | Electron / Release成功Evidenceは強いが、Visual successのEvidenceとは分離する |
| type-tower | C | Planned visual direction | GAME画面のVisual方針は存在するが、まだ完成後User Validation前 |

この表でAが少ないことは問題ではありません。**弱いEvidenceを成功扱いして数を水増ししないこと**を優先します。

---

## Directionを登録する条件

Validated Direction候補は、原則として次を満たすものを優先します。

1. 実Project上に動くUIが存在する。
2. Userから見た目について明確な肯定的Feedbackがある、または継続利用で良好と確認されている。
3. 何が良かったかをLayout / Navigation / Density / Typography / Component semantics等へ分解できる。
4. 適するProjectと適さないProjectを説明できる。
5. 参照時点のRepository / Commitを記録できる。
6. 「このDirectionだけが正解」と扱わない。
7. Rejected / 低評価だった近接Directionがある場合、それとの差も記録する。

Visualが良いというFeedbackだけでMUST Ruleへ昇格させません。複数Projectで再利用価値が確認できた原則だけを、必要に応じてVisual Quality / Success Patternへ昇格させます。

---

## 既存SiteをRedesignするときの使い方

Validated Directionを見る前に、現在Siteを次の3列へ分解します。

```text
KEEP   = 今のUIで残す価値があるもの
FIX    = 問題はあるが役割自体は必要なもの
REMOVE = Task / Contentに不要、または明確に邪魔なもの
```

最低限、次を確認します。

- Current screenshot / 現在のmainを先に見る
- Userが過去に褒めた要素をKEEPへ入れる
- Userが低評価した要素をEvidence付きでREMOVE / FIXへ入れる
- Referenceから何を**Transfer**するかを決める
- Referenceの何をProject固有に**Rebuild**するかを決める
- Referenceの何を**Copyしない**かを決める

### Reference Transfer Rule

別Projectの成功例を使う場合、次を分けます。

```text
Transfer
→ Workflowに対して成功した構造原理

Rebuild
→ Project固有のIdentity / Content / Density / Visual material

Do not copy
→ 色、幅、Effect量、Card数、装飾削減量などSource固有の表層
```

特に、**Source Projectで「減らしたもの」を成功要因だと決めつけない**ことが重要です。

LyricTubeでShadow / Card / Gradientを減らしたことが成功したとしても、それはLyricTubeのMedia hierarchyに対して有効だった結果であり、別Projectでも「少ないほど良い」という意味ではありません。

### Candidate Gate

Visual uncertaintyが高い既存Siteでは、最初の1案を完成扱いしません。

1. Current UIをBaselineとして保存
2. KEEP / FIX / REMOVEを決める
3. 近いValidated Directionを1〜2件参照
4. 構造的に異なる2〜3案を軽量比較
5. Candidateを実装またはMock化
6. Current vs Candidateを並べて「何が明確に良くなったか」を説明
7. 明確な改善がなければPolishを重ねずDirectionを戻す
8. User Validation後に初めてAへ昇格を検討

何度調整してもCandidateがCurrentを明確に上回らない場合は、[Visual Foundation Reset](../docs/17-visual-quality-baseline.md#visual-foundation-reset)へ切り替えます。

---

## VD-001 LyricTube Media Workspace

- **Evidence Level:** A / User Validated
- **Status:** User Validated
- **Source:** `EliteMay/lyrictube`
- **Reference commit:** `230fd87bf027a6d7351a3e41efa761800b945e43`
- **User validation:** 2026-08-31に現行Visualを「今のところ一番いい」「正解の一つ」として承認
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

### Transfer / Rebuild / Do not copy

- **Transfer:** Media Workflowに対するWorkspace compositionとHierarchy。
- **Rebuild:** Artwork、Player treatment、Secondary toolの強さ、Theme identity。
- **Do not copy:** 紫Accent、具体Sidebar幅、3 Paneそのもの、装飾を減らした量。

---

## VD-002 Tarkov Field Manual Knowledge Manual

- **Evidence Level:** A / User Validated
- **Status:** User Positive Validation
- **Source:** `EliteMay/Tarkov-Field-Manual`
- **Reference commit:** `dbcfa0659b28d22f7fadde4b7d4fd0c2cce7c621`
- **User validation:** 2026-08-30に「サイトめっちゃいい感じ」と明確な肯定
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

### Transfer / Rebuild / Do not copy

- **Transfer:** 学習順を可視化するRail、長文をCard依存せず構造化するManual composition。
- **Rebuild:** 題材固有のVisual language、Label、Illustration / Screenshot、Density。
- **Do not copy:** Olive Accent、Grid背景、軍用風語彙。

---

## Level B — Task Validated Reference

ここは「正解Visual」としてコピーする欄ではなく、**特定Taskで有効だったComposition**を次の設計材料にする欄です。

### REF-B-001 VReview Review Workbench

- **Source:** `EliteMay/valorant-review`
- **Evidence:** `PROJECT_LEARNINGS.md` PL-S-002
- **Structure:** 左Navigation / 中央Video・Timeline固定 / 右Scene PaneのみScroll
- **Worked because:** Scene編集をしても主対象のVideoとTimelineを見失わず、確認→修正を連続できる。
- **Use when:** Video / Image / Canvas等の主対象を見ながら横のInspector / Scene / Property Paneを長く操作するTool。
- **Avoid when:** 中央Content自体を長く読むSite、Mobile中心UI。
- **Validation limit:** Layout taskの成功Evidenceはあるが、最新Visual全体に対する明確なUser高評価は確認できていない。

### REF-B-002 Lineup Tactical Map Workspace

- **Source:** `EliteMay/valorant-lineup`
- **Evidence:** `PROJECT_LEARNINGS.md` L-004 / L-005
- **Structure:** Tactical Mapを最大Visualにし、Filter / Detail / StatisticsをSecondaryへ下げる。
- **Worked because:** 「定点を探す」というTaskの中心ObjectがMapであることをHierarchyへ直接反映できた。
- **Use when:** Map / Canvas / Diagramが主要操作面で、周辺Controlsはそれを補助するTool。
- **Avoid when:** Text / List自体が主役のKnowledge Site。
- **Validation limit:** Project Learning上は成功Patternだが、現在DirectionをAへ上げられる明確なUser Visual Validationは不足。

---

## Level C — Candidate / Recovery

### REF-C-001 AP Friendly Study Dashboard Recovery

- **Source:** `EliteMay/ap-study-guide`
- **Evidence:** `PROJECT_LEARNINGS.md` PL-F-004
- **Context:** r22でAI Template感を消す目的からTechnical Console方向へ寄せ、旧r21 40点からr22 30点へ悪化。
- **Recovery:** r23でTeal Hero、明確なAction Card、柔らかいToday、Teal current stateを復活し、Hero高さ / Shadow / Radius / Spacingだけ整理。
- **Learning:** 学習Siteでは「Cardを減らす」「硬くする」より、クリック対象の分かりやすさ・親しみやすさ・色IdentityをKEEPした上で整理する。
- **Validation limit:** r23を新しいValidated Directionとする明確な肯定Feedbackはまだ不足。Aには上げない。

### REF-C-002 ASMRTube ASMR Media Deck / Sound Map

- **Source:** `EliteMay/asmrtube`
- **Evidence:** `PROJECT_LEARNINGS.md` L-002
- **Candidate structure:** `Library rail → ASMR Media Deck → Sound Map / Timestamps`
- **Intent:** LyricTubeのMedia hierarchyは参考にしつつ、Thumbnail Ambient、Player Deck、Sound Map、ThemeをASMRTube固有Identityとして再構築する。
- **Validation limit:** v2.4低評価後に考え直したCandidateであり、成功Visualとしてはまだ登録しない。

---

## Level R — Rejected Visual Evidence

Rejectedは「二度と使えない見た目」ではなく、**そのProjectでその理由・組合せでは失敗したEvidence**です。

### RV-001 ASMRTube v2.4 — Minimalized Media Workspace Transfer

- **Source:** `EliteMay/asmrtube` `PROJECT_LEARNINGS.md` L-002
- **Result:** User評価 **40 / 100**。Visual Candidate不採用。
- **What happened:** LyricTubeの`VD-001`を参考にMedia Workspaceへ整理したが、LyricTube側で成功した「Gradient / Shadow / Cardを減らす」という表層まで強く移植した。
- **Why it failed:** ASMR固有のArtwork / Ambient / Player identityまで弱くなり、「シンプルになっただけ」に見えた。
- **Root lesson:** **成功例から“減らしたもの”を移植しない。成功した理由を移植する。**
- **Next direction:** Media hierarchyは残し、ASMR Media Deck / Sound Map / Thumbnail Ambient等をProject固有にRebuildする。

### RV-002 AP r22 — Technical Console Overcorrection

- **Source:** `EliteMay/ap-study-guide` `PROJECT_LEARNINGS.md` PL-F-004
- **Result:** 旧r21 **40 / 100** → r22 **30 / 100**。
- **What happened:** AI Template感を避けるためCard / Teal / Emoji / 柔らかいSurfaceを大きく削り、Technical Console方向へ寄せた。
- **Why it failed:** 「Anti-patternを減らすこと」が目的になり、学習Siteとしての親しみやすさ、Actionの分かりやすさ、色Identityまで失った。
- **Root lesson:** **Anti-patternはPattern禁止リストではない。Projectに必要な理由がある要素まで消さない。**
- **Next direction:** 良かったAction affordance / Teal identity / friendly surfaceをKEEPし、Hierarchy / Spacing / Consistencyを改善する。

---

## 最近のVisual修正が正解から遠ざかりやすかった理由

今回のProject横断Reviewから、主に次が見つかりました。

1. **Success Factor Misattribution** — 別Projectで「何を減らしたか」を、成功理由そのものと誤認した。
2. **Minimalism Bias** — simple / clean / minimalを品質指標として扱い、IdentityやAffordanceまで削った。
3. **Anti-pattern Overcorrection** — Card / Gradient / Emoji / Shadow等を「理由なく使わない」ではなく「使わないほど良い」と解釈した。
4. **Preserve Step不足** — 変更前に「今のUIの何が既に良いか」を固定せず、Redesignで既存価値を消した。
5. **Single-candidate Bias** — 1方向をいきなり実装し、そのDirection自体が誤りかを比較しなかった。
6. **Polish-before-reset** — 土台が弱いのにSpacing / Color / EffectのPatchを続け、Foundation Resetへ切り替える判断が遅れた。
7. **Evidence Inflation** — mainに入った、CIが通った、Assistantが良いと判断した、という状態をUser Validationと混同しやすかった。

この7点は [Anti-Pattern Catalog](anti-patterns.md) と [Success Pattern Catalog](success-patterns.md) へ一般化します。

---

## 次の正解を探す

このCatalogは完成しません。

今後Projectで「これもかなり良い」と確認できたVisualが出た場合は、既存Directionと似ているかを先に確認します。

- 本質的に同じ構造なら、既存VDのEvidence / Variantsを増やす。
- Navigation / Density / Content model / Primary taskが違うなら、新しいVDとして追加する。
- 色だけ違う場合は新しいDirectionにしない。
- User feedbackだけでなく、実ブラウザ / Responsive / Accessibility / Task usabilityも可能な範囲で確認する。
- 低評価だったCandidateは消さず、Rejected Evidenceとして失敗理由を残す。
- `PROJECT_LEARNINGS.md`へVisual feedbackがある場合は、次回Reviewで優先してEvidence Matrixへ反映する。

目標は「共通Templateを1個完成させること」ではなく、**用途別に複数の強いVisual Directionと失敗Evidenceを持ち、Projectごとに正しく選べる状態**です。
