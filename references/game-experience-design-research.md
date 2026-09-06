# Game Experience Design Research

> Status: Research in progress / non-normative
> Updated: 2026-09-06

This file intentionally remains non-normative. It records research context, evidence, working hypotheses, counterexamples, and candidate frameworks for game experience design. It must not be treated as a universal rule set or copied mechanically into every game.

## 1. Research purpose

The original research started from UI / HUD questions around Scrap Factory, but the scope expanded because a genre-specific answer was not enough. The objective is now:

> Build a framework that can derive an appropriate answer for a specific game, instead of prescribing one answer for all games.

The research therefore compares papers, systematic reviews, platform-holder guidelines, GDC / developer material, real shipped games, UI screen databases, accessibility guidance, and counterexamples across many genres.

The intended output is not a giant list of best practices. It is a compact decision framework plus optional domain lenses and a validation process.

---

## 2. Evidence-first research stance

Research should follow the repository evidence-first workflow:

```text
Question
→ prior research
→ evidence collection
→ supporting / opposing / contextual evidence
→ evidence map
→ working decision
→ prototype / playtest / measurement
→ revision
```

Evidence is decision material, not a substitute for game-specific judgment.

Do not mechanically require a fixed number of references. Broad discovery may use 100+ titles, while a normal project question may reach saturation with a much smaller set. Increase sample size when uncertainty, disagreement, novelty, or risk is high.

Evidence confidence and guide-promotion confidence are separate:

- Strong evidence does not automatically imply a universal MUST rule.
- A single developer case can be strong evidence of that game's intent but weak evidence for cross-game generalization.
- Counterexamples matter.
- A concept can remain useful as a working lens even when it should not become normative.

---

## 3. Core meta-principle

Do not fix universal answers for HUD density, camera, difficulty, progression, economy, map markers, tutorial style, recovery cost, or other game design choices.

Instead:

1. Define the game's Core Experience and Intended Player Demand.
2. Resolve the current Game State and Player Task.
3. Choose the appropriate interaction / information surface.
4. Apply only relevant design dimensions and domain lenses.
5. Account for intended friction, uncertainty, constraints, accessibility, input, and platform context.
6. Validate with actual players and telemetry where appropriate.

A framework that applies to every game must also be able to say, intentionally, “this lens is not relevant here.”

---

## 4. Game Context

Before applying any design conclusion, establish context.

Candidate fields:

- Genre / subgenre
- Core verbs
- Camera / perspective
- Primary tasks
- World importance
- Information pressure
- Action pace
- Decision pace
- Input devices
- Platform / performance envelope
- Session length
- Player expertise
- Difficulty / assistance expectations
- Pacing authority
- Service model
- Physical / embodied context
  - seated / standing
  - room-scale
  - outdoor / indoor
  - body movement
  - fatigue
  - motion comfort
  - real-world safety
- Social topology
  - solo
  - co-op
  - competitive
  - asymmetric
  - local party
  - anonymous matchmaking
  - persistent group
  - friends
  - spectators / audience

`Genre` alone is never enough context.

---

## 5. Core Experience & Intended Player Demand

The framework should start above “challenge.” Some games are not primarily about challenge.

Ask:

- What should the player do?
- What should the player think about?
- What should the player notice?
- What should the player feel?
- What should the player learn?
- What should the player express or create?
- What should the player coordinate with others?
- What should be easy?
- What should be difficult?
- What should be uncertain?
- What should feel constrained?
- What should be calm, reflective, vulnerable, stressful, playful, or expressive?

Possible player demands include:

- Skill
- Decision making
- Attention
- Exploration
- Interpretation
- Creativity
- Expression
- Social coordination
- Physical movement
- Emotional engagement
- Relaxation

This avoids over-applying “challenge” to cozy, narrative, creative, ambient, toy-like, or social experiences.

---

## 6. State → Task → Surface

Cross-game screen analysis strongly suggests that current state and task often predict the correct UI structure better than genre alone.

For each important state:

```text
Game State
→ Primary Player Task
→ Required Information / Decisions
→ Appropriate Surface
```

Candidate surfaces:

- World itself
- World-space UI
- Persistent HUD
- Temporary HUD
- Overlay
- Local / contextual panel
- Modal panel
- Full-screen menu
- Recallable reference / log
- Meta-game screen

Example state matrix:

| State | Player Task | Required Info | Decision Depth | Surface | Persistence | Input Mode | Interruption Cost |
|---|---|---|---|---|---|---|---|
| Explore | Navigate / discover | World / orientation / survival | Low | World + light HUD | Current | Movement | Very low |
| Combat | Fight | Threat / HP / resources | Fast | HUD | Current | Combat | Very low |
| Build | Place / validate | Cost / snap / I/O / validity | Medium | World + overlay | Until exit | Build | Low |
| Inspect | Diagnose | State / cause | Medium | Local panel | Contextual | Inspect | Medium |
| Inventory | Compare / manage | Items / stats | High | Full-screen | Session | Menu | High allowed |
| Management | Plan / optimize | Economy / alerts / relationships | High | Full-screen | Recallable | Menu | High allowed |

The table must be adapted per game.

---

# Part I — Core design dimensions

## 7. Dimension A — Player Agency / Constraints / Systems

Do not equate agency with maximum freedom, control, power, or number of choices.

Separate:

- Control — how much of the situation the player can directly control
- Power — how strong the player is
- Freedom — how many options exist
- Agency — whether player intent / choice can meaningfully influence outcomes

Meaningful constraints can create the experience:

- Journey restricts communication.
- Pathologic 2 restricts time and possibility of saving everyone.
- Survival games can use inventory or scarcity constraints.
- Horror can restrict information and control.
- Getting Over It uses severe progress loss as stakes.

Constraint is design material, not automatically a UX defect.

### Systems and possibility space

Feature Count ≠ Possibility Space.

Distinguish:

- Complexity — amount of rule / state understanding required
- Depth — meaningful decisions produced after rules are understood
- Breadth — number of systems / actions / content types
- Possibility Space — possible actions / states / outcomes
- Agency — ability to form goals and influence outcomes within that space

Complexity should earn its cost by generating useful decision, strategy, expression, risk, discovery, or meaning.

### Progression

Progression types include:

- Numerical
- Capability
- Efficiency
- Knowledge
- Spatial
- Collection
- Narrative
- Mastery

Capability progression is especially strong when it changes what the player can do rather than only increasing numbers.

`Progression` and `emergence` can coexist:

```text
Progression → opens rules / tools / possibility
Emergence → player chooses how to combine and use them
```

### Goal horizons

Candidate horizons:

- Long-term
- Mid-term
- Short-term
- Immediate

Also distinguish:

- Game-set goals
- Player-set goals
- Emergent goals

Sandbox / factory games may depend more on goal-generation capacity than quest count.

### Repetition, novelty, and grind

Repetition is not automatically boredom.

Potential novelty sources:

- Content
- Mechanical
- Contextual
- Combinatorial
- Strategic
- Mastery
- Informational
- Spatial
- Narrative
- Social
- Procedural
- Creative

Working definition:

> Grind = large amounts of repetition required for an external goal while meaningful decision, learning, or expression changes very little.

Keep this as a working definition, not a universal measured threshold.

---

## 8. Dimension B — Perception / Information / Presentation

The higher-level problem is Game Information Design, not only UI.

Possible channels:

- World geometry
- Lighting
- Color
- Materials
- Landmarks
- NPC gaze / body language
- Animation
- Motion / VFX
- HUD
- World-space UI
- Diegetic UI
- Menus
- Text
- Audio
- Spatial audio
- Haptics
- Camera

Working hierarchy:

```text
What information / feeling is needed?
→ which sensory / presentation channel?
→ where should it appear?
→ when?
→ with what persistence and salience?
```

Not every visual / audio / haptic element must be justified only as gameplay information. Atmosphere, emotion, identity, and feel are legitimate presentation goals.

### Attention budget

Attention is limited. Consider:

- visual salience
- movement
- onset
- flicker
- size
- text
- faces / gaze
- audio
- haptic intensity
- center-screen competition

If every element is urgent, nothing is urgent.

### Visual minimalism ≠ cognitive minimalism

Removing HUD can increase memory burden if players must remember:

- required material counts
- broken machines
- causes
- objectives
- routes

Externalize memory when memory itself is not the intended challenge.

Possible tools:

- Alert log
- Quest log
- Recipe reference
- Tracked materials
- Recent task
- History

### Split attention and information locality

Place information close to the object or decision when integration cost matters.

Candidate locality mapping:

- Object-specific → object / contextual panel
- Global state → HUD / fixed region
- Deep systemic → dedicated workspace / full-screen

World-space UI can reduce split attention when the player must understand an object and its status together, but should not be treated as universally superior.

### Persistence

Classify information by persistence:

- Ephemeral
- Temporary
- Persistent current state
- Recallable
- Historical

Important information should not disappear permanently if later recall is needed.

### Screen density

Do not use a universal occupancy percentage.

Useful evaluation dimensions can include:

- Physical occupancy
- Center interference
- Visual salience
- Motion
- Task relevance
- Gaze travel
- Visual search performance
- Subjective workload

No single composite score is currently justified as a universal metric.

---

## 9. Dimension C — Interaction / Intent Fidelity

Candidate interaction loop:

```text
1. Perceive — what can I do?
2. Predict — what will happen?
3. Act
4. Acknowledge — did the game receive it?
5. Outcome — what changed?
6. Understand — why?
7. Recover / continue
```

### Intent Fidelity

Working definition:

> The game recognizes what the player is trying to do, accepts it with appropriate timing, connects it to an expected result, and clearly communicates what changed.

Literal input fidelity is not always the goal.

Potential forgiveness:

- Input buffer
- Coyote time
- Corner correction
- Snap / target assistance

Separate Intent Forgiveness from Dynamic Difficulty Adjustment.

### Feedback

Consider feedback before / during / after actions:

- Before → signifier / constraint / prediction
- During → input accepted / progress
- After → outcome / new state

Explain inaction when useful:

- Missing resource
- Cooldown
- Wrong mode
- Too far
- Locked
- Invalid target

### Mode visibility

When inputs change meaning by state or mode, keep the active mode understandable and exits predictable.

Examples:

- Normal
- Build
- Dismantle
- Scanner
- Placement
- Combat

### Responsiveness vs weight

Do not buy “weight” only with delayed response.

Weight can come from:

- momentum
- acceleration
- animation follow-through
- audio
- recoil
- camera
- haptics
- environment reaction

A delayed outcome can be valid while acknowledgement remains immediate.

---

## 10. Dimension D — Learnability / Access

Tutorials are only one part of a learning architecture.

Candidate learning chain:

```text
Encounter
→ Understand
→ Demonstrate / infer
→ Practice
→ Feedback
→ Independent use
→ Transfer
→ Combine
→ Recall
→ Mastery
```

### Learning modes

Do not equate learnability with explanation.

Possible modes:

- Explicit instruction
- Demonstration
- Guided discovery
- Systemic experimentation
- Social learning
- Reference learning

The Witness-like discovery-driven learning is a valid design when the player can infer the system reliably enough.

### Complexity staging

Complex games need not be simplified. Stage complexity.

Example:

```text
Machine visible
→ Running / stopped

Approach
→ Recipe / inspect

Inspect
→ Inputs / outputs / power / efficiency

Diagnostics
→ history / forecast / expert data
```

### Prior knowledge and expertise

Do not treat the player as globally beginner or expert.

Per-mechanic expertise can differ:

```text
Movement → expert
Aim → expert
Inventory → intermediate
Factory → beginner
```

Guidance may need to fade as competence rises, but do not auto-hide based only on a shallow success count.

### Accessibility: barrier vs intended challenge

Ask:

```text
What capability does this mechanic require?
→ Is that requirement part of the intended experience?
→ Or is it an incidental barrier?
```

Potential barriers include:

- Perception
- Input
- Timing
- Memory
- Cognition
- Communication
- Motion comfort

Possible assistance layers:

1. Presentation alternative
2. Input translation
3. Execution assistance
4. Decision assistance
5. Automation / bypass

Use presets as entry points when settings become complex, with granular controls when needed.

Accessibility use should not automatically be treated as cheating. Competitive externality must be evaluated separately.

---

## 11. Dimension E — Continuity / Temporal Experience

Game experience unfolds over time:

```text
Moment
→ Activity
→ Session
→ Progression
→ Full experience
```

### Pacing dimensions

Possible pacing axes:

- Action tempo
- Threat
- Tension
- Cognitive load
- Decision pressure
- Movement impetus
- Novelty
- Goal pressure
- Information density
- Reward frequency

Peaks often require contrast, but not every game needs the same recovery rhythm.

### Pacing authority

- Designer-heavy
- Shared
- Player-heavy

Sandbox / factory games often benefit from respecting player-controlled pacing more than heavily authored linear experiences.

### Continuity and resumption

Menus, notifications, cutscenes, death, tutorials, and interruptions can break mental context.

On return, the player may need to reconstruct:

- what they were doing
- current mode
- current project
- current goal
- relevant cause / problem

