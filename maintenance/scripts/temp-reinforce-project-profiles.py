from pathlib import Path


def read(path):
    return Path(path).read_text(encoding="utf-8")


def write(path, text):
    Path(path).write_text(text, encoding="utf-8")


def replace_once(path, old, new):
    text = read(path)
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected one anchor, found {count}: {old[:80]!r}")
    write(path, text.replace(old, new, 1))


profile_framework = '''## Profileの役割

Project Profileは、Project全体に継続的に存在する**性質 / workload / runtime / content characteristic**を短く記録し、RequirementsやPreflightで条件付きRuleを見落としにくくする補助Metadataです。

Profileは次の代わりではありません。

- Current Requirements
- Current Runtime / Architecture / Data
- [21 Rule Routing / Preflight](21-rule-routing-preflight.md) のWork Type / Domain / Risk Signal
- `maintenance/rule-router.json`のMachine Route
- 専門OwnerのNormative Rule

したがって、`Profiles: CLOUD`と書かれているだけで毎回Cloud / Storage / Securityの全Ruleを読む、とは扱いません。逆にProfile未記録でもCurrent変更がMigration / Auth / Game Core Loop等を扱うなら、実際のDomain / Riskから必要OwnerへRoutingします。

## Profileを選ぶ / 選ばないCriteria

### SHOULD: 複数の判断へ継続的に影響する性質をProfileにする

Profile候補は、Featureが1つ存在するかではなく、その性質がProjectのRequirements / Architecture / Data / UX / Testing / Deployment / Maintenanceの**複数判断へ反復して影響するか**で選びます。

例:

```text
Cloud DB / Auth / SyncがCurrent ProductのData Authorityへ影響
→ CLOUD候補

1つの外部APIを読むだけでCloud保存もAuthもない
→ CLOUDを付ける必要はない場合がある

学習者の理解 / AssessmentがPrimary Outcome
→ LEARNING候補

説明文が数行ある通常Tool
→ LEARNINGにしない

Mediaの保存 /編集 /再生 / codec / performanceが主要Contract
→ MEDIA候補

Logo画像が1枚あるだけ
→ MEDIAにしない
```

Profileを付ける主なSignal:

- その性質がPrimary Task / Product Outcomeへ影響する
- 同じ専門Constraintを今後も繰り返し確認する
- Completion / Testingの深さが変わる
- Data / Runtime / Distribution / Content lifecycle等のCurrent Contractが変わる

Profileを付けない主なSignal:

- 一時的なPrototype / Experimentだけ
- incidentalな1Feature / 1Assetだけ
- そのProfileを付けてもRequirements / Routing / Validation上の判断が何も変わらない
- 既存Profileの意味を広げないと当てはまらない

どの既存ProfileにもMaterialに当てはまらないProjectへ、分類のためだけに新Profileを発明しません。Profileなし / 最小限のProfile記録でも正常です。

## 複数Profileの併用

Profileは排他的Categoryではありません。異なる軸を表す場合は組み合わせられます。

```text
STATIC + DATA + LEARNING
= Static delivery + data-heavy + learning outcome

GAME + ELECTRON + MEDIA
= Gameplay + desktop runtime + media-heavy

PUBLIC-CONTENT + DATA
= public information + structured / searchable data
```

### Profile間に優先順位を作らない

`CLOUDがSTATICより強い`等のProfile precedenceは作りません。Conflictがある場合は、Current Requirements / actual Runtimeと各専門Normative Ownerで解決します。

例:

- `STATIC + CLOUD`でもFrontendがPages、Data/Authがexternal serviceなら両立できる
- `STATIC`記録があるのにtrusted server runtimeがCurrent Requirementになった場合、`STATIC`を守るためにRequirementを歪めずProfile driftを見直す
- `LEARNING + DATA`でData最適化が説明品質を壊す場合、Profile同士の優先度ではなくPrimary Outcome / Requirements /専門OwnerでTrade-offを判断する

### Union Checklistを毎回全部実行しない

複数Profileの全確認項目を毎作業で機械的に結合しません。ProfileはCandidateを増やす補助であり、今回必要なOwnerは [21 Rule Routing / Preflight](21-rule-routing-preflight.md) がCurrent Changeから決めます。

```text
GAME + CLOUD + DATA Project
+ README文言修正
→ Game Playtest / Sync conflict testを要求しない

STATIC + DATA Project
+ Schema migration
→ DATA_STORAGE / MIGRATIONへRouting
```

## Profile Lifecycle / Drift

ProfileはProject開始時だけ決めて永久固定しません。ただし小さな変更のたびに付け外しもしません。

### Review Trigger

次のような**Projectの性質そのものがMaterialに変わった時**に見直します。

- Local-onlyからCloud Auth / Syncへ移行
- Read-only Siteへ編集 / Autosave / Undoが主要機能として追加
- Static Siteへtrusted server runtimeが主要Requirementとして追加
- Knowledge pageからLearning Outcome / Assessment中心Productへ変化
- Visual demoからGame loop / progressionがProductの核へ変化
- Web onlyからElectron distributionが正式Runtimeへ追加
- Mediaが付属Assetから主要Data / editing workloadへ変化
- internal情報からpublic-content publishingが主要用途へ変化

Temporary experiment、未採用Prototype、短期Migration helperだけで恒久Profileを変更しません。

### Profile記録とCurrent Runtimeが食い違う場合

Profile metadataはCurrent Stateを上書きするAuthorityではありません。

```text
Profile metadata
≠ Current Requirements / Runtime
↓
どちらがCurrent Contractか確認
↓
未実装Requirement / Document drift / Runtime drift / approved changeを分類
↓
正しいCurrent StateへProfileを同期
```

Profileが古いという理由だけでRuntimeを戻さず、Runtimeが違うという理由だけでCurrent Requirementを無視しません。重大な食い違いは [01 Requirements](01-requirements.md#requirementsとcurrent-runtimeが食い違う場合) のCurrent Contract判断を使います。

## Profile追加 / 変更 / 削除のImpact

Profile変更はRouter設定の変更そのものではありません。必要に応じて次の**Project側Contract / execution surface**への影響だけ確認します。

- `REQUIREMENTS.md` / project metadataのProfile記録
- Conditional Requirement Packの適用要否
- Non-functional requirement
- Test / Validation matrix
- Deployment / Runtime説明
- README / AGENTSのProject固有入口

Profileを削除しただけで、そのProfileに関連して作られたCurrent Requirement / Data / Test / Migration / Security Ruleを自動削除しません。実際にそのConstraintが不要になったことをCurrent Projectから確認します。

Profile追加も、それだけでLibrary / Infrastructure / Featureを追加する指示にはなりません。例として`CLOUD`を付けてもSupabase、Auth、Sync、Remote Diagnosticsを一式導入するとは扱いません。

## Profile体系を増やす条件

新しいProfileは便利なLabelが欲しいという理由だけで追加しません。

候補となるのは、複数Projectで反復し、既存Profileの組み合わせでは表現しにくく、Requirements / Routing / ValidationのMaterialな差を生む性質が確認できた場合です。

まず既存Profileの組み合わせや専門OwnerのCONDITIONAL Ruleで表現できないか確認します。Profileを増やす場合も [00 Guide Governance](00-governance.md) のRule Budgetと [21](21-rule-routing-preflight.md) のRouting境界を維持します。

'''
if "## Profileの役割" not in read("docs/12-project-profiles.md"):
    replace_once("docs/12-project-profiles.md", "## STATIC\n", profile_framework + "## STATIC\n")

