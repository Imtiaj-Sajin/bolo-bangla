import { useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import type { Nav } from '../App';
import { preload, speak } from '../audio/speech';
import { sfx } from '../audio/sfx';
import { PASS, nodeById, type PathNode } from '../engine/course';
import { practiceSession, sessionFor, type Exercise } from '../engine/exercises';
import { useT, PRAISE } from '../i18n/ui';
import { currentIndex, finishSession, getProgress, useProgress, type Reward } from '../state/store';
import { Bar, Modal } from '../ui/bits';
import { Check, Close, Heart } from '../ui/icons';
import { Mascot } from '../ui/Mascot';
import { personal } from '../ui/personal';
import { ExerciseView, type CheckResult } from './ExerciseView';
import { ResultScreens } from './Result';

export type SessionSpec = { nodeId: string; round: number } | { mode: 'review' | 'mistakes' | 'listen' };

interface Slot {
  ex: Exercise;
  /** Index of the original exercise this slot (or retry) belongs to. */
  orig: number;
  retry: number;
}

const LISTEN_KINDS = ['listenBuild', 'listenPick'];

export function Session({ spec, nav, guard }: { spec: SessionSpec; nav: Nav; guard: MutableRefObject<(() => boolean) | null> }) {
  const p = useProgress();
  const t = useT();
  const lang = p.profile.lang;
  const node: PathNode | undefined = 'nodeId' in spec ? nodeById.get(spec.nodeId) : undefined;
  const isTest = node?.kind === 'test' || node?.kind === 'exam';

  const initial = useMemo(() => {
    const o = { lang, mem: getProgress().mem, seed: Date.now() % 1e9 };
    return node
      ? sessionFor(node, 'round' in spec ? spec.round : 0, o)
      : practiceSession((spec as { mode: 'review' }).mode, currentIndex() - 1, o);
    // Build once per session; language changes mid-lesson are not expected.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [queue, setQueue] = useState<Slot[]>(() => initial.map((ex, i) => ({ ex, orig: i, retry: 0 })));
  const [pos, setPos] = useState(0);
  const [checked, setChecked] = useState<CheckResult | null>(null);
  const [solved, setSolved] = useState<Set<number>>(new Set());
  const [firstTry, setFirstTry] = useState<Map<number, boolean>>(new Map());
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [quit, setQuit] = useState(false);
  const [reward, setReward] = useState<Reward | null>(null);
  const [praise, setPraise] = useState(PRAISE[0]);
  const [noListen, setNoListen] = useState(false);
  const items = useRef<Record<string, boolean>>({});
  const counts = useRef({ listened: 0, spoken: 0 });
  const startedAt = useRef(Date.now());
  const checkFn = useRef<(() => CheckResult) | null>(null);
  const [canCheck, setCanCheck] = useState(false);

  const total = initial.length;
  const maxMistakes = isTest ? Math.floor(total * (1 - (node?.kind === 'exam' ? PASS.exam : PASS.test))) : Infinity;
  const hearts = isTest ? maxMistakes + 1 - mistakes : 0;

  // Android back / browser back asks before leaving a lesson in progress.
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

  useEffect(() => {
    preload(initial.flatMap((e) => (e.bn ? [{ text: e.bn, voice: e.voice ?? 'f' }] : [])));
  }, [initial]);

  const slot = queue[pos];

  const setCheck = useCallback((fn: (() => CheckResult) | null) => {
    checkFn.current = fn;
    setCanCheck(!!fn);
  }, []);

  const finish = useCallback(
    (finalFirst: Map<number, boolean>, finalCombo: number) => {
      const fresh = initial.filter((e) => e.isNew).length;
      const firstOk = [...finalFirst.values()].filter(Boolean).length;
      const r = finishSession({
        node,
        mode: 'mode' in spec ? spec.mode : undefined,
        total: finalFirst.size || 1,
        firstTry: firstOk,
        bestCombo: finalCombo,
        ms: Date.now() - startedAt.current,
        items: items.current,
        newWords: fresh,
        listened: counts.current.listened,
        spoken: counts.current.spoken,
      });
      if (r.passed) sfx.complete();
      else sfx.fail();
      setReward(r);
    },
    [initial, node, spec],
  );

  const record = (res: CheckResult) => {
    if (!slot) return;
    const ok = res.verdict !== 'wrong';
    const ex = slot.ex;
    // A first guess at a brand-new word is part of meeting it, so it never counts against her.
    const graded = ok || !ex.isNew;
    if (graded) for (const k of ex.keys) items.current[k] = (items.current[k] ?? true) && ok;
    if (LISTEN_KINDS.includes(ex.kind) || (ex.kind === 'pickMeaning' && ex.prompt === 'audio')) counts.current.listened++;
    if (ex.kind === 'speak') counts.current.spoken++;

    const nextFirst = new Map(firstTry);
    if (!nextFirst.has(slot.orig)) nextFirst.set(slot.orig, !graded || (ok && slot.retry === 0 && !res.imperfect));
    setFirstTry(nextFirst);

    if (ok) {
      setSolved(new Set(solved).add(slot.orig));
      const c = combo + 1;
      setCombo(c);
      setBestCombo(Math.max(bestCombo, c));
      if (c > 0 && c % 5 === 0) sfx.combo();
      else sfx.correct();
      setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
    } else {
      sfx.wrong();
      setCombo(0);
      if (isTest) setMistakes((m) => m + 1);
      // Lessons replay mistakes at the end (up to twice), like Duolingo.
      else if (slot.retry < 2) setQueue((q) => [...q, { ex: { ...ex, uid: ex.uid + 'r', isNew: false }, orig: slot.orig, retry: slot.retry + 1 }]);
    }
    // Hear the right Bangla after answering.
    if (ok && ex.solution && ['buildBn', 'typeBn', 'pickBn', 'fill'].includes(ex.kind)) void speak(ex.solution, ex.voice);
    setChecked(res);
  };

  const onCheck = () => {
    const fn = checkFn.current;
    if (!fn) return;
    record(fn());
  };

  const onContinue = () => {
    const outOfHearts = isTest && mistakes > maxMistakes;
    if (outOfHearts || pos + 1 >= queue.length) {
      finish(firstTry, bestCombo);
      return;
    }
    let next = pos + 1;
    // "Can't listen now" skips listening exercises for the rest of the session.
    while (noListen && next < queue.length && LISTEN_KINDS.includes(queue[next].ex.kind)) next++;
    if (next >= queue.length) return finish(firstTry, bestCombo);
    setPos(next);
    setChecked(null);
    setCheck(null);
  };

  const skipListening = () => {
    setNoListen(true);
    // Treat the current one as not asked.
    setSolved(new Set(solved).add(slot.orig));
    setChecked(null);
    setCheck(null);
    let next = pos + 1;
    while (next < queue.length && LISTEN_KINDS.includes(queue[next].ex.kind)) next++;
    if (next >= queue.length) return finish(firstTry, bestCombo);
    setPos(next);
  };

  if (reward) {
    return (
      <ResultScreens
        reward={reward}
        node={node}
        ms={Date.now() - startedAt.current}
        onDone={() => nav.pop()}
      />
    );
  }

  if (!slot) {
    return (
      <div className="result">
        <Mascot mood="think" />
        <p>{t('pEmpty')}</p>
        <button type="button" className="btn" onClick={() => nav.pop()}>
          {t('back')}
        </button>
      </div>
    );
  }

  const progress = solved.size / total;
  const ex = slot.ex;
  const selfDone = ex.kind === 'match' || ex.kind === 'speak';
  const correctText = personal(ex.solution);
  const meaning =
    ex.meaning ??
    (ex.kind === 'chat' ? ex.prompt : ex.kind === 'buildBn' || ex.kind === 'typeBn' || ex.kind === 'fill' || ex.kind === 'pickBn' ? ex.prompt : undefined);

  return (
    <div className="lesson">
      <div className="lesson-top">
        <button type="button" className="icon-btn" aria-label={t('quit')} onClick={() => setQuit(true)}>
          <Close />
        </button>
        {combo >= 3 && (
          <span className="combo" key={combo}>
            {t('inARow', { n: combo })}
          </span>
        )}
        <Bar value={progress} />
        {isTest && (
          <span className="hearts" aria-label={`${t('heartsLeft')}: ${hearts}`}>
            <Heart size={26} /> {Math.max(0, hearts)}
          </span>
        )}
      </div>

      <main className="lesson-body" key={ex.uid}>
        <ExerciseView ex={ex} checked={checked} setCheck={setCheck} done={(r) => record(r)} />
      </main>

      <footer className={`lesson-foot ${checked ? (checked.verdict === 'wrong' ? 'bad' : 'ok') : ''}`}>
        {checked && (
          <div className="feedback" role="status">
            {checked.verdict === 'wrong' ? (
              <>
                <div className="head">
                  <span className="badge">
                    <Close size={20} />
                  </span>
                  {t('correctSolution')}
                </div>
                {correctText && <div className="sol">{correctText}</div>}
                {meaning && meaning !== correctText && (
                  <div className="sol">
                    <small>{t('meaning')}</small>
                    {meaning}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="head">
                  <span className="badge">
                    <Check size={20} />
                  </span>
                  {praise.bn}
                </div>
                <div className="praise-tr">{praise[lang]}</div>
                {checked.verdict === 'typo' && (
                  <div className="sol">
                    <small>{t('typoNote')}</small>
                    {checked.best}
                  </div>
                )}
                {ex.meaning && checked.verdict === 'right' && <div className="sol">{ex.meaning}</div>}
              </>
            )}
          </div>
        )}
        {checked ? (
          <button type="button" className={`btn full ${checked.verdict === 'wrong' ? 'red' : ''}`} onClick={onContinue} autoFocus>
            {t('continue')}
          </button>
        ) : selfDone ? (
          ex.kind === 'speak' ? (
            <button type="button" className="btn ghost muted full" onClick={() => record({ verdict: 'right' })}>
              {t('cantSpeak')}
            </button>
          ) : null
        ) : (
          <div className="foot-row">
            {LISTEN_KINDS.includes(ex.kind) && !isTest && (
              <button type="button" className="btn ghost muted" onClick={skipListening}>
                {t('cantListen')}
              </button>
            )}
            <button type="button" className="btn" disabled={!canCheck} onClick={onCheck}>
              {t('check')}
            </button>
          </div>
        )}
      </footer>

      <Modal open={quit} onClose={() => setQuit(false)} labelledBy="quit-title">
        <div className="center stack">
          <Mascot mood="sad" size={110} />
          <h2 id="quit-title" style={{ fontSize: 22, fontWeight: 900 }}>
            {t('quitTitle')}
          </h2>
          <p className="muted">{t('quitBody')}</p>
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
