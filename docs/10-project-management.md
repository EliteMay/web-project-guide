# 10 GitHub中心のプロジェクト管理

この章は、**既存ProjectをGitHub中心で安全に変更するWorkflow**を定義する正本です。

Testing戦略は [07 Testing / Quality](07-testing-quality.md)、Runtime Diagnostics / Remote Handoffは [15 Development Observability / Project Memory](15-development-observability.md) を正本とします。

## 基本方針

Web制作ではGitHub Repositoryを基本の保存・管理先とします。

既存Projectでは、特別な理由がない限り古いZIPや過去の会話より**現在のGitHub Repositoryを最新状態の基準**とします。

## 変更前に確認するもの

変更内容に応じて必要範囲だけ確認します。

- README / Spec / Project Rules
- Work Report / CHANGELOG
- `PROJECT_LEARNINGS.md`
- `AGENTS.md`（存在する場合）
- package.json等のProject metadata
- Runtime / Data / Schema / Storage Key
- Tests / GitHub Actions / Deployment
- Remote Diagnostic Handoff採用時の最新Evidence

すべてを毎回読む必要はありません。

## 既存Projectの変更手順

```text
Current Repository確認
→ README / Spec / Project Rules / Learnings確認
→ 必要ならRuntime Diagnostics確認
→ 変更対象と影響範囲を特定
→ 変更経路を選択
→ 実装
→ 関連Contractを確認
→ 一時資産をCleanup
→ 最終CommitでValidation
→ 必要な文書 / Learningを更新
→ 未確認事項を記録
```

Remote Diagnosticsの具体的な読取順・件数・Fallbackは [15 Development Observability / Project Memory](15-development-observability.md) を正本とし、この章へ再掲しません。

## GitHubへの変更経路を選ぶ

変更内容に対して最も小さく安全な経路を選びます。

### SHOULD: 小規模で変更箇所が明確

GitHub上の対象Fileを直接更新して構いません。

例:

- 文言修正
- 1〜数Fileの明確なBug fix
- README / JSON / CSSの局所変更
- 既存Testで十分に回帰確認できる変更

**単発のFile書換えのためだけにGitHub Actionsや補助Scriptを新設しません。**

### SHOULD: 複数File・高Risk・設計変更

Branch / Pull Requestを優先します。

例:

- 保存形式 / Schema変更
- 共通Runtime変更
- 大規模UI変更
- 複数主要機能へ影響
- Guide / CI / Deployment等の運用変更

PRではDiffとCIを確認してからMergeします。

### CONDITIONAL: GitHub Actions

GitHub Actionsは**継続的な自動化そのもの**が目的の場合に使います。

例:

- Static Validation
- Test
- Build
- Deploy
- Release
- 定期処理

単発修正のPatch EngineとしてWorkflowを増やしません。

やむを得ず一時Workflow / Scriptを使った場合は、作業終了前にCleanupし、Cleanup後の最終状態を再検証します。

## Final Stateを基準にする

途中CommitのCI / Pages成功は最終状態の品質保証ではありません。

最終Commit / Merge Commitに対するValidationを完成判定に使います。

