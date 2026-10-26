// Builds lesson sessions from course content, Duolingo-style: introduce, recognise, produce, review.
import { CHARACTERS } from '../content/characters';
import type { CharId, Chat, Lang, Reply, Voice } from '../content/types';
import { COURSE, itemsUpTo, lessonItems, unitItems, type Item, type PathNode } from './course';
import { rng, type Rng } from './rng';
import { recall, type MemMap } from './srs';
import { alts, clean, first, tokens } from './text';

export type ExKind =
  | 'pickImage'
  | 'pickMeaning'
  | 'pickBn'
  | 'buildNative'
  | 'buildBn'
  | 'listenBuild'
  | 'listenPick'
  | 'match'
  | 'fill'
  | 'chat'
  | 'typeBn'
  | 'speak';

export interface Option {
  text: string;
  bn?: string;
  voice?: Voice;
  emoji?: string;
}

export interface Exercise {
  uid: string;
  kind: ExKind;
  /** SRS keys this exercise practises. */
  keys: string[];
  isNew?: boolean;
  /** Banglish prompt (shown and/or spoken). */
  bn?: string;
  voice?: Voice;
  /** Prompt in the learner's language. */
  prompt?: string;
  who?: CharId;
  options?: Option[];
  answer?: number;
  replies?: Reply[];
  tiles?: string[];
  accepted?: string[];
  pairs?: { bn: string; voice: Voice; native: string }[];
  blank?: { before: string; after: string };
  /** Shown in the feedback banner. */
  solution: string;
  meaning?: string;
}

// Words that swap with each other to make near-miss distractors.
const SWAP_GROUPS: string[][] = [
  ['ami', 'tumi', 'apni', 'se', 'uni', 'amra'],
  ['amar', 'tomar', 'apnar', 'tar', 'onar', 'amader'],
  ['amake', 'tomake', 'apnake', 'take', 'onake'],
  ['achi', 'acho', 'achen', 'ache'],
  ['eta', 'ota', 'seta'],
  ['ekhane', 'okhane', 'shekhane'],
  ['ki', 'ke', 'kothay', 'kokhon', 'keno', 'kemon', 'koto', 'kivabe'],
  ['aj', 'kal', 'porshu', 'ekhon'],
  ['bhalo', 'kharap', 'boro', 'choto'],
  ['ek', 'dui', 'tin', 'char', 'pach', 'choy', 'shat', 'at', 'noy', 'dosh'],
  ['bish', 'ponchash', 'eksho', 'pachsho'],
  ['ekta', 'duita', 'atta'],
  ['charjon', 'pachjon', 'noyjon', 'duijon'],
  ['khai', 'khao', 'khan', 'khay', 'khabo', 'khabe', 'khaben'],
  ['khida', 'pipasha', 'thanda', 'gorom'],
  ['khushi', 'klanto', 'kharap'],
  ['matha', 'pet'],
  ['tomake', 'apnake', 'amake'],
];

const PROPER = new Set(['I', 'Allah', 'Indonesia', 'Bangladesh', 'Dhaka', 'Jakarta']);

let properCache: Set<string> | null = null;
/** Tokens that are capitalised mid-sentence somewhere in the course are proper nouns. */
function properNouns(): Set<string> {
  if (properCache) return properCache;
  const set = new Set(PROPER);
  for (const it of COURSE.items.values()) {
    for (const text of [it.bn, ...alts(it.en), ...alts(it.id)]) {
      tokens(text).forEach((t, i) => {
        if (i > 0 && /^[A-Z]/.test(t)) set.add(t);
      });
    }
  }
  properCache = set;
  return set;
}

/** Tile text: lowercase sentence-initial words unless they are proper nouns. */
function tileForm(t: string): string {
  return properNouns().has(t) ? t : t.toLowerCase();
}

function sentenceTiles(s: string): string[] {
  return tokens(s).map(tileForm);
}

