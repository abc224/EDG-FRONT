export interface Zone {
  id?: number;
  nom: string;
  statut: string;
  longitude: number;
  latitude: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
