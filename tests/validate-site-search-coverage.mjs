import fs from 'node:fs';

const errors = [];
const registryPath = 'site/data/search-sources.json';
const manifestPath = 'site/data/human-guide-manifest.json';
const searchPagePath = 'site/pages/search.html';

function readJson(path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch (error) {
    errors.push(`${path}: invalid or unreadable JSON -> ${error.message}`);
    return null;
  }
}

const registry = readJson(registryPath);
const manifest = readJson(manifestPath);
const searchPage = fs.existsSync(searchPagePath) ? fs.readFileSync(searchPagePath, 'utf8') : '';

if (!searchPage) errors.push(`missing ${searchPagePath}`);

if (registry && manifest) {
  const sources = Array.isArray(registry.sources) ? registry.sources : [];
  const sourceByPath = new Map(sources.map((source) => [source.path, source]));
  const allowedContentTypes = new Set(['requirements', 'entry-doc', 'human-page', 'owner-doc', 'catalog']);

  for (const source of sources) {
    if (!source.contentType) {
      errors.push(`site search source missing contentType: ${source.id || source.path}`);
      continue;
    }
    if (!allowedContentTypes.has(source.contentType)) {
      errors.push(`site search source ${source.id}: unsupported contentType -> ${source.contentType}`);
    }
  }

  const requiredHumanSurfaces = manifest.surfaces.filter((surface) =>
    surface.searchable === true &&
    surface.authority === 'human-summary' &&
    surface.canonicalPath.endsWith('.html') &&
    surface.id !== 'site-search'
  );

  for (const surface of requiredHumanSurfaces) {
    const source = sourceByPath.get(surface.canonicalPath);
    if (!source) {
      errors.push(`site search registry missing canonical Human Guide surface: ${surface.id} -> ${surface.canonicalPath}`);
      continue;
    }
    if (source.authority !== 'human-summary') {
      errors.push(`site search source ${source.id}: canonical Human Guide surface must be human-summary`);
    }
    if (source.contentType !== 'human-page') {
      errors.push(`site search source ${source.id}: canonical Human Guide surface must be contentType=human-page`);
    }
    if (source.destination !== surface.canonicalPath) {
      errors.push(`site search source ${source.id}: destination must equal canonical Human Guide path ${surface.canonicalPath}`);
    }
  }
}

const implementationMarkers = [
  'source.destination',
  'function stripSource',
  '<script\\b',
  '<style\\b',
  'source.authority',
  'source.contentType',
  'contentTypeLabels',
  'id="contentType"',
  "params.set('authority'",
  "params.set('type'",
  "event.key === '/'",
  "key === 'k'",
  'event.ctrlKey || event.metaKey',
  'isTextEntry(event.target)'
];

for (const marker of implementationMarkers) {
  if (!searchPage.includes(marker)) {
    errors.push(`${searchPagePath}: missing search contract marker -> ${marker}`);
  }
}

if (errors.length) {
  console.error('Site-wide search coverage validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Site-wide search coverage validation passed.');
