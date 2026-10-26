// Short helpers so unit files read like a phrasebook.
import type { CharId, Chat, Gloss, Reply, Sentence, StoryStep, Tip, Tr, Voice, Word } from './types';

export const w = (bn: string, en: string, id: string, emoji?: string, note?: Tr): Word => ({ bn, en, id, emoji, note });

export const f = (bn: string, en: string, id: string): Gloss => ({ bn, en, id });

export const s = (bn: string, en: string, id: string, v?: Voice): Sentence => ({ bn, en, id, v });

export const ok = (bn: string, en: string, id: string): Reply => ({ bn, en, id, ok: true });
export const no = (bn: string, en: string, id: string): Reply => ({ bn, en, id, ok: false });

export const chat = (who: CharId, bn: string, en: string, id: string, replies: Reply[]): Chat => ({ who, bn, en, id, replies });

export const line = (who: CharId, bn: string, en: string, id: string): StoryStep => ({ line: { who, bn, en, id } });

export const ask = (q: Tr, options: Tr[], answer: number): StoryStep => ({ question: { q, options, answer } });

export const tr = (en: string, id: string): Tr => ({ en, id });

export const tip = (title: Tr, body: Tr): Tip => ({ title, body });
