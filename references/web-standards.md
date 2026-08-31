# Web Standards / References

このガイドの一般Web制作部分を見直す際の一次情報・主要参考資料です。

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
- MDN img / responsive images
  - https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img
- MDN `dir`
  - https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir
- MDN Intl
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
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
- GitHub — Making GitHub’s homepage fast and performant
  - https://github.blog/engineering/user-experience/making-githubs-new-homepage-fast-and-performant/

## Security / Privacy

- OWASP HTML5 Security Cheat Sheet
  - https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html
- OWASP Logging Cheat Sheet
  - https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html

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
- GitHub — How we designed and wrote the narrative for our homepage
  - https://github.blog/news-insights/company-news/how-we-designed-and-wrote-the-narrative-for-our-homepage/
- Spotify — The Look Behind the Sound
  - https://newsroom.spotify.com/2026-04-23/spotify-design-history/
- Discord — Squircles, Styles, and Spacing
  - https://discord.com/blog/improving-mobile-with-squircles-styles-and-spacing

これらから共通Ruleへ取り込むのは「GitHub風にする」「Microsoft風にする」といった表層表現ではなく、以下のような一般化可能な考え方です。

- Layoutは情報の関係と優先順位を表す
- SpacingはGroupingとHierarchyを作る
- TypographyはSemantic roleとScanabilityを支える
- Navigationは現在地と次の行動を明確にする
- Component / Tokenは一貫性を作る
- DesignはPurpose・Subject・利用Contextから決める
- 実Product / Data / ContentをVisual identityへ利用する
- 1つのSignatureを強くし、すべてを派手にしない選択も有効
- Designは利用者の行動・Feedbackとともに更新する

## AI Frontend Design / Review

AIへFrontend制作を任せるときのDesign ThinkingとReview工程の参考です。

- Anthropic — Frontend Design Skill
  - https://github.com/anthropics/claude-plugins-official/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md
- Microsoft Agent Academy — Frontend Design
  - https://github.com/microsoft/agent-academy/blob/main/.github/skills/frontend-design/SKILL.md
- Microsoft Skills — Frontend Design Review
  - https://github.com/microsoft/skills/blob/main/.github/skills/frontend-design-review/SKILL.md

主に参考にする考え方:

- Context / Purpose / AudienceをCodeより先に固定する
- Generic AI Aestheticを避ける
- 題材固有のContent / Artifact / Product UIから方向を作る
- Distinctive Directionを1つ選び、Implementation complexityをDirectionに合わせる
- Design Planを実装前に自己Critiqueし、実装後にもう一度Reviewする
- 完成後ReviewではPurpose / User Task / Hierarchy / Design System / Accessibility / Frictionを分けて評価する

特定Skillにある「このFontは使わない」「必ず大胆にする」等の表現は、そのままMUSTへしません。GuideではProject Contextと既存Design Systemを優先します。

## Frontend Checklists

網羅性確認に利用します。385項目等をそのままGuideへCopyしません。

- Front-End Checklist
  - https://github.com/thedaviddias/Front-End-Checklist
- Front-End Design Checklist
  - https://github.com/thedaviddias/Front-End-Design-Checklist

主にGap確認へ使うCategory:

- HTML / CSS / JavaScript
- Performance / Images
- Accessibility
- Security / Privacy
- Testing / Visual Regression
- Internationalization
- Grid / Typography / Navigation / Forms / Component states

## AI Coding Agent Instructions

- AGENTS.md open format
  - https://agents.md/
- OpenAI Codex — AGENTS.md / manual review
  - https://openai.com/index/introducing-codex/

`AGENTS.md`はREADMEやProject Rulesの代替ではなく、Agent向けのCommand / Navigation / operational contextを置くRouterとして参考にします。

## AI-assisted Project Case Studies

以下は「良いTemplate」としてコピーするのではなく、AIへ任せる範囲とHuman Reviewの違いを見るCase Studyです。

- Birthday Quest — Code / READMEをChatGPT生成と明記
  - https://github.com/TetianaKlymchuk/birthday_quest
- ScanPass — Flutter / Dart未経験からChatGPT依存で制作
  - https://github.com/Hupka/scan-pass
- Higher or Lower Card Game — AIを相談・Debug・Review補助として使い、人間が検証・修正
  - https://github.com/David-CB-UK/higher-lower-card-game
- AI Portfolio Generator — 詳細PromptによるFrontend生成例
  - https://github.com/Sachin712/AI-Portfolio-Generator

Case Study単体の癖を一般Ruleへ昇格させません。複数例・自Project・公式資料と照合し、再現性がある考え方だけ採用します。

## 運用ルール

- ブログ記事や個人のTipsより、まずW3C / MDN / web.dev / OWASP / 公式Design System / 公式AI Skill等の一次資料を優先する。
- Web標準・Design System・AI Agent運用は変化するため、新しいAPIやVisual Ruleを共通ルールへ追加する前に最新情報を確認する。
- 特定BrandのVisual表現をそのままGuideのDefaultへしない。
- Community Checklistは抜け漏れ探索に使い、項目数をGuideへコピーしない。
- Case Studyは因果関係の証明として扱わず、仮説・Pattern発見のEvidenceとして使う。
- このファイルのURL自体を仕様の代わりにせず、実際に採用したルールは`docs/`側へ日本語で明文化する。
