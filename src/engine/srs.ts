// Memory model in the spirit of Duolingo's half-life regression (Settles & Meeder 2016):
// p(recall) = 2^(-Δ/h), with h = 2^(θ0 + θ1·√correct + θ2·√wrong) days, using hand-set weights.

export interface Mem {
  /** Half-life in days. */
  h: number;
  /** Last practice time (ms). */
  t: number;
  seen: number;
  ok: number;
  bad: number;
  /** Last time it was answered wrong (ms). */
  lastBad?: number;
}

export type MemMap = Record<string, Mem>;

const DAY = 86_400_000;
const THETA = { base: -1, ok: 1.5, bad: -1 };

export function recall(m: Mem | undefined, now = Date.now()): number {
  if (!m) return 0;
  return 2 ** (-(now - m.t) / (m.h * DAY));
}

/** Record one session's result for an item (count each item once per session). */
export function practise(m: Mem | undefined, correct: boolean, now = Date.now()): Mem {
  const seen = (m?.seen ?? 0) + 1;
  const ok = (m?.ok ?? 0) + (correct ? 1 : 0);
  const bad = (m?.bad ?? 0) + (correct ? 0 : 1);
  const h = Math.min(180, 2 ** (THETA.base + THETA.ok * Math.sqrt(ok) + THETA.bad * Math.sqrt(bad)));
  return { h, t: now, seen, ok, bad, lastBad: correct ? m?.lastBad : now };
}

/** 0–4 strength bars, like Duolingo's old word strength meter. */
export function strength(m: Mem | undefined, now = Date.now()): number {
  if (!m) return 0;
  const p = recall(m, now);
  return p > 0.9 ? 4 : p > 0.7 ? 3 : p > 0.5 ? 2 : 1;
}
