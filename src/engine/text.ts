// Text helpers shared by the lesson engine, the hint system and the audio tools.

const PUNCT = /[.,!?;:"“”‘’()¿¡…–—]/g;

/** Lowercase, drop punctuation, collapse spaces. Apostrophes inside words are kept. */
export function clean(s: string): string {
  return s
    .toLowerCase()
    .replace(PUNCT, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Split a sentence into display tokens (punctuation stripped, original case kept). */
export function tokens(s: string): string[] {
  return s
    .replace(PUNCT, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Fold the many ways people spell Banglish into one comparable form, so that
 * "valo", "bhalo" and "bhaloo" all match. Only used for comparison, never shown.
 */
export function foldBanglish(s: string): string {
  let x = clean(s).replace(/[-']/g, '');
  x = x
    .replace(/chh/g, 'ch')
    .replace(/ph/g, 'f')
    .replace(/z/g, 'j')
    .replace(/v/g, 'bh')
    .replace(/w/g, 'o')
    .replace(/sh/g, 's')
    .replace(/ee/g, 'i')
    .replace(/oo/g, 'u')
    .replace(/y/g, 'i')
    .replace(/q/g, 'k');
  // Collapse doubled letters: dhonnobad -> dhonobad, accha -> acha.
  x = x.replace(/([a-z])\1+/g, '$1');
  return x;
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

export type Verdict = 'right' | 'typo' | 'wrong';

/** Compare a typed Banglish answer with the accepted answers. */
export function judgeBanglish(input: string, accepted: string[]): { verdict: Verdict; best: string } {
  const got = foldBanglish(input);
  let best = accepted[0];
  let bestDist = Infinity;
  for (const a of accepted) {
    const want = foldBanglish(a);
    if (got === want) return { verdict: 'right', best: a };
    const d = levenshtein(got, want);
    if (d < bestDist) {
      bestDist = d;
      best = a;
    }
  }
  // One slip per ~6 letters counts as a typo, as long as the word count matches.
  const want = foldBanglish(best);
  const allowed = Math.max(1, Math.floor(want.length / 6));
  const sameWords = got.split(' ').length === want.split(' ').length;
  if (bestDist <= allowed && sameWords) return { verdict: 'typo', best };
  return { verdict: 'wrong', best };
}

/** Compare a word-bank answer (tile sequence) with the accepted sentences. */
export function judgeTiles(built: string[], accepted: string[]): boolean {
  const got = clean(built.join(' '));
  return accepted.some((a) => clean(a) === got);
}

/** Split "a|b|c" alternatives; the first is canonical. */
export function alts(s: string): string[] {
  return s.split('|').map((x) => x.trim()).filter(Boolean);
}

export const first = (s: string) => alts(s)[0];

/** Normalised text used to identify a spoken phrase (for audio files and SRS keys). */
export function speechText(s: string): string {
  return first(s).replace(/\s+/g, ' ').trim();
}

/** FNV-1a 32-bit hash, base36. Must stay identical to tools/scripts/export-audio-list.ts. */
export function hash(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

export function audioKey(text: string, voice: 'f' | 'm'): string {
  return `${voice}-${hash(speechText(text).toLowerCase())}`;
}
