# Game Experience Design Research — Working Evidence / Discussion Handoff

> Status: **Research in progress / 非Normative**
>
> Updated: 2026-09-06
>
> Purpose: Game制作の共通Ruleを増やしすぎず、UI / Game Screen / Interaction / Difficulty / Failure / Progression / Motivation / Pacing / System Design / Game Feelについて、研究・実例・議論から「毎Gameで正解を導くための判断Framework」を作るための作業記録。
>
> **この文書は現時点ではGuideの確定Ruleではない。** `docs/19-game-development.md` 等のNormative Ownerを上書きしない。今後Evidenceを追加・反証・統合し、最終的に少数の上位原則 / Workflow / Checklist / Catalogへ整理するためのResearch Snapshotとして扱う。

---

## 1. なぜこのResearchを始めたか

最初の目的は `EliteMay/game` の `Scrap Factory` のUI要件を考えることだった。

ただし、特定のFactory Gameだけを参考に「良いHUDの形」を固定すると、次にFPS / RPG / Horror / Strategy / Puzzle / Racing等を作ったときに誤った共通Ruleになる可能性が高い。

そのため方針を次へ変更した。

- Popular Gameから小規模Gameまで**ジャンル横断**で見る。
- 特定GameのFeature有無だけでなく、Game Screen全体を多角的に分析する。
- Game実例は最低100タイトル規模を母数として扱う方針とする。
- 論文、CHI / CHI PLAY、GDC、Game Developer記事、Platform HolderのGuideline、Game UI Database、Accessibility資料等もEvidenceへ入れる。
- 「どのGameでもHUDを15%にする」のような完成形Ruleではなく、**そのGameのGenre / Camera / Task / State / Player / Inputに合う答えを毎回導くWorkflow**を共通化する。
- 100本規模の横断調査は毎Projectで義務化しない。今回のような共通Framework形成では大きな母数を使い、通常Projectでは必要に応じ5〜20本程度のDomain / Adjacent Researchから始める案が有力。

### 重要な正直な状態

「最低100タイトルを母数にする」という方針は確定しているが、現時点でタイトル別の完全な監査表（全100+本に同一尺度でScoreを付けた表）はまだ作成していない。

今後必要なら、Genre / Camera / UI Density / Persistence / Menu structure / Tutorial / Accessibility等の共通列を持つ100+ title analysis sheetを別途作る。

---

## 2. 共通Guideへ何を書くべきか — 現時点の設計思想

### 書かない方がよい例

```text
FPSはHUD 10%以下
HPは左下
Mapは右上
Objectiveは右上
Checkpointは5分間隔
全GameにAdaptive Difficulty
```

これらはGameによって正解が変わる。

### 共通Guideへ残す候補

1. **普遍性の高い上位原則**
2. **正解を探すための判断軸**
3. **Research Workflow**
4. **Playtest / Validation方法**
5. 条件別Checklist

### References / Catalogへ残すもの

- Game Aではどうしているか
- FPSではこういう傾向があった
- StrategyではUI占有率が高くなる傾向
- Eye Tracking研究の結果
- Failure / DDA / HUD等の論文Evidence

### 各GameのREQUIREMENTSへ残すもの

- そのGameの具体HUD
- Camera / Input
- Difficulty Contract
- Save / Failure Contract
- Build UI
- Progression
- Tutorial
- Assist settings
- Visual Direction

つまり最終構造は次が有力。

```text
web-project-guide
  ↓
共通原則 / Decision Framework
  ↓
GameごとのDomain / Genre Research
  ↓
各Game REQUIREMENTS
  ↓
実装
  ↓
Playtest
  ↓
PROJECT_LEARNINGS / Catalog / Evidence
```

---

## 3. Game UIではなく「Game Information Design」として考える

Researchを進めるほど、HUD / MenuだけをUIと考えるのは狭すぎると分かった。

Playerへ情報を伝えるChannelには次がある。

- World geometry
- Lighting
- Color
- Material
- Landmark
- NPC gaze / body orientation
- Animation
- Motion
- VFX
- HUD
- World-space UI
- Diegetic UI
- Menu / Panel
- Text
- Audio
- Spatial Audio
- Haptic
- Camera

したがって上位概念は次が有力。

```text
Playerへ伝えたいInformation
  ↓
どの感覚Channelを使う？
  ↓
Visual / Audio / Haptic
  ↓
Visualならどこ？
  ↓
World / World-space / Diegetic / HUD / Menu
  ↓
いつ？
  ↓
Permanent / Contextual / Event-driven / Requested
```

### 仮説

**UIを減らす = 情報を減らす** ではない。

HUDを削除する場合、その情報が必要ならWorld / Audio / Haptic / Animation等へRelocateする必要がある。

---

## 4. UI Density / Screen Occupancy — 固定値ではなくStateで変える

ジャンルによって通常HUDの密度には傾向差がある。

例として過去研究ではFPSとRTSのHUD面積に大きな差が報告されている。また、Strategy / ManagementではUI自体がGameplayの主要部分になる一方、Horror / Immersive / ExplorationではWorld visibilityを優先するGameが多い。

ただし「Genre = HUD %」へ固定しない。

同じGameでもStateで必要量が変わる。

