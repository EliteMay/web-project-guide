# web-project-guide Requirements Draft

> Status: Approved decision checkpoint / **NOT YET IMPLEMENTED**
>
> This file exists only to preserve the approved Phase 14–15 roadmap decisions before they are integrated into the normative Owner Docs. It is not a Common Rule Owner, not a release note, and not evidence that the rules below are already implemented.
>
> When implementation is completed, integrate only the actual gaps into the existing normative Owners, validate the Guide, then remove this Draft after the formal state is safely represented by the current Owner Docs / Requirements / Work Report as appropriate.

## 0. Context / Handoff State

- Repository: `EliteMay/web-project-guide`
- Phase 6–13: already implemented and merged to `main` before this Draft.
- Phase 14–15: approved in discussion, **not yet integrated into Owner Docs** at the time of this checkpoint.
- Do not treat roadmap phase numbers as Owner Doc numbers. For example, roadmap Phase 14 primarily maps to `docs/05-performance-reliability.md`, not `docs/14-continuous-improvement.md`.
- Apply Single Normative Owner / Rule Budget during implementation.
- Existing rules must not be duplicated merely because they appear in this Draft.
- Do not add a new Owner / Profile / Risk Signal / Stable Gate unless a real owner gap remains after auditing the current Guide.
- Current Repository must be re-read before implementation because the Guide may have changed after this checkpoint.

## 1. Approved Phase 14 — Performance / Reliability / Failure Recovery / Offline / Network Degradation

### 14.1 Primary Task Continuity / Reliability Model / Graceful Degradation

Approved direction:

- Reliability is evaluated by whether Primary Task value can continue safely, not by a binary `working / broken` model.
- Use a conceptual degradation ladder where appropriate: `Available → Degraded but usable → Read-only / stale but useful → Recoverable failure → Unavailable`.
- Dependency criticality must be based on impact to the Primary Task rather than provider or technology name.
- Keep the existing conceptual categories `Critical`, `Important but degradable`, and `Non-critical` where useful.
- Non-critical dependency failure should not become full-page failure when the Primary Task can remain available.
- Failure blast radius should be kept to the smallest safe scope: page / feature / component / background state as appropriate.
- Degraded mode must not be presented as normal / fully healthy operation when that distinction matters.
- Last-known-good / stale data may be used only when freshness risk is acceptable for that data and operation.
- Read capability and Write capability must be decided separately for degraded / offline states.
- Partial success must not be shown as full success. Examples that may need distinction include `Local Saved`, `Sync Pending`, `Synced`, `Save Failed`, `Sync Failed`, `Conflict`.
- Recovery UI should explain, where useful: what happened, what remains usable, and what the user can do next.
- Do not invent unsafe fallback behavior merely to make a failure look graceful.
- Non-critical initialization should not block Primary Task readiness without a real dependency reason.
- Background failure visibility should be proportional to user impact; an analytics failure and an autosave failure are not equivalent.
- Complex apps may track health states such as `healthy / degraded / offline / recovering / failed`, but a global health state machine is not required for every project.
- Distinguish `loading / retrying / degraded / failed / recovered` when the distinction changes what the user should understand or do.
- Performance and Reliability must be treated as a trade-off; do not optimize one by blindly destroying the other.
- Reliability architecture complexity must be proportional to actual project risk. Small static sites must not receive enterprise-style reliability machinery by default.

### 14.2 Network Failure / Timeout / Retry / Backoff / Idempotency / Late Response

Approved direction:

- Do not use `network failure → resend` as a universal default.
- Distinguish failure categories where behavior differs, including network unavailable, timeout, 5xx, rate limit, authentication, permission, validation, conflict, client bug, and provider outage.
- Read and Write operations require different retry safety analysis.
- Unsafe non-idempotent writes must not be automatically retried without duplicate protection or reconciliation.
- For high-impact duplicate risk, consider idempotency key / operation ID / revision / equivalent domain-safe duplicate prevention.
- Automatic retry must always be bounded by count, duration, deadline, user action, or another explicit stop condition.
- Retry counts and timeout durations must not become universal fixed values for all projects and operations.
- Transient retries should consider exponential backoff, jitter, and server guidance such as `Retry-After` where applicable.
- 429 / rate-limit failure must not enter an immediate retry storm.
- Authentication refresh / retry flows must have loop protection.
- Distinguish a user-facing wait-feedback threshold from the actual request / operation timeout.
- Client-side cancellation must not be treated as proof that a server-side write was rolled back.
- Late / out-of-order responses must not overwrite newer current state.
- Save / Sync completion order must not be treated as freshness order.
- Pending queue insertion must not be displayed as remote synchronization success.
- Long-term / poison operations should be isolated when appropriate so one permanently failing operation does not block unrelated queue work.
- Manual retry is not automatically safe; ambiguous writes may require reconciliation with current server state before another write is attempted.
- Paid / quota-limited operations, including AI APIs, must consider retry cost as part of reliability behavior.
- User-facing error messages and developer diagnostic detail should remain separate.

