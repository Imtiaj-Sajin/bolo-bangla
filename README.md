# Bolo — learn to speak Bangla

A Duolingo-style course for learning **spoken Bangladeshi Bangla**, built for English and Indonesian speakers who want to talk with a Bangladeshi family.

- **Banglish only.** Bangla is always written in Latin letters, the way Bangladeshis text. The Bangla alphabet is never shown.
- **Real Bangladeshi voices** for every word and sentence, with a slow mode.
- **Learn by doing:** picture cards, word-bank translation, listening, matching pairs, fill-in-the-blank, "respond to Amma" chats, typing, speaking practice and short stories, all built around family life.
- **Three levels:** Basic, Intermediate and Advanced. Units unlock in order, each unit ends with a test (80% to pass), and each level ends with an exam.
- **Motivation:** XP, daily streak with streak freezes, gems, daily quests, treasure chests, combo counter and star grades.
- **Spaced repetition:** a half-life memory model picks words to review in the Practice tab.
- **Installable PWA:** add it to the home screen on Android and it works offline.

**Live app:** <https://imtiaj-sajin.github.io/bolo-bangla/>

On Android, open the link in Chrome, then tap **⋮ → Add to Home screen** (or **Install app**). It opens full-screen like a normal app and keeps working offline. In the app, **Profile → Download all audio** saves every voice clip for offline use.

## Course status

| Level | Units | Status |
| --- | --- | --- |
| 1 · Basic | Greet the family · About me · Say it again, please · My new family · Have you eaten? · Numbers and money · Around the house · How I feel | Done: 8 units, 33 lessons, about 410 words and sentences, every word and sentence voiced (each family member has their own voice, plus slow versions) |
| 2 · Intermediate | Daily routine, kitchen, shopping, getting around, health, past and future, phone calls | Planned |
| 3 · Advanced | Feelings and opinions, Ramadan and Eid, weddings, guests, polite refusals, telling stories | Planned |

Each unit has 4 lessons (2 rounds each), a listening session, a family chat session, a treasure chest, a story, a review and a unit test (80% to pass). Each level ends with an exam (80% to pass) that unlocks the next level.

See [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) for how to write new units.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173 (also on your local network)
npm run build      # checks content, type-checks and builds to dist/
```

## How the course is made

| Path | What it is |
| --- | --- |
| `src/content/units/*.ts` | The course: each unit has lessons (new words, sentences, chats), a story and guidebook tips |
| `src/content/course.ts` | Levels and their unit order |
| `src/engine/exercises.ts` | Builds each lesson's exercises from the content (introduce → recognise → produce → review) |
| `src/engine/srs.ts` | Memory model for reviews |
| `src/state/store.ts` | Progress, XP, streak, gems, quests (saved on the device) |
| `tools/audio/` | Audio generation (see below) |

Exercises are generated, not hand-written: writing a lesson means listing its words and sentences, and the engine turns them into about 15 varied exercises per session, with near-miss wrong answers (for example *khabo / khai / khan*) so grammar is learned from use.

### Spelling rules (Banglish)

| Sound | Write | Example |
| --- | --- | --- |
| open "o" (as in "or") and round "o" | o | kotha, bolo |
| "a" as in "father" | a | amar |
| "e", including the "æ" of "cat" | e | kemon, ekhon |
| "ch" with or without a puff of air | ch | cha, achi |
| every "sh" sound | sh | shami, bhalobashi |
| aspirated b | bh (never v) | bhalo |
| "f" / soft "ph" | f | ful |
| other aspirated consonants | kh gh th dh | khub, thik |

The typing checker accepts common texting variants (valo, asi, kamon, double letters, small typos).

### Audio

Text-to-speech engines can only read Bangla from Bangla script, so each Banglish phrase has a Bangla-script spelling in `tools/audio/bn-script.json`. That file is used **only** as input to the voice engine; the app and its content never contain Bangla script, and `npm run build` fails if any appears in `src/`, `public/` or `dist/`.

```bash
pip install edge-tts
npm run audio:make   # lists every phrase, then generates missing clips into public/audio/
```

Voices: Microsoft neural `bn-BD-NabanitaNeural` (female) and `bn-BD-PradeepNeural` (male).

## Deploy

Pushing to `main` builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`).
