// Writes tools/audio/needed.json (every clip the app can play) and reports
// which Banglish strings still need a Bengali-script spelling in tools/audio/bn-script.json.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { speakables } from './speakables';

const root = join(import.meta.dirname, '..', '..');
const scriptPath = join(root, 'tools', 'audio', 'bn-script.json');
const mapping: Record<string, string> = existsSync(scriptPath) ? JSON.parse(readFileSync(scriptPath, 'utf8')) : {};

const list = speakables();
writeFileSync(join(root, 'tools', 'audio', 'needed.json'), JSON.stringify(list, null, 1));

const missing = [...new Map(list.filter((s) => !mapping[s.id]).map((s) => [s.id, s])).values()];
console.log(`${list.length} clips, ${new Set(list.map((s) => s.id)).size} unique phrases.`);
if (missing.length) {
  console.log(`${missing.length} phrase(s) need a spelling in tools/audio/bn-script.json:`);
  writeFileSync(join(root, 'tools', 'audio', 'missing.json'), JSON.stringify(Object.fromEntries(missing.map((m) => [m.id, `?? ${m.en}`])), null, 1));
  console.log('  -> listed in tools/audio/missing.json');
} else {
  console.log('Every phrase has a Bengali-script spelling.');
}
