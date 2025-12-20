import { defineStore } from 'pinia';
import api from '../lib/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: true,
  }),

  actions: {
    async checkAuth() {
      this.loading = true;
      try {
        const response = await api.get('/api/auth/me');
        this.user = response.data.user;
        this.isAuthenticated = true;
      } catch (err) {
        this.user = null;
        this.isAuthenticated = false;
      } finally {
        this.loading = false;
      }
    },

    async login(email: string, password: string) {
      const response = await api.post('/api/auth/login', { email, password });
      await this.checkAuth();
      return response.data;
    },

    async logout() {
      await api.post('/api/auth/logout');
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
