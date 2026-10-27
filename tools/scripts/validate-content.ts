// Content checks run before every build. Errors fail the build; warnings are printed.
import { LEVELS } from '../../src/content/course';
import { COURSE, nodeById, segment } from '../../src/engine/course';
import { alts, clean, first, tokens } from '../../src/engine/text';

const errors: string[] = [];
const warnings: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);

const unglossed = new Map<string, string>();
const early = new Map<string, string>();
/** Every Banglish word needs a meaning, taught no later than where it is used. */
const checkGloss = (bn: string, where: string, at: number) => {
  for (const seg of segment(bn)) {
    const word = clean(seg.text);
    if (!word || word.startsWith('{')) continue;
    if (!seg.gloss) {
      if (!unglossed.has(word)) unglossed.set(word, where);
      continue;
    }
    const origin = COURSE.lexOrigin.get(word) ?? 0;
    if (origin > at && !early.has(word)) early.set(word, `${where} (taught later at ${COURSE.path[origin]?.id})`);
  }
};

const checkTr = (o: { en: string; id: string }, where: string) => {
  if (!alts(o.en).length) err(`${where}: missing English`);
  if (!alts(o.id).length) err(`${where}: missing Indonesian`);
  if (/[‘’]/.test(first(o.en)) && where.includes('sentence')) warn(`${where}: use straight apostrophes in sentence translations`);
};

const used = new Set<string>();
const markUsed = (bn: string) => tokens(bn).forEach((t) => used.add(clean(t)));

const wordHome = new Map<string, string>();
for (const level of LEVELS) {
  for (const unit of level.units) {
    const u = unit.id;
    if (unit.lessons.length < 3) warn(`${u}: only ${unit.lessons.length} lessons`);
    if (!unit.story) warn(`${u}: no story`);
    if (unit.tips.length < 3) warn(`${u}: only ${unit.tips.length} tips`);
    unit.lessons.forEach((lesson, li) => {
      const at = `${u}.l${li + 1}`;
      const idx = nodeById.get(at)!.index;
      if (lesson.words.length < 3) warn(`${at}: only ${lesson.words.length} new words`);
      if (lesson.sentences.length < 5) warn(`${at}: only ${lesson.sentences.length} sentences`);
      for (const w of lesson.words) {
        checkTr(w, `${at} word "${w.bn}"`);
        const k = clean(w.bn);
        if (wordHome.has(k)) warn(`${at}: word "${w.bn}" already taught in ${wordHome.get(k)}`);
        else wordHome.set(k, at);
      }
      for (const s of lesson.sentences) {
        checkTr(s, `${at} sentence "${s.bn}"`);
        if (wordHome.has(clean(first(s.bn)))) err(`${at}: sentence "${s.bn}" is identical to a word — make it a real sentence`);
        if (s.bn.includes('{')) err(`${at}: "{name}" is only allowed in chat replies and story lines`);
        // The shown (first) form must only use taught words; extra accepted answers just need meanings.
        alts(s.bn).forEach((a, i) => checkGloss(a, at, i === 0 ? idx : Infinity));
        alts(s.bn).forEach(markUsed);
        if (!/[.?!]$/.test(s.bn)) warn(`${at}: sentence without end punctuation "${s.bn}"`);
      }
      for (const c of lesson.chats ?? []) {
        checkTr(c, `${at} chat "${c.bn}"`);
        checkGloss(c.bn, at, idx);
        markUsed(c.bn);
        if (!c.replies.some((r) => r.ok)) err(`${at}: chat "${c.bn}" has no correct reply`);
        if (c.replies.length < 2) err(`${at}: chat "${c.bn}" needs at least 2 replies`);
        for (const r of c.replies) {
          checkTr(r, `${at} reply "${r.bn}"`);
          checkGloss(r.bn, at, idx);
          markUsed(r.bn);
        }
      }
    });
    const storyIdx = nodeById.get(`${u}.story`)?.index ?? Infinity;
    for (const step of unit.story?.steps ?? []) {
      if ('line' in step) {
        checkTr(step.line, `${u} story "${step.line.bn}"`);
        checkGloss(step.line.bn, `${u} story`, storyIdx);
        markUsed(step.line.bn);
      } else {
        const q = step.question;
        if (q.answer < 0 || q.answer >= q.options.length) err(`${u} story question "${q.q.en}" has a bad answer index`);
      }
    }
  }
}

if (unglossed.size) {
  warn(`${unglossed.size} Banglish word(s) have no tap-to-see meaning:\n    ` + [...unglossed].map(([w, at]) => `${w} (${at})`).join(', '));
}
if (early.size) {
  warn(`${early.size} word(s) are used before they are taught:\n    ` + [...early].map(([w, at]) => `${w} @ ${at}`).join('\n    '));
}
const neverUsed = [...wordHome.keys()].filter((k) => !k.split(' ').every((t) => used.has(t)));
if (neverUsed.length) warn(`${neverUsed.length} taught word(s) never appear in a sentence: ${neverUsed.join(', ')}`);

const lessons = COURSE.path.filter((n) => n.kind === 'lesson').length;
console.log(`Course: ${COURSE.units.length} units, ${COURSE.path.length} path nodes (${lessons} lessons), ${COURSE.items.size} words+sentences.`);
for (const w of warnings) console.warn(`warn: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);
if (errors.length) process.exit(1);
