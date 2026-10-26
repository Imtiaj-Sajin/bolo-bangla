// Turns the authored levels/units into one linear path of nodes plus lookup tables.
import { LEVELS } from '../content/course';
import type { Chat, Gloss, LevelDef, Sentence, Tr, UnitDef, Voice, Word } from '../content/types';
import { CHARACTERS } from '../content/characters';
import { alts, clean, first } from './text';

export type NodeKind = 'lesson' | 'listen' | 'chat' | 'story' | 'practice' | 'chest' | 'test' | 'exam';

export interface Item extends Tr {
  key: string;
  /** Canonical Banglish (shown and spoken). */
  bn: string;
  /** Every accepted Banglish answer (canonical first). */
  alts: string[];
  voice: Voice;
  kind: 'word' | 'sentence';
  emoji?: string;
  note?: Tr;
  /** Path index of the node that introduces it. */
  introAt: number;
  unitN: number;
}

export interface UnitInfo {
  def: UnitDef;
  level: LevelDef;
  n: number;
  nInLevel: number;
  color: string;
  nodes: PathNode[];
  words: Item[];
  sentences: Item[];
  chats: Chat[];
}

export interface PathNode {
  id: string;
  kind: NodeKind;
  index: number;
  unit: UnitInfo;
  lesson?: number;
  rounds: number;
  title: Tr;
}

export const UNIT_COLORS = ['green', 'purple', 'teal', 'blue', 'orange', 'pink', 'red', 'gold'];

const NODE_TITLES: Record<Exclude<NodeKind, 'lesson'>, Tr> = {
  listen: { en: 'Listening practice', id: 'Latihan mendengar' },
  chat: { en: 'Talk with the family', id: 'Bicara dengan keluarga' },
  story: { en: 'Story', id: 'Cerita' },
  practice: { en: 'Unit review', id: 'Ulasan unit' },
  chest: { en: 'Treasure chest', id: 'Peti harta' },
  test: { en: 'Unit test', id: 'Tes unit' },
  exam: { en: 'Level exam', id: 'Ujian level' },
};

export const PASS = { lesson: 0.6, test: 0.8, exam: 0.8 } as const;

function voiceFor(s: Sentence): Voice {
  return s.v ?? 'f';
}

function build() {
  const path: PathNode[] = [];
  const units: UnitInfo[] = [];
  const items = new Map<string, Item>();
  const lexicon = new Map<string, Gloss>();
  const levelExams = new Map<string, PathNode>();

  const addGloss = (g: Gloss) => {
    const k = clean(g.bn);
    if (!lexicon.has(k)) lexicon.set(k, g);
  };

  let unitN = 0;
  let colorIdx = 0;
  for (const level of LEVELS) {
    level.units.forEach((def, ui) => {
      unitN++;
      const unit: UnitInfo = {
        def,
        level,
        n: unitN,
        nInLevel: ui + 1,
        color: UNIT_COLORS[colorIdx++ % UNIT_COLORS.length],
        nodes: [],
        words: [],
        sentences: [],
        chats: [],
      };
      units.push(unit);
      const push = (kind: NodeKind, id: string, extra: Partial<PathNode> = {}) => {
        const node: PathNode = {
          id,
          kind,
          index: path.length,
          unit,
          rounds: kind === 'lesson' ? 2 : 1,
          title: kind === 'lesson' ? def.lessons[extra.lesson ?? 0].title : NODE_TITLES[kind],
          ...extra,
        };
        path.push(node);
        unit.nodes.push(node);
        return node;
      };

      const addItem = (it: Word | Sentence, kind: 'word' | 'sentence', at: number) => {
        const key = clean(first(it.bn));
        if (items.has(key)) return items.get(key)!;
        const item: Item = {
          key,
          bn: first(it.bn),
          alts: alts(it.bn),
          en: it.en,
          id: it.id,
          voice: kind === 'sentence' ? voiceFor(it as Sentence) : 'f',
          kind,
          emoji: (it as Word).emoji,
          note: (it as Word).note,
          introAt: at,
          unitN,
        };
        items.set(key, item);
        return item;
      };

      def.forms?.forEach(addGloss);
      def.lessons.forEach((lesson, li) => {
        const node = push('lesson', `${def.id}.l${li + 1}`, { lesson: li });
        for (const word of lesson.words) {
          unit.words.push(addItem(word, 'word', node.index));
          addGloss(word);
        }
        lesson.forms?.forEach(addGloss);
        for (const sen of lesson.sentences) unit.sentences.push(addItem(sen, 'sentence', node.index));
        if (lesson.chats) unit.chats.push(...lesson.chats);
        if (li === 1) push('listen', `${def.id}.listen`);
        if (li === 2) {
          push('chest', `${def.id}.chest`);
          if (unit.chats.length) push('chat', `${def.id}.chat`);
        }
      });
      if (def.lessons.length < 3) push('chest', `${def.id}.chest`);
      if (def.lessons.length < 3 && unit.chats.length) push('chat', `${def.id}.chat`);
      if (def.story) push('story', `${def.id}.story`);
      push('practice', `${def.id}.practice`);
      push('test', `${def.id}.test`);
      if (ui === level.units.length - 1) {
        const exam = push('exam', `${level.id}.exam`);
        exam.title = { en: `${level.title.en} exam`, id: `Ujian ${level.title.id}` };
        levelExams.set(level.id, exam);
      }
    });
  }
  return { path, units, items, lexicon, levelExams };
}

export const COURSE = build();

export const nodeById = new Map(COURSE.path.map((n) => [n.id, n]));

/** Items (words + sentences) introduced at or before a path index. */
export function itemsUpTo(index: number): Item[] {
  return [...COURSE.items.values()].filter((it) => it.introAt <= index);
}

export function unitItems(unit: UnitInfo): Item[] {
  return [...unit.words, ...unit.sentences];
}

export function lessonItems(node: PathNode): { words: Item[]; sentences: Item[] } {
  const def = node.unit.def.lessons[node.lesson ?? 0];
  const get = (bn: string) => COURSE.items.get(clean(first(bn)))!;
  return { words: def.words.map((w) => get(w.bn)), sentences: def.sentences.map((s) => get(s.bn)) };
}

export function charVoice(id: keyof typeof CHARACTERS): Voice {
  return CHARACTERS[id].voice;
}

export interface Segment {
  text: string;
  gloss?: Gloss;
}

/** Split a Banglish sentence into hint segments using the longest lexicon match (up to 4 words). */
export function segment(bn: string): Segment[] {
  // Split on spaces only, so the displayed text keeps its punctuation.
  const toks = bn.split(/\s+/).filter(Boolean);
  const out: Segment[] = [];
  let i = 0;
  while (i < toks.length) {
    let matched = false;
    for (let len = Math.min(4, toks.length - i); len >= 1; len--) {
      const phrase = toks.slice(i, i + len).join(' ');
      const g = COURSE.lexicon.get(clean(phrase));
      if (g) {
        out.push({ text: phrase, gloss: g });
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      out.push({ text: toks[i] });
      i++;
    }
  }
  return out;
}