let siblingIndex: Map<string, string[]> | null = null;
/** Forms that look alike (same 3-letter stem) or belong to a swap group. */
function siblings(word: string): string[] {
  if (!siblingIndex) {
    siblingIndex = new Map();
    const all = new Set<string>();
    for (const k of COURSE.lexicon.keys()) if (!k.includes(' ')) all.add(k);
    for (const it of COURSE.items.values()) tokens(it.bn).forEach((t) => all.add(clean(t)));
    const byStem = new Map<string, string[]>();
    for (const w of all) {
      if (w.length < 3) continue;
      const stem = w.slice(0, 3);
      byStem.set(stem, [...(byStem.get(stem) ?? []), w]);
    }
    for (const w of all) {
      const group = SWAP_GROUPS.find((g) => g.includes(w)) ?? [];
      const stemmed = w.length >= 3 ? (byStem.get(w.slice(0, 3)) ?? []) : [];
      siblingIndex.set(w, [...new Set([...group, ...stemmed])].filter((x) => x !== w));
    }
  }
  return siblingIndex.get(clean(word)) ?? [];
}

function matchCase(src: string, repl: string): string {
  return /^[A-Z]/.test(src) ? repl[0].toUpperCase() + repl.slice(1) : repl;
}

class Gen {
  private n = 0;
  constructor(
    private lang: Lang,
    private r: Rng,
    private words: Item[],
    private sentences: Item[],
  ) {}

  nat(it: Item): string {
    return first(it[this.lang]);
  }

  private uid(kind: string) {
    return `${kind}-${this.n++}`;
  }

  /** Other items of the same kind whose meaning and spelling differ from `it`. */
  private others(it: Item, pool: Item[]): Item[] {
    const n = clean(this.nat(it));
    const b = clean(it.bn);
    return pool.filter((o) => clean(o.bn) !== b && clean(this.nat(o)) !== n);
  }

  /** Replace one swappable word to make a believable wrong version of a sentence. */
  mutate(bn: string): string | null {
    const raw = bn.split(' ');
    const idx = this.r.shuffle(raw.map((_, i) => i));
    for (const i of idx) {
      const word = raw[i].replace(/[.,!?]/g, '');
      const sib = siblings(word);
      if (!sib.length) continue;
      const repl = this.r.pick(sib);
      const out = [...raw];
      out[i] = raw[i].replace(word, matchCase(word, repl));
      const res = out.join(' ');
      if (clean(res) !== clean(bn)) return res;
    }
    return null;
  }

  /** Up to n wrong Banglish strings close to `it`. */
  private bnDistractors(it: Item, n: number): string[] {
    const out = new Set<string>();
    if (it.kind === 'sentence') {
      for (let tries = 0; tries < 6 && out.size < n; tries++) {
        const m = this.mutate(it.bn);
        if (m) out.add(m);
      }
    }
    const pool = this.others(it, it.kind === 'word' ? this.words : this.sentences);
    const byLen = [...pool].sort(
      (a, b) => Math.abs(a.bn.length - it.bn.length) - Math.abs(b.bn.length - it.bn.length),
    );
    for (const o of this.r.shuffle(byLen.slice(0, 8))) {
      if (out.size >= n) break;
      out.add(o.bn);
    }
    return [...out].filter((x) => clean(x) !== clean(it.bn)).slice(0, n);
  }

  pickImage(it: Item, isNew = false): Exercise | null {
    if (!it.emoji) return null;
    const pool = this.others(it, this.words).filter((o) => o.emoji && o.emoji !== it.emoji);
    if (pool.length < 3) return null;
    const opts = this.r.shuffle([it, ...this.r.sample(pool, 3)]);
    return {
      uid: this.uid('img'),
      kind: 'pickImage',
      keys: [it.key],
      isNew,
      bn: it.bn,
      voice: it.voice,
      options: opts.map((o) => ({ text: this.nat(o), emoji: o.emoji })),
      answer: opts.indexOf(it),
      solution: this.nat(it),
    };
  }

  pickMeaning(it: Item, isNew = false, audioOnly = false): Exercise | null {
    const pool = this.others(it, it.kind === 'word' ? this.words : this.sentences);
    if (pool.length < 2) return null;
    const opts = this.r.shuffle([it, ...this.r.sample(pool, it.kind === 'word' ? 3 : 2)]);
    return {
      uid: this.uid('mean'),
      kind: 'pickMeaning',
      keys: [it.key],
      isNew,
      bn: it.bn,
      voice: it.voice,
      prompt: audioOnly ? 'audio' : undefined,
      options: opts.map((o) => ({ text: this.nat(o) })),
      answer: opts.indexOf(it),
      solution: this.nat(it),
      meaning: audioOnly ? `${it.bn} = ${this.nat(it)}` : undefined,
    };
  }

