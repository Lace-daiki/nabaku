// src/services/projects/projects.js
import axios from 'axios';
import { API_BASE_URL } from '@/lib/contants';
import { authService } from '../auth/auth';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getCurrentToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(token);
      
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const projectsService = {
  getAllProjects: async (filters = {}) => {
    try {
      const token = authService.getCurrentToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Only include non-empty filters in the request
      const nonEmptyFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      }, {});
      
      const params = Object.keys(nonEmptyFilters).length > 0 ? { params: nonEmptyFilters } : {};
      
      const response = await apiClient.get('/project/all', { 
        ...params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data?.data || []; // Return empty array if no data
    } catch (error) {
      if (error.response?.status === 404) {
        return []; // Return empty array for 404
      }
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw error;
    }
  },
  
  createProject: async (projectData) => {
    const formData = new FormData();
    Object.entries(projectData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(file => formData.append(key, file));
      } else if (value) {
        formData.append(key, value);
      }
    });
    
    const response = await apiClient.post('/project/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getProjectDetails: async (projectId) => {
    const response = await apiClient.get(`/project/${projectId}`);
    return response.data;
  },

  updateProject: async (projectId, projectData) => {
    const formData = new FormData();
    Object.entries(projectData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(file => formData.append(key, file));
      } else if (value) {
        formData.append(key, value);
      }
    });

    const response = await apiClient.put(`/project/update/${projectId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteProject: async (projectId) => {
    const response = await apiClient.delete(`/project/delete/${projectId}`);
    return response.data;
  }
};