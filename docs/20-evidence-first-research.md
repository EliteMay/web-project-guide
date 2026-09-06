# 20 Evidence-first Research

この章は、重要なResearchable Questionについて **Question → Prior Research / Existing Knowledge → Evidence Map → Discussion → Decision → Validation** で進める一般Research WorkflowのSingle Normative Ownerです。

目的はSource件数を増やすことではありません。既に分かっていることを再発明せず、Evidenceで確定できる部分と、今回のProjectで考えるべきUnknown / Trade-offを分離します。

Topic固有のRuleは各専門Ownerを維持します。

- Requirements Workflow / User確認 → [01 要件定義](01-requirements.md)
- UI / UX / Accessibility固有Rule → [04 UI / UX / Accessibility](04-ui-ux-accessibility.md)
- Performance測定・改善 → [05 Performance / Reliability](05-performance-reliability.md)
- GuideのRule Hygiene / Common Rule Promotion運用 → [14 Continuous Improvement](14-continuous-improvement.md)
- Visual固有のReference比較 / KEEP・FIX・REMOVE / Foundation Reset → [18 Domain-first Visual Research](18-domain-first-visual-research.md)
- Game固有設計 / Actual Playtest → [19 Game Development](19-game-development.md)

この章を全作業の必読Docにはしません。単純な事実確認、小さなBug、文言修正、原因と正解が明確な局所修正へDeep Researchを機械的に要求しません。

## Core Workflow

重要なResearchable Questionは原則として次の順で扱います。

```text
Question
↓
Prior Research / Existing Knowledge
↓
Evidence Collection
↓
Evidence Map
↓
Known / Disputed / Context-dependent / Unknown
↓
Discussion Questions
↓
User + AI Discussion
↓
Decision
↓
Prototype / Implementation / Validation
↓
Keep / Revise / Reject
```

Research開始前に結論を固定しません。Userの第一案やAgentの仮説は、Preferenceでない限り検証対象として扱います。

Researchで解決できないProject固有問題は、無限に検索を続けずPrototype / Test / Playtest / User Test / Measurementへ渡します。

## Research Depth

Research強度は重要度、不確実性、利用可能Evidenceに合わせて選びます。

### Quick Research

単純な事実、仕様、Version、日付、対応有無等を必要最小限確認します。

- 一次・公式Sourceを優先
- 事実確認が済めば終了
- Source数を増やすことを目的にしない

### Standard Research

通常の比較・改善判断で使います。

- 複数の独立Sourceを確認
- 検索上位1〜2件だけで結論を作らない
- 主要なAlternative / Limitationを確認
- ProjectへのApplicabilityを確認

### Deep Research

重要かつ不確実性が高い判断で使います。

- Prior Research First
- Broad Discovery
- Original Source確認
- Supporting / Opposing Evidence
- Failure / Limitation / Bias
- Evidence Map
- Discussion Gate
- Research Review Gate
- 必要範囲のResearch Log

Userが明示していなくても、重要度と不確実性が高ければDeepへ上げられます。逆に小さな作業へDeepを機械的に適用しません。

## Research Brief / Question Definition

Deep Research前に最低限次を整理します。

- **Research Question** — 何を知ればDecisionが良くなるか
- **Project Context** — 何のProject / User / Taskか
- **Constraints** — Platform、Budget、Compatibility、User Intent等
- **Research Axes** — 比較すべき主要観点
- **Out of Scope** — 今回決定を変えない隣接Topic

Research中に元QuestionがSolution-biasedと分かった場合はReframeできます。

```text
Original Question
↓
Evidence
↓
Reframed Question
```

Reframe時は元Questionと変更理由を追跡できるようにします。Scopeを無制限に広げません。

## Prior Research First / Source Type

Researchable Questionでは、User + AIで新しい答えを考える前に、その問題について既に何が研究・検証・実装されているかを確認します。

Academic Evidenceが存在するTopicでは、可能な範囲で次を優先します。

- Systematic Review
- Meta-analysis
- Peer-reviewed Paper
- Independent Replication
- Experiment

ただし論文だけを唯一のEvidenceにしません。Questionに応じて次も使います。

