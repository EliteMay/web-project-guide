# 19 Game Development

この章は、Web / Electron上でGameを制作するときの **Game-specificな設計・完成判定・Playtest・Phase管理のNormative Owner** です。

Gameを単なるFeatureの集合ではなく、**Playerが開始からMain Goal / Primary Completion Conditionまで継続して遊べる体験**として設計・実装・検証します。

一般的な責務は既存Ownerを維持します。

- Requirements Workflow / Decision Class → [01 要件定義](01-requirements.md)
- Save Schema / Migration / Storage / Backup / Restore → [03 Data / Storage](03-data-storage.md)
- UI / UX / Accessibility一般 → [04 UI / UX / Accessibility](04-ui-ux-accessibility.md)
- Page Load / Runtime responsiveness / Performance測定一般 → [05 Performance / Reliability](05-performance-reliability.md)
- Testing Strategy / Verification State → [07 Testing / Quality](07-testing-quality.md)
- Project Profile → [12 Project Profiles](12-project-profiles.md)
- Asset / Dependency / License → [13 Dependencies / Assets](13-dependencies-assets.md)
- User-facing UIの最低Visual品質 → [17 Visual Quality Baseline](17-visual-quality-baseline.md)
- 大規模Visual Direction変更前のResearch → [18 Domain-first Visual Research](18-domain-first-visual-research.md)

この章へ上記の一般Ruleを全文複製しません。

## 適用範囲

`GAME` Profileを持つBrowser Game / Canvas Game / WebGL Game / Electron Game / 2D / 3D Game等に適用します。

AnimationやQuizがあるだけでは自動的に`GAME`にしません。Gameplay Rule / Player Action / Success-Failure / Progression等がProductの主要価値である場合に使います。

### MUST: Small Gameへ大規模Ruleを機械的に適用しない

5分程度のMini GameへLong-running Save、LOD、Stress Test、Difficulty Mode、大規模Architecture等を理由なく要求しません。

Gameの規模・継続時間・World Scale・State量・Platformに応じて、MUST / SHOULD / CONDITIONAL / MAYを選びます。

## Rule Strength

### MUST

- Core Experienceと主要Gameplay Loopを説明できる。
- 起動・移動・Button反応だけでPlayable扱いしない。
- 現在Phaseの主要Gameplay FlowがEnd-to-Endで成立する。
- Prototype / Playable MVP / Main Game Completeを混同しない。
- 同じ重要Game RuleのSource of Truthを複数作らない。
- UI / Visual / AnimationとGame Stateの重大な矛盾を残さない。
- User-facing GameをStatic Testだけで完成判定しない。
- 現在PhaseのFlow完成を無視してFeature追加を続けない。

### SHOULD

- Vertical Slice Firstで短い完成Flowを先に作る。
- Core Before Varietyで代表Contentを安定させてからVariationを増やす。
- ProgressionでPlayerの判断・行動・効率・Masteryを意味のある形で変える。
- Game RuleとRendering / UIを分離する。
- Balance値をAdjustable ParameterとしてPlaytest可能に保つ。
- TutorialはContextualに教え、実際の操作へ接続する。

### CONDITIONAL

条件に該当する場合だけ適用します。

- 永続Saveがある → Save / Reload / Existing Save / Migrationを確認
- Long Progressionがある → Early / Mid / Late / FinalとMain Goal接続を確認
- Large 3D / 大量Entity → LOD / Culling / Physics Budget / Stress Testを検討
- Camera Action Game → Sensitivity / FOV / Motion sickness関連設定を検討
- Random / Procedural → Seed / Reachability / Required Content保証を確認
- Economyがある → Source / Sink / Duplication / Dominant Strategyを確認
- Failure / Deathがある → Loss / Retry / Recovery Contractを定義
- Audioが重要 → Gameplay Sound / Mix / Visual Fallbackを確認

### MAY

ECS、Event Bus、Object Pooling、Procedural Generation、Difficulty Modes、New Game+、Achievement、Modding、Replay、Developer Console、Cloud Save、Multiplayer等は必要なGameだけ採用します。

