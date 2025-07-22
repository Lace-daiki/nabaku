import axios from 'axios';
import { authService } from './auth/auth';
import { API_BASE_URL } from '@/lib/contants';

export async function fetchWalletBalance() {
  const token = authService.getCurrentToken();
  if (!token) {
    throw new Error('No authentication token found');
  }
  const res = await axios.get(`${API_BASE_URL}/wallet`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.balance;
}

// Fetch donation graph data for a given year
export async function fetchDonationGraphByYear(year) {
  const token = authService.getCurrentToken();
  if (!token) {
    throw new Error('No authentication token found');
  }
  const res = await axios.get(`${API_BASE_URL}/donation/graph/year`, {
    params: { month: 1, year },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // Return array of totalAmount for each month (1-12)
  if (res.data && Array.isArray(res.data.totalAmountByMonth)) {
    // Ensure the array is sorted by month
    const sorted = res.data.totalAmountByMonth.sort((a, b) => a.month - b.month);
    return sorted.map((item) => item.totalAmount);
  }
  return Array(12).fill(0);
} 