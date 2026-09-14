const root = document.documentElement.dataset.repoRoot || '../../';
const currentSurfaceId = document.documentElement.dataset.surfaceId || '';
const githubRepository = 'https://github.com/EliteMay/web-project-guide';

function fromRoot(path) {
  return new URL(`${root}${path}`, window.location.href).href;
}

function githubPath(path, mode = 'blob') {
  const normalized = String(path || '').replace(/^\/+/, '');
  const kind = normalized.endsWith('/') ? 'tree' : mode;
  return `${githubRepository}/${kind}/main/${normalized}`;
}

function ensureComponentStyles() {
  if (document.querySelector('link[data-human-guide-components]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = fromRoot('site/assets/human-guide-components.css');
  link.dataset.humanGuideComponents = '';
  document.head.append(link);
}

function ensureSkipLink() {
  if (document.querySelector('.skip-link')) return;
  const main = document.querySelector('main');
  if (!main) return;
  if (!main.id) main.id = 'main-content';
  const link = document.createElement('a');
  link.className = 'skip-link';
  link.href = `#${main.id}`;
  link.textContent = '本文へ移動';
  document.body.prepend(link);
}

function renderNavigation(manifest) {
  const nav = document.querySelector('[data-human-guide-nav]');
  if (!nav) return;

  const byId = new Map(manifest.surfaces.map((surface) => [surface.id, surface]));
  nav.replaceChildren();

  for (const id of manifest.globalNav) {
    const surface = byId.get(id);
    if (!surface || surface.nav?.visible !== true) continue;
    const link = document.createElement('a');
    link.href = fromRoot(surface.canonicalPath);
    link.textContent = surface.label;
    link.dataset.surfaceId = surface.id;
    if (surface.id === currentSurfaceId) link.setAttribute('aria-current', 'page');
    nav.append(link);
  }

  const brand = document.querySelector('[data-human-guide-home]');
  if (brand) brand.href = fromRoot('index.html');
}

function headingSlug(text, fallback) {
  const slug = String(text || '')
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('ja')
    .replace(/\s+/g, '-')
    .replace(/[^\p{Letter}\p{Number}_-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 72);
  return slug || fallback;
}

function ensureHeadingId(heading, index, usedIds) {
  if (heading.id && !usedIds.has(heading.id)) {
    usedIds.add(heading.id);
    return heading.id;
  }

  const base = headingSlug(heading.textContent, `section-${index + 1}`);
  let candidate = base;
  let suffix = 2;
  while (usedIds.has(candidate) || document.getElementById(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  heading.id = candidate;
  usedIds.add(candidate);
  return candidate;
}

function renderPageToc(surface) {
  if (surface?.toc !== true) return;
  const main = document.querySelector('main');
  if (!main || main.querySelector('[data-human-guide-toc]')) return;

  const headings = [...main.querySelectorAll('h2, h3')]
    .filter((heading) => !heading.closest('[data-human-guide-toc], [data-human-guide-source-footer]'));
  if (headings.length < 2) return;

  const usedIds = new Set([...document.querySelectorAll('[id]')].map((element) => element.id));
  for (const heading of headings) usedIds.delete(heading.id);

  const details = document.createElement('details');
  details.className = 'page-toc';
  details.dataset.humanGuideToc = '';
  details.open = window.matchMedia('(min-width: 900px)').matches;

  const summary = document.createElement('summary');
  summary.textContent = 'このページの内容';
  details.append(summary);

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'このページの内容');
  const list = document.createElement('ol');
  const linksById = new Map();

  headings.forEach((heading, index) => {
    const id = ensureHeadingId(heading, index, usedIds);
    const item = document.createElement('li');
    if (heading.tagName === 'H3') item.className = 'page-toc-subitem';
    const link = document.createElement('a');
    link.href = `#${encodeURIComponent(id)}`;
    link.textContent = heading.textContent.trim();
    item.append(link);
    list.append(item);
    linksById.set(id, link);
  });

  nav.append(list);
  details.append(nav);

  const hero = main.querySelector(':scope > .hero, :scope > header.hero');
  if (hero) hero.insertAdjacentElement('afterend', details);
  else main.prepend(details);

  if ('IntersectionObserver' in window) {
    const markCurrent = (id) => {
      for (const [headingId, link] of linksById) {
        if (headingId === id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]?.target?.id) markCurrent(visible[0].target.id);
    }, { rootMargin: '-76px 0px -68% 0px', threshold: [0, 1] });

    headings.forEach((heading) => observer.observe(heading));
  }
}

function renderSourceFooter(surface) {
  const main = document.querySelector('main');
  if (!main || !surface || main.querySelector('[data-human-guide-source-footer]')) return;

  const footer = document.createElement('footer');
  footer.className = 'source-footer';
  footer.dataset.humanGuideSourceFooter = '';

  const heading = document.createElement('h2');
  heading.textContent = 'Source / 修正';
  footer.append(heading);

  const boundary = document.createElement('p');
  boundary.className = 'source-footer-note';
  boundary.textContent = surface.authority === 'human-summary'
    ? 'このページはHuman Guideの要約です。判断の正本は下のSource / Owner / Requirementを確認してください。'
    : 'このページを支えるSourceと修正経路です。';
  footer.append(boundary);

  const links = document.createElement('div');
  links.className = 'source-footer-links';

  for (const path of surface.sourceLinks || []) {
    const link = document.createElement('a');
    link.href = githubPath(path);
    link.textContent = `Source: ${path}`;
    links.append(link);
  }

  if (surface.canonicalPath?.endsWith('.html')) {
    const edit = document.createElement('a');
    edit.href = githubPath(surface.canonicalPath, 'edit');
    edit.textContent = 'このページをGitHubで編集';
    links.append(edit);
  }

  const issue = new URL(`${githubRepository}/issues/new`);
  issue.searchParams.set('title', `[Human Guide] ${surface.label}`);
  issue.searchParams.set('body', `対象Surface: ${surface.label}\nPath: ${surface.canonicalPath}\n\n問題点:\n`);
  const report = document.createElement('a');
  report.href = issue.href;
  report.textContent = '問題を報告';
  links.append(report);

  footer.append(links);
  main.append(footer);
}

function renderReleaseState(version) {
  const target = document.querySelector('[data-guide-release]');
  if (!target) return;

  const baseline = version.guideVersion ? `Release baseline v${version.guideVersion}` : 'Release baseline';
  const updated = version.updated ? ` · ${version.updated}` : '';
  const status = version.status === 'unreleased-changes'
    ? ' · Current mainには未Release変更あり'
    : '';
  target.textContent = baseline + updated + status;
}

async function initHumanGuideShell() {
  ensureComponentStyles();
  ensureSkipLink();

  try {
    const response = await fetch(fromRoot('site/data/human-guide-manifest.json'));
    if (!response.ok) throw new Error(`manifest ${response.status}`);
    const manifest = await response.json();
    renderNavigation(manifest);
    const surface = manifest.surfaces.find((item) => item.id === currentSurfaceId);
    renderPageToc(surface);
    renderSourceFooter(surface);
  } catch (error) {
    console.warn('Human Guide manifest could not be loaded.', error);
  }

  if (document.querySelector('[data-guide-release]')) {
    try {
      const response = await fetch(fromRoot('guide-version.json'));
      if (!response.ok) throw new Error(`guide version ${response.status}`);
      renderReleaseState(await response.json());
    } catch (error) {
      console.warn('Guide release state could not be loaded.', error);
    }
  }
}

initHumanGuideShell();
