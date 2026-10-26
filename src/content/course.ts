// The three levels. Every unit must be finished (and its test passed) before the next unlocks.
import type { LevelDef } from './types';
import { u01 } from './units/u01-salam';
import { u02 } from './units/u02-about-me';
import { u03 } from './units/u03-family';
import { u04 } from './units/u04-food';
import { u05 } from './units/u05-say-again';

export const LEVELS: LevelDef[] = [
  {
    id: 'basic',
    n: 1,
    title: { en: 'Basic', id: 'Dasar' },
    subtitle: { en: 'Everyday words to talk with the family', id: 'Kata sehari-hari untuk bicara dengan keluarga' },
    units: [u01, u02, u03, u04, u05],
  },
];
