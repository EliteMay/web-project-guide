import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const defaultRouterPath = path.join(root, 'maintenance', 'rule-router.json');

function unique(values) {
  return [...new Set(values)];
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function matchesAny(actual, expected) {
  if (!expected) return true;
  const actualSet = new Set(asArray(actual));
  return expected.some((value) => actualSet.has(value));
}

function gateMatches(gate, task) {
  const when = gate.when ?? {};
  if (when.alwaysForManagedTask === true) return true;
  if (when.projectProfilesAny && !matchesAny(task.projectProfiles, when.projectProfilesAny)) return false;
  if (when.workTypesAny && !when.workTypesAny.includes(task.workType)) return false;
  if (when.domainsAny && !matchesAny(task.domains, when.domainsAny)) return false;
  if (when.changeScopesAny && !when.changeScopesAny.includes(task.changeScope)) return false;
  if (when.researchabilityAny && !when.researchabilityAny.includes(task.researchability)) return false;
  if (when.specialConditionsAny && !matchesAny(task.specialConditions, when.specialConditionsAny)) return false;
  return Object.keys(when).length > 0;
}

function assertKnown(label, value, allowed) {
  if (value == null) return;
  if (!allowed.includes(value)) {
    throw new Error(`${label}: unknown value '${value}'`);
  }
}

function assertKnownMany(label, values, allowed) {
  for (const value of asArray(values)) assertKnown(label, value, allowed);
}

export function loadRouter(routerPath = defaultRouterPath) {
  return JSON.parse(fs.readFileSync(routerPath, 'utf8'));
}

export function resolveRoute(input, router = loadRouter()) {
  const task = {
    projectProfiles: asArray(input.projectProfiles),
    workType: input.workType,
    domains: asArray(input.domains),
    changeScope: input.changeScope ?? 'MODERATE',
    risk: input.risk ?? 'MEDIUM',
    researchability: input.researchability ?? 'POSSIBLE',
    specialConditions: asArray(input.specialConditions)
  };

  if (!task.workType) throw new Error('workType is required');

  assertKnown('workType', task.workType, router.classification.workTypes);
  assertKnown('changeScope', task.changeScope, router.classification.changeScopes);
  assertKnown('risk', task.risk, router.classification.risks);
  assertKnown('researchability', task.researchability, router.classification.researchability);
  assertKnownMany('projectProfiles', task.projectProfiles, router.classification.projectProfiles);
  assertKnownMany('domains', task.domains, router.classification.domains);
  assertKnownMany('specialConditions', task.specialConditions, router.classification.specialConditions);

  const ownerKeys = [];
  ownerKeys.push(...(router.baseByWorkType[task.workType] ?? []));

  for (const profile of task.projectProfiles) {
    ownerKeys.push(...(router.byProfile[profile] ?? []));
  }
  for (const domain of task.domains) {
    ownerKeys.push(...(router.byDomain[domain] ?? []));
  }

  const appliedGates = [];
  for (const gate of router.gates) {
    if (!gateMatches(gate, task)) continue;
    appliedGates.push(gate.id);
    ownerKeys.push(...gate.requireOwners);
  }

  const normalizedOwners = unique(ownerKeys);
  const requiredDocs = normalizedOwners.map((owner) => {
    const doc = router.ownerDocs[owner];
    if (!doc) throw new Error(`Router references unknown owner '${owner}'`);
    return doc;
  });

  return {
    routerId: router.routerId,
    schemaVersion: router.schemaVersion,
    classification: task,
    ownerKeys: normalizedOwners,
    requiredDocs: unique(requiredDocs),
    requiredGates: unique(appliedGates),
    canProceed: true
  };
}

async function readCliInput(arg) {
  if (arg) {
    const possiblePath = path.resolve(process.cwd(), arg);
    if (fs.existsSync(possiblePath)) return JSON.parse(fs.readFileSync(possiblePath, 'utf8'));
    return JSON.parse(arg);
  }

  if (process.stdin.isTTY) {
    throw new Error('Pass a JSON string/file path or pipe JSON to stdin.');
  }

  let data = '';
  for await (const chunk of process.stdin) data += chunk;
  return JSON.parse(data);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const input = await readCliInput(process.argv[2]);
    console.log(JSON.stringify(resolveRoute(input), null, 2));
  } catch (error) {
    console.error(`Rule routing failed: ${error.message}`);
    process.exit(1);
  }
}
