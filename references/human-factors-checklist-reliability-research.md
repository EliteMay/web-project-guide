# Human Factors / Checklist Reliability Research

## Status

- Research phase: active
- Research date: 2026-09-07
- Baseline repository: `EliteMay/web-project-guide`
- Research method owner: `docs/20-evidence-first-research.md`
- Capture policy: `references/research-capture-policy.md`
- This file is **non-normative research evidence**. It intentionally records mechanisms broadly before applicability, cost, current tool support, or adoption decisions are filtered.

## Research Question

How do aviation, healthcare, nuclear, and human-factors research reduce omission, rote box-ticking, checklist fatigue, interruption-related failure, incomplete checklist execution, and false confidence in double-checking?

The immediate project relevance is the class of failure where a rule or checklist exists but the human or AI still fails to apply it completely or mistakes partial use for completion.

---

# 1. A checklist is a cognitive aid, not proof that a task was completed

## Evidence / observed practice

WHO's Surgical Safety Checklist is a deliberately short 19-item checklist used at three critical pause points around surgery. The whole team is expected to stop at those points and participate.

WHO explicitly distinguishes the existence of a checklist from reliable execution. Its FAQ says that even advanced teams often already perform most of the listed actions, but do not perform all of them consistently on every case. WHO also states that reductions in harm are stronger when the checklist is completed fully than when it is only partially completed.

A 2025 systematic review/meta-analysis of 13 observational studies covering 17,867 participants reported overall WHO checklist compliance around 73%, while overall completeness was only around 51%. Reported barriers included workload, insufficient staffing, weak ownership, resistance to change, weak audit systems, and staff turnover. Facilitators included training, management support, positive work environment, monitoring, and feedback.

Sources:

- WHO Surgical Safety Checklist resources
  - https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery/tool-and-resources
- WHO Safe Surgery FAQ
  - https://www.who.int/news-room/questions-and-answers/item/safe-surgery-saves-lives-frequently-asked-questions
- 2025 systematic review/meta-analysis, `Beyond compliance: examining the completeness and determinants of WHO surgical safety checklist`
  - https://pubmed.ncbi.nlm.nih.gov/40186199/

## Knowledge captured

The presence of a checklist cannot be used as evidence that the checklist was used, and a top-level compliance signal cannot be assumed to mean every required item was completed.

This suggests at least three distinct states are possible in any checklist-based system:

1. checklist exists,
2. checklist was invoked,
3. checklist was completed item-by-item with adequate evidence.

A system that records only `checklist: passed` can hide partial execution.

**Adoption status:** not decided.

---

# 2. Checklists work best at explicit pause points / gates

## Evidence / observed practice

WHO structures the Surgical Safety Checklist around three clearly defined operational phases:

- before anesthesia,
- before incision,
- before leaving the operating room.

A checklist coordinator is responsible for leading the process, and WHO guidance says the team should not progress to the next phase until the relevant items are satisfactorily addressed.

This is materially different from placing a long checklist in documentation and expecting users to remember when to consult it.

Sources:

- WHO Safe Surgery FAQ
  - https://www.who.int/news-room/questions-and-answers/item/safe-surgery-saves-lives-frequently-asked-questions
- WHO Surgical Safety Checklist resources
  - https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery/tool-and-resources

## Knowledge captured

A reliable checklist system usually needs a **trigger** and a **pause point**, not merely checklist content.

Human-factors implication:

```text
Critical transition
→ force/prompt checklist invocation
→ resolve critical items
→ only then continue
```

The point in the workflow where the checklist is used may be as important as the wording of the checklist.

**Adoption status:** not decided.

---

# 3. Long checklists create their own omission risk

## Evidence / observed practice

NASA flight-deck checklist research by Degani and Wiener examined checklist length, format, sequencing, interruptions, and human limitations. The report's design guidance includes splitting long checklists into smaller meaningful chunks and placing highly critical items near the beginning to improve the chance they are completed before an interruption occurs.

Later NASA aviation checklist-design work similarly emphasizes checklist length, workload, layout, readability, typography, display limits, and the workload imposed by the operational context in which a checklist is used.

