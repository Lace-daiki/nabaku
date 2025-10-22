import { API_BASE_URL } from '@/lib/contants';
import { authService } from '@/services/auth/auth';

export const activityService = {
  async addActivity(activityData) {
    const token = authService.getCurrentToken();
  if (!token) {
    throw new Error('No authentication token found');
  }
    try {
      const response = await fetch(`${API_BASE_URL}/activity/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add activity');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Activity service error:', error);
      throw error;
    }
  },

  async getActivities() {
    try {
      const response = await fetch(`${API_BASE_URL}/activity/list`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Activity service error:', error);
      throw error;
    }
  },

  async getPublicActivities(organizationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/activity/public/${organizationId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch public activities');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching public activities:', error);
      throw error;
    }
  }
};
