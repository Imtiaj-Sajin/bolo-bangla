import { useT } from '../i18n/ui';
import { Cards, Dumbbell, Home, Person, Target } from '../ui/icons';

export type Tab = 'learn' | 'practice' | 'words' | 'quests' | 'profile';

const TABS = [
  { id: 'learn', label: 'tabLearn', Icon: Home },
  { id: 'practice', label: 'tabPractice', Icon: Dumbbell },
  { id: 'words', label: 'tabWords', Icon: Cards },
  { id: 'quests', label: 'tabQuests', Icon: Target },
  { id: 'profile', label: 'tabProfile', Icon: Person },
] as const;

export function TabBar({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  const t = useT();
  return (
    <nav className="tabbar" aria-label="Main">
      <div className="tabbar-inner">
        {TABS.map(({ id, label, Icon }) => (
          <button key={id} type="button" className="tab" aria-current={tab === id ? 'page' : undefined} aria-label={t(label)} onClick={() => onTab(id)}>
            <Icon size={30} className={`t-${id}`} />
          </button>
        ))}
      </div>
    </nav>
  );
}