Genre固有Mechanicを共通MUSTにしません。

## Game完成の基本モデル

Game完成はFeature数やMap数ではなく、中心体験が実際に通るかで判断します。

1. **Prototype** — Core Ideaを検証できる。PlaceholderやSaveなしを許容できる。
2. **Playable MVP** — 少なくとも1本の中心Gameplay LoopがEnd-to-Endで成立する。継続型Gameでは必要に応じてSave / Reloadも含める。
3. **Main Game Complete** — Fresh Startから主要Progressionを通り、Main Goal / Primary Completion Conditionまで主要Game Experienceが成立し、必要なSave / UX / Visual / Performance / Regression確認が完了している。

`Main Clear`を共通用語へ固定しません。Campaign Completion、Final Boss、Target Score、Puzzle Completion、Scenario Completion等、Gameに合う **Primary Completion Condition** をRequirementsで定義します。

## Core Experience / Core Loop

Game Requirementsでは最低限次を明確にします。

- **Core Experience** — Playerに最も楽しませたい中心体験
- **Supporting Systems** — Core Experienceを強化するSystem
- **Non-goals** — このGameを何にしないか

Gameplay Loopは必要に応じて次の3段階で整理します。

1. **Moment-to-Moment Loop** — 秒〜数分の直接操作
2. **Core Gameplay Loop** — 数分〜数十分のGameを代表するLoop
3. **Progression Loop** — 数十分〜時間単位でUnlock / Upgrade /新Content /新Decisionへ接続するLoop

Progressionを持たない短時間Gameへ3段階すべてを強制しません。

主要ActionはResource、Knowledge、Unlock、Positioning、Risk reduction、Efficiency、Story / Objective progress等、Main Gameへ意味のある貢献を持つことを優先します。

意味の薄い反復だけが続くDead Loopを避けます。

## Playable MVP / Vertical Slice

### SHOULD: Vertical Slice First

短くても1本のFlowを完成させてからContent量を増やします。

```text
開始
↓
Player Action
↓
Game Rule
↓
Result / Reward
↓
Feedback
↓
次の変化 / 次のAction
```

Playable MVPではGameに応じて次を含めます。

- 基本Controls
- Core Gameplay
- 少なくとも1つのGoal
- Success Feedback
- Failureがある場合のFailure Flow
- 最低限のProgression
- 継続型GameではSave / Reload
- 初見Playerが主要操作を理解できる導線
- 最低限のUI / Gameplay Readability
- Major Known Bugがない状態

大量Map、全Enemy、全Final Asset、巨大Skill Tree等はPlayable MVPの必須条件にしません。

実装順は原則として次を優先します。

```text
System
→ Representative Content
→ Real Play
→ Fix
→ Stabilize
→ Content Expansion
```

## Progression Design

Progressionは必要に応じて **Unlock + Mastery + Efficiency** で考えます。

- **Unlock** — 新Content / System / Actionを開く
- **Mastery** — 既存Systemを深く使う
- **Efficiency** — 理解済みの反復作業・Frictionを軽減する

Major Progressionは単なる数値増加ではなく、Playerの判断や行動を変えることを優先します。

必要に応じて次を分離します。

- Major Progression — Chapter / Rank / Act等
- System Progression — Weapon / Factory / Skill / Research等
- Content Progression — Map / Boss / Quest / Biome等

すべてを1つのLevel値へ集約する必要はありません。

進行GateはCore Experienceを実際に経験することで進む設計を優先し、単一のMoney / XP等だけへ無条件に依存させません。

Pacingは原則として `Introduce → Try → Understand → Combine → Next` の順を使い、理解前にSystemを大量投入しません。

AutomationやFast Travel等は理解済みの反復を短縮できますが、Progressionの結果としてCore Experience自体をPlayerから取り上げないようにします。

Main ProgressionはEarly → Mid → Late → FinalをPrimary Completion Conditionへ収束させます。

## Game State / Save / Failure Contract

