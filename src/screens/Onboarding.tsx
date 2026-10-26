import { useState } from 'react';
import type { Lang } from '../content/types';
import { useT } from '../i18n/ui';
import { update, useProgress } from '../state/store';
import { Mascot } from '../ui/Mascot';
import { Bar } from '../ui/bits';
import { Book, Speaker, Turtle } from '../ui/icons';
import { sfx } from '../audio/sfx';

export const GOALS = [
  { xp: 10, key: 'goalCasual' },
  { xp: 20, key: 'goalRegular' },
  { xp: 30, key: 'goalSerious' },
  { xp: 50, key: 'goalIntense' },
] as const;

export function Onboarding() {
  const p = useProgress();
  const t = useT();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(p.profile.name);
  const steps = 5;

  const next = () => {
    sfx.tap();
    if (step === 2) update((s) => void (s.profile.name = name.trim()));
    if (step === steps - 1) {
      update((s) => void (s.profile.onboarded = true));
      return;
    }
    setStep(step + 1);
  };

  const setLang = (lang: Lang) => update((s) => void (s.profile.lang = lang));

  return (
    <main className="onb app">
      <Bar value={(step + 1) / steps} />
      <div className="grow">
        {step === 0 && (
          <>
            <div className="center bounce-in">
              <Mascot mood="wave" size={150} />
            </div>
            <h1>{t('obHello')}</h1>
            <p>{t('obHelloSub')}</p>
          </>
        )}
        {step === 1 && (
          <>
            <div className="center">
              <Mascot mood="think" size={96} />
            </div>
            <h1>{t('obLangQ')}</h1>
            <div className="stack">
              <button type="button" className="lang-opt" aria-pressed={p.profile.lang === 'en'} onClick={() => setLang('en')}>
                <span className="flag">🇬🇧</span> English
              </button>
              <button type="button" className="lang-opt" aria-pressed={p.profile.lang === 'id'} onClick={() => setLang('id')}>
                <span className="flag">🇮🇩</span> Bahasa Indonesia
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h1>{t('obNameQ')}</h1>
            <input
              className="field"
              value={name}
              placeholder={t('obNamePh')}
              autoComplete="given-name"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && next()}
            />
          </>
        )}
        {step === 3 && (
          <>
            <h1>{t('obGoalQ')}</h1>
            <div className="stack">
              {GOALS.map((g) => (
                <button
                  key={g.xp}
                  type="button"
                  className="lang-opt"
                  aria-pressed={p.profile.goal === g.xp}
                  onClick={() => update((s) => void (s.profile.goal = g.xp))}
                >
                  <span className="grow">{t(g.key)}</span>
                  <span className="muted" style={{ fontSize: 15 }}>
                    {g.xp} {t('perDay')}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <h1>{t('obHowTitle')}</h1>
            <div className="howto">
              <Book size={28} style={{ color: 'var(--green)', flex: 'none' }} />
              <p>{t('obHow1')}</p>
            </div>
            <div className="howto">
              <span style={{ display: 'flex', gap: 4, color: 'var(--blue)', flex: 'none' }}>
                <Speaker size={26} />
                <Turtle size={26} />
              </span>
              <p>{t('obHow2')}</p>
            </div>
            <div className="howto">
              <span style={{ fontWeight: 900, textDecoration: 'underline dashed', textUnderlineOffset: 5, flex: 'none' }}>ami</span>
              <p>{t('obHow3')}</p>
            </div>
          </>
        )}
      </div>
      <button type="button" className="btn full" onClick={next} disabled={step === 2 && !name.trim()}>
        {step === steps - 1 ? t('obGo') : t('continue')}
      </button>
    </main>
  );
}
