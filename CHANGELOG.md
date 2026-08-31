# CHANGELOG

Guide Versionの正本は [`guide-version.json`](guide-version.json) です。

## 1.8.0 - 2026-08-31

### Added

- `docs/11-electron-distribution.md`へInstaller Release Contractを追加
  - Setup.exe単体生成ではなく、Version / Installer / Update Metadata / Release Channel / userData / Signing / Fallback /実機更新を1つの配布契約として扱う
  - `Setup.exeが生成できた`、`CIが通った`、`Releaseが存在する`の1条件だけで配布成功扱いにしない
- Updater Bootstrap方針を追加
  - Updater導入前Versionは自力でAuto Updateできないことを明示
  - Updater搭載の最初のVersionをBootstrap Versionとして扱う
  - それ以前の利用者には1回だけ手動Setup.exe更新が必要な場合がある
  - Bootstrap後はApp内One-click Updateへ移行
  - サポート対象の最古Auto-update Version → 最新VersionのUpdate Pathを確認
- Build / Release Pipeline分離方針を追加
  - Pull RequestではInstaller + MetadataをBuild / ValidateしてArtifact保存、Stable Releaseは作らない
  - main / approved tagで同じ検証後にReleaseへInstaller / MetadataをUpload
  - 未Merge BuildをStable Update Channelへ誤配信しない
- Release Artifactの整合確認を拡張
  - Installer / `latest.yml` / `.blockmap`等の必要Artifact存在
  - `package.json#version` / `app.getVersion()` / Release Tag / Metadata / Installer名のVersion一致
  - Metadataが実際のInstallerを参照していること
  - MetadataとInstallerを同一Build / Pipelineから生成し、別BuildのArtifactを混ぜない
- Broken Release対応を追加
  - 一部利用者へ配信済みの壊れたReleaseは同Version差し替えだけに頼らず、原則としてより大きい修正版Versionを発行
- Windows Code Signing / Update互換性の注意を拡張
  - 公開配布ではCode Signingを強く推奨
  - 未署名配布ではSmartScreen / Publisher検証の制約を明示
  - Updater / electron-builder互換範囲変更時は既存Installed Appからの更新を確認

### Source

- `EliteMay/osu-hub` `osu Setup Launcher v0.18.2`
  - v0.18.1以前はUpdaterなしのためv0.18.2 Setup.exeを1回手動InstallするBootstrap運用
  - PRでInstaller / `latest.yml` / `.blockmap`を検証し、mainだけGitHub Releaseへ公開
  - Auto Update失敗時は現在Version継続 + GitHub Releases手動Fallback
  - Electron `userData`をInstaller更新から分離
- electron-builder Auto Update / Troubleshooting / Security公式Documentation
  - NSIS + `electron-updater`
  - `latest.yml`等のRelease Metadata
  - MetadataとArtifactを同じBuildから生成する重要性
  - Installed Windows AppでのAuto Update実機Test推奨
- Electron Code Signing公式Documentation

### Compatibility

- 既存Electron ProjectへAuto Updateを一律強制しない
- 単発Tool / Portable /更新頻度が低いProjectは条件付き判断を維持
- 既存Storage / Deployment Default変更なし
- `osu-hub`本体Codeは今回変更しない

## 1.7.0 - 2026-08-31

### Added

- Visual DesignへSubject-grounded Directionを追加
  - Purpose / Audience / Content / TaskからDesignを導く
  - 実在Siteは外観ではなくAudience / Job / Content Model / Navigation / Density等へ分解して参照
  - Project固有のSignatureを必要に応じて1つ決める
- AI PromptのConstraint / Open Axes方針を追加
  - Technology / Accessibility / Performance /崩せない仕様は固定可能
  - Hero / Card Grid / Navigation / Density / Effect等をDesign Direction決定前に固定しすぎない
- Design Plan Critiqueを追加し、GenericなPlanはCSS本実装前に修正
- Copy / Empty / Error StateをVisual Designの一部として扱う方針を追加
- Interactive ComponentのState確認を追加
- Build後の独立したVisual Design Review Gateを追加
  - Purpose / Task / Hierarchy / Navigation / Responsive / Typography / Components / Accessibility / Copy / AI Template Regression
  - FindingをBlocking / Major / Minorに分類
  - Visual Review結果をPass / Needs workで記録
- AI Coding Agent運用を追加
  - AI生成Codeも通常の品質Gateを通す
  - AI提案の高コストArchitecture / Storage / Dependencyを無検証で採用しない
  - 未経験TechnologyへAIを使う場合の追加Review
- Specification / Oracle-driven AI Developmentを追加
  - Golden Output / Reference implementation / Contract / Regression Dataset等で大量AI生成を検証
- `templates/AGENTS_TEMPLATE.md`を追加
  - `AGENTS.md`はProject RulesのSource of TruthではなくAgent向けRouterとして利用
  - Build / Test command、正本へのLink、高リスク領域、Completion Checkを記載
- PUBLIC-CONTENT ProfileへLanguage / Metadata / 404 Recovery / i18n / Privacy確認を追加
- GitHub Pagesへ条件付き`404.html` Recovery方針を追加

### Changed