```text
Exploration
  ↓ Low density
Combat / Hazard
  ↓ Medium
Build
  ↓ Medium–High
Machine Interaction
  ↓ Local panel
Inventory
  ↓ High
Management / Research
  ↓ High / Fullscreen allowed
```

### Working concept: Adaptive Density UI

最適化対象は「UIを少なくすること」ではなく、**今のPlayer Taskへ必要な密度へ変えること**。

Screen OccupancyはRuleではなくReview metricとして扱う案が有力。

見る項目:

- Screen occupancy
- Center obstruction
- Edge density
- Text amount
- Popup frequency
- Permanent / Temporary比率
- World visibility
- Gaze travel
- Menu depth

---

## 5. Attention — Pixelではなく「注意」を有限資源として考える

Research全体で非常に強く残った考え。

### Attention Budget

Playerは画面上の全情報を同時に同じ強さで処理できない。

### Attention Competition

重要なのは個々のUIが正しいかだけではない。

```text
Enemy attack
Low HP
Quest Updated
Achievement
Tutorial Hint
Loot acquired
Factory Alert
```

が同時に出れば互いにCompetitionする。

### Attention Hierarchy

Game上のPriorityとVisual Salienceを大きく逆転させない。

```text
Enemy attack > Low HP > Current Objective > Loot > Achievement
```

なのにAchievementが最大Popup + Gold animation + SoundでEnemyより目立つ、という状態は避ける候補。

### Salience Inflation

強いCueを大量に使うと、全部が通常状態になる。

- Red
- Glow
- Blink
- Sudden onset
- Motion
- Sound
- Large Text

は**希少資源**として扱う考えが有力。

### Center Budget

Camera中心Game / FPSでは中央は最も価値の高いAttention Space。

中央はAim / Enemy / Interactable / Build Preview等のPrimary Gameplayへ使われるため、理由なくLong text / Achievement / Statistics等で奪わない。

ただしRTS / Rhythm / Card等ではFocal Zoneが異なるため、位置固定Ruleにはしない。

### Motion Budget

Motionは強いAttention Cueだが、FactoryのようにWorldが常時動くGameではMotionが大量に存在する。

候補:

- Gameplayとして意味のあるMotion → 常時可
- 状態変化を知らせるMotion → 一時的
- Decorative UI motion → 控えめ

**Motion = 何か起きた** というVisual Languageを維持できるかを見る。

---

## 6. Attention Zone Model — 位置ではなく役割

論文の固定分類ではなく、Researchを整理するためのWorking Model。

### Focal Zone

Playerが直接見ている場所。

- Aim target
- Enemy
- Machine
- Placement
- Interactable

Primary Gameplay領域。

### Awareness Zone

直接読まなくても変化を感じたい領域。

- HP
- Ammo
- Cooldown
- Directional danger

Peripheral Visionで量・変化を感じられる可能性がある。

### Reference Zone

必要なときに意識的に見る。

- Minimap
- Quest details
- Cash
- Production rate
- Inventory capacity

位置はGameによって変える。

---

## 7. Visual Attention / Cue設計

Researchで有力だったCue:

- Local contrast
- Motion
- Sudden onset
- Flicker / luminance change
- Size difference
- Text
- Human / face
- Gaze direction
- Audio location

ただし**Attention Strength Rankingを固定しない**。

PlayerのTop-down Task（何を探しているか）とScene内Contrastによって効果は変わる。

### Cue Consistency

一度学習した意味を理由なく変えない。

```text
黄色 = 登れる
```

と学ばせた後、黄色をLoot / Danger / Decoration / Objectiveへ無秩序に使うとVisual Languageが壊れる。

### Cue Competition

Lighting / Landmark / Audio / Marker等が異なる方向へ誘導すると混乱する。

### Attention Intensity Ladder — Working Model

- Level 0 Ambient
- Level 1 Discoverable
- Level 2 Noticeable
- Level 3 Important
- Level 4 Critical

Level 4を乱用しない。

### Multimodal Redundancy

Critical informationはVisual + Audio + 必要ならHaptic等を検討。

ただし全情報を全Channelで重複させない。

有力案:

```text
Critical → 2〜3 Channel
Important → 1〜2
Normal → 1中心
Low → Passive / Requested
```

数値Ruleではなく設計指針。

---

## 8. Alert / Notification

### Notification Costは表示時間だけではない

```text
Interrupt
+ Read
+ Understand
+ Remember previous goal
+ Reorient
+ Resume
```

までCostになる。

### Notification Queue

候補:

- Critical → 即時、低Priorityを抑制
- Important → Criticalがなければ表示
- Normal → Queue
- Low → Safe moment / Log

### Alert成功モデル

Warningは「見た」で成功ではない。

```text
1. Notice
2. Understand
3. Locate
4. Act
5. Confirm
```

Factory例:

```text
Smelter #12
Stopped: Power shortage
Available 18 / Required 25 MW
[Locate]
```

修正後はRecoveryを確認できるFeedbackを返す。

---

## 9. Cognitive Budget — UIを減らすだけでは不十分

### Visual Minimalism ≠ Cognitive Minimalism

HUDを消しても、Playerが次を頭で覚えるなら負担は残る。

- あと何個必要
- どのMachineが止まった
- 何が原因
- 次のObjective
- どのRoute

### Externalize Memory

Gameが保持できる情報をPlayerに暗記させない。

