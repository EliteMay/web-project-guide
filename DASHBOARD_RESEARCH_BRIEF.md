# Parallel Work Dashboard V2 — Domain Research Brief

Status: Requirements research
Target Type: Personal developer operations / parallel-work status dashboard

## Target Type

- Primary Task: Repository ownerが「どこまで終わったか / 問題があるか / 次に何をするか / 最新情報か」を短時間で判断する
- Content Model: Project status + worker progress + health/blocker + next action + drill-down details
- Audience: Repository owner。Git内部statusを毎回解釈したくない利用者
- Usage Frequency: 並列作業中は繰り返し確認。通常時は必要時のみ
- Density: Medium。First Viewは要点優先、Technical detailはProgressive Disclosure
- Device: Desktop + Mobile mixed
- Visual Material: Text / status / progress中心。画像や装飾は主役ではない
- Tone: Calm / technical / operational

## Representative References

### 1. Linear — Project Status / Project Updates

Observed:

- Project statusはProject lifecycleを示す独立したsignalとして扱われる
- Issue completionだけでProject statusを自動Completedにしない
- Project updatesはhealth indicatorに加えて、進捗・課題・next stepsを文章で伝える
- On track / At risk / Off trackのような短いhealth signalから詳細へdrill downできる

Transfer:

- Worker progressとOperational/Handoff statusを分離する
- Compact status labelだけで終わらせず、必要なWorkerにはhuman summary / next actionを併記する
- `100% = 全て問題なし`とは扱わない

Do not copy:

- Team collaboration / recurring update投稿等、この個人Dashboardに不要なWorkflow

### 2. GitHub Actions — Workflow monitoring

Observed:

- Workflow全体と個別job/stepの状態を分けて確認できる
- Jobごとにstatus indicatorがあり、詳細logへdrill downする
- Visualizationは依存関係の理解に使われ、Raw logsは必要時に開く

Transfer:

- Run-level stateとWorker-level stateを分ける
- Technical detailをPrimary Viewへ全部出さず、必要なWorkerから詳細へ進む
- Integration Worker IはPreparation Workerと別Roleとして表示する

Do not copy:

- CI log viewer中心の高密度Technical UI

### 3. PatternFly — Progress

Observed:

- Percentageだけでなくfinite step (`2 of 5 units`)を扱える
- Progress component自体にSuccess / Warning / Failure stateを持てる
- 100%とWarningが同時に存在できる
- Accessible Name / Value / helper textを重視する

Transfer:

- `26 / 26`を明示しても、それとhealth/statusを別表示する
- Progress barには「担当作業」等の意味Labelを付ける
- Warning/ErrorはProgress barの数字だけで表現しない

### 4. Atlassian Design System — Lozenge

Observed:

- Compact status labelは「そのobjectをどう理解・優先・行動するか」に影響するmeaningful attributeとして使われる

Transfer:

- Badgeは短く、一目で判断できるhuman statusだけを表示する
- `blocked`等の内部語をそのままBadgeへ出さない
- Badgeに説明責務を持たせすぎず、必要なreason / next actionは別Textで補う

### 5. Vercel — Project / Deployment Dashboard

Observed:

- Projectを先に選び、そのProject内でDeployment status / branch / environment等を確認する
- Summaryから必要に応じてbuild logs / resource detailへ進む

Transfer:

- Repository / Project identityをRun IDより上位へ置く
- Project Dashboardごとにstateを分離する
- Branch等のTechnical detailはSecondaryとする

## Observed Conventions

複数Referenceから今回に有効な共通点:

1. ProgressとHealth/Statusは別情報として扱う
2. Global/Project stateとItem/Worker stateを分ける
3. Compact status signal + short explanation + detail drill-down
4. Technical detailは常時全部表示しない
5. Primary Actionは現在状態に応じて変える
6. Progressはpercentageだけでなくcount/stepも併記できる
7. Error/Warning/Successは色だけでなくTextでも伝える

## Current Dashboard — KEEP / FIX / REMOVE

### KEEP

- Repositoryごとの専用Dashboard entry
- A/B/C/D/IのWorker separation
- progress count / bar
- public-safe status architecture
- technical detailへ到達できること
- worker-specific write targetsによる競合回避

