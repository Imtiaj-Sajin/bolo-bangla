// Writes tools/audio/needed.json (every clip the app can play) and reports which
// Banglish phrases still need a Bengali-script spelling in tools/audio/bn/*.json.
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { speakables } from './speakables';

const root = join(import.meta.dirname, '..', '..');
const bnDir = join(root, 'tools', 'audio', 'bn');
const mapping: Record<string, string> = {};
if (existsSync(bnDir)) {
  for (const f of readdirSync(bnDir).filter((x) => x.endsWith('.json')).sort()) {
    Object.assign(mapping, JSON.parse(readFileSync(join(bnDir, f), 'utf8')));
  }
}

const list = speakables();
writeFileSync(join(root, 'tools', 'audio', 'needed.json'), JSON.stringify(list, null, 1));

const missing = [...new Map(list.filter((s) => !mapping[s.id]).map((s) => [s.id, s])).values()];
const unused = Object.keys(mapping).filter((k) => !list.some((s) => s.id === k));
console.log(`${list.length} clips, ${new Set(list.map((s) => s.id)).size} unique phrases.`);
if (unused.length) console.log(`${unused.length} spelling(s) no longer used: ${unused.slice(0, 20).join(', ')}`);
if (missing.length) {
  writeFileSync(join(root, 'tools', 'audio', 'missing.json'), JSON.stringify(Object.fromEntries(missing.map((m) => [m.id, `?? ${m.en}`])), null, 1));
  console.log(`${missing.length} phrase(s) need a spelling -> tools/audio/missing.json`);
} else {
  rmSync(join(root, 'tools', 'audio', 'missing.json'), { force: true });
  console.log('Every phrase has a Bengali-script spelling.');
}
