import api from '@/utils/api';
import { API_BASE_URL } from '@/lib/contants';

// Auth headers are injected by the shared axios instance's request interceptor

export const getWithdrawals = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/withdrawal/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching withdrawals:', error);
    throw error;
  }
};

export const fetchBankDetails = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/bank`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bank details:', error);
    throw error;
  }
};

export const processWithdrawal = async (amount, bankId) => {
  try {
    const response = await api.post(
      `${API_BASE_URL}/withdrawal/`,
      { amount, bankId },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    // Surface backend error details for better debugging
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Failed to process withdrawal';
    console.error('Error processing withdrawal:', error?.response?.data || error);
    const err = new Error(message);
    err.status = error?.response?.status;
    err.details = error?.response?.data;
    throw err;
  }
};

export async function getWalletActivities() {
  try {
    const response = await api.get(`${API_BASE_URL}/donation/`, { headers: { 'Content-Type': 'application/json' } });
    if (!response.data || !Array.isArray(response.data.data)) {
      return [];
    }
    return response.data.data;
  } catch (error) {
    console.error('Error fetching wallet activities:', error);
    throw error;
  }
}
