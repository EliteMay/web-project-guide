import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

const requiredFiles = [
  'README.md',
  'START_HERE.md',
  'REQUIREMENTS.md',
  'guide-version.json',
  'CHANGELOG.md',
  '作業報告書.md',
  'docs/00-governance.md',
  'docs/01-requirements.md',
  'docs/02-architecture.md',
  'docs/03-data-storage.md',
  'docs/04-ui-ux-accessibility.md',
  'docs/05-performance-reliability.md',
  'docs/06-security.md',
  'docs/07-testing-quality.md',
  'docs/08-github-pages.md',
  'docs/09-maintenance.md',
  'docs/10-project-management.md',
  'docs/11-electron-distribution.md',
  'docs/12-project-profiles.md',
  'docs/13-dependencies-assets.md',
  'docs/14-continuous-improvement.md',
  'docs/15-development-observability.md',
  'docs/16-cross-repository-github-infrastructure.md',
  'docs/17-visual-quality-baseline.md',
  'docs/18-domain-first-visual-research.md',
  'docs/19-game-development.md',
  'docs/20-evidence-first-research.md',
  'docs/21-rule-routing-preflight.md',
  'maintenance/review-policy.json',
  'maintenance/rule-router.json',
  'maintenance/rule-router.schema.json',
  'catalog/failures.md',
  'catalog/success-patterns.md',
  'catalog/anti-patterns.md',
  'catalog/validated-visual-directions.md',
  'templates/REQUIREMENTS_TEMPLATE.md',
  'templates/requirements/README.md',
  'templates/requirements/VISUAL.md',
  'templates/requirements/LEARNING.md',
  'templates/requirements/GAME.md',
  'templates/requirements/DIAGNOSTICS.md',
  'templates/QUALITY_CHECKLIST.md',
  'templates/README_TEMPLATE.md',
  'templates/SPEC_TEMPLATE.md',
  'templates/PROJECT_RULES_TEMPLATE.md',
  'templates/AGENTS_TEMPLATE.md',
  'templates/ADR_TEMPLATE.md',
  'templates/WORK_REPORT_TEMPLATE.md',
  'templates/PROJECT_LEARNINGS_TEMPLATE.md',
  'templates/CHANGELOG_TEMPLATE.md',
  'templates/REQUIREMENTS_CONVERSATION_TEMPLATE.md',
  'templates/IMPLEMENTATION_CONVERSATION_TEMPLATE.md',
  'templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json'
];

for (const rel of requiredFiles) {
  if (!fs.existsSync(path.join(root, rel))) errors.push(`missing required file: ${rel}`);
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function readJson(rel) {
  try {
    return JSON.parse(read(rel));
  } catch (error) {
    errors.push(`${rel}: invalid JSON -> ${error.message}`);
    return null;
  }
}

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const markdownFiles = [
  ...walk(path.join(root, 'docs')),
  ...walk(path.join(root, 'catalog')),
  ...walk(path.join(root, 'references')),
  ...walk(path.join(root, 'templates')),
  path.join(root, 'README.md'),
  path.join(root, 'START_HERE.md'),
  path.join(root, 'REQUIREMENTS.md'),
  path.join(root, 'CHANGELOG.md'),
  path.join(root, '作業報告書.md')
].filter((file) => file.endsWith('.md') && fs.existsSync(file));

for (const file of markdownFiles) {
  const rel = path.relative(root, file);
  const text = fs.readFileSync(file, 'utf8');
  if (!/^#\s+\S+/m.test(text)) errors.push(`${rel}: missing H1`);

  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].trim();
    if (!target || target.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
    const withoutAnchor = target.split('#')[0].split('?')[0];
    if (!withoutAnchor) continue;
    const resolved = path.resolve(path.dirname(file), decodeURIComponent(withoutAnchor));
    if (!fs.existsSync(resolved)) errors.push(`${rel}: broken relative link -> ${target}`);
  }
}

const versionMeta = readJson('guide-version.json');
let guideVersion = null;
let guideUpdated = null;
if (versionMeta) {
  guideVersion = versionMeta.guideVersion;
  guideUpdated = versionMeta.updated;
  if (!/^\d+\.\d+\.\d+$/.test(guideVersion || '')) errors.push('guide-version.json: invalid guideVersion');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(guideUpdated || '')) errors.push('guide-version.json: invalid updated date');
}

