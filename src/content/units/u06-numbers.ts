import { ask, chat, f, line, no, ok, s, tip, tr, w } from '../dsl';
import type { UnitDef } from '../types';

export const u06: UnitDef = {
  id: 'u06',
  title: tr('Numbers and money', 'Angka dan uang'),
  goal: tr(
    'Count to ten and in tens, ask “how many?” and “how much?”, and understand prices in taka.',
    'Berhitung sampai sepuluh dan puluhan, bertanya “berapa?” dan “berapa harganya?”, dan memahami harga dalam taka.',
  ),
  forms: [
    f('Mama', 'uncle; also how people call a tea seller or rickshaw driver', 'paman; juga panggilan untuk penjual teh atau tukang becak'),
    f('apa', 'sister (polite way to address a woman)', 'kakak/mbak (sapaan sopan untuk perempuan)'),
    f('cup', 'cup', 'cangkir'),
    f('chollish', 'forty', 'empat puluh'),
    f('ferot', 'back (as change)', 'kembali (uang kembalian)'),
    f('duijon', 'two (people)', 'dua (orang)'),
  ],
  lessons: [
    {
      title: tr('One to five', 'Satu sampai lima'),
      words: [
        w('ek', 'one', 'satu', '1️⃣'),
        w('dui', 'two', 'dua', '2️⃣'),
        w('tin', 'three', 'tiga', '3️⃣'),
        w('char', 'four', 'empat', '4️⃣'),
        w('pach', 'five', 'lima', '5️⃣'),
      ],
      forms: [
        f('duita', 'two (things)', 'dua (buah)'),
        f('pachjon', 'five (people)', 'lima (orang)'),
        f('koyta', 'how many (things)', 'berapa (buah)'),
        f('boyosh', 'age', 'umur'),
        f('bochor', 'year(s)', 'tahun'),
        f('Mitur', 'Mitu’s', 'milik Mitu'),
      ],
      sentences: [
        s('Ek, dui, tin, char, pach.', 'One, two, three, four, five.', 'Satu, dua, tiga, empat, lima.'),
        s('Amar dui bhai ache.', 'I have two brothers.', 'Saya punya dua saudara laki-laki.'),
        s('Ek cup cha din.', 'Please give me one cup of tea.|One cup of tea, please.', 'Tolong beri satu cangkir teh.|Teh satu cangkir, ya.'),
        s('Duita dim din.', 'Please give me two eggs.|Two eggs, please.', 'Tolong beri dua telur.|Minta dua telur.'),
        s('Amra pachjon.', 'There are five of us.|We are five people.', 'Kami berlima.'),
        s('Mitur boyosh char bochor.', 'Mitu is four years old.', 'Mitu berumur empat tahun.|Umur Mitu empat tahun.'),
      ],
      chats: [
        chat('amma', 'Tumi koyta dim khabe?', 'How many eggs will you eat?', 'Kamu mau makan berapa telur?', [
          ok('Duita dim khabo, Amma.', 'I will eat two eggs, Amma.', 'Saya mau dua telur, Amma.'),
          no('Mitur boyosh char bochor.', 'Mitu is four years old.', 'Mitu berumur empat tahun.'),
          no('Amra pachjon.', 'There are five of us.', 'Kami berlima.'),
        ]),
      ],
    },
    {
      title: tr('Six to ten', 'Enam sampai sepuluh'),
      words: [
        w('choy', 'six', 'enam', '6️⃣'),
        w('shat', 'seven', 'tujuh', '7️⃣'),
        w('at', 'eight', 'delapan', '8️⃣'),
        w('noy', 'nine', 'sembilan', '9️⃣'),
        w('dosh', 'ten', 'sepuluh', '🔟'),
      ],
      forms: [
        f('noyjon', 'nine (people)', 'sembilan (orang)'),
        f('thake', 'live, stay', 'tinggal'),
        f('barite', 'at home, in the house', 'di rumah'),
        f('shoptahe', 'in a week', 'dalam seminggu'),
        f('shat din', 'seven days', 'tujuh hari'),
        f('atta', 'eight (things)', 'delapan (buah)'),
        f('porjonto', 'up to, until', 'sampai'),
        f('gunte', 'to count', 'berhitung, menghitung'),
      ],
      sentences: [
        s('Choy, shat, at, noy, dosh.', 'Six, seven, eight, nine, ten.', 'Enam, tujuh, delapan, sembilan, sepuluh.'),
        s('Dosh taka.', 'Ten taka.', 'Sepuluh taka.'),
        s('Ek shoptahe shat din.', 'A week has seven days.|There are seven days in a week.', 'Seminggu ada tujuh hari.'),
        s('Amader barite noyjon thake.', 'Nine people live in our house.', 'Sembilan orang tinggal di rumah kami.'),
        s('Ami atta mishti khabo!', 'I will eat eight sweets!', 'Aku mau makan delapan kue manis!'),
        s('Ami dosh porjonto gunte pari.', 'I can count to ten.', 'Saya bisa berhitung sampai sepuluh.'),
      ],
      chats: [
        chat('mitu', 'Mami, tumi dosh porjonto gunte paro?', 'Auntie, can you count to ten?', 'Tante, bisa berhitung sampai sepuluh?', [
          ok('Ji! Ek, dui, tin, char, pach, choy, shat, at, noy, dosh!', 'Yes! One, two, three, four, five, six, seven, eight, nine, ten!', 'Bisa! Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh!'),
          no('Duita dim din.', 'Two eggs, please.', 'Minta dua telur.'),
          no('Amra pachjon.', 'There are five of us.', 'Kami berlima.'),
        ]),
      ],
    },
    {
      title: tr('How many?', 'Berapa?'),
      words: [
        w('koyjon', 'how many (people)', 'berapa (orang)', '👥'),
        w('koto', 'how much, how many', 'berapa', '❓'),
        w('manush', 'person, people', 'orang, manusia', '🧍', tr('Like Indonesian “manusia”.', 'Seperti “manusia”.')),
        w('boyosh', 'age', 'umur', '🎂'),
        w('bochor', 'year', 'tahun', '📅'),
      ],
      forms: [
        f('apnara', 'you (plural, respectful)', 'Anda sekalian'),
        f('tomra', 'you (plural, familiar)', 'kalian'),
        f('koy', 'how many', 'berapa'),
        f('charjon', 'four (people)', 'empat (orang)'),
        f('Tanimer', 'Tanim’s', 'milik Tanim'),
        f('bish', 'twenty', 'dua puluh'),
      ],
      sentences: [
        s('Apnara koyjon?', 'How many of you are there?', 'Anda sekalian berapa orang?|Kalian berapa orang?'),
        s('Amra charjon.', 'There are four of us.|We are four people.', 'Kami berempat.'),
        s('Tomra koy bhai-bon?', 'How many brothers and sisters are you?|How many siblings are you?', 'Kalian berapa bersaudara?'),
        s('Tomar boyosh koto?', 'How old are you?', 'Berapa umurmu?|Umurmu berapa?'),
        s('Tanimer boyosh bish bochor.', 'Tanim is twenty years old.', 'Tanim berumur dua puluh tahun.|Umur Tanim dua puluh tahun.'),
        s('Barite koyjon manush thake?', 'How many people live at home?|How many people live in the house?', 'Berapa orang tinggal di rumah?'),
      ],
      chats: [
        chat('khala', 'Tomra koy bhai-bon, ma?', 'How many brothers and sisters are you, dear?', 'Kalian berapa bersaudara, Nak?', [
          ok('Amra char bhai-bon, Khala.', 'We are four siblings, Khala.', 'Kami empat bersaudara, Khala.'),
          no('Mitur boyosh char bochor.', 'Mitu is four years old.', 'Mitu berumur empat tahun.'),
          no('Ami jani na.', "I don't know.", 'Saya tidak tahu.'),
        ]),
      ],
    },
    {
      title: tr('Taka', 'Taka'),
      words: [
        w('taka', 'taka (money)', 'taka (uang)', '💵', tr('The Bangladeshi currency. Also just means “money”.', 'Mata uang Bangladesh. Juga berarti “uang”.')),
        w('eksho', 'one hundred', 'seratus'),
        w('ponchash', 'fifty', 'lima puluh'),
        w('bish', 'twenty', 'dua puluh'),
        w('dam', 'price', 'harga', '🏷️'),
        w('beshi', 'too much, more', 'terlalu, lebih', '🔼'),
      ],
      forms: [
        f('koto taka', 'how much (money)', 'berapa taka, berapa harganya'),
        f('pachsho', 'five hundred', 'lima ratus'),
        f('kache', 'with (someone), near', 'pada, dekat'),
        f('amar kache', 'I have (with me)', 'saya punya (bawa)'),
      ],
      sentences: [
        s('Eta koto taka?', 'How much is this?|How many taka is this?', 'Ini berapa taka?|Ini harganya berapa?'),
        s('Bish taka.', 'Twenty taka.', 'Dua puluh taka.'),
        s('Ponchash taka din.', 'Please give fifty taka.|Give me fifty taka, please.', 'Tolong beri lima puluh taka.'),
        s('Eksho taka.', 'One hundred taka.|A hundred taka.', 'Seratus taka.'),
        s('Dam koto?', 'What is the price?|How much does it cost?', 'Harganya berapa?'),
        s('Dam khub beshi!', "The price is too high!|It's too expensive!", 'Harganya terlalu mahal!|Mahal sekali!'),
        s('Amar kache dosh taka ache.', 'I have ten taka.|I have ten taka with me.', 'Saya punya sepuluh taka.|Saya bawa sepuluh taka.'),
        s('Pachsho taka.', 'Five hundred taka.', 'Lima ratus taka.'),
      ],
      chats: [
        chat('dokandar', 'Eksho taka, apa.', 'One hundred taka, sister.', 'Seratus taka, Mbak.', [
          ok('Eksho taka? Dam khub beshi!', 'One hundred taka? That’s too expensive!', 'Seratus taka? Mahal sekali!'),
          no('Ek, dui, tin.', 'One, two, three.', 'Satu, dua, tiga.'),
          no('Amra charjon.', 'There are four of us.', 'Kami berempat.'),
        ]),
        chat('rafi', 'Tomar kache koto taka ache?', 'How much money do you have?', 'Kamu punya uang berapa?', [
          ok('Amar kache pachsho taka ache.', 'I have five hundred taka.', 'Aku punya lima ratus taka.'),
          no('Dam koto?', 'What is the price?', 'Harganya berapa?'),
          no('Tomar boyosh koto?', 'How old are you?', 'Umurmu berapa?'),
        ]),
      ],
    },
  ],
  story: {
    title: tr('Tea at the tea stall', 'Minum teh di warung teh'),
    steps: [
      line('rafi', 'Mama, ek cup cha koto?', 'Uncle, how much is one cup of tea?', 'Pak, satu cangkir teh berapa?'),
      line('dokandar', 'Bish taka, bhai.', 'Twenty taka, brother.', 'Dua puluh taka, Mas.'),
      line('you', 'Amra duijon. Dui cup cha din.', 'There are two of us. Two cups of tea, please.', 'Kami berdua. Tolong dua cangkir teh.'),
      ask(tr('How much is one cup of tea?', 'Berapa harga satu cangkir teh?'), [
        tr('Ten taka', 'Sepuluh taka'),
        tr('Twenty taka', 'Dua puluh taka'),
        tr('Fifty taka', 'Lima puluh taka'),
      ], 1),
      line('dokandar', 'Accha, apa. Chollish taka.', 'Okay, sister. Forty taka.', 'Baik, Mbak. Empat puluh taka.'),
      line('rafi', 'Tomar kache taka ache?', 'Do you have money?', 'Kamu bawa uang?'),
      line('you', 'Ji, amar kache ponchash taka ache.', 'Yes, I have fifty taka.', 'Iya, aku punya lima puluh taka.'),
      ask(tr('How many cups of tea do you order?', 'Berapa cangkir teh yang kamu pesan?'), [
        tr('One', 'Satu'),
        tr('Four', 'Empat'),
        tr('Two', 'Dua'),
      ], 2),
      line('dokandar', 'Dhonnobad, apa! Dosh taka ferot.', 'Thank you, sister! Ten taka back.', 'Terima kasih, Mbak! Kembalian sepuluh taka.'),
      line('you', 'Dhonnobad, bhai.', 'Thank you, brother.', 'Terima kasih, Mas.'),
      ask(tr('How much change do you get?', 'Berapa uang kembalianmu?'), [
        tr('Ten taka', 'Sepuluh taka'),
        tr('Twenty taka', 'Dua puluh taka'),
        tr('Nothing', 'Tidak ada'),
      ], 0),
    ],
  },
  tips: [
    tip(tr('-ta for things, -jon for people', '-ta untuk benda, -jon untuk orang'), tr(
      'Bangla adds a counting word, just like Indonesian “sebuah / seorang”: duita dim (two eggs), but duijon manush (two people). “Amra charjon” = “Kami berempat”.',
      'Bahasa Bangla memakai kata penggolong, seperti “sebuah / seorang”: duita dim (dua butir telur), tapi duijon manush (dua orang). “Amra charjon” = “Kami berempat”.',
    )),
    tip(tr('Koto, koyta, koyjon', 'Koto, koyta, koyjon'), tr(
      'koto = how much (“Eta koto taka?”), koyta = how many things, koyjon = how many people.',
      'koto = berapa (harga/jumlah: “Eta koto taka?”), koyta = berapa buah, koyjon = berapa orang.',
    )),
    tip(tr('Bhai, apa and mama', 'Bhai, apa, dan mama'), tr(
      'Strangers are family too: call a shopkeeper “bhai” (brother) — or “mama” at a tea stall or on a rickshaw. They will call you “apa” or “apu” (sister). It’s like “Mas” and “Mbak”.',
      'Orang asing juga dipanggil seperti keluarga: panggil penjual “bhai” (saudara) — atau “mama” di warung teh atau tukang becak. Mereka akan memanggilmu “apa” atau “apu”. Seperti “Mas” dan “Mbak”.',
    )),
    tip(tr('Big numbers come later', 'Angka besar menyusul'), tr(
      'Bangla numbers from 11 to 99 are irregular, like English “eleven, twelve”. For now you know 1–10, 20, 50, 100 and 500 — enough for most prices. Write numbers with digits when you text.',
      'Angka Bangla dari 11 sampai 99 tidak beraturan. Untuk sekarang kamu tahu 1–10, 20, 50, 100, dan 500 — cukup untuk kebanyakan harga. Tulis angka dengan digit saat mengetik pesan.',
    )),
    tip(tr('Age questions', 'Pertanyaan tentang umur'), tr(
      'Relatives may ask “Tomar boyosh koto?” (How old are you?) — it’s normal. But don’t ask an elder their age.',
      'Kerabat mungkin bertanya “Tomar boyosh koto?” (Berapa umurmu?) — itu biasa. Tapi jangan tanyakan umur orang yang lebih tua.',
    )),
  ],
};
