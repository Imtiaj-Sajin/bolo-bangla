import { ask, chat, f, line, no, ok, s, tip, tr, w } from '../dsl';
import type { UnitDef } from '../types';

// Comes third in the course: the "survival" phrases she needs from day one.
export const u05: UnitDef = {
  id: 'u05',
  title: tr('Say it again, please', 'Tolong ulangi'),
  goal: tr(
    'Keep any conversation going: say you don’t understand, ask people to repeat or slow down, ask what a word means, and say sorry.',
    'Menjaga percakapan tetap berjalan: bilang tidak mengerti, minta diulang atau pelan-pelan, menanyakan arti kata, dan minta maaf.',
  ),
  forms: [
    f('bujho', 'understand (you, familiar)', '(kamu) mengerti'),
    f('Shabash', 'Well done!', 'Hebat! Bagus!'),
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
        f('bujhi nai', 'didn’t understand', 'belum paham'),
        f('bujhi na', 'don’t understand', 'tidak paham'),
        f('jani na', 'don’t know', 'tidak tahu'),
      ],
      sentences: [
        s('Ami bujhi nai.|Bujhi nai.', "I didn't understand.", 'Saya belum paham.|Saya tidak mengerti.'),
        s('Ami bujhi na.|Bujhi na.', "I don't understand.", 'Saya tidak paham.'),
        s('Ami bujhechi.|Bujhechi.', 'I understood.|I understand.', 'Saya mengerti.|Saya paham.'),
        s('Ji, bujhechi.|Ha, bujhechi.', 'Yes, I understood.|Yes, I understand.', 'Iya, saya mengerti.|Iya, paham.'),
        s('Apni bujhechen?|Tumi bujhecho?', 'Did you understand?|Do you understand?', 'Anda mengerti?|Apakah Anda paham?'),
        s('Tumi bujhecho?|Apni bujhechen?', 'Did you understand?|Do you understand?', 'Kamu mengerti?|Kamu paham?'),
        s('Ami jani na.|Jani na.', "I don't know.", 'Saya tidak tahu.'),
      ],
      chats: [
        chat('amma', 'Bujhecho, bouma?', 'Did you understand?', 'Sudah paham, Nak?', [
          ok('Ji, Amma, bujhechi.', 'Yes, Mom, I understood.', 'Iya, Bu, saya paham.'),
          no('Ami Rafir bou.', "I am Rafi's wife.", 'Saya istri Rafi.'),
          no('Tomar nam ki?', 'What is your name?', 'Siapa namamu?'),
        ]),
      ],
    },
    {
      title: tr('Again, slowly', 'Ulangi, pelan-pelan'),
      words: [
        w('aste', 'slowly', 'pelan', '🐢', tr('“Aste aste” = “pelan-pelan”.', '“Aste aste” = “pelan-pelan”.')),
        w('bolben', 'would you say (polite request)', 'bisakah Anda mengatakan (permintaan sopan)', '🗨️'),
        w('bolen', 'say, speak (respectful)', 'katakan, bicaralah (sopan)'),
        w('kotha', 'words, talk', 'perkataan, omongan', '💭', tr(
          'Don’t mix it up with “kotha theke” (from where) — same spelling, different word.',
          'Jangan tertukar dengan “kotha theke” (dari mana) — ejaannya sama, katanya berbeda.',
        )),
        w('jore', 'loudly', 'keras, nyaring', '📢'),
      ],
      forms: [
        f('abar bolben', 'would you say it again', 'bisa diulang'),
        f('aste bolben', 'would you speak slowly', 'bisa bicara pelan'),
        f('aste aste', 'slowly, little by little', 'pelan-pelan'),
        f('ji ki bollen', 'sorry? what did you say?', 'maaf, tadi bilang apa?'),
        f('ki bollen', 'what did you say', 'tadi bilang apa'),
        f('bollen', 'said (you, respectful)', '(Anda) bilang'),
        f('shoshur bari', 'your in-laws’ home', 'rumah mertua'),
        f('shoshur barite', 'at your in-laws’ home', 'di rumah mertua'),
        f('lagche', 'feels (to you)', 'terasa'),
        f('kemon lagche', 'how do you like it', 'bagaimana rasanya'),
      ],
      sentences: [
        s('Abar bolben?', 'Could you say it again?|Would you say that again?', 'Bisa diulang?|Bisa ulangi lagi?'),
        s('Ektu aste bolben?', 'Could you speak a little slowly?|Could you speak a bit more slowly?', 'Bisa bicara sedikit pelan?|Tolong bicara lebih pelan?'),
        s('Ji? Ki bollen?', 'Sorry? What did you say?|Pardon? What did you say?', 'Maaf, tadi bilang apa?|Maaf, bilang apa?'),
        s('Aste aste bolen.', 'Please speak slowly.|Speak slowly, please.', 'Tolong bicara pelan-pelan.'),
        s('Ektu jore bolben?', 'Could you speak a little louder?', 'Bisa bicara sedikit lebih keras?'),
        s('Apnar kotha bujhi nai.|Tomar kotha bujhi nai.', "I didn't understand what you said.|I didn't understand your words.", 'Saya belum paham maksud Anda.|Saya tidak mengerti perkataan Anda.'),
        s('Ami Bangla aste aste shikhchi.', 'I am learning Bangla slowly.|I am learning Bangla little by little.', 'Saya belajar bahasa Bangla pelan-pelan.'),
      ],
      chats: [
        chat('khala', 'Tomar shoshur barite kemon lagche?', 'How do you like it at your in-laws’ home?', 'Bagaimana rasanya tinggal di rumah mertua?', [
          ok('Ektu aste bolben? Ami bujhi nai.', "Could you speak a little slowly? I didn't understand.", 'Bisa bicara sedikit pelan? Saya belum paham.'),
          ok('Ji? Ki bollen?', 'Sorry? What did you say?', 'Maaf, tadi bilang apa?'),
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
        f('eta', 'this', 'ini'),
        f('ki bole', 'what is it called', 'disebut apa'),
        f('etake', 'this (as object)', 'ini (sebagai objek)'),
        f('pani', 'water', 'air'),
        f('Ingrejite', 'in English', 'dalam bahasa Inggris'),
        f('ei', 'this (before a noun)', 'ini (sebelum kata benda)'),
        f('shobdota', 'the word', 'kata itu'),
        f('jano', 'know (you, familiar)', '(kamu) tahu'),
        f('language', 'language (English word)', 'language (kata bahasa Inggris)'),
      ],
      sentences: [
        s('Shundor mane ki?', 'What does shundor mean?', 'Shundor artinya apa?|Apa arti shundor?'),
        s('Eta Banglay ki bole?', 'What is this called in Bangla?|What do you call this in Bangla?', 'Ini dalam bahasa Bangla disebut apa?'),
        s('Etake Banglay pani bole.', 'In Bangla this is called pani.|This is called pani in Bangla.', 'Dalam bahasa Bangla ini disebut pani.'),
        s('Ingrejite bolben?', 'Could you say it in English?', 'Bisa katakan dalam bahasa Inggris?'),
        s('Ei shobdota ami jani na.', "I don't know this word.", 'Saya tidak tahu kata ini.'),
        s('Ami notun shobdo shikhchi.', 'I am learning new words.', 'Saya sedang belajar kata-kata baru.'),
        s('Bhasha mane language.', 'Bhasha means language.', 'Bhasha artinya bahasa.'),
      ],
      chats: [
        chat('tanim', 'Bhabi, eta Banglay ki bole jano?', 'Do you know what this is called in Bangla?', 'Kak, tahu ini dalam bahasa Bangla disebut apa?', [
          ok('Na, jani na. Eta Banglay ki bole?', "No, I don't know. What is it called in Bangla?", 'Nggak, aku nggak tahu. Ini dalam bahasa Bangla disebut apa?'),
          no('Tumi ke?', 'Who are you?', 'Kamu siapa?'),
          no('Amar desh Indonesia.', 'My country is Indonesia.', 'Negara saya Indonesia.'),
        ]),
      ],
    },
    {
      title: tr('Sorry — no problem!', 'Maaf — tidak apa-apa!'),
      words: [
        w('maf korben', 'sorry, excuse me (respectful)', 'maaf, permisi (sopan)', '🙇', tr(
          '“Maf” is the same word as Indonesian “maaf”! For small slips people just say “sorry”; “maf korben” is for real apologies.',
          '“Maf” adalah kata yang sama dengan “maaf”! Untuk kesalahan kecil orang cukup bilang “sorry”; “maf korben” untuk permintaan maaf yang sungguh-sungguh.',
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
        f('nai', 'there isn’t; not', 'tidak ada; belum'),
        f('kono shomossha nai', 'no problem', 'tidak masalah'),
        f('chinta korben na', 'don’t worry', 'jangan khawatir'),
        f('kichu', 'something, anything', 'sesuatu, apa pun'),
        f('mone korben na', 'please don’t mind', 'jangan tersinggung'),
        f('hoyeche', 'has happened', 'sudah terjadi'),
        f('sorry', 'sorry (English word, used all the time)', 'maaf (kata bahasa Inggris, sering dipakai)'),
        f('Oh', 'Oh', 'Oh'),
        f('maf', 'forgiveness', 'maaf'),
        f('cha', 'tea', 'teh'),
      ],
      sentences: [
        s('Maf korben, Abba.', 'Sorry, Dad.|Excuse me, Dad.', 'Maaf, Ayah.|Permisi, Ayah.'),
        s('Kono shomossha nai.', 'No problem.|There is no problem.', 'Tidak masalah.|Tidak apa-apa.'),
        s('Amar bhul hoyeche.', 'I made a mistake.|It was my mistake.', 'Saya salah.|Itu kesalahan saya.'),
        s('Chinta korben na.', "Don't worry.", 'Jangan khawatir.'),
        s('Kichu mone korben na.', "Please don't mind.|Please don't take it badly.", 'Mohon maaf, ya.|Jangan tersinggung, ya.'),
        s('Maf korben, ami bujhi nai.', "Sorry, I didn't understand.", 'Maaf, saya belum paham.|Maaf, saya tidak mengerti.'),
        s('Thik ache, kono shomossha nai.', "It's okay, no problem.", 'Tidak apa-apa, tidak masalah.'),
      ],
      chats: [
        chat('tanim', 'Bhabi, eta amar cha!', "That's my tea!", 'Kak, itu tehku!', [
          ok('Oh, sorry! Amar bhul hoyeche.', 'Oh, sorry! My mistake.', 'Oh, maaf! Aku salah.'),
          no('Kono shomossha nai.', 'No problem.', 'Tidak masalah.'),
          no('Ami Bangla shikhchi.', 'I am learning Bangla.', 'Aku sedang belajar bahasa Bangla.'),
        ]),
        chat('amma', 'Tumi chinta koro na, bouma.', 'Don’t you worry.', 'Jangan khawatir, Nak.', [
          ok('Ji, Amma. Dhonnobad.', 'Yes, Mom. Thank you.', 'Iya, Bu. Terima kasih.'),
          no('Eta Banglay ki bole?', 'What is this called in Bangla?', 'Ini dalam bahasa Bangla disebut apa?'),
          no('Amar nam {name}.', 'My name is {name}.', 'Nama saya {name}.'),
        ]),
      ],
    },
  ],
  story: {
    title: tr('Uncle talks too fast', 'Paman bicara terlalu cepat'),
    steps: [
      line('chacha', 'Assalamu alaikum, bouma! Kemon acho? Barir shobai kemon ache?', 'Peace be upon you! How are you? How is everyone at home?', 'Assalamualaikum, Nak! Apa kabar? Bagaimana kabar keluarga di rumah?'),
      line('you', 'Walaikum assalam, Chacha. Maf korben, ektu aste bolben?', 'And peace be upon you, Uncle. Sorry, could you speak a little slowly?', 'Waalaikumsalam, Paman. Maaf, bisa bicara sedikit pelan?'),
      ask(tr('What did you ask Uncle to do?', 'Apa yang kamu minta kepada Paman?'), [
        tr('Speak slowly', 'Bicara pelan-pelan'),
        tr('Speak English', 'Bicara bahasa Inggris'),
        tr('Sit down', 'Duduk'),
      ], 0),
      line('chacha', 'Accha, accha. Tumi kemon acho?', 'Okay, okay. How are you?', 'Baik, baik. Apa kabarmu?'),
      line('you', 'Alhamdulillah, bhalo achi, Chacha. Apni kemon achen?', 'Alhamdulillah, I’m fine, Uncle. How are you?', 'Alhamdulillah, saya baik, Paman. Paman apa kabar?'),
      line('chacha', 'Ami bhalo achi. Tumi Bangla bujho?', 'I’m fine. Do you understand Bangla?', 'Paman baik. Kamu mengerti bahasa Bangla?'),
      line('you', 'Ektu ektu bujhi. Ami shikhchi.', 'I understand a little. I am learning.', 'Saya mengerti sedikit-sedikit. Saya sedang belajar.'),
      ask(tr('How much Bangla do you understand?', 'Seberapa banyak bahasa Bangla yang kamu mengerti?'), [
        tr('Nothing', 'Tidak sama sekali'),
        tr('Everything', 'Semuanya'),
        tr('A little', 'Sedikit-sedikit'),
      ], 2),
      line('chacha', 'Shabash! Kono shomossha nai. Aste aste shikhbe.', 'Well done! No problem. You will learn little by little.', 'Hebat! Tidak masalah. Kamu akan belajar pelan-pelan.'),
      line('you', 'Inshallah! Dhonnobad, Chacha.', 'Inshallah! Thank you, Uncle.', 'Insya Allah! Terima kasih, Paman.'),
      ask(tr('What does Uncle say at the end?', 'Apa kata Paman di akhir?'), [
        tr('You must speak faster', 'Kamu harus bicara lebih cepat'),
        tr('No problem — you will learn little by little', 'Tidak masalah — kamu akan belajar pelan-pelan'),
        tr('Please speak English', 'Tolong bicara bahasa Inggris'),
      ], 1),
    ],
  },
  tips: [
    tip(tr('“Ji? Ki bollen?”', '“Ji? Ki bollen?”'), tr(
      'When you miss what someone said, do what Bangladeshis do: “Ji? Ki bollen?” (Sorry? What did you say?). Then “Ektu aste bolben?” if it was too fast.',
      'Kalau kamu tidak menangkap omongan seseorang, lakukan seperti orang Bangladesh: “Ji? Ki bollen?” (Maaf, tadi bilang apa?). Lalu “Ektu aste bolben?” kalau terlalu cepat.',
    )),
    tip(tr('Ask nicely with -ben', 'Meminta dengan sopan memakai -ben'), tr(
      'Polite requests use the future form: “Abar bolben?” (lit. “Will you say it again?”). It is softer than a command. Bangladeshis rarely say “please” — the -ben ending does the job.',
      'Permintaan sopan memakai bentuk akan datang: “Abar bolben?” (harfiah “Maukah Anda mengulanginya?”). Lebih halus daripada perintah. Orang Bangladesh jarang bilang “tolong” — akhiran -ben sudah cukup sopan.',
    )),
    tip(tr('Maf = maaf, but small slips get “sorry”', 'Maf = maaf, tapi kesalahan kecil cukup “sorry”'), tr(
      '“Maf korben” uses the same Arabic word as Indonesian “maaf” and is for real apologies. For little things — taking the wrong cup, bumping into someone — everyone just says “sorry”.',
      '“Maf korben” memakai kata Arab yang sama dengan “maaf” dan dipakai untuk permintaan maaf yang sungguh-sungguh. Untuk hal kecil — salah ambil gelas, tersenggol — semua orang cukup bilang “sorry”.',
    )),
    tip(tr('Doubling words, just like Indonesian', 'Kata ulang, seperti bahasa Indonesia'), tr(
      '“Aste aste” = pelan-pelan, “ektu ektu” = sedikit-sedikit. Bangla loves doubled words too!',
      '“Aste aste” = pelan-pelan, “ektu ektu” = sedikit-sedikit. Bahasa Bangla juga suka kata ulang!',
    )),
    tip(tr('Chinta is not cinta!', 'Chinta bukan cinta!'), tr(
      '“Chinta korben na” means “don’t worry”. Funny fact: chinta and Indonesian cinta are the same old Sanskrit word (cintā, “thought, care”) — in Bangla it became worry, in Indonesian it became love. Love in Bangla is “bhalobasha”.',
      '“Chinta korben na” artinya “jangan khawatir”. Fakta lucu: chinta dan cinta berasal dari kata Sanskerta yang sama (cintā, “pikiran, perhatian”) — dalam bahasa Bangla jadi khawatir, dalam bahasa Indonesia jadi cinta. Cinta dalam bahasa Bangla adalah “bhalobasha”.',
    )),
    tip(tr('Mixing English is normal', 'Mencampur bahasa Inggris itu biasa'), tr(
      'Bangladeshis mix in English words all the time — phone, TV, sorry, problem. If you don’t know a Bangla word, say the English one. Your family will understand and help you.',
      'Orang Bangladesh sering mencampur kata bahasa Inggris — phone, TV, sorry, problem. Kalau kamu tidak tahu kata Bangla-nya, pakai kata bahasa Inggris. Keluargamu akan mengerti dan membantumu.',
    )),
  ],
};
