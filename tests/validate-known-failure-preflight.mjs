import fs from 'node:fs';

const errors = [];
const read = (file) => fs.readFileSync(file, 'utf8');

const router = JSON.parse(read('maintenance/rule-router.json'));
const routingGuide = read('docs/21-rule-routing-preflight.md');
const checklist = read('templates/QUALITY_CHECKLIST.md');
const workReport = read('templates/WORK_REPORT_TEMPLATE.md');
const agentsTemplate = read('templates/AGENTS_TEMPLATE.md');

const gate = router.gates?.['RULE-PREFLIGHT-GATE'];
if (!gate) {
  errors.push('rule-router.json: missing RULE-PREFLIGHT-GATE');
} else {
  if (gate.owner !== 'docs/21-rule-routing-preflight.md') {
    errors.push('RULE-PREFLIGHT-GATE: owner must remain docs/21-rule-routing-preflight.md');
  }
  for (const scope of ['MEANINGFUL', 'SYSTEMIC']) {
    if (!gate.when?.includes(scope)) {
      errors.push(`RULE-PREFLIGHT-GATE: missing change-scope trigger -> ${scope}`);
    }
  }
}

for (const marker of [
  '### MUST: Known Failure / Proven Successを実装前に再利用する',
  '`PROJECT_LEARNINGS.md`',
  'Failure Catalog',
  'Success Pattern Catalog',
  'Targeted Search',
  'Reuse Conditions / Trade-off / Current Context',
  'Regression Guard / Runtime Check / Playtest',
  'Rule Application Failure'
]) {
  if (!routingGuide.includes(marker)) {
    errors.push(`docs/21: learning preflight contract lost marker -> ${marker}`);
  }
}

for (const marker of [
  'Meaningfulな既存Project作業では',
  '`PROJECT_LEARNINGS.md` / Failure Catalog / Success Pattern Catalog',
  'Rule Application Failure'
]) {
  if (!checklist.includes(marker)) {
    errors.push(`QUALITY_CHECKLIST.md: known-failure completion check lost marker -> ${marker}`);
  }
}

for (const marker of [
  '## Learning Preflight',
  'Targeted Search（System / 症状 / Goal / Risk）',
  '該当Learning / Failure',
  '今回のPrevention',
  '該当Success Pattern',
  'Applicability（Use when / Avoid when / Trade-off / Current Context）',
  '今回再利用する部分',
  'Regression Guard / Runtime Check / Playtest / Validation'
]) {
  if (!workReport.includes(marker)) {
    errors.push(`WORK_REPORT_TEMPLATE.md: missing known-failure evidence field -> ${marker}`);
  }
}

for (const marker of [
  '`docs/21-rule-routing-preflight.md`',
  '`PROJECT_LEARNINGS.md`（存在する場合）',
  'Success Pattern'
]) {
  if (!agentsTemplate.includes(marker)) {
    errors.push(`AGENTS_TEMPLATE.md: missing preflight entrypoint -> ${marker}`);
  }
}

if (errors.length) {
  console.error('Learning preflight validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Learning preflight validation passed.');
