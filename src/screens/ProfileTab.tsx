import { useState } from 'react';
import { downloadAll } from '../audio/speech';
import type { Lang } from '../content/types';
import { COURSE } from '../engine/course';
import { useT } from '../i18n/ui';
import {
  currentIndex,
  dayKey,
  exportProgress,
  importProgress,
  liveStreak,
  nodeDone,
  resetProgress,
  update,
  useProgress,
  type Progress,
  type Theme,
} from '../state/store';
import { Avatar } from '../ui/Avatar';
import { Modal, Toast } from '../ui/bits';
import { Bolt, Cards, Crown, Download, Fire, Share, Target } from '../ui/icons';
import { GOALS } from './Onboarding';

const ACHIEVEMENTS: { id: string; emoji: string; en: string; id_: string; test: (p: Progress, words: number) => boolean }[] = [
  { id: 'first', emoji: '🌱', en: 'First lesson', id_: 'Pelajaran pertama', test: (p) => p.stats.sessions >= 1 },
  { id: 'streak7', emoji: '🔥', en: '7-day streak', id_: 'Runtutan 7 hari', test: (p) => p.streak.best >= 7 },
  { id: 'streak30', emoji: '🏅', en: '30-day streak', id_: 'Runtutan 30 hari', test: (p) => p.streak.best >= 30 },
  { id: 'words50', emoji: '📚', en: '50 words', id_: '50 kata', test: (_, w) => w >= 50 },
  { id: 'words150', emoji: '🎓', en: '150 words', id_: '150 kata', test: (_, w) => w >= 150 },
  { id: 'perfect5', emoji: '💯', en: '5 perfect lessons', id_: '5 pelajaran sempurna', test: (p) => p.stats.perfect >= 5 },
  { id: 'unit1', emoji: '🏆', en: 'First unit passed', id_: 'Unit pertama lulus', test: (p) => COURSE.units[0].nodes.every((n) => nodeDone(n, p)) },
  {
    id: 'basic',
    emoji: '👑',
    en: 'Basic level complete',
    id_: 'Level Dasar selesai',
    test: (p) => {
      const exam = COURSE.levelExams.get('basic');
      return !!exam && nodeDone(exam, p);
    },
  },
];

