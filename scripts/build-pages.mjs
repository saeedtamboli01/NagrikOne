// Builds the static GitHub Pages version into ./out
// Server-only routes (API + dynamic case page) cannot be exported, so they are set aside during the build.
import { execSync } from 'node:child_process';
import { existsSync, renameSync, writeFileSync, rmSync } from 'node:fs';

const aside = [
  ['app/api', '.pages-aside-api'],
  ['app/cases/[id]', '.pages-aside-case-id']
];

const restore = () => {
  for (const [orig, tmp] of aside) if (existsSync(tmp)) renameSync(tmp, orig);
};
process.on('exit', restore);
process.on('SIGINT', () => process.exit(1));

try {
  for (const [orig, tmp] of aside) if (existsSync(orig)) renameSync(orig, tmp);
  rmSync('.next', { recursive: true, force: true });
  rmSync('out', { recursive: true, force: true });
  execSync('npx next build', { stdio: 'inherit', env: { ...process.env, GITHUB_PAGES: 'true' } });
  writeFileSync('out/.nojekyll', '');
  console.log('\nStatic site ready in ./out');
} finally {
  restore();
}
