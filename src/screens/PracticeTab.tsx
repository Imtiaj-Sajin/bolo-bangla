import type { Nav } from '../App';
import { useT } from '../i18n/ui';
import { currentIndex, useProgress } from '../state/store';
import { Mascot } from '../ui/Mascot';
import { Book, Dumbbell, Guide, Headphones, Heart } from '../ui/icons';

export function PracticeTab({ nav }: { nav: Nav }) {
  const t = useT();
  const p = useProgress();
  const started = currentIndex(p) > 0;
  const hasMistakes = Object.values(p.mem).some((m) => (m.lastBad ?? 0) > Date.now() - 21 * 86_400_000);

  const card = (color: string, Icon: typeof Dumbbell, title: string, sub: string, onClick: () => void, disabled = false) => (
    <button type="button" className={`card card-btn c-${color}`} onClick={onClick} disabled={disabled} style={disabled ? { opacity: 0.5 } : undefined}>
      <span className="ic">
        <Icon size={30} />
      </span>
      <span className="grow">
        <h3>{title}</h3>
        <p>{sub}</p>
      </span>
    </button>
  );

  return (
    <main className="page">
      <div className="row" style={{ marginBottom: 8 }}>
        <div className="grow">
          <h1>{t('practiceTitle')}</h1>
          <p className="sub">{t('practiceSub')}</p>
        </div>
        <Mascot mood="happy" size={80} />
      </div>
      {!started && <p className="card muted">{t('pEmpty')}</p>}
      <div className="stack">
        {card('purple', Dumbbell, t('pReview'), t('pReviewSub'), () => nav.push({ name: 'session', spec: { mode: 'review' } }), !started)}
        {card('red', Heart, t('pMistakes'), hasMistakes ? t('pMistakesSub') : t('pNoMistakes'), () => nav.push({ name: 'session', spec: { mode: 'mistakes' } }), !hasMistakes)}
        {card('blue', Headphones, t('pListen'), t('pListenSub'), () => nav.push({ name: 'session', spec: { mode: 'listen' } }), !started)}
        {card('green', Book, t('pGuide'), t('pGuideSub'), () => nav.push({ name: 'guide' }))}
        {card('orange', Guide, t('pPhrasebook'), t('pPhrasebookSub'), () => nav.push({ name: 'phrasebook' }))}
      </div>
    </main>
  );
}
