# Writing course content

How to add or change units so they match the rest of the course. Read this before starting Level 2 or 3.

## The learner

An adult who speaks Indonesian (and some English) and is joining a Bangladeshi Muslim family. Everything she learns should be something she will say or hear at home: with her husband, parents-in-law, siblings-in-law, grandparents, nieces and nephews, guests and shopkeepers.

- Teach **Bangladeshi colloquial Bangla** (Dhaka standard), not Kolkata forms: *pani* not *jol*, *gosol* not *snan*, *nai* for "isn't / haven't", *Allah hafez*, *Amma / Abba*.
- She says **apni** forms to elders and **tumi** forms to her husband, younger siblings-in-law and children. Elders say **tumi** to her and call her *bouma* (parents-in-law, aunts and uncles) or *natbou* (Dadi). Younger in-laws call her *Bhabi*.
- Characters: see `src/content/characters.ts`. Rafi is the husband; Amma, Abba, Dadi, Nila Apu, Tanim, Mitu, Khala, Chacha, plus a shopkeeper, rickshaw driver and doctor.

## Translating family words

Always translate family words into the learner's language. Never leave the Bangla word in a translation:

| Bangla | English | Indonesian |
| --- | --- | --- |
| Amma / Abba | Mom / Dad | Ibu / Ayah |
| Dadi, Nani / Dada, Nana | Grandma / Grandpa (say "Mom's side" for Nana/Nani when it matters) | Nenek / Kakek |
| Apu (address) / Nila Apu | sister / Nila | Kak / Kak Nila |
| Bhaiya / Dulabhai | brother / brother-in-law | Mas |
| Bhabi | sister-in-law | Kak |
| Khala, Chachi, Fufu / Chacha, Khalu, Mama | Auntie / Uncle | Bibi / Paman |
| Mami (Mitu calling her) | Auntie | Tante |
| bouma (in-laws calling her) | "daughter-in-law" only in the drill that teaches it; otherwise leave the address out | Nak (menantuku only in the drill) |
| natbou (Dadi calling her) | leave the address out | Cu |
| Bhabi (younger in-laws calling her) | leave the address out in chats | Kak (and "Kakak" as her pronoun) |

- "ma" means **mother**. Never gloss or translate it as "dear".
- In Indonesian, an in-law is addressed with the kinship word as the pronoun ("Ibu apa kabar?", "Ibu sudah makan?"), never "Anda". Keep "Anda" only in standalone drills that teach apni vs tumi.
- The learner says **ji** to elders and **ha** to her husband, younger in-laws and children.
- Use US spelling in English (Mom, favorite, memorize).

## Voices

Each character has its own voice slot (see `src/content/characters.ts`), mapped to a real voice in `tools/audio/voices.json`. Nabanita is the main voice and Pradeep the second; a few minor roles use multilingual voices. If a sentence in a lesson is said by someone other than the learner, give it that character's slot, for example `s('Walaikum assalam, bouma.', …, 'amma')`.

## Spelling (Banglish)

Write words the way family members text, but always consistently:

| Sound | Write | Examples |
| --- | --- | --- |
| open and round "o" | o | kotha, bolo, dhonnobad |
| "a" as in father | a | amar, bhat |
| "e", including the "æ" of *kemon* | e | kemon, ekhon, dekha |
| ch / chh | ch | cha, achi, choto |
| every "sh" sound | sh | shami, bhalobashi, shobai |
| aspirated b | bh (never v) | bhalo, bhai |
| ph | f | ful, fufu |
| other aspirates | kh gh th dh | khub, ghum, thik, dhonnobad |
| doubled consonants | keep them | Amma, Abba, accha |

- Capitalise the first word of a sentence and names, including kinship names used as names (Amma, Dadi, Apu, Bhaiya).
- Hyphens only in fixed compounds such as *bhai-bon* and *Ma-ke*.
- Never write Bengali script anywhere in `src/`, `public/` or the README. `npm run build` fails if you do.
- Use straight apostrophes in English translations (`Rafi's`), so word tiles stay whole.

## Unit shape

A unit (`src/content/units/uNN-*.ts`) has 4 lessons (5 for an extra-rich topic such as family), a story and 4–6 tips. File numbers don't have to match the unit order; the order lives in `src/content/course.ts`.

When the English or Indonesian can't show apni vs tumi (or ji vs ha, or which aunt/uncle), add the other Banglish forms as accepted alternatives (`'Tomar nam ki?|Apnar nam ki?'`), so a correct answer is never marked wrong.

Each unit has:

- **Lesson:** 4–6 new `words`, 6–8 `sentences`, 1–2 `chats`, plus `forms` (glosses for inflected words that appear but aren't taught as words).
- **Sentences** use mostly words the learner already knows, plus the lesson's new words. Each new word should appear in at least one sentence.
- **Translations:** separate alternatives with `|`. The first one is the one shown and used for word tiles; the others are also accepted. A Banglish sentence can also have alternatives (`'Tumi ke?|Apni ke?'`) when the English can't tell them apart.
- **Chats** ("Respond to Amma"): a character's line plus 2–3 replies. Mark at least one with `ok`. Wrong replies must be clearly wrong in context and never rude in a way that teaches a bad habit. `{name}` in a reply is replaced with the learner's name.
- **Story:** 10–14 dialogue lines with 3 comprehension questions, using only known language plus glossed forms.
- **Tips:** compare with Indonesian wherever possible (apni = Anda, khobor = kabar, aste aste = pelan-pelan), and include culture notes.

Every Banglish word that appears anywhere needs a gloss: either it is a taught word or it is listed in `forms`. `npm run check` lists any missing glosses.

## Audio

1. `npm run audio:list` writes `tools/audio/missing.json`, which lists phrases that have no Bengali-script spelling yet.
2. Add those phrases to `tools/audio/bn/uNN.json`. The key is the Banglish phrase in lower case without punctuation, and the value is the Bengali script. Spell words so they are pronounced the Bangladeshi way (for example *nai*, *khai nai*).
3. Run `npm run audio:make`. It needs `pip install edge-tts`. It generates only the missing clips into `public/audio/` and updates `public/audio/manifest.json`.

## Review

Content errors are what hurts most, so every unit gets a line-by-line accuracy review before it ships: Bangladeshi (not Kolkata) Bangla, natural Indonesian, and correct culture. `npm run check` also flags any word used before it is taught and any taught word that never appears in a sentence.

## Checklist before committing a unit

- `npm run check` passes with no warnings.
- `npm run build` passes.
- Every phrase has audio: `npm run audio:list` ends with "Every phrase has a Bengali-script spelling".
- Play the unit once on a phone-sized screen.