WHO makes the same warning from healthcare practice: local additions are allowed, but organizations should avoid making the checklist too comprehensive because each additional item makes successful implementation harder.

The 2017 article `More Than a Tick Box` explicitly discusses checklist fatigue and rejection caused by poor design, duplication, poor workflow integration, inadequate training, and cultural barriers.

Sources:

- NASA Contractor Report 177549, `Human factors of flight-deck checklists: The normal checklist`
  - https://ntrs.nasa.gov/citations/19910017830
  - FAA-hosted copy: https://www.faa.gov/sites/faa.gov/files/2022-11/NASA%20Ames%20Rpt%20CR%20177549%20.pdf
- NASA, `Design Guidance for Emergency and Abnormal Checklists in Aviation`
  - https://humanfactors.arc.nasa.gov/publications/Burian_EAChecklist_Design.pdf
- WHO Safe Surgery FAQ
  - https://www.who.int/news-room/questions-and-answers/item/safe-surgery-saves-lives-frequently-asked-questions
- `More Than a Tick Box: Medical Checklist Development, Design, and Use`
  - https://pubmed.ncbi.nlm.nih.gov/28763359/

## Knowledge captured

Checklist completeness and checklist usability trade off against each other. Adding every conceivable rule to one human-facing list may increase nominal coverage while reducing actual execution fidelity.

Useful design concepts observed:

- short as practical,
- split long lists into coherent chunks,
- highlight truly critical items,
- order items to match the real work sequence,
- minimize duplication,
- account for workload and interruption exposure,
- preserve visual readability,
- avoid mixing unrelated tasks into one list.

This argues against treating one giant exhaustive checklist as the sole zero-miss mechanism.

**Adoption status:** strong research candidate, not accepted.

---

# 4. Checklist sequence should match how work is actually performed

## Evidence / observed practice

NASA checklist guidance recommends logical sequencing that follows the organization and flow of the cockpit and coordinates with external activities. Later human-factors work emphasizes matching checklist design to the actual operational setting, team structure, task flow, and display/interface.

Healthcare checklist research reaches a similar conclusion. A qualitative study drawing on six high-reliability organizations found that acceptance and compliance depended strongly on short, self-developed, operationally suitable checklists and end-user ownership. A realist synthesis of surgical checklist implementation found better fidelity and sustainability when the checklist was integrated into routine workflow and tailored prospectively to context.

Sources:

- NASA CR-177549
- `Implementation of checklists in health care; learning from high-reliability organisations`
  - https://pubmed.ncbi.nlm.nih.gov/21967747/
- `Implementation of safety checklists in surgery: a realist synthesis of evidence`
  - https://pubmed.ncbi.nlm.nih.gov/26415946/

## Knowledge captured

A logically correct checklist can still fail if it fights the user's natural task sequence.

For a software-development guide, checklist order may need to follow real transitions such as:

```text
understand task
→ determine applicability
→ implement
→ verify
→ publish/deploy
→ document completion
```

rather than simply following documentation chapter numbers.

**Adoption status:** not decided.

---

# 5. Interruptions must be treated as a normal failure mode

## Evidence / observed practice

NASA checklist research explicitly analyzes interruption and distraction. Design guidance places critical items earlier partly because the probability of interruption grows with checklist duration. Aviation checklist guidance also treats recovery from interruption as something to design for rather than as user carelessness.

NASA's later observational research on airline checklist usage documented real checklist deviations. Examples included pilots responding to challenge items without actually visually verifying the item, responding before inspection, or giving a correct verbal response when the physical state was wrong.

Source:

- NASA CR-177549
- NASA technical memorandum containing observed checklist deviations and flow/checklist behavior
  - https://ntrs.nasa.gov/api/citations/20110011145/downloads/20110011145.pdf?attachment=true

## Knowledge captured

Two human-factors problems are distinct:

1. **interruption loss** — execution stops and resumes at the wrong point or never resumes;
2. **confirmation without observation** — the operator produces the expected answer without actually checking reality.

For AI-assisted development, analogues could include:

- conversation context switches,
- tool errors,
- partial file retrieval,
- a new user instruction arriving mid-check,
- assuming a prior test result still applies,
- saying a rule was checked because its expected answer is obvious rather than inspecting current repository evidence.

