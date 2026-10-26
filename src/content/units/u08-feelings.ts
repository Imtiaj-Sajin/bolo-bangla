import { ask, chat, f, line, no, ok, s, tip, tr, w } from '../dsl';
import type { UnitDef } from '../types';

export const u08: UnitDef = {
  id: 'u08',
  title: tr('How I feel', 'Perasaanku'),
  goal: tr(
    'Say when you are hungry, cold, tired, happy or sad, say what you like and who you love, and tell the family when you feel unwell.',
    'Mengatakan saat kamu lapar, kedinginan, lelah, senang atau sedih, menyebut yang kamu suka dan sayangi, dan memberi tahu keluarga saat kamu tidak enak badan.',
  ),
  forms: [
    f('Ma-ke', 'my mother (as object)', 'ibu (sebagai objek)'),
    f('miss korchi', 'I miss (someone)', 'saya rindu'),
    f('esho', 'come (familiar)', 'ayo, kemarilah'),
    f('ekshathe', 'together', 'bersama-sama'),
  ],
  lessons: [
    {
      title: tr('Hungry, thirsty, hot, cold', 'Lapar, haus, panas, dingin'),
      words: [
        w('khida', 'hunger', 'lapar', '🤤'),
        w('pipasha', 'thirst', 'haus', '🥤'),
        w('lagche', 'feels (to me)', 'terasa', '🌡️'),
        w('thanda', 'cold', 'dingin', '🥶'),
        w('gorom', 'hot', 'panas', '🥵', tr('“Gorom” is hot — not “garam” (salt is “lobon”)!', '“Gorom” artinya panas — bukan “garam” (garam adalah “lobon”)!')),
      ],
      forms: [
        f('khida lagche', 'I am hungry', 'saya lapar'),
        f('pipasha lagche', 'I am thirsty', 'saya haus'),
        f('thanda lagche', 'I feel cold', 'saya kedinginan'),
        f('gorom lagche', 'I feel hot', 'saya kepanasan'),
        f('aj', 'today', 'hari ini'),
        f('khida nai', 'not hungry', 'tidak lapar'),
      ],
      sentences: [
        s('Amar khida lagche.', 'I am hungry.', 'Saya lapar.'),
        s('Amar pipasha lagche.', 'I am thirsty.', 'Saya haus.'),
        s('Amar thanda lagche.', 'I feel cold.|I am cold.', 'Saya kedinginan.'),
        s('Aj khub gorom lagche.', 'It feels very hot today.|I feel very hot today.', 'Hari ini panas sekali.|Hari ini terasa panas sekali.'),
        s('Tomar khida lagche?', 'Are you hungry?', 'Kamu lapar?'),
        s('Apnar thanda lagche?', 'Are you cold?|Do you feel cold?', 'Anda kedinginan?'),
        s('Thanda pani din.', 'Please give me cold water.|Cold water, please.', 'Tolong beri air dingin.|Minta air dingin.'),
      ],
      chats: [
        chat('rafi', 'Tomar khida lagche?', 'Are you hungry?', 'Kamu lapar?', [
          ok('Ji, khub khida lagche!', 'Yes, I’m very hungry!', 'Iya, lapar sekali!'),
          ok('Na, ekhon khida nai.', 'No, I’m not hungry now.', 'Nggak, sekarang aku nggak lapar.'),
          no('Apnar thanda lagche?', 'Are you cold?', 'Anda kedinginan?'),
        ]),
      ],
    },
    {
      title: tr('Tired, happy, sad', 'Lelah, senang, sedih'),
      words: [
        w('klanto', 'tired', 'lelah, capek', '😩'),
        w('khushi', 'happy', 'senang, bahagia', '😊'),
        w('mon', 'heart, mind', 'hati, pikiran', '💗'),
        w('kharap', 'bad', 'buruk, jelek', '👎'),
        w('shorir', 'body, health', 'badan, kesehatan', '🩺'),
      ],
      forms: [
        f('mon kharap', 'sad, upset (lit. bad heart)', 'sedih (harfiah: hati buruk)'),
        f('shorir kharap', 'unwell, sick (lit. bad body)', 'tidak enak badan'),
        f('keno', 'why', 'kenapa'),
        f('ajke', 'today', 'hari ini'),
      ],
      sentences: [
        s('Ami khub klanto.', 'I am very tired.', 'Saya sangat lelah.|Saya capek sekali.'),
        s('Ami khub khushi.', 'I am very happy.', 'Saya senang sekali.|Saya sangat bahagia.'),
        s('Amar mon kharap.', 'I am sad.|I feel sad.', 'Saya sedih.|Hati saya sedih.'),
        s('Amar shorir kharap.', 'I am not well.|I feel sick.', 'Saya tidak enak badan.|Saya sakit.'),
        s('Apnar shorir kemon?', 'How is your health?|How are you feeling?', 'Bagaimana kesehatan Anda?'),
        s('Tomar mon kharap keno?', 'Why are you sad?', 'Kenapa kamu sedih?'),
        s('Ajke ami khub khushi.', 'Today I am very happy.|I am very happy today.', 'Hari ini saya senang sekali.'),
      ],
      chats: [
        chat('amma', 'Tomar mon kharap keno, ma?', 'Why are you sad, dear?', 'Kenapa kamu sedih, Nak?', [
          ok('Ami Ma-ke miss korchi.', 'I miss my mother.', 'Saya rindu ibu saya.'),
          no('Ami khub khushi.', 'I am very happy.', 'Saya senang sekali.'),
          no('Amar pipasha lagche.', 'I am thirsty.', 'Saya haus.'),
        ]),
      ],
    },
    {
      title: tr('Likes and love', 'Suka dan sayang'),
      words: [
        w('pochondo', 'liking, favourite', 'kesukaan', '💕'),
        w('lage', 'feels, seems (to me)', 'terasa (bagiku)'),
        w('bhalobashi', 'love (I love)', '(aku) cinta, sayang', '❤️', tr(
          'Love is “bhalobasha” — remember, “chinta” is worry!',
          'Cinta adalah “bhalobasha” — ingat, “chinta” artinya khawatir!',
        )),
        w('onek', 'a lot, very much', 'banyak, sangat', '🔝'),
        w('gaan', 'song, music', 'lagu, musik', '🎵'),
      ],
      forms: [
        f('bhalo lage', 'I like it (lit. it feels good)', 'aku suka (harfiah: terasa enak)'),
        f('bhalo lage na', 'I don’t like it', 'aku tidak suka'),
        f('pochondo kori', 'I like', 'aku suka'),
        f('pochondo koren', 'you like (respectful)', 'Anda suka'),
        f('tomake', 'you (as object, familiar)', 'kamu (sebagai objek)'),
        f('apnake', 'you (as object, respectful)', 'Anda (sebagai objek)'),
        f('shunte', 'to listen', 'mendengarkan'),
        f('kemon lage', 'how do you like it', 'bagaimana rasanya'),
      ],
      sentences: [
        s('Amar Bangladesh khub bhalo lage.', 'I really like Bangladesh.|I like Bangladesh very much.', 'Saya sangat suka Bangladesh.|Saya suka sekali Bangladesh.'),
        s('Ami cha pochondo kori.', 'I like tea.', 'Saya suka teh.'),
        s('Apni ki pochondo koren?', 'What do you like?', 'Anda suka apa?'),
        s('Amar gaan shunte bhalo lage.', 'I like listening to music.|I like listening to songs.', 'Saya suka mendengarkan lagu.|Saya suka mendengarkan musik.'),
        s('Eta amar bhalo lage na.', "I don't like this.", 'Saya tidak suka ini.'),
        s('Ami tomake bhalobashi.', 'I love you.', 'Aku cinta kamu.|Aku sayang kamu.'),
        s('Amma, apnake onek bhalobashi.', 'Amma, I love you very much.', 'Amma, saya sangat sayang Anda.'),
      ],
      chats: [
        chat('rafi', 'Tomar Bangladesh kemon lage?', 'How do you like Bangladesh?', 'Bagaimana menurutmu Bangladesh?', [
          ok('Amar Bangladesh khub bhalo lage!', 'I really like Bangladesh!', 'Aku suka sekali Bangladesh!'),
          no('Amar shorir kharap.', 'I am not well.', 'Saya tidak enak badan.'),
          no('Ami cha pochondo kori.', 'I like tea.', 'Aku suka teh.'),
        ]),
        chat('rafi', 'Ami tomake bhalobashi.', 'I love you.', 'Aku cinta kamu.', [
          ok('Amio tomake bhalobashi.', 'I love you too.', 'Aku juga cinta kamu.'),
          no('Kono shomossha nai.', 'No problem.', 'Tidak masalah.'),
          no('Dhonnobad, Abba.', 'Thank you, Abba.', 'Terima kasih, Abba.'),
        ]),
      ],
    },
    {
      title: tr('I don’t feel well', 'Aku tidak enak badan'),
      words: [
        w('matha', 'head', 'kepala', '🤕'),
        w('betha', 'pain', 'sakit, nyeri'),
        w('jor', 'fever', 'demam', '🤒'),
        w('oshudh', 'medicine', 'obat', '💊'),
        w('daktar', 'doctor', 'dokter', '🧑‍⚕️'),
      ],
      forms: [
        f('matha betha', 'headache', 'sakit kepala'),
        f('pet betha', 'stomach ache', 'sakit perut'),
        f('korche', 'is doing', 'sedang'),
        f('betha korche', 'it hurts', 'terasa sakit'),
        f('esheche', 'has come', 'sudah datang'),
        f('dakbo', 'shall I call', 'perlu saya panggil'),
        f('Dadir', 'Dadi’s', 'milik Dadi'),
        f('ki hoyeche', 'what happened', 'ada apa'),
        f('shorirta', 'the body (my health)', 'badan (kesehatan)'),
      ],
      sentences: [
        s('Amar matha betha korche.', 'I have a headache.|My head hurts.', 'Saya sakit kepala.|Kepala saya sakit.'),
        s('Amar pet betha korche.', 'I have a stomach ache.|My stomach hurts.', 'Saya sakit perut.|Perut saya sakit.'),
        s('Amar jor esheche.', 'I have a fever.|I have got a fever.', 'Saya demam.'),
        s('Oshudh kheyechen?', 'Have you taken your medicine?|Have you taken medicine?', 'Anda sudah minum obat?'),
        s('Ami oshudh khabo.', 'I will take medicine.', 'Saya akan minum obat.'),
        s('Daktar dakbo?', 'Shall I call a doctor?|Should I call a doctor?', 'Perlu saya panggil dokter?'),
        s('Dadir shorir kharap.', 'Dadi is not well.|Grandma is not well.', 'Dadi sedang tidak enak badan.|Nenek sedang sakit.'),
      ],
      chats: [
        chat('amma', 'Ki hoyeche, ma? Shorir kharap?', 'What happened, dear? Not feeling well?', 'Ada apa, Nak? Tidak enak badan?', [
          ok('Ji, Amma. Amar matha betha korche.', 'Yes, Amma. I have a headache.', 'Iya, Amma. Saya sakit kepala.'),
          no('Amar Bangladesh khub bhalo lage.', 'I really like Bangladesh.', 'Saya suka sekali Bangladesh.'),
          no('Ami khub khushi.', 'I am very happy.', 'Saya senang sekali.'),
        ]),
        chat('dadi', 'Natbou, amar shorirta bhalo na.', 'Granddaughter-in-law, I am not feeling well.', 'Cucu menantu, badan nenek tidak enak.', [
          ok('Oshudh kheyechen, Dadi? Daktar dakbo?', 'Have you taken your medicine, Dadi? Shall I call a doctor?', 'Sudah minum obat, Dadi? Perlu saya panggil dokter?'),
          no('Ami tomake bhalobashi.', 'I love you.', 'Aku cinta kamu.'),
          no('Amar khida lagche.', 'I am hungry.', 'Saya lapar.'),
        ]),
      ],
    },
  ],
  story: {
    title: tr('Missing home', 'Rindu rumah'),
    steps: [
      line('amma', 'Ki hoyeche, ma? Tomar mon kharap?', 'What happened, dear? Are you sad?', 'Ada apa, Nak? Kamu sedih?'),
      line('you', 'Ji, Amma. Ami Ma-ke khub miss korchi.', 'Yes, Amma. I miss my mother very much.', 'Iya, Amma. Saya sangat rindu ibu saya.'),
      line('amma', 'Chinta koro na. Amio tomar Ma.', 'Don’t worry. I am your mother too.', 'Jangan khawatir. Aku juga ibumu.'),
      ask(tr('Why are you sad?', 'Kenapa kamu sedih?'), [
        tr('You are hungry', 'Kamu lapar'),
        tr('You miss your mother', 'Kamu rindu ibumu'),
        tr('You are sick', 'Kamu sakit'),
      ], 1),
      line('you', 'Dhonnobad, Amma. Apnake onek bhalobashi.', 'Thank you, Amma. I love you very much.', 'Terima kasih, Amma. Saya sangat sayang Anda.'),
      line('amma', 'Amio tomake bhalobashi, ma. Tomar khida lagche?', 'I love you too, dear. Are you hungry?', 'Aku juga sayang kamu, Nak. Kamu lapar?'),
      ask(tr('What does Amma say to comfort you?', 'Apa yang dikatakan Amma untuk menghiburmu?'), [
        tr('I am your mother too', 'Aku juga ibumu'),
        tr('Go to sleep', 'Tidurlah'),
        tr('Call your mother', 'Telepon ibumu'),
      ], 0),
      line('you', 'Ji, ektu khida lagche.', 'Yes, I am a little hungry.', 'Iya, saya sedikit lapar.'),
      line('amma', 'Esho, ekshathe cha khai.', 'Come, let’s have tea together.', 'Ayo, kita minum teh bersama.'),
      line('you', 'Ji, Amma! Amar cha khub bhalo lage.', 'Yes, Amma! I really like tea.', 'Iya, Amma! Saya suka sekali teh.'),
      ask(tr('What do you do together at the end?', 'Apa yang kalian lakukan bersama di akhir?'), [
        tr('Go shopping', 'Berbelanja'),
        tr('Watch TV', 'Menonton TV'),
        tr('Have tea', 'Minum teh'),
      ], 2),
    ],
  },
  tips: [
    tip(tr('Feelings “happen to” you', 'Perasaan “terjadi padamu”'), tr(
      'For hunger, thirst, cold and heat, Bangla says the feeling happens TO you: “Amar khida lagche” (to me hunger is felt). Swap the word: khida, pipasha, thanda, gorom.',
      'Untuk lapar, haus, dingin, dan panas, bahasa Bangla mengatakan perasaan itu terjadi PADAMU: “Amar khida lagche” (bagiku lapar terasa). Ganti katanya: khida, pipasha, thanda, gorom.',
    )),
    tip(tr('Shorir kharap = tidak enak badan', 'Shorir kharap = tidak enak badan'), tr(
      'Both languages blame the body! “Amar shorir kharap” = “Saya tidak enak badan”. And “mon kharap” (bad heart/mind) means sad or upset.',
      'Kedua bahasa menyalahkan badan! “Amar shorir kharap” = “Saya tidak enak badan”. Dan “mon kharap” (hati buruk) artinya sedih atau kesal.',
    )),
    tip(tr('Bhalo lage = I like it', 'Bhalo lage = aku suka'), tr(
      '“Amar Bangladesh bhalo lage” — literally “Bangladesh feels good to me”. Add “na” for the opposite: “bhalo lage na” (I don’t like it).',
      '“Amar Bangladesh bhalo lage” — harfiah “Bangladesh terasa enak bagiku”. Tambahkan “na” untuk kebalikannya: “bhalo lage na” (aku tidak suka).',
    )),
    tip(tr('Saying “I love you”', 'Mengatakan “aku cinta kamu”'), tr(
      'To your husband: “Ami tomake bhalobashi”. To Amma or Dadi: “Apnake onek bhalobashi” — they will be so touched. And never mix it up: chinta = worry, bhalobasha = love!',
      'Kepada suamimu: “Ami tomake bhalobashi”. Kepada Amma atau Dadi: “Apnake onek bhalobashi” — mereka pasti terharu. Dan jangan tertukar: chinta = khawatir, bhalobasha = cinta!',
    )),
    tip(tr('Medicine is “eaten”', 'Obat “dimakan”'), tr(
      'Bangla uses “khawa” for medicine too: “Oshudh kheyechen?” (Have you taken your medicine?). Asking elders this shows real care.',
      'Bahasa Bangla juga memakai “khawa” untuk obat: “Oshudh kheyechen?” (Sudah minum obat?). Menanyakan ini kepada orang tua menunjukkan perhatian yang tulus.',
    )),
    tip(tr('It’s okay to miss home', 'Wajar merindukan rumah'), tr(
      'Telling Amma “Ami Ma-ke miss korchi” (I miss my mother) is not a weakness — it will bring you closer.',
      'Bilang kepada Amma “Ami Ma-ke miss korchi” (Saya rindu ibu saya) bukan kelemahan — itu akan membuatmu lebih dekat.',
    )),
  ],
};