Game側では必要に応じてStateを次へ分類します。

1. **Persistent State** — Progression、Unlock、Inventory、Player-built objects、重要World Change等
2. **Session State** — 現在Mission、Expedition loot、位置、HP、Temporary buff等
3. **Derived State** — Machine count、Total generation、Completion %等、再計算可能なSummary

容易に再計算できるDerived Stateを第二のPersistent Source of Truthにしません。

Persistent IDはDisplay Name、Array Index、Visual Asset Pathへ依存させないことを優先します。

この章は **何を保存するか / Failure時に何を失うか / どこから再開するか** というGame Contractを担当します。Save Schema、Migration、Normalize、Validation、Backup / Restoreの技術詳細は [03 Data / Storage](03-data-storage.md) を正本とします。

継続型GameではSave / Reloadを主要FlowのTest対象に含めます。

重要な複数Resource消費やTransactionは、`prerequisite check → mutation → save` を一貫させ、途中状態やItem lossを残しにくい構造を優先します。

Failure / Deathがある場合は次を明確にします。

- 何を失うか
- 何を維持するか
- どこからRetryするか
- Retryまでの時間
- Failureが次のFailureを過度に誘発しないRecovery手段

## Game Content / World

Contentは量ではなくGameplay Roleを持つことを重視します。

Area / Enemy / Item / Objective等の重要Contentでは、必要に応じて次を説明できる状態を目指します。

- なぜ存在するか
- Playerが何をするか
- 何を教える / Testするか
- Rewardは何か
- Progressionとどう接続するか

AreaではGameplay Identity、Resource Identity、Risk Identity、Visual Identity、Progression Role等を必要範囲で持たせます。

EnemyはCount / HP / Skinだけでなく、Playerに異なるDecision / Executionを要求できるかで差別化します。

Boss / Major Encounterは、それまで学んだMechanicを組み合わせて試す方向を優先します。

Main Progression上の必須Itemを極端な低確率Randomだけへ依存させません。RandomはDecision variationを作る用途を優先します。

Procedural GenerationはDefaultにせず、採用時のみNavigation、Difficulty、Objective reachability、重要Item availability、Save、Reproducibility、Testingを確認します。

World Size自体を品質Goalにせず、Gameplay Densityを重視します。

## Difficulty / Balance

Difficultyを数字の増加だけで作りません。

主に次の軸からCore Experienceに合うものを使います。

1. **Decision Difficulty** — Routing、Resource allocation、Build layout、Target priority、Risk / Reward等
2. **Execution Difficulty** — Aim、Dodge、Timing、Movement、Positioning等
3. **Resource Pressure** — Ammo、HP、Energy、Time、Inventory、Money、Production capacity等

Requirementsでは「何を難しくするか」「何を難易度として使わないか」「Mode間の意味」を固定し、HP / Damage / Drop Rate /秒数等の具体値はAdjustable ParameterとしてPlaytestで調整できるようにします。

Difficulty ModeでGameを別の単純Grindへ変えません。

Failure後は学習内容が残っている間にRetryできることを優先し、意味のない長距離Walkback等を避けます。

**Grinding ≠ Difficulty** として、時間消費と意味のある難しさを分離評価します。

Balance Testでは必要に応じてNew Player / Intended Player / Experienced Player、Early / Mid / Late / Endgame等の観点を使います。

## Game Architecture / Simulation

Game ArchitectureはFile数を増やすことを目的にせず、**Gameplay Domain + Responsibility** で分離します。

Core State、Progression、Economy、Combat、Exploration、Production、Logistics、Save、Rendering、UI等、実際のGame規模に合う責務単位を使います。

### MUST: Game Ruleの正本とPresentationを分離する

