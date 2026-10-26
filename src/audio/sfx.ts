// Tiny synthesized sound effects (no files to download) plus vibration on Android.
import { getProgress } from '../state/store';

let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', gain = 0.18) {
  const c = ac();
  if (!c) return;
  const t = c.currentTime + start;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.05);
}

const on = () => getProgress().profile.sound;

function buzz(pattern: number | number[]) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    // Vibration is optional.
  }
}

export const sfx = {
  tap() {
    if (on()) tone(660, 0, 0.06, 'triangle', 0.06);
  },
  correct() {
    if (!on()) return;
    tone(784, 0, 0.12, 'triangle');
    tone(1175, 0.09, 0.22, 'triangle');
  },
  wrong() {
    buzz(120);
    if (!on()) return;
    tone(220, 0, 0.16, 'square', 0.07);
    tone(165, 0.12, 0.24, 'square', 0.07);
  },
  combo() {
    if (!on()) return;
    [988, 1319, 1568].forEach((f, i) => tone(f, i * 0.06, 0.14, 'triangle', 0.1));
  },
  complete() {
    buzz([30, 40, 30]);
    if (!on()) return;
    [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.09, 0.3, 'triangle', 0.14));
  },
  chest() {
    if (!on()) return;
    [1047, 1319, 1568, 2093].forEach((f, i) => tone(f, i * 0.07, 0.25, 'sine', 0.12));
  },
  fail() {
    if (!on()) return;
    [392, 330, 262].forEach((f, i) => tone(f, i * 0.15, 0.3, 'triangle', 0.12));
  },
};
