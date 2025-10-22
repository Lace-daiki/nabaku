import api from '@/utils/api';

// Uses the absolute URL provided to ensure we hit the correct admin global dashboard endpoint
const GLOBAL_ADMIN_DASHBOARD_URL = 'https://fundraiserr-api-9c9114b232c4.herokuapp.com/api/v1/global/admin/dashboard';

// Auth headers are injected by the shared axios instance's request interceptor

export const getGlobalAdminDashboard = async () => {
  try {
    const response = await api.get(GLOBAL_ADMIN_DASHBOARD_URL);
    return response.data; // { success, data: { totals, recentActivity } }
  } catch (error) {
    console.error('Error fetching global admin dashboard:', error?.response?.data || error);
    throw error;
  }
};