- Game RuleのSource of Truthを1つへ寄せる
- UIをGame Stateの正本にしない
- Rendering / AnimationをSimulation Stateの正本にしない
- SimulationとRenderingを分離する
- Game結果をFrame Rateへ依存させない
- Rank / Damage / Cost / Route / Capacity等、純粋計算にできるRuleはTestしやすい形へ分離する
- Randomが必要な場所だけRandomにする
- Runtime Stateを複数箇所へ無目的に複製しない
- Cacheを持つ場合も正本を明確にする
- Event / State Mutationの境界をGame規模に応じて整理する
- Legacy Compatibility Layerは段階移行に利用できるが永続的なVersion積層を放置しない
- 重要SystemではState / Reason / Transition / Error等をDebugできる構造を優先する

ECS、Event Bus、Dependency Injection等をGameだからという理由だけで導入しません。

## Runtime Performance / Scale

Game Performanceは平均FPSだけで判断しません。

必要に応じて次を確認します。

- FPS / Frame Time
- Stutter / Frame Spike
- Input responsiveness
- Simulation Cost
- Rendering Cost
- Memory / Long-session degradation
- Entity Scale
- Physics
- Particle / VFX
- Light / Shadow
- Asset Loading

60 FPS等の数値はGame / Target DeviceごとのSoft Targetとして扱い、全Game共通のHard Limitにしません。

大量Entity Gameでは全Entityを毎Frame Full Updateする前提を避け、Near / Active、Mid、Far / Inactive等でUpdate frequencyやSimulation方法を分けられる構造を検討します。

**Simulation Entity数 = Render Object数ではありません。** Gameplay Stateを正確に保ちながら、遠距離Object、Offscreen Area、VFX、Animation等を簡略化できる構造を優先します。

3D / Large-scale Gameでは必要に応じてLOD、Culling、Instancing、Pooling、Physics Budget等を検討します。ただしGameplay上意味のあるEntityまで距離だけで消す等、Performance最適化でRuleを壊しません。

Page Loadや一般的なRuntime responsiveness、測定方法は [05 Performance / Reliability](05-performance-reliability.md) を正本とします。

## Game World / Visual / Audio Readability

Visualは見た目だけでなくGameplay Stateを正しく伝える必要があります。

### MUST: Visual RuleとRuntime Ruleを一致させる

次のような矛盾を完成状態へ残しません。

- 通れそうに見えるがColliderで通れない
- Hazard / Enemy / Objectiveが背景へ埋もれる
- Lootに見えるDecoration
- LODで重要Gameplay情報が消える
- 停止中Machineが稼働Animationを続ける等、Animation StateとGame Stateが矛盾する

Visual制作をFinal Polishだけへ先送りせず、Gameplay Phaseと並行するVisual Trackを持てます。ただしFinal PolishのためにMain Progression完成を無期限に後回しにしません。

Camera Shake、Head Bob、Motion Blur、FOV Kick等はGameplayを妨げない強度を優先し、必要に応じて調整 / OFF可能にします。

AudioはFeedback、Gameplay Information、Atmosphereに分けます。重要情報を音だけへ依存させません。

大量Entity GameではAudio Spamを避け、Distance、Grouping、Priority、Cooldown、Voice limit等を必要に応じて使います。

UI / UX / Accessibility一般は [04 UI / UX / Accessibility](04-ui-ux-accessibility.md)、Visual Minimumは [17 Visual Quality Baseline](17-visual-quality-baseline.md)、意味のあるVisual Direction変更前は [18 Domain-first Visual Research](18-domain-first-visual-research.md)、Asset License等は [13 Dependencies / Assets](13-dependencies-assets.md) を正本とします。

## Controls / Tutorial / Accessibility

Tutorialは開始時に長文をまとめて読ませるより、必要な操作が発生した時点で短く教え、実際に操作させる **Contextual Tutorial** を基本とします。

TutorialではKeyだけでなく、何をするか、なぜするか、成功すると何が起きるかを必要範囲で伝えます。

Tutorial終了後は最初のGoal / Progressionへ自然に接続します。

必要なGameではHelp / Controls / Codex等で後から再確認できるようにします。

HUDは情報を全部常時表示せず、常時必要な情報、状況依存情報、詳細画面へ分けます。

