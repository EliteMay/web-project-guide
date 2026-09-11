import fs from 'node:fs';

const errors = [];
const read = (file) => fs.readFileSync(file, 'utf8');

const readme = read('README.md');
const startHere = read('START_HERE.md');
const conversationOwner = read('docs/23-conversation-handoff-recovery.md');

if (!/^## 開発会話の保存$/m.test(readme)) {
  errors.push('README.md: missing development conversation persistence summary');
}
if (!readme.includes('docs/23-conversation-handoff-recovery.md#development-conversation-persistence')) {
  errors.push('README.md: missing route to Conversation Persistence normative owner');
}
if (!readme.includes('各完了InteractionのCompletion Gate')) {
  errors.push('README.md: conversation persistence must be surfaced as an Interaction completion gate');
}
if (!readme.includes('最終応答を完了する前')) {
  errors.push('README.md: missing pre-final-response persistence timing');
}
if (!startHere.includes('docs/23-conversation-handoff-recovery.md#development-conversation-persistence')) {
  errors.push('START_HERE.md: completion route must link to Conversation Persistence owner');
}
if (!startHere.includes('保存と必要なCheckpoint更新の成功を確認する')) {
  errors.push('START_HERE.md: completion route must require persistence/checkpoint success verification');
}

for (const required of [
  '## Development Conversation Persistence',
  'CONDITIONAL MUST: Guide対象の開発会話をInteraction単位で保存する',
  'EliteMay/web-project-data',
  '雑談',
  '対象外',
  'MUST: 保存成功を推測しない',
  'MUST: Public RepositoryへFallbackしない',
  'Conversation historyをProject Source of Truthにしない'
]) {
  if (!conversationOwner.includes(required)) {
    errors.push(`docs/23: missing conversation persistence contract -> ${required}`);
  }
}

if (!conversationOwner.includes('通常のChatGPT Conversation自体にはRepository側から強制できるpost-response hook')) {
  errors.push('docs/23: platform automatic-capture boundary must remain explicit');
}
if (!conversationOwner.includes('new-Conversation hook')) {
  errors.push('docs/23: platform automatic-resume boundary must remain explicit');
}
if (!conversationOwner.includes('## Automatic Conversation Resume / Workstream')) {
  errors.push('docs/23: missing Automatic Conversation Resume / Workstream contract');
}

for (const required of [
  'MUST: Automatic Resume前に1回だけUser確認する',
  'MUST: Workstream Resolution Confidence / Confirmation / Write Target Resolutionを分離する',
  'Workstream候補 High',
  'Confirmation未成立',
  'Resume開始 / Repository writeは禁止',
  'Workstream Confirmation成立',
  'Write target unresolved',
  'Repository writeは禁止'
]) {
  if (!conversationOwner.includes(required)) {
    errors.push(`docs/23: automatic resume must preserve confidence/confirmation/write-target separation -> ${required}`);
  }
}

if (conversationOwner.includes('→ Silent Resume可能。')) {
  errors.push('docs/23: candidate confidence must not authorize silent resume before confirmation');
}

if (!startHere.includes('会話移行 / Automatic Resume / stale checkpoint / duplicate active conversation')) {
  errors.push('START_HERE.md: missing Automatic Resume route');
}

if (errors.length) {
  console.error('Development conversation persistence validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Development conversation persistence validation passed.');
