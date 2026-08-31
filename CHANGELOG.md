# CHANGELOG

Guide Versionの正本は [`guide-version.json`](guide-version.json) です。

## 1.6.0 - 2026-08-31

### Research

現在のGuide全体とDesignShelfを確認した上で、以下を比較調査した。

- Anthropic Frontend Design Skill
- Microsoft Agent Academy Frontend Design
- Microsoft Frontend Design Review
- Front-End Checklist / Front-End Design Checklist
- AGENTS.md / OpenAI CodexのAgent instruction運用
- ChatGPT / AI-assisted制作Case Study
  - Birthday Quest
  - ScanPass
  - Higher or Lower Card Game
  - AI Portfolio Generator
- Apple / Microsoft / GitHub / NVIDIA / Discord / Spotifyの現行Site / 公式Design System / 公式Design記事
- MDN / web.dev / OWASP等の一次資料

### Added

- Subject-grounded Design
  - TrendやColorよりProjectの題材・利用者・Page Job・実Data / Product UIからVisual Directionを作る
  - Visual Qualityが重要な場合、Project固有の`Signature`を1つ持つ方法を追加
  - Copy / Label / NumberingもDesign Materialとして扱う
- Visual Design Review Gate
  - 実装前のDesign Ruleとは別に、実装後の実画面をPurpose / User Task / Hierarchy / Responsive / Design System / Accessibility / FrictionでReview
  - Blocking / Major / MinorでIssueを分類
- AI-assisted Development Review Gate
  - AIの最初のCode / DesignをFinal Artifactとして無条件採用しない
  - Diff / Architecture / Static / Unit / Browser / Visual Reviewを変更規模に合わせて実施
- AI Promptの`Fixed Constraints + Creative Axes`方針
  - Technology / Compatibility / Storage等は固定
  - Layout / Typography / Density / Emphasis / Effects等はProjectに合わせて探索
- Agent向け`AGENTS.md`運用方針と`templates/AGENTS_TEMPLATE.md`
  - README / SPEC / PROJECT_RULESを複製せず、正本Path・Command・Architecture入口へRouting
  - Nested AGENTSは本当にSubdirectory固有Ruleがある場合だけ使用
- CONDITIONALなInternationalization / RTL / Text expansion / Intl対応
- CONDITIONALなPrivacy / Data minimization / Tracking / Retention / Consent確認
- CONDITIONALなVisual Regression / Screenshot比較
- Manual Test EvidenceのExpected / Result記録方法

### Changed

- `docs/04-ui-ux-accessibility.md`
  - Subject / Contentを起点にDesignを作るRuleを追加
  - AI Template LookへPopular Font / Themeの無理由反復、意味のない番号・Badge等を追加
  - DesignShelfを単一Layout選択ではなくDesign Axesの組み合わせ探索へ発展させる方針を追加
  - Navigation / Structure / Density / Alignment / Typography / Visual Emphasis / Image / Component Density / Spacing / Color / Effects / Signatureを候補軸として定義
  - Responsiveへ多言語Text expansionを追加
- `docs/07-testing-quality.md`
  - Ruleへ可能な範囲で確認方法を持たせる方針
  - AI-generated Code Review / Visual Regression / Visual Reviewed verification stateを追加
- `docs/10-project-management.md`
  - AGENTS.mdをAgent operational routerとして追加
  - 長大Promptへ全仕様を重複させずSource of TruthへRoutingする方針を追加
- `docs/06-security.md` / `docs/12-project-profiles.md`
  - Privacy / I18Nを全Project必須ではなく条件付きで補強
- `templates/REQUIREMENTS_TEMPLATE.md` / `templates/QUALITY_CHECKLIST.md`
  - Subject / Signature / Fixed vs Creative / Visual Review / AI Review / AGENTS / I18N / Privacy / Visual Regressionを条件付きで追加
- `START_HERE.md` / README / References / Continuous Improvement / Review Policyを現在のAI-assisted Workflowへ更新
- Guide Validatorへ`AGENTS_TEMPLATE.md`の存在・最低構造検査を追加

