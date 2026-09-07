# PROJECT LEARNINGS

このファイルは `web-project-guide` 自身の**運用・情報設計に関する再発防止知見**を長期的に蓄積する正本です。

Common Rule本文は`docs/`、一般化済みのFailure / Success / Anti-Patternは`catalog/`が正本です。ここへそれらを複製しません。Common Ruleへ昇格した後も、このRepositoryで何が起きたかというProject Evidenceは残します。

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

### PL-F-008 点数を監査の停止条件のように扱った

- Date: 2026-09-07
- Status: resolved
- Severity: high
- Symptom: 「70点台前半」と評価した時点で、まだ具体的な修正候補が残っているのに作業が終了したように見える報告をした。
- Root Cause: Scoreを弱点探索用ではなく、暗黙の満足ラインとして扱ってしまった。さらに最終文が「何が未完了か」を明示せず、Userから完了状態を判別しにくかった。
- Final Fix: Deep Auditの停止条件を`actionable findingが残っていない / external-blocked理由が明確 / final PR + main validation済み`へ変更。User-facing final statusは`作業状況：完了 / 未完了`を明示する運用へ変更。
- Detection method: Audit ReportのGap Register / Completion GateとUser-facing statusを照合。
- Regression Guard: `maintenance/review-policy.json`と`maintenance/DEEP_SYSTEM_AUDIT.md`でScore-only completionを禁止。
- Prevention: Scoreは診断値としてのみ使い、既知Findingが残る限り終了しない。
- Guide candidate: yes — `docs/14` / Deep System Auditへ反映。

### PL-F-009 Agent AutonomyをOwnerだけ直してTemplateに旧停止条件が残った

- Date: 2026-09-07
- Status: resolved
- Severity: high
- Symptom: `docs/01`ではBest Reasonable Decisionへ移行した一方、Requirements / AGENTS / Conversation Templatesには`Core / High-cost = User回答待ち`の旧Contractが残った。
- Root Cause: Behavior変更をOwner単体の編集として扱い、同じBehaviorを参照するAdapter / Templateの横断検索を完了条件にしなかった。
- Final Fix: `docs/01` / `docs/21` / `docs/23`とRequirements / AGENTS / Conversation Templatesを同じAutonomy Contractへ統一。
- Detection method: Template / Owner semantic sweep。
- Regression Guard: Focused Validatorで旧User-wait markerとdocs23 routeを確認。
- Prevention: Cross-cutting behavior変更はOwner → Router → Templates → Validatorの順で同じ代表Caseを通す。
- Guide candidate: yes — Routing / Template Contractへ反映。

### PL-F-010 Deep Audit詳細が再びRoot REQUIREMENTSへ逆流した

- Date: 2026-09-07
- Status: resolved
- Severity: high
- Symptom: Phase 0の6軸採点、Gap分類、Research Priority等の実行方法がRoot `REQUIREMENTS.md`へ大きく追加され、Current Contractが再びRule本文化し始めた。
- Root Cause: 「今回必要な監査要件」と「恒久的な監査手順」の保存先を分けなかった。
- Final Fix: Root Requirementsは「Deep Auditが再実行可能である」というProject Contractだけへ戻し、詳細手順は`docs/14` + `maintenance/DEEP_SYSTEM_AUDIT.md` + audit reportsへ分離。
- Detection method: Requirements responsibility review。
- Regression Guard: ValidatorでPhase 0 audit procedure markerのRoot Requirements再混入を検出。
- Prevention: Current Requirementsへ手順詳細を入れる前に、その内容がBehavioral Owner / Checklistの責務ではないか確認する。
- Guide candidate: yes — Current Contract / History separationへ反映。

### PL-F-011 Guideが自分のSupply-chain Ruleを自己適用できていなかった

- Date: 2026-09-07
- Status: resolved
- Severity: high
- Symptom: Guideはexternal reusable workflowのSHA固定を推奨していたが、自身の`validate-guide.yml`は`actions/checkout@v4` / `actions/setup-node@v4`のmoving tagを使用していた。
- Root Cause: Common Ruleの追加時に対象Product Repoだけを想定し、Guide自身へのSelf-application auditをしなかった。
- Final Fix: Workflowをfull-length Commit SHAへ固定し、`docs/16`へAction dependency全般のSupply-chain Contractを追加。
- Detection method: Repository surface audit。
- Regression Guard: Validatorでexternal `uses:`参照が40桁SHAであることを確認。
- Prevention: Common Ruleを追加・強化したらGuide自身が該当するかSelf-application checkを行う。
- Guide candidate: yes — Governance self-application / docs16へ反映。

### PL-F-012 独立責務を「長いだけ」と見て分離を保留した

