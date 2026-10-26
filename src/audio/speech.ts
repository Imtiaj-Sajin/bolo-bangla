// Plays the pre-generated Bangla clips in public/audio (made by tools/audio/generate.py).
import type { Voice } from '../content/types';
import { audioKey } from '../engine/text';

const BASE = import.meta.env.BASE_URL + 'audio/';
let available: Set<string> | null = null;
let manifestLoad: Promise<void> | null = null;

/** The manifest lists which clips exist, so missing audio never throws mid-lesson. */
export function loadManifest(): Promise<void> {
  manifestLoad ??= fetch(BASE + 'manifest.json')
    .then((r) => (r.ok ? r.json() : []))
    .then((keys: string[]) => {
      available = new Set(keys);
    })
    .catch(() => {
      available = new Set();
    });
  return manifestLoad;
}

export function hasAudio(text: string, voice: Voice): boolean {
  return !!available?.has(audioKey(text, voice));
}

export function audioUrl(text: string, voice: Voice): string {
  return `${BASE}${audioKey(text, voice)}.mp3`;
}

let current: HTMLAudioElement | null = null;

export function speak(text: string, voice: Voice = 'f', slow = false): Promise<void> {
  if (!hasAudio(text, voice)) return Promise.resolve();
  current?.pause();
  const a = new Audio(audioUrl(text, voice));
  a.playbackRate = slow ? 0.7 : 1;
  a.preservesPitch = true;
  current = a;
  return new Promise((resolve) => {
    a.onended = () => resolve();
    a.onerror = () => resolve();
    a.play().catch(() => resolve());
  });
}

export function stopSpeech() {
  current?.pause();
}

/** Warm the HTTP/service-worker cache for a session's clips. */
export function preload(list: { text: string; voice: Voice }[]) {
  for (const { text, voice } of list) {
    if (!hasAudio(text, voice)) continue;
    fetch(audioUrl(text, voice)).catch(() => {});
  }
}

/** Download every clip into the offline cache. Reports progress 0..1. */
export async function downloadAll(onProgress: (p: number) => void): Promise<number> {
  await loadManifest();
  const keys = [...(available ?? [])];
  let done = 0;
  const queue = [...keys];
  const worker = async () => {
    while (queue.length) {
      const k = queue.pop()!;
      await fetch(`${BASE}${k}.mp3`).catch(() => {});
      done++;
      onProgress(done / keys.length);
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  return keys.length;
}
