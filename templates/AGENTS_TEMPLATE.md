# AGENTS.md

> このファイルはCoding Agent向けの**入口 / Router**です。Project仕様やCommon Rule本文のSource of Truthを重複して持ちません。

## Read First

1. 対象RepositoryのCurrent Stateを確認
2. 採用している `web-project-guide` の `START_HERE.md`
3. Meaningful / Systemicな作業では `docs/21-rule-routing-preflight.md` に従い、今回必要なOwner Docを解決・読込
4. Project側の `README.md`
5. `REQUIREMENTS.md` / `仕様書.md` / Current Spec
6. `PROJECT_RULES.md`（存在する場合）
7. `PROJECT_LEARNINGS.md`（存在する場合）
8. Remote Diagnostic Handoff（有効な場合）
9. 変更対象のCode / Data / Test

Guide全文を毎回読むのではなく、Rule Routingで必要と判断されたOwner Docだけを追加確認します。Memoryや過去ConversationをCurrent Guide読込の代用にしません。

## Project

- Purpose:
- Main entry point:
- Deployment: GitHub Pages / Electron / Other
- Adopted web-project-guide version:
- Project Profiles:

## Commands

```bash
# Install（必要な場合）

# Static validation

# Unit tests

# Browser / E2E

# Build（必要な場合）
```

実行できなかったCommandは成功扱いにせず、未確認として報告してください。

## Runtime Evidence / Remote Diagnostics

Remote Diagnostic Handoffを使わない場合は`disabled`とします。

- Remote handoff: disabled / enabled
- Provider: Supabase / Other / None
- Shared store / Project ref:
- Project key:
- Table / collection:
- Read first: latest errors 5-10 / recent normal 1-3 / other
- Retention summary:
- Fallback: local `diagnostics.json` / Diagnostic Export / Other

ここへAPI Secret、`service_role`、Access Token等を書きません。

Remote handoffが有効でProviderへ接続できる場合、同じ症状をUserへ再質問する前に最新Runtime Evidenceを確認します。Providerが利用できない場合は作業を止めず、Local ExportへFallbackします。

## Non-breakable Rules

詳細は正本へLinkし、このファイルへ全文複製しません。

- Project Rules:
- Storage / Schema:
- Public URL / Pages path:
- Required compatibility:
- Security / secrets:

## Architecture / File Ownership

| Area | Canonical file / directory | Notes |
|---|---|---|
| Runtime | | |
| Data | | |
| Storage | | |
| UI | | |
| Tests | | |

同じ責務のVersioned Patch / Duplicate Runtimeを増やしません。

## High-risk Areas

- Storage / Migration:
- External API / Provider:
- Authentication / Secret:
- Remote Diagnostics / Telemetry:
- Media / Large data:
- Electron / OS integration:
- Other:

高コスト判断はAI提案でも勝手に確定せず、Project Rules / ADR /影響確認に従います。

## Re-routing Trigger

作業中に次が判明したら、`docs/21-rule-routing-preflight.md`へ戻って必要Ownerを追加確認します。

- Scopeが局所からMeaningful / Systemicへ拡大
- Storage / Migration追加
- Auth / API / Cloud追加
- Meaningful Visual Changeへ発展
- Game Core Loop / Completion変更へ発展
- User Requirement変更

## Change Policy

- 小規模変更はSmallest Safe Changeを優先する。
- 大規模RewriteをDefaultにしない。
- Existing Save / URL /主要機能を壊す変更は事前に影響を整理する。
- 一時Script / Debug / Workflowを残さない。
- AI生成Codeも最終状態のTest / Validationを通す。
- Remote Diagnosticsを導入していても、Provider障害をCore機能の障害へしない。

## Completion

- [ ] 要求された変更を実装
- [ ] 関連するRegression / Validationを実行
- [ ] 最終Commit / Merge Commitの状態を確認
- [ ] README / Spec / Work Report / Project Learningsを必要に応じて更新
- [ ] Remote Diagnostics採用時、最新EvidenceとFallbackの整合を確認
- [ ] 未確認事項を明示

## Nested AGENTS.md

Subdirectory固有のTechnology / Command / Ruleが本当に異なる場合だけNested `AGENTS.md`を置きます。

Rootと同じ内容を複製せず、そのScopeで異なる点だけ記録してください。
