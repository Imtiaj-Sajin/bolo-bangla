// Every Banglish string the app can play, with the voice slot it is spoken in.
import { CHARACTERS } from '../../src/content/characters';
import { FRIENDS, GUIDE, TRAPS } from '../../src/content/guide';
import { COURSE } from '../../src/engine/course';
import { audioKey, clean, first, speechText, tokens } from '../../src/engine/text';
import type { Voice } from '../../src/content/types';

export interface Speakable {
  key: string;
  voice: Voice;
  text: string;
  /** Lookup key for the Bengali-script mapping (lowercase, no punctuation). */
  id: string;
  en: string;
  /** Also record a slow version (sentences and phrases). */
  slow: boolean;
}

export function speakables(): Speakable[] {
  const out = new Map<string, Speakable>();
  const add = (text: string, voice: Voice, en: string, slow = false) => {
    // Lines with the learner's own name can't be pre-recorded.
    if (text.includes('{')) return;
    const t = speechText(text);
    const key = audioKey(t, voice);
    const prev = out.get(key);
    if (prev) prev.slow ||= slow;
    else out.set(key, { key, voice, text: t, id: clean(t), en: first(en), slow });
  };
  /** Every single word can be tapped, so each one gets its own clip in the narrator voice. */
  const addWords = (bn: string) => tokens(bn).forEach((w) => !w.includes('{') && add(w, 'f', w));
  const isPhrase = (s: string) => tokens(s).length > 1;

  for (const it of COURSE.items.values()) {
    add(it.bn, it.voice, it.en, isPhrase(it.bn));
    addWords(it.bn);
  }
  for (const unit of COURSE.units) {
    for (const c of unit.chats) {
      add(c.bn, CHARACTERS[c.who].voice, c.en, true);
      addWords(c.bn);
      for (const r of c.replies) {
        add(r.bn, CHARACTERS.you.voice, r.en, true);
        addWords(r.bn);
      }
    }
    for (const step of unit.def.story?.steps ?? []) {
      if ('line' in step) {
        add(step.line.bn, CHARACTERS[step.line.who].voice, step.line.en, true);
        addWords(step.line.bn);
      }
    }
  }
  // Glossed words and phrases (tap targets), spoken by the narrator.
  for (const g of COURSE.lexicon.values()) add(g.bn, 'f', g.en);
  for (const sec of GUIDE) for (const row of sec.rows) for (const ex of row.examples) add(ex, 'f', row.text.en);
  for (const w of FRIENDS) add(w.bn, 'f', w.en);
  for (const w of TRAPS) add(w.bn, 'f', w.means.en);
  return [...out.values()];
}
