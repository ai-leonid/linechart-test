import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';

// Объявляем глобальную переменную для хранения данных подсказок
declare global {
  interface Window {
    _chartTooltipData: Array<{ y: number; description?: string; additionalValue?: number }[]>;
  }
}

// Инициализируем массив для хранения данных подсказок для каждого набора данных
window._chartTooltipData = [];

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Интерфейс для дополнительных данных точек
interface PointData {
  description?: string;
  additionalValue?: number;
}

// Функция для создания данных с дополнительной информацией
const createDataWithTooltips = (values: number[], descriptions?: string[], datasetIndex: number = 0): number[] => {
  // Сохраняем дополнительную информацию в отдельном массиве для использования в tooltip
  const tooltipData = values.map((value, index) => ({
    y: value,
    description: descriptions?.[index] || `Дополнительная информация для значения ${value}`,
    additionalValue: Math.round(value * 1.5) // Пример дополнительного значения
  }));
  
  // Сохраняем данные для использования в tooltip
  if (!window._chartTooltipData[datasetIndex]) {
    window._chartTooltipData[datasetIndex] = [];
  }
  window._chartTooltipData[datasetIndex] = tooltipData;
  
  // Возвращаем простой массив чисел, который Chart.js может корректно обработать
  return values;
};

const LineChart = () => {
  // Настройки графика
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Линейный график',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            // Получаем индекс набора данных и индекс точки
            const datasetIndex = context.datasetIndex;
            const index = context.dataIndex;
            
            // Получаем данные из глобальной переменной
            const tooltipData = window._chartTooltipData[datasetIndex]?.[index];
            
            let label = context.dataset.label || '';
            
            if (label) {
              label += ': ';
            }
            
            // Используем значение из context.parsed.y для отображения числа
            if (context.parsed.y !== undefined) {
              label += context.parsed.y;
            }
            
            // Добавляем дополнительную информацию из сохраненных данных
            if (tooltipData?.description) {
              label += ` (${tooltipData.description})`;
            }
            
            if (tooltipData?.additionalValue !== undefined) {
              label += `\nДополнительное значение: ${tooltipData.additionalValue}`;
            }
            
            return label;
          }
        }
      }
    },
  };

  // Данные для графика
  const data: ChartData<'line'> = {
    "labels": [
        "январь 25",
        "февраль 25",
        "март 25",
        "апрель 25",
        "май 25",
        "июнь 25",
        "июль 25",
        "август 25",
        "сентябрь 25",
        "октябрь 25",
        "ноябрь 25",
        "декабрь 25",
        "январь 26"
    ],
    "datasets": [
        {
            "label": "Актер вот еще ",
            "data": createDataWithTooltips(
                [3, 5, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
                ["Информация об актере за январь", "Пик активности в феврале", "Снижение в марте", "Нет активности в апреле", "Небольшая активность в мае"],
                0
            )
        },
        {
            "label": "Базовая новая ",
            "data": createDataWithTooltips(
                [6, 0, 4, 1, 0, 1, 0, 0, 2, 1, 1, 2, 2],
                ["Высокая активность в январе", "Нет активности в феврале", "Возобновление в марте", "Снижение в апреле"],
                1
            )
        },
        {
            "label": "Основатель сети ресторановйцк у",
            "data": createDataWithTooltips(
                [7, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1],
                ["Максимальная активность в январе", "Длительный период бездействия", "Возобновление в июле"],
                2
            )
        },
        {
            "label": "Семьянин цйуа йцуа ",
            "data": createDataWithTooltips(
                [1, 2, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                ["Начало года", "Рост в феврале", "Стабильность в марте", "Снижение в апреле"],
                3
            )
        },
        {
            "label": "Жизнь без имени и вот так",
            "data": createDataWithTooltips(
                [0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ["Нет активности", "Пик в феврале", "Нет активности в марте", "Рост в апреле"],
                4
            )
        },
        {
            "label": "Спортсмен",
            "data": createDataWithTooltips(
                [2, 1, 2, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
                ["Хорошее начало года", "Снижение в феврале", "Восстановление в марте", "Стабильная активность"],
                5
            )
        },
        {
            "label": "Жизнь важная 1",
            "data": createDataWithTooltips(
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ["Единственная активность в январе", "Далее нет активности"],
                6
            )
        },
        {
            "label": "Жизнь без имени",
            "data": createDataWithTooltips(
                [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ["Высокая активность только в январе", "Далее нет активности"],
                7
            )
        }
    ]
};

  return <Line options={options} data={data} />;
};

export default LineChart;