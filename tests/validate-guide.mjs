import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

const requiredFiles = [
  'README.md',
  'START_HERE.md',
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
  'maintenance/review-policy.json',
  'catalog/failures.md',
  'catalog/success-patterns.md',
  'catalog/anti-patterns.md',
  'templates/REQUIREMENTS_TEMPLATE.md',
  'templates/QUALITY_CHECKLIST.md',
  'templates/WORK_REPORT_TEMPLATE.md',
  'templates/README_TEMPLATE.md',
  'templates/SPEC_TEMPLATE.md',
  'templates/ADR_TEMPLATE.md',
  'templates/PROJECT_RULES_TEMPLATE.md',
  'templates/AGENTS_TEMPLATE.md',
  'templates/PROJECT_LEARNINGS_TEMPLATE.md',
  'templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json',
  'templates/CHANGELOG_TEMPLATE.md',
  'references/web-standards.md',
  '.github/workflows/validate-guide.yml',
  '.github/workflows/reusable-web-baseline.yml'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    errors.push(`Missing required file: ${file}`);
  }
}

let guideVersion = null;
let guideUpdated = null;
try {
  const version = JSON.parse(fs.readFileSync(path.join(root, 'guide-version.json'), 'utf8'));
  guideVersion = version.guideVersion ?? null;
  guideUpdated = version.updated ?? null;
  if (!/^\d+\.\d+\.\d+$/.test(guideVersion ?? '')) {
    errors.push('guide-version.json: guideVersion must be SemVer-like X.Y.Z');
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(guideUpdated ?? '')) {
    errors.push('guide-version.json: updated must be YYYY-MM-DD');
  }
  if (!['active', 'deprecated'].includes(version.status)) {
    errors.push('guide-version.json: status must be active or deprecated');
  }
} catch (error) {
  errors.push(`guide-version.json is invalid: ${error.message}`);
}

try {
  const policy = JSON.parse(fs.readFileSync(path.join(root, 'maintenance/review-policy.json'), 'utf8'));
  if (policy.schemaVersion !== 1) {
    errors.push('maintenance/review-policy.json: schemaVersion must currently be 1');
  }
  if (policy.targetRepository !== 'EliteMay/web-project-guide') {
    errors.push('maintenance/review-policy.json: targetRepository must be EliteMay/web-project-guide');
  }
  if (policy.repositoryDiscovery?.owner !== 'EliteMay') {
    errors.push('maintenance/review-policy.json: repositoryDiscovery.owner must be EliteMay');
  }
  if (policy.repositoryDiscovery?.otherRepositoriesWriteMode !== 'read-only') {
    errors.push('maintenance/review-policy.json: other repositories must remain read-only');
  }
  if (!Array.isArray(policy.webSources) || policy.webSources.length < 5) {
    errors.push('maintenance/review-policy.json: define authoritative webSources');
  } else {
    for (const source of policy.webSources) {
      if (!source?.name || !/^https:\/\//.test(source?.url ?? '')) {
        errors.push('maintenance/review-policy.json: every webSource requires name and https URL');
      }
    }
  }
  if (policy.discoveryReferences && !Array.isArray(policy.discoveryReferences)) {
    errors.push('maintenance/review-policy.json: discoveryReferences must be an array when present');
  }
  if (policy.changePolicy?.noChangeNoCommit !== true) {
    errors.push('maintenance/review-policy.json: noChangeNoCommit must remain true');
  }
} catch (error) {
  errors.push(`maintenance/review-policy.json is invalid: ${error.message}`);
}

try {
  const diagnostics = JSON.parse(fs.readFileSync(path.join(root, 'templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json'), 'utf8'));
  if (diagnostics.schemaVersion !== 2) {
    errors.push('templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json: schemaVersion must currently be 2');
  }
  for (const key of ['project', 'capture', 'environment', 'runtime', 'breadcrumbs', 'errors', 'networkFailures', 'storage', 'handoff']) {
    if (!(key in diagnostics)) errors.push(`templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json: missing ${key}`);
  }
  if (!Array.isArray(diagnostics.breadcrumbs) || !Array.isArray(diagnostics.errors) || !Array.isArray(diagnostics.networkFailures)) {
    errors.push('templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json: breadcrumbs/errors/networkFailures must be arrays');
  }
  if (diagnostics.handoff?.sanitized !== true) {
    errors.push('templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json: handoff.sanitized must default to true');
  }
  if (diagnostics.handoff?.containsBinary !== false || diagnostics.handoff?.containsSecrets !== false) {
    errors.push('templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json: handoff binary/secret flags must default to false');
  }
} catch (error) {
  errors.push(`templates/DIAGNOSTICS_SCHEMA_TEMPLATE.json is invalid: ${error.message}`);
}

