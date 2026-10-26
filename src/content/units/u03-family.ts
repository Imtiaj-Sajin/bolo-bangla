import { ask, chat, f, line, no, ok, s, tip, tr, w } from '../dsl';
import type { UnitDef } from '../types';

export const u03: UnitDef = {
  id: 'u03',
  title: tr('My new family', 'Keluarga baruku'),
  goal: tr(
    'Call every in-law the right way, talk about brothers, sisters and grandparents, and ask “who is this?”.',
    'Memanggil setiap mertua dan ipar dengan benar, bercerita tentang saudara dan kakek-nenek, dan bertanya “ini siapa?”.',
  ),
  lessons: [
    {
      title: tr('Brothers and sisters', 'Kakak dan adik'),
      words: [
        w('bhai', 'brother', 'saudara laki-laki', '🧑'),
        w('bon', 'sister', 'saudara perempuan', '👧'),
        w('boro', 'big; elder', 'besar; kakak (lebih tua)', '🐘'),
        w('choto', 'small; younger', 'kecil; adik (lebih muda)', '🐭'),
        w('poribar', 'family', 'keluarga', '👨‍👩‍👧'),
        w('amra', 'we', 'kami, kita', '🫂'),
      ],
      forms: [
        f('bhai-bon', 'brothers and sisters, siblings', 'saudara kandung'),
        f('boro bhai', 'elder brother', 'kakak laki-laki'),
        f('boro bon', 'elder sister', 'kakak perempuan'),
        f('choto bhai', 'younger brother', 'adik laki-laki'),
        f('choto bon', 'younger sister', 'adik perempuan'),
        f('amader', 'our', 'kami (milik kami)'),
        f('ekta', 'one, a', 'satu, se-'),
        f('char', 'four', 'empat'),
        f('chele', 'boy, son', 'anak laki-laki'),
        f('Tanim', 'Tanim (Rafi’s younger brother)', 'Tanim (adik laki-laki Rafi)'),
      ],
      sentences: [
        s('Tanim Rafir choto bhai.', "Tanim is Rafi's younger brother.", 'Tanim adik laki-laki Rafi.'),
        s('Nila Rafir boro bon.', "Nila is Rafi's elder sister.", 'Nila kakak perempuan Rafi.'),
        s('Amar ekta choto bon ache.', 'I have a younger sister.|I have one younger sister.', 'Saya punya seorang adik perempuan.|Saya punya satu adik perempuan.'),
        s('Amader poribar khub boro.', 'Our family is very big.', 'Keluarga kami sangat besar.|Keluarga kami besar sekali.'),
        s('Amra char bhai-bon.', 'We are four siblings.|We are four brothers and sisters.', 'Kami empat bersaudara.'),
        s('Apnar poribar kemon ache?', 'How is your family?', 'Bagaimana kabar keluarga Anda?'),
        s('Tanim khub bhalo chele.', 'Tanim is a very good boy.', 'Tanim anak yang sangat baik.|Tanim anak laki-laki yang sangat baik.'),
      ],
      chats: [
        chat('tanim', 'Bhabi, tomar bhai-bon ache?', 'Bhabi, do you have brothers and sisters?', 'Bhabi, kamu punya saudara?', [
          ok('Ji, amar ekta choto bon ache.', 'Yes, I have a younger sister.', 'Iya, saya punya seorang adik perempuan.'),
          no('Tanim Rafir choto bhai.', "Tanim is Rafi's younger brother.", 'Tanim adik laki-laki Rafi.'),
          no('Apnar poribar kemon ache?', 'How is your family?', 'Bagaimana kabar keluarga Anda?'),
        ]),
      ],
    },
    {
      title: tr('Calling your in-laws', 'Memanggil mertua dan ipar'),
      words: [
        w('shashuri', 'mother-in-law', 'ibu mertua', undefined, tr(
          'Use “shashuri” to talk ABOUT her. To speak TO her, say “Amma”.',
          'Pakai “shashuri” saat membicarakan beliau. Saat berbicara langsung, panggil “Amma”.',
        )),
        w('shoshur', 'father-in-law', 'ayah mertua', undefined, tr(
          'Use “shoshur” to talk ABOUT him. To speak TO him, say “Abba”.',
          'Pakai “shoshur” saat membicarakan beliau. Saat berbicara langsung, panggil “Abba”.',
        )),
        w('Bhaiya', 'elder brother (what you call him)', 'kakak laki-laki (panggilan)', undefined, tr(
          'Call any older man in the family “Bhaiya” — like “Mas” or “Kak”.',
          'Panggil laki-laki yang lebih tua di keluarga “Bhaiya” — seperti “Mas” atau “Kak”.',
        )),
        w('Apu', 'elder sister (what you call her)', 'kakak perempuan (panggilan)', undefined, tr(
          'Call Rafi’s elder sister “Apu” (or “Apa”). Careful: Bangla “apa” is a sister, not “what”!',
          'Panggil kakak perempuan Rafi “Apu” (atau “Apa”). Hati-hati: “apa” dalam bahasa Bangla artinya kakak perempuan, bukan kata tanya!',
        )),
        w('Bhabi', 'brother’s wife', 'kakak ipar perempuan (istri saudara)', '🧕', tr(
          'You are “Bhabi” to Rafi’s younger brothers and sisters.',
          'Kamu adalah “Bhabi” bagi adik-adik Rafi.',
        )),
        w('debor', 'husband’s younger brother', 'adik ipar laki-laki (adik suami)'),
      ],
      forms: [f('Nila Apu', 'Nila Apu (Rafi’s elder sister)', 'Nila Apu (kakak perempuan Rafi)')],
      sentences: [
        s('Uni amar shashuri.', 'She is my mother-in-law.', 'Beliau ibu mertua saya.'),
        s('Uni amar shoshur.', 'He is my father-in-law.', 'Beliau ayah mertua saya.'),
        s('Bhaiya, kemon achen?', 'Bhaiya, how are you?', 'Bhaiya, apa kabar?'),
        s('Apu, apni kemon achen?', 'Apu, how are you?', 'Apu, apa kabar?|Apu, bagaimana kabar Anda?'),
        s('Tanim amar debor.', 'Tanim is my brother-in-law.', 'Tanim adik ipar saya.'),
        s('Bhabi, Assalamu alaikum.', 'Bhabi, peace be upon you.|Bhabi, hello.', 'Bhabi, assalamualaikum.', 'm'),
        s('Amar shashuri khub bhalo.', 'My mother-in-law is very good.|My mother-in-law is very kind.', 'Ibu mertua saya sangat baik.|Ibu mertua saya baik sekali.'),
      ],
      chats: [
        chat('nila', 'Ki khobor? Kemon acho?', 'What’s up? How are you?', 'Apa kabar? Gimana kabarmu?', [
          ok('Bhalo achi, Apu. Apni kemon achen?', 'I’m fine, Apu. How are you?', 'Saya baik, Apu. Apa kabar Anda?'),
          no('Bhalo achi, Tanim. Tumi kemon acho?', 'I’m fine, Tanim. How are you?', 'Aku baik, Tanim. Kamu apa kabar?'),
          no('Uni amar shoshur.', 'He is my father-in-law.', 'Beliau ayah mertua saya.'),
        ]),
        chat('khala', 'Uni ke, ma?', 'Who is she, dear?', 'Beliau siapa, Nak?', [
          ok('Uni amar shashuri.', 'She is my mother-in-law.', 'Beliau ibu mertua saya.'),
          no('Tanim amar debor.', 'Tanim is my brother-in-law.', 'Tanim adik ipar saya.'),
          no('Bhaiya, kemon achen?', 'Bhaiya, how are you?', 'Bhaiya, apa kabar?'),
        ]),
      ],
    },
    {
      title: tr('Grandparents and children', 'Kakek-nenek dan anak-anak'),
      words: [
        w('Dada', 'grandfather (dad’s father)', 'kakek (ayah dari ayah)', '👴', tr(
          '“Dada” is grandpa — not the Indonesian “dada” (chest)!',
          '“Dada” artinya kakek — bukan “dada” bagian tubuh!',
        )),
        w('Dadi', 'grandmother (dad’s mother)', 'nenek (ibu dari ayah)', '👵'),
        w('Nana', 'grandfather (mum’s father)', 'kakek (ayah dari ibu)'),
        w('Nani', 'grandmother (mum’s mother)', 'nenek (ibu dari ibu)'),
        w('chele', 'boy, son', 'anak laki-laki', '👦'),
        w('bachcha', 'child, baby', 'anak kecil, bayi', '👶'),
      ],
      forms: [
        f('ar', 'and', 'dan'),
        f('shathe', 'with', 'dengan, bersama'),
        f('amader shathe', 'with us', 'bersama kami'),
        f('thaken', 'lives, stays (respectful)', 'tinggal (sopan)'),
        f('Indonesiay', 'in Indonesia', 'di Indonesia'),
        f('Apur', 'Apu’s', 'milik Apu'),
        f('mishti', 'sweet', 'manis'),
        f('Abbar', 'Abba’s', 'milik Abba'),
        f('Mitu', 'Mitu (Nila’s little daughter)', 'Mitu (putri kecil Nila)'),
        f('natbou', 'grandson’s wife (what Dadi calls you)', 'istri cucu (panggilan Dadi untukmu)'),
      ],
      sentences: [
        s('Dadi amader shathe thaken.', 'Dadi lives with us.|Grandma lives with us.', 'Dadi tinggal bersama kami.|Nenek tinggal bersama kami.'),
        s('Dada ar Dadi bhalo achen.', 'Dada and Dadi are well.|Grandpa and Grandma are well.', 'Dada dan Dadi baik-baik saja.|Kakek dan Nenek baik-baik saja.'),
        s('Amar Nani Indonesiay thaken.', 'My grandmother lives in Indonesia.|My Nani lives in Indonesia.', 'Nenek saya tinggal di Indonesia.'),
        s('Nila Apur ekta meye ache.', 'Nila Apu has a daughter.', 'Nila Apu punya seorang anak perempuan.'),
        s('Mitu khub mishti meye.', 'Mitu is a very sweet girl.', 'Mitu anak perempuan yang sangat manis.|Mitu anak yang manis sekali.'),
        s('Dadi, apni kemon achen?', 'Dadi, how are you?|Grandma, how are you?', 'Dadi, apa kabar?|Nenek, apa kabar?'),
        s('Tanim Abbar choto chele.', "Tanim is Abba's younger son.", 'Tanim putra Abba yang lebih muda.|Tanim anak laki-laki bungsu Abba.'),
      ],
      chats: [
        chat('dadi', 'Tumi kemon acho, natbou?', 'How are you, granddaughter-in-law?', 'Apa kabarmu, cucu menantu?', [
          ok('Bhalo achi, Dadi. Apni kemon achen?', 'I’m fine, Dadi. How are you?', 'Saya baik, Dadi. Apa kabar Anda?'),
          no('Bhalo achi, Dadi. Tumi kemon acho?', 'I’m fine, Dadi. How are you? (too casual for Dadi!)', 'Aku baik, Dadi. Kamu apa kabar? (terlalu akrab untuk Dadi!)'),
          no('Mitu khub mishti meye.', 'Mitu is a very sweet girl.', 'Mitu anak yang sangat manis.'),
        ]),
      ],
    },
    {
      title: tr('Who is this?', 'Ini siapa?'),
      words: [
        w('eta', 'this', 'ini', '👇'),
        w('ota', 'that', 'itu', '👉'),
        w('ora', 'they', 'mereka', '👥'),
        w('chobi', 'picture, photo', 'gambar, foto', '🖼️'),
        w('ekhane', 'here', 'di sini', '📌'),
      ],
      forms: [
        f('poribarer', 'of the family', '(milik) keluarga'),
        f('chobita', 'the picture', 'gambar itu, fotonya'),
        f('eta ke', 'who is this', 'ini siapa'),
        f('Mami', 'auntie: uncle’s wife (what Mitu calls you)', 'tante: istri paman (panggilan Mitu untukmu)'),
      ],
      sentences: [
        s('Eta ke?', 'Who is this?', 'Ini siapa?'),
        s('Ota ke?', 'Who is that?', 'Itu siapa?'),
        s('Eta amar Ma.', 'This is my mother.|This is my mum.', 'Ini ibu saya.|Ini ibuku.'),
        s('Ota amar choto bon.', 'That is my younger sister.', 'Itu adik perempuan saya.'),
        s('Eta amar poribarer chobi.', 'This is a picture of my family.|This is my family photo.', 'Ini foto keluarga saya.'),
        s('Ora amar bhai-bon.', 'They are my brothers and sisters.|They are my siblings.', 'Mereka saudara-saudara saya.|Mereka saudara kandung saya.'),
        s('Chobita khub shundor.', 'The picture is very beautiful.|The photo is very nice.', 'Fotonya sangat bagus.|Gambarnya indah sekali.'),
        s('Dadi ekhane thaken.', 'Dadi lives here.|Grandma lives here.', 'Dadi tinggal di sini.|Nenek tinggal di sini.'),
      ],
      chats: [
        chat('amma', 'Eta ke, ma?', 'Who is this, dear?', 'Ini siapa, Nak?', [
          ok('Eta amar Ma.', 'This is my mother.', 'Ini ibu saya.'),
          no('Ora amar bhai-bon.', 'They are my siblings.', 'Mereka saudara-saudara saya.'),
          no('Ota ke?', 'Who is that?', 'Itu siapa?'),
        ]),
        chat('mitu', 'Mami, ota ke?', 'Auntie, who is that?', 'Tante, itu siapa?', [
          ok('Ota amar choto bon.', 'That is my younger sister.', 'Itu adik perempuan saya.'),
          no('Eta ke?', 'Who is this?', 'Ini siapa?'),
          no('Uni amar shoshur.', 'He is my father-in-law.', 'Beliau ayah mertua saya.'),
        ]),
      ],
    },
  ],
  story: {
    title: tr('Dadi sees your family photo', 'Dadi melihat foto keluargamu'),
    steps: [
      line('dadi', 'Natbou, eta ki?', 'Granddaughter-in-law, what is this?', 'Cucu menantu, ini apa?'),
      line('you', 'Eta amar poribarer chobi, Dadi.', 'This is a picture of my family, Dadi.', 'Ini foto keluarga saya, Dadi.'),
      line('dadi', 'Accha! Eta ke?', 'I see! Who is this?', 'Oh begitu! Ini siapa?'),
      line('you', 'Eta amar Ma. Ar uni amar Abba.', 'This is my mother. And he is my father.', 'Ini ibu saya. Dan beliau ayah saya.'),
      ask(tr('What is Dadi looking at?', 'Apa yang dilihat Dadi?'), [
        tr('A photo of your family', 'Foto keluargamu'),
        tr('A photo of Rafi', 'Foto Rafi'),
        tr('A map of Indonesia', 'Peta Indonesia'),
      ], 0),
      line('dadi', 'Ota ke?', 'Who is that?', 'Itu siapa?'),
      line('you', 'Ota amar choto bon. Amra char bhai-bon.', 'That is my younger sister. We are four siblings.', 'Itu adik perempuan saya. Kami empat bersaudara.'),
      line('dadi', 'Mashallah! Tomar poribar khub shundor.', 'Mashallah! Your family is very beautiful.', 'Masya Allah! Keluargamu sangat indah.'),
      ask(tr('How many siblings are there in your family?', 'Berapa bersaudara keluargamu?'), [
        tr('Two', 'Dua'),
        tr('Four', 'Empat'),
        tr('Six', 'Enam'),
      ], 1),
      line('dadi', 'Tomar Nani kothay thaken?', 'Where does your grandmother live?', 'Nenekmu tinggal di mana?'),
      line('you', 'Amar Nani Indonesiay thaken.', 'My grandmother lives in Indonesia.', 'Nenek saya tinggal di Indonesia.'),
      line('dadi', 'Accha. Tumi khub bhalo meye.', 'I see. You are a very good girl.', 'Begitu. Kamu anak yang sangat baik.'),
      line('you', 'Dhonnobad, Dadi!', 'Thank you, Dadi!', 'Terima kasih, Dadi!'),
      ask(tr('Where does your Nani live?', 'Di mana Nani-mu tinggal?'), [
        tr('In Dhaka', 'Di Dhaka'),
        tr('With Dadi', 'Bersama Dadi'),
        tr('In Indonesia', 'Di Indonesia'),
      ], 2),
    ],
  },
  tips: [
    tip(tr('Call them what Rafi calls them', 'Panggil seperti Rafi memanggil'), tr(
      'Speak TO your in-laws the way your husband does: Amma, Abba, Apu, Bhaiya, Dadi. Words like shashuri (mother-in-law) and shoshur (father-in-law) are only for talking ABOUT them.',
      'Panggil mertua dan ipar seperti suamimu memanggil mereka: Amma, Abba, Apu, Bhaiya, Dadi. Kata seperti shashuri (ibu mertua) dan shoshur (ayah mertua) hanya untuk membicarakan mereka.',
    )),
    tip(tr('Never use an elder’s name', 'Jangan memanggil nama orang yang lebih tua'), tr(
      'Elders are always called by a family word, never by their name — even Rafi’s elder sister is “Apu”, not “Nila”. Younger ones like Tanim can be called by name.',
      'Orang yang lebih tua selalu dipanggil dengan sebutan keluarga, bukan namanya — kakak perempuan Rafi dipanggil “Apu”, bukan “Nila”. Yang lebih muda seperti Tanim boleh dipanggil namanya.',
    )),
    tip(tr('Boro and choto = kakak and adik', 'Boro dan choto = kakak dan adik'), tr(
      'Boro means big/elder and choto means small/younger: boro bon = kakak perempuan, choto bhai = adik laki-laki. And “Amra char bhai-bon” is exactly “Kami empat bersaudara”.',
      'Boro artinya besar/lebih tua dan choto artinya kecil/lebih muda: boro bon = kakak perempuan, choto bhai = adik laki-laki. Dan “Amra char bhai-bon” sama persis dengan “Kami empat bersaudara”.',
    )),
    tip(tr('Two sets of grandparents', 'Dua pasang kakek-nenek'), tr(
      'Dada and Dadi are your husband’s father’s parents; Nana and Nani are on the mother’s side. Indonesian uses Kakek and Nenek for both.',
      'Dada dan Dadi adalah orang tua dari ayah; Nana dan Nani dari pihak ibu. Bahasa Indonesia memakai Kakek dan Nenek untuk keduanya.',
    )),
    tip(tr('Careful: mama, dada, apa!', 'Hati-hati: mama, dada, apa!'), tr(
      'Never call your mother-in-law “Mama” — in Bangla, mama is your mother’s brother (uncle)! “Dada” is grandpa, and “Apa” is an elder sister. Little Mitu will call you “Mami” — Rafi is her mama (uncle), so you are her mami.',
      'Jangan panggil ibu mertuamu “Mama” — dalam bahasa Bangla, mama adalah saudara laki-laki ibu (paman)! “Dada” adalah kakek, dan “Apa” adalah kakak perempuan. Mitu kecil akan memanggilmu “Mami” — Rafi adalah mama (paman)-nya, jadi kamu adalah mami-nya.',
    )),
  ],
};
