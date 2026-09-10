export interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  avatarUrl: string | null;
}

export interface LoginResponse {
  user: User;
}

export interface RegisterResponse {
  id: string;
  email: string;
}
