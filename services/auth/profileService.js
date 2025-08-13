import api from '../../utils/api';
import { authService } from './auth';
import { API_BASE_URL } from '@/lib/contants';

export const profileService = {
  async getProfile() {
    const token = authService.getCurrentToken();
    console.log(token);
    
    if (!token) {
      return {
        success: false,
        error: 'No authentication token found',
      };
    }

    const url = `${API_BASE_URL}/authentication/get-profile`;
    try {
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Profile fetch error:', error);
      if (error.response) {
        const message = error.response.data?.message || 'Failed to fetch profile';
        return {
          success: false,
          error: message,
        };
      }
      return {
        success: false,
        error: error.message || 'Network error occurred',
      };
    }
  },

  async updateProfile(profileData) {
    const token = authService.getCurrentToken();
    console.log(token);
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const url = `${API_BASE_URL}/authentication/set-profile`;
    try {
      const response = await api.put(url, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Profile update error:', error);
      if (error.response) {
        const message = error.response.data?.message || 'Failed to update profile';
        return {
          success: false,
          error: message,
        };
      }
      return {
        success: false,
        error: error.message || 'Network error occurred',
      };
    }
  },
};
