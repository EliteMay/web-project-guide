import fs from 'node:fs';

function read(path) {
  return fs.readFileSync(path, 'utf8');
}

function write(path, content) {
  fs.writeFileSync(path, content.endsWith('\n') ? content : content + '\n');
}

function insertBefore(path, marker, heading, block) {
  let content = read(path);
  if (content.includes(heading)) return;
  if (!content.includes(marker)) throw new Error(`Marker not found in ${path}: ${marker}`);
  content = content.replace(marker, block.trimEnd() + '\n\n' + marker);
  write(path, content);
}

const block01 = `## Product Outcome / Measurement Contract

CONDITIONAL: Productの価値や改善効果を継続的に判断する必要があるProjectでは、Analytics Toolや取得可能な数字を先に選ばず、Product GoalからUser OutcomeとObservable Signalを定義します。

\`\`\`text
Product Goal
↓
User Outcome
↓
Observable Signal
↓
必要ならMetric
↓
必要ならInstrumentation
\`\`\`

Page View、Click数、Session時間、登録者数等は用途によって有用ですが、数字が増えたこと自体をProduct改善とは扱いません。Primary Task Successへどれだけ近いSignalかを確認し、OutcomeとProxyを区別します。

重要Metricでは必要に応じて、何を数えるか、母数、期間、対象User / Session、Data Sourceを説明できるようにします。単一Metricへ最適化せず、Error、Performance、Accessibility、Privacy、Support burden等のGuardrailも変更Riskに応じて確認します。

「改善した」と判断する場合は可能ならBaseline / previous state / comparison conditionを持ち、Baselineがない絶対値や相関だけから因果を断定しません。

AnalyticsをすべてのProjectへ要求しません。小規模・個人ToolではManual observation、Direct feedback、既存Canonical Dataから導けるLocal Signal等で十分な場合があります。外部Tracking SDKを導入しないことも正常なDecisionです。

### Analytics / Instrumentation Contract

Measurementが必要な場合は、取得可能なEventを先に増やすのではなく、必要なEvidenceからEventを逆算します。

- UI位置や色に依存する\`button_click\`等より、\`search_submitted\`、\`workout_saved\`、\`lesson_completed\`等のProduct上の意味を優先する。
- Attempt / Success / Failure / Cancelを混同せず、成功Eventは実際の成功Boundaryに近い場所で記録する。
- 主要Metricへ使うEventほどTrigger、Property、意味、収集しないDataを説明できるContractを持つ。
- Eventの意味を大きく変える場合は新Event / version等で時系列の意味境界を作る。
- Retry、double action、re-render、offline resend等で重要Outcomeが二重計上されないかをRiskに応じて確認する。
- User identityをAnalyticsのDefault要件にせず、Session / anonymous / authenticated userのどの粒度が必要かをMetricから決める。
- Propertyを「使うかもしれない」で増やさず、必要ならbucket / category等で十分な粒度へ落とす。
- Missing telemetryをObserved zeroと同義にしない。
- Analytics Provider / SDK失敗でPrimary Taskを壊さない。
- Product AnalyticsとDevelopment Diagnosticsを目的・Payload・Retention上で区別する。Diagnosticsは [15 Development Observability](15-development-observability.md) を正本とする。
- Analytics SDKのPerformance / Provider failureは [05](05-performance-reliability.md)、Privacy / Tracking / Consent / Retentionは [06](06-security.md)、Dependency選定は [13](13-dependencies-assets.md) を正本とする。

Raw Eventは観測Evidenceであり、Product Truthそのものではありません。例えば\`lesson_completed\`が記録されたことだけで理解成立を断定せず、定義したOutcomeとの距離を保ちます。
`;

