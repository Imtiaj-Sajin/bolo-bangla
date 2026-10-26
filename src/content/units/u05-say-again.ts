import { ask, chat, f, line, no, ok, s, tip, tr, w } from '../dsl';
import type { UnitDef } from '../types';

export const u05: UnitDef = {
  id: 'u05',
  title: tr('Say it again, please', 'Tolong ulangi'),
  goal: tr(
    'Keep any conversation going: say you don’t understand, ask people to repeat or slow down, ask what a word means, and say sorry.',
    'Menjaga percakapan tetap berjalan: bilang tidak mengerti, minta diulang atau pelan-pelan, menanyakan arti kata, dan minta maaf.',
  ),
  forms: [
    f('bouma', 'daughter-in-law (a loving way elders call you)', 'menantu (panggilan sayang dari orang tua)'),
    f('bujho', 'understand (you, familiar)', '(kamu) mengerti'),
    f('Shabash', 'Well done!', 'Bagus! Hebat!'),
    f('shikhbe', 'will learn (you, familiar)', '(kamu) akan belajar'),
    f('Inshallah', 'Inshallah (God willing)', 'Insya Allah'),
  ],
  lessons: [
    {
      title: tr('I don’t understand', 'Aku tidak mengerti'),
      words: [
        w('bujhi', 'understand (I)', '(saya) mengerti', '🧠'),
        w('bujhechi', 'have understood (I)', '(saya) sudah mengerti'),
        w('bujhechen', 'have understood (you, respectful)', '(Anda) sudah mengerti'),
        w('jani', 'know (I)', '(saya) tahu', '🤷'),
      ],
      forms: [
        f('bujhecho', 'have understood (you, familiar)', '(kamu) sudah mengerti'),
        f('bujhi nai', 'didn’t understand', 'tidak mengerti (tadi)'),
        f('bujhi na', 'don’t understand', 'tidak mengerti'),
        f('jani na', 'don’t know', 'tidak tahu'),
      ],
      sentences: [
        s('Ami bujhi nai.', "I didn't understand.", 'Saya tidak mengerti.|Saya belum paham.'),
        s('Ami bujhi na.', "I don't understand.", 'Saya tidak paham.|Saya tidak mengerti.'),
        s('Ami bujhechi.', 'I understood.|I understand.', 'Saya mengerti.|Saya paham.'),
        s('Ji, bujhechi.', 'Yes, I understood.|Yes, I understand.', 'Iya, saya mengerti.|Iya, saya paham.'),
        s('Apni bujhechen?', 'Did you understand?|Do you understand?', 'Anda mengerti?|Apakah Anda paham?'),
        s('Tumi bujhecho?|Apni bujhechen?', 'Did you understand?|Do you understand?', 'Kamu mengerti?|Kamu paham?'),
        s('Ami jani na.', "I don't know.", 'Saya tidak tahu.'),
      ],
      chats: [
        chat('amma', 'Bujhecho, ma?', 'Did you understand, dear?', 'Kamu mengerti, Nak?', [
          ok('Ji, Amma, bujhechi.', 'Yes, Amma, I understood.', 'Iya, Amma, saya mengerti.'),
          no('Eta jhal?', 'Is this spicy?', 'Ini pedas?'),
          no('Ami pore khabo.', 'I will eat later.', 'Saya makan nanti saja.'),
        ]),
      ],
    },
    {
      title: tr('Again, slowly', 'Ulangi, pelan-pelan'),
      words: [
        w('aste', 'slowly', 'pelan', '🐢', tr('“Aste aste” = “pelan-pelan”.', '“Aste aste” = “pelan-pelan”.')),
        w('bolben', 'would you say (polite request)', 'bisakah Anda mengatakan (permintaan sopan)', '🗨️'),
        w('bolen', 'say, speak (respectful)', 'katakan, bicaralah (sopan)'),
        w('kotha', 'words, talk', 'perkataan, omongan', '💭'),
        w('jore', 'loudly', 'keras, nyaring', '📢'),
      ],
      forms: [
        f('abar bolben', 'would you say it again', 'bisa ulangi lagi'),
        f('aste bolben', 'would you speak slowly', 'bisa bicara pelan'),
        f('aste aste', 'slowly, little by little', 'pelan-pelan'),
        f('shoshur bari', 'your in-laws’ home', 'rumah mertua'),
        f('shoshur barite', 'at your in-laws’ home', 'di rumah mertua'),
        f('lagche', 'feels (to someone)', 'terasa'),
      ],
      sentences: [
        s('Abar bolben?', 'Could you say it again?|Would you say that again?', 'Bisa ulangi lagi?|Tolong diulang?'),
        s('Ektu aste bolben?', 'Could you speak a little slowly?|Could you speak a bit more slowly?', 'Bisa bicara sedikit pelan?|Tolong bicara lebih pelan?'),
        s('Aste aste bolen.', 'Speak slowly.|Please speak slowly.', 'Bicara pelan-pelan.|Tolong bicara pelan-pelan.'),
        s('Ektu jore bolben?', 'Could you speak a little louder?', 'Bisa bicara sedikit lebih keras?'),
        s('Apnar kotha bujhi nai.', "I didn't understand what you said.|I didn't understand your words.", 'Saya tidak mengerti perkataan Anda.'),
        s('Abar bolen, Apu.', 'Say it again, Apu.', 'Ulangi lagi, Apu.'),
        s('Ami Bangla aste aste shikhchi.', 'I am learning Bangla slowly.|I am learning Bangla little by little.', 'Saya belajar bahasa Bangla pelan-pelan.'),
      ],
      chats: [
        chat('khala', 'Tomar shoshur barite kemon lagche?', 'How do you like it at your in-laws’ home?', 'Bagaimana rasanya tinggal di rumah mertua?', [
          ok('Ektu aste bolben? Ami bujhi nai.', "Could you speak a little slowly? I didn't understand.", 'Bisa bicara sedikit pelan? Saya tidak mengerti.'),
          no('Ji, kheyechi.', 'Yes, I have eaten.', 'Iya, sudah makan.'),
          no('Amar nam {name}.', 'My name is {name}.', 'Nama saya {name}.'),
        ]),
      ],
    },
    {
      title: tr('What does it mean?', 'Apa artinya?'),
      words: [
        w('mane', 'means, meaning', 'artinya', '📖'),
        w('Banglay', 'in Bangla', 'dalam bahasa Bangla'),
        w('bole', 'says; is called', 'mengatakan; disebut'),
        w('shobdo', 'word', 'kata', '🔤'),
        w('notun', 'new', 'baru', '✨'),
      ],
      forms: [
        f('ki bole', 'what is it called', 'disebut apa'),
        f('etake', 'this (as object)', 'ini (sebagai objek)'),
        f('Ingrejite', 'in English', 'dalam bahasa Inggris'),
        f('ei', 'this (before a noun)', 'ini (sebelum kata benda)'),
        f('shobdota', 'the word', 'kata itu'),
        f('jano', 'know (you, familiar)', '(kamu) tahu'),
        f('language', 'language (English word)', 'language (kata bahasa Inggris)'),
      ],
      sentences: [
        s('Moja mane ki?', 'What does moja mean?', 'Moja artinya apa?|Apa arti moja?'),
        s('Eta Banglay ki bole?', 'What is this called in Bangla?|What do you call this in Bangla?', 'Ini dalam bahasa Bangla disebut apa?'),
        s('Etake Banglay pani bole.', 'In Bangla this is called pani.|This is called pani in Bangla.', 'Dalam bahasa Bangla ini disebut pani.'),
        s('Ingrejite bolben?', 'Could you say it in English?', 'Bisa katakan dalam bahasa Inggris?'),
        s('Ei shobdota ami jani na.', "I don't know this word.", 'Saya tidak tahu kata ini.'),
        s('Ami notun shobdo shikhchi.', 'I am learning new words.', 'Saya sedang belajar kata-kata baru.'),
        s('Bhasha mane language.', 'Bhasha means language.', 'Bhasha artinya bahasa.'),
      ],
      chats: [
        chat('tanim', 'Bhabi, eta Banglay ki bole jano?', 'Bhabi, do you know what this is called in Bangla?', 'Bhabi, tahu ini dalam bahasa Bangla disebut apa?', [
          ok('Na, jani na. Eta Banglay ki bole?', "No, I don't know. What is it called in Bangla?", 'Nggak, aku nggak tahu. Ini dalam bahasa Bangla disebut apa?'),
          no('Khub moja hoyeche!', "It's very tasty!", 'Enak sekali!'),
          no('Ji, kheyechi.', 'Yes, I have eaten.', 'Iya, sudah makan.'),
        ]),
      ],
    },
    {
      title: tr('Sorry — no problem!', 'Maaf — tidak apa-apa!'),
      words: [
        w('maf korben', 'sorry, excuse me (respectful)', 'maaf, permisi (sopan)', '🙇', tr(
          '“Maf” is the same word as Indonesian “maaf”!',
          '“Maf” adalah kata yang sama dengan “maaf”!',
        )),
        w('shomossha', 'problem', 'masalah', '⚠️'),
        w('kono', 'any', 'apa pun, satu pun'),
        w('bhul', 'mistake', 'kesalahan', '🤦'),
        w('chinta', 'worry', 'khawatir', '😟', tr(
          'Careful: “chinta” means WORRY, not “cinta” (love)!',
          'Hati-hati: “chinta” artinya KHAWATIR, bukan “cinta”!',
        )),
      ],
      forms: [
        f('korben na', 'please don’t (respectful)', 'jangan (sopan)'),
        f('koro na', 'don’t (familiar)', 'jangan (akrab)'),
        f('kono shomossha nai', 'no problem', 'tidak masalah'),
        f('chinta korben na', 'don’t worry', 'jangan khawatir'),
        f('kichu', 'something, anything', 'sesuatu, apa pun'),
        f('mone korben na', 'please don’t mind', 'jangan tersinggung'),
        f('maf koro', 'sorry (familiar)', 'maaf (akrab)'),
        f('maf', 'forgiveness', 'maaf'),
        f('Oh', 'Oh', 'Oh'),
      ],
      sentences: [
        s('Maf korben, Abba.', 'Sorry, Abba.|Excuse me, Abba.', 'Maaf, Abba.|Permisi, Abba.'),
        s('Kono shomossha nai.', 'No problem.|There is no problem.', 'Tidak masalah.|Tidak apa-apa.'),
        s('Amar bhul hoyeche.', 'I made a mistake.|It was my mistake.', 'Saya salah.|Saya membuat kesalahan.'),
        s('Chinta korben na.', "Don't worry.", 'Jangan khawatir.'),
        s('Kichu mone korben na.', "Please don't mind.|Please don't take it badly.", 'Jangan tersinggung, ya.|Mohon dimaklumi.'),
        s('Maf korben, ami bujhi nai.', "Sorry, I didn't understand.", 'Maaf, saya tidak mengerti.'),
        s('Thik ache, kono shomossha nai.', "It's okay, no problem.", 'Tidak apa-apa, tidak masalah.'),
      ],
      chats: [
        chat('tanim', 'Bhabi, eta amar cha!', "Bhabi, that's my tea!", 'Bhabi, itu tehku!', [
          ok('Oh, maf koro! Amar bhul hoyeche.', 'Oh, sorry! My mistake.', 'Oh, maaf! Aku salah.'),
          no('Kono shomossha nai.', 'No problem.', 'Tidak masalah.'),
          no('Ami cha khabo.', 'I will have tea.', 'Aku mau minum teh.'),
        ]),
        chat('amma', 'Tumi chinta koro na, ma.', 'Don’t you worry, dear.', 'Jangan khawatir, Nak.', [
          ok('Ji, Amma. Dhonnobad.', 'Yes, Amma. Thank you.', 'Iya, Amma. Terima kasih.'),
          no('Eta Banglay ki bole?', 'What is this called in Bangla?', 'Ini dalam bahasa Bangla disebut apa?'),
          no('Tanim amar debor.', 'Tanim is my brother-in-law.', 'Tanim adik ipar saya.'),
        ]),
      ],
    },
  ],
  story: {
    title: tr('Chacha talks too fast', 'Chacha bicara terlalu cepat'),
    steps: [
      line('chacha', 'Assalamu alaikum, bouma! Kemon acho? Barir shobai kemon ache?', 'Peace be upon you, daughter-in-law! How are you? How is everyone at home?', 'Assalamualaikum, menantuku! Apa kabar? Bagaimana kabar keluarga di rumah?'),
      line('you', 'Walaikum assalam, Chacha. Maf korben, ektu aste bolben?', 'And peace be upon you, Chacha. Sorry, could you speak a little slowly?', 'Waalaikumsalam, Chacha. Maaf, bisa bicara sedikit pelan?'),
      ask(tr('What did you ask Chacha to do?', 'Apa yang kamu minta kepada Chacha?'), [
        tr('Speak slowly', 'Bicara pelan-pelan'),
        tr('Speak English', 'Bicara bahasa Inggris'),
        tr('Sit down', 'Duduk'),
      ], 0),
      line('chacha', 'Accha, accha. Tumi kemon acho?', 'Okay, okay. How are you?', 'Baik, baik. Apa kabarmu?'),
      line('you', 'Ji, bhalo achi, Chacha. Dhonnobad.', 'Yes, I am fine, Chacha. Thank you.', 'Iya, saya baik, Chacha. Terima kasih.'),
      line('chacha', 'Tumi Bangla bujho?', 'Do you understand Bangla?', 'Kamu mengerti bahasa Bangla?'),
      line('you', 'Ektu ektu bujhi. Ami shikhchi.', 'I understand a little. I am learning.', 'Saya mengerti sedikit-sedikit. Saya sedang belajar.'),
      ask(tr('How much Bangla do you understand?', 'Seberapa banyak bahasa Bangla yang kamu mengerti?'), [
        tr('Nothing', 'Tidak sama sekali'),
        tr('Everything', 'Semuanya'),
        tr('A little', 'Sedikit-sedikit'),
      ], 2),
      line('chacha', 'Shabash! Kono shomossha nai. Aste aste shikhbe.', 'Well done! No problem. You will learn little by little.', 'Hebat! Tidak masalah. Kamu akan belajar pelan-pelan.'),
      line('you', 'Inshallah! Dhonnobad, Chacha.', 'Inshallah! Thank you, Chacha.', 'Insya Allah! Terima kasih, Chacha.'),
      ask(tr('What does Chacha say at the end?', 'Apa kata Chacha di akhir?'), [
        tr('You must speak faster', 'Kamu harus bicara lebih cepat'),
        tr('No problem — you will learn little by little', 'Tidak masalah — kamu akan belajar pelan-pelan'),
        tr('Please speak English', 'Tolong bicara bahasa Inggris'),
      ], 1),
    ],
  },
  tips: [
    tip(tr('Ask nicely with -ben', 'Meminta dengan sopan memakai -ben'), tr(
      'Polite requests use the future form: “Abar bolben?” (lit. “Will you say it again?”), “Ektu pani diben?”. It is softer than a command. Bangladeshis rarely say “please” — the -ben ending does the job.',
      'Permintaan sopan memakai bentuk akan datang: “Abar bolben?” (harfiah “Maukah Anda mengulanginya?”), “Ektu pani diben?”. Lebih halus daripada perintah. Orang Bangladesh jarang bilang “tolong” — akhiran -ben sudah cukup sopan.',
    )),
    tip(tr('Maf = maaf', 'Maf = maaf'), tr(
      '“Maf korben” (sorry / excuse me) uses the same Arabic word as Indonesian “maaf”. To a younger person or your husband: “maf koro”.',
      '“Maf korben” (maaf / permisi) memakai kata Arab yang sama dengan “maaf”. Kepada yang lebih muda atau suami: “maf koro”.',
    )),
    tip(tr('Doubling words, just like Indonesian', 'Kata ulang, seperti bahasa Indonesia'), tr(
      '“Aste aste” = pelan-pelan, “ektu ektu” = sedikit-sedikit. Bangla loves doubled words too!',
      '“Aste aste” = pelan-pelan, “ektu ektu” = sedikit-sedikit. Bahasa Bangla juga suka kata ulang!',
    )),
    tip(tr('Chinta is not cinta!', 'Chinta bukan cinta!'), tr(
      '“Chinta korben na” means “don’t worry”. Love is “bhalobasha” — you will learn that later 😉',
      '“Chinta korben na” artinya “jangan khawatir”. Cinta adalah “bhalobasha” — nanti kamu akan mempelajarinya 😉',
    )),
    tip(tr('Mixing English is normal', 'Mencampur bahasa Inggris itu biasa'), tr(
      'Bangladeshis mix in English words all the time — phone, TV, sorry, problem. If you don’t know a Bangla word, say the English one. Your family will understand and help you.',
      'Orang Bangladesh sering mencampur kata bahasa Inggris — phone, TV, sorry, problem. Kalau kamu tidak tahu kata Bangla-nya, pakai kata bahasa Inggris. Keluargamu akan mengerti dan membantumu.',
    )),
  ],
};
