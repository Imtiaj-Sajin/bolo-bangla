import { useState } from 'react';
import { sfx } from '../audio/sfx';
import { useT, type UiKey } from '../i18n/ui';
import { buyFreeze, claimQuest, claimQuestBonus, FREEZE_COST, useProgress, type QuestKind } from '../state/store';
import { Bar, Toast } from '../ui/bits';
import { Bolt, Fire, Gem, Headphones, Mic, Snow, Star, Target } from '../ui/icons';
import { ChestArt } from './Learn';

const QUEST_TEXT: Record<QuestKind, UiKey> = {
  xp: 'qXp',
  lessons: 'qLessons',
  combo: 'qCombo',
  accuracy: 'qAccuracy',
  listen: 'qListen',
  words: 'qWords',
  speak: 'qSpeak',
};

const QUEST_ICON = { xp: Bolt, lessons: Target, combo: Fire, accuracy: Target, listen: Headphones, words: Star, speak: Mic };

export function QuestsTab() {
  const t = useT();
  const p = useProgress();
  const [toast, setToast] = useState<string | null>(null);
  const allClaimed = p.quests.list.length > 0 && p.quests.list.every((q) => q.claimed);

  return (
    <main className="page">
      <h1>{t('questsTitle')}</h1>
      <p className="sub">{t('questsSub')}</p>
      <div className="card">
        {p.quests.list.map((q, i) => {
          const Icon = QUEST_ICON[q.kind];
          const done = q.have >= q.target;
          return (
            <div className="quest" key={i}>
              <Icon size={34} style={{ color: 'var(--gold)', flex: 'none' }} />
              <div className="grow">
                <b>{t(QUEST_TEXT[q.kind], { n: q.target })}</b>
                <div className="row">
                  <Bar value={q.have / q.target} className="grow" />
                  <span className="muted" style={{ fontSize: 14, fontWeight: 800 }}>
                    {Math.min(q.have, q.target)}/{q.target}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="btn small gold"
                disabled={!done || q.claimed}
                onClick={() => {
                  const g = claimQuest(i);
                  if (g) {
                    sfx.chest();
                    setToast(`+${g} 💎`);
                  }
                }}
              >
                {q.claimed ? '✓' : (
                  <>
                    <Gem size={16} /> {q.gems}
                  </>
                )}
              </button>
            </div>
          );
        })}
        <div className="row" style={{ paddingTop: 14 }}>
          <ChestArt open={p.quests.bonusClaimed} locked={!allClaimed} size={56} />
          <p className="grow muted" style={{ fontWeight: 700 }}>
            {t('bonusChest')}
          </p>
          <button
            type="button"
            className="btn small"
            disabled={!allClaimed || p.quests.bonusClaimed}
            onClick={() => {
              const g = claimQuestBonus();
              if (g) {
                sfx.chest();
                setToast(`+${g} 💎`);
              }
            }}
          >
            {t('open')}
          </button>
        </div>
      </div>

      <h2 className="section-title">{t('shop')}</h2>
      <div className="card row">
        <Snow size={40} style={{ color: 'var(--blue)', flex: 'none' }} />
        <div className="grow">
          <b>{t('freeze')}</b>
          <p className="muted" style={{ fontSize: 14 }}>
            {t('freezeSub')}
          </p>
          <p style={{ fontSize: 14, fontWeight: 800 }}>{t('owned', { n: p.streak.freezes })}</p>
        </div>
        <button
          type="button"
          className="btn small blue"
          disabled={p.gems < FREEZE_COST || p.streak.freezes >= 2}
          onClick={() => {
            if (buyFreeze()) {
              sfx.chest();
              setToast('🧊 +1');
            }
          }}
        >
          <Gem size={16} /> {FREEZE_COST}
        </button>
      </div>
      <Toast text={toast} onDone={() => setToast(null)} />
    </main>
  );
}
