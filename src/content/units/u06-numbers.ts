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
    f('Bhai', 'brother (polite way to address a man)', 'Mas (sapaan sopan untuk laki-laki)'),
    f('Apa', 'sister (polite way to address a woman)', 'Mbak (sapaan sopan untuk perempuan)'),
    f('keji', 'kilo (Bangladeshis say keji)', 'kilo'),
    f('ek keji', 'one kilo', 'satu kilo'),
    f('ei', 'this, these (before a noun)', 'ini (sebelum kata benda)'),
    f('ashben', 'come (respectful, future)', 'datang (sopan)'),
    f('abar ashben', 'come again', 'datang lagi, ya'),
    f('taka dicchi', 'I am paying', 'saya yang bayar'),
    f('dicchi', 'I am giving / paying', 'saya beri / bayar'),
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
        f('cup', 'cup', 'cangkir'),
      ],
      sentences: [
        s('Ek, dui, tin, char, pach.', 'One, two, three, four, five.', 'Satu, dua, tiga, empat, lima.'),
        s('Amar dui bhai ache.', 'I have two brothers.', 'Saya punya dua saudara laki-laki.'),
        s('Ek cup cha den.|Ek cup cha din.', 'One cup of tea, please.|Please give me one cup of tea.', 'Minta teh satu cangkir.|Tolong satu cangkir teh.'),
        s('Duita dim den.|Duita dim din.', 'Two eggs, please.|Please give me two eggs.', 'Minta telurnya dua.|Tolong dua butir telur.'),
        s('Amra pachjon.', 'There are five of us.|We are five people.', 'Kami berlima.'),
        s('Tin, char, pach!', 'Three, four, five!', 'Tiga, empat, lima!'),
      ],
      chats: [
        chat('amma', 'Tumi koyta dim khabe?', 'How many eggs will you eat?', 'Kamu mau makan berapa telur?', [
          ok('Duita dim khabo, Amma.', 'I will eat two eggs, Mom.', 'Saya mau dua telur, Bu.'),
          no('Tin, char, pach!', 'Three, four, five!', 'Tiga, empat, lima!'),
          no('Amra pachjon.', 'There are five of us.', 'Kami berlima.'),
        ]),
      ],
    },
    {
      title: tr('Six to ten', 'Enam sampai sepuluh'),
      words: [
        w('choy', 'six', 'enam', '6️⃣'),
        w('shat', 'seven', 'tujuh', '7️⃣'),
        w('at', 'eight', 'delapan', '8️⃣', tr('Not the English word “at”!', 'Bukan kata bahasa Inggris “at”!')),
        w('noy', 'nine', 'sembilan', '9️⃣', tr('“Noy” also means “is not” in everyday talk — the context tells you which.', '“Noy” juga berarti “bukan” dalam percakapan — konteks yang menentukan.')),
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
        f('gunte', 'to count', 'berhitung'),
        f('taka', 'taka (money)', 'taka (uang)'),
        f('Pari', 'I can!', 'Bisa!'),
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
          ok('Pari! Ek, dui, tin, char, pach, choy, shat, at, noy, dosh!', 'I can! One, two, three, four, five, six, seven, eight, nine, ten!', 'Bisa! Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh!'),
          no('Duita dim den.', 'Two eggs, please.', 'Minta telurnya dua.'),
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
        f('apnara', 'you (plural, respectful)', 'Bapak-Ibu, Anda sekalian'),
        f('tomra', 'you (plural, familiar)', 'kalian'),
        f('koy', 'how many', 'berapa'),
        f('charjon', 'four (people)', 'empat (orang)'),
        f('Tanimer', 'Tanim’s', 'milik Tanim'),
        f('bish', 'twenty', 'dua puluh'),
        f('Mitur', 'Mitu’s', 'milik Mitu'),
      ],
      sentences: [
        s('Apnara koyjon?|Tomra koyjon?', 'How many of you are there?', 'Ada berapa orang?|Bapak-Ibu berapa orang?'),
        s('Amra charjon.', 'There are four of us.|We are four people.', 'Kami berempat.'),
        s('Tomra koy bhai-bon?|Apnara koy bhai-bon?', 'How many brothers and sisters are you?|How many siblings are you?', 'Kalian berapa bersaudara?'),
        s('Tomar boyosh koto?|Apnar boyosh koto?', 'How old are you?', 'Berapa umurmu?|Umurmu berapa?'),
        s('Mitur boyosh char bochor.', 'Mitu is four years old.', 'Mitu berumur empat tahun.|Umur Mitu empat tahun.'),
        s('Tanimer boyosh bish bochor.', 'Tanim is twenty years old.', 'Tanim berumur dua puluh tahun.|Umur Tanim dua puluh tahun.'),
        s('Barite koyjon manush thake?', 'How many people live at home?|How many people live in the house?', 'Berapa orang tinggal di rumah?'),
      ],
      chats: [
        chat('khala', 'Tomra koy bhai-bon?', 'How many brothers and sisters are you?', 'Kalian berapa bersaudara?', [
          ok('Amra char bhai-bon, Khala.', 'We are four siblings, Auntie.', 'Kami empat bersaudara, Bi.'),
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
        f('koto taka', 'how much (money)', 'berapa taka'),
        f('pachsho', 'five hundred', 'lima ratus'),
        f('kache', 'with (someone)', 'pada'),
        f('amar kache', 'I have (with me)', 'saya bawa'),
        f('dibo', 'will give, will pay (I)', '(saya) akan beri / bayar'),
      ],
      sentences: [
        s('Eta koto taka?', 'How much is this?|How many taka is this?', 'Ini berapa taka?|Ini harganya berapa?'),
        s('Bish taka.', 'Twenty taka.', 'Dua puluh taka.'),
        s('Ponchash taka dibo.', 'I will pay fifty taka.|I will give fifty taka.', 'Saya bayar lima puluh taka saja.|Saya kasih lima puluh taka.'),
        s('Eksho taka.', 'One hundred taka.|A hundred taka.', 'Seratus taka.'),
        s('Dam koto?', 'What is the price?|How much does it cost?', 'Harganya berapa?'),
        s('Dam khub beshi!', "The price is too high!|It's too expensive!", 'Mahal sekali!|Harganya terlalu mahal!'),
        s('Amar kache dosh taka ache.', 'I have ten taka.|I have ten taka with me.', 'Saya punya sepuluh taka.|Saya bawa sepuluh taka.'),
        s('Pachsho taka.', 'Five hundred taka.', 'Lima ratus taka.'),
      ],
      chats: [
        chat('dokandar', 'Eksho taka, Apa.', 'One hundred taka, sister.', 'Seratus taka, Mbak.', [
          ok('Eksho taka? Dam khub beshi! Ponchash taka dibo.', 'One hundred taka? Too expensive! I’ll pay fifty.', 'Seratus taka? Mahal sekali! Saya bayar lima puluh saja.'),
          no('Ek, dui, tin, char, pach.', 'One, two, three, four, five.', 'Satu, dua, tiga, empat, lima.'),
          no('Amra charjon.', 'There are four of us.', 'Kami berempat.'),
        ]),
        chat('rafi', 'Tomar kache koto taka ache?', 'How much money do you have?', 'Kamu bawa uang berapa?', [
          ok('Amar kache pachsho taka ache.', 'I have five hundred taka.', 'Aku bawa lima ratus taka.'),
          no('Dam koto?', 'What is the price?', 'Harganya berapa?'),
          no('Tomar boyosh koto?', 'How old are you?', 'Umurmu berapa?'),
        ]),
      ],
    },
  ],
  story: {
    title: tr('At the sweet shop', 'Di toko kue manis'),
    steps: [
      line('rafi', 'Bhai, ei mishti keji koto?', 'Excuse me, how much are these sweets a kilo?', 'Mas, kue manis ini sekilo berapa?'),
      line('dokandar', 'Pachsho taka keji, Bhai.', 'Five hundred taka a kilo, sir.', 'Lima ratus taka sekilo, Mas.'),
      line('you', 'Pachsho taka? Dam khub beshi!', 'Five hundred taka? That’s too expensive!', 'Lima ratus taka? Mahal sekali!'),
      ask(tr('How much is one kilo of sweets?', 'Berapa harga sekilo kue manis?'), [
        tr('Fifty taka', 'Lima puluh taka'),
        tr('Five hundred taka', 'Lima ratus taka'),
        tr('One hundred taka', 'Seratus taka'),
      ], 1),
      line('dokandar', 'Thik ache, Bhabi. Eksho taka kom.', "All right, ma'am. A hundred taka off.", 'Boleh, Kak, saya kurangi seratus taka.'),
      line('rafi', 'Thik ache. Ek keji den.', 'Okay. One kilo, please.', 'Oke. Minta sekilo.'),
      ask(tr('How much cheaper does it get?', 'Berapa potongan harganya?'), [
        tr('A hundred taka', 'Seratus taka'),
        tr('Ten taka', 'Sepuluh taka'),
        tr('Nothing', 'Tidak ada'),
      ], 0),
      line('rafi', 'Ami taka dicchi.', 'I’m paying.', 'Aku yang bayar.'),
      line('dokandar', 'Dhonnobad, Bhabi! Abar ashben.', "Thank you, ma'am! Come again.", 'Terima kasih, Kak! Datang lagi, ya.'),
      line('you', 'Dhonnobad, Bhai.', 'Thank you, brother.', 'Terima kasih, Mas.'),
      ask(tr('Who pays?', 'Siapa yang membayar?'), [
        tr('You', 'Kamu'),
        tr('Rafi', 'Rafi'),
        tr('Nobody', 'Tidak ada'),
      ], 1),
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
    tip(tr('Bhai, Apa, Bhabi and Mama', 'Bhai, Apa, Bhabi, dan Mama'), tr(
      'Strangers are addressed like family: call a shopkeeper “Bhai” (brother) — or “Mama” at a tea stall or on a rickshaw. When you are alone they call you “Apa”; when you are with your husband they call you “Bhabi”. It’s like “Mas” and “Mbak”.',
      'Orang asing dipanggil seperti keluarga: panggil penjual “Bhai” (Mas) — atau “Mama” di warung teh atau tukang becak. Kalau kamu sendirian mereka memanggilmu “Apa”; kalau bersama suami mereka memanggilmu “Bhabi”. Seperti “Mas” dan “Mbak”.',
    )),
    tip(tr('Bargaining', 'Menawar'), tr(
      'At markets, prices are often a little high at first. Say “Dam khub beshi!” and name your price: “Ponchash taka dibo.” A friendly smile works best.',
      'Di pasar, harga awal sering agak tinggi. Bilang “Dam khub beshi!” lalu sebutkan tawaranmu: “Ponchash taka dibo.” Senyum ramah paling ampuh.',
    )),
    tip(tr('Big numbers come later', 'Angka besar menyusul'), tr(
      'Bangla numbers from 11 to 99 are irregular, like English “eleven, twelve”. For now you know 1–10, 20, 50, 100 and 500 — enough for most prices.',
      'Angka Bangla dari 11 sampai 99 tidak beraturan. Untuk sekarang kamu tahu 1–10, 20, 50, 100, dan 500 — cukup untuk kebanyakan harga.',
    )),
    tip(tr('Age questions', 'Pertanyaan tentang umur'), tr(
      'Relatives may ask “Tomar boyosh koto?” (How old are you?) — it’s normal. But don’t ask an elder their age.',
      'Kerabat mungkin bertanya “Tomar boyosh koto?” (Berapa umurmu?) — itu biasa. Tapi jangan tanyakan umur orang yang lebih tua.',
    )),
  ],
};
