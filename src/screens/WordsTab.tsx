import { useState } from 'react';
import { COURSE } from '../engine/course';
import { strength } from '../engine/srs';
import { clean, first } from '../engine/text';
import { useT } from '../i18n/ui';
import { useProgress } from '../state/store';
import { SpeakButton } from '../ui/bits';

export function WordsTab() {
  const t = useT();
  const p = useProgress();
  const lang = p.profile.lang;
  const [q, setQ] = useState('');
  const learned = COURSE.units
    .map((u) => ({ unit: u, words: u.words.filter((w) => w.unitN === u.n && p.mem[w.key]) }))
    .filter((g) => g.words.length);
  const count = learned.reduce((n, g) => n + g.words.length, 0);
  const query = clean(q);
  const match = (bn: string, tr: string) => !query || clean(bn).includes(query) || clean(tr).includes(query);

  return (
    <main className="page">
      <h1>{t('wordsTitle')}</h1>
      <p className="sub">{t('wordsCount', { n: count })}</p>
      {count === 0 ? (
        <p className="card muted">{t('wordsEmpty')}</p>
      ) : (
        <input className="field" type="search" placeholder={t('search')} value={q} onChange={(e) => setQ(e.target.value)} aria-label={t('search')} />
      )}
      {learned.map(({ unit, words }) => {
        const shown = words.filter((w) => match(w.bn, w[lang]));
        if (!shown.length) return null;
        return (
          <section key={unit.def.id}>
            <h2 className="section-title">
              {t('unit')} {unit.n} · {unit.def.title[lang]}
            </h2>
            {shown.map((w) => {
              const st = strength(p.mem[w.key]);
              return (
                <div className="word-row" key={w.key}>
                  <span className="em" aria-hidden="true">
                    {w.emoji ?? '•'}
                  </span>
                  <div className="grow">
                    <b>{w.bn}</b>
                    <span>{first(w[lang])}</span>
                  </div>
                  <div className="strength" aria-label={`strength ${st} of 4`}>
                    {[0, 1, 2, 3].map((k) => (
                      <i key={k} className={k < st ? 'on' : ''} style={{ height: 8 + k * 4 }} />
                    ))}
                  </div>
                  <SpeakButton text={w.bn} voice={w.voice} size="small" />
                </div>
              );
            })}
          </section>
        );
      })}
    </main>
  );
}
