// "How to read Banglish": a pronunciation guide written for Indonesian (and English) speakers.
import type { Tr } from './types';

export interface GuideRow {
  sound: string;
  examples: string[];
  text: Tr;
}

export interface GuideSection {
  title: Tr;
  intro?: Tr;
  rows: GuideRow[];
}

const r = (sound: string, examples: string[], en: string, id: string): GuideRow => ({ sound, examples, text: { en, id } });

export const GUIDE: GuideSection[] = [
  {
    title: { en: 'Vowels', id: 'Huruf vokal' },
    intro: {
      en: 'Bangla vowels are short and clear — never stretch them. Tap the speaker to hear each example.',
      id: 'Vokal Bangla pendek dan jelas — jangan dipanjangkan. Ketuk speaker untuk mendengar contohnya.',
    },
    rows: [
      r('a', ['amar', 'bhat'], '“a” as in “father”.', '“a” seperti di “bapak”.'),
      r('o', ['kotha', 'bhalo'], 'Usually an open “o”, like English “or”. At the end of a word it is a round “o” like Indonesian “toko”.', 'Biasanya “o” terbuka, seperti “o” di “pohon”. Di akhir kata, “o” bulat seperti “toko”.'),
      r('e', ['kemon', 'ekhon'], 'Often an open “e” like English “cat” (kemon = “kæmon”). Never the Indonesian “e pepet” of “emas”.', 'Sering “è” terbuka (kemon = “kèmon”). Bukan “e pepet” seperti di “emas”.'),
      r('i', ['ami', 'ki'], '“i” as in Indonesian “ibu”.', '“i” seperti di “ibu”.'),
      r('u', ['tumi', 'khub'], '“u” as in Indonesian “ular”.', '“u” seperti di “ular”.'),
      r('oi / ou', ['boi', 'bou'], '“oi” and “ou” glide: boi (book), bou (wife — not Indonesian “bau”!).', '“oi” dan “ou” meluncur: boi (buku), bou (istri — bukan “bau”!).'),
    ],
  },
  {
    title: { en: 'Consonants you already know', id: 'Konsonan yang sudah kamu kenal' },
    rows: [
      r('ch', ['cha', 'achi'], 'Same as Indonesian “c” in “cari”. cha = tea.', 'Sama dengan “c” di “cari”. cha = teh.'),
      r('j', ['jani', 'kaj'], 'Same as Indonesian “j”.', 'Sama dengan “j” di bahasa Indonesia.'),
      r('sh', ['shami', 'shob'], 'Same as Indonesian “sy” in “syukur”.', 'Sama dengan “sy” di “syukur”.'),
      r('ng', ['Bangla', 'rong'], 'Same as Indonesian “ng”.', 'Sama dengan “ng”.'),
      r('f', ['ful', 'fufu'], 'An “f” sound (some people say a soft “ph”).', 'Bunyi “f” (sebagian orang mengucapkan “ph” lembut).'),
      r('y', ['koyta', 'kothay'], 'Like Indonesian “y” in “ya”.', 'Seperti “y” di “ya”.'),
    ],
  },
  {
    title: { en: 'New sounds: the “h” letters', id: 'Bunyi baru: huruf dengan “h”' },
    intro: {
      en: 'kh, gh, th, dh, ph and bh are ONE sound each: the letter plus a small puff of air. Hold your hand in front of your mouth — you should feel the air.',
      id: 'kh, gh, th, dh, ph dan bh masing-masing SATU bunyi: hurufnya ditambah hembusan napas kecil. Taruh tanganmu di depan mulut — kamu harus merasakan hembusannya.',
    },
    rows: [
      r('kh', ['khub', 'khabo'], 'k + air. NOT the Arabic “kh” of “khusus” or “akhir”.', 'k + hembusan napas. BUKAN “kh” Arab seperti di “khusus” atau “akhir”.'),
      r('bh', ['bhalo', 'bhai'], 'b + air. People often text “valo” — it is the same word.', 'b + hembusan. Orang sering menulis “valo” — itu kata yang sama.'),
      r('dh', ['dhonnobad', 'dhan'], 'd + air.', 'd + hembusan.'),
      r('th', ['thik', 'thanda'], 't + air. Not the English “th” of “think”.', 't + hembusan. Bukan “th” Inggris seperti “think”.'),
      r('gh', ['ghor', 'ghum'], 'g + air.', 'g + hembusan.'),
    ],
  },
  {
    title: { en: 'Small but important', id: 'Kecil tapi penting' },
    rows: [
      r('t / d', ['taka', 'tumi'], 'Bangla has a soft t (tongue on the teeth, like Indonesian) and a hard t (tongue further back, like English). We write both as “t” — copy the audio.', 'Bangla punya t lembut (lidah di gigi, seperti bahasa Indonesia) dan t keras (lidah lebih ke belakang, seperti bahasa Inggris). Keduanya ditulis “t” — tirukan audionya.'),
      r('double', ['Amma', 'accha'], 'Double letters are held a little longer, like “Allah”.', 'Huruf ganda ditahan sedikit lebih lama, seperti “Allah”.'),
      r('final k', ['ek', 'thik'], 'Say the last “k” fully. Don’t swallow it like the end of “tidak”.', 'Ucapkan “k” terakhir dengan jelas. Jangan ditelan seperti akhir kata “tidak”.'),
      r('stress', ['shashuri', 'dhonnobad'], 'Put a light stress on the FIRST syllable: SHA-shu-ri.', 'Beri tekanan ringan pada suku kata PERTAMA: SHA-shu-ri.'),
    ],
  },
  {
    title: { en: 'Reading family messages', id: 'Membaca pesan keluarga' },
    intro: {
      en: 'On WhatsApp your family may spell words differently. Bolo accepts these spellings when you type, too.',
      id: 'Di WhatsApp keluargamu mungkin mengeja kata dengan cara berbeda. Bolo juga menerima ejaan ini saat kamu mengetik.',
    },
    rows: [
      r('v = bh', ['bhalo'], '“valo” = “bhalo” (good).', '“valo” = “bhalo” (baik).'),
      r('s = ch', ['achi'], 'In Dhaka people say and write “asi” for “achi”, “kisu” for “kichu”.', 'Di Dhaka orang mengucapkan dan menulis “asi” untuk “achi”, “kisu” untuk “kichu”.'),
      r('a = e', ['kemon'], '“kamon” = “kemon”, “akhon” = “ekhon”.', '“kamon” = “kemon”, “akhon” = “ekhon”.'),
    ],
  },
];