### 14.3 Offline Capability / Cached State / Pending Queue / Reconnect / Conflict Boundary

Approved direction:

- Offline is a capability contract, not a simple on/off feature flag.
- Useful conceptual levels include `No Offline`, `Offline Read`, `Offline Edit`, `Offline Create`, and `Offline Full`, but projects are not required to use those exact labels.
- Offline support must not be treated as a universal quality score; choosing `No Offline` may be correct for server-authoritative features.
- Cache, Canonical User Data, Derived Data, and Pending Writes must not be conflated.
- App-shell offline availability and user-data offline capability are separate requirements.
- If offline writes are allowed, local canonical commit and pending remote mutation must be distinguishable.
- Important pending writes should survive reload / app restart when the product claims durable offline editing.
- Operation dependencies in queues must not be reordered blindly; `Create → Edit → Delete` style dependencies matter.
- State mutation queues and event / transaction queues must not receive the same compaction strategy automatically.
- Reconnect must not mean `send every old queued mutation immediately`.
- Before reconnect synchronization, re-check relevant current state such as remote revision, tombstone / delete state, auth / permission, schema compatibility, queue validity, and operation dependency.
- `navigator.onLine` and online/offline events are hints, not proof that the target API is usable.
- Browser / OS background execution must not be the only recovery mechanism. App launch / resume / online-return should be able to revisit pending work when needed.
- Offline write sync must perform conflict checks when concurrent remote state can exist.
- Conflict policy must be proportional to data-loss cost; do not apply Last Write Wins blindly to important UGC, money, progress, or high-value state.
- Logical revision / version is preferred over relying only on wall-clock `updatedAt` when conflict detection matters.
- Edit-vs-delete should not accidentally resurrect deleted records; tombstone or equivalent delete-state tracking should be considered when applicable.
- Manual conflict UI should provide enough context for a user to choose when manual resolution is genuinely required.
- Partial sync should distinguish concepts such as remote-only / not downloaded / available / deleted / unavailable when relevant.
- `Not present locally` must not be treated as `deleted remotely`.
- Long-term failed queue items should be isolatable when appropriate, and quarantine re-entry must revalidate current state.
- Pending work must remain bound to the correct user / tenant / permission context.
- Pending operations also require schema compatibility handling across app updates.
- Offline destructive actions should distinguish local intent from confirmed remote deletion where that difference matters.

### 14.4 Slow Device / Main Thread / Long Task / Memory / Long-running Session

Approved direction:

- Initial-load speed alone is not enough to declare runtime performance complete.
- Slow-device verification depth should scale with actual runtime risk: SPA, large data, Canvas / WebGL / Game, Editor, Dashboard, media processing, heavy animation, and long-running tools deserve stronger checks.
- High-end developer hardware must not be the only implicit target unless the project explicitly constrains supported hardware.
- Limited-support heuristic APIs such as device memory / network information must not be the sole determinant of core capability.
- Adaptive degradation may reduce non-essential animation, blur, media, prefetch, or background work while preserving the Primary Task.
- JavaScript file size and JavaScript execution cost are separate concerns.
- Identify whether the actual bottleneck is fetch / parse / compute / main-thread blocking / DOM / layout / render / memory rather than using vague labels such as `large JSON`.
- The 50 ms Long Task signal may be used diagnostically but must not become a universal per-function completion threshold.
- Worker / chunking / yielding strategies are tools for measured bottlenecks, not default architecture.
- Data record count must not automatically become DOM node count.
- Virtualization must not be forced by one universal record threshold.
- Repeated route / modal / tab / player / reconnect / preview lifecycles must not accumulate listeners, timers, observers, Blob URLs, DOM nodes, Canvas/WebGL resources, or other retained state indefinitely.
- A single memory peak does not prove a leak; repeated cycles and post-cleanup stabilization matter more.
- `Long-running` must be defined by expected session / lifecycle characteristics, not one fixed number of minutes for every product.
- Long-running validation should look for progressive responsiveness degradation, heap growth, listener/timer growth, reconnect loops, cache/log growth, and stale-state accumulation.
- Diagnostics themselves must use bounded retention and must not become a memory leak.
- Non-critical background work should stay off the Primary Interaction critical path where possible.
- Idle callbacks / scheduler hints must not become the only mechanism for important correctness-critical processing.
- Performance optimization must target measured bottlenecks and must not sacrifice correctness / data integrity.
- Premature optimization that adds substantial complexity without real measured risk should be avoided.

