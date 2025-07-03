'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Stats from '@/components/wallet/stats';
import { CashflowChart } from "@/components/wallet/cash-chart";
import RecentWithdrawals from '@/components/wallet/recent-withdrawals';

// Sample mock data - replace with your API later
const fetchWalletData = async () => {
  return {
    balance: 23240000,
    overview: {
      activity: 651000,
      income: 54100000,
      donors: 1200,
      spending: 30700000,
      withdrawals: 17,
    },
    cashflow: {
      income: [3, 5, 7, 6, 8, 10, 12, 15, 14, 17, 18, 20],
      spend: [1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 10, 11],
    },
    activity: [
      { id: 1, date: 'Mar 30', status: 'Processing', amount: 600000 },
      { id: 2, date: 'Mar 28', status: 'Deposited', amount: 600000 },
      { id: 3, date: 'Mar 27', status: 'Deposited', amount: 600000 },
    ],
  };
};

export default function WalletPage() {
  const { data, isLoading } = useQuery(['wallet'], fetchWalletData);

  if (isLoading) return <div className="p-8">Loading wallet...</div>;

  return (
    <div className="flex justify-evenly">
      {/* Top Overview Section */}
      <div className="flex flex-col gap-4">
        <Stats />

        {/* Cashflow Chart (static version) */}
        <div className="w-[768px] h-[386px] bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Cashflow</h3>
          <div className=" w-full h-[235px] bg-gray-100 rounded-lg flex items-center">
            {/* Simulated Chart */}
            <div className="w-full h-full">
              <CashflowChart income={data.cashflow.income} spend={data.cashflow.spend} />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2 ">Last update: Dec 31, 2024</div>
        </div>

        {/* Recent Withdrawals */}
        <RecentWithdrawals />
      </div>

      <div className='relative flex flex-col gap-4'>
        <div className="w-[372px] h-[166px] col-span-1 bg-white p-4 rounded-lg shadow-sm space-y-2">
          <p className="text-sm text-gray-500">Current Balance</p>
          <h2 className="text-2xl font-bold">₦{data.balance.toLocaleString()}.00</h2>
          <button className="w-full mt-2 bg-indigo-700 text-white py-2 rounded-lg">Withdraw</button>
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
      
    </div>
  );
}