  pickBn(it: Item): Exercise | null {
    const wrong = this.bnDistractors(it, 2);
    if (wrong.length < 2) return null;
    const texts = this.r.shuffle([it.bn, ...wrong]);
    return {
      uid: this.uid('pbn'),
      kind: 'pickBn',
      keys: [it.key],
      prompt: this.nat(it),
      options: texts.map((t) => ({ text: t, bn: t, voice: it.voice })),
      answer: texts.indexOf(it.bn),
      solution: it.bn,
    };
  }

  listenPick(it: Item): Exercise | null {
    const wrong = this.bnDistractors(it, 2);
    if (wrong.length < 2) return null;
    const texts = this.r.shuffle([it.bn, ...wrong]);
    return {
      uid: this.uid('lp'),
      kind: 'listenPick',
      keys: [it.key],
      bn: it.bn,
      voice: it.voice,
      options: texts.map((t) => ({ text: t })),
      answer: texts.indexOf(it.bn),
      solution: it.bn,
      meaning: this.nat(it),
    };
  }

  buildNative(it: Item): Exercise {
    const answer = sentenceTiles(this.nat(it));
    const have = new Set(answer.map((t) => t.toLowerCase()));
    const extra: string[] = [];
    // Wrong tiles come from other sentences' translations (never from word glosses like "yes (polite)").
    for (const o of this.r.shuffle(this.others(it, this.sentences))) {
      for (const t of sentenceTiles(this.nat(o))) {
        if (!have.has(t.toLowerCase()) && !extra.some((e) => e.toLowerCase() === t.toLowerCase())) extra.push(t);
      }
      if (extra.length >= 8) break;
    }
    const nExtra = Math.min(answer.length >= 5 ? 4 : 3, extra.length);
    return {
      uid: this.uid('bn2n'),
      kind: 'buildNative',
      keys: [it.key],
      bn: it.bn,
      voice: it.voice,
      tiles: this.r.shuffle([...answer, ...this.r.sample(extra, nExtra)]),
      accepted: alts(it[this.lang]),
      solution: this.nat(it),
    };
  }

  private bnTiles(it: Item): string[] {
    const answer = sentenceTiles(it.bn);
    const have = new Set(answer.map((t) => clean(t)));
    const extra = new Set<string>();
    for (const t of this.r.shuffle(answer)) {
      for (const s of this.r.shuffle(siblings(t)).slice(0, 1)) if (!have.has(s)) extra.add(s);
      if (extra.size >= 2) break;
    }
    const filler = this.r.shuffle([...this.words, ...this.sentences]).flatMap((o) => sentenceTiles(o.bn));
    for (const t of filler) {
      if (extra.size >= (answer.length >= 5 ? 4 : 3)) break;
      if (!have.has(clean(t))) extra.add(t);
    }
    return this.r.shuffle([...answer, ...extra]);
  }

  buildBn(it: Item): Exercise {
    return {
      uid: this.uid('n2bn'),
      kind: 'buildBn',
      keys: [it.key],
      prompt: this.nat(it),
      voice: it.voice,
      tiles: this.bnTiles(it),
      accepted: it.alts,
      solution: it.bn,
    };
  }

  listenBuild(it: Item): Exercise {
    return {
      uid: this.uid('lb'),
      kind: 'listenBuild',
      keys: [it.key],
      bn: it.bn,
      voice: it.voice,
      tiles: this.bnTiles(it),
      accepted: it.alts,
      solution: it.bn,
      meaning: this.nat(it),
    };
  }

  typeBn(it: Item): Exercise {
    return {
      uid: this.uid('type'),
      kind: 'typeBn',
      keys: [it.key],
      prompt: this.nat(it),
      voice: it.voice,
      bn: it.bn,
      accepted: it.alts,
      solution: it.bn,
    };
  }

