const syncLabels = {
  synced: '同期済み',
  pending: '同期中',
  failed: '同期失敗',
  needs_reconcile: '要再確認'
};

const taskStatusLabels = {
  needs_planning: '計画確認中', needs_review: '確認待ち', queued: 'Queue待ち', assigned: '割当済み', claimed: '取得済み', working: '作業中', blocked: '要対応', ready_for_apply: '反映準備完了', completed: '完了', resolved: '解決済み', needs_reconcile: '要再確認', superseded: '置換済み', rejected: '却下'
};
const laneStateLabels = { idle:'空き', assigned:'割当済み', working:'作業中', blocked:'要対応', ready_for_apply:'反映待ち', waiting:'待機中' };
const allowedSyncStates=new Set(Object.keys(syncLabels));
const allowedLaneStates=new Set(Object.keys(laneStateLabels));
const allowedTaskStatuses=new Set(Object.keys(taskStatusLabels));
const allowedNextStates=new Set(['candidate','after_current','queue_attention','parallel_wait','dependency_wait','no_pending']);
const esc=value=>String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const finiteCount=value=>{const n=Number(value);return Number.isInteger(n)&&n>=0?n:0};

function normalizeTask(task){if(!task||typeof task!=='object')return null;if(typeof task.summary!=='string'||!task.summary.trim())return null;if(!allowedTaskStatuses.has(task.status))return null;return{summary:task.summary.trim().slice(0,300),status:task.status}}

export function normalizeQueueProjection(queue,repository){
 if(queue==null)return{state:'missing'};
 if(!queue||typeof queue!=='object'||queue.schemaVersion!==1)return{state:'invalid'};
 if(queue.repository!==repository||!allowedSyncStates.has(queue.syncState))return{state:'invalid'};
 if(!queue.counts||typeof queue.counts!=='object'||!Array.isArray(queue.lanes)||!Array.isArray(queue.nextTasks))return{state:'invalid'};
 const lanes=[];
 for(const lane of queue.lanes){if(!lane||typeof lane!=='object'||typeof lane.lane!=='string'||!allowedLaneStates.has(lane.state)||!allowedNextStates.has(lane.nextState))return{state:'invalid'};lanes.push({lane:lane.lane.slice(0,12),state:lane.state,currentAssignment:normalizeTask(lane.currentAssignment),nextCandidate:normalizeTask(lane.nextCandidate),nextState:lane.nextState})}
 return{state:'ready',syncState:queue.syncState,counts:{pending:finiteCount(queue.counts.pending),runnable:finiteCount(queue.counts.runnable),active:finiteCount(queue.counts.active),blocked:finiteCount(queue.counts.blocked),needsReconcile:finiteCount(queue.counts.needsReconcile),completed:finiteCount(queue.counts.completed)},lanes,nextTasks:queue.nextTasks.map(normalizeTask).filter(Boolean).slice(0,4),updatedAt:typeof queue.updatedAt==='string'?queue.updatedAt:null};
}

function nextText(lane){if(lane.nextCandidate)return lane.nextCandidate.summary;switch(lane.nextState){case'after_current':return'現在の仕事が完了し、履歴が確定してから次の割当を決めます。';case'queue_attention':return'Queueの同期状態を確認する必要があります。';case'parallel_wait':return'並行実行できる範囲の確定待ちです。';case'dependency_wait':return'依存している作業の完了待ちです。';case'no_pending':return'次の割当待ちです。';default:return'次の割当待ちです。'}}
function syncTone(syncState){if(syncState==='synced')return'completed';if(syncState==='failed'||syncState==='needs_reconcile')return'blocked';return'waiting'}
function taskBadge(task){return task?`<span class="queue-task-status">${esc(taskStatusLabels[task.status]??task.status)}</span>`:''}

export function buildWorkerStartPrompt(project,lane){
 return `あなたは Worker ${lane} です。\n対象Repository: ${project.repository}\n\n開始時に必ず次を行ってください。\n1. 最新の EliteMay/web-project-guide の README.md / START_HERE.md を読み、今回必要なRuleだけ確認する。\n2. EliteMay/web-project-workflow の DEVELOPMENT_PROJECT.md を確認する。\n3. EliteMay/web-project-data/work-queues/${project.repository.replace('/','--')}/ の control.json と lanes/${lane}.json を読み、Current Assignmentを再取得する。\n4. Current Requirements revision、generationRevision、assignmentRevision、Lane、Taskの一致を確認する。\n5. work-queues/CLAIM_CONTRACT.md に従い、この会話専用の一意な holderId を作ってCurrent AssignmentをClaimする。Claim競合・SHA競合・stale状態なら対象Repositoryを編集せず停止する。\n6. Claim後にAuthoritativeなItem/Laneを再取得し、自分のholderIdでworkingになったことを確認してから担当Scopeだけ開始する。\n7. Queue外の次Taskを自分で発明しない。完了時は成果物・Validation・Queue/HistoryをCurrent Evidenceへ合わせる。\n\n古い会話・開始文・Dashboard表示だけをCurrent AssignmentのAuthorityにしないでください。`;
}