const changelog = read('CHANGELOG.md');
const latestRelease = changelog.match(/^##\s+(\d+\.\d+\.\d+)\s+-\s+(\d{4}-\d{2}-\d{2})/m);
if (!latestRelease) {
  errors.push('CHANGELOG.md: latest release heading not found');
} else if (versionMeta) {
  if (latestRelease[1] !== guideVersion) errors.push(`CHANGELOG latest version ${latestRelease[1]} != guide-version ${guideVersion}`);
  if (latestRelease[2] !== guideUpdated) errors.push(`CHANGELOG latest date ${latestRelease[2]} != guide-version updated ${guideUpdated}`);
}

const requirements = read('REQUIREMENTS.md');
if (/Adopted Guide Version:\s*`?\d+\.\d+\.\d+/i.test(requirements)) {
  errors.push('REQUIREMENTS.md: guide current version must not be duplicated; use guide-version.json');
}
if (!/Current Contract|現在のProject Contract/.test(requirements)) {
  errors.push('REQUIREMENTS.md: must identify itself as the current project contract');
}

const readme = read('README.md');
const startHere = read('START_HERE.md');
const governance = read('docs/00-governance.md');
const routingGuide = read('docs/21-rule-routing-preflight.md');

for (const requiredLink of [
  'docs/21-rule-routing-preflight.md',
  'maintenance/rule-router.json'
]) {
  if (!readme.includes(requiredLink)) errors.push(`README.md: missing routing entry -> ${requiredLink}`);
}
if (!startHere.includes('docs/21-rule-routing-preflight.md')) errors.push('START_HERE.md: missing Rule Routing / Preflight route');
if (!governance.includes('docs/21-rule-routing-preflight.md') && !governance.includes('21-rule-routing-preflight.md')) {
  errors.push('docs/00-governance.md: missing Rule Routing owner registration');
}
if (!routingGuide.includes('../maintenance/rule-router.json')) errors.push('docs/21: missing machine router link');

const requirementTemplate = read('templates/REQUIREMENTS_TEMPLATE.md');
for (const pack of [
  'requirements/README.md',
  'requirements/VISUAL.md',
  'requirements/LEARNING.md',
  'requirements/GAME.md',
  'requirements/DIAGNOSTICS.md'
]) {
  if (!requirementTemplate.includes(pack)) errors.push(`REQUIREMENTS_TEMPLATE.md: missing conditional pack route -> ${pack}`);
}

const qualityChecklist = read('templates/QUALITY_CHECKLIST.md');
if (!/^## Conditional Routing$/m.test(qualityChecklist)) {
  errors.push('QUALITY_CHECKLIST.md: missing Conditional Routing section');
}

const visualBaseline = read('docs/17-visual-quality-baseline.md');
for (const ownerLink of ['04-ui-ux-accessibility.md', '18-domain-first-visual-research.md']) {
  if (!visualBaseline.includes(ownerLink)) errors.push(`docs/17: missing visual owner route -> ${ownerLink}`);
}
if (!/^## Minimum Completion Gate$/m.test(visualBaseline)) {
  errors.push('docs/17: missing Minimum Completion Gate');
}

const pagesOwner = read('docs/08-github-pages.md');
if (!/^## 公開URL \/ Repository導線$/m.test(pagesOwner)) {
  errors.push('docs/08: missing public URL / repository discoverability section');
}

for (const [rel, section] of [
  ['templates/README_TEMPLATE.md', 'Source of Truth'],
  ['templates/SPEC_TEMPLATE.md', 'Runtime / Architecture'],
  ['templates/PROJECT_RULES_TEMPLATE.md', 'Project-specific Priority / Override']
]) {
  if (!read(rel).includes(section)) errors.push(`${rel}: missing responsibility marker -> ${section}`);
}

const router = readJson('maintenance/rule-router.json');
readJson('maintenance/rule-router.schema.json');
readJson('maintenance/review-policy.json');
readJson('templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json');

if (router) {
  if (router.behaviorOwner !== 'docs/21-rule-routing-preflight.md') {
    errors.push('rule-router.json: behaviorOwner must be docs/21-rule-routing-preflight.md');
  }

  const referencedDocs = new Set();
  for (const rel of Object.values(router.owners || {})) referencedDocs.add(rel);
  for (const rels of Object.values(router.workTypes || {})) for (const rel of rels) referencedDocs.add(rel);
  for (const rels of Object.values(router.domains || {})) for (const rel of rels) referencedDocs.add(rel);
  for (const signal of Object.values(router.signals || {})) for (const rel of signal.docs || []) referencedDocs.add(rel);
  for (const gate of Object.values(router.gates || {})) referencedDocs.add(gate.owner);

  for (const rel of referencedDocs) {
    if (!fs.existsSync(path.join(root, rel))) errors.push(`rule-router.json: referenced doc does not exist -> ${rel}`);
  }

  const gateIds = Object.keys(router.gates || {});
  if (new Set(gateIds).size !== gateIds.length) errors.push('rule-router.json: duplicate gate id');
  for (const [gateId, gate] of Object.entries(router.gates || {})) {
    if (!gate.owner) errors.push(`rule-router.json: ${gateId} missing owner`);
    if (!Array.isArray(gate.when) || gate.when.length === 0) errors.push(`rule-router.json: ${gateId} missing trigger`);
  }

  function resolveCase(testCase) {
    const docs = new Set(router.workTypes?.[testCase.workType] || []);
    for (const domain of testCase.domains || []) {
      for (const rel of router.domains?.[domain] || []) docs.add(rel);
    }
    for (const signalName of testCase.signals || []) {
      for (const rel of router.signals?.[signalName]?.docs || []) docs.add(rel);
    }
    return docs;
  }

  const caseIds = new Set();
  for (const testCase of router.goldenCases || []) {
    if (caseIds.has(testCase.id)) errors.push(`rule-router.json: duplicate golden case id -> ${testCase.id}`);
    caseIds.add(testCase.id);
    const resolved = resolveCase(testCase);
    for (const rel of testCase.mustInclude || []) {
      if (!resolved.has(rel)) errors.push(`routing golden case ${testCase.id}: missing required route -> ${rel}`);
    }
    for (const rel of testCase.mustNotRequire || []) {
      if (resolved.has(rel)) errors.push(`routing golden case ${testCase.id}: over-routed -> ${rel}`);
    }
  }
}

const catalogSpecs = [
  ['F', 'catalog/failures.md'],
  ['S', 'catalog/success-patterns.md'],
  ['AP', 'catalog/anti-patterns.md']
];
const catalogIds = new Map();
for (const [prefix, rel] of catalogSpecs) {
  const text = read(rel);
  const ids = [...text.matchAll(new RegExp(`^##\\s+(${prefix}-\\d{3})\\b`, 'gm'))].map((m) => m[1]);
  if (!ids.length) errors.push(`${rel}: no ${prefix} catalog IDs found`);
  if (new Set(ids).size !== ids.length) errors.push(`${rel}: duplicate ${prefix} catalog ID`);
  for (const id of ids) catalogIds.set(id, rel);
}

for (const file of markdownFiles) {
  const rel = path.relative(root, file);
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/\b(?:AP|F|S)-\d{3}\b/g)) {
    const id = match[0];
    if (!catalogIds.has(id)) errors.push(`${rel}: references undefined catalog ID ${id}`);
  }
}

if (errors.length) {
  console.error('Guide validation failed:\n');
  for (const error of [...new Set(errors)]) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Guide validation passed: ${markdownFiles.length} Markdown files / ${catalogIds.size} catalog IDs / ${Object.keys(router?.gates || {}).length} gates / version ${guideVersion}.`);
