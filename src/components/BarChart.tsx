import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type EnergyDataPoint = {
  date: string;
  value: number;
};

type Props = {
  data: EnergyDataPoint[];
};

export const EnergyChart: React.FC<Props> = ({ data }) => {
  // Группируем по дате
  const grouped: Record<string, number[]> = {};
  data.forEach(({ date, value }) => {
    const key = dayjs(date).format("D.MM.YY");
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(value);
  });

  // Строим массив данных и лейблов
  const chartValues: number[] = [];
  const chartLabels: string[] = [];

  Object.entries(grouped).forEach(([dateLabel, values]) => {
    values.forEach((value, idx) => {
      chartValues.push(value);
      chartLabels.push(idx === 0 ? dateLabel : ""); // первая точка — с подписью
    });
  });

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Энергия",
        data: chartValues,
        backgroundColor: chartValues.map((v) =>
          v >= 0 ? "#4CAF50" : "#F44336"
        ),
        borderRadius: 2,
        barThickness: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: -10,
        max: 10,
        ticks: {
          stepSize: 2,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `Энергия: ${context.parsed.y}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-96 p-4 bg-white rounded-2xl shadow-md">
      <Bar options={options} data={chartData} />
    </div>
  );
};