### Catalog

- `AP-029 AI First Output as Final Artifact`
- `AP-030 Over-specified Generic Design Prompt`
- `S-026 AI Draft → Independent Review → Test → Adapt`
- `S-027 Fixed Constraints + Creative Axes`
- 外部Case Study固有のBugはFailure Catalogへ追加せず、再現性のある抽象PatternだけをCatalog化

### DesignShelf

GuideとDesignShelfの役割を次の方向へ整理した。

```text
web-project-guide
→ Purpose / User / Workflow / Constraints / Quality Gate

DesignShelf
→ Design Axesを使って2〜3 Directionを探索

AI
→ Project固有Contentへ具体化

Implementation
→ Test + Visual Design Review Gate
```

DesignShelfは`Layout 02を使う`形式へ固定せず、将来的に`design-direction.json`等でNavigation / Structure / Density / Typography / Visual Emphasis / Component policy / Effect policy / Signatureを渡す方式を優先候補とする。

### Not Adopted as Global Rules

- 特定企業SiteのLayout / Color / EffectのCopy
- Anthropic / Microsoft Skillにある特定FontやAestheticの一律禁止
- Front-End Checklistの巨大項目群をそのまま複製
- Case Study 1件だけを根拠にしたFailure Rule
- 全Projectへのi18n / Consent / Visual Regression強制

## 1.5.0 - 2026-08-31

### Added

- `docs/04-ui-ux-accessibility.md`へVisual Design Qualityを追加
  - Information Architecture / Layout / Typography / SpacingをColor / Effectより優先
  - 色違いだけの同一構造をDesign差分として扱わない
  - Visual重視ProjectではCSS実装前にDesign Directionを決める
  - Wireframe / Structure → Visual Polishの順序を明文化
  - Project TypeごとにVisual Structureを変え、固定Layoutを公式感のDefaultにしない
- AI Template Look回避ルールを追加
  - 巨大Hero + 3 Feature Cards + CTAの機械的採用を避ける
  - Gradient / Glassmorphism / Glow / Shadow / Rounded Corner / Card自体は全面禁止しない
  - Effectごとに役割を説明できることを目安にする
- Anti-Pattern Catalogへ以下を追加
  - `AP-026 Palette-Swap Clone`
  - `AP-027 Decorative Cardification`
  - `AP-028 AI Landing Page Default`
- Success Pattern Catalogへ以下を追加
  - `S-024 Structure-first Visual Design`
  - `S-025 Contrastive Design Direction`
- DesignShelfを完成Template集ではなく、構造探索用Companion Toolとして使うWorkflowを追加
- Visual重視Project向けのDesign Direction比較項目をRequirements / Quality Checklistへ追加

### Changed

- `START_HERE.md`へ「Visual Designを決める / AI Template感を減らす」ルートを追加
- `docs/01-requirements.md`へVisual Design Directionを追加
- `templates/REQUIREMENTS_TEMPLATE.md`へDesign Concept / Layout / Navigation / Density / Typography / Effect Policy等を追加
- `templates/QUALITY_CHECKLIST.md`へVisual Design / Visual Direction検証を追加
- `references/web-standards.md`へGitHub Primer / Microsoft Fluent 2 / Apple HIGを追加
- `maintenance/review-policy.json`へ公式Design System SourceとVisual Pattern Reviewを追加
- `docs/14-continuous-improvement.md`でVisual Designの長期的なTemplate収束もReview対象に追加

### DesignShelf

- 現在のDesignShelfはPalette → Layoutの順だが、Guide運用ではStructure-firstで利用可能と明記
- 24 Layoutを正解一覧や完成Templateとして扱わず、比較・混合・変形する方針を追加
- 将来改善候補としてLayout-first mode / Design Direction / 複数Layout比較 / AI Template Risk表示を整理

### Source

