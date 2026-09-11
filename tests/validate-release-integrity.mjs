import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const errors = [];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function readJson(rel) {
  try {
    return JSON.parse(read(rel));
  } catch (error) {
    errors.push(`${rel}: invalid JSON -> ${error.message}`);
    return null;
  }
}

function git(args) {
  try {
    return execFileSync('git', args, {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    }).trim();
  } catch (error) {
    const stderr = error?.stderr?.toString?.().trim();
    throw new Error(stderr || error.message);
  }
}

function listDiff(base, head = 'HEAD', threeDot = false) {
  const range = `${base}${threeDot ? '...' : '..'}${head}`;
  const output = git(['diff', '--name-only', range]);
  return output ? output.split('\n').map((value) => value.trim()).filter(Boolean) : [];
}

function isReleaseAffecting(rel) {
  if ([
    'README.md',
    'START_HERE.md',
    'REQUIREMENTS.md',
    'DASHBOARD_REQUIREMENTS.md',
    'WORK_QUEUE_REQUIREMENTS.md',
    'index.html',
    'project-dashboard.json'
  ].includes(rel)) return true;

  return [
    /^docs\//,
    /^templates\//,
    /^catalog\//,
    /^site\//,
    /^project-dashboards\//,
    /^tests\//,
    /^\.github\/workflows\//,
    /^maintenance\/rule-router(?:\.schema)?\.json$/
  ].some((pattern) => pattern.test(rel));
}

function sectionBody(markdown, heading) {
  const marker = `## ${heading}`;
  const start = markdown.indexOf(marker);
  if (start < 0) return null;
  const bodyStart = markdown.indexOf('\n', start);
  if (bodyStart < 0) return '';
  const rest = markdown.slice(bodyStart + 1);
  const next = rest.search(/^##\s+/m);
  return next < 0 ? rest : rest.slice(0, next);
}

const meta = readJson('guide-version.json');
const changelog = read('CHANGELOG.md');

if (meta) {
  if (!/^\d+\.\d+\.\d+$/.test(meta.guideVersion || '')) {
    errors.push('guide-version.json: guideVersion must be SemVer-like X.Y.Z');
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.updated || '')) {
    errors.push('guide-version.json: updated must be YYYY-MM-DD and represents the released baseline date');
  }
  if (!['released', 'unreleased-changes'].includes(meta.status)) {
    errors.push('guide-version.json: status must be released or unreleased-changes');
  }
  if (!/^[0-9a-f]{40}$/.test(meta.releaseCommit || '')) {
    errors.push('guide-version.json: releaseCommit must be a full 40-character commit SHA');
  }

  const latestRelease = changelog.match(/^##\s+(\d+\.\d+\.\d+)\s+-\s+(\d{4}-\d{2}-\d{2})/m);
  if (!latestRelease) {
    errors.push('CHANGELOG.md: released baseline heading not found');
  } else {
    if (latestRelease[1] !== meta.guideVersion) {
      errors.push(`CHANGELOG latest released version ${latestRelease[1]} != guide-version ${meta.guideVersion}`);
    }
    if (latestRelease[2] !== meta.updated) {
      errors.push(`CHANGELOG latest released date ${latestRelease[2]} != guide-version updated ${meta.updated}`);
    }
  }

  const unreleased = sectionBody(changelog, 'Unreleased');
  const hasUnreleasedEntry = unreleased != null && /^-\s+\S/m.test(unreleased);

  if (meta.status === 'unreleased-changes' && !hasUnreleasedEntry) {
    errors.push('CHANGELOG.md: status is unreleased-changes but ## Unreleased has no entries');
  }
  if (meta.status === 'released' && hasUnreleasedEntry) {
    errors.push('guide-version.json: status is released but CHANGELOG ## Unreleased still contains entries');
  }

  if (/^[0-9a-f]{40}$/.test(meta.releaseCommit || '')) {
    try {
      git(['cat-file', '-e', `${meta.releaseCommit}^{commit}`]);
    } catch {
      errors.push('guide-version.json: releaseCommit is not available in git history; CI/local validation needs full history');
    }

    try {
      git(['merge-base', '--is-ancestor', meta.releaseCommit, 'HEAD']);
    } catch {
      errors.push('guide-version.json: releaseCommit must be an ancestor of the validated HEAD');
    }

    try {
      const changedSinceRelease = listDiff(meta.releaseCommit);
      const releaseAffecting = changedSinceRelease.filter(isReleaseAffecting);
      if (releaseAffecting.length > 0 && meta.status !== 'unreleased-changes') {
        errors.push(`guide-version.json: ${releaseAffecting.length} release-affecting file(s) changed after releaseCommit but status is not unreleased-changes`);
      }
    } catch (error) {
      errors.push(`release baseline diff failed -> ${error.message}`);
    }
  }
}

const baseSha = (process.env.RELEASE_BASE_SHA || '').trim();
if (/^[0-9a-f]{40}$/.test(baseSha) && !/^0+$/.test(baseSha)) {
  try {
    git(['cat-file', '-e', `${baseSha}^{commit}`]);
    const changedThisUpdate = listDiff(baseSha, 'HEAD', true);
    const affectsReleaseState = changedThisUpdate.some(isReleaseAffecting);
    if (affectsReleaseState && !changedThisUpdate.includes('CHANGELOG.md')) {
      errors.push('release-affecting changes must update CHANGELOG.md in the same PR/push');
    }
  } catch (error) {
    errors.push(`current-change release integrity check failed -> ${error.message}`);
  }
}

if (errors.length > 0) {
  console.error(`Release integrity validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Release integrity validation passed.');