record_intro = '''## Profileの記録 / 更新

Profileは`REQUIREMENTS.md`またはProject metadata等、Current Projectの性質を確認しやすい既存Surfaceへ記録できます。Profile専用Fileを全Projectへ要求しません。

- Current ProjectにMaterialなProfileだけ記録する
- Profile順序に意味を持たせない
- Profile変更理由を長い履歴としてCurrent Requirementsへ積まない
- 変更履歴が必要ならGit / Work Report / CHANGELOG等の役割へ分ける
- Guide側Profile名が将来変わっても、ProjectのCurrent Contractを無条件に自動変換しない

Profileが未記録でもRouting不能にはしません。Current Runtime / RequirementsからAgentが必要Domainを解決します。

'''
if "## Profileの記録 / 更新" not in read("docs/12-project-profiles.md"):
    replace_once("docs/12-project-profiles.md", "## Project Profileの記録例\n", record_intro + "## Project Profileの記録例\n")

template_old = '''## 0. Guide / Project Profile

- Adopted Guide Version:
- Profiles: STATIC / DATA / LEARNING / GAME / MEDIA / AI-HANDOFF / CLOUD / ELECTRON / TOOL / PUBLIC-CONTENT
'''
template_new = '''## 0. Guide / Project Profile

- Adopted Guide Version:
- Profiles（Current ProjectへMaterialなものだけ。該当なし / 未記録でも可）: STATIC / DATA / LEARNING / GAME / MEDIA / AI-HANDOFF / CLOUD / ELECTRON / TOOL / PUBLIC-CONTENT

ProfileはRoutingの補助Metadataであり、Current Requirements / Runtimeや [Rule Routing / Preflight](../docs/21-rule-routing-preflight.md) の代わりではありません。選定・併用・変更Criteriaは [12 Project Profiles](../docs/12-project-profiles.md) を正本とします。
'''
replace_once("templates/REQUIREMENTS_TEMPLATE.md", template_old, template_new)

