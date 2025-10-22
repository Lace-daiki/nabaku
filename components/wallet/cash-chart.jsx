'use client';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

export function CashflowChart({ donations = [], withdrawals = [], selectedYear, onYearChange }) {
  const years = (() => {
    const current = new Date().getFullYear();
    const start = current - 9; // last 10 years
    return Array.from({ length: 10 }, (_, i) => start + i).reverse();
  })();

  const startDate = selectedYear ? `${selectedYear}-01-01` : '';
  const endDate = selectedYear ? `${selectedYear}-12-31` : '';

  const chartData = {
    labels: [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
    ],
    datasets: [
      {
        label: 'Donations',
        data: donations,
        fill: true,
        backgroundColor: 'rgba(16, 185, 129, 0.15)', // emerald-500 @ 15%
        borderColor: '#10B981',
        tension: 0.35,
        borderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
      {
        label: 'Withdrawals',
        data: withdrawals,
        fill: false,
        borderColor: '#EF4444', // red-500
        tension: 0.35,
        borderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
  };
  
  // Compute a dynamic max for better visual range
  const maxValue = Math.max(
    0,
    ...(Array.isArray(donations) ? donations : []),
    ...(Array.isArray(withdrawals) ? withdrawals : [])
  );
  const niceMax = (() => {
    if (!Number.isFinite(maxValue) || maxValue <= 0) return undefined;
    // round up to 1, 2, or 5 x power of 10
    const pow = Math.pow(10, Math.max(0, Math.floor(Math.log10(maxValue)) - 1));
    const base = Math.ceil(maxValue / pow);
    const step = base <= 2 ? 2 : base <= 5 ? 5 : 10;
    return step * pow;
  })();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'line',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: niceMax,
        ticks: {
          callback: (value) =>
            new Intl.NumberFormat('en-NG', { notation: 'compact' }).format(value),
        },
      },
    },
    animation: { duration: 500 },
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">Cashflow</h4>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={selectedYear ?? ''}
          onChange={(e) => onYearChange && onYearChange(Number(e.target.value))}
        >
          {(selectedYear == null) && <option value="">Select year</option>}
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      {selectedYear && (
        <div className="text-xs text-gray-500 mb-2">
          Range: {startDate} to {endDate}
        </div>
      )}
      <Line data={chartData} options={options} />
    </div>
  );
}
