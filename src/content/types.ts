// Course content model. Bangla is always written in Banglish (Latin letters).
// Translation strings may hold alternatives separated by "|"; the first one is canonical.

export type Lang = 'en' | 'id';
export type Tr = { en: string; id: string };

/**
 * Voice slot for generated audio: "f" / "m" are the narrators, other slots are characters
 * (amma, abba, rafi, …). tools/audio/voices.json maps each slot to an actual TTS voice.
 */
export type Voice = string;

export type CharId =
  | 'you'
  | 'rafi'
  | 'amma'
  | 'abba'
  | 'dadi'
  | 'nila'
  | 'tanim'
  | 'mitu'
  | 'khala'
  | 'chacha'
  | 'dokandar'
  | 'rickshaw'
  | 'doctor'
  | 'doel';

export interface Word extends Tr {
  bn: string;
  emoji?: string;
  note?: Tr;
}

/** Gloss for an inflected form or phrase, used for tap-to-see hints and distractors. */
export interface Gloss extends Tr {
  bn: string;
}

export interface Sentence extends Tr {
  bn: string;
  v?: Voice;
}

export interface Reply extends Tr {
  bn: string;
  ok: boolean;
}

/** "Respond to Amma": a character says a line and the learner picks a fitting reply. */
export interface Chat extends Tr {
  who: CharId;
  bn: string;
  replies: Reply[];
}

export interface StoryLine extends Tr {
  who: CharId;
  bn: string;
}

export interface StoryQuestion {
  q: Tr;
  options: Tr[];
  answer: number;
}

export type StoryStep = { line: StoryLine } | { question: StoryQuestion };

export interface Story {
  title: Tr;
  steps: StoryStep[];
}

export interface Tip {
  title: Tr;
  body: Tr;
}

export interface LessonDef {
  title: Tr;
  words: Word[];
  forms?: Gloss[];
  sentences: Sentence[];
  chats?: Chat[];
}

export interface UnitDef {
  id: string;
  title: Tr;
  goal: Tr;
  lessons: LessonDef[];
  story?: Story;
  tips: Tip[];
  /** Extra glosses for forms that appear in chats/stories but aren't taught as words. */
  forms?: Gloss[];
}

export interface LevelDef {
  id: string;
  n: number;
  title: Tr;
  subtitle: Tr;
  units: UnitDef[];
}
