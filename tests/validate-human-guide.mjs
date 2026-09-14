import fs from 'node:fs';

const errors = [];
const requiredFiles = [
  'index.html',
  'HUMAN_GUIDE_REQUIREMENTS.md',
  'site/README.md',
  'site/assets/human-guide.css',
  'site/assets/mobile-fixes.css',
  'site/assets/human-guide-shell.js',
  'site/data/human-guide-manifest.json',
  'site/data/search-sources.json',
  'site/data/dashboard-data.json'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) errors.push(`missing human guide contract/surface: ${file}`);
}

for (const obsolete of ['human-guide.css', 'mobile-fixes.css', 'dashboard-data.json']) {
  if (fs.existsSync(obsolete)) errors.push(`obsolete root human guide file still exists: ${obsolete}`);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function parseJson(file) {
  try {
    return JSON.parse(read(file));
  } catch (error) {
    errors.push(`${file}: invalid JSON -> ${error.message}`);
    return null;
  }
}

function isDirectoryPath(path) {
  return path.endsWith('/');
}

function assertUnique(values, label) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) errors.push(`${label}: duplicate -> ${value}`);
    seen.add(value);
  }
}

function validateShellSurface(surface) {
  const canonical = surface.canonicalPath;
  if (!canonical.endsWith('.html')) return;
  if (!fs.existsSync(canonical)) return;

  const text = read(canonical);
  const isRootHome = canonical === 'index.html';
  const expectedShellPath = isRootHome
    ? 'site/assets/human-guide-shell.js'
    : '../assets/human-guide-shell.js';

  if (!text.includes(`data-surface-id="${surface.id}"`)) {
    errors.push(`${canonical}: missing data-surface-id="${surface.id}"`);
  }
  if (!text.includes('data-repo-root=')) {
    errors.push(`${canonical}: missing data-repo-root for shared shell`);
  }
  if (!text.includes('data-human-guide-nav')) {
    errors.push(`${canonical}: missing manifest-driven global navigation mount`);
  }
  if (!text.includes('data-human-guide-home')) {
    errors.push(`${canonical}: missing shared home-link mount`);
  }
  if (!text.includes(expectedShellPath)) {
    errors.push(`${canonical}: missing shared Human Guide shell -> ${expectedShellPath}`);
  }
  if (!text.includes('id="main-content"')) {
    errors.push(`${canonical}: missing stable main-content target for skip navigation`);
  }
}

const manifest = fs.existsSync('site/data/human-guide-manifest.json')
  ? parseJson('site/data/human-guide-manifest.json')
  : null;
const searchSources = fs.existsSync('site/data/search-sources.json')
  ? parseJson('site/data/search-sources.json')
  : null;