A reliable checklist system may therefore need resume/restart semantics and evidence-backed confirmation, not only checkboxes.

**Adoption status:** not decided.

---

# 6. `Read-Do` and `Do-Confirm` are different checklist modes

## Evidence / observed practice

Aviation and checklist literature commonly distinguishes two modes:

- **Read-Do:** read an item, then perform it before moving to the next item.
- **Do-Confirm:** perform a familiar flow/task from training or normal practice, then use the checklist as a redundant verification step.

NASA airline-observation material shows that confusing a flow/check procedure with a read-do procedure can itself create omissions. In the observed workflow, some actions existed only in the flow and not in the final checklist; skipping the flow and treating the checklist as a complete read-do procedure meant those actions disappeared.

Sources:

- NASA TM observational research
  - https://ntrs.nasa.gov/api/citations/20110011145/downloads/20110011145.pdf?attachment=true
- Background checklist literature referenced in human-factors work

## Knowledge captured

A checklist has to state what role it plays.

Possible software-development analogues:

- `Read-Do`: migration procedure, release procedure, irreversible data operation, incident recovery.
- `Do-Confirm`: final completion audit after normal implementation work.

If a `Do-Confirm` checklist is mistakenly treated as the complete procedure, non-checklist work can be omitted. If a `Read-Do` procedure is treated as a loose reminder, sequencing guarantees disappear.

**Adoption status:** not decided.

---

# 7. End users should participate in checklist/procedure design

## Evidence / observed practice

IAEA guidance on processes and procedures states that proceduralization should incorporate past experience and participation from end users and human-factors specialists. It recommends ensuring that workers who will use a procedure participate in its development, design, and modification.

WHO checklist implementation guidance similarly emphasizes early staff engagement, multidisciplinary involvement, local champions, coaching, ongoing feedback, and local adaptation.

High-reliability organization research likewise identifies end users at the operational `sharp end` as key stakeholders in checklist development and implementation.

Sources:

- IAEA, `Integrated Life Cycle Risk Management for New Nuclear Power Plants`, section 3.2.4.1
  - https://www-pub.iaea.org/MTCD/Publications/PDF/P2047_web.pdf
- WHO Implementation Manual
  - https://www.who.int/publications/i/item/9789241598590
- HRO checklist implementation study
  - https://pubmed.ncbi.nlm.nih.gov/21967747/

## Knowledge captured

A checklist written only from policy-owner perspective can be formally complete but operationally poor.

The people or agents who actually execute the process may expose:

- ambiguous wording,
- duplicated checks,
- missing pause points,
- impossible sequencing,
- hidden prerequisites,
- excessive context switching,
- recurring interruptions,
- actions that cannot be objectively confirmed.

**Adoption status:** not decided.

---

# 8. Local adaptation is allowed, but deleting difficult items is dangerous

## Evidence / observed practice

WHO explicitly encourages local modification of the Surgical Safety Checklist because one universal implementation cannot perfectly fit every institution. However, WHO warns against removing items simply because they are difficult to complete. The preferred response is to solve the underlying implementation problem where possible.

WHO also warns against uncontrolled expansion of the checklist.

Sources:

- WHO Safe Surgery FAQ
  - https://www.who.int/news-room/questions-and-answers/item/safe-surgery-saves-lives-frequently-asked-questions

## Knowledge captured

There are two symmetric checklist failure modes:

```text
hard item
→ delete it
→ nominal usability improves, coverage silently drops
```

and

```text
new concern
→ append another item
→ checklist expands indefinitely
→ execution fidelity drops
```

Tailoring therefore needs explicit rationale and review, not ad-hoc deletion or endless growth.

This strongly resembles NASA/NIST/ISO findings around explicit N/A and tailoring.

**Adoption status:** not decided.

---

# 9. Training, simulation, coaching, and feedback are part of checklist reliability

## Evidence / observed practice

WHO implementation guidance lists education, training, multidisciplinary involvement, coaching, leadership support, ongoing feedback, and local adaptation as important implementation factors.

HRO research reports simulation as a valuable method for checklist training, revision, and validation.