  match(items: Item[]): Exercise | null {
    const seenN = new Set<string>();
    const seenB = new Set<string>();
    const picked: Item[] = [];
    for (const it of items) {
      const n = clean(this.nat(it));
      const b = clean(it.bn);
      if (seenN.has(n) || seenB.has(b)) continue;
      seenN.add(n);
      seenB.add(b);
      picked.push(it);
      if (picked.length === 5) break;
    }
    if (picked.length < 4) return null;
    return {
      uid: this.uid('match'),
      kind: 'match',
      keys: picked.map((p) => p.key),
      pairs: picked.map((p) => ({ bn: p.bn, voice: p.voice, native: this.nat(p) })),
      solution: '',
    };
  }

  fill(it: Item): Exercise | null {
    const raw = it.bn.split(' ');
    if (raw.length < 2) return null;
    const cands = raw
      .map((t, i) => ({ i, word: t.replace(/[.,!?]/g, '') }))
      .filter((c) => c.word.length >= 2 && siblings(c.word).length >= 2);
    if (!cands.length) return null;
    const c = this.r.pick(cands);
    const wrong = this.r.sample(siblings(c.word), 2).map((x) => matchCase(c.word, x));
    const opts = this.r.shuffle([c.word, ...wrong]);
    const trailing = raw[c.i].slice(raw[c.i].indexOf(c.word) + c.word.length);
    return {
      uid: this.uid('fill'),
      kind: 'fill',
      keys: [it.key],
      bn: it.bn,
      voice: it.voice,
      blank: { before: raw.slice(0, c.i).join(' '), after: (trailing + ' ' + raw.slice(c.i + 1).join(' ')).trim() },
      options: opts.map((o) => ({ text: o })),
      answer: opts.indexOf(c.word),
      prompt: this.nat(it),
      solution: it.bn,
    };
  }

  chat(c: Chat): Exercise {
    const replies = this.r.shuffle(c.replies);
    return {
      uid: this.uid('chat'),
      kind: 'chat',
      keys: [clean(c.bn)],
      who: c.who,
      bn: c.bn,
      voice: CHAR_VOICE[c.who],
      prompt: first(c[this.lang]),
      replies,
      answer: replies.findIndex((r) => r.ok),
      solution: replies.filter((r) => r.ok).map((r) => r.bn).join(' / '),
    };
  }

  speak(it: Item): Exercise {
    return {
      uid: this.uid('speak'),
      kind: 'speak',
      keys: [],
      bn: it.bn,
      voice: it.voice,
      prompt: this.nat(it),
      solution: it.bn,
    };
  }
}

const CHAR_VOICE = Object.fromEntries(Object.entries(CHARACTERS).map(([k, v]) => [k, v.voice])) as Record<
  CharId,
  Voice
>;

const compact = (xs: (Exercise | null | undefined)[]): Exercise[] => xs.filter((x): x is Exercise => !!x);

/** Items the learner knows that are most in need of review. */
function weakest(pool: Item[], mem: MemMap, n: number, r: Rng): Item[] {
  const now = Date.now();
  return [...pool]
    .map((it) => ({ it, p: recall(mem[it.key], now) + r.next() * 0.15 }))
    .sort((a, b) => a.p - b.p)
    .slice(0, n)
    .map((x) => x.it);
}

const isShort = (it: Item) => tokens(it.bn).length <= 4;

/** Does Banglish sentence `s` contain word/phrase `w` as whole words? */
function containsWord(s: string, w: string): boolean {
  return ` ${clean(s)} `.includes(` ${clean(w)} `);
}

/** Keep at most `cap` exercises of any one kind (Duolingo caps exercise types per session). */
function capKinds(list: Exercise[], cap: number, except: ExKind[] = []): Exercise[] {
  const count: Partial<Record<ExKind, number>> = {};
  return list.filter((e) => {
    if (except.includes(e.kind)) return true;
    count[e.kind] = (count[e.kind] ?? 0) + 1;
    return count[e.kind]! <= cap;
  });
}

export interface SessionOptions {
  lang: Lang;
  mem: MemMap;
  seed: number;
}

