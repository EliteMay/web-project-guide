import fs from 'node:fs';

const errors = [];
const read = (file) => fs.readFileSync(file, 'utf8');
const includesAny = (text, values) => values.some((value) => text.includes(value));

const readme = read('README.md');
const startHere = read('START_HERE.md');
const conversationOwner = read('docs/23-conversation-handoff-recovery.md');
const router = JSON.parse(read('maintenance/rule-router.json'));

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
  'EliteMay/web-project-data',
  '雑談',
  '対象外',
  'MUST: Persistence成功をReceiptなしで推測しない',
  'MUST: Public RepositoryへFallbackしない',
  'Conversation historyをProject Source of Truthにしない'
]) {
  if (!conversationOwner.includes(required)) {
    errors.push(`docs/23: missing conversation persistence contract -> ${required}`);
  }
}

if (!includesAny(conversationOwner, [
  'Guide対象の開発Interactionを保存する',
  'Guide対象の開発会話をInteraction単位で保存する'
])) {
  errors.push('docs/23: missing conditional development interaction persistence requirement');
}

if (!includesAny(conversationOwner, [
  '通常のChatGPT Conversation自体にはRepository側から強制できるpre-response / post-response / new-Conversation hookがない',
  '通常のChatGPT Conversation自体にはRepository側から強制できるpost-response hookやnew-Conversation hookがない'
])) {
  errors.push('docs/23: platform automatic capture/resume boundary must remain explicit');
}
if (!conversationOwner.includes('Platform全体で100%自動保存・自動復帰されるとは表現しません')) {
  errors.push('docs/23: platform-wide automatic capture/resume must not be claimed');
}
if (!conversationOwner.includes('## Automatic Conversation Resume / Workstream')) {
  errors.push('docs/23: missing Automatic Conversation Resume / Workstream contract');
}

for (const required of [
  'MUST: Automatic Resume前に1回だけUser確認する',
  'MUST: Workstream Resolution / Confirmation / Write Target / Guardを分離する',
  'Workstream候補 High',
  'Confirmation未成立',
  'mutation禁止',
  'Write target unresolved'
]) {
  if (!conversationOwner.includes(required)) {
    errors.push(`docs/23: automatic resume must preserve identity/write/guard separation -> ${required}`);
  }
}
if (!includesAny(conversationOwner, ['Guard未確立', '必要なGuardを確立できるまで開始しない'])) {
  errors.push('docs/23: authoritative mutation must remain blocked until required guard is established');
}

for (const required of [
  '## Live Interaction Guard',
  'authoritative mutation前にDurable Guardを確立する',
  'MUST: Unsettled Guardを上書きしない',
  'Degraded Mode'
]) {
  if (!conversationOwner.includes(required)) {
    errors.push(`docs/23: missing live recovery guard behavior -> ${required}`);
  }
}

if (!conversationOwner.includes('Proposalが無い`ok`はResume Confirmationにしない')) {
  errors.push('docs/23: bare acknowledgement must not become resume confirmation without a proposal');
}
if (!conversationOwner.includes('Historical evidenceを追加しただけでCurrent intent / lifecycle / next action等を古い状態へ巻き戻さない')) {
  errors.push('docs/23: historical/current state-effect boundary must remain explicit');
}
if (conversationOwner.includes('→ Silent Resume可能。')) {
  errors.push('docs/23: candidate confidence must not authorize silent resume before confirmation');
}

if (!conversationOwner.includes('保存Schema、File path、Branch / Ref名、書込みAlgorithm、Receipt field、Settlement判定の実装詳細')) {
  errors.push('docs/23: Guide/Data implementation authority boundary must remain explicit');
}
for (const implementationDetail of [
  'tools/conversations/persist-interaction.mjs',
  'web-project-data:recovery-live',
  'Current `recovery-live` branchでは`live/**`',
  'CAS / fast-forward-only publish'
]) {
  if (conversationOwner.includes(implementationDetail)) {
    errors.push(`docs/23: Data implementation detail leaked back into Guide owner -> ${implementationDetail}`);
  }
}

if (!startHere.includes('会話移行 / Automatic Resume / stale checkpoint / duplicate active conversation')) {
  errors.push('START_HERE.md: missing Automatic Resume route');
}

const persistenceOwner = 'docs/23-conversation-handoff-recovery.md';
const lifecycleDocs = router.interactionLifecycle?.completionDocs || [];
if (!Array.isArray(lifecycleDocs) || !lifecycleDocs.includes(persistenceOwner)) {
  errors.push('rule-router.json: Interaction Lifecycle completion must include Conversation Persistence owner');
}
for (const [workType, docs] of Object.entries(router.workTypes || {})) {
  if (Array.isArray(docs) && docs.includes(persistenceOwner)) {
    errors.push(`rule-router.json: ${workType} must not use Conversation Persistence owner as a universal preflight requirement`);
  }
}
if (!(router.domains?.CONVERSATION_HANDOFF || []).includes(persistenceOwner)) {
  errors.push('rule-router.json: Conversation Handoff domain must still preflight-route to docs/23');
}
if (!(router.signals?.CONVERSATION_STATE_RECOVERY?.docs || []).includes(persistenceOwner)) {
  errors.push('rule-router.json: Conversation State Recovery signal must still preflight-route to docs/23');
}

if (errors.length) {
  console.error('Development conversation persistence validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Development conversation persistence validation passed.');
