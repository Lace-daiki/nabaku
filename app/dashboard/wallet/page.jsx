'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Stats from '@/components/wallet/stats';
import { CashflowChart } from "@/components/wallet/cash-chart";
import RecentWithdrawals from '@/components/wallet/recent-withdrawals';
import { fetchWalletBalance, fetchDonationGraphByYear } from '@/services/wallet';

const currentYear = new Date().getFullYear();

const fetchWalletData = async () => {
  const balance = await fetchWalletBalance();
  return {
    balance,
    overview: {
      activity: 651000,
      income: 54100000,
      donors: 1200,
      spending: 30700000,
      withdrawals: 17,
    },
    // cashflow will be set below
    activity: [
      { id: 1, date: 'Mar 30', status: 'Processing', amount: 600000 },
      { id: 2, date: 'Mar 28', status: 'Deposited', amount: 600000 },
      { id: 3, date: 'Mar 27', status: 'Deposited', amount: 600000 },
    ],
  };
};

export default function WalletPage() {
  const { data, isLoading } = useQuery(['wallet'], fetchWalletData);
  const {
    data: incomeData,
    isLoading: isIncomeLoading,
  } = useQuery(['donation-graph', currentYear], () => fetchDonationGraphByYear(currentYear));
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Use mock spend data for now
  const spendData = [1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 10, 11];

  if (isLoading || isIncomeLoading) return <div className="p-8">Loading wallet...</div>;

  return (
    <div className="flex justify-evenly">
      {/* Top Overview Section */}
      <div className="flex flex-col gap-4">
        <Stats />

        {/* Cashflow Chart (API version) */}
        <div className="w-[768px] h-[386px] bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Cashflow</h3>
          <div className=" w-full h-[235px] bg-gray-100 rounded-lg flex items-center">
            {/* Chart with API data */}
            <div className="w-full h-full">
              <CashflowChart income={incomeData || Array(12).fill(0)} spend={spendData} />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2 ">Last update: Dec 31, 2024</div>
        </div>

        {/* Recent Withdrawals */}
        <RecentWithdrawals />
      </div>

      <div className='relative flex flex-col gap-4'>
        <div className="w-[372px] h-[180px] col-span-1 bg-white p-4 rounded-lg shadow-sm space-y-2">
          <p className="text-[18px] font-bold text-[#1C1E53]">Current Balance</p>
          <h2 className="text-[32px] text-[#1C1E53] font-medium">
            ₦ { typeof data.balance === 'number' ? data.balance.toLocaleString() : '0.00'}
          </h2>
          <button
            className="w-full mt-2 bg-[#1C1E4C] px-[24px] py-[15px] text-white rounded-[40px] text-[14px] font-normal cursor-pointer"
            onClick={() => setShowWithdrawModal(true)}
          >
            Withdraw
          </button>
        </div>
        {/* Activity Section */}
        <div className="w-[372px] h-[498px] bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Activity</h3>
          <div className="space-y-3">
            {data.activity.map((item) => (
              <div key={item.id} className="flex justify-between text-sm border-b pb-2">
                <div>
                  <p>Donation from ****1234</p>
                  <p className="text-gray-500">{item.date} | {item.status}</p>
                </div>
                <div className="text-indigo-600 font-semibold">+₦{item.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-500 hover:underline">See more</button>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Withdraw Funds</h2>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Amount</label>
              <input
                type="number"
                min="1"
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Enter amount to withdraw"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-[#1C1E4C] text-white hover:bg-[#23255a]"
                // onClick={handleWithdraw} // Add logic later
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
