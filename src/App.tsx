import './App.css'
import LineChart from './components/LineChart'

function App() {
  return (
    <div className="app-container">
      <h1>Линейный график с Chart.js</h1>
      <div className="chart-container">
        <LineChart />
      </div>
    </div>
  )
}

export default App
