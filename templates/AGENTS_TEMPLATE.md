# AGENTS.md

> このファイルはCoding Agent向けの**入口 / Router**です。Project仕様のSource of Truthを重複して持ちません。

## Read First

作業前に、今回の変更に関係する範囲で次を確認してください。

1. `README.md`
2. `仕様書.md` またはProjectの現行Spec
3. `PROJECT_RULES.md` / Project固有ルール
4. `PROJECT_LEARNINGS.md`
5. 採用している `web-project-guide` の `START_HERE.md` と関連章
6. 変更対象のCode / Data / Test

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

同じ責務のVersioned Patch / Duplicate Runtimeを増やさないでください。

## High-risk Areas

- Storage / Migration:
- External API / Provider:
- Authentication / Secret:
- Media / Large data:
- Electron / OS integration:
- Other:

高コスト判断はAI提案でも勝手に確定せず、Project Rules / ADR /影響確認に従ってください。

## Change Policy

- 小規模変更はSmallest Safe Changeを優先する。
- 大規模RewriteをDefaultにしない。
- 既存保存データ / URL /主要機能を壊す変更は事前に影響を整理する。
- 一時Script / Debug / Workflowを残さない。
- AI生成Codeも最終状態のTest / Validationを通す。

## Completion

- [ ] 要求された変更を実装
- [ ] 関連するRegression / Validationを実行
- [ ] 最終Commit / Merge Commitの状態を確認
- [ ] README / Spec / Work Report / Project Learningsを必要に応じて更新
- [ ] 未確認事項を明示

## Nested AGENTS.md

このProject内でSubdirectory固有のTechnology / Command / Ruleが本当に異なる場合だけNested `AGENTS.md`を置きます。

Rootと同じ内容を複製せず、そのScopeで異なる点だけ記録してください。
