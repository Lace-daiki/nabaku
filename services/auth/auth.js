// src/services/authService.js
import { API_BASE_URL } from '@/lib/contants';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/authentication/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await parseResponse(response);
      
      if (data.success && data.authorization?.token) {
        console.log(data.authorization.token);
        
        // Store token and user data
        localStorage.setItem(TOKEN_KEY, data.authorization.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.data));
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/authentication/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    
    // Store token and user data if registration also logs in user
    if (data.success && data.authorization?.token) {
      localStorage.setItem(TOKEN_KEY, data.authorization.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.data));
    }

    return data;
  },

  logout: async () => {
    try {
      // Get token before clearing storage
      const token = localStorage.getItem(TOKEN_KEY);
      
      // Clear stored data
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      
      // Call logout API if token exists
      if (token) {
        await fetch(`${API_BASE_URL}/authentication/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  },

  getCurrentToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  getCurrentUser: () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  isAuthenticated: () => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(TOKEN_KEY);
    }
    return false;
  },

  getAuthHeaders: () => {
    const token = authService.getCurrentToken();
    if (!token) {
      throw new Error('No authentication token available');
    }
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  },

  refreshToken: async () => {
    const refreshToken = authService.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/authentication/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await parseResponse(response);
      
      if (data.authorization?.token) {
        localStorage.setItem(TOKEN_KEY, data.authorization.token);
        if (data.authorization.refreshToken) {
          localStorage.setItem(REFRESH_TOKEN_KEY, data.authorization.refreshToken);
        }
        return data.authorization.token;
      }
      
      throw new Error('Token refresh failed');
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }
};

async function parseResponse(response) {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }
  return response.json();
}