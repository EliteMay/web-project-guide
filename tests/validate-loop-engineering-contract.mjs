import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const contractPath = path.join(root, 'LOOP_ENGINEERING_REQUIREMENTS.md');
const schemaPath = path.join(root, 'maintenance', 'loop-policy.schema.json');
const examplePath = path.join(root, 'maintenance', 'loop-policy.example.json');

const fail = (message) => {
  console.error(`Loop Engineering contract validation failed: ${message}`);
  process.exitCode = 1;
};

const assert = (condition, message) => {
  if (!condition) fail(message);
};

for (const file of [contractPath, schemaPath, examplePath]) {
  assert(fs.existsSync(file), `missing required file: ${path.relative(root, file)}`);
}

if (process.exitCode) process.exit(process.exitCode);

const contract = fs.readFileSync(contractPath, 'utf8');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const example = JSON.parse(fs.readFileSync(examplePath, 'utf8'));

const requiredContractMarkers = [
  'Outer Loop',
  'Inner Loop',
  'Verifier Integrity Boundary',
  'Progress / Stuck Detection',
  'Budget Contract',
  'Permission / Sandbox Contract',
  'Checkpoint / Resume / Crash Recovery',
  'Parallelism Policy',
  'Maintenance / Drift Loop',
  'Runtime Phase A',
  'Runtime Phase B',
  'Runtime Phase C',
  'Runtime Phase D',
  'Phase E'
];

for (const marker of requiredContractMarkers) {
  assert(contract.includes(marker), `product contract lost required section/marker: ${marker}`);
}

assert(
  contract.includes('Runtime Phase A implemented') || contract.includes('Runtime Phase A — Implemented'),
  'product contract must record Runtime Phase A as implemented'
);
assert(
  contract.includes('Runtime Phase B implemented') || contract.includes('Runtime Phase B — Implemented'),
  'product contract must record Runtime Phase B as implemented'
);
assert(
  contract.includes('Runtime Phase C implemented') || contract.includes('Runtime Phase C — Implemented'),
  'product contract must record Runtime Phase C as implemented'
);
assert(
  contract.includes('Runtime Phase D implemented') || contract.includes('Runtime Phase D — Implemented'),
  'product contract must record Runtime Phase D as implemented'
);
assert(
  contract.includes('Phase E not implemented') || contract.includes('Phase E — Optional guarded PR / Merge / Release — Next'),
  'product contract must keep Phase E explicitly unimplemented/next'
);
assert(
  contract.includes('derived-loop-dry-run-only'),
  'product contract must preserve Phase A derived/read-only authority boundary'
);
assert(
  contract.includes('formal assignment authority') || contract.includes('formal assignmentへ読み替えない'),
  'product contract must preserve the no-formal-assignment boundary for Phase A'
);
assert(
  contract.includes('Target primary/default branch') || contract.includes('Target default branch SHA'),
  'product contract must preserve the no-default-branch-write boundary for worker execution'
);
assert(
  contract.includes('Push / Runtime PR creation / Default Branch Merge / Deploy') || contract.includes('Push / Merge / Deploy'),
  'product contract must preserve no-push/no-merge/no-deploy boundary through Phase D'
);
assert(
  contract.includes('Verification PASS前') || contract.includes('Verification PASS前にTaskをcompletedへ進めない'),
  'product contract must keep verification before Queue completion'
);
assert(
  contract.includes('Integration Verification PASS後') || contract.includes('Integration Verification PASS前にTaskをcompletedへ進めない'),
  'product contract must keep cross-worker integration verification before Phase D Queue completion'
);
assert(
  contract.includes('safeParallel=true') && contract.includes('scopePaths[]') && contract.includes('semanticScopes[]'),
  'product contract must preserve explicit Phase D parallel eligibility boundaries'
);
assert(
  contract.includes('deterministic order') || contract.includes('deterministic Integration'),
  'product contract must preserve deterministic Phase D integration order'
);
assert(
  contract.includes('needs_reconcile'),
  'product contract must preserve fail-closed reconciliation for ambiguous resume state'
);
assert(
  contract.includes('maxSameFailure'),
  'product contract must preserve same-failure stuck guard'
);
assert(
  contract.includes('pause') && contract.includes('cancel') && contract.includes('Kill Switch'),
  'product contract must preserve operator control / kill-switch boundary'
);
assert(
  contract.includes('Production Pilot') && contract.includes('NOT_RUN'),
  'product contract must distinguish implemented runtime from real-project Production Pilot evidence'
);
assert(
  contract.includes('EliteMay/web-project-data#152') && contract.includes('2913e1b02f2fcd1392fc350e2ca911a562d9a57c'),
  'product contract must point to the merged Phase D runtime implementation evidence'
);

assert(schema.$schema === 'https://json-schema.org/draft/2020-12/schema', 'schema must use JSON Schema draft 2020-12');
assert(schema.type === 'object', 'schema root must be an object');
assert(schema.additionalProperties === false, 'schema root must reject unknown fields');

