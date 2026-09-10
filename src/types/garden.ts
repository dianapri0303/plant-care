export type HealthStatus = 'healthy' | 'needs_attention' | 'critical';

export interface WateringLog {
  _id?: string;
  date: string;
  note?: string;
}

export interface GardenSpecies {
  _id: string;
  scientificName: string;
  commonName: string;
  photoUrl: string;
}

export interface GardenPlant {
  _id: string;
  userId: string;
  speciesId: GardenSpecies;
  nickname: string;
  speciesName: string;
  photoUrl: string;
  location: string;
  acquiredAt: string;
  wateringFrequencyDays: number;
  nextWateringAt: string;
  healthStatus: HealthStatus;
  wateringLogs?: WateringLog[];
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  plantCount: number;
  wateringStreak: number;
}
