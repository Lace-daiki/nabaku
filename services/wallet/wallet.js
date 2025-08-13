import axios from 'axios';
import { authService } from '@/services/auth/auth';
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
    params: { month:1, year },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Check if the response contains the expected data structure
  if (res.data && res.data.dataByMonth && Array.isArray(res.data.dataByMonth)) {
    // Map the data to extract donations and withdrawals for each month
    const donations = res.data.dataByMonth.map(item => item.donations);
    const withdrawals = res.data.dataByMonth.map(item => item.withdrawals);
    
    return { donations, withdrawals };
  }
  
  // Return default values if the data is not available
  return {
    donations: Array(12).fill(0),
    withdrawals: Array(12).fill(0),
  };
}
