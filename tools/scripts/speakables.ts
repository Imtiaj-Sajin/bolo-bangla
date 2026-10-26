// Every Banglish string the app can play, with the voice it is spoken in.
import { CHARACTERS } from '../../src/content/characters';
import { FRIENDS, GUIDE, TRAPS } from '../../src/content/guide';
import { COURSE } from '../../src/engine/course';
import { audioKey, clean, first, speechText } from '../../src/engine/text';
import type { Voice } from '../../src/content/types';

export interface Speakable {
  key: string;
  voice: Voice;
  text: string;
  /** Lookup key for the Bengali-script mapping (lowercase, no punctuation). */
  id: string;
  en: string;
}

export function speakables(): Speakable[] {
  const out = new Map<string, Speakable>();
  const add = (text: string, voice: Voice, en: string) => {
    const t = speechText(text);
    const key = audioKey(t, voice);
    if (!out.has(key)) out.set(key, { key, voice, text: t, id: clean(t), en: first(en) });
  };
  for (const it of COURSE.items.values()) add(it.bn, it.voice, it.en);
  for (const unit of COURSE.units) {
    for (const c of unit.chats) {
      add(c.bn, CHARACTERS[c.who].voice, c.en);
      for (const r of c.replies) add(r.bn, 'f', r.en);
    }
    for (const step of unit.def.story?.steps ?? []) {
      if ('line' in step) add(step.line.bn, CHARACTERS[step.line.who].voice, step.line.en);
    }
  }
  for (const g of COURSE.lexicon.values()) if (!g.bn.includes(' ')) add(g.bn, 'f', g.en);
  for (const sec of GUIDE) for (const row of sec.rows) for (const ex of row.examples) add(ex, 'f', row.text.en);
  for (const w of FRIENDS) add(w.bn, 'f', w.en);
  for (const w of TRAPS) add(w.bn, 'f', w.means.en);
  return [...out.values()];
}