export function lessonSession(node: PathNode, round: number, o: SessionOptions): Exercise[] {
  const r = rng(o.seed);
  const known = itemsUpTo(node.index);
  const words = known.filter((i) => i.kind === 'word');
  const sents = known.filter((i) => i.kind === 'sentence');
  const g = new Gen(o.lang, r, words, sents);
  const { words: nw, sentences: ns } = lessonItems(node);
  const chats = node.unit.def.lessons[node.lesson ?? 0].chats ?? [];
  const previous = known.filter((i) => i.introAt < node.index);
  const out: Exercise[] = [];

  if (round === 0) {
    // Duolingo rhythm: meet a word, check it, then see it used in a sentence straight away.
    const pending = [...ns];
    const introduced: Item[] = [];
    const ready = (s: Item) => nw.every((w) => !containsWord(s.bn, w.bn) || introduced.includes(w));
    nw.forEach((w, i) => {
      const intro = i % 3 === 2 ? g.pickMeaning(w, true) : (g.pickImage(w, true) ?? g.pickMeaning(w, true));
      out.push(...compact([intro]));
      introduced.push(w);
      if (i % 2 === 1) out.push(...compact([r.next() < 0.5 ? g.pickBn(nw[i - 1]) : g.listenPick(nw[i])]));
      const s = pending.find((x) => containsWord(x.bn, w.bn) && ready(x));
      if (s) {
        pending.splice(pending.indexOf(s), 1);
        out.push(g.buildNative(s));
      }
    });
    out.push(...compact([g.match(r.shuffle([...nw, ...weakest(previous.filter((p) => p.kind === 'word'), o.mem, 3, r)]))]));
    const rest = r.shuffle(pending);
    rest.slice(0, 2).forEach((s) => out.push(g.buildBn(s)));
    out.push(...compact([rest[2] && g.fill(rest[2]), rest[3] ? g.buildNative(rest[3]) : null, ns[0] && g.listenPick(r.pick(ns))]));
    chats.slice(0, 1).forEach((c) => out.push(g.chat(c)));
    return capKinds(out, 5, ['pickImage', 'pickMeaning']).slice(0, 16);
  }

  // Round 2: produce what was introduced, plus spaced review of older material.
  const sen = r.shuffle(ns);
  const review = weakest(previous, o.mem, 2, r);
  out.push(...compact([nw[0] && g.pickBn(nw[0]), nw[1] && g.listenPick(nw[1])]));
  const shortWord = nw.find(isShort);
  if (shortWord) out.push(g.typeBn(shortWord));
  out.push(...compact([g.match(r.shuffle([...nw, ...weakest(previous.filter((p) => p.kind === 'word'), o.mem, 3, r)]))]));
  sen.slice(0, 3).forEach((s) => out.push(g.buildBn(s)));
  sen.slice(3, 5).forEach((s) => out.push(g.listenBuild(s)));
  out.push(...compact([sen[5] ? g.fill(sen[5]) : sen[0] && g.fill(sen[0]), sen[1] && g.buildNative(sen[1])]));
  chats.forEach((c) => out.push(g.chat(c)));
  if (sen[2]) out.push(g.speak(sen[2]));
  review.forEach((it) => out.push(it.kind === 'word' ? (g.pickBn(it) ?? g.buildBn(it)) : g.buildBn(it)));
  const shortSen = sen.find(isShort);
  if (shortSen && node.unit.level.n >= 1) out.push(g.typeBn(shortSen));
  return capKinds(out, 4, ['chat']).slice(0, 17);
}

export function listenSession(node: PathNode, o: SessionOptions): Exercise[] {
  const r = rng(o.seed);
  const known = itemsUpTo(node.index);
  const g = new Gen(o.lang, r, known.filter((i) => i.kind === 'word'), known.filter((i) => i.kind === 'sentence'));
  const pool = r.shuffle(unitItems(node.unit).filter((i) => i.introAt <= node.index));
  const sen = pool.filter((i) => i.kind === 'sentence');
  const wds = pool.filter((i) => i.kind === 'word');
  const out = compact([
    ...wds.slice(0, 2).map((w) => g.listenPick(w)),
    ...sen.slice(0, 3).map((s) => g.listenPick(s)),
    ...sen.slice(3, 7).map((s) => g.listenBuild(s)),
    ...sen.slice(7, 9).map((s) => g.pickMeaning(s, false, true)),
    sen[0] && g.speak(sen[0]),
  ]);
  return r.shuffle(out).slice(0, 12);
}

