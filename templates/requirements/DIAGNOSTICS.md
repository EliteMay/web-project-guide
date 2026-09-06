# Requirements Pack — Diagnostics

Interactive ProjectでRuntime Diagnostics / Remote Handoffが必要な場合だけ使います。詳細基準は [15 Development Observability](../../docs/15-development-observability.md) を正本とします。

## Need

- Runtime Diagnostics required: Yes / No
- Main failure modes to capture:
- Productionで残す診断機能:
- Development onlyにする診断機能:

## Runtime Evidence

- App Version / Build / Schema source:
- Breadcrumbで残す主要操作:
- 捕捉するError / Failure:
- Diagnostic保存先: memory / localStorage / IndexedDB / Electron userData / other
- Log保持上限 / Rotation:
- Error ID表示: Yes / No
- Health / Diagnostics View: Yes / No

## Export / Handoff

- One-click Diagnostic Export: Yes / No
- Remote Handoff: Yes / No
- Remote Provider（該当時）:
- Remote write trigger:
- Retention / size limit:
- Offline / Provider failure fallback:

## Privacy / Security

- Logへ記録禁止するデータ:
- Secret / Token / Cookie handling:
- User input sanitization policy:
