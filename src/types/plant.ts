export type Light = 'full_sun' | 'bright_indirect' | 'low_light';
export type WateringFrequency = 'daily' | 'weekly' | 'bi_weekly' | 'monthly';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Humidity = 'low' | 'medium' | 'high';
export type SortBy = 'popularity' | 'difficulty';

export interface Plant {
  _id: string;
  scientificName: string;
  commonName: string;
  photoUrl: string;
  image?: string;
  feedbacksId?: string[];
  description: string;
  light: Light;
  wateringFrequency: WateringFrequency;
  wateringFrequencyDays: number;
  toxicToPets: boolean;
  difficulty: Difficulty;
  temperatureMin: number;
  temperatureMax: number;
  humidity: Humidity;
  soilType: string;
  popularityCount: number;
}

export interface CatalogResponse {
  plants: Plant[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export interface Species {
  _id: string;
  scientificName: string;
  commonName: string;
}

export interface CatalogParams {
  search?: string;
  light?: Light;
  wateringFrequency?: WateringFrequency;
  toxicToPets?: boolean;
  difficulty?: Difficulty;
  sortBy?: SortBy;
  page?: number;
  limit?: number;
}
