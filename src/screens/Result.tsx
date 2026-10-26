import { useState } from 'react';
import { PASS, type PathNode } from '../engine/course';
import { COURSE } from '../engine/course';
import { useT } from '../i18n/ui';
import { dayKey, useProgress, type Reward } from '../state/store';
import { Mascot } from '../ui/Mascot';
import { Bolt, Check, Fire, Star, Target } from '../ui/icons';

function mmss(ms: number) {
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function ResultScreens({ reward, node, ms, onDone }: { reward: Reward; node?: PathNode; ms: number; onDone: () => void }) {
  const steps = ['result', ...(reward.streakExtended ? ['streak'] : []), ...(reward.levelUnlocked ? ['level'] : [])];
  const [i, setI] = useState(0);
  const next = () => (i + 1 < steps.length ? setI(i + 1) : onDone());
  const step = steps[i];
  if (step === 'streak') return <StreakScreen streak={reward.streak} onNext={next} />;
  if (step === 'level') return <LevelScreen levelId={reward.levelUnlocked!} onNext={next} />;
  return <ResultScreen reward={reward} node={node} ms={ms} onNext={next} />;
}

function ResultScreen({ reward, node, ms, onNext }: { reward: Reward; node?: PathNode; ms: number; onNext: () => void }) {
  const t = useT();
  const isTest = node?.kind === 'test' || node?.kind === 'exam';
  const pass = Math.round((node?.kind === 'exam' ? PASS.exam : node?.kind === 'test' ? PASS.test : PASS.lesson) * 100);
  const title = reward.passed ? (isTest ? t('testPassed') : t('lessonComplete')) : isTest ? t('testFailed') : t('lessonRetry');
  return (
    <main className="result">
      <div className="bounce-in">
        <Mascot mood={reward.passed ? 'cheer' : 'sad'} size={150} />
      </div>
      <h1 className={reward.passed ? '' : 'fail'}>{title}</h1>
      {!reward.passed && <p className="muted">{isTest ? t('testFailedBody', { p: pass }) : t('lessonRetryBody', { p: pass })}</p>}
      {reward.passed && !isTest && node && (
        <div className="big-stars bounce-in" style={{ animationDelay: '250ms' }} aria-label={`${reward.stars} stars`}>
          {[0, 1, 2].map((k) => (
            <Star key={k} size={44} className={k < reward.stars ? '' : 'off'} />
          ))}
        </div>
      )}
      <div className="result-cards">
        <div className="result-card" style={{ '--rc': 'var(--gold)' } as React.CSSProperties}>
          <div className="lbl">{t('totalXp')}</div>
          <div className="val">
            <Bolt size={22} /> {reward.xp}
          </div>
        </div>
        <div className="result-card" style={{ '--rc': reward.accuracy >= 0.8 ? 'var(--green)' : 'var(--orange)' } as React.CSSProperties}>
          <div className="lbl">{t('accuracy')}</div>
          <div className="val">
            <Target size={22} /> {Math.round(reward.accuracy * 100)}%
          </div>
        </div>
        <div className="result-card" style={{ '--rc': 'var(--blue)' } as React.CSSProperties}>
          <div className="lbl">{t('time')}</div>
          <div className="val">{mmss(ms)}</div>
        </div>
      </div>
      <button type="button" className="btn full" onClick={onNext} autoFocus>
        {t('continue')}
      </button>
    </main>
  );
}

function StreakScreen({ streak, onNext }: { streak: number; onNext: () => void }) {
  const t = useT();
  const p = useProgress();
  const lang = p.profile.lang;
  const days = Array.from({ length: 7 }, (_, k) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - k));
    return d;
  });
  return (
    <main className="result">
      <div className="streak-flame bounce-in">
        <Fire size={150} />
      </div>
      <div className="streak-num">{streak}</div>
      <h1 style={{ color: 'var(--orange)' }}>{t('streakDays', { n: streak })}</h1>
      <div className="week">
        {days.map((d) => {
          const on = (p.daily[dayKey(d)] ?? 0) > 0;
          return (
            <div className="d" key={d.toISOString()}>
              {d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { weekday: 'narrow' })}
              <span className={`dot ${on ? 'on' : ''}`}>{on && <Check size={18} />}</span>
            </div>
          );
        })}
      </div>
      <p className="muted">{t('streakSub')}</p>
      <button type="button" className="btn orange full" onClick={onNext} autoFocus>
        {t('continue')}
      </button>
    </main>
  );
}

function LevelScreen({ levelId, onNext }: { levelId: string; onNext: () => void }) {
  const t = useT();
  const lang = useProgress().profile.lang;
  const idx = COURSE.units.findIndex((u) => u.level.id === levelId);
  const nextUnit = COURSE.units.slice(idx).find((u) => u.level.id !== levelId);
  return (
    <main className="result">
      <div className="bounce-in">
        <Mascot mood="cheer" size={170} />
      </div>
      <h1>{t('levelUnlockedTitle')}</h1>
      {nextUnit && (
        <h2 style={{ fontSize: 26, fontWeight: 900 }}>
          {t('level')} {nextUnit.level.n}: {nextUnit.level.title[lang]}
        </h2>
      )}
      <button type="button" className="btn full" onClick={onNext} autoFocus>
        {t('continue')}
      </button>
    </main>
  );
}
