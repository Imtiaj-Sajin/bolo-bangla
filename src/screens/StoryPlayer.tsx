import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import type { Nav } from '../App';
import { speak } from '../audio/speech';
import { sfx } from '../audio/sfx';
import { CHARACTERS } from '../content/characters';
import type { StoryStep } from '../content/types';
import { PASS, nodeById } from '../engine/course';
import { useT } from '../i18n/ui';
import { markStoryDone, useProgress, type Reward } from '../state/store';
import { Avatar } from '../ui/Avatar';
import { Bar, HintText, Modal, SpeakButton } from '../ui/bits';
import { Close } from '../ui/icons';
import { Mascot } from '../ui/Mascot';
import { personal } from '../ui/personal';
import { ResultScreens } from './Result';

export function StoryPlayer({ nodeId, nav, guard }: { nodeId: string; nav: Nav; guard: MutableRefObject<(() => boolean) | null> }) {
  const t = useT();
  const p = useProgress();
  const lang = p.profile.lang;
  const node = nodeById.get(nodeId)!;
  const story = node.unit.def.story!;
  const steps = story.steps;
  const [shown, setShown] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [firstOk, setFirstOk] = useState<Record<number, boolean>>({});
  const [showTr, setShowTr] = useState(false);
  const [quit, setQuit] = useState(false);
  const [reward, setReward] = useState<Reward | null>(null);
  const startedAt = useRef(Date.now());
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    guard.current = () => {
      if (reward) return true;
      setQuit(true);
      return false;
    };
    return () => {
      guard.current = null;
    };
  }, [guard, reward]);

  const current = steps[shown - 1];
  useEffect(() => {
    if ('line' in current) void speak(current.line.bn, CHARACTERS[current.line.who].voice);
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [shown, current]);

  const waitingQuestion = 'question' in current && answers[shown - 1] !== current.question.answer;

  const next = () => {
    sfx.tap();
    if (shown < steps.length) return setShown(shown + 1);
    const qs = steps.map((s, i) => ('question' in s ? i : -1)).filter((i) => i >= 0);
    const acc = qs.length ? qs.filter((i) => firstOk[i]).length / qs.length : 1;
    const r = markStoryDone(node, Math.max(acc, PASS.lesson));
    sfx.complete();
    setReward({ ...r, accuracy: acc });
  };

  const answer = (i: number, opt: number, s: Extract<StoryStep, { question: unknown }>) => {
    if (answers[i] === s.question.answer) return;
    const right = opt === s.question.answer;
    if (firstOk[i] === undefined) setFirstOk({ ...firstOk, [i]: right });
    setAnswers({ ...answers, [i]: opt });
    if (right) sfx.correct();
    else sfx.wrong();
  };

  if (reward) return <ResultScreens reward={reward} node={node} ms={Date.now() - startedAt.current} onDone={() => nav.pop()} />;

  return (
    <div className="lesson">
      <div className="lesson-top">
        <button type="button" className="icon-btn" aria-label={t('quit')} onClick={() => setQuit(true)}>
          <Close />
        </button>
        <Bar value={shown / steps.length} />
        <button
          type="button"
          className="btn small outline"
          aria-pressed={showTr}
          onClick={() => setShowTr(!showTr)}
          style={showTr ? { color: 'var(--blue)', borderColor: 'var(--blue)' } : undefined}
        >
          {lang === 'id' ? 'ID' : 'EN'}
        </button>
      </div>
      <main className="lesson-body">
        <h1 className="ex-title">{story.title[lang]}</h1>
        {steps.slice(0, shown).map((s, i) =>
          'line' in s ? (
            <div key={i} className={`story-line ${s.line.who === 'you' ? 'you' : ''}`}>
              <Avatar who={s.line.who} size={52} />
              <div className="grow">
                <div className="muted" style={{ fontSize: 13, fontWeight: 800, textAlign: s.line.who === 'you' ? 'right' : 'left' }}>
                  {s.line.who === 'you' && p.profile.name ? p.profile.name : CHARACTERS[s.line.who].name[lang]}
                </div>
                <div className="bubble">
                  <div className="row" style={{ alignItems: 'flex-start' }}>
                    <SpeakButton text={s.line.bn} voice={CHARACTERS[s.line.who].voice} size="small" />
                    <HintText bn={personal(s.line.bn)} />
                  </div>
                  {showTr && <div className="tr">{personal(s.line[lang].split('|')[0])}</div>}
                </div>
              </div>
            </div>
          ) : (
            <div key={i} className="card stack">
              <div className="row">
                <Mascot mood="think" size={48} />
                <b>{s.question.q[lang]}</b>
              </div>
              <div className="choices">
                {s.question.options.map((o, k) => {
                  const picked = answers[i] === k;
                  const cls = picked ? (k === s.question.answer ? 'right' : 'wrong') : '';
                  return (
                    <button key={k} type="button" className={`choice ${cls}`} onClick={() => answer(i, k, s)}>
                      {o[lang]}
                    </button>
                  );
                })}
              </div>
            </div>
          ),
        )}
        <div ref={endRef} />
      </main>
      <footer className="lesson-foot">
        <button type="button" className="btn full" disabled={waitingQuestion} onClick={next}>
          {t('continue')}
        </button>
      </footer>
      <Modal open={quit} onClose={() => setQuit(false)} labelledBy="squit-title">
        <div className="center stack">
          <Mascot mood="sad" size={110} />
          <h2 id="squit-title" style={{ fontSize: 22, fontWeight: 900 }}>
            {t('quitTitle')}
          </h2>
          <button type="button" className="btn blue full" autoFocus onClick={() => setQuit(false)}>
            {t('keepLearning')}
          </button>
          <button
            type="button"
            className="btn ghost full"
            style={{ color: 'var(--red)' }}
            onClick={() => {
              setQuit(false);
              guard.current = null;
              nav.pop();
            }}
          >
            {t('quit')}
          </button>
        </div>
      </Modal>
    </div>
  );
}
