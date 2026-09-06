# 16 Cross-Repository GitHub Infrastructure

複数のGitHub Projectを運用するとき、同じ設定・Workflow・Issue様式を各Repositoryへ無制限に複製しないための共通ルールです。

この章の目的は、すべてを中央化することではありません。**Account共通の部分だけを中央化し、Project固有の仕様・Test・Releaseは各Repositoryへ残す**ことです。

過去にRule形成へ使ったNamed Project / Pilotの具体例は [Cross-Repository GitHub Pilot Evidence](../references/cross-repository-github-pilot-evidence.md) に非Normative Referenceとして分離します。この章ではCurrent Repository名や一時的な導入状態をCommon Ruleとして固定しません。

## 役割分担

原則として次の責務へ分けます。

```text
web-project-guide
= 何を共通化するか / 品質基準 / 判断ルール

Account / Organization共通 .github Repository
= 共通Issue / PR / Community Health / Reusable Workflow

各Project Repository
= Project固有仕様 / Runtime / Test / Release / Storage / Project Rules

GitHub Projects
= Issue / PRの横断Viewと進行管理
```

GitHub Projectsへ仕様本文を移して新しいSource of Truthを作りません。

## `.github`共通Repository

SHOULD: 複数Repositoryで同じGitHub運用を繰り返す場合、Personal AccountまたはOrganizationのPublic `.github` Repositoryを共通入口として利用できます。

共通化候補:

- Issue Form / Issue Template
- Pull Request Template
- SECURITY / SUPPORT / CONTRIBUTING等のCommunity Health File
- Reusable Workflow
- 共通Workflow自体のValidation

各Repositoryに同名の有効なTemplate / Community Health Fileがある場合はProject固有側を優先します。

### MUST: `.github`をProject仕様の正本にしない

`.github`へ各Site固有の崩してはいけない仕様、Storage Schema、機能仕様等を集約しません。

共通RepositoryはGitHub運用のDefaultです。Project固有の正本は各RepositoryのRequirements / Spec / Project Rules / Tests等へ残します。

## Reusable Workflow

SHOULD: 複数Projectで繰り返すGitHub Actions処理は、共通部分だけReusable Workflowへ切り出すことを検討します。

中央化しやすい例:

- Checkout
- Node Version統一
- JavaScript / MJS Syntax Check
- 基本的なJSON / Path検査
- 共通Secret / Public artifactチェック
- 共通の軽量Static Baseline

Project側へ残す例:

- Curriculum /教材Data等のDomain Validation
- Project固有E2E / Browser Matrix
- Player / Editor / Library等のProduct固有Schema Test
- Windows Installer / Auto Update / Release Artifact等のDistribution Contract

### MUST: Project固有Validatorを中央Workflowへ吸収しすぎない

中央Workflowが1つ壊れただけで無関係な全ProjectのCIが同時に壊れる構造を避けます。

Reusable Workflowは**Common Baseline**、各RepositoryのWorkflowは**Project Contract**として分けます。

### MUST: 外部Reusable Workflowの参照を固定する

別RepositoryのReusable Workflowを呼ぶ場合、安定性・Supply-chain安全性のため、原則としてCommit SHA固定を優先します。

```yaml
jobs:
  baseline:
    uses: <owner>/.github/.github/workflows/<workflow>.yml@<commit-sha>
```

`@main`を恒久利用して中央変更を即時全Projectへ伝播させません。

運用上Tagを使う場合は、`v1`等の互換範囲とBreaking Change方針を明確にします。

### Pilot / Rollout

Reusable Workflow等の中央基盤は、いきなり全Repositoryへ展開せず代表Projectで確認してから段階展開します。

```text
Reusable Workflow更新
→ Host側Validation
→ Pilot Project 1〜2件で新参照へ更新
→ Project固有CI確認
→ 問題なしなら他Projectへ段階展開
```

全Repositoryを同時に新Versionへ切り替える必要はありません。

Pilot成功は、そのContextで中央化Patternが成立したEvidenceです。全Projectへそのまま適用できる証明とは扱いません。

共通`.github` Repository自体にも、必須File、Issue Form YAML、Reusable Workflowの`workflow_call`、必要最小Permission等を確認するValidationを持つことを優先します。

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

mainからInstaller / Update Metadata / Stable Release等へ直接繋がるProjectは、通常の静的Siteより高い保護レベルを検討します。

### SHOULD: Protectionを全Repositoryへ同じ強さで適用しない

小規模な文言修正まで必ずPR必須にすると、Smallest Safe Change方針と衝突します。

Project Profile / Release Risk / Data Loss Riskに合わせて設定します。

## Dependabot

CONDITIONAL: npm等のPackage DependencyまたはGitHub Actionsを継続利用するProjectではDependabot Version Updatesを検討します。

特に優先度が高い例:

- Electron
- Packaging / Auto-update toolchain
- Framework / Build Tool
- Security-sensitive dependency
- GitHub Actions

### SHOULD: 更新PRを無条件Auto Mergeしない

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

具体PackageのGroupingやScheduleはProject固有に決めます。

### SHOULD: PRノイズを抑える

個人Projectでは毎日大量の更新PRを作るより、Weekly等のまとまったScheduleを優先できます。

必要に応じてGroup / Cooldown / Open PR上限を使います。

## Issue Forms

SHOULD: Bug / Feature Issueを継続利用するProjectでは、自由記述だけでなくIssue Formsで必要Evidenceを揃えることを検討します。

共通Bug Formの候補:

- Version / Build
- 発生画面
- 実行した操作 / 再現手順
- Expected / Actual
- 再現性
- Error ID
- Diagnostic Snapshot ID
- Environment
- Screenshot /補足

Remote Diagnostic Handoff採用Projectでは、実Log全文をIssueへ貼るのではなく、Sanitize済みSnapshot IDを関連付ける方式を優先します。

Secret / Token / Cookie / Password /個人情報をIssue Formへ要求しません。

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
4. 軽量な代表Project 1〜2件でReusable WorkflowをPilot
5. 問題がなければ段階的に他Projectへ展開
6. 必要になったらGitHub Projectsで全RepoのIssue / PRを横断管理

## Project-specific Evidenceの扱い

Named Repository、当時の導入File一覧、Pilot成功状況、Dependency設定等は時間とともに変化します。

Common Rule本文へCurrent Snapshotとして埋め込まず、保存価値がある場合はReference / Catalog / Project Learningsへ分離します。

この章のRuleを実Projectへ適用するときは、過去Evidenceではなく対象Repositoryと共通`.github` Repositoryの**現在状態**を再確認します。

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
- [ ] Named Projectの一時的状態をCommon Ruleとして固定していない
