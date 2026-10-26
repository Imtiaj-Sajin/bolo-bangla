import { useCallback, useEffect, useRef, useState } from 'react';
import { ensureQuests, useProgress } from './state/store';
import { Onboarding } from './screens/Onboarding';
import { Learn } from './screens/Learn';
import { Session, type SessionSpec } from './screens/Session';
import { StoryPlayer } from './screens/StoryPlayer';
import { PracticeTab } from './screens/PracticeTab';
import { WordsTab } from './screens/WordsTab';
import { QuestsTab } from './screens/QuestsTab';
import { ProfileTab } from './screens/ProfileTab';
import { BanglishGuide } from './screens/BanglishGuide';
import { Phrasebook } from './screens/Phrasebook';
import { TabBar, type Tab } from './screens/TabBar';
import { applyTheme } from './theme';

export type Route =
  | { name: 'session'; spec: SessionSpec }
  | { name: 'story'; nodeId: string }
  | { name: 'guide' }
  | { name: 'phrasebook' };

export interface Nav {
  push: (r: Route) => void;
  pop: () => void;
  setTab: (t: Tab) => void;
}

export function App() {
  const p = useProgress();
  const [tab, setTab] = useState<Tab>('learn');
  const [stack, setStack] = useState<Route[]>([]);
  /** A screen can veto "back" (e.g. a lesson asks "are you sure?"). */
  const guard = useRef<(() => boolean) | null>(null);

  useEffect(() => applyTheme(p.profile.theme), [p.profile.theme]);
  useEffect(() => {
    document.documentElement.lang = p.profile.lang;
  }, [p.profile.lang]);
  useEffect(() => {
    ensureQuests();
  }, []);

  const depth = useRef(0);
  depth.current = stack.length;

  useEffect(() => {
    const onPop = () => {
      if (!depth.current) return;
      if (guard.current && !guard.current()) {
        // Stay on this screen: put the history entry back.
        history.pushState({ bolo: true }, '');
        return;
      }
      guard.current = null;
      setStack((s) => s.slice(0, -1));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const nav: Nav = {
    push: useCallback((r: Route) => {
      history.pushState({ bolo: true }, '');
      setStack((s) => [...s, r]);
    }, []),
    pop: useCallback(() => {
      guard.current = null;
      history.back();
    }, []),
    setTab: useCallback((t: Tab) => {
      setTab(t);
      window.scrollTo({ top: 0 });
    }, []),
  };

  if (!p.profile.onboarded) return <Onboarding />;

  const top = stack[stack.length - 1];
  if (top) {
    return (
      <div className="app">
        {top.name === 'session' && <Session key={JSON.stringify(top.spec)} spec={top.spec} nav={nav} guard={guard} />}
        {top.name === 'story' && <StoryPlayer nodeId={top.nodeId} nav={nav} guard={guard} />}
        {top.name === 'guide' && <BanglishGuide nav={nav} />}
        {top.name === 'phrasebook' && <Phrasebook nav={nav} />}
      </div>
    );
  }

  return (
    <div className="app">
      {tab === 'learn' && <Learn nav={nav} />}
      {tab === 'practice' && <PracticeTab nav={nav} />}
      {tab === 'words' && <WordsTab />}
      {tab === 'quests' && <QuestsTab />}
      {tab === 'profile' && <ProfileTab />}
      <TabBar tab={tab} onTab={nav.setTab} />
    </div>
  );
}