The 2021 systematic review of interventions to improve WHO checklist compliance found beneficial approaches including changes to checklist delivery, local integration/tailoring, clinician awareness and engagement, and policy/management interventions.

Sources:

- WHO Implementation Manual
- `Implementation of checklists in health care; learning from high-reliability organisations`
  - https://pubmed.ncbi.nlm.nih.gov/21967747/
- 2021 systematic review of WHO checklist implementation interventions
  - https://pubmed.ncbi.nlm.nih.gov/34314014/

## Knowledge captured

Publishing a checklist is not implementation.

Potential implementation lifecycle:

```text
design
→ simulate/pilot
→ observe real use
→ measure skipped/ambiguous items
→ revise
→ train
→ monitor
→ feed failures back into design
```

This mirrors Policy-as-Code evaluate mode and CMMI sustainment: a new control can be technically correct yet fail behaviorally in production.

**Adoption status:** not decided.

---

# 10. Audit should measure item-level completeness, not only checklist invocation

## Evidence / observed practice

The healthcare evidence shows large differences between nominal checklist compliance and complete execution. WHO encourages collecting local compliance/outcome data. Recent reviews identify audit and timely feedback as facilitators of sustained checklist use.

Sources:

- WHO Safe Surgery FAQ
- 2024 qualitative systematic review of barriers/facilitators
  - https://pubmed.ncbi.nlm.nih.gov/37675871/
- 2025 completeness meta-analysis
  - https://pubmed.ncbi.nlm.nih.gov/40186199/

## Knowledge captured

Useful measurements may need to distinguish:

- checklist invoked,
- checklist abandoned,
- checklist partially completed,
- each item completed,
- item skipped with explicit reason,
- evidence present/absent,
- time/point of execution,
- recurring skipped items,
- recurring exceptions,
- checklist not invoked when trigger occurred.

A single boolean `passed` hides the human-factors information needed to improve the system.

**Adoption status:** not decided.

---

# 11. Checklist fatigue is a system-design failure, not merely user laziness

## Evidence / observed practice

Medical checklist literature reports checklist fatigue and rejection when checklists are poorly designed, duplicated, excessive, badly integrated into workflow, or introduced without adequate training and cultural support.

The 2024 qualitative systematic review found barriers including complacency, hierarchy, duplicated processes, weak leadership, and implementation problems.

Sources:

- `More Than a Tick Box: Medical Checklist Development, Design, and Use`
  - https://pubmed.ncbi.nlm.nih.gov/28763359/
- 2024 qualitative systematic review
  - https://pubmed.ncbi.nlm.nih.gov/37675871/

## Knowledge captured

When checklist adherence declines, the response should not automatically be `make the user try harder`.

Possible system defects include:

- too many lists,
- duplicate items,
- unclear trigger,
- poor ordering,
- low-value warnings,
- items that cannot be verified,
- constant false positives,
- excessive context switching,
- low perceived relevance,
- no visible consequence from checking,
- no feedback loop for bad items.

This aligns closely with Meta's detector-noise findings and alert-fatigue principles.

**Adoption status:** not decided.

---

# 12. Checklists should contain verifiable actions, not vague reminders

## Evidence / observed practice

Human-factors checklist research emphasizes clarity, readability, explicit actions, workload, and task fit. Diagnostic-checklist research using the SEIPS human-factors framework found that checklist designs focused directly on task structure were more often associated with error reduction than checklist designs focused primarily on generic cognitive prompts, though evidence was mixed and limited.

Sources:

- NASA aviation checklist design research
- `Checklists to reduce diagnostic error: a systematic review of the literature using a human factors framework`
  - https://pubmed.ncbi.nlm.nih.gov/35487728/

## Knowledge captured

Items like:

```text
Check documentation consistency
```

can be weak because the pass condition is ambiguous.

A stronger item tends to expose an observable state or artifact. The checklist does not need to contain every implementation detail, but the user should know what evidence allows the item to be marked complete.

**Adoption status:** not decided.

---

# 13. Double-checking / independent verification is not automatically effective

## Evidence / observed practice

A 2023 systematic review of two-person checking in high-consequence industries outside healthcare found a small evidence base and did not demonstrate superiority of two-person checking over one-person checking for error detection.

