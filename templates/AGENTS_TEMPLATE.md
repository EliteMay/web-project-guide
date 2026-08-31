# AGENTS.md

このファイルはCoding Agent向けの**運用入口**です。Project仕様の正本を重複コピーせず、必要なFileとCommandへRoutingします。

## Project

- Name:
- Purpose:
- Adopted web-project-guide Version:
- Profiles:

## Read First

1. `README.md`
2. `PROJECT_RULES.md` またはProject固有仕様
3. `PROJECT_LEARNINGS.md`
4. 今回のTaskに関係する仕様書 / Data Schema
5. 必要な `web-project-guide` 章

## Source of Truth

- Product / Feature spec:
- Project-specific non-breakable rules:
- Data / Schema:
- Version / Build:
- Storage / Migration:
- Design Direction / Design System:

同じRuleをこのFileへ再定義せず、正本Pathを示します。

## Commands

### Install / Setup

```bash
# command
```

### Validate

```bash
# command
```

### Test

```bash
# command
```

### Build / Deploy check

```bash
# command
```

## Architecture Entry Points

- App entry:
- Main UI / renderer:
- Storage:
- Data loader:
- Tests:
- GitHub Pages / deploy:

## Before Editing

- 変更対象の既存実装とProject Ruleを確認する。
- 保存Schema / Storage Key / Public URLへ影響する場合はMigration / Compatibilityを先に確認する。
- 既存Design System / CSS tokens / Componentsがある場合は先に再利用可否を確認する。

## Do Not Change Without Explicit Review

- 

## Generated / Vendor / Do-not-edit Paths

- 

## After Changes

1. 変更範囲に必要なTest / Validationを実行する。
2. 一度直した重大BugならRegression Guardを確認する。
3. README / Work Report / PROJECT_LEARNINGSの更新要否を確認する。
4. Cleanup後の最終CommitでCI / Pages / Regression結果を確認する。
5. 未確認事項は未確認として報告する。

## Security / Privacy

- Secret / Token / Passwordを公開Repoへ書かない。
- Diagnostic logやFixtureへ実ユーザーのSensitive Dataを入れない。
- Project固有のSecurity Rule:

## Nested Instructions

Subdirectoryで本当にCommand / Architecture / Safety Ruleが異なる場合のみ、近いDirectoryへ追加の`AGENTS.md`を置きます。Rootと同じ内容をCopyしません。
