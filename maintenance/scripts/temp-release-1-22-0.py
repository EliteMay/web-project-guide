from pathlib import Path
import json


def read(path):
    return Path(path).read_text(encoding='utf-8')


def write(path, text):
    Path(path).write_text(text, encoding='utf-8')


def replace_once(path, old, new):
    text = read(path)
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{path}: expected one anchor, found {count}: {old[:80]!r}')
    write(path, text.replace(old, new, 1))


# Canonical Guide version.
version_path = Path('guide-version.json')
version = json.loads(version_path.read_text(encoding='utf-8'))
if version.get('guideVersion') != '1.21.0':
    raise SystemExit(f"unexpected current guideVersion: {version.get('guideVersion')}")
version['guideVersion'] = '1.22.0'
version['updated'] = '2026-09-07'
version['status'] = 'active'
version_path.write_text(json.dumps(version, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

# Release history covering all current-main changes after 1.21.0.
changelog_section = '''## 1.22.0 - 2026-09-07

### Added

- 40-point Content Depth Auditをpoint-in-time auditとして完了し、DefectとContent-depth reinforcementを分離したCurrent backlogを整備
- General Web Deployment / Runtime EnvironmentsのDecision Systemを既存`docs/10` / `07`へ追加し、Static / managed / serverless / backend、Local / Preview / Staging / Production、configuration authority、URL / origin、background runtime、hosting migrationを整理
- Learning / Explanation ProductのDecision / Verification depthを`docs/01` / `07` / `12` / `22`へ統合し、Learning Objective、Prerequisite、activity選定、Understanding / Mastery、Assessment alignment、Review / Retrieval、Freshnessを補強
- Browser / Web Platform Support Contractを`docs/01`へ、Compatibility Verificationを`docs/07`へ、Polyfill / transpilation等のCompatibility dependency判断を`docs/13`へ追加
- `references/web-deployment-runtime-research.md`、`learning-product-decision-research.md`、`github-pages-static-delivery-research.md`、`web-platform-compatibility-research.md`へCurrent non-normative evidenceを保存
- 人間向けGuide入口`index.html`を追加し、機能 / 作業内容からOwner Docへ到達できるWeb版をGitHub Pagesで公開

### Changed

- `docs/08-github-pages.md`をBranch vs Actions Publishing、Artifact / deployed revision traceability、SPA direct-open / 404、Custom Domain / DNS / HTTPS、Pages limitation、Service Worker / stale cache recoveryで補強
- `docs/12-project-profiles.md`をProfile選定 / 非選定、複数Profile併用、over-routing防止、Profile lifecycle / drift、追加 / 変更 / 削除ImpactのDecision Frameworkへ拡張
- `maintenance/rule-router.json` / `START_HERE.md` / `templates/QUALITY_CHECKLIST.md`をDeployment、Learning、Pages、Browser compatibilityのCurrent Ownerへ同期。Project Profileは第二Routerにせず、`docs/21`とMachine RouterをRoutingの正本として維持
- `templates/requirements/LEARNING.md`と`REQUIREMENTS_TEMPLATE.md`をCurrent Learning / Project Profile Contractへ同期
- `maintenance/research/content-depth-reinforcement.md`を更新し、40-point Auditで確認したActive reinforcement candidateをすべて`reinforced`または`current coverage sufficient`へ移行。Active backlogを`None`へ閉じた
- READMEへ人間向け公開Guide URLを追加し、正式Rule本文のSource of TruthがRepository `docs/`である境界を維持

### Validation / Integration

- Reinforcement PR #61 / #62 / #63とclosure PR #64をmainへ統合し、各PR Headの`Validate Guide`成功を確認
- substantive reinforcement completion merge `345211dbb86be6d5903eac1bda94f59d5c28d1c0`後、`Validate Guide #230`とPages build / deploy #154が成功
- backlog closure merge `7c2a1245b9a745069f22a9d96ce4afda21cce253`後、`Validate Guide #233`とPages build / deploy #156が成功
- 並行main変更として入った人間向け`index.html`とREADME公開URLを差分確認し、reinforcement branchから上書きしなかった
- Temporary patch workflow / scriptは各final diffから削除後にValidator / `git diff --check`を実行

### Rule Hygiene / Compatibility

- 新Normative Owner / 新Stable Gate / 新Project Profile / 新Risk Signalを追加しない
- Project Profileを第二Routerにせず、Work Type / Domain / Risk SignalによるCurrent routingを維持
- Small Static SiteへStaging / Canary / Blue-Green等を一律要求しない
- Learning SiteへQuiz / Spaced Repetition / Placement Test / universal mastery scoreを一律要求しない
- Universal browser-version matrixを固定せず、Target User / Runtime / Current EvidenceからSupport Contractを決める
- GitHub Pages / Browser / Providerの変化し得る数値・仕様はCurrent official evidenceを必要時に再確認し、Common Ruleへ固定値で複製しない

'''
changelog = read('CHANGELOG.md')
if '## 1.22.0 - 2026-09-07' in changelog:
    raise SystemExit('CHANGELOG already contains 1.22.0')
anchor = 'Guide Versionの正本は [`guide-version.json`](guide-version.json) です。\n\n'
replace_once('CHANGELOG.md', anchor, anchor + changelog_section)

# Current/recent work report, without duplicating the full changelog.
work_section = '''## 2026-09-07 Guide 1.22.0 — 40-point Content Depth Reinforcement Complete

### 作業状況

40-point Content Depth Audit後のreinforcementをCurrent OwnerへPromotionし、Active candidateをすべて閉じた。正式なRelease historyは`CHANGELOG.md`、詳細差分はPR #60〜#64 / Git historyを参照する。

主な完了領域:

- General Web Deployment / Runtime Environments
- Learning / Explanation Product Decision / Verification
- GitHub Pages / Static Delivery Decision Depth
- Browser / Web Platform Compatibility
- Project Profile selection / combination / lifecycle / drift
- Human-facing Guide website / documented public URL

### Source of Truth / Routing

- Normative Ruleは引き続き`docs/00-23`のCurrent Ownerを正本とする
- Project Profileを第二Routerにせず、`docs/21` + `maintenance/rule-router.json`をRoutingの正本として維持
- Content-depth backlogは`maintenance/research/content-depth-reinforcement.md`でActive=`None`
- Guide Versionの正本を`guide-version.json`の`1.22.0`へ更新

### Validation

- Reinforcement PR #61 / #62 / #63、closure PR #64: PR-head Validate Guide成功
- substantive completion merge `345211dbb86be6d5903eac1bda94f59d5c28d1c0`: Validate Guide #230 / Pages #154成功
- closure merge `7c2a1245b9a745069f22a9d96ce4afda21cce253`: Validate Guide #233 / Pages #156成功
- Temporary patch workflow / scriptはfinal diffへ残していない
- 並行追加された`index.html` / README公開URLを保持

### Remaining

- 40-point Content Depth Audit由来のActive reinforcement candidate: **None**
- 将来の新Gapは、文字量ではなく実ProjectのFailure / Requirement / Current Evidenceから再監査する
- Merge済み作業Branch / accidental empty branchの削除は、現在の接続ToolにBranch delete操作がないためRepository maintenance上のmanual follow-up

'''
report = read('作業報告書.md')
if '## 2026-09-07 Guide 1.22.0 — 40-point Content Depth Reinforcement Complete' in report:
    raise SystemExit('Work Report already contains 1.22.0 section')
report_anchor = '長期変更履歴は`CHANGELOG.md`、再発防止知識は`PROJECT_LEARNINGS.md`、詳細差分はGit history / PRを正本とします。\n\n'
replace_once('作業報告書.md', report_anchor, report_anchor + work_section)

# Make the reinforcement checkpoint explicitly distinguish audit baseline and release version.
backlog = read('maintenance/research/content-depth-reinforcement.md')
old = '- Guide version: `1.21.0`\n- 40-point audit merged-main baseline: `7c2eb0bef500b9de6cd773f0438b1ca591c07a89`\n'
new = '- Audit baseline Guide version: `1.21.0`\n- Reinforcement completion Guide release: `1.22.0`\n- 40-point audit merged-main baseline: `7c2eb0bef500b9de6cd773f0438b1ca591c07a89`\n'
if old not in backlog:
    raise SystemExit('Backlog Guide version checkpoint anchor missing')
write('maintenance/research/content-depth-reinforcement.md', backlog.replace(old, new, 1))
