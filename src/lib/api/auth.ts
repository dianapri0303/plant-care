import { api } from './api';
import type { LoginResponse, RegisterResponse, User } from '@/types/user';

export interface Credentials {
  email: string;
  password: string;
}

export const register = async (data: Credentials) => {
  const res = await api.post<RegisterResponse>('/api/auth/register', data);
  return res.data;
};

export const login = async (data: Credentials) => {
  const res = await api.post<LoginResponse>('/api/auth/login', data);
  return res.data.user;
};

export const getCurrentUser = async () => {
  const res = await api.get<User>('/api/users/current');
  return res.data;
};