- Standards / Official Documentation / 公的機関
- Conference / Specialist Talk
- Large Survey / Dataset
- Case Study / Postmortem
- Real Product / Real Game / Real Site
- Expert Discussion
- User Research
- Community / Forum / Reddit等の実利用Evidence
- Blog / Social等のHypothesis / Issue discovery

Source Typeの固定比率は設けません。Claimに合うEvidence Typeを選びます。

## Broad Discovery / 100件規模 / Research Saturation

十分な情報が存在するDeep Researchでは、**100件規模以上のSource Candidate探索をBroad Discoveryの目安**として利用できます。

100件はQuotaではありません。少数Sampleだけで判断するBiasを減らすための探索目安です。

```text
Broad Discovery
↓
Deduplicate
↓
Relevance Filter
↓
Original Evidence
↓
Deep Review
```

実際の終了条件は **Research Saturation** とします。

Saturationの目安:

- 新規検索でも既知の主張が多くなる
- 主要な立場を一通り確認した
- Supporting / Opposing Evidenceを確認した
- 主要Original Sourceへ辿れた
- Unknown部分が明確になった

100件未満でSaturationへ達すれば終了できます。100件を超えて重要な新情報が出続ける場合は継続します。Relevant Sourceが少ない場合は弱いBlog、Duplicate、無関係Sourceで件数を水増ししません。

## Research Count Transparency

Research量は可能な範囲で次を分けます。

- **Discovered** — Title / Snippet等から存在を確認
- **Reviewed** — Abstract / Page /主要内容を確認
- **Deep-read** — Method / Sample / Result / Limitation / Context等まで重点確認
- **Core Evidence** — 最終Evidence Map / Decisionへ重要なSource

Search EngineのResult総数を「調査した件数」としません。

同一Original Evidenceを紹介する複数記事は独立Evidenceとして水増ししません。Abstractしか確認できないSourceはAbstract-onlyと明示し、Full textを確認したように扱いません。

## Search Strategy / Adaptive Query

単一Query、単一検索Engine、検索上位だけへ依存しません。

必要に応じてSearch Matrixを作り、次を探索します。

- Core Topic / Synonym / Academic terminology
- Supporting Evidence / Opposing Evidence
- Comparison / Alternative / Criticism
- Limitation / Failure
- User perspective / Expert perspective
- Historic / Current

良いSourceから専門用語、著者、Reference、Cited-by等を取得しQueryを改善します。最初の言い方で見つからなかったことをEvidence不存在とは判断しません。

関連Questionが複数ある場合は、1問ごとに独立Deep ResearchせずDecision Domain単位でResearch Batchへまとめられます。

## Original Source / Claim Verification

重要なClaimは可能な限りOriginal Sourceへ遡ります。

```text
Secondary Source
↓
Original Paper / Data / Official Source
```

Decision-criticalなEvidenceでは可能な範囲で次を確認します。

- Research Question
- Method
- Sample / Dataset
- Result
- Limitation / Condition

数字を引用する場合はMetric、Baseline、Absolute / Relative difference、Sample、条件を確認します。

**Source自身のClaimとAIのInterpretationを分けます。**

## Evidence Quality

Source数の単純多数決をしません。

重要Evidenceでは必要に応じて次を評価します。

- Relevance
- Authority
- Method
- Sample / Coverage
- Independence
- Recency
- Replication
- Consistency
- Limitations
- Bias Risk
- Applicability

Evidence StrengthはStrong / Moderate / Weak-context等で整理できます。

多数の弱い二次記事が、少数の高品質なIndependent Evidenceを自動的に上回るとは扱いません。

Community / Forum等のWeak-context Sourceは、User pain、Failure case、Preference、Hypothesis discoveryには価値があります。

## Bias / Missing Evidence

Deep Researchでは必要に応じて次を意図的に確認します。

### Confirmation Bias

仮説を証明するためではなく検証するためにResearchします。Supporting Evidenceだけでなく **Opposing Evidence / Alternative / Criticism / Failure / Limitation** を探します。

### Publication / Survivorship Bias

Published Successや有名Productだけを全体と思いません。可能ならNull Result、Replication Failure、Failed Product、Reverted Design、Postmortem等も探します。

### Conflict of Interest