詳細なFinal-state Validationは [07 Testing / Quality](07-testing-quality.md#final-state-validation) を正本とします。

## 実装会話をGitHub中心で引き継ぐ

### SHOULD: 実装途中で会話を変える場合も、会話履歴ではなくGitHubを引き継ぎ元にする

ChatGPT Project等で`Repository名（実装）`の会話が長くなった、別日に再開する、または新しい実装会話へ整理したい場合、過去会話の長いSummaryをSource of Truthにしません。

原則として次の流れを使います。

```text
Repository名（実装）
→ 現在の変更状態を確認
→ GitHub上に復元可能なCheckpointを残す
→ 必要なWork Report / Project Learningsを更新
→ 保存成功を確認
→ Current work refを特定
→ Implementation Conversation Handoff Templateを置換
→ 新しいRepository名（実装）
→ 最新Guide + Current Repository + Requirements + Work refを確認
→ 続きから実装
```

Userが`新しい実装会話へ移りたい`等と明示した場合、重大な矛盾やGitHub書き込み失敗がなければ、追加の保存確認質問を増やさず、この引き継ぎ処理まで進めて構いません。

### MUST: 未完成の作業を完成済みに見せない

会話移行はProject完成とは別です。

- 完了済みの変更 → 通常のValidationを行い、変更経路上必要ならMergeまで終える
- 未完成の変更 → 無理にdefault branchへ入れず、Branch / Pull Request等へCheckpointを保存する
- Testが未実施 / 失敗中 → Work Report等へ明示する
- 未確認のUI / 実機 / OS依存項目 → 未確認のまま記録する
- 会話移行のためだけに品質基準を下げたり、壊れたmainを作らない

Checkpointは「次の会話が同じ状態を取得できること」が目的です。途中状態をRelease / 完成版として扱いません。

### Current work ref

新しい実装会話がどこから続きを始めるか特定できるよう、必要に応じて次のいずれかを残します。

- default branch上の最新Commit
- 作業Branch名
- Pull Request番号 / URL
- 特定Commit SHA

通常の軽微変更がすでにmainへ安全に反映済みなら`main`で十分です。未完成の複数File変更やReview前変更ではBranch / Pull Requestを優先します。

### MUST: Current work refが見つからない場合はGitHub Evidenceから復元する

引き継ぎPromptやWork Reportに記録されたBranch / Pull Request / Commitが削除・Close・Merge等でそのまま参照できない場合、**推測で`main`を現在位置として扱いません。**

次のEvidenceを必要範囲で確認し、同じCheckpointを特定できるか復元します。

1. 記録されているPull Request番号 / URLと、そのMerge / Close状態
2. Pull Requestのhead SHA / merge commit SHA / changed files
3. RepositoryのCommit履歴とMerge履歴
4. 同じ作業を示すBranch / Commit / Work Report
5. 現在のdefault branchに対象変更がすでに取り込まれているか

Branchが削除済みでも、対応するPRやCommit SHAがGitHub上で確認できる場合は、そのEvidenceから復元して構いません。Merge済みで対象変更が現在のdefault branchへ含まれていることを確認できた場合は、現在のdefault branchを新しいCurrent work refとして使えます。

復元時は、**「最も新しいから」「名前が似ているから」だけで候補を選びません。** Diff、Commit、PR、Work Report等で同じ作業状態だと確認できることを優先します。

### MUST: 復元できない場合は実装を止める

Current work refを一意に確認できない場合は、次を行います。

- `Current work ref: unresolved` として扱う
- 確認できた候補RefやEvidenceを短く示す
- 未確認状態をWork Report等へ必要に応じて残す
- 古い会話だけを根拠に続きのCode変更を始めない
- `main`から「たぶんこの続き」と実装を再開しない

この状態は引き継ぎ失敗として扱い、正しいCheckpointを確認できるまで実装を進めません。

### Documentation

会話引き継ぎのためだけに新しい`HANDOFF.md`等を毎回作りません。

必要な状態は既存Ownerへ残します。

- 現行仕様 → README / SPEC / `REQUIREMENTS.md`
- 今回の変更結果 / 未完了 / 未確認 / 次の作業 → Work Report
- 再利用価値の高い失敗・成功 → `PROJECT_LEARNINGS.md`
- 実装中の具体的なDiff / Checkpoint → Branch / Pull Request / Commit

Work Reportを更新する場合も、会話ログ全文ではなく、次の会話が作業を再開するために必要な状態だけを残します。

### Handoff Prompt

新しい実装会話へ移る場合は [Implementation Conversation Handoff Template](../templates/IMPLEMENTATION_CONVERSATION_TEMPLATE.md) を再利用します。

要件定義完了直後だけでなく、実装途中の会話移行にも同じTemplateを使います。実装途中では`Current work ref`へBranch / Pull Request / Commit等を埋めます。

GitHubへのCheckpoint保存が失敗した場合は、引き継ぎ保存完了として扱わず、古い会話だけを根拠に新しい会話で実装を続けません。

## AI Coding Agentを使う場合

ChatGPT / Codex / Claude / Copilot等が生成したCodeも通常変更と同じ品質基準を通します。

### SHOULD: AI出力を「提案 + 実装候補」として扱う

- Current Repo / Runtime / Dataを先に確認する
- Project Rules / 保存互換性 / Architectureを守る
- Runtime Evidenceがある場合は原因推測より先に確認する
- AI提案のFramework / Library / Storage / Rewriteを理由なく採用しない
- 高Cost判断はADR / 影響確認を省略しない
- 未経験TechnologyではArchitecture / Security / Deployment / Persistenceを追加Reviewする
- 既存Projectでは「全部Rewrite」よりSmallest Safe Changeを基本とする

ただしVisualの土台自体が失敗している場合は、[Domain-first Visual Research](18-domain-first-visual-research.md#visual-foundation-reset) のFoundation Resetを使い、**正常なDomain Logicを残したままUI Shellを再設計**できます。

## Specification / Oracle-driven AI Development

AIへ大規模な実装・移植・自動生成を任せる場合、実装前にObservable Acceptance CriteriaやOracleを用意できるか検討します。

Oracleの種類・Testing方法は [07 Testing / Quality](07-testing-quality.md#specification--oracle-test) を正本とします。

Visual等、機械的Oracleが作りにくい領域は明示的なReview Gateで補います。

## AGENTS.md

`AGENTS.md` はCoding AgentへProjectの入口を渡すRouterとして利用できます。

### SHOULD: Source of Truthを増やさない

`AGENTS.md`へREADME / Spec / Project Rulesの全文を複製しません。

役割:

- 最初に読むべき正本を案内
- Build / Test / Validation command
- 崩してはいけない仕様へのLink
- Architecture上の重要責務 / File ownership
- Storage / Security / Deploymentの高Risk箇所
- Remote Diagnostic Handoffの有無と安全な読取入口
- 作業後のCompletion Check

Project固有Ruleの正本はSpec / `PROJECT_RULES.md`等へ残します。

### Nested AGENTS.md

Subdirectoryだけ異なるRule / Test / Technologyを持つ場合のみ必要に応じて使います。

Directoryごとに大量作成せず、Root / Nestedへ同じ内容を複製しません。

Template: [AGENTS_TEMPLATE.md](../templates/AGENTS_TEMPLATE.md)

## 原則としてそのまま改善してよい範囲

既存仕様や保存互換性を壊さない場合、次は原則そのまま改善できます。

- 明確なBug fix
- 軽微なUI改善
- Code整理 / 重複Code削減
- 読み込み速度改善
- Accessibility改善
- 分かりにくい文言改善
- Path miss修正
- JSON整理
- READMEの不足情報追加

「軽微」に見えても保存形式・共通Runtime・主要導線へ影響する場合は影響確認を優先します。

## 確認が必要な変更

次は勝手に確定しません。

- 主要機能の削除
- 大幅なUI変更
- 保存形式 / Data互換性変更
- 既存URL変更
- 外部Service移行 / 有料Service導入
- 公開範囲変更
- GitHub Pages非対応化
- Web版 / Electron版の切替

必要に応じて、変更理由 / 影響 / メリット / デメリット / 代替案 / Rollback可否を整理します。

## 関連機能への影響確認

変更時は必要に応じて次を確認します。

- HTMLとJSのID / class
- CSS変更の他画面への影響
- JSON / Schema Version
- localStorage / IndexedDB Store / Key
- 既存保存Data
- URL / File path / GitHub Pages相対Path
- Event Listener / import / fetch
- 共通Component
- Service Worker / Cache
- Version / Build
- GitHub Actions / Deployment trigger
- Remote Diagnostic Schema（採用時）

## Repository discoverability / 公開サイトへの導線

### CONDITIONAL MUST: 公開して使えるWebサイトURLがあるRepositoryは、Repository画面からすぐ開けるようにする

GitHub Pages、独自Domain、Vercel等で**現在利用できる代表URL**があるWeb Projectでは、Repositoryを開いた人がREADMEを探し回らなくてもSiteへ移動できる状態を必須とします。

公開URLを新規作成・変更した作業では、同じ作業内でRepositoryのSite導線も更新します。

優先順位:

1. **GitHub RepositoryのAbout欄にある `Website` / homepageへ代表URLを設定する**
2. README上部のProject名・短い説明の近くにも `Open site` / `Live Site` 等の分かりやすいLinkを置く
3. 詳細な公開方法・代替URL・注意事項はREADMEのGitHub Pages / Deployment節へ置く

Repository Description本文へ長いURLを無理に詰め込むより、GitHubが用意しているWebsite欄を第一候補にします。

### 代表URLの選び方

複数URLがある場合は、通常利用者が使う**1つのCanonical / Stable URL**をWebsite欄へ置きます。

例:

- GitHub Pagesの本番URL
- 独自Domainがあるなら独自Domain
- PreviewではなくStable Deployment

開発用localhost、期限付きPreview、秘密URL、認証情報を含むURLはWebsite欄へ置きません。

### 例外

次では無理にSite Linkを設定しません。

- まだ公開していないProject
- Electron専用でWeb版が存在しない
- Repository自体がLibrary / Guide / Backend等で、直接利用するSiteがない
- 公開URLを広く見せるべきでないPrivate / Internal Project

Website欄を更新できない作業環境では、**少なくともREADME上部へLive Site Linkを置くことを必須**とし、Website欄は未設定事項として残します。Website欄を更新できる環境になった時点で代表URLを設定します。

## Documentation ownership

### README

READMEは**現在仕様**を中心にします。

最低限必要な内容は [README Template](../templates/README_TEMPLATE.md) を使えます。

長い変更履歴はCHANGELOG / Work Reportへ分離します。

### Work Report

今回の変更結果・未確認・既知Issue等は必要に応じてWork Reportへ残します。

Template: [Work Report](../templates/WORK_REPORT_TEMPLATE.md)

### Project Learnings

高Cost Bug / 再利用価値の高い成功は `PROJECT_LEARNINGS.md` へ残します。

詳細は [15 Development Observability / Project Memory](15-development-observability.md) を確認します。

## GitHub Pages

GitHub Pages固有の構成・Path・Secrets・公開確認は [08 GitHub Pages](08-github-pages.md) を正本とします。

この章では「HTML / CSS / JSだけで成立するSiteは、特別な理由がなければGitHub Pagesで直接利用できる構成を優先する」というProject管理上の方針だけを扱います。
