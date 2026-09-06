# External Repository Administration Follow-up

Audit date: 2026-09-07
Repository: `EliteMay/web-project-guide`

このFileはCommon Ruleではなく、今回のDeep Auditで確認した**現在の接続から直接変更できないRepository administration項目**の追跡記録です。

## Current findings

### Branch lifecycle

- `main`以外に多数の過去Feature / Refactor / Audit Branchが残っている。
- `delete_branch_on_merge`は現在`false`。
- Branch削除前にはopen PR / unique commit / ancestryを確認する必要がある。
- 現在利用できるGitHub connectorにはbranch ref delete actionがないため、このAuditから安全に一括削除できない。

### Repository metadata

Current repository metadataで次を確認した。

- description: unset
- homepage: unset
- topics: none
- license: unset
- rulesets: none

このGuideは直接利用するWeb Productではないためhomepage未設定自体はBugではない。Description / Topicsはdiscoverability改善候補。Licenseは権利方針を伴うため推測で設定しない。RulesetはRepository risk / current workflowとのTrade-offを確認して決める。

## Manual / future action

1. GitHub UIまたはbranch-delete可能なAPI接続から、merged / abandoned branchをEvidence確認後に削除する。
2. `Settings > General`で運用に合う場合は`Automatically delete head branches`を有効化する。
3. Repository description / topicsを設定できる接続またはGitHub UIで補う。
4. LicenseはRepository ownerが公開License方針を決めた場合だけ追加する。
5. Ruleset / branch protectionはsmall-change workflowを不必要に壊さない強度で検討する。

## Completion classification

`external-blocked` — Guide / repository files側で修正可能なRule・Validator・Workflowは今回修正する。上記GitHub administrationは現在のtool surfaceからwriteできないため、未修正を隠さず追跡する。