const block20 = `## User Feedback / Qualitative Evidence

実際にProductを使ったUserからのFeedbackは、単なる感想でも自動Requirementでもなく、Context付きのQualitative Evidenceとして扱います。

\`\`\`text
Raw Feedback
↓
Context / Task / Problem
↓
Severity / Frequency / Confidence
↓
他Evidenceとの照合
↓
Underlying Need
↓
Product Decision
↓
変更後Validation
\`\`\`

### FeedbackとSolutionを分ける

Userが提案したUI変更やFeature案は、そのままUnderlying Needと同義にしません。例えば「検索ボタンを上へ」は、実際には「検索が見つけにくい」というProblem Evidenceかもしれません。

ただしUserがCurrent Product Requirementとして明示的に決定した内容は、Research Feedbackではなく [01 Requirements](01-requirements.md) のCurrent Contractとして扱います。

可能ならFeedbackにはTask、Page / Flow、Audience / expertise、Device / input、Expected / Actual、停止点、Workaround等のContextを残します。VerbatimとAgent / DeveloperのInterpretationを分け、User自身の表現をAI解釈へ書き換えてOriginal Evidence扱いしません。

PriorityはFrequencyだけで決めず、Severity、Task importance、Recoverability、User segment、Confidence等を必要に応じて合わせます。少数でもData loss、Accessibility blocker等の重大Findingは単純な件数で無視しません。

Support / SNS / Communityの声は母集団全体を必ず代表するとは限りません。Heavy user、Beginner、Expert、Mobile、Accessibility needs、Locale等のSampling biasを考慮し、必要なら別Segmentでも確認します。

Negative Feedbackだけでなく、何が分かりやすかったか、どのFlowが自然だったか等のPositive Feedbackも、壊してはいけないContractやSuccess PatternのEvidenceとして利用できます。

似たFeedbackはUnderlying Problem単位でClusterできますが、同じUserからの重複Reportを独立User数へ水増ししません。繰り返し発生していること自体はPersistence / Severity Evidenceになり得ます。

全ProjectへNPS、CSAT、Popup survey、Feedback widget等を要求しません。Surveyを使う場合はSolutionを前提にした誘導質問を避け、必要に応じて自由記述を併用します。Feedback収集時のPersonal Data / Replay / Trackingは [06 Security](06-security.md) のPrivacy Contractを維持します。

重要Feedbackは\`Received → Understand → Decide → Implement / Reject / Defer → Validate\`へ進めます。すべてを実装することをUser-centricとは扱わず、Reject / DeferもProduct Goal、Trade-off、Evidenceに基づく正常なDecisionです。

## Experimentation / A-B Test / Causal Comparison

Experimentは高度な開発の証明ではなく、**不確実なProduct Decisionについて比較可能なEvidenceを得る手段**です。明確なBug、Security fix、Data-loss prevention、Accessibility最低基準等へA/B Testを機械的に要求しません。

\`\`\`text
Uncertain Decision
↓
Hypothesis
↓
Primary Outcome / Guardrail
↓
Comparison Design
↓
Measurement
↓
Interpretation
↓
Keep / Revise / Reject
\`\`\`

結果を見る前にHypothesis、Primary Outcome、主要Guardrailを可能な範囲で決め、結果後に都合の良いMetricだけを選ぶことを避けます。

Control / baselineを持てる場合は使い、Before / Afterしかない場合は時期、Traffic、User mix、Seasonality、Content変更等のConfounderが残るためCausal Confidenceを下げます。

A/B Testでは必要に応じて次を確認します。

- Assignment unitをUser / Session / Workspace等からOutcomeとinterferenceに合わせて選ぶ。
- 同じ主体が不必要にVariant間を揺れないようにする。
- 比較したい要因以外を可能な範囲で揃え、複数変更を混ぜる場合は何を比較しているか明示する。
- Sampleが小さい場合に派手な倍率や因果を強く断定しない。
- Statistical SignificanceとPractical Significanceを分ける。
- 途中結果を都合の良い瞬間だけ採用しない。重要Experimentではminimum observation / sample / stop conditionを必要に応じて事前に決める。
- Seasonality / novelty / learning effectを必要範囲で考慮する。
- 後付けSegment探索は探索的Evidenceとして扱い、無限なSubgroup slicingで偶然差をProduct Truthにしない。
- 両VariantともSecurity / Accessibility / Privacy / Data safety等のCommon minimum qualityを満たす。
- Variant間でInstrumentation品質が同等か確認し、Tracking failureをProduct effectと誤認しない。

Feature FlagはRollout / Kill switch / Internal testing等のControl mechanismであり、Experimentそのものではありません。\`5% → 25% → 100%\`等のStaged RolloutもRandomized Comparisonがなければ自動的にCausal Experimentとは扱いません。

Experiment終了後はDecisionを残し、不要Variant、temporary event、obsolete flag等をCleanupします。Trafficが少なくA/B Testに向かないProjectではPrototype comparison、User test、Task observation、Direct feedback等へ切り替えられます。
`;

