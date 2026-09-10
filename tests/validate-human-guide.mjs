import fs from 'node:fs';

const errors = [];
const requiredFiles = [
  'index.html',
  'site/README.md',
  'site/pages/rules.html',
  'site/pages/ai-workflow.html',
  'site/pages/work-dashboard.html',
  'site/assets/human-guide.css',
  'site/assets/mobile-fixes.css',
  'site/data/dashboard-data.json',
  'rules.html',
  'ai-workflow.html',
  'work-dashboard.html'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) errors.push(`missing human guide surface: ${file}`);
}

for (const obsolete of ['human-guide.css', 'mobile-fixes.css', 'dashboard-data.json']) {
  if (fs.existsSync(obsolete)) errors.push(`obsolete root human guide file still exists: ${obsolete}`);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

if (errors.length === 0) {
  const index = read('index.html');
  const rules = read('site/pages/rules.html');
  const workflow = read('site/pages/ai-workflow.html');
  const dashboard = read('site/pages/work-dashboard.html');
  const requirements = read('REQUIREMENTS.md');

  const indexPaths = [
    'site/assets/human-guide.css',
    'site/assets/mobile-fixes.css',
    'site/pages/work-dashboard.html',
    'site/pages/ai-workflow.html',
    'site/pages/rules.html'
  ];
  for (const expected of indexPaths) {
    if (!index.includes(expected)) errors.push(`index.html: missing organized site path -> ${expected}`);
  }

  for (const [page, text] of [
    ['site/pages/ai-workflow.html', workflow],
    ['site/pages/work-dashboard.html', dashboard]
  ]) {
    for (const asset of ['../assets/human-guide.css', '../assets/mobile-fixes.css']) {
      if (!text.includes(asset)) errors.push(`${page}: missing shared asset path -> ${asset}`);
    }
    if (!text.includes('../../index.html')) errors.push(`${page}: missing stable root home link`);
  }

  if (!dashboard.includes("fetch('../data/dashboard-data.json'")) {
    errors.push('site/pages/work-dashboard.html: missing site/data dashboard source');
  }
  if (!rules.includes("fetch('../../guide-version.json')")) {
    errors.push('site/pages/rules.html: missing root guide-version source');
  }

  const compatibilityRoutes = new Map([
    ['ai-workflow.html', 'site/pages/ai-workflow.html'],
    ['rules.html', 'site/pages/rules.html'],
    ['work-dashboard.html', 'site/pages/work-dashboard.html']
  ]);
  for (const [legacyPath, target] of compatibilityRoutes) {
    const adapter = read(legacyPath);
    if (!adapter.includes(target)) errors.push(`${legacyPath}: compatibility target missing -> ${target}`);
    if (!adapter.includes('location.replace')) errors.push(`${legacyPath}: compatibility redirect must preserve query/hash with location.replace`);
    if (adapter.length > 2500) errors.push(`${legacyPath}: legacy compatibility adapter contains too much substantive page content`);
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
}

if (errors.length) {
  console.error('Human guide validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Human guide validation passed.');
