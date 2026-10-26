import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Nav } from '../App';
import { first } from '../engine/text';
import { COURSE, PASS, type PathNode, type UnitInfo } from '../engine/course';
import { useT } from '../i18n/ui';
import {
  currentIndex,
  liveStreak,
  nodeDone,
  nodeStatus,
  openChest,
  practisedToday,
  stars,
  useProgress,
  type Progress,
} from '../state/store';
import { sfx } from '../audio/sfx';
import { Avatar } from '../ui/Avatar';
import { Mascot } from '../ui/Mascot';
import { Modal } from '../ui/bits';
import {
  ArrowDown,
  Book,
  Bolt,
  Chat,
  Chest,
  Crown,
  Dumbbell,
  Fire,
  FlagBD,
  Gem,
  Guide,
  Headphones,
  Lock,
  Star,
  Trophy,
} from '../ui/icons';
import { Guidebook } from './Guidebook';

const OFFSETS = [0, 44, 70, 44, 0, -44, -70, -44];

const ICONS = {
  lesson: Star,
  listen: Headphones,
  chat: Chat,
  story: Book,
  practice: Dumbbell,
  chest: Chest,
  test: Trophy,
  exam: Crown,
};

export function Learn({ nav }: { nav: Nav }) {
  const p = useProgress();
  const t = useT();
  const lang = p.profile.lang;
  const cur = currentIndex(p);
  const curNode = COURSE.path[cur] as PathNode | undefined;
  const [open, setOpen] = useState<string | null>(null);
  const [guide, setGuide] = useState<UnitInfo | null>(null);
  const [chest, setChest] = useState<number | null>(null);
  const [showJump, setShowJump] = useState(false);
  const curRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    curRef.current?.scrollIntoView({ block: 'center' });
  }, []);

  useEffect(() => {
    const el = curRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowJump(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [cur]);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!(e.target as Element).closest('.node-wrap')) setOpen(null);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  const start = (node: PathNode) => {
    setOpen(null);
    if (node.kind === 'story') return nav.push({ name: 'story', nodeId: node.id });
    const done = nodeDone(node, p);
    const round = done ? Math.floor(Math.random() * node.rounds) : (p.nodes[node.id]?.rounds ?? 0);
    nav.push({ name: 'session', spec: { nodeId: node.id, round } });
  };

  const tapChest = (node: PathNode) => {
    if (nodeStatus(node, p) !== 'current') return setOpen(open === node.id ? null : node.id);
    sfx.chest();
    setChest(openChest(node));
  };

  const streak = liveStreak(p);
  const levelOfCur = curNode?.unit.level ?? COURSE.units[COURSE.units.length - 1].level;

  return (
    <>
      <header className="topbar">
        <span className="stat lvl">
          <FlagBD size={30} /> {first(levelOfCur.title[lang])}
        </span>
        <span className={`stat fire ${practisedToday(p) ? '' : 'cold'}`} aria-label={`${streak} day streak`}>
          <Fire size={24} /> {streak}
        </span>
        <span className="stat gem" aria-label={`${p.gems} gems`}>
          <Gem size={22} /> {p.gems}
        </span>
        <span className="stat xp" aria-label={`${p.xp} XP`}>
          <Bolt size={22} /> {p.xp}
        </span>
      </header>

      <main className="path">
        {COURSE.units.map((unit) => {
          const firstOfLevel = unit.nInLevel === 1;
          const prevExam = firstOfLevel ? previousExam(unit) : undefined;
          const levelLocked = !!prevExam && !nodeDone(prevExam, p);
          return (
            <section key={unit.def.id} className={`unit-section c-${unit.color}`}>
              {firstOfLevel && (
                <div className={`level-header ${levelLocked ? 'locked' : ''}`}>
                  <div className="lv">
                    {t('level')} {unit.level.n}
                  </div>
                  <h2>{unit.level.title[lang]}</h2>
                  <p>
                    {levelLocked && prevExam
                      ? t('levelLocked', { name: prevExam.unit.level.title[lang] })
                      : unit.level.subtitle[lang]}
                  </p>
                </div>
              )}
              <div className="unit-banner" style={unitBannerStyle(unit, p)}>
                <div className="text">
                  <div className="eyebrow">
                    {t('level')} {unit.level.n} · {t('unit')} {unit.n}
                  </div>
                  <h2>{unit.def.title[lang]}</h2>
                </div>
                <button type="button" className="guide-btn" aria-label={t('guidebook')} onClick={() => setGuide(unit)}>
                  <Guide size={28} />
                </button>
              </div>
              <div className="nodes">
                {unit.nodes.map((node, i) => {
                  const status = nodeStatus(node, p);
                  const x = OFFSETS[i % OFFSETS.length];
                  const Icon = ICONS[node.kind];
                  const np = p.nodes[node.id];
                  const isCur = status === 'current';
                  const deco = i === 2 || i === 6 ? decoFor(unit, i) : null;
                  return (
                    <div
                      key={node.id}
                      ref={isCur ? curRef : undefined}
                      className="node-wrap"
                      style={{ '--x': `${x}px`, zIndex: open === node.id ? 40 : undefined } as React.CSSProperties}
                    >
                      {isCur && node.kind !== 'chest' && <div className="start-bubble">{t('start')}</div>}
                      {isCur && node.kind !== 'chest' && <Ring progress={(np?.rounds ?? 0) / node.rounds} />}
                      <button
                        type="button"
                        className={`node ${status} ${node.kind === 'chest' ? 'chest' : ''} ${status === 'done' && (node.kind === 'test' || node.kind === 'exam') ? 'gold' : ''}`}
                        aria-label={`${node.title[lang]} — ${status}`}
                        onClick={() => {
                          sfx.tap();
                          if (node.kind === 'chest') tapChest(node);
                          else setOpen(open === node.id ? null : node.id);
                        }}
                      >
                        {node.kind === 'chest' ? (
                          <ChestArt open={status === 'done'} locked={status === 'locked'} />
                        ) : status === 'locked' && node.kind !== 'test' && node.kind !== 'exam' ? (
                          <Lock size={30} className="glyph" />
                        ) : (
                          <Icon size={34} className="glyph" />
                        )}
                      </button>
                      {status === 'done' && node.kind === 'lesson' && np && <NodeStars n={stars(np.best)} />}
                      {open === node.id && (
                        <NodePopover node={node} status={status} p={p} onStart={() => start(node)} />
                      )}
                      {deco && (
                        <div className="path-deco" style={{ left: x > 0 ? -150 : 96, top: -8 }} aria-hidden="true">
                          {deco}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
        {cur >= COURSE.path.length && (
          <div className="center stack" style={{ padding: 32 }}>
            <Mascot mood="cheer" size={140} />
            <h2>{t('courseDone')}</h2>
          </div>
        )}
      </main>

      {showJump && (
        <button type="button" className="fab-down" aria-label={t('jumpToCurrent')} onClick={() => curRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
          <ArrowDown size={26} />
        </button>
      )}

      <Guidebook unit={guide} onClose={() => setGuide(null)} />

      <Modal open={chest !== null} onClose={() => setChest(null)} labelledBy="chest-title">
        <div className="center stack">
          <div className="bounce-in">
            <ChestArt open size={120} />
          </div>
          <h2 id="chest-title" style={{ fontSize: 24, fontWeight: 900 }}>
            {t('chestGot', { n: chest ?? 0 })}
          </h2>
          <div className="stat gem" style={{ justifyContent: 'center', fontSize: 28, color: 'var(--blue)', display: 'flex', gap: 8, fontWeight: 900 }}>
            <Gem size={32} /> +{chest}
          </div>
          <button type="button" className="btn full" onClick={() => setChest(null)}>
            {t('continue')}
          </button>
        </div>
      </Modal>
    </>
  );
}

function previousExam(unit: UnitInfo): PathNode | undefined {
  const idx = COURSE.units.indexOf(unit);
  const prev = COURSE.units[idx - 1];
  return prev ? COURSE.levelExams.get(prev.level.id) : undefined;
}

function unitBannerStyle(unit: UnitInfo, p: Progress): React.CSSProperties | undefined {
  const locked = unit.nodes[0] && nodeStatus(unit.nodes[0], p) === 'locked';
  return locked ? { filter: 'grayscale(0.7)', opacity: 0.85 } : undefined;
}

function decoFor(unit: UnitInfo, i: number) {
  const whos = [...new Set(unit.chats.map((c) => c.who))];
  const who = whos[i === 2 ? 0 : 1];
  if (who) return <Avatar who={who} size={84} />;
  return <Mascot mood={i === 2 ? 'happy' : 'wave'} size={84} />;
}

function NodePopover({ node, status, p, onStart }: { node: PathNode; status: string; p: Progress; onStart: () => void }) {
  const t = useT();
  const lang = p.profile.lang;
  const np = p.nodes[node.id];
  const isTest = node.kind === 'test' || node.kind === 'exam';
  if (status === 'locked') {
    return (
      <div className="node-pop locked" role="dialog" aria-label={node.title[lang]}>
        <h3>{node.title[lang]}</h3>
        <p>{t('lockedHint')}</p>
        <button type="button" className="btn full" disabled>
          {t('locked')}
        </button>
      </div>
    );
  }
  const sub = isTest
    ? t('needPass', { p: Math.round((node.kind === 'exam' ? PASS.exam : PASS.test) * 100) })
    : node.kind === 'lesson' && status === 'current'
      ? t('lessonOf', { a: (np?.rounds ?? 0) + 1, b: node.rounds })
      : node.unit.def.title[lang];
  return (
    <div className="node-pop" role="dialog" aria-label={node.title[lang]}>
      <h3>{node.title[lang]}</h3>
      <p>{sub}</p>
      <button type="button" className="btn white full" onClick={onStart}>
        {status === 'done' ? t('practiceXp') : isTest ? t('takeTest') : t('startXp', { xp: 15 })}
      </button>
    </div>
  );
}

function NodeStars({ n }: { n: number }) {
  return (
    <div className="node-stars" aria-label={`${n} stars`}>
      {[0, 1, 2].map((i) => (
        <Star key={i} size={16} className={i < n ? '' : 'off'} />
      ))}
    </div>
  );
}

function Ring({ progress }: { progress: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <svg className="ring" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--locked)" strokeWidth="7" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="var(--c)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={`${c * progress} ${c}`}
        transform="rotate(-90 50 50)"
      />
    </svg>
  );
}

export function ChestArt({ open = false, locked = false, size = 72 }: { open?: boolean; locked?: boolean; size?: number }) {
  const wood = locked ? '#8e9ba3' : '#c97b2b';
  const woodDark = locked ? '#6d7a82' : '#9a5a1c';
  const band = locked ? '#b7c2c8' : '#ffd36a';
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 80 72" aria-hidden="true">
      {open && <ellipse cx="40" cy="30" rx="26" ry="10" fill="#ffe27a" opacity=".6" />}
      <rect x="8" y="30" width="64" height="36" rx="6" fill={wood} />
      <rect x="8" y="58" width="64" height="8" rx="4" fill={woodDark} />
      <rect x="34" y="30" width="12" height="36" fill={band} />
      {open ? (
        <path d="M10 30l6-20h48l6 20z" fill={woodDark} />
      ) : (
        <path d="M8 32c0-12 8-20 18-20h28c10 0 18 8 18 20z" fill={wood} />
      )}
      {!open && <rect x="34" y="12" width="12" height="20" fill={band} />}
      <rect x="35" y="34" width="10" height="12" rx="3" fill={locked ? '#8e9ba3' : '#fff3c4'} />
    </svg>
  );
}
