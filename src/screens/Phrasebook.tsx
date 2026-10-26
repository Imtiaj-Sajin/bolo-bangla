import type { Nav } from '../App';
import { COURSE } from '../engine/course';
import { first } from '../engine/text';
import { useT } from '../i18n/ui';
import { currentIndex, useProgress } from '../state/store';
import { HintText, SpeakButton } from '../ui/bits';
import { ArrowLeft } from '../ui/icons';
import { keyPhrases } from './Guidebook';

/** Key phrases of every unit the learner has reached. */
export function Phrasebook({ nav }: { nav: Nav }) {
  const t = useT();
  const p = useProgress();
  const lang = p.profile.lang;
  const cur = currentIndex(p);
  const reached = COURSE.units.filter((u) => u.nodes[0].index <= cur);
  return (
    <main className="page">
      <div className="row" style={{ marginBottom: 12 }}>
        <button type="button" className="icon-btn" aria-label={t('back')} onClick={() => nav.pop()}>
          <ArrowLeft />
        </button>
        <h1 className="grow" style={{ marginBottom: 0 }}>
          {t('pPhrasebook')}
        </h1>
      </div>
      {reached.map((u) => (
        <section key={u.def.id} className={`c-${u.color}`}>
          <h2 className="section-title" style={{ color: 'var(--c)' }}>
            {t('unit')} {u.n} · {u.def.title[lang]}
          </h2>
          {keyPhrases(u).map((s) => (
            <div className="phrase" key={s.key}>
              <SpeakButton text={s.bn} voice={s.voice} size="small" />
              <div className="grow">
                <b>
                  <HintText bn={s.bn} />
                </b>
                <span>{first(s[lang])}</span>
              </div>
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}