export function ProfileTab() {
  const t = useT();
  const p = useProgress();
  const lang = p.profile.lang;
  const [toast, setToast] = useState<string | null>(null);
  const [audioPct, setAudioPct] = useState<number | null>(null);
  const [backup, setBackup] = useState(false);
  const [restore, setRestore] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  const words = COURSE.units.flatMap((u) => u.words).filter((w) => p.mem[w.key]).length;
  const streak = liveStreak(p);
  const week = Array.from({ length: 7 }, (_, k) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - k));
    return { d, xp: p.daily[dayKey(d)] ?? 0 };
  });
  const maxXp = Math.max(p.profile.goal, ...week.map((w) => w.xp));
  const cur = COURSE.path[Math.min(currentIndex(p), COURSE.path.length - 1)];

  const share = async () => {
    const text = t('shareText', { streak, xp: p.xp, unit: cur.unit.n, title: cur.unit.def.title[lang] });
    try {
      if (navigator.share) await navigator.share({ text });
      else {
        await navigator.clipboard.writeText(text);
        setToast(t('copied'));
      }
    } catch {
      // Share sheet dismissed.
    }
  };

  const setTheme = (theme: Theme) => update((s) => void (s.profile.theme = theme));
  const setLang = (l: Lang) => update((s) => void (s.profile.lang = l));

  return (
    <main className="page">
      <div className="row" style={{ marginBottom: 18 }}>
        <Avatar who="you" size={84} />
        <div className="grow">
          <h1 style={{ marginBottom: 0 }}>{p.profile.name || t('tabProfile')}</h1>
          <p className="muted">{t('joined', { d: new Date(p.createdAt).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { month: 'long', year: 'numeric' }) })}</p>
        </div>
        <button type="button" className="icon-btn" style={{ color: 'var(--blue)' }} aria-label={t('share')} onClick={() => void share()}>
          <Share size={26} />
        </button>
      </div>

      <h2 className="section-title">{t('stats')}</h2>
      <div className="stats-grid">
        <Stat icon={<Fire size={28} style={{ color: 'var(--orange)' }} />} value={streak} label={t('dayStreak')} />
        <Stat icon={<Bolt size={28} style={{ color: 'var(--gold)' }} />} value={p.xp} label={t('totalXpLabel')} />
        <Stat icon={<Cards size={28} style={{ color: 'var(--teal)' }} />} value={words} label={t('wordsLabel')} />
        <Stat icon={<Target size={28} style={{ color: 'var(--purple)' }} />} value={p.stats.sessions} label={t('lessonsLabel')} />
        <Stat icon={<Crown size={28} style={{ color: 'var(--gold)' }} />} value={p.streak.best} label={t('bestStreak')} />
        <Stat icon={<span style={{ fontSize: 24 }}>⏱️</span>} value={Math.round(p.stats.ms / 60000)} label={t('minutes')} />
      </div>

      <h2 className="section-title">{t('thisWeek')}</h2>
      <div className="card" style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 150 }}>
        {week.map(({ d, xp }) => (
          <div key={d.toISOString()} style={{ flex: 1, display: 'grid', justifyItems: 'center', gap: 4, alignSelf: 'stretch', alignContent: 'end' }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)' }}>{xp || ''}</span>
            <div style={{ width: '70%', height: `${(xp / maxXp) * 80}px`, minHeight: 4, borderRadius: 6, background: xp >= p.profile.goal ? 'var(--gold)' : 'var(--locked)' }} />
            <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)' }}>
              {d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { weekday: 'narrow' })}
            </span>
          </div>
        ))}
      </div>

      <h2 className="section-title">{t('achievements')}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {ACHIEVEMENTS.map((a) => {
          const got = a.test(p, words);
          return (
            <div key={a.id} className="center" style={{ opacity: got ? 1 : 0.35, filter: got ? undefined : 'grayscale(1)' }}>
              <div style={{ fontSize: 34 }}>{a.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 800, lineHeight: 1.2 }}>{lang === 'id' ? a.id_ : a.en}</div>
            </div>
          );
        })}
      </div>

      <h2 className="section-title">{t('settings')}</h2>
      <div className="card stack">
        <label className="stack" style={{ display: 'block' }}>
          <b>{t('sLang')}</b>
          <div className="seg" style={{ marginTop: 8 }}>
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
              English
            </button>
            <button type="button" aria-pressed={lang === 'id'} onClick={() => setLang('id')}>
              Indonesia
            </button>
          </div>
        </label>
        <label style={{ display: 'block' }}>
          <b>{t('sName')}</b>
          <input className="field" style={{ marginTop: 8 }} value={p.profile.name} onChange={(e) => update((s) => void (s.profile.name = e.target.value))} />
        </label>
        <div>
          <b>{t('sGoal')}</b>
          <div className="seg" style={{ marginTop: 8 }}>
            {GOALS.map((g) => (
              <button key={g.xp} type="button" aria-pressed={p.profile.goal === g.xp} onClick={() => update((s) => void (s.profile.goal = g.xp))}>
                {g.xp} XP
              </button>
            ))}
          </div>
        </div>
        <label className="row">
          <b className="grow">{t('sSound')}</b>
          <input type="checkbox" className="toggle" checked={p.profile.sound} onChange={(e) => update((s) => void (s.profile.sound = e.target.checked))} />
        </label>
        <div>
          <b>{t('sTheme')}</b>
          <div className="seg" style={{ marginTop: 8 }}>
            {(['system', 'light', 'dark'] as Theme[]).map((th) => (
              <button key={th} type="button" aria-pressed={p.profile.theme === th} onClick={() => setTheme(th)}>
                {t(th === 'system' ? 'themeSystem' : th === 'light' ? 'themeLight' : 'themeDark')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="stack" style={{ marginTop: 12 }}>
        <button
          type="button"
          className="card card-btn c-blue"
          disabled={audioPct !== null && audioPct < 1}
          onClick={async () => {
            setAudioPct(0);
            const n = await downloadAll(setAudioPct);
            setToast(t('sAudioDone', { n }));
          }}
        >
          <span className="ic">
            <Download size={28} />
          </span>
          <span className="grow">
            <h3>{t('sAudio')}</h3>
            <p>{audioPct !== null && audioPct < 1 ? `${Math.round(audioPct * 100)}%` : t('sAudioSub')}</p>
          </span>
        </button>
        <button type="button" className="btn outline full" onClick={() => setBackup(true)}>
          {t('sBackup')}
        </button>
        <button type="button" className="btn ghost full" style={{ color: 'var(--red)' }} onClick={() => setConfirmReset(true)}>
          {t('sReset')}
        </button>
      </div>

      <Modal open={backup} onClose={() => setBackup(false)} labelledBy="backup-title">
        <div className="stack">
          <h2 id="backup-title" style={{ fontSize: 22, fontWeight: 900 }}>
            {t('sBackup')}
          </h2>
          <p className="muted">{t('sBackupSub')}</p>
          <textarea className="type-box" readOnly value={exportProgress()} style={{ minHeight: 90, fontSize: 12 }} onFocus={(e) => e.target.select()} />
          <button
            type="button"
            className="btn full"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(exportProgress());
                setToast(t('copied'));
              } catch {
                // Clipboard blocked; the code can still be selected by hand.
              }
            }}
          >
            {t('copy')}
          </button>
          <h3 style={{ fontWeight: 900, marginTop: 12 }}>{t('sRestore')}</h3>
          <textarea className="type-box" placeholder={t('sRestorePh')} value={restore} onChange={(e) => setRestore(e.target.value)} style={{ minHeight: 90, fontSize: 12 }} />
          <button
            type="button"
            className="btn blue full"
            disabled={!restore.trim()}
            onClick={() => {
              const okay = importProgress(restore);
              setToast(okay ? t('sRestored') : t('sBadCode'));
              if (okay) {
                setRestore('');
                setBackup(false);
              }
            }}
          >
            {t('sRestore')}
          </button>
          <button type="button" className="btn ghost full" onClick={() => setBackup(false)}>
            {t('close')}
          </button>
        </div>
      </Modal>

      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} labelledBy="reset-title">
        <div className="stack center">
          <h2 id="reset-title" style={{ fontSize: 20, fontWeight: 900 }}>
            {t('sResetConfirm')}
          </h2>
          <button type="button" className="btn blue full" autoFocus onClick={() => setConfirmReset(false)}>
            {t('cancel')}
          </button>
          <button
            type="button"
            className="btn red full"
            onClick={() => {
              resetProgress();
              setConfirmReset(false);
            }}
          >
            {t('sReset')}
          </button>
        </div>
      </Modal>
      <Toast text={toast} onDone={() => setToast(null)} />
    </main>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="stat-card">
      {icon}
      <div>
        <b>{value}</b>
        <span>{label}</span>
      </div>
    </div>
  );
}
