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
  'docs/03-data-storage.md',
  'docs/07-testing-quality.md',
  'docs/08-github-pages.md',
  'docs/10-project-management.md',
  'docs/11-electron-distribution.md',
  'docs/12-project-profiles.md',
  'docs/13-dependencies-assets.md',
  'catalog/failures.md',
  'catalog/success-patterns.md',
  'catalog/anti-patterns.md',
  'templates/REQUIREMENTS_TEMPLATE.md',
  'templates/QUALITY_CHECKLIST.md',
  'templates/WORK_REPORT_TEMPLATE.md',
  'templates/README_TEMPLATE.md',
  'templates/SPEC_TEMPLATE.md',
  'templates/ADR_TEMPLATE.md',
  'templates/PROJECT_RULES_TEMPLATE.md'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    errors.push(`Missing required file: ${file}`);
  }
}

try {
  const version = JSON.parse(fs.readFileSync(path.join(root, 'guide-version.json'), 'utf8'));
  if (!/^\d+\.\d+\.\d+$/.test(version.guideVersion ?? '')) {
    errors.push('guide-version.json: guideVersion must be SemVer-like X.Y.Z');
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(version.updated ?? '')) {
    errors.push('guide-version.json: updated must be YYYY-MM-DD');
  }
} catch (error) {
  errors.push(`guide-version.json is invalid: ${error.message}`);
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

if (errors.length) {
  console.error('Guide validation failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Guide validation passed: ${markdownFiles.length} Markdown files checked.`);