Alert Log / Quest Log / Recipe / Tracked Material / Recent Task等。

### Meaningful vs Wasteful Cognitive Load

残したい負荷:

- Factory Layoutを考える
- Upgradeを選ぶ
- Boss Patternを読む
- Routeを考える

減らしたい負荷:

- Buttonの場所を探す
- 消えたPopupを覚える
- 原因をUI不足から推測
- 離れた表示を何度も往復
- Modeを推測

**GameのChallengeを簡単にするのではなく、Gameとして面白くない認知負荷を減らす。**

---

## 10. Working Memory / Chunking / Decision Complexity

### 個数Ruleにしない

「人間は4個しか扱えないからUIは4個まで」のような誤用はしない。

熟練Playerは複数要素を1つのChunk / Patternとして理解できる。

### Split Attention

一緒に理解する必要がある情報を離しすぎるとIntegration Costが増える。

BuildではGhostとCost / Validity / I/O方向を近くに出す価値がある場合がある。

World-space UIも、Objectとその情報を同時に理解する必要がある場合のSplit Attention低減として説明できる。

### Choice Count ≠ Decision Complexity

Decision Complexity候補:

```text
選択肢数
× 比較項目
× 必要知識
× 不確実性
× Time pressure
```

30 UpgradeでもCategory / Dependency / Recommendationが明確なら扱いやすい場合がある。

---

## 11. Progressive Disclosureではなく「Complexity Staging」

複雑なGameを単純化する必要はない。

**複雑さをいつ・どの順番でPlayerへ渡すか**を設計する。

例:

```text
Machineを見る
→ Running / Stopped

近付く
→ Recipe / E Inspect

Inspect
→ Input / Output / Power / Efficiency

Diagnostics
→ History / Forecast / Expert data
```

### Depth Budget

重要度が高いほど浅くする。

- Critical → 0階層
- Actionable detail → 0〜1
- Detailed diagnosis → 1〜2
- Expert data → 深くてもよい

ただしPuzzle等では答えを教えすぎない。

---

## 12. Recognition / Recall / Discoverability

初心者へ大量Shortcut暗記を要求しない。

### Layered Recognition

```text
今使える主要Action → Contextで表示
関連Action → Context menu
全Action → Menu / Guide
Expert → Shortcut
```

Playerは Recognition → Learning → Recall へ自然に移れる。

### Discoverability Failure

機能があっても存在を知らなければ実質使えない。

ただし常時Shortcutを大量表示する必要はない。

初回Hint + Context Hint + Guide再確認などが候補。

---

## 13. Affordance / Signifier / Expectation Alignment

### Real Affordance

実際に何ができるか。

### Perceived Affordance / Signifier

Playerが「できそう」と理解する手掛かり。

問題:

- 登れそうなのに登れない
- 押せるButtonがDecorationに見える

### Expectation Alignment

```text
できそうに見える
↓
実際にできる
↓
予測した結果が返る
```

これが「直感的」の一部。

---

## 14. Interaction Grammar / Predictability

Game全体で操作文法を持つ。

例:

```text
E = world interact
Esc = back / exit
Left click = primary
Right click = secondary
```

MenuもNavigation / Confirm / Back等のPatternを一貫させる。

Consistencyの目的は見た目を揃えるだけでなく、**Playerが未経験Situationでも次のActionを予測できること**。

### Game Interaction Loop

```text
1. Perceive — 何ができる？
2. Predict — やると何が起きる？
3. Act — 操作
4. Confirm — Inputを受け付けた？
5. Understand — 何が変わった？
6. Recover / Continue — 次は？失敗ならどう直す？
```

---

## 15. Feedback / Constraint / Disabled State

### Before / During / After

- Before → Action Signifier
- During → Input accepted / Progress
- After → Outcome / New state

### Direct Feedback

操作対象そのものが変化する方が理解しやすい場合がある。

Build例:

- Ghost green → valid
- Ghost red → invalid
- Reason → collision / resource / slope

### Constraint Before Error

UI事故はError後に叱るより、可能なら事前に防ぐ。

### Hidden vs Disabled

- 普段存在するが今だけ使えない → Disabled + 必要なら理由
- そのContextでは関係ない → Hidden候補

### Explain Inaction

Gray buttonだけで理由不明にしない。

- Need material
- Cooldown
- Wrong mode
- Too far
- Locked
- Invalid target

など次Actionへつながる情報を検討。

---

## 16. Mode Visibility / Continuity / Resumption

Mode例:

- Normal
- Build
- Dismantle
- Scanner
- Placement
- Combat

同じInputでも意味が変わる場合、Playerが今のModeを認識できないとMode Errorが起きる。

### Mode Visibility

Visual / behavior / 必要ならAudioで現在Modeを知覚可能にする。

Exitも明確にする。

### Context Continuity

Menu / Notification / Cutscene / Death / Tutorial / Inventory等はPlayerのMental Contextを切る。

Playerが戻ったとき:

- 今何をしていた？
- どこを直していた？
- どのMode？
- 次は何？

を復元できるようにする。

### Resume Context

Recent task / previous target / current project / marker等を必要に応じ保持。

---

## 17. Persistence of Information

情報は次へ分類すると考えやすい。

- Ephemeral — +10 Iron
- Temporary — Quest updated
- Persistent — Low HP / current build state
- Recallable — Quest log / Alert history / Tutorial guide

