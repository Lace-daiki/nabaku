// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - modified to not automatically logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Return the error to be handled by the calling component
    return Promise.reject(error);
  }
);

export default api;