# AI UI Diversity Benchmark — Synthetic Task Specs v0.1

Status: **frozen pilot task specification / non-normative**

These tasks are intentionally solution-neutral. They define user goals, data / content, functional requirements, and completion criteria without prescribing sidebar, card grid, dashboard, modal, pane count, hero, or other layout solutions.

The three tasks are deliberately structurally different so that a workflow that defaults to the same composition across all projects is easier to detect.

## Shared generation contract

For all tasks:

- Primary target: desktop Web application / site.
- Representative desktop viewport: 1440 × 900.
- Also verify a narrow viewport appropriate to the product unless the run is explicitly marked desktop-only.
- Use the same content payload and asset allowance across compared conditions.
- Do not add authentication, cloud backend, payment, or other out-of-scope infrastructure unless the condition specifically needs a local simulation for the required interaction.
- Static placeholder interactions do not count as implemented if the task requires the behavior to be demonstrated.
- Do not interpret the product type as a fixed layout template.

---

# Task L — Learning / Reference Product

Benchmark ID: `L`

Working product name: **Northstar Learn**

## Product purpose

A beginner uses the product for short, repeated study sessions while also needing to look up concepts later as a reference.

The product must support both **learning progression** and **fast concept retrieval** without assuming that the same screen structure is best for both activities.

## Target user

- beginner in a technical subject;
- studies roughly 10–20 minutes per session;
- may return several times per week;
- often forgets where they stopped;
- sometimes arrives with a specific term they need to look up immediately.

## Primary outcomes

1. Resume meaningful study quickly.
2. Understand what to learn next.
3. Open and complete a lesson / unit.
4. Find a known concept quickly when using the site as a reference.
5. Understand progress without making progress statistics the product's only focus.

## Content model

The frozen pilot dataset should contain at least:

- 4 learning sections;
- 4–6 lessons per section;
- lesson title, summary, estimated duration, completion state;
- concept / glossary terms that may appear across multiple lessons;
- a small set of practice questions or checks;
- prerequisite relationships for at least several lessons;
- a current / recently viewed lesson state.

Sample sections may be generic technical topics such as fundamentals, data, networks, and security. The benchmark tests structure, not subject-matter expertise.

## Required capabilities

- discover available learning content;
- resume from a recent / in-progress item;
- inspect a lesson and its related concepts;
- mark or demonstrate lesson completion;
- expose progress in a meaningful but non-mandatory form;
- search or otherwise directly retrieve a known concept;
- distinguish learning sequence from reference lookup where useful;
- show a useful empty / first-use state if no progress exists;
- preserve enough context that moving between lesson and reference information does not feel like restarting the product.

## Key uncertainty intentionally left open

The benchmark must not pre-decide:

- guided sequence vs free exploration;
- curriculum-first vs search-first entry;
- whether learning and reference views share one structure or use distinct contexts;
- how much progress information is persistent;
- list / tree / workspace / collection / other representation;
- navigation placement or component style.

## Completion checks

A valid artifact must allow an evaluator to:

1. identify a sensible next study action;
2. open a lesson;
3. complete or mark the lesson state;
4. return and observe that the state changed;
5. retrieve a named concept from elsewhere in the product;
6. understand the relationship between that concept and at least one lesson;
7. distinguish completed, available, and not-yet-relevant / prerequisite content where applicable.

## Primary benchmark tension

**Guidance vs retrieval freedom.**

A generic dashboard can display all required information, but it should not automatically be assumed to be the best information / task structure.

---

# Task W — Dense Data Workspace

Benchmark ID: `W`

Working product name: **TraceGrid**

## Product purpose

A desktop user repeatedly searches, filters, compares, and updates a large collection of operational records.

The product should support high-frequency work without turning every record into a disconnected card or forcing users to repeatedly lose filter / selection context.

## Target user

- returning / experienced user;
- desktop keyboard + mouse primary;
- repeated use during a work session;
- values speed, information density, and context preservation;
- often knows part of what they are looking for but may need to compare several records.

## Data model

Simulate at least 50 visible sample records while describing the product as scaling to thousands.