function walk(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...walk(full));
    else result.push(full);
  }
  return result;
}

const markdownFiles = walk(root).filter((file) => file.endsWith('.md'));
const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;

for (const file of markdownFiles) {
  const text = fs.readFileSync(file, 'utf8');
  if (!/^#\s+\S/m.test(text)) {
    errors.push(`${path.relative(root, file)}: missing H1 heading`);
  }
  for (const match of text.matchAll(linkPattern)) {
    let target = match[1].trim();
    if (!target || target.startsWith('#') || /^(https?:|mailto:)/i.test(target)) continue;
    target = target.split('#')[0].split('?')[0];
    if (!target) continue;
    try { target = decodeURIComponent(target); } catch {}
    const resolved = path.resolve(path.dirname(file), target);
    if (!resolved.startsWith(root)) {
      errors.push(`${path.relative(root, file)}: link escapes repository -> ${match[1]}`);
      continue;
    }
    if (!fs.existsSync(resolved)) {
      errors.push(`${path.relative(root, file)}: broken relative link -> ${match[1]}`);
    }
  }
}

const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
if (!readme.includes('[START HERE](START_HERE.md)')) {
  errors.push('README.md must link to START_HERE.md');
}
if (!readme.includes('[14 Continuous Improvement](docs/14-continuous-improvement.md)')) {
  errors.push('README.md must link to docs/14-continuous-improvement.md');
}
if (!readme.includes('[15 Development Observability / Project Memory](docs/15-development-observability.md)')) {
  errors.push('README.md must link to docs/15-development-observability.md');
}
if (!readme.includes('[16 Cross-Repository GitHub Infrastructure](docs/16-cross-repository-github-infrastructure.md)')) {
  errors.push('README.md must link to docs/16-cross-repository-github-infrastructure.md');
}
if (!readme.includes('[Project Learnings](templates/PROJECT_LEARNINGS_TEMPLATE.md)')) {
  errors.push('README.md must link to templates/PROJECT_LEARNINGS_TEMPLATE.md');
}
if (!readme.includes('[AGENTS](templates/AGENTS_TEMPLATE.md)')) {
  errors.push('README.md must link to templates/AGENTS_TEMPLATE.md');
}

const agentsTemplate = fs.readFileSync(path.join(root, 'templates/AGENTS_TEMPLATE.md'), 'utf8');
if (!/Router|入口/.test(agentsTemplate) || !/Source of Truth/.test(agentsTemplate)) {
  errors.push('templates/AGENTS_TEMPLATE.md must clearly remain a router, not a duplicated Source of Truth');
}
if (!/Remote Diagnostic Handoff/.test(agentsTemplate) || !/service_role/.test(agentsTemplate)) {
  errors.push('templates/AGENTS_TEMPLATE.md must route agents to remote diagnostics without exposing service_role');
}

const reusableWorkflow = fs.readFileSync(path.join(root, '.github/workflows/reusable-web-baseline.yml'), 'utf8');
if (!/workflow_call:/.test(reusableWorkflow) || !/permissions:\n\s+contents: read/.test(reusableWorkflow)) {
  errors.push('reusable-web-baseline.yml must remain a workflow_call workflow with read-only contents permission');
}

try {
  const changelog = fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8');
  const latest = changelog.match(/^##\s+(\d+\.\d+\.\d+)\s+-\s+(\d{4}-\d{2}-\d{2})/m);
  if (!latest) {
    errors.push('CHANGELOG.md: latest release heading not found');
  } else {
    if (guideVersion && latest[1] !== guideVersion) {
      errors.push(`CHANGELOG latest version ${latest[1]} does not match guide-version ${guideVersion}`);
    }
    if (guideUpdated && latest[2] !== guideUpdated) {
      errors.push(`CHANGELOG latest date ${latest[2]} does not match guide-version updated ${guideUpdated}`);
    }
  }
} catch (error) {
  errors.push(`CHANGELOG.md validation failed: ${error.message}`);
}

const catalogSpecs = [
  ['F', 'catalog/failures.md'],
  ['S', 'catalog/success-patterns.md'],
  ['AP', 'catalog/anti-patterns.md']
];
const catalogIds = new Map();
for (const [prefix, rel] of catalogSpecs) {
  const text = fs.readFileSync(path.join(root, rel), 'utf8');
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

console.log(`Guide validation passed: ${markdownFiles.length} Markdown files checked / ${catalogIds.size} catalog IDs validated / version ${guideVersion}.`);
