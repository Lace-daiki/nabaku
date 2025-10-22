'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Stats from '@/components/wallet/stats';
import { CashflowChart } from "@/components/wallet/cash-chart";
import RecentWithdrawals from '@/components/wallet/recent-withdrawals';
import WalletActivity from '@/components/wallet/activites';
import { fetchWalletData as fetchWalletServiceData, fetchDonationGraphByYear, fetchOrganizationOverview } from '@/services/wallet/wallet';
import { fetchBankDetails, processWithdrawal } from '@/services/wallet/withdrawals/withdrawals';

const currentYear = new Date().getFullYear();

const fetchWalletData = async () => {
  const walletData = await fetchWalletServiceData();
  
  // Assuming walletData includes real 'activity' array with 'type' field (e.g., 'donation', 'withdrawal').
  // If not, extend the service to fetch it separately.
  const activity = walletData.activity || []; // Real data from API; fallback to empty if missing
  
  // Derive overview from real data if API doesn't provide it directly.
  // Replace with real API response if available.
  return {
    balance: walletData.balance || 0,
    lastUpdated: walletData.updatedAt,
    activity, // Ensure each item has 'type', 'date', 'status', 'amount' from API
  };
};

export default function WalletPage() {
  const queryClient = useQueryClient();
  const { data: walletData, isLoading: isWalletLoading, error: walletError } = useQuery({
    queryKey: ['wallet'],
    queryFn: fetchWalletData,
  });
  const { data: overview, isLoading: isOverviewLoading, error: overviewError } = useQuery({
    queryKey: ['org-overview'],
    queryFn: fetchOrganizationOverview,
  });

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const startDate = `${selectedYear}-01-01`;
  const endDate = `${selectedYear}-12-31`;

  const { data: cashflowData, isLoading: isCashflowLoading, error: cashflowError } = useQuery({
    queryKey: ['donation-graph', selectedYear],
    queryFn: () => fetchDonationGraphByYear(startDate, endDate),
    enabled: !!selectedYear, // Only fetch if year is set
  });

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [bankId, setBankId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch bank details when modal opens (only if not already set)
  useEffect(() => {
    const getBankDetails = async () => {
      if (showWithdrawModal && !bankId) {
        try {
          const response = await fetchBankDetails();
          if (response?.success && response?.data?.id) {
            setBankId(response.data.id);
          } else {
            console.error('No bank details found');
          }
        } catch (error) {
          console.error('Failed to fetch bank details:', error);
          // Optionally show a toast/error UI here
        }
      }
    };
    getBankDetails();
  }, [showWithdrawModal, bankId]);

  // Combined loading state
  const isLoading = isWalletLoading || isCashflowLoading || isOverviewLoading;
  const hasError = walletError || overviewError || cashflowError;

  if (isLoading) return <div className="p-8">Loading wallet...</div>;
  if (hasError) return <div className="p-8 text-red-500">Error loading wallet data. Please try again.</div>;

  // Use overview for counts (primary source); fallback to activity filter if needed
  const donorCount = overview?.income?.numberOfDonors ?? (walletData?.activity?.filter(item => item.type === 'donation').length || 0);
  const withdrawalCount = overview?.spending?.numberOfWithdrawals ?? (walletData?.activity?.filter(item => item.type === 'withdrawal').length || 0);

  // Handle withdrawal submission
  const handleWithdraw = async () => {
    if (!amount || !bankId) {
      alert('Please ensure amount and bank details are set.');
      return;
    }
    const withdrawAmount = Number(amount);
    if (withdrawAmount <= 0) {
      alert('Please enter a valid withdrawal amount greater than 0.');
      return;
    }
    if (withdrawAmount > (walletData?.balance || 0)) {
      alert('Withdrawal amount exceeds available balance.');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await processWithdrawal(withdrawAmount, bankId);
      if (response?.success) {
        alert(response?.message || 'Withdrawal successful!');
        setShowWithdrawModal(false);
        setAmount(''); // Reset form
        // Refetch data to update UI
        queryClient.invalidateQueries({ queryKey: ['wallet'] });
        queryClient.invalidateQueries({ queryKey: ['org-overview'] });
        queryClient.invalidateQueries({ queryKey: ['recentWithdrawals'] });
      } else {
        alert(`Withdrawal failed: ${response?.message || 'Unknown error'}`);
      }
    } catch (error) {
      const apiMessage =
        error?.details?.message ||
        error?.details?.error ||
        error?.message ||
        'An error occurred during withdrawal';
      alert(apiMessage);
      console.error('Withdrawal error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value) || 0);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8 p-4 lg:p-8">
      {/* Left Column: Stats, Chart, Recent Withdrawals */}
      <div className="w-full flex flex-col gap-4 flex-1 lg:max-w-4xl">
        <Stats
          totalDonations={overview?.income?.amount ?? 0}
          totalWithdrawals={overview?.spending?.amount ?? 0}
          totalActivity={overview?.activity?.amount ?? 0}
          donorCount={donorCount}
          withdrawalCount={withdrawalCount}
          activityPeriod={overview?.activity?.period || 'Last 7 days'}
        />

        {/* Cashflow Chart */}
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-sm">
          <div className="w-full h-[245px] bg-gray-100 rounded-lg flex items-center justify-center">

            <div className="w-full h-full p-4">
              <CashflowChart
                donations={cashflowData?.donations || Array(12).fill(0)}
                withdrawals={cashflowData?.withdrawals || Array(12).fill(0)}
                selectedYear={selectedYear}
                onYearChange={(y) => setSelectedYear(y)}
              />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2 text-center">
            Last update: {walletData?.lastUpdated 
              ? new Date(walletData.lastUpdated).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              : 'N/A'
            }
          </div>
        </div>

        {/* Recent Withdrawals */}
        <RecentWithdrawals />
      </div>

      {/* Right Column: Balance and Activity */}
      <div className="flex flex-col gap-4 lg:w-[372px] lg:flex-shrink-0">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Available Balance</p>
            <h2 className="text-3xl font-bold text-[#1C1E53]">
              {formatCurrency(walletData?.balance)}
            </h2>
          </div>
          <button
            className="w-full bg-[#1C1E4C] hover:bg-[#2D2A6E] transition-colors px-6 py-3 text-white rounded-full text-sm font-medium disabled:opacity-50"
            onClick={() => setShowWithdrawModal(true)}
            disabled={!walletData?.balance || walletData.balance <= 0}
            aria-label="Withdraw funds from wallet"
          >
            Withdraw Funds
          </button>
        </div>
        
        {/* Activity Section */}
        <WalletActivity />
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Withdraw Funds</h2>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Amount (NGN)</label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter amount to withdraw"
                aria-label="Withdrawal amount"
              />
              <p className="text-xs text-gray-500 mt-1">
                Available: {formatCurrency(walletData?.balance)}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowWithdrawModal(false);
                  setAmount('');
                }}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                disabled={isProcessing || !bankId}
                className="px-4 py-2 rounded bg-[#1C1E4C] text-white hover:bg-[#2D2A6E] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                aria-label="Process withdrawal"
              >
                {isProcessing ? 'Processing...' : 'Withdraw'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
