# 10 GitHub中心のプロジェクト管理

この章は、**既存ProjectをGitHub中心で安全に変更するWorkflow**の正本です。

Conversation Handoff / stale conversation / duplicate active conversation / Current work ref recoveryは [23 Conversation Handoff / Recovery](23-conversation-handoff-recovery.md)、Testingは [07](07-testing-quality.md)、Runtime Diagnostics / Project Memoryは [15](15-development-observability.md) を正本とします。

## 基本方針

Web制作ではGitHub Repositoryを基本の保存・管理先とします。

既存Projectでは、特別な理由がない限り古いZIPや過去Conversationより**現在のGitHub Repository**をCurrent Stateの基準とします。

## 変更前に確認するもの

変更内容に応じて必要範囲だけ確認します。

- README / Requirements / Spec / Project Rules
- Work Report / CHANGELOG
- `PROJECT_LEARNINGS.md`
- `AGENTS.md`（存在する場合）
- package metadata
- Runtime / Data / Schema / Storage Key
- Tests / GitHub Actions / Deployment
- Remote Diagnostic Handoff採用時の最新Evidence

全Fileを毎回読む必要はありません。Routingは [21](21-rule-routing-preflight.md) を使います。

## 既存Projectの変更手順

```text
Current Repository確認
→ 必要なCurrent Contract / Evidence確認
→ 変更対象と影響範囲を特定
→ 変更経路を選択
→ 実装
→ 関連Contract確認
→ Temporary asset cleanup
→ Final-state validation
→ Documentation / Learning更新
→ 未確認事項を記録
```

## GitHubへの変更経路

### SHOULD: 小規模で変更箇所が明確

対象Fileを直接更新できます。

例:

- 文言
- 1〜数Fileの明確なBug fix
- README / JSON / CSSの局所変更
- existing testで十分確認できる変更

単発File書換えのためだけにGitHub Actions / patch scriptを新設しません。

### SHOULD: 複数File・高Risk・設計変更

Branch / Pull Requestを優先します。

例:

- Schema / Migration
- 共通Runtime
- 大規模UI
- 複数主要機能
- Guide / CI / Deployment

PRではDiffとCIを確認してからMergeします。

### CONDITIONAL: GitHub Actions

継続的なTest / Build / Deploy / Release / Schedule等に使います。単発Patch Engineとして増やしません。

一時Workflow / Scriptを使った場合は作業完了前にCleanupし、Cleanup後の最終状態を再検証します。

## Agent Autonomy / Impact Review

### MUST: 高Impact = 自動的なUser待ち、ではない

主要機能削除、大幅UI、Data互換、URL、外部Service、公開範囲、Platform等の変更では**Impact Review**を必須とします。

確認するもの:

- Current Requirements / User Intent
- Non-breakable Contract
- Existing Data / URL / Runtime compatibility
- Cost / Security / Privacy
- Alternatives
- Reversibility / Rollback
- Current Evidence / Research

その結果からBest Reasonable Decisionを選べる場合は進めます。

