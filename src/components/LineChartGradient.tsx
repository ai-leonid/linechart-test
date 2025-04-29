import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {useRef, useState} from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
    },
  },
};

const labels = ['01 янв 25', '02 янв 25', '03 янв 25', '04 янв 25', '05 янв 25', '06 янв 25', '07 янв 25', '08 янв 25', '09 янв 25', '10 янв 25', '11 янв 25', '12 янв 25'];

// Определяем базовые наборы данных с разными цветами
export const baseDatasets = [
  {
    label: 'Продажи',
    data: [10, 30, 50, 20, 60, 40, 80, 60, 90, 70, 100, 80],
    borderColor: '#4f46e5',
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    pointBackgroundColor: '#4f46e5',
    pointBorderColor: '#fff',
    pointHoverRadius: 5,
    pointHoverBackgroundColor: '#4f46e5',
    pointHoverBorderColor: '#fff',
    pointHitRadius: 10,
    pointBorderWidth: 2,
    fill: false
  },
  {
    label: 'Прибыль',
    data: [5, 25, 45, 30, 55, 65, 45, 70, 85, 65, 90, 95],
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    pointBackgroundColor: '#10b981',
    pointBorderColor: '#fff',
    pointHoverRadius: 5,
    pointHoverBackgroundColor: '#10b981',
    pointHoverBorderColor: '#fff',
    pointHitRadius: 10,
    pointBorderWidth: 2,
    fill: false
  },
  {
    label: 'Посетители',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 90, 100, 120],
    borderColor: '#f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    pointBackgroundColor: '#f59e0b',
    pointBorderColor: '#fff',
    pointHoverRadius: 5,
    pointHoverBackgroundColor: '#f59e0b',
    pointHoverBorderColor: '#fff',
    pointHitRadius: 10,
    pointBorderWidth: 2,
    fill: false
  }
];

// Исходные данные для графика
export const data = {
  labels,
  datasets: baseDatasets
};

export default function ShadowChart() {
  const chartRef = useRef<ChartJS>(null);
  const [selectedDataset, setSelectedDataset] = useState<number | null>(null);
  const [chartData, setChartData] = useState(data);

  // Функция для создания градиентной заливки
  const createGradientFill = (ctx: CanvasRenderingContext2D, color: string) => {
    // Получаем высоту графика из контекста канваса
    const chartHeight = chartRef.current?.height || 400;
    // Используем 70% от высоты графика
    const gradientHeight = chartHeight * 0.9;
    const gradient = ctx.createLinearGradient(0, 0, 0, gradientHeight);
    gradient.addColorStop(0, `${color}99`); // Полупрозрачный цвет вверху
    gradient.addColorStop(1, `${color}00`); // Полностью прозрачный внизу
    return gradient;
  };

  // Обработчик клика по графику
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!chartRef.current) return;

    const chart = chartRef.current;
    const elements = chart.getElementsAtEventForMode(
      event.nativeEvent,
      'nearest',
      { intersect: true },
      false
    );

    if (elements.length > 0) {
      const { datasetIndex } = elements[0];

      // Если кликнули на тот же график, снимаем выделение
      if (selectedDataset === datasetIndex) {
        setSelectedDataset(null);

        // Сбрасываем заливку для всех графиков
        const newDatasets = baseDatasets.map(dataset => ({
          ...dataset,
          fill: false
        }));

        setChartData({
          labels,
          datasets: newDatasets
        });
      } else {
        setSelectedDataset(datasetIndex);

        // Получаем контекст канваса для создания градиента
        const ctx = chart.ctx;

        // Обновляем данные графиков
        const newDatasets = baseDatasets.map((dataset, index) => {
          if (index === datasetIndex) {
            const color = dataset.borderColor as string;
            return {
              ...dataset,
              fill: {
                target: 'origin',
                above: createGradientFill(ctx, color)
              }
            };
          }
          return {
            ...dataset,
            fill: false
          };
        });

        setChartData({
          labels,
          datasets: newDatasets
        });
      }
    }
  };

  return (
    <div>
      <p style={{ marginBottom: '40px' }}></p>
      <div onClick={handleClick}>
        <Line ref={chartRef} options={options} data={chartData}/>
      </div>
    </div>
  );
}