const requiredRootFields = [
  'policyVersion',
  'loopId',
  'repository',
  'goal',
  'scope',
  'trigger',
  'verification',
  'budget',
  'permissions',
  'progress',
  'stop'
];

for (const field of requiredRootFields) {
  assert(schema.required?.includes(field), `schema root missing required field: ${field}`);
  assert(Object.hasOwn(schema.properties ?? {}, field), `schema missing property definition: ${field}`);
  assert(Object.hasOwn(example, field), `safe example missing required field: ${field}`);
}

assert(example.policyVersion === '1', 'safe example policyVersion must be 1');
assert(example.autonomyLevel === 'L1_WORKTREE', 'safe example must remain at L1_WORKTREE');
assert(example.scope?.workingBranchPolicy === 'isolated_worktree', 'safe example must use isolated_worktree');
assert(Array.isArray(example.scope?.protectedPaths) && example.scope.protectedPaths.length > 0, 'safe example must protect at least one path');

const permissions = example.permissions ?? {};
assert(permissions.repositoryRead === true, 'safe example should allow repository read');
assert(permissions.workingBranchWrite === true, 'safe example should allow isolated working-branch writes');
assert(permissions.defaultBranchWrite === false, 'safe example must deny default-branch direct write');
assert(permissions.merge === false, 'safe example must deny merge');
assert(permissions.deploy === false, 'safe example must deny deploy');
assert(permissions.secretAccess === false, 'safe example must deny secret access');
assert(permissions.externalNetwork === false, 'safe example must deny unrestricted external network access');

const verification = example.verification ?? {};
assert(verification.protected === true, 'safe example must use protected verification');
assert(verification.allowWorkerToModifyVerifier === false, 'safe example must not allow worker verifier mutation');
assert(verification.minimumLevel !== 'V0_SELF', 'safe example must require evidence stronger than self-evaluation');
assert(Array.isArray(verification.requiredChecks) && verification.requiredChecks.length > 0, 'safe example must require verification checks');

const budget = example.budget ?? {};
assert(Number.isInteger(budget.maxIterations) && budget.maxIterations > 0, 'safe example must bound iterations');
assert(Number.isInteger(budget.maxSameFailure) && budget.maxSameFailure > 0, 'safe example must bound same-failure repetition');
assert(budget.maxSameFailure <= budget.maxIterations, 'same-failure budget must not exceed total iteration budget');
assert(budget.maxParallelWorkers === 1, 'safe example must remain sequential-first even though Phase D is implemented');

const progress = example.progress ?? {};
assert(progress.detectSameFailure === true, 'safe example must detect repeated failures');
assert(progress.requireMeaningfulDelta === true, 'safe example must require meaningful progress');
assert(Array.isArray(progress.signatureInputs) && progress.signatureInputs.length >= 2, 'safe example must define multi-signal failure signatures');

const expectedTerminalStates = [
  'passed',
  'failed',
  'stuck',
  'blocked',
  'budget_exhausted',
  'escalated',
  'cancelled',
  'needs_reconcile'
];
const actualTerminalStates = example.stop?.terminalStates ?? [];
for (const state of expectedTerminalStates) {
  assert(actualTerminalStates.includes(state), `safe example missing terminal state: ${state}`);
}

const schemaTerminalStates = schema.properties?.stop?.properties?.terminalStates?.items?.enum ?? [];
for (const state of expectedTerminalStates) {
  assert(schemaTerminalStates.includes(state), `schema missing terminal state: ${state}`);
}

const requiredEscalations = [
  'user_decision_required',
  'irreversible_destructive_action',
  'external_permission_required',
  'billing_required',
  'secret_access_required',
  'material_requirements_conflict',
  'verifier_uncertain',
  'scope_expansion_required',
  'production_release_gate'
];
const actualEscalations = example.stop?.escalateWhen ?? [];
for (const condition of requiredEscalations) {
  assert(actualEscalations.includes(condition), `safe example missing escalation condition: ${condition}`);
}

const permissionSchema = schema.properties?.permissions?.properties ?? {};
for (const field of [
  'repositoryRead',
  'workingBranchWrite',
  'commit',
  'pushWorkingBranch',
  'defaultBranchWrite',
  'merge',
  'deploy',
  'externalNetwork',
  'secretAccess'
]) {
  assert(permissionSchema[field]?.type === 'boolean', `permission must remain boolean: ${field}`);
}

const verifierLevels = schema.properties?.verification?.properties?.minimumLevel?.enum ?? [];
for (const level of ['V0_SELF', 'V1_STATIC', 'V2_DETERMINISTIC', 'V3_RUNTIME', 'V4_PROTECTED', 'V5_HUMAN']) {
  assert(verifierLevels.includes(level), `schema missing verifier level: ${level}`);
}

if (!process.exitCode) {
  console.log('Loop Engineering contract validation passed.');
}