重要な情報を「一瞬出して消えて終わり」にするとWorking Memoryへ負荷を移す。

Toastは消えてもLogに残す等を検討。

---

## 18. Failure — 難易度とUI事故を分離する

Failureを分類する。

- Gameplay Failure
- Skill / Execution Failure
- Understanding Failure
- Interface Failure
- System Failure

### Meaningful Failure

FailureがChallenge / Learning / Riskへ意味を持つなら残せる。

Interface事故 / Save loss / Softlock等をDifficultyとして扱わない。

### Difficulty ≠ Punishment

Celesteのように高いExecution Difficulty + 低いRetry Frictionは成立する。

Dark SoulsのようにRecovery / Repetition自体がMastery / Riskへ意味を持つ場合もある。

### Recovery Cost must have a purpose

見るCost:

- Time
- Progress
- Resource
- Repetition
- Cognitive
- Navigation
- Uncertainty
- Emotional

### Failure Scope Matching

探索で失敗したPenaltyが探索成果へかかるのは理解しやすいが、無関係なFactory progressまで大幅に巻き戻すのは再検討。

---

## 19. Undo / Confirmation / Save / Recovery

### Reversible action

できるだけDirect execution + Undo / Recoveryを優先候補。

### Irreversible + High consequence

Confirmation候補。

Routine actionすべてへConfirmationを付けるとHabituationする。

### Experiment Safety

Factory / Building / Strategyでは Try → Observe → Fix がGameplayになる。

無意味な高PenaltyでExperimentを殺さない。

### Save / Checkpoint

全GameへManual Saveを機械的に要求しない。

決めること:

- 何を失う
- なぜ失う
- どこから再開
- Session中断可能性
- Autosave trap
- 過去stateへ戻す必要

### Recovery State Integrity

HP1 / Ammo0 / Enemy surrounded等のUnrecoverable Autosaveを避ける設計を検討。

---

## 20. Difficulty / Challenge / Fairness

### Difficulty Is Multidimensional

Candidate axes:

- Motor precision
- Reaction
- Timing
- Perception
- Memory
- Knowledge
- Planning
- Decision
- Resource management
- Information load
- Time pressure
- Uncertainty
- Punishment
- Endurance

### Core Challenge Alignment

難しさはGameが上達してほしいSkillから作る。

FactoryならLayout / Logistics / Power planning等はChallengeになってよい。

- I/Oが見えない
- Alert原因不明
- Buttonが見つからない

はInterface Challengeであり、Core Challengeとは分離する。

### Fair Challenge Model

- Readable
- Predictable
- Actionable
- Consistent
- Causal
- Learnable

Fairnessは敵とPlayerを同能力にすることではなく、Ruleを理解し結果へ影響できること。

### Skill Test Integrity

Challengeが本当に狙ったSkillを試しているか確認。

Aim Gameで敵が背景に埋もれて見えない場合、AimではなくVisibilityをTestしている可能性がある。

---

## 21. Difficulty Settings / Assist / DDA

### Global Easy / Normal / Hardだけにしない候補

Combat / Aim / Timing / Puzzle hints / Resource loss等、Challenge軸ごとの調整を検討。

### Assistance ≠ Global Difficulty Reduction

Aimだけ苦手なPlayerにFactory economyまで簡単にする必要はない。

### Player Agency

Hidden DDAを機械的なDefaultにしない。

必要ならPlayer-controlled Assist / Settingsを優先候補とする。

### Challenge Ownership

Playerが自分で選んだChallengeだと感じられることを重視。

---

## 22. Motivation / Progression / Reward

Self-Determination Theoryから特に有力:

- Competence
- Autonomy
- Relatedness（Gameによる）

ただし全Gameで3要素最大化をMUSTにしない。Horror等ではPowerlessness / Isolationが意図的Experienceの場合がある。

### Progression種類

- Numerical
- Capability
- Efficiency
- Knowledge
- Spatial
- Collection
- Narrative
- Mastery

### Capability Progression

数字が増えるだけでなく、できること / Strategy / Workflowが変わるProgressionは強い候補。

### Progress Evidence

「成長しました」と言うだけでなく、Playerが過去との差を体験・観測できるようにする。

### Autonomy

選択肢数ではなく、Playerの選択がPlay style / World / Strategyへ意味ある差を残すかを見る。

---

## 23. Retention / Rewardの扱い

### Engagement ≠ Enjoyment

Daily / Streak / Variable Reward等で戻ってきても、Core Gameが面白くなったとは限らない。

### Behavioral Retention vs Experiential Engagement

Guideでは「長く拘束する」を直接Optimization Goalにしない方向が有力。

目指す候補:

**Playerが自分から次のGoalを持ちたくなるGame。**

### Manipulative Retentionを避ける方向

- FOMO
- Exit friction
- Streak loss pressure
- Gambling-like variable reinforcement

を数字だけで正当化しない。

### Reward should feed the Core Loop

Rewardが次のCapability / Choice / Exploration / Strategyへつながるかを見る。

---

## 24. Goal Horizon / Session Motivation

Goalを複数Time Horizonで考える。

- Long-term
- Mid-term
- Short-term
- Immediate

ただし全部をHUDへ並べない。

### Game-set / Player-set / Emergent Goal