Sponsor、メーカー、企業Sourceを自動排除しません。自社仕様等のFactには利用できますが、自身に有利な効果・優位性ClaimはIndependent Evidenceでの確認を優先します。

### Missing / Hidden Evidence Risk

公開されにくいNegative Result等が重要そうな場合は、見えているEvidenceだけでConfidenceを過大評価しません。

## Language / Geographic / Cultural Bias

Language / Country / Culture / Regulation / Market差が今回の判断へ影響するかを評価します。

影響する場合はInternational / English Evidenceだけで終わらず、Target Region / LanguageのEvidenceも意図的に探します。固定した言語比率は設けません。

Target Region固有Evidenceが不足する場合は、その不足をApplicability / Confidenceへ反映します。

## Sampling / Real-world Examples

実Product / Game / Site等を多数見る場合、検索上位、人気、AAA、高評価、成功例だけへ偏らないようにします。

- **Core Sample** — 今回のTask / Domain / Audienceに近い例
- **Contrast Sample** — Scale、Popularity、Quality、Age、Platform、Audience、Success / Failure、Design philosophy等が異なる例

Coverageと条件差の理解を、生のExample Countより優先します。

## Applicability

Evidence StrengthとProject Applicabilityを分離します。

必要に応じて次を比較します。

- Domain / Genre
- Primary Task
- Audience / Expertise
- Platform / Input
- Usage Context
- Complexity / Scale
- Measured Outcome
- Constraints
- Region / Language

ApplicabilityはHigh / Medium / Low等で整理できます。

他DomainのEvidenceでは表面的な実装をコピーせず、Transferできる原理と今回固有にRebuildすべき部分を分けます。有名、人気、過去に成功した、みんな使っている、だけをApplicabilityの根拠にしません。

## Evidence Interpretation

Evidenceが実際に示す範囲を超えて断定しません。

最低限次を区別します。

- **Causal Evidence**
- **Correlational / Associational Evidence**
- **Suggestive Evidence**
- **Hypothesis / Interpretation**
- **AI Synthesis**

相関だけから因果を断定しません。複数SourceをAIが組み合わせたConclusionはOriginal EvidenceではなくSynthesis / Interpretationです。

### Quantitative Evidence

可能な場合はEffect Size、Absolute / Relative difference、Confidence Interval、Sample Size等を確認し、Statistical SignificanceとPractical Significanceを分けます。

### Subgroup

平均値だけで重要差を消さず、必要に応じてBeginner / Expert、Platform / Device、Accessibility needs、Casual / Heavy等を確認します。

少数UserでもSeverityが重大なAccessibility / Operability / Data-loss harm等は、単純な割合だけで無視しません。

## Replication / Consensus / Emerging Evidence

単一の派手な研究より、Independent Group / Dataset / Context等で再現されているFindingを強く扱います。

必要に応じてReplication StatusをReplicated / Partially replicated / Conflicting等で整理します。

Systematic Review / Meta-analysisもInput StudyのQuality、Publication Bias、Context等を確認し、絶対視しません。

ConsensusやMajorityを自動的な真実としません。新しい少数EvidenceでもMethodが強く、従来研究の弱点を補う場合は **Emerging / Challenging Evidence** として独立評価します。

Repeated implementationはEmpirical Replicationと同義ではなく、Conventionのコピーである可能性も確認します。

## Evidence Map / Research Output

Deep Research後はSource一覧をそのまま投げず、まずEvidence Mapへ整理します。

最低限:

- **Established / Known**
- **Disputed**
- **Context-dependent**
- **Unknown**
- **Emerging / Challenging Evidence**
- **Existing Solutions**
- **Failures / Limitations**

重要Findingには必要に応じて次を付けます。

- Evidence Strength
- Applicability
- Confidence: High / Medium / Low / Inconclusive

ConfidenceとRecommendationは同じものではありません。

Evidence Conflictがある場合は単純多数決せず、Sample、Method、User、Task、Outcome、Platform、Environment、Date等の条件差を比較します。必要ならConflict Mapを作ります。

User-facing Outputは要点中心に保ち、**今回の問題への意味**と、次にUser + AIで話すべき2〜5個程度のDiscussion Questionを明確にします。Broad Researchで見たFull Source Listを毎回表示する必要はありません。

