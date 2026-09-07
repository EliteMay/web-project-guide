import fs from 'node:fs';

function replaceOnce(text, oldValue, newValue, label) {
  if (text.includes(newValue)) return text;
  const first = text.indexOf(oldValue);
  if (first < 0) throw new Error(`Anchor not found: ${label}`);
  if (text.indexOf(oldValue, first + oldValue.length) >= 0) {
    throw new Error(`Anchor is not unique: ${label}`);
  }
  return text.slice(0, first) + newValue + text.slice(first + oldValue.length);
}

function insertBefore(text, anchor, addition, marker, label) {
  if (text.includes(marker)) return text;
  const index = text.indexOf(anchor);
  if (index < 0) throw new Error(`Anchor not found: ${label}`);
  if (text.indexOf(anchor, index + anchor.length) >= 0) {
    throw new Error(`Anchor is not unique: ${label}`);
  }
  return text.slice(0, index) + addition + text.slice(index);
}

function write(path, text) {
  fs.writeFileSync(path, text, 'utf8');
}

// docs/04-ui-ux-accessibility.md
{
  const path = 'docs/04-ui-ux-accessibility.md';
  let text = fs.readFileSync(path, 'utf8');

  text = replaceOnce(
    text,
    '## レスポンシブ\n\n端末名ではなく、**内容が崩れる地点**をbreakpointにします。\n\n原則:\n- ページ全体の横スクロールを避ける。\n- 表・タイムライン・大型編集領域など、必要な部分だけ局所スクロールを許可する。\n- 320 CSS px相当の狭い画面でも主要情報と操作を失わないことを目標にする。\n- PC専用UIでも、低い縦解像度・表示倍率125〜150%を確認する。\n- Responsiveでは単純に列数を減らすだけでなく、Navigation / Secondary Content / Action priorityを必要に応じて再構成する。\n\n',
    '## レスポンシブ\n\n端末名ではなく、**内容が崩れる地点**をbreakpointにします。\n\n原則:\n- ページ全体の横スクロールを避ける。\n- 表・タイムライン・大型編集領域など、必要な部分だけ局所スクロールを許可する。\n- 320 CSS px相当の狭い画面でも主要情報と操作を失わないことを目標にする。\n- PC専用UIでも、低い縦解像度・表示倍率125〜150%を確認する。\n- Responsiveでは単純に列数を減らすだけでなく、Navigation / Secondary Content / Action priorityを必要に応じて再構成する。\n\n### Responsive Robustness / Zoom / Reflow\n\nResponsiveは代表ViewportのScreenshotだけで判定せず、**Zoom、文字拡大、Content expansion、Orientation、低いViewport heightでもPrimary Taskを継続できるか**を確認します。\n\n- Browser ZoomやOS / Browserの文字拡大で主要Content / Actionが消えない。\n- Reflowが必要な狭い幅では、Page全体の二方向Scrollを避ける。Data table、Timeline、Canvas、Editor等、二次元Layoutが本質の領域は局所Scrollを許可できる。\n- Portrait / Landscapeのどちらかを理由なく唯一の操作可能Orientationにしない。特定Orientationが本質の場合だけ例外にする。\n- `100vh`前提でMobile browser chrome、software keyboard、低いViewport heightにより主要操作を隠さない。必要に応じてdynamic viewport unitやscroll可能なLayoutを検討する。\n- Translation、User-generated text、長いName / Label、Font差でTextが伸びても、固定Heightやellipsisだけで重要情報を失わせない。\n- Responsiveで情報を非表示にする場合、単にDesktopの内容を削るのではなく、Primary Task / Action priorityを保つ。\n\n## Internationalization / Localization\n\nInternationalization（i18n）は「後で翻訳する作業」ではなく、**言語・Script・地域差へ適応できるよう実装を硬直させない設計**として扱います。Localization（l10n）は、対象Localeへ実際のContent / Format /表現を適合させる作業です。\n\nCONDITIONAL: 複数言語、Locale切替、日本語・英語併記、海外公開等があるProjectでは次を必要範囲で確認します。単一言語の小規模Projectへ翻訳Infrastructureを機械的に追加しません。\n\n- Document / Contentの実言語を`lang`等で表し、Mixed-language Contentでは必要に応じて部分的なLanguage metadataを持つ。\n- UI StringをLayout / Logicへ過度に埋め込み、翻訳時にComponent構造を書き換える前提にしない。\n- 日本語と英語の文字数差だけでなく、より長い翻訳、異なるWord break、Font metric、Scriptを想定して固定Width / Height依存を避ける。\n- Date / Time / Number / Currency / Percent / Unit等は、User-facing表示でLocale-sensitive formattingが必要なら`Intl`等の標準機構を優先する。保存用Canonical valueと表示Formatを混同しない。\n- UserがLocaleを選べる場合、Language preferenceとContent Dataそのものを必要に応じて分離し、Locale変更でCanonical User Dataを壊さない。\n- RTLやVertical / complex scriptがScopeに入る場合は、物理方向`left/right`だけに依存したLayoutやIcon意味を見直す。Scope外のScript対応を完成済みと主張しない。\n- Locale依存のSort / Search / Case / normalizationが正確性へ影響する場合、単純ASCII前提の比較だけで実装しない。\n\n',
    'responsive robustness block'
  );

  text = replaceOnce(
    text,
    '## アクセシビリティ\n\nWCAG 2.2 AAを参考に、個人用サイトでも実用上重要な項目を標準にします。\n',
    '## アクセシビリティ\n\n### Accessibility as Task Completion\n\nAccessibilityはChecklist上の属性追加ではなく、**異なる入力方法・知覚方法・補助技術でもPrimary Taskへ実質的に到達できること**を中心に判断します。\n\n- Semantic HTML / ARIAは手段であり、主要Flowを完了できるかをOutcomeとして確認する。\n- Visual、Pointer、Audio等の1手段だけで成立する重要情報・操作には、Task上同等のOutcomeへ到達できるAlternativeを必要に応じて用意する。\n- Alternativeは必ず同じ見た目・同じ操作手順である必要はないが、重要な情報・権限・結果を失わせない。\n- Accessibility対応を理由にPrimary Taskを別の劣化版Flowへ追い出さない。\n- 未対応のAssistive Technology / Input Methodを確認済みとして扱わず、必要な利用者・Platformに応じてValidation範囲を明示する。\n\nWCAG 2.2 AAを参考に、個人用サイトでも実用上重要な項目を標準にします。\n',
    'accessibility task-completion block'
  );

  text = replaceOnce(
    text,
    '- `prefers-reduced-motion`を尊重する\n- `aria-pressed`, `aria-expanded`, `aria-live`等は必要な場所だけ正しく使う\n\n### WCAG 2.2 Interaction Coverage\n',
    '- `prefers-reduced-motion`を尊重する\n- `aria-pressed`, `aria-expanded`, `aria-live`等は必要な場所だけ正しく使う\n\n### Input-method Independence / Focus\n\n主要操作をMouse / Touch / Drag / Hover / Shortcut等の単一Input Methodへ理由なく固定しません。\n\n- Keyboardで到達したFocusがComponent、Dialog、Menu、Custom Widget等に閉じ込められず、意図したModal境界を除いて抜けられることを確認する。\n- DOM順・Visual順・Focus順を大きく乖離させず、Task理解を壊す不自然な`tabindex`正数指定を避ける。\n- Dialog / Popover等を閉じた後、可能なら操作開始元など意味のある位置へFocusを戻す。\n- Hoverだけで必須Information / Actionを出さない。Hover contentが必要ならKeyboard / Touchでも取得できる経路を持つ。\n- Touch GestureやMulti-pointer、Dragを本質としない操作には、Tap / Button / Keyboard等のAlternativeを検討する。\n- Shortcutを使う場合、Text入力との衝突、OS / Browser shortcutとの競合、誤発火を避ける。重要操作をShortcutだけにしない。\n- Pointer typeやBrowser名の推測だけで操作経路を決めず、可能ならCapability / actual eventに合わせる。\n\n### WCAG 2.2 Interaction Coverage\n',
    'input-method independence block'
  );

  text = replaceOnce(
    text,
    '## ボタンと入力\n\n- `div onclick`をボタン代わりに多用しない\n- 無効状態は理由が分かるようにする\n- エラーは「エラー」だけでなく修正方法を表示する\n- 破壊操作はUndo / 確認 / Backupのいずれかを持つ\n\n',
    '## ボタンと入力\n\n- `div onclick`をボタン代わりに多用しない\n- 無効状態は理由が分かるようにする\n- エラーは「エラー」だけでなく修正方法を表示する\n- 破壊操作はUndo / 確認 / Backupのいずれかを持つ\n\n### Forms / Validation / Error Recovery\n\nFormは「値を送信できる」だけでなく、**何を入力すべきか理解でき、Errorから入力を失わず回復できること**を完成条件に含めます。\n\n- Input / Select / Textarea等は、Placeholderだけに依存せずProgrammaticに関連付いたLabelまたは同等のAccessible Nameを持つ。\n- 必須 / Format / 制約は、可能ならError後ではなく入力前または入力時に理解できる形で示す。\n- Validation ErrorはFieldと関連付け、どこが・なぜ・どう直せるかを伝える。ColorやBorderだけをError表現にしない。\n- Submit失敗時にUserが正しく入力した値まで理由なく消さない。最初のErrorへFocusを移す、Error summaryからFieldへ移動できる等、長いFormではRecovery導線を検討する。\n- Native input type、`autocomplete`、Password manager等を利用できる場合は理由なく妨げない。Autofill後もLabel / Validation / Contrastが壊れないことを確認する。\n- Async validationやSubmit中に二重送信、古いError、late responseでCurrent input stateを壊さない。Network / Reliability固有のRetry判断は[05 Performance / Reliability](05-performance-reliability.md)を正本とする。\n- Authentication FormはSecurity強化を理由にAccessibilityを無視せず、Credential / AuthorizationのSecurity判断は[06 Security](06-security.md)を正本とする。\n\n## Motion / Animation / Media\n\nMotionやMediaはDecorative qualityだけでなく、操作可能性・理解可能性・代替手段を合わせて設計します。\n\n- `prefers-reduced-motion`では、非本質的なparallax、large movement、continuous animation等を減らす / 停止する。単にDurationを少し短くするだけで十分とは限らない。\n- 自動開始して長く続くAnimation / Carousel / Media等がTaskを妨げる場合、Pause / Stop / Hide等を必要に応じて用意する。\n- Animation終了だけをState changeの唯一のSignalにせず、Reduced Motion時も同じ結果を理解できる。\n- Audioだけに重要情報を載せず、必要に応じてText / Caption / Transcript等のAlternativeを用意する。Visualだけに重要なNarration / Instructionを載せる場合も同様にAlternativeを検討する。\n- User-generated / third-party Mediaでは、提供できるAlternativeのScopeを明示し、存在しないCaption等を対応済みと扱わない。\n- Autoplay / Media performance固有のCostは[05 Performance / Reliability](05-performance-reliability.md)を正本とする。\n\n',
    'forms and media block'
  );

  write(path, text);
}

