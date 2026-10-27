import { ask, chat, f, line, no, ok, s, tip, tr, w } from '../dsl';
import type { UnitDef } from '../types';

export const u02: UnitDef = {
  id: 'u02',
  title: tr('About me', 'Tentang aku'),
  goal: tr(
    'Say who you are, give your name, say where you are from and that you are learning Bangla.',
    'Mengatakan siapa dirimu, menyebut nama, asalmu, dan bahwa kamu sedang belajar bahasa Bangla.',
  ),
  forms: [
    f('Khala', 'Auntie (Mom’s sister)', 'Bibi (saudari Ibu)'),
    f('Chacha', 'Uncle (Dad’s brother)', 'Paman (saudara Ayah)'),
    f('Bhabi', 'sister-in-law (what Rafi’s younger siblings call you)', 'kakak ipar (panggilan adik-adik Rafi untukmu)'),
    f('Mashallah', 'Mashallah (said when praising)', 'Masya Allah'),
  ],
  lessons: [
    {
      title: tr('I’m Rafi’s wife', 'Aku istri Rafi'),
      words: [
        w('bou', 'wife', 'istri', '👰', tr(
          'In everyday Bangla a wife is “bou”. The formal word “stri” (often said “istri”) is the same old word as Indonesian “istri”, but at home everyone says “bou”. (“Istri” also means a clothes iron — people may smile!)',
          'Dalam bahasa Bangla sehari-hari, istri adalah “bou”. Kata formal “stri” (sering diucapkan “istri”) berasal dari kata yang sama dengan “istri”, tapi di rumah semua orang bilang “bou”. (“Istri” juga berarti setrika — orang mungkin tersenyum!)',
        )),
        w('shami', 'husband', 'suami', '🤵', tr('“Shami” and Indonesian “suami” come from the same old word.', '“Shami” dan “suami” berasal dari kata kuno yang sama.')),
        w('nam', 'name', 'nama', '📛', tr('Like Indonesian “nama”.', 'Seperti “nama”.')),
        w('amar', 'my', 'saya (milik saya), -ku', '🫶'),
        w('ke', 'who', 'siapa', '❓'),
      ],
      forms: [
        f('Rafir', 'Rafi’s', 'milik Rafi'),
        f('Nila', 'Nila (Rafi’s elder sister)', 'Nila (kakak perempuan Rafi)'),
        f('amar shami', 'my husband', 'suami saya'),
        f('Rafir bou', 'Rafi’s wife', 'istri Rafi'),
      ],
      sentences: [
        s('Ami Rafir bou.', "I am Rafi's wife.", 'Saya istri Rafi.'),
        s('Rafi amar shami.', 'Rafi is my husband.', 'Rafi suami saya.|Rafi suamiku.'),
        s('Amar nam Rafi.', 'My name is Rafi.', 'Nama saya Rafi.', 'rafi'),
        s('Amar nam Nila.', 'My name is Nila.', 'Nama saya Nila.', 'nila'),
        s('Ami Rafi.', 'I am Rafi.', 'Saya Rafi.', 'rafi'),
        s('Apni ke?|Tumi ke?', 'Who are you?', 'Anda siapa?'),
        s('Tumi ke?|Apni ke?', 'Who are you?', 'Kamu siapa?'),
      ],
      chats: [
        chat('khala', 'Assalamu alaikum. Tumi ke?', 'Peace be upon you. Who are you?', 'Assalamualaikum. Kamu siapa?', [
          ok('Walaikum assalam. Ami Rafir bou.', "And peace be upon you. I am Rafi's wife.", 'Waalaikumsalam. Saya istri Rafi.'),
          no('Amar nam Rafi.', 'My name is Rafi.', 'Nama saya Rafi.'),
          no('Apni ke?', 'Who are you?', 'Anda siapa?'),
        ]),
      ],
    },
    {
      title: tr('What’s your name?', 'Siapa namamu?'),
      words: [
        w('apnar', 'your (respectful)', 'Anda (milik Anda)'),
        w('tomar', 'your (familiar)', '-mu (milikmu)'),
        w('ki', 'what', 'apa', '❔'),
        w('uni', 'he, she (respectful)', 'beliau', '🧓', tr('Like Indonesian “beliau”: the polite way to say he or she.', 'Seperti “beliau”: cara sopan menyebut dia.')),
        w('shundor', 'beautiful, nice', 'indah, bagus', '🌸'),
      ],
      forms: [
        f('onar', 'his, her (respectful)', 'milik beliau'),
        f('namta', 'the name', 'namanya'),
        f('nam ki', 'what is the name', 'siapa namanya'),
      ],
      sentences: [
        s('Apnar nam ki?|Tomar nam ki?', 'What is your name?', 'Siapa nama Anda?'),
        s('Tomar nam ki?|Apnar nam ki?', 'What is your name?', 'Siapa namamu?'),
        s('Uni ke?', 'Who is she?|Who is he?', 'Beliau siapa?|Dia siapa?'),
        s('Uni Rafir Amma.', "She is Rafi's mom.|She is Rafi's mother.", 'Beliau ibu Rafi.|Beliau ibunya Rafi.'),
        s('Uni Rafir Abba.', "He is Rafi's dad.|He is Rafi's father.", 'Beliau ayah Rafi.|Beliau ayahnya Rafi.'),
        s('Onar nam ki?', 'What is his name?|What is her name?', 'Siapa nama beliau?'),
        s('Tomar namta khub shundor.|Apnar namta khub shundor.', 'Your name is very beautiful.|Your name is very nice.', 'Namamu bagus sekali.|Namamu indah sekali.'),
      ],
      chats: [
        chat('khala', 'Tomar nam ki?', 'What is your name?', 'Siapa namamu?', [
          ok('Amar nam {name}.', 'My name is {name}.', 'Nama saya {name}.'),
          no('Amar nam Rafi.', 'My name is Rafi.', 'Nama saya Rafi.'),
          no('Uni ke?', 'Who is she?', 'Beliau siapa?'),
        ]),
        chat('khala', 'Mashallah, tomar namta khub shundor!', 'Mashallah, your name is very beautiful!', 'Masya Allah, namamu bagus sekali!', [
          ok('Dhonnobad, Khala.', 'Thank you, Auntie.', 'Terima kasih, Bibi.'),
          no('Onar nam ki?', 'What is her name?', 'Siapa nama beliau?'),
          no('Na, Khala.', 'No, Auntie.', 'Tidak, Bibi.'),
        ]),
      ],
    },
    {
      title: tr('Where are you from?', 'Dari mana asalmu?'),
      words: [
        w('kothay', 'where', 'di mana', '📍'),
        w('theke', 'from', 'dari', '↩️'),
        w('desh', 'country, homeland', 'negara, kampung halaman', '🗺️', tr(
          'Close to Indonesian “desa”, but “desh” means country or homeland. “Desher bari” is your home village — like “kampung halaman”.',
          'Mirip “desa”, tapi “desh” artinya negara atau tanah air. “Desher bari” adalah rumah di kampung — seperti “kampung halaman”.',
        )),
        w('bari', 'home, house', 'rumah', '🏠'),
        w('Indonesia', 'Indonesia', 'Indonesia', '🇮🇩'),
        w('Bangladesh', 'Bangladesh', 'Bangladesh', '🇧🇩'),
      ],
      forms: [
        f('eshechi', 'have come (I)', '(saya) sudah datang'),
        f('eshechen', 'have come (you, respectful)', '(Anda) sudah datang'),
        f('eshecho', 'have come (you, familiar)', '(kamu) sudah datang'),
        f('kotha theke', 'from where', 'dari mana'),
        f('Indonesiar', 'Indonesia’s, from Indonesia', 'dari Indonesia'),
        f('meye', 'girl, daughter', 'anak perempuan, gadis'),
        f('theke eshechi', 'have come from', 'datang dari'),
      ],
      sentences: [
        s('Ami Indonesia theke eshechi.', 'I have come from Indonesia.|I come from Indonesia.|I am from Indonesia.', 'Saya datang dari Indonesia.|Saya dari Indonesia.'),
        s('Apni kotha theke eshechen?|Tumi kotha theke eshecho?', 'Where have you come from?|Where are you from?', 'Anda datang dari mana?|Anda dari mana?'),
        s('Amar desh Indonesia.', 'My country is Indonesia.', 'Negara saya Indonesia.'),
        s('Rafir desh Bangladesh.', "Rafi's country is Bangladesh.", 'Negara Rafi Bangladesh.|Negara Rafi adalah Bangladesh.'),
        s('Tomar bari kothay?|Apnar bari kothay?', 'Where is your home?|Where are you from?', 'Rumahmu di mana?|Asalmu dari mana?'),
        s('Ami Indonesiar meye.', 'I am an Indonesian girl.|I am a girl from Indonesia.', 'Saya perempuan Indonesia.|Saya gadis Indonesia.'),
        s('Bangladesh khub shundor.', 'Bangladesh is very beautiful.', 'Bangladesh indah sekali.|Bangladesh sangat indah.'),
        s('Indonesia kothay?', 'Where is Indonesia?', 'Indonesia di mana?'),
      ],
      chats: [
        chat('chacha', 'Tomar desh kothay, bouma?', 'Where are you from?', 'Kamu dari negara mana, Nak?', [
          ok('Amar desh Indonesia, Chacha.', 'My country is Indonesia, Uncle.', 'Negara saya Indonesia, Paman.'),
          no('Ami Rafir bou.', "I am Rafi's wife.", 'Saya istri Rafi.'),
          no('Bangladesh khub shundor.', 'Bangladesh is very beautiful.', 'Bangladesh indah sekali.'),
        ]),
        chat('khala', 'Tumi kotha theke eshecho?', 'Where have you come from?', 'Kamu datang dari mana?', [
          ok('Ami Indonesia theke eshechi, Khala.', 'I have come from Indonesia, Auntie.', 'Saya datang dari Indonesia, Bi.'),
          no('Tomar bari kothay?', 'Where is your home?', 'Rumahmu di mana?'),
          no('Amar nam {name}.', 'My name is {name}.', 'Nama saya {name}.'),
        ]),
      ],
    },
    {
      title: tr('I’m learning Bangla', 'Aku belajar bahasa Bangla'),
      words: [
        w('Bangla', 'Bangla (the language)', 'bahasa Bangla', '🗣️'),
        w('bhasha', 'language', 'bahasa', '💬', tr('Same word as Indonesian “bahasa”!', 'Kata yang sama dengan “bahasa”!')),
        w('shikhchi', 'am learning', 'sedang belajar', '📖'),
        w('ektu', 'a little', 'sedikit', '🤏'),
        w('pari', 'can (I can)', '(saya) bisa', '💪'),
        w('bolte', 'to speak, to say', 'berbicara, mengatakan'),
      ],
      forms: [
        f('ektu ektu', 'a little bit', 'sedikit-sedikit'),
        f('bolte pari', 'can speak', 'bisa berbicara'),
        f('paren', 'can (you, respectful)', '(Anda) bisa'),
        f('paro', 'can (you, familiar)', '(kamu) bisa'),
        f('bolo', 'speak (you, familiar)', '(kamu) berbicara'),
        f('ekhono', 'still', 'masih'),
        f('Ingreji', 'English', 'bahasa Inggris'),
      ],
      sentences: [
        s('Ami Bangla shikhchi.|Bangla shikhchi.', 'I am learning Bangla.', 'Saya sedang belajar bahasa Bangla.|Aku sedang belajar bahasa Bangla.'),
        s('Ami ektu ektu Bangla pari.', 'I can speak a little Bangla.|I know a little Bangla.', 'Saya bisa sedikit-sedikit bahasa Bangla.|Saya bisa sedikit bahasa Bangla.'),
        s('Ami Bangla bolte pari.', 'I can speak Bangla.', 'Saya bisa berbicara bahasa Bangla.|Saya bisa bahasa Bangla.'),
        s('Apni Ingreji bolte paren?|Tumi Ingreji bolte paro?', 'Can you speak English?', 'Anda bisa berbicara bahasa Inggris?|Bisa bahasa Inggris?'),
        s('Bangla khub shundor bhasha.', 'Bangla is a very beautiful language.', 'Bahasa Bangla sangat indah.|Bangla adalah bahasa yang sangat indah.'),
        s('Tumi khub bhalo Bangla bolo!', 'You speak Bangla very well!', 'Bahasa Bangla kamu bagus sekali!|Kamu pintar berbahasa Bangla!', 'tanim'),
        s('Ami ekhono shikhchi.|Ekhono shikhchi.', 'I am still learning.', 'Saya masih belajar.|Aku masih belajar.'),
      ],
      chats: [
        chat('khala', 'Tumi Bangla bolte paro?', 'Can you speak Bangla?', 'Kamu bisa berbahasa Bangla?', [
          ok('Ji, ektu ektu pari. Ami shikhchi.', 'Yes, a little. I am learning.', 'Iya, sedikit-sedikit. Saya sedang belajar.'),
          no('Ami Indonesia theke eshechi.', 'I have come from Indonesia.', 'Saya datang dari Indonesia.'),
          no('Na, dhonnobad.', 'No, thank you.', 'Tidak, terima kasih.'),
        ]),
        chat('tanim', 'Bhabi, tumi khub bhalo Bangla bolo!', 'You speak Bangla very well!', 'Kak, bahasa Bangla Kakak bagus sekali!', [
          ok('Dhonnobad! Ami ekhono shikhchi.', 'Thank you! I am still learning.', 'Makasih! Aku masih belajar.'),
          no('Tumi ke?', 'Who are you?', 'Kamu siapa?'),
          no('Amar desh Indonesia.', 'My country is Indonesia.', 'Negara saya Indonesia.'),
        ]),
      ],
    },
  ],
  story: {
    title: tr('Auntie comes to visit', 'Bibi datang berkunjung'),
    steps: [
      line('khala', 'Assalamu alaikum! Tumi ke?', 'Peace be upon you! Who are you?', 'Assalamualaikum! Kamu siapa?'),
      line('you', 'Walaikum assalam, Khala. Ami Rafir bou.', "And peace be upon you, Auntie. I am Rafi's wife.", 'Waalaikumsalam, Bi. Saya istri Rafi.'),
      line('khala', 'Mashallah! Tomar nam ki?', 'Mashallah! What is your name?', 'Masya Allah! Siapa namamu?'),
      line('you', 'Amar nam {name}.', 'My name is {name}.', 'Nama saya {name}.'),
      ask(tr('What did Auntie ask?', 'Apa yang ditanyakan Bibi?'), [
        tr('Your name', 'Namamu'),
        tr('Your age', 'Umurmu'),
        tr('Your phone number', 'Nomor teleponmu'),
      ], 0),
      line('khala', 'Tomar desh kothay?', 'Where are you from?', 'Kamu dari negara mana?'),
      line('you', 'Amar desh Indonesia. Ami Indonesia theke eshechi.', 'My country is Indonesia. I have come from Indonesia.', 'Negara saya Indonesia. Saya datang dari Indonesia.'),
      line('khala', 'Tumi Bangla bolte paro?', 'Can you speak Bangla?', 'Kamu bisa berbahasa Bangla?'),
      line('you', 'Ji, ektu ektu pari. Ami Bangla shikhchi.', 'Yes, a little. I am learning Bangla.', 'Iya, sedikit-sedikit. Saya sedang belajar bahasa Bangla.'),
      ask(tr('How well can you speak Bangla?', 'Seberapa lancar bahasa Bangla-mu?'), [
        tr('Not at all', 'Sama sekali tidak bisa'),
        tr('A little — you are learning', 'Sedikit — kamu sedang belajar'),
        tr('Perfectly', 'Sempurna'),
      ], 1),
      line('khala', 'Mashallah! Tumi khub bhalo Bangla bolo!', 'Mashallah! You speak Bangla very well!', 'Masya Allah! Bahasa Bangla kamu bagus sekali!'),
      line('you', 'Dhonnobad, Khala!', 'Thank you, Auntie!', 'Terima kasih, Bi!'),
      ask(tr('What did Auntie think of your Bangla?', 'Apa pendapat Bibi tentang bahasa Bangla-mu?'), [
        tr('You speak it very well', 'Bahasa Bangla-mu bagus sekali'),
        tr('You should speak English', 'Kamu sebaiknya berbahasa Inggris'),
        tr('She did not understand you', 'Dia tidak mengerti kamu'),
      ], 0),
    ],
  },
  tips: [
    tip(tr('Often no “is” or “am”', 'Sering tanpa “adalah”'), tr(
      'Like Indonesian, Bangla often drops “to be”: “Ami Rafi” = “Saya Rafi”, “Rafi amar shami” = “Rafi suami saya”. But for how or where someone is, Bangla uses achi / achen / ache: “Ami bhalo achi”.',
      'Seperti bahasa Indonesia, bahasa Bangla sering tidak memakai “adalah”: “Ami Rafi” = “Saya Rafi”, “Rafi amar shami” = “Rafi suami saya”. Tapi untuk keadaan atau tempat seseorang, dipakai achi / achen / ache: “Ami bhalo achi”.',
    )),
    tip(tr('Where the question word goes', 'Letak kata tanya'), tr(
      'The question word sits where the answer will go — usually just before the verb or at the end: “Apnar nam ki?” (Your name what?), “Tomar bari kothay?” (Your home where?). Careful: names take “ki” (what), never “ke” (who) — “Tomar nam ki?”, even though Indonesian says “Siapa namamu?”.',
      'Kata tanya diletakkan di tempat jawabannya — biasanya sebelum kata kerja atau di akhir: “Apnar nam ki?” (Nama Anda apa?), “Tomar bari kothay?” (Rumahmu di mana?). Hati-hati: untuk nama pakai “ki” (apa), bukan “ke” (siapa) — “Tomar nam ki?”, walaupun bahasa Indonesia bilang “Siapa namamu?”.',
    )),
    tip(tr('“-r” means ’s', '“-r” artinya milik'), tr(
      'Add -r (or -er after a consonant) to show who something belongs to: Rafi → Rafir bou (Rafi’s wife), Indonesia → Indonesiar meye (a girl of Indonesia).',
      'Tambahkan -r (atau -er setelah konsonan) untuk menunjukkan milik: Rafi → Rafir bou (istri Rafi), Indonesia → Indonesiar meye (gadis Indonesia).',
    )),
    tip(tr('Words you already know', 'Kata yang sudah kamu tahu'), tr(
      'nam = nama, bhasha = bahasa, shami = suami — and even the formal word for wife, stri, is Indonesian istri. But at home a wife is always “bou”.',
      'nam = nama, bhasha = bahasa, shami = suami — bahkan kata formal untuk istri, stri, sama dengan “istri”. Tapi di rumah, istri selalu disebut “bou”.',
    )),
    tip(tr('Uni = beliau', 'Uni = beliau'), tr(
      'For elders say “uni” (he/she) and “onar” (his/her) — exactly like “beliau”. For people your age or younger you will hear “o” and “or”.',
      'Untuk orang tua pakai “uni” (dia) dan “onar” (miliknya) — persis seperti “beliau”. Untuk yang seumur atau lebih muda, kamu akan mendengar “o” dan “or”.',
    )),
    tip(tr('Mashallah!', 'Masya Allah!'), tr(
      'Relatives say “Mashallah” when they praise you, your cooking or your Bangla — just like “Masya Allah” at home. A smiling “Dhonnobad” is the perfect answer.',
      'Kerabat mengucapkan “Mashallah” saat memujimu, masakanmu, atau bahasa Bangla-mu — sama seperti “Masya Allah”. Jawab dengan senyum dan “Dhonnobad”.',
    )),
  ],
};