- ユーザー要望: AI生成サイトが色違いでも巨大Hero / Gradient / Glass / Card Grid等の同型Templateへ収束する問題
- GitHub Primer: Layout / Typography / Navigation / Foundations
- Microsoft Fluent 2: Layout / Spacing / Typography / Design Tokens
- Apple Human Interface Guidelines: Purpose / Simplicity / Hierarchy / Craft
- `EliteMay/DesignShelf`: 現在の24 Layout骨格とPalette-first Workflowを実運用候補として確認

## 1.4.0 - 2026-08-31

### Added

- `docs/15-development-observability.md` を追加
- 全Projectで長期的な失敗・成功を残す `PROJECT_LEARNINGS.md` 方針を追加
- `templates/PROJECT_LEARNINGS_TEMPLATE.md` を追加
- `templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json` を追加
- Interactive Project向けにDevelopment Diagnostics標準を追加
  - App Version / Build / Schema
  - JavaScript Error / Unhandled Promise Rejection
  - Fetch / API Failure
  - Storage Failure
  - Import / Migration / Restore結果
  - 重要操作Breadcrumb
  - Feature Flag状態
- One-click Diagnostic Export / Copy Report方針を追加
- Error ID、Health / Diagnostics View、Performance Diagnostics、Experimental Feature Flagの指針を追加
- 高コストBugは Project Learning + Regression Guard + Work Report をセットで残すルールを追加

### Changed

- `START_HERE.md` に「診断データから調査する」ルートを追加
- 新規制作ルートへProject Learnings / Diagnostics設計を追加
- `REQUIREMENTS_TEMPLATE.md` にDevelopment Diagnostics / Project Memory項目を追加
- `README_TEMPLATE.md` にDiagnostics / Project Memory項目を追加
- `QUALITY_CHECKLIST.md` にError capture、Breadcrumb、Log rotation、Secret exclusion、Diagnostic Export等を追加
- Continuous Improvement Reviewで各Projectの `PROJECT_LEARNINGS.md` を重要Evidenceとして確認する方針を追加
- Guide Validatorへ新規Doc / Template / Diagnostics Schemaの存在・構造検査を追加

### Safety / Privacy

- Diagnostic LogはLocal-firstを原則とする
- Token / Password / API Key / Secret / User入力全文 / Media bodyをLogへ直接記録しない
- Breadcrumb / Diagnostic LogはRing Buffer等で保持上限を持たせる
- 実際の個人Diagnostic Logは公開Repositoryへ原則Commitしない

### Source

- ユーザー要望: 毎回状況を説明し直さなくても、Project自身の記録から原因調査を始められる共通基盤
- MDN: Window `error` / `unhandledrejection` とPerformance API / PerformanceObserver
- OWASP Logging Cheat Sheet: Application loggingの一貫性とSensitive Data除外

## 1.3.0 - 2026-08-31

### Added

- `docs/14-continuous-improvement.md` を追加
- `maintenance/review-policy.json` を追加し、定期レビュー対象・公式Web Source・変更ポリシーを一元化
- GitHub上でアクセス可能な `EliteMay` Repositoryを毎回再発見し、差分中心でReviewする方針を追加
- W3C / MDN / web.dev / OWASP / GitHub / Electron / WHATWGを中心としたWeb Standards Reviewを追加
- Project Feedback Loop / Web Standards Loopを追加
- No Change / No Commit方針を追加
- 高影響Rule変更は自動確定せずBranch / Proposalを優先するSafety Ruleを追加
- `START_HERE.md` にGuide定期改善ルートを追加

### Changed

- READMEへContinuous Improvement入口を追加
- Guideを固定文書ではなく、実ProjectとWeb標準から継続改善するSource of Truthとして明文化
- 定期レビューによる他Projectの扱いをRead-onlyとし、自動更新先を `web-project-guide` に限定
- Guide Validatorへ `docs/14-continuous-improvement.md` と `maintenance/review-policy.json` の必須存在・Policy JSON整合性検証を追加

### Automation