export interface WordPair {
  bn: string;
  id: string;
  en: string;
}

/** Words Indonesian and Bangla share (through Sanskrit, Arabic, Persian or Portuguese). */
export const FRIENDS: WordPair[] = [
  { bn: 'nam', id: 'nama', en: 'name' },
  { bn: 'bhasha', id: 'bahasa', en: 'language' },
  { bn: 'shami', id: 'suami', en: 'husband' },
  { bn: 'stri', id: 'istri', en: 'wife (formal word — at home a wife is “bou”)' },
  { bn: 'khobor', id: 'kabar', en: 'news — “Ki khobor?” = “Apa kabar?”' },
  { bn: 'jobab', id: 'jawab', en: 'answer' },
  { bn: 'duniya', id: 'dunia', en: 'world' },
  { bn: 'doa', id: 'doa', en: 'prayer' },
  { bn: 'manush', id: 'manusia', en: 'person' },
  { bn: 'dukkho', id: 'duka', en: 'sorrow' },
  { bn: 'kaj', id: 'kerja', en: 'work' },
  { bn: 'bajar', id: 'pasar', en: 'market' },
  { bn: 'janala', id: 'jendela', en: 'window' },
  { bn: 'almari', id: 'lemari', en: 'cupboard' },
  { bn: 'saban', id: 'sabun', en: 'soap' },
  { bn: 'kamra', id: 'kamar', en: 'room' },
  { bn: 'kach', id: 'kaca', en: 'glass' },
  { bn: 'angur', id: 'anggur', en: 'grape' },
  { bn: 'anaros', id: 'nanas', en: 'pineapple' },
  { bn: 'kofi', id: 'kopi', en: 'coffee' },
  { bn: 'raja', id: 'raja', en: 'king' },
];

/** Same-looking words with different meanings. `indo` says what the look-alike means in Indonesian. */
export const TRAPS: { bn: string; means: Tr; indo: Tr }[] = [
  { bn: 'mama', means: { en: 'uncle (Mom’s brother)', id: 'paman (saudara laki-laki ibu)' }, indo: { en: 'Indonesian “mama” = mom', id: '“mama” di bahasa Indonesia = ibu' } },
  { bn: 'dada', means: { en: 'grandfather (Dad’s father)', id: 'kakek (ayah dari ayah)' }, indo: { en: 'Indonesian “dada” = chest', id: '“dada” di bahasa Indonesia = bagian tubuh' } },
  { bn: 'apa', means: { en: 'elder sister', id: 'kakak perempuan' }, indo: { en: 'Indonesian “apa” = what', id: '“apa” di bahasa Indonesia = kata tanya' } },
  { bn: 'chinta', means: { en: 'worry — love is “bhalobasha”', id: 'khawatir — cinta = “bhalobasha”' }, indo: { en: 'Indonesian “cinta” = love', id: '“cinta” di bahasa Indonesia = rasa sayang' } },
  { bn: 'gorom', means: { en: 'hot — salt is “lobon”', id: 'panas — garam = “lobon”' }, indo: { en: 'Indonesian “garam” = salt', id: '“garam” di bahasa Indonesia = bumbu asin' } },
  { bn: 'kopal', means: { en: 'forehead, fate', id: 'dahi, nasib' }, indo: { en: 'Indonesian “kapal” = ship', id: '“kapal” di bahasa Indonesia = kendaraan laut' } },
  { bn: 'mana', means: { en: 'forbidden', id: 'dilarang' }, indo: { en: 'Indonesian “mana” = where', id: '“mana” di bahasa Indonesia = kata tanya tempat' } },
  { bn: 'tamak', means: { en: 'tobacco', id: 'tembakau' }, indo: { en: 'Indonesian “tamak” = greedy', id: '“tamak” di bahasa Indonesia = rakus' } },
];
