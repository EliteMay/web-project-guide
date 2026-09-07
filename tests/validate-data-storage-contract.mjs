import fs from 'node:fs';

const errors = [];
const read = (path) => fs.readFileSync(path, 'utf8');

const storage = read('docs/03-data-storage.md');
const testing = read('docs/07-testing-quality.md');
const checklist = read('templates/QUALITY_CHECKLIST.md');
const requirements = read('REQUIREMENTS.md');
const research = read('maintenance/research/data-storage-decision-system.md');

const requiredStorageSections = [
  '## Data Role / Canonical Authority',
  '## Local-first / Cloud-first / Local-only',
  '## Offline Capability',
  '## Cloud Sync',
  '## Conflict Resolution',
  '## Autosave / Save Lifecycle',
  '## Search Index',
  '## Cache',
  '## History / Undo / Snapshot / Backup',
  '## Optimistic Update',
  '## User Generated Content',
  '## Data Integrity / Corruption Recovery',
  '## Backup / Restore Strategy'
];

for (const section of requiredStorageSections) {
  if (!storage.includes(section)) errors.push(`docs/03-data-storage.md: missing Phase 4 section -> ${section}`);
}

for (const invariant of [
  'Local save\n≠\nCloud sync',
  'updatedAt`だけに依存しない',
  'Backup作成だけで完了扱いしない',
  '破損Dataを即時上書き・削除しない'
]) {
  if (!storage.includes(invariant)) errors.push(`docs/03-data-storage.md: missing storage invariant -> ${invariant}`);
}

if (!testing.includes('## Data / Storage Verification')) {
  errors.push('docs/07-testing-quality.md: missing Data / Storage Verification section');
}
for (const scenario of ['### Offline / Reconnect', '### Cloud Sync / Conflict', '### Corruption / Integrity', '### Backup / Restore']) {
  if (!testing.includes(scenario)) errors.push(`docs/07-testing-quality.md: missing verification scenario -> ${scenario}`);
}

for (const marker of ['Canonical / Derived / Search Index / Cache / History / Backup', 'Local Saved / Sync Pending / Synced', 'BackupをCloud Sync / Autosave / Undoの代用']) {
  if (!checklist.includes(marker)) errors.push(`QUALITY_CHECKLIST.md: missing Phase 4 execution check -> ${marker}`);
}

if (!requirements.includes('Data / Storage Decision System Phase 4: Implemented')) {
  errors.push('REQUIREMENTS.md: Phase 4 implementation status is not current');
}
if (!requirements.includes('historical non-normative evidence')) {
  errors.push('REQUIREMENTS.md: missing promoted research status');
}

if (!research.includes('Status: completed / promoted')) {
  errors.push('data-storage-decision-system.md: research record is not marked completed/promoted');
}
if (/Status:\s*pending research/i.test(research)) {
  errors.push('data-storage-decision-system.md: stale pending research status remains');
}
if (!research.includes('Normative status: historical non-normative evidence')) {
  errors.push('data-storage-decision-system.md: historical non-normative boundary missing');
}

if (errors.length) {
  console.error('Data / Storage contract validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Data / Storage contract validation passed.');
