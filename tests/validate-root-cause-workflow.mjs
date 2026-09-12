import fs from 'node:fs';

const errors = [];
const read = (file) => fs.readFileSync(file, 'utf8');
const includesAny = (text, values) => values.some((value) => text.includes(value));

const projectManagement = read('docs/10-project-management.md');
const conversationRecovery = read('docs/23-conversation-handoff-recovery.md');
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

for (const required of [
  'MUST: Automatic Resume前に1回だけUser確認する',
  'Userが直前のResume候補を「違う」と否定',
  'MUST: Resume誤判定はRoot-Cause-firstで処理する',
  '別候補へ進む前にRoot Cause / Failure Mechanismを確認している'
]) {
  if (!conversationRecovery.includes(required)) {
    errors.push(`docs/23: missing automatic-resume confirmation/root-cause contract -> ${required}`);
  }
}

if (!includesAny(conversationRecovery, [
  'High ConfidenceだけではResumeを開始しない',
  '自動推定WorkstreamならConfirmation Gateへ進みます',
  '自動推定した既存WorkstreamはConfirmation Gateを通るまでResume済みとして扱いません'
])) {
  errors.push('docs/23: high-confidence candidate must still require confirmation before inferred resume');
}

if (!includesAny(conversationRecovery, [
  '[10 Project Management - Failure / Bug Root Cause Workflow](10-project-management.md#failure--bug-root-cause-workflow)',
  '[10 Project Management](10-project-management.md)',
  'Root Cause / Failure Mechanism確認'
])) {
  errors.push('docs/23: resume rejection must remain connected to the root-cause workflow');
}

if (conversationRecovery.includes('→ Silent Resume可能。')) {
  errors.push('docs/23: High Confidence must not authorize silent resume before user confirmation');
}

const bugFixSection = startHere.match(/## 既存サイトのBug Fix[\s\S]*?(?=\n## )/)?.[0] ?? '';
if (!bugFixSection.includes('docs/10-project-management.md')) {
  errors.push('START_HERE.md: Bug Fix route must continue to reach docs/10 root-cause workflow');
}

const conversationSection = startHere.match(/## 会話移行 \/ Automatic Resume[\s\S]*?(?=\n## )/)?.[0] ?? '';
if (!conversationSection.includes('docs/23-conversation-handoff-recovery.md')) {
  errors.push('START_HERE.md: Automatic Resume route must continue to reach docs/23');
}

if (errors.length) {
  console.error('Root-cause workflow validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Root-cause workflow validation passed.');