const block09 = `## Post-release Evaluation / Rollout Monitoring

CONDITIONAL: Release後のProduct Outcomeが重要で、変更の影響をPre-release Testだけでは十分に判断できない場合は、Deploy成功の確認に加えてPost-release Evaluationを行います。

\`\`\`text
Implement
↓
Pre-release Validation
↓
Release / Rollout
↓
Early Technical Health
↓
Product Outcome Review
↓
Keep / Adjust / Rollback / Forward-fix
↓
Temporary instrumentation cleanup
\`\`\`

Typo、明確な局所Bug、微小Visual修正等へ毎回観測期間を要求しません。Major Navigation / Search / Onboarding / Auth / Data migration / large UI / provider switch / staged rollout / experiment winner採用等では必要性を検討します。

### Technical HealthとProduct Outcomeを分ける

Release直後はError、Crash、API / Save failure、broken route、Performance、Data integrity等のTechnical Healthを確認します。その後必要に応じてTask success、Findability、Completion、Adoption、User feedback、Guardrail等からProduct Outcomeを確認します。

\`Deploy success\`、\`100% rollout\`、\`Errorなし\`はProduct Successそのものではありません。

重要変更ではRelease前に、Expected Improvement、Primary Signal、Guardrails、Early Failure Signal、Decision optionsを短く決められます。

Staged Rolloutを使う場合は次へ進む条件だけでなく、Error急増、Data corruption、Auth failure、重大Performance regression等の停止条件もRiskに応じて考えます。固定ThresholdはCommon Ruleにしません。

Rollback可能という理由だけで即Rollbackせず、Data migration、External State、old-version compatibility、Issue severity、Forward-fix speedを [09 Rollback / Recovery](#rollback--recovery) のCurrent Contractで評価します。Technical BugでなくてもProduct regressionが明確ならPrevious design、Partial revert、Revised design等を選べます。

Usage / AdoptionだけでValueを決めません。低頻度でもRecovery、Backup、Accessibility、安全Control等は重要な場合があります。Low adoptionも不要とは限らず、Discoverability不足、対象Userの少なさ、発生条件の少なさ等を分けます。

Post-release Monitoringは永久運用にせず、\`Release → Initial monitoring → Outcome review → Decision → Normal maintenance\`へ戻します。Temporary dashboard、extra logging、experiment property、temporary flag等はDecision後に恒久価値がなければCleanupします。

Evidence不足で\`改善か悪化か判断不能\`となることも正常な結果です。無理にSuccessを断定せず、Longer observation、Qualitative feedback、User test等へ切り替えます。

観測値が少し動くたびにRequirementsを変更せず、Product GoalやCurrent Behavior Contract自体を変えるDecisionが確定した場合だけ [01 Requirements](01-requirements.md) へ戻します。
`;

