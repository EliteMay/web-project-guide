import assert from 'node:assert/strict';
import { normalizeQueueProjection, renderQueueBoard } from '../project-dashboards/project-dashboard-queue.mjs';

const project = { slug: 'game', repository: 'EliteMay/game', name: 'game' };
const projection = {
  schemaVersion: 1,
  repository: 'EliteMay/game',
  syncState: 'synced',
  counts: { pending: 3, runnable: 1, active: 1, blocked: 0, needsReconcile: 0, completed: 2 },
  lanes: [
    {
      lane: 'A',
      state: 'working',
      currentAssignment: { summary: '現在の実装を進めています。', status: 'working' },
      nextCandidate: null,
      nextState: 'after_current'
    },
    {
      lane: 'B',
      state: 'idle',
      currentAssignment: null,
      nextCandidate: { summary: '<script>alert(1)</script> 次の候補', status: 'queued' },
      nextState: 'candidate'
    }
  ],
  nextTasks: [{ summary: '<b>公開候補</b>', status: 'queued' }],
  updatedAt: '2026-09-10T14:40:00Z'
};

const normalized = normalizeQueueProjection(projection, project.repository);
assert.equal(normalized.state, 'ready');
assert.equal(normalized.counts.runnable, 1);
assert.equal(normalized.lanes[0].currentAssignment.status, 'working');
assert.equal(normalized.lanes[1].nextState, 'candidate');

const html = renderQueueBoard(projection, project);
assert.match(html, /作業Queue/);
assert.match(html, /現在の仕事/);
assert.match(html, /次の仕事/);
assert.match(html, /正式割当前の候補/);
assert.equal(html.includes('<script>alert(1)</script>'), false, 'task summary must be escaped');
assert.equal(html.includes('<b>公開候補</b>'), false, 'next task summary must be escaped');
assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);

const missing = renderQueueBoard(null, project);
assert.match(missing, /未登録/);
assert.match(missing, /まだ登録されていません/);

const failed = renderQueueBoard({ ...projection, syncState: 'failed', counts: { ...projection.counts, runnable: 0 }, nextTasks: [] }, project);
assert.match(failed, /同期失敗/);
assert.match(failed, /空Queueではありません/);

const mismatch = renderQueueBoard({ ...projection, repository: 'EliteMay/other' }, project);
assert.match(mismatch, /取得情報エラー/);
assert.match(mismatch, /0件として扱わず/);

console.log('Project dashboard queue renderer tests passed.');
