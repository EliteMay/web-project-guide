# 17 Visual Quality Baseline

この章は、**User-facing UIを「機能が動くが未調整」のまま完成扱いしないための最低完成Gate**です。

詳細なDesign Ruleは [04 UI / UX / Accessibility](04-ui-ux-accessibility.md)、Meaningful Visual ChangeのResearch / Redesign / Foundation Resetは [18 Domain-first Visual Research](18-domain-first-visual-research.md) を正本とします。

この章では詳細手順を再掲せず、完成判定だけを持ちます。

## MUST: User-facing UIはBaselineを満たす

Web Site、Web App、Electron Renderer、Browser Game等でUserが直接見るUIがある場合、Visual QualityをCompletionから外しません。

Guideの優先順位で「見た目」が後ろでも、次を許可する意味ではありません。

- 機能が動けばPrototype感が残っていてよい
- AI生成の初期CSSをVisual Reviewなしで完成扱いする
- Static ValidationだけでVisualを確認済みとする
- Accessibilityを見た目のために犠牲にする

## Visual Ambition

### Baseline — MUST

すべてのUser-facing UIへ適用します。

目的は派手さではなく、**Hierarchy・読みやすさ・一貫性・操作性・Responsive・仕上げの最低品質**を満たすことです。

### High / Flagship — CONDITIONAL

Visual自体が価値になるProject、新規公開Product、大規模Redesign等ではBaselineに加えて [18 Domain-first Visual Research](18-domain-first-visual-research.md) と [04 Visual Design Review Gate](04-ui-ux-accessibility.md#visual-design-review-gate) を使います。

## Meaningful Visual Change

Page Composition、Navigation、Theme、Workspace構造、Visual Direction等を意味のある範囲で変える場合は、実装前に [18 Domain-first Visual Research](18-domain-first-visual-research.md) を確認します。

Alignment / clipping / contrast等、原因と正解が明確な局所Bugへ毎回Researchを要求しません。

## Minimum Completion Gate

User-facing UIの完成前に、少なくとも次をPassします。詳細な判断基準は [04](04-ui-ux-accessibility.md) を参照します。

### Hierarchy

- [ ] Primary Action / Main Content / Secondary Informationの優先度が見た目から理解できる

### Typography

- [ ] 同じ役割のTextが一貫し、実Contentで読みづらさ・詰まり・極端なLine lengthがない

### Spacing / Alignment

- [ ] Group関係・Edge・Gridが場当たり的に崩れていない

### Component / State

- [ ] 同じ役割のComponentが一貫し、実際に必要なhover / focus / selected / disabled / loading等のStateを見分けられる

### Responsive

- [ ] 主用途Viewportと必要な狭い / 低いViewportで主要操作・Navigation・Contentが失われず、重大overflow / clippingがない

### Accessibility

- [ ] Focus / Contrast /状態表現 /操作Target等にBlockingなVisual Accessibility Issueがない

### Finish

- [ ] Debug UI / Temporary label / Placeholder /未調整Browser default / Generic AI Draft感を通常導線へ残していない

## MUST: Visual Verification

User-facing UIを新規作成した、またはLayout / Typography / Navigation / Component Styleを意味のある範囲で変更した場合、**最終状態を目で確認**します。

可能なら最終Commit相当の状態で、実Browser / Screenshot / Real deviceのいずれかを使います。

最低限見る対象:

- First View
- Main Task / Primary Action
- Navigation
- Typography / Spacing
- Overflow / clipping
- Interactive State
- Responsive priority

確認できない環境では`Visual未確認`と作業報告へ明記します。

## High / Flagship Review

High / Flagshipでは [04 Visual Design Review Gate](04-ui-ux-accessibility.md#visual-design-review-gate) を独立工程として実施します。

Blocking Findingが残る場合はVisual完成扱いにしません。

## Validated Direction / Foundation Reset

過去の高評価方向は [Validated Visual Direction Catalog](../catalog/validated-visual-directions.md) をEvidenceとして利用できますが、今回のDomain適合確認を置き換えません。

局所Patchを重ねても全体品質が上がらない場合は、[18 Visual Foundation Reset](18-domain-first-visual-research.md#visual-foundation-reset) へ戻ります。正しく動く機能・Data Contractを捨てるのではなく、失敗しているVisual Foundationだけを再設計します。

## 変更規模ごとの適用

- **UIに触れない局所Bug:** 全画面Redesign不要
- **軽微UI改善:** 変更箇所と周辺でBaselineを確認
- **新規Page / Meaningful Visual Change:** Baseline + `18`
- **High / Flagship:** Baseline + `18` + 独立Visual Review
- **既存UIが低品質だが今回別目的:** 勝手に全面RedesignせずVisual debtを記録し、次のMeaningful UI作業で再判断

## 完成判定

User-facing UIについて「見た目まで完成」と表現できるのは、次を満たす場合です。

- Minimum Completion GateをPass
- BlockingなVisual / Accessibility Issueなし
- 最終Visualを確認済み、または未確認を明示
- High / Flagshipでは必要な独立Visual Reviewを実施
