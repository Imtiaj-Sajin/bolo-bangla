import type { CharId, Tr, Voice } from './types';

export interface Character {
  /** Shown as the speaker label: the Bangla name plus what it means for the learner. */
  name: Tr;
  role: Tr;
  /** Voice slot; tools/audio/voices.json decides how it sounds. */
  voice: Voice;
}

// The family the learner meets throughout the course. Each person has their own voice.
export const CHARACTERS: Record<CharId, Character> = {
  you: { name: { en: 'You', id: 'Kamu' }, role: { en: 'the new bou (wife)', id: 'bou (istri) baru' }, voice: 'you' },
  rafi: { name: { en: 'Rafi', id: 'Rafi' }, role: { en: 'your husband', id: 'suamimu' }, voice: 'rafi' },
  amma: { name: { en: 'Amma (Mom)', id: 'Amma (Ibu)' }, role: { en: "Rafi's mother", id: 'ibu Rafi' }, voice: 'amma' },
  abba: { name: { en: 'Abba (Dad)', id: 'Abba (Ayah)' }, role: { en: "Rafi's father", id: 'ayah Rafi' }, voice: 'abba' },
  dadi: { name: { en: 'Dadi (Grandma)', id: 'Dadi (Nenek)' }, role: { en: "Rafi's grandmother", id: 'nenek Rafi' }, voice: 'dadi' },
  nila: { name: { en: 'Nila Apu', id: 'Kak Nila' }, role: { en: "Rafi's elder sister", id: 'kakak perempuan Rafi' }, voice: 'nila' },
  tanim: { name: { en: 'Tanim', id: 'Tanim' }, role: { en: "Rafi's younger brother", id: 'adik laki-laki Rafi' }, voice: 'tanim' },
  mitu: { name: { en: 'Mitu', id: 'Mitu' }, role: { en: "Nila's little daughter", id: 'putri kecil Kak Nila' }, voice: 'mitu' },
  khala: { name: { en: 'Khala (Auntie)', id: 'Khala (Bibi)' }, role: { en: "Mom's sister", id: 'saudari Ibu' }, voice: 'khala' },
  chacha: { name: { en: 'Chacha (Uncle)', id: 'Chacha (Paman)' }, role: { en: "Dad's younger brother", id: 'adik laki-laki Ayah' }, voice: 'chacha' },
  dokandar: { name: { en: 'Shopkeeper', id: 'Penjaga toko' }, role: { en: 'at the bazar', id: 'di pasar' }, voice: 'dokandar' },
  rickshaw: { name: { en: 'Rickshaw driver', id: 'Tukang becak' }, role: { en: 'on the road', id: 'di jalan' }, voice: 'rickshaw' },
  doctor: { name: { en: 'Doctor', id: 'Dokter' }, role: { en: 'at the clinic', id: 'di klinik' }, voice: 'doctor' },
  doel: { name: { en: 'Doel', id: 'Doel' }, role: { en: 'your guide bird', id: 'burung pemandumu' }, voice: 'f' },
};
