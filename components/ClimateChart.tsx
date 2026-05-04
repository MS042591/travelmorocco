"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ClimateChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#3E3A37',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
        callbacks: {
          label: (context: any) => `${context.parsed.y} °C`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: (value: any) => `${value}°`,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Avg High Temp (°C)',
        data: [19, 21, 24, 26, 29, 34, 38, 38, 33, 29, 23, 20],
        backgroundColor: (context: any) => {
          const value = context.dataset.data[context.dataIndex];
          if (value >= 35) return '#9D5A4D'; // Hot
          if (value >= 25) return '#C17767'; // Warm
          return '#D4A373'; // Mild
        },
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="h-[350px] w-full">
      <Bar options={options} data={data} />
    </div>
  );
}
