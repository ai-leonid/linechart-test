import './App.css'
import LineChart from './components/LineChart'
import {EnergyChart } from "./components/BarChart.tsx";
import dayjs from "dayjs";


export const generateEnergyData = (startDate: string, endDate: string) => {
  const result = [];
  let current = dayjs(startDate);
  const end = dayjs(endDate);

  while (current.isBefore(end) || current.isSame(end, "day")) {
    // Случайное количество значений на один день (1–3 столбика в день)
    const count = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < count; i++) {
      result.push({
        date: current.format("YYYY-MM-DD"),
        value: Math.floor(Math.random() * 21) - 10, // от -10 до +10
      });
    }

    current = current.add(1, "day");
  }

  return result;
};

function App() {
   const data = generateEnergyData("2024-04-01", "2024-04-30");

   console.log(data);

  return (
    <div className="app-container">
      <div className="chart-container">
        <LineChart />
        <EnergyChart  data={data} />
      </div>
    </div>
  )
}

export default App
