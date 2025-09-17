import { API_BASE_URL } from '@/lib/contants';

export const fetchOrganizations = async () => {
  try {
      const response = await fetch(`${API_BASE_URL}/organization/list`);
      
      if (!response.ok) {
          throw new Error(`Failed to fetch organizations: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.data; // Return the organizations data
  } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching organizations');
  }
};
