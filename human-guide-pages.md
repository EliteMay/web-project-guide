# Human Guide Pages

The public site currently adds two human-facing pages without changing normative rule ownership:

- `work-dashboard.html` — sanitized A/B/C/D/I run status and copyable conversation start prompts.
- `ai-workflow.html` — human-readable explanation of how the AI routes work, researches, decides, implements, and validates.

`dashboard-data.json` is a public-safe projection only. Private `web-project-data` remains canonical for detailed run state and must not be fetched directly from browser code.

These pages explain existing rules; they do not replace Owner Docs.