### 14.5 Third-party Dependency / Provider Failure / Partial Outage / Fallback / Single Point of Failure

Approved direction:

- Third-party dependency criticality must be evaluated by impact to the Primary Task.
- Primary-task dependencies should be recognized when they form a single point of failure (SPOF), but a SPOF does not automatically require multi-provider architecture.
- Non-critical provider initialization should not block app startup / Primary Task readiness.
- CDN / external script / external font / embed availability must not be assumed to be permanent or failure-free.
- Non-critical external fonts / images / media should degrade locally when practical instead of blanking the whole product.
- Critical CDN dependencies should consider self-host / local bundle trade-offs where reliability warrants it, but self-hosting is not universally mandatory.
- Auth-provider outage behavior should distinguish existing sessions, new login, and sensitive actions where the security model permits; availability must never be restored by bypassing authentication or authorization.
- Data-provider failure behavior must follow the real data-authority model from the storage owner.
- Optional AI failure should not stop unrelated core functionality. If AI itself is the Primary Task, preserve user input and provide a clear recoverable unavailable state where possible.
- High-risk ambiguous operations such as payment must reconcile before blind retry.
- Reliability includes quota exhaustion, rate limits, free-tier pause, and relevant provider policy / pricing constraints where those can make the feature unavailable.
- Provider health may be partial (`Auth healthy`, `DB degraded`, `Storage failed`) rather than one global online/offline bit.
- Fallback may include cache, local/read-only mode, placeholder, manual workflow, secondary provider, export, or retry-later, but fallback must not be less safe or materially misleading.
- Secondary providers must not be treated as automatically behavior-, privacy-, cost-, or schema-equivalent.
- Automatic failover that changes model behavior, privacy, or cost must be treated as a material behavior change rather than invisible infrastructure.
- Last-known-good provider data is allowed only where staleness risk is acceptable.
- Circuit-breaker style behavior may be useful for high-frequency external dependencies but must not be forced on small projects.
- Provider recovery may require reconciliation of pending queue, stale cache, auth expiry, missed updates, or conflicts before the feature is considered healthy again.
- Reliability improvement may mean removing an unnecessary external dependency instead of adding more fallback layers.

### 14.6 Performance Measurement / Budgets / Cold vs Repeat / Field vs Lab / Stop Optimization

Approved direction:

- Define what user-visible task or bottleneck is being improved before optimizing.
- Meaningful performance work should retain a comparable baseline when practical.
- Cold load and repeat/cached load are separate and should not be confused.
- Initial load and repeated runtime interaction are separate; improving one does not automatically improve the other.
- Lab measurement and field / real-user evidence have different strengths; neither is a perfect substitute for the other.
- Real User Monitoring / analytics must not be mandatory for every small project merely to claim performance validation.
- Use representative target conditions instead of an unrealistic universal worst-case matrix.
- Existing soft budgets / review triggers remain review signals, not automatic failures.
- Being under a byte / DOM budget does not prove good Primary Task readiness or runtime responsiveness.
- Being over a review trigger may still be valid when the resource is product-critical and the trade-off is measured and justified.
- Do not proliferate arbitrary universal numeric budgets merely because they are easy to measure.
- Separate network, CPU, render, memory, and task-completion metrics to find the real bottleneck.
- Lighthouse or another synthetic score must not be the sole completion gate.
- Small performance differences require consideration of measurement noise; compare under materially similar conditions and use repeated measurement when needed.
- Performance-critical data flows should use representative data size / realistic content, not tiny placeholder datasets only.
- Visual metrics must not substitute for actual Primary Task Ready state.
- Real-time / game-like interactions should consider frame stability / hitch / input responsiveness, not average FPS alone.
- External provider latency should be separated from client-side cost when diagnosing.
- High-cost repeated performance regressions may warrant a regression guard.
- Hard CI budgets should be limited to repeatable, contract-like regressions; noisy/contextual metrics are better as review triggers.
- Optimization must stop when the Primary Task is sufficiently performant, material bottlenecks are resolved, representative conditions are acceptable, and further gain is smaller than complexity / regression cost.
- Performance changes should be reverted when they add meaningful bugs / complexity / accessibility or data-integrity regressions for negligible real benefit.
- Perceived speed must not be achieved by falsely presenting incomplete / failed operations as complete.

### 14.7 Reliability Validation / Failure Injection / Recovery Verification / Completion

Approved direction:

