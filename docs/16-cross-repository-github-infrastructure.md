# 16 Cross-Repository GitHub Infrastructure

複数のGitHub Projectを運用するとき、同じ設定・Workflow・Issue様式を各Repositoryへ無制限に複製しないための共通ルールです。

この章の目的は、すべてを中央化することではありません。**Account共通の部分だけを中央化し、Project固有の仕様・Test・Releaseは各Repositoryへ残す**ことです。

## 役割分担

原則として次の責務へ分けます。

```text
web-project-guide
= 何を共通化するか / 品質基準 / 判断ルール

EliteMay/.github
= Account共通のIssue / PR / Community Health / Reusable Workflow

各Project Repository
= Project固有仕様 / Runtime / Test / Release / Storage / Project Rules

GitHub Projects
= Issue / PRの横断Viewと進行管理
```

GitHub Projectsへ仕様本文を移して新しいSource of Truthを作りません。

## `.github`共通Repository

SHOULD: 複数Repositoryで同じGitHub運用を繰り返す場合、Personal AccountまたはOrganizationのPublic `.github` Repositoryを共通入口として利用できます。

現在の`EliteMay/.github`では次をAccount共通Defaultとして管理します。

- `.github/ISSUE_TEMPLATE/bug.yml`
- `.github/ISSUE_TEMPLATE/feature.yml`
- `.github/ISSUE_TEMPLATE/config.yml`
- `PULL_REQUEST_TEMPLATE.md`
- `SECURITY.md`
- `SUPPORT.md`
- `CONTRIBUTING.md`
- `.github/workflows/reusable-web-baseline.yml`
- `.github/workflows/validate-defaults.yml`

各Repositoryに同名の有効なTemplate / Community Health Fileがある場合はProject固有側を優先します。

### MUST: `.github`をProject仕様の正本にしない

`.github`へ各Site固有の崩してはいけない仕様、Storage Schema、機能仕様等を集約しません。

共通RepositoryはGitHub運用のDefaultです。Project固有の正本は各RepositoryのREADME / Spec / PROJECT_RULES / Tests等へ残します。

## Reusable Workflow

SHOULD: 複数Projectで繰り返すGitHub Actions処理は、共通部分だけReusable Workflowへ切り出すことを検討します。

中央化しやすい例:

- Checkout
- Node Version統一
- JavaScript / MJS Syntax Check
- 基本的なJSON / Path検査
- 共通Secret / Public artifactチェック
- 共通の軽量Static Baseline

各Repositoryへ残す例:

- AP Study Notes固有のCurriculum / 過去問Validation
- English固有のWorkbook / Firefox E2E
- LyricTube固有のPlayer / Library Schema Test
- osu-hub固有のWindows Installer / Auto Update / Release Artifact検証

### MUST: Project固有Validatorを中央Workflowへ吸収しすぎない

中央Workflowが1つ壊れただけで無関係な全ProjectのCIが同時に壊れる構造を避けます。

Reusable Workflowは**Common Baseline**、各RepositoryのWorkflowは**Project Contract**として分けます。

### MUST: 外部Reusable Workflowの参照を固定する

別RepositoryのReusable Workflowを呼ぶ場合、安定性・Supply-chain安全性のため、原則としてCommit SHA固定を優先します。

```yaml
jobs:
  baseline:
    uses: EliteMay/.github/.github/workflows/reusable-web-baseline.yml@<commit-sha>
```

`@main`を恒久利用して中央変更を即時全Projectへ伝播させません。

運用上Tagを使う場合は、`v1`等の互換範囲とBreaking Change方針を明確にします。

### 現在のPilot

`DesignShelf`と`ASMRTube`で、`EliteMay/.github`のReusable Web Baselineを確定Commit SHAへ固定して利用し、次を確認済みです。

- Common Baseline成功
- Project固有Validator成功
- Pull Request確認後にmainへMerge
- mainの最終Commitでも両方成功

この結果は「全Projectへ一括展開してよい」という意味ではありません。各Repositoryの既存WorkflowとProject Contractを確認しながら段階的に導入します。

### Upgrade方針

中央Workflow更新時は次の順を推奨します。

```text
Reusable Workflow更新
→ Host側Validation
→ Pilot Project 1〜2件で新SHAへ更新
→ Project固有CI確認
→ 問題なしなら他Projectへ段階展開
```

全Repositoryを同時に新Versionへ切り替える必要はありません。

`.github` Repository自体も`validate-defaults.yml`で必須ファイル、Issue Form YAML、Reusable Workflowの`workflow_call`とread-only permission等を確認します。

## Rulesets / Branch Protection

CONDITIONAL: main破損時の影響が大きいRepositoryほど保護を強くします。

### Risk別の目安

#### 普通の静的個人Site

- main削除禁止
- Force Push禁止を検討
- 既存の小規模直接修正Workflowを不必要に壊さない

#### Data /重要な保存互換性を持つSite

- 上記
- 重要変更ではPR + Status Checkを優先
- Schema / Migration変更を直接mainへ入れない運用を検討

#### ELECTRON / Release自動公開Project

