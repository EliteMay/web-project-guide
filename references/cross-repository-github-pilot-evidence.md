# Cross-Repository GitHub Pilot Evidence

このFileは `docs/16-cross-repository-github-infrastructure.md` のCommon Ruleを作る際に使った**Project-specific / time-specific evidence snapshot**です。

- Status: non-normative reference
- Snapshot date: 2026-09-06
- Current stateの正本ではない
- 各Repositoryの現在状態は利用時にGitHubで再確認する

Named Projectや当時の導入状態をCommon MUSTとして扱わず、「どの実例からRuleを一般化したか」を失わないために保存します。

## Shared `.github` snapshot

当時の `EliteMay/.github` では次をAccount共通Defaultとして利用していました。

- `.github/ISSUE_TEMPLATE/bug.yml`
- `.github/ISSUE_TEMPLATE/feature.yml`
- `.github/ISSUE_TEMPLATE/config.yml`
- `PULL_REQUEST_TEMPLATE.md`
- `SECURITY.md`
- `SUPPORT.md`
- `CONTRIBUTING.md`
- `.github/workflows/reusable-web-baseline.yml`
- `.github/workflows/validate-defaults.yml`

この一覧はCurrent Contractではありません。最新File構成は `EliteMay/.github` を再確認します。

## Project-specific validator examples

Reusable Workflowへ吸収せずProject側へ残すべきContractの例として、当時次のようなProject固有Validationがありました。

- AP Study Notes — Curriculum / 過去問Validation
- English — Workbook / Firefox E2E
- LyricTube — Player / Library Schema Test
- osu-hub — Windows Installer / Auto Update / Release Artifact検証

一般化したLessonは「Common BaselineとProject Contractを分ける」であり、このFile名・Test名自体を全Projectへ要求しません。

## Reusable Workflow pilot

当時 `DesignShelf` と `ASMRTube` で `EliteMay/.github` のReusable Web Baselineを確定Commit SHAへ固定して利用し、次を確認していました。

- Common Baseline成功
- Project固有Validator成功
- Pull Request確認後にmainへMerge
- mainの最終Commitでも両方成功

このPilotから一般化したのは、**中央Workflowを確定参照でPilotし、Project固有CIを残したまま段階展開する**というPatternです。

Pilot成功を「全Repositoryへ一括適用してよい」というEvidenceにはしません。

## High-release-risk example

`osu-hub` は当時、mainからWindows Installer / Update Metadata / Stable Releaseへ接続するProject例として使われていました。

この例から、Release / Data-loss Riskが高いRepositoryほどRuleset / PR / Required Status Checkを強める考え方を一般化しました。

静的Siteへ同じ保護強度を機械的に要求しません。

## Dependabot example

`osu-hub` では当時npmとGitHub ActionsのWeekly Version Updateを導入し、Electron toolchainのminor / patchをまとめ、major updateを個別Reviewする運用例がありました。

この例から一般化したのは次です。

- Dependency Updateも通常のQuality Gateへ通す
- Release-sensitive toolchainはBuild / Installer / Metadata整合まで見る
- 個人ProjectではPR noiseを抑えるSchedule / Groupingを使える

具体ScheduleやGroup名はProject固有です。

## Reuse rule

このReferenceを使う場合:

1. 最新Repository状態を再確認する
2. Named Projectの実装をCommon Ruleとしてコピーしない
3. Transferするのは再利用可能な原理だけ
4. 現在Evidenceが反証している場合はこのSnapshotよりCurrent Evidenceを優先する

Common Ruleの正本は [`docs/16-cross-repository-github-infrastructure.md`](../docs/16-cross-repository-github-infrastructure.md) です。
