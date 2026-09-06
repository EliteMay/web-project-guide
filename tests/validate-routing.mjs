import fs from 'node:fs';
import path from 'node:path';
import { resolveRoute, loadRouter } from '../scripts/resolve-rule-route.mjs';

const root = process.cwd();
const errors = [];
const routerPath = path.join(root, 'maintenance', 'rule-router.json');
const schemaPath = path.join(root, 'maintenance', 'rule-router.schema.json');
const casesPath = path.join(root, 'tests', 'routing-cases.json');

for (const file of [routerPath, schemaPath, casesPath]) {
  if (!fs.existsSync(file)) errors.push(`Missing routing file: ${path.relative(root, file)}`);
}

let router;
try {
  router = loadRouter(routerPath);
} catch (error) {
  errors.push(`rule-router.json invalid: ${error.message}`);
}

let schema;
try {
  schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  if (schema?.properties?.schemaVersion?.const !== 1) {
    errors.push('rule-router.schema.json must currently require schemaVersion 1');
  }
} catch (error) {
  errors.push(`rule-router.schema.json invalid: ${error.message}`);
}

if (router) {
  if (router.schemaVersion !== 1) errors.push('rule-router.json schemaVersion must currently be 1');
  if (router.behavioralOwner !== 'docs/21-rule-routing-preflight.md') {
    errors.push('rule-router.json behavioralOwner must be docs/21-rule-routing-preflight.md');
  }
  if (router.humanRouter !== 'START_HERE.md') {
    errors.push('rule-router.json humanRouter must be START_HERE.md');
  }

  const ownerEntries = Object.entries(router.ownerDocs ?? {});
  if (!ownerEntries.length) errors.push('rule-router.json must define ownerDocs');
  for (const [owner, rel] of ownerEntries) {
    if (!fs.existsSync(path.join(root, rel))) errors.push(`owner ${owner} points to missing file: ${rel}`);
  }

  const ownerNames = new Set(ownerEntries.map(([owner]) => owner));
  const referencedOwners = [];
  for (const mapName of ['baseByWorkType', 'byDomain', 'byProfile']) {
    for (const [key, owners] of Object.entries(router[mapName] ?? {})) {
      if (!Array.isArray(owners)) errors.push(`${mapName}.${key} must be an array`);
      else referencedOwners.push(...owners.map((owner) => [mapName, key, owner]));
    }
  }

  const gateIds = new Set();
  for (const gate of router.gates ?? []) {
    if (!gate?.id) errors.push('routing gate missing id');
    else if (gateIds.has(gate.id)) errors.push(`duplicate routing gate id: ${gate.id}`);
    else gateIds.add(gate.id);
    if (!ownerNames.has(gate.owner)) errors.push(`gate ${gate.id} has unknown owner: ${gate.owner}`);
    for (const owner of gate.requireOwners ?? []) referencedOwners.push(['gate', gate.id, owner]);
  }

  for (const [scope, key, owner] of referencedOwners) {
    if (!ownerNames.has(owner)) errors.push(`${scope}.${key} references unknown owner: ${owner}`);
  }

  const classification = router.classification ?? {};
  const mapContracts = [
    ['baseByWorkType', 'workTypes'],
    ['byDomain', 'domains'],
    ['byProfile', 'projectProfiles']
  ];
  for (const [mapName, enumName] of mapContracts) {
    const allowed = new Set(classification[enumName] ?? []);
    for (const key of Object.keys(router[mapName] ?? {})) {
      if (!allowed.has(key)) errors.push(`${mapName} has unregistered ${enumName} key: ${key}`);
    }
  }
}

let cases = [];
try {
  cases = JSON.parse(fs.readFileSync(casesPath, 'utf8'));
  if (!Array.isArray(cases) || !cases.length) errors.push('routing-cases.json must contain cases');
} catch (error) {
  errors.push(`routing-cases.json invalid: ${error.message}`);
}

if (router && Array.isArray(cases)) {
  for (const testCase of cases) {
    try {
      const result = resolveRoute(testCase.input, router);
      const docs = new Set(result.requiredDocs);
      const gates = new Set(result.requiredGates);

      for (const doc of testCase.mustInclude ?? []) {
        if (!docs.has(doc)) errors.push(`${testCase.id}: missing required doc ${doc}`);
      }
      for (const doc of testCase.mustNotRequire ?? []) {
        if (docs.has(doc)) errors.push(`${testCase.id}: over-routed doc ${doc}`);
      }
      for (const gate of testCase.mustIncludeGates ?? []) {
        if (!gates.has(gate)) errors.push(`${testCase.id}: missing required gate ${gate}`);
      }
      for (const gate of testCase.mustNotIncludeGates ?? []) {
        if (gates.has(gate)) errors.push(`${testCase.id}: over-routed gate ${gate}`);
      }
    } catch (error) {
      errors.push(`${testCase.id}: resolver error: ${error.message}`);
    }
  }
}

if (errors.length) {
  console.error('Routing validation failed:\n');
  for (const error of [...new Set(errors)]) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Routing validation passed: ${cases.length} golden cases / ${Object.keys(router.ownerDocs).length} owners / ${router.gates.length} gates.`);
