export interface Region {
  id: number;
  name: string;
}
export interface Prefecture {
  id: number;
  name: string;
  regionId: number;
}

export const REGIONS: Region[] = [
  { id: 1, name: 'Boké' },
  { id: 2, name: 'Conakry' },
  { id: 3, name: 'Faranah' },
  { id: 4, name: 'Kankan' },
  { id: 5, name: 'Kindia' },
  { id: 6, name: 'Labé' },
  { id: 7, name: 'Mamou' },
  { id: 8, name: 'Nzérékoré' },
];

export const PREFECTURES: Prefecture[] = [
  // Boké (id: 1)
  { id: 1, name: 'Boké', regionId: 1 },
  { id: 2, name: 'Boffa', regionId: 1 },
  { id: 3, name: 'Fria', regionId: 1 },
  { id: 4, name: 'Gaoual', regionId: 1 },
  { id: 5, name: 'Koundara', regionId: 1 },

  // Conakry (id: 2) – C’est une région spéciale
  { id: 6, name: 'Conakry', regionId: 2 },

  // Faranah (id: 3)
  { id: 7, name: 'Faranah', regionId: 3 },
  { id: 8, name: 'Dabola', regionId: 3 },
  { id: 9, name: 'Dinguiraye', regionId: 3 },
  { id: 10, name: 'Kissidougou', regionId: 3 },

  // Kankan (id: 4)
  { id: 11, name: 'Kankan', regionId: 4 },
  { id: 12, name: 'Kérouané', regionId: 4 },
  { id: 13, name: 'Kouroussa', regionId: 4 },
  { id: 14, name: 'Mandiana', regionId: 4 },
  { id: 15, name: 'Siguiri', regionId: 4 },

  // Kindia (id: 5)
  { id: 16, name: 'Kindia', regionId: 5 },
  { id: 17, name: 'Coyah', regionId: 5 },
  { id: 18, name: 'Dubréka', regionId: 5 },
  { id: 19, name: 'Forécariah', regionId: 5 },
  { id: 20, name: 'Télimélé', regionId: 5 },

  // Labé (id: 6)
  { id: 21, name: 'Labé', regionId: 6 },
  { id: 22, name: 'Koubia', regionId: 6 },
  { id: 23, name: 'Lélouma', regionId: 6 },
  { id: 24, name: 'Mali', regionId: 6 },
  { id: 25, name: 'Tougué', regionId: 6 },

  // Mamou (id: 7)
  { id: 26, name: 'Mamou', regionId: 7 },
  { id: 27, name: 'Dalaba', regionId: 7 },
  { id: 28, name: 'Pita', regionId: 7 },

  // Nzérékoré (id: 8)
  { id: 29, name: 'Nzérékoré', regionId: 8 },
  { id: 30, name: 'Beyla', regionId: 8 },
  { id: 31, name: 'Guéckédou', regionId: 8 },
  { id: 32, name: 'Lola', regionId: 8 },
  { id: 33, name: 'Macenta', regionId: 8 },
  { id: 34, name: 'Yomou', regionId: 8 },
];