const block07 = `## Measurement / Analytics / Experimentation Verification

MeasurementやExperimentationがProject Scopeにある場合は、Analytics SDKやDashboardの存在ではなく、**そのDataを信頼してProduct Decisionへ使えるか**を検証します。[01 Requirements](01-requirements.md) のOutcome / Instrumentation Contract、[20 Evidence-first Research](20-evidence-first-research.md) のFeedback / Experimentation Contract、[09 Version / Maintenance](09-maintenance.md) のPost-release Evaluationに対しRisk-basedに確認します。

### Instrumentation Correctness

重要Eventでは必要に応じて次を確認します。

- Event名と実際のTriggerが一致する。
- Attempt / Success / Failure / Cancelを混同しない。
- Double action、Retry、Reload、re-render、offline resend等で重要Outcomeが不自然に二重計上されない。
- Slow network、offline / reconnect、navigation等で必要Eventが欠落する条件を把握する。
- Analytics provider / endpoint失敗でもPrimary Taskが成立する。
- 主要PropertyのType / allowed value / versionがContractと一致する。
- Password、Token、Cookie、Authorization Header、不要なUser入力本文等がPayloadへ混入していない。
- Event semantics変更時に旧Dataと無言で意味を混在させない。

Privacy / Trackingの詳細Ruleは [06 Security](06-security.md) を正本とします。

### Metric / Aggregation

Raw Eventが正しくてもAggregationが壊れる可能性があります。重要Metricでは必要に応じてNumerator、Denominator、Eligibility、Exclusion、Period等を代表Sampleで確認します。

Missing telemetryをObserved zeroへ自動変換せず、Provider outageやMeasurement gapがある場合はConfidenceへ反映します。Dashboard表示だけをOracleにせず、代表的なProduct state / raw event / aggregate resultを照合できます。

### Experiment Integrity

A/B Test等では必要に応じて次を確認します。

- Assignment / eligibilityが意図どおり。
- 必要な範囲で同じ主体が同Variantに留まる。
- Control / VariantでOutcome instrumentationが同等。
- 想定比率から大きく外れるSample ratio mismatchがないか確認し、結果解釈前にAssignment / tracking failureを疑う。
- Primary Outcomeだけでなく重要Guardrailも実際に観測できる。
- Experiment外Userやstale variantが集計へ混入していない。

高度なStatistical AlertやExperiment Platformを全Projectへ要求しません。

### Feedback / Post-release

Feedback機能を実装する場合はSubmit / failure / duplicate / context / privacyを必要範囲で確認します。直接会話やGitHub Issue等で十分なら専用Infrastructureは不要です。

重要RolloutではRelease / BuildとEvaluation Dataの対応を追跡でき、事前に決めたEarly Failure Signalが実際に観測可能であることを確認します。

Experiment / rollout終了後はobsolete variant、temporary event、debug metric、dead dashboard query、不要Feature Flag等のCleanupをCompletionへ含めます。

### AutomatedとHuman Reviewを分ける

Schema、required property、duplicate trigger、assignment logic、aggregation function、sensitive property pattern等は自動化しやすい一方、Event timingとUser Outcomeの意味一致、Feedback usefulness、Causal interpretation、Post-release Decision等はHuman Reviewが必要になりやすいです。

片方だけでMeasurement全体を確認済みにしません。小規模Personal ProjectではAnalytics自体を持たずManual observation / Direct feedbackだけでも正常です。
`;

const checklist = `## Measurement / Analytics / Experimentation — 該当時

- [ ] Primary Outcome / Proxy / Guardrailを必要範囲で区別し、取得できる数字だけをSuccess Metricにしていない
- [ ] 重要EventのTrigger / Success-Failure境界 / Property semanticsが実Product behaviorと一致する
- [ ] Duplicate / Missing telemetry / Analytics provider failureがMetricやPrimary Taskを不自然に壊さない
- [ ] Analytics Payloadへ不要なSecret / Personal Data / User入力全文を含めていない
- [ ] 重要Metricの母数 / eligibility / periodを確認し、Missing DataをObserved zeroと混同していない
- [ ] Experiment時はAssignment / instrumentation parity / Guardrail / sample integrityを必要範囲で確認した
- [ ] User FeedbackをContext付きEvidenceとして扱い、提案SolutionとUnderlying Needを分けた
- [ ] 重要ReleaseではTechnical HealthとProduct Outcomeを必要範囲で分けてReviewした
- [ ] Experiment / rollout終了後にobsolete variant / temporary event /不要Feature Flag等をCleanupした
`;