// docs/07-testing-quality.md
{
  const path = 'docs/07-testing-quality.md';
  let text = fs.readFileSync(path, 'utf8');
  const addition = `## Accessibility / Responsive / i18n Verification\n\nUser-facing UIでは、Static HTML inspectionやDesktop screenshotだけでAccessibility / Responsive / i18n完了としません。[04 UI / UX / Accessibility](04-ui-ux-accessibility.md)のBehavioral Contractに対し、変更Riskと対象Userに合うRepresentative Matrixを選びます。\n\n### Minimum\n\n通常のUser-facing UIで変更内容に関係する範囲を確認します。\n\n- Semantic element / Accessible Name / Label等の基本構造\n- Keyboardだけで主要Flowへ到達・実行・離脱できる\n- Focus-visibleとFocus orderが理解でき、sticky / overlayで完全に隠れない\n- Narrow viewport / Zoom /文字拡大で主要情報・操作が失われない\n- Error / Empty / Loading等のStateがColorやPointer hoverだけに依存しない\n\n### Conditional Matrix\n\n該当するProjectでは必要に応じて追加します。\n\n- **Touch / Pointer:** Small target、Drag alternative、Hover-only content、誤Tap risk\n- **Dialog / Composite Widget:** Focus entry / trap / escape / restore、Keyboard interaction\n- **Responsive:** Portrait / Landscape、低いViewport height、software keyboard、content expansion\n- **Forms:** Label、Instructions、Autofill、Validation error association、入力保持、Error recovery\n- **i18n / l10n:** 日本語 / 英語等の実Content、長い翻訳、Date / Number / Currency format、Language metadata、必要ならRTL / Script差\n- **Motion / Media:** Reduced Motion、Pause / Stop、Caption / Transcript等、Project Scope内のAlternative\n- **Assistive Technology:** 対象User / Risk上必要ならScreen Reader、Voice input、Switch等の代表環境\n\n### MUST: 未確認の組み合わせを対応済みと扱わない\n\n全Browser × 全Assistive Technology × 全Localeを機械的にTestする必要はありません。ただし、対象Projectで重要な組み合わせを決め、未確認条件をVerification Stateへ反映します。Automated accessibility scannerだけでTask completion、Focus behavior、Error recovery、実際のReading order等をPass扱いにしません。\n\nRegression価値が高い場合は、axe等の自動check、Keyboard E2E、Screenshot / reflow check、locale fixture等をGuardとして追加できます。Tool固有ScoreをAccessibility完成条件そのものにはしません。\n\n`;

  text = insertBefore(
    text,
    '## Specification / Oracle Test\n',
    addition,
    '## Accessibility / Responsive / i18n Verification',
    'accessibility verification section'
  );
  write(path, text);
}

