'use client';

import { FaSearch } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';

const withdrawals = [
  {
    id: 1,
    name: 'Simon Itodo',
    amount: '-₦500,000',
    date: '21/02/2024',
    status: 'Successful',
    avatar: '/avatars/avatar1.png',
  },
  {
    id: 2,
    name: 'Simon Itodo',
    amount: '-₦500,000',
    date: '21/02/2024',
    status: 'Successful',
    avatar: '/avatars/avatar1.png',
  },
  {
    id: 3,
    name: 'Victor Ukeh',
    amount: '-₦500,000',
    date: '21/02/2024',
    status: 'Successful',
    avatar: '/avatars/avatar2.png',
  },
  {
    id: 4,
    name: 'Susan Owoicho',
    amount: '-₦500,000',
    date: '21/02/2024',
    status: 'Successful',
    avatar: '/avatars/avatar3.png',
  },
  {
    id: 5,
    name: 'Susan Owoicho',
    amount: '-₦500,000',
    date: '21/02/2024',
    status: 'Successful',
    avatar: '/avatars/avatar3.png',
  },
];

export default function RecentWithdrawals() {
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
        {withdrawals.map((w) => (
          <div
            key={w.id}
            className="flex items-center gap-2  rounded-md px-3 py-2 hover:bg-blue-100 cursor-pointer transition-colors"
            role="row"
            tabIndex={0}
            aria-label={`Withdrawal by ${w.name} for ${w.amount} on ${w.date}, status: ${w.status}`}
          >
            <div className="flex-[2] flex items-center gap-2 font-medium text-gray-700 min-w-0">
              <img
                src={w.avatar}
                alt={`${w.name} avatar`}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                draggable={false}
              />
              <span className="truncate">{w.name}</span>
            </div>
            <div className="flex-[1] text-gray-800 min-w-[80px]">{w.amount}</div>
            <div className="flex-[1] text-gray-600 min-w-[80px]">{w.date}</div>
            <div className="flex-[1]">
              <span className="text-green-600 bg-green-100 px-2 py-1 rounded-md text-xs select-none">
                {w.status}
              </span>
            </div>
            <div className="flex-[0.5] flex justify-center">
              <AiOutlineEye className="text-gray-600 hover:text-indigo-600" aria-label="View details" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-right mt-3">
        <button className="text-[15px] font-bold text-gray-600 hover:underline">See more</button>
      </div>
    </div>
  );
}

