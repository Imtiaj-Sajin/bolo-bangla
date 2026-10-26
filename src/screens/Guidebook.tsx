import type { UnitInfo } from '../engine/course';
import { first } from '../engine/text';
import { useT } from '../i18n/ui';
import { useProgress } from '../state/store';
import { HintText, Modal, SpeakButton } from '../ui/bits';
import { Close } from '../ui/icons';

/** Duolingo-style unit guidebook: key phrases with audio, then tips. */
export function Guidebook({ unit, onClose }: { unit: UnitInfo | null; onClose: () => void }) {
  const t = useT();
  const lang = useProgress().profile.lang;
  return (
    <Modal open={!!unit} onClose={onClose} className="full" labelledBy="guide-title">
      {unit && (
        <div className={`c-${unit.color}`}>
          <div className="guide-head">
            <div className="row">
              <div className="grow">
                <div style={{ fontWeight: 800, opacity: 0.85, fontSize: 14, textTransform: 'uppercase' }}>
                  {t('guidebook')} · {t('unit')} {unit.n}
                </div>
                <h2 id="guide-title">{unit.def.title[lang]}</h2>
              </div>
              <button type="button" className="icon-btn" style={{ color: '#fff' }} aria-label={t('close')} onClick={onClose}>
                <Close />
              </button>
            </div>
            <p style={{ marginTop: 6, fontWeight: 600 }}>{unit.def.goal[lang]}</p>
          </div>
          <div className="guide-body">
            <h3 className="section-title">{t('keyPhrases')}</h3>
            {keyPhrases(unit).map((s) => (
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
            <h3 className="section-title">{t('tips')}</h3>
            <div className="stack">
              {unit.def.tips.map((tip, i) => (
                <div className="tip-card" key={i}>
                  <h3>{tip.title[lang]}</h3>
                  <p>{tip.body[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

/** The first few sentences of each lesson make the unit's key phrases. */
export function keyPhrases(unit: UnitInfo) {
  const out = [];
  let i = 0;
  for (const lesson of unit.def.lessons) {
    const take = lesson.sentences.slice(0, 3).length;
    out.push(...unit.sentences.slice(i, i + take));
    i += lesson.sentences.length;
  }
  return out;
}
