import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const bundledPython = '/Users/nick/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const python = process.env.PYTHON ?? (existsSync(bundledPython) ? bundledPython : 'python3');

execFileSync(python, ['scripts/render-resume-pdf.py'], {
  stdio: 'inherit',
});
