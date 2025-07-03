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

export function CashflowChart({ income, spend }) {
  const chartData = {
    labels: [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
    ],
    datasets: [
      {
        label: 'Income',
        data: income,
        fill: true,
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        borderColor: 'green',
        tension: 0.4,
      },
      {
        label: 'Spend',
        data: spend,
        fill: false,
        borderColor: 'red',
        tension: 0.4,
      },
    ],
  };

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
        min: 0,
        max: 25,
        ticks: {
          callback: (value) => `${value}M`,
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={options} />
    </div>
  );
}
