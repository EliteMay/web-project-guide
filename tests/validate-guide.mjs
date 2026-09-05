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
  'docs/17-visual-quality-baseline.md',
  'docs/18-domain-first-visual-research.md',
  'docs/19-game-development.md',
  'maintenance/review-policy.json',
  'catalog/failures.md',
  'catalog/success-patterns.md',
  'catalog/anti-patterns.md',
  'catalog/validated-visual-directions.md',
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
  '.github/workflows/validate-guide.yml'
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
  if (policy.ruleHygieneReview?.enabled !== true || policy.ruleHygieneReview?.singleNormativeOwner !== true) {
    errors.push('maintenance/review-policy.json: rule hygiene and single normative owner must remain enabled');
  }
  if (policy.ruleHygieneReview?.ruleAdditionMustCheckConsolidation !== true) {
    errors.push('maintenance/review-policy.json: rule additions must check consolidation');
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
const startHere = fs.readFileSync(path.join(root, 'START_HERE.md'), 'utf8');

if (!readme.includes('[START HERE](START_HERE.md)')) {
  errors.push('README.md must link to START_HERE.md');
}

const numberedDocs = fs.readdirSync(path.join(root, 'docs'))
  .filter((name) => /^\d{2}-.+\.md$/.test(name))
  .sort();
for (const doc of numberedDocs) {
  if (!readme.includes(`docs/${doc}`)) {
    errors.push(`README.md must route to numbered owner doc: docs/${doc}`);
  }
}

if (!startHere.includes('docs/18-domain-first-visual-research.md')) {
  errors.push('START_HERE.md must route meaningful visual changes to docs/18-domain-first-visual-research.md');
}
if (!startHere.includes('docs/00-governance.md') || !/Rule Budget/.test(startHere)) {
  errors.push('START_HERE.md must route guide changes through governance Rule Budget');
}
if (!startHere.includes('docs/05-performance-reliability.md')) {
  errors.push('START_HERE.md must keep a route to docs/05-performance-reliability.md');
}
if (!startHere.includes('docs/19-game-development.md') || !/ゲームを作る \/ 直す/.test(startHere)) {
  errors.push('START_HERE.md must route game work to docs/19-game-development.md');
}

if (!readme.includes('[Project Learnings](templates/PROJECT_LEARNINGS_TEMPLATE.md)')) {
  errors.push('README.md must link to templates/PROJECT_LEARNINGS_TEMPLATE.md');
}
if (!readme.includes('[AGENTS](templates/AGENTS_TEMPLATE.md)')) {
  errors.push('README.md must link to templates/AGENTS_TEMPLATE.md');
}

const governance = fs.readFileSync(path.join(root, 'docs/00-governance.md'), 'utf8');
if (!governance.includes('[Visual Quality Baseline](17-visual-quality-baseline.md)') || !/Baseline自体はUser-facing UIで必須/.test(governance)) {
  errors.push('docs/00-governance.md must keep the user-facing Visual Quality Baseline mandatory');
}
if (!/Rule Budget/.test(governance) || !/Single Normative Owner/.test(governance)) {
  errors.push('docs/00-governance.md must define Rule Budget and Single Normative Owner');
}
if (!/Orphan Rule/.test(governance)) {
  errors.push('docs/00-governance.md must guard against orphan rules');
}
if (!/Page Load Performance \/ Runtime responsiveness \/ Reliability/.test(governance) || !/docs\/05-performance-reliability\.md/.test(governance)) {
  errors.push('docs/00-governance.md must register docs/05 as the performance normative owner');
}
if (!/Game-specific development \/ completion \/ playtest/.test(governance) || !/docs\/19-game-development\.md/.test(governance)) {
  errors.push('docs/00-governance.md must register docs/19 as the Game Development normative owner');
}

const performanceGuide = fs.readFileSync(path.join(root, 'docs/05-performance-reliability.md'), 'utf8');
for (const required of [
  'Page Load Performance全体',
  'Critical',
  'Deferred',
  'On Demand',
  'Default Soft Budget / Review Trigger',
  'Review Trigger超過は自動Failではありません',
  'Repository総容量',
  'Cold Load',
  'Performance確認の強度'
]) {
  if (!performanceGuide.includes(required)) {
    errors.push(`docs/05-performance-reliability.md: missing performance contract -> ${required}`);
  }
}
if (!/小規模.*STATIC.*複雑な最適化Architectureを機械的に追加しません/.test(performanceGuide)) {
  errors.push('docs/05 must not force complex performance architecture on small STATIC sites');
}

const dataStorageGuide = fs.readFileSync(path.join(root, 'docs/03-data-storage.md'), 'utf8');
if (!dataStorageGuide.includes('05-performance-reliability.md') || !/Initial Load.*Soft Budget/.test(dataStorageGuide)) {
  errors.push('docs/03 must keep data structure ownership while routing page-load timing and budgets to docs/05');
}

const githubPagesGuide = fs.readFileSync(path.join(root, 'docs/08-github-pages.md'), 'utf8');
if (!githubPagesGuide.includes('05-performance-reliability.md') || !/GitHub Pages固有のCache Busting \/ Service Worker更新/.test(githubPagesGuide)) {
  errors.push('docs/08 must keep GitHub Pages cache-update ownership and route page-load performance to docs/05');
}

const dependencyAssetGuide = fs.readFileSync(path.join(root, 'docs/13-dependencies-assets.md'), 'utf8');
if (!dependencyAssetGuide.includes('05-performance-reliability.md') || !/この章へ数値Ruleを複製しません/.test(dependencyAssetGuide)) {
  errors.push('docs/13 must keep dependency/asset ownership without duplicating page-load budgets');
}

const visualBaseline = fs.readFileSync(path.join(root, 'docs/17-visual-quality-baseline.md'), 'utf8');
if (!/MUST: User-facing UIはVisual Quality Baselineを満たす/.test(visualBaseline) || !/Visual Verification/.test(visualBaseline)) {
  errors.push('docs/17-visual-quality-baseline.md must define mandatory baseline and visual verification');
}
if (!visualBaseline.includes('18-domain-first-visual-research.md')) {
  errors.push('docs/17 must route major visual redesign workflow to docs/18');
}

const domainResearch = fs.readFileSync(path.join(root, 'docs/18-domain-first-visual-research.md'), 'utf8');
if (!/Meaningful Visual Change/.test(domainResearch) || !/Visual Foundation Reset/.test(domainResearch) || !/KEEP \/ FIX \/ REMOVE/.test(domainResearch)) {
  errors.push('docs/18 must own domain research, KEEP/FIX/REMOVE, and Visual Foundation Reset');
}

const gameGuide = fs.readFileSync(path.join(root, 'docs/19-game-development.md'), 'utf8');
for (const required of [
  'Game-specificな設計・完成判定・Playtest・Phase管理のNormative Owner',
  'Prototype',
  'Playable MVP',
  'Main Game Complete',
  'Primary Completion Condition',
  'Vertical Slice First',
  'Core Before Variety',
  'Actual Playtest',
  'Simulation Entity数 = Render Object数ではありません',
  'Small Gameへ大規模Ruleを機械的に適用しない'
]) {
  if (!gameGuide.includes(required)) {
    errors.push(`docs/19-game-development.md: missing game contract -> ${required}`);
  }
}
for (const owner of [
  '03-data-storage.md',
  '04-ui-ux-accessibility.md',
  '05-performance-reliability.md',
  '07-testing-quality.md',
  '12-project-profiles.md',
  '13-dependencies-assets.md',
  '17-visual-quality-baseline.md',
  '18-domain-first-visual-research.md'
]) {
  if (!gameGuide.includes(owner)) {
    errors.push(`docs/19 must preserve specialist owner boundary -> ${owner}`);
  }
}

const testingGuide = fs.readFileSync(path.join(root, 'docs/07-testing-quality.md'), 'utf8');
if (!testingGuide.includes('../templates/QUALITY_CHECKLIST.md')) {
  errors.push('docs/07 must route operational completion checks to templates/QUALITY_CHECKLIST.md');
}
if (!testingGuide.includes('05-performance-reliability.md') || !/Soft BudgetのReview Trigger超過を自動Failへ読み替えない/.test(testingGuide)) {
  errors.push('docs/07 must keep testing ownership while routing performance criteria to docs/05');
}

const projectProfiles = fs.readFileSync(path.join(root, 'docs/12-project-profiles.md'), 'utf8');
if (!/^## GAME$/m.test(projectProfiles) || !projectProfiles.includes('19-game-development.md') || !/GAME-SMALL.*GAME-LARGE/.test(projectProfiles)) {
  errors.push('docs/12 must define a composable GAME profile and route details to docs/19 without size-profile proliferation');
}

const requirementsGuide = fs.readFileSync(path.join(root, 'docs/01-requirements.md'), 'utf8');
if (!/^## Game Requirements$/m.test(requirementsGuide) || !requirementsGuide.includes('19-game-development.md') || !/Primary Completion Condition/.test(requirementsGuide)) {
  errors.push('docs/01 must keep a minimal GAME requirements entry that routes to docs/19');
}

const requirementsTemplate = fs.readFileSync(path.join(root, 'templates/REQUIREMENTS_TEMPLATE.md'), 'utf8');
if (!/Visual Quality Baseline: Required \/ Not applicable/.test(requirementsTemplate) || !/Visual Ambition: baseline \/ high \/ flagship/.test(requirementsTemplate)) {
  errors.push('REQUIREMENTS_TEMPLATE.md must separate mandatory Visual Quality Baseline from Visual Ambition');
}
if (!/Profiles:.*GAME/.test(requirementsTemplate) || !/Game Development — `GAME` Profileのみ/.test(requirementsTemplate) || !requirementsTemplate.includes('../docs/19-game-development.md') || !/Primary Completion Condition/.test(requirementsTemplate)) {
  errors.push('REQUIREMENTS_TEMPLATE.md must include a compact GAME section routed to docs/19');
}

const qualityChecklist = fs.readFileSync(path.join(root, 'templates/QUALITY_CHECKLIST.md'), 'utf8');
if (!/### Visual Quality Baseline — User-facing UIでは必須/.test(qualityChecklist) || !/最終状態をBrowser \/ Screenshot等で確認/.test(qualityChecklist)) {
  errors.push('QUALITY_CHECKLIST.md must keep visual baseline in Minimum and require final visual verification');
}
if (!qualityChecklist.includes('../docs/05-performance-reliability.md') || !/Soft BudgetのReview Trigger超過/.test(qualityChecklist) || !/Cold Load/.test(qualityChecklist)) {
  errors.push('QUALITY_CHECKLIST.md must keep concise executable page-load performance checks');
}
if (!/^### GAME$/m.test(qualityChecklist) || !qualityChecklist.includes('../docs/19-game-development.md') || !/Actual Playtest/.test(qualityChecklist) || !/Primary Completion Condition/.test(qualityChecklist)) {
  errors.push('QUALITY_CHECKLIST.md must include concise GAME runtime/playtest completion checks');
}

const projectManagement = fs.readFileSync(path.join(root, 'docs/10-project-management.md'), 'utf8');
if (!/### CONDITIONAL MUST: 公開して使えるWebサイトURLがあるRepository/.test(projectManagement) || !/About欄にある `Website`/.test(projectManagement) || !/README上部/.test(projectManagement)) {
  errors.push('docs/10 must require visible Website and README links for repositories with a usable public site URL');
}

const readmeTemplate = fs.readFileSync(path.join(root, 'templates/README_TEMPLATE.md'), 'utf8');
if (!/> Live Site:/.test(readmeTemplate) || !/About欄 `Website`/.test(readmeTemplate)) {
  errors.push('README_TEMPLATE.md must keep the visible Live Site link and Repository Website guidance');
}
if (!/公開して使えるSite URLがある場合、Repository Aboutの`Website`へ代表URLを設定し、README上部からもSiteを開ける/.test(qualityChecklist)) {
  errors.push('QUALITY_CHECKLIST.md must verify both Repository Website and README top-level site links');
}

const agentsTemplate = fs.readFileSync(path.join(root, 'templates/AGENTS_TEMPLATE.md'), 'utf8');
if (!/Router|入口/.test(agentsTemplate) || !/Source of Truth/.test(agentsTemplate)) {
  errors.push('templates/AGENTS_TEMPLATE.md must clearly remain a router, not a duplicated Source of Truth');
}
if (!/Remote Diagnostic Handoff/.test(agentsTemplate) || !/service_role/.test(agentsTemplate)) {
  errors.push('templates/AGENTS_TEMPLATE.md must route agents to remote diagnostics without exposing service_role');
}

const crossRepoGuide = fs.readFileSync(path.join(root, 'docs/16-cross-repository-github-infrastructure.md'), 'utf8');
if (!/EliteMay\/\.github/.test(crossRepoGuide) || !/Commit SHA/.test(crossRepoGuide) || !/Project固有Validator/.test(crossRepoGuide)) {
  errors.push('docs/16 must keep the EliteMay/.github shared-infrastructure, SHA-pinning, and project-specific validator boundaries');
}
if (!/EliteMay\/\.github/.test(readme)) {
  errors.push('README.md must point shared GitHub implementation to EliteMay/.github');
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