Sandbox / FactoryではPlayer自身がGoalを生成できるSystemが重要。

### Goal Generation Capacity

Quest数ではなく、SystemからPlayer-set goalが生まれるかを見る。

### Session Closure

有力な思想:

**Satisfied Stop + Clear Continuation**

```text
今日の達成
+ Save済み
+ 安全に終了可能
+ 次にやりたいことが見えている
```

Gameをやめにくくするのではなく、やめても続きを理解でき、また自分から戻りたくなる。

---

## 25. Boredom / Novelty / Repetition

### Repetition ≠ Boredom

同じActionでもSituation / Decision / Learning / Expressionが変わればExperienceは変わる。

### Boredom Working Hypothesis

Learning / Discovery / Meaningful Decision / Expression等の変化が止まった状態でRiskが高まる。

### Novelty Sources

- Content
- Mechanical
- Contextual
- Combinatorial
- Strategic
- Mastery
- Informational
- Spatial
- Narrative
- Social
- Procedural
- Creative

### Stable Core, Evolving Experience

Core Actionは反復してもよい。

Experience側に意味ある変化を作る。

### Meaningful Repetition vs Grind

Working definition:

**Grind = Meaningful Decision / Learning / Expressionがほぼ増えない反復を、外部Goalのため大量要求する状態。**

### Clarity vs Mystery

- Action / Ruleは分かる
- Outcome / Discoveryは未知

`Confusion` と `Mystery` を分ける。

---

## 26. Pacing / Session Structure

PacingをAction speedだけで扱わない。

Candidate axes:

- Action tempo
- Threat
- Tension
- Cognitive load
- Decision pressure
- Movement impetus
- Novelty rate
- Goal pressure
- Information density
- Reward frequency

### Peaks Need Contrast

高強度を価値あるPeakにするにはLow / Recoveryが必要な場合がある。

### RecoveryもGameplay

Combat後すぐInventory比較 / Skill Tree / 20 Loot整理を要求するとCognitive recoveryにならない。

### Pacing Authority

- Designer-heavy
- Shared
- Player-heavy

Sandbox / FactoryではPlayer-controlled pacingを尊重し、強制Interruptを乱用しない。

### Micro / Meso / Macro

- Moment
- Activity / Session
- Progression / Full Experience

を別々に評価。

---

## 27. System Design — Feature数よりPossibility Space

### Feature Count ≠ Possibility Space

10個の独立Systemより、少数の異なる役割を持つSystemが意味ある相互作用を作る方がDepthを生む場合がある。

### Complexity / Depth / Breadthを分ける

- Complexity — 理解・記憶するRule / State量
- Depth — 理解したRuleから生まれるMeaningful Decisionの幅
- Breadth — System / Content / Action種類
- Possibility Space — 取り得るAction / State / Outcome全体
- Agency — その中でGoalを持ち結果へ影響できる度合い

### Complexity Must Earn Its Cost

新System / Ruleは、新Decision / Strategy / Expression / Risk等を生む理由を持つ。

### Interaction Density

System同士の関係を見る。

ただし全部を全部につなげる`Systemic Spaghetti`を避ける。

### Readable Interaction Network

PlayerがSystem間の因果を学習できるようにする。

### Systemic Promise

一度World Ruleを教えたら、Scope内では理由なく破らない。

ただし全Worldを完全Simulationにする必要はなく、対象Scopeを明確にする。

---

## 28. Emergence + Progression

EmergenceとAuthored Progressionは対立ではない。

Factory等では:

```text
Progression
→ 新Rule / Toolを段階的に開く

Emergence
→ 使い方 / 組合せ / LayoutをPlayerへ任せる
```

Progressionを「Content消費一本道」ではなく、**Possibility Spaceを段階的に開く仕組み**として使える。

### Feature Unlock vs Possibility Unlock

新Machine追加より、そのMachineで何が新しく可能になったかを見る。

### Intentional Agency

自由度の数ではなく、PlayerがSystemを理解しGoal → Plan → Actionを自分で作れること。

---

## 29. Game Feel / Input / Responsiveness

Game FeelをJuiceだけで考えない。

有力な3要素:

- Tuning
- Juicing
- Streamlining

### Intent Fidelity

Responsive Gameを「入力通り100%厳密」に限定しない。

有力な定義:

**PlayerがやろうとしたことをGameが理解し、適切な速さで受け付け、期待する結果へつなぎ、変化を明確に返す。**

### Per-Verb Response

- Look / Aim
- Move
- Jump
- Fire
- Interact
- Build
- Menu

でLatency requirementは異なる。

固定msを共通Ruleにしない。

### Acknowledgment vs Outcome

Outcomeに時間が必要でもInput acceptedは早く返す。

```text
Input
→ immediate acknowledgment
→ action / progress
→ delayed outcome
```

### Responsiveness vs Weight

重さをLatencyだけで買わない。

- Animation follow-through
- Momentum
- Acceleration
- Audio
- Recoil
- Camera
- Environment reaction

等も使える。

### Assist Execution, Preserve Decisions

Snap / Coyote time / Input buffer / Forgiveness等でGameが試したくない精度要求を減らし、Meaningful decisionはPlayerへ残す。

### Assistance Strength ≈ Intent Confidence

Game側の意図推定にConfidenceが高いほど補助を強くできる候補。