backlog_path = "maintenance/research/content-depth-reinforcement.md"
backlog = read(backlog_path)
active = backlog.find("## Active reinforcement candidates")
profile = backlog.find("### 8. Project Profile Decision Depth", active)
intentional = backlog.find("## Intentionally concise", profile)
if active == -1 or profile == -1 or intentional == -1:
    raise SystemExit("Project Profile backlog anchors missing")

profile_block = backlog[profile:intentional]
profile_block = profile_block.replace(
    "Priority: **Medium-Low**\n\n現状は各Profileの特徴と確認項目が中心で、他の成熟OwnerほどDecision Frameworkは厚くありません。ただしProfileはRoutingの補助情報なので、短いこと自体は問題ではありません。\n\n再監査候補:\n\n- Profileを選ぶ / 選ばないCriteria\n- 複数Profile併用時の責務衝突の扱い\n- ProfileからRuleをover-routeしない具体的境界\n- Projectの成長でProfileが変わるTrigger\n- Profile記録とCurrent Runtimeが食い違った場合の扱い\n- Profileを削除 / 変更したときにCurrent Requirements / Routingへ何が影響するか\n\n`docs/21`がMachine / Behavioral Routingの正本であるため、Profileを第二Routerへ成長させないことを優先します。\n\n",
    "Status: **reinforced after the 40-point audit / re-audit before reopening**\n\nMain reinforcement:\n\n- Profileの役割をProject characteristic / routing hintとして明示\n- Profileを選ぶ / 選ばないCriteria\n- 複数Profileの併用とProfile precedence禁止\n- Profile unionによるover-routing防止\n- Project成長時のReview Trigger / Profile Drift\n- Profile metadataとCurrent Requirements / RuntimeのConflict handling\n- Profile追加 /変更 /削除時のImpact boundary\n- Profile体系自体を増やすRule Budget\n\n`docs/21`と`maintenance/rule-router.json`をRoutingの正本として維持し、Profileを第二Routerへ成長させていません。新Profile / 新Domain / 新Risk Signal / 新Stable Gateは追加していません。\n\n"
)

active_intro = '''## Active reinforcement candidates

**None.** 2026-09-07の40-point Content Depth Auditで確認したActive candidateは、Current Guideへ既存OwnerのままPromotion済みです。

新しいGapを作る場合は、文字量や章数ではなく実ProjectのFailure / Requirement / Current Evidenceから再監査します。過去の候補を自動的に再オープンしません。

'''
backlog = backlog[:active] + profile_block + active_intro + backlog[intentional:]
backlog = backlog.replace("- Current reinforcement branch: `guide/reinforce-pages-browser-compat`", "- Current reinforcement branch: `guide/reinforce-project-profiles`")
backlog = backlog.replace("- GitHub Pages / Static Delivery: reinforced / no longer active backlog after this branch merges", "- GitHub Pages / Static Delivery: reinforced / no longer active backlog")
backlog = backlog.replace("- Browser / Web Platform Compatibility: reinforced / no longer active backlog after this branch merges", "- Browser / Web Platform Compatibility: reinforced / no longer active backlog")
backlog = backlog.replace("- Active depth backlog after this branch: Project Profile Decision Depth", "- Project Profile Decision Depth: reinforced / no longer active backlog after this branch merges\n- Active depth backlog after this branch: None")
write(backlog_path, backlog)
