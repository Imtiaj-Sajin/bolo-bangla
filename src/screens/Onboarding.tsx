import { useState } from 'react';
import type { Lang } from '../content/types';
import { useT } from '../i18n/ui';
import { update, useProgress } from '../state/store';
import { Mascot } from '../ui/Mascot';
import { Bar, Modal } from '../ui/bits';
import { Book, Speaker, Turtle } from '../ui/icons';
import { sfx } from '../audio/sfx';

export const GOALS = [
  { xp: 10, key: 'goalCasual' },
  { xp: 20, key: 'goalRegular' },
  { xp: 30, key: 'goalSerious' },
  { xp: 50, key: 'goalIntense' },
] as const;

/** Languages Bolo may teach from later. Each has its own name and "coming soon" in that language. */
const SOON_LANGS = [
  { code: 'ms', flag: '🇲🇾', name: 'Bahasa Melayu', soon: 'Akan datang' },
  { code: 'hi', flag: '🇮🇳', name: 'हिन्दी', soon: 'जल्द आ रहा है' },
  { code: 'ur', flag: '🇵🇰', name: 'اردو', soon: 'جلد آ رہا ہے' },
  { code: 'ar', flag: '🇸🇦', name: 'العربية', soon: 'قريبًا' },
  { code: 'es', flag: '🇪🇸', name: 'Español', soon: 'Próximamente' },
  { code: 'fr', flag: '🇫🇷', name: 'Français', soon: 'Bientôt disponible' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch', soon: 'Bald verfügbar' },
  { code: 'it', flag: '🇮🇹', name: 'Italiano', soon: 'Prossimamente' },
  { code: 'pt', flag: '🇵🇹', name: 'Português', soon: 'Em breve' },
  { code: 'tr', flag: '🇹🇷', name: 'Türkçe', soon: 'Çok yakında' },
  { code: 'ja', flag: '🇯🇵', name: '日本語', soon: '近日公開' },
  { code: 'ko', flag: '🇰🇷', name: '한국어', soon: '곧 출시 예정' },
  { code: 'zh', flag: '🇨🇳', name: '中文', soon: '即将推出' },
  { code: 'fil', flag: '🇵🇭', name: 'Filipino', soon: 'Malapit na' },
];

export function Onboarding() {
  const p = useProgress();
  const t = useT();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(p.profile.name);
  const [soon, setSoon] = useState<(typeof SOON_LANGS)[number] | null>(null);
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
            <section aria-labelledby="soon-title">
              <h2 id="soon-title" className="soon-title">
                {t('comingSoon')}
              </h2>
              <div className="soon-grid">
                {SOON_LANGS.map((l) => (
                  <button key={l.code} type="button" className="soon-lang" lang={l.code} onClick={() => setSoon(l)}>
                    <span className="flag" aria-hidden="true">
                      {l.flag}
                    </span>
                    <span dir="auto">{l.name}</span>
                  </button>
                ))}
              </div>
            </section>
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
      <div className="onb-foot">
        <button type="button" className="btn full" onClick={next} disabled={step === 2 && !name.trim()}>
          {step === steps - 1 ? t('obGo') : t('continue')}
        </button>
      </div>
      <Modal open={soon !== null} onClose={() => setSoon(null)} labelledBy="soon-sheet-title">
        {soon && (
          <div className="center stack">
            <div className="bounce-in">
              <Mascot mood="happy" size={100} />
            </div>
            <h2 id="soon-sheet-title" className="soon-sheet-title" lang={soon.code} dir="auto">
              {soon.flag} {soon.soon}
            </h2>
            <p className="muted">{t('obSoonBody', { lang: soon.name })}</p>
            <button type="button" className="btn full" autoFocus onClick={() => setSoon(null)}>
              {t('obSoonBack')}
            </button>
          </div>
        )}
      </Modal>
    </main>
  );
}
