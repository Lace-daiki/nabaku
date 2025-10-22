// src/utils/api.js
import axios from 'axios';
import { authService } from '@/services/auth/auth';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = authService.getCurrentToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error?.response?.data?.message || error?.response?.data?.error || error.message || 'An error occurred';

    if (status === 401) {
      toast.error('Session expired. Please log in again.');
      authService.logout();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Show a toast for other API errors
    if (status && status >= 400) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

/**
 * Converts a File or Blob to a base64 string.
 * @param {File|Blob} file
 * @returns {Promise<string>}
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export default api;