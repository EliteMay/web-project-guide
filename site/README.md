# Human Guide Site

This directory contains the human-facing Web Project Guide runtime that is published with GitHub Pages.

## Layout

```text
site/
├─ pages/   # Human-facing Guide pages
├─ assets/  # Shared CSS and other static presentation assets
└─ data/    # Public data used only by the human-facing site
```

## Public entry and compatibility

- Repository-root `index.html` remains the stable GitHub Pages entry for `/web-project-guide/`.
- The canonical secondary pages live under `site/pages/`.
- Root `ai-workflow.html`, `rules.html`, `work-dashboard.html`, `all-rules.html`, and `research-requirements.html` are compatibility adapters for public URLs and bookmarks. Do not add substantive page content back to those adapters.
- `site/pages/all-rules.html` is the concise cross-cutting rule inventory.
- `site/pages/research-requirements.html` is the human-facing inventory of researched/evidence-backed areas and deeply defined Requirements / Contracts.
- `project-dashboards/` is a separate repository-dashboard subsystem and is intentionally not owned by this directory.
- Root `project-dashboard.json` is also outside this human-guide site structure.

## Authority boundary

The pages here are human-readable summaries and navigation surfaces. Normative Guide rules remain owned by `docs/` and the registered Owner Docs. Research remains non-normative evidence unless promoted into an Owner / Requirements contract. Do not duplicate a second normative rule body into `site/`.

When paths change, update page links, runtime fetch paths, compatibility adapters, and `tests/validate-human-guide.mjs` together, then verify the final GitHub Pages URLs after merge.
