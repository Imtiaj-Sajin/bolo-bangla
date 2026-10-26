// Learner progress, saved in localStorage. One small external store read with useSyncExternalStore.
import { useSyncExternalStore } from 'react';
import type { Lang } from '../content/types';
import { COURSE, PASS, type PathNode } from '../engine/course';
import { practise, type MemMap } from '../engine/srs';

export type Theme = 'system' | 'light' | 'dark';

export interface NodeProgress {
  rounds: number;
  best: number;
}

export type QuestKind = 'xp' | 'lessons' | 'combo' | 'accuracy' | 'listen' | 'words' | 'speak';

export interface Quest {
  kind: QuestKind;
  target: number;
  have: number;
  gems: number;
  claimed: boolean;
}

export interface Progress {
  v: 1;
  profile: {
    name: string;
    lang: Lang;
    goal: number;
    sound: boolean;
    theme: Theme;
    onboarded: boolean;
    slowFirst: boolean;
  };
  xp: number;
  gems: number;
  streak: { count: number; last: string; freezes: number; best: number };
  daily: Record<string, number>;
  nodes: Record<string, NodeProgress>;
  mem: MemMap;
  quests: { date: string; list: Quest[]; bonusClaimed: boolean };
  stats: { sessions: number; perfect: number; ms: number; bestCombo: number; spoken: number };
  createdAt: number;
}

const KEY = 'bolo.progress.v1';

const fresh = (): Progress => ({
  v: 1,
  profile: { name: '', lang: 'en', goal: 20, sound: true, theme: 'system', onboarded: false, slowFirst: false },
  xp: 0,
  gems: 50,
  streak: { count: 0, last: '', freezes: 0, best: 0 },
  daily: {},
  nodes: {},
  mem: {},
  quests: { date: '', list: [], bonusClaimed: false },
  stats: { sessions: 0, perfect: 0, ms: 0, bestCombo: 0, spoken: 0 },
  createdAt: Date.now(),
});

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw) as Progress;
      const base = fresh();
      return { ...base, ...p, profile: { ...base.profile, ...p.profile }, stats: { ...base.stats, ...p.stats } };
    }
  } catch {
    // Storage blocked or corrupt: start fresh but keep the app usable.
  }
  return fresh();
}

let state: Progress = load();
const listeners = new Set<() => void>();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Ignore quota/blocked storage; progress stays in memory for this visit.
  }
}

export function update(fn: (p: Progress) => void) {
  const next = structuredClone(state);
  fn(next);
  state = next;
  save();
  listeners.forEach((l) => l());
}

export function getProgress(): Progress {
  return state;
}

export function useProgress(): Progress {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
  );
}

// ---------- dates ----------

export function dayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daysBetween(a: string, b: string): number {
  const pa = new Date(a + 'T00:00:00');
  const pb = new Date(b + 'T00:00:00');
  return Math.round((pb.getTime() - pa.getTime()) / 86_400_000);
}

/** Streak as it should be displayed today (0 if it has lapsed beyond the available freezes). */
export function liveStreak(p: Progress = state): number {
  if (!p.streak.last) return 0;
  const gap = daysBetween(p.streak.last, dayKey());
  if (gap <= 1) return p.streak.count;
  return gap - 1 <= p.streak.freezes ? p.streak.count : 0;
}

export function practisedToday(p: Progress = state): boolean {
  return p.streak.last === dayKey();
}

// ---------- path status ----------

export function nodeDone(node: PathNode, p: Progress = state): boolean {
  const np = p.nodes[node.id];
  return !!np && np.rounds >= node.rounds;
}

export function currentIndex(p: Progress = state): number {
  const i = COURSE.path.findIndex((n) => !nodeDone(n, p));
  return i === -1 ? COURSE.path.length : i;
}

export type NodeStatus = 'done' | 'current' | 'locked';

