import { ask, chat, f, line, no, ok, s, tip, tr, w } from '../dsl';
import type { UnitDef } from '../types';

export const u01: UnitDef = {
  id: 'u01',
  title: tr('Greet the family', 'Menyapa keluarga'),
  goal: tr(
    'Say salam to your in-laws, ask how everyone is, and say thank you and goodbye.',
    'Mengucap salam kepada mertua, menanyakan kabar semua orang, berterima kasih dan berpamitan.',
  ),
  lessons: [
    {
      title: tr('Salam', 'Salam'),
      words: [
        w('Assalamu alaikum', 'peace be upon you (hello)', 'assalamualaikum', '👋', tr(
          'The everyday greeting in Bangladeshi Muslim families — just like in Indonesia.',
          'Salam sehari-hari di keluarga Muslim Bangladesh — sama seperti di Indonesia.',
        )),
        w('Walaikum assalam', 'and peace be upon you (reply)', 'waalaikumsalam', '🤝'),
        w('ji', 'yes (polite)', 'iya (sopan)', '✅', tr(
          'Use “ji” with elders. It is softer and more respectful than a plain “yes”.',
          'Pakai “ji” dengan orang yang lebih tua. Lebih sopan, seperti “iya”.',
        )),
        w('Amma', 'Mum', 'Ibu', '👩', tr(
          'A new bou calls her mother-in-law “Amma”, like her own mother.',
          'Menantu memanggil ibu mertuanya “Amma”, seperti ibunya sendiri.',
        )),
        w('Abba', 'Dad', 'Ayah', '👨', tr(
          'A new bou calls her father-in-law “Abba”, like her own father.',
          'Menantu memanggil ayah mertuanya “Abba”, seperti ayahnya sendiri.',
        )),
      ],
      forms: [f('ma', 'mother; “dear” when elders call you', 'ibu; “Nak” saat orang tua memanggilmu')],
      sentences: [
        s('Assalamu alaikum, Amma.', 'Peace be upon you, Amma.|Hello, Amma.', 'Assalamualaikum, Amma.'),
        s('Assalamu alaikum, Abba.', 'Peace be upon you, Abba.|Hello, Abba.', 'Assalamualaikum, Abba.'),
        s('Walaikum assalam, ma.', 'And peace be upon you, dear.|And peace be upon you too, dear.', 'Waalaikumsalam, Nak.'),
        s('Walaikum assalam, Abba.', 'And peace be upon you, Abba.|And peace be upon you too, Abba.', 'Waalaikumsalam, Abba.'),
        s('Ji, Amma.', 'Yes, Amma.', 'Iya, Amma.|Ya, Amma.'),
        s('Ji, Abba.', 'Yes, Abba.', 'Iya, Abba.|Ya, Abba.'),
      ],
      chats: [
        chat('abba', 'Assalamu alaikum, ma.', 'Peace be upon you, dear.', 'Assalamualaikum, Nak.', [
          ok('Walaikum assalam, Abba.', 'And peace be upon you, Abba.', 'Waalaikumsalam, Abba.'),
          no('Assalamu alaikum, Amma.', 'Peace be upon you, Amma.', 'Assalamualaikum, Amma.'),
          no('Ji, Amma.', 'Yes, Amma.', 'Iya, Amma.'),
        ]),
      ],
    },
    {
      title: tr('How are you?', 'Apa kabar?'),
      words: [
        w('ami', 'I', 'saya, aku', '🙋'),
        w('apni', 'you (respectful)', 'Anda', '🫵', tr(
          '“Apni” is like “Anda”: use it with elders and your in-laws.',
          '“Apni” seperti “Anda”: dipakai untuk orang tua dan mertua.',
        )),
        w('kemon', 'how', 'bagaimana', '🤔', tr('Say it like “kæmon” — the “e” is open, as in English “cat”.', 'Ucapkan seperti “kèmon” — “e”-nya terbuka.')),
        w('bhalo', 'good, well', 'baik', '👍'),
        w('achi', 'am (with “ami”)', '“ada / sedang” (untuk ami)'),
        w('achen', 'are (with “apni”)', '“ada / sedang” (untuk apni)'),
      ],
      forms: [
        f('Alhamdulillah', 'Alhamdulillah (praise be to God)', 'Alhamdulillah'),
        f('acho', 'are (with “tumi”)', '“ada / sedang” (untuk tumi)'),
        f('kemon achen', 'how are you (respectful)', 'apa kabar (sopan)'),
        f('kemon acho', 'how are you (familiar)', 'apa kabar (akrab)'),
        f('bhalo achi', 'I am fine', 'saya baik'),
      ],
      sentences: [
        s('Apni kemon achen?', 'How are you?', 'Bagaimana kabar Anda?|Apa kabar?'),
        s('Ami bhalo achi.', 'I am fine.|I am well.|I am good.', 'Saya baik.|Aku baik.|Saya baik-baik saja.'),
        s('Alhamdulillah, bhalo achi.', 'Alhamdulillah, I am fine.|Alhamdulillah, I am well.', 'Alhamdulillah, saya baik.|Alhamdulillah, baik.'),
        s('Ji, ami bhalo achi.', 'Yes, I am fine.|Yes, I am well.', 'Iya, saya baik.|Ya, saya baik.'),
        s('Apni bhalo achen?', 'Are you well?|Are you fine?', 'Anda baik?|Apakah Anda baik?'),
        s('Amma, apni kemon achen?', 'Amma, how are you?', 'Amma, apa kabar?|Amma, bagaimana kabar Anda?'),
        s('Ami bhalo achi, apni?', 'I am fine, and you?|I am fine, you?', 'Saya baik, Anda?|Saya baik, dan Anda?'),
      ],
      chats: [
        chat('amma', 'Kemon acho, ma?', 'How are you, dear?', 'Apa kabar, Nak?', [
          ok('Alhamdulillah, bhalo achi. Apni kemon achen?', 'Alhamdulillah, I’m fine. How are you?', 'Alhamdulillah, saya baik. Apa kabar Anda?'),
          no('Walaikum assalam, Abba.', 'And peace be upon you, Abba.', 'Waalaikumsalam, Abba.'),
          no('Ji, Abba.', 'Yes, Abba.', 'Iya, Abba.'),
        ]),
      ],
    },
    {
      title: tr('Everyone at home', 'Semua orang di rumah'),
      words: [
        w('tumi', 'you (familiar)', 'kamu', undefined, tr(
          'Use “tumi” with your husband, younger brothers- and sisters-in-law, and children.',
          'Pakai “tumi” dengan suamimu, adik ipar, dan anak-anak.',
        )),
        w('shobai', 'everyone', 'semua orang', '👨‍👩‍👧‍👦'),
        w('bari', 'home, house', 'rumah', '🏠'),
        w('ache', 'is (he, she, it)', '“ada / sedang” (untuk dia)'),
        w('khub', 'very', 'sangat, sekali', '💯'),
        w('khobor', 'news', 'kabar', '📰', tr(
          '“Khobor” and Indonesian “kabar” are the same word! “Ki khobor?” = “Apa kabar?”',
          '“Khobor” dan “kabar” adalah kata yang sama! “Ki khobor?” = “Apa kabar?”',
        )),
      ],
      forms: [
        f('ki', 'what', 'apa'),
        f('ki khobor', 'what’s up? how are things?', 'apa kabar?'),
        f('barir', 'of the home', 'di rumah, (milik) rumah'),
        f('amio', 'me too, I also', 'saya juga'),
        f('Rafi', 'Rafi (your husband)', 'Rafi (suamimu)'),
      ],
      sentences: [
        s('Ki khobor?', "What's up?|How are things?|What is the news?", 'Apa kabar?|Ada kabar apa?'),
        s('Barir shobai kemon ache?', 'How is everyone at home?', 'Bagaimana kabar semua orang di rumah?|Apa kabar keluarga di rumah?'),
        s('Shobai bhalo ache.', 'Everyone is fine.|Everyone is well.', 'Semuanya baik.|Semua baik-baik saja.'),
        s('Ami khub bhalo achi.', 'I am very well.|I am very good.', 'Saya baik sekali.|Saya sangat baik.'),
        s('Rafi, tumi kemon acho?', 'Rafi, how are you?', 'Rafi, kamu apa kabar?|Rafi, apa kabarmu?'),
        s('Amio bhalo achi.', 'I am fine too.|I am also fine.|I am well too.', 'Saya juga baik.|Aku juga baik.'),
        s('Abba kemon achen?', 'How is Abba?', 'Bagaimana kabar Abba?|Abba apa kabar?'),
        s('Amma bhalo achen.', 'Amma is well.|Amma is fine.', 'Amma baik.|Amma baik-baik saja.'),
      ],
      chats: [
        chat('rafi', 'Ki khobor? Kemon acho?', 'What’s up? How are you?', 'Apa kabar? Gimana kabarmu?', [
          ok('Bhalo achi. Tumi kemon acho?', 'I’m fine. How are you?', 'Aku baik. Kamu apa kabar?'),
          no('Abba bhalo achen.', 'Abba is well.', 'Abba baik.'),
          no('Ji, Amma.', 'Yes, Amma.', 'Iya, Amma.'),
        ]),
        chat('amma', 'Barir shobai kemon ache?', 'How is everyone at home?', 'Bagaimana kabar keluarga di rumah?', [
          ok('Alhamdulillah, shobai bhalo ache.', 'Alhamdulillah, everyone is fine.', 'Alhamdulillah, semuanya baik.'),
          no('Walaikum assalam, Amma.', 'And peace be upon you, Amma.', 'Waalaikumsalam, Amma.'),
          no('Rafi, tumi kemon acho?', 'Rafi, how are you?', 'Rafi, kamu apa kabar?'),
        ]),
      ],
    },
    {
      title: tr('Thanks and goodbye', 'Terima kasih dan sampai jumpa'),
      words: [
        w('dhonnobad', 'thank you', 'terima kasih', '🙏'),
        w('na', 'no', 'tidak', '❌'),
        w('thik ache', 'okay', 'oke, baik', '👌'),
        w('accha', 'alright, I see', 'baiklah, oh begitu', '💡'),
        w('Allah hafez', 'goodbye', 'sampai jumpa', '🚶‍♀️', tr(
          'Bangladeshi Muslims say “Allah hafez” (may God protect you) when leaving. You may also hear “Khoda hafez”.',
          'Muslim Bangladesh mengucapkan “Allah hafez” (semoga Allah melindungimu) saat berpisah. Kamu juga bisa mendengar “Khoda hafez”.',
        )),
        w('abar', 'again', 'lagi', '🔁'),
      ],
      forms: [
        f('dekha', 'seeing, meeting', 'bertemu, melihat'),
        f('hobe', 'will be, will happen', 'akan terjadi'),
        f('dekha hobe', 'we will meet', 'kita akan bertemu'),
        f('thik', 'right, correct', 'benar, tepat'),
      ],
      sentences: [
        s('Na, dhonnobad.', 'No, thank you.|No, thanks.', 'Tidak, terima kasih.|Nggak, makasih.'),
        s('Ji, dhonnobad.', 'Yes, thank you.|Yes, thanks.', 'Iya, terima kasih.|Ya, terima kasih.'),
        s('Dhonnobad, Abba.', 'Thank you, Abba.|Thanks, Abba.', 'Terima kasih, Abba.'),
        s('Thik ache, Amma.', 'Okay, Amma.|All right, Amma.', 'Baik, Amma.|Oke, Amma.'),
        s('Accha, dhonnobad.', 'Alright, thank you.|I see, thank you.|OK, thank you.', 'Baiklah, terima kasih.|Oh begitu, terima kasih.'),
        s('Allah hafez, Abba.', 'Goodbye, Abba.', 'Sampai jumpa, Abba.|Selamat tinggal, Abba.'),
        s('Abar dekha hobe.', 'See you again.|We will meet again.', 'Sampai jumpa lagi.|Kita akan bertemu lagi.'),
        s('Allah hafez, abar dekha hobe.', 'Goodbye, see you again.', 'Selamat tinggal, sampai jumpa lagi.'),
      ],
      chats: [
        chat('abba', 'Thik ache, ma. Allah hafez.', 'Okay, dear. Goodbye.', 'Baik, Nak. Sampai jumpa.', [
          ok('Allah hafez, Abba. Abar dekha hobe.', 'Goodbye, Abba. See you again.', 'Sampai jumpa, Abba. Kita bertemu lagi nanti.'),
          no('Ami khub bhalo achi.', 'I am very well.', 'Saya baik sekali.'),
          no('Ki khobor?', 'What’s up?', 'Apa kabar?'),
        ]),
        chat('amma', 'Accha, ma. Abar dekha hobe.', 'Alright, dear. See you again.', 'Baiklah, Nak. Sampai jumpa lagi.', [
          ok('Ji, Amma. Allah hafez.', 'Yes, Amma. Goodbye.', 'Iya, Amma. Sampai jumpa.'),
          no('Na, dhonnobad.', 'No, thank you.', 'Tidak, terima kasih.'),
          no('Barir shobai kemon ache?', 'How is everyone at home?', 'Bagaimana kabar keluarga di rumah?'),
        ]),
      ],
    },
  ],
  story: {
    title: tr('Meeting Amma and Abba', 'Bertemu Amma dan Abba'),
    steps: [
      line('you', 'Assalamu alaikum, Amma.', 'Peace be upon you, Amma.', 'Assalamualaikum, Amma.'),
      line('amma', 'Walaikum assalam, ma! Kemon acho?', 'And peace be upon you, dear! How are you?', 'Waalaikumsalam, Nak! Apa kabar?'),
      line('you', 'Alhamdulillah, bhalo achi. Apni kemon achen?', 'Alhamdulillah, I’m fine. How are you?', 'Alhamdulillah, saya baik. Apa kabar Anda?'),
      line('amma', 'Amio bhalo achi. Barir shobai kemon ache?', 'I’m fine too. How is everyone at home?', 'Saya juga baik. Bagaimana kabar keluarga di rumah?'),
      line('you', 'Shobai bhalo ache, Amma.', 'Everyone is fine, Amma.', 'Semuanya baik, Amma.'),
      ask(tr('How is your family at home?', 'Bagaimana kabar keluargamu di rumah?'), [
        tr('Everyone is fine', 'Semuanya baik'),
        tr('Everyone is tired', 'Semuanya lelah'),
        tr('Nobody is at home', 'Tidak ada orang di rumah'),
      ], 0),
      line('abba', 'Assalamu alaikum, ma. Ki khobor?', 'Peace be upon you, dear. How are things?', 'Assalamualaikum, Nak. Apa kabar?'),
      line('you', 'Walaikum assalam, Abba. Ji, khub bhalo achi.', 'And peace be upon you, Abba. Yes, I’m very well.', 'Waalaikumsalam, Abba. Iya, saya baik sekali.'),
      ask(tr('What does “Ki khobor?” mean?', 'Apa arti “Ki khobor?”'), [
        tr('Thank you', 'Terima kasih'),
        tr('How are things?', 'Apa kabar?'),
        tr('Goodbye', 'Sampai jumpa'),
      ], 1),
      line('abba', 'Accha. Thik ache, ma. Allah hafez.', 'Alright. Okay, dear. Goodbye.', 'Baiklah. Baik, Nak. Sampai jumpa.'),
      line('you', 'Allah hafez, Abba. Abar dekha hobe.', 'Goodbye, Abba. See you again.', 'Sampai jumpa, Abba. Kita bertemu lagi nanti.'),
      ask(tr('What did you say to Abba at the end?', 'Apa yang kamu katakan kepada Abba di akhir?'), [
        tr('How are you?', 'Apa kabar?'),
        tr('No, thank you', 'Tidak, terima kasih'),
        tr('Goodbye, see you again', 'Sampai jumpa, kita bertemu lagi'),
      ], 2),
    ],
  },
  tips: [
    tip(tr('Apni = Anda, tumi = kamu', 'Apni = Anda, tumi = kamu'), tr(
      'Bangla has a polite and a familiar “you”, just like Indonesian. Say apni to your parents-in-law and anyone older. Use tumi with your husband, younger siblings-in-law and children. Elders will often call you tumi — that is warm, not rude.',
      'Bahasa Bangla punya “kamu” yang sopan dan yang akrab, persis seperti bahasa Indonesia. Pakai apni untuk mertua dan orang yang lebih tua. Pakai tumi dengan suami, adik ipar, dan anak-anak. Orang tua sering memanggilmu tumi — itu tanda akrab, bukan tidak sopan.',
    )),
    tip(tr('Say salam first', 'Ucapkan salam lebih dulu'), tr(
      'The younger person greets first: “Assalamu alaikum”. Elders answer “Walaikum assalam”. Exactly like in Indonesia — greet each elder in the room.',
      'Yang lebih muda menyapa lebih dulu: “Assalamu alaikum”. Yang lebih tua menjawab “Walaikum assalam”. Sama seperti di Indonesia — sapa setiap orang tua yang ada di ruangan.',
    )),
    tip(tr('“Ji” is the magic word', '“Ji” adalah kata ajaib'), tr(
      'Answer elders with “ji” (yes). It sounds respectful and kind. Even “Ji, Amma” alone makes a lovely impression.',
      'Jawab orang tua dengan “ji” (iya). Terdengar sopan dan manis. “Ji, Amma” saja sudah memberi kesan yang baik.',
    )),
    tip(tr('Achen for elders — even when you talk about them', 'Achen untuk orang tua — bahkan saat membicarakan mereka'), tr(
      'Use the polite ending for elders even when they are not in the room: “Abba kemon achen?” (How is Abba?). For others: “Shobai kemon ache?”',
      'Pakai akhiran sopan untuk orang tua walaupun mereka tidak ada di ruangan: “Abba kemon achen?” (Bagaimana kabar Abba?). Untuk yang lain: “Shobai kemon ache?”',
    )),
    tip(tr('Khobor = kabar', 'Khobor = kabar'), tr(
      'You already know this one! Bangla “khobor” and Indonesian “kabar” both come from Arabic “khabar” (news). So “Ki khobor?” is just “Apa kabar?”',
      'Kamu sudah tahu kata ini! “Khobor” dalam bahasa Bangla dan “kabar” dalam bahasa Indonesia sama-sama berasal dari bahasa Arab “khabar”. Jadi “Ki khobor?” sama dengan “Apa kabar?”',
    )),
  ],
};