if (manifest) {
  if (manifest.schemaVersion !== 1) errors.push('human guide manifest: unsupported schemaVersion');
  if (manifest.authority !== 'human-guide-presentation-metadata') {
    errors.push('human guide manifest: authority must remain presentation metadata, not a rule owner');
  }
  if (!Array.isArray(manifest.surfaces) || manifest.surfaces.length === 0) {
    errors.push('human guide manifest: surfaces must be a non-empty array');
  } else {
    assertUnique(manifest.surfaces.map((surface) => surface.id), 'human guide manifest id');
    assertUnique(manifest.surfaces.map((surface) => surface.canonicalPath), 'human guide canonical path');

    const allowedAuthorities = new Set([
      'human-summary',
      'normative-owner',
      'current-contract',
      'reference-evidence',
      'catalog-example',
      'status',
      'compatibility'
    ]);

    const byId = new Map(manifest.surfaces.map((surface) => [surface.id, surface]));
    for (const surface of manifest.surfaces) {
      for (const field of ['id', 'label', 'canonicalPath', 'surfaceType', 'authority']) {
        if (!surface[field]) errors.push(`human guide manifest ${surface.id || '<unknown>'}: missing ${field}`);
      }
      if (!allowedAuthorities.has(surface.authority)) {
        errors.push(`human guide manifest ${surface.id}: unsupported authority -> ${surface.authority}`);
      }
      if (!surface.nav || typeof surface.nav.visible !== 'boolean' || !Number.isFinite(surface.nav.order)) {
        errors.push(`human guide manifest ${surface.id}: invalid nav metadata`);
      }
      if (!Array.isArray(surface.compatibilityPaths)) {
        errors.push(`human guide manifest ${surface.id}: compatibilityPaths must be an array`);
      }
      if (!Array.isArray(surface.sourceLinks)) {
        errors.push(`human guide manifest ${surface.id}: sourceLinks must be an array`);
      }
      if (/web-project-data/i.test(JSON.stringify(surface))) {
        errors.push(`human guide manifest ${surface.id}: private web-project-data must not be a public surface source`);
      }

      const canonical = surface.canonicalPath;
      if (!fs.existsSync(canonical)) {
        errors.push(`human guide manifest ${surface.id}: missing canonical path -> ${canonical}`);
      } else if (isDirectoryPath(canonical) && !fs.statSync(canonical).isDirectory()) {
        errors.push(`human guide manifest ${surface.id}: expected directory -> ${canonical}`);
      }

      // Project dashboards are a separate subsystem. Every HTML surface owned by
      // the Human Guide itself must mount the same manifest-driven shell.
      validateShellSurface(surface);

      for (const compatibilityPath of surface.compatibilityPaths || []) {
        if (!fs.existsSync(compatibilityPath)) {
          errors.push(`human guide manifest ${surface.id}: missing compatibility adapter -> ${compatibilityPath}`);
          continue;
        }
        const adapter = read(compatibilityPath);
        if (!adapter.includes(canonical)) {
          errors.push(`${compatibilityPath}: compatibility target missing -> ${canonical}`);
        }
        if (!adapter.includes('location.replace')) {
          errors.push(`${compatibilityPath}: compatibility redirect must preserve query/hash with location.replace`);
        }
        if (adapter.length > 2500) {
          errors.push(`${compatibilityPath}: compatibility adapter contains too much substantive page content`);
        }
      }
    }

    if (!Array.isArray(manifest.globalNav) || manifest.globalNav.length === 0) {
      errors.push('human guide manifest: globalNav must be a non-empty array');
    } else {
      assertUnique(manifest.globalNav, 'human guide globalNav');
      for (const id of manifest.globalNav) {
        const surface = byId.get(id);
        if (!surface) {
          errors.push(`human guide globalNav: unknown surface -> ${id}`);
          continue;
        }
        if (surface.nav?.visible !== true) {
          errors.push(`human guide globalNav: ${id} must be nav.visible=true`);
        }
      }
      const expectedOrder = [...manifest.globalNav]
        .map((id) => byId.get(id))
        .sort((a, b) => a.nav.order - b.nav.order)
        .map((surface) => surface.id);
      if (JSON.stringify(expectedOrder) !== JSON.stringify(manifest.globalNav)) {
        errors.push('human guide manifest: globalNav order must match nav.order');
      }
    }
  }
}

if (searchSources) {
  if (searchSources.schemaVersion !== 1) errors.push('search sources: unsupported schemaVersion');
  if (!Array.isArray(searchSources.sources) || searchSources.sources.length === 0) {
    errors.push('search sources: sources must be a non-empty array');
  } else {
    assertUnique(searchSources.sources.map((source) => source.id), 'search source id');
    const allowedAuthorities = new Set(['normative-owner', 'current-contract', 'human-summary', 'catalog-example', 'reference-evidence']);
    for (const source of searchSources.sources) {
      if (!source.id || !source.title || !source.path || !source.authority) {
        errors.push(`search source ${source.id || '<unknown>'}: missing required field`);
        continue;
      }
      if (!allowedAuthorities.has(source.authority)) {
        errors.push(`search source ${source.id}: unsupported authority -> ${source.authority}`);
      }
      if (!fs.existsSync(source.path)) {
        errors.push(`search source ${source.id}: missing public source -> ${source.path}`);
      }
      if (/web-project-data/i.test(JSON.stringify(source))) {
        errors.push(`search source ${source.id}: private web-project-data must not be indexed`);
      }
    }
  }
}