A healthcare systematic review likewise concluded that evidence for double checking of medication administration was insufficient, and many studies did not clearly distinguish genuinely independent double checking from primed/non-independent checking.

A recent nursing systematic review reports that double-checking adherence can be inconsistent and may be omitted or not actually performed independently under workload pressure.

Sources:

- `Are two-person checks more effective than one-person checks for safety critical tasks in high-consequence industries outside of healthcare? A systematic review`
  - https://doi.org/10.1016/j.apergo.2022.103906
- `Effectiveness of double checking to reduce medication administration errors: a systematic review`
  - https://pubmed.ncbi.nlm.nih.gov/31391315/
- `Nurses’ Adherence to Double-Checking`
  - https://pmc.ncbi.nlm.nih.gov/articles/PMC13084166/

## Knowledge captured

`two reviewers` is not equivalent to `two independent error-detection mechanisms`.

Failure modes include:

- second checker is primed by the first answer,
- both use the same incomplete source,
- both follow the same wrong routing logic,
- social pressure discourages disagreement,
- second check becomes ceremonial,
- responsibility diffusion makes each checker less attentive.

For this project, a second AI pass that receives the first AI's applicable-rule list may not provide much independence. Stronger independence may require deriving applicability from different inputs or a different method.

**Adoption status:** strong research candidate, not accepted.

---

# 14. Nuclear human-performance practice uses multiple different error-prevention tools

## Evidence / observed practice

IAEA material describes human-performance techniques used in nuclear work, including procedure use/adherence, questioning attitude, pre-job and post-job briefings, and related error-prevention practices. Other IAEA material on lessons learned notes widespread industry use of self-check, peer check, independent verification, concurrent verification, and procedure use.

IAEA process guidance also treats procedures as organizational knowledge: procedures should incorporate past experience, human factors, clear risk/critical-step information, end-user participation, and quality-management steps.

Sources:

- IAEA, `Integrated Life Cycle Risk Management for New Nuclear Power Plants`
  - https://www-pub.iaea.org/MTCD/Publications/PDF/P2047_web.pdf
- IAEA material on human performance / lessons learned
  - https://www-pub.iaea.org/MTCD/publications/PDF/TE-2078web.pdf

## Knowledge captured

High-reliability operations do not depend on one generic `double check`. They use distinct mechanisms with different purposes:

- self-check,
- peer check,
- independent verification,
- concurrent verification,
- pre-task briefing,
- post-task review,
- procedure adherence,
- questioning attitude.

This is another instance of heterogeneous failure barriers rather than one universal validation step.

**Adoption status:** not decided.

---

# 15. Procedures must capture organizational memory, but hidden knowledge still matters

## Evidence / observed practice

IAEA guidance says procedures can contain the organization's accumulated knowledge about performing activities efficiently and safely. It also explicitly distinguishes documented organizational knowledge from hidden knowledge held in employees' memories and warns about knowledge loss when experienced people leave.

Source:

- IAEA, `Integrated Life Cycle Risk Management for New Nuclear Power Plants`, section 3.2.4
  - https://www-pub.iaea.org/MTCD/Publications/PDF/P2047_web.pdf

## Knowledge captured

This directly supports the current research-capture decision: relying on model memory, user memory, or historical conversation context leaves critical knowledge vulnerable to loss.

However, documentation alone does not guarantee use. A mature system needs both:

```text
knowledge capture
+
reliable retrieval / invocation at the correct task point
```

**Adoption status:** consistent with current research policy; no new normative rule adopted here.

---

# 16. Checklist design itself must be tested

## Evidence / observed practice

HRO research reports simulation being used for training, revision, and validation of checklists. WHO recommends small-scale implementation and local adaptation before broad rollout. Recent implementation research similarly supports iterative stakeholder testing and periodic reuse of concise instruments instead of assuming an initial design is correct.

Sources:

- HRO checklist implementation study
  - https://pubmed.ncbi.nlm.nih.gov/21967747/
- WHO Safe Surgery FAQ
- `The implementation checklist: A pragmatic instrument for accelerating research-to-implementation cycles`
  - https://pubmed.ncbi.nlm.nih.gov/37448453/