### FIX

- `blocked = 停止中`の1対1表示
- Run-level pauseが完了Workerまで赤く見せる問題
- 100%の意味が曖昧なProgress label
- English raw `currentTask`がPrimary summaryになっている
- Next ActionがPage上部にない
- fallback snapshotがCurrent statusのように見える
- 完了WorkerにもStart PromptがPrimary blockで残る
- BranchがPrimary informationとして大きく出ている
- Project / Run / Worker / Handoffのinformation hierarchy
- MobileでPrimary informationへ到達するまでの縦長さ

### REMOVE / DEMOTE

- Main viewに常時表示する長いStart Prompt
- 完了WorkerのStart button
- Primary card内のRaw branch path
- Human判断に不要なtechnical phrase
- Main Dashboard下部の長いWorkflow説明（Help/Detailsへ移動候補）

## Candidate Directions

### A. Operations Console — Recommended

Structure:

- Project identity header
- prominent Next Action panel
- compact overall summary
- Workerをscanしやすいcompact rows / panels
- issueがあるWorkerだけ説明を少し展開
- Integration Workerは別Section
- Technical detailsはDisclosure

Why fit:

- 一番多いTaskが「見る・判断する」で、編集ではない
- 4〜8 Worker程度を短時間で比較しやすい
- Mobileでは同じRowをstackできる
- Current card gridより縦方向の重複を減らせる
- Decorative card dashboardへ寄りすぎず、業務的で読みやすい

### B. Simplified Card Grid

Structure:

- Current 2-column cardsを維持しつつPrimary infoを削減

Pros:

- Existing UIからの変更量が少ない
- Workerごとの独立感は強い

Cons:

- 同じLabel/Prompt/metadataが繰り返されやすい
- 4 Worker以上でscan distanceが長い
- Mobileで縦長になりやすい
- Current problemの一部を残しやすい

### C. Dependency Flow / Pipeline

Structure:

- A/B/C/D → IをGraph/Timelineで見せる

Pros:

- Integration dependencyは直感的

Cons:

- Blocker reason / next action / mobile表示との両立が難しい
- Worker数が変動するとGraphが複雑化
- 日常確認には情報密度が低い

## Decision

V2のPrimary Directionは **A. Operations Console** とする。

ただしCurrent UIの有効要素であるProgressとWorker identityは保持し、全面的に別Productへ作り替えない。

## Visual Direction

- Dense but not cramped
- Neutral dark/light shellは既存Guideと整合
- Colorはsemantic stateだけに重点使用
- Large hero / gradient / glow / glass / decorative chartを主役にしない
- Border / spacing / typographyでHierarchyを作る
- Status badgeは短く、人間向け
- Problem stateだけ必要な説明領域を展開
- Primary ActionはPage上部に1つを基本とする

## Mobile Direction

- Project identity → Next Action → issue/summary → Worker listの順序を維持
- Worker panelは1 column
- Start Prompt / Branch / technical detailはcollapsed
- 重要Actionは44px前後のtap targetを確保
- 画面下まで読まないと次Actionが分からない構成を避ける

## Research-to-Requirement Decisions

1. `Progress` と `Human Status` を分離する
2. `Run pause` と `Worker issue` を分離する
3. First Viewへ `Next Action` を追加する
4. `humanSummary` / `nextAction` / `actionOwner` 等のPublic-safe human copy contractを導入候補とする
5. Silent fallbackを禁止する
6. Primary UIは日本語Plain Language、Raw technical stateはDetailsへ置く
7. Worker layoutはfixed A/B/C/D gridでなくcollection-drivenにする
8. Visual implementationはOperations Console方向で行う

## Evidence Notes

Research references used for this brief:

- Linear Project Status
- Linear Initiative / Project Updates
- GitHub Actions workflow monitoring / visualization
- PatternFly Progress
- Atlassian Design System Lozenge
- Vercel Deployment Dashboard documentation

External references are design evidence, not Source of Truth for this Project. Final Project Contract remains the current Guide requirements after requirements persistence is completed.
