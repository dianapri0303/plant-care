import { api } from './api';
import type {
  CatalogParams,
  CatalogResponse,
  Plant,
  Species,
} from '@/types/plant';

export const getCatalog = async (params: CatalogParams) => {
  const res = await api.get<CatalogResponse>('/api/catalog', { params });
  return res.data;
};

export const getPlantById = async (id: string) => {
  const res = await api.get<Plant>(`/api/catalog/${id}`);
  return res.data;
};

export const getSpecies = async () => {
  const res = await api.get<Species[]>('/api/catalog/species');
  return res.data;
};
