# Web Standards / References

このガイドの一般Web制作部分を見直す際の一次情報です。

## Accessibility

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
- Apple Human Interface Guidelines — Design Principles
  - https://developer.apple.com/design/human-interface-guidelines/design-principles

これらから共通Ruleへ取り込むのは「GitHub風にする」「Microsoft風にする」といった表層表現ではなく、以下のような一般化可能な考え方です。

- Layoutは情報の関係と優先順位を表す
- SpacingはGroupingとHierarchyを作る
- TypographyはSemantic roleとScanabilityを支える
- Navigationは現在地と次の行動を明確にする
- Component / Tokenは一貫性を作る
- DesignはPurposeと利用Contextから決める

## 運用ルール

- ブログ記事や個人のTipsより、まずW3C / MDN / web.dev / OWASP / 公式Design System等の一次資料を優先する。
- Web標準・Design Systemは変化するため、新しいAPIやVisual Ruleを共通ルールへ追加する前に最新の公式情報を確認する。
- 特定BrandのVisual表現をそのままGuideのDefaultへしない。
- このファイルのURL自体を仕様の代わりにせず、実際に採用したルールは`docs/`側へ日本語で明文化する。