## Discussion Gate / Requirement Classification

Deep Research後、主要Evidence・反対Evidence・Known / Disputed / Unknown・Applicability・Project差が整理されるまでは、重要問題について最初からA / B / C Solution Discussionへ飛びません。

Userが明示的にResearchを止めてDiscussionへ進みたい場合は例外です。

要件定義では次を分離します。

- **User Preference** — Userが決める。ResearchはPreferenceそのものを上書きしない
- **Researchable Question** — 既存Evidenceがあり得るためResearchを先に行う
- **Project-specific Decision** — Evidenceを参考にProject条件込みでUser + AIが決める

EstablishedかつHigh Applicabilityの知識はDiscussionの前提へ置き、理由なく毎回ゼロから再討論しません。

## Evidence → Interpretation → Project Preference → Decision

次を混同しません。

```text
Evidence
↓
Interpretation
↓
Project Preference / Constraints
↓
Discussion
↓
Decision
```

Evidence上Aが有力でもProject固有理由でBを選べます。その場合は「EvidenceはAを支持するが、Project理由XでBを選択した」のように判断根拠を追跡できるようにします。

Research Consensusを自動的にProject MUSTへ変換しません。

Decision Statusは必要に応じて次を使います。

- **Confirmed** — EvidenceとProject Fitが十分で正式Requirement化可能
- **Provisional** — 有力だがPrototype / Playtest / User Test等が必要
- **Open** — Evidence不足または未決定

## Research → Validation

ResearchだけでProject固有の正解が確定しない場合はValidationへ切り替えます。

```text
Research
↓
Discussion
↓
Decision
↓
Prototype / Implementation
↓
Validation
↓
Keep / Revise / Reject
```

今回のProjectで得た明確なValidation Evidenceが一般研究と異なる場合は、Project差・条件差を確認したうえでProject Decisionを修正できます。

## Research Status / Evidence不足

Deep Research自体の状態は必要に応じて次へ分けます。

- **Complete** — Coverage / Saturationが十分
- **Sufficient** — 理想的件数未満でもDecisionに十分
- **Limited** — Tool / Access / Evidence不足等で重要な穴が残る
- **Inconclusive** — ResearchだけではDecision困難

Tool制限、Paywall、Search Access不足をEvidence不存在と同一視しません。

Original SourceへFull Accessできない場合はAbstract、DOI、Author Page、Repository、Preprint / Conference manuscript等を探します。Secondaryしか使えない場合はEvidence Strengthを下げます。

Evidence不足自体を正しいResultとして認め、必要なら `Unknown → Hypothesis → Prototype / Test` へ進みます。

## Research Reproducibility / Log

重要なDeep Researchでは、別の人や将来のAgentが調査経路を追える程度のResearch Logを必要範囲で残します。

最低限候補:

- Research Date
- Research Question
- Main Queries
- Main Source Types / Databases
- Inclusion Criteria
- Exclusion Criteria
- Discovered Count
- Reviewed Count
- Deep-read Count
- Core Evidence Count
- Major Limitations
- Research Status

すべてのQueryやSearch Resultを完全保存することは必須にしません。何を探し、何を残し、何を除外したかを後から追えることを重視します。

## Research Review Gate

Deep Researchを完了扱いする前に、必要範囲で次を確認します。

- 主要先行研究 / Systematic Review等を取りこぼしていない
- Decision-critical ClaimをOriginal Sourceで確認した
- Opposing Evidenceを探した
- Failure / Limitation / Alternativeを確認した
- Duplicate Evidenceを水増ししていない
- Source Type / Positionが極端に偏っていない
- Success / Popularity / Publication / Survivorship Biasを確認した
- Language / Geographic差が重要なら確認した
- 相関を因果として扱っていない
- Statistical SignificanceとPractical Importanceを混同していない
- Subgroupへの重大な悪影響を平均で隠していない
- Conflict of Interestへ過度に依存していない
- Project Applicabilityを確認した
- Tool / Paywall / Access Limitationを隠していない
- 100件という数字が目的化していない
- Research Saturationへ達している
- 次にDiscussionすべきQuestionが明確

Gate結果:

- **Pass**
- **Pass with limitations**
- **More research needed**
- **Inconclusive**