### Returning players

A returning expert is not the same as a beginner.

Useful reconstruction may include:

- previous objective
- recent major event
- current project
- what changed since last play
- control / reference access

### Failure / recovery

Classify failure:

- Gameplay failure
- Skill / execution failure
- Understanding failure
- Interface failure
- System failure
- Temporal / performance failure when useful

Difficulty is not the same as punishment.

Recovery costs can include:

- Time
- Progress
- Resource
- Repetition
- Cognitive effort
- Navigation
- Uncertainty
- Emotional cost

Do not minimize recovery by default. Require the cost to have a purpose.

---

# Part II — Cross-cutting lenses

## 12. Lens 1 — Player / Experience Cost

Do not minimize all cost. Allocate cost intentionally.

Possible costs:

- Attention
- Cognitive
- Motor
- Time
- Recovery
- Social
- Emotional

### Experience Cost Ownership

Classify cost:

- Intended — the cost is part of the core experience
- Supporting — the cost enables another meaningful demand
- Accidental — the cost adds little or no intended value

Examples:

- Getting Over It progress loss → intended stakes
- Papers, Please document handling → meaningful labor
- Survival inventory limits → supporting prioritization
- Hidden button / unresponsive UI / unnecessary repeated memory → likely accidental

### Designed Friction Test

When a design is inconvenient, difficult, ambiguous, or costly, do not automatically remove it. Ask:

1. Is the cost intentional?
2. What experience does it create?
3. Is it necessary for the Core Experience?
4. Can the player learn its relationship to outcomes?
5. Can the same effect be achieved with a lower cost?
6. Are extreme cases bounded?
7. Is an accessibility alternative needed?
8. Does playtesting show the intended experience actually occurs?

“Intentional” is not a waiver from validation.

---

## 13. Lens 2 — Experience Contract

Replace an absolute “trust / consistency” rule with a layered contract.

Ask:

- What can the player trust?
- What can the player predict?
- What should be inferred?
- What is intentionally uncertain?
- What may intentionally deceive the player?
- What must never be unreliable?

Examples:

- Horror may make enemy position or perception unreliable.
- Eternal Darkness-style effects may temporarily undermine UI trust.
- Random systems may leave outcomes uncertain while rules remain learnable.
- Real save integrity and real-money purchase information should not be treated as playful uncertainty.

### Layered Predictability

Unpredictable outcome does not imply an unlearnable system.

A game can make:

- low-level outcomes uncertain
- high-level rules predictable

Darkest Dungeon-like uncertainty can coexist with clear system state.

### Uncertainty Contract

Useful categories:

- Must know
- Can infer
- Intentionally uncertain
- Must never be uncertain

---

## 14. Lens 3 — Adaptive Context

All design dimensions should be interpreted through context.

Potential context variables:

- Game
- State
- Task
- Genre
- Camera
- Player expertise
- Input
- Platform
- Session
- Physical environment
- Social topology
- Accessibility need
- Service model

This is the primary defense against copying a successful solution from one game into an incompatible game.

---

# Part III — Domain lenses

Activate only when the domain materially affects the Core Experience.

## 15. Camera / Spatial Orientation / Motion Comfort

Candidate responsibilities:

- Control / intent
- Readability
- Orientation
- Motion comfort

### Camera Motion Ownership

Possible levels:

- Player-controlled
- Assisted
- System-controlled
- Forced

Evaluate why the camera moves, who initiated it, predictability, override ability, and orientation impact.

### Navigation Support ≠ Spatial Learning

Treat at least two axes separately:

- Immediate Navigation Support
- Spatial Learning Support

A minimap can improve immediate route performance without necessarily improving spatial knowledge.

Determine whether spatial knowledge is actually a core skill in the target game.

### Camera / Spatial Profile

- Camera purpose
- Motion ownership
- Spatial knowledge goal
- Navigation assistance goal
- Motion comfort risk
- Platform / player context
- Validation

---

## 16. Combat Readability

Readable does not mean easy.

Candidate chain:

```text
Detect threat
→ Identify source / type
→ Interpret action
→ Locate danger
→ Understand timing
→ Respond
→ Confirm outcome
```

### Gameplay Geometry Contract

Perceived danger / projectile / hit area should support accurate enough prediction of actual gameplay geometry when that prediction is part of the intended skill.

### Gameplay Importance ≈ Presentation Salience

High-impact events usually need stronger relative salience, but avoid a fixed size / color rule.

### Intended Uncertainty

Combat can intentionally hide information in horror, stealth, Hunt-like inference, etc.

Separate readability axes from challenge axes.

### Failure Attribution Test

After failure, ask what killed the player, when it became apparent, where danger was, what counterplay existed, whether input was recognized, and why they believe they failed.

The explanation should match the intended skill unless confusion itself is intentional.

---

## 17. Audio Design

Audio also has limited perceptual / attention capacity.

Distinguish:

- Energetic masking
- Informational masking

### Audio Information Chain

```text
Detect
→ Identify
→ Locate
→ Interpret
→ Prioritize
→ Act
→ Confirm
```

### Audio Grammar

Learned audibility and meaning rules should be consistent enough to learn:

- what a cue means
- who can hear it
- ally / enemy differences
- state changes

### Priority ≠ loudness

Some games optimize for detectability over acoustic realism; others optimize for location / state inference.

### Auditory Foreground Budget — working hypothesis

Possible layers:

- Foreground — critical actionable
- Midground — useful state / context
- Background — atmosphere
- Decorative — flavor

This is a working design lens, not a validated universal four-layer model.

### Temporal Audio Budget — working hypothesis

When important sounds collide, ask whether the events need to happen simultaneously before only increasing volume or ducking.

### Intentional masking

Weather, thunder, stealth, or environment can intentionally mask audio. Use the Experience Contract to decide what must be heard versus inferred.

### Accessibility

Critical audio may need visual / haptic alternatives, separate category volumes, captions, and direction where appropriate.

---

## 18. Haptics

Haptics can serve different roles:

- Information
- Confirmation
- Feel
- Atmosphere

Do not assume haptics always improve performance. Studies show experience benefits can occur without accuracy / score improvement.

Critical information should not depend on haptics alone because haptics may be disabled, unsupported, uncomfortable, or inaccessible.

### Haptic Salience Budget — working hypothesis

Repeated high-intensity haptic events may flatten hierarchy, analogous to visual / audio salience inflation. Keep as a working hypothesis unless further evidence is needed for a specific game.

---

## 19. Input Device Design

Design actions before physical bindings.