function renderLane(lane,project){
 const current=lane.currentAssignment?`<div class="queue-assignment-value"><strong>${esc(lane.currentAssignment.summary)}</strong>${taskBadge(lane.currentAssignment)}</div>`:'<div class="queue-assignment-value queue-muted">割当なし</div>';
 const next=lane.nextCandidate?`<div class="queue-assignment-value"><strong>${esc(nextText(lane))}</strong><span class="queue-candidate-note">正式割当前の候補</span></div>`:`<div class="queue-assignment-value queue-muted">${esc(nextText(lane))}</div>`;
 const canStart=lane.state==='assigned'&&lane.currentAssignment?.status==='assigned';
 const prompt=canStart?buildWorkerStartPrompt(project,lane.lane):null;
 const start=prompt?`<div class="queue-start"><button class="copy queue-start-button" type="button" data-prompt="${encodeURIComponent(prompt)}">${esc(lane.lane)}の開始文をコピー</button><span>新しい会話へ貼るとCurrent Assignmentを再取得してClaimします。</span></div>`:'';
 return `<article class="queue-lane"><header><span class="queue-lane-id">${esc(lane.lane)}</span><span class="queue-lane-state">${esc(laneStateLabels[lane.state]??lane.state)}</span></header><div class="queue-assignment"><span>現在の仕事</span>${current}</div>${start}<div class="queue-assignment"><span>次の仕事</span>${next}</div></article>`;
}

export function renderQueueBoard(rawQueue,project){
 const queue=normalizeQueueProjection(rawQueue,project.repository);
 if(queue.state==='missing')return `<section class="queue-board queue-board-muted" aria-labelledby="queueHeading"><div class="queue-board-head"><div><p class="queue-kicker">WORK QUEUE</p><h2 id="queueHeading">作業Queue</h2></div><span class="badge waiting">未登録</span></div><p class="queue-message">このRepositoryには公開用Work Queue情報がまだ登録されていません。</p></section>`;
 if(queue.state==='invalid')return `<section class="queue-board queue-board-attention" aria-labelledby="queueHeading"><div class="queue-board-head"><div><p class="queue-kicker">WORK QUEUE</p><h2 id="queueHeading">作業Queue</h2></div><span class="badge blocked">取得情報エラー</span></div><p class="queue-message">Queueの公開情報を安全に確認できません。0件として扱わず、公開Controlの確認が必要です。</p></section>`;
 const attention=queue.syncState!=='synced';
 const statusMessage=queue.syncState==='synced'?'QueueはCurrentな公開Projectionと同期しています。':queue.syncState==='pending'?'Queueの同期処理中です。完了するまで新しい割当候補をCurrentとして扱いません。':queue.syncState==='failed'?'Queue同期に失敗しています。空Queueではありません。Recoveryが必要です。':'Requirementsまたは作業状態との再調整が必要です。';
 const nextList=queue.nextTasks.length?`<details class="queue-next-list"><summary>今すぐ割当可能な仕事 ${queue.nextTasks.length}件</summary><ol>${queue.nextTasks.map(task=>`<li><span>${esc(task.summary)}</span>${taskBadge(task)}</li>`).join('')}</ol></details>`:`<p class="queue-next-empty">${queue.syncState==='synced'?'現在、すぐに割当可能な追加Taskはありません。':'同期状態が正常になるまで割当候補を表示しません。'}</p>`;
 return `<section class="queue-board${attention?' queue-board-attention':''}" aria-labelledby="queueHeading"><div class="queue-board-head"><div><p class="queue-kicker">WORK QUEUE</p><h2 id="queueHeading">作業Queue</h2></div><span class="badge ${syncTone(queue.syncState)}">${esc(syncLabels[queue.syncState])}</span></div><p class="queue-message">${esc(statusMessage)}</p><div class="queue-counts" aria-label="Queue概要"><div><strong>${queue.counts.pending}</strong><span>未処理</span></div><div><strong>${queue.counts.runnable}</strong><span>割当可能</span></div><div><strong>${queue.counts.active}</strong><span>作業中・割当中</span></div><div><strong>${queue.counts.needsReconcile}</strong><span>要再確認</span></div></div>${queue.lanes.length?`<div class="queue-lanes">${queue.lanes.map(lane=>renderLane(lane,project)).join('')}</div>`:'<p class="queue-next-empty">Worker Lane情報はありません。</p>'}${nextList}</section>`;
}
