// Fails if any Bengali-script character (U+0980–U+09FF) appears in the given folders.
// The app must only ever show Banglish. Bengali script lives only in tools/audio (TTS input).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const TEXT = new Set(['.ts', '.tsx', '.js', '.mjs', '.css', '.html', '.json', '.svg', '.webmanifest', '.md', '.txt']);
const BENGALI = /[ঀ-৿]/;
const dirs = process.argv.slice(2);
let bad = 0;

function walk(path) {
  const st = statSync(path, { throwIfNoEntry: false });
  if (!st) return;
  if (st.isDirectory()) {
    for (const name of readdirSync(path)) {
      if (name === 'node_modules' || name === 'audio') continue;
      walk(join(path, name));
    }
    return;
  }
  if (!TEXT.has(extname(path))) return;
  const lines = readFileSync(path, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (BENGALI.test(line)) {
      bad++;
      console.error(`${path}:${i + 1}: Bengali script found`);
    }
  });
}

dirs.forEach(walk);
if (bad) {
  console.error(`\n${bad} line(s) contain Bengali script. The app must use Banglish only.`);
  process.exit(1);
}
console.log(`No Bengali script in: ${dirs.join(', ')}`);