勝手なAuto-correctionでAgencyを奪わない。

---

## 30. Camera / Motion / Accessibility

Game FeelとAccessibilityを対立させない。

Camera関連:

- FOV
- Sensitivity
- Screen shake
- Head bob
- Motion blur
- Weapon sway
- Auto camera movement

はGameに応じて調整可能性を検討。

### Feel LayerとCore Mechanicsを分ける

Presentation effectを0にしてもCore Controlが壊れない設計を検討できる。

---

## 31. 現時点の上位Framework候補

細かいRuleを数十個作らず、最終的には5〜8本程度の上位原則へ圧縮する方向。

現時点の候補:

### A. Player Goal / Core Experience First

何をPlayerにさせたい・感じさせたいかから始める。

### B. Cognitive Budget

Attention / Working Memory / Perception / Decision / Motorを、Gameとして意味のないFrictionへ浪費させない。

### C. Information Architecture

何を、いつ、どこに、どの深さで、どのChannelで、どのSalienceで、どれくらい残すか設計する。

### D. Interaction / Predictability

何ができ、何が起き、Inputが受理され、結果が分かり、失敗から続けられるか。

### E. Continuity / Recovery

Mode / Menu / Failure / Notification / Session interruption後もMental Contextを失わせない。

### F. Adaptive Context

Genre / Camera / Primary Task / Game State / Expertise / Input / Platformに応じて最適解を変える。

### G. Meaningful Challenge / Progression

Gameが本当に試したいSkill / DecisionをChallengeにし、Progression / Reward / FailureをCore Loopへ接続する。

### H. Validation

「分かるはず」「気持ちいいはず」ではなく、実際のPlayer行動 / Playtest / 必要ならTelemetry / Eye Tracking等で確認する。

まだ最終確定しない。

---

## 32. GameごとのResearch Workflow候補

新Gameまたは大規模改修時:

```text
1. Core Experienceを定義
2. Primary Player Tasks / Verbsを定義
3. Genre / Camera / Input / Platform / Session Scaleを確認
4. 同Genre + 隣接GenreのReferenceを調査
5. UI / Game Screen / Interaction / Failure / Progression等を比較
6. Game State Matrixを作る
7. Information / Attention / Cognitive requirementsを整理
8. UI / Interaction / Challenge Directionを決める
9. Prototype / Vertical Slice
10. Playtest
11. Observationから修正
12. Project Requirements / Learningsへ確定内容を保存
```

通常ProjectでReference数を機械的に100本へ固定しない。

Research uncertaintyが高い場合に母数を増やす。

---

## 33. Game UI / Experience Profile候補

Gameごとに次を埋める案。

- Genre
- Camera
- Primary Task
- Core Verbs
- World Importance
- Information Pressure
- Action Pace
- Decision Pace
- Input
- Platform
- Management Depth
- Combat Importance
- Navigation Need
- Failure Cost
- Session Length
- Player Experience / Expertise
- Visual Identity
- Pacing Authority
- Novelty Source
- Variation Source
- Difficulty Axes
- Assistance Axes

### Game State Matrix候補

| State | Primary Task | Required Info | Hideable Info | Density | Mode / Input | Failure / Exit |
|---|---|---|---|---|---|---|
| Explore | World / Navigation | Contextual | Detail stats | Low | Normal | Safe resume |
| Combat | Fight | HP / threat / resources | Craft detail | Medium | Combat | Fast recovery |
| Build | Placement | Cost / snap / I/O / validity | unrelated combat info | Medium-High | Build | Undo / dismantle |
| Inventory | Manage items | Inventory info | most world HUD | High | Menu | Context preserved |
| Management | Analyze / decide | Stats / alerts / comparison | world HUD | High | Full UI | Resume project |

TableはGameに応じて変える。

---

## 34. Scrap Factoryへ適用した現時点の候補（未確定）

このResearchの開始点だったため、Project固有候補も記録しておく。ただし**まだ `EliteMay/game` の確定要件ではない**。

### Direction候補

**Contextual Industrial / Adaptive Density UI**

### 状態別イメージ

- Exploration → World-first, low density
- Factory normal → low-medium
- Hazard / combat → necessary survival info
- Build → cost / rotation / snap / direction / I/O / invalid reasonを増やす
- Machine inspect → Local panel
- PC / Factory Management → High-density / Fullscreen allowed

### 現UIで再検討候補

- Bottom-left control hintsとbottom-right shortcut barの重複
- Cash / Revenue / Pack / Zoneを本当に常時必要とするか
- Static helpをFirst-use + Context hint + Guideへ再構成可能か

### 既存要件と相性がよい点

- 3D Canvasを主役
- Build専用情報をMode中だけ
- Scanner / Tracking / Secure Case等をContextual
- 詳細統計をFactory Managementへ
- TutorialをObjective → Hint → Highlight → Detailed helpへ段階化
- 同種Alertを集約

Research完了後に `EliteMay/game/REQUIREMENTS.md` へ必要なProject固有部分だけ確定統合する。

---

## 35. 主要Reference / Evidence Index

以下は今回の議論で参照した主要資料。URL / Research detailは将来再確認し、確定Ruleへ昇格させるときは一次Source / Publication metadataを再検証する。

### Game UI / HUD / Genre

