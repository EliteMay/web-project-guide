# Human Guide Site

This directory contains the human-facing Web Project Guide runtime that is published with GitHub Pages.

Current Human Guide product contract: [`../HUMAN_GUIDE_REQUIREMENTS.md`](../HUMAN_GUIDE_REQUIREMENTS.md)

## Layout

```text
site/
├─ pages/   # Human-facing Guide pages
├─ assets/  # Shared CSS and static presentation/runtime assets
└─ data/    # Public Human Guide presentation/search metadata
```

## Public entry and compatibility

- Repository-root `index.html` remains the stable GitHub Pages entry for `/web-project-guide/`.
- The canonical secondary pages live under `site/pages/`.
- Root `ai-workflow.html`, `rules.html`, `work-dashboard.html`, `all-rules.html`, `research-requirements.html`, `search.html`, and `task-router.html` are compatibility adapters for public URLs and bookmarks. Do not add substantive page content back to those adapters.
- `site/pages/all-rules.html` is the concise cross-cutting rule inventory.
- `site/pages/research-requirements.html` is the human-facing inventory of researched/evidence-backed areas and deeply defined Requirements / Contracts.
- `site/pages/search.html` provides the public site-wide search surface.
- `site/pages/task-router.html` projects the current Machine Router into a human-readable route diagnostic.
- `project-dashboards/` is a separate repository-dashboard subsystem and is intentionally not owned by this directory.
- Root `project-dashboard.json` is also outside this human-guide site structure.

## Shared Human Guide runtime

`site/data/human-guide-manifest.json` is presentation metadata for canonical Human Guide surfaces. It drives shared navigation and surface metadata; it is not a normative rule owner.

`site/assets/human-guide-shell.js` uses that manifest to project shared behavior such as:

- Global Navigation and current-page state
- Skip navigation
- Guide release-state display
- Manifest opt-in Auto TOC for selected long pages
- Source / Owner / Edit / Report footer links

Search corpus metadata lives in `site/data/search-sources.json`. Search Authority and Content Type are separate axes. Private `web-project-data` content must not be registered in either public manifest/search metadata file.

## Authority boundary

The pages here are human-readable summaries and navigation surfaces. Normative Guide rules remain owned by `docs/` and the registered Owner Docs. Research remains non-normative evidence unless promoted into an Owner / Requirements contract. Do not duplicate a second normative rule body into `site/`.

Human Guide navigation, search, routing projections, page TOC, source/correction paths, freshness labeling, public-data boundaries, and structural validation must follow `HUMAN_GUIDE_REQUIREMENTS.md`.

When paths change, update page links, runtime fetch paths, compatibility adapters, manifest/search metadata, and the relevant Human Guide validators together, then verify the final GitHub Pages URLs after merge.