Error / Blocked Stateでは単に「できない」と表示するだけでなく、Resource不足、Storage Full、Power不足、Path Block等、Playerが改善できるReasonを伝えます。

InputはResponsivenessを優先し、複雑なDesktop GameではKey Remapを検討します。同じKeyをContextで使う場合もPlayerがActionを予測できることを重視します。

3D / Camera GameではSensitivity、FOV、Invert、Sprint Toggle、Head Bob、Screen Shake、Motion Blur等をGame規模に応じて調整可能にします。

AccessibilityとDifficultyを分離します。字幕、色覚対応、Camera Shake OFF等をEasy Mode扱いしません。

重要情報を色だけ・音だけへ依存させません。

## Testing / Playtest / Debugging

Game検証は次の3段階を区別します。

1. **Automated Test** — Rule / Calculation / Save Migration / Inventory / Progression等の機械検証
2. **Runtime / Browser Validation** — Input、Pointer Lock、WebGL / Canvas、Collider、Raycast、Scene Transition、Save / Reload、Audio、FPS等
3. **Actual Playtest** — 分かりやすさ、操作感、Pacing、Difficulty、Reward、退屈、次のGoal等をGameとして確認

### MUST: TestとPlaytestを別物として扱う

Bugがないことだけで面白さ・遊びやすさを保証しません。

各Phaseでは個別機能だけでなく、New Game / Current Save等から主要FlowをEnd-to-Endで確認します。

継続開発GameではNew SaveとExisting Saveを必要範囲で両方確認します。

Happy Pathだけでなく、Resource不足、Inventory Full、Death / Failure、Invalid interaction、Reward重複、Save Reloadによる再取得等、主要Edge Case / basic exploitを確認します。

長時間GameではLong Session Test、大量Entity GameではLate-game / Stress Testを条件付きで実施します。

Bug修正では `reproduce → evidence / state → root cause → smallest safe fix → regression guard → runtime confirmation → related flow` を基本Flowとします。

Testing StrategyとVerification State全体は [07 Testing / Quality](07-testing-quality.md) を正本とします。

## Phase Planning / Scope Management / Completion Gate

Game Phaseは単なるFeature Listではなく、**完成したGameplay Flow**で定義します。

Gameplay、UI、Save、Visual、Feedback、Test等を縦に含めるVertical Phaseを基本とし、Architecture / Visual Foundation等の横断Trackは必要時のみ並行させます。

### Phase Gate

各Phaseで最低限、該当する次を確認します。

- 主要FlowがEnd-to-Endで成立
- Save / Reloadが必要なGameでは成立
- Major Regressionなし
- Known major item-loss / save-corruption bugなし
- 必要なAutomated Test成功
- Runtimeで主要操作確認
- Actual PlaytestでPhaseのGame Experienceが成立
- User-facing変更ではVisual Readability確認
- 仕様と実装の重要部分が一致
- 未確認事項を正しく記録

新Ideaは原則として次へ分類します。

- **Now** — 現在Phase / Core Loop成立に必要
- **Next / Backlog** — 重要だが現在Phaseには不要
- **Maybe / Cut** — Core Experienceへの貢献が弱い

「せっかくだから」の連鎖でScopeを増やしません。

大きすぎるPhaseはPlay可能な単位へ分割します。

### SHOULD: Core Before Variety

Weapon / Enemy / Area / Item等は代表1種類のSystemを安定させてからVariationを増やします。

Main Game Complete後のEndgame、Extra Challenge、Achievement、Cosmetic、New Game+等はPost-game / Expansionとして分離できます。

**未完成の巨大Gameより、中心体験が最後まで成立した小さいGameを優先します。**

## Game Requirementsの最小Contract

`GAME` Profileでは、Game規模に応じて次から必要な項目をRequirementsへ整理します。

1. Game Overview
2. Core Experience / Supporting Systems / Non-goals
3. Core Loops
4. Playable MVP
5. Progression
6. Content / World
7. Player State / Failure
8. Major Game Systems
9. Difficulty / Balance Direction
10. Controls / UX
11. Save / Compatibility
12. Visual / Audio Direction
13. Performance / Scale
14. Development Phases
15. Non-goals / Do Not Break
16. Completion Criteria
17. Adjustable Parameters

Mini GameへLong-running Save Game用の巨大Requirementsを強制しません。

Requirements全体のWorkflow / Decision Classは [01 要件定義](01-requirements.md) を正本とします。

## Change Classification / Project Learnings

Game変更は次の5種類へ分類します。

1. **Balance Adjustment** — HP / Damage / Price / Drop Rate / Craft Time等の数値調整
2. **Game Design / Requirement Change** — Failure Contract、Progression構造、Main Goal等の意味変更
3. **Implementation Fix** — 仕様は正しいがRuntime実装だけが誤っている
4. **Project Learning** — 対象Game内で再発防止価値のある知見
5. **Common Guide Candidate** — 複数Gameで再利用価値がある、または重大Riskを防ぐ知見

Requirementsは履歴帳ではなく**現在正しいGame Contract**を持ちます。

Balance AdjustmentのたびにRequirements本文を履歴化しません。履歴が必要ならConfig / Data / CHANGELOG / Work Report / Git historyを使います。

Adjustable ParameterとGame Contractを区別します。

Player FeedbackはEvidenceとして扱い、そのまま仕様へ変換せず、HP / Telegraph / Hitbox / Camera / Recovery /説明不足等のRoot Causeを確認してから変更します。

`PROJECT_LEARNINGS.md`へ軽微なTypo等を何でも保存せず、再発しやすい、高Risk、原因特定Costが高い、後続Phase / 他Projectでも有効な知見を優先します。

Project LearningをすぐCommon Ruleへ昇格させず、[Guide Governance](00-governance.md) のRule Budgetに従います。ただしData loss、Save corruption、重大互換破壊等は1件でもCommon候補になり得ます。

## 代表Anti-pattern

詳細な再発例は [Anti-Pattern Catalog](../catalog/anti-patterns.md) を参照します。この章ではGame固有の判断として次を避けます。

- Core Loop不明のままFeatureだけ増やす
- System完成前にMap / Enemy / Item等を大量生産する
- 起動・移動だけでPlayableと呼ぶ
- ProgressionをNumber Inflationだけで作る
- GrindをDifficultyとして扱う
- AutomationがCore Experienceそのものを消す
- UI / Visual / AnimationをGame Stateの正本にする
- Visual RuleとRuntime Ruleの二重Source of Truthを作る
- Derived / Cacheまで無差別にSaveする
- Development都合だけでExisting SaveをResetさせる
- Static TestだけでGame Completeと判定する
- Average FPSだけでPerformanceを判定する
- Simulation EntityをすべてFull Render / Full Physicsする
- Prototype Visualを永久に残す
- Decorative VisualでGameplay Readabilityを壊す
- Main Progression必須要素を極端なRandomだけへ依存させる
- Main Goalを完成させずFeature追加を続ける

## Completion Gate

Game Developmentの変更を完成扱いする前に、Project規模に応じて最低限次を確認します。

- Core Loopを実際にPlayして成立確認した
- 現在PhaseのMain FlowがEnd-to-Endで通る
- Progressionがある場合、Main Goalへ接続する
- Save型GameではNew Save / Save / Reload / Existing Saveを必要範囲で確認した
- Failure / Edge Case / basic exploitを必要範囲で確認した
- Controls / Tutorial / Game UXをRuntimeで確認した
- VisualとCollider / Runtime Ruleが一致する
- Prototype Placeholderを完成扱いしていない
- 通常Gameplayと重い代表SceneのRuntime Performanceを確認した
- 必要なAutomated Testが成功した
- Runtime Validationを実施した
- Actual Playtestを実施した
- Phase Gateを満たした
- Main Game Complete時はFresh StartからPrimary Completion Conditionまで確認した
- 未確認事項をVerified扱いしていない

実行用の短い確認項目は [Quality Checklist](../templates/QUALITY_CHECKLIST.md) を使います。
