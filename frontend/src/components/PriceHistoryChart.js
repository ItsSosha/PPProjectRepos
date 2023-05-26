import { Line } from "react-chartjs-2";
import { Chart as ChartJS} from "chart.js/auto";

const PriceHistoryChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [{
      label: "Price history",
      data: data.map(item => item.price),
      fill: true,
      borderColor: 'rgb(86, 178, 128)',
      tension: 0,
      backgroundColor: "rgba(86, 178, 128, 0.35)"
    }]
  }

  const chartOptions = {
    aspectRatio: 1.8,
    plugins: {
      legend: {
        display: false,
      }
    }
  }

  return (
    <Line data={chartData} options={chartOptions} />
  )
};

export default PriceHistoryChart;