## Knowledge captured

The checklist is itself a product requiring verification.

Potential checklist-test questions:

- do users know when to start it?
- do they understand every item consistently?
- do they skip the same item repeatedly?
- can they recover after interruption?
- does the list produce false confidence?
- are critical items visible early enough?
- does execution time cause users to bypass it?
- does it duplicate another control?
- does it detect seeded failures?

This aligns with Policy-as-Code unit testing and tool qualification research.

**Adoption status:** strong research candidate, not accepted.

---

# 17. Human-factors synthesis for the current research question

Across aviation, surgery, nuclear operations, and checklist research, the following pattern repeatedly appears:

```text
Known important steps
≠
steps reliably executed every time
```

Reliable use depends on more than content completeness.

Recurring design dimensions include:

- a clear trigger,
- an explicit pause/gate,
- short and task-focused lists,
- meaningful chunking,
- critical-item prioritization,
- sequencing that matches real work,
- resilience to interruptions,
- unambiguous completion criteria,
- distinction between procedural and confirmatory checklist modes,
- explicit ownership/coordinator,
- end-user involvement,
- local tailoring with controlled deletion/addition,
- training and simulation,
- item-level audit and feedback,
- monitoring for fatigue/ritualization,
- testing of the checklist itself,
- multiple error-prevention techniques rather than one repeated check.

No evidence reviewed supports the idea that a sufficiently long checklist by itself eliminates omission.

---

# 18. Possible implications for `web-project-guide` — NOT ADOPTED

These are hypotheses only.

1. A final checklist should not be the only applicability mechanism.
2. `Checklist invoked` and `Checklist completed` may need distinct evidence.
3. High-value checks may need explicit pause points such as pre-implementation and pre-completion rather than being buried in docs.
4. Long owner-document or quality-checklist surfaces may need chunking/routing to avoid fatigue.
5. Critical controls may need ordering by failure consequence and execution timing, not only documentation taxonomy.
6. A partial checklist should never silently report full completion.
7. A resumed/interrupted AI workflow may need explicit restart/resume behavior for critical validation.
8. Verification items may need evidence targets rather than vague `check X` wording.
9. A second review should be independently derived when independence matters; duplicating the same reasoning path may create only ceremonial redundancy.
10. Checklist performance may itself need metrics such as recurring skipped items, false positives, bypasses, exceptions, and seeded-failure detection rate.
11. New checklist designs could be tested in shadow/evaluate mode before becoming hard completion gates.
12. Repeatedly skipped or overridden items may indicate poor implementation, but may also indicate a defective or badly scoped rule; the cause must be distinguished before adding enforcement.

**Adoption status for all implications:** not decided.

---

# 19. Limitations / cautions

- Healthcare checklist outcome studies often involve complex sociotechnical interventions, so outcome improvements cannot always be attributed to the checklist alone.
- Compliance measurements vary substantially by study and setting.
- Many aviation checklist sources are historical because core checklist human-factors work was established decades ago; historic evidence should not be mistaken for current regulatory wording.
- Two-person verification has weaker empirical support than its widespread use might imply.
- Safety-critical industries have team structures, certification, training, and operational stakes very different from a personal GitHub project.
- A mechanism can still be valuable conceptually even when its organizational implementation cannot be copied directly.
- This research intentionally preserves mechanisms before later applicability filtering.

---

# 20. Open questions for later research/synthesis

- What evidence exists on checklist item count/length thresholds before adherence degrades?
- Which checklist design properties most reduce omission by AI agents rather than humans?
- How should interruption recovery be represented in machine-readable task state?
- Can a validator distinguish `not considered`, `not applicable`, `skipped`, `failed`, and `completed with evidence` reliably?
- How can independent verification be created when one AI agent performs both primary work and review?
- Can seeded-failure testing measure the actual detection rate of the guide/router/checklist stack?
- How should frequently skipped items be triaged between user/process failure, rule-design failure, and routing failure?
- Can checklist fatigue be measured from repository/CI/agent logs instead of subjective feedback?
- Which checks should be `Read-Do`, which should be `Do-Confirm`, and which should be fully automated gates?
