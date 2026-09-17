import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-validator-failures-'));
const fixture = path.join(temp, 'guide');
let checks = 0;

function validate(script, expectedError) {
  const result = spawnSync(process.execPath, [path.join(fixture, 'tests', script)], {
    cwd: fixture,
    encoding: 'utf8',
    timeout: 30000
  });
  assert.ifError(result.error);
  assert.equal(result.signal, null, 'validator must exit normally');
  assert.equal(result.status, expectedError ? 1 : 0, result.stdout + result.stderr);
  if (expectedError) assert.ok(result.stderr.includes(expectedError), result.stderr);
  checks += 1;
}

function mutate(file, transform, script, expectedError) {
  const target = path.join(fixture, file);
  const original = fs.readFileSync(target, 'utf8');
  try {
    fs.writeFileSync(target, transform(original));
    validate(script, expectedError);
  } finally {
    fs.writeFileSync(target, original);
  }
}

try {
  fs.cpSync(root, fixture, {
    recursive: true,
    filter: (source) => !['.git', 'node_modules'].includes(path.basename(source))
  });
  validate('validate-guide.mjs');
  validate('validate-loop-engineering-contract.mjs');

  // Root contracts, drafts and history must receive the same link coverage as docs/.
  for (const file of ['LOOP_ENGINEERING_REQUIREMENTS.md', 'DASHBOARD_REQUIREMENTS.md',
    'DEVELOPMENT_SYSTEM_REQUIREMENTS.md', 'HUMAN_GUIDE_REQUIREMENTS.md',
    'WORK_QUEUE_REQUIREMENTS.md', 'REQUIREMENTS_DRAFT.md', 'PROJECT_LEARNINGS.md', 'UNRELEASED.md']) {
    mutate(file, (text) => text + '\n[Broken](missing-regression-target.md)\n',
      'validate-guide.mjs', `${file}: broken relative link -> missing-regression-target.md`);
  }

  // A future root document must be discovered without extending a filename list.
  const future = path.join(fixture, 'FUTURE_CONTRACT.md');
  fs.writeFileSync(future, '# Future contract\n\n[Valid](README.md)\n');
  validate('validate-guide.mjs');
  mutate('FUTURE_CONTRACT.md', () => '# Future contract\n\n[Broken](missing-regression-target.md)\n',
    'validate-guide.mjs', 'FUTURE_CONTRACT.md: broken relative link');
  mutate('FUTURE_CONTRACT.md', () => 'No heading\n',
    'validate-guide.mjs', 'FUTURE_CONTRACT.md: missing H1');
  mutate('FUTURE_CONTRACT.md', () => '# Future contract\n\n[Malformed](bad%ZZ.md)\n[Broken](missing-regression-target.md)\n',
    'validate-guide.mjs', 'FUTURE_CONTRACT.md: invalid relative link encoding');
  // Malformed encoding must not stop the remaining checks.
  mutate('FUTURE_CONTRACT.md', () => '# Future contract\n\n[Malformed](bad%ZZ.md)\n[Broken](missing-regression-target.md)\n',
    'validate-guide.mjs', 'FUTURE_CONTRACT.md: broken relative link');
  fs.rmSync(future);

  for (const [section, key, value, message] of [
    ['permissions', 'pushWorkingBranch', true, 'must deny remote working-branch push'],
    ['permissions', 'pushWorkingBranch', undefined, 'must deny remote working-branch push'],
    ['permissions', 'commit', undefined, 'should allow isolated working-branch commits'],
    ['verification', 'evidenceRequired', false, 'must require verification evidence'],
    ['verification', 'evidenceRequired', undefined, 'must require verification evidence']
  ]) {
    mutate('maintenance/loop-policy.example.json', (text) => {
      const policy = JSON.parse(text);
      policy[section][key] = value;
      return JSON.stringify(policy);
    }, 'validate-loop-engineering-contract.mjs', message);
  }
  validate('validate-guide.mjs');
  validate('validate-loop-engineering-contract.mjs');
  console.log(`Validator failure-detection regression passed: ${checks} checks.`);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
