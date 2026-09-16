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
  '### MUST: Known Failureを実装前に再利用する',
  '`PROJECT_LEARNINGS.md`',
  'Failure Catalog',
  'Targeted Search',
  'Regression Guard / Runtime Check / Playtest項目',
  'Rule Application Failure'
]) {
  if (!routingGuide.includes(marker)) {
    errors.push(`docs/21: known-failure preflight contract lost marker -> ${marker}`);
  }
}

for (const marker of [
  'Meaningfulな既存Project作業では',
  '`PROJECT_LEARNINGS.md` / Failure Catalog',
  'Rule Application Failure'
]) {
  if (!checklist.includes(marker)) {
    errors.push(`QUALITY_CHECKLIST.md: known-failure completion check lost marker -> ${marker}`);
  }
}

for (const marker of [
  '## Known Failure Preflight',
  'Targeted Search（System / 症状 / Risk）',
  '該当Learning / Failure',
  '今回のPrevention',
  'Regression Guard / Runtime Check / Playtest'
]) {
  if (!workReport.includes(marker)) {
    errors.push(`WORK_REPORT_TEMPLATE.md: missing known-failure evidence field -> ${marker}`);
  }
}

for (const marker of [
  '`docs/21-rule-routing-preflight.md`',
  '`PROJECT_LEARNINGS.md`（存在する場合）'
]) {
  if (!agentsTemplate.includes(marker)) {
    errors.push(`AGENTS_TEMPLATE.md: missing preflight entrypoint -> ${marker}`);
  }
}

if (errors.length) {
  console.error('Known-failure preflight validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Known-failure preflight validation passed.');
