# 仕様書

このTemplateは**現在実装されるTechnical Contract**を書くためのものです。目的・Scope・User Decisionは`REQUIREMENTS.md`を正本とし、ここへ重複させません。

## 1. Source of Truth

- Requirements: `REQUIREMENTS.md`
- Project Rules: `PROJECT_RULES.md`（存在する場合）
- Adopted Guide Version:
- Profiles:

## 2. Runtime / Architecture

- Entry point:
- Main runtime:
- Major modules / responsibilities:
- External runtime dependency:

```text
User action
↓
Controller / Logic
↓
Data / State
↓
Renderer / Output
```

## 3. Surface / Screen Contract

| Surface | Responsibility | Main Action | Required State |
|---|---|---|---|
| | | | Loading / Empty / Error / Success |

## 4. Data Contract

| Data | Source of Truth | ID / Schema | Consumer |
|---|---|---|---|
| | | | |

## 5. Storage / Migration

| Data | Storage | Key / Version | Backup / Restore |
|---|---|---|---|
| | | | |

- Save timing:
- Unsaved state:
- Migration path:
- Existing data compatibility:
- Reset / destructive operation contract:

## 6. External Integration

| Service / API | Purpose | Auth / Config | Failure / Fallback |
|---|---|---|---|
| | | | |

## 7. Compatibility / Release Contract

- URL / Route compatibility:
- Browser / Runtime support:
- GitHub Pages / Electron notes:
- Existing user data:
- Version / Build source:

## 8. Technical Invariants

Requirementsの「崩してはいけない仕様」を技術的にどう守るかだけ記録します。

1. 
2. 

## 9. Validation Contract

- Static validation:
- Unit / Integration:
- Browser / E2E:
- Visual / Playtest / Real-device（該当時）:
- Regression guard:

## 10. Known Technical Constraints / Unverified

- 
