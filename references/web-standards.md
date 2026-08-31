# Web Standards / References

このガイドの一般Web制作部分を見直す際の一次情報・主要Referenceです。

## Accessibility / Internationalization

- W3C WCAG 2.2
  - https://www.w3.org/TR/WCAG22/
- WCAG 2.2 New Success Criteria
  - https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- Reflow
  - https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- Contrast Minimum
  - https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Error Identification
  - https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html
- W3C Internationalization — Authoring HTML & CSS
  - https://www.w3.org/International/techniques/authoring-html

## Browser / Web APIs

- MDN Feature Detection
  - https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Feature_detection
- MDN Fetch API
  - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- MDN AbortController
  - https://developer.mozilla.org/en-US/docs/Web/API/AbortController
- MDN Progressive Enhancement
  - https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement
- MDN img
  - https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img
- MDN Subresource Integrity
  - https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity
- MDN XSS
  - https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS

## Performance

- web.dev Core Web Vitals thresholds
  - https://web.dev/articles/defining-core-web-vitals-thresholds
- web.dev Responsive Web Design Basics
  - https://web.dev/articles/responsive-web-design-basics
- web.dev Optimize Long Tasks
  - https://web.dev/articles/optimize-long-tasks
- web.dev Reduce JavaScript Payloads with Code Splitting
  - https://web.dev/articles/reduce-javascript-payloads-with-code-splitting
- web.dev Third-party JavaScript
  - https://web.dev/articles/third-party-javascript
- web.dev Baseline
  - https://web.dev/baseline

## Security

- OWASP HTML5 Security Cheat Sheet
  - https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html
- OWASP Logging Cheat Sheet
  - https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
- Supabase Row Level Security
  - https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase Data API Security
  - https://supabase.com/docs/guides/api/securing-your-api

Remote DiagnosticsをSupabase等へ保存する場合は、公開Frontendへ`service_role`を置かず、RLSだけでなくGrantと実際の操作権限を確認します。

## Free / Hosted Service Constraints

無料必須Projectの外部依存を見直すReferenceです。数値は変化するため、Guideへ恒久値として固定せず導入時に最新ページを確認します。

- Supabase Pricing
  - https://supabase.com/pricing
- Supabase Billing / Usage
  - https://supabase.com/docs/guides/platform/billing-on-supabase
- Supabase Free Project Pausing
  - https://supabase.com/docs/guides/platform/free-project-pausing
- GitHub Actions Billing / Usage
  - https://docs.github.com/en/actions/concepts/billing-and-usage

無料枠を理由に1 Site = 1 Backendを機械的に増やさず、Shared Store / Local-first / Fallbackを含めて設計します。

## GitHub Cross-Repository Infrastructure

複数Repositoryの運用標準化を確認する一次資料です。

- GitHub Docs — Creating a default community health file
  - https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file
- GitHub Docs — Reuse workflows
  - https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows
- GitHub Docs — Reusing workflow configurations
  - https://docs.github.com/en/actions/reference/workflows-and-actions/reusing-workflow-configurations
- GitHub Docs — About rulesets
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets
- GitHub Docs — Creating rulesets for a repository
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository
- GitHub Docs — Configure Dependabot version updates
  - https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configure-version-updates
- GitHub Docs — Optimize Dependabot version update PRs
  - https://docs.github.com/en/code-security/tutorials/secure-your-dependencies/optimizing-pr-creation-version-updates
- GitHub Docs — About Projects
  - https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects

一般化する観点:

- Public `.github` RepositoryはAccount共通のIssue / PR / Community Health Defaultとして使える
- 各Repository側に固有Fileがある場合は固有設定を優先できる
- Reusable Workflowは別Public Repositoryから呼び出せる
- 外部Reusable WorkflowはCommit SHA参照が安定性・Security上もっとも安全
- Rulesetの強さはRelease / Data Riskに応じて変える
- DependabotはDependency更新を自動検出できるが、Update PRの品質確認はProject側の責務
- GitHub ProjectsはIssue / PRを横断表示できるが、仕様の新しいSource of Truthにしない

## GitHub Pages / Public Content

- GitHub Docs — Custom 404 Page
  - https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site
- Google Search Central
  - https://developers.google.com/search/docs

