import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const validator = path.join(here, 'validate-release-integrity.mjs');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-release-integrity-'));

function run(command, args = [], options = {}) {
  return execFileSync(command, args, {
    cwd: temp,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options
  });
}

function write(rel, content) {
  const target = path.join(temp, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

function commit(message) {
  run('git', ['add', '.']);
  run('git', ['commit', '-m', message]);
  return run('git', ['rev-parse', 'HEAD']).trim();
}

function validate(expectSuccess) {
  try {
    execFileSync(process.execPath, [validator], {
      cwd: temp,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
    if (!expectSuccess) throw new Error('validator unexpectedly passed');
  } catch (error) {
    if (expectSuccess) {
      const stderr = error?.stderr?.toString?.() || '';
      throw new Error(`validator unexpectedly failed:\n${stderr}`);
    }
    if (error.message === 'validator unexpectedly passed') throw error;
  }
}

try {
  run('git', ['init']);
  run('git', ['config', 'user.email', 'release-test@example.invalid']);
  run('git', ['config', 'user.name', 'Release Integrity Test']);

  write('README.md', '# Guide\n');
  write('CHANGELOG.md', '# CHANGELOG\n\n## 1.0.0 - 2026-09-11\n');
  write('UNRELEASED.md', '# Unreleased Guide Changes\n');
  write('guide-version.json', JSON.stringify({
    guideVersion: '1.0.0',
    updated: '2026-09-11'
  }, null, 2) + '\n');
  const releaseContentCommit = commit('release content baseline');

  write('guide-version.json', JSON.stringify({
    guideVersion: '1.0.0',
    updated: '2026-09-11',
    status: 'released',
    releaseCommit: releaseContentCommit,
    unreleasedLog: 'UNRELEASED.md'
  }, null, 2) + '\n');
  commit('record release bookkeeping');

  // A released state must be representable without requiring a commit to contain its own SHA.
  validate(true);

  // A substantive Guide change after the release baseline must invalidate released state.
  write('README.md', '# Guide\n\nChanged rule surface.\n');
  commit('change guide surface');
  validate(false);

  // Marking the repository as unreleased and recording the change restores consistency.
  write('guide-version.json', JSON.stringify({
    guideVersion: '1.0.0',
    updated: '2026-09-11',
    status: 'unreleased-changes',
    releaseCommit: releaseContentCommit,
    unreleasedLog: 'UNRELEASED.md'
  }, null, 2) + '\n');
  write('UNRELEASED.md', '# Unreleased Guide Changes\n\n## Changed\n\n- Changed rule surface.\n');
  commit('record unreleased state');
  validate(true);

  console.log('Release integrity lifecycle tests passed.');
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