export function nodeStatus(node: PathNode, p: Progress = state): NodeStatus {
  const cur = currentIndex(p);
  if (node.index < cur) return 'done';
  return node.index === cur ? 'current' : 'locked';
}

export function stars(best: number): number {
  return best >= 0.95 ? 3 : best >= 0.8 ? 2 : best >= PASS.lesson ? 1 : 0;
}

// ---------- quests ----------

const QUEST_POOL: Omit<Quest, 'have' | 'claimed'>[][] = [
  [
    { kind: 'xp', target: 0, gems: 10 },
    { kind: 'lessons', target: 2, gems: 10 },
  ],
  [
    { kind: 'combo', target: 10, gems: 15 },
    { kind: 'accuracy', target: 1, gems: 15 },
    { kind: 'listen', target: 8, gems: 15 },
  ],
  [
    { kind: 'words', target: 6, gems: 15 },
    { kind: 'speak', target: 3, gems: 15 },
    { kind: 'lessons', target: 3, gems: 20 },
  ],
];

function questsFor(date: string, goal: number): Quest[] {
  let h = 0;
  for (const c of date) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return QUEST_POOL.map((group, i) => {
    const q = group[(h >> (i * 3)) % group.length];
    return { ...q, target: q.kind === 'xp' ? goal : q.target, have: 0, claimed: false };
  });
}

export function ensureQuests() {
  const today = dayKey();
  if (state.quests.date !== today) {
    update((p) => {
      p.quests = { date: today, list: questsFor(today, p.profile.goal), bonusClaimed: false };
    });
  }
}

export function claimQuest(i: number): number {
  let gems = 0;
  update((p) => {
    const q = p.quests.list[i];
    if (q && !q.claimed && q.have >= q.target) {
      q.claimed = true;
      gems = q.gems;
      p.gems += gems;
    }
  });
  return gems;
}

export function claimQuestBonus(): number {
  let gems = 0;
  update((p) => {
    if (!p.quests.bonusClaimed && p.quests.list.length && p.quests.list.every((q) => q.claimed)) {
      p.quests.bonusClaimed = true;
      gems = 30;
      p.gems += gems;
    }
  });
  return gems;
}

// ---------- finishing a session ----------

export interface SessionResult {
  node?: PathNode;
  mode?: 'review' | 'mistakes' | 'listen';
  total: number;
  firstTry: number;
  bestCombo: number;
  ms: number;
  items: Record<string, boolean>;
  newWords: number;
  listened: number;
  spoken: number;
}

export interface Reward {
  xp: number;
  accuracy: number;
  passed: boolean;
  stars: number;
  streakExtended: boolean;
  streak: number;
  gems: number;
  roundDone: number;
  nodeComplete: boolean;
  levelUnlocked?: string;
}

