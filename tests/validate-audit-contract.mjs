import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

function read(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    errors.push(`missing required audit file: ${rel}`);
    return '';
  }
  return fs.readFileSync(full, 'utf8');
}

function expectIncludes(rel, needles) {
  const text = read(rel);
  for (const needle of needles) {
    if (!text.includes(needle)) errors.push(`${rel}: missing audit contract -> ${needle}`);
  }
  return text;
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

const conversationOwner = 'docs/23-conversation-handoff-recovery.md';
const structureOwner = 'docs/22-task-first-structure-flow-research.md';

for (const rel of [conversationOwner, structureOwner]) read(rel);
if (fs.existsSync(path.join(root, 'docs/22-conversation-handoff-recovery.md'))) {
  errors.push('owner collision: old conversation handoff path docs/22-conversation-handoff-recovery.md still exists');
}

expectIncludes('README.md', [structureOwner, conversationOwner]);
expectIncludes('START_HERE.md', [structureOwner, conversationOwner]);
expectIncludes('docs/00-governance.md', [structureOwner, conversationOwner]);
expectIncludes('docs/21-rule-routing-preflight.md', ['STRUCTURE_FLOW', 'CONVERSATION_HANDOFF', conversationOwner]);

const routerText = read('maintenance/rule-router.json');
let router = null;
try {
  router = JSON.parse(routerText);
} catch (error) {
  errors.push(`maintenance/rule-router.json: invalid JSON -> ${error.message}`);
}

if (router) {
  if (router.owners?.STRUCTURE_FLOW !== structureOwner) {
    errors.push(`router: STRUCTURE_FLOW owner must remain ${structureOwner}`);
  }
  if (router.owners?.CONVERSATION_HANDOFF !== conversationOwner) {
    errors.push(`router: CONVERSATION_HANDOFF owner must be ${conversationOwner}`);
  }
  if (!(router.domains?.STRUCTURE_FLOW || []).includes(structureOwner)) {
    errors.push('router: STRUCTURE_FLOW domain lost docs/22');
  }
  if (!(router.domains?.CONVERSATION_HANDOFF || []).includes(conversationOwner)) {
    errors.push('router: CONVERSATION_HANDOFF domain lost docs/23');
  }
  if (!(router.signals?.CONVERSATION_STATE_RECOVERY?.docs || []).includes(conversationOwner)) {
    errors.push('router: CONVERSATION_STATE_RECOVERY does not route to docs/23');
  }

  const recoveryCase = (router.goldenCases || []).find((c) => c.id === 'conversation-handoff-recovery');
  if (!recoveryCase) {
    errors.push('router: missing conversation-handoff-recovery golden case');
  } else if (!(recoveryCase.mustInclude || []).includes(conversationOwner)) {
    errors.push('router: conversation-handoff-recovery golden case must include docs/23');
  }

  const structureCase = (router.goldenCases || []).find((c) => c.id === 'meaningful-structure-flow-requirements');
  if (!structureCase || !(structureCase.mustInclude || []).includes(structureOwner)) {
    errors.push('router: meaningful-structure-flow-requirements must preserve docs/22');
  }
}

for (const rel of [
  'templates/AGENTS_TEMPLATE.md',
  'templates/IMPLEMENTATION_CONVERSATION_TEMPLATE.md',
  'templates/REQUIREMENTS_CONVERSATION_TEMPLATE.md'
]) {
  const text = expectIncludes(rel, ['23-conversation-handoff-recovery.md']);
  if (text.includes('22-conversation-handoff-recovery.md')) {
    errors.push(`${rel}: stale conversation owner 22 reference remains`);
  }
}

const markdownFiles = [
  path.join(root, 'README.md'),
  path.join(root, 'START_HERE.md'),
  path.join(root, 'REQUIREMENTS.md'),
  ...walk(path.join(root, 'docs')),
  ...walk(path.join(root, 'templates')),
  ...walk(path.join(root, 'maintenance'))
].filter((file) => file.endsWith('.md') && fs.existsSync(file));

for (const file of markdownFiles) {
  const text = fs.readFileSync(file, 'utf8');
  if (text.includes('22-conversation-handoff-recovery.md')) {
    errors.push(`${path.relative(root, file)}: stale docs/22 conversation handoff reference`);
  }
}

const requirements = expectIncludes('REQUIREMENTS.md', [
  'Current Project Contract',
  'maintenance/research/requirements-decision-system.md',
  conversationOwner,
  structureOwner
]);
for (const staleProcedure of ['Owner Audit Axes', '### Research Domain 1', '### Research Domain 2']) {
  if (requirements.includes(staleProcedure)) {
    errors.push(`REQUIREMENTS.md: audit/research procedure leaked back into current contract -> ${staleProcedure}`);
  }
}

expectIncludes('docs/04-ui-ux-accessibility.md', [
  'Focus Not Obscured',
  'Target Size (Minimum)',
  'Dragging Movements',
  'Redundant Entry',
  'Accessible Authentication'
]);

const research = expectIncludes('docs/20-evidence-first-research.md', [
  'Decision Coverage + Research Saturation',
  'Countは透明性のための記録'
]);
if (/100件(?:規模|以上|未満)?/.test(research)) {
  errors.push('docs/20: fixed 100-source heuristic reintroduced');
}

expectIncludes('docs/06-security.md', [
  'Authentication / Authorization',
  'CSRF',
  'Content Security Policy',
  'File Upload / Import',
  'Public Endpoint / Abuse / Quota'
]);
expectIncludes('docs/11-electron-distribution.md', [
  'contextIsolation',
  'sandbox',
  'IPC sender',
  'payload',
  'shell.openExternal',
  'permission request handler',
  'CSP'
]);

expectIncludes('PROJECT_LEARNINGS.md', [
  '長期的に蓄積',
  'PL-F-013'
]);
expectIncludes('templates/PROJECT_LEARNINGS_TEMPLATE.md', [
  '継続蓄積'
]);

const workflow = read('.github/workflows/validate-guide.yml');
for (const match of workflow.matchAll(/^\s*uses:\s*([^\s#]+).*$/gm)) {
  const ref = match[1];
  if (ref.startsWith('./')) continue;
  const at = ref.lastIndexOf('@');
  if (at < 0 || !/^[0-9a-f]{40}$/i.test(ref.slice(at + 1))) {
    errors.push(`workflow: external action must be pinned to full commit SHA -> ${ref}`);
  }
}

if (errors.length) {
  console.error('Audit contract validation failed:\n');
  for (const error of [...new Set(errors)]) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Audit contract validation passed.');
