import { useEffect } from "react";
import { useProjectState } from "../../contexts/useProjectState";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useProjectData } from "../../services/queries/projects";
import { useNasaData } from "../../services/queries/meteoData";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import { useEnergyState } from "../../contexts/useEnergyStat";
// import { useEnergyState } from "../../contexts/useEnergyStat";

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
const DAY_NUMBERS = [17, 47, 75, 105, 135, 162, 198, 228, 258, 288, 318, 344];
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const EnergyPage = () => {
  const { selectedProject, setSelectedProject } = useProjectState();
  const { userInfo: user } = useSelector((state) => state.user);
  const { projectId } = useParams();

  const { data: projectData } = useProjectData({
    projectId,
    token: user?.token,
  });

  useEffect(() => {
    if (!selectedProject) {
      setSelectedProject(projectData);
    }
  }, [projectData, setSelectedProject, selectedProject]);

  const {
    panelArea,
    setPanelArea,
    extraLoss,
    setExtraLoss,
    selectedModule,
    setSelectedModule,
    moduleEfficiency,
    setModuleEfficiency,
    inverterEfficiency,
    setInverterEfficiency,
    showReport,
    setShowReport,
    inputEnergy,
    setInputEnergy,
    outputEnergy,
    setOutputEnergy,
    monthlyConsumption,
    setMonthlyConsumption,
  } = useEnergyState();

  const { data: nasaQueryData } = useNasaData({
    latitude: selectedProject?.latitude,
    longitude: selectedProject?.longitude,
  });

  let OptRadiationData = [];
  let OptAngleData = [];
  let numerator = 0;
  let denominator = 0;
  let optimalInputEnergy = [];
  let totalOptimalInputEnergy = 0;
  // let monthlyGeneratedEnergy = [];

  let optimalAng = 0;

  for (let i = 0; i < 12; i++) {
    const nasaParameters = nasaQueryData?.properties?.parameter;

    const radiation = nasaParameters?.SI_TILTED_AVG_OPTIMAL_ANG[MONTHS[i]];
    const angle = nasaParameters?.SI_TILTED_AVG_OPTIMAL_ANG[MONTHS[i]];

    OptRadiationData.push(radiation);
    OptAngleData.push(angle);

    // totalInputEnergy += radiation * 30;
    numerator += radiation * angle;
    denominator += radiation;
  }
  optimalAng = denominator && (numerator / denominator).toFixed(2);

  if (optimalAng) {
    // for loop 0 to 12
    for (let i = 0; i < 12; i++) {
      const parameterData = nasaQueryData?.properties?.parameter;
      const currAlpha =
        90 -
        projectData?.latitude +
        23.45 *
          Math.sin((Math.PI / 180) * ((360 * (284 + DAY_NUMBERS[i])) / 365));
      // console.log("currAlpha: ", MONTHS[i], currAlpha);
      const currOptInput =
        (parameterData?.ALLSKY_SFC_SW_DIFF[MONTHS[i]] +
          (parameterData?.ALLSKY_SFC_SW_DWN[MONTHS[i]] -
            parameterData?.ALLSKY_SFC_SW_DIFF[MONTHS[i]]) *
            Math.sin((Math.PI / 180) * (currAlpha + Number(optimalAng)))) *
        (1 - parameterData?.ALLSKY_SRF_ALB[MONTHS[i]]);

      optimalInputEnergy.push(currOptInput);
      totalOptimalInputEnergy += currOptInput * 30;
    }
  }

  // console.log("totalOptimalInputEnergy: " + totalOptimalInputEnergy);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!nasaQueryData) {
      return;
    }
    let tempInput = optimalInputEnergy.map((item) => {
      return item * Number(panelArea);
    });
    setInputEnergy(tempInput);

    let tempOutput = tempInput.map((item) => {
      return (
        item *
        ((100 - Number(extraLoss)) / 100) *
        (Number(moduleEfficiency) / 100) *
        (Number(inverterEfficiency) / 100)
      ).toFixed(2);
    });
    setOutputEnergy(tempOutput);

    // monthlyGeneratedEnergy = tempOutput.map(
    //   (item, index) => item * MONTH_DAYS[index]
    // );
    console.log("tempOutput", tempOutput);
    // console.log("monthlyGeneratedEnergy", monthlyGeneratedEnergy);

    setShowReport(true);
  };

  return (
    <div className="">
      <div className="bg-dark-soft text-white p-6 rounded-lg w-full">
        <h1 className="text-2xl font-bold">Energy Estimation</h1>
        <form onSubmit={handleFormSubmit} className="text-gray-100">
          <p className="py-3">
            <span className="font-bold">Project Name : </span>{" "}
            {selectedProject?.name}
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold" htmlFor="area">
                Area (meter sq.):
              </label>
              <input
                className="p-3 outline-none rounded-md text-gray-900"
                type="text"
                onChange={(e) => setPanelArea(e.target.value)}
                placeholder="Enter area in meter sq."
                defaultValue={panelArea}
                name="area"
                id="area"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold" htmlFor="dust">
                Extra Loss (%):
              </label>
              <input
                className="p-3 outline-none rounded-md text-gray-900"
                type="text"
                placeholder="Enter dust in ppm"
                onChange={(e) => setExtraLoss(e.target.value)}
                defaultValue={extraLoss}
                name="dust"
                id="dust"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold" htmlFor="moduleType">
                Module Type:
              </label>
              <select
                id="moduleType"
                value={selectedModule}
                onChange={(e) => {
                  setSelectedModule(e.target.value);
                  e.target.value === "1"
                    ? setModuleEfficiency("20")
                    : setModuleEfficiency("16");
                }}
                name="moduleType"
                className="p-3 outline-none rounded-md text-gray-900"
              >
                <option value="1">Monocrystalline</option>
                <option value="2">Polycrystalline</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold" htmlFor="inverter">
                Module Efficiency:
              </label>
              <input
                className="p-3 outline-none rounded-md text-gray-900"
                type="text"
                placeholder="Enter module efficiency (in %):"
                value={moduleEfficiency}
                onChange={(e) => setModuleEfficiency(e.target.value)}
                name="moduleEfficiency"
                id="moduleEfficiency"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold" htmlFor="inverter">
                Inverter Efficiency:
              </label>
              <input
                className="p-3 outline-none rounded-md text-gray-900"
                type="text"
                placeholder="Enter inverter efficiency (in %):"
                defaultValue={inverterEfficiency}
                onChange={(e) => setInverterEfficiency(e.target.value)}
                name="inverter"
                id="inverter"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold" htmlFor="area">
                Average Monthly Consumption (KWh):
              </label>
              <input
                className="p-3 outline-none rounded-md text-gray-900"
                type="text"
                onChange={(e) => setMonthlyConsumption(e.target.value)}
                placeholder="Enter area in meter sq."
                defaultValue={monthlyConsumption}
                name="monthlyConsumption"
                id="monthlyConsumption"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-6">
            <button
              type="submit"
              disabled={Number(panelArea) <= 0}
              className="bg-light-hard w-fit text-white py-3 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate
            </button>
          </div>
        </form>
      </div>
      {showReport && (
        <div className="mb-20 w-full">
          <div className="flex flex-col pl-12 mb-10 gap-2 mt-20">
            <div className="flex text-2xl">
              <p className="font-bold w-[400px]">Optimal Tilt angle: </p>
              <p className="grow">{optimalAng}&deg;</p>
            </div>
            <div className="flex text-2xl">
              <p className="font-bold w-[400px]">Total Convertible Energy: </p>
              <p className="grow">
                {totalOptimalInputEnergy
                  ? (totalOptimalInputEnergy * Number(panelArea)).toFixed(2)
                  : ""}{" "}
                KWh/year
              </p>
            </div>
            <div className="flex text-2xl">
              <p className="font-bold w-[400px]">Total Generated Energy: </p>
              <p className="grow">
                {totalOptimalInputEnergy && panelArea
                  ? (
                      totalOptimalInputEnergy *
                      Number(panelArea) *
                      ((100 - Number(extraLoss)) / 100) *
                      (Number(moduleEfficiency) / 100) *
                      (Number(inverterEfficiency) / 100)
                    ).toFixed(2)
                  : ""}{" "}
                KWh/year
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-8 flex-wrap print:flex-col print:gap-2 print:items-center print:w-[95vw]">
            {/* Energy */}
            <div className="flex flex-col items-center w-[48%] print:w-full print:mx-auto">
              <h4 className="text-2xl font-bold">Input and Generated Energy</h4>
              <BarChart
                chartData={{
                  labels: MONTHS,
                  datasets: [
                    {
                      label: "Input Energy",
                      data: inputEnergy,
                      backgroundColor: "#62BCF5",
                    },
                    {
                      label: "Generated Energy",
                      data: outputEnergy,
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
                        text: "KWh/day",
                      },
                    },
                  },
                }}
              />
            </div>
            {/* Angle */}
            <div className="flex flex-col items-center w-[48%] print:w-full print:mx-auto print:mt-40">
              <h4 className="text-2xl font-bold">Tilt Angle</h4>
              <LineChart
                chartData={{
                  labels: MONTHS,
                  datasets: [
                    {
                      label: "Tilt Angle",
                      data: OptAngleData,
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

            {/* Energy Consumption vs Energy Generated */}
            <div className="flex flex-col items-center w-[48%] print:w-full print:mx-auto">
              <h4 className="text-2xl font-bold">
                Required vs Generated Energy
              </h4>
              <LineChart
                chartData={{
                  labels: MONTHS,
                  datasets: [
                    {
                      label: "Generated Energy",
                      data: outputEnergy.map(
                        (item, index) => item * MONTH_DAYS[index],
                      ),
                      backgroundColor: "#F7C95F",
                      borderColor: "#F7C95F",
                      pointBorderColor: "#0A84A4",
                      borderWidth: 3,
                    },
                    {
                      label: "Required Energy",
                      data: new Array(12).fill(monthlyConsumption),
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
                        text: "KWh/month",
                      },
                    },
                  },
                }}
              ></LineChart>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EnergyPage;