- Using genres to customize usability evaluations of video games — https://doi.org/10.1145/1496984.1497006
- Influence of head-up displays' characteristics on user experience in video games — https://www.sciencedirect.com/science/article/pii/S1071581915001779
- HUD characteristics / action games — https://www.tandfonline.com/doi/full/10.1080/0144929X.2022.2081609
- HUD / Diegetic / Spatial displays comparison — https://www.sciencedirect.com/science/article/pii/S1875952117300435
- Interface In Game — https://interfaceingame.com/
- Game UI Database relaunch overview — https://www.gamedeveloper.com/design/game-ui-database-relaunches-with-new-features-video-support-and-over-55-000-screenshots

### Attention / Eye Tracking / Visual Guidance

- Attention, Not Immersion — GDC Vault — https://gdcvault.com/play/1015464/Attention-Not-Immersion-Making-Your
- Perceiving without looking: HUDs for peripheral vision — https://www.gamedeveloper.com/design/perceiving-without-looking-designing-huds-for-peripheral-vision
- Visual clutter and action game experience — https://pubmed.ncbi.nlm.nih.gov/34717071/
- Dynamic scene / FPS visual attention — https://pmc.ncbi.nlm.nih.gov/articles/PMC8566014/
- Dynamic scene saliency review — https://pmc.ncbi.nlm.nih.gov/articles/PMC6802790/
- Center bias — https://pubmed.ncbi.nlm.nih.gov/19761319/
- Face / text fixation — https://pubmed.ncbi.nlm.nih.gov/20053101/
- Text attention in scenes — https://pubmed.ncbi.nlm.nih.gov/22715197/
- Gaze cueing — https://pmc.ncbi.nlm.nih.gov/articles/PMC1950440/
- Level design eye tracking — https://www.sciencedirect.com/science/article/pii/S1875952116000021
- Lighting / landmarks / auditory cues — https://pure.hud.ac.uk/en/publications/the-effect-of-lighting-landmarks-and-auditory-cues-on-human-perfo/

### Accessibility / Information presentation

- Xbox Accessibility Guidelines — https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/
- XAG 102 Text Display — https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/102
- XAG 103 Sensory alternatives / multimodal information — https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/103
- XAG 108 Difficulty and challenge — https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/108
- XAG 112 UI navigation — https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/112
- XAG 117 Motion — https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/117
- Game Accessibility Guidelines — https://gameaccessibilityguidelines.com/

### Cognitive Load / Working Memory / Choice

- Cowan, magical number 4 / Working Memory — https://www.researchgate.net/publication/11830840_The_magical_number_4_in_short-term_memory_A_reconsideration_of_mental_storage_capacity
- Game interface workload / usability — https://doi.org/10.1145/3290688.3290749
- Multiple Resource Theory — https://pubmed.ncbi.nlm.nih.gov/18689052/
- Choice overload meta-analysis 2010 — https://ideas.repec.org/a/oup/jconrs/v37y2010i3p409-425.html
- Choice overload moderators 2015 — https://doi.org/10.1016/j.jcps.2014.08.002
- Redundancy / multimedia review — https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1148035/full

### Tutorial / Learning

- Game tutorial literature review — https://www.sciencedirect.com/science/article/pii/S2405844022027700
- Apple Game Onboarding — https://developer.apple.com/app-store/onboarding-for-games/

### Affordance / Interaction / Feedback

- Don Norman: Signifiers, not affordances — https://jnd.org/signifiers-not-affordances/
- DiGRA game affordance research — https://dl.digra.org/index.php/dl/article/view/687
- Apple Feedback — https://developer.apple.com/design/human-interface-guidelines/feedback
- Apple Game Controls — https://developer.apple.com/design/human-interface-guidelines/game-controls
- Xbox UI navigation — https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/112

### Failure / Recovery / Difficulty

- Celeste failure / resilience study — https://www.sciencedirect.com/science/article/pii/S1071581923002082
- Positive experiences of failure — https://eprints.whiterose.ac.uk/id/eprint/176162/
- Celeste developer interview — https://www.nintendo.com/jp/topics/article/19b31c18-6544-11e8-b9c0-063b7ac45a6d
- Dark Souls Q&A / retry philosophy — https://blog.playstation.com/2011/02/04/dark-souls-qa-variety-is-the-spice-of-death/
- Confirmation dialogs — https://www.nngroup.com/articles/confirmation-dialog/
- Apple Undo and Redo — https://developer.apple.com/design/human-interface-guidelines/undo-and-redo
- Apple Alerts — https://developer.apple.com/design/human-interface-guidelines/alerts
- DDA CHI PLAY — https://doi.org/10.1145/3116595.3116623
- DDA comparison 2024 — https://www.mdpi.com/2813-2084/3/2/12

### Motivation / Progression / Engagement

- Ryan, Rigby, Przybylski SDT / video games — https://pure.ewha.ac.kr/en/publications/the-motivational-pull-of-video-games-a-self-determination-theory-
- Positive feedback / competence / autonomy — https://www.sciencedirect.com/science/article/pii/S0747563215000527
- Extrinsic rewards meta-analysis — https://pubmed.ncbi.nlm.nih.gov/10589297/
- GDC Intrinsic and Extrinsic Player Motivation — https://www.gdcvault.com/play/1015985/Intrinsic-and-Extrinsic-Player-Motivation
- Variable reward serious game study — https://journal.seriousgamessociety.org/index.php/IJSG/article/view/47

