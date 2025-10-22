import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchDashboardData } from '@/services/dashboard/dash_service';

const CircularProgress = ({ value, size = 40, strokeWidth = 4, children }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
                <circle
                    className="text-gray-200"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-[#1C1E4C]"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </svg>
            <span
                className="absolute inset-0 flex items-center justify-center font-medium"
                style={{ fontSize: size / 2.5 }}
            >
                {children}
            </span>
        </div>
    );
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value);

const InfoCard = ({ title, number, percentage, linkHref, ariaLabel, formatCurrencyValue = true }) => (
  <div className="w-[240px] h-[240px] border-none bg-[#BAC8FF] p-4 rounded-lg">
    <Link href={linkHref} aria-label={ariaLabel} className="text-[#1C1E4C] text-[16px] font-medium flex items-center justify-between">
      {title}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2 w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
    <div className="justify-start h-[100px] flex items-center">
      <p className='text-[32px] font-medium'>
        {typeof number === 'number'
          ? (formatCurrencyValue ? formatCurrency(number) : Number(number).toLocaleString())
          : number}
      </p>
    </div>
    <div className="flex justify-between pt-0 items-center">
      <div className="flex items-center justify-center">
        <CircularProgress value={percentage || 0} size={80}>
          {percentage || 0}%
        </CircularProgress>
      </div>
      <p className='text-[18px] font-medium'>Completion</p>
    </div>
  </div>
);

const Income = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchDashboardData();
                setDashboardData(data);
            } catch (err) {
                setError('Failed to fetch dashboard data. Please try again later.');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    if (loading) {
        return (
            <div className="w-[798px] h-[331px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1C1E4C]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-[798px] h-[331px] flex items-center justify-center">
                <div className="text-red-500 font-medium">{error}</div>
            </div>
        );
    }

    return (
        <div className="w-[798px] h-[331px] border border-gray-300 rounded-lg p-4 bg-white shadow-md">
            <h2 className="text-[18px] font-bold mb-4">Income Overview</h2>
            <div className='flex justify-between space-x-4'>
                <InfoCard
                    title="Running Projects"
                    number={dashboardData?.data?.runningProjects?.number ?? 0}
                    percentage={dashboardData?.data?.runningProjects?.percentageOfOpenProjects ?? 0}
                    linkHref="#"
                    ariaLabel="View running projects"
                    formatCurrencyValue={false}
                />
                <InfoCard
                    title="Funds Raised"
                    number={dashboardData?.data?.fundsRaised?.number ?? 0}
                    percentage={dashboardData?.data?.fundsRaised?.percentage ?? 0}
                    linkHref="#"
                    ariaLabel="View funds raised"
                />
                <InfoCard
                    title="Activity"
                    number={dashboardData?.data?.todaysFunds?.number ?? 0}
                    percentage={dashboardData?.data?.todaysFunds?.percentage ?? 0}
                    linkHref="#"
                    ariaLabel="View activities"
                />
            </div>
        </div>
    );
};

export default Income;