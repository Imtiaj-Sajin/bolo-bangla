import { ask, chat, f, line, no, ok, s, tip, tr, w } from '../dsl';
import type { UnitDef } from '../types';

export const u04: UnitDef = {
  id: 'u04',
  title: tr('Have you eaten?', 'Sudah makan?'),
  goal: tr(
    'Eat with the family: say what you eat, answer “have you eaten?”, call elders to the table, ask for water, serve tea, take more or say you are full, and praise the cook.',
    'Makan bersama keluarga: menyebut makananmu, menjawab “sudah makan?”, memanggil orang tua untuk makan, minta air, menyajikan teh, menambah atau bilang kenyang, dan memuji masakan.',
  ),
  forms: [
    f('asho', 'come (familiar)', 'ayo, kemarilah'),
    f('khete', 'to eat', 'untuk makan'),
    f('Bismillah', 'Bismillah (said before eating)', 'Bismillah'),
    f('dao', 'give (familiar)', 'beri (akrab)'),
    f('ekhoni', 'right now', 'sekarang juga'),
    f('dicchi', 'I am giving / bringing', 'saya ambilkan'),
  ],
  lessons: [
    {
      title: tr('Rice and fish', 'Nasi dan ikan'),
      words: [
        w('bhat', 'rice (cooked)', 'nasi', '🍚'),
        w('mach', 'fish', 'ikan', '🐟'),
        w('dal', 'lentil soup (dal)', 'sup kacang lentil (dal)', '🥣'),
        w('murgi', 'chicken', 'ayam', '🍗'),
        w('ruti', 'flatbread (roti)', 'roti (roti tipis)', '🫓', tr(
          'Like Indonesian “roti”, but in Bangladesh ruti is a thin, dry flatbread like chapati, eaten at breakfast. The flaky, oily one (like roti canai) is called “porota”.',
          'Seperti “roti”, tapi di Bangladesh ruti adalah roti tipis tanpa minyak seperti chapati, dimakan saat sarapan. Yang berlapis dan berminyak seperti roti canai disebut “porota”.',
        )),
        w('shobji', 'vegetables', 'sayur', '🥦'),
      ],
      forms: [
        f('khai', 'eat (I eat, we eat)', 'makan (saya/kami makan)'),
        f('khan', 'eat (you eat, respectful)', 'makan (Anda makan)'),
        f('khao', 'eat (you eat, familiar)', 'makan (kamu makan)'),
        f('khay', 'eats (he, she, they)', 'makan (dia/mereka makan)'),
        f('Bangladeshe', 'in Bangladesh', 'di Bangladesh'),
        f('dim', 'egg', 'telur'),
        f('mangsho', 'meat', 'daging'),
      ],
      sentences: [
        s('Ami bhat khai.|Bhat khai.', 'I eat rice.', 'Saya makan nasi.'),
        s('Apni mach khan?|Tumi mach khao?', 'Do you eat fish?', 'Anda makan ikan?|Apakah Anda makan ikan?'),
        s('Tumi ruti khao?|Apni ruti khan?', 'Do you eat roti?|Do you eat flatbread?', 'Kamu makan roti?'),
        s('Ami dal ar bhat khai.', 'I eat dal and rice.|I eat lentils and rice.', 'Saya makan dal dan nasi.'),
        s('Ami murgi ar shobji khai.', 'I eat chicken and vegetables.', 'Saya makan ayam dan sayur.'),
        s('Bangladeshe shobai bhat khay.', 'Everyone in Bangladesh eats rice.', 'Semua orang di Bangladesh makan nasi.'),
        s('Indonesiay shobai bhat khay.', 'Everyone in Indonesia eats rice.', 'Semua orang di Indonesia makan nasi.'),
      ],
      chats: [
        chat('amma', 'Tumi mach khao, bouma?', 'Do you eat fish?', 'Kamu makan ikan, Nak?', [
          ok('Ji, Amma, ami mach khai.', 'Yes, Mom, I eat fish.', 'Iya, Bu, saya makan ikan.'),
          no('Apni mach khan?', 'Do you eat fish?', 'Anda makan ikan?'),
          no('Ami Indonesiar meye.', 'I am an Indonesian girl.', 'Saya perempuan Indonesia.'),
        ]),
      ],
    },
    {
      title: tr('Have you eaten?', 'Sudah makan?'),
      words: [
        w('kheyechen', 'have eaten (you, respectful)', '(Anda) sudah makan', '🍽️', tr(
          '“Kheyechen?” is a caring greeting — exactly like Indonesian “Sudah makan?”.',
          '“Kheyechen?” adalah sapaan penuh perhatian — persis seperti “Sudah makan?”.',
        )),
        w('kheyechi', 'have eaten (I)', '(saya) sudah makan'),
        w('khabo', 'will eat (I)', '(saya) akan makan'),
        w('khaben', 'will eat (you, respectful)', '(Anda) akan makan'),
        w('ekhon', 'now', 'sekarang', '⏰'),
        w('nai', 'not (haven’t); there isn’t', 'belum; tidak ada'),
      ],
      forms: [
        f('kheyecho', 'have eaten (you, familiar)', '(kamu) sudah makan'),
        f('khai nai', 'haven’t eaten', 'belum makan'),
        f('pore', 'later', 'nanti'),
        f('khabe', 'will eat (you, familiar)', '(kamu) akan makan'),
        f('ashen', 'come (respectful)', 'mari, silakan datang (sopan)'),
        f('khete ashen', 'come and eat (respectful)', 'mari makan (sopan)'),
      ],
      sentences: [
        s('Apni kheyechen?|Tumi kheyecho?', 'Have you eaten?', 'Anda sudah makan?'),
        s('Ji, kheyechi.|Ha, kheyechi.', 'Yes, I have eaten.', 'Iya, sudah.|Iya, saya sudah makan.'),
        s('Na, ekhono khai nai.', "No, I haven't eaten yet.|No, not yet.", 'Belum, saya belum makan.|Belum.'),
        s('Ami ekhon khabo.|Ekhon khabo.', 'I will eat now.', 'Saya mau makan sekarang.'),
        s('Apni ki khaben?|Tumi ki khabe?', 'What will you eat?|What would you like to eat?', 'Anda mau makan apa?'),
        s('Tumi kheyecho?|Apni kheyechen?', 'Have you eaten?', 'Kamu sudah makan?'),
        s('Abba, khete ashen.', 'Dad, please come and eat.|Dad, come and eat.', 'Ayah, mari makan.|Ayah, ayo makan.'),
      ],
      chats: [
        chat('amma', 'Kheyecho, bouma?', 'Have you eaten?', 'Sudah makan, Nak?', [
          ok('Ji, Amma, kheyechi. Apni kheyechen?', 'Yes, Mom, I have eaten. Have you eaten?', 'Iya, Bu, sudah. Ibu sudah makan?'),
          no('Tumi kheyecho?', 'Have you eaten? (too casual for Mom!)', 'Kamu sudah makan? (terlalu akrab untuk Ibu!)'),
          no('Ami Bangla shikhchi.', 'I am learning Bangla.', 'Saya sedang belajar bahasa Bangla.'),
        ]),
        chat('rafi', 'Tumi ki khabe?', 'What will you eat?', 'Kamu mau makan apa?', [
          ok('Ami dal ar bhat khabo.', 'I will eat dal and rice.', 'Aku mau makan dal dan nasi.'),
          no('Ji, kheyechi.', 'Yes, I have eaten.', 'Iya, sudah makan.'),
          no('Ami Rafir bou.', "I am Rafi's wife.", 'Saya istri Rafi.'),
        ]),
      ],
    },
    {
      title: tr('At the table', 'Di meja makan'),
      words: [
        w('pani', 'water', 'air', '💧', tr('Bangladeshis say “pani” for water.', 'Orang Bangladesh menyebut air “pani”.')),
        w('cha', 'tea', 'teh', '☕'),
        w('lobon', 'salt', 'garam', '🧂', tr(
          'Salt is “lobon”. Don’t say “garam” — Bangla “gorom” means hot!',
          'Garam adalah “lobon”. Jangan bilang “garam” — “gorom” dalam bahasa Bangla artinya panas!',
        )),
        w('aro', 'more', 'lagi, tambah', '➕'),
        w('den', 'please give (respectful)', 'tolong beri (sopan)', '🤲', tr(
          'You may also hear the formal “din”. (Careful: “din” also means “day”.)',
          'Kamu juga bisa mendengar bentuk formal “din”. (Hati-hati: “din” juga berarti “hari”.)',
        )),
        w('nen', 'please take (respectful)', 'silakan ambil (sopan)', '🫴'),
      ],
      forms: [
        f('diben', 'would you give (polite request)', 'boleh minta (permintaan sopan)'),
        f('din', 'please give (formal)', 'tolong beri (formal)'),
        f('nao', 'take (familiar)', 'ambil (akrab)'),
        f('ektu pani', 'a little water', 'sedikit air'),
      ],
      sentences: [
        s('Ektu pani diben?', 'Could you give me some water?|Could I have some water?', 'Boleh minta sedikit air?|Bisa minta air sedikit?'),
        s('Pani den.|Pani din.', 'Water, please.|Please give me water.', 'Minta air, ya.|Tolong ambilkan air.'),
        s('Ektu lobon den.|Ektu lobon din.', 'A little salt, please.|Please give me a little salt.', 'Minta garamnya sedikit.|Tolong ambilkan garam sedikit.'),
        s('Amma, aro bhat nen.', 'Mom, have some more rice.|Mom, take some more rice.', 'Ibu, silakan tambah nasinya.'),
        s('Aro ektu dal nen.', 'Have a little more dal.|Take a little more dal.', 'Silakan tambah dal sedikit lagi.'),
        s('Abba, cha khaben?', 'Dad, would you like some tea?|Dad, will you have tea?', 'Ayah, mau teh?|Ayah mau minum teh?'),
        s('Ami cha khabo.|Cha khabo.', 'I will have tea.|I will drink tea.', 'Saya mau minum teh.'),
      ],
      chats: [
        chat('amma', 'Aro bhat nao, bouma.', 'Take more rice.', 'Tambah nasinya, Nak.', [
          ok('Ji, ektu den. Dhonnobad.', 'Yes, just a little. Thank you.', 'Iya, sedikit saja. Terima kasih.'),
          no('Apni kheyechen?', 'Have you eaten?', 'Anda sudah makan?'),
          no('Amar nam {name}.', 'My name is {name}.', 'Nama saya {name}.'),
        ]),
        chat('abba', 'Bouma, ektu cha dao.', 'Please give me some tea.', 'Nak, tolong ambilkan teh.', [
          ok('Ji, Abba, ekhoni dicchi.', 'Yes, Dad, I’ll bring it right now.', 'Iya, Ayah, saya ambilkan sekarang.'),
          no('Ami cha khabo.', 'I will have tea.', 'Saya mau minum teh.'),
          no('Na, ekhono khai nai.', "No, I haven't eaten yet.", 'Belum, saya belum makan.'),
        ]),
      ],
    },
    {
      title: tr('Delicious! I’m full', 'Enak! Aku kenyang'),
      words: [
        w('moja', 'tasty; fun', 'enak; seru', '😋'),
        w('jhal', 'spicy', 'pedas', '🌶️'),
        w('mishti', 'sweet; sweets', 'manis; kue manis', '🍬'),
        w('pet', 'stomach, tummy', 'perut'),
        w('kom', 'less, a little', 'kurang, sedikit', '🔽'),
        w('ranna', 'cooking', 'masakan', '🍳'),
      ],
      forms: [
        f('hoyeche', 'has become, is (done)', 'sudah jadi'),
        f('moja hoyeche', 'it is tasty', 'enak'),
        f('bhore geche', 'has filled up', 'sudah penuh'),
        f('pet bhore geche', 'I am full', 'saya sudah kenyang'),
        f('ar na', 'no more', 'sudah, tidak lagi'),
        f('kintu', 'but', 'tapi'),
        f('khabar', 'food', 'makanan'),
        f('murgir', 'chicken’s', '(daging) ayam'),
      ],
      sentences: [
        s('Khub moja hoyeche!', "It's very tasty!|It's delicious!", 'Enak sekali!|Lezat sekali!'),
        s('Amma, apnar ranna khub moja!', 'Mom, your cooking is delicious!|Mom, your cooking is very tasty!', 'Ibu, masakan Ibu enak sekali!'),
        s('Ar na, pet bhore geche.', "No more, I'm full.|No more, I am full.", 'Sudah, saya kenyang.|Sudah, saya sudah kenyang.'),
        s('Ami jhal kom khai.', "I don't eat much spicy food.|I eat food that is not too spicy.", 'Saya tidak banyak makan pedas.|Saya jarang makan pedas.'),
        s('Eta jhal?', 'Is this spicy?', 'Ini pedas?|Apakah ini pedas?'),
        s('Ektu jhal, kintu moja.', 'A little spicy, but tasty.', 'Sedikit pedas, tapi enak.'),
        s('Murgir mangsho khub moja.', 'The chicken is very tasty.|The chicken meat is very tasty.', 'Daging ayamnya enak sekali.'),
        s('Mishti khub moja.', 'The sweets are very tasty.|Sweets are very tasty.', 'Kue manisnya enak sekali.'),
      ],
      chats: [
        chat('amma', 'Khabar kemon hoyeche?', 'How is the food?', 'Bagaimana makanannya?', [
          ok('Khub moja hoyeche, Amma!', "It's very tasty, Mom!", 'Enak sekali, Bu!'),
          no('Ami pore khabo.', 'I will eat later.', 'Saya makan nanti saja.'),
          no('Eta ke?', 'Who is this?', 'Ini siapa?'),
        ]),
        chat('dadi', 'Natbou, aro ektu khao.', 'Eat a little more.', 'Cu, makan sedikit lagi.', [
          ok('Ar na, Dadi. Pet bhore geche.', "No more, Grandma. I'm full.", 'Sudah, Nek. Saya sudah kenyang.'),
          no('Mitu khub mishti baccha.', 'Mitu is a very sweet child.', 'Mitu anak yang manis sekali.'),
          no('Tumi kemon acho?', 'How are you?', 'Kamu apa kabar?'),
        ]),
      ],
    },
  ],
  story: {
    title: tr('Dinner with the family', 'Makan malam bersama keluarga'),
    steps: [
      line('amma', 'Asho, shobai khete asho!', 'Come, everyone, come and eat!', 'Ayo, semuanya, ayo makan!'),
      line('abba', 'Bismillah.', 'Bismillah.', 'Bismillah.'),
      line('amma', 'Mach khabe, bouma?', 'Will you have fish?', 'Mau ikan, Nak?'),
      line('you', 'Ji, Amma. Ami mach ar bhat khabo.', 'Yes, Mom. I will have fish and rice.', 'Iya, Bu. Saya mau ikan dan nasi.'),
      ask(tr('What will you eat?', 'Apa yang akan kamu makan?'), [
        tr('Chicken and bread', 'Ayam dan roti'),
        tr('Fish and rice', 'Ikan dan nasi'),
        tr('Only tea', 'Hanya teh'),
      ], 1),
      line('abba', 'Ranna kemon hoyeche?', 'How is the cooking?', 'Bagaimana masakannya?'),
      line('you', 'Khub moja hoyeche! Ektu jhal, kintu khub moja.', "It's very tasty! A little spicy, but very tasty.", 'Enak sekali! Sedikit pedas, tapi enak sekali.'),
      line('amma', 'Aro bhat nao, bouma.', 'Take more rice.', 'Tambah nasinya, Nak.'),
      line('you', 'Ar na, Amma. Pet bhore geche. Alhamdulillah.', "No more, Mom. I'm full. Alhamdulillah.", 'Sudah, Bu. Saya sudah kenyang. Alhamdulillah.'),
      ask(tr('Why don’t you take more rice?', 'Kenapa kamu tidak menambah nasi?'), [
        tr('You are full', 'Kamu sudah kenyang'),
        tr('It is too spicy', 'Terlalu pedas'),
        tr('You don’t like rice', 'Kamu tidak suka nasi'),
      ], 0),
      line('you', 'Abba, cha khaben?', 'Dad, would you like some tea?', 'Ayah, mau teh?'),
      line('abba', 'Ha, ektu dao, bouma.', 'Yes, give me a little.', 'Iya, sedikit saja, Nak.'),
      line('you', 'Ji, Abba, ekhoni dicchi.', 'Yes, Dad, I’ll bring it right now.', 'Iya, Ayah, saya ambilkan sekarang.'),
      ask(tr('What do you offer Dad after dinner?', 'Apa yang kamu tawarkan kepada Ayah setelah makan?'), [
        tr('Water', 'Air'),
        tr('Sweets', 'Kue manis'),
        tr('Tea', 'Teh'),
      ], 2),
    ],
  },
  tips: [
    tip(tr('“Kheyechen?” = “Sudah makan?”', '“Kheyechen?” = “Sudah makan?”'), tr(
      'Bangladeshis ask “Have you eaten?” to show they care — just like Indonesians. Answer “Ji, kheyechi” (yes) or “Na, ekhono khai nai” (not yet), and ask back: “Apni kheyechen?”.',
      'Orang Bangladesh bertanya “Sudah makan?” untuk menunjukkan perhatian — sama seperti orang Indonesia. Jawab “Ji, kheyechi” (sudah) atau “Na, ekhono khai nai” (belum), lalu tanya balik: “Apni kheyechen?”.',
    )),
    tip(tr('One verb for eating and drinking', 'Satu kata kerja untuk makan dan minum'), tr(
      'Bangla uses “khawa” for both: “bhat khai” (I eat rice), “cha khai” (I drink tea), “pani khabo” (I will drink water).',
      'Bahasa Bangla memakai “khawa” untuk makan dan minum: “bhat khai” (saya makan nasi), “cha khai” (saya minum teh), “pani khabo” (saya akan minum air).',
    )),
    tip(tr('The verb changes with the person', 'Kata kerja berubah sesuai orangnya'), tr(
      'ami khai · tumi khao · apni khan · se khay. Future: ami khabo · tumi khabe · apni khaben. You don’t need to memorize it — just listen to the endings.',
      'ami khai · tumi khao · apni khan · se khay. Akan datang: ami khabo · tumi khabe · apni khaben. Tidak perlu dihafal — dengarkan saja akhirannya.',
    )),
    tip(tr('Elders first', 'Orang tua didahulukan'), tr(
      'Call elders to the table (“Abba, khete ashen”), serve them first, and offer tea after the meal (“Abba, cha khaben?”). After eating, people say “Alhamdulillah”.',
      'Panggil orang tua untuk makan (“Abba, khete ashen”), layani mereka lebih dulu, dan tawarkan teh setelah makan (“Abba, cha khaben?”). Setelah makan, orang mengucapkan “Alhamdulillah”.',
    )),
    tip(tr('“Aro nen!” is love', '“Aro nen!” adalah tanda sayang'), tr(
      'Hosts keep offering more food — it is how they show love. Take a little, and when you are really full, smile, cover your plate with your hand and say “Ar na, pet bhore geche”.',
      'Tuan rumah terus menawarkan makanan — begitulah mereka menunjukkan sayang. Ambil sedikit, dan kalau sudah benar-benar kenyang, tersenyumlah, tutup piringmu dengan tangan dan bilang “Ar na, pet bhore geche”.',
    )),
    tip(tr('Praise the cook', 'Puji masakannya'), tr(
      '“Amma, apnar ranna khub moja!” (Mom, your cooking is delicious!) might be the most powerful sentence in this course. Eat with your right hand, just like at home.',
      '“Amma, apnar ranna khub moja!” (Ibu, masakan Ibu enak sekali!) mungkin kalimat paling ampuh di kursus ini. Makan dengan tangan kanan, sama seperti di rumah.',
    )),
  ],
};
