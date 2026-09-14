import fs from 'node:fs';

const file = 'site/pages/rules.html';
const errors = [];

if (!fs.existsSync(file)) {
  console.error(`Rule Finder coverage validation failed:\n- missing ${file}`);
  process.exit(1);
}

const html = fs.readFileSync(file, 'utf8');

const routeIds = [
  'learning',
  'web-deployment',
  'browser-compatibility',
  'external-integration'
];

for (const routeId of routeIds) {
  if (!html.includes(`data-route="${routeId}"`)) {
    errors.push(`missing required Human Guide route: ${routeId}`);
  }
}

// These are the user-facing capability groups that existed before the P0 shell
// refactor. This guard prevents a navigation/layout cleanup from silently
// deleting a supported Rule Finder entry again.
const featureHeadings = [
  '保存・データ',
  '検索・絞り込み・一覧',
  'ログイン・認証・権限',
  '外部API・Webhook・Supabase',
  '学習・解説コンテンツ',
  'Web公開・Runtime・Environment',
  'Browser・Web Platform互換性',
  '作成・編集・削除',
  '画面構成・Navigation・導線',
  'UI・見た目・スマホ対応',
  '重い・遅い・止まる',
  'セキュリティ',
  'テスト・完成確認',
  'GitHub Pages',
  'Electron・Windows配布',
  'ライブラリ・CDN・素材',
  'エラー調査・診断情報',
  '調査して方針を決める',
  '会話を変える・作業を引き継ぐ'
];

for (const heading of featureHeadings) {
  if (!html.includes(`<h3>${heading}</h3>`)) {
    errors.push(`missing Rule Finder feature group: ${heading}`);
  }
}

if (!html.includes('site-wide') && !html.includes('サイト全体検索')) {
  errors.push('Rule Finder must keep a path to site-wide search');
}
if (!html.includes('task-router.html')) {
  errors.push('Rule Finder must keep a path to the machine-router-driven task router');
}
if (!html.includes("../data/search-sources.json")) {
  errors.push('Rule Finder Owner inventory must derive from the public source registry');
}

if (errors.length) {
  console.error('Rule Finder coverage validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Rule Finder coverage validation passed (${featureHeadings.length} feature groups).`);
