import axios from 'axios';
import { API_BASE_URL } from '@/lib/contants';
import { authService } from '../auth/auth';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getCurrentToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const transactionsService = {
  getAllTransactions: async (params = {}) => {
    try {
      const nonEmptyFilters = Object.entries(params).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      }, {});
      const query = Object.keys(nonEmptyFilters).length > 0 ? { params: nonEmptyFilters } : {};
      const response = await apiClient.get('/donation/', query);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw error;
    }
  },
};
