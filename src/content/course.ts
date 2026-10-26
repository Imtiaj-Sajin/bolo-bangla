// The three levels. Every unit must be finished (and its test passed) before the next unlocks.
import type { LevelDef, Tr } from './types';
import { u01 } from './units/u01-salam';
import { u02 } from './units/u02-about-me';
import { u03 } from './units/u03-family';
import { u04 } from './units/u04-food';
import { u05 } from './units/u05-say-again';
import { u06 } from './units/u06-numbers';
import { u07 } from './units/u07-home';
import { u08 } from './units/u08-feelings';

export const LEVELS: LevelDef[] = [
  {
    id: 'basic',
    n: 1,
    title: { en: 'Basic', id: 'Dasar' },
    subtitle: { en: 'Everyday words to talk with the family', id: 'Kata sehari-hari untuk bicara dengan keluarga' },
    units: [u01, u02, u03, u04, u05, u06, u07, u08],
  },
];

/** Levels still being written; shown locked at the end of the path. */
export const UPCOMING: { n: number; title: Tr; subtitle: Tr }[] = [
  {
    n: 2,
    title: { en: 'Intermediate', id: 'Menengah' },
    subtitle: { en: 'Daily life, the kitchen, shopping, getting around and phone calls', id: 'Kehidupan sehari-hari, dapur, belanja, bepergian, dan telepon' },
  },
  {
    n: 3,
    title: { en: 'Advanced', id: 'Mahir' },
    subtitle: { en: 'Feelings, Eid, weddings, guests and telling your own story', id: 'Perasaan, Idul Fitri, pernikahan, tamu, dan menceritakan kisahmu' },
  },
];