- Date: 2026-09-07
- Status: resolved
- Severity: medium
- Symptom: `docs/10`がGitHub Project変更WorkflowとConversation Handoff / stale checkpoint recoveryを同時に所有していたが、以前は「長文だが専門Owner」として保留していた。
- Root Cause: File lengthを分割しない原則を強く意識しすぎ、**責務が独立しているか**の判定を弱めた。
- Final Fix: GitHub変更Workflowは`docs/10`、Conversation Handoff / Recoveryは`docs/23`へ分離し、Machine Router / Human Router / Templatesを接続。
- Detection method: Owner responsibility matrix / task routing test。
- Regression Guard: docs23 required + owner registration + conversation recovery golden case。
- Prevention: 「長いから分ける」は避けるが、「異なるTaskが別々にRoutingできる」は分割Evidenceとして扱う。
- Guide candidate: yes — Governance / Deep Auditへ反映。

### PL-F-013 長時間BranchでCurrent mainの新Owner番号と衝突した

- Date: 2026-09-07
- Status: resolved
- Severity: high
- Symptom: Exhaustive Audit branchでConversation Handoff用に`docs/22`を追加した後、並行作業のCurrent mainへTask-first Structure / Flow用の正式`docs/22`がv1.19.0としてMergeされた。古いBranchをそのままMergeするとCurrent mainの新Owner / Router / Validatorを覆い戻すRiskが生じた。
- Root Cause: 長時間作業Branchで、新しい番号付きOwnerを割り当てた時点のmainを固定的に見ており、Final integration前のCurrent Owner Registry再取得を独立Gateにしていなかった。
- Final Fix: 最新mainのREADME / START_HERE / Owner / Versionを再取得し、Current mainをAudit branchへ統合。Task-first Ownerを`docs/22`のまま保持し、未公開だったConversation Handoff Ownerを`docs/23`へ移番してHuman Router / Machine Router / Templates / Validatorを再同期した。
- Detection method: `main...audit branch`比較で`behind_by > 0`とowner path collisionを検出。
- Regression Guard: Final PR前に`behind_by = 0`を確認し、Focused Validatorで`STRUCTURE_FLOW = docs/22`と`CONVERSATION_HANDOFF = docs/23`の両方を確認する。
- Prevention: 新しい番号付きOwnerを追加するときとFinal PR Validation直前にCurrent Owner Registryを再確認する。並行mainで同じ番号が正式利用された場合は、未Merge側を移番しCurrent mainを上書きしない。
- Guide candidate: yes — Project Management / Deep Audit final-base確認へ反映候補。

### PL-F-014 完了報告だけではUserが現在地と次Actionを判断できなかった

- Date: 2026-09-07
- Status: resolved
- Severity: high
- Symptom: 作業区切りで`完了`や`次へ進める`だけを返すと、何が終わったか・User側に次の操作が必要かが判別しにくかった。
- Root Cause: Repository上のCompletionは管理していたが、User-facing Completion StatusをProject管理Ruleとして十分定義していなかった。
- Final Fix: `docs/10-project-management.md`へ、意味のある区切りでは今回終わったこと・残件・Userの次Action・必要ならAgentの次Actionを短く明示するRuleを統合した。
- Detection method: 最終報告とWork Report / Completion stateを照合する。
- Regression Guard: 完了状態を曖昧な一語だけで返さず、User側のActionが不要ならその旨を明示する。
- Prevention: 継続のためだけに`ok` / `進めて`を要求しない。未完了なら未完了、完了なら完了を最初に明示する。
- Guide candidate: yes — `docs/10`へ反映済み。

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

### PL-S-004 ResearchはSource CountよりDecision Coverageで止める

- Date: 2026-09-07
- Goal: Deep Researchを少数Source biasから守りつつ、100件等の数値自体を作業Goalにしない。
- Adopted Pattern: Broad DiscoveryはTopicに応じた幅で行い、終了条件を`Decision Coverage + Research Saturation`へ置く。Countは透明性の記録だけにする。
- Why it worked: Evidenceが少数の一次Sourceへ集約されるTopicと、多数の実例比較が必要なTopicの両方を同じ固定Quotaへ押し込めずに済む。
- Trade-off: Saturation判断は完全自動化できず、Evidence Map / Opposing Evidence / ApplicabilityのReviewが必要。
- Reuse when: Research量の数字が品質指標化し始めたとき。
- Avoid when: 法定件数等、外部Contract自体が固定Sample数を要求する場合。
- Guide candidate: yes — `docs/20`へ反映。

### PL-S-005 Audit ReportをCurrent Finding Registerとして保存する

- Date: 2026-09-07
- Goal: 長い監査が途中で切れても「何を見た / 何が残る / どう直した」をGitHubだけから復元する。
- Adopted Pattern: `maintenance/audits/`へbaseline / owner matrix / finding / severity / action / final statusを保存し、修正時にResolvedへ更新する。
- Why it worked: Conversation Summaryに依存せず、監査進捗と未解決FindingをCurrent Repositoryから追跡できる。
- Trade-off: ReportをCommon Rule本文にしないよう、次回AuditではCurrent Ownerを再読する必要がある。
- Reuse when: 多数Owner /複数PRにまたがるSystem audit。
- Avoid when: 単一Fileの小修正。
- Guide candidate: yes — `docs/14` / Audit archiveへ反映。
