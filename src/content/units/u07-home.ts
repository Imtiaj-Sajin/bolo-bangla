import { ask, chat, f, line, no, ok, s, tip, tr, w } from '../dsl';
import type { UnitDef } from '../types';

export const u07: UnitDef = {
  id: 'u07',
  title: tr('Around the house', 'Di sekitar rumah'),
  goal: tr(
    'Find your way around the house, ask for what you need, and say there is or isn’t something.',
    'Mengenal rumah, meminta yang kamu butuhkan, dan mengatakan ada atau tidak ada sesuatu.',
  ),
  forms: [
    f('ghum bhalo hoyeche', 'did you sleep well', 'tidurnya nyenyak'),
    f('oi je', 'over there', 'itu di sana'),
    f('darjar pashe', 'next to the door', 'di sebelah pintu'),
    f('pashe', 'next to', 'di sebelah'),
    f('ei je', 'here it is', 'ini dia'),
    f('nasta', 'breakfast, snack', 'sarapan, camilan'),
    f('kheye nao', 'eat (it) up', 'makanlah'),
    f('ashchi', 'I’m coming', 'saya datang'),
  ],
  lessons: [
    {
      title: tr('Rooms', 'Ruangan'),
      words: [
        w('ghor', 'room', 'kamar, ruangan', '🛋️'),
        w('rannaghor', 'kitchen', 'dapur', '🍲'),
        w('bathroom', 'bathroom', 'kamar mandi', '🚽'),
        w('bichana', 'bed', 'tempat tidur', '🛏️'),
        w('baranda', 'balcony, veranda', 'balkon, beranda', '🌇'),
      ],
      forms: [
        f('rannaghore', 'in the kitchen', 'di dapur'),
        f('barandaye', 'on the balcony', 'di balkon'),
        f('ghorta', 'the room', 'kamar itu'),
      ],
      sentences: [
        s('Bathroom kothay?', 'Where is the bathroom?', 'Kamar mandi di mana?'),
        s('Rannaghor kothay?', 'Where is the kitchen?', 'Dapur di mana?'),
        s('Eta amader ghor.', 'This is our room.', 'Ini kamar kami.'),
        s('Amma rannaghore achen.', 'Amma is in the kitchen.', 'Amma ada di dapur.'),
        s('Abba barandaye achen.', 'Abba is on the balcony.', 'Abba ada di balkon.'),
        s('Bichana khub boro.', 'The bed is very big.', 'Tempat tidurnya besar sekali.'),
        s('Ghorta khub shundor.', 'The room is very beautiful.|The room is very nice.', 'Kamarnya sangat indah.|Kamarnya bagus sekali.'),
      ],
      chats: [
        chat('rafi', 'Amma kothay?', 'Where is Amma?', 'Amma di mana?', [
          ok('Amma rannaghore achen.', 'Amma is in the kitchen.', 'Amma ada di dapur.'),
          no('Bathroom kothay?', 'Where is the bathroom?', 'Kamar mandi di mana?'),
          no('Bichana khub boro.', 'The bed is very big.', 'Tempat tidurnya besar sekali.'),
        ]),
      ],
    },
    {
      title: tr('Doors, windows and the fan', 'Pintu, jendela, dan kipas'),
      words: [
        w('janala', 'window', 'jendela', '🪟', tr('Like Indonesian “jendela” — both come from Portuguese.', 'Seperti “jendela” — keduanya dari bahasa Portugis.')),
        w('darja', 'door', 'pintu', '🚪'),
        w('almari', 'cupboard, wardrobe', 'lemari', '🗄️', tr('Like Indonesian “lemari”!', 'Seperti “lemari”!')),
        w('pakha', 'fan', 'kipas angin', '🌀'),
        w('light', 'light, lamp', 'lampu'),
        w('chabi', 'key', 'kunci', '🔑'),
      ],
      forms: [
        f('kholen', 'please open (respectful)', 'tolong buka (sopan)'),
        f('bondho koren', 'please close / switch off', 'tolong tutup / matikan'),
        f('bondho', 'closed, off', 'tertutup, mati'),
        f('chalan', 'please switch on (a fan)', 'tolong nyalakan (kipas)'),
        f('chalao', 'switch on (familiar)', 'nyalakan (akrab)'),
        f('chabita', 'the key', 'kunci itu'),
        f('almarite', 'in the cupboard', 'di lemari'),
        f('kapor', 'clothes, cloth', 'baju, kain'),
        f('khulbo', 'shall I open, I will open', 'boleh saya buka, saya akan buka'),
        f('gorom', 'hot', 'panas'),
        f('ekhuni', 'right now', 'sekarang juga'),
        f('chalacchi', 'I am switching it on', 'saya sedang menyalakan'),
      ],
      sentences: [
        s('Janala kholen.', 'Please open the window.|Open the window, please.', 'Tolong buka jendelanya.'),
        s('Darja bondho koren.', 'Please close the door.|Close the door, please.', 'Tolong tutup pintunya.'),
        s('Pakha chalan.', 'Please turn on the fan.|Turn on the fan, please.', 'Tolong nyalakan kipasnya.'),
        s('Light bondho koren.', 'Please turn off the light.|Turn off the light, please.', 'Tolong matikan lampunya.'),
        s('Chabita kothay?', 'Where is the key?', 'Kuncinya di mana?'),
        s('Almarite kapor ache.', 'There are clothes in the cupboard.', 'Ada baju di lemari.'),
        s('Ektu janala khulbo?', 'Shall I open the window a little?', 'Boleh saya buka jendelanya sedikit?'),
      ],
      chats: [
        chat('dadi', 'Natbou, khub gorom. Pakha chalao.', 'Granddaughter-in-law, it’s very hot. Turn on the fan.', 'Cucu menantu, panas sekali. Nyalakan kipasnya.', [
          ok('Ji, Dadi, ekhuni chalacchi.', 'Yes, Dadi, I’m turning it on right now.', 'Iya, Dadi, saya nyalakan sekarang.'),
          no('Chabita kothay?', 'Where is the key?', 'Kuncinya di mana?'),
          no('Darja bondho koren.', 'Please close the door.', 'Tolong tutup pintunya.'),
        ]),
      ],
    },
    {
      title: tr('I need…', 'Aku butuh…'),
      words: [
        w('lagbe', 'is needed (I need)', 'dibutuhkan (saya butuh)', '🙋‍♀️'),
        w('saban', 'soap', 'sabun', '🧼', tr('Like Indonesian “sabun”!', 'Seperti “sabun”!')),
        w('gamchha', 'cotton towel (gamchha)', 'handuk katun (gamchha)', '🧣', tr(
          'The thin checked cotton towel used in every Bangladeshi home.',
          'Handuk katun tipis bermotif kotak-kotak yang ada di setiap rumah Bangladesh.',
        )),
        w('balti', 'bucket', 'ember', '🪣'),
        w('current', 'electricity, power', 'listrik', '⚡'),
      ],
      forms: [
        f('chole geche', 'has gone', 'sudah pergi, sudah mati'),
        f('current chole geche', 'the power has gone out', 'listrik mati'),
        f('gorom pani', 'hot water', 'air panas'),
        f('lagbe na', 'not needed', 'tidak perlu'),
        f('bathroome', 'in the bathroom', 'di kamar mandi'),
      ],
      sentences: [
        s('Amar ekta gamchha lagbe.', 'I need a towel.', 'Saya butuh handuk.|Saya perlu handuk.'),
        s('Saban nai.', 'There is no soap.', 'Tidak ada sabun.|Sabunnya habis.'),
        s('Current chole geche!', 'The power has gone out!|There is a power cut!', 'Listriknya mati!|Mati lampu!'),
        s('Gorom pani ache?', 'Is there hot water?', 'Ada air panas?'),
        s('Ekta balti lagbe.', 'I need a bucket.', 'Saya butuh ember.'),
        s('Amar kichu lagbe na.', "I don't need anything.", 'Saya tidak butuh apa-apa.'),
        s('Bathroome pani nai.', 'There is no water in the bathroom.', 'Tidak ada air di kamar mandi.'),
      ],
      chats: [
        chat('amma', 'Ma, tomar kichu lagbe?', 'Dear, do you need anything?', 'Nak, kamu butuh sesuatu?', [
          ok('Ji, Amma, amar ekta gamchha lagbe.', 'Yes, Amma, I need a towel.', 'Iya, Amma, saya butuh handuk.'),
          ok('Na, Amma, kichu lagbe na. Dhonnobad.', 'No, Amma, I don’t need anything. Thank you.', 'Tidak, Amma, saya tidak butuh apa-apa. Terima kasih.'),
          no('Ghorta khub shundor.', 'The room is very nice.', 'Kamarnya bagus sekali.'),
        ]),
      ],
    },
    {
      title: tr('Rest and sleep', 'Istirahat dan tidur'),
      words: [
        w('ghum', 'sleep', 'tidur', '😴'),
        w('ghumabo', 'will sleep (I)', '(saya) akan tidur', '🌙'),
        w('gosol', 'bath, shower', 'mandi', '🛁'),
        w('boshen', 'please sit (respectful)', 'silakan duduk (sopan)', '🪑'),
        w('bishram', 'rest', 'istirahat', '🧘'),
      ],
      forms: [
        f('gosol korbo', 'I will take a bath', 'saya akan mandi'),
        f('korbo', 'will do (I)', '(saya) akan melakukan'),
        f('ghum pacche', 'feeling sleepy', 'mengantuk'),
        f('pacche', 'is getting, feels', 'sedang terasa'),
        f('rakhbo', 'shall I put, I will put', 'saya taruh'),
        f('klanto', 'tired', 'lelah, capek'),
      ],
      sentences: [
        s('Ami ekhon ghumabo.', "I will sleep now.|I'm going to sleep now.", 'Saya mau tidur sekarang.'),
        s('Ami gosol korbo.', 'I will take a bath.|I will take a shower.', 'Saya mau mandi.'),
        s('Ekhane boshen.', 'Please sit here.|Sit here, please.', 'Silakan duduk di sini.'),
        s('Apni ektu bishram nen.', 'Please take a little rest.|Please rest a little.', 'Silakan istirahat sebentar.'),
        s('Amar ghum pacche.', 'I am sleepy.|I feel sleepy.', 'Saya mengantuk.'),
        s('Kapor kothay rakhbo?', 'Where shall I put the clothes?', 'Bajunya saya taruh di mana?'),
      ],
      chats: [
        chat('amma', 'Klanto? Ektu bishram nao, ma.', 'Tired? Take a little rest, dear.', 'Capek? Istirahat sebentar, Nak.', [
          ok('Ji, Amma. Ami ektu ghumabo.', 'Yes, Amma. I will sleep a little.', 'Iya, Amma. Saya mau tidur sebentar.'),
          no('Saban nai.', 'There is no soap.', 'Tidak ada sabun.'),
          no('Rannaghor kothay?', 'Where is the kitchen?', 'Dapur di mana?'),
        ]),
      ],
    },
  ],
  story: {
    title: tr('First morning in the new home', 'Pagi pertama di rumah baru'),
    steps: [
      line('rafi', 'Ghum bhalo hoyeche?', 'Did you sleep well?', 'Tidurnya nyenyak?'),
      line('you', 'Ji, khub bhalo. Bathroom kothay?', 'Yes, very well. Where is the bathroom?', 'Iya, nyenyak sekali. Kamar mandi di mana?'),
      line('rafi', 'Oi je, darjar pashe.', 'Over there, next to the door.', 'Itu di sana, di sebelah pintu.'),
      ask(tr('Where is the bathroom?', 'Di mana kamar mandinya?'), [
        tr('In the kitchen', 'Di dapur'),
        tr('Next to the door', 'Di sebelah pintu'),
        tr('On the balcony', 'Di balkon'),
      ], 1),
      line('you', 'Bathroome saban nai. Ar amar ekta gamchha lagbe.', 'There is no soap in the bathroom. And I need a towel.', 'Tidak ada sabun di kamar mandi. Dan aku butuh handuk.'),
      line('rafi', 'Ei je saban ar gamchha.', 'Here are the soap and a towel.', 'Ini dia sabun dan handuknya.'),
      line('you', 'Dhonnobad! Ami gosol korbo.', 'Thank you! I will take a bath.', 'Terima kasih! Aku mau mandi.'),
      ask(tr('What did you need?', 'Apa yang kamu butuhkan?'), [
        tr('Soap and a towel', 'Sabun dan handuk'),
        tr('A bucket and a key', 'Ember dan kunci'),
        tr('Tea', 'Teh'),
      ], 0),
      line('amma', 'Ma, nasta kheye nao.', 'Dear, come and eat your breakfast.', 'Nak, ayo sarapan.'),
      line('you', 'Ji, Amma. Ashchi!', 'Yes, Amma. Coming!', 'Iya, Amma. Saya datang!'),
      ask(tr('Why does Amma call you?', 'Kenapa Amma memanggilmu?'), [
        tr('To clean the room', 'Untuk membersihkan kamar'),
        tr('To go shopping', 'Untuk berbelanja'),
        tr('For breakfast', 'Untuk sarapan'),
      ], 2),
    ],
  },
  tips: [
    tip(tr('“Lagbe” = I need', '“Lagbe” = aku butuh'), tr(
      '“Amar ekta gamchha lagbe” — literally “to me a towel will be needed”. “Kichu lagbe?” = “Do you need anything?”, “Kichu lagbe na” = “I don’t need anything”.',
      '“Amar ekta gamchha lagbe” — harfiah “bagiku sebuah handuk akan dibutuhkan”. “Kichu lagbe?” = “Butuh sesuatu?”, “Kichu lagbe na” = “Tidak butuh apa-apa”.',
    )),
    tip(tr('Ache and nai', 'Ache dan nai'), tr(
      '“Saban ache?” (Is there soap?) — “Ji, ache” (yes, there is) or “Na, nai” (no, there isn’t). Just like “Ada sabun?” — “Ada” / “Tidak ada”.',
      '“Saban ache?” (Ada sabun?) — “Ji, ache” (ada) atau “Na, nai” (tidak ada). Persis seperti “Ada sabun?” — “Ada” / “Tidak ada”.',
    )),
    tip(tr('“In” goes at the end', '“Di” ada di belakang'), tr(
      'Bangla puts “in/at” at the END of the word: rannaghor → rannaghore (in the kitchen), almari → almarite (in the cupboard), Indonesia → Indonesiay (in Indonesia).',
      'Bahasa Bangla meletakkan “di” di BELAKANG kata: rannaghor → rannaghore (di dapur), almari → almarite (di lemari), Indonesia → Indonesiay (di Indonesia).',
    )),
    tip(tr('Words you already know', 'Kata yang sudah kamu tahu'), tr(
      'janala = jendela, almari = lemari, saban = sabun, and an old word for room, kamra = kamar. Many came from Portuguese traders to both countries!',
      'janala = jendela, almari = lemari, saban = sabun, dan kata lama untuk ruangan, kamra = kamar. Banyak yang datang dari pedagang Portugis ke kedua negara!',
    )),
    tip(tr('Power cuts', 'Mati listrik'), tr(
      'In summer the electricity sometimes goes off (“load shedding”). Just say “Current chole geche!” — everyone will know. Bathrooms often have a bucket and mug, like a gayung at home.',
      'Saat musim panas listrik kadang padam (“load shedding”). Cukup bilang “Current chole geche!” — semua orang akan mengerti. Kamar mandi sering punya ember dan gayung, seperti di rumah.',
    )),
  ],
};
