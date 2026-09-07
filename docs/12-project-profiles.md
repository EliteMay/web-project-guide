# 12 Project Profiles

すべてのサイトへ同じチェックを強制しないため、制作開始時にProject Profileを選びます。複数選択可能です。

## Profileの役割

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

## STATIC

GitHub Pages中心の通常Webサイト。

主な確認:
- 相対パス
- Pages公開
- Responsive
- Accessibility
- 外部依存最小化

## DATA

大量JSON、学習サイト、検索・一覧などデータ量が多いサイト。

主な確認:
- Manifest / Index
- Schema / ID
- Lazy Load
- 件数hardcode禁止
- Import / Export / Validation

## LEARNING

学習・解説・資格対策・知識集など、**利用者に理解してもらうこと自体が主要価値**のサイト。

`DATA`はData構造、`LEARNING`は教材・説明品質を扱うため、必要なら両方を選びます。

主な確認:
- 利用者のStarting Knowledge
- Learning Objective / Observable Learning Outcome
- 前提知識 / Concept dependency → 本題の学習順
- Dashboard / 一覧とPrimary Learning Surfaceの役割分離
- 主要LessonのContent Depth / Learning Activity Contract
- 用語定義だけでLesson完成扱いしていないか
- Worked example / 具体例 / 比較 / 勘違い / Practiceの必要性
- Diagnostic / Placementが本当に必要か
- 読了 / CompletionとUnderstanding / Application / Masteryを同一視しない進捗設計
- 長期保持が目的ならRetrieval / Review / Spacingの必要性
- Assessment / FeedbackがLearning Objectiveと対応しているか
- Lesson後のNext Step / Review Path
- 教材Coverageと実際の学習導線Coverageを別に確認
- 時間で変わる教材のFreshness / Version applicability
- Beginner learning pathとQuick Reference用途の境界

要件の正本は [01 要件定義](01-requirements.md#learning--explanation-content)、Verificationは [07 Testing / Quality](07-testing-quality.md) を確認します。Learning-specific research evidenceは [Learning Product Decision Research](../references/learning-product-decision-research.md) に保存します。

## GAME

Browser Game / Canvas Game / WebGL Game / Electron Game / 2D・3D Game等で、**Gameplay Rule / Player Action / Success-Failure / Progression等がProductの主要価値**であるProject。

Animationや簡単なQuizがあるだけでは機械的に`GAME`へ分類しません。

主な確認:
- Core Experience / Supporting Systems / Non-goals
- Core Gameplay LoopとPlayable MVP
- Main Goal / Primary Completion Condition
- Progression / Difficulty / Failure Contract（該当時）
- Game StateとUI / Rendering / AnimationのSource of Truth分離
- Save / Reload / Existing Save（永続Saveがある場合）
- Runtime Performance / Scale（Game規模に応じて）
- Controls / Tutorial / Gameplay Readability
- Automated Test / Runtime Validation / Actual Playtestの区別
- Phase Gate / Core Before Variety / Scope Management

詳細Ruleの正本は [19 Game Development](19-game-development.md) です。Save技術詳細、一般Performance、Testing Strategy、UI / Visual等は各専門Ownerを維持します。

`GAME + STATIC`、`GAME + MEDIA`、`GAME + ELECTRON`、`GAME + TOOL`、`GAME + PUBLIC-CONTENT`等、既存Profileと併用できます。

`GAME-SMALL` / `GAME-LARGE`のようにProfileを細分化せず、Game Development章のCONDITIONAL Ruleで規模差を扱います。

## MEDIA

画像・音声・動画・Canvas・手書きを扱うサイト。

主な確認:
- IndexedDB
- Blob / Object URL cleanup
- Media codec
- 大容量データ
- Thumbnail / lazy loading
- 実ブラウザ確認

## AI-HANDOFF

ChatGPT等へJSON / ZIP /画像 / Remote Diagnostic Snapshotを渡して分析結果を戻すサイト。

主な確認:
- 固定Schema
- manifest
- 入出力Version
- Human correction
- AI結果を未検証の事実として扱わない
- Runtime DiagnosticsをAIへ渡す場合はCompact / Sanitizedな形式を優先
- 同じ症状を繰り返し渡すProjectではRemote Diagnostic Handoffを検討
- Binaryが不要な診断まで毎回ZIP化しない
- Provider未接続時のLocal Export Fallback

## CLOUD

Supabase等の外部DB・認証・同期を使うサイト。

主な確認:
- 秘密情報
- Guest / Cloud境界
- Offline / Failure State
- Sync競合
- サービス停止時の挙動
- 無料枠 / 維持費
- 無料必須の場合は現在のPricing / Active Project / Pause条件を導入時に再確認
- 公開SchemaのRLS / Grant
- Remote Diagnosticsを保存する場合のRetention / Size / Rate / Abuse対策

## ELECTRON

Windows等のDesktop機能を使うElectronアプリ。

主な確認:
- main / preload / renderer責務
- IPC
- userData
- ログ
- start.bat
- Setup.exe / Release
- 実Windows確認

## TOOL / EDITOR

ユーザーが編集・保存を繰り返すツール型サイト。

主な確認:
- 未保存状態
- Undo / Backup
- destructive action
- autosaveの可否
- 複数タブ競合
- 編集→保存→再読込のE2E

## PUBLIC-CONTENT

一般公開する情報・コンテンツサイト。

主な確認:
- Asset License / 出典
- `<html lang>` と文書言語
- 各主要Pageの意味が分かる`title`
- 検索流入が重要ならMeta description / canonical等の基本Metadata
- Accessibility
- Privacy
- 公開してはいけない個人データ
- GitHub Pagesで迷子になりやすい場合は`404.html`等の復帰導線
- Analytics / Form / Third-party Scriptを使う場合のPrivacy影響
- 必要ならSEO

### CONDITIONAL: 多言語 / Internationalization

複数言語を扱う場合だけ追加確認します。

- Page / SectionのLanguage指定
- 翻訳でText lengthが伸びても致命的に崩れない
- Date / Number / Currency等を文字列連結だけで固定しない
- RTL言語を対象にする場合は`dir`とLayout方向を確認
- Placeholder英語だけでResponsive Designを確定しない

すべての個人用Siteへ多言語対応を強制しません。

## Profileの記録 / 更新

Profileは`REQUIREMENTS.md`またはProject metadata等、Current Projectの性質を確認しやすい既存Surfaceへ記録できます。Profile専用Fileを全Projectへ要求しません。

- Current ProjectにMaterialなProfileだけ記録する
- Profile順序に意味を持たせない
- Profile変更理由を長い履歴としてCurrent Requirementsへ積まない
- 変更履歴が必要ならGit / Work Report / CHANGELOG等の役割へ分ける
- Guide側Profile名が将来変わっても、ProjectのCurrent Contractを無条件に自動変換しない

Profileが未記録でもRouting不能にはしません。Current Runtime / RequirementsからAgentが必要Domainを解決します。

## Project Profileの記録例

```text
Profiles: STATIC + DATA + LEARNING + TOOL
```

Gameの場合も同じ形式で、必要なProfileを併用します。

```text
Profiles: GAME + STATIC + DATA
```

またはプロジェクトメタデータへ保存します。

```json
{
  "guideVersion": "1.1.0",
  "profiles": ["STATIC", "DATA", "LEARNING", "TOOL"]
}
```

Guide VersionをJSONへ重複コピーする場合は、それは「そのプロジェクトが採用したVersionの記録」であり、Guide本体のVersion正本ではありません。
