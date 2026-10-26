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
    f('Khala', 'Khala (aunt: Amma’s sister)', 'Khala (bibi: saudari Amma)'),
    f('Chacha', 'Chacha (uncle: Abba’s brother)', 'Chacha (paman: saudara Abba)'),
    f('Bhabi', 'Bhabi (what your husband’s younger siblings call you)', 'Bhabi (panggilan adik ipar untukmu)'),
    f('Mashallah', 'Mashallah (said when praising)', 'Masya Allah'),
  ],
  lessons: [
    {
      title: tr('I’m Rafi’s wife', 'Aku istri Rafi'),
      words: [
        w('bou', 'wife', 'istri', '👰', tr(
          'Wife is “bou” — not “istri”! In Bangla, “istri” means ironing clothes. And “bou” is not Indonesian “bau” 😄',
          'Istri dalam bahasa Bangla adalah “bou” — bukan “istri”! Dalam bahasa Bangla, “istri” artinya menyetrika. Dan “bou” bukan “bau” 😄',
        )),
        w('shami', 'husband', 'suami', '🤵', tr('“Shami” and Indonesian “suami” come from the same old word.', '“Shami” dan “suami” berasal dari kata kuno yang sama.')),
        w('nam', 'name', 'nama', '📛', tr('Like Indonesian “nama”.', 'Seperti “nama”.')),
        w('amar', 'my', 'saya, -ku (milik saya)', '🫶'),
        w('ke', 'who', 'siapa', '❓'),
      ],
      forms: [
        f('Rafir', 'Rafi’s', 'milik Rafi, -nya Rafi'),
        f('Nila', 'Nila (Rafi’s elder sister)', 'Nila (kakak perempuan Rafi)'),
        f('amar shami', 'my husband', 'suami saya'),
        f('Rafir bou', 'Rafi’s wife', 'istri Rafi'),
      ],
      sentences: [
        s('Ami Rafir bou.', "I am Rafi's wife.", 'Saya istri Rafi.|Aku istri Rafi.'),
        s('Rafi amar shami.', 'Rafi is my husband.', 'Rafi suami saya.|Rafi suamiku.'),
        s('Amar nam Rafi.', 'My name is Rafi.', 'Nama saya Rafi.', 'm'),
        s('Amar nam Nila.', 'My name is Nila.', 'Nama saya Nila.'),
        s('Ami Rafi.', 'I am Rafi.', 'Saya Rafi.', 'm'),
        s('Apni ke?', 'Who are you?', 'Anda siapa?'),
        s('Tumi ke?|Apni ke?', 'Who are you?', 'Kamu siapa?'),
      ],
      chats: [
        chat('khala', 'Assalamu alaikum. Tumi ke, ma?', 'Peace be upon you. Who are you, dear?', 'Assalamualaikum. Kamu siapa, Nak?', [
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
        w('shundor', 'beautiful', 'indah, cantik', '🌸'),
      ],
      forms: [
        f('onar', 'his, her (respectful)', 'beliau (milik beliau)'),
        f('nam ki', 'what is the name', 'siapa namanya'),
      ],
      sentences: [
        s('Apnar nam ki?', 'What is your name?', 'Siapa nama Anda?'),
        s('Tomar nam ki?|Apnar nam ki?', 'What is your name?', 'Siapa namamu?'),
        s('Uni ke?', 'Who is he?|Who is she?', 'Beliau siapa?|Dia siapa?'),
        s('Uni Rafir Amma.', "She is Rafi's mum.|She is Rafi's mother.", 'Beliau ibu Rafi.|Beliau ibunya Rafi.'),
        s('Uni Rafir Abba.', "He is Rafi's dad.|He is Rafi's father.", 'Beliau ayah Rafi.|Beliau ayahnya Rafi.'),
        s('Onar nam ki?', 'What is his name?|What is her name?', 'Siapa nama beliau?'),
        s('Tomar nam khub shundor.', 'Your name is very beautiful.', 'Namamu indah sekali.|Namamu sangat indah.'),
      ],
      chats: [
        chat('khala', 'Tomar nam ki, ma?', 'What is your name, dear?', 'Siapa namamu, Nak?', [
          ok('Amar nam {name}.', 'My name is {name}.', 'Nama saya {name}.'),
          no('Amar nam Rafi.', 'My name is Rafi.', 'Nama saya Rafi.'),
          no('Uni ke?', 'Who is she?', 'Beliau siapa?'),
        ]),
        chat('khala', 'Mashallah, tomar nam khub shundor!', 'Mashallah, your name is very beautiful!', 'Masya Allah, namamu indah sekali!', [
          ok('Dhonnobad, Khala.', 'Thank you, Khala.', 'Terima kasih, Khala.'),
          no('Onar nam ki?', 'What is her name?', 'Siapa nama beliau?'),
          no('Na, Khala.', 'No, Khala.', 'Tidak, Khala.'),
        ]),
      ],
    },
    {
      title: tr('Where are you from?', 'Dari mana asalmu?'),
      words: [
        w('kothay', 'where', 'di mana', '📍'),
        w('theke', 'from', 'dari', '↩️'),
        w('desh', 'country, homeland', 'negara, kampung halaman', '🗺️', tr(
          'Close to Indonesian “desa”, but “desh” means country or homeland.',
          'Mirip “desa”, tapi “desh” artinya negara atau kampung halaman.',
        )),
        w('Indonesia', 'Indonesia', 'Indonesia', '🇮🇩'),
        w('Bangladesh', 'Bangladesh', 'Bangladesh', '🇧🇩'),
      ],
      forms: [
        f('eshechi', 'have come (I)', '(saya) sudah datang'),
        f('eshechen', 'have come (you, respectful)', '(Anda) sudah datang'),
        f('kotha theke', 'from where', 'dari mana'),
        f('Indonesiar', 'Indonesia’s, from Indonesia', 'dari Indonesia, milik Indonesia'),
        f('meye', 'girl, daughter', 'anak perempuan, gadis'),
        f('theke eshechi', 'have come from', 'datang dari'),
        f('eshecho', 'have come (you, familiar)', '(kamu) sudah datang'),
      ],
      sentences: [
        s('Ami Indonesia theke eshechi.', 'I have come from Indonesia.|I come from Indonesia.|I am from Indonesia.', 'Saya datang dari Indonesia.|Saya dari Indonesia.'),
        s('Apni kotha theke eshechen?', 'Where have you come from?|Where are you from?', 'Anda datang dari mana?|Anda dari mana?'),
        s('Amar desh Indonesia.', 'My country is Indonesia.', 'Negara saya Indonesia.'),
        s('Rafir desh Bangladesh.', "Rafi's country is Bangladesh.", 'Negara Rafi Bangladesh.|Negara Rafi adalah Bangladesh.'),
        s('Tomar bari kothay?', 'Where is your home?|Where do you live?', 'Rumahmu di mana?'),
        s('Ami Indonesiar meye.', 'I am an Indonesian girl.|I am a girl from Indonesia.', 'Saya perempuan Indonesia.|Saya gadis Indonesia.'),
        s('Bangladesh khub shundor.', 'Bangladesh is very beautiful.', 'Bangladesh sangat indah.|Bangladesh indah sekali.'),
        s('Indonesia kothay?', 'Where is Indonesia?', 'Indonesia di mana?'),
      ],
      chats: [
        chat('chacha', 'Tomar desh kothay, ma?', 'Where is your country, dear?', 'Negaramu di mana, Nak?', [
          ok('Amar desh Indonesia, Chacha.', 'My country is Indonesia, Chacha.', 'Negara saya Indonesia, Chacha.'),
          no('Ami Rafir bou.', "I am Rafi's wife.", 'Saya istri Rafi.'),
          no('Bangladesh khub shundor.', 'Bangladesh is very beautiful.', 'Bangladesh sangat indah.'),
        ]),
        chat('khala', 'Tumi kotha theke eshecho?', 'Where have you come from?', 'Kamu datang dari mana?', [
          ok('Ami Indonesia theke eshechi, Khala.', 'I have come from Indonesia, Khala.', 'Saya datang dari Indonesia, Khala.'),
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
        s('Ami Bangla shikhchi.', 'I am learning Bangla.', 'Saya sedang belajar bahasa Bangla.|Aku sedang belajar bahasa Bangla.'),
        s('Ami ektu ektu Bangla pari.', 'I can speak a little Bangla.|I know a little Bangla.', 'Saya bisa sedikit bahasa Bangla.|Saya bisa bahasa Bangla sedikit-sedikit.'),
        s('Ami Bangla bolte pari.', 'I can speak Bangla.', 'Saya bisa berbicara bahasa Bangla.|Saya bisa bahasa Bangla.'),
        s('Apni Ingreji bolte paren?', 'Can you speak English?', 'Anda bisa berbicara bahasa Inggris?|Bisakah Anda berbicara bahasa Inggris?'),
        s('Bangla khub shundor bhasha.', 'Bangla is a very beautiful language.', 'Bangla adalah bahasa yang sangat indah.|Bahasa Bangla sangat indah.'),
        s('Tumi khub bhalo Bangla bolo!', 'You speak Bangla very well!', 'Kamu bicara bahasa Bangla dengan sangat baik!|Bahasa Bangla-mu bagus sekali!'),
        s('Ami ekhono shikhchi.', 'I am still learning.', 'Saya masih belajar.|Aku masih belajar.'),
      ],
      chats: [
        chat('khala', 'Tumi Bangla bolte paro?', 'Can you speak Bangla?', 'Kamu bisa berbicara bahasa Bangla?', [
          ok('Ji, ektu ektu pari. Ami shikhchi.', 'Yes, a little. I am learning.', 'Iya, sedikit-sedikit. Saya sedang belajar.'),
          no('Ami Indonesia theke eshechi.', 'I have come from Indonesia.', 'Saya datang dari Indonesia.'),
          no('Na, dhonnobad.', 'No, thank you.', 'Tidak, terima kasih.'),
        ]),
        chat('tanim', 'Bhabi, tumi khub bhalo Bangla bolo!', 'Bhabi, you speak Bangla very well!', 'Bhabi, bahasa Bangla-mu bagus sekali!', [
          ok('Dhonnobad! Ami ekhono shikhchi.', 'Thank you! I am still learning.', 'Terima kasih! Aku masih belajar.'),
          no('Tumi ke?', 'Who are you?', 'Kamu siapa?'),
          no('Amar desh Indonesia.', 'My country is Indonesia.', 'Negara saya Indonesia.'),
        ]),
      ],
    },
  ],
  story: {
    title: tr('Khala comes to visit', 'Khala datang berkunjung'),
    steps: [
      line('khala', 'Assalamu alaikum! Tumi ke, ma?', 'Peace be upon you! Who are you, dear?', 'Assalamualaikum! Kamu siapa, Nak?'),
      line('you', 'Walaikum assalam, Khala. Ami Rafir bou.', "And peace be upon you, Khala. I am Rafi's wife.", 'Waalaikumsalam, Khala. Saya istri Rafi.'),
      line('khala', 'Mashallah! Tomar nam ki?', 'Mashallah! What is your name?', 'Masya Allah! Siapa namamu?'),
      line('you', 'Amar nam {name}.', 'My name is {name}.', 'Nama saya {name}.'),
      ask(tr('What did Khala ask?', 'Apa yang ditanyakan Khala?'), [
        tr('Your name', 'Namamu'),
        tr('Your age', 'Umurmu'),
        tr('Your phone number', 'Nomor teleponmu'),
      ], 0),
      line('khala', 'Tomar desh kothay?', 'Where is your country?', 'Negaramu di mana?'),
      line('you', 'Amar desh Indonesia. Ami Indonesia theke eshechi.', 'My country is Indonesia. I have come from Indonesia.', 'Negara saya Indonesia. Saya datang dari Indonesia.'),
      line('khala', 'Tumi Bangla bolte paro?', 'Can you speak Bangla?', 'Kamu bisa berbicara bahasa Bangla?'),
      line('you', 'Ji, ektu ektu pari. Ami Bangla shikhchi.', 'Yes, a little. I am learning Bangla.', 'Iya, sedikit-sedikit. Saya sedang belajar bahasa Bangla.'),
      ask(tr('How much Bangla can you speak?', 'Seberapa bisa kamu berbahasa Bangla?'), [
        tr('None at all', 'Sama sekali tidak bisa'),
        tr('A little — you are learning', 'Sedikit — kamu sedang belajar'),
        tr('Perfectly', 'Sempurna'),
      ], 1),
      line('khala', 'Mashallah! Tumi khub bhalo Bangla bolo!', 'Mashallah! You speak Bangla very well!', 'Masya Allah! Bahasa Bangla-mu bagus sekali!'),
      line('you', 'Dhonnobad, Khala!', 'Thank you, Khala!', 'Terima kasih, Khala!'),
      ask(tr('What did Khala think of your Bangla?', 'Apa pendapat Khala tentang bahasa Bangla-mu?'), [
        tr('You speak it very well', 'Kamu berbicara dengan sangat baik'),
        tr('You should speak English', 'Kamu sebaiknya berbahasa Inggris'),
        tr('She did not understand you', 'Dia tidak mengerti kamu'),
      ], 0),
    ],
  },
  tips: [
    tip(tr('No “is” or “am” needed', 'Tidak perlu “adalah”'), tr(
      'Just like Indonesian, Bangla often drops “to be”: “Ami Rafi” = “Saya Rafi”, “Rafi amar shami” = “Rafi suami saya”.',
      'Sama seperti bahasa Indonesia, bahasa Bangla sering tidak memakai “adalah”: “Ami Rafi” = “Saya Rafi”, “Rafi amar shami” = “Rafi suami saya”.',
    )),
    tip(tr('The question word goes at the end', 'Kata tanya di akhir'), tr(
      '“Apnar nam ki?” is literally “Your name what?” — like casual Indonesian “Namamu siapa?”. Where: “Tomar bari kothay?” (Your home where?).',
      '“Apnar nam ki?” artinya “Nama Anda apa?” — seperti “Namamu siapa?”. Di mana: “Tomar bari kothay?” (Rumahmu di mana?).',
    )),
    tip(tr('“-r” means ’s', '“-r” artinya milik'), tr(
      'Add -r (or -er after a consonant) to show who owns something: Rafi → Rafir bou (Rafi’s wife), Indonesia → Indonesiar meye (a girl of Indonesia).',
      'Tambahkan -r (atau -er setelah konsonan) untuk menunjukkan milik: Rafi → Rafir bou (istri Rafi), Indonesia → Indonesiar meye (gadis Indonesia).',
    )),
    tip(tr('Words you already know', 'Kata yang sudah kamu tahu'), tr(
      'nam = nama, bhasha = bahasa, shami = suami. But careful: wife is “bou”, never “istri” (that means ironing!).',
      'nam = nama, bhasha = bahasa, shami = suami. Tapi hati-hati: istri adalah “bou”, jangan “istri” (artinya menyetrika!).',
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
