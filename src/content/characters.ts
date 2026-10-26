import type { CharId, Tr, Voice } from './types';

export interface Character {
  name: Tr;
  role: Tr;
  voice: Voice;
}

// The family the learner meets throughout the course.
export const CHARACTERS: Record<CharId, Character> = {
  you: { name: { en: 'You', id: 'Kamu' }, role: { en: 'the new bou (wife)', id: 'bou (istri) baru' }, voice: 'f' },
  rafi: { name: { en: 'Rafi', id: 'Rafi' }, role: { en: 'your husband', id: 'suamimu' }, voice: 'm' },
  amma: { name: { en: 'Amma', id: 'Amma' }, role: { en: "Rafi's mother (shashuri)", id: 'ibu Rafi (shashuri)' }, voice: 'f' },
  abba: { name: { en: 'Abba', id: 'Abba' }, role: { en: "Rafi's father (shoshur)", id: 'ayah Rafi (shoshur)' }, voice: 'm' },
  dadi: { name: { en: 'Dadi', id: 'Dadi' }, role: { en: "Rafi's grandmother", id: 'nenek Rafi' }, voice: 'f' },
  nila: { name: { en: 'Nila Apu', id: 'Nila Apu' }, role: { en: "Rafi's elder sister", id: 'kakak perempuan Rafi' }, voice: 'f' },
  tanim: { name: { en: 'Tanim', id: 'Tanim' }, role: { en: "Rafi's younger brother", id: 'adik laki-laki Rafi' }, voice: 'm' },
  mitu: { name: { en: 'Mitu', id: 'Mitu' }, role: { en: "Nila's little daughter", id: 'putri kecil Nila' }, voice: 'f' },
  khala: { name: { en: 'Khala', id: 'Khala' }, role: { en: "Amma's sister", id: 'saudari Amma' }, voice: 'f' },
  chacha: { name: { en: 'Chacha', id: 'Chacha' }, role: { en: "Abba's younger brother", id: 'adik laki-laki Abba' }, voice: 'm' },
  dokandar: { name: { en: 'Shopkeeper', id: 'Penjaga toko' }, role: { en: 'at the bazar', id: 'di pasar' }, voice: 'm' },
  rickshaw: { name: { en: 'Rickshaw driver', id: 'Tukang becak' }, role: { en: 'on the road', id: 'di jalan' }, voice: 'm' },
  doctor: { name: { en: 'Doctor', id: 'Dokter' }, role: { en: 'at the clinic', id: 'di klinik' }, voice: 'f' },
  doel: { name: { en: 'Doel', id: 'Doel' }, role: { en: 'your guide bird', id: 'burung pemandumu' }, voice: 'f' },
};
