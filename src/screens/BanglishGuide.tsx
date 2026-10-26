import type { Nav } from '../App';
import { FRIENDS, GUIDE, TRAPS } from '../content/guide';
import { useT } from '../i18n/ui';
import { useProgress } from '../state/store';
import { SpeakButton } from '../ui/bits';
import { ArrowLeft } from '../ui/icons';

export function BanglishGuide({ nav }: { nav: Nav }) {
  const t = useT();
  const lang = useProgress().profile.lang;
  return (
    <main className="page">
      <div className="row" style={{ marginBottom: 12 }}>
        <button type="button" className="icon-btn" aria-label={t('back')} onClick={() => nav.pop()}>
          <ArrowLeft />
        </button>
        <h1 className="grow" style={{ marginBottom: 0 }}>
          {t('pGuide')}
        </h1>
      </div>
      <p className="sub">{t('obHow1')}</p>

      {GUIDE.map((sec) => (
        <section key={sec.title.en}>
          <h2 className="section-title">{sec.title[lang]}</h2>
          {sec.intro && <p className="muted" style={{ marginBottom: 8 }}>{sec.intro[lang]}</p>}
          {sec.rows.map((row) => (
            <div className="phrase" key={row.sound} style={{ alignItems: 'flex-start' }}>
              <b style={{ minWidth: 64, fontSize: 22, color: 'var(--green)' }}>{row.sound}</b>
              <div className="grow">
                <span style={{ color: 'var(--text)' }}>{row.text[lang]}</span>
                <div className="row" style={{ marginTop: 8, flexWrap: 'wrap', gap: 10 }}>
                  {row.examples.map((ex) => (
                    <span key={ex} className="row" style={{ gap: 6 }}>
                      <SpeakButton text={ex} size="small" />
                      <b>{ex}</b>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      ))}

      <h2 className="section-title">{lang === 'id' ? 'Kata yang sudah kamu tahu' : 'Words you already know'}</h2>
      <p className="muted" style={{ marginBottom: 8 }}>
        {lang === 'id'
          ? 'Bahasa Indonesia dan Bangla berbagi banyak kata dari Sanskerta, Arab, Persia, dan Portugis.'
          : 'Indonesian and Bangla share many words from Sanskrit, Arabic, Persian and Portuguese.'}
      </p>
      {FRIENDS.map((w) => (
        <div className="word-row" key={w.bn}>
          <SpeakButton text={w.bn} size="small" />
          <div className="grow">
            <b>{w.bn}</b>
            <span>
              🇮🇩 {w.id} · {w.en}
            </span>
          </div>
        </div>
      ))}

      <h2 className="section-title">{lang === 'id' ? 'Hati-hati: mirip tapi beda!' : 'Careful: look-alikes!'}</h2>
      {TRAPS.map((w) => (
        <div className="word-row" key={w.bn}>
          <SpeakButton text={w.bn} size="small" />
          <div className="grow">
            <b style={{ color: 'var(--orange)' }}>{w.bn}</b>
            <span style={{ color: 'var(--text)' }}>= {w.means[lang]}</span>
            <span>{w.indo[lang]}</span>
          </div>
        </div>
      ))}
    </main>
  );
}
