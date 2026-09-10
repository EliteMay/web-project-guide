import fs from 'node:fs';

const errors = [];
const requiredFiles = [
  'index.html',
  'rules.html',
  'ai-workflow.html',
  'work-dashboard.html',
  'human-guide.css',
  'mobile-fixes.css',
  'dashboard-data.json'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) errors.push(`missing human guide surface: ${file}`);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

if (errors.length === 0) {
  const rules = read('rules.html');
  const workflow = read('ai-workflow.html');
  const requirements = read('REQUIREMENTS.md');

  const routeIds = ['learning', 'web-deployment', 'browser-compatibility', 'external-integration'];
  for (const routeId of routeIds) {
    if (!rules.includes(`data-route="${routeId}"`)) {
      errors.push(`rules.html: missing current human route -> ${routeId}`);
    }
    if (!workflow.includes(`data-route="${routeId}"`)) {
      errors.push(`ai-workflow.html: missing current human route -> ${routeId}`);
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