## Freshness / Research Asset Reuse

過去のDeep ResearchはResearch Assetとして再利用できます。ただしFreshnessとApplicabilityを再確認します。

変化速度の目安:

- **Fast-changing** — AI、Security、Browser、Cloud、Platform、Price、Law、Hardware等
- **Medium-changing** — UI / UX実務、Game事例、Accessibility実装、Framework / Tool等
- **Slow-changing** — 認知心理の基礎、Classic HCI、数学等

古い = 弱い、新しい = 強い、と機械的に判断しません。

再利用可能:

- Source
- Evidence Summary
- Source Evaluation
- Opposing Evidence
- Search terminology / Research path

自動転用しない:

- 過去ProjectのFinal Decision
- User Preference
- Project Constraint
- Implementation Detail

近いResearch Assetがある場合は、最初から100件探索を繰り返すより **Delta Research / Gap Research** を優先できます。

## 保存場所

Common GuideはProject固有Research Resultの倉庫にしません。

Project固有Deep Researchで保存価値がある場合は、対象Projectの `docs/research/` 等を第一候補とします。

保存候補:

- Requirement / Designへ大きく影響するDeep Research
- 大きなSource Poolを扱った調査
- 将来再利用する価値が高いResearch Asset

Quick / Standardの小さな調査を毎回Research File化しません。

Project `REQUIREMENTS.md`には最終Requirementと必要なResearch Referenceを置き、Research全文を詰め込みません。

## Common Rule Promotion / Rule Strength

Project Researchや単一研究結果をすぐCommon Ruleへ昇格させません。

Common Rule Candidateでは少なくとも次を評価します。

- Evidence Strength
- Generalizability
- Counter-evidence
- Project Validation

非常に強いExternal Evidenceや重大なSecurity / Accessibility / Data-loss Risk等は、Project Validationが少なくてもCommon Default候補になり得ます。

中程度Evidenceでは複数Projectや異なるContextでのValidationを重視します。固定件数だけで昇格を判断せず、独立性とContext Diversityを見ます。

Rule StrengthはEvidence Strengthだけで決めません。

- Evidence Strength
- Applicability
- Risk / Severity
- Reversibility
- Project Variability

最終Rule Strengthは [Guide Governance](00-governance.md) の `MUST / SHOULD / CONDITIONAL / MAY` を利用します。条件依存Evidenceは無理に一般SHOULDへせず、CONDITIONALとして適用条件を明示することを優先します。

Guideへの実際の配置・Rule Hygiene・Promotion operationは [14 Continuous Improvement](14-continuous-improvement.md) を正本とします。

## Agent / Conversation Behavior

重要なResearchable Questionでは、毎回Userへ「調査してよいか」と確認せずEvidence-first Researchを開始できます。

長いResearchでは検索手順を逐次実況せず、方向を大きく変えるFinding等、Userが途中で知る価値が高いものだけ共有します。

Userが「Researchなしで意見だけ」「仮説だけ」等を明示した場合は、Evidence-backed ConclusionではなくTentative Hypothesisとして回答できます。

Research後はEvidence Map / Discussionへ進み、User Intentに関わるDecisionをResearchだけで勝手に確定しません。

## Completion Check

Evidence-first Researchを適用した重要判断では、必要強度に応じて次を説明できることを目指します。

- Research QuestionとProject Contextは何か
- Quick / Standard / Deepのどの強度を使ったか
- Prior Research / Existing Knowledgeを先に確認したか
- Discovered / Reviewed / Deep-read / Core Evidenceを混同していないか
- SupportingだけでなくOpposing Evidence / Failure / Limitationを確認したか
- Original SourceとAI Interpretationを分けたか
- Bias / Applicability / Evidence Conflictを必要範囲で確認したか
- 100件規模をQuotaではなくBroad Discovery目安として扱ったか
- Research Saturationまたは十分なDecision Evidenceへ達したか
- Evidence MapでKnown / Disputed / Context-dependent / Unknownを分けたか
- Evidence / Interpretation / Project Preference / Decisionを分離したか
- Researchで解決しない部分をPrototype / Test / Playtest等へ渡したか
- Research Status / Limitationを正直に記録したか
- Project固有Research ResultをCommon Guideへ大量保存していないか
