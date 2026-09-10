import { api } from './api';
import type { GardenPlant, UserStats } from '@/types/garden';

export const getGarden = async (filter?: string) => {
  const res = await api.get<GardenPlant[]>('/api/garden', {
    params: filter && filter !== 'all' ? { filter } : undefined,
  });
  return res.data;
};

export const getGardenPlantById = async (id: string) => {
  const res = await api.get<GardenPlant>(`/api/garden/${id}`);
  return res.data;
};

export const addPlant = async (data: FormData) => {
  const res = await api.post<GardenPlant>('/api/garden', data);
  return res.data;
};

export const updatePlant = async (id: string, data: FormData) => {
  const res = await api.patch<GardenPlant>(`/api/garden/${id}`, data);
  return res.data;
};

export const deletePlant = async (id: string) => {
  await api.delete(`/api/garden/${id}`);
};

export const waterPlant = async (id: string) => {
  const res = await api.post<GardenPlant>(`/api/garden/${id}/water`);
  return res.data;
};

export const getUserStats = async () => {
  const res = await api.get<UserStats>('/api/users/stats');
  return res.data;
};