const report = `## 2026-09-07 Phase 17 — Product Measurement / Feedback / Experimentation Integration

### 作業状況

Phase 17.1〜17.6で確定したProduct Outcome、Analytics Instrumentation、User Feedback、Experimentation、Post-release Evaluation、Measurement Validationを、既存Normative Ownerへ統合した。

### Integration

- \`docs/01-requirements.md\` — Product Outcome / Success Signal / Analytics Instrumentation Contract
- \`docs/20-evidence-first-research.md\` — User FeedbackをQualitative Evidenceとして扱うContract、Experiment / A-B Test / Causal Comparison
- \`docs/09-maintenance.md\` — Post-release Evaluation / staged rollout後のTechnical HealthとProduct Outcome Review
- \`docs/07-testing-quality.md\` — Instrumentation / Metric / Experiment / Post-release Measurement Verification
- \`templates/QUALITY_CHECKLIST.md\` — Phase 17の短い実行確認

### Rule Ownership / Routing

- 新Owner: なし
- 新Profile: なし
- 新Risk Signal: なし
- 新Stable Gate: なし
- Machine Router変更: 不要

Existing Requirements / Research / Maintenance / Testing routesから現在Ownerへ到達できるため、Phase番号を理由に新しいRouting Domainを追加していない。

### Over-application防止

- 小規模 / 個人ProjectへAnalytics SDK、A/B Test、Survey、Experiment Platformを一律要求しない。
- Page View / Click数 / Session時間等のVanity MetricだけでProduct Successを判定しない。
- Feature Flag / staged rolloutをCausal Experimentと同義にしない。
- Statistical SignificanceだけでPractical Valueを決めない。
- Analytics / Experimentationを理由に不要なPersonal Data収集を正当化しない。
- Release成功 / 100% rolloutだけでProduct Outcome成功と扱わない。

### Validation

Final PRではGuide Validator、Diff、temporary helper cleanup、Owner / Router整合を確認する。未確認事項が残る場合はこのSectionへ追記する。
`;

insertBefore('docs/01-requirements.md', '## Learning / Explanation Content', '## Product Outcome / Measurement Contract', block01);
insertBefore('docs/20-evidence-first-research.md', '## Evidence Map / Research Output', '## User Feedback / Qualitative Evidence', block20);
insertBefore('docs/09-maintenance.md', '## 旧実装', '## Post-release Evaluation / Rollout Monitoring', block09);
insertBefore('docs/07-testing-quality.md', '## Specification / Oracle Test', '## Measurement / Analytics / Experimentation Verification', block07);
insertBefore('templates/QUALITY_CHECKLIST.md', '## Learning', '## Measurement / Analytics / Experimentation — 該当時', checklist);
insertBefore('作業報告書.md', '## 2026-09-07 Phase 14〜15 — Performance Gap Review / Accessibility Integration', '## 2026-09-07 Phase 17 — Product Measurement / Feedback / Experimentation Integration', report);

let qc = read('templates/QUALITY_CHECKLIST.md');
const routeRow = '| Content / IA / Search / Discoverability | Content quality / Findability / Public discovery | [01](../docs/01-requirements.md) / [22](../docs/22-task-first-structure-flow-research.md) / [07](../docs/07-testing-quality.md) |';
const measurementRow = '| Measurement / Analytics / Experimentation | Outcome / Evidence / Rollout validation | [01](../docs/01-requirements.md) / [20](../docs/20-evidence-first-research.md) / [09](../docs/09-maintenance.md) / [07](../docs/07-testing-quality.md) |';
if (!qc.includes(measurementRow)) {
  if (!qc.includes(routeRow)) throw new Error('Checklist routing anchor not found');
  qc = qc.replace(routeRow, routeRow + '\n' + measurementRow);
  write('templates/QUALITY_CHECKLIST.md', qc);
}
