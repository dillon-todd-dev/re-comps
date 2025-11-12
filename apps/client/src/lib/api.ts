import axios from 'axios';
import type { Credentials } from './types';

export type User = {
  id: string;
  email: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
};

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data } = await api.get('/auth/me');
    return data.user;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return null;
    }
    throw err;
  }
}

export async function login(credentials: Credentials) {
  const { data } = await api.post('/auth/login', credentials);
  console.log(data);
  return data.user;
}

export async function logout() {
  await api.post('/auth/logout');
}

export async function getInvitation(token: string) {
  const { data } = await api.post('/auth/invitation', { token });
  if (data.error) {
    return { error: 'Unable to set password' };
  }
  return data;
}
