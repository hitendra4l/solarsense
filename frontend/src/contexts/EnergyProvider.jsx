import { useState } from "react";
import { energyContext } from "./useEnergyStat";

const EnergyProvider = ({ children }) => {
  // const [selectedEnergy, setSelectedEnergy] = useState(null);
  const [panelArea, setPanelArea] = useState("0");
  const [extraLoss, setExtraLoss] = useState("30");
  const [selectedModule, setSelectedModule] = useState("1");
  const [moduleEfficiency, setModuleEfficiency] = useState("20");
  const [inverterEfficiency, setInverterEfficiency] = useState("95");
  const [showReport, setShowReport] = useState(false);
  const [inputEnergy, setInputEnergy] = useState([]);
  const [outputEnergy, setOutputEnergy] = useState([]);
  const [monthlyConsumption, setMonthlyConsumption] = useState(300);

  return (
    <energyContext.Provider
      value={{
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
      }}
    >
      {children}
    </energyContext.Provider>
  );
};

export default EnergyProvider;