export function finishSession(res: SessionResult): Reward {
  const accuracy = res.total ? res.firstTry / res.total : 1;
  const node = res.node;
  const kind = node?.kind;
  const threshold = kind === 'test' ? PASS.test : kind === 'exam' ? PASS.exam : PASS.lesson;
  const passed = accuracy >= threshold;
  const wasDone = node ? nodeDone(node) : true;
  let xp = 0;
  let gems = 0;
  if (kind === 'test') xp = passed ? 25 : 5;
  else if (kind === 'exam') xp = passed ? 50 : 10;
  else xp = wasDone ? 10 : 15;
  if (passed && kind !== 'test' && kind !== 'exam') {
    xp += Math.min(5, Math.floor(res.bestCombo / 3));
    if (accuracy === 1) xp += 5;
  }
  if (!passed && kind !== 'test' && kind !== 'exam') xp = 5;
  if (passed && !wasDone && kind === 'test') gems += 30;
  if (passed && !wasDone && kind === 'exam') gems += 100;

  const today = dayKey();
  let streakExtended = false;
  let roundDone = 0;
  let nodeComplete = false;

  update((p) => {
    // Memory
    for (const [key, ok] of Object.entries(res.items)) p.mem[key] = practise(p.mem[key], ok);

    // Node progress
    if (node) {
      const np = (p.nodes[node.id] ??= { rounds: 0, best: 0 });
      if (passed) {
        if (np.rounds < node.rounds) np.rounds++;
        np.best = Math.max(np.best, accuracy);
      }
      roundDone = np.rounds;
      nodeComplete = np.rounds >= node.rounds;
    }

    // XP + streak
    p.xp += xp;
    p.gems += gems;
    p.daily[today] = (p.daily[today] ?? 0) + xp;
    const last = p.streak.last;
    if (last !== today) {
      const gap = last ? daysBetween(last, today) : 1;
      if (!last || gap === 1) p.streak.count += 1;
      else if (gap - 1 <= p.streak.freezes) {
        p.streak.freezes -= gap - 1;
        p.streak.count += 1;
      } else p.streak.count = 1;
      p.streak.last = today;
      p.streak.best = Math.max(p.streak.best, p.streak.count);
      streakExtended = true;
      if ([7, 30, 100, 365].includes(p.streak.count)) p.gems += 50;
    }

    // Stats
    p.stats.sessions++;
    if (accuracy === 1) p.stats.perfect++;
    p.stats.ms += res.ms;
    p.stats.bestCombo = Math.max(p.stats.bestCombo, res.bestCombo);
    p.stats.spoken += res.spoken;

    // Quests
    if (p.quests.date === today) {
      for (const q of p.quests.list) {
        if (q.kind === 'xp') q.have = p.daily[today];
        if (q.kind === 'lessons') q.have += 1;
        if (q.kind === 'combo') q.have = Math.max(q.have, res.bestCombo);
        if (q.kind === 'accuracy' && accuracy >= 0.9) q.have += 1;
        if (q.kind === 'listen') q.have += res.listened;
        if (q.kind === 'words') q.have += res.newWords;
        if (q.kind === 'speak') q.have += res.spoken;
      }
    }
  });

  let levelUnlocked: string | undefined;
  if (node?.kind === 'exam' && passed && !wasDone) levelUnlocked = node.unit.level.id;

  return {
    xp,
    accuracy,
    passed,
    stars: stars(accuracy),
    streakExtended,
    streak: state.streak.count,
    gems,
    roundDone,
    nodeComplete,
    levelUnlocked,
  };
}

/** Open a chest on the path: a few gems, deterministic per chest. */
export function openChest(node: PathNode): number {
  let h = 0;
  for (const c of node.id) h = (h * 33 + c.charCodeAt(0)) >>> 0;
  const gems = 20 + (h % 4) * 5;
  update((p) => {
    if (!p.nodes[node.id]) {
      p.nodes[node.id] = { rounds: 1, best: 1 };
      p.gems += gems;
    }
  });
  return gems;
}

export function markStoryDone(node: PathNode, accuracy: number): Reward {
  return finishSession({
    node,
    total: 10,
    firstTry: Math.round(accuracy * 10),
    bestCombo: 0,
    ms: 0,
    items: {},
    newWords: 0,
    listened: 0,
    spoken: 0,
  });
}

export const FREEZE_COST = 200;

export function buyFreeze(): boolean {
  if (state.gems < FREEZE_COST || state.streak.freezes >= 2) return false;
  update((p) => {
    p.gems -= FREEZE_COST;
    p.streak.freezes += 1;
  });
  return true;
}

// ---------- backup ----------

export function exportProgress(): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(state))));
}

export function importProgress(code: string): boolean {
  try {
    const p = JSON.parse(decodeURIComponent(escape(atob(code.trim())))) as Progress;
    if (p.v !== 1 || !p.profile) return false;
    update((s) => Object.assign(s, p));
    return true;
  } catch {
    return false;
  }
}

export function resetProgress() {
  update((s) => Object.assign(s, fresh()));
}
