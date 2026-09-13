const root = document.documentElement.dataset.repoRoot || '../../';
const currentSurfaceId = document.documentElement.dataset.surfaceId || '';

function fromRoot(path) {
  return new URL(`${root}${path}`, window.location.href).href;
}

function ensureSkipLink() {
  if (document.querySelector('.skip-link')) return;
  const main = document.querySelector('main');
  if (!main) return;
  if (!main.id) main.id = 'main-content';
  const link = document.createElement('a');
  link.className = 'skip-link';
  link.href = `#${main.id}`;
  link.textContent = '本文へ移動';
  document.body.prepend(link);
}

function renderNavigation(manifest) {
  const nav = document.querySelector('[data-human-guide-nav]');
  if (!nav) return;

  const byId = new Map(manifest.surfaces.map((surface) => [surface.id, surface]));
  nav.replaceChildren();

  for (const id of manifest.globalNav) {
    const surface = byId.get(id);
    if (!surface || surface.nav?.visible !== true) continue;
    const link = document.createElement('a');
    link.href = fromRoot(surface.canonicalPath);
    link.textContent = surface.label;
    link.dataset.surfaceId = surface.id;
    if (surface.id === currentSurfaceId) link.setAttribute('aria-current', 'page');
    nav.append(link);
  }

  const brand = document.querySelector('[data-human-guide-home]');
  if (brand) brand.href = fromRoot('index.html');
}

function renderReleaseState(version) {
  const target = document.querySelector('[data-guide-release]');
  if (!target) return;

  const baseline = version.guideVersion ? `Release baseline v${version.guideVersion}` : 'Release baseline';
  const updated = version.updated ? ` · ${version.updated}` : '';
  const status = version.status === 'unreleased-changes'
    ? ' · Current mainには未Release変更あり'
    : '';
  target.textContent = baseline + updated + status;
}

async function initHumanGuideShell() {
  ensureSkipLink();

  try {
    const response = await fetch(fromRoot('site/data/human-guide-manifest.json'));
    if (!response.ok) throw new Error(`manifest ${response.status}`);
    const manifest = await response.json();
    renderNavigation(manifest);
  } catch (error) {
    console.warn('Human Guide manifest could not be loaded.', error);
  }

  if (document.querySelector('[data-guide-release]')) {
    try {
      const response = await fetch(fromRoot('guide-version.json'));
      if (!response.ok) throw new Error(`guide version ${response.status}`);
      renderReleaseState(await response.json());
    } catch (error) {
      console.warn('Guide release state could not be loaded.', error);
    }
  }
}

initHumanGuideShell();
