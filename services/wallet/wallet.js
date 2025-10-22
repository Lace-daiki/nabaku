import axios from 'axios';
import { authService } from '@/services/auth/auth';
import { API_BASE_URL } from '@/lib/contants';

/**
 * Fetches the complete wallet data including balance and ledger balance
 * @returns {Promise<Object>} Wallet data object
 */
export async function fetchWalletData() {
  const token = authService.getCurrentToken();
  if (!token) {
    throw new Error('No authentication token found');
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/wallet`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (response.data && response.data.success) {
      const payload = response.data.data || {};
      return {
        // Ensure numeric values and correct paths
        balance: Number(payload.balance ?? 0),
        ledgerBalance: Number(payload.ledger_balance ?? 0),
        updatedAt: payload.updatedAt || response.data.updatedAt,
        // Include any other fields you might need
      };
    }
    
    throw new Error('Failed to fetch wallet data');
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    throw error;
  }
}

/**
 * @deprecated Use fetchWalletData() instead
 */
export async function fetchWalletBalance() {
  const walletData = await fetchWalletData();
  return walletData.balance;
}

// Fetch donation graph data for a given year
export async function fetchDonationGraphByYear(startDate, endDate) {
  const token = authService.getCurrentToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  // Use the provided full URL and pass startDate/endDate as query params
  const res = await axios.get(
    `https://fundraiserr-api-9c9114b232c4.herokuapp.com/api/v1/donation/graph/year`,
    {
      params: { startDate, endDate },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // Prefer new API shape: res.data.results [{ month, donations, withdrawals }]
  if (res?.data && Array.isArray(res.data.results)) {
    const donations = Array(12).fill(0);
    const withdrawals = Array(12).fill(0);
    for (const item of res.data.results) {
      const m = Number(item?.month);
      if (Number.isFinite(m) && m >= 1 && m <= 12) {
        donations[m - 1] = Number(item?.donations ?? 0);
        withdrawals[m - 1] = Number(item?.withdrawals ?? 0);
      }
    }
    return { donations, withdrawals };
  }

  // Backward compatibility: res.data.dataByMonth
  if (res.data && res.data.dataByMonth && Array.isArray(res.data.dataByMonth)) {
    const donations = res.data.dataByMonth.map((item) => Number(item.donations ?? 0));
    const withdrawals = res.data.dataByMonth.map((item) => Number(item.withdrawals ?? 0));
    const padToTwelve = (arr) => arr.concat(Array(Math.max(0, 12 - arr.length)).fill(0)).slice(0, 12);
    return { donations: padToTwelve(donations), withdrawals: padToTwelve(withdrawals) };
  }

  // Return default values if the data is not available
  return {
    donations: Array(12).fill(0),
    withdrawals: Array(12).fill(0),
  };
}

/**
 * Fetch organization overview metrics (activity, income, spending)
 * @returns {Promise<{activity: {amount:number, percentageChange:number, period:string}, income:{amount:number, numberOfDonors:number, percentageChange:number}, spending:{amount:number, numberOfWithdrawals:number, percentageChange:number}}>} 
 */
export async function fetchOrganizationOverview() {
  const token = authService.getCurrentToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const res = await axios.get(`${API_BASE_URL}/organization/overview`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = res?.data?.data || {};
    return {
      activity: {
        amount: Number(payload.activity?.amount ?? 0),
        percentageChange: Number(payload.activity?.percentageChange ?? 0),
        period: payload.activity?.period || 'Last 7 days',
      },
      income: {
        amount: Number(payload.income?.amount ?? 0),
        numberOfDonors: Number(payload.income?.numberOfDonors ?? 0),
        percentageChange: Number(payload.income?.percentageChange ?? 0),
      },
      spending: {
        amount: Number(payload.spending?.amount ?? 0),
        numberOfWithdrawals: Number(payload.spending?.numberOfWithdrawals ?? 0),
        percentageChange: Number(payload.spending?.percentageChange ?? 0),
      },
    };
  } catch (error) {
    console.error('Error fetching organization overview:', error);
    throw error;
  }
}