- `docs/04-ui-ux-accessibility.md`へAnthropic / Microsoft AI Frontend Design研究から得た一般化可能なDesign Thinkingを統合
- `docs/07-testing-quality.md`へOracle Test / Visual Design Review / AI-assisted Quality Checkを統合
- `docs/10-project-management.md`へAI Coding Agent / AGENTS.md / Oracle-driven Workflowを統合
- `docs/12-project-profiles.md`のPUBLIC-CONTENTを拡張
- `START_HERE.md`へAI Coding Agent利用と完成後Visual Reviewの専用Routeを追加
- `templates/QUALITY_CHECKLIST.md`へVisual Review / AI-assisted Development / Public Content項目を追加
- `templates/PROJECT_RULES_TEMPLATE.md`でAGENTS.mdとの役割分担を明記
- `references/web-standards.md`へAnthropic / Microsoft / AGENTS.md / Google / W3C i18n / Front-End Checklist系を追加
- `maintenance/review-policy.json`へAI Frontend Design / Agent Instructions / Public Content Review Sourceを追加
- Guide ValidatorへAGENTS Template存在・Router方針検査を追加

### DesignShelf

- DesignShelfをLayout番号選択だけでなく、Navigation / Structure / Density / Typography / Visual Emphasis / Component / Spacing / Color / Effect / Signature等の**Design属性Bundle**でDirectionを探索する将来案へ更新
- 属性をRandomに独立組合せせず、相性のあるCoherent Directionを2〜3案生成し、Projectへの適合理由を付ける方針をIssue #1へ追加
- Layout IDは完成TemplateではなくSkeleton / Exampleとして維持
- DesignShelf本体Code / Storageは今回変更していない

### Research / Classification

- Anthropic Frontend Design: Subject grounding / Copy / Plan Critique / Build後CritiqueをGuideへ拡張反映
- Microsoft Agent Academy Frontend Design: Purpose / Differentiation / Intentional directionを参考。特定Fontや派手さのPreferenceは共通Ruleへ入れない
- Microsoft Frontend Design Review: 完成後Review Gate / Severityを反映
- Front-End Checklist: Language / Public Metadata / Privacy / i18n等の抜け発見に使用。巨大Checklistは移植しない
- Front-End Design Checklist: Component State / Real content / Responsive等を既存Ruleへ拡張
- AGENTS.md: Agent向け入口としてTemplate化。ただしProject SoTを増やさない
- Birthday Quest / ScanPass: AI出力を無Reviewで完成扱いするRiskのCase Studyとして利用
- AI Portfolio Generator: PromptでHero / Card Grid / Effectsを固定しすぎるとTemplate Lookを自ら固定するCase Studyとして利用
- Higher or Lower Card Game: User Goal / Scope / Wireframe / Test / ReflectionのProcess Referenceとして利用
- Lichess Time Tracker: AI draft後の意図的RefactorのCaseとして利用
- Mazes of Menace: AI大量生成でもReference / Golden Test / Oracleが強ければ高い検証可能性を作れるCounterexampleとして利用
- Apple / Microsoft / GitHub / NVIDIA / Discord / Spotify: 同じ大規模公式SiteでもAudience / Content Model / Taskにより構造が大きく異なることを確認

### Compatibility

- 既存Projectへ`AGENTS.md`を強制追加しない
- 既存ProjectへVisual Layout変更を強制しない
- Storage / Schema / Deployment Defaultの変更なし
- DesignShelf本体の既存ID / JSON / Workflow互換性への変更なし

## 1.6.0 - 2026-08-31

### Added

- `docs/11-electron-distribution.md`へ継続配布するインストール型Electronアプリ向けのOne-click Update方針を追加
  - App起動時にBackgroundで更新確認
  - 新Versionがある場合に「今すぐ更新 / あとで」を提示
  - 1回の明示操作でDownload / Install / Restartまで進める導線を原則として優先
  - 更新時も`userData`等のユーザーデータを維持
- GitHub Releases + NSIS配布時のUpdate Artifact整合ルールを追加
  - Setup.exe
  - `.blockmap`
  - `latest.yml`
  - Release Tag / `package.json#version` / MetadataのVersion一致
- Auto Updateの安全性とFallbackを追加
  - Update Provider固定 / Allowlist
  - Hash / Integrity利用
  - 公開配布ではCode Signingを強く推奨
  - 未署名配布では制約を明記
  - Update失敗時は手動Release導線と現Version継続利用を維持
- Auto Update導入・変更時の旧Version → 新Version実機Update確認項目を追加

### Changed

- `START_HERE.md` のElectronルートにOne-click Update / Update Metadata / Release整合確認を追加
- Guide Versionを `1.6.0` へ更新

### Source

- ユーザー要望: Setup.exeを毎回手動実行するのではなく、アプリ起動時に更新通知し1回の操作で更新できる共通方針へしたい
- `EliteMay/osu-hub`: Setup LauncherをGitHub Releases + NSISで継続配布している実Project
- electron-builder公式Auto Update Documentation: `electron-updater`、NSIS、GitHub Provider、`latest.yml`等のUpdate Metadata

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
- Success PatternへS-021〜S-023を追加
- Anti-PatternへAP-024〜AP-025を追加

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
- Success Patternへ `S-020 Smallest Safe Change Path + Final-state Verification` を追加

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
