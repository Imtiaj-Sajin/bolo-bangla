import { ask, chat, f, line, no, ok, s, tip, tr, w } from '../dsl';
import type { UnitDef } from '../types';

export const u01: UnitDef = {
  id: 'u01',
  title: tr('Greet the family', 'Menyapa keluarga'),
  goal: tr('Say salam, ask “how are you?” and say thank you and goodbye.', 'Mengucap salam, bertanya “apa kabar?”, berterima kasih dan berpamitan.'),
  lessons: [
    {
      title: tr('Salam', 'Salam'),
      words: [
        w('Assalamu alaikum', 'peace be upon you (hello)', 'assalamualaikum (halo)', '👋', tr('The everyday greeting in Bangladeshi Muslim families — just like in Indonesia.', 'Salam sehari-hari di keluarga Muslim Bangladesh — sama seperti di Indonesia.')),
        w('Walaikum assalam', 'and peace be upon you (reply)', 'waalaikumsalam (balasan)', '🤝'),
        w('ji', 'yes (polite)', 'ya (sopan)', '🙂', tr('Use “ji” with elders. It is softer and more respectful than a plain “yes”.', 'Pakai “ji” dengan orang yang lebih tua. Lebih sopan, seperti “iya”.')),
        w('na', 'no', 'tidak', '🙅'),
        w('dhonnobad', 'thank you', 'terima kasih', '🙏'),
        w('Amma', 'Mum (mother-in-law too)', 'Ibu (juga untuk ibu mertua)', '👩'),
        w('Abba', 'Dad (father-in-law too)', 'Ayah (juga untuk ayah mertua)', '👨'),
      ],
      sentences: [
        s('Assalamu alaikum, Amma.', 'Peace be upon you, Amma.|Hello, Amma.', 'Assalamualaikum, Amma.'),
        s('Walaikum assalam.', 'And peace be upon you too.|Peace be upon you too.', 'Waalaikumsalam.', 'm'),
        s('Ji, Amma.', 'Yes, Amma.', 'Ya, Amma.|Iya, Amma.'),
        s('Na, dhonnobad.', 'No, thank you.|No, thanks.', 'Tidak, terima kasih.'),
        s('Ji, dhonnobad.', 'Yes, thank you.|Yes, thanks.', 'Ya, terima kasih.|Iya, terima kasih.'),
        s('Dhonnobad, Abba.', 'Thank you, Abba.|Thanks, Abba.', 'Terima kasih, Abba.'),
        s('Assalamu alaikum, Abba.', 'Peace be upon you, Abba.|Hello, Abba.', 'Assalamualaikum, Abba.'),
      ],
    },
    {
      title: tr('How are you?', 'Apa kabar?'),
      words: [
        w('ami', 'I', 'saya / aku', '🙋'),
        w('apni', 'you (respectful)', 'Anda (sopan)', '🫵', tr('“Apni” is like “Anda”: use it for elders and in-laws.', '“Apni” seperti “Anda”: dipakai untuk orang tua dan mertua.')),
        w('bhalo', 'good, well', 'baik', '👍'),
        w('kemon', 'how', 'bagaimana', '🤔'),
        w('achi', 'am (with “ami”)', '“ada / sedang” (untuk ami)'),
        w('achen', 'are (with “apni”)', '“ada / sedang” (untuk apni)'),
      ],
      forms: [
        f('Alhamdulillah', 'Alhamdulillah (praise be to God)', 'Alhamdulillah'),
        f('acho', 'are (with “tumi”)', '“ada / sedang” (untuk tumi)'),
        f('ma', 'dear (elders call a young woman “ma”)', 'nak (orang tua memanggil perempuan muda “ma”)'),
        f('kemon achen', 'how are you (respectful)', 'apa kabar (sopan)'),
        f('bhalo achi', 'I am fine', 'saya baik'),
      ],
      sentences: [
        s('Apni kemon achen?', 'How are you?', 'Apa kabar?|Bagaimana kabar Anda?'),
        s('Ami bhalo achi.', 'I am fine.|I am well.|I am good.', 'Saya baik.|Aku baik.'),
        s('Alhamdulillah, bhalo achi.', 'Alhamdulillah, I am fine.|Alhamdulillah, I am well.', 'Alhamdulillah, saya baik.|Alhamdulillah, baik.'),
        s('Ji, ami bhalo achi.', 'Yes, I am fine.|Yes, I am well.', 'Ya, saya baik.|Iya, saya baik.'),
        s('Apni bhalo achen?', 'Are you well?|Are you fine?', 'Anda baik?|Apakah Anda baik?'),
        s('Amma, apni kemon achen?', 'Amma, how are you?', 'Amma, apa kabar?'),
        s('Ami bhalo achi, apni?', 'I am fine, and you?|I am fine, you?', 'Saya baik, Anda?|Saya baik, dan Anda?'),
      ],
      chats: [
        chat('amma', 'Kemon acho, ma?', 'How are you, dear?', 'Apa kabar, Nak?', [
          ok('Alhamdulillah, bhalo achi. Apni kemon achen?', 'Alhamdulillah, I’m fine. How are you?', 'Alhamdulillah, saya baik. Apa kabar Anda?'),
          no('Na, dhonnobad.', 'No, thank you.', 'Tidak, terima kasih.'),
          no('Walaikum assalam.', 'And peace be upon you too.', 'Waalaikumsalam.'),
        ]),
      ],
    },
    {
      title: tr('Thanks and goodbye', 'Terima kasih dan sampai jumpa'),
      words: [
        w('Allah hafez', 'goodbye', 'selamat tinggal', '👋', tr('Bangladeshi Muslims say “Allah hafez” (God protect you) when leaving.', 'Muslim Bangladesh mengucapkan “Allah hafez” (semoga Allah melindungi) saat berpisah.')),
        w('thik ache', 'okay', 'oke / baik', '👌'),
        w('accha', 'alright, I see', 'baiklah / oh begitu'),
        w('abar', 'again', 'lagi'),
        w('dekha hobe', 'we will meet', 'kita akan bertemu'),
      ],
      forms: [f('dekha', 'meeting, seeing', 'bertemu, melihat'), f('hobe', 'will be / will happen', 'akan terjadi')],
      sentences: [
        s('Allah hafez, Abba.', 'Goodbye, Abba.', 'Selamat tinggal, Abba.|Sampai jumpa, Abba.'),
        s('Abar dekha hobe.', 'See you again.|We will meet again.', 'Sampai jumpa lagi.|Kita akan bertemu lagi.'),
        s('Thik ache, Amma.', 'Okay, Amma.', 'Oke, Amma.|Baik, Amma.'),
        s('Accha, dhonnobad.', 'Alright, thank you.|I see, thank you.', 'Baiklah, terima kasih.'),
        s('Ji, thik ache.', 'Yes, okay.', 'Ya, oke.|Iya, baik.'),
        s('Allah hafez, abar dekha hobe.', 'Goodbye, see you again.', 'Selamat tinggal, sampai jumpa lagi.'),
        s('Thik ache, Allah hafez.', 'Okay, goodbye.', 'Oke, selamat tinggal.|Baik, sampai jumpa.', 'm'),
      ],
      chats: [
        chat('abba', 'Thik ache, ma. Allah hafez.', 'Okay, dear. Goodbye.', 'Baik, Nak. Selamat tinggal.', [
          ok('Allah hafez, Abba. Abar dekha hobe.', 'Goodbye, Abba. See you again.', 'Selamat tinggal, Abba. Sampai jumpa lagi.'),
          no('Ami bhalo achi.', 'I am fine.', 'Saya baik.'),
          no('Apni kemon achen?', 'How are you?', 'Apa kabar?'),
        ]),
        chat('amma', 'Dhonnobad, ma.', 'Thank you, dear.', 'Terima kasih, Nak.', [
          ok('Ji, Amma. Thik ache.', 'Yes, Amma. It’s okay.', 'Iya, Amma. Tidak apa-apa.'),
          no('Allah hafez, Abba.', 'Goodbye, Abba.', 'Selamat tinggal, Abba.'),
        ]),
      ],
    },
  ],
  story: {
    title: tr('Meeting Amma and Abba', 'Bertemu Amma dan Abba'),
    steps: [
      line('you', 'Assalamu alaikum, Amma.', 'Peace be upon you, Amma.', 'Assalamualaikum, Amma.'),
      line('amma', 'Walaikum assalam! Kemon acho, ma?', 'And peace be upon you! How are you, dear?', 'Waalaikumsalam! Apa kabar, Nak?'),
      line('you', 'Alhamdulillah, bhalo achi. Apni kemon achen?', 'Alhamdulillah, I’m fine. How are you?', 'Alhamdulillah, saya baik. Apa kabar Anda?'),
      line('amma', 'Ami bhalo achi.', 'I am fine.', 'Saya baik.'),
      ask(tr('How is Amma?', 'Bagaimana kabar Amma?'), [tr('She is fine', 'Dia baik'), tr('She is tired', 'Dia lelah'), tr('She is not home', 'Dia tidak di rumah')], 0),
      line('abba', 'Assalamu alaikum. Kemon acho?', 'Peace be upon you. How are you?', 'Assalamualaikum. Apa kabar?'),
      line('you', 'Ji, bhalo achi, Abba. Dhonnobad.', 'Yes, I’m fine, Abba. Thank you.', 'Iya, saya baik, Abba. Terima kasih.'),
      ask(tr('What does “ji” mean?', 'Apa arti “ji”?'), [tr('no', 'tidak'), tr('yes (polite)', 'ya (sopan)'), tr('thank you', 'terima kasih')], 1),
      line('abba', 'Accha. Thik ache, ma.', 'Alright. Okay, dear.', 'Baiklah. Oke, Nak.'),
      line('you', 'Allah hafez, Abba. Abar dekha hobe.', 'Goodbye, Abba. See you again.', 'Selamat tinggal, Abba. Sampai jumpa lagi.'),
      ask(tr('How do you say goodbye?', 'Bagaimana cara berpamitan?'), [tr('Allah hafez', 'Allah hafez'), tr('Dhonnobad', 'Dhonnobad'), tr('Kemon achen', 'Kemon achen')], 0),
    ],
  },
  tips: [
    tip(tr('Apni = Anda, tumi = kamu', 'Apni = Anda, tumi = kamu'), tr(
      'Bangla has polite and familiar “you”, just like Indonesian. Say apni to your parents-in-law and anyone older. They will often call you tumi — that is normal and warm.',
      'Bahasa Bangla punya “kamu” sopan dan akrab, persis seperti bahasa Indonesia. Pakai apni untuk mertua dan orang yang lebih tua. Mereka sering memanggilmu tumi — itu biasa dan hangat.',
    )),
    tip(tr('Say salam first', 'Ucapkan salam lebih dulu'), tr(
      'The younger person greets first: “Assalamu alaikum”. Elders answer “Walaikum assalam”. Exactly like at home in Indonesia.',
      'Yang lebih muda menyapa lebih dulu: “Assalamu alaikum”. Yang lebih tua menjawab “Walaikum assalam”. Sama seperti di Indonesia.',
    )),
    tip(tr('“Ji” is the magic word', '“Ji” adalah kata ajaib'), tr(
      'Answer elders with “ji” (yes). It sounds respectful and kind. Even “Ji, Amma” alone makes a great impression.',
      'Jawab orang tua dengan “ji” (ya). Terdengar sopan dan manis. “Ji, Amma” saja sudah memberi kesan yang baik.',
    )),
    tip(tr('Amma and Abba', 'Amma dan Abba'), tr(
      'In many Bangladeshi families the new bou calls her husband’s parents Amma and Abba, like her own parents. It shows love and respect.',
      'Di banyak keluarga Bangladesh, bou (istri) baru memanggil orang tua suaminya Amma dan Abba, seperti orang tuanya sendiri. Ini tanda sayang dan hormat.',
    )),
  ],
};
