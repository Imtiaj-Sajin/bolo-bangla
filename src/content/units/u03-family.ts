import { ask, chat, f, line, no, ok, s, tip, tr, w } from '../dsl';
import type { UnitDef } from '../types';

export const u03: UnitDef = {
  id: 'u03',
  title: tr('My new family', 'Keluarga baruku'),
  goal: tr(
    'Call every relative the right way, talk about brothers, sisters, grandparents, aunts and uncles, and ask “who is this?”.',
    'Memanggil setiap kerabat dengan benar, bercerita tentang saudara, kakek-nenek, bibi dan paman, dan bertanya “ini siapa?”.',
  ),
  lessons: [
    {
      title: tr('Brothers and sisters', 'Kakak dan adik'),
      words: [
        w('bhai', 'brother', 'saudara laki-laki', '🧑'),
        w('bon', 'sister', 'saudara perempuan', '👧', tr(
          'You never call someone “bon” — an elder sister is called “Apu”.',
          'Kakak perempuan tidak dipanggil “bon”, tapi “Apu”.',
        )),
        w('boro', 'big; elder', 'besar; lebih tua', '🐘'),
        w('choto', 'small; younger', 'kecil; lebih muda', '🐭'),
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
        f('Nila Apu', 'Nila (Rafi’s elder sister)', 'Kak Nila (kakak perempuan Rafi)'),
      ],
      sentences: [
        s('Tanim Rafir choto bhai.', "Tanim is Rafi's younger brother.", 'Tanim adik laki-laki Rafi.'),
        s('Nila Apu Rafir boro bon.', "Nila is Rafi's elder sister.", 'Kak Nila kakak perempuan Rafi.'),
        s('Amar ekta choto bon ache.', 'I have a younger sister.|I have one younger sister.', 'Saya punya seorang adik perempuan.|Saya punya satu adik perempuan.'),
        s('Amader poribar khub boro.', 'Our family is very big.', 'Keluarga kami besar sekali.|Keluarga kami sangat besar.'),
        s('Amra char bhai-bon.', 'We are four siblings.|We are four brothers and sisters.', 'Kami empat bersaudara.'),
        s('Apnar poribar kemon ache?|Tomar poribar kemon ache?', 'How is your family?', 'Bagaimana kabar keluarga Anda?'),
        s('Tanim khub bhalo chele.', 'Tanim is a very good boy.', 'Tanim anak yang sangat baik.|Tanim anak laki-laki yang baik sekali.'),
      ],
      chats: [
        chat('tanim', 'Bhabi, tomar bhai-bon ache?', 'Do you have brothers and sisters?', 'Kak, Kakak punya saudara?', [
          ok('Ha, amar ekta choto bon ache.', 'Yes, I have a younger sister.', 'Iya, aku punya seorang adik perempuan.'),
          no('Tanim Rafir choto bhai.', "Tanim is Rafi's younger brother.", 'Tanim adik laki-laki Rafi.'),
          no('Apnar poribar kemon ache?', 'How is your family?', 'Bagaimana kabar keluarga Anda?'),
        ]),
      ],
    },
    {
      title: tr('Calling your in-laws', 'Memanggil ipar dan mertua'),
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
          'Call Rafi’s elder brother and older male cousins “Bhaiya” (or “Bhaijan”) — like “Mas” or “Kak”. Older men are Chacha, Mama, Khalu or Fufa.',
          'Panggil kakak laki-laki Rafi dan sepupu laki-laki yang lebih tua “Bhaiya” (atau “Bhaijan”) — seperti “Mas” atau “Kak”. Laki-laki yang lebih tua lagi dipanggil Chacha, Mama, Khalu, atau Fufa.',
        )),
        w('Apu', 'elder sister (what you call her)', 'kakak perempuan (panggilan)', undefined, tr(
          'Call Rafi’s elder sister “Apu” (or “Apa”) — never by her name. Careful: Bangla “apa” is a sister, not “what”!',
          'Panggil kakak perempuan Rafi “Apu” (atau “Apa”) — jangan namanya. Hati-hati: “apa” dalam bahasa Bangla artinya kakak perempuan, bukan kata tanya!',
        )),
        w('Bhabi', 'sister-in-law (brother’s wife)', 'kakak ipar perempuan (istri saudara)', '🧕', tr(
          'You are “Bhabi” to Rafi’s younger brothers and sisters. You also call the wife of Rafi’s elder brother “Bhabi”.',
          'Kamu adalah “Bhabi” bagi adik-adik Rafi. Kamu juga memanggil istri kakak laki-laki Rafi “Bhabi”.',
        )),
        w('Dulabhai', 'brother-in-law (sister’s husband)', 'kakak ipar laki-laki (suami kakak)', undefined, tr(
          'Call Nila Apu’s husband “Dulabhai”.',
          'Panggil suami Kak Nila “Dulabhai”.',
        )),
      ],
      forms: [
        f('debor', 'husband’s younger brother', 'adik ipar laki-laki (adik suami)'),
        f('nonod', 'husband’s sister', 'ipar perempuan (saudari suami)'),
        f('ki hon', 'how (is he/she) related', 'siapanya'),
        f('apnar ki hon', 'how is (she) related to you', 'siapanya Anda'),
      ],
      sentences: [
        s('Uni amar shashuri.', 'She is my mother-in-law.', 'Beliau ibu mertua saya.'),
        s('Uni amar shoshur.', 'He is my father-in-law.', 'Beliau ayah mertua saya.'),
        s('Bhaiya, kemon achen?|Bhai, kemon achen?', 'Brother, how are you?', 'Mas, apa kabar?'),
        s('Apu, apni kemon achen?', 'Sister, how are you?', 'Kak, apa kabar?'),
        s('Tanim amar debor.', 'Tanim is my brother-in-law.', 'Tanim adik ipar saya.'),
        s('Assalamu alaikum, Bhabi.|Assalamu alaikum, Apu.', 'Peace be upon you, sister-in-law.', 'Assalamualaikum, Kak.', 'tanim'),
        s('Dulabhai, apni bhalo achen?|Bhaiya, apni bhalo achen?', 'Brother-in-law, are you well?', 'Mas, sehat-sehat saja?'),
        s('Nila Apu amar nonod.', "Nila is my husband's sister.", 'Kak Nila kakak ipar saya.'),
      ],
      chats: [
        chat('nila', 'Ki khobor? Kemon acho?', 'What’s up? How are you?', 'Apa kabar? Gimana kabarmu?', [
          ok('Bhalo achi, Apu. Apni kemon achen?', 'I’m fine, sister. How are you?', 'Saya baik, Kak. Kakak apa kabar?'),
          no('Bhalo achi, Tanim. Tumi kemon acho?', 'I’m fine, Tanim. How are you?', 'Aku baik, Tanim. Kamu apa kabar?'),
          no('Uni amar shoshur.', 'He is my father-in-law.', 'Beliau ayah mertua saya.'),
        ]),
        chat('doctor', 'Uni apnar ki hon?', 'How is she related to you?', 'Beliau siapanya Anda?', [
          ok('Uni amar shashuri.', 'She is my mother-in-law.', 'Beliau ibu mertua saya.'),
          no('Tanim amar debor.', 'Tanim is my brother-in-law.', 'Tanim adik ipar saya.'),
          no('Bhaiya, kemon achen?', 'Brother, how are you?', 'Mas, apa kabar?'),
        ]),
      ],
    },
    {
      title: tr('Grandparents and children', 'Kakek-nenek dan anak-anak'),
      words: [
        w('Dada', 'grandfather (Dad’s father)', 'kakek (ayah dari ayah)', '👴', tr(
          '“Dada” is grandpa — not the Indonesian “dada” (chest)!',
          '“Dada” artinya kakek — bukan “dada” bagian tubuh!',
        )),
        w('Dadi', 'grandmother (Dad’s mother)', 'nenek (ibu dari ayah)', '👵'),
        w('Nana', 'grandfather (Mom’s father)', 'kakek (ayah dari ibu)'),
        w('Nani', 'grandmother (Mom’s mother)', 'nenek (ibu dari ibu)'),
        w('chele', 'boy, son', 'anak laki-laki', '👦'),
        w('baccha', 'child, baby', 'anak kecil, bayi', '👶'),
      ],
      forms: [
        f('ar', 'and', 'dan'),
        f('shathe', 'with', 'dengan, bersama'),
        f('amader shathe', 'with us', 'bersama kami'),
        f('thaken', 'lives, stays (respectful)', 'tinggal (sopan)'),
        f('Indonesiay', 'in Indonesia', 'di Indonesia'),
        f('Nana-Nani', 'grandparents on Mom’s side', 'kakek-nenek dari pihak ibu'),
        f('Apur', 'Apu’s', 'milik Kakak'),
        f('mishti', 'sweet; sweets', 'manis; kue manis'),
        f('Abbar', 'Dad’s', 'milik Ayah'),
        f('Mitu', 'Mitu (Nila’s little daughter)', 'Mitu (putri kecil Kak Nila)'),
        f('natbou', 'grandson’s wife (what Dadi calls you)', 'istri cucu (panggilan Nenek untukmu)'),
      ],
      sentences: [
        s('Dadi amader shathe thaken.', 'Grandma lives with us.', 'Nenek tinggal bersama kami.'),
        s('Dada ar Dadi bhalo achen.', 'Grandpa and Grandma are well.', 'Kakek dan Nenek baik-baik saja.'),
        s('Nana ar Nani kemon achen?', "How are your grandparents on your mother's side?|How are your mother's parents?", 'Bagaimana kabar kakek-nenekmu dari pihak ibu?'),
        s('Amar Nana-Nani Indonesiay thaken.', "My mother's parents live in Indonesia.|My grandparents live in Indonesia.", 'Kakek dan nenek saya dari pihak ibu tinggal di Indonesia.|Kakek-nenek saya tinggal di Indonesia.'),
        s('Nila Apur ekta meye ache.', 'Nila has a daughter.|Nila has one daughter.', 'Kak Nila punya seorang anak perempuan.'),
        s('Mitu khub mishti baccha.', 'Mitu is a very sweet child.', 'Mitu anak yang manis sekali.'),
        s('Dadi, apni kemon achen?', 'Grandma, how are you?', 'Nenek apa kabar?|Nek, apa kabar?'),
        s('Tanim Abbar choto chele.', "Tanim is Dad's youngest son.|Tanim is Dad's younger son.", 'Tanim anak bungsu Ayah.'),
      ],
      chats: [
        chat('dadi', 'Tumi kemon acho, natbou?', 'How are you?', 'Apa kabar, Cu?', [
          ok('Bhalo achi, Dadi. Apni kemon achen?', 'I’m fine, Grandma. How are you?', 'Saya baik, Nek. Nenek apa kabar?'),
          no('Bhalo achi, Dadi. Tumi kemon acho?', 'I’m fine, Grandma. How are you? (too casual for Grandma!)', 'Aku baik, Nek. Kamu apa kabar? (terlalu akrab untuk Nenek!)'),
          no('Mitu khub mishti baccha.', 'Mitu is a very sweet child.', 'Mitu anak yang manis sekali.'),
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
        f('chobita', 'the picture', 'foto itu, fotonya'),
        f('eta ke', 'who is this', 'ini siapa'),
        f('Mami', 'Auntie (what Mitu calls you)', 'Tante (panggilan Mitu untukmu)'),
        f('Ma', 'mother', 'ibu'),
      ],
      sentences: [
        s('Eta ke?', 'Who is this?', 'Ini siapa?'),
        s('Ota ke?', 'Who is that?', 'Itu siapa?'),
        s('Eta amar Ma.', 'This is my mother.|This is my mom.', 'Ini ibu saya.|Ini ibuku.'),
        s('Ota amar choto bon.', 'That is my younger sister.', 'Itu adik perempuan saya.'),
        s('Eta amar poribarer chobi.', 'This is a picture of my family.|This is my family photo.', 'Ini foto keluarga saya.'),
        s('Ora amar bhai-bon.', 'They are my brothers and sisters.|They are my siblings.', 'Mereka saudara-saudara saya.|Mereka saudara kandung saya.'),
        s('Chobita khub shundor.', 'The picture is very beautiful.|The photo is very nice.', 'Fotonya bagus sekali.|Fotonya indah sekali.'),
        s('Dadi ekhane thaken.', 'Grandma lives here.', 'Nenek tinggal di sini.'),
      ],
      chats: [
        chat('amma', 'Eta ke, bouma?', 'Who is this?', 'Ini siapa, Nak?', [
          ok('Eta amar Ma.', 'This is my mother.', 'Ini ibu saya.'),
          no('Ora amar bhai-bon.', 'They are my siblings.', 'Mereka saudara-saudara saya.'),
          no('Ota ke?', 'Who is that?', 'Itu siapa?'),
        ]),
        chat('mitu', 'Mami, ota ke?', 'Auntie, who is that?', 'Tante, itu siapa?', [
          ok('Ota amar choto bon.', 'That is my younger sister.', 'Itu adik perempuan Tante.'),
          no('Eta ke?', 'Who is this?', 'Ini siapa?'),
          no('Uni amar shoshur.', 'He is my father-in-law.', 'Beliau ayah mertua saya.'),
        ]),
      ],
    },
    {
      title: tr('Aunts and uncles', 'Bibi dan paman'),
      words: [
        w('Chacha', 'uncle (Dad’s younger brother)', 'paman (adik laki-laki ayah)', '🧔', tr(
          'Dad’s elder brother is usually called “Boro Abba” or “Boro Chacha”.',
          'Kakak laki-laki ayah biasanya dipanggil “Boro Abba” atau “Boro Chacha”.',
        )),
        w('Chachi', 'aunt (Dad’s brother’s wife)', 'bibi (istri saudara laki-laki ayah)'),
        w('Khala', 'aunt (Mom’s sister)', 'bibi (saudara perempuan ibu)', '👩‍🦱'),
        w('Khalu', 'uncle (Mom’s sister’s husband)', 'paman (suami saudara perempuan ibu)'),
        w('Fufu', 'aunt (Dad’s sister)', 'bibi (saudara perempuan ayah)'),
        w('Mama', 'uncle (Mom’s brother)', 'paman (saudara laki-laki ibu)', undefined, tr(
          '“Mama” is Mom’s BROTHER — never call your mother-in-law “Mama”!',
          '“Mama” adalah saudara laki-laki IBU — jangan panggil ibu mertuamu “Mama”!',
        )),
      ],
      forms: [
        f('Ammar', 'Mom’s', 'milik Ibu'),
        f('Mitur', 'Mitu’s', 'milik Mitu'),
        f('ranna koren', 'cooks (respectful)', 'memasak (sopan)'),
        f('ranna', 'cooking', 'masakan, memasak'),
      ],
      sentences: [
        s('Chacha Abbar choto bhai.', "Uncle is Dad's younger brother.", 'Paman adik laki-laki Ayah.'),
        s('Chachi khub bhalo ranna koren.|Khala khub bhalo ranna koren.|Fufu khub bhalo ranna koren.', 'Auntie cooks very well.', 'Bibi pintar sekali memasak.'),
        s('Khala Ammar boro bon.', "Auntie is Mom's elder sister.", 'Bibi kakak perempuan Ibu.'),
        s('Assalamu alaikum, Khalu.|Assalamu alaikum, Chacha.|Assalamu alaikum, Mama.', 'Peace be upon you, Uncle.', 'Assalamualaikum, Paman.'),
        s('Fufu Abbar bon.', "Auntie is Dad's sister.", 'Bibi saudara perempuan Ayah.'),
        s('Rafi Mitur Mama.', "Rafi is Mitu's uncle.", 'Rafi paman Mitu.'),
        s('Ami Mitur Mami.', "I am Mitu's auntie.", 'Saya tante Mitu.'),
      ],
      chats: [
        chat('chacha', 'Bouma, kemon acho?', 'How are you?', 'Apa kabar, Nak?', [
          ok('Bhalo achi, Chacha. Apni kemon achen? Chachi kemon achen?', 'I’m fine, Uncle. How are you? How is Auntie?', 'Saya baik, Paman. Paman apa kabar? Bibi bagaimana kabarnya?'),
          no('Bhalo achi, Chacha. Tumi kemon acho?', 'I’m fine, Uncle. How are you? (too casual for Uncle!)', 'Aku baik, Paman. Kamu apa kabar? (terlalu akrab untuk Paman!)'),
          no('Rafi Mitur Mama.', "Rafi is Mitu's uncle.", 'Rafi paman Mitu.'),
        ]),
      ],
    },
  ],
  story: {
    title: tr('Grandma sees your family photo', 'Nenek melihat foto keluargamu'),
    steps: [
      line('dadi', 'Natbou, eta ki?', 'What is this?', 'Cu, ini apa?'),
      line('you', 'Eta amar poribarer chobi, Dadi.', 'This is a picture of my family, Grandma.', 'Ini foto keluarga saya, Nek.'),
      line('dadi', 'Accha! Eta ke?', 'I see! Who is this?', 'Oh begitu! Ini siapa?'),
      line('you', 'Eta amar Ma. Ar eta amar Abba.', 'This is my mother. And this is my father.', 'Ini ibu saya. Dan ini ayah saya.'),
      ask(tr('What is Grandma looking at?', 'Apa yang dilihat Nenek?'), [
        tr('A photo of your family', 'Foto keluargamu'),
        tr('A photo of Rafi', 'Foto Rafi'),
        tr('A map of Indonesia', 'Peta Indonesia'),
      ], 0),
      line('dadi', 'Ota ke?', 'Who is that?', 'Itu siapa?'),
      line('you', 'Ota amar choto bon. Amra char bhai-bon.', 'That is my younger sister. We are four siblings.', 'Itu adik perempuan saya. Kami empat bersaudara.'),
      line('dadi', 'Mashallah! Tomar poribar khub shundor.', 'Mashallah! Your family is lovely.', 'Masya Allah! Keluargamu cakep-cakep semua.'),
      ask(tr('How many siblings are you?', 'Kamu berapa bersaudara?'), [
        tr('Two', 'Dua'),
        tr('Four', 'Empat'),
        tr('Six', 'Enam'),
      ], 1),
      line('dadi', 'Tomar Nana-Nani kothay thaken?', 'Where do your mother’s parents live?', 'Kakek-nenekmu dari pihak ibu tinggal di mana?'),
      line('you', 'Amar Nana-Nani Indonesiay thaken.', 'My mother’s parents live in Indonesia.', 'Kakek dan nenek saya dari pihak ibu tinggal di Indonesia.'),
      line('dadi', 'Accha. Tumi khub bhalo meye.', 'I see. You are a very good girl.', 'Begitu. Kamu anak yang baik sekali.'),
      line('you', 'Dhonnobad, Dadi!', 'Thank you, Grandma!', 'Terima kasih, Nek!'),
      ask(tr('Where do your mother’s parents live?', 'Di mana kakek-nenekmu dari pihak ibu tinggal?'), [
        tr('In Dhaka', 'Di Dhaka'),
        tr('With Grandma', 'Bersama Nenek'),
        tr('In Indonesia', 'Di Indonesia'),
      ], 2),
    ],
  },
  tips: [
    tip(tr('Call them what Rafi calls them', 'Panggil seperti Rafi memanggil'), tr(
      'Speak TO your in-laws the way your husband does: Amma, Abba, Apu, Bhaiya, Dadi. Words like shashuri (mother-in-law) and shoshur (father-in-law) are only for talking ABOUT them. Many families say Ammu/Abbu or Ma/Baba instead — copy Rafi.',
      'Panggil mertua dan ipar seperti suamimu memanggil mereka: Amma, Abba, Apu, Bhaiya, Dadi. Kata seperti shashuri (ibu mertua) dan shoshur (ayah mertua) hanya untuk membicarakan mereka. Banyak keluarga memakai Ammu/Abbu atau Ma/Baba — tiru saja Rafi.',
    )),
    tip(tr('Never use an elder’s name', 'Jangan memanggil nama orang yang lebih tua'), tr(
      'Elders are always called by a family word, never by name — even Rafi’s elder sister is “Apu” or “Nila Apu”, not “Nila”. Younger ones like Tanim can be called by name. In front of elders, many wives don’t say their husband’s name either; to Amma they say “apnar chele” (your son).',
      'Orang yang lebih tua selalu dipanggil dengan sebutan keluarga, bukan namanya — kakak Rafi dipanggil “Apu” atau “Nila Apu”, bukan “Nila”. Yang lebih muda seperti Tanim boleh dipanggil namanya. Di depan orang tua, banyak istri juga tidak menyebut nama suaminya; kepada Amma mereka bilang “apnar chele” (anak Ibu).',
    )),
    tip(tr('Boro and choto = kakak and adik', 'Boro dan choto = kakak dan adik'), tr(
      'Boro means big/elder and choto means small/younger: boro bon = kakak perempuan, choto bhai = adik laki-laki. And “Amra char bhai-bon” is exactly “Kami empat bersaudara”.',
      'Boro artinya besar/lebih tua dan choto artinya kecil/lebih muda: boro bon = kakak perempuan, choto bhai = adik laki-laki. Dan “Amra char bhai-bon” sama persis dengan “Kami empat bersaudara”.',
    )),
    tip(tr('Dad’s side and Mom’s side', 'Pihak ayah dan pihak ibu'), tr(
      'Bangla names relatives by side. Dad’s side: Dada, Dadi (grandparents), Chacha + Chachi, Fufu. Mom’s side: Nana, Nani (grandparents), Mama + Mami, Khala + Khalu. Indonesian uses Kakek, Nenek, Paman and Bibi for both sides.',
      'Bahasa Bangla membedakan kerabat menurut pihaknya. Pihak ayah: Dada, Dadi (kakek-nenek), Chacha + Chachi, Fufu. Pihak ibu: Nana, Nani (kakek-nenek), Mama + Mami, Khala + Khalu. Bahasa Indonesia memakai Kakek, Nenek, Paman, dan Bibi untuk kedua pihak.',
    )),
    tip(tr('Careful: mama, dada, apa!', 'Hati-hati: mama, dada, apa!'), tr(
      'Never call your mother-in-law “Mama” — in Bangla, mama is Mom’s brother (uncle)! “Dada” is grandpa, and “Apa” is an elder sister. Little Mitu calls you “Mami”: Rafi is her mama (uncle), so you are her mami. You also call the wife of Rafi’s own Mama “Mami”.',
      'Jangan panggil ibu mertuamu “Mama” — dalam bahasa Bangla, mama adalah saudara laki-laki ibu (paman)! “Dada” adalah kakek, dan “Apa” adalah kakak perempuan. Mitu kecil memanggilmu “Mami”: Rafi adalah mama (paman)-nya, jadi kamu adalah mami-nya. Istri dari Mama-nya Rafi juga kamu panggil “Mami”.',
    )),
  ],
};