- main削除禁止
- Force Push禁止
- Releaseへ繋がる変更ではPR / Required Status Checkを強く推奨
- 未Merge CommitからStable Releaseを作らない
- Bypass対象を最小化

`osu-hub`のようにmainからSetup.exe / Update Metadata / Stable Releaseへ繋がるProjectは、静的Siteより高い保護レベルを使います。

### SHOULD: Protectionを全Repositoryへ同じ強さで適用しない

小規模な文言修正まで必ずPR必須にすると、現在のSmallest Safe Change方針と衝突します。

Project Profile / Release Risk / Data Loss Riskに合わせて設定します。

## Dependabot

CONDITIONAL: npm等のPackage DependencyまたはGitHub Actionsを継続利用するProjectではDependabot Version Updatesを検討します。

特に優先度が高い例:

- Electron
- electron-builder
- electron-updater
- Framework / Build Tool
- Security-sensitive dependency
- GitHub Actions

### SHOULD: 更新PRを自動Mergeしない

Dependency Updateも通常の変更と同じ品質Gateへ通します。

Electron系では特に次を確認します。

```text
Dependabot PR
→ Static / Unit Test
→ Windows Build
→ Installer / Update Metadata整合
→ 必要なら実Windows確認
→ Merge
```

`osu-hub`ではnpmとGitHub ActionsのWeekly Version Updateを導入済みです。Electron toolchainのminor / patchはまとめ、major updateは個別にReviewできる形を使います。

### SHOULD: PRノイズを抑える

個人Projectでは毎日大量の更新PRを作るより、Weekly等のまとまったScheduleを優先できます。

必要に応じてGroup / Cooldown / Open PR上限を使います。

## Issue Forms

SHOULD: Bug / Feature Issueを継続利用するProjectでは、自由記述だけでなくIssue Formsで必要Evidenceを揃えることを検討します。

`EliteMay/.github`の共通Bug Formは次を扱います。

- Version / Build
- 発生画面
- 実行した操作 / 再現手順
- Expected / Actual
- 再現性
- Error ID
- Diagnostic Snapshot ID
- Environment
- Screenshot / 補足

Remote Diagnostic Handoff採用Projectでは、実Log全文をIssueへ貼るのではなく、Sanitize済みSnapshot IDを関連付ける方式を優先します。

Secret / Token / Cookie / Password / 個人情報をIssue Formへ要求しません。

## GitHub Projects

MAY: 複数RepositoryでIssue / PRが同時に進む場合は、GitHub Projectsを横断Backlogとして利用できます。

推奨Field例:

- Status: Backlog / Todo / In Progress / Review / Waiting User Test / Done
- Project
- Priority
- Type: Bug / Improvement / Research / Maintenance
- Needs User Test
- Guide Candidate
- Target Date

### MUST: Project Boardだけに重要仕様を書かない

```text
Issue = 作業内容
PR = 実装差分
Project = 横断View / 優先順位
```

を基本とします。

## Agentic Workflows

MAY / CONDITIONAL: AI AgentによるIssue整理・Review等が明確に有効で、Cost / Security / Permissionsを理解できる場合のみ検討します。

無料運用が絶対条件の場合や、通常Actions + ChatGPTで十分な場合は無理に導入しません。

AIが自動で判断してIssue / PR / Codeを変更する範囲は、決め打ちCIより予測可能性が低いため、権限と自動書込範囲を狭くします。

## 共通化してはいけないもの

以下は中央化のためだけに移動しません。

- Project固有のStorage Schema
- Project固有のMigration
- Project固有のAcceptance Criteria
- Product固有のE2E
- Electron Release ContractのProject固有値
- API / Secret設定
- URL / Asset等のProject固有仕様

## 共通基盤の変更自体もVersioned Contractとして扱う

中央Workflow / Templateは便利ですが、変更時のBlast Radiusが大きくなります。

そのため次を守ります。

- Breaking Changeを黙って配布しない
- Pilotしてから横展開する
- CallerがどのVersion / SHAを使っているか追えるようにする
- 古いCallerを即時強制Migrationしない
- Rollback用に前のSHA / Versionを残す

## 導入順の推奨

複数Project運用では次の順が安全です。

1. `.github`共通RepositoryでIssue / PR Defaultを整える
2. Release Riskが高いRepositoryからRulesetを導入
3. Dependencyを持つRepositoryへDependabotを導入
4. 軽量なStatic Project 1〜2件でReusable WorkflowをPilot
5. 問題がなければ段階的に他Projectへ展開
6. 必要になったらGitHub Projectsで全RepoのIssue / PRを横断管理

## 確認Checklist

- [ ] 共通化対象とProject固有対象を分けた
- [ ] Reusable Workflowを`@main`へ恒久依存していない
- [ ] 中央Workflow更新をPilotしてから展開した
- [ ] `.github`共通Repository自体のValidationがある
- [ ] Ruleset強度がProject Riskに合う
- [ ] Dependabot PRを無条件Auto Mergeしない
- [ ] Issue FormへSecret /個人情報を要求しない
- [ ] GitHub Projectsを仕様のSource of Truthにしていない
- [ ] 中央基盤が壊れた時のFallback /旧SHAを把握している
