'use client';

import { useQuery } from '@tanstack/react-query';
import { FaSearch } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import { getWithdrawals } from '@/services/wallet/withdrawals/withdrawals';

const fetchRecentWithdrawals = async () => {
  try {
    // Fetching with pending status as per the request, limited to 5 for recent view.
    const response = await getWithdrawals();
    let items = [];
    if (Array.isArray(response)) {
      items = response;
    } else if (Array.isArray(response?.data)) {
      items = response.data;
    } else if (Array.isArray(response?.data?.data)) {
      items = response.data.data;
    } else if (response?.success && Array.isArray(response?.data)) {
      items = response.data;
    }

    const normalizeStatus = (s) => {
      const v = (s || '').toLowerCase();
      if (['completed', 'success', 'approved', 'paid'].includes(v)) return 'completed';
      if (['pending', 'processing', 'in_progress', 'in-progress'].includes(v)) return 'in-progress';
      if (['cancelled', 'canceled', 'failed', 'rejected', 'declined'].includes(v)) return 'cancelled';
      return 'unknown';
    };

    const statusLabel = (norm) => {
      if (norm === 'in-progress') return 'In-Progress';
      if (norm === 'completed') return 'Completed';
      if (norm === 'cancelled') return 'Cancelled';
      return 'Unknown';
    };

    const mapped = (items || [])
      .slice()
      .sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0))
      .slice(0, 5)
      .map((w) => {
        const norm = normalizeStatus(w?.status);
        return {
          id: w?._id || w?.id,
          name: w?.fullname || w?.email || w?.user?.fullname || w?.user?.email || 'Unknown',
          amount: `-₦${Number(w?.amount || 0).toLocaleString()}`,
          date: w?.createdAt ? new Date(w.createdAt).toLocaleDateString('en-GB') : '',
          status: norm,
          statusLabel: statusLabel(norm),
          avatar: '/avatars/avatar-placeholder.png', // Using a generic placeholder as API doesn't provide one
        };
      });

    return mapped;
  } catch (error) {
    console.error("Failed to fetch recent withdrawals", error);
    throw error; // re-throw error for react-query to handle
  }
};

export default function RecentWithdrawals() {
  const { data: withdrawals, isLoading, isError } = useQuery({
    queryKey: ['recentWithdrawals'],
    queryFn: fetchRecentWithdrawals,
    // Auto-refresh to reflect admin-side updates
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'success':
      case 'approved':
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'pending':
      case 'processing':
      case 'in-progress':
      case 'in_progress':
        return 'bg-yellow-300 text-yellow-700';
      case 'cancelled':
      case 'canceled':
      case 'failed':
      case 'rejected':
      case 'declined':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-full max-h-[600px] overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Withdrawals</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Find withdrawal"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none"
              aria-label="Search withdrawals"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
          </div>
          <button className="border p-2 rounded-full" aria-label="Filter">
            <FiFilter />
          </button>
          <button className="border p-2 rounded-full" aria-label="View Details">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.414 5.414a1 1 0 00-.293.707V20l-4-2v-6.172a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
          </button>
        </div>
      </div>

      

      {/* List of withdrawals */}
      <div className="space-y-2 bg-[#EBEEF9] rounded-xl p-2 max-h-[400px] overflow-auto">
        {/* Header Row for Div "table" */}
        <div className="hidden sm:flex text-gray-500 border-b border-gray-300 pb-2 mb-2 font-semibold select-none">
          <div className="flex-[2] ml-4">NAME</div>
          <div className="flex-[1]">AMOUNT</div>
          <div className="flex-[1]">DATE</div>
          <div className="flex-[1]">STATUS</div>
          <div className="flex-[0.5]"></div>
        </div>
        {isLoading ? (
          <div className="text-center p-4">Loading withdrawals...</div>
        ) : isError ? (
          <div className="text-center p-4 text-red-500">Failed to load withdrawals.</div>
        ) : withdrawals && withdrawals.length > 0 ? (
          withdrawals.map((w) => (
            <div
              key={w.id}
              className="flex items-center gap-2  rounded-md px-3 py-2 hover:bg-blue-100 cursor-pointer transition-colors"
              role="row"
              tabIndex={0}
              aria-label={`Withdrawal by ${w.name} for ${w.amount} on ${w.date}, status: ${w.status}`}
            >
              <div className="flex-[2] flex items-center gap-2 font-medium text-gray-700 min-w-0">
                <span className="truncate">{w.name}</span>
              </div>
              <div className="flex-[1] text-gray-800 min-w-[80px]">{w.amount}</div>
              <div className="flex-[1] text-gray-600 min-w-[80px]">{w.date}</div>
              <div className="flex-[1]">
                <span className={`px-2 py-1 rounded-md text-xs select-none ${getStatusColor(w.status)}`}>
                  {w.statusLabel}
                </span>
              </div>
              <div className="flex-[0.5] flex justify-center">
                <AiOutlineEye className="text-gray-600 hover:text-indigo-600" aria-label="View details" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4">No recent withdrawals found.</div>
        )}
      </div>

      {/* Footer
      <div className="text-right mt-3">
        <button className="text-[15px] font-bold text-gray-600 hover:underline">See more</button>
      </div> */}
    </div>
  );
}
