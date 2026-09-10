import fs from 'node:fs';

const errors = [];
const read = (file) => fs.readFileSync(file, 'utf8');

const readme = read('README.md');
const conversationOwner = read('docs/23-conversation-handoff-recovery.md');

if (!/^## 開発会話の保存$/m.test(readme)) {
  errors.push('README.md: missing development conversation persistence summary');
}
if (!readme.includes('docs/23-conversation-handoff-recovery.md#development-conversation-persistence')) {
  errors.push('README.md: missing route to Conversation Persistence normative owner');
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

if (!conversationOwner.includes('通常のChatGPT Conversation自体にはRepository側から強制できるpost-response hookがない')) {
  errors.push('docs/23: platform automatic-capture boundary must remain explicit');
}

if (errors.length) {
  console.error('Development conversation persistence validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Development conversation persistence validation passed.');
