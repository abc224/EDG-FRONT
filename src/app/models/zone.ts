export interface Zone {
  id?: number;
  nom: string;
  statut: string;
  longitude: number;
  latitude: number;
  type: string;
  heuresDisponibles: number;
  tauxElectrification: number;
  createdAt: Date;
  updatedAt: Date;
}
