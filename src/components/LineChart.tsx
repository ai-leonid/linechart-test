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
  y: number;
  description?: string;
  additionalValue?: number;
}

// Расширяем тип данных для Chart.js
type CustomDataset = ChartData<'line'>['datasets'][0] & {
  tooltipData?: PointData[];
};

// Функция для создания данных с дополнительной информацией
const createDataWithTooltips = (values: number[], descriptions?: string[]): { data: number[], tooltipData: PointData[] } => {
  // Создаем дополнительную информацию для использования в tooltip
  const tooltipData = values.map((value, index) => ({
    y: value,
    description: descriptions?.[index] || `Дополнительная информация для значения ${value}`,
    additionalValue: Math.round(value * 1.5) // Пример дополнительного значения
  }));

  // Возвращаем объект с данными и метаданными для подсказок
  return {
    data: values,
    tooltipData: tooltipData
  };
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
            // Получаем индекс точки
            const index = context.dataIndex;

            // Получаем данные из метаданных датасета
            const customDataset = context.dataset as CustomDataset;
            const tooltipData = customDataset.tooltipData?.[index];

            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }

            // Используем значение из context.parsed.y для отображения числа
            if (context.parsed.y !== undefined) {
              label += context.parsed.y;
            }

            // Добавляем дополнительную информацию из метаданных
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
        (() => {
            const dataset = createDataWithTooltips(
                [3, 5, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
                ["Информация об актере за январь", "Пик активности в феврале", "Снижение в марте", "Нет активности в апреле", "Небольшая активность в мае"]
            );
            return {
                "label": "Актер вот еще ",
                "data": dataset.data,
                "tooltipData": dataset.tooltipData
            };
        })(),
        (() => {
            const dataset = createDataWithTooltips(
                [6, 0, 4, 1, 0, 1, 0, 0, 2, 1, 1, 2, 2],
                ["Высокая активность в январе", "Нет активности в феврале", "Возобновление в марте", "Снижение в апреле"]
            );
            return {
                "label": "Базовая новая ",
                "data": dataset.data,
                "tooltipData": dataset.tooltipData
            };
        })(),
        (() => {
            const dataset = createDataWithTooltips(
                [7, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1],
                ["Максимальная активность в январе", "Длительный период бездействия", "Возобновление в июле"]
            );
            return {
                "label": "Основатель сети ресторановйцк у",
                "data": dataset.data,
                "tooltipData": dataset.tooltipData
            };
        })(),
        (() => {
            const dataset = createDataWithTooltips(
                [1, 2, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                ["Начало года", "Рост в феврале", "Стабильность в марте", "Снижение в апреле"]
            );
            return {
                "label": "Семьянин цйуа йцуа ",
                "data": dataset.data,
                "tooltipData": dataset.tooltipData
            };
        })(),
        (() => {
            const dataset = createDataWithTooltips(
                [0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ["Нет активности", "Пик в феврале", "Нет активности в марте", "Рост в апреле"]
            );
            return {
                "label": "Жизнь без имени и вот так",
                "data": dataset.data,
                "tooltipData": dataset.tooltipData
            };
        })(),
        (() => {
            const dataset = createDataWithTooltips(
                [2, 1, 2, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
                ["Хорошее начало года", "Снижение в феврале", "Восстановление в марте", "Стабильная активность"]
            );
            return {
                "label": "Спортсмен",
                "data": dataset.data,
                "tooltipData": dataset.tooltipData
            };
        })(),
        (() => {
            const dataset = createDataWithTooltips(
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ["Единственная активность в январе", "Далее нет активности"]
            );
            return {
                "label": "Жизнь важная 1",
                "data": dataset.data,
                "tooltipData": dataset.tooltipData
            };
        })(),
        (() => {
            const dataset = createDataWithTooltips(
                [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ["Высокая активность только в январе", "Далее нет активности"]
            );
            return {
                "label": "Жизнь без имени",
                "data": dataset.data,
                "tooltipData": dataset.tooltipData
            };
        })()
    ]
};

  return <Line options={options} data={data} />;
};

export default LineChart;