- ChatGPT側の定期Reviewから `maintenance/review-policy.json` を参照し、Project差分と公式Web情報を確認して、共通化価値がある場合だけGuideを更新する運用を想定
- 一般Web Ruleは公式Source、Project由来Ruleは具体的なProject Evidenceを要求

## 1.2.0 - 2026-08-30

### Added

- 既存サイトの構造整理 / Patch統合ルートを`START_HERE.md`へ追加
- Backup / Import / Restore専用ルートを`START_HERE.md`へ追加
- 正式Runtime PathとVersion Metadataを分離するルールを追加
- 破壊的Importの `validate → backup → replace → verify → rollback` 手順を追加
- `Renderer owns its DOM` 原則をArchitectureへ追加
- Failure CatalogへF-017〜F-019を追加
- Success Pattern CatalogへS-021〜S-023を追加
- Anti-Pattern CatalogへAP-024〜AP-025を追加

### Changed

- Quality ChecklistへStable Runtime、Import Rollback、MutationObserver後付け、Version整合性検証を追加
- Guide自身のValidatorを強化し、正本ファイル全件、H1、Guide VersionとCHANGELOG一致、Catalog ID重複、未定義Catalog ID参照を検査
- READMEの最低限原則と自己検証内容を現在のGuide仕様へ更新

### Source

English Worksheet Lab v0.6.2の実運用で見つかった以下の問題をGuideへ還元した。

- Versioned Patchを統合した後も`js/v060/`等のVersion付き正式Runtimeが残る
- Session等へ古いApp Version hardcodeが残る
- Backup ImportがTop-level schema確認後にStoreをclearし、途中失敗時に既存データを失える
- 自前RendererのDOMを別ModuleがMutationObserverで後付けしていた

## 1.1.1 - 2026-08-30

### Added

- GitHub変更経路の選択基準を追加
  - 小規模変更は対象ファイルを直接更新
  - 複数ファイル・高リスク変更はBranch / Pull Requestを優先
  - GitHub Actionsは継続的自動化を目的とする場合に使用
- Cleanup後の最終Commit / Merge Commitを完成判定の基準とするFinal-state Validationを追加
- 一時Script / 一時Workflow / Debug資産のCleanup確認をQuality Checklistへ追加
- Failure Catalogへ `F-016 一時Workflow / Scriptが修正経路になる` を追加
- Anti-Pattern Catalogへ `AP-023 Workflow as Patch Engine` を追加
- Success Pattern Catalogへ `S-020 Smallest Safe Change Path + Final-state Verification` を追加

### Changed

- `START_HERE.md` の既存サイト修正ルートへ変更経路選択と最終Commit確認を追加
- `docs/10-project-management.md` の既存プロジェクト変更手順をFinal State基準へ更新
- `docs/07-testing-quality.md` にFinal-state Validationと最終Commit用Checklistを追加

## 1.1.0 - 2026-08-30

### Added

- `START_HERE.md` を追加し、作業種類別の入口を用意
- `docs/00-governance.md` を追加し、MUST / SHOULD / MAY / CONDITIONALと指示衝突時の優先順位を定義
- Guide VersionのSingle Source of Truthとして`guide-version.json`を追加
- Project Profileルールを追加
- Dependency / Assetルールを追加
- ADR / README / SPEC / PROJECT_RULES / CHANGELOGテンプレートを追加
- Guide自身を検証するGitHub Actions / Validatorを追加

### Changed

- READMEを入口中心へ簡素化し、詳細ルールの重複を削減
- Quality ChecklistをMinimum / Standard / Extendedへ分割
- 要件定義テンプレートへProject Profile・想定データ量・公開範囲等を追加
- Failure / Success / Anti-Pattern Catalogへ相互参照・適用条件を追加

## 1.0.0 - 2026-08-30

### Added

- 要件定義、Architecture、Data/Storage、UI/UX、Performance、Security、Testing、GitHub Pages、Maintenance、Project Management、Electronの共通ガイド
- Failure / Success / Anti-Pattern Catalog
- Requirements / Work Report / Quality Checklist templates
- Web標準Reference
