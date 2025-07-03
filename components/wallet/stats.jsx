'use client';

const Stats = () => {
    return (
        <div className="w-[768px] h-[315px] border border-gray-300 rounded-lg p-6 bg-white shadow-md">
            <h2 className="text-[18px] font-semibold mb-6">Overview</h2>
            <div className='flex gap-4'>
                {/* Activity Card */}
                <div className="w-[232px] h-[198px] bg-[#BAC8FF] rounded-lg p-[20px]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[14px] text-[#1C1E4C]">Activity</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-[#1C1E4C]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[32px] font-medium text-[#1C1E4C] mb-8">+N651,000</span>
                        <div className="flex items-center mt-2">
                            <span className="text-[14px] font-bold text-[#1C1E4C]">Last 7 days</span>
                            <div className="w-[80px] h-[24px] ml-auto">
                                <svg viewBox="0 0 100 25" className="w-full h-full">
                                    <path
                                        d="M0 20 Q 20 20, 25 15 T 50 10 T 75 15 T 100 5"
                                        fill="none"
                                        stroke="#1C1E4C"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Income Card */}
                <div className="w-[232px] h-[198px] bg-[#BDFED0] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[14px] text-[#1C1E4C]">Income</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-[#1C1E4C]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[32px] font-medium text-[#1C1E4C] mb-8">N54.1M</span>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                                <span className="text-[14px] font-bold text-[#1C1E4C]">1.2k Donors</span>
                            </div>
                            <span className="text-[14px] font-bold text-[#1C1E4C]">+12%</span>
                        </div>
                    </div>
                </div>

                {/* Spending Card */}
                <div className="w-[232px] h-[198px] bg-[#FF344566] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[14px] text-[#1C1E4C]">Spending</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-[#1C1E4C]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[32px] font-medium text-[#1C1E4C] mb-8">N30.7M</span>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                                <span className="text-[14px] font-bold text-[#1C1E4C]">17 Withdrawals</span>
                            </div>
                            <span className="text-[14px] font-bold text-[#1C1E4C]">+8%</span>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default Stats;