- Failure-state UI existing in code is not enough; important failure paths should be exercised where practical.
- Failure injection depth must be proportional to risk. Large chaos-engineering infrastructure is not required for normal solo projects.
- Important failure scenarios may include offline, slow network, timeout, 5xx, 429, auth expiry, provider failure, invalid response, storage write failure, corruption, retry interruption, late response, partial dependency outage, and reconnect.
- Data-loss / duplicate / permission / cost-risk operations require failure-path verification, not only happy-path checks.
- Timeout validation should include late-result behavior and verify that stale results do not overwrite current state.
- Retry implementations must validate retry exhaustion / final-failure behavior, not only retry-then-success.
- High-impact writes should test ambiguous-response / duplicate scenarios when applicable.
- Async UI should test out-of-order responses where that risk exists.
- Offline-write support is not complete until an offline round-trip is tested through reconnect and synchronization; durable capability should include reload / restart where claimed.
- Conflict-handling code is not complete until representative conflict scenarios are exercised. Edit-vs-delete deserves explicit validation when relevant.
- Multi-subsystem providers should be tested for partial failure when that is a realistic risk.
- Fallback logic must also have a safe terminal state when fallback data / secondary service is unavailable.
- Recovery verification must confirm actual data / state integrity, not merely disappearance of an error message.
- Persistent-state failures should consider recovery followed by reload / restart.
- Corruption recovery should prefer detect → protect good data → isolate/recover rather than defaulting immediately to full reset.
- Important migration flows should test mid-migration failure and safe re-execution / resume where applicable.
- Backup must not be described as proven recovery until Restore round-trip has been verified where backup is a material recovery mechanism.
- CI / static validation must not be described as real-device validation.
- Reliability-critical failures should be diagnosable enough to separate project bugs from provider / environment failure without leaking secrets.
- High-cost reliability bugs should become regression guards when reasonably automatable or at least have reproducible manual procedures.
- Validation depth should scale from minimum to standard to extended rather than forcing the largest failure matrix on every project.
- Completion means the applicable Primary Task, critical dependencies, failure behavior, degraded state, recovery path, actual failure test, actual recovery test, integrity check, and final-state verification are all represented truthfully.
- Verification labels must remain truthful. `Implemented` alone does not imply Browser / Real Device / User validation.

## 2. Approved Phase 15 — Accessibility / Input Methods / Responsive Robustness / Internationalization

### 15.1 Accessibility as Task Completion / Semantic Foundation / Equivalent Outcome

Approved direction:

- Accessibility is judged by whether the user can understand information, reach controls, complete the Primary Task, understand the result, and recover from errors—not by the presence of ARIA / alt / contrast checks alone.
- Equivalent outcome matters more than identical interaction. Mouse, keyboard, touch, and assistive technology may use different interaction patterns as long as supported users can reach the same meaningful outcome.
- Primary outcomes must not depend on only one non-essential input method.
- Prefer native semantic HTML before recreating native behavior with ARIA and custom scripts.
- Adding an ARIA role alone must not be treated as implementing native keyboard / focus / disabled / state behavior.
- Important meaning must not depend solely on color, position, hover, sound, or animation.
- Interactive elements need an understandable accessible name.
- Visible labels and accessible names should remain reasonably aligned.
- Visual hierarchy and semantic heading / landmark hierarchy should not diverge so far that reading order becomes confusing.
- Logical DOM / reading / focus order matters even when CSS visually reorders content.
- Visual hidden, semantic hidden, and collapsed state must not be treated as the same thing automatically.
- Disabled controls should communicate the reason / requirement when users need that information to continue.
- Errors must not be color-only and should explain what is wrong and how to recover where practical.
- Dynamic state changes should be announced only when the user needs the update to continue; live-region noise should be avoided.
- Modal / dialog behavior requires focus lifecycle and appropriate background interaction handling, not merely visual overlay styling.
- Focus indicators must not be removed for visual reasons.
- Hover-only task-critical information / actions must also be reachable by keyboard / touch-equivalent interaction.
- Authentication assistance such as password managers and paste must not be blocked without a strong justified reason.
- Accessibility and Security are not opposites; accessible paths must preserve the same auth / authorization boundaries.
- Accessibility baseline should be broadly applied, while advanced custom-widget patterns apply only when the project actually contains those widgets.

### 15.2 Keyboard / Focus / Pointer / Touch / Drag / Shortcut / Input-method Independence

Approved direction:

- Primary Task completion must not depend on one input device unless that input itself is inherently part of the task, such as freehand drawing or specific game mechanics.
- Native controls must retain their native keyboard behavior.
- Tab order should follow logical task order. Do not use large positive-`tabindex` schemes to compensate for a broken DOM structure.
- Focus movement after dialog open/close, deletion, route/context changes, and other major UI transitions should be intentional when needed for continuity.
- Dynamic updates must not move focus unnecessarily.
- When the focused element is removed, move focus to a reasonable next target where continued interaction is expected.
- Author-created sticky/fixed/overlay UI must not fully obscure current keyboard focus.
- Keyboard traps are not allowed except intentional focus containment in a proper temporary modal scope with a valid escape/close path.
- Hover must not be required to discover or use important actions.
- Touch targets must consider both target area and accidental activation from nearby controls.
- Gesture-only or right-click-only access must not be the sole path to important functionality.
- Drag-only Primary Task interaction is not acceptable when drag is not intrinsically required; provide move buttons, select-destination, keyboard controls, or equivalent alternatives when needed.
- Keyboard shortcuts are optional productivity accelerators, not the sole entry point to features.
- Do not steal standard browser / OS shortcuts without strong reason.
- Global shortcuts must not fire destructively while the user is typing in editable controls.
- Shortcut discoverability should be provided where shortcuts are meaningful to power users.
- Single-key shortcuts and key-repeat behavior require accidental-action risk review.
- Pointer Events or equivalent shared input handling may be used where appropriate, but compatibility still matters.
- `preventDefault()` on wheel/touch/key events must be justified and must not remove scrolling, zoom, standard shortcuts, or assistive behavior without an alternative.
- User zoom must not be disabled merely to protect a visual layout.
- Virtual keyboard appearance must not hide the active field / error / required action in supported mobile flows.
- Native `type`, `inputmode`, and autocomplete hints should be used when they genuinely improve mobile input.
- Paste must not be blocked for password / OTP / normal text input without an exceptional justified requirement.
- Double-click / long-press / strict timing gestures should not be the only access path to important actions unless timing or gesture is intrinsic to the product.
- Input-method testing should exercise real Primary Task flow, not only code-path existence.

### 15.3 Responsive Robustness / Zoom / Reflow / Orientation / Viewport Height / Content Expansion

Approved direction:

- Responsive design must not mean simply scaling down a desktop layout.
- Breakpoints should be based primarily on where content / components / tasks stop working, not on a long list of device models.
- Avoid breakpoint proliferation for near-identical device widths; prefer a small number of meaningful layout transitions.
- Responsive validation must include height constraints as well as width constraints.
- Low-height windows, browser zoom, split screen, Electron window resizing, and mobile virtual keyboard can all reduce usable space and must be considered when relevant.
- Fixed-height assumptions must be justified for content that can expand or shrink.
- Full-height layouts should account for real browser viewport behavior rather than assuming one `100vh` behavior is universally correct.
- Reflow should preserve task priority, not merely collapse `3 columns → 1 column` mechanically.
- Primary information / action must be preserved before secondary / tertiary content when space is constrained.
- Responsive adaptation must not delete necessary functionality; move it into drawer / sheet / menu / tab / progressive disclosure when appropriate.
- Page-level horizontal overflow should generally be avoided. Local horizontal scrolling is valid for content such as tables, timelines, code, canvases, or comparison matrices when that best preserves meaning.
- Responsive table behavior should preserve the table's comparison / scan role; converting everything to cards is not automatically correct.
- Browser zoom / OS scaling must not make the Primary Task impossible. It is acceptable for zoom to trigger a narrower responsive layout.
- Text-bearing controls must tolerate reasonable content expansion and supported-locale label length.
- Task-critical text hidden by ellipsis should have a way to reveal the full meaning where needed.
- Realistic short / long content and actual supported languages should be used in responsive checks.
- Orientation changes should not break the Primary Task when rotation is within the supported scope.
- Orientation lock is allowed only when the product requirement genuinely depends on it, not as a shortcut for layout bugs.
- Desktop / Electron window resize should update layout, canvas, pane, and state correctly when resizable windows are supported.
- Safe areas / system UI must not cover critical edge controls in full-screen / mobile layouts where applicable.
- Sticky / fixed UI must not fully cover focused controls or Primary Actions in low-height / zoom / keyboard-open states.
- Nested scroll containers should not proliferate without need.
- Dialogs must keep close and Primary Action reachable under supported narrow-width / low-height conditions.
- Responsive component replacement must preserve keyboard / focus semantics.
- Canvas / game surfaces and HUD / control scaling should be considered separately when one scaling strategy would make controls unreadable or untouchable.
- Desktop-first tools may explicitly define a supported minimum workspace, but unsupported viewports must not be called responsive-complete.
- Layout mode changes must not unnecessarily reset draft / selection / current task state.
- Responsive navigation may change presentation while preserving access to the same important destinations.

### 15.4 Internationalization / Localization / Japanese-English Content / Locale-sensitive Layout

Approved direction:

- Separate Internationalization structure from actual Localization content.
- A multilingual project must define its supported Language / Locale scope; `some English text exists` is not the same as equal bilingual support.
- Do not add a multilingual framework to every project only because localization might be useful someday.
- User-facing documents must set a correct primary `lang`; meaningful inline language switches should be marked when pronunciation / assistive reading benefits.
- Language selectors should identify language itself rather than using flags alone.
- Explicit user language preference must not be overwritten on every launch by automatic detection.
- Language / locale switching should not destroy current draft / selection / task state without a real reason.
- User-facing translated strings must not be used as application-state identifiers.
- In multilingual UI, translation text and application logic should be separated through stable keys / machine values as appropriate.
- Do not construct translatable sentences by concatenating English-order fragments when grammar / plural / word order may change by locale.
- Locale-aware plural handling should be used where plural grammar matters.
- Date / time display should be locale-aware where appropriate, while canonical stored data remains machine-readable and locale-independent.
- Language / Locale and Time Zone are separate settings and must not be conflated.
- Important relative times should provide access to an absolute date/time when the exact moment matters.
- User-facing numeric formatting should be locale-aware where relevant.
- Money data must clearly store currency value + currency identity/code; localized display and exchange-rate conversion are separate concerns.
- Unit preference must not be inferred solely from UI language.
- Human-facing sorting may require locale-aware comparison when ordering is important.
- Search normalization may account for case / Unicode / kana / width variation, but must not rewrite canonical original user content.
- Japanese and English layout must be tested with their real line-breaking and label-length characteristics; do not fix widths based only on short Japanese labels.
- Supported fonts must cover required glyphs or have intentional fallback; font coverage must be balanced with performance rather than loading every font variant eagerly.
- Primary-task translations should be reviewed for meaning / terminology / context, not merely presence.
- Key product terminology should remain consistent within each locale.
- Missing translations must have a safe fallback rather than exposing raw translation keys.
- Locale fallback is recovery behavior, not permission to leave large parts of a supported locale untranslated and still call it complete.
- Mixed-language UI is acceptable when domain terminology is clearer in the original language and target users can understand it.
- UI locale switching must not automatically translate or rewrite user-generated content.
- Machine / API contracts should use stable non-localized values rather than localized display strings.
- RTL support is conditional: if an RTL locale is officially supported, direction / icon / layout / reading order must be validated; RTL is not mandatory for Japanese-English projects.
- Public multilingual content may need stable locale-aware URLs / metadata when sharing, SEO, or deep links matter, but locale path structure is not universally required.
- Localization testing must use actual locale switching, long labels, date/number formatting, narrow viewport, zoom, missing-translation fallback, and active-task switching as applicable.
- i18n architecture complexity must remain proportional to the real supported locale scope.

### 15.5 Forms / Validation / Error Recovery / Autofill / Authentication Accessibility

Approved direction:

- Form accessibility is complete only when the user can understand required information, enter data, discover validation problems, correct them, resubmit, and recognize success.
- Placeholder must not be the only field label / instruction.
- Required / optional state should be consistently understandable.
- Constraints users need to satisfy should be discoverable before or during input rather than only after submission failure.
- Validation timing should match the field/task; do not spam `invalid` errors while the user has barely started typing.
- Distinguish incomplete input from invalid input when that improves clarity.
- Error messages should explain what is wrong and how to fix it where reasonably possible.
- Error state must not rely only on color.
- Field-level errors should be semantically associated with the correct field.
- Long forms with multiple simultaneous errors may use an error summary / jump-to-error pattern when useful; this is not required for every tiny form.
- Submission failure should leave the user able to reach the error location through a reasonable focus / navigation path.
- Validation failure must not clear unrelated correct input.
- User-correctable validation errors and system / provider failures must not be collapsed into the same generic `input error` state.
- Client-side validation is UX assistance, not a replacement for server-side validation / authorization.
- Native input type / inputmode / autocomplete should be used when they genuinely assist the task.
- Numeric identifiers such as phone / postal / membership IDs must not automatically be treated as mathematical numbers.
- Autofill, Password Manager, and paste should not be blocked without a strong exceptional reason.
- Redundant entry should be avoided when the process already has the same information and reuse is safe.
- Password requirements should be visible before failure; password visibility toggles may reduce entry mistakes where privacy context permits.
- Double-entry `confirm password` should not be used solely by habit when other error prevention works better.
- OTP flows should allow paste / autocomplete where practical and must not create an inaccessible six-field focus trap merely for visual style.
- Cognitive puzzles / transcription challenges must not be the sole authentication completion path.
- Destructive confirmations should be proportional to risk and avoid unnecessary memory / transcription challenges.
- Multi-step forms should expose current step / progress / back behavior and should not discard safely retainable prior input when navigating backward.
- Long high-loss forms may use draft / autosave; if so, the Data / Storage owner governs persistence behavior.
- Session expiry should not unnecessarily destroy long-form user input when secure re-auth / recovery can preserve it.
- Upload constraints such as allowed type / size should be understandable before selection / submission where practical.
- Date input / display must respect the locale-vs-canonical-data separation.
- Semantically equivalent input formats should not be rejected unnecessarily when normalization can safely handle them.
- Validation messages are localized product content and should participate in the localization contract.
- Important successful submission must produce a recognizable success state.
- Duplicate-impact forms should prevent accidental double-submit; network-level idempotency remains a Performance / Reliability concern.
- Loading / disabled / readonly states must be selected for actual behavior rather than visual appearance only.
- Form validation must be exercised through error → correction → resubmit → success, not only the happy path.