## Visual Design / Design Systems

特定企業の外観をコピーするためではなく、Layout / Typography / Spacing / Hierarchy / Component consistencyを学ぶReferenceとして利用します。

- GitHub Primer — Layout
  - https://primer.style/product/getting-started/foundations/layout/
- GitHub Primer — Typography
  - https://primer.style/product/getting-started/foundations/typography/
- GitHub Primer — Navigation Patterns
  - https://primer.style/product/ui-patterns/navigation/
- Microsoft Fluent 2 — Layout
  - https://fluent2.microsoft.design/layout
- Microsoft Fluent 2 — Typography
  - https://fluent2.microsoft.design/typography
- Microsoft Fluent 2 — Design Tokens
  - https://fluent2.microsoft.design/design-tokens
- Apple Human Interface Guidelines
  - https://developer.apple.com/design/human-interface-guidelines/

これらから共通Ruleへ取り込むのは「GitHub風にする」「Microsoft風にする」といった表層表現ではなく、以下のような一般化可能な考え方です。

- Layoutは情報の関係と優先順位を表す
- SpacingはGroupingとHierarchyを作る
- TypographyはSemantic roleとScanabilityを支える
- Navigationは現在地と次の行動を明確にする
- Component / Tokenは一貫性を作る
- DesignはPurposeと利用Contextから決める

## AI向けFrontend Design / Review

AIへDesignを任せるときのThinking / Review方法を研究するReferenceです。特定Skillの美的好みをそのまま共通Ruleへしません。

- Anthropic — Frontend Design Skill
  - https://github.com/anthropics/claude-plugins-official/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md
- Microsoft Agent Academy — Frontend Design
  - https://github.com/microsoft/agent-academy/blob/main/.github/skills/frontend-design/SKILL.md
- Microsoft Skills — Frontend Design Review
  - https://github.com/microsoft/skills/blob/main/.github/skills/frontend-design-review/SKILL.md

共通化しやすい観点:

- Purpose / Audience / SubjectからDirectionを作る
- 何がProject固有かを実装前に言語化する
- Typography / Layout / Color / Effectsを意図的に選ぶ
- AIの時点ごとのDefault Aestheticを完成形として採用しない
- Build前とBuild後の両方でCritiqueする
- Copy / Empty / Error StateもDesign Materialとして扱う

「特定Fontを避ける」「必ず大胆なEffectを使う」等のStyle preferenceは、すべてのProjectへ適用するRuleにはしません。

## AI Coding Agent Instructions

- AGENTS.md open format
  - https://agents.md/

`AGENTS.md`はAgent向けの予測可能な入口として有用ですが、本GuideではProject仕様のSource of Truthを増やさないため、README / Spec / Project Rules / Test commandへ案内するRouterとして利用します。

Remote Diagnostic Handoffを使うProjectでは、秘密情報を含めずProvider / projectKey / 読取範囲 / FallbackもRouterから辿れるようにできます。

## Community / Checklist References

以下は網羅性や候補発見に有用ですが、一般RuleをMUSTへする根拠は可能な限り一次資料で再確認します。

- Front-End Checklist
  - https://github.com/thedaviddias/Front-End-Checklist
- Front-End Design Checklist
  - https://github.com/thedaviddias/Front-End-Design-Checklist

## 運用ルール

- ブログ記事や個人のTipsより、まずW3C / MDN / web.dev / OWASP / GitHub /公式Design System等の一次資料を優先する。
- Anthropic / Microsoft等のAgent Skillは「AIへどう考えさせるか」のReferenceとして扱い、Style preferenceまで共通Ruleへコピーしない。
- Community Checklistは抜け発見に使い、重要Ruleは可能なら公式Sourceへ戻って確認する。
- Hosted ServiceのPricing / Quota / Pause条件は変化するため、無料必須Projectでは導入・定期Review時に公式情報を再確認する。
- Web標準・Design Systemは変化するため、新しいAPIやVisual Ruleを共通ルールへ追加する前に最新の公式情報を確認する。
- 特定BrandのVisual表現をそのままGuideのDefaultへしない。
- このファイルのURL自体を仕様の代わりにせず、実際に採用したルールは`docs/`側へ日本語で明文化する。