```text
Player Intent
→ Game Action
→ Required Control Property
→ Device-native Mapping
→ Device-specific Tuning
→ Feedback
```

### Cross-device parity

Do not require identical mechanics at the physical-input level.

Prefer functional / intent equivalence.

Examples:

- Mouse → pointer selection
- Controller → focus navigation + confirm
- Touch → direct tap

### Device compensation vs player assistance

Separate:

- Device compensation — deadzone, controller aim assistance, touch target enlargement
- Player assistance — stronger snap aim, auto steering, automation

### Touch

Touch is a different interaction environment:

- display and input surface are the same
- finger occlusion
- no hover
- thumb reach
- small screens
- screen-space controls

Working concept: Touch Occupancy should consider both UI and temporary finger / hand occlusion.

### Remapping

Prefer action remapping over simple physical button swapping where feasible.

Prompts, tutorials, diagrams, and glyphs should reflect active bindings.

### Input Continuity

When multiple devices are supported, switching devices should not unnecessarily break game state or require restarting interaction. Update prompts appropriately.

---

## 20. Performance / Temporal Experience

Performance is part of temporal interaction quality, not only technical cleanliness.

Separate:

- Throughput / FPS
- Frame-time consistency
- Input-to-feedback latency
- Simulation update
- Network latency / jitter / loss
- Presentation / display

### Temporal Integrity — working concept

Player action and game response should be temporally consistent enough to learn and execute the intended skill.

### Average is insufficient

Measure relevant distributions and outliers:

- Frame-time variation
- Long frames
- Hitch duration
- Worst realistic gameplay state
- Input-to-feedback latency
- Server frame time
- Network jitter / packet loss where relevant

### Per-verb response

Different actions have different temporal sensitivity:

- Aim
- Movement
- Jump
- Build placement
- Menu
- Save

Do not set one universal millisecond threshold.

### Temporal LOD — working engineering concept

Critical systems may need high update frequency while background / inactive systems can update less frequently if gameplay integrity remains intact.

### Performance Integrity

If a player fails because of a hitch / latency spike rather than the intended skill, challenge integrity is broken.

---

## 21. Economy / Resource Loop

Treat economy as a value / constraint / flow system, not only currency.

Resources can include:

- Money
- Materials
- Ammo
- HP
- Stamina
- Inventory capacity
- Workers
- Power
- Time
- Action points

### Resource Flow

At minimum consider:

- Source
- Stock
- Sink
- Conversion
- Scope / locality

Single-player finite economies do not require the same equilibrium logic as persistent player economies.

### Resource value

Working model:

```text
Scarcity
+ Utility
+ Opportunity Cost
+ Future Possibility
```

Scarcity alone does not create value.

### Scarcity types

- Quantity
- Access
- Capacity
- Time
- Conversion
- Information

### Decision-producing Scarcity — working hypothesis

Meaningful scarcity can create:

- priority
- route choice
- risk / reward
- build choice
- saving vs spending
- short-term vs long-term
- specialization

Wasteful scarcity may only increase repetitive acquisition time.

### Resource acquisition

Evaluate:

- how obtained
- repetition frequency
- variation
- decisions generated
- whether mastery / automation changes the task

### Purposeful Sink

A sink is stronger when it converts resources into player goals / capability / expression rather than merely deleting value.

### Economy progression

A strong progression pattern may change the economic problem:

```text
Scarcity
→ Efficiency
→ Automation
→ Scale
→ Optimization
```

Do not assume early-game scarcity should persist unchanged into late game.

### Economy validation

Use simulation for network-level balance and real players for experience.

Do not seek a universal optimal scarcity percentage or grind threshold.

---

## 22. Exploration / Curiosity / Navigation

Exploration is not equal to distance traveled.

Candidate curiosity loop:

```text
Notice
→ Question / Prediction
→ Decision to investigate
→ Traversal
→ Discovery
→ Meaning
→ New question
```

### Exploration goal types

- Destination
- Resource
- Knowledge
- Spatial
- System
- Collection
- Experiential

### Goal Gravity — working hypothesis

Goals can pull attention strongly enough to suppress optional exploration.

Possible high-gravity signals:

- exact marker
- route line
- urgency
- timer

Possible lower-gravity guidance:

- landmark
- approximate area
- world clue

Do not treat lower gravity as universally superior.

### Landmarks

Possible roles:

- Orientation
- Navigation
- Attraction
- Identity
- Memory

Visual salience alone does not guarantee landmark quality.

### Curiosity Contract

If the world strongly signals “something meaningful is here,” repeated empty payoffs can teach players to ignore future cues.

Cue strength and expected payoff should be calibrated, but payoff need not always be loot.

### Exploration cost

Working model:

```text
Expected discovery / strategic / curiosity value
vs
travel cost + risk + opportunity cost + uncertainty cost
```

Not a numeric formula.

### Explorable Unknown

Possible unknowns:

- Spatial
- Systemic
- Narrative
- Strategic
- Resource
- Temporal

Exploration can happen in systems and knowledge, not only physical world traversal.

---

## 23. Randomness / Procedural Generation

Randomness should be classified by role.

Possible locations:

- Situation randomness
- Sequence randomness
- Reward randomness
- Outcome randomness
- Generation randomness
- Hidden randomness

Decision timing matters:

- Randomness revealed before a decision → adaptation opportunity
- Random result after a carefully planned decision → different agency / fairness implications

### Fairness dimensions

Separate:

- Statistical fairness
- Perceived fairness
- Strategic fairness

### Randomness Envelope

Bound randomness with requirements such as:

- minimum quality
- maximum punishment
- required content
- reachability
- no softlock
- difficulty range

Procedural validity is only a minimum condition.

### Meaningful variety

More combinations ≠ more experiential variety.

Stable rules + variable situations can preserve learnability while producing replay variation.

### Randomness impact scope

A low-impact optional reward can tolerate more variance than a random event that blocks main progression or destroys hours of progress.

Consider guarantees, pity, alternatives, and recovery when impact grows.

### Testing

Use reproducible seeds where possible and validate many seeds plus actual playtests.

---

## 24. Adaptive Difficulty / Assistance

Do not group all invisible assistance together.

Separate:

- Intent Forgiveness
- Player-controlled Assistance
- Adaptive Pacing
- Dynamic Difficulty Adjustment
- Outcome Manipulation / Rubber Banding

DDA is not a universal best practice.

### Adaptation Transparency

Possible levels:

- Hidden
- Discoverable
- Disclosed
- Observable
- Player-controlled

### Learning Integrity

Adaptive systems can distort cause-effect learning if the game secretly counters player improvement.

### Success Tax — working hypothesis