### 15.6 Motion / Animation / Media / Reduced Motion / Audio-Visual Alternatives

Approved direction:

- Animation / audio must not be the only channel for task-critical information.
- Motion should have an explicit role such as state transition, spatial relationship, progress, feedback, attention, or game mechanic; decorative motion should be easy to reduce or remove.
- Motion-only state changes such as `slide left = deleted` require an understandable non-motion state / message where needed.
- `prefers-reduced-motion` should be respected unless a clear product-specific reason makes a particular motion essential.
- Reduced Motion means preserve information while reducing sensory movement; it does not require turning every transition into zero-duration if a subtle transition improves understanding.
- Decorative / large spatial / looping motion should be reducible, while essential progress remains communicated in a lower-motion form.
- Non-essential auto-rotating carousels / auto-playing animated content should not be the default for Primary Content; pause / stop / manual control may be required when used.
- Parallax and heavy scroll-triggered motion should be reduced or disabled under Reduced Motion where applicable.
- Strong flashing / rapid brightness changes must not be used casually as decoration due to seizure risk.
- Loading animation is feedback, not proof that work is progressing successfully.
- Determinate progress must correspond reasonably to real process progress; fake progress should be avoided.
- Visual transitions must not unnecessarily block Primary Interaction.
- Critical application logic must not depend solely on decorative `animationend` / transition completion.
- Application state should be authoritative; animation decorates state transitions rather than defining the only state transition mechanism.
- Important audio notifications require a visual/text equivalent where the task needs that information.
- Sound-on autoplay must not be a general-site default.
- Audio-heavy products should provide appropriate volume / mute control, and games may expose separate channels when that materially improves playability.
- Informational video speech should provide captions / transcript where the spoken information is required for the task.
- Audio-only information should receive text / summary alternatives when the product task requires a visual path.
- Important information must not be trapped only inside images / screenshots / charts; use suitable alt / caption / explanation / data representation.
- Alt text should reflect the image's purpose, and decorative images should not become needless assistive-technology noise.
- Complex diagrams may use short alt plus nearby full explanation rather than overloading one alt attribute.
- Charts must not rely solely on color differentiation.
- Canvas-based products should consider DOM-based controls / status where possible; games may legitimately retain core visual interaction while separating non-essential sensory effects into comfort/accessibility settings.
- Timing limits should be extendable / pausable when the time pressure is not intrinsic to the task.
- Important required-action errors must not disappear only through a short auto-dismiss toast.
- Long media should preserve useful context across pause/resume.
- Critical process correctness must not depend on background timers / animation frames continuously running while the tab is hidden.
- Long-running interactive media should verify background / visibility / resume behavior where applicable.
- Reduced-motion / media-disabled modes should consider avoiding unnecessary resource downloads as a Performance concern.
- Explicit user comfort / accessibility preferences should not reset every session without reason when the product stores such preferences.
- Motion / media validation should include Reduced Motion, keyboard, muted/no-audio state, pause/resume, narrow viewport, and background/resume where applicable.

### 15.7 Accessibility / Responsive / i18n Validation Matrix / Completion Criteria

Approved direction:

- Automated accessibility scans are useful for machine-detectable errors but must not be treated as proof that the Primary Task is accessible.
- Automated results must not replace human interaction validation for focus order, task flow, recovery, responsive priority, translation quality, or custom interactions.
- Interactive products should run the Primary Task by keyboard only, except where a different input is intrinsically part of the product requirement.
- Touch support must be verified through actual task flow / realistic touch behavior rather than the mere presence of media queries.
- Representative screen-reader validation should be added for high-risk semantic / dynamic UI such as complex forms, custom widgets, public services, or important accessibility targets; a huge screen-reader matrix is not mandatory for every small site.
- Screen-reader validation should test task understanding and completion, not merely that text is spoken.
- Focus lifecycle should be validated for modal open/close, element removal, route/context changes, and other applicable interactions.
- Zoom and narrow-width validation should look for clipping, overlap, hidden actions, broken reflow, dialog failure, and sticky/fixed obstruction.
- Low-height viewport should be included when the product uses fixed/sticky/dialog/keyboard-sensitive layouts.
- Responsive transition testing should preserve navigation, selection, drafts, open panel state, and current task where applicable.
- Long-content / pseudo-localization may be used to find fixed-width localization bugs in larger multilingual products.
- Supported locales must be actually run; translation file existence is not completion evidence.
- Locale-switch behavior during an active task should be tested when runtime language switching is supported.
- Important forms require `invalid → error discovery → correction → resubmit → success` validation; add autofill / paste / password manager / mobile keyboard / session-expiry checks when relevant.
- Task-critical dynamic states should be verified visually and semantically where applicable.
- Motion-heavy UI should be tested with Reduced Motion enabled; audio-dependent features should be tested muted / audio-unavailable when an alternative is required.
- Captions / transcripts / text alternatives must be reachable from the real user flow, not merely present as unused assets.
- Browser coverage should follow target users and APIs. Chromium / Firefox are common baseline candidates, with Safari / Mobile Safari added when the supported scope requires them.
- Prefer feature detection over fragile browser-name branching for newer platform capabilities.
- Emulator / DevTools results must not be reported as real-device validation.
- High-cost accessibility / responsive / locale regressions should become tests, screenshots, or reproducible checklist guards when practical.
- Validation matrices must be risk-based; do not require every browser × every screen reader × every width × every locale × every zoom level for ordinary solo projects.
- Primary-task-blocking accessibility issues are Blocking, not cosmetic Minor polish.
- Findings should be prioritized by user impact rather than by whether they came from an automated tool.
- Verification state must remain truthful: Static validation must not be promoted to Browser / Real Device / User validation.
- Legal / contractual WCAG compliance audit is a separate scope from the Guide's general development baseline and must not be implied unless actually performed.

## 3. Expected Owner Mapping During Implementation

This mapping is implementation guidance only. Re-check current owners before editing.

### Phase 14 likely owners

- `docs/05-performance-reliability.md` — primary normative owner for Primary Task readiness, degradation, timeout/retry behavior, runtime performance, provider failure, measurement, and performance/reliability validation depth.
- `docs/03-data-storage.md` — canonical authority, offline writes, pending queue, sync, conflict, revision, tombstone, durable recovery.
- `docs/07-testing-quality.md` — test strategy, failure injection, verification state, final-state validation.
- `docs/15-development-observability.md` — diagnostics, bounded logging, failure/recovery evidence.
- `docs/06-security.md` — auth / privacy / paid API abuse / secure failure boundaries where reliability intersects security.
- `docs/09-maintenance.md` — rollback / forward-fix / provider / release recovery only where the rule is release-maintenance-specific.

### Phase 15 likely owners

- `docs/04-ui-ux-accessibility.md` — primary normative owner for accessibility, input methods, responsive robustness, form interaction, motion/media accessibility, and localization-facing UI behavior.
- `docs/07-testing-quality.md` — accessibility / responsive / locale validation strategy and truthful verification state.
- `docs/05-performance-reliability.md` — performance effects of motion/media/fonts and constrained runtime.
- `docs/03-data-storage.md` — persistence of locale/preferences/drafts where applicable.
- `docs/06-security.md` — authentication security boundaries and server-side validation.
- `docs/22-task-first-structure-flow-research.md` — only when accessibility/responsive changes actually alter IA / Navigation / Task Flow, not for ordinary visual reflow.

## 4. Implementation Rules for the Next Conversation

Before modifying the Guide:

1. Re-fetch current `README.md` and `START_HERE.md` from `main`.
2. Re-fetch `docs/05-performance-reliability.md`, `docs/04-ui-ux-accessibility.md`, and only the supporting Owners actually needed.
3. Compare this Draft against the current Owner Docs.
4. Mark each approved item conceptually as one of:
   - Already implemented — do not duplicate.
   - Gap — integrate into the existing normative Owner.
   - Better owned elsewhere — route to the actual existing Owner.
   - No longer applicable because current Guide evolved — document the reason rather than blindly restoring old wording.
5. Preserve Single Normative Owner / Rule Budget.
6. Do not create a new Owner / Gate / Profile / Risk Signal solely to mirror Phase 14 or 15.
7. Update `templates/QUALITY_CHECKLIST.md`, router, requirements, version metadata, changelog, or other surfaces only when the actual integrated rule changes require them.
8. Run the Guide validator on the final implementation state.
9. Record real validation state truthfully; do not claim browser / real-device checks that were not executed.
10. Once the approved decisions are safely represented in the actual current normative state, remove this Draft according to the Requirements Draft contract.

## 5. Current Next Roadmap Candidate

After Phase 14–15 implementation / persistence is resolved, the next roadmap candidate discussed was:

**Phase 16 — Content Quality / Information Architecture Maintenance / Search / Discoverability / Empty-State Quality**

This is only the next discussion candidate. No Phase 16 decisions are approved by this Draft.
