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
- Web標準・Design Systemは変化するため、新しいAPIやVisual Ruleを共通ルールへ追加する前に最新の公式情報を確認する。
- 特定BrandのVisual表現をそのままGuideのDefaultへしない。
- このファイルのURL自体を仕様の代わりにせず、実際に採用したルールは`docs/`側へ日本語で明文化する。
