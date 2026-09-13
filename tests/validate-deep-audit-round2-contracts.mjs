import fs from 'node:fs';

const errors = [];

function read(file) {
  if (!fs.existsSync(file)) {
    errors.push(`missing required file: ${file}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

const projectManagement = read('docs/10-project-management.md');
const observability = read('docs/15-development-observability.md');
const checklist = read('templates/QUALITY_CHECKLIST.md');
const evidence = read('references/production-runtime-observability-research.md');

if (!/^## Write Capability \/ Tool Discovery Safety$/m.test(projectManagement)) {
  errors.push('docs/10: missing Write Capability / Tool Discovery Safety owner section');
}
for (const marker of ['Default Branch', 'Write Probe', 'Read-only', 'non-authoritative target']) {
  if (!projectManagement.includes(marker)) {
    errors.push(`docs/10: write-probe safety contract lost concept -> ${marker}`);
  }
}
if (!projectManagement.includes('16-cross-repository-github-infrastructure.md')) {
  errors.push('docs/10: write-probe safety must route repository protection to docs/16');
}

if (!/^## CONDITIONAL MUST: Production Runtime Observability \/ Operational Readiness$/m.test(observability)) {
  errors.push('docs/15: missing Production Runtime Observability / Operational Readiness section');
}
for (const marker of ['User-visible health', 'Metrics / Logs / Traces', 'Correlation', 'Alert', 'Production Incident']) {
  if (!observability.includes(marker)) {
    errors.push(`docs/15: production observability contract lost concept -> ${marker}`);
  }
}
if (!observability.includes('../references/production-runtime-observability-research.md')) {
  errors.push('docs/15: missing production observability research link');
}

if (!checklist.includes('Default / Authoritative Branch')) {
  errors.push('QUALITY_CHECKLIST.md: missing default-branch write-probe guard');
}
if (!/^## Production Runtime Observability — 該当時$/m.test(checklist)) {
  errors.push('QUALITY_CHECKLIST.md: missing Production Runtime Observability execution section');
}

if (!evidence.includes('Status: **current non-normative evidence**')) {
  errors.push('production observability research: must identify itself as non-normative evidence');
}
if (!/^## Promotion decision$/m.test(evidence)) {
  errors.push('production observability research: missing Promotion decision boundary');
}
for (const source of ['opentelemetry.io', 'sre.google']) {
  if (!evidence.includes(source)) errors.push(`production observability research: missing source family -> ${source}`);
}

if (errors.length) {
  console.error('Round-two audit contract validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Round-two audit contract validation passed.');
