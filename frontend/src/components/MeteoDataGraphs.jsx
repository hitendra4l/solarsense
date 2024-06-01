import BarChart from "./BarChart";
import { formatNasaDataForCharts } from "../utils/formatNasaData";
import LineChart from "./LineChart";

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const MeteoDataGraphs = ({ data }) => {
  const ghiData = formatNasaDataForCharts(data?.ALLSKY_SFC_SW_DWN);
  const dniData = formatNasaDataForCharts(data?.ALLSKY_SFC_SW_DNI);
  const difData = formatNasaDataForCharts(data?.ALLSKY_SFC_SW_DIFF);
  const tempData = formatNasaDataForCharts(data?.TS);
  const albData = formatNasaDataForCharts(data?.ALLSKY_SRF_ALB);
  const wsData = formatNasaDataForCharts(data?.WS10M);
  const rhData = formatNasaDataForCharts(data?.RH2M);
  const precipitationData = formatNasaDataForCharts(data?.PRECTOTCORR_SUM);
  const tiltData = formatNasaDataForCharts(
    data?.SI_EF_TILTED_SURFACE_OPTIMAL_ANG
  );

  return (
    <div className="flex flex-col gap-6 mt-16">
      <h4 className="text-3xl font-semibold">Data Visualization</h4>
      <div className="flex justify-between gap-8 flex-wrap print:flex-col print:gap-2 print:items-center print:w-[95vw]">
        {/* GHI */}
        <div className="flex flex-col items-center w-[48%] print:w-full print:mx-auto">
          <h4 className="text-2xl font-bold">GHI</h4>
          <BarChart
            chartData={{
              labels: MONTHS,
              datasets: [
                {
                  label: "GHI",
                  data: ghiData,
                  backgroundColor: "aqua",
                },
              ],
            }}
            chartOptions={{
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: "Months",
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "KWh/m2/day",
                  },
                },
              },
            }}
          />
        </div>

        {/* DNI */}
        <div className="flex flex-col items-center w-[48%] print:w-full print:mx-auto">
          <h4 className="text-2xl font-bold">DNI</h4>
          <BarChart
            chartData={{
              labels: MONTHS,
              datasets: [
                {
                  label: "DNI",
                  data: dniData,
                  backgroundColor: "pink",
                },
              ],
            }}
            chartOptions={{
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: "Months",
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "KWh/m2/day",
                  },
                },
              },
            }}
          />
        </div>

        {/* DIF */}
        <div className="flex flex-col items-center w-[48%] print:w-full print:mx-auto">
          <h4 className="text-2xl font-bold">DIF</h4>
          <BarChart
            chartData={{
              labels: MONTHS,
              datasets: [
                {
                  label: "DNI",
                  data: difData,
                  backgroundColor: "#62BCF5",
                },
              ],
            }}
            chartOptions={{
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: "Months",
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "KWh/m2/day",
                  },
                },
              },
            }}
          />
        </div>

        {/* DIF and GHI */}
        <div className="flex flex-col items-center w-[48%] print:w-full print:mx-auto">
          <h4 className="text-2xl font-bold">DIF and GHI</h4>
          <BarChart
            chartData={{
              labels: MONTHS,
              datasets: [
                {
                  label: "DIF",
                  data: difData,
                  backgroundColor: "#62BCF5",
                },
                {
                  label: "GHI",
                  data: ghiData,
                  backgroundColor: "#E16125",
                },
              ],
            }}
            chartOptions={{
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: "Months",
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "KWh/m2/day",
                  },
                },
              },
            }}
          />
        </div>

        {/* Temperature */}
        <div className="flex flex-col items-center w-[48%] print:w-full print:mx-auto print:mt-40">
          <h4 className="text-2xl font-bold">Temperature</h4>
          <LineChart
            chartData={{
              labels: MONTHS,
              datasets: [
                {
                  label: "Temperature",
                  data: tempData,
                  backgroundColor: "orange",
                  borderColor: "orange",
                  pointBorderColor: "black",
                  borderWidth: 3,
                },
              ],
            }}
            chartOptions={{
              plugins: {
                legend: true,
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: "Months",
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "Temp(°C)",
                  },
                },
              },
            }}
          ></LineChart>
        </div>

        {/* Albedo */}
        <div className="flex flex-col items-center w-[48%] print:w-full print:mx-auto">
          <h4 className="text-2xl font-bold">Albedo</h4>
          <LineChart
            chartData={{
              labels: MONTHS,
              datasets: [
                {
                  label: "Albedo",
                  data: albData,
                  backgroundColor: "aqua",
                  borderColor: "aqua",
                  pointBorderColor: "blue",
                  borderWidth: 3,
                },
              ],
            }}
            chartOptions={{
              plugins: {
                legend: true,
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: "Months",
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "Albedo",
                  },
                },
              },
            }}
          ></LineChart>
        </div>

        {/* Wind Speed */}
        <div className="flex flex-col items-center w-[48%] print:w-full print:mx-auto">
          <h4 className="text-2xl font-bold">Wind Speed</h4>
          <LineChart
            chartData={{
              labels: MONTHS,
              datasets: [
                {
                  label: "Wind Speed",
                  data: wsData,
                  backgroundColor: "pink",
                  borderColor: "pink",
                  pointBorderColor: "blue",
                  borderWidth: 3,
                },
              ],
            }}
            chartOptions={{
              plugins: {
                legend: true,
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: "Months",
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "Wind Speed",
                  },
                },
              },
            }}
          ></LineChart>
        </div>

        {/* Relative Humidity */}
        <div className="flex flex-col items-center w-[48%] print:w-full print:mx-auto print:mt-10">
          <h4 className="text-2xl font-bold">Relative Humidity</h4>
          <LineChart
            chartData={{
              labels: MONTHS,
              datasets: [
                {
                  label: "Relative Humidity",
                  data: rhData,
                  backgroundColor: "yellow",
                  borderColor: "yellow",
                  pointBorderColor: "green",
                  borderWidth: 3,
                },
              ],
            }}
            chartOptions={{
              plugins: {
                legend: true,
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: "Months",
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "Relative Humidity(%)",
                  },
                },
              },
            }}
          ></LineChart>
        </div>

        {/* Precipitation */}
        <div className="flex flex-col items-center w-[48%] print:w-full print:mx-auto">
          <h4 className="text-2xl font-bold">Precipitation</h4>
          <LineChart
            chartData={{
              labels: MONTHS,
              datasets: [
                {
                  label: "Precipitation",
                  data: precipitationData,
                  backgroundColor: "cyan",
                  borderColor: "cyan",
                  pointBorderColor: "blue",
                  borderWidth: 3,
                },
              ],
            }}
            chartOptions={{
              plugins: {
                legend: true,
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: "Months",
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "mm",
                  },
                },
              },
            }}
          ></LineChart>
        </div>

        {/* Tilt Angle */}
        <div className="flex flex-col items-center w-[48%] print:w-full print:mx-auto">
          <h4 className="text-2xl font-bold">Tilt Angle</h4>
          <LineChart
            chartData={{
              labels: MONTHS,
              datasets: [
                {
                  label: "Tilt Angle",
                  data: tiltData,
                  backgroundColor: "#F7C95F",
                  borderColor: "#F7C95F",
                  pointBorderColor: "#0A84A4",
                  borderWidth: 3,
                },
              ],
            }}
            chartOptions={{
              plugins: {
                legend: true,
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: "Months",
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "degrees",
                  },
                },
              },
            }}
          ></LineChart>
        </div>
      </div>
    </div>
  );
};

export default MeteoDataGraphs;
