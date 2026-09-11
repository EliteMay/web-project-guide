import fs from 'node:fs';

const errors = [];
const read = (file) => fs.readFileSync(file, 'utf8');

const projectManagement = read('docs/10-project-management.md');
const startHere = read('START_HERE.md');

for (const required of [
  '## Failure / Bug Root Cause Workflow',
  'MUST: 症状だけを直して完成扱いにしない',
  'Root Cause / Rule Application / Workflow / Regression Guardを修正',
  'なぜそのRuleが実際の作業経路へ届かなかったか',
  '再発Scenarioを含めてValidation'
]) {
  if (!projectManagement.includes(required)) {
    errors.push(`docs/10: missing root-cause-first failure contract -> ${required}`);
  }
}

const bugFixSection = startHere.match(/## 既存サイトのBug Fix[\s\S]*?(?=\n## )/)?.[0] ?? '';
if (!bugFixSection.includes('docs/10-project-management.md')) {
  errors.push('START_HERE.md: Bug Fix route must continue to reach docs/10 root-cause workflow');
}

if (errors.length) {
  console.error('Root-cause workflow validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Root-cause workflow validation passed.');