// templates/QUALITY_CHECKLIST.md
{
  const path = 'templates/QUALITY_CHECKLIST.md';
  let text = fs.readFileSync(path, 'utf8');
  const addition = `- [ ] Keyboardだけで主要Taskへ到達・実行・離脱でき、Focus trap /不自然なFocus order / Focus restore漏れがない\n- [ ] Hover / Drag / Touch gesture / Shortcutだけに主要操作や重要情報を依存させていない\n- [ ] Zoom /文字拡大 /狭い幅 /低いViewport height / Orientation変更でPrimary Taskを失わない\n- [ ] 長いText・実際の日本語/英語等でContent expansionを確認し、固定Height / clippingで重要情報を失わない\n- [ ] 複数Locale対応時、Language metadataとDate / Number / Currency等のLocale-sensitive表示を必要範囲で確認した\n- [ ] FormでLabel / Instruction / Autofill / Error association /入力保持 / Recovery導線を必要範囲で確認した\n- [ ] Motion / Mediaがある場合、Reduced Motion、Pause / Stop、必要なCaption / Transcript等をScopeに応じて確認した\n`;
  text = insertBefore(
    text,
    '## Meaningful Visual Change\n',
    addition + '\n',
    'Focus trap /不自然なFocus order',
    'quality checklist phase 15'
  );
  write(path, text);
}

