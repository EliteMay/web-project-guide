# PROJECT LEARNINGS

このファイルは `web-project-guide` 自身の**運用・情報設計に関する再発防止知見**だけを残します。

Common Rule本文は`docs/`、一般化済みのFailure / Success / Anti-Patternは`catalog/`が正本です。ここへそれらを複製しません。

## Failure

### PL-F-001 Current Requirementsが履歴帳化した

- Date: 2026-09-06
- Status: resolved
- Severity: high
- Symptom: `REQUIREMENTS.md`が約120KBまで増え、実装済み改善要件・Current Contract・次の改善案が同じFileへ混在した。
- Root Cause: 改善要求を実装後もRequirementsから退役させず、履歴保存先として使い続けた。
- Final Fix: `REQUIREMENTS.md`をCurrent Project Contractへ戻し、Version履歴はCHANGELOG、直近作業はWork Report、詳細はGit historyへ分離。
- Regression Guard: ValidatorでRequirementsがCurrent Contractであることと、Current Guide Version固定値を重複しないことを確認。
- Prevention: 実装済みRequirementはOwner Doc反映を確認した後、Current Requirementsへ履歴として残さない。
- Guide candidate: yes — Governance / Requirements自身へ反映済み。

### PL-F-002 Prose Snapshot Validatorが文章の改善を阻害した

- Date: 2026-09-06
- Status: resolved
- Severity: high
- Symptom: Validatorが多数の`includes()` /正規表現で特定フレーズを固定し、意味が同じ自然な書き換えでもCIが壊れやすかった。一方でKeywordさえ残れば構造上のdriftを見逃せた。
- Root Cause: Behavioral Contractではなく文章表現をRegression Oracleとして使いすぎた。
- Final Fix: Required file / Link / Owner / Router / Gate / Version / Catalog ID / Golden Routing Case等の構造Contract中心へValidatorを再設計。
- Regression Guard: Router Golden CasesとOwner参照整合。
- Prevention: 固定文言が本当にContractの場合だけProse assertionを使う。
- Guide candidate: yes — Testing / Requirements / Routing方針へ反映。

### PL-F-003 Router不足を巨大Rule Engine案で解決しようとした

- Date: 2026-09-06
- Status: resolved
- Severity: medium
- Symptom: 必要Owner Docの読み忘れ対策が、Session Receipt / Cache / Resolver / Risk体系等を含む大規模Platform設計へ膨らんだ。
- Root Cause: 実際のFailureを防ぐ最小Contractと、将来あると便利なInfrastructureを同時に要件化した。
- Final Fix: `docs/21-rule-routing-preflight.md` + `maintenance/rule-router.json`へ縮小し、Owner / Gate / Work Type / Domain / Signal / Golden Caseだけを初期Contractとした。
- Prevention: Rule InfrastructureもSmallest Useful Systemから始め、実運用Evidenceなしで機能を増やさない。
- Guide candidate: yes — Rule Budget / Routing Ownerへ反映。

## Success

### PL-S-001 Ruleを消さず責務を戻す整理

- Date: 2026-09-06
- Goal: Guideを軽くしつつ、これまで考えたRuleを失わない。
- Adopted Pattern: Owner DocへRule本文、Routerへ短い導線、Catalog / ReferenceへEvidence、CHANGELOG / Work Report / GitへHistoryを分離。
- Why it worked: 重複文章を減らしても正本を残せるため、情報量と読みやすさを両立できる。
- Trade-off: Link / Router整合をValidatorで守る必要がある。
- Reuse when: Common documentationが成長してCurrent ContractとHistoryが混ざったとき。
- Avoid when: 単一の短いDocumentを不要に細分化する場合。
- Guide candidate: yes — Governance / Requirementsへ反映済み。
