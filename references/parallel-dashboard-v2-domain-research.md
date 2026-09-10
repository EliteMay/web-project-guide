# Parallel Work Dashboard V2 — Domain Research Evidence

Status: Non-normative research evidence
Target Type: Personal developer operations / parallel-work status dashboard

Current Project Requirements: `DASHBOARD_REQUIREMENTS.md`

## Target Type

- Primary Task: Repository ownerが「どこまで終わったか / 問題があるか / 次に何をするか / 最新情報か」を短時間で判断する
- Content Model: Project status + worker progress + health/blocker + next action + drill-down details
- Audience: Repository owner
- Usage Frequency: Parallel work中は繰り返し確認
- Density: Medium
- Device: Desktop + Mobile mixed
- Tone: Calm / technical / operational

## Representative References

### Linear — Project Status / Project Updates

Observed:

- Project lifecycle statusとissue completionを同一視しない
- Project updatesはhealth signalだけでなくprogress / challenge / next stepを説明する

Project transfer:

- Work ProgressとOperational/Handoff Statusを分離する
- Compact statusだけでなく必要なSummary / Next Actionを併記する
- `100% = 問題なし`と扱わない

### GitHub Actions — Workflow monitoring

Observed:

- Workflow全体とjob/stepの状態を分ける
- Job statusから必要なlog/detailへdrill downする

Project transfer:

- Run-level stateとWorker-level stateを分離する
- Raw technical detailは必要時に開く
- Integration WorkerをPreparation Workerと別Roleで扱う

### PatternFly — Progress

Observed:

- Percentageとstep countを扱える
- Success / Warning / FailureをProgressと組み合わせられる
- 100%でもWarning Stateを表現可能

Project transfer:

- `26 / 26`とhealth/statusを別情報として表示する
- Progressへ「担当作業」等のmeaning labelを付ける
- Accessibility上もvalueとstatus textを分ける

### Atlassian Design System — Lozenge

Observed:

- Compact status labelはobjectの理解・優先・actionへ影響するmeaningful attributeとして使う

Project transfer:

- Badgeは短いhuman statusに限定する
- Raw `blocked`等をそのまま出さない
- reason / next actionは別textで補う

### Vercel — Project / Deployment Dashboard

Observed:

- Projectを先に選び、そのProject内でdeployment statusやbranchを確認する
- Summaryからlogs / detailsへ進む

Project transfer:

- Repository identityをRun IDより上位へ置く
- RepositoryごとにDashboard stateを分離する
- Branch等はSecondary informationにする

## Current Dashboard KEEP / FIX / REMOVE

### KEEP

- Repository-specific dashboard entry
- Worker separation
- progress count / bar
- public-safe status architecture
- worker-specific write target

### FIX

- `blocked = 停止中`の1対1表示
- Run pauseが完了Workerまで赤く見せる問題
- 100%のmeaning label
- English raw currentTaskがPrimary textになっている問題
- Next Action不足
- silent fallback
- 完了WorkerにもStart PromptがPrimary表示される問題
- Branchの情報優先度
- Mobileでの縦長化

### REMOVE / DEMOTE

- Main viewの長いStart Prompt
- 完了WorkerのStart button
- Primary card内のRaw Branch
- Main Dashboard内の長いWorkflow説明

## Direction Comparison

### A. Operations Console — Selected

- Project identity header
- prominent Next Action
- compact overall summary
- scanしやすいWorker rows/panels
- issue Workerだけ説明を展開
- Integration Worker別Section
- technical detailはDisclosure

Fit:

- Primary taskが「見る / 判断する」
- 4〜8 Workerを比較しやすい
- Mobileへstackしやすい
- Current card gridより重複を減らせる

### B. Simplified Card Grid

Pros:

- Current UIからの変更量が少ない

Cons:

- Repeated metadataが残りやすい
- Mobileで縦長
- scan distanceが長い

### C. Dependency Flow / Pipeline

Pros:

- A/B/C/D → Iの依存関係は見せやすい

Cons:

- blocker reason / next action / mobileとの両立が弱い
- dynamic worker countで複雑化しやすい

## Decision

V2 Primary DirectionはOperations Console。

Visual stylingはBorder / spacing / typographyを中心にHierarchyを作り、semantic state以外のColor、large hero、gradient、glass、glow、decorative chartを主役にしない。

## Sources Consulted

- Linear Project Status
- Linear Initiative / Project Updates
- GitHub Actions workflow monitoring / visualization
- PatternFly Progress
- Atlassian Design System Lozenge
- Vercel Deployment Dashboard documentation

External referenceはDesign EvidenceでありProject Source of Truthではありません。