Each record contains:

- stable ID;
- title / name;
- category;
- status;
- owner;
- updated timestamp;
- priority;
- several comparable numeric / textual fields;
- tags;
- longer detail / notes.

At least some records should share similar values so that filtering / comparison is meaningful.

## Required capabilities

- search records;
- filter by multiple useful attributes;
- sort results;
- select a record and inspect more detail;
- compare at least two records on meaningful fields;
- update status or tags for a selected record;
- support multi-select or an equivalent batch-oriented action for a repeated workflow;
- preserve search / filter / selection context after opening details or making an edit;
- show empty / no-result behavior;
- allow the user to understand how many records currently match their context.

## Key uncertainty intentionally left open

The benchmark must not pre-decide:

- table vs list vs hybrid representation;
- persistent inspector vs route / page detail;
- search-first vs browse / facet entry;
- whether comparison is embedded or enters a separate mode;
- panel count;
- navigation placement;
- density level beyond the requirement that the repeated desktop task remain efficient.

## Completion checks

A valid artifact must allow an evaluator to:

1. narrow the data to a specific category and status;
2. search within or alongside that narrowed context;
3. inspect one result without losing the working set;
4. compare that result with another result;
5. change a status / tag;
6. return to the working set with search / filter context still understandable;
7. create a no-result state and recover from it.

## Primary benchmark tension

**Density / speed vs clarity / context.**

The task should expose whether the generation workflow defaults to marketing-like sections or card collections even when the real work is repeated data manipulation.

---

# Task G — Game Management Interface

Benchmark ID: `G`

Working product name: **Forge Control**

## Product purpose

A factory / resource-management game includes a management interface used while the player remains aware that gameplay continues around the UI.

The interface must help the player understand production, machine problems, resources, and priorities without treating the experience like a generic business dashboard.

## Target user

- keyboard + mouse player;
- medium-length play sessions;
- alternates between direct world interaction and management decisions;
- needs important warnings quickly;
- may inspect one machine in detail, then return to broader production management.

## Game-state model

Provide a frozen simulated state containing:

- 3 resource types;
- 6–8 machines / production units;
- input / output rates;
- storage quantities and limits;
- machine operational state;
- at least 2 machines with problems / warnings;
- production queue / priority;
- selected machine context;
- several recent events / alerts.

No 3D engine is required for the pilot. A representative gameplay-background / world-context area may be simulated, but the management UI must still behave like an interface intended to coexist with gameplay.

## Required capabilities

- understand current production at a glance;
- notice important machine / resource problems;
- inspect a specific machine;
- identify its inputs, outputs, status, and current problem if any;
- change production priority or queue order;
- move between global production understanding and local machine context;
- acknowledge or resolve a representative warning where appropriate;
- return to gameplay / world context without losing the meaning of the current management state;
- distinguish always-important information from context-specific detail.

## Key uncertainty intentionally left open

The benchmark must not pre-decide:

- overlay vs full management mode;
- persistent HUD elements;
- inspector placement;
- map / spatial / list / network representation;
- degree of transparency or visual material;
- whether global and local management are separate views;
- exact navigation pattern;
- dashboard / card / panel composition.

## Completion checks

A valid artifact must allow an evaluator to:

1. identify an active production problem;
2. identify the affected machine / resource;
3. inspect the machine's local state;
4. change one production priority / queue decision;
5. return to the broader production context;
6. identify whether the change is reflected in the management state;
7. understand how to leave / minimize management and resume the simulated gameplay context.

## Primary benchmark tension

**Persistent situational awareness vs management depth.**

The artifact should reveal whether the generation workflow respects game-context constraints or simply reuses a conventional Web dashboard composition.

---

# Task validity notes

A task run is invalid if:

- the condition receives materially different requirements or content;
- a solution layout is accidentally prescribed to only one condition;
- required functionality is intentionally removed to make visual evaluation easier;
- a run uses a previous condition's final artifact as an undeclared reference;
- the run cannot produce the minimum completion evidence.

Invalid runs should be repeated with the original frozen task rather than silently edited into a new benchmark task.