export function chatSession(node: PathNode, o: SessionOptions): Exercise[] {
  const r = rng(o.seed);
  const known = itemsUpTo(node.index);
  const g = new Gen(o.lang, r, known.filter((i) => i.kind === 'word'), known.filter((i) => i.kind === 'sentence'));
  const out = node.unit.chats.map((c) => g.chat(c));
  const sen = r.shuffle(node.unit.sentences.filter((s) => s.introAt <= node.index));
  for (const s of sen) {
    if (out.length >= 10) break;
    out.push(...compact([r.next() < 0.5 ? g.fill(s) : g.buildBn(s)]));
  }
  return r.shuffle(out);
}

/** Mixed review. `scope` is the set of items to draw from; weakest first. */
export function reviewSession(scope: Item[], upTo: number, n: number, o: SessionOptions, test = false): Exercise[] {
  const r = rng(o.seed);
  const known = itemsUpTo(upTo);
  const g = new Gen(o.lang, r, known.filter((i) => i.kind === 'word'), known.filter((i) => i.kind === 'sentence'));
  const picked = test ? r.sample(scope, n + 4) : weakest(scope, o.mem, n + 4, r);
  const out: Exercise[] = [];
  picked.forEach((it, i) => {
    const roll = (i + r.int(3)) % 6;
    if (it.kind === 'word') {
      out.push(...compact([roll < 2 ? g.pickBn(it) : roll < 4 ? g.listenPick(it) : isShort(it) ? g.typeBn(it) : g.pickMeaning(it)]));
    } else {
      const make = [
        () => g.buildBn(it),
        () => g.listenBuild(it),
        () => g.fill(it),
        () => g.buildNative(it),
        () => (isShort(it) ? g.typeBn(it) : g.buildBn(it)),
        () => g.pickMeaning(it, false, true),
      ][roll];
      out.push(...compact([make()]));
    }
  });
  const unitChats = scope.length ? COURSE.units.filter((u) => scope.some((s) => s.unitN === u.n)).flatMap((u) => u.chats) : [];
  r.sample(unitChats, test ? 3 : 2).forEach((c) => out.push(g.chat(c)));
  return capKinds(r.shuffle(out), Math.ceil(n / 3)).slice(0, n);
}

/** Practice-hub sessions over everything learned so far (path index `upTo`). */
export function practiceSession(mode: 'review' | 'mistakes' | 'listen', upTo: number, o: SessionOptions): Exercise[] {
  if (upTo < 0) return [];
  const learned = itemsUpTo(upTo).filter((i) => o.mem[i.key]);
  if (mode === 'review') return reviewSession(learned, upTo, 12, o);
  if (mode === 'mistakes') {
    const since = Date.now() - 21 * 86_400_000;
    const wrong = learned.filter((i) => (o.mem[i.key].lastBad ?? 0) > since);
    return wrong.length ? reviewSession(wrong, upTo, Math.min(10, wrong.length + 2), o) : [];
  }
  const r = rng(o.seed);
  const g = new Gen(o.lang, r, itemsUpTo(upTo).filter((i) => i.kind === 'word'), itemsUpTo(upTo).filter((i) => i.kind === 'sentence'));
  const pool = weakest(learned, o.mem, 14, r);
  return r.shuffle(
    compact(
      pool.map((it, i) =>
        it.kind === 'word' ? g.listenPick(it) : i % 3 === 0 ? g.pickMeaning(it, false, true) : i % 3 === 1 ? g.listenPick(it) : g.listenBuild(it),
      ),
    ),
  ).slice(0, 12);
}

export function sessionFor(node: PathNode, round: number, o: SessionOptions): Exercise[] {
  switch (node.kind) {
    case 'lesson':
      return lessonSession(node, round, o);
    case 'listen':
      return listenSession(node, o);
    case 'chat':
      return chatSession(node, o);
    case 'practice': {
      const unitPool = unitItems(node.unit);
      const older = itemsUpTo(node.index).filter((i) => i.unitN < node.unit.n);
      const r = rng(o.seed);
      const scope = [...unitPool, ...weakest(older, o.mem, 6, r)];
      return reviewSession(scope, node.index, 15, o);
    }
    case 'test':
      return reviewSession(unitItems(node.unit), node.index, 18, o, true);
    case 'exam': {
      const units = COURSE.units.filter((u) => u.level.id === node.unit.level.id);
      return reviewSession(units.flatMap(unitItems), node.index, 30, o, true);
    }
    default:
      return [];
  }
}
