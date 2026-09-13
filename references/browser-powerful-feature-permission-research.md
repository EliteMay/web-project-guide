# Browser Powerful Feature / Permission Research

Status: **current non-normative evidence**

Checked: **2026-09-14**

Purpose: Support the cross-cutting browser capability rules in `docs/06-security.md`, `docs/07-testing-quality.md`, and `docs/04-ui-ux-accessibility.md` without turning API-specific implementation details into a second normative owner.

## Current official evidence reviewed

### Permission state is not only a browser prompt

MDN documents the Permissions API as a way to query the effective permission state for a current context. The effective result can reflect multiple restrictions at once, including secure-context requirements, Permissions Policy restrictions, and user permission state. Common states are `granted`, `denied`, and `prompt`, but not every API exposes the same permission-query or request mechanism.

Sources:
- https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API
- https://developer.mozilla.org/en-US/docs/Web/API/PermissionStatus/state
- https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query

### Powerful features commonly require a secure context

Many browser capabilities that expose sensitive data or device/system access are restricted to secure contexts. Examples include geolocation, notifications, screen capture, Web Bluetooth, Web MIDI, WebUSB, WebHID and many others. `getUserMedia()` is also restricted to secure contexts.

Sources:
- https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts
- https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts/features_restricted_to_secure_contexts

### Permissions Policy and user permission are different layers

Permissions Policy controls whether a document or embedded frame may use a feature. The Permissions API represents user-granted permission for supported features. A policy-blocked feature can effectively appear denied without the browser showing a user prompt.

Sources:
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Permissions_Policy
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy/geolocation

### Camera and microphone require explicit user permission

`MediaDevices.getUserMedia()` requests access to camera / microphone input and requires a secure context. MDN notes that user permission is required before media input is opened, and that embedded contexts may additionally depend on Permissions Policy / iframe allowance.

Source:
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

### Screen capture is intentionally per-use and user-activated

For `getDisplayMedia()`, MDN notes that permission cannot be persisted for reuse, the user must be prompted each time, and transient user activation is required. This means a generic "permission granted once, feature permanently enabled" model is incorrect for screen capture.

Source:
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia

### Notification permission should follow an explicit user gesture

MDN recommends requesting notification permission in response to a user gesture and notes that browsers increasingly restrict unsolicited permission prompts. Notification behavior also depends on secure-context and browser/platform support.

Sources:
- https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API
- https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission_static

### Clipboard permission / activation behavior differs across browsers

Clipboard access is restricted to secure contexts, but browser behavior differs. Some operations depend on transient user activation; Chromium can expose `clipboard-read` / `clipboard-write` permissions, while Firefox and Safari use different interaction / prompt behavior. A Common Rule should therefore require capability-aware fallbacks instead of assuming one universal permission flow.

Source:
- https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API

### User activation is a separate browser security mechanism

Many sensitive operations require recent user interaction even if there is no persistent permission state. MDN lists examples such as clipboard access, screen capture, device selection and file pickers. Permission status alone therefore does not prove an operation can run at an arbitrary time.

Source:
- https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/User_activation

## Promotion decision

Promote durable decision boundaries into the Guide:

- treat secure-context support, document / iframe policy, user permission and user activation as separate conditions;
- request only the capability required for the current user-visible function;
- request permission in context rather than on page load when the API / UX permits it;
- do not assume the Permissions API can query or request every capability consistently;
- handle unsupported, prompt, granted, denied, revoked / changed, policy-blocked and device-unavailable states without false success UI;
- provide a useful fallback or recovery path after denial instead of repeatedly prompting;
- test representative browsers because clipboard, notification and other permission mechanics can differ;
- keep API-specific details current by checking official documentation when implementing a capability.

Do not freeze a universal browser prompt sequence, a complete list of powerful APIs, or vendor-specific permission-setting instructions into Common Rules. Those details can change independently of the durable security / UX lifecycle.
