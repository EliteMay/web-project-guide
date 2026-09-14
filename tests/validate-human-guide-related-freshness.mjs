import fs from 'node:fs';

const errors = [];
const manifestPath = 'site/data/human-guide-manifest.json';
const shellPath = 'site/assets/human-guide-shell.js';
const componentsPath = 'site/assets/human-guide-components.css';
const requirementsPath = 'HUMAN_GUIDE_REQUIREMENTS.md';

for (const path of [manifestPath, shellPath, componentsPath, requirementsPath]) {
  if (!fs.existsSync(path)) errors.push(`missing required Human Guide file: ${path}`);
}

if (errors.length === 0) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const shell = fs.readFileSync(shellPath, 'utf8');
  const components = fs.readFileSync(componentsPath, 'utf8');
  const requirements = fs.readFileSync(requirementsPath, 'utf8');
  const surfaces = manifest.surfaces || [];
  const ids = new Set(surfaces.map((surface) => surface.id));

  for (const surface of surfaces) {
    if (!Array.isArray(surface.relatedSurfaceIds)) {
      errors.push(`${surface.id}: relatedSurfaceIds must be an array`);
      continue;
    }

    const unique = new Set(surface.relatedSurfaceIds);
    if (unique.size !== surface.relatedSurfaceIds.length) {
      errors.push(`${surface.id}: relatedSurfaceIds contains duplicates`);
    }
    if (unique.has(surface.id)) {
      errors.push(`${surface.id}: relatedSurfaceIds must not reference itself`);
    }
    for (const relatedId of unique) {
      if (!ids.has(relatedId)) {
        errors.push(`${surface.id}: unknown related surface -> ${relatedId}`);
      }
    }
  }

  for (const requiredId of ['home', 'ai-workflow', 'rule-finder', 'all-rules', 'research-requirements', 'site-search', 'task-router']) {
    const surface = surfaces.find((item) => item.id === requiredId);
    if (!surface || surface.relatedSurfaceIds.length === 0) {
      errors.push(`${requiredId}: expected at least one explicit Related / Next Step surface`);
    }
  }

  if (/web-project-data/i.test(JSON.stringify(manifest))) {
    errors.push('manifest: private web-project-data must not appear in Related / presentation metadata');
  }

  for (const marker of [
    'renderRelatedSurfaces',
    'surface?.relatedSurfaceIds',
    'data.humanGuideRelated',
    'renderFooterFreshness',
    'data.humanGuideFreshness',
    'Release表示はHuman Summary本文の同期保証ではありません'
  ]) {
    if (!shell.includes(marker)) errors.push(`human-guide-shell.js: missing contract marker -> ${marker}`);
  }

  for (const marker of ['.related-surfaces', '.related-surfaces-links', '.source-footer-freshness']) {
    if (!components.includes(marker)) errors.push(`human-guide-components.css: missing component style -> ${marker}`);
  }

  for (const marker of [
    'Related / Next Steps Contract',
    'relatedSurfaceIds[]',
    'Release表示が本文同期保証ではない',
    'Recommendation Engine'
  ]) {
    if (!requirements.includes(marker)) errors.push(`HUMAN_GUIDE_REQUIREMENTS.md: missing contract -> ${marker}`);
  }
}

if (errors.length) {
  console.error('Human Guide related/freshness validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Human Guide related/freshness validation passed.');
