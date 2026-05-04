"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function BudgetChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#3E3A37',
        padding: 12,
        callbacks: {
          label: (context: any) => ` ${context.label}: ${context.parsed}%`,
        },
      },
    },
  };

  const data = {
    labels: ['Accommodation', 'Food & Drink', 'Transportation', 'Activities'],
    datasets: [
      {
        data: [40, 30, 15, 15],
        backgroundColor: [
          '#C17767', // Terracotta
          '#9D5A4D', // Clay
          '#3E3A37', // Dark
          '#D4A373'  // Sand
        ],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="h-[300px] w-full">
      <Doughnut options={options} data={data} />
    </div>
  );
}
