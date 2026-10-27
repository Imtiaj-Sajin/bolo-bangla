// Plays the pre-generated Bangla clips in public/audio (made by tools/audio/generate.py).
import { useSyncExternalStore } from 'react';
import type { Voice } from '../content/types';
import { audioKey, slowKey } from '../engine/text';

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

// Who is talking right now, so the speaking character can animate.
let speakingVoice: Voice | null = null;
const listeners = new Set<() => void>();
const setSpeaking = (v: Voice | null) => {
  speakingVoice = v;
  listeners.forEach((l) => l());
};

/** True while a clip in this voice is playing. */
export function useSpeaking(voice?: Voice): boolean {
  const v = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => speakingVoice,
  );
  return voice ? v === voice : v !== null;
}

let current: HTMLAudioElement | null = null;

export function speak(text: string, voice: Voice = 'f', slow = false): Promise<void> {
  if (!hasAudio(text, voice)) return Promise.resolve();
  current?.pause();
  // A real slow recording sounds natural; stretching the normal clip is only the fallback.
  const slowFile = slow && available?.has(slowKey(text, voice));
  const a = new Audio(slowFile ? `${BASE}${slowKey(text, voice)}.mp3` : audioUrl(text, voice));
  if (slow && !slowFile) {
    a.playbackRate = 0.75;
    a.preservesPitch = true;
  }
  current = a;
  return new Promise((resolve) => {
    const done = () => {
      if (current === a) setSpeaking(null);
      resolve();
    };
    a.onplay = () => setSpeaking(voice);
    a.onended = done;
    a.onerror = done;
    a.onpause = done;
    a.play().catch(done);
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
