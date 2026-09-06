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

### PL-F-004 Checklist / Templateが第二のRule本文になった

- Date: 2026-09-06
- Status: resolved
- Severity: medium
- Symptom: `QUALITY_CHECKLIST.md`や`REQUIREMENTS_TEMPLATE.md`へVisual / Storage / Diagnostics / Game / Electron等の詳細説明が増え、Owner Docと同じ内容を複数回読む構造になった。
- Root Cause: 「忘れないためにChecklistへ追加」を繰り返し、実行確認・入力欄というTemplate責務を超えた。
- Final Fix: Quality ChecklistをCore + Conditional Routing +短いCheckへ縮小し、RequirementsはCore + Conditional Packへ分割。詳細RuleはOwnerへ戻した。
- Regression Guard: ValidatorでConditional Packの存在・Route、ChecklistのConditional Routing、Visual Owner linkを確認。
- Prevention: Rule追加時はOwnerへ本文、Templateには入力、ChecklistにはPass / Failできる実行確認だけ置く。
- Guide candidate: yes — Governance / Requirements Template Contractへ反映済み。

### PL-F-005 Human RouterとMachine RouterがDriftした

- Date: 2026-09-06
- Status: resolved
- Severity: high
- Symptom: `START_HERE.md`ではGuide自身の改善時に`docs/14`を読むRouteだった一方、Machine Routerの`MAINTENANCE`だけでは`docs/14`へ到達できなかった。
- Root Cause: Human RouterとMachine Routerを別々に確認し、同じ代表Taskを両方へ通すParity Testがなかった。
- Final Fix: `CONTINUOUS_IMPROVEMENT` / `CROSS_REPOSITORY_GITHUB`等のDomain RouteとGuide Deep Review Golden Caseを追加。
- Regression Guard: ValidatorでRegistered Ownerの到達性、未知Domain / Signal / Gate、Guide Deep Review Caseを確認。
- Prevention: 重要Route変更時はHuman / Machine Routerを同じTaskで比較する。
- Guide candidate: yes — `docs/14` / `docs/21`へ反映済み。

### PL-F-006 Rule移動後に旧Ownerの詳細Copyが残った

- Date: 2026-09-06
- Status: resolved
- Severity: high
- Symptom: 公開SiteのRepository discoverability Ruleを`docs/08`へ移した後も`docs/10`に詳細版が残り、Single Normative Ownerが再び崩れた。
- Root Cause: 「新OwnerへRuleが存在すること」は確認したが、「旧Ownerから詳細Copyが消えたこと」まで横断確認しなかった。
- Final Fix: Hosting方式を問わないdiscoverabilityは`docs/10`へ正本を戻し、`docs/08`はPages固有の公開確認とOwner Linkへ限定。
- Regression Guard: Validatorで`docs/08 → docs/10`のBoundaryを確認。
- Prevention: Rule移動時はDestination + Source cleanupを1つのCompletion Conditionとして扱う。
- Guide candidate: yes — Deep System Auditへ反映済み。

### PL-F-007 Project固有PilotがCommon Ownerへ残った

- Date: 2026-09-06
- Status: resolved
- Severity: medium
- Symptom: Cross-Repository GitHubのCommon OwnerへNamed Project、当時の`.github` File一覧、Pilot成功状況等の時点依存情報が混在していた。
- Root Cause: Common Ruleを導いたEvidenceと、恒久Behavioral Ruleの保存場所を分けなかった。
- Final Fix: 一般化したRuleだけ`docs/16`へ残し、具体Pilotは非Normative Referenceへ移動。
- Regression Guard: ValidatorでCommon Ownerへの代表Named Project再混入を検出。
- Prevention: Project-specific / time-specific EvidenceはReference / Catalog / Project Learningsへ置き、適用時はCurrent GitHubを再確認する。
- Guide candidate: yes — Governance / Continuous Improvement境界へ反映済み。

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

### PL-S-002 Core + Conditional Packで入力負荷を下げる

- Date: 2026-09-06
- Goal: Requirementsの情報量を維持しつつ、関係ないProjectに不要な欄を読ませない。
- Adopted Pattern: CommonなProject ContractだけをCore Templateへ置き、Visual / Learning / Game / Diagnosticsを条件付きPackへ分離。
- Why it worked: Domain-specificなDecision fieldを失わず、通常Projectが読むTemplateを短くできる。
- Trade-off: Pack RouterとLink integrityをValidatorで維持する必要がある。
- Reuse when: 1つのTemplateにProfile固有Sectionが増え続けたとき。
- Avoid when: Packが1〜2項目しかなく、分割のNavigation Costの方が高い場合。
- Guide candidate: yes — Current RequirementsのTemplate Contractへ反映済み。

### PL-S-003 File ReviewをSystem Parity Auditへ広げる

- Date: 2026-09-06
- Goal: 単体Fileでは正しく見えるが、組み合わせると壊れるGuide Driftを見つける。
- Adopted Pattern: 低Score仮説から始め、Owner topology / Human-Machine Routing / Template drift / Semantic duplication / Validator / Repository surfaceを横断照合する。
- Why it worked: 「移動済み」「Routerあり」「Validator成功」の個別事実だけでは見えなかったOwner重複と到達不能Routeを発見できた。
- Trade-off: 通常の小修正には重いため、Guide自身のDeep Reviewや大きなRule変更時だけ使う。
- Reuse when: Documentation SystemやAgent Rule Systemを大きく整理した後の再監査。
- Avoid when: Typoや単一Link修正だけの局所作業。
- Guide candidate: yes — `docs/14` + `maintenance/DEEP_SYSTEM_AUDIT.md`へ反映済み。