User Decisionを要求する条件は [01 Requirements](01-requirements.md#user-decisionが本当に必要な条件) を正本とします。High-costというLabelだけで作業を止めません。

## 関連機能への影響確認

必要に応じて:

- HTML / JS ID / class
- CSSの他Surface影響
- JSON / Schema / Storage
- Existing Save
- URL / Path / Pages subpath
- Listener / import / fetch
- Shared Component
- Service Worker / Cache
- Version / Build
- Actions / Deployment trigger
- Diagnostic Schema

を確認します。

## Final Stateを基準にする

途中CommitのCI / Pages成功を最終保証にしません。

Cleanup後のFinal Commit / Merge Commitに対するValidationを完成判定に使います。詳細は [07 Final-state Validation](07-testing-quality.md#final-state-validation) を正本とします。

## Active TODO

### MUST: 完了項目をActive TODOへ残し続けない

`TODO.md` / README task list等をCurrent Workの一覧として使う場合、実装・必要Validation・必要Mergeまで完了した項目はActive TODOから外します。

履歴は:

- Diff /経緯 → Commit / PR
- current work result → Work Report
- Release → CHANGELOG
- recurrence knowledge → `PROJECT_LEARNINGS.md`

へ残します。

Active TODO専用Fileが空または完了項目だけになり、恒久情報がなければ削除を検討します。Issue / ProjectのAudit Trailは無理に削除せずDone / Closedへ移します。

## Branch / Pull Request Lifecycle

### SHOULD: 完了済みHead Branchを無期限に残さない

Merge済みPRのHead Branchが将来のCurrent work ref、Release maintenance、long-lived branch等として必要でなければ削除を優先します。

- Merge前にBranchを削除しない。
- unique unmerged workがないことを確認する。
- auto-delete設定を使えるRepositoryでは、Workflowと合うなら有効化を検討する。
- Historical evidenceはPR / Commit historyへ残るため、完了Feature BranchをArchive代わりに大量保持しない。

Branch削除機能やRepository settingへ現在のToolからアクセスできない場合は、Work Report / Issue等へManual follow-upを残します。

## Parallel Work

別の作業区分でもScopeが重なる場合はBranch / PRを分離し、Merge前に相互Diffとlatest baseを確認します。

詳細なConversation conflict / stale checkpoint recoveryは [23](23-conversation-handoff-recovery.md) を正本とします。

## Implementation / Requirements Conversation Handoff

会話移行自体の詳細Ruleは [23](23-conversation-handoff-recovery.md) へ分離します。

Requirements Persistence / Draftは [01](01-requirements.md)、実装Handoff Promptは [Implementation Conversation Template](../templates/IMPLEMENTATION_CONVERSATION_TEMPLATE.md) を使います。

## AI Coding Agent

ChatGPT / Codex / Claude / Copilot等のCodeも通常変更と同じQuality Gateを通します。

- Current Repo / Runtime / Dataを先に確認する。
- Project Rules / compatibility / Architectureを守る。
- Runtime Evidenceがある場合は原因推測より先に確認する。
- Framework / Library / Storage / Rewriteを理由なく採用しない。
- high-impact changeはImpact Reviewを行う。
- unfamiliar technologyではSecurity / Deployment / Persistenceを追加Reviewする。
- Existing ProjectではSmallest Safe Changeを基本とする。

Visual foundation自体が失敗している場合は [18 Visual Foundation Reset](18-domain-first-visual-research.md#visual-foundation-reset) を使い、正常なDomain Logicを保持したままUI Shellを再設計できます。

## Specification / Oracle-driven AI Development

大規模実装・移植・生成ではObservable Acceptance Criteria / Oracleを用意できるか検討します。

Testing / Oracleは [07](07-testing-quality.md#specification--oracle-test) を正本とします。Visual等はReview Gateで補います。

## AGENTS.md

`AGENTS.md`はCoding Agentの入口 / Routerとして使えます。

役割:

- first-read Source of Truth
- Build / Test / Validation command
- Non-breakable contractへのLink
- Architecture / file ownership
- Storage / Security / Deployment high-risk area
- Remote Diagnostic Handoff入口
- Completion Check

README / Spec / Project Rules全文を複製しません。

Nested `AGENTS.md`はSubdirectoryだけ異なるTechnology / Command / Ruleがある場合に限定します。

Template: [AGENTS Template](../templates/AGENTS_TEMPLATE.md)

## 原則としてそのまま改善してよい範囲

Current Contract / compatibilityを壊さない場合、明確なBug fix、軽微UI、Code重複整理、Performance、Accessibility、Copy、Path、JSON、README不足等はBest Reasonable Decisionで進めます。

軽微に見えてもStorage / shared runtime / major navigationへ影響するならImpact Reviewへ上げます。

## Repository discoverability / 公開Site導線

### CONDITIONAL MUST: 現在利用できる代表Public URLがあるWeb Repository

Repository画面からSiteへすぐ到達できる状態を優先します。

1. Repository About `Website` / homepageにPrimary stable URL
2. README上部付近に分かりやすいLive Site link
3. 詳細Deployment情報はREADMEの適切な節

複数URLがある場合は通常利用者向けCanonical / Stable URLをPrimaryにします。localhost / temporary preview / secret-bearing URLを公開導線にしません。

### 例外

- 未公開
- Electron-only
- Library / Guide / Backendで直接Siteがない
- Private / Internalで広く見せるべきでない

現在のToolでWebsite欄を変更できない場合、README側を可能な範囲で整え、未設定をManual follow-upとして記録します。確認していないURLを推測で公開済み扱いにしません。

## Documentation ownership

### README

Current entry / usage / Source of Truthを中心にし、長いHistoryを積みません。

### Work Report

今回の変更、Validation、未確認、Known follow-upを記録します。

### Project Learnings

高Cost failure / reusable success /再発防止を`PROJECT_LEARNINGS.md`へ蓄積します。詳細は [15](15-development-observability.md) を確認します。

## GitHub Pages

Pages固有のPath / Cache / Secret /公開確認は [08 GitHub Pages](08-github-pages.md) を正本とします。

Project管理上は、HTML / CSS / JSだけで成立するSiteで特別な理由がなければ、不要なlocal-only dependencyを増やさず直接利用できる構成を優先します。
