import { ask, chat, f, line, no, ok, s, tip, tr, w } from '../dsl';
import type { UnitDef } from '../types';

// Translation rule for the whole course: family words are translated into the learner's language
// (Amma → Mom / Ibu, Abba → Dad / Ayah …). In Indonesian, in-laws are addressed with the kinship
// word as the pronoun ("Ibu apa kabar?"), never "Anda".

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
        w('ji', 'yes (polite, to elders)', 'iya (sopan, kepada orang tua)', '✅', tr(
          'Use “ji” with elders. It is softer and more respectful than a plain “yes”.',
          'Pakai “ji” dengan orang yang lebih tua. Lebih sopan daripada “ya” biasa.',
        )),
        w('Amma', 'Mom', 'Ibu', '👩', tr(
          'You call your mother-in-law “Amma”, just like your husband does.',
          'Kamu memanggil ibu mertuamu “Amma”, sama seperti suamimu.',
        )),
        w('Abba', 'Dad', 'Ayah', '👨', tr(
          'You call your father-in-law “Abba”, just like your husband does.',
          'Kamu memanggil ayah mertuamu “Abba”, sama seperti suamimu.',
        )),
      ],
      forms: [
        f('bouma', 'daughter-in-law (what your in-laws call you)', 'menantu (panggilan mertua untukmu)'),
        f('ma', 'mother', 'ibu'),
      ],
      sentences: [
        s('Assalamu alaikum, Amma.', 'Peace be upon you, Mom.|Hello, Mom.', 'Assalamualaikum, Ibu.|Assalamualaikum, Bu.'),
        s('Assalamu alaikum, Abba.', 'Peace be upon you, Dad.|Hello, Dad.', 'Assalamualaikum, Ayah.|Assalamualaikum, Yah.'),
        s('Walaikum assalam, bouma.', 'And peace be upon you, daughter-in-law.|And peace be upon you.', 'Waalaikumsalam, menantuku.|Waalaikumsalam, Nak.', 'amma'),
        s('Walaikum assalam, Abba.', 'And peace be upon you, Dad.|And peace be upon you too, Dad.', 'Waalaikumsalam, Ayah.'),
        s('Ji, Amma.', 'Yes, Mom.', 'Iya, Ibu.|Iya, Bu.'),
        s('Ji, Abba.', 'Yes, Dad.', 'Iya, Ayah.|Iya, Yah.'),
      ],
      chats: [
        chat('abba', 'Assalamu alaikum, bouma.', 'Peace be upon you.', 'Assalamualaikum, Nak.', [
          ok('Walaikum assalam, Abba.', 'And peace be upon you, Dad.', 'Waalaikumsalam, Ayah.'),
          no('Assalamu alaikum, Amma.', 'Peace be upon you, Mom.', 'Assalamualaikum, Ibu.'),
          no('Ji, Amma.', 'Yes, Mom.', 'Iya, Bu.'),
        ]),
      ],
    },
    {
      title: tr('How are you?', 'Apa kabar?'),
      words: [
        w('ami', 'I', 'saya, aku', '🙋'),
        w('apni', 'you (respectful)', 'Anda (sopan)', '🫵', tr(
          '“Apni” is the polite “you”, like “Anda”. Use it with elders and your in-laws.',
          '“Apni” adalah “kamu” yang sopan, seperti “Anda”. Pakai untuk orang tua dan mertua.',
        )),
        w('kemon', 'how', 'bagaimana', '🤔', tr('Say it like “kæmon” — the “e” is open, as in English “cat”.', 'Ucapkan seperti “kèmon” — “e”-nya terbuka.')),
        w('bhalo', 'good, well', 'baik', '👍'),
        w('achi', 'am (used with ami)', 'kata “ada/sedang” untuk ami (saya)'),
        w('achen', 'are (with apni); is (for a respected person)', 'kata “ada/sedang” untuk apni dan orang yang dihormati'),
      ],
      forms: [
        f('Alhamdulillah', 'Alhamdulillah (praise be to God)', 'Alhamdulillah'),
        f('acho', 'are (with tumi)', 'kata “ada/sedang” untuk tumi (kamu)'),
        f('kemon achen', 'how are you (respectful)', 'apa kabar (sopan)'),
        f('kemon acho', 'how are you (familiar)', 'apa kabar (akrab)'),
        f('bhalo achi', 'I am fine', 'saya baik'),
      ],
      sentences: [
        s('Apni kemon achen?|Kemon achen?', 'How are you?', 'Bagaimana kabar Anda?|Apa kabar?'),
        s('Ami bhalo achi.|Bhalo achi.', "I am fine.|I am well.|I am good.|I'm fine.", 'Saya baik.|Aku baik.|Saya baik-baik saja.'),
        s('Alhamdulillah, bhalo achi.', 'Alhamdulillah, I am fine.|Alhamdulillah, I am well.', 'Alhamdulillah, saya baik.|Alhamdulillah, baik.'),
        s('Ji, ami bhalo achi.|Ji, bhalo achi.|Ha, ami bhalo achi.|Ha, bhalo achi.', 'Yes, I am fine.|Yes, I am well.', 'Iya, saya baik.'),
        s('Apni bhalo achen?|Tumi bhalo acho?', 'Are you well?|Are you fine?', 'Anda baik-baik saja?|Apakah Anda baik?'),
        s('Amma, apni kemon achen?', 'Mom, how are you?', 'Ibu apa kabar?|Bu, apa kabar?'),
        s('Ami bhalo achi, apni?', 'I am fine, and you?|I am fine, you?', 'Saya baik, Anda bagaimana?|Saya baik, bagaimana dengan Anda?'),
      ],
      chats: [
        chat('amma', 'Kemon acho, bouma?', 'How are you?', 'Apa kabar, Nak?', [
          ok('Alhamdulillah, bhalo achi. Apni kemon achen?', 'Alhamdulillah, I’m fine. How are you?', 'Alhamdulillah, saya baik. Ibu apa kabar?'),
          no('Walaikum assalam, Abba.', 'And peace be upon you, Dad.', 'Waalaikumsalam, Ayah.'),
          no('Ji, Abba.', 'Yes, Dad.', 'Iya, Ayah.'),
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
        w('ha', 'yes (familiar)', 'iya (akrab)', '🙂', tr(
          'Say “ji” to elders. To Rafi, younger in-laws and children, just say “ha”.',
          'Katakan “ji” kepada orang tua. Kepada Rafi, adik ipar, dan anak-anak cukup “ha”.',
        )),
        w('shobai', 'everyone', 'semua orang', '👨‍👩‍👧‍👦'),
        w('ache', 'is; there is', 'ada'),
        w('khub', 'very', 'sangat, sekali', '💯'),
        w('khobor', 'news', 'kabar', '📰', tr(
          '“Khobor” and Indonesian “kabar” are the same word! “Ki khobor?” is casual — use it with Rafi, Tanim or friends; to elders say “Kemon achen?”.',
          '“Khobor” dan “kabar” adalah kata yang sama! “Ki khobor?” itu santai — pakai dengan Rafi, Tanim atau teman; kepada orang tua katakan “Kemon achen?”.',
        )),
      ],
      forms: [
        f('ki', 'what', 'apa'),
        f('ki khobor', 'what’s up? how are things?', 'apa kabar?'),
        f('barir', 'of the home', '(di) rumah'),
        f('amio', 'me too, I also', 'saya juga'),
        f('Rafi', 'Rafi (your husband)', 'Rafi (suamimu)'),
      ],
      sentences: [
        s('Ki khobor?', "What's up?|How are things?", 'Apa kabar?|Ada kabar apa?'),
        s('Barir shobai kemon ache?', 'How is everyone at home?', 'Bagaimana kabar keluarga di rumah?|Apa kabar semua orang di rumah?'),
        s('Shobai bhalo ache.', 'Everyone is fine.|Everyone is well.', 'Semuanya baik.|Semua baik-baik saja.'),
        s('Ami khub bhalo achi.|Khub bhalo achi.', 'I am very well.|I am very good.', 'Saya baik sekali.|Saya sangat baik.'),
        s('Rafi, tumi kemon acho?', 'Rafi, how are you?', 'Rafi, kamu apa kabar?|Rafi, apa kabarmu?'),
        s('Amio bhalo achi.|Ha, amio bhalo achi.|Ji, amio bhalo achi.', "I'm fine too.|I am fine too.|I am also fine.", 'Aku juga baik.|Saya juga baik.'),
        s('Abba kemon achen?', 'How is Dad?', 'Bagaimana kabar Ayah?|Ayah apa kabar?'),
        s('Amma bhalo achen.', 'Mom is well.|Mom is fine.', 'Ibu baik-baik saja.|Ibu baik.'),
      ],
      chats: [
        chat('rafi', 'Ki khobor? Kemon acho?', 'What’s up? How are you?', 'Apa kabar? Gimana kabarmu?', [
          ok('Bhalo achi. Tumi kemon acho?', 'I’m fine. How are you?', 'Aku baik. Kamu apa kabar?'),
          no('Abba bhalo achen.', 'Dad is well.', 'Ayah baik-baik saja.'),
          no('Ji, Amma.', 'Yes, Mom.', 'Iya, Bu.'),
        ]),
        chat('amma', 'Barir shobai kemon ache?', 'How is everyone at home?', 'Bagaimana kabar keluarga di rumah?', [
          ok('Alhamdulillah, shobai bhalo ache.', 'Alhamdulillah, everyone is fine.', 'Alhamdulillah, semuanya baik.'),
          no('Walaikum assalam, Amma.', 'And peace be upon you, Mom.', 'Waalaikumsalam, Ibu.'),
          no('Rafi, tumi kemon acho?', 'Rafi, how are you?', 'Rafi, kamu apa kabar?'),
        ]),
      ],
    },
    {
      title: tr('Thanks and goodbye', 'Terima kasih dan pamit'),
      words: [
        w('dhonnobad', 'thank you', 'terima kasih', '🙏', tr(
          'Always polite. At home many people simply say “thank you” in English, and religious families often say “JazakAllah khair”.',
          'Selalu sopan. Di rumah banyak orang cukup bilang “thank you”, dan keluarga yang religius sering bilang “JazakAllah khair”.',
        )),
        w('na', 'no', 'tidak', '❌'),
        w('thik ache', 'okay', 'oke, baik', '👌'),
        w('accha', 'alright, I see', 'baiklah, oh begitu', '💡'),
        w('ashi', 'I’m off (said when leaving)', 'pamit dulu (saat pergi)', '🚪', tr(
          'When leaving, Bangladeshis say “ashi” (literally “I’ll come”) — never “jai” (I go), which sounds like you won’t come back.',
          'Saat pergi, orang Bangladesh bilang “ashi” (harfiah “aku akan datang”) — jangan “jai” (aku pergi), karena terdengar seperti tidak akan kembali.',
        )),
        w('Allah hafez', 'goodbye', 'sampai jumpa', '🚶‍♀️', tr(
          'Literally “may God protect you”. You may also hear “Khoda hafez”.',
          'Harfiah “semoga Allah melindungimu”. Kamu juga bisa mendengar “Khoda hafez”.',
        )),
      ],
      forms: [
        f('abar', 'again', 'lagi'),
        f('dekha', 'seeing, meeting', 'bertemu'),
        f('hobe', 'will be, will happen', 'akan terjadi'),
        f('dekha hobe', 'we will meet', 'kita akan bertemu'),
        f('abar dekha hobe', 'see you again', 'sampai ketemu lagi'),
        f('thik', 'right, correct', 'benar, tepat'),
      ],
      sentences: [
        s('Na, dhonnobad.', 'No, thank you.|No, thanks.', 'Tidak, terima kasih.|Nggak, makasih.'),
        s('Ji, dhonnobad.|Ha, dhonnobad.', 'Yes, thank you.|Yes, thanks.', 'Iya, terima kasih.'),
        s('Dhonnobad, Abba.', 'Thank you, Dad.|Thanks, Dad.', 'Terima kasih, Ayah.'),
        s('Thik ache, Amma.', 'Okay, Mom.|All right, Mom.', 'Baik, Ibu.|Baik, Bu.'),
        s('Accha, dhonnobad.', 'Alright, thank you.|I see, thank you.|OK, thank you.', 'Baiklah, terima kasih.|Oh begitu, terima kasih.'),
        s('Amma, ashi. Allah hafez.', "Mom, I'm off. Goodbye.|Mom, I'm leaving. Goodbye.", 'Ibu, saya pamit dulu. Sampai jumpa.|Bu, saya pamit. Sampai jumpa.'),
        s('Abar dekha hobe.', 'See you again.|We will meet again.', 'Sampai ketemu lagi.|Kita akan bertemu lagi.'),
        s('Allah hafez, Abba.', 'Goodbye, Dad.', 'Sampai jumpa, Ayah.'),
      ],
      chats: [
        chat('abba', 'Thik ache, bouma. Allah hafez.', 'Okay. Goodbye.', 'Baik, Nak. Sampai jumpa.', [
          ok('Allah hafez, Abba. Abar dekha hobe.', 'Goodbye, Dad. See you again.', 'Sampai jumpa, Ayah. Sampai ketemu lagi.'),
          no('Ami khub bhalo achi.', 'I am very well.', 'Saya baik sekali.'),
          no('Ki khobor?', 'What’s up?', 'Apa kabar?'),
        ]),
        chat('amma', 'Accha, bouma. Abar dekha hobe.', 'Alright. See you again.', 'Baiklah, Nak. Sampai ketemu lagi.', [
          ok('Ji, Amma. Ashi. Allah hafez.', 'Yes, Mom. I’m off. Goodbye.', 'Iya, Bu. Saya pamit. Sampai jumpa.'),
          no('Na, dhonnobad.', 'No, thank you.', 'Tidak, terima kasih.'),
          no('Barir shobai kemon ache?', 'How is everyone at home?', 'Bagaimana kabar keluarga di rumah?'),
        ]),
      ],
    },
  ],
  story: {
    title: tr('Meeting your in-laws', 'Bertemu mertua'),
    steps: [
      line('you', 'Assalamu alaikum, Amma.', 'Peace be upon you, Mom.', 'Assalamualaikum, Ibu.'),
      line('amma', 'Walaikum assalam, bouma! Kemon acho?', 'And peace be upon you! How are you?', 'Waalaikumsalam, Nak! Apa kabar?'),
      line('you', 'Alhamdulillah, bhalo achi. Apni kemon achen?', 'Alhamdulillah, I’m fine. How are you?', 'Alhamdulillah, saya baik. Ibu apa kabar?'),
      line('amma', 'Amio bhalo achi. Barir shobai kemon ache?', 'I’m fine too. How is everyone at home?', 'Ibu juga baik. Bagaimana kabar keluarga di rumah?'),
      line('you', 'Shobai bhalo ache, Amma.', 'Everyone is fine, Mom.', 'Semuanya baik, Bu.'),
      ask(tr('How is your family at home?', 'Bagaimana kabar keluargamu di rumah?'), [
        tr('Everyone is fine', 'Semuanya baik'),
        tr('Everyone is tired', 'Semuanya lelah'),
        tr('Nobody is at home', 'Tidak ada orang di rumah'),
      ], 0),
      line('abba', 'Assalamu alaikum, bouma. Ki khobor?', 'Peace be upon you. How are things?', 'Assalamualaikum, Nak. Apa kabar?'),
      line('you', 'Walaikum assalam, Abba. Alhamdulillah, bhalo achi. Apni kemon achen?', 'And peace be upon you, Dad. Alhamdulillah, I’m fine. How are you?', 'Waalaikumsalam, Ayah. Alhamdulillah, saya baik. Ayah apa kabar?'),
      ask(tr('What does “Ki khobor?” mean?', 'Apa arti “Ki khobor?”'), [
        tr('Thank you', 'Terima kasih'),
        tr('How are things?', 'Apa kabar?'),
        tr('Goodbye', 'Sampai jumpa'),
      ], 1),
      line('abba', 'Alhamdulillah. Thik ache, ashi. Allah hafez.', 'Alhamdulillah. Okay, I’m off. Goodbye.', 'Alhamdulillah. Baik, Ayah pamit dulu. Sampai jumpa.'),
      line('you', 'Allah hafez, Abba. Abar dekha hobe.', 'Goodbye, Dad. See you again.', 'Sampai jumpa, Ayah. Sampai ketemu lagi.'),
      ask(tr('What does Abba say when he leaves?', 'Apa yang dikatakan Abba saat pergi?'), [
        tr('Ashi — I’m off', 'Ashi — pamit dulu'),
        tr('Na — no', 'Na — tidak'),
        tr('Ji — yes', 'Ji — iya'),
      ], 0),
    ],
  },
  tips: [
    tip(tr('Apni = Anda, tumi = kamu', 'Apni = Anda, tumi = kamu'), tr(
      'Bangla has two words for “you”: polite apni (like Anda) and familiar tumi (like kamu). Say apni to your parents-in-law and anyone older; tumi to your husband, younger siblings-in-law and children. Elders will call you tumi — that is warm, not rude. You will also hear tui between siblings and to small children; don’t use it yourself.',
      'Bahasa Bangla punya dua kata untuk “kamu”: apni yang sopan (seperti Anda) dan tumi yang akrab (seperti kamu). Pakai apni untuk mertua dan orang yang lebih tua; tumi untuk suami, adik ipar, dan anak-anak. Orang tua akan memanggilmu tumi — itu tanda akrab, bukan tidak sopan. Kamu juga akan mendengar tui di antara saudara dan kepada anak kecil; jangan kamu pakai sendiri.',
    )),
    tip(tr('Say salam', 'Ucapkan salam'), tr(
      'The younger person usually greets first: “Assalamu alaikum”. Elders often greet you first too — then just answer “Walaikum assalam”. Greet every elder in the room, exactly like at home in Indonesia.',
      'Biasanya yang lebih muda menyapa lebih dulu: “Assalamu alaikum”. Orang tua juga sering menyapamu lebih dulu — jawab saja “Walaikum assalam”. Sapa setiap orang tua di ruangan, sama seperti di Indonesia.',
    )),
    tip(tr('Ji for elders, ha for family your age', 'Ji untuk orang tua, ha untuk yang sebaya'), tr(
      'Answer elders with “ji” (yes) — it sounds respectful and kind; even “Ji, Amma” alone makes a lovely impression. With Rafi, younger in-laws and children, “ha” is the natural yes.',
      'Jawab orang tua dengan “ji” (iya) — terdengar sopan dan manis; “Ji, Amma” saja sudah memberi kesan baik. Dengan Rafi, adik ipar, dan anak-anak, “ha” adalah jawaban “iya” yang wajar.',
    )),
    tip(tr('Amma and Abba', 'Amma dan Abba'), tr(
      'Call your parents-in-law what Rafi calls them. Many families say Amma and Abba; some say Ammu and Abbu, or Ma and Baba — just copy Rafi. Even when you talk ABOUT elders, use the polite ending: “Abba kemon achen?” (How is Dad?).',
      'Panggil mertuamu seperti Rafi memanggil mereka. Banyak keluarga memakai Amma dan Abba; ada yang Ammu dan Abbu, atau Ma dan Baba — tiru saja Rafi. Saat membicarakan orang tua pun pakai akhiran sopan: “Abba kemon achen?” (Bagaimana kabar Ayah?).',
    )),
    tip(tr('Khobor = kabar', 'Khobor = kabar'), tr(
      'You already know this one! Bangla “khobor” and Indonesian “kabar” both come from Arabic “khabar” (news). “Ki khobor?” is casual — great with Rafi, Tanim and friends.',
      'Kamu sudah tahu kata ini! “Khobor” dan “kabar” sama-sama berasal dari bahasa Arab “khabar”. “Ki khobor?” itu santai — cocok dengan Rafi, Tanim, dan teman.',
    )),
    tip(tr('Leaving: say “ashi”', 'Saat pergi: bilang “ashi”'), tr(
      'When you leave someone’s house or a room, say “Ashi” (I’m off — literally “I’ll come”), then “Allah hafez”. Bangladeshis avoid “jai” (I go).',
      'Saat meninggalkan rumah seseorang atau ruangan, bilang “Ashi” (pamit — harfiah “aku akan datang”), lalu “Allah hafez”. Orang Bangladesh menghindari “jai” (aku pergi).',
    )),
  ],
};