// 作業報告書.md
{
  const path = '作業報告書.md';
  let text = fs.readFileSync(path, 'utf8');
  const addition = `## 2026-09-07 Phase 14〜15 — Performance Gap Review / Accessibility Integration\n\n### 作業状況\n\nPhase 14・15で会話上確定していた内容とCurrent Ownerを再比較し、**既存Ruleを重複追加せず、Current Guideで不足していたPhase 15 Gapだけを既存Normative Ownerへ統合**した。\n\nWork branch: \`guide/phase-15-accessibility-i18n\`\n\n### Phase 14 Review\n\nPhase 14 — Performance / Reliability / Failure Recovery / Offline・Network Degradationの主要内容は、Current \`docs/05-performance-reliability.md\`、\`docs/03-data-storage.md\`、\`docs/07-testing-quality.md\`に既に実装済みだったため、Phase番号を理由に同じRuleを再追加していない。\n\n確認した既存Coverage:\n\n- Primary Task readiness / graceful degradation / partial failure\n- Network failure / timeout / retry / backoff / idempotency / late response\n- Offline capability / pending queue / reconnect / conflict boundary\n- Slow device / Main Thread / Long Task / memory / long-running session\n- Third-party / provider failure / SPOF simulation\n- Cold vs Repeat / Lab vs Field / Soft Budget / optimization stop condition\n- Failure / recovery validation\n\nPhase 14の今回の実装差分: **なし（no-op review）**。\n\n### Phase 15 Integration\n\n#### \`docs/04-ui-ux-accessibility.md\`\n\n- AccessibilityをTask Completion / Equivalent Outcome中心で扱う原則\n- Keyboard trap / Focus order / Focus restoration / Hover / Touch / Shortcut等のInput-method Independence\n- Zoom / Reflow / Orientation / low viewport height / content expansionを含むResponsive Robustness\n- Internationalization / Localization、Language metadata、Locale-sensitive format、text expansion / script boundary\n- Forms / Validation / Error Recovery / Autofill / Authentication boundary\n- Motion / Animation / Media / Reduced Motion / Pause-Stop / audio-visual alternatives\n\n#### \`docs/07-testing-quality.md\`\n\n- Accessibility / Responsive / i18nのMinimum Verification\n- Touch / Dialog / Responsive / Forms / Locale / Motion / Assistive TechnologyのConditional Matrix\n- Automated scannerだけでTask completionを完了扱いしないRule\n- 未確認のBrowser / AT / Locale組み合わせを対応済みと扱わないRule\n\n#### \`templates/QUALITY_CHECKLIST.md\`\n\n- User-facing UI sectionへPhase 15の短い実行確認を追加\n- Checklistを第二Normative Ownerにせず、詳細判断は\`docs/04\` / \`docs/07\`へ委譲\n\n### Rule Ownership / Routing\n\n- 新Owner: なし\n- 新Domain: なし\n- 新Risk Signal: なし\n- 新Stable Gate: なし\n- Machine Router変更: 不要\n\nCurrent \`UI_UX\` / \`TESTING_QUALITY\` routeで既存Ownerへ到達できるため、\`maintenance/rule-router.json\`を変更していない。\n\n### External Evidence\n\nPhase 15 IntegrationではCurrent W3C guidanceを確認した。主な確認対象:\n\n- WCAG 2.2 / WAI — Focus、Keyboard、Dragging、Target Size、Redundant Entry、Accessible Authentication、Forms / Error recovery\n- W3C Internationalization — language / script / direction / locale-sensitive date・number等\n\nSource固有の説明全文や将来変わり得る実装DetailをCommon Ruleへ複製せず、Projectへ適用可能なBehavioral Contractへ落とした。\n\n### Compatibility / Over-application防止\n\n- 単一言語Siteへ翻訳Frameworkを一律要求しない\n- 全Projectへ全Assistive Technology実機Testを要求しない\n- RTL / complex scriptをScope外Projectへ完成条件として強制しない\n- Full WCAG conformance audit / enterprise accessibility programを個人Projectへ一律要求しない\n- Existing Product RepositoryのUI Framework / Locale storage / Runtime defaultを自動変更しない\n\n### Validation状態\n\n- Phase 14 duplicate / owner comparison: **Reviewed**\n- Phase 15 owner / rule budget / single normative owner: **Reviewed**\n- Current W3C evidence: **Reviewed**\n- New Owner / Gate orphan risk: **Not applicable**\n- Machine Router update: **Not required**\n- Guide Validator / CI: **PR作成後のFinal Headで確認対象**\n\n`;

  text = insertBefore(
    text,
    '## 2026-09-07 Phase 6〜13 — Approved Guide Rule Integration\n',
    addition,
    '## 2026-09-07 Phase 14〜15 — Performance Gap Review / Accessibility Integration',
    'work report phase 14-15 section'
  );
  write(path, text);
}

console.log('Phase 15 integration applied.');
