// Content checks run before every build. Errors fail the build; warnings are printed.
import { LEVELS } from '../../src/content/course';
import { COURSE, segment } from '../../src/engine/course';
import { alts, clean, first } from '../../src/engine/text';

const errors: string[] = [];
const warnings: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);

const unglossed = new Map<string, string>();
const checkGloss = (bn: string, where: string) => {
  for (const seg of segment(bn)) {
    const word = clean(seg.text);
    if (!seg.gloss && word && !word.startsWith('{') && !unglossed.has(word)) unglossed.set(word, where);
  }
};

const checkTr = (o: { en: string; id: string }, where: string) => {
  if (!alts(o.en).length) err(`${where}: missing English`);
  if (!alts(o.id).length) err(`${where}: missing Indonesian`);
};

const wordHome = new Map<string, string>();
for (const level of LEVELS) {
  for (const unit of level.units) {
    const u = unit.id;
    if (unit.lessons.length < 3) warn(`${u}: only ${unit.lessons.length} lessons`);
    if (!unit.story) warn(`${u}: no story`);
    if (unit.tips.length < 3) warn(`${u}: only ${unit.tips.length} tips`);
    unit.lessons.forEach((lesson, li) => {
      const at = `${u}.l${li + 1}`;
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
        for (const a of alts(s.bn)) checkGloss(a, at);
        if (!/[.?!]$/.test(s.bn)) warn(`${at}: sentence without end punctuation "${s.bn}"`);
      }
      for (const c of lesson.chats ?? []) {
        checkTr(c, `${at} chat "${c.bn}"`);
        checkGloss(c.bn, at);
        if (!c.replies.some((r) => r.ok)) err(`${at}: chat "${c.bn}" has no correct reply`);
        if (c.replies.length < 2) err(`${at}: chat "${c.bn}" needs at least 2 replies`);
        for (const r of c.replies) {
          checkTr(r, `${at} reply "${r.bn}"`);
          checkGloss(r.bn, at);
        }
      }
    });
    for (const step of unit.story?.steps ?? []) {
      if ('line' in step) {
        checkTr(step.line, `${u} story "${step.line.bn}"`);
        checkGloss(step.line.bn, `${u} story`);
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

const lessons = COURSE.path.filter((n) => n.kind === 'lesson').length;
console.log(`Course: ${COURSE.units.length} units, ${COURSE.path.length} path nodes (${lessons} lessons), ${COURSE.items.size} words+sentences.`);
for (const w of warnings) console.warn(`warn: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);
if (errors.length) process.exit(1);
