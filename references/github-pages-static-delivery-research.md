# GitHub Pages Static Delivery Research

Status: **current non-normative evidence**

Checked: **2026-09-07**

Purpose: Support the current `docs/08-github-pages.md` decision framework without turning provider-specific details into a second normative owner.

## Current official evidence reviewed

### Publishing source

GitHub currently supports publishing a Pages site from a branch or with a custom GitHub Actions workflow. GitHub's documentation recommends branch publishing when no special build-process control is needed; custom Actions is appropriate when a custom build / artifact pipeline is required.

Source:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

### Actions artifact / entry point

For custom Actions publishing, the deployed artifact must contain the public site output and its entry file at the artifact root. Build success and deploy success are not substitutes for checking the resulting public site.

Source:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites

### Custom domain / takeover protection

GitHub recommends verifying a custom domain before attaching it to a Pages site. Verification restricts use of the verified domain / immediate subdomains to repositories owned by that account or organization and reduces domain-takeover risk. GitHub also warns against wildcard DNS records for Pages because they can create takeover risk.

Source:
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages

### Branch vs Actions custom-domain behavior

For branch publishing, a configured custom domain is represented by a `CNAME` file in the publishing source. For custom GitHub Actions publishing, a repository `CNAME` file is not the authority for custom-domain configuration; the Pages configuration remains the authority.

Source:
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

### HTTPS / DNS

HTTPS certificate availability depends on correct DNS configuration. Mixed HTTP assets can still undermine the HTTPS result even when the site itself is served over HTTPS.

Source:
- https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

### 404 behavior

GitHub Pages supports custom `404.html` / `404.md` pages. A missing / mis-cased `index.html`, incorrect artifact root, DNS issue, custom-domain issue, or path problem can also produce 404 behavior and should not be confused with a normal missing-route case.

Source:
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites

### Hosting suitability / limits

GitHub describes Pages as a static hosting service primarily intended for project / personal / organizational pages and explicitly states that it is not intended as free hosting for an online business, e-commerce site, or commercial SaaS, nor for sensitive transactions such as sending passwords or credit-card numbers. Current numerical usage limits and terms can change and should be rechecked before relying on them as a Product Contract.

Source:
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features

## Promotion decision

Promote only durable decision boundaries into `docs/08`:

- Branch vs Actions based on actual build / artifact needs
- Source Commit → Artifact → Deployment → Public URL traceability
- Project-site subpath / direct-open / 404 semantics
- Custom-domain verification / DNS / HTTPS operational boundary
- Pages hosting limitations and hosting-migration trigger
- cache / Service Worker recovery

Do not freeze current plan limits, DNS IP values, or other provider values that can change into Common Rules. Re-check current official GitHub documentation when those values become material.