if (errors.length === 0) {
  const index = read('index.html');
  const rules = read('site/pages/rules.html');
  const workflow = read('site/pages/ai-workflow.html');
  const dashboard = read('site/pages/work-dashboard.html');
  const allRules = read('site/pages/all-rules.html');
  const researchRequirements = read('site/pages/research-requirements.html');
  const searchPage = read('site/pages/search.html');
  const taskRouter = read('site/pages/task-router.html');
  const shell = read('site/assets/human-guide-shell.js');
  const mobile = read('site/assets/mobile-fixes.css');
  const requirements = read('REQUIREMENTS.md');
  const humanRequirements = read('HUMAN_GUIDE_REQUIREMENTS.md');

  for (const expected of [
    'site/assets/human-guide.css',
    'site/assets/mobile-fixes.css',
    'site/assets/human-guide-shell.js',
    'site/pages/work-dashboard.html',
    'site/pages/ai-workflow.html',
    'site/pages/rules.html',
    'site/pages/search.html',
    'site/pages/task-router.html',
    'site/pages/all-rules.html',
    'site/pages/research-requirements.html'
  ]) {
    if (!index.includes(expected)) errors.push(`index.html: missing Human Guide entry -> ${expected}`);
  }

  for (const [page, text] of [
    ['site/pages/rules.html', rules],
    ['site/pages/ai-workflow.html', workflow],
    ['site/pages/work-dashboard.html', dashboard],
    ['site/pages/all-rules.html', allRules],
    ['site/pages/research-requirements.html', researchRequirements],
    ['site/pages/search.html', searchPage],
    ['site/pages/task-router.html', taskRouter]
  ]) {
    for (const asset of ['../assets/human-guide.css', '../assets/mobile-fixes.css']) {
      if (!text.includes(asset)) errors.push(`${page}: missing shared asset path -> ${asset}`);
    }
    if (!text.includes('../../index.html')) errors.push(`${page}: missing stable root home link`);
  }

  if (!dashboard.includes("fetch('../data/dashboard-data.json'")) {
    errors.push('site/pages/work-dashboard.html: missing site/data dashboard source');
  }
  if (!rules.includes("../data/search-sources.json")) {
    errors.push('site/pages/rules.html: Owner list must use the public search/source registry');
  }
  if (!searchPage.includes("../data/search-sources.json")) {
    errors.push('site/pages/search.html: missing public search source registry');
  }
  if (!taskRouter.includes("../../maintenance/rule-router.json")) {
    errors.push('site/pages/task-router.html: must project the Current Machine Router');
  }
  if (!searchPage.includes('authorityLabels')) {
    errors.push('site/pages/search.html: search results must expose authority/content type');
  }
  if (!shell.includes('human-guide-manifest.json')) {
    errors.push('human-guide-shell.js: must load Human Guide manifest');
  }
  if (!shell.includes("setAttribute('aria-current', 'page')")) {
    errors.push('human-guide-shell.js: must expose current page state');
  }
  if (!shell.includes('ensureSkipLink')) {
    errors.push('human-guide-shell.js: must provide skip navigation for shell-enabled surfaces');
  }
  if (!/overflow-x:\s*auto/.test(mobile)) {
    errors.push('mobile-fixes.css: global tabs must remain horizontally reachable on narrow viewports');
  }

  const routeIds = ['learning', 'web-deployment', 'browser-compatibility', 'external-integration'];
  for (const routeId of routeIds) {
    if (!rules.includes(`data-route="${routeId}"`)) {
      errors.push(`site/pages/rules.html: missing current human route -> ${routeId}`);
    }
    if (!workflow.includes(`data-route="${routeId}"`)) {
      errors.push(`site/pages/ai-workflow.html: missing current human route -> ${routeId}`);
    }
  }

  const ownerLinks = [
    'docs/01-requirements.md',
    'docs/02-architecture.md',
    'docs/07-testing-quality.md',
    'docs/08-github-pages.md',
    'docs/10-project-management.md',
    'docs/12-project-profiles.md',
    'docs/13-dependencies-assets.md',
    'docs/22-task-first-structure-flow-research.md'
  ];
  for (const ownerLink of ownerLinks) {
    if (!rules.includes(ownerLink) && !workflow.includes(ownerLink)) {
      errors.push(`human guide: missing route to current owner -> ${ownerLink}`);
    }
  }

  if (!/User-facing UI:\s*Yes/.test(requirements)) {
    errors.push('REQUIREMENTS.md: human-facing website exists but User-facing UI is not Yes');
  }
  if (!/Visual Quality Baseline:\s*Applicable/.test(requirements)) {
    errors.push('REQUIREMENTS.md: human-facing website must keep Visual Quality Baseline applicable');
  }

  const humanContractMarkers = [
    'Human Guide Surface Registry / Manifest',
    'Global Navigation Contract',
    'Site-wide Search Contract',
    'Human Task Router Contract',
    'Human Guide Freshness / Release State Contract',
    'Validator / Regression Guard Contract'
  ];
  for (const marker of humanContractMarkers) {
    if (!humanRequirements.includes(marker)) {
      errors.push(`HUMAN_GUIDE_REQUIREMENTS.md: missing P0 contract -> ${marker}`);
    }
  }
}

if (errors.length) {
  console.error('Human guide validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Human guide validation passed.');