### Novelty / Boredom / Pacing

- Repetition and enjoyment — https://pubmed.ncbi.nlm.nih.gov/30896242/
- Learning progress and game enjoyment — https://www.nature.com/articles/s41598-025-14628-2
- Novelty satisfaction in games — https://academic.oup.com/iwc/article-abstract/38/3/342/7629773
- Gameplay Loop model — https://www.researchgate.net/publication/310480261_The_Gameplay_Loop_a_Player_Activity_Model_for_Game_Design_and_Analysis
- Game pace / All Ghillied Up analysis — https://www.gamedeveloper.com/design/examining-game-pace-how-single-player-levels-tick
- Pacing structure — https://www.gamedeveloper.com/design/gameplay-fundamentals-revisited-part-2-building-a-pacing-structure

### Emergence / Systems / Agency

- Jesper Juul, emergence and progression — https://jesperjuul.net/text/openandtheclosed.html
- Player agency / possibility space — https://www.degruyterbrill.com/document/doi/10.1515/fns-2020-0012/html?lang=en
- Clint Hocking, Designing to Promote Intentional Play — https://www.gdcvault.com/play/1013427/Designing-to-Promote-Intentional
- Machinations / emergent behavior analysis — https://ojs.aaai.org/index.php/AIIDE/article/view/12477
- Emergent gameplay practical analysis — https://www.gamedeveloper.com/design/examining-emergent-gameplay

### Game Feel / Input

- Game Feel survey — https://doi.org/10.1109/TG.2021.3072241
- Latency and in-game perspective — https://www.researchgate.net/publication/374449075_The_Effects_of_Latency_and_In-Game_Perspective_on_Player_Performance_and_Game_Experience
- Reading the Player's Mind — https://www.gdcvault.com/play/1012339/Reading-the-Player-s-Mind
- Forgiveness Mechanics — https://www.gdcvault.com/play/1026606/Forgiveness-Mechanics-Reading-Minds-for/
- Game animation responsiveness — https://www.gamedeveloper.com/design/5-tips-to-make-your-game-animations-better

---

## 36. 現時点でまだ確定していないこと

次はまだResearch / Debateが必要。

1. 上位Frameworkを最終的に何本へ圧縮するか。
2. どれを `docs/19-game-development.md` のNormative Ruleへ昇格させるか。
3. どれを `docs/04-ui-ux-accessibility.md` / `docs/07-testing-quality.md` / Catalog / Checklistへ置くか。
4. Game UI Domain Researchで通常何本を見るか。固定数にするかCondition-basedにするか。
5. 100+ title analysisを表形式で正式実施するか。
6. Game Screen Occupancyをどう測るか。Pixel % / Visual weight / attention mapのどれを使うか。
7. Adaptive UIが習熟Playerにどこまで自動変化してよいか。
8. Dynamic Difficulty / Hidden Assistanceをどの条件なら許容するか。
9. Ethical retention / monetization ruleをGame Guideへどこまで入れるか。
10. Game Feel / latencyをPerformance Owner (`docs/05`) とGame Owner (`docs/19`) のどこまでで分担するか。
11. Emergence / Possibility SpaceをMini Gameへ過剰適用しない条件。
12. AccessibilityとCore Challengeの境界をどうRequirementsで書くか。

---

## 37. 次会話での再開方法

次会話では長い引継ぎPromptを作る必要はない。

最初に最新の `EliteMay/web-project-guide` の `README.md` / `START_HERE.md` を確認した後、この文書を読む。

再開Point:

> `references/game-experience-design-research.md` の続きとして、まだGuide Ruleへ確定せず、論文・GDC・開発者資料・Game実例を増やしながら議論を続ける。

次の調査候補:

- Camera / Spatial Orientation / Motion Sicknessをより深く
- Audio design / sound priority / masking / spatial cues
- Controller / Keyboard / Touch別Interaction Design
- Combat readability / enemy silhouette / hit readability
- Economy / scarcity / inflation / resource loop
- Exploration / curiosity / navigation / map design
- Procedural generation / randomness / fairness
- Social / multiplayer communication / ping / team UI
- Narrative UI / dialogue / quest presentation
- AccessibilityをCore Experienceへ自然に統合する方法
- OnboardingからExpertまでの長期Learnability
- UI / Game Screenの100+ title structured comparison

最終段階で:

1. Evidenceを再確認
2. 反証 / Genre例外を整理
3. 4〜8本程度の上位原則へ圧縮
4. Owner Docを決める
5. Checklist / Catalog / Project-sideへ分配
6. `docs/19-game-development.md` 等へ必要最小限だけ統合
7. Guide Validator / Documentation consistencyを確認

---

## 38. このResearchの最重要メタ原則

現時点で最も一貫している結論は次。

> **共通Game Guideに「正解のGame画面・HUD・難易度・Progression」を固定しない。**
>
> 代わりに、Player Goal / Cognitive Budget / Information / Interaction / Continuity / Challenge / Context / Validationから、そのGameのGenre・Camera・Task・State・Player・Inputに合う正解を毎回Researchし、Playtestで検証できるFrameworkを持つ。

そして、Evidence / ReferenceはRuleの代わりではなく、**判断の質を上げる材料**として扱う。
