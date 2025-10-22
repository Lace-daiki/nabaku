import axios from 'axios';
import { authService } from '@/services/auth/auth';
import { API_BASE_URL } from '@/lib/contants';

const getAuthHeaders = () => {
  const token = authService.getCurrentToken();
  if (!token) {
    throw new Error('No authentication token found');
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const withdrawalRequestService = {
  async getWithdrawalsRequests({ status, page, pageSize } = {}) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${API_BASE_URL}/withdrawal/admin/requests`, {
        headers,
        params: {
          ...(status ? { status } : {}),
          ...(page ? { page } : {}),
          ...(pageSize ? { pageSize } : {}),
        },
      });
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to fetch withdrawal requests';
      console.error('Withdrawals requests fetch error:', error?.response?.data || error);
      const err = new Error(message);
      err.status = error?.response?.status;
      err.details = error?.response?.data;
      throw err;
    }
  },

  async updateProfile(profileData) {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      };
      const response = await axios.put(`${API_BASE_URL}/authentication/set-profile`, profileData, { headers });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to update profile';
      console.error('Profile update error:', error?.response?.data || error);
      const err = new Error(message);
      err.status = error?.response?.status;
      err.details = error?.response?.data;
      throw err;
    }
  },

  async updateWithdrawalStatus(requestId, newStatus) {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      };
      const response = await axios.patch(
        `${API_BASE_URL}/withdrawal/admin/update/${requestId}`,
        { status: newStatus },
        { headers }
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to update withdrawal status';
      console.error('Withdrawal status update error:', error?.response?.data || error);
      const err = new Error(message);
      err.status = error?.response?.status;
      err.details = error?.response?.data;
      throw err;
    }
  },
};