If player improvement automatically increases challenge enough to erase visible progress, competence feedback may disappear.

### Adaptation Confidence

Do not strongly adapt from weak player-state evidence.

### Adaptation Envelope

Bound adaptation so it does not erase the intended experience.

### Adapt Context Before Outcome — working hypothesis

Before secretly modifying hit chance, HP, damage, or outcome, consider whether encounter timing, composition, pacing, recovery, hints, or context can achieve the design goal with less distortion of causality.

Competitive PvP requires much stricter fairness / externality analysis than private single-player assistance.

---

## 25. Multiplayer Communication / Team Information

Treat communication as shared-state / intent synchronization, not only chat features.

### Channel fit

Consider:

- Complexity
- Urgency
- Precision
- Interaction cost
- Social cost
- Accessibility
- Input / platform

### Context Compression

If the game already knows object identity, location, distance, state, etc., it can attach that context to a ping instead of making players verbalize everything.

### Communication types — working synthesis

- State
- Intent
- Request
- Proposal
- Commitment
- Acknowledgement
- Completion
- Social

### Communication cost

Includes:

- find command
- select
- interruption of current action
- send
- receiver notices
- receiver interprets

Urgent communication generally benefits from shallow interaction depth.

### Common ground / shared mental model

Communication quality should be assessed by whether team members develop enough shared understanding to coordinate, not only by message count.

### Information freshness

Team information may move through:

- Current
- Recent
- Last known
- Expired

Do not leave stale information looking current.

### Passive vs active sharing

Automatically shared information can reduce communication cost but may also remove a communication skill if sharing itself is intended gameplay.

### Communication challenge contract

Define what is:

- automatically shared
- actively communicated
- inferred
- private

### Safety

Communication UX includes:

- mute
- block
- report
- spam protection
- volume / filter settings

Non-verbal systems can still be used abusively.

---

## 26. Narrative / Dialogue / Quest Presentation

Treat narrative delivery as attention / context design as well as writing.

### Narrative criticality

Possible levels:

- Required
- Supporting
- Optional
- Secret

### Precision requirement

- Exact
- Interpretive
- Ambiguous

Environmental storytelling is strong for interpretation and discovery, but not always for exact mission-critical information.

### Narrative attention demand

Do not assume “gameplay never stops” is always best. High-importance narrative can need low gameplay competition.

### Objective vs meaning

Separate:

- What do I do?
- Why does it matter?

Both may be needed.

### Context Reconstruction

Returning players may need:

- current objective
- reason
- relevant people
- previous important event
- player choice
- unresolved question

### Narrative agency

Choice count does not equal agency.

Consider:

- whether options feel meaningfully different
- whether the player understands relevant stakes
- whether consequences occur
- whether the player can recognize causal connection
- whether that form of agency matches expectations for the game

### Narrative Choice Loop — domain lens

```text
Understand situation
→ understand choices
→ predict meaningful differences
→ choose
→ acknowledgement
→ consequence
→ causal recognition
```

Useful but not a universal model of all narrative agency.

---

## 27. Retention / Monetization

Retention itself is not inherently unethical. Distinguish voluntary motivation from pressure caused by loss.

### Voluntary Return — working concept

Desired pattern:

```text
Satisfied stop
+ safe exit
+ clear continuation
→ player later returns voluntarily
```

This is not yet a standardized KPI.

### Absence Cost

Ask what a player loses by not playing:

- nothing / recoverable opportunity
- temporary bonus
- streak
- paid-value loss
- permanent exclusive reward
- progression decay

Higher absence cost raises pressure / FOMO risk.

### Recoverable Miss

Seasonal or time-limited structure can preserve excitement while allowing later recovery through:

- rotation
- archives
- old passes
- alternative unlock
- normal loot

Seasonality and permanent loss do not have to be bundled.

### Price Legibility

Before a real-money decision, the player should be able to understand:

- real price
- what is received
- duration / expiry
- randomness / probability where applicable
- gameplay impact
- refund / cancellation context

### Problem–Solution Integrity

If monetization sells relief from friction, ask whether that friction would still exist if there were no purchase opportunity.

### Decision Symmetry

Do not make purchase entry extremely easy while intentionally hiding cancellation / refund / recovery.

### Randomized monetization

Treat paid random outcomes as higher risk than ordinary random gameplay because external money, repeat purchase, limited time, and competitive advantage can compound risk.

Do not overstate causality from correlational loot-box / problem-gambling research.

### Revenue / retention quality

Do not evaluate only:

- revenue
- session length
- retention

Also consider, where relevant:

- reason for return
- regret
- refund
- complaints
- unfinished paid value
- pressure / obligation

---

# Part IV — Cross-domain patterns

## 28. Clarity vs Mystery

Do not optimize clarity globally.

A useful split is:

```text
Action / Rule clarity
vs
Outcome / Discovery uncertainty
```

Mystery can be meaningful; confusion is usually a different failure mode.

Use the Experience Contract to decide what must be known versus inferred or hidden.

---

## 29. Challenge Integrity

Working high-level test:

> Does the player's actual reason for success / failure match the skill, decision, or experience the game intended to test?

Examples of integrity failures:

- Boss timing challenge lost to frame hitch
- Combat readability challenge lost to misleading geometry
- Strategy mastery hidden by secret DDA counter-adjustment
- Accessibility barrier mistaken for intended difficulty
- UI confusion mistaken for resource-management difficulty

---

## 30. Recognition / Recall / Discoverability

Candidate layered approach:

```text
Major current actions → contextual recognition
Related actions → local / context menu
All actions → reference / guide
Expert → shortcut / automation
```

Discoverability failure means a useful feature can functionally not exist for a player who cannot find it.

Do not solve discoverability by permanently showing every shortcut.

---

## 31. Alerts / interruption

Alert cost includes more than reading:

```text
Notice
→ understand
→ remember
→ reorient
→ resume
```

Candidate alert-success chain:

```text
Notice
→ Understand
→ Locate
→ Act
→ Confirm
```

Use priority / grouping / timing rather than making every alert louder or larger.

---

## 32. Failure, Undo, Save, Recovery

### Reversible actions

Direct action + undo / recovery can often be better than confirmation for every routine action.

### Irreversible / high consequence

Confirmation becomes more valuable, especially for real-money or destructive actions.

### Experiment safety

In building / factory / strategy games, try → observe → fix can be gameplay. Avoid accidental penalties that suppress experimentation unless the risk is itself part of the intended experience.

### Save contract

Avoid unrecoverable autosave behavior that destroys progress without intentional design justification and clear expectation.

---

# Part V — Evidence confidence map

## 33. High-confidence concepts

Current high / very-high confidence candidates:

- Context-first design
- State / Task strongly influences UI needs
- Accessibility: barrier vs intended challenge
- Critical information should not rely on a single sensory channel when alternatives are materially needed
- Tutorial effectiveness depends on complexity / familiarity / context
- Action-first input architecture
- Average FPS alone is insufficient; temporal consistency matters
- DDA is context-dependent and not a universal best practice
- Multiplayer coordination depends on communication / common ground rather than message count alone
- Real-money purchase information and consent should be clear
- Visual clutter can harm performance, including for experienced players

High confidence does not automatically mean universal MUST wording.

---

## 34. Moderate / context-dependent concepts

- Curiosity and exploration
- State-based adaptive density
- Information locality
- Challenge vector / axis decomposition
- Uncertainty Contract terminology
- Narrative agency framework
- Haptic role classification
- Economy network / structural model
- Healthy retention assessment

These are strong enough to guide project research but still require context.

---

## 35. Working hypotheses / catalog-level concepts

Useful but should not become universal rules without project-specific support:

- Goal Gravity
- Auditory Foreground Budget
- Temporal Audio Budget
- Haptic Salience Budget
- Decision-producing Scarcity
- Success Tax
- Adapt Context Before Outcome
- Temporal LOD
- Touch Occupancy Budget
- Curiosity Contract terminology

These names can remain as thinking tools in research / catalogs.

---

## 36. Intentionally unresolved / not worth universalizing

- Universal HUD occupancy percentage
- Universal optimal resource scarcity
- Universal grind threshold
- Universal input latency threshold
- Universal map-marker density
- Universal difficulty value
- Universal tutorial amount
- Universal adaptive UI behavior

These are project-specific validation problems, not missing universal constants.

---

# Part VI — Stress tests and counterexamples

## 37. 150-game structural stress test

The framework was stress-tested against 15 clusters × 10 representative games, including:

- Competitive shooters
- Action / open-world RPGs
- Factory / simulation
- Survival / crafting
- Strategy / tactics / 4X
- Roguelike / deckbuilder
- Horror / stealth
- Racing / sports
- Rhythm / VR / motion
- Puzzle / logic
- Narrative / adventure
- Social / party / co-op
- Cozy / life / low-pressure
- Mobile / live / idle
- Fighting

Main findings:

1. Framework generally survived cross-genre application.
2. “Challenge” was too narrow as the top-level term; `Intended Player Demand` is broader.
3. `Validation` belongs outside the design dimensions as a process loop.
4. Presentation includes atmosphere / emotion, not only information.
5. Physical / embodied and social context must be part of Game Context.
6. Fairness must be defined as a game-specific contract, not simple symmetry.
7. Every domain lens should have a relevance / scale gate.

---

## 38. 120+ game-screen stress test

A second stress test used large UI screen corpora across HUD, inventory, map, settings, tutorial, dialogue, and management surfaces.

Main findings:

1. `Game State → Player Task` often predicts UI structure more strongly than genre alone.
2. HUD density should vary by state / task rather than remain globally uniform.
3. Pixel occupancy alone is a weak UI-density metric.
4. Overlay vs full-screen is a task / cognitive-workspace decision, not an immersion hierarchy.
5. World-first games can legitimately use full-screen menus for deep tasks.
6. Information locality is a strong cross-screen pattern.
7. Maps and inventories must be designed around their actual decision role, not a universal layout.
8. Settings are a meaningful experience-configuration surface, especially for accessibility / input / audio / performance.
9. Tutorial surfaces can range from contextual hints to persistent reference.
10. Visual language can remain consistent while density changes by task.
11. Mobile is a distinct interaction environment, not a desktop layout shrunk down.
12. Live-service games often need a distinct meta-game state / surface.

Fixed rules rejected by this stress test include:

- HUD should always be minimal
- HUD must occupy less than a fixed percentage
- Full-screen menus are inherently less immersive / worse
- Diegetic UI is inherently superior
- Fewer map markers are always better
- Inventory should use one universal layout
- Important information should always remain visible
- Tutorials should always occur in active gameplay
- Settings should always be simple
- UI density should be globally consistent
- Mobile should reuse desktop structure by shrinking it

---

## 39. Counterexample / falsification phase

The framework was deliberately tested against games that succeed by preserving what ordinary UX advice might call friction, uncertainty, punishment, or constraint.

Representative counterexamples:

- Getting Over It — severe recovery cost / progress loss
- Papers, Please — meaningful bureaucratic interaction cost
- Pathologic 2 — scarcity, impossible optimization, sacrifice
- Journey — deliberately constrained communication
- Alien: Isolation — unpredictable threat behavior
- Eternal Darkness — intentional interface / perception deception
- Darkest Dungeon — disaster and uncertainty despite planning
- Rain World — world not centered on player fairness
- The Witness — discovery-driven learning with minimal explicit text

Main conclusion:

> “Inconvenient, difficult, ambiguous, unfair, or constrained” is not automatically a design failure. The question is what role it plays in the Core Experience, whether the player can learn the relevant relationship, whether extreme cases are appropriately bounded, and whether playtesting shows the intended experience actually occurs.

Opposite safeguard:

> “It is intentional” does not justify bad UX by itself.

---

# Part VII — Candidate compact framework

## 40. Current framework candidate

```text
GAME CONTEXT
Genre / Platform / Input / Camera
Physical Context / Social Topology
Session / Player / Expertise / Service Model

                ↓

CORE EXPERIENCE
& INTENDED PLAYER DEMAND

                ↓

STATE → TASK → SURFACE

                ↓

5 DESIGN DIMENSIONS
1. Player Agency / Constraints / Systems
2. Perception / Information / Presentation
3. Interaction / Intent Fidelity
4. Learnability / Access
5. Continuity / Temporal Experience

                ↑

3 CROSS-CUTTING LENSES
• Player / Experience Cost
• Experience Contract
• Adaptive Context

                ↓

RELEVANT DOMAIN LENSES ONLY
Combat / Camera / Audio / Haptics /
Input / Performance / Economy /
Exploration / Randomness / DDA /
Multiplayer / Narrative /
Retention / Monetization / etc.

                ↓

EVIDENCE + VALIDATION LOOP
Research → Hypothesis → Prototype → Playtest
→ Observation / Telemetry → Attribution → Revision
```

This is still a research hypothesis, not a final normative guide.

---

## 41. Relevance / Scale Gate

Do not activate every domain lens for every project.

Before using a domain lens, ask:

> Does this materially affect the Core Experience or project risk?

Examples:

- Townscaper does not need a competitive economy audit.
- VALORANT does not need a narrative-choice framework for core combat decisions.
- A tiny game should not inherit large-game operational overhead mechanically.

Depth should scale with relevance, uncertainty, project size, and risk.

---

## 42. Evidence + validation loop

Validation is outside the five dimensions because it is a process applied to all of them.

```text
Research
→ Hypothesis
→ Prototype
→ Playtest
→ Observation / Telemetry
→ Failure / Cause Attribution
→ Revision
→ Repeat
```

Useful validation targets include:

- Player behavior
- Comprehension
- Failure attribution
- Transfer / retention of learning
- Shared mental model in teams
- Response timing / performance traces
- Economy simulation + player decision behavior
- Visual search / eye tracking when justified
- Accessibility testing with relevant players
- Monetization understanding / regret / recovery where relevant

Do not replace actual validation with “the player should understand this.”

---

# Part VIII — Project research workflow candidate

## 43. Candidate game research workflow

For a new game or substantial redesign:

```text
1. Define Core Experience & Intended Player Demand
2. Define primary verbs / tasks
3. Establish Game Context
4. Select relevant domain lenses
5. Research same-domain + adjacent references
6. Build State → Task → Surface matrix
7. Map information / interaction / cost / continuity needs
8. Identify intentional constraints / uncertainty / friction
9. Define experience contract
10. Create design hypothesis
11. Prototype / vertical slice
12. Playtest / measure
13. Attribute failures to intended vs accidental causes
14. Revise
15. Save confirmed project-specific decisions to Requirements / Learnings
```

Do not mechanically require a fixed reference count.

---

## 44. Candidate Game Experience Profile

Possible project-side profile fields:

- Genre
- Camera
- Core Experience
- Intended Player Demand
- Primary verbs
- Primary tasks
- World importance
- Information pressure
- Action pace
- Decision pace
- Input / platform
- Physical context
- Social topology
- Session length
- Failure cost
- Expertise
- Visual / sensory identity
- Pacing authority
- Novelty source
- Variation source
- Difficulty / assistance axes
- Relevant domain lenses
- Experience contract
- Validation plan

Not every project needs every field.

---

# Part IX — Scrap Factory application context

## 45. Scrap Factory preliminary direction — still non-normative

This research began from Scrap Factory UI questions, so project-specific hypotheses remain recorded here, but they are not `EliteMay/game` requirements until separately confirmed there.

Working direction:

> Contextual Industrial / Adaptive Density

Possible states:

- Exploration → World-first, low density
- Factory normal → low-medium density
- Hazard / combat → survival / threat information
- Build → cost / rotation / snap / direction / I/O / invalid reason
- Machine inspect → local contextual panel
- PC / Factory Management → high-density / full-screen allowed

Items to reconsider in the game project when appropriate:

- Bottom-left control hints vs bottom-right shortcut redundancy
- Cash / revenue / pack / zone always-on necessity
- Static help vs first-use + context hint + recallable guide
- Alert grouping
- Contextual scanner / tracking / secure-case information
- Detailed stats in management surface
- Tutorial support that can fade while remaining recallable

Do not copy these hypotheses into requirements without checking the current `EliteMay/game` source of truth and actual playtest needs.

---

# Part X — Evidence index

## 46. Existing evidence categories

Keep using primary / high-authority sources where practical.

### Game UI / HUD / genre

- Using genres to customize usability evaluations of video games — https://doi.org/10.1145/1496984.1497006
- Influence of head-up displays' characteristics on user experience in video games — https://www.sciencedirect.com/science/article/pii/S1071581915001779
- HUD characteristics / action games — https://www.tandfonline.com/doi/full/10.1080/0144929X.2022.2081609
- HUD / Diegetic / Spatial displays comparison — https://www.sciencedirect.com/science/article/pii/S1875952117300435
- Interface In Game — https://interfaceingame.com/
- Game UI Database relaunch overview — https://www.gamedeveloper.com/design/game-ui-database-relaunches-with-new-features-video-support-and-over-55-000-screenshots

### Attention / perception

- Attention, Not Immersion — GDC Vault — https://gdcvault.com/play/1015464/Attention-Not-Immersion-Making-Your
- Perceiving without looking: HUDs for peripheral vision — https://www.gamedeveloper.com/design/perceiving-without-looking-designing-huds-for-peripheral-vision
- Visual clutter and action game experience — https://pubmed.ncbi.nlm.nih.gov/34717071/
- Display clutter review — https://pubmed.ncbi.nlm.nih.gov/25790571/
- Dynamic scene / FPS visual attention — https://pmc.ncbi.nlm.nih.gov/articles/PMC8566014/
- Dynamic scene saliency review — https://pmc.ncbi.nlm.nih.gov/articles/PMC6802790/

### Accessibility

- AbleGamers Accessible Player Experiences — https://accessible.games/accessible-player-experiences/
- Xbox Accessibility Guidelines — https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/
- XAG 103 sensory alternatives — https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/103
- XAG 107 input — https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/107
- XAG 108 difficulty / challenge — https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/108
- XAG 109 cognitive accessibility — https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/109
- XAG 110 haptics — https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/110
- XAG 116 time limits — https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/116
- XAG 117 motion — https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/117
- XAG 120 communication — https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/120
- Game Accessibility Guidelines — https://gameaccessibilityguidelines.com/

### Cognitive load / learning

- Cowan, Working Memory / magical number 4 reconsideration
- Multiple Resource Theory — https://pubmed.ncbi.nlm.nih.gov/18689052/
- Choice overload meta-analysis — https://ideas.repec.org/a/oup/jconrs/v37y2010i3p409-425.html
- Game tutorial A/B testing, 45,000+ players — https://grail.cs.washington.edu/projects/game-abtesting/chi2012/chi2012.pdf
- Game tutorial literature review — https://pmc.ncbi.nlm.nih.gov/articles/PMC9676530/
- Apple Game Onboarding — https://developer.apple.com/app-store/onboarding-for-games/
- Expertise reversal meta-analysis 2025 — https://doi.org/10.1016/j.learninstruc.2025.102142

### Interaction / input / feedback

- Don Norman: Signifiers, not affordances — https://jnd.org/signifiers-not-affordances/
- Apple Game Controls — https://developer.apple.com/design/human-interface-guidelines/game-controls
- Steam Input — https://partner.steamgames.com/doc/features/steam_controller/
- Reading the Player's Mind — GDC Vault
- Forgiveness Mechanics — https://www.gdcvault.com/play/1026606/Forgiveness-Mechanics-Reading-Minds-for/

### Camera / spatial / motion comfort

- John Nesky, 50 Camera Mistakes — GDC
- Xbox XAG 117 Motion — https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/117
- 2025 cybersickness meta-analysis / review material referenced in research
- Spatial navigation assistance / learning studies referenced in research notes

### Combat readability

- FromSoftware interviews / challenge readability material referenced in research
- Riot VALORANT hit-registration / clarity developer material
- Riot League VFX clarity / Ashe hitbox alignment material
- Hades Early Access combat readability updates
- Xbox XAG 103 multisensory critical cues

### Audio

- Auditory attention / cocktail-party research — https://pubmed.ncbi.nlm.nih.gov/28044012/
- Informational masking overview material referenced in research
- Overwatch GDC, Play by Sound
- VALORANT footstep / audio-priority developer articles
- Hunt: Showdown audio readability / binaural / CrySpatial developer articles
- Xbox XAG 103 / 104 / 105

### Haptics

- Gaming haptics narrative review 2025 — https://pmc.ncbi.nlm.nih.gov/articles/PMC12099099/
- CHI 2026 haptic gaming study — https://axis.korea.ac.kr/publications/2026_CHI_HapticGaming
- Stop-signal audio / haptic study — https://www.tandfonline.com/doi/full/10.1080/10447318.2023.2285624

### Economy / scarcity

- Scarcity / uncertainty serious-game experiment 2026 — https://link.springer.com/article/10.1007/s11238-026-10141-8
- Virtual-world economy / Glitch transaction research — https://www.sciencedirect.com/science/article/pii/S1875952114000330
- GEEvo economy balancing simulation — https://arxiv.org/abs/2404.18574
- Factorio developer economy / bottleneck / infinite research material
- Millennia economy developer material
- Old School RuneScape Grand Exchange Tax / Item Sink material

### Exploration / curiosity

- Curiosity and spatial exploration 2024 — https://www.nature.com/articles/s44271-024-00174-6
- CHI PLAY curiosity-driven level design patterns material
- Outer Wilds developer interviews
- Far Cry 5 curiosity / world guidance developer material
- Breath of the Wild level-design analyses / developer references

### Randomness / PCG

- XCOM 2 randomness developer discussion
- Spelunky procedural-generation developer material
- Slay the Spire randomness / adaptive reward / room-weight material
- PCG benchmark / workshop material
- Procedural-content A/B player-experience studies

### DDA

- CHI PLAY 2017 DDA — https://doi.org/10.1145/3116595.3116623
- DDA comparison 2024 — https://www.mdpi.com/2813-2084/3/2/12
- DDA goal-oriented reconsideration 2024 — https://www.sciencedirect.com/science/article/pii/S1875952124000314
- Left 4 Dead AI Director material

### Multiplayer / social

- Social gaming systematic review, 263 studies — https://doi.org/10.1016/j.chb.2023.107851
- Multiplayer teamwork / CSCW systematic review 2025
- MMOG collaboration review 2026 — https://www.mdpi.com/2073-431X/15/2/134
- Ping to Win, 84,489 players / 10,293 matches — https://www.brianckeegan.com/assets/pdf/2016_CHI_ping.pdf
- Apex smart communication developer material
- Journey social design GDC material
- Overwatch ping developer material

### Narrative / agency

- Theoretical vs perceived agency — https://rise.csit.carleton.ca/pubs/ThueBulitko_ICIDS_2010.pdf
- AIIDE perceived agency research — https://ojs.aaai.org/index.php/AIIDE/article/view/12437
- CHI 2021 narrative-focused player agency — https://pgl.jp/papers/10.1145/3411764.3445540
- CD Projekt quest-design material
- Pathologic 2 Mindmap case
- Environmental storytelling GDC

### Performance / latency

- Frame-rate variation CHI 2023 — https://web.cs.wpi.edu/~claypool/papers/frame-variation-chi-23/
- Latency switching CHI PLAY 2022
- Android Frame Pacing documentation
- Riot VALORANT 128-tick servers
- Riot Peeker's Advantage material

### Retention / monetization

- Daily Quests or Daily Pests — https://research-portal.uu.nl/en/publications/daily-quests-or-daily-pests-the-benefits-and-pitfalls-of-engageme/
- Loot-box / problem-gambling systematic reviews referenced in research
- Youth dark-pattern / chance-reward review 2026
- Dark-pattern systematic review 2025
- FTC Fortnite purchase dark-pattern enforcement material
- FTC Genshin randomized monetization complaint material
- Apple App Store Review Guidelines
- EU consumer / virtual-currency principles
- Halo Infinite non-expiring Battle Pass material
- Deep Rock Galactic season / recoverable cosmetics material

### Counterexamples / intentional friction

- Getting Over It developer interviews
- Papers, Please design interviews
- Pathologic 2 difficulty / design statements
- Journey social-design GDC
- Alien: Isolation AI / fear design GDC
- Eternal Darkness fourth-wall / interface deception analyses
- Darkest Dungeon design interviews
- Rain World ecosystem developer material
- The Witness developer interviews

---

# Part XI — Remaining open questions

## 47. What is intentionally not finalized yet

The common normative guide is still not updated from this research.

Remaining decisions before promotion:

1. Exact final names for the five design dimensions.
2. Which concepts belong in `docs/19-game-development.md` versus other owner docs / catalogs.
3. Whether `State → Task → Surface` becomes a required project artifact or an optional tool.
4. How much of the Experience Contract should become normative language.
5. Which domain lenses deserve dedicated catalog / reference files instead of a long owner doc.
6. How to keep the final normative layer compact enough to avoid turning the guide into a design textbook.
7. What validators / checklists should enforce, if any, without over-applying large-game rules to small games.

Project-specific values remain project-specific:

- HUD density
- Map-marker density
- Difficulty values
- Resource rates
- Economy tuning
- Latency targets
- Tutorial amount
- Assistance strength
- Randomness bounds

---

## 48. Research saturation status

### Broadly saturated for common-framework purposes

- Context-first design
- UI / state / attention
- Accessibility
- Learnability
- Input architecture
- Performance / temporal quality
- Camera
- Combat readability
- Audio
- DDA
- Randomness
- Multiplayer communication
- Exploration

### Sufficient, add research only when project relevance is high

- Narrative
- Haptics
- Economy
- Retention / monetization

### Project validation is more valuable than more universal research

- Economy tuning
- HUD density
- Difficulty values
- Latency targets
- Map density
- Resource rates
- exact adaptive thresholds

The next high-value step is not another broad research domain. It is to decide how to distribute this research into a compact normative framework, domain reference / catalogs, and project-side research / validation workflow without losing conditionality or creating guide bloat.
