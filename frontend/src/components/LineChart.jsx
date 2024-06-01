import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement
);

export default function LineChart(props) {
  return <Line data={props.chartData} options={props.chartOptions}></Line>;
}
