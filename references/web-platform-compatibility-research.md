# Web Platform Compatibility Research

Status: **current non-normative evidence**

Checked: **2026-09-07**

Purpose: Support browser / Web Platform compatibility decisions in the existing Requirements, Testing, and Dependency owners.

## Current external evidence reviewed

### MDN Baseline

MDN Baseline summarizes Web Platform feature availability across a defined set of popular browsers. Current Baseline coverage includes Safari on iOS/macOS, Chrome on Android/desktop, Edge desktop, and Firefox on Android/desktop. Baseline explicitly does not replace testing and does not necessarily cover older browser versions, OS WebViews, assistive technology, or every user environment.

Source:
- https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility

### Feature detection

MDN recommends checking for the capability actually needed and providing an appropriate fallback rather than assuming a browser name implies feature support. CSS provides `@supports` / `CSS.supports()`, while JavaScript APIs can often be detected through the relevant object / method boundary.

Source:
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Feature_detection

### UA sniffing

MDN warns that User-Agent parsing is difficult to do reliably and commonly creates bugs. Browser identity is usually not the real requirement; feature detection is normally the safer boundary. UA-dependent behavior can still be justified in rare cases where an actual browser-specific behavior cannot be detected another way, but it should be narrow and documented.

Source:
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Browser_detection_using_the_user_agent

## Promotion decision

Promote durable principles only:

- Supported Browser / Runtime is a Product Contract derived from audience, usage, deployment, and risk—not an arbitrary universal browser list.
- Baseline / compatibility tables are planning evidence, not proof of runtime correctness for the Project's users.
- Prefer Feature Detection and progressive fallback over browser-name branching.
- New Web APIs need a defined unsupported / degraded behavior when the support contract requires it.
- Polyfill / transpilation decisions belong to the Dependency owner and should be justified by the actual support contract.
- Representative real-browser / real-device testing is selected by risk and target environment.
- Support retirement is an explicit Requirement / Maintenance decision when it can materially affect users.

Do not freeze a universal browser-version matrix into the Common Guide. Re-check current Web Platform evidence when adopting new APIs or changing support targets.